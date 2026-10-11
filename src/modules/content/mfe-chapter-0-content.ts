import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics I Chapter 0 — Units, Dimensions and Measurement.
 * The language of physics: SI units and conversions, dimensional formulae
 * and what dimensional analysis can and cannot do, significant figures,
 * errors and their propagation, and a quick vectors-for-physics recap
 * (resolution, resultant, relative vectors) that Chapters 1–5 lean on.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "physical-quantities-and-si-units",
  title: "0.1 · Physical Quantities and SI Units",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mfe-0-units-dimensions-measurement.mp4",
      poster: "/videos/mfe-0-units-dimensions-measurement.jpg",
      title: "Chapter 0 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "In September 1999 NASA's Mars Climate Orbiter, a 125-million-dollar spacecraft, flew too low into the Martian atmosphere and was destroyed. The cause was not a broken engine or a bad rocket. One team's software reported thruster impulse in pound-force seconds; the navigation team read those numbers as newton seconds. One pound-force is about 4.45 N, so every small correction was wrong by a factor of 4.45, and the errors piled up over nine months of flight.",
    },
    {
      type: "text",
      content:
        "The lesson is blunt: **a number on its own is not a physical quantity**. \"The impulse is 12\" means nothing until you say 12 *what*. Every measured quantity is a number multiplied by a unit:",
    },
    { type: "math", latex: "\\text{quantity} = (\\text{numerical value}) \\times (\\text{unit}), \\qquad \\text{e.g. } 72\\text{ km/h} = 72 \\times \\tfrac{\\text{km}}{\\text{h}}" },
    {
      type: "text",
      content:
        "Treat the unit as a genuine factor that multiplies the number. Then units can be multiplied, divided and cancelled exactly like algebraic symbols, and that single idea handles every conversion in this course.",
    },
    { type: "heading", text: "SI base and derived units" },
    {
      type: "callout",
      variant: "definition",
      title: "Base and derived quantities",
      content:
        "A **base quantity** is one we agree to define by a standard, independently of all others. SI chooses seven. A **derived quantity** is built from base quantities by a defining equation, so its unit is a product of powers of base units. Speed $= \\frac{\\text{distance}}{\\text{time}}$ gives the unit m/s; force $= ma$ gives kg·m/s².",
    },
    {
      type: "table",
      headers: ["Base quantity", "SI unit", "Symbol"],
      rows: [
        ["Length", "metre", "m"],
        ["Mass", "kilogram", "kg"],
        ["Time", "second", "s"],
        ["Electric current", "ampere", "A"],
        ["Thermodynamic temperature", "kelvin", "K"],
        ["Amount of substance", "mole", "mol"],
        ["Luminous intensity", "candela", "cd"],
      ],
    },
    {
      type: "text",
      content:
        "Two **supplementary units** complete the list: the **radian** (rad) for plane angle, defined as arc length divided by radius, and the **steradian** (sr) for solid angle, area on a sphere divided by radius squared. Both are ratios of lengths, which matters in the next lesson.\n\nEvery other unit you will meet in mechanics is built from the base units. Four you will use constantly:",
    },
    {
      type: "table",
      headers: ["Derived quantity", "Defining equation", "SI unit", "In base units"],
      rows: [
        ["Force", "$F = ma$", "newton (N)", "kg·m·s⁻²"],
        ["Work, energy", "$W = Fs$", "joule (J) = N·m", "kg·m²·s⁻²"],
        ["Power", "$P = W/t$", "watt (W) = J/s", "kg·m²·s⁻³"],
        ["Pressure", "$p = F/A$", "pascal (Pa) = N/m²", "kg·m⁻¹·s⁻²"],
      ],
    },
    { type: "heading", text: "SI prefixes and powers of ten" },
    {
      type: "text",
      content:
        "Physics runs from atomic nuclei ($10^{-15}$ m) to galaxies ($10^{21}$ m), so SI attaches **prefixes** that multiply a unit by a power of ten.",
    },
    {
      type: "table",
      headers: ["Prefix", "Symbol", "Factor", "Example"],
      rows: [
        ["nano", "n", "$10^{-9}$", "wavelength of light ≈ 500 nm"],
        ["micro", "µ", "$10^{-6}$", "human hair ≈ 80 µm"],
        ["milli", "m", "$10^{-3}$", "1 mm on a ruler"],
        ["kilo", "k", "$10^{3}$", "1 km, 1 kg"],
        ["mega", "M", "$10^{6}$", "1 MW power station unit"],
        ["giga", "G", "$10^{9}$", "1 GJ of energy"],
      ],
    },
    { type: "heading", text: "Converting units: multiply by 1" },
    {
      type: "text",
      content:
        "Since $1\\text{ km} = 1000\\text{ m}$, the fraction $\\frac{1000\\text{ m}}{1\\text{ km}}$ equals 1. Multiplying by 1 changes nothing physical, but it lets the old unit cancel. For 72 km/h:",
    },
    {
      type: "math",
      latex:
        "72\\,\\frac{\\text{km}}{\\text{h}} \\times \\frac{1000\\text{ m}}{1\\text{ km}} \\times \\frac{1\\text{ h}}{3600\\text{ s}} = \\frac{72 \\times 1000}{3600}\\,\\frac{\\text{m}}{\\text{s}} = 20\\text{ m/s}",
    },
    {
      type: "text",
      content:
        "Each fraction is arranged so the unit you want to remove sits diagonally opposite itself and cancels. The two factors together are $\\frac{1000}{3600} = \\frac{1}{3.6}$, which is where the famous shortcut comes from: **km/h to m/s, divide by 3.6; m/s to km/h, multiply by 3.6.** Try a few speeds below.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "x/3.6",
        exprLatex: "\\frac{v}{3.6}",
        min: 0,
        max: 180,
        step: 18,
        initial: 72,
        inputLabel: "Speed",
        inputUnit: "km/h",
        outputLabel: "Speed in m/s",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: 18 km/h is 5 m/s, 36 km/h is 10 m/s, 72 km/h is 20 m/s and 108 km/h is 30 m/s. Every step of 18 km/h adds exactly 5 m/s, because $18/3.6 = 5$. Memorise that pair; it makes highway speeds instant.",
    },
    {
      type: "worked-example",
      id: "mfe0-1-we1",
      title: "Worked example 1: density",
      problem:
        "Express the density of water, $1\\text{ g/cm}^3$, in kg/m³.",
      steps: [
        { text: "Write the conversion factors: $1\\text{ g} = 10^{-3}\\text{ kg}$ and $1\\text{ cm} = 10^{-2}\\text{ m}$." },
        { text: "Cube the length factor: $1\\text{ cm}^3 = (10^{-2}\\text{ m})^3 = 10^{-6}\\text{ m}^3$. *Why this step:* the unit is cm **cubed**, so the conversion factor must be cubed too. Forgetting this is the commonest slip in density and volume conversions." },
        { text: "Substitute: $1\\,\\frac{\\text{g}}{\\text{cm}^3} = \\frac{10^{-3}\\text{ kg}}{10^{-6}\\text{ m}^3} = 10^{3}\\text{ kg/m}^3$." },
      ],
      answer: "$1\\text{ g/cm}^3 = 1000$ kg/m³: a cubic metre of water has a mass of one tonne.",
    },
    {
      type: "worked-example",
      id: "mfe0-1-we2",
      title: "Worked example 2: the electricity bill unit",
      problem:
        "How many joules is 1 kWh?",
      steps: [
        { text: "$1\\text{ kWh} = (1000\\text{ W}) \\times (1\\text{ h})$." },
        { text: "Convert the hour: $1\\text{ h} = 3600\\text{ s}$. *Why this step:* a watt is a joule **per second**, so time must be in seconds before the units cancel to J." },
        { text: "$1000\\,\\frac{\\text{J}}{\\text{s}} \\times 3600\\text{ s} = 3.6 \\times 10^{6}\\text{ J}$." },
      ],
      answer: "$1\\text{ kWh} = 3.6 \\times 10^{6}$ J.",
    },
    {
      type: "worked-example",
      id: "mfe0-1-we3",
      title: "Worked example 3: astronomical lengths",
      problem:
        "A **light-year** is the distance light travels in one year; a **parsec** is the distance at which 1 AU ($1.496 \\times 10^{11}$ m, the Earth–Sun distance) subtends an angle of one arcsecond. Express a light-year and a parsec in metres.",
      steps: [
        { text: "One year $= 365.25 \\times 24 \\times 3600\\text{ s} \\approx 3.156 \\times 10^{7}\\text{ s}$." },
        { text: "Light-year $= (3.0 \\times 10^{8}\\text{ m/s})(3.156 \\times 10^{7}\\text{ s}) \\approx 9.46 \\times 10^{15}\\text{ m}$." },
        { text: "One arcsecond $= \\frac{1}{3600}$ degree $= \\frac{1}{3600}\\cdot\\frac{\\pi}{180}\\text{ rad} \\approx 4.85 \\times 10^{-6}\\text{ rad}$. *Why this step:* the relation arc $=$ radius $\\times$ angle only works with the angle in radians." },
        { text: "For such a tiny angle the 1 AU baseline is essentially an arc, so parsec $= \\frac{1\\text{ AU}}{\\theta} = \\frac{1.496 \\times 10^{11}}{4.85 \\times 10^{-6}} \\approx 3.08 \\times 10^{16}\\text{ m}$, about 3.26 light-years." },
      ],
      answer: "1 light-year $\\approx 9.46 \\times 10^{15}$ m; 1 parsec $\\approx 3.08 \\times 10^{16}$ m, about 3.26 light-years.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Course convention: g = 10 m/s²",
      content:
        "Throughout this course we take the acceleration due to gravity as $g = 10$ m/s² unless a question says otherwise (for example $g = 9.8$ m/s²). This is the standard JEE convention and it keeps the arithmetic clean so you can see the physics.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"to go from km/h to m/s, divide by 1000/60\"",
      content:
        "An hour is $60 \\times 60 = 3600$ seconds, not 60. The factor $\\frac{1000}{60}$ treats an hour as if it were a minute: dividing 72 by it gives $4.32$ m/s, and multiplying by it gives $1200$ m/s, both nonsense (the second is exactly 60 times too large). The correct factor is $\\frac{1000}{3600} = \\frac{1}{3.6}$. Always write the factors out as fractions equal to 1 and watch the units cancel: $\\frac{1000\\text{ m}}{1\\text{ km}} \\cdot \\frac{1\\text{ h}}{3600\\text{ s}}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe0-1-q1",
      variant: "practice",
      question: "A car travels at 54 km/h. What is its speed? Give your answer in m/s.",
      answer: 15,
      unit: "m/s",
      hint: "km/h to m/s: multiply by $\\frac{1000}{3600}$, that is, divide by 3.6.",
      solution: "$54 \\times \\dfrac{1000\\text{ m}}{1\\text{ km}} \\times \\dfrac{1\\text{ h}}{3600\\text{ s}} = \\dfrac{54}{3.6} = 15$ m/s.",
      commonMistakes: [
        { answer: 194.4, feedback: "You multiplied by 3.6. That is the m/s to km/h direction; going to m/s the number must get smaller." },
        { answer: 0.9, feedback: "That divides by 60 instead of 3600 somewhere. An hour has 3600 seconds." },
        { answer: 54000, feedback: "You converted km to m but forgot to convert hours to seconds." },
      ],
    },
    {
      type: "quiz",
      id: "mfe0-1-q2",
      variant: "concept",
      question: "Which of these are SI **base** units? Select all that apply.",
      multiple: true,
      options: [
        { text: "kelvin", correct: true, feedback: "The kelvin is the base unit of thermodynamic temperature." },
        { text: "newton", feedback: "The newton is derived: $1\\text{ N} = 1\\text{ kg·m·s}^{-2}$, from $F = ma$." },
        { text: "mole", correct: true, feedback: "The mole is the base unit of amount of substance." },
        { text: "joule", feedback: "The joule is derived: $1\\text{ J} = 1\\text{ N·m} = 1\\text{ kg·m}^2\\text{s}^{-2}$, from $W = Fs$." },
        { text: "candela", correct: true, feedback: "The candela is the base unit of luminous intensity, the least familiar of the seven." },
      ],
      hint: "Test each unit against the table of seven base quantities: is it defined by its own standard, or built from other units by an equation like $F = ma$ or $W = Fs$?",
    },
    {
      type: "numeric",
      id: "mfe0-1-q3",
      variant: "practice",
      question: "Express $1$ newton in dynes, where $1\\text{ dyne} = 1\\text{ g·cm·s}^{-2}$. Give the number of dynes.",
      answer: 100000,
      unit: "dyne",
      hint: "Convert each base unit separately: $1\\text{ kg} = 10^3$ g and $1\\text{ m} = 10^2$ cm.",
      solution: "$1\\text{ N} = 1\\text{ kg·m·s}^{-2} = (10^3\\text{ g})(10^2\\text{ cm})\\text{ s}^{-2} = 10^5$ dyne.",
      commonMistakes: [
        { answer: 1000, feedback: "That converts only the mass ($1\\text{ kg} = 10^3$ g). The metre also becomes $10^2$ cm." },
        { answer: 10000000, feedback: "$10^7$ is the joule-to-erg factor, where length appears squared. Force has length to the first power." },
        { answer: 0.00001, feedback: "Inverted. A newton is the bigger unit, so it contains many dynes." },
      ],
    },
    {
      type: "numeric",
      id: "mfe0-1-q4",
      variant: "practice",
      question: "A steel sheet has density $7.8\\text{ g/cm}^3$. What is this in kg/m³?",
      answer: 7800,
      unit: "kg/m³",
      hint: "Water is $1\\text{ g/cm}^3 = 1000\\text{ kg/m}^3$.",
      solution: "$1\\text{ g} = 10^{-3}$ kg and $1\\text{ cm}^3 = (10^{-2}\\text{ m})^3 = 10^{-6}\\text{ m}^3$, so\n\n$7.8\\,\\dfrac{\\text{g}}{\\text{cm}^3} = 7.8 \\times \\dfrac{10^{-3}\\text{ kg}}{10^{-6}\\text{ m}^3} = 7.8 \\times 10^3$ kg/m³.",
      commonMistakes: [
        { answer: 7.8, feedback: "The conversion factor is not 1: a gram per cubic centimetre is a thousand times a kilogram per cubic metre." },
        { answer: 78, feedback: "You squared the length factor instead of cubing it. $1\\text{ cm}^3 = 10^{-6}\\text{ m}^3$, not $10^{-4}$." },
        { answer: 7800000, feedback: "You converted the volume but not the mass: grams must also become kilograms, a factor of $10^{-3}$." },
      ],
    },
    {
      type: "numeric",
      id: "mfe0-1-q5",
      variant: "practice",
      question: "A 2 kW heater runs for 30 minutes. How much energy does it use? Give your answer in joules.",
      answer: 3600000,
      unit: "J",
      hint: "A watt is a joule per second, so put the time in seconds first.",
      solution: "$30\\text{ min} = 1800$ s, so $E = Pt = 2000 \\times 1800 = 3.6 \\times 10^6$ J, which is exactly 1 kWh.",
      commonMistakes: [
        { answer: 60000, feedback: "That uses 30 s instead of 30 min. $30\\text{ min} = 1800$ s." },
        { answer: 1, feedback: "1 is the answer in kWh, not in joules. Convert: $1\\text{ kWh} = 3.6 \\times 10^6$ J." },
        { answer: 7200000, feedback: "That would be for a full hour. Thirty minutes is half of that." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "dimensions-and-dimensional-formulae",
  title: "0.2 · Dimensions and Dimensional Formulae",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A speed can be written as 20 m/s, 72 km/h or about 45 miles per hour. The numbers change with the unit, but something does not: every one of them is *a length divided by a time*. That unit-free skeleton is the quantity's **dimension**. It tells you what the quantity is made of, not how big it is.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Dimensions and the dimensional formula",
      content:
        "The **dimensions** of a quantity are the powers to which the base quantities must be raised to build it. Writing $[M]$ for mass, $[L]$ for length, $[T]$ for time (and $[A]$, $[K]$ when needed), the **dimensional formula** of $Q$ is $[Q] = [M^aL^bT^c]$. Square brackets mean \"the dimensions of\".",
    },
    { type: "heading", text: "Dimensions from defining equations" },
    {
      type: "text",
      content:
        "You never need to memorise a dimensional formula. Start from a defining equation and substitute the dimensions of each factor. Numbers such as $\\tfrac12$, $2\\pi$ or $4$ have no dimensions and simply drop out.",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} [v] &= \\frac{[\\text{length}]}{[\\text{time}]} = [LT^{-1}] & [a] &= \\frac{[v]}{[T]} = [LT^{-2}] \\\\ [F] &= [m][a] = [MLT^{-2}] & [W] &= [F][s] = [ML^2T^{-2}] \\\\ [P] &= \\frac{[W]}{[T]} = [ML^2T^{-3}] & [p] &= \\frac{[F]}{[\\text{area}]} = [ML^{-1}T^{-2}] \\\\ [\\text{momentum}] &= [m][v] = [MLT^{-1}] & [\\text{impulse}] &= [F][t] = [MLT^{-1}] \\end{aligned}",
    },
    {
      type: "worked-example",
      id: "mfe0-2-we1",
      title: "Worked example 1: the gravitational constant",
      problem:
        "Newton's law of gravitation is $F = \\dfrac{Gm_1m_2}{r^2}$. Find $[G]$.",
      steps: [
        { text: "Make $G$ the subject: $G = \\dfrac{Fr^2}{m_1m_2}$. *Why this step:* a dimension is found by isolating the unknown and reading off the dimensions of everything else." },
        { text: "Substitute: $[G] = \\dfrac{[MLT^{-2}][L^2]}{[M][M]}$." },
        { text: "Collect powers: $M^{1-2}L^{1+2}T^{-2}$, so $[G] = [M^{-1}L^3T^{-2}]$." },
      ],
      answer: "$[G] = [M^{-1}L^3T^{-2}]$.",
    },
    {
      type: "worked-example",
      id: "mfe0-2-we2",
      title: "Worked example 2: Planck's constant",
      problem:
        "The energy of a photon is $E = h\\nu$, where $\\nu$ is a frequency. Find $[h]$.",
      steps: [
        { text: "$h = E/\\nu$, and $[\\nu] = [T^{-1}]$ (cycles per second, and a count of cycles has no dimension)." },
        { text: "$[h] = \\dfrac{[ML^2T^{-2}]}{[T^{-1}]} = [ML^2T^{-1}]$." },
        { text: "Notice this equals $[\\text{momentum} \\times \\text{length}] = [MLT^{-1}][L]$, the dimensions of angular momentum. That coincidence is the seed of Bohr's quantisation rule in Optics and Modern Physics." },
      ],
      answer: "$[h] = [ML^2T^{-1}]$, the same as angular momentum.",
    },
    {
      type: "worked-example",
      id: "mfe0-2-we3",
      title: "Worked example 3: surface tension and viscosity",
      problem:
        "Surface tension $S$ is force per unit length; the coefficient of viscosity $\\eta$ is defined by $F = \\eta A \\dfrac{dv}{dx}$ (viscous force on a layer of area $A$ in a velocity gradient $dv/dx$). Find $[S]$ and $[\\eta]$.",
      steps: [
        { text: "$[S] = \\dfrac{[MLT^{-2}]}{[L]} = [MT^{-2}]$." },
        { text: "For $\\eta$: $[dv/dx] = \\dfrac{[LT^{-1}]}{[L]} = [T^{-1}]$. *Why this step:* a gradient is a change divided by a distance, so the distance's $L$ cancels the $L$ in velocity." },
        { text: "$[\\eta] = \\dfrac{[F]}{[A][dv/dx]} = \\dfrac{[MLT^{-2}]}{[L^2][T^{-1}]} = [ML^{-1}T^{-1}]$." },
      ],
      answer: "$[S] = [MT^{-2}]$ and $[\\eta] = [ML^{-1}T^{-1}]$.",
    },
    { type: "heading", text: "Quantities that share dimensions" },
    {
      type: "callout",
      variant: "tip",
      title: "Pairs that share dimensions",
      content:
        "Some physically different quantities have the same dimensional formula. Examiners love these pairs.",
    },
    {
      type: "table",
      headers: ["Quantity 1", "Quantity 2", "Common dimensions"],
      rows: [
        ["Work, energy", "Torque ($rF$)", "$[ML^2T^{-2}]$"],
        ["Impulse", "Momentum", "$[MLT^{-1}]$"],
        ["Pressure, stress", "Energy density (energy/volume)", "$[ML^{-1}T^{-2}]$"],
        ["Frequency", "Angular velocity", "$[T^{-1}]$"],
        ["Planck's constant", "Angular momentum", "$[ML^2T^{-1}]$"],
        ["Surface tension", "Spring constant ($F/x$)", "$[MT^{-2}]$"],
      ],
    },
    { type: "heading", text: "Dimensionless quantities" },
    {
      type: "text",
      content:
        "A ratio of two like quantities has no dimensions: angle (arc/radius), strain (change in length/length), refractive index (speed/speed), coefficient of friction $\\mu$ (force/force), relative density. Their dimensional formula is $[M^0L^0T^0]$.",
    },
    {
      type: "worked-example",
      id: "mfe0-2-we4",
      title: "Worked example 4: van der Waals, a JEE favourite",
      problem:
        "For a real gas, $\\left(P + \\dfrac{a}{V^2}\\right)(V - b) = RT$, where $P$ is pressure and $V$ is volume. Find the dimensions of $a$ and $b$.",
      steps: [
        { text: "You can only add like to like. So $\\dfrac{a}{V^2}$ must have the dimensions of $P$. *Why this step:* this is the principle of homogeneity (next lesson): \"5 pascals plus 3 metres\" is meaningless." },
        { text: "$[a] = [P][V^2] = [ML^{-1}T^{-2}][L^6] = [ML^5T^{-2}]$." },
        { text: "Similarly, $b$ is subtracted from $V$, so $[b] = [V] = [L^3]$." },
        { text: "A follow-up JEE loves: $\\left[\\dfrac{a}{b}\\right] = \\dfrac{[ML^5T^{-2}]}{[L^3]} = [ML^2T^{-2}]$, the dimensions of energy. And $\\left[\\dfrac{a}{b^2}\\right] = [ML^{-1}T^{-2}]$, the dimensions of pressure." },
      ],
      answer: "$[a] = [ML^5T^{-2}]$ and $[b] = [L^3]$ (so $a/b$ has the dimensions of energy).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a dimensionless quantity has no unit\"",
      content:
        "Angle is dimensionless, yet it has a unit, the radian (and the degree). Strain has no unit, but angle does. \"Dimensionless\" means built from a ratio of like quantities; it does not forbid a named unit.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"same dimensions means same physical quantity\"",
      content:
        "Torque and work are both $[ML^2T^{-2}]$, but work is a scalar ($\\vec F\\cdot\\vec s$) measured in joules, while torque is a vector ($\\vec r \\times \\vec F$) and is written in N·m, never J. Dimensions cannot tell them apart. Matching dimensions is a necessary condition for two things to be equal, not a sufficient one.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mfe0-2-q1",
      variant: "practice",
      question: "What is the dimensional formula of power?",
      options: [
        { text: "$[ML^2T^{-3}]$", correct: true, feedback: "$[W]/[T] = [ML^2T^{-2}][T^{-1}] = [ML^2T^{-3}]$." },
        { text: "$[ML^2T^{-2}]$", feedback: "That is work or energy. Power is work **per unit time**, one more $T^{-1}$." },
        { text: "$[MLT^{-3}]$", feedback: "You used force times velocity but dropped a length: $[MLT^{-2}][LT^{-1}] = [ML^2T^{-3}]$." },
        { text: "$[ML^{-1}T^{-2}]$", feedback: "That is pressure." },
      ],
      hint: "Start from the defining equation $P = W/t$ and the dimensions of work, then divide by one more $[T]$.",
    },
    {
      type: "quiz",
      id: "mfe0-2-q2",
      variant: "concept",
      question: "Which pairs of quantities have the **same** dimensions? Select all that apply.",
      multiple: true,
      options: [
        { text: "Force and momentum", feedback: "Force is $[MLT^{-2}]$ and momentum $[MLT^{-1}]$: they differ by one power of time (force is rate of change of momentum)." },
        { text: "Work and power", feedback: "Power is work per second: $[ML^2T^{-3}]$ versus $[ML^2T^{-2}]$." },
        { text: "Pressure and force", feedback: "Pressure is force per area, so it has an extra $L^{-2}$." },
        { text: "Impulse and momentum", correct: true, feedback: "Impulse $= F\\Delta t = [MLT^{-1}]$, exactly the dimensions of momentum, as it must be since impulse equals change in momentum." },
        { text: "Pressure and energy per unit volume", correct: true, feedback: "$\\dfrac{[ML^2T^{-2}]}{[L^3]} = [ML^{-1}T^{-2}]$, the same as force per area." },
      ],
      hint: "Write each quantity from its defining equation (impulse $= F\\Delta t$, pressure $= F/A$, power $= W/t$) and compare the dimensional formulae pair by pair.",
    },
    {
      type: "quiz",
      id: "mfe0-2-q3",
      variant: "practice",
      question: "In $x = A\\sin(\\omega t)$, $x$ is a displacement and $t$ a time. What are the dimensions of $\\omega$?",
      options: [
        { text: "$[T]$", feedback: "Then $\\omega t$ would be $[T^2]$. The argument of a sine must be dimensionless." },
        { text: "$[T^{-1}]$", correct: true, feedback: "$\\omega t$ must be a pure number (an angle), so $[\\omega] = [T^{-1}]$." },
        { text: "$[LT^{-1}]$", feedback: "There is no length inside the sine; the length sits in $A$." },
        { text: "$[M^0L^0T^0]$", feedback: "It is $\\omega t$, not $\\omega$ itself, that must be dimensionless." },
      ],
      hint: "Sines, cosines, exponentials and logs only accept pure numbers.",
    },
    {
      type: "quiz",
      id: "mfe0-2-q4",
      variant: "practice",
      question: "The force on a sphere moving through a fluid is $F = 6\\pi\\eta r v$. Using this equation, find the dimensions of $\\eta$.",
      options: [
        { text: "$[ML^{-1}T^{-1}]$", correct: true, feedback: "$[\\eta] = \\frac{[MLT^{-2}]}{[L][LT^{-1}]} = [ML^{-1}T^{-1}]$, matching the definition from $F = \\eta A\\,dv/dx$." },
        { text: "$[MT^{-2}]$", feedback: "You divided by $r$ but not by $v$. Both are in the denominator." },
        { text: "$[ML^{-2}T^{-1}]$", feedback: "Check the length powers: $L^{1}/(L \\cdot L) = L^{-1}$." },
        { text: "$[MT^{-1}]$", feedback: "You divided by $v$ but not by $r$. Both are in the denominator." },
      ],
      hint: "Make $\\eta$ the subject: $\\eta = \\dfrac{F}{6\\pi r v}$. The number $6\\pi$ is dimensionless, so just divide the dimensions of force by those of $r v$.",
    },
    {
      type: "quiz",
      id: "mfe0-2-q5",
      variant: "concept",
      question: "Which statement about the radian is correct?",
      options: [
        { text: "It is dimensionless and therefore not a unit at all.", feedback: "It is dimensionless, but it is still a unit (a supplementary SI unit)." },
        { text: "It has dimensions $[L]$ because it is an arc length.", feedback: "An angle is arc length **divided by** radius, so the lengths cancel." },
        { text: "It is a unit of a dimensionless quantity: angle $=$ arc/radius.", correct: true, feedback: "Exactly the point of the first misconception callout." },
      ],
      hint: "Recall the definition: angle $=$ arc length $\\div$ radius. What are the dimensions of a length divided by a length, and does a ratio like that still get a named unit?",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "dimensional-analysis-and-its-limits",
  title: "0.3 · Dimensional Analysis and Its Limits",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "You cannot add 5 kg to 3 m, and you cannot say that a speed equals a force. Every sensible physics equation respects this, and that single fact turns out to be a powerful tool. It can catch wrong formulas in seconds, predict how a quantity depends on others before you know the physics, and convert quantities between unit systems.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Principle of homogeneity",
      content:
        "In a physically correct equation, every term that is added, subtracted or equated must have the **same dimensions**. The arguments of $\\sin$, $\\cos$, $e^{(\\cdot)}$ and $\\log$ must be dimensionless.",
    },
    { type: "heading", text: "Use 1: checking an equation" },
    {
      type: "text",
      content:
        "Test $s = ut + \\tfrac12 at^2$.\n\n1. $[s] = [L]$.\n2. $[ut] = [LT^{-1}][T] = [L]$.\n3. $[\\tfrac12 at^2] = [LT^{-2}][T^2] = [L]$ (the $\\tfrac12$ has no dimensions).\n4. Every term is $[L]$, so the equation passes. ✓\n\nNow a student misremembers it as $s = ut^2 + \\tfrac12 at$. The first term is $[LT^{-1}][T^2] = [LT]$, not $[L]$. One line of checking kills the formula without any physics.",
    },
    { type: "heading", text: "Use 2: deriving a relation" },
    {
      type: "worked-example",
      id: "mfe0-3-we1",
      title: "Worked example 1: the pendulum",
      problem:
        "How does the period $T$ of a simple pendulum depend on its mass $m$, length $l$ and $g$? Guess a product of powers and let dimensions fix the powers.",
      steps: [
        { latex: "T = k\\,m^a l^b g^c \\;\\Rightarrow\\; [M^0L^0T^1] = [M]^a[L]^b[LT^{-2}]^c = [M^a L^{b+c} T^{-2c}]" },
        { text: "Match powers of $M$: $a = 0$. *Why this step:* nothing else on the right contains mass, so mass cannot appear at all. The period does not depend on the bob's mass, a genuine physical prediction." },
        { text: "Match powers of $T$: $1 = -2c$, so $c = -\\tfrac12$." },
        { text: "Match powers of $L$: $0 = b + c$, so $b = \\tfrac12$." },
        { text: "Put the powers together: $T = k\\sqrt{l/g}$. The full theory (Oscillations course) gives $k = 2\\pi$, which dimensional analysis can never find." },
      ],
      answer: "$T = k\\sqrt{l/g}$, independent of the mass ($k = 2\\pi$ from the full theory).",
      tryFirst: false,
    },
    {
      type: "text",
      content:
        "Plot the true formula $T = 2\\pi\\sqrt{l/10}$ below; here $x$ stands for the length $l$ in metres and the vertical axis is $T$ in seconds. Drag the point.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "2*pi*sqrt(x/10)",
        exprLatex: "2\\pi\\sqrt{x/10}",
        window: { xmin: 0, xmax: 4, ymin: 0, ymax: 5 },
        initial: 1,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: a 1 m pendulum has a period of about 2 s, and a 4 m one about 4 s. Quadrupling the length only doubles the period. That square-root **shape** is exactly what dimensional analysis predicted; the vertical scale factor $2\\pi$ came from elsewhere.",
    },
    {
      type: "worked-example",
      id: "mfe0-3-we2",
      title: "Worked example 2: Stokes' law",
      problem:
        "The viscous drag on a small sphere depends on the viscosity $\\eta$, the radius $r$ and the speed $v$. Find the form of $F$.",
      steps: [
        { text: "Write $F = k\\,\\eta^a r^b v^c$, with $[\\eta] = [ML^{-1}T^{-1}]$ from 0.2." },
        { text: "Dimensions: $[MLT^{-2}] = [M^aL^{-a}T^{-a}][L^b][L^cT^{-c}] = [M^a L^{-a+b+c} T^{-a-c}]$." },
        { text: "$M$: $a = 1$. $T$: $-a - c = -2$, so $c = 1$. $L$: $-1 + b + 1 = 1$, so $b = 1$. *Why this step:* three unknown powers need three equations, one per base dimension. That is why this method handles at most three unknowns in mechanics." },
      ],
      answer: "$F = k\\eta r v$; experiment gives $k = 6\\pi$.",
    },
    { type: "heading", text: "Use 3: converting between unit systems" },
    {
      type: "text",
      content:
        "A quantity with dimensions $[M^aL^bT^c]$ has numerical value $n_1$ in units $(M_1, L_1, T_1)$ and $n_2$ in units $(M_2, L_2, T_2)$. The physical quantity is the same, so $n_1 M_1^aL_1^bT_1^c = n_2 M_2^aL_2^bT_2^c$, which gives",
    },
    { type: "math", latex: "n_2 = n_1 \\left[\\frac{M_1}{M_2}\\right]^a \\left[\\frac{L_1}{L_2}\\right]^b \\left[\\frac{T_1}{T_2}\\right]^c" },
    {
      type: "worked-example",
      id: "mfe0-3-we3",
      title: "Worked example 3: joule to erg",
      problem:
        "The erg is the CGS unit of energy; energy is $[ML^2T^{-2}]$. How many erg make 1 J?",
      steps: [
        { text: "$n_1 = 1$, $M_1 = 1$ kg $= 1000$ g, $L_1 = 1$ m $= 100$ cm, $T_1 = T_2 = 1$ s." },
        { text: "$n_2 = 1 \\times (1000)^1 \\times (100)^2 \\times 1 = 10^7$. *Why this step:* each ratio is \"old unit over new unit\" in the **same** measure, so kg must be written in grams before dividing." },
      ],
      answer: "$1\\text{ J} = 10^7$ erg.",
    },
    {
      type: "worked-example",
      id: "mfe0-3-we4",
      title: "Worked example 4: a strange new system",
      problem:
        "In a system where the unit of mass is 10 kg, the unit of length 1 km and the unit of time 1 min, what is 1 J?",
      steps: [
        { text: "Ratios: $\\frac{M_1}{M_2} = \\frac{1\\text{ kg}}{10\\text{ kg}} = \\frac{1}{10}$, $\\frac{L_1}{L_2} = \\frac{1\\text{ m}}{1000\\text{ m}} = 10^{-3}$, $\\frac{T_1}{T_2} = \\frac{1\\text{ s}}{60\\text{ s}} = \\frac{1}{60}$." },
        { text: "$n_2 = 1 \\times \\left(\\tfrac{1}{10}\\right)^1 (10^{-3})^2 \\left(\\tfrac{1}{60}\\right)^{-2} = 10^{-1} \\times 10^{-6} \\times 3600$." },
        { text: "$n_2 = 3.6 \\times 10^{-4}$. *Why this step:* the new units of mass and length are huge, so the number shrinks; the new unit of time is long, and time appears as $T^{-2}$, which pushes the number back up by $60^2$." },
      ],
      answer: "1 J $= 3.6 \\times 10^{-4}$ units of energy in the new system.",
    },
    { type: "heading", text: "Limits of dimensional analysis" },
    {
      type: "callout",
      variant: "info",
      title: "What dimensional analysis cannot do",
      content:
        "1. It cannot find dimensionless constants ($2\\pi$ in the pendulum, $\\tfrac12$ in $\\tfrac12mv^2$).\n2. It cannot derive equations with sums of terms, such as $s = ut + \\tfrac12at^2$ (it can only check them).\n3. It fails for trigonometric, exponential and logarithmic relations, since those functions are dimensionless.\n4. It cannot tell apart quantities with the same dimensions (work and torque).\n5. With only $M$, $L$, $T$ it can fix at most three unknown powers.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a dimensionally correct equation must be right\"",
      content:
        "$s = ut + at^2$ is dimensionally perfect, yet wrong: the true coefficient is $\\tfrac12$. So is $v^2 = u^2 + as$. Dimensional analysis can prove an equation **wrong**, never prove it right.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mfe0-3-q1",
      variant: "concept",
      question: "Which equation is **dimensionally incorrect**? ($v, u$ speeds, $a$ acceleration, $s$ distance, $t$ time.)",
      options: [
        { text: "$v^2 = u^2 + 2as$", feedback: "$[as] = [LT^{-2}][L] = [L^2T^{-2}] = [v^2]$. It is fine." },
        { text: "$s = ut + \\tfrac12 at^3$", correct: true, feedback: "$[at^3] = [LT^{-2}][T^3] = [LT]$, which is not a length." },
        { text: "$v = u + at$", feedback: "$[at] = [LT^{-1}] = [v]$. It is fine." },
        { text: "$s = \\tfrac{u + v}{2}\\,t$", feedback: "$[vt] = [L]$. It is fine." },
      ],
      hint: "Apply the principle of homogeneity: every term must have the dimensions of the left-hand side. Check the power of $t$ that each term needs to make a length (or a speed).",
    },
    {
      type: "quiz",
      id: "mfe0-3-q2",
      variant: "practice",
      question: "The speed $v$ of deep-water waves depends only on $g$ and the wavelength $\\lambda$. By dimensions, $v$ is proportional to",
      options: [
        { text: "$g\\lambda$", feedback: "$[g\\lambda] = [L^2T^{-2}]$, which is a speed squared." },
        { text: "$\\sqrt{g/\\lambda}$", feedback: "$[\\sqrt{g/\\lambda}] = [T^{-1}]$, a frequency, not a speed." },
        { text: "$\\sqrt{\\lambda/g}$", feedback: "$[\\sqrt{\\lambda/g}] = [T]$, a time." },
        { text: "$\\sqrt{g\\lambda}$", correct: true, feedback: "$v = k g^a\\lambda^b$: $T$ gives $-1 = -2a$, $a = \\tfrac12$; $L$ gives $1 = a + b$, $b = \\tfrac12$." },
      ],
      hint: "Set $v = k\\,g^a\\lambda^b$ and match the powers of $[L]$ and $[T]$ on both sides, as in Worked example 1 (the pendulum).",
    },
    {
      type: "numeric",
      id: "mfe0-3-q3",
      variant: "practice",
      question: "A force of 1 N is measured in a system whose units of mass, length and time are 10 kg, 1 km and 1 min. What is its numerical value in the new system?",
      answer: 0.36,
      relTolerance: 0.01,
      hint: "$n_2 = n_1 (M_1/M_2)^1 (L_1/L_2)^1 (T_1/T_2)^{-2}$.",
      solution: "Force is $[MLT^{-2}]$. The ratios are $\\dfrac{M_1}{M_2} = \\dfrac{1}{10}$, $\\dfrac{L_1}{L_2} = 10^{-3}$, $\\dfrac{T_1}{T_2} = \\dfrac{1}{60}$, so\n\n$n_2 = 1 \\times \\tfrac{1}{10} \\times 10^{-3} \\times \\left(\\tfrac{1}{60}\\right)^{-2} = 10^{-4} \\times 3600 = 0.36$.",
      commonMistakes: [
        { answer: 0.00036, feedback: "That is the energy answer from Worked example 4, where length appears squared. Force has $L^1$." },
        { answer: 0.006, feedback: "Time appears as $T^{-2}$, so the factor is $60^2$, not 60." },
        { answer: 2.78e-8, feedback: "You used $(1/60)^{+2}$. With a power of $-2$, the ratio $\\tfrac{1}{60}$ becomes $3600$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe0-3-q4",
      variant: "concept",
      question: "Dimensional analysis gives the pendulum period as $T = k\\sqrt{l/g}$. What does it tell you about $k$?",
      options: [
        { text: "$k$ is a dimensionless number whose value dimensional analysis cannot find.", correct: true, feedback: "Pure numbers are invisible to dimensions. That is limitation 1." },
        { text: "$k = 2\\pi$", feedback: "The value $2\\pi$ comes from solving the equation of motion, not from dimensions." },
        { text: "$k$ has the dimensions of mass, since mass was left out.", feedback: "Matching powers of $M$ forced the mass power to be zero; $k$ carries no dimensions." },
      ],
      hint: "Dimensional analysis only matches powers of $[M]$, $[L]$, $[T]$. What can it say about a pure number multiplying the result?",
    },
    {
      type: "quiz",
      id: "mfe0-3-q5",
      variant: "practice",
      question: "The frequency $f$ of a vibrating string depends on its length $l$, tension $F$ and mass per unit length $\\mu$. Which form do dimensions allow?",
      options: [
        { text: "$f = \\dfrac{k}{l}\\sqrt{\\dfrac{F}{\\mu}}$", correct: true, feedback: "$[F/\\mu] = [MLT^{-2}]/[ML^{-1}] = [L^2T^{-2}]$, so $\\sqrt{F/\\mu}$ is a speed and dividing by $l$ gives $[T^{-1}]$." },
        { text: "$f = k\\,l\\sqrt{\\dfrac{F}{\\mu}}$", feedback: "That has dimensions $[L][LT^{-1}] = [L^2T^{-1}]$, not a frequency." },
        { text: "$f = \\dfrac{k}{l}\\sqrt{\\dfrac{\\mu}{F}}$", feedback: "$\\sqrt{\\mu/F}$ is an inverse speed, so this is $[L^{-2}T]$." },
        { text: "$f = k\\sqrt{\\dfrac{F}{\\mu l}}$", feedback: "$[F/(\\mu l)] = [LT^{-2}]$, and its square root is not a frequency." },
      ],
      hint: "Write $f = k\\,l^a F^b \\mu^c$ with $[\\mu] = [ML^{-1}]$, then equate the powers of $M$, $L$ and $T$ to those of $[T^{-1}]$.",
    },
    {
      type: "quiz",
      id: "mfe0-3-q6",
      variant: "concept",
      question: "Which of these can dimensional analysis do on its own? Select all that apply.",
      multiple: true,
      options: [
        { text: "Show that $s = ut^2 + \\tfrac12 at$ is wrong.", correct: true, feedback: "$[ut^2] = [LT]$, not $[L]$. Proving an equation wrong is exactly what homogeneity is good at." },
        { text: "Show that the period of a simple pendulum does not depend on the bob's mass.", correct: true, feedback: "Matching powers of $M$ in $T = k\\,m^a l^b g^c$ forces $a = 0$ (Worked example 1)." },
        { text: "Convert the value of $G$ from SI to CGS units.", correct: true, feedback: "That is Use 3: $n_2 = n_1[M_1/M_2]^a[L_1/L_2]^b[T_1/T_2]^c$ with $[G] = [M^{-1}L^3T^{-2}]$." },
        { text: "Find the factor $2\\pi$ in $T = 2\\pi\\sqrt{l/g}$.", feedback: "Pure numbers have no dimensions, so they are invisible to this method (limitation 1)." },
        { text: "Derive $s = ut + \\tfrac12 at^2$.", feedback: "A sum of terms cannot come out of a single product of powers. Dimensions can check this equation, not derive it (limitation 2)." },
      ],
      hint: "Dimensional analysis can check that terms match and find power laws in $M$, $L$, $T$. It cannot find dimensionless constants or derive an equation with several added terms (see \"What dimensional analysis cannot do\").",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "significant-figures-and-rounding",
  title: "0.4 · Significant Figures and Rounding",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "You measure a pencil with a ruler marked in millimetres and read 12.3 cm. Your friend types 12.3 ÷ 3 into a calculator to find a third of it and proudly writes 4.1000000 cm. Nobody can measure a pencil to a hundred-millionth of a centimetre with a school ruler. The extra digits are not more accurate; they are a false claim.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Significant figures",
      content:
        "The **significant figures** of a measured value are the digits known reliably plus the **first uncertain digit**. \"12.3 cm\" claims the 1 and 2 are certain and the 3 is the best estimate: three significant figures.",
    },
    { type: "heading", text: "Counting significant figures" },
    {
      type: "text",
      content: "**Counting rules.**",
    },
    {
      type: "table",
      headers: ["Rule", "Example", "Significant figures"],
      rows: [
        ["All non-zero digits count", "$274.5$", "4"],
        ["Zeros between non-zero digits count", "$20.05$", "4"],
        ["Leading zeros never count (they only place the decimal point)", "$0.0052$", "2"],
        ["Trailing zeros after a decimal point count", "$3.500$", "4"],
        ["Trailing zeros in a number without a decimal point do not count", "$4700$", "2"],
        ["Scientific notation shows every significant figure explicitly", "$4.70 \\times 10^3$", "3"],
      ],
    },
    {
      type: "text",
      content:
        "The ambiguous case is $4700$: did you measure to the nearest hundred or the nearest unit? Scientific notation removes the doubt: $4.7 \\times 10^3$ (2 s.f.), $4.70 \\times 10^3$ (3 s.f.), $4.700 \\times 10^3$ (4 s.f.). Changing units never changes the count: $3.50$ m $= 350$ cm $= 3.50 \\times 10^2$ cm, still three significant figures.",
    },
    { type: "heading", text: "Significant figures in calculations" },
    {
      type: "callout",
      variant: "definition",
      title: "Arithmetic rules",
      content:
        "**Multiply or divide:** the result keeps as many significant figures as the input with the **fewest significant figures**.\n**Add or subtract:** the result keeps as many decimal places as the input with the **fewest decimal places**.",
    },
    {
      type: "text",
      content:
        "The two rules differ for a reason. In a sum, the crudest *absolute* uncertainty dominates: $11.03 + 2.5$ is uncertain in the tenths place because $2.5$ is. In a product, *relative* uncertainty is what carries through, and relative precision is what the number of significant figures measures.\n\n**Rounding.** Drop the unwanted digits. If the first dropped digit is more than 5, round up; less than 5, leave it. If it is exactly 5 (nothing but zeros after it), NCERT uses **round half to even**: leave the preceding digit if it is even, raise it if it is odd. So $2.745 \\to 2.74$ but $2.735 \\to 2.74$. Over many roundings this avoids a steady upward bias.",
    },
    {
      type: "worked-example",
      id: "mfe0-4-we1",
      title: "Worked example 1: area of a sheet",
      problem:
        "A sheet measures $4.234$ m by $1.005$ m. Find its area.",
      steps: [
        { text: "Calculator: $4.234 \\times 1.005 = 4.255170$." },
        { text: "Both factors have 4 significant figures, so the answer keeps 4. *Why this step:* a product is only as precise, in relative terms, as its least precise factor." },
        { text: "Area $= 4.255$ m². (Dropped digits start with 1, so round down.)" },
      ],
      answer: "Area $= 4.255$ m² (4 significant figures).",
    },
    {
      type: "worked-example",
      id: "mfe0-4-we2",
      title: "Worked example 2: a sum",
      problem:
        "Add $2.5 + 0.412 + 11.03$ (all in grams).",
      steps: [
        { text: "Calculator: $13.942$ g." },
        { text: "Decimal places: 1, 3 and 2. The fewest is 1. *Why this step:* $2.5$ is only known to the nearest tenth, so the sum cannot be known more finely than that." },
        { text: "Round to one decimal place: $13.9$ g." },
      ],
      answer: "$13.9$ g (one decimal place).",
    },
    {
      type: "worked-example",
      id: "mfe0-4-we3",
      title: "Worked example 3: density",
      problem:
        "A body of mass $5.74$ g has volume $1.2$ cm³. Find its density to the correct number of significant figures.",
      steps: [
        { text: "$\\rho = \\dfrac{5.74}{1.2} = 4.78333\\ldots$ g/cm³." },
        { text: "Significant figures: 3 and 2, so keep 2." },
        { text: "$\\rho = 4.8$ g/cm³. Writing $4.783$ would claim a precision the volume measurement never had." },
      ],
      answer: "$\\rho = 4.8$ g/cm³ (2 significant figures).",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Exact numbers have infinite precision",
      content:
        "Pure numbers in formulas and counted quantities do not limit significant figures. In $C = 2\\pi r$ the 2 is exact, and \"5 oscillations\" is exactly 5. Only measured values count. And keep one or two extra digits in intermediate steps; round only the final answer.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"more decimal places in the answer means more accuracy\"",
      content:
        "Accuracy is set by the measuring instruments, not by the calculator. A density quoted to six figures from a volume known to two is no more accurate than the same density rounded to two figures; it is just dishonest. Extra digits are noise dressed up as information.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe0-4-q1",
      variant: "concept",
      question: "How many significant figures does $0.007030$ have?",
      answer: 4,
      hint: "Rewrite it in scientific notation: leading zeros disappear, significant ones stay.",
      solution: "The leading zeros $0.00$ only place the decimal point and do not count. The digits $7$, $0$, $3$, $0$ all count: the middle zero sits between non-zero digits and the final zero is a trailing zero after the decimal point. In scientific notation, $7.030 \\times 10^{-3}$: four figures.",
      commonMistakes: [
        { answer: 3, feedback: "The final zero comes after the decimal point and after a non-zero digit, so it counts." },
        { answer: 6, feedback: "Leading zeros only locate the decimal point. Write it as $7.030 \\times 10^{-3}$ to see four figures." },
        { answer: 7, feedback: "Leading zeros, including the one before the decimal point, never count." },
      ],
    },
    {
      type: "quiz",
      id: "mfe0-4-q2",
      variant: "concept",
      question: "How many significant figures does $2.300 \\times 10^{4}$ have?",
      options: [
        { text: "2", feedback: "In scientific notation every written digit of the mantissa is significant, trailing zeros included." },
        { text: "5", feedback: "The power of ten does not add figures; it only sets the size." },
        { text: "4", correct: true, feedback: "$2$, $3$, $0$, $0$: the trailing zeros were written deliberately." },
      ],
      hint: "In scientific notation every digit of the mantissa counts, including trailing zeros after the decimal point. Ignore the power of ten.",
    },
    {
      type: "numeric",
      id: "mfe0-4-q3",
      variant: "concept",
      question: "By the convention used in NCERT, how many significant figures does $4700$ (no decimal point) have?",
      answer: 2,
      hint: "Look at the counting-rules table: what happens to trailing zeros when there is no decimal point?",
      solution: "Trailing zeros in a number without a decimal point are not significant, so only $4$ and $7$ count: 2 significant figures. To claim more, write $4.70 \\times 10^3$ (3) or $4.700 \\times 10^3$ (4).",
      commonMistakes: [
        { answer: 4, feedback: "That would need a decimal point, $4700.$, or the form $4.700 \\times 10^3$." },
        { answer: 3, feedback: "There is no reason to count one of the two zeros and not the other." },
      ],
    },
    {
      type: "quiz",
      id: "mfe0-4-q4",
      variant: "practice",
      question: "Compute $12.11 - 3.0$ with the correct number of significant figures.",
      options: [
        { text: "$9.1$", correct: true, feedback: "Subtraction keeps the fewest decimal places: one." },
        { text: "$9.11$", feedback: "$3.0$ is only known to one decimal place, so the difference is too." },
        { text: "$9$", feedback: "You applied the significant-figure rule (2 s.f.) instead of the decimal-place rule for subtraction. Even then, 2 s.f. would be $9.1$." },
      ],
      hint: "For addition and subtraction the rule is about decimal places, not significant figures: the answer keeps as many decimal places as the least precise term.",
    },
    {
      type: "quiz",
      id: "mfe0-4-q5",
      variant: "practice",
      question: "A rectangle measures $3.0$ cm by $2.25$ cm. Its area, correctly rounded, is",
      options: [
        { text: "$6.75$ cm²", feedback: "Three figures claims more than $3.0$ (two figures) can support." },
        { text: "$6.8$ cm²", correct: true, feedback: "$6.75$ to 2 s.f.: the dropped digit is exactly 5 and the 7 before it is odd, so round up to $6.8$." },
        { text: "$7$ cm²", feedback: "That is 1 s.f. The least precise factor has 2, so keep 2." },
        { text: "$6.7$ cm²", feedback: "Round half to even: the digit before the 5 is 7 (odd), so it is raised to 8." },
      ],
      hint: "For a product, the answer keeps as many significant figures as the factor with the fewest. Multiply first, then round once (Worked example 1).",
    },
    {
      type: "quiz",
      id: "mfe0-4-q6",
      variant: "practice",
      question: "Round $6.245$ to three significant figures using round-half-to-even.",
      options: [
        { text: "$6.24$", correct: true, feedback: "The dropped digit is exactly 5, and the preceding 4 is even, so it is left alone." },
        { text: "$6.25$", feedback: "That is ordinary \"round half up\". With half-to-even, the digit before the 5 is 4, which is even, so it stays." },
        { text: "$6.2$", feedback: "That is only two significant figures." },
      ],
      hint: "Round-half-to-even: when the dropped part is exactly 5, round so that the last kept digit is even.",
    },
    {
      type: "quiz",
      id: "mfe0-4-q7",
      variant: "practice",
      question: "Which of these values have exactly **three** significant figures? Select all that apply.",
      multiple: true,
      options: [
        { text: "$0.00340$", correct: true, feedback: "Leading zeros do not count; $3$, $4$ and the trailing $0$ after the decimal point do: $3.40 \\times 10^{-3}$." },
        { text: "$3.40 \\times 10^{2}$", correct: true, feedback: "Every digit of the mantissa counts, the written trailing zero included." },
        { text: "$3400$", feedback: "No decimal point, so the trailing zeros do not count: 2 significant figures." },
        { text: "$30.4$", correct: true, feedback: "The zero sits between non-zero digits, so it counts: $3$, $0$, $4$." },
        { text: "$3.040$", feedback: "Four: the zero between $3$ and $4$ counts, and so does the trailing zero after the decimal point." },
      ],
      hint: "Apply the counting rules to each: leading zeros never count, trailing zeros count only after a decimal point, and in scientific notation count the mantissa's digits.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "errors-in-measurement",
  title: "0.5 · Errors in Measurement",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Time the swing of a pendulum five times with a stopwatch and you will not get five equal numbers. Your thumb is slightly late, then early; the release is a little different each time. No measurement is exact. The skill is not to avoid error, which is impossible, but to **estimate** it and to know how it spreads into anything you calculate.",
    },
    { type: "heading", text: "Systematic and random errors" },
    {
      type: "callout",
      variant: "definition",
      title: "Two kinds of error",
      content:
        "**Systematic errors** push every reading the same way: a zero error in an instrument, a stretched tape, reaction time that is always late. They are reduced by better technique and by correcting for them.\n**Random errors** scatter readings irregularly either side of the true value. They are reduced by taking many readings and averaging.\nThe **least count** of an instrument (the smallest division it can resolve) sets a floor on the error of a single reading.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Accuracy and precision",
      content:
        "**Accuracy** is how close a measurement is to the true value. **Precision** is how finely it is resolved and how closely repeated readings agree. A metre scale with a 1 cm zero error can give precise readings (all 24.3 cm, say) that are all inaccurate. Systematic errors spoil accuracy; random errors and a coarse least count spoil precision.",
    },
    { type: "heading", text: "Mean value and mean absolute error" },
    {
      type: "worked-example",
      id: "mfe0-5-we1",
      title: "Worked example 1: five pendulum readings",
      problem:
        "Periods measured: $2.63$, $2.56$, $2.42$, $2.71$, $2.80$ s. Find the mean period, the mean absolute error and the percentage error.",
      steps: [
        { text: "Mean: $\\bar T = \\dfrac{2.63 + 2.56 + 2.42 + 2.71 + 2.80}{5} = \\dfrac{13.12}{5} = 2.624 \\approx 2.62$ s. *Why this step:* the readings have two decimal places, so the mean is rounded to two as well." },
        {
          text: "Absolute errors $|T_i - \\bar T|$:",
          table: {
            headers: ["Reading $T_i$ (s)", "$|T_i - \\bar T|$ (s)"],
            rows: [
              ["2.63", "0.01"],
              ["2.56", "0.06"],
              ["2.42", "0.20"],
              ["2.71", "0.09"],
              ["2.80", "0.18"],
              ["Sum", "0.54"],
            ],
          },
        },
        { text: "Mean absolute error: $\\Delta T = \\dfrac{0.54}{5} = 0.108 \\approx 0.11$ s." },
        { text: "Write the result as $T = 2.62 \\pm 0.11$ s. Relative error $\\frac{0.11}{2.62} \\approx 0.042$, so the percentage error is about $4\\%$." },
      ],
      answer: "$T = 2.62 \\pm 0.11$ s, a percentage error of about $4\\%$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Absolute, relative and percentage error",
      content:
        "If a quantity is $a \\pm \\Delta a$: **absolute error** $\\Delta a$ (same unit as $a$); **relative error** $\\dfrac{\\Delta a}{a}$ (no unit); **percentage error** $\\dfrac{\\Delta a}{a} \\times 100\\%$.",
    },
    { type: "heading", text: "How errors propagate" },
    {
      type: "text",
      content:
        "Let $A = a \\pm \\Delta a$ and $B = b \\pm \\Delta b$.\n\n*Sum or difference.* The largest $A + B$ could be is $(a + b) + (\\Delta a + \\Delta b)$, and the smallest $(a + b) - (\\Delta a + \\Delta b)$. For $A - B$ the worst case is $A$ high and $B$ low, which again gives $\\Delta a + \\Delta b$. So in both cases **absolute errors add**:",
    },
    { type: "math", latex: "Z = A \\pm B \\;\\Rightarrow\\; \\Delta Z = \\Delta A + \\Delta B" },
    {
      type: "text",
      content:
        "*Product or quotient.* For $Z = AB$: $(a \\pm \\Delta a)(b \\pm \\Delta b) = ab \\pm b\\,\\Delta a \\pm a\\,\\Delta b \\pm \\Delta a\\,\\Delta b$. The last term is a product of two small errors, negligible. Divide the worst case by $ab$ and **relative errors add**. The same holds for $A/B$ (take logs: $\\ln Z = \\ln A - \\ln B$, and the worst case adds the sizes).",
    },
    {
      type: "math",
      latex:
        "Z = AB \\text{ or } \\frac{A}{B} \\;\\Rightarrow\\; \\frac{\\Delta Z}{Z} = \\frac{\\Delta A}{A} + \\frac{\\Delta B}{B}, \\qquad Z = \\frac{A^pB^q}{C^r} \\;\\Rightarrow\\; \\frac{\\Delta Z}{Z} = p\\frac{\\Delta A}{A} + q\\frac{\\Delta B}{B} + r\\frac{\\Delta C}{C}",
    },
    {
      type: "text",
      content:
        "A power is repeated multiplication: $A^3 = A\\cdot A\\cdot A$ adds the same relative error three times. Note that $r$ enters with a **plus** sign even though $C$ is in the denominator: errors never cancel in the worst case.",
    },
    {
      type: "worked-example",
      id: "mfe0-5-we2",
      title: "Worked example 2: a difference",
      problem:
        "Two lengths are $20.0 \\pm 0.5$ cm and $10.0 \\pm 0.3$ cm. Find their difference.",
      steps: [
        { text: "Difference of values: $10.0$ cm." },
        { text: "Absolute errors add: $0.5 + 0.3 = 0.8$ cm. *Why this step:* in the worst case the first is measured high and the second low." },
        { text: "$L = 10.0 \\pm 0.8$ cm, an $8\\%$ error, much worse than either input ($2.5\\%$ and $3\\%$). Subtracting nearly equal quantities is dangerous." },
      ],
      answer: "$L = 10.0 \\pm 0.8$ cm, an $8\\%$ error.",
    },
    {
      type: "worked-example",
      id: "mfe0-5-we3",
      title: "Worked example 3: $g$ from a pendulum, JEE",
      problem:
        "$g = \\dfrac{4\\pi^2 l}{T^2}$ with $l = 50.0 \\pm 0.1$ cm and $T = 2.00 \\pm 0.01$ s. Find the percentage error in $g$, and say which measurement contributes most.",
      steps: [
        { text: "$\\dfrac{\\Delta l}{l} = \\dfrac{0.1}{50.0} = 0.2\\%$ and $\\dfrac{\\Delta T}{T} = \\dfrac{0.01}{2.00} = 0.5\\%$." },
        { text: "$\\dfrac{\\Delta g}{g} = \\dfrac{\\Delta l}{l} + 2\\dfrac{\\Delta T}{T} = 0.2\\% + 1.0\\% = 1.2\\%$. *Why this step:* $T$ appears squared, so its relative error counts twice; $4\\pi^2$ is exact and adds nothing." },
        { text: "The time measurement contributes most. Timing 20 swings instead of one would cut $\\Delta T/T$ twentyfold." },
      ],
      answer: "$\\Delta g/g = 1.2\\%$; the time measurement contributes most ($1.0\\%$).",
    },
    {
      type: "worked-example",
      id: "mfe0-5-we4",
      title: "Worked example 4: density of a wire",
      problem:
        "$\\rho = \\dfrac{m}{\\pi r^2 l}$ with percentage errors $0.3\\%$ in $m$, $0.5\\%$ in $r$ and $0.2\\%$ in $l$. Find the percentage error in $\\rho$, and say which measurement to improve first.",
      steps: [
        { text: "$\\dfrac{\\Delta\\rho}{\\rho} = 0.3\\% + 2(0.5\\%) + 0.2\\% = 1.5\\%$." },
        { text: "Which measurement should you improve first? The radius: its error is multiplied by 2 and contributes $1.0\\%$ of the $1.5\\%$. *Why this step:* always attack the term with the largest (power × relative error)." },
      ],
      answer: "$\\Delta\\rho/\\rho = 1.5\\%$; improve the radius first (it contributes $1.0\\%$).",
    },
    { type: "heading", text: "Vernier callipers and screw gauge" },
    {
      type: "callout",
      variant: "definition",
      title: "Vernier callipers",
      content:
        "If $n$ vernier divisions equal $(n - 1)$ main-scale divisions, then $1\\text{ VSD} = \\frac{n-1}{n}\\text{ MSD}$ and the **least count** is $\\text{LC} = 1\\text{ MSD} - 1\\text{ VSD} = \\frac{1\\text{ MSD}}{n}$. With 1 MSD $= 1$ mm and $n = 10$, LC $= 0.1$ mm.\nReading $=$ main-scale reading $+$ (coinciding vernier division × LC). Corrected reading $=$ observed reading $-$ zero error (zero error taken with its sign).",
    },
    {
      type: "worked-example",
      id: "mfe0-5-we5",
      title: "Worked example 5: vernier with zero error",
      problem:
        "LC $= 0.1$ mm. With the jaws closed, the vernier zero lies to the right of the main-scale zero and the 3rd vernier division coincides. A rod then gives main-scale reading 24 mm with the 6th vernier division coinciding. Find the zero error and the corrected length of the rod.",
      steps: [
        { text: "Zero error: the vernier zero is ahead of the main zero, so the instrument reads too much. Zero error $= +3 \\times 0.1 = +0.3$ mm. *Why this step:* the sign records the direction of the offset; a positive error must be subtracted." },
        { text: "Observed reading: $24 + 6 \\times 0.1 = 24.6$ mm." },
        { text: "Corrected: $24.6 - (+0.3) = 24.3$ mm." },
      ],
      answer: "Zero error $+0.3$ mm; corrected length $24.3$ mm.",
    },
    {
      type: "text",
      content:
        "If instead the vernier zero were to the **left** of the main zero, with the 7th of 10 divisions coinciding, the zero error would be negative: $-(10 - 7) \\times 0.1 = -0.3$ mm, and you would add 0.3 mm to every reading.",
    },
    {
      type: "worked-example",
      id: "mfe0-5-we6",
      title: "Worked example 6: screw gauge",
      problem:
        "Pitch $0.5$ mm (the spindle moves 0.5 mm per full turn), 50 circular divisions. With the faces closed the gauge reads $+0.04$ mm (the circular-scale zero sits 4 divisions past the reference line). A wire gives a linear-scale reading of $2.5$ mm and circular-scale division 34 on the line. Find the least count and the corrected diameter of the wire.",
      steps: [
        { text: "Least count $= \\dfrac{\\text{pitch}}{\\text{divisions}} = \\dfrac{0.5}{50} = 0.01$ mm." },
        { text: "Observed: $2.5 + 34 \\times 0.01 = 2.84$ mm." },
        { text: "Corrected: $2.84 - (+0.04) = 2.80$ mm. *Why this step:* the gauge already showed $0.04$ mm with nothing in it, so that much of every reading is fake." },
      ],
      answer: "Least count $0.01$ mm; corrected diameter $2.80$ mm.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"errors cancel in a difference\"",
      content:
        "Values subtract; errors do not. $(20.0 \\pm 0.5) - (10.0 \\pm 0.3) = 10.0 \\pm 0.8$, not $\\pm 0.2$. You never know which way each error went, so the honest estimate is the worst case, and the worst case adds them.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"percentage error in r³ is the same as in r\"",
      content:
        "If $r$ is uncertain by $1\\%$, then $r^3 = r \\cdot r \\cdot r$ is uncertain by $3\\%$. The volume of a sphere measured this way carries three times the radius's percentage error. Powers multiply relative errors.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe0-5-q1",
      variant: "practice",
      question: "The radius of a sphere is measured with a $2\\%$ error. What is the percentage error in its volume? Give your answer in %.",
      answer: 6,
      unit: "%",
      hint: "$V = \\tfrac43\\pi r^3$. What does a power do to a relative error?",
      solution: "$\\dfrac{\\Delta V}{V} = 3\\,\\dfrac{\\Delta r}{r} = 3 \\times 2\\% = 6\\%$. The $\\tfrac43\\pi$ is exact and adds nothing.",
      commonMistakes: [
        { answer: 2, feedback: "Volume goes as $r^3$, so the relative error is multiplied by 3." },
        { answer: 8, feedback: "$2^3 = 8$ cubes the error itself. Errors are multiplied by the power, not raised to it." },
        { answer: 4, feedback: "That would be for an area, $r^2$." },
      ],
    },
    {
      type: "numeric",
      id: "mfe0-5-q2",
      variant: "practice",
      question: "Kinetic energy $K = \\tfrac12 mv^2$. If $m$ has a $2\\%$ error and $v$ a $3\\%$ error, what is the maximum percentage error in $K$? Give your answer in %.",
      answer: 8,
      unit: "%",
      hint: "Relative errors add, each multiplied by its power.",
      solution: "$\\dfrac{\\Delta K}{K} = \\dfrac{\\Delta m}{m} + 2\\,\\dfrac{\\Delta v}{v} = 2\\% + 2 \\times 3\\% = 8\\%$. The $\\tfrac12$ is exact.",
      commonMistakes: [
        { answer: 5, feedback: "$v$ is squared, so its $3\\%$ counts twice." },
        { answer: 11, feedback: "That squares the 3 ($9\\%$). Multiply the relative error by the power instead." },
        { answer: 4, feedback: "The $\\tfrac12$ is exact and does not halve the error." },
      ],
    },
    {
      type: "quiz",
      id: "mfe0-5-q3",
      variant: "concept",
      question: "$A = 5.0 \\pm 0.2$ m and $B = 3.0 \\pm 0.1$ m. What is $A - B$?",
      options: [
        { text: "$2.0 \\pm 0.3$ m", correct: true, feedback: "Absolute errors add: $0.2 + 0.1 = 0.3$ m." },
        { text: "$2.0 \\pm 0.1$ m", feedback: "Errors do not subtract. In the worst case $A$ is high while $B$ is low." },
        { text: "$2.0 \\pm 0.02$ m", feedback: "For a difference you add absolute errors, not multiply or combine relative errors." },
      ],
      hint: "Can errors in a difference cancel? Think about the worst case for $A - B$.",
    },
    {
      type: "numeric",
      id: "mfe0-5-q4",
      variant: "practice",
      question: "A screw gauge has pitch 1 mm and 100 circular divisions. With the faces closed it reads $-0.03$ mm. A wire shows 3 mm on the linear scale and 45 on the circular scale. What is the corrected diameter, in mm?",
      answer: 3.48,
      tolerance: 0.001,
      unit: "mm",
      hint: "Least count $=$ pitch ÷ number of circular divisions. Corrected reading $=$ observed $-$ zero error, with the zero error's sign.",
      solution: "LC $= \\dfrac{1}{100} = 0.01$ mm. Observed: $3 + 45 \\times 0.01 = 3.45$ mm. Corrected: $3.45 - (-0.03) = 3.48$ mm.",
      commonMistakes: [
        { answer: 3.45, feedback: "That is the observed reading. You still need to remove the zero error." },
        { answer: 3.42, feedback: "You subtracted 0.03 mm. The zero error is **negative**, so subtracting it adds 0.03 mm." },
        { answer: 3.045, feedback: "The least count is $1/100 = 0.01$ mm, so 45 divisions is 0.45 mm." },
        { answer: 3.075, feedback: "The least count is $1/100 = 0.01$ mm, so 45 divisions is 0.45 mm." },
      ],
    },
    {
      type: "quiz",
      id: "mfe0-5-q5",
      variant: "practice",
      question: "In $X = \\dfrac{a^2 b}{c^3}$, each of $a$, $b$, $c$ is measured with a $1\\%$ error. Which contributes most to the error in $X$, and what is the total?",
      options: [
        { text: "$a$; total $6\\%$", feedback: "$a$ contributes $2\\%$ but $c$, with power 3, contributes $3\\%$." },
        { text: "$c$; total $0\\%$", feedback: "The minus sign on the power of $c$ does not let errors cancel. All contributions add." },
        { text: "All equal; total $3\\%$", feedback: "The powers weight each relative error: $2 + 1 + 3 = 6$." },
        { text: "$c$; total $6\\%$", correct: true, feedback: "$2(1\\%) + 1\\% + 3(1\\%) = 6\\%$, and $c$'s share ($3\\%$) is the largest." },
      ],
      hint: "For a product of powers, each relative error is multiplied by its power and they all add, whether the quantity is in the numerator or the denominator.",
    },
    {
      type: "quiz",
      id: "mfe0-5-q6",
      variant: "concept",
      question: "Which of these are **systematic** errors? Select all that apply.",
      multiple: true,
      options: [
        { text: "A vernier callipers whose zero is offset by $0.3$ mm when the jaws are closed.", correct: true, feedback: "A zero error shifts every reading by the same amount in the same direction. Correct for it by subtracting it." },
        { text: "A measuring tape that has stretched with use.", correct: true, feedback: "Every length read off it comes out too small, always the same way. That one-sidedness is what makes it systematic." },
        { text: "A stopwatch operator who presses the button sometimes slightly early and sometimes slightly late.", feedback: "Errors that scatter either side of the true value are random. Averaging many readings reduces them." },
        { text: "An observer whose reaction time always makes the stopwatch start late.", correct: true, feedback: "Always late means always the same direction: a systematic error that averaging cannot remove." },
        { text: "Readings that fluctuate irregularly from one trial to the next because of small air currents.", feedback: "Irregular scatter about the true value is random error, reduced by taking many readings." },
      ],
      hint: "Ask of each: does it shift every reading in the same direction by the same amount (systematic), or scatter readings unpredictably both ways (random)?",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "vectors-for-physics",
  title: "0.6 · Vectors for Physics: a Quick Recap",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two people pull a heavy crate with ropes: one with 3 N, the other with 4 N. How hard is the crate being pulled? If the ropes point the same way, 7 N. If they point in opposite directions, 1 N. At right angles, 5 N. The answer depends on direction, and that is what makes force a **vector**. Mechanics needs only three vector moves, over and over: **add, resolve, subtract**. (The Vector Algebra course builds all of this carefully; here is the physics-flavoured recap.)",
    },
    { type: "heading", text: "Adding two vectors" },
    {
      type: "text",
      content:
        "Put $\\vec A$ and $\\vec B$ tail to tail with angle $\\theta$ between them and complete the parallelogram; the diagonal is the resultant $\\vec R$. Drop a perpendicular from the tip of $\\vec R$ onto the line of $\\vec A$. Along $\\vec A$ the total reach is $A + B\\cos\\theta$; perpendicular to it, the height is $B\\sin\\theta$. Pythagoras on that right triangle gives",
    },
    {
      type: "math",
      latex:
        "R^2 = (A + B\\cos\\theta)^2 + (B\\sin\\theta)^2 = A^2 + B^2 + 2AB\\cos\\theta, \\qquad \\tan\\alpha = \\frac{B\\sin\\theta}{A + B\\cos\\theta}",
    },
    {
      type: "text",
      content:
        "where $\\alpha$ is the angle $\\vec R$ makes with $\\vec A$. Check the extremes: $\\theta = 0$ gives $R = A + B$; $\\theta = 180^\\circ$ gives $R = |A - B|$; $\\theta = 90^\\circ$ gives $R = \\sqrt{A^2 + B^2}$. So $|A - B| \\le R \\le A + B$ always. Drag the two forces below.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "add",
        a: [4, 0],
        b: [1, 3],
        showParallelogram: true,
        readouts: ["components", "magnitude", "sum"],
        labels: { a: "\\vec F_1", b: "\\vec F_2" },
        caption:
          "Swing F₂ round while keeping its length. The resultant is longest when the forces line up and shortest when they point apart.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the resultant's length changes smoothly with the angle, and past $90^\\circ$ it becomes shorter than the larger force. Its components are simply the sums of the components of $\\vec F_1$ and $\\vec F_2$; the parallelogram and the component sum are the same rule.",
    },
    {
      type: "worked-example",
      id: "mfe0-6-we1",
      title: "Worked example 1",
      problem:
        "Forces of 3 N and 4 N act at $60^\\circ$ to each other. Find the resultant.",
      steps: [
        { text: "$R^2 = 9 + 16 + 2(3)(4)\\cos 60^\\circ = 25 + 12 = 37$, so $R = \\sqrt{37} \\approx 6.08$ N." },
        { text: "$\\tan\\alpha = \\dfrac{4\\sin 60^\\circ}{3 + 4\\cos 60^\\circ} = \\dfrac{2\\sqrt3}{5} \\approx 0.693$, so $\\alpha \\approx 34.7^\\circ$ from the 3 N force. *Why this step:* a vector answer needs a direction as well as a size." },
      ],
      answer: "$R = \\sqrt{37} \\approx 6.08$ N at $\\alpha \\approx 34.7^\\circ$ from the 3 N force.",
    },
    {
      type: "worked-example",
      id: "mfe0-6-we2",
      title: "Worked example 2: equal forces at 120°",
      problem:
        "Two forces, each of size $F$, act at $120^\\circ$. Find the size and direction of their resultant.",
      steps: [
        { text: "$R^2 = F^2 + F^2 + 2F^2\\cos 120^\\circ = 2F^2 - F^2 = F^2$." },
        { text: "$R = F$: the resultant equals each force, and by symmetry it bisects the angle. *Why this step:* this is why three equal forces at $120^\\circ$ to each other balance; any two of them add to exactly minus the third." },
      ],
      answer: "$R = F$, bisecting the angle between the two forces.",
    },
    { type: "heading", text: "Resolving a vector" },
    {
      type: "text",
      content:
        "Adding runs in reverse too: any vector can be split into two perpendicular **components**. A force $F$ at angle $\\theta$ above the $x$-axis has",
    },
    { type: "math", latex: "F_x = F\\cos\\theta, \\qquad F_y = F\\sin\\theta, \\qquad F = \\sqrt{F_x^2 + F_y^2}, \\qquad \\tan\\theta = \\frac{F_y}{F_x}" },
    {
      type: "interactive",
      config: {
        component: "right-triangle-explorer",
        initialAngle: 30,
        initialScale: 10,
        unit: "N",
        ratios: ["sin", "cos"],
        angleLabel: "\\theta",
        caption:
          "The hypotenuse is a 10 N force. The adjacent side is its x-component F cos θ, the opposite side its y-component F sin θ.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $30^\\circ$ the components are $10\\cos 30^\\circ \\approx 8.66$ N and $10\\sin 30^\\circ = 5$ N, and $8.66^2 + 5^2 = 100$. As the angle rises the $x$-part shrinks and the $y$-part grows; at $45^\\circ$ they are equal ($7.07$ N each).\n\n**Resolving along an incline (preview of Chapter 3).** A block of weight $mg$ sits on a slope at angle $\\theta$. Choose axes **along** and **perpendicular to** the slope, because that is where the motion and the contact force lie. The weight makes angle $\\theta$ with the perpendicular to the slope, so its components are $mg\\sin\\theta$ down the slope and $mg\\cos\\theta$ into it. At $\\theta = 0$ all the weight presses into the surface; at $90^\\circ$ all of it pulls along.",
    },
    { type: "heading", text: "Component along a given direction" },
    {
      type: "text",
      content:
        "The part of $\\vec F$ along a direction $\\hat n$ is the dot product $\\vec F\\cdot\\hat n$ (the \"shadow\" of the Vector Algebra course). This is exactly what work will use in Chapter 5: $W = \\vec F\\cdot\\vec s$.",
    },
    {
      type: "worked-example",
      id: "mfe0-6-we3",
      title: "Worked example 3",
      problem:
        "Find the component of $\\vec F = 3\\hat i + 4\\hat j$ N along the direction of $\\hat i + \\hat j$.",
      steps: [
        { text: "Unit vector: $\\hat n = \\dfrac{\\hat i + \\hat j}{\\sqrt2}$. *Why this step:* the direction must have length 1, or the answer gets scaled by its length." },
        { text: "$\\vec F\\cdot\\hat n = \\dfrac{3 + 4}{\\sqrt2} = \\dfrac{7}{\\sqrt2} \\approx 4.95$ N." },
      ],
      answer: "$\\vec F\\cdot\\hat n = \\dfrac{7}{\\sqrt2} \\approx 4.95$ N.",
    },
    { type: "heading", text: "Relative vectors" },
    {
      type: "text",
      content:
        "If A is at $\\vec r_A$ and B is at $\\vec r_B$, then the position of A **as seen from B** is",
    },
    { type: "math", latex: "\\vec r_{AB} = \\vec r_A - \\vec r_B" },
    {
      type: "text",
      content:
        "It is the arrow from B to A. Chapter 2 differentiates this to get relative velocity, $\\vec v_{AB} = \\vec v_A - \\vec v_B$, the key to river-boat and rain problems.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "subtract",
        a: [3, 1],
        b: [1, 3],
        labels: { a: "\\vec r_A", b: "\\vec r_B" },
        caption:
          "The difference r_A − r_B is the arrow that starts at B's tip and ends at A's tip. Move either point and watch it follow.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $\\vec r_A - \\vec r_B$ always joins the tip of $\\vec r_B$ to the tip of $\\vec r_A$; the origin drops out. That is why relative position does not depend on where you put the origin.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the resultant of two forces is always bigger than each\"",
      content:
        "Only if the angle is small enough. Two 5 N forces at $120^\\circ$ give 5 N; at $150^\\circ$ they give about 2.6 N; opposite, zero. The resultant can be anything from $|A - B|$ to $A + B$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mfe0-6-q1",
      variant: "practice",
      question: "Forces of 5 N and 3 N act on a body, at an angle you may choose. Which of these **can** be the magnitude of their resultant? Select all that apply.",
      multiple: true,
      options: [
        { text: "$9$ N", feedback: "The resultant can never exceed $5 + 3 = 8$ N." },
        { text: "$2$ N", correct: true, feedback: "That is the minimum, when the forces are opposite." },
        { text: "$8$ N", correct: true, feedback: "That is the maximum, when the forces are parallel." },
        { text: "$5$ N", correct: true, feedback: "Possible: somewhere between $2$ and $8$ N at a suitable angle." },
        { text: "$1$ N", feedback: "The resultant can never be less than $5 - 3 = 2$ N: the larger force cannot be cancelled by more than 3 N." },
      ],
      hint: "The resultant of two forces always lies between $|A - B|$ (opposite directions) and $A + B$ (same direction). Check each value against those two limits.",
    },
    {
      type: "numeric",
      id: "mfe0-6-q2",
      variant: "practice",
      question: "Two forces of 5 N each act at $60^\\circ$ to each other. What is the magnitude of the resultant, in newtons?",
      answer: 8.66,
      relTolerance: 0.01,
      unit: "N",
      hint: "$R^2 = A^2 + B^2 + 2AB\\cos\\theta$.",
      solution: "$R^2 = 25 + 25 + 2(5)(5)\\cos 60^\\circ = 50 + 25 = 75$, so $R = 5\\sqrt3 \\approx 8.66$ N.",
      commonMistakes: [
        { answer: 5, feedback: "Equal forces give a resultant equal to each at $120^\\circ$, not $60^\\circ$." },
        { answer: 10, feedback: "Magnitudes only add when the forces are parallel." },
        { answer: 7.07, feedback: "That is $5\\sqrt2$, the $90^\\circ$ case." },
      ],
    },
    {
      type: "quiz",
      id: "mfe0-6-q3",
      variant: "practice",
      question: "A 20 N force acts at $60^\\circ$ above the horizontal. What is its horizontal component?",
      options: [
        { text: "$10\\sqrt3$ N", feedback: "That is the vertical component, $20\\sin 60^\\circ$." },
        { text: "$20$ N", feedback: "Only a horizontal force has its whole size horizontal." },
        { text: "$10$ N", correct: true, feedback: "$20\\cos 60^\\circ = 10$ N." },
      ],
      hint: "The horizontal component is $F\\cos\\theta$ with $\\theta$ measured from the horizontal.",
    },
    {
      type: "quiz",
      id: "mfe0-6-q4",
      variant: "concept",
      question: "A block of weight $W$ rests on a slope inclined at $\\theta$. The component of its weight **along** the slope is",
      options: [
        { text: "$W\\sin\\theta$", correct: true, feedback: "At $\\theta = 0$ it is 0 and at $90^\\circ$ it is $W$, as it should be." },
        { text: "$W\\cos\\theta$", feedback: "That is the component pressing into the slope. Check $\\theta = 0$: on flat ground nothing pulls along, and $\\cos 0 = 1$ gives $W$." },
        { text: "$W\\tan\\theta$", feedback: "A component can never exceed the vector itself, but $\\tan\\theta$ exceeds 1 beyond $45^\\circ$." },
      ],
      hint: "Test your answer at $\\theta = 0$ and $\\theta = 90^\\circ$.",
    },
    {
      type: "numeric",
      id: "mfe0-6-q5",
      variant: "practice",
      question: "$\\vec r_A = 4\\hat i + 2\\hat j$ m and $\\vec r_B = \\hat i - 2\\hat j$ m. How far is A from B, in metres?",
      answer: 5,
      unit: "m",
      hint: "Subtract the vectors first, then take the length of the result.",
      solution: "$\\vec r_{AB} = \\vec r_A - \\vec r_B = (4 - 1)\\hat i + (2 - (-2))\\hat j = 3\\hat i + 4\\hat j$, so the distance is $\\sqrt{3^2 + 4^2} = 5$ m.",
      commonMistakes: [
        { answer: 2.236, tolerance: 0.01, feedback: "That is $|\\vec r_A| - |\\vec r_B| = \\sqrt{20} - \\sqrt5 = \\sqrt5$: it subtracts the lengths. Subtract the vectors first, then take one length." },
        { answer: 4.472, tolerance: 0.01, feedback: "That is $|\\vec r_A| = \\sqrt{20}$, the distance of A from the origin. You want the distance from B." },
        { answer: 3, feedback: "You may have added the $\\hat j$ parts as $2 - 2 = 0$. Subtracting $-2\\hat j$ gives $+4\\hat j$, so $\\vec r_{AB} = 3\\hat i + 4\\hat j$." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.7 · Chapter 0 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every question below can be rebuilt from a handful of ideas: units multiply like symbols, only like dimensions add, relative errors add (weighted by powers), and vectors add by components.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 0 in six lines",
      content:
        "1. Quantity $=$ number × unit; convert by multiplying by fractions equal to 1 (km/h ÷ 3.6 → m/s).\n2. Dimensions come from defining equations: $[F] = [MLT^{-2}]$, $[W] = [ML^2T^{-2}]$.\n3. Homogeneity: only like dimensions add; arguments of sin, exp, log are pure numbers. It checks and derives, but never finds constants.\n4. $n_2 = n_1[M_1/M_2]^a[L_1/L_2]^b[T_1/T_2]^c$.\n5. Sums/differences: absolute errors add. Products/quotients/powers: relative errors add, times the power.\n6. $R^2 = A^2 + B^2 + 2AB\\cos\\theta$; components $F\\cos\\theta$, $F\\sin\\theta$; $\\vec r_{AB} = \\vec r_A - \\vec r_B$.",
    },
    {
      type: "quiz",
      id: "mfe0-7-q1",
      variant: "mastery",
      question: "A train runs at 90 km/h. Its speed in m/s is",
      options: [
        { text: "$324$", feedback: "That multiplies by 3.6, the m/s → km/h direction." },
        { text: "$25$", correct: true, feedback: "$90/3.6 = 25$ m/s." },
        { text: "$1.5$", feedback: "That divides by 60 (minutes) instead of converting hours to seconds." },
        { text: "$15$", feedback: "Recompute: $90 \\times 1000 / 3600 = 25$." },
      ],
      hint: "Unit conversion (lesson 0.1).",
    },
    {
      type: "quiz",
      id: "mfe0-7-q2",
      variant: "mastery",
      question: "A force varies as $F = at + bt^2$, where $t$ is time. What are the dimensions of $b$?",
      options: [
        { text: "$[MLT^{-4}]$", correct: true, feedback: "$[bt^2] = [F]$, so $[b] = [MLT^{-2}]/[T^2] = [MLT^{-4}]$." },
        { text: "$[MLT^{-3}]$", feedback: "That is the dimension of $a$ ($F/t$). $b$ is $F/t^2$." },
        { text: "$[MLT^{0}]$", feedback: "You multiplied by $T^2$ instead of dividing." },
        { text: "$[ML^{2}T^{-4}]$", feedback: "There is no extra length; force already has $L^1$." },
      ],
      hint: "Lesson 0.3, homogeneity: each term in the sum must have the dimensions of force.",
    },
    {
      type: "quiz",
      id: "mfe0-7-q3",
      variant: "mastery",
      question: "A mass $m$ on a spring of constant $k$ (force per unit extension) oscillates. Which expression for the period is dimensionally possible?",
      options: [
        { text: "$2\\pi\\sqrt{k/m}$", feedback: "$[k/m] = [MT^{-2}]/[M] = [T^{-2}]$; its root is a frequency, not a period." },
        { text: "$2\\pi\\,m/k$", feedback: "$[m/k] = [T^2]$, a time squared." },
        { text: "$2\\pi\\sqrt{m/k}$", correct: true, feedback: "$[m/k] = [T^2]$, so $\\sqrt{m/k}$ is a time." },
        { text: "$2\\pi\\sqrt{mk}$", feedback: "$[mk] = [M^2T^{-2}]$: not a time at all." },
      ],
      hint: "$[k] = [F]/[L] = [MT^{-2}]$.",
    },
    {
      type: "quiz",
      id: "mfe0-7-q4",
      variant: "mastery",
      question: "The escape speed from a planet depends on $G$, the planet's mass $M$ and radius $R$. Dimensional analysis gives $v \\propto$",
      options: [
        { text: "$GM/R$", feedback: "That has dimensions of speed squared." },
        { text: "$\\sqrt{GM/R}$", correct: true, feedback: "$[GM/R] = [M^{-1}L^3T^{-2}][M]/[L] = [L^2T^{-2}]$, a speed squared. (The full answer is $\\sqrt{2GM/R}$; the 2 is invisible to dimensions.)" },
        { text: "$\\sqrt{GMR}$", feedback: "$[GMR] = [L^4T^{-2}]$; its root is $[L^2T^{-1}]$." },
        { text: "$\\sqrt{GR/M}$", feedback: "Mass does not cancel here: $[GR/M] = [M^{-2}L^4T^{-2}]$." },
      ],
      hint: "Deriving a relation by dimensions (lesson 0.3).",
    },
    {
      type: "numeric",
      id: "mfe0-7-q5",
      variant: "mastery",
      question: "The value of $G$ in SI is $6.67 \\times 10^{-11}$. What is its numerical value in CGS units (g, cm, s)? Type it in scientific notation, e.g. 1.23e-4.",
      answer: 6.67e-8,
      relTolerance: 0.01,
      hint: "$[G] = [M^{-1}L^3T^{-2}]$, with $M_1/M_2 = 10^3$ and $L_1/L_2 = 10^2$.",
      solution: "$n_2 = n_1\\left[\\dfrac{M_1}{M_2}\\right]^{-1}\\left[\\dfrac{L_1}{L_2}\\right]^{3}\\left[\\dfrac{T_1}{T_2}\\right]^{-2} = 6.67 \\times 10^{-11} \\times (10^3)^{-1} \\times (10^2)^3 \\times 1 = 6.67 \\times 10^{-8}$.",
      commonMistakes: [
        { answer: 6.67e-14, feedback: "You included the mass factor $10^{-3}$ but forgot the length factor $(10^2)^3 = 10^6$." },
        { answer: 6.67e-5, feedback: "You ignored the mass term. $M^{-1}$ with $M_1/M_2 = 10^3$ contributes $10^{-3}$." },
        { answer: 6.67e-11, feedback: "A dimensional constant changes its number when the units change." },
      ],
    },
    {
      type: "quiz",
      id: "mfe0-7-q6",
      variant: "mastery",
      question: "Evaluate $\\dfrac{12.4 \\times 0.26}{1.00}$ to the correct number of significant figures.",
      options: [
        { text: "$3.224$", feedback: "That keeps 4 figures, more than any input has." },
        { text: "$3.2$", correct: true, feedback: "$0.26$ has 2 significant figures, the fewest, so the answer has 2." },
        { text: "$3.22$", feedback: "3 figures; the $0.26$ only supports 2." },
        { text: "$3$", feedback: "That is 1 figure. The least precise input has 2." },
      ],
      hint: "Lesson 0.4: in a product or quotient, keep the significant figures of the least precise factor.",
    },
    {
      type: "numeric",
      id: "mfe0-7-q7",
      variant: "mastery",
      question: "A physical quantity is $P = \\dfrac{a^3b^2}{\\sqrt c\\,d}$. The percentage errors in $a$, $b$, $c$, $d$ are $1\\%$, $2\\%$, $3\\%$ and $4\\%$. What is the maximum percentage error in $P$? Give your answer in %.",
      answer: 12.5,
      tolerance: 0.01,
      unit: "%",
      hint: "Multiply each relative error by the size of its power, then add them all, denominator terms included.",
      solution: "$\\dfrac{\\Delta P}{P} = 3\\dfrac{\\Delta a}{a} + 2\\dfrac{\\Delta b}{b} + \\tfrac12\\dfrac{\\Delta c}{c} + \\dfrac{\\Delta d}{d} = 3(1) + 2(2) + \\tfrac12(3) + 1(4) = 3 + 4 + 1.5 + 4 = 12.5\\%$.",
      commonMistakes: [
        { answer: 10, feedback: "That adds the raw errors. Each must be multiplied by its power." },
        { answer: 1.5, feedback: "Denominator errors do not subtract; they add like the rest." },
        { answer: 14, feedback: "$\\sqrt c$ has power $\\tfrac12$, so $c$ contributes $1.5\\%$, not $3\\%$." },
      ],
    },
    {
      type: "numeric",
      id: "mfe0-7-q8",
      variant: "mastery",
      question: "A vernier calliper has 1 MSD $= 1$ mm and 20 vernier divisions equal to 19 MSD. With the jaws closed the vernier zero lies to the **left** of the main zero and the 15th division coincides. A reading shows 32 mm on the main scale with the 8th vernier division coinciding. What is the corrected length, in mm?",
      answer: 32.65,
      tolerance: 0.001,
      unit: "mm",
      hint: "Find the least count first. A vernier zero to the left of the main zero means a negative zero error of $-(n - k) \\times \\text{LC}$.",
      solution: "LC $= \\dfrac{1\\text{ mm}}{20} = 0.05$ mm. Zero error $= -(20 - 15)(0.05) = -0.25$ mm. Observed: $32 + 8(0.05) = 32.40$ mm. Corrected: $32.40 - (-0.25) = 32.65$ mm.",
      commonMistakes: [
        { answer: 32.4, feedback: "That is the observed reading. The negative zero error must be corrected." },
        { answer: 32.15, feedback: "You subtracted $0.25$ mm. A negative zero error is corrected by **adding** its size." },
        { answer: 33.3, feedback: "You used LC $= 0.1$ mm; with 20 vernier divisions equal to 19 MSD it is $1/20 = 0.05$ mm." },
        { answer: 33.15, feedback: "You took the zero error as $-15 \\times 0.05 = -0.75$ mm. With the vernier zero to the left, the error is $-(20 - 15) \\times 0.05 = -0.25$ mm." },
      ],
    },
    {
      type: "quiz",
      id: "mfe0-7-q9",
      variant: "mastery",
      question: "Forces of 6 N and 8 N act at $90^\\circ$. The resultant and its angle with the 6 N force are",
      options: [
        { text: "$14$ N along the 8 N force", feedback: "Magnitudes add only for parallel forces." },
        { text: "$10$ N at $\\tan^{-1}(3/4) \\approx 37^\\circ$", feedback: "That is the angle with the 8 N force. Measured from the 6 N force, $\\tan\\alpha = 8/6$." },
        { text: "$10$ N at $\\tan^{-1}(4/3) \\approx 53^\\circ$", correct: true, feedback: "$R = \\sqrt{36 + 64} = 10$; $\\tan\\alpha = 8/6 = 4/3$." },
        { text: "$2$ N at $90^\\circ$", feedback: "That is the difference for opposite forces." },
      ],
      hint: "Adding perpendicular vectors (lesson 0.6). Measure the angle from the 6 N force.",
    },
    {
      type: "quiz",
      id: "mfe0-7-q10",
      variant: "mastery",
      question: "Given $[\\epsilon_0] = [M^{-1}L^{-3}T^4A^2]$ and $[\\mu_0] = [MLT^{-2}A^{-2}]$, what are the dimensions of $\\dfrac{1}{\\sqrt{\\mu_0\\epsilon_0}}$?",
      options: [
        { text: "$[L^{-1}T]$", feedback: "That is $\\sqrt{\\mu_0\\epsilon_0}$ itself; the question asks for its reciprocal." },
        { text: "$[L^2T^{-2}]$", feedback: "That is $1/(\\mu_0\\epsilon_0)$ before the square root." },
        { text: "$[LT^{-1}]$", correct: true, feedback: "$[\\mu_0\\epsilon_0] = [L^{-2}T^2]$, so $1/\\sqrt{\\mu_0\\epsilon_0}$ is $[LT^{-1}]$: a speed. It is the speed of light." },
        { text: "$[MLT^{-1}A]$", feedback: "Mass and current cancel exactly when you multiply the two." },
      ],
      hint: "Dimensional formulae (lesson 0.2).",
    },
    {
      type: "numeric",
      id: "mfe0-7-q11",
      variant: "mastery",
      question: "To find $g = 4\\pi^2 l/T^2$, a student measures $l = 1.00$ m with a metre scale (least count 1 mm) and times 20 oscillations as $40.0$ s on a watch of least count $0.1$ s. What is the maximum percentage error in $g$? Give your answer in %.",
      answer: 0.6,
      tolerance: 0.001,
      unit: "%",
      hint: "The period is $40.0/20 = 2.00$ s, with error $0.1/20$ s.",
      solution: "$\\dfrac{\\Delta l}{l} = \\dfrac{0.001}{1.00} = 0.1\\%$. $\\dfrac{\\Delta T}{T} = \\dfrac{0.1/20}{40.0/20} = \\dfrac{0.1}{40.0} = 0.25\\%$ (the timing error is shared by all 20 swings).\n\n$\\dfrac{\\Delta g}{g} = \\dfrac{\\Delta l}{l} + 2\\dfrac{\\Delta T}{T} = 0.1\\% + 2(0.25\\%) = 0.6\\%$.",
      commonMistakes: [
        { answer: 10.1, feedback: "You took $\\Delta T = 0.1$ s on a single period of 2 s ($5\\%$, doubled). Timing 20 swings divides that error by 20." },
        { answer: 0.35, feedback: "$T$ appears squared, so its $0.25\\%$ counts twice." },
        { answer: 0.5, feedback: "That is only the contribution from $T^2$. Add the $0.1\\%$ from $l$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe0-7-q12",
      variant: "mastery",
      question: "A pressure varies as $P = \\dfrac{a - t^2}{b\\,x}$, where $t$ is time and $x$ is a distance. What are the dimensions of $\\dfrac{a}{b}$?",
      options: [
        { text: "$[ML^{-1}T^{-2}]$ (pressure)", feedback: "That leaves out the $x$: $\\frac ab$ has the dimensions of $P \\times x$, not of $P$." },
        { text: "$[ML^{-2}T^{-2}]$", feedback: "You divided by $x$ instead of multiplying: $\\frac{a}{b} \\sim P\\,x$." },
        { text: "$[M^{-1}T^{4}]$", feedback: "That is $[b]$ on its own. Divide $[a] = [T^2]$ by it." },
        { text: "$[MT^{-2}]$", correct: true, feedback: "$[a] = [T^2]$ (it is subtracted from $t^2$) and $[b] = \\frac{[T^2]}{[P][L]} = [M^{-1}T^4]$, so $[a/b] = [MT^{-2}]$." },
      ],
      hint: "Lesson 0.3, homogeneity: only like quantities can be added or subtracted. Find $[a]$ and $[b]$ separately, then divide.",
    },
    {
      type: "quiz",
      id: "mfe0-7-q13",
      variant: "mastery",
      question: "Which of these have the same dimensions as work, $[ML^2T^{-2}]$? Select all that apply.",
      multiple: true,
      options: [
        { text: "Torque, $rF$", correct: true, feedback: "$[L][MLT^{-2}] = [ML^2T^{-2}]$. Same dimensions as work, though torque is a vector written in N·m, never J." },
        { text: "Pressure × volume", correct: true, feedback: "$[ML^{-1}T^{-2}][L^3] = [ML^2T^{-2}]$. That is why $PV$ in the gas laws is an energy." },
        { text: "Force × velocity", feedback: "$[MLT^{-2}][LT^{-1}] = [ML^2T^{-3}]$: that is power, one extra $T^{-1}$." },
        { text: "Momentum ÷ time", feedback: "$[MLT^{-1}][T^{-1}] = [MLT^{-2}]$: that is force." },
        { text: "Surface tension × area", correct: true, feedback: "$[MT^{-2}][L^2] = [ML^2T^{-2}]$: surface energy is surface tension times area." },
      ],
      hint: "Lesson 0.2: write each product's dimensional formula from its defining equations and compare it with $[ML^2T^{-2}]$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "With units, dimensions and vectors in hand, Chapter 1 puts a particle on a straight track and asks the first real question of mechanics: how do position, velocity and acceleration change with time?",
    },
  ]),
};

export const mfeChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
