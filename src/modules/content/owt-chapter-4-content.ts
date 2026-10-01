import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Oscillations, Waves and Thermal Physics Chapter 4 — Heat and Kinetic Theory.
 * Temperature given a meaning (the zeroth law, thermometric scales),
 * heat followed as it expands things, changes phases and flows (conduction,
 * convection, radiation, Newton's cooling), and gas pressure and heat
 * capacities derived from molecules in motion (kinetic theory,
 * equipartition).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "temperature-and-thermometry",
  title: "4.1 · Temperature and Thermometers",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "On a winter morning, sit first on a wooden bench and then on a metal one. The metal feels much colder. Yet both have been outside all night, and a thermometer would read the same on each. Your hand is not a thermometer: it senses how fast heat leaves your skin, and metal draws heat away faster. To talk about temperature precisely we need something better than touch, and we need a law that says such a measurement is even meaningful.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The zeroth law of thermodynamics",
      content:
        "If body A is in thermal equilibrium with body C, and body B is also in thermal equilibrium with C, then A and B are in thermal equilibrium with each other.\n**Thermal equilibrium** means that when the bodies are placed in contact, no net heat flows between them. The property they then share is called **temperature**.",
    },
    {
      type: "text",
      content:
        "It sounds too obvious to state, but it is exactly what makes a thermometer work. The thermometer is body C. Put it in contact with A until nothing changes, read it; do the same with B. If the readings match, the zeroth law guarantees A and B would not exchange heat. (It was named 'zeroth' because it was recognised after the first and second laws but is logically prior to them.)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Heat and temperature",
      content:
        "**Temperature** tells you which way heat will flow: from higher to lower. At the molecular level it measures the average kinetic energy of random motion (Lesson 4.6).\n**Heat** is energy in transit because of a temperature difference. It is measured in joules. A bathtub of warm water holds far more internal energy than a red-hot pin, even though the pin is at a much higher temperature.",
    },
    {
      type: "text",
      content:
        "**Building a scale from any property.** Pick a property $X$ that changes steadily with hotness: the length of a mercury column, the resistance of a platinum wire, the pressure of a gas at fixed volume. Choose two reproducible **fixed points**: melting ice (called 0 °C) and water boiling at 1 atm (called 100 °C). Measure $X_0$ and $X_{100}$ there. If we *define* temperature to be linear in $X$, then the fraction of the way from ice point to steam point is the same for $t$ and for $X$:",
    },
    { type: "math", latex: "\\frac{t - 0}{100 - 0} = \\frac{X - X_0}{X_{100} - X_0} \\qquad\\Longrightarrow\\qquad t = 100\\,\\frac{X - X_0}{X_{100} - X_0}\\ ^\\circ\\text{C}" },
    {
      type: "text",
      content:
        "The same idea converts between scales. Any two linear scales are related by 'fraction of the way from ice to steam'. Fahrenheit puts ice at 32 and steam at 212 (180 divisions); Kelvin puts ice at 273.15 and steam at 373.15 (100 divisions):",
    },
    { type: "math", latex: "\\frac{C - 0}{100} = \\frac{F - 32}{180} = \\frac{K - 273.15}{100}" },
    {
      type: "text",
      content:
        "Try the Celsius-to-Fahrenheit machine. Look for body temperature (37 °C) and for the one temperature where both scales agree.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "1.8*x + 32",
        exprLatex: "F = \\tfrac95 C + 32",
        min: -50,
        max: 110,
        step: 1,
        initial: 37,
        inputLabel: "Celsius",
        outputLabel: "Fahrenheit",
        inputUnit: "°C",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: 37 °C is 98.6 °F; 100 °C is 212 °F; and at −40 the output equals the input, since $F = C$ gives $C = 1.8C + 32$, so $C = -40$. Also notice the slope: every 1 °C step moves the output by 1.8 °F, so a temperature **difference** of 10 °C is 18 °F but still exactly 10 K.",
    },
    {
      type: "text",
      content:
        "**Absolute zero from a gas thermometer.** Keep a fixed volume of dilute gas and record its pressure at several temperatures. The points lie on a straight line, and extending it to zero pressure always meets the temperature axis at about −273.15 °C, whatever the gas and however much of it there is. That is the natural zero, **absolute zero**, where the Kelvin scale starts: $T = t + 273.15$. The modern Kelvin scale fixes a single point, the triple point of water, at exactly 273.16 K, and defines $T = 273.16\\,\\dfrac{p}{p_{\\text{tr}}}$ for an ideal gas thermometer.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a faulty thermometer).** A badly marked thermometer reads 5 in melting ice and 95 in steam at 1 atm. (a) What is the true temperature when it reads 32? (b) At what reading is it correct?\n\n1. It has 90 divisions between the fixed points instead of 100. Use the fraction-of-the-way rule: $\\dfrac{t}{100} = \\dfrac{R - 5}{95 - 5}$. *Why this step:* the faulty scale is still linear, it is just shifted and squashed, so the fixed-point formula works with $X$ = the reading.\n2. (a) $R = 32$: $t = 100 \\times 27/90 = 30$ °C.\n3. (b) Set $t = R$: $R = \\dfrac{100(R - 5)}{90} \\Rightarrow 90R = 100R - 500 \\Rightarrow R = 50$. The thermometer is right at exactly one reading, 50.\n\n**Worked example 2 (resistance thermometer).** A platinum wire has resistance 10.0 Ω at 0 °C and 14.0 Ω at 100 °C. In a liquid its resistance is 11.5 Ω. Find the temperature.\n\n1. $t = 100 \\times \\dfrac{11.5 - 10.0}{14.0 - 10.0} = 100 \\times \\dfrac{1.5}{4.0} = 37.5$ °C. *Why this step:* resistance is the thermometric property $X$, so it slots into the same formula.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (gas thermometer).** A constant-volume gas thermometer reads 50.0 kPa at the triple point of water and 68.3 kPa in boiling water. Find the boiling temperature in kelvin.\n\n1. $T = 273.16 \\times \\dfrac{68.3}{50.0} = 273.16 \\times 1.366 \\approx 373.1$ K. *Why this step:* the ideal gas scale is defined as proportional to pressure at fixed volume, anchored at 273.16 K.\n2. In Celsius, $373.1 - 273.15 \\approx 100$ °C, as expected.\n\n**Worked example 4 (differences vs readings).** The temperature of a room rises from 15 °C to 35 °C. Express the change in °F and in K.\n\n1. A change of 20 Celsius degrees is a change of $20 \\times 1.8 = 36$ °F. *Why this step:* the $+32$ shifts readings, but it cancels in a difference.\n2. In kelvin the change is also 20 K, since Kelvin and Celsius degrees are the same size.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"heat and temperature are the same thing\"",
      content:
        "Temperature is a property a body **has**; heat is energy that **flows** because temperatures differ. Adding heat does not always raise the temperature (melting ice, Lesson 4.3), and two bodies at the same temperature can contain very different amounts of internal energy. Say 'the temperature is high', not 'the heat is high'.",
    },
    {
      type: "quiz",
      id: "owt4-1-q1",
      variant: "practice",
      question: "At what temperature is the Fahrenheit reading exactly twice the Celsius reading?",
      options: [
        { text: "$-40$ °C", feedback: "At −40 the readings are *equal*, not in the ratio 2 : 1." },
        { text: "$160$ °C", correct: true, feedback: "$1.8C + 32 = 2C \\Rightarrow 0.2C = 32 \\Rightarrow C = 160$ °C, which is 320 °F." },
        { text: "$32$ °C", feedback: "At 32 °C, $F = 89.6$, not 64." },
        { text: "$80$ °C", feedback: "At 80 °C, $F = 176$, not 160." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-1-q2",
      variant: "practice",
      question: "A thermometer reads 10 at the ice point and 90 at the steam point. What is the true temperature when it reads 30?",
      options: [
        { text: "$20$ °C", feedback: "You subtracted the offset but did not rescale: the thermometer has only 80 divisions for 100 degrees." },
        { text: "$25$ °C", correct: true, feedback: "$t = 100 \\times \\frac{30 - 10}{90 - 10} = 100 \\times \\frac{20}{80} = 25$ °C." },
        { text: "$37.5$ °C", feedback: "That uses $30/80$. Measure from the ice-point reading: $30 - 10 = 20$." },
        { text: "$30$ °C", feedback: "The thermometer is not correct at 30; its zero and spacing are both off." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-1-q3",
      variant: "concept",
      question: "Water is heated from 27 °C to 77 °C. What are its initial temperature and its temperature rise in kelvin?",
      options: [
        { text: "300 K and 323 K", feedback: "A temperature *difference* does not get the 273 added; only readings do." },
        { text: "27 K and 50 K", feedback: "The reading must be shifted: $27 + 273 = 300$ K." },
        { text: "300 K and 90 K", feedback: "90 would be the rise in °F (50 × 1.8). In kelvin the rise is 50 K." },
        { text: "300 K and 50 K", correct: true, feedback: "Readings shift by 273 (27 °C ≈ 300 K), but differences are the same size in K and °C." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-1-q4",
      variant: "concept",
      question: "Which statement is the zeroth law of thermodynamics?",
      options: [
        { text: "Heat flows from hot to cold bodies on its own.", feedback: "That is a form of the second law (Clausius)." },
        { text: "Energy is conserved: $\\Delta U = Q - W$.", feedback: "That is the first law." },
        { text: "Two bodies each in thermal equilibrium with a third are in thermal equilibrium with each other.", correct: true, feedback: "This transitivity is what lets a thermometer compare two bodies that never touch." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-1-q5",
      variant: "practice",
      question: "A platinum resistance thermometer reads 100.0 Ω at 0 °C and 138.5 Ω at 100 °C. What temperature gives 119.25 Ω?",
      options: [
        { text: "$50$ °C", correct: true, feedback: "$100 \\times \\frac{119.25 - 100}{138.5 - 100} = 100 \\times \\frac{19.25}{38.5} = 50$ °C." },
        { text: "$86$ °C", feedback: "That is $100 \\times 119.25/138.5$. Measure from the ice-point value, $100$ Ω." },
        { text: "$19.25$ °C", feedback: "That is the resistance change in ohms. Divide by the 38.5 Ω per 100 °C." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "thermal-expansion",
  title: "4.2 · Thermal Expansion",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Railway tracks are laid with small gaps between rails, concrete roads with tar-filled joints, and long bridges rest on rollers at one end. On a hot afternoon a 500 m steel bridge is about 25 cm longer than on a cold night. Almost everything expands when heated. Why?",
    },
    {
      type: "text",
      content:
        "**The molecular reason.** Neighbouring atoms in a solid sit in a potential-energy well: pushing them closer costs energy steeply (repulsion), pulling them apart costs energy gently (attraction weakens). The well is **lopsided**. At higher temperature an atom oscillates with more energy, and in a lopsided well it spends more of its time on the gentle, far side. Its *average* distance from its neighbour grows. Every bond lengthens by the same fraction, so the whole solid scales up.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Coefficients of expansion",
      content:
        "**Linear:** $\\Delta L = L\\,\\alpha\\,\\Delta T$. **Area:** $\\Delta A = A\\,\\beta\\,\\Delta T$. **Volume:** $\\Delta V = V\\,\\gamma\\,\\Delta T$.\nUnits: per °C or per K (the same, since a degree is the same size). Typical $\\alpha$: steel $1.2\\times10^{-5}$ /K, aluminium $2.4\\times10^{-5}$ /K, glass $9\\times10^{-6}$ /K, invar $\\sim 10^{-6}$ /K.",
    },
    {
      type: "text",
      content:
        "**Why $\\beta \\approx 2\\alpha$ and $\\gamma \\approx 3\\alpha$.** Heat a square plate of side $L$. Each side becomes $L(1 + \\alpha\\Delta T)$, so",
    },
    { type: "math", latex: "A' = L^2(1 + \\alpha\\Delta T)^2 = A\\big(1 + 2\\alpha\\Delta T + \\alpha^2\\Delta T^2\\big) \\approx A(1 + 2\\alpha\\Delta T)" },
    {
      type: "text",
      content:
        "The $\\alpha^2\\Delta T^2$ term is about $10^{-7}$ for everyday heating, far below anything measurable, so $\\beta = 2\\alpha$. For a cube, $(1 + \\alpha\\Delta T)^3 \\approx 1 + 3\\alpha\\Delta T$, so $\\gamma = 3\\alpha$. The ratio $\\alpha : \\beta : \\gamma = 1 : 2 : 3$ holds for any isotropic solid, whatever its shape.",
    },
    {
      type: "text",
      content:
        "The machine below gives the change in length of a 500 m steel bridge ($\\alpha = 1.2\\times10^{-5}$ /K) for a temperature rise of up to 50 °C, in centimetres.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "500*0.000012*x*100",
        exprLatex: "\\Delta L = L\\alpha\\Delta T\\ (L = 500\\text{ m, steel})",
        min: 0,
        max: 50,
        step: 1,
        initial: 40,
        inputLabel: "Temperature rise",
        outputLabel: "Extra length (cm)",
        inputUnit: "°C",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: 0.6 cm for every degree, so a 40 °C swing between a winter night and a summer afternoon changes the bridge by 24 cm. If the ends were fixed, that expansion would have to be squeezed out by a thermal stress of $Y\\alpha\\Delta T$, about $10^{8}$ Pa (Lesson 3.2), enough to buckle the deck. Hence expansion joints.",
    },
    {
      type: "text",
      content:
        "**Holes expand too.** Heat a metal plate with a circular hole. Imagine the hole filled with a disc of the same metal: the disc would expand exactly like the surrounding metal, and the joined plate would just be a scaled-up copy. Remove the disc and the hole is the scaled-up hole. So a hole grows with the same $\\alpha$ as the material. This is how a blacksmith fits an iron tyre onto a wooden wheel: heat the ring, slip it on, and let it shrink tight.",
    },
    {
      type: "text",
      content:
        "**Liquids and their containers.** Liquids have only a volume coefficient. When a flask of liquid is heated, the flask expands too, so what you see is the **apparent** expansion: $\\gamma_{\\text{apparent}} = \\gamma_{\\text{real}} - \\gamma_{\\text{vessel}}$. Water is anomalous: between 0 °C and 4 °C it *contracts* as it warms, so it is densest at 4 °C. In winter the 4 °C water sinks to the bottom of a lake, colder water floats above it, and ice forms at the top first, insulating the water below so that fish survive.",
    },
    {
      type: "text",
      content:
        "**Pendulum clocks (link to 0.5).** A clock pendulum's period is $T = 2\\pi\\sqrt{\\ell/g}$. If the rod warms by $\\Delta\\theta$, $\\ell \\to \\ell(1 + \\alpha\\Delta\\theta)$ and $T \\propto \\sqrt\\ell$, so using $(1 + x)^{1/2} \\approx 1 + x/2$:",
    },
    { type: "math", latex: "\\frac{\\Delta T}{T} = \\tfrac12\\alpha\\Delta\\theta \\qquad \\text{time lost per day} = \\tfrac12\\alpha\\Delta\\theta \\times 86400\\ \\text{s}" },
    {
      type: "text",
      content:
        "A longer pendulum swings more slowly, so a clock that is right in winter **loses** time in summer.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a steel rod).** A steel rod 1 m long ($\\alpha = 1.2\\times10^{-5}$ /K) is heated from 20 °C to 120 °C. Find its new length.\n\n1. $\\Delta L = L\\alpha\\Delta T = 1 \\times 1.2\\times10^{-5} \\times 100 = 1.2\\times10^{-3}$ m.\n2. New length $= 1.0012$ m. *Why this step:* the change is only 0.12%, which is why the $\\alpha^2$ terms can always be dropped.\n\n**Worked example 2 (a clock in summer).** A pendulum clock with a brass rod ($\\alpha = 2\\times10^{-5}$ /K) keeps correct time at 20 °C. How much does it lose per day at 30 °C?\n\n1. $\\dfrac{\\Delta T}{T} = \\tfrac12 \\times 2\\times10^{-5} \\times 10 = 10^{-4}$. *Why this step:* the period goes as the square root of length, which halves the fractional change.\n2. Time lost per day $= 10^{-4} \\times 86400 = 8.64$ s.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (overflow from a heated flask).** A glass flask ($\\alpha_g = 9\\times10^{-6}$ /K) holds exactly 1000 cm³ of mercury ($\\gamma = 1.8\\times10^{-4}$ /K), filled to the brim. How much spills when both are heated by 50 °C?\n\n1. Glass volume coefficient: $\\gamma_g = 3\\alpha_g = 2.7\\times10^{-5}$ /K. *Why this step:* the flask's inside volume grows like a solid block of glass of that shape.\n2. Overflow $= V(\\gamma_{\\text{Hg}} - \\gamma_g)\\Delta T = 1000 \\times (1.8\\times10^{-4} - 0.27\\times10^{-4}) \\times 50 = 1000 \\times 1.53\\times10^{-4} \\times 50 \\approx 7.65$ cm³.\n\n**Worked example 4 (a hole in a plate).** A brass plate ($\\alpha = 2\\times10^{-5}$ /K) has a hole of diameter 10.00 cm. It is heated by 100 °C.\n\n1. The hole's diameter changes like any length of brass: $\\Delta d = 10 \\times 2\\times10^{-5} \\times 100 = 0.02$ cm. *Why this step:* the filled-hole argument above.\n2. New diameter 10.02 cm; the hole's area grows by $2\\alpha\\Delta T = 0.4\\%$.\n\n**Worked example 5 (railway gaps).** Rails 12.5 m long are laid at 10 °C. The hottest rail temperature expected is 50 °C. What gap must be left?\n\n1. $\\Delta L = 12.5 \\times 1.2\\times10^{-5} \\times 40 = 6\\times10^{-3}$ m $= 6$ mm.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a hole in a plate shrinks when the plate is heated\"",
      content:
        "The idea is that the metal expands 'into' the hole. It does not: every length in the plate, including the hole's diameter, scales by $(1 + \\alpha\\Delta T)$, exactly like a photographic enlargement. A tight lid on a jar comes loose under hot water for this reason (metal lids also expand more than glass).",
    },
    {
      type: "quiz",
      id: "owt4-2-q1",
      variant: "practice",
      question: "An aluminium rod 2 m long ($\\alpha = 2.4\\times10^{-5}$ /K) is heated by 50 °C. By how much does it lengthen?",
      options: [
        { text: "$1.2$ mm", feedback: "That is for a 1 m rod. This one is 2 m long." },
        { text: "$24$ mm", feedback: "Check the powers of ten: $2.4\\times10^{-5} \\times 100 = 2.4\\times10^{-3}$ m." },
        { text: "$7.2$ mm", feedback: "That uses $3\\alpha$, the volume coefficient. Length uses $\\alpha$." },
        { text: "$2.4$ mm", correct: true, feedback: "$2 \\times 2.4\\times10^{-5} \\times 50 = 2.4\\times10^{-3}$ m." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-2-q2",
      variant: "concept",
      question: "A steel plate with a circular hole is heated uniformly. What happens to the hole?",
      options: [
        { text: "It shrinks, because the steel expands into it.", feedback: "Every length in the plate scales up, including the hole's diameter." },
        { text: "It stays the same size.", feedback: "The hole scales with the plate, just as a filled hole would." },
        { text: "It grows, by the same fraction as any length of steel.", correct: true, feedback: "Think of the hole filled with a steel disc: the disc expands, so the hole must too." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-2-q3",
      variant: "practice",
      question: "A metal sheet has $\\alpha = 1\\times10^{-5}$ /K. By what percentage does its area increase when heated by 100 °C?",
      options: [
        { text: "$0.1\\%$", feedback: "That is the percentage change in *length*. Area uses $\\beta = 2\\alpha$." },
        { text: "$0.2\\%$", correct: true, feedback: "$\\Delta A/A = 2\\alpha\\Delta T = 2 \\times 10^{-5} \\times 100 = 2\\times10^{-3}$." },
        { text: "$0.3\\%$", feedback: "That uses $3\\alpha$, which is for volume." },
        { text: "$0.01\\%$", feedback: "$10^{-5} \\times 100 = 10^{-3}$, which is 0.1%, then double it for area." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-2-q4",
      variant: "practice",
      question: "A pendulum clock with a steel rod ($\\alpha = 1.2\\times10^{-5}$ /K) is correct at 15 °C. Roughly how many seconds does it lose per day at 35 °C?",
      options: [
        { text: "About 10.4 s", correct: true, feedback: "$\\tfrac12 \\times 1.2\\times10^{-5} \\times 20 \\times 86400 = 1.2\\times10^{-4} \\times 86400 \\approx 10.4$ s." },
        { text: "About 20.7 s", feedback: "You forgot the $\\tfrac12$: the period goes as $\\sqrt{\\ell}$." },
        { text: "About 5.2 s", feedback: "The temperature rise is 20 °C, not 10 °C." },
        { text: "It gains 10.4 s", feedback: "A longer pendulum is slower, so the clock *loses* time." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-2-q5",
      variant: "concept",
      question: "Why does a lake freeze from the top down in winter?",
      options: [
        { text: "Cold air touches only the surface.", feedback: "True but not enough: if cold water sank, the whole lake would cool to 0 °C before freezing." },
        { text: "Water is densest at 4 °C, so water colder than that stays on top and freezes first.", correct: true, feedback: "The anomalous expansion of water between 0 and 4 °C keeps the coldest water at the surface." },
        { text: "Ice is denser than water.", feedback: "Ice is *less* dense than water (it floats), which also helps, but the key is the 4 °C density maximum of liquid water." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "calorimetry-and-latent-heat",
  title: "4.3 · Calorimetry and Change of State",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Drop ice cubes into a glass of warm juice. After a few minutes the juice is cold and the ice is smaller or gone. Where did the warmth go? Into the ice, which first warmed to 0 °C, then used heat to melt without getting any warmer. Calorimetry is the book-keeping of that exchange, and it rests on a single idea: in an insulated container, energy lost by the hot parts equals energy gained by the cold parts.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Heat capacity and specific heat",
      content:
        "Heat needed to change temperature without a change of phase: $Q = mc\\,\\Delta T$.\n$c$ is the **specific heat capacity** (J/(kg·K)); water $4200$, ice $2100$, copper about $400$, aluminium about $900$.\n**Molar heat capacity** $C = Mc$ is per mole: $Q = nC\\Delta T$.\n**Water equivalent** of a container: the mass of water with the same heat capacity, $m_w = mc/c_{\\text{water}}$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Latent heat",
      content:
        "Heat needed to change phase at constant temperature: $Q = mL$.\nFor water: latent heat of fusion $L_f = 3.36\\times10^{5}$ J/kg (melting at 0 °C), latent heat of vaporisation $L_v = 2.26\\times10^{6}$ J/kg (boiling at 100 °C, 1 atm).",
    },
    {
      type: "text",
      content:
        "**Why a plateau?** During melting, the energy goes into breaking the bonds that hold molecules in a lattice, increasing their potential energy. Their average kinetic energy, and so the temperature, does not change until every bond that must break has broken. Boiling costs about seven times as much as melting because the molecules must be pulled entirely apart, not just loosened.",
    },
    {
      type: "text",
      content:
        "**The heating curve.** Heat 1 kg of ice from −20 °C to steam at 100 °C at a steady rate. The temperature rises, stops, rises, stops:",
    },
    {
      type: "table",
      headers: ["Stage", "What happens", "Heat needed", "Running total"],
      rows: [
        ["Ice −20 °C → 0 °C", "temperature rises", "$1 \\times 2100 \\times 20 = 42$ kJ", "42 kJ"],
        ["Ice melts at 0 °C", "plateau", "$1 \\times 336\\,000 = 336$ kJ", "378 kJ"],
        ["Water 0 °C → 100 °C", "temperature rises", "$1 \\times 4200 \\times 100 = 420$ kJ", "798 kJ"],
        ["Water boils at 100 °C", "long plateau", "$1 \\times 2\\,260\\,000 = 2260$ kJ", "3058 kJ"],
      ],
    },
    {
      type: "text",
      content:
        "Boiling off the water takes almost three times as much heat as everything before it put together. Also note the slopes: the ice stage rises twice as fast per joule as the water stage, because ice's specific heat is half that of water.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Method: check whether all the ice melts",
      content:
        "In any ice-plus-water problem, **do not** write the heat balance with an unknown final temperature straight away. First compare two numbers:\n1. Heat the warm water can give while cooling to 0 °C.\n2. Heat the ice needs to reach 0 °C and melt completely.\nIf (1) > (2), all the ice melts and the leftover heat warms the mixture. If (1) < (2), the final temperature is exactly 0 °C and only part of the ice melts.",
    },
    {
      type: "text",
      content:
        "The machine below mixes 200 g of water at 50 °C with some ice at 0 °C and returns the final temperature. The latent heat of fusion is worth $L_f/c = 80$ Celsius degrees of water, so if all the ice melts the final temperature is $\\dfrac{200 \\times 50 - 80m}{200 + m}$; if that comes out negative, the answer is simply 0 °C.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "((10000 - 80*x)/(200 + x) + abs((10000 - 80*x)/(200 + x)))/2",
        exprLatex: "\\theta_f = \\max\\!\\left(0,\\ \\frac{200 \\times 50 - 80m}{200 + m}\\right)",
        min: 0,
        max: 250,
        step: 5,
        initial: 100,
        inputLabel: "Mass of ice m",
        outputLabel: "Final temperature (°C)",
        inputUnit: "g",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with 100 g of ice the mixture ends at about 6.7 °C. The final temperature falls as you add ice and hits 0 °C at exactly 125 g. Beyond that it stays at 0 °C: the water can only supply $0.2 \\times 4200 \\times 50 = 42$ kJ, enough to melt 125 g, so any extra ice just stays frozen.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (ice at −10 °C into warm water).** 100 g of ice at −10 °C is dropped into 200 g of water at 50 °C in an insulated vessel of negligible heat capacity. Find the final state.\n\n1. Heat available if the water cools to 0 °C: $0.2 \\times 4200 \\times 50 = 42\\,000$ J.\n2. Heat to warm the ice to 0 °C: $0.1 \\times 2100 \\times 10 = 2100$ J. Heat to melt it: $0.1 \\times 336\\,000 = 33\\,600$ J. Total $35\\,700$ J. *Why this step:* this is the method callout. Because $42\\,000 > 35\\,700$, all the ice melts.\n3. Now write the balance with final temperature $\\theta$: heat lost by the water = heat gained by the ice.",
    },
    { type: "math", latex: "0.2 \\times 4200\\,(50 - \\theta) = 2100 + 33\\,600 + 0.1 \\times 4200\\,\\theta \\;\\Rightarrow\\; 42\\,000 - 840\\theta = 35\\,700 + 420\\theta" },
    {
      type: "text",
      content:
        "4. $6300 = 1260\\,\\theta$, so $\\theta = 5$ °C: 300 g of water at 5 °C.\n\n**Worked example 2 (too much ice).** 200 g of ice at 0 °C is added to 200 g of water at 50 °C.\n\n1. Available: 42 000 J. Needed to melt all the ice: $0.2 \\times 336\\,000 = 67\\,200$ J. Not enough. *Why this step:* if you wrote the balance anyway you would get a negative final temperature, a sure sign the ice did not all melt.\n2. Ice melted $= 42\\,000/336\\,000 = 0.125$ kg. The final state is 0 °C, with 325 g of water and 75 g of ice.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (steam into water).** 10 g of steam at 100 °C is passed into 300 g of water at 20 °C. Find the final temperature.\n\n1. Steam gives up latent heat, $0.01 \\times 2.26\\times10^{6} = 22\\,600$ J, then the condensed water cools from 100 °C to $\\theta$. *Why this step:* steam releases its latent heat first, at 100 °C, before its temperature can fall.\n2. Balance: $22\\,600 + 0.01 \\times 4200\\,(100 - \\theta) = 0.3 \\times 4200\\,(\\theta - 20)$.\n3. $22\\,600 + 4200 - 42\\theta = 1260\\theta - 25\\,200 \\Rightarrow 52\\,000 = 1302\\,\\theta \\Rightarrow \\theta \\approx 39.9$ °C.\n4. Just 10 g of steam warmed 300 g of water by 20 °C. This is why a steam burn is far worse than a burn from boiling water.\n\n**Worked example 4 (a bullet that melts, JEE).** A lead bullet at 27 °C hits a steel plate and stops. What minimum speed melts it completely, if all its kinetic energy becomes heat in the bullet? (Lead: $c = 130$ J/(kg·K), melting point 327 °C, $L_f = 2.5\\times10^{4}$ J/kg.)\n\n1. Heat per kilogram: $130 \\times 300 + 25\\,000 = 64\\,000$ J/kg. *Why this step:* work per kilogram lets the mass cancel.\n2. $\\tfrac12 v^2 = 64\\,000 \\Rightarrow v = \\sqrt{128\\,000} \\approx 358$ m/s.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"adding heat always raises temperature\"",
      content:
        "During a change of phase, heat goes into breaking molecular bonds, not into speeding up the molecules, and the temperature stays fixed. A pot of boiling water stays at 100 °C no matter how high the flame; the flame only makes it boil faster. Turning up the gas under a boiling pot of dal wastes fuel.",
    },
    {
      type: "quiz",
      id: "owt4-3-q1",
      variant: "practice",
      question: "How much heat is needed to warm 2 kg of water from 25 °C to 40 °C ($c = 4200$ J/(kg·K))?",
      options: [
        { text: "$63$ kJ", feedback: "That is for 1 kg. There are 2 kg." },
        { text: "$336$ kJ", feedback: "That is the heat needed to *melt* 1 kg of ice, unrelated here." },
        { text: "$126$ kJ", correct: true, feedback: "$Q = 2 \\times 4200 \\times 15 = 126\\,000$ J." },
        { text: "$546$ kJ", feedback: "That adds the temperatures ($25 + 40 = 65$). The rise is $40 - 25 = 15$ °C." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-3-q2",
      variant: "practice",
      question: "50 g of ice at 0 °C is added to 200 g of water at 30 °C. Assuming no heat is lost, what is the final temperature? ($L_f = 336$ kJ/kg, $c = 4200$ J/(kg·K))",
      options: [
        { text: "$0$ °C", feedback: "Check first: the water can give $25\\,200$ J; melting needs only $16\\,800$ J, so all the ice melts and there is heat to spare." },
        { text: "$8$ °C", correct: true, feedback: "$0.2 \\cdot 4200(30 - \\theta) = 16\\,800 + 0.05 \\cdot 4200\\,\\theta \\Rightarrow 8400 = 1050\\,\\theta$." },
        { text: "$24$ °C", feedback: "That mixes 200 g at 30 °C with 50 g at 0 °C as if it were water. You left out the latent heat." },
        { text: "$10$ °C", feedback: "After melting, the leftover 8400 J must warm all 250 g, not just 200 g." },
      ],
      hint: "First check whether all the ice melts.",
    },
    {
      type: "quiz",
      id: "owt4-3-q3",
      variant: "practice",
      question: "100 g of ice at 0 °C is mixed with 100 g of water at 40 °C. How much ice is left when equilibrium is reached?",
      options: [
        { text: "None", feedback: "The water can supply only $0.1 \\times 4200 \\times 40 = 16\\,800$ J; melting all the ice needs $33\\,600$ J." },
        { text: "$50$ g", correct: true, feedback: "$16\\,800/336\\,000 = 0.05$ kg melts, leaving 50 g of ice at 0 °C." },
        { text: "$75$ g", feedback: "You may have used $L_f = 672$ kJ/kg or half the available heat. Exactly 50 g melts." },
        { text: "$100$ g", feedback: "Some ice must melt: the warm water gives up heat as it cools to 0 °C." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-3-q4",
      variant: "concept",
      question: "A beaker of ice–water mixture is heated gently and stirred. While ice remains, the thermometer",
      options: [
        { text: "rises slowly and steadily.", feedback: "Heat is going into melting, which happens at constant temperature." },
        { text: "stays at 0 °C.", correct: true, feedback: "The heat breaks bonds in the ice; the temperature only rises once all the ice has melted." },
        { text: "falls, because melting absorbs heat.", feedback: "Melting absorbs the heat being supplied, so the temperature stays fixed; it does not fall." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-3-q5",
      variant: "practice",
      question: "A copper calorimeter has mass 200 g ($c = 400$ J/(kg·K)). What is its water equivalent?",
      options: [
        { text: "200 g", feedback: "Copper holds far less heat per kilogram than water, so its water equivalent is smaller than its mass." },
        { text: "About 2100 g", feedback: "That is $200 \\times 4200/400$, upside down." },
        { text: "About 19 g", correct: true, feedback: "$m_w = 200 \\times 400/4200 \\approx 19$ g: it absorbs heat like 19 g of water." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "conduction",
  title: "4.4 · Conduction",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Stir hot tea with a steel spoon and the handle soon gets hot; a wooden spoon's handle stays cool. Nothing flows along the spoon, no material moves, yet energy travels from the hot end to the cold end. In a solid, faster-vibrating atoms at the hot end jostle their neighbours, which jostle theirs; in metals, free electrons carry the energy much more quickly. This is **conduction**.",
    },
    {
      type: "text",
      content:
        "**Fourier's law.** Take a slab of area $A$ and thickness $L$ with faces held at $T_1 > T_2$. Once the temperatures inside stop changing (the **steady state**), the rate of heat flow $H = dQ/dt$ is found experimentally to be proportional to the area and to the temperature drop, and inversely proportional to the thickness:",
    },
    { type: "math", latex: "H = \\frac{dQ}{dt} = \\frac{kA\\,(T_1 - T_2)}{L} \\qquad\\text{or, locally,}\\qquad H = -kA\\frac{dT}{dx}" },
    {
      type: "callout",
      variant: "definition",
      title: "Thermal conductivity and thermal resistance",
      content:
        "$k$ is the **thermal conductivity**, unit W/(m·K): copper about 400, steel about 50, glass about 0.8, brick about 0.6, wood about 0.1, air about 0.025.\n$dT/dx$ is the **temperature gradient**. In the steady state the same $H$ passes through every cross-section, so in a uniform slab the temperature falls linearly.\nThe **thermal resistance** of a slab is $R = \\dfrac{L}{kA}$, so that $H = \\dfrac{\\Delta T}{R}$.",
    },
    {
      type: "text",
      content:
        "$H = \\Delta T/R$ is Ohm's law, $I = V/R$, with temperature difference playing voltage and heat current playing electric current. Everything you will learn about combining resistors in the electricity course already works here:",
    },
    {
      type: "table",
      headers: ["Arrangement", "What is common", "Combination", "Equivalent conductivity"],
      rows: [
        ["Series (slabs stacked, heat passes through each in turn)", "the heat current $H$", "$R = R_1 + R_2$", "$k_{\\text{eq}} = \\dfrac{L_1 + L_2}{L_1/k_1 + L_2/k_2}$ (equal areas)"],
        ["Parallel (slabs side by side between the same two faces)", "the temperature difference", "$\\dfrac1R = \\dfrac1{R_1} + \\dfrac1{R_2}$", "$k_{\\text{eq}} = \\dfrac{k_1A_1 + k_2A_2}{A_1 + A_2}$ (equal lengths)"],
      ],
    },
    {
      type: "text",
      content:
        "In series, the temperature drop across each slab is proportional to its resistance, just as voltage divides across series resistors. The machine below takes two slabs of **equal thickness** in series, hot face at 100 °C (slab 1) and cold face at 0 °C (slab 2), and gives the junction temperature for any conductivity ratio $k_1/k_2$. Equal heat currents give $k_1(100 - T) = k_2(T - 0)$, so $T = \\dfrac{100\\,k_1}{k_1 + k_2}$.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "100*x/(x + 1)",
        exprLatex: "T_{\\text{junction}} = \\frac{100\\,k_1}{k_1 + k_2}",
        min: 0.1,
        max: 10,
        step: 0.1,
        initial: 1,
        inputLabel: "Ratio k₁/k₂",
        outputLabel: "Junction temperature (°C)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: equal conductivities put the junction halfway, at 50 °C. Make slab 1 the better conductor (ratio 4) and the junction rises to 80 °C: a good conductor needs only a small temperature drop to pass the same heat, so most of the drop happens across the poor conductor. That is how insulation works: one poor layer carries almost all the temperature difference.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (two slabs in series).** A wall is made of 10 cm of material A ($k = 0.8$ W/(m·K)) and 5 cm of material B ($k = 0.2$ W/(m·K)), area 1 m². The outer face of A is at 100 °C and the outer face of B at 0 °C. Find the heat current and the interface temperature.\n\n1. Resistances: $R_A = \\dfrac{0.1}{0.8 \\times 1} = 0.125$ K/W, $R_B = \\dfrac{0.05}{0.2 \\times 1} = 0.25$ K/W. *Why this step:* resistances in series simply add, so compute them first.\n2. $H = \\dfrac{100}{0.125 + 0.25} = \\dfrac{100}{0.375} \\approx 267$ W.\n3. Drop across A: $H R_A = 266.7 \\times 0.125 \\approx 33.3$ °C, so the interface is at $100 - 33.3 \\approx 66.7$ °C. The drops divide $1 : 2$, like the resistances.\n\n**Worked example 2 (rods in parallel).** A copper rod ($k = 400$) and a steel rod ($k = 50$), each 0.5 m long with cross-section 1 cm², join the same hot and cold reservoirs at 100 °C and 0 °C.\n\n1. Copper: $H = \\dfrac{400 \\times 10^{-4} \\times 100}{0.5} = 8$ W. Steel: $\\dfrac{50 \\times 10^{-4} \\times 100}{0.5} = 1$ W. *Why this step:* in parallel each rod feels the full 100 °C difference, so treat them independently.\n2. Total 9 W. Equivalently $k_{\\text{eq}} = \\dfrac{400 + 50}{2} = 225$ W/(m·K) for a rod of double area.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a window).** A glass pane of area 2 m² and thickness 5 mm ($k = 0.8$) separates a room at 20 °C from air at 10 °C (take the glass faces at those temperatures).\n\n1. $H = \\dfrac{0.8 \\times 2 \\times 10}{0.005} = 3200$ W. *Why this step:* thin glass has a tiny resistance, which is why real window faces are nowhere near the room and outside air temperatures: thin still-air layers on each side supply most of the insulation.\n\n**Worked example 4 (ice growing on a lake, JEE Advanced).** Air above a pond is at $-10$ °C; the water below the ice is at 0 °C. How long does the ice take to thicken from 1 cm to 2 cm, and from 2 cm to 3 cm? ($k_{\\text{ice}} = 2.1$ W/(m·K), $\\rho_{\\text{ice}} = 900$ kg/m³, $L_f = 3.36\\times10^{5}$ J/kg.)\n\n1. When the ice is $x$ thick, heat is conducted up through it at $H = \\dfrac{kA\\theta}{x}$, with $\\theta = 10$ K. That heat comes from water freezing at the bottom: a layer $dx$ releases $\\rho A\\,dx\\,L$. *Why this step:* the rate of freezing is limited by how fast the latent heat can be conducted away.\n2. $\\rho A L\\,dx = \\dfrac{kA\\theta}{x}\\,dt \\Rightarrow dt = \\dfrac{\\rho L}{k\\theta}\\,x\\,dx$, so",
    },
    { type: "math", latex: "t = \\frac{\\rho L}{2k\\theta}\\big(x_2^2 - x_1^2\\big)" },
    {
      type: "text",
      content:
        "3. From 1 cm to 2 cm: $t = \\dfrac{900 \\times 3.36\\times10^{5}}{2 \\times 2.1 \\times 10}\\,(4 - 1)\\times10^{-4} = \\dfrac{3.024\\times10^{8}}{42} \\times 3\\times10^{-4} = 2160$ s $= 36$ min.\n4. From 2 cm to 3 cm the factor is $9 - 4 = 5$ instead of 3, so 60 min. Thicker ice insulates better, so it grows more slowly: time goes as thickness squared.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a better conductor always feels hotter\"",
      content:
        "A good conductor feels **more extreme**, not hotter: it feels colder than wood when both are below skin temperature (the metal bench) and hotter than wood when both are above it (a car's metal roof in the sun). Your skin senses the rate of heat flow, and a good conductor moves heat into or out of your hand faster, whichever way it is going.",
    },
    {
      type: "quiz",
      id: "owt4-4-q1",
      variant: "practice",
      question: "A slab of area 2 m², thickness 10 cm and conductivity 0.5 W/(m·K) has faces at 40 °C and 10 °C. What is the rate of heat flow?",
      options: [
        { text: "$3$ W", feedback: "You multiplied by the thickness instead of dividing." },
        { text: "$30\\,000$ W", feedback: "10 cm is 0.1 m, not 0.001 m." },
        { text: "$150$ W", feedback: "That uses an area of 1 m². The slab has area 2 m²." },
        { text: "$300$ W", correct: true, feedback: "$H = \\frac{0.5 \\times 2 \\times 30}{0.1} = 300$ W." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-4-q2",
      variant: "practice",
      question: "Two slabs of equal thickness are placed face to face. Slab P ($k$) has its outer face at 100 °C; slab Q ($2k$) has its outer face at 0 °C. What is the interface temperature?",
      options: [
        { text: "$50$ °C", feedback: "That would need equal conductivities." },
        { text: "$66.7$ °C", feedback: "That puts the larger drop across the better conductor. The poorer conductor, P, carries the larger drop." },
        { text: "$33.3$ °C", correct: true, feedback: "$k(100 - T) = 2k(T - 0) \\Rightarrow 100 = 3T$, so $T \\approx 33.3$ °C: 66.7 °C drops across P." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-4-q3",
      variant: "practice",
      question: "Two slabs of equal thickness and area, with conductivities $k$ and $3k$, are placed in series. What is their equivalent conductivity?",
      options: [
        { text: "$2k$", feedback: "That is the arithmetic mean, correct for *parallel* slabs of equal area. In series the resistances add." },
        { text: "$1.5k$", correct: true, feedback: "$k_{\\text{eq}} = \\frac{2L}{L/k + L/3k} = \\frac{2}{4/3}k = 1.5k$." },
        { text: "$4k$", feedback: "Conductivities do not add in series; resistances do." },
        { text: "$0.75k$", feedback: "That is the combined $1/(1/k + 1/3k)$ without accounting for the doubled thickness." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-4-q4",
      variant: "concept",
      question: "On a cold morning, why does a steel railing feel colder than a wooden bench beside it?",
      options: [
        { text: "The steel is at a lower temperature than the wood.", feedback: "Both have been outside all night and are at the same temperature." },
        { text: "Steel conducts heat away from your hand much faster than wood.", correct: true, feedback: "Your skin senses the rate of heat loss, not the object's temperature." },
        { text: "Steel has a higher specific heat than wood.", feedback: "Steel's specific heat is actually lower. The key property is conductivity." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-4-q5",
      variant: "practice",
      question: "A 1 cm layer of ice forms on a pond in 1 hour (starting from no ice). With the air temperature unchanged, how much longer does it take to reach 3 cm?",
      options: [
        { text: "2 hours", feedback: "Growth slows down as the ice thickens: time goes as thickness squared." },
        { text: "8 hours", correct: true, feedback: "$t \\propto x^2$: 3 cm needs 9 hours in total, so 8 more hours." },
        { text: "9 hours", feedback: "9 hours is the *total* time from zero. The question asks how much longer after the first hour." },
        { text: "3 hours", feedback: "That assumes steady growth. The ice layer insulates itself, so it slows." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "convection-and-radiation",
  title: "4.5 · Convection, Radiation and Cooling",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "The Sun warms your face across 150 million kilometres of empty space. No material carries that energy; it comes as electromagnetic radiation. Closer to home, a pot of water heats all the way through even though the flame touches only the bottom, because hot water rises and carries its energy with it. These are the other two ways heat travels: **radiation** and **convection**.",
    },
    {
      type: "text",
      content:
        "**Convection** is heat carried by the bulk motion of a fluid. Heated fluid expands, becomes less dense and rises; cooler fluid sinks to replace it. On a sunny day the land warms faster than the sea, air above the land rises, and cooler air from the sea flows in: a **sea breeze**. At night the land cools faster and the flow reverses. Monsoons are the same idea on a continental scale. Convection needs gravity (to make light fluid rise) and a fluid; it cannot happen in a solid or in space.",
    },
    {
      type: "text",
      content:
        "**Radiation.** Every body above absolute zero emits electromagnetic waves because its charged particles jiggle. A body that absorbs all radiation falling on it is a **black body**, and it turns out to be the best possible emitter too. A small hole in a hollow box is a near-perfect black body: radiation that enters bounces around inside and is almost all absorbed.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Stefan–Boltzmann law",
      content:
        "A body of surface area $A$ at absolute temperature $T$ radiates power $P = e\\sigma A T^4$.\n$\\sigma = 5.67\\times10^{-8}$ W/(m²·K⁴); $e$ is the **emissivity**, 1 for a black body, between 0 and 1 for real surfaces.\nIn surroundings at $T_0$ it also absorbs, so the **net** loss is $P_{\\text{net}} = e\\sigma A\\,(T^4 - T_0^4)$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Kirchhoff's law of radiation",
      content:
        "At a given temperature and wavelength, the ratio of emissive power to absorptivity is the same for all bodies. So **a good absorber is a good emitter**: $e = a$. A shiny surface absorbs poorly and emits poorly (thermos flasks are silvered); a dull black surface does both well.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Wien's displacement law",
      content:
        "The spectrum of a black body peaks at a wavelength $\\lambda_m$ inversely proportional to its temperature: $\\lambda_m T = b$, with $b = 2.9\\times10^{-3}$ m·K.\nA stove ring glows dull red at about 1000 K; the Sun's surface (about 5800 K) peaks near 500 nm, in the green-yellow; blue-white stars are hotter than red ones.",
    },
    {
      type: "text",
      content:
        "**Newton's law of cooling from Stefan.** When a body is only slightly warmer than its surroundings, $T = T_0 + \\Delta T$ with $\\Delta T \\ll T_0$, factorise the net loss:",
    },
    { type: "math", latex: "T^4 - T_0^4 = (T - T_0)(T + T_0)(T^2 + T_0^2) \\approx \\Delta T \\cdot 2T_0 \\cdot 2T_0^2 = 4T_0^3\\,\\Delta T" },
    {
      type: "text",
      content:
        "So the net loss is $4e\\sigma A T_0^3\\,\\Delta T$: **proportional to the temperature excess**. Convection losses also grow roughly in proportion to $\\Delta T$ for small differences. Dividing by the heat capacity $mc$ gives the rate of cooling:",
    },
    { type: "math", latex: "\\frac{dT}{dt} = -K\\,(T - T_0) \\quad\\Longrightarrow\\quad T(t) = T_0 + (T_i - T_0)\\,e^{-Kt}" },
    {
      type: "text",
      content:
        "The excess above room temperature decays exponentially, exactly like the amplitude of a damped oscillator in Chapter 0. The graph below shows a cup of tea at 80 °C in a room at 20 °C with $K = 0.1$ per minute. Drag the point along the curve.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "20 + 60*exp(-0.1*x)",
        exprLatex: "\\theta(t) = 20 + 60e^{-0.1t}",
        window: { xmin: 0, xmax: 20, ymin: 0, ymax: 90 },
        initial: 5,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the tea cools fastest at first (the curve is steepest at $t = 0$) and ever more slowly as it approaches 20 °C. The excess halves every $\\ln 2/0.1 \\approx 6.9$ minutes: 60 °C of excess at the start, 30 °C at about 6.9 min (tea at 50 °C), 15 °C at about 13.9 min. It never quite reaches room temperature.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The JEE averaging shortcut",
      content:
        "For a cooling from $\\theta_1$ to $\\theta_2$ in time $t$, use the average temperature in the rate: $\\dfrac{\\theta_1 - \\theta_2}{t} = K\\left(\\dfrac{\\theta_1 + \\theta_2}{2} - \\theta_0\\right)$. It is an approximation to the exponential, very good when the drop is small compared with the excess, and it is what most JEE answer keys use.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (doubling the temperature).** A black sphere's absolute temperature is doubled. By what factor does its radiated power change?\n\n1. $P \\propto T^4$, so the factor is $2^4 = 16$. *Why this step:* Stefan's law always uses **kelvin**. Doubling from 100 °C to 200 °C is not doubling $T$ (373 K to 473 K).\n\n**Worked example 2 (the Sun's temperature).** The Sun's spectrum peaks at about 500 nm. Estimate its surface temperature.\n\n1. $T = b/\\lambda_m = \\dfrac{2.9\\times10^{-3}}{5\\times10^{-7}} = 5800$ K.\n\n**Worked example 3 (a hot plate).** A black plate of area 0.01 m² is at 1000 K. How much power does it radiate (ignoring what it absorbs)?\n\n1. $P = \\sigma AT^4 = 5.67\\times10^{-8} \\times 0.01 \\times 10^{12} = 567$ W. *Why this step:* $T^4 = (10^3)^4 = 10^{12}$; keep powers of ten separate to avoid slips.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (Newton's cooling, JEE style).** A body cools from 80 °C to 60 °C in 5 minutes in a room at 20 °C. How long does it take to cool from 60 °C to 40 °C?\n\n1. Averaging method, first interval: $\\dfrac{80 - 60}{5} = K(70 - 20) \\Rightarrow 4 = 50K \\Rightarrow K = 0.08$ per minute.\n2. Second interval: $\\dfrac{60 - 40}{t} = 0.08\\,(50 - 20) = 2.4 \\Rightarrow t = \\dfrac{20}{2.4} \\approx 8.3$ min. *Why this step:* the same 20 °C drop now happens at a smaller average excess, so it takes longer.\n3. Exact exponential check: $e^{-5K'} = 40/60$ and $e^{-K't} = 20/40$, so $t = 5\\,\\dfrac{\\ln 2}{\\ln 1.5} \\approx 8.5$ min. The averaging shortcut is close.\n\n**Worked example 5 (size and temperature together).** Sphere B has twice the radius of sphere A but half its absolute temperature. Compare their radiated powers.\n\n1. $P \\propto r^2T^4$: $\\dfrac{P_B}{P_A} = 2^2 \\times \\left(\\tfrac12\\right)^4 = \\dfrac{4}{16} = \\dfrac14$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a body at room temperature does not radiate\"",
      content:
        "Everything above absolute zero radiates. At 300 K the radiation is in the far infrared (Wien: $\\lambda_m \\approx 10$ µm), so we cannot see it, but thermal cameras can. You feel no net effect because you absorb about as much from the walls as they absorb from you: $T^4 - T_0^4 \\approx 0$, not $T^4 = 0$.",
    },
    {
      type: "quiz",
      id: "owt4-5-q1",
      variant: "practice",
      question: "A black body at 300 K is heated to 600 K. By what factor does its emitted power increase?",
      options: [
        { text: "$2$", feedback: "Power goes as $T^4$, not $T$." },
        { text: "$4$", feedback: "That uses $T^2$. Stefan's law is $T^4$." },
        { text: "$16$", correct: true, feedback: "$(600/300)^4 = 2^4 = 16$." },
        { text: "$8$", feedback: "That uses $T^3$. The exponent is 4." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-5-q2",
      variant: "practice",
      question: "A star's spectrum peaks at 290 nm. Estimate its surface temperature ($b = 2.9\\times10^{-3}$ m·K).",
      options: [
        { text: "$10\\,000$ K", correct: true, feedback: "$T = 2.9\\times10^{-3}/2.9\\times10^{-7} = 10^{4}$ K, a blue-white star." },
        { text: "$1000$ K", feedback: "290 nm is $2.9\\times10^{-7}$ m, not $2.9\\times10^{-6}$ m." },
        { text: "$5800$ K", feedback: "That is the Sun, which peaks near 500 nm. A shorter peak wavelength means a hotter star." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-5-q3",
      variant: "practice",
      question: "A body cools from 70 °C to 50 °C in 4 minutes in a room at 30 °C. What will its temperature be after another 4 minutes?",
      options: [
        { text: "$30$ °C", feedback: "Cooling slows as the body approaches room temperature; it never simply drops the same 20 °C again." },
        { text: "$40$ °C", correct: true, feedback: "The excess halved from 40 to 20 °C in 4 min, so in the next 4 min it halves again to 10 °C: $30 + 10 = 40$ °C." },
        { text: "$35$ °C", feedback: "The excess halves each 4 minutes: 40 → 20 → 10 °C, giving 40 °C." },
        { text: "$45$ °C", feedback: "Too slow. The excess above the room drops by the same *factor* in equal times." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-5-q4",
      variant: "concept",
      question: "A tile with black and white patches is heated to 1000 K in a dark room. Which patches glow brighter?",
      options: [
        { text: "The white patches, because they reflect more light.", feedback: "In a dark room there is nothing to reflect. Emission follows absorption, and white absorbs poorly." },
        { text: "The black patches, because good absorbers are good emitters.", correct: true, feedback: "Kirchhoff's law: emissivity equals absorptivity." },
        { text: "Both equally, since they are at the same temperature.", feedback: "Same temperature, but different emissivities, so different emitted power." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-5-q5",
      variant: "concept",
      question: "Why do you not feel yourself losing energy by radiation in a room at 25 °C, even though your skin is at about 33 °C?",
      options: [
        { text: "Bodies below 100 °C do not radiate.", feedback: "Everything above 0 K radiates; your skin radiates strongly in the infrared." },
        { text: "You also absorb radiation from the walls, so the net loss $e\\sigma A(T^4 - T_0^4)$ is modest.", correct: true, feedback: "What matters is the difference $T^4 - T_0^4$, which is small when $T$ and $T_0$ are close." },
        { text: "Air blocks infrared radiation completely.", feedback: "Air is largely transparent to the infrared your body emits; thermal cameras rely on it." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "kinetic-theory-of-gases",
  title: "4.6 · Kinetic Theory of Gases",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Pump up a bicycle tyre and it becomes hard. What is pushing on the inside of the rubber? Nothing but air molecules, around $10^{25}$ of them in every cubic metre, each moving at roughly the speed of a rifle bullet and bouncing off the walls billions of times a second. Kinetic theory takes that picture seriously and derives pressure and temperature from Newton's laws alone.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Assumptions of the kinetic model of an ideal gas",
      content:
        "1. A gas is a very large number of identical molecules in random motion.\n2. The molecules are tiny compared with the distances between them (their own volume is negligible).\n3. They exert no forces on each other except during collisions, which are brief and perfectly elastic.\n4. Between collisions they move in straight lines, obeying Newton's laws.\n5. The container walls are rigid; collisions with them are elastic.",
    },
    {
      type: "text",
      content:
        "**Deriving the pressure.** Put $N$ molecules, each of mass $m$, in a cube of side $L$. Follow one molecule with velocity components $(v_x, v_y, v_z)$ and watch the right-hand wall.\n\n1. When it hits the wall its $x$-velocity reverses from $v_x$ to $-v_x$, so the wall receives momentum $2mv_x$.\n2. It returns to the same wall after crossing the box and back, a distance $2L$, which takes $2L/v_x$.\n3. So the average force this one molecule exerts on the wall is $\\dfrac{2mv_x}{2L/v_x} = \\dfrac{mv_x^2}{L}$.\n4. Add all $N$ molecules: $F = \\dfrac{m}{L}\\sum v_x^2 = \\dfrac{Nm}{L}\\,\\overline{v_x^2}$.\n5. Motion is random, so no direction is special: $\\overline{v_x^2} = \\overline{v_y^2} = \\overline{v_z^2} = \\tfrac13\\overline{v^2}$.\n6. Pressure is force over the wall's area $L^2$, and $L^3 = V$:",
    },
    { type: "math", latex: "p = \\frac{F}{L^2} = \\frac{1}{3}\\,\\frac{Nm}{V}\\,\\overline{v^2} = \\frac13\\rho\\,v_{\\text{rms}}^2 \\qquad (v_{\\text{rms}} = \\sqrt{\\overline{v^2}})" },
    {
      type: "text",
      content:
        "(Collisions between molecules do not spoil this: in an elastic collision momentum is simply handed from one molecule to another, and the average is unchanged.) Now compare with the experimental gas law, $pV = Nk_BT$ with Boltzmann's constant $k_B = 1.38\\times10^{-23}$ J/K:",
    },
    { type: "math", latex: "pV = \\tfrac13 Nm\\,\\overline{v^2} = \\tfrac23 N\\Big(\\tfrac12 m\\overline{v^2}\\Big) = Nk_BT \\quad\\Longrightarrow\\quad \\tfrac12 m\\overline{v^2} = \\tfrac32 k_BT" },
    {
      type: "callout",
      variant: "definition",
      title: "What temperature is",
      content:
        "The average translational kinetic energy of a gas molecule is $\\overline{\\text{KE}} = \\tfrac32 k_BT$. **Absolute temperature is a measure of the average kinetic energy of random molecular motion**, the same for every gas at the same $T$.\nPer mole: $\\tfrac32 RT$, since $R = N_Ak_B = 8.314$ J/(mol·K).",
    },
    {
      type: "text",
      content:
        "**Three molecular speeds.** Solving for the speed, with $M = N_Am$ the molar mass in kg/mol, gives $v_{\\text{rms}}$. The molecules actually have a spread of speeds (the Maxwell distribution), and two other averages are also used:",
    },
    {
      type: "math",
      latex: "v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}},\\qquad v_{\\text{avg}} = \\sqrt{\\frac{8RT}{\\pi M}},\\qquad v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}},\\qquad v_{\\text{mp}} : v_{\\text{avg}} : v_{\\text{rms}} \\approx 1 : 1.13 : 1.22",
    },
    {
      type: "text",
      content:
        "The lab below animates the molecules in a box closed by a piston. Press Play. Raise the temperature and watch the speeds and the pressure; then change the volume at fixed temperature.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-thermo-lab",
        mode: "kinetic",
        gasToggle: false,
        molarMass: 32,
        temperature: 300,
        volume: 25,
        sliders: ["temperature", "volume"],
        caption:
          "Oxygen (M = 32 g/mol), 1 mol. Heat it and every molecule speeds up; squeeze it and the speeds stay the same but the molecules hit the piston more often.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at 300 K the readout gives $v_{\\text{rms}} \\approx 484$ m/s for oxygen. Quadruple the temperature to 1200 K and $v_{\\text{rms}}$ only **doubles**, to about 967 m/s. Halving the volume at fixed temperature leaves every speed readout unchanged but doubles the pressure: each molecule is just as fast, but the box is shorter, so it returns to the piston twice as often and each square metre of wall receives twice as many hits per second.",
    },
    {
      type: "text",
      content:
        "**Dalton's law recovered.** In a mixture, each gas's molecules bounce off the walls independently, so the total pressure is the sum of the pressures each gas would exert alone: $p = p_1 + p_2 + \\cdots$. **Mean free path.** A molecule of diameter $d$ travels on average $\\lambda = \\dfrac{1}{\\sqrt2\\,\\pi d^2 n}$ between collisions, where $n$ is the number per unit volume. For air at room conditions that is about 0.1 µm, hundreds of molecular diameters, which is why smells spread slowly even though molecules move at hundreds of m/s: they keep bumping into each other.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 ($v_{\\text{rms}}$ of oxygen).** Find $v_{\\text{rms}}$ for O₂ at 300 K.\n\n1. $M = 32$ g/mol $= 0.032$ kg/mol. *Why this step:* $R$ is in J/(mol·K), so $M$ must be in kg/mol for the answer to come out in m/s.\n2. $v_{\\text{rms}} = \\sqrt{\\dfrac{3 \\times 8.314 \\times 300}{0.032}} = \\sqrt{233\\,800} \\approx 484$ m/s.\n3. For comparison, $v_{\\text{avg}} \\approx 445$ m/s and $v_{\\text{mp}} \\approx 395$ m/s.\n\n**Worked example 2 (hydrogen matching oxygen).** At what temperature does H₂ have the same $v_{\\text{rms}}$ as O₂ at 27 °C?\n\n1. Equal $v_{\\text{rms}}$ means equal $T/M$: $\\dfrac{T_H}{2} = \\dfrac{300}{32}$. *Why this step:* $v_{\\text{rms}}^2 = 3RT/M$, so only the ratio $T/M$ matters.\n2. $T_H = 18.75$ K, about $-254$ °C. Light molecules are fast.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (speeds doubled).** In a sealed rigid container every molecule's speed is somehow doubled. What happens to the pressure and the temperature?\n\n1. $p = \\tfrac13\\rho v_{\\text{rms}}^2$ with $\\rho$ fixed: $v_{\\text{rms}}$ doubles, so $p$ becomes **4** times as large.\n2. $T \\propto \\overline{\\text{KE}} \\propto v_{\\text{rms}}^2$, so $T$ also becomes 4 times as large. *Why this step:* consistent with $pV = nRT$ at fixed $V$: $p \\propto T$.\n\n**Worked example 4 (energy of a mole).** Find the average translational KE of one molecule and of one mole of any gas at 300 K.\n\n1. Per molecule: $\\tfrac32 k_BT = 1.5 \\times 1.38\\times10^{-23} \\times 300 \\approx 6.2\\times10^{-21}$ J.\n2. Per mole: $\\tfrac32 RT = 1.5 \\times 8.314 \\times 300 \\approx 3740$ J. Same for helium, oxygen or carbon dioxide.\n\n**Worked example 5 (rms is not the mean).** Five molecules have speeds 1, 2, 3, 4 and 5 km/s. Find $v_{\\text{avg}}$ and $v_{\\text{rms}}$.\n\n1. $v_{\\text{avg}} = 15/5 = 3$ km/s.\n2. $v_{\\text{rms}} = \\sqrt{(1 + 4 + 9 + 16 + 25)/5} = \\sqrt{11} \\approx 3.32$ km/s. *Why this step:* squaring gives extra weight to the fast molecules, so $v_{\\text{rms}}$ always exceeds $v_{\\text{avg}}$ unless all speeds are equal.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"doubling the temperature doubles $v_{\\text{rms}}$\"",
      content:
        "Temperature is proportional to kinetic energy, which goes as speed **squared**. Doubling $T$ multiplies $v_{\\text{rms}}$ by $\\sqrt2 \\approx 1.41$; to double $v_{\\text{rms}}$ you must quadruple $T$. And 'doubling' must be done in kelvin: 27 °C to 54 °C is 300 K to 327 K, only a 9% increase.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"all molecules in a gas move at the same speed\"",
      content:
        "At any instant some molecules are nearly at rest and a few are moving several times faster than average. $v_{\\text{rms}}$, $v_{\\text{avg}}$ and $v_{\\text{mp}}$ are three different averages of this spread. The fastest few are the ones that escape from a liquid's surface, which is why evaporation cools what is left behind.",
    },
    {
      type: "quiz",
      id: "owt4-6-q1",
      variant: "practice",
      question: "A gas is heated from 27 °C to 927 °C. By what factor does $v_{\\text{rms}}$ change?",
      options: [
        { text: "$4$", feedback: "$T$ quadruples, but $v_{\\text{rms}}$ goes as the square root of $T$." },
        { text: "$\\sqrt{34.3}$", feedback: "That uses Celsius ($927/27$). Kinetic theory needs absolute temperature." },
        { text: "$16$", feedback: "That squares the factor instead of taking the square root." },
        { text: "$2$", correct: true, feedback: "300 K to 1200 K is a factor of 4 in $T$, and $v_{\\text{rms}} \\propto \\sqrt T$ gives 2." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-6-q2",
      variant: "practice",
      question: "What is the ratio $v_{\\text{rms}}(\\text{H}_2) : v_{\\text{rms}}(\\text{O}_2)$ at the same temperature?",
      options: [
        { text: "$16 : 1$", feedback: "That is the ratio of molar masses, inverted. Speeds go as $1/\\sqrt M$." },
        { text: "$4 : 1$", correct: true, feedback: "$\\sqrt{32/2} = \\sqrt{16} = 4$." },
        { text: "$1 : 4$", feedback: "The lighter molecule is the faster one." },
        { text: "$1 : 1$", feedback: "Their average *kinetic energies* are equal, not their speeds." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-6-q3",
      variant: "concept",
      question: "A gas is compressed to half its volume at constant temperature. What happens at the molecular level?",
      options: [
        { text: "The molecules move faster, so the pressure doubles.", feedback: "At constant temperature the average KE, and so the speeds, are unchanged." },
        { text: "The speeds are unchanged, but the molecules hit each square metre of wall twice as often.", correct: true, feedback: "Twice the number density means twice the collision rate with the walls, hence twice the pressure." },
        { text: "The molecules get smaller.", feedback: "Molecules keep their size; only the space between them shrinks." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-6-q4",
      variant: "concept",
      question: "Helium and oxygen are at the same temperature. Which statement is true?",
      options: [
        { text: "Their molecules have the same $v_{\\text{rms}}$.", feedback: "Same KE with different masses means different speeds: helium is faster." },
        { text: "Oxygen molecules have more translational KE because they are heavier.", feedback: "They are heavier but slower, and the KE comes out the same." },
        { text: "Their molecules have the same average translational kinetic energy.", correct: true, feedback: "$\\tfrac12 m\\overline{v^2} = \\tfrac32 k_BT$ depends only on $T$." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-6-q5",
      variant: "concept",
      question: "For a gas in equilibrium, which ordering of the three characteristic speeds is correct?",
      options: [
        { text: "$v_{\\text{mp}} < v_{\\text{avg}} < v_{\\text{rms}}$", correct: true, feedback: "In the ratio $\\sqrt2 : \\sqrt{8/\\pi} : \\sqrt3 \\approx 1.41 : 1.60 : 1.73$." },
        { text: "$v_{\\text{rms}} < v_{\\text{avg}} < v_{\\text{mp}}$", feedback: "Reversed. Squaring before averaging favours the fast molecules, so $v_{\\text{rms}}$ is largest." },
        { text: "All three are equal.", feedback: "They would be equal only if every molecule had the same speed, which never happens." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-6-q6",
      variant: "practice",
      question: "A gas of density 1.5 kg/m³ has $v_{\\text{rms}} = 500$ m/s. What pressure does it exert?",
      options: [
        { text: "$375$ kPa", feedback: "You left out the $\\tfrac13$, which comes from sharing $\\overline{v^2}$ among three directions." },
        { text: "$250$ Pa", feedback: "You used $v_{\\text{rms}}$ instead of $v_{\\text{rms}}^2$." },
        { text: "$125$ kPa", correct: true, feedback: "$p = \\tfrac13\\rho v_{\\text{rms}}^2 = \\tfrac13 \\times 1.5 \\times 250\\,000 = 1.25\\times10^{5}$ Pa." },
        { text: "$187.5$ kPa", feedback: "That uses $\\tfrac12$ instead of $\\tfrac13$." },
      ],
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "equipartition-and-heat-capacities",
  title: "4.7 · Degrees of Freedom and Equipartition",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Heat 1 mol of helium and 1 mol of nitrogen by the same 1 K, keeping the volume fixed. Nitrogen needs about 67% more heat. Both gases end up with the same average translational kinetic energy per molecule, $\\tfrac32 k_BT$, so where does nitrogen's extra energy go? Into **rotation**: a dumbbell-shaped N₂ molecule can also spin, and a single helium atom effectively cannot.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Degrees of freedom",
      content:
        "The **degrees of freedom** $f$ of a molecule are the independent quadratic terms in its energy: $\\tfrac12 mv_x^2$, $\\tfrac12 I\\omega_y^2$, $\\tfrac12 kx^2$ and so on.\nMonatomic (He, Ar): 3 translational, $f = 3$.\nRigid diatomic (N₂, O₂ near room temperature): 3 translational + 2 rotational (spin about the bond axis doesn't count), $f = 5$.\nDiatomic with vibration (high $T$): add 2 (vibrational KE and PE), $f = 7$.\nRigid non-linear polyatomic (H₂O, CH₄): 3 + 3, $f = 6$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The law of equipartition of energy",
      content:
        "In thermal equilibrium at temperature $T$, each degree of freedom holds, on average, $\\tfrac12 k_BT$ per molecule.\nSo the internal energy of $n$ moles of an ideal gas is $U = \\dfrac f2 nRT$, a function of $T$ alone.",
    },
    {
      type: "text",
      content:
        "Translational motion alone gives $3 \\times \\tfrac12 k_BT = \\tfrac32 k_BT$, exactly what kinetic theory found in 4.6. Equipartition generalises that result to every way a molecule can store energy.",
    },
    {
      type: "text",
      content:
        "**Heat capacities.** At constant volume the gas does no work, so all the heat raises $U$: $C_V = \\dfrac{1}{n}\\dfrac{dU}{dT} = \\dfrac f2 R$. At constant pressure the gas also expands and pushes back its surroundings (a forward link to 5.1). For $n$ moles heated by $dT$:",
    },
    { type: "math", latex: "nC_p\\,dT = \\underbrace{nC_V\\,dT}_{dU} + \\underbrace{p\\,dV}_{\\text{work}} = nC_V\\,dT + nR\\,dT \\quad\\Longrightarrow\\quad C_p - C_V = R \\quad(\\text{Mayer's relation})" },
    {
      type: "text",
      content:
        "(We used $pV = nRT$ at constant $p$: $p\\,dV = nR\\,dT$.) Then the ratio of heat capacities is $\\gamma = \\dfrac{C_p}{C_V} = \\dfrac{(f/2 + 1)R}{(f/2)R} = 1 + \\dfrac2f$.",
    },
    {
      type: "table",
      headers: ["Gas", "$f$", "$C_V$", "$C_p$", "$\\gamma = 1 + 2/f$"],
      rows: [
        ["Monatomic (He, Ne, Ar)", "3", "$\\tfrac32 R$", "$\\tfrac52 R$", "$\\tfrac53 \\approx 1.67$"],
        ["Rigid diatomic (N₂, O₂, H₂, air)", "5", "$\\tfrac52 R$", "$\\tfrac72 R$", "$\\tfrac75 = 1.4$"],
        ["Diatomic with vibration", "7", "$\\tfrac72 R$", "$\\tfrac92 R$", "$\\tfrac97 \\approx 1.29$"],
        ["Rigid non-linear polyatomic", "6", "$3R$", "$4R$", "$\\tfrac43 \\approx 1.33$"],
      ],
    },
    {
      type: "text",
      content:
        "Use the gas toggle in the lab below. At the same temperature and amount, the translational readouts are the same for both gases, but $U = \\frac f2 nRT$ is larger for the diatomic gas.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-thermo-lab",
        mode: "kinetic",
        gasToggle: true,
        molarMass: 28,
        temperature: 300,
        volume: 25,
        sliders: ["temperature"],
        caption:
          "1 mol of gas. Switch between monatomic and diatomic and compare U at the same temperature: the ratio is always 5 : 3.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at 300 K, $U \\approx 3.74$ kJ for the monatomic gas and $U \\approx 6.24$ kJ for the diatomic one, while the pressure $p = nRT/V$ is identical: pressure only 'sees' translational motion. Raise the temperature and both energies grow in proportion to $T$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Mixtures and solids",
      content:
        "**Mixture of ideal gases:** energies add, so $U = \\sum \\frac{f_i}{2}n_iRT$ and $C_{V,\\text{mix}} = \\dfrac{\\sum n_iC_{V,i}}{\\sum n_i}$; then $C_{p,\\text{mix}} = C_{V,\\text{mix}} + R$ and $\\gamma_{\\text{mix}} = C_{p,\\text{mix}}/C_{V,\\text{mix}}$. Never average the $\\gamma$ values directly.\n**Solids (Dulong–Petit):** each atom vibrates in 3 directions with KE and PE for each, $f = 6$, so $C = 3R \\approx 25$ J/(mol·K) for most solids near room temperature.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 ($\\gamma$ of a mixture).** Find $\\gamma$ for a mixture of 1 mol helium and 1 mol oxygen.\n\n1. $C_V = \\dfrac{1 \\times \\tfrac32 R + 1 \\times \\tfrac52 R}{2} = 2R$. *Why this step:* heat capacities add because energies add; $\\gamma$ values do not.\n2. $C_p = 2R + R = 3R$, so $\\gamma = 3R/2R = 1.5$. (Averaging $\\tfrac53$ and $\\tfrac75$ would wrongly give about 1.53.)\n\n**Worked example 2 (internal energy).** Find the internal energy of 2 mol of nitrogen at 300 K.\n\n1. Nitrogen at room temperature is rigid diatomic, $f = 5$.\n2. $U = \\tfrac52 nRT = 2.5 \\times 2 \\times 8.314 \\times 300 \\approx 12\\,470$ J $\\approx 12.5$ kJ.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (an uneven mixture).** 2 mol helium is mixed with 3 mol oxygen. Find $\\gamma$.\n\n1. $C_V = \\dfrac{2 \\times 1.5R + 3 \\times 2.5R}{5} = \\dfrac{3R + 7.5R}{5} = 2.1R$.\n2. $C_p = 3.1R$, so $\\gamma = 31/21 \\approx 1.48$. *Why this step:* the mixture's $\\gamma$ lies between 1.4 and 1.67, closer to oxygen's because there is more oxygen.\n\n**Worked example 4 (specific heat per kilogram).** Find $c_V$ and $c_p - c_V$ for nitrogen ($M = 0.028$ kg/mol).\n\n1. $c_V = C_V/M = 2.5 \\times 8.314/0.028 \\approx 742$ J/(kg·K).\n2. $c_p - c_V = R/M = 8.314/0.028 \\approx 297$ J/(kg·K). *Why this step:* Mayer's relation is $R$ per **mole**; per kilogram it becomes $R/M$.\n\n**Worked example 5 (Dulong–Petit).** Estimate the specific heat of copper ($M = 63.5$ g/mol).\n\n1. $C \\approx 3R = 24.9$ J/(mol·K), so $c = 24.9/0.0635 \\approx 393$ J/(kg·K). The measured value is 385 J/(kg·K).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"all ideal gases store the same energy at the same temperature\"",
      content:
        "All ideal gases have the same **translational** KE per molecule at a given $T$, and so the same pressure for the same $n$ and $V$. But their **internal energies** differ: a mole of diatomic gas holds $\\tfrac52 RT$, a mole of monatomic gas $\\tfrac32 RT$. That is why nitrogen needs more heat than helium for the same temperature rise.",
    },
    {
      type: "quiz",
      id: "owt4-7-q1",
      variant: "practice",
      question: "What is $\\gamma$ for a rigid diatomic ideal gas?",
      options: [
        { text: "$1.67$", feedback: "That is for a monatomic gas, $f = 3$." },
        { text: "$1.4$", correct: true, feedback: "$f = 5$, so $\\gamma = 1 + 2/5 = 7/5$." },
        { text: "$1.29$", feedback: "That includes vibration, $f = 7$, which is frozen out near room temperature." },
        { text: "$1.33$", feedback: "That is for a rigid non-linear polyatomic gas, $f = 6$." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-7-q2",
      variant: "practice",
      question: "1 mol of helium and 1 mol of oxygen are at the same temperature. What is the ratio of their internal energies $U_{\\text{He}} : U_{\\text{O}_2}$?",
      options: [
        { text: "$1 : 1$", feedback: "Their *translational* energies are equal; oxygen also rotates." },
        { text: "$3 : 5$", correct: true, feedback: "$\\tfrac32 RT : \\tfrac52 RT$." },
        { text: "$5 : 3$", feedback: "Reversed: the diatomic oxygen holds more." },
        { text: "$1 : 8$", feedback: "That is a mass ratio. Internal energy per mole does not depend on molar mass." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-7-q3",
      variant: "practice",
      question: "A gas has $\\gamma = 1.4$. How many degrees of freedom do its molecules have?",
      options: [
        { text: "$3$", feedback: "$f = 3$ gives $\\gamma = 5/3$." },
        { text: "$5$", correct: true, feedback: "$\\gamma = 1 + 2/f = 1.4 \\Rightarrow 2/f = 0.4 \\Rightarrow f = 5$." },
        { text: "$7$", feedback: "$f = 7$ gives $\\gamma = 9/7 \\approx 1.29$." },
        { text: "$4$", feedback: "$f = 4$ gives $\\gamma = 1.5$." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-7-q4",
      variant: "practice",
      question: "2 mol of helium are mixed with 1 mol of nitrogen. What is $\\gamma$ for the mixture?",
      options: [
        { text: "$1.58$", feedback: "That averages the $\\gamma$ values weighted by moles. Average the heat capacities instead." },
        { text: "$1.53$", feedback: "That is the simple average of $5/3$ and $7/5$, which ignores both the mole numbers and the correct method." },
        { text: "$1.4$", feedback: "That is nitrogen alone. The helium raises $\\gamma$." },
        { text: "$17/11 \\approx 1.55$", correct: true, feedback: "$C_V = (2 \\cdot 1.5 + 2.5)R/3 = \\tfrac{11}{6}R$, $C_p = \\tfrac{17}{6}R$, $\\gamma = 17/11$." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-7-q5",
      variant: "concept",
      question: "Why is $C_p$ greater than $C_V$ for an ideal gas?",
      options: [
        { text: "At constant pressure some heat goes into work done by the expanding gas.", correct: true, feedback: "$nC_p\\,dT = nC_V\\,dT + p\\,dV$, and $p\\,dV = nR\\,dT$." },
        { text: "Molecules move faster at constant pressure.", feedback: "For the same $\\Delta T$, the molecules end with the same speeds either way." },
        { text: "Pressure adds extra degrees of freedom.", feedback: "The degrees of freedom are fixed by the molecule's shape, not by the process." },
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
        "No formula sheet. Every question can be rebuilt from 'fraction of the way between fixed points', $(1 + \\alpha\\Delta T)^n$, heat lost = heat gained, $H = \\Delta T/R$, $T^4$, and $\\tfrac12 k_BT$ per degree of freedom. Use $R = 8.314$ J/(mol·K) and $g = 10$ m/s² where needed.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 4 in 8 lines",
      content:
        "1. Zeroth law makes temperature measurable; any linear property gives $t = 100\\frac{X - X_0}{X_{100} - X_0}$.\n2. $\\Delta L = L\\alpha\\Delta T$, $\\beta = 2\\alpha$, $\\gamma = 3\\alpha$; holes expand; clocks lose $\\tfrac12\\alpha\\Delta\\theta$ per second.\n3. $Q = mc\\Delta T$ or $mL$; check whether all the ice melts before balancing.\n4. $H = kA\\Delta T/L = \\Delta T/R$; resistances add in series.\n5. $P = e\\sigma AT^4$, net $e\\sigma A(T^4 - T_0^4)$; $\\lambda_mT = b$; good absorber = good emitter.\n6. Small excess: $dT/dt = -K(T - T_0)$, exponential decay.\n7. $p = \\tfrac13\\rho v_{\\text{rms}}^2$, $\\tfrac12 m\\overline{v^2} = \\tfrac32 k_BT$, $v_{\\text{rms}} = \\sqrt{3RT/M}$.\n8. $U = \\frac f2 nRT$, $C_V = \\frac f2 R$, $C_p - C_V = R$, $\\gamma = 1 + 2/f$.",
    },
    {
      type: "quiz",
      id: "owt4-8-q1",
      variant: "mastery",
      question: "A thermometer reads $-2$ in melting ice and $102$ in steam at 1 atm. At what reading does it give the correct Celsius temperature?",
      options: [
        { text: "$0$", feedback: "At a reading of 0 the true temperature is $200/104 \\approx 1.9$ °C." },
        { text: "$52$", feedback: "At 52 the true temperature is $100 \\times 54/104 \\approx 51.9$ °C, close but not equal." },
        { text: "It is never correct.", feedback: "Two lines with different slopes always cross once." },
        { text: "$50$", correct: true, feedback: "$t = 100\\frac{R + 2}{104}$; setting $t = R$ gives $104R = 100R + 200$, so $R = 50$." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-8-q2",
      variant: "mastery",
      question: "A brass plate ($\\alpha = 2\\times10^{-5}$ /K) has a circular hole. By what percentage does the area of the hole change when the plate is heated by 200 °C?",
      options: [
        { text: "Decreases by 0.8%", feedback: "Holes expand like the material around them." },
        { text: "Increases by 0.4%", feedback: "That is the change in the hole's diameter. Area uses $2\\alpha$." },
        { text: "Increases by 0.8%", correct: true, feedback: "$\\Delta A/A = 2\\alpha\\Delta T = 2 \\times 2\\times10^{-5} \\times 200 = 8\\times10^{-3}$." },
        { text: "Increases by 1.2%", feedback: "That uses $3\\alpha$, the volume coefficient." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-8-q3",
      variant: "mastery",
      question: "A pendulum clock with a brass rod ($\\alpha = 2\\times10^{-5}$ /K) keeps correct time at 20 °C. How much time does it lose per day at 40 °C?",
      options: [
        { text: "$34.56$ s", feedback: "The period goes as $\\sqrt\\ell$, which brings in a factor $\\tfrac12$." },
        { text: "$8.64$ s", feedback: "That is for a 10 °C rise. Here the rise is 20 °C." },
        { text: "It gains 17.28 s", feedback: "Hotter means a longer rod and a slower pendulum, so the clock loses time." },
        { text: "$17.28$ s", correct: true, feedback: "$\\tfrac12 \\times 2\\times10^{-5} \\times 20 \\times 86400 = 2\\times10^{-4} \\times 86400 = 17.28$ s." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-8-q4",
      variant: "mastery",
      question: "1 kg of ice at 0 °C is mixed with 1 kg of water at 60 °C in an insulated vessel. What is the final state? ($L_f = 336$ kJ/kg, $c = 4200$ J/(kg·K))",
      options: [
        { text: "2 kg of water at 30 °C", feedback: "That ignores latent heat entirely, treating the ice as cold water." },
        { text: "2 kg of water at about 1.9 °C", feedback: "Check first: the water can give only $252$ kJ, but melting all the ice needs $336$ kJ." },
        { text: "Water and 250 g of ice at 0 °C", correct: true, feedback: "$252/336 = 0.75$ kg melts, so 0.25 kg of ice remains, all at 0 °C." },
        { text: "Water and 750 g of ice at 0 °C", feedback: "750 g is the mass that *melts*. The remaining ice is $1000 - 750 = 250$ g." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-8-q5",
      variant: "mastery",
      question: "Two slabs of equal thickness are joined face to face. Slab A ($k_A = 3k$) has its free face at 100 °C, slab B ($k_B = k$) has its free face at 20 °C. Find the junction temperature.",
      options: [
        { text: "$60$ °C", feedback: "That is the midpoint, correct only for equal conductivities." },
        { text: "$80$ °C", correct: true, feedback: "$3k(100 - T) = k(T - 20) \\Rightarrow 320 = 4T \\Rightarrow T = 80$ °C. The poorer conductor B carries 60 of the 80 °C drop." },
        { text: "$40$ °C", feedback: "That puts the larger drop across the better conductor A. It should be the other way round." },
        { text: "$75$ °C", feedback: "That forgets the 20 °C on the cold side: it is $100 \\times 3/4$." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-8-q6",
      variant: "mastery",
      question: "A black body radiates power $P$ at 727 °C. What does it radiate at 1727 °C?",
      options: [
        { text: "About $31.8P$", feedback: "That is $(1727/727)^4$ using Celsius. Stefan's law needs kelvin." },
        { text: "$16P$", correct: true, feedback: "1000 K to 2000 K doubles $T$, and $2^4 = 16$." },
        { text: "$2P$", feedback: "Power goes as $T^4$." },
        { text: "$8P$", feedback: "That uses $T^3$." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-8-q7",
      variant: "mastery",
      question: "Star A's spectrum peaks at 400 nm and star B's at 600 nm. Treating both as black bodies, what is the ratio of power emitted per unit surface area, A : B?",
      options: [
        { text: "$1.5 : 1$", feedback: "That is the temperature ratio. Power per area goes as $T^4$." },
        { text: "About $5.1 : 1$", correct: true, feedback: "Wien: $T_A/T_B = 600/400 = 1.5$; $1.5^4 \\approx 5.06$." },
        { text: "About $0.20 : 1$", feedback: "The shorter peak wavelength belongs to the hotter star, so A radiates more." },
        { text: "$2.25 : 1$", feedback: "That uses $T^2$ instead of $T^4$." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-8-q8",
      variant: "mastery",
      question: "A body cools from 90 °C to 70 °C in 5 minutes in a room at 30 °C. Roughly how long does it take to cool from 70 °C to 50 °C?",
      options: [
        { text: "5 minutes", feedback: "The average excess is smaller in the second interval, so the same 20 °C drop takes longer." },
        { text: "About 8.5 minutes", correct: true, feedback: "Averaging: $K = 4/50 = 0.08$ /min, then $20/t = 0.08 \\times 30$ gives $t \\approx 8.3$ min; the exact exponential gives $5\\ln 2/\\ln 1.5 \\approx 8.5$ min." },
        { text: "About 15 minutes", feedback: "Too long: the excess falls from 40 to 20 °C, which is only somewhat slower than 60 to 40 °C." },
        { text: "About 3 minutes", feedback: "Cooling slows down as the body approaches room temperature, it never speeds up." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-8-q9",
      variant: "mastery",
      question: "At what temperature is the $v_{\\text{rms}}$ of a gas's molecules double its value at 27 °C?",
      options: [
        { text: "$54$ °C", feedback: "Doubling the Celsius reading is meaningless here, and speed goes as $\\sqrt T$." },
        { text: "$327$ °C", feedback: "That is 600 K, double the absolute temperature, which raises $v_{\\text{rms}}$ only by $\\sqrt2$." },
        { text: "$927$ °C", correct: true, feedback: "$v \\propto \\sqrt T$: double $v$ needs $4 \\times 300 = 1200$ K $= 927$ °C." },
        { text: "$1200$ °C", feedback: "1200 is the answer in kelvin. In Celsius it is 927 °C." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-8-q10",
      variant: "mastery",
      question: "3 mol of helium is mixed with 2 mol of nitrogen. What is $\\gamma$ for the mixture?",
      options: [
        { text: "About $1.56$", feedback: "That averages the $\\gamma$ values by moles, $(3 \\cdot 1.667 + 2 \\cdot 1.4)/5$. Average the heat capacities instead." },
        { text: "$1.5$", feedback: "That would need $C_V = 2R$, true for equal moles. Here helium is the majority." },
        { text: "$29/19 \\approx 1.53$", correct: true, feedback: "$C_V = (3 \\cdot 1.5 + 2 \\cdot 2.5)R/5 = 1.9R$; $C_p = 2.9R$; $\\gamma = 29/19$." },
        { text: "$1.4$", feedback: "That is nitrogen alone." },
      ],
    },
    {
      type: "quiz",
      id: "owt4-8-q11",
      variant: "mastery",
      question: "A steel rod of length 1 m and cross-section 1 cm² is clamped between rigid walls and heated by 50 °C ($Y = 2\\times10^{11}$ Pa, $\\alpha = 1.2\\times10^{-5}$ /K). Find the force on each wall and the elastic energy stored in the rod.",
      options: [
        { text: "12 kN and 7.2 J", feedback: "The force is right, but stored energy has a $\\tfrac12$: it is the triangle under the stress–strain line." },
        { text: "1.2 kN and 0.36 J", feedback: "1 cm² is $10^{-4}$ m², not $10^{-5}$ m²." },
        { text: "12 kN and 3.6 J", correct: true, feedback: "Strain $\\alpha\\Delta T = 6\\times10^{-4}$; stress $1.2\\times10^{8}$ Pa; force $\\times 10^{-4}$ m² $= 1.2\\times10^{4}$ N; energy $\\tfrac12\\sigma\\varepsilon V = \\tfrac12 \\cdot 1.2\\times10^{8} \\cdot 6\\times10^{-4} \\cdot 10^{-4} = 3.6$ J." },
        { text: "Zero force, since the rod stays the same length.", feedback: "It stays the same length *because* the walls push it with exactly the force that undoes the thermal strain." },
      ],
      hint: "The walls must compress the rod by the strain it would have expanded, $\\alpha\\Delta T$.",
    },
    {
      type: "quiz",
      id: "owt4-8-q12",
      variant: "mastery",
      question: "A small copper sphere of radius $r$ at absolute temperature $T$ in very cold, dark surroundings cools by radiation at an initial rate $R_0$ (K/s). A copper sphere of radius $2r$ at temperature $2T$ in the same surroundings cools initially at what rate?",
      options: [
        { text: "$16R_0$", feedback: "That accounts for $T^4$ but forgets that the bigger sphere has more heat capacity per unit area: rate $\\propto 1/r$." },
        { text: "$64R_0$", feedback: "That multiplies $T^4$ by the area factor 4. Power grows as $r^2$ but mass as $r^3$." },
        { text: "$2R_0$", feedback: "That seems to use $T$ rather than $T^4$ in Stefan's law." },
        { text: "$8R_0$", correct: true, feedback: "$\\frac{dT}{dt} = \\frac{e\\sigma(4\\pi r^2)T^4}{\\rho\\frac43\\pi r^3c} \\propto \\frac{T^4}{r}$, so the factor is $16/2 = 8$." },
      ],
      hint: "Rate of cooling = radiated power ÷ heat capacity. How do area and mass scale with $r$?",
    },
  ]),
};

export const owtChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
