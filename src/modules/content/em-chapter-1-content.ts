import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Electricity and Magnetism Chapter 1 — Gauss's Law and Electric Potential.
 * Two new ways of reading the field: flux and Gauss's law turn symmetric
 * problems into one line; potential turns vectors into scalars and forces
 * into energy. Conductors close the chapter, where both ideas meet.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "electric-flux",
  title: "1.1 · Electric Flux",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/em-1-gauss-law-and-potential.mp4",
      poster: "/videos/em-1-gauss-law-and-potential.jpg",
      title: "Chapter 1 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Rain is falling straight down and you hold a window frame out in it. Held flat (facing the sky), the frame catches the most rain. Tilt it and less passes through. Hold it vertical and the rain slides past without going through at all. How much rain passes depends on three things: how hard it is raining, how big the frame is, and how it is tilted.",
    },
    {
      type: "text",
      content:
        "Replace the rain by field lines and you have **electric flux**: a measure of how much electric field pierces a surface. It is the idea that makes Gauss's law (1.2) possible, and Gauss's law is the fastest route to the field of any symmetric charge distribution.",
    },
    { type: "heading", text: "Flux through a flat surface" },
    {
      type: "text",
      content:
        "**The area vector.** To describe the tilt, give the flat surface a vector $\\vec A$: its size is the area, and its direction is **normal** (perpendicular) to the surface. A flat surface has two normals; for an open surface you pick one and stick to it. For a **closed** surface (a sphere, a cube, a can) the rule is always the **outward** normal.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Electric flux",
      content:
        "For a flat surface in a uniform field: $\\Phi_E = \\vec E\\cdot\\vec A = EA\\cos\\theta$, where $\\theta$ is the angle between $\\vec E$ and the normal.\nFor a curved surface or a non-uniform field, split it into small patches and add: $\\Phi_E = \\displaystyle\\int \\vec E\\cdot d\\vec A$. Unit: N m²/C (or V m). Flux is a **scalar**, and it can be negative.",
    },
    {
      type: "text",
      content:
        "The dot product (from the vectors course) does exactly what the rain did: it keeps only the part of $\\vec E$ that goes **through** the surface, $E\\cos\\theta$, and multiplies by the area. Tilt the area vector below and watch.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "dot",
        a: [4, 0],
        b: [2, 2],
        labels: { a: "\\vec E", b: "\\vec A" },
        readouts: ["dot", "angle"],
        caption:
          "E·A is the flux. Swing the area vector A round: the flux is largest when A lies along E, falls to zero at 90°, and turns negative beyond.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $\\theta = 0$ (field straight through the surface) gives the full $EA$. At $\\theta = 90^\\circ$ the field skims along the surface and the flux is zero. Past $90^\\circ$ the field goes through the surface **against** the chosen normal and the flux is negative. On a closed surface this sign has a clear meaning: positive flux leaves the surface, negative flux enters it.",
    },
    {
      type: "table",
      headers: ["Angle between $\\vec E$ and $\\vec A$", "Flux", "Picture"],
      rows: [
        ["$0$", "$EA$ (largest)", "field straight through, along the normal"],
        ["$60^\\circ$", "$EA/2$", "field slants through"],
        ["$90^\\circ$", "$0$", "field skims along the surface"],
        ["$180^\\circ$", "$-EA$", "field straight through, against the normal (entering, on a closed surface)"],
      ],
    },
    { type: "heading", text: "A closed surface in a uniform field" },
    {
      type: "text",
      content:
        "Put any closed surface, say a cube, in a uniform field with no charge inside. Every field line that enters the cube on one side must leave on the other: lines do not start or stop in empty space. Entering flux is negative, leaving flux is positive, and they are equal in size. So the **net flux is zero**. Keep this in mind: it is half of Gauss's law already.",
    },
    { type: "heading", text: "Worked examples: flat and closed surfaces" },
    {
      type: "worked-example",
      id: "em1-1-we1",
      title: "Worked example 1: a tilted square",
      problem:
        "A square of side 10 cm is in a uniform field of 2000 N/C. Its normal makes $60^\\circ$ with the field. Find the flux.",
      steps: [
        { text: "$A = 0.1^2 = 0.01$ m². *Why this step:* SI throughout, as always." },
        { text: "$\\Phi = EA\\cos60^\\circ = 2000\\times0.01\\times0.5 = 10$ N m²/C." },
        { text: "Careful with the wording. If the question said the **plane** of the square makes $60^\\circ$ with the field, the normal would make $30^\\circ$, and $\\Phi = 20\\cos30^\\circ \\approx 17.3$ N m²/C." },
      ],
      answer: "$\\Phi = 10$ N m²/C",
    },
    {
      type: "worked-example",
      id: "em1-1-we2",
      title: "Worked example 2: components",
      problem:
        "$\\vec E = (3\\hat i + 4\\hat j)$ N/C. Find the flux through a square of area 2 m² lying in the $yz$-plane.",
      steps: [
        { text: "A surface in the $yz$-plane has its normal along $\\hat i$: $\\vec A = 2\\hat i$ m²." },
        { text: "$\\Phi = \\vec E\\cdot\\vec A = (3)(2) + (4)(0) = 6$ N m²/C. *Why this step:* the $\\hat j$ part of the field runs parallel to the square and contributes nothing, exactly like $\\cos90^\\circ = 0$." },
      ],
      answer: "$\\Phi = 6$ N m²/C",
    },
    {
      type: "worked-example",
      id: "em1-1-we3",
      title: "Worked example 3: a hemisphere",
      problem:
        "A hemisphere of radius $R$ sits in a uniform field $E$ that points along its axis of symmetry, into the flat face. Find the flux through the curved surface.",
      steps: [
        { text: "Integrating over the curved surface directly is hard. Instead close the surface with the flat disc. *Why this step:* the hemisphere plus its base is a closed surface with no charge inside, so its net flux is zero." },
        { text: "Through the flat disc: area $\\pi R^2$, field perpendicular to it, so $|\\Phi_{\\text{disc}}| = \\pi R^2E$ (entering)." },
        { text: "Net zero means the curved surface carries the same flux out: $\\Phi_{\\text{curved}} = \\pi R^2E$." },
        { text: "For $R = 10$ cm and $E = 1000$ N/C: $\\pi\\times0.01\\times1000 \\approx 31.4$ N m²/C. The curved area is $2\\pi R^2$, twice the disc, yet the flux is the same: the flux counts lines, and the same lines cross both surfaces." },
      ],
      answer: "$\\Phi_{\\text{curved}} = \\pi R^2E$",
    },
    {
      type: "worked-example",
      id: "em1-1-we4",
      title: "Worked example 4: a cylinder in a uniform field",
      problem:
        "A closed cylinder of radius $r$ is placed with its axis along a uniform field $E$. Find the flux through each end, through the curved side and through the whole surface.",
      steps: [
        { text: "Left end: normal points outward, against $\\vec E$: $\\Phi = -E\\pi r^2$." },
        { text: "Right end: normal along $\\vec E$: $\\Phi = +E\\pi r^2$." },
        { text: "Curved side: every normal is perpendicular to $\\vec E$: $\\Phi = 0$." },
        { text: "Net: $-E\\pi r^2 + E\\pi r^2 + 0 = 0$, as it must be for a closed surface with no charge inside." },
      ],
      answer: "Net flux $0$ ($-E\\pi r^2$ in at one end, $+E\\pi r^2$ out at the other, $0$ through the side)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"zero net flux means zero field on the surface\"",
      content:
        "The cylinder in Worked example 4 has zero net flux, yet the field on its ends is $E$, not zero. Zero **net** flux means as much field leaves as enters. It says nothing about the field at any particular point. The same mistake in reverse, \"there is a field so there must be net flux\", is equally wrong.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "em1-1-q1",
      variant: "practice",
      question: "A flat surface of area 0.5 m² sits in a uniform field of 400 N/C. The field makes $60^\\circ$ with the **normal**. What is the flux through the surface? Give your answer in N m²/C.",
      answer: 100,
      unit: "N m²/C",
      hint: "$\\Phi = EA\\cos\\theta$, with $\\theta$ measured from the normal.",
      solution: "$\\Phi = EA\\cos60^\\circ = 400\\times0.5\\times0.5 = 100$ N m²/C.",
      commonMistakes: [
        { answer: 173.2, tolerance: 0.5, feedback: "That uses $\\sin60^\\circ$. The angle given is with the normal, so use $\\cos$." },
        { answer: 200, feedback: "That is the maximum $EA$, only when the field is along the normal." },
      ],
    },
    {
      type: "numeric",
      id: "em1-1-q2",
      variant: "practice",
      question: "$\\vec E = (2\\hat i - 3\\hat j + \\hat k)$ N/C. What is the flux through a 4 m² square in the $xz$-plane (normal along $+\\hat j$)? Give your answer in N m²/C, with its sign.",
      answer: -12,
      unit: "N m²/C",
      hint: "Write $\\vec A$ as a vector along the normal, then take $\\vec E\\cdot\\vec A$.",
      solution: "$\\vec A = 4\\hat j$ m², so $\\Phi = \\vec E\\cdot\\vec A = (2)(0) + (-3)(4) + (1)(0) = -12$ N m²/C. The minus sign says the field crosses the square against the chosen normal.",
      commonMistakes: [
        { answer: 8, feedback: "That pairs the $\\hat i$ component with the area. The normal of the $xz$-plane is $\\hat j$." },
        { answer: 12, feedback: "Keep the sign: the $\\hat j$ component is $-3$, so the field crosses against the normal." },
        { answer: 14.97, tolerance: 0.05, feedback: "That is $|\\vec E|A = 4\\sqrt{14}$, as if the field were along the normal." },
      ],
    },
    {
      type: "quiz",
      id: "em1-1-q3",
      variant: "concept",
      question: "A closed cube with no charge inside sits in a uniform field. The net flux through it",
      options: [
        { text: "is zero", correct: true, feedback: "Lines entering (negative flux) equal lines leaving (positive flux)." },
        { text: "depends on how the cube is oriented", feedback: "Every line that enters also leaves, whatever the orientation." },
        { text: "is $6EA$, one $EA$ per face", feedback: "Faces parallel to the field carry no flux, and entering flux is negative." },
      ],
      hint: "In a uniform field, does every line that enters the closed surface also leave it? Think of Gauss's law with no charge enclosed.",
    },
    {
      type: "numeric",
      id: "em1-1-q4",
      variant: "practice",
      question: "A hemispherical bowl of radius 20 cm sits in a uniform field of 500 N/C parallel to its axis. What is the size of the flux through the curved surface? Give your answer in N m²/C, to one decimal place.",
      answer: 62.83,
      relTolerance: 0.01,
      unit: "N m²/C",
      hint: "Close the surface with the flat base.",
      solution: "The bowl plus its flat base is a closed surface with no charge inside, so the curved surface carries the same flux as the flat circle: $\\Phi = \\pi R^2E = \\pi(0.2)^2\\times500 = 20\\pi \\approx 62.8$ N m²/C.",
      commonMistakes: [
        { answer: 125.7, feedback: "That uses the curved area $2\\pi R^2$ as if the field crossed it all at right angles. The same lines cross the flat circle of area $\\pi R^2$." },
        { answer: 0, feedback: "The curved surface alone is not closed. Only the hemisphere plus its base has zero net flux." },
      ],
    },
    {
      type: "quiz",
      id: "em1-1-q5",
      variant: "concept",
      question: "The net flux through a closed surface is zero. Which must be true?",
      options: [
        { text: "The field is zero everywhere on the surface.", feedback: "A cube in a uniform field has zero net flux but a non-zero field on every face." },
        { text: "There are no charges anywhere nearby.", feedback: "Charges outside the surface can be anywhere; their lines enter and leave." },
        { text: "As much flux leaves the surface as enters it.", correct: true, feedback: "That is all zero net flux means." },
      ],
      hint: "Net flux counts outward flux minus inward flux. Recall the misconception box: \"zero net flux means zero field on the surface\".",
    },
    {
      type: "quiz",
      id: "em1-1-q6",
      variant: "practice",
      question: "A closed cube of side $a$ has its edges along the axes and one corner at the origin. It sits in a uniform field $\\vec E = E\\hat i$, with no charge inside. Which statements are true? Select all that apply.",
      multiple: true,
      options: [
        { text: "The flux through the face at $x = a$ is $+Ea^2$.", correct: true, feedback: "Its outward normal is $+\\hat i$, along the field: $\\Phi = Ea^2$." },
        { text: "The flux through the face at $x = 0$ is $-Ea^2$.", correct: true, feedback: "Its outward normal is $-\\hat i$, against the field: the lines enter here, so the flux is negative." },
        { text: "The flux through the face at $y = a$ is zero.", correct: true, feedback: "Its normal is $\\hat j$, perpendicular to $\\vec E$: the field skims along it." },
        { text: "The net flux through the cube is $2Ea^2$.", feedback: "That adds the sizes of the two end fluxes. Entering flux is negative: $+Ea^2 - Ea^2 = 0$." },
        { text: "Each of the six faces has flux $Ea^2$, since each has area $a^2$.", feedback: "Flux depends on the tilt as well as the area. Four faces are parallel to the field and carry none." },
      ],
      hint: "Use $\\Phi = \\vec E\\cdot\\vec A$ face by face, with each area vector pointing outward. On which faces is $\\vec E$ perpendicular to $\\vec A$?",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "gauss-law",
  title: "1.2 · Gauss's Law",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Field lines start on positive charges and end on negative ones, and the number of lines is proportional to the charge (0.5). Draw any closed bag around some charges and count lines: every line from a charge inside must cross the bag on its way out; every line from a charge outside that enters the bag also leaves it. So the net number of lines leaving the bag depends only on the charge **inside**. Flux counts lines. That is Gauss's law, and we now make it exact.",
    },
    { type: "heading", text: "Deriving Gauss's law step by step" },
    {
      type: "text",
      content:
        "**Step 1: a point charge at the centre of a sphere.** On a sphere of radius $r$ around $q$, the field has the same size $E = \\dfrac{q}{4\\pi\\varepsilon_0 r^2}$ everywhere and points straight out, along every outward normal. So $\\vec E\\cdot d\\vec A = E\\,dA$ and",
    },
    {
      type: "math",
      latex: "\\oint \\vec E\\cdot d\\vec A = E\\cdot4\\pi r^2 = \\frac{q}{4\\pi\\varepsilon_0 r^2}\\cdot4\\pi r^2 = \\frac{q}{\\varepsilon_0}",
    },
    {
      type: "text",
      content:
        "The $r^2$ cancels. A bigger sphere has more area but a weaker field in exactly the same proportion; this is the $1/r^2$ law at work, and it is why $4\\pi$ was put into $k$.\n\n**Step 2: any closed surface around $q$.** Squash or dent the sphere into any shape. Every line from $q$ still crosses it (an odd number of times; if a line goes out, back in and out again, the extra in and out cancel). The count of lines is unchanged, so the flux is still $q/\\varepsilon_0$.\n\n**Step 3: charges outside.** A line from an outside charge that enters the surface must leave it too: $-1 + 1 = 0$. Outside charges contribute nothing to the **net** flux.\n\n**Step 4: many charges.** Fields superpose, so fluxes add. Only the charges inside count.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Gauss's law",
      content:
        "For any closed surface (a **Gaussian surface**):\n$\\displaystyle\\oint \\vec E\\cdot d\\vec A = \\frac{q_{\\text{enc}}}{\\varepsilon_0}$\nwhere $q_{\\text{enc}}$ is the net charge inside the surface. $\\vec E$ on the left is the **total** field at each point of the surface, produced by all charges, inside and outside.",
    },
    { type: "heading", text: "Charges and cubes" },
    {
      type: "text",
      content:
        "Gauss's law plus symmetry gives the flux through **part** of a surface, a JEE favourite.\n\n- **Charge $q$ at the centre of a cube.** Total flux $q/\\varepsilon_0$; the six faces are identical as seen from $q$, so each gets $\\dfrac{q}{6\\varepsilon_0}$.\n- **Charge at a corner of a cube.** Imagine the 8 cubes that meet at that corner: together they form a big cube with $q$ at its centre, total flux $q/\\varepsilon_0$. By symmetry our cube gets $\\dfrac{q}{8\\varepsilon_0}$. The three faces that touch the corner lie along the field lines (the field is radial from the corner and these faces contain the corner), so their flux is 0. The three far faces share $q/8\\varepsilon_0$ equally: $\\dfrac{q}{24\\varepsilon_0}$ each.\n- **Charge at the centre of a face.** Put a second, identical cube on the other side: together they enclose $q$. So each cube gets $\\dfrac{q}{2\\varepsilon_0}$.\n- **Charge at the midpoint of an edge.** Four cubes share that edge: $\\dfrac{q}{4\\varepsilon_0}$ each.",
    },
    {
      type: "table",
      headers: ["Where $q$ sits", "Flux through the whole cube", "Per face"],
      rows: [
        ["centre", "$q/\\varepsilon_0$", "$q/6\\varepsilon_0$ each"],
        ["centre of a face", "$q/2\\varepsilon_0$", "$0$ through that face; the other five share $q/2\\varepsilon_0$"],
        ["midpoint of an edge", "$q/4\\varepsilon_0$", "$0$ through the two faces sharing the edge"],
        ["corner", "$q/8\\varepsilon_0$", "$0$ through the 3 touching faces; $q/24\\varepsilon_0$ through each far face"],
      ],
    },
    { type: "heading", text: "Worked examples: flux and enclosed charge" },
    {
      type: "worked-example",
      id: "em1-2-we1",
      title: "Worked example 1: charge at the centre",
      problem:
        "A $1\\ \\mu$C charge sits at the centre of a cube of side 10 cm. Find the total flux and the flux through one face ($\\varepsilon_0 = 8.85\\times10^{-12}$ C² N⁻¹ m⁻²).",
      steps: [
        { text: "Total: $\\Phi = \\dfrac{q}{\\varepsilon_0} = \\dfrac{10^{-6}}{8.85\\times10^{-12}} \\approx 1.13\\times10^5$ N m²/C." },
        { text: "One face: $\\dfrac{1.13\\times10^5}{6} \\approx 1.88\\times10^4$ N m²/C." },
        { text: "The side of the cube never entered the calculation. *Why this step:* this is the whole power of Gauss: the flux depends only on enclosed charge, not on the size or shape of the surface." },
      ],
      answer: "Total $\\approx 1.13\\times10^5$ N m²/C; one face $\\approx 1.88\\times10^4$ N m²/C",
    },
    {
      type: "worked-example",
      id: "em1-2-we2",
      title: "Worked example 2: charge at a corner",
      problem:
        "A charge $q$ sits at one corner of a cube. Find the flux through (a) the whole cube, (b) a face touching that corner, (c) a face not touching it.",
      steps: [
        { text: "(a) Eight cubes around the corner form a closed surface around $q$, so ours gets $\\dfrac{q}{8\\varepsilon_0}$. *Why this step:* the trick is to build a closed surface that encloses the charge symmetrically, then divide." },
        { text: "(b) A touching face contains the corner, so the radial field lies in its plane: $\\vec E\\cdot d\\vec A = 0$ everywhere. Flux 0." },
        { text: "(c) The three far faces are identical as seen from $q$: $\\dfrac{q}{8\\varepsilon_0}\\cdot\\dfrac13 = \\dfrac{q}{24\\varepsilon_0}$ each." },
      ],
      answer: "(a) $\\dfrac{q}{8\\varepsilon_0}$, (b) $0$, (c) $\\dfrac{q}{24\\varepsilon_0}$",
    },
    {
      type: "worked-example",
      id: "em1-2-we3",
      title: "Worked example 3: finding the charge inside",
      problem:
        "Measurements over a closed box show $8000$ N m²/C of flux entering and $4000$ N m²/C leaving. What charge is inside?",
      steps: [
        { text: "Net outward flux $= 4000 - 8000 = -4000$ N m²/C. *Why this step:* entering flux counts as negative on a closed surface." },
        { text: "$q_{\\text{enc}} = \\varepsilon_0\\Phi = 8.85\\times10^{-12}\\times(-4000) \\approx -3.5\\times10^{-8}$ C." },
        { text: "The box contains a net negative charge of about 35 nC. More lines end inside than start there." },
      ],
      answer: "$q_{\\text{enc}} \\approx -3.5\\times10^{-8}$ C (about $-35$ nC)",
    },
    {
      type: "worked-example",
      id: "em1-2-we4",
      title: "Worked example 4: a dipole inside",
      problem:
        "A closed surface encloses an entire dipole. What is the flux?",
      steps: [
        { text: "$q_{\\text{enc}} = +q + (-q) = 0$." },
        { text: "$\\Phi = 0$. Every line that starts on $+q$ ends on $-q$. A line that bulges out through the surface must come back in to reach $-q$, so it crosses once outward and once inward: net zero. *Why this step:* zero net flux here does not mean zero field; the field on the surface can be large." },
        { text: "Now enclose only the $+q$: the flux is $+q/\\varepsilon_0$, even though the field on that surface is strongly affected by the $-q$ outside." },
      ],
      answer: "$\\Phi = 0$",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the $\\vec E$ in Gauss's law is produced by the enclosed charge only\"",
      content:
        "The $\\vec E$ at each point of the surface is the **total** field, from every charge in the universe. Outside charges change $\\vec E$ from point to point on the surface; they just contribute zero to the **net flux**. This is why Gauss's law gives $E$ easily only when symmetry makes $E$ the same over the surface (1.3). With a lopsided arrangement of outside charges, the flux is still $q_{\\text{enc}}/\\varepsilon_0$, but you cannot pull $E$ out of the integral.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "em1-2-q1",
      variant: "concept",
      question: "A point charge sits at the centre of a sphere. The sphere's radius is doubled. The flux through it",
      options: [
        { text: "halves", feedback: "The field falls by 4 but the area rises by 4: the flux is unchanged." },
        { text: "stays the same", correct: true, feedback: "Flux counts lines, and every line from the charge crosses both spheres." },
        { text: "quadruples", feedback: "The area quadruples, but the field at the surface drops to a quarter." },
      ],
      hint: "Apply Gauss's law: what does the flux through a closed surface depend on? You can also compare how $E$ falls and the area grows as $r$ increases.",
    },
    {
      type: "quiz",
      id: "em1-2-q2",
      variant: "practice",
      question: "A charge $q$ is at one corner of a cube. What is the flux through one of the three faces that do **not** touch that corner?",
      options: [
        { text: "$\\dfrac{q}{6\\varepsilon_0}$", feedback: "That is the per-face flux when the charge is at the centre." },
        { text: "$\\dfrac{q}{8\\varepsilon_0}$", feedback: "That is the flux through the whole cube; three far faces share it." },
        { text: "$\\dfrac{q}{48\\varepsilon_0}$", feedback: "You shared $q/8\\varepsilon_0$ among all six faces, but the three touching faces carry zero flux." },
        { text: "$\\dfrac{q}{24\\varepsilon_0}$", correct: true, feedback: "Cube gets $q/8\\varepsilon_0$, shared equally by the three far faces." },
      ],
      hint: "Imagine eight cubes around that corner so the charge sits at the centre of a big cube, then share its flux among the outer faces.",
    },
    {
      type: "quiz",
      id: "em1-2-q3",
      variant: "practice",
      question: "A charge $q$ sits at the centre of one face of a cube. The total flux through the cube is",
      options: [
        { text: "$\\dfrac{q}{\\varepsilon_0}$", feedback: "The charge is on the surface, not inside. Half its lines go the other way." },
        { text: "$\\dfrac{q}{6\\varepsilon_0}$", feedback: "That is one face's share for a charge at the centre." },
        { text: "$0$", feedback: "Half of the charge's lines go into the cube and out through the other faces." },
        { text: "$\\dfrac{q}{2\\varepsilon_0}$", correct: true, feedback: "A mirror cube on the other side would complete a closed surface around $q$; each gets half." },
      ],
      hint: "Place a mirror-image cube on the other side of that face so the charge is enclosed symmetrically. How much of its flux goes into each cube?",
    },
    {
      type: "quiz",
      id: "em1-2-q4",
      variant: "concept",
      question: "A closed surface encloses $+2\\ \\mu$C. A $+5\\ \\mu$C charge is brought up close **outside** it. Which statements are true afterwards? Select all that apply.",
      multiple: true,
      options: [
        { text: "The field at points on the surface changes.", correct: true, feedback: "The field at each point is the total field, which now includes the new charge's field." },
        { text: "The net flux through the surface is still $(2\\ \\mu\\text{C})/\\varepsilon_0$.", correct: true, feedback: "The new charge's lines enter and leave, adding zero net flux. Only $q_{\\text{enc}}$ fixes the net flux." },
        { text: "The net flux becomes $(7\\ \\mu\\text{C})/\\varepsilon_0$.", feedback: "Outside charges do not change the net flux: their lines that enter also leave." },
        { text: "Nothing changes, because Gauss's law ignores outside charges.", feedback: "Gauss's law ignores them only in the **net** flux. The field point by point certainly includes the new charge." },
      ],
      hint: "Separate the two quantities: $\\vec E$ on the surface comes from all charges, but the net flux depends only on $q_{\\text{enc}}$. Recall the misconception box for this lesson.",
    },
    {
      type: "numeric",
      id: "em1-2-q5",
      variant: "practice",
      question: "The net outward flux through a closed surface is $-9\\times10^{4}$ N m²/C. What is the charge inside? Take $\\varepsilon_0 = 8.85\\times10^{-12}$ C²/(N m²) and give your answer in $\\mu$C, with its sign.",
      answer: -0.7965,
      relTolerance: 0.02,
      unit: "$\\mu$C",
      hint: "Gauss's law: $\\Phi = q_{\\text{enc}}/\\varepsilon_0$, so $q_{\\text{enc}} = \\varepsilon_0\\Phi$.",
      solution: "$q = \\varepsilon_0\\Phi = 8.85\\times10^{-12}\\times(-9\\times10^4) \\approx -7.97\\times10^{-7}$ C $\\approx -0.8\\ \\mu$C. Negative net flux means more lines end inside than start there, so the enclosed charge is negative.",
      commonMistakes: [
        { answer: 0.7965, tolerance: 0.02, feedback: "Negative net flux means lines end inside: the enclosed charge is negative." },
        { answer: -1.017e22, tolerance: 1e20, feedback: "That divides by $\\varepsilon_0$ (and gives an absurd charge). Gauss says $q = \\varepsilon_0\\Phi$." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "applications-of-gauss-law",
  title: "1.3 · Applying Gauss's Law",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 0.7 we needed an integral with $\\sec^2\\phi$ in it to find the field of an infinite line of charge. Gauss's law does it in one line, as long as you choose the right surface. The recipe:\n\n1. **Use symmetry** to decide the direction of $\\vec E$ and on which surfaces its size is constant.\n2. **Choose a Gaussian surface** made of pieces where $\\vec E$ is either perpendicular to the surface with constant size (flux $= EA$) or parallel to it (flux $= 0$).\n3. **Apply** $\\oint\\vec E\\cdot d\\vec A = q_{\\text{enc}}/\\varepsilon_0$ and solve for $E$.",
    },
    { type: "heading", text: "Fields of lines, sheets and spheres" },
    {
      type: "text",
      content:
        "**Infinite line of charge (density $\\lambda$).** By symmetry $\\vec E$ points radially away from the line and depends only on the distance $r$. Choose a closed cylinder of radius $r$ and length $L$ around the line. The flat ends are parallel to $\\vec E$: no flux. The curved side has $\\vec E$ along its normal with constant size: flux $E\\cdot2\\pi rL$. It encloses $\\lambda L$:",
    },
    {
      type: "math",
      latex: "E\\cdot2\\pi rL = \\frac{\\lambda L}{\\varepsilon_0}\\;\\Rightarrow\\; E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r} = \\frac{2k\\lambda}{r}",
    },
    {
      type: "text",
      content:
        "the same as 0.7, with no integral.\n\n**Infinite plane sheet (density $\\sigma$).** By symmetry $\\vec E$ is perpendicular to the sheet, pointing away on both sides (for $\\sigma > 0$), with the same size at equal distances. Choose a **pillbox**: a short cylinder of cross-section $A$ straddling the sheet. The curved side is parallel to $\\vec E$ (no flux); each end has flux $EA$. It encloses $\\sigma A$:",
    },
    {
      type: "math",
      latex: "2EA = \\frac{\\sigma A}{\\varepsilon_0}\\;\\Rightarrow\\; E = \\frac{\\sigma}{2\\varepsilon_0}",
    },
    {
      type: "text",
      content:
        "No $r$ at all. The field of an infinite sheet is the same at every distance. (The disc formula of 0.7, $\\frac{\\sigma}{2\\varepsilon_0}\\big(1 - \\frac{x}{\\sqrt{R^2+x^2}}\\big)$, agrees: when the disc is huge compared with $x$, the bracket is 1.)\n\n**Spherical shell (charge $Q$, radius $R$).** By symmetry $\\vec E$ is radial with size depending only on $r$. Choose a concentric sphere of radius $r$: flux $E\\cdot4\\pi r^2$.\n\n- Outside ($r > R$): encloses $Q$, so $E = \\dfrac{kQ}{r^2}$, as if all the charge were at the centre.\n- Inside ($r < R$): encloses nothing, so $E = 0$.\n\n**Uniformly charged solid sphere** (charge $Q$, radius $R$, density $\\rho = Q/\\tfrac43\\pi R^3$). Outside, the same as the shell: $kQ/r^2$. Inside, a sphere of radius $r$ encloses the fraction $r^3/R^3$ of the charge:",
    },
    {
      type: "math",
      latex: "E\\cdot4\\pi r^2 = \\frac{Q}{\\varepsilon_0}\\frac{r^3}{R^3}\\;\\Rightarrow\\; E = \\frac{kQr}{R^3} = \\frac{\\rho r}{3\\varepsilon_0}\\qquad(r \\le R)",
    },
    {
      type: "text",
      content:
        "Inside, $E$ grows linearly from zero at the centre to $kQ/R^2$ at the surface, then falls as $1/r^2$ outside. The field is continuous at $r = R$.",
    },
    {
      type: "table",
      headers: ["Charge distribution", "Gaussian surface", "Field"],
      rows: [
        ["Infinite line, $\\lambda$", "coaxial cylinder", "$\\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}$ ($\\propto 1/r$)"],
        ["Infinite sheet, $\\sigma$", "pillbox", "$\\dfrac{\\sigma}{2\\varepsilon_0}$ (constant)"],
        ["Spherical shell, $Q$", "concentric sphere", "$0$ inside; $\\dfrac{kQ}{r^2}$ outside"],
        ["Solid sphere, $Q$ uniform", "concentric sphere", "$\\dfrac{kQr}{R^3}$ inside; $\\dfrac{kQ}{r^2}$ outside"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "Point charge / sphere (outside)", expr: "1/x^2", latex: "\\frac{1}{x^2}", excluded: [0] },
          { label: "Infinite line", expr: "1/x", latex: "\\frac{1}{x}", excluded: [0] },
          { label: "Infinite sheet", expr: "1", latex: "1" },
        ],
        window: { xmin: 0, xmax: 6, ymin: 0, ymax: 4 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: three geometries, three laws. A point's field spreads over a sphere (area $\\propto r^2$), so $E \\propto 1/r^2$ and drops steeply. A line's field spreads over a cylinder (area $\\propto r$), so $E \\propto 1/r$. A sheet's field lines are parallel and never spread at all, so $E$ is constant. The fall-off is a statement about how fast the field lines spread.",
    },
    { type: "heading", text: "Two parallel sheets" },
    {
      type: "text",
      content:
        "Superpose two sheet fields, each $\\sigma/2\\varepsilon_0$, pointing away from a positive sheet and towards a negative one.\n\n- $+\\sigma$ and $-\\sigma$: between the sheets both fields point from $+$ to $-$ and add to $\\dfrac{\\sigma}{\\varepsilon_0}$; outside they point in opposite directions and cancel. This is the parallel-plate capacitor of Chapter 2.\n- $+\\sigma$ and $+\\sigma$: between the sheets they cancel; outside they add to $\\dfrac{\\sigma}{\\varepsilon_0}$, pointing away.",
    },
    { type: "heading", text: "Worked examples: sheets, spheres and wires" },
    {
      type: "worked-example",
      id: "em1-3-we1",
      title: "Worked example 1: a charged sheet",
      problem:
        "A large sheet carries $\\sigma = 8.85\\ \\mu$C/m². Find the field 1 cm and 1 m from it.",
      steps: [
        { text: "$E = \\dfrac{\\sigma}{2\\varepsilon_0} = \\dfrac{8.85\\times10^{-6}}{2\\times8.85\\times10^{-12}} = 5\\times10^5$ N/C." },
        { text: "The same at 1 cm and at 1 m, as long as the sheet is large compared with the distance. *Why this step:* \"infinite\" in physics means \"large compared with the distances you care about\"." },
      ],
      answer: "$5\\times10^5$ N/C at both 1 cm and 1 m",
    },
    {
      type: "worked-example",
      id: "em1-3-we2",
      title: "Worked example 2: two sheets",
      problem:
        "Two large parallel sheets carry $+\\sigma$ and $-\\sigma$ with $\\sigma = 17.7$ nC/m². Find the field between them and outside. Then repeat with both sheets $+\\sigma$.",
      steps: [
        { text: "One sheet: $\\dfrac{\\sigma}{2\\varepsilon_0} = \\dfrac{17.7\\times10^{-9}}{17.7\\times10^{-12}} = 1000$ N/C." },
        { text: "$+\\sigma, -\\sigma$: between, $1000 + 1000 = 2000$ N/C from $+$ to $-$; outside, $1000 - 1000 = 0$. *Why this step:* draw both arrows in each of the three regions before adding." },
        { text: "$+\\sigma, +\\sigma$: between, $0$; outside, $2000$ N/C pointing away from the pair on each side." },
      ],
      answer: "$+\\sigma, -\\sigma$: 2000 N/C between, 0 outside. $+\\sigma, +\\sigma$: 0 between, 2000 N/C outside",
    },
    {
      type: "worked-example",
      id: "em1-3-we3",
      title: "Worked example 3: inside and outside a solid sphere",
      problem:
        "A uniformly charged solid sphere has radius $R$. Find the ratio of the fields at $r = R/2$ and $r = 2R$.",
      steps: [
        { text: "Inside: $E(R/2) = \\dfrac{kQ(R/2)}{R^3} = \\dfrac{kQ}{2R^2}$." },
        { text: "Outside: $E(2R) = \\dfrac{kQ}{(2R)^2} = \\dfrac{kQ}{4R^2}$." },
        { text: "Ratio $= \\dfrac{1/2}{1/4} = 2:1$. *Why this step:* two different formulas on either side of the surface, and choosing the wrong one is the classic slip. For a **shell** the answer would be $0$ at $R/2$." },
      ],
      answer: "$E(R/2) : E(2R) = 2 : 1$",
    },
    {
      type: "worked-example",
      id: "em1-3-we4",
      title: "Worked example 4: line charge, JEE Main",
      problem:
        "A long straight wire carries $\\lambda = 2\\ \\mu$C/m. With what force does it act on an electron 20 cm away?",
      steps: [
        { text: "$E = \\dfrac{2k\\lambda}{r} = \\dfrac{2\\times9\\times10^9\\times2\\times10^{-6}}{0.2} = 1.8\\times10^5$ N/C, radially outward." },
        { text: "$F = eE = 1.6\\times10^{-19}\\times1.8\\times10^5 \\approx 2.9\\times10^{-14}$ N, towards the wire (the electron is negative)." },
      ],
      answer: "$\\approx 2.9\\times10^{-14}$ N, towards the wire",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the field of a big charged sheet weakens as you move away\"",
      content:
        "Our instinct comes from point charges. For a sheet, as you move away more of the sheet comes into view at useful angles, and this exactly compensates for each piece being farther. Gauss shows it cleanly: the pillbox gives $2EA = \\sigma A/\\varepsilon_0$ whatever its length. (A real, finite sheet does weaken, once you are far away compared with its size, where it starts to look like a point charge.)",
    },
    {
      type: "callout",
      variant: "tip",
      title: "When Gauss's law is useless",
      content:
        "Gauss's law is always **true**, but it only gives $E$ when symmetry lets you pull $E$ out of the integral. A finite rod, a ring, a cube of charge or a disc on its axis have no surface on which $E$ is constant and perpendicular. For those, go back to $dq$ integration (0.7).",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "em1-3-q1",
      variant: "practice",
      question: "A uniformly charged solid sphere of radius $R$. The field at $r = R/2$ compared with the field at $r = 2R$ is",
      options: [
        { text: "$2:1$", correct: true, feedback: "$kQ/2R^2$ inside vs $kQ/4R^2$ outside." },
        { text: "$16:1$", feedback: "That uses $1/r^2$ inside as well. Inside a uniform solid sphere $E \\propto r$." },
        { text: "$1:4$", feedback: "That uses $E \\propto r$ outside too. Outside it is $1/r^2$." },
        { text: "$0$", feedback: "Zero inside is for a hollow shell. A solid sphere encloses some charge at $R/2$." },
      ],
      hint: "Use the inside and outside field results for a uniformly charged solid sphere, then take the ratio.",
    },
    {
      type: "quiz",
      id: "em1-3-q2",
      variant: "practice",
      question: "Two large parallel sheets carry $+\\sigma$ and $+\\sigma$. What is the field between them?",
      options: [
        { text: "Zero", correct: true, feedback: "Each sheet gives $\\sigma/2\\varepsilon_0$ pointing away from itself; between them these are opposite." },
        { text: "$\\sigma/\\varepsilon_0$", feedback: "That is the field between $+\\sigma$ and $-\\sigma$. With like charges the two fields oppose between the sheets." },
        { text: "$\\sigma/2\\varepsilon_0$", feedback: "That is the field of one sheet. Add the other one's field too." },
      ],
      hint: "Each sheet gives a field $\\sigma/2\\varepsilon_0$ pointing away from it. Draw both arrows in the region between the sheets and superpose.",
    },
    {
      type: "quiz",
      id: "em1-3-q3",
      variant: "concept",
      question: "A thin spherical shell carries charge $Q$. A small charge $q$ is placed inside it, off-centre. The force on $q$ due to the shell is",
      options: [
        { text: "towards the nearest part of the shell", feedback: "The near part is closer but smaller in view; the far part is farther but larger. They cancel exactly because of the $1/r^2$ law." },
        { text: "$kQq/R^2$", feedback: "That is the field just outside. Inside, a Gaussian sphere encloses no charge." },
        { text: "zero", correct: true, feedback: "The shell's field is zero everywhere inside, not only at the centre." },
      ],
      hint: "Apply Gauss's law to a sphere drawn inside the shell: what charge does it enclose, and what does symmetry say about $E$ there?",
    },
    {
      type: "numeric",
      id: "em1-3-q4",
      variant: "practice",
      question: "The field 10 cm from a long line charge is $9\\times10^4$ N/C. What is it 30 cm away? Give your answer in N/C.",
      answer: 30000,
      unit: "N/C",
      hint: "How does the field of a long line charge depend on distance?",
      solution: "For a line, $E = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r} \\propto \\dfrac1r$. Three times as far gives a third: $E = 9\\times10^4/3 = 3\\times10^4$ N/C.",
      commonMistakes: [
        { answer: 10000, feedback: "That is the $1/r^2$ fall-off of a point charge. A line's field falls as $1/r$." },
        { answer: 90000, feedback: "Constant fields belong to sheets, not lines." },
      ],
    },
    {
      type: "numeric",
      id: "em1-3-q5",
      variant: "practice",
      question: "A large thin sheet carries a uniform charge density $\\sigma = 17.7\\ \\mu$C/m². What is the field 5 cm from it? Take $\\varepsilon_0 = 8.85\\times10^{-12}$ C²/(N m²) and give your answer in N/C.",
      answer: 1e6,
      relTolerance: 0.01,
      unit: "N/C",
      hint: "For an infinite sheet, does the distance enter at all?",
      solution: "$E = \\dfrac{\\sigma}{2\\varepsilon_0} = \\dfrac{17.7\\times10^{-6}}{2\\times8.85\\times10^{-12}} = 10^6$ N/C, the same at any distance from an infinite sheet.",
      commonMistakes: [
        { answer: 2e6, feedback: "That is $\\sigma/\\varepsilon_0$, the field next to a conductor or between two opposite sheets. A single sheet gives half." },
        { answer: 4e8, feedback: "You divided by $r^2$. The distance does not enter at all for an infinite sheet." },
        { answer: 2e7, feedback: "You divided by $r$. The distance does not enter at all for an infinite sheet." },
      ],
    },
    {
      type: "quiz",
      id: "em1-3-q6",
      variant: "practice",
      question: "In which of these regions is the size of the electric field the same at every point? Select all that apply.",
      multiple: true,
      options: [
        { text: "Near a large uniformly charged sheet, on one side of it", correct: true, feedback: "$E = \\sigma/2\\varepsilon_0$ whatever the distance: the sheet looks the same from any height." },
        { text: "Between two large parallel sheets carrying $+\\sigma$ and $-\\sigma$", correct: true, feedback: "$E = \\sigma/\\varepsilon_0$ everywhere between them: the two sheets' fields add and neither depends on distance." },
        { text: "Inside a thin uniformly charged spherical shell", correct: true, feedback: "The field is zero at every point inside, so it is certainly the same everywhere." },
        { text: "Outside a long uniform line charge", feedback: "A cylindrical Gaussian surface gives $E = \\lambda/2\\pi\\varepsilon_0 r$, which falls as $1/r$." },
        { text: "Inside a uniformly charged solid sphere", feedback: "Inside, $E = kQr/R^3$ grows from zero at the centre to its largest value at the surface." },
      ],
      hint: "Use this lesson's Gauss's-law results for each case and check whether $E$ depends on the distance from the charge.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "electric-potential",
  title: "1.4 · Electric Potential",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Fields are vectors, and adding vectors from many charges means components, angles and square roots. There is a second way to describe the same field using a single **number** at each point, and numbers just add. The idea comes from energy. Lift a stone and you store energy that depends only on the height, not on the route you took. Push a positive charge towards another positive charge and you store energy too. The electrical \"height\" is the **potential**.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Electric potential",
      content:
        "The potential at a point $P$ is the work done per unit charge by an external agent in bringing a small positive test charge **slowly** from infinity to $P$:\n$V_P = \\dfrac{W_{\\infty\\to P}}{q_0}$\nUnit: the volt, $1\\ \\text{V} = 1\\ \\text{J/C}$. Potential is a scalar. The potential difference between two points is $V_A - V_B = \\dfrac{W_{B\\to A}}{q_0}$.",
    },
    { type: "heading", text: "Potential of a point charge" },
    {
      type: "text",
      content:
        "\"Slowly\" means no kinetic energy is gained: the agent's force always just balances the electric force $q_0\\vec E$, so the agent's force is $-q_0\\vec E$. This work does not depend on the path (1.6 shows why), which is what makes a potential possible at all.\n\n**Deriving $V = kq/r$.** Bring $q_0$ in along a radial line from infinity to distance $r$ from a point charge $q$. The field pushes $q_0$ outward with $kqq_0/r^2$, so the agent pushes inward with the same size, and the agent's work is",
    },
    {
      type: "math",
      latex:
        "W_{\\infty\\to r} = -\\int_{\\infty}^{r}\\frac{kqq_0}{r'^2}\\,dr' = -kqq_0\\left[-\\frac{1}{r'}\\right]_{\\infty}^{r} = \\frac{kqq_0}{r}\\qquad\\Rightarrow\\qquad V = \\frac{kq}{r}",
    },
    {
      type: "text",
      content:
        "Positive charges make positive potential, negative charges negative, and the sign now matters (unlike the magnitude-only field formula). For several charges, the works add, so **potentials add as plain numbers**:",
    },
    { type: "math", latex: "V = k\\sum_i \\frac{q_i}{r_i}" },
    { type: "heading", text: "From E to V and back" },
    {
      type: "text",
      content:
        "In general, the potential difference is the line integral of the field, and the field is minus the slope of the potential:",
    },
    {
      type: "math",
      latex: "V_A - V_B = \\int_A^B \\vec E\\cdot d\\vec l, \\qquad E_r = -\\frac{dV}{dr}\\quad(\\text{in general } \\vec E = -\\nabla V)",
    },
    {
      type: "text",
      content:
        "Read the first as: walking **along** the field, the potential **drops**. The second says the field points downhill, towards lower potential, and is strongest where $V$ changes fastest. This is why the field is often quoted in V/m: 1 V/m = 1 N/C.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "1/x^2",
        baseLatex: "E \\propto \\frac{q}{r^2}",
        expr: "q/x",
        exprLatex: "V = \\frac{kq}{r}",
        params: [{ name: "q", min: -3, max: 3, step: 0.5, initial: 1 }],
        window: { xmin: 0, xmax: 6, ymin: -4, ymax: 4 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $V \\propto 1/r$ falls much more gently than $E \\propto 1/r^2$, so potential reaches farther. Make $q$ negative and the potential curve flips below the axis: a negative charge sits at the bottom of a potential well. The slope of the $V$ curve at any $r$ is minus the field there.",
    },
    { type: "heading", text: "More potentials from superposition" },
    {
      type: "text",
      content:
        "- **Dipole**, at distance $r \\gg a$ and angle $\\theta$ from $\\vec p$: the distances to $\\pm q$ are about $r \\mp a\\cos\\theta$, so $V = kq\\left(\\dfrac{1}{r - a\\cos\\theta} - \\dfrac{1}{r + a\\cos\\theta}\\right) \\approx \\dfrac{kp\\cos\\theta}{r^2}$. It is zero everywhere on the equatorial plane.\n- **Ring on its axis:** every piece is at the same distance $\\sqrt{R^2 + x^2}$ and potential needs no direction, so just add: $V = \\dfrac{kQ}{\\sqrt{R^2 + x^2}}$. At the centre $V = kQ/R$, the largest value, even though $E = 0$ there.\n- **Spherical shell:** $V = kQ/r$ outside. Inside, $E = 0$, so $V$ does not change: $V = kQ/R$ everywhere inside.\n- **Uniform solid sphere:** $V = kQ/r$ outside. Inside, start from $kQ/R$ at the surface and add $\\int_r^R \\dfrac{kQr'}{R^3}\\,dr'$ (the field of 1.3): $V = \\dfrac{kQ(3R^2 - r^2)}{2R^3}$. At the centre $V = \\dfrac{3kQ}{2R}$, one and a half times the surface value.",
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "equipotentials",
        charges: [
          { q: 2, pos: [-2, 0] },
          { q: 2, pos: [2, 0] },
        ],
        probe: [0, 0],
        chargeSlider: { min: -4, max: 4, step: 1 },
        readouts: ["potential", "field"],
        caption:
          "The probe sits at the midpoint of two +2 μC charges. Read E and V there. Then use the slider to make the right-hand charge −2 μC and read them again.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with two equal positive charges the midpoint has $E = 0$ (the pushes cancel) but $V = 2\\times\\dfrac{9\\times10^9\\times2\\times10^{-6}}{2} = 18\\,000$ V (the positive potentials add). With $+2$ and $-2$ it flips: $V = 0$ at the midpoint (equal and opposite contributions) while $E = 9000$ N/C (both fields point the same way). Zero field and zero potential are completely different conditions.",
    },
    { type: "heading", text: "Worked examples: finding potentials" },
    {
      type: "worked-example",
      id: "em1-4-we1",
      title: "Worked example 1: centre of a square",
      problem:
        "Charges $+2$, $-2$, $+3$ and $+1\\ \\mu$C sit at the corners of a square of side $\\sqrt2$ m. Find the potential at the centre.",
      steps: [
        { text: "Every corner is half a diagonal from the centre: $\\tfrac12\\times\\sqrt2\\times\\sqrt2 = 1$ m." },
        { text: "$V = \\dfrac{k}{1}(2 - 2 + 3 + 1)\\times10^{-6} = 9\\times10^9\\times4\\times10^{-6} = 3.6\\times10^4$ V. *Why this step:* with equal distances, you just add the charges with their signs. No components, no angles." },
        { text: "Finding $\\vec E$ at the same point would need four vectors and their components; the potential took one line." },
      ],
      answer: "$V = 3.6\\times10^4$ V",
    },
    {
      type: "worked-example",
      id: "em1-4-we2",
      title: "Worked example 2: ring axis",
      problem:
        "A ring of radius 30 cm carries $1\\ \\mu$C. Find the potential at its centre and 40 cm along the axis.",
      steps: [
        { text: "Centre: $V = \\dfrac{kQ}{R} = \\dfrac{9000}{0.3} = 3\\times10^4$ V." },
        { text: "At $x = 0.4$ m: every piece is $\\sqrt{0.09 + 0.16} = 0.5$ m away, so $V = \\dfrac{9000}{0.5} = 1.8\\times10^4$ V." },
        { text: "Along the axis, the centre is a potential hill top with $E = 0$: a positive charge placed there feels no force, but nudge it along the axis and it slides off to infinity, gaining kinetic energy $q\\times3\\times10^4$ J." },
      ],
      answer: "$3\\times10^4$ V at the centre, $1.8\\times10^4$ V at 40 cm",
    },
    {
      type: "worked-example",
      id: "em1-4-we3",
      title: "Worked example 3: where is $V = 0$?",
      problem:
        "$+q$ sits at $x = 0$ and $-2q$ at $x = 3$ m. Find all points on the $x$-axis where $V = 0$.",
      steps: [
        { text: "We need $\\dfrac{q}{|x|} = \\dfrac{2q}{|x - 3|}$, i.e. the point is twice as far from $-2q$ as from $+q$. *Why this step:* equal and opposite contributions, and the larger charge needs the larger distance." },
        { text: "Between them ($0 < x < 3$): $3 - x = 2x \\Rightarrow x = 1$ m." },
        { text: "Outside, on the side of the smaller charge ($x < 0$): $3 - x = -2x \\Rightarrow x = -3$ m. Check: distances 3 m and 6 m, $q/3 - 2q/6 = 0$. ✓" },
        { text: "Beyond $-2q$ ($x > 3$) the larger charge is always nearer, so no zero. There are **two** points: $x = 1$ m and $x = -3$ m. (In 2D the $V = 0$ set is a whole circle through these two points.)" },
      ],
      answer: "$x = 1$ m and $x = -3$ m",
    },
    {
      type: "worked-example",
      id: "em1-4-we4",
      title: "Worked example 4: uniform field",
      problem:
        "In a uniform field of 200 V/m along $+x$, find $V_A - V_B$ for $A$ at $x = 0$ and $B$ at $x = 5$ cm.",
      steps: [
        { text: "$V_A - V_B = \\int_A^B \\vec E\\cdot d\\vec l = E\\,(x_B - x_A) = 200\\times0.05 = 10$ V." },
        { text: "$A$ is 10 V **higher** than $B$: the potential falls as you walk along the field." },
      ],
      answer: "$V_A - V_B = 10$ V",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"where E = 0, V must be 0\" (and its converse)",
      content:
        "$E$ is the **slope** of $V$, not $V$ itself. Midway between two equal positive charges $E = 0$ but $V = 2kq/a > 0$: a flat spot on a hill top, not sea level. Midway between $+q$ and $-q$, $V = 0$ but $E = 2kq/a^2$: sea level on a steep slope. Only differences of potential are physical anyway; the zero at infinity is a convention.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "em1-4-q1",
      variant: "practice",
      question: "What is the potential 9 cm from a charge of $+1$ nC? Take $k = 9\\times10^9$ N m²/C² and give your answer in V.",
      answer: 100,
      unit: "V",
      hint: "$V = kq/r$, with $r$ in metres.",
      solution: "$V = \\dfrac{kq}{r} = \\dfrac{9\\times10^9\\times10^{-9}}{0.09} = \\dfrac{9}{0.09} = 100$ V.",
      commonMistakes: [
        { answer: 1111.1, tolerance: 0.5, feedback: "That divides by $r^2 = 0.0081$. Potential goes as $1/r$." },
        { answer: 9, feedback: "That is $kq$ alone. Divide by the distance, 9 cm $= 0.09$ m: $9/0.09 = 100$." },
        { answer: 1, feedback: "You used $r = 9$ instead of converting 9 cm to $0.09$ m." },
      ],
    },
    {
      type: "quiz",
      id: "em1-4-q2",
      variant: "concept",
      question: "Two equal charges $+q$ are $2a$ apart. At the midpoint,",
      options: [
        { text: "$E = 0$ and $V = 0$", feedback: "The fields cancel but the potentials, both positive, add." },
        { text: "$E = \\dfrac{2kq}{a^2}$ and $V = 0$", feedback: "That is the midpoint of $+q$ and $-q$." },
        { text: "$E = \\dfrac{2kq}{a^2}$ and $V = \\dfrac{2kq}{a}$", feedback: "The two fields at the midpoint point in opposite directions." },
        { text: "$E = 0$ and $V = \\dfrac{2kq}{a}$", correct: true, feedback: "Vectors cancel; scalars add." },
      ],
      hint: "$E$ is a vector sum and $V$ is a scalar sum. Add the two field arrows and the two potentials $kq/a$ separately.",
    },
    {
      type: "quiz",
      id: "em1-4-q3",
      variant: "practice",
      question: "$+2q$ is at $x = 0$ and $-q$ at $x = 6$ m. At which points on the $x$-axis is $V = 0$? Select all that apply.",
      multiple: true,
      options: [
        { text: "$x = 4$ m", correct: true, feedback: "Between the charges, the distance to $+2q$ must be twice the distance to $-q$: $x = 2(6 - x)$ gives $x = 4$. Check: $2q/4 - q/2 = 0$." },
        { text: "$x = 12$ m", correct: true, feedback: "Beyond $-q$: $x = 2(x - 6)$ gives $x = 12$. Check: $2q/12 - q/6 = 0$." },
        { text: "$x = 2$ m", feedback: "That point is nearer the larger charge: $2q/2 - q/4 \\ne 0$. $V = 0$ needs the larger charge to be farther away." },
        { text: "$x = -6$ m", feedback: "On that side the larger charge is always nearer, so its potential wins: $2q/6 - q/12 \\ne 0$." },
        { text: "$x = 3$ m", feedback: "At the midpoint $2q/3 - q/3 \\ne 0$." },
      ],
      hint: "Potential is a scalar: set $\\dfrac{2kq}{|x|} = \\dfrac{kq}{|x - 6|}$ and check the region between the charges as well as beyond each one, as in Worked example 3.",
    },
    {
      type: "numeric",
      id: "em1-4-q4",
      variant: "practice",
      question: "Along the $x$-axis the potential is $V(x) = 4x^2 - 3x$ volts ($x$ in metres). What is $E_x$ at $x = 1$ m? Give your answer in V/m, with its sign.",
      answer: -5,
      unit: "V/m",
      hint: "$E_x = -\\dfrac{dV}{dx}$.",
      solution: "$E_x = -\\dfrac{dV}{dx} = -(8x - 3)$, which at $x = 1$ m is $-5$ V/m. The field points in the $-x$ direction, downhill in potential.",
      commonMistakes: [
        { answer: 5, feedback: "Don't forget the minus sign: the field points downhill." },
        { answer: 1, feedback: "That is $V(1) = 4 - 3$, the potential itself. The field is minus its slope." },
      ],
    },
    {
      type: "quiz",
      id: "em1-4-q5",
      variant: "concept",
      question: "A thin spherical shell of radius $R$ carries charge $Q$. The potential at a point $R/2$ from the centre is",
      options: [
        { text: "$\\dfrac{kQ}{R}$", correct: true, feedback: "Inside the shell $E = 0$, so $V$ stays at its surface value." },
        { text: "$0$, because the field inside is zero", feedback: "Zero field means constant potential, not zero potential." },
        { text: "$\\dfrac{2kQ}{R}$", feedback: "That uses $kQ/r$ with $r = R/2$, valid only outside." },
      ],
      hint: "Recall the misconception \"where $E = 0$, $V$ must be 0\". What does a zero field inside the shell tell you about how $V$ changes there?",
    },
    {
      type: "quiz",
      id: "em1-4-q6",
      variant: "practice",
      question: "A **solid** insulating sphere of radius $R$ carries charge $Q$ spread uniformly through its volume. The potential at its centre is",
      options: [
        { text: "$\\dfrac{kQ}{R}$", feedback: "That is the surface value. Inside a solid sphere $E \\ne 0$, so $V$ keeps rising as you go in." },
        { text: "$0$, because the field at the centre is zero", feedback: "Zero field at a point says nothing about the potential there." },
        { text: "$\\dfrac{2kQ}{R}$", feedback: "Integrate the inside field $kQr/R^3$ from $0$ to $R$: it adds $kQ/2R$, not $kQ/R$, to the surface value." },
        { text: "$\\dfrac{3kQ}{2R}$", correct: true, feedback: "$V = kQ(3R^2 - r^2)/2R^3$ inside; put $r = 0$." },
      ],
      hint: "Integrate the field in from infinity: $V(0) = V(R) + \\int_0^R E\\,dr$, with $E = kQr/R^3$ inside the sphere.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "equipotential-surfaces",
  title: "1.5 · Equipotential Surfaces",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A contour map of a hill joins points at equal height. Walk along a contour and you neither climb nor descend; walk straight across contours and you go uphill fastest; where contours crowd together the slope is steep. The electrical version joins points at equal potential. These are **equipotential surfaces** (lines, on a flat drawing), and every property of a contour map carries over.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Equipotential surface",
      content:
        "A surface on which $V$ has the same value everywhere. Properties:\n1. No work is done moving a charge along it: $W = q(V_A - V_B) = 0$.\n2. $\\vec E$ is perpendicular to it at every point.\n3. $\\vec E$ points from higher to lower potential.\n4. Where equipotentials (drawn at equal steps of $V$) are crowded, $E$ is strong.\n5. Two different equipotentials never cross.",
    },
    { type: "heading", text: "Equipotentials and field lines" },
    {
      type: "text",
      content:
        "**Why perpendicular?** Move a test charge a small step $d\\vec l$ along the surface. The work done by the field is $q_0\\vec E\\cdot d\\vec l$, and it must be zero because $V$ does not change. A zero dot product with a non-zero $\\vec E$ means $\\vec E\\perp d\\vec l$ for every direction along the surface. So field lines cut every equipotential at right angles.",
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "equipotentials",
        showLines: true,
        charges: [{ q: 2, pos: [0, 0], draggable: false }],
        caption:
          "A single +2 μC charge: equipotentials are circles, field lines are radii, and they meet at 90° everywhere. Notice the contours are not equally spaced.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "equipotentials",
        showLines: true,
        charges: [
          { q: 2, pos: [-2, 0] },
          { q: -2, pos: [2, 0] },
        ],
        caption:
          "A dipole. Red contours around +, blue around −, and the grey V = 0 contour is the perpendicular bisector. Drag a charge: the lines and contours rearrange but always cross at right angles.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: for the single charge, the circles are tightly packed close to the charge and spread out farther away, because $V = kq/r$ changes fast at small $r$. For the dipole, the contours are squashed ovals around each charge, the bisector is the $V = 0$ surface, and field lines cross every contour at $90^\\circ$, even where both curve. Between the charges, where the field is strongest, the contours are closest.",
    },
    { type: "heading", text: "Uniform fields and potential gradients" },
    {
      type: "text",
      content:
        "**Uniform field.** For a uniform $\\vec E$ along $+x$, the equipotentials are planes perpendicular to $x$, equally spaced for equal steps of $V$, and $V$ drops by $E\\,d$ over a distance $d$ **along** the field. Displacements perpendicular to $\\vec E$ change nothing, so along any slanted path only the part of the displacement along $\\vec E$ counts:",
    },
    { type: "math", latex: "V_A - V_B = \\vec E\\cdot(\\vec r_B - \\vec r_A)" },
    {
      type: "text",
      content:
        "**Getting $\\vec E$ from $V$ in two dimensions.** If $V(x, y)$ is known, each component of the field is minus the slope of $V$ in that direction, holding the other coordinate fixed (a partial derivative):",
    },
    {
      type: "math",
      latex: "E_x = -\\frac{\\partial V}{\\partial x},\\qquad E_y = -\\frac{\\partial V}{\\partial y},\\qquad E_z = -\\frac{\\partial V}{\\partial z}",
    },
    { type: "heading", text: "Worked examples: potentials and fields" },
    {
      type: "worked-example",
      id: "em1-5-we1",
      title: "Worked example 1: field from a potential",
      problem:
        "$V = 3x^2 + 2y$ volts. Find $\\vec E$ at $(1, 1)$ m.",
      steps: [
        { text: "$\\dfrac{\\partial V}{\\partial x} = 6x$ (treat $y$ as a constant), $\\dfrac{\\partial V}{\\partial y} = 2$. *Why this step:* each component needs the slope in its own direction only." },
        { text: "$\\vec E = -(6x\\,\\hat i + 2\\,\\hat j)$." },
        { text: "At $(1, 1)$: $\\vec E = (-6\\hat i - 2\\hat j)$ V/m, of size $\\sqrt{36 + 4} = \\sqrt{40} \\approx 6.3$ V/m." },
      ],
      answer: "$\\vec E = (-6\\hat i - 2\\hat j)$ V/m, size $\\approx 6.3$ V/m",
    },
    {
      type: "worked-example",
      id: "em1-5-we2",
      title: "Worked example 2: slanted path in a uniform field",
      problem:
        "$\\vec E = 100\\,\\hat i$ V/m. Find $V_A - V_B$ for $A = (0, 0)$ and $B = (3, 4)$ m.",
      steps: [
        { text: "Displacement $\\vec r_B - \\vec r_A = (3, 4)$ m." },
        { text: "$V_A - V_B = \\vec E\\cdot(3\\hat i + 4\\hat j) = 100\\times3 = 300$ V. *Why this step:* the 4 m along $y$ runs along an equipotential and changes nothing." },
        { text: "Not $100\\times5 = 500$ V: the path length is 5 m but only 3 m of it is along the field." },
      ],
      answer: "$V_A - V_B = 300$ V",
    },
    {
      type: "worked-example",
      id: "em1-5-we3",
      title: "Worked example 3: spacing around a point charge",
      problem:
        "A $+10$ nC charge. Where are the 90 V, 60 V and 30 V equipotentials?",
      steps: [
        { text: "$kq = 9\\times10^9\\times10^{-8} = 90$ V m, so $r = 90/V$." },
        { text: "$r = 1$ m, $1.5$ m and $3$ m." },
        { text: "Equal 30 V steps, but gaps of 0.5 m and then 1.5 m. *Why this step:* equal $\\Delta V$ with a weaker field needs a longer distance, since $\\Delta V \\approx E\\,\\Delta r$." },
      ],
      answer: "$r = 1$ m, $1.5$ m and $3$ m",
    },
    {
      type: "worked-example",
      id: "em1-5-we4",
      title: "Worked example 4: equally spaced planes",
      problem:
        "Three parallel equipotential planes at 10 V, 20 V and 30 V are 5 cm apart from one to the next. Find $\\vec E$.",
      steps: [
        { text: "Equal spacing for equal steps means a uniform field. $E = \\dfrac{\\Delta V}{\\Delta d} = \\dfrac{10}{0.05} = 200$ V/m." },
        { text: "Direction: perpendicular to the planes, from the 30 V plane towards the 10 V plane (downhill)." },
      ],
      answer: "$E = 200$ V/m, perpendicular to the planes, from the 30 V plane towards the 10 V plane",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"equipotentials of a point charge are equally spaced for equal steps of V\"",
      content:
        "That is only true in a uniform field. Around a point charge $V = kq/r$, so equal steps of $V$ crowd together near the charge and spread out farther away (Worked example 3). Equal spacing is itself a sign of a uniform field.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "em1-5-q1",
      variant: "concept",
      question: "A 5 μC charge is carried 2 m along an equipotential surface at 300 V. The work done by the field is",
      options: [
        { text: "$1.5\\times10^{-3}$ J", feedback: "That is $qV$, the energy of sitting at 300 V, not the work of moving between two points at the same potential." },
        { text: "$0$", correct: true, feedback: "$W = q(V_A - V_B)$, and $V_A = V_B$ on an equipotential." },
        { text: "$3\\times10^{-3}$ J", feedback: "Distance does not matter here; only the potential difference, which is zero." },
      ],
      hint: "The work done by the field is $q(V_A - V_B)$. What is $V_A - V_B$ for two points on the same equipotential?",
    },
    {
      type: "quiz",
      id: "em1-5-q2",
      variant: "practice",
      question: "$V = x^2y$ volts. What is $\\vec E$ at $(1, 2)$ m?",
      options: [
        { text: "$(4\\hat i + \\hat j)$ V/m", feedback: "The field is **minus** the slope of $V$." },
        { text: "$-(2\\hat i + \\hat j)$ V/m", feedback: "$\\partial(x^2y)/\\partial x = 2xy$, which is $4$ at $(1, 2)$, not $2$." },
        { text: "$-(4\\hat i + \\hat j)$ V/m", correct: true, feedback: "$\\partial V/\\partial x = 2xy = 4$, $\\partial V/\\partial y = x^2 = 1$, then change sign." },
      ],
      hint: "Use $\\vec E = -\\nabla V$: take $\\partial V/\\partial x$ and $\\partial V/\\partial y$, then substitute the point. Do not forget the minus sign.",
    },
    {
      type: "numeric",
      id: "em1-5-q3",
      variant: "practice",
      question: "In a uniform field $\\vec E = 50\\,\\hat j$ V/m, what is $V_A - V_B$ for $A = (0, 0)$ and $B = (6, 8)$ m? Give your answer in V, with its sign.",
      answer: 400,
      unit: "V",
      hint: "In a uniform field, $V_A - V_B = \\vec E\\cdot(\\vec r_B - \\vec r_A)$: only the displacement along $\\vec E$ counts.",
      solution: "$V_A - V_B = \\vec E\\cdot(\\vec r_B - \\vec r_A) = 50\\hat j\\cdot(6\\hat i + 8\\hat j) = 50\\times8 = 400$ V. Going from $A$ to $B$ moves along the field, so the potential drops and $A$ is the higher point.",
      commonMistakes: [
        { answer: 500, feedback: "That uses the full path length 10 m. Only the displacement along $\\vec E$ counts." },
        { answer: 300, feedback: "The field is along $\\hat j$, so pair it with the 8 m, not the 6 m." },
        { answer: -400, feedback: "Moving along the field lowers the potential, so $A$ is higher: $V_A - V_B > 0$." },
      ],
    },
    {
      type: "quiz",
      id: "em1-5-q4",
      variant: "concept",
      question: "Equipotential planes of 40 V and 20 V are 4 cm apart in a uniform field. The field is",
      options: [
        { text: "$500$ V/m, pointing from the 20 V plane to the 40 V plane", feedback: "The field points from high to low potential." },
        { text: "$500$ V/m, pointing from the 40 V plane to the 20 V plane", correct: true, feedback: "$20/0.04 = 500$ V/m, downhill." },
        { text: "$5$ V/m, pointing from the 40 V plane to the 20 V plane", feedback: "Convert 4 cm to 0.04 m." },
      ],
      hint: "Use $E = |\\Delta V|/d$ with $d$ in metres. For the direction, ask which way a positive charge would move to lose potential energy.",
    },
    {
      type: "quiz",
      id: "em1-5-q5",
      variant: "concept",
      question: "At a point, a field line and an equipotential surface meet. The angle between them is",
      options: [
        { text: "$90^\\circ$", correct: true, feedback: "$\\vec E\\cdot d\\vec l = 0$ for every step along the surface." },
        { text: "$0^\\circ$, the field runs along the equipotential", feedback: "Then moving along the surface would involve work, contradicting constant $V$." },
        { text: "It depends on the charge arrangement", feedback: "It is $90^\\circ$ for every electrostatic field." },
      ],
      hint: "No work is done moving along an equipotential, so $\\vec E\\cdot d\\vec l = 0$ for any step along it. What does that say about the angle?",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "potential-energy-of-systems",
  title: "1.6 · Potential Energy and Work",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Push two positive charges together and let go: they fly apart, gaining kinetic energy. The energy was stored in the arrangement, as **electric potential energy**. Potential $V$ was energy per coulomb at a point; potential energy $U$ belongs to a **system** of charges.",
    },
    { type: "heading", text: "Why work is path-independent" },
    {
      type: "text",
      content:
        "Any path from $A$ to $B$ near a point charge can be broken into tiny radial steps and tiny steps along circles centred on the charge. Along a circle the force is perpendicular to the motion: no work. Along radial steps the work depends only on the change in $r$. Add them up and only $r_A$ and $r_B$ survive. By superposition this holds for any set of charges: the electric force is **conservative**. That is exactly why a potential exists, and why the work round any closed loop is zero (so electrostatic field lines never close on themselves, 0.5).",
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "work",
        charges: [{ q: 2, pos: [0, 0] }],
        probe: [1, 0],
        probeB: [3, 0],
        testCharge: -2,
        caption:
          "A −2 μC test charge moves from A to B along two different dashed paths. Drag A and B anywhere: the two works always agree, because W = q₀(V_A − V_B).",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the direct path and the detour give the same number, whatever you do. With the $-2\\ \\mu$C test charge moving **away** from the $+2\\ \\mu$C source, the field does negative work (it is pulling the test charge back). Drag B onto the same circle as A and the work becomes zero: A and B are then on one equipotential.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Work, potential energy and the electron-volt",
      content:
        "Work done **by the field** moving $q$ from $A$ to $B$: $W_{\\text{field}} = q(V_A - V_B)$, independent of the path.\nPotential energy of a pair: $U = \\dfrac{kq_1q_2}{r}$ (zero at infinite separation). Of a system: add $U$ over **every pair** once.\nA charge at a point of potential $V$ has $U = qV$.\n$1\\ \\text{eV} = 1.6\\times10^{-19}$ J, the energy an electron gains falling through 1 V.",
    },
    { type: "heading", text: "Assembling a system of charges" },
    {
      type: "text",
      content:
        "Bring the charges in from infinity one at a time. The first costs nothing (nothing is there yet). The second costs $kq_1q_2/r_{12}$. The third costs $kq_1q_3/r_{13} + kq_2q_3/r_{23}$. So the total is one term per pair. Three charges have 3 pairs; four charges have 6.\n\n**Energy conservation.** If only electric forces act, $K + U$ is constant. A charge $q$ accelerated from rest through a potential difference $V$ gains kinetic energy $qV$:",
    },
    { type: "math", latex: "\\tfrac12 mv^2 = qV\\quad\\Rightarrow\\quad v = \\sqrt{\\frac{2qV}{m}}" },
    { type: "heading", text: "Worked examples: assembly and acceleration" },
    {
      type: "worked-example",
      id: "em1-6-we1",
      title: "Worked example 1: three charges",
      problem:
        "Three charges of $+1\\ \\mu$C sit at the corners of an equilateral triangle of side 10 cm. How much work was needed to assemble them?",
      steps: [
        { text: "Three pairs, each at 0.1 m: $\\dfrac{kq^2}{a} = \\dfrac{9\\times10^9\\times10^{-12}}{0.1} = 0.09$ J." },
        { text: "$U = 3\\times0.09 = 0.27$ J. *Why this step:* count pairs, not charges. It is easy to write $2\\times$ or $6\\times$ by counting each pair twice or forgetting one." },
      ],
      answer: "$U = 0.27$ J",
    },
    {
      type: "worked-example",
      id: "em1-6-we2",
      title: "Worked example 2: the fourth corner",
      problem:
        "Three $+1\\ \\mu$C charges sit at three corners of a 10 cm square. How much work brings a fourth $+1\\ \\mu$C to the empty corner?",
      steps: [
        { text: "The work equals $qV$, where $V$ is the potential at the empty corner due to the other three. *Why this step:* the pairs already present do not change; only the new pairs cost energy." },
        { text: "Two neighbours at $a$, one opposite at $a\\sqrt2$: $V = kq\\left(\\dfrac{2}{a} + \\dfrac{1}{a\\sqrt2}\\right)$." },
        { text: "$W = \\dfrac{kq^2}{a}\\left(2 + \\dfrac{1}{\\sqrt2}\\right) = 0.09\\times2.707 \\approx 0.24$ J." },
        { text: "The whole square costs $\\dfrac{kq^2}{a}(4 + \\sqrt2) \\approx 0.49$ J: four sides and two diagonals." },
      ],
      answer: "$W \\approx 0.24$ J",
    },
    {
      type: "worked-example",
      id: "em1-6-we3",
      title: "Worked example 3: an electron through 100 V",
      problem:
        "An electron starts from rest and is accelerated through 100 V. Find its kinetic energy and speed ($m_e = 9.1\\times10^{-31}$ kg).",
      steps: [
        { text: "$K = eV = 100$ eV $= 1.6\\times10^{-17}$ J. *Why this step:* the electron-volt makes the first step free." },
        { text: "$v = \\sqrt{\\dfrac{2\\times1.6\\times10^{-17}}{9.1\\times10^{-31}}} = \\sqrt{3.52\\times10^{13}} \\approx 5.9\\times10^6$ m/s, about 2% of the speed of light." },
      ],
      answer: "$K = 100$ eV $= 1.6\\times10^{-17}$ J, $v \\approx 5.9\\times10^6$ m/s",
    },
    {
      type: "worked-example",
      id: "em1-6-we4",
      title: "Worked example 4: closest approach",
      problem:
        "An α-particle (charge $2e$) with kinetic energy 5 MeV heads straight for a gold nucleus ($79e$). How close does it get?",
      steps: [
        { text: "At closest approach it momentarily stops: all the kinetic energy has become potential energy. *Why this step:* the nucleus is so heavy that its recoil can be ignored." },
        { text: "$K = \\dfrac{k(2e)(79e)}{r_0} \\Rightarrow r_0 = \\dfrac{k\\cdot158e^2}{K}$." },
        { text: "$K = 5\\times10^6\\times1.6\\times10^{-19} = 8\\times10^{-13}$ J. $r_0 = \\dfrac{9\\times10^9\\times158\\times(1.6\\times10^{-19})^2}{8\\times10^{-13}} \\approx 4.5\\times10^{-14}$ m." },
        { text: "About 45 fm. Rutherford used exactly this estimate to show that the nucleus is at least this small." },
      ],
      answer: "$r_0 \\approx 4.5\\times10^{-14}$ m (about 45 fm)",
    },
    {
      type: "text",
      content:
        "**Dipole energy, recap.** The formula $U = -\\vec p\\cdot\\vec E$ from 0.6 is just $qV$ summed over the two charges: $U = qV_+ + (-q)V_- = q(V_+ - V_-)$. In a uniform field the $+q$ end is $2a\\cos\\theta$ farther along $\\vec E$, so $V_+ - V_- = -E(2a\\cos\\theta)$ and $U = -pE\\cos\\theta$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"moving along a longer path takes more work in an electric field\"",
      content:
        "The electric force is conservative, so the work it does depends only on the end points: $W = q(V_A - V_B)$. A winding path and a straight one between the same points involve the same electric work. (Friction or air resistance, if present, are another matter; they are not electric.)",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "em1-6-q1",
      variant: "practice",
      question: "What is the potential energy of $+2\\ \\mu$C and $-3\\ \\mu$C held 30 cm apart? Take $k = 9\\times10^9$ N m²/C² and give your answer in J, with its sign.",
      answer: -0.18,
      unit: "J",
      hint: "$U = \\dfrac{kq_1q_2}{r}$, keeping the signs of the charges.",
      solution: "$U = \\dfrac{kq_1q_2}{r} = \\dfrac{9\\times10^9\\times(2\\times10^{-6})(-3\\times10^{-6})}{0.3} = -0.18$ J. It is negative because the charges attract: you would have to do work to pull them apart.",
      commonMistakes: [
        { answer: 0.18, feedback: "Keep the signs: unlike charges give negative potential energy." },
        { answer: -0.6, feedback: "That divides by $r^2$. Potential energy goes as $1/r$." },
      ],
    },
    {
      type: "numeric",
      id: "em1-6-q2",
      variant: "practice",
      question: "The field carries a $+2\\ \\mu$C charge from a point at 100 V to a point at 40 V. How much work does the field do? Give your answer in $\\mu$J, with its sign.",
      answer: 120,
      unit: "$\\mu$J",
      hint: "$W_{\\text{field}} = q(V_{\\text{start}} - V_{\\text{end}})$.",
      solution: "$W = q(V_A - V_B) = 2\\times10^{-6}\\times(100 - 40) = 1.2\\times10^{-4}$ J $= 120\\ \\mu$J. A positive charge moving to lower potential is going downhill, so the field does positive work.",
      commonMistakes: [
        { answer: -120, feedback: "A positive charge moving to lower potential gets positive work from the field (it is going downhill)." },
        { answer: 280, feedback: "Use the difference $100 - 40$, not the sum." },
        { answer: 1.2e-4, feedback: "That is the work in joules. The question asks for microjoules: $1.2\\times10^{-4}$ J $= 120\\ \\mu$J." },
      ],
    },
    {
      type: "numeric",
      id: "em1-6-q3",
      variant: "practice",
      question: "A proton and an α-particle (charge $2e$, mass $4m_p$) start from rest and are accelerated through the same potential difference. What is the ratio of their speeds $v_p/v_\\alpha$? Give your answer to two decimal places.",
      answer: 1.4142,
      relTolerance: 0.01,
      hint: "Each gains kinetic energy $qV$, so $v = \\sqrt{2qV/m}$.",
      solution: "$\\tfrac12mv^2 = qV$ gives $v = \\sqrt{2qV/m} \\propto \\sqrt{q/m}$. For the proton $q/m = e/m_p$; for the α it is $2e/4m_p$, half as much. So $v_p/v_\\alpha = \\sqrt{2} \\approx 1.41$.",
      commonMistakes: [
        { answer: 0.7071, tolerance: 0.01, feedback: "That is $v_\\alpha/v_p$. The α gains twice the energy but has four times the mass, so it is the slower one." },
        { answer: 2, feedback: "Speed goes as the square root of $q/m$, not as $q/m$ itself." },
        { answer: 1, feedback: "Equal speeds would need equal $q/m$." },
      ],
    },
    {
      type: "quiz",
      id: "em1-6-q4",
      variant: "practice",
      question: "Four equal charges $q$ are placed at the corners of a square of side $a$. The potential energy of the system is",
      options: [
        { text: "$\\dfrac{4kq^2}{a}$", feedback: "You left out the two diagonal pairs." },
        { text: "$\\dfrac{kq^2}{a}(8 + 2\\sqrt2)$", feedback: "That counts every pair twice." },
        { text: "$\\dfrac{kq^2}{a}(4 + \\sqrt2)$", correct: true, feedback: "Four sides at $a$ and two diagonals at $a\\sqrt2$: $4 + 2/\\sqrt2 = 4 + \\sqrt2$." },
      ],
      hint: "Sum $kq_iq_j/r_{ij}$ over all distinct pairs. Count how many pairs are sides and how many are diagonals.",
    },
    {
      type: "quiz",
      id: "em1-6-q5",
      variant: "concept",
      question: "A charge is moved between two fixed points A and B, once in a straight line and once along a long spiral. The work done by the electrostatic field is",
      options: [
        { text: "greater along the spiral", feedback: "The electrostatic force is conservative: only the end points matter." },
        { text: "the same for both", correct: true, feedback: "$W = q(V_A - V_B)$ for any path." },
        { text: "zero along the spiral, since it winds back and forth", feedback: "It is zero only if A and B are at the same potential." },
      ],
      hint: "Is the electrostatic force conservative? Recall the misconception box about longer paths.",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "conductors-in-electrostatics",
  title: "1.7 · Conductors",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "During a thunderstorm the safest place to be is inside a car, not because of the rubber tyres but because of the metal body. Lightning can strike the car and the people inside feel nothing. Everything in this lesson explains why, starting from one fact: a conductor is full of charges that are free to move.",
    },
    { type: "heading", text: "Electrostatic equilibrium" },
    {
      type: "text",
      content:
        "Put a piece of metal in a field. Its free electrons are pushed opposite to $\\vec E$ and pile up on one side, leaving the other side positive. These separated charges make their own field, which opposes the applied one inside the metal. The electrons keep moving until the field inside is **exactly** zero, because as long as any field remains, they keep moving. In a metal this takes far less than a nanosecond. Everything below follows from $E = 0$ inside.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Conductors in electrostatic equilibrium",
      content:
        "1. $\\vec E = 0$ everywhere inside the material.\n2. Any net charge sits on the **surface**. (A Gaussian surface just inside the metal has $E = 0$ on it, so it encloses zero charge.)\n3. The whole conductor, surface included, is **one equipotential** ($E = 0$ means $V$ does not change inside, and the surface is continuous with the inside).\n4. Just outside, $\\vec E$ is perpendicular to the surface with size $E = \\dfrac{\\sigma}{\\varepsilon_0}$.\n5. A cavity with no charge in it has $E = 0$ inside, whatever happens outside.",
    },
    {
      type: "text",
      content:
        "**Why $\\sigma/\\varepsilon_0$ and not $\\sigma/2\\varepsilon_0$?** If $\\vec E$ just outside had a component along the surface, it would push surface charges along; so in equilibrium it is perpendicular. Use a pillbox with one face just outside and one just inside the metal. Only the outside face has flux (inside $E = 0$): $EA = \\sigma A/\\varepsilon_0$, so $E = \\sigma/\\varepsilon_0$. An isolated sheet sends half its field each way; a conductor's surface sends it all outwards, because the rest of the conductor's charges cancel the inward half.",
    },
    {
      type: "text",
      content:
        "**Consequences you can see.**\n\n- **Shielding:** the inside of a closed metal box (a car, an aircraft, a Faraday cage around sensitive equipment) is field-free, whatever the charges outside do.\n- **Sharp points:** on a conductor, charge crowds where the surface curves most sharply (next paragraph). The field there, $\\sigma/\\varepsilon_0$, can become strong enough to ionise the air: a **corona discharge**. Lightning rods are pointed so that they leak charge gently into the air and, if struck, carry the current safely to earth.\n- **Electrostatic pressure:** each surface patch is pushed outward by the field of all the other charges, which is $\\sigma/2\\varepsilon_0$ (half the outside field; the patch does not push itself). The force per unit area is $\\sigma\\cdot\\dfrac{\\sigma}{2\\varepsilon_0} = \\dfrac{\\sigma^2}{2\\varepsilon_0}$. A charged soap bubble swells slightly for this reason.",
    },
    { type: "heading", text: "Joined spheres, cavities and shells" },
    {
      type: "text",
      content:
        "**Two spheres joined by a wire.** Spheres of radii $R_1$ and $R_2$, far apart, joined by a thin wire, form one conductor, so they share one potential:",
    },
    {
      type: "math",
      latex:
        "\\frac{kQ_1}{R_1} = \\frac{kQ_2}{R_2}\\;\\Rightarrow\\;\\frac{Q_1}{Q_2} = \\frac{R_1}{R_2},\\qquad \\frac{\\sigma_1}{\\sigma_2} = \\frac{Q_1/4\\pi R_1^2}{Q_2/4\\pi R_2^2} = \\frac{R_2}{R_1}",
    },
    {
      type: "text",
      content:
        "The bigger sphere holds more charge, but the smaller one has the higher surface density, and hence the stronger surface field. A sharp point is like a tiny sphere, which is why charge density and field are largest there.",
    },
    {
      type: "table",
      headers: ["Situation", "Inner surface of the conductor", "Outer surface", "Field outside"],
      rows: [
        ["Neutral hollow conductor, $+q$ placed in the cavity", "$-q$", "$+q$", "as if $+q$ were at the centre (for a sphere)"],
        ["Same, conductor also carries $+Q$", "$-q$", "$Q + q$", "that of $Q + q$"],
        ["Same, outer surface earthed", "$-q$", "$0$", "zero"],
        ["Empty cavity, charges outside", "$0$", "whatever is needed", "$E = 0$ in the cavity"],
      ],
    },
    {
      type: "text",
      content:
        "**Concentric shells.** For thin concentric spherical shells, use the shell results from 1.4: a shell of charge $q$ and radius $R$ gives potential $kq/R$ at every point inside it and $kq/r$ outside. The potential of any shell is the sum of these contributions. Earthing a shell sets its potential to zero; charge flows to or from the earth until that is true.",
    },
    { type: "heading", text: "Worked examples: spheres, shells and pressure" },
    {
      type: "worked-example",
      id: "em1-7-we1",
      title: "Worked example 1: joined spheres",
      problem:
        "A sphere of radius 1 cm is given $8\\ \\mu$C and then joined by a long thin wire to a neutral sphere of radius 3 cm. Find the final charges, the common potential, and the ratio of surface charge densities.",
      steps: [
        { text: "Charge conservation: $Q_1 + Q_2 = 8\\ \\mu$C." },
        { text: "Equal potentials: $Q_1/Q_2 = R_1/R_2 = 1/3$. *Why this step:* joined conductors are one equipotential." },
        { text: "So $Q_1 = 2\\ \\mu$C and $Q_2 = 6\\ \\mu$C." },
        { text: "$V = \\dfrac{kQ_1}{R_1} = \\dfrac{9\\times10^9\\times2\\times10^{-6}}{0.01} = 1.8\\times10^6$ V (check: $\\dfrac{9\\times10^9\\times6\\times10^{-6}}{0.03}$ gives the same)." },
        { text: "$\\sigma_1/\\sigma_2 = R_2/R_1 = 3$: the small sphere's surface is three times as densely charged." },
      ],
      answer: "$Q_1 = 2\\ \\mu$C, $Q_2 = 6\\ \\mu$C, $V = 1.8\\times10^6$ V, $\\sigma_1/\\sigma_2 = 3$",
    },
    {
      type: "worked-example",
      id: "em1-7-we2",
      title: "Worked example 2: earthing the inner shell",
      problem:
        "Two thin concentric shells have radii $a = 10$ cm and $b = 20$ cm. The outer one carries $+4\\ \\mu$C. The inner one is connected to earth (through a small hole in the outer shell). Find the charge on the inner shell and the potential of the outer.",
      steps: [
        { text: "Let the inner shell's charge be $q$. Its potential: $\\dfrac{kq}{a} + \\dfrac{k(4\\ \\mu\\text{C})}{b} = 0$. *Why this step:* inside the outer shell, its contribution is constant, $kQ_b/b$." },
        { text: "$q = -\\dfrac{a}{b}\\times4 = -2\\ \\mu$C. Earth supplies it: the outer shell's charge attracts negative charge up the earthing wire." },
        { text: "Outer potential: $V_b = \\dfrac{k(q + 4\\ \\mu\\text{C})}{b} = \\dfrac{9\\times10^9\\times2\\times10^{-6}}{0.2} = 9\\times10^4$ V." },
      ],
      answer: "Inner shell $-2\\ \\mu$C; outer shell at $9\\times10^4$ V",
    },
    {
      type: "worked-example",
      id: "em1-7-we3",
      title: "Worked example 3: charge in a cavity",
      problem:
        "A $+3\\ \\mu$C point charge is at the centre of a neutral metal shell of inner radius 5 cm and outer radius 10 cm. Find the surface charges and the field at 7 cm and 20 cm from the centre.",
      steps: [
        { text: "Inside the metal $E = 0$, so a Gaussian sphere in the metal encloses zero: the inner surface has $-3\\ \\mu$C." },
        { text: "The shell is neutral, so the outer surface has $+3\\ \\mu$C." },
        { text: "At 7 cm (inside the metal): $E = 0$." },
        { text: "At 20 cm: a Gaussian sphere encloses $+3 - 3 + 3 = +3\\ \\mu$C, so $E = \\dfrac{9\\times10^9\\times3\\times10^{-6}}{0.04} = 6.75\\times10^5$ N/C. The shell hides where the charge is, but not how much." },
      ],
      answer: "Inner surface $-3\\ \\mu$C, outer surface $+3\\ \\mu$C; $E = 0$ at 7 cm, $6.75\\times10^5$ N/C at 20 cm",
    },
    {
      type: "worked-example",
      id: "em1-7-we4",
      title: "Worked example 4: electrostatic pressure",
      problem:
        "A conductor's surface has $\\sigma = 8.85\\ \\mu$C/m². Find the field just outside and the outward pressure.",
      steps: [
        { text: "$E = \\sigma/\\varepsilon_0 = 10^6$ N/C." },
        { text: "Pressure $= \\dfrac{\\sigma^2}{2\\varepsilon_0} = \\dfrac{(8.85\\times10^{-6})^2}{2\\times8.85\\times10^{-12}} \\approx 4.4$ N/m². *Why this step:* this equals $\\tfrac12\\varepsilon_0E^2$, the energy density of the field (2.4); force per area and energy per volume have the same units." },
      ],
      answer: "$E = 10^6$ N/C; pressure $\\approx 4.4$ N/m²",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a charge placed in a cavity is hidden from outside\"",
      content:
        "A neutral conductor around a charge $+q$ gets $-q$ on its inner surface and $+q$ on its outer surface, so outside you still see the field of $+q$. The shielding works the **other** way: charges outside cannot produce a field in the cavity. To hide a charge in a cavity as well, you must earth the conductor, which removes the outer $+q$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "em1-7-q1",
      variant: "concept",
      question: "A solid metal sphere carries charge $Q$. Where is the charge, and what is the field at its centre?",
      options: [
        { text: "Spread uniformly through the volume; field $kQ/R^2$ at the centre", feedback: "That describes an insulating sphere. In a conductor, free charges move to the surface." },
        { text: "On the surface; field zero at the centre", correct: true, feedback: "$E = 0$ inside a conductor in equilibrium, so no charge can sit inside." },
        { text: "On the surface; field $kQ/R^2$ at the centre", feedback: "Inside a conductor the field is zero everywhere, including the centre." },
      ],
      hint: "In electrostatic equilibrium $E = 0$ inside the metal. Apply Gauss's law to a surface just inside the sphere to see where the charge must sit.",
    },
    {
      type: "numeric",
      id: "em1-7-q2",
      variant: "practice",
      question: "Metal spheres of radii 2 cm and 6 cm, far apart, are joined by a thin wire and share a total charge of $16\\ \\mu$C. What is the charge on the smaller sphere? Give your answer in $\\mu$C.",
      answer: 4,
      unit: "$\\mu$C",
      hint: "Joined conductors end at the same potential, $kQ/R$.",
      solution: "Equal potentials: $\\dfrac{kQ_1}{R_1} = \\dfrac{kQ_2}{R_2}$, so $\\dfrac{Q_1}{Q_2} = \\dfrac{R_1}{R_2} = \\dfrac13$. With $Q_1 + Q_2 = 16\\ \\mu$C, $Q_1 = \\dfrac{16}{4} = 4\\ \\mu$C (and $Q_2 = 12\\ \\mu$C).",
      commonMistakes: [
        { answer: 8, feedback: "Equal sharing only happens for identical spheres." },
        { answer: 12, feedback: "That is the larger sphere's charge; charge goes in proportion to radius." },
        { answer: 1.6, feedback: "That uses $Q \\propto R^2$ (equal $\\sigma$). Equal potential gives $Q \\propto R$." },
      ],
    },
    {
      type: "quiz",
      id: "em1-7-q3",
      variant: "concept",
      question: "For the joined spheres in the previous question, which surface has the stronger electric field just outside it?",
      options: [
        { text: "The larger sphere, because it holds more charge", feedback: "It holds more charge, but spread over nine times the area." },
        { text: "They are equal, because the potentials are equal", feedback: "Equal potential gives $Q \\propto R$, so $E = kQ/R^2 \\propto 1/R$." },
        { text: "The smaller sphere, three times stronger", correct: true, feedback: "$E = \\sigma/\\varepsilon_0$ and $\\sigma_1/\\sigma_2 = R_2/R_1 = 3$." },
      ],
      hint: "Joined spheres share one potential, so $kQ/R$ is the same for both. Then compare $\\sigma$, and hence $E = \\sigma/\\varepsilon_0$, for the two radii.",
    },
    {
      type: "quiz",
      id: "em1-7-q4",
      variant: "concept",
      question: "A $+q$ charge sits inside the cavity of an uncharged metal shell. What charge appears on the outer surface of the shell?",
      options: [
        { text: "$+q$", correct: true, feedback: "Inner surface $-q$, outer surface $+q$, total zero." },
        { text: "$0$, the shell is neutral", feedback: "The inner surface takes $-q$; neutrality then forces $+q$ onto the outer surface." },
        { text: "$-q$", feedback: "That is the inner surface. The outer surface carries the balancing $+q$." },
      ],
      hint: "Draw a Gaussian surface inside the metal: $E = 0$ there, so the cavity wall must carry a charge that cancels what it encloses. Then use the shell's total charge.",
    },
    {
      type: "quiz",
      id: "em1-7-q5",
      variant: "practice",
      question: "Just outside a charged conductor the surface density is $\\sigma$. The field there is",
      options: [
        { text: "$\\dfrac{\\sigma}{2\\varepsilon_0}$, perpendicular to the surface", feedback: "That is an isolated sheet, which sends field both ways. A conductor has no field inside." },
        { text: "$\\dfrac{\\sigma}{\\varepsilon_0}$, perpendicular to the surface", correct: true, feedback: "Pillbox with one face inside, where $E = 0$: all the flux goes out through the outer face." },
        { text: "$\\dfrac{\\sigma}{\\varepsilon_0}$, along the surface", feedback: "A field along the surface would push the surface charges around; in equilibrium there is none." },
      ],
      hint: "Use a small pillbox straddling the surface. The field inside the metal is zero, so only the outer face of the pillbox carries flux.",
    },
    {
      type: "numeric",
      id: "em1-7-q6",
      variant: "practice",
      question: "Thin concentric shells of radii 10 cm and 30 cm. The outer carries $+6\\ \\mu$C and the inner is earthed. What is the charge on the inner shell? Give your answer in $\\mu$C, with its sign.",
      answer: -2,
      unit: "$\\mu$C",
      hint: "Earthing sets the inner shell's potential to zero. Add the potentials of both shells at the inner one.",
      solution: "At the inner shell, $V = \\dfrac{kq}{0.1} + \\dfrac{k(6\\ \\mu\\text{C})}{0.3} = 0$, so $q = -\\dfrac{0.1}{0.3}\\times6 = -2\\ \\mu$C.",
      commonMistakes: [
        { answer: -6, feedback: "That would make the inner potential $k(-6)/0.1 + k(6)/0.3 \\ne 0$." },
        { answer: 0, feedback: "Earthing fixes the potential at zero, not the charge. The outer shell's potential must be cancelled." },
        { answer: -18, feedback: "The ratio is $a/b = 1/3$, not $b/a$." },
        { answer: 2, feedback: "Check the sign: the inner shell must cancel the positive potential of the outer shell, so its charge is negative." },
      ],
    },
    {
      type: "quiz",
      id: "em1-7-q7",
      variant: "concept",
      question: "A charged solid metal object is in electrostatic equilibrium. Which statements are true? Select all that apply.",
      multiple: true,
      options: [
        { text: "The electric field inside the metal is zero.", correct: true, feedback: "Any field inside would push the free electrons around; equilibrium means it has done so until the field vanishes." },
        { text: "Every point of the object is at the same potential.", correct: true, feedback: "$E = 0$ inside means $V$ does not change from point to point, and the surface is continuous with the inside." },
        { text: "Its net charge sits on its surface.", correct: true, feedback: "A Gaussian surface just inside the metal has $E = 0$ on it, so it encloses no charge." },
        { text: "The surface charge density is the same everywhere on its surface.", feedback: "Charge crowds where the surface curves most sharply, as with the small sphere joined to a large one, or a lightning rod's point." },
        { text: "Just outside the surface, the field runs along the surface.", feedback: "A field along the surface would push the surface charges around. In equilibrium the field just outside is perpendicular to the surface." },
      ],
      hint: "Test each statement against the conductor rules from this lesson, and think about what happens to $\\sigma$ near sharp points.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-1-mastery",
  title: "1.8 · Chapter 1 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "The chapter in 8 lines",
      content:
        "1. Flux $\\Phi = \\int\\vec E\\cdot d\\vec A$ counts field lines through a surface; outward normal on closed surfaces.\n2. Gauss: $\\oint\\vec E\\cdot d\\vec A = q_{\\text{enc}}/\\varepsilon_0$; $\\vec E$ is the total field, only the net flux ignores outside charges.\n3. Symmetry + the right surface: line $\\lambda/2\\pi\\varepsilon_0r$, sheet $\\sigma/2\\varepsilon_0$, shell $0$ inside, solid sphere $kQr/R^3$ inside.\n4. $V = W/q_0$ from infinity; $V = kq/r$; potentials add as numbers.\n5. $V_A - V_B = \\int_A^B\\vec E\\cdot d\\vec l$; $\\vec E = -\\nabla V$ points downhill; $E = 0$ and $V = 0$ are unrelated.\n6. Equipotentials are perpendicular to $\\vec E$; no work along them.\n7. $U = kq_1q_2/r$ per pair; $W_{\\text{field}} = q(V_A - V_B)$, path-independent; $\\tfrac12mv^2 = qV$.\n8. Conductors: $E = 0$ inside, charge on the surface, one potential, surface field $\\sigma/\\varepsilon_0$; joined spheres have $Q \\propto R$.",
    },
    {
      type: "text",
      content:
        "No formula sheet. Take $k = 9\\times10^9$ SI, $\\varepsilon_0 = 8.85\\times10^{-12}$ SI and $e = 1.6\\times10^{-19}$ C.",
    },
    {
      type: "quiz",
      id: "em1-8-q1",
      variant: "mastery",
      question: "A charge $q$ sits at the midpoint of one edge of a cube. The flux through the cube is",
      options: [
        { text: "$\\dfrac{q}{4\\varepsilon_0}$", correct: true, feedback: "Four cubes share that edge and together enclose $q$." },
        { text: "$\\dfrac{q}{2\\varepsilon_0}$", feedback: "That is a charge at the centre of a face (two cubes share it)." },
        { text: "$\\dfrac{q}{8\\varepsilon_0}$", feedback: "That is a corner (eight cubes share it)." },
        { text: "$\\dfrac{q}{6\\varepsilon_0}$", feedback: "That is the per-face flux for a charge at the centre." },
      ],
      hint: "Gauss's law with symmetry (lesson 1.2, Worked example 2): how many cubes share an edge?",
    },
    {
      type: "quiz",
      id: "em1-8-q2",
      variant: "mastery",
      question: "Two large parallel sheets carry $+2\\sigma$ and $-\\sigma$. The field between them is",
      options: [
        { text: "$\\dfrac{\\sigma}{2\\varepsilon_0}$", feedback: "That is the field **outside**, where the two contributions oppose." },
        { text: "$\\dfrac{3\\sigma}{\\varepsilon_0}$", feedback: "Each sheet gives $\\sigma_{\\text{sheet}}/2\\varepsilon_0$, not $\\sigma_{\\text{sheet}}/\\varepsilon_0$." },
        { text: "$\\dfrac{3\\sigma}{2\\varepsilon_0}$", correct: true, feedback: "$+2\\sigma$ gives $\\sigma/\\varepsilon_0$ away from it; $-\\sigma$ gives $\\sigma/2\\varepsilon_0$ towards it. Between them both point the same way." },
        { text: "$\\dfrac{\\sigma}{\\varepsilon_0}$", feedback: "That is the field of the $+2\\sigma$ sheet alone." },
      ],
      hint: "Superposing sheet fields (lesson 1.3, Worked example 2).",
    },
    {
      type: "quiz",
      id: "em1-8-q3",
      variant: "mastery",
      question: "For a uniformly charged solid sphere of radius $R$, $E(R/3) : E(3R)$ is",
      options: [
        { text: "$81 : 1$", feedback: "Inside a uniform sphere $E \\propto r$, not $1/r^2$." },
        { text: "$1 : 9$", feedback: "Outside, $E \\propto 1/r^2$, not $r$." },
        { text: "$1 : 1$", feedback: "Compute each with its own formula: $kQ/3R^2$ and $kQ/9R^2$." },
        { text: "$3 : 1$", correct: true, feedback: "$kQ(R/3)/R^3 = kQ/3R^2$ and $kQ/9R^2$: ratio 3." },
      ],
      hint: "Field of a solid sphere, inside and outside (lesson 1.3, Worked example 3).",
    },
    {
      type: "quiz",
      id: "em1-8-q4",
      variant: "mastery",
      question: "$+3q$ is at $x = 0$ and $-q$ at $x = 4$ m. Where on the $x$-axis is $V = 0$?",
      options: [
        { text: "$x = 3$ m and $x = 6$ m", correct: true, feedback: "Need the distance to $+3q$ three times the distance to $-q$: $x = 3(4 - x) \\Rightarrow 3$; $x = 3(x - 4) \\Rightarrow 6$." },
        { text: "$x = 1$ m and $x = -2$ m", feedback: "At those points the larger charge is nearer, so its potential dominates." },
        { text: "$x = 3$ m only", feedback: "There is a second point beyond the smaller charge." },
        { text: "$x = 6$ m only", feedback: "There is also a point between the charges." },
      ],
      hint: "Points where $V = 0$ (lesson 1.4, Worked example 3): check between and beyond the charges.",
    },
    {
      type: "numeric",
      id: "em1-8-q5",
      variant: "mastery",
      question: "$V = 2xy - z^2$ volts ($x$, $y$, $z$ in metres). What is the magnitude of $\\vec E$ at $(1, 1, 1)$ m? Give your answer in V/m, to two decimal places.",
      answer: 3.4641,
      relTolerance: 0.01,
      unit: "V/m",
      hint: "$\\vec E = -\\left(\\dfrac{\\partial V}{\\partial x}, \\dfrac{\\partial V}{\\partial y}, \\dfrac{\\partial V}{\\partial z}\\right)$, then take the magnitude.",
      solution: "$\\dfrac{\\partial V}{\\partial x} = 2y$, $\\dfrac{\\partial V}{\\partial y} = 2x$, $\\dfrac{\\partial V}{\\partial z} = -2z$. At $(1, 1, 1)$: $\\vec E = -(2, 2, -2) = (-2, -2, 2)$ V/m, so $|\\vec E| = \\sqrt{4 + 4 + 4} = 2\\sqrt3 \\approx 3.46$ V/m.",
      commonMistakes: [
        { answer: 1, feedback: "That is $V(1,1,1) = 2 - 1$. The field comes from the slopes of $V$." },
        { answer: 2.8284, tolerance: 0.02, feedback: "That is $2\\sqrt2$: you dropped the $z$ component, $-\\partial V/\\partial z = 2z = 2$." },
        { answer: 6, feedback: "Combine components with Pythagoras, not by adding magnitudes." },
      ],
    },
    {
      type: "quiz",
      id: "em1-8-q6",
      variant: "mastery",
      question: "Charges $+q$, $-q$ and $+q$ sit at the corners of an equilateral triangle of side $a$. The potential energy of the system is",
      options: [
        { text: "$+\\dfrac{kq^2}{a}$", feedback: "There are two attracting pairs and only one repelling pair." },
        { text: "$-\\dfrac{kq^2}{a}$", correct: true, feedback: "Pairs: $(+q)(-q)$ twice, $(+q)(+q)$ once: $(-1 - 1 + 1)kq^2/a$." },
        { text: "$\\dfrac{3kq^2}{a}$", feedback: "That ignores the signs." },
        { text: "$0$", feedback: "The pairs do not cancel: $-2 + 1 = -1$." },
      ],
      hint: "Potential energy of a system: sum over all pairs (lesson 1.6).",
    },
    {
      type: "numeric",
      id: "em1-8-q7",
      variant: "mastery",
      question: "An electron starts from rest and is accelerated through 2500 V. What is its final speed? Take $e = 1.6\\times10^{-19}$ C and $m_e = 9.1\\times10^{-31}$ kg, and give your answer in m/s (for example 1.5e7).",
      answer: 2.965e7,
      relTolerance: 0.02,
      unit: "m/s",
      hint: "The kinetic energy gained is $eV$: $\\tfrac12m_ev^2 = eV$.",
      solution: "$v = \\sqrt{\\dfrac{2eV}{m_e}} = \\sqrt{\\dfrac{2\\times1.6\\times10^{-19}\\times2500}{9.1\\times10^{-31}}} = \\sqrt{8.8\\times10^{14}} \\approx 3.0\\times10^7$ m/s, about a tenth of the speed of light.",
      commonMistakes: [
        { answer: 8.8e14, tolerance: 2e13, feedback: "That is $v^2$. Take the square root." },
        { answer: 2.1e7, tolerance: 3e5, feedback: "You left out the factor 2 in $\\tfrac12mv^2 = eV$." },
        { answer: 5.93e6, tolerance: 1e5, feedback: "That is the speed after 100 V. Speed goes as $\\sqrt V$: five times more here." },
      ],
    },
    {
      type: "numeric",
      id: "em1-8-q8",
      variant: "mastery",
      question: "Two charged metal spheres of radii 1 cm and 4 cm, far apart, are joined by a thin wire. What is the ratio of their surface fields, $E_{\\text{small}}/E_{\\text{large}}$?",
      answer: 4,
      hint: "Joined spheres share one potential, $kQ/R$. Then compare $E = kQ/R^2$.",
      solution: "Equal potentials give $Q \\propto R$, so $E = \\dfrac{kQ}{R^2} \\propto \\dfrac1R$. Then $\\dfrac{E_{\\text{small}}}{E_{\\text{large}}} = \\dfrac{4\\text{ cm}}{1\\text{ cm}} = 4$.",
      commonMistakes: [
        { answer: 0.25, feedback: "That is $E_{\\text{large}}/E_{\\text{small}}$. The larger sphere holds more charge, but its field is weaker: $E \\propto 1/R$." },
        { answer: 16, feedback: "That would need equal charges. Equal potentials give $Q \\propto R$." },
        { answer: 1, feedback: "Equal potentials, not equal fields." },
      ],
    },
    {
      type: "quiz",
      id: "em1-8-q9",
      variant: "mastery",
      question: "(JEE Advanced style) Thin concentric shells have radii $R$ and $2R$. The inner carries $+Q$ and the outer $+2Q$. The outer shell is now earthed. What is the charge on the outer shell afterwards?",
      options: [
        { text: "$-Q$", correct: true, feedback: "$V_{\\text{outer}} = k(Q + q_b)/2R = 0 \\Rightarrow q_b = -Q$. So $3Q$ flows to earth." },
        { text: "$0$", feedback: "With zero charge the outer potential would be $kQ/2R$ from the inner shell, not zero." },
        { text: "$-2Q$", feedback: "Earthing does not just cancel the outer shell's own $+2Q$. It makes the **total** charge enclosed by the outer surface zero: $Q + q_b = 0$, so $q_b = -Q$." },
        { text: "$+2Q$, earthing does not change it", feedback: "Earthing fixes the potential at 0, and charge flows to make it so." },
      ],
      hint: "Earthing sets the potential of the earthed conductor to zero (lesson 1.7, Worked example 2).",
    },
    {
      type: "quiz",
      id: "em1-8-q10",
      variant: "mastery",
      question: "(Continued) After earthing, what is the potential of the inner shell?",
      options: [
        { text: "$0$, because the outer shell is earthed", feedback: "Only the outer shell is at zero. The inner shell's own charge lifts it above that." },
        { text: "$\\dfrac{kQ}{2R}$", correct: true, feedback: "$\\dfrac{kQ}{R} + \\dfrac{k(-Q)}{2R} = \\dfrac{kQ}{2R}$." },
        { text: "$\\dfrac{kQ}{R}$", feedback: "You left out the outer shell's $-Q$, which contributes $-kQ/2R$ everywhere inside it." },
        { text: "$\\dfrac{2kQ}{R}$", feedback: "That uses the old outer charge $+2Q$: $kQ/R + k(2Q)/2R$. The outer charge is now $-Q$." },
      ],
      hint: "Potential of concentric shells: superpose the contribution of each shell (lesson 1.7).",
    },
    {
      type: "quiz",
      id: "em1-8-q11",
      variant: "mastery",
      question: "(Variant) Same shells, $+Q$ inside and $+2Q$ outside, but now the **inner** shell is earthed and the outer left isolated. The inner shell's charge becomes",
      options: [
        { text: "$-2Q$", feedback: "The outer shell's potential inside it is $k(2Q)/(2R) = kQ/R$, which $-Q$ on the inner shell cancels." },
        { text: "$0$", feedback: "Then its potential would be $kQ/R$ from the outer shell, not zero." },
        { text: "$-4Q$", feedback: "You used $b/a$ instead of $a/b$: $q_a = -(a/b)Q_b = -\\tfrac12(2Q)$." },
        { text: "$-Q$", correct: true, feedback: "$kq_a/R + k(2Q)/2R = 0 \\Rightarrow q_a = -Q$." },
      ],
      hint: "Earthing the inner shell (lesson 1.7, Worked example 2): set its potential to zero.",
    },
    {
      type: "quiz",
      id: "em1-8-q12",
      variant: "mastery",
      question: "A closed Gaussian surface encloses an electric dipole and nothing else. Which is true?",
      options: [
        { text: "The flux is zero and the field on the surface is zero.", feedback: "Zero net flux does not mean zero field; the dipole's field certainly reaches the surface." },
        { text: "The flux is zero, but the field on the surface is generally not zero.", correct: true, feedback: "$q_{\\text{enc}} = 0$ fixes the net flux, not the field." },
        { text: "The flux is $2q/\\varepsilon_0$, one $q/\\varepsilon_0$ per charge.", feedback: "Flux counts the net enclosed charge, with signs: $+q - q = 0$." },
      ],
      hint: "Gauss's law (lesson 1.2): what does the flux depend on, and does that fix the field on the surface?",
    },
    {
      type: "quiz",
      id: "em1-8-q13",
      variant: "mastery",
      question: "(JEE Advanced style) An insulating solid sphere of radius $R$ carries charge $Q > 0$ spread uniformly through its volume. Which statements are true? Select all that apply.",
      multiple: true,
      options: [
        { text: "The field at the centre is zero.", correct: true, feedback: "A Gaussian sphere of radius $r \\to 0$ encloses no charge; equally, by symmetry no direction is preferred." },
        { text: "The potential at the centre is $\\dfrac{3kQ}{2R}$.", correct: true, feedback: "$V = kQ(3R^2 - r^2)/2R^3$ inside; at $r = 0$ it is $3kQ/2R$, half as much again as the surface value." },
        { text: "The field is largest at the surface.", correct: true, feedback: "Inside, $E = kQr/R^3$ rises with $r$; outside, $E = kQ/r^2$ falls. The peak $kQ/R^2$ is at $r = R$." },
        { text: "The potential is largest at the surface.", feedback: "Inside, $\\vec E$ points outward, so $V$ keeps rising as you go in. It is largest at the centre." },
        { text: "Inside the sphere the field falls off as $1/r^2$.", feedback: "The enclosed charge grows as $r^3$, so $E = kQr/R^3 \\propto r$ inside. The $1/r^2$ law holds only outside." },
      ],
      hint: "Field and potential of a uniformly charged solid sphere (lessons 1.3 and 1.4).",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Two conductors carrying $+Q$ and $-Q$ sit at different potentials, and the ratio $Q/\\Delta V$ turns out to depend only on their shapes. That ratio is capacitance, and Chapter 2 builds on everything here: sheet fields, potential differences and conductors.",
    },
  ]),
};

export const emChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
