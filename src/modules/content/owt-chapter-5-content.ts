import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Oscillations, Waves and Thermal Physics Chapter 5 — Thermodynamics.
 * Book-keeping for energy: work as area under a p–V curve, the first law
 * ΔU = Q − W, the standard processes (isochoric, isobaric, isothermal,
 * adiabatic, polytropic) as shapes on a diagram, cycles that turn heat into
 * work, and the second law capping efficiency at Carnot's 1 − T_C/T_H.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "first-law-of-thermodynamics",
  title: "5.1 · Heat, Work and the First Law",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/owt-5-thermodynamics.mp4",
      poster: "/videos/owt-5-thermodynamics.jpg",
      title: "Chapter 5 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Rub your hands together and they warm up. Hold them near a heater and they warm up too. At the end you cannot tell which way the warmth arrived: your hands simply have more internal energy. Energy can enter a system as **work** (a force acting through a distance) or as **heat** (a flow driven by a temperature difference), and thermodynamics is the careful accounting of both.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "System, state and path",
      content:
        "The **system** is the part of the world we study (usually a gas in a cylinder); everything else is the **surroundings**.\nA **state variable** has a definite value in each equilibrium state: $p$, $V$, $T$, internal energy $U$.\n**Heat** $Q$ and **work** $W$ are not state variables. They describe energy transferred *during a process*, and they depend on the path taken between two states.",
    },
    { type: "heading", text: "Work done by a gas" },
    {
      type: "text",
      content:
        "A gas at pressure $p$ pushes on a piston of area $A$ with force $pA$. If the piston moves out by $dx$, the gas does work",
    },
    { type: "math", latex: "dW = F\\,dx = pA\\,dx = p\\,dV \\qquad\\Longrightarrow\\qquad W = \\int_{V_1}^{V_2} p\\,dV" },
    {
      type: "text",
      content:
        "On a graph of $p$ against $V$, that integral is the **area under the curve**. Expansion ($dV > 0$) gives positive work done by the gas; compression gives negative work (work is done *on* the gas). The lab below draws an isobaric (constant-pressure) process from state A and shades the work.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-thermo-lab",
        mode: "process",
        process: "isobaric",
        processToggle: true,
        gas: "monatomic",
        initial: { p: 100, v: 10 },
        finalVolume: 25,
        caption:
          "1 mol of gas starting at 100 kPa and 10 L. kPa × L = J, so the shaded rectangle's area reads directly in joules. Drag the final volume below 10 L to compress the gas and watch the area turn orange (negative W).",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: expanding at 100 kPa from 10 L to 25 L gives $W = 100 \\times 15 = 1500$ J, the area of the rectangle. Compressing back below 10 L flips the sign. Switch to the other processes: between the same starting state and the same final volume, the area, and so the work, is different for each path.",
    },
    { type: "heading", text: "Heat, work and internal energy" },
    {
      type: "callout",
      variant: "definition",
      title: "The first law of thermodynamics",
      content:
        "$\\Delta U = Q - W$\n$Q$ = heat supplied **to** the system; $W$ = work done **by** the system.\nIt is conservation of energy: the internal energy rises by whatever heat comes in, minus whatever work goes out. In differential form, $dU = dQ - p\\,dV$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Sign conventions: physics vs chemistry",
      content:
        "This course follows NCERT physics and JEE physics: $W$ is work done **by** the gas, so $\\Delta U = Q - W$. Chemistry textbooks usually use work done **on** the system, writing $\\Delta U = q + w$. Both describe the same physics; just never mix them within one problem. A gas that expands does positive $W$ here and negative $w$ in chemistry.",
    },
    { type: "heading", text: "$U$ is a state function" },
    {
      type: "text",
      content:
        "For an ideal gas, $U = \\frac f2 nRT$ depends only on temperature (Lesson 4.7), so between two given states $\\Delta U$ is fixed. $Q$ and $W$ separately depend on the path, but their difference does not. That is what makes the first law useful: compute $\\Delta U$ from the end states, compute $W$ from the area, and $Q$ follows.",
    },
    { type: "heading", text: "Expanding gases and boiling water" },
    {
      type: "worked-example",
      id: "owt5-1-we1",
      title: "Worked example 1 (isobaric expansion)",
      problem:
        "A gas expands at a constant 100 kPa from 10 L to 25 L. How much work does it do?",
      steps: [
        { text: "$W = p\\,\\Delta V = 100\\times10^{3} \\times 15\\times10^{-3} = 1500$ J. *Why this step:* at constant pressure the area under the curve is a rectangle. Note $1\\ \\text{kPa} \\times 1\\ \\text{L} = 10^{3} \\times 10^{-3} = 1$ J." },
      ],
      answer: "$W = 1500$ J",
    },
    {
      type: "worked-example",
      id: "owt5-1-we2",
      title: "Worked example 2 (two paths, one $\\Delta U$)",
      problem:
        "1 mol of monatomic ideal gas goes from A (100 kPa, 10 L) to B (200 kPa, 20 L). Path 1: first at constant pressure to 20 L, then at constant volume up to 200 kPa. Path 2: first at constant volume up to 200 kPa, then at constant pressure to 20 L. Find $\\Delta U$, $W$ and $Q$ for each.",
      steps: [
        { text: "$\\Delta U = \\tfrac32 nR\\Delta T = \\tfrac32\\Delta(pV) = \\tfrac32(4000 - 1000) = 4500$ J for **both** paths. *Why this step:* $nRT = pV$, so $\\Delta U$ comes straight from the end states in kPa·L = J." },
        { text: "Path 1: work only on the isobaric leg at 100 kPa: $W_1 = 100 \\times 10 = 1000$ J. $Q_1 = 4500 + 1000 = 5500$ J." },
        { text: "Path 2: work only on the isobaric leg at 200 kPa: $W_2 = 200 \\times 10 = 2000$ J. $Q_2 = 4500 + 2000 = 6500$ J." },
        { text: "Same change of state, different heat and work. The difference $Q - W$ is the same." },
      ],
      answer: "$\\Delta U = 4500$ J for both; path 1: $W = 1000$ J, $Q = 5500$ J; path 2: $W = 2000$ J, $Q = 6500$ J",
    },
    {
      type: "worked-example",
      id: "owt5-1-we3",
      title: "Worked example 3 (boiling water)",
      problem:
        "1 kg of water at 100 °C boils into steam at a constant $1.0\\times10^{5}$ Pa. The volume goes from $1\\times10^{-3}$ m³ to $1.67$ m³. Find $\\Delta U$ ($L_v = 2.26\\times10^{6}$ J/kg).",
      steps: [
        { text: "$Q = mL_v = 2.26\\times10^{6}$ J." },
        { text: "$W = p\\Delta V = 1.0\\times10^{5} \\times (1.67 - 0.001) \\approx 1.67\\times10^{5}$ J. *Why this step:* the steam pushes back the atmosphere as it forms; that part of the heat leaves as work." },
        { text: "$\\Delta U = Q - W \\approx 2.26\\times10^{6} - 0.17\\times10^{6} \\approx 2.09\\times10^{6}$ J. About 93% of the latent heat goes into pulling the molecules apart." },
      ],
      answer: "$\\Delta U \\approx 2.09\\times10^6$ J",
    },
    {
      type: "worked-example",
      id: "owt5-1-we4",
      title: "Worked example 4 (signs)",
      problem:
        "(a) A gas absorbs 500 J of heat and does 200 J of work. (b) A gas is compressed by 300 J of work done on it while it gives out 100 J of heat. Find $\\Delta U$ in each case.",
      steps: [
        { text: "(a) $\\Delta U = 500 - 200 = +300$ J." },
        { text: "(b) $Q = -100$ J (heat leaves) and $W = -300$ J (work done on the gas), so $\\Delta U = -100 - (-300) = +200$ J. *Why this step:* translate every phrase into a sign before substituting; most first-law errors are sign errors." },
      ],
      answer: "(a) $\\Delta U = +300$ J; (b) $\\Delta U = +200$ J",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"heat is contained in a body\"",
      content:
        "A body contains **internal energy**, not heat. Heat is the name for energy while it is crossing a boundary because of a temperature difference, just as rain is water only while it falls. Worked example 2 shows why 'the heat in the gas' cannot be defined: the same final state was reached with 5500 J or 6500 J of heat.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "owt5-1-q1",
      variant: "practice",
      question: "A gas expands at a constant pressure of 200 kPa from 5 L to 15 L. How much work does it do, in joules?",
      answer: 2000,
      unit: "J",
      hint: "At constant pressure the area under the curve is a rectangle, and kPa × L = J.",
      solution: "$W = p\\,\\Delta V = 200\\text{ kPa} \\times (15 - 5)\\text{ L} = 2000$ J.",
      commonMistakes: [
        { answer: 2, feedback: "kPa × L is J directly: $200 \\times 10 = 2000$ J." },
        { answer: 3000, feedback: "That uses the final volume, 15 L. Work uses the change, 10 L." },
        { answer: -2000, feedback: "The gas expands, so the work done *by* it is positive." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-1-q2",
      variant: "practice",
      question: "A gas absorbs 800 J of heat and does 300 J of work on its surroundings. What is $\\Delta U$?",
      options: [
        { text: "$+1100$ J", feedback: "Work done *by* the gas takes energy out, so subtract it." },
        { text: "$+500$ J", correct: true, feedback: "$\\Delta U = Q - W = 800 - 300$." },
        { text: "$-500$ J", feedback: "More energy came in as heat than left as work, so $U$ increased." },
      ],
      hint: "First law with this course's sign convention: $\\Delta U = Q - W$, where $W$ is the work done *by* the gas.",
    },
    {
      type: "numeric",
      id: "owt5-1-q3",
      variant: "practice",
      question: "A gas is compressed: 400 J of work is done on it, and it releases 150 J of heat. What is $\\Delta U$, in joules? Include the sign (negative if $U$ falls).",
      answer: 250,
      unit: "J",
      hint: "Translate each phrase into a sign first: heat released means $Q < 0$; work done *on* the gas means $W < 0$.",
      solution: "$Q = -150$ J (heat leaves) and $W = -400$ J (work is done on the gas), so\n\n$\\Delta U = Q - W = -150 - (-400) = +250$ J.",
      commonMistakes: [
        { answer: -550, feedback: "You treated the work done *on* the gas as work done *by* it. $W = -400$ J here." },
        { answer: 550, feedback: "The released heat must be subtracted: $Q = -150$ J." },
        { answer: -250, feedback: "Sign slip: more energy went in as work than left as heat, so $U$ rose." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-1-q4",
      variant: "concept",
      multiple: true,
      question: "Select every quantity that is a state function.",
      options: [
        { text: "Heat absorbed, $Q$", feedback: "$Q$ depends on the path: Worked example 2 reached the same state with two different $Q$." },
        { text: "Work done, $W$", feedback: "$W$ is the area under the path, which differs from path to path." },
        { text: "Internal energy, $U$", correct: true, feedback: "$U$ depends only on the state (for an ideal gas, only on $T$)." },
        { text: "Temperature, $T$", correct: true, feedback: "$T$ has a definite value in each equilibrium state, like $p$ and $V$." },
      ],
      hint: "For each quantity, ask whether its value depends only on the present state of the gas or on the path taken to reach it.",
    },
    {
      type: "numeric",
      id: "owt5-1-q5",
      variant: "practice",
      question: "A system goes from state X to state Y along path 1, absorbing 70 J of heat and doing 30 J of work. Along path 2 it does 10 J of work. How much heat, in joules, does it absorb along path 2?",
      answer: 50,
      unit: "J",
      hint: "$Q$ and $W$ depend on the path, but $\\Delta U$ does not. Get $\\Delta U$ from path 1.",
      solution: "Path 1: $\\Delta U = Q_1 - W_1 = 70 - 30 = 40$ J.\n\nThe same $\\Delta U$ holds on path 2, so $Q_2 = \\Delta U + W_2 = 40 + 10 = 50$ J.",
      commonMistakes: [
        { answer: 70, feedback: "Heat depends on the path. Only $\\Delta U$ is shared." },
        { answer: 30, feedback: "That subtracts the work instead of adding it: $Q = \\Delta U + W$." },
        { answer: 90, feedback: "That uses $\\Delta U = Q + W$ (giving 100 J). With $W$ the work done *by* the gas, $\\Delta U = Q - W = 40$ J, and $Q_2 = \\Delta U + W_2$." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "thermodynamic-processes",
  title: "5.2 · Isochoric, Isobaric and Isothermal",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A pressure cooker heats food in a sealed pot (fixed volume). A balloon warmed in the sun expands against the steady atmosphere (fixed pressure). A gas in a cylinder surrounded by a large water bath is squeezed slowly and stays at the bath's temperature (fixed temperature). Hold one variable fixed and the first law becomes a short calculation. Three of the four standard processes are in this lesson; the fourth, adiabatic, gets Lesson 5.3.",
    },
    { type: "heading", text: "Four standard processes" },
    {
      type: "text",
      content:
        "For an ideal gas the internal energy depends only on temperature, so for **any** process $\\Delta U = nC_V\\Delta T$. That single fact, plus the area under the curve for $W$, handles every case.",
    },
    {
      type: "table",
      headers: ["Process", "Held fixed", "Shape on p–V", "$W$", "$\\Delta U$", "$Q$"],
      rows: [
        ["Isochoric", "$V$", "vertical line", "$0$", "$nC_V\\Delta T$", "$nC_V\\Delta T$"],
        ["Isobaric", "$p$", "horizontal line", "$p\\Delta V = nR\\Delta T$", "$nC_V\\Delta T$", "$nC_p\\Delta T$"],
        ["Isothermal", "$T$", "hyperbola $pV = $ const", "$nRT\\ln\\dfrac{V_2}{V_1}$", "$0$", "$= W$"],
      ],
    },
    { type: "heading", text: "Isothermal work, derived" },
    {
      type: "text",
      content:
        "At constant $T$, $p = nRT/V$, so the area under the hyperbola is",
    },
    { type: "math", latex: "W = \\int_{V_1}^{V_2} \\frac{nRT}{V}\\,dV = nRT\\ln\\frac{V_2}{V_1} = nRT\\ln\\frac{p_1}{p_2}" },
    { type: "heading", text: "Why $C_p > C_V$" },
    {
      type: "text",
      content:
        "Heat a gas by $\\Delta T$ in a rigid box: all the heat goes into $U$. Heat it by the same $\\Delta T$ at constant pressure: it must also expand and do $p\\Delta V = nR\\Delta T$ of work, so it needs that much extra heat. Hence $C_p = C_V + R$ (Mayer's relation, first met in 4.7), and $Q_p/Q_V = C_p/C_V = \\gamma$ for the same temperature rise.",
    },
    {
      type: "text",
      content:
        "The lab starts 1 mol of monatomic gas at 249.4 kPa and 10 L, which is 300 K. Use the buttons to step through the processes and read $W$, $\\Delta U$ and $Q$ from the panel.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-thermo-lab",
        mode: "process",
        process: "isothermal",
        processToggle: true,
        showIsotherms: true,
        gas: "monatomic",
        initial: { p: 249.4, v: 10 },
        finalVolume: 20,
        caption:
          "Isothermal: ΔU = 0 and Q = W. Isobaric: Q is shared between ΔU (3/5) and W (2/5) for a monatomic gas. Isochoric: W = 0 and Q = ΔU. The faint curves are isotherms.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: on the isotherm to 20 L, $\\Delta U = 0$ and $Q = W \\approx 1729$ J. Switch to isobaric to 20 L: the temperature doubles to 600 K, $W = 249.4 \\times 10 = 2494$ J, $\\Delta U = \\tfrac32 \\times 2494 = 3741$ J, and $Q = 6235$ J, so $W/Q = 2/5$. Switch to isochoric and the shaded area vanishes: no volume change, no work.",
    },
    {
      type: "worked-example",
      id: "owt5-2-we1",
      title: "Worked example 1 (isobaric heating)",
      problem:
        "2 mol of a monatomic ideal gas is heated at constant pressure by 50 K. Find $Q$, $W$ and $\\Delta U$.",
      steps: [
        { text: "$Q = nC_p\\Delta T = 2 \\times \\tfrac52 \\times 8.314 \\times 50 \\approx 2079$ J. *Why this step:* at constant pressure the heat capacity to use is $C_p$." },
        { text: "$W = p\\Delta V = nR\\Delta T = 2 \\times 8.314 \\times 50 \\approx 831$ J." },
        { text: "$\\Delta U = nC_V\\Delta T = 2 \\times \\tfrac32 \\times 8.314 \\times 50 \\approx 1247$ J. Check: $1247 + 831 = 2078 \\approx Q$. ✓" },
      ],
      answer: "$Q \\approx 2079$ J, $W \\approx 831$ J, $\\Delta U \\approx 1247$ J",
    },
    {
      type: "worked-example",
      id: "owt5-2-we2",
      title: "Worked example 2 (isothermal doubling)",
      problem:
        "1 mol of ideal gas expands isothermally at 300 K to twice its volume. Find $W$, $\\Delta U$ and $Q$.",
      steps: [
        { text: "$W = RT\\ln 2 = 8.314 \\times 300 \\times 0.693 \\approx 1729$ J." },
        { text: "$\\Delta U = 0$ (temperature unchanged), so $Q = W \\approx 1729$ J. *Why this step:* the gas must absorb exactly the energy it gives away as work, or it would cool." },
      ],
      answer: "$W = Q \\approx 1729$ J, $\\Delta U = 0$",
    },
    {
      type: "worked-example",
      id: "owt5-2-we3",
      title: "Worked example 3 ($Q_p/Q_V$)",
      problem:
        "The same gas is heated by the same $\\Delta T$, once at constant volume and once at constant pressure. Find $Q_p/Q_V$ for a diatomic gas.",
      steps: [
        { text: "$\\dfrac{Q_p}{Q_V} = \\dfrac{nC_p\\Delta T}{nC_V\\Delta T} = \\gamma = 1.4$. *Why this step:* $n$ and $\\Delta T$ cancel, leaving the definition of $\\gamma$." },
      ],
      answer: "$Q_p/Q_V = \\gamma = 1.4$",
    },
    {
      type: "worked-example",
      id: "owt5-2-we4",
      title: "Worked example 4 (isochoric)",
      problem:
        "1 mol of a diatomic gas in a rigid container is heated from 300 K to 400 K. Find $W$, $Q$ and $\\Delta U$.",
      steps: [
        { text: "$W = 0$. $Q = \\Delta U = nC_V\\Delta T = \\tfrac52 \\times 8.314 \\times 100 \\approx 2079$ J." },
      ],
      answer: "$W = 0$, $Q = \\Delta U \\approx 2079$ J",
    },
    {
      type: "worked-example",
      id: "owt5-2-we5",
      title: "Worked example 5 (isothermal compression)",
      problem:
        "A gas at 100 kPa and 10 L is compressed isothermally to 5 L. Find the work done by the gas and the heat it exchanges.",
      steps: [
        { text: "$W = p_1V_1\\ln\\dfrac{V_2}{V_1} = 1000 \\times \\ln 0.5 \\approx -693$ J. *Why this step:* $nRT = p_1V_1 = 1000$ J, so we never need $n$ or $T$ separately." },
        { text: "$\\Delta U = 0$, so $Q = W = -693$ J: the gas **gives out** 693 J of heat to the bath while being squeezed." },
      ],
      answer: "$W = Q \\approx -693$ J: the gas gives out 693 J of heat.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"no temperature change means no heat flows\"",
      content:
        "In an isothermal expansion the temperature stays fixed **because** heat flows in: every joule of work the gas does is replaced by a joule of heat from the reservoir. $\\Delta T = 0$ means $\\Delta U = 0$, not $Q = 0$. The process with $Q = 0$ is the adiabatic one, and there the temperature does change.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "owt5-2-q1",
      variant: "concept",
      question: "In an isochoric process on an ideal gas, which is true?",
      options: [
        { text: "$\\Delta U = 0$ and $Q = W$", feedback: "That is the isothermal case." },
        { text: "$Q = 0$", feedback: "That is the adiabatic case." },
        { text: "$W = 0$ and $Q = \\Delta U$", correct: true, feedback: "No volume change means no area under the curve, so all the heat goes into internal energy." },
      ],
      hint: "Isochoric means constant volume. What is $p\\,\\Delta V$ then, and what does the first law leave?",
    },
    {
      type: "numeric",
      id: "owt5-2-q2",
      variant: "practice",
      question: "1 mol of a rigid diatomic ideal gas is heated at constant pressure from 300 K to 400 K. How much heat is absorbed, in joules? Use $R = 8.314$ J/(mol·K).",
      answer: 2910,
      relTolerance: 0.01,
      unit: "J",
      hint: "At constant pressure use $C_p = C_V + R$; for a rigid diatomic gas $C_V = \\tfrac52R$.",
      solution: "$C_p = \\tfrac52R + R = \\tfrac72R$.\n\n$Q = nC_p\\Delta T = 1 \\times \\tfrac72 \\times 8.314 \\times 100 \\approx 2910$ J.",
      commonMistakes: [
        { answer: 2079, feedback: "That uses $C_V = \\tfrac52 R$. At constant pressure use $C_p = \\tfrac72 R$." },
        { answer: 831, feedback: "That is only the work $nR\\Delta T$. The heat also raises $U$." },
        { answer: 1247, feedback: "That uses $\\tfrac32 R$, for a monatomic gas at constant volume." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-2-q3",
      variant: "practice",
      question: "A monatomic ideal gas is heated at constant pressure. What fraction of the heat supplied is converted into work?",
      options: [
        { text: "$\\tfrac35$", feedback: "That is the fraction that goes into internal energy, $C_V/C_p$." },
        { text: "$\\tfrac25$", correct: true, feedback: "$W/Q = nR\\Delta T/(nC_p\\Delta T) = R/\\tfrac52 R = \\tfrac25$." },
        { text: "All of it", feedback: "That happens only in an isothermal process." },
        { text: "None", feedback: "The gas expands at constant pressure, so it does work $p\\Delta V$." },
      ],
      hint: "At constant pressure, write the heat using $C_p$ and the work using $R$, both for the same $\\Delta T$, then take their ratio.",
    },
    {
      type: "numeric",
      id: "owt5-2-q4",
      variant: "practice",
      question: "2 mol of an ideal gas expands isothermally at 400 K from 10 L to 30 L. How much work does it do, in kJ? Use $R = 8.314$ J/(mol·K).",
      answer: 7.31,
      relTolerance: 0.01,
      unit: "kJ",
      hint: "Isothermal work is $nRT\\ln(V_2/V_1)$.",
      solution: "$W = nRT\\ln\\dfrac{V_2}{V_1} = 2 \\times 8.314 \\times 400 \\times \\ln 3 \\approx 6651 \\times 1.0986 \\approx 7307$ J $\\approx 7.31$ kJ.",
      commonMistakes: [
        { answer: 6.65, feedback: "That is $nRT$ without the $\\ln 3$ factor." },
        { answer: 3.65, feedback: "That is for 1 mol. There are 2 mol." },
        { answer: 0, feedback: "$\\Delta U$ is zero, but the gas expands, so it certainly does work." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-2-q5",
      variant: "concept",
      question: "An ideal gas expands isothermally. Which statement is correct?",
      options: [
        { text: "No heat flows, since the temperature does not change.", feedback: "Heat must flow in to replace the energy the gas gives out as work." },
        { text: "Heat flows in, and all of it is converted into work.", correct: true, feedback: "$\\Delta U = 0$, so $Q = W > 0$." },
        { text: "The gas cools and heat flows out.", feedback: "Isothermal means the temperature stays fixed; an expansion needs heat in, not out." },
      ],
      hint: "For an ideal gas $U$ depends only on $T$. Apply the first law with $\\Delta U = 0$ to an expansion.",
    },
    {
      type: "quiz",
      id: "owt5-2-q6",
      variant: "practice",
      multiple: true,
      question: "An ideal gas is heated slowly at constant pressure. Select every correct statement.",
      options: [
        { text: "Its volume increases in proportion to its absolute temperature.", correct: true, feedback: "$V = (nR/p)T$ with $p$ fixed." },
        { text: "The heat absorbed is greater than the rise in internal energy.", correct: true, feedback: "$Q = \\Delta U + W$ and $W = p\\Delta V > 0$, so $Q > \\Delta U$; equivalently $C_p > C_V$." },
        { text: "The work done by the gas equals $nR\\Delta T$.", correct: true, feedback: "$W = p\\Delta V = \\Delta(pV) = nR\\Delta T$ at constant $p$." },
        { text: "For a monatomic gas, $\\tfrac35$ of the heat supplied is converted into work.", feedback: "$\\tfrac35 = C_V/C_p$ is the fraction that goes into internal energy. The work fraction is $R/C_p = \\tfrac25$." },
      ],
      hint: "Use $pV = nRT$ with $p$ fixed, and the first law.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "adiabatic-processes",
  title: "5.3 · Adiabatic and Polytropic Processes",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Pump a bicycle tyre hard and feel the pump barrel: it is hot. Nobody heated it; you compressed the air too quickly for heat to escape, so the work you did stayed in the air as internal energy. The reverse happens when moist air rises and expands in the lower pressure aloft: it cools, and its water vapour condenses into clouds. A process with no heat exchange is **adiabatic**: well-insulated, or simply too fast for heat to flow.",
    },
    { type: "heading", text: "Deriving $pV^\\gamma = $ const" },
    {
      type: "text",
      content:
        "Set $dQ = 0$ in the first law, for $n$ moles of ideal gas:",
    },
    { type: "math", latex: "nC_V\\,dT = -p\\,dV" },
    {
      type: "text",
      content:
        "Eliminate $dT$ using $pV = nRT$, which gives $p\\,dV + V\\,dp = nR\\,dT$:",
    },
    {
      type: "math",
      latex: "\\frac{C_V}{R}(p\\,dV + V\\,dp) = -p\\,dV \\;\\Rightarrow\\; C_V V\\,dp = -(C_V + R)\\,p\\,dV = -C_p\\,p\\,dV \\;\\Rightarrow\\; \\frac{dp}{p} = -\\gamma\\frac{dV}{V}",
    },
    {
      type: "text",
      content:
        "Integrate: $\\ln p = -\\gamma\\ln V + $ const. Combine with $pV = nRT$ to get the other two forms:",
    },
    { type: "math", latex: "pV^\\gamma = \\text{const}, \\qquad TV^{\\gamma - 1} = \\text{const}, \\qquad p^{1-\\gamma}T^\\gamma = \\text{const}" },
    { type: "heading", text: "Work in an adiabatic process" },
    {
      type: "text",
      content:
        "With $Q = 0$ the first law gives $W = -\\Delta U = nC_V(T_1 - T_2)$, and since $C_V = R/(\\gamma - 1)$:",
    },
    { type: "math", latex: "W = \\frac{nR(T_1 - T_2)}{\\gamma - 1} = \\frac{p_1V_1 - p_2V_2}{\\gamma - 1}" },
    { type: "heading", text: "Why the adiabat is steeper" },
    {
      type: "text",
      content:
        "Differentiate at a point $(p, V)$: the isotherm $pV = $ const has slope $dp/dV = -p/V$; the adiabat $pV^\\gamma = $ const has slope $-\\gamma p/V$. The adiabat is steeper by exactly the factor $\\gamma$, because as the gas expands adiabatically it also cools, so its pressure falls for two reasons at once. The lab below draws both through the same starting point.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-thermo-lab",
        mode: "compare",
        gasToggle: true,
        gas: "monatomic",
        initial: { p: 100, v: 10 },
        finalVolume: 20,
        caption:
          "Blue: isotherm. Orange: adiabat through the same point A. Expand to the same final volume and compare final pressures and areas. Toggle the gas: the gap is wider for the monatomic gas because its γ is larger.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: expanding to double the volume, the isotherm ends at 50 kPa but the adiabat at only $100 \\times 2^{-5/3} \\approx 31.5$ kPa (monatomic) or $100 \\times 2^{-1.4} \\approx 37.9$ kPa (diatomic). The area under the adiabat is smaller: an adiabatic expansion does less work, because it is paid for entirely from the gas's own internal energy. On compression the order reverses: the adiabat rises above the isotherm, and more work is needed.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Adiabatic effects around you",
      content:
        "**Bicycle pump:** fast compression warms the air. **Clouds:** rising air expands and cools about 10 °C per km until vapour condenses. **Diesel engine:** air compressed about 16 times becomes hot enough to ignite the fuel sprayed into it, with no spark plug. **Opening a soda bottle:** the escaping gas expands and cools so fast that a little fog forms at the neck.",
    },
    { type: "heading", text: "Polytropic processes" },
    {
      type: "text",
      content:
        "**Polytropic processes (JEE Advanced).** Isobaric, isothermal and adiabatic are all members of one family, $pV^n = $ const: $n = 0$ is isobaric, $n = 1$ isothermal, $n = \\gamma$ adiabatic, and $n \\to \\infty$ isochoric. For 1 mol along $pV^n = $ const, the work is $W = \\dfrac{R\\,(T_1 - T_2)}{n - 1}$ (the same derivation as the adiabat, with $n$ for $\\gamma$). The heat absorbed per mole per kelvin is then",
    },
    { type: "math", latex: "C = \\frac{dQ}{dT} = C_V + \\frac{dW}{dT} = C_V + \\frac{R}{1 - n}" },
    {
      type: "text",
      content:
        "Check: $n = 0$ gives $C_V + R = C_p$; $n = \\gamma$ gives $C_V + \\dfrac{R}{1 - \\gamma} = C_V - C_V = 0$, the adiabat. Between $n = 1$ and $n = \\gamma$ the heat capacity is **negative**: the gas absorbs heat and yet cools, because it does more work than the heat it takes in. Explore it below.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-thermo-lab",
        mode: "process",
        process: "polytropic",
        polytropicN: 1.5,
        gas: "monatomic",
        gasToggle: true,
        initial: { p: 100, v: 10 },
        finalVolume: 20,
        sliders: ["finalVolume", "polytropicN"],
        caption:
          "A polytropic expansion pVⁿ = const. With a monatomic gas (γ ≈ 1.67) and n = 1.5, Q is positive but T falls, so C comes out negative. Slide n through 1 and through γ and watch the sign of C change.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $n = 1.5$ the panel shows $C = \\tfrac32R + \\dfrac{R}{-0.5} = -\\tfrac12R \\approx -4.16$ J/(mol·K). Move $n$ above $\\gamma$ and $C$ turns positive again but small; below 1 it is larger than $C_V$.",
    },
    {
      type: "worked-example",
      id: "owt5-3-we1",
      title: "Worked example 1 (compressing to one-eighth)",
      problem:
        "A monatomic gas at temperature $T$ and pressure $p$ is compressed adiabatically to $\\tfrac18$ of its volume. Find the new temperature and pressure.",
      steps: [
        { text: "$TV^{\\gamma - 1} = $ const with $\\gamma - 1 = \\tfrac23$: $T_2 = T \\times 8^{2/3} = 4T$. *Why this step:* $8^{1/3} = 2$, so powers of 8 with thirds are easy." },
        { text: "$pV^\\gamma = $ const: $p_2 = p \\times 8^{5/3} = 32p$." },
        { text: "Check with $pV = nRT$: $p_2V_2/(pV) = 32/8 = 4 = T_2/T$. ✓" },
      ],
      answer: "$T_2 = 4T$, $p_2 = 32p$",
    },
    {
      type: "worked-example",
      id: "owt5-3-we2",
      title: "Worked example 2 (work in an adiabatic expansion)",
      problem:
        "1 mol of a monatomic gas expands adiabatically and cools from 400 K to 300 K. How much work does it do?",
      steps: [
        { text: "$W = -\\Delta U = nC_V(T_1 - T_2) = \\tfrac32 \\times 8.314 \\times 100 \\approx 1247$ J. *Why this step:* with no heat in, the work is paid for by internal energy." },
      ],
      answer: "$W \\approx 1247$ J",
    },
    {
      type: "worked-example",
      id: "owt5-3-we3",
      title: "Worked example 3 (adiabatic vs isothermal)",
      problem:
        "Diatomic gas at 100 kPa doubles its volume (a) isothermally, (b) adiabatically. Compare final pressures.",
      steps: [
        { text: "(a) $p_2 = 100/2 = 50$ kPa." },
        { text: "(b) $p_2 = 100 \\times 2^{-1.4} = 100/2.64 \\approx 37.9$ kPa. *Why this step:* the adiabatic gas also cools, so its pressure drops further." },
      ],
      answer: "(a) 50 kPa; (b) about 37.9 kPa",
    },
    {
      type: "worked-example",
      id: "owt5-3-we4",
      title: "Worked example 4 (diesel ignition)",
      problem:
        "Air ($\\gamma = 1.4$) at 300 K is compressed adiabatically to $\\tfrac1{16}$ of its volume. Find its new temperature.",
      steps: [
        { text: "$T_2 = 300 \\times 16^{0.4} = 300 \\times 3.03 \\approx 909$ K, about 636 °C, well above the ignition temperature of diesel fuel." },
      ],
      answer: "$T_2 \\approx 909$ K (about 636 °C)",
    },
    {
      type: "worked-example",
      id: "owt5-3-we5",
      title: "Worked example 5 (polytropic heat capacity)",
      problem:
        "Find the molar heat capacity of a monatomic gas in the process $pV^2 = $ const.",
      steps: [
        { text: "$C = C_V + \\dfrac{R}{1 - n} = \\tfrac32R + \\dfrac{R}{1 - 2} = \\tfrac32R - R = \\tfrac12R$. *Why this step:* $n = 2 > \\gamma$, so $C$ is positive but smaller than $C_V$." },
      ],
      answer: "$C = \\tfrac12R$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"adiabatic means the temperature is constant\"",
      content:
        "Adiabatic means **no heat exchange**, $Q = 0$. Precisely because no heat can flow in or out, the temperature changes: it rises on compression (the pump) and falls on expansion (the cloud). The constant-temperature process is *isothermal*, and it needs heat to flow freely.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "owt5-3-q1",
      variant: "practice",
      question: "A diatomic ideal gas ($\\gamma = 1.4$) is compressed adiabatically to $\\tfrac1{32}$ of its volume. By what factor does its absolute temperature rise?",
      answer: 4,
      hint: "Use $TV^{\\gamma - 1} = $ const, and write 32 as a power of 2.",
      solution: "$T \\propto V^{1-\\gamma}$, so $\\dfrac{T_2}{T_1} = 32^{0.4} = (2^5)^{0.4} = 2^2 = 4$.",
      commonMistakes: [
        { answer: 32, feedback: "That is the isothermal pressure ratio. Temperature goes as $V^{-(\\gamma-1)}$." },
        { answer: 128, feedback: "That is the pressure ratio, $32^{1.4} = 2^7$." },
        { answer: 1, feedback: "Adiabatic does not mean isothermal; compression heats the gas." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-3-q2",
      variant: "concept",
      question: "At a given point on a p–V diagram, how does the slope of the adiabat compare with that of the isotherm?",
      options: [
        { text: "The isotherm is steeper by the factor $\\gamma$.", feedback: "Reversed. In an adiabatic expansion the gas also cools, so its pressure drops faster." },
        { text: "The adiabat is steeper by the factor $\\gamma$.", correct: true, feedback: "$dp/dV = -\\gamma p/V$ versus $-p/V$." },
        { text: "They have the same slope, since both pass through the point.", feedback: "Passing through the same point does not make the slopes equal." },
      ],
      hint: "Differentiate $pV = $ const and $pV^\\gamma = $ const to get $dp/dV$ for each, and compare them at the same $(p, V)$.",
    },
    {
      type: "numeric",
      id: "owt5-3-q3",
      variant: "practice",
      question: "2 mol of a rigid diatomic ideal gas expands adiabatically and its temperature falls from 500 K to 400 K. How much work does it do, in joules? Use $R = 8.314$ J/(mol·K).",
      answer: 4157,
      relTolerance: 0.01,
      unit: "J",
      hint: "With $Q = 0$, the first law gives $W = -\\Delta U$.",
      solution: "$W = -\\Delta U = nC_V(T_1 - T_2) = 2 \\times \\tfrac52 \\times 8.314 \\times 100 \\approx 4157$ J.",
      commonMistakes: [
        { answer: 5820, feedback: "That uses $C_p$. With $Q = 0$, $W = -\\Delta U = nC_V(T_1 - T_2)$." },
        { answer: 2079, feedback: "That is for 1 mol." },
        { answer: 0, feedback: "No heat does not mean no work; the work comes out of the internal energy." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-3-q4",
      variant: "practice",
      question: "What is the molar heat capacity of a diatomic ideal gas in the process $pV^3 = $ const?",
      options: [
        { text: "$3R$", feedback: "You added $\\frac{R}{2}$. With $n = 3$, $\\frac{R}{1 - n} = -\\frac R2$." },
        { text: "$2R$", correct: true, feedback: "$C = \\tfrac52R + \\frac{R}{1 - 3} = \\tfrac52R - \\tfrac12R = 2R$." },
        { text: "$\\tfrac52R$", feedback: "That is $C_V$, correct only for $n \\to \\infty$ (isochoric)." },
        { text: "$0$", feedback: "$C = 0$ only for $n = \\gamma = 1.4$." },
      ],
      hint: "Use the polytropic heat-capacity result from 5.3 with this value of the index $n$, and $C_V$ for a diatomic gas.",
    },
    {
      type: "quiz",
      id: "owt5-3-q5",
      variant: "concept",
      question: "Starting from the same state, an ideal gas expands to the same final volume once isothermally and once adiabatically. Which is true?",
      options: [
        { text: "The adiabatic expansion ends at a higher pressure and does more work.", feedback: "That would be true for compressions, where the adiabat lies above the isotherm." },
        { text: "Both end at the same pressure, since $pV$ is fixed.", feedback: "$pV$ stays fixed only on the isotherm; on the adiabat $pV^\\gamma$ is fixed." },
        { text: "The adiabatic expansion ends at a lower pressure and does less work.", correct: true, feedback: "The adiabat is steeper, so it lies below the isotherm and encloses less area." },
      ],
      hint: "Sketch both curves from the same starting point on a p–V diagram, remembering which one is steeper. The work is the area under each.",
    },
    {
      type: "quiz",
      id: "owt5-3-q6",
      variant: "concept",
      multiple: true,
      question: "An ideal gas in an insulated cylinder expands slowly (quasi-statically) against a piston. Select every correct statement.",
      options: [
        { text: "No heat enters or leaves the gas.", correct: true, feedback: "Insulated means adiabatic: $Q = 0$." },
        { text: "The temperature of the gas falls.", correct: true, feedback: "The work done by the gas comes out of its internal energy, so $T$ drops (the cloud-forming effect)." },
        { text: "The gas does no work, since no heat is supplied.", feedback: "It pushes the piston out, so $W > 0$. That work is paid for by $\\Delta U = -W$." },
        { text: "The product $pV$ stays constant.", feedback: "$pV$ is constant on an isotherm. Here $pV^\\gamma$ is constant and $pV = nRT$ falls with $T$." },
      ],
      hint: "Insulated means $Q = 0$. What does the first law then say about $\\Delta U$?",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "cyclic-processes-and-pv-diagrams",
  title: "5.4 · Cycles and Reading Graphs",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A car engine does not expand its gas once and stop; it repeats the same sequence of steps thousands of times a minute, returning the gas (or fresh gas in the same state) to its starting point each time. A process that returns a system to its initial state is a **cycle**, and it is how every engine and refrigerator works.",
    },
    { type: "heading", text: "Net work equals enclosed area" },
    {
      type: "text",
      content:
        "**What a cycle does to the first law.** $U$ is a state function, so after a full cycle $\\Delta U = 0$. The first law then says",
    },
    { type: "math", latex: "\\Delta U_{\\text{cycle}} = 0 \\quad\\Longrightarrow\\quad Q_{\\text{net}} = W_{\\text{net}} = \\text{area enclosed by the loop}" },
    {
      type: "text",
      content:
        "Why the enclosed area? On the expansion part of the loop the gas does positive work, the area under the upper curve; on the compression part it does negative work, the area under the lower curve. The difference is the area inside. If the loop is traversed **clockwise** (expansion at high pressure, compression at low pressure) the net work is positive: an **engine**. **Anticlockwise** loops have negative net work: work is done on the gas, as in a **refrigerator** or heat pump.",
    },
    { type: "heading", text: "A rectangular cycle, leg by leg" },
    {
      type: "text",
      content:
        "The lab below runs a rectangular cycle: two isochores and two isobars, for 1 mol of monatomic gas starting at 100 kPa and 10 L. Read the per-leg table: which legs absorb heat and which reject it?",
    },
    {
      type: "interactive",
      config: {
        component: "owt-thermo-lab",
        mode: "cycle",
        cycle: "rectangle",
        gas: "monatomic",
        initial: { p: 100, v: 10 },
        finalVolume: 30,
        finalPressure: 300,
        sliders: ["finalVolume", "finalPressure"],
        caption:
          "Rectangle cycle 1 → 2 → 3 → 4 → 1 (1 is the bottom-left corner, 2 is directly above it). The enclosed area is W_net. Each row of the table obeys ΔU = Q − W, and the ΔU column sums to zero round the loop.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with the corners at 100 and 300 kPa, 10 and 30 L, the enclosed area is $200 \\times 20 = 4000$ J. The heating at constant volume (pressure rising) and the expansion at high pressure absorb heat; the cooling at constant volume and the compression at low pressure reject it. The panel lists the rejected heat $Q_{\\text{out}}$ as a negative number, so $W_{\\text{net}} = Q_{\\text{in}} + Q_{\\text{out}}$ (absorbed minus the size of the rejected heat), and the $\\Delta U$ entries cancel.",
    },
    { type: "heading", text: "Converting cycles between graphs" },
    {
      type: "text",
      content:
        "**Reading other graphs.** JEE loves to draw a cycle on a V–T or p–T diagram and ask for the p–V picture (or the work). Three facts do almost all the translation, all straight from $pV = nRT$:",
    },
    {
      type: "table",
      headers: ["Process", "On p–V", "On V–T", "On p–T"],
      rows: [
        ["Isobaric ($p$ fixed)", "horizontal line", "straight line through the origin ($V \\propto T$); steeper means lower $p$", "horizontal line"],
        ["Isochoric ($V$ fixed)", "vertical line", "horizontal line", "straight line through the origin ($p \\propto T$); steeper means smaller $V$"],
        ["Isothermal ($T$ fixed)", "hyperbola", "vertical line", "vertical line"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Method: converting a cycle between graphs",
      content:
        "1. Label every corner with all three of $p$, $V$, $T$ (use $pV = nRT$ to fill in the missing one).\n2. Identify each leg's type from the table: which variable stays fixed?\n3. Redraw on the new axes corner by corner, joining with the right shape (line, hyperbola).\n4. Read the direction off the new drawing to get the sign of $W_{\\text{net}}$.",
    },
    {
      type: "worked-example",
      id: "owt5-4-we1",
      title: "Worked example 1 (a triangular cycle)",
      problem:
        "A gas goes round a triangle on the p–V diagram with a base spanning 20 L (at the bottom) and a height of 200 kPa. Find the magnitude of the net work.",
      steps: [
        { text: "Enclosed area $= \\tfrac12 \\times 20 \\text{ L} \\times 200 \\text{ kPa} = 2000$ J. *Why this step:* kPa × L = J, so the triangle's area is already in joules." },
        { text: "Positive if traversed clockwise, negative if anticlockwise." },
      ],
      answer: "2000 J",
    },
    {
      type: "worked-example",
      id: "owt5-4-we2",
      title: "Worked example 2 (which legs absorb heat)",
      problem:
        "For the rectangle in the lab (1 mol monatomic gas; the lab's corners 1, 2, 3, 4 are A, B, C, D here: A = (10 L, 100 kPa), B = (10 L, 300 kPa), C = (30 L, 300 kPa), D = (30 L, 100 kPa)), find $Q$ for each leg.",
      steps: [
        { text: "Isochoric legs: $Q = nC_V\\Delta T = \\tfrac32 V\\Delta p$. A→B: $\\tfrac32 \\times 10 \\times 200 = +3000$ J. C→D: $\\tfrac32 \\times 30 \\times (-200) = -9000$ J. *Why this step:* $nR\\Delta T = V\\Delta p$ at fixed $V$, so no need for temperatures." },
        { text: "Isobaric legs: $Q = nC_p\\Delta T = \\tfrac52 p\\Delta V$. B→C: $\\tfrac52 \\times 300 \\times 20 = +15\\,000$ J. D→A: $\\tfrac52 \\times 100 \\times (-20) = -5000$ J." },
        { text: "Net: $3000 + 15\\,000 - 9000 - 5000 = 4000$ J, the enclosed area. ✓ Heat absorbed $Q_{\\text{in}} = 18\\,000$ J, so this engine's efficiency is $4000/18\\,000 \\approx 22\\%$." },
      ],
      answer: "A→B $+3000$ J, B→C $+15\\,000$ J, C→D $-9000$ J, D→A $-5000$ J (net 4000 J)",
    },
    {
      type: "worked-example",
      id: "owt5-4-we3",
      title: "Worked example 3 (from V–T to p–V)",
      problem:
        "$n$ moles of gas go round a cycle drawn on a V–T diagram: A $(T_0, V_0)$ → B $(2T_0, 2V_0)$ along a straight line through the origin, then B → C $(2T_0, V_0)$ straight down at constant $T$, then C → A along a horizontal line. Draw it on p–V and find the net work.",
      steps: [
        { text: "A→B: $V \\propto T$ through the origin, so isobaric at $p_0 = nRT_0/V_0$. On p–V: horizontal, rightwards, from $V_0$ to $2V_0$." },
        { text: "B→C: constant $T = 2T_0$, volume halves, so an isothermal compression. Pressure rises from $p_0$ to $2p_0$. On p–V: a hyperbola going up and to the left." },
        { text: "C→A: constant $V = V_0$, temperature halves, so isochoric; pressure falls from $2p_0$ to $p_0$. On p–V: straight down. *Why this step:* label each corner's $p$ first (step 1 of the method), then the shapes follow." },
        { text: "On p–V the loop runs right along the bottom, up-left along the hyperbola, then down: **anticlockwise**. Net work $= p_0V_0 + 2p_0V_0\\ln\\tfrac12 + 0 = p_0V_0(1 - 2\\ln 2) \\approx -0.39\\,p_0V_0$. Negative, as the direction predicts." },
      ],
      answer: "Anticlockwise on p–V; $W_{\\text{net}} = p_0V_0(1 - 2\\ln 2) \\approx -0.39\\,p_0V_0$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"net work is zero because the gas returns to its starting state\"",
      content:
        "Returning to the start makes $\\Delta U = 0$, because $U$ is a state function. Work is **not** a state function: it is the area under the path, and going out along one path and back along another leaves the enclosed area. That leftover area is the whole point of an engine.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "owt5-4-q1",
      variant: "practice",
      question: "A gas goes round a rectangle on a p–V diagram with pressures 100 kPa and 400 kPa and volumes 2 L and 5 L. What is the magnitude of the net work per cycle, in joules?",
      answer: 900,
      unit: "J",
      hint: "Net work is the enclosed area; kPa × L = J.",
      solution: "$|W_{\\text{net}}| = (400 - 100)\\text{ kPa} \\times (5 - 2)\\text{ L} = 300 \\times 3 = 900$ J.",
      commonMistakes: [
        { answer: 1500, feedback: "That is $300 \\times 5$, using the final volume instead of the change." },
        { answer: 1200, feedback: "That is the area under the top edge alone, $400 \\times 3$. Subtract the area under the bottom edge." },
        { answer: 0, feedback: "Only $\\Delta U$ is zero round a cycle. The work is the enclosed area." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-4-q2",
      variant: "concept",
      multiple: true,
      question: "A cycle is traversed anticlockwise on a p–V diagram. Select every correct conclusion.",
      options: [
        { text: "Net work is done by the gas, so it is an engine.", feedback: "That is clockwise: expansion at high pressure, compression at low pressure." },
        { text: "Net work is done on the gas, as in a refrigerator.", correct: true, feedback: "Anticlockwise means compression happens at the higher pressure, so $W_{\\text{net}} < 0$." },
        { text: "The internal energy rises each cycle.", feedback: "$\\Delta U = 0$ for every complete cycle, whatever the direction." },
        { text: "The gas gives out more heat than it absorbs in each cycle.", correct: true, feedback: "$Q_{\\text{net}} = W_{\\text{net}} < 0$: the work done on the gas leaves as extra heat." },
      ],
      hint: "The sense of traversal fixes the sign of the net work (5.4). Over a full cycle $\\Delta U = 0$, so use the first law to test each statement about heat and energy.",
    },
    {
      type: "quiz",
      id: "owt5-4-q3",
      variant: "practice",
      question: "In one cycle a gas absorbs 500 J and 200 J in two legs and rejects 300 J and 100 J in the other two. How much net work does it do per cycle?",
      options: [
        { text: "$1100$ J", feedback: "Rejected heat is negative $Q$; subtract it." },
        { text: "$700$ J", feedback: "That is the heat absorbed. Some of it is rejected." },
        { text: "$300$ J", correct: true, feedback: "$Q_{\\text{net}} = 700 - 400 = 300$ J, and $W_{\\text{net}} = Q_{\\text{net}}$ since $\\Delta U = 0$." },
        { text: "Zero", feedback: "$\\Delta U$ is zero, but the net heat, and so the net work, is not." },
      ],
      hint: "Over a whole cycle $\\Delta U = 0$, so the net work equals the net heat absorbed.",
    },
    {
      type: "quiz",
      id: "owt5-4-q4",
      variant: "concept",
      question: "On a p–T diagram, what does an isochoric process of an ideal gas look like?",
      options: [
        { text: "A horizontal line", feedback: "A horizontal line on p–T means constant pressure." },
        { text: "A vertical line", feedback: "A vertical line on p–T means constant temperature." },
        { text: "A straight line whose extension passes through the origin", correct: true, feedback: "$p = (nR/V)T$ with $V$ fixed: $p \\propto T$." },
        { text: "A hyperbola", feedback: "Hyperbolas belong to isotherms on the p–V diagram." },
      ],
      hint: "Use $pV = nRT$ with $V$ fixed: how does $p$ depend on $T$?",
    },
    {
      type: "quiz",
      id: "owt5-4-q5",
      variant: "concept",
      question: "Two isobars for the same amount of gas are drawn on a V–T diagram as straight lines through the origin. Line 1 is steeper than line 2. Which has the higher pressure?",
      options: [
        { text: "Line 1", feedback: "Slope is $V/T = nR/p$, so a steeper line means a *lower* pressure." },
        { text: "Line 2", correct: true, feedback: "$V = (nR/p)T$: the slope $nR/p$ is smaller for larger $p$." },
        { text: "They have the same pressure", feedback: "Different slopes on V–T mean different pressures." },
      ],
      hint: "On a V–T diagram an isobar is $V = \\dfrac{nR}{p}\\,T$. What does its slope tell you about $p$?",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "heat-engines-and-refrigerators",
  title: "5.5 · Heat Engines and Refrigerators",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A thermal power station burns coal to boil water, the steam spins a turbine, and then, curiously, huge cooling towers throw a great deal of heat away into the air. Why waste it? Because no engine running in a cycle can turn all the heat it absorbs into work. Some must always be dumped at a lower temperature. This lesson measures how much; the next explains why.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Heat engine and efficiency",
      content:
        "A **heat engine** takes heat $Q_H$ from a hot reservoir, does work $W$, and rejects heat $Q_C$ to a cold reservoir, returning to its starting state each cycle. By the first law over a cycle, $W = Q_H - Q_C$.\n**Efficiency** is what you get over what you pay: $\\eta = \\dfrac{W}{Q_H} = 1 - \\dfrac{Q_C}{Q_H}$.",
    },
    { type: "heading", text: "The Otto cycle" },
    {
      type: "text",
      content:
        "**The Otto cycle (a petrol engine).** An idealised four-stroke engine takes a fixed charge of air–fuel mixture through four steps: 1→2 adiabatic compression from $V_1$ to $V_2 = V_1/r$, where $r$ is the **compression ratio**; 2→3 heating at constant volume (the spark ignites the fuel); 3→4 adiabatic expansion back to $V_1$ (the power stroke); 4→1 cooling at constant volume (exhaust and fresh intake).",
    },
    {
      type: "text",
      content:
        "Heat enters only on 2→3 and leaves only on 4→1, both at constant volume: $Q_H = nC_V(T_3 - T_2)$ and $Q_C = nC_V(T_4 - T_1)$. The two adiabats connect the same pair of volumes, so by $TV^{\\gamma-1} = $ const:",
    },
    { type: "math", latex: "T_2 = T_1 r^{\\gamma - 1},\\quad T_3 = T_4 r^{\\gamma - 1} \\;\\Rightarrow\\; T_3 - T_2 = (T_4 - T_1)\\,r^{\\gamma - 1} \\;\\Rightarrow\\; \\eta_{\\text{Otto}} = 1 - \\frac{T_4 - T_1}{T_3 - T_2} = 1 - r^{1 - \\gamma}" },
    {
      type: "text",
      content:
        "The efficiency depends only on the compression ratio and the gas, not on how hot the burning fuel makes the mixture. Test that claim in the lab: change the pressure ratio (how much the spark raises the pressure) and then the compression ratio.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-thermo-lab",
        mode: "cycle",
        cycle: "otto",
        gas: "diatomic",
        compressionRatio: 8,
        pressureRatio: 2,
        sliders: ["compressionRatio", "pressureRatio"],
        caption:
          "Otto cycle for a diatomic working gas (γ = 1.4). The η from the table (W_net/Q_in) always matches the formula 1 − r^(1−γ).",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $r = 8$ the efficiency is about 0.565 whatever the pressure ratio. Raising the pressure ratio makes the loop taller and the work per cycle larger, but $Q_{\\text{in}}$ grows in the same proportion. Only increasing $r$ raises $\\eta$. (Real petrol engines stop around $r \\approx 10$ because higher compression makes the mixture ignite on its own, called knocking.)",
    },
    { type: "heading", text: "Running an engine backwards" },
    {
      type: "callout",
      variant: "definition",
      title: "Refrigerators and heat pumps",
      content:
        "Run an engine backwards: work $W$ drives heat $Q_C$ out of a cold space and dumps $Q_H = Q_C + W$ into a warm one.\nA **refrigerator** is judged by the heat removed per unit work: $\\text{COP}_{\\text{R}} = \\dfrac{Q_C}{W}$.\nA **heat pump** (warming a house) is judged by the heat delivered: $\\text{COP}_{\\text{HP}} = \\dfrac{Q_H}{W} = 1 + \\text{COP}_{\\text{R}}$.\nCOPs are usually larger than 1: moving heat is cheaper than making it.",
    },
    {
      type: "worked-example",
      id: "owt5-5-we1",
      title: "Worked example 1 (an engine's efficiency)",
      problem:
        "An engine absorbs 1000 J from the hot reservoir and rejects 600 J each cycle. Find the work per cycle and the efficiency.",
      steps: [
        { text: "$W = 1000 - 600 = 400$ J. *Why this step:* over a cycle $\\Delta U = 0$, so the net heat equals the net work." },
        { text: "$\\eta = 400/1000 = 40\\%$." },
      ],
      answer: "$W = 400$ J, $\\eta = 40\\%$",
    },
    {
      type: "worked-example",
      id: "owt5-5-we2",
      title: "Worked example 2 (Otto engine)",
      problem:
        "Find the ideal efficiency of an Otto engine with $r = 8$ and $\\gamma = 1.4$.",
      steps: [
        { text: "$r^{1-\\gamma} = 8^{-0.4} = 1/2.297 \\approx 0.435$. *Why this step:* $8^{0.4} = 2^{1.2} \\approx 2.30$." },
        { text: "$\\eta = 1 - 0.435 \\approx 0.565$, about 56%. Real engines manage roughly half of this because of friction and incomplete combustion." },
      ],
      answer: "$\\eta \\approx 0.565$ (about 56%)",
      tryFirst: false,
    },
    {
      type: "worked-example",
      id: "owt5-5-we3",
      title: "Worked example 3 (a refrigerator)",
      problem:
        "A refrigerator removes 300 J from its interior using 100 J of electrical work per cycle. Find its COP and the heat it dumps into the kitchen per cycle. What would its COP be as a heat pump?",
      steps: [
        { text: "$\\text{COP}_{\\text{R}} = 300/100 = 3$." },
        { text: "Heat dumped into the kitchen: $Q_H = 300 + 100 = 400$ J per cycle. *Why this step:* energy conservation; the work ends up as heat too." },
        { text: "Used as a heat pump, the same machine would have $\\text{COP}_{\\text{HP}} = 400/100 = 4 = 1 + 3$. ✓" },
      ],
      answer: "$\\text{COP}_{\\text{R}} = 3$; 400 J per cycle; $\\text{COP}_{\\text{HP}} = 4$",
    },
    {
      type: "worked-example",
      id: "owt5-5-we4",
      title: "Worked example 4 (engine power)",
      problem:
        "A power plant delivers 20 MW of electrical power at an overall efficiency of 25%. Find the rate at which it takes in heat and the rate at which it rejects heat.",
      steps: [
        { text: "Heat input rate $= 20/0.25 = 80$ MW." },
        { text: "Heat rejected $= 80 - 20 = 60$ MW, three times the useful output. That is what the cooling towers are for." },
      ],
      answer: "80 MW in; 60 MW rejected",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a better engine design could reach 100% efficiency\"",
      content:
        "Friction and leaks lower real efficiencies, but even a perfect, frictionless engine running in a cycle must reject some heat to a colder reservoir. For the Otto cycle, $\\eta = 1 - r^{1 - \\gamma}$ is less than 1 for every finite $r$. Lesson 5.6 shows this is not a feature of one cycle but a law of nature: the second law.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "owt5-5-q1",
      variant: "practice",
      question: "An engine absorbs 2000 J per cycle and does 500 J of work. What is its efficiency, and how much heat does it reject?",
      options: [
        { text: "25%, 2500 J", feedback: "The rejected heat is $Q_H - W$, not $Q_H + W$." },
        { text: "33%, 1500 J", feedback: "That is $W/Q_C$. Efficiency divides by the heat *absorbed*." },
        { text: "75%, 1500 J", feedback: "That is $Q_C/Q_H$, the fraction wasted." },
        { text: "25%, 1500 J", correct: true, feedback: "$\\eta = 500/2000$, and $Q_C = Q_H - W = 1500$ J." },
      ],
      hint: "Efficiency compares the useful work with the heat taken in, and energy conservation tells you where the rest goes.",
    },
    {
      type: "numeric",
      id: "owt5-5-q2",
      variant: "practice",
      question: "An Otto engine uses a gas with $\\gamma = 1.5$ and has compression ratio 4. What is its ideal efficiency, as a percentage?",
      answer: 50,
      unit: "%",
      hint: "$\\eta_{\\text{Otto}} = 1 - r^{1-\\gamma}$.",
      solution: "$\\eta = 1 - 4^{1 - 1.5} = 1 - 4^{-0.5} = 1 - \\tfrac12 = 50\\%$.",
      commonMistakes: [
        { answer: 75, feedback: "That uses $r^{-1}$ instead of $r^{1-\\gamma}$." },
        { answer: 87.5, feedback: "That uses $r^{-1.5}$, i.e. $\\gamma$ instead of $\\gamma - 1$." },
        { answer: 25, feedback: "That is $1/r$. The formula is $1 - r^{1-\\gamma}$." },
        { answer: 0.5, feedback: "That is the efficiency as a fraction. Give it as a percentage." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-5-q3",
      variant: "practice",
      question: "A refrigerator removes 600 J from the food compartment per cycle with 200 J of work. What is its COP, and how much heat goes into the kitchen?",
      options: [
        { text: "COP 3, 400 J", feedback: "The work adds to the heat dumped: $Q_H = Q_C + W$." },
        { text: "COP 3, 800 J", correct: true, feedback: "$600/200 = 3$, and $Q_H = 600 + 200 = 800$ J." },
        { text: "COP 4, 800 J", feedback: "4 is the heat-pump COP, $Q_H/W$. A refrigerator's COP is $Q_C/W$." },
        { text: "COP 0.33, 800 J", feedback: "COP is heat removed per unit work, $600/200$, not the inverse." },
      ],
      hint: "The COP compares the heat removed from the cold side with the work you pay for. The kitchen receives every joule that enters the refrigerator.",
    },
    {
      type: "quiz",
      id: "owt5-5-q4",
      variant: "practice",
      question: "A machine has a refrigerator COP of 4. What would its COP be as a heat pump?",
      options: [
        { text: "$3$", feedback: "The heat pump delivers *more* than the fridge removes, by exactly $W$." },
        { text: "$0.25$", feedback: "That is $1/\\text{COP}$, which has no special meaning here." },
        { text: "$4$", feedback: "The heat pump also delivers the work as heat, adding 1 to the COP." },
        { text: "$5$", correct: true, feedback: "$Q_H = Q_C + W$, so $Q_H/W = Q_C/W + 1$." },
      ],
      hint: "A heat pump counts the heat delivered to the hot side as its output. Relate that heat to the heat taken from the cold side and the work.",
    },
    {
      type: "quiz",
      id: "owt5-5-q5",
      variant: "concept",
      question: "In a closed, insulated room, you leave a running refrigerator's door open. Over time the room",
      options: [
        { text: "cools down, because the fridge blows cold air out.", feedback: "The heat taken from the air in front is dumped back into the same room at the back, plus the work." },
        { text: "warms up, because the electrical work ends up as heat in the room.", correct: true, feedback: "Net effect: $Q_H - Q_C = W$ is added to the room every cycle." },
        { text: "stays at the same temperature.", feedback: "The heat moves in a circle, but the work done by the motor is extra energy that stays in the room." },
      ],
      hint: "Treat the room as a closed, insulated system: which energy enters it from outside, and in what form does it end up?",
    },
    {
      type: "quiz",
      id: "owt5-5-q6",
      variant: "practice",
      multiple: true,
      question: "A refrigerator with $\\text{COP}_{\\text{R}} = 5$ uses 50 J of electrical work per cycle. Select every correct statement.",
      options: [
        { text: "It removes 250 J from the interior per cycle.", correct: true, feedback: "$Q_C = \\text{COP}_{\\text{R}} \\times W = 5 \\times 50 = 250$ J." },
        { text: "It delivers 300 J to the kitchen per cycle.", correct: true, feedback: "$Q_H = Q_C + W = 250 + 50 = 300$ J: the work ends up as heat too." },
        { text: "It delivers 250 J to the kitchen per cycle, the same as it removes.", feedback: "Energy conservation adds the work: $Q_H = Q_C + W$." },
        { text: "It violates the Clausius statement, since heat moves from cold to hot.", feedback: "Clausius forbids this only as the *sole* result. Here 50 J of work is supplied each cycle." },
      ],
      hint: "$\\text{COP}_{\\text{R}} = Q_C/W$, and energy is conserved over a cycle.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "second-law-and-carnot",
  title: "5.6 · The Second Law and the Carnot Engine",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "The first law would allow a ship to power itself by extracting heat from the ocean and turning it all into work, leaving a slightly cooler sea behind. Energy would be conserved. Yet no such engine exists, and none ever will. Nor has anyone ever seen a cup of tea spontaneously grow hotter while the room around it cools. The rule these observations express is the **second law of thermodynamics**.",
    },
    { type: "heading", text: "Kelvin–Planck and Clausius statements" },
    {
      type: "callout",
      variant: "definition",
      title: "The second law: two statements",
      content:
        "**Kelvin–Planck:** no process is possible whose *sole* result is the absorption of heat from a reservoir and its complete conversion into work. (No engine with $\\eta = 100\\%$.)\n**Clausius:** no process is possible whose *sole* result is the transfer of heat from a colder body to a hotter body. (No refrigerator without work.)",
    },
    {
      type: "text",
      content:
        "**They are equivalent (sketch).** Suppose a perfect engine existed, violating Kelvin–Planck. Use its work to drive an ordinary refrigerator between the same reservoirs. The combination moves heat from cold to hot with no net work, violating Clausius. Conversely, a perfect refrigerator paired with an ordinary engine gives a perfect engine. Breaking either statement breaks the other.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Reversible and irreversible processes",
      content:
        "A process is **reversible** if it can be run backwards, with the system and surroundings both returning exactly to their original states. That requires it to be quasi-static (a succession of equilibrium states) and free of dissipation. Friction, free expansion into a vacuum, mixing, and heat flow across a finite temperature difference are all **irreversible**. Every real process is irreversible; reversible ones are the ideal limit.",
    },
    { type: "heading", text: "The Carnot cycle" },
    {
      type: "text",
      content:
        "To avoid heat flowing across a temperature difference, an ideal engine should take in heat only at $T_H$ (touching the hot reservoir at the same temperature) and give it out only at $T_C$, and change temperature in between without any heat flow. That means two isotherms joined by two adiabats: A→B isothermal expansion at $T_H$, B→C adiabatic expansion to $T_C$, C→D isothermal compression at $T_C$, D→A adiabatic compression back to $T_H$.",
    },
    {
      type: "text",
      content:
        "**Deriving $Q_C/Q_H = T_C/T_H$** for $n$ moles of ideal gas. On the isotherms $\\Delta U = 0$, so the heat equals the work:",
    },
    { type: "math", latex: "Q_H = nRT_H\\ln\\frac{V_B}{V_A}, \\qquad Q_C = nRT_C\\ln\\frac{V_C}{V_D}" },
    {
      type: "text",
      content:
        "The adiabats B→C and D→A both connect $T_H$ to $T_C$, so $T_HV_B^{\\gamma - 1} = T_CV_C^{\\gamma - 1}$ and $T_HV_A^{\\gamma - 1} = T_CV_D^{\\gamma - 1}$. Dividing, $\\dfrac{V_B}{V_A} = \\dfrac{V_C}{V_D}$, so the logarithms cancel:",
    },
    { type: "math", latex: "\\frac{Q_C}{Q_H} = \\frac{T_C}{T_H} \\qquad\\Longrightarrow\\qquad \\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H}" },
    {
      type: "text",
      content:
        "Neither the gas, nor $n$, nor the volumes survived to the final answer. The lab below runs a Carnot cycle with the hot isotherm at about 500 K. Change the volumes and the cold temperature, and toggle the gas.",
    },
    {
      type: "interactive",
      config: {
        component: "owt-thermo-lab",
        mode: "cycle",
        cycle: "carnot",
        gas: "monatomic",
        gasToggle: true,
        initial: { p: 166.3, v: 25 },
        finalVolume: 50,
        coldTemperature: 300,
        sliders: ["finalVolume", "coldTemperature"],
        caption:
          "Carnot cycle: 1 mol, hot isotherm at 500 K through A (166.3 kPa, 25 L). The η from the per-leg table matches 1 − T_C/T_H whatever the volumes or the gas.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $T_C = 300$ K the efficiency reads 0.40 for either gas and any expansion volume. Stretching the hot isotherm makes the loop bigger and the work per cycle larger, but $Q_H$ grows in exactly the same proportion. Only the reservoir temperatures matter. Lower $T_C$ and $\\eta$ rises; it would reach 1 only at $T_C = 0$ K, which is unattainable.",
    },
    { type: "heading", text: "Carnot's theorem and entropy" },
    {
      type: "callout",
      variant: "definition",
      title: "Carnot's theorem",
      content:
        "No engine working between two reservoirs can be more efficient than a reversible engine working between the same reservoirs, and all reversible engines between them have the same efficiency, $1 - T_C/T_H$.\nFor a refrigerator the best possible COP is likewise $\\text{COP}_{\\text{R}} = \\dfrac{T_C}{T_H - T_C}$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Entropy (JEE Advanced flavour)",
      content:
        "The Carnot result can be written $\\dfrac{Q_H}{T_H} = \\dfrac{Q_C}{T_C}$: the quantity $Q/T$ taken in at the hot end equals that given out at the cold end. This suggests a new state function, **entropy**, with $dS = \\dfrac{dQ_{\\text{rev}}}{T}$. The second law then says: in any process in an isolated system, total entropy never decreases, $\\Delta S \\ge 0$, with equality only for reversible processes. Example: 1 kg of ice melting at 273 K gains $\\Delta S = \\dfrac{3.36\\times10^{5}}{273} \\approx 1230$ J/K.",
    },
    {
      type: "worked-example",
      id: "owt5-6-we1",
      title: "Worked example 1 (the ceiling)",
      problem:
        "What is the maximum possible efficiency of an engine working between 500 K and 300 K?",
      steps: [
        { text: "$\\eta_{\\max} = 1 - 300/500 = 0.40 = 40\\%$. *Why this step:* Carnot's theorem makes the reversible engine the ceiling for all engines between these reservoirs." },
      ],
      answer: "$\\eta_{\\max} = 40\\%$",
    },
    {
      type: "worked-example",
      id: "owt5-6-we2",
      title: "Worked example 2 (checking a claim)",
      problem:
        "An inventor claims an engine that takes 1000 J from a reservoir at 400 K, rejects 550 J to a reservoir at 300 K, and delivers 450 J of work. Is the claim possible?",
      steps: [
        { text: "The first law is satisfied: $1000 = 550 + 450$." },
        { text: "Claimed efficiency $= 45\\%$; Carnot limit $= 1 - 300/400 = 25\\%$. *Why this step:* the first law is necessary but not sufficient; the second law adds a ceiling." },
        { text: "The claim violates the second law. At most 250 J of work is possible." },
      ],
      answer: "No: 45% exceeds the Carnot limit of 25% (at most 250 J of work).",
    },
    {
      type: "worked-example",
      id: "owt5-6-we3",
      title: "Worked example 3 (which change helps more?)",
      problem:
        "An ideal engine runs between 400 K and 300 K. Is it better to raise $T_H$ by 50 K or to lower $T_C$ by 50 K?",
      steps: [
        { text: "Now: $\\eta = 1 - 300/400 = 25\\%$." },
        { text: "Raise $T_H$: $1 - 300/450 \\approx 33.3\\%$." },
        { text: "Lower $T_C$: $1 - 250/400 = 37.5\\%$. *Why this step:* $\\eta$ depends on the ratio $T_C/T_H$, and changing the smaller number changes the ratio more." },
        { text: "Lowering $T_C$ wins, though in practice the cold reservoir is usually the environment, which is hard to change." },
      ],
      answer: "Lowering $T_C$ by 50 K (37.5% against 33.3%)",
    },
    {
      type: "worked-example",
      id: "owt5-6-we4",
      title: "Worked example 4 (a Carnot freezer)",
      problem:
        "An ideal freezer keeps its interior at 250 K in a 300 K room. Find its maximum COP and the least work needed to remove 1000 J from the interior.",
      steps: [
        { text: "$\\text{COP}_{\\text{max}} = \\dfrac{250}{300 - 250} = 5$. To remove 1000 J needs at least 200 J of work." },
      ],
      answer: "$\\text{COP}_{\\max} = 5$; at least 200 J",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"efficiency depends on the working gas\"",
      content:
        "The Carnot derivation used an ideal gas, but $n$, $\\gamma$ and the volumes all cancelled. Carnot's theorem goes further: **any** reversible engine between $T_H$ and $T_C$, using steam, helium or a rubber band, has the same efficiency $1 - T_C/T_H$. (The Otto efficiency does depend on $\\gamma$, but the Otto cycle is not a two-reservoir reversible cycle.)",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "owt5-6-q1",
      variant: "practice",
      question: "What is the efficiency of a Carnot engine working between 127 °C and 27 °C?",
      options: [
        { text: "$78.7\\%$", feedback: "That uses Celsius: $1 - 27/127$. Carnot's formula needs kelvin." },
        { text: "$75\\%$", feedback: "That is $T_C/T_H$, the fraction of heat rejected." },
        { text: "$25\\%$", correct: true, feedback: "$1 - 300/400 = 0.25$." },
        { text: "$100\\%$", feedback: "Only a cold reservoir at 0 K would allow that." },
      ],
      hint: "The Carnot efficiency depends only on the two reservoir temperatures. Convert them to kelvin first.",
    },
    {
      type: "numeric",
      id: "owt5-6-q2",
      variant: "practice",
      question: "A Carnot engine has efficiency 40% and its cold reservoir is at 300 K. What is the hot reservoir's temperature, in kelvin?",
      answer: 500,
      unit: "K",
      hint: "$\\eta = 1 - T_C/T_H$, so $T_C/T_H = 1 - \\eta$.",
      solution: "$1 - \\dfrac{300}{T_H} = 0.4 \\Rightarrow \\dfrac{300}{T_H} = 0.6 \\Rightarrow T_H = \\dfrac{300}{0.6} = 500$ K.",
      commonMistakes: [
        { answer: 420, feedback: "That is $300 \\times 1.4$. Solve $T_C/T_H = 0.6$ instead." },
        { answer: 750, feedback: "That uses $T_C/T_H = 0.4$. The rejected fraction is $1 - \\eta = 0.6$." },
        { answer: 180, feedback: "The hot reservoir must be hotter than the cold one." },
        { answer: 227, feedback: "That is the right temperature in °C. The question asks for kelvin." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-6-q3",
      variant: "concept",
      question: "Which process would violate the Kelvin–Planck statement of the second law?",
      options: [
        { text: "A refrigerator that uses work to move heat from cold to hot.", feedback: "That is allowed; it needs work, which is exactly what Clausius requires." },
        { text: "An engine that takes heat from the sea and converts all of it into work in a cycle.", correct: true, feedback: "A cyclic engine with a single reservoir and $\\eta = 100\\%$ is precisely what Kelvin–Planck forbids." },
        { text: "A gas expanding isothermally, converting all absorbed heat into work.", feedback: "Allowed: it is not a cycle, and the gas ends in a different state (larger volume)." },
      ],
      hint: "Kelvin–Planck forbids a *cyclic* device whose *sole* effect is turning heat from one reservoir entirely into work. Check each option against both words.",
    },
    {
      type: "numeric",
      id: "owt5-6-q4",
      variant: "practice",
      question: "What is the maximum COP of a refrigerator keeping its interior at −3 °C in a room at 27 °C?",
      answer: 9,
      hint: "Convert to kelvin, then $\\text{COP}_{\\max} = \\dfrac{T_C}{T_H - T_C}$.",
      solution: "$T_C = 270$ K and $T_H = 300$ K, so $\\text{COP}_{\\max} = \\dfrac{T_C}{T_H - T_C} = \\dfrac{270}{30} = 9$.",
      commonMistakes: [
        { answer: 10, feedback: "That is $T_H/(T_H - T_C)$, the ideal heat-pump COP." },
        { answer: 0.1, feedback: "That is the Carnot *efficiency* $1 - T_C/T_H$, not a COP." },
        { answer: -0.1, feedback: "That mixes Celsius into the formula. Use kelvin: 270 K and 300 K." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-6-q5",
      variant: "concept",
      question: "An ideal engine runs between $T_H$ and $T_C$. Which single change increases its efficiency more: raising $T_H$ by $\\Delta$ or lowering $T_C$ by the same $\\Delta$?",
      options: [
        { text: "Raising $T_H$", feedback: "Try numbers: 400/300 K with $\\Delta = 50$ K gives 33.3% (raise $T_H$) vs 37.5% (lower $T_C$)." },
        { text: "Lowering $T_C$", correct: true, feedback: "$\\eta = 1 - T_C/T_H$ is more sensitive to the smaller temperature." },
        { text: "Both give the same increase", feedback: "The formula is a ratio, not a difference, so the two changes are not equivalent." },
      ],
      hint: "Write the change in $\\eta = 1 - T_C/T_H$ for each option (or try numbers), remembering that $T_C < T_H$.",
    },
    {
      type: "quiz",
      id: "owt5-6-q6",
      variant: "concept",
      question: "An insulated box is divided by a partition: one half holds an ideal gas, the other half is a vacuum. The partition is removed and the gas fills the box (free expansion). Which is true?",
      options: [
        { text: "The gas cools, because it expands with $Q = 0$ like an adiabatic process.", feedback: "The gas pushes on nothing, so it does no work. With $W = 0$ and $Q = 0$, $\\Delta U = 0$, and $pV^\\gamma$ does not apply: free expansion is not quasi-static." },
        { text: "The gas warms, because its molecules speed up to fill the extra space.", feedback: "Nothing does work on the molecules; their speeds, and so $T$, are unchanged." },
        { text: "$Q = 0$, $W = 0$, $\\Delta U = 0$, so the temperature is unchanged, yet the process is irreversible.", correct: true, feedback: "For an ideal gas $U$ depends only on $T$, so $T$ stays the same. The gas never spontaneously returns to one half: free expansion is irreversible (its entropy rises)." },
        { text: "The pressure stays the same, because the temperature is unchanged.", feedback: "Same $T$ with double the volume means half the pressure, from $pV = nRT$." },
      ],
      hint: "Apply the first law: is there any heat exchange, and does the gas push against anything as it spreads? For an ideal gas $U$ depends only on $T$.",
    },
    {
      type: "quiz",
      id: "owt5-6-q7",
      variant: "concept",
      multiple: true,
      question: "Select every process that is irreversible.",
      options: [
        { text: "An ideal gas expanding freely into a vacuum", correct: true, feedback: "The gas never gathers itself back into one half on its own: free expansion is irreversible." },
        { text: "Heat flowing from a hot block to a cold block in contact", correct: true, feedback: "Heat flow across a finite temperature difference cannot be undone without outside work." },
        { text: "A block sliding to rest on a rough floor, warming the floor", correct: true, feedback: "Friction turns ordered kinetic energy into internal energy; the floor will not cool and push the block back." },
        { text: "A very slow, frictionless isothermal expansion of a gas in contact with a reservoir at the gas's own temperature", feedback: "Quasi-static and dissipation-free, with heat flowing across no temperature difference: the ideal reversible process, as in the Carnot cycle." },
      ],
      hint: "Reversible needs quasi-static change, no friction, and no heat flow across a finite temperature difference.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-5-mastery",
  title: "5.7 · Chapter 5 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every question can be rebuilt from $W = \\int p\\,dV$ (area), $\\Delta U = nC_V\\Delta T$ for any process, $\\Delta U = Q - W$ with $W$ by the gas, $pV^\\gamma$ for adiabats, and $\\eta \\le 1 - T_C/T_H$. Use $R = 8.314$ J/(mol·K) and remember kPa × L = J.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 5 in 8 lines",
      content:
        "1. $W = \\int p\\,dV$ = area under the p–V path; positive for expansion.\n2. $\\Delta U = Q - W$; $U$ is a state function, $Q$ and $W$ are not.\n3. Isochoric $W = 0$; isobaric $Q = nC_p\\Delta T$; isothermal $Q = W = nRT\\ln(V_2/V_1)$.\n4. Adiabatic: $pV^\\gamma$, $TV^{\\gamma-1}$ constant; $W = (p_1V_1 - p_2V_2)/(\\gamma - 1)$; adiabat steeper by $\\gamma$.\n5. Polytropic $pV^n$: $C = C_V + R/(1 - n)$, negative for $1 < n < \\gamma$.\n6. Cycle: $\\Delta U = 0$, $W_{\\text{net}}$ = enclosed area, clockwise = engine.\n7. $\\eta = W/Q_H = 1 - Q_C/Q_H$; Otto $1 - r^{1-\\gamma}$; $\\text{COP}_{\\text{R}} = Q_C/W$.\n8. Second law: $\\eta \\le 1 - T_C/T_H$, reached only by reversible (Carnot) engines.",
    },
    {
      type: "numeric",
      id: "owt5-7-q1",
      variant: "mastery",
      question: "A gas expands along a straight line on the p–V diagram from (2 L, 100 kPa) to (6 L, 300 kPa). How much work does it do, in joules?",
      answer: 800,
      unit: "J",
      hint: "The area under a straight-line path is a trapezium.",
      solution: "$W = \\tfrac12(p_1 + p_2)\\,\\Delta V = \\tfrac12(100 + 300)\\text{ kPa} \\times 4\\text{ L} = 800$ J.",
      commonMistakes: [
        { answer: 400, feedback: "That uses only the lower pressure, $100 \\times 4$. The pressure rises along the path." },
        { answer: 1200, feedback: "That uses only the final pressure, $300 \\times 4$." },
        { answer: 1600, feedback: "That is $p_2V_2 - p_1V_1 = 1800 - 200$. Work is the area under the path, not the change in $pV$." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-7-q2",
      variant: "mastery",
      question: "A gas is compressed by 500 J of work done on it and gives out 200 J of heat. What is the change in its internal energy?",
      options: [
        { text: "$-700$ J", feedback: "Work done *on* the gas adds energy; with $W$ by the gas, $W = -500$ J." },
        { text: "$+700$ J", feedback: "The heat given out must be subtracted." },
        { text: "$+300$ J", correct: true, feedback: "$Q = -200$, $W = -500$: $\\Delta U = -200 + 500 = +300$ J." },
        { text: "$-300$ J", feedback: "Sign slip: more energy entered as work than left as heat." },
      ],
      hint: "The first law and its sign convention (5.1).",
    },
    {
      type: "quiz",
      id: "owt5-7-q3",
      variant: "mastery",
      question: "3 mol of a rigid diatomic ideal gas is heated at constant pressure by 20 K. How much heat does it absorb?",
      options: [
        { text: "About 1247 J", feedback: "That uses $C_V$. At constant pressure the gas also does work, so use $C_p$." },
        { text: "About 1746 J", correct: true, feedback: "$Q = nC_p\\Delta T = 3 \\times \\tfrac72 \\times 8.314 \\times 20 \\approx 1746$ J." },
        { text: "About 499 J", feedback: "That is only the work, $nR\\Delta T$." },
        { text: "About 582 J", feedback: "That is for 1 mol. There are 3 mol." },
      ],
      hint: "Heating at constant pressure (5.2): which molar heat capacity applies?",
    },
    {
      type: "numeric",
      id: "owt5-7-q4",
      variant: "mastery",
      question: "1 mol of an ideal gas at 300 K is compressed isothermally from 20 L to 5 L. How much work is done **on** the gas, in kJ?",
      answer: 3.46,
      relTolerance: 0.01,
      unit: "kJ",
      hint: "Work done on the gas is minus the work done by it: $W_{\\text{on}} = nRT\\ln(V_1/V_2)$.",
      solution: "$W_{\\text{on}} = RT\\ln\\dfrac{V_1}{V_2} = 8.314 \\times 300 \\times \\ln 4 \\approx 2494 \\times 1.386 \\approx 3458$ J $\\approx 3.46$ kJ.",
      commonMistakes: [
        { answer: -3.46, feedback: "That is the work done *by* the gas. Work done on it is positive in a compression." },
        { answer: 1.73, feedback: "That uses $\\ln 2$. The volume is quartered, so it is $\\ln 4$." },
        { answer: 0, feedback: "$\\Delta U$ is zero, not the work. The work leaves as heat to the reservoir." },
      ],
    },
    {
      type: "numeric",
      id: "owt5-7-q5",
      variant: "mastery",
      question: "A monatomic ideal gas is compressed adiabatically to $\\tfrac1{27}$ of its volume. By what factor does its pressure increase?",
      answer: 243,
      hint: "$pV^\\gamma = $ const with $\\gamma = 5/3$; write 27 as $3^3$.",
      solution: "$\\dfrac{p_2}{p_1} = 27^{5/3} = (3^3)^{5/3} = 3^5 = 243$.",
      commonMistakes: [
        { answer: 27, feedback: "That is the isothermal result, $pV = $ const." },
        { answer: 9, feedback: "That is the temperature factor, $27^{2/3}$." },
        { answer: 81, feedback: "That is $27^{4/3}$. For a monatomic gas $\\gamma = 5/3$." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-7-q6",
      variant: "mastery",
      question: "At a given state of a diatomic ideal gas, what is (slope of adiabat) ÷ (slope of isotherm) on the p–V diagram?",
      options: [
        { text: "$1/1.4$", feedback: "The adiabat is the steeper one, so the ratio exceeds 1." },
        { text: "$1.67$", feedback: "That is $\\gamma$ for a monatomic gas." },
        { text: "$1.4$", correct: true, feedback: "The ratio is $\\gamma$, and $\\gamma = 7/5$ for a rigid diatomic gas." },
        { text: "$1$", feedback: "They cross at the point but with different slopes." },
      ],
      hint: "Slopes of an adiabat and an isotherm (5.3): what is $\\gamma$ for a diatomic gas?",
    },
    {
      type: "quiz",
      id: "owt5-7-q7",
      variant: "mastery",
      question: "What is the molar heat capacity of a monatomic ideal gas in the process $pV^{1.2} = $ const?",
      options: [
        { text: "$6.5R$", feedback: "Sign slip: $1 - n = -0.2$, so $\\frac{R}{1 - n} = -5R$." },
        { text: "$1.5R$", feedback: "That is $C_V$ alone; the process also involves work." },
        { text: "$0$", feedback: "$C = 0$ only for the adiabat, $n = \\gamma = 5/3$." },
        { text: "$-3.5R$", correct: true, feedback: "$C = \\tfrac32R + \\frac{R}{1 - 1.2} = 1.5R - 5R = -3.5R$: the gas absorbs heat yet cools." },
      ],
      hint: "Molar heat capacity in a polytropic process (5.3): the answer may be negative.",
    },
    {
      type: "quiz",
      id: "owt5-7-q8",
      variant: "mastery",
      question: "A gas goes round the triangle A (1 L, 100 kPa) → B (3 L, 100 kPa) → C (3 L, 300 kPa) → A along straight lines. What is the net work done **by** the gas per cycle?",
      options: [
        { text: "$+200$ J", feedback: "The size is right, but the loop runs anticlockwise (right, up, then back down-left), so the net work by the gas is negative." },
        { text: "$-200$ J", correct: true, feedback: "A→B: $+200$ J; B→C: 0; C→A: $-\\tfrac12(300 + 100) \\times 2 = -400$ J. Net $-200$ J." },
        { text: "$-400$ J", feedback: "That is only the C→A leg. Add the $+200$ J from the expansion A→B." },
        { text: "Zero", feedback: "The gas returns to A, so $\\Delta U = 0$, but the enclosed area is not zero." },
      ],
      hint: "Cycles on a p–V diagram (5.4): the enclosed area and the direction of travel.",
    },
    {
      type: "quiz",
      id: "owt5-7-q9",
      variant: "mastery",
      question: "On a V–T diagram, a gas goes from A to B along a straight line that passes through the origin when extended. What does this leg look like on a p–V diagram?",
      options: [
        { text: "A vertical line (constant volume)", feedback: "Constant volume would be a horizontal line on V–T." },
        { text: "A hyperbola (constant temperature)", feedback: "Constant temperature would be a vertical line on V–T." },
        { text: "A horizontal line (constant pressure)", correct: true, feedback: "$V \\propto T$ means $p = nRT/V$ is constant: isobaric." },
        { text: "A straight line through the origin", feedback: "A line through the origin on V–T maps to constant $p$, which is horizontal on p–V." },
      ],
      hint: "Reading a V–T graph (5.4) with $pV = nRT$.",
    },
    {
      type: "quiz",
      id: "owt5-7-q10",
      variant: "mastery",
      question: "An inventor claims an engine working between reservoirs at 1000 K and 400 K with an efficiency of 65%. What do you conclude?",
      options: [
        { text: "Possible: 65% is below 100%.", feedback: "The ceiling is not 100% but the Carnot limit, $1 - 400/1000$." },
        { text: "Impossible: the Carnot limit is 60%.", correct: true, feedback: "$\\eta_{\\max} = 1 - 0.4 = 0.6$, and no engine can beat a reversible one between the same reservoirs." },
        { text: "Possible if the working gas has a large $\\gamma$.", feedback: "The Carnot limit does not depend on the working substance." },
        { text: "Impossible: the first law is violated.", feedback: "Nothing about 65% violates energy conservation. It is the second law that forbids it." },
      ],
      hint: "The Carnot limit (5.6).",
    },
    {
      type: "quiz",
      id: "owt5-7-q11",
      variant: "mastery",
      question: "An ideal (Carnot) refrigerator keeps its interior at −3 °C in a room at 27 °C. How much work is needed to remove 900 J from the interior, and how much heat reaches the room?",
      options: [
        { text: "100 J of work; 800 J to the room", feedback: "The work is added to the heat dumped, not subtracted." },
        { text: "90 J of work; 990 J to the room", feedback: "That uses COP = 10, the heat-pump value $T_H/(T_H - T_C)$." },
        { text: "900 J of work; 1800 J to the room", feedback: "That assumes COP = 1. Moving heat across a small temperature gap is much cheaper." },
        { text: "100 J of work; 1000 J to the room", correct: true, feedback: "$\\text{COP} = 270/30 = 9$, so $W = 900/9 = 100$ J and $Q_H = 900 + 100 = 1000$ J." },
      ],
      hint: "The Carnot refrigerator (5.5–5.6): COP from the reservoir temperatures in kelvin.",
    },
    {
      type: "numeric",
      id: "owt5-7-q12",
      variant: "mastery",
      question: "1 mol of monatomic ideal gas at A (300 K) runs a cycle: A→B isobaric expansion to twice the volume; B→C adiabatic expansion until the temperature is back to 300 K; C→A isothermal compression back to A. What is the efficiency of this cycle, as a percentage? ($\\ln 2 = 0.693$)",
      answer: 30.7,
      relTolerance: 0.02,
      unit: "%",
      hint: "Find $T_B$, then $V_C$ from $TV^{\\gamma - 1} = $ const, then the heat on each leg.",
      solution: "A→B (isobaric, volume doubles): $T_B = 600$ K and $Q_{AB} = \\tfrac52R(300) \\approx 6236$ J absorbed.\n\nB→C (adiabatic): $Q = 0$. From $TV^{2/3} = $ const, $V_C/V_B = 2^{3/2}$, so $V_C/V_A = 2\\times2^{3/2} = 2^{5/2}$.\n\nC→A (isothermal compression at 300 K): $Q_{CA} = -300R\\ln 2^{5/2} = -300R \\times 2.5 \\times 0.693 \\approx -4322$ J.\n\n$\\eta = \\dfrac{6236 - 4322}{6236} \\approx 0.307 = 30.7\\%$.",
      commonMistakes: [
        { answer: 50, feedback: "That is the Carnot limit between 600 K and 300 K. This cycle absorbs its heat over a range of temperatures, so it falls short." },
        { answer: 69.3, feedback: "That is $Q_{\\text{out}}/Q_{\\text{in}}$, the fraction rejected. Efficiency is one minus that." },
        { answer: 58.4, feedback: "That uses $V_C/V_A = 2^{3/2}$, forgetting that B already had twice A's volume." },
        { answer: 0.307, tolerance: 0.005, feedback: "That is the efficiency as a fraction. Give it as a percentage." },
      ],
    },
    {
      type: "quiz",
      id: "owt5-7-q13",
      variant: "mastery",
      multiple: true,
      question: "An ideal gas is taken once round a clockwise cycle on the p–V diagram, enclosing a non-zero area. Select every quantity whose total change (or net value) over the complete cycle is zero.",
      options: [
        { text: "The change in internal energy, $\\Delta U$", correct: true, feedback: "$U$ is a state function and the gas returns to its starting state." },
        { text: "The change in temperature, $\\Delta T$", correct: true, feedback: "$T$ is a state variable; back at the start, it has its starting value." },
        { text: "The net work done by the gas", feedback: "Net work is the enclosed area, positive for a clockwise loop." },
        { text: "The net heat absorbed by the gas", feedback: "$Q_{\\text{net}} = W_{\\text{net}}$ because $\\Delta U = 0$, so it equals the (non-zero) enclosed area." },
      ],
      hint: "Which of these are state functions?",
    },
  ]),
};

export const owtChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
