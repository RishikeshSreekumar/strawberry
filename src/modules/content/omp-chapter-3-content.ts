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
    {
      type: "text",
      content:
        "**Worked example 1 (photon flux, JEE Main).** A 10 W lamp emits light of wavelength 600 nm. How many photons does it emit per second?\n\n1. Energy of one photon: $E = \\dfrac{hc}{\\lambda} = \\dfrac{6.63\\times10^{-34}\\times3\\times10^8}{600\\times10^{-9}} = 3.315\\times10^{-19}$ J. *Why this step:* the count is power divided by the size of each packet, so the packet must be in joules to match watts.\n2. Photons per second: $N = \\dfrac{P}{E} = \\dfrac{10}{3.315\\times10^{-19}} \\approx 3.0\\times10^{19}$ s⁻¹.\n3. Check with eV: $E = 1240/600 = 2.07$ eV $= 3.31\\times10^{-19}$ J. ✓\n\nThirty billion billion photons a second: that is why ordinary light looks smooth.\n\n**Worked example 2 (a solar sail).** 1 kW of sunlight falls normally on a perfectly reflecting sail. Find the force.\n\n1. Perfect reflection turns each photon's momentum round, so $F = \\dfrac{2P}{c}$. *Why this step:* $\\Delta p = 2p$ per photon, not $p$.\n2. $F = \\dfrac{2\\times1000}{3\\times10^8} = 6.7\\times10^{-6}$ N.\n3. Tiny, but it never stops and space has no friction, which is why sails are considered for deep-space probes.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (momentum of one photon).** Find the momentum of a photon of wavelength 1240 nm.\n\n1. $p = \\dfrac{h}{\\lambda} = \\dfrac{6.63\\times10^{-34}}{1.24\\times10^{-6}} \\approx 5.3\\times10^{-28}$ kg·m/s.\n2. Check with $p = E/c$: the energy is $1240/1240 = 1$ eV $= 1.6\\times10^{-19}$ J, and $\\dfrac{1.6\\times10^{-19}}{3\\times10^8} = 5.3\\times10^{-28}$. ✓ *Why this step:* $E = pc$ for a photon is a second route that catches a slipped power of ten.\n\n**Worked example 4 (why UV burns and red does not).** A skin molecule needs 4.0 eV to break. Compare one 250 nm photon with one 700 nm photon.\n\n1. $E_{250} = 1240/250 = 4.96$ eV $> 4.0$ eV: one photon can break the bond.\n2. $E_{700} = 1240/700 = 1.77$ eV $< 4.0$ eV: one photon cannot.\n3. A photon is absorbed whole by one molecule, and a molecule almost never collects two photons before the first one's energy leaks away as heat. *Why this step:* this is the step the wave picture misses; energy does not pile up on one molecule, so no brightness of red can do what a single UV photon does.",
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
    {
      type: "quiz",
      id: "omp3-1-q1",
      variant: "practice",
      question: "What is the energy of a 400 nm photon, using $hc = 1240$ eV·nm?",
      options: [
        { text: "$0.31$ eV", feedback: "A decimal slip: $1240/400 = 3.1$, not $0.31$." },
        { text: "$3.1$ eV", correct: true, feedback: "$1240/400 = 3.1$ eV, the violet end of the visible spectrum." },
        { text: "$4.96\\times10^{-19}$ eV", feedback: "$4.96\\times10^{-19}$ is about the energy in *joules* ($3.1 \\times 1.6\\times10^{-19}$). In eV it is simply 3.1." },
        { text: "$1.55$ eV", feedback: "That is the energy of an 800 nm photon. Energy goes as $1/\\lambda$, so shorter wavelength means more energy." },
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
    },
    {
      type: "quiz",
      id: "omp3-1-q3",
      variant: "practice",
      question: "A 1 mW laser emits light of wavelength 620 nm. How many photons does it emit per second? ($1$ eV $= 1.6\\times10^{-19}$ J)",
      options: [
        { text: "$3.1\\times10^{15}$", correct: true, feedback: "$E = 1240/620 = 2$ eV $= 3.2\\times10^{-19}$ J, and $10^{-3}/3.2\\times10^{-19} \\approx 3.1\\times10^{15}$." },
        { text: "$3.1\\times10^{18}$", feedback: "That uses 1 W. A milliwatt is $10^{-3}$ W." },
        { text: "$5\\times10^{-4}$", feedback: "That divides the power by 2 eV without converting eV to joules." },
        { text: "$6.2\\times10^{15}$", feedback: "That uses $1.6\\times10^{-19}$ J per photon, which is a 1 eV photon. A 620 nm photon carries 2 eV." },
      ],
      hint: "Photon energy in eV, then in joules, then divide the power by it.",
    },
    {
      type: "quiz",
      id: "omp3-1-q4",
      variant: "practice",
      question: "A 3 W beam falls normally on a perfectly absorbing black surface. What force does it exert? ($c = 3\\times10^8$ m/s)",
      options: [
        { text: "$2\\times10^{-8}$ N", feedback: "That is $2P/c$, the answer for a perfect *reflector*. An absorber takes $p$ per photon, not $2p$." },
        { text: "$9\\times10^{8}$ N", feedback: "That multiplies $P$ by $c$. Force is momentum per second, $P/c$." },
        { text: "$1\\times10^{-8}$ N", correct: true, feedback: "$F = P/c = 3/(3\\times10^8) = 10^{-8}$ N." },
        { text: "Zero, because photons have no mass.", feedback: "Photons carry momentum $E/c$; absorbing them transfers it." },
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
        "The alkali metals hold their outer electron loosely, so visible light works on them; that is why old photocells used caesium. Zinc ($\\phi \\approx 4.3$ eV) needs ultraviolet, which is exactly what Hallwachs found.\n\n**Worked example 1 (which metals respond?).** Light of wavelength 500 nm falls on caesium, potassium, sodium and copper. Which emit electrons?\n\n1. Photon energy: $E = 1240/500 = 2.48$ eV. *Why this step:* emission is decided photon by photon, so compare one photon's energy with $\\phi$.\n2. Compare: Cs ($2.14 < 2.48$) yes; K ($2.30 < 2.48$) yes; Na ($2.75 > 2.48$) no; Cu ($4.65$) no.\n3. So only caesium and potassium emit. Making the light brighter would not change the list.\n\n**Worked example 2 (threshold wavelength of sodium).** $\\phi = 2.75$ eV.\n\n1. At threshold the photon energy just equals the work function: $hc/\\lambda_0 = \\phi$.\n2. $\\lambda_0 = \\dfrac{1240}{2.75} \\approx 451$ nm.\n3. Wavelengths *shorter* than 451 nm eject electrons; longer ones do not. *Why this step:* it is easy to get the inequality backwards, and energy falls as $\\lambda$ rises.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (how long would the wave theory make us wait?).** Dim light of intensity $10^{-5}$ W/m² falls on potassium ($\\phi = 2.3$ eV). Suppose, as the wave theory would, that an electron soaks up the energy falling on an area of about one atom, $10^{-19}$ m². How long before it has 2.3 eV?\n\n1. Power reaching that area: $10^{-5}\\times10^{-19} = 10^{-24}$ W.\n2. Energy needed: $2.3\\times1.6\\times10^{-19} = 3.7\\times10^{-19}$ J.\n3. Time: $\\dfrac{3.7\\times10^{-19}}{10^{-24}} = 3.7\\times10^{5}$ s, about four days. *Why this step:* putting a number on the prediction makes the failure undeniable.\n4. Experiment: emission within about $10^{-9}$ s. Energy does not trickle in; it arrives in one photon.",
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
    },
    {
      type: "quiz",
      id: "omp3-2-q2",
      variant: "practice",
      question: "The work function of calcium is 3.2 eV. What is its threshold wavelength?",
      options: [
        { text: "$3968$ nm", feedback: "That multiplies 1240 by 3.2. The threshold is $1240/\\phi$." },
        { text: "$0.388$ nm", feedback: "The digits are right but the unit is not: with $hc = 1240$ eV·nm, $1240/3.2 = 388$ comes out directly in nanometres." },
        { text: "$388$ nm", correct: true, feedback: "$\\lambda_0 = 1240/3.2 = 387.5 \\approx 388$ nm." },
        { text: "$451$ nm", feedback: "That is sodium's threshold ($\\phi = 2.75$ eV)." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-2-q3",
      variant: "practice",
      question: "Light of wavelength 450 nm falls in turn on Cs (2.14 eV), K (2.30 eV), Na (2.75 eV) and Ca (3.20 eV). How many of them emit electrons?",
      options: [
        { text: "Three: Cs, K and Na", correct: true, feedback: "$2.76$ eV beats 2.14, 2.30 and (just) 2.75 eV, but not 3.20 eV." },
        { text: "All four", feedback: "The photon energy is $1240/450 = 2.76$ eV, less than calcium's 3.20 eV." },
        { text: "Two: Cs and K", feedback: "Sodium's 2.75 eV is just below $1240/450 = 2.76$ eV, so sodium emits (barely)." },
        { text: "None, because 450 nm is visible light", feedback: "Visible photons carry 1.8–3.1 eV, more than the alkali metals' work functions." },
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
    {
      type: "text",
      content:
        "**The straight line.** Divide by $e$:",
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
    {
      type: "text",
      content:
        "**Millikan's test.** Millikan, who expected to prove Einstein wrong, spent ten years measuring $V_0$ against $\\nu$ on carefully cleaned alkali-metal surfaces in vacuum. He found straight lines, and the slope gave $h$ within 0.5% of Planck's value from blackbody radiation. The photoelectric effect is now a standard way to *measure* $h$, as the next example does.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (JEE Main).** Light of wavelength 300 nm falls on potassium ($\\phi = 2.3$ eV). Find $K_{\\max}$ and $V_0$.\n\n1. Photon energy: $E = 1240/300 = 4.13$ eV. *Why this step:* the equation is an energy balance, so every term must be in eV.\n2. $K_{\\max} = 4.13 - 2.3 = 1.83$ eV.\n3. $V_0 = K_{\\max}/e = 1.83$ V. (In eV and volts the number is the same.)\n\n**Worked example 2 (maximum speed).** Continue: find $v_{\\max}$ ($m_e = 9.1\\times10^{-31}$ kg).\n\n1. $K_{\\max} = 1.83\\times1.6\\times10^{-19} = 2.93\\times10^{-19}$ J. *Why this step:* $\\tfrac12mv^2$ needs SI units.\n2. $v_{\\max} = \\sqrt{\\dfrac{2K}{m}} = \\sqrt{\\dfrac{2\\times2.93\\times10^{-19}}{9.1\\times10^{-31}}} = \\sqrt{6.44\\times10^{11}} \\approx 8.0\\times10^{5}$ m/s.\n3. Well below $c$, so the non-relativistic formula is fine.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (finding h and φ from two readings, JEE favourite).** A metal gives $V_0 = 1.2$ V for light of frequency $8\\times10^{14}$ Hz and $V_0 = 2.85$ V for $12\\times10^{14}$ Hz. Find $h$ and $\\phi$.\n\n1. Write the equation twice: $eV_1 = h\\nu_1 - \\phi$ and $eV_2 = h\\nu_2 - \\phi$.\n2. Subtract to kill $\\phi$: $e(V_2 - V_1) = h(\\nu_2 - \\nu_1)$. *Why this step:* the unknown work function is the same in both, so the difference isolates $h$.",
    },
    { type: "math", latex: "h = \\frac{e\\,\\Delta V_0}{\\Delta\\nu} = \\frac{1.6\\times10^{-19}\\times1.65}{4\\times10^{14}} = 6.6\\times10^{-34}\\ \\text{J·s}" },
    {
      type: "text",
      content:
        "3. Back-substitute into the first reading, in eV: $h\\nu_1/e = \\dfrac{6.6\\times10^{-34}\\times8\\times10^{14}}{1.6\\times10^{-19}} = 3.3$ eV, so $\\phi = 3.3 - 1.2 = 2.1$ eV.\n4. Check with the second: $h\\nu_2/e = 4.95$ eV and $4.95 - 2.1 = 2.85$. ✓\n\n**Worked example 4 (doubling the frequency).** A metal with $\\phi = 2$ eV is lit with 3 eV photons, then with 6 eV photons. By what factor does $V_0$ change?\n\n1. First: $V_0 = 3 - 2 = 1$ V.\n2. Second: $V_0 = 6 - 2 = 4$ V.\n3. Doubling $\\nu$ multiplied $V_0$ by 4, not 2. *Why this step:* $V_0$ is linear in $\\nu$ but not proportional to it; the $-\\phi$ offset breaks proportionality. Only the *increase* scales: $\\Delta V_0 = h\\Delta\\nu/e$.",
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
    {
      type: "quiz",
      id: "omp3-3-q1",
      variant: "practice",
      question: "Light of wavelength 200 nm falls on copper ($\\phi = 4.65$ eV). Find the stopping potential.",
      options: [
        { text: "$6.2$ V", feedback: "That is the photon energy. Subtract the work function." },
        { text: "$10.85$ V", feedback: "The work function is subtracted, not added: the electron pays $\\phi$ to get out." },
        { text: "$2.48\\times10^{-19}$ V", feedback: "$1.55$ eV $= 2.48\\times10^{-19}$ J, but a potential in volts is just 1.55." },
        { text: "$1.55$ V", correct: true, feedback: "$1240/200 = 6.2$ eV, and $6.2 - 4.65 = 1.55$ eV, so $V_0 = 1.55$ V." },
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
    },
    {
      type: "quiz",
      id: "omp3-3-q5",
      variant: "practice",
      question: "The threshold wavelength for a metal is 600 nm. Light of 400 nm falls on it. Find $K_{\\max}$.",
      options: [
        { text: "$1.03$ eV", correct: true, feedback: "$\\phi = 1240/600 = 2.07$ eV, $E = 1240/400 = 3.10$ eV, so $K_{\\max} = 1.03$ eV." },
        { text: "$3.10$ eV", feedback: "That is the photon energy. Subtract $\\phi = 1240/600$." },
        { text: "$6.2$ eV", feedback: "$1240/200$ uses the *difference* of wavelengths. Energies subtract, wavelengths do not: $K = 1240\\left(\\frac1{400} - \\frac1{600}\\right)$." },
        { text: "Zero, because 400 nm is visible", feedback: "400 nm is shorter than the 600 nm threshold, so each photon has more than $\\phi$." },
      ],
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
    {
      type: "text",
      content:
        "**Experiment 1: intensity only.** The wavelength is locked at 350 nm on sodium. Sweep the voltage from $-5$ to $+5$ V at 30% intensity, then at 90%.",
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
    {
      type: "text",
      content:
        "**Experiment 2: frequency only.** Now intensity is locked and the wavelength slides from 200 to 450 nm.",
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
    {
      type: "text",
      content:
        "**Experiment 3: the kinetic-energy version of the Einstein graph.** Same idea as 3.3, with $K_{\\max}$ in eV on the vertical axis.",
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
    {
      type: "text",
      content:
        "**Worked example 1 (reading a V₀–ν graph, JEE Main).** A $V_0$–$\\nu$ graph for a metal meets the $\\nu$-axis at $5\\times10^{14}$ Hz and has slope $4.1\\times10^{-15}$ V·s. Find $\\phi$ and $\\lambda_0$.\n\n1. The $\\nu$-intercept is the threshold frequency: $\\nu_0 = 5\\times10^{14}$ Hz.\n2. Setting $V_0 = 0$ in $V_0 = (h/e)(\\nu - \\nu_0)$ confirms that $\\phi/e = (h/e)\\nu_0 = \\text{slope}\\times\\nu_0$. *Why this step:* the slope is $h/e$, so slope times $\\nu_0$ is $\\phi$ in volts, which is $\\phi$ in eV.\n3. $\\phi = 4.1\\times10^{-15}\\times5\\times10^{14} = 2.05$ eV.\n4. $\\lambda_0 = c/\\nu_0 = \\dfrac{3\\times10^8}{5\\times10^{14}} = 6\\times10^{-7}$ m $= 600$ nm. (Check: $1240/2.05 \\approx 605$ nm, the small difference coming from rounding in $hc$.)\n\n**Worked example 2 (which curve is which?).** Two $I$–$V$ curves A and B for the same metal: A saturates at 8 μA and reaches zero at $-1.2$ V; B saturates at 4 μA and reaches zero at $-2.0$ V.\n\n1. Higher frequency ↔ larger $V_0$. B stops at 2.0 V, so B used the higher frequency. *Why this step:* the foot of the curve is the only feature set by photon energy.\n2. Larger saturation current ↔ more photons per second. A saturates higher, so A delivered more photons per second.\n3. Nothing in the graph lets you compare the power in watts directly: A has more photons but each is less energetic.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (V₀ against 1/λ).** For a metal, $V_0 = 1$ V at $\\lambda = 400$ nm. What is $V_0$ at 310 nm?\n\n1. $V_0 = \\dfrac{1240}{\\lambda} - \\phi$ (in volts with $\\lambda$ in nm), a line in $1/\\lambda$ with slope 1240 V·nm.\n2. From the first reading: $\\phi = 3.1 - 1 = 2.1$ eV.\n3. At 310 nm: $V_0 = 4.0 - 2.1 = 1.9$ V. *Why this step:* find $\\phi$ once, then any other wavelength is one subtraction away.",
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
    },
    {
      type: "quiz",
      id: "omp3-4-q5",
      variant: "practice",
      question: "A metal gives $V_0 = 2$ V with 248 nm light. What is $V_0$ with 310 nm light?",
      options: [
        { text: "$1$ V", correct: true, feedback: "$\\phi = 1240/248 - 2 = 5 - 2 = 3$ eV; at 310 nm, $V_0 = 4 - 3 = 1$ V." },
        { text: "$1.6$ V", feedback: "That scales $V_0$ by $248/310$, treating $V_0$ as proportional to $1/\\lambda$. The work function offset breaks that." },
        { text: "$2.5$ V", feedback: "Longer wavelength means lower photon energy, so $V_0$ must fall, not rise." },
        { text: "Zero", feedback: "The 310 nm photon has 4 eV, more than $\\phi = 3$ eV, so electrons still emerge." },
      ],
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
    {
      type: "text",
      content:
        "**His guess, built from the photon.** For a photon, $p = h/\\lambda$, which links a particle property (momentum) to a wave property (wavelength) through Planck's constant alone. Nothing in that relation mentions light specifically. De Broglie proposed that it holds for *every* particle: anything with momentum $p$ has a wavelength $h/p$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The de Broglie wavelength",
      content:
        "A particle of momentum $p = mv$ has an associated matter wave of wavelength\n$\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}$\nFor slow particles, $K = \\dfrac{p^2}{2m}$ gives $p = \\sqrt{2mK}$, and a charge $q$ accelerated from rest through potential difference $V$ has $K = qV$.",
    },
    {
      type: "text",
      content:
        "**Derivation of the working forms.** Start from $\\lambda = h/p$ and replace the momentum step by step:",
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
    {
      type: "text",
      content:
        "**Worked example 1 (electron through 100 V, JEE Main).**\n\n1. $K = eV = 100$ eV, a slow (non-relativistic) electron.\n2. $\\lambda = \\dfrac{12.27}{\\sqrt{100}}$ Å $= 1.227$ Å $= 0.1227$ nm. *Why this step:* the shortcut already contains $h$, $m_e$ and $e$; use it only for electrons.\n\n**Worked example 2 (proton vs alpha through the same V).** Find $\\lambda_p/\\lambda_\\alpha$.\n\n1. $\\lambda = \\dfrac{h}{\\sqrt{2mqV}}$, and $V$ is the same, so $\\dfrac{\\lambda_p}{\\lambda_\\alpha} = \\sqrt{\\dfrac{m_\\alpha q_\\alpha}{m_p q_p}}$. *Why this step:* ratio questions are solved by writing the formula, cancelling what is common, and keeping only what differs.\n2. $m_\\alpha = 4m_p$ and $q_\\alpha = 2e$, so $\\dfrac{\\lambda_p}{\\lambda_\\alpha} = \\sqrt{4\\times2} = 2\\sqrt2$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (photon vs electron of the same energy, 10 keV).**\n\n1. Photon: $\\lambda = \\dfrac{1240}{10\\,000}$ nm $= 0.124$ nm $= 1.24$ Å. *Why this step:* for a photon $E = pc$, so $\\lambda = hc/E$.\n2. Electron: $\\lambda = \\dfrac{12.27}{\\sqrt{10\\,000}}$ Å $= 0.123$ Å. *Why this step:* for a massive particle $E = p^2/2m$, so $\\lambda = h/\\sqrt{2mE}$. Different energy–momentum relations, different answers.\n3. At equal energy, the electron's wavelength is about 10 times shorter. This is the reason electron microscopes see finer detail than X-ray or light microscopes at comparable energies.\n\n**Worked example 4 (why cricket balls do not diffract).** A 150 g ball at 30 m/s.\n\n1. $p = 0.15\\times30 = 4.5$ kg·m/s.\n2. $\\lambda = \\dfrac{6.63\\times10^{-34}}{4.5} \\approx 1.5\\times10^{-34}$ m.\n3. That is about $10^{-19}$ times the size of a proton. No gap or obstacle is anywhere near that small, so the ball shows no wave behaviour at all. *Why this step:* wave effects need an aperture comparable to $\\lambda$ (Chapter 2), and here there is none.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (thermal neutrons).** Neutrons in equilibrium with a moderator at temperature $T$ have average kinetic energy $\\tfrac32kT$ (kinetic theory). Find $\\lambda$ at 300 K ($m_n = 1.675\\times10^{-27}$ kg, $k = 1.38\\times10^{-23}$ J/K).\n\n1. $p = \\sqrt{2m\\cdot\\tfrac32kT} = \\sqrt{3mkT}$, so $\\lambda = \\dfrac{h}{\\sqrt{3mkT}}$.\n2. $3mkT = 3\\times1.675\\times10^{-27}\\times1.38\\times10^{-23}\\times300 = 2.08\\times10^{-47}$, whose square root is $4.56\\times10^{-24}$.\n3. $\\lambda = \\dfrac{6.63\\times10^{-34}}{4.56\\times10^{-24}} \\approx 1.45\\times10^{-10}$ m $= 1.45$ Å. Again atomic spacing, which is why thermal neutrons are used to study crystal structures.",
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
    {
      type: "quiz",
      id: "omp3-5-q1",
      variant: "practice",
      question: "An electron is accelerated from rest through 400 V. What is its de Broglie wavelength?",
      options: [
        { text: "$0.031$ Å", feedback: "That divides by 400 instead of $\\sqrt{400}$. The wavelength goes as $1/\\sqrt V$." },
        { text: "$3.1$ nm", feedback: "That is $1240/400$ nm, the photon formula. An electron's energy–momentum relation is different." },
        { text: "$0.61$ Å", correct: true, feedback: "$12.27/\\sqrt{400} = 12.27/20 = 0.61$ Å." },
        { text: "$1.227$ Å", feedback: "That is the value at 100 V. At four times the voltage, $\\lambda$ halves." },
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
    {
      type: "text",
      content:
        "**The check, two ways.** The surface rows of atoms in the nickel crystal are $d = 2.15$ Å apart and act like a reflection grating, with a first-order maximum where the path difference between neighbouring rows is one wavelength, $d\\sin\\theta = \\lambda$.",
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
      type: "text",
      content:
        "**Worked example 1 (voltage for a 1 Å electron).**\n\n1. $\\lambda = \\dfrac{12.27}{\\sqrt V}$ Å $= 1$ Å gives $\\sqrt V = 12.27$. *Why this step:* invert the shortcut instead of going back to $h/\\sqrt{2meV}$.\n2. $V = 12.27^2 \\approx 150$ V.\n\n**Worked example 2 (photon vs electron with the same wavelength, 1 Å).** Compare their energies.\n\n1. Photon: $E = \\dfrac{hc}{\\lambda} = \\dfrac{1240}{0.1}$ eV $= 12\\,400$ eV $= 12.4$ keV. *Why this step:* 1 Å $= 0.1$ nm; keep units matched to $hc = 1240$ eV·nm.\n2. Electron: from Worked example 1, $K = 150$ eV.\n3. Ratio: $12\\,400/150 \\approx 83$. At the same wavelength the photon carries far more energy, which is another reason electron microscopes damage samples less than X-ray imaging at the same resolution.\n\n**Worked example 3 (re-running Davisson–Germer at a new voltage).** If the same crystal is used with electrons of wavelength 1.075 Å, at what angle is the first-order peak?\n\n1. $\\sin\\theta = \\lambda/d = 1.075/2.15 = 0.5$.\n2. $\\theta = 30°$. The electron energy for this wavelength is $V = (12.27/1.075)^2 \\approx 130$ V. Higher energy, shorter wavelength, smaller angle, exactly as for light through a grating.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"diffraction proves the electron is spread out like a cloud of charge\"",
      content:
        "Send electrons one at a time and each one lands at a single point on the detector, as a whole electron with charge $e$. Only after thousands have arrived does the pattern of peaks appear. The wave describes the *probability* of where each electron lands, not a smeared-out electron.",
    },
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
    },
    {
      type: "quiz",
      id: "omp3-6-q2",
      variant: "practice",
      question: "Through what potential difference must an electron be accelerated to have a de Broglie wavelength of 0.5 Å?",
      options: [
        { text: "About 600 V", correct: true, feedback: "$\\sqrt V = 12.27/0.5 = 24.5$, so $V \\approx 602$ V." },
        { text: "About 150 V", feedback: "That gives 1 Å. Halving $\\lambda$ needs four times the voltage." },
        { text: "About 300 V", feedback: "Doubling $V$ shrinks $\\lambda$ only by $\\sqrt2$. For half the wavelength you need $4\\times150$ V." },
        { text: "About 24.5 V", feedback: "24.5 is $\\sqrt V$. Square it." },
      ],
    },
    {
      type: "quiz",
      id: "omp3-6-q3",
      variant: "practice",
      question: "A photon and an electron both have wavelength 0.2 nm. Roughly what is the ratio of the photon's energy to the electron's kinetic energy?",
      options: [
        { text: "1", feedback: "Equal wavelength means equal momentum, not equal energy." },
        { text: "About 0.006", feedback: "Reversed: the photon has the far larger energy at the same wavelength." },
        { text: "About 165", correct: true, feedback: "Photon: $1240/0.2 = 6200$ eV. Electron: $\\sqrt V = 12.27/2 = 6.14$, so $V \\approx 37.6$ V, $K \\approx 37.6$ eV. Ratio $\\approx 165$." },
        { text: "About 83", feedback: "That is the ratio at 0.1 nm. The photon energy goes as $1/\\lambda$ but the electron's as $1/\\lambda^2$, so the ratio is proportional to $\\lambda$ and doubles to about 165." },
      ],
      hint: "Photon: $E = 1240/\\lambda$ eV with $\\lambda$ in nm. Electron: $K = (12.27/\\lambda_{\\text{Å}})^2$ eV.",
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
      type: "quiz",
      id: "omp3-7-q1",
      variant: "mastery",
      question: "A 5 W source emits light of wavelength 663 nm. How many photons does it emit per second?",
      options: [
        { text: "$1.5\\times10^{-18}$", feedback: "That multiplies the power by the photon energy. Divide instead." },
        { text: "$3.3\\times10^{18}$", feedback: "That is for 1 W. Multiply by 5." },
        { text: "$1.7\\times10^{19}$", correct: true, feedback: "$E = \\frac{6.63\\times10^{-34}\\times3\\times10^8}{663\\times10^{-9}} = 3\\times10^{-19}$ J; $N = 5/(3\\times10^{-19}) \\approx 1.7\\times10^{19}$." },
        { text: "$2.7$", feedback: "That divides 5 W by the photon energy in eV (1.87 eV) without converting to joules." },
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
    },
    {
      type: "quiz",
      id: "omp3-7-q3",
      variant: "mastery",
      question: "A metal gives $V_0 = 2.5$ V with 248 nm light and $V_0 = 1.5$ V with 310 nm light. What is its work function?",
      options: [
        { text: "$1.0$ eV", feedback: "That is the difference of the two stopping potentials, which equals the difference of photon energies, not $\\phi$." },
        { text: "$5$ eV", feedback: "That is the energy of the 248 nm photon. Subtract $eV_0$." },
        { text: "$2.5$ eV", correct: true, feedback: "$1240/248 = 5$ eV, $5 - 2.5 = 2.5$; check: $1240/310 = 4$ eV, $4 - 1.5 = 2.5$. ✓" },
        { text: "$4$ eV", feedback: "That is the energy of the 310 nm photon. Subtract $eV_0 = 1.5$ eV." },
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
    },
    {
      type: "quiz",
      id: "omp3-7-q5",
      variant: "mastery",
      question: "Two $I$–$V$ curves for one metal: X saturates at 5 μA with $V_0 = 1.8$ V; Y saturates at 10 μA with $V_0 = 0.9$ V. Which statement is correct?",
      options: [
        { text: "Y used higher-frequency light, because its current is larger.", feedback: "Current counts electrons; frequency is read from $V_0$ only." },
        { text: "Both used the same frequency; only intensity differs.", feedback: "The stopping potentials differ, so the frequencies differ." },
        { text: "X delivered more photons per second.", feedback: "X's saturation current is lower, so fewer photons per second reached the metal." },
        { text: "X used higher-frequency light; Y delivered more photons per second.", correct: true, feedback: "$V_0$ reads photon energy (X is higher); saturation current reads photon count (Y is higher)." },
      ],
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
    },
    {
      type: "quiz",
      id: "omp3-7-q7",
      variant: "mastery",
      question: "Light of wavelength 248 nm falls on a metal of work function 2.5 eV. The fastest photoelectrons enter a uniform magnetic field of $1.0\\times10^{-4}$ T at right angles. Find the radius of their circular path.",
      options: [
        { text: "About 7.5 cm", feedback: "That uses the full photon energy, 5 eV, as the kinetic energy. The electron pays the work function first." },
        { text: "About 5.3 cm", correct: true, feedback: "$K_{\\max} = 5 - 2.5 = 2.5$ eV $= 4\\times10^{-19}$ J; $p = \\sqrt{2mK} = 8.53\\times10^{-25}$; $r = p/(eB) = 8.53\\times10^{-25}/(1.6\\times10^{-23}) \\approx 0.053$ m." },
        { text: "About 3.8 cm", feedback: "That uses $p = \\sqrt{mK}$. The momentum is $\\sqrt{2mK}$." },
        { text: "About 0.53 cm", feedback: "A power-of-ten slip in $eB = 1.6\\times10^{-19}\\times10^{-4} = 1.6\\times10^{-23}$." },
      ],
      hint: "Einstein's equation gives $K_{\\max}$; then $r = \\frac{mv}{eB} = \\frac{\\sqrt{2mK}}{eB}$.",
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
    },
    {
      type: "quiz",
      id: "omp3-7-q9",
      variant: "mastery",
      question: "Photons of 248 nm eject electrons from a metal with $\\phi = 4.0$ eV. The fastest of them are then accelerated through a further 99 V. What is their final de Broglie wavelength?",
      options: [
        { text: "$1.227$ Å", correct: true, feedback: "$K_{\\max} = 5 - 4 = 1$ eV; after 99 V, $K = 100$ eV; $\\lambda = 12.27/\\sqrt{100} = 1.227$ Å." },
        { text: "$1.233$ Å", feedback: "That is $12.27/\\sqrt{99}$, ignoring the 1 eV the electron already had." },
        { text: "$12.27$ Å", feedback: "That is the wavelength before acceleration, at 1 eV." },
        { text: "$1.20$ Å", feedback: "That adds the photon's full 5 eV to the 99 eV. The electron keeps only $h\\nu - \\phi = 1$ eV." },
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
