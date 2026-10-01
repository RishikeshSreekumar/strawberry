import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Optics and Modern Physics Chapter 5 — Semiconductor Electronics.
 * Energy bands and the band gap, doping and the mass action law, the p-n
 * junction and its I–V curve, rectifiers, the Zener regulator and the
 * optoelectronic junctions (LED, photodiode, solar cell), the transistor as
 * switch and amplifier, and logic gates built from it.
 * Constants: hc = 1240 eV·nm, e = 1.6×10⁻¹⁹ C.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "energy-bands",
  title: "5.1 · Energy Bands: Conductors, Insulators, Semiconductors",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Heat a copper wire and its resistance goes up. Heat a piece of silicon and its resistance goes *down*, sharply: a few tens of degrees can halve it. Ohm's-law thinking says hotter means more jiggling atoms and more collisions, so every material should get worse. Silicon disagrees, and the reason is quantum: in silicon, heat does not just shake the carriers, it *creates* them.",
    },
    {
      type: "text",
      content:
        "**From levels to bands.** An isolated silicon atom has sharp energy levels, like Bohr's hydrogen ladder (Chapter 4). Bring two atoms close and each level splits into two slightly different levels, because the electrons of one atom feel the other. Bring $N \\approx 10^{23}$ atoms together into a crystal and each level splits into $N$ levels packed so closely that they form a continuous **band**. Between bands there may be energy ranges that no electron in the crystal can have: **band gaps**.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Valence band, conduction band, band gap",
      content:
        "**Valence band:** the highest band that is (at absolute zero) completely filled with electrons.\n**Conduction band:** the band above it, empty at absolute zero.\n**Band gap** $E_g$: the energy separation between the top of the valence band and the bottom of the conduction band.\nA full band cannot carry current (every electron's motion is balanced by another's), and an empty band has no carriers. Conduction needs electrons in a partly filled band.",
    },
    {
      type: "table",
      headers: ["Material", "Band picture", "$E_g$", "Behaviour"],
      rows: [
        ["Metal (Cu, Al)", "Conduction and valence bands overlap, or the top band is half full", "none", "Conducts at any temperature; resistance rises with $T$"],
        ["Insulator (diamond, glass)", "Full valence band, empty conduction band, wide gap", "$> 3$ eV (diamond 5.4 eV)", "Thermal energy ($kT \\approx 0.025$ eV) cannot bridge the gap"],
        ["Semiconductor (Si, Ge)", "Same as insulator but a narrow gap", "Si 1.1 eV, Ge 0.7 eV", "A few electrons are thermally excited across; more at higher $T$"],
      ],
    },
    {
      type: "text",
      content:
        "**Intrinsic semiconductors.** In pure silicon each atom forms four covalent bonds with its neighbours. At room temperature, thermal energy occasionally breaks a bond: an electron jumps into the conduction band and leaves behind a vacancy in the valence band, a **hole**. A neighbouring bonded electron can hop into the hole, which moves the hole the other way. The hole therefore behaves like a positive charge carrier. Every electron freed makes exactly one hole, so",
    },
    { type: "math", latex: "n_e = n_h = n_i \\qquad (\\text{Si at 300 K: } n_i \\approx 1.5\\times10^{16}\\ \\text{m}^{-3})" },
    {
      type: "text",
      content:
        "Compare $n_i$ with the number of silicon atoms, about $5\\times10^{28}$ m⁻³: only about one atom in $3\\times10^{12}$ has released a conduction electron. Raising the temperature increases $n_i$ steeply (it depends on $e^{-E_g/2kT}$), which is why a semiconductor's resistance *falls* when heated.",
    },
    {
      type: "text",
      content:
        "**Light can create carriers too.** A photon of energy $h\\nu \\ge E_g$ can lift an electron from the valence band to the conduction band, creating an electron–hole pair. The longest usable wavelength is",
    },
    { type: "math", latex: "\\lambda_{\\max} = \\frac{hc}{E_g} = \\frac{1240}{E_g(\\text{eV})}\\ \\text{nm}" },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "1240/x",
        exprLatex: "\\lambda_{\\max} = \\frac{1240}{E_g}\\ \\text{nm}",
        min: 0.5,
        max: 3.5,
        step: 0.05,
        initial: 1.1,
        inputLabel: "E_g",
        outputLabel: "λ_max (nm)",
        inputUnit: "eV",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: silicon (1.1 eV) responds to light out to about 1127 nm, into the near infrared, which is why phone cameras need an infrared filter. Germanium (0.7 eV) reaches 1771 nm. A gap of 3.1 eV or more responds only to violet and ultraviolet, so such materials look transparent: visible photons cannot be absorbed.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (can 1000 nm light excite silicon?).**\n\n1. Photon energy: $1240/1000 = 1.24$ eV. *Why this step:* one photon creates one pair, so compare one photon's energy with $E_g$.\n2. $1.24$ eV $> 1.1$ eV: yes, each photon can create an electron–hole pair.\n\n**Worked example 2 (why diamond is transparent).** $E_g = 5.4$ eV.\n\n1. $\\lambda_{\\max} = 1240/5.4 \\approx 230$ nm, in the ultraviolet.\n2. All visible light (400–700 nm) has too little energy per photon to be absorbed across the gap, so it passes through. *Why this step:* colour and transparency are band-gap physics.\n\n**Worked example 3 (thermal excitation).** Room temperature gives $kT \\approx 0.025$ eV. Why do Si ($1.1$ eV) and Ge ($0.7$ eV) have any free carriers at all?\n\n1. The *average* thermal energy is far below $E_g$, but thermal energies are spread out; a tiny fraction of electrons have many times $kT$.\n2. Because $e^{-E_g/2kT}$ depends exponentially on $E_g$, germanium's smaller gap gives it over a thousand times more intrinsic carriers than silicon ($n_i \\approx 2.4\\times10^{19}$ m⁻³ against $1.5\\times10^{16}$).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"holes are positive particles moving through the crystal\"",
      content:
        "No positive particle moves. A hole is a missing electron in a bond. When a neighbouring electron fills it, the vacancy appears one site over. The net effect is exactly that of a $+e$ charge moving the other way, so we book-keep it as one, but the only things actually moving are electrons.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"semiconductors conduct worse when hot, like metals\"",
      content:
        "In a metal the number of carriers is fixed and heating only adds collisions, so resistance rises. In a semiconductor heating multiplies the number of carriers, which far outweighs the extra collisions, so resistance falls. Semiconductors have a *negative* temperature coefficient of resistance.",
    },
    {
      type: "quiz",
      id: "omp5-1-q1",
      variant: "practice",
      question: "What is the longest wavelength of light that can create electron–hole pairs in germanium ($E_g = 0.7$ eV)?",
      options: [
        { text: "About 868 nm", feedback: "That is $1240\\times0.7$. The wavelength is $1240/E_g$." },
        { text: "About 1127 nm", feedback: "That is silicon's value ($E_g = 1.1$ eV)." },
        { text: "About 177 nm", feedback: "A power-of-ten slip: $1240/0.7 \\approx 1771$." },
        { text: "About 1771 nm", correct: true, feedback: "$1240/0.7 \\approx 1771$ nm, in the infrared." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-1-q2",
      variant: "concept",
      question: "In the band picture, what distinguishes a semiconductor from an insulator?",
      options: [
        { text: "A semiconductor's bands overlap.", feedback: "Overlapping bands describe a metal." },
        { text: "Only the size of the band gap: about 1 eV for a semiconductor, more than 3 eV for an insulator.", correct: true, feedback: "Both have a full valence band and an empty conduction band at 0 K; the gap size decides how many electrons thermal energy can promote." },
        { text: "An insulator has no conduction band.", feedback: "Every solid has higher bands; in an insulator the conduction band is just too far up to reach." },
        { text: "A semiconductor's valence band is half empty at 0 K.", feedback: "At 0 K a semiconductor's valence band is full and it does not conduct at all." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-1-q3",
      variant: "concept",
      question: "In an intrinsic semiconductor at room temperature,",
      options: [
        { text: "$n_e > n_h$, because electrons are more mobile", feedback: "Mobility affects how fast carriers drift, not how many there are." },
        { text: "$n_e = n_h$, because every electron promoted to the conduction band leaves exactly one hole", correct: true, feedback: "Carriers are created in pairs." },
        { text: "$n_h = 0$, because holes are only made by doping", feedback: "Thermal generation creates holes in pure material too." },
        { text: "$n_e = n_h = 0$", feedback: "That is true only at absolute zero." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-1-q4",
      variant: "concept",
      question: "The temperature of a silicon sample and a copper wire is raised from 300 K to 350 K. What happens to their resistances?",
      options: [
        { text: "Both rise.", feedback: "Silicon's carrier number grows exponentially with temperature, which dominates." },
        { text: "Both fall.", feedback: "In copper the number of carriers is fixed; only scattering increases." },
        { text: "Silicon's rises, copper's falls.", feedback: "Exactly reversed." },
        { text: "Silicon's falls, copper's rises.", correct: true, feedback: "Silicon gains many carriers; copper keeps the same carriers and suffers more collisions." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-1-q5",
      variant: "practice",
      question: "A material is transparent to all visible light (400–700 nm) but absorbs 300 nm ultraviolet. Its band gap lies between",
      options: [
        { text: "3.1 eV and 4.1 eV", correct: true, feedback: "Transparent at 400 nm means $E_g > 1240/400 = 3.1$ eV; absorbing 300 nm means $E_g \\le 1240/300 = 4.1$ eV." },
        { text: "1.8 eV and 3.1 eV", feedback: "A gap in that range would absorb some visible light." },
        { text: "4.1 eV and 5.4 eV", feedback: "With $E_g > 4.1$ eV, 300 nm photons (4.1 eV) could not be absorbed." },
        { text: "0.7 eV and 1.1 eV", feedback: "That range would absorb all visible light, making the material opaque." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "doping-and-extrinsic-semiconductors",
  title: "5.2 · Doping: n-type and p-type",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Pure silicon is a poor conductor, and its conductivity changes wildly with temperature: useless for building reliable circuits. The fix is almost absurdly small. Replace one silicon atom in a million with an arsenic atom and the conductivity rises by a factor of about a million, and is set by *you*, not by the weather.",
    },
    {
      type: "text",
      content:
        "**n-type (pentavalent donors).** Arsenic (like phosphorus and antimony) has five valence electrons. Four form bonds with neighbouring silicon atoms; the fifth is only weakly held (about 0.05 eV in Si) and at room temperature is almost always free. Each donor atom gives one conduction electron and becomes a fixed positive ion. In the band picture, donors put a **donor level** just below the conduction band.",
    },
    {
      type: "text",
      content:
        "**p-type (trivalent acceptors).** Boron (like aluminium, gallium and indium) has three valence electrons, one short of completing four bonds. It readily accepts an electron from a neighbouring bond, which leaves a hole there. Each acceptor makes one hole and becomes a fixed negative ion. Acceptors put an **acceptor level** just above the valence band.",
    },
    {
      type: "table",
      headers: ["", "n-type", "p-type"],
      rows: [
        ["Dopant", "Pentavalent: P, As, Sb (donors)", "Trivalent: B, Al, Ga, In (acceptors)"],
        ["Majority carriers", "Electrons", "Holes"],
        ["Minority carriers", "Holes", "Electrons"],
        ["Fixed ions left behind", "Positive donor ions", "Negative acceptor ions"],
        ["Band picture", "Donor level just below conduction band", "Acceptor level just above valence band"],
        ["Net charge", "Neutral", "Neutral"],
      ],
    },
    {
      type: "text",
      content:
        "**The mass action law.** Electrons and holes are constantly created (thermally) and constantly recombine. The recombination rate is proportional to how often an electron meets a hole, $\\propto n_en_h$; the generation rate depends only on temperature. In equilibrium the two balance, so $n_en_h$ is fixed at a given temperature. For pure material it equals $n_i^2$, and doping cannot change it:",
    },
    { type: "math", latex: "n_e\\,n_h = n_i^2" },
    {
      type: "text",
      content:
        "So adding donors (more electrons) forces the holes *down*: extra electrons mop up holes. In an n-type sample with donor density $N_D \\gg n_i$, $n_e \\approx N_D$ and $n_h = n_i^2/N_D$. The machine below does this for silicon, $n_i = 1.5\\times10^{16}$ m⁻³: input the electron density in units of $10^{22}$ m⁻³, read the hole density in units of $10^{10}$ m⁻³.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "2.25/x",
        exprLatex: "n_h = \\frac{n_i^2}{n_e} = \\frac{2.25\\times10^{32}}{n_e}\\quad(n_e\\text{ in }10^{22}\\,\\text{m}^{-3},\\ n_h\\text{ in }10^{10}\\,\\text{m}^{-3})",
        min: 0.5,
        max: 10,
        step: 0.5,
        initial: 4.5,
        inputLabel: "n_e (10²² m⁻³)",
        outputLabel: "n_h (10¹⁰ m⁻³)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $n_e = 4.5\\times10^{22}$ m⁻³, $n_h = 0.5\\times10^{10} = 5\\times10^{9}$ m⁻³. Doubling the doping halves the minority carriers. The minority density is about $10^{13}$ times smaller than the majority density.",
    },
    {
      type: "text",
      content:
        "**Conductivity.** Both carriers drift in an electric field (from current electricity: $v_d = \\mu E$, with mobility $\\mu$). Each contributes $ne\\mu$:",
    },
    { type: "math", latex: "\\sigma = \\frac1\\rho = e\\,(n_e\\mu_e + n_h\\mu_h)" },
    {
      type: "text",
      content:
        "**Worked example 1 (NCERT-style, JEE Main).** Silicon ($n_i = 1.5\\times10^{16}$ m⁻³) is doped with $4.5\\times10^{22}$ m⁻³ arsenic atoms. Find $n_e$ and $n_h$.\n\n1. Arsenic is a donor and $N_D \\gg n_i$, so $n_e \\approx N_D = 4.5\\times10^{22}$ m⁻³. *Why this step:* each donor gives one electron; the thermally generated ones are negligible by comparison.\n2. Mass action: $n_h = \\dfrac{n_i^2}{n_e} = \\dfrac{(1.5\\times10^{16})^2}{4.5\\times10^{22}} = \\dfrac{2.25\\times10^{32}}{4.5\\times10^{22}} = 5\\times10^{9}$ m⁻³.\n3. The sample is n-type, with holes as minority carriers.\n\n**Worked example 2 (conductivity).** Take $\\mu_e = 0.135$ m²/V·s and $\\mu_h = 0.048$ m²/V·s for silicon.\n\n1. Pure silicon: $\\sigma = 1.6\\times10^{-19}\\times1.5\\times10^{16}\\times(0.135 + 0.048) \\approx 4.4\\times10^{-4}$ S/m.\n2. Doped with $n_e = 10^{22}$ m⁻³: the hole term is negligible, so $\\sigma \\approx 1.6\\times10^{-19}\\times10^{22}\\times0.135 = 216$ S/m. *Why this step:* in extrinsic material only the majority term matters.\n3. Ratio: about $5\\times10^{5}$. One dopant atom in five million silicon atoms multiplied the conductivity half a million times.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (p-type germanium).** Germanium ($n_i = 2.4\\times10^{19}$ m⁻³) is doped with $4.8\\times10^{21}$ m⁻³ indium atoms. Find the electron density.\n\n1. Indium is an acceptor: $n_h \\approx 4.8\\times10^{21}$ m⁻³.\n2. $n_e = \\dfrac{(2.4\\times10^{19})^2}{4.8\\times10^{21}} = \\dfrac{5.76\\times10^{38}}{4.8\\times10^{21}} = 1.2\\times10^{17}$ m⁻³. *Why this step:* the mass action law gives the minority carriers directly.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"an n-type semiconductor is negatively charged\"",
      content:
        "Every extra electron came from a donor atom that is now a positive ion fixed in the lattice. Electrons plus ions: exactly neutral. \"n\" names the majority *carrier*, not the net charge.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"doping adds carriers of both kinds\"",
      content:
        "Donors add electrons, and by the mass action law the extra electrons *reduce* the holes below $n_i$. Doping raises one carrier type and lowers the other.",
    },
    {
      type: "quiz",
      id: "omp5-2-q1",
      variant: "concept",
      question: "Silicon is doped with gallium. What kind of semiconductor results?",
      options: [
        { text: "n-type, with electrons as majority carriers", feedback: "n-type needs a pentavalent donor such as P, As or Sb." },
        { text: "Intrinsic, because gallium is a metal", feedback: "Any trivalent impurity makes the silicon extrinsic p-type." },
        { text: "p-type, with holes as majority carriers", correct: true, feedback: "Gallium is trivalent: an acceptor." },
        { text: "p-type and negatively charged", feedback: "It is p-type but electrically neutral: the acceptor ions balance the holes." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-2-q2",
      variant: "practice",
      question: "In a silicon sample ($n_i = 1.5\\times10^{16}$ m⁻³), the hole density is $4.5\\times10^{22}$ m⁻³. What is the electron density?",
      options: [
        { text: "$1.5\\times10^{16}$ m⁻³", feedback: "That is the intrinsic density. Doping pushes the minority carriers far below it." },
        { text: "$4.5\\times10^{22}$ m⁻³", feedback: "$n_e = n_h$ only in intrinsic material." },
        { text: "$3.3\\times10^{-7}$ m⁻³", feedback: "That divides $n_i$, not $n_i^2$, by $n_h$. The mass action law is $n_en_h = n_i^2$." },
        { text: "$5\\times10^{9}$ m⁻³", correct: true, feedback: "$n_e = n_i^2/n_h = 2.25\\times10^{32}/4.5\\times10^{22} = 5\\times10^9$." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-2-q3",
      variant: "concept",
      question: "Doping pure silicon with arsenic increases $n_e$ by a factor of $10^6$. What happens to $n_h$?",
      options: [
        { text: "It is unchanged.", feedback: "Extra electrons recombine with holes, so holes decrease." },
        { text: "It decreases by a factor of $10^6$.", correct: true, feedback: "$n_en_h = n_i^2$ is fixed at a given temperature." },
        { text: "It also increases by $10^6$.", feedback: "Donors do not create holes; they add electrons, which then remove holes." },
        { text: "It becomes exactly zero.", feedback: "Thermal generation still produces some holes; $n_h = n_i^2/n_e$." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-2-q4",
      variant: "practice",
      question: "An n-type sample has $n_e = 2\\times10^{22}$ m⁻³ and $\\mu_e = 0.125$ m²/V·s (holes negligible). Find its resistivity.",
      options: [
        { text: "$400$ Ω·m", feedback: "400 S/m is the conductivity. Resistivity is its reciprocal." },
        { text: "$6.25\\times10^{-3}$ Ω·m", feedback: "Recheck: $1.6\\times10^{-19}\\times2\\times10^{22} = 3200$, times 0.125 is 400 S/m." },
        { text: "$2.5\\times10^{-3}$ Ω·m", correct: true, feedback: "$\\sigma = 1.6\\times10^{-19}\\times2\\times10^{22}\\times0.125 = 400$ S/m; $\\rho = 1/400$." },
        { text: "$3.1\\times10^{-4}$ Ω·m", feedback: "That drops the mobility factor: $1/(ne) = 1/3200$. $\\sigma = ne\\mu$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "pn-junction-and-diode",
  title: "5.3 · The p-n Junction Diode",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Put a p-type region and an n-type region side by side in one crystal and something surprising happens: the combination conducts easily one way and almost not at all the other. It is a one-way valve for current, the **diode**, and nearly every device in this chapter is a variation on it.",
    },
    {
      type: "text",
      content:
        "**Formation (step by step).**\n\n1. The n side has many electrons, the p side many holes. Carriers diffuse from where they are crowded to where they are scarce: electrons into the p side, holes into the n side.\n2. Arriving electrons fill holes (and vice versa). Near the junction, the free carriers are wiped out.\n3. What remains there are the **fixed ions**: positive donor ions on the n side, negative acceptor ions on the p side. This thin carrier-free layer is the **depletion region** (typically $10^{-7}$ to $10^{-6}$ m wide).\n4. The ions create an electric field pointing from n to p, which pushes electrons back to n and holes back to p. This opposes further diffusion.\n5. Equilibrium: the diffusion current (majority carriers going across) exactly balances the **drift current** (minority carriers swept across by the field). The potential difference across the depletion layer is the **barrier potential**, about 0.7 V for silicon and 0.3 V for germanium.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Forward and reverse bias",
      content:
        "**Forward bias:** p side to the + terminal, n side to −. The applied voltage opposes the barrier, the depletion layer narrows, and once $V$ approaches the barrier (the knee) majority carriers flood across: large current.\n**Reverse bias:** p side to −, n side to +. The barrier grows, the depletion layer widens, and only the tiny drift current of minority carriers flows (μA for Ge, nA for Si), nearly independent of $V$, until **breakdown** at a large reverse voltage.",
    },
    {
      type: "text",
      content:
        "The diode's I–V curve follows the Shockley equation $I = I_s\\left(e^{V/\\eta V_T} - 1\\right)$, with $I_s$ the reverse saturation current and $\\eta V_T$ a few hundredths of a volt at room temperature. Below, current is in mA and voltage in volts.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "0.00001*(exp(x/0.05) - 1)",
        baseLatex: "\\text{Si-like diode}",
        expr: "a*(exp(x/b) - 1)",
        exprLatex: "I = I_s\\left(e^{V/\\eta V_T} - 1\\right)\\ \\text{mA}",
        params: [
          { name: "a", min: 0.000001, max: 0.001, step: 0.000001, initial: 0.00001 },
          { name: "b", min: 0.03, max: 0.1, step: 0.005, initial: 0.05 },
        ],
        window: { xmin: -1, xmax: 1, ymin: -1, ymax: 10 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: for negative $V$ the current sits at essentially zero (it is $-I_s$, far too small to see). For positive $V$ it stays tiny until about 0.6 V and then shoots up: at 0.6 V it is 1.6 mA, at 0.65 V 4.4 mA, at 0.7 V 12 mA. That sharp rise is the **knee**. Raising $I_s$ (parameter $a$, as for germanium's larger leakage) moves the knee to lower voltages.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Dynamic (a.c.) resistance",
      content:
        "$r_d = \\dfrac{\\Delta V}{\\Delta I}$ measured along the curve. It is small beyond the knee (a few ohms) and huge in reverse bias. A diode is not an ohmic resistor: $V/I$ is different at every point.",
    },
    {
      type: "text",
      content:
        "**Solving diode circuits.** Two models are used in JEE: the **ideal diode** (a closed switch when forward biased, open when reverse biased), and the **constant-drop** model (a closed switch with a fixed 0.7 V drop for Si, 0.3 V for Ge). Method: guess which diodes conduct, solve, then check the guess (current must flow forwards through every \"on\" diode; every \"off\" diode must be reverse biased).",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (JEE Main).** A 5 V battery drives current through a silicon diode (0.7 V drop) in forward bias and a 1 kΩ resistor in series. Find the current.\n\n1. The diode takes 0.7 V; the resistor gets the rest: $5 - 0.7 = 4.3$ V. *Why this step:* Kirchhoff's loop rule with the diode as a fixed drop.\n2. $I = 4.3/1000 = 4.3$ mA.\n3. With an ideal diode it would be 5 mA. For large supply voltages the difference hardly matters; for small ones it matters a lot.\n\n**Worked example 2 (dynamic resistance).** A diode's current rises from 10 mA to 30 mA when its voltage rises from 0.70 V to 0.80 V.\n\n1. $r_d = \\dfrac{\\Delta V}{\\Delta I} = \\dfrac{0.10}{0.020} = 5\\ \\Omega$.\n2. The static value at 0.8 V is $0.8/0.030 \\approx 27\\ \\Omega$. *Why this step:* the two differ because the curve is not a straight line through the origin.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (which diodes conduct?).** A 6 V battery is connected across two parallel branches: branch 1 has an ideal diode $D_1$ pointing with the conventional current and a 3 Ω resistor; branch 2 has an ideal diode $D_2$ pointing against it and a 2 Ω resistor. Find the battery current.\n\n1. $D_1$ is forward biased: a closed switch. $D_2$ is reverse biased: an open switch. *Why this step:* decide each diode's state from the direction the battery tries to push current.\n2. Only branch 1 carries current: $I = 6/3 = 2$ A.\n3. Reverse the battery and the answer becomes $6/2 = 3$ A through branch 2 instead.\n\n**Worked example 4 (germanium).** Repeat Worked example 1 with a germanium diode (0.3 V) and a 3 V supply through 100 Ω.\n\n1. $I = \\dfrac{3 - 0.3}{100} = 27$ mA.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the depletion layer contains no charge\"",
      content:
        "It contains no *free* carriers, but it is full of fixed charge: positive donor ions on the n side and negative acceptor ions on the p side. Those ions create the barrier field. \"Depleted\" means depleted of mobile carriers.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"reverse current is zero\"",
      content:
        "Minority carriers (holes on the n side, electrons on the p side) are swept across by the barrier field, so a small reverse saturation current always flows: microamps in germanium, nanoamps in silicon. It rises with temperature and with light, which is exactly what a photodiode uses (5.5).",
    },
    {
      type: "quiz",
      id: "omp5-3-q1",
      variant: "practice",
      question: "A 9 V supply, a silicon diode (0.7 V) in forward bias and a 2 kΩ resistor are in series. Find the current.",
      options: [
        { text: "$4.15$ mA", correct: true, feedback: "$(9 - 0.7)/2000 = 4.15$ mA." },
        { text: "$4.5$ mA", feedback: "That treats the diode as ideal. Subtract the 0.7 V drop first." },
        { text: "$4.85$ mA", feedback: "The 0.7 V is a drop across the diode, so it is subtracted, not added." },
        { text: "Zero", feedback: "The diode is forward biased and the supply is well above 0.7 V." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-3-q2",
      variant: "concept",
      question: "When a p-n junction is reverse biased, the depletion region",
      options: [
        { text: "narrows and the barrier decreases", feedback: "That happens in forward bias." },
        { text: "disappears", feedback: "It disappears (effectively) only under strong forward bias." },
        { text: "widens and the barrier increases", correct: true, feedback: "The applied voltage adds to the barrier, pulling carriers further from the junction." },
        { text: "fills with majority carriers", feedback: "Reverse bias pulls majority carriers *away* from the junction." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-3-q3",
      variant: "practice",
      question: "A diode's current changes from 20 mA to 40 mA as its voltage changes from 0.75 V to 0.80 V. What is its dynamic resistance?",
      options: [
        { text: "$2.5\\ \\Omega$", correct: true, feedback: "$0.05/0.020 = 2.5\\ \\Omega$." },
        { text: "$20\\ \\Omega$", feedback: "That is $0.80/0.040$, the static resistance at one point." },
        { text: "$37.5\\ \\Omega$", feedback: "That is $0.75/0.020$, a static value. Dynamic resistance uses the *changes*." },
        { text: "$0.4\\ \\Omega$", feedback: "That is $\\Delta I/\\Delta V$ in inverted form. $r_d = \\Delta V/\\Delta I$." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-3-q4",
      variant: "concept",
      question: "At equilibrium (no bias), why does no net current cross the junction?",
      options: [
        { text: "There are no carriers anywhere in the diode.", feedback: "Only the depletion region is short of free carriers; the p and n regions are full of them." },
        { text: "The barrier potential is infinite.", feedback: "It is about 0.7 V in silicon, which is enough to balance diffusion." },
        { text: "Electrons and holes cannot move in a crystal.", feedback: "They move freely; it is the *net* flow that is zero." },
        { text: "The diffusion current of majority carriers is exactly balanced by the drift current of minority carriers.", correct: true, feedback: "The barrier grows until the two flows cancel." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-3-q5",
      variant: "practice",
      question: "Two ideal diodes are connected in series, facing opposite directions, with a 10 Ω resistor across a 5 V battery. What current flows?",
      options: [
        { text: "$0.5$ A", feedback: "That would be true if both diodes conducted. In series, back to back, one always blocks." },
        { text: "Zero", correct: true, feedback: "Whichever way the battery points, one of the two diodes is reverse biased and blocks the series path." },
        { text: "$0.25$ A", feedback: "Diodes are not half-conducting; one blocks completely." },
        { text: "$0.43$ A", feedback: "That subtracts a 0.7 V drop, but no current can flow at all." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "rectifiers",
  title: "5.4 · Diodes as Rectifiers",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The socket in your wall supplies alternating current, reversing 50 times a second. Your phone's battery needs current that flows one way only. Somewhere in the charger, diodes are throwing away or flipping the backwards half of every cycle. That job is **rectification**, and a diode's one-way behaviour does it with no moving parts.",
    },
    {
      type: "text",
      content:
        "**Half-wave rectifier.** One diode in series with the load. During the positive half-cycle the diode is forward biased and the load sees the input; during the negative half-cycle the diode is reverse biased and the load sees nothing. The output is a train of positive humps, one per input cycle, so the **output frequency equals the input frequency** (50 Hz in, 50 Hz ripple out).",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "sin(x)",
        baseLatex: "\\text{input } V_{\\text{in}} = \\sin x",
        expr: "A*(sin(x) + abs(sin(x)))/2",
        exprLatex: "V_{\\text{out}} = A\\,\\frac{\\sin x + |\\sin x|}{2}\\ \\ (\\text{half-wave})",
        params: [{ name: "A", min: 0.5, max: 3, step: 0.1, initial: 2 }],
        window: { xmin: 0, xmax: 13, ymin: -3, ymax: 3 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the output follows the input when the input is positive and sits at zero when it is negative. The expression $\\frac{\\sin x + |\\sin x|}{2}$ is exactly \"keep the positive part\". Over the plotted $x$ from 0 to 13 (just over two cycles) there are two full humps, one per input cycle.",
    },
    {
      type: "text",
      content:
        "**Full-wave rectifiers.** Use the negative half-cycle too, by steering it through the load in the same direction.\n\n- **Centre-tap:** the transformer secondary has a centre tap; two diodes each conduct on alternate half-cycles, each using half the secondary.\n- **Bridge:** four diodes in a diamond; on each half-cycle two diagonally opposite diodes conduct and route current the same way through the load. No centre tap is needed.\n\nEither way the output is $|\\sin|$-shaped: two humps per input cycle, so the **output frequency is double the input** (100 Hz ripple from 50 Hz mains).",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "sin(x)",
        baseLatex: "\\text{input } V_{\\text{in}} = \\sin x",
        expr: "A*abs(sin(x))",
        exprLatex: "V_{\\text{out}} = A\\,|\\sin x|\\ \\ (\\text{full-wave})",
        params: [{ name: "A", min: 0.5, max: 3, step: 0.1, initial: 2 }],
        window: { xmin: 0, xmax: 13, ymin: -3, ymax: 3 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: every negative hump is flipped up. Count them: four full humps in the window where the half-wave output had two. The output repeats every half-period of the input, so its frequency is doubled.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Average (dc) value and peak inverse voltage",
      content:
        "Average output (ideal diodes, peak $V_m$): half-wave $\\dfrac{V_m}{\\pi}$, full-wave $\\dfrac{2V_m}{\\pi}$.\n**Peak inverse voltage (PIV):** the largest reverse voltage a diode must withstand. Half-wave: $V_m$. Centre-tap full-wave: $2V_m$ (where $V_m$ is the peak of *each half* of the secondary). Bridge: $V_m$.",
    },
    {
      type: "text",
      content:
        "**Checking the averages.** Over one full period $2\\pi$, the half-wave output is $V_m\\sin x$ for $0 < x < \\pi$ and zero after. Its average is",
    },
    {
      type: "math",
      latex: "\\bar V = \\frac{1}{2\\pi}\\int_0^{\\pi}V_m\\sin x\\,dx = \\frac{V_m}{2\\pi}\\big[-\\cos x\\big]_0^{\\pi} = \\frac{V_m}{2\\pi}\\times2 = \\frac{V_m}{\\pi}",
    },
    {
      type: "text",
      content:
        "The full-wave output has a hump in *both* halves, so it averages twice as much, $2V_m/\\pi$.\n\n**Filtering.** Rectified output is one-way but still bumpy. A capacitor across the load charges up to nearly $V_m$ on each hump and discharges slowly through the load between humps, smoothing the output to nearly steady dc with a small **ripple**. A full-wave output refills the capacitor twice as often, so it gives less ripple for the same capacitor.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (frequencies, JEE Main).** 50 Hz mains feed (a) a half-wave and (b) a full-wave rectifier. Find the output ripple frequency.\n\n1. Half-wave: one hump per input cycle, 50 Hz.\n2. Full-wave: two humps per input cycle, 100 Hz. *Why this step:* count humps per second; the flipping of the negative half doubles them.\n\n**Worked example 2 (averages).** The peak of the rectified voltage is $V_m = 20$ V (ideal diodes).\n\n1. Half-wave: $20/\\pi \\approx 6.37$ V.\n2. Full-wave: $40/\\pi \\approx 12.7$ V.\n\n**Worked example 3 (PIV).** A centre-tap transformer gives 15 V peak on each half of the secondary, and a bridge rectifier is fed with 15 V peak. What PIV must the diodes survive?\n\n1. Centre-tap: when one diode conducts, the other sees the full secondary (both halves) in reverse: $2\\times15 = 30$ V. *Why this step:* the non-conducting diode's cathode sits at $+V_m$ while its anode is at $-V_m$.\n2. Bridge: each non-conducting diode sits across the input peak: 15 V.\n3. This is one reason bridges are popular: cheaper, lower-rated diodes and no centre tap.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a full-wave rectifier's output has the same frequency as the input\"",
      content:
        "The full-wave output repeats every *half* input cycle, because each negative half becomes a positive hump identical to the one before. 50 Hz in gives 100 Hz ripple out.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"rectified output is steady dc\"",
      content:
        "Rectification only makes the current one-directional. The voltage still rises and falls from zero to $V_m$ each hump. A filter capacitor (and often a Zener regulator, 5.5) is needed to make it steady.",
    },
    {
      type: "quiz",
      id: "omp5-4-q1",
      variant: "practice",
      question: "A full-wave rectifier is fed from a 60 Hz supply. What is the fundamental frequency of the output ripple?",
      options: [
        { text: "60 Hz", feedback: "That is the half-wave answer." },
        { text: "120 Hz", correct: true, feedback: "Two humps per input cycle." },
        { text: "30 Hz", feedback: "Rectification never lowers the frequency." },
        { text: "0 Hz, because the output is dc", feedback: "The output is one-directional but still pulsates." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-4-q2",
      variant: "practice",
      question: "The peak output of an ideal half-wave rectifier is 10 V. What is its average (dc) value?",
      options: [
        { text: "About 6.37 V", feedback: "That is $2V_m/\\pi$, the full-wave value." },
        { text: "5 V", feedback: "Half of the peak would be right for a square wave; a sine hump averages $V_m/\\pi$ over a full period." },
        { text: "About 7.07 V", feedback: "That is $V_m/\\sqrt2$, the rms value of the unrectified sine wave." },
        { text: "About 3.18 V", correct: true, feedback: "$V_m/\\pi = 10/\\pi \\approx 3.18$ V." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-4-q3",
      variant: "concept",
      question: "In a centre-tap full-wave rectifier where each half of the secondary gives peak $V_m$, what is the peak inverse voltage across each diode?",
      options: [
        { text: "$2V_m$", correct: true, feedback: "The blocking diode sees both halves of the secondary in series." },
        { text: "$V_m$", feedback: "That is the PIV in a bridge or half-wave rectifier." },
        { text: "$V_m/2$", feedback: "The reverse voltage is larger, not smaller, than one half's peak." },
        { text: "Zero, because one diode always conducts", feedback: "The *other* diode is reverse biased by the full secondary voltage." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-4-q4",
      variant: "concept",
      question: "What does a capacitor connected across the load of a rectifier do?",
      options: [
        { text: "It doubles the output frequency.", feedback: "Doubling the frequency is what full-wave rectification does." },
        { text: "It blocks the dc component.", feedback: "In *series* a capacitor blocks dc; across the load it stores charge and smooths." },
        { text: "It charges near the peak and discharges slowly between peaks, smoothing the output.", correct: true, feedback: "The output becomes nearly steady dc with a small ripple." },
        { text: "It removes the need for diodes.", feedback: "Without diodes the capacitor would simply follow the ac input." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "zener-and-optoelectronic-devices",
  title: "5.5 · Zener Diode, LED, Photodiode and Solar Cell",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A p-n junction is more than a valve. Dope it heavily and its breakdown becomes a precise, repeatable voltage you can build a regulator on. Shine light on it and it produces current; push current through it and (with the right material) it produces light. All four devices in this lesson are the same junction used in different ways.",
    },
    {
      type: "text",
      content:
        "**The Zener diode.** Both sides are heavily doped, so the depletion layer is very thin and the field across it enormous (about $5\\times10^{6}$ V/m or more) at a modest reverse voltage. At the **Zener voltage** $V_Z$ this field rips electrons out of bonds and the reverse current rises steeply, while the voltage stays almost exactly $V_Z$ over a wide range of current. Used in reverse bias with a series resistor to limit the current, this breakdown is not damage; it is the whole point.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Zener voltage regulator",
      content:
        "Unregulated supply $V_S$ → series resistor $R_S$ → Zener (reverse biased) in parallel with the load $R_L$.\nWhile the Zener is in breakdown, the load voltage is $V_Z$ and\n$I_S = \\dfrac{V_S - V_Z}{R_S}, \\quad I_L = \\dfrac{V_Z}{R_L}, \\quad I_Z = I_S - I_L$\nIf $V_S$ rises, $I_S$ rises and the Zener absorbs the extra current; the load voltage stays $V_Z$. Regulation needs $I_Z > 0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (Zener regulator, JEE Main).** $V_S = 15$ V, $V_Z = 10$ V, $R_S = 250\\ \\Omega$, $R_L = 1$ kΩ. Find $I_S$, $I_L$ and $I_Z$.\n\n1. The load is in parallel with the Zener, so it sits at 10 V. *Why this step:* start from the one voltage you know for certain.\n2. $I_S = \\dfrac{15 - 10}{250} = 20$ mA.\n3. $I_L = \\dfrac{10}{1000} = 10$ mA.\n4. $I_Z = 20 - 10 = 10$ mA $> 0$: the Zener is in breakdown and regulating. ✓\n\n**Worked example 2 (how small can the load be?).** Same circuit. What is the smallest $R_L$ for which the output stays at 10 V?\n\n1. $I_S = 20$ mA whatever the load (while regulating). The load can take at most all of it: $I_L \\le 20$ mA.\n2. $R_L \\ge \\dfrac{10}{0.020} = 500\\ \\Omega$. *Why this step:* at $I_Z = 0$ the Zener has nothing left to give; a smaller load would pull the voltage below $V_Z$.\n3. Below 500 Ω, the Zener switches off and the circuit is just a divider: with $R_L = 250\\ \\Omega$, $V_L = 15\\times\\dfrac{250}{500} = 7.5$ V.",
    },
    {
      type: "text",
      content:
        "**Junctions and light.** A photon absorbed near the junction with $h\\nu \\ge E_g$ creates an electron–hole pair (5.1). Conversely, when an electron in the conduction band drops into a hole, it can emit a photon of energy about $E_g$. That gives three devices:",
    },
    {
      type: "table",
      headers: ["Device", "Bias", "Energy flow", "Key relation"],
      rows: [
        ["Photodiode", "Reverse", "Light → current (a detector)", "Reverse current ∝ intensity, for $h\\nu > E_g$"],
        ["LED", "Forward", "Current → light", "Colour: $\\lambda \\approx 1240/E_g$ nm"],
        ["Solar cell", "None (it is the source)", "Light → electrical power", "Works in the 4th quadrant of its I–V curve"],
      ],
    },
    {
      type: "text",
      content:
        "**Photodiode: why reverse bias?** Light creates carriers of both kinds, but it only changes the *minority* carrier numbers noticeably (majority carriers are already plentiful). In reverse bias the current *is* the minority-carrier current, so a small amount of light causes a large fractional change in it. In forward bias the same extra carriers would be lost in a much larger majority current.\n\n**LED colour.** Recombination across the gap emits photons of energy about $E_g$. Silicon's gap (1.1 eV) is in the infrared and silicon emits poorly anyway, so LEDs use compounds: GaAs (1.4 eV, infrared, TV remotes), GaAsP (1.9 eV, red), GaN-based (about 3 eV, blue). A blue LED plus a yellow phosphor makes a \"white\" LED. Try some gaps:",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "1240/x",
        exprLatex: "\\lambda = \\frac{1240}{E_g}\\ \\text{nm}",
        min: 0.5,
        max: 3.5,
        step: 0.05,
        initial: 2,
        inputLabel: "E_g",
        outputLabel: "LED λ (nm)",
        inputUnit: "eV",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: 2.0 eV gives 620 nm (red-orange), 2.5 eV gives 496 nm (green-blue), and above 3.1 eV the emission leaves the visible range into the ultraviolet. A visible LED needs a gap between about 1.8 and 3.1 eV.",
    },
    {
      type: "text",
      content:
        "**Solar cell.** Light makes electron–hole pairs; the junction's built-in field separates them (electrons to n, holes to p) and they flow round an external circuit with no battery. Its I–V curve is the diode curve shifted *down* by the light-generated current $I_L$. The point on the $V$ axis is the open-circuit voltage $V_{oc}$; the point on the $I$ axis is the short-circuit current $I_{sc}$. Slide the light level below (mA against volts).",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "0.00001*(exp(x/0.05) - 1)",
        baseLatex: "\\text{dark}",
        expr: "0.00001*(exp(x/0.05) - 1) - L",
        exprLatex: "I = I_s\\left(e^{V/\\eta V_T} - 1\\right) - I_L",
        params: [{ name: "L", min: 0, max: 8, step: 0.5, initial: 5 }],
        window: { xmin: -0.2, xmax: 0.8, ymin: -10, ymax: 10 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $I_L = 5$ mA the curve crosses the current axis at $-5$ mA ($I_{sc}$) and the voltage axis near 0.66 V ($V_{oc}$). Between them the curve runs through the fourth quadrant, where $V > 0$ and $I < 0$: the device is *delivering* power ($VI < 0$ means power out). Brighter light pushes the curve further down, increasing $I_{sc}$ a lot and $V_{oc}$ only a little.",
    },
    {
      type: "text",
      content:
        "**Choosing the solar-cell gap.** Sunlight's photons peak around 1.5 eV. Too small a gap wastes most of each photon's energy as heat (only $E_g$ per pair is usable); too large a gap lets most photons pass unabsorbed. The best compromise is $E_g \\approx 1.0$–$1.8$ eV; silicon (1.1 eV) and GaAs (1.4 eV) are used.\n\n**Worked example 3 (LED band gap).** A red LED emits at 620 nm. Find its band gap.\n\n1. $E_g \\approx \\dfrac{1240}{620} = 2.0$ eV. *Why this step:* one recombination, one photon, energy about $E_g$.\n\n**Worked example 4 (can a photodiode see it?).** A silicon photodiode ($E_g = 1.1$ eV) is used to detect the 1300 nm light used in optical fibres. Will it respond?\n\n1. $1240/1300 = 0.95$ eV $< 1.1$ eV: no. *Why this step:* below the gap, photons pass straight through without making pairs.\n2. Germanium ($0.7$ eV, $\\lambda_{\\max} \\approx 1771$ nm) or InGaAs detectors are used instead.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a photodiode is used forward biased\"",
      content:
        "It is reverse biased, so that the light-generated minority carriers form the whole measured current. Forward biased, the small photocurrent would be swamped by the large majority-carrier current.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the Zener is destroyed at breakdown\"",
      content:
        "Zener breakdown is reversible and is the normal operating region. What destroys a Zener (or any diode) is excess *power*, $V_ZI_Z$, which is why a series resistor always limits the current.",
    },
    {
      type: "quiz",
      id: "omp5-5-q1",
      variant: "practice",
      question: "A Zener regulator has $V_S = 12$ V, $V_Z = 6$ V, $R_S = 200\\ \\Omega$ and $R_L = 1$ kΩ. What is the Zener current?",
      options: [
        { text: "$30$ mA", feedback: "That is the supply current $I_S$. The load takes 6 mA of it." },
        { text: "$6$ mA", feedback: "That is the load current." },
        { text: "$60$ mA", feedback: "That uses the full 12 V across $R_S$. The resistor gets $V_S - V_Z = 6$ V." },
        { text: "$24$ mA", correct: true, feedback: "$I_S = 6/200 = 30$ mA, $I_L = 6/1000 = 6$ mA, $I_Z = 24$ mA." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-5-q2",
      variant: "practice",
      question: "An LED emits green light of wavelength 500 nm. Estimate its band gap.",
      options: [
        { text: "About 1.1 eV", feedback: "That is silicon's gap, which corresponds to about 1127 nm (infrared)." },
        { text: "About 2.5 eV", correct: true, feedback: "$1240/500 = 2.48$ eV." },
        { text: "About 0.4 eV", feedback: "That inverts the ratio: $500/1240$." },
        { text: "About 6.2 eV", feedback: "That would be 200 nm ultraviolet." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-5-q3",
      variant: "concept",
      question: "Why is a photodiode operated in reverse bias?",
      options: [
        { text: "In forward bias no current flows.", feedback: "Plenty flows in forward bias; that is exactly the problem." },
        { text: "Reverse bias makes the band gap smaller.", feedback: "The band gap is a property of the material, not of the bias." },
        { text: "The light changes the minority-carrier current by a large fraction, which is easy to measure.", correct: true, feedback: "In reverse bias the current *is* the minority current, so light has a big relative effect." },
        { text: "Light can only enter a reverse-biased junction.", feedback: "Light enters either way; bias decides how visible its effect is." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-5-q4",
      variant: "concept",
      question: "In which quadrant of the I–V plane does an illuminated solar cell deliver power?",
      options: [
        { text: "The fourth: positive voltage, negative (reverse-direction) current", correct: true, feedback: "$VI < 0$ means the device supplies power rather than absorbing it." },
        { text: "The first: positive voltage and current, like a forward-biased diode", feedback: "In the first quadrant the device absorbs power." },
        { text: "The third: reverse bias, like a photodiode", feedback: "A photodiode works in the third quadrant and absorbs power from its bias battery." },
        { text: "It does not matter; any quadrant works", feedback: "Only in the fourth quadrant is power delivered." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-5-q5",
      variant: "practice",
      question: "In the regulator of Worked example 1 ($V_S = 15$ V, $V_Z = 10$ V, $R_S = 250\\ \\Omega$), the load is changed to 2 kΩ. Find the new Zener current.",
      options: [
        { text: "$10$ mA", feedback: "That was the value with the 1 kΩ load. A lighter load takes less current, leaving more for the Zener." },
        { text: "$5$ mA", feedback: "That is the new load current." },
        { text: "$15$ mA", correct: true, feedback: "$I_S$ is still 20 mA; $I_L = 10/2000 = 5$ mA; $I_Z = 15$ mA." },
        { text: "$25$ mA", feedback: "The supply current is fixed at $(15 - 10)/250 = 20$ mA while regulating; the Zener cannot get more than that." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "transistor-basics",
  title: "5.6 · The Transistor: Switch and Amplifier",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A microphone produces a signal of a few millivolts. A loudspeaker needs volts. Somewhere between them, a small current must *control* a large one. A transistor does exactly this: a tiny current into its middle layer decides how much current flows through the whole device. Billions of them, used as switches, run every computer.",
    },
    {
      type: "text",
      content:
        "**Structure.** A bipolar junction transistor is a sandwich of three doped regions: **npn** (n–p–n) or **pnp**. The three regions are the **emitter** (heavily doped, moderate size: it supplies carriers), the **base** (very thin and lightly doped), and the **collector** (moderately doped and the largest: it collects carriers and dissipates heat). There are two junctions: emitter–base and collector–base. In the circuit symbol the arrow on the emitter points in the direction of conventional current: out for npn, in for pnp.",
    },
    {
      type: "text",
      content:
        "**How it works (npn, active region).** The emitter–base junction is **forward biased**; the collector–base junction is **reverse biased**.\n\n1. Forward bias sends a flood of electrons from the emitter into the base.\n2. The base is thin and lightly doped, so few electrons meet a hole there; only about 1–5% recombine and leave through the base lead as base current $I_B$.\n3. The other 95–99% diffuse across the thin base and reach the collector junction, where the reverse-bias field sweeps them into the collector: collector current $I_C$.\n4. Charge conservation: everything entering from the emitter leaves by base or collector.",
    },
    { type: "math", latex: "I_E = I_B + I_C" },
    {
      type: "callout",
      variant: "definition",
      title: "Current gains",
      content:
        "$\\alpha = \\dfrac{I_C}{I_E}$ (common-base gain, slightly less than 1), $\\qquad \\beta = \\dfrac{I_C}{I_B}$ (common-emitter gain, typically 20–500).\nThey are linked: $\\beta = \\dfrac{\\alpha}{1 - \\alpha}$ and $\\alpha = \\dfrac{\\beta}{1 + \\beta}$.",
    },
    {
      type: "text",
      content:
        "**Derivation of β = α/(1 − α).** Divide $I_E = I_B + I_C$ by $I_C$: $\\dfrac{1}{\\alpha} = \\dfrac{1}{\\beta} + 1$. Rearranging, $\\dfrac1\\beta = \\dfrac1\\alpha - 1 = \\dfrac{1 - \\alpha}{\\alpha}$, so $\\beta = \\dfrac{\\alpha}{1-\\alpha}$. Because $\\alpha$ is close to 1, small changes in $\\alpha$ make big changes in $\\beta$: $\\alpha = 0.98$ gives $\\beta = 49$, $\\alpha = 0.99$ gives $\\beta = 99$.",
    },
    {
      type: "text",
      content:
        "In the active region the collector current is simply $\\beta$ times the base current. With $\\beta = 100$ (base current in μA, collector current in μA):",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "100*x",
        exprLatex: "I_C = \\beta I_B,\\ \\beta = 100",
        min: 0,
        max: 100,
        step: 5,
        initial: 20,
        inputLabel: "I_B",
        outputLabel: "I_C (μA)",
        inputUnit: "μA",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: 20 μA in the base controls 2000 μA $= 2$ mA in the collector; every extra 5 μA of base current adds 0.5 mA. In a real circuit this proportionality stops at **saturation**, when the collector resistor cannot pass any more current, and at **cut-off**, when $I_B = 0$ and $I_C \\approx 0$.",
    },
    {
      type: "table",
      headers: ["Region", "E–B junction", "C–B junction", "Behaviour", "Use"],
      rows: [
        ["Cut-off", "Not forward biased", "Reverse", "$I_C \\approx 0$", "Switch OFF"],
        ["Active", "Forward", "Reverse", "$I_C = \\beta I_B$", "Amplifier"],
        ["Saturation", "Forward", "Forward", "$I_C$ at its maximum, $V_{CE} \\approx 0$", "Switch ON"],
      ],
    },
    {
      type: "text",
      content:
        "**Common-emitter characteristics (qualitative).** The *input* characteristic ($I_B$ against $V_{BE}$) looks like a forward-biased diode curve with a knee near 0.7 V; its slope gives the input resistance $r_i = \\Delta V_{BE}/\\Delta I_B$. The *output* characteristics ($I_C$ against $V_{CE}$, one curve per $I_B$) rise steeply near $V_{CE} = 0$ (saturation) and then run nearly flat at $I_C \\approx \\beta I_B$ (active region); their slight slope gives the output resistance.",
    },
    {
      type: "text",
      content:
        "**The amplifier.** In a common-emitter amplifier, a small input signal changes $I_B$ slightly; $I_C$ changes $\\beta$ times as much; that change flows through the collector resistor $R_C$ and produces a large output voltage change. With input resistance $R_B$ (NCERT form):",
    },
    {
      type: "math",
      latex: "A_v = \\frac{\\Delta V_o}{\\Delta V_i} = -\\beta\\,\\frac{R_C}{R_B}, \\qquad \\text{power gain} = \\beta\\times|A_v| = \\beta^2\\frac{R_C}{R_B}",
    },
    {
      type: "text",
      content:
        "The minus sign means the output is inverted (180° out of phase): more base current means more collector current, a bigger drop across $R_C$, and so a *lower* collector voltage.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (α to β, JEE Main).** $\\alpha = 0.98$. Find $\\beta$.\n\n1. $\\beta = \\dfrac{0.98}{1 - 0.98} = \\dfrac{0.98}{0.02} = 49$. *Why this step:* 98% of emitter current reaches the collector, 2% leaves by the base, so $I_C/I_B = 98/2$.\n\n**Worked example 2 (amplifier gain).** $\\beta = 100$, $R_C = 2$ kΩ, $R_B = 1$ kΩ. Find the voltage and power gains, and the output for a 10 mV input.\n\n1. $A_v = -100\\times\\dfrac{2}{1} = -200$.\n2. Power gain $= \\beta|A_v| = 100\\times200 = 2\\times10^{4}$. *Why this step:* power gain is current gain times voltage gain.\n3. Output: $200\\times10$ mV $= 2$ V, inverted.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (transistor as a switch).** An npn transistor with $\\beta = 100$ has $R_C = 1$ kΩ connected to $V_{CC} = 5$ V. The base is driven from a 5 V logic signal through $R_B$ ($V_{BE} = 0.7$ V). What base current, and what largest $R_B$, will switch it fully ON?\n\n1. Fully on (saturated): $V_{CE} \\approx 0$, so $I_C \\approx V_{CC}/R_C = 5$ mA. *Why this step:* in saturation the collector current is limited by the resistor, not by $\\beta$.\n2. To reach it, $\\beta I_B \\ge 5$ mA, so $I_B \\ge 50$ μA.\n3. $R_B \\le \\dfrac{5 - 0.7}{50\\times10^{-6}} = 86$ kΩ. Designers pick less (say 47 kΩ) to switch on firmly.\n4. With the input at 0 V, $I_B = 0$: cut-off, $I_C = 0$, output at 5 V. Input high gives output low: this circuit is a NOT gate (5.7).\n\n**Worked example 4 (currents).** $I_B = 40$ μA and $\\beta = 50$.\n\n1. $I_C = 50\\times40$ μA $= 2$ mA; $I_E = 2 + 0.04 = 2.04$ mA; $\\alpha = 2/2.04 \\approx 0.98$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a transistor creates power\"",
      content:
        "The extra power in the amplified signal comes from the dc supply $V_{CC}$. The transistor is a valve: the small input signal controls how much of the supply's power flows into the load. Energy is conserved; the transistor even wastes some as heat.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the base is the thickest, most heavily doped region\"",
      content:
        "It is the opposite: the base is the *thinnest* and most *lightly* doped region. That is what lets most carriers cross it without recombining, making $I_B$ small and $\\beta$ large. The emitter is the most heavily doped; the collector is the largest.",
    },
    {
      type: "quiz",
      id: "omp5-6-q1",
      variant: "practice",
      question: "For a transistor, $\\alpha = 0.95$. What is $\\beta$?",
      options: [
        { text: "19", correct: true, feedback: "$0.95/0.05 = 19$." },
        { text: "0.95", feedback: "That is $\\alpha$. $\\beta = \\alpha/(1 - \\alpha)$." },
        { text: "20", feedback: "That is $1/(1 - \\alpha)$, which is $\\beta + 1$." },
        { text: "0.487", feedback: "That uses $\\alpha/(1 + \\alpha)$, the inverse relation." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-6-q2",
      variant: "practice",
      question: "A transistor has $\\beta = 50$ and base current 40 μA. Find the emitter current.",
      options: [
        { text: "$2.00$ mA", feedback: "That is $I_C$. Add the base current." },
        { text: "$1.96$ mA", feedback: "$I_E$ is the *sum* of $I_B$ and $I_C$, the largest of the three." },
        { text: "$0.8$ μA", feedback: "That divides $I_B$ by $\\beta$ instead of multiplying: $I_C = \\beta I_B$." },
        { text: "$2.04$ mA", correct: true, feedback: "$I_C = 2$ mA; $I_E = I_B + I_C = 2.04$ mA." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-6-q3",
      variant: "practice",
      question: "A common-emitter amplifier has $\\beta = 50$, $R_C = 4$ kΩ, $R_B = 1$ kΩ. What are the magnitudes of the voltage gain and the power gain?",
      options: [
        { text: "200 and 200", feedback: "Power gain also includes the current gain $\\beta$." },
        { text: "200 and $10^4$", correct: true, feedback: "$|A_v| = 50\\times4 = 200$; power gain $= 50\\times200 = 10^4$." },
        { text: "12.5 and 625", feedback: "That inverts the resistor ratio. $A_v = \\beta R_C/R_B$." },
        { text: "50 and 2500", feedback: "That leaves out the resistor ratio $R_C/R_B = 4$." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-6-q4",
      variant: "concept",
      question: "For an npn transistor to work as an amplifier, the junctions must be biased as follows:",
      options: [
        { text: "Both forward", feedback: "That is saturation, used for a switch that is ON." },
        { text: "Emitter–base forward, collector–base reverse", correct: true, feedback: "That is the active region." },
        { text: "Both reverse", feedback: "That is cut-off, a switch that is OFF." },
        { text: "Emitter–base reverse, collector–base forward", feedback: "That is the \"inverse active\" mode, which gives very poor gain." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-6-q5",
      variant: "concept",
      question: "Why is the output of a common-emitter amplifier 180° out of phase with the input?",
      options: [
        { text: "The transistor reverses the direction of current.", feedback: "The current direction does not flip; the output *voltage* falls when the input rises." },
        { text: "The base is lightly doped.", feedback: "Light doping explains the high gain, not the phase inversion." },
        { text: "Because $\\alpha < 1$.", feedback: "$\\alpha < 1$ describes current division, not the phase." },
        { text: "More base current gives more collector current, a larger drop across $R_C$, and so a lower collector voltage.", correct: true, feedback: "$V_{CE} = V_{CC} - I_CR_C$ falls as the input rises." },
      ],
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "logic-gates",
  title: "5.7 · Logic Gates",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "The transistor switch of 5.6 turns a high input into a low output. That is already a decision: *NOT*. Connect two switches in series and the output changes only if both inputs are high: *AND*. In parallel: *OR*. Every calculation a computer does is built from a handful of such gates, and, remarkably, a single type of gate is enough to build all the others.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Digital signals and gates",
      content:
        "A digital signal has two levels: **1** (high, e.g. 5 V) and **0** (low, 0 V). A **logic gate** has one or more inputs and one output that is a fixed function of the inputs, listed in its **truth table**. Boolean notation: $A + B$ means OR, $A\\cdot B$ (or $AB$) means AND, $\\bar A$ means NOT A.",
    },
    {
      type: "table",
      headers: ["A", "B", "OR $A + B$", "AND $AB$", "NAND $\\overline{AB}$", "NOR $\\overline{A + B}$", "XOR $A\\oplus B$"],
      rows: [
        ["0", "0", "0", "0", "1", "1", "0"],
        ["0", "1", "1", "0", "1", "0", "1"],
        ["1", "0", "1", "0", "1", "0", "1"],
        ["1", "1", "1", "1", "0", "0", "0"],
      ],
    },
    {
      type: "text",
      content:
        "**NOT** has one input: $Y = \\bar A$ (0 → 1, 1 → 0). Its symbol is a triangle with a small circle (the \"bubble\") at the output. AND is a D-shape, OR a curved shield shape; a bubble on the output of either gives NAND or NOR. XOR (\"exclusive OR\") is 1 when the inputs *differ*: $A\\oplus B = A\\bar B + \\bar AB$.\n\n**Reading the table quickly.** AND: 1 only if all inputs are 1. OR: 0 only if all inputs are 0. NAND and NOR: the opposite of AND and OR in every row.",
    },
    {
      type: "text",
      content:
        "**De Morgan's laws** let you swap AND for OR by inverting everything:",
    },
    { type: "math", latex: "\\overline{A + B} = \\bar A\\cdot\\bar B, \\qquad \\overline{A\\cdot B} = \\bar A + \\bar B" },
    {
      type: "table",
      headers: ["A", "B", "$\\bar A$", "$\\bar B$", "$\\overline{AB}$", "$\\bar A + \\bar B$", "$\\overline{A+B}$", "$\\bar A\\,\\bar B$"],
      rows: [
        ["0", "0", "1", "1", "1", "1", "1", "1"],
        ["0", "1", "1", "0", "1", "1", "0", "0"],
        ["1", "0", "0", "1", "1", "1", "0", "0"],
        ["1", "1", "0", "0", "0", "0", "0", "0"],
      ],
    },
    {
      type: "text",
      content:
        "Columns 5 and 6 agree in every row, and so do columns 7 and 8: both laws are proved by exhaustion, since there are only four input combinations.\n\n**NAND is universal (step by step).**\n\n1. **NOT:** tie both inputs of a NAND together: $\\overline{A\\cdot A} = \\bar A$.\n2. **AND:** follow a NAND with a NAND-as-NOT: $\\overline{\\overline{AB}} = AB$.\n3. **OR:** invert each input with a NAND-as-NOT, then NAND them: $\\overline{\\bar A\\cdot\\bar B} = \\bar{\\bar A} + \\bar{\\bar B} = A + B$ (De Morgan).\n\n**NOR is universal too:** NOT is a NOR with tied inputs; OR is NOR followed by NOT; AND is $\\overline{\\bar A + \\bar B} = AB$, a NOR fed with inverted inputs. Chip makers build whole processors from one gate type because it simplifies manufacture.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a NOR circuit that is really AND).** Input A goes into a NOR gate with both its inputs tied together; so does B. The two outputs feed a third NOR gate. Find Y.\n\n1. First two gates: $\\overline{A + A} = \\bar A$ and $\\bar B$. *Why this step:* a NOR with tied inputs is a NOT.\n2. Third gate: $Y = \\overline{\\bar A + \\bar B}$.\n3. De Morgan: $\\overline{\\bar A + \\bar B} = \\bar{\\bar A}\\cdot\\bar{\\bar B} = AB$. The circuit is an AND gate.\n4. Check one row: $A = 1, B = 0$: $\\bar A = 0$, $\\bar B = 1$, NOR$(0, 1) = 0 = 1\\cdot0$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (output waveform).** Inputs A and B are held at the levels below for six equal time intervals. Sketch the output of a NAND gate.\n\n1. For each interval, read the pair $(A, B)$ and look up NAND: 0 only when both are 1. *Why this step:* a gate has no memory; each interval is a separate truth-table lookup.",
    },
    {
      type: "table",
      headers: ["Interval", "1", "2", "3", "4", "5", "6"],
      rows: [
        ["A", "0", "1", "1", "0", "1", "0"],
        ["B", "0", "0", "1", "1", "1", "0"],
        ["NAND", "1", "1", "0", "1", "0", "1"],
        ["NOR (for comparison)", "1", "0", "0", "0", "0", "1"],
        ["XOR (for comparison)", "0", "1", "0", "1", "0", "0"],
      ],
    },
    {
      type: "text",
      content:
        "2. The NAND output drops to 0 only in intervals 3 and 5, where both inputs are high.\n\n**Worked example 3 (identify the single gate).** A and B feed both an OR gate and a NAND gate; their outputs feed an AND gate. What single gate is equivalent?\n\n1. $Y = (A + B)\\cdot\\overline{AB}$.\n2. Row by row: $(0,0)$: $0\\cdot1 = 0$; $(0,1)$: $1\\cdot1 = 1$; $(1,0)$: $1\\cdot1 = 1$; $(1,1)$: $1\\cdot0 = 0$.\n3. Output 1 exactly when the inputs differ: XOR. *Why this step:* when the algebra is unclear, the four-row table always settles it.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"NAND is just AND with a NOT, so it can't make an OR\"",
      content:
        "Feed NAND with inverted inputs and De Morgan turns it into OR: $\\overline{\\bar A\\bar B} = A + B$. Together with NOT (a NAND with tied inputs) and AND (NAND then NOT), NAND alone builds every gate.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a gate's output depends on the order the inputs arrive\"",
      content:
        "A basic gate has no memory. Its output at any moment depends only on the input levels at that moment, through the truth table. (Circuits with memory, flip-flops, are built by feeding outputs back to inputs, which is beyond this chapter.)",
    },
    {
      type: "quiz",
      id: "omp5-7-q1",
      variant: "concept",
      question: "A gate's output is 1 only when both inputs are 0. Which gate is it?",
      options: [
        { text: "NOR", correct: true, feedback: "NOR is 1 only when the OR is 0, i.e. both inputs 0." },
        { text: "NAND", feedback: "NAND is 0 only when both inputs are 1; it is 1 in three rows." },
        { text: "AND", feedback: "AND is 1 only when both inputs are 1." },
        { text: "XOR", feedback: "XOR is 0 when both inputs are 0." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-7-q2",
      variant: "practice",
      question: "A and B each pass through a NOT gate, and the two outputs feed a NAND gate. What is Y?",
      options: [
        { text: "$AB$ (AND)", feedback: "That would need a NOR fed with the inverted inputs." },
        { text: "$\\overline{A + B}$ (NOR)", feedback: "Check $A = 1, B = 0$: $\\bar A\\bar B = 0$, NAND gives 1, but NOR would give 0." },
        { text: "$A + B$ (OR)", correct: true, feedback: "$\\overline{\\bar A\\cdot\\bar B} = A + B$ by De Morgan." },
        { text: "$\\overline{AB}$ (NAND)", feedback: "The input NOTs change the function. Try $A = B = 0$: NAND of $(1, 1)$ is 0, not 1." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-7-q3",
      variant: "practice",
      question: "The output of a NAND gate is fed into a NOT gate. What is the combination equivalent to?",
      options: [
        { text: "OR", feedback: "Inverting NAND undoes the bubble and leaves AND." },
        { text: "NOR", feedback: "NOR is inverted OR, not inverted NAND." },
        { text: "NAND", feedback: "The NOT inverts the NAND output, so it is no longer NAND." },
        { text: "AND", correct: true, feedback: "$\\overline{\\overline{AB}} = AB$." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-7-q4",
      variant: "concept",
      question: "Which identity is one of De Morgan's laws?",
      options: [
        { text: "$\\overline{AB} = \\bar A\\,\\bar B$", feedback: "At $A = 1, B = 0$: left is 1, right is $0\\cdot1 = 0$. Inverting a product turns AND into OR." },
        { text: "$\\overline{AB} = \\bar A + \\bar B$", correct: true, feedback: "Check $A = 1, B = 0$: left $\\overline{0} = 1$, right $0 + 1 = 1$. ✓ In all four rows they agree." },
        { text: "$\\overline{A + B} = \\bar A + \\bar B$", feedback: "At $A = 1, B = 0$: left is 0, right is 1." },
        { text: "$\\overline{A + B} = A\\,B$", feedback: "At $A = B = 0$: left is 1, right is 0." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-7-q5",
      variant: "practice",
      question: "For inputs $A = 1$, $B = 1$, what is the output of an XOR gate followed by a NOT gate?",
      options: [
        { text: "0", feedback: "That is the XOR output before the NOT gate." },
        { text: "It depends on which input changed last.", feedback: "Basic gates have no memory." },
        { text: "1", correct: true, feedback: "XOR of equal inputs is 0; NOT makes it 1. (XOR + NOT is XNOR, an \"equality detector\".)" },
        { text: "Undefined, because XOR needs different inputs", feedback: "XOR is defined for all inputs; it gives 0 when they are equal." },
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
      type: "callout",
      variant: "info",
      title: "The chapter in seven lines",
      content:
        "1. Bands: metals overlap, insulators $E_g > 3$ eV, semiconductors $\\sim1$ eV; photons need $h\\nu \\ge E_g$, $\\lambda_{\\max} = 1240/E_g$ nm.\n2. Doping: donors give n-type, acceptors p-type; $n_en_h = n_i^2$; $\\sigma = e(n_e\\mu_e + n_h\\mu_h)$.\n3. Junction: diffusion builds a depletion layer and barrier (0.7 V Si, 0.3 V Ge); forward bias conducts, reverse bias blocks.\n4. Rectifiers: half-wave keeps $f$, full-wave doubles it; averages $V_m/\\pi$, $2V_m/\\pi$.\n5. Zener: $I_Z = I_S - I_L$ keeps $V_L = V_Z$; LED $\\lambda \\approx 1240/E_g$; photodiode reverse biased; solar cell in the 4th quadrant.\n6. Transistor: $I_E = I_B + I_C$, $\\beta = \\alpha/(1 - \\alpha)$, $A_v = -\\beta R_C/R_B$.\n7. Gates: truth tables, De Morgan, NAND and NOR are universal.",
    },
    {
      type: "text",
      content: "No formula sheet below. Use $hc = 1240$ eV·nm and $e = 1.6\\times10^{-19}$ C.",
    },
    {
      type: "quiz",
      id: "omp5-8-q1",
      variant: "mastery",
      question: "Light of wavelength 800 nm falls on Si ($E_g = 1.1$ eV), GaAs ($1.43$ eV) and CdS ($2.42$ eV) photodetectors. Which respond?",
      options: [
        { text: "Si and GaAs only", correct: true, feedback: "$1240/800 = 1.55$ eV, above 1.1 and 1.43 eV but below 2.42 eV." },
        { text: "All three", feedback: "CdS needs photons of at least 2.42 eV (below 512 nm)." },
        { text: "Si only", feedback: "GaAs's 1.43 eV is also below the photon's 1.55 eV." },
        { text: "CdS only, because it has the largest gap", feedback: "A larger gap needs *more* energetic photons, not fewer." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-8-q2",
      variant: "mastery",
      question: "A semiconductor with $n_i = 10^{16}$ m⁻³ is doped so that $n_e = 10^{22}$ m⁻³. Find $n_h$ and name the type.",
      options: [
        { text: "$10^{10}$ m⁻³; p-type", feedback: "The number is right, but electrons are the majority carriers, so it is n-type." },
        { text: "$10^{6}$ m⁻³; n-type", feedback: "That divides $n_i$, not $n_i^2$, by $n_e$." },
        { text: "$10^{10}$ m⁻³; n-type", correct: true, feedback: "$n_h = 10^{32}/10^{22} = 10^{10}$; electrons are the majority." },
        { text: "$10^{22}$ m⁻³; intrinsic", feedback: "$n_e = n_h$ holds only for intrinsic material, and here $n_e \\gg n_i$." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-8-q3",
      variant: "mastery",
      question: "A 12 V battery feeds two parallel branches. Branch 1: a silicon diode (0.7 V) forward biased in series with 4 Ω. Branch 2: an identical diode reverse biased in series with 2 Ω. Find the battery current.",
      options: [
        { text: "About 2.83 A", correct: true, feedback: "Only branch 1 conducts: $(12 - 0.7)/4 = 2.825$ A." },
        { text: "3 A", feedback: "That treats the diode as ideal. Subtract its 0.7 V drop." },
        { text: "About 8.48 A", feedback: "That lets both branches conduct. The reverse-biased diode blocks branch 2." },
        { text: "About 5.65 A", feedback: "That is branch 2's current if *it* conducted. Its diode is reverse biased." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-8-q4",
      variant: "mastery",
      question: "A bridge rectifier is fed with 50 Hz ac of peak 20 V (ideal diodes). What are the output ripple frequency and the PIV of each diode?",
      options: [
        { text: "100 Hz and 40 V", feedback: "$2V_m$ is the PIV of a centre-tap rectifier, not a bridge." },
        { text: "50 Hz and 20 V", feedback: "A bridge is full-wave, so the ripple is at 100 Hz." },
        { text: "50 Hz and 40 V", feedback: "Both numbers belong to other circuits: 50 Hz is half-wave, $2V_m$ is centre-tap." },
        { text: "100 Hz and 20 V", correct: true, feedback: "Full-wave doubles the frequency; in a bridge each blocking diode sees $V_m$." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-8-q5",
      variant: "mastery",
      question: "A Zener regulator has $V_S = 20$ V, $V_Z = 12$ V and $R_S = 400\\ \\Omega$. What is the smallest load resistance for which the output stays at 12 V?",
      options: [
        { text: "$1000\\ \\Omega$", feedback: "That is $20/0.020$, using the supply voltage instead of $V_Z$ across the load." },
        { text: "$600\\ \\Omega$", correct: true, feedback: "$I_S = 8/400 = 20$ mA; the load may take all of it at most: $R_L \\ge 12/0.020 = 600\\ \\Omega$." },
        { text: "$400\\ \\Omega$", feedback: "That is $R_S$. With $R_L = 400\\ \\Omega$ the load would need 30 mA, more than the 20 mA available." },
        { text: "$240\\ \\Omega$", feedback: "That takes $I_S = 20/400 = 50$ mA, putting the whole supply across $R_S$. Only $V_S - V_Z = 8$ V is across it, so $I_S = 20$ mA." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-8-q6",
      variant: "mastery",
      question: "In a Zener regulator ($V_Z = 10$ V, $R_S = 250\\ \\Omega$, $R_L = 1$ kΩ), the unregulated input varies from 15 V to 20 V. Over what range does the Zener current vary?",
      options: [
        { text: "20 mA to 40 mA", feedback: "That is the range of $I_S$. Subtract the 10 mA the load takes." },
        { text: "10 mA to 30 mA", correct: true, feedback: "$I_S$ goes from $5/250 = 20$ mA to $10/250 = 40$ mA; $I_L = 10$ mA throughout; $I_Z = I_S - 10$ mA." },
        { text: "60 mA to 80 mA", feedback: "That is $V_S/R_S$: it puts the full input across $R_S$ and forgets the load current. The resistor only gets $V_S - V_Z$." },
        { text: "It stays at 10 mA.", feedback: "The *load* current is constant; the Zener absorbs every change in the supply current." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-8-q7",
      variant: "mastery",
      question: "An LED is made from a material with band gap 1.9 eV. What colour does it emit?",
      options: [
        { text: "Blue (about 450 nm)", feedback: "Blue needs about 2.75 eV." },
        { text: "Infrared (about 1127 nm)", feedback: "That is silicon's 1.1 eV gap." },
        { text: "Green (about 530 nm)", feedback: "Green needs about 2.3 eV." },
        { text: "Red (about 653 nm)", correct: true, feedback: "$1240/1.9 \\approx 653$ nm." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-8-q8",
      variant: "mastery",
      question: "A transistor with $\\alpha = 0.98$ is used in a common-emitter amplifier with $R_C = 4$ kΩ and $R_B = 1$ kΩ. A 10 mV signal is applied. What is the output amplitude?",
      options: [
        { text: "About 1.96 V", correct: true, feedback: "$\\beta = 0.98/0.02 = 49$; $|A_v| = 49\\times4 = 196$; $196\\times10$ mV $= 1.96$ V." },
        { text: "About 39 mV", feedback: "That uses $\\alpha$ as the gain: $0.98\\times4\\times10$ mV. The common-emitter current gain is $\\beta$." },
        { text: "About 2.0 V", feedback: "That takes $\\beta = 50$, i.e. $1/(1 - \\alpha)$. The correct value is $\\alpha/(1-\\alpha) = 49$." },
        { text: "About 0.49 V", feedback: "That leaves out the resistor ratio $R_C/R_B = 4$." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-8-q9",
      variant: "mastery",
      question: "An npn switch has $V_{CC} = 10$ V, $R_C = 2$ kΩ and $\\beta = 50$. What minimum base current drives it into saturation?",
      options: [
        { text: "$5$ mA", feedback: "That is the saturation collector current. Divide by $\\beta$." },
        { text: "$250$ mA", feedback: "That multiplies by $\\beta$ instead of dividing." },
        { text: "$100$ μA", correct: true, feedback: "$I_{C,\\text{sat}} \\approx 10/2000 = 5$ mA; $I_B \\ge 5\\text{ mA}/50 = 100$ μA." },
        { text: "$200$ μA", feedback: "That uses $R_C = 1$ kΩ. With 2 kΩ the saturation current is 5 mA." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-8-q10",
      variant: "mastery",
      question: "Two NOR gates, each with its inputs tied together, invert A and B; their outputs feed a third NOR gate. The output is",
      options: [
        { text: "$A + B$ (OR)", feedback: "Inverted inputs into NAND give OR; into NOR they give AND." },
        { text: "$\\overline{AB}$ (NAND)", feedback: "Check $A = B = 0$: $\\bar A = \\bar B = 1$, NOR gives 0, but NAND would give 1." },
        { text: "$A\\oplus B$ (XOR)", feedback: "Check $A = B = 1$: $\\bar A = \\bar B = 0$, NOR gives 1, but XOR gives 0." },
        { text: "$AB$ (AND)", correct: true, feedback: "$\\overline{\\bar A + \\bar B} = AB$ by De Morgan." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-8-q11",
      variant: "mastery",
      question: "A and B feed an OR gate and a NAND gate; the two outputs feed an AND gate. The circuit is equivalent to a single",
      options: [
        { text: "OR gate", feedback: "At $A = B = 1$ the NAND gives 0, so the output is 0, not 1." },
        { text: "XOR gate", correct: true, feedback: "$(A + B)\\overline{AB}$ is 1 exactly when one input is 1 and the other 0." },
        { text: "NAND gate", feedback: "At $A = B = 0$ the OR gives 0, so the output is 0, not 1." },
        { text: "AND gate", feedback: "At $A = B = 1$ the output is 0." },
      ],
    },
    {
      type: "quiz",
      id: "omp5-8-q12",
      variant: "mastery",
      question: "Which statement about p-n junction devices is correct?",
      options: [
        { text: "A Zener diode is used in forward bias to regulate voltage.", feedback: "Regulation uses reverse breakdown." },
        { text: "An LED emits photons of energy much larger than its band gap.", feedback: "Recombination across the gap gives photons of energy about $E_g$." },
        { text: "A photodiode is reverse biased, an LED forward biased, and a solar cell needs no bias.", correct: true, feedback: "Detector, emitter and source respectively." },
        { text: "A solar cell works in the first quadrant of its I–V curve.", feedback: "It delivers power in the fourth quadrant." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Course complete",
      content:
        "From a ray bouncing off a mirror to a transistor switching a gate: rays when everything is large, waves when apertures meet wavelengths, photons when light meets electrons, and bands when atoms crowd into crystals. Every result in this course can be rebuilt from those few pictures and conservation of energy.",
    },
  ]),
};

export const ompChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
