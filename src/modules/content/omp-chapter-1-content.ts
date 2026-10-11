import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Optics and Modern Physics Chapter 1 — Lenses, Prisms and Optical Instruments.
 * A thin lens built from two refracting surfaces (lens maker and thin-lens
 * formulas), powers and combinations, the prism to minimum deviation,
 * dispersion and scattering, and the eye, the magnifier, the compound
 * microscope and the telescope built from those pieces.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "lens-makers-formula",
  title: "1.1 · Two Surfaces Make a Lens",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/omp-1-lenses-prisms-and-instruments.mp4",
      poster: "/videos/omp-1-lenses-prisms-and-instruments.jpg",
      title: "Chapter 1 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Hold a magnifying glass in sunlight above a sheet of paper. At most heights you get a fuzzy bright patch; at one particular height the patch shrinks to a dazzling dot and the paper starts to smoke. That height is the lens's focal length, and it is set entirely by two things: how curved the two faces are, and how much slower light travels in the glass than around it.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Thin lens",
      content:
        "A lens is a transparent body bounded by two refracting surfaces, at least one curved. It is **thin** when its thickness is negligible compared with the object and image distances and the radii of curvature. Then both surfaces are effectively at one point, the **optical centre** O, and all distances are measured from O. Sign convention: New Cartesian, incident light left to right.",
    },
    { type: "heading", text: "Deriving the lens maker's formula" },
    {
      type: "text",
      content:
        "**Derivation.** Put a lens of index $n_2$ in a medium of index $n_1$. Its first surface has radius $R_1$, its second $R_2$ (each signed by where its centre lies). Apply the single-surface formula from 0.7 twice.\n\n**Surface 1** (medium into lens) takes the object at $u$ and forms an intermediate image at $v_1$:",
    },
    { type: "math", latex: "\\frac{n_2}{v_1} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R_1}" },
    {
      type: "text",
      content:
        "**Surface 2** (lens back into the medium) takes that image as its object. With zero thickness it is at the same distance $v_1$ from the second surface. The light now goes from $n_2$ to $n_1$:",
    },
    { type: "math", latex: "\\frac{n_1}{v} - \\frac{n_2}{v_1} = \\frac{n_1 - n_2}{R_2}" },
    {
      type: "text",
      content:
        "Add the two equations. The intermediate image $\\frac{n_2}{v_1}$ cancels, which is the whole point:",
    },
    {
      type: "math",
      latex:
        "\\frac{n_1}{v} - \\frac{n_1}{u} = (n_2 - n_1)\\left(\\frac1{R_1} - \\frac1{R_2}\\right) \\;\\Longrightarrow\\; \\frac1v - \\frac1u = \\left(\\frac{n_2}{n_1} - 1\\right)\\left(\\frac1{R_1} - \\frac1{R_2}\\right)",
    },
    {
      type: "text",
      content:
        "For an object at infinity ($u \\to -\\infty$) the image is at the second focus, $v = f$. That gives the lens maker's formula.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Lens maker's formula",
      content:
        "$\\dfrac1f = (n - 1)\\left(\\dfrac1{R_1} - \\dfrac1{R_2}\\right)$, where $n = \\dfrac{n_{\\text{lens}}}{n_{\\text{medium}}}$ is the index **relative to the surroundings**.\n$R_1$ belongs to the surface the light meets first. Each $R$ is positive if its centre lies to the right (along the light), negative if to the left.\n$f > 0$: converging lens. $f < 0$: diverging lens.",
    },
    {
      type: "table",
      headers: ["Lens (light from the left)", "$R_1$", "$R_2$", "$\\frac1{R_1} - \\frac1{R_2}$"],
      rows: [
        ["biconvex", "$+$", "$-$", "positive: converging in air"],
        ["plano-convex (flat face second)", "$+$", "$\\infty$", "positive: converging in air"],
        ["biconcave", "$-$", "$+$", "negative: diverging in air"],
        ["concavo-convex (meniscus), both centres to the right, $|R_1| < |R_2|$", "$+$", "$+$", "positive: converging"],
      ],
    },
    { type: "heading", text: "The $n - 1$ factor and the medium" },
    {
      type: "text",
      content:
        "The factor $n - 1$ is the interesting one. Plot $\\frac1f$ against the lens index $n_{\\text{lens}}$ for an equiconvex lens with $\\frac1{R_1} - \\frac1{R_2} = 0.1$ cm$^{-1}$ (both radii 20 cm). The base curve is the lens in air; the slider sets the index of the medium around it.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "(x-1)*0.1",
        baseLatex: "\\text{in air}",
        expr: "(x/m - 1)*0.1",
        exprLatex: "\\frac1f = \\left(\\frac{n}{n_m} - 1\\right)\\left(\\frac1{R_1} - \\frac1{R_2}\\right)",
        params: [{ name: "m", min: 1, max: 1.8, step: 0.01, initial: 1.33 }],
        window: { xmin: 1, xmax: 2, ymin: -0.1, ymax: 0.1 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $n_m = 1.33$ (water), the line is much flatter and lower than in air, so $\\frac1f$ is smaller and $f$ longer. The line crosses zero exactly at $n_{\\text{lens}} = n_m$: a lens in a liquid of its own index has $\\frac1f = 0$ and vanishes (glass rods disappear in the right oil). To the left of that crossing $\\frac1f < 0$: the same convex lens now **diverges**.",
    },
    { type: "heading", text: "Worked examples: equiconvex and meniscus lenses" },
    {
      type: "worked-example",
      id: "omp1-1-we1",
      title: "Worked example 1 (equiconvex lens in air)",
      problem:
        "An equiconvex lens has $R = 20$ cm for both faces, $n = 1.5$. Find its focal length in air.",
      steps: [
        { text: "Light meets the first face; its centre is inside the lens, to the right: $R_1 = +20$ cm. The second face's centre is to the left: $R_2 = -20$ cm. *Why this step:* a biconvex lens has radii of opposite sign, and forgetting that gives $\\frac1{R_1} - \\frac1{R_2} = 0$." },
        { text: "$\\frac1f = (1.5 - 1)\\left(\\frac1{20} + \\frac1{20}\\right) = 0.5 \\times 0.1 = 0.05$ cm$^{-1}$." },
        { text: "$f = +20$ cm: converging." },
      ],
      answer: "$f = +20$ cm (converging)",
    },
    {
      type: "worked-example",
      id: "omp1-1-we2",
      title: "Worked example 2 (the same lens in water)",
      problem:
        "The same lens is placed in water, $n_w = \\frac43$. Find its focal length now.",
      steps: [
        { text: "Relative index: $n = \\frac{1.5}{4/3} = \\frac98$, so $n - 1 = \\frac18$. *Why this step:* bending at each face depends on the ratio of indices." },
        { text: "$\\frac1f = \\frac18 \\times 0.1 = \\frac1{80}$, so $f = 80$ cm: four times longer. The ratio is $\\frac{0.5}{0.125} = 4$." },
      ],
      answer: "$f = 80$ cm, four times its value in air.",
    },
    {
      type: "worked-example",
      id: "omp1-1-we3",
      title: "Worked example 3 (a meniscus)",
      problem:
        "A concavo-convex lens ($n = 1.5$) has its first face of radius 10 cm and its second of radius 20 cm, both centres on the far side (to the right). Find its focal length.",
      steps: [
        { text: "$R_1 = +10$ cm, $R_2 = +20$ cm." },
        { text: "$\\frac1f = 0.5\\left(\\frac1{10} - \\frac1{20}\\right) = 0.5 \\times 0.05 = 0.025$ cm$^{-1}$, $f = +40$ cm. The more strongly curved face wins, and it is convex, so the lens converges. Spectacle lenses are usually menisci." },
      ],
      answer: "$f = +40$ cm (converging)",
    },
    {
      type: "worked-example",
      id: "omp1-1-we4",
      title: "Worked example 4 (an air bubble)",
      problem:
        "A thin lens-shaped air bubble (biconvex, both radii 12 cm) sits in water ($n = \\frac43$). Find its focal length.",
      steps: [
        { text: "Relative index $n = \\frac{1}{4/3} = \\frac34$, so $n - 1 = -\\frac14$." },
        { text: "$\\frac1f = -\\frac14\\left(\\frac1{12} + \\frac1{12}\\right) = -\\frac1{24}$, so $f = -24$ cm: a **diverging** lens, although it is convex in shape. *Why this step:* the lens is now the rarer medium, so every bend reverses." },
      ],
      answer: "$f = -24$ cm: a diverging lens.",
    },
    {
      type: "worked-example",
      id: "omp1-1-we5",
      title: "Worked example 5 (finding a radius, CBSE)",
      problem:
        "A plano-convex lens of glass ($n = 1.5$) has $f = 40$ cm. Find the radius of the curved face.",
      steps: [
        { text: "With the flat face $R = \\infty$: $\\frac1{40} = 0.5\\cdot\\frac1R$." },
        { text: "$R = 20$ cm. It does not matter which face faces the light: $|\\frac1{R_1} - \\frac1{R_2}| = \\frac1{20}$ either way." },
      ],
      answer: "$R = 20$ cm",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a convex lens is always converging\"",
      content:
        "Only when the lens is optically denser than its surroundings. In a medium with $n_{\\text{medium}} > n_{\\text{lens}}$, the factor $n - 1$ turns negative and a convex lens diverges. An air bubble in water is a convex \"lens\" that spreads light out.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Different media on the two sides (JEE Advanced)",
      content:
        "If the light starts in $n_1$, crosses a lens of index $n_2$ and ends in $n_3$, add the two surface equations exactly as above but keep the media separate:\n$\\dfrac{n_3}{v} - \\dfrac{n_1}{u} = \\dfrac{n_2 - n_1}{R_1} + \\dfrac{n_3 - n_2}{R_2}$.\nThe lens then has two different focal lengths, one on each side. Example: an equiconvex glass lens ($n_2 = 1.5$, $|R| = 20$ cm) with air on the left and water ($\\frac43$) on the right. Parallel light from the air side: $\\frac{4/3}{v} = \\frac{0.5}{20} + \\frac{4/3 - 1.5}{-20} = \\frac{1}{40} + \\frac{1}{120} = \\frac1{30}$, so it focuses $v = 40$ cm into the water. Parallel light from the water side focuses 30 cm into the air: the two focal lengths are in the ratio of the indices of the media they lie in, $40 : 30 = \\frac43 : 1$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "omp1-1-q1",
      variant: "practice",
      question: "A biconvex lens has both radii 30 cm and $n = 1.5$. What is its focal length in air?",
      options: [
        { text: "60 cm", feedback: "You used only one surface: $0.5 \\times \\frac1{30}$. $R_2 = -30$ cm adds a second $\\frac1{30}$." },
        { text: "15 cm", feedback: "That is $\\frac{R}{2}$, the mirror rule. For a lens, $\\frac1f = (n - 1)\\left(\\frac1{R_1} - \\frac1{R_2}\\right)$." },
        { text: "Infinite", feedback: "That comes from taking $R_1 = R_2 = +30$. For a biconvex lens the radii have opposite signs." },
        { text: "30 cm", correct: true, feedback: "$\\frac1f = 0.5 \\times \\frac{2}{30} = \\frac1{30}$." },
      ],
      hint: "Use the lensmaker's equation $\\dfrac1f = (n - 1)\\left(\\dfrac1{R_1} - \\dfrac1{R_2}\\right)$, taking the signs of $R_1$ and $R_2$ from the New Cartesian convention.",
    },
    {
      type: "numeric",
      id: "omp1-1-q2",
      variant: "practice",
      question: "A glass lens ($n = 1.5$) has $f = 15$ cm in air. What is its focal length in water ($n = \\frac43$)? Give your answer in cm, with a minus sign if the lens diverges.",
      answer: 60,
      unit: "cm",
      hint: "The curvature factor is the same in both media; only $n_{\\text{rel}} - 1$ changes.",
      solution: "In water $n_{\\text{rel}} = \\dfrac{1.5}{4/3} = \\dfrac98$, so $n_{\\text{rel}} - 1 = \\dfrac18 = 0.125$ instead of $0.5$.\n\n$\\dfrac{f_w}{f_a} = \\dfrac{0.5}{0.125} = 4$, so $f_w = 4\\times15 = 60$ cm. Glass is still denser than water, so the lens still converges.",
      commonMistakes: [
        { answer: 20, feedback: "That scales $f$ by $n_w = \\frac43$. The factor is $(n - 1)$, which changes from 0.5 to 0.125." },
        { answer: 11.25, feedback: "The lens gets weaker in water, not stronger: $n - 1$ shrinks." },
        { answer: -60, feedback: "Glass is still denser than water, so the lens still converges: $f$ stays positive." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-1-q3",
      variant: "concept",
      question: "A convex-shaped air bubble is trapped inside a glass block. How does it act on light?",
      options: [
        { text: "As a converging lens", feedback: "The shape is convex, but the bubble is rarer than its surroundings, so $n - 1 < 0$." },
        { text: "As a diverging lens", correct: true, feedback: "Relative index $\\frac{1}{1.5} < 1$ flips the sign of $\\frac1f$." },
        { text: "It has no effect, because air does not bend light", feedback: "Bending happens at the glass–air boundaries, which the bubble has plenty of." },
      ],
      hint: "Apply the lensmaker's equation with the relative index $n_{\\text{air}}/n_{\\text{glass}}$. Is that index minus 1 positive or negative?",
    },
    {
      type: "quiz",
      id: "omp1-1-q4",
      variant: "practice",
      question: "A plano-convex lens ($n = 1.6$) has a curved face of radius 24 cm. What is its focal length?",
      options: [
        { text: "40 cm", correct: true, feedback: "$\\frac1f = 0.6 \\times \\frac1{24} = \\frac1{40}$." },
        { text: "20 cm", feedback: "That doubles the curvature as if both faces were curved." },
        { text: "15 cm", feedback: "That is $\\frac{R}{n}$. Use $(n - 1)$, not $n$." },
      ],
      hint: "Use the lensmaker's equation with one radius infinite.",
    },
    {
      type: "quiz",
      id: "omp1-1-q5",
      variant: "concept",
      question: "A glass lens is dipped in a liquid of exactly the same refractive index. What is its focal length?",
      options: [
        { text: "Unchanged, because the curvature has not changed.", feedback: "Curvature alone does nothing; the bending comes from the index difference." },
        { text: "Zero", feedback: "$\\frac1f = 0$ means $f$ is infinite, not zero." },
        { text: "Infinite: the lens neither converges nor diverges.", correct: true, feedback: "$n_{\\text{rel}} = 1$, so $\\frac1f = 0$. The lens becomes invisible." },
      ],
      hint: "In a liquid the lensmaker's equation uses $\\dfrac{n_{\\text{lens}}}{n_{\\text{liquid}}} - 1$. What is that here?",
    },
    {
      type: "numeric",
      id: "omp1-1-q6",
      variant: "practice",
      question: "A thin equiconvex glass lens ($n = 1.5$, both radii 20 cm) forms a window with air on the left and water ($n = \\frac43$) on the right. Parallel light arrives from the air side. How far into the water does it focus, in cm?",
      answer: 40,
      unit: "cm",
      hint: "Use $\\frac{n_3}{v} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R_1} + \\frac{n_3 - n_2}{R_2}$ with $u \\to -\\infty$.",
      solution: "With $n_1 = 1$, $n_2 = 1.5$, $n_3 = \\frac43$, $R_1 = +20$ cm, $R_2 = -20$ cm and $u \\to -\\infty$:\n\n$\\dfrac{4/3}{v} = \\dfrac{1.5 - 1}{20} + \\dfrac{4/3 - 1.5}{-20} = \\dfrac1{40} + \\dfrac1{120} = \\dfrac1{30}$, so $v = \\dfrac43\\times30 = 40$ cm.",
      commonMistakes: [
        { answer: 20, feedback: "That is the focal length with air on both sides. The water changes the second refraction." },
        { answer: 80, feedback: "That is the lens fully immersed in water. Here the first surface still has air in front of it." },
        { answer: 30, feedback: "$\\frac{n_3}{v} = \\frac1{30}$ gives $v = 30n_3 = 40$ cm; you dropped the $n_3 = \\frac43$ on the left." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "thin-lens-formula",
  title: "1.2 · The Thin Lens Formula and Images",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "The lens maker's formula already contains the image equation: in 1.1 we found $\\frac1v - \\frac1u = (n - 1)\\left(\\frac1{R_1} - \\frac1{R_2}\\right)$ for any object, and the right-hand side is just $\\frac1f$. So for every thin lens, whatever its shape,",
    },
    { type: "math", latex: "\\frac1v - \\frac1u = \\frac1f" },
    { type: "heading", text: "A second derivation, from similar triangles" },
    {
      type: "text",
      content:
        "Object AB at distance $|u|$ to the left of a converging lens, real inverted image A'B' at $v$ on the right. The ray from A through the optical centre O goes straight on (the centre of a thin lens is like a thin parallel slab), so triangles ABO and A'B'O are similar:",
    },
    { type: "math", latex: "\\frac{A'B'}{AB} = \\frac{OB'}{OB}" },
    {
      type: "text",
      content:
        "The ray from A parallel to the axis meets the lens at M ($OM = AB$) and passes through the second focus $F_2$. Triangles $MOF_2$ and $A'B'F_2$ are similar:",
    },
    { type: "math", latex: "\\frac{A'B'}{OM} = \\frac{F_2B'}{OF_2} = \\frac{OB' - OF_2}{OF_2}" },
    {
      type: "text",
      content:
        "Signs: $OB' = v$, $OB = -u$, $OF_2 = f$. Equating: $\\frac{v}{-u} = \\frac{v - f}{f}$, so $vf = -uv + uf$. Divide by $uvf$: $\\frac1u = -\\frac1f + \\frac1v$, which is the same formula. ✓",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Thin lens formula and magnification",
      content:
        "$\\dfrac1v - \\dfrac1u = \\dfrac1f$ and $m = \\dfrac{h'}{h} = \\dfrac vu$.\nConvex lens $f > 0$, concave lens $f < 0$. Real images form on the far side ($v > 0$), virtual images on the object's side ($v < 0$).\nFor a single lens, $m < 0$ means real and inverted, $m > 0$ virtual and erect.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Why a minus for lenses and a plus for mirrors?",
      content:
        "A mirror sends light back, so a real image forms on the same side as the object, where distances are negative: both $u$ and $v$ are negative and they enter as $\\frac1v + \\frac1u$. A lens lets light through, so a real image forms on the far side where $v$ is positive. The formulas differ in form because the geometry differs, not because of a different convention.",
    },
    { type: "heading", text: "Ray diagrams for convex and concave lenses" },
    {
      type: "callout",
      variant: "definition",
      title: "Principal rays for a lens",
      content:
        "1. A ray parallel to the axis passes through the focus on the far side (convex lens), or diverges as if it came from the focus on the incident side (concave lens).\n2. A ray through the first focus (convex), or heading towards the focus on the far side (concave), emerges parallel to the axis.\n3. A ray through the optical centre O goes straight on, undeviated.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "convex-lens",
        objectDistance: { min: 5, max: 60, step: 1, initial: 45 },
        focalLength: { min: 15, max: 15, step: 1, initial: 15 },
        caption:
          "f = +15 cm is locked, so 2F is at 30 cm. Drag the object in from 60 cm through 2F₁ and F₁ and build the image table yourself before reading it below.",
      },
    },
    {
      type: "table",
      headers: ["Object (convex, $f = 15$)", "Image", "Nature", "Size"],
      rows: [
        ["beyond $2F_1$ ($|u| > 30$)", "between $F_2$ and $2F_2$", "real, inverted", "diminished"],
        ["at $2F_1$", "at $2F_2$", "real, inverted", "same size"],
        ["between $2F_1$ and $F_1$", "beyond $2F_2$", "real, inverted", "magnified"],
        ["at $F_1$", "at infinity", "(parallel rays)", "—"],
        ["inside $F_1$", "same side as object", "virtual, erect", "magnified"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "concave-lens",
        objectDistance: { min: 5, max: 60, step: 1, initial: 30 },
        focalLength: { min: 15, max: 15, step: 1, initial: 15 },
        caption:
          "Concave lens, f = −15 cm. Wherever the object is, the image stays virtual, erect and smaller, between the lens and F₁ on the object's side.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the convex lens behaves like the concave mirror of 0.3 turned inside out (real images now form on the far side), and the object-to-image distance is smallest when the object sits at $2F_1$. The concave lens, like the convex mirror, can only make small upright virtual images.",
    },
    { type: "heading", text: "Finding $f$ by the displacement method" },
    {
      type: "text",
      content:
        "**Displacement method (lab favourite).** Fix an object and a screen a distance $D$ apart and slide a convex lens between them. With the lens at distance $a$ from the object and $b = D - a$ from the screen, a sharp image needs $\\frac1b + \\frac1a = \\frac1f$ (magnitudes), i.e. $ab = fD$. So $a$ and $b$ are the roots of $t^2 - Dt + fD = 0$:",
    },
    {
      type: "math",
      latex:
        "t = \\frac{D \\pm \\sqrt{D^2 - 4fD}}{2} \\quad\\Rightarrow\\quad \\text{real roots need } D \\ge 4f,\\quad x = |a - b| = \\sqrt{D^2 - 4fD}",
    },
    {
      type: "text",
      content:
        "Solving for $f$: $f = \\dfrac{D^2 - x^2}{4D}$, where $x$ is the distance between the two lens positions. The two positions are mirror images of each other ($a \\leftrightarrow b$, reversibility of light), so the magnifications are $\\frac ba$ and $\\frac ab$; their product is 1, and the object height is $h = \\sqrt{h_1h_2}$. The smallest object–screen distance that gives a real image is $D = 4f$, with the object at $2F_1$.",
    },
    { type: "heading", text: "Worked examples: virtual images and displacement" },
    {
      type: "worked-example",
      id: "omp1-2-we1",
      title: "Worked example 1 (convex lens, object at 10 cm)",
      problem:
        "An object is 10 cm from a convex lens of focal length 15 cm. Find the position, magnification and nature of the image.",
      steps: [
        { text: "$u = -10$ cm, $f = +15$ cm." },
        { text: "$\\frac1v = \\frac1f + \\frac1u = \\frac1{15} - \\frac1{10} = \\frac{2 - 3}{30} = -\\frac1{30}$, so $v = -30$ cm. *Why this step:* rearranging $\\frac1v - \\frac1u = \\frac1f$ gives $\\frac1v = \\frac1f + \\frac1u$, a plus sign that traps many students." },
        { text: "$m = \\frac vu = \\frac{-30}{-10} = +3$: virtual, erect, three times larger, on the object's side. That is a magnifying glass." },
      ],
      answer: "$v = -30$ cm, $m = +3$: virtual, erect, three times larger, on the object's side.",
    },
    {
      type: "worked-example",
      id: "omp1-2-we2",
      title: "Worked example 2 (convex lens, object at 30 cm)",
      problem:
        "Object 30 cm from a convex lens of $f = 20$ cm. Find the position, magnification and nature of the image.",
      steps: [
        { text: "$\\frac1v = \\frac1{20} - \\frac1{30} = \\frac1{60}$, $v = +60$ cm." },
        { text: "$m = \\frac{60}{-30} = -2$: real, inverted, double size, on the far side." },
      ],
      answer: "$v = +60$ cm, $m = -2$: real, inverted, double size, on the far side.",
    },
    {
      type: "worked-example",
      id: "omp1-2-we3",
      title: "Worked example 3 (concave lens)",
      problem:
        "Object 20 cm from a concave lens of focal length 20 cm. Find the position, magnification and nature of the image.",
      steps: [
        { text: "$f = -20$, $u = -20$. $\\frac1v = -\\frac1{20} - \\frac1{20} = -\\frac1{10}$, $v = -10$ cm." },
        { text: "$m = \\frac{-10}{-20} = +0.5$: virtual, erect, half size." },
      ],
      answer: "$v = -10$ cm, $m = +0.5$: virtual, erect, half size.",
    },
    {
      type: "worked-example",
      id: "omp1-2-we4",
      title: "Worked example 4 (displacement method, JEE Main)",
      problem:
        "Object and screen are 100 cm apart. Sharp images appear for two lens positions 20 cm apart, and the two images are 9 mm and 4 mm tall. Find the focal length of the lens and the height of the object.",
      steps: [
        { text: "$f = \\frac{D^2 - x^2}{4D} = \\frac{10000 - 400}{400} = 24$ cm." },
        { text: "Check the positions: $a, b = \\frac{100 \\pm 20}{2} = 60, 40$ cm, and $\\frac{60 \\times 40}{100} = 24$. ✓" },
        { text: "Object height $h = \\sqrt{9 \\times 4} = 6$ mm. *Why this step:* the two magnifications are reciprocals, $\\frac{60}{40}$ and $\\frac{40}{60}$, so $h_1h_2 = h^2$." },
      ],
      answer: "$f = 24$ cm, object height 6 mm.",
    },
    {
      type: "worked-example",
      id: "omp1-2-we5",
      title: "Worked example 5 (shortest throw)",
      problem:
        "What is the minimum distance between a real object and its real image for a lens of $f = 15$ cm?",
      steps: [
        { text: "$D_{\\min} = 4f = 60$ cm, with the object at $2F_1$ (30 cm) and the image at $2F_2$ (30 cm)." },
      ],
      answer: "$D_{\\min} = 60$ cm",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"covering half the lens removes half the image\"",
      content:
        "Every point of the lens receives light from every point of the object and sends it to the corresponding image point. Cover half the lens and each image point simply gets half the light: the **whole** image forms, only dimmer.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the lens formula is $\\frac1v + \\frac1u = \\frac1f$, like mirrors\"",
      content:
        "For a lens it is $\\frac1v - \\frac1u = \\frac1f$ and $m = +\\frac vu$. Using the mirror form with $u = -10$, $f = 15$ gives $v = 6$ cm, a real image, instead of the correct virtual image at $-30$ cm.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "omp1-2-q1",
      variant: "practice",
      question: "An object is 15 cm from a convex lens of focal length 10 cm. Find $v$ and $m$.",
      options: [
        { text: "$v = +6$ cm, $m = -0.4$", feedback: "You added: $\\frac1{10} + \\frac1{15}$. With $u = -15$, $\\frac1v = \\frac1f + \\frac1u = \\frac1{10} - \\frac1{15}$." },
        { text: "$v = -30$ cm, $m = +2$", feedback: "The object is beyond F, so the image is real, on the far side." },
        { text: "$v = +30$ cm, $m = -2$", correct: true, feedback: "$\\frac1v = \\frac1{10} - \\frac1{15} = \\frac1{30}$; $m = \\frac{30}{-15}$." },
        { text: "$v = +30$ cm, $m = +2$", feedback: "$m = \\frac vu$ with $u$ negative, so $m$ is negative: inverted." },
      ],
      hint: "Use $\\dfrac1v - \\dfrac1u = \\dfrac1f$ with $u = -15$ cm, then $m = v/u$.",
    },
    {
      type: "numeric",
      id: "omp1-2-q2",
      variant: "practice",
      question: "An object is 30 cm from a concave lens of focal length 15 cm. Find the image distance $v$ in cm, with its sign in the New Cartesian convention (light travels left to right, distances measured from the lens).",
      answer: -10,
      unit: "cm",
      hint: "$u = -30$ cm and $f = -15$ cm. Then $\\frac1v = \\frac1f + \\frac1u$.",
      solution: "$\\dfrac1v = \\dfrac1f + \\dfrac1u = -\\dfrac1{15} - \\dfrac1{30} = -\\dfrac{3}{30} = -\\dfrac1{10}$, so $v = -10$ cm: 10 cm from the lens on the object's side, virtual.\n\n$m = \\dfrac vu = \\dfrac{-10}{-30} = \\dfrac13$: erect and one-third size.",
      commonMistakes: [
        { answer: 10, feedback: "Right distance, wrong side. A concave lens forms a virtual image on the object's side, so $v$ is negative." },
        { answer: 30, feedback: "That would be a convex lens with the object at $2F$. A concave lens never makes real images of real objects." },
        { answer: -30, feedback: "Check the sum: $-\\frac1{15} - \\frac1{30} = -\\frac{3}{30}$." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-2-q3",
      variant: "concept",
      question: "The lower half of a convex lens forming a real image is covered with black paper. What happens to the image?",
      options: [
        { text: "The whole image still forms but is dimmer.", correct: true, feedback: "Half the light reaches each image point." },
        { text: "The upper half of the image disappears.", feedback: "Every part of the lens contributes to every image point." },
        { text: "The image moves to a new position.", feedback: "The focal length is unchanged, so $v$ is unchanged." },
      ],
      hint: "Every uncovered part of the lens still sends rays from each object point to the same image point. What does covering half of it change?",
    },
    {
      type: "numeric",
      id: "omp1-2-q4",
      variant: "practice",
      question: "Object and screen are 90 cm apart. Sharp images form for two lens positions 30 cm apart. What is $f$, in cm?",
      answer: 20,
      unit: "cm",
      hint: "Displacement method: $f = \\frac{D^2 - x^2}{4D}$.",
      solution: "$f = \\dfrac{D^2 - x^2}{4D} = \\dfrac{90^2 - 30^2}{4 \\times 90} = \\dfrac{7200}{360} = 20$ cm.\n\nCheck: the positions are $\\frac{90 \\pm 30}{2} = 60$ and $30$ cm, and $\\frac{60\\times30}{90} = 20$. ✓",
      commonMistakes: [
        { answer: 22.5, feedback: "That is $D/4$, which only holds when the two positions coincide ($x = 0$)." },
        { answer: 15, feedback: "That is $(D - x)/4 = 60/4$. The formula uses squares: $f = \\dfrac{D^2 - x^2}{4D} = \\dfrac{7200}{360}$." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-2-q5",
      variant: "concept",
      question: "Why does a lens obey $\\frac1v - \\frac1u = \\frac1f$ while a mirror obeys $\\frac1v + \\frac1u = \\frac1f$?",
      options: [
        { text: "Lenses and mirrors use different sign conventions.", feedback: "Both use the same New Cartesian convention." },
        { text: "The mirror formula is for virtual images only.", feedback: "The mirror formula handles real and virtual images alike." },
        { text: "Light passes through a lens, so its real images lie on the positive side; a mirror sends light back, so its real images lie on the negative side.", correct: true, feedback: "The geometry of where images form changes the form of the formula." },
      ],
      hint: "Write both formulas in the New Cartesian convention and ask on which side of the lens or the mirror the light ends up when the image is real.",
    },
    {
      type: "quiz",
      id: "omp1-2-q6",
      variant: "practice",
      question: "What is the minimum distance between a real object and its real image formed by a convex lens of focal length 25 cm?",
      options: [
        { text: "100 cm", correct: true, feedback: "$D_{\\min} = 4f$, object at $2F_1$, image at $2F_2$." },
        { text: "50 cm", feedback: "50 cm is $2f$, the object distance at that minimum. The image is another 50 cm beyond." },
        { text: "25 cm", feedback: "With the object at F the image is at infinity, not at 25 cm." },
      ],
      hint: "Write the separation $D = |u| + v$ for a real image, eliminate $v$ with the lens formula, and find the minimum.",
    },
    {
      type: "quiz",
      id: "omp1-2-q7",
      variant: "practice",
      multiple: true,
      question: "An object is placed 20 cm in front of a convex lens of focal length 15 cm. Select every correct statement about the image.",
      options: [
        { text: "It is real and inverted.", correct: true, feedback: "The object is beyond F: $\\frac1v = \\frac1{15} - \\frac1{20} = \\frac1{60}$, $v = +60$ cm, on the far side." },
        { text: "It is three times as tall as the object.", correct: true, feedback: "$m = \\frac vu = \\frac{60}{-20} = -3$: three times as tall, inverted." },
        { text: "It forms 60 cm from the lens on the object's side.", feedback: "$v = +60$ cm is on the far side. Only an object inside F gives an image on its own side." },
        { text: "Covering the upper half of the lens removes the lower half of the image.", feedback: "Every part of the lens sends light to every image point. The whole image still forms, only dimmer." },
      ],
      hint: "Find $v$ from $\\frac1v = \\frac1f + \\frac1u$ with $u = -20$ cm, then $m = \\frac vu$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "power-and-combinations",
  title: "1.3 · Power and Combinations of Lenses",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "An optician's prescription reads \"$-2.5$ D\", not \"focal length $-40$ cm\". Opticians work with the reciprocal of focal length, because when thin lenses are stacked together, reciprocals simply add. Camera lenses, microscope objectives and your own eye plus spectacles are all combinations.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Power of a lens",
      content:
        "$P = \\dfrac1f$ with $f$ in **metres**. Unit: dioptre (D) $= $ m$^{-1}$.\nConverging lenses have $P > 0$, diverging lenses $P < 0$. A lens of $f = +25$ cm has $P = +4$ D; $f = -40$ cm gives $P = -2.5$ D.",
    },
    { type: "heading", text: "Deriving the lenses-in-contact formula" },
    {
      type: "text",
      content:
        "Two thin lenses $f_1$ and $f_2$ touch. Lens 1 forms an image at $v_1$: $\\frac1{v_1} - \\frac1u = \\frac1{f_1}$. That image is the object for lens 2, at the same place because the separation is zero: $\\frac1v - \\frac1{v_1} = \\frac1{f_2}$. Add:",
    },
    {
      type: "math",
      latex: "\\frac1v - \\frac1u = \\frac1{f_1} + \\frac1{f_2} \\quad\\Longrightarrow\\quad \\frac1F = \\frac1{f_1} + \\frac1{f_2},\\qquad P = P_1 + P_2",
    },
    {
      type: "text",
      content:
        "Fix $f_1 = 20$ cm and vary $f_2$ to see how a second lens changes the combination.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "20*x/(20 + x)",
        exprLatex: "F = \\frac{f_1 f_2}{f_1 + f_2},\\ f_1 = 20\\text{ cm}",
        min: -55,
        max: 65,
        step: 10,
        initial: 25,
        inputLabel: "f₂",
        outputLabel: "F (cm)",
        inputUnit: "cm",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: adding a converging $f_2$ always shortens $F$ (the pair is stronger than either lens). A weak diverging lens ($f_2 = -55$ cm) lengthens $F$ to about 31 cm; as $f_2$ approaches $-20$ cm the powers nearly cancel and $F$ shoots off to large values (the grid skips $-20$, where $F$ is infinite). A strong diverging lens ($f_2 = -15$ or $-5$ cm) makes the pair diverging, $F < 0$.",
    },
    { type: "heading", text: "Separated lenses" },
    {
      type: "text",
      content:
        "If the lenses are a distance $d$ apart, the image of lens 1 is no longer at the same place for lens 2, and the combination behaves like a single lens of",
    },
    { type: "math", latex: "\\frac1F = \\frac1{f_1} + \\frac1{f_2} - \\frac{d}{f_1f_2}" },
    {
      type: "text",
      content:
        "This equivalent lens is not located at either lens, so for actual image positions the reliable method is **two steps**: find the image of lens 1, shift the origin to lens 2, and use that image as the object (a virtual object if the light reaches lens 2 before converging).",
    },
    { type: "heading", text: "The silvered lens" },
    {
      type: "text",
      content:
        "Silver the back face of a lens. Light passes through the lens, reflects off the silvered face, and passes back through the lens: three thin elements in contact. The system is a **mirror** whose power (converging counted positive) is",
    },
    { type: "math", latex: "P_{\\text{eq}} = 2P_L + P_M, \\qquad P_M = \\frac{1}{|f_{\\text{mirror}}|} \\text{ for a concave reflecting face, } 0 \\text{ for a flat one}" },
    {
      type: "text",
      content:
        "If $P_{\\text{eq}} > 0$ it behaves as a concave mirror of focal length $\\frac{1}{P_{\\text{eq}}}$ (in the New Cartesian convention that focal length is negative).\n\n**Cutting a lens.** Cut a biconvex lens **along** its axis (into left and right halves of the disc, each still biconvex): each half keeps both curvatures, so $f$ is unchanged; only the light gathered is halved. Cut it **across** the axis (into two thinner plano-convex lenses): each half has one curved face instead of two, so $\\frac1{f'} = \\frac{1}{2}\\cdot\\frac1f$, i.e. $f' = 2f$.",
    },
    { type: "heading", text: "Worked examples: prescriptions and two-step images" },
    {
      type: "worked-example",
      id: "omp1-3-we1",
      title: "Worked example 1 (a prescription)",
      problem:
        "Lenses of $+5$ D and $-2$ D are placed in contact. Find the power and focal length of the combination.",
      steps: [
        { text: "$P = 5 + (-2) = +3$ D. *Why this step:* in contact, powers add with their signs." },
        { text: "$F = \\frac1{3}$ m $\\approx 33.3$ cm, converging." },
      ],
      answer: "$P = +3$ D, $F \\approx 33.3$ cm (converging).",
    },
    {
      type: "worked-example",
      id: "omp1-3-we2",
      title: "Worked example 2 (silvered plano-convex lens, JEE Main)",
      problem:
        "A plano-convex lens ($R = 20$ cm, $n = 1.5$) is silvered on its **flat** face. Find the focal length of the equivalent mirror. What is it if the **curved** face is silvered instead?",
      steps: [
        { text: "Lens: $\\frac1{f_L} = 0.5 \\times \\frac1{20}$, so $f_L = 40$ cm, $P_L = \\frac1{40}$ cm$^{-1}$." },
        { text: "Flat mirror: $P_M = 0$." },
        { text: "$P_{\\text{eq}} = \\frac{2}{40} = \\frac1{20}$ cm$^{-1}$: a concave mirror of focal length 20 cm, i.e. $\\frac{R}{2(n - 1)}$. *Why this step:* light crosses the lens twice, so the lens counts twice." },
        { text: "Silvered on the **curved** face instead: $P_M = \\frac{1}{R/2} = \\frac1{10}$, so $P_{\\text{eq}} = \\frac2{40} + \\frac1{10} = \\frac{3}{20}$ cm$^{-1}$ and $F = \\frac{20}{3} \\approx 6.7$ cm $= \\frac{R}{2n}$." },
      ],
      answer: "Flat face silvered: a concave mirror of $F = 20$ cm; curved face silvered: $F = \\frac{20}{3} \\approx 6.7$ cm.",
    },
    {
      type: "worked-example",
      id: "omp1-3-we3",
      title: "Worked example 3 (two lenses 10 cm apart, two-step method)",
      problem:
        "Two convex lenses, each $f = 20$ cm, are 10 cm apart. An object is 60 cm in front of the first. Find the position and magnification of the final image.",
      steps: [
        { text: "Lens 1: $\\frac1{v_1} = \\frac1{20} - \\frac1{60} = \\frac1{30}$, $v_1 = 30$ cm, $m_1 = \\frac{30}{-60} = -\\frac12$." },
        { text: "Move the origin to lens 2. The light would converge 30 cm past lens 1, which is 20 cm past lens 2: a **virtual object** at $u_2 = +20$ cm. *Why this step:* the converging light meets lens 2 before its image forms, so the object is on the positive side." },
        { text: "Lens 2: $\\frac1v = \\frac1{20} + \\frac1{20} = \\frac1{10}$, $v = 10$ cm past lens 2, $m_2 = \\frac{10}{20} = \\frac12$." },
        { text: "Final image: real, 10 cm beyond lens 2, $m = m_1m_2 = -\\frac14$." },
        { text: "For comparison, $\\frac1F = \\frac1{20} + \\frac1{20} - \\frac{10}{400} = \\frac{3}{40}$, $F \\approx 13.3$ cm. That number alone does not tell you where the image is; the two-step method does." },
      ],
      answer: "Real, 10 cm beyond the second lens, $m = -\\frac14$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"powers add even when the lenses are separated\"",
      content:
        "$P = P_1 + P_2$ needs the lenses in contact. With a gap $d$ there is an extra $-dP_1P_2$ term, and two $+10$ D lenses 5 cm apart give $10 + 10 - 0.05 \\times 100 = 15$ D, not 20 D.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a lens cut in half across its axis keeps its focal length\"",
      content:
        "Cutting across the axis leaves each piece with one curved face instead of two, so each has half the power: $f' = 2f$. It is cutting **along** the axis (keeping both faces) that leaves $f$ unchanged.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "omp1-3-q1",
      variant: "practice",
      question: "What is the power of a concave lens of focal length 25 cm? Give your answer in dioptres, with its sign.",
      answer: -4,
      unit: "D",
      hint: "$P = \\frac1f$ with $f$ in metres, and a diverging lens has $f < 0$.",
      solution: "$f = -25$ cm $= -0.25$ m, so $P = \\dfrac{1}{-0.25} = -4$ D.",
      commonMistakes: [
        { answer: 4, feedback: "A concave lens diverges, so its power is negative." },
        { answer: -0.04, feedback: "Use metres: 25 cm $= 0.25$ m." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-3-q2",
      variant: "practice",
      question: "Lenses of $+4$ D and $-6$ D are placed in contact. What is the combination?",
      options: [
        { text: "$+10$ D, converging", feedback: "Powers add with their signs; $-6$ D subtracts." },
        { text: "$-2$ D, a diverging lens of focal length 2 m", feedback: "$f = \\frac1P = -\\frac12$ m, not $-2$ m." },
        { text: "$-2$ D, a diverging lens of focal length 50 cm", correct: true, feedback: "$P = 4 - 6 = -2$ D, $f = -0.5$ m." },
      ],
      hint: "Powers of thin lenses in contact add, and $f = 1/P$ with $f$ in metres.",
    },
    {
      type: "numeric",
      id: "omp1-3-q3",
      variant: "practice",
      question: "A plano-convex lens ($R = 30$ cm, $n = 1.5$) is silvered on its flat face. It behaves as a concave mirror. What is the magnitude of that mirror's focal length, in cm?",
      answer: 30,
      unit: "cm",
      hint: "Light crosses the lens twice and reflects once: $P_{\\text{eq}} = 2P_L + P_M$, with $P_M = 0$ for a flat face.",
      solution: "Lens: $\\dfrac1{f_L} = 0.5\\times\\dfrac1{30}$, so $f_L = 60$ cm.\n\nFlat mirror: $P_M = 0$, so $P_{\\text{eq}} = \\dfrac{2}{60} = \\dfrac1{30}$ cm$^{-1}$ and $F = 30$ cm $= \\dfrac{R}{2(n - 1)}$.",
      commonMistakes: [
        { answer: 60, feedback: "That is the lens alone. Light passes through it twice." },
        { answer: 10, feedback: "That is $\\frac{R}{2n}$, the result when the **curved** face is silvered." },
        { answer: 15, feedback: "That treats the curved face as a mirror of $f = R/2$. The silver is on the flat face." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-3-q4",
      variant: "concept",
      question: "An equiconvex lens of focal length 20 cm is cut into two identical plano-convex halves by a plane perpendicular to its axis. What is the focal length of each half?",
      options: [
        { text: "40 cm", correct: true, feedback: "Each half keeps one curved face: half the power, twice the focal length." },
        { text: "20 cm", feedback: "That is the answer for a cut along the axis." },
        { text: "10 cm", feedback: "Removing a face weakens the lens; it cannot shorten $f$." },
      ],
      hint: "Each half has one flat face. Apply the lensmaker's equation to the original lens and to one half, and compare.",
    },
    {
      type: "numeric",
      id: "omp1-3-q5",
      variant: "practice",
      question: "Two convex lenses, each of focal length 10 cm, are placed 5 cm apart. What is the equivalent focal length, in cm? (Decimals or a fraction are fine.)",
      answer: 6.667,
      relTolerance: 0.01,
      unit: "cm",
      hint: "$\\frac1F = \\frac1{f_1} + \\frac1{f_2} - \\frac{d}{f_1f_2}$.",
      solution: "$\\dfrac1F = \\dfrac1{10} + \\dfrac1{10} - \\dfrac{5}{10\\times10} = \\dfrac{15}{100}$, so $F = \\dfrac{20}{3} \\approx 6.67$ cm.",
      commonMistakes: [
        { answer: 5, feedback: "That is the in-contact answer. The 5 cm gap adds $-\\frac{d}{f_1f_2}$." },
        { answer: 20, feedback: "Two converging lenses make a stronger system, so $F$ is shorter than 10 cm." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-3-q6",
      variant: "practice",
      multiple: true,
      question: "You have two thin converging lenses of $+10$ D each. Select every correct statement.",
      options: [
        { text: "Placed in contact, they act as a single lens of focal length 5 cm.", correct: true, feedback: "$P = 10 + 10 = 20$ D, so $F = \\frac1{20}$ m $= 5$ cm." },
        { text: "Placed 5 cm apart, the combination has a power of $+15$ D.", correct: true, feedback: "$P = P_1 + P_2 - dP_1P_2 = 20 - 0.05\\times100 = 15$ D." },
        { text: "Whatever their separation, the combination has a power of $+20$ D.", feedback: "Powers simply add only in contact. A gap $d$ subtracts $dP_1P_2$." },
        { text: "Cutting one of them across its axis into two plano-convex halves gives each half a power of $+10$ D.", feedback: "Each half keeps only one curved face: half the power, $+5$ D. A cut **along** the axis would keep $+10$ D." },
      ],
      hint: "Work in metres: $P = \\frac1f$, and remember the $-dP_1P_2$ term for separated lenses.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "prism-and-deviation",
  title: "1.4 · Refraction Through a Prism",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Shine a narrow beam through a glass prism and slowly rotate the prism. The spot on the wall first moves back towards the straight-through direction, stops, and then moves away again, even though you keep turning the same way. The deviation has a minimum. Finding it, and using it to measure refractive index, is one of the oldest experiments in optics.",
    },
    { type: "heading", text: "Angles inside a prism" },
    {
      type: "text",
      content:
        "**Set-up.** A prism of apex angle $A$ and index $n$ in air. A ray meets the first face at incidence $i$, refracts to $r_1$, crosses to the second face where it meets the normal at $r_2$, and leaves at the angle of emergence $e$. Snell at each face: $\\sin i = n\\sin r_1$ and $n\\sin r_2 = \\sin e$.",
    },
    {
      type: "text",
      content:
        "**Derivation 1: $r_1 + r_2 = A$.** The two normals, drawn inward, meet at a point Q inside the prism. The quadrilateral formed by the apex, the two points where the ray enters and leaves, and Q has right angles at both entry points, so the angle at Q is $180^\\circ - A$. In the triangle made by the ray inside and the two normals, the angles are $r_1$, $r_2$ and $180^\\circ - A$, which add to $180^\\circ$:",
    },
    { type: "math", latex: "r_1 + r_2 = A" },
    {
      type: "text",
      content:
        "**Derivation 2: the deviation.** The ray turns by $i - r_1$ at the first face and by $e - r_2$ at the second, both towards the base. The total deviation is their sum (exterior-angle theorem):",
    },
    { type: "math", latex: "\\delta = (i - r_1) + (e - r_2) = i + e - A" },
    { type: "heading", text: "Minimum deviation by symmetry" },
    {
      type: "text",
      content:
        "Light paths are reversible. If a ray entering at $i$ leaves at $e$, a ray entering at $e$ leaves at $i$ with the **same** deviation. So every value of $\\delta$ (except one) is produced by two angles of incidence, $i$ and $e$. The single exception, the turning point of the curve, must be where the two coincide: $i = e$. Then $r_1 = r_2 = \\frac A2$, and from $\\delta_m = 2i - A$, $i = \\frac{A + \\delta_m}{2}$. Snell at the first face gives the prism formula.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Prism relations",
      content:
        "$r_1 + r_2 = A$, $\\delta = i + e - A$.\nAt minimum deviation: $i = e$, $r_1 = r_2 = \\frac A2$, the ray inside is **parallel to the base** (for an isosceles prism), and $n = \\dfrac{\\sin\\frac{A + \\delta_m}{2}}{\\sin\\frac A2}$.\nThin prism (small $A$, near-normal incidence): $\\delta = (n - 1)A$.",
    },
    {
      type: "text",
      content:
        "The thin-prism result comes from small angles: $i \\approx nr_1$, $e \\approx nr_2$, so $\\delta = n(r_1 + r_2) - A = (n - 1)A$, independent of $i$ as long as everything stays small.",
    },
    { type: "heading", text: "When no light emerges" },
    {
      type: "text",
      content:
        "At the second face the ray is leaving glass, so if $r_2 > \\theta_c$ it is totally reflected. The smallest $r_2$ you can get is when $r_1$ is as large as possible, $r_1 = \\theta_c$ (grazing incidence, $i = 90^\\circ$), which gives $r_2 = A - \\theta_c$. If even that exceeds $\\theta_c$, nothing ever emerges:",
    },
    { type: "math", latex: "A > 2\\theta_c \\quad\\Longrightarrow\\quad \\text{no emergent ray for any } i" },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "prism",
        apexAngle: { min: 60, max: 60, step: 1, initial: 60 },
        prismIndex: { min: 1.5, max: 1.5, step: 0.01, initial: 1.5 },
        prismIncidence: { min: 20, max: 89, step: 1, initial: 40 },
        showDeviationGraph: true,
        caption:
          "A = 60°, n = 1.5. Sweep i from 20° to 89° and watch δ on the graph: it falls, bottoms out, then rises. Below about 28° the ray is trapped by TIR at the second face.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: below about $28^\\circ$ no ray emerges (TIR at the second face). Just above that the ray grazes out with a large deviation; the deviation then falls to a minimum of about $37.2^\\circ$ at $i \\approx 48.6^\\circ$, where the ray inside runs parallel to the base; beyond that it rises again. The curve is lopsided, not a parabola. Now unlock the apex angle.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "prism",
        apexAngle: { min: 30, max: 75, step: 1, initial: 60 },
        prismIndex: { min: 1.2, max: 2, step: 0.01, initial: 1.5 },
        prismIncidence: { min: 20, max: 89, step: 1, initial: 50 },
        showDeviationGraph: true,
        caption:
          "Now change A and n. A bigger apex angle or a bigger index both increase δ_min, and for large A with large n the window of angles that get through closes.",
      },
    },
    { type: "heading", text: "Worked examples: $n$ and grazing emergence" },
    {
      type: "worked-example",
      id: "omp1-4-we1",
      title: "Worked example 1 (measuring $n$)",
      problem:
        "A prism of $A = 60^\\circ$ gives $\\delta_m = 30^\\circ$. Find its refractive index.",
      steps: [
        { text: "$\\frac{A + \\delta_m}{2} = 45^\\circ$ and $\\frac A2 = 30^\\circ$." },
        { text: "$n = \\frac{\\sin 45^\\circ}{\\sin 30^\\circ} = \\frac{1/\\sqrt2}{1/2} = \\sqrt2 \\approx 1.414$. *Why this step:* at minimum deviation both refractions are symmetric, so one Snell equation with $r = A/2$ is enough." },
      ],
      answer: "$n = \\sqrt2 \\approx 1.414$",
    },
    {
      type: "worked-example",
      id: "omp1-4-we2",
      title: "Worked example 2 (the angles at minimum deviation)",
      problem:
        "For a prism with $A = 60^\\circ$ and $n = 1.5$, find the angle of incidence and the deviation at minimum deviation.",
      steps: [
        { text: "$r_1 = 30^\\circ$, $\\sin i = 1.5 \\times 0.5 = 0.75$, $i = 48.6^\\circ$." },
        { text: "$\\delta_m = 2i - A = 97.2^\\circ - 60^\\circ = 37.2^\\circ$. That is the bottom of the curve you saw." },
      ],
      tryFirst: false,
      answer: "$i \\approx 48.6^\\circ$, $\\delta_m \\approx 37.2^\\circ$",
    },
    {
      type: "worked-example",
      id: "omp1-4-we3",
      title: "Worked example 3 (grazing emergence)",
      problem:
        "For the same prism ($A = 60^\\circ$, $n = 1.5$), find the smallest angle of incidence for which light emerges.",
      steps: [
        { text: "$\\theta_c = \\sin^{-1}\\frac{1}{1.5} = 41.8^\\circ$. The ray just gets out when $r_2 = \\theta_c$ (then $e = 90^\\circ$, grazing)." },
        { text: "$r_1 = A - r_2 = 60^\\circ - 41.8^\\circ = 18.2^\\circ$." },
        { text: "$\\sin i = 1.5\\sin 18.2^\\circ = 1.5 \\times 0.312 = 0.468$, so $i \\approx 27.9^\\circ$. *Why this step:* smaller $i$ means smaller $r_1$ and bigger $r_2$, so below this angle the ray is trapped." },
      ],
      answer: "$i \\approx 27.9^\\circ$",
    },
    {
      type: "worked-example",
      id: "omp1-4-we4",
      title: "Worked example 4 (normal incidence, JEE Main)",
      problem:
        "A ray falls normally on one face of a $30^\\circ$ prism of index $\\sqrt2$. Find the angle of emergence and the deviation.",
      steps: [
        { text: "Normal incidence: $i = 0$, $r_1 = 0$, so $r_2 = A = 30^\\circ$." },
        { text: "$\\sin e = \\sqrt2\\sin 30^\\circ = \\frac{\\sqrt2}{2}$, so $e = 45^\\circ$." },
        { text: "$\\delta = i + e - A = 0 + 45^\\circ - 30^\\circ = 15^\\circ$." },
      ],
      answer: "$e = 45^\\circ$, $\\delta = 15^\\circ$",
    },
    {
      type: "worked-example",
      id: "omp1-4-we5",
      title: "Worked example 5 (thin prism)",
      problem:
        "Find the deviation produced by a $5^\\circ$ prism with $n = 1.5$ at small angles of incidence.",
      steps: [
        { text: "For a thin prism, $\\delta = (n - 1)A = 0.5 \\times 5^\\circ = 2.5^\\circ$, whatever the (small) angle of incidence." },
      ],
      answer: "$\\delta = 2.5^\\circ$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"deviation always increases with the angle of incidence\"",
      content:
        "It first **decreases**, reaches $\\delta_m$ at $i = e$, and only then increases. Reversibility forces this: each deviation (except $\\delta_m$) is shared by two incidence angles, $i$ and $e$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"at minimum deviation the ray inside is perpendicular to the base\"",
      content:
        "It is **parallel** to the base. With $r_1 = r_2$ the path inside is symmetric about the prism's bisector, and the only symmetric line crossing both faces is the one parallel to the base.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "omp1-4-q1",
      variant: "practice",
      question: "A prism of angle $60^\\circ$ has minimum deviation $60^\\circ$. What is its refractive index?",
      options: [
        { text: "$\\sqrt2$", feedback: "That would need $\\delta_m = 30^\\circ$." },
        { text: "$\\sqrt3$", correct: true, feedback: "$n = \\frac{\\sin 60^\\circ}{\\sin 30^\\circ} = \\sqrt3$." },
        { text: "$2$", feedback: "That is $\\frac{A + \\delta_m}{A}$, a ratio of angles. The formula uses sines of the half-angles: $\\frac{\\sin\\frac{A + \\delta_m}{2}}{\\sin\\frac A2}$." },
      ],
      hint: "Use the minimum-deviation formula from 1.4, which gives $n$ in terms of $A$ and $\\delta_m$.",
    },
    {
      type: "numeric",
      id: "omp1-4-q2",
      variant: "practice",
      question: "A thin prism of angle $4^\\circ$ is made of glass with $n = 1.6$. What is its deviation, in degrees?",
      answer: 2.4,
      unit: "°",
      hint: "For a thin prism, $\\delta = (n - 1)A$.",
      solution: "$\\delta = (n - 1)A = 0.6 \\times 4^\\circ = 2.4^\\circ$, whatever the (small) angle of incidence.",
      commonMistakes: [
        { answer: 6.4, feedback: "That is $nA$. The deviation is $(n - 1)A$." },
        { answer: 1.6, feedback: "Multiply $A$ by $(n - 1) = 0.6$, not by 0.4." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-4-q3",
      variant: "concept",
      question: "At minimum deviation through an equilateral prism, how does the ray travel inside the glass?",
      options: [
        { text: "Perpendicular to the base", feedback: "A perpendicular path would not cross both slanted faces symmetrically." },
        { text: "Parallel to the base", correct: true, feedback: "$r_1 = r_2 = A/2$ makes the internal path symmetric, hence parallel to the base." },
        { text: "Along the normal to the first face", feedback: "That is normal incidence, $r_1 = 0$, which is not minimum deviation." },
      ],
      hint: "At minimum deviation the path is symmetric, $r_1 = r_2 = A/2$. What does that say about the ray inside an equilateral prism?",
    },
    {
      type: "numeric",
      id: "omp1-4-q4",
      variant: "practice",
      question: "A prism with $A = 60^\\circ$ and $n = \\sqrt2$ is set for minimum deviation. What is $\\delta_m$, in degrees?",
      answer: 30,
      unit: "°",
      hint: "At minimum deviation $r_1 = r_2 = \\frac A2$. Find $i$ from Snell, then $\\delta_m = 2i - A$.",
      solution: "$r_1 = \\dfrac A2 = 30^\\circ$, so $\\sin i = \\sqrt2\\sin 30^\\circ = \\dfrac{1}{\\sqrt2}$ and $i = 45^\\circ$.\n\n$\\delta_m = 2i - A = 90^\\circ - 60^\\circ = 30^\\circ$.",
      commonMistakes: [
        { answer: 0, feedback: "You took $i = 30^\\circ$, but $30^\\circ$ is $r_1 = A/2$, the angle inside the glass, not $i$." },
        { answer: 60, feedback: "That would need $n = \\sqrt3$." },
        { answer: 24.85, tolerance: 0.1, feedback: "That is the thin-prism rule $(n - 1)A$, which fails for a $60^\\circ$ prism. Use the minimum-deviation formula." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-4-q5",
      variant: "practice",
      multiple: true,
      question: "For glass of $n = 1.5$ ($\\theta_c \\approx 41.8^\\circ$), select every prism angle that lets no light emerge from the second face, whatever the angle of incidence.",
      options: [
        { text: "$30^\\circ$", feedback: "$30^\\circ < 2\\theta_c$: most incidences get through." },
        { text: "$85^\\circ$", correct: true, feedback: "$85^\\circ > 2\\theta_c = 83.6^\\circ$, so even grazing incidence leaves $r_2 > \\theta_c$." },
        { text: "$60^\\circ$", feedback: "$60^\\circ < 83.6^\\circ$: light emerges for $i > 27.9^\\circ$." },
        { text: "$88^\\circ$", correct: true, feedback: "$88^\\circ > 83.6^\\circ$: even with $r_1 = \\theta_c$ (grazing incidence), $r_2 = 88^\\circ - 41.8^\\circ = 46.2^\\circ > \\theta_c$." },
      ],
      hint: "No light emerges for any $i$ when $A > 2\\theta_c$.",
    },
    {
      type: "quiz",
      id: "omp1-4-q6",
      variant: "concept",
      question: "Why does each deviation (other than $\\delta_m$) occur for exactly two angles of incidence?",
      options: [
        { text: "Because the prism has two faces.", feedback: "Two faces are needed for a prism, but the pairing of angles comes from reversibility." },
        { text: "Because of total internal reflection.", feedback: "TIR limits which angles get through at all; it does not pair them." },
        { text: "Because light paths are reversible: incidence $e$ gives emergence $i$ with the same deviation.", correct: true, feedback: "Swapping $i$ and $e$ leaves $\\delta = i + e - A$ unchanged." },
      ],
      hint: "Compare a ray that enters at $i$ and leaves at $e$ with a ray sent back along the same path. What can you say about their deviations?",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "dispersion-and-scattering",
  title: "1.5 · Dispersion and Scattering",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Newton let a sunbeam through a prism and got a band of colours from red to violet on the wall. Then he sent one colour through a second prism: it bent again but did not split. White light is a mixture, and the prism sorts it because glass has a slightly different refractive index for each colour. The same fact, turned round, explains the blue sky and the red sunset.",
    },
    { type: "heading", text: "Why $n$ depends on colour" },
    {
      type: "text",
      content:
        "In glass, the electric field of the light makes bound electrons oscillate, and the re-radiated waves slow the light down. Electrons in glass have natural frequencies in the ultraviolet, so higher-frequency (bluer) light is closer to resonance and is slowed more. Across the visible range the result is well described by **Cauchy's relation**:",
    },
    { type: "math", latex: "n(\\lambda) = A + \\frac{B}{\\lambda^2}, \\qquad A, B > 0" },
    {
      type: "text",
      content:
        "Shorter wavelength, larger $n$, stronger bending. Drag the point along the curve for a crown-like glass ($\\lambda$ in micrometres).",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "1.5 + 0.0042/x^2",
        exprLatex: "n = 1.5 + \\frac{0.0042}{\\lambda^2}\\ (\\lambda\\text{ in }\\mu\\text{m})",
        window: { xmin: 0.3, xmax: 0.8, ymin: 1.49, ymax: 1.56 },
        initial: 0.55,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $n \\approx 1.526$ at violet (0.4 μm), $1.514$ at yellow-green (0.55 μm) and $1.509$ at red (0.7 μm). The difference is only about 1%, but it is enough to spread white light into a spectrum, and the curve is steeper at the violet end.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Angular dispersion and dispersive power",
      content:
        "For a thin prism, $\\delta = (n - 1)A$ for each colour, so the violet and red rays leave at an angle apart of\n$\\theta = \\delta_v - \\delta_r = (n_v - n_r)A$ (**angular dispersion**).\nThe **dispersive power** compares the spread to the mean deviation $\\delta = (n - 1)A$ (with $n$ for yellow light):\n$\\omega = \\dfrac{\\delta_v - \\delta_r}{\\delta} = \\dfrac{n_v - n_r}{n - 1}$. It depends only on the material, not on $A$.",
    },
    { type: "heading", text: "Combining prisms" },
    {
      type: "text",
      content:
        "Put two thin prisms together, apex to base (so their deviations oppose). Net deviation and net dispersion are the sums with signs:",
    },
    {
      type: "math",
      latex:
        "\\delta_{\\text{net}} = (n - 1)A + (n' - 1)A', \\qquad \\theta_{\\text{net}} = (n_v - n_r)A + (n'_v - n'_r)A' = \\omega\\delta + \\omega'\\delta'",
    },
    {
      type: "text",
      content:
        "- **Achromatic combination** (deviation without dispersion): choose $A'$ so that $\\theta_{\\text{net}} = 0$, i.e. $\\omega\\delta + \\omega'\\delta' = 0$. Because flint glass disperses more strongly than crown, a thinner flint prism cancels the colours of a crown prism while leaving some net deviation. Achromatic camera lenses use the same idea.\n- **Direct-vision combination** (dispersion without deviation): choose $A'$ so that $\\delta_{\\text{net}} = 0$. The mean ray goes straight through but the colours still fan out; hand-held spectroscopes use this.",
    },
    {
      type: "worked-example",
      id: "omp1-5-we1",
      title: "Worked example 1 (a crown prism)",
      problem:
        "A thin crown-glass prism of angle $5^\\circ$ has $n_v = 1.523$, $n_r = 1.513$ and mean $n = 1.518$. Find the mean deviation, the angular dispersion and the dispersive power.",
      steps: [
        { text: "Mean deviation: $\\delta = 0.518 \\times 5^\\circ = 2.59^\\circ$." },
        { text: "Angular dispersion: $\\theta = (1.523 - 1.513) \\times 5^\\circ = 0.05^\\circ$. *Why this step:* the violet and red rays each obey $\\delta = (n - 1)A$; their difference only needs $n_v - n_r$." },
        { text: "Dispersive power: $\\omega = \\frac{0.010}{0.518} \\approx 0.0193$, the same for any crown prism of this glass." },
      ],
      answer: "$\\delta = 2.59^\\circ$, $\\theta = 0.05^\\circ$, $\\omega \\approx 0.0193$",
    },
    {
      type: "worked-example",
      id: "omp1-5-we2",
      title: "Worked example 2 (making it achromatic, JEE Main)",
      problem:
        "A $6^\\circ$ prism of the same crown glass ($n_v - n_r = 0.010$, $n = 1.518$) is to be paired with a flint prism ($n_v = 1.665$, $n_r = 1.645$, $n = 1.655$) to cancel dispersion. Find the flint prism's angle and the net deviation. What angle would instead cancel the deviation (a direct-vision pair)?",
      steps: [
        { text: "Zero net dispersion: $0.010 \\times 6^\\circ = 0.020 \\times A'$, so $A' = 3^\\circ$, placed the other way up. *Why this step:* the opposite orientation gives the flint prism's dispersion the opposite sign." },
        { text: "Net deviation: $0.518 \\times 6^\\circ - 0.655 \\times 3^\\circ = 3.108^\\circ - 1.965^\\circ \\approx 1.14^\\circ$. The pair still bends light, but without colour fringes." },
        { text: "For a direct-vision pair instead: $0.518 \\times 6^\\circ = 0.655A'$ gives $A' \\approx 4.75^\\circ$, and the net dispersion is $0.06^\\circ - 0.095^\\circ \\ne 0$." },
      ],
      answer: "Achromatic pair: $A' = 3^\\circ$ (inverted), net deviation $\\approx 1.14^\\circ$. Direct-vision pair: $A' \\approx 4.75^\\circ$.",
    },
    { type: "heading", text: "Scattering and the blue sky" },
    {
      type: "text",
      content:
        "Air molecules are far smaller than the wavelength of light. Light makes their electrons oscillate, and they re-radiate in all directions. For such small scatterers (Rayleigh scattering), the scattered intensity goes as $\\frac{1}{\\lambda^4}$, so blue is scattered much more than red.\n- **Blue sky:** looking away from the Sun, you see sunlight scattered sideways by air, dominated by blue (violet is scattered even more, but sunlight has less of it and our eyes are less sensitive to it).\n- **Red sunrise and sunset:** sunlight crosses far more air near the horizon; the blue is scattered out of the direct beam and the red remains.\n- **White clouds:** droplets are much larger than $\\lambda$, and large particles scatter all colours about equally.\n- **Rainbow:** dispersion plus one total internal reflection inside each raindrop sends different colours out at slightly different angles (about $42^\\circ$ for red, $40^\\circ$ for violet from the anti-solar point).",
    },
    {
      type: "worked-example",
      id: "omp1-5-we3",
      title: "Worked example 3 (how much bluer?)",
      problem:
        "Compare Rayleigh scattering of 400 nm and 700 nm light: by what factor is the 400 nm light scattered more?",
      steps: [
        { text: "$\\frac{I_{400}}{I_{700}} = \\left(\\frac{700}{400}\\right)^4 = 1.75^4$." },
        { text: "$1.75^2 = 3.0625$, and $3.0625^2 \\approx 9.4$. Violet-blue light is scattered about 9 times more strongly than red. *Why this step:* a fourth power turns a modest wavelength ratio into a large intensity ratio." },
      ],
      answer: "About 9.4 times more.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"red light bends most because it has the longest wavelength\"",
      content:
        "It is the other way round. Glass has the largest $n$ for violet, so **violet** bends most and red least. In the spectrum from a prism, red is nearest the undeviated direction.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the sky is blue because it reflects the ocean\"",
      content:
        "The sky is blue over deserts and far inland too. The colour comes from $\\lambda^{-4}$ scattering by air molecules. If anything, the ocean looks blue partly because it reflects the sky.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "omp1-5-q1",
      variant: "concept",
      question: "White light passes through a glass prism. Which colour is deviated most?",
      options: [
        { text: "Violet", correct: true, feedback: "$n$ is largest for the shortest wavelength (Cauchy), so $\\delta = (n - 1)A$ is largest." },
        { text: "Red", feedback: "Red has the smallest $n$ in glass, so it deviates least." },
        { text: "All colours are deviated equally", feedback: "Then there would be no spectrum." },
      ],
      hint: "Recall how deviation depends on refractive index, and how the refractive index of glass varies with wavelength (1.5).",
    },
    {
      type: "numeric",
      id: "omp1-5-q2",
      variant: "practice",
      question: "For a glass, $n_v = 1.66$, $n_r = 1.64$ and $n_y = 1.65$. What is its dispersive power? Give a decimal to 3 significant figures.",
      answer: 0.0308,
      relTolerance: 0.02,
      hint: "$\\omega = \\frac{n_v - n_r}{n_y - 1}$.",
      solution: "$\\omega = \\dfrac{n_v - n_r}{n_y - 1} = \\dfrac{0.02}{0.65} \\approx 0.0308$.",
      commonMistakes: [
        { answer: 0.0121, feedback: "You divided by $n_y = 1.65$. The denominator is $n_y - 1$." },
        { answer: 0.02, feedback: "That is $n_v - n_r$ alone. Dispersive power divides it by $n - 1$." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-5-q3",
      variant: "practice",
      question: "A thin prism of angle $4^\\circ$ has $n_v = 1.54$ and $n_r = 1.52$. What is the angular dispersion?",
      options: [
        { text: "$2.12^\\circ$", feedback: "That is the mean deviation $(n - 1)A$ with $n = 1.53$, not the spread between colours." },
        { text: "$0.02^\\circ$", feedback: "Multiply by the prism angle, $4^\\circ$." },
        { text: "$0.08^\\circ$", correct: true, feedback: "$(1.54 - 1.52) \\times 4^\\circ$." },
      ],
      hint: "For a thin prism $\\delta = (n - 1)A$. Write it for violet and for red and subtract.",
    },
    {
      type: "quiz",
      id: "omp1-5-q4",
      variant: "practice",
      question: "A $5^\\circ$ crown prism ($n_v - n_r = 0.012$) is to be made achromatic with a flint prism ($n_v - n_r = 0.024$). What flint angle is needed?",
      options: [
        { text: "$10^\\circ$", feedback: "The flint disperses more, so it needs a **smaller** angle." },
        { text: "$2.5^\\circ$", correct: true, feedback: "$0.012 \\times 5 = 0.024 \\times A'$." },
        { text: "$5^\\circ$", feedback: "Equal angles would double the flint's dispersion relative to the crown." },
      ],
      hint: "For no dispersion the angular dispersions $(n_v - n_r)A$ of the two prisms must cancel.",
    },
    {
      type: "numeric",
      id: "omp1-5-q5",
      variant: "practice",
      question: "By what factor is 400 nm light scattered more strongly than 800 nm light by air molecules?",
      answer: 16,
      hint: "Rayleigh scattering intensity goes as $\\lambda^{-4}$.",
      solution: "$\\dfrac{I_{400}}{I_{800}} = \\left(\\dfrac{800}{400}\\right)^4 = 2^4 = 16$.",
      commonMistakes: [
        { answer: 2, feedback: "Rayleigh scattering goes as $\\lambda^{-4}$, not $\\lambda^{-1}$." },
        { answer: 4, feedback: "That is $\\lambda^{-2}$. The power is 4." },
        { answer: 0.0625, tolerance: 0.001, feedback: "That is the ratio the other way up. The shorter wavelength is scattered *more*." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-5-q6",
      variant: "concept",
      question: "Why are clouds white, while the clear sky is blue?",
      options: [
        { text: "Clouds reflect the white ground below.", feedback: "Clouds are white seen from above too, against a dark ocean." },
        { text: "Water absorbs blue light.", feedback: "Absorption would make clouds yellowish, not white." },
        { text: "Cloud droplets are much larger than the wavelength and scatter all colours about equally.", correct: true, feedback: "The $\\lambda^{-4}$ law holds only for scatterers much smaller than $\\lambda$." },
      ],
      hint: "Recall when Rayleigh's $1/\\lambda^4$ law applies (1.5), and compare cloud droplets with air molecules in size.",
    },
    {
      type: "quiz",
      id: "omp1-5-q7",
      variant: "concept",
      multiple: true,
      question: "Select every observation that is explained mainly by $\\lambda^{-4}$ (Rayleigh) scattering by air molecules.",
      options: [
        { text: "The clear daytime sky looks blue.", correct: true, feedback: "Sunlight scattered sideways by molecules is dominated by the short wavelengths." },
        { text: "The Sun looks red at sunset.", correct: true, feedback: "The long path through air scatters the blue out of the direct beam, leaving red." },
        { text: "Clouds look white.", feedback: "Cloud droplets are much larger than $\\lambda$ and scatter all colours about equally; the $\\lambda^{-4}$ law does not apply." },
        { text: "A rainbow shows a band of colours.", feedback: "A rainbow comes from dispersion plus internal reflection inside raindrops, not from scattering by molecules." },
      ],
      hint: "Rayleigh scattering needs scatterers much smaller than the wavelength.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "the-eye-and-simple-microscope",
  title: "1.6 · The Eye and the Simple Microscope",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Your eye is a camera with a lens whose focal length you change a hundred times a minute without noticing. When that adjustment runs out of range, you need spectacles, and the power of those spectacles follows from the thin-lens formula in one line. A magnifying glass is the simplest instrument that extends the eye.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The eye",
      content:
        "The cornea and the eye lens together form a converging system that makes a real, inverted image on the retina, a fixed distance (about 2.5 cm) behind. To focus objects at different distances, the ciliary muscles change the lens's curvature: **accommodation**.\n- **Far point:** the farthest point seen clearly with a relaxed eye; infinity for a normal eye.\n- **Near point:** the closest point seen clearly with full accommodation; $D = 25$ cm for a normal adult eye (least distance of distinct vision).",
    },
    { type: "heading", text: "Correcting defects of vision" },
    {
      type: "text",
      content:
        "**Correcting defects with the lens formula.** A spectacle lens takes an object where you want to see and forms a virtual image where your eye **can** see. Put the object distance and the desired image distance into $\\frac1v - \\frac1u = \\frac1f$ (lens close to the eye, distances from the eye).",
    },
    {
      type: "table",
      headers: ["Defect", "Problem", "Correction"],
      rows: [
        ["Myopia (short sight)", "far point at $x$ instead of infinity; eyeball too long or lens too strong", "concave lens: object at $\\infty$ imaged at $-x$, so $f = -x$"],
        ["Hypermetropia (long sight)", "near point at $d > 25$ cm", "convex lens: object at $-25$ cm imaged at $-d$"],
        ["Presbyopia (age)", "accommodation weakens; near point recedes", "convex reading lens (often bifocals if myopic too)"],
        ["Astigmatism", "cornea curved differently in different planes", "cylindrical lens (qualitative)"],
      ],
    },
    {
      type: "worked-example",
      id: "omp1-6-we1",
      title: "Worked example 1 (myopia)",
      problem:
        "A student cannot see clearly beyond 80 cm. What lens does she need?",
      steps: [
        { text: "Distant objects ($u = -\\infty$) must appear at her far point: $v = -80$ cm. *Why this step:* the lens's job is to move the image into the range her eye can focus." },
        { text: "$\\frac1f = \\frac1{-80} - \\frac1{-\\infty} = -\\frac1{80}$, so $f = -80$ cm." },
        { text: "$P = \\frac{1}{-0.80} = -1.25$ D, a diverging lens." },
      ],
      answer: "$f = -80$ cm, $P = -1.25$ D (diverging).",
    },
    {
      type: "worked-example",
      id: "omp1-6-we2",
      title: "Worked example 2 (hypermetropia)",
      problem:
        "A man's near point is 75 cm. He wants to read at 25 cm. What lens does he need?",
      steps: [
        { text: "Object at $u = -25$ cm must have its image at $v = -75$ cm (his near point)." },
        { text: "$\\frac1f = \\frac1{-75} - \\frac1{-25} = -\\frac1{75} + \\frac3{75} = \\frac2{75}$, so $f = 37.5$ cm." },
        { text: "$P = \\frac{1}{0.375} \\approx +2.67$ D, a converging lens." },
      ],
      answer: "$f = 37.5$ cm, $P \\approx +2.67$ D (converging).",
    },
    { type: "heading", text: "Angular magnification and the simple microscope" },
    {
      type: "text",
      content:
        "**Angular magnification.** How big something looks depends on the **angle** it subtends at the eye, not its actual size. The best you can do unaided is to hold an object of height $h$ at the near point: angle $\\alpha = \\frac hD$. An instrument's angular magnification is $M = \\frac{\\beta}{\\alpha}$, where $\\beta$ is the angle the final image subtends.\n\n**Simple microscope.** Put the object inside the focus of a convex lens of focal length $f$, with the eye close to the lens. The image is virtual and erect, and (eye at the lens) it subtends the same angle as the object does at the lens: $\\beta = \\frac{h}{|u|}$. So $M = \\frac{D}{|u|}$.\n\n- **Image at the near point** ($v = -D$): $\\frac1{-D} - \\frac1u = \\frac1f$ gives $\\frac1{|u|} = \\frac1f + \\frac1D$, so",
    },
    { type: "math", latex: "M = D\\left(\\frac1f + \\frac1D\\right) = 1 + \\frac Df" },
    {
      type: "text",
      content:
        "- **Image at infinity** (object at F, relaxed eye): $|u| = f$, so $M = \\dfrac Df$.\n\nSee the magnifier on the bench: $f = 5$ cm, object inside F.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "convex-lens",
        focalLength: { min: 5, max: 5, step: 1, initial: 5 },
        objectDistance: { min: 2, max: 5, step: 0.25, initial: 4 },
        benchHalfWidth: 30,
        caption:
          "A 5 cm magnifier. With the object inside F the image is virtual, erect and large on the object's side. Push the object towards F and the image runs off to infinity.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $|u| = 4$ cm the image is at $v = -20$ cm, five times taller. Near $|u| \\approx 4.2$ cm the image sits at 25 cm (the near point: maximum magnification, $M = 6$). At $|u| = 5$ cm the rays leave parallel: image at infinity, relaxed viewing, $M = 5$.",
    },
    {
      type: "worked-example",
      id: "omp1-6-we3",
      title: "Worked example 3 (a magnifier, JEE Main)",
      problem:
        "A lens of $f = 5$ cm is used as a magnifier. Find the magnification and the object distance (a) with the image at the near point (25 cm), (b) with the image at infinity.",
      steps: [
        { text: "Image at the near point: $M = 1 + \\frac{25}{5} = 6$. The object is at $\\frac1{|u|} = \\frac15 + \\frac1{25} = \\frac{6}{25}$, $|u| \\approx 4.17$ cm." },
        { text: "Image at infinity: $M = \\frac{25}{5} = 5$, object at 5 cm. *Why this step:* the relaxed-eye setting trades one unit of magnification for comfort." },
      ],
      answer: "(a) $M = 6$, object at about 4.17 cm; (b) $M = 5$, object at 5 cm.",
      tryFirst: false,
    },
    {
      type: "worked-example",
      id: "omp1-6-we4",
      title: "Worked example 4 (presbyopia)",
      problem:
        "A 50-year-old's near point has moved to 50 cm. What reading glasses let her read at 25 cm?",
      steps: [
        { text: "Reading glasses: a page at $u = -25$ cm must have its image at her near point, $v = -50$ cm." },
        { text: "$\\frac1f = -\\frac1{50} + \\frac1{25} = \\frac1{50}$, $f = 50$ cm, $P = +2$ D." },
      ],
      answer: "A converging lens of $f = 50$ cm, $P = +2$ D.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a magnifying glass makes the object bigger\"",
      content:
        "The object is unchanged, and the image's physical size does not matter by itself. The lens lets you put the object **closer** than 25 cm and still focus on it, so it subtends a larger angle at your eye. Angular magnification is what counts.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "omp1-6-q1",
      variant: "practice",
      question: "A myopic person's far point is 50 cm. What is the power of the lens that lets them see distant objects clearly? Give your answer in dioptres, with its sign.",
      answer: -2,
      unit: "D",
      hint: "The lens must image objects at infinity at the far point: $u = -\\infty$, $v = -50$ cm.",
      solution: "$\\dfrac1f = \\dfrac1v - \\dfrac1u = \\dfrac1{-50} - 0$, so $f = -50$ cm $= -0.5$ m.\n\n$P = \\dfrac{1}{-0.5} = -2$ D, a diverging lens.",
      commonMistakes: [
        { answer: 2, feedback: "Myopia needs a diverging lens to push the image of distant objects in to the far point, so $P < 0$." },
        { answer: -0.5, feedback: "Power uses metres: $\\frac{1}{0.5} = 2$, not $0.5$." },
        { answer: -0.02, feedback: "Convert to metres first: $f = -0.5$ m, not $-50$." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-6-q2",
      variant: "practice",
      question: "A person's near point is 50 cm. What lens lets them read at 25 cm?",
      options: [
        { text: "$-2$ D", feedback: "The sign: $-\\frac1{50} + \\frac1{25}$ is positive." },
        { text: "$+4$ D", feedback: "That is $\\frac{1}{0.25}$, which would bring objects at infinity to 25 cm, not objects at 25 cm to 50 cm." },
        { text: "$+2$ D", correct: true, feedback: "$\\frac1f = \\frac1{-50} - \\frac1{-25} = \\frac1{50}$ cm$^{-1}$, $f = 0.5$ m." },
      ],
      hint: "The lens must take an object at 25 cm and form its virtual image at the person's near point. Apply the lens formula with signs, then convert $f$ to metres for the power.",
    },
    {
      type: "numeric",
      id: "omp1-6-q3",
      variant: "practice",
      question: "A lens of focal length 10 cm is used as a simple microscope with the image at the near point (25 cm). What is the angular magnification?",
      answer: 3.5,
      hint: "Image at the near point: $M = 1 + \\frac Df$.",
      solution: "$M = 1 + \\dfrac Df = 1 + \\dfrac{25}{10} = 3.5$.",
      commonMistakes: [
        { answer: 2.5, feedback: "That is the image-at-infinity value $D/f$. With the image at the near point there is an extra 1." },
        { answer: 0.4, feedback: "That is $f/D$, upside down." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-6-q4",
      variant: "concept",
      question: "What does a magnifying glass actually do?",
      options: [
        { text: "It lets you bring the object closer than the near point and still focus, so it subtends a larger angle.", correct: true, feedback: "That is angular magnification." },
        { text: "It makes the object physically larger.", feedback: "The object does not change." },
        { text: "It makes a large real image on the retina by itself.", feedback: "The eye lens still forms the retinal image; the magnifier provides a virtual image at a comfortable distance." },
      ],
      hint: "Apparent size depends on the angle the object subtends at the eye (1.6). What limits how close you can bring an object without help?",
    },
    {
      type: "quiz",
      id: "omp1-6-q5",
      variant: "concept",
      question: "Why does a normal eye fail to see an object 10 cm away clearly?",
      options: [
        { text: "The object subtends too small an angle.", feedback: "At 10 cm it subtends a **larger** angle than at 25 cm. The problem is focusing." },
        { text: "The eye lens cannot become powerful enough to focus it on the retina.", correct: true, feedback: "Accommodation has a limit, which sets the near point near 25 cm." },
        { text: "The retina moves backwards.", feedback: "The lens–retina distance is fixed; only the lens changes." },
      ],
      hint: "Recall how the eye focuses on near objects (1.6) and what fixes the near point.",
    },
    {
      type: "quiz",
      id: "omp1-6-q6",
      variant: "practice",
      multiple: true,
      question: "A convex lens of focal length 5 cm is used as a magnifying glass by a person with a normal near point of 25 cm. Select every correct statement.",
      options: [
        { text: "With the image at the near point, the angular magnification is 6.", correct: true, feedback: "$M = 1 + \\frac Df = 1 + \\frac{25}{5} = 6$." },
        { text: "With the object at the focus (relaxed eye), the angular magnification is 5.", correct: true, feedback: "Image at infinity: $M = \\frac Df = \\frac{25}{5} = 5$." },
        { text: "The image it forms is real and inverted.", feedback: "The object is inside F, so the image is virtual and erect, on the object's side." },
        { text: "The object must be placed beyond the focus to be magnified.", feedback: "Beyond F the lens makes a real image you cannot view as a magnifier. The object goes at or inside F." },
      ],
      hint: "Use $M = 1 + \\frac Df$ (near point) and $M = \\frac Df$ (infinity).",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "microscopes-and-telescopes",
  title: "1.7 · Compound Microscope and Telescopes",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "A single magnifier tops out at about $\\times 10$: stronger lenses need impossibly short focal lengths. Put two lenses in a row and the magnifications multiply. The first lens (the **objective**) makes a real image; the second (the **eyepiece**) is a magnifier used to look at that image. A microscope does this for tiny nearby objects; a telescope for huge distant ones.",
    },
    { type: "heading", text: "The compound microscope" },
    {
      type: "text",
      content:
        "The object sits just outside the focus of a short-focus objective ($f_o$ small), which forms a real, inverted, much magnified image. That image lies just inside the focus of the eyepiece, which acts as a simple microscope. The total magnification is the product:",
    },
    {
      type: "math",
      latex:
        "M = m_o M_e = \\frac{v_o}{u_o}\\left(1 + \\frac{D}{f_e}\\right)\\ \\text{(near point)}, \\qquad M = \\frac{v_o}{u_o}\\cdot\\frac{D}{f_e}\\ \\text{(image at infinity)}",
    },
    {
      type: "text",
      content:
        "With the object very near $F_o$, $|m_o| = \\frac{v_o - f_o}{f_o} = \\frac{L}{f_o}$, where the **tube length** $L$ is the gap between the objective's second focus and the eyepiece's first focus. That gives the textbook form $|M| \\approx \\frac{L}{f_o}\\cdot\\frac{D}{f_e}$: both focal lengths small, the objective's the smallest.",
    },
    {
      type: "text",
      content:
        "Build a microscope in two steps. **A note on scale:** a real objective has $f_o$ of about 1 cm or less, far too small to see on the bench, so the first bench shows the objective **scaled up ten times**: $f_o = 10$ cm with the object at 12 cm stands for a real $f_o = 1$ cm with the object at 1.2 cm. Scaling every length by the same factor leaves the magnification $m_o$ unchanged. The eyepiece bench that follows is at true scale ($f_e = 5$ cm), so the two benches are separate steps, not one drawing of the whole instrument.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "convex-lens",
        focalLength: { min: 10, max: 10, step: 1, initial: 10 },
        objectDistance: { min: 11, max: 20, step: 0.5, initial: 12 },
        benchHalfWidth: 70,
        caption:
          "Step 1, the objective, drawn ×10 (f_o = 10 cm here stands for 1 cm): object just outside F. The image is real, inverted and several times larger, far out on the right. Move the object closer to F and it grows further.",
      },
    },
    {
      type: "text",
      content: "Then the eyepiece, looking at that image as its object, placed just inside its focus.",
    },
    {
      type: "interactive",
      config: {
        component: "omp-ray-bench",
        mode: "convex-lens",
        focalLength: { min: 5, max: 5, step: 1, initial: 5 },
        objectDistance: { min: 2, max: 5, step: 0.25, initial: 4 },
        benchHalfWidth: 30,
        caption:
          "Step 2, the eyepiece: the objective's image is now the object, inside F. It is magnified again into a large virtual image.",
      },
    },
    {
      type: "table",
      headers: ["Step", "Object", "Image", "Magnification"],
      rows: [
        ["Objective, $f_o = 10$ cm (×10 scale; real: 1 cm)", "$u = -12$ cm (real: $-1.2$ cm)", "$v = +60$ cm (real: 6 cm), real, inverted", "$m_o = -5$"],
        ["Eyepiece, $f_e = 5$ cm", "objective's image, $u = -4$ cm", "$v = -20$ cm, virtual", "$m_e = +5$"],
        ["Whole instrument", "", "final image inverted", "$m = -25$"],
      ],
    },
    {
      type: "text",
      content:
        "What you should have seen: the objective's image is real and on the far side; used as the eyepiece's object, it is magnified a second time, and the magnifications multiply. The final image is inverted relative to the object (only the objective inverts). Undo the ×10 scaling to picture the real instrument: objective image 6 cm behind a 1 cm objective, eyepiece 4 cm beyond that, so the two lenses are 10 cm apart and $M = -25$.",
    },
    { type: "heading", text: "Astronomical and other telescopes" },
    {
      type: "text",
      content:
        "**Astronomical telescope.** Now the object is at infinity. The long-focus objective ($f_o$ large) forms a small real image at its focus; the eyepiece magnifies it. In **normal adjustment** the final image is at infinity, so the objective's focus coincides with the eyepiece's focus. A star at angle $\\alpha$ to the axis forms an image of height $h = f_o\\alpha$; the eyepiece sends it out at $\\beta = \\frac{h}{f_e}$:",
    },
    {
      type: "math",
      latex:
        "M = \\frac{\\beta}{\\alpha} = \\frac{f_o}{f_e},\\quad L = f_o + f_e\\ \\text{(normal)}\\; \\qquad M = \\frac{f_o}{f_e}\\left(1 + \\frac{f_e}{D}\\right)\\ \\text{(final image at near point)}",
    },
    {
      type: "text",
      content:
        "**Other telescopes, briefly.** A *terrestrial* telescope adds an erecting lens so that the image is upright (longer tube). A *Galilean* telescope uses a concave eyepiece: short and upright, as in opera glasses. Large research telescopes are **reflectors** (e.g. Cassegrain: a big concave primary mirror and a small convex secondary). Mirrors have no chromatic aberration, a parabolic mirror has no spherical aberration, and a mirror can be supported over its whole back while a big lens can only be held at its rim and sags under its own weight.",
    },
    { type: "heading", text: "Worked examples: microscope and Moon image" },
    {
      type: "worked-example",
      id: "omp1-7-we1",
      title: "Worked example 1 (compound microscope, JEE Main)",
      problem:
        "A compound microscope has $f_o = 1$ cm, $f_e = 5$ cm, and the object is 1.1 cm from the objective. Find the magnification and the lens separation with the final image (a) at the near point (25 cm), (b) at infinity.",
      steps: [
        { text: "Objective: $\\frac1{v_o} = \\frac11 - \\frac1{1.1} = \\frac{0.1}{1.1}$, so $v_o = 11$ cm and $m_o = \\frac{11}{-1.1} = -10$." },
        { text: "Final image at the near point: $M_e = 1 + \\frac{25}{5} = 6$, so $M = -60$. The eyepiece's object is at $\\frac1{|u_e|} = \\frac15 + \\frac1{25}$, $|u_e| \\approx 4.17$ cm, so the lenses are $11 + 4.17 \\approx 15.2$ cm apart." },
        { text: "Final image at infinity: $M_e = 5$, $M = -50$, lens separation $11 + 5 = 16$ cm. *Why this step:* here $L = v_o - f_o = 10$ cm and $\\frac{L}{f_o}\\frac{D}{f_e} = 10 \\times 5 = 50$, the approximate formula agrees." },
      ],
      answer: "(a) $M = -60$, separation $\\approx 15.2$ cm; (b) $M = -50$, separation 16 cm.",
    },
    {
      type: "worked-example",
      id: "omp1-7-we2",
      title: "Worked example 2 (telescope)",
      problem:
        "A telescope has $f_o = 150$ cm, $f_e = 5$ cm. Find the magnification and tube length in normal adjustment, and the magnification with the final image at 25 cm.",
      steps: [
        { text: "Normal adjustment: $M = \\frac{150}{5} = 30$, tube length $L = 155$ cm." },
        { text: "Final image at 25 cm: $M = 30\\left(1 + \\frac{5}{25}\\right) = 36$." },
      ],
      answer: "Normal adjustment: $M = 30$, $L = 155$ cm; image at 25 cm: $M = 36$.",
    },
    {
      type: "worked-example",
      id: "omp1-7-we3",
      title: "Worked example 3 (image of the Moon)",
      problem:
        "The Moon (diameter $3.48\\times10^6$ m) is $3.8\\times10^8$ m away. How big is its image formed by the objective above?",
      steps: [
        { text: "Angle subtended: $\\alpha = \\frac{3.48\\times10^6}{3.8\\times10^8} \\approx 9.2\\times10^{-3}$ rad. *Why this step:* for a distant object, only the angle matters, and the image of angular size $\\alpha$ at the focus has height $f_o\\alpha$." },
        { text: "Image diameter $= f_o\\alpha = 1.5 \\times 9.2\\times10^{-3} \\approx 1.4\\times10^{-2}$ m, about 1.4 cm. The eyepiece then views this 1.4 cm image from a few cm away." },
      ],
      answer: "About 1.4 cm across ($1.4\\times10^{-2}$ m).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a telescope makes the image bigger than the object\"",
      content:
        "The objective's image of the Moon (Worked example 3) is tiny; the Moon is 3480 km across. The telescope makes a tiny image **close to your eye**, so that it subtends a larger angle than the Moon does. Angular magnification, not size, is the point.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the objective of a microscope has the larger focal length\"",
      content:
        "In a microscope the objective has the **shorter** focal length (a few mm), because $|m_o| \\approx \\frac{L}{f_o}$. In a telescope it is the opposite: the objective's focal length is long, because $M = \\frac{f_o}{f_e}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "omp1-7-q1",
      variant: "practice",
      question: "An astronomical telescope has $f_o = 100$ cm and $f_e = 4$ cm. In normal adjustment, what are its magnifying power and length?",
      options: [
        { text: "25 and 96 cm", feedback: "In normal adjustment the foci coincide, so the lenses are $f_o + f_e$ apart." },
        { text: "0.04 and 104 cm", feedback: "That is $\\frac{f_e}{f_o}$, upside down." },
        { text: "25 and 104 cm", correct: true, feedback: "$M = \\frac{100}{4}$, $L = f_o + f_e$." },
        { text: "29 and 104 cm", feedback: "That uses the near-point formula $\\frac{f_o}{f_e}\\left(1 + \\frac{f_e}{D}\\right)$, which does not apply in normal adjustment." },
      ],
      hint: "In normal adjustment the final image is at infinity, so the objective's image sits at the eyepiece's focus. Use that for the length, and the focal lengths for $M$.",
    },
    {
      type: "numeric",
      id: "omp1-7-q2",
      variant: "practice",
      question: "A microscope's objective gives $m_o = -8$. The eyepiece has $f_e = 5$ cm and the final image is at infinity ($D = 25$ cm). What is the magnitude of the magnifying power?",
      answer: 40,
      hint: "The magnifications multiply: $|M| = |m_o|\\cdot M_e$, with $M_e = \\frac{D}{f_e}$ for an image at infinity.",
      solution: "$M_e = \\dfrac{D}{f_e} = \\dfrac{25}{5} = 5$, so $|M| = 8 \\times 5 = 40$.",
      commonMistakes: [
        { answer: 48, feedback: "That uses $1 + \\frac{D}{f_e} = 6$, the near-point value." },
        { answer: 13, feedback: "Magnifications multiply; they do not add." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-7-q3",
      variant: "concept",
      question: "Compared with the Moon itself, the real image formed by a telescope objective is",
      options: [
        { text: "far larger.", feedback: "The image is about $f_o\\alpha$, a centimetre or so." },
        { text: "the same size.", feedback: "Only an object at $2F$ gives a same-size image." },
        { text: "far smaller, but close enough to the eyepiece to subtend a larger angle.", correct: true, feedback: "The telescope magnifies angles, not sizes." },
      ],
      hint: "The objective forms the image in its focal plane. Compare $f_o$ with the Moon's distance, then think about where that image sits relative to the eye.",
    },
    {
      type: "quiz",
      id: "omp1-7-q4",
      variant: "concept",
      question: "Which choice makes a good compound microscope?",
      options: [
        { text: "Objective of long focal length, eyepiece of short focal length", feedback: "That is the telescope recipe." },
        { text: "Both of long focal length", feedback: "Long focal lengths shrink both factors." },
        { text: "Objective of very short focal length, eyepiece of short focal length", correct: true, feedback: "$|M| \\approx \\frac{L}{f_o}\\cdot\\frac{D}{f_e}$: both small, the objective smallest." },
      ],
      hint: "The magnifying power of a compound microscope is $M \\approx \\dfrac{L}{f_o}\\cdot\\dfrac{D}{f_e}$. What makes each factor large?",
    },
    {
      type: "numeric",
      id: "omp1-7-q5",
      variant: "practice",
      question: "A telescope has $f_o = 100$ cm and $f_e = 5$ cm, with the final image at the near point (25 cm). What is the magnitude of its magnifying power?",
      answer: 24,
      hint: "Near-point adjustment: $M = \\frac{f_o}{f_e}\\left(1 + \\frac{f_e}{D}\\right)$.",
      solution: "$M = \\dfrac{f_o}{f_e}\\left(1 + \\dfrac{f_e}{D}\\right) = 20\\left(1 + \\dfrac{5}{25}\\right) = 20 \\times 1.2 = 24$.",
      commonMistakes: [
        { answer: 20, feedback: "That is normal adjustment. With the image at the near point there is an extra factor $1 + \\frac{f_e}{D}$." },
        { answer: 120, feedback: "The factor is $1 + \\frac{f_e}{D}$, not $1 + \\frac{D}{f_e}$." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-7-q6",
      variant: "concept",
      question: "Why are the largest astronomical telescopes reflectors rather than refractors?",
      options: [
        { text: "Mirrors have no chromatic aberration and can be supported across their whole back.", correct: true, feedback: "A large lens disperses colours and sags, held only at its rim." },
        { text: "Mirrors magnify more than lenses of the same focal length.", feedback: "Magnification depends on focal lengths, not on reflection versus refraction." },
        { text: "Mirrors form upright images.", feedback: "A concave mirror's image of a distant star field is inverted too." },
      ],
      hint: "List the practical drawbacks of a lens several metres across, then ask which of them a mirror avoids.",
    },
    {
      type: "quiz",
      id: "omp1-7-q7",
      variant: "concept",
      multiple: true,
      question: "Select every correct statement about the compound microscope and the astronomical telescope.",
      options: [
        { text: "In a compound microscope, the objective has the shorter focal length.", correct: true, feedback: "$|m_o| \\approx \\frac{L}{f_o}$, so the objective's focal length is made as small as possible." },
        { text: "In normal adjustment, the telescope's lenses are $f_o + f_e$ apart.", correct: true, feedback: "The objective's focus coincides with the eyepiece's focus, so $L = f_o + f_e$." },
        { text: "Both instruments give a final image that is erect.", feedback: "In both, the objective inverts and the eyepiece does not re-invert, so the final image is inverted." },
        { text: "Moving a telescope's final image from infinity to the near point reduces its magnifying power.", feedback: "It increases it, by the factor $1 + \\frac{f_e}{D}$." },
      ],
      hint: "Recall which lens does the magnifying in each instrument and where the intermediate image sits.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-1-mastery",
  title: "1.8 · Chapter 1 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every answer rebuilds from the single-surface formula of 0.7 applied twice, the sign convention, Snell at the prism faces and angular magnification.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in seven lines",
      content:
        "1. Two surfaces: $\\frac1f = (n_{\\text{rel}} - 1)\\left(\\frac1{R_1} - \\frac1{R_2}\\right)$; a denser surrounding medium weakens or reverses a lens.\n2. Thin lens: $\\frac1v - \\frac1u = \\frac1f$, $m = \\frac vu$; displacement method $f = \\frac{D^2 - x^2}{4D}$, $D \\ge 4f$.\n3. $P = 1/f$ (m); in contact $P = P_1 + P_2$; separated: two steps; silvered lens $P = 2P_L + P_M$.\n4. Prism: $r_1 + r_2 = A$, $\\delta = i + e - A$, $n = \\frac{\\sin\\frac{A + \\delta_m}{2}}{\\sin\\frac A2}$, thin $\\delta = (n - 1)A$.\n5. Dispersion $(n_v - n_r)A$, $\\omega = \\frac{n_v - n_r}{n - 1}$; achromatic: $\\omega\\delta + \\omega'\\delta' = 0$; scattering $\\propto \\lambda^{-4}$.\n6. Eye: spectacles image the desired object into the eye's range; magnifier $M = 1 + \\frac Df$ or $\\frac Df$.\n7. Microscope $M = m_oM_e$; telescope $M = \\frac{f_o}{f_e}$, $L = f_o + f_e$ in normal adjustment.",
    },
    {
      type: "numeric",
      id: "omp1-8-q1",
      variant: "mastery",
      question: "A biconvex glass lens ($n = 1.5$) has $f = 10$ cm in air. What is its focal length in a liquid of index 1.25? Give your answer in cm, with a minus sign if the lens diverges.",
      answer: 25,
      unit: "cm",
      hint: "Only the factor $n_{\\text{rel}} - 1$ changes between the two media.",
      solution: "In the liquid $n_{\\text{rel}} = \\dfrac{1.5}{1.25} = 1.2$, so $n_{\\text{rel}} - 1 = 0.2$ instead of $0.5$.\n\n$f$ scales by $\\dfrac{0.5}{0.2} = 2.5$: $f = 25$ cm, still converging.",
      commonMistakes: [
        { answer: 12.5, feedback: "That scales $f$ by the liquid's index. The factor is $\\frac{n - 1}{n_{\\text{rel}} - 1}$." },
        { answer: 40, feedback: "That uses water's $\\frac43$ rather than 1.25." },
        { answer: -25, feedback: "Glass (1.5) is still denser than the liquid (1.25), so the lens still converges." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-8-q2",
      variant: "mastery",
      multiple: true,
      question: "An object 2 cm tall is 20 cm from a convex lens of focal length 15 cm. Select every correct description of the image.",
      options: [
        { text: "Real and inverted", correct: true, feedback: "The object is beyond F, so the image forms on the far side: real and inverted." },
        { text: "60 cm beyond the lens", correct: true, feedback: "$\\frac1v = \\frac1{15} - \\frac1{20} = \\frac1{60}$, $v = +60$ cm." },
        { text: "6 cm tall", correct: true, feedback: "$m = \\frac{60}{-20} = -3$, so the image is $3\\times2 = 6$ cm tall." },
        { text: "Virtual and erect, on the object's side", feedback: "The object is beyond F, so the image is real." },
        { text: "8.6 cm beyond the lens", feedback: "That adds the reciprocals. $\\frac1v = \\frac1f + \\frac1u$ with $u = -20$." },
      ],
      hint: "The thin lens formula and magnification (1.2). Check each statement on its own.",
    },
    {
      type: "numeric",
      id: "omp1-8-q3",
      variant: "mastery",
      question: "Object and screen are 80 cm apart. Two lens positions 40 cm apart both give sharp images. What is $f$, in cm?",
      answer: 15,
      unit: "cm",
      hint: "Displacement method: $f = \\frac{D^2 - x^2}{4D}$.",
      solution: "$f = \\dfrac{80^2 - 40^2}{4\\times80} = \\dfrac{6400 - 1600}{320} = 15$ cm.\n\nCheck: positions 60 and 20 cm from the object, and $\\dfrac{60 \\times 20}{80} = 15$. ✓",
      commonMistakes: [
        { answer: 20, feedback: "That is $D/4$, the limiting case where the two positions coincide." },
        { answer: 10, feedback: "Recompute $D^2 - x^2 = 4800$ and $4D = 320$." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-8-q4",
      variant: "mastery",
      question: "A $+10$ D lens and a $-5$ D lens are placed in contact. What is the focal length of the combination?",
      options: [
        { text: "$+5$ cm", feedback: "$+5$ is the power in dioptres; the focal length is $\\frac15$ m." },
        { text: "$-20$ cm", feedback: "The converging lens is the stronger, so the pair converges." },
        { text: "$+6.7$ cm", feedback: "That adds the powers as $10 + 5$. The $-5$ D lens subtracts." },
        { text: "$+20$ cm", correct: true, feedback: "$P = +5$ D, $f = 0.2$ m." },
      ],
      hint: "Lenses in contact (1.3): watch the units when turning a power into a focal length.",
    },
    {
      type: "quiz",
      id: "omp1-8-q5",
      variant: "mastery",
      question: "An equiconvex lens ($R = 20$ cm, $n = 1.5$) is silvered on one face. What mirror does it behave as?",
      options: [
        { text: "A concave mirror of focal length 5 cm", correct: true, feedback: "$f_L = 20$ cm, reflecting face $f_M = 10$ cm: $P = \\frac2{20} + \\frac1{10} = \\frac15$ cm$^{-1}$." },
        { text: "A concave mirror of focal length 10 cm", feedback: "That is the silvered face alone. Light also passes through the lens twice." },
        { text: "A concave mirror of focal length 20 cm", feedback: "That is the lens alone, once." },
        { text: "A convex mirror of focal length 5 cm", feedback: "Every element here converges, so the system is concave." },
      ],
      hint: "A silvered lens: light refracts through the lens, reflects off the silvered face, and refracts again.",
    },
    {
      type: "quiz",
      id: "omp1-8-q6",
      variant: "mastery",
      question: "A prism of angle $60^\\circ$ and index $\\sqrt3$ is set for minimum deviation. What are $\\delta_m$ and the angle of incidence?",
      options: [
        { text: "$\\delta_m = 30^\\circ$, $i = 45^\\circ$", feedback: "Those belong to $n = \\sqrt2$." },
        { text: "$\\delta_m = 60^\\circ$, $i = 60^\\circ$", correct: true, feedback: "$\\sin i = \\sqrt3\\sin 30^\\circ = \\frac{\\sqrt3}2$; $\\delta_m = 2i - A$." },
        { text: "$\\delta_m = 43.9^\\circ$, $i = 60^\\circ$", feedback: "That is $(n - 1)A$, valid only for thin prisms." },
      ],
      hint: "Minimum deviation through a prism (1.4): the path inside the prism is symmetric.",
    },
    {
      type: "quiz",
      id: "omp1-8-q7",
      variant: "mastery",
      question: "A $6^\\circ$ crown prism ($n_v - n_r = 0.010$) is combined with a flint prism ($n_v - n_r = 0.015$) to remove dispersion. What is the flint prism's angle?",
      options: [
        { text: "$9^\\circ$", feedback: "The flint disperses more per degree, so it needs fewer degrees." },
        { text: "$6^\\circ$", feedback: "Equal angles give unequal dispersions here." },
        { text: "$4^\\circ$", correct: true, feedback: "$0.010 \\times 6 = 0.015 A'$." },
      ],
      hint: "Achromatic combination of prisms (1.5): the two angular dispersions must cancel.",
    },
    {
      type: "numeric",
      id: "omp1-8-q8",
      variant: "mastery",
      question: "A person cannot see objects beyond 2 m clearly. What power of lens is needed? Give your answer in dioptres, with its sign.",
      answer: -0.5,
      unit: "D",
      hint: "The lens must image distant objects at the far point, 2 m in front of the eye.",
      solution: "$u = -\\infty$, $v = -2$ m, so $\\dfrac1f = \\dfrac1{-2} - 0$ and $f = -2$ m.\n\n$P = \\dfrac{1}{f} = -0.5$ D, a diverging lens.",
      commonMistakes: [
        { answer: 0.5, feedback: "Myopia needs a diverging lens, so the power is negative." },
        { answer: -2, feedback: "$-2$ is the focal length in metres; $P = \\frac{1}{-2}$." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-8-q9",
      variant: "mastery",
      question: "A microscope has $f_o = 2$ cm and $f_e = 5$ cm. The object is 2.5 cm from the objective and the final image is at infinity. What are the magnifying power and the lens separation?",
      options: [
        { text: "$|M| = 24$, separation 15 cm", feedback: "$1 + \\frac{D}{f_e} = 6$ is for the near point. At infinity $M_e = 5$." },
        { text: "$|M| = 20$, separation 12 cm", feedback: "The eyepiece sits $f_e = 5$ cm beyond the objective's image at 10 cm." },
        { text: "$|M| = 62.5$, separation 7 cm", feedback: "That uses $\\frac{D}{f_o}\\cdot\\frac{D}{f_e}$. The objective's magnification is $\\frac{v_o}{u_o}$." },
        { text: "$|M| = 20$, separation 15 cm", correct: true, feedback: "$v_o = 10$ cm, $m_o = -4$, $M_e = \\frac{25}{5} = 5$; separation $v_o + f_e$." },
      ],
      hint: "The compound microscope (1.7): locate the objective's image first.",
    },
    {
      type: "numeric",
      id: "omp1-8-q10",
      variant: "mastery",
      question: "A telescope has $f_o = 120$ cm and $f_e = 5$ cm and is adjusted so the final image is at 25 cm. What is the magnitude of its magnifying power?",
      answer: 28.8,
      tolerance: 0.05,
      hint: "With the final image at the near point there is an extra factor beyond $\\frac{f_o}{f_e}$.",
      solution: "$M = \\dfrac{f_o}{f_e}\\left(1 + \\dfrac{f_e}{D}\\right) = 24\\left(1 + \\dfrac{5}{25}\\right) = 24 \\times 1.2 = 28.8$.",
      commonMistakes: [
        { answer: 24, feedback: "That is normal adjustment. With the image at the near point there is an extra factor $1 + \\frac{f_e}{D}$." },
        { answer: 144, feedback: "The extra factor is $1 + \\frac{f_e}{D} = 1.2$, not $1 + \\frac{D}{f_e} = 6$." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-8-q11",
      variant: "mastery",
      question: "An object is 30 cm to the left of a convex lens ($f = 20$ cm). A concave mirror ($f = 10$ cm) faces the lens 40 cm to its right. Light passes through the lens, reflects, and passes back through the lens. Where is the final image? (JEE Advanced style.)",
      options: [
        { text: "60 cm to the right of the lens", feedback: "That is only the first step. The mirror intercepts the light 40 cm from the lens." },
        { text: "50 cm to the left of the lens, erect, same size as the object", correct: true, feedback: "Lens: $v = 60$ cm, $m = -2$ (20 cm behind the mirror). Mirror: virtual object $u = +20$, $f = -10$: $v = -\\frac{20}{3}$ cm, $m = \\frac13$. Lens again (light now leftwards): $u = -\\frac{100}{3}$, $v = +50$ cm, $m = -1.5$. Total $m = (-2)(\\frac13)(-1.5) = +1$." },
        { text: "6.7 cm in front of the mirror", feedback: "That is after two steps. The reflected light still passes back through the lens." },
        { text: "50 cm to the left of the lens, inverted, 1.5 times larger", feedback: "The position is right, but the magnification multiplies over all three steps: $(-2)(\\frac13)(-1.5) = +1$." },
      ],
      hint: "Each image is the next object. When the light reverses, reverse the sign convention (the new direction of light is positive).",
    },
    {
      type: "quiz",
      id: "omp1-8-q12",
      variant: "mastery",
      question: "A plano-convex lens (curved face $R = 20$ cm) is made of two halves, split along the axis: the upper half has $n = 1.5$, the lower $n = 1.6$. An object is on the axis 60 cm in front. What images form? (JEE Advanced style.)",
      options: [
        { text: "Two real images, at 120 cm and 75 cm behind the lens", correct: true, feedback: "$f_1 = \\frac{20}{0.5} = 40$ cm gives $v = 120$ cm; $f_2 = \\frac{20}{0.6} \\approx 33.3$ cm gives $\\frac1v = 0.03 - 0.0167$, $v = 75$ cm." },
        { text: "One image, at the average focal length", feedback: "Each half focuses with its own index, so there are two images." },
        { text: "Two images, at 40 cm and 33.3 cm", feedback: "Those are the focal lengths. The object is at 60 cm, not at infinity." },
      ],
      hint: "Each half acts as a lens of its own (lensmaker's equation, 1.1), on the same axis.",
    },
  ]),
};

export const ompChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
