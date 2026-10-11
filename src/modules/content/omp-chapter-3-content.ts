import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Optics and Modern Physics Chapter 3 — Dual Nature of Radiation and Matter.
 * Light delivers energy in lumps: photons with E = hν and p = h/λ. The
 * photoelectric effect's four laws, Einstein's one-photon-one-electron
 * equation and every graph it produces, then the reverse idea: matter has a
 * wavelength λ = h/p, confirmed by Davisson and Germer.
 * Constants: hc = 1240 eV·nm, h = 6.63×10⁻³⁴ J·s, e = 1.6×10⁻¹⁹ C,
 * c = 3×10⁸ m/s, m_e = 9.1×10⁻³¹ kg.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "photons",
  title: "3.1 · Photons: Energy and Momentum in Packets",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/omp-3-dual-nature-of-radiation-and-matter.mp4",
      poster: "/videos/omp-3-dual-nature-of-radiation-and-matter.jpg",
      title: "Chapter 3 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Stand in front of a 100 W red lamp for an hour and you get warm, nothing more. Stand in weak midday sunlight for the same hour and the ultraviolet part, carrying far less power than the lamp, can burn your skin. If light were a smooth wave that simply poured energy onto you, the lamp should win easily. It does not, and the reason is that light arrives in **packets**, and what damages a molecule is the energy in one packet, not the total flow.",
    },
    {
      type: "text",
      content:
        "A molecule in your skin needs a few electron-volts delivered *at once* to break a bond. A red packet carries less than 2 eV, so no number of red packets does it: each one is individually too weak, and they do not team up. An ultraviolet packet carries 4 to 5 eV, enough by itself. More power just means more packets per second. The *size* of each packet is set by the colour alone.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The photon",
      content:
        "Light of frequency $\\nu$ (wavelength $\\lambda = c/\\nu$) is delivered as photons, each carrying energy and momentum\n$E = h\\nu = \\dfrac{hc}{\\lambda}, \\qquad p = \\dfrac{h}{\\lambda} = \\dfrac{E}{c}$\nwhere $h = 6.63\\times10^{-34}$ J·s is Planck's constant. A photon travels at $c$, has zero rest mass, and is absorbed or emitted whole: never half a photon.",
    },
    { type: "heading", text: "Photon energy in electron-volts" },
    {
      type: "text",
      content:
        "**The two knobs of a light source.** Frequency (colour) fixes the energy of *each* photon. Power (brightness) fixes *how many* photons arrive per second. Keep these two apart and most of this chapter is already solved.",
    },
    {
      type: "text",
      content:
        "**A number you will use all chapter.** Joules are awkward for single photons, so we use the electron-volt: $1$ eV $= 1.6\\times10^{-19}$ J, the energy an electron gains falling through 1 V. Put $\\lambda$ in nanometres and work out $hc/e$ once:",
    },
    {
      type: "math",
      latex:
        "E(\\text{eV}) = \\frac{hc}{e\\,\\lambda} = \\frac{6.63\\times10^{-34}\\times3\\times10^{8}}{1.6\\times10^{-19}\\times\\lambda(\\text{nm})\\times10^{-9}} \\approx \\frac{1243}{\\lambda(\\text{nm})} \\approx \\frac{1240}{\\lambda(\\text{nm})}",
    },
    {
      type: "text",
      content:
        "(More precise constants give 1239.8, so everybody uses $hc = 1240$ eV·nm.) Slide the wavelength below and read off the photon energy.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "1240/x",
        exprLatex: "E = \\frac{1240}{\\lambda\\,(\\text{nm})}\\ \\text{eV}",
        min: 100,
        max: 1000,
        step: 10,
        initial: 500,
        inputLabel: "λ",
        outputLabel: "E (eV)",
        inputUnit: "nm",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: halving the wavelength doubles the energy ($620$ nm gives 2.0 eV, $310$ nm gives 4.0 eV). Visible light runs from about 1.8 eV (700 nm, red) to 3.1 eV (400 nm, violet); below 400 nm (ultraviolet) every photon carries more than 3.1 eV, which is bond-breaking territory.",
    },
    {
      type: "table",
      headers: ["Radiation", "Typical $\\lambda$", "Photon energy"],
      rows: [
        ["Infrared (heat lamp)", "1240 nm", "1.0 eV"],
        ["Red light", "620 nm", "2.0 eV"],
        ["Violet light", "400 nm", "3.1 eV"],
        ["Ultraviolet (UV-B)", "300 nm", "4.1 eV"],
        ["Soft X-ray", "1 nm", "1240 eV"],
      ],
    },
    { type: "heading", text: "Photon flux and radiation pressure" },
    {
      type: "text",
      content:
        "**How many photons? (derivation).** A source of power $P$ emits energy $P$ each second, and each photon carries $hc/\\lambda$. So the number per second is",
    },
    { type: "math", latex: "N = \\frac{P}{E} = \\frac{P\\lambda}{hc}" },
    {
      type: "text",
      content:
        "**How hard does light push? (derivation).** Each absorbed photon hands over momentum $p = h/\\lambda$. A beam of power $P$ delivers $N = P\\lambda/(hc)$ photons per second, so the momentum delivered per second, which is the force, is",
    },
    { type: "math", latex: "F_{\\text{absorb}} = N\\,\\frac{h}{\\lambda} = \\frac{P\\lambda}{hc}\\cdot\\frac{h}{\\lambda} = \\frac{P}{c}, \\qquad F_{\\text{reflect}} = \\frac{2P}{c}" },
    {
      type: "text",
      content:
        "A reflected photon arrives with $+p$ and leaves with $-p$, so it hands over $2p$, exactly like a ball bouncing off a wall (Mechanics II). Radiation pressure on a surface is $F/A$: $I/c$ for absorption and $2I/c$ for perfect reflection, where $I$ is the intensity in W/m².",
    },
    { type: "heading", text: "Worked examples: photon flux and momentum" },
    {
      type: "worked-example",
      id: "omp3-1-we1",
      title: "Worked example 1 (photon flux, JEE Main)",
      problem:
        "A 10 W lamp emits light of wavelength 600 nm. How many photons does it emit per second?",
      steps: [
        { text: "Energy of one photon: $E = \\dfrac{hc}{\\lambda} = \\dfrac{6.63\\times10^{-34}\\times3\\times10^8}{600\\times10^{-9}} = 3.315\\times10^{-19}$ J. *Why this step:* the count is power divided by the size of each packet, so the packet must be in joules to match watts." },
        { text: "Photons per second: $N = \\dfrac{P}{E} = \\dfrac{10}{3.315\\times10^{-19}} \\approx 3.0\\times10^{19}$ s⁻¹." },
        { text: "Check with eV: $E = 1240/600 = 2.07$ eV $= 3.31\\times10^{-19}$ J. ✓" },
      ],
      answer: "About $3.0\\times10^{19}$ photons per second.",
    },
    {
      type: "text",
      content:
        "Thirty billion billion photons a second: that is why ordinary light looks smooth.",
    },
    {
      type: "worked-example",
      id: "omp3-1-we2",
      title: "Worked example 2 (a solar sail)",
      problem:
        "1 kW of sunlight falls normally on a perfectly reflecting sail. Find the force.",
      steps: [
        { text: "Perfect reflection turns each photon's momentum round, so $F = \\dfrac{2P}{c}$. *Why this step:* $\\Delta p = 2p$ per photon, not $p$." },
        { text: "$F = \\dfrac{2\\times1000}{3\\times10^8} = 6.7\\times10^{-6}$ N." },
        { text: "Tiny, but it never stops and space has no friction, which is why sails are considered for deep-space probes." },
      ],
      answer: "$F \\approx 6.7\\times10^{-6}$ N",
    },
    {
      type: "worked-example",
      id: "omp3-1-we3",
      title: "Worked example 3 (momentum of one photon)",
      problem:
        "Find the momentum of a photon of wavelength 1240 nm.",
      steps: [
        { text: "$p = \\dfrac{h}{\\lambda} = \\dfrac{6.63\\times10^{-34}}{1.24\\times10^{-6}} \\approx 5.3\\times10^{-28}$ kg·m/s." },
        { text: "Check with $p = E/c$: the energy is $1240/1240 = 1$ eV $= 1.6\\times10^{-19}$ J, and $\\dfrac{1.6\\times10^{-19}}{3\\times10^8} = 5.3\\times10^{-28}$. ✓ *Why this step:* $E = pc$ for a photon is a second route that catches a slipped power of ten." },
      ],
      answer: "$p \\approx 5.3\\times10^{-28}$ kg·m/s",
    },
    {
      type: "worked-example",
      id: "omp3-1-we4",
      title: "Worked example 4 (why UV burns and red does not)",
      problem:
        "A skin molecule needs 4.0 eV to break. Compare one 250 nm photon with one 700 nm photon.",
      steps: [
        { text: "$E_{250} = 1240/250 = 4.96$ eV $> 4.0$ eV: one photon can break the bond." },
        { text: "$E_{700} = 1240/700 = 1.77$ eV $< 4.0$ eV: one photon cannot." },
        { text: "A photon is absorbed whole by one molecule, and a molecule almost never collects two photons before the first one's energy leaks away as heat. *Why this step:* this is the step the wave picture misses; energy does not pile up on one molecule, so no brightness of red can do what a single UV photon does." },
      ],
      answer: "The 250 nm photon (4.96 eV) can break the bond; the 700 nm photon (1.77 eV) cannot.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"brighter light means more energetic photons\"",
      content:
        "Brightness is the *number* of photons per second. The energy of each photon is $h\\nu$, fixed by the colour. A 100 W red lamp and a 1 W red laser pointer emit photons of exactly the same energy; the lamp just emits a hundred times more of them.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a photon has no momentum because it has no mass\"",
      content:
        "$p = mv$ is the low-speed formula for massive particles. For light the relation is $p = E/c = h/\\lambda$. Radiation pressure is real: it pushes comet tails away from the Sun and was measured in the lab in 1901.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "omp3-1-q1",
      variant: "practice",
      question: "What is the energy of a 400 nm photon, in eV? Use $hc = 1240$ eV·nm.",
      answer: 3.1,
      relTolerance: 0.01,
      unit: "eV",
      hint: "$E = hc/\\lambda$, with $\\lambda$ in nm gives eV directly.",
      solution: "$E = \\dfrac{1240}{400} = 3.1$ eV, the violet end of the visible spectrum.",
      commonMistakes: [
        { answer: 0.31, feedback: "A decimal slip: $1240/400 = 3.1$, not $0.31$." },
        { answer: 4.96e-19, feedback: "$4.96\\times10^{-19}$ is about the energy in *joules* ($3.1 \\times 1.6\\times10^{-19}$). In eV it is simply 3.1." },
        { answer: 1.55, feedback: "That is the energy of an 800 nm photon. Energy goes as $1/\\lambda$, so shorter wavelength means more energy." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-1-q2",
      variant: "concept",
      question: "A red lamp's power is doubled without changing its colour. What happens to its photons?",
      options: [
        { text: "Each photon carries twice the energy.", feedback: "Photon energy is $hc/\\lambda$ and the colour, so $\\lambda$, is unchanged." },
        { text: "The photons travel faster.", feedback: "All photons travel at $c$ in vacuum." },
        { text: "The wavelength halves.", feedback: "Wavelength is the colour. Power has nothing to do with it." },
        { text: "Twice as many photons per second, each with the same energy.", correct: true, feedback: "$N = P\\lambda/hc$ doubles with $P$; $E = hc/\\lambda$ does not change." },
      ],
      hint: "What does the colour of the light fix about each photon? Then think about what doubling the power must change.",
    },
    {
      type: "numeric",
      id: "omp3-1-q3",
      variant: "practice",
      question: "A 1 mW laser emits light of wavelength 620 nm. How many photons does it emit per second? Use $hc = 1240$ eV·nm and $1$ eV $= 1.6\\times10^{-19}$ J. (Scientific notation such as 2.5e15 is fine.)",
      answer: 3.125e15,
      relTolerance: 0.02,
      unit: "photons/s",
      hint: "Photon energy in eV, then in joules, then divide the power by it.",
      solution: "$E = \\dfrac{1240}{620} = 2$ eV $= 3.2\\times10^{-19}$ J.\n\n$N = \\dfrac{P}{E} = \\dfrac{10^{-3}}{3.2\\times10^{-19}} \\approx 3.1\\times10^{15}$ photons per second.",
      commonMistakes: [
        { answer: 3.125e18, feedback: "That uses 1 W. A milliwatt is $10^{-3}$ W." },
        { answer: 5e-4, feedback: "That divides the power by 2 eV without converting eV to joules." },
        { answer: 6.25e15, feedback: "That uses $1.6\\times10^{-19}$ J per photon, which is a 1 eV photon. A 620 nm photon carries 2 eV." },
      ],
    },
    {
      type: "numeric",
      id: "omp3-1-q4",
      variant: "practice",
      question: "A 3 W beam falls normally on a perfectly absorbing black surface. What force does it exert, in newtons? ($c = 3\\times10^8$ m/s)",
      answer: 1e-8,
      relTolerance: 0.01,
      unit: "N",
      hint: "Force is momentum delivered per second. Each absorbed photon delivers $p = E/c$.",
      solution: "For a perfect absorber, $F = \\dfrac{P}{c} = \\dfrac{3}{3\\times10^8} = 10^{-8}$ N.",
      commonMistakes: [
        { answer: 2e-8, feedback: "That is $2P/c$, the answer for a perfect *reflector*. An absorber takes $p$ per photon, not $2p$." },
        { answer: 9e8, feedback: "That multiplies $P$ by $c$. Force is momentum per second, $P/c$." },
        { answer: 0, feedback: "Photons have no mass but do carry momentum $E/c$; absorbing them transfers it." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-1-q5",
      variant: "concept",
      question: "Photon A has twice the wavelength of photon B. Compare their momenta.",
      options: [
        { text: "$p_A = 2p_B$", feedback: "Momentum is $h/\\lambda$: a longer wavelength means *less* momentum." },
        { text: "$p_A = p_B$, since both travel at $c$", feedback: "Same speed, but momentum depends on energy: $p = E/c$, and the energies differ." },
        { text: "$p_A = p_B/4$", feedback: "There is no square: $p \\propto 1/\\lambda$." },
        { text: "$p_A = p_B/2$", correct: true, feedback: "$p = h/\\lambda$, so doubling $\\lambda$ halves $p$ (and halves $E$ too)." },
      ],
      hint: "Recall how a photon's momentum depends on its wavelength (3.1).",
    },
    {
      type: "quiz",
      id: "omp3-1-q6",
      variant: "concept",
      multiple: true,
      question: "Select every correct statement about photons. (Use $hc = 1240$ eV·nm.)",
      options: [
        { text: "A photon of wavelength 620 nm carries 2 eV.", correct: true, feedback: "$1240/620 = 2.0$ eV." },
        { text: "A photon's momentum is $E/c$, even though its rest mass is zero.", correct: true, feedback: "$p = E/c = h/\\lambda$. That momentum is what produces radiation pressure." },
        { text: "Doubling the power of a red lamp doubles the energy of each photon it emits.", feedback: "Power sets the number of photons per second. Each photon's energy $hc/\\lambda$ is fixed by the colour." },
        { text: "A bright enough red lamp can break a 4 eV bond in one molecule, because the photons' energies add up.", feedback: "Each red photon (under 2 eV) is absorbed whole by one molecule, and the energy leaks away long before a second photon arrives. Only a single photon of at least 4 eV can do it." },
      ],
      hint: "Keep the two knobs apart: colour fixes each photon's energy, power fixes how many.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "photoelectric-effect",
  title: "3.2 · The Photoelectric Effect: What Is Observed",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 1888 Wilhelm Hallwachs charged a clean zinc plate negatively and connected it to an electroscope, whose leaves spread apart. He shone ultraviolet light on the plate and the leaves collapsed within moments: the plate was losing electrons. He then tried a much stronger lamp with no ultraviolet in it. Nothing happened, however long he waited. Light was knocking electrons out of the metal, but only light of the right colour.",
    },
    { type: "heading", text: "Measuring the effect in a vacuum tube" },
    {
      type: "text",
      content:
        "To measure the effect properly, Lenard sealed two plates in an evacuated tube. Light falls on the **emitter** (a metal plate, the cathode). A second plate, the **collector**, is held at a potential $V$ relative to the emitter by a battery and a rheostat, and a microammeter reads the current. With $V > 0$ the collector attracts the emitted electrons; with $V < 0$ it repels them, and only electrons with enough kinetic energy climb the retarding potential and arrive.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Stopping potential and saturation current",
      content:
        "**Saturation current:** at large positive $V$ every emitted electron is collected, so the current stops rising.\n**Stopping potential** $V_0$: the retarding potential at which the current just drops to zero. It stops even the fastest electrons, so $eV_0 = K_{\\max}$.\n**Work function** $\\phi$: the least energy needed to pull an electron out of the metal's surface. It is a property of the metal.",
    },
    { type: "heading", text: "Four laws from the experiment" },
    {
      type: "text",
      content:
        "Now run the experiment yourself. Pick a metal, set the wavelength and brightness, and sweep the collector voltage. The graph traces the current against $V$, and the tube shows the electrons: the dashed ones turn back before reaching the collector.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-quantum-lab",
        mode: "photoelectric",
        wavelength: { min: 150, max: 700, step: 5, initial: 400 },
        intensity: { min: 0, max: 100, step: 5, initial: 60 },
        voltage: { min: -5, max: 5, step: 0.1, initial: 0 },
        caption:
          "Four experiments: (1) on Sodium, raise λ past about 450 nm; (2) at 300 nm, turn the intensity down to 5% and back up; (3) at 300 nm, find V₀ at 20% and at 100% intensity; (4) change λ and watch V₀ move.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen, one law per experiment:\n\n1. **Threshold.** Above about 451 nm on sodium no electrons come out at all, at any brightness. Below it they come out.\n2. **No delay.** Even at the dimmest setting, emission starts the instant the light arrives. Dim light gives few electrons, never late ones.\n3. **Current ∝ intensity; stopping potential unchanged.** Brighter light raises the saturation current, but the current still dies at the same $V_0$.\n4. **Stopping potential rises with frequency.** Shorter wavelength (higher frequency) gives a larger stopping potential.",
    },
    {
      type: "table",
      headers: ["Observation", "What the wave theory predicts", "What actually happens"],
      rows: [
        ["Threshold frequency", "Any colour works if bright enough or given enough time", "Below $\\nu_0$ nothing, however bright or long"],
        ["Time lag", "Dim light needs time for energy to build up on an electron", "Emission within $10^{-9}$ s, even for very dim light"],
        ["Effect of intensity", "Brighter light = stronger wave = faster electrons", "Brighter light = more electrons, same $K_{\\max}$"],
        ["Effect of frequency", "Frequency should not matter much", "$K_{\\max}$ (and $V_0$) increase linearly with $\\nu$"],
      ],
    },
    {
      type: "text",
      content:
        "Every row is a failure of the idea that light energy arrives smoothly and spreads over the surface. Every row is natural if light arrives as photons and **one photon is absorbed by one electron**: a photon either has enough energy ($h\\nu > \\phi$) or it does not; it delivers its energy at once; brightness is a photon count, so it sets the electron count; and the electron's energy is set by the photon's energy, which is set by $\\nu$. Lesson 3.3 turns this into an equation.",
    },
    { type: "heading", text: "Work functions of common metals" },
    {
      type: "table",
      headers: ["Metal", "Work function $\\phi$ (eV)", "Threshold $\\lambda_0 = 1240/\\phi$"],
      rows: [
        ["Caesium", "2.14", "579 nm (yellow)"],
        ["Potassium", "2.30", "539 nm (green)"],
        ["Sodium", "2.75", "451 nm (blue)"],
        ["Calcium", "3.20", "388 nm (UV)"],
        ["Copper", "4.65", "267 nm (UV)"],
        ["Platinum", "5.65", "219 nm (UV)"],
      ],
    },
    {
      type: "text",
      content:
        "The alkali metals hold their outer electron loosely, so visible light works on them; that is why old photocells used caesium. Zinc ($\\phi \\approx 4.3$ eV) needs ultraviolet, which is exactly what Hallwachs found.",
    },
    {
      type: "worked-example",
      id: "omp3-2-we1",
      title: "Worked example 1 (which metals respond?)",
      problem:
        "Light of wavelength 500 nm falls on caesium, potassium, sodium and copper. Which emit electrons?",
      steps: [
        { text: "Photon energy: $E = 1240/500 = 2.48$ eV. *Why this step:* emission is decided photon by photon, so compare one photon's energy with $\\phi$." },
        { text: "Compare: Cs ($2.14 < 2.48$) yes; K ($2.30 < 2.48$) yes; Na ($2.75 > 2.48$) no; Cu ($4.65$) no." },
        { text: "So only caesium and potassium emit. Making the light brighter would not change the list." },
      ],
      answer: "Only caesium and potassium.",
    },
    {
      type: "worked-example",
      id: "omp3-2-we2",
      title: "Worked example 2 (threshold wavelength of sodium)",
      problem:
        "Sodium has $\\phi = 2.75$ eV. Find its threshold wavelength. Which wavelengths eject electrons?",
      steps: [
        { text: "At threshold the photon energy just equals the work function: $hc/\\lambda_0 = \\phi$." },
        { text: "$\\lambda_0 = \\dfrac{1240}{2.75} \\approx 451$ nm." },
        { text: "Wavelengths *shorter* than 451 nm eject electrons; longer ones do not. *Why this step:* it is easy to get the inequality backwards, and energy falls as $\\lambda$ rises." },
      ],
      answer: "$\\lambda_0 \\approx 451$ nm; only shorter wavelengths eject electrons.",
    },
    { type: "heading", text: "Why the wave theory fails" },
    {
      type: "worked-example",
      id: "omp3-2-we3",
      title: "Worked example 3 (how long would the wave theory make us wait?)",
      problem:
        "Dim light of intensity $10^{-5}$ W/m² falls on potassium ($\\phi = 2.3$ eV). Suppose, as the wave theory would, that an electron soaks up the energy falling on an area of about one atom, $10^{-19}$ m². How long before it has 2.3 eV?",
      steps: [
        { text: "Power reaching that area: $10^{-5}\\times10^{-19} = 10^{-24}$ W." },
        { text: "Energy needed: $2.3\\times1.6\\times10^{-19} = 3.7\\times10^{-19}$ J." },
        { text: "Time: $\\dfrac{3.7\\times10^{-19}}{10^{-24}} = 3.7\\times10^{5}$ s, about four days. *Why this step:* putting a number on the prediction makes the failure undeniable." },
        { text: "Experiment: emission within about $10^{-9}$ s. Energy does not trickle in; it arrives in one photon." },
      ],
      answer: "About $3.7\\times10^5$ s (four days), against the observed $10^{-9}$ s.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"dim red light will eject electrons if you wait long enough\"",
      content:
        "Each red photon is absorbed by one electron and gives it less than $\\phi$. The electron shares that energy with the metal as heat within a tiny fraction of a second, long before a second photon could arrive at the same electron. Waiting does not help and neither does more red light. Only a shorter wavelength does.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"brighter light gives faster electrons\"",
      content:
        "Brighter light means more photons, so more electrons, so a larger saturation current. Each electron still gets one photon's energy, so $K_{\\max}$ and $V_0$ are unchanged. You saw this in the lab: the curve grew taller but crossed zero at the same voltage.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "omp3-2-q1",
      variant: "concept",
      question: "Light below the threshold frequency falls on a metal. The intensity is increased tenfold. What happens?",
      options: [
        { text: "Electrons are emitted, but slowly.", feedback: "Below threshold, each photon is too weak; more photons do not add up on one electron." },
        { text: "No electrons are emitted.", correct: true, feedback: "Emission depends on $h\\nu$ versus $\\phi$, not on the number of photons." },
        { text: "Electrons are emitted after a time delay that shrinks as intensity rises.", feedback: "That is the wave-theory prediction that failed. There is no accumulation." },
        { text: "Electrons are emitted with ten times the kinetic energy.", feedback: "Nothing is emitted at all below threshold." },
      ],
      hint: "Recall what intensity changes and what frequency changes in a beam of photons (3.2), and what a single electron needs in order to escape.",
    },
    {
      type: "numeric",
      id: "omp3-2-q2",
      variant: "practice",
      question: "The work function of calcium is 3.2 eV. What is its threshold wavelength, in nm? Use $hc = 1240$ eV·nm.",
      answer: 387.5,
      relTolerance: 0.01,
      unit: "nm",
      hint: "At threshold the photon energy just equals the work function: $hc/\\lambda_0 = \\phi$.",
      solution: "$\\lambda_0 = \\dfrac{1240}{\\phi} = \\dfrac{1240}{3.2} = 387.5 \\approx 388$ nm, in the near ultraviolet.",
      commonMistakes: [
        { answer: 3968, feedback: "That multiplies 1240 by 3.2. The threshold is $1240/\\phi$." },
        { answer: 0.3875, feedback: "The digits are right but the unit is not: with $hc = 1240$ eV·nm, $1240/3.2 = 388$ comes out directly in nanometres." },
        { answer: 451, feedback: "That is sodium's threshold ($\\phi = 2.75$ eV)." },
      ],
    },
    {
      type: "numeric",
      id: "omp3-2-q3",
      variant: "practice",
      question: "Light of wavelength 450 nm falls in turn on Cs (2.14 eV), K (2.30 eV), Na (2.75 eV) and Ca (3.20 eV). How many of the four metals emit electrons? Use $hc = 1240$ eV·nm.",
      answer: 3,
      hint: "Compare one photon's energy with each work function.",
      solution: "The photon energy is $1240/450 = 2.76$ eV. It beats 2.14 eV (Cs), 2.30 eV (K) and, just, 2.75 eV (Na), but not 3.20 eV (Ca). So **3** metals emit.",
      commonMistakes: [
        { answer: 4, feedback: "The photon energy is $1240/450 = 2.76$ eV, less than calcium's 3.20 eV." },
        { answer: 2, feedback: "Sodium's 2.75 eV is just below $1240/450 = 2.76$ eV, so sodium emits (barely)." },
        { answer: 0, feedback: "Visible photons carry 1.8–3.1 eV, more than the alkali metals' work functions." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-2-q4",
      variant: "concept",
      question: "In the Lenard tube, what does the stopping potential tell you directly?",
      options: [
        { text: "The number of electrons emitted per second", feedback: "That is shown by the saturation current." },
        { text: "The work function of the metal", feedback: "$V_0$ also depends on the light's frequency; $\\phi$ is found from $V_0$ and $h\\nu$ together." },
        { text: "The maximum kinetic energy of the emitted electrons: $K_{\\max} = eV_0$", correct: true, feedback: "The retarding potential that stops the fastest electrons measures their kinetic energy." },
        { text: "The intensity of the light", feedback: "Intensity changes the current, not $V_0$." },
      ],
      hint: "Recall how the stopping potential is defined in 3.2: which electrons does it just turn back, and what energy balance follows?",
    },
    {
      type: "quiz",
      id: "omp3-2-q5",
      variant: "concept",
      question: "Which observation most directly shows that light energy is not spread smoothly over the metal surface?",
      options: [
        { text: "Emission starts with no measurable delay even in very dim light.", correct: true, feedback: "A smooth wave would need hours or days to deliver $\\phi$ to one electron. The energy must arrive in one lump." },
        { text: "The current rises with intensity.", feedback: "The wave theory also predicts more effect from a stronger wave. This fact does not distinguish the models." },
        { text: "The emitter must be in a vacuum.", feedback: "The vacuum just lets electrons reach the collector without hitting gas molecules." },
        { text: "The collector must be positive to collect all electrons.", feedback: "That is about collecting the electrons, not how the light delivered its energy." },
      ],
      hint: "On the wave picture, dim light would need time to pile up enough energy in one electron. Which observation contradicts that?",
    },
    {
      type: "quiz",
      id: "omp3-2-q6",
      variant: "concept",
      multiple: true,
      question: "Select every photoelectric observation that the classical wave theory of light **cannot** explain.",
      options: [
        { text: "Below a threshold frequency no electrons are emitted, however intense the light.", correct: true, feedback: "A wave of any frequency carries more energy when it is more intense, so the wave theory expects emission eventually." },
        { text: "Emission begins with no measurable delay, even in very dim light.", correct: true, feedback: "A smooth wave would need hours or days to deliver $\\phi$ to one electron (Worked example 3)." },
        { text: "The maximum kinetic energy of the electrons does not depend on the intensity.", correct: true, feedback: "The wave theory says a stronger wave should shake electrons out faster. Experiment says intensity changes only their number." },
        { text: "The photocurrent increases when the intensity increases.", feedback: "A stronger wave delivering more energy and freeing more electrons is perfectly consistent with the wave theory. This one fits both pictures." },
      ],
      hint: "For each, ask what a smooth wave spreading energy over the surface would predict.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "einsteins-photoelectric-equation",
  title: "3.3 · Einstein's Photoelectric Equation",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 1905 Einstein explained all four laws with one sentence: *a single photon gives all its energy to a single electron*. Everything else is bookkeeping with energy conservation, and that bookkeeping is the equation JEE uses more than any other in modern physics.",
    },
    { type: "heading", text: "One photon, one electron" },
    {
      type: "text",
      content:
        "**Derivation.** Follow one photon of energy $h\\nu$ into the metal. It is absorbed by one electron, which now has $h\\nu$ of extra energy. To escape, the electron must pay at least the work function $\\phi$ (the most loosely held electrons, at the surface, pay exactly $\\phi$). Electrons from deeper down also lose energy in collisions on the way out and pay more. So the *fastest* electrons are the surface ones, and energy conservation for them gives",
    },
    { type: "math", latex: "h\\nu = \\phi + K_{\\max} \\quad\\Longrightarrow\\quad K_{\\max} = h\\nu - \\phi = eV_0" },
    {
      type: "callout",
      variant: "definition",
      title: "Einstein's photoelectric equation",
      content:
        "$K_{\\max} = \\tfrac12 m v_{\\max}^2 = h\\nu - \\phi = eV_0$\nThreshold: $K_{\\max} = 0$ when $h\\nu_0 = \\phi$, so $\\nu_0 = \\dfrac{\\phi}{h}$ and $\\lambda_0 = \\dfrac{hc}{\\phi}$.\nIn electron-volts with $\\lambda$ in nm: $K_{\\max} = \\dfrac{1240}{\\lambda} - \\phi$, and $V_0$ in volts is the same number.",
    },
    {
      type: "text",
      content:
        "Now read the four laws back out of it. If $h\\nu < \\phi$, $K_{\\max}$ would be negative: no emission (threshold). The energy arrives in one event: no delay. More photons means more electrons but the same $h\\nu$ each: current rises, $V_0$ does not. And $K_{\\max}$ is linear in $\\nu$: $V_0$ rises with frequency.",
    },
    { type: "heading", text: "The straight line of $V_0$ against $\\nu$" },
    {
      type: "text",
      content:
        "Divide by $e$:",
    },
    { type: "math", latex: "V_0 = \\frac{h}{e}\\,\\nu - \\frac{\\phi}{e}" },
    {
      type: "text",
      content:
        "Plot $V_0$ against $\\nu$ and you get a straight line with slope $h/e$, the *same for every metal*, crossing the $\\nu$-axis at $\\nu_0$ and the (extended) $V_0$-axis at $-\\phi/e$. Different metals give parallel lines, shifted along the axis by their work functions. See it below with caesium, sodium and copper.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-quantum-lab",
        mode: "einstein-graph",
        metals: [
          { name: "Caesium", workFunction: 2.14 },
          { name: "Sodium", workFunction: 2.75 },
          { name: "Copper", workFunction: 4.65 },
        ],
        initialMetal: 1,
        frequency: { min: 4, max: 16, step: 0.1, initial: 8 },
        graphY: "stopping-potential",
        caption:
          "Switch between the metals and slide ν. The slope never changes; only the threshold ν₀ where each line leaves the axis does.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: three parallel lines. Caesium leaves the axis near $5.2\\times10^{14}$ Hz, sodium near $6.6\\times10^{14}$ Hz and copper near $11.2\\times10^{14}$ Hz (ultraviolet). Each line rises by about 0.41 V for every $10^{14}$ Hz, because $h/e = 4.14\\times10^{-15}$ V·s. Extending the lines backwards, they hit the vertical axis at $-2.14$, $-2.75$ and $-4.65$ V: minus the work functions.",
    },
    {
      type: "text",
      content:
        "The same physics as a function of wavelength, for potassium ($\\phi = 2.3$ eV). The formula clips at zero because below threshold nothing comes out (it is written as $\\frac{y + |y|}{2}$, which equals $y$ when positive and 0 otherwise).",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "(1240/x - 2.3 + abs(1240/x - 2.3))/2",
        exprLatex: "K_{\\max} = \\max\\left(0,\\ \\frac{1240}{\\lambda} - 2.3\\right)\\ \\text{eV}",
        min: 150,
        max: 700,
        step: 5,
        initial: 300,
        inputLabel: "λ",
        outputLabel: "K_max (eV)",
        inputUnit: "nm",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $K_{\\max}$ falls as $\\lambda$ grows and hits zero at $\\lambda_0 = 1240/2.3 \\approx 539$ nm; beyond that it stays at zero. It is *not* a straight line in $\\lambda$: it is linear in $1/\\lambda$, that is, in frequency.",
    },
    { type: "heading", text: "Millikan's test" },
    {
      type: "text",
      content:
        "Millikan, who expected to prove Einstein wrong, spent ten years measuring $V_0$ against $\\nu$ on carefully cleaned alkali-metal surfaces in vacuum. He found straight lines, and the slope gave $h$ within 0.5% of Planck's value from blackbody radiation. The photoelectric effect is now a standard way to *measure* $h$, as the next example does.",
    },
    { type: "heading", text: "Worked examples: stopping potential and $h$" },
    {
      type: "worked-example",
      id: "omp3-3-we1",
      title: "Worked example 1 (JEE Main)",
      problem:
        "Light of wavelength 300 nm falls on potassium ($\\phi = 2.3$ eV). Find $K_{\\max}$ and $V_0$.",
      steps: [
        { text: "Photon energy: $E = 1240/300 = 4.13$ eV. *Why this step:* the equation is an energy balance, so every term must be in eV." },
        { text: "$K_{\\max} = 4.13 - 2.3 = 1.83$ eV." },
        { text: "$V_0 = K_{\\max}/e = 1.83$ V. (In eV and volts the number is the same.)" },
      ],
      answer: "$K_{\\max} = 1.83$ eV, $V_0 = 1.83$ V",
    },
    {
      type: "worked-example",
      id: "omp3-3-we2",
      title: "Worked example 2 (maximum speed)",
      problem:
        "Continue: find $v_{\\max}$ ($m_e = 9.1\\times10^{-31}$ kg).",
      steps: [
        { text: "$K_{\\max} = 1.83\\times1.6\\times10^{-19} = 2.93\\times10^{-19}$ J. *Why this step:* $\\tfrac12mv^2$ needs SI units." },
        { text: "$v_{\\max} = \\sqrt{\\dfrac{2K}{m}} = \\sqrt{\\dfrac{2\\times2.93\\times10^{-19}}{9.1\\times10^{-31}}} = \\sqrt{6.44\\times10^{11}} \\approx 8.0\\times10^{5}$ m/s." },
        { text: "Well below $c$, so the non-relativistic formula is fine." },
      ],
      answer: "$v_{\\max} \\approx 8.0\\times10^5$ m/s",
    },
    {
      type: "worked-example",
      id: "omp3-3-we3",
      title: "Worked example 3 (finding h and φ from two readings, JEE favourite)",
      problem:
        "A metal gives $V_0 = 1.2$ V for light of frequency $8\\times10^{14}$ Hz and $V_0 = 2.85$ V for $12\\times10^{14}$ Hz. Find $h$ and $\\phi$.",
      steps: [
        { text: "Write the equation twice: $eV_1 = h\\nu_1 - \\phi$ and $eV_2 = h\\nu_2 - \\phi$." },
        { text: "Subtract to kill $\\phi$: $e(V_2 - V_1) = h(\\nu_2 - \\nu_1)$. *Why this step:* the unknown work function is the same in both, so the difference isolates $h$.", latex: "h = \\frac{e\\,\\Delta V_0}{\\Delta\\nu} = \\frac{1.6\\times10^{-19}\\times1.65}{4\\times10^{14}} = 6.6\\times10^{-34}\\ \\text{J·s}" },
        { text: "Back-substitute into the first reading, in eV: $h\\nu_1/e = \\dfrac{6.6\\times10^{-34}\\times8\\times10^{14}}{1.6\\times10^{-19}} = 3.3$ eV, so $\\phi = 3.3 - 1.2 = 2.1$ eV." },
        { text: "Check with the second: $h\\nu_2/e = 4.95$ eV and $4.95 - 2.1 = 2.85$. ✓" },
      ],
      answer: "$h \\approx 6.6\\times10^{-34}$ J·s, $\\phi = 2.1$ eV",
    },
    {
      type: "worked-example",
      id: "omp3-3-we4",
      title: "Worked example 4 (doubling the frequency)",
      problem:
        "A metal with $\\phi = 2$ eV is lit with 3 eV photons, then with 6 eV photons. By what factor does $V_0$ change?",
      steps: [
        { text: "First: $V_0 = 3 - 2 = 1$ V." },
        { text: "Second: $V_0 = 6 - 2 = 4$ V." },
        { text: "Doubling $\\nu$ multiplied $V_0$ by 4, not 2. *Why this step:* $V_0$ is linear in $\\nu$ but not proportional to it; the $-\\phi$ offset breaks proportionality. Only the *increase* scales: $\\Delta V_0 = h\\Delta\\nu/e$." },
      ],
      answer: "$V_0$ goes from 1 V to 4 V: a factor of 4.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"all photoelectrons leave with K_max\"",
      content:
        "Only the most loosely bound electrons, right at the surface, leave with $h\\nu - \\phi$. Electrons that start deeper lose energy in collisions on the way out and emerge with anything from $K_{\\max}$ down to zero. That is why the current falls *gradually* as the retarding voltage grows, reaching zero only at $V_0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"doubling the frequency doubles the stopping potential\"",
      content:
        "$V_0 = (h\\nu - \\phi)/e$ has an intercept. Doubling $\\nu$ more than doubles $V_0$ (Worked example 4). The correct statement: equal *increases* in $\\nu$ give equal increases in $V_0$, each $h/e$ per hertz.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "omp3-3-q1",
      variant: "practice",
      question: "Light of wavelength 200 nm falls on copper ($\\phi = 4.65$ eV). Find the stopping potential, in volts. Use $hc = 1240$ eV·nm.",
      answer: 1.55,
      relTolerance: 0.01,
      unit: "V",
      hint: "$eV_0 = K_{\\max} = h\\nu - \\phi$, all in eV.",
      solution: "Photon energy: $1240/200 = 6.2$ eV.\n\n$K_{\\max} = 6.2 - 4.65 = 1.55$ eV, so $V_0 = 1.55$ V (in eV and volts the number is the same).",
      commonMistakes: [
        { answer: 6.2, feedback: "That is the photon energy. Subtract the work function." },
        { answer: 10.85, feedback: "The work function is subtracted, not added: the electron pays $\\phi$ to get out." },
        { answer: 2.48e-19, feedback: "$1.55$ eV $= 2.48\\times10^{-19}$ J, but a potential in volts is just 1.55." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-3-q2",
      variant: "concept",
      question: "Why do the photoelectrons from one metal leave with a range of kinetic energies, even with monochromatic light?",
      options: [
        { text: "Some electrons absorb two or more photons.", feedback: "Multi-photon absorption is negligible at ordinary intensities. One photon, one electron." },
        { text: "Electrons deeper in the metal lose some energy before escaping; only surface electrons emerge with $h\\nu - \\phi$.", correct: true, feedback: "So $K_{\\max}$ is a maximum, and the actual energies spread from 0 up to it." },
        { text: "The photons in monochromatic light have a range of energies.", feedback: "Monochromatic means one frequency, so one photon energy." },
        { text: "The work function varies randomly from electron to electron.", feedback: "The work function is the *minimum* escape cost. The spread comes from extra losses, not from $\\phi$ changing." },
      ],
      hint: "$h\\nu - \\phi$ is the *largest* possible kinetic energy. Each photon is absorbed whole by one electron and $\\phi$ is a property of the metal, so what could make an electron leave with less?",
    },
    {
      type: "quiz",
      id: "omp3-3-q3",
      variant: "practice",
      question: "A metal has $V_0 = 1$ V for light of frequency $\\nu$ and $V_0 = 3$ V for light of frequency $2\\nu$. What is its work function?",
      options: [
        { text: "$2$ eV", feedback: "That is $h\\nu$, found by subtracting the two readings. The work function is $h\\nu - eV_1$." },
        { text: "$1$ eV", correct: true, feedback: "Subtracting: $h\\nu = e(3 - 1) = 2$ eV. Then $\\phi = h\\nu - eV_1 = 2 - 1 = 1$ eV. Check: $2h\\nu - \\phi = 4 - 1 = 3$ eV. ✓" },
        { text: "$0$", feedback: "With $\\phi = 0$, doubling $\\nu$ would exactly double $V_0$. It tripled, so $\\phi \\ne 0$." },
        { text: "$3$ eV", feedback: "That would make $V_0$ negative at frequency $\\nu$. Subtract the two equations to find $h\\nu$ first." },
      ],
      hint: "Write $eV_0 = h\\nu - \\phi$ for both readings and subtract.",
    },
    {
      type: "quiz",
      id: "omp3-3-q4",
      variant: "concept",
      question: "In the $V_0$–$\\nu$ graph for any metal, what is the slope?",
      options: [
        { text: "$\\phi/e$", feedback: "$\\phi/e$ is the size of the intercept on the $V_0$-axis." },
        { text: "$h$", feedback: "The graph plots volts, not joules; dividing $h\\nu = eV_0 + \\phi$ by $e$ gives slope $h/e$." },
        { text: "$e/h$", feedback: "Upside down. $V_0$ grows by $h/e$ volts per hertz." },
        { text: "$h/e$, the same for every metal", correct: true, feedback: "$V_0 = (h/e)\\nu - \\phi/e$: slope $h/e \\approx 4.14\\times10^{-15}$ V·s." },
      ],
      hint: "Divide Einstein's equation $eV_0 = h\\nu - \\phi$ by $e$ and compare it with $y = mx + c$.",
    },
    {
      type: "numeric",
      id: "omp3-3-q5",
      variant: "practice",
      question: "The threshold wavelength for a metal is 600 nm. Light of 400 nm falls on it. Find $K_{\\max}$ in eV. Use $hc = 1240$ eV·nm.",
      answer: 1.033,
      relTolerance: 0.02,
      unit: "eV",
      hint: "The threshold wavelength gives the work function: $\\phi = 1240/\\lambda_0$.",
      solution: "$\\phi = \\dfrac{1240}{600} = 2.07$ eV and $E = \\dfrac{1240}{400} = 3.10$ eV.\n\n$K_{\\max} = 3.10 - 2.07 = 1.03$ eV. In one line: $K_{\\max} = 1240\\left(\\dfrac1{400} - \\dfrac1{600}\\right)$.",
      commonMistakes: [
        { answer: 3.1, feedback: "That is the photon energy. Subtract $\\phi = 1240/600$." },
        { answer: 6.2, feedback: "$1240/200$ uses the *difference* of wavelengths. Energies subtract, wavelengths do not: $K = 1240\\left(\\frac1{400} - \\frac1{600}\\right)$." },
        { answer: 0, feedback: "400 nm is shorter than the 600 nm threshold, so each photon has more than $\\phi$." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-3-q6",
      variant: "concept",
      multiple: true,
      question: "Light above threshold falls on a metal plate in a photocell. Select every change that **increases** the stopping potential.",
      options: [
        { text: "Using light of shorter wavelength", correct: true, feedback: "Shorter $\\lambda$ means larger $h\\nu$, so $K_{\\max} = h\\nu - \\phi$ and $V_0$ rise." },
        { text: "Replacing the plate with a metal of smaller work function, same light", correct: true, feedback: "Each electron pays less to escape, so $K_{\\max} = h\\nu - \\phi$ is larger." },
        { text: "Increasing the intensity of the same light", feedback: "More photons means more electrons, each with the same $K_{\\max}$. $V_0$ is unchanged." },
        { text: "Making the collector more positive", feedback: "That only helps collect electrons (towards saturation). $V_0$ is set by $h\\nu - \\phi$, not by the applied voltage." },
      ],
      hint: "$eV_0 = h\\nu - \\phi$. Which options change $h\\nu$ or $\\phi$?",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "photoelectric-graphs",
  title: "3.4 · Reading Photoelectric Graphs",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "JEE loves to show two photoelectric curves and ask which one is brighter, which one has higher frequency, or which metal has the larger work function. Students who memorise a list of graph shapes get these wrong under pressure. You do not need the list. You need one rule: **intensity controls how many electrons (the current); frequency controls how fast the fastest ones are (the stopping potential).** Every graph is that rule drawn in a different pair of axes.",
    },
    { type: "heading", text: "Experiment 1: intensity only" },
    {
      type: "text",
      content:
        "The wavelength is locked at 350 nm on sodium. Sweep the voltage from $-5$ to $+5$ V at 30% intensity, then at 90%.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-quantum-lab",
        mode: "photoelectric",
        metals: [{ name: "Sodium", workFunction: 2.75 }],
        wavelength: { min: 350, max: 350, step: 5, initial: 350 },
        intensity: { min: 0, max: 100, step: 5, initial: 30 },
        voltage: { min: -5, max: 5, step: 0.1, initial: 0 },
        caption: "Only intensity (and the voltage sweep) can change. Watch where the I–V curve levels off and where it hits zero.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the brighter curve saturates higher (three times higher for three times the intensity), but both curves reach zero current at the same point, $-V_0 = -(3.54 - 2.75) = -0.79$ V. Intensity stretches the curve vertically and leaves its foot where it was.",
    },
    { type: "heading", text: "Experiment 2: frequency only" },
    {
      type: "text",
      content:
        "Now intensity is locked and the wavelength slides from 200 to 450 nm.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-quantum-lab",
        mode: "photoelectric",
        metals: [{ name: "Sodium", workFunction: 2.75 }],
        wavelength: { min: 200, max: 450, step: 5, initial: 300 },
        intensity: { min: 60, max: 60, step: 5, initial: 60 },
        voltage: { min: -5, max: 5, step: 0.1, initial: 0 },
        caption: "Only the wavelength changes. The lab keeps the photon arrival rate fixed, so watch the foot of the curve, not its height.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: shorter wavelength (higher frequency) pushes the foot of the curve to more negative voltages (larger $V_0$), while the saturation level stays put, because the lab's intensity setting fixes the number of photons per second. At 200 nm, $V_0 = 6.2 - 2.75 = 3.45$ V; at 300 nm, $V_0 = 1.38$ V.",
    },
    {
      type: "callout",
      variant: "info",
      title: "A subtlety about \"same intensity\"",
      content:
        "Intensity in W/m² is (photons per second per m²) × $h\\nu$. If the *power* is held fixed while the frequency rises, each photon carries more energy, so there are fewer photons and the saturation current actually *drops* slightly. If the *photon flux* is held fixed (as in the lab), the saturation current is the same. JEE usually says \"same intensity\" and expects the same saturation current; read the question for which one it means.",
    },
    {
      type: "table",
      headers: ["Graph", "Shape", "Why (from $K_{\\max} = h\\nu - \\phi$ and current ∝ photon rate)"],
      rows: [
        ["$I$ vs $V$, two intensities", "Same $-V_0$, different saturation heights", "Intensity sets electron count, not energy"],
        ["$I$ vs $V$, two frequencies", "Different $-V_0$ (higher $\\nu$ further left), same saturation for equal photon flux", "Frequency sets $K_{\\max}$"],
        ["$I_{\\text{sat}}$ vs intensity", "Straight line through the origin", "One photon, one electron (fixed fraction)"],
        ["$V_0$ vs $\\nu$", "Straight line, slope $h/e$, starts at $\\nu_0$", "$V_0 = (h/e)\\nu - \\phi/e$"],
        ["$V_0$ vs $\\nu$, two metals", "Parallel lines; larger $\\phi$ is further right", "Same slope, different intercept"],
        ["$K_{\\max}$ vs $\\nu$", "Straight line, slope $h$, $K$-intercept $-\\phi$", "Multiply the $V_0$ line by $e$"],
        ["$V_0$ vs $1/\\lambda$", "Straight line, slope $hc/e = 1240$ V·nm", "$\\nu = c/\\lambda$"],
        ["$V_0$ vs intensity", "Horizontal line", "Intensity does not change $K_{\\max}$"],
      ],
    },
    { type: "heading", text: "Experiment 3: the kinetic-energy Einstein graph" },
    {
      type: "text",
      content:
        "Same idea as 3.3, with $K_{\\max}$ in eV on the vertical axis.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-quantum-lab",
        mode: "einstein-graph",
        graphY: "kmax",
        frequency: { min: 4, max: 16, step: 0.1, initial: 10 },
        caption: "All six NCERT metals. Every line has slope h; the horizontal intercept is ν₀ = φ/h.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: six parallel lines, in order of work function from caesium (leftmost) to platinum (rightmost). A metal whose line starts further right needs higher-frequency light before it emits anything.",
    },
    { type: "heading", text: "Worked examples: reading $V_0$ graphs" },
    {
      type: "worked-example",
      id: "omp3-4-we1",
      title: "Worked example 1 (reading a V₀–ν graph, JEE Main)",
      problem:
        "A $V_0$–$\\nu$ graph for a metal meets the $\\nu$-axis at $5\\times10^{14}$ Hz and has slope $4.1\\times10^{-15}$ V·s. Find $\\phi$ and $\\lambda_0$.",
      steps: [
        { text: "The $\\nu$-intercept is the threshold frequency: $\\nu_0 = 5\\times10^{14}$ Hz." },
        { text: "Setting $V_0 = 0$ in $V_0 = (h/e)(\\nu - \\nu_0)$ confirms that $\\phi/e = (h/e)\\nu_0 = \\text{slope}\\times\\nu_0$. *Why this step:* the slope is $h/e$, so slope times $\\nu_0$ is $\\phi$ in volts, which is $\\phi$ in eV." },
        { text: "$\\phi = 4.1\\times10^{-15}\\times5\\times10^{14} = 2.05$ eV." },
        { text: "$\\lambda_0 = c/\\nu_0 = \\dfrac{3\\times10^8}{5\\times10^{14}} = 6\\times10^{-7}$ m $= 600$ nm. (Check: $1240/2.05 \\approx 605$ nm, the small difference coming from rounding in $hc$.)" },
      ],
      answer: "$\\phi \\approx 2.05$ eV, $\\lambda_0 = 600$ nm",
    },
    {
      type: "worked-example",
      id: "omp3-4-we2",
      title: "Worked example 2 (which curve is which?)",
      problem:
        "Two $I$–$V$ curves A and B for the same metal: A saturates at 8 μA and reaches zero at $-1.2$ V; B saturates at 4 μA and reaches zero at $-2.0$ V. Which curve used the higher frequency, and which delivered more photons per second? Can you tell which beam had more power?",
      steps: [
        { text: "Higher frequency ↔ larger $V_0$. B stops at 2.0 V, so B used the higher frequency. *Why this step:* the foot of the curve is the only feature set by photon energy." },
        { text: "Larger saturation current ↔ more photons per second. A saturates higher, so A delivered more photons per second." },
        { text: "Nothing in the graph lets you compare the power in watts directly: A has more photons but each is less energetic." },
      ],
      answer: "B used the higher frequency; A delivered more photons per second; the powers cannot be compared from the graph.",
    },
    {
      type: "worked-example",
      id: "omp3-4-we3",
      title: "Worked example 3 (V₀ against 1/λ)",
      problem:
        "For a metal, $V_0 = 1$ V at $\\lambda = 400$ nm. What is $V_0$ at 310 nm?",
      steps: [
        { text: "$V_0 = \\dfrac{1240}{\\lambda} - \\phi$ (in volts with $\\lambda$ in nm), a line in $1/\\lambda$ with slope 1240 V·nm." },
        { text: "From the first reading: $\\phi = 3.1 - 1 = 2.1$ eV." },
        { text: "At 310 nm: $V_0 = 4.0 - 2.1 = 1.9$ V. *Why this step:* find $\\phi$ once, then any other wavelength is one subtraction away." },
      ],
      answer: "$V_0 = 1.9$ V",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"higher frequency gives a higher saturation current\"",
      content:
        "The saturation current counts electrons, and electrons are counted by photons. Raising the frequency makes each electron faster but does not make more of them. At fixed power it even gives slightly *fewer* photons.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the V₀–ν lines for different metals have different slopes\"",
      content:
        "The slope is $h/e$, two universal constants. The metal enters only through $\\phi$, which shifts the line sideways. Two non-parallel lines on a $V_0$–$\\nu$ graph mean someone made an error.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "omp3-4-q1",
      variant: "concept",
      question: "Two $I$–$V$ curves for the same metal and the same frequency have saturation currents 2 μA and 6 μA. What differs between the two runs?",
      options: [
        { text: "The frequency: the second run used higher-frequency light.", feedback: "The question fixes the frequency. And frequency moves $V_0$, not the saturation level." },
        { text: "The stopping potential: the second is three times larger.", feedback: "Same metal and frequency give the same $V_0$, whatever the intensity." },
        { text: "The intensity: the second run had three times as many photons per second.", correct: true, feedback: "Same frequency means the same $V_0$; only the number of electrons (so photons) changed." },
        { text: "The work function changed.", feedback: "The metal is the same, so $\\phi$ is the same." },
      ],
      hint: "Saturation current counts electrons per second; the stopping potential measures their maximum energy. Which of these is the same for both curves?",
    },
    {
      type: "quiz",
      id: "omp3-4-q2",
      variant: "concept",
      question: "On a $V_0$–$\\nu$ graph, metal P's line crosses the $\\nu$-axis to the right of metal Q's. Which is true?",
      options: [
        { text: "P has the smaller work function.", feedback: "The threshold $\\nu_0 = \\phi/h$ grows with $\\phi$, so the rightmost line has the largest $\\phi$." },
        { text: "P's line is steeper.", feedback: "Every metal's line has slope $h/e$." },
        { text: "P emits electrons at every frequency where Q does.", feedback: "Between the two thresholds, Q emits and P does not." },
        { text: "P has the larger work function and the lines are parallel.", correct: true, feedback: "Larger $\\nu_0 = \\phi/h$ means larger $\\phi$; the slope $h/e$ is shared." },
      ],
      hint: "The $\\nu$-intercept of a $V_0$–$\\nu$ line is the threshold frequency $\\phi/h$. What sets the slope?",
    },
    {
      type: "quiz",
      id: "omp3-4-q3",
      variant: "practice",
      question: "A $K_{\\max}$–$\\nu$ graph (with $K_{\\max}$ in joules) is a straight line. Its extension meets the vertical axis at $-3.2\\times10^{-19}$ J. What is the work function?",
      options: [
        { text: "$-2$ eV", feedback: "The intercept is $-\\phi$; the work function itself is positive." },
        { text: "$2$ eV", correct: true, feedback: "The vertical intercept of $K_{\\max} = h\\nu - \\phi$ is $-\\phi$, so $\\phi = 3.2\\times10^{-19}$ J $= 2$ eV." },
        { text: "$3.2$ eV", feedback: "$3.2\\times10^{-19}$ J is not 3.2 eV. Divide by $1.6\\times10^{-19}$." },
        { text: "It cannot be found without the slope.", feedback: "The intercept alone gives $\\phi$. The slope gives $h$." },
      ],
      hint: "Compare $K_{\\max} = h\\nu - \\phi$ with $y = mx + c$ to see what the vertical intercept is, then convert joules to eV.",
    },
    {
      type: "quiz",
      id: "omp3-4-q4",
      variant: "concept",
      question: "What does a graph of stopping potential against intensity look like (fixed frequency above threshold)?",
      options: [
        { text: "A straight line through the origin", feedback: "That is saturation current against intensity." },
        { text: "A rising curve that levels off", feedback: "Nothing about $V_0$ depends on intensity." },
        { text: "A horizontal straight line", correct: true, feedback: "$V_0 = (h\\nu - \\phi)/e$ has no intensity in it." },
        { text: "A falling straight line", feedback: "Brighter light does not slow the electrons down either." },
      ],
      hint: "Recall from 3.2 what intensity changes: the number of photons, or the energy of each one?",
    },
    {
      type: "numeric",
      id: "omp3-4-q5",
      variant: "practice",
      question: "A metal gives $V_0 = 2$ V with 248 nm light. What is $V_0$, in volts, with 310 nm light? Use $hc = 1240$ eV·nm.",
      answer: 1,
      unit: "V",
      hint: "Find $\\phi$ from the first reading, then use it for the second wavelength.",
      solution: "$\\phi = \\dfrac{1240}{248} - 2 = 5 - 2 = 3$ eV.\n\nAt 310 nm: $V_0 = \\dfrac{1240}{310} - 3 = 4 - 3 = 1$ V.",
      commonMistakes: [
        { answer: 1.6, feedback: "That scales $V_0$ by $248/310$, treating $V_0$ as proportional to $1/\\lambda$. The work function offset breaks that." },
        { answer: 2.5, feedback: "Longer wavelength means lower photon energy, so $V_0$ must fall, not rise." },
        { answer: 0, feedback: "The 310 nm photon has 4 eV, more than $\\phi = 3$ eV, so electrons still emerge." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-4-q6",
      variant: "concept",
      multiple: true,
      question: "For one metal lit above threshold, select every graph that is a **straight line**.",
      options: [
        { text: "Stopping potential $V_0$ against frequency $\\nu$", correct: true, feedback: "$V_0 = (h/e)\\nu - \\phi/e$: a line of slope $h/e$ starting at $\\nu_0$." },
        { text: "Saturation current against intensity (fixed frequency)", correct: true, feedback: "One photon frees one electron with a fixed probability, so the current is proportional to the photon rate: a line through the origin." },
        { text: "Stopping potential $V_0$ against $1/\\lambda$", correct: true, feedback: "$V_0 = 1240/\\lambda - \\phi$ (V, nm): linear in $1/\\lambda$ with slope $hc/e$." },
        { text: "Stopping potential $V_0$ against wavelength $\\lambda$", feedback: "$V_0 = 1240/\\lambda - \\phi$ is linear in $1/\\lambda$, so against $\\lambda$ it is a curve falling towards zero at $\\lambda_0$." },
      ],
      hint: "Write each quantity as a formula in the variable on the horizontal axis.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "matter-waves",
  title: "3.5 · Matter Waves: de Broglie's Hypothesis",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "By 1923 physicists had accepted something strange: light, a wave, arrives as particles. Louis de Broglie, a PhD student, asked the obvious reverse question. Nature likes symmetry. If a wave can behave like a particle, can a particle, an electron say, behave like a wave? And if so, what is its wavelength?",
    },
    { type: "heading", text: "A guess built from the photon" },
    {
      type: "text",
      content:
        "For a photon, $p = h/\\lambda$, which links a particle property (momentum) to a wave property (wavelength) through Planck's constant alone. Nothing in that relation mentions light specifically. De Broglie proposed that it holds for *every* particle: anything with momentum $p$ has a wavelength $h/p$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The de Broglie wavelength",
      content:
        "A particle of momentum $p = mv$ has an associated matter wave of wavelength\n$\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}$\nFor slow particles, $K = \\dfrac{p^2}{2m}$ gives $p = \\sqrt{2mK}$, and a charge $q$ accelerated from rest through potential difference $V$ has $K = qV$.",
    },
    { type: "heading", text: "Working forms of $\\lambda = h/p$" },
    {
      type: "text",
      content:
        "Start from $\\lambda = h/p$ and replace the momentum step by step:",
    },
    { type: "math", latex: "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2mK}} = \\frac{h}{\\sqrt{2mqV}}" },
    {
      type: "text",
      content:
        "For an electron ($m = 9.1\\times10^{-31}$ kg, $q = e = 1.6\\times10^{-19}$ C) the constants combine once and for all:",
    },
    {
      type: "math",
      latex:
        "\\lambda_e = \\frac{6.63\\times10^{-34}}{\\sqrt{2\\times9.1\\times10^{-31}\\times1.6\\times10^{-19}}}\\cdot\\frac{1}{\\sqrt V} = \\frac{1.23\\times10^{-9}}{\\sqrt V}\\ \\text{m} \\approx \\frac{12.27}{\\sqrt V}\\ \\text{Å}",
    },
    {
      type: "text",
      content:
        "(The rounded constants give 12.29; more precise values give the standard 12.27.) An electron accelerated through 100 V has $\\lambda = 12.27/10 = 1.227$ Å, about the spacing of atoms in a crystal. That coincidence is what made electron diffraction possible (3.6). Try it below and switch particles.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-quantum-lab",
        mode: "de-broglie",
        particle: "electron",
        allowParticleChange: true,
        acceleratingVoltage: { min: 10, max: 1000, step: 10, initial: 100 },
        caption:
          "Raise V and watch the wave shorten. Then switch to a proton and an alpha particle at the same V and compare on the log strip.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: quadrupling $V$ halves the wavelength ($\\lambda \\propto 1/\\sqrt V$). At the same voltage the proton's wavelength is about 43 times shorter than the electron's ($\\sqrt{1836} \\approx 43$), and the alpha particle's shorter still.",
    },
    {
      type: "table",
      headers: ["Comparison", "Formula", "Result"],
      rows: [
        ["Same momentum", "$\\lambda = h/p$", "Same wavelength, whatever the mass"],
        ["Same kinetic energy", "$\\lambda = h/\\sqrt{2mK}$", "$\\lambda \\propto 1/\\sqrt m$: heavier is shorter"],
        ["Same accelerating voltage", "$\\lambda = h/\\sqrt{2mqV}$", "$\\lambda \\propto 1/\\sqrt{mq}$"],
        ["Same speed", "$\\lambda = h/mv$", "$\\lambda \\propto 1/m$"],
      ],
    },
    { type: "heading", text: "Worked examples: electrons, photons and neutrons" },
    {
      type: "worked-example",
      id: "omp3-5-we1",
      title: "Worked example 1 (electron through 100 V, JEE Main)",
      problem:
        "An electron is accelerated from rest through 100 V. Find its de Broglie wavelength.",
      steps: [
        { text: "$K = eV = 100$ eV, a slow (non-relativistic) electron." },
        { text: "$\\lambda = \\dfrac{12.27}{\\sqrt{100}}$ Å $= 1.227$ Å $= 0.1227$ nm. *Why this step:* the shortcut already contains $h$, $m_e$ and $e$; use it only for electrons." },
      ],
      answer: "$\\lambda \\approx 1.227$ Å $= 0.1227$ nm",
    },
    {
      type: "worked-example",
      id: "omp3-5-we2",
      title: "Worked example 2 (proton vs alpha through the same V)",
      problem:
        "A proton and an alpha particle are accelerated from rest through the same potential difference. Find $\\lambda_p/\\lambda_\\alpha$.",
      steps: [
        { text: "$\\lambda = \\dfrac{h}{\\sqrt{2mqV}}$, and $V$ is the same, so $\\dfrac{\\lambda_p}{\\lambda_\\alpha} = \\sqrt{\\dfrac{m_\\alpha q_\\alpha}{m_p q_p}}$. *Why this step:* ratio questions are solved by writing the formula, cancelling what is common, and keeping only what differs." },
        { text: "$m_\\alpha = 4m_p$ and $q_\\alpha = 2e$, so $\\dfrac{\\lambda_p}{\\lambda_\\alpha} = \\sqrt{4\\times2} = 2\\sqrt2$." },
      ],
      answer: "$\\lambda_p/\\lambda_\\alpha = 2\\sqrt2$",
    },
    {
      type: "worked-example",
      id: "omp3-5-we3",
      title: "Worked example 3 (photon vs electron of the same energy, 10 keV)",
      problem:
        "Compare the wavelength of a 10 keV photon with the de Broglie wavelength of a 10 keV electron.",
      steps: [
        { text: "Photon: $\\lambda = \\dfrac{1240}{10\\,000}$ nm $= 0.124$ nm $= 1.24$ Å. *Why this step:* for a photon $E = pc$, so $\\lambda = hc/E$." },
        { text: "Electron: $\\lambda = \\dfrac{12.27}{\\sqrt{10\\,000}}$ Å $= 0.123$ Å. *Why this step:* for a massive particle $E = p^2/2m$, so $\\lambda = h/\\sqrt{2mE}$. Different energy–momentum relations, different answers." },
        { text: "At equal energy, the electron's wavelength is about 10 times shorter. This is the reason electron microscopes see finer detail than X-ray or light microscopes at comparable energies." },
      ],
      answer: "Photon 1.24 Å, electron 0.123 Å: the electron's is about 10 times shorter.",
    },
    {
      type: "worked-example",
      id: "omp3-5-we4",
      title: "Worked example 4 (why cricket balls do not diffract)",
      problem:
        "Find the de Broglie wavelength of a 150 g ball at 30 m/s. Can it show wave behaviour?",
      steps: [
        { text: "$p = 0.15\\times30 = 4.5$ kg·m/s." },
        { text: "$\\lambda = \\dfrac{6.63\\times10^{-34}}{4.5} \\approx 1.5\\times10^{-34}$ m." },
        { text: "That is about $10^{-19}$ times the size of a proton. No gap or obstacle is anywhere near that small, so the ball shows no wave behaviour at all. *Why this step:* wave effects need an aperture comparable to $\\lambda$ (Chapter 2), and here there is none." },
      ],
      answer: "$\\lambda \\approx 1.5\\times10^{-34}$ m: far too small for any wave behaviour.",
    },
    {
      type: "worked-example",
      id: "omp3-5-we5",
      title: "Worked example 5 (thermal neutrons)",
      problem:
        "Neutrons in equilibrium with a moderator at temperature $T$ have average kinetic energy $\\tfrac32kT$ (kinetic theory). Find $\\lambda$ at 300 K ($m_n = 1.675\\times10^{-27}$ kg, $k = 1.38\\times10^{-23}$ J/K).",
      steps: [
        { text: "$p = \\sqrt{2m\\cdot\\tfrac32kT} = \\sqrt{3mkT}$, so $\\lambda = \\dfrac{h}{\\sqrt{3mkT}}$." },
        { text: "$3mkT = 3\\times1.675\\times10^{-27}\\times1.38\\times10^{-23}\\times300 = 2.08\\times10^{-47}$, whose square root is $4.56\\times10^{-24}$." },
        { text: "$\\lambda = \\dfrac{6.63\\times10^{-34}}{4.56\\times10^{-24}} \\approx 1.45\\times10^{-10}$ m $= 1.45$ Å. Again atomic spacing, which is why thermal neutrons are used to study crystal structures." },
      ],
      answer: "$\\lambda \\approx 1.45$ Å",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the heavier particle always has the shorter wavelength\"",
      content:
        "Wavelength depends on momentum, $\\lambda = h/p$, not on mass alone. A slow proton and a fast electron can have the same momentum and so the same wavelength. Heavier means shorter only when something else is equal: the same kinetic energy, the same speed or the same accelerating voltage.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the matter wave is an electromagnetic wave\"",
      content:
        "An electron's matter wave is not an oscillating electric and magnetic field and it is not emitted as radiation. It is a probability wave: its intensity at a point tells you how likely the electron is to be found there. It exists for neutral particles (neutrons, whole atoms) too, which have no charge to make an EM wave.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "omp3-5-q1",
      variant: "practice",
      question: "An electron is accelerated from rest through 400 V. What is its de Broglie wavelength, in ångströms?",
      answer: 0.6135,
      relTolerance: 0.02,
      unit: "Å",
      hint: "For an electron, $\\lambda = \\dfrac{12.27}{\\sqrt V}$ Å.",
      solution: "$\\lambda = \\dfrac{12.27}{\\sqrt{400}} = \\dfrac{12.27}{20} \\approx 0.61$ Å.",
      commonMistakes: [
        { answer: 0.0307, feedback: "That divides by 400 instead of $\\sqrt{400}$. The wavelength goes as $1/\\sqrt V$." },
        { answer: 31, feedback: "That is $1240/400 = 3.1$ nm, the photon formula. An electron's energy–momentum relation is different." },
        { answer: 1.227, feedback: "That is the value at 100 V. At four times the voltage, $\\lambda$ halves." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-5-q2",
      variant: "practice",
      question: "A proton and an alpha particle are accelerated through the same potential difference. Find $\\lambda_p : \\lambda_\\alpha$.",
      options: [
        { text: "$2\\sqrt2 : 1$", correct: true, feedback: "$\\lambda \\propto 1/\\sqrt{mq}$ and $m_\\alpha q_\\alpha = 8\\,m_p e$, so the ratio is $\\sqrt8 = 2\\sqrt2$." },
        { text: "$2 : 1$", feedback: "That is the ratio at the same kinetic energy ($\\sqrt{m_\\alpha/m_p}$). Here the alpha, with charge $2e$, gains twice the energy." },
        { text: "$4 : 1$", feedback: "That would be the ratio at equal *speed*. Through the same $V$, use $\\lambda = h/\\sqrt{2mqV}$." },
        { text: "$1 : 2\\sqrt2$", feedback: "Upside down: the lighter, less-charged proton has the *longer* wavelength." },
      ],
      hint: "After acceleration through $V$, $\\lambda = \\dfrac{h}{\\sqrt{2mqV}}$. Compare $m$ and $q$ for the two particles.",
    },
    {
      type: "quiz",
      id: "omp3-5-q3",
      variant: "concept",
      question: "An electron and a proton have the same de Broglie wavelength. Which has more kinetic energy?",
      options: [
        { text: "They have equal kinetic energy.", feedback: "Equal wavelength means equal *momentum*. $K = p^2/2m$ then differs." },
        { text: "The proton", feedback: "At fixed momentum, the heavier particle moves more slowly and has less kinetic energy." },
        { text: "It depends on their charges.", feedback: "Charge matters for how they were accelerated, not for $K$ at a given momentum." },
        { text: "The electron", correct: true, feedback: "Same $p$, and $K = p^2/2m$ is larger for the smaller mass, by a factor of about 1836." },
      ],
      hint: "The same wavelength means the same momentum. Then use $K = p^2/2m$.",
    },
    {
      type: "quiz",
      id: "omp3-5-q4",
      variant: "practice",
      question: "A photon and an electron each have energy 10 keV. Which has the longer wavelength?",
      options: [
        { text: "The electron, by a factor of about 10", feedback: "Reversed. At equal energy the electron has more momentum ($\\sqrt{2mE}$ versus $E/c$), so a shorter wavelength." },
        { text: "The photon, by a factor of about 10", correct: true, feedback: "Photon: $1240/10^4$ nm $= 1.24$ Å. Electron: $12.27/100 = 0.123$ Å." },
        { text: "They are equal because the energies are equal.", feedback: "Equal wavelength needs equal momentum, and photons and electrons relate $E$ and $p$ differently." },
        { text: "The electron, by a factor of 1836", feedback: "1836 is the proton–electron mass ratio; it plays no role here." },
      ],
      hint: "For the photon $\\lambda = hc/E$; for the electron $\\lambda = h/\\sqrt{2mE}$. Compare the two at 10 keV.",
    },
    {
      type: "quiz",
      id: "omp3-5-q5",
      variant: "concept",
      question: "If the kinetic energy of a free electron is doubled, its de Broglie wavelength becomes",
      options: [
        { text: "$\\lambda/2$", feedback: "That needs the momentum to double, which needs $K$ to quadruple." },
        { text: "$\\lambda/\\sqrt2$", correct: true, feedback: "$\\lambda = h/\\sqrt{2mK} \\propto 1/\\sqrt K$." },
        { text: "$\\sqrt2\\,\\lambda$", feedback: "More energy means more momentum, so a *shorter* wavelength." },
        { text: "$2\\lambda$", feedback: "Wavelength falls as energy rises, and only as the square root." },
      ],
      hint: "$\\lambda = h/\\sqrt{2mK}$. How does $\\lambda$ scale with $K$?",
    },
    {
      type: "quiz",
      id: "omp3-5-q6",
      variant: "practice",
      multiple: true,
      question: "An electron and a proton are each accelerated from rest through the same potential difference $V$. Select every correct statement.",
      options: [
        { text: "They gain the same kinetic energy.", correct: true, feedback: "Both have charge of magnitude $e$, so each gains $K = eV$." },
        { text: "The electron has the longer de Broglie wavelength.", correct: true, feedback: "At equal $K$, $\\lambda = h/\\sqrt{2mK}$ is longer for the smaller mass." },
        { text: "They have the same momentum.", feedback: "Same $K$ but $p = \\sqrt{2mK}$: the proton's momentum is $\\sqrt{1836} \\approx 43$ times larger." },
        { text: "$\\lambda_e/\\lambda_p \\approx 1836$", feedback: "1836 is the mass ratio. At equal kinetic energy $\\lambda \\propto 1/\\sqrt m$, so the ratio is $\\sqrt{1836} \\approx 43$." },
      ],
      hint: "Find the kinetic energy each gains first, then use $\\lambda = h/\\sqrt{2mK}$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "davisson-germer-experiment",
  title: "3.6 · Davisson–Germer and Electron Diffraction",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A hypothesis is only physics once an experiment tests it. If electrons really have $\\lambda = h/p$, then electrons of about 100 eV have wavelengths near 1 Å, just the spacing of atoms in a crystal. A crystal should then act as a diffraction grating for electrons, exactly as it does for X-rays. In 1927 Davisson and Germer at Bell Labs found this, partly by accident, after an air leak forced them to heat their nickel target, which recrystallised it into large single crystals.",
    },
    { type: "heading", text: "Electrons scattered off nickel" },
    {
      type: "text",
      content:
        "**The apparatus.** An electron gun (a heated filament plus an accelerating voltage $V$) fires a narrow beam of electrons at a nickel crystal, all in a vacuum. A detector on a movable arm measures how many electrons are scattered at each angle $\\theta$ from the incident beam. They repeated the scan for several voltages.",
    },
    {
      type: "text",
      content:
        "**What they found.** At most voltages the scattered intensity varied smoothly with angle. At $V = 54$ V a sharp peak stood out at $\\theta = 50°$. A smooth spray is what particles bouncing off atoms would give. A sharp peak at one special angle, appearing only at one special energy, is the signature of *waves* from many regularly spaced atoms adding in phase.",
    },
    { type: "heading", text: "Checking $\\lambda$ two ways" },
    {
      type: "text",
      content:
        "The surface rows of atoms in the nickel crystal are $d = 2.15$ Å apart and act like a reflection grating, with a first-order maximum where the path difference between neighbouring rows is one wavelength, $d\\sin\\theta = \\lambda$.",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} \\text{from diffraction:}\\quad &\\lambda = d\\sin\\theta = 2.15\\times\\sin 50^\\circ = 2.15\\times0.766 \\approx 1.65\\ \\text{Å} \\\\ \\text{from de Broglie:}\\quad &\\lambda = \\frac{12.27}{\\sqrt{54}} = \\frac{12.27}{7.35} \\approx 1.67\\ \\text{Å} \\end{aligned}",
    },
    {
      type: "text",
      content:
        "Agreement within about 1%, from two completely independent routes: one uses only crystal geometry and an angle, the other only $h$, $m_e$, $e$ and a voltmeter reading. Set the lab to the experiment's voltage and read the wavelength yourself.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-quantum-lab",
        mode: "de-broglie",
        particle: "electron",
        allowParticleChange: false,
        acceleratingVoltage: { min: 54, max: 54, step: 1, initial: 54 },
        caption: "The Davisson–Germer voltage, locked at 54 V. Compare the readout with 2.15 × sin 50° ≈ 1.65 Å.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $\\lambda \\approx 1.67$ Å, the same scale as the atomic spacing. Had the electrons been 5 keV, the wavelength would be only 0.17 Å and the peak would have moved to a much smaller angle ($\\sin\\theta = 0.17/2.15$).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Wave–particle duality",
      content:
        "Electrons (and all matter) travel as waves of wavelength $h/p$, which decide *where* they can arrive, but are detected as particles: each electron lands at one point, whole. Light does the same thing the other way round. Which aspect shows depends on the experiment.",
    },
    { type: "heading", text: "Electron microscopes and uncertainty" },
    {
      type: "text",
      content:
        "**Electron microscopes.** Chapter 2 showed that no instrument resolves detail much smaller than the wavelength it uses (Rayleigh, 2.6). Visible light stops at about 200 nm. Electrons accelerated through 50 kV have $\\lambda \\approx 12.27/\\sqrt{50\\,000} \\approx 0.055$ Å (a little less once relativity is included), about $10^5$ times shorter than visible light, which is why electron microscopes image viruses and even individual atomic columns.",
    },
    {
      type: "text",
      content:
        "**Heisenberg's uncertainty principle (qualitative).** A wave with one exact wavelength (one exact momentum) must stretch on forever, so it has no definite position. To localise a particle you must add waves of many wavelengths, which spreads its momentum. The trade-off is",
    },
    { type: "math", latex: "\\Delta x\\,\\Delta p \\gtrsim \\frac{h}{4\\pi}" },
    {
      type: "text",
      content:
        "It is not a defect of instruments; it is what being a wave means. For an electron confined to $\\Delta x = 1$ Å, $\\Delta p \\gtrsim \\dfrac{6.63\\times10^{-34}}{4\\pi\\times10^{-10}} = 5.3\\times10^{-25}$ kg·m/s, a speed spread of $\\Delta v = \\Delta p/m \\approx 5.8\\times10^{5}$ m/s. Inside an atom the electron's speed is genuinely uncertain by that much. For a 1 g bead the same calculation gives a speed spread too small ever to measure.",
    },
    {
      type: "worked-example",
      id: "omp3-6-we1",
      title: "Worked example 1 (voltage for a 1 Å electron)",
      problem:
        "Through what voltage must an electron be accelerated to have a de Broglie wavelength of 1 Å?",
      steps: [
        { text: "$\\lambda = \\dfrac{12.27}{\\sqrt V}$ Å $= 1$ Å gives $\\sqrt V = 12.27$. *Why this step:* invert the shortcut instead of going back to $h/\\sqrt{2meV}$." },
        { text: "$V = 12.27^2 \\approx 150$ V." },
      ],
      answer: "$V \\approx 150$ V",
    },
    {
      type: "worked-example",
      id: "omp3-6-we2",
      title: "Worked example 2 (photon vs electron with the same wavelength, 1 Å)",
      problem:
        "A photon and an electron each have wavelength 1 Å. Compare their energies.",
      steps: [
        { text: "Photon: $E = \\dfrac{hc}{\\lambda} = \\dfrac{1240}{0.1}$ eV $= 12\\,400$ eV $= 12.4$ keV. *Why this step:* 1 Å $= 0.1$ nm; keep units matched to $hc = 1240$ eV·nm." },
        { text: "Electron: from Worked example 1, $K = 150$ eV." },
        { text: "Ratio: $12\\,400/150 \\approx 83$. At the same wavelength the photon carries far more energy, which is another reason electron microscopes damage samples less than X-ray imaging at the same resolution." },
      ],
      answer: "Photon 12.4 keV, electron 150 eV: the photon has about 83 times more energy.",
    },
    {
      type: "worked-example",
      id: "omp3-6-we3",
      title: "Worked example 3 (re-running Davisson–Germer at a new voltage)",
      problem:
        "If the same crystal is used with electrons of wavelength 1.075 Å, at what angle is the first-order peak?",
      steps: [
        { text: "$\\sin\\theta = \\lambda/d = 1.075/2.15 = 0.5$." },
        { text: "$\\theta = 30°$. The electron energy for this wavelength is $V = (12.27/1.075)^2 \\approx 130$ V. Higher energy, shorter wavelength, smaller angle, exactly as for light through a grating." },
      ],
      answer: "$\\theta = 30^\\circ$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"diffraction proves the electron is spread out like a cloud of charge\"",
      content:
        "Send electrons one at a time and each one lands at a single point on the detector, as a whole electron with charge $e$. Only after thousands have arrived does the pattern of peaks appear. The wave describes the *probability* of where each electron lands, not a smeared-out electron.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "omp3-6-q1",
      variant: "concept",
      question: "What feature of the Davisson–Germer results showed wave behaviour?",
      options: [
        { text: "Electrons were scattered at all angles.", feedback: "Particles bouncing randomly would also scatter at all angles. That is not the wave signature." },
        { text: "The nickel crystal became negatively charged.", feedback: "Charge build-up says nothing about wave behaviour." },
        { text: "The electrons slowed down inside the crystal.", feedback: "The experiment measured scattering angles, not speeds inside the crystal." },
        { text: "A sharp intensity peak at one angle (50°) that appeared only at a particular voltage (54 V).", correct: true, feedback: "Constructive interference at one angle for one wavelength is diffraction: a wave effect." },
      ],
      hint: "Which observation looks like X-ray diffraction from a crystal, something a stream of tiny particles would not give?",
    },
    {
      type: "numeric",
      id: "omp3-6-q2",
      variant: "practice",
      question: "Through what potential difference, in volts, must an electron be accelerated to have a de Broglie wavelength of 0.5 Å?",
      answer: 602,
      relTolerance: 0.02,
      unit: "V",
      hint: "Invert $\\lambda = \\dfrac{12.27}{\\sqrt V}$ Å.",
      solution: "$\\sqrt V = \\dfrac{12.27}{0.5} = 24.5$, so $V = 24.5^2 \\approx 602$ V. (Check: halving the wavelength of Worked example 1 needs four times its 150 V.)",
      commonMistakes: [
        { answer: 150, feedback: "That gives 1 Å. Halving $\\lambda$ needs four times the voltage." },
        { answer: 300, feedback: "Doubling $V$ shrinks $\\lambda$ only by $\\sqrt2$. For half the wavelength you need $4\\times150$ V." },
        { answer: 24.5, feedback: "24.5 is $\\sqrt V$. Square it." },
      ],
    },
    {
      type: "numeric",
      id: "omp3-6-q3",
      variant: "practice",
      question: "A photon and an electron both have wavelength 0.2 nm. What is the ratio of the photon's energy to the electron's kinetic energy? Give the nearest whole number.",
      answer: 165,
      tolerance: 3,
      hint: "Photon: $E = 1240/\\lambda$ eV with $\\lambda$ in nm. Electron: $K = (12.27/\\lambda_{\\text{Å}})^2$ eV.",
      solution: "Photon: $E = \\dfrac{1240}{0.2} = 6200$ eV.\n\nElectron: $\\lambda = 2$ Å, so $\\sqrt V = 12.27/2 = 6.14$, $V \\approx 37.6$ V and $K \\approx 37.6$ eV.\n\nRatio: $6200/37.6 \\approx 165$.",
      commonMistakes: [
        { answer: 1, tolerance: 0, feedback: "Equal wavelength means equal momentum, not equal energy." },
        { answer: 0.006, tolerance: 0.001, feedback: "Reversed: the photon has the far larger energy at the same wavelength." },
        { answer: 82, tolerance: 2, feedback: "That is the ratio at 0.1 nm. The photon energy goes as $1/\\lambda$ but the electron's as $1/\\lambda^2$, so the ratio is proportional to $\\lambda$ and doubles to about 165." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-6-q4",
      variant: "concept",
      question: "Why can an electron microscope resolve much finer detail than an optical microscope?",
      options: [
        { text: "Electrons are smaller than photons.", feedback: "Resolution is set by wavelength, not by the \"size\" of the particle." },
        { text: "Electron lenses have more magnification.", feedback: "More magnification of a blurred image shows no more detail; resolution is limited by $\\lambda$ (2.6)." },
        { text: "Electrons travel faster than light.", feedback: "No particle with mass reaches $c$, let alone exceeds it." },
        { text: "The electrons' de Broglie wavelength is far shorter than that of visible light.", correct: true, feedback: "At tens of kV, $\\lambda$ is a few picometres, against 400–700 nm for light." },
      ],
      hint: "What property of the probe limits the finest detail any microscope can resolve? Compare that property for fast electrons and for visible light.",
    },
    {
      type: "quiz",
      id: "omp3-6-q5",
      variant: "concept",
      question: "Electrons are sent through a double slit one at a time. What does a single electron produce on the screen?",
      options: [
        { text: "A faint copy of the full interference pattern", feedback: "The electron is never detected spread out; it arrives at one place." },
        { text: "One dot at a single point; the fringes build up statistically from many electrons", correct: true, feedback: "Each electron is detected whole. The wave decides the probability of each landing spot." },
        { text: "Two dots, one behind each slit", feedback: "An electron is never detected in two places at once." },
        { text: "Nothing, because a single electron cannot interfere", feedback: "Each electron does interfere with itself: that is why the dots, added up, form fringes." },
      ],
      hint: "Separate two things: how an electron is detected when it reaches the screen, and what its wave describes (3.6).",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-3-mastery",
  title: "3.7 · Chapter 3 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "The chapter in six lines",
      content:
        "1. Light comes in photons: $E = h\\nu = 1240/\\lambda$ (eV, nm), $p = h/\\lambda = E/c$; power sets the photon count, $N = P\\lambda/hc$.\n2. Radiation force: $P/c$ absorbed, $2P/c$ reflected.\n3. One photon frees one electron: $K_{\\max} = h\\nu - \\phi = eV_0$; threshold $\\lambda_0 = 1240/\\phi$.\n4. Intensity sets the current; frequency sets $V_0$. $V_0$–$\\nu$ lines are parallel with slope $h/e$.\n5. Matter has $\\lambda = h/p = h/\\sqrt{2mqV}$; for electrons $12.27/\\sqrt V$ Å.\n6. Davisson–Germer: 54 V electrons diffract off nickel exactly as 1.66 Å waves.",
    },
    {
      type: "text",
      content:
        "No formula sheet below. Rebuild each answer from the photon picture and energy conservation. Take $hc = 1240$ eV·nm, $h = 6.63\\times10^{-34}$ J·s, $e = 1.6\\times10^{-19}$ C, $c = 3\\times10^8$ m/s, $m_e = 9.1\\times10^{-31}$ kg.",
    },
    {
      type: "numeric",
      id: "omp3-7-q1",
      variant: "mastery",
      question: "A 5 W source emits light of wavelength 663 nm. How many photons does it emit per second? (Scientific notation such as 2.5e19 is fine.)",
      answer: 1.667e19,
      relTolerance: 0.02,
      unit: "photons/s",
      hint: "Find one photon's energy in joules, then divide the power by it.",
      solution: "$E = \\dfrac{hc}{\\lambda} = \\dfrac{6.63\\times10^{-34}\\times3\\times10^8}{663\\times10^{-9}} = 3\\times10^{-19}$ J.\n\n$N = \\dfrac{P}{E} = \\dfrac{5}{3\\times10^{-19}} \\approx 1.7\\times10^{19}$ photons per second.",
      commonMistakes: [
        { answer: 1.5e-18, feedback: "That multiplies the power by the photon energy. Divide instead." },
        { answer: 3.33e18, feedback: "That is for 1 W. Multiply by 5." },
        { answer: 2.67, feedback: "That divides 5 W by the photon energy in eV (1.87 eV) without converting to joules." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-7-q2",
      variant: "mastery",
      question: "Sunlight of intensity 1.2 kW/m² falls normally on a 1 m² plate that reflects half the light and absorbs the rest. What force does the light exert?",
      options: [
        { text: "$6\\times10^{-6}$ N", correct: true, feedback: "Absorbed half: $0.5P/c$. Reflected half: $2\\times0.5P/c$. Total $1.5P/c = 1.5\\times1200/(3\\times10^8) = 6\\times10^{-6}$ N." },
        { text: "$4\\times10^{-6}$ N", feedback: "That is $P/c$, as if everything were absorbed. The reflected half pushes twice as hard." },
        { text: "$8\\times10^{-6}$ N", feedback: "That is $2P/c$, as if everything were reflected." },
        { text: "$2\\times10^{-6}$ N", feedback: "That counts only the absorbed half. The reflected half contributes $2\\times0.5P/c$ as well." },
      ],
      hint: "Radiation pressure (3.1): absorbed and reflected light transfer different momenta.",
    },
    {
      type: "numeric",
      id: "omp3-7-q3",
      variant: "mastery",
      question: "A metal gives $V_0 = 2.5$ V with 248 nm light and $V_0 = 1.5$ V with 310 nm light. What is its work function, in eV?",
      answer: 2.5,
      tolerance: 0.01,
      unit: "eV",
      hint: "$\\phi = h\\nu - eV_0$ for either reading; use the other as a check.",
      solution: "$\\dfrac{1240}{248} = 5$ eV, so $\\phi = 5 - 2.5 = 2.5$ eV.\n\nCheck: $\\dfrac{1240}{310} = 4$ eV and $4 - 1.5 = 2.5$ eV. ✓",
      commonMistakes: [
        { answer: 1, feedback: "That is the difference of the two stopping potentials, which equals the difference of photon energies, not $\\phi$." },
        { answer: 5, feedback: "That is the energy of the 248 nm photon. Subtract $eV_0$." },
        { answer: 4, feedback: "That is the energy of the 310 nm photon. Subtract $eV_0 = 1.5$ eV." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-7-q4",
      variant: "mastery",
      question: "Light that just ejects electrons from sodium ($\\phi = 2.75$ eV) is shone on caesium ($\\phi = 2.14$ eV) instead. What is the stopping potential for caesium?",
      options: [
        { text: "$0.61$ V", correct: true, feedback: "The photon energy is 2.75 eV (threshold for sodium). On caesium $K_{\\max} = 2.75 - 2.14 = 0.61$ eV." },
        { text: "Zero", feedback: "Zero is sodium's stopping potential at its threshold. Caesium holds its electrons more loosely." },
        { text: "$2.14$ V", feedback: "That is caesium's work function in volts. Subtract it from the photon energy." },
        { text: "$4.89$ V", feedback: "Work functions are not added. The photon pays caesium's $\\phi$ and the rest is kinetic energy." },
      ],
      hint: "Einstein's photoelectric equation (3.3): what does \"just ejects\" tell you about the photon energy?",
    },
    {
      type: "quiz",
      id: "omp3-7-q5",
      variant: "mastery",
      multiple: true,
      question: "Two $I$–$V$ curves for one metal: X saturates at 5 μA with $V_0 = 1.8$ V; Y saturates at 10 μA with $V_0 = 0.9$ V. Select every correct statement.",
      options: [
        { text: "Y used higher-frequency light, because its current is larger.", feedback: "Current counts electrons; frequency is read from $V_0$ only." },
        { text: "Both used the same frequency; only intensity differs.", feedback: "The stopping potentials differ, so the frequencies differ." },
        { text: "X delivered more photons per second.", feedback: "X's saturation current is lower, so fewer photons per second reached the metal." },
        { text: "X used higher-frequency light.", correct: true, feedback: "$V_0$ reads photon energy, and X's is larger." },
        { text: "Y delivered more photons per second.", correct: true, feedback: "Saturation current reads photon count, and Y's is twice X's." },
      ],
      hint: "Reading $I$–$V$ curves (3.4). Test each statement against the stopping potential and the saturation current.",
    },
    {
      type: "quiz",
      id: "omp3-7-q6",
      variant: "mastery",
      question: "An electron and a proton have the same kinetic energy. Find $\\lambda_e/\\lambda_p$ ($m_p/m_e \\approx 1836$).",
      options: [
        { text: "About 1836", feedback: "That is the ratio at equal *speed*. At equal kinetic energy only the square root survives." },
        { text: "About 43", correct: true, feedback: "$\\lambda = h/\\sqrt{2mK}$, so $\\lambda_e/\\lambda_p = \\sqrt{m_p/m_e} = \\sqrt{1836} \\approx 43$." },
        { text: "1", feedback: "Equal wavelength would need equal momentum, and at equal $K$ the proton has much more momentum." },
        { text: "About 1/43", feedback: "Upside down: the lighter electron has the longer wavelength." },
      ],
      hint: "The de Broglie wavelength at a given kinetic energy (3.5).",
    },
    {
      type: "numeric",
      id: "omp3-7-q7",
      variant: "mastery",
      question: "Light of wavelength 248 nm falls on a metal of work function 2.5 eV. The fastest photoelectrons enter a uniform magnetic field of $1.0\\times10^{-4}$ T at right angles. Find the radius of their circular path, in cm.",
      answer: 5.33,
      relTolerance: 0.02,
      unit: "cm",
      hint: "Einstein's equation gives $K_{\\max}$; then $r = \\frac{mv}{eB} = \\frac{\\sqrt{2mK}}{eB}$.",
      solution: "$K_{\\max} = \\dfrac{1240}{248} - 2.5 = 5 - 2.5 = 2.5$ eV $= 4\\times10^{-19}$ J.\n\n$p = \\sqrt{2mK} = \\sqrt{2\\times9.1\\times10^{-31}\\times4\\times10^{-19}} = 8.53\\times10^{-25}$ kg·m/s.\n\n$r = \\dfrac{p}{eB} = \\dfrac{8.53\\times10^{-25}}{1.6\\times10^{-19}\\times10^{-4}} \\approx 0.053$ m $= 5.3$ cm.",
      commonMistakes: [
        { answer: 7.54, feedback: "That uses the full photon energy, 5 eV, as the kinetic energy. The electron pays the work function first." },
        { answer: 3.77, feedback: "That uses $p = \\sqrt{mK}$. The momentum is $\\sqrt{2mK}$." },
        { answer: 0.533, feedback: "A power-of-ten slip in $eB = 1.6\\times10^{-19}\\times10^{-4} = 1.6\\times10^{-23}$." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-7-q8",
      variant: "mastery",
      question: "Light of wavelength 200 nm ejects electrons from a metal of work function 4.7 eV. What is the de Broglie wavelength of the fastest photoelectrons?",
      options: [
        { text: "200 nm", feedback: "That is the light's wavelength. The electron's wavelength comes from its own momentum." },
        { text: "About 0.49 nm", feedback: "That uses the photon energy 6.2 eV as the electron's kinetic energy, forgetting the work function." },
        { text: "About 0.82 nm", feedback: "That is $12.27/1.5$ Å, dividing by $K$ rather than $\\sqrt K$." },
        { text: "About 1.0 nm", correct: true, feedback: "$K_{\\max} = 6.2 - 4.7 = 1.5$ eV, so $\\lambda = 12.27/\\sqrt{1.5} \\approx 10.0$ Å $= 1.0$ nm." },
      ],
      hint: "Einstein's equation (3.3), then the de Broglie wavelength (3.5).",
    },
    {
      type: "numeric",
      id: "omp3-7-q9",
      variant: "mastery",
      question: "Photons of 248 nm eject electrons from a metal with $\\phi = 4.0$ eV. The fastest of them are then accelerated through a further 99 V. What is their final de Broglie wavelength, in ångströms? Give three decimal places.",
      answer: 1.227,
      tolerance: 0.003,
      unit: "Å",
      hint: "Add the energy the electron already has to the 99 eV it gains, then use $\\lambda = 12.27/\\sqrt{V}$ Å with the total.",
      solution: "$K_{\\max} = \\dfrac{1240}{248} - 4 = 5 - 4 = 1$ eV.\n\nAfter 99 V: $K = 1 + 99 = 100$ eV.\n\n$\\lambda = \\dfrac{12.27}{\\sqrt{100}} = 1.227$ Å.",
      commonMistakes: [
        { answer: 1.233, tolerance: 0.002, feedback: "That is $12.27/\\sqrt{99}$, ignoring the 1 eV the electron already had." },
        { answer: 12.27, feedback: "That is the wavelength before acceleration, at 1 eV." },
        { answer: 1.203, tolerance: 0.002, feedback: "That adds the photon's full 5 eV to the 99 eV. The electron keeps only $h\\nu - \\phi = 1$ eV." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-7-q10",
      variant: "mastery",
      question: "In the Davisson–Germer experiment, which pair of numbers agreed to confirm de Broglie's hypothesis?",
      options: [
        { text: "The electron energy 54 eV and the nickel work function", feedback: "The work function plays no role; the electrons are scattered, not emitted." },
        { text: "The atomic spacing 2.15 Å and the wavelength 2.15 Å", feedback: "The first-order condition includes $\\sin\\theta$: $\\lambda = d\\sin\\theta$, not $d$." },
        { text: "$\\lambda = 12.27/\\sqrt{54} \\approx 1.67$ Å and $\\lambda = d\\sin 50^\\circ = 2.15\\sin50^\\circ \\approx 1.65$ Å", correct: true, feedback: "One from the electron's momentum, one from crystal diffraction geometry." },
        { text: "The scattering angle 50° and the Brewster angle of nickel", feedback: "Brewster's angle belongs to polarised light (2.7), not electron diffraction." },
      ],
      hint: "Davisson–Germer (3.6): compare the de Broglie prediction with the diffraction measurement.",
    },
    {
      type: "quiz",
      id: "omp3-7-q11",
      variant: "mastery",
      question: "The wavelength of the light falling on a photocell is reduced from 400 nm to 300 nm, keeping the number of photons per second fixed. What happens?",
      options: [
        { text: "$V_0$ rises by a factor $4/3$; the saturation current is unchanged.", feedback: "$V_0$ is not proportional to $1/\\lambda$ because of the work function. Only the *change* is fixed: 1.03 V." },
        { text: "$V_0$ is unchanged; the saturation current rises.", feedback: "That is what raising the photon rate does. Changing the wavelength changes $V_0$." },
        { text: "Both $V_0$ and the saturation current rise.", feedback: "The photon rate is held fixed, so the electron rate, and the saturation current, are too." },
        { text: "$V_0$ rises by about 1.03 V; the saturation current is unchanged.", correct: true, feedback: "$\\Delta(h\\nu) = 1240(1/300 - 1/400) = 4.13 - 3.10 = 1.03$ eV. Same photon rate, same current." },
      ],
      hint: "Einstein's equation (3.3), and what sets the saturation current (3.4).",
    },
    {
      type: "quiz",
      id: "omp3-7-q12",
      variant: "mastery",
      question: "An alpha particle and a proton move with the same de Broglie wavelength. Find $K_\\alpha : K_p$.",
      options: [
        { text: "$4 : 1$", feedback: "At the same momentum the heavier particle has *less* kinetic energy." },
        { text: "$1 : 4$", correct: true, feedback: "Same $\\lambda$ means same $p$; $K = p^2/2m$, so $K_\\alpha/K_p = m_p/m_\\alpha = 1/4$." },
        { text: "$1 : 2$", feedback: "That uses $\\sqrt{m}$. At equal momentum $K = p^2/2m \\propto 1/m$, and the mass ratio is 4." },
        { text: "$1 : 1$", feedback: "Equal wavelength fixes momentum, not kinetic energy." },
      ],
      hint: "The same de Broglie wavelength means the same momentum (3.5).",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Electrons are waves. Chapter 4 wraps one of those waves round a nucleus: only a whole number of wavelengths fits, so only certain orbits and energies are allowed. That single idea explains the sharp lines of the hydrogen spectrum.",
    },
  ]),
};

export const ompChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
