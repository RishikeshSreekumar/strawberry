import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Optics and Modern Physics Chapter 4 — Atoms and Nuclei.
 * Rutherford's tiny nucleus, Bohr's quantised orbits (Coulomb + mvr = nh/2π)
 * and the hydrogen spectrum, a short look at X-rays, then the nucleus:
 * size, mass defect and binding energy, the decay law, fission and fusion.
 * Constants: hc = 1240 eV·nm, e²/4πε₀ = 1.44 MeV·fm, 1 u = 931.5 MeV/c²,
 * R = 1.097×10⁷ m⁻¹.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "rutherford-model",
  title: "4.1 · Rutherford's Nuclear Atom",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 1909 Geiger and Marsden fired alpha particles at a gold foil a few hundred atoms thick. Almost all went straight through, deflected by a degree or so. But about one in eight thousand bounced back through more than 90°. Rutherford later said: \"It was quite the most incredible event that has ever happened to me in my life. It was almost as incredible as if you fired a 15-inch shell at a piece of tissue paper and it came back and hit you.\"",
    },
    {
      type: "text",
      content:
        "**Why it was incredible.** The accepted model was Thomson's \"plum pudding\": positive charge spread through the whole atom, with electrons dotted in it. Spread-out charge exerts only weak forces; an alpha particle (mass $4$ u, energy several MeV) ploughing through it should be nudged, never turned round. To reverse a heavy, fast alpha particle you need a huge force, and Coulomb's law gives a huge force only at a tiny distance from a concentrated charge.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Rutherford's nuclear model",
      content:
        "Nearly all of an atom's mass and all of its positive charge $+Ze$ sit in a **nucleus** about $10^{-15}$–$10^{-14}$ m across, some $10^{4}$–$10^{5}$ times smaller than the atom ($\\sim10^{-10}$ m). The electrons move around it; the atom is mostly empty space.",
    },
    {
      type: "text",
      content:
        "The model explains the numbers. Most alphas pass far from any nucleus and barely deflect. A very few happen to head almost straight at one; they are pushed back hard. Rutherford calculated how many should scatter through each angle $\\theta$ and found a count proportional to $1/\\sin^4(\\theta/2)$, which fell steeply with angle exactly as Geiger and Marsden measured. The count depends on how close each alpha's line of approach is to the nucleus, the **impact parameter** $b$: a head-on shot ($b = 0$) bounces straight back, and larger $b$ means smaller deflection ($b \\propto \\cot\\frac\\theta2$).",
    },
    {
      type: "text",
      content:
        "**Distance of closest approach (derivation).** Take the head-on case. The alpha (charge $2e$) starts far away with kinetic energy $K$ and slows down as it climbs the Coulomb hill of the nucleus (charge $Ze$, assumed fixed because it is so much heavier). It stops momentarily at distance $r_0$, where all its kinetic energy has become potential energy:",
    },
    { type: "math", latex: "K = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{(2e)(Ze)}{r_0} \\quad\\Longrightarrow\\quad r_0 = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{2Ze^2}{K}" },
    {
      type: "callout",
      variant: "tip",
      title: "A constant that saves a page of arithmetic",
      content:
        "$\\dfrac{e^2}{4\\pi\\varepsilon_0} = 9\\times10^9\\times(1.6\\times10^{-19})^2$ J·m $= 2.3\\times10^{-28}$ J·m $= 1.44$ MeV·fm. With $K$ in MeV, $r_0 = \\dfrac{2Z\\times1.44}{K}$ fm.",
    },
    {
      type: "text",
      content:
        "For gold ($Z = 79$), $2\\times79\\times1.44 = 227.5$ MeV·fm, so $r_0 = 227.5/K$ fm. The graph below plots it with $r_0$ in units of 10 fm. Drag the energy.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "22.75/x",
        exprLatex: "r_0 = \\frac{227.5}{K\\,(\\text{MeV})}\\ \\text{fm}\\quad(\\text{vertical axis in units of 10 fm})",
        window: { xmin: 0, xmax: 10, ymin: 0, ymax: 12 },
        initial: 5,
        excluded: [0],
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at 5 MeV, $r_0 = 4.55$ units, that is 45.5 fm; doubling the energy halves the distance. Gold's nucleus has radius about 7 fm, so even these violent head-on collisions stop well outside it. The alphas measure an *upper bound* on the nuclear size; only above about 30 MeV would they touch.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (JEE Main).** 5 MeV alpha particles are fired head-on at gold nuclei ($Z = 79$). Find the distance of closest approach.\n\n1. Energy conservation: $K = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2Ze^2}{r_0}$. *Why this step:* at the turning point the alpha is momentarily at rest, so all of $K$ is Coulomb energy.\n2. $r_0 = \\dfrac{2\\times79\\times1.44\\ \\text{MeV·fm}}{5\\ \\text{MeV}} = \\dfrac{227.5}{5} \\approx 45.5$ fm $= 4.55\\times10^{-14}$ m.\n3. Compare: the gold atom is about $3\\times10^{-10}$ m across, nearly $10^4$ times bigger.\n\n**Worked example 2 (energy to touch the nucleus).** Gold's nuclear radius is about 7 fm. What alpha energy would bring it that close (ignoring the alpha's own size)?\n\n1. Set $r_0 = 7$ fm: $K = \\dfrac{227.5\\ \\text{MeV·fm}}{7\\ \\text{fm}} \\approx 32.5$ MeV.\n2. Natural alpha sources give at most about 9 MeV, which is why Rutherford's alphas never reached gold's nuclear force; the scattering was pure Coulomb, and his $1/\\sin^4$ law fitted perfectly. *Why this step:* this explains why the experiment could use only Coulomb's law and still be exact.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a lighter target).** 4 MeV alphas hit aluminium ($Z = 13$) head-on. Find $r_0$.\n\n1. $r_0 = \\dfrac{2\\times13\\times1.44}{4} = \\dfrac{37.4}{4} \\approx 9.4$ fm.\n2. Aluminium's radius is about $1.2\\times27^{1/3} = 3.6$ fm (lesson 4.5). Still outside, but closer. With light nuclei, Rutherford later did see departures from the Coulomb law: the first sign of a new, short-range nuclear force.",
    },
    {
      type: "text",
      content:
        "**Where the model breaks.** An electron circling a nucleus is accelerating (centripetal acceleration), and classical electromagnetism says accelerating charges radiate. The electron should lose energy, spiral inwards and crash into the nucleus in about $10^{-11}$ s, emitting a continuous smear of frequencies on the way. Atoms are stable and emit sharp lines. Something beyond classical physics is needed, and lesson 4.2 supplies it.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"most alpha particles bounced back\"",
      content:
        "Almost all of them went straight through with tiny deflections; roughly 1 in 8000 was scattered through more than 90°. The rare back-scatters are the whole point: they show the positive charge is concentrated in a tiny region that most alphas never come near.",
    },
    {
      type: "quiz",
      id: "omp4-1-q1",
      variant: "concept",
      question: "What did the rare large-angle scattering of alpha particles show?",
      options: [
        { text: "The positive charge is spread evenly through the atom.", feedback: "That is Thomson's model, which predicts only small deflections." },
        { text: "The atom's positive charge and mass are concentrated in a tiny nucleus.", correct: true, feedback: "Only a concentrated charge produces a Coulomb force big enough to reverse a fast alpha." },
        { text: "Electrons are much heavier than alpha particles.", feedback: "Electrons are about 7300 times lighter than an alpha; they cannot turn it round." },
        { text: "Gold atoms are tightly packed with no empty space.", feedback: "Most alphas passing straight through shows the opposite: the atom is mostly empty." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-1-q2",
      variant: "practice",
      question: "An 8 MeV alpha particle approaches a gold nucleus ($Z = 79$) head-on. Find the distance of closest approach. ($e^2/4\\pi\\varepsilon_0 = 1.44$ MeV·fm)",
      options: [
        { text: "About 14 fm", feedback: "That leaves out the alpha's charge $2e$: $79\\times1.44/8 = 14.2$ fm." },
        { text: "About 57 fm", feedback: "That is $227.5/4$, the answer for 4 MeV. Doubling $K$ halves $r_0$." },
        { text: "About 28 fm", correct: true, feedback: "$r_0 = 227.5/8 \\approx 28.4$ fm." },
        { text: "About 1820 fm", feedback: "That multiplies by $K$ instead of dividing: $r_0 \\propto 1/K$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-1-q3",
      variant: "concept",
      question: "If the kinetic energy of the alpha particles is doubled, the distance of closest approach becomes",
      options: [
        { text: "Half", correct: true, feedback: "$r_0 = \\frac{2Ze^2}{4\\pi\\varepsilon_0K} \\propto 1/K$." },
        { text: "Double", feedback: "More energy lets the alpha climb *higher* up the Coulomb hill, so closer." },
        { text: "$1/\\sqrt2$ times", feedback: "There is no square root: $r_0 \\propto 1/K$ directly." },
        { text: "Unchanged", feedback: "$r_0$ is set by where $K$ equals the Coulomb energy, so it depends on $K$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-1-q4",
      variant: "concept",
      question: "Why did Rutherford's planetary atom need replacing?",
      options: [
        { text: "It could not explain large-angle scattering.", feedback: "Explaining large-angle scattering was exactly its success." },
        { text: "It put the electrons inside the nucleus.", feedback: "Rutherford's electrons orbit outside the nucleus." },
        { text: "An orbiting electron accelerates, so classically it should radiate, spiral in, and emit a continuous spectrum.", correct: true, feedback: "Real atoms are stable and emit sharp lines, so classical physics fails inside the atom." },
        { text: "The nucleus it predicted was too large.", feedback: "Scattering experiments set only an *upper* bound on its size, consistent with later measurements." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-1-q5",
      variant: "practice",
      question: "What kinetic energy must an alpha particle have to reach 10 fm from a nucleus of charge $Z = 50$ (head-on)?",
      options: [
        { text: "$14.4$ MeV", correct: true, feedback: "$K = \\frac{2\\times50\\times1.44}{10} = 14.4$ MeV." },
        { text: "$7.2$ MeV", feedback: "That forgets the alpha's charge $2e$." },
        { text: "$1440$ MeV", feedback: "That multiplies by the distance. $K = 2Z(1.44)/r_0$." },
        { text: "$72$ MeV", feedback: "Check the arithmetic: $2\\times50\\times1.44 = 144$, and $144/10 = 14.4$." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "bohr-model",
  title: "4.2 · The Bohr Model",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Niels Bohr's move in 1913 was bold: keep Rutherford's nucleus and Newton's mechanics, but *forbid* most orbits. He did not explain why; he found the rule that reproduced hydrogen's spectrum and let the numbers speak. Ten years later de Broglie supplied the reason, and you already have it from Chapter 3.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Bohr's postulates",
      content:
        "1. **Stationary orbits.** The electron moves in circular orbits under the Coulomb force and, in these orbits only, does not radiate.\n2. **Quantised angular momentum.** Allowed orbits have $mvr = n\\dfrac{h}{2\\pi}$, $n = 1, 2, 3, \\ldots$\n3. **Frequency condition.** A photon is emitted or absorbed only when the electron jumps between orbits: $h\\nu = E_i - E_f$.",
    },
    {
      type: "text",
      content:
        "**Why only those orbits? (de Broglie's picture).** An electron of momentum $mv$ is a wave of wavelength $\\lambda = h/mv$. Going round an orbit, the wave meets itself. Unless a whole number of wavelengths fits the circumference, it interferes with itself destructively and cannot persist. So $2\\pi r = n\\lambda = n\\dfrac{h}{mv}$, which is exactly $mvr = nh/2\\pi$. Postulate 2 is a standing-wave condition.",
    },
    {
      type: "text",
      content:
        "**Derivation of the radius and speed.** Write $k = \\dfrac{1}{4\\pi\\varepsilon_0}$ and take a hydrogen-like ion (nucleus $+Ze$, one electron). Two equations:",
    },
    {
      type: "math",
      latex: "\\text{(1) Coulomb = centripetal:}\\ \\ \\frac{mv^2}{r} = \\frac{kZe^2}{r^2} \\qquad \\text{(2) quantisation:}\\ \\ mvr = \\frac{nh}{2\\pi}",
    },
    {
      type: "text",
      content:
        "Multiply (1) by $r^2$: $mv^2 r = kZe^2$. Now divide this by (2), $mvr = nh/2\\pi$. The left side becomes $\\dfrac{mv^2r}{mvr} = v$, so $v = \\dfrac{kZe^2}{nh/2\\pi}$. *Why this step:* dividing kills $m$ and $r$ together and leaves $v$ alone. Then $r$ follows from (2):",
    },
    {
      type: "math",
      latex:
        "v_n = \\frac{2\\pi kZe^2}{nh} = 2.19\\times10^6\\,\\frac{Z}{n}\\ \\text{m/s}, \\qquad r_n = \\frac{nh}{2\\pi m v_n} = \\frac{n^2h^2}{4\\pi^2 mkZe^2} = 0.529\\,\\frac{n^2}{Z}\\ \\text{Å}",
    },
    {
      type: "text",
      content:
        "**Derivation of the energy.** Kinetic energy from (1): $K = \\tfrac12mv^2 = \\dfrac{kZe^2}{2r}$. Potential energy: $U = -\\dfrac{kZe^2}{r}$. So",
    },
    {
      type: "math",
      latex:
        "E = K + U = -\\frac{kZe^2}{2r_n} = -\\frac{2\\pi^2mk^2Z^2e^4}{n^2h^2} = -13.6\\,\\frac{Z^2}{n^2}\\ \\text{eV}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Bohr results for a hydrogen-like ion",
      content:
        "$r_n = 0.529\\,\\dfrac{n^2}{Z}$ Å, $\\quad v_n = 2.19\\times10^6\\,\\dfrac{Z}{n}$ m/s $\\left(= \\dfrac{c}{137}\\dfrac Zn\\right)$, $\\quad E_n = -13.6\\,\\dfrac{Z^2}{n^2}$ eV\nand, at every level, $K = -E$, $\\ U = 2E$. The ground state of hydrogen: $r_1 = 0.529$ Å, $E_1 = -13.6$ eV; ionisation energy $13.6Z^2$ eV.",
    },
    {
      type: "text",
      content:
        "The negative energy means the electron is **bound**: zero is the energy of an electron at rest infinitely far away, so you must *supply* $13.6$ eV to free a ground-state hydrogen electron. The ladder below shows the levels crowding together towards $E = 0$ as $n$ grows. Switch to He⁺ ($Z = 2$) and Li²⁺ ($Z = 3$).",
    },
    {
      type: "interactive",
      config: {
        component: "omp-quantum-lab",
        mode: "bohr-levels",
        atomicNumber: 1,
        upperLevel: 3,
        lowerLevel: 2,
        transition: "emission",
        showOrbits: true,
        caption:
          "Read E₁ for H, He⁺ and Li²⁺, and count the de Broglie wavelengths round the upper orbit as you change n.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: every level scales by $Z^2$ ($E_1 = -13.6$, $-54.4$, $-122.4$ eV), and the orbits shrink by $1/Z$. The orbit for level $n$ holds exactly $n$ wavelengths. Higher orbits are larger ($r \\propto n^2$) but the electron moves more slowly there ($v \\propto 1/n$).",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (He⁺, n = 2).** Find the radius and speed.\n\n1. $r_2 = 0.529\\times\\dfrac{2^2}{2} = 1.058$ Å. *Why this step:* $n^2$ in the numerator, $Z$ in the denominator; the higher charge pulls the orbit in.\n2. $v_2 = 2.19\\times10^6\\times\\dfrac{2}{2} = 2.19\\times10^6$ m/s: the same speed as hydrogen's ground state.\n3. Energy: $E_2 = -13.6\\times\\dfrac{4}{4} = -13.6$ eV, also equal to hydrogen's ground state. Coincidences like these are common JEE traps; they all come from $Z/n = 1$.\n\n**Worked example 2 (period and orbital current, hydrogen ground state).**\n\n1. $T = \\dfrac{2\\pi r_1}{v_1} = \\dfrac{2\\pi\\times0.529\\times10^{-10}}{2.19\\times10^6} = 1.52\\times10^{-16}$ s.\n2. The electron passes any point once per period, so the current is $I = \\dfrac{e}{T} = \\dfrac{1.6\\times10^{-19}}{1.52\\times10^{-16}} \\approx 1.05\\times10^{-3}$ A $\\approx 1$ mA. *Why this step:* current is charge per unit time through a point on the loop.\n3. Scaling: $T \\propto r/v \\propto n^3/Z^2$, so $I \\propto Z^2/n^3$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (ionisation energy of Li²⁺).**\n\n1. Ground state: $E_1 = -13.6\\times3^2 = -122.4$ eV.\n2. Ionisation takes the electron to $E = 0$, so it costs $122.4$ eV. *Why this step:* ionisation energy is the depth of the level below zero.\n\n**Worked example 4 (energy bookkeeping).** A hydrogen electron is in the level with $E = -3.4$ eV. Find $n$, $K$ and $U$.\n\n1. $-13.6/n^2 = -3.4$ gives $n^2 = 4$, $n = 2$.\n2. $K = -E = 3.4$ eV and $U = 2E = -6.8$ eV. Check: $3.4 - 6.8 = -3.4$. ✓",
    },
    {
      type: "table",
      headers: ["Quantity", "Depends on $n$ as", "Depends on $Z$ as"],
      rows: [
        ["radius $r_n$", "$n^2$", "$1/Z$"],
        ["speed $v_n$", "$1/n$", "$Z$"],
        ["energy $E_n$, $K_n$, $U_n$", "$1/n^2$", "$Z^2$"],
        ["period $T_n$", "$n^3$", "$1/Z^2$"],
        ["angular momentum $L_n$", "$n$", "independent"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"an electron in a higher orbit has more kinetic energy\"",
      content:
        "Higher orbits have *less* kinetic energy ($K = 13.6Z^2/n^2$ eV falls with $n$) and more *total* energy (less negative). Moving up, the potential energy rises by twice as much as the kinetic energy falls. The same is true for satellites: a higher orbit is slower but has more total energy.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"negative energy means something is wrong\"",
      content:
        "Energy is measured from a chosen zero: an electron at rest infinitely far away. Anything bound to the nucleus has less energy than that, so its energy is negative. The more negative, the more tightly bound.",
    },
    {
      type: "quiz",
      id: "omp4-2-q1",
      variant: "practice",
      question: "What is the radius of the third Bohr orbit in Li²⁺ ($Z = 3$)?",
      options: [
        { text: "$4.761$ Å", feedback: "That is the hydrogen value, $0.529\\times9$. Divide by $Z = 3$." },
        { text: "$0.529$ Å", feedback: "That would need $n^2/Z = 1$; here $n^2/Z = 9/3 = 3$." },
        { text: "$0.176$ Å", feedback: "That divides by $Z^2$. The radius goes as $1/Z$." },
        { text: "$1.587$ Å", correct: true, feedback: "$r_3 = 0.529\\times9/3 = 1.587$ Å." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-2-q2",
      variant: "concept",
      question: "As a hydrogen electron moves from $n = 1$ to $n = 3$, its kinetic energy and total energy",
      options: [
        { text: "both increase", feedback: "Kinetic energy is $13.6/n^2$ eV, which falls." },
        { text: "kinetic energy decreases, total energy increases", correct: true, feedback: "$K$ drops from 13.6 to 1.51 eV; $E$ rises from $-13.6$ to $-1.51$ eV." },
        { text: "kinetic energy increases, total energy decreases", feedback: "Both go the other way." },
        { text: "both decrease", feedback: "The total energy becomes less negative, which is an increase." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-2-q3",
      variant: "practice",
      question: "The ionisation energy of He⁺ in its ground state is",
      options: [
        { text: "$27.2$ eV", feedback: "That scales by $Z$. Energy scales by $Z^2$." },
        { text: "$54.4$ eV", correct: true, feedback: "$13.6\\times Z^2 = 13.6\\times4 = 54.4$ eV." },
        { text: "$13.6$ eV", feedback: "That is hydrogen. He⁺ has twice the nuclear charge." },
        { text: "$122.4$ eV", feedback: "That is Li²⁺ ($Z = 3$)." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-2-q4",
      variant: "concept",
      question: "In de Broglie's picture, how many wavelengths of the electron's matter wave fit around the $n = 4$ orbit?",
      options: [
        { text: "16", feedback: "The circumference grows as $n^2$, but $\\lambda = h/mv$ also grows (as $n$, since $v \\propto 1/n$), leaving exactly $n$ wavelengths." },
        { text: "2", feedback: "That is $\\sqrt n$. The standing-wave condition is $2\\pi r = n\\lambda$." },
        { text: "It depends on $Z$.", feedback: "The count is set by $n$ alone; $Z$ changes the size of both orbit and wavelength together." },
        { text: "4", correct: true, feedback: "$2\\pi r_n = n\\lambda$: the orbit holds exactly $n$ wavelengths." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-2-q5",
      variant: "practice",
      question: "A hydrogen atom's electron has total energy $-1.51$ eV. What is its potential energy?",
      options: [
        { text: "$-3.02$ eV", correct: true, feedback: "$U = 2E = -3.02$ eV (and $K = +1.51$ eV)." },
        { text: "$-1.51$ eV", feedback: "That is the total energy. $U = 2E$ in a Coulomb orbit." },
        { text: "$+1.51$ eV", feedback: "That is the kinetic energy, $K = -E$." },
        { text: "$-0.755$ eV", feedback: "That is $E/2$. The virial relation gives $U = 2E$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "hydrogen-spectrum",
  title: "4.3 · Line Spectra of Hydrogen",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Pass an electric discharge through hydrogen gas and look at the glow through a prism. Instead of a rainbow you see four sharp lines: red at 656 nm, blue-green at 486 nm, and two violet lines at 434 and 410 nm. Balmer found a formula for them in 1885 by pure number-juggling. Bohr's levels turn that formula into physics.",
    },
    {
      type: "text",
      content:
        "**Derivation of the Rydberg formula.** When an electron drops from level $n_i$ to a lower level $n_f$, one photon carries away the difference in energy:",
    },
    {
      type: "math",
      latex:
        "h\\nu = \\frac{hc}{\\lambda} = E_{n_i} - E_{n_f} = 13.6\\,Z^2\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)\\ \\text{eV}",
    },
    {
      type: "text",
      content: "Divide by $hc$ and you get Rydberg's empirical formula, now with the constant explained:",
    },
    {
      type: "math",
      latex:
        "\\frac{1}{\\lambda} = RZ^2\\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right), \\qquad R = \\frac{13.6\\ \\text{eV}}{hc} = \\frac{13.6}{1240}\\ \\text{nm}^{-1} = 1.097\\times10^{7}\\ \\text{m}^{-1}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Two equivalent routes",
      content:
        "Either compute the energy gap in eV and use $\\lambda = 1240/\\Delta E$ nm, or use $\\frac1\\lambda = R(\\ldots)$ with $\\frac1R = 91.2$ nm. The first route is usually quicker and less error-prone.",
    },
    {
      type: "text",
      content:
        "**Series.** Group the lines by the level they land on. All drops to $n_f = 1$ form the Lyman series, to $n_f = 2$ the Balmer series, and so on. In each series the *first line* (longest wavelength) comes from the smallest jump, $n_i = n_f + 1$, and the *series limit* (shortest wavelength) from $n_i \\to \\infty$.",
    },
    {
      type: "table",
      headers: ["Series", "$n_f$", "First line $\\lambda_{\\max}$", "Series limit $\\lambda_{\\min} = n_f^2/R$", "Region"],
      rows: [
        ["Lyman", "1", "$\\frac{4}{3R} = 121.6$ nm", "$91.2$ nm", "Ultraviolet"],
        ["Balmer", "2", "$\\frac{36}{5R} = 656$ nm", "$365$ nm", "Visible (and near UV)"],
        ["Paschen", "3", "$\\frac{144}{7R} = 1876$ nm", "$821$ nm", "Infrared"],
        ["Brackett", "4", "$\\frac{400}{9R} = 4052$ nm", "$1459$ nm", "Infrared"],
        ["Pfund", "5", "$\\frac{900}{11R} = 7460$ nm", "$2279$ nm", "Infrared"],
      ],
    },
    {
      type: "text",
      content:
        "See it on the ladder: start with the Balmer red line ($3 \\to 2$), then move the lower level to 1 for Lyman, and to 3 for Paschen. The spectrum strip marks where each line and the series limit fall.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-quantum-lab",
        mode: "bohr-levels",
        atomicNumber: 1,
        upperLevel: 3,
        lowerLevel: 2,
        transition: "emission",
        showOrbits: false,
        caption:
          "Set lower = 2 and move the upper level from 3 to 7: the Balmer lines crowd towards 365 nm. Then set lower = 1 (Lyman, UV) and lower = 3 (Paschen, IR). Try absorption too.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $3 \\to 2$ gives 656 nm (red, H$_\\alpha$), $4 \\to 2$ gives 486 nm, and higher starting levels crowd towards the Balmer limit. Every Lyman line lies in the ultraviolet because even the smallest drop to $n = 1$ is 10.2 eV. Absorption uses the same gaps with the arrow reversed.",
    },
    {
      type: "text",
      content:
        "**How many lines?** Hydrogen atoms excited to level $n$ can drop by any route. Each line is a *pair* of levels, and there are $\\binom n2 = \\dfrac{n(n-1)}{2}$ pairs among $n$ levels, so a gas of many atoms shows that many lines. A *single* atom follows one path down and emits at most $n - 1$ photons (one level at a time).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Excitation and ionisation potentials (hydrogen)",
      content:
        "First excitation energy: $E_2 - E_1 = 10.2$ eV (first excitation potential 10.2 V). Second: $E_3 - E_1 = 12.09$ eV. Ionisation energy: $13.6$ eV (ionisation potential 13.6 V). An electron that collides with a ground-state atom can excite it only if the electron carries at least 10.2 eV.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (Hα, JEE Main).**\n\n1. $\\Delta E = 13.6\\left(\\dfrac14 - \\dfrac19\\right) = 13.6\\times\\dfrac{5}{36} = 1.89$ eV. *Why this step:* the photon's energy is the gap between the two levels.\n2. $\\lambda = \\dfrac{1240}{1.89} \\approx 656$ nm: the red line.\n\n**Worked example 2 (shortest Balmer wavelength).**\n\n1. Series limit: $n_i \\to \\infty$, so $\\Delta E = 13.6/4 = 3.4$ eV.\n2. $\\lambda = 1240/3.4 \\approx 365$ nm (just into the ultraviolet).\n\n**Worked example 3 (ratio of longest wavelengths of Lyman and Balmer).**\n\n1. Lyman first line: $\\dfrac1\\lambda = R\\left(1 - \\dfrac14\\right) = \\dfrac{3R}{4}$.\n2. Balmer first line: $\\dfrac1\\lambda = R\\left(\\dfrac14 - \\dfrac19\\right) = \\dfrac{5R}{36}$.\n3. $\\dfrac{\\lambda_L}{\\lambda_B} = \\dfrac{5/36}{3/4} = \\dfrac{5}{27}$. *Why this step:* in a ratio $R$ cancels, so never plug in its value.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (He⁺ photon ionising hydrogen).** A photon from the $n = 2 \\to 1$ transition in He⁺ strikes a ground-state hydrogen atom. What is the kinetic energy of the ejected electron?\n\n1. He⁺ photon: $13.6\\times2^2\\left(1 - \\dfrac14\\right) = 54.4\\times\\dfrac34 = 40.8$ eV.\n2. Ionising hydrogen costs 13.6 eV. *Why this step:* this is a photoelectric process on an atom; the ionisation energy plays the role of the work function.\n3. $K = 40.8 - 13.6 = 27.2$ eV.\n\n**Worked example 5 (recoil, JEE Advanced flavour).** A hydrogen atom at rest emits a Lyman-α photon (10.2 eV). Find its recoil speed.\n\n1. Momentum conservation: the atom recoils with the photon's momentum, $Mv = E/c$.\n2. $v = \\dfrac{E}{Mc} = \\dfrac{E}{Mc^2}\\,c = \\dfrac{10.2\\ \\text{eV}}{938\\ \\text{MeV}}\\times3\\times10^8 \\approx 3.3$ m/s. *Why this step:* writing $Mc^2 = 938$ MeV for a hydrogen atom avoids converting to kilograms.\n3. The recoil kinetic energy, $\\tfrac12Mv^2 \\approx 5.5\\times10^{-8}$ eV, is taken from the photon, so the photon's energy is very slightly less than the level gap. Usually negligible.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a single hydrogen atom in n = 4 emits six lines\"",
      content:
        "Six is the number of different lines a *gas* of many such atoms can show, $\\binom42 = 6$. One atom takes one route down, emitting at most three photons ($4\\to3\\to2\\to1$).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"absorption spectra show all the emission lines\"",
      content:
        "At room temperature almost every hydrogen atom sits in $n = 1$, so it can only absorb photons that lift it *from* $n = 1$: the Lyman lines. The Balmer lines appear in absorption only when many atoms are already in $n = 2$, as in hot stellar atmospheres.",
    },
    {
      type: "quiz",
      id: "omp4-3-q1",
      variant: "practice",
      question: "What is the wavelength of the photon emitted in the $4 \\to 2$ transition of hydrogen? ($hc = 1240$ eV·nm)",
      options: [
        { text: "About 656 nm", feedback: "That is the $3 \\to 2$ line." },
        { text: "About 97 nm", feedback: "That is $4 \\to 1$, a Lyman line." },
        { text: "About 486 nm", correct: true, feedback: "$\\Delta E = 13.6\\left(\\frac14 - \\frac1{16}\\right) = 2.55$ eV; $1240/2.55 \\approx 486$ nm." },
        { text: "About 1876 nm", feedback: "That is the $4 \\to 3$ Paschen line." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-3-q2",
      variant: "practice",
      question: "A gas of hydrogen atoms is excited to $n = 5$. How many different spectral lines can it emit?",
      options: [
        { text: "4", feedback: "That is the most one atom can emit. The gas shows every possible pair of levels." },
        { text: "5", feedback: "Count pairs of levels, not levels: $\\binom52$." },
        { text: "15", feedback: "That is $\\binom62$; there are only five levels up to $n = 5$." },
        { text: "10", correct: true, feedback: "$\\binom52 = \\frac{5\\times4}{2} = 10$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-3-q3",
      variant: "concept",
      question: "Why do all Lyman lines lie in the ultraviolet?",
      options: [
        { text: "Lyman lines come from ions, not neutral hydrogen.", feedback: "They come from neutral hydrogen, ending on $n = 1$." },
        { text: "Even the smallest drop to $n = 1$ releases 10.2 eV, above the 3.1 eV of violet light.", correct: true, feedback: "$1240/10.2 = 122$ nm, deep in the UV, and every other Lyman line is shorter still." },
        { text: "The $n = 1$ level is the highest energy level.", feedback: "It is the lowest (most negative) level." },
        { text: "Ultraviolet photons are absorbed less.", feedback: "Absorption does not decide where emission lines fall." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-3-q4",
      variant: "practice",
      question: "Find the ratio of the shortest wavelength of the Lyman series to the shortest wavelength of the Balmer series.",
      options: [
        { text: "$5 : 27$", feedback: "That is the ratio of the *longest* wavelengths (first lines)." },
        { text: "$4 : 1$", feedback: "The Lyman limit is the shorter one (higher energy)." },
        { text: "$1 : 4$", correct: true, feedback: "Series limits are $n_f^2/R$: $\\frac1R : \\frac4R = 1 : 4$." },
        { text: "$1 : 2$", feedback: "Series limits go as $n_f^2$, not $n_f$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-3-q5",
      variant: "concept",
      question: "Electrons of kinetic energy 11 eV pass through hydrogen gas at room temperature. Which is true?",
      options: [
        { text: "They can excite atoms to $n = 2$ only, so only the Lyman-α line (122 nm) can then be emitted.", correct: true, feedback: "11 eV exceeds 10.2 eV ($1\\to2$) but not 12.09 eV ($1\\to3$)." },
        { text: "They can ionise the atoms.", feedback: "Ionisation needs 13.6 eV." },
        { text: "They cannot excite the atoms because 11 eV is not exactly a level gap.", feedback: "A colliding electron can give up *part* of its energy and keep the rest; unlike a photon, it does not need an exact match." },
        { text: "They can excite atoms to $n = 3$, giving the red H$_\\alpha$ line.", feedback: "Reaching $n = 3$ needs 12.09 eV." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "x-rays",
  title: "4.4 · X-rays (Brief)",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Run the photoelectric effect backwards. There, a photon's energy went into one electron. In an X-ray tube, an electron's energy goes into photons. Electrons are accelerated through tens of kilovolts and slammed into a metal target; as they are stopped, they emit radiation so energetic it passes through flesh but not bone.",
    },
    {
      type: "text",
      content:
        "**The Coolidge tube.** A heated filament (the cathode) boils off electrons. A potential difference $V$ of 20–100 kV accelerates them to the target (the anode, usually tungsten or molybdenum, set in a cooled copper block because about 99% of the energy becomes heat). The filament current controls *how many* electrons arrive, so the **intensity** of the X-rays. The voltage controls *how energetic* each electron is, so the **penetrating power** (\"hardness\") of the X-rays.",
    },
    {
      type: "text",
      content:
        "**The continuous spectrum and its sharp cut-off (derivation).** Each electron arrives with kinetic energy $eV$. As it decelerates in the target it can emit photons of any energy up to that amount (this is *bremsstrahlung*, \"braking radiation\"). The most energetic photon possible takes the electron's whole energy in one go:",
    },
    {
      type: "math",
      latex: "h\\nu_{\\max} = \\frac{hc}{\\lambda_{\\min}} = eV \\quad\\Longrightarrow\\quad \\lambda_{\\min} = \\frac{hc}{eV} = \\frac{1240}{V}\\ \\text{nm} = \\frac{12\\,400}{V}\\ \\text{Å}\\quad (V\\text{ in volts})",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Cut-off (Duane–Hunt) wavelength",
      content:
        "$\\lambda_{\\min} = \\dfrac{hc}{eV}$. It depends **only** on the accelerating voltage, not on the target. With $V$ in kV: $\\lambda_{\\min} = \\dfrac{1.24}{V}$ nm.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "1.24/x",
        exprLatex: "\\lambda_{\\min} = \\frac{1.24}{V\\,(\\text{kV})}\\ \\text{nm}",
        min: 5,
        max: 100,
        step: 5,
        initial: 30,
        inputLabel: "V",
        outputLabel: "λ_min (nm)",
        inputUnit: "kV",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at 30 kV, $\\lambda_{\\min} \\approx 0.041$ nm; doubling the voltage halves the cut-off. X-ray wavelengths are around 0.01–1 nm, the size of atomic spacings, which is why crystals diffract them.",
    },
    {
      type: "text",
      content:
        "**Characteristic lines.** On top of the smooth spectrum sit sharp peaks whose wavelengths depend on the *target element*. An incoming electron knocks out an inner (K-shell, $n = 1$) electron of a target atom. An electron from the L shell ($n = 2$) drops into the hole, emitting a $K_\\alpha$ photon; one from the M shell ($n = 3$) gives $K_\\beta$ (more energetic). These are Bohr-like transitions in a heavy atom, where the nuclear charge seen by the falling electron is about $(Z - 1)e$ (one K electron remains to screen it).",
    },
    {
      type: "math",
      latex: "E_{K_\\alpha} \\approx 13.6\\,(Z-1)^2\\left(1 - \\frac14\\right)\\ \\text{eV} = 10.2\\,(Z-1)^2\\ \\text{eV}, \\qquad \\sqrt\\nu \\propto (Z - 1)\\ \\text{(Moseley)}",
    },
    {
      type: "text",
      content:
        "Moseley (1913) measured $K_\\alpha$ lines for dozens of elements and found $\\sqrt\\nu$ exactly linear in $Z$. That put the periodic table in order of atomic number rather than mass, and predicted missing elements (43, 61, 72, 75) from gaps in the line.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (cut-off at 30 kV, JEE Main).**\n\n1. $\\lambda_{\\min} = \\dfrac{1240}{30\\,000}$ nm $\\approx 0.0413$ nm $= 0.413$ Å. *Why this step:* $eV$ in eV is just $V$ in volts, so $1240/V$ gives nm directly.\n\n**Worked example 2 (doubling the voltage).** A tube runs at 20 kV; the target's $K_\\alpha$ line is at 0.071 nm. The voltage is raised to 40 kV.\n\n1. $\\lambda_{\\min}$: $0.062$ nm $\\to 0.031$ nm (halved).\n2. $K_\\alpha$: unchanged at 0.071 nm. It is fixed by the energy levels of the target atom, and the voltage does not change those. *Why this step:* separate what the *electron beam* controls from what the *target atom* controls.\n3. So $\\lambda_{K\\alpha} - \\lambda_{\\min}$ increases.\n\n**Worked example 3 (Moseley estimate for copper, Z = 29).**\n\n1. $E_{K\\alpha} \\approx 10.2\\times28^2 = 10.2\\times784 \\approx 8.0$ keV.\n2. $\\lambda = \\dfrac{1240}{8000}$ nm $\\approx 0.155$ nm. (Measured: 0.154 nm. The simple screening model does remarkably well.)\n\n**Worked example 4 (ratio for two elements).** Find $\\nu_1/\\nu_2$ for the $K_\\alpha$ lines of elements with $Z = 11$ and $Z = 21$.\n\n1. $\\nu \\propto (Z - 1)^2$, so $\\dfrac{\\nu_1}{\\nu_2} = \\left(\\dfrac{10}{20}\\right)^2 = \\dfrac14$. *Why this step:* use $Z - 1$, not $Z$; $(11/21)^2 \\approx 0.27$ is a common wrong answer.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the cut-off wavelength depends on the target metal\"",
      content:
        "$\\lambda_{\\min} = hc/eV$ contains only the voltage. Swap tungsten for molybdenum at the same voltage and the cut-off stays exactly where it was; only the characteristic peaks move.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"raising the voltage shifts the characteristic lines\"",
      content:
        "Characteristic lines are fingerprints of the target's inner energy levels. Raising the voltage makes them *appear* (once $eV$ exceeds the K-shell binding energy) and grow brighter, but never moves them.",
    },
    {
      type: "quiz",
      id: "omp4-4-q1",
      variant: "practice",
      question: "An X-ray tube operates at 20 kV. What is the cut-off wavelength?",
      options: [
        { text: "$62$ nm", feedback: "That uses 20 V. The voltage is 20 kV $= 20\\,000$ V." },
        { text: "$0.62$ nm", feedback: "Power-of-ten slip: $1240/20\\,000 = 0.062$." },
        { text: "$0.062$ nm", correct: true, feedback: "$1240/20\\,000 = 0.062$ nm." },
        { text: "It depends on the target.", feedback: "The cut-off depends only on the voltage." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-4-q2",
      variant: "concept",
      question: "The filament current of an X-ray tube is increased at fixed voltage. What changes?",
      options: [
        { text: "The intensity rises; $\\lambda_{\\min}$ and the characteristic lines stay the same.", correct: true, feedback: "More electrons per second, each with the same $eV$." },
        { text: "$\\lambda_{\\min}$ decreases.", feedback: "$\\lambda_{\\min}$ depends on the energy per electron, $eV$, which is unchanged." },
        { text: "The characteristic lines shift to shorter wavelengths.", feedback: "Those are set by the target's energy levels." },
        { text: "The X-rays become more penetrating.", feedback: "Penetrating power (hardness) is controlled by the voltage." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-4-q3",
      variant: "practice",
      question: "Copper ($Z = 29$) has a $K_\\alpha$ wavelength of about 0.155 nm. Which element has a $K_\\alpha$ wavelength four times longer?",
      options: [
        { text: "$Z = 8$", feedback: "That quarters $Z - 1$ (to 7). The wavelength goes as the inverse *square*, so halve $Z - 1$." },
        { text: "$Z = 14.5$", feedback: "That halves $Z$ instead of $Z - 1$ (and $Z$ must be a whole number)." },
        { text: "$Z = 57$", feedback: "A larger $Z$ gives a *shorter* $K_\\alpha$ wavelength." },
        { text: "$Z = 15$", correct: true, feedback: "$\\lambda \\propto 1/(Z-1)^2$; four times the wavelength needs half of $Z - 1$: $14$, so $Z = 15$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-4-q4",
      variant: "concept",
      question: "Why is there a sharp minimum wavelength in the continuous X-ray spectrum?",
      options: [
        { text: "The target absorbs all shorter wavelengths.", feedback: "The cut-off is the same for every target, so it is not an absorption effect." },
        { text: "A photon cannot carry more than the whole kinetic energy $eV$ of one electron.", correct: true, feedback: "$hc/\\lambda_{\\min} = eV$: the most energetic photon takes all of one electron's energy." },
        { text: "Electrons cannot go faster than light.", feedback: "The electrons are well below $c$; the limit is energy conservation." },
        { text: "It is where the $K_\\beta$ line sits.", feedback: "Characteristic lines depend on the target; the cut-off does not." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "nuclear-size-and-binding-energy",
  title: "4.5 · Nuclear Size, Mass Defect and Binding Energy",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Weigh a helium-4 nucleus and weigh, separately, the two protons and two neutrons it is made of. The parts are heavier than the whole, by about 0.75%. That missing mass is not an error. It is the energy that holds the nucleus together, and it is where the energy of the Sun and of nuclear reactors comes from.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Composition and notation",
      content:
        "A nucleus $^A_Z\\text{X}$ has $Z$ protons and $N = A - Z$ neutrons ($A$ = mass number, nucleons in total).\n**Isotopes:** same $Z$, different $A$ ($^{12}$C, $^{14}$C). **Isobars:** same $A$ ($^{14}$C, $^{14}$N). **Isotones:** same $N$ ($^{13}$C, $^{14}$N).\n**Atomic mass unit:** $1$ u $= \\frac{1}{12}$ of the mass of a $^{12}$C atom $= 1.66\\times10^{-27}$ kg, equivalent to $931.5$ MeV.",
    },
    {
      type: "text",
      content:
        "**Size.** Scattering experiments with fast electrons show that nuclear radii follow",
    },
    { type: "math", latex: "R = R_0 A^{1/3}, \\qquad R_0 \\approx 1.2\\ \\text{fm} = 1.2\\times10^{-15}\\ \\text{m}" },
    {
      type: "text",
      content:
        "**Derivation: every nucleus has the same density.** Volume $\\propto R^3 = R_0^3A$, and mass $\\approx A\\times(1\\text{ u})$. So",
    },
    {
      type: "math",
      latex: "\\rho = \\frac{A m_u}{\\tfrac43\\pi R_0^3 A} = \\frac{m_u}{\\tfrac43\\pi R_0^3} = \\frac{1.66\\times10^{-27}}{\\tfrac43\\pi(1.2\\times10^{-15})^3} \\approx 2.3\\times10^{17}\\ \\text{kg/m}^3",
    },
    {
      type: "text",
      content:
        "$A$ cancels: nucleons pack like marbles in a bag, each taking the same room, whatever the nucleus. A teaspoon of nuclear matter would weigh about a billion tonnes (neutron stars are made of it). Drag $A$ below; the horizontal axis is $A/10$.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "1.2*(10*x)^(1/3)",
        exprLatex: "R = 1.2\\,A^{1/3}\\ \\text{fm}\\ \\ (x = A/10)",
        window: { xmin: 0, xmax: 25, ymin: 0, ymax: 9 },
        initial: 5.6,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the curve rises steeply for light nuclei and flattens for heavy ones. Iron-56 ($x = 5.6$) has $R \\approx 4.6$ fm; uranium-238 ($x = 23.8$) only about 7.4 fm. About four times the nucleons makes the radius only about 1.6 times larger ($4.25^{1/3} \\approx 1.62$); it takes eight times the nucleons to double it.",
    },
    {
      type: "text",
      content:
        "**The nuclear force.** Protons repel each other with enormous Coulomb forces at femtometre distances, so something stronger must hold the nucleus together. The nuclear (strong) force is: *strongly attractive* at about 1–2.5 fm and repulsive below about 0.8 fm; *short range* (negligible beyond a few fm); *charge independent* (p–p, n–n and p–n pull equally); and *saturating* (each nucleon bonds only with its nearest neighbours, which is why density and binding per nucleon are nearly constant).",
    },
    {
      type: "text",
      content:
        "**Mass defect and binding energy.** To pull a nucleus apart into free nucleons you must supply energy, the binding energy $BE$. By $E = mc^2$, the free nucleons then have more mass than the nucleus did, by $BE/c^2$:",
    },
    {
      type: "math",
      latex: "\\Delta m = \\big[Zm_p + (A - Z)m_n\\big] - M_{\\text{nucleus}}, \\qquad BE = \\Delta m\\,c^2 = \\Delta m(\\text{u})\\times931.5\\ \\text{MeV}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Atomic masses are fine",
      content:
        "Tables give *atomic* masses (with electrons). Use $m_{\\text{H}} = 1.007825$ u in place of $m_p$ and the atomic mass of the whole atom: the $Z$ electron masses then cancel. $m_n = 1.008665$ u.",
    },
    {
      type: "text",
      content:
        "**Binding energy per nucleon.** $BE/A$ measures how tightly each nucleon is held. It rises steeply from deuterium (1.1 MeV) through helium-4 (7.07 MeV, an unusually tight nucleus), peaks near iron-56 at about 8.8 MeV, then falls slowly to about 7.6 MeV for uranium, as the growing Coulomb repulsion of many protons takes its toll.",
    },
    {
      type: "table",
      headers: ["Nucleus", "$BE$ (MeV)", "$BE/A$ (MeV)"],
      rows: [
        ["$^2$H", "2.22", "1.11"],
        ["$^4$He", "28.3", "7.07"],
        ["$^{12}$C", "92.2", "7.68"],
        ["$^{56}$Fe", "492", "8.79"],
        ["$^{120}$Sn", "1021", "8.50"],
        ["$^{238}$U", "1802", "7.57"],
      ],
    },
    {
      type: "text",
      content:
        "The curve explains both ways of getting nuclear energy. Any process that moves nucleons *towards the peak* makes them more tightly bound and releases the difference: **fusion** of light nuclei climbs the steep left side, **fission** of heavy nuclei climbs the gentle right side. The energy released in a reaction is its **Q-value**:",
    },
    {
      type: "math",
      latex: "Q = \\big(\\text{mass of reactants} - \\text{mass of products}\\big)c^2 = BE_{\\text{products}} - BE_{\\text{reactants}}",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (ratio of radii, JEE Main).** Compare the radii of $^{27}$Al and $^{64}$Cu.\n\n1. $R \\propto A^{1/3}$, so $\\dfrac{R_{\\text{Al}}}{R_{\\text{Cu}}} = \\left(\\dfrac{27}{64}\\right)^{1/3} = \\dfrac34$. *Why this step:* both are perfect cubes, the classic JEE giveaway.\n2. Actual values: $3.6$ fm and $4.8$ fm. Their densities are equal.\n\n**Worked example 2 (binding energy of helium-4).** $m_{\\text{H}} = 1.007825$ u, $m_n = 1.008665$ u, $M(^4\\text{He}) = 4.002603$ u.\n\n1. Parts: $2(1.007825) + 2(1.008665) = 4.032980$ u.\n2. $\\Delta m = 4.032980 - 4.002603 = 0.030377$ u.\n3. $BE = 0.030377\\times931.5 \\approx 28.3$ MeV, so $BE/A \\approx 7.07$ MeV. *Why this step:* multiplying by 931.5 converts u directly to MeV without passing through kilograms.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (Q-value from BE/A).** A nucleus with $A = 240$ and $BE/A = 7.6$ MeV splits into two equal fragments with $BE/A = 8.5$ MeV. Find the energy released.\n\n1. $BE$ before: $240\\times7.6 = 1824$ MeV.\n2. $BE$ after: $2\\times120\\times8.5 = 2040$ MeV.\n3. $Q = 2040 - 1824 = 216$ MeV released. *Why this step:* more binding energy after means the products sit lower; the difference comes out as kinetic energy of the fragments. Shortcut: $Q = 240\\times(8.5 - 7.6)$.\n\n**Worked example 4 (deuterium).** $M(^2\\text{H}) = 2.014102$ u.\n\n1. $\\Delta m = 1.007825 + 1.008665 - 2.014102 = 0.002388$ u.\n2. $BE = 0.002388\\times931.5 \\approx 2.22$ MeV, just 1.11 MeV per nucleon. A 2.22 MeV gamma ray can split a deuteron: this is how the number was first measured.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"mass defect means mass is destroyed and nothing is gained\"",
      content:
        "When the nucleus formed, the missing mass left as energy (gamma rays, kinetic energy) equal to $\\Delta m\\,c^2$. Nothing is lost: mass and energy are two measures of the same thing, and the total is conserved.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"heavier nuclei are always more tightly bound\"",
      content:
        "Total binding energy grows with $A$, but binding *per nucleon* peaks near iron and then falls. Uranium's nucleons are less tightly held than iron's, which is exactly why splitting uranium releases energy.",
    },
    {
      type: "quiz",
      id: "omp4-5-q1",
      variant: "practice",
      question: "A nucleus with mass number $A = 8$ has radius 2.4 fm. What is the radius of a nucleus with $A = 216$?",
      options: [
        { text: "$64.8$ fm", feedback: "That scales $R$ with $A$. The radius goes as $A^{1/3}$." },
        { text: "$7.2$ fm", correct: true, feedback: "$(216/8)^{1/3} = 27^{1/3} = 3$, so $R = 3\\times2.4 = 7.2$ fm." },
        { text: "$12.5$ fm", feedback: "That uses $\\sqrt{27}$. The exponent is $\\frac13$." },
        { text: "$2.4$ fm", feedback: "It is the density that is the same for all nuclei, not the radius." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-5-q2",
      variant: "concept",
      question: "Why is nuclear density roughly the same for all nuclei?",
      options: [
        { text: "All nuclei have the same radius.", feedback: "Radii grow as $A^{1/3}$." },
        { text: "Protons and neutrons have zero size.", feedback: "Nucleons have finite size; that is why they pack at fixed density." },
        { text: "The Coulomb force compresses heavy nuclei more.", feedback: "Coulomb repulsion pushes protons apart; it does not compress the nucleus." },
        { text: "Volume grows as $R^3 \\propto A$, the same way mass does, because the nuclear force saturates.", correct: true, feedback: "$A$ cancels in $\\rho = Am_u/(\\frac43\\pi R_0^3A)$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-5-q3",
      variant: "practice",
      question: "A nucleus has a mass defect of 0.1 u. What is its binding energy?",
      options: [
        { text: "$93.15$ MeV", correct: true, feedback: "$0.1\\times931.5 = 93.15$ MeV." },
        { text: "$931.5$ MeV", feedback: "That is the energy of 1 u. Multiply by 0.1." },
        { text: "$9.315$ MeV", feedback: "Decimal slip: $0.1\\times931.5 = 93.15$." },
        { text: "$1.5\\times10^{-11}$ MeV", feedback: "$1.5\\times10^{-11}$ is about the answer in *joules*; in MeV it is 93.15." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-5-q4",
      variant: "practice",
      question: "Two deuterons ($BE/A = 1.1$ MeV) fuse into helium-4 ($BE/A = 7.0$ MeV). Find the energy released.",
      options: [
        { text: "$5.9$ MeV", feedback: "That is the gain *per nucleon*, $7.0 - 1.1$. Multiply by 4 nucleons." },
        { text: "$32.4$ MeV", feedback: "Binding energies are subtracted: $Q = BE_{\\text{after}} - BE_{\\text{before}}$." },
        { text: "$23.6$ MeV", correct: true, feedback: "$BE$ after $= 4\\times7.0 = 28$ MeV; before $= 2\\times2\\times1.1 = 4.4$ MeV; $Q = 23.6$ MeV." },
        { text: "$25.8$ MeV", feedback: "That subtracts only one deuteron's binding energy. There are two, $2\\times2.2 = 4.4$ MeV." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-5-q5",
      variant: "concept",
      question: "Which nucleus has the highest binding energy per nucleon?",
      options: [
        { text: "$^{238}$U", feedback: "Uranium has the largest *total* BE here, but only about 7.6 MeV per nucleon." },
        { text: "$^{4}$He", feedback: "Helium-4 is unusually tight for a light nucleus (7.07 MeV), but still below iron." },
        { text: "$^{2}$H", feedback: "Deuterium is very loosely bound, 1.11 MeV per nucleon." },
        { text: "$^{56}$Fe", correct: true, feedback: "The BE/A curve peaks near iron at about 8.8 MeV." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-5-q6",
      variant: "practice",
      question: "Find the Q-value of $^2\\text{H} + {}^3\\text{H} \\to {}^4\\text{He} + n$ from the masses: $^2$H 2.014102 u, $^3$H 3.016049 u, $^4$He 4.002603 u, $n$ 1.008665 u.",
      options: [
        { text: "About $957$ MeV", feedback: "That leaves out the neutron's mass on the product side. Every product counts." },
        { text: "$17.6$ MeV", correct: true, feedback: "$\\Delta m = 5.030151 - 5.011268 = 0.018883$ u; $Q = 0.018883\\times931.5 \\approx 17.6$ MeV, released." },
        { text: "$-17.6$ MeV", feedback: "The sign is reversed: $Q = (m_{\\text{reactants}} - m_{\\text{products}})c^2$, and the reactants are heavier, so energy is released." },
        { text: "$0.019$ MeV", feedback: "$0.018883$ is the mass difference in u. Multiply by 931.5 to get MeV." },
      ],
      hint: "Add the masses on each side, subtract products from reactants, then multiply by 931.5 MeV/u.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "radioactivity-and-half-life",
  title: "4.6 · Radioactivity and Half-Life",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Pick one radon-222 nucleus. When will it decay? Nobody can say; not in principle, not with any instrument. But take a billion of them and you can say, very precisely, that half will have decayed after 3.8 days. Radioactivity is the cleanest example in physics of individual randomness producing collective certainty.",
    },
    {
      type: "table",
      headers: ["Decay", "What leaves", "Change in $A$", "Change in $Z$", "Example"],
      rows: [
        ["$\\alpha$", "$^4_2$He nucleus", "$-4$", "$-2$", "$^{238}_{92}$U $\\to$ $^{234}_{90}$Th $+\\ \\alpha$"],
        ["$\\beta^-$", "electron + antineutrino ($n \\to p$)", "0", "$+1$", "$^{14}_{6}$C $\\to$ $^{14}_{7}$N $+ e^- + \\bar\\nu$"],
        ["$\\beta^+$", "positron + neutrino ($p \\to n$)", "0", "$-1$", "$^{22}_{11}$Na $\\to$ $^{22}_{10}$Ne $+ e^+ + \\nu$"],
        ["$\\gamma$", "photon (excited nucleus settles)", "0", "0", "$^{60}$Ni$^* \\to$ $^{60}$Ni $+\\ \\gamma$"],
      ],
    },
    {
      type: "text",
      content:
        "**Why the neutrino?** In alpha decay every alpha from a given nucleus has the same energy, as a two-body break-up must (momentum and energy conservation fix it). Beta electrons come out with every energy from zero up to a maximum. If only two bodies were involved, energy would seem to vanish. Pauli proposed (1930) a third, neutral, almost massless particle carrying the missing energy: the neutrino, detected in 1956.",
    },
    {
      type: "text",
      content:
        "**The decay law (derivation).** Each nucleus has the same probability $\\lambda$ per second of decaying, independent of its age or its neighbours. With $N$ nuclei present, the expected number decaying per second is $\\lambda N$:",
    },
    {
      type: "math",
      latex:
        "\\frac{dN}{dt} = -\\lambda N \\;\\Longrightarrow\\;\\int_{N_0}^{N}\\frac{dN}{N} = -\\lambda\\int_0^t dt \\;\\Longrightarrow\\;\\ln\\frac{N}{N_0} = -\\lambda t \\;\\Longrightarrow\\;N = N_0e^{-\\lambda t}",
    },
    {
      type: "text",
      content: "**Half-life.** Set $N = N_0/2$: $e^{-\\lambda T_{1/2}} = \\tfrac12$, so",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Half-life, mean life, activity",
      content:
        "$T_{1/2} = \\dfrac{\\ln 2}{\\lambda} = \\dfrac{0.693}{\\lambda}$, $\\qquad$ mean life $\\tau = \\dfrac1\\lambda = 1.44\\,T_{1/2}$\nAfter $n$ half-lives, $N = N_0/2^n$, i.e. $N = N_0\\,2^{-t/T_{1/2}}$.\n**Activity** $A = \\left|\\dfrac{dN}{dt}\\right| = \\lambda N = A_0e^{-\\lambda t}$, measured in becquerel (1 Bq = 1 decay/s); 1 curie $= 3.7\\times10^{10}$ Bq.",
    },
    {
      type: "text",
      content:
        "Change the initial amount and the half-life below. Time is in years and $N$ is in units of 10% of the maximum sample.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "10*exp(-0.693*x/2)",
        baseLatex: "T_{1/2} = 2",
        expr: "N*exp(-0.693*x/T)",
        exprLatex: "N = N_0 e^{-\\lambda t} = N_0 2^{-t/T_{1/2}}",
        params: [
          { name: "N", min: 2, max: 10, step: 1, initial: 10 },
          { name: "T", min: 0.5, max: 8, step: 0.5, initial: 2 },
        ],
        window: { xmin: 0, xmax: 16, ymin: 0, ymax: 11 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $T = 2$ the curve passes 5 at $t = 2$, 2.5 at $t = 4$, 1.25 at $t = 6$. Every half-life the amount halves, wherever you start the clock. The curve never touches zero; halving $N_0$ just scales the whole curve down.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (fraction left).** What fraction remains after 3 half-lives, and what fraction has decayed?\n\n1. $N/N_0 = (1/2)^3 = 1/8 = 12.5\\%$ remains.\n2. Decayed: $1 - 1/8 = 7/8$. *Why this step:* JEE often asks for the decayed fraction; read the question twice.\n\n**Worked example 2 (activity falling, JEE Main).** The activity of a sample falls from 800 Bq to 50 Bq in 20 days. Find the half-life.\n\n1. $800/50 = 16 = 2^4$, so 4 half-lives have passed. *Why this step:* activity is proportional to $N$, so it halves on the same clock.\n2. $T_{1/2} = 20/4 = 5$ days.\n\n**Worked example 3 (activity from N).** A sample contains $2\\times10^{20}$ nuclei with $T_{1/2} = 693$ s.\n\n1. $\\lambda = 0.693/693 = 1\\times10^{-3}$ s⁻¹.\n2. $A = \\lambda N = 10^{-3}\\times2\\times10^{20} = 2\\times10^{17}$ Bq $\\approx 5.4\\times10^{6}$ Ci.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (counting decays in a chain).** How many $\\alpha$ and $\\beta^-$ decays turn $^{238}_{92}$U into $^{206}_{82}$Pb?\n\n1. Only $\\alpha$ changes $A$ (by 4): $\\Delta A = 238 - 206 = 32$, so $32/4 = 8$ alphas. *Why this step:* start with the decay that alone controls one of the two numbers.\n2. Eight alphas lower $Z$ by 16: $92 - 16 = 76$. Lead has $Z = 82$, so $Z$ must rise by 6: six $\\beta^-$ decays.\n3. Answer: 8 $\\alpha$, 6 $\\beta^-$.\n\n**Worked example 5 (dating a rock).** A rock contains 7 daughter atoms for every parent atom still present (all daughters came from the parent). The parent's half-life is $1.3\\times10^{9}$ years. How old is the rock?\n\n1. If $N$ parents remain, $7N$ have decayed, so $N_0 = 8N$ and $N/N_0 = 1/8$.\n2. $1/8 = (1/2)^3$: 3 half-lives, so the age is $3.9\\times10^{9}$ years. *Why this step:* the daughter count tells you how many parents *there used to be*.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"after two half-lives the sample is gone\"",
      content:
        "Each half-life removes half of *what is left*, not half of the original. After two half-lives a quarter remains, after three an eighth. The amount approaches zero but never reaches it for a large sample.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"heating a sample speeds up its decay\"",
      content:
        "Decay is a nuclear process governed by energies of MeV. Temperature, pressure and chemical bonding involve eV or less and leave $\\lambda$ unchanged. That constancy is what makes radioactive dating reliable.",
    },
    {
      type: "quiz",
      id: "omp4-6-q1",
      variant: "practice",
      question: "What fraction of a radioactive sample has decayed after 4 half-lives?",
      options: [
        { text: "$1/16$", feedback: "That is the fraction *remaining*." },
        { text: "$1/4$", feedback: "That would be remaining after 2 half-lives." },
        { text: "$15/16$", correct: true, feedback: "$1/16$ remains, so $15/16$ has decayed." },
        { text: "All of it", feedback: "Four half-lives leave $1/16$ of the sample." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-6-q2",
      variant: "practice",
      question: "A nuclide has decay constant $\\lambda = 0.0231$ per day. Find its mean life and half-life.",
      options: [
        { text: "$\\tau \\approx 43.3$ days, $T_{1/2} = 30$ days", correct: true, feedback: "$\\tau = 1/0.0231 = 43.3$ d; $T_{1/2} = 0.693/0.0231 = 30$ d." },
        { text: "$\\tau = 30$ days, $T_{1/2} \\approx 43.3$ days", feedback: "Swapped: the mean life is always longer, $\\tau = 1.44\\,T_{1/2}$." },
        { text: "$\\tau = T_{1/2} = 30$ days", feedback: "Half-life and mean life differ by the factor $\\ln 2$." },
        { text: "$\\tau \\approx 0.023$ days, $T_{1/2} \\approx 0.016$ days", feedback: "That multiplies by $\\lambda$ instead of dividing." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-6-q3",
      variant: "practice",
      question: "$^{232}_{90}$Th decays to $^{208}_{82}$Pb. How many $\\alpha$ and $\\beta^-$ particles are emitted?",
      options: [
        { text: "6 $\\alpha$ and 8 $\\beta^-$", feedback: "$\\Delta Z = 8$ is the *net* change. Six alphas already lower $Z$ by 12, so only 4 betas are needed." },
        { text: "4 $\\alpha$ and 6 $\\beta^-$", feedback: "The alpha count comes from $\\Delta A/4 = 24/4 = 6$." },
        { text: "6 $\\alpha$ and 4 $\\beta^-$", correct: true, feedback: "$\\Delta A = 24 \\Rightarrow 6\\alpha$, which lowers $Z$ to 78; four $\\beta^-$ raise it to 82." },
        { text: "8 $\\alpha$ and 6 $\\beta^-$", feedback: "That is the U-238 → Pb-206 chain. Here $\\Delta A = 24$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-6-q4",
      variant: "concept",
      question: "What happens to $Z$ and $A$ in $\\beta^+$ decay?",
      options: [
        { text: "$Z$ decreases by 1; $A$ unchanged", correct: true, feedback: "A proton becomes a neutron, emitting a positron and a neutrino." },
        { text: "$Z$ increases by 1; $A$ unchanged", feedback: "That is $\\beta^-$ decay ($n \\to p$)." },
        { text: "$Z$ decreases by 2; $A$ decreases by 4", feedback: "That is alpha decay." },
        { text: "Neither changes", feedback: "That is gamma decay." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-6-q5",
      variant: "practice",
      question: "A sample's activity is 3200 Bq. Its half-life is 2 hours. What is its activity 10 hours later?",
      options: [
        { text: "$640$ Bq", feedback: "That divides by 5, the number of half-lives, instead of by $2^5$." },
        { text: "$200$ Bq", feedback: "That is 4 half-lives. $10/2 = 5$." },
        { text: "Zero", feedback: "Activity falls by a factor of 2 each half-life, never to zero." },
        { text: "$100$ Bq", correct: true, feedback: "10 h = 5 half-lives; $3200/2^5 = 100$ Bq." },
      ],
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "fission-and-fusion",
  title: "4.7 · Fission and Fusion",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "One kilogram of coal, burned, gives about 30 MJ. One kilogram of uranium-235, fissioned, gives about 80 million MJ. One kilogram of deuterium, fused, gives several times more again. The factor of millions is the ratio of MeV (nuclear binding) to eV (chemical bonds). The binding-energy curve from 4.5 tells you the two routes: split something heavy, or join things light.",
    },
    {
      type: "text",
      content:
        "**Fission.** A slow neutron is absorbed by $^{235}$U, making $^{236}$U in a highly excited state. It wobbles like a liquid drop, stretches into a dumb-bell, and the Coulomb repulsion between the two ends tears it apart. A typical outcome:",
    },
    {
      type: "math",
      latex: "^{235}_{92}\\text{U} + {}^1_0n \\;\\to\\;{}^{141}_{56}\\text{Ba} + {}^{92}_{36}\\text{Kr} + 3\\,{}^1_0n + \\text{about } 200\\ \\text{MeV}",
    },
    {
      type: "text",
      content:
        "Check the bookkeeping: mass numbers $235 + 1 = 141 + 92 + 3 = 236$ ✓; charges $92 = 56 + 36$ ✓. The 200 MeV follows from the BE/A curve: about 236 nucleons each gaining roughly 0.9 MeV of binding (7.6 → 8.5 MeV). Most of it appears as kinetic energy of the fragments, which becomes heat.",
    },
    {
      type: "text",
      content:
        "**Chain reaction.** Each fission releases 2–3 neutrons, and each could cause another fission. If on average more than one does, the rate grows exponentially (a bomb); exactly one, it stays steady (a reactor); fewer, it dies out. Neutrons escape through the surface, so a small lump loses too many; the **critical mass** is the smallest amount that sustains the chain.",
    },
    {
      type: "table",
      headers: ["Reactor part", "Job", "Typical material"],
      rows: [
        ["Fuel", "Fissile nuclei", "Uranium enriched in $^{235}$U"],
        ["Moderator", "Slow fast neutrons (~2 MeV) to thermal (~0.025 eV), where $^{235}$U captures them best", "Heavy water, graphite, ordinary water"],
        ["Control rods", "Absorb neutrons to keep the multiplication factor at exactly 1", "Cadmium, boron"],
        ["Coolant", "Carry the heat to the turbines", "Water, heavy water, liquid sodium"],
        ["Shielding", "Stop neutrons and gamma rays", "Concrete, water"],
      ],
    },
    {
      type: "text",
      content:
        "**Why a moderator must be light (link to Mechanics II).** In a head-on elastic collision of a neutron (mass 1) with a stationary nucleus of mass $A$, the neutron keeps the fraction $\\left(\\dfrac{A - 1}{A + 1}\\right)^2$ of its kinetic energy. For hydrogen ($A = 1$) it can lose everything in one collision; for carbon ($A = 12$) it keeps $(11/13)^2 \\approx 72\\%$ and loses 28%; for lead it would lose only about 2%. Light nuclei take the most energy per bounce, like a snooker ball hitting another snooker ball rather than a wall.",
    },
    {
      type: "text",
      content:
        "The energy from $m$ grams of $^{235}$U: $\\frac{m}{235}\\times6.02\\times10^{23}$ nuclei, each giving 200 MeV. The machine below outputs the total in units of $10^{23}$ MeV.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "x*6.02/235*200",
        exprLatex: "E = \\frac{m}{235}\\times6.02\\times10^{23}\\times200\\ \\text{MeV}\\quad(\\text{output in }10^{23}\\text{ MeV})",
        min: 1,
        max: 100,
        step: 1,
        initial: 1,
        inputLabel: "m",
        outputLabel: "E (10²³ MeV)",
        inputUnit: "g",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: 1 g gives $5.1\\times10^{23}$ MeV $= 5.1\\times10^{23}\\times1.6\\times10^{-13}$ J $\\approx 8.2\\times10^{10}$ J. At 30 MJ/kg, that is the energy of about 2.7 tonnes of coal. The output is exactly proportional to the mass: every nucleus gives the same 200 MeV.",
    },
    {
      type: "text",
      content:
        "**Fusion.** Joining two light nuclei climbs the steep left side of the BE/A curve. The obstacle is the Coulomb barrier: two deuterons must come within a few femtometres, where their repulsion is $\\dfrac{1.44\\ \\text{MeV·fm}}{4\\ \\text{fm}} \\approx 0.36$ MeV. Getting nuclei that close takes temperatures of millions of kelvin (hence *thermonuclear*); quantum tunnelling lets the reaction proceed well below the classical estimate. In the Sun's core (about $1.5\\times10^7$ K) the proton–proton chain turns four protons into helium:",
    },
    {
      type: "math",
      latex: "4\\,{}^1_1\\text{H} \\;\\to\\;{}^4_2\\text{He} + 2e^+ + 2\\nu + 26.7\\ \\text{MeV}",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (fissions per second, JEE Main).** A reactor produces 200 MW. Each fission releases 200 MeV. How many fissions occur per second?\n\n1. Energy per fission: $200\\ \\text{MeV} = 200\\times10^6\\times1.6\\times10^{-19} = 3.2\\times10^{-11}$ J. *Why this step:* power is in joules per second, so each event must be in joules.\n2. Rate: $\\dfrac{2\\times10^8}{3.2\\times10^{-11}} = 6.25\\times10^{18}$ fissions per second.\n\n**Worked example 2 (fusing 1 g of deuterium).** Take the reaction $^2\\text{H} + {}^2\\text{H} \\to {}^4\\text{He}$ with $Q = 23.9$ MeV.\n\n1. Number of deuterons in 1 g: $\\dfrac{6.02\\times10^{23}}{2} = 3.01\\times10^{23}$.\n2. Each reaction uses two: $1.505\\times10^{23}$ reactions.\n3. Energy: $1.505\\times10^{23}\\times23.9 = 3.6\\times10^{24}$ MeV $\\approx 5.8\\times10^{11}$ J, about seven times the 1 g of uranium above. *Why this step:* per nucleon, fusion gives $23.9/4 \\approx 6$ MeV against fission's $200/236 \\approx 0.85$ MeV.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (Q-value from binding energies).** $BE(^2\\text{H}) = 2.22$ MeV and $BE(^4\\text{He}) = 28.3$ MeV. Find $Q$ for $^2\\text{H} + {}^2\\text{H} \\to {}^4\\text{He}$.\n\n1. $Q = BE_{\\text{products}} - BE_{\\text{reactants}} = 28.3 - 2\\times2.22 = 23.86 \\approx 23.9$ MeV.\n2. Positive $Q$: energy released. *Why this step:* the products are more tightly bound; the extra binding is the energy set free.\n\n**Worked example 4 (a moderator in numbers).** A 2 MeV neutron collides head-on with carbon-12 nuclei. How much energy does it keep after one collision? After how many head-on collisions is it below 0.1 MeV?\n\n1. Fraction kept per collision: $(11/13)^2 = 0.716$. After one: $1.43$ MeV.\n2. After $n$ collisions: $2\\times0.716^n < 0.1$ needs $0.716^n < 0.05$, so $n > \\dfrac{\\ln 0.05}{\\ln 0.716} = 8.97$, i.e. 9 collisions. (Glancing collisions transfer less, so real neutrons need more.)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"fusion gives less energy because the nuclei are small\"",
      content:
        "Each fusion event releases less than a fission event (about 24 MeV against 200 MeV), but per nucleon, and so per kilogram of fuel, fusion releases several times more. The steep left side of the BE/A curve is where the biggest gains are.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a moderator slows neutrons by absorbing them\"",
      content:
        "Absorbing neutrons is the control rods' job. A moderator slows neutrons by elastic collisions with light nuclei, and a good moderator absorbs as *few* neutrons as possible; that is why heavy water beats ordinary water, whose hydrogen captures some neutrons.",
    },
    {
      type: "quiz",
      id: "omp4-7-q1",
      variant: "practice",
      question: "A 100 MW reactor releases 200 MeV per fission. How many fissions occur per second?",
      options: [
        { text: "$5\\times10^{5}$", feedback: "That divides watts by MeV without converting MeV to joules." },
        { text: "$3.1\\times10^{18}$", correct: true, feedback: "$10^8/(3.2\\times10^{-11}) = 3.125\\times10^{18}$." },
        { text: "$6.25\\times10^{18}$", feedback: "That is for 200 MW." },
        { text: "$3.2\\times10^{-3}$", feedback: "That multiplies power by energy per fission. Divide instead." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-7-q2",
      variant: "concept",
      question: "Why are light nuclei like hydrogen and carbon used as moderators?",
      options: [
        { text: "Light nuclei absorb neutrons strongly.", feedback: "Absorption is the control rods' job; moderators should absorb little." },
        { text: "In elastic collisions a neutron loses the largest fraction of its energy to a nucleus of similar mass.", correct: true, feedback: "The retained fraction $\\left(\\frac{A-1}{A+1}\\right)^2$ is smallest for small $A$." },
        { text: "Light nuclei undergo fission easily.", feedback: "Moderator nuclei do not fission at all." },
        { text: "They speed neutrons up so they can reach the fuel.", feedback: "$^{235}$U captures *slow* neutrons best; the moderator slows them down." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-7-q3",
      variant: "concept",
      question: "Why does fusion require extremely high temperatures?",
      options: [
        { text: "Heat breaks the nuclei into protons and neutrons first.", feedback: "Fusion joins nuclei; it does not need them broken apart." },
        { text: "The nuclear force only acts at high temperature.", feedback: "The nuclear force does not depend on temperature; it only needs short distances." },
        { text: "High temperatures increase the mass defect.", feedback: "The mass defect is a property of the nuclei, not of temperature." },
        { text: "The nuclei must have enough kinetic energy to get close despite their Coulomb repulsion.", correct: true, feedback: "Only then can the short-range nuclear force take over (tunnelling helps)." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-7-q4",
      variant: "practice",
      question: "In $^{235}_{92}\\text{U} + {}^1_0n \\to {}^{144}_{56}\\text{Ba} + {}^{A}_{Z}\\text{X} + 3\\,{}^1_0n$, identify $A$ and $Z$.",
      options: [
        { text: "$A = 89$, $Z = 36$", correct: true, feedback: "$236 = 144 + A + 3 \\Rightarrow A = 89$; $92 = 56 + Z \\Rightarrow Z = 36$ (krypton)." },
        { text: "$A = 92$, $Z = 36$", feedback: "Remember the three neutrons: $236 - 144 - 3 = 89$." },
        { text: "$A = 91$, $Z = 36$", feedback: "You forgot the incoming neutron on the left: the total is 236, not 235." },
        { text: "$A = 89$, $Z = 33$", feedback: "Neutrons carry no charge, so $Z = 92 - 56 = 36$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-7-q5",
      variant: "concept",
      question: "Per kilogram of fuel, how does fusion of deuterium compare with fission of uranium-235?",
      options: [
        { text: "Fission releases more, because each event gives 200 MeV.", feedback: "Per *event* yes, but each event uses 236 nucleons; per nucleon fusion wins." },
        { text: "They are the same, because both use $E = \\Delta m\\,c^2$.", feedback: "Same principle, different mass defects per nucleon." },
        { text: "Fusion releases several times more energy per kilogram.", correct: true, feedback: "About 6 MeV per nucleon against about 0.85 MeV per nucleon." },
        { text: "Fusion releases no net energy; it only balances the Coulomb barrier.", feedback: "The Q-value of D + D → He-4 is about +24 MeV." },
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
      type: "callout",
      variant: "info",
      title: "The chapter in eight lines",
      content:
        "1. Closest approach: $K = \\dfrac{2Ze^2}{4\\pi\\varepsilon_0 r_0}$, with $e^2/4\\pi\\varepsilon_0 = 1.44$ MeV·fm.\n2. Bohr: Coulomb force + $mvr = nh/2\\pi$ give $r_n = 0.529\\,n^2/Z$ Å, $v_n = 2.19\\times10^6\\,Z/n$ m/s, $E_n = -13.6\\,Z^2/n^2$ eV; $K = -E$, $U = 2E$.\n3. Lines: $h\\nu = E_i - E_f$; series by final level; $n(n-1)/2$ lines from a gas.\n4. X-rays: $\\lambda_{\\min} = 1240/V$ nm; $K_\\alpha$ fixed by the target, $\\sqrt\\nu \\propto Z - 1$.\n5. $R = 1.2A^{1/3}$ fm, constant density.\n6. $BE = \\Delta m\\times931.5$ MeV; $Q = BE_{\\text{after}} - BE_{\\text{before}}$.\n7. $N = N_0e^{-\\lambda t}$, $T_{1/2} = 0.693/\\lambda$, $A = \\lambda N$.\n8. Fission and fusion both climb towards the iron peak.",
    },
    {
      type: "text",
      content:
        "No formula sheet below. Use $hc = 1240$ eV·nm, $e^2/4\\pi\\varepsilon_0 = 1.44$ MeV·fm, $1$ u $= 931.5$ MeV.",
    },
    {
      type: "quiz",
      id: "omp4-8-q1",
      variant: "mastery",
      question: "A 4 MeV alpha particle heads straight for a silver nucleus ($Z = 47$). How close does it get?",
      options: [
        { text: "About 17 fm", feedback: "That forgets the alpha's charge $2e$." },
        { text: "About 135 fm", feedback: "That is $2Z\\times1.44$ MeV·fm without dividing by $K = 4$ MeV." },
        { text: "About 68 fm", feedback: "That is the answer for 2 MeV. Check the division." },
        { text: "About 34 fm", correct: true, feedback: "$r_0 = 2\\times47\\times1.44/4 \\approx 33.8$ fm." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-8-q2",
      variant: "mastery",
      question: "Which state of Li²⁺ ($Z = 3$) has the same total energy as the ground state of hydrogen?",
      options: [
        { text: "$n = 1$", feedback: "$E_1 = -13.6\\times9 = -122.4$ eV, nine times deeper." },
        { text: "$n = 3$", correct: true, feedback: "$E_n = -13.6\\,Z^2/n^2 = -13.6\\times9/9 = -13.6$ eV." },
        { text: "$n = 9$", feedback: "That matches $Z^2$ with $n$ rather than $n^2$: $-13.6\\times9/81 = -1.51$ eV." },
        { text: "No state matches.", feedback: "$n = 3$ gives $Z^2/n^2 = 1$ exactly." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-8-q3",
      variant: "mastery",
      question: "In which state of He⁺ does the electron have the same speed as in the ground state of hydrogen?",
      options: [
        { text: "$n = 1$", feedback: "That gives twice hydrogen's ground-state speed." },
        { text: "$n = 4$", feedback: "That gives $2/4 = \\frac12$ of hydrogen's speed. Speed goes as $Z/n$, not $Z^2/n^2$." },
        { text: "$n = 2$", correct: true, feedback: "$v \\propto Z/n$; $2/2 = 1/1$. (Its energy, $-13.6\\times4/4$ eV, matches too.)" },
        { text: "No state of He⁺ matches.", feedback: "$n = 2$ gives $Z/n = 1$, exactly matching." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-8-q4",
      variant: "mastery",
      question: "A photon from the $n = 3 \\to 2$ transition in He⁺ falls on potassium ($\\phi = 2.3$ eV). Find the stopping potential of the photoelectrons.",
      options: [
        { text: "About 5.26 V", correct: true, feedback: "$E = 54.4\\left(\\frac14 - \\frac19\\right) = 7.56$ eV; $7.56 - 2.3 = 5.26$ eV." },
        { text: "Zero: no electrons are emitted", feedback: "That would be true for hydrogen's $3 \\to 2$ photon (1.89 eV, below 2.3 eV). He⁺ levels are $Z^2 = 4$ times deeper, so its photon carries 7.56 eV." },
        { text: "About 7.56 V", feedback: "That is the photon energy. Subtract the work function." },
        { text: "About 1.48 V", feedback: "That scales hydrogen's 1.89 eV by $Z = 2$ instead of $Z^2 = 4$: $3.78 - 2.3$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-8-q5",
      variant: "mastery",
      question: "A single hydrogen atom is excited to $n = 6$. What is the maximum number of photons it can emit on its way to the ground state, and how many distinct lines can a large sample of such atoms show?",
      options: [
        { text: "15 photons; 15 lines", feedback: "One atom follows one path, so it cannot emit every line." },
        { text: "5 photons; 5 lines", feedback: "Different atoms take different routes, so the gas shows $\\binom62$ lines." },
        { text: "5 photons; 15 lines", correct: true, feedback: "One atom steps down at most one level at a time: 5 photons. A gas shows every pair: $\\binom62 = 15$." },
        { text: "6 photons; 21 lines", feedback: "There are 6 levels (1 to 6): 5 steps and $\\binom62 = 15$ pairs." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-8-q6",
      variant: "mastery",
      question: "An X-ray tube's voltage is raised from 25 kV to 50 kV. What happens to $\\lambda_{\\min}$ and to $\\lambda_{K\\alpha}$?",
      options: [
        { text: "$\\lambda_{\\min}$ halves (0.0496 → 0.0248 nm); $\\lambda_{K\\alpha}$ is unchanged.", correct: true, feedback: "$\\lambda_{\\min} = 1240/V$ nm; characteristic lines belong to the target." },
        { text: "Both halve.", feedback: "The $K_\\alpha$ line depends on the target's inner levels, not on the voltage." },
        { text: "$\\lambda_{\\min}$ doubles; $\\lambda_{K\\alpha}$ is unchanged.", feedback: "Higher voltage means more energetic photons, so a *shorter* cut-off." },
        { text: "Neither changes.", feedback: "$\\lambda_{\\min} = hc/eV$ depends directly on $V$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-8-q7",
      variant: "mastery",
      question: "Find the ratio of the radii of nuclei with mass numbers 8 and 125, and the ratio of their densities.",
      options: [
        { text: "Radii $8 : 125$; densities $1 : 1$", feedback: "That is the ratio of volumes. Take cube roots for radii." },
        { text: "Radii $2 : 5$; densities $125 : 8$", feedback: "Mass and volume both scale with $A$, so density is the same." },
        { text: "Radii $\\sqrt8 : \\sqrt{125}$; densities $1 : 1$", feedback: "The exponent is $\\frac13$, not $\\frac12$." },
        { text: "Radii $2 : 5$; densities $1 : 1$", correct: true, feedback: "$R \\propto A^{1/3}$: $2 : 5$. Density is independent of $A$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-8-q8",
      variant: "mastery",
      question: "A nucleus with $A = 200$ and $BE/A = 7.8$ MeV splits into two nuclei of $A = 100$ with $BE/A = 8.6$ MeV. Find the energy released.",
      options: [
        { text: "$0.8$ MeV", feedback: "That is the gain per nucleon. Multiply by 200 nucleons." },
        { text: "$160$ MeV", correct: true, feedback: "$200\\times(8.6 - 7.8) = 160$ MeV." },
        { text: "$80$ MeV", feedback: "That counts only one fragment's nucleons. Both fragments, 200 nucleons in all, gain 0.8 MeV each." },
        { text: "$3280$ MeV", feedback: "That adds binding energies. Release is the *difference*, after minus before." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-8-q9",
      variant: "mastery",
      question: "Samples X ($T_{1/2} = 2$ h) and Y ($T_{1/2} = 4$ h) start with equal numbers of nuclei. After 8 hours, what is the ratio of their activities $A_X : A_Y$?",
      options: [
        { text: "$1 : 4$", feedback: "That is the ratio of *numbers* of nuclei. Activity also has a factor $\\lambda$, which is twice as big for X." },
        { text: "$1 : 2$", correct: true, feedback: "$N_X = N_0/16$, $N_Y = N_0/4$; $\\lambda_X = 2\\lambda_Y$; $A_X/A_Y = 2\\times\\frac{1/16}{1/4} = \\frac12$." },
        { text: "$2 : 1$", feedback: "That is the ratio at $t = 0$, before X decays faster." },
        { text: "$1 : 8$", feedback: "That divides by $\\lambda_X/\\lambda_Y = 2$ instead of multiplying. $A = \\lambda N$, and X has the larger $\\lambda$." },
      ],
      hint: "Find each remaining fraction, then remember $A = \\lambda N$.",
    },
    {
      type: "quiz",
      id: "omp4-8-q10",
      variant: "mastery",
      question: "A hydrogen atom at rest emits a photon in the $n = 2 \\to 1$ transition. Roughly what is the atom's recoil speed? ($m_{\\text H}c^2 \\approx 938$ MeV)",
      options: [
        { text: "About $3\\times10^8$ m/s", feedback: "That is the photon's speed. The heavy atom recoils very slowly." },
        { text: "About $1.1\\times10^{-8}$ m/s", feedback: "That is $E/Mc^2$, a dimensionless ratio. Multiply by $c$." },
        { text: "Zero, because photons have no mass", feedback: "The photon carries momentum $E/c$, and momentum is conserved." },
        { text: "About 3.3 m/s", correct: true, feedback: "$v = E/(Mc) = \\frac{10.2}{938\\times10^6}\\times3\\times10^8 \\approx 3.3$ m/s." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-8-q11",
      variant: "mastery",
      question: "A rock contains 3 atoms of a stable daughter for every atom of its parent (all daughters from the parent). The parent's half-life is 700 million years. How old is the rock?",
      options: [
        { text: "1.4 billion years", correct: true, feedback: "Parent fraction $= 1/(1+3) = 1/4 = (1/2)^2$: two half-lives." },
        { text: "2.1 billion years", feedback: "That is three half-lives, which would give a daughter:parent ratio of 7:1." },
        { text: "700 million years", feedback: "One half-life gives a daughter:parent ratio of 1:1." },
        { text: "About 1.1 billion years", feedback: "That uses $N/N_0 = 1/3$. The original number is parent *plus* daughters, $1 + 3 = 4$." },
      ],
    },
    {
      type: "quiz",
      id: "omp4-8-q12",
      variant: "mastery",
      question: "$^{A}_{Z}$X emits one $\\alpha$, then two $\\beta^-$. What is the final nucleus relative to X?",
      options: [
        { text: "An isobar of X", feedback: "The mass number fell by 4, so it is not an isobar." },
        { text: "The element two places below X in the periodic table", feedback: "The two $\\beta^-$ decays restore $Z$." },
        { text: "An isotope of X with mass number $A - 4$", correct: true, feedback: "$\\alpha$: $(A-4, Z-2)$; two $\\beta^-$: $(A-4, Z)$. Same $Z$, so same element." },
        { text: "X itself", feedback: "The mass number dropped by 4; it is a lighter isotope." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Bohr's levels belong to isolated atoms. Pack $10^{23}$ silicon atoms into a crystal and those levels spread into bands. Chapter 5 uses the gap between bands to build diodes, LEDs, solar cells and transistors.",
    },
  ]),
};

export const ompChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
