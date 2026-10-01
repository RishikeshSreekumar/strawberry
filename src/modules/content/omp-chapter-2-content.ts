import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Optics and Modern Physics Chapter 2 — Wave Optics.
 * Huygens' wavefronts justify the ray laws; superposition turns path
 * difference into phase difference, giving Young's fringes, thin films,
 * single-slit diffraction and the resolving limit; polarisation shows
 * that light is a transverse wave (Malus, Brewster).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "wavefronts-and-huygens-principle",
  title: "2.1 · Wavefronts and Huygens' Principle",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "In Chapter 0 we used rays and two laws and never asked why the laws hold. Rays turn out to be a shorthand: they are simply the directions **perpendicular** to the crests of a light wave. If we can say how the crests move, both laws of reflection and Snell's law fall out, and we get something rays can never give us: an explanation of interference and diffraction.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Wavefront",
      content:
        "A **wavefront** is a surface on which every point oscillates in the same phase (for example, a crest). Rays are drawn perpendicular to wavefronts, pointing the way the wave travels.\n- A point source gives **spherical** wavefronts.\n- A line source (a slit) gives **cylindrical** ones.\n- Far from any source (e.g. sunlight), a small patch of a sphere is effectively flat: a **plane** wavefront, with parallel rays.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Huygens' principle",
      content:
        "1. Every point on a wavefront acts as a source of secondary **wavelets**, which spread out in the forward direction at the speed of the wave in that medium.\n2. After a time $t$, the new wavefront is the **envelope** (common tangent surface) of all these wavelets, each of radius $vt$.",
    },
    {
      type: "text",
      content:
        "**Derivation 1: the law of reflection.** A plane wavefront AB meets a mirror obliquely: its end A touches the mirror while its other end B still has a distance BC to go. In the time $t$ that B takes to reach C ($BC = vt$), the wavelet from A grows to radius $AD = vt$ (same medium, same speed). The reflected wavefront is the tangent CD from C to that wavelet. Triangles ABC and CDA are both right-angled (at B and at D), share the hypotenuse AC, and have $BC = AD$. So they are congruent, and the angle the incident wavefront makes with the mirror equals the angle the reflected wavefront makes with it. The rays are perpendicular to the wavefronts, so $i = r$.",
    },
    {
      type: "text",
      content:
        "**Derivation 2: Snell's law.** The same picture at a boundary between medium 1 (speed $v_1$) and medium 2 (speed $v_2$). While end B travels $BC = v_1 t$ in medium 1, the wavelet from A travels $AD = v_2 t$ into medium 2. The refracted wavefront is the tangent CD. From the two right triangles sharing the hypotenuse AC:",
    },
    {
      type: "math",
      latex:
        "\\sin i = \\frac{BC}{AC} = \\frac{v_1t}{AC}, \\quad \\sin r = \\frac{AD}{AC} = \\frac{v_2t}{AC} \\;\\Longrightarrow\\; \\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2} = \\frac{n_2}{n_1}",
    },
    {
      type: "text",
      content:
        "That is Snell's law, $n_1\\sin i = n_2\\sin r$, with $n = c/v$. The \"marching band\" picture of 0.4 was this argument in disguise. Because the wavefront is continuous across the boundary, the same number of crests arrive and leave per second, so the **frequency is unchanged**, while $v$ and $\\lambda = v/\\nu$ both shrink by the factor $n$.",
    },
    {
      type: "text",
      content:
        "Revisit the refraction bench with this in mind: the ratio $\\sin i/\\sin r$ you read off is the ratio of speeds.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "refraction",
        n1: { min: 1, max: 1, step: 0.01, initial: 1 },
        n2: { min: 1, max: 2.5, step: 0.01, initial: 1.5 },
        incidence: { min: 0, max: 89, step: 1, initial: 45 },
        caption:
          "Read i and r and compute sin i / sin r. It always equals n₂/n₁, which Huygens says is v₁/v₂: the wave covers less distance per second in the lower medium, so the wavefront pivots.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $i = 45^\\circ$ with $n_2 = 1.5$, $r \\approx 28.1^\\circ$ and $\\frac{\\sin 45^\\circ}{\\sin 28.1^\\circ} = \\frac{0.707}{0.471} \\approx 1.5$. Change $i$ and the ratio stays 1.5; change $n_2$ and the ratio follows it. The ratio is a property of the two speeds, not of the angle.",
    },
    {
      type: "text",
      content:
        "**Wavefronts through optical elements (qualitative).** A plane wavefront entering a **prism** is delayed more where the glass is thicker (near the base), so it tilts towards the base: deviation. A **convex lens** is thickest at the centre, so the middle of a plane wavefront is held back and it emerges curved inwards, a spherical wavefront converging on the focus. A **concave mirror** reflects the edges of a plane wavefront first, which again makes it converge.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Optical path",
      content:
        "Light takes time $t = \\frac{L}{v} = \\frac{nL}{c}$ to cross a length $L$ of a medium of index $n$. So $nL$ is the distance light would cover **in vacuum** in the same time: the **optical path**. Wavefronts join points of equal optical path from the source. In the next lessons, every interference condition is a statement about differences in optical path.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (inside glass).** Light of wavelength 600 nm in air enters glass of $n = 1.5$.\n\n1. Speed: $v = \\frac cn = \\frac{3\\times10^8}{1.5} = 2\\times10^8$ m/s.\n2. Frequency: $\\nu = \\frac{c}{\\lambda} = \\frac{3\\times10^8}{600\\times10^{-9}} = 5\\times10^{14}$ Hz, unchanged in the glass. *Why this step:* the wavefront is continuous at the boundary, so crests cannot be created or lost.\n3. Wavelength in glass: $\\frac{v}{\\nu} = \\frac{2\\times10^8}{5\\times10^{14}} = 4\\times10^{-7}$ m $= 400$ nm $= \\frac{600}{1.5}$. ✓\n\n**Worked example 2 (speed from angles).** A plane wave in air meets a transparent medium at $60^\\circ$ and refracts at $30^\\circ$.\n\n1. Huygens: $\\frac{v_1}{v_2} = \\frac{\\sin 60^\\circ}{\\sin 30^\\circ} = \\frac{\\sqrt3/2}{1/2} = \\sqrt3$.\n2. $v_2 = \\frac{3\\times10^8}{\\sqrt3} \\approx 1.73\\times10^8$ m/s, and $n = \\sqrt3$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (optical path, JEE Main).** Light crosses 2 cm of glass ($n = 1.5$) and then 3 cm of water ($n = \\frac43$). How long does it take, and what is the optical path?\n\n1. Optical path: $1.5 \\times 2 + \\frac43 \\times 3 = 3 + 4 = 7$ cm. *Why this step:* optical paths add like ordinary lengths, each weighted by its index.\n2. Time: $t = \\frac{0.07}{3\\times10^8} \\approx 2.33\\times10^{-10}$ s, the time light would take to cross 7 cm of vacuum.\n3. Check directly: $\\frac{0.02}{2\\times10^8} + \\frac{0.03}{2.25\\times10^8} = 1.0\\times10^{-10} + 1.33\\times10^{-10} = 2.33\\times10^{-10}$ s. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"wavelength stays the same in glass because the colour does\"",
      content:
        "Colour is fixed by **frequency**, and frequency is what stays the same. The wavelength shrinks to $\\lambda/n$ inside the glass. Red light of 650 nm has a wavelength of about 490 nm in water, which in air would be blue-green, yet it still looks red to a diver, because the eye responds to frequency.",
    },
    {
      type: "quiz",
      id: "omp2-1-q1",
      variant: "practice",
      question: "Light of wavelength 600 nm in air enters water ($n = \\frac43$). What is its wavelength in water?",
      options: [
        { text: "800 nm", feedback: "The wavelength shrinks in a denser medium: divide by $n$." },
        { text: "600 nm", feedback: "Frequency is unchanged; wavelength is not." },
        { text: "450 nm", correct: true, feedback: "$\\lambda_w = \\frac{600}{4/3} = 450$ nm." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-1-q2",
      variant: "concept",
      question: "How is a ray related to the wavefronts of a wave?",
      options: [
        { text: "It lies along a wavefront.", feedback: "A wavefront is a surface of equal phase; energy flows across it, not along it." },
        { text: "It is perpendicular to the wavefronts, in the direction of travel.", correct: true, feedback: "Rays are the normals to the wavefronts." },
        { text: "It is unrelated; rays and waves are separate theories.", feedback: "Rays are a limit of the wave picture, drawn as normals to the wavefronts." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-1-q3",
      variant: "practice",
      question: "A plane wave passes from medium 1 to medium 2 with $i = 45^\\circ$ and $r = 30^\\circ$. What is $v_1/v_2$?",
      options: [
        { text: "$\\frac{1}{\\sqrt2}$", feedback: "The wave bends towards the normal, so it slows: $v_1 > v_2$." },
        { text: "$1.5$", feedback: "That is $45/30$. Use the sines, not the angles." },
        { text: "$\\sqrt2$", correct: true, feedback: "$\\frac{\\sin 45^\\circ}{\\sin 30^\\circ} = \\frac{1/\\sqrt2}{1/2} = \\sqrt2$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-1-q4",
      variant: "practice",
      question: "What is the optical path of 4 cm of glass ($n = 1.5$), and how long does light take to cross it?",
      options: [
        { text: "2.67 cm; $8.9\\times10^{-11}$ s", feedback: "Optical path multiplies by $n$; it does not divide." },
        { text: "6 cm; $2\\times10^{-10}$ s", correct: true, feedback: "$nL = 6$ cm and $t = \\frac{0.06}{3\\times10^8}$ s." },
        { text: "4 cm; $1.33\\times10^{-10}$ s", feedback: "That is the vacuum crossing time of 4 cm. Light is slower in glass." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-1-q5",
      variant: "concept",
      question: "What shape of wavefront reaches Earth from a distant star?",
      options: [
        { text: "Plane, because a tiny patch of a huge sphere is flat", correct: true, feedback: "That is why starlight arrives as parallel rays." },
        { text: "Spherical, because a star is a point source", feedback: "It starts spherical, but at that distance the curvature over a telescope's width is negligible." },
        { text: "Cylindrical", feedback: "Cylindrical wavefronts come from line sources such as slits." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "superposition-and-coherence",
  title: "2.2 · Superposition and Coherent Sources",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Switch on two torches and point them at the same wall. The patch gets brighter everywhere, with no pattern at all. Yet light from a single laser split into two beams paints the wall with dark and bright stripes. Waves add their **displacements**, and whether that shows up as stripes depends on whether the two sources keep a fixed phase relation.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Principle of superposition",
      content:
        "When two waves overlap, the resultant displacement at each point is the (vector) sum of the individual displacements: $y = y_1 + y_2$. Each wave passes through the other unchanged.",
    },
    {
      type: "text",
      content:
        "**Derivation.** Two waves of the same frequency arrive at a point with amplitudes $a_1$, $a_2$ and phase difference $\\phi$: $y_1 = a_1\\sin\\omega t$ and $y_2 = a_2\\sin(\\omega t + \\phi)$. Represent each as a rotating arrow (phasor) of length $a_1$ or $a_2$, with $\\phi$ between them. The sum is the third side of the triangle, and the law of cosines (the angle opposite the resultant is $180^\\circ - \\phi$) gives",
    },
    { type: "math", latex: "A^2 = a_1^2 + a_2^2 + 2a_1a_2\\cos\\phi" },
    {
      type: "text",
      content: "Intensity is proportional to amplitude squared ($I \\propto A^2$), so",
    },
    { type: "math", latex: "I = I_1 + I_2 + 2\\sqrt{I_1I_2}\\cos\\phi" },
    {
      type: "text",
      content:
        "The last term is the **interference term**. Where does $\\phi$ come from? A path difference $\\Delta x$ means one wave has travelled $\\Delta x/\\lambda$ extra wavelengths, and each wavelength is $2\\pi$ of phase:",
    },
    { type: "math", latex: "\\phi = \\frac{2\\pi}{\\lambda}\\,\\Delta x" },
    {
      type: "callout",
      variant: "definition",
      title: "Constructive and destructive interference",
      content:
        "**Constructive** (maximum): $\\phi = 2m\\pi$, i.e. $\\Delta x = m\\lambda$. $I_{\\max} = (\\sqrt{I_1} + \\sqrt{I_2})^2$.\n**Destructive** (minimum): $\\phi = (2m + 1)\\pi$, i.e. $\\Delta x = (m + \\tfrac12)\\lambda$. $I_{\\min} = (\\sqrt{I_1} - \\sqrt{I_2})^2$.\nSo $\\dfrac{I_{\\max}}{I_{\\min}} = \\left(\\dfrac{\\sqrt{I_1} + \\sqrt{I_2}}{\\sqrt{I_1} - \\sqrt{I_2}}\\right)^2 = \\left(\\dfrac{a_1 + a_2}{a_1 - a_2}\\right)^2$. Equal intensities give $I_{\\max} = 4I_0$ and $I_{\\min} = 0$: the best contrast.",
    },
    {
      type: "text",
      content:
        "Plot $I$ against $\\phi$ with sliders for $I_1$ and $I_2$. The base curve is the equal-intensity case $I_1 = I_2 = 1$.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "2 + 2*cos(x)",
        baseLatex: "I_1 = I_2 = 1",
        expr: "a + b + 2*sqrt(a*b)*cos(x)",
        exprLatex: "I = I_1 + I_2 + 2\\sqrt{I_1 I_2}\\cos\\phi",
        params: [
          { name: "a", min: 0, max: 4, step: 0.1, initial: 1 },
          { name: "b", min: 0, max: 4, step: 0.1, initial: 1 },
        ],
        window: { xmin: -7, xmax: 7, ymin: 0, ymax: 17 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $I_1 = I_2$ the curve swings from $4I_0$ down to exactly zero. Make them unequal ($a = 4$, $b = 1$) and the maxima rise to 9 while the minima lift off zero to 1: the fringes wash out. The **average** of the curve is always $I_1 + I_2$, because $\\cos\\phi$ averages to zero over a cycle. Energy is not destroyed at the dark places; it is moved to the bright ones.",
    },
    {
      type: "text",
      content:
        "The same idea in the time domain: slide the phase $c$ of the second wave from 0 to $\\pi$ and watch it go from in step to exactly out of step with the first.",
    },
    {
      type: "interactive",
      config: {
        component: "sinusoid-playground",
        fn: "sin",
        initialA: 1,
        initialB: 1,
        initialC: 3.14,
        initialD: 0,
        window: { xmin: -7, xmax: 7, ymin: -2.5, ymax: 2.5 },
        caption:
          "At c = 0 the two curves coincide: they add to double the amplitude. At c = π every crest meets a trough: equal amplitudes cancel completely.",
      },
    },
    {
      type: "text",
      content:
        "**Coherence.** An ordinary lamp emits light in random bursts from billions of atoms, each lasting about $10^{-8}$ s, with random phases. Two such lamps have a phase difference $\\phi$ that jumps randomly about $10^8$ times a second. Your eye averages over far longer than that, and $\\langle\\cos\\phi\\rangle = 0$, so it sees $I = I_1 + I_2$ everywhere: no fringes. Sources with a **constant** phase difference are called **coherent**. In practice we make them by splitting one source into two (Young's two slits, a thin film's two surfaces) or by using a laser.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (contrast from amplitudes).** Two coherent waves have amplitudes in the ratio 2 : 1.\n\n1. $\\frac{I_{\\max}}{I_{\\min}} = \\left(\\frac{2 + 1}{2 - 1}\\right)^2 = 9$. *Why this step:* amplitudes add and subtract; intensities do not.\n2. If instead the **intensities** are in the ratio 9 : 1, the amplitudes are $3 : 1$ and $\\frac{I_{\\max}}{I_{\\min}} = \\left(\\frac{4}{2}\\right)^2 = 4$.\n\n**Worked example 2 (intensity at a given path difference).** Two coherent sources of equal intensity $I_0$ give a maximum of $4I_0$. What is the intensity where the path difference is $\\lambda/3$?\n\n1. $\\phi = \\frac{2\\pi}{\\lambda}\\cdot\\frac{\\lambda}{3} = \\frac{2\\pi}{3}$.\n2. $I = I_0 + I_0 + 2I_0\\cos\\frac{2\\pi}{3} = 2I_0 - I_0 = I_0$. *Why this step:* $\\cos 120^\\circ = -\\frac12$.\n3. That is one quarter of the maximum. Equivalently $I = 4I_0\\cos^2\\frac\\phi2 = 4I_0\\cdot\\frac14$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (where does the energy go?).** For equal sources, $I = 2I_0(1 + \\cos\\phi) = 4I_0\\cos^2\\frac\\phi2$. Averaged across many fringes, $\\cos^2$ averages to $\\frac12$, so the average intensity is $2I_0$: exactly what the two sources would give without interference. The pattern redistributes energy, it does not create or destroy it.\n\n**Worked example 4 (reading the phase).** Two coherent waves meet with a path difference of 1.5 μm; $\\lambda = 600$ nm.\n\n1. $\\frac{\\Delta x}{\\lambda} = \\frac{1500}{600} = 2.5$ wavelengths.\n2. $\\phi = 2.5 \\times 2\\pi = 5\\pi$, an odd multiple of $\\pi$: destructive, a dark point (if the intensities are equal).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"two torches can make an interference pattern\"",
      content:
        "The interference is there for an instant, but the phase difference between two independent sources changes randomly about $10^8$ times a second, and the pattern shifts just as fast. What you see is the average, $I_1 + I_2$. Fringes need coherent sources.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"at a dark fringe energy is destroyed\"",
      content:
        "The bright fringes carry $4I_0$, twice the $2I_0$ the sources would give together without interference. The average over the pattern is exactly $2I_0$. Energy is redistributed from the dark fringes to the bright ones.",
    },
    {
      type: "quiz",
      id: "omp2-2-q1",
      variant: "practice",
      question: "Two coherent sources have intensities $4I$ and $I$. What are the maximum and minimum intensities in their interference pattern?",
      options: [
        { text: "$5I$ and $3I$", feedback: "Intensities do not add and subtract directly; amplitudes do." },
        { text: "$9I$ and $I$", correct: true, feedback: "$(\\sqrt{4I} + \\sqrt I)^2 = 9I$ and $(\\sqrt{4I} - \\sqrt I)^2 = I$." },
        { text: "$25I$ and $9I$", feedback: "You squared the intensities instead of taking square roots." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-2-q2",
      variant: "practice",
      question: "What phase difference corresponds to a path difference of $\\lambda/2$?",
      options: [
        { text: "$\\frac\\pi2$", feedback: "$\\frac\\pi2$ corresponds to $\\frac\\lambda4$." },
        { text: "$2\\pi$", feedback: "$2\\pi$ is a full wavelength of path." },
        { text: "$\\pi$", correct: true, feedback: "$\\phi = \\frac{2\\pi}{\\lambda}\\cdot\\frac\\lambda2 = \\pi$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-2-q3",
      variant: "concept",
      question: "Why do two identical sodium lamps side by side not produce interference fringes?",
      options: [
        { text: "Their phase difference changes randomly and rapidly, so the interference term averages to zero.", correct: true, feedback: "They are not coherent." },
        { text: "Their wavelengths are different.", feedback: "Two sodium lamps emit the same wavelengths. The problem is the random phase." },
        { text: "Light from different lamps cannot overlap.", feedback: "The beams overlap and superpose; the pattern just flickers too fast to see." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-2-q4",
      variant: "practice",
      question: "Two coherent waves of equal intensity $I_0$ meet with a phase difference of $\\frac\\pi3$. What is the resultant intensity?",
      options: [
        { text: "$2I_0$", feedback: "That drops the interference term." },
        { text: "$I_0$", feedback: "That would be $\\phi = \\frac{2\\pi}{3}$, where $\\cos\\phi = -\\frac12$." },
        { text: "$4I_0$", feedback: "$4I_0$ needs $\\phi = 0$." },
        { text: "$3I_0$", correct: true, feedback: "$2I_0 + 2I_0\\cos 60^\\circ = 3I_0$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-2-q5",
      variant: "concept",
      question: "In an interference pattern of two equal coherent sources, what happens to the energy that does not reach the dark fringes?",
      options: [
        { text: "It is destroyed.", feedback: "Energy is conserved; interference only redistributes it." },
        { text: "It is reflected back to the sources.", feedback: "Nothing is sent back; the energy appears in the bright fringes." },
        { text: "It goes to the bright fringes, which get $4I_0$ instead of $2I_0$.", correct: true, feedback: "The average over the pattern stays $2I_0$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-2-q6",
      variant: "practice",
      question: "In an interference pattern, $\\frac{I_{\\max}}{I_{\\min}} = 25$. What is the ratio of the amplitudes of the two waves?",
      options: [
        { text: "$5 : 1$", feedback: "5 is $\\frac{a_1 + a_2}{a_1 - a_2}$, not $\\frac{a_1}{a_2}$." },
        { text: "$3 : 2$", correct: true, feedback: "$\\frac{a_1 + a_2}{a_1 - a_2} = 5$ gives $a_1 = 1.5a_2$." },
        { text: "$25 : 1$", feedback: "That is the intensity ratio of max to min, not of the two waves." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "youngs-double-slit-experiment",
  title: "2.3 · Young's Double-Slit Experiment",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 1801 Thomas Young let sunlight through a pinhole, then through two closely spaced pinholes, and saw light and dark bands on a screen. A particle theory of light could not explain dark bands where light from both holes arrived. Waves could: the two holes are coherent copies of one source, and the bands mark where the path difference is a whole or a half number of wavelengths.",
    },
    {
      type: "text",
      content:
        "**Set-up.** Two slits $S_1$, $S_2$ a distance $d$ apart, a screen a distance $D$ away ($D \\gg d$). A point P on the screen is a height $y$ above the centre O. The slits are coherent because they are lit by the same wavefront.",
    },
    {
      type: "text",
      content:
        "**Derivation of the path difference.** With the slits at heights $\\pm\\frac d2$, Pythagoras gives",
    },
    {
      type: "math",
      latex:
        "S_2P^2 - S_1P^2 = \\left[D^2 + \\left(y + \\tfrac d2\\right)^2\\right] - \\left[D^2 + \\left(y - \\tfrac d2\\right)^2\\right] = 2yd",
    },
    {
      type: "text",
      content:
        "Factor the left side as $(S_2P - S_1P)(S_2P + S_1P)$. When $D \\gg d$ and $D \\gg y$, both distances are close to $D$, so $S_2P + S_1P \\approx 2D$:",
    },
    { type: "math", latex: "\\Delta x = S_2P - S_1P \\approx \\frac{yd}{D} \\approx d\\sin\\theta" },
    {
      type: "callout",
      variant: "definition",
      title: "Fringe positions and fringe width",
      content:
        "**Bright** fringes: $\\Delta x = n\\lambda$, at $y_n = \\dfrac{n\\lambda D}{d}$, $n = 0, \\pm1, \\pm2, \\dots$ (the central fringe $n = 0$ is bright).\n**Dark** fringes: $\\Delta x = (n + \\tfrac12)\\lambda$, at $y = \\left(n + \\tfrac12\\right)\\dfrac{\\lambda D}{d}$.\n**Fringe width** (bright to bright, or dark to dark): $\\beta = \\dfrac{\\lambda D}{d}$; angular fringe width $\\dfrac{\\lambda}{d}$.\n**Intensity** (equal slits, each $I_0$): $I = 4I_0\\cos^2\\dfrac{\\pi y}{\\beta}$.",
    },
    {
      type: "text",
      content:
        "The intensity follows from 2.2: $\\phi = \\frac{2\\pi}{\\lambda}\\cdot\\frac{yd}{D} = \\frac{2\\pi y}{\\beta}$, and $I = 4I_0\\cos^2\\frac\\phi2$. Plot it with $y$ in mm; the base curve has $\\beta = 2$ mm.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "4*cos(pi*x/2)^2",
        baseLatex: "\\beta = 2\\text{ mm}",
        expr: "4*I*cos(pi*x/w)^2",
        exprLatex: "I = 4I_0\\cos^2\\frac{\\pi y}{\\beta}",
        params: [
          { name: "w", min: 0.5, max: 4, step: 0.1, initial: 2 },
          { name: "I", min: 0.5, max: 2, step: 0.1, initial: 1 },
        ],
        window: { xmin: -8, xmax: 8, ymin: 0, ymax: 9 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the fringes are **equally spaced**, with peaks at $0, \\pm\\beta, \\pm2\\beta, \\dots$ and zeros halfway between. Changing $\\beta$ (slider $w$: think larger $\\lambda$, larger $D$ or smaller $d$) stretches the whole pattern; changing $I_0$ only scales the height. Every bright fringe has the same brightness, $4I_0$ (until diffraction by each slit takes over, 2.5).",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (fringe width, JEE Main).** $\\lambda = 600$ nm, $d = 0.5$ mm, $D = 1$ m.\n\n1. $\\beta = \\frac{\\lambda D}{d} = \\frac{600\\times10^{-9} \\times 1}{0.5\\times10^{-3}} = 1.2\\times10^{-3}$ m $= 1.2$ mm. *Why this step:* keep everything in metres; the $10^{-9}$ and $10^{-3}$ are where errors creep in.\n2. Angular fringe width: $\\frac{\\lambda}{d} = 1.2\\times10^{-3}$ rad.\n\n**Worked example 2 (a named fringe).** Same set-up. Where is the 3rd dark fringe?\n\n1. Dark fringes sit at $(n + \\frac12)\\beta$ with $n = 0, 1, 2, \\dots$; the first dark fringe is $n = 0$, so the 3rd is $n = 2$. *Why this step:* counting from $n = 0$ is the usual off-by-one trap.\n2. $y = 2.5 \\times 1.2 = 3.0$ mm from the centre.\n3. The 3rd bright fringe (not counting the central one) is at $3\\beta = 3.6$ mm.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (doubling the fringe width).** Which single change doubles $\\beta$?\n\n1. $\\beta = \\frac{\\lambda D}{d}$: double $\\lambda$ (e.g. 400 nm to 800 nm), or double $D$, or **halve** $d$. *Why this step:* $d$ is in the denominator; moving the slits apart shrinks the fringes.\n\n**Worked example 4 (across the centre).** Find the distance between the 2nd bright fringe on one side and the 3rd dark fringe on the other side, for $\\beta = 1.2$ mm.\n\n1. 2nd bright: $2\\beta$ on one side. 3rd dark: $2.5\\beta$ on the other.\n2. Distance $= 2\\beta + 2.5\\beta = 4.5\\beta = 5.4$ mm.\n\n**Worked example 5 (intensity at a point).** Where on the screen is the intensity half the maximum? $4I_0\\cos^2\\frac{\\pi y}{\\beta} = 2I_0$ needs $\\cos^2 = \\frac12$, i.e. $\\frac{\\pi y}{\\beta} = \\frac\\pi4$: at $y = \\frac\\beta4$ (and every $\\frac\\beta4 + \\frac{k\\beta}{2}$).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"moving the slits apart makes the fringes wider\"",
      content:
        "The opposite: $\\beta = \\frac{\\lambda D}{d}$ falls as $d$ rises. Wider slit separation makes the path difference grow faster with $y$, so the fringes crowd together. Young used pinholes less than a millimetre apart for exactly this reason.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"fringes get wider far from the centre\"",
      content:
        "In the small-angle regime ($y \\ll D$) the path difference grows linearly with $y$, so the fringes are equally spaced. Only at large angles, where $\\sin\\theta \\ne \\tan\\theta$, does the spacing change, and JEE problems stay in the small-angle regime unless they say otherwise.",
    },
    {
      type: "quiz",
      id: "omp2-3-q1",
      variant: "practice",
      question: "In a YDSE, $\\lambda = 500$ nm, $d = 1$ mm and $D = 2$ m. What is the fringe width?",
      options: [
        { text: "1 mm", correct: true, feedback: "$\\frac{500\\times10^{-9} \\times 2}{10^{-3}} = 10^{-3}$ m." },
        { text: "0.25 mm", feedback: "That divides by $D$ instead of multiplying: $\\beta = \\frac{\\lambda D}{d}$." },
        { text: "10 mm", feedback: "Check the powers of ten: $500\\times10^{-9} \\times 2 = 10^{-6}$, then divide by $10^{-3}$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-3-q2",
      variant: "concept",
      question: "The slit separation in a YDSE is halved and everything else is kept the same. What happens to the fringe width?",
      options: [
        { text: "It halves.", feedback: "$d$ is in the denominator." },
        { text: "It stays the same.", feedback: "Fringe width depends directly on $d$." },
        { text: "It doubles.", correct: true, feedback: "$\\beta \\propto \\frac1d$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-3-q3",
      variant: "practice",
      question: "With $\\lambda = 600$ nm, $d = 0.3$ mm and $D = 1.5$ m, where is the 3rd bright fringe (not counting the central one)?",
      options: [
        { text: "7.5 mm from the centre", feedback: "That is $2.5\\beta$, the 3rd dark fringe." },
        { text: "9 mm from the centre", correct: true, feedback: "$\\beta = 3$ mm, so $3\\beta = 9$ mm." },
        { text: "3 mm from the centre", feedback: "3 mm is one fringe width, the 1st bright fringe." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-3-q4",
      variant: "concept",
      question: "In the small-angle regime, how are YDSE fringes spaced?",
      options: [
        { text: "Closer together near the centre", feedback: "The path difference $yd/D$ grows uniformly with $y$." },
        { text: "Farther apart near the centre", feedback: "All fringes have the same width $\\beta$." },
        { text: "Equally, a distance $\\beta$ apart", correct: true, feedback: "$y_n = n\\beta$ is linear in $n$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-3-q5",
      variant: "practice",
      question: "At a point $y = \\beta/4$ from the central maximum (equal slits, peak intensity $I_{\\max}$), what is the intensity?",
      options: [
        { text: "$\\frac14 I_{\\max}$", feedback: "The intensity goes as $\\cos^2$, and $\\cos^2 45^\\circ = \\frac12$." },
        { text: "$\\frac12 I_{\\max}$", correct: true, feedback: "$\\cos^2\\frac\\pi4 = \\frac12$." },
        { text: "0", feedback: "The first zero is at $\\beta/2$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-3-q6",
      variant: "practice",
      question: "Where is the 4th dark fringe, in terms of $\\beta$?",
      options: [
        { text: "$3.5\\beta$", correct: true, feedback: "Dark fringes: $0.5\\beta, 1.5\\beta, 2.5\\beta, 3.5\\beta$." },
        { text: "$4.5\\beta$", feedback: "That is the 5th. The first dark fringe is at $0.5\\beta$." },
        { text: "$4\\beta$", feedback: "$4\\beta$ is a bright fringe." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "fringe-shifts-and-thin-films",
  title: "2.4 · Fringe Shifts, Two Wavelengths and Thin Films",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Everything about Young's fringes comes from one sentence: a bright fringe sits where the optical paths from the two slits are equal (or differ by whole wavelengths). Change an optical path anywhere, by filling the apparatus with water or laying a sheet of mica over one slit, and the fringes move to keep that sentence true. The same sentence explains the colours of soap bubbles.",
    },
    {
      type: "text",
      content:
        "**Variation 1: the whole apparatus in a liquid.** In a medium of index $n$, the wavelength becomes $\\lambda/n$, so",
    },
    { type: "math", latex: "\\beta' = \\frac{(\\lambda/n)D}{d} = \\frac{\\beta}{n}" },
    {
      type: "text",
      content:
        "**Variation 2: a thin slab over one slit.** Cover $S_1$ with a sheet of thickness $t$ and index $\\mu$. Light through it covers a thickness $t$ of the sheet instead of $t$ of air, adding an optical path $(\\mu - 1)t$ to the path from $S_1$. The central bright fringe is where the **optical** path difference is zero:",
    },
    {
      type: "math",
      latex:
        "\\left(S_2P - S_1P\\right) - (\\mu - 1)t = 0 \\;\\Longrightarrow\\; \\frac{y_0d}{D} = (\\mu - 1)t \\;\\Longrightarrow\\; y_0 = \\frac{(\\mu - 1)tD}{d} = \\frac{(\\mu - 1)t}{\\lambda}\\,\\beta",
    },
    {
      type: "text",
      content:
        "The whole pattern slides by $y_0$ **towards the covered slit** (the geometric path from $S_1$ must be shorter to compensate), by $\\frac{(\\mu - 1)t}{\\lambda}$ fringes. The fringe width is unchanged, because the extra path is the same constant for every point on the screen.\n\n**Variation 3: source moved sideways.** If the source slit moves up by $s$ at distance $D'$ in front of the double slit, the central fringe moves **down** by $s\\frac{D}{D'}$ (the path difference before the slits must be cancelled after them).\n\n**Variation 4: white light.** Each colour has its own $\\beta$. At the centre, every colour has zero path difference, so the central fringe is **white**. Beside it the fringes are coloured (violet inside, red outside) and after a few orders the colours overlap into uniform white again.\n\n**Variation 5: two wavelengths.** Bright fringes of $\\lambda_1$ and $\\lambda_2$ first coincide (apart from the centre) where $n_1\\lambda_1 = n_2\\lambda_2$ with the smallest whole numbers.",
    },
    {
      type: "text",
      content:
        "Model the slab by a shift parameter $s$ in the YDSE intensity ($y$ in mm):",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "4*cos(pi*x/2)^2",
        baseLatex: "\\beta = 2\\text{ mm}",
        expr: "4*I*cos(pi*(x - s)/w)^2",
        exprLatex: "I = 4I_0\\cos^2\\frac{\\pi(y - s)}{\\beta}",
        params: [
          { name: "w", min: 0.5, max: 4, step: 0.1, initial: 2 },
          { name: "I", min: 0.5, max: 2, step: 0.1, initial: 1 },
          { name: "s", min: -3, max: 3, step: 0.1, initial: 0 },
        ],
        window: { xmin: -8, xmax: 8, ymin: 0, ymax: 9 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: changing $s$ slides the whole pattern rigidly, and the spacing between peaks stays $\\beta$ however far it moves. Set $s = \\beta$ (2 mm) and the pattern looks unchanged: a shift of a whole number of fringes is invisible unless you watch the central fringe move, which is why the white-light central fringe is used to spot it.",
    },
    {
      type: "text",
      content:
        "**Thin films.** A film of thickness $t$ and index $\\mu$ reflects light from its top and bottom surfaces, two coherent beams from one incident beam. Two facts decide the colour:\n1. The beam reflected at the bottom travels an extra optical path $2\\mu t\\cos r$ (there and back through the film; $r$ is the angle inside; $\\cos r = 1$ at normal incidence).\n2. Reflection off a **denser** medium adds a phase change of $\\pi$ (equivalent to $\\frac\\lambda2$ of path); reflection off a rarer medium adds nothing. This is the same as a wave on a string reflecting from a fixed end.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Thin film in air, reflected light",
      content:
        "Only the top reflection (air to film) gets the $\\pi$ shift. So the reflected light is\n**bright** when $2\\mu t\\cos r = \\left(m + \\tfrac12\\right)\\lambda$,\n**dark** when $2\\mu t\\cos r = m\\lambda$, $m = 0, 1, 2, \\dots$\nIf **both** reflections are off denser media (a coating on glass with $\\mu_{\\text{air}} < \\mu_{\\text{coat}} < \\mu_{\\text{glass}}$), the two $\\pi$ shifts cancel and the conditions swap: dark when $2\\mu t = (m + \\frac12)\\lambda$. The thinnest anti-reflection coating has $\\mu t = \\frac\\lambda4$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (mica sheet, JEE Main).** A mica sheet ($\\mu = 1.6$) over one slit shifts the central fringe by 5 fringes; $\\lambda = 600$ nm. Find $t$.\n\n1. Fringes shifted: $N = \\frac{(\\mu - 1)t}{\\lambda}$. *Why this step:* each extra wavelength of optical path moves the pattern by one fringe.\n2. $t = \\frac{N\\lambda}{\\mu - 1} = \\frac{5 \\times 600\\times10^{-9}}{0.6} = 5\\times10^{-6}$ m $= 5$ μm.\n3. The fringe width is untouched; the pattern moves towards the covered slit.\n\n**Worked example 2 (immersion).** A YDSE gives $\\beta = 1.2$ mm in air. In water ($n = \\frac43$): $\\beta' = \\frac{1.2}{4/3} = 0.9$ mm.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (two wavelengths).** Light of 500 nm and 600 nm is used together; $D = 1$ m, $d = 1$ mm. Where do bright fringes first coincide beyond the centre?\n\n1. Need $n_1(500) = n_2(600)$ with the smallest integers: $6 \\times 500 = 5 \\times 600 = 3000$ nm. *Why this step:* this is the least common multiple of the two wavelengths.\n2. $y = \\frac{3000\\times10^{-9} \\times 1}{10^{-3}} = 3\\times10^{-3}$ m $= 3$ mm: the 6th bright fringe of 500 nm on the 5th of 600 nm.\n\n**Worked example 4 (anti-reflection coating).** Find the minimum thickness of a magnesium fluoride coating ($\\mu = 1.38$) on glass ($\\mu = 1.5$) that cancels reflection of 550 nm.\n\n1. Both reflections are off denser media, so both get $\\pi$; they cancel each other's shift. *Why this step:* the $\\pi$ shifts must be counted before choosing the bright or dark condition.\n2. Destructive: $2\\mu t = \\frac\\lambda2$, so $t = \\frac{\\lambda}{4\\mu} = \\frac{550}{4 \\times 1.38} = \\frac{550}{5.52} \\approx 100$ nm.\n\n**Worked example 5 (a soap film).** A soap film ($\\mu = \\frac43$) in air looks bright red (640 nm) in reflection at normal incidence. What is its minimum thickness?\n\n1. Film in air: one $\\pi$ shift, so bright needs $2\\mu t = \\frac\\lambda2$ (with $m = 0$).\n2. $t = \\frac{\\lambda}{4\\mu} = \\frac{640}{16/3} = 120$ nm.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a slab over one slit changes the fringe width\"",
      content:
        "The slab adds the same extra optical path $(\\mu - 1)t$ to every point on the screen, so it shifts the whole pattern without stretching it. $\\beta = \\frac{\\lambda D}{d}$ contains nothing about the slab. Only immersing the **whole** apparatus changes $\\beta$ (to $\\beta/n$).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the thinnest part of a soap film looks bright\"",
      content:
        "As $t \\to 0$ the path difference vanishes, but the $\\pi$ shift at the top surface remains, so the two reflected beams cancel: the thinnest part looks **black**. You can see this at the top of a vertical soap film just before it bursts.",
    },
    {
      type: "quiz",
      id: "omp2-4-q1",
      variant: "practice",
      question: "A YDSE has $\\beta = 1.2$ mm in air. What is $\\beta$ when the whole apparatus is immersed in water ($n = \\frac43$)?",
      options: [
        { text: "1.6 mm", feedback: "The wavelength shrinks in water, so the fringes shrink." },
        { text: "0.9 mm", correct: true, feedback: "$\\beta' = \\beta/n$, because $\\lambda \\to \\lambda/n$." },
        { text: "1.2 mm", feedback: "Immersing the whole apparatus does change $\\lambda$, and so $\\beta$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-4-q2",
      variant: "practice",
      question: "A glass sheet ($\\mu = 1.5$, $t = 6$ μm) covers one slit; $\\lambda = 600$ nm. By how many fringes does the pattern shift?",
      options: [
        { text: "15", feedback: "That uses $\\mu t$. The extra path is $(\\mu - 1)t$: the sheet replaces air." },
        { text: "10", feedback: "That is $t/\\lambda$, as if $\\mu - 1 = 1$." },
        { text: "5", correct: true, feedback: "$\\frac{0.5 \\times 6\\times10^{-6}}{600\\times10^{-9}} = 5$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-4-q3",
      variant: "concept",
      question: "A thin transparent sheet is placed over one slit of a YDSE. What happens?",
      options: [
        { text: "The pattern shifts towards the covered slit; the fringe width is unchanged.", correct: true, feedback: "A constant extra path shifts but does not stretch." },
        { text: "The fringe width increases.", feedback: "The extra path is the same at every point, so the spacing is unchanged." },
        { text: "The pattern shifts away from the covered slit.", feedback: "The geometric path from the covered slit must be shorter to compensate, so the centre moves towards it." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-4-q4",
      variant: "practice",
      question: "Light of 450 nm and 600 nm is used together in a YDSE. Which bright fringes coincide first (apart from the centre)?",
      options: [
        { text: "3rd of 450 nm with 4th of 600 nm", feedback: "The shorter wavelength needs the higher order to reach the same path difference." },
        { text: "They never coincide.", feedback: "They coincide wherever $n_1\\lambda_1 = n_2\\lambda_2$; the first is at 1800 nm." },
        { text: "4th of 450 nm with 3rd of 600 nm", correct: true, feedback: "$4 \\times 450 = 3 \\times 600 = 1800$ nm." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-4-q5",
      variant: "practice",
      question: "A coating of index 1.25 on glass of index 1.5 is to cancel reflection of 500 nm light. What is the minimum thickness?",
      options: [
        { text: "200 nm", feedback: "That is $\\frac{\\lambda}{2\\mu}$, which gives constructive interference here." },
        { text: "125 nm", feedback: "That is $\\frac\\lambda4$ without dividing by $\\mu$." },
        { text: "100 nm", correct: true, feedback: "Both reflections get $\\pi$; destructive needs $\\mu t = \\frac\\lambda4$: $t = \\frac{500}{5}$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-4-q6",
      variant: "concept",
      question: "Why does the thinnest part of a soap film in air look dark in reflected light?",
      options: [
        { text: "A very thin film absorbs all the light.", feedback: "Soap films hardly absorb; the darkness is interference." },
        { text: "The top reflection has a $\\pi$ phase shift and the bottom one does not, so at zero thickness they cancel.", correct: true, feedback: "The path difference vanishes but the $\\pi$ shift remains." },
        { text: "No light reflects from a very thin film.", feedback: "Both surfaces still reflect; the two beams cancel." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "single-slit-diffraction",
  title: "2.5 · Single-Slit Diffraction",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "You can hear someone talking in the next room through an open door, even if you cannot see them. Sound, with wavelengths around a metre, bends round the edges of a doorway; light, with wavelengths below a micrometre, hardly does. Make the opening small enough, a fraction of a millimetre, and light bends too, spreading into a bright central band with fainter bands on either side. That is **diffraction**, and it is interference again, this time among the wavelets from different parts of one opening.",
    },
    {
      type: "text",
      content:
        "**Set-up.** A plane wave falls normally on a slit of width $a$. Look at the light leaving at angle $\\theta$ to the axis, collected on a distant screen (or by a lens). Every point across the slit is a Huygens source, all in phase at the slit. At $\\theta = 0$ all their paths to the screen are equal: the **central maximum**.",
    },
    {
      type: "text",
      content:
        "**Derivation of the first minimum: pair up the halves.** Split the slit into a top half and a bottom half. Pair each point in the top half with the point exactly $\\frac a2$ below it. In direction $\\theta$, their path difference is $\\frac a2\\sin\\theta$. If that equals $\\frac\\lambda2$, every pair cancels, and the whole slit gives darkness:",
    },
    { type: "math", latex: "\\frac a2\\sin\\theta = \\frac\\lambda2 \\quad\\Longrightarrow\\quad a\\sin\\theta = \\lambda" },
    {
      type: "text",
      content:
        "Split the slit into 4, 6, ... equal strips instead and pair neighbours in the same way: darkness whenever $a\\sin\\theta = 2\\lambda, 3\\lambda, \\dots$. Between the minima are weaker **secondary maxima**, near $a\\sin\\theta \\approx (m + \\tfrac12)\\lambda$, where one strip is left unpaired; their intensities fall quickly (about 4.7%, then 1.7% of the central peak).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Single-slit pattern",
      content:
        "**Minima:** $a\\sin\\theta = m\\lambda$, $m = \\pm1, \\pm2, \\dots$ (never $m = 0$: that is the central maximum).\n**Central maximum:** between the first minima on either side, angular width $\\dfrac{2\\lambda}{a}$, linear width on a screen at distance $D$: $\\dfrac{2\\lambda D}{a}$.\n**Other maxima:** each half as wide ($\\frac{\\lambda D}{a}$), and much fainter.\nIntensity: $I = I_0\\left(\\dfrac{\\sin\\beta}{\\beta}\\right)^2$ with $\\beta = \\dfrac{\\pi a\\sin\\theta}{\\lambda}$.",
    },
    {
      type: "text",
      content:
        "Explore the pattern with $y$ in mm. The slider $a$ scales the slit width relative to the base curve (whose first zeros are at $\\pm3$ mm).",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "(sin(pi*x/3 + 0.000001)/(pi*x/3 + 0.000001))^2",
        baseLatex: "a = a_0",
        expr: "(sin(pi*x*a/3 + 0.000001)/(pi*x*a/3 + 0.000001))^2",
        exprLatex: "I = I_0\\left(\\frac{\\sin\\beta}{\\beta}\\right)^2",
        params: [{ name: "a", min: 0.3, max: 3, step: 0.1, initial: 1 }],
        window: { xmin: -10, xmax: 10, ymin: 0, ymax: 1.2 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the central peak is twice as wide as each side band, and the side bands are small. Doubling $a$ halves every width and squeezes the pattern towards the centre; making the slit narrower ($a = 0.5$) spreads the central maximum across most of the screen. Narrow slit, wide pattern.",
    },
    {
      type: "table",
      headers: ["", "Double-slit interference", "Single-slit diffraction"],
      rows: [
        ["Cause", "two coherent slits", "wavelets from across one slit"],
        ["Central fringe", "bright, same width as the rest", "bright, **twice** the width of the others"],
        ["Other fringes", "equal width $\\frac{\\lambda D}{d}$", "width $\\frac{\\lambda D}{a}$"],
        ["Brightness", "all bright fringes equal", "falls off rapidly away from the centre"],
        ["Condition", "bright at $d\\sin\\theta = n\\lambda$", "**dark** at $a\\sin\\theta = m\\lambda$"],
      ],
    },
    {
      type: "text",
      content:
        "**When is ray optics good enough?** A beam through an aperture of width $a$ spreads by an angle of about $\\frac\\lambda a$. After travelling a distance $z$ it has spread by about $\\frac{z\\lambda}{a}$, which matches the aperture itself when $z = \\frac{a^2}{\\lambda}$: the **Fresnel distance** $z_F$. For $z \\ll z_F$ the beam keeps its shape and rays work; beyond it, diffraction dominates.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (central maximum, JEE Main).** Slit width 0.2 mm, $\\lambda = 600$ nm, screen 1 m away.\n\n1. Linear width $= \\frac{2\\lambda D}{a} = \\frac{2 \\times 600\\times10^{-9} \\times 1}{0.2\\times10^{-3}} = 6\\times10^{-3}$ m $= 6$ mm. *Why this step:* the central maximum runs from the first minimum on one side to the first minimum on the other, hence the factor 2.\n2. Each secondary maximum is 3 mm wide.\n\n**Worked example 2 (a very narrow slit).** For what slit width does the first minimum of 600 nm light fall at $30^\\circ$?\n\n1. $a\\sin 30^\\circ = \\lambda$, so $a = 2\\lambda = 1.2$ μm.\n2. At $a = \\lambda$ the first minimum would be at $90^\\circ$: the central maximum fills the whole half-space and there are no dark bands at all.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (Young's fringes inside a diffraction envelope, JEE Advanced).** Two slits each of width $a = 0.2$ mm are $d = 1$ mm apart. How many bright interference fringes lie inside the central diffraction maximum?\n\n1. The envelope's first zeros are at $\\sin\\theta = \\pm\\frac\\lambda a$. *Why this step:* each slit's diffraction pattern multiplies the two-slit fringes, so the envelope decides which fringes are visible.\n2. Interference maxima are at $\\sin\\theta = \\frac{n\\lambda}{d}$. They lie inside the envelope when $|n| < \\frac da = 5$.\n3. The $n = \\pm5$ fringes fall exactly on the envelope's zeros and vanish, so $n = -4, \\dots, 4$ survive: $2\\cdot\\frac da - 1 = 9$ fringes.\n\n**Worked example 4 (Fresnel distance).** An aperture of 3 mm with 500 nm light: $z_F = \\frac{(3\\times10^{-3})^2}{5\\times10^{-7}} = 18$ m. A torch beam through such a hole behaves like a ray for a few metres, not for a kilometre.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the central maximum is the same width as the others\"",
      content:
        "It is **twice** as wide, because it runs from $m = -1$ to $m = +1$ with no minimum at $m = 0$. In double-slit interference all fringes are equal; in single-slit diffraction they are not.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a narrower slit gives a narrower pattern\"",
      content:
        "The widths go as $\\frac{\\lambda}{a}$: squeeze the slit and the light spreads **more**. This inverse relation is why tiny apertures blur images, and why a large telescope mirror sees finer detail (2.6).",
    },
    {
      type: "quiz",
      id: "omp2-5-q1",
      variant: "practice",
      question: "A slit 0.1 mm wide is lit by 500 nm light. What is the width of the central maximum on a screen 2 m away?",
      options: [
        { text: "20 mm", correct: true, feedback: "$\\frac{2 \\times 500\\times10^{-9} \\times 2}{10^{-4}} = 0.02$ m." },
        { text: "10 mm", feedback: "That is $\\frac{\\lambda D}{a}$, the half-width. The central maximum spans both sides." },
        { text: "2 mm", feedback: "Check the powers of ten: $\\frac{2\\times10^{-6}}{10^{-4}} = 0.02$ m." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-5-q2",
      variant: "concept",
      question: "The slit width in a single-slit experiment is halved. What happens to the central maximum?",
      options: [
        { text: "It becomes half as wide.", feedback: "Narrower slits spread light more." },
        { text: "It stays the same width but dimmer.", feedback: "It does get dimmer, but its width depends on $a$ too." },
        { text: "It becomes twice as wide.", correct: true, feedback: "Width $\\propto \\frac1a$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-5-q3",
      variant: "practice",
      question: "For 500 nm light, what slit width puts the first minimum at $30^\\circ$?",
      options: [
        { text: "250 nm", feedback: "That is $\\lambda\\sin 30^\\circ$. Solve $a\\sin\\theta = \\lambda$ for $a$." },
        { text: "1 μm", correct: true, feedback: "$a = \\frac{\\lambda}{\\sin 30^\\circ} = 2\\lambda$." },
        { text: "500 nm", feedback: "With $a = \\lambda$ the first minimum is at $90^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-5-q4",
      variant: "concept",
      question: "How does the central maximum of a single-slit pattern compare with the secondary maxima?",
      options: [
        { text: "Same width, brighter", feedback: "Equal widths are a feature of double-slit fringes." },
        { text: "Half as wide and brighter", feedback: "It is the widest band, not the narrowest." },
        { text: "Twice as wide and far brighter", correct: true, feedback: "It spans from $m = -1$ to $m = 1$ and holds most of the light." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-5-q5",
      variant: "practice",
      question: "In a double-slit set-up, each slit is 0.2 mm wide and the slits are 0.6 mm apart. How many bright fringes lie within the central diffraction maximum?",
      options: [
        { text: "6", feedback: "Count $n = -2, -1, 0, 1, 2$: the $\\pm3$ fringes are missing." },
        { text: "7", feedback: "The $n = \\pm3$ fringes coincide with the envelope's zeros, so they vanish." },
        { text: "3", feedback: "That is $d/a$, not the count of fringes on both sides." },
        { text: "5", correct: true, feedback: "$\\frac da = 3$; the $n = \\pm3$ fringes fall on diffraction zeros, leaving $n = -2, \\dots, 2$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-5-q6",
      variant: "practice",
      question: "What is the Fresnel distance for a 2 mm aperture and 500 nm light?",
      options: [
        { text: "8 m", correct: true, feedback: "$\\frac{(2\\times10^{-3})^2}{5\\times10^{-7}} = 8$ m." },
        { text: "0.8 m", feedback: "Check the powers of ten: $(2\\times10^{-3})^2 = 4\\times10^{-6}$, and $\\frac{4\\times10^{-6}}{5\\times10^{-7}} = 8$." },
        { text: "4000 m", feedback: "That is $\\frac{a}{\\lambda}$, dimensionless. The Fresnel distance is $\\frac{a^2}{\\lambda}$." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "resolving-power",
  title: "2.6 · Diffraction Limits: Resolving Power",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Look at a car's headlights from far down a straight road at night: they merge into one light. As the car approaches, the blob splits into two. Your eye's lens is not flawed; every lens and mirror is an aperture, and every aperture diffracts. A point of light becomes a small blurred disc, and two discs that overlap too much look like one.",
    },
    {
      type: "text",
      content:
        "**The diffraction image of a point.** A circular aperture of diameter $D$ turns a point source into a bright central disc (the **Airy disc**) surrounded by faint rings. Its first dark ring is at angle",
    },
    { type: "math", latex: "\\theta \\approx \\frac{1.22\\,\\lambda}{D}" },
    {
      type: "text",
      content:
        "This is the slit result $\\frac\\lambda a$ with an extra factor 1.22 that comes from the circular shape (quoted, not derived, at this level).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Rayleigh criterion",
      content:
        "Two point sources are **just resolved** when the central maximum of one falls on the first minimum of the other. For a circular aperture of diameter $D$ the smallest resolvable angular separation is\n$\\Delta\\theta_{\\min} = \\dfrac{1.22\\lambda}{D}$.\n**Resolving power** $= \\dfrac{1}{\\Delta\\theta_{\\min}}$: a telescope's is $\\dfrac{D}{1.22\\lambda}$. A microscope's (NCERT form) is $\\dfrac{2n\\sin\\beta}{1.22\\lambda}$, with $n\\sin\\beta$ the numerical aperture of the objective ($n$ is the index between object and objective, $\\beta$ the half-angle of the cone of light it accepts).",
    },
    {
      type: "text",
      content:
        "See the criterion with two one-dimensional diffraction peaks. The base curve is one source; $d$ is the separation in units of the angle to the first minimum.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "(sin(pi*x + 0.000001)/(pi*x + 0.000001))^2",
        baseLatex: "\\text{one source}",
        expr: "(sin(pi*x + 0.000001)/(pi*x + 0.000001))^2 + (sin(pi*(x - d) + 0.000001)/(pi*(x - d) + 0.000001))^2",
        exprLatex: "I = I_1(\\theta) + I_2(\\theta - \\Delta\\theta)",
        params: [{ name: "d", min: 0, max: 3, step: 0.05, initial: 1 }],
        window: { xmin: -3, xmax: 5, ymin: 0, ymax: 2.2 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $d = 1$ (Rayleigh's limit) the combined curve has two peaks with a clear dip to about 80% between them: just resolved. Slide $d$ below about 0.8 and the dip disappears into a single broad hump: unresolved, however much you magnify it. At $d = 2$ or more the two peaks are obviously separate. Note that the sources are incoherent, so their **intensities** add.",
    },
    {
      type: "text",
      content:
        "**How to see finer detail.** $\\Delta\\theta_{\\min} = \\frac{1.22\\lambda}{D}$ gives two knobs:\n- **Bigger aperture $D$:** the reason research telescopes have mirrors many metres across.\n- **Shorter wavelength $\\lambda$:** blue or ultraviolet light in microscopes, and above all **electrons**, whose de Broglie wavelength (Chapter 3) can be a thousand times shorter than visible light. Oil immersion ($n \\approx 1.5$) also helps a microscope by raising $n\\sin\\beta$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a telescope).** Find the smallest angular separation a telescope with a 1 m objective can resolve at 500 nm.\n\n1. $\\Delta\\theta = \\frac{1.22 \\times 500\\times10^{-9}}{1} = 6.1\\times10^{-7}$ rad.\n2. That is about $3.5\\times10^{-5}$ degrees, or 0.13 arc-seconds (ignoring the blurring by the atmosphere). *Why this step:* the number is only a limit; turbulence usually blurs more, which is why telescopes go to mountain tops and into space.\n\n**Worked example 2 (headlights, JEE Main).** Headlights 1.2 m apart; the pupil is 2 mm across; take $\\lambda = 500$ nm. From how far can the eye just resolve them?\n\n1. $\\Delta\\theta = \\frac{1.22 \\times 5\\times10^{-7}}{2\\times10^{-3}} = 3.05\\times10^{-4}$ rad.\n2. The lamps subtend $\\frac{1.2}{L}$ at distance $L$; set equal: $L = \\frac{1.2}{3.05\\times10^{-4}} \\approx 3.9\\times10^3$ m. *Why this step:* at larger distances the angle between the lamps falls below the limit, and the two discs merge.\n3. About 4 km. In practice the eye's retina and aberrations make it somewhat worse.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a microscope).** An oil-immersion objective has $n = 1.5$ and $\\sin\\beta = 0.9$, with $\\lambda = 550$ nm.\n\n1. Smallest resolvable separation $d_{\\min} = \\frac{1.22\\lambda}{2n\\sin\\beta} = \\frac{1.22 \\times 550\\times10^{-9}}{2 \\times 1.5 \\times 0.9} = \\frac{6.71\\times10^{-7}}{2.7}$.\n2. $d_{\\min} \\approx 2.5\\times10^{-7}$ m $= 0.25$ μm: about half a wavelength. Bacteria are visible; viruses (0.02 to 0.3 μm) mostly are not. *Why this step:* the resolving power sets a floor on detail that no eyepiece can lower.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"more magnification always shows more detail\"",
      content:
        "Magnifying an image beyond the diffraction limit just enlarges the blur (\"empty magnification\"). The finest detail is set by the aperture and the wavelength, $\\frac{1.22\\lambda}{D}$, not by the eyepiece.",
    },
    {
      type: "quiz",
      id: "omp2-6-q1",
      variant: "practice",
      question: "What is the minimum resolvable angle for a telescope of aperture 0.5 m at 600 nm?",
      options: [
        { text: "$1.2\\times10^{-6}$ rad", feedback: "That drops the factor 1.22 for a circular aperture." },
        { text: "$1.5\\times10^{-6}$ rad", correct: true, feedback: "$\\frac{1.22 \\times 6\\times10^{-7}}{0.5} \\approx 1.46\\times10^{-6}$ rad." },
        { text: "$3.7\\times10^{-7}$ rad", feedback: "You multiplied by $D$ instead of dividing." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-6-q2",
      variant: "concept",
      question: "A student uses a stronger eyepiece on a small telescope hoping to split a close double star. Why may this fail?",
      options: [
        { text: "A stronger eyepiece reduces the light-gathering area.", feedback: "Light gathering depends on the objective's aperture." },
        { text: "Stars are too far away to be magnified.", feedback: "Distance is not the problem; the angular separation versus $1.22\\lambda/D$ is." },
        { text: "The detail is limited by the objective's diffraction, $1.22\\lambda/D$; more magnification only enlarges the blur.", correct: true, feedback: "Resolution comes from the aperture, not the eyepiece." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-6-q3",
      variant: "concept",
      question: "Which change increases a telescope's resolving power?",
      options: [
        { text: "A larger objective, or observing at shorter wavelength", correct: true, feedback: "Resolving power $\\propto \\frac{D}{\\lambda}$." },
        { text: "A longer focal length eyepiece", feedback: "The eyepiece changes magnification, not resolution." },
        { text: "Observing at longer wavelength", feedback: "Longer $\\lambda$ widens the diffraction discs." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-6-q4",
      variant: "practice",
      question: "The eye's pupil is 3 mm across and $\\lambda = 500$ nm. Up to what distance can two dots 1 mm apart just be resolved?",
      options: [
        { text: "about 50 m", feedback: "Recheck the angle: $\\approx 2\\times10^{-4}$ rad, and $\\frac{10^{-3}}{2\\times10^{-4}} = 5$." },
        { text: "about 0.5 m", feedback: "Two dots 1 mm apart are easy to separate at arm's length; the limit is farther." },
        { text: "about 5 m", correct: true, feedback: "$\\Delta\\theta = \\frac{1.22 \\times 5\\times10^{-7}}{3\\times10^{-3}} \\approx 2.0\\times10^{-4}$ rad; $L = \\frac{10^{-3}}{2.0\\times10^{-4}} \\approx 4.9$ m." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-6-q5",
      variant: "concept",
      question: "Why can an electron microscope resolve far finer detail than an optical one?",
      options: [
        { text: "Electrons are charged, so they are focused more sharply by glass.", feedback: "Electron lenses are magnetic, and the gain comes from the wavelength." },
        { text: "Electron microscopes have much bigger lenses.", feedback: "Their apertures are small; the wavelength does the work." },
        { text: "Fast electrons have a much shorter wavelength than visible light.", correct: true, feedback: "Resolution scales with $\\lambda$; Chapter 3 gives the electron's $\\lambda = h/p$." },
      ],
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "polarisation",
  title: "2.7 · Polarisation",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Put on polaroid sunglasses and look at the glare off a lake: it almost vanishes. Tilt your head and it comes back. Reflected light has a preferred direction of vibration and the glasses block it. That can only happen if light is a **transverse** wave: interference and diffraction work for any wave, but only a transverse wave can have a direction of vibration to filter.",
    },
    {
      type: "text",
      content:
        "**Transverse waves and planes of vibration.** In light, the electric field $\\vec E$ oscillates perpendicular to the direction of travel. In **unpolarised** light (sunlight, a bulb) the direction of $\\vec E$ changes randomly from moment to moment, spread evenly over all directions in the plane perpendicular to the ray. In **plane-polarised** light $\\vec E$ oscillates along one fixed line.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Polaroid",
      content:
        "A polaroid transmits only the component of $\\vec E$ along its **pass axis** and absorbs the perpendicular component.\n- Unpolarised light of intensity $I_0$ through one polaroid: $\\frac{I_0}{2}$, plane-polarised along the pass axis. (Half, because the average of $\\cos^2$ over all directions is $\\frac12$.)\n- A second polaroid (the **analyser**) at angle $\\theta$ to the first then obeys Malus' law.",
    },
    {
      type: "text",
      content:
        "**Derivation: Malus' law.** Plane-polarised light with field amplitude $E_0$ meets an analyser whose axis is at $\\theta$ to $\\vec E$. Only the component along the axis gets through: $E = E_0\\cos\\theta$. Intensity goes as amplitude squared:",
    },
    { type: "math", latex: "I = I_0\\cos^2\\theta" },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "cos(x*pi/18)^2",
        exprLatex: "\\frac{I}{I_0} = \\cos^2\\theta\\ (x = \\theta/10^\\circ)",
        window: { xmin: 0, xmax: 18, ymin: 0, ymax: 1.2 },
        initial: 3,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $x = 3$ ($30^\\circ$) three-quarters of the light gets through; at $x = 4.5$ ($45^\\circ$) half; at $x = 9$ ($90^\\circ$, crossed polaroids) none; and by $180^\\circ$ it is back to full. Rotating the analyser once through $360^\\circ$ gives two maxima and two zeros.",
    },
    {
      type: "text",
      content:
        "**Polarisation by reflection: Brewster's law.** Light reflected from glass or water is partly polarised, with $\\vec E$ mostly parallel to the surface. At one angle of incidence, the **Brewster angle** $\\theta_B$, it is **completely** polarised. This happens when the reflected and refracted rays are perpendicular: the electrons in the surface, driven by the refracted wave, would have to radiate along their own direction of oscillation to feed a reflected wave with $\\vec E$ in the plane of incidence, and oscillating charges do not radiate along their line of motion. So:",
    },
    {
      type: "math",
      latex:
        "\\theta_B + r = 90^\\circ,\\quad \\sin\\theta_B = n\\sin r = n\\cos\\theta_B \\;\\Longrightarrow\\; \\tan\\theta_B = n",
    },
    {
      type: "text",
      content:
        "**Polarisation by scattering.** Sunlight scattered by air through $90^\\circ$ is strongly polarised: the air molecules' electrons oscillate across the sunbeam, and seen from the side only one of those directions is visible. Look at the sky at right angles to the Sun through a polaroid and rotate it: the sky darkens and brightens.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a stack of polaroids).** Unpolarised light of intensity $I_0$ passes through polaroid $P_1$, then $P_2$. Find the output for $P_2$ at $0^\\circ$, $30^\\circ$ and $90^\\circ$ to $P_1$.\n\n1. After $P_1$: $\\frac{I_0}{2}$, whatever the orientation. *Why this step:* unpolarised light has no preferred direction, so the first polaroid always halves it.\n2. $P_2$ at $0^\\circ$: $\\frac{I_0}{2}$. At $30^\\circ$: $\\frac{I_0}{2}\\cos^2 30^\\circ = \\frac{I_0}{2}\\cdot\\frac34 = \\frac{3I_0}{8}$. At $90^\\circ$: 0.\n\n**Worked example 2 (three polaroids, JEE Main).** $P_1$ and $P_3$ are crossed. $P_2$ is inserted between them at $45^\\circ$ to $P_1$.\n\n1. After $P_1$: $\\frac{I_0}{2}$.\n2. After $P_2$: $\\frac{I_0}{2}\\cos^2 45^\\circ = \\frac{I_0}{4}$.\n3. After $P_3$ (at $45^\\circ$ to $P_2$): $\\frac{I_0}{4}\\cdot\\frac12 = \\frac{I_0}{8}$. *Why this step:* each polaroid resets the direction of polarisation, so the middle one lets light through two crossed polaroids that alone would pass nothing.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (Brewster angle).** For glass of $n = \\sqrt3$:\n\n1. $\\tan\\theta_B = \\sqrt3$, so $\\theta_B = 60^\\circ$.\n2. The refracted ray is at $r = 90^\\circ - 60^\\circ = 30^\\circ$. Check with Snell: $\\sin 60^\\circ = \\sqrt3\\sin 30^\\circ$, i.e. $0.866 = 0.866$. ✓\n3. For water ($n = \\frac43$): $\\theta_B = \\tan^{-1}\\frac43 \\approx 53^\\circ$. Glare off a lake is strongest in polarisation when the Sun is about $37^\\circ$ above the horizon.\n\n**Worked example 4 (rotating analyser).** An analyser is rotated slowly in a beam. If the intensity (a) stays constant, the beam is unpolarised; (b) drops to zero twice per turn, it is plane-polarised; (c) varies between a maximum and a non-zero minimum, it is partly polarised.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"sound waves can be polarised\"",
      content:
        "Sound in air is **longitudinal**: the air vibrates along the direction of travel. There is no transverse direction to select, so a sound wave cannot be polarised. Polarisation is the experimental proof that light is transverse.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"unpolarised light through a polaroid loses nothing when aligned\"",
      content:
        "Unpolarised light has no direction to align with. A single ideal polaroid always transmits exactly half, $\\frac{I_0}{2}$. Malus' law $I_0\\cos^2\\theta$ applies only to light that is already plane-polarised.",
    },
    {
      type: "quiz",
      id: "omp2-7-q1",
      variant: "practice",
      question: "Unpolarised light of intensity $I_0$ passes through two polaroids whose axes are at $60^\\circ$. What intensity emerges?",
      options: [
        { text: "$\\frac{I_0}{4}$", feedback: "That is $I_0\\cos^2 60^\\circ$; the first polaroid halves unpolarised light first." },
        { text: "$\\frac{I_0}{8}$", correct: true, feedback: "$\\frac{I_0}{2}\\cos^2 60^\\circ = \\frac{I_0}{2}\\cdot\\frac14$." },
        { text: "$\\frac{I_0}{2}$", feedback: "That is after the first polaroid only." },
        { text: "$\\frac{3I_0}{8}$", feedback: "That uses $\\cos^2 30^\\circ$. The angle between the axes is $60^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-7-q2",
      variant: "practice",
      question: "What is the Brewster angle for glass of refractive index 1.732?",
      options: [
        { text: "$60^\\circ$", correct: true, feedback: "$\\tan\\theta_B = \\sqrt3$." },
        { text: "$30^\\circ$", feedback: "$30^\\circ$ is the refraction angle at Brewster incidence." },
        { text: "$35.3^\\circ$", feedback: "That is the critical angle, $\\sin^{-1}\\frac1n$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-7-q3",
      variant: "concept",
      question: "Why can sound waves in air not be polarised?",
      options: [
        { text: "Their wavelength is too long.", feedback: "Long transverse waves (e.g. radio) can be polarised." },
        { text: "Air absorbs polarised sound.", feedback: "The reason is the longitudinal nature of sound." },
        { text: "They are longitudinal: there is no transverse vibration direction to select.", correct: true, feedback: "Polarisation needs a transverse wave." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-7-q4",
      variant: "practice",
      question: "Unpolarised light ($I_0$) passes through $P_1$, then $P_2$ at $30^\\circ$ to $P_1$, then $P_3$ at $90^\\circ$ to $P_1$. What emerges?",
      options: [
        { text: "0", feedback: "$P_1$ and $P_3$ are crossed, but $P_2$ between them rotates the polarisation." },
        { text: "$\\frac{3I_0}{32}$", correct: true, feedback: "$\\frac{I_0}{2}\\cdot\\cos^2 30^\\circ\\cdot\\cos^2 60^\\circ = \\frac{I_0}{2}\\cdot\\frac34\\cdot\\frac14$." },
        { text: "$\\frac{I_0}{8}$", feedback: "That is the $45^\\circ$ case. Here the angles are $30^\\circ$ then $60^\\circ$." },
      ],
      hint: "Use the angle between each polaroid and the one before it.",
    },
    {
      type: "quiz",
      id: "omp2-7-q5",
      variant: "concept",
      question: "At the Brewster angle, what is the angle between the reflected and refracted rays?",
      options: [
        { text: "$180^\\circ$", feedback: "That would put them back to back along one line." },
        { text: "$\\theta_B$", feedback: "The special feature is perpendicularity, which gives $\\tan\\theta_B = n$." },
        { text: "$90^\\circ$", correct: true, feedback: "$\\theta_B + r = 90^\\circ$, so the reflected and refracted rays are perpendicular." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-2-mastery",
  title: "2.8 · Chapter 2 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every result below comes from Huygens' wavelets, superposition, and the rule that path difference $\\Delta x$ means phase difference $\\frac{2\\pi}{\\lambda}\\Delta x$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in seven lines",
      content:
        "1. Huygens: $\\frac{\\sin i}{\\sin r} = \\frac{v_1}{v_2}$; frequency fixed, $\\lambda \\to \\lambda/n$; optical path $= nL$.\n2. $I = I_1 + I_2 + 2\\sqrt{I_1I_2}\\cos\\phi$, $\\phi = \\frac{2\\pi}{\\lambda}\\Delta x$; fringes need coherent sources.\n3. YDSE: $\\Delta x = \\frac{yd}{D}$, $\\beta = \\frac{\\lambda D}{d}$, $I = 4I_0\\cos^2\\frac{\\pi y}{\\beta}$.\n4. Slab over a slit: shift $\\frac{(\\mu - 1)tD}{d}$ towards it, $\\beta$ unchanged; in a liquid $\\beta/n$; coincidences $n_1\\lambda_1 = n_2\\lambda_2$.\n5. Thin films: count the $\\pi$ shifts, then compare $2\\mu t\\cos r$ with $m\\lambda$ or $(m + \\frac12)\\lambda$.\n6. Single slit: dark at $a\\sin\\theta = m\\lambda$, central width $\\frac{2\\lambda D}{a}$; Rayleigh $\\frac{1.22\\lambda}{D}$.\n7. Polaroid halves unpolarised light; Malus $I_0\\cos^2\\theta$; Brewster $\\tan\\theta_B = n$.",
    },
    {
      type: "quiz",
      id: "omp2-8-q1",
      variant: "mastery",
      question: "A plane wavefront passes from medium 1 into medium 2 with $i = 60^\\circ$ and $r = 45^\\circ$. What is $v_1/v_2$?",
      options: [
        { text: "$\\sqrt{2/3} \\approx 0.82$", feedback: "The wave bends towards the normal, so it slows down: $v_1 > v_2$." },
        { text: "$\\sqrt{3/2} \\approx 1.22$", correct: true, feedback: "$\\frac{\\sin 60^\\circ}{\\sin 45^\\circ} = \\frac{\\sqrt3/2}{\\sqrt2/2}$." },
        { text: "$\\frac43$", feedback: "That is $60/45$. Use the sines." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-8-q2",
      variant: "mastery",
      question: "Two coherent sources have intensities in the ratio 25 : 9. What is $I_{\\max}/I_{\\min}$?",
      options: [
        { text: "16", correct: true, feedback: "Amplitudes 5 : 3, so $\\left(\\frac{8}{2}\\right)^2 = 16$." },
        { text: "$\\frac{17}{8}$", feedback: "That is $\\frac{25 + 9}{25 - 9}$. Take square roots first: intensities do not add like amplitudes." },
        { text: "4", feedback: "That is $\\frac{a_1 + a_2}{a_1 - a_2}$; square it for intensities." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-8-q3",
      variant: "mastery",
      question: "In a YDSE, $\\lambda = 500$ nm, $d = 0.25$ mm, $D = 1$ m. How far is the 3rd bright fringe on one side from the 2nd dark fringe on the other side?",
      options: [
        { text: "2 mm", feedback: "They are on opposite sides of the centre: add the distances." },
        { text: "9 mm", correct: true, feedback: "$\\beta = 2$ mm; $3\\beta + 1.5\\beta = 4.5\\beta$." },
        { text: "10 mm", feedback: "The 2nd dark fringe is at $1.5\\beta$, not $2\\beta$." },
        { text: "3 mm", feedback: "That subtracts, as if both were on the same side." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-8-q4",
      variant: "mastery",
      question: "Light of 400 nm and 560 nm is used together in a YDSE with $D = 1$ m and $d = 1$ mm. Where do bright fringes of both first coincide beyond the centre?",
      options: [
        { text: "0.96 mm", feedback: "That adds the two fringe widths. Coincidence needs $n_1\\lambda_1 = n_2\\lambda_2$." },
        { text: "5.6 mm", feedback: "$14 \\times 400 = 10 \\times 560 = 5600$ nm is a coincidence, but not the first one. The smallest common multiple is 2800 nm." },
        { text: "2.8 mm", correct: true, feedback: "$7 \\times 400 = 5 \\times 560 = 2800$ nm; $y = 2800\\times10^{-9} \\times 10^3$ m." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-8-q5",
      variant: "mastery",
      question: "A soap film ($\\mu = 1.33$) in air strongly reflects green light of 532 nm at normal incidence. What is its minimum thickness?",
      options: [
        { text: "100 nm", correct: true, feedback: "One $\\pi$ shift, so bright needs $2\\mu t = \\frac\\lambda2$: $t = \\frac{532}{4 \\times 1.33}$." },
        { text: "200 nm", feedback: "$2\\mu t = \\lambda$ gives darkness here, because of the $\\pi$ shift at the top surface." },
        { text: "133 nm", feedback: "That is $\\frac\\lambda4$ without the index." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-8-q6",
      variant: "mastery",
      question: "With 500 nm light and a screen 2 m away, a single slit gives a central maximum 4 mm wide. What is the slit width?",
      options: [
        { text: "0.25 mm", feedback: "That uses $w = \\frac{\\lambda D}{a}$, the half-width." },
        { text: "1 mm", feedback: "Recheck: $2 \\times 5\\times10^{-7} \\times 2 = 2\\times10^{-6}$, divided by $4\\times10^{-3}$." },
        { text: "0.5 mm", correct: true, feedback: "$a = \\frac{2\\lambda D}{w} = \\frac{2 \\times 5\\times10^{-7} \\times 2}{4\\times10^{-3}}$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-8-q7",
      variant: "mastery",
      question: "Two slits, each 0.1 mm wide, are 0.5 mm apart. How many interference maxima appear within the central diffraction maximum?",
      options: [
        { text: "11", feedback: "The $n = \\pm5$ fringes coincide with the envelope's zeros and vanish." },
        { text: "10", feedback: "The count is symmetric about $n = 0$, so it is odd." },
        { text: "9", correct: true, feedback: "$\\frac da = 5$: $n = -4, \\dots, 4$ survive; $\\pm5$ fall on diffraction zeros." },
        { text: "5", feedback: "5 is $d/a$, the order at the envelope's edge." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-8-q8",
      variant: "mastery",
      question: "What is the smallest angular separation of two stars that a 2 m telescope can resolve at 550 nm?",
      options: [
        { text: "$2.75\\times10^{-7}$ rad", feedback: "That leaves out 1.22." },
        { text: "$3.4\\times10^{-7}$ rad", correct: true, feedback: "$\\frac{1.22 \\times 5.5\\times10^{-7}}{2}$." },
        { text: "$1.3\\times10^{-6}$ rad", feedback: "That multiplies by $D$ instead of dividing." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-8-q9",
      variant: "mastery",
      question: "Crossed polaroids $P_1$ and $P_3$ pass no light. $P_2$ is inserted between them at $45^\\circ$. Unpolarised light $I_0$ enters $P_1$. What emerges, and what happens if $P_2$ is then removed?",
      options: [
        { text: "$\\frac{I_0}{8}$; zero after removal", correct: true, feedback: "$\\frac{I_0}{2} \\to \\frac{I_0}{4} \\to \\frac{I_0}{8}$. Without $P_2$ the crossed pair blocks everything." },
        { text: "$\\frac{I_0}{4}$; zero after removal", feedback: "Two $45^\\circ$ steps each multiply by $\\frac12$, after the initial halving." },
        { text: "Zero in both cases", feedback: "The middle polaroid rotates the polarisation so some light passes." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-8-q10",
      variant: "mastery",
      question: "Unpolarised light strikes glass ($n = \\sqrt3$) and the reflected light is completely plane-polarised. What are the angles of incidence and refraction?",
      options: [
        { text: "$30^\\circ$ and $60^\\circ$", feedback: "Swapped: going into glass the ray bends towards the normal." },
        { text: "$35.3^\\circ$ and $90^\\circ$", feedback: "That is the critical angle picture, for light leaving glass." },
        { text: "$60^\\circ$ and $30^\\circ$", correct: true, feedback: "$\\tan\\theta_B = \\sqrt3$; reflected ⊥ refracted gives $r = 30^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "omp2-8-q11",
      variant: "mastery",
      question: "A YDSE has $d = 1$ mm, $D = 1$ m and $\\lambda = 600$ nm (in air). A glass sheet ($\\mu = 1.5$, $t = 12$ μm) covers one slit and the whole apparatus is immersed in water ($n = \\frac43$). How far does the central fringe shift? (JEE Advanced style.)",
      options: [
        { text: "6 mm, towards the covered slit", feedback: "That is $\\frac{(\\mu - 1)tD}{d}$ in air. In water the sheet replaces water, not air." },
        { text: "1.5 mm, towards the covered slit", correct: true, feedback: "Extra optical path $(\\mu - n_w)t = \\frac16 \\times 12 = 2$ μm. Balance with the water path $n_w\\frac{yd}{D}$: $y = \\frac{2\\times10^{-6} \\times 1}{(4/3)\\times10^{-3}} = 1.5$ mm. (That is $3.3$ fringes of the new width 0.45 mm.)" },
        { text: "2 mm, towards the covered slit", feedback: "You used $(\\mu - n_w)t$ correctly but forgot that the geometric path difference in water carries a factor $n_w$ too." },
        { text: "4.5 mm, towards the covered slit", feedback: "That uses $(\\mu - 1)$ for the sheet but $n_w$ for the paths; the sheet displaces water." },
      ],
      hint: "Write the optical path difference, including the water, and set it to zero.",
    },
    {
      type: "quiz",
      id: "omp2-8-q12",
      variant: "mastery",
      question: "A plane wave of 600 nm falls on a double slit ($d = 0.3$ mm) at a small angle $\\alpha$ with $\\sin\\alpha = 0.001$ to the normal. The screen is 1 m away. What happens to the pattern? (JEE Advanced style.)",
      options: [
        { text: "The pattern stays centred; the fringe width changes to $2\\cos\\alpha$ mm.", feedback: "The extra path $d\\sin\\alpha$ before the slits moves the zero-path point." },
        { text: "The central fringe moves 2 mm; the fringe width halves.", feedback: "The shift is $D\\sin\\alpha = 1$ mm, and a tilted beam does not change $\\lambda D/d$ at small angles." },
        { text: "The central fringe moves 1 mm (along the direction of the incoming light); the fringe width stays 2 mm.", correct: true, feedback: "Path difference before the slits $d\\sin\\alpha$ is cancelled when $d\\sin\\theta = d\\sin\\alpha$: $\\theta = \\alpha$, shift $\\approx D\\alpha = 1$ mm. $\\beta = \\frac{\\lambda D}{d} = 2$ mm, unchanged." },
      ],
    },
  ]),
};

export const ompChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
