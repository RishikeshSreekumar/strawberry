import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Electricity and Magnetism Chapter 3 — Current Electricity.
 * Charges in steady motion: drift at the microscopic level, Ohm's law and
 * resistivity grown from it, combinations and symmetry, cells with internal
 * resistance, Kirchhoff's two laws (charge conservation and V as a height),
 * the null-deflection instruments and electrical power.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "current-and-drift-velocity",
  title: "3.1 · Current and Drift",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Flip a switch and the ceiling light comes on at once, even though the switch is several metres of wire away. You might picture electrons shooting out of the switch and racing to the bulb. They do not. In a typical household wire the electrons creep along at a fraction of a millimetre per second. An electron leaving the switch would take hours to reach the bulb.",
    },
    {
      type: "text",
      content:
        "So what arrives instantly? The **field**. The wire is already packed with free electrons from end to end. Closing the switch sets up an electric field along the whole wire in roughly the time light takes to cover it, and every free electron everywhere starts drifting at once, including the ones already inside the bulb's filament. It is like a garden hose that is already full of water: open the tap and water comes out of the far end immediately, although no drop has travelled the length of the hose.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Electric current",
      content:
        "The current through a surface is the rate at which charge crosses it: $I = \\dfrac{dq}{dt}$. Its SI unit is the ampere, $1\\text{ A} = 1\\text{ C/s}$.\nBy convention the direction of current is the direction positive charge would move. In a metal the carriers are electrons, so they actually drift **against** the current arrow. Current has a direction along the wire but it adds like a scalar at junctions, so it is not a vector.",
    },
    {
      type: "text",
      content:
        "**Why electrons drift instead of racing.** A free electron in copper already moves very fast, around $10^6$ m/s, but randomly, bouncing off vibrating ions. Averaged over the whole crowd, the random velocities cancel and there is no current. Switch on a field $\\vec E$ and each electron gains a small extra velocity $-\\dfrac{e\\vec E}{m}t$ between collisions, then loses that ordered part in the next collision. If the average time between collisions (the *relaxation time*) is $\\tau$, the average extra velocity is",
    },
    { type: "math", latex: "\\vec v_d = -\\frac{e\\vec E}{m}\\,\\tau, \\qquad v_d = \\frac{eE\\tau}{m}" },
    {
      type: "text",
      content:
        "This slow, steady average is the **drift velocity**. It is tiny because $\\tau$ is tiny (about $2.5\\times10^{-14}$ s in copper): the electron is knocked off course long before it can pick up any real speed. The drift per unit field is called the **mobility**, $\\mu = v_d/E = e\\tau/m$.",
    },
    {
      type: "text",
      content:
        "**From drift to current.** Take a wire of cross-section $A$ with $n$ free electrons per cubic metre, all drifting at $v_d$. In a time $\\Delta t$ each electron moves $v_d\\,\\Delta t$, so every electron within that distance behind a chosen cross-section gets through it. Those electrons fill a cylinder of volume $A\\,v_d\\,\\Delta t$:",
    },
    {
      type: "math",
      latex: "\\Delta q = (n\\,A\\,v_d\\,\\Delta t)\\,e \\quad\\Longrightarrow\\quad I = \\frac{\\Delta q}{\\Delta t} = n\\,e\\,A\\,v_d",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Current density and drift",
      content:
        "$I = neAv_d$, where $n$ is the number density of carriers, $e$ the charge on each, $A$ the cross-section and $v_d$ the drift speed.\nThe **current density** is current per unit area, $J = I/A = nev_d$ (in A/m²). Unlike $I$, $\\vec J$ is a vector: it points along the local flow of positive charge.",
    },
    {
      type: "text",
      content:
        "For copper $n \\approx 8.5\\times10^{28}$ m⁻³. In a wire of cross-section 1 mm² = $10^{-6}$ m², the product $neA = 8.5\\times10^{28}\\times1.6\\times10^{-19}\\times10^{-6} = 1.36\\times10^4$ C/m. So $v_d = I/(1.36\\times10^4)$ m/s, which is $I/13.6$ **millimetres per second**. Slide the current below and read off the drift speed.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "x/13.6",
        exprLatex: "v_d = \\frac{I}{neA} = \\frac{I}{13.6}\\ \\text{mm/s}",
        min: 0,
        max: 10,
        step: 0.5,
        initial: 1.5,
        inputLabel: "Current I in a 1 mm² copper wire",
        inputUnit: "A",
        outputLabel: "Drift speed (mm/s)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: even 10 A, enough to run an electric heater, gives a drift of well under a millimetre per second. Doubling the current doubles the drift speed, because $n$, $e$ and $A$ are fixed for the wire. A snail outruns the electrons in your house wiring.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (drift speed).** A copper wire of cross-section 1 mm² carries 1.5 A. Find the drift speed ($n = 8.5\\times10^{28}$ m⁻³).\n\n1. Start from $I = neAv_d$ and solve for $v_d$. *Why this step:* the current is the one quantity you can measure; drift is hidden inside it.\n2. $v_d = \\dfrac{1.5}{8.5\\times10^{28}\\times1.6\\times10^{-19}\\times10^{-6}} = \\dfrac{1.5}{1.36\\times10^{4}}$.\n3. $v_d \\approx 1.1\\times10^{-4}$ m/s $= 0.11$ mm/s.\n\n**Worked example 2 (how long to cross a room).** In the same wire, how long does one electron take to drift 1 m?\n\n1. $t = \\dfrac{1}{1.1\\times10^{-4}} \\approx 9.1\\times10^{3}$ s.\n2. That is about 2.5 hours. *Why this step:* it makes the point of the hook in numbers; the bulb lights in microseconds, so it cannot be waiting for these electrons.\n\n**Worked example 3 (counting electrons).** How many electrons pass a point each second when the current is 1 A?\n\n1. In one second, 1 C passes.\n2. Each electron carries $1.6\\times10^{-19}$ C, so the number is $\\dfrac{1}{1.6\\times10^{-19}} = 6.25\\times10^{18}$.\n3. Huge numbers, tiny speeds: the current is large because $n$ is enormous, not because anything moves fast.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a current that changes).** The current in a wire is $I = 2 + 3t$ amperes, with $t$ in seconds. How much charge passes in the first 2 s?\n\n1. Since $I = dq/dt$, the charge is the area under the $I$–$t$ graph: $q = \\int_0^2 (2 + 3t)\\,dt$. *Why this step:* $q = It$ only works when $I$ is constant; here it grows.\n2. $q = \\big[2t + 1.5t^2\\big]_0^2 = 4 + 6 = 10$ C.\n3. Check with the average: $I$ runs linearly from 2 A to 8 A, average 5 A, times 2 s is 10 C. ✓\n\n**Worked example 5 (a wire that narrows).** A wire's radius drops from $r$ to $r/2$ partway along. Compare the drift speeds in the two parts.\n\n1. The same current flows through both parts. *Why this step:* charge cannot pile up anywhere in a steady state, so what enters the thick part must leave the thin part.\n2. $v_d = I/(neA)$ with the same $I$, $n$ and $e$, so $v_d \\propto 1/A \\propto 1/r^2$.\n3. Halving the radius quarters the area, so the drift in the thin part is **4 times** faster. The current density $J = I/A$ is also 4 times larger there.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"electrons race round the circuit at the speed of light\"",
      content:
        "What travels at nearly the speed of light is the **signal**: the electric field that tells every electron to start drifting. The electrons themselves drift at fractions of a millimetre per second. In an AC circuit at 50 Hz they do not even get anywhere; they jiggle back and forth by far less than a millimetre.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Relaxation time estimate",
      content:
        "Put numbers in $v_d = eE\\tau/m$: with $E = 1$ V/m and $\\tau = 2.5\\times10^{-14}$ s, $v_d = \\dfrac{1.6\\times10^{-19}\\times1\\times2.5\\times10^{-14}}{9.1\\times10^{-31}} \\approx 4.4\\times10^{-3}$ m/s. Doubling the field doubles the drift: that proportionality is Ohm's law in disguise, as the next lesson shows.",
    },
    {
      type: "quiz",
      id: "em3-1-q1",
      variant: "concept",
      question: "Why does a bulb light almost instantly when the switch several metres away is closed?",
      options: [
        { text: "Electrons leave the switch at nearly the speed of light and reach the bulb quickly.", feedback: "Electrons drift at fractions of a mm/s. They would need hours to cover the distance." },
        { text: "The battery stores electrons and releases them all together.", feedback: "A battery does not store extra electrons; it pushes the ones already in the circuit. The circuit stays neutral throughout." },
        {
          text: "The wire is already full of free electrons, and the field that makes them all drift is set up along the whole circuit almost at once.",
          correct: true,
          feedback: "Right. The field (the signal) travels at nearly light speed; the electrons in the filament start drifting as soon as it arrives.",
        },
        { text: "Current flows as positive charges, which are much faster than electrons.", feedback: "Conventional current is just a sign convention. In metals the carriers really are electrons." },
      ],
    },
    {
      type: "quiz",
      id: "em3-1-q2",
      variant: "practice",
      question: "A copper wire of cross-section 2 mm² carries 5 A. Taking $n = 8.5\\times10^{28}$ m⁻³ and $e = 1.6\\times10^{-19}$ C, the drift speed is closest to",
      options: [
        { text: "$1.8\\times10^{-4}$ m/s", correct: true, feedback: "$v_d = \\dfrac{5}{8.5\\times10^{28}\\times1.6\\times10^{-19}\\times2\\times10^{-6}} = \\dfrac{5}{2.72\\times10^4} \\approx 1.8\\times10^{-4}$ m/s." },
        { text: "$3.7\\times10^{-4}$ m/s", feedback: "That uses 1 mm² instead of 2 mm². A thicker wire needs a slower drift for the same current." },
        { text: "$9.2\\times10^{-5}$ m/s", feedback: "Check the arithmetic: $neA = 2.72\\times10^4$ C/m, and $5/(2.72\\times10^4) \\approx 1.8\\times10^{-4}$." },
        { text: "$3\\times10^8$ m/s", feedback: "That is the speed of light, the speed of the signal, not of the electrons." },
      ],
      hint: "$v_d = I/(neA)$ with $A = 2\\times10^{-6}$ m².",
    },
    {
      type: "quiz",
      id: "em3-1-q3",
      variant: "practice",
      question: "A current of 3.2 mA flows in a wire. How many electrons pass a cross-section per second?",
      options: [
        { text: "$5.12\\times10^{-22}$", feedback: "You multiplied by $e$ instead of dividing. The number of electrons must be huge." },
        { text: "$2\\times10^{19}$", feedback: "You used 3.2 A instead of 3.2 mA. Convert milliamperes first." },
        { text: "$6.25\\times10^{18}$", feedback: "That is the count for exactly 1 A, not 3.2 mA." },
        { text: "$2\\times10^{16}$", correct: true, feedback: "$\\dfrac{3.2\\times10^{-3}}{1.6\\times10^{-19}} = 2\\times10^{16}$ per second." },
      ],
    },
    {
      type: "quiz",
      id: "em3-1-q4",
      variant: "concept",
      question: "A wire carries a steady current. Its diameter at section X is twice its diameter at section Y. Which statement is true?",
      options: [
        { text: "The current at X is 4 times the current at Y.", feedback: "In a steady state charge cannot accumulate, so the current is the same at every section of a single wire." },
        { text: "The drift speed at X is half that at Y.", feedback: "The area goes as the diameter squared. Twice the diameter is four times the area." },
        {
          text: "The drift speed at X is one quarter of that at Y.",
          correct: true,
          feedback: "Same $I$, four times the area, so $v_d = I/(neA)$ is four times smaller at X.",
        },
        { text: "The drift speed is the same at both, because it depends only on the material.", feedback: "Drift depends on the local field, which is weaker where the wire is thicker. $v_d = I/(neA)$ shows the $1/A$ dependence." },
      ],
    },
    {
      type: "quiz",
      id: "em3-1-q5",
      variant: "practice",
      question: "The current in a conductor varies as $I = 4t$ (amperes, $t$ in seconds). How much charge flows between $t = 0$ and $t = 3$ s?",
      options: [
        { text: "12 C", feedback: "That is $I(3) \\times 1$ s. You need the area under the $I$–$t$ graph, not the final current." },
        { text: "36 C", feedback: "That uses the final current 12 A for the full 3 s. The current started at 0." },
        { text: "18 C", correct: true, feedback: "$q = \\int_0^3 4t\\,dt = 2t^2\\big|_0^3 = 18$ C. The average current 6 A times 3 s agrees." },
      ],
      hint: "$q = \\int I\\,dt$: the area of a triangle.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "ohms-law-and-resistivity",
  title: "3.2 · Ohm's Law and Resistivity",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "The last lesson ended with a quiet result: the drift speed is proportional to the field, $v_d = eE\\tau/m$. Everything in this lesson follows from that one line. Push harder (more field) and the electrons drift proportionally faster, so the current rises in proportion to the voltage. That proportionality has a famous name.",
    },
    {
      type: "text",
      content:
        "**Derivation.** Substitute the drift speed into the current density:",
    },
    {
      type: "math",
      latex: "J = nev_d = ne\\left(\\frac{eE\\tau}{m}\\right) = \\left(\\frac{ne^2\\tau}{m}\\right)E = \\sigma E",
    },
    {
      type: "text",
      content:
        "The bracket depends only on the material (and its temperature), not on the shape of the wire. It is the **conductivity** $\\sigma$; its reciprocal is the **resistivity** $\\rho = \\dfrac{m}{ne^2\\tau}$. Now zoom out to a whole wire of length $l$ and cross-section $A$ with a potential difference $V$ across it. The field inside is uniform, $E = V/l$, and the current is $I = JA$:",
    },
    {
      type: "math",
      latex: "I = JA = \\frac{E}{\\rho}A = \\frac{V}{\\rho\\,l}A \\quad\\Longrightarrow\\quad V = I\\left(\\frac{\\rho\\,l}{A}\\right) = IR",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Resistance and resistivity",
      content:
        "**Resistance** $R = V/I$, measured in ohms ($1\\ \\Omega = 1$ V/A). For a uniform wire, $R = \\dfrac{\\rho\\,l}{A}$.\n**Resistivity** $\\rho$ (in $\\Omega$ m) is a property of the material alone. Copper: $1.7\\times10^{-8}\\ \\Omega$ m; nichrome: about $1.1\\times10^{-6}\\ \\Omega$ m; glass: around $10^{12}\\ \\Omega$ m.\n**Ohm's law** is the statement that $R$ stays constant as $V$ changes (at fixed temperature). The microscopic form is $\\vec J = \\sigma\\vec E$.",
    },
    {
      type: "text",
      content:
        "The formula $R = \\rho l/A$ matches common sense: a longer wire is a longer obstacle course (more collisions on the way), and a fatter wire is more lanes side by side. Check the relaxation time for copper: $\\tau = \\dfrac{m}{ne^2\\rho} = \\dfrac{9.1\\times10^{-31}}{8.5\\times10^{28}\\times(1.6\\times10^{-19})^2\\times1.7\\times10^{-8}} \\approx 2.5\\times10^{-14}$ s, the number quoted in 3.1.",
    },
    {
      type: "text",
      content:
        "**Temperature.** Heat a metal and its ions vibrate harder, so electrons collide more often: $\\tau$ falls and $\\rho$ rises. Over moderate ranges the rise is close to linear:",
    },
    { type: "math", latex: "R = R_0\\,(1 + \\alpha\\,\\Delta T)" },
    {
      type: "text",
      content:
        "Here $\\alpha$ is the temperature coefficient of resistance, about $4\\times10^{-3}$ per °C for copper. Alloys such as manganin and constantan have tiny $\\alpha$, so they are used for standard resistors. In a semiconductor the story flips: heating frees many more carriers ($n$ rises sharply), which beats the fall in $\\tau$, so $\\rho$ **decreases** and $\\alpha$ is negative.",
    },
    {
      type: "text",
      content:
        "**Stretching a wire.** When you draw a wire out to a new length, its volume $V_{\\text{ol}} = Al$ stays the same, so the area shrinks as the length grows: $A = V_{\\text{ol}}/l$. Then",
    },
    { type: "math", latex: "R = \\frac{\\rho\\,l}{A} = \\frac{\\rho\\,l^2}{V_{\\text{ol}}} \\propto l^2" },
    {
      type: "text",
      content:
        "Stretch to $n$ times the length and the resistance becomes $n^2$ times as large: $n$ from the extra length and another $n$ from the thinner cross-section. Slide the stretch factor for a 4 Ω wire below.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "4*x^2",
        exprLatex: "R = 4\\,n^2\\ \\Omega",
        min: 1,
        max: 4,
        step: 0.5,
        initial: 2,
        inputLabel: "Stretch factor n (new length ÷ old length)",
        outputLabel: "New resistance (Ω)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: doubling the length gives 16 Ω, not 8 Ω, and tripling gives 36 Ω. The resistance climbs as the square because the same metal is being spread both longer and thinner.",
    },
    {
      type: "table",
      headers: ["Colour", "Digit", "Multiplier", "Tolerance band"],
      rows: [
        ["Black", "0", "$10^0$", ""],
        ["Brown", "1", "$10^1$", "±1%"],
        ["Red", "2", "$10^2$", "±2%"],
        ["Orange", "3", "$10^3$", ""],
        ["Yellow", "4", "$10^4$", ""],
        ["Green", "5", "$10^5$", ""],
        ["Blue", "6", "$10^6$", ""],
        ["Violet", "7", "$10^7$", ""],
        ["Grey", "8", "$10^8$", ""],
        ["White", "9", "$10^9$", ""],
        ["Gold", "", "$10^{-1}$", "±5%"],
        ["Silver", "", "$10^{-2}$", "±10%"],
        ["(no band)", "", "", "±20%"],
      ],
    },
    {
      type: "text",
      content:
        "Read a carbon resistor from the end with the bands bunched together: first digit, second digit, multiplier, tolerance. The memory line \"B B ROY of Great Britain has a Very Good Wife\" gives black to white in order.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (resistance of a wire).** A copper wire is 10 m long with cross-section 1 mm². Find $R$ ($\\rho = 1.7\\times10^{-8}\\ \\Omega$ m).\n\n1. Convert the area to SI: $1\\text{ mm}^2 = 10^{-6}$ m². *Why this step:* mm² is the commonest slip in these questions; $1\\text{ mm}^2$ is $(10^{-3})^2$ m².\n2. $R = \\dfrac{\\rho l}{A} = \\dfrac{1.7\\times10^{-8}\\times10}{10^{-6}} = 0.17\\ \\Omega$.\n\n**Worked example 2 (stretching).** A 4 Ω wire is drawn out to twice its length. Find the new resistance.\n\n1. Volume is conserved, so $R \\propto l^2$. *Why this step:* the area is not given, but it is forced by the new length.\n2. $R' = 4 \\times 2^2 = 16\\ \\Omega$.\n\n**Worked example 3 (drawn thinner).** The same kind of wire is drawn until its radius is halved. By what factor does $R$ change?\n\n1. Area goes as $r^2$, so the area becomes $\\tfrac14$ of the original.\n2. Constant volume means the length becomes 4 times as long.\n3. $R = \\rho l/A$ rises by $4 \\times 4 = 16$. *Why this step:* in terms of radius at fixed volume, $R \\propto 1/r^4$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (temperature).** A copper coil has $\\alpha = 4\\times10^{-3}$ °C⁻¹ and resistance $R_0$ at 20 °C. At what temperature has its resistance risen by 10%?\n\n1. $R = R_0(1 + \\alpha\\Delta T)$ with $R/R_0 = 1.10$. *Why this step:* a percentage rise gives the ratio directly; $R_0$ itself is never needed.\n2. $\\alpha\\,\\Delta T = 0.10$, so $\\Delta T = 0.10/0.004 = 25$ °C.\n3. The temperature is $20 + 25 = 45$ °C.\n\n**Worked example 5 (colour code).** Bands: brown, black, red, gold.\n\n1. Digits: brown 1, black 0, giving 10.\n2. Multiplier: red is $10^2$. So $R = 10\\times10^2 = 1000\\ \\Omega = 1$ kΩ.\n3. Gold tolerance: ±5%, so the true value lies between 950 Ω and 1050 Ω.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"stretching a wire to double length doubles its resistance\"",
      content:
        "That would be true only if the area stayed the same, which is impossible when you stretch real metal: the volume is fixed. The wire gets longer **and** thinner, and the two effects multiply. Double length means four times the resistance.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Non-ohmic devices",
      content:
        "$R = V/I$ can always be computed, but Ohm's law says it is **constant**. A filament bulb is not ohmic in practice: as the current grows the filament heats up and $R$ rises, so its $I$–$V$ graph bends towards the $V$ axis. A diode conducts easily one way and barely at all the other way, so its graph is not even symmetric. For these devices the resistance depends on where you are on the graph.",
    },
    {
      type: "quiz",
      id: "em3-2-q1",
      variant: "practice",
      question: "A wire of resistance 10 Ω is stretched uniformly until its length is 3 times the original. Its new resistance is",
      options: [
        { text: "30 Ω", feedback: "That keeps the area fixed. Stretching also thins the wire by a factor of 3." },
        { text: "90 Ω", correct: true, feedback: "At constant volume $R \\propto l^2$, so $R' = 10\\times3^2 = 90\\ \\Omega$." },
        { text: "$10/3\\ \\Omega$", feedback: "A longer, thinner wire has more resistance, not less." },
        { text: "270 Ω", feedback: "That is $R\\propto l^3$. The length contributes one factor of 3 and the area one more: $3^2$, not $3^3$." },
      ],
    },
    {
      type: "quiz",
      id: "em3-2-q2",
      variant: "concept",
      question: "From $\\rho = \\dfrac{m}{ne^2\\tau}$, why does the resistivity of a metal increase with temperature?",
      options: [
        {
          text: "The ions vibrate more, so collisions are more frequent and the relaxation time $\\tau$ falls.",
          correct: true,
          feedback: "Smaller $\\tau$ means less drift per unit field, so $\\rho = m/(ne^2\\tau)$ rises.",
        },
        { text: "The number of free electrons $n$ falls as the metal is heated.", feedback: "In a metal $n$ is essentially fixed by the atoms. The change is in how often electrons collide." },
        { text: "The electron mass increases with temperature.", feedback: "The electron mass does not change with temperature in any way that matters here." },
      ],
    },
    {
      type: "quiz",
      id: "em3-2-q3",
      variant: "practice",
      question: "A platinum resistance thermometer reads 10 Ω at 0 °C. With $\\alpha = 4\\times10^{-3}$ °C⁻¹, its resistance at 100 °C is",
      options: [
        { text: "10.4 Ω", feedback: "That is the rise for 10 °C. For 100 °C, $\\alpha\\Delta T = 0.4$." },
        { text: "14 Ω", correct: true, feedback: "$R = 10(1 + 0.004\\times100) = 10\\times1.4 = 14\\ \\Omega$." },
        { text: "4 Ω", feedback: "That is only the increase, $R_0\\alpha\\Delta T$. Add it to $R_0$." },
      ],
    },
    {
      type: "quiz",
      id: "em3-2-q4",
      variant: "practice",
      question: "A carbon resistor has bands yellow, violet, orange, silver. Its value is",
      options: [
        { text: "$473\\ \\Omega \\pm 10\\%$", feedback: "The third band is a multiplier, not a third digit." },
        { text: "$47\\ \\text{k}\\Omega \\pm 5\\%$", feedback: "Gold is ±5%; silver is ±10%." },
        { text: "$47\\ \\text{k}\\Omega \\pm 10\\%$", correct: true, feedback: "Yellow 4, violet 7, orange $\\times10^3$: $47\\times10^3\\ \\Omega$. Silver is ±10%." },
        { text: "$4.7\\ \\text{k}\\Omega \\pm 10\\%$", feedback: "Orange is $10^3$, not $10^2$. Red would give 4.7 kΩ." },
      ],
    },
    {
      type: "quiz",
      id: "em3-2-q5",
      variant: "practice",
      question: "Two wires of the same material have lengths in the ratio 1 : 2 and diameters in the ratio 2 : 1. The ratio of their resistances $R_1 : R_2$ is",
      options: [
        { text: "1 : 1", feedback: "Length and diameter do not cancel: area goes as the diameter squared." },
        { text: "1 : 4", feedback: "Include the area as well: $R_1/R_2 = (1/2)\\times(1/2)^2$." },
        { text: "1 : 8", correct: true, feedback: "$R \\propto l/d^2$: $\\dfrac{R_1}{R_2} = \\dfrac{1}{2}\\times\\dfrac{1^2}{2^2} = \\dfrac18$." },
        { text: "8 : 1", feedback: "Wire 1 is shorter and fatter, so it must have the smaller resistance." },
      ],
      hint: "$R = \\rho l/A$ and $A = \\pi d^2/4$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "resistors-in-combination",
  title: "3.3 · Series, Parallel and Symmetry",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Real circuits contain many resistors. The first job is to replace a tangle of them by a single equivalent resistor that draws the same current from the same voltage. Two simple patterns do most of the work, and both come straight from the two facts that run through this whole chapter: charge is conserved, and potential is a single-valued height.",
    },
    {
      type: "text",
      content:
        "**Series.** Resistors joined end to end with nothing branching off between them carry the **same current** (charge has nowhere else to go). The potential drops add up, like the heights of a staircase:",
    },
    {
      type: "math",
      latex: "V = IR_1 + IR_2 + IR_3 = I(R_1 + R_2 + R_3) \\quad\\Longrightarrow\\quad R_s = R_1 + R_2 + R_3",
    },
    {
      type: "text",
      content:
        "**Parallel.** Resistors whose two ends are joined to the **same two nodes** all have the same potential difference $V$. The currents through them add up to the total (charge conservation at the node):",
    },
    {
      type: "math",
      latex: "I = \\frac{V}{R_1} + \\frac{V}{R_2} + \\frac{V}{R_3} \\quad\\Longrightarrow\\quad \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Series and parallel",
      content:
        "**Series** (same current): $R_s = \\sum R_i$. The largest resistor takes the largest share of the voltage, $V_i = IR_i$.\n**Parallel** (same voltage): $\\dfrac1{R_p} = \\sum\\dfrac1{R_i}$. $R_p$ is smaller than the smallest branch. For two resistors, $R_p = \\dfrac{R_1R_2}{R_1 + R_2}$ (product over sum), and the current divides inversely: $I_1 = I\\dfrac{R_2}{R_1 + R_2}$.",
    },
    {
      type: "text",
      content:
        "Put a variable resistor in parallel with a fixed 6 Ω one and watch what the combination does. The machine below computes $R_p = \\dfrac{6R}{6 + R}$.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "6*x/(6 + x)",
        exprLatex: "R_p = \\frac{6R}{6 + R}",
        min: 0,
        max: 60,
        step: 1,
        initial: 3,
        inputLabel: "R in parallel with 6 Ω",
        inputUnit: "Ω",
        outputLabel: "Equivalent resistance (Ω)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the answer is always below both 6 Ω and $R$. At $R = 6$ Ω it is exactly 3 Ω (two equal resistors halve). As $R$ grows the combination creeps up towards 6 Ω but never reaches it, and at $R = 0$ the short circuit takes everything and the combination is 0 Ω. Adding a parallel path always makes it easier for current to flow.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Resistors of 2, 3 and 6 Ω.\n\n1. Series: $2 + 3 + 6 = 11\\ \\Omega$.\n2. Parallel: $\\dfrac1{R_p} = \\dfrac12 + \\dfrac13 + \\dfrac16 = \\dfrac{3 + 2 + 1}{6} = 1$, so $R_p = 1\\ \\Omega$. *Why this step:* use a common denominator; adding the reciprocals and forgetting to flip at the end is the usual slip.\n\n**Worked example 2 (mixed network).** A 4 Ω resistor is in series with a parallel pair of 6 Ω and 3 Ω, across an ideal 12 V battery. Find every current.\n\n1. The pair: $\\dfrac{6\\times3}{6 + 3} = 2\\ \\Omega$. Total: $4 + 2 = 6\\ \\Omega$.\n2. Battery current: $I = 12/6 = 2$ A, all of it through the 4 Ω.\n3. Voltage across the pair: $2\\times2 = 4$ V. *Why this step:* both parallel resistors share this voltage, which is the key to splitting the current.\n4. $I_6 = 4/6 = \\tfrac23$ A and $I_3 = 4/3$ A. Check: $\\tfrac23 + \\tfrac43 = 2$ A. ✓ The smaller resistor takes the larger current.",
    },
    {
      type: "text",
      content:
        "**Symmetry: points at the same potential.** If two points in a network are guaranteed by symmetry to be at the same potential, no current flows in a resistor joining them. You may remove that resistor, or join the two points with a wire, without changing anything. This is the tool that cracks networks which are neither series nor parallel.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (cube, body diagonal).** Twelve equal resistors $R$ form the edges of a cube. Find the resistance between opposite corners A and G.\n\n1. Send current $I$ in at A. The three edges from A are identical by symmetry, so each carries $I/3$. *Why this step:* the cube looks the same from A along each of its three edges, so nothing can prefer one.\n2. Each of those three corners passes its $I/3$ on through two edges, identical again: $I/6$ in each of the six middle edges.\n3. The six middle edges feed three corners next to G, each of which sends $I/3$ into G.\n4. Walk any path A → G: the potential drop is $\\dfrac{I}{3}R + \\dfrac{I}{6}R + \\dfrac{I}{3}R = \\dfrac{5}{6}IR$.\n5. So $R_{AG} = \\dfrac{5R}{6}$. (By similar symmetry arguments, one edge gives $\\tfrac{7R}{12}$ and a face diagonal gives $\\tfrac{3R}{4}$.)",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (infinite ladder).** A ladder has a series resistor $R$ followed by a shunt resistor $R$, repeated for ever. Find the input resistance $x$.\n\n1. Chop off the first rung. What remains is again an infinite ladder, so it also has resistance $x$. *Why this step:* self-similarity turns an infinite sum into one equation.\n2. So the whole ladder is $R$ in series with ($R$ in parallel with $x$):",
    },
    { type: "math", latex: "x = R + \\frac{Rx}{R + x} \\;\\Rightarrow\\; x^2 - Rx - R^2 = 0 \\;\\Rightarrow\\; x = \\frac{1 + \\sqrt5}{2}R \\approx 1.62R" },
    {
      type: "text",
      content:
        "3. Keep the positive root: a resistance cannot be negative. The golden ratio turns up in a circuit.\n\n**Worked example 5 (a triangle).** Three resistors $R$ form a triangle. Find the resistance between two corners.\n\n1. Between corners A and B there are two routes: the direct side ($R$), and the path through the third corner ($R + R = 2R$). *Why this step:* each route is a series chain; the two routes share both end nodes, so they are in parallel.\n2. $R_{AB} = \\dfrac{R\\cdot2R}{R + 2R} = \\dfrac{2R}{3}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"two resistors drawn side by side are always in parallel\"",
      content:
        "Parallel is about **nodes**, not about how the drawing looks. Two resistors are in parallel only if each end of one is joined (by wire alone) to the corresponding end of the other. Two resistors drawn one above the other but connected at only one end, or with a third element in between, are not in parallel. When in doubt, label every node with a letter, merge points joined by bare wire, and redraw.",
    },
    {
      type: "quiz",
      id: "em3-3-q1",
      variant: "practice",
      question: "Three 6 Ω resistors are connected in parallel. The equivalent resistance is",
      options: [
        { text: "2 Ω", correct: true, feedback: "$\\dfrac1{R_p} = \\dfrac36$, so $R_p = 2\\ \\Omega$. $n$ equal resistors in parallel give $R/n$." },
        { text: "18 Ω", feedback: "That is the series value." },
        { text: "$\\tfrac12\\ \\Omega$", feedback: "That is $1/R_p$. Remember to flip the sum of reciprocals." },
        { text: "3 Ω", feedback: "That is two 6 Ω in parallel. A third path lowers it further." },
      ],
    },
    {
      type: "quiz",
      id: "em3-3-q2",
      variant: "practice",
      question: "A 12 Ω and a 4 Ω resistor are in parallel, and a total current of 4 A enters the pair. The current through the 12 Ω resistor is",
      options: [
        { text: "3 A", feedback: "That is the share of the 4 Ω resistor. The larger resistor takes the smaller current." },
        { text: "1 A", correct: true, feedback: "$R_p = 3\\ \\Omega$, $V = 12$ V, $I_{12} = 12/12 = 1$ A (and $I_4 = 3$ A)." },
        { text: "2 A", feedback: "Equal sharing needs equal resistors." },
        { text: "4 A", feedback: "The total current splits between both branches." },
      ],
    },
    {
      type: "quiz",
      id: "em3-3-q3",
      variant: "practice",
      question: "Twelve resistors of 12 Ω each form the edges of a cube. The resistance between two diagonally opposite corners of the cube (the body diagonal) is",
      options: [
        { text: "9 Ω", feedback: "That is the face-diagonal value $\\tfrac34 R$." },
        { text: "7 Ω", feedback: "That is the single-edge value $\\tfrac{7}{12}R$." },
        { text: "36 Ω", feedback: "That is three edges in series, ignoring the parallel routes." },
        { text: "10 Ω", correct: true, feedback: "$\\tfrac56\\times12 = 10\\ \\Omega$: currents $I/3$, $I/6$, $I/3$ along any path." },
      ],
    },
    {
      type: "quiz",
      id: "em3-3-q4",
      variant: "concept",
      question: "In a network, symmetry shows that points P and Q are at the same potential. A resistor joins P and Q. What happens if you remove it?",
      options: [
        {
          text: "Nothing changes: with no potential difference across it, the resistor carried no current.",
          correct: true,
          feedback: "$I = (V_P - V_Q)/R = 0$. You could equally replace it by a wire.",
        },
        { text: "The equivalent resistance rises, because a path has been removed.", feedback: "The path carried no current, so removing it changes nothing." },
        { text: "The equivalent resistance falls.", feedback: "Removing a resistor can never lower the equivalent resistance, and here it has no effect at all." },
      ],
    },
    {
      type: "quiz",
      id: "em3-3-q5",
      variant: "practice",
      question: "An infinite ladder has series resistors of 2 Ω and shunt resistors of 2 Ω. Its input resistance is",
      options: [
        { text: "Infinite, since there are infinitely many resistors", feedback: "Each new rung is in parallel with a shunt, so the extra resistance it adds shrinks rapidly. The total converges." },
        { text: "4 Ω", feedback: "That is just the first series and shunt resistors added. The rest of the ladder is in parallel with the first shunt." },
        { text: "$(1 + \\sqrt5)$ Ω $\\approx 3.24$ Ω", correct: true, feedback: "$x = \\tfrac{1 + \\sqrt5}{2}\\times2 = 1 + \\sqrt5\\ \\Omega$." },
        { text: "$(\\sqrt5 - 1)$ Ω", feedback: "That is the other root in magnitude. Check: it is less than the 2 Ω series resistor alone, which is impossible." },
      ],
      hint: "Chopping off the first rung leaves the same ladder: $x = 2 + \\dfrac{2x}{2 + x}$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "cells-emf-and-internal-resistance",
  title: "3.4 · Cells, EMF and Internal Resistance",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Start a car with the headlights on and watch them dim for a moment as the starter motor turns. The battery has not changed, and nothing touched the headlight circuit. The dimming comes from inside the battery: it has resistance of its own, and when the starter draws a huge current, a lot of the battery's voltage is lost before it ever reaches the terminals.",
    },
    {
      type: "text",
      content:
        "**What a cell does.** Inside a cell, chemistry pushes positive charge from the − terminal to the + terminal, uphill against the electric field. The work done per unit charge by this non-electrostatic push is the cell's **electromotive force** (emf) $\\mathcal E$. Despite the name it is not a force; it is energy per coulomb, measured in volts.",
    },
    {
      type: "text",
      content:
        "The charge also has to struggle through the electrolyte, which has an **internal resistance** $r$. With a current $I$ flowing out of the + terminal through an external resistor $R$, go round the loop and add up the potential changes (they must total zero because potential is a height):",
    },
    {
      type: "math",
      latex: "\\mathcal E - Ir - IR = 0 \\quad\\Longrightarrow\\quad I = \\frac{\\mathcal E}{R + r}, \\qquad V_{\\text{terminal}} = IR = \\mathcal E - Ir",
    },
    {
      type: "callout",
      variant: "definition",
      title: "EMF and terminal voltage",
      content:
        "**EMF** $\\mathcal E$: work done by the cell per unit charge carried round the circuit.\n**Terminal voltage** when the cell supplies current $I$ (discharging): $V = \\mathcal E - Ir$.\nWhen a charger forces current **into** the + terminal (charging): $V = \\mathcal E + Ir$.\nOpen circuit ($I = 0$): $V = \\mathcal E$. Short circuit ($R = 0$): $I = \\mathcal E/r$, the largest current the cell can give.",
    },
    {
      type: "text",
      content:
        "**Combining cells.** In series, emfs add (with signs) and so do internal resistances: $n$ identical cells give $n\\mathcal E$ and $nr$. A cell connected the wrong way round subtracts its emf but still adds its resistance. In parallel, treat the combination as one equivalent cell. Using the node method of 3.5 on two cells ($\\mathcal E_1, r_1$) and ($\\mathcal E_2, r_2$) joined + to + and − to −:",
    },
    {
      type: "math",
      latex: "\\mathcal E_{\\text{eq}} = \\frac{\\mathcal E_1/r_1 + \\mathcal E_2/r_2}{1/r_1 + 1/r_2}, \\qquad \\frac{1}{r_{\\text{eq}}} = \\frac{1}{r_1} + \\frac{1}{r_2}",
    },
    {
      type: "text",
      content:
        "The equivalent emf is a weighted average, weighted towards the cell with the smaller internal resistance. Identical cells in parallel keep the emf $\\mathcal E$ but divide the internal resistance: $n$ of them give $r/n$.",
    },
    {
      type: "text",
      content:
        "**Maximum power transfer.** How much power reaches the load $R$? With $I = \\mathcal E/(R + r)$,",
    },
    {
      type: "math",
      latex: "P = I^2R = \\frac{\\mathcal E^2R}{(R + r)^2}, \\qquad \\frac{dP}{dR} = \\mathcal E^2\\,\\frac{(R + r) - 2R}{(R + r)^3} = 0 \\;\\Rightarrow\\; R = r",
    },
    {
      type: "text",
      content:
        "The load receives the most power when its resistance **matches** the internal resistance, and then $P_{\\max} = \\dfrac{\\mathcal E^2}{4r}$. Drag the point along the curve below for a cell with $\\mathcal E = 10$ V and $r = 2$ Ω, where $P = \\dfrac{100R}{(R + 2)^2}$ W.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "100*x/(x + 2)^2",
        exprLatex: "P = \\frac{100R}{(R + 2)^2}",
        window: { xmin: 0, xmax: 12, ymin: 0, ymax: 15 },
        initial: 2,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the power is zero at $R = 0$ (all the voltage is lost inside the cell) and falls off slowly for large $R$ (too little current). The peak sits exactly at $R = 2$ Ω with $P = 12.5$ W $= 10^2/(4\\times2)$. At that peak the cell wastes as much power in $r$ as it delivers, so the efficiency is only 50%. Power companies deliberately do not operate at this point; audio amplifiers and antennas do.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (emf and $r$ from two readings).** A cell reads 8 V across its terminals when connected to a 4 Ω resistor, and 9 V when connected to a 9 Ω resistor. Find $\\mathcal E$ and $r$.\n\n1. Currents: $I_1 = 8/4 = 2$ A and $I_2 = 9/9 = 1$ A. *Why this step:* the terminal voltage is the voltage across $R$, so Ohm's law on $R$ gives $I$.\n2. Write $V = \\mathcal E - Ir$ twice: $8 = \\mathcal E - 2r$ and $9 = \\mathcal E - r$.\n3. Subtract: $1 = r$, so $r = 1\\ \\Omega$ and $\\mathcal E = 10$ V.\n\n**Worked example 2 (cells in parallel).** Cells of 2 V and 1 V, each with $r = 1\\ \\Omega$, are joined in parallel (+ to +) across a 1 Ω resistor. Find the current in the resistor.\n\n1. $\\mathcal E_{\\text{eq}} = \\dfrac{2/1 + 1/1}{1/1 + 1/1} = 1.5$ V and $r_{\\text{eq}} = 0.5\\ \\Omega$.\n2. $I = \\dfrac{1.5}{1 + 0.5} = 1$ A. *Why this step:* once the pair is replaced by one equivalent cell, the circuit is a single loop.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (best grouping).** Twelve cells, each of emf 1.5 V and internal resistance 0.5 Ω, are to drive a 1.5 Ω resistor. They are arranged in $m$ parallel rows of $n$ cells in series ($mn = 12$). Find the arrangement giving the largest current.\n\n1. Each row has emf $1.5n$ and resistance $0.5n$; $m$ rows in parallel give emf $1.5n$ and resistance $0.5n/m$.\n2. $I = \\dfrac{1.5n}{1.5 + 0.5n/m}$. This is largest when the internal resistance equals the external one: $0.5n/m = 1.5$, so $n = 3m$. *Why this step:* this is maximum power transfer again, since $I^2R$ is largest when $I$ is.\n3. With $mn = 12$: $3m^2 = 12$, so $m = 2$ and $n = 6$.\n4. $I = \\dfrac{9}{1.5 + 1.5} = 3$ A. (All 12 in series would give $18/7.5 = 2.4$ A; all in parallel would give $1.5/1.54 \\approx 0.97$ A.)\n\n**Worked example 4 (charging).** A 12 V battery with internal resistance 0.5 Ω is charged with a current of 2 A. What does a voltmeter across its terminals read?\n\n1. Current is forced into the + terminal, so the charger must overcome both the emf and the internal drop.\n2. $V = \\mathcal E + Ir = 12 + 2\\times0.5 = 13$ V.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the voltmeter across a cell always reads its EMF\"",
      content:
        "It reads the **terminal voltage** $\\mathcal E - Ir$. That equals $\\mathcal E$ only when no current flows through the cell (and an ideal voltmeter draws none). While the cell drives a circuit its terminal voltage is lower; while it is being charged it is higher. The headlights dimming during a car start is $Ir$ made visible.",
    },
    {
      type: "quiz",
      id: "em3-4-q1",
      variant: "practice",
      question: "A cell of emf 12 V and internal resistance 1 Ω is connected to a 5 Ω resistor. The terminal voltage is",
      options: [
        { text: "12 V", feedback: "That is the open-circuit value. With current flowing, $Ir$ is lost inside the cell." },
        { text: "2 V", feedback: "That is the current in amperes, or the internal drop. The terminal voltage is what is left." },
        { text: "10 V", correct: true, feedback: "$I = 12/6 = 2$ A and $V = 12 - 2\\times1 = 10$ V (equivalently $IR = 2\\times5$)." },
        { text: "14 V", feedback: "$\\mathcal E + Ir$ applies while charging. Here the cell is supplying current." },
      ],
    },
    {
      type: "quiz",
      id: "em3-4-q2",
      variant: "practice",
      question: "For a cell of emf 6 V and internal resistance 3 Ω, the maximum power that can be delivered to an external resistor is",
      options: [
        { text: "3 W", correct: true, feedback: "At $R = r = 3\\ \\Omega$, $I = 1$ A and $P = I^2R = 3$ W, which is $\\mathcal E^2/4r$." },
        { text: "12 W", feedback: "That is $\\mathcal E^2/r$, the total power at short circuit, all dissipated inside the cell." },
        { text: "6 W", feedback: "That is the total power at the matched point, half of which is wasted in $r$." },
        { text: "1.5 W", feedback: "Check: $\\mathcal E^2/(4r) = 36/12 = 3$ W." },
      ],
    },
    {
      type: "quiz",
      id: "em3-4-q3",
      variant: "concept",
      question: "Four identical cells are connected in series, but one of them is accidentally reversed. Each cell has emf $\\mathcal E$ and internal resistance $r$. The combination behaves as a single cell of",
      options: [
        { text: "emf $3\\mathcal E$, resistance $3r$", feedback: "The reversed cell does not drop out; it opposes one of the others." },
        { text: "emf $2\\mathcal E$, resistance $2r$", feedback: "Internal resistances add regardless of orientation; charge passes through all four." },
        { text: "emf $4\\mathcal E$, resistance $4r$", feedback: "That ignores the reversal. A reversed cell subtracts its emf." },
        { text: "emf $2\\mathcal E$, resistance $4r$", correct: true, feedback: "Three forward minus one back gives $2\\mathcal E$. The reversed cell's resistance still adds, so $4r$." },
      ],
    },
    {
      type: "quiz",
      id: "em3-4-q4",
      variant: "practice",
      question: "When a battery is connected to a 2 Ω resistor the current is 3 A; with a 5 Ω resistor the current is 1.5 A. The emf and internal resistance are",
      options: [
        { text: "6 V, 0 Ω", feedback: "An ideal 6 V source would give 1.2 A through 5 Ω, not 1.5 A." },
        { text: "9 V, 1 Ω", correct: true, feedback: "$\\mathcal E = 3(2 + r) = 1.5(5 + r)$ gives $6 + 3r = 7.5 + 1.5r$, so $r = 1\\ \\Omega$ and $\\mathcal E = 9$ V." },
        { text: "7.5 V, 0.5 Ω", feedback: "Check: $7.5/(2.5) = 3$ A, but $7.5/(5.5) \\approx 1.36$ A, not 1.5 A." },
        { text: "9 V, 2 Ω", feedback: "Check: $9/(2 + 2) = 2.25$ A, not 3 A." },
      ],
      hint: "Write $\\mathcal E = I(R + r)$ for both readings and solve simultaneously.",
    },
    {
      type: "quiz",
      id: "em3-4-q5",
      variant: "practice",
      question: "Two identical cells, each of emf 1.5 V and internal resistance 1 Ω, are joined in parallel and connected to a 2.5 Ω resistor. The current in the resistor is",
      options: [
        { text: "1 A", feedback: "That uses $\\mathcal E = 3$ V, the series value. In parallel the emf stays 1.5 V." },
        { text: "0.43 A", feedback: "That uses $r = 1\\ \\Omega$. Two in parallel halve the internal resistance." },
        { text: "0.67 A", feedback: "Check the total resistance: $2.5 + 0.5 = 3\\ \\Omega$." },
        { text: "0.5 A", correct: true, feedback: "Parallel identical cells: $\\mathcal E = 1.5$ V, $r = 0.5\\ \\Omega$. $I = 1.5/(2.5 + 0.5) = 0.5$ A." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "kirchhoffs-laws",
  title: "3.5 · Kirchhoff's Laws",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Some circuits refuse to be reduced to series and parallel. Put two cells in different branches that share a resistor, and there is no longer a single \"equivalent resistance\" to find: each cell pushes on the others' currents. For these networks you need two laws, and both are old friends in disguise.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Kirchhoff's two laws",
      content:
        "**Junction law (KCL):** at any junction, the total current flowing in equals the total flowing out, $\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$. This is charge conservation: in a steady state charge cannot pile up at a point.\n**Loop law (KVL):** around any closed loop, the potential changes add to zero, $\\sum\\Delta V = 0$. This says potential is single-valued: walk round a loop and you are back at the same height you started from.",
    },
    {
      type: "text",
      content:
        "The loop law is the mountain-path picture from Chapter 1. Potential is a height; resistors are downhill slopes (in the direction of current) and cells are lifts. Whatever route you take around a loop, you return to your starting altitude, so the ups and downs cancel exactly.",
    },
    {
      type: "table",
      headers: ["Element crossed", "Direction of travel", "Change in potential"],
      rows: [
        ["Resistor $R$", "along the current $I$", "$-IR$ (drop)"],
        ["Resistor $R$", "against the current $I$", "$+IR$ (rise)"],
        ["Cell $\\mathcal E$", "from − terminal to +", "$+\\mathcal E$"],
        ["Cell $\\mathcal E$", "from + terminal to −", "$-\\mathcal E$"],
      ],
    },
    {
      type: "text",
      content:
        "If you guess a current's direction wrongly, nothing breaks: the algebra returns a negative value, which just means the current flows the other way. Two methods use these rules.\n\n**Loop method.** Give each branch an unknown current, apply KCL at the junctions to cut down the unknowns, then write KVL for enough independent loops.\n\n**Node-potential method (usually faster for JEE).** Pick one node as 0 V. Give every other node an unknown potential. Express each branch current as (potential difference plus any emfs) divided by the branch resistance, and apply KCL at each unknown node. KVL is automatically satisfied, because you worked with potentials from the start.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (two cells, three resistors).** Nodes A (top) and B (bottom) are joined by three branches: a 10 V cell (+ terminal towards A) with 2 Ω; a 4 Ω resistor alone; and a 4 V cell (+ towards A) with 2 Ω. Find every current.\n\n1. Take $V_B = 0$ and let $V_A = V$. *Why this step:* one unknown instead of three branch currents.\n2. Current flowing **out of** A through each branch: left $\\dfrac{V - 10}{2}$, middle $\\dfrac{V}{4}$, right $\\dfrac{V - 4}{2}$. *Why this step:* going from A down the left branch, you drop through the 2 Ω and then fall 10 V through the cell from + to −; the branch current is (potential available across the resistor)/R.\n3. KCL at A (total out is zero):",
    },
    { type: "math", latex: "\\frac{V - 10}{2} + \\frac{V}{4} + \\frac{V - 4}{2} = 0 \\;\\Rightarrow\\; 2V - 20 + V + 2V - 8 = 0 \\;\\Rightarrow\\; V = 5.6\\text{ V}" },
    {
      type: "text",
      content:
        "4. Currents: through the 10 V cell, $\\dfrac{10 - 5.6}{2} = 2.2$ A up into A; through the 4 Ω, $\\dfrac{5.6}{4} = 1.4$ A down; through the 4 V branch, $\\dfrac{5.6 - 4}{2} = 0.8$ A **down**, so the 4 V cell is being charged.\n5. Check KCL: $2.2 = 1.4 + 0.8$. ✓ Check KVL on the left loop: $10 - 2(2.2) - 4(1.4) = 10 - 4.4 - 5.6 = 0$. ✓",
    },
    {
      type: "text",
      content:
        "The node method makes a general point visible: the node potential is a weighted average of the branch emfs, $V_A = \\dfrac{\\sum \\mathcal E_i/R_i}{\\sum 1/R_i}$. Try it on a variant: branch 1 has a variable cell $\\mathcal E_1$ with 2 Ω, branch 2 has a 6 V cell with 2 Ω, branch 3 is a 2 Ω resistor. Then $V_A = \\dfrac{\\mathcal E_1/2 + 6/2}{3/2} = \\dfrac{\\mathcal E_1 + 6}{3}$.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "(x + 6)/3",
        exprLatex: "V_A = \\frac{\\mathcal E_1 + 6}{3}",
        min: 0,
        max: 18,
        step: 1,
        initial: 6,
        inputLabel: "Variable emf ℰ₁",
        inputUnit: "V",
        outputLabel: "Node potential V_A (V)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the 6 V cell's branch carries current $(6 - V_A)/2$. For $\\mathcal E_1 < 12$ V, $V_A < 6$ V and the 6 V cell discharges. At exactly $\\mathcal E_1 = 12$ V, $V_A = 6$ V and the 6 V cell carries **no current at all**. Push $\\mathcal E_1$ above 12 V and $V_A$ exceeds 6 V, so current is driven backwards into the 6 V cell: it is being charged. One slider, and the direction of a current you might have guessed flips.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (potentials round a single loop).** A 12 V cell (no internal resistance) drives current round a loop: from its + terminal through a 2 Ω resistor to point B, then into a 4 V cell at its + terminal, out of its − terminal to point C, then through a 6 Ω resistor back to the 12 V cell's − terminal D. Find $V_B - V_D$.\n\n1. Net emf: the 4 V cell opposes the 12 V one, so $I = \\dfrac{12 - 4}{2 + 6} = 1$ A. *Why this step:* a single loop needs only KVL once.\n2. Take $V_D = 0$. Walk the loop: $V_A = 12$ V (+ terminal), $V_B = 12 - 1\\times2 = 10$ V, $V_C = 10 - 4 = 6$ V (through the 4 V cell from + to −), and back to $6 - 1\\times6 = 0$ V at D. ✓\n3. $V_B - V_D = 10$ V.\n\n**Worked example 3 (a branch rule).** In a branch, current 1 A flows from A through a 2 Ω resistor and then through a 3 V cell entered at its − terminal, reaching B. Find $V_A - V_B$.\n\n1. Through the resistor with the current: drop 2 V. Through the cell from − to +: rise 3 V.\n2. $V_B = V_A - 2 + 3$, so $V_A - V_B = -1$ V. B is 1 V **higher** than A even though current flows from A to B through this branch. *Why this step:* current flows from high to low potential through a resistor, not through a whole branch containing a cell.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (capacitor in a steady-state network).** An ideal 12 V battery drives current through 4 Ω and 2 Ω resistors in series. A branch made of a 10 Ω resistor in series with a 5 μF capacitor is connected across the 4 Ω resistor. Find the charge on the capacitor once everything has settled.\n\n1. In steady state no current flows into a capacitor, so the 10 Ω branch carries nothing. *Why this step:* a fully charged capacitor behaves as a break in the circuit (2.6).\n2. The main current is $I = 12/(4 + 2) = 2$ A, and the voltage across the 4 Ω resistor is 8 V.\n3. With zero current, the 10 Ω resistor has no drop, so the capacitor sees the full 8 V: $Q = CV = 5\\times8 = 40\\ \\mu$C.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"current is used up as it passes through resistors\"",
      content:
        "What is used up is **energy**, not current. The same current enters and leaves every resistor (KCL). What falls is the potential: each coulomb arrives with more energy per charge than it leaves with, and the difference becomes heat. An ammeter placed before or after a bulb reads the same value.",
    },
    {
      type: "quiz",
      id: "em3-5-q1",
      variant: "concept",
      question: "Kirchhoff's junction law is a statement of",
      options: [
        { text: "conservation of energy", feedback: "Energy conservation is behind the loop law (potential as energy per coulomb). The junction law is about charge." },
        { text: "conservation of charge", correct: true, feedback: "Charge cannot accumulate at a junction in a steady state, so what flows in flows out." },
        { text: "Ohm's law", feedback: "The junction law holds for any elements, ohmic or not." },
        { text: "Newton's third law", feedback: "It has nothing to do with forces. It counts charge in and out." },
      ],
    },
    {
      type: "quiz",
      id: "em3-5-q2",
      variant: "practice",
      question: "At a junction, currents of 3 A and 2 A flow in along two wires and 4 A flows out along a third. What happens in the fourth wire?",
      options: [
        { text: "1 A flows in", feedback: "That would make 6 A in and only 4 A out." },
        { text: "9 A flows out", feedback: "That adds all three regardless of direction. Balance in against out." },
        { text: "1 A flows out", correct: true, feedback: "In: 5 A. Out so far: 4 A. The fourth wire must carry 1 A out." },
        { text: "No current", feedback: "Then 5 A in would meet only 4 A out, and charge would pile up." },
      ],
    },
    {
      type: "quiz",
      id: "em3-5-q3",
      variant: "practice",
      question: "In a branch, a current of 2 A flows from A through a 3 Ω resistor and then through a 5 V cell entered at its − terminal, arriving at B. $V_A - V_B$ equals",
      options: [
        { text: "$+1$ V", correct: true, feedback: "$V_B = V_A - 6 + 5$, so $V_A - V_B = 1$ V." },
        { text: "$+11$ V", feedback: "You treated the cell as a drop. Crossing from − to + is a rise." },
        { text: "$-1$ V", feedback: "Sign slip: $V_B = V_A - 1$, so $V_A - V_B = +1$ V." },
        { text: "$+6$ V", feedback: "That includes only the resistor. The cell adds 5 V on the way to B." },
      ],
    },
    {
      type: "quiz",
      id: "em3-5-q4",
      variant: "practice",
      question: "Nodes A and B (at 0 V) are joined by three branches: a 6 V cell (+ towards A) with 1 Ω; a 3 V cell (+ towards A) with 1 Ω; and a 1 Ω resistor. The current through the 3 V cell is",
      options: [
        { text: "3 A", feedback: "That is the current in the plain 1 Ω resistor." },
        { text: "0 A", correct: true, feedback: "$V_A = \\dfrac{6 + 3 + 0}{3} = 3$ V, so the 3 V branch has $(3 - 3)/1 = 0$ A." },
        { text: "1.5 A", feedback: "Find $V_A$ first with the node method: $V_A = (6/1 + 3/1)/(3/1) = 3$ V." },
        { text: "6 A", feedback: "That is the short-circuit current of the 6 V cell, not what flows here." },
      ],
      hint: "$V_A = \\dfrac{\\sum\\mathcal E_i/R_i}{\\sum 1/R_i}$.",
    },
    {
      type: "quiz",
      id: "em3-5-q5",
      variant: "practice",
      question: "An ideal 9 V battery drives current through 1 Ω and 2 Ω resistors in series. A 4 μF capacitor is connected across the 2 Ω resistor. In steady state its charge is",
      options: [
        { text: "36 μC", feedback: "That is $C\\times9$ V. The capacitor sees only the voltage across the 2 Ω resistor." },
        { text: "12 μC", feedback: "That is the charge for the 1 Ω resistor's 3 V." },
        { text: "0", feedback: "The capacitor carries no current in steady state, but it still holds charge at the voltage across it." },
        { text: "24 μC", correct: true, feedback: "$I = 3$ A, $V_{2\\Omega} = 6$ V, $Q = 4\\times6 = 24\\ \\mu$C." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "wheatstone-and-meter-bridge",
  title: "3.6 · Wheatstone Bridge and Meter Bridge",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "How do you measure an unknown resistance precisely? An ammeter and voltmeter each disturb the circuit a little and each has its own error. The Wheatstone bridge avoids both: it compares the unknown with known resistors and looks only for **zero** current in a galvanometer. A zero reading is easy to judge, and at zero current the meter itself has no effect.",
    },
    {
      type: "text",
      content:
        "**The bridge.** Four resistors form a diamond A → B → C and A → D → C: $P$ from A to B, $Q$ from B to C, $R$ from A to D and $S$ from D to C. A cell is connected across A and C, and a galvanometer across B and D. Current splits at A: $I_1$ along the top (through $P$ then $Q$) and $I_2$ along the bottom (through $R$ then $S$).",
    },
    {
      type: "text",
      content:
        "The galvanometer reads zero when B and D are at the **same potential**. Then the drop from A to B equals the drop from A to D, and the drop from B to C equals the drop from D to C. With no current through the galvanometer, $P$ and $Q$ carry the same $I_1$, and $R$ and $S$ carry the same $I_2$:",
    },
    {
      type: "math",
      latex: "I_1P = I_2R \\quad\\text{and}\\quad I_1Q = I_2S \\quad\\Longrightarrow\\quad \\frac{P}{Q} = \\frac{R}{S}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Balanced Wheatstone bridge",
      content:
        "The bridge is **balanced** (no current through the galvanometer) when $\\dfrac{P}{Q} = \\dfrac{R}{S}$.\nThe balance condition does not involve the cell's emf or internal resistance, or the galvanometer's resistance. In any network containing a balanced bridge, the middle branch can be removed (or replaced by a wire) without changing anything.",
    },
    {
      type: "text",
      content:
        "**The meter bridge** is a Wheatstone bridge in which $Q$ and $S$ (or $P$ and $R$) are replaced by the two parts of a uniform 100 cm wire. A jockey slides along the wire. Put the unknown $X$ in the left gap and a known resistance $R$ in the right gap. If balance occurs at length $l$ from the left end, the two segments have resistances proportional to $l$ and $100 - l$ (uniform wire, $R \\propto$ length), so",
    },
    { type: "math", latex: "\\frac{X}{R} = \\frac{l}{100 - l} \\quad\\Longrightarrow\\quad X = R\\,\\frac{l}{100 - l}" },
    {
      type: "text",
      content:
        "With $R = 10\\ \\Omega$ in the right gap, the machine below converts a balance length into the unknown resistance.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "10*x/(100 - x)",
        exprLatex: "X = \\frac{10\\,l}{100 - l}\\ \\Omega",
        min: 5,
        max: 95,
        step: 1,
        initial: 40,
        inputLabel: "Balance length l",
        inputUnit: "cm",
        outputLabel: "Unknown X (Ω)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $l = 50$ cm, $X = R = 10$ Ω. Near the middle, a 1 cm change in $l$ changes $X$ only modestly. Near the ends the output races: from 90 cm to 95 cm, $X$ jumps from 90 Ω to 190 Ω. A small misreading of $l$ near an end gives a huge error in $X$.",
    },
    {
      type: "text",
      content:
        "**Why aim for the middle.** If $l$ is read with an uncertainty $\\Delta l$, the fractional error in $X$ is",
    },
    {
      type: "math",
      latex: "\\frac{\\Delta X}{X} = \\frac{\\Delta l}{l} + \\frac{\\Delta l}{100 - l} = \\frac{100\\,\\Delta l}{l\\,(100 - l)}",
    },
    {
      type: "text",
      content:
        "The product $l(100 - l)$ is largest at $l = 50$, so the error is smallest there. Choose $R$ close to the expected $X$ to bring the balance point near the centre. **End corrections:** the thick copper strips and contact points add a little extra resistance at each end, equivalent to extra lengths $\\alpha$ and $\\beta$ of wire, so strictly $\\dfrac{X}{R} = \\dfrac{l + \\alpha}{100 - l + \\beta}$. Swapping $X$ and $R$ and averaging reduces this error.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (find X).** With $R = 10\\ \\Omega$ in the right gap, balance is at 40 cm.\n\n1. $X = 10\\times\\dfrac{40}{60} = 6.67\\ \\Omega$.\n\n**Worked example 2 (swap).** Now $X$ and $R$ are interchanged. Where is the new balance point?\n\n1. With $R$ now in the left gap: $\\dfrac{R}{X} = \\dfrac{l'}{100 - l'}$, i.e. $\\dfrac{10}{6.67} = \\dfrac{l'}{100 - l'}$.\n2. $1.5(100 - l') = l'$, so $l' = 60$ cm $= 100 - 40$. *Why this step:* swapping the gaps simply mirrors the bridge, so the balance point mirrors too.\n\n**Worked example 3 (bridge inside a network).** $P = 2\\ \\Omega$, $Q = 4\\ \\Omega$, $R = 3\\ \\Omega$, $S = 6\\ \\Omega$, with a 5 Ω resistor between B and D. Find the resistance between A and C.\n\n1. Check balance: $P/Q = 2/4 = 0.5$ and $R/S = 3/6 = 0.5$. Balanced. *Why this step:* this check is the whole trick; if it holds, the 5 Ω resistor carries no current.\n2. Remove the middle branch: $(2 + 4) \\parallel (3 + 6) = 6\\parallel9 = \\dfrac{54}{15} = 3.6\\ \\Omega$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (make it balance).** $P = 10\\ \\Omega$, $Q = 20\\ \\Omega$ and $R = 15\\ \\Omega$. What $S$ balances the bridge?\n\n1. $S = R\\dfrac{Q}{P} = 15\\times2 = 30\\ \\Omega$.\n\n**Worked example 5 (errors).** The balance length can be read to $\\pm0.1$ cm. Compare the percentage errors in $X$ for balance at 50 cm and at 20 cm.\n\n1. At 50 cm: $\\dfrac{100\\times0.1}{50\\times50} = 0.004 = 0.4\\%$.\n2. At 20 cm: $\\dfrac{100\\times0.1}{20\\times80} = 0.00625 \\approx 0.63\\%$. *Why this step:* this puts a number on \"aim for the middle\".",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the galvanometer's resistance shifts the balance point\"",
      content:
        "At balance the galvanometer carries **no current**, so its resistance multiplies zero and drops out. The same is true of the cell's emf and internal resistance. They affect how sensitive the bridge is (how big the deflection is slightly off balance), but not where balance occurs.",
    },
    {
      type: "quiz",
      id: "em3-6-q1",
      variant: "practice",
      question: "In a Wheatstone bridge $P = 10\\ \\Omega$, $Q = 20\\ \\Omega$ and $R = 25\\ \\Omega$. For balance, $S$ must be",
      options: [
        { text: "50 Ω", correct: true, feedback: "$S = R\\dfrac{Q}{P} = 25\\times2 = 50\\ \\Omega$." },
        { text: "12.5 Ω", feedback: "That uses $S = RP/Q$. From $P/Q = R/S$, $S = RQ/P$." },
        { text: "35 Ω", feedback: "Balance is a ratio condition, not a sum." },
        { text: "8 Ω", feedback: "Check: $P/Q = 0.5$, so $S$ must be twice $R$." },
      ],
    },
    {
      type: "quiz",
      id: "em3-6-q2",
      variant: "practice",
      question: "In a meter bridge the unknown $X$ is in the left gap and 12 Ω is in the right gap. Balance is found 25 cm from the left end. $X$ is",
      options: [
        { text: "36 Ω", feedback: "That puts the 25 cm segment with the 12 Ω. The left segment belongs to the left gap." },
        { text: "3 Ω", feedback: "That uses $\\dfrac{25}{100}$. The ratio is $\\dfrac{l}{100 - l}$." },
        { text: "4 Ω", correct: true, feedback: "$X = 12\\times\\dfrac{25}{75} = 4\\ \\Omega$." },
        { text: "16 Ω", feedback: "$X/12 = 25/75 = 1/3$, so $X = 4\\ \\Omega$." },
      ],
    },
    {
      type: "quiz",
      id: "em3-6-q3",
      variant: "practice",
      question: "In the previous question, the unknown and the 12 Ω resistor are interchanged. The new balance point is at",
      options: [
        { text: "25 cm", feedback: "Swapping the gaps mirrors the bridge, so the balance point moves." },
        { text: "50 cm", feedback: "50 cm needs equal resistances in the two gaps." },
        { text: "75 cm", correct: true, feedback: "$l' = 100 - l = 75$ cm. Check: $12/4 = 75/25$." },
        { text: "33.3 cm", feedback: "Check with $\\dfrac{12}{4} = \\dfrac{l'}{100 - l'}$: $l' = 75$ cm." },
      ],
    },
    {
      type: "quiz",
      id: "em3-6-q4",
      variant: "practice",
      question: "A bridge network has $P = 1\\ \\Omega$ (A–B), $Q = 2\\ \\Omega$ (B–C), $R = 2\\ \\Omega$ (A–D), $S = 4\\ \\Omega$ (D–C) and a 5 Ω resistor between B and D. The resistance between A and C is",
      options: [
        { text: "2 Ω", correct: true, feedback: "$1/2 = 2/4$: balanced, so drop the 5 Ω. Then $3\\parallel6 = 2\\ \\Omega$." },
        { text: "9 Ω", feedback: "That adds the four outer resistors in series. The two paths are in parallel." },
        { text: "1.5 Ω", feedback: "The bridge is balanced, so the middle 5 Ω has no effect. $(1 + 2)\\parallel(2 + 4) = 2\\ \\Omega$." },
        { text: "It cannot be found without Kirchhoff's laws.", feedback: "Check the balance condition first; here it holds, which makes the problem one line." },
      ],
    },
    {
      type: "quiz",
      id: "em3-6-q5",
      variant: "concept",
      question: "Why is it best to choose the known resistance so that the meter-bridge balance point lies near 50 cm?",
      options: [
        { text: "Because the wire only obeys Ohm's law near its middle.", feedback: "The wire is uniform and ohmic along its whole length." },
        { text: "Because the galvanometer is most accurate at the centre of its scale.", feedback: "At balance the galvanometer reads zero wherever the balance point is." },
        { text: "Because no current flows in the wire at 50 cm.", feedback: "Current flows along the whole wire; only the galvanometer branch is at zero." },
        {
          text: "Because the fractional error $\\dfrac{100\\,\\Delta l}{l(100 - l)}$ is smallest there.",
          correct: true,
          feedback: "A reading error of the same size matters least when both segments are long.",
        },
      ],
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "potentiometer-and-electric-power",
  title: "3.7 · Potentiometer and Electric Power",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "A voltmeter connected across a cell always draws a little current, so it reads $\\mathcal E - Ir$, never quite the emf. Is there a way to measure an emf while drawing **no** current at all? Yes: balance the cell against a known, adjustable potential difference, and adjust until nothing flows. That instrument is the potentiometer.",
    },
    {
      type: "text",
      content:
        "**How it works.** A long uniform wire AB (often 4 to 10 m, folded onto a board) carries a steady current from a driver cell through a rheostat. Because the wire is uniform, the potential falls evenly along it. The fall per unit length is the **potential gradient**",
    },
    { type: "math", latex: "k = \\frac{V_{AB}}{L}\\quad(\\text{V/m}), \\qquad V(\\text{over length } l) = k\\,l" },
    {
      type: "text",
      content:
        "Connect the + terminal of the test cell to A (the same end as the driver's +), and its − terminal through a galvanometer to a jockey. Slide the jockey. When the galvanometer reads zero, the wire's potential drop over the length $l$ exactly matches the cell's emf, and the cell supplies no current, so no $Ir$ is lost:",
    },
    { type: "math", latex: "\\mathcal E = k\\,l" },
    {
      type: "callout",
      variant: "definition",
      title: "Potentiometer results",
      content:
        "**Comparing emfs:** balance lengths $l_1$ and $l_2$ for two cells give $\\dfrac{\\mathcal E_1}{\\mathcal E_2} = \\dfrac{l_1}{l_2}$ ($k$ cancels).\n**Internal resistance:** balance at $l_1$ with the cell alone ($\\mathcal E = kl_1$), then at $l_2$ with a resistor $R$ across the cell (terminal voltage $V = kl_2$). Since $\\dfrac{\\mathcal E}{V} = \\dfrac{R + r}{R}$, $\\;r = R\\,\\dfrac{l_1 - l_2}{l_2}$.\nFor a balance point to exist, the drop across the whole wire must exceed the emf being measured.",
    },
    {
      type: "text",
      content:
        "The machine below uses $l_1 = 75$ cm and $R = 8$ Ω: slide the second balance length and read off $r = 8\\dfrac{75 - l_2}{l_2}$.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "8*(75 - x)/x",
        exprLatex: "r = 8\\,\\frac{75 - l_2}{l_2}\\ \\Omega",
        min: 30,
        max: 75,
        step: 1,
        initial: 60,
        inputLabel: "Balance length with R connected, l₂",
        inputUnit: "cm",
        outputLabel: "Internal resistance r (Ω)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: when $l_2 = l_1 = 75$ cm the cell has no internal resistance (the terminal voltage did not drop at all when $R$ was connected). The further $l_2$ falls below $l_1$, the bigger $r$: a cell whose terminal voltage sags a lot under load has a large internal resistance.",
    },
    {
      type: "text",
      content:
        "**Electric power.** Moving charge $q$ through a potential difference $V$ transfers energy $qV$. Divide by time: the power delivered to any element is $P = VI$. For a resistor, use $V = IR$ to get the other two forms:",
    },
    { type: "math", latex: "P = VI = I^2R = \\frac{V^2}{R}, \\qquad H = I^2Rt\\ \\ (\\text{Joule heating})" },
    {
      type: "text",
      content:
        "Which form to use depends on what is shared. In **series** the current is common, so $P = I^2R$: the larger resistance gets more power. In **parallel** the voltage is common, so $P = V^2/R$: the smaller resistance gets more power. Electricity bills count energy in kilowatt-hours: $1\\text{ kWh} = 1000\\text{ W}\\times3600\\text{ s} = 3.6\\times10^6$ J (one \"unit\").",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (gradient and balance).** A 4 m potentiometer wire of resistance 8 Ω is in series with a 2 V driver cell (negligible $r$) and a 2 Ω rheostat. Where does a 1.2 V cell balance?\n\n1. Current in the wire: $I = \\dfrac{2}{8 + 2} = 0.2$ A. *Why this step:* the rheostat takes part of the driver's voltage, so find the current first.\n2. Drop across the wire: $0.2\\times8 = 1.6$ V, so $k = 1.6/4 = 0.4$ V/m.\n3. $l = \\mathcal E/k = 1.2/0.4 = 3$ m.\n\n**Worked example 2 (comparing cells).** Two cells balance at 60 cm and 40 cm on the same potentiometer. The second is a 1.2 V standard cell.\n\n1. $\\dfrac{\\mathcal E_1}{\\mathcal E_2} = \\dfrac{60}{40} = 1.5$.\n2. $\\mathcal E_1 = 1.5\\times1.2 = 1.8$ V.\n\n**Worked example 3 (internal resistance).** A cell balances at 75 cm on open circuit and at 60 cm when shunted by an 8 Ω resistor.\n\n1. $r = R\\dfrac{l_1 - l_2}{l_2} = 8\\times\\dfrac{15}{60} = 2\\ \\Omega$. *Why this step:* $l_1$ measures the emf, $l_2$ the terminal voltage; their ratio is $(R + r)/R$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (bulbs in series).** A 100 W bulb and a 60 W bulb, both rated for 220 V, are connected in series across 220 V. Which glows brighter?\n\n1. Rated values fix each filament's resistance: $R = V^2/P$. So $R_{100} = \\dfrac{220^2}{100} = 484\\ \\Omega$ and $R_{60} = \\dfrac{48400}{60} \\approx 807\\ \\Omega$. *Why this step:* the wattage label describes the bulb on its own at 220 V; in series it gets less, so work with the resistances.\n2. In series the current is common: $I = \\dfrac{220}{484 + 807} \\approx 0.170$ A.\n3. $P = I^2R$: $P_{100} \\approx 14.1$ W and $P_{60} \\approx 23.4$ W.\n4. The **60 W bulb glows brighter**, because its larger resistance takes the larger share of $I^2R$. Together they draw only 37.5 W. (In parallel across 220 V, each gets its rated power and the 100 W bulb is brighter.)\n\n**Worked example 5 (the bill).** A 1.5 kW heater runs 2 hours a day for 30 days at ₹6 per unit.\n\n1. Energy $= 1.5\\text{ kW}\\times60\\text{ h} = 90$ kWh.\n2. Cost $= 90\\times6 = ₹540$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the 100 W bulb is always the brighter one\"",
      content:
        "\"100 W\" means 100 W **at the rated voltage**, on its own. A higher wattage rating means a smaller filament resistance ($R = V^2/P$). In parallel, where both get the full voltage, the 100 W bulb wins. In series, where both get the same current, the bulb with the larger resistance, the 60 W one, dissipates more and glows brighter.",
    },
    {
      type: "quiz",
      id: "em3-7-q1",
      variant: "concept",
      question: "Why does a potentiometer measure the emf of a cell more accurately than an ordinary voltmeter?",
      options: [
        { text: "Its wire has a very low resistance.", feedback: "The wire's resistance sets the gradient but is not the reason. The key is what the test cell supplies at balance." },
        { text: "At balance the test cell supplies no current, so there is no $Ir$ drop inside it.", correct: true, feedback: "Zero current means the terminal voltage equals the emf exactly." },
        { text: "It uses a larger driver cell.", feedback: "The driver must exceed the test emf, but that is a condition, not the reason for accuracy." },
        { text: "A voltmeter measures current, not voltage.", feedback: "A voltmeter does measure potential difference, but it draws a small current while doing so." },
      ],
    },
    {
      type: "quiz",
      id: "em3-7-q2",
      variant: "practice",
      question: "On a potentiometer, a cell balances at 120 cm on open circuit and at 100 cm when a 5 Ω resistor is connected across it. The internal resistance of the cell is",
      options: [
        { text: "0.83 Ω", feedback: "You divided by $l_1$. The formula has $l_2$ (the shunted length) in the denominator." },
        { text: "6 Ω", feedback: "That is $R\\,l_1/l_2$, which is $R + r$. Subtract $R$." },
        { text: "4 Ω", feedback: "Check: $\\mathcal E/V = 1.2 = (5 + r)/5$, so $r = 1\\ \\Omega$." },
        { text: "1 Ω", correct: true, feedback: "$r = 5\\times\\dfrac{120 - 100}{100} = 1\\ \\Omega$." },
      ],
    },
    {
      type: "quiz",
      id: "em3-7-q3",
      variant: "practice",
      question: "A potentiometer wire has a potential gradient of 0.5 V/m. A cell of emf 1.5 V balances at",
      options: [
        { text: "0.75 m", feedback: "That multiplies instead of dividing: $l = \\mathcal E/k$." },
        { text: "3 m", correct: true, feedback: "$l = 1.5/0.5 = 3$ m." },
        { text: "30 cm", feedback: "Check the units: 1.5 V at 0.5 V per metre needs 3 metres." },
      ],
    },
    {
      type: "quiz",
      id: "em3-7-q4",
      variant: "practice",
      question: "A heater is rated 1000 W at 220 V. Its coil is cut to half its length and the remaining half is connected to 220 V. The new power is",
      options: [
        { text: "500 W", feedback: "Halving $R$ at fixed voltage increases the power: $P = V^2/R$." },
        { text: "1000 W", feedback: "The resistance has changed, so at the same voltage the power must change." },
        { text: "2000 W", correct: true, feedback: "$R$ halves, so $V^2/R$ doubles to 2000 W (the coil may well burn out)." },
        { text: "4000 W", feedback: "Cutting the length in half halves $R$ (same cross-section), not quarters it." },
      ],
    },
    {
      type: "quiz",
      id: "em3-7-q5",
      variant: "practice",
      question: "A 2 kW geyser runs 3 hours a day. At ₹5 per unit, the cost for 30 days is",
      options: [
        { text: "₹900", correct: true, feedback: "$2\\times3\\times30 = 180$ kWh, and $180\\times5 = ₹900$." },
        { text: "₹30", feedback: "That is the cost of one day's 6 kWh. Multiply by 30." },
        { text: "₹450", feedback: "Check the energy: 2 kW for 90 hours is 180 kWh." },
        { text: "₹9,00,000", feedback: "You used watts instead of kilowatts. A unit is 1 kWh." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-3-mastery",
  title: "3.8 · Chapter 3 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every question below can be rebuilt from drift, $V = IR$, and Kirchhoff's two laws: charge is conserved at junctions, and potential is a height that returns to itself round any loop.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in eight lines",
      content:
        "1. $I = dq/dt = neAv_d$; drift is slow, the field-signal is fast.\n2. $v_d = eE\\tau/m$ gives $J = \\sigma E$ and $R = \\rho l/A$ with $\\rho = m/ne^2\\tau$; metals: $R = R_0(1 + \\alpha\\Delta T)$.\n3. Stretching at constant volume: $R \\propto l^2$.\n4. Series adds $R$ (same $I$); parallel adds $1/R$ (same $V$); equipotential points can be joined or split.\n5. A cell: $V = \\mathcal E - Ir$ (supplying), $\\mathcal E + Ir$ (charging); maximum power to the load at $R = r$.\n6. KCL = charge conservation; KVL = potential single-valued. Node potentials are the fastest route.\n7. Balanced bridge $P/Q = R/S$; meter bridge $X = R\\,l/(100 - l)$; potentiometer $\\mathcal E = kl$, $r = R(l_1 - l_2)/l_2$.\n8. $P = VI = I^2R = V^2/R$: in series the bigger $R$ gets more power, in parallel the smaller.",
    },
    {
      type: "quiz",
      id: "em3-8-q1",
      variant: "mastery",
      question: "A copper wire of cross-section 2 mm² carries 3 A ($n = 8.5\\times10^{28}$ m⁻³). The drift speed is about",
      options: [
        { text: "$2.2\\times10^{-4}$ m/s", feedback: "That uses 1 mm². The area is 2 mm²." },
        { text: "$1.1\\times10^{-4}$ m/s", correct: true, feedback: "$\\dfrac{3}{8.5\\times10^{28}\\times1.6\\times10^{-19}\\times2\\times10^{-6}} = \\dfrac{3}{2.72\\times10^4} \\approx 1.1\\times10^{-4}$ m/s." },
        { text: "$1.1\\times10^{-7}$ m/s", feedback: "You converted the area as if it were a length ($2\\times10^{-3}$ m²). $1\\text{ mm}^2 = (10^{-3}\\text{ m})^2 = 10^{-6}$ m²." },
        { text: "$3\\times10^{8}$ m/s", feedback: "That is the speed of the signal, not of the electrons." },
      ],
    },
    {
      type: "quiz",
      id: "em3-8-q2",
      variant: "mastery",
      question: "A 5 Ω wire is drawn out until its diameter is halved (volume unchanged). Its new resistance is",
      options: [
        { text: "20 Ω", feedback: "That accounts for the area (×4) but not the length, which also becomes 4 times longer." },
        { text: "10 Ω", feedback: "Halving the diameter quarters the area. And the length changes too." },
        { text: "40 Ω", feedback: "Check: $R \\propto l/A$, with $l\\times4$ and $A\\div4$: a factor of 16." },
        { text: "80 Ω", correct: true, feedback: "Area ÷4 and length ×4 give $R\\times16 = 80\\ \\Omega$." },
      ],
    },
    {
      type: "quiz",
      id: "em3-8-q3",
      variant: "mastery",
      question: "A coil has resistance 50 Ω at 20 °C and 60 Ω at 70 °C. Its temperature coefficient of resistance (referred to 20 °C) is",
      options: [
        { text: "$4\\times10^{-3}$ °C⁻¹", correct: true, feedback: "$\\alpha = \\dfrac{\\Delta R}{R_0\\Delta T} = \\dfrac{10}{50\\times50} = 4\\times10^{-3}$ °C⁻¹." },
        { text: "$2.9\\times10^{-3}$ °C⁻¹", feedback: "That divides by 70 °C, the final temperature. The rise is $\\Delta T = 70 - 20 = 50$ °C." },
        { text: "$3.3\\times10^{-3}$ °C⁻¹", feedback: "That uses 60 Ω as the reference. The coefficient is referred to 20 °C here." },
        { text: "$0.2$ °C⁻¹", feedback: "That is $\\Delta R/\\Delta T = 10/50$ (in Ω/°C), which also happens to equal the fractional change $\\Delta R/R_0$. Divide $\\Delta R$ by both $R_0$ and $\\Delta T$." },
      ],
    },
    {
      type: "quiz",
      id: "em3-8-q4",
      variant: "mastery",
      question: "Twelve 6 Ω resistors form the edges of a cube. The resistance between two opposite corners (body diagonal) is",
      options: [
        { text: "4.5 Ω", feedback: "That is the face-diagonal value $\\tfrac34R$." },
        { text: "3.5 Ω", feedback: "That is the single-edge value $\\tfrac7{12}R$." },
        { text: "5 Ω", correct: true, feedback: "Currents $I/3$, $I/6$, $I/3$ along any path: $V = \\tfrac56 IR$, so $\\tfrac56\\times6 = 5\\ \\Omega$." },
        { text: "18 Ω", feedback: "That is one path of three edges, ignoring the other five paths in parallel." },
      ],
    },
    {
      type: "quiz",
      id: "em3-8-q5",
      variant: "mastery",
      question: "A battery of emf 9 V and internal resistance 0.5 Ω drives a 4 Ω resistor. A voltmeter across the battery reads",
      options: [
        { text: "9 V", feedback: "That would be the reading with no current. Here 2 A flows." },
        { text: "10 V", feedback: "$\\mathcal E + Ir$ is the charging case." },
        { text: "8 V", correct: true, feedback: "$I = 9/4.5 = 2$ A, $V = 9 - 2\\times0.5 = 8$ V." },
        { text: "1 V", feedback: "That is the drop inside the battery, not the terminal reading." },
      ],
    },
    {
      type: "quiz",
      id: "em3-8-q6",
      variant: "mastery",
      question: "Nodes A and B are joined by three branches: a 12 V cell (+ towards A) with 3 Ω; a 6 V cell (+ towards A) with 6 Ω; and a 2 Ω resistor. The current in the 2 Ω resistor is",
      options: [
        { text: "2.5 A", correct: true, feedback: "$V_A\\left(\\tfrac13 + \\tfrac16 + \\tfrac12\\right) = \\tfrac{12}{3} + \\tfrac66$ gives $V_A = 5$ V, so $I = 5/2 = 2.5$ A." },
        { text: "3 A", feedback: "That treats the two cells as simply adding their short-circuit currents. Solve for $V_A$ with KCL." },
        { text: "4.5 A", feedback: "Check the node equation: $(V - 12)/3 + (V - 6)/6 + V/2 = 0$ gives $V = 5$ V." },
        { text: "1.5 A", feedback: "Recheck: $6V = 30$, so $V = 5$ V and the current is 2.5 A." },
      ],
      hint: "Set $V_B = 0$ and apply KCL at A.",
    },
    {
      type: "quiz",
      id: "em3-8-q7",
      variant: "mastery",
      question: "In a meter bridge, $X$ is in the left gap and 7 Ω in the right gap; balance is at 30 cm. Find $X$, and the balance point after $X$ and the 7 Ω resistor are interchanged.",
      options: [
        { text: "$X = 16.3\\ \\Omega$; new balance at 70 cm", feedback: "That uses $\\tfrac{100 - l}{l}$, which belongs to the right gap." },
        { text: "$X = 3\\ \\Omega$; new balance still at 30 cm", feedback: "With the resistors swapped, the 30 cm segment would now pair with 7 Ω, which does not balance." },
        { text: "$X = 2.1\\ \\Omega$; new balance at 70 cm", feedback: "That is $7\\times0.3$. The ratio is $\\tfrac{l}{100 - l}$, not $\\tfrac{l}{100}$." },
        { text: "$X = 3\\ \\Omega$; new balance at 70 cm", correct: true, feedback: "$X = 7\\times\\tfrac{30}{70} = 3\\ \\Omega$. Interchanging mirrors the bridge: $l' = 100 - 30 = 70$ cm." },
      ],
    },
    {
      type: "quiz",
      id: "em3-8-q8",
      variant: "mastery",
      question: "A cell balances at 100 cm on a potentiometer on open circuit, and at 80 cm when a 10 Ω resistor is connected across it. Its internal resistance is",
      options: [
        { text: "2 Ω", feedback: "That divides by $l_1$. Use $r = R(l_1 - l_2)/l_2$." },
        { text: "2.5 Ω", correct: true, feedback: "$r = 10\\times\\tfrac{20}{80} = 2.5\\ \\Omega$." },
        { text: "12.5 Ω", feedback: "That is $R\\,l_1/l_2 = R + r$. Subtract $R$." },
        { text: "8 Ω", feedback: "Check the ratio: $\\mathcal E/V = 100/80 = 1.25 = (10 + r)/10$." },
      ],
    },
    {
      type: "quiz",
      id: "em3-8-q9",
      variant: "mastery",
      question: "A 40 W and a 100 W bulb, both rated for 220 V, are connected in series across 220 V. Which statement is correct?",
      options: [
        { text: "The 100 W bulb glows brighter; power ratio $P_{100}:P_{40} = 5:2$.", feedback: "That is the parallel result. In series the current is common and $P = I^2R$." },
        { text: "Both glow equally, since the same current flows through both.", feedback: "Same current, but different resistances, so different $I^2R$." },
        { text: "The 40 W bulb glows brighter; power ratio $25:4$.", feedback: "That squares the ratio. In series $P \\propto R$, not $R^2$." },
        { text: "The 40 W bulb glows brighter; power ratio $P_{40}:P_{100} = 5:2$.", correct: true, feedback: "$R = V^2/P$ gives $R_{40}:R_{100} = 100:40$. With a common current, $P \\propto R$: $5:2$." },
      ],
    },
    {
      type: "quiz",
      id: "em3-8-q10",
      variant: "mastery",
      question: "JEE Advanced style. An ideal 12 V battery (− terminal at Q, taken as 0 V) drives current through $R_1 = 4\\ \\Omega$ to node P and then through $R_2 = 2\\ \\Omega$ back to Q. A branch from P to Q contains, in order, a switch, $R_3 = 2\\ \\Omega$, a 6 V cell with its + terminal facing P, and an uncharged 3 μF capacitor. Just after the switch is closed, the current through the switch is",
      options: [
        { text: "3 A", feedback: "That is 6 V across 2 Ω alone. The rest of the network holds P at 4.8 V, not 0 V." },
        { text: "0.6 A, flowing from the cell towards P", correct: true, feedback: "At $t = 0$ the capacitor acts as a wire. KCL at P: $\\tfrac{12 - V}{4} = \\tfrac V2 + \\tfrac{V - 6}{2}$ gives $V = 4.8$ V, so the branch carries $\\tfrac{6 - 4.8}{2} = 0.6$ A towards P." },
        { text: "Zero, because a capacitor blocks current", feedback: "A capacitor blocks steady current only once charged. An uncharged capacitor passes current freely at first." },
        { text: "1 A, flowing from P towards the cell", feedback: "That uses $V_P = 4$ V (the value with the branch open) and the wrong direction. Include the branch in KCL." },
      ],
      hint: "An uncharged capacitor behaves like a wire at $t = 0$; use the node potential of P.",
    },
    {
      type: "quiz",
      id: "em3-8-q11",
      variant: "mastery",
      question: "In the circuit of the previous question, what is the charge on the 3 μF capacitor long after the switch is closed?",
      options: [
        { text: "30 μC", feedback: "That adds 4 V and 6 V. The cell faces P with its + terminal, so its emf subtracts from $V_P$." },
        { text: "12 μC", feedback: "That is $C\\times V_P$, ignoring the cell in the branch." },
        { text: "6 μC", correct: true, feedback: "Steady state: no current in the branch, so $V_P = 12\\times\\tfrac26 = 4$ V. Walking P → cell (+ to −) drops 6 V, reaching −2 V at the capacitor, whose other plate is at 0 V. $|V_C| = 2$ V and $Q = 3\\times2 = 6\\ \\mu$C." },
        { text: "18 μC", feedback: "That is $C\\times6$ V, ignoring the 4 V at P." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Everything so far has been about what currents do to potential and energy. Chapter 4 finds that moving charges also create, and feel, a completely new field: the magnetic field.",
    },
  ]),
};

export const emChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
