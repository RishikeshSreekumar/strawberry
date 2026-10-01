import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Electricity and Magnetism Chapter 5 — Electromagnetic Induction and AC.
 * Changing flux makes an emf: Faraday and Lenz, motional emf, self and
 * mutual inductance, LR transients and LC oscillations, then alternating
 * current as rotating phasors, the series LCR circuit and resonance, AC
 * power, transformers, and a short close on electromagnetic waves.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "faraday-and-lenz",
  title: "5.1 · Faraday's and Lenz's Laws",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Drop a strong magnet down a vertical copper pipe. Copper is not magnetic, the magnet touches nothing, and yet it drifts down slowly, as if falling through honey. Drop an unmagnetised steel slug of the same size and it drops straight through. Something in the copper is pushing back on the moving magnet, and only while it moves.",
    },
    {
      type: "text",
      content:
        "In 1831 Michael Faraday found the reason. A steady magnetic field near a loop of wire does nothing. But a **changing** field through the loop drives a current round it, as if a cell had been placed in the loop. The falling magnet changes the field through each ring of the copper pipe, currents swirl round the pipe, and those currents make their own field that opposes the magnet's motion.",
    },
    {
      type: "text",
      content:
        "The quantity that must change is the **magnetic flux**: how much field threads the loop. It is built exactly like electric flux in Chapter 1:",
    },
    { type: "math", latex: "\\Phi_B = \\vec B\\cdot\\vec A = BA\\cos\\theta" },
    {
      type: "callout",
      variant: "definition",
      title: "Faraday's law",
      content:
        "Magnetic flux $\\Phi_B = BA\\cos\\theta$ (for a uniform field), unit the **weber**, $1\\text{ Wb} = 1$ T m².\nThe emf induced in a coil of $N$ turns is\n$\\mathcal E = -N\\dfrac{d\\Phi_B}{dt}$.\nThe flux can change because $B$ changes, because the area changes, or because the angle $\\theta$ changes (a rotating coil). Any of the three works.",
    },
    {
      type: "text",
      content:
        "**Lenz's law: the minus sign.** The induced current flows in the direction that **opposes the change** in flux that produced it. Push a magnet's N pole towards a loop and the loop's face towards the magnet becomes an N pole, repelling it. Pull the magnet away and that face becomes an S pole, attracting it back. Either way, you have to do work to move the magnet, and that work is exactly the energy that appears as heat in the loop.",
    },
    {
      type: "text",
      content:
        "Why must it be this way? Suppose the sign were reversed: the approaching N pole induces an S face that **attracts** it. The magnet speeds up, the flux changes faster, the current grows, the attraction grows... Kinetic energy and heat would appear from nothing. Lenz's law is energy conservation applied to induction. It is also why the magnet drifts down the copper pipe: gravity's work goes into heating the pipe instead of speeding up the magnet.",
    },
    {
      type: "text",
      content:
        "**Charge through a coil.** If the coil (resistance $R$) is part of a closed circuit, the induced current is $I = \\mathcal E/R = -\\dfrac{N}{R}\\dfrac{d\\Phi}{dt}$. Integrate over time:",
    },
    { type: "math", latex: "\\Delta q = \\int I\\,dt = \\frac{N}{R}\\,|\\Delta\\Phi|" },
    {
      type: "text",
      content:
        "The time has cancelled. Flip a coil over quickly or slowly, and the same total charge flows round it; a fast flip just gives a bigger current for a shorter time. This is how a search coil and ballistic galvanometer measure a field.",
    },
    {
      type: "text",
      content:
        "**The emf as a slope.** The emf is minus the **rate of change** of flux, so on a graph of $\\Phi$ against $t$ it is minus the slope. Below, $\\Phi(t) = t^2 - 4t$ (in Wb, $t$ in s). The secant between $t = 3$ s and a second time gives the average emf over that interval; slide the second time towards 3 and the secant becomes the tangent: the instantaneous emf.",
    },
    {
      type: "interactive",
      config: {
        component: "secant-explorer",
        expr: "x^2 - 4*x",
        exprLatex: "\\Phi(t) = t^2 - 4t",
        x1: 3,
        min: 0,
        max: 6,
        step: 0.1,
        initial: 5,
        window: { xmin: 0, xmax: 6, ymin: -5, ymax: 13 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: from 3 s to 5 s the flux rises from $-3$ to $5$ Wb, a secant slope of 4 Wb/s, so the average emf is $-4$ V. As the second point closes in on 3 s the slope settles to $\\Phi'(3) = 2(3) - 4 = 2$ Wb/s: the instantaneous emf at 3 s is $-2$ V. At $t = 2$ s the flux is at its most negative, $-4$ Wb, yet the slope there is zero, and so is the emf.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a collapsing field).** A 100-turn coil of area 0.01 m² sits perpendicular to a 0.5 T field. The field falls to zero in 0.1 s. Find the average emf.\n\n1. Flux per turn falls from $0.5\\times0.01 = 5\\times10^{-3}$ Wb to 0. *Why this step:* the coil is perpendicular to $\\vec B$, so $\\cos\\theta = 1$.\n2. $|\\mathcal E| = N\\dfrac{\\Delta\\Phi}{\\Delta t} = 100\\times\\dfrac{5\\times10^{-3}}{0.1} = 5$ V.\n\n**Worked example 2 (flipping a coil).** A 50-turn coil of area 0.02 m² and resistance 10 Ω lies perpendicular to a 0.4 T field. It is turned over (rotated through $180^\\circ$). How much charge flows?\n\n1. The flux per turn goes from $+BA$ to $-BA$: $|\\Delta\\Phi| = 2BA = 2\\times0.4\\times0.02 = 0.016$ Wb. *Why this step:* flipping reverses the flux, so the change is twice the flux, not the flux.\n2. $\\Delta q = \\dfrac{N|\\Delta\\Phi|}{R} = \\dfrac{50\\times0.016}{10} = 0.08$ C, however fast the flip.\n\n**Worked example 3 (reading emf from $\\Phi(t)$).** $\\Phi = t^2 - 4t$ Wb through a single loop.\n\n1. $\\mathcal E = -\\dfrac{d\\Phi}{dt} = -(2t - 4) = 4 - 2t$.\n2. At $t = 1$ s: $\\mathcal E = 2$ V. At $t = 2$ s: $\\mathcal E = 0$, even though $|\\Phi| = 4$ Wb is largest there. At $t = 3$ s: $\\mathcal E = -2$ V (the current reverses).",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (Lenz direction).** A bar magnet is pushed N pole first towards a horizontal loop from above. Which way does the induced current flow, seen from above?\n\n1. The downward flux through the loop (field lines leave N and point down into the loop) is increasing. *Why this step:* Lenz's law is about the change, so identify the flux direction and whether it grows or shrinks.\n2. The induced current must create an **upward** field inside the loop to oppose the increase.\n3. By the grip rule, an upward field through a horizontal loop needs an **anticlockwise** current seen from above. The top face acts as an N pole, repelling the approaching magnet. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a large flux means a large emf\"",
      content:
        "Faraday's law involves $d\\Phi/dt$, not $\\Phi$. A coil sitting still in the strongest MRI field has an enormous flux and zero emf. A coil in a weak field that is switched on and off rapidly can have a large emf. Only change matters, as Worked example 3 showed: the emf was zero exactly where the flux was largest in size.",
    },
    {
      type: "quiz",
      id: "em5-1-q1",
      variant: "practice",
      question: "A 50-turn coil of area 0.02 m² is perpendicular to a magnetic field that rises steadily from 0 to 0.4 T in 0.2 s. The induced emf is",
      options: [
        { text: "0.04 V", feedback: "That is the emf of a single turn. Multiply by 50." },
        { text: "0.4 V", feedback: "That is $N\\Delta\\Phi$ without dividing by the time 0.2 s." },
        { text: "2 V", correct: true, feedback: "$N\\dfrac{\\Delta(BA)}{\\Delta t} = 50\\times\\dfrac{0.4\\times0.02}{0.2} = 2$ V." },
        { text: "20 V", feedback: "Check the flux change per turn: $0.4\\times0.02 = 0.008$ Wb." },
      ],
    },
    {
      type: "quiz",
      id: "em5-1-q2",
      variant: "practice",
      question: "A 100-turn coil of area 0.01 m² and resistance 5 Ω is perpendicular to a 0.5 T field. It is pulled out of the field, first in 0.1 s, then (in a repeat) in 1 s. The charge that flows is",
      options: [
        { text: "0.1 C both times", correct: true, feedback: "$\\Delta q = \\dfrac{N\\Delta\\Phi}{R} = \\dfrac{100\\times0.005}{5} = 0.1$ C, independent of the time taken." },
        { text: "1 C the fast time, 0.1 C the slow time", feedback: "The fast pull gives a larger current for a shorter time. The product, the charge, is the same." },
        { text: "0.1 C the fast time, 1 C the slow time", feedback: "Charge through the coil does not depend on the time taken at all." },
        { text: "0.001 C both times", feedback: "Include all 100 turns: $N\\Delta\\Phi = 0.5$ Wb-turns." },
      ],
    },
    {
      type: "quiz",
      id: "em5-1-q3",
      variant: "concept",
      question: "The N pole of a magnet is pulled **away** from a loop. Seen from the magnet's side, the induced current in the loop is",
      options: [
        { text: "anticlockwise, making the near face an N pole", feedback: "That is the approaching case. Moving away reverses the change and so reverses the current." },
        { text: "zero, since the magnet is moving away", feedback: "Moving away changes the flux just as much as moving closer." },
        { text: "clockwise, making the near face an N pole that pushes it further away", feedback: "That would help the change, creating energy from nothing. Lenz's law says the induced effect opposes the change." },
        { text: "clockwise, making the near face an S pole that attracts the magnet back", correct: true, feedback: "The N pole's field threads the loop pointing away from you, and that flux is falling. The induced current tries to keep it up, so it makes its own field pointing away from you: clockwise as you look. That face is an S pole, which attracts the retreating magnet." },
      ],
    },
    {
      type: "quiz",
      id: "em5-1-q4",
      variant: "practice",
      question: "The flux through a loop is $\\Phi = 5t^2 - 3t + 2$ milliwebers ($t$ in s). The magnitude of the emf at $t = 2$ s is",
      options: [
        { text: "16 mV", feedback: "That is the flux itself at $t = 2$ s. The emf is its rate of change." },
        { text: "17 mV", correct: true, feedback: "$\\dfrac{d\\Phi}{dt} = 10t - 3 = 17$ mWb/s at $t = 2$ s." },
        { text: "7 mV", feedback: "That is the slope at $t = 1$ s (and also the average rate from 0 to 2 s). The emf at $t = 2$ s is the instantaneous slope there." },
        { text: "20 mV", feedback: "That is $10t$ alone; the $-3t$ term contributes $-3$ to the derivative." },
      ],
      hint: "Differentiate, then substitute.",
    },
    {
      type: "quiz",
      id: "em5-1-q5",
      variant: "concept",
      question: "Lenz's law is a consequence of",
      options: [
        { text: "conservation of charge", feedback: "Charge conservation gives Kirchhoff's junction law. Lenz's law is about the direction that keeps energy balanced." },
        { text: "Coulomb's law", feedback: "Coulomb's law is about static charges; induction needs changing flux." },
        { text: "Newton's first law", feedback: "The opposition is sometimes described as \"electrical inertia\", but the law itself follows from energy conservation." },
        { text: "conservation of energy", correct: true, feedback: "If the induced current aided the change, energy would be created from nothing." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "motional-emf",
  title: "5.2 · Motional EMF",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A metal rod slides across two rails in a magnetic field. Nothing about the field changes, yet a bulb connected across the rails lights up. Faraday's law says the flux through the circuit is changing because its **area** is growing. But you can also see the emf directly, from the force on the charges riding along inside the rod.",
    },
    {
      type: "text",
      content:
        "**Derivation 1: the Lorentz force.** A rod of length $l$ moves with velocity $\\vec v$ perpendicular to its length and to a uniform $\\vec B$. Each free charge $q$ in the rod moves with the rod, so it feels $q\\vec v\\times\\vec B$, directed **along the rod**. That push is a non-electrostatic force, like the chemistry in a cell. The work it does per unit charge along the rod is the emf:",
    },
    { type: "math", latex: "\\mathcal E = \\frac{W}{q} = \\frac{(qvB)\\,l}{q} = Bvl" },
    {
      type: "text",
      content:
        "**Derivation 2: the flux.** Put the rod on U-shaped rails, a distance $x$ from the closed end. The circuit encloses flux $\\Phi = Blx$. As the rod moves, $dx/dt = v$, so $|\\mathcal E| = \\dfrac{d\\Phi}{dt} = Blv$. The two derivations agree: moving-conductor induction and changing-flux induction are the same physics seen two ways.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Motional emf",
      content:
        "A straight conductor of length $l$ moving with speed $v$, with $\\vec l$, $\\vec v$ and $\\vec B$ mutually perpendicular: $\\mathcal E = Bvl$.\nIn general $\\mathcal E = (\\vec v\\times\\vec B)\\cdot\\vec l$: only the velocity component across the field, and the rod component along $\\vec v\\times\\vec B$, count.\nA rod of length $l$ rotating at $\\omega$ about one end, in a field along the axis: $\\mathcal E = \\tfrac12 B\\omega l^2$.",
    },
    {
      type: "text",
      content:
        "**The rotating rod.** A piece of the rod at distance $r$ from the pivot moves at $v = \\omega r$, so a length $dr$ of it contributes $B\\omega r\\,dr$. Adding from 0 to $l$: $\\mathcal E = \\int_0^l B\\omega r\\,dr = \\tfrac12 B\\omega l^2$. A metal disc spinning about its axis (Faraday's disc) behaves like many such rods in parallel, with emf $\\tfrac12 B\\omega R^2$ between centre and rim.",
    },
    {
      type: "text",
      content:
        "**Rod on rails with a resistor.** Close the circuit through a resistance $R$. The current is $I = \\dfrac{Bvl}{R}$, and the rod now carries current in a field, so it feels $F = IlB$ (4.5). By Lenz's law this force **opposes** the motion:",
    },
    { type: "math", latex: "F = \\frac{B^2l^2v}{R}, \\qquad Fv = \\frac{B^2l^2v^2}{R} = I^2R" },
    {
      type: "text",
      content:
        "The mechanical power you must supply to keep the rod moving equals the power dissipated in the resistor, exactly. That is Lenz's law as bookkeeping.\n\n**The falling rod.** Turn the rails vertical, with $\\vec B$ horizontal and perpendicular to them, and let the rod fall. The retarding force grows with speed until it balances the weight: $\\dfrac{B^2l^2v_t}{R} = mg$, giving a **terminal velocity** $v_t = \\dfrac{mgR}{B^2l^2}$. With $m = 0.01$ kg, $R = 1\\ \\Omega$, $l = 0.2$ m and $g = 10$ m/s², $v_t = \\dfrac{2.5}{B^2}$ m/s. Try different fields.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "2.5/x^2",
        exprLatex: "v_t = \\frac{mgR}{B^2l^2} = \\frac{2.5}{B^2}\\ \\text{m/s}",
        min: 0.2,
        max: 2,
        step: 0.1,
        initial: 0.5,
        inputLabel: "Magnetic field B",
        inputUnit: "T",
        outputLabel: "Terminal speed of the falling rod (m/s)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: doubling $B$ cuts the terminal speed to a quarter, because $B$ enters twice: once in the emf ($Bvl$) and once in the force on the current ($IlB$). The same double dependence makes strong magnetic brakes very effective.",
    },
    {
      type: "text",
      content:
        "**Eddy currents.** In a solid sheet of metal moving through a field, there is no wire to guide the current, so induced currents swirl in closed loops within the metal: **eddy currents**. They heat the metal and, by Lenz's law, oppose the motion. Uses: magnetic braking in trains, damping the needle of a galvanometer, induction cooktops and furnaces. Nuisance: they waste energy in transformer cores, which is why cores are **laminated** (thin insulated sheets break up the eddy loops).",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (terminal speed).** A rod of mass 0.01 kg and length 0.2 m falls on vertical rails joined by a 1 Ω resistor in a horizontal 0.5 T field. ($g = 10$ m/s²)\n\n1. At terminal speed the magnetic force balances the weight: $\\dfrac{B^2l^2v_t}{R} = mg$. *Why this step:* terminal means no acceleration, so forces balance.\n2. $v_t = \\dfrac{0.01\\times10\\times1}{0.25\\times0.04} = \\dfrac{0.1}{0.01} = 10$ m/s.\n3. Energy check: $I = \\dfrac{Bv_tl}{R} = \\dfrac{0.5\\times10\\times0.2}{1} = 1$ A, so $I^2R = 1$ W, and gravity delivers $mgv_t = 0.1\\times10 = 1$ W. ✓\n\n**Worked example 2 (rotating rod).** A 1 m rod rotates at 50 rad/s about one end in a 0.2 T field parallel to the rotation axis.\n\n1. $\\mathcal E = \\tfrac12 B\\omega l^2 = \\tfrac12\\times0.2\\times50\\times1 = 5$ V between the pivot and the tip.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a rod coasting to rest).** A rod of mass 0.1 kg is launched at $v_0 = 2$ m/s along horizontal rails 0.5 m apart, joined by a 2 Ω resistor, in a vertical 1 T field. How far does it travel?\n\n1. Newton's law: $m\\dfrac{dv}{dt} = -\\dfrac{B^2l^2v}{R}$.\n2. Write $\\dfrac{dv}{dt} = v\\dfrac{dv}{dx}$ and cancel $v$: $m\\,dv = -\\dfrac{B^2l^2}{R}\\,dx$. *Why this step:* the question asks for distance, so change the variable from time to position.\n3. Integrate from $v_0$ to 0: $x = \\dfrac{mv_0R}{B^2l^2} = \\dfrac{0.1\\times2\\times2}{1\\times0.25} = 1.6$ m.\n4. The heat generated is all the initial kinetic energy, $\\tfrac12\\times0.1\\times4 = 0.2$ J.\n\n**Worked example 4 (an aircraft).** An aircraft with a 30 m wingspan flies horizontally at 250 m/s where the vertical component of the Earth's field is $4\\times10^{-5}$ T.\n\n1. The wings cut the vertical component: $\\mathcal E = B_Vvl = 4\\times10^{-5}\\times250\\times30 = 0.3$ V between the wingtips.\n2. No current flows along the wings (there is no closed circuit), but the emf is real.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"no closed circuit means no emf\"",
      content:
        "The emf comes from $q\\vec v\\times\\vec B$ acting on the charges in the moving conductor, circuit or no circuit. In an isolated rod, charges pile up at the ends until their electric field balances the magnetic push; then a voltmeter across the ends reads $Bvl$. A closed circuit is needed only for a **steady current**.",
    },
    {
      type: "quiz",
      id: "em5-2-q1",
      variant: "practice",
      question: "A 0.5 m rod moves at 4 m/s perpendicular to a 0.5 T field (rod, velocity and field mutually perpendicular). The emf across it is",
      options: [
        { text: "2 V", feedback: "That is $Bv$ without the length. Multiply by $l = 0.5$ m." },
        { text: "1 V", correct: true, feedback: "$Bvl = 0.5\\times4\\times0.5 = 1$ V." },
        { text: "0.5 V", feedback: "The factor $\\tfrac12$ belongs to a rotating rod. Every point of a sliding rod moves at the same speed." },
        { text: "Zero, since the rod is not part of a circuit", feedback: "The emf exists in the moving rod whether or not current flows." },
      ],
    },
    {
      type: "quiz",
      id: "em5-2-q2",
      variant: "practice",
      question: "A 0.5 m rod rotates about one end at 20 rad/s in a 0.4 T field parallel to the rotation axis. The emf between its ends is",
      options: [
        { text: "2 V", feedback: "You left out the $\\tfrac12$: different parts of the rod move at different speeds, averaging half the tip speed." },
        { text: "4 V", feedback: "That is $B\\omega l = 0.4\\times20\\times0.5$. The length must appear squared (once in the tip speed $\\omega l$, once as the rod's length), with the factor $\\tfrac12$ from averaging the speed along the rod." },
        { text: "1 V", correct: true, feedback: "$\\tfrac12 B\\omega l^2 = \\tfrac12\\times0.4\\times20\\times0.25 = 1$ V." },
        { text: "0.5 V", feedback: "Check: $\\omega l^2 = 20\\times0.25 = 5$, and $\\tfrac12\\times0.4\\times5 = 1$ V." },
      ],
    },
    {
      type: "quiz",
      id: "em5-2-q3",
      variant: "practice",
      question: "A 0.2 m rod slides at a steady 5 m/s on rails joined by a 0.5 Ω resistor, in a 1 T field perpendicular to the plane. The force needed to keep it moving is",
      options: [
        { text: "0.4 N", correct: true, feedback: "$\\mathcal E = 1$ V, $I = 2$ A, $F = BIl = 1\\times2\\times0.2 = 0.4$ N. Check: $Fv = 2$ W $= I^2R$." },
        { text: "Zero, since the speed is constant", feedback: "Constant speed means zero **net** force. The magnetic drag must be balanced by an applied force." },
        { text: "2 N", feedback: "That is the current in amperes. Force is $BIl$." },
        { text: "0.08 N", feedback: "Check the current: $I = \\mathcal E/R = 1/0.5 = 2$ A." },
      ],
    },
    {
      type: "quiz",
      id: "em5-2-q4",
      variant: "concept",
      question: "In the falling-rod setup, the field is doubled and nothing else changes. The terminal speed becomes",
      options: [
        { text: "half", feedback: "$B$ appears in both the emf and the force on the current, so $v_t \\propto 1/B^2$." },
        { text: "a quarter", correct: true, feedback: "$v_t = \\dfrac{mgR}{B^2l^2}$: double $B$, quarter $v_t$." },
        { text: "twice as large", feedback: "A stronger field brakes harder, so the terminal speed drops." },
        { text: "unchanged", feedback: "The braking force depends on $B^2$." },
      ],
    },
    {
      type: "quiz",
      id: "em5-2-q5",
      variant: "concept",
      question: "Why are transformer cores made of thin laminated sheets instead of solid iron?",
      options: [
        { text: "To increase the flux linkage between the coils", feedback: "Lamination does not increase the linkage; soft iron does that. Laminating is about losses." },
        { text: "To make the core lighter", feedback: "A laminated core contains nearly as much iron as a solid one." },
        { text: "To increase hysteresis loss", feedback: "Hysteresis loss is reduced by choosing soft iron; nobody wants to increase it." },
        { text: "To break up eddy-current loops and reduce the heat they waste", correct: true, feedback: "Insulating layers cut the paths the eddy currents would take, shrinking the loss." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "self-and-mutual-inductance",
  title: "5.3 · Self and Mutual Inductance",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Pull the plug of a vacuum cleaner while it is running and you may see a spark jump at the socket. The motor's coils were carrying a current, and that current made a magnetic field threading the coils themselves. When the current collapses, so does the flux, and by Faraday's law the collapsing flux induces a large emf in the very coil that produced it. A coil reacts to changes in its **own** current.",
    },
    {
      type: "text",
      content:
        "**Self-inductance.** A current $I$ in a coil makes a field proportional to $I$, so the total flux through its $N$ turns (the flux linkage) is also proportional to $I$. The constant is the coil's self-inductance $L$:",
    },
    { type: "math", latex: "N\\Phi = LI \\quad\\Longrightarrow\\quad \\mathcal E = -\\frac{d(N\\Phi)}{dt} = -L\\,\\frac{dI}{dt}" },
    {
      type: "callout",
      variant: "definition",
      title: "Inductance",
      content:
        "**Self-inductance** $L$: flux linkage per unit current, $N\\Phi = LI$. The back emf is $\\mathcal E = -L\\,dI/dt$. Unit: the henry, $1\\text{ H} = 1$ Wb/A $= 1$ V s/A.\n**Mutual inductance** $M$: flux linked with coil 2 per unit current in coil 1, $N_2\\Phi_2 = MI_1$, so $\\mathcal E_2 = -M\\,dI_1/dt$. $M$ is the same whichever coil carries the current.\nLike capacitance, both depend only on geometry and the core material.",
    },
    {
      type: "text",
      content:
        "**L of a long solenoid.** With $n = N/l$ turns per metre, cross-section $A$ and length $l$, the field inside is $B = \\mu_0 nI$ (4.4). The flux linkage is $N\\Phi = (nl)(\\mu_0 nI)A$, so",
    },
    { type: "math", latex: "L = \\mu_0 n^2 A l = \\frac{\\mu_0 N^2 A}{l}" },
    {
      type: "text",
      content:
        "$L$ grows as $N^2$: doubling the turns doubles the field **and** doubles the number of turns the field threads. With an iron core, $\\mu_0 \\to \\mu_0\\mu_r$ and $L$ rises by hundreds or thousands. For two coaxial solenoids, an inner one of area $A$ and a long outer one wound over it, the outer coil's field $\\mu_0 n_1I_1$ threads all $n_2l$ turns of the inner coil: $M = \\mu_0 n_1 n_2 A l$. In general $M = k\\sqrt{L_1L_2}$ with coupling coefficient $0 \\le k \\le 1$.",
    },
    {
      type: "text",
      content:
        "For a solenoid 0.5 m long with cross-section $10^{-3}$ m², $L = \\dfrac{4\\pi\\times10^{-7}N^2\\times10^{-3}}{0.5}$. With $N$ counted in hundreds, that is $L \\approx 0.02513\\,N^2$ mH.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "0.02513*x^2",
        exprLatex: "L = \\frac{\\mu_0 N^2 A}{l} \\approx 0.0251\\,N_{100}^2\\ \\text{mH}",
        min: 1,
        max: 20,
        step: 1,
        initial: 5,
        inputLabel: "Number of turns (in hundreds)",
        outputLabel: "Self-inductance (mH)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: 500 turns give about 0.63 mH, and 1000 turns give about 2.5 mH, four times as much. Doubling the turns quadruples the inductance.",
    },
    {
      type: "text",
      content:
        "**Energy stored.** To build up the current, the source must push against the back emf $L\\,dI/dt$. The power it supplies is $P = \\mathcal E I = LI\\,\\dfrac{dI}{dt}$, so the work to go from 0 to $I$ is",
    },
    { type: "math", latex: "U = \\int_0^I LI'\\,dI' = \\tfrac12 LI^2" },
    {
      type: "text",
      content:
        "This is the magnetic twin of $\\tfrac12 CV^2$ (and of $\\tfrac12 mv^2$: $L$ plays the part of mass, resisting changes in current as mass resists changes in velocity). For a solenoid, $\\tfrac12LI^2 = \\tfrac12\\mu_0n^2I^2(Al) = \\dfrac{B^2}{2\\mu_0}(Al)$, so the field itself stores energy with density $u_B = \\dfrac{B^2}{2\\mu_0}$, just as the electric field stores $\\tfrac12\\varepsilon_0E^2$.\n\n**Combinations** (no mutual coupling). In series the back emfs add, so $L = L_1 + L_2$. In parallel the same emf drives both and the rates of change add, so $\\dfrac1L = \\dfrac1{L_1} + \\dfrac1{L_2}$. Inductors combine like resistors.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a solenoid).** Find $L$ for a 500-turn air-cored solenoid, 0.5 m long, with cross-section $10^{-3}$ m².\n\n1. $L = \\dfrac{\\mu_0 N^2A}{l} = \\dfrac{4\\pi\\times10^{-7}\\times250\\,000\\times10^{-3}}{0.5}$.\n2. $250\\,000\\times10^{-3}/0.5 = 500$, so $L = 4\\pi\\times10^{-7}\\times500 \\approx 6.3\\times10^{-4}$ H $= 0.63$ mH. *Why this step:* grouping the powers of ten first keeps the arithmetic safe.\n\n**Worked example 2 (back emf).** The current in a 50 mH coil changes by 2 A in 1 ms.\n\n1. $|\\mathcal E| = L\\dfrac{\\Delta I}{\\Delta t} = 0.05\\times\\dfrac{2}{10^{-3}} = 100$ V. A small inductor and a quick change give a large voltage: the spark at the plug.\n\n**Worked example 3 (energy).** How much energy does the 50 mH coil store at 2 A?\n\n1. $U = \\tfrac12 LI^2 = \\tfrac12\\times0.05\\times4 = 0.1$ J.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (mutual inductance).** A long solenoid with 1000 turns per metre is wound over a coaxial inner solenoid with 2000 turns per metre, cross-section $10^{-3}$ m² and length 0.5 m. Find $M$.\n\n1. $M = \\mu_0n_1n_2Al = 4\\pi\\times10^{-7}\\times1000\\times2000\\times10^{-3}\\times0.5$. *Why this step:* the outer field is uniform over the inner coil's area, and it threads every one of the inner coil's $n_2l$ turns.\n2. $n_1n_2Al = 2\\times10^6\\times10^{-3}\\times0.5 = 1000$, so $M = 4\\pi\\times10^{-4} \\approx 1.26$ mH.\n\n**Worked example 5 (energy density).** Find the energy density in a 1 T field.\n\n1. $u_B = \\dfrac{B^2}{2\\mu_0} = \\dfrac{1}{2\\times4\\pi\\times10^{-7}} \\approx 4.0\\times10^5$ J/m³. A strong magnetic field stores a lot of energy per cubic metre.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"an inductor opposes current\"",
      content:
        "An ideal inductor has no resistance and happily carries any steady current with zero voltage across it. What it opposes is a **change** in current: $\\mathcal E = -L\\,dI/dt$ is zero when $I$ is constant. It resists speeding up the current and it resists slowing it down, which is why breaking an inductive circuit makes a spark.",
    },
    {
      type: "quiz",
      id: "em5-3-q1",
      variant: "practice",
      question: "The current in a 20 mH inductor falls steadily from 5 A to 0 in 0.01 s. The induced emf is",
      options: [
        { text: "10 V", correct: true, feedback: "$L\\dfrac{\\Delta I}{\\Delta t} = 0.02\\times\\dfrac{5}{0.01} = 10$ V." },
        { text: "0.1 V", feedback: "That is $L\\Delta I$, without dividing by the time." },
        { text: "0.25 J", feedback: "That is the energy $\\tfrac12 LI^2$ at 5 A, not an emf." },
        { text: "1000 V", feedback: "Check the units: 20 mH is 0.02 H." },
      ],
    },
    {
      type: "quiz",
      id: "em5-3-q2",
      variant: "practice",
      question: "A 0.4 H inductor carries 2 A. The energy stored in it is",
      options: [
        { text: "1.6 J", feedback: "You left out the $\\tfrac12$." },
        { text: "0.4 J", feedback: "That uses $I$ instead of $I^2$." },
        { text: "0.8 J", correct: true, feedback: "$\\tfrac12\\times0.4\\times2^2 = 0.8$ J." },
        { text: "Zero, since the current is steady", feedback: "A steady current means no emf, but the magnetic field still stores energy." },
      ],
    },
    {
      type: "quiz",
      id: "em5-3-q3",
      variant: "concept",
      question: "A solenoid is rewound with twice as many turns over the same length and cross-section. Its self-inductance becomes",
      options: [
        { text: "twice as large", feedback: "The field doubles **and** it threads twice as many turns." },
        { text: "unchanged, since the geometry is the same", feedback: "The number of turns is part of the geometry that fixes $L$." },
        { text: "four times as large", correct: true, feedback: "$L = \\mu_0 N^2A/l \\propto N^2$." },
        { text: "half as large", feedback: "More turns mean more flux linkage per ampere, so more inductance." },
      ],
    },
    {
      type: "quiz",
      id: "em5-3-q4",
      variant: "practice",
      question: "Two coils have mutual inductance 0.05 H. The current in the first rises at 40 A/s. The emf induced in the second is",
      options: [
        { text: "2 V", correct: true, feedback: "$M\\dfrac{dI_1}{dt} = 0.05\\times40 = 2$ V." },
        { text: "800 V", feedback: "That divides 40 by 0.05. Multiply." },
        { text: "0.05 V", feedback: "Multiply by the rate of change, 40 A/s." },
        { text: "Zero, because the second coil carries no current", feedback: "The emf is induced whether or not the second coil is connected to anything." },
      ],
    },
    {
      type: "quiz",
      id: "em5-3-q5",
      variant: "practice",
      question: "Inductors of 2 mH and 3 mH, far apart (no mutual coupling), are connected in parallel. The equivalent inductance is",
      options: [
        { text: "5 mH", feedback: "That is the series combination." },
        { text: "0.83 mH", feedback: "That is $\\tfrac12 + \\tfrac13$ without flipping: $1/L = 0.83$, so $L = 1.2$ mH." },
        { text: "6 mH", feedback: "That is the product, not product over sum." },
        { text: "1.2 mH", correct: true, feedback: "$\\dfrac{2\\times3}{2 + 3} = 1.2$ mH: inductors combine like resistors." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "lr-circuits-and-lc-oscillations",
  title: "5.4 · LR Circuits and LC Oscillations",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "In Chapter 2 you saw a capacitor charge through a resistor, its voltage rising along a curve with time constant $RC$. An inductor does the mirror-image thing with **current**. Switch on a battery in series with an inductor and a resistor, and the current cannot jump to $\\mathcal E/R$: the inductor's back emf holds it back, and it creeps up exponentially.",
    },
    {
      type: "text",
      content:
        "**Growth.** Go round the loop with KVL: the battery's emf, minus the resistor's drop, minus the inductor's back emf:",
    },
    {
      type: "math",
      latex: "\\mathcal E - iR - L\\frac{di}{dt} = 0 \\;\\Longrightarrow\\; \\frac{di}{\\mathcal E/R - i} = \\frac{R}{L}\\,dt \\;\\Longrightarrow\\; i = \\frac{\\mathcal E}{R}\\left(1 - e^{-Rt/L}\\right)",
    },
    {
      type: "text",
      content:
        "(The last step integrates from $i = 0$ at $t = 0$.) **Decay.** Remove the battery and close the loop through $R$: now $iR + L\\,di/dt = 0$, so $i = I_0e^{-Rt/L}$. In both cases the time scale is",
    },
    {
      type: "callout",
      variant: "definition",
      title: "LR time constant",
      content:
        "$\\tau = \\dfrac{L}{R}$. After one $\\tau$ a growing current reaches 63% of its final value $\\mathcal E/R$; a decaying current falls to 37% of $I_0$. The half-way time is $\\tau\\ln2 \\approx 0.69\\tau$.\n**At the instant of switching**, an inductor keeps whatever current it had: an inductor with no current acts as an **open circuit**. **Long after**, when $di/dt = 0$, an ideal inductor acts as a plain **wire**.",
    },
    {
      type: "text",
      content:
        "In the lab below (mode LR, current growth), the curve is $i/(\\mathcal E/R)$ against time in ms, with $\\tau$ marked. With $L = 100$ mH and $R = 100\\ \\Omega$, $\\tau = 1$ ms. Change $L$ and $R$.",
    },
    {
      type: "interactive",
      config: {
        component: "em-circuit-lab",
        mode: "lr",
        process: "charge",
        caption:
          "Raise L and the curve stretches (a bigger inductor resists change longer); raise R and it squeezes (τ = L/R falls, and the final current E/R falls too). The dashed ghost keeps the starting curve.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: every curve starts at zero current with its steepest slope, $di/dt = \\mathcal E/L$ at $t = 0$ (all the battery's emf is across the inductor), and flattens towards $\\mathcal E/R$. Doubling $L$ doubles $\\tau$. Now watch the decay, with a 12 V source switched out.",
    },
    {
      type: "interactive",
      config: {
        component: "em-circuit-lab",
        mode: "lr",
        process: "discharge",
        emf: 12,
        caption:
          "The source is removed and the inductor keeps the current flowing through R, dying away with the same τ = L/R.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the current does not drop to zero at once; the inductor's stored energy $\\tfrac12LI_0^2$ keeps it going, and it is dissipated in $R$ over a few $\\tau$. **Why opening a switch sparks:** if you simply break the circuit, there is no $R$ to carry the current; $di/dt$ becomes huge, so $L\\,di/dt$ becomes a very large voltage across the gap, enough to ionise the air.",
    },
    {
      type: "text",
      content:
        "**LC oscillations.** Charge a capacitor to $Q_0$ and connect it across an ideal inductor. The capacitor starts to discharge, but the inductor makes the current build up gradually; when the capacitor is empty the current is at its largest, and the inductor keeps it flowing, charging the capacitor the other way. KVL, with $i = dq/dt$:",
    },
    {
      type: "math",
      latex: "\\frac{q}{C} + L\\frac{di}{dt} = 0 \\;\\Longrightarrow\\; \\frac{d^2q}{dt^2} = -\\frac{1}{LC}\\,q \\;\\Longrightarrow\\; q = Q_0\\cos\\omega t,\\quad \\omega = \\frac{1}{\\sqrt{LC}}",
    },
    {
      type: "text",
      content:
        "This is simple harmonic motion: the equation of a mass on a spring, with $q \\leftrightarrow x$, $L \\leftrightarrow m$ and $1/C \\leftrightarrow k$. The current is $i = -\\omega Q_0\\sin\\omega t$, with amplitude $I_0 = \\omega Q_0$. The energy sloshes between the capacitor's electric field and the inductor's magnetic field, and the total stays fixed:",
    },
    { type: "math", latex: "\\frac{q^2}{2C} + \\frac12Li^2 = \\frac{Q_0^2}{2C} = \\frac12LI_0^2" },
    {
      type: "text",
      content:
        "**Worked example 1 (growth).** A coil with $L = 0.5$ H and $R = 10\\ \\Omega$ is connected to a 20 V battery. Find $\\tau$, the final current, and the current after $2\\tau$.\n\n1. $\\tau = L/R = 0.05$ s $= 50$ ms. Final current $\\mathcal E/R = 2$ A.\n2. $i(2\\tau) = 2(1 - e^{-2}) = 2\\times0.865 \\approx 1.73$ A. *Why this step:* $e^{-2} \\approx 0.135$ is worth remembering, as is $e^{-1} \\approx 0.368$.\n\n**Worked example 2 (just after, long after).** An ideal 12 V battery is in series with $R_1 = 2\\ \\Omega$, followed by two parallel branches: $R_2 = 6\\ \\Omega$, and an ideal inductor in series with $R_3 = 3\\ \\Omega$. Find the battery current just after the switch closes and long after.\n\n1. Just after: the inductor carries no current (open circuit). The battery sees $2 + 6 = 8\\ \\Omega$: $I = 1.5$ A. *Why this step:* the inductor's current cannot jump from its value before the switch closed, which was zero.\n2. Long after: the inductor is a wire, so its branch is 3 Ω. $6\\parallel3 = 2\\ \\Omega$; total $4\\ \\Omega$; $I = 3$ A.\n3. The voltage across the parallel pair is then $3\\times2 = 6$ V, so the inductor branch carries $6/3 = 2$ A.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (LC).** A 10 μF capacitor charged to 100 μC is connected to a 0.1 H inductor. Find $\\omega$, the maximum current and the energy.\n\n1. $\\omega = \\dfrac{1}{\\sqrt{0.1\\times10^{-5}}} = \\dfrac{1}{10^{-3}} = 1000$ rad/s ($f \\approx 159$ Hz).\n2. $I_0 = \\omega Q_0 = 1000\\times10^{-4} = 0.1$ A.\n3. Check by energy: $\\dfrac{Q_0^2}{2C} = \\dfrac{10^{-8}}{2\\times10^{-5}} = 5\\times10^{-4}$ J and $\\tfrac12LI_0^2 = \\tfrac12\\times0.1\\times0.01 = 5\\times10^{-4}$ J. ✓ *Why this step:* energy conservation is an independent route to $I_0$.\n\n**Worked example 4 (half-way time).** For the coil in Worked example 1, when is the current 1 A?\n\n1. $1 = 2(1 - e^{-t/\\tau})$ gives $e^{-t/\\tau} = \\tfrac12$, so $t = \\tau\\ln2 = 50\\times0.693 \\approx 34.7$ ms.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the current through an inductor can change instantly\"",
      content:
        "A sudden jump in current would mean $di/dt \\to \\infty$ and an infinite emf $L\\,di/dt$, which no circuit can supply. The inductor's current is continuous in time (just as a capacitor's **voltage** is). So in \"just after switching\" problems, first write down each inductor's current from just before, and keep it.",
    },
    {
      type: "quiz",
      id: "em5-4-q1",
      variant: "practice",
      question: "An LR circuit has $L = 0.2$ H and $R = 10\\ \\Omega$. Its time constant is",
      options: [
        { text: "2 s", feedback: "That is $LR$. The time constant is $L/R$." },
        { text: "20 ms", correct: true, feedback: "$\\tau = L/R = 0.2/10 = 0.02$ s." },
        { text: "50 s", feedback: "That is $R/L$, which has units of 1/s, not seconds." },
        { text: "2 ms", feedback: "Check: $0.2/10 = 0.02$ s $= 20$ ms." },
      ],
    },
    {
      type: "quiz",
      id: "em5-4-q2",
      variant: "concept",
      question: "At the instant a switch connects a battery to a resistor and an uncharged ideal inductor in series, the current and the voltage across the inductor are",
      options: [
        { text: "$\\mathcal E/R$; zero across the inductor", feedback: "That is the state long after, when the inductor acts as a wire." },
        { text: "zero current; zero voltage across the inductor", feedback: "KVL: with no current there is no drop across $R$, so the inductor must take the full emf." },
        { text: "$\\mathcal E/R$; $\\mathcal E$ across the inductor", feedback: "Both at once would break KVL: the resistor would also need $\\mathcal E$." },
        { text: "zero current; the full battery emf across the inductor", correct: true, feedback: "The current cannot jump, so it starts at zero; with no $iR$ drop, KVL puts all of $\\mathcal E$ across $L$." },
      ],
    },
    {
      type: "quiz",
      id: "em5-4-q3",
      variant: "practice",
      question: "A 10 μF capacitor holding 50 μC is connected across a 25 mH inductor. The maximum current is",
      options: [
        { text: "0.05 A", feedback: "That uses $\\omega = 1000$ rad/s from Worked example 3. Recompute $\\omega$ for these $L$ and $C$." },
        { text: "0.1 A", correct: true, feedback: "$\\omega = 1/\\sqrt{0.025\\times10^{-5}} = 2000$ rad/s; $I_0 = \\omega Q_0 = 2000\\times5\\times10^{-5} = 0.1$ A." },
        { text: "0.2 A", feedback: "Check $\\omega$: $LC = 2.5\\times10^{-7}$ s², so $\\omega = 2000$ rad/s." },
        { text: "0.016 A", feedback: "That uses the frequency $f = \\omega/2\\pi$ instead of $\\omega$." },
      ],
    },
    {
      type: "quiz",
      id: "em5-4-q4",
      variant: "practice",
      question: "An LR circuit with $\\tau = 50$ ms is switched on. The time for the current to reach half its final value is about",
      options: [
        { text: "25 ms", feedback: "The growth is exponential, not linear, so half-way is not at $\\tau/2$." },
        { text: "50 ms", feedback: "At $t = \\tau$ the current is 63% of the final value, past half." },
        { text: "35 ms", correct: true, feedback: "$t = \\tau\\ln2 = 50\\times0.693 \\approx 35$ ms." },
        { text: "115 ms", feedback: "That is $\\tau\\ln10$, the time to reach 90%." },
      ],
    },
    {
      type: "quiz",
      id: "em5-4-q5",
      variant: "concept",
      question: "In an LC circuit, at the moment the capacitor's charge is $Q_0/2$, what fraction of the total energy is in the inductor?",
      options: [
        { text: "$\\tfrac34$", correct: true, feedback: "Electric energy $\\propto q^2$ is $\\tfrac14$ of the total, so the magnetic energy is the remaining $\\tfrac34$." },
        { text: "$\\tfrac12$", feedback: "Half the charge is not half the energy: energy goes as $q^2$." },
        { text: "$\\tfrac14$", feedback: "That is the fraction in the capacitor." },
        { text: "0", feedback: "The inductor has zero energy only when the capacitor is fully charged." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "alternating-current-and-phasors",
  title: "5.5 · Alternating Current and Phasors",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A coil spinning at a steady rate in a magnetic field has a flux $NBA\\cos\\omega t$ through it, so Faraday's law gives an emf $NBA\\omega\\sin\\omega t$. That is how every power station generates electricity, and why the mains supply is not a steady voltage but a sine wave, reversing 100 times a second in India (50 Hz).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Alternating voltage",
      content:
        "$v = V_0\\sin\\omega t$, with peak (amplitude) $V_0$, angular frequency $\\omega = 2\\pi f$ and period $T = 1/f$.\nThe **rms** (root-mean-square) value is $V_{\\text{rms}} = \\dfrac{V_0}{\\sqrt2}$: the steady voltage that would heat a resistor at the same average rate. Meters and ratings quote rms values: \"220 V mains\" means $V_{\\text{rms}} = 220$ V.",
    },
    {
      type: "text",
      content:
        "**Averages.** Over a full cycle, a sine wave is positive as much as negative, so its mean is **zero**. Over a half cycle,",
    },
    { type: "math", latex: "\\bar v_{\\text{half}} = \\frac{1}{\\pi}\\int_0^{\\pi} V_0\\sin\\theta\\,d\\theta = \\frac{V_0}{\\pi}\\big[-\\cos\\theta\\big]_0^{\\pi} = \\frac{2V_0}{\\pi} \\approx 0.637\\,V_0" },
    {
      type: "text",
      content:
        "Heating depends on $v^2$ (power $v^2/R$), which is never negative. Since $\\sin^2\\theta = \\tfrac12(1 - \\cos2\\theta)$ and the $\\cos2\\theta$ part averages to zero over a cycle, the mean of $\\sin^2$ is $\\tfrac12$:",
    },
    { type: "math", latex: "\\overline{v^2} = V_0^2\\,\\overline{\\sin^2\\omega t} = \\frac{V_0^2}{2} \\;\\Longrightarrow\\; V_{\\text{rms}} = \\sqrt{\\overline{v^2}} = \\frac{V_0}{\\sqrt2} \\approx 0.707\\,V_0" },
    {
      type: "text",
      content:
        "**Phasors.** Every sinusoid is the shadow of a rotating arrow. Draw an arrow of length $V_0$ from the origin, turning anticlockwise at $\\omega$; its vertical projection at time $t$ is $V_0\\sin\\omega t$. This arrow is a **phasor**. Two sinusoids of the same frequency are two arrows turning together, keeping a fixed angle between them: the **phase difference**. Adding sinusoids becomes adding arrows, the vector addition you already know.",
    },
    {
      type: "interactive",
      config: {
        component: "circle-to-wave",
        fn: "sin",
        caption: "A phasor of length V₀ turning at ω: its height traces v = V₀ sin ωt.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: as the arrow turns once, its height traces one full cycle of the sine wave. The angle of the arrow at any moment is the phase $\\omega t$.",
    },
    {
      type: "text",
      content:
        "**Each element alone.** Let the current be $i = I_0\\sin\\omega t$.\n\n**Resistor:** $v = iR = I_0R\\sin\\omega t$. Voltage and current are **in phase**; $V_0 = I_0R$.\n\n**Inductor:** $v = L\\dfrac{di}{dt} = \\omega LI_0\\cos\\omega t = \\omega LI_0\\sin(\\omega t + 90^\\circ)$. The voltage **leads** the current by $90^\\circ$ (the current lags). The ratio $V_0/I_0 = \\omega L$ is the **inductive reactance** $X_L$.\n\n**Capacitor:** now start from the voltage, $v = V_0\\sin\\omega t$. Then $q = Cv$ and $i = \\dfrac{dq}{dt} = \\omega CV_0\\cos\\omega t = \\omega CV_0\\sin(\\omega t + 90^\\circ)$. The current **leads** the voltage by $90^\\circ$. The ratio $V_0/I_0 = \\dfrac{1}{\\omega C}$ is the **capacitive reactance** $X_C$.",
    },
    {
      type: "table",
      headers: ["Element", "Opposition (Ω)", "Grows with f?", "Phase of current relative to voltage"],
      rows: [
        ["R", "$R$", "no", "in phase"],
        ["L", "$X_L = \\omega L$", "yes, $\\propto f$", "lags by $90^\\circ$"],
        ["C", "$X_C = \\dfrac{1}{\\omega C}$", "no, $\\propto 1/f$", "leads by $90^\\circ$"],
      ],
    },
    {
      type: "text",
      content:
        "Memory aid: **ELI the ICE man**. In an inductor (L), the emf E comes before the current I; in a capacitor (C), I comes before E. The physics: an inductor fights changes in current, so the current is always catching up; a capacitor's voltage can only build up after current has delivered charge. Try the inductor first, then the capacitor.",
    },
    {
      type: "interactive",
      config: {
        component: "em-circuit-lab",
        mode: "ac-element",
        element: "L",
        caption:
          "An inductor alone across the source. Raise f and watch the current amplitude shrink (X_L = 2πfL grows); the current phasor stays 90° behind the voltage.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "em-circuit-lab",
        mode: "ac-element",
        element: "C",
        caption:
          "A capacitor alone. Now raising f makes the current grow (X_C = 1/2πfC falls), and the current phasor runs 90° ahead of the voltage.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: for L and C the current amplitude depends on frequency, in opposite ways. An inductor passes low frequencies easily and blocks high ones (at DC it is a wire); a capacitor blocks low frequencies and passes high ones (at DC it is a break). Try the same with $R$ alone and the current does not care about $f$ at all.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (mains peak).** Indian mains is 220 V rms. Find the peak.\n\n1. $V_0 = \\sqrt2\\,V_{\\text{rms}} = 1.414\\times220 \\approx 311$ V. *Why this step:* the rating is always rms, so the wires actually swing between +311 V and −311 V.\n\n**Worked example 2 (reactances).** Find $X_L$ for 0.1 H and $X_C$ for 10 μF at 50 Hz.\n\n1. $\\omega = 2\\pi\\times50 \\approx 314$ rad/s.\n2. $X_L = \\omega L = 314\\times0.1 \\approx 31.4\\ \\Omega$.\n3. $X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{314\\times10^{-5}} \\approx 318\\ \\Omega$.\n\n**Worked example 3 (current through a capacitor).** The 10 μF capacitor is connected across the 220 V, 50 Hz mains.\n\n1. $I_{\\text{rms}} = \\dfrac{V_{\\text{rms}}}{X_C} = \\dfrac{220}{318} \\approx 0.69$ A. *Why this step:* reactance plays the part of resistance for rms (or peak) values, though not for instantaneous ones, because of the phase shift.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (half-cycle mean).** Find the mean voltage of the mains over a half cycle.\n\n1. $\\bar v = \\dfrac{2V_0}{\\pi} = \\dfrac{2\\times311}{\\pi} \\approx 198$ V. Note the order: mean over a half cycle (198 V) < rms (220 V) < peak (311 V).\n\n**Worked example 5 (a current with a DC part).** A current is $i = 3 + 4\\sin\\omega t$ A. Find its rms value.\n\n1. $i^2 = 9 + 24\\sin\\omega t + 16\\sin^2\\omega t$.\n2. Average over a cycle: $9 + 0 + 16\\times\\tfrac12 = 17$. *Why this step:* the cross term is a pure sine and averages to zero; $\\sin^2$ averages to $\\tfrac12$.\n3. $I_{\\text{rms}} = \\sqrt{17} \\approx 4.12$ A. It is not $3 + 4/\\sqrt2 \\approx 5.83$ A; rms values do not simply add.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the average AC voltage over a cycle is $V_0/\\sqrt2$\"",
      content:
        "Over a full cycle the average voltage is **zero**: the positive and negative halves cancel. $V_0/\\sqrt2$ is the **root mean square**, the square root of the average of $v^2$, which is the useful measure of heating. The half-cycle mean, $2V_0/\\pi$, is a third, different number.",
    },
    {
      type: "quiz",
      id: "em5-5-q1",
      variant: "practice",
      question: "An AC voltage is $v = 311\\sin(100\\pi t)$ V. Its rms value and frequency are",
      options: [
        { text: "311 V, 50 Hz", feedback: "311 V is the peak. The rms is $V_0/\\sqrt2$." },
        { text: "220 V, 50 Hz", correct: true, feedback: "$311/\\sqrt2 \\approx 220$ V and $f = \\omega/2\\pi = 100\\pi/2\\pi = 50$ Hz." },
        { text: "220 V, 100 Hz", feedback: "$\\omega = 100\\pi$ rad/s means $f = 50$ Hz." },
        { text: "198 V, 50 Hz", feedback: "That is the half-cycle mean $2V_0/\\pi$, not the rms." },
      ],
    },
    {
      type: "quiz",
      id: "em5-5-q2",
      variant: "practice",
      question: "The reactance of a 0.2 H inductor at 50 Hz is about",
      options: [
        { text: "10 Ω", feedback: "That is $fL$. The reactance uses $\\omega = 2\\pi f$." },
        { text: "0.016 Ω", feedback: "That is $1/\\omega L$, the form for a capacitor." },
        { text: "0.2 Ω", feedback: "Inductance in henries is not a reactance in ohms; multiply by $\\omega$." },
        { text: "62.8 Ω", correct: true, feedback: "$X_L = 2\\pi fL = 2\\pi\\times50\\times0.2 \\approx 62.8\\ \\Omega$." },
      ],
    },
    {
      type: "quiz",
      id: "em5-5-q3",
      variant: "concept",
      question: "The frequency of the supply to a capacitor is doubled at the same rms voltage. The rms current",
      options: [
        { text: "doubles", correct: true, feedback: "$X_C = 1/\\omega C$ halves, so $I = V/X_C$ doubles." },
        { text: "halves", feedback: "That is what happens for an inductor, whose reactance grows with frequency." },
        { text: "is unchanged", feedback: "That is true for a resistor only." },
        { text: "becomes zero", feedback: "Only at zero frequency (DC) does a capacitor block current completely." },
      ],
    },
    {
      type: "quiz",
      id: "em5-5-q4",
      variant: "practice",
      question: "A current is $i = 2 + 2\\sqrt2\\sin\\omega t$ A. Its rms value is",
      options: [
        { text: "4 A", feedback: "That adds 2 A and the rms of the sine part, 2 A. Squares add, not the values." },
        { text: "$2 + 2\\sqrt2$ A", feedback: "That is the peak current." },
        { text: "$2\\sqrt2$ A $\\approx 2.83$ A", correct: true, feedback: "$\\overline{i^2} = 4 + \\tfrac12(8) = 8$, so $I_{\\text{rms}} = \\sqrt8 = 2\\sqrt2$ A." },
        { text: "2 A", feedback: "That is the DC part alone; the sine part also heats." },
      ],
    },
    {
      type: "quiz",
      id: "em5-5-q5",
      variant: "concept",
      question: "In a circuit containing only an ideal inductor across an AC source, the current",
      options: [
        { text: "leads the voltage by $90^\\circ$", feedback: "That is the capacitor (ICE)." },
        { text: "is in phase with the voltage", feedback: "That is the resistor." },
        { text: "lags the voltage by $90^\\circ$", correct: true, feedback: "$v = L\\,di/dt$ peaks when $i$ is changing fastest, a quarter cycle before $i$ peaks." },
        { text: "lags the voltage by $180^\\circ$", feedback: "The shift for a pure inductor is exactly a quarter cycle." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "series-lcr-and-resonance",
  title: "5.6 · Series LCR and Resonance",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Turn the tuning knob on an old radio and one station comes in loud while all the others fade away. Inside is a coil and a capacitor in series: a circuit that responds strongly to one frequency and hardly at all to the rest. To see why, put R, L and C in series across an AC source and add their voltages the right way: as phasors.",
    },
    {
      type: "text",
      content:
        "**Building the phasor diagram.** In series the **current** is common, so use it as the reference: draw $I_0$ along the horizontal axis. Then, from 5.5:\n\n1. $V_R = I_0R$ lies **along** the current.\n2. $V_L = I_0X_L$ points **up**, $90^\\circ$ ahead of the current.\n3. $V_C = I_0X_C$ points **down**, $90^\\circ$ behind the current.\n\n$V_L$ and $V_C$ point in opposite directions and partly cancel, leaving $V_L - V_C$ vertical. The source voltage is the vector sum, the hypotenuse:",
    },
    {
      type: "math",
      latex: "V_0 = \\sqrt{V_R^2 + (V_L - V_C)^2} = I_0\\sqrt{R^2 + (X_L - X_C)^2}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Impedance and phase",
      content:
        "**Impedance** $Z = \\sqrt{R^2 + (X_L - X_C)^2}$, so $I_0 = V_0/Z$ (and $I_{\\text{rms}} = V_{\\text{rms}}/Z$).\n**Phase angle** of the voltage ahead of the current: $\\tan\\phi = \\dfrac{X_L - X_C}{R}$.\n$X_L > X_C$: $\\phi > 0$, voltage leads, the circuit is **inductive**. $X_L < X_C$: $\\phi < 0$, current leads, the circuit is **capacitive**.",
    },
    {
      type: "text",
      content:
        "The lab below starts at $R = 100\\ \\Omega$, $L = 100$ mH, $C = 10\\ \\mu$F and $f = 50$ Hz, with a 10 V peak source. Watch the phasors and move each slider in turn.",
    },
    {
      type: "interactive",
      config: {
        component: "em-circuit-lab",
        mode: "lcr",
        readouts: ["reactance", "impedance", "phase", "power", "resonance"],
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at 50 Hz the downward $V_C$ phasor is much longer than the upward $V_L$, so the circuit is capacitive and the current leads. Raise $f$ and $V_L$ grows while $V_C$ shrinks; at about 159 Hz they are equal and cancel completely, and the source voltage lines up with $V_R$. That special frequency is resonance.",
    },
    {
      type: "text",
      content:
        "**Resonance.** When $X_L = X_C$, i.e. $\\omega L = \\dfrac{1}{\\omega C}$:",
    },
    { type: "math", latex: "\\omega_0 = \\frac{1}{\\sqrt{LC}}, \\qquad f_0 = \\frac{1}{2\\pi\\sqrt{LC}}" },
    {
      type: "text",
      content:
        "At resonance $Z = R$, its smallest possible value, so the current is **largest**, $I_0 = V_0/R$, and it is in phase with the voltage ($\\phi = 0$). The inductor and capacitor voltages are equal and opposite. Each is $I_0X_L$, which can be **much larger than the source voltage**: they cancel each other in the sum, so the source never has to supply them. The same frequency $1/\\sqrt{LC}$ is the natural frequency of LC oscillations (5.4): resonance means driving the circuit at its own natural rhythm.",
    },
    {
      type: "text",
      content:
        "**Sharpness.** The **quality factor** $Q = \\dfrac{\\omega_0L}{R} = \\dfrac{1}{R}\\sqrt{\\dfrac LC}$ measures how sharp the peak is. At resonance $V_L = V_C = Q\\,V_{\\text{source}}$. The **half-power points** are the frequencies where the current falls to $I_{\\max}/\\sqrt2$ (so the power $I^2R$ halves); they are separated by the **bandwidth** $\\Delta\\omega = R/L$, and $Q = \\omega_0/\\Delta\\omega$. Small $R$ means a tall, narrow peak: a selective radio.",
    },
    {
      type: "interactive",
      config: {
        component: "em-circuit-lab",
        mode: "resonance",
        resistance: { min: 10, max: 200, step: 10, initial: 20 },
        frequency: { min: 50, max: 300, step: 1, initial: 100 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the current peaks at $f_0 \\approx 159$ Hz whatever $R$ is, because $R$ does not appear in $1/\\sqrt{LC}$. Raise $R$ from 20 Ω towards 200 Ω and the peak collapses and broadens (the dashed ghost keeps the starting curve). Change $L$ or $C$ and the peak slides sideways.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a capacitive circuit).** $R = 100\\ \\Omega$, $L = 0.1$ H, $C = 10\\ \\mu$F across a 10 V peak, 50 Hz source. Find $Z$, $\\phi$ and $I_0$.\n\n1. $X_L = 31.4\\ \\Omega$, $X_C = 318.3\\ \\Omega$ (5.5), so $X_L - X_C = -286.9\\ \\Omega$.\n2. $Z = \\sqrt{100^2 + 286.9^2} = \\sqrt{10\\,000 + 82\\,300} \\approx 304\\ \\Omega$. *Why this step:* the resistive and reactive parts are at right angles, so they combine by Pythagoras, not by adding.\n3. $\\tan\\phi = -2.869$, so $\\phi \\approx -70.8^\\circ$: the current leads the voltage by $70.8^\\circ$ (capacitive).\n4. $I_0 = 10/304 \\approx 0.033$ A.\n5. Check: $V_R = 3.3$ V, $V_L = 1.0$ V, $V_C = 10.5$ V. $\\sqrt{3.3^2 + (1.0 - 10.5)^2} \\approx 10$ V. ✓ (But $3.3 + 1.0 + 10.5 = 14.8$ V: the plain sum is wrong.)",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (resonant frequency).** Same $L$ and $C$.\n\n1. $\\omega_0 = \\dfrac{1}{\\sqrt{0.1\\times10^{-5}}} = \\dfrac{1}{10^{-3}} = 1000$ rad/s, so $f_0 = \\dfrac{1000}{2\\pi} \\approx 159$ Hz.\n\n**Worked example 3 (voltages at resonance).** Now $R = 20\\ \\Omega$, same $L$ and $C$, 10 V peak at 159 Hz.\n\n1. $Z = R = 20\\ \\Omega$, so $I_0 = 10/20 = 0.5$ A.\n2. $X_L = \\omega_0L = 1000\\times0.1 = 100\\ \\Omega$ $= X_C$.\n3. $V_{L0} = V_{C0} = 0.5\\times100 = 50$ V, **five times** the source voltage. *Why this step:* this is $Q = \\omega_0L/R = 5$ at work.\n\n**Worked example 4 (bandwidth).** For the same circuit find $\\Delta\\omega$ and check $Q$.\n\n1. $\\Delta\\omega = R/L = 20/0.1 = 200$ rad/s ($\\Delta f \\approx 32$ Hz).\n2. $Q = \\omega_0/\\Delta\\omega = 1000/200 = 5$. ✓\n\n**Worked example 5 (meter readings).** In a series LCR circuit, voltmeters read $V_R = 30$ V, $V_L = 80$ V and $V_C = 40$ V (rms). Find the source voltage.\n\n1. $V = \\sqrt{30^2 + (80 - 40)^2} = \\sqrt{900 + 1600} = 50$ V, not $30 + 80 + 40 = 150$ V.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$V_R + V_L + V_C$ equals the source voltage\"",
      content:
        "At every **instant** the three instantaneous voltages do add to the source's instantaneous voltage (KVL still holds). But their peaks occur at different moments, so the peak or rms values must be added as **phasors**: $V_L$ and $V_C$ subtract, and the result combines with $V_R$ at right angles. The meter readings can add up to far more than the source.",
    },
    {
      type: "quiz",
      id: "em5-6-q1",
      variant: "practice",
      question: "In a series LCR circuit, rms voltages across R, L and C are 30 V, 80 V and 40 V. The rms source voltage is",
      options: [
        { text: "50 V", correct: true, feedback: "$\\sqrt{30^2 + (80 - 40)^2} = 50$ V." },
        { text: "150 V", feedback: "That adds the readings as numbers. They are phasors at different angles." },
        { text: "70 V", feedback: "That is $30 + (80 - 40)$: $V_R$ and $V_L - V_C$ are at right angles." },
        { text: "94 V", feedback: "That is $\\sqrt{30^2 + 80^2 + 40^2}$. $V_L$ and $V_C$ point opposite ways, so subtract them first." },
      ],
    },
    {
      type: "quiz",
      id: "em5-6-q2",
      variant: "practice",
      question: "A series circuit has $R = 60\\ \\Omega$, $X_L = 30\\ \\Omega$ and $X_C = 110\\ \\Omega$. Its impedance and nature are",
      options: [
        { text: "100 Ω, inductive (current lags)", feedback: "$X_C > X_L$ makes it capacitive." },
        { text: "200 Ω, capacitive", feedback: "That adds $R + X_L + X_C$. Use $\\sqrt{R^2 + (X_L - X_C)^2}$." },
        { text: "140 Ω, capacitive", feedback: "That adds $R$ and $|X_L - X_C|$ directly; they are at right angles." },
        { text: "100 Ω, capacitive (current leads)", correct: true, feedback: "$Z = \\sqrt{60^2 + 80^2} = 100\\ \\Omega$; $X_C > X_L$, so the current leads." },
      ],
    },
    {
      type: "quiz",
      id: "em5-6-q3",
      variant: "practice",
      question: "A 0.25 H inductor and a 4 μF capacitor are in series. The resonant frequency is about",
      options: [
        { text: "1000 Hz", feedback: "That is $\\omega_0$ in rad/s. Divide by $2\\pi$." },
        { text: "159 Hz", correct: true, feedback: "$\\omega_0 = 1/\\sqrt{0.25\\times4\\times10^{-6}} = 1000$ rad/s, so $f_0 = 1000/2\\pi \\approx 159$ Hz." },
        { text: "6283 Hz", feedback: "That multiplies by $2\\pi$ instead of dividing." },
        { text: "It depends on the resistance.", feedback: "$f_0 = 1/2\\pi\\sqrt{LC}$ contains no $R$; resistance only sets the height and width of the peak." },
      ],
    },
    {
      type: "quiz",
      id: "em5-6-q4",
      variant: "practice",
      question: "With the inductor and capacitor of the previous question and $R = 50\\ \\Omega$, the quality factor is",
      options: [
        { text: "0.2", feedback: "That is $R/\\omega_0L$, upside down." },
        { text: "250", feedback: "That is $\\omega_0L$ in ohms. Divide by $R$." },
        { text: "0.8", feedback: "That uses $f_0 \\approx 159$ Hz in place of $\\omega_0 = 1000$ rad/s." },
        { text: "5", correct: true, feedback: "$Q = \\omega_0L/R = 1000\\times0.25/50 = 5$." },
      ],
    },
    {
      type: "quiz",
      id: "em5-6-q5",
      variant: "concept",
      question: "Which statement about a series LCR circuit at resonance is **false**?",
      options: [
        { text: "The impedance equals $R$.", feedback: "True: the reactances cancel." },
        { text: "The current is in phase with the source voltage.", feedback: "True: $\\phi = 0$." },
        { text: "The voltage across the inductor can never exceed the source voltage.", correct: true, feedback: "False, so this is the answer. $V_L = QV_{\\text{source}}$, which exceeds the source whenever $Q > 1$." },
        { text: "The current has its maximum value.", feedback: "True: $Z$ is smallest, so $I = V/Z$ is largest." },
      ],
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "ac-power-transformers-and-em-waves",
  title: "5.7 · AC Power, Transformers and EM Waves",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Electricity reaches your home through a chain: a generator at perhaps 11 kV, a transformer stepping it up to 220 kV or more for the long-distance lines, more transformers stepping it down to 11 kV for the city and 220 V for the house. Why all the stepping up and down? The answer is in how AC power is counted, and in the one device that makes AC so convenient: the transformer.",
    },
    {
      type: "text",
      content:
        "**Average power.** With $v = V_0\\sin\\omega t$ and $i = I_0\\sin(\\omega t - \\phi)$, the instantaneous power is $p = vi$. Expand $\\sin(\\omega t - \\phi)$:",
    },
    {
      type: "math",
      latex: "p = V_0I_0\\left[\\sin^2\\omega t\\cos\\phi - \\sin\\omega t\\cos\\omega t\\sin\\phi\\right] \\;\\Longrightarrow\\; \\bar p = \\tfrac12V_0I_0\\cos\\phi = V_{\\text{rms}}I_{\\text{rms}}\\cos\\phi",
    },
    {
      type: "text",
      content:
        "(The $\\sin^2$ term averages to $\\tfrac12$ and the $\\sin\\cos$ term to zero.) The factor $\\cos\\phi$ is the **power factor**. From the phasor triangle, $\\cos\\phi = R/Z$, and then $\\bar p = I_{\\text{rms}}^2R$: only the resistor ever consumes energy on average.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "AC power",
      content:
        "Average power $P = V_{\\text{rms}}I_{\\text{rms}}\\cos\\phi = I_{\\text{rms}}^2R$, with power factor $\\cos\\phi = R/Z$.\nPure L or pure C: $\\phi = \\pm90^\\circ$, so $P = 0$. The current still flows, but the element stores energy for a quarter cycle and hands it back the next: this is **wattless current**.\nAt resonance $\\cos\\phi = 1$ and the circuit behaves like a pure resistor.",
    },
    {
      type: "text",
      content:
        "In the lab below, sweep $f$ and watch the power factor. It rises to 1 at resonance, where the current is largest and every volt of the source is doing work in $R$.",
    },
    {
      type: "interactive",
      config: {
        component: "em-circuit-lab",
        mode: "lcr",
        readouts: ["impedance", "phase", "power"],
        caption:
          "Watch cos φ and the average power as f sweeps: both peak at resonance, where V_L and V_C cancel and the source sees only R.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: far from resonance the phase angle approaches $\\pm90^\\circ$, the power factor falls towards zero and very little power is drawn even though current flows. **Choke coil:** this is why a fluorescent lamp or fan regulator can use an inductor (a choke) instead of a resistor to limit current. The choke's reactance does the limiting, but it wastes almost no energy as heat.",
    },
    {
      type: "text",
      content:
        "**The transformer.** Two coils, a primary with $N_p$ turns and a secondary with $N_s$, are wound on a common soft-iron core that guides the same changing flux $\\Phi$ through every turn of both (mutual induction, 5.3). Each turn has the same emf $-d\\Phi/dt$, so the emfs are in the ratio of the turns. For an ideal (lossless) transformer the power in equals the power out, which fixes the currents:",
    },
    {
      type: "math",
      latex: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p}, \\qquad V_pI_p = V_sI_s \\;\\Longrightarrow\\; \\frac{I_p}{I_s} = \\frac{N_s}{N_p}",
    },
    {
      type: "text",
      content:
        "A step-up transformer ($N_s > N_p$) raises the voltage and lowers the current in the same ratio. Real transformers lose a few per cent through **copper loss** ($I^2R$ in the windings; thick wire), **eddy currents** (laminated core), **hysteresis** (soft iron with a narrow loop) and **flux leakage** (coils wound on top of each other). Efficiency $\\eta = P_{\\text{out}}/P_{\\text{in}}$.\n\n**Why transmit at high voltage.** For a fixed power $P = VI$ sent down a line of resistance $R_\\ell$, the current is $I = P/V$ and the loss is $I^2R_\\ell = \\dfrac{P^2R_\\ell}{V^2}$. Raising the voltage 50 times cuts the loss 2500 times. That is the whole reason for the AC grid: transformers make changing voltage cheap, and they only work with changing current.",
    },
    {
      type: "text",
      content:
        "**Electromagnetic waves, briefly.** Faraday: a changing magnetic field makes an electric field. Maxwell noticed the reverse must also be true. Ampère's law fails for a charging capacitor: a loop round the wire encloses a current, but a surface through the gap does not. Maxwell added the **displacement current** $i_d = \\varepsilon_0\\dfrac{d\\Phi_E}{dt}$, which equals the conduction current in the wire and makes Ampère's law consistent. Now each changing field makes the other, and together they can travel through empty space as a wave. The theory predicts the speed:",
    },
    { type: "math", latex: "c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}} = \\frac{1}{\\sqrt{4\\pi\\times10^{-7}\\times8.85\\times10^{-12}}} \\approx 3\\times10^8\\ \\text{m/s}" },
    {
      type: "text",
      content:
        "That is the measured speed of light: light is an electromagnetic wave. In the wave, $\\vec E$ and $\\vec B$ are perpendicular to each other and to the direction of travel (the waves are **transverse**), in phase, with $E_0 = cB_0$.",
    },
    {
      type: "table",
      headers: ["Band (increasing frequency)", "Typical wavelength", "Uses"],
      rows: [
        ["Radio", "> 0.1 m", "broadcasting, communication"],
        ["Microwave", "1 mm to 0.1 m", "radar, mobile networks, microwave ovens"],
        ["Infrared", "700 nm to 1 mm", "remote controls, thermal imaging, heat lamps"],
        ["Visible", "400 nm to 700 nm", "vision, photography"],
        ["Ultraviolet", "1 nm to 400 nm", "sterilisation, detecting forged notes"],
        ["X-rays", "$10^{-3}$ nm to 1 nm", "medical imaging, crystal structure"],
        ["Gamma rays", "< $10^{-3}$ nm", "cancer treatment, nuclear physics"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1 (power in an LCR circuit).** A series circuit with $R = 30\\ \\Omega$ and $X_L - X_C = 40\\ \\Omega$ is connected to 200 V rms.\n\n1. $Z = \\sqrt{30^2 + 40^2} = 50\\ \\Omega$, so $I_{\\text{rms}} = 200/50 = 4$ A.\n2. Power factor $\\cos\\phi = R/Z = 0.6$.\n3. $P = V_{\\text{rms}}I_{\\text{rms}}\\cos\\phi = 200\\times4\\times0.6 = 480$ W. Check: $I^2R = 16\\times30 = 480$ W. ✓ *Why this step:* the two forms must agree, and $I^2R$ reminds you that only the resistor consumes power.\n\n**Worked example 2 (transformer).** A transformer has 2000 primary turns and 100 secondary turns and runs from 220 V. The secondary supplies 4 A.\n\n1. $V_s = 220\\times\\dfrac{100}{2000} = 11$ V.\n2. Ideal: $I_p = I_s\\dfrac{N_s}{N_p} = 4\\times\\dfrac{1}{20} = 0.2$ A. Power in $= 220\\times0.2 = 44$ W $=$ power out $= 11\\times4$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (line loss).** A town needs 44 kW through lines of total resistance 2 Ω. Compare sending it at 220 V and at 11 kV.\n\n1. At 220 V: $I = 44\\,000/220 = 200$ A; loss $= 200^2\\times2 = 80$ kW, nearly double the power delivered. Impossible in practice. *Why this step:* the line would need to be fed 124 kW to deliver 44 kW.\n2. At 11 kV: $I = 4$ A; loss $= 16\\times2 = 32$ W, a tiny fraction.\n3. The ratio is $(11\\,000/220)^2 = 50^2 = 2500$.\n\n**Worked example 4 (wave fields).** A light wave has $E_0 = 60$ V/m. Find $B_0$.\n\n1. $B_0 = E_0/c = 60/(3\\times10^8) = 2\\times10^{-7}$ T.\n\n**Worked example 5 (displacement current).** A 2 μF capacitor's voltage is rising at 1000 V/s.\n\n1. Conduction current in the leads: $i = C\\,dV/dt = 2\\times10^{-6}\\times10^3 = 2$ mA.\n2. The displacement current in the gap is the same 2 mA: $\\varepsilon_0\\dfrac{d\\Phi_E}{dt} = \\varepsilon_0A\\dfrac{d}{dt}\\left(\\dfrac{V}{d}\\right) = C\\dfrac{dV}{dt}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a step-up transformer increases power\"",
      content:
        "It increases **voltage**, and the current falls by the same factor, so $VI$ stays the same (or drops slightly, because of losses). A transformer cannot create energy. If it could, you could feed its output back to its input and run it for ever.",
    },
    {
      type: "quiz",
      id: "em5-7-q1",
      variant: "practice",
      question: "A device draws 5 A rms from 220 V rms mains with a power factor of 0.8. Its average power consumption is",
      options: [
        { text: "1100 W", feedback: "That is the apparent power $V_{\\text{rms}}I_{\\text{rms}}$, ignoring the power factor." },
        { text: "880 W", correct: true, feedback: "$220\\times5\\times0.8 = 880$ W." },
        { text: "1375 W", feedback: "That divides by the power factor. Multiply." },
        { text: "440 W", feedback: "That uses an extra $\\tfrac12$, which belongs with peak values only." },
      ],
    },
    {
      type: "quiz",
      id: "em5-7-q2",
      variant: "concept",
      question: "A pure inductor is connected to AC mains. The average power it draws is",
      options: [
        { text: "$V_{\\text{rms}}I_{\\text{rms}}$", feedback: "That would require the current in phase with the voltage." },
        { text: "$I_{\\text{rms}}^2X_L$", feedback: "Reactance does not dissipate energy; only resistance does." },
        { text: "zero, since the current and voltage are $90^\\circ$ out of phase", correct: true, feedback: "$\\cos90^\\circ = 0$: it takes energy for a quarter cycle and returns it the next." },
        { text: "infinite, since an ideal inductor has no resistance", feedback: "Its reactance limits the current, and no energy is dissipated at all." },
      ],
    },
    {
      type: "quiz",
      id: "em5-7-q3",
      variant: "practice",
      question: "An ideal transformer has 500 primary turns and 2500 secondary turns. The primary is connected to 220 V and draws 5 A. The secondary voltage and current are",
      options: [
        { text: "1100 V and 1 A", correct: true, feedback: "$V_s = 220\\times5 = 1100$ V; $I_s = 5/5 = 1$ A, so power in = power out = 1100 W." },
        { text: "1100 V and 25 A", feedback: "That would give 27.5 kW out for 1.1 kW in. Current goes down as voltage goes up." },
        { text: "44 V and 25 A", feedback: "That treats it as step-down. The secondary has more turns." },
        { text: "1100 V and 5 A", feedback: "The current cannot stay the same while the voltage rises five-fold." },
      ],
    },
    {
      type: "quiz",
      id: "em5-7-q4",
      variant: "practice",
      question: "Power is transmitted along a line at a fixed rate. If the transmission voltage is raised 10 times, the line loss becomes",
      options: [
        { text: "$\\tfrac{1}{10}$ of its old value", feedback: "The loss goes as $I^2$, and $I$ falls 10 times." },
        { text: "$\\tfrac{1}{100}$ of its old value", correct: true, feedback: "$I \\propto 1/V$ at fixed power, and loss $= I^2R_\\ell \\propto 1/V^2$." },
        { text: "100 times larger", feedback: "That uses $V^2/R$ with the full line voltage across the line, a common error: the line only drops $IR_\\ell$." },
        { text: "unchanged", feedback: "The current falls, so the $I^2R$ loss falls sharply." },
      ],
    },
    {
      type: "quiz",
      id: "em5-7-q5",
      variant: "practice",
      question: "In an electromagnetic wave in vacuum, the magnetic field amplitude is $10^{-8}$ T. The electric field amplitude is",
      options: [
        { text: "$3.3\\times10^{-17}$ V/m", feedback: "That divides by $c$. It is $E_0 = cB_0$." },
        { text: "$10^{-8}$ V/m", feedback: "$E$ and $B$ are in different units; they are related by the speed $c$." },
        { text: "300 V/m", feedback: "Check the powers of ten: $10^8\\times10^{-8} = 1$." },
        { text: "3 V/m", correct: true, feedback: "$E_0 = cB_0 = 3\\times10^8\\times10^{-8} = 3$ V/m." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-5-mastery",
  title: "5.8 · Chapter 5 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every question below comes back to Faraday–Lenz ($\\mathcal E = -d\\Phi/dt$, opposing the change), the inductor's refusal to let its current jump, and phasors that add as arrows.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in eight lines",
      content:
        "1. $\\Phi = BA\\cos\\theta$; $\\mathcal E = -N\\,d\\Phi/dt$; Lenz: the induced current opposes the change (energy conservation); $\\Delta q = N\\Delta\\Phi/R$.\n2. Motional: $\\mathcal E = Bvl$; drag $B^2l^2v/R$; falling rod $v_t = mgR/B^2l^2$; rotating rod $\\tfrac12B\\omega l^2$.\n3. $N\\Phi = LI$, $\\mathcal E = -L\\,dI/dt$; solenoid $L = \\mu_0n^2Al$; $U = \\tfrac12LI^2$, $u = B^2/2\\mu_0$.\n4. LR: $\\tau = L/R$; the inductor current never jumps (open at switch-on, wire at steady state).\n5. LC: $\\omega = 1/\\sqrt{LC}$, energy swaps between $q^2/2C$ and $\\tfrac12Li^2$.\n6. AC: $V_{\\text{rms}} = V_0/\\sqrt2$; $X_L = \\omega L$ (I lags), $X_C = 1/\\omega C$ (I leads).\n7. Series LCR: $Z = \\sqrt{R^2 + (X_L - X_C)^2}$, $\\tan\\phi = (X_L - X_C)/R$; resonance $\\omega_0 = 1/\\sqrt{LC}$, $Q = \\omega_0L/R$.\n8. $P = V_{\\text{rms}}I_{\\text{rms}}\\cos\\phi$; transformer $V_s/V_p = N_s/N_p = I_p/I_s$; EM waves: $c = 1/\\sqrt{\\mu_0\\varepsilon_0}$, $E_0 = cB_0$.",
    },
    {
      type: "quiz",
      id: "em5-8-q1",
      variant: "mastery",
      question: "A 200-turn coil of area $5\\times10^{-3}$ m² and resistance 8 Ω is perpendicular to a field that falls from 0.6 T to 0.2 T. The charge that flows through the coil is",
      options: [
        { text: "0.05 C", correct: true, feedback: "$\\Delta\\Phi = 0.4\\times5\\times10^{-3} = 2\\times10^{-3}$ Wb; $\\Delta q = \\dfrac{200\\times2\\times10^{-3}}{8} = 0.05$ C." },
        { text: "0.075 C", feedback: "That uses the initial flux (0.6 T) instead of the change." },
        { text: "0.4 C", feedback: "That is $N\\Delta\\Phi$ in Wb-turns, without dividing by $R$." },
        { text: "It cannot be found without the time taken.", feedback: "The time cancels: $\\Delta q = N\\Delta\\Phi/R$." },
      ],
    },
    {
      type: "quiz",
      id: "em5-8-q2",
      variant: "mastery",
      question: "A rod 0.5 m long slides at 5 m/s on rails joined by a 2 Ω resistor, in a perpendicular 0.4 T field. The force needed to keep it moving steadily and the power delivered are",
      options: [
        { text: "0.2 N and 1 W", feedback: "Check the current: $I = 1/2 = 0.5$ A, not 1 A." },
        { text: "Zero, since the speed is constant", feedback: "Constant speed means the applied force balances the magnetic drag." },
        { text: "0.1 N and 0.5 W", correct: true, feedback: "$\\mathcal E = 1$ V, $I = 0.5$ A, $F = BIl = 0.1$ N, $P = Fv = 0.5$ W $= I^2R$." },
        { text: "0.1 N and 0.1 W", feedback: "Power is force times speed: $0.1\\times5 = 0.5$ W." },
      ],
    },
    {
      type: "quiz",
      id: "em5-8-q3",
      variant: "mastery",
      question: "The N pole of a bar magnet is moved away from a coil along its axis. Seen from the magnet, the induced current in the coil is",
      options: [
        { text: "anticlockwise", feedback: "That makes the near face an N pole, which would push the magnet away and help the change." },
        { text: "zero, because the magnet is not approaching", feedback: "Any change in flux induces an emf, increasing or decreasing." },
        { text: "clockwise", correct: true, feedback: "The near face becomes an S pole to attract the retreating N pole; a clockwise current (seen from that face) makes an S pole." },
        { text: "alternating", feedback: "The flux changes in one sense only, so the current flows one way." },
      ],
    },
    {
      type: "quiz",
      id: "em5-8-q4",
      variant: "mastery",
      question: "A 2 H inductor and a 4 Ω resistor are connected in series to an 8 V battery at $t = 0$. The initial rate of rise of current, and the current at $t = 0.5$ s, are",
      options: [
        { text: "4 A/s and about 1.26 A", correct: true, feedback: "At $t = 0$, $i = 0$ so $L\\,di/dt = \\mathcal E$: $di/dt = 4$ A/s. $\\tau = 0.5$ s, so $i = 2(1 - e^{-1}) \\approx 1.26$ A." },
        { text: "2 A/s and 1 A", feedback: "$di/dt = \\mathcal E/L = 8/2 = 4$ A/s; and at one time constant the current is 63%, not 50%." },
        { text: "4 A/s and 2 A", feedback: "2 A is the final current; after one $\\tau$ it has reached only 63% of that." },
        { text: "Zero and 2 A", feedback: "The current starts at zero but its rate of rise is largest at $t = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "em5-8-q5",
      variant: "mastery",
      question: "A current is $i = 4\\sin\\omega t + 3\\cos\\omega t$ A. Its rms value is",
      options: [
        { text: "$\\tfrac{7}{\\sqrt2}$ A", feedback: "Amplitudes $90^\\circ$ apart add as phasors, not as numbers." },
        { text: "5 A", feedback: "That is the peak. Divide by $\\sqrt2$." },
        { text: "0", feedback: "That is the average over a cycle, not the rms." },
        { text: "$\\tfrac{5}{\\sqrt2}$ A $\\approx 3.54$ A", correct: true, feedback: "The two parts are $90^\\circ$ apart, so the amplitude is $\\sqrt{4^2 + 3^2} = 5$ A; rms $= 5/\\sqrt2$." },
      ],
    },
    {
      type: "quiz",
      id: "em5-8-q6",
      variant: "mastery",
      question: "A series circuit has $R = 40\\ \\Omega$, $X_L = 100\\ \\Omega$ and $X_C = 70\\ \\Omega$. The impedance and phase are",
      options: [
        { text: "50 Ω; current leads voltage by about $37^\\circ$", feedback: "$X_L > X_C$ makes the circuit inductive: voltage leads." },
        { text: "50 Ω; voltage leads current by about $37^\\circ$", correct: true, feedback: "$Z = \\sqrt{40^2 + 30^2} = 50\\ \\Omega$; $\\tan\\phi = 30/40$, so $\\phi \\approx 36.9^\\circ$, inductive." },
        { text: "210 Ω; in phase", feedback: "That adds all three. Reactances subtract, and combine with $R$ at right angles." },
        { text: "70 Ω; voltage leads by $53^\\circ$", feedback: "$40 + 30 = 70$ is not how impedance works; use Pythagoras. And $\\tan\\phi = 0.75$, not $4/3$." },
      ],
    },
    {
      type: "quiz",
      id: "em5-8-q7",
      variant: "mastery",
      question: "A series LCR circuit has $L = 0.4$ H, $C = 10\\ \\mu$F and $R = 20\\ \\Omega$. Its resonant angular frequency and quality factor are",
      options: [
        { text: "500 rad/s and 0.1", feedback: "That is $R/\\omega_0L$, upside down." },
        { text: "80 rad/s and 10", feedback: "80 Hz is $f_0 = 500/2\\pi$. The angular frequency is 500 rad/s." },
        { text: "250 rad/s and 5", feedback: "Check $LC = 0.4\\times10^{-5} = 4\\times10^{-6}$, whose square root is $2\\times10^{-3}$." },
        { text: "500 rad/s and 10", correct: true, feedback: "$\\omega_0 = 1/\\sqrt{4\\times10^{-6}} = 500$ rad/s; $Q = \\omega_0L/R = 200/20 = 10$." },
      ],
    },
    {
      type: "quiz",
      id: "em5-8-q8",
      variant: "mastery",
      question: "A step-down transformer converts 2000 V to 200 V and delivers 9 kW to a load with 90% efficiency. The primary current is",
      options: [
        { text: "4.5 A", feedback: "That ignores the losses: the primary must supply 10 kW, not 9 kW." },
        { text: "5 A", correct: true, feedback: "Input power $= 9/0.9 = 10$ kW; $I_p = 10\\,000/2000 = 5$ A." },
        { text: "45 A", feedback: "That is the secondary current, $9000/200$." },
        { text: "50 A", feedback: "That is the primary power divided by the secondary voltage." },
      ],
    },
    {
      type: "quiz",
      id: "em5-8-q9",
      variant: "mastery",
      question: "JEE Advanced style. A rod of mass 0.02 kg and length 0.5 m slides without friction down vertical rails joined at the top by a 0.5 Ω resistor, in a horizontal 0.4 T field perpendicular to the rails ($g = 10$ m/s²). Its terminal speed and the current at terminal speed are",
      options: [
        { text: "1.25 m/s and 0.5 A", feedback: "At 1.25 m/s the magnetic force is only 0.1 N, half the weight, so the rod still accelerates." },
        { text: "5 m/s and 2 A", feedback: "At 5 m/s the magnetic force would be 0.4 N, twice the weight." },
        { text: "2.5 m/s and 1 A", correct: true, feedback: "$v_t = \\dfrac{mgR}{B^2l^2} = \\dfrac{0.2\\times0.5}{0.16\\times0.25} = 2.5$ m/s; $I = \\dfrac{Bv_tl}{R} = 1$ A. Check: $BIl = 0.2$ N $= mg$." },
        { text: "It never reaches a terminal speed.", feedback: "The drag grows with speed until it equals the weight: that speed is terminal." },
      ],
    },
    {
      type: "quiz",
      id: "em5-8-q10",
      variant: "mastery",
      question: "The rod of the previous question is released from rest. When it has fallen 2 m it is moving at 2 m/s. How much heat has the resistor produced so far?",
      options: [
        { text: "0.36 J", correct: true, feedback: "Energy lost by gravity $mgh = 0.4$ J; kinetic energy gained $\\tfrac12mv^2 = 0.04$ J; the rest, 0.36 J, became heat." },
        { text: "0.4 J", feedback: "Part of the gravitational energy is now kinetic energy of the rod." },
        { text: "0.04 J", feedback: "That is the kinetic energy, not the heat." },
        { text: "0.5 J", feedback: "That uses the power at terminal speed (0.5 W) as if it were an energy." },
      ],
      hint: "Energy bookkeeping: $mgh = \\tfrac12mv^2 + \\text{heat}$.",
    },
    {
      type: "quiz",
      id: "em5-8-q11",
      variant: "mastery",
      question: "JEE Advanced style. A series circuit with $R = 10\\ \\Omega$, $L = 0.1$ H and $C = 10\\ \\mu$F is driven at resonance by a 20 V rms source. The rms voltage across the inductor is",
      options: [
        { text: "20 V", feedback: "At resonance $V_R$ equals the source; $V_L$ and $V_C$ are $Q$ times larger and cancel each other." },
        { text: "200 V", correct: true, feedback: "$\\omega_0 = 1000$ rad/s, $I = 20/10 = 2$ A, $X_L = 100\\ \\Omega$, so $V_L = 200$ V, ten times the source ($Q = 10$)." },
        { text: "10 V", feedback: "The inductor voltage cannot be found by sharing the source voltage; use $V_L = IX_L$." },
        { text: "Zero, since $V_L$ and $V_C$ cancel", feedback: "Their **sum** is zero, but each one separately is 200 V." },
      ],
    },
    {
      type: "quiz",
      id: "em5-8-q12",
      variant: "mastery",
      question: "A 0.2 H inductor carries 3 A. The switch is opened and the current is diverted through a resistor until it dies away. The total heat produced in the resistor is",
      options: [
        { text: "0.6 J", feedback: "That is $LI$, not $\\tfrac12LI^2$." },
        { text: "1.8 J", feedback: "You left out the $\\tfrac12$." },
        { text: "It depends on the resistance.", feedback: "The resistance sets how fast the energy is released, not how much." },
        { text: "0.9 J", correct: true, feedback: "All the stored energy $\\tfrac12LI^2 = \\tfrac12\\times0.2\\times9 = 0.9$ J ends up as heat, whatever the resistance." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where this leads",
      content:
        "Changing fields making each other gave the electromagnetic wave, and the wave is light. The optics course picks up the story there: reflection, refraction, interference, and the discovery that light also comes in particles.",
    },
  ]),
};

export const emChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
