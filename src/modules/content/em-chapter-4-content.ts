import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Electricity and Magnetism Chapter 4 — Magnetic Effects of Current.
 * Moving charges feel and make a second field. The Lorentz force and the
 * motion it produces (circles, helices, crossed fields), B from currents
 * by Biot–Savart and by Ampère's law, forces and torques on conductors and
 * loops, meters, and a short tour of magnetism in matter.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "magnetic-force-on-a-charge",
  title: "4.1 · The Magnetic Force on a Charge",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 1820 Hans Christian Ørsted noticed a compass needle twitch when he switched on a current in a nearby wire. Electricity and magnetism, until then two separate subjects, turned out to be one. A current (moving charge) makes a magnetic field, and a magnetic field pushes on moving charge. This lesson is about the push.",
    },
    {
      type: "text",
      content:
        "The magnetic force is stranger than anything in Chapters 0 to 3. A charge sitting still in a magnetic field feels **nothing**. Set it moving and a force appears, but the force is sideways: perpendicular to the velocity and perpendicular to the field. Experiments show its size is proportional to the charge, to the speed, to the field strength and to the sine of the angle between $\\vec v$ and $\\vec B$. One formula packs all of that in, using the cross product:",
    },
    { type: "math", latex: "\\vec F = q\\,\\vec v\\times\\vec B, \\qquad |\\vec F| = qvB\\sin\\theta" },
    {
      type: "callout",
      variant: "definition",
      title: "Magnetic field and the tesla",
      content:
        "The magnetic field $\\vec B$ at a point is defined by the force $\\vec F = q\\vec v\\times\\vec B$ on a charge $q$ moving through it with velocity $\\vec v$.\nUnit: the **tesla**, $1\\text{ T} = 1\\ \\dfrac{\\text{N}}{\\text{C}\\cdot\\text{m/s}} = 1\\ \\dfrac{\\text{N}}{\\text{A m}}$. A tesla is large: the Earth's field is about $5\\times10^{-5}$ T, a fridge magnet about $10^{-2}$ T, an MRI magnet 1.5 to 3 T. The older unit is the gauss, $1\\text{ G} = 10^{-4}$ T.",
    },
    {
      type: "text",
      content:
        "**Direction: the right-hand rule.** Point the fingers of your right hand along $\\vec v$, curl them towards $\\vec B$ through the smaller angle, and your thumb gives $\\vec v\\times\\vec B$. For a positive charge that is the force. For a **negative** charge, such as an electron, $q < 0$ flips the answer: the force points opposite to your thumb. In component form use the cyclic rule $\\hat i\\times\\hat j = \\hat k$, $\\hat j\\times\\hat k = \\hat i$, $\\hat k\\times\\hat i = \\hat j$ (and reversing the order flips the sign).",
    },
    {
      type: "text",
      content:
        "In the 3D view below, read $\\vec a$ as the velocity $\\vec v$ and $\\vec b$ as the field $\\vec B$. The normal arrow is $\\vec v\\times\\vec B$, the force direction on a positive charge. Change the angle between them.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "cross",
        a: [3, 0, 0],
        b: [0, 3, 0],
        sliders: [{ name: "angle", min: 0, max: 180, step: 15, initial: 90 }],
        readouts: ["cross"],
        caption:
          "Read a as v and b as B; the normal is v × B, the force on a positive charge. Its length is largest at 90° and shrinks to zero when v lies along B.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the force arrow always stands perpendicular to the plane containing $\\vec v$ and $\\vec B$. Its size follows $\\sin\\theta$: largest at 90°, zero at 0° and 180°. A charge moving straight along the field lines feels no magnetic force at all.",
    },
    {
      type: "text",
      content:
        "**The magnetic force does no work.** Because $\\vec F$ is always perpendicular to $\\vec v$, the power it delivers is $P = \\vec F\\cdot\\vec v = q(\\vec v\\times\\vec B)\\cdot\\vec v = 0$. A magnetic field can change the **direction** of a charged particle's velocity but never its **speed** or kinetic energy. When electric and magnetic fields act together, the total is the **Lorentz force**:",
    },
    { type: "math", latex: "\\vec F = q\\left(\\vec E + \\vec v\\times\\vec B\\right)" },
    {
      type: "text",
      content:
        "**Worked example 1 (size of the force).** A proton moves at $2\\times10^6$ m/s at $30^\\circ$ to a 0.5 T field. Find the force.\n\n1. $F = qvB\\sin\\theta$. *Why this step:* only the component of velocity perpendicular to $\\vec B$ counts, and that is $v\\sin\\theta$.\n2. $F = 1.6\\times10^{-19}\\times2\\times10^6\\times0.5\\times\\sin30^\\circ = 1.6\\times10^{-19}\\times10^6\\times0.5 = 8\\times10^{-14}$ N.\n\n**Worked example 2 (direction for an electron).** An electron moves with $\\vec v = 2\\times10^6\\,\\hat i$ m/s in $\\vec B = 0.5\\,\\hat j$ T.\n\n1. $\\vec v\\times\\vec B = (2\\times10^6)(0.5)(\\hat i\\times\\hat j) = 10^6\\,\\hat k$.\n2. Multiply by $q = -1.6\\times10^{-19}$ C: $\\vec F = -1.6\\times10^{-13}\\,\\hat k$ N. *Why this step:* the charge's sign is part of the formula, so the electron is pushed along $-\\hat k$, opposite to the right-hand-rule thumb.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (components).** A proton has $\\vec v = (2\\hat i + 3\\hat j)\\times10^6$ m/s in $\\vec B = 0.1\\,\\hat k$ T.\n\n1. $\\vec v\\times\\vec B = 10^6\\times0.1\\,\\big(2\\,\\hat i\\times\\hat k + 3\\,\\hat j\\times\\hat k\\big) = 10^5\\,(-2\\hat j + 3\\hat i)$. *Why this step:* $\\hat i\\times\\hat k = -\\hat j$ (anticyclic order) and $\\hat j\\times\\hat k = \\hat i$.\n2. $\\vec F = 1.6\\times10^{-19}\\times10^5\\,(3\\hat i - 2\\hat j) = (4.8\\,\\hat i - 3.2\\,\\hat j)\\times10^{-14}$ N.\n3. Check: $\\vec F\\cdot\\vec v \\propto (3)(2) + (-2)(3) = 0$. ✓ The force is perpendicular to the velocity, as it must be.\n\n**Worked example 4 (crossed fields).** A charge moves along $+x$ through $\\vec E = 3\\times10^4$ V/m along $+y$ and a magnetic field of 0.1 T along $+z$. At what speed does it pass straight through?\n\n1. Electric force $qE$ along $+y$; magnetic force $q\\,v\\,\\hat i\\times B\\hat k = -qvB\\,\\hat j$. *Why this step:* the two forces point opposite ways, so they can cancel.\n2. Cancel when $qE = qvB$, so $v = E/B = 3\\times10^4/0.1 = 3\\times10^5$ m/s, whatever the charge or mass. This is the velocity selector of the next lesson.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a magnetic field can speed up a charged particle\"",
      content:
        "The magnetic force is always at right angles to the motion, so it does zero work and cannot change the particle's speed or kinetic energy. It only bends the path. Anything that speeds particles up (a cyclotron, a TV tube) uses an **electric** field for the speeding up and a magnetic field only for steering.",
    },
    {
      type: "quiz",
      id: "em4-1-q1",
      variant: "concept",
      question: "A charged particle moves parallel to a uniform magnetic field. The magnetic force on it is",
      options: [
        { text: "maximum, because it moves along the field lines", feedback: "The force goes as $\\sin\\theta$, which is zero along the field." },
        { text: "along the field, speeding it up", feedback: "The magnetic force is never along $\\vec v$; it can never speed a particle up." },
        { text: "zero", correct: true, feedback: "$\\vec v\\times\\vec B = 0$ when $\\vec v \\parallel \\vec B$, so it continues in a straight line." },
        { text: "equal to $qvB$", feedback: "That is the value at $90^\\circ$. Here $\\theta = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "em4-1-q2",
      variant: "practice",
      question: "An α-particle (charge $3.2\\times10^{-19}$ C) moves at $10^5$ m/s perpendicular to a 2 T field. The magnetic force on it is",
      options: [
        { text: "$6.4\\times10^{-14}$ N", correct: true, feedback: "$qvB = 3.2\\times10^{-19}\\times10^5\\times2 = 6.4\\times10^{-14}$ N." },
        { text: "$3.2\\times10^{-14}$ N", feedback: "That uses the proton charge. An α-particle carries $2e$." },
        { text: "$1.6\\times10^{-14}$ N", feedback: "That uses charge $e$ and drops the factor 2 from the field as well." },
        { text: "Zero, since α-particles are neutral", feedback: "An α-particle is a helium nucleus with charge $+2e$." },
      ],
    },
    {
      type: "quiz",
      id: "em4-1-q3",
      variant: "practice",
      question: "An electron moves along $+y$ in a magnetic field along $+z$. The direction of the magnetic force on it is",
      options: [
        { text: "$+x$", feedback: "That is $\\hat j\\times\\hat k = \\hat i$, the force on a positive charge. The electron's negative charge reverses it." },
        { text: "$+z$", feedback: "The force is perpendicular to $\\vec B$, so it cannot point along $z$." },
        { text: "$-y$", feedback: "The force is perpendicular to $\\vec v$, so it cannot point along $y$." },
        { text: "$-x$", correct: true, feedback: "$\\hat j\\times\\hat k = \\hat i$, and $q < 0$ flips it to $-\\hat i$." },
      ],
    },
    {
      type: "quiz",
      id: "em4-1-q4",
      variant: "concept",
      question: "A proton moves through a quarter of a circle in a uniform magnetic field. The work done on it by the magnetic force is",
      options: [
        { text: "positive, because the force bends it round", feedback: "Bending needs a force, but not work: the force is perpendicular to the motion at every instant." },
        { text: "zero", correct: true, feedback: "$\\vec F\\cdot\\vec v = 0$ throughout, so no work is done and the speed stays constant." },
        { text: "negative, because it is a retarding force", feedback: "The magnetic force never has a component along or against $\\vec v$." },
        { text: "$qvB$ times the arc length", feedback: "Work is force times displacement **along** the force. Here that component is zero." },
      ],
    },
    {
      type: "quiz",
      id: "em4-1-q5",
      variant: "practice",
      question: "Perpendicular electric and magnetic fields of $10^4$ V/m and 0.05 T are arranged so that their forces on a moving ion oppose. Ions pass undeflected at a speed of",
      options: [
        { text: "$5\\times10^2$ m/s", feedback: "That is $E\\times B$. Balance $qE = qvB$ gives $E/B$." },
        { text: "$5\\times10^{-6}$ m/s", feedback: "That is $B/E$, upside down." },
        { text: "It depends on the ion's charge.", feedback: "The charge cancels from $qE = qvB$; every ion with $v = E/B$ goes straight." },
        { text: "$2\\times10^5$ m/s", correct: true, feedback: "$v = E/B = 10^4/0.05 = 2\\times10^5$ m/s." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "motion-in-a-magnetic-field",
  title: "4.2 · Circles, Helices and Crossed Fields",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "The aurora is the Earth's magnetic field steering charged particles from the Sun. Far from the poles the particles are turned back; near the poles they spiral down along the field lines into the upper atmosphere and make it glow. Circles and spirals are the natural paths in a magnetic field, and this lesson works out exactly why.",
    },
    {
      type: "text",
      content:
        "**Circular motion.** A charge $q$ of mass $m$ enters a uniform field $\\vec B$ with velocity perpendicular to it. The force $qvB$ is always perpendicular to $\\vec v$ and constant in size, and the speed never changes (4.1). A constant-size force always at right angles to the motion is exactly what uniform circular motion needs. The magnetic force supplies the centripetal force:",
    },
    {
      type: "math",
      latex: "qvB = \\frac{mv^2}{r} \\;\\Longrightarrow\\; r = \\frac{mv}{qB} = \\frac{p}{qB}, \\qquad T = \\frac{2\\pi r}{v} = \\frac{2\\pi m}{qB}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Motion perpendicular to B",
      content:
        "Radius $r = \\dfrac{mv}{qB} = \\dfrac{p}{qB} = \\dfrac{\\sqrt{2mK}}{qB}$.\nPeriod $T = \\dfrac{2\\pi m}{qB}$, angular frequency $\\omega = \\dfrac{qB}{m}$ and cyclotron frequency $f = \\dfrac{qB}{2\\pi m}$: **independent of speed and radius**.",
    },
    {
      type: "text",
      content:
        "The speed cancels out of the period. A faster particle travels a bigger circle, and the extra distance exactly compensates for the extra speed. For a proton ($m = 1.67\\times10^{-27}$ kg) in 0.1 T, $r = \\dfrac{1.67\\times10^{-27}\\,v}{1.6\\times10^{-20}}$, which is $10.44$ cm for every $10^6$ m/s of speed.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "10.44*x",
        exprLatex: "r = \\frac{mv}{qB} = 10.44\\,v\\ \\text{cm}",
        min: 0.5,
        max: 5,
        step: 0.5,
        initial: 1,
        inputLabel: "Proton speed v (in units of 10⁶ m/s) in 0.1 T",
        outputLabel: "Radius of the circle (cm)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the radius is directly proportional to the speed. Double $v$ and the circle doubles in size, but the time for one lap stays at $6.56\\times10^{-7}$ s for every speed.",
    },
    {
      type: "text",
      content:
        "**The helix.** If $\\vec v$ makes an angle $\\theta$ with $\\vec B$, split it into $v\\sin\\theta$ across the field and $v\\cos\\theta$ along it. The perpendicular part makes a circle of radius $\\dfrac{mv\\sin\\theta}{qB}$; the parallel part feels no force and carries the circle steadily along the field. The path is a helix, and the distance moved along $\\vec B$ in one turn is the **pitch**:",
    },
    { type: "math", latex: "\\text{pitch} = (v\\cos\\theta)\\,T = \\frac{2\\pi m\\,v\\cos\\theta}{qB}" },
    {
      type: "text",
      content:
        "**Three devices.**\n\n**Velocity selector.** Crossed $\\vec E$ and $\\vec B$ push opposite ways (4.1, Worked example 4). Only particles with $v = E/B$ go straight through a slit; faster ones are bent one way, slower ones the other.\n\n**Mass spectrometer.** Ions from a velocity selector, all with the same $v$, enter a region of pure $\\vec B$ and move in semicircles of radius $r = mv/qB$. Ions of different mass land at different places; $r \\propto m/q$.\n\n**Cyclotron.** Two hollow D-shaped electrodes sit in a uniform $\\vec B$. Each half-turn inside a D takes $T/2 = \\pi m/qB$, the same at every speed, so an alternating voltage at the cyclotron frequency $f = qB/2\\pi m$ gives the particle a kick every time it crosses the gap. It spirals outwards. It leaves at the outer radius $R$ with $v = qBR/m$, so",
    },
    { type: "math", latex: "K_{\\max} = \\frac12 mv^2 = \\frac{q^2B^2R^2}{2m}" },
    {
      type: "text",
      content:
        "**A field that fills only a strip.** A particle entering a region of field of width $d$ perpendicular to its boundary moves on an arc of radius $r$. If $d < r$ it leaves the region after turning through an angle $\\theta$ with $\\sin\\theta = d/r$. If $d \\ge r$ it turns through a semicircle and comes back out of the side it entered.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (radius and period).** A proton moves at $10^6$ m/s perpendicular to a 0.1 T field.\n\n1. $r = \\dfrac{mv}{qB} = \\dfrac{1.67\\times10^{-27}\\times10^6}{1.6\\times10^{-19}\\times0.1} = 0.104$ m $\\approx 10.4$ cm.\n2. $T = \\dfrac{2\\pi m}{qB} = \\dfrac{2\\pi\\times1.67\\times10^{-27}}{1.6\\times10^{-20}} \\approx 6.56\\times10^{-7}$ s.\n\n**Worked example 2 (proton and α-particle).** Compare their radii in the same field (a) at equal kinetic energy, (b) at equal momentum. ($m_\\alpha = 4m_p$, $q_\\alpha = 2e$.)\n\n1. (a) $r = \\dfrac{\\sqrt{2mK}}{qB}$, so $r \\propto \\dfrac{\\sqrt m}{q}$. *Why this step:* choose the form of $r$ that uses the quantity held equal. Proton: $\\dfrac{1}{1}$; α: $\\dfrac{\\sqrt4}{2} = 1$. Ratio $1:1$.\n2. (b) $r = \\dfrac{p}{qB}$, so $r \\propto \\dfrac1q$. Ratio $r_p : r_\\alpha = 2 : 1$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a helix).** A proton moves at $2\\times10^6$ m/s at $60^\\circ$ to a 0.1 T field. Find the radius and pitch.\n\n1. Across the field: $v\\sin60^\\circ = 1.73\\times10^6$ m/s, so $r = 10.44\\times1.73 \\approx 18.1$ cm. *Why this step:* only the perpendicular component makes the circle.\n2. Along the field: $v\\cos60^\\circ = 10^6$ m/s. The period is $6.56\\times10^{-7}$ s, the same as before.\n3. Pitch $= 10^6\\times6.56\\times10^{-7} \\approx 0.656$ m $\\approx 66$ cm.\n\n**Worked example 4 (cyclotron).** A cyclotron with $B = 1$ T and dee radius 0.5 m accelerates protons. Find the oscillator frequency and the maximum energy.\n\n1. $f = \\dfrac{qB}{2\\pi m} = \\dfrac{1.6\\times10^{-19}\\times1}{2\\pi\\times1.67\\times10^{-27}} \\approx 1.52\\times10^7$ Hz $\\approx 15$ MHz.\n2. $K_{\\max} = \\dfrac{q^2B^2R^2}{2m} = \\dfrac{(1.6\\times10^{-19})^2\\times1\\times0.25}{2\\times1.67\\times10^{-27}} \\approx 1.9\\times10^{-12}$ J.\n3. In electronvolts: $\\dfrac{1.9\\times10^{-12}}{1.6\\times10^{-19}} \\approx 1.2\\times10^7$ eV $= 12$ MeV. *Why this step:* the dee voltage does not appear; it only sets how many laps the proton takes.\n\n**Worked example 5 (a field strip).** A proton at $10^6$ m/s enters perpendicularly a 0.1 T field region of width 5.22 cm.\n\n1. $r = 10.44$ cm $> d$, so it gets through.\n2. $\\sin\\theta = d/r = 0.5$, so it leaves deviated by $30^\\circ$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"faster particles take longer to go round\"",
      content:
        "A faster particle does travel a bigger circle, but $r \\propto v$, so the circumference and the speed grow together and the lap time $T = 2\\pi m/qB$ does not change. This speed-independence is exactly what makes the cyclotron work with a fixed-frequency oscillator.",
    },
    {
      type: "quiz",
      id: "em4-2-q1",
      variant: "concept",
      question: "The speed of a charged particle moving perpendicular to a uniform magnetic field is doubled. Its radius and period become",
      options: [
        { text: "radius doubled, period doubled", feedback: "The longer path is covered at double speed, so the period is unchanged." },
        { text: "radius doubled, period unchanged", correct: true, feedback: "$r = mv/qB \\propto v$ and $T = 2\\pi m/qB$ has no $v$ in it." },
        { text: "radius unchanged, period halved", feedback: "A faster particle needs more centripetal force than $qvB$ grows by at the old radius: $mv^2/r$ grows as $v^2$." },
        { text: "radius quadrupled, period unchanged", feedback: "That would follow if $r \\propto v^2$. The radius is proportional to momentum, $mv$." },
      ],
    },
    {
      type: "quiz",
      id: "em4-2-q2",
      variant: "practice",
      question: "An electron ($m = 9.1\\times10^{-31}$ kg) moves at $10^7$ m/s perpendicular to a field of $10^{-3}$ T. The radius of its path is about",
      options: [
        { text: "5.7 m", feedback: "Check the powers of ten: the denominator is $1.6\\times10^{-22}$." },
        { text: "0.57 mm", feedback: "That is 100 times too small. Recompute $9.1\\times10^{-24}/1.6\\times10^{-22}$." },
        { text: "5.7 cm", correct: true, feedback: "$r = \\dfrac{9.1\\times10^{-31}\\times10^7}{1.6\\times10^{-19}\\times10^{-3}} \\approx 0.057$ m." },
        { text: "104 m", feedback: "That uses the proton mass. The electron is about 1840 times lighter." },
      ],
    },
    {
      type: "quiz",
      id: "em4-2-q3",
      variant: "practice",
      question: "A proton and a deuteron (same charge, twice the mass) have equal kinetic energies in the same magnetic field. The ratio $r_d : r_p$ is",
      options: [
        { text: "$\\sqrt2 : 1$", correct: true, feedback: "$r = \\sqrt{2mK}/qB$ with equal $K$ and $q$ gives $r \\propto \\sqrt m$." },
        { text: "2 : 1", feedback: "That would hold at equal speeds. At equal kinetic energy $r \\propto \\sqrt m$." },
        { text: "1 : 1", feedback: "That is the proton–α result, where the doubled charge compensates. The deuteron has the same charge as the proton." },
        { text: "$1 : \\sqrt2$", feedback: "The heavier particle has more momentum at the same energy, so the larger radius." },
      ],
    },
    {
      type: "quiz",
      id: "em4-2-q4",
      variant: "practice",
      question: "A proton is in a cyclotron with $B = 0.5$ T. The oscillator frequency needed is about",
      options: [
        { text: "48 MHz", feedback: "That is the angular frequency $\\omega = qB/m$ in rad/s. Divide by $2\\pi$." },
        { text: "7.6 MHz", correct: true, feedback: "$f = \\dfrac{qB}{2\\pi m} = \\dfrac{1.6\\times10^{-19}\\times0.5}{2\\pi\\times1.67\\times10^{-27}} \\approx 7.6\\times10^6$ Hz." },
        { text: "15 MHz", feedback: "That is the frequency at 1 T. It is proportional to $B$." },
        { text: "It depends on the proton's speed.", feedback: "The cyclotron frequency is independent of speed; that is why the machine works." },
      ],
    },
    {
      type: "quiz",
      id: "em4-2-q5",
      variant: "concept",
      question: "To raise the maximum kinetic energy of protons from a cyclotron, which change works?",
      options: [
        { text: "Increase the accelerating voltage across the dees.", feedback: "More voltage per crossing means fewer laps, but the exit energy $q^2B^2R^2/2m$ has no voltage in it." },
        { text: "Lower the oscillator frequency with the same field.", feedback: "Then the kicks fall out of step with the protons and acceleration fails." },
        { text: "Use a heavier ion with the same charge.", feedback: "$K_{\\max} \\propto 1/m$: a heavier ion leaves with less energy." },
        { text: "Increase the magnetic field (and retune the oscillator).", correct: true, feedback: "$K_{\\max} = q^2B^2R^2/2m$ grows as $B^2$. The frequency must rise with $B$ to stay in step." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "biot-savart-law",
  title: "4.3 · The Biot–Savart Law",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Ørsted's compass needle turned to point **around** the wire, not towards it or along it. Sprinkle iron filings on a card pierced by a current-carrying wire and they form circles centred on the wire. The field of a current curls. We now need a rule that turns any current into its magnetic field, playing the role Coulomb's law played for charges.",
    },
    {
      type: "text",
      content:
        "The rule, found by Biot and Savart, is built exactly like Coulomb's law: chop the wire into small **current elements** $I\\,d\\vec l$ (pointing along the current), find each one's contribution, and add. Each element contributes",
    },
    { type: "math", latex: "d\\vec B = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,d\\vec l\\times\\hat r}{r^2}, \\qquad |d\\vec B| = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,dl\\,\\sin\\theta}{r^2}" },
    {
      type: "callout",
      variant: "definition",
      title: "Biot–Savart law",
      content:
        "$\\hat r$ points from the element to the field point, at distance $r$; $\\theta$ is the angle between $d\\vec l$ and $\\hat r$.\n$\\mu_0 = 4\\pi\\times10^{-7}$ T m/A is the permeability of free space, so $\\dfrac{\\mu_0}{4\\pi} = 10^{-7}$ T m/A.\nLike Coulomb's law, it is inverse-square. Unlike it, the contribution is **perpendicular** to both $d\\vec l$ and $\\hat r$ (a cross product), and it vanishes for points straight ahead of or behind the element ($\\theta = 0$).",
    },
    {
      type: "text",
      content:
        "**Straight segment.** Take a point P at perpendicular distance $d$ from a straight wire. Every element's $d\\vec B$ at P points the same way (into or out of the page), so the magnitudes simply add. Measure each element's position by the angle $\\phi$ it makes at P with the perpendicular: then $l = d\\tan\\phi$, $dl = d\\sec^2\\phi\\,d\\phi$, $r = d\\sec\\phi$ and $\\sin\\theta = \\cos\\phi$. The integrand collapses:",
    },
    {
      type: "math",
      latex: "B = \\frac{\\mu_0 I}{4\\pi}\\int_{-\\alpha}^{\\beta}\\frac{d\\sec^2\\phi\\,\\cos\\phi}{d^2\\sec^2\\phi}\\,d\\phi = \\frac{\\mu_0 I}{4\\pi d}\\int_{-\\alpha}^{\\beta}\\cos\\phi\\,d\\phi = \\frac{\\mu_0 I}{4\\pi d}\\,(\\sin\\alpha + \\sin\\beta)",
    },
    {
      type: "text",
      content:
        "Here $\\alpha$ and $\\beta$ are the angles the two ends of the segment make at P, measured from the perpendicular foot. For an **infinite** wire, $\\alpha = \\beta = 90^\\circ$ and $B = \\dfrac{\\mu_0 I}{2\\pi d}$. For a **semi-infinite** wire with P opposite its end, $\\alpha = 0$ and $\\beta = 90^\\circ$, so $B = \\dfrac{\\mu_0 I}{4\\pi d}$, exactly half.",
    },
    {
      type: "text",
      content:
        "**Circular loop, at the centre.** Every element of a loop of radius $R$ is at distance $R$ from the centre and perpendicular to the radius ($\\theta = 90^\\circ$), and every contribution points along the axis. So $B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{I}{R^2}\\times(\\text{total length})$. For the full circle the length is $2\\pi R$; for an arc subtending angle $\\theta$ (radians) it is $R\\theta$:",
    },
    { type: "math", latex: "B_{\\text{centre}} = \\frac{\\mu_0 I}{2R}, \\qquad B_{\\text{arc}} = \\frac{\\mu_0 I\\,\\theta}{4\\pi R}" },
    {
      type: "text",
      content:
        "**On the axis of a loop.** At distance $x$ along the axis, each element is at $r = \\sqrt{R^2 + x^2}$. The components perpendicular to the axis cancel in pairs from opposite sides of the loop; the axial components (a fraction $R/r$ of each) add:",
    },
    { type: "math", latex: "B(x) = \\frac{\\mu_0 I}{4\\pi}\\,\\frac{2\\pi R}{R^2 + x^2}\\cdot\\frac{R}{\\sqrt{R^2 + x^2}} = \\frac{\\mu_0 I R^2}{2\\,(R^2 + x^2)^{3/2}}" },
    {
      type: "text",
      content:
        "Below, the grey curve is the axis field of a loop of radius 1 and the coloured one is for radius $R$, both plotted as $\\dfrac{2B}{\\mu_0 I} = \\dfrac{R^2}{(R^2 + x^2)^{3/2}}$. Change $R$.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "1/(1 + x^2)^1.5",
        baseLatex: "\\frac{1}{(1+x^2)^{3/2}}",
        expr: "R^2/(R^2 + x^2)^1.5",
        exprLatex: "\\frac{2B}{\\mu_0 I} = \\frac{R^2}{(R^2+x^2)^{3/2}}",
        params: [{ name: "R", min: 0.5, max: 3, step: 0.5, initial: 1 }],
        window: { xmin: -6, xmax: 6, ymin: 0, ymax: 2 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the field peaks at the centre with height $1/R$ (the formula $\\mu_0 I/2R$). A small loop gives a tall, narrow spike; a big loop gives a low, broad hump. Far away ($x \\gg R$) every curve falls as $1/x^3$, the same law as the electric dipole's axial field: a current loop is a **magnetic dipole**, which 4.6 makes precise.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Direction: the right-hand grip rule",
      content:
        "Straight wire: grip it with the thumb along the current; the fingers curl the way $\\vec B$ circles. Loop: curl the fingers along the current; the thumb points along $\\vec B$ through the centre. Looking at a loop, anticlockwise current means $\\vec B$ points towards you.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (infinite wire).** Find $B$ 5 cm from a long straight wire carrying 10 A.\n\n1. $B = \\dfrac{\\mu_0 I}{2\\pi d} = \\dfrac{2\\times10^{-7}\\times10}{0.05} = 4\\times10^{-5}$ T. *Why this step:* $\\dfrac{\\mu_0}{2\\pi} = 2\\times10^{-7}$ is worth memorising as a number.\n2. That is comparable to the Earth's field, which is why Ørsted's compass responded.\n\n**Worked example 2 (square loop).** A square loop of side $a = 0.2$ m carries 5 A. Find $B$ at its centre.\n\n1. Each side is a segment at distance $a/2$ from the centre, with its ends at $45^\\circ$: $B_1 = \\dfrac{\\mu_0 I}{4\\pi(a/2)}(\\sin45^\\circ + \\sin45^\\circ) = \\dfrac{\\sqrt2\\,\\mu_0 I}{2\\pi a}$.\n2. All four sides give the same direction (grip rule), so $B = 4B_1 = \\dfrac{2\\sqrt2\\,\\mu_0 I}{\\pi a}$. *Why this step:* symmetry means computing one side and multiplying.\n3. $B = 2\\sqrt2\\times\\dfrac{4\\times10^{-7}\\times5}{0.2} = 2\\sqrt2\\times10^{-5} \\approx 2.83\\times10^{-5}$ T.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (hairpin).** A long wire is bent into a hairpin: two parallel semi-infinite straight leads joined by a semicircle of radius $R = 5$ cm. It carries 10 A. Find $B$ at the centre of the semicircle.\n\n1. Semicircle: $\\theta = \\pi$, so $B_1 = \\dfrac{\\mu_0 I}{4R}$.\n2. Each straight lead is semi-infinite, and the centre lies on the perpendicular through its end at distance $R$: $B_2 = B_3 = \\dfrac{\\mu_0 I}{4\\pi R}$. *Why this step:* this is the half-infinite-wire result, with $\\alpha = 0$ and $\\beta = 90^\\circ$.\n3. All three point the same way (the current circulates in one sense around the centre), so $B = \\dfrac{\\mu_0 I}{4R}\\left(1 + \\dfrac{2}{\\pi}\\right)$.\n4. $\\dfrac{\\mu_0 I}{4R} = \\dfrac{4\\pi\\times10^{-7}\\times10}{0.2} \\approx 6.28\\times10^{-5}$ T, so $B \\approx 6.28\\times10^{-5}\\times1.637 \\approx 1.03\\times10^{-4}$ T.\n\n**Worked example 4 (concentric loops).** Two concentric coplanar loops of radii 10 cm and 20 cm carry 2 A and 4 A in opposite senses. Find $B$ at the centre.\n\n1. $B_1 = \\dfrac{\\mu_0\\times2}{2\\times0.1} = 10\\,\\mu_0$ and $B_2 = \\dfrac{\\mu_0\\times4}{2\\times0.2} = 10\\,\\mu_0$.\n2. Opposite senses give opposite directions, so the net field is **zero**.\n\n**Worked example 5 (on the axis).** How does the field at $x = R$ on a loop's axis compare with the centre?\n\n1. $\\dfrac{B(R)}{B(0)} = \\dfrac{R^3}{(2R^2)^{3/2}} = \\dfrac{1}{2\\sqrt2} \\approx 0.354$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the field of a straight wire points along the wire\"",
      content:
        "The cross product $d\\vec l\\times\\hat r$ is perpendicular to $d\\vec l$, so no element contributes any field along the wire. The field lines are circles around the wire in planes perpendicular to it. Along the wire's own line ($\\theta = 0$), an element contributes nothing at all.",
    },
    {
      type: "quiz",
      id: "em4-3-q1",
      variant: "practice",
      question: "The magnetic field 2 cm from a long straight wire carrying 5 A is",
      options: [
        { text: "$5\\times10^{-5}$ T", correct: true, feedback: "$\\dfrac{2\\times10^{-7}\\times5}{0.02} = 5\\times10^{-5}$ T." },
        { text: "$1.57\\times10^{-4}$ T", feedback: "That is the loop-centre formula $\\mu_0 I/2R$. A straight wire has $\\mu_0 I/2\\pi d$." },
        { text: "$2.5\\times10^{-5}$ T", feedback: "That is the semi-infinite value $\\mu_0 I/4\\pi d$. This wire is long in both directions." },
        { text: "$5\\times10^{-3}$ T", feedback: "Convert 2 cm to 0.02 m, not 0.0002 m." },
      ],
    },
    {
      type: "quiz",
      id: "em4-3-q2",
      variant: "practice",
      question: "A circular coil of 50 turns and radius 10 cm carries 2 A. The field at its centre is",
      options: [
        { text: "$1.26\\times10^{-5}$ T", feedback: "That is a single turn. Each of the 50 turns adds the same field." },
        { text: "$2\\times10^{-4}$ T", feedback: "That uses $\\mu_0 I/2\\pi R$ (straight wire) for 50 turns. The loop formula has no $\\pi$ in the denominator." },
        { text: "$6.28\\times10^{-4}$ T", correct: true, feedback: "$\\dfrac{N\\mu_0 I}{2R} = \\dfrac{50\\times4\\pi\\times10^{-7}\\times2}{0.2} = 2\\pi\\times10^{-4}$ T." },
        { text: "$3.14\\times10^{-4}$ T", feedback: "That uses $\\mu_0 NI/4R$, the semicircle formula." },
      ],
    },
    {
      type: "quiz",
      id: "em4-3-q3",
      variant: "practice",
      question: "A wire carries current $I$ round a semicircle of radius $R$ and along two straight radial leads to and from the centre. The field at the centre is",
      options: [
        { text: "$\\dfrac{\\mu_0 I}{2R}$", feedback: "That is a full circle. A semicircle is half of it." },
        { text: "$\\dfrac{\\mu_0 I}{4R} + \\dfrac{\\mu_0 I}{2\\pi R}$", feedback: "That adds contributions from semi-infinite leads beside the centre. Radial leads aim at the centre and give zero." },
        { text: "$\\dfrac{\\mu_0 I}{4R}$", correct: true, feedback: "The arc gives $\\dfrac{\\mu_0 I\\pi}{4\\pi R}$. The radial leads point straight at the centre ($d\\vec l \\parallel \\hat r$), so they contribute nothing." },
        { text: "Zero", feedback: "Only the radial parts give zero. The arc contributes." },
      ],
    },
    {
      type: "quiz",
      id: "em4-3-q4",
      variant: "concept",
      question: "Seen from above, current flows anticlockwise round a horizontal loop. At the centre of the loop, $\\vec B$ points",
      options: [
        { text: "vertically upwards", correct: true, feedback: "Curl the right-hand fingers anticlockwise: the thumb points up." },
        { text: "vertically downwards", feedback: "That is the field for a clockwise current seen from above." },
        { text: "horizontally, along the current", feedback: "Each element's field is perpendicular to the current; at the centre they all point along the axis." },
        { text: "It is zero by symmetry.", feedback: "Opposite sides of the loop have opposite currents but also lie on opposite sides of the centre, so their fields add." },
      ],
    },
    {
      type: "quiz",
      id: "em4-3-q5",
      variant: "practice",
      question: "On the axis of a circular loop of radius $R$, at a distance $x = \\sqrt3\\,R$ from the centre, the field is what fraction of the field at the centre?",
      options: [
        { text: "$\\tfrac14$", feedback: "That is $\\dfrac{R^2}{R^2 + x^2}$. The power is $\\tfrac32$, not 1." },
        { text: "$\\tfrac{1}{2\\sqrt2}$", feedback: "That is the value at $x = R$." },
        { text: "$\\tfrac{1}{3\\sqrt3}$", feedback: "That uses $x^3$ in place of $(R^2 + x^2)^{3/2}$." },
        { text: "$\\tfrac18$", correct: true, feedback: "$\\dfrac{R^3}{(R^2 + 3R^2)^{3/2}} = \\dfrac{R^3}{8R^3} = \\dfrac18$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "amperes-circuital-law",
  title: "4.4 · Ampère's Circuital Law",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Biot–Savart always works, but it can take a page of integration. In Chapter 1, Gauss's law turned symmetric electric problems into one line. Magnetism has its own shortcut, and it exploits the fact that $\\vec B$ **curls around** currents rather than spreading out from them.",
    },
    {
      type: "text",
      content:
        "**Discovering it.** Walk once around a long straight wire on a circle of radius $r$. The field is tangent to the circle everywhere, with constant size $\\dfrac{\\mu_0 I}{2\\pi r}$. Add up $\\vec B\\cdot d\\vec l$ along the way:",
    },
    { type: "math", latex: "\\oint\\vec B\\cdot d\\vec l = \\frac{\\mu_0 I}{2\\pi r}\\times2\\pi r = \\mu_0 I" },
    {
      type: "text",
      content:
        "The radius cancels. Any other closed path around the wire gives the same answer (a wobble outwards meets a weaker field, exactly compensating), and a path that does **not** encircle the wire gives zero. Ampère showed this holds for any steady currents:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Ampère's circuital law",
      content:
        "$\\displaystyle\\oint\\vec B\\cdot d\\vec l = \\mu_0\\,I_{\\text{enc}}$\nThe line integral of $\\vec B$ around any closed loop equals $\\mu_0$ times the net current threading the loop. Currents count as positive if they point along the thumb when the fingers of the right hand curl along the direction of the path. Currents outside the loop contribute to $\\vec B$ on the loop but not to the total.",
    },
    {
      type: "text",
      content:
        "Just like Gauss's law, it is always true but only **useful** when symmetry lets you pull $B$ out of the integral. That happens for infinite straight wires and cylinders, long solenoids and toroids. It fails for a finite wire or a single loop: the law still holds, but $B$ varies along any path you could choose, so you cannot solve for it.",
    },
    {
      type: "text",
      content:
        "**A thick wire.** A long wire of radius $a$ carries current $I$ spread uniformly over its cross-section. Outside ($r > a$), a circle of radius $r$ encloses all of $I$: $B = \\dfrac{\\mu_0 I}{2\\pi r}$. Inside ($r < a$), it encloses only the fraction $\\dfrac{\\pi r^2}{\\pi a^2}$:",
    },
    { type: "math", latex: "B\\,(2\\pi r) = \\mu_0 I\\,\\frac{r^2}{a^2} \\;\\Longrightarrow\\; B_{\\text{inside}} = \\frac{\\mu_0 I\\,r}{2\\pi a^2}" },
    {
      type: "text",
      content:
        "In units where $a = 1$ and $\\dfrac{\\mu_0 I}{2\\pi a} = 1$, the field is $r$ inside and $1/r$ outside. The graph below plots that (as the smaller of $r$ and $1/r$). Drag the point.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "(abs(x) + 1/abs(x) - abs(abs(x) - 1/abs(x)))/2",
        exprLatex: "B(r) = \\begin{cases} r & r \\le a \\\\ 1/r & r \\ge a \\end{cases}",
        window: { xmin: 0, xmax: 6, ymin: 0, ymax: 1.5 },
        initial: 0.5,
        excluded: [0],
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the field is zero on the axis, climbs linearly to its peak at the surface $r = a$, then falls off as $1/r$. The values at $r = a/2$ and $r = 2a$ are equal (both 0.5).",
    },
    {
      type: "text",
      content:
        "**The long solenoid.** A tightly wound coil with $n$ turns per metre carrying $I$. Symmetry and experiment say the field inside is uniform and along the axis, and outside it is negligible. Take a rectangular path of length $L$ with one long side inside, parallel to the axis, and the other outside. Only the inside side contributes ($\\vec B = 0$ outside; $\\vec B\\perp d\\vec l$ on the short sides). It encloses $nL$ turns, each carrying $I$:",
    },
    { type: "math", latex: "BL = \\mu_0\\,(nL)\\,I \\;\\Longrightarrow\\; B = \\mu_0 n I" },
    {
      type: "text",
      content:
        "The field does not depend on where inside the long side is placed, so it is **uniform across the cross-section**. At an open end, only \"half the solenoid\" is on one side, and the field is $\\tfrac12\\mu_0 nI$.\n\n**The toroid.** A solenoid bent into a ring with $N$ turns. A circle of radius $r$ inside the core threads all $N$ turns: $B(2\\pi r) = \\mu_0 NI$, so $B = \\dfrac{\\mu_0 NI}{2\\pi r}$. A circle in the central hole encloses no current; a circle outside the whole toroid encloses $N$ currents up and $N$ down. Both give $B = 0$: the field is trapped inside the core.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (solenoid).** A solenoid has 1000 turns per metre and carries 2 A.\n\n1. $B = \\mu_0 nI = 4\\pi\\times10^{-7}\\times1000\\times2 \\approx 2.5\\times10^{-3}$ T.\n2. Near an end: about $1.3\\times10^{-3}$ T. *Why this step:* the end sees only half the coil.\n\n**Worked example 2 (hollow pipe).** A long thin-walled metal pipe carries current along its length. Find $B$ inside the hollow.\n\n1. Draw a circle inside the hollow, concentric with the pipe. It encloses no current. *Why this step:* the whole current flows in the wall, outside the circle.\n2. By symmetry $B$ is the same all round the circle, so $B(2\\pi r) = 0$ and $B = 0$ everywhere inside.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (thick wire).** A wire of radius 2 mm carries 10 A uniformly. Find $B$ at 1 mm, 2 mm and 4 mm from its axis.\n\n1. At the surface: $B = \\dfrac{2\\times10^{-7}\\times10}{2\\times10^{-3}} = 10^{-3}$ T.\n2. Inside, $B \\propto r$: at 1 mm (half the radius), $5\\times10^{-4}$ T. *Why this step:* scaling from the surface value avoids recomputing.\n3. Outside, $B \\propto 1/r$: at 4 mm (twice the radius), $5\\times10^{-4}$ T.\n\n**Worked example 4 (toroid).** A toroid of 500 turns with mean radius 10 cm carries 2 A.\n\n1. $B = \\dfrac{\\mu_0 NI}{2\\pi r} = \\dfrac{2\\times10^{-7}\\times500\\times2}{0.1} = 2\\times10^{-3}$ T.\n\n**Worked example 5 (coaxial cable).** A coaxial cable carries current $I$ out along the central wire and back along the outer sheath. Find $B$ outside the cable.\n\n1. A circle outside encloses $+I$ and $-I$: net zero. By symmetry, $B = 0$ outside. This is why coaxial cables do not disturb their neighbours.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"B inside a long solenoid is strongest near the windings\"",
      content:
        "Ampère's rectangle gives $B = \\mu_0 nI$ wherever its inside edge is placed, near the wall or on the axis. The field inside a long solenoid is uniform across the whole cross-section. This uniformity is why solenoids are used wherever a known, even field is needed (MRI machines are giant solenoids).",
    },
    {
      type: "quiz",
      id: "em4-4-q1",
      variant: "practice",
      question: "A long solenoid has 2000 turns per metre and carries 0.5 A. The field inside is about",
      options: [
        { text: "$6.3\\times10^{-4}$ T", feedback: "That is the value at an open end. Deep inside it is twice as large." },
        { text: "$1.26\\times10^{-3}$ T", correct: true, feedback: "$4\\pi\\times10^{-7}\\times2000\\times0.5 = 4\\pi\\times10^{-4} \\approx 1.26\\times10^{-3}$ T." },
        { text: "$2\\times10^{-4}$ T", feedback: "That uses $2\\times10^{-7}$ (the straight-wire constant) in place of $\\mu_0$." },
        { text: "$1.26$ T", feedback: "Check the power of ten: $\\mu_0 = 4\\pi\\times10^{-7}$." },
      ],
    },
    {
      type: "quiz",
      id: "em4-4-q2",
      variant: "practice",
      question: "A long wire of radius $a$ carries a uniformly distributed current. The ratio of the fields at $r = a/2$ and at $r = 2a$ is",
      options: [
        { text: "1 : 4", feedback: "That would follow if $B \\propto 1/r$ everywhere. Inside, only part of the current is enclosed." },
        { text: "4 : 1", feedback: "Inside the wire the field grows with $r$, from zero on the axis." },
        { text: "1 : 2", feedback: "Check both: $B(a/2) = \\tfrac12B(a)$ and $B(2a) = \\tfrac12B(a)$." },
        { text: "1 : 1", correct: true, feedback: "Inside $B \\propto r$ gives half the surface value; outside $B \\propto 1/r$ also gives half." },
      ],
    },
    {
      type: "quiz",
      id: "em4-4-q3",
      variant: "practice",
      question: "A toroid with 1000 turns carries 1 A. The field in its core at a radius of 20 cm from the centre is",
      options: [
        { text: "$6.28\\times10^{-3}$ T", feedback: "That is $\\mu_0 NI/r$ with the $2\\pi$ lost from $2\\pi r$." },
        { text: "$10^{-3}$ T", correct: true, feedback: "$\\dfrac{\\mu_0 NI}{2\\pi r} = \\dfrac{2\\times10^{-7}\\times1000}{0.2} = 10^{-3}$ T." },
        { text: "Zero, as for a solenoid's outside", feedback: "The field is zero outside the toroid and in its hole, not in the core." },
        { text: "$1.26\\times10^{-3}$ T", feedback: "That treats it as a solenoid with $n = 1000$ per metre. The toroid's turns per metre are $N/2\\pi r$." },
      ],
    },
    {
      type: "quiz",
      id: "em4-4-q4",
      variant: "concept",
      question: "Why can't Ampère's law easily give the field of a short straight wire segment?",
      options: [
        { text: "Ampère's law is false for short wires.", feedback: "The law is always true for steady currents. The difficulty is using it." },
        { text: "A short wire carries no current.", feedback: "It carries current, but a short segment by itself is not a complete steady circuit; its field needs Biot–Savart." },
        {
          text: "No closed path exists on which $B$ is constant and simply related to $d\\vec l$, so $B$ cannot be taken out of the integral.",
          correct: true,
          feedback: "Without that symmetry, $\\oint\\vec B\\cdot d\\vec l = \\mu_0 I$ is true but has too many unknowns. Use Biot–Savart instead.",
        },
      ],
    },
    {
      type: "quiz",
      id: "em4-4-q5",
      variant: "concept",
      question: "The field at the centre of a long solenoid is $B_0$. The field at the centre of one of its open ends is about",
      options: [
        { text: "$B_0/2$", correct: true, feedback: "Two half-solenoids joined end to end make a whole one, so each supplies $B_0/2$ at the join." },
        { text: "$B_0$", feedback: "At the end there is solenoid on one side only." },
        { text: "$2B_0$", feedback: "Field lines spread out at the ends, so the field weakens." },
        { text: "Zero", feedback: "The field only becomes negligible well outside the solenoid, not at its mouth." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "forces-on-current-carrying-conductors",
  title: "4.5 · Forces on Conductors",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Every electric motor, loudspeaker and electric train turns current into motion through one effect: a wire carrying current in a magnetic field is pushed sideways. That is not a new law. It is 4.1's force on moving charges, summed over all the drifting electrons inside the wire.",
    },
    {
      type: "text",
      content:
        "**Derivation.** A straight wire of length $l$ and cross-section $A$ holds $nAl$ carriers, each of charge $q$ drifting with $\\vec v_d$. Each feels $q\\vec v_d\\times\\vec B$, and the forces are passed on to the wire through collisions. Define $\\vec l$ as the vector of length $l$ pointing along the current. Then $nAl\\,q\\vec v_d = (nqAv_d)\\,\\vec l = I\\vec l$:",
    },
    { type: "math", latex: "\\vec F = (nAl)\\,q\\,\\vec v_d\\times\\vec B = I\\,\\vec l\\times\\vec B, \\qquad F = IlB\\sin\\theta" },
    {
      type: "callout",
      variant: "definition",
      title: "Force on a current-carrying conductor",
      content:
        "Straight wire in a uniform field: $\\vec F = I\\,\\vec l\\times\\vec B$, where $\\vec l$ points along the current.\nAny shape: $\\vec F = I\\displaystyle\\int d\\vec l\\times\\vec B$. In a **uniform** field this is $I\\left(\\int d\\vec l\\right)\\times\\vec B = I\\,\\vec L_{AB}\\times\\vec B$, where $\\vec L_{AB}$ is the straight vector from the wire's start A to its end B. So a curved wire feels the same force as the straight line joining its ends, and any **closed** loop in a uniform field feels zero net force.",
    },
    {
      type: "text",
      content:
        "In the 3D view, read $\\vec a$ as the current element $\\vec l$ and $\\vec b$ as $\\vec B$. The normal is the force direction.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "cross",
        a: [3, 0, 0],
        b: [0, 3, 0],
        sliders: [{ name: "angle", min: 0, max: 180, step: 15, initial: 90 }],
        readouts: ["cross"],
        caption:
          "Read a as the current direction l and b as B; the normal is I l × B. Turn the wire towards the field and the force fades to zero.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the force on the wire is perpendicular both to the wire and to the field, and largest when they are at right angles. A wire lying along the field lines feels no force.",
    },
    {
      type: "text",
      content:
        "**Two parallel wires.** Wire 1 carries $I_1$; at distance $d$ it makes $B_1 = \\dfrac{\\mu_0 I_1}{2\\pi d}$ (4.3), perpendicular to wire 2. A length $l$ of wire 2 carrying $I_2$ therefore feels $F = I_2\\,l\\,B_1$:",
    },
    { type: "math", latex: "\\frac{F}{l} = \\frac{\\mu_0\\,I_1 I_2}{2\\pi d}" },
    {
      type: "text",
      content:
        "Work out the direction with the grip rule and $I\\vec l\\times\\vec B$: currents in the **same** direction **attract**, and opposite currents repel. Wire 1 pushes on wire 2 exactly as hard as wire 2 pushes on wire 1 (swap the labels), as Newton's third law demands. Historically this was the SI definition of the ampere: the current that, in two long parallel wires 1 m apart, produces a force of $2\\times10^{-7}$ N per metre. (Since 2019 the ampere is defined by fixing $e$ instead, but the number is the same.)",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a semicircle).** A semicircular wire of radius 0.1 m carries 5 A in a uniform 0.2 T field perpendicular to its plane. Find the force.\n\n1. Replace the arc by the straight line joining its ends: a diameter of length $2R = 0.2$ m. *Why this step:* in a uniform field only the start-to-end vector matters.\n2. $F = I(2R)B = 5\\times0.2\\times0.2 = 0.2$ N, perpendicular to the diameter, in the plane of the semicircle.\n\n**Worked example 2 (levitating a wire).** A horizontal wire of mass 0.01 kg per metre sits in a horizontal field of 0.5 T perpendicular to it. What current makes it float? ($g = 10$ m/s²)\n\n1. For balance the magnetic force per metre must equal the weight per metre: $IB = \\lambda g$. *Why this step:* both forces scale with length, so work per metre.\n2. $I = \\dfrac{0.01\\times10}{0.5} = 0.2$ A, in the direction that makes $I\\vec l\\times\\vec B$ point up.\n\n**Worked example 3 (parallel wires).** Two long parallel wires 1 cm apart each carry 10 A in the same direction.\n\n1. $\\dfrac{F}{l} = \\dfrac{2\\times10^{-7}\\times10\\times10}{0.01} = 2\\times10^{-3}$ N/m, attractive.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (rod on inclined rails).** A rod of mass 0.1 kg and length 0.5 m rests across smooth rails inclined at $45^\\circ$, in a **vertical** field of 0.5 T. What current keeps it at rest?\n\n1. The magnetic force $IlB$ is horizontal (perpendicular to the vertical $\\vec B$ and to the rod). *Why this step:* the field direction, not the incline, sets the force direction.\n2. Along the incline: the horizontal force has component $IlB\\cos45^\\circ$ up the slope; gravity has $mg\\sin45^\\circ$ down it.\n3. Balance: $I = \\dfrac{mg\\tan45^\\circ}{lB} = \\dfrac{0.1\\times10\\times1}{0.5\\times0.5} = 4$ A.\n\n**Worked example 5 (loop near a long wire).** A long wire carries 10 A. A square loop of side 10 cm carrying 5 A lies in the same plane, its near side parallel to the wire at 10 cm. Find the net force on the loop.\n\n1. The two sides perpendicular to the wire feel equal and opposite forces and cancel.\n2. Near side (at 0.1 m): $F_1 = \\dfrac{2\\times10^{-7}\\times10\\times5}{0.1}\\times0.1 = 10^{-5}$ N. Far side (at 0.2 m): $F_2 = 0.5\\times10^{-5}$ N. *Why this step:* the field of the wire is not uniform, so the \"closed loop feels no force\" rule does not apply.\n3. If the near side's current is parallel to the wire's, it is attracted and the far side is repelled: net $5\\times10^{-6}$ N **towards** the wire.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"like currents repel, like like charges\"",
      content:
        "Parallel currents in the **same** direction **attract**. Check with the grip rule: wire 1's field at wire 2, crossed with wire 2's current, points back towards wire 1. The analogy with charges fails because the magnetic force comes from a cross product, not a simple push along the line joining them.",
    },
    {
      type: "quiz",
      id: "em4-5-q1",
      variant: "practice",
      question: "A 2 m straight wire carrying 3 A lies at $30^\\circ$ to a uniform 0.5 T field. The force on it is",
      options: [
        { text: "3 N", feedback: "That takes $\\sin\\theta = 1$. The wire is at $30^\\circ$ to the field." },
        { text: "1.5 N", correct: true, feedback: "$IlB\\sin\\theta = 3\\times2\\times0.5\\times0.5 = 1.5$ N." },
        { text: "2.6 N", feedback: "That uses $\\cos30^\\circ$. The force depends on the component of the wire perpendicular to $\\vec B$: $\\sin\\theta$." },
        { text: "0.75 N", feedback: "Check: $3\\times2 = 6$, $6\\times0.5 = 3$, $3\\times0.5 = 1.5$ N." },
      ],
    },
    {
      type: "quiz",
      id: "em4-5-q2",
      variant: "practice",
      question: "Two long parallel wires 10 cm apart each carry 5 A in the same direction. The force per metre between them is",
      options: [
        { text: "$5\\times10^{-5}$ N/m, repulsive", feedback: "Same-direction currents attract." },
        { text: "$5\\times10^{-6}$ N/m, attractive", feedback: "Check the distance: 10 cm is 0.1 m." },
        { text: "$3.1\\times10^{-4}$ N/m, attractive", feedback: "That uses $\\mu_0 I_1I_2/d$ without the $2\\pi$." },
        { text: "$5\\times10^{-5}$ N/m, attractive", correct: true, feedback: "$\\dfrac{2\\times10^{-7}\\times25}{0.1} = 5\\times10^{-5}$ N/m; same direction attracts." },
      ],
    },
    {
      type: "quiz",
      id: "em4-5-q3",
      variant: "concept",
      question: "A closed rectangular loop of wire carrying a current lies in a **uniform** magnetic field. The net force on it is",
      options: [
        { text: "zero, though there may be a torque", correct: true, feedback: "$I\\oint d\\vec l\\times\\vec B = I\\left(\\oint d\\vec l\\right)\\times\\vec B = 0$ since a closed loop returns to its start. Forces on opposite sides can still form a couple (4.6)." },
        { text: "$IlB$ times the perimeter", feedback: "Opposite sides carry opposite currents, so their forces cancel." },
        { text: "zero, and there can never be a torque", feedback: "The forces cancel as a sum, but they can act along different lines and twist the loop. That is how motors work." },
        { text: "directed along the field", feedback: "Magnetic forces on currents are perpendicular to $\\vec B$, and here they sum to zero anyway." },
      ],
    },
    {
      type: "quiz",
      id: "em4-5-q4",
      variant: "practice",
      question: "A wire bent into a quarter circle of radius $R$ carries current $I$ in a uniform field $B$ perpendicular to its plane. The magnitude of the force on it is",
      options: [
        { text: "$\\dfrac{\\pi}{2}IRB$", feedback: "That uses the arc length. In a uniform field, use the straight chord." },
        { text: "$IRB$", feedback: "That is one radius, not the chord joining the ends of the arc." },
        { text: "$\\sqrt2\\,IRB$", correct: true, feedback: "The chord of a quarter circle has length $R\\sqrt2$, so $F = I(R\\sqrt2)B$." },
        { text: "$2IRB$", feedback: "That is the diameter, the chord of a semicircle." },
      ],
    },
    {
      type: "quiz",
      id: "em4-5-q5",
      variant: "practice",
      question: "A horizontal wire with mass 0.05 kg per metre is to be held up by a horizontal 0.25 T field perpendicular to it ($g = 10$ m/s²). The current needed is",
      options: [
        { text: "0.2 A", feedback: "Check: the weight per metre is $0.05\\times10 = 0.5$ N/m." },
        { text: "0.125 A", feedback: "That is $\\lambda gB$. Solve $IB = \\lambda g$ for $I$." },
        { text: "2 A", correct: true, feedback: "$I = \\lambda g/B = 0.5/0.25 = 2$ A." },
        { text: "No current can do it, since magnetic forces do no work.", feedback: "Holding something still needs force, not work. The magnetic force on a current can certainly balance gravity." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "torque-on-a-loop-and-galvanometer",
  title: "4.6 · Loops, Torque and Meters",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A closed loop in a uniform field feels no net force (4.5), but that does not mean nothing happens. The forces on opposite sides can act along different lines and form a couple, which twists the loop. Every electric motor and every moving-coil meter is built on that twist.",
    },
    {
      type: "text",
      content:
        "**Derivation.** A rectangular loop with sides $a$ and $b$ carries current $I$ in a uniform field $\\vec B$. Let the loop's normal $\\hat n$ (fixed by the right-hand rule on the current) make an angle $\\theta$ with $\\vec B$. The two sides of length $b$ lie perpendicular to $\\vec B$ and feel equal, opposite forces $IbB$. Their lines of action are separated by $a\\sin\\theta$, so they form a couple of moment",
    },
    { type: "math", latex: "\\tau = (IbB)(a\\sin\\theta) = I(ab)B\\sin\\theta = IAB\\sin\\theta" },
    {
      type: "text",
      content:
        "The other two sides feel forces along the axis of rotation, which cancel and add no torque. For $N$ turns the torque is $N$ times larger. The combination $NIA$ with direction $\\hat n$ is the loop's **magnetic moment**, and the torque takes exactly the form of the electric dipole's $\\vec\\tau = \\vec p\\times\\vec E$ from 0.6:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Magnetic moment of a current loop",
      content:
        "$\\vec m = NI\\vec A$, with $\\vec A$ along the right-hand normal (unit A m²).\nTorque: $\\vec\\tau = \\vec m\\times\\vec B$, magnitude $mB\\sin\\theta$.\nPotential energy: $U = -\\vec m\\cdot\\vec B = -mB\\cos\\theta$. Stable equilibrium at $\\theta = 0$ ($\\vec m$ along $\\vec B$), unstable at $\\theta = 180^\\circ$. Work to turn from $\\theta_1$ to $\\theta_2$: $W = mB(\\cos\\theta_1 - \\cos\\theta_2)$.\nThe result holds for any flat loop shape, not just rectangles.",
    },
    {
      type: "text",
      content:
        "**The moving-coil galvanometer.** A coil of $N$ turns and area $A$ hangs between concave pole pieces with a soft-iron cylinder inside. This makes the field **radial**: whatever angle the coil turns to, its plane stays along the field lines, so $\\sin\\theta = 1$ always. A spring (or suspension fibre) supplies a restoring torque $k\\phi$ for a twist $\\phi$. At equilibrium",
    },
    { type: "math", latex: "NIAB = k\\phi \\;\\Longrightarrow\\; \\phi = \\left(\\frac{NAB}{k}\\right)I" },
    {
      type: "text",
      content:
        "The deflection is proportional to the current, so the scale is **linear**. The deflection per unit current, $\\dfrac{\\phi}{I} = \\dfrac{NAB}{k}$, is the **current sensitivity**. Dividing by the coil resistance $G$ gives the **voltage sensitivity** $\\dfrac{\\phi}{V} = \\dfrac{NAB}{kG}$. Adding turns raises current sensitivity, but also raises $G$, so voltage sensitivity need not improve.",
    },
    {
      type: "text",
      content:
        "**Converting a galvanometer.** A galvanometer gives full-scale deflection at a small current $I_g$ (often a milliampere) and has resistance $G$.\n\n**Ammeter:** connect a small **shunt** $S$ in parallel, so most of the current bypasses the coil. At full scale, $I_g$ goes through $G$ and $I - I_g$ through $S$, with the same voltage: $I_gG = (I - I_g)S$.\n\n**Voltmeter:** connect a large resistance $R$ in series, so that the full-scale voltage $V$ drives exactly $I_g$: $V = I_g(G + R)$.",
    },
    {
      type: "math",
      latex: "S = \\frac{I_g\\,G}{I - I_g}\\ (\\text{ammeter}), \\qquad R = \\frac{V}{I_g} - G\\ (\\text{voltmeter})",
    },
    {
      type: "text",
      content:
        "The machine below uses $G = 50\\ \\Omega$ and $I_g = 1$ mA and returns the shunt needed for a chosen ammeter range $I$: $S = \\dfrac{0.05}{I - 0.001}$ Ω.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "0.05/(x - 0.001)",
        exprLatex: "S = \\frac{I_g G}{I - I_g} = \\frac{0.05}{I - 0.001}\\ \\Omega",
        min: 0.01,
        max: 5,
        step: 0.01,
        initial: 1,
        inputLabel: "Ammeter range I",
        inputUnit: "A",
        outputLabel: "Shunt resistance S (Ω)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the bigger the range, the smaller the shunt. For a 5 A range it is about 0.01 Ω, a stub of thick wire. The ammeter as a whole ($G$ in parallel with $S$) then has a resistance even smaller than $S$, which is exactly what an ammeter should have.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (torque on a coil).** A rectangular coil of 100 turns, 5 cm × 4 cm, carries 0.1 A in a 0.5 T field, with the plane of the coil parallel to the field.\n\n1. Plane parallel to $\\vec B$ means the **normal** is perpendicular to $\\vec B$: $\\theta = 90^\\circ$. *Why this step:* $\\theta$ is measured from the normal, and mixing up \"plane\" and \"normal\" is the classic slip.\n2. $\\tau = NIAB = 100\\times0.1\\times(0.05\\times0.04)\\times0.5 = 100\\times0.1\\times0.002\\times0.5 = 0.01$ N m.\n\n**Worked example 2 (work to flip it).** How much work turns the same coil from stable to unstable equilibrium?\n\n1. $m = NIA = 100\\times0.1\\times0.002 = 0.02$ A m².\n2. $W = mB(\\cos0^\\circ - \\cos180^\\circ) = 2mB = 2\\times0.02\\times0.5 = 0.02$ J.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (ammeter).** Convert a galvanometer with $G = 50\\ \\Omega$ and $I_g = 1$ mA into a 0–5 A ammeter.\n\n1. $S = \\dfrac{I_gG}{I - I_g} = \\dfrac{0.001\\times50}{5 - 0.001} = \\dfrac{0.05}{4.999} \\approx 0.010\\ \\Omega$, in parallel.\n\n**Worked example 4 (voltmeter).** Convert the same galvanometer into a 0–10 V voltmeter.\n\n1. Total resistance for full scale: $\\dfrac{V}{I_g} = \\dfrac{10}{0.001} = 10\\,000\\ \\Omega$. *Why this step:* at full scale the whole meter must pass exactly $I_g$ at 10 V.\n2. The coil provides 50 Ω, so the series resistance is $R = 10\\,000 - 50 = 9950\\ \\Omega$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"an ammeter should have a large resistance so it doesn't draw current\"",
      content:
        "That is the requirement for a **voltmeter**, which sits in parallel and should steal as little current as possible. An ammeter sits **in series**, in the path of the current it measures; any resistance it adds reduces that very current. A good ammeter has very small resistance, which is what the shunt achieves.",
    },
    {
      type: "quiz",
      id: "em4-6-q1",
      variant: "practice",
      question: "A coil of 50 turns and area $4\\times10^{-3}$ m² carries 0.5 A in a 0.2 T field. The maximum torque on it is",
      options: [
        { text: "0.02 N m", correct: true, feedback: "$NIAB = 50\\times0.5\\times4\\times10^{-3}\\times0.2 = 0.02$ N m, when the normal is perpendicular to $\\vec B$." },
        { text: "$4\\times10^{-4}$ N m", feedback: "That is a single turn. Multiply by $N = 50$." },
        { text: "0.1 N m", feedback: "Check: $50\\times0.5 = 25$; $25\\times0.004 = 0.1$; $0.1\\times0.2 = 0.02$ N m." },
        { text: "Zero, since the net force on a loop is zero", feedback: "The net force is zero, but the forces form a couple and give a torque." },
      ],
    },
    {
      type: "quiz",
      id: "em4-6-q2",
      variant: "practice",
      question: "A galvanometer of resistance 100 Ω gives full-scale deflection at 10 mA. The shunt needed to make it a 0–1 A ammeter is about",
      options: [
        { text: "1 Ω", feedback: "Close, but that forgets that $I_g$ flows in the coil, so the shunt carries $I - I_g = 0.99$ A." },
        { text: "9900 Ω", feedback: "That is a series resistance for a voltmeter, and for different numbers." },
        { text: "99 Ω", feedback: "The shunt must carry 99 times the coil current, so it must be about 99 times smaller than 100 Ω." },
        { text: "1.01 Ω", correct: true, feedback: "$S = \\dfrac{0.01\\times100}{1 - 0.01} = \\dfrac{1}{0.99} \\approx 1.01\\ \\Omega$." },
      ],
    },
    {
      type: "quiz",
      id: "em4-6-q3",
      variant: "practice",
      question: "A galvanometer of resistance 20 Ω gives full-scale deflection at 5 mA. To read 0–5 V it needs",
      options: [
        { text: "1000 Ω in series", feedback: "That is the whole meter's resistance. The coil already supplies 20 Ω." },
        { text: "980 Ω in series", correct: true, feedback: "$R = \\dfrac{5}{0.005} - 20 = 1000 - 20 = 980\\ \\Omega$." },
        { text: "980 Ω in parallel", feedback: "A parallel resistor would make an ammeter. A voltmeter needs series resistance." },
        { text: "0.02 Ω in parallel", feedback: "That is a shunt, which converts to an ammeter." },
      ],
    },
    {
      type: "quiz",
      id: "em4-6-q4",
      variant: "concept",
      question: "Why are the pole pieces of a moving-coil galvanometer curved, with a soft-iron core inside the coil?",
      options: [
        { text: "To make the coil lighter.", feedback: "The core adds mass. Its purpose is to shape and strengthen the field." },
        { text: "To prevent any torque when the coil is at rest.", feedback: "With no current there is no magnetic torque anyway; the shape matters when current flows." },
        { text: "To shield the coil from the Earth's field.", feedback: "The strong internal field swamps the Earth's field; the curvature is about making it radial." },
        { text: "To make the field radial, so the torque $NIAB$ does not depend on the coil's angle and the scale is linear.", correct: true, feedback: "With $\\sin\\theta = 1$ at every position, $\\phi \\propto I$." },
      ],
    },
    {
      type: "quiz",
      id: "em4-6-q5",
      variant: "concept",
      question: "A current loop with magnetic moment $\\vec m$ is free to turn in a uniform field $\\vec B$. Its stable equilibrium is with",
      options: [
        { text: "$\\vec m$ antiparallel to $\\vec B$", feedback: "That is an equilibrium (zero torque), but unstable: $U$ is at its maximum." },
        { text: "$\\vec m$ parallel to $\\vec B$", correct: true, feedback: "$U = -mB\\cos\\theta$ is lowest at $\\theta = 0$; a small twist produces a restoring torque." },
        { text: "$\\vec m$ perpendicular to $\\vec B$", feedback: "That is where the torque is largest, so the loop cannot rest there." },
        { text: "the plane of the loop parallel to $\\vec B$", feedback: "That puts $\\vec m$ perpendicular to $\\vec B$: maximum torque, not equilibrium." },
      ],
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "magnetism-and-matter",
  title: "4.7 · Magnetism and Matter",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "A bar magnet has no battery and no wires, yet its field looks exactly like a current loop's from outside. That is no coincidence. Inside the iron, electrons orbit and spin, and each is a tiny current loop with a magnetic moment. When those moments line up, their fields add into the field of the magnet. Magnetism in matter is 4.6's current loops, multiplied by $10^{23}$.",
    },
    {
      type: "text",
      content:
        "**An orbiting electron is a current loop.** An electron (charge $e$, mass $m_e$) circling at speed $v$ on a radius $r$ passes any point once per period $T = 2\\pi r/v$, so it is equivalent to a current $I = \\dfrac{e}{T} = \\dfrac{ev}{2\\pi r}$. Its magnetic moment is\n\n$m = I\\pi r^2 = \\dfrac{evr}{2}$, and since its angular momentum is $L = m_evr$, $\\dfrac{m}{L} = \\dfrac{e}{2m_e}$.\n\nThe ratio does not depend on $r$ or $v$. In Bohr's first orbit ($L = h/2\\pi$) this gives $m = \\dfrac{eh}{4\\pi m_e} \\approx 9.27\\times10^{-24}$ A m², the **Bohr magneton**: the natural unit of atomic magnetism.",
    },
    {
      type: "text",
      content:
        "**The bar magnet as a dipole.** Far from a bar magnet of magnetic moment $m$ (pointing from its S pole to its N pole), the field has the same shape as the electric dipole's (0.6), with $\\dfrac{1}{4\\pi\\varepsilon_0}\\to\\dfrac{\\mu_0}{4\\pi}$ and $p\\to m$:",
    },
    {
      type: "math",
      latex: "B_{\\text{axial}} = \\frac{\\mu_0}{4\\pi}\\,\\frac{2m}{r^3}\\ \\ (\\text{along }\\vec m), \\qquad B_{\\text{equatorial}} = \\frac{\\mu_0}{4\\pi}\\,\\frac{m}{r^3}\\ \\ (\\text{opposite to }\\vec m)",
    },
    {
      type: "text",
      content:
        "The canvas below shows the field lines of an electric dipole. Outside the magnet, a bar magnet's field lines have exactly this shape; read + as the N pole and − as the S pole. Drag the poles apart and together.",
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "field-lines",
        charges: [
          { q: 2, pos: [-1.5, 0], label: "N" },
          { q: -2, pos: [1.5, 0], label: "S" },
        ],
        caption:
          "Outside the magnet, a bar magnet's lines have exactly this shape: out of N, round, and into S. The difference is inside, where a magnet's lines continue from S back to N and close.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: lines leave the N end, loop round and enter the S end, crowding near the poles where the field is strongest. For the electric dipole the lines really do stop on the charges. For the magnet they do not stop: they run on through the magnet from S back to N, forming **closed loops**. There are no isolated magnetic poles (no magnetic monopoles have ever been found), so every line that leaves a closed surface also enters it:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Gauss's law for magnetism",
      content:
        "$\\displaystyle\\oint\\vec B\\cdot d\\vec A = 0$ for every closed surface.\nThe net magnetic flux out of any closed surface is zero, because there is no magnetic charge. Cutting a bar magnet in half gives two smaller magnets, each with its own N and S.",
    },
    {
      type: "text",
      content:
        "**The Earth's field.** The Earth behaves roughly like a giant bar magnet whose S pole lies near the geographic North Pole (which is why a compass N end points north). Three numbers describe the field at a place:\n\n**Declination:** the angle between geographic north and magnetic north (the direction a compass points).\n**Dip (inclination) $\\delta$:** the angle the total field makes with the horizontal. A freely pivoted needle dips by $\\delta$: zero at the magnetic equator, $90^\\circ$ at the magnetic poles.\n**Horizontal component** $B_H = B\\cos\\delta$, with vertical component $B_V = B\\sin\\delta$, so $\\tan\\delta = B_V/B_H$.",
    },
    {
      type: "text",
      content:
        "**Magnetic materials.** Place a material in a field of strength $H$ (the field made by free currents, $B_0 = \\mu_0H$). Its atomic moments respond and it acquires a **magnetisation** $M$ (magnetic moment per unit volume). The total field is $B = \\mu_0(H + M)$. The response is measured by the **susceptibility** $\\chi = M/H$, and the **relative permeability** is $\\mu_r = 1 + \\chi$.",
    },
    {
      type: "table",
      headers: ["Type", "$\\chi$", "Behaviour", "Examples"],
      rows: [
        ["Diamagnetic", "small, negative (about $-10^{-5}$)", "weakly repelled; moves from strong to weak field; independent of temperature", "bismuth, copper, water, superconductors ($\\chi = -1$)"],
        ["Paramagnetic", "small, positive ($10^{-5}$ to $10^{-3}$)", "weakly attracted; Curie's law $\\chi = C/T$", "aluminium, sodium, oxygen"],
        ["Ferromagnetic", "large, positive (up to $10^{5}$)", "strongly attracted; domains; becomes paramagnetic above the Curie temperature", "iron, cobalt, nickel"],
      ],
    },
    {
      type: "text",
      content:
        "**Hysteresis.** Magnetise a ferromagnet by raising $H$, then lower $H$ back to zero: $B$ does not return to zero. The leftover field is the **retentivity** (remanence). The reverse $H$ needed to bring $B$ to zero is the **coercivity**. Going round a full cycle traces a loop whose area is the energy lost as heat per cycle per unit volume. **Soft iron** has a narrow loop (low coercivity, low loss): ideal for transformer cores and electromagnets, which must switch easily. **Steel** has a wide loop (high coercivity and retentivity): ideal for permanent magnets, which must not lose their magnetism.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (dip).** At a place, $B_H = 0.4$ G and $B_V = 0.3$ G. Find the dip and the total field.\n\n1. $\\tan\\delta = \\dfrac{0.3}{0.4} = 0.75$, so $\\delta \\approx 36.9^\\circ$.\n2. $B = \\sqrt{0.4^2 + 0.3^2} = 0.5$ G $= 5\\times10^{-5}$ T. *Why this step:* the two components are perpendicular, so Pythagoras applies.\n\n**Worked example 2 (neutral points).** A bar magnet of moment 3.2 A m² lies with its N pole pointing geographic north, where $B_H = 4\\times10^{-5}$ T. Where are the neutral points?\n\n1. On the magnet's equatorial line the field points opposite to $\\vec m$, i.e. southwards, against the Earth's northward $B_H$. *Why this step:* on the axis the magnet's field points north and adds to the Earth's, so cancellation can only happen on the equator.\n2. Set $\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{r^3} = B_H$: $r^3 = \\dfrac{10^{-7}\\times3.2}{4\\times10^{-5}} = 8\\times10^{-3}$ m³.\n3. $r = 0.2$ m: two neutral points, 20 cm east and west of the centre.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (Curie's law).** A paramagnetic salt has $\\chi = 1.2\\times10^{-5}$ at 300 K. Find $\\chi$ at 200 K.\n\n1. $\\chi \\propto 1/T$, so $\\chi_{200} = 1.2\\times10^{-5}\\times\\dfrac{300}{200} = 1.8\\times10^{-5}$. *Why this step:* cooling reduces the thermal jostling that fights alignment.\n\n**Worked example 4 (axial field).** Find $B$ at 10 cm on the axis of a short magnet of moment 2 A m².\n\n1. $B = 10^{-7}\\times\\dfrac{2\\times2}{(0.1)^3} = 10^{-7}\\times4000 = 4\\times10^{-4}$ T. On the equatorial line at the same distance it would be half, $2\\times10^{-4}$ T.\n\n**Worked example 5 (permeability).** A ferromagnetic core has $\\chi = 499$. Find $\\mu_r$.\n\n1. $\\mu_r = 1 + \\chi = 500$: the core makes the field inside a solenoid 500 times stronger.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"magnetic field lines start at N and end at S\"",
      content:
        "Outside the magnet they run from N to S, but they do not end there. Inside the magnet they continue from S back to N, so every line is a closed loop. That is what $\\oint\\vec B\\cdot d\\vec A = 0$ says. Electric field lines really do start and end, on charges; magnetic lines have nowhere to start or end.",
    },
    {
      type: "quiz",
      id: "em4-7-q1",
      variant: "practice",
      question: "At a place the Earth's total field is 0.4 G and the angle of dip is $60^\\circ$. The horizontal component is",
      options: [
        { text: "0.35 G", feedback: "That is $B\\sin60^\\circ$, the vertical component." },
        { text: "0.4 G", feedback: "The total field is tilted $60^\\circ$ below the horizontal; only part of it is horizontal." },
        { text: "0.2 G", correct: true, feedback: "$B_H = B\\cos\\delta = 0.4\\times\\tfrac12 = 0.2$ G." },
        { text: "0.8 G", feedback: "That is $B/\\cos\\delta$. The component is $B\\cos\\delta$." },
      ],
    },
    {
      type: "quiz",
      id: "em4-7-q2",
      variant: "practice",
      question: "A material has susceptibility $\\chi = -2\\times10^{-5}$. It is",
      options: [
        { text: "diamagnetic", correct: true, feedback: "Small and negative: weakly repelled by a magnet." },
        { text: "paramagnetic", feedback: "Paramagnets have small **positive** susceptibility." },
        { text: "ferromagnetic", feedback: "Ferromagnets have huge positive susceptibility." },
        { text: "a superconductor", feedback: "A superconductor is a perfect diamagnet with $\\chi = -1$, far larger in size." },
      ],
    },
    {
      type: "quiz",
      id: "em4-7-q3",
      variant: "practice",
      question: "The susceptibility of a paramagnetic material at 300 K is $3\\times10^{-4}$. At 150 K it is",
      options: [
        { text: "$1.5\\times10^{-4}$", feedback: "That has $\\chi \\propto T$. Cooling makes alignment easier, so $\\chi$ rises." },
        { text: "$6\\times10^{-4}$", correct: true, feedback: "Curie's law $\\chi \\propto 1/T$: halving $T$ doubles $\\chi$." },
        { text: "$3\\times10^{-4}$", feedback: "Paramagnetic susceptibility depends on temperature; diamagnetic does not." },
        { text: "$1.2\\times10^{-3}$", feedback: "That has $\\chi \\propto 1/T^2$. Curie's law is $1/T$." },
      ],
    },
    {
      type: "quiz",
      id: "em4-7-q4",
      variant: "concept",
      question: "Which material properties are wanted for the core of a transformer?",
      options: [
        { text: "High retentivity and high coercivity", feedback: "Those suit a permanent magnet, which must hold its magnetism." },
        { text: "Negative susceptibility", feedback: "A diamagnetic core would weaken the field, the opposite of what a core is for." },
        { text: "A wide hysteresis loop, to store more energy", feedback: "The loop area is energy **lost** as heat each cycle; a transformer wants it small." },
        { text: "High permeability, low coercivity and a narrow hysteresis loop", correct: true, feedback: "It must magnetise strongly and reverse easily every cycle while losing little energy." },
      ],
    },
    {
      type: "quiz",
      id: "em4-7-q5",
      variant: "concept",
      question: "A closed surface surrounds only the N pole end of a bar magnet. The net magnetic flux out of the surface is",
      options: [
        { text: "zero", correct: true, feedback: "Gauss's law for magnetism: $\\oint\\vec B\\cdot d\\vec A = 0$ for any closed surface. There are no magnetic charges to enclose." },
        { text: "positive, since lines leave the N pole", feedback: "Lines leave the N end outside the magnet but the same number arrive back through the inside of the magnet, which also crosses the surface." },
        { text: "negative", feedback: "No closed surface can have net magnetic flux in or out." },
        { text: "equal to $\\mu_0 m$", feedback: "There is no magnetic analogue of $q/\\varepsilon_0$; magnetic flux through a closed surface is always zero." },
      ],
    },
    {
      type: "quiz",
      id: "em4-7-q6",
      variant: "practice",
      question: "A particle of charge $q$ and mass $m$ moves uniformly in a circle. The ratio of its magnetic moment to its angular momentum is",
      options: [
        { text: "$\\dfrac{q}{m}$", feedback: "Check the current: $I = qv/2\\pi r$, so the moment is $I\\pi r^2 = qvr/2$. The $\\tfrac12$ survives." },
        { text: "$\\dfrac{2q}{m}$", feedback: "The factor is $\\tfrac12$, not 2: $\\dfrac{qvr/2}{mvr}$." },
        { text: "$\\dfrac{q}{2m}$", correct: true, feedback: "Moment $qvr/2$ divided by $L = mvr$ gives $q/2m$, whatever the radius or speed." },
        { text: "It depends on the radius of the orbit.", feedback: "Both the moment and $L$ are proportional to $vr$, so the radius cancels." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-4-mastery",
  title: "4.8 · Chapter 4 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every question below comes back to two ideas: moving charges feel $q\\vec v\\times\\vec B$, and currents make $\\vec B$ by Biot–Savart (or Ampère, when symmetry allows).",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in eight lines",
      content:
        "1. $\\vec F = q(\\vec E + \\vec v\\times\\vec B)$; the magnetic part is perpendicular to $\\vec v$ and does no work.\n2. Perpendicular entry: $r = mv/qB = p/qB$, $T = 2\\pi m/qB$ (speed-independent); oblique: helix, pitch $v\\cos\\theta\\,T$.\n3. Velocity selector $v = E/B$; cyclotron $f = qB/2\\pi m$, $K_{\\max} = q^2B^2R^2/2m$.\n4. Biot–Savart: segment $\\frac{\\mu_0 I}{4\\pi d}(\\sin\\alpha + \\sin\\beta)$, loop centre $\\frac{\\mu_0 I}{2R}$, arc $\\frac{\\mu_0 I\\theta}{4\\pi R}$.\n5. Ampère $\\oint\\vec B\\cdot d\\vec l = \\mu_0 I_{\\text{enc}}$: wire $\\frac{\\mu_0 I}{2\\pi r}$, solenoid $\\mu_0 nI$, toroid $\\frac{\\mu_0 NI}{2\\pi r}$.\n6. $\\vec F = I\\vec l\\times\\vec B$; parallel currents attract with $\\frac{F}{l} = \\frac{\\mu_0 I_1I_2}{2\\pi d}$.\n7. $\\vec m = NI\\vec A$, $\\vec\\tau = \\vec m\\times\\vec B$, $U = -\\vec m\\cdot\\vec B$; shunt $S = \\frac{I_gG}{I - I_g}$, series $R = \\frac{V}{I_g} - G$.\n8. B lines close ($\\oint\\vec B\\cdot d\\vec A = 0$); dia $\\chi < 0$, para $\\chi = C/T$, ferro huge with hysteresis.",
    },
    {
      type: "quiz",
      id: "em4-8-q1",
      variant: "mastery",
      question: "An electron moves along $+x$ in a magnetic field along $+z$. The magnetic force on it points along",
      options: [
        { text: "$-y$", feedback: "That is the force on a positive charge. The electron's force is reversed." },
        { text: "$+z$", feedback: "The magnetic force is perpendicular to $\\vec B$." },
        { text: "$+y$", correct: true, feedback: "$\\hat i\\times\\hat k = -\\hat j$, and the negative charge flips it to $+\\hat j$." },
        { text: "$-x$", feedback: "The magnetic force is perpendicular to $\\vec v$; it cannot slow the electron." },
      ],
    },
    {
      type: "quiz",
      id: "em4-8-q2",
      variant: "mastery",
      question: "A proton moves at $10^6$ m/s at $60^\\circ$ to a 0.1 T field ($m_p = 1.67\\times10^{-27}$ kg). The pitch of its helical path is about",
      options: [
        { text: "57 cm", feedback: "That uses $v\\sin60^\\circ$. The pitch comes from the component **along** $\\vec B$." },
        { text: "66 cm", feedback: "That uses the full speed along the field. Only $v\\cos60^\\circ$ carries the proton along $\\vec B$." },
        { text: "33 cm", correct: true, feedback: "$T = \\dfrac{2\\pi m}{qB} \\approx 6.56\\times10^{-7}$ s; pitch $= v\\cos60^\\circ\\times T = 5\\times10^5\\times6.56\\times10^{-7} \\approx 0.33$ m." },
        { text: "9 cm", feedback: "That is the helix radius $\\dfrac{mv\\sin60^\\circ}{qB}$, not the pitch." },
      ],
    },
    {
      type: "quiz",
      id: "em4-8-q3",
      variant: "mastery",
      question: "In a velocity selector, $E = 2\\times10^4$ V/m and $B = 0.04$ T. The selected ions then enter a region of 0.04 T alone. Singly charged ions of mass $3.2\\times10^{-26}$ kg travel on a circle of radius",
      options: [
        { text: "2.5 m", correct: true, feedback: "$v = E/B = 5\\times10^5$ m/s; $r = \\dfrac{mv}{qB} = \\dfrac{3.2\\times10^{-26}\\times5\\times10^5}{1.6\\times10^{-19}\\times0.04} = 2.5$ m." },
        { text: "0.25 m", feedback: "Check the powers of ten: numerator $1.6\\times10^{-20}$, denominator $6.4\\times10^{-21}$." },
        { text: "1.25 m", feedback: "That uses charge $2e$. The ions are singly charged." },
      ],
    },
    {
      type: "quiz",
      id: "em4-8-q4",
      variant: "mastery",
      question: "A loop is made of a quarter-circle arc of radius 5 cm and the two radii joining its ends to the centre. It carries 10 A. The field at the centre is",
      options: [
        { text: "$1.26\\times10^{-4}$ T", feedback: "That is the full-circle value $\\mu_0 I/2R$." },
        { text: "$7.1\\times10^{-5}$ T", feedback: "That adds contributions from the straight radii, which point at the centre and contribute zero." },
        { text: "$6.3\\times10^{-5}$ T", feedback: "That is a semicircle, $\\mu_0 I/4R$." },
        { text: "$3.1\\times10^{-5}$ T", correct: true, feedback: "The radii give nothing ($d\\vec l \\parallel \\hat r$). The arc: $\\dfrac{\\mu_0 I(\\pi/2)}{4\\pi R} = \\dfrac{\\mu_0 I}{8R} = \\dfrac{4\\pi\\times10^{-7}\\times10}{0.4} \\approx 3.1\\times10^{-5}$ T." },
      ],
    },
    {
      type: "quiz",
      id: "em4-8-q5",
      variant: "mastery",
      question: "A solenoid 50 cm long with 500 turns carries 5 A. The field well inside it is about",
      options: [
        { text: "$3.1\\times10^{-3}$ T", feedback: "That uses $n = 500$ per metre. There are 500 turns in half a metre." },
        { text: "$6.3\\times10^{-3}$ T", correct: true, feedback: "$n = 1000$ m⁻¹; $B = 4\\pi\\times10^{-7}\\times1000\\times5 \\approx 6.3\\times10^{-3}$ T." },
        { text: "$6.3\\times10^{-6}$ T", feedback: "Check $\\mu_0 = 4\\pi\\times10^{-7}$ and $nI = 5000$." },
      ],
    },
    {
      type: "quiz",
      id: "em4-8-q6",
      variant: "mastery",
      question: "Two long parallel wires 4 cm apart carry 5 A and 8 A in opposite directions. The force per metre on each is",
      options: [
        { text: "$2\\times10^{-4}$ N/m, attractive", feedback: "Opposite currents repel." },
        { text: "$2\\times10^{-4}$ N/m on the 8 A wire, less on the 5 A wire", feedback: "Newton's third law: the forces are equal and opposite." },
        { text: "$8\\times10^{-6}$ N/m, repulsive", feedback: "You forgot to divide by $d = 0.04$ m." },
        { text: "$2\\times10^{-4}$ N/m, repulsive", correct: true, feedback: "$\\dfrac{2\\times10^{-7}\\times40}{0.04} = 2\\times10^{-4}$ N/m; opposite currents repel." },
      ],
    },
    {
      type: "quiz",
      id: "em4-8-q7",
      variant: "mastery",
      question: "A galvanometer of resistance 100 Ω gives full-scale deflection at 2 mA. To convert it to a 0–20 V voltmeter you need",
      options: [
        { text: "10 000 Ω in series", feedback: "That is the total; subtract the coil's own 100 Ω." },
        { text: "9900 Ω in series", correct: true, feedback: "$\\dfrac{20}{0.002} - 100 = 10\\,000 - 100 = 9900\\ \\Omega$." },
        { text: "9900 Ω in parallel", feedback: "A voltmeter needs series resistance to limit the current." },
        { text: "0.01 Ω in parallel", feedback: "That is a shunt, which would make an ammeter." },
      ],
    },
    {
      type: "quiz",
      id: "em4-8-q8",
      variant: "mastery",
      question: "A coil with magnetic moment 0.02 A m² is in a 0.5 T field. The work needed to turn it from its stable position to its unstable position is",
      options: [
        { text: "0.01 J", feedback: "That is $mB$, the work to turn through $90^\\circ$ only." },
        { text: "Zero, because both positions are equilibria", feedback: "Both have zero torque, but their energies $\\mp mB$ differ by $2mB$." },
        { text: "0.02 J", correct: true, feedback: "$W = mB(\\cos0^\\circ - \\cos180^\\circ) = 2mB = 0.02$ J." },
        { text: "0.04 J", feedback: "Check: $2\\times0.02\\times0.5 = 0.02$ J." },
      ],
    },
    {
      type: "quiz",
      id: "em4-8-q9",
      variant: "mastery",
      question: "JEE Advanced style. A uniform field of 0.1 T (out of the page) fills the strip $0 \\le x \\le 5.22$ cm. A proton ($r = 10.44$ cm at its speed of $10^6$ m/s in this field) enters at the origin with velocity at $30^\\circ$ to the $+x$ axis, and the field bends it back towards the $+x$ direction. At what angle does it leave the far edge, and how long is it in the field? ($T = 6.56\\times10^{-7}$ s)",
      options: [
        { text: "It leaves moving along $+x$ (deviation $30^\\circ$), after about $5.5\\times10^{-8}$ s.", correct: true, feedback: "The $x$-coordinate is $r(\\sin30^\\circ - \\sin\\phi)$ where $\\phi$ is the current direction. At $x = r/2$, $\\sin\\phi = 0$: it has turned $30^\\circ = \\pi/6$, which takes $T/12 \\approx 5.5\\times10^{-8}$ s." },
        { text: "It leaves at $30^\\circ$ to $+x$ (undeviated) after $6.0\\times10^{-8}$ s.", feedback: "The field acts throughout the strip, so the direction must change." },
        { text: "It turns back and leaves through $x = 0$.", feedback: "It would turn back only if the strip were wider than $r(1 + \\sin30^\\circ) \\approx 15.7$ cm." },
        { text: "It leaves at $30^\\circ$ below $+x$ (deviation $60^\\circ$), after $T/6$.", feedback: "That turn needs a strip of width $r(\\sin30^\\circ + \\sin30^\\circ) = r$. Here the width is only $r/2$." },
      ],
      hint: "Track the velocity direction $\\phi$: the $x$-coordinate is $r(\\sin\\alpha - \\sin\\phi)$ for entry angle $\\alpha$.",
    },
    {
      type: "quiz",
      id: "em4-8-q10",
      variant: "mastery",
      question: "For the proton in the previous question, what is the smallest strip width that stops it from crossing to the far side?",
      options: [
        { text: "10.44 cm", feedback: "That is $r$, correct only for perpendicular entry. Entering at $30^\\circ$, the proton penetrates further." },
        { text: "About 15.7 cm", correct: true, feedback: "It gets furthest in $x$ when moving parallel to the edge ($\\phi = -90^\\circ$): $x_{\\max} = r(1 + \\sin30^\\circ) = 1.5\\times10.44 \\approx 15.7$ cm." },
        { text: "20.9 cm", feedback: "That is the diameter $2r$, which would be needed only for entry along the edge itself." },
        { text: "5.2 cm", feedback: "At that width the proton crosses, as the previous question showed." },
      ],
    },
    {
      type: "quiz",
      id: "em4-8-q11",
      variant: "mastery",
      question: "Which statement about magnetic materials is correct?",
      options: [
        { text: "Diamagnetic susceptibility falls as $1/T$.", feedback: "That is Curie's law for paramagnets. Diamagnetism is essentially temperature-independent." },
        { text: "Soft iron is best for permanent magnets.", feedback: "Soft iron has low coercivity and loses its magnetism easily. Steel suits permanent magnets." },
        { text: "Magnetic field lines begin at N poles and end at S poles.", feedback: "They form closed loops, continuing inside the magnet from S to N." },
        { text: "A ferromagnet heated above its Curie temperature becomes paramagnetic.", correct: true, feedback: "Thermal agitation destroys the domain alignment; what remains is weak paramagnetism." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Steady currents make steady magnetic fields. Chapter 5 asks the reverse question: can a magnetic field make a current? Only if it **changes**, and that one idea powers every generator and transformer on the grid.",
    },
  ]),
};

export const emChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
