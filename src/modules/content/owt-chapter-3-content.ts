import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Oscillations, Waves and Thermal Physics Chapter 3 — Properties of Matter.
 * Leaving point masses behind: solids stretch and store elastic energy
 * (stress, strain, the three moduli), fluids push equally in all directions,
 * buoy things up and conserve energy as they flow (Pascal, Archimedes,
 * continuity, Bernoulli), and real liquids add viscosity and surface
 * tension (Stokes, terminal velocity, excess pressure, capillary rise).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "stress-and-strain",
  title: "3.1 · Stress, Strain and Hooke's Law",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/owt-3-properties-of-matter.mp4",
      poster: "/videos/owt-3-properties-of-matter.jpg",
      title: "Chapter 3 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "A steel wire just 2 mm thick can hold up an adult. A rubber band of about the same thickness tears under the weight of a large book. Both are 'strings', both stretch, and yet one is roughly a hundred times stronger than the other. Mechanics I treated strings as ideal: massless, inextensible, able to carry any tension. This chapter takes the idealisation away and asks what a real solid actually does when you pull on it.",
    },
    { type: "heading", text: "Stress: force per unit area" },
    {
      type: "text",
      content:
        "The first surprise is that the size of the force is the wrong thing to look at. Hang 100 kg from one steel wire and it may snap; hang the same 100 kg from ten identical wires side by side and each carries a tenth of the load, so nothing breaks. What the material 'feels' is the force **shared out over its cross-section**. That quantity is called stress.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Stress",
      content:
        "When a force $F$ acts on a cross-section of area $A$, the **stress** is $\\sigma = \\dfrac{F}{A}$.\nUnit: N/m² = pascal (Pa). Stress is the internal restoring force per unit area that the material develops to resist deformation; in equilibrium it balances the applied load.",
    },
    { type: "heading", text: "Strain: fractional deformation" },
    {
      type: "text",
      content:
        "The deformation is measured the same way: not by the raw change but by the **fractional** change. A 2 m wire that stretches 1 mm and a 20 m wire that stretches 10 mm are equally strained, because every metre of each wire has stretched by the same 0.5 mm. Physics has three kinds of deformation, one for each way you can push on a block.",
    },
    {
      type: "table",
      headers: ["Kind", "What the force does", "Stress", "Strain (dimensionless)"],
      rows: [
        ["Longitudinal (tensile or compressive)", "pulls or pushes along a length $L$", "$F/A$, force normal to the face", "$\\Delta L/L$"],
        ["Volume (hydraulic)", "squeezes equally from all sides", "the pressure change $\\Delta p$", "$\\Delta V/V$"],
        ["Shear", "slides the top face sideways over the bottom", "$F/A$, force parallel to the face", "the angle $\\theta \\approx \\Delta x/h$"],
      ],
    },
    {
      type: "callout",
      variant: "definition",
      title: "Strain",
      content:
        "**Strain** is the fractional deformation: $\\Delta L/L$ for a stretch, $\\Delta V/V$ for a squeeze, and the shear angle $\\theta$ (in radians) for a slide. It is a ratio of like quantities, so it has **no unit**.",
    },
    { type: "heading", text: "Hooke's law and the stress–strain curve" },
    {
      type: "text",
      content:
        "**Hooke's law.** Pull gently on a steel wire and plot stress against strain. For small strains the graph is a straight line through the origin: double the stress and the strain doubles. This is the same restoring-force-proportional-to-displacement idea that gave us SHM in Chapter 0, now written per unit area and per unit length:",
    },
    { type: "math", latex: "\\sigma \\propto \\varepsilon \\quad\\Longrightarrow\\quad \\sigma = (\\text{modulus}) \\times \\varepsilon \\qquad (\\text{small strains})" },
    {
      type: "text",
      content:
        "The constant of proportionality is a property of the material, called a modulus of elasticity; Lesson 3.2 is devoted to it. Beyond small strains the straight line bends, and a real wire tells its whole life story in one curve.",
    },
    {
      type: "table",
      headers: ["Point on the curve", "What happens", "Remove the load and..."],
      rows: [
        ["O to A: proportional limit", "stress ∝ strain (Hooke's law holds)", "the wire returns exactly to its length"],
        ["A to B: elastic limit", "slightly curved, still elastic", "the wire still returns to its length"],
        ["B to C: yield point", "the wire starts to flow; strain grows with little extra stress", "a permanent set remains (plastic deformation)"],
        ["C to D: ultimate stress", "the largest stress the wire can bear", "permanently longer"],
        ["D to E: fracture", "the wire necks (thins locally) and breaks", "two pieces"],
      ],
    },
    {
      type: "text",
      content:
        "**Ductile, brittle, elastomer.** A ductile material such as copper or mild steel has a long plastic stretch between yield and fracture, which is why it can be drawn into wires. A brittle material such as glass or cast iron breaks almost as soon as it leaves the elastic region. An elastomer such as rubber or the aorta has no straight Hooke's-law region at all, yet stretches to several times its length and still comes back. 'Elastic' in physics means *comes back*, not *stretches a lot*.",
    },
    { type: "heading", text: "Stress in a thin wire" },
    {
      type: "text",
      content:
        "Use the machine below to feel the numbers. It computes the stress in a wire of radius 1 mm (cross-section $\\pi r^2 = 3.14\\times10^{-6}$ m²) for loads up to 500 N, with the answer in megapascals (1 MPa $= 10^6$ Pa). Steel reaches its breaking stress at roughly 400 MPa.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "x/(pi*0.001^2)/1000000",
        exprLatex: "\\sigma = F/\\pi r^2,\\ r = 1\\ \\text{mm}",
        min: 0,
        max: 500,
        step: 10,
        initial: 310,
        inputLabel: "Load F",
        outputLabel: "Stress (MPa)",
        inputUnit: "N",
      },
    },
    {
      type: "text",
      content:
        "*Try this:* Slide the load. Every 3.14 N adds 1 MPa, because the area is only 3.14 square millimetres. A tiny area turns a modest force into an enormous stress.",
    },
    {
      type: "text",
      content:
        "What you should have seen: the stress climbs in a straight line with the load, and about 314 N (the weight of 31.4 kg) already gives 100 MPa. A load of 500 N gives about 159 MPa, still well under steel's breaking stress, which is why a thin steel wire can carry a person.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Convention for this chapter",
      content:
        "Take $g = 10$ m/s² unless a question says otherwise (the JEE convention). Convert every area to m² **before** dividing: $1\\ \\text{mm}^2 = 10^{-6}\\ \\text{m}^2$ and $1\\ \\text{cm}^2 = 10^{-4}\\ \\text{m}^2$. Most wrong answers in this chapter are unit slips, not physics slips.",
    },
    {
      type: "worked-example",
      id: "owt3-1-we1",
      title: "Worked example 1 (the wire from the machine)",
      problem:
        "A steel wire of radius 1 mm holds a 31.4 kg mass. Find the stress.",
      steps: [
        { text: "The load is the weight: $F = mg = 31.4 \\times 10 = 314$ N." },
        { text: "The cross-section: $A = \\pi r^2 = 3.14 \\times (10^{-3})^2 = 3.14\\times10^{-6}$ m². *Why this step:* the radius is in millimetres, and squaring $10^{-3}$ gives $10^{-6}$, not $10^{-3}$." },
        { text: "$\\sigma = F/A = 314 / (3.14\\times10^{-6}) = 1.0\\times10^{8}$ Pa $= 100$ MPa." },
      ],
      answer: "$\\sigma = 1.0\\times10^8$ Pa $= 100$ MPa",
      tryFirst: false,
    },
    {
      type: "worked-example",
      id: "owt3-1-we2",
      title: "Worked example 2 (strain from an extension)",
      problem:
        "A wire 2 m long stretches by 1 mm under a load. Find the longitudinal strain.",
      steps: [
        { text: "Put both lengths in the same unit: $\\Delta L = 1\\ \\text{mm} = 10^{-3}$ m. *Why this step:* strain is a ratio, and a ratio of millimetres to metres is off by a factor of 1000." },
        { text: "$\\varepsilon = \\Delta L/L = 10^{-3}/2 = 5\\times10^{-4}$, no unit." },
      ],
      answer: "$\\varepsilon = 5\\times10^{-4}$ (no unit)",
    },
    {
      type: "worked-example",
      id: "owt3-1-we3",
      title: "Worked example 3 (a thicker wire)",
      problem:
        "The 31.4 kg mass of Example 1 is moved to a wire of the same steel but radius 2 mm. Find the stress now.",
      steps: [
        { text: "The load is unchanged, 314 N. The area is $\\pi(2\\times10^{-3})^2 = 4 \\times 3.14\\times10^{-6}$ m². *Why this step:* area goes as $r^2$, so doubling the radius quadruples the area." },
        { text: "$\\sigma = 100/4 = 25$ MPa. The same force produces a quarter of the stress, and the thick wire is four times as far from breaking." },
      ],
      answer: "$\\sigma = 25$ MPa, a quarter of the stress",
    },
    {
      type: "worked-example",
      id: "owt3-1-we4",
      title: "Worked example 4 (shear)",
      problem:
        "A rubber cube of side 10 cm is glued to a table. A force of 1000 N parallel to its top face slides the top 2 mm sideways relative to the bottom. Find the shear stress and the shear strain.",
      steps: [
        { text: "Shear stress uses the face the force lies along: $A = (0.1)^2 = 10^{-2}$ m², so $\\sigma_s = 1000/10^{-2} = 10^{5}$ Pa. *Why this step:* in shear the force is parallel to the face, but the stress is still force per area of that face." },
        { text: "Shear strain is the angle: $\\theta \\approx \\Delta x/h = 2\\times10^{-3}/0.1 = 0.02$ rad." },
      ],
      answer: "Shear stress $10^5$ Pa; shear strain 0.02 rad",
    },
    {
      type: "worked-example",
      id: "owt3-1-we5",
      title: "Worked example 5 (volume strain)",
      problem:
        "A solid sphere of volume 1000 cm³ is lowered into deep water and its volume falls by 0.5 cm³. Find the volume strain.",
      steps: [
        { text: "$\\Delta V/V = -0.5/1000 = -5\\times10^{-4}$. *Why this step:* here both volumes are already in cm³, so no conversion is needed; the ratio is the same in any unit." },
        { text: "The minus sign records a decrease. The stress causing it is the extra water pressure, which Lesson 3.2 will turn into a bulk modulus." },
      ],
      answer: "$\\Delta V/V = -5\\times10^{-4}$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"stress is a force\"",
      content:
        "Stress is force **per unit area**. The same 314 N is 100 MPa in a 1 mm radius wire and only 25 MPa in a 2 mm radius wire. Whether a wire breaks depends on stress, not load, which is why cables are made thicker (or bundled) to carry heavier loads.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"elastic means very stretchy\"",
      content:
        "A material is elastic if it **returns** to its original shape when the load is removed. Steel is highly elastic within its elastic limit even though it stretches very little; putty stretches easily but is not elastic at all.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "owt3-1-q1",
      variant: "concept",
      question: "What is the SI unit of strain?",
      options: [
        { text: "N/m²", feedback: "That is the unit of stress. Strain divides a length change by a length." },
        { text: "m", feedback: "An extension has unit m, but strain is the extension divided by the original length." },
        { text: "It has no unit", correct: true, feedback: "Strain is a ratio of like quantities ($\\Delta L/L$, $\\Delta V/V$ or an angle in radians), so it is dimensionless." },
        { text: "N/m", feedback: "That is a spring constant (or surface tension). Strain involves no force at all." },
      ],
      hint: "Strain is defined as a ratio (3.1). Write out the units of its numerator and of its denominator.",
    },
    {
      type: "numeric",
      id: "owt3-1-q2",
      variant: "practice",
      question: "A 50 kg load hangs from a wire of cross-sectional area 2 mm². Taking $g = 10$ m/s², what is the stress in the wire? Give your answer in Pa (scientific notation such as 3e7 is fine).",
      answer: 2.5e8,
      relTolerance: 0.01,
      unit: "Pa",
      hint: "Weight first, then convert the area to m².",
      solution: "$F = mg = 50 \\times 10 = 500$ N and $A = 2\\ \\text{mm}^2 = 2\\times10^{-6}$ m².\n\n$\\sigma = \\dfrac{F}{A} = \\dfrac{500}{2\\times10^{-6}} = 2.5\\times10^{8}$ Pa $= 250$ MPa.",
      commonMistakes: [
        { answer: 250, feedback: "You divided 500 N by 2 without converting mm² to m². $2\\ \\text{mm}^2 = 2\\times10^{-6}\\ \\text{m}^2$." },
        { answer: 2.5e5, feedback: "You used $1\\ \\text{mm}^2 = 10^{-3}\\ \\text{m}^2$. A square millimetre is $(10^{-3}\\ \\text{m})^2 = 10^{-6}\\ \\text{m}^2$." },
        { answer: 25, feedback: "You used the mass (50) instead of the weight (500 N) and also skipped the area conversion." },
      ],
    },
    {
      type: "numeric",
      id: "owt3-1-q3",
      variant: "practice",
      question: "A wire of original length 2.5 m stretches by 0.5 mm. What is the strain? (Scientific notation such as 3e-4 is fine.)",
      answer: 2e-4,
      relTolerance: 0.01,
      hint: "Put the extension and the length in the same unit before dividing.",
      solution: "$\\varepsilon = \\dfrac{\\Delta L}{L} = \\dfrac{0.5\\times10^{-3}}{2.5} = 2\\times10^{-4}$, with no unit.",
      commonMistakes: [
        { answer: 0.2, feedback: "You divided 0.5 by 2.5 with mixed units (mm by m). Convert the extension to metres first." },
        { answer: 5000, feedback: "That is $L/\\Delta L$, upside down. Strain is the change over the original." },
        { answer: 1.25e-3, feedback: "That multiplies $0.5\\times10^{-3}$ by 2.5 instead of dividing." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-1-q4",
      variant: "practice",
      question: "Two wires of the same steel carry the same load. Wire P has radius $r$ and wire Q has radius $2r$. What is the ratio of stresses $\\sigma_P : \\sigma_Q$?",
      options: [
        { text: "$1 : 2$", feedback: "Stress is inversely proportional to area, and the thicker wire has the *smaller* stress." },
        { text: "$2 : 1$", feedback: "That uses the radius ratio. Area goes as $r^2$, so the area ratio is $1 : 4$." },
        { text: "$4 : 1$", correct: true, feedback: "Same force, areas in the ratio $1 : 4$, so stresses in the ratio $4 : 1$." },
        { text: "$1 : 1$", feedback: "The load is the same, but stress is load per area, and the areas differ." },
      ],
      hint: "Stress is force per unit area, and the cross-sectional area goes as $r^2$.",
    },
    {
      type: "quiz",
      id: "owt3-1-q5",
      variant: "concept",
      question: "A wire is loaded and then unloaded. It returns exactly to its original length. What can you conclude?",
      options: [
        { text: "The stress never exceeded the elastic limit.", correct: true, feedback: "Returning to the original length is the definition of elastic behaviour, which holds up to the elastic limit." },
        { text: "The stress passed the yield point but not the ultimate stress.", feedback: "Beyond the yield point the wire keeps a permanent set, so it would not return to its original length." },
        { text: "The wire must be made of rubber.", feedback: "Steel wires return to their length too, as long as the stress stays within the elastic limit." },
        { text: "The strain was zero throughout.", feedback: "The wire did stretch under load; it simply came back afterwards." },
      ],
      hint: "Recall the stress–strain curve in 3.1: up to which point does a material recover its original length completely?",
    },
    {
      type: "quiz",
      id: "owt3-1-q6",
      variant: "concept",
      multiple: true,
      question: "A copper wire is loaded until the stress passes its yield point (but stays below the ultimate stress), and then the load is removed. Select every correct statement.",
      options: [
        { text: "The wire is left permanently longer than it was.", correct: true, feedback: "Beyond the yield point the deformation is plastic: a permanent set remains." },
        { text: "The stress exceeded the elastic limit at some stage.", correct: true, feedback: "The yield point lies beyond the elastic limit, so the wire must have passed it." },
        { text: "Stress stayed proportional to strain throughout the loading.", feedback: "Proportionality (Hooke's law) holds only up to the proportional limit, well before the yield point." },
        { text: "The wire must have fractured.", feedback: "Fracture comes after the ultimate stress. Below it a ductile wire stretches plastically but stays in one piece." },
      ],
      hint: "Walk along the stress–strain curve: proportional limit, elastic limit, yield point, ultimate stress, fracture.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "elastic-moduli",
  title: "3.2 · Young's, Bulk and Shear Moduli",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 3.1 found that, for small deformations, stress is proportional to strain. The constant of proportionality is a number stamped on each material, like a density. It answers the practical question engineers actually ask: *how much will this stretch, squeeze or twist under this load?*",
    },
    { type: "heading", text: "Stretching, squeezing and shearing" },
    {
      type: "callout",
      variant: "definition",
      title: "The three moduli of elasticity",
      content:
        "**Young's modulus** (stretching): $Y = \\dfrac{F/A}{\\Delta L/L}$.\n**Bulk modulus** (squeezing): $B = -\\dfrac{\\Delta p}{\\Delta V/V}$; the minus sign makes $B$ positive, since more pressure means less volume. Its reciprocal $1/B$ is the **compressibility**.\n**Shear modulus** (modulus of rigidity): $G = \\dfrac{F/A}{\\theta}$.\nAll three have the unit of stress, Pa, because strain is dimensionless.",
    },
    {
      type: "table",
      headers: ["Material", "$Y$ (Pa)", "$B$ (Pa)", "$G$ (Pa)"],
      rows: [
        ["Steel", "$2.0\\times10^{11}$", "$1.6\\times10^{11}$", "$8\\times10^{10}$"],
        ["Copper", "$1.1\\times10^{11}$", "$1.4\\times10^{11}$", "$4.5\\times10^{10}$"],
        ["Aluminium", "$7\\times10^{10}$", "$7.5\\times10^{10}$", "$2.5\\times10^{10}$"],
        ["Rubber", "$\\sim 10^{6}$ to $10^{7}$", "large", "small"],
        ["Water", "none (a liquid has no fixed shape)", "$2.2\\times10^{9}$", "none"],
      ],
    },
    {
      type: "text",
      content:
        "Fluids have a bulk modulus but no Young's or shear modulus: you cannot pull a liquid into a longer shape and have it spring back, and it does not resist a steady slide of one layer over another (that resistance, viscosity, depends on speed and is Lesson 3.5).",
    },
    { type: "heading", text: "The extension formula" },
    {
      type: "text",
      content:
        "Rearrange the definition of $Y$ to get the one equation you will use most:",
    },
    { type: "math", latex: "Y = \\frac{F/A}{\\Delta L/L} \\quad\\Longrightarrow\\quad \\Delta L = \\frac{FL}{AY}" },
    {
      type: "text",
      content:
        "Read it physically. A longer wire stretches more (each metre stretches the same amount, and there are more metres). A thicker wire stretches less (the load is shared over more area). A stiffer material stretches less. The wire behaves exactly like a spring with spring constant $k = AY/L$.",
    },
    {
      type: "text",
      content:
        "The machine below hangs a fixed 100 N load on a 2 m steel wire and lets you change the radius. With $\\Delta L = FL/(\\pi r^2 Y)$ and $r$ in millimetres, the extension in millimetres works out to $1/(\\pi r^2)$.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "1/(pi*x^2)",
        exprLatex: "\\Delta L = \\frac{FL}{\\pi r^2 Y}\\ (F = 100\\text{ N},\\ L = 2\\text{ m, steel})",
        min: 0.2,
        max: 2,
        step: 0.1,
        initial: 1,
        inputLabel: "Wire radius r",
        outputLabel: "Extension ΔL (mm)",
        inputUnit: "mm",
      },
    },
    {
      type: "text",
      content:
        "*Try this:* Halve the radius from 1 mm to 0.5 mm and watch the extension jump from 0.32 mm to 1.27 mm: four times as much, because the area has become a quarter.",
    },
    {
      type: "text",
      content:
        "What you should have seen: the extension falls off as $1/r^2$, not $1/r$. Doubling the radius cuts the stretch to a quarter; thin wires are the ones used in Searle's apparatus precisely so that the extension is large enough to measure.",
    },
    { type: "heading", text: "Elastic potential energy" },
    {
      type: "text",
      content:
        "While the wire is being stretched, the load rises from 0 to $F$ in a straight line (Hooke's law), so the work done on the wire is the area of the triangle under the $F$–$\\Delta L$ graph:",
    },
    { type: "math", latex: "U = \\tfrac12 F\\,\\Delta L = \\tfrac12 \\cdot \\underbrace{\\frac{F}{A}}_{\\text{stress}} \\cdot \\underbrace{\\frac{\\Delta L}{L}}_{\\text{strain}} \\cdot \\underbrace{AL}_{\\text{volume}}" },
    {
      type: "text",
      content:
        "Dividing by the volume gives the **energy density** $u = \\tfrac12\\,\\sigma\\,\\varepsilon = \\tfrac12 Y\\varepsilon^2 = \\dfrac{\\sigma^2}{2Y}$. This is the same $\\tfrac12 kx^2$ you met for springs, written per unit volume.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Poisson's ratio (brief)",
      content:
        "A wire that stretches also gets thinner. The ratio $\\nu = -\\dfrac{\\Delta d/d}{\\Delta L/L}$ of lateral strain to longitudinal strain is **Poisson's ratio**. For most metals $\\nu \\approx 0.3$; theory limits it to at most $0.5$ (the value for which volume is exactly conserved, close to rubber's).",
    },
    { type: "heading", text: "Wires, thermal stress and the deep sea" },
    {
      type: "worked-example",
      id: "owt3-2-we1",
      title: "Worked example 1 (steel vs copper)",
      problem:
        "Two wires, each 2 m long with cross-section 1 mm², carry 100 N. Take $Y_{\\text{steel}} = 2\\times10^{11}$ Pa and $Y_{\\text{Cu}} = 1\\times10^{11}$ Pa. Find the extension of each wire. Then find the total extension when the 100 N load is carried (a) by the two wires in series, (b) by the two wires side by side, sharing a rigid bar.",
      steps: [
        { text: "$\\Delta L_{\\text{steel}} = \\dfrac{FL}{AY} = \\dfrac{100 \\times 2}{10^{-6} \\times 2\\times10^{11}} = \\dfrac{200}{2\\times10^{5}} = 10^{-3}$ m $= 1$ mm." },
        { text: "Copper has half the modulus, so $\\Delta L_{\\text{Cu}} = 2$ mm. *Why this step:* with $F$, $L$, $A$ fixed, $\\Delta L \\propto 1/Y$; no need to redo the arithmetic." },
        { text: "**In series** (steel wire hanging from copper wire, 100 N at the bottom): both carry the full 100 N, so the total stretch is $1 + 2 = 3$ mm. *Why this step:* in series the tension is the same and the extensions add, just like springs in series." },
        { text: "**In parallel** (both wires side by side sharing a rigid bar that moves down by the same $x$): the loads add, $F = (k_s + k_c)x$ with $k = AY/L$, so $x = \\dfrac{100}{10^{5} + 5\\times10^{4}} = 6.7\\times10^{-4}$ m $\\approx 0.67$ mm." },
      ],
      answer: "Steel 1 mm, copper 2 mm; (a) in series 3 mm; (b) in parallel about 0.67 mm",
    },
    {
      type: "worked-example",
      id: "owt3-2-we2",
      title: "Worked example 2 (a wire under its own weight, JEE Advanced)",
      problem:
        "A uniform wire of length $L$, density $\\rho$ and modulus $Y$ hangs from the ceiling. How much does it stretch under its own weight?",
      steps: [
        { text: "A slice of length $dx$ at distance $x$ from the **bottom** carries only the weight of the wire below it: $T(x) = \\rho A x g$. *Why this step:* tension varies along the wire, so $\\Delta L = FL/AY$ cannot be used for the whole wire at once." },
        { text: "That slice stretches by $d(\\Delta L) = \\dfrac{T(x)\\,dx}{AY} = \\dfrac{\\rho g x\\,dx}{Y}$." },
        { text: "Add up the slices:", latex: "\\Delta L = \\int_0^L \\frac{\\rho g x}{Y}\\,dx = \\frac{\\rho g L^2}{2Y} = \\frac{(\\rho A L g) L}{2AY} = \\frac{WL}{2AY}" },
        { text: "The last form says the wire stretches as though **half** its weight $W$ hung at the end. For a 10 m steel wire with $\\rho = 8000$ kg/m³: $\\Delta L = \\dfrac{8000 \\times 10 \\times 100}{2 \\times 2\\times10^{11}} = 2\\times10^{-5}$ m, a fiftieth of a millimetre." },
      ],
      answer: "$\\Delta L = \\dfrac{\\rho g L^2}{2Y} = \\dfrac{WL}{2AY}$ ($2\\times10^{-5}$ m for 10 m of steel)",
    },
    {
      type: "worked-example",
      id: "owt3-2-we3",
      title: "Worked example 3 (thermal stress, a forward link to 4.2)",
      problem:
        "A steel rail is clamped between rigid supports at both ends and warmed by $50$ °C. Take $\\alpha = 1.2\\times10^{-5}$ /°C and $Y = 2\\times10^{11}$ Pa. Find the stress in the rail.",
      steps: [
        { text: "If free, it would lengthen by $\\Delta L = L\\alpha\\Delta T$, a strain of $\\alpha\\Delta T = 6\\times10^{-4}$." },
        { text: "The clamps push it back by exactly that strain. *Why this step:* the stress needed is whatever compressive stress undoes the thermal strain, and Hooke's law converts strain to stress." },
        { text: "$\\sigma = Y\\alpha\\Delta T = 2\\times10^{11} \\times 6\\times10^{-4} = 1.2\\times10^{8}$ Pa. Notice the length cancelled: short or long, the clamped rail feels the same stress. That is why railway lines have expansion gaps." },
      ],
      answer: "$\\sigma = 1.2\\times10^8$ Pa (compressive), whatever the rail's length",
    },
    {
      type: "worked-example",
      id: "owt3-2-we4",
      title: "Worked example 4 (a steel ball in the deep sea)",
      problem:
        "A steel ball of volume 100 cm³ is taken 1 km down in the sea. Take $\\rho_{\\text{water}} = 1000$ kg/m³ and $B_{\\text{steel}} = 1.6\\times10^{11}$ Pa. Find the change in its volume.",
      steps: [
        { text: "Extra pressure: $\\Delta p = \\rho g h = 1000 \\times 10 \\times 1000 = 10^{7}$ Pa. *Why this step:* only the change in pressure strains the ball; the atmosphere was already acting at the surface." },
        { text: "$\\dfrac{\\Delta V}{V} = -\\dfrac{\\Delta p}{B} = -\\dfrac{10^{7}}{1.6\\times10^{11}} = -6.25\\times10^{-5}$." },
        { text: "$\\Delta V = -6.25\\times10^{-5} \\times 100 = -6.25\\times10^{-3}$ cm³. Solids are very hard to compress." },
      ],
      answer: "$\\Delta V = -6.25\\times10^{-3}$ cm³",
    },
    {
      type: "worked-example",
      id: "owt3-2-we5",
      title: "Worked example 5 (energy stored)",
      problem:
        "Find the energy stored in the steel wire of Example 1.",
      steps: [
        { text: "$U = \\tfrac12 F\\Delta L = \\tfrac12 \\times 100 \\times 10^{-3} = 0.05$ J." },
        { text: "Check with the energy density: $\\varepsilon = 10^{-3}/2 = 5\\times10^{-4}$, so $u = \\tfrac12 Y\\varepsilon^2 = \\tfrac12 \\times 2\\times10^{11} \\times 2.5\\times10^{-7} = 2.5\\times10^{4}$ J/m³, and the volume is $10^{-6} \\times 2 = 2\\times10^{-6}$ m³, giving $0.05$ J. ✓ *Why this step:* two routes to the same number catch power-of-ten slips." },
      ],
      answer: "$U = 0.05$ J",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a more stretchable material has a higher Young's modulus\"",
      content:
        "It is the other way round. $Y$ is the stress needed **per unit strain**. Rubber stretches a lot under a small stress, so its $Y$ is tiny ($\\sim 10^{6}$ Pa); steel barely stretches, so its $Y$ is huge ($2\\times10^{11}$ Pa). In this sense steel is far 'more elastic' than rubber.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"$\\tfrac12 F\\Delta L$ and $F\\Delta L$ are the same energy\"",
      content:
        "If you hang a mass $m$ on a wire and let it drop gently to its new equilibrium, gravity does $mg\\,\\Delta L$ of work but only $\\tfrac12 mg\\,\\Delta L$ is stored in the wire. The other half is dissipated (by your hand, or as heat when the oscillations die out). The stored energy is always the triangle, $\\tfrac12 F\\Delta L$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "owt3-2-q1",
      variant: "practice",
      question: "A steel wire 3 m long with cross-section 2 mm² carries a load of 400 N. With $Y = 2\\times10^{11}$ Pa, find the extension in mm.",
      answer: 3,
      unit: "mm",
      hint: "$\\Delta L = FL/(AY)$ with everything in SI units; convert to mm at the end.",
      solution: "$\\Delta L = \\dfrac{FL}{AY} = \\dfrac{400 \\times 3}{2\\times10^{-6} \\times 2\\times10^{11}} = \\dfrac{1200}{4\\times10^{5}} = 3\\times10^{-3}$ m $= 3$ mm.",
      commonMistakes: [
        { answer: 0.3, feedback: "Check the powers of ten: $2\\times10^{-6} \\times 2\\times10^{11} = 4\\times10^{5}$, and $1200/(4\\times10^{5}) = 3\\times10^{-3}$ m, which is 3 mm." },
        { answer: 1.5, feedback: "You seem to have used a 1.5 m length or doubled the area. Use $L = 3$ m and $A = 2\\times10^{-6}$ m²." },
        { answer: 3000, feedback: "That is an extension of 3 m, equal to the whole length (a strain of 1). Something went wrong with the area conversion ($2\\ \\text{mm}^2 = 2\\times10^{-6}\\ \\text{m}^2$)." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-2-q2",
      variant: "concept",
      question: "Which has the larger Young's modulus, a rubber band or a steel wire?",
      options: [
        { text: "Rubber, because it stretches more.", feedback: "Stretching more under the same stress means a *smaller* stress-to-strain ratio, so a smaller $Y$." },
        { text: "Steel, because it needs a far larger stress for the same strain.", correct: true, feedback: "$Y = \\sigma/\\varepsilon$. Steel's $Y \\approx 2\\times10^{11}$ Pa dwarfs rubber's $\\sim10^{6}$ Pa." },
        { text: "They are equal, since both obey Hooke's law.", feedback: "Obeying a linear law does not fix the slope. The slopes differ by five orders of magnitude." },
      ],
      hint: "Young's modulus is stress divided by strain. Compare the stress each material needs to produce the same strain.",
    },
    {
      type: "quiz",
      id: "owt3-2-q3",
      variant: "practice",
      question: "Wires A and B are made of the same metal and carry the same load. B is twice as long as A and has twice A's radius. What is $\\Delta L_B / \\Delta L_A$?",
      options: [
        { text: "$1$", feedback: "Doubling the length doubles the stretch, but doubling the radius quadruples the area. The effects do not cancel." },
        { text: "$\\tfrac12$", correct: true, feedback: "$\\Delta L \\propto L/r^2$, so the ratio is $2/4 = \\tfrac12$." },
        { text: "$2$", feedback: "That ignores the change in area." },
        { text: "$\\tfrac14$", feedback: "That accounts for the area but forgets that B is twice as long." },
      ],
      hint: "Use $\\Delta L = \\dfrac{FL}{AY}$ with $A \\propto r^2$, and compare factor by factor.",
    },
    {
      type: "numeric",
      id: "owt3-2-q4",
      variant: "practice",
      question: "A brass rod is clamped between two rigid walls and heated by 40 °C. With $Y = 1\\times10^{11}$ Pa and $\\alpha = 2\\times10^{-5}$ /°C, what compressive stress develops? Give your answer in Pa (the rod's length is not needed).",
      answer: 8e7,
      relTolerance: 0.01,
      unit: "Pa",
      hint: "The clamps must undo the free thermal strain $\\alpha\\Delta T$; Hooke's law turns that strain into a stress.",
      solution: "Free thermal strain: $\\alpha\\Delta T = 2\\times10^{-5} \\times 40 = 8\\times10^{-4}$. The length cancels.\n\n$\\sigma = Y\\alpha\\Delta T = 10^{11} \\times 8\\times10^{-4} = 8\\times10^{7}$ Pa.",
      commonMistakes: [
        { answer: 8e5, feedback: "Recheck the exponents: $10^{11} \\times 10^{-5} = 10^{6}$, then $\\times 80 = 8\\times10^{7}$." },
        { answer: 2e6, feedback: "You left out $\\Delta T = 40$. The strain is $\\alpha\\Delta T$, not $\\alpha$." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-2-q5",
      variant: "practice",
      question: "A wire stretches by 1.5 mm when a 200 N load is gradually applied. How much elastic energy does it store?",
      options: [
        { text: "$0.30$ J", feedback: "That is $F\\Delta L$. The force grew from 0 to 200 N, so the stored energy is the triangle, half of this." },
        { text: "$0.15$ J", correct: true, feedback: "$U = \\tfrac12 F\\Delta L = \\tfrac12 \\times 200 \\times 1.5\\times10^{-3} = 0.15$ J." },
        { text: "$150$ J", feedback: "You used 1.5 instead of $1.5\\times10^{-3}$ m." },
      ],
      hint: "The load is applied gradually, so the force rises from zero to its final value. The stored energy is the area under the force–extension line.",
    },
    {
      type: "quiz",
      id: "owt3-2-q6",
      variant: "practice",
      question: "Increasing the pressure on a liquid by $2\\times10^{6}$ Pa reduces its volume by 0.1%. What is its bulk modulus?",
      options: [
        { text: "$2\\times10^{7}$ Pa", feedback: "You used 0.1 as the volume strain. 0.1% is $10^{-3}$." },
        { text: "$2\\times10^{9}$ Pa", correct: true, feedback: "$B = \\Delta p/(\\Delta V/V) = 2\\times10^{6}/10^{-3} = 2\\times10^{9}$ Pa, close to water's value." },
        { text: "$5\\times10^{-10}$ Pa⁻¹", feedback: "That is the compressibility $1/B$, not the bulk modulus." },
        { text: "$2\\times10^{3}$ Pa", feedback: "You multiplied by the strain instead of dividing by it." },
      ],
      hint: "$B = \\dfrac{\\Delta p}{\\Delta V/V}$. Write 0.1% as a decimal first.",
    },
    {
      type: "quiz",
      id: "owt3-2-q7",
      variant: "practice",
      multiple: true,
      question: "Wires P and Q are made of the same steel and carry the same load. Q is twice as long as P and has twice P's radius. Select every correct statement.",
      options: [
        { text: "The stress in Q is a quarter of the stress in P.", correct: true, feedback: "Same force over four times the area ($A \\propto r^2$)." },
        { text: "The extension of Q is half the extension of P.", correct: true, feedback: "$\\Delta L = FL/AY \\propto L/r^2 = 2/4 = \\tfrac12$." },
        { text: "Young's modulus of Q is a quarter of P's.", feedback: "$Y$ is a property of the material, not of the wire's shape. Both are steel, so their $Y$ is the same." },
        { text: "Q stores more elastic energy than P.", feedback: "$U = \\tfrac12 F\\Delta L$ with the same $F$, and Q stretches half as much, so it stores half the energy." },
      ],
      hint: "Use $\\sigma = F/A$, $\\Delta L = FL/AY$ and $U = \\tfrac12 F\\Delta L$ as ratios.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "pressure-and-buoyancy",
  title: "3.3 · Pressure, Pascal and Archimedes",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Dive to the bottom of a swimming pool and your ears hurt. Nobody is pushing on your ears; the water above you is. A fluid at rest cannot resist being slid (it has no shear modulus), so the only force it can exert on any surface is a push **perpendicular** to that surface. The push per unit area is the pressure $p$, and at a point in a fluid it is the same in every direction.",
    },
    { type: "heading", text: "Pressure grows with depth" },
    {
      type: "text",
      content:
        "**Deriving $p = p_0 + \\rho g h$.** Imagine a vertical cylinder of the fluid itself, cross-section $A$, with its top at the surface and its bottom at depth $h$. It is at rest, so the vertical forces on it balance. *The sideways pushes on its curved wall cancel in pairs, so only three forces matter:*",
    },
    {
      type: "math",
      latex: "\\underbrace{pA}_{\\text{up, on the bottom}} = \\underbrace{p_0 A}_{\\text{down, on the top}} + \\underbrace{(\\rho A h)g}_{\\text{weight of the column}} \\quad\\Longrightarrow\\quad p = p_0 + \\rho g h",
    },
    {
      type: "text",
      content:
        "The area cancelled. Pressure at depth $h$ depends only on the depth, the fluid's density and the pressure at the top, and not on how wide the container is. Adjust the depth in the machine below ($p_0 = 100$ kPa, fresh water, $g = 10$ m/s², so every metre adds 10 kPa).",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "100 + 10*x",
        exprLatex: "p = p_0 + \\rho g h",
        min: 0,
        max: 50,
        step: 1,
        initial: 10,
        inputLabel: "Depth",
        outputLabel: "Pressure (kPa)",
        inputUnit: "m",
      },
    },
    {
      type: "text",
      content:
        "*Try this:* Every 10 m of water adds one more atmosphere. At 10 m the pressure has doubled; at 50 m it is six times the surface value.",
    },
    {
      type: "text",
      content:
        "What you should have seen: a straight line with slope 10 kPa per metre starting at 100 kPa. A scuba diver at 30 m breathes air at 400 kPa, four atmospheres, which is why the regulator must deliver air at the surrounding pressure and why ascending too fast is dangerous.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Absolute and gauge pressure",
      content:
        "**Absolute pressure** is the full pressure $p$. **Gauge pressure** is $p - p_0$, the excess over atmospheric, which is what a tyre gauge reads. At depth $h$ in an open liquid the gauge pressure is $\\rho g h$. Atmospheric pressure is about $1.01\\times10^{5}$ Pa; we round it to $100$ kPa when $g = 10$.",
    },
    {
      type: "text",
      content:
        "**The hydrostatic paradox.** Take three vessels with the same base area filled to the same height: a straight cylinder, a cone widening upwards and a cone narrowing upwards. They hold very different amounts of water, yet the pressure on each base is identical, $p_0 + \\rho g h$. In the wide vessel the sloping walls hold up the extra water; in the narrow one the sloping walls push *down* on the water. Only the depth matters.",
    },
    { type: "heading", text: "Manometers and barometers" },
    {
      type: "text",
      content:
        "In a U-tube, points at the same level in the same connected fluid at rest are at the same pressure. So a U-tube with a height difference $h$ of liquid measures a gauge pressure $\\rho g h$. Torricelli's barometer is a tube of mercury inverted in a dish: vacuum at the top, so $p_0 = \\rho_{\\text{Hg}} g h$. With $h = 0.76$ m, $\\rho_{\\text{Hg}} = 13600$ kg/m³ and $g = 9.8$ m/s², $p_0 = 1.013\\times10^{5}$ Pa, one atmosphere.",
    },
    { type: "heading", text: "Pascal's law and the hydraulic lift" },
    {
      type: "callout",
      variant: "definition",
      title: "Pascal's law",
      content:
        "A change of pressure applied to an enclosed fluid at rest is transmitted **undiminished** to every part of the fluid and to the walls of the container. (It follows from $p = p_0 + \\rho g h$: raise $p_0$ by $\\Delta p$ and every $p$ rises by the same $\\Delta p$.)",
    },
    {
      type: "text",
      content:
        "**The hydraulic lift.** Push a small piston of area $a$ with force $f$. The extra pressure $f/a$ reaches the large piston of area $A$ unchanged, so the large piston feels $F = (f/a)A$, multiplied by $A/a$. Energy is not multiplied: the liquid is incompressible, so the volume $a\\,d$ pushed in equals the volume $A\\,D$ pushed up, and $fd = FD$. You trade distance for force, exactly as with a lever.",
    },
    { type: "heading", text: "Buoyancy and flotation" },
    {
      type: "text",
      content:
        "**Archimedes' principle, derived.** Hold a block of height $h$ and face area $A$ fully under water, top face at depth $d$. The side pushes cancel. The bottom face is deeper, so it is pushed up harder than the top is pushed down:",
    },
    { type: "math", latex: "F_B = \\big[p_0 + \\rho g(d + h)\\big]A - \\big[p_0 + \\rho g d\\big]A = \\rho g (hA) = \\rho\\, V_{\\text{sub}}\\, g" },
    {
      type: "callout",
      variant: "definition",
      title: "Archimedes' principle and flotation",
      content:
        "A body wholly or partly immersed in a fluid feels an upward **buoyant force** equal to the weight of the fluid it displaces: $F_B = \\rho_{\\text{fluid}} V_{\\text{sub}} g$.\nA floating body displaces its own weight: $\\rho_{\\text{body}} V g = \\rho_{\\text{fluid}} V_{\\text{sub}} g$, so the **fraction submerged** is $\\dfrac{V_{\\text{sub}}}{V} = \\dfrac{\\rho_{\\text{body}}}{\\rho_{\\text{fluid}}}$.",
    },
    {
      type: "text",
      content:
        "**Liquid in an accelerating container (JEE).** Put a tank of water on a truck accelerating at $a$. In the truck's frame there is a pseudo-force $ma$ backwards on every drop, so 'effective gravity' is $\\vec g_{\\text{eff}}$ with a downward part $g$ and a backward part $a$. The free surface sets itself perpendicular to $\\vec g_{\\text{eff}}$, so it tilts, higher at the back, with",
    },
    { type: "math", latex: "\\tan\\theta = \\frac{a}{g}" },
    {
      type: "worked-example",
      id: "owt3-3-we1",
      title: "Worked example 1 (pressure at 20 m)",
      problem:
        "Find the absolute and gauge pressure 20 m below the surface of a lake ($p_0 = 100$ kPa).",
      steps: [
        { text: "Gauge pressure $= \\rho g h = 1000 \\times 10 \\times 20 = 2\\times10^{5}$ Pa $= 200$ kPa." },
        { text: "Absolute pressure $= 100 + 200 = 300$ kPa, three atmospheres. *Why this step:* the atmosphere presses on the lake surface, and Pascal's law passes that pressure all the way down." },
      ],
      answer: "Gauge 200 kPa; absolute 300 kPa",
    },
    {
      type: "worked-example",
      id: "owt3-3-we2",
      title: "Worked example 2 (hydraulic lift)",
      problem:
        "The pistons of a car-service lift have areas in the ratio $1 : 50$. What force on the small piston lifts a 1500 kg car? How far must it move to raise the car 1 cm?",
      steps: [
        { text: "Car's weight: $15000$ N. Force needed on the small piston: $15000/50 = 300$ N. *Why this step:* equal pressures on both pistons mean forces in the ratio of areas." },
        { text: "Volumes swept are equal, so the small piston moves $50 \\times 1$ cm $= 50$ cm." },
        { text: "Check energy: $300 \\times 0.5 = 150$ J in, $15000 \\times 0.01 = 150$ J out. ✓" },
      ],
      answer: "300 N, moved through 50 cm",
    },
    {
      type: "worked-example",
      id: "owt3-3-we3",
      title: "Worked example 3 (floating ice)",
      problem:
        "Ice ($\\rho = 900$ kg/m³) floats in water. What fraction of it is under water?",
      steps: [
        { text: "Floating: weight = buoyant force, $\\rho_{\\text{ice}}Vg = \\rho_w V_{\\text{sub}} g$." },
        { text: "$V_{\\text{sub}}/V = 900/1000 = 0.9$. Nine-tenths of an iceberg is hidden. *Why this step:* $g$ and the actual size both cancel, so the fraction depends only on the density ratio." },
      ],
      answer: "0.9 (nine-tenths)",
    },
    {
      type: "worked-example",
      id: "owt3-3-we4",
      title: "Worked example 4 (weighing in water)",
      problem:
        "A stone weighs 30 N in air and 20 N when fully immersed in water. Find its density.",
      steps: [
        { text: "The loss of weight is the buoyant force: $F_B = 30 - 20 = 10$ N." },
        { text: "$F_B = \\rho_w V g$, so $V = \\dfrac{10}{1000 \\times 10} = 10^{-3}$ m³. *Why this step:* the displaced volume equals the stone's volume because it is fully immersed." },
        { text: "Mass $= 30/10 = 3$ kg, so $\\rho = 3/10^{-3} = 3000$ kg/m³. Shortcut: $\\rho_{\\text{body}}/\\rho_w = W_{\\text{air}}/(\\text{loss of weight}) = 30/10 = 3$." },
      ],
      answer: "$\\rho = 3000$ kg/m³",
    },
    {
      type: "worked-example",
      id: "owt3-3-we5",
      title: "Worked example 5 (water on a truck)",
      problem:
        "A truck carrying an open tank of water accelerates at $5$ m/s². At what angle to the horizontal does the water surface settle, and which end of the tank is higher?",
      steps: [
        { text: "$\\tan\\theta = a/g = 5/10 = 0.5$, so $\\theta \\approx 26.6^\\circ$." },
        { text: "The surface is higher at the **back** of the tank. *Why this step:* the pseudo-force points backwards, so water piles up at the rear, just as passengers lurch backwards." },
      ],
      answer: "$\\theta \\approx 26.6^\\circ$, higher at the back",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a taller, thinner vessel has more pressure at the bottom only if it holds more water\"",
      content:
        "The amount of water is irrelevant. Pressure at the base depends only on the depth: a thin 10 m pipe of water exerts the same 100 kPa of gauge pressure on its base as a 10 m deep lake. Pascal once burst a barrel by pouring a jug of water into a long thin tube fixed to its lid.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"melting ice floating in a glass raises the water level\"",
      content:
        "Floating ice already displaces its own weight of water. When it melts it turns into exactly that weight of water, which fills exactly the volume it was displacing. The level stays the same. (Land ice melting into the sea is different: it was not displacing any sea water before.)",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "owt3-3-q1",
      variant: "practice",
      question: "Taking $p_0 = 100$ kPa and $g = 10$ m/s², what is the absolute pressure 30 m below the surface of fresh water? Give your answer in kPa.",
      answer: 400,
      unit: "kPa",
      hint: "Absolute pressure is the atmosphere plus $\\rho g h$.",
      solution: "$\\rho g h = 1000 \\times 10 \\times 30 = 3\\times10^{5}$ Pa $= 300$ kPa.\n\n$p = p_0 + \\rho g h = 100 + 300 = 400$ kPa.",
      commonMistakes: [
        { answer: 300, feedback: "That is the gauge pressure $\\rho g h$. Add the atmosphere pressing on the surface." },
        { answer: 130, feedback: "Each metre adds 10 kPa, not 1 kPa: $\\rho g = 10^{4}$ Pa/m." },
        { answer: 3000, feedback: "Recheck: $1000 \\times 10 \\times 30 = 3\\times10^{5}$ Pa $= 300$ kPa, then add 100 kPa." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-3-q2",
      variant: "concept",
      question: "Three vessels with equal base areas are filled with water to the same height. One widens upwards, one is straight and one narrows upwards. Compare the pressures on their bases.",
      options: [
        { text: "Largest in the one that widens, because it holds the most water.", feedback: "The extra water is held up by the sloping walls. Pressure depends only on depth." },
        { text: "Largest in the one that narrows, because the water is squeezed.", feedback: "Water is not squeezed any harder. The narrowing walls push down, making up for the missing water above the base." },
        { text: "All equal.", correct: true, feedback: "$p = p_0 + \\rho g h$ with the same $h$ for all three. This is the hydrostatic paradox." },
      ],
      hint: "Use $p = p_0 + \\rho g h$ for the pressure at the base, and think about where the push of the sloping walls goes.",
    },
    {
      type: "quiz",
      id: "owt3-3-q3",
      variant: "practice",
      question: "In a hydraulic press the small piston has area 5 cm² and the large one 500 cm². A 100 N push on the small piston can support what load on the large one?",
      options: [
        { text: "$1$ N", feedback: "The force is multiplied, not divided, on the larger piston." },
        { text: "$1000$ N", feedback: "The area ratio is $500/5 = 100$, not 10. (A ratio of 10 would be the diameter ratio.)" },
        { text: "$10000$ N", correct: true, feedback: "Equal pressure: $F = 100 \\times 500/5 = 10^{4}$ N, the weight of about 1000 kg." },
      ],
      hint: "Pascal's law: the pressure is passed on equally to both pistons. Compare the areas, keeping both in the same units.",
    },
    {
      type: "numeric",
      id: "owt3-3-q4",
      variant: "practice",
      question: "A metal block weighs 50 N in air and 40 N when fully immersed in water. What is its density, in kg/m³?",
      answer: 5000,
      unit: "kg/m³",
      hint: "The loss of weight is the buoyant force, which gives the volume.",
      solution: "Buoyant force $= 50 - 40 = 10$ N $= \\rho_w V g$, so $V = 10^{-3}$ m³. Mass $= 5$ kg.\n\n$\\rho = 5/10^{-3} = 5000$ kg/m³. Shortcut: relative density $= \\dfrac{W_{\\text{air}}}{\\text{loss of weight}} = \\dfrac{50}{10} = 5$.",
      commonMistakes: [
        { answer: 1250, feedback: "That is $50/40$ times the water density. The ratio should use the *loss* of weight, 10 N." },
        { answer: 4000, feedback: "That uses the weight in water (40 N) over the loss. Use the true weight, 50 N." },
        { answer: 800, feedback: "A body less dense than water would float. This one sank, so its density must exceed 1000 kg/m³." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-3-q5",
      variant: "concept",
      question: "An ice cube floats in a glass filled to the brim with water. When the ice melts completely, what happens?",
      options: [
        { text: "Water overflows.", feedback: "The melted ice exactly fills the volume the ice was displacing." },
        { text: "The level drops.", feedback: "Ice is less dense than water, but the submerged part displaced exactly the weight of the whole cube." },
        { text: "The level stays the same and nothing overflows.", correct: true, feedback: "Floating ice displaces its own weight of water, which is exactly the water it becomes." },
      ],
      hint: "By Archimedes, floating ice displaces its own weight of water. Compare that volume with the volume of water the ice becomes when it melts.",
    },
    {
      type: "quiz",
      id: "owt3-3-q6",
      variant: "practice",
      question: "An open tank of water on a trolley accelerates horizontally at 2 m/s². What is $\\tan\\theta$ for the tilt of the water surface ($g = 10$ m/s²)?",
      options: [
        { text: "$0.2$, higher at the front", feedback: "The size is right, but the pseudo-force points opposite to the acceleration, so the water rises at the back." },
        { text: "$5$, higher at the back", feedback: "That is $g/a$. The surface is perpendicular to $\\vec g_{\\text{eff}}$, giving $\\tan\\theta = a/g$." },
        { text: "$0$: water stays level", feedback: "Only a non-accelerating (or freely falling) container keeps a level surface." },
        { text: "$0.2$, higher at the back", correct: true, feedback: "$\\tan\\theta = a/g = 0.2$; the backward pseudo-force piles water up at the rear." },
      ],
      hint: "In the trolley's frame add a pseudo-force $ma$ pointing backwards; the free surface sets itself perpendicular to the effective gravity.",
    },
    {
      type: "quiz",
      id: "owt3-3-q7",
      variant: "concept",
      multiple: true,
      question: "A wooden block floats at rest in a beaker of fresh water. Select every correct statement.",
      options: [
        { text: "The buoyant force on the block equals its weight.", correct: true, feedback: "It is in equilibrium, and a floating body displaces its own weight of fluid." },
        { text: "The fraction of the block under water equals $\\rho_{\\text{block}}/\\rho_{\\text{water}}$.", correct: true, feedback: "From $\\rho_{\\text{block}}Vg = \\rho_w V_{\\text{sub}}g$." },
        { text: "Moved to salt water (denser), the block floats with a smaller fraction submerged.", correct: true, feedback: "The fraction is $\\rho_{\\text{block}}/\\rho_{\\text{fluid}}$, which falls as the fluid gets denser." },
        { text: "If the beaker is in a lift accelerating upwards, a larger fraction of the block goes under.", feedback: "Effective gravity rises for the block *and* the water equally, so $g$ still cancels: the fraction submerged is unchanged." },
      ],
      hint: "Write the flotation condition and see which quantities cancel.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "fluid-flow-and-bernoulli",
  title: "3.4 · Continuity and Bernoulli's Equation",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Put your thumb over the end of a garden hose and the water shoots out much faster. Hold two sheets of paper a few centimetres apart and blow between them: instead of flying apart, they move *together*. Both effects come from two conservation laws you already trust, conservation of mass and conservation of energy, applied to a moving fluid.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Steady (streamline) flow",
      content:
        "Flow is **steady** or **streamline** when the velocity at each fixed point does not change with time. Every particle passing a given point follows the same path, called a **streamline**; streamlines never cross. At high speeds the flow becomes **turbulent**: irregular eddies, and our simple equations stop applying. We also assume the fluid is **incompressible** and **non-viscous** (ideal).",
    },
    { type: "heading", text: "The equation of continuity" },
    {
      type: "text",
      content:
        "**Continuity.** Follow a tube of flow that narrows from area $A_1$ to $A_2$. In time $dt$ a volume $A_1 v_1\\,dt$ enters and a volume $A_2 v_2\\,dt$ leaves. An incompressible fluid cannot pile up in between, so these are equal:",
    },
    { type: "math", latex: "A_1 v_1 = A_2 v_2 \\qquad (\\text{volume flow rate } Q = Av \\text{ is the same everywhere})" },
    {
      type: "text",
      content:
        "Narrow pipe, fast flow; wide pipe, slow flow. That is your thumb on the hose, and the reason a river speeds up where it runs through a gorge.",
    },
    { type: "heading", text: "Bernoulli from the work-energy theorem" },
    {
      type: "text",
      content:
        "Take the slug of fluid between two cross-sections of a streamline tube. In time $dt$ it moves on: a volume $\\Delta V = A_1v_1dt = A_2v_2dt$ of mass $\\Delta m = \\rho\\Delta V$ is effectively transferred from section 1 (speed $v_1$, height $h_1$, pressure $p_1$) to section 2. The fluid behind pushes it forwards and does work $p_1\\Delta V$; the fluid ahead pushes back and does work $-p_2\\Delta V$. Gravity does $-\\Delta m\\,g(h_2 - h_1)$. The work-energy theorem says total work = change in kinetic energy:",
    },
    {
      type: "math",
      latex: "(p_1 - p_2)\\Delta V - \\rho\\Delta V g(h_2 - h_1) = \\tfrac12\\rho\\Delta V(v_2^2 - v_1^2)",
    },
    { type: "text", content: "Cancel $\\Delta V$ and collect each section's terms on its own side:" },
    { type: "math", latex: "p_1 + \\tfrac12\\rho v_1^2 + \\rho g h_1 = p_2 + \\tfrac12\\rho v_2^2 + \\rho g h_2" },
    {
      type: "callout",
      variant: "definition",
      title: "Bernoulli's equation",
      content:
        "Along a streamline in steady, incompressible, non-viscous flow, $p + \\tfrac12\\rho v^2 + \\rho g h$ is constant.\nEach term is an energy per unit volume: pressure energy, kinetic energy and gravitational potential energy. For a fluid at rest it reduces to $p + \\rho g h = $ const, the hydrostatics of Lesson 3.3.",
    },
    {
      type: "text",
      content:
        "At equal height, faster flow means **lower pressure**. That explains the paper sheets (fast air between them, lower pressure there, so the outside air pushes them together), a roof lifted off in a storm (fast wind above, still air inside), the lift on an aeroplane wing (air travels faster over the curved top), and the swerve of a spinning ball (the side spinning with the air flow drags air faster past it).",
    },
    { type: "heading", text: "Torricelli's law" },
    {
      type: "text",
      content:
        "A wide open tank has a small hole at depth $x$ below the water surface. Apply Bernoulli from the surface (pressure $p_0$, speed ≈ 0 because the tank is wide) to the jet just outside the hole (pressure $p_0$, speed $v$):",
    },
    { type: "math", latex: "p_0 + 0 + \\rho g x = p_0 + \\tfrac12\\rho v^2 + 0 \\quad\\Longrightarrow\\quad v = \\sqrt{2gx}" },
    {
      type: "text",
      content:
        "The water leaves as fast as a stone dropped from the surface level. Now the range: if the tank's water column is $H$ tall and stands on the ground, the hole is at height $H - x$. The jet leaves horizontally, so it falls for $t = \\sqrt{2(H - x)/g}$ and travels",
    },
    { type: "math", latex: "R = v\\,t = \\sqrt{2gx}\\,\\sqrt{\\frac{2(H - x)}{g}} = 2\\sqrt{x(H - x)}" },
    {
      type: "text",
      content:
        "The graph below is this range for a tank with $H = 5$ m. Drag the point along the curve to move the hole deeper.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "2*sqrt(x*(5 - x))",
        exprLatex: "R(x) = 2\\sqrt{x(5 - x)}",
        window: { xmin: 0, xmax: 5, ymin: 0, ymax: 6 },
        initial: 1,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: zero range at the top (no speed) and at the bottom (no fall time), a maximum of $R = 5$ m exactly when the hole is at half depth, $x = 2.5$ m, and symmetry: holes at depths 1 m and 4 m both throw water 4 m. The product $x(H - x)$ is the same for $x$ and $H - x$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The venturimeter",
      content:
        "A pipe of area $A_1$ narrows to a throat of area $A_2$. A manometer measures the pressure drop $\\Delta p = p_1 - p_2$. Continuity gives $v_2 = v_1 A_1/A_2$, and Bernoulli at equal height gives $\\Delta p = \\tfrac12\\rho(v_2^2 - v_1^2)$. Two equations, one unknown $v_1$, so the flow rate $Q = A_1 v_1$ can be read off a pressure gauge.",
    },
    { type: "heading", text: "Hoses, venturis, roofs and draining tanks" },
    {
      type: "worked-example",
      id: "owt3-4-we1",
      title: "Worked example 1 (the hose)",
      problem:
        "Water flows at 2 m/s in a hose of cross-section 2 cm². The nozzle narrows to 0.5 cm². How fast does the water leave?",
      steps: [
        { text: "Continuity: $A_1v_1 = A_2v_2$. *Why this step:* the flow rate in must equal the flow rate out for an incompressible fluid." },
        { text: "$v_2 = 2 \\times 2/0.5 = 8$ m/s. Areas can stay in cm² because only their ratio enters." },
      ],
      answer: "$v_2 = 8$ m/s",
    },
    {
      type: "worked-example",
      id: "owt3-4-we2",
      title: "Worked example 2 (venturimeter)",
      problem:
        "Water flows through a pipe of area 20 cm² that narrows to 10 cm². The pressure drop at the throat is 6000 Pa. Find the flow rate.",
      steps: [
        { text: "Continuity: $v_2 = v_1 \\times 20/10 = 2v_1$." },
        { text: "Bernoulli at equal height: $6000 = \\tfrac12 \\times 1000 \\times (4v_1^2 - v_1^2) = 1500\\,v_1^2$. *Why this step:* the pressure drop pays for the extra kinetic energy per unit volume." },
        { text: "$v_1^2 = 4$, so $v_1 = 2$ m/s and $Q = A_1v_1 = 20\\times10^{-4} \\times 2 = 4\\times10^{-3}$ m³/s $= 4$ L/s." },
      ],
      answer: "$Q = 4\\times10^{-3}$ m³/s $= 4$ L/s",
    },
    {
      type: "worked-example",
      id: "owt3-4-we3",
      title: "Worked example 3 (a roof in a storm)",
      problem:
        "A 30 m/s wind blows over a flat roof of area 100 m². The air inside the house is still. Take $\\rho_{\\text{air}} = 1.2$ kg/m³. Find the net force on the roof.",
      steps: [
        { text: "Bernoulli across the roof (same height, ignore its thickness): $p_{\\text{in}} - p_{\\text{out}} = \\tfrac12\\rho v^2 = \\tfrac12 \\times 1.2 \\times 900 = 540$ Pa." },
        { text: "Net upward force $= 540 \\times 100 = 5.4\\times10^{4}$ N, the weight of about 5.4 tonnes. *Why this step:* a small pressure difference over a large area is a large force, which is why roofs must be tied down." },
      ],
      answer: "$5.4\\times10^4$ N upwards",
    },
    {
      type: "worked-example",
      id: "owt3-4-we4",
      title: "Worked example 4 (draining a tank, JEE Advanced)",
      problem:
        "A tank of cross-section $A = 1$ m² holds water to a height $H = 5$ m and drains through a hole of area $a = 1$ cm² at the bottom. How long does it take to empty?",
      steps: [
        { text: "When the water height is $h$, the jet speed is $\\sqrt{2gh}$, so the level falls at a rate given by continuity: $A\\,\\dfrac{dh}{dt} = -a\\sqrt{2gh}$. *Why this step:* the volume lost per second from the tank equals the volume leaving through the hole per second." },
        { text: "Separate and integrate from $h = H$ to $h = 0$:", latex: "\\int_H^0 \\frac{dh}{\\sqrt h} = -\\frac{a}{A}\\sqrt{2g}\\int_0^t dt \\quad\\Longrightarrow\\quad t = \\frac{A}{a}\\sqrt{\\frac{2H}{g}}" },
        { text: "Substitute: $t = \\dfrac{1}{10^{-4}}\\sqrt{\\dfrac{10}{10}} = 10^{4}$ s, about 2.8 hours." },
        { text: "A bonus from the same formula: falling from $H$ to $H/2$ takes $\\dfrac{A}{a}\\sqrt{\\dfrac2g}(\\sqrt H - \\sqrt{H/2})$, which is $1 - \\tfrac{1}{\\sqrt2} \\approx 29\\%$ of the total time. The first half of the water leaves quickly because the pressure driving it is highest." },
      ],
      answer: "$t = 10^4$ s, about 2.8 hours",
    },
    {
      type: "worked-example",
      id: "owt3-4-we5",
      title: "Worked example 5 (Torricelli)",
      problem:
        "Water stands 5 m above a small hole in the side of a tank. Find the efflux speed.",
      steps: [
        { text: "$v = \\sqrt{2gx} = \\sqrt{2 \\times 10 \\times 5} = 10$ m/s. *Why this step:* the depth of the hole below the free surface is what counts, not its height above the ground." },
      ],
      answer: "$v = 10$ m/s",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"faster fluid pushes harder on the walls\"",
      content:
        "Intuition says a fast stream should press hard. Bernoulli says the opposite: at the same height, where the fluid moves faster its (static) pressure is **lower**. The energy per unit volume is fixed, and more of it has gone into motion. A fast jet hits hard when it is *stopped* by a wall head-on; that is a momentum effect, not the static pressure the pipe walls feel.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "owt3-4-q1",
      variant: "practice",
      question: "Water flows through a pipe whose radius halves at a constriction. By what factor does the speed change?",
      options: [
        { text: "It doubles", feedback: "Continuity involves area, and area goes as $r^2$." },
        { text: "It becomes four times as large", correct: true, feedback: "$A \\propto r^2$ drops to a quarter, so $v = Q/A$ rises four-fold." },
        { text: "It halves", feedback: "Narrower pipes carry the same flow rate, so the speed must go up, not down." },
        { text: "It does not change", feedback: "The same volume per second must squeeze through a smaller area, so it must move faster." },
      ],
      hint: "The volume of water passing each cross-section per second is the same. How does the cross-sectional area depend on the radius?",
    },
    {
      type: "quiz",
      id: "owt3-4-q2",
      variant: "concept",
      question: "You blow a stream of air between two hanging sheets of paper. What happens and why?",
      options: [
        { text: "They move apart, because the air pushes them outwards.", feedback: "Tempting, but the moving air between them is at lower static pressure than the still air outside." },
        { text: "They move together, because the fast air between them is at lower pressure.", correct: true, feedback: "Bernoulli at equal height: faster flow, lower pressure, so the outside air pushes the sheets inwards." },
        { text: "Nothing, because air has negligible density.", feedback: "The density is small but so are the sheets; $\\tfrac12\\rho v^2$ is plenty to push such light, freely hanging sheets." },
      ],
      hint: "Apply Bernoulli's equation between the moving air between the sheets and the still air outside them.",
    },
    {
      type: "numeric",
      id: "owt3-4-q3",
      variant: "practice",
      question: "A small hole is 1.8 m below the water surface in a large open tank. What is the speed of efflux ($g = 10$ m/s²), in m/s?",
      answer: 6,
      unit: "m/s",
      hint: "Torricelli: Bernoulli from the free surface to the jet gives $v = \\sqrt{2gx}$.",
      solution: "$v = \\sqrt{2gx} = \\sqrt{2 \\times 10 \\times 1.8} = \\sqrt{36} = 6$ m/s.",
      commonMistakes: [
        { answer: 36, feedback: "That is $v^2$. Take the square root." },
        { answer: 4.24, tolerance: 0.05, feedback: "That is $\\sqrt{gh} = \\sqrt{18}$. Torricelli has a factor of 2: $v = \\sqrt{2gh}$." },
        { answer: 18, feedback: "That is $gh$, not $\\sqrt{2gh}$." },
      ],
    },
    {
      type: "numeric",
      id: "owt3-4-q4",
      variant: "practice",
      question: "Water flows along a horizontal pipe. At point 1 the speed is 1 m/s and the pressure 110 kPa; at point 2 the speed is 3 m/s. What is the pressure at point 2, in kPa?",
      answer: 106,
      unit: "kPa",
      hint: "Bernoulli at equal height: $p_1 + \\tfrac12\\rho v_1^2 = p_2 + \\tfrac12\\rho v_2^2$.",
      solution: "$p_2 = p_1 - \\tfrac12\\rho(v_2^2 - v_1^2) = 110\\,000 - 500 \\times (9 - 1) = 106\\,000$ Pa $= 106$ kPa.",
      commonMistakes: [
        { answer: 114, feedback: "Faster flow at the same height means lower pressure, not higher." },
        { answer: 105.5, feedback: "You used $v_2^2 = 9$ but forgot to subtract $v_1^2 = 1$." },
        { answer: 108, feedback: "You used $\\tfrac12\\rho(v_2 - v_1)^2$. Bernoulli uses the difference of squares, $v_2^2 - v_1^2 = 8$." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-4-q5",
      variant: "concept",
      question: "A tank stands on the ground with water to height $H$. Where should a small side hole be made so the jet lands farthest from the tank?",
      options: [
        { text: "Near the bottom, where the jet is fastest.", feedback: "The jet is fastest there, but it has almost no height to fall through, so it lands close to the tank." },
        { text: "At depth $H/2$ below the surface.", correct: true, feedback: "$R = 2\\sqrt{x(H - x)}$ is largest when $x = H - x$, giving $R_{\\max} = H$." },
        { text: "Near the top, where the fall is longest.", feedback: "The fall is longest there, but the jet barely moves: $v = \\sqrt{2gx}$ with $x \\approx 0$." },
      ],
      hint: "Get the jet speed from Torricelli's law and the fall time from the hole's height; the range is their product. Then maximise it over the depth of the hole.",
    },
    {
      type: "quiz",
      id: "owt3-4-q6",
      variant: "practice",
      multiple: true,
      question: "An ideal fluid flows steadily along a horizontal pipe that narrows from a wide section to a narrow one. Select every correct statement.",
      options: [
        { text: "The volume of fluid passing per second is the same in both sections.", correct: true, feedback: "Continuity: $A_1v_1 = A_2v_2$ for an incompressible fluid." },
        { text: "The fluid moves faster in the narrow section.", correct: true, feedback: "$v = Q/A$, so a smaller area means a larger speed." },
        { text: "The pressure is higher in the narrow section.", feedback: "At equal height, faster flow means *lower* pressure: $p + \\tfrac12\\rho v^2$ is fixed." },
        { text: "$p + \\tfrac12\\rho v^2$ has the same value in both sections.", correct: true, feedback: "That is Bernoulli's equation with $h_1 = h_2$." },
      ],
      hint: "Apply continuity first, then Bernoulli at equal height.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "viscosity-and-terminal-velocity",
  title: "3.5 · Viscosity, Stokes and Terminal Velocity",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Tip a jar of honey and a jar of water. Both are liquids, both flow, but honey takes its time. The difference is **viscosity**, fluid friction. Bernoulli's equation ignored it; now we put it back, and it explains why raindrops do not hit you at the speed of bullets.",
    },
    { type: "heading", text: "Viscosity as fluid friction" },
    {
      type: "text",
      content:
        "**The deck-of-cards picture.** Slide the top card of a deck and the cards below follow, each a little less. A liquid flowing over a fixed surface is the same: the layer touching the surface is at rest, and each layer higher up moves a little faster. Neighbouring layers drag on each other. Newton found that the drag force between layers is proportional to their area $A$ and to how fast the speed changes across the layers, the **velocity gradient** $dv/dy$:",
    },
    { type: "math", latex: "F = \\eta A \\frac{dv}{dy}" },
    {
      type: "callout",
      variant: "definition",
      title: "Coefficient of viscosity",
      content:
        "The constant $\\eta$ in $F = \\eta A\\,dv/dy$ is the **coefficient of viscosity**. SI unit: N·s/m² = Pa·s (also called the poiseuille). CGS unit: the poise, with $1\\ \\text{Pa·s} = 10$ poise.\nTypical values at room temperature: water $10^{-3}$ Pa·s, air $1.8\\times10^{-5}$ Pa·s, glycerine about $1.5$ Pa·s. Liquids get runnier when heated; gases get *more* viscous.",
    },
    { type: "heading", text: "Stokes's law from dimensions" },
    {
      type: "text",
      content:
        "A small sphere of radius $r$ moving slowly at speed $v$ through a fluid of viscosity $\\eta$ feels a drag $F$. Guess $F = k\\,\\eta^a r^b v^c$. With $[\\eta] = \\text{ML}^{-1}\\text{T}^{-1}$ and $[F] = \\text{MLT}^{-2}$:",
    },
    { type: "math", latex: "\\text{MLT}^{-2} = (\\text{ML}^{-1}\\text{T}^{-1})^a\\,\\text{L}^b\\,(\\text{LT}^{-1})^c \\;\\Rightarrow\\; a = 1,\\ -a + b + c = 1,\\ -a - c = -2 \\;\\Rightarrow\\; a = b = c = 1" },
    {
      type: "text",
      content:
        "So $F = k\\eta r v$. Dimensions cannot give the number $k$; a full solution of the flow round a sphere gives $k = 6\\pi$:",
    },
    { type: "math", latex: "F_{\\text{drag}} = 6\\pi\\eta r v \\qquad (\\text{Stokes's law, slow laminar flow})" },
    { type: "heading", text: "Terminal velocity" },
    {
      type: "text",
      content:
        "Drop a sphere (density $\\rho$) into a fluid (density $\\sigma$). Three forces act: weight $\\tfrac43\\pi r^3\\rho g$ down, buoyancy $\\tfrac43\\pi r^3\\sigma g$ up, and drag $6\\pi\\eta r v$ up. At first $v = 0$, so there is no drag and the sphere accelerates. As $v$ grows the drag grows, the net force shrinks, and the sphere approaches the speed at which the forces balance:",
    },
    { type: "math", latex: "\\tfrac43\\pi r^3(\\rho - \\sigma)g = 6\\pi\\eta r v_t \\quad\\Longrightarrow\\quad v_t = \\frac{2r^2(\\rho - \\sigma)g}{9\\eta}" },
    {
      type: "text",
      content:
        "Because the drag is proportional to $v$, the approach is exponential: $v(t) = v_t\\big(1 - e^{-t/\\tau}\\big)$. The graph below uses $v_t = 4$ m/s and $\\tau = 0.4$ s. Drag the point to $t = 0.4$ s.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "4*(1 - exp(-x/0.4))",
        exprLatex: "v(t) = 4\\big(1 - e^{-t/0.4}\\big)",
        window: { xmin: 0, xmax: 3, ymin: 0, ymax: 5 },
        initial: 0.4,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $t = \\tau = 0.4$ s the speed is $4(1 - e^{-1}) \\approx 2.53$ m/s, 63% of terminal. By $t = 5\\tau = 2$ s it is above 99%. The curve starts steeply with slope $g(1 - \\sigma/\\rho)$ and flattens towards $v_t = 4$ m/s without ever reaching it.",
    },
    { type: "heading", text: "Why small drops fall slowly" },
    {
      type: "text",
      content:
        "The size dependence is the headline: $v_t \\propto r^2$. The machine below gives the terminal speed of a water droplet falling through air ($\\eta = 1.8\\times10^{-5}$ Pa·s, air's buoyancy neglected), with the radius in micrometres and the speed in cm/s.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "2*(x/1000000)^2*1000*10/(9*0.000018)*100",
        exprLatex: "v_t = \\frac{2r^2\\rho g}{9\\eta}",
        min: 1,
        max: 50,
        step: 1,
        initial: 10,
        inputLabel: "Droplet radius r",
        outputLabel: "Terminal speed (cm/s)",
        inputUnit: "µm",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: a 10 µm cloud droplet settles at about 1.2 cm/s, slow enough that rising air keeps clouds aloft. Double the radius to 20 µm and the speed is about 4.9 cm/s, four times as much; at 50 µm it is about 31 cm/s. (For drops much bigger than about 0.1 mm the flow is no longer slow and smooth, and Stokes's law overestimates the speed.)",
    },
    {
      type: "callout",
      variant: "info",
      title: "Reynolds number (qualitative)",
      content:
        "Whether flow is smooth or turbulent is decided by the dimensionless **Reynolds number** $Re = \\dfrac{\\rho v D}{\\eta}$, the ratio of inertial effects to viscous effects. In a pipe, flow is typically streamline for $Re$ below about 2000 and turbulent above about 3000. Stokes's law and Bernoulli's smooth streamlines both belong to the low-$Re$ or ideal world.",
    },
    {
      type: "worked-example",
      id: "owt3-5-we1",
      title: "Worked example 1 (a plate on oil)",
      problem:
        "A flat plate of area 0.1 m² slides at 0.5 m/s over a 1 mm layer of oil ($\\eta = 0.2$ Pa·s) on a fixed surface. What force keeps it moving?",
      steps: [
        { text: "The oil at the bottom is at rest and the oil at the top moves with the plate, so the gradient is $dv/dy = 0.5/10^{-3} = 500$ s⁻¹. *Why this step:* in a thin layer the speed changes linearly from 0 to $v$." },
        { text: "$F = \\eta A\\,dv/dy = 0.2 \\times 0.1 \\times 500 = 10$ N." },
      ],
      answer: "$F = 10$ N",
    },
    {
      type: "worked-example",
      id: "owt3-5-we2",
      title: "Worked example 2 (raindrop)",
      problem:
        "Find the terminal speed of a water drop of radius 0.1 mm in air.",
      steps: [
        { text: "$v_t = \\dfrac{2r^2\\rho g}{9\\eta} = \\dfrac{2 \\times (10^{-4})^2 \\times 1000 \\times 10}{9 \\times 1.8\\times10^{-5}}$. *Why this step:* air's density (1.2 kg/m³) is negligible next to water's 1000, so $\\rho - \\sigma \\approx \\rho$." },
        { text: "Numerator $= 2\\times10^{-4}$; denominator $= 1.62\\times10^{-4}$. So $v_t \\approx 1.2$ m/s. Without air drag, a drop falling from a 2 km cloud would arrive at 200 m/s." },
      ],
      answer: "$v_t \\approx 1.2$ m/s",
    },
    {
      type: "worked-example",
      id: "owt3-5-we3",
      title: "Worked example 3 (eight drops merge)",
      problem:
        "Eight identical droplets, each falling at terminal speed 1.5 cm/s, coalesce into one drop. Find its terminal speed.",
      steps: [
        { text: "Volume is conserved: $8 \\times \\tfrac43\\pi r^3 = \\tfrac43\\pi R^3$, so $R = 2r$. *Why this step:* mass and density are unchanged, so volume is conserved, and volume goes as radius cubed." },
        { text: "$v_t \\propto r^2$, so the new speed is $2^2 = 4$ times the old: $6$ cm/s." },
      ],
      answer: "6 cm/s",
    },
    {
      type: "worked-example",
      id: "owt3-5-we4",
      title: "Worked example 4 (oil-drop style)",
      problem:
        "A tiny oil drop ($\\rho = 900$ kg/m³) falls through air at a steady 1.0 mm/s. Find its radius.",
      steps: [
        { text: "Rearrange: $r^2 = \\dfrac{9\\eta v_t}{2\\rho g} = \\dfrac{9 \\times 1.8\\times10^{-5} \\times 10^{-3}}{2 \\times 900 \\times 10} = \\dfrac{1.62\\times10^{-7}}{1.8\\times10^{4}} = 9\\times10^{-12}$ m². *Why this step:* the drop is too small to measure directly, but its steady speed is easy to time; this is how Millikan sized his drops." },
        { text: "$r = 3\\times10^{-6}$ m $= 3$ µm." },
      ],
      answer: "$r = 3$ µm",
    },
    {
      type: "worked-example",
      id: "owt3-5-we5",
      title: "Worked example 5 (steel ball in glycerine)",
      problem:
        "A steel ball ($\\rho = 8000$ kg/m³) of radius 1 mm falls through glycerine ($\\sigma = 1250$ kg/m³, $\\eta = 1.5$ Pa·s). Find its terminal speed.",
      steps: [
        { text: "$v_t = \\dfrac{2 \\times (10^{-3})^2 \\times (8000 - 1250) \\times 10}{9 \\times 1.5} = \\dfrac{2\\times10^{-6} \\times 67500}{13.5} = \\dfrac{0.135}{13.5} = 0.01$ m/s. *Why this step:* here buoyancy is not negligible, so the density difference must be used." },
        { text: "The ball settles at 1 cm/s, which is how viscosity is measured in the lab (the falling-ball viscometer)." },
      ],
      answer: "$v_t = 0.01$ m/s $= 1$ cm/s",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"heavier objects always fall faster in a fluid\"",
      content:
        "Terminal speed depends on $r^2(\\rho - \\sigma)$, not on mass alone. A large steel ball and a small one of the same steel differ in speed because of $r^2$, but a large hollow ball can be heavier than a small pebble and still fall more slowly, and a big air bubble in water has $\\rho < \\sigma$, so its 'terminal velocity' is negative: it rises, and larger bubbles rise faster.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "owt3-5-q1",
      variant: "concept",
      question: "Water has a viscosity of $10^{-3}$ Pa·s. What is this in poise?",
      options: [
        { text: "$10^{-2}$ poise", correct: true, feedback: "$1$ Pa·s $= 10$ poise, so $10^{-3}$ Pa·s $= 10^{-2}$ poise (one centipoise)." },
        { text: "$10^{-4}$ poise", feedback: "The conversion goes the other way: the poise is the *smaller* unit, so the number gets bigger." },
        { text: "$10^{-3}$ poise", feedback: "The units differ by a factor of 10: $1$ Pa·s $= 1$ kg/(m·s) $= 10$ g/(cm·s)." },
      ],
      hint: "The poise is the CGS unit. Write 1 Pa·s as N s/m², then convert newtons to dynes and m² to cm².",
    },
    {
      type: "quiz",
      id: "owt3-5-q2",
      variant: "practice",
      question: "A small sphere falls through oil at terminal speed $v$. A sphere of the same material with twice the radius falls through the same oil. What is its terminal speed?",
      options: [
        { text: "$2v$", feedback: "The drag grows as $r$ but the weight grows as $r^3$; the net result is $v_t \\propto r^2$." },
        { text: "$4v$", correct: true, feedback: "$v_t \\propto r^2$, so doubling $r$ gives $4v$." },
        { text: "$8v$", feedback: "That is the ratio of masses. Drag also grows with $r$, so divide by 2." },
        { text: "$v$", feedback: "In vacuum all objects fall together, but in a viscous fluid size matters." },
      ],
      hint: "In $v_t = \\dfrac{2r^2(\\rho - \\sigma)g}{9\\eta}$, which quantities change when only the radius changes?",
    },
    {
      type: "numeric",
      id: "owt3-5-q3",
      variant: "practice",
      question: "64 identical raindrops, each at terminal speed 2 cm/s, merge into one drop. Find the new terminal speed (Stokes regime), in cm/s.",
      answer: 32,
      unit: "cm/s",
      hint: "Volume is conserved, so find the new radius; then use $v_t \\propto r^2$.",
      solution: "$R^3 = 64r^3$, so $R = 4r$.\n\n$v_t \\propto r^2$, so the speed grows by $4^2 = 16$: $16 \\times 2 = 32$ cm/s.",
      commonMistakes: [
        { answer: 8, feedback: "That uses $R = 4r$ but $v \\propto r$. Terminal speed goes as $r^2$." },
        { answer: 128, feedback: "That uses $v \\propto$ mass. Use $v_t \\propto r^2$ with $R = 4r$." },
        { answer: 2, feedback: "Speed does depend on size: a bigger drop has more weight per unit drag." },
      ],
    },
    {
      type: "numeric",
      id: "owt3-5-q4",
      variant: "practice",
      question: "A plate of area 0.2 m² moves at 0.1 m/s over a 2 mm layer of liquid of viscosity 0.8 Pa·s. What viscous force opposes it, in newtons?",
      answer: 8,
      unit: "N",
      hint: "In a thin layer the velocity gradient is $v/d$; then $F = \\eta A\\,dv/dy$.",
      solution: "$\\dfrac{dv}{dy} = \\dfrac{0.1}{0.002} = 50$ s⁻¹.\n\n$F = \\eta A\\dfrac{dv}{dy} = 0.8 \\times 0.2 \\times 50 = 8$ N.",
      commonMistakes: [
        { answer: 0.016, feedback: "You left out the layer thickness. The velocity gradient is $v/d = 0.1/0.002 = 50$ s⁻¹, not $v$ itself." },
        { answer: 8000, feedback: "Check the thickness: 2 mm is 0.002 m, not 0.000002 m." },
        { answer: 80, feedback: "A factor of 10 slipped in: $0.8 \\times 0.2 = 0.16$, and $0.16 \\times 50 = 8$." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-5-q5",
      variant: "concept",
      question: "What does $v_t = \\frac{2r^2(\\rho - \\sigma)g}{9\\eta}$ predict for an air bubble in water?",
      options: [
        { text: "It sinks slowly, since $v_t$ is small.", feedback: "Look at the sign: $\\rho_{\\text{air}} < \\sigma_{\\text{water}}$ makes $v_t$ negative." },
        { text: "It rises at a steady speed, faster for bigger bubbles.", correct: true, feedback: "$\\rho - \\sigma < 0$ reverses the direction, and $r^2$ still sets the size of the speed." },
        { text: "It stays where it is, since air has almost no weight.", feedback: "Buoyancy, not weight, dominates: the bubble displaces water much heavier than itself." },
      ],
      hint: "Compare the densities of air and water: what is the sign of $\\rho - \\sigma$, and how does $v_t$ depend on $r$?",
    },
    {
      type: "quiz",
      id: "owt3-5-q6",
      variant: "concept",
      multiple: true,
      question: "A small steel ball is released from rest in a tall jar of glycerine (Stokes regime). Select every correct statement.",
      options: [
        { text: "Its acceleration is largest at the instant of release.", correct: true, feedback: "At $v = 0$ there is no drag yet; as $v$ grows the drag grows and the net force shrinks." },
        { text: "Once it reaches terminal speed, the net force on it is zero.", correct: true, feedback: "Weight is balanced by buoyancy plus drag, so it moves at constant speed." },
        { text: "Its terminal speed is proportional to the square of its radius.", correct: true, feedback: "$v_t = 2r^2(\\rho - \\sigma)g/9\\eta \\propto r^2$." },
        { text: "Doubling the viscosity of the liquid doubles the terminal speed.", feedback: "$v_t \\propto 1/\\eta$: a more viscous liquid halves the terminal speed." },
      ],
      hint: "Write the three forces and $v_t = \\dfrac{2r^2(\\rho - \\sigma)g}{9\\eta}$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "surface-tension",
  title: "3.6 · Surface Tension and Excess Pressure",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A steel needle, far denser than water, can rest on a water surface if you lower it gently. Pond skaters walk on water. Raindrops and soap bubbles are round. In each case the surface of the liquid behaves as if it were a stretched elastic skin. Nothing is stretched, though; the skin is made by the molecules themselves.",
    },
    { type: "heading", text: "The molecular picture" },
    {
      type: "text",
      content:
        "A molecule deep inside a liquid is pulled equally in all directions by its neighbours, so the net pull is zero. A molecule at the surface has neighbours only below and beside it, so it feels a net **inward** pull. To bring a molecule from the inside up to the surface you must do work against that pull. So a surface has extra energy, and the liquid, like any system, tends to minimise its energy by minimising its surface area. For a given volume the smallest surface is a sphere: hence round drops.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Surface tension",
      content:
        "**Surface tension** $T$ is the force per unit length acting along the surface, perpendicular to any line drawn in it: $T = F/L$, unit N/m.\nEquivalently it is the **surface energy**: the work needed to create one square metre of new surface at constant temperature, unit J/m². The two units are the same, since J/m² = N·m/m² = N/m.\nWater at 20 °C: $T \\approx 0.072$ N/m. Soap solution: $\\approx 0.03$ N/m. Mercury: $\\approx 0.47$ N/m.",
    },
    { type: "heading", text: "Force per length, energy per area" },
    {
      type: "text",
      content:
        "**Why force per length equals energy per area.** Stretch a soap film on a U-shaped wire frame with a sliding wire of length $\\ell$. The film has **two** surfaces (front and back), so it pulls the slider with $F = 2T\\ell$. Pull the slider out by $dx$: the work is $2T\\ell\\,dx$, and the new area is $2\\ell\\,dx$. Work per new area $= T$. The same number describes both.",
    },
    { type: "heading", text: "Excess pressure in drops and bubbles" },
    {
      type: "text",
      content:
        "**Excess pressure inside a drop.** Cut a liquid drop of radius $r$ in half and look at one hemisphere. Pressure inside is $p_i$, outside $p_o$. Push outwards: the pressure difference acts over the flat circle, $(p_i - p_o)\\pi r^2$. Pull back: surface tension acts along the rim of length $2\\pi r$, giving $T\\cdot 2\\pi r$. Balance:",
    },
    { type: "math", latex: "(p_i - p_o)\\,\\pi r^2 = T \\cdot 2\\pi r \\quad\\Longrightarrow\\quad \\Delta p = \\frac{2T}{r}" },
    {
      type: "table",
      headers: ["Object", "Surfaces", "Excess pressure"],
      rows: [
        ["Liquid drop in air", "one (outer)", "$2T/r$"],
        ["Air bubble inside a liquid", "one (inner)", "$2T/r$"],
        ["Soap bubble in air", "two (outer and inner film surfaces)", "$4T/r$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Count the surfaces",
      content:
        "Every formula in this lesson is 'one surface' times the number of liquid–air surfaces. A soap bubble is a thin film with air on both sides, so it has two: double the energy, double the excess pressure. An air bubble in water has only one: the water surrounding it.",
    },
    {
      type: "text",
      content:
        "The smaller the radius, the larger the excess pressure. Connect a small soap bubble to a large one through a tube and air flows from the small one into the large one: the small bubble collapses and the large one grows. Curvature, not size, sets the pressure.",
    },
    { type: "heading", text: "Blowing bubbles and merging droplets" },
    {
      type: "worked-example",
      id: "owt3-6-we1",
      title: "Worked example 1 (blowing a soap bubble)",
      problem:
        "How much work is needed to blow a soap bubble of radius 1 cm, with $T = 0.03$ N/m?",
      steps: [
        { text: "New area $= 2 \\times 4\\pi r^2$. *Why this step:* the soap film has an outer and an inner surface, both of which are new." },
        { text: "$W = T \\times 8\\pi r^2 = 0.03 \\times 8\\pi \\times 10^{-4} = 7.5\\times10^{-5}$ J." },
      ],
      answer: "$W = 7.5\\times10^{-5}$ J",
    },
    {
      type: "worked-example",
      id: "owt3-6-we2",
      title: "Worked example 2 (a small water drop)",
      problem:
        "Find the excess pressure inside a water drop of radius 1 mm ($T = 0.072$ N/m).",
      steps: [
        { text: "A drop has one surface, so $\\Delta p = 2T/r = 2 \\times 0.072/10^{-3} = 144$ Pa." },
        { text: "That is small compared with the atmosphere (about 0.14%), but for a 1 µm droplet it would be 144 kPa, more than an atmosphere. *Why this step:* $\\Delta p \\propto 1/r$, so tiny droplets are highly pressurised; this is why fine mists evaporate so readily." },
      ],
      answer: "$\\Delta p = 144$ Pa",
    },
    {
      type: "worked-example",
      id: "owt3-6-we3",
      title: "Worked example 3 (1000 droplets merge)",
      problem:
        "One thousand water droplets, each of radius 0.1 mm, coalesce into one drop. How much energy is released, and how much does the drop warm up? ($T = 0.072$ N/m, $c = 4200$ J/(kg·K).)",
      steps: [
        { text: "Volume conserved: $1000 \\times \\tfrac43\\pi r^3 = \\tfrac43\\pi R^3$, so $R = 10r = 1$ mm." },
        { text: "Area before: $1000 \\times 4\\pi r^2 = 4\\pi \\times 10^{-5}$ m². Area after: $4\\pi R^2 = 4\\pi \\times 10^{-6}$ m². *Why this step:* merging keeps the volume but loses surface, and lost surface releases its energy." },
        { text: "Energy released $= T \\times \\Delta A = 0.072 \\times 4\\pi \\times 9\\times10^{-6} \\approx 8.1\\times10^{-6}$ J." },
        { text: "Mass of the drop $= \\tfrac43\\pi (10^{-3})^3 \\times 1000 \\approx 4.19\\times10^{-6}$ kg, so $\\Delta\\theta = \\dfrac{8.1\\times10^{-6}}{4.19\\times10^{-6} \\times 4200} \\approx 4.6\\times10^{-4}$ K. Tiny, but real: coalescing drops warm up, and splitting a drop needs energy." },
      ],
      answer: "About $8.1\\times10^{-6}$ J released; the drop warms by about $4.6\\times10^{-4}$ K.",
    },
    {
      type: "worked-example",
      id: "owt3-6-we4",
      title: "Worked example 4 (a soap bubble's pressure)",
      problem:
        "Find the excess pressure inside a soap bubble of radius 2 cm with $T = 0.03$ N/m.",
      steps: [
        { text: "Two surfaces: $\\Delta p = 4T/r = 4 \\times 0.03/0.02 = 6$ Pa." },
        { text: "Compare the water drop above: the bubble is 20 times larger and has a weaker film, so its excess pressure is far smaller." },
      ],
      answer: "$\\Delta p = 6$ Pa",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a smaller bubble has less pressure inside\"",
      content:
        "Smaller radius means **more** excess pressure: $\\Delta p = 4T/r$. A small balloon is hard to start inflating for a similar reason. Joined by a tube, a small soap bubble empties itself into a larger one, which is the opposite of what 'pressure equalises by size' intuition predicts.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "owt3-6-q1",
      variant: "concept",
      question: "Which pair of units are both correct for surface tension?",
      options: [
        { text: "N/m² and J/m³", feedback: "Those are units of pressure and energy density." },
        { text: "N/m and J/m²", correct: true, feedback: "Force per length and energy per area are the same unit, since J = N·m." },
        { text: "N and J", feedback: "Surface tension is per unit length (or per unit area), not a total force or energy." },
      ],
      hint: "Recall the two ways 3.6 defines surface tension: as a force along a line, and as an energy stored in a surface.",
    },
    {
      type: "numeric",
      id: "owt3-6-q2",
      variant: "practice",
      question: "Find the excess pressure inside a water drop of radius 0.5 mm, with $T = 0.07$ N/m. Give your answer in Pa.",
      answer: 280,
      unit: "Pa",
      hint: "A drop has one liquid–air surface.",
      solution: "$\\Delta p = \\dfrac{2T}{r} = \\dfrac{2 \\times 0.07}{5\\times10^{-4}} = \\dfrac{0.14}{5\\times10^{-4}} = 280$ Pa.",
      commonMistakes: [
        { answer: 560, feedback: "That is $4T/r$, for a soap bubble. A drop has a single surface." },
        { answer: 140, feedback: "That is $T/r$. The hemisphere balance gives $2T/r$." },
        { answer: 0.28, feedback: "Convert 0.5 mm to $5\\times10^{-4}$ m, not $0.5$ m." },
      ],
    },
    {
      type: "numeric",
      id: "owt3-6-q3",
      variant: "practice",
      question: "How much work is needed to blow a soap bubble of radius 5 cm if $T = 0.04$ N/m? Give your answer in joules.",
      answer: 2.51e-3,
      relTolerance: 0.01,
      unit: "J",
      hint: "Work = $T$ × new area. How many surfaces does a soap film have?",
      solution: "The film has two surfaces, so the new area is $2 \\times 4\\pi r^2 = 8\\pi \\times 0.0025$ m².\n\n$W = T \\times 8\\pi r^2 = 0.04 \\times 8\\pi \\times 0.0025 = 8\\pi\\times10^{-4} \\approx 2.51\\times10^{-3}$ J.",
      commonMistakes: [
        { answer: 1.26e-3, feedback: "That counts one surface. A soap film has two." },
        { answer: 5.03e-3, feedback: "You counted four surfaces. There are two: inside and outside the film." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-6-q4",
      variant: "concept",
      question: "Two soap bubbles of radii 1 cm and 3 cm are connected by a thin tube with a valve. When the valve opens, what happens?",
      options: [
        { text: "Air flows from the larger bubble into the smaller one until they are equal.", feedback: "The larger bubble has the *lower* pressure ($4T/r$), so air flows the other way." },
        { text: "Air flows from the smaller bubble into the larger one, and the small bubble collapses.", correct: true, feedback: "The small bubble's excess pressure is three times the large one's, and it only grows as the bubble shrinks." },
        { text: "Nothing happens, since both contain air at atmospheric pressure.", feedback: "Both are *above* atmospheric, by $4T/r$, and that excess differs." },
      ],
      hint: "The excess pressure inside a soap bubble is $4T/r$. Which bubble has the higher pressure inside?",
    },
    {
      type: "quiz",
      id: "owt3-6-q5",
      variant: "practice",
      question: "27 identical droplets merge into one drop. What fraction of the original total surface energy is released?",
      options: [
        { text: "$\\tfrac13$", feedback: "That is the fraction that *remains*: $9/27$. The released part is the rest." },
        { text: "$\\tfrac23$", correct: true, feedback: "$R = 3r$, so the area goes from $27 \\cdot 4\\pi r^2$ to $9 \\cdot 4\\pi r^2$, losing $18/27 = 2/3$." },
        { text: "$\\tfrac89$", feedback: "That would need $R^2 = 3r^2$. With $R = 3r$, $R^2 = 9r^2$." },
        { text: "None: merging conserves volume, so energy is conserved.", feedback: "Volume is conserved, but surface area is not, and surface energy is $T$ times area." },
      ],
      hint: "Volume is conserved: find the radius of the big drop, then compare the total surface areas before and after.",
    },
    {
      type: "quiz",
      id: "owt3-6-q6",
      variant: "concept",
      multiple: true,
      question: "Select every correct statement about excess pressure due to surface tension $T$.",
      options: [
        { text: "Inside a soap bubble of radius $r$ in air, the excess pressure is $4T/r$.", correct: true, feedback: "The film has two surfaces, each contributing $2T/r$." },
        { text: "Inside an air bubble of radius $r$ just under the surface of water, the excess pressure is $2T/r$.", correct: true, feedback: "An air bubble in a liquid has only one liquid–air surface, the water around it." },
        { text: "Doubling the radius of a liquid drop doubles its excess pressure.", feedback: "$\\Delta p = 2T/r$ falls as $r$ grows: doubling $r$ halves it." },
        { text: "A larger soap bubble has a larger excess pressure than a smaller one.", feedback: "The opposite: the smaller bubble has the higher pressure, which is why it empties into the larger one." },
      ],
      hint: "Count the surfaces, and remember $\\Delta p \\propto 1/r$.",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "capillarity-and-contact-angle",
  title: "3.7 · Capillary Rise and Contact Angle",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Dip a thin glass tube into water and the water climbs up inside it, well above the level outside. Dip it into mercury and the mercury sinks below the outside level. Blotting paper soaks up ink, a lamp wick lifts oil, and soil water rises towards plant roots. All of these are **capillary action**: surface tension lifting (or pushing down) a column of liquid.",
    },
    { type: "heading", text: "Cohesion vs adhesion" },
    {
      type: "text",
      content:
        "Molecules of a liquid attract each other (cohesion) and also attract the molecules of a solid they touch (adhesion). Water molecules are attracted to glass more strongly than to each other, so water creeps up the glass and the surface curves up at the wall: a concave meniscus. Mercury atoms prefer each other, so mercury pulls away from glass: a convex meniscus.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Angle of contact",
      content:
        "The **angle of contact** $\\theta$ is the angle between the solid surface and the tangent to the liquid surface at the point of contact, measured **inside the liquid**.\n$\\theta < 90^\\circ$: the liquid wets the solid, meniscus concave, liquid rises (water–clean glass, $\\theta \\approx 0^\\circ$).\n$\\theta > 90^\\circ$: the liquid does not wet the solid, meniscus convex, liquid is depressed (mercury–glass, $\\theta \\approx 140^\\circ$).",
    },
    { type: "heading", text: "Deriving Jurin's law" },
    {
      type: "text",
      content:
        "**Jurin's law from a force balance.** In a tube of radius $r$ the liquid surface meets the wall along a circle of length $2\\pi r$. Surface tension pulls along the liquid surface, at angle $\\theta$ to the wall, so its vertical part is $T\\cos\\theta$ per unit length. That upward pull holds up the column of height $h$ (ignoring the small volume in the curved meniscus):",
    },
    { type: "math", latex: "2\\pi r\\,T\\cos\\theta = \\pi r^2 h\\,\\rho g \\quad\\Longrightarrow\\quad h = \\frac{2T\\cos\\theta}{r\\rho g}" },
    {
      type: "text",
      content:
        "**The same result from excess pressure.** The meniscus is (nearly) a piece of a sphere of radius $R = r/\\cos\\theta$. Just under a concave surface the pressure is $2T/R$ **below** atmospheric (Lesson 3.6). The liquid at the level of the outside surface is at atmospheric pressure, so the column must rise until its weight makes up the deficit: $\\rho g h = 2T/R = 2T\\cos\\theta/r$. Two routes, one law.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Jurin's law",
      content:
        "The capillary rise in a tube of radius $r$ is $h = \\dfrac{2T\\cos\\theta}{r\\rho g}$. Equivalently $hR = \\dfrac{2T}{\\rho g}$ is constant, where $R$ is the meniscus radius.\n$h \\propto 1/r$: halve the radius and the rise doubles. For $\\theta > 90^\\circ$, $\\cos\\theta < 0$ and $h$ is negative: a depression.",
    },
    { type: "heading", text: "Rise, depression and short tubes" },
    {
      type: "worked-example",
      id: "owt3-7-we1",
      title: "Worked example 1 (rise in a fine tube)",
      problem:
        "Water ($T = 0.072$ N/m, $\\theta = 0$) rises in a glass tube of radius 0.2 mm. Find the height.",
      steps: [
        { text: "$h = \\dfrac{2T}{r\\rho g} = \\dfrac{2 \\times 0.072}{2\\times10^{-4} \\times 1000 \\times 10} = \\dfrac{0.144}{2} = 0.072$ m $= 7.2$ cm. *Why this step:* with $\\theta = 0$ the full surface tension acts upwards, so $\\cos\\theta = 1$." },
      ],
      answer: "$h = 7.2$ cm",
    },
    {
      type: "worked-example",
      id: "owt3-7-we2",
      title: "Worked example 2 (mercury depression)",
      problem:
        "A glass tube of radius 1 mm is dipped in mercury ($T = 0.47$ N/m, $\\theta = 140^\\circ$, $\\cos 140^\\circ \\approx -0.766$, $\\rho = 13600$ kg/m³). Find the height of the mercury in the tube relative to the outside level.",
      steps: [
        { text: "$h = \\dfrac{2 \\times 0.47 \\times (-0.766)}{10^{-3} \\times 13600 \\times 10} = \\dfrac{-0.720}{136} \\approx -5.3\\times10^{-3}$ m." },
        { text: "The mercury stands about 5.3 mm **below** the outside level. *Why this step:* the negative sign is not an error to be dropped; it is the physics of a non-wetting liquid." },
      ],
      answer: "About 5.3 mm below the outside level",
    },
    {
      type: "worked-example",
      id: "owt3-7-we3",
      title: "Worked example 3 (two tubes)",
      problem:
        "Tubes of radius 0.2 mm and 0.4 mm stand side by side in the same water. Find the rise in each and the difference between their levels.",
      steps: [
        { text: "$h \\propto 1/r$: the narrow tube gives 7.2 cm (Example 1), the wide one 3.6 cm." },
        { text: "The levels differ by 3.6 cm. *Why this step:* ratios avoid recomputing the whole formula." },
      ],
      answer: "7.2 cm and 3.6 cm; the levels differ by 3.6 cm",
    },
    {
      type: "worked-example",
      id: "owt3-7-we4",
      title: "Worked example 4 (capillary in a lift, JEE)",
      problem:
        "The tube of Example 1 is in a lift accelerating upwards at 2.5 m/s². Find the height of the water column now.",
      steps: [
        { text: "In the lift's frame, effective gravity is $g + a = 12.5$ m/s². *Why this step:* the column's 'weight' is set by the effective gravity, while $T$ is unchanged." },
        { text: "$h' = h \\times \\dfrac{g}{g + a} = 7.2 \\times \\dfrac{10}{12.5} = 5.76$ cm." },
        { text: "In free fall $g_{\\text{eff}} = 0$, and the water would climb to the top of the tube, however long." },
      ],
      answer: "$h' = 5.76$ cm",
    },
    {
      type: "worked-example",
      id: "owt3-7-we5",
      title: "Worked example 5 (a tube that is too short)",
      problem:
        "The 0.2 mm tube of Example 1 sticks only 5 cm out of the water, less than the 7.2 cm it 'wants'. Does water spill out? If not, find the radius of curvature of the meniscus and the new contact angle.",
      steps: [
        { text: "The water rises to the top and stops. The meniscus flattens so that $hR$ stays at $2T/\\rho g$: $R' = \\dfrac{2T}{\\rho g h'} = \\dfrac{0.144}{10^{4} \\times 0.05} = 2.88\\times10^{-4}$ m. *Why this step:* the pressure deficit under the meniscus only needs to hold up 5 cm, so the surface can be less curved." },
        { text: "The new contact angle satisfies $\\cos\\theta' = r/R' = 0.2/0.288 \\approx 0.69$, so $\\theta' \\approx 46^\\circ$. No water spills." },
      ],
      answer: "No spill: $R' \\approx 2.88\\times10^{-4}$ m, $\\theta' \\approx 46^\\circ$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"if the tube is shorter than the capillary rise, water spills out like a fountain\"",
      content:
        "A capillary is not a pump. When the water reaches the top, the meniscus radius simply increases until $hR = 2T/\\rho g$ holds with the available $h$. If capillary tubes could overflow, you could build a perpetual fountain; energy conservation forbids it.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Detergents, wicks and soil",
      content:
        "Detergents lower the surface tension of water and reduce its contact angle with greasy fabric, so water can soak into the fine gaps between fibres and lift the dirt out. A lamp wick and a cloth towel are bundles of capillaries. Loose soil lets water rise from below; farmers plough the surface to break these capillaries and keep moisture in.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "owt3-7-q1",
      variant: "practice",
      question: "How high does water ($T = 0.07$ N/m, $\\theta = 0$) rise in a glass capillary of radius 0.1 mm ($g = 10$ m/s²)? Give your answer in cm.",
      answer: 14,
      unit: "cm",
      hint: "Jurin's law: $h = \\dfrac{2T\\cos\\theta}{r\\rho g}$, all in SI units.",
      solution: "$h = \\dfrac{2T\\cos\\theta}{r\\rho g} = \\dfrac{2 \\times 0.07 \\times 1}{10^{-4} \\times 1000 \\times 10} = \\dfrac{0.14}{1} = 0.14$ m $= 14$ cm.",
      commonMistakes: [
        { answer: 7, feedback: "That drops the factor 2 in $2T\\cos\\theta$. The rim force is $2\\pi rT$ and the column's cross-section is $\\pi r^2$." },
        { answer: 28, feedback: "That would be for radius 0.05 mm. You may have treated 0.1 mm as the diameter." },
        { answer: 1.4, feedback: "Check the powers of ten: $r\\rho g = 10^{-4} \\times 10^{3} \\times 10 = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-7-q2",
      variant: "concept",
      question: "Why does mercury fall below the outside level in a glass capillary?",
      options: [
        { text: "Mercury is too dense for surface tension to lift.", feedback: "Density makes the rise smaller, but it cannot change its sign. The sign comes from $\\cos\\theta$." },
        { text: "Its contact angle with glass is obtuse, so $\\cos\\theta < 0$.", correct: true, feedback: "Cohesion beats adhesion, the meniscus is convex, and the surface tension pulls the column down." },
        { text: "Mercury has zero surface tension.", feedback: "Mercury has a very large surface tension, about 0.47 N/m." },
      ],
      hint: "Capillary rise is $h = \\dfrac{2T\\cos\\theta}{r\\rho g}$. What is the contact angle of mercury on glass?",
    },
    {
      type: "quiz",
      id: "owt3-7-q3",
      variant: "practice",
      question: "Water rises 3 cm in a capillary. How high does it rise in a tube of half the radius, all else equal?",
      options: [
        { text: "$1.5$ cm", feedback: "The rise is *inversely* proportional to the radius." },
        { text: "$6$ cm", correct: true, feedback: "$h \\propto 1/r$, so halving $r$ doubles $h$." },
        { text: "$12$ cm", feedback: "That uses $1/r^2$. The rim force goes as $r$ and the weight as $r^2$, so $h \\propto 1/r$." },
      ],
      hint: "Recall Jurin's law from 3.7: how does the rise depend on the radius of the tube?",
    },
    {
      type: "quiz",
      id: "owt3-7-q4",
      variant: "practice",
      question: "A capillary shows a rise $h$ on the ground. In a lift accelerating **upwards** at $g/2$, the rise is",
      options: [
        { text: "$2h$", feedback: "That would be a lift accelerating *downwards* at $g/2$, where $g_{\\text{eff}} = g/2$." },
        { text: "$\\tfrac{3h}{2}$", feedback: "Upward acceleration increases $g_{\\text{eff}}$, which shortens the column." },
        { text: "$\\tfrac{2h}{3}$", correct: true, feedback: "$g_{\\text{eff}} = \\tfrac32 g$, and $h \\propto 1/g_{\\text{eff}}$." },
        { text: "$h$", feedback: "Surface tension is unchanged, but the column's effective weight changes with acceleration." },
      ],
      hint: "In the lift, replace $g$ by the effective gravity $g_{\\text{eff}}$ in $h = \\dfrac{2T\\cos\\theta}{r\\rho g}$.",
    },
    {
      type: "quiz",
      id: "owt3-7-q5",
      variant: "concept",
      question: "Water would rise 8 cm in a certain capillary, but the tube only extends 5 cm above the surface. What happens?",
      options: [
        { text: "Water flows out of the top continuously.", feedback: "That would be a perpetual fountain, which energy conservation rules out." },
        { text: "Water reaches the top and the meniscus becomes flatter (larger radius of curvature).", correct: true, feedback: "$hR$ stays equal to $2T/\\rho g$, so a smaller $h$ means a larger $R$." },
        { text: "Water stops about 3 cm up, well short of the top, because the tube is short.", feedback: "The water does reach the top; only the curvature of the meniscus adjusts." },
      ],
      hint: "Jurin's law fixes $hR$ = const, where $R$ is the radius of the meniscus. If the tube caps $h$, what has to adjust?",
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
        "No formula sheet. Every question below can be rebuilt from force balance on a small piece of material or fluid, plus conservation of mass and energy. Take $g = 10$ m/s² throughout.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 3 in 8 lines",
      content:
        "1. Stress $= F/A$, strain $= $ fractional change; Hooke: stress ∝ strain up to the proportional limit.\n2. $Y = \\frac{F/A}{\\Delta L/L}$ gives $\\Delta L = FL/AY$; $B = -\\Delta p/(\\Delta V/V)$; $G = (F/A)/\\theta$.\n3. Elastic energy $= \\tfrac12 F\\Delta L$, density $\\tfrac12\\sigma\\varepsilon$; a wire under its own weight stretches $\\rho gL^2/2Y$.\n4. $p = p_0 + \\rho gh$; Pascal transmits $\\Delta p$ undiminished; buoyancy $= \\rho_f V_{\\text{sub}} g$.\n5. $Av$ = const; $p + \\tfrac12\\rho v^2 + \\rho gh$ = const; efflux $\\sqrt{2gh}$.\n6. $F = \\eta A\\,dv/dy$; Stokes $6\\pi\\eta rv$; $v_t = 2r^2(\\rho - \\sigma)g/9\\eta \\propto r^2$.\n7. Surface tension = energy per area; excess pressure $2T/r$ per surface ($4T/r$ for a soap bubble).\n8. Capillary rise $h = 2T\\cos\\theta/(r\\rho g)$, with $hR$ fixed.",
    },
    {
      type: "numeric",
      id: "owt3-8-q1",
      variant: "mastery",
      question: "A 1 m steel wire ($Y = 2\\times10^{11}$ Pa) is joined end to end with a 1 m copper wire ($Y = 1\\times10^{11}$ Pa), both of cross-section 1 mm². The composite wire hangs vertically and carries 200 N at the bottom. Find the total extension in mm (ignore the wires' weight).",
      answer: 3,
      unit: "mm",
      hint: "End to end, each wire carries the full load; the extensions add.",
      solution: "Steel: $\\Delta L = \\dfrac{FL}{AY} = \\dfrac{200 \\times 1}{10^{-6} \\times 2\\times10^{11}} = 10^{-3}$ m $= 1$ mm.\n\nCopper has half the modulus: 2 mm.\n\nTotal: $1 + 2 = 3$ mm.",
      commonMistakes: [
        { answer: 1, feedback: "That is only the steel wire's share. The copper wire carries the same 200 N and stretches too." },
        { answer: 2, feedback: "That is only the copper wire's share. In series the extensions add." },
        { answer: 0.67, tolerance: 0.01, feedback: "That treats the wires as side by side (parallel). End to end they each carry the full load." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-8-q2",
      variant: "mastery",
      question: "A wire stretches by 2 mm when a 400 N load is applied gradually. How much elastic energy is stored in it?",
      options: [
        { text: "$0.8$ J", feedback: "That is $F\\Delta L$, the work gravity would do if the load were dropped. The wire stores only the triangle under the $F$–$\\Delta L$ line." },
        { text: "$400$ J", feedback: "Convert 2 mm to 0.002 m, and remember the factor $\\tfrac12$." },
        { text: "$0.2$ J", feedback: "You halved twice. $\\tfrac12 \\times 400 \\times 0.002 = 0.4$ J." },
        { text: "$0.4$ J", correct: true, feedback: "$U = \\tfrac12 F\\Delta L = \\tfrac12 \\times 400 \\times 0.002 = 0.4$ J." },
      ],
      hint: "Elastic energy stored in a stretched wire (3.2): the load is applied gradually.",
    },
    {
      type: "numeric",
      id: "owt3-8-q3",
      variant: "mastery",
      question: "A sealed flexible bag holds 1 L of water and is lowered 1100 m into the sea (take $\\rho = 1000$ kg/m³, $B_{\\text{water}} = 2.2\\times10^{9}$ Pa). By how much does the water's volume decrease? Give your answer in mL.",
      answer: 5,
      unit: "mL",
      hint: "Only the extra pressure $\\rho g h$ squeezes the water; then $\\Delta V/V = \\Delta p/B$.",
      solution: "$\\Delta p = \\rho g h = 10^{3} \\times 10 \\times 1100 = 1.1\\times10^{7}$ Pa.\n\n$\\dfrac{\\Delta V}{V} = \\dfrac{\\Delta p}{B} = \\dfrac{1.1\\times10^{7}}{2.2\\times10^{9}} = 5\\times10^{-3}$.\n\n$\\Delta V = 5\\times10^{-3} \\times 1000$ mL $= 5$ mL.",
      commonMistakes: [
        { answer: 0.5, feedback: "Recheck: $1.1\\times10^{7}/2.2\\times10^{9} = 5\\times10^{-3}$, which is 0.5%, i.e. 5 mL of 1000 mL." },
        { answer: 50, feedback: "A factor of 10 too big: $\\rho g h = 1.1\\times10^{7}$ Pa, not $1.1\\times10^{8}$." },
        { answer: 0, feedback: "'Incompressible' is an approximation for everyday pressures. At 110 atmospheres the 0.5% change is measurable." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-8-q4",
      variant: "mastery",
      question: "A diver is 15 m below the surface of a lake. With $p_0 = 100$ kPa, what does a gauge on her suit read?",
      options: [
        { text: "$250$ kPa", feedback: "That is the absolute pressure. A gauge reads the excess over atmospheric." },
        { text: "$150$ kPa", correct: true, feedback: "Gauge pressure $= \\rho g h = 1000 \\times 10 \\times 15 = 1.5\\times10^{5}$ Pa." },
        { text: "$115$ kPa", feedback: "Each metre of water adds 10 kPa, not 1 kPa." },
        { text: "$100$ kPa", feedback: "That is just the atmosphere, which a gauge subtracts out." },
      ],
      hint: "Hydrostatic pressure (3.3): does a pressure gauge count atmospheric pressure?",
    },
    {
      type: "numeric",
      id: "owt3-8-q5",
      variant: "mastery",
      question: "A hydraulic jack has pistons of **diameters** 2 cm and 20 cm. What force on the small piston, in newtons, lifts a 2000 kg load on the large one?",
      answer: 200,
      unit: "N",
      hint: "Equal pressure on both pistons: forces scale with the *area* ratio.",
      solution: "Weight $= 2000 \\times 10 = 2\\times10^{4}$ N.\n\nArea ratio $= (20/2)^2 = 100$, so $f = \\dfrac{2\\times10^{4}}{100} = 200$ N.",
      commonMistakes: [
        { answer: 2000, feedback: "That divides by the diameter ratio, 10. Forces scale with the area ratio, $10^2 = 100$." },
        { answer: 20, feedback: "That uses an area ratio of 1000. Areas go as diameter squared: $(20/2)^2 = 100$." },
        { answer: 2e6, feedback: "The small piston needs a *smaller* force, not a larger one." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-8-q6",
      variant: "mastery",
      question: "A wooden block floats in water with 60% of its volume submerged. What fraction would be submerged in oil of density 800 kg/m³?",
      options: [
        { text: "$48\\%$", feedback: "That multiplies by 0.8. A less dense liquid gives less buoyancy per volume, so *more* must be submerged." },
        { text: "$75\\%$", correct: true, feedback: "The block's density is 600 kg/m³, and $600/800 = 0.75$." },
        { text: "$60\\%$", feedback: "The fraction submerged is $\\rho_{\\text{body}}/\\rho_{\\text{fluid}}$, which changes with the fluid." },
        { text: "It sinks", feedback: "The block (600 kg/m³) is still less dense than the oil (800 kg/m³), so it floats." },
      ],
      hint: "Floating bodies (3.3): the weight equals the weight of liquid displaced.",
    },
    {
      type: "quiz",
      id: "owt3-8-q7",
      variant: "mastery",
      question: "Water flows at 2 m/s through a horizontal pipe of cross-section 40 cm², which narrows to 10 cm². What is the pressure difference between the wide and narrow sections?",
      options: [
        { text: "$30$ kPa, higher in the narrow section", feedback: "The size is right but the direction is reversed: faster flow means lower pressure." },
        { text: "$18$ kPa", feedback: "That uses $\\tfrac12\\rho(v_2 - v_1)^2 = 500 \\times 36$. Bernoulli uses $v_2^2 - v_1^2$." },
        { text: "$60$ kPa", feedback: "You left out the $\\tfrac12$ in $\\tfrac12\\rho v^2$: $1000 \\times 60 = 60$ kPa is twice the answer." },
        { text: "$30$ kPa, higher in the wide section", correct: true, feedback: "$v_2 = 8$ m/s; $\\Delta p = \\tfrac12 \\times 1000 \\times (64 - 4) = 3\\times10^{4}$ Pa, and the slower wide section has the higher pressure." },
      ],
      hint: "Continuity, then Bernoulli's equation (3.4).",
    },
    {
      type: "numeric",
      id: "owt3-8-q8",
      variant: "mastery",
      question: "A tank on the ground holds water to a height of 8 m. A small hole is made 2 m below the water surface. How far from the tank does the jet land? Give your answer in metres, to two decimal places.",
      answer: 6.93,
      relTolerance: 0.01,
      unit: "m",
      hint: "Efflux speed from the depth below the surface; fall time from the height above the ground.",
      solution: "$v = \\sqrt{2gx}$ with $x = 2$ m; the jet falls $H - x = 6$ m in $t = \\sqrt{2(H - x)/g}$.\n\n$R = vt = 2\\sqrt{x(H - x)} = 2\\sqrt{2 \\times 6} = 4\\sqrt3 \\approx 6.93$ m.",
      commonMistakes: [
        { answer: 8, feedback: "That is the maximum range, for a hole at half depth (4 m). This hole is at 2 m." },
        { answer: 3.46, tolerance: 0.02, feedback: "You dropped the factor 2: $v = \\sqrt{2gx}$ and $t = \\sqrt{2(H-x)/g}$ multiply to $2\\sqrt{x(H - x)}$." },
        { answer: 4, feedback: "That uses $x(H - x)$ with $H - x = 2$ as well. The fall height is $8 - 2 = 6$ m." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-8-q9",
      variant: "mastery",
      question: "A tiny droplet falls through air at a terminal speed of 2 cm/s. 27 such droplets merge into one. What is the new terminal speed?",
      options: [
        { text: "$6$ cm/s", feedback: "That uses $v_t \\propto r$. Weight ∝ $r^3$ and drag ∝ $r$, so $v_t \\propto r^2$." },
        { text: "$18$ cm/s", correct: true, feedback: "$R = 3r$ (volume ×27), and $v_t \\propto r^2$ gives $9 \\times 2 = 18$ cm/s." },
        { text: "$54$ cm/s", feedback: "That uses $v_t \\propto$ mass. The drag also grows, with $r$." },
        { text: "$2$ cm/s", feedback: "Terminal speed depends on size in a viscous medium." },
      ],
      hint: "Terminal velocity (3.5), with volume conserved when the droplets merge.",
    },
    {
      type: "quiz",
      id: "owt3-8-q10",
      variant: "mastery",
      question: "Water ($T = 0.07$ N/m, contact angle 0) is drawn into a capillary tube of internal **radius** 0.5 mm. How high does it rise?",
      options: [
        { text: "$5.6$ cm", feedback: "That treats 0.5 mm as the diameter (radius 0.25 mm)." },
        { text: "$1.4$ cm", feedback: "You left out the 2 in $2T\\cos\\theta$." },
        { text: "$28$ cm", feedback: "A factor of 10 slipped in: $r\\rho g = 5\\times10^{-4} \\times 10^{4} = 5$." },
        { text: "$2.8$ cm", correct: true, feedback: "$h = \\frac{2 \\times 0.07}{5\\times10^{-4} \\times 1000 \\times 10} = \\frac{0.14}{5} = 0.028$ m." },
      ],
      hint: "Capillary rise and Jurin's law (3.7).",
    },
    {
      type: "numeric",
      id: "owt3-8-q11",
      variant: "mastery",
      question: "A tall open tank 4 m long holds water 1 m deep. It accelerates horizontally at 2.5 m/s² without spilling. What is the gauge pressure at the bottom of the **rear** wall, in kPa?",
      answer: 15,
      unit: "kPa",
      hint: "Find the tilt, use volume conservation to find the new depth at the rear, then use $\\rho g h$ vertically.",
      solution: "$\\tan\\theta = a/g = 2.5/10 = 0.25$, so across 4 m the surface rises by 1 m from front to back.\n\nVolume is conserved, so the surface pivots about the middle: the rear is 0.5 m above the rest level, a depth of 1.5 m.\n\nVertically, $p = \\rho g h = 1000 \\times 10 \\times 1.5 = 15$ kPa.",
      commonMistakes: [
        { answer: 10, feedback: "That is the pressure at rest. The water surface tilts, so the rear wall now has more water above it." },
        { answer: 20, feedback: "The 1 m rise is shared: the surface pivots about the tank's middle (volume is conserved), so the rear gains only 0.5 m." },
        { answer: 10.3, tolerance: 0.05, feedback: "That uses $g_{\\text{eff}} = \\sqrt{g^2 + a^2}$ with the rest depth. Vertically, pressure still grows at $\\rho g$ per metre; what changes is the depth." },
      ],
    },
    {
      type: "quiz",
      id: "owt3-8-q12",
      variant: "mastery",
      question: "Two soap bubbles of radii 2 cm and 3 cm touch and share a common film. What is the radius of curvature of the common film, and which way does it bulge?",
      options: [
        { text: "$6$ cm, bulging into the smaller bubble", feedback: "The radius is right, but the smaller bubble has the *higher* pressure, so the film bows away from it." },
        { text: "$1.2$ cm", feedback: "That is $\\frac{r_1r_2}{r_1 + r_2}$. The film sees the *difference* of the two excess pressures, so the denominator is $r_2 - r_1$." },
        { text: "$6$ cm, bulging into the larger bubble", correct: true, feedback: "$\\frac{4T}{r} = \\frac{4T}{r_1} - \\frac{4T}{r_2}$ gives $r = \\frac{r_1r_2}{r_2 - r_1} = \\frac{6}{1} = 6$ cm; the smaller bubble has the higher pressure, so it pushes the film into the larger one." },
        { text: "The film is flat", feedback: "It would be flat only if the bubbles were equal. Here their pressures differ." },
      ],
      hint: "The pressure difference across the common film is the difference of the two bubbles' excess pressures.",
    },
    {
      type: "quiz",
      id: "owt3-8-q13",
      variant: "mastery",
      multiple: true,
      question: "Water rises to height $h$ in a clean glass capillary of radius $r$ standing in a beaker on the ground. Select every correct statement.",
      options: [
        { text: "In a capillary of radius $2r$ in the same water, the rise is $h/2$.", correct: true, feedback: "Jurin's law: $h = 2T\\cos\\theta/(r\\rho g) \\propto 1/r$." },
        { text: "If the whole set-up is in free fall, the water climbs to the top of the tube.", correct: true, feedback: "$g_{\\text{eff}} = 0$, so nothing limits the rise: $h \\propto 1/g_{\\text{eff}}$." },
        { text: "If the tube sticks out less than $h$ above the water, water overflows from its top.", feedback: "The water reaches the top and the meniscus flattens so that $hR = 2T/\\rho g$ still holds. A capillary is not a pump." },
        { text: "Mercury, with its larger surface tension, would rise higher than $h$ in the same tube.", feedback: "Mercury's contact angle with glass is obtuse, so $\\cos\\theta < 0$: it is depressed below the outside level." },
      ],
      hint: "Use $h = \\dfrac{2T\\cos\\theta}{r\\rho g}$ and think about each factor.",
    },
  ]),
};

export const owtChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
