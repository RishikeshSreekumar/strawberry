import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Electricity and Magnetism Chapter 2 — Capacitors.
 * A capacitor stores charge (and energy) at a potential difference. Derive
 * C for standard geometries, combine capacitors, fill them with
 * dielectrics, count the energy, share charge, and watch them charge
 * through a resistor.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "capacitance",
  title: "2.1 · Capacitance",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "A camera flash charges for a few seconds and then dumps its energy into the bulb in a thousandth of a second. A defibrillator does the same to restart a heart. Somewhere inside, charge is being stored and released on demand. The device is a **capacitor**: two conductors, close together, carrying equal and opposite charges.",
    },
    {
      type: "text",
      content:
        "Give a conductor charge $Q$ and it rises to some potential $V$. Double $Q$ and every surface charge doubles, so every field doubles and so does $V$ (all our formulas were linear in charge). The ratio $Q/V$ therefore does not depend on $Q$. It depends only on the shape and size of the conductors and on the material around them.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Capacitance",
      content:
        "For a pair of conductors carrying $+Q$ and $-Q$ with potential difference $V$ between them:\n$C = \\dfrac{Q}{V}$\nFor a single isolated conductor, $V$ is its potential (the other \"plate\" is at infinity). Unit: the farad, $1\\ \\text{F} = 1\\ \\text{C/V}$. Practical capacitors are measured in μF, nF and pF.",
    },
    {
      type: "text",
      content:
        "**An isolated sphere.** A sphere of radius $R$ with charge $Q$ has $V = kQ/R$, so",
    },
    { type: "math", latex: "C = \\frac{Q}{V} = \\frac{R}{k} = 4\\pi\\varepsilon_0R" },
    {
      type: "text",
      content:
        "Put in the Earth, $R = 6.4\\times10^6$ m: $C = 6.4\\times10^6/9\\times10^9 \\approx 7.1\\times10^{-4}$ F $= 711\\ \\mu$F. The whole planet is less than a thousandth of a farad. A farad is a huge unit.\n\n**Parallel plates.** Two plates of area $A$, a small distance $d$ apart, carry $+Q$ and $-Q$. Each is a sheet with $\\sigma = Q/A$, and from 1.3 two opposite sheets give a uniform field $E = \\sigma/\\varepsilon_0$ between them and zero outside. The potential difference is $V = Ed$:",
    },
    {
      type: "math",
      latex: "V = \\frac{\\sigma}{\\varepsilon_0}d = \\frac{Qd}{\\varepsilon_0A}\\quad\\Rightarrow\\quad C = \\frac{\\varepsilon_0A}{d}",
    },
    {
      type: "text",
      content:
        "Bigger plates hold more charge at the same voltage; closer plates hold more too, because the same charge makes a smaller voltage. (We ignored the fringing field at the edges, which is fine when $d$ is small compared with the plate size.)\n\n**Spherical capacitor** (inner radius $a$, outer $b$): the field between is $kQ/r^2$, so $V = kQ\\left(\\dfrac1a - \\dfrac1b\\right)$ and $C = 4\\pi\\varepsilon_0\\dfrac{ab}{b - a}$. As $b \\to \\infty$ this becomes the isolated sphere.\n\n**Cylindrical capacitor** (length $L$, radii $a < b$): the field is $\\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}$, so $V = \\dfrac{\\lambda}{2\\pi\\varepsilon_0}\\ln\\dfrac ba$ and $C = \\dfrac{2\\pi\\varepsilon_0L}{\\ln(b/a)}$. A coaxial TV cable is one.",
    },
    {
      type: "table",
      headers: ["Geometry", "Capacitance", "Depends on"],
      rows: [
        ["Isolated sphere, radius $R$", "$4\\pi\\varepsilon_0R$", "size only"],
        ["Parallel plates, area $A$, gap $d$", "$\\dfrac{\\varepsilon_0A}{d}$", "area and gap"],
        ["Concentric spheres, $a < b$", "$4\\pi\\varepsilon_0\\dfrac{ab}{b-a}$", "both radii"],
        ["Coaxial cylinders, length $L$", "$\\dfrac{2\\pi\\varepsilon_0L}{\\ln(b/a)}$", "length and radius ratio"],
      ],
    },
    {
      type: "text",
      content:
        "Slide the gap below for plates of area 100 cm². With $\\varepsilon_0A = 8.85\\times10^{-14}$ F m, $C = 88.5/d$ pF when $d$ is in millimetres.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "88.5/x",
        exprLatex: "C = \\frac{\\varepsilon_0 A}{d} = \\frac{88.5}{d}\\ \\text{pF}",
        min: 0.5,
        max: 10,
        step: 0.5,
        initial: 1,
        inputLabel: "Plate gap d",
        inputUnit: "mm",
        outputLabel: "Capacitance (pF)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at 1 mm the capacitance is 88.5 pF; at 2 mm it halves to 44.25 pF; at 0.5 mm it doubles to 177 pF. $C \\propto 1/d$. That is why real capacitors use very thin insulating films rolled up into a small can: huge area, tiny gap.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (how big is a farad?).** What plate area gives a 1 F parallel-plate capacitor with a 1 mm air gap?\n\n1. $A = \\dfrac{Cd}{\\varepsilon_0} = \\dfrac{1\\times10^{-3}}{8.85\\times10^{-12}} \\approx 1.1\\times10^8$ m².\n2. That is a square about 10.6 km on a side. *Why this step:* a number this silly is the best way to remember that practical capacitors are μF or smaller (supercapacitors cheat with nanometre gaps and porous carbon of enormous area).",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (scaling).** A parallel-plate capacitor has $C = 20$ pF. Find $C$ if (a) the gap is doubled, (b) the area is doubled, (c) both are doubled.\n\n1. (a) $C \\propto 1/d$: 10 pF.\n2. (b) $C \\propto A$: 40 pF.\n3. (c) The two changes cancel: 20 pF. *Why this step:* reason with proportions; there is no need to know $A$ or $d$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (charge on the plates).** A capacitor with $A = 100$ cm² and $d = 1$ mm is connected to a 100 V battery. Find $C$, the charge, and the field between the plates.\n\n1. $C = 88.5$ pF (from the machine above).\n2. $Q = CV = 88.5\\times10^{-12}\\times100 = 8.85\\times10^{-9}$ C $= 8.85$ nC.\n3. $E = V/d = 100/10^{-3} = 10^5$ V/m. Check with the sheet formula: $\\sigma/\\varepsilon_0 = (8.85\\times10^{-9}/0.01)/8.85\\times10^{-12} = 10^5$ V/m. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a capacitor's capacitance grows if you put more charge on it\"",
      content:
        "$C = Q/V$ looks as if more $Q$ means more $C$, but adding charge raises $V$ in exact proportion, so the ratio is unchanged. Capacitance is fixed by geometry and material, like the volume of a bucket. A bucket's volume does not change with how much water is in it; what changes is the \"pressure\" (voltage) needed to hold that much.",
    },
    {
      type: "quiz",
      id: "em2-1-q1",
      variant: "practice",
      question: "What is the capacitance of an isolated metal sphere of radius 9 cm?",
      options: [
        { text: "$10\\ \\mu$F", feedback: "Check the power of ten: $0.09/9\\times10^9 = 10^{-11}$ F, which is 10 pF." },
        { text: "$10$ pF", correct: true, feedback: "$C = R/k = 0.09/(9\\times10^9) = 10^{-11}$ F." },
        { text: "$1$ pF", feedback: "Convert 9 cm to 0.09 m, not 0.009 m." },
      ],
    },
    {
      type: "quiz",
      id: "em2-1-q2",
      variant: "practice",
      question: "Parallel plates of area 0.02 m² are 1 mm apart in air. The capacitance is",
      options: [
        { text: "$177$ pF", correct: true, feedback: "$8.85\\times10^{-12}\\times0.02/10^{-3} = 1.77\\times10^{-10}$ F." },
        { text: "$0.177$ pF", feedback: "Divide by $d = 10^{-3}$ m, which multiplies by 1000." },
        { text: "$17.7$ pF", feedback: "Recheck: $8.85\\times0.02 = 0.177$, then $\\div10^{-3}$ gives $177$ (in pF)." },
      ],
    },
    {
      type: "quiz",
      id: "em2-1-q3",
      variant: "concept",
      question: "The charge on an isolated capacitor is doubled. What happens to $C$ and $V$?",
      options: [
        { text: "$C$ doubles, $V$ unchanged", feedback: "$C$ depends only on geometry and material." },
        { text: "Both double", feedback: "If both doubled, $Q = CV$ would quadruple." },
        { text: "$C$ unchanged, $V$ doubles", correct: true, feedback: "$V = Q/C$ rises in step with $Q$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-1-q4",
      variant: "practice",
      question: "The plate area of a parallel-plate capacitor is doubled and its gap halved. The capacitance becomes",
      options: [
        { text: "$C$", feedback: "Both changes increase $C$; they do not cancel." },
        { text: "$2C$", feedback: "Halving the gap also doubles $C$." },
        { text: "$C/4$", feedback: "A smaller gap raises $C$, it does not lower it." },
        { text: "$4C$", correct: true, feedback: "$\\times2$ for the area and $\\times2$ for the gap." },
      ],
    },
    {
      type: "quiz",
      id: "em2-1-q5",
      variant: "practice",
      question: "A spherical capacitor has radii 9 cm and 10 cm. Its capacitance is",
      options: [
        { text: "$10$ pF", feedback: "That is the isolated 9 cm sphere. The nearby outer shell multiplies it by $b/(b - a) = 10$." },
        { text: "$100$ pF", correct: true, feedback: "$\\dfrac{ab}{k(b - a)} = \\dfrac{0.009}{9\\times10^9\\times0.01} = 10^{-10}$ F." },
        { text: "$1$ nF", feedback: "Check $b - a$: 10 cm $-$ 9 cm $= 1$ cm $= 0.01$ m, not 1 mm." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "combinations-of-capacitors",
  title: "2.2 · Series and Parallel",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "You need 5 μF and the drawer has only 2 μF and 3 μF capacitors. Or you need a capacitor that survives 1000 V and yours are rated 500 V. Both problems are solved by combining capacitors, and two ideas from earlier chapters decide how: **charge is conserved**, and **potential is single-valued** (going round any loop brings you back to the same potential).",
    },
    {
      type: "text",
      content:
        "**In parallel** (each capacitor connected directly across the same two points):\n\n1. Same potential difference $V$ across each, because their plates are joined by wires (conductors are equipotentials).\n2. Charges $Q_i = C_iV$, and the total charge drawn is $Q = \\sum Q_i = \\left(\\sum C_i\\right)V$.\n3. So the equivalent capacitance is the sum.",
    },
    { type: "math", latex: "C_{\\text{par}} = C_1 + C_2 + \\dots" },
    {
      type: "text",
      content:
        "Physically, parallel capacitors just add plate area.\n\n**In series** (end to end):\n\n1. The battery puts $+Q$ on the first plate. It induces $-Q$ on the facing plate. The isolated island between two capacitors (one plate of each plus the wire) was neutral and stays neutral, so its other plate gets $+Q$. Every capacitor carries the **same charge** $Q$.\n2. The voltages add (KVL): $V = V_1 + V_2 + \\dots = Q\\left(\\dfrac{1}{C_1} + \\dfrac{1}{C_2} + \\dots\\right)$.\n3. So",
    },
    { type: "math", latex: "\\frac{1}{C_{\\text{ser}}} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots\\qquad\\left(\\text{two: } C = \\frac{C_1C_2}{C_1 + C_2}\\right)" },
    {
      type: "text",
      content:
        "Series capacitors act like one capacitor with a wider gap, so the result is **smaller** than the smallest. And since $V_i = Q/C_i$, the **smallest** capacitor takes the **largest** share of the voltage: $V_i \\propto 1/C_i$.",
    },
    {
      type: "table",
      headers: ["", "Series", "Parallel"],
      rows: [
        ["Same for each", "charge $Q$", "voltage $V$"],
        ["Adds up", "voltages", "charges"],
        ["Equivalent", "$1/C = \\sum 1/C_i$ (less than the smallest)", "$C = \\sum C_i$ (more than the largest)"],
        ["Shares", "$V_i \\propto 1/C_i$", "$Q_i \\propto C_i$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1 (2, 3 and 6 μF).** Find the equivalent capacitance in series and in parallel.\n\n1. Series: $\\dfrac1C = \\dfrac12 + \\dfrac13 + \\dfrac16 = \\dfrac{3 + 2 + 1}{6} = 1$, so $C = 1\\ \\mu$F. Less than the smallest (2 μF). ✓\n2. Parallel: $C = 2 + 3 + 6 = 11\\ \\mu$F.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (a mixed network).** A 3 μF capacitor is in series with a parallel pair of 2 μF and 4 μF, across 12 V. Find the charge and voltage on each.\n\n1. Parallel pair: $2 + 4 = 6\\ \\mu$F. *Why this step:* reduce the innermost group first, then work outwards.\n2. With the 3 μF in series: $C = \\dfrac{3\\times6}{3 + 6} = 2\\ \\mu$F.\n3. Total charge: $Q = CV = 2\\times12 = 24\\ \\mu$C. This flows through the series chain, so the 3 μF has $24\\ \\mu$C and $V_3 = 24/3 = 8$ V.\n4. The pair has $12 - 8 = 4$ V across it (check: $24/6 = 4$ V ✓). So the 2 μF holds $8\\ \\mu$C and the 4 μF holds $16\\ \\mu$C. *Why this step:* going back out, each parallel member gets the pair's voltage, and the charges add to $24\\ \\mu$C.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a balanced bridge).** Between A and B: an upper branch of 2 μF then 4 μF in series, a lower branch of 1 μF then 2 μF in series, and a 5 μF capacitor joining the midpoints of the two branches. Find $C_{AB}$.\n\n1. Check whether the midpoints are at the same potential. In series, $V_i \\propto 1/C_i$. Upper: the 2 μF takes $\\tfrac{4}{6} = \\tfrac23$ of $V$. Lower: the 1 μF takes $\\tfrac23$ of $V$ too. *Why this step:* a bridge is balanced when the ratios match, $C_1/C_2 = C_3/C_4$ ($2/4 = 1/2$).\n2. Equal potentials at the midpoints mean the 5 μF has no voltage across it and no charge. Remove it.\n3. Upper: $\\dfrac{2\\times4}{6} = \\dfrac43\\ \\mu$F. Lower: $\\dfrac{1\\times2}{3} = \\dfrac23\\ \\mu$F. In parallel: $C_{AB} = 2\\ \\mu$F.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (voltage rating).** Two 4 μF capacitors, each rated at 500 V, are joined in series. What is the combination's capacitance and safe working voltage?\n\n1. $C = \\dfrac{4\\times4}{8} = 2\\ \\mu$F.\n2. Equal capacitors in series share the voltage equally, so the pair survives $2\\times500 = 1000$ V. *Why this step:* this is the practical reason to connect in series; you trade capacitance for voltage.\n3. With **unequal** capacitors the smaller one takes more voltage, and it fails first.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"capacitors in series share the voltage equally\"",
      content:
        "They share the **charge** equally. The voltage splits as $1/C$: across 12 V, a 2 μF and a 4 μF in series get 8 V and 4 V. The smaller capacitor takes the bigger share, opposite to what intuition from resistors (where the bigger resistor takes more) might suggest.",
    },
    {
      type: "quiz",
      id: "em2-2-q1",
      variant: "practice",
      question: "2 μF and 3 μF in series. The equivalent capacitance is",
      options: [
        { text: "$5\\ \\mu$F", feedback: "That is the parallel combination." },
        { text: "$6\\ \\mu$F", feedback: "That is the product without dividing by the sum." },
        { text: "$2.5\\ \\mu$F", feedback: "That is the average, which is not a combination rule for capacitors." },
        { text: "$1.2\\ \\mu$F", correct: true, feedback: "$\\dfrac{2\\times3}{2 + 3} = 1.2$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-2-q2",
      variant: "practice",
      question: "A 2 μF and a 4 μF capacitor in series are connected across 12 V. The voltage across the 2 μF is",
      options: [
        { text: "$8$ V", correct: true, feedback: "$C = 4/3\\ \\mu$F, $Q = 16\\ \\mu$C, $V = 16/2 = 8$ V." },
        { text: "$4$ V", feedback: "That is the 4 μF's share. The smaller capacitor takes the larger voltage." },
        { text: "$6$ V", feedback: "Equal sharing only happens for equal capacitors." },
      ],
    },
    {
      type: "quiz",
      id: "em2-2-q3",
      variant: "concept",
      question: "$n$ identical capacitors can be joined all in parallel or all in series. The ratio $C_{\\text{par}}/C_{\\text{ser}}$ is",
      options: [
        { text: "$n$", feedback: "Parallel multiplies by $n$ and series divides by $n$: the ratio is $n\\cdot n$." },
        { text: "$1$", feedback: "Parallel adds; series is smaller than any one. They cannot be equal for $n > 1$." },
        { text: "$n^2$", correct: true, feedback: "$nC$ divided by $C/n$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-2-q4",
      variant: "practice",
      question: "A 6 μF capacitor is in series with a parallel pair of 1 μF and 2 μF, across 9 V. The charge on the 6 μF is",
      options: [
        { text: "$54\\ \\mu$C", feedback: "That uses $6\\times9$, as if the full 9 V were across the 6 μF alone." },
        { text: "$81\\ \\mu$C", feedback: "That adds everything as if in parallel ($9\\ \\mu$F)." },
        { text: "$6\\ \\mu$C", feedback: "That is the charge on the 1 μF (6 V across the pair)." },
        { text: "$18\\ \\mu$C", correct: true, feedback: "Pair $= 3\\ \\mu$F; with 6 μF in series: $2\\ \\mu$F; $Q = 2\\times9 = 18\\ \\mu$C." },
      ],
    },
    {
      type: "quiz",
      id: "em2-2-q5",
      variant: "concept",
      question: "In a capacitor bridge $C_1/C_2 = C_3/C_4$, a fifth capacitor joins the two midpoints. Why can it be removed?",
      options: [
        { text: "Capacitors block current, so it carries nothing.", feedback: "Capacitors in a charged network do hold charge; the bridge one holds none only when balanced." },
        { text: "Its two ends are at the same potential, so it holds no charge.", correct: true, feedback: "Balance means the voltage divides in the same ratio in both branches." },
        { text: "It is in series with the others, so it does not matter.", feedback: "It is neither in series nor parallel; it is removable only in the balanced case." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "dielectrics",
  title: "2.3 · Dielectrics",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Michael Faraday charged a capacitor, disconnected it, and slid a slab of glass between the plates. The voltage across the plates **dropped**, even though no charge could have left. Take the glass out and the voltage came back. The glass was not a conductor, yet it was doing something to the field. Filling a capacitor with an insulator (a **dielectric**) raises its capacitance, which is why every real capacitor has one.",
    },
    {
      type: "text",
      content:
        "**What the insulator does.** In a field, each molecule of an insulator stretches slightly into a dipole (or, if it is already a dipole like water, turns to line up). Inside the slab the $+$ and $-$ ends of neighbouring molecules cancel, but at the two faces they do not: a thin layer of **bound charge** appears, negative on the face near the positive plate and positive on the face near the negative plate. These bound charges make a field opposing the plates' field. The field inside the slab is reduced by a factor $K$, the **dielectric constant**:",
    },
    { type: "math", latex: "E = \\frac{E_0}{K},\\qquad K = \\frac{\\varepsilon}{\\varepsilon_0} \\ge 1" },
    {
      type: "text",
      content:
        "(Air $K \\approx 1.0006$, paper about 3.5, glass 5 to 10, water 80.) This is the same $K$ that weakened Coulomb's law in 0.2: a medium's bound charges partly screen any charge placed in it. For a filled capacitor with free charge density $\\sigma$ on the plates, the net field $(\\sigma - \\sigma_b)/\\varepsilon_0$ must equal $\\sigma/K\\varepsilon_0$, so the bound charge density on the slab faces is $\\sigma_b = \\sigma\\left(1 - \\dfrac1K\\right)$: always less than $\\sigma$, and zero for $K = 1$.\n\n**Completely filled.** With the same free charge $Q$, the field and hence $V = Ed$ drop by $K$, so",
    },
    { type: "math", latex: "C = \\frac{Q}{V} = K\\frac{\\varepsilon_0A}{d} = KC_0" },
    {
      type: "text",
      content:
        "**A slab of thickness $t < d$.** In the air gaps (total thickness $d - t$) the field is $E_0 = \\dfrac{Q}{\\varepsilon_0A}$; inside the slab it is $E_0/K$. Add the voltages:",
    },
    {
      type: "math",
      latex: "V = E_0(d - t) + \\frac{E_0}{K}t = \\frac{Q}{\\varepsilon_0A}\\left(d - t + \\frac tK\\right)\\;\\Rightarrow\\; C = \\frac{\\varepsilon_0A}{d - t + \\dfrac tK}",
    },
    {
      type: "text",
      content:
        "The slab acts like air of thickness $t/K$. Where it sits in the gap does not matter. A **metal** slab has $E = 0$ inside, the limit $K \\to \\infty$, so $C = \\dfrac{\\varepsilon_0A}{d - t}$: it just shrinks the gap. In the playground, $x = t/d$ is the fraction of the gap filled.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "1",
        baseLatex: "C_0",
        expr: "1/(1 - x + x/K)",
        exprLatex: "\\frac{C}{C_0} = \\frac{1}{1 - \\frac{t}{d} + \\frac{t}{Kd}}",
        params: [{ name: "K", min: 1, max: 10, step: 0.5, initial: 4 }],
        window: { xmin: 0, xmax: 1, ymin: 0, ymax: 10 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $x = 0$ (no slab) $C = C_0$ and at $x = 1$ (fully filled) $C = KC_0$. In between, the curve rises slowly at first and steeply at the end: for $K = 4$, half-filling only gives $1.6C_0$, well short of the $2.5C_0$ halfway mark. The last bit of air gap matters most, because air (weak $K$) in series dominates, just as the smallest capacitor dominates a series chain. At $K = 1$ the line is flat: a slab of \"air\" changes nothing.",
    },
    {
      type: "text",
      content:
        "**Side by side or stacked?** Two dielectrics can share a capacitor in two ways.\n\n- **Side by side** (each fills the full gap over part of the area): each part has the full voltage across it, so they are capacitors in **parallel**. Halves: $C = \\dfrac{K_1 + K_2}{2}C_0$.\n- **Stacked** (each fills the full area over part of the gap): the same charge passes through both layers, so they are in **series**. Halves: each layer is $\\dfrac{K\\varepsilon_0A}{d/2} = 2KC_0$, and $C = \\dfrac{2K_1K_2}{K_1 + K_2}C_0$.",
    },
    {
      type: "table",
      headers: ["Inserting a dielectric (filling it)", "Battery kept connected ($V$ fixed)", "Battery disconnected first ($Q$ fixed)"],
      rows: [
        ["$C$", "$\\times K$", "$\\times K$"],
        ["$Q$", "$\\times K$ (battery supplies more)", "unchanged"],
        ["$V$", "unchanged", "$\\div K$"],
        ["$E$ between plates", "unchanged ($V/d$)", "$\\div K$"],
        ["$U$", "$\\times K$ ($\\tfrac12CV^2$)", "$\\div K$ ($Q^2/2C$)"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a half slab).** A slab of thickness $d/2$ and $K = 4$ is placed in a parallel-plate capacitor of capacitance $C_0$. Find $C$.\n\n1. $d - t + t/K = d - \\dfrac d2 + \\dfrac{d}{8} = \\dfrac{5d}{8}$.\n2. $C = \\dfrac{\\varepsilon_0A}{5d/8} = \\dfrac85C_0 = 1.6C_0$. *Why this step:* writing the effective gap first keeps the fractions tidy.\n3. A metal slab of the same thickness would give $\\dfrac{\\varepsilon_0A}{d/2} = 2C_0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (two dielectrics).** A capacitor ($C_0$ in air) is filled with two materials, $K_1 = 2$ and $K_2 = 6$, each filling half. Find $C$ when they are (a) side by side, (b) stacked.\n\n1. (a) Parallel halves: each has half the area, so $K_1\\dfrac{C_0}{2} + K_2\\dfrac{C_0}{2} = (1 + 3)C_0 = 4C_0$.\n2. (b) Series layers: $2K_1C_0 = 4C_0$ and $2K_2C_0 = 12C_0$; $C = \\dfrac{4\\times12}{16}C_0 = 3C_0$.\n3. Side by side gives more. *Why this step:* in series the weaker layer drags the result down; in parallel the stronger one pulls it up.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (battery on or off).** A 10 μF air capacitor is charged to 100 V. A dielectric with $K = 5$ then fills it. Compare the two cases.\n\n1. **Disconnected first:** $Q = 1$ mC stays. $C = 50\\ \\mu$F, so $V = Q/C = 20$ V. $U$ falls from $\\tfrac12(10^{-5})(100)^2 = 0.05$ J to $\\dfrac{(10^{-3})^2}{2\\times5\\times10^{-5}} = 0.01$ J.\n2. **Still connected:** $V = 100$ V stays. $Q = 50\\times10^{-6}\\times100 = 5$ mC (the battery pushes 4 mC more). $U = \\tfrac12(5\\times10^{-5})(100)^2 = 0.25$ J.\n3. *Why this step:* always ask first what is held fixed. Everything else follows from $C \\to KC$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"inserting a dielectric always increases the stored energy\"",
      content:
        "With the battery connected it does ($U \\to KU$). With the battery disconnected, $Q$ is fixed and $U = Q^2/2C$ **falls** to $U/K$. The missing energy went into pulling the slab in: the fringing field at the edges attracts the polarised slab into the gap. Push a slab into an isolated charged capacitor and it is sucked in.",
    },
    {
      type: "quiz",
      id: "em2-3-q1",
      variant: "practice",
      question: "A slab of thickness $d/2$ and $K = 2$ is placed between plates $d$ apart. $C/C_0$ is",
      options: [
        { text: "$2$", feedback: "$KC_0$ needs the gap completely filled." },
        { text: "$\\dfrac32$", feedback: "That is the average of 1 and 2, which assumes the halves are in parallel. A slab across the gap is in series with the air." },
        { text: "$\\dfrac43$", correct: true, feedback: "Effective gap $d/2 + d/4 = 3d/4$, so $C = 4C_0/3$." },
        { text: "$\\dfrac34$", feedback: "A dielectric can only increase $C$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-3-q2",
      variant: "practice",
      question: "A conducting slab of thickness $d/3$ is inserted between plates $d$ apart. The capacitance becomes",
      options: [
        { text: "$\\dfrac32C_0$", correct: true, feedback: "Metal: $K \\to \\infty$, effective gap $d - d/3 = 2d/3$." },
        { text: "$3C_0$", feedback: "That assumes the slab removes $2d/3$ of the gap. It removes only its own thickness $d/3$." },
        { text: "$C_0$", feedback: "A metal slab removes its thickness from the gap." },
        { text: "Infinite, the plates are shorted", feedback: "The slab does not touch the plates, so there are still two air gaps." },
      ],
    },
    {
      type: "quiz",
      id: "em2-3-q3",
      variant: "concept",
      question: "An isolated charged capacitor (battery removed) is completely filled with a dielectric of constant $K$. Which of these is unchanged?",
      options: [
        { text: "The voltage $V$", feedback: "$V = Q/C$ falls by $K$." },
        { text: "The stored energy", feedback: "$U = Q^2/2C$ falls by $K$." },
        { text: "The charge $Q$", correct: true, feedback: "Nowhere for charge to go." },
        { text: "The field between the plates", feedback: "The field falls by $K$: $E = E_0/K$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-3-q4",
      variant: "practice",
      question: "A capacitor is filled with $K_1 = 3$ and $K_2 = 6$, each filling half the **gap** (stacked, full area). $C/C_0$ is",
      options: [
        { text: "$4.5$", feedback: "That is the side-by-side (parallel) arrangement, $(3 + 6)/2$." },
        { text: "$4$", correct: true, feedback: "Layers $6C_0$ and $12C_0$ in series: $\\dfrac{72}{18} = 4$." },
        { text: "$2$", feedback: "Each half-gap layer has capacitance $2KC_0$, not $KC_0/2$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-3-q5",
      variant: "concept",
      question: "With the battery still connected, a dielectric slab fills a capacitor. The field between the plates",
      options: [
        { text: "is unchanged", correct: true, feedback: "$V$ is fixed by the battery and $E = V/d$ across the filled gap. The battery adds free charge to make up for the bound charge." },
        { text: "falls by $K$", feedback: "That is the isolated case. Here the battery supplies extra charge." },
        { text: "rises by $K$", feedback: "$V$ and $d$ are both fixed, so $E = V/d$ is too." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "energy-stored-in-capacitors",
  title: "2.4 · Energy Stored",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A camera flash capacitor of about 100 μF at 300 V delivers a few joules in a millisecond: a power of several kilowatts, from two AA cells. The cells cannot deliver that power, but they can slowly fill the capacitor, and the capacitor can empty fast. How much energy does a charged capacitor hold, and where is it?",
    },
    {
      type: "text",
      content:
        "**Charging it one bit at a time.** Suppose the capacitor already carries $q$, so its voltage is $v = q/C$. Moving a further $dq$ from the negative plate to the positive plate costs $v\\,dq$ (1.6: work = charge × potential difference). The voltage grows as we go, so integrate from empty to $Q$:",
    },
    {
      type: "math",
      latex: "U = \\int_0^Q \\frac{q}{C}\\,dq = \\frac{Q^2}{2C} = \\tfrac12CV^2 = \\tfrac12QV",
    },
    {
      type: "text",
      content:
        "Why the $\\tfrac12$? The first charge was moved through almost no voltage, the last through the full $V$. On average, the charge moved through $V/2$. Pick whichever form suits what is held fixed: $\\tfrac12CV^2$ when $V$ is fixed, $Q^2/2C$ when $Q$ is fixed.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Energy and energy density",
      content:
        "$U = \\dfrac{Q^2}{2C} = \\tfrac12CV^2 = \\tfrac12QV$.\nThe energy is stored in the **field**, with energy per unit volume\n$u = \\tfrac12\\varepsilon_0E^2$ (in a dielectric, $\\tfrac12K\\varepsilon_0E^2$).",
    },
    {
      type: "text",
      content:
        "**Where the energy lives.** For parallel plates, $C = \\varepsilon_0A/d$ and $V = Ed$, so $U = \\tfrac12\\dfrac{\\varepsilon_0A}{d}E^2d^2 = \\tfrac12\\varepsilon_0E^2\\,(Ad)$. $Ad$ is the volume between the plates, where the field is. The energy per volume is $\\tfrac12\\varepsilon_0E^2$, and this turns out to be true for every electric field, not only in capacitors. It is the first sign that fields are physical things that carry energy (Chapter 5 ends with fields carrying energy across space as light).\n\n**Force between the plates.** Hold $Q$ fixed and pull the plates apart by $dx$. The field $E = \\sigma/\\varepsilon_0$ does not change, but the volume filled with it grows by $A\\,dx$, so the energy grows by $\\tfrac12\\varepsilon_0E^2A\\,dx$. That energy came from your pull, so",
    },
    {
      type: "math",
      latex: "F = \\tfrac12\\varepsilon_0E^2A = \\frac{Q^2}{2\\varepsilon_0A} = \\tfrac12QE",
    },
    {
      type: "text",
      content:
        "Not $QE$: each plate feels only the field of the **other** plate, which is $\\sigma/2\\varepsilon_0 = E/2$. A plate cannot push itself.\n\n**The battery's bill.** A battery of emf $V$ charging an empty capacitor moves charge $Q = CV$ through a potential difference $V$, doing work $QV = CV^2$. Only $\\tfrac12CV^2$ ends up stored. The other half is turned into heat in the connecting resistance (and a little radiation) whatever the resistance is: a big $R$ gives a small current for a long time, a small $R$ a big current for a short time, and the heat comes out the same (2.6 checks this by integrating $i^2R$).",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a 10 μF capacitor at 100 V).** Find the stored energy and the battery's work.\n\n1. $U = \\tfrac12CV^2 = \\tfrac12\\times10\\times10^{-6}\\times10^4 = 0.05$ J.\n2. Battery: $QV = (10^{-3})(100) = 0.1$ J. The other 0.05 J became heat. *Why this step:* the factor 2 between battery work and stored energy is the check that you have not mixed up $QV$ and $\\tfrac12QV$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (energy density).** The field between two plates is $10^6$ V/m. How much energy is stored per cubic metre?\n\n1. $u = \\tfrac12\\varepsilon_0E^2 = \\tfrac12\\times8.85\\times10^{-12}\\times10^{12} \\approx 4.4$ J/m³.\n2. Tiny. Air breaks down near $3\\times10^6$ V/m, so an air capacitor cannot store much more than about 40 J/m³. That is why good capacitors need dielectrics that survive strong fields (and add the factor $K$).",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (pulling the plates apart).** A 10 μF parallel-plate capacitor is charged to 100 V and disconnected. Its gap is then doubled. How much work does this take?\n\n1. $Q = 1$ mC is fixed (disconnected). *Why this step:* use $U = Q^2/2C$, the form with the fixed quantity.\n2. Before: $U_1 = \\dfrac{(10^{-3})^2}{2\\times10^{-5}} = 0.05$ J. After: $C = 5\\ \\mu$F, $U_2 = \\dfrac{10^{-6}}{10^{-5}} = 0.1$ J.\n3. Work $= U_2 - U_1 = 0.05$ J. The voltage has doubled to 200 V.\n4. Check with the force: $F = \\tfrac12QE$ is constant as the gap widens (with $Q$ fixed, $E$ stays the same), so $W = F\\,\\Delta d = \\tfrac12Q(E\\,\\Delta d) = \\tfrac12\\times10^{-3}\\times100 = 0.05$ J. ✓ (Here $E\\,\\Delta d = E d = 100$ V, the original voltage.)",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (energy bookkeeping for a slab).** Take 2.3's Worked example 3: a 10 μF capacitor at 100 V, and a $K = 5$ slab slid in.\n\n1. **Disconnected:** $U$ falls from 0.05 J to 0.01 J. The 0.04 J went into the slab: the field pulled it in, and whoever held it back (or friction) took that energy.\n2. **Connected:** $U$ rises from 0.05 J to 0.25 J, a gain of 0.2 J. The battery pushed an extra 4 mC through 100 V: 0.4 J. *Why this step:* in the connected case you must include the battery's work, or energy seems to appear from nowhere.\n3. So $0.4 = 0.2 + 0.2$: the other 0.2 J again went into pulling the slab in (it is attracted in both cases).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"all the battery's work ends up stored in the capacitor\"",
      content:
        "The battery does $QV$; the capacitor stores $\\tfrac12QV$. Exactly half is lost as heat in the wires and internal resistance while charging, independent of their resistance. Making $R$ smaller does not help; it only makes the loss happen faster.",
    },
    {
      type: "quiz",
      id: "em2-4-q1",
      variant: "practice",
      question: "A 4 μF capacitor is charged to 50 V. The stored energy is",
      options: [
        { text: "$5$ mJ", correct: true, feedback: "$\\tfrac12\\times4\\times10^{-6}\\times2500 = 5\\times10^{-3}$ J." },
        { text: "$10$ mJ", feedback: "That is $CV^2$, the battery's work. Stored energy has the $\\tfrac12$." },
        { text: "$0.1$ mJ", feedback: "That is $\\tfrac12CV$, missing a factor of $V$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-4-q2",
      variant: "concept",
      question: "A battery charges an uncharged capacitor through a resistor. What fraction of the battery's work is stored in the capacitor?",
      options: [
        { text: "All of it if the resistance is very small", feedback: "A small $R$ gives a large current for a short time; the heat $\\int i^2R\\,dt$ is still $\\tfrac12CV^2$." },
        { text: "One half, whatever the resistance", correct: true, feedback: "$QV$ supplied, $\\tfrac12QV$ stored." },
        { text: "It depends on the capacitance", feedback: "Both $QV = CV^2$ and $\\tfrac12CV^2$ scale with $C$, so the fraction is fixed." },
      ],
    },
    {
      type: "quiz",
      id: "em2-4-q3",
      variant: "practice",
      question: "The field in a region is $2\\times10^5$ V/m. The energy density is about",
      options: [
        { text: "$0.35$ J/m³", feedback: "You left out the $\\tfrac12$." },
        { text: "$8.85\\times10^{-7}$ J/m³", feedback: "Square the field: $E^2 = 4\\times10^{10}$." },
        { text: "$0.18$ J/m³", correct: true, feedback: "$\\tfrac12\\times8.85\\times10^{-12}\\times4\\times10^{10} \\approx 0.177$ J/m³." },
      ],
    },
    {
      type: "quiz",
      id: "em2-4-q4",
      variant: "concept",
      question: "The plates of a charged, **isolated** parallel-plate capacitor are pulled farther apart. The stored energy",
      options: [
        { text: "decreases, because $C$ decreases", feedback: "With $Q$ fixed, smaller $C$ means larger $Q^2/2C$." },
        { text: "increases, because you do work against the attraction", correct: true, feedback: "$Q$ fixed, $C$ falls, $U = Q^2/2C$ rises by exactly the work you did." },
        { text: "stays the same, because $Q$ is fixed", feedback: "$U$ depends on $C$ as well as $Q$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-4-q5",
      variant: "practice",
      question: "Each plate of a parallel-plate capacitor has charge magnitude $Q$ and area $A$. The force between the plates is",
      options: [
        { text: "$\\dfrac{Q^2}{\\varepsilon_0A}$", feedback: "That is $QE$ with the full field between the plates, which includes the plate's own field." },
        { text: "$\\dfrac{kQ^2}{d^2}$", feedback: "Coulomb's point-charge law does not apply to large flat plates close together." },
        { text: "$\\dfrac{Q^2}{2\\varepsilon_0A}$", correct: true, feedback: "Each plate sits in the other's field $\\sigma/2\\varepsilon_0$." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "charge-sharing",
  title: "2.5 · Charge Sharing",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Take a charged capacitor off its battery and connect it to an empty one: positive plate to positive plate, negative to negative. Charge flows until both sit at the same voltage. No battery is involved, charge cannot be created or destroyed, and yet, when you count, energy has gone missing. Where?",
    },
    {
      type: "text",
      content:
        "**The common potential.** Capacitors $C_1$ at $V_1$ and $C_2$ at $V_2$ are joined like plate to like plate. They are now in parallel, so they end up at one voltage $V$. The charge on the joined positive plates is conserved (it is an isolated conductor):",
    },
    {
      type: "math",
      latex: "C_1V_1 + C_2V_2 = (C_1 + C_2)V\\quad\\Rightarrow\\quad V = \\frac{C_1V_1 + C_2V_2}{C_1 + C_2}",
    },
    {
      type: "text",
      content:
        "(Total charge over total capacitance, just like the touching spheres of 0.1.) **The energy lost** is $\\tfrac12C_1V_1^2 + \\tfrac12C_2V_2^2 - \\tfrac12(C_1 + C_2)V^2$, which simplifies to",
    },
    {
      type: "math",
      latex: "\\Delta U = \\frac{C_1C_2}{2(C_1 + C_2)}(V_1 - V_2)^2",
    },
    {
      type: "text",
      content:
        "It is always positive unless $V_1 = V_2$ (then nothing flows). Notice $\\dfrac{C_1C_2}{C_1 + C_2}$: the two capacitors look like a series pair to the current that flows round the loop between them.\n\n**Reversed polarity** (positive plate joined to negative plate): the charges partly cancel. Conservation now reads $C_1V_1 - C_2V_2 = (C_1 + C_2)V$, and the loss has $(V_1 + V_2)^2$ in place of $(V_1 - V_2)^2$, a much bigger loss.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Charge sharing",
      content:
        "Like plates joined: $V = \\dfrac{C_1V_1 + C_2V_2}{C_1 + C_2}$, $\\Delta U = \\dfrac{C_1C_2(V_1 - V_2)^2}{2(C_1 + C_2)}$.\nOpposite plates joined: $V = \\dfrac{|C_1V_1 - C_2V_2|}{C_1 + C_2}$, $\\Delta U = \\dfrac{C_1C_2(V_1 + V_2)^2}{2(C_1 + C_2)}$.\nCharge is conserved; energy is not (it leaves as heat and radiation).",
    },
    {
      type: "text",
      content:
        "**Where the energy goes.** The connecting wires have some resistance $R$, and the current that flows while the voltages equalise heats them. As with charging (2.4), the heat does not depend on $R$: with a tiny $R$ the current surges and the connection sparks, radiating some energy as electromagnetic waves. Either way the loss is exactly $\\Delta U$.\n\nThe machine below takes a 2 μF capacitor at 100 V and joins it to an uncharged $C_2$. Then $\\Delta U = \\dfrac{2C_2}{2(2 + C_2)}\\times100^2$ μJ $= \\dfrac{10C_2}{2 + C_2}$ mJ.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "10*x/(2 + x)",
        exprLatex: "\\Delta U = \\frac{10\\,C_2}{2 + C_2}\\ \\text{mJ}",
        min: 0,
        max: 20,
        step: 1,
        initial: 2,
        inputLabel: "Second capacitor C₂",
        inputUnit: "μF",
        outputLabel: "Energy lost (mJ)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the first capacitor starts with $\\tfrac12\\times2\\times10^{-6}\\times10^4 = 10$ mJ. With an equal partner ($C_2 = 2\\ \\mu$F) half of it, 5 mJ, is lost. As $C_2$ grows the loss creeps towards the full 10 mJ: a huge empty capacitor drains almost all the charge and leaves almost no voltage, so almost no energy survives. With $C_2 = 0$ nothing happens and nothing is lost.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (equal capacitors).** A 2 μF capacitor at 100 V is joined to an uncharged 2 μF capacitor. Find the common voltage and the energy lost.\n\n1. $V = \\dfrac{2\\times100 + 0}{4} = 50$ V.\n2. Before: 10 mJ. After: $\\tfrac12\\times4\\times10^{-6}\\times2500 = 5$ mJ. Lost: 5 mJ. *Why this step:* computing before and after directly is a good check on the formula.\n3. Formula: $\\dfrac{2\\times2}{2\\times4}\\times100^2$ μJ $= 5000$ μJ $= 5$ mJ. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (both charged, same polarity).** $C_1 = 4\\ \\mu$F at 50 V and $C_2 = 2\\ \\mu$F at 20 V are joined + to +.\n\n1. Charges: $200\\ \\mu$C and $40\\ \\mu$C. Total $240\\ \\mu$C on $6\\ \\mu$F: $V = 40$ V.\n2. Energy before: $5$ mJ $+ 0.4$ mJ $= 5.4$ mJ. After: $\\tfrac12\\times6\\times10^{-6}\\times1600 = 4.8$ mJ.\n3. Lost: 0.6 mJ. Formula: $\\dfrac{8}{12}\\times30^2 = 600$ μJ. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (opposite polarity).** The same two capacitors, but + of one is joined to − of the other.\n\n1. Net charge on each joined pair of plates: $200 - 40 = 160\\ \\mu$C. *Why this step:* the positive plate of one meets the negative plate of the other; their charges partly cancel.\n2. $V = 160/6 \\approx 26.7$ V.\n3. After: $\\tfrac12\\times6\\times10^{-6}\\times(26.67)^2 \\approx 2.13$ mJ. Lost: $5.4 - 2.13 \\approx 3.27$ mJ. Formula: $\\dfrac{8}{12}\\times70^2 \\approx 3267$ μJ. ✓ More than five times the same-polarity loss.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"charge sharing conserves energy because no battery is involved\"",
      content:
        "Charge is conserved; energy is not, at least not as stored energy. Whenever charge flows between two capacitors at different voltages, energy is dissipated in the path. The only lossless case is $V_1 = V_2$, where nothing flows at all.",
    },
    {
      type: "quiz",
      id: "em2-5-q1",
      variant: "practice",
      question: "A 3 μF capacitor at 120 V is joined to an uncharged 1 μF capacitor (like plates together). The common voltage is",
      options: [
        { text: "$60$ V", feedback: "Equal sharing of voltage would need equal capacitors." },
        { text: "$120$ V", feedback: "Some charge flows to the empty capacitor, so the voltage drops." },
        { text: "$30$ V", feedback: "That is $120/4$. Divide the charge, not the voltage, by the total capacitance." },
        { text: "$90$ V", correct: true, feedback: "$360\\ \\mu$C shared over $4\\ \\mu$F." },
      ],
    },
    {
      type: "quiz",
      id: "em2-5-q2",
      variant: "practice",
      question: "For the previous question, the energy lost is",
      options: [
        { text: "$21.6$ mJ", feedback: "That is the initial energy, not the loss." },
        { text: "$0$", feedback: "Energy is lost whenever charge flows between unequal voltages." },
        { text: "$10.8$ mJ", feedback: "Half the initial energy is lost only for equal capacitors." },
        { text: "$5.4$ mJ", correct: true, feedback: "$\\dfrac{3\\times1}{2\\times4}\\times120^2$ μJ $= 5400$ μJ. Check: $21.6 - 16.2 = 5.4$ mJ." },
      ],
    },
    {
      type: "quiz",
      id: "em2-5-q3",
      variant: "concept",
      question: "Two identical capacitors, one charged to $V$ and one uncharged, are connected. What fraction of the original energy remains?",
      options: [
        { text: "One half", correct: true, feedback: "$V/2$ on $2C$: $\\tfrac12(2C)(V/2)^2 = \\tfrac14CV^2$, half of $\\tfrac12CV^2$." },
        { text: "All of it", feedback: "Energy is dissipated in the connecting wires." },
        { text: "One quarter", feedback: "Each capacitor has a quarter of the original energy, but there are two of them." },
      ],
    },
    {
      type: "quiz",
      id: "em2-5-q4",
      variant: "practice",
      question: "$C_1 = 2\\ \\mu$F at 100 V and $C_2 = 2\\ \\mu$F at 40 V are joined with **opposite** polarity. The common voltage is",
      options: [
        { text: "$70$ V", feedback: "That is the same-polarity result, $(200 + 80)/4$." },
        { text: "$60$ V", feedback: "Divide the net charge $120\\ \\mu$C by the **total** capacitance 4 μF." },
        { text: "$30$ V", correct: true, feedback: "$(200 - 80)/4 = 30$ V." },
      ],
    },
    {
      type: "quiz",
      id: "em2-5-q5",
      variant: "concept",
      question: "Where does the energy lost in charge sharing go?",
      options: [
        { text: "Into heat in the connecting resistance (and some radiation), whatever the resistance is.", correct: true, feedback: "The current between the capacitors dissipates exactly $\\Delta U$." },
        { text: "It is stored in the connecting wires as charge.", feedback: "Wires hold negligible charge; the energy leaves the system." },
        { text: "Nowhere; it reappears when the capacitors are separated.", feedback: "Separating them does not return any energy; the charges stay as they are." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "rc-circuits",
  title: "2.6 · Charging and Discharging: RC Circuits",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "So far capacitors have charged instantly. In reality the charge arrives through wires with resistance, and the resistor sets the pace. Close a switch on a battery, a resistor and an empty capacitor: the current starts large and dies away, while the capacitor's voltage rises quickly at first and then creeps towards the battery's. This slow approach is behind camera-flash recharge times, the delay in a car's courtesy light, and the blinking rate of a hazard lamp.",
    },
    {
      type: "text",
      content:
        "**Charging, from KVL.** Battery emf $E$, resistor $R$, capacitor $C$ in series. At any moment the capacitor holds $q$ and the current is $i = dq/dt$. Walking round the loop, the battery raises the potential by $E$, the resistor drops $iR$ and the capacitor drops $q/C$ (loop rule, Chapter 3; here it is simply energy per charge adding up):",
    },
    {
      type: "math",
      latex: "E - R\\frac{dq}{dt} - \\frac qC = 0\\quad\\Rightarrow\\quad\\frac{dq}{CE - q} = \\frac{dt}{RC}",
    },
    {
      type: "text",
      content:
        "Separate the variables and integrate from $q = 0$ at $t = 0$: $-\\ln\\dfrac{CE - q}{CE} = \\dfrac{t}{RC}$. So",
    },
    {
      type: "math",
      latex: "q = CE\\left(1 - e^{-t/RC}\\right),\\qquad i = \\frac{dq}{dt} = \\frac ER\\,e^{-t/RC}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The time constant",
      content:
        "$\\tau = RC$ (ohms × farads = seconds).\nCharging: $q = Q_0(1 - e^{-t/\\tau})$, $i = i_0e^{-t/\\tau}$ with $Q_0 = CE$, $i_0 = E/R$.\nDischarging through $R$: $q = Q_0e^{-t/\\tau}$, $i = i_0e^{-t/\\tau}$ (current reversed).\nAfter one $\\tau$: charging reaches $1 - e^{-1} \\approx 63\\%$; discharging falls to $e^{-1} \\approx 37\\%$.",
    },
    {
      type: "text",
      content:
        "**The two limits you will use constantly.**\n\n- **At $t = 0$** an uncharged capacitor has $q = 0$, so no voltage across it: it behaves like a **plain wire**. The whole emf appears across $R$ and $i_0 = E/R$.\n- **At steady state** ($t \\gg \\tau$) the current has died away: the capacitor behaves like a **break** in the circuit. Its voltage equals whatever voltage the rest of the circuit puts across its terminals.\n\nThe capacitor's voltage never jumps (that would need an infinite current), but the current through it can jump instantly.",
    },
    {
      type: "text",
      content:
        "**Checking the half-and-half rule.** Heat in the resistor while charging: $\\displaystyle\\int_0^\\infty i^2R\\,dt = \\frac{E^2}{R}\\int_0^\\infty e^{-2t/RC}dt = \\frac{E^2}{R}\\cdot\\frac{RC}{2} = \\tfrac12CE^2$. Exactly the stored energy, and $R$ has cancelled, as promised in 2.4.",
    },
    {
      type: "interactive",
      config: {
        component: "em-circuit-lab",
        mode: "rc",
        process: "charge",
        caption:
          "Charging: R = 100 Ω and C = 10 μF give τ = 1 ms. Slide R or C and watch τ stretch or shrink; the dashed ghost keeps the original curve for comparison.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "em-circuit-lab",
        mode: "rc",
        process: "discharge",
        caption:
          "Discharging the same capacitor through R. The charge and the current both decay by the same factor e in every τ.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: doubling $R$ or doubling $C$ stretches the curve to twice the time, and it does not matter which you double; only the product $RC$ counts. At $t = \\tau$ the charging curve is at 63% of its final value and the discharging curve at 37%. After about $5\\tau$ both are within 1% of the end: in practice, \"done\".",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (time constant).** $R = 100\\ \\Omega$, $C = 10\\ \\mu$F, $E = 10$ V. Find $\\tau$, the initial current, and the charge after $\\tau$.\n\n1. $\\tau = RC = 100\\times10^{-5} = 10^{-3}$ s $= 1$ ms.\n2. $i_0 = E/R = 0.1$ A. *Why this step:* at $t = 0$ the empty capacitor is a wire.\n3. $Q_0 = CE = 100\\ \\mu$C, so after 1 ms $q = 100(1 - e^{-1}) \\approx 63\\ \\mu$C.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (time to reach a fraction).** How long does the same capacitor take to reach 90% of full charge? And 50%?\n\n1. $1 - e^{-t/\\tau} = 0.9 \\Rightarrow e^{-t/\\tau} = 0.1 \\Rightarrow t = \\tau\\ln10 \\approx 2.30\\tau = 2.30$ ms.\n2. Half: $e^{-t/\\tau} = 0.5 \\Rightarrow t = \\tau\\ln2 \\approx 0.693$ ms. *Why this step:* isolate the exponential first, then take logs; do not try to take the log of $1 - e^{-t/\\tau}$ directly.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a capacitor in a resistor network, JEE classic).** A 12 V battery drives $R_1 = 2\\ \\Omega$ and $R_2 = 4\\ \\Omega$ in series. A 5 μF capacitor, initially uncharged, sits across $R_2$. Find the battery current just after the switch closes and at steady state, and the final charge.\n\n1. **Just after closing:** the capacitor acts as a wire, shorting out $R_2$. Current $= 12/2 = 6$ A, all through $R_1$ and the capacitor. *Why this step:* replace each capacitor by the element it mimics in each limit.\n2. **Steady state:** the capacitor is a break. The current flows through $R_1$ and $R_2$: $12/6 = 2$ A.\n3. The capacitor has the voltage of $R_2$: $2\\times4 = 8$ V, so $Q = 5\\times8 = 40\\ \\mu$C.\n4. (The time constant uses the resistance the capacitor \"sees\" with the battery replaced by a wire: $R_1 \\parallel R_2 = \\tfrac43\\ \\Omega$, so $\\tau \\approx 6.7\\ \\mu$s.)",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (discharge).** A 10 μF capacitor at 100 V discharges through 1 kΩ. When has its charge halved? When has its energy halved?\n\n1. $\\tau = 10^3\\times10^{-5} = 10$ ms. Charge halves at $\\tau\\ln2 \\approx 6.9$ ms.\n2. Energy $U \\propto q^2 \\propto e^{-2t/\\tau}$, so it halves at $\\tfrac{\\tau}{2}\\ln2 \\approx 3.5$ ms. *Why this step:* energy decays twice as fast as charge, because it goes as the square.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a capacitor is fully charged after one time constant\"",
      content:
        "After one $\\tau$ it has only 63%. Each further $\\tau$ removes 63% of what is left: 86% after $2\\tau$, 95% after $3\\tau$, 99.3% after $5\\tau$. In principle it never quite finishes; in practice engineers call $5\\tau$ \"fully charged\".",
    },
    {
      type: "quiz",
      id: "em2-6-q1",
      variant: "practice",
      question: "A 50 μF capacitor charges through a 2 kΩ resistor. The time constant is",
      options: [
        { text: "$100$ s", feedback: "Convert: 50 μF $= 5\\times10^{-5}$ F." },
        { text: "$0.1$ s", correct: true, feedback: "$2000\\times50\\times10^{-6} = 0.1$ s." },
        { text: "$10^{-4}$ s", feedback: "You used $R = 2$ instead of $2000\\ \\Omega$. Convert kΩ to Ω." },
      ],
    },
    {
      type: "quiz",
      id: "em2-6-q2",
      variant: "practice",
      question: "What fraction of its final charge does a charging capacitor hold after $2\\tau$?",
      options: [
        { text: "100%", feedback: "The approach is exponential; it never quite reaches 100%." },
        { text: "about 126%", feedback: "That doubles 63%. Each $\\tau$ covers 63% of what is **left**, not of the total." },
        { text: "about 14%", feedback: "That is $e^{-2}$, the fraction remaining when **discharging**." },
        { text: "about 86%", correct: true, feedback: "$1 - e^{-2} \\approx 1 - 0.135 = 0.865$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-6-q3",
      variant: "practice",
      question: "With $\\tau = 2$ ms, how long does the charging current take to fall to 10% of its initial value?",
      options: [
        { text: "about $0.21$ ms", feedback: "That is $\\tau\\ln(10/9)$, the time for the current to fall by 10%, not to 10%." },
        { text: "about $4.6$ ms", correct: true, feedback: "$e^{-t/\\tau} = 0.1 \\Rightarrow t = \\tau\\ln10 \\approx 2\\times2.30$." },
        { text: "$20$ ms", feedback: "The decay is exponential, not linear: $\\tau\\ln10$, not $10\\tau$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-6-q4",
      variant: "practice",
      question: "A 10 V battery drives $R_1 = 5\\ \\Omega$ and $R_2 = 5\\ \\Omega$ in series; an uncharged capacitor sits across $R_2$. Just after the switch closes, the battery current is",
      options: [
        { text: "$1$ A", feedback: "That is the steady-state current, once the capacitor acts as a break." },
        { text: "$0$", feedback: "An empty capacitor passes current freely at first; it is a full one that blocks it." },
        { text: "$2$ A", correct: true, feedback: "The empty capacitor shorts $R_2$: $10/5$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-6-q5",
      variant: "concept",
      question: "In an RC circuit, which quantity **cannot** change instantly when a switch is thrown?",
      options: [
        { text: "The voltage across the capacitor", correct: true, feedback: "A sudden jump in $q$ would need infinite current." },
        { text: "The current through the capacitor", feedback: "The current jumps: from 0 to $E/R$ at the instant of closing." },
        { text: "The voltage across the resistor", feedback: "It jumps from 0 to $E$ at the instant of closing, because it follows the current." },
      ],
    },
    {
      type: "quiz",
      id: "em2-6-q6",
      variant: "practice",
      question: "A capacitor discharges with time constant $\\tau$. When has its stored energy fallen to half?",
      options: [
        { text: "$\\tau\\ln2$", feedback: "That is when the **charge** halves; the energy is then a quarter." },
        { text: "$2\\tau\\ln2$", feedback: "Energy falls faster than charge, not slower." },
        { text: "$\\dfrac{\\tau\\ln2}{2}$", correct: true, feedback: "$U \\propto e^{-2t/\\tau}$; set it to $\\tfrac12$." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-2-mastery",
  title: "2.7 · Chapter 2 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "The chapter in 7 lines",
      content:
        "1. $C = Q/V$ depends on geometry and medium only: sphere $4\\pi\\varepsilon_0R$, plates $\\varepsilon_0A/d$.\n2. Parallel: same $V$, $C = \\sum C_i$. Series: same $Q$, $1/C = \\sum 1/C_i$, $V_i \\propto 1/C_i$.\n3. Dielectric: $E \\to E/K$, $C \\to KC$; slab $C = \\varepsilon_0A/(d - t + t/K)$; side by side = parallel, stacked = series.\n4. Ask what is fixed: battery on keeps $V$; battery off keeps $Q$.\n5. $U = Q^2/2C = \\tfrac12CV^2$; $u = \\tfrac12\\varepsilon_0E^2$; plate force $Q^2/2\\varepsilon_0A$; charging wastes half the battery's work.\n6. Sharing: charge conserved, common $V = \\sum Q/\\sum C$, loss $\\dfrac{C_1C_2(V_1 \\mp V_2)^2}{2(C_1 + C_2)}$.\n7. RC: $\\tau = RC$; empty capacitor = wire at $t = 0$, break at steady state; $q = Q_0(1 - e^{-t/\\tau})$.",
    },
    {
      type: "text",
      content:
        "No formula sheet. Take $\\varepsilon_0 = 8.85\\times10^{-12}$ SI.",
    },
    {
      type: "quiz",
      id: "em2-7-q1",
      variant: "mastery",
      question: "Parallel plates of area 0.1 m² are 0.885 mm apart in air. The capacitance is",
      options: [
        { text: "$1$ nF", correct: true, feedback: "$8.85\\times10^{-12}\\times0.1/8.85\\times10^{-4} = 10^{-9}$ F." },
        { text: "$1\\ \\mu$F", feedback: "Recheck the powers: $10^{-13}/10^{-4} = 10^{-9}$." },
        { text: "$1$ pF", feedback: "Divide by the gap in metres, $8.85\\times10^{-4}$, which multiplies by about 1130." },
      ],
    },
    {
      type: "quiz",
      id: "em2-7-q2",
      variant: "mastery",
      question: "A 4 μF capacitor is in series with a parallel pair of two 2 μF capacitors, across 10 V. The charge on **one** of the 2 μF capacitors is",
      options: [
        { text: "$20\\ \\mu$C", feedback: "That is the total, which splits between the two parallel capacitors." },
        { text: "$5\\ \\mu$C", feedback: "The pair has 5 V across it, so each 2 μF has $2\\times5 = 10\\ \\mu$C." },
        { text: "$40\\ \\mu$C", feedback: "That uses the full 10 V across the 4 μF alone." },
        { text: "$10\\ \\mu$C", correct: true, feedback: "Pair $= 4\\ \\mu$F; total $2\\ \\mu$F; $Q = 20\\ \\mu$C; pair voltage $5$ V; each 2 μF holds $10\\ \\mu$C." },
      ],
    },
    {
      type: "quiz",
      id: "em2-7-q3",
      variant: "mastery",
      question: "Plates 5 mm apart hold a slab 3 mm thick with $K = 3$. $C/C_0$ is",
      options: [
        { text: "$3$", feedback: "The gap is not completely filled." },
        { text: "$\\dfrac{11}5$", feedback: "That averages $K$ by thickness, $(2\\times1 + 3\\times3)/5$, as if slab and air were in parallel. They are stacked, so they are in series." },
        { text: "$\\dfrac52$", feedback: "That treats the slab as metal ($K\\to\\infty$): gap $5 - 3 = 2$ mm." },
        { text: "$\\dfrac53$", correct: true, feedback: "Effective gap $5 - 3 + 3/3 = 3$ mm, so $C = 5C_0/3$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-7-q4",
      variant: "mastery",
      question: "An air capacitor is charged, **disconnected**, and then completely filled with oil ($K = 2$). The energy stored",
      options: [
        { text: "doubles", feedback: "That is the battery-connected case, $U = \\tfrac12CV^2$ with $V$ fixed." },
        { text: "is unchanged", feedback: "$C$ changes and $Q$ does not, so $Q^2/2C$ changes." },
        { text: "quarters", feedback: "Only one factor of $K$ appears in $Q^2/2C$." },
        { text: "halves", correct: true, feedback: "$Q$ fixed, $C$ doubles, $U = Q^2/2C$ halves." },
      ],
    },
    {
      type: "quiz",
      id: "em2-7-q5",
      variant: "mastery",
      question: "A 2 μF and a 4 μF capacitor in series are connected across 12 V. The energy stored in the 2 μF capacitor is",
      options: [
        { text: "$144\\ \\mu$J", feedback: "That assumes the full 12 V across the 2 μF." },
        { text: "$64\\ \\mu$J", correct: true, feedback: "$Q = \\tfrac43\\times12 = 16\\ \\mu$C; $U = Q^2/2C = 256/4 = 64\\ \\mu$J (it has 8 V)." },
        { text: "$32\\ \\mu$J", feedback: "That is the 4 μF's energy ($256/8$). In series the smaller capacitor stores more." },
        { text: "$96\\ \\mu$J", feedback: "That is the total stored, $\\tfrac12\\times\\tfrac43\\times144$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-7-q6",
      variant: "mastery",
      question: "A 6 μF capacitor at 200 V is joined to an uncharged 3 μF capacitor. The energy lost is",
      options: [
        { text: "$60$ mJ", feedback: "Half is lost only for equal capacitors." },
        { text: "$120$ mJ", feedback: "That is the starting energy." },
        { text: "$40$ mJ", correct: true, feedback: "$\\dfrac{6\\times3}{2\\times9}\\times200^2$ μJ $= 40\\,000$ μJ. Check: $120 - 80 = 40$ mJ." },
        { text: "$0$", feedback: "Charge flows between unequal voltages, so energy is lost." },
      ],
    },
    {
      type: "quiz",
      id: "em2-7-q7",
      variant: "mastery",
      question: "A capacitor discharges through a resistor. The current falls to 25% of its initial value after",
      options: [
        { text: "$4\\tau$", feedback: "Exponential, not linear: $\\tau\\ln4$." },
        { text: "$2\\tau\\ln2 \\approx 1.39\\tau$", correct: true, feedback: "$e^{-t/\\tau} = \\tfrac14 \\Rightarrow t = \\tau\\ln4$." },
        { text: "$\\tau\\ln\\tfrac43 \\approx 0.29\\tau$", feedback: "That is when it has fallen **by** 25%, to 75%." },
        { text: "$0.25\\tau$", feedback: "Take logs: $t = \\tau\\ln(1/0.25)$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-7-q8",
      variant: "mastery",
      question: "A 10 V battery drives $R_1 = 2\\ \\Omega$ and $R_2 = 3\\ \\Omega$ in series with a 10 μF capacitor across $R_2$. The steady-state charge on the capacitor is",
      options: [
        { text: "$100\\ \\mu$C", feedback: "The capacitor only has the voltage across $R_2$, not the full 10 V." },
        { text: "$0$", feedback: "At steady state no current flows **through** the capacitor, but it is charged to $R_2$'s voltage." },
        { text: "$40\\ \\mu$C", feedback: "That uses $R_1$'s 4 V. The capacitor is across $R_2$." },
        { text: "$60\\ \\mu$C", correct: true, feedback: "Steady current $10/5 = 2$ A; $V_{R_2} = 6$ V; $Q = 10\\times6$." },
      ],
    },
    {
      type: "quiz",
      id: "em2-7-q9",
      variant: "mastery",
      question: "(JEE Advanced style) A 2 μF capacitor stays connected to a 12 V battery. A switch then connects an uncharged 4 μF capacitor in parallel with it, through a resistor. How much heat is produced in the resistor?",
      options: [
        { text: "$288\\ \\mu$J", correct: true, feedback: "The battery pushes $48\\ \\mu$C through 12 V: $576\\ \\mu$J. Storage rises by $\\tfrac12(4\\ \\mu\\text{F})(144) = 288\\ \\mu$J. Heat $= 576 - 288$." },
        { text: "$576\\ \\mu$J", feedback: "That is all the battery's work; half of it is stored in the 4 μF." },
        { text: "$0$", feedback: "The 2 μF is already at 12 V, but the empty 4 μF must be charged through the resistor, and half the energy is lost doing it." },
        { text: "$96\\ \\mu$J", feedback: "That treats it as charge sharing with no battery. The battery holds the voltage at 12 V." },
      ],
    },
    {
      type: "quiz",
      id: "em2-7-q10",
      variant: "mastery",
      question: "(JEE Advanced style) $C_1 = 2\\ \\mu$F charged to 100 V and $C_2 = 3\\ \\mu$F charged to 50 V are joined with the positive plate of each connected to the negative plate of the other. Find the heat produced.",
      options: [
        { text: "$1.5$ mJ", feedback: "That uses $(V_1 - V_2)^2$, the same-polarity loss." },
        { text: "$13.5$ mJ", correct: true, feedback: "$\\dfrac{C_1C_2}{2(C_1 + C_2)}(V_1 + V_2)^2 = \\dfrac{6}{10}\\times150^2$ μJ. Check: before $10 + 3.75 = 13.75$ mJ; after $V = 50/5 = 10$ V, $0.25$ mJ." },
        { text: "$13.75$ mJ", feedback: "That is the whole initial energy. The common voltage is 10 V, not 0, so $0.25$ mJ survives." },
        { text: "$27$ mJ", feedback: "You dropped the 2 in the denominator: the loss is $\\dfrac{C_1C_2}{2(C_1 + C_2)}(V_1 + V_2)^2 = \\tfrac12(1.2\\ \\mu\\text{F})(150)^2$. It cannot exceed the 13.75 mJ you started with." },
      ],
    },
    {
      type: "quiz",
      id: "em2-7-q11",
      variant: "mastery",
      question: "Two stacked dielectric layers, $K_1 = 2$ and $K_2 = 4$, each fill half the gap of a capacitor $C_0$. A second, identical capacitor has the same materials side by side. The ratio $C_{\\text{stacked}} : C_{\\text{side}}$ is",
      options: [
        { text: "$1 : 1$", feedback: "Series and parallel give different results unless $K_1 = K_2$." },
        { text: "$9 : 8$", feedback: "Side by side (parallel) is the larger one." },
        { text: "$8 : 9$", correct: true, feedback: "Stacked: $\\dfrac{2\\cdot2\\cdot4}{6}C_0 = \\tfrac83C_0$. Side: $\\dfrac{2+4}{2}C_0 = 3C_0$. Ratio $\\tfrac{8}{9}$." },
        { text: "$4 : 9$", feedback: "Each stacked layer is $2KC_0$ (half the gap doubles $C$), not $KC_0$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "The RC circuit let charge flow for a moment. Chapter 3 keeps it flowing: steady currents in wires, the microscopic drift behind Ohm's law, and the two Kirchhoff laws that solve any DC network, capacitors included.",
    },
  ]),
};

export const emChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
