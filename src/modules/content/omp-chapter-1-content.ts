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
    {
      type: "text",
      content:
        "**Worked example 1 (equiconvex lens in air).** $R = 20$ cm for both faces, $n = 1.5$.\n\n1. Light meets the first face; its centre is inside the lens, to the right: $R_1 = +20$ cm. The second face's centre is to the left: $R_2 = -20$ cm. *Why this step:* a biconvex lens has radii of opposite sign, and forgetting that gives $\\frac1{R_1} - \\frac1{R_2} = 0$.\n2. $\\frac1f = (1.5 - 1)\\left(\\frac1{20} + \\frac1{20}\\right) = 0.5 \\times 0.1 = 0.05$ cm$^{-1}$.\n3. $f = +20$ cm: converging.\n\n**Worked example 2 (the same lens in water).** Water $n_w = \\frac43$.\n\n1. Relative index: $n = \\frac{1.5}{4/3} = \\frac98$, so $n - 1 = \\frac18$. *Why this step:* bending at each face depends on the ratio of indices.\n2. $\\frac1f = \\frac18 \\times 0.1 = \\frac1{80}$, so $f = 80$ cm: four times longer. The ratio is $\\frac{0.5}{0.125} = 4$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a meniscus).** A concavo-convex lens ($n = 1.5$) has its first face of radius 10 cm and its second of radius 20 cm, both centres on the far side (to the right).\n\n1. $R_1 = +10$ cm, $R_2 = +20$ cm.\n2. $\\frac1f = 0.5\\left(\\frac1{10} - \\frac1{20}\\right) = 0.5 \\times 0.05 = 0.025$ cm$^{-1}$, $f = +40$ cm. The more strongly curved face wins, and it is convex, so the lens converges. Spectacle lenses are usually menisci.\n\n**Worked example 4 (an air bubble).** A thin lens-shaped air bubble (biconvex, both radii 12 cm) sits in water.\n\n1. Relative index $n = \\frac{1}{4/3} = \\frac34$, so $n - 1 = -\\frac14$.\n2. $\\frac1f = -\\frac14\\left(\\frac1{12} + \\frac1{12}\\right) = -\\frac1{24}$, so $f = -24$ cm: a **diverging** lens, although it is convex in shape. *Why this step:* the lens is now the rarer medium, so every bend reverses.\n\n**Worked example 5 (finding a radius, CBSE).** A plano-convex lens of glass ($n = 1.5$) has $f = 40$ cm. Find the radius of the curved face.\n\n1. With the flat face $R = \\infty$: $\\frac1{40} = 0.5\\cdot\\frac1R$.\n2. $R = 20$ cm. It does not matter which face faces the light: $|\\frac1{R_1} - \\frac1{R_2}| = \\frac1{20}$ either way.",
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
    },
    {
      type: "quiz",
      id: "omp1-1-q2",
      variant: "practice",
      question: "A glass lens ($n = 1.5$) has $f = 15$ cm in air. What is its focal length in water ($n = \\frac43$)?",
      options: [
        { text: "20 cm", feedback: "That scales $f$ by $n_w = \\frac43$. The factor is $(n - 1)$, which changes from 0.5 to 0.125." },
        { text: "11.25 cm", feedback: "The lens gets weaker in water, not stronger: $n - 1$ shrinks." },
        { text: "60 cm", correct: true, feedback: "$\\frac{f_w}{f_a} = \\frac{n_g - 1}{n_g/n_w - 1} = \\frac{0.5}{0.125} = 4$." },
        { text: "$-60$ cm", feedback: "Glass is still denser than water, so the lens still converges." },
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
    },
    {
      type: "quiz",
      id: "omp1-1-q6",
      variant: "practice",
      question: "A thin equiconvex glass lens ($n = 1.5$, both radii 20 cm) forms a window with air on the left and water ($n = \\frac43$) on the right. Parallel light arrives from the air side. Where does it focus?",
      options: [
        { text: "20 cm into the water", feedback: "That is the focal length with air on both sides. The water changes the second refraction." },
        { text: "40 cm into the water", correct: true, feedback: "$\\frac{4/3}{v} = \\frac{1.5 - 1}{20} + \\frac{4/3 - 1.5}{-20} = \\frac1{40} + \\frac1{120} = \\frac1{30}$, so $v = 40$ cm." },
        { text: "80 cm into the water", feedback: "That is the lens fully immersed in water. Here the first surface still has air in front of it." },
        { text: "30 cm into the water", feedback: "$\\frac{n_3}{v} = \\frac1{30}$ gives $v = 30n_3 = 40$ cm; you dropped the $n_3 = \\frac43$ on the left." },
      ],
      hint: "Use $\\frac{n_3}{v} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R_1} + \\frac{n_3 - n_2}{R_2}$ with $u \\to -\\infty$.",
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
    {
      type: "text",
      content:
        "**A second derivation, from similar triangles.** Object AB at distance $|u|$ to the left of a converging lens, real inverted image A'B' at $v$ on the right. The ray from A through the optical centre O goes straight on (the centre of a thin lens is like a thin parallel slab), so triangles ABO and A'B'O are similar:",
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
    {
      type: "text",
      content:
        "**Worked example 1 (a virtual image).** An object is 10 cm from a convex lens of focal length 15 cm.\n\n1. $u = -10$ cm, $f = +15$ cm.\n2. $\\frac1v = \\frac1f + \\frac1u = \\frac1{15} - \\frac1{10} = \\frac{2 - 3}{30} = -\\frac1{30}$, so $v = -30$ cm. *Why this step:* rearranging $\\frac1v - \\frac1u = \\frac1f$ gives $\\frac1v = \\frac1f + \\frac1u$, a plus sign that traps many students.\n3. $m = \\frac vu = \\frac{-30}{-10} = +3$: virtual, erect, three times larger, on the object's side. That is a magnifying glass.\n\n**Worked example 2 (a real image).** Object 30 cm from a convex lens of $f = 20$ cm.\n\n1. $\\frac1v = \\frac1{20} - \\frac1{30} = \\frac1{60}$, $v = +60$ cm.\n2. $m = \\frac{60}{-30} = -2$: real, inverted, double size, on the far side.\n\n**Worked example 3 (concave lens).** Object 20 cm from a concave lens of focal length 20 cm.\n\n1. $f = -20$, $u = -20$. $\\frac1v = -\\frac1{20} - \\frac1{20} = -\\frac1{10}$, $v = -10$ cm.\n2. $m = \\frac{-10}{-20} = +0.5$: virtual, erect, half size.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (displacement method, JEE Main).** Object and screen are 100 cm apart. Sharp images appear for two lens positions 20 cm apart, and the two images are 9 mm and 4 mm tall.\n\n1. $f = \\frac{D^2 - x^2}{4D} = \\frac{10000 - 400}{400} = 24$ cm.\n2. Check the positions: $a, b = \\frac{100 \\pm 20}{2} = 60, 40$ cm, and $\\frac{60 \\times 40}{100} = 24$. ✓\n3. Object height $h = \\sqrt{9 \\times 4} = 6$ mm. *Why this step:* the two magnifications are reciprocals, $\\frac{60}{40}$ and $\\frac{40}{60}$, so $h_1h_2 = h^2$.\n\n**Worked example 5 (shortest throw).** What is the minimum distance between a real object and its real image for a lens of $f = 15$ cm? $D_{\\min} = 4f = 60$ cm, with the object at $2F_1$ (30 cm) and the image at $2F_2$ (30 cm).",
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
    },
    {
      type: "quiz",
      id: "omp1-2-q2",
      variant: "practice",
      question: "An object is 30 cm from a concave lens of focal length 15 cm. Where is the image?",
      options: [
        { text: "30 cm on the far side, same size", feedback: "That would be a convex lens with the object at $2F$. A concave lens never makes real images of real objects." },
        { text: "10 cm from the lens on the object's side, one-third size", correct: true, feedback: "$\\frac1v = -\\frac1{15} - \\frac1{30} = -\\frac1{10}$, $m = \\frac{-10}{-30} = \\frac13$." },
        { text: "30 cm on the object's side", feedback: "Check the sum: $-\\frac1{15} - \\frac1{30} = -\\frac{3}{30}$." },
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
    },
    {
      type: "quiz",
      id: "omp1-2-q4",
      variant: "practice",
      question: "Object and screen are 90 cm apart. Sharp images form for two lens positions 30 cm apart. What is $f$?",
      options: [
        { text: "22.5 cm", feedback: "That is $D/4$, which only holds when the two positions coincide ($x = 0$)." },
        { text: "20 cm", correct: true, feedback: "$f = \\frac{90^2 - 30^2}{4 \\times 90} = \\frac{7200}{360} = 20$ cm." },
        { text: "15 cm", feedback: "Recheck: $8100 - 900 = 7200$ and $4 \\times 90 = 360$." },
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
    {
      type: "text",
      content:
        "**Derivation: lenses in contact.** Two thin lenses $f_1$ and $f_2$ touch. Lens 1 forms an image at $v_1$: $\\frac1{v_1} - \\frac1u = \\frac1{f_1}$. That image is the object for lens 2, at the same place because the separation is zero: $\\frac1v - \\frac1{v_1} = \\frac1{f_2}$. Add:",
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
    {
      type: "text",
      content:
        "**Separated lenses.** If the lenses are a distance $d$ apart, the image of lens 1 is no longer at the same place for lens 2, and the combination behaves like a single lens of",
    },
    { type: "math", latex: "\\frac1F = \\frac1{f_1} + \\frac1{f_2} - \\frac{d}{f_1f_2}" },
    {
      type: "text",
      content:
        "This equivalent lens is not located at either lens, so for actual image positions the reliable method is **two steps**: find the image of lens 1, shift the origin to lens 2, and use that image as the object (a virtual object if the light reaches lens 2 before converging).",
    },
    {
      type: "text",
      content:
        "**Silvered lens.** Silver the back face of a lens. Light passes through the lens, reflects off the silvered face, and passes back through the lens: three thin elements in contact. The system is a **mirror** whose power (converging counted positive) is",
    },
    { type: "math", latex: "P_{\\text{eq}} = 2P_L + P_M, \\qquad P_M = \\frac{1}{|f_{\\text{mirror}}|} \\text{ for a concave reflecting face, } 0 \\text{ for a flat one}" },
    {
      type: "text",
      content:
        "If $P_{\\text{eq}} > 0$ it behaves as a concave mirror of focal length $\\frac{1}{P_{\\text{eq}}}$ (in the New Cartesian convention that focal length is negative).\n\n**Cutting a lens.** Cut a biconvex lens **along** its axis (into left and right halves of the disc, each still biconvex): each half keeps both curvatures, so $f$ is unchanged; only the light gathered is halved. Cut it **across** the axis (into two thinner plano-convex lenses): each half has one curved face instead of two, so $\\frac1{f'} = \\frac{1}{2}\\cdot\\frac1f$, i.e. $f' = 2f$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a prescription).** Lenses of $+5$ D and $-2$ D are placed in contact.\n\n1. $P = 5 + (-2) = +3$ D. *Why this step:* in contact, powers add with their signs.\n2. $F = \\frac1{3}$ m $\\approx 33.3$ cm, converging.\n\n**Worked example 2 (silvered plano-convex lens, JEE Main).** A plano-convex lens ($R = 20$ cm, $n = 1.5$) is silvered on its **flat** face.\n\n1. Lens: $\\frac1{f_L} = 0.5 \\times \\frac1{20}$, so $f_L = 40$ cm, $P_L = \\frac1{40}$ cm$^{-1}$.\n2. Flat mirror: $P_M = 0$.\n3. $P_{\\text{eq}} = \\frac{2}{40} = \\frac1{20}$ cm$^{-1}$: a concave mirror of focal length 20 cm, i.e. $\\frac{R}{2(n - 1)}$. *Why this step:* light crosses the lens twice, so the lens counts twice.\n4. Silvered on the **curved** face instead: $P_M = \\frac{1}{R/2} = \\frac1{10}$, so $P_{\\text{eq}} = \\frac2{40} + \\frac1{10} = \\frac{3}{20}$ cm$^{-1}$ and $F = \\frac{20}{3} \\approx 6.7$ cm $= \\frac{R}{2n}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (two lenses 10 cm apart, two-step method).** Two convex lenses, each $f = 20$ cm, are 10 cm apart. An object is 60 cm in front of the first.\n\n1. Lens 1: $\\frac1{v_1} = \\frac1{20} - \\frac1{60} = \\frac1{30}$, $v_1 = 30$ cm, $m_1 = \\frac{30}{-60} = -\\frac12$.\n2. Move the origin to lens 2. The light would converge 30 cm past lens 1, which is 20 cm past lens 2: a **virtual object** at $u_2 = +20$ cm. *Why this step:* the converging light meets lens 2 before its image forms, so the object is on the positive side.\n3. Lens 2: $\\frac1v = \\frac1{20} + \\frac1{20} = \\frac1{10}$, $v = 10$ cm past lens 2, $m_2 = \\frac{10}{20} = \\frac12$.\n4. Final image: real, 10 cm beyond lens 2, $m = m_1m_2 = -\\frac14$.\n5. For comparison, $\\frac1F = \\frac1{20} + \\frac1{20} - \\frac{10}{400} = \\frac{3}{40}$, $F \\approx 13.3$ cm. That number alone does not tell you where the image is; the two-step method does.",
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
    {
      type: "quiz",
      id: "omp1-3-q1",
      variant: "practice",
      question: "What is the power of a concave lens of focal length 25 cm?",
      options: [
        { text: "$+4$ D", feedback: "A concave lens diverges, so its power is negative." },
        { text: "$-0.04$ D", feedback: "Use metres: 25 cm $= 0.25$ m." },
        { text: "$-4$ D", correct: true, feedback: "$P = \\frac{1}{-0.25\\text{ m}} = -4$ D." },
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
    },
    {
      type: "quiz",
      id: "omp1-3-q3",
      variant: "practice",
      question: "A plano-convex lens ($R = 30$ cm, $n = 1.5$) is silvered on its flat face. What is the focal length of the resulting mirror?",
      options: [
        { text: "60 cm", feedback: "That is the lens alone. Light passes through it twice." },
        { text: "30 cm (concave)", correct: true, feedback: "$f_L = 60$ cm; $P = \\frac2{60}$, so $F = 30$ cm $= \\frac{R}{2(n - 1)}$." },
        { text: "10 cm", feedback: "That is $\\frac{R}{2n}$, the result when the **curved** face is silvered." },
        { text: "15 cm", feedback: "That treats the curved face as a mirror of $f = R/2$. The silver is on the flat face." },
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
    },
    {
      type: "quiz",
      id: "omp1-3-q5",
      variant: "practice",
      question: "Two convex lenses, each of focal length 10 cm, are placed 5 cm apart. What is the equivalent focal length?",
      options: [
        { text: "5 cm", feedback: "That is the in-contact answer. The 5 cm gap adds $-\\frac{d}{f_1f_2}$." },
        { text: "20 cm", feedback: "Two converging lenses make a stronger system, so $F$ is shorter than 10 cm." },
        { text: "$\\frac{20}{3} \\approx 6.7$ cm", correct: true, feedback: "$\\frac1F = \\frac1{10} + \\frac1{10} - \\frac{5}{100} = \\frac{15}{100}$." },
      ],
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
    {
      type: "text",
      content:
        "**Minimum deviation by symmetry.** Light paths are reversible. If a ray entering at $i$ leaves at $e$, a ray entering at $e$ leaves at $i$ with the **same** deviation. So every value of $\\delta$ (except one) is produced by two angles of incidence, $i$ and $e$. The single exception, the turning point of the curve, must be where the two coincide: $i = e$. Then $r_1 = r_2 = \\frac A2$, and from $\\delta_m = 2i - A$, $i = \\frac{A + \\delta_m}{2}$. Snell at the first face gives the prism formula.",
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
    {
      type: "text",
      content:
        "**When no light emerges.** At the second face the ray is leaving glass, so if $r_2 > \\theta_c$ it is totally reflected. The smallest $r_2$ you can get is when $r_1$ is as large as possible, $r_1 = \\theta_c$ (grazing incidence, $i = 90^\\circ$), which gives $r_2 = A - \\theta_c$. If even that exceeds $\\theta_c$, nothing ever emerges:",
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
    {
      type: "text",
      content:
        "**Worked example 1 (measuring $n$).** A prism of $A = 60^\\circ$ gives $\\delta_m = 30^\\circ$.\n\n1. $\\frac{A + \\delta_m}{2} = 45^\\circ$ and $\\frac A2 = 30^\\circ$.\n2. $n = \\frac{\\sin 45^\\circ}{\\sin 30^\\circ} = \\frac{1/\\sqrt2}{1/2} = \\sqrt2 \\approx 1.414$. *Why this step:* at minimum deviation both refractions are symmetric, so one Snell equation with $r = A/2$ is enough.\n\n**Worked example 2 (the angles at minimum deviation).** For $A = 60^\\circ$, $n = 1.5$:\n\n1. $r_1 = 30^\\circ$, $\\sin i = 1.5 \\times 0.5 = 0.75$, $i = 48.6^\\circ$.\n2. $\\delta_m = 2i - A = 97.2^\\circ - 60^\\circ = 37.2^\\circ$. That is the bottom of the curve you saw.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (grazing emergence).** For the same prism ($A = 60^\\circ$, $n = 1.5$), find the smallest angle of incidence for which light emerges.\n\n1. $\\theta_c = \\sin^{-1}\\frac{1}{1.5} = 41.8^\\circ$. The ray just gets out when $r_2 = \\theta_c$ (then $e = 90^\\circ$, grazing).\n2. $r_1 = A - r_2 = 60^\\circ - 41.8^\\circ = 18.2^\\circ$.\n3. $\\sin i = 1.5\\sin 18.2^\\circ = 1.5 \\times 0.312 = 0.468$, so $i \\approx 27.9^\\circ$. *Why this step:* smaller $i$ means smaller $r_1$ and bigger $r_2$, so below this angle the ray is trapped.\n\n**Worked example 4 (normal incidence, JEE Main).** A ray falls normally on one face of a $30^\\circ$ prism of index $\\sqrt2$.\n\n1. Normal incidence: $i = 0$, $r_1 = 0$, so $r_2 = A = 30^\\circ$.\n2. $\\sin e = \\sqrt2\\sin 30^\\circ = \\frac{\\sqrt2}{2}$, so $e = 45^\\circ$.\n3. $\\delta = i + e - A = 0 + 45^\\circ - 30^\\circ = 15^\\circ$.\n\n**Worked example 5 (thin prism).** A $5^\\circ$ prism with $n = 1.5$: $\\delta = 0.5 \\times 5^\\circ = 2.5^\\circ$, whatever the (small) angle of incidence.",
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
    },
    {
      type: "quiz",
      id: "omp1-4-q2",
      variant: "practice",
      question: "A thin prism of angle $4^\\circ$ is made of glass with $n = 1.6$. What is its deviation?",
      options: [
        { text: "$6.4^\\circ$", feedback: "That is $nA$. The deviation is $(n - 1)A$." },
        { text: "$1.6^\\circ$", feedback: "Multiply $A$ by $(n - 1) = 0.6$, not by 0.4." },
        { text: "$2.4^\\circ$", correct: true, feedback: "$\\delta = (n - 1)A = 0.6 \\times 4^\\circ$." },
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
    },
    {
      type: "quiz",
      id: "omp1-4-q4",
      variant: "practice",
      question: "A prism with $A = 60^\\circ$ and $n = \\sqrt2$ is set for minimum deviation. What are $i$ and $\\delta_m$?",
      options: [
        { text: "$i = 45^\\circ$, $\\delta_m = 30^\\circ$", correct: true, feedback: "$\\sin i = \\sqrt2\\sin 30^\\circ = \\frac{1}{\\sqrt2}$, $\\delta_m = 2i - A$." },
        { text: "$i = 30^\\circ$, $\\delta_m = 0^\\circ$", feedback: "$30^\\circ$ is $r_1 = A/2$, the angle inside the glass, not $i$." },
        { text: "$i = 60^\\circ$, $\\delta_m = 60^\\circ$", feedback: "That would need $n = \\sqrt3$." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-4-q5",
      variant: "practice",
      question: "For glass of $n = 1.5$ ($\\theta_c \\approx 41.8^\\circ$), which prism angle lets no light emerge from the second face, whatever the angle of incidence?",
      options: [
        { text: "$30^\\circ$", feedback: "$30^\\circ < 2\\theta_c$: most incidences get through." },
        { text: "$85^\\circ$", correct: true, feedback: "$85^\\circ > 2\\theta_c = 83.6^\\circ$, so even grazing incidence leaves $r_2 > \\theta_c$." },
        { text: "$60^\\circ$", feedback: "$60^\\circ < 83.6^\\circ$: light emerges for $i > 27.9^\\circ$." },
        { text: "$45^\\circ$", feedback: "$45^\\circ < 2\\theta_c$, so some rays emerge." },
      ],
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
    {
      type: "text",
      content:
        "**Why $n$ depends on colour.** In glass, the electric field of the light makes bound electrons oscillate, and the re-radiated waves slow the light down. Electrons in glass have natural frequencies in the ultraviolet, so higher-frequency (bluer) light is closer to resonance and is slowed more. Across the visible range the result is well described by **Cauchy's relation**:",
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
    {
      type: "text",
      content:
        "**Combining prisms.** Put two thin prisms together, apex to base (so their deviations oppose). Net deviation and net dispersion are the sums with signs:",
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
      type: "text",
      content:
        "**Worked example 1 (a crown prism).** A thin crown-glass prism of angle $5^\\circ$ has $n_v = 1.523$, $n_r = 1.513$ and mean $n = 1.518$.\n\n1. Mean deviation: $\\delta = 0.518 \\times 5^\\circ = 2.59^\\circ$.\n2. Angular dispersion: $\\theta = (1.523 - 1.513) \\times 5^\\circ = 0.05^\\circ$. *Why this step:* the violet and red rays each obey $\\delta = (n - 1)A$; their difference only needs $n_v - n_r$.\n3. Dispersive power: $\\omega = \\frac{0.010}{0.518} \\approx 0.0193$, the same for any crown prism of this glass.\n\n**Worked example 2 (making it achromatic, JEE Main).** A $6^\\circ$ prism of the same crown glass ($n_v - n_r = 0.010$, $n = 1.518$) is to be paired with a flint prism ($n_v = 1.665$, $n_r = 1.645$, $n = 1.655$) to cancel dispersion.\n\n1. Zero net dispersion: $0.010 \\times 6^\\circ = 0.020 \\times A'$, so $A' = 3^\\circ$, placed the other way up. *Why this step:* the opposite orientation gives the flint prism's dispersion the opposite sign.\n2. Net deviation: $0.518 \\times 6^\\circ - 0.655 \\times 3^\\circ = 3.108^\\circ - 1.965^\\circ \\approx 1.14^\\circ$. The pair still bends light, but without colour fringes.\n3. For a direct-vision pair instead: $0.518 \\times 6^\\circ = 0.655A'$ gives $A' \\approx 4.75^\\circ$, and the net dispersion is $0.06^\\circ - 0.095^\\circ \\ne 0$.",
    },
    {
      type: "text",
      content:
        "**Scattering.** Air molecules are far smaller than the wavelength of light. Light makes their electrons oscillate, and they re-radiate in all directions. For such small scatterers (Rayleigh scattering), the scattered intensity goes as $\\frac{1}{\\lambda^4}$, so blue is scattered much more than red.\n- **Blue sky:** looking away from the Sun, you see sunlight scattered sideways by air, dominated by blue (violet is scattered even more, but sunlight has less of it and our eyes are less sensitive to it).\n- **Red sunrise and sunset:** sunlight crosses far more air near the horizon; the blue is scattered out of the direct beam and the red remains.\n- **White clouds:** droplets are much larger than $\\lambda$, and large particles scatter all colours about equally.\n- **Rainbow:** dispersion plus one total internal reflection inside each raindrop sends different colours out at slightly different angles (about $42^\\circ$ for red, $40^\\circ$ for violet from the anti-solar point).",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (how much bluer?).** Compare Rayleigh scattering of 400 nm and 700 nm light.\n\n1. $\\frac{I_{400}}{I_{700}} = \\left(\\frac{700}{400}\\right)^4 = 1.75^4$.\n2. $1.75^2 = 3.0625$, and $3.0625^2 \\approx 9.4$. Violet-blue light is scattered about 9 times more strongly than red. *Why this step:* a fourth power turns a modest wavelength ratio into a large intensity ratio.",
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
    },
    {
      type: "quiz",
      id: "omp1-5-q2",
      variant: "practice",
      question: "For a glass, $n_v = 1.66$, $n_r = 1.64$ and $n_y = 1.65$. What is its dispersive power?",
      options: [
        { text: "about 0.012", feedback: "You divided by $n_y = 1.65$. The denominator is $n_y - 1$." },
        { text: "0.02", feedback: "That is $n_v - n_r$ alone. Dispersive power divides it by $n - 1$." },
        { text: "about 0.031", correct: true, feedback: "$\\omega = \\frac{0.02}{0.65} \\approx 0.031$." },
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
    },
    {
      type: "quiz",
      id: "omp1-5-q5",
      variant: "practice",
      question: "By what factor is 400 nm light scattered more than 800 nm light by air molecules?",
      options: [
        { text: "16", correct: true, feedback: "$\\left(\\frac{800}{400}\\right)^4 = 2^4$." },
        { text: "2", feedback: "Rayleigh scattering goes as $\\lambda^{-4}$, not $\\lambda^{-1}$." },
        { text: "4", feedback: "That is $\\lambda^{-2}$. The power is 4." },
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
      type: "text",
      content:
        "**Worked example 1 (myopia).** A student cannot see clearly beyond 80 cm. What lens does she need?\n\n1. Distant objects ($u = -\\infty$) must appear at her far point: $v = -80$ cm. *Why this step:* the lens's job is to move the image into the range her eye can focus.\n2. $\\frac1f = \\frac1{-80} - \\frac1{-\\infty} = -\\frac1{80}$, so $f = -80$ cm.\n3. $P = \\frac{1}{-0.80} = -1.25$ D, a diverging lens.\n\n**Worked example 2 (hypermetropia).** A man's near point is 75 cm. He wants to read at 25 cm.\n\n1. Object at $u = -25$ cm must have its image at $v = -75$ cm (his near point).\n2. $\\frac1f = \\frac1{-75} - \\frac1{-25} = -\\frac1{75} + \\frac3{75} = \\frac2{75}$, so $f = 37.5$ cm.\n3. $P = \\frac{1}{0.375} \\approx +2.67$ D, a converging lens.",
    },
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
      type: "text",
      content:
        "**Worked example 3 (a magnifier, JEE Main).** A lens of $f = 5$ cm is used as a magnifier.\n\n1. Image at the near point: $M = 1 + \\frac{25}{5} = 6$. The object is at $\\frac1{|u|} = \\frac15 + \\frac1{25} = \\frac{6}{25}$, $|u| \\approx 4.17$ cm.\n2. Image at infinity: $M = \\frac{25}{5} = 5$, object at 5 cm. *Why this step:* the relaxed-eye setting trades one unit of magnification for comfort.\n\n**Worked example 4 (presbyopia).** A 50-year-old's near point has moved to 50 cm. Reading glasses: $u = -25$, $v = -50$: $\\frac1f = -\\frac1{50} + \\frac1{25} = \\frac1{50}$, $f = 50$ cm, $P = +2$ D.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a magnifying glass makes the object bigger\"",
      content:
        "The object is unchanged, and the image's physical size does not matter by itself. The lens lets you put the object **closer** than 25 cm and still focus on it, so it subtends a larger angle at your eye. Angular magnification is what counts.",
    },
    {
      type: "quiz",
      id: "omp1-6-q1",
      variant: "practice",
      question: "A myopic person's far point is 50 cm. What lens lets them see distant objects clearly?",
      options: [
        { text: "$+2$ D", feedback: "Myopia needs a diverging lens to push the image of distant objects in to the far point." },
        { text: "$-2$ D", correct: true, feedback: "$f = -50$ cm, so $P = \\frac{1}{-0.5} = -2$ D." },
        { text: "$-0.5$ D", feedback: "Power uses metres: $\\frac{1}{0.5} = 2$, not $0.5$." },
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
    },
    {
      type: "quiz",
      id: "omp1-6-q3",
      variant: "practice",
      question: "A lens of focal length 10 cm is used as a simple microscope with the image at the near point (25 cm). What is the magnification?",
      options: [
        { text: "2.5", feedback: "That is the image-at-infinity value $D/f$." },
        { text: "3.5", correct: true, feedback: "$M = 1 + \\frac{25}{10}$." },
        { text: "0.4", feedback: "That is $f/D$, upside down." },
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
    {
      type: "text",
      content:
        "**Compound microscope.** The object sits just outside the focus of a short-focus objective ($f_o$ small), which forms a real, inverted, much magnified image. That image lies just inside the focus of the eyepiece, which acts as a simple microscope. The total magnification is the product:",
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
    {
      type: "text",
      content:
        "**Worked example 1 (compound microscope, JEE Main).** $f_o = 1$ cm, $f_e = 5$ cm, object 1.1 cm from the objective.\n\n1. Objective: $\\frac1{v_o} = \\frac11 - \\frac1{1.1} = \\frac{0.1}{1.1}$, so $v_o = 11$ cm and $m_o = \\frac{11}{-1.1} = -10$.\n2. Final image at the near point: $M_e = 1 + \\frac{25}{5} = 6$, so $M = -60$. The eyepiece's object is at $\\frac1{|u_e|} = \\frac15 + \\frac1{25}$, $|u_e| \\approx 4.17$ cm, so the lenses are $11 + 4.17 \\approx 15.2$ cm apart.\n3. Final image at infinity: $M_e = 5$, $M = -50$, lens separation $11 + 5 = 16$ cm. *Why this step:* here $L = v_o - f_o = 10$ cm and $\\frac{L}{f_o}\\frac{D}{f_e} = 10 \\times 5 = 50$, the approximate formula agrees.\n\n**Worked example 2 (telescope).** $f_o = 150$ cm, $f_e = 5$ cm.\n\n1. Normal adjustment: $M = \\frac{150}{5} = 30$, tube length $L = 155$ cm.\n2. Final image at 25 cm: $M = 30\\left(1 + \\frac{5}{25}\\right) = 36$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (image of the Moon).** The Moon (diameter $3.48\\times10^6$ m) is $3.8\\times10^8$ m away. How big is its image formed by the objective above?\n\n1. Angle subtended: $\\alpha = \\frac{3.48\\times10^6}{3.8\\times10^8} \\approx 9.2\\times10^{-3}$ rad. *Why this step:* for a distant object, only the angle matters, and the image of angular size $\\alpha$ at the focus has height $f_o\\alpha$.\n2. Image diameter $= f_o\\alpha = 1.5 \\times 9.2\\times10^{-3} \\approx 1.4\\times10^{-2}$ m, about 1.4 cm. The eyepiece then views this 1.4 cm image from a few cm away.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a telescope makes the image bigger than the object\"",
      content:
        "The image of the Moon is about 1.4 cm across; the Moon is 3480 km. The telescope makes a tiny image **close to your eye**, so that it subtends a larger angle than the Moon does. Angular magnification, not size, is the point.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the objective of a microscope has the larger focal length\"",
      content:
        "In a microscope the objective has the **shorter** focal length (a few mm), because $|m_o| \\approx \\frac{L}{f_o}$. In a telescope it is the opposite: the objective's focal length is long, because $M = \\frac{f_o}{f_e}$.",
    },
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
    },
    {
      type: "quiz",
      id: "omp1-7-q2",
      variant: "practice",
      question: "A microscope's objective gives $m_o = -8$. The eyepiece has $f_e = 5$ cm and the final image is at infinity. What is the magnitude of the magnifying power?",
      options: [
        { text: "40", correct: true, feedback: "$8 \\times \\frac{25}{5}$." },
        { text: "48", feedback: "That uses $1 + \\frac{D}{f_e} = 6$, the near-point value." },
        { text: "13", feedback: "Magnifications multiply; they do not add." },
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
    },
    {
      type: "quiz",
      id: "omp1-7-q5",
      variant: "practice",
      question: "A telescope has $f_o = 100$ cm and $f_e = 5$ cm, with the final image at the near point (25 cm). What is its magnifying power?",
      options: [
        { text: "20", feedback: "That is normal adjustment. With the image at the near point there is an extra factor $1 + \\frac{f_e}{D}$." },
        { text: "24", correct: true, feedback: "$20\\left(1 + \\frac{5}{25}\\right) = 24$." },
        { text: "120", feedback: "The factor is $1 + \\frac{f_e}{D}$, not $1 + \\frac{D}{f_e}$." },
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
      type: "quiz",
      id: "omp1-8-q1",
      variant: "mastery",
      question: "A biconvex glass lens ($n = 1.5$) has $f = 10$ cm in air. What is its focal length in a liquid of index 1.25?",
      options: [
        { text: "12.5 cm", feedback: "That scales $f$ by the liquid's index. The factor is $\\frac{n - 1}{n_{\\text{rel}} - 1}$." },
        { text: "40 cm", feedback: "That uses water's $\\frac43$ rather than 1.25." },
        { text: "$-25$ cm", feedback: "Glass (1.5) is still denser than the liquid (1.25), so the lens still converges." },
        { text: "25 cm", correct: true, feedback: "$n_{\\text{rel}} = 1.2$; $f$ scales by $\\frac{0.5}{0.2} = 2.5$." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-8-q2",
      variant: "mastery",
      question: "An object 2 cm tall is 20 cm from a convex lens of focal length 15 cm. Describe the image.",
      options: [
        { text: "Virtual, erect, 60 cm on the object's side, 6 cm tall", feedback: "The object is beyond F, so the image is real." },
        { text: "Real, inverted, 60 cm beyond the lens, 6 cm tall", correct: true, feedback: "$\\frac1v = \\frac1{15} - \\frac1{20} = \\frac1{60}$, $m = \\frac{60}{-20} = -3$." },
        { text: "Real, inverted, 8.6 cm beyond the lens", feedback: "That adds the reciprocals. $\\frac1v = \\frac1f + \\frac1u$ with $u = -20$." },
      ],
    },
    {
      type: "quiz",
      id: "omp1-8-q3",
      variant: "mastery",
      question: "Object and screen are 80 cm apart. Two lens positions 40 cm apart both give sharp images. What is $f$?",
      options: [
        { text: "20 cm", feedback: "That is $D/4$, the limiting case where the two positions coincide." },
        { text: "10 cm", feedback: "Recompute $D^2 - x^2 = 4800$ and $4D = 320$." },
        { text: "15 cm", correct: true, feedback: "$\\frac{6400 - 1600}{320} = 15$ cm. Check: positions 60 and 20 cm, $\\frac{60 \\times 20}{80} = 15$." },
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
    },
    {
      type: "quiz",
      id: "omp1-8-q8",
      variant: "mastery",
      question: "A person cannot see objects beyond 2 m clearly. What power of lens is needed?",
      options: [
        { text: "$-0.5$ D", correct: true, feedback: "$f = -2$ m images infinity at the far point." },
        { text: "$+0.5$ D", feedback: "Myopia needs a diverging lens." },
        { text: "$-2$ D", feedback: "$-2$ is the focal length in metres; $P = \\frac{1}{-2}$." },
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
    },
    {
      type: "quiz",
      id: "omp1-8-q10",
      variant: "mastery",
      question: "A telescope has $f_o = 120$ cm and $f_e = 5$ cm and is adjusted so the final image is at 25 cm. What is its magnifying power?",
      options: [
        { text: "24", feedback: "That is normal adjustment." },
        { text: "144", feedback: "The extra factor is $1 + \\frac{f_e}{D} = 1.2$, not $1 + \\frac{D}{f_e} = 6$." },
        { text: "28.8", correct: true, feedback: "$24\\left(1 + \\frac{5}{25}\\right) = 28.8$." },
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
