import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Vector Algebra Chapter 3 — The Dot Product.
 * The first product, grown from a shadow and from work: the component
 * formula derived from the law of cosines, then angles, perpendicularity,
 * the algebra of expanding, projections and work.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "shadows-and-work",
  title: "3.1 · Shadows and Work",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/va-3-dot-product.mp4",
      poster: "/videos/va-3-dot-product.jpg",
      title: "Chapter 3 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "You are dragging a sled across flat snow with a rope. The rope points up and forward at an angle, so your pull $\\vec F$ does two jobs at once: part of it drags the sled forward, and part of it tries to lift the sled off the ground. Only the forward part moves the sled along the path. The upward part does nothing useful, because the sled never leaves the snow.",
    },
    {
      type: "text",
      content:
        "Physics calls the useful effort **work**: the forward part of the force times the distance moved. If the rope makes angle $\\theta$ with the ground, the forward part of a pull of size $|\\vec F|$ is $|\\vec F|\\cos\\theta$ (the adjacent side of the right triangle from Chapter 1). Over a displacement $\\vec d$ the work is",
    },
    { type: "math", latex: "W = \\big(|\\vec F|\\cos\\theta\\big)\\,|\\vec d| = |\\vec F|\\,|\\vec d|\\cos\\theta" },
    {
      type: "text",
      content:
        "Look at the right-hand side. It uses two vectors, their lengths and the angle between them, and it gives back a single number. That combination turns up so often in geometry and physics that it gets its own name and symbol.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The dot product (scalar product)",
      content:
        "For vectors $\\vec a$ and $\\vec b$ with angle $\\theta$ between them ($0 \\le \\theta \\le \\pi$): $\\vec a \\cdot \\vec b = |\\vec a|\\,|\\vec b|\\cos\\theta$.\nThe angle is measured with the two vectors drawn **tail to tail**. If either vector is $\\vec 0$, the product is 0.",
    },
    {
      type: "text",
      content:
        "**The shadow picture.** Shine a light straight down onto the line of $\\vec a$. The arrow $\\vec b$ casts a shadow on that line, and the shadow's signed length is $|\\vec b|\\cos\\theta$. So",
    },
    { type: "math", latex: "\\vec a\\cdot\\vec b = (\\text{length of } \\vec a) \\times (\\text{signed shadow of } \\vec b \\text{ on } \\vec a)" },
    {
      type: "text",
      content:
        "The shadow is positive when it falls along $\\vec a$ and negative when it falls backwards. Drag $\\vec b$ below and watch the shadow and the number.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "dot",
        a: [4, 0],
        b: [2, 3],
        draggable: ["a", "b"],
        showProjection: true,
        readouts: ["dot", "angle", "projection"],
        caption:
          "Swing b round a full turn. The shadow shrinks to nothing at 90°, and past 90° it falls behind the tail, so the dot product turns negative.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the number is largest when $\\vec b$ points along $\\vec a$, it passes through zero exactly when $\\vec b$ is at right angles to $\\vec a$, and it is most negative when $\\vec b$ points straight back. All of that is just $\\cos\\theta$ doing what it does.",
    },
    {
      type: "table",
      headers: ["Angle $\\theta$", "$\\cos\\theta$", "$\\vec a\\cdot\\vec b$", "Shadow of $\\vec b$"],
      rows: [
        ["$0$", "$1$", "$|\\vec a||\\vec b|$ (largest)", "the whole of $\\vec b$, forwards"],
        ["acute, $0 < \\theta < 90^\\circ$", "positive", "positive", "falls forwards"],
        ["$90^\\circ$", "$0$", "$0$", "a single point"],
        ["obtuse, $90^\\circ < \\theta < 180^\\circ$", "negative", "negative", "falls backwards"],
        ["$180^\\circ$", "$-1$", "$-|\\vec a||\\vec b|$ (smallest)", "the whole of $\\vec b$, backwards"],
      ],
    },
    {
      type: "text",
      content:
        "The shadow picture works in either direction. $|\\vec a||\\vec b|\\cos\\theta$ is also $|\\vec b|$ times the shadow of $\\vec a$ on $\\vec b$, so it does not matter which vector casts the shadow. That is why $\\vec a\\cdot\\vec b = \\vec b\\cdot\\vec a$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $|\\vec a| = 3$, $|\\vec b| = 4$, and the angle between them is $60^\\circ$.\n\n1. Write the definition: $\\vec a\\cdot\\vec b = |\\vec a||\\vec b|\\cos\\theta$.\n2. Substitute: $3 \\times 4 \\times \\cos 60^\\circ = 12 \\times \\tfrac12$.\n3. So $\\vec a\\cdot\\vec b = 6$.\n\n**Worked example 2.** $|\\vec a| = 2$, $|\\vec b| = 5$, angle $120^\\circ$.\n\n1. $\\cos 120^\\circ = -\\tfrac12$, because the angle is obtuse.\n2. $\\vec a\\cdot\\vec b = 2 \\times 5 \\times (-\\tfrac12) = -5$.\n3. The minus sign is information: the shadow of $\\vec b$ falls behind $\\vec a$.\n\n**Worked example 3 (the sled).** You pull with 50 N along a rope at $60^\\circ$ to the ground and the sled moves 10 m forward.\n\n1. $W = \\vec F\\cdot\\vec d = |\\vec F||\\vec d|\\cos\\theta$.\n2. $W = 50 \\times 10 \\times \\cos 60^\\circ = 500 \\times \\tfrac12 = 250$ J.\n3. Only half of your pull is going into moving the sled. Pull at $0^\\circ$ and all 500 J would.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a box sliding down a ramp).** A 10 kg box slides 4 m down a smooth ramp inclined at $30^\\circ$ to the horizontal. Take $g = 10$ m/s². How much work does gravity do?\n\n1. The force is the weight, $|\\vec F| = mg = 100$ N, pointing straight down.\n2. The displacement is 4 m **down the slope**. *Why this step:* work pairs the force with the actual path, not with the vertical drop or the horizontal run.\n3. The angle between them is not $30^\\circ$. The slope makes $30^\\circ$ with the horizontal, so it makes $90^\\circ - 30^\\circ = 60^\\circ$ with the vertical. *Why this step:* the dot product needs the angle between the two arrows placed tail to tail, and those arrows are \"straight down\" and \"down the slope\".\n4. Substitute:",
    },
    { type: "math", latex: "W = |\\vec F||\\vec d|\\cos 60^\\circ = 100 \\times 4 \\times \\tfrac12 = 200\\text{ J}" },
    {
      type: "text",
      content:
        "5. Sanity check with $mgh$: the box drops $h = 4\\sin 30^\\circ = 2$ m, and $100 \\times 2 = 200$ J. ✓ The dot product automatically kept only the part of the path that goes *with* gravity.\n\n**Worked example 5 (running the definition backwards, CBSE style).** $|\\vec a| = 4$, $|\\vec b| = 3$ and $\\vec a\\cdot\\vec b = -6\\sqrt2$. Find the angle between $\\vec a$ and $\\vec b$.\n\n1. Solve the definition for the cosine. *Why this step:* the definition links four quantities; knowing three fixes the fourth.",
    },
    { type: "math", latex: "\\cos\\theta = \\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|} = \\frac{-6\\sqrt2}{12} = -\\frac{\\sqrt2}{2}" },
    {
      type: "text",
      content:
        "2. The cosine is negative, so the angle is obtuse. *Why this step:* on $[0^\\circ, 180^\\circ]$ each cosine value belongs to exactly one angle, and the sign tells you which half to look in.\n3. $\\cos 45^\\circ = \\frac{\\sqrt2}{2}$, so $\\theta = 180^\\circ - 45^\\circ = 135^\\circ$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "A vector dotted with itself",
      content:
        "The angle between $\\vec a$ and itself is 0, so $\\vec a\\cdot\\vec a = |\\vec a|^2\\cos 0 = |\\vec a|^2$. This small fact is how lengths get into dot-product algebra, and you will use it constantly from 3.4 onwards.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the dot product is a vector\"",
      content:
        "It takes in two vectors and gives out a **number**. It has a size and a sign but no direction, which is why it is also called the *scalar product*. Writing $\\vec a\\cdot\\vec b = 6\\hat i$, or putting an arrow over the answer, is always wrong. Work, a dot product, is a scalar too: energy has no direction.",
    },
    {
      type: "quiz",
      id: "va3-1-q1",
      variant: "concept",
      question: "What kind of object is $\\vec a\\cdot\\vec b$?",
      options: [
        { text: "A vector pointing along $\\vec a$.", feedback: "The shadow lies along $\\vec a$, but the product multiplies its signed length by $|\\vec a|$ and keeps only the number." },
        { text: "A vector perpendicular to both $\\vec a$ and $\\vec b$.", feedback: "That describes the cross product, which is Chapter 4. The dot product has no direction at all." },
        { text: "A scalar that can never be negative, since it is built from lengths.", feedback: "It is a scalar, but $\\cos\\theta$ is negative for obtuse angles, so the product can be negative." },
        {
          text: "A scalar: a single number, which may be positive, zero or negative.",
          correct: true,
          feedback: "Length times signed shadow is a number. That is the whole reason it is called the scalar product.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va3-1-q2",
      variant: "practice",
      question: "$|\\vec a| = 6$, $|\\vec b| = 2$ and the angle between them is $45^\\circ$. Find $\\vec a\\cdot\\vec b$.",
      options: [
        { text: "$12$", feedback: "That is $|\\vec a||\\vec b|$ with the $\\cos 45^\\circ$ left out. That only happens when the vectors point the same way." },
        { text: "$6\\sqrt2$", correct: true, feedback: "$6 \\times 2 \\times \\frac{\\sqrt2}{2} = 6\\sqrt2 \\approx 8.49$." },
        { text: "$3\\sqrt2$", feedback: "You halved once too often: $\\cos 45^\\circ = \\frac{\\sqrt2}{2}$, and $12 \\times \\frac{\\sqrt2}{2} = 6\\sqrt2$." },
        { text: "$6\\sqrt2\\,\\hat i$", feedback: "The number is right but the $\\hat i$ is not. A dot product has no direction." },
      ],
      hint: "Multiply the two lengths, then multiply by $\\cos 45^\\circ = \\frac{\\sqrt2}{2}$.",
    },
    {
      type: "quiz",
      id: "va3-1-q3",
      variant: "concept",
      question: "Two non-zero vectors make an angle of $130^\\circ$. What is the sign of $\\vec a\\cdot\\vec b$?",
      options: [
        { text: "Positive, because lengths are positive", feedback: "The lengths are positive, but the cosine carries the sign, and $\\cos 130^\\circ < 0$." },
        { text: "Zero", feedback: "Zero needs exactly $90^\\circ$ (for non-zero vectors)." },
        { text: "Negative", correct: true, feedback: "The angle is obtuse, so $\\cos 130^\\circ < 0$ and the shadow falls backwards." },
      ],
    },
    {
      type: "quiz",
      id: "va3-1-q4",
      variant: "practice",
      question: "A force of 20 N acts along a rope at $30^\\circ$ to the ground and drags a box 5 m along the ground. How much work does it do?",
      options: [
        { text: "$50$ J", feedback: "You used $\\sin 30^\\circ$, which gives the lifting part of the force. The forward part is the cosine one." },
        { text: "$50\\sqrt3$ J $\\approx 86.6$ J", correct: true, feedback: "$20 \\times 5 \\times \\cos 30^\\circ = 100 \\times \\frac{\\sqrt3}{2} = 50\\sqrt3$." },
        { text: "$100$ J", feedback: "That treats the whole force as forward. Only $20\\cos 30^\\circ$ N of it is." },
      ],
      hint: "Work is force times displacement times the cosine of the angle between them.",
    },
    {
      type: "quiz",
      id: "va3-1-q5",
      variant: "concept",
      question: "You carry a heavy bag at constant height while walking 20 m along a level corridor. How much work does gravity do on the bag?",
      options: [
        { text: "Zero: gravity is perpendicular to the displacement, so $\\cos 90^\\circ = 0$.", correct: true, feedback: "Gravity points down and the bag moves sideways. The shadow of the force on the path is a single point." },
        { text: "The weight times 20 m, since the bag is heavy.", feedback: "Weight times distance only counts when the weight points along the motion. Here it is at $90^\\circ$ to it." },
        { text: "Negative, because gravity pulls down.", feedback: "Gravity would do negative work if the bag moved upwards. Level motion gives zero." },
      ],
    },
    {
      type: "quiz",
      id: "va3-1-q6",
      variant: "practice",
      question: "A 5 kg crate slides 6 m down a ramp inclined at $30^\\circ$ to the horizontal. Taking $g = 10$ m/s², how much work does gravity do?",
      options: [
        { text: "$150\\sqrt3$ J", feedback: "You used the ramp angle $30^\\circ$ as the angle between the weight and the path. The weight is vertical, so the angle is $90^\\circ - 30^\\circ = 60^\\circ$." },
        { text: "$300$ J", feedback: "That treats the whole path as vertical. Only the part of the path along the weight counts: $\\cos 60^\\circ = \\frac12$." },
        { text: "$150$ J", correct: true, feedback: "$50 \\times 6 \\times \\cos 60^\\circ = 150$ J. Check: the drop is $6\\sin 30^\\circ = 3$ m and $mgh = 50 \\times 3 = 150$ J." },
        { text: "$-150$ J", feedback: "The crate moves down and gravity pulls down, so the angle is acute and the work is positive." },
      ],
      hint: "Weight points straight down; the path points down the slope. What angle do those two arrows make?",
    },
    {
      type: "quiz",
      id: "va3-1-q7",
      variant: "practice",
      question: "$|\\vec a| = 2$, $|\\vec b| = 2\\sqrt2$ and $\\vec a\\cdot\\vec b = -4$. Find the angle between $\\vec a$ and $\\vec b$.",
      options: [
        { text: "$45^\\circ$", feedback: "$\\cos\\theta = -\\frac{1}{\\sqrt2}$ is negative, so the angle must be obtuse." },
        { text: "$135^\\circ$", correct: true, feedback: "$\\cos\\theta = \\frac{-4}{2 \\cdot 2\\sqrt2} = -\\frac{1}{\\sqrt2}$, so $\\theta = 135^\\circ$." },
        { text: "$120^\\circ$", feedback: "$\\cos 120^\\circ = -\\frac12$, but here $\\cos\\theta = -\\frac{1}{\\sqrt2}$." },
      ],
      hint: "$\\cos\\theta = \\dfrac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}$.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "component-formula",
  title: "3.2 · The Component Formula",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "The definition $|\\vec a||\\vec b|\\cos\\theta$ is beautiful but awkward to use. Given $\\vec a = 2\\hat i - \\hat j + 3\\hat k$ and $\\vec b = \\hat i + 4\\hat j + 2\\hat k$, nobody tells you the angle between them. You would have to find it first. We want a formula that uses only the components, and we will derive it from something you already trust: the law of cosines.",
    },
    {
      type: "text",
      content:
        "Draw $\\vec a$ and $\\vec b$ tail to tail at the origin, with angle $\\theta$ between them. The third side of the triangle, from the tip of $\\vec b$ to the tip of $\\vec a$, is $\\vec a - \\vec b$ (triangle law, Chapter 0). So we have a triangle with sides $|\\vec a|$, $|\\vec b|$, $|\\vec a - \\vec b|$ and the angle $\\theta$ between the first two.",
    },
    {
      type: "text",
      content:
        "The law of cosines relates exactly those four quantities. In the solver below, slider $b$ plays $|\\vec a|$, slider $c$ plays $|\\vec b|$, the angle $A$ is $\\theta$, and the computed side $a$ is $|\\vec a - \\vec b|$. Ignore the letters and match the roles. Change the angle and watch the opposite side respond.",
    },
    {
      type: "interactive",
      config: {
        component: "triangle-solver",
        mode: "sas",
        initialB: 5,
        initialC: 4,
        initialAngle: 60,
        showLawOfSines: false,
        caption:
          "Two sides and the angle between them fix the third side. At 60° with sides 5 and 4: third side² = 25 + 16 − 2·5·4·½ = 21.",
      },
    },
    {
      type: "text",
      content: "Written for our vector triangle, the law of cosines says",
    },
    { type: "math", latex: "|\\vec a - \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2 - 2|\\vec a||\\vec b|\\cos\\theta" },
    {
      type: "text",
      content:
        "The last term contains the dot product, so rearrange to isolate it:",
    },
    { type: "math", latex: "\\vec a\\cdot\\vec b = |\\vec a||\\vec b|\\cos\\theta = \\tfrac12\\Big(|\\vec a|^2 + |\\vec b|^2 - |\\vec a - \\vec b|^2\\Big)" },
    {
      type: "text",
      content:
        "The right-hand side has no angle in it, only lengths, and lengths come straight from components. With $\\vec a = (a_1, a_2, a_3)$ and $\\vec b = (b_1, b_2, b_3)$, so that $\\vec a - \\vec b = (a_1 - b_1,\\ a_2 - b_2,\\ a_3 - b_3)$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} |\\vec a|^2 &= a_1^2 + a_2^2 + a_3^2 \\\\ |\\vec b|^2 &= b_1^2 + b_2^2 + b_3^2 \\\\ |\\vec a - \\vec b|^2 &= (a_1-b_1)^2 + (a_2-b_2)^2 + (a_3-b_3)^2 \\\\ &= (a_1^2 + a_2^2 + a_3^2) - 2(a_1b_1 + a_2b_2 + a_3b_3) + (b_1^2 + b_2^2 + b_3^2) \\end{aligned}",
    },
    {
      type: "text",
      content:
        "Substitute. Every square cancels, leaving only the cross terms:",
    },
    {
      type: "math",
      latex:
        "\\vec a\\cdot\\vec b = \\tfrac12\\Big(2(a_1b_1 + a_2b_2 + a_3b_3)\\Big) = a_1b_1 + a_2b_2 + a_3b_3",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The component formula",
      content:
        "$\\vec a\\cdot\\vec b = a_1b_1 + a_2b_2 + a_3b_3$\nMultiply matching components and **add**. In the plane, drop the third term: $a_1b_1 + a_2b_2$.",
    },
    {
      type: "text",
      content:
        "**A second route, as a check.** Use the definition directly on the unit vectors. $\\hat i$, $\\hat j$, $\\hat k$ each have length 1 and meet each other at right angles, so a unit vector dotted with itself gives $1\\cdot1\\cdot\\cos 0 = 1$, and two different ones give $1\\cdot1\\cdot\\cos 90^\\circ = 0$:",
    },
    {
      type: "table",
      headers: ["$\\cdot$", "$\\hat i$", "$\\hat j$", "$\\hat k$"],
      rows: [
        ["$\\hat i$", "$1$", "$0$", "$0$"],
        ["$\\hat j$", "$0$", "$1$", "$0$"],
        ["$\\hat k$", "$0$", "$0$", "$1$"],
      ],
    },
    {
      type: "text",
      content:
        "If the dot product distributes over addition, then multiplying out $(a_1\\hat i + a_2\\hat j + a_3\\hat k)\\cdot(b_1\\hat i + b_2\\hat j + b_3\\hat k)$ gives nine terms. The six mixed ones such as $a_1b_2\\,\\hat i\\cdot\\hat j$ are zero, and the three matched ones leave $a_1b_1 + a_2b_2 + a_3b_3$. This is a consistency check rather than a second proof: distributivity itself is justified by the shadow picture (the shadows of $\\vec b$ and $\\vec c$ on $\\vec a$ add up to the shadow of $\\vec b + \\vec c$), which 3.4 shows.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $\\vec a = 2\\hat i - \\hat j + 3\\hat k$, $\\vec b = \\hat i + 4\\hat j + 2\\hat k$.\n\n1. Pair the components: $(2)(1)$, $(-1)(4)$, $(3)(2)$.\n2. Multiply: $2$, $-4$, $6$.\n3. Add: $\\vec a\\cdot\\vec b = 2 - 4 + 6 = 4$.\n\n**Worked example 2.** $\\vec a = 3\\hat i + 2\\hat j - \\hat k$, $\\vec b = \\hat i - 2\\hat j + 5\\hat k$.\n\n1. Products: $3 \\cdot 1 = 3$, $2 \\cdot (-2) = -4$, $(-1)\\cdot 5 = -5$.\n2. Sum: $3 - 4 - 5 = -6$. Negative, so the angle between them is obtuse.\n\n**Worked example 3 (both formulas agree).** $\\vec a = (4, 0)$, $\\vec b = (2, 2)$.\n\n1. Components: $4\\cdot2 + 0\\cdot2 = 8$.\n2. Geometry: $|\\vec a| = 4$, $|\\vec b| = 2\\sqrt2$, and $\\vec b$ makes $45^\\circ$ with the x-axis, which is the direction of $\\vec a$.\n3. $4 \\cdot 2\\sqrt2 \\cdot \\tfrac{\\sqrt2}{2} = 8$. Same answer.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a grocery bill is a dot product).** At a kirana shop you buy 3 kg of rice, 2 kg of dal and 5 kg of sugar. The prices are ₹60, ₹120 and ₹45 per kg. Put the quantities in one vector and the prices in another:\n\n1. $\\vec q = (3, 2, 5)$ (kg) and $\\vec p = (60, 120, 45)$ (₹/kg). *Why this step:* matching positions must mean the same item, exactly as matching components mean the same axis.\n2. Each item costs quantity times price, and the bill adds the three costs. That is precisely \"multiply matching components, then add\":",
    },
    { type: "math", latex: "\\vec q\\cdot\\vec p = 3(60) + 2(120) + 5(45) = 180 + 240 + 225 = 645" },
    {
      type: "text",
      content:
        "3. The bill is ₹645, one number, not a list of three. Spreadsheets, shop billing and a neural network's \"weighted sum\" all run on this same formula; the angle picture is a bonus you get for free.\n\n**Worked example 5 (combinations first, exam style).** $\\vec a = \\hat i + 2\\hat j - \\hat k$ and $\\vec b = 3\\hat i - \\hat j + 2\\hat k$. Find $(2\\vec a - \\vec b)\\cdot(\\vec a + 3\\vec b)$.\n\n1. Build each bracket as a single vector. *Why this step:* one dot product of two known vectors is less error-prone than expanding four terms.",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} 2\\vec a - \\vec b &= (2-3,\\ 4+1,\\ -2-2) = (-1, 5, -4) \\\\ \\vec a + 3\\vec b &= (1+9,\\ 2-3,\\ -1+6) = (10, -1, 5) \\end{aligned}",
    },
    {
      type: "text",
      content:
        "2. Dot them: $(-1)(10) + (5)(-1) + (-4)(5) = -10 - 5 - 20 = -35$.\n3. Cross-check by expanding (the rules are proved in 3.4): the product is $2|\\vec a|^2 + 5\\,\\vec a\\cdot\\vec b - 3|\\vec b|^2$. With $|\\vec a|^2 = 6$, $|\\vec b|^2 = 14$ and $\\vec a\\cdot\\vec b = 3 - 2 - 2 = -1$, that is $12 - 5 - 42 = -35$. ✓ *Why this step:* two independent routes to the same number is the cheapest insurance against a sign slip.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the dot product is a list of three products\"",
      content:
        "Multiplying matching components is only half the job. You must then **add** the products. The answer is one number, not a list of three. $(2, -4, 6)$ is not the dot product in Worked example 1; $2 - 4 + 6 = 4$ is.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Missing components are zeros",
      content:
        "$\\vec a = 3\\hat i + \\hat k$ has no $\\hat j$ part, so $a_2 = 0$. Write the zero in before pairing, or you will pair the wrong components.",
    },
    {
      type: "quiz",
      id: "va3-2-q1",
      variant: "practice",
      question: "Find $(\\hat i + 2\\hat j + 3\\hat k)\\cdot(4\\hat i - 5\\hat j + 6\\hat k)$.",
      options: [
        { text: "$(4, -10, 18)$", feedback: "Those are the three products. Add them to get the dot product." },
        { text: "$32$", feedback: "You dropped the minus sign on $-5$: $4 + 10 + 18 = 32$. The middle product is $2 \\times (-5) = -10$." },
        { text: "$12$", correct: true, feedback: "$4 - 10 + 18 = 12$." },
        { text: "$-12$", feedback: "Check the signs: only the middle product is negative, $4 - 10 + 18 = 12$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-2-q2",
      variant: "concept",
      question: "A student writes $(2, 1, 0)\\cdot(3, -1, 4) = (6, -1, 0)$. What went wrong?",
      options: [
        { text: "Nothing. The dot product of two vectors is a vector.", feedback: "It is a scalar: length times signed shadow." },
        { text: "They multiplied matching components but did not add them. The answer is $6 - 1 + 0 = 5$.", correct: true, feedback: "The dot product is always one number." },
        { text: "The zero component makes the dot product undefined.", feedback: "Zero components are fine. They simply contribute 0 to the sum." },
      ],
    },
    {
      type: "quiz",
      id: "va3-2-q3",
      variant: "practice",
      question: "Find $(2\\hat i - \\hat j + \\hat k)\\cdot(\\hat i + 3\\hat j - 2\\hat k)$.",
      options: [
        { text: "$7$", feedback: "That adds absolute values. Keep the signs: $2 + (-3) + (-2)$." },
        { text: "$1$", feedback: "Recheck the last pair: $1 \\times (-2) = -2$, so the total is $2 - 3 - 2 = -3$." },
        { text: "$-3$", correct: true, feedback: "$2 - 3 - 2 = -3$. Negative, so the angle is obtuse." },
      ],
    },
    {
      type: "quiz",
      id: "va3-2-q4",
      variant: "concept",
      question: "In the derivation, which fact about triangles turns $|\\vec a||\\vec b|\\cos\\theta$ into a formula with no angle?",
      options: [
        { text: "The law of cosines on the triangle with sides $|\\vec a|$, $|\\vec b|$, $|\\vec a - \\vec b|$.", correct: true, feedback: "It expresses the $\\cos\\theta$ term through three lengths, and lengths come from components." },
        { text: "The law of sines.", feedback: "The law of sines relates sides to opposite angles. It does not isolate $|\\vec a||\\vec b|\\cos\\theta$." },
        { text: "The angle sum of a triangle.", feedback: "The angle sum does not involve any side lengths, so it cannot produce a component formula." },
      ],
    },
    {
      type: "quiz",
      id: "va3-2-q5",
      variant: "practice",
      question: "Find $(\\hat i + \\hat j)\\cdot(\\hat j + \\hat k)$.",
      options: [
        { text: "$0$", feedback: "$\\hat j$ appears in both, and $\\hat j\\cdot\\hat j = 1$." },
        { text: "$2$", feedback: "Write in the zeros: $(1,1,0)\\cdot(0,1,1)$. Only one pair of components is non-zero in both." },
        { text: "$1$", correct: true, feedback: "As triples, $(1,1,0)\\cdot(0,1,1) = 0 + 1 + 0 = 1$. Only $\\hat j\\cdot\\hat j$ survives." },
      ],
      hint: "Write each as a triple with zeros in the missing places.",
    },
    {
      type: "quiz",
      id: "va3-2-q6",
      variant: "practice",
      question: "You buy 2 notebooks, 4 pens and 1 geometry box priced ₹50, ₹30 and ₹200 each. Written as $\\vec q\\cdot\\vec p$, what is the bill?",
      options: [
        { text: "₹$(100, 120, 200)$", feedback: "Those are the three item costs. The bill adds them: one number." },
        { text: "₹420", correct: true, feedback: "$(2, 4, 1)\\cdot(50, 30, 200) = 100 + 120 + 200 = 420$." },
        { text: "₹280", feedback: "That adds the prices, $50 + 30 + 200$, ignoring how many of each you bought." },
        { text: "₹1960", feedback: "That multiplies the totals, $7 \\times 280$. Pair each quantity with its own price first." },
      ],
    },
    {
      type: "quiz",
      id: "va3-2-q7",
      variant: "practice",
      question: "$\\vec a = \\hat i + \\hat j + 2\\hat k$ and $\\vec b = 2\\hat i - \\hat j + \\hat k$. Find $(\\vec a + \\vec b)\\cdot(\\vec a - \\vec b)$.",
      options: [
        { text: "$(-3, 0, 3)$", feedback: "Those are the component products. Add them." },
        { text: "$6$", feedback: "That is $|\\vec a|^2$ alone. Build $\\vec a + \\vec b = (3, 0, 3)$ and $\\vec a - \\vec b = (-1, 2, 1)$ first." },
        { text: "$0$", correct: true, feedback: "$(3, 0, 3)\\cdot(-1, 2, 1) = -3 + 0 + 3 = 0$. Both vectors have length $\\sqrt6$, so this was bound to happen (see 3.4)." },
        { text: "$-6$", feedback: "Recheck the last pair: $3 \\times 1 = +3$, so the sum is $-3 + 0 + 3 = 0$." },
      ],
      hint: "Work out $\\vec a + \\vec b$ and $\\vec a - \\vec b$ as triples, then dot once.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "angles-and-perpendicularity",
  title: "3.3 · Angles and Perpendicularity",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "We now have two expressions for the same number: $|\\vec a||\\vec b|\\cos\\theta$ from geometry and $a_1b_1 + a_2b_2 + a_3b_3$ from components. Set them equal and you can recover an angle you cannot see. That works even in three dimensions, where drawing the angle is hard.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The angle between two vectors",
      content:
        "For non-zero $\\vec a$, $\\vec b$, with $0 \\le \\theta \\le \\pi$: $\\cos\\theta = \\dfrac{\\vec a\\cdot\\vec b}{|\\vec a|\\,|\\vec b|}$. In components this is the formula below. On $[0, \\pi]$ cosine takes each value in $[-1, 1]$ exactly once, so $\\theta = \\arccos(\\cdot)$ is unambiguous.",
    },
    {
      type: "math",
      latex:
        "\\cos\\theta = \\frac{a_1b_1 + a_2b_2 + a_3b_3}{\\sqrt{a_1^2+a_2^2+a_3^2}\\,\\sqrt{b_1^2+b_2^2+b_3^2}}",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** The angle between $\\vec a = \\hat i + \\hat j$ and $\\vec b = \\hat j + \\hat k$.\n\n1. $\\vec a\\cdot\\vec b = 0 + 1 + 0 = 1$.\n2. $|\\vec a| = \\sqrt2$, $|\\vec b| = \\sqrt2$.\n3. $\\cos\\theta = \\dfrac{1}{\\sqrt2\\cdot\\sqrt2} = \\dfrac12$, so $\\theta = 60^\\circ$.\n\n**Worked example 2.** $\\vec a = \\hat i + 2\\hat j + 2\\hat k$, $\\vec b = 2\\hat i - \\hat j + 2\\hat k$.\n\n1. $\\vec a\\cdot\\vec b = 2 - 2 + 4 = 4$.\n2. $|\\vec a| = \\sqrt{1+4+4} = 3$ and $|\\vec b| = \\sqrt{4+1+4} = 3$.\n3. $\\cos\\theta = \\dfrac49$, so $\\theta = \\arccos\\dfrac49 \\approx 63.6^\\circ$. Not a table angle, and that is fine: leave it as $\\arccos\\frac49$.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "dot",
        a: [2, 1],
        b: [1, 3],
        draggable: ["b"],
        readouts: ["dot", "angle"],
        caption:
          "Find a grid point for b that makes the dot product exactly 0. Every such point lies on one line through the origin: the line perpendicular to a.",
      },
    },
    {
      type: "text",
      content:
        "**Perpendicularity.** The most useful special case is $\\theta = 90^\\circ$, where $\\cos\\theta = 0$. For non-zero vectors the lengths cannot be zero, so the dot product is zero exactly when the cosine is:",
    },
    { type: "math", latex: "\\vec a \\perp \\vec b \\iff \\vec a\\cdot\\vec b = 0 \\qquad (\\vec a, \\vec b \\ne \\vec 0)" },
    {
      type: "text",
      content:
        "This turns a geometric condition (a right angle) into one linear equation in the components, and that is why exam problems love it.\n\n**Worked example 3.** Find $\\lambda$ so that $\\vec a = 2\\hat i + \\lambda\\hat j + \\hat k$ is perpendicular to $\\vec b = \\hat i - 2\\hat j + 3\\hat k$.\n\n1. Perpendicular means $\\vec a\\cdot\\vec b = 0$.\n2. $\\vec a\\cdot\\vec b = 2 - 2\\lambda + 3 = 5 - 2\\lambda$.\n3. $5 - 2\\lambda = 0 \\Rightarrow \\lambda = \\dfrac52$.\n4. Check: $(2, \\tfrac52, 1)\\cdot(1, -2, 3) = 2 - 5 + 3 = 0$. ✓",
    },
    {
      type: "table",
      headers: ["Sign of $\\vec a\\cdot\\vec b$", "$\\cos\\theta$", "Angle between them"],
      rows: [
        ["positive", "$> 0$", "acute or zero, $0^\\circ \\le \\theta < 90^\\circ$"],
        ["zero", "$= 0$", "right angle (perpendicular)"],
        ["negative", "$< 0$", "obtuse or straight, $90^\\circ < \\theta \\le 180^\\circ$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a right-angled triangle, NCERT).** Show that $A(2, -1, 1)$, $B(1, -3, -5)$ and $C(3, -4, -4)$ are the vertices of a right-angled triangle.\n\n1. Side vectors: $\\overrightarrow{AB} = (-1, -2, -6)$, $\\overrightarrow{BC} = (2, -1, 1)$, $\\overrightarrow{CA} = (-1, 3, 5)$. (Check: they add to $\\vec 0$, as the sides of a closed triangle must.)\n2. Test each pair: $\\overrightarrow{AB}\\cdot\\overrightarrow{BC} = -2 + 2 - 6 = -6$, $\\overrightarrow{BC}\\cdot\\overrightarrow{CA} = -2 - 3 + 5 = 0$.\n3. $\\overrightarrow{BC} \\perp \\overrightarrow{CA}$, and those are the two sides meeting at $C$. So the triangle is right-angled at $C$.\n4. Cross-check with Pythagoras: $|\\overrightarrow{BC}|^2 + |\\overrightarrow{CA}|^2 = 6 + 35 = 41 = |\\overrightarrow{AB}|^2$. ✓\n\nNo drawing needed: one zero dot product finds the right angle and tells you where it is.",
    },
    {
      type: "text",
      content:
        "**Link to direction cosines (Chapter 1).** A unit vector is its own list of direction cosines: $\\hat u = (l_1, m_1, n_1)$ and $\\hat v = (l_2, m_2, n_2)$. Both lengths are 1, so the angle formula loses its denominator:",
    },
    { type: "math", latex: "\\cos\\theta = \\hat u\\cdot\\hat v = l_1l_2 + m_1m_2 + n_1n_2" },
    {
      type: "text",
      content:
        "So two lines are perpendicular exactly when $l_1l_2 + m_1m_2 + n_1n_2 = 0$. If you are given direction ratios instead, divide each set by its length first, or use the full formula above.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (the diagonals of a cube).** Take the unit cube with one corner at the origin and edges along the axes. The body diagonal from $O$ to $(1,1,1)$ has direction $\\vec d_1 = (1, 1, 1)$. The body diagonal from $(1, 0, 0)$ to $(0, 1, 1)$ has direction $\\vec d_2 = (-1, 1, 1)$.\n\n1. $\\vec d_1\\cdot\\vec d_2 = -1 + 1 + 1 = 1$.\n2. $|\\vec d_1| = |\\vec d_2| = \\sqrt3$.\n3. $\\cos\\theta = \\dfrac{1}{3}$, so $\\theta = \\arccos\\dfrac13 \\approx 70.5^\\circ$.\n\nThe same method gives the angle between a body diagonal and an edge, $(1,1,1)\\cdot(1,0,0) = 1$: $\\cos\\theta = \\frac{1}{\\sqrt3}$, $\\theta \\approx 54.7^\\circ$. Drawing these angles would be hard; computing them takes three lines.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (how steep is the trail?).** A trekking path leaves camp in the direction $\\vec d = (4, 3, 5)$, measured in metres east, north and up. At what angle does it climb above the horizontal ground?\n\n1. \"The angle with the ground\" means the angle between $\\vec d$ and its shadow on the ground, $\\vec s = (4, 3, 0)$. *Why this step:* a line meets a plane at the angle it makes with its own projection onto that plane; the vertical part is exactly what the shadow throws away.\n2. $\\vec d\\cdot\\vec s = 16 + 9 + 0 = 25$, $|\\vec d| = \\sqrt{16 + 9 + 25} = 5\\sqrt2$, $|\\vec s| = 5$.",
    },
    { type: "math", latex: "\\cos\\theta = \\frac{25}{5\\sqrt2 \\cdot 5} = \\frac{1}{\\sqrt2} \\quad\\Rightarrow\\quad \\theta = 45^\\circ" },
    {
      type: "text",
      content:
        "3. Check another way: the angle with the vertical $\\hat k$ has $\\cos\\phi = \\dfrac{5}{5\\sqrt2} = \\dfrac{1}{\\sqrt2}$, so $\\phi = 45^\\circ$ too, and $45^\\circ + 45^\\circ = 90^\\circ$. ✓ *Why this step:* the angle above the ground and the angle from the vertical always add to $90^\\circ$, which catches a wrong choice of reference vector.\n\nThis is a seriously steep path: every metre you walk along the ground, you also climb about a metre.\n\n**Worked example 7 (equally inclined, JEE/CBSE classic).** $\\vec a$, $\\vec b$, $\\vec c$ are mutually perpendicular and all have the same length $k$. Show that $\\vec a + \\vec b + \\vec c$ makes equal angles with $\\vec a$, $\\vec b$ and $\\vec c$, and find that angle.\n\n1. Write down what you know as dot products: $\\vec a\\cdot\\vec b = \\vec b\\cdot\\vec c = \\vec c\\cdot\\vec a = 0$ and $\\vec a\\cdot\\vec a = \\vec b\\cdot\\vec b = \\vec c\\cdot\\vec c = k^2$. *Why this step:* \"perpendicular\" and \"same length\" become equations only once they are written as dot products.\n2. Numerator: $(\\vec a + \\vec b + \\vec c)\\cdot\\vec a = k^2 + 0 + 0 = k^2$. The same happens with $\\vec b$ and with $\\vec c$.\n3. Length: $|\\vec a + \\vec b + \\vec c|^2 = k^2 + k^2 + k^2 + 2(0 + 0 + 0) = 3k^2$, so the length is $\\sqrt3\\,k$. *Why this step:* the only way to get the length of a sum is to square it and expand.",
    },
    { type: "math", latex: "\\cos\\theta = \\frac{k^2}{\\sqrt3\\,k \\cdot k} = \\frac{1}{\\sqrt3} \\quad\\Rightarrow\\quad \\theta = \\arccos\\frac{1}{\\sqrt3} \\approx 54.7^\\circ" },
    {
      type: "text",
      content:
        "4. The numerator and the lengths are identical for all three, so all three angles are equal. Picture it: $\\vec a$, $\\vec b$, $\\vec c$ are three edges of a cube from one corner and $\\vec a + \\vec b + \\vec c$ is the body diagonal, the same $54.7^\\circ$ you met in Worked example 5.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a zero dot product means a zero vector\"",
      content:
        "For ordinary numbers, $xy = 0$ forces $x = 0$ or $y = 0$. Dot products do not work that way: $(1, 2)\\cdot(2, -1) = 2 - 2 = 0$, and neither vector is zero. A zero dot product means **perpendicular or zero**. (By convention $\\vec 0$ counts as perpendicular to everything.)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the angle is measured head to tail\"",
      content:
        "The angle in $|\\vec a||\\vec b|\\cos\\theta$ is between the vectors placed **tail to tail**. In an equilateral triangle $ABC$, $\\overrightarrow{AB}$ and $\\overrightarrow{BC}$ meet head to tail at $B$, where the interior angle is $60^\\circ$. Slide $\\overrightarrow{BC}$ so its tail sits on the tail of $\\overrightarrow{AB}$, and the angle between them is $180^\\circ - 60^\\circ = 120^\\circ$. With side $s$, $\\overrightarrow{AB}\\cdot\\overrightarrow{BC} = s^2\\cos 120^\\circ = -\\tfrac{s^2}{2}$.",
    },
    {
      type: "quiz",
      id: "va3-3-q1",
      variant: "practice",
      question: "Find the angle between $\\sqrt3\\,\\hat i + \\hat j$ and $\\hat i$.",
      options: [
        { text: "$60^\\circ$", feedback: "$\\cos 60^\\circ = \\frac12$, but here $\\cos\\theta = \\frac{\\sqrt3}{2}$. You may have used $\\sin$ instead of $\\cos$." },
        { text: "$30^\\circ$", correct: true, feedback: "Dot product $\\sqrt3$, lengths $2$ and $1$, so $\\cos\\theta = \\frac{\\sqrt3}{2}$." },
        { text: "$\\arccos(\\sqrt3)$", feedback: "You forgot to divide by the length $|\\sqrt3\\hat i + \\hat j| = 2$. A cosine cannot be bigger than 1." },
      ],
      hint: "$|\\sqrt3\\,\\hat i + \\hat j| = \\sqrt{3 + 1}$.",
    },
    {
      type: "quiz",
      id: "va3-3-q2",
      variant: "practice",
      question: "For which $\\lambda$ are $\\lambda\\hat i + 2\\hat j - \\hat k$ and $3\\hat i + \\lambda\\hat j + 4\\hat k$ perpendicular?",
      options: [
        { text: "$\\lambda = \\dfrac45$", correct: true, feedback: "$3\\lambda + 2\\lambda - 4 = 5\\lambda - 4 = 0$." },
        { text: "$\\lambda = -\\dfrac45$", feedback: "Sign slip: the $\\hat k$ product is $(-1)(4) = -4$, so $5\\lambda = 4$." },
        { text: "$\\lambda = 0$", feedback: "At $\\lambda = 0$ the dot product is $-4$, not 0." },
        { text: "$\\lambda = \\dfrac43$", feedback: "That uses only the $3\\lambda$ term: $3\\lambda - 4 = 0$. $\\lambda$ appears in two products, $3\\lambda$ and $2\\lambda$, so solve $5\\lambda - 4 = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-3-q3",
      variant: "concept",
      question: "$|\\vec a| = 3$, $|\\vec b| = 5$ and $\\vec a\\cdot\\vec b = 0$. What can you conclude?",
      options: [
        { text: "$\\vec a$ and $\\vec b$ are perpendicular.", correct: true, feedback: "Both are non-zero, so the cosine must be 0." },
        { text: "One of them must be the zero vector.", feedback: "Their lengths are 3 and 5, so neither is zero. Zero dot product means perpendicular here." },
        { text: "They point in opposite directions.", feedback: "Opposite directions give $\\cos 180^\\circ = -1$ and a dot product of $-15$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-3-q4",
      variant: "concept",
      question: "$ABC$ is equilateral with side 2. Find $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.",
      options: [
        { text: "$2$", feedback: "That uses the interior angle $60^\\circ$, measured head to tail. Put the tails together and the angle is $120^\\circ$." },
        { text: "$-2$", correct: true, feedback: "Tail to tail the angle is $120^\\circ$: $2 \\cdot 2 \\cdot (-\\frac12) = -2$." },
        { text: "$0$", feedback: "The sides of an equilateral triangle are not perpendicular." },
      ],
      hint: "Slide $\\overrightarrow{BC}$ so its tail sits at $A$. What angle does it make with $\\overrightarrow{AB}$?",
    },
    {
      type: "quiz",
      id: "va3-3-q5",
      variant: "practice",
      question: "$\\vec a = (1, -2, 3)$ and $\\vec b = (2, 1, -1)$. Is the angle between them acute, right or obtuse?",
      options: [
        { text: "Acute", feedback: "Recompute: $(1)(2) + (-2)(1) + (3)(-1) = -3$. A negative dot product means obtuse." },
        { text: "Right angle", feedback: "The first two products cancel, but the third is $-3$, so the total is not zero." },
        { text: "Obtuse", correct: true, feedback: "$2 - 2 - 3 = -3 < 0$, so $\\cos\\theta < 0$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-3-q6",
      variant: "practice",
      question: "What is the acute angle between two body diagonals of a cube?",
      options: [
        { text: "$\\arccos\\dfrac13 \\approx 70.5^\\circ$", correct: true, feedback: "$(1,1,1)\\cdot(-1,1,1) = 1$ and both lengths are $\\sqrt3$." },
        { text: "$90^\\circ$", feedback: "Face diagonals of a square are perpendicular, but body diagonals of a cube are not: their dot product is 1, not 0." },
        { text: "$60^\\circ$", feedback: "That would need $\\cos\\theta = \\frac12$. Here $\\cos\\theta = \\frac{1}{\\sqrt3\\cdot\\sqrt3} = \\frac13$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-3-q7",
      variant: "practice",
      question: "$P(1, 0, 0)$, $Q(0, 1, 0)$, $R(1, 1, 1)$. At which vertex, if any, is triangle $PQR$ right-angled?",
      options: [
        { text: "At $P$", feedback: "The sides at $P$ are $\\overrightarrow{PQ} = (-1,1,0)$ and $\\overrightarrow{PR} = (0,1,1)$, with dot product $1 \\ne 0$." },
        { text: "At $R$", feedback: "The sides at $R$ are $\\overrightarrow{RP} = (0,-1,-1)$ and $\\overrightarrow{RQ} = (-1,0,-1)$, with dot product $1 \\ne 0$." },
        { text: "At none of them: it is equilateral.", correct: true, feedback: "$\\overrightarrow{PQ} = (-1, 1, 0)$, $\\overrightarrow{QR} = (1, 0, 1)$, $\\overrightarrow{RP} = (0, -1, -1)$ all have length $\\sqrt2$, and no pair has a zero dot product." },
        { text: "At the origin", feedback: "The origin is not a vertex. $\\hat i\\cdot\\hat j = 0$ is about the position vectors of $P$ and $Q$, not about the sides of the triangle." },
      ],
      hint: "Use the side vectors, not the position vectors. At each vertex, dot the two sides that meet there.",
    },
    {
      type: "quiz",
      id: "va3-3-q8",
      variant: "practice",
      question: "Two lines have direction cosines $\\left(\\tfrac13, \\tfrac23, \\tfrac23\\right)$ and $\\left(\\tfrac23, -\\tfrac23, \\tfrac13\\right)$. Find the angle between them.",
      options: [
        { text: "$\\arccos\\tfrac89$", feedback: "You dropped the minus sign on $-\\tfrac23$: the middle product is $-\\tfrac49$." },
        { text: "$0^\\circ$", feedback: "Direction cosines give $\\cos\\theta$ directly. Here the sum is 0, so $\\cos\\theta = 0$." },
        { text: "$90^\\circ$", correct: true, feedback: "$l_1l_2 + m_1m_2 + n_1n_2 = \\tfrac29 - \\tfrac49 + \\tfrac29 = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-3-q9",
      variant: "practice",
      question: "A support cable runs from a point on flat ground in the direction $(1, \\sqrt3, 2\\sqrt3)$ (east, north, up). What angle does it make with the ground?",
      options: [
        { text: "$30^\\circ$", feedback: "That is the angle with the vertical: $\\cos\\phi = \\frac{2\\sqrt3}{4} = \\frac{\\sqrt3}{2}$. The angle with the ground is $90^\\circ - 30^\\circ$." },
        { text: "$60^\\circ$", correct: true, feedback: "The shadow is $(1, \\sqrt3, 0)$ with length 2; the dot product is $1 + 3 = 4$ and the cable's length is 4, so $\\cos\\theta = \\frac{4}{4 \\cdot 2} = \\frac12$." },
        { text: "$45^\\circ$", feedback: "Compute: $|(1, \\sqrt3, 2\\sqrt3)| = \\sqrt{1 + 3 + 12} = 4$, and its shadow $(1, \\sqrt3, 0)$ has length 2. That gives $\\cos\\theta = \\frac12$, not $\\frac{1}{\\sqrt2}$." },
      ],
      hint: "Dot the cable's direction with its shadow on the ground, $(1, \\sqrt3, 0)$.",
    },
    {
      type: "quiz",
      id: "va3-3-q10",
      variant: "practice",
      question: "$\\hat a$, $\\hat b$, $\\hat c$ are mutually perpendicular unit vectors. Find the angle between $\\hat a + \\hat b + \\hat c$ and $\\hat a$.",
      options: [
        { text: "$\\arccos\\dfrac13$", feedback: "You used $|\\hat a + \\hat b + \\hat c| = 3$. The length is $\\sqrt{1 + 1 + 1} = \\sqrt3$, because perpendicular lengths add in squares." },
        { text: "$90^\\circ$", feedback: "$\\hat a$ is perpendicular to $\\hat b$ and $\\hat c$, but not to the sum, which contains $\\hat a$ itself: the dot product is 1." },
        { text: "$\\arccos\\dfrac{1}{\\sqrt3}$", correct: true, feedback: "$(\\hat a + \\hat b + \\hat c)\\cdot\\hat a = 1$ and $|\\hat a + \\hat b + \\hat c| = \\sqrt3$, so $\\cos\\theta = \\frac{1}{\\sqrt3}$." },
        { text: "$45^\\circ$", feedback: "That would need $\\cos\\theta = \\frac{1}{\\sqrt2}$, the answer for two perpendicular unit vectors. With three, it is $\\frac{1}{\\sqrt3}$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "algebra-of-the-dot-product",
  title: "3.4 · Algebra of the Dot Product",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The component formula makes the dot product behave almost like ordinary multiplication, so you can expand brackets. That ability turns geometry (lengths, right angles) into algebra. First the rules, each with its reason, then what they buy you.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "add",
        showParallelogram: true,
        a: [3, 1],
        b: [1, 3],
        readouts: ["magnitude", "sum"],
        caption:
          "Make |a| = |b| (a rhombus) and watch the diagonals meet at a right angle; compare |a+b| with |a|+|b|.",
      },
    },
    {
      type: "text",
      content:
        "Keep that picture in mind: two sides, two diagonals, and a sum that is never longer than its parts. Everything in this lesson explains something you can see there. The tool that does it is expanding brackets.",
    },
    {
      type: "table",
      headers: ["Rule", "Statement", "Why it holds"],
      rows: [
        ["Commutative", "$\\vec a\\cdot\\vec b = \\vec b\\cdot\\vec a$", "$a_1b_1 = b_1a_1$ in every slot; the angle is the same either way"],
        ["Distributive", "$\\vec a\\cdot(\\vec b + \\vec c) = \\vec a\\cdot\\vec b + \\vec a\\cdot\\vec c$", "shadows add: the shadows of $\\vec b$ and $\\vec c$ on $\\vec a$ add up to the shadow of $\\vec b + \\vec c$ (in components, $a_1(b_1 + c_1) = a_1b_1 + a_1c_1$ in every slot)"],
        ["Scalars pull out", "$(k\\vec a)\\cdot\\vec b = k(\\vec a\\cdot\\vec b)$", "$(ka_1)b_1 = k(a_1b_1)$ in every slot"],
        ["Length", "$\\vec a\\cdot\\vec a = |\\vec a|^2$", "$a_1^2 + a_2^2 + a_3^2$, or $\\cos 0 = 1$"],
      ],
    },
    {
      type: "text",
      content:
        "With these, expand $|\\vec a + \\vec b|^2$ exactly like $(x + y)^2$, using $|\\vec v|^2 = \\vec v\\cdot\\vec v$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} |\\vec a + \\vec b|^2 &= (\\vec a + \\vec b)\\cdot(\\vec a + \\vec b) = \\vec a\\cdot\\vec a + \\vec a\\cdot\\vec b + \\vec b\\cdot\\vec a + \\vec b\\cdot\\vec b \\\\ &= |\\vec a|^2 + 2\\,\\vec a\\cdot\\vec b + |\\vec b|^2 \\\\ |\\vec a - \\vec b|^2 &= |\\vec a|^2 - 2\\,\\vec a\\cdot\\vec b + |\\vec b|^2 \\\\ (\\vec a + \\vec b)\\cdot(\\vec a - \\vec b) &= |\\vec a|^2 - |\\vec b|^2 \\end{aligned}",
    },
    {
      type: "text",
      content:
        "The $|\\vec a - \\vec b|^2$ line is the law of cosines again, now proved in one line of algebra. The middle terms of the first line merged only because the product is commutative.\n\n**Worked example 1.** $|\\vec a| = 3$, $|\\vec b| = 4$, angle $60^\\circ$. Find $|\\vec a + \\vec b|$ and $|\\vec a - \\vec b|$.\n\n1. $\\vec a\\cdot\\vec b = 3\\cdot4\\cdot\\tfrac12 = 6$.\n2. $|\\vec a + \\vec b|^2 = 9 + 2(6) + 16 = 37$, so $|\\vec a + \\vec b| = \\sqrt{37}$.\n3. $|\\vec a - \\vec b|^2 = 9 - 12 + 16 = 13$, so $|\\vec a - \\vec b| = \\sqrt{13}$.\n\n**Worked example 2.** $|\\vec a| = 2$, $|\\vec b| = 1$, $\\vec a\\cdot\\vec b = 1$. Find $(2\\vec a + 3\\vec b)\\cdot(\\vec a - \\vec b)$.\n\n1. Expand: $2\\,\\vec a\\cdot\\vec a - 2\\,\\vec a\\cdot\\vec b + 3\\,\\vec b\\cdot\\vec a - 3\\,\\vec b\\cdot\\vec b$.\n2. Collect: $2|\\vec a|^2 + \\vec a\\cdot\\vec b - 3|\\vec b|^2$.\n3. Substitute: $2(4) + 1 - 3(1) = 6$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (two tugboats).** Two tugs tow a ship out of Mumbai harbour. One rope pulls with $|\\vec F_1| = 3000$ N, the other with $|\\vec F_2| = 5000$ N, and the ropes make $60^\\circ$ with each other. How hard is the ship pulled overall, and in what direction?\n\n1. The ship feels the resultant $\\vec R = \\vec F_1 + \\vec F_2$. *Why this step:* forces on one body add as vectors, so the question is really \"how long is a sum?\"\n2. Square and expand, working in kN to keep the numbers small:",
    },
    {
      type: "math",
      latex:
        "|\\vec R|^2 = |\\vec F_1|^2 + 2\\,\\vec F_1\\cdot\\vec F_2 + |\\vec F_2|^2 = 9 + 2(3)(5)\\cos 60^\\circ + 25 = 9 + 15 + 25 = 49",
    },
    {
      type: "text",
      content:
        "3. So $|\\vec R| = 7$ kN. Less than $3 + 5 = 8$ kN, because the ropes do not pull in exactly the same direction; the triangle inequality in action.\n4. Direction: dot $\\vec R$ with $\\vec F_2$. $\\vec R\\cdot\\vec F_2 = \\vec F_1\\cdot\\vec F_2 + |\\vec F_2|^2 = 7.5 + 25 = 32.5$, so $\\cos\\alpha = \\dfrac{32.5}{7 \\times 5} = \\dfrac{13}{14}$ and $\\alpha \\approx 21.8^\\circ$ from the stronger rope. *Why this step:* the resultant leans toward the stronger pull, and the dot product measures by how much, without any coordinates.\n\n**Worked example 4 (a CBSE favourite).** $\\hat a$ and $\\hat b$ are unit vectors with angle $\\theta$ between them. Show that $|\\hat a - \\hat b| = 2\\sin\\dfrac{\\theta}{2}$.\n\n1. Work with the square, since that is what expands. *Why this step:* $|\\vec v|$ has a square root in it; $|\\vec v|^2 = \\vec v\\cdot\\vec v$ does not.",
    },
    {
      type: "math",
      latex:
        "|\\hat a - \\hat b|^2 = |\\hat a|^2 - 2\\,\\hat a\\cdot\\hat b + |\\hat b|^2 = 1 - 2\\cos\\theta + 1 = 2(1 - \\cos\\theta)",
    },
    {
      type: "text",
      content:
        "2. Use the half-angle identity $1 - \\cos\\theta = 2\\sin^2\\dfrac{\\theta}{2}$, so $|\\hat a - \\hat b|^2 = 4\\sin^2\\dfrac{\\theta}{2}$. *Why this step:* the target has $\\sin\\frac{\\theta}{2}$ in it, and this identity is the bridge from $\\cos\\theta$.\n3. Take the square root. Since $0 \\le \\theta \\le \\pi$, $\\frac{\\theta}{2}$ lies in $[0, \\frac{\\pi}{2}]$ and $\\sin\\frac{\\theta}{2} \\ge 0$, so no $\\pm$ is needed: $|\\hat a - \\hat b| = 2\\sin\\dfrac{\\theta}{2}$. *Why this step:* a length cannot be negative, and the angle's range guarantees the right-hand side is not either.\n4. Picture: $\\hat a$ and $\\hat b$ are two radii of a unit circle, and $\\hat a - \\hat b$ is the chord joining their tips. Chord $= 2r\\sin\\frac{\\theta}{2}$ is the familiar circle fact, now proved by dot product.",
    },
    {
      type: "text",
      content:
        "**Geometry pay-off 1: the diagonals of a rhombus are perpendicular.** A parallelogram on sides $\\vec a$ and $\\vec b$ has diagonals $\\vec a + \\vec b$ and $\\vec a - \\vec b$. Their dot product is $|\\vec a|^2 - |\\vec b|^2$. In a rhombus the sides are equal, so this is $0$: the diagonals are perpendicular. Read backwards, the argument also shows that a parallelogram with perpendicular diagonals must be a rhombus.\n\n**Geometry pay-off 2: the parallelogram law.** Add the expansions of $|\\vec a + \\vec b|^2$ and $|\\vec a - \\vec b|^2$. The $\\pm 2\\,\\vec a\\cdot\\vec b$ terms cancel:",
    },
    { type: "math", latex: "|\\vec a + \\vec b|^2 + |\\vec a - \\vec b|^2 = 2\\big(|\\vec a|^2 + |\\vec b|^2\\big)" },
    {
      type: "text",
      content:
        "In words: the squares of the two diagonals add up to the squares of all four sides. Check with Worked example 1: $37 + 13 = 50 = 2(9 + 16)$. ✓",
    },
    {
      type: "text",
      content:
        "**Geometry pay-off 3: when three vectors add to zero (NCERT classic).** $|\\vec a| = 3$, $|\\vec b| = 4$, $|\\vec c| = 5$ and $\\vec a + \\vec b + \\vec c = \\vec 0$. Find $S = \\vec a\\cdot\\vec b + \\vec b\\cdot\\vec c + \\vec c\\cdot\\vec a$.\n\n1. The trick is to square the zero: $|\\vec a + \\vec b + \\vec c|^2 = 0$.\n2. Expand like $(x + y + z)^2$: $|\\vec a|^2 + |\\vec b|^2 + |\\vec c|^2 + 2(\\vec a\\cdot\\vec b + \\vec b\\cdot\\vec c + \\vec c\\cdot\\vec a) = 0$.\n3. Substitute: $9 + 16 + 25 + 2S = 0$, so $S = -25$.\n\nThe picture: the three vectors placed head to tail close up into a 3-4-5 triangle. Each pair meets tail to tail at an obtuse or right angle, which is why every term, and so the sum, is negative or zero.",
    },
    {
      type: "text",
      content:
        "**Cauchy–Schwarz.** Since $|\\cos\\theta| \\le 1$,",
    },
    { type: "math", latex: "|\\vec a\\cdot\\vec b| = |\\vec a||\\vec b||\\cos\\theta| \\le |\\vec a||\\vec b|" },
    {
      type: "text",
      content:
        "Equality holds exactly when $\\cos\\theta = \\pm1$, that is, when the vectors are parallel. In components this is a statement about any six real numbers: $(a_1b_1 + a_2b_2 + a_3b_3)^2 \\le (a_1^2 + a_2^2 + a_3^2)(b_1^2 + b_2^2 + b_3^2)$.\n\n**Worked example 5.** Find the largest value of $2x + 3y + 6z$ when $x^2 + y^2 + z^2 = 1$.\n\n1. Read $2x + 3y + 6z$ as $(2, 3, 6)\\cdot(x, y, z)$, where $(x, y, z)$ is a unit vector.\n2. Cauchy–Schwarz: $(2,3,6)\\cdot(x,y,z) \\le |(2, 3, 6)|\\cdot 1 = \\sqrt{4 + 9 + 36} = 7$.\n3. Equality when $(x, y, z)$ points along $(2, 3, 6)$, i.e. $(x,y,z) = (\\tfrac27, \\tfrac37, \\tfrac67)$. The maximum is $7$.",
    },
    {
      type: "text",
      content:
        "**The triangle inequality.** A side of a triangle is never longer than the other two together. Now it has a proof:",
    },
    {
      type: "math",
      latex:
        "|\\vec a + \\vec b|^2 = |\\vec a|^2 + 2\\,\\vec a\\cdot\\vec b + |\\vec b|^2 \\le |\\vec a|^2 + 2|\\vec a||\\vec b| + |\\vec b|^2 = \\big(|\\vec a| + |\\vec b|\\big)^2",
    },
    {
      type: "text",
      content:
        "Take square roots: $|\\vec a + \\vec b| \\le |\\vec a| + |\\vec b|$, with equality only when $\\vec a$ and $\\vec b$ point the same way (the triangle collapses into a straight line).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"equal dot products let you cancel\"",
      content:
        "You cannot cancel $\\vec a$. With $\\vec a = (1, 0)$, $\\vec b = (1, 2)$ and $\\vec c = (1, -5)$, both products are 1, yet $\\vec b \\ne \\vec c$. The equation only fixes the *shadows* on $\\vec a$, and many different vectors cast the same shadow. What it really says is $\\vec a\\cdot(\\vec b - \\vec c) = 0$: either $\\vec b = \\vec c$, or $\\vec b - \\vec c$ is perpendicular to $\\vec a$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Things that look like algebra but are not",
      content:
        "$\\vec a\\cdot\\vec b\\cdot\\vec c$ means nothing: $\\vec a\\cdot\\vec b$ is a number, and you cannot dot a number with a vector. $(\\vec a\\cdot\\vec b)\\,\\vec c$ does make sense (a number times a vector), but it is usually different from $\\vec a\\,(\\vec b\\cdot\\vec c)$, because one points along $\\vec c$ and the other along $\\vec a$.",
    },
    {
      type: "quiz",
      id: "va3-4-q1",
      variant: "practice",
      question: "$|\\vec a| = 2$, $|\\vec b| = 3$ and the angle between them is $60^\\circ$. Find $|\\vec a + \\vec b|$.",
      options: [
        { text: "$5$", feedback: "That is $|\\vec a| + |\\vec b|$, true only when the vectors point the same way." },
        { text: "$\\sqrt{13}$", feedback: "That leaves out the $2\\,\\vec a\\cdot\\vec b$ term, as if the vectors were perpendicular." },
        { text: "$\\sqrt7$", feedback: "That is $|\\vec a - \\vec b|$: the cross term was subtracted instead of added." },
        { text: "$\\sqrt{19}$", correct: true, feedback: "$\\vec a\\cdot\\vec b = 3$, so $|\\vec a+\\vec b|^2 = 4 + 6 + 9 = 19$." },
      ],
      hint: "Square first: $|\\vec a+\\vec b|^2 = |\\vec a|^2 + 2\\,\\vec a\\cdot\\vec b + |\\vec b|^2$.",
    },
    {
      type: "quiz",
      id: "va3-4-q7",
      variant: "practice",
      question: "$\\vec a + \\vec b + \\vec c = \\vec 0$ with $|\\vec a| = 2$, $|\\vec b| = 3$, $|\\vec c| = 4$. Find $\\vec a\\cdot\\vec b + \\vec b\\cdot\\vec c + \\vec c\\cdot\\vec a$.",
      options: [
        { text: "$\\dfrac{29}{2}$", feedback: "The squares of the lengths are positive and the total is 0, so $2S$ must be negative: $2S = -29$." },
        { text: "$-\\dfrac{29}{2}$", correct: true, feedback: "$0 = 4 + 9 + 16 + 2S$, so $S = -\\frac{29}{2}$." },
        { text: "$-29$", feedback: "That is $2S$. The expansion has $2(\\vec a\\cdot\\vec b + \\vec b\\cdot\\vec c + \\vec c\\cdot\\vec a)$, so halve it." },
        { text: "$0$", feedback: "The sum of the vectors is 0, but the sum of their dot products is not. Square $\\vec a + \\vec b + \\vec c$ and expand." },
      ],
      hint: "Square both sides of $\\vec a + \\vec b + \\vec c = \\vec 0$.",
    },
    {
      type: "quiz",
      id: "va3-4-q2",
      variant: "concept",
      question: "$\\vec a \\ne \\vec 0$ and $\\vec a\\cdot\\vec b = \\vec a\\cdot\\vec c$. What must be true?",
      options: [
        { text: "$\\vec b = \\vec c$.", feedback: "There is no cancelling here. $(1,0)\\cdot(1,2) = (1,0)\\cdot(1,-5)$, yet the vectors differ." },
        { text: "$\\vec b - \\vec c$ is perpendicular to $\\vec a$ (or zero).", correct: true, feedback: "Move everything to one side: $\\vec a\\cdot(\\vec b - \\vec c) = 0$." },
        { text: "$|\\vec b| = |\\vec c|$.", feedback: "Equal shadows do not mean equal lengths: $(1,2)$ and $(1,-5)$ have different lengths." },
      ],
    },
    {
      type: "quiz",
      id: "va3-4-q3",
      variant: "practice",
      question: "$|\\vec a| = 5$ and $|\\vec b| = 3$. Find $(\\vec a + \\vec b)\\cdot(\\vec a - \\vec b)$.",
      options: [
        { text: "$16$", correct: true, feedback: "The cross terms cancel: $25 - 9 = 16$, whatever the angle." },
        { text: "$4$", feedback: "That is $5 - 3$, without squaring. The result is $|\\vec a|^2 - |\\vec b|^2 = 25 - 9$." },
        { text: "It cannot be found without the angle.", feedback: "Expand: $\\vec a\\cdot\\vec b$ and $-\\vec b\\cdot\\vec a$ cancel, so no angle is needed." },
      ],
    },
    {
      type: "quiz",
      id: "va3-4-q4",
      variant: "practice",
      question: "$\\vec a$ and $\\vec b$ are unit vectors with $|\\vec a + \\vec b| = \\sqrt3$. Find the angle between them.",
      options: [
        { text: "$30^\\circ$", feedback: "$\\cos 30^\\circ = \\frac{\\sqrt3}{2}$, but here $\\cos\\theta = \\frac12$." },
        { text: "$60^\\circ$", correct: true, feedback: "$3 = 1 + 2\\,\\vec a\\cdot\\vec b + 1$, so $\\vec a\\cdot\\vec b = \\frac12 = \\cos\\theta$." },
        { text: "$120^\\circ$", feedback: "That would give $|\\vec a+\\vec b|^2 = 1 - 1 + 1 = 1$. A sum longer than each part means an acute angle." },
      ],
    },
    {
      type: "quiz",
      id: "va3-4-q5",
      variant: "concept",
      question: "Someone claims $|\\vec a| = 2$, $|\\vec b| = 4$ and $\\vec a\\cdot\\vec b = 10$. What is wrong?",
      options: [
        { text: "Nothing, the angle is just very small.", feedback: "The smallest angle, $0$, gives the biggest product, $8$. Nothing reaches $10$." },
        { text: "A dot product cannot be larger than either length.", feedback: "It can. $(3,0)\\cdot(3,0) = 9$ is bigger than both lengths. The limit is the product of the lengths." },
        { text: "It breaks Cauchy–Schwarz: $|\\vec a\\cdot\\vec b| \\le 2 \\times 4 = 8$.", correct: true, feedback: "It would need $\\cos\\theta = \\frac{10}{8} > 1$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-4-q6",
      variant: "practice",
      question: "What is the largest value of $3x + 4y$ on the circle $x^2 + y^2 = 1$?",
      options: [
        { text: "$5$", correct: true, feedback: "$(3,4)\\cdot(x,y) \\le |(3,4)| \\cdot 1 = 5$, reached at $(x,y) = (\\frac35, \\frac45)$." },
        { text: "$7$", feedback: "$3 + 4$ would need $x = y = 1$, which is not on the unit circle." },
        { text: "$25$", feedback: "That is $|(3,4)|^2$. Cauchy–Schwarz bounds the product by $|(3,4)|$, not its square." },
      ],
    },
    {
      type: "quiz",
      id: "va3-4-q8",
      variant: "practice",
      question: "Two ropes pull a stuck car with forces of 5 kN and 3 kN, and the ropes make $120^\\circ$ with each other. How large is the resultant pull?",
      options: [
        { text: "$7$ kN", feedback: "That uses $\\cos 120^\\circ = +\\frac12$. The angle is obtuse, so the cross term is $2(5)(3)(-\\frac12) = -15$." },
        { text: "$\\sqrt{34}$ kN", feedback: "That drops the cross term, as if the ropes were perpendicular." },
        { text: "$\\sqrt{19}$ kN $\\approx 4.36$ kN", correct: true, feedback: "$|\\vec R|^2 = 25 - 15 + 9 = 19$. Ropes spread this wide waste a lot of effort." },
        { text: "$8$ kN", feedback: "Magnitudes only add when the ropes point the same way." },
      ],
      hint: "$|\\vec F_1 + \\vec F_2|^2 = |\\vec F_1|^2 + 2|\\vec F_1||\\vec F_2|\\cos\\theta + |\\vec F_2|^2$.",
    },
    {
      type: "quiz",
      id: "va3-4-q9",
      variant: "practice",
      question: "$\\hat a$ and $\\hat b$ are unit vectors at $60^\\circ$ to each other. Find $|\\hat a - \\hat b|$.",
      options: [
        { text: "$1$", correct: true, feedback: "$|\\hat a - \\hat b|^2 = 1 - 2 \\cdot \\frac12 + 1 = 1$, or $2\\sin 30^\\circ = 1$. The tips and the origin form an equilateral triangle." },
        { text: "$\\sqrt3$", feedback: "That is $|\\hat a + \\hat b|$: the cross term was added instead of subtracted." },
        { text: "$\\sqrt2$", feedback: "That is the answer for perpendicular unit vectors. Here the cross term $-2\\cos 60^\\circ = -1$ does not vanish." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "projections-and-work",
  title: "3.5 · Projections and Components Along a Direction",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 3.1 the dot product was a length times a shadow. Now we pull the shadow out on its own. How much of $\\vec a$ points along a direction? And which vector is left over once that part is removed? These two questions answer everything from ramps in physics to distances in geometry.",
    },
    {
      type: "text",
      content:
        "Dividing by $|\\vec b|$ turns $\\vec b$ into the unit vector $\\hat b = \\vec b / |\\vec b|$, which points the same way. Dotting with a unit vector removes the extra length factor and leaves only the shadow: $\\vec a\\cdot\\hat b = |\\vec a|\\cdot 1\\cdot\\cos\\theta$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Projections of a on b",
      content:
        "The **scalar projection** of $\\vec a$ on $\\vec b$ is the signed length of the shadow, $\\vec a\\cdot\\hat b = \\dfrac{\\vec a\\cdot\\vec b}{|\\vec b|}$. The **vector projection** is the shadow as an arrow along $\\vec b$, $\\operatorname{proj}_{\\vec b}\\vec a = (\\vec a\\cdot\\hat b)\\,\\hat b$. Written out in full:",
    },
    { type: "math", latex: "\\vec a\\cdot\\hat b = \\frac{\\vec a\\cdot\\vec b}{|\\vec b|} = |\\vec a|\\cos\\theta" },
    { type: "math", latex: "\\operatorname{proj}_{\\vec b}\\vec a = (\\vec a\\cdot\\hat b)\\,\\hat b = \\frac{\\vec a\\cdot\\vec b}{|\\vec b|^2}\\,\\vec b" },
    {
      type: "text",
      content:
        "Removing the shadow leaves the perpendicular part, $\\vec a_\\perp = \\vec a - \\operatorname{proj}_{\\vec b}\\vec a$. So every vector splits into a piece along $\\vec b$ and a piece at right angles to it. In the canvas below the roles are swapped: $\\vec b$ is split along the line of $\\vec a$. Drag either tip.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "dot",
        a: [5, 1],
        b: [2, 4],
        draggable: ["a", "b"],
        showProjection: true,
        showPerpendicular: true,
        readouts: ["dot", "projection", "angle"],
        caption:
          "b is split into a part along a (the shadow) and a part perpendicular to a. The two parts always add back to b, and they always meet at a right angle.",
      },
    },
    {
      type: "text",
      content:
        "Why is the leftover really perpendicular? Dot it with $\\vec b$:",
    },
    {
      type: "math",
      latex:
        "\\Big(\\vec a - \\tfrac{\\vec a\\cdot\\vec b}{|\\vec b|^2}\\vec b\\Big)\\cdot\\vec b = \\vec a\\cdot\\vec b - \\tfrac{\\vec a\\cdot\\vec b}{|\\vec b|^2}|\\vec b|^2 = 0",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Split $\\vec a = 3\\hat i + \\hat j + 2\\hat k$ along $\\vec b = \\hat i + 2\\hat j + 2\\hat k$.\n\n1. $\\vec a\\cdot\\vec b = 3 + 2 + 4 = 9$ and $|\\vec b| = \\sqrt{1 + 4 + 4} = 3$.\n2. Scalar projection: $\\dfrac{9}{3} = 3$.\n3. Vector projection: $\\dfrac{9}{9}\\,\\vec b = \\hat i + 2\\hat j + 2\\hat k$.\n4. Perpendicular part: $\\vec a - \\vec b = 2\\hat i - \\hat j$.\n5. Check: $(2, -1, 0)\\cdot(1, 2, 2) = 2 - 2 + 0 = 0$. ✓\n\n**Worked example 2 (in the plane).** Split $\\vec a = (2, 1)$ along $\\vec b = (3, 4)$.\n\n1. $\\vec a\\cdot\\vec b = 6 + 4 = 10$ and $|\\vec b| = 5$, so the scalar projection is $2$.\n2. Vector projection: $\\dfrac{10}{25}(3, 4) = \\left(\\tfrac65, \\tfrac85\\right)$.\n3. Perpendicular part: $(2, 1) - \\left(\\tfrac65, \\tfrac85\\right) = \\left(\\tfrac45, -\\tfrac35\\right)$.\n4. Check: $\\tfrac45\\cdot3 - \\tfrac35\\cdot4 = 0$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (wind on a sailing boat).** A boat is heading in the direction $\\vec b = (3, 4)$ (east, north). The wind pushes on the sail with force $\\vec F = (10, 5)$ N. How much of the push drives the boat forward, and how much shoves it sideways?\n\n1. The forward drive is the scalar projection of $\\vec F$ on the heading. *Why this step:* only the part of the force along the direction of travel speeds the boat up.",
    },
    { type: "math", latex: "\\vec F\\cdot\\hat b = \\frac{\\vec F\\cdot\\vec b}{|\\vec b|} = \\frac{30 + 20}{5} = 10\\text{ N}" },
    {
      type: "text",
      content:
        "2. As an arrow, the forward part is $\\dfrac{50}{25}(3, 4) = (6, 8)$ N.\n3. The sideways part is what is left: $(10, 5) - (6, 8) = (4, -3)$ N, of size 5 N. *Why this step:* subtracting the projection always leaves a piece perpendicular to the heading; check $(4, -3)\\cdot(3, 4) = 12 - 12 = 0$. ✓\n4. Sanity check with Pythagoras: $10^2 + 5^2 = 125 = |\\vec F|^2$. ✓ That 5 N sideways push is what a boat's keel is built to resist; without it the boat would drift crabwise.\n\n**Worked example 4 (distance from a point to a line, JEE style).** Find the perpendicular distance from $P(4, 5, 6)$ to the line through $A(1, 2, 0)$ with direction $\\vec b = (2, 1, 2)$, and the foot of the perpendicular.\n\n1. Move to the line's own starting point: $\\overrightarrow{AP} = (3, 3, 6)$. *Why this step:* projection splits a vector that starts on the line; position vectors from the origin would split the wrong thing.\n2. Scalar projection on the line: $\\dfrac{\\overrightarrow{AP}\\cdot\\vec b}{|\\vec b|} = \\dfrac{6 + 3 + 12}{3} = 7$. This is how far along the line the foot sits from $A$.\n3. $\\overrightarrow{AP}$ is the hypotenuse of a right triangle whose legs are the shadow (7) and the distance $h$. *Why this step:* the along-part and the perpendicular part meet at a right angle, so Pythagoras applies.",
    },
    { type: "math", latex: "h^2 = |\\overrightarrow{AP}|^2 - 7^2 = (9 + 9 + 36) - 49 = 5 \\quad\\Rightarrow\\quad h = \\sqrt5" },
    {
      type: "text",
      content:
        "4. Foot: $F = A + \\dfrac{21}{9}\\vec b = (1, 2, 0) + \\tfrac73(2, 1, 2) = \\left(\\tfrac{17}{3}, \\tfrac{13}{3}, \\tfrac{14}{3}\\right)$.\n5. Check: $\\overrightarrow{PF} = F - P = \\left(\\tfrac53, -\\tfrac23, -\\tfrac43\\right)$. Its dot with $\\vec b$ is $\\tfrac{10}{3} - \\tfrac23 - \\tfrac83 = 0$ ✓ and its length squared is $\\tfrac{25 + 4 + 16}{9} = 5$ ✓.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"projection is symmetric\"",
      content:
        "The projection of $\\vec a$ on $\\vec b$ is usually not the projection of $\\vec b$ on $\\vec a$. The numerators match, but the denominators do not: $\\dfrac{\\vec a\\cdot\\vec b}{|\\vec b|}$ against $\\dfrac{\\vec a\\cdot\\vec b}{|\\vec a|}$. In Worked example 1 the projection of $\\vec a$ on $\\vec b$ is $3$, while the projection of $\\vec b$ on $\\vec a$ is $\\dfrac{9}{\\sqrt{14}} \\approx 2.41$. A tall pole's shadow on the ground is not the ground's shadow on the pole. They agree only when $|\\vec a| = |\\vec b|$ (or the product is 0).",
    },
    {
      type: "text",
      content:
        "**Work.** A constant force $\\vec F$ moving its point of application through displacement $\\vec d$ does work $W = \\vec F\\cdot\\vec d$: the force's scalar projection on the path, times the path length. With several forces, the total work is the work of the resultant, by distributivity: $\\vec F_1\\cdot\\vec d + \\vec F_2\\cdot\\vec d = (\\vec F_1 + \\vec F_2)\\cdot\\vec d$.\n\n**Worked example 5.** Forces $4\\hat i + \\hat j - 3\\hat k$ and $3\\hat i + \\hat j - \\hat k$ act on a particle that moves from $A(1, 2, 3)$ to $B(5, 4, 1)$. Find the total work.\n\n1. Displacement: $\\vec d = \\overrightarrow{AB} = (5-1,\\ 4-2,\\ 1-3) = (4, 2, -2)$.\n2. Resultant: $\\vec R = (7, 2, -4)$.\n3. $W = \\vec R\\cdot\\vec d = 28 + 4 + 8 = 40$ units.\n4. Check force by force: $(4,1,-3)\\cdot(4,2,-2) = 16 + 2 + 6 = 24$ and $(3,1,-1)\\cdot(4,2,-2) = 12 + 2 + 2 = 16$. $24 + 16 = 40$. ✓",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Displacement is final minus initial",
      content:
        "The displacement is $\\overrightarrow{AB} = \\vec b - \\vec a$, where $\\vec a$, $\\vec b$ are the position vectors of $A$ and $B$, not the position vector of $B$ alone. Work depends on how far the particle moves, not on where it ends up relative to the origin.",
    },
    {
      type: "text",
      content:
        "**Geometry pay-off 1: the angle in a semicircle is a right angle.** Put the origin at the centre $O$ of a circle of radius $r$. Let the diameter be $AB$, where $A$ and $B$ have position vectors $-\\vec a$ and $\\vec a$, and let $P$ be any other point on the circle, so $|\\vec p| = |\\vec a| = r$.\n\n1. $\\overrightarrow{PA} = -\\vec a - \\vec p$ and $\\overrightarrow{PB} = \\vec a - \\vec p$.\n2. $\\overrightarrow{PA}\\cdot\\overrightarrow{PB} = -(\\vec a + \\vec p)\\cdot(\\vec a - \\vec p) = -\\big(|\\vec a|^2 - |\\vec p|^2\\big)$.\n3. Both lengths equal $r$, so this is $0$, and $\\angle APB = 90^\\circ$.\n\n**Geometry pay-off 2: the three altitudes of a triangle meet at a point.** Let the altitudes from $A$ and $B$ meet at $H$, and put the origin at $H$.\n\n1. $HA \\perp BC$: $\\vec a\\cdot(\\vec c - \\vec b) = 0$, so $\\vec a\\cdot\\vec c = \\vec a\\cdot\\vec b$.\n2. $HB \\perp CA$: $\\vec b\\cdot(\\vec c - \\vec a) = 0$, so $\\vec b\\cdot\\vec c = \\vec a\\cdot\\vec b$.\n3. Then $\\vec c\\cdot(\\vec a - \\vec b) = \\vec a\\cdot\\vec c - \\vec b\\cdot\\vec c = \\vec a\\cdot\\vec b - \\vec a\\cdot\\vec b = 0$.\n4. So $HC \\perp AB$: the third altitude passes through $H$ too.",
    },
    {
      type: "quiz",
      id: "va3-5-q1",
      variant: "practice",
      question: "Find the scalar projection of $\\vec a = 3\\hat i + 4\\hat j$ on $\\vec b = 2\\hat i + 2\\hat j + \\hat k$.",
      options: [
        { text: "$\\dfrac{14}{3}$", correct: true, feedback: "$\\vec a\\cdot\\vec b = 6 + 8 + 0 = 14$ and $|\\vec b| = 3$." },
        { text: "$\\dfrac{14}{5}$", feedback: "You divided by $|\\vec a| = 5$, which gives the projection of $\\vec b$ on $\\vec a$." },
        { text: "$14$", feedback: "That is the dot product. Divide by the length of the vector you are projecting onto." },
        { text: "$\\dfrac{14}{9}$", feedback: "Dividing by $|\\vec b|^2$ gives the coefficient in the vector projection, not the scalar projection." },
      ],
      hint: "Scalar projection on $\\vec b$ is $\\dfrac{\\vec a\\cdot\\vec b}{|\\vec b|}$.",
    },
    {
      type: "quiz",
      id: "va3-5-q7",
      variant: "practice",
      question: "$A(2, 3, 0)$, $B(4, 4, 2)$, $C(1, 1, 1)$, $D(4, 5, 1)$. Find the scalar projection of $\\overrightarrow{AB}$ on $\\overrightarrow{CD}$.",
      options: [
        { text: "$\\dfrac{10}{3}$", feedback: "That divides by $|\\overrightarrow{AB}| = 3$, which gives the projection of $\\overrightarrow{CD}$ on $\\overrightarrow{AB}$." },
        { text: "$10$", feedback: "That is the dot product. Divide by the length of the vector you project onto, $|\\overrightarrow{CD}| = 5$." },
        { text: "$\\dfrac25$", feedback: "Dividing by $|\\overrightarrow{CD}|^2 = 25$ gives the coefficient of the vector projection, not the scalar projection." },
        { text: "$2$", correct: true, feedback: "$\\overrightarrow{AB} = (2, 1, 2)$, $\\overrightarrow{CD} = (3, 4, 0)$, dot product $6 + 4 + 0 = 10$, and $|\\overrightarrow{CD}| = 5$." },
      ],
      hint: "First turn the four points into two displacement vectors: $\\overrightarrow{AB} = B - A$ and $\\overrightarrow{CD} = D - C$.",
    },
    {
      type: "quiz",
      id: "va3-5-q2",
      variant: "concept",
      question: "When is the scalar projection of $\\vec a$ on $\\vec b$ equal to the scalar projection of $\\vec b$ on $\\vec a$?",
      options: [
        { text: "Always, because the dot product is commutative.", feedback: "Commutativity makes the numerators equal. The denominators still differ." },
        { text: "Only when $\\vec a = \\vec b$.", feedback: "Equal lengths are enough. $\\vec a = (3,4)$ and $\\vec b = (5,0)$ are different but both have length 5; each projects onto the other with $\\frac{15}{5} = 3$." },
        { text: "When $|\\vec a| = |\\vec b|$, or when $\\vec a\\cdot\\vec b = 0$.", correct: true, feedback: "Same numerator; the denominators are $|\\vec b|$ and $|\\vec a|$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-5-q3",
      variant: "practice",
      question: "A force $\\vec F = 3\\hat i + 2\\hat j - \\hat k$ moves a particle from $(1, 0, 2)$ to $(4, 1, 5)$. Find the work done.",
      options: [
        { text: "$9$ units", feedback: "That dots with the position vector of the end point, $(4,1,5)$: $12 + 2 - 5$. Use the displacement." },
        { text: "$8$ units", correct: true, feedback: "$\\vec d = (3, 1, 3)$ and $9 + 2 - 3 = 8$." },
        { text: "$14$ units", feedback: "Check the $\\hat k$ term: $(-1)(3) = -3$, so the total is $9 + 2 - 3 = 8$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-5-q4",
      variant: "practice",
      question: "Split $\\vec a = 4\\hat i + 3\\hat j$ into a part along $\\hat i + \\hat j$ and a part perpendicular to it. What is the perpendicular part?",
      options: [
        { text: "$\\tfrac12\\hat i - \\tfrac12\\hat j$", correct: true, feedback: "Projection $= \\frac{7}{2}(1,1) = (3.5, 3.5)$; leftover $(0.5, -0.5)$, and $(0.5)(1) + (-0.5)(1) = 0$." },
        { text: "$\\tfrac72\\hat i + \\tfrac72\\hat j$", feedback: "That is the parallel part, the projection itself." },
        { text: "$-3\\hat i + 4\\hat j$", feedback: "That is perpendicular to $\\vec a$ itself, not to $\\hat i + \\hat j$: $(-3)(1) + (4)(1) = 1 \\ne 0$." },
      ],
      hint: "Coefficient $= \\dfrac{\\vec a\\cdot\\vec b}{|\\vec b|^2} = \\dfrac{7}{2}$.",
    },
    {
      type: "quiz",
      id: "va3-5-q5",
      variant: "concept",
      question: "The scalar projection of $\\vec a$ on $\\vec b$ is $-2$. What does the minus sign tell you?",
      options: [
        { text: "Nothing. A projection is a length, so take $2$.", feedback: "The scalar projection is a signed length, and the sign carries the direction." },
        { text: "The angle between them is obtuse: the shadow falls backwards along $\\vec b$.", correct: true, feedback: "The sign comes from $\\cos\\theta$." },
        { text: "$\\vec a$ has a negative component.", feedback: "Components depend on the axes. The sign here depends only on the angle between $\\vec a$ and $\\vec b$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-5-q6",
      variant: "concept",
      question: "In the semicircle proof, $\\overrightarrow{PA}\\cdot\\overrightarrow{PB} = -\\big(|\\vec a|^2 - |\\vec p|^2\\big)$. Which fact makes this zero?",
      options: [
        { text: "$\\vec p$ is perpendicular to $\\vec a$.", feedback: "$P$ can be anywhere on the circle. Its position vector is not perpendicular to $\\vec a$ in general." },
        { text: "$A$ and $B$ having position vectors $-\\vec a$ and $\\vec a$ makes every dot product zero.", feedback: "That symmetry is what gives the factorised form. The zero comes from the equal radii." },
        { text: "$P$ lies on the circle, so $|\\vec p| = |\\vec a|$ (both are the radius).", correct: true, feedback: "That is the only place the circle enters the proof." },
      ],
    },
    {
      type: "quiz",
      id: "va3-5-q8",
      variant: "practice",
      question: "A boat heads in the direction $(4, 3)$ and the wind pushes its sail with force $(5, 10)$ N. How much of the push drives the boat forward?",
      options: [
        { text: "$50$ N", feedback: "That is the dot product. Divide by the length of the heading, $|(4, 3)| = 5$." },
        { text: "$2$ N", feedback: "Dividing by $|(4,3)|^2 = 25$ gives the coefficient of the vector projection, not the forward force." },
        { text: "$10$ N", correct: true, feedback: "$\\frac{(5,10)\\cdot(4,3)}{5} = \\frac{20 + 30}{5} = 10$ N." },
        { text: "$5\\sqrt5$ N", feedback: "That is the whole force $|(5, 10)|$. Only its shadow on the heading drives the boat." },
      ],
      hint: "Forward drive $= \\dfrac{\\vec F\\cdot\\vec b}{|\\vec b|}$.",
    },
    {
      type: "quiz",
      id: "va3-5-q9",
      variant: "practice",
      question: "Find the perpendicular distance from $P(3, 3, 3)$ to the line through the origin with direction $(1, 2, 2)$.",
      options: [
        { text: "$5$", feedback: "That is the scalar projection of $\\overrightarrow{OP}$ on the line: how far along it the foot is, not how far off it $P$ is." },
        { text: "$3\\sqrt3$", feedback: "That is $|\\overrightarrow{OP}|$, the distance to the origin. Remove the along-the-line part first." },
        { text: "$\\sqrt{22}$", feedback: "You subtracted the projection $5$ instead of its square: $h^2 = 27 - 5^2$." },
        { text: "$\\sqrt2$", correct: true, feedback: "Projection $\\frac{3 + 6 + 6}{3} = 5$, so $h^2 = 27 - 25 = 2$." },
      ],
      hint: "$h^2 = |\\overrightarrow{OP}|^2 - (\\text{scalar projection})^2$.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-3-mastery",
  title: "3.6 · Chapter 3 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every question can be rebuilt from one idea: length times signed shadow, which equals the sum of the component products.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in five lines",
      content:
        "1. $\\vec a\\cdot\\vec b = |\\vec a||\\vec b|\\cos\\theta$ (tail to tail), a scalar.\n2. The law of cosines turns it into $a_1b_1 + a_2b_2 + a_3b_3$.\n3. $\\cos\\theta = \\frac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}$, and for non-zero vectors, perpendicular $\\iff \\vec a\\cdot\\vec b = 0$.\n4. Expand like ordinary brackets with $\\vec a\\cdot\\vec a = |\\vec a|^2$, but never cancel.\n5. Projection on $\\vec b$: $\\frac{\\vec a\\cdot\\vec b}{|\\vec b|}$; work: $\\vec F\\cdot\\vec d$.",
    },
    {
      type: "quiz",
      id: "va3-6-q1",
      variant: "mastery",
      question: "Find $(2\\hat i - 3\\hat j + \\hat k)\\cdot(\\hat i + \\hat j + 4\\hat k)$.",
      options: [
        { text: "$3$", correct: true, feedback: "$2 - 3 + 4 = 3$." },
        { text: "$(2, -3, 4)$", feedback: "Those are the products. Add them." },
        { text: "$9$", feedback: "The middle product is $(-3)(1) = -3$, not $+3$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-6-q2",
      variant: "mastery",
      question: "Find the angle between $\\hat i - \\hat k$ and $-\\hat j + \\hat k$.",
      options: [
        { text: "$60^\\circ$", feedback: "You lost the sign: $\\cos\\theta = -\\frac12$, which is obtuse." },
        { text: "$90^\\circ$", feedback: "The dot product is $-1$, not 0." },
        { text: "$120^\\circ$", correct: true, feedback: "$(1,0,-1)\\cdot(0,-1,1) = -1$, lengths $\\sqrt2$ each, so $\\cos\\theta = -\\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-6-q3",
      variant: "mastery",
      question: "For what $\\lambda$ is $\\hat i + \\lambda\\hat j + 2\\hat k$ perpendicular to $\\lambda\\hat i + 3\\hat j - 4\\hat k$?",
      options: [
        { text: "$\\lambda = -2$", feedback: "Check: at $\\lambda = -2$, $-2 - 6 - 8 = -16 \\ne 0$." },
        { text: "$\\lambda = 2$", correct: true, feedback: "$\\lambda + 3\\lambda - 8 = 0 \\Rightarrow 4\\lambda = 8$." },
        { text: "$\\lambda = 8$", feedback: "$\\lambda$ appears twice, giving $4\\lambda$. Divide 8 by 4." },
      ],
    },
    {
      type: "quiz",
      id: "va3-6-q4",
      variant: "mastery",
      question: "$|\\vec a| = 2$, $|\\vec b| = 3$ and the angle between them is $120^\\circ$. Find $|\\vec a + \\vec b|$.",
      options: [
        { text: "$\\sqrt{19}$", feedback: "That uses $\\cos 120^\\circ = +\\frac12$. An obtuse angle has a negative cosine." },
        { text: "$\\sqrt7$", correct: true, feedback: "$\\vec a\\cdot\\vec b = -3$, so $|\\vec a+\\vec b|^2 = 4 - 6 + 9 = 7$." },
        { text: "$5$", feedback: "Lengths only add when the vectors point the same way." },
        { text: "$1$", feedback: "Lengths only subtract when the vectors point in opposite directions ($180^\\circ$)." },
      ],
    },
    {
      type: "quiz",
      id: "va3-6-q5",
      variant: "mastery",
      question: "Find the scalar projection of $2\\hat i + \\hat j - 2\\hat k$ on $3\\hat i + 4\\hat k$.",
      options: [
        { text: "$-\\dfrac25$", correct: true, feedback: "$6 + 0 - 8 = -2$, and $|3\\hat i + 4\\hat k| = 5$." },
        { text: "$-\\dfrac23$", feedback: "You divided by $|2\\hat i + \\hat j - 2\\hat k| = 3$: that is the projection the other way round." },
        { text: "$\\dfrac{14}{5}$", feedback: "The $\\hat k$ product is $(-2)(4) = -8$, not $+8$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-6-q6",
      variant: "mastery",
      question: "A force $2\\hat i - \\hat j + 3\\hat k$ moves a particle from $(0, 1, 1)$ to $(2, 3, 2)$. Find the work done.",
      options: [
        { text: "$7$ units", feedback: "That uses the end point $(2,3,2)$ as the displacement: $4 - 3 + 6$. Subtract the starting point first." },
        { text: "$5$ units", correct: true, feedback: "$\\vec d = (2, 2, 1)$ and $4 - 2 + 3 = 5$." },
        { text: "$9$ units", feedback: "The $\\hat j$ product is $(-1)(2) = -2$, not $+2$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-6-q7",
      variant: "mastery",
      question: "For non-zero $\\vec a$, $\\vec b$, why is $|\\vec a + \\vec b| = |\\vec a - \\vec b|$ exactly when $\\vec a \\perp \\vec b$?",
      options: [
        { text: "Because $\\vec a + \\vec b$ and $\\vec a - \\vec b$ always have the same length.", feedback: "Not in general: with $|\\vec a| = 3$, $|\\vec b| = 4$ at $60^\\circ$ they are $\\sqrt{37}$ and $\\sqrt{13}$." },
        { text: "Because $(\\vec a+\\vec b)\\cdot(\\vec a-\\vec b) = 0$ when $\\vec a \\perp \\vec b$.", feedback: "That product is $|\\vec a|^2 - |\\vec b|^2$. It tests for equal sides (a rhombus), not for a right angle." },
        {
          text: "$|\\vec a+\\vec b|^2 - |\\vec a-\\vec b|^2 = 4\\,\\vec a\\cdot\\vec b$, which is zero exactly when $\\vec a\\cdot\\vec b = 0$.",
          correct: true,
          feedback: "Geometrically: a parallelogram with equal diagonals is a rectangle.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va3-6-q8",
      variant: "mastery",
      question: "$\\hat a$ and $\\hat b$ are unit vectors and $|\\hat a + \\hat b| = 1$. Find the angle between them.",
      options: [
        { text: "$120^\\circ$", correct: true, feedback: "$1 = 1 + 2\\,\\hat a\\cdot\\hat b + 1$, so $\\hat a\\cdot\\hat b = -\\frac12$." },
        { text: "$60^\\circ$", feedback: "That gives $|\\hat a+\\hat b| = \\sqrt3$. A sum shorter than $\\sqrt2$ needs an obtuse angle." },
        { text: "$90^\\circ$", feedback: "Perpendicular unit vectors give $|\\hat a+\\hat b| = \\sqrt2$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-6-q9",
      variant: "mastery",
      question: "$\\vec a = (1, 2)$, $\\vec b = (3, 1)$, $\\vec c = (-1, 3)$. Which statement is true?",
      options: [
        { text: "$\\vec a\\cdot\\vec b = \\vec a\\cdot\\vec c$, so $\\vec b = \\vec c$.", feedback: "The products are equal (both 5) but the vectors are visibly different. Dot products cannot be cancelled." },
        { text: "$\\vec a\\cdot\\vec b \\ne \\vec a\\cdot\\vec c$.", feedback: "Compute: $3 + 2 = 5$ and $-1 + 6 = 5$." },
        { text: "$\\vec a\\cdot\\vec b = \\vec a\\cdot\\vec c$, yet $\\vec b \\ne \\vec c$, because $\\vec b - \\vec c$ is perpendicular to $\\vec a$.", correct: true, feedback: "Both products are 5, and $\\vec b - \\vec c = (4, -2)$, with $(1,2)\\cdot(4,-2) = 0$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-6-q10",
      variant: "mastery",
      question: "$\\vec a + \\vec b + \\vec c = \\vec 0$ with $|\\vec a| = 3$, $|\\vec b| = 5$, $|\\vec c| = 7$. Find the angle between $\\vec a$ and $\\vec b$.",
      options: [
        { text: "$120^\\circ$", feedback: "That is the interior angle of the 3-5-7 triangle, where $\\vec a$ and $\\vec b$ meet head to tail. Tail to tail the angle is $180^\\circ - 120^\\circ$." },
        { text: "$90^\\circ$", feedback: "Perpendicular would need $|\\vec c|^2 = 9 + 25 = 34$, but $|\\vec c|^2 = 49$." },
        { text: "$60^\\circ$", correct: true, feedback: "$\\vec c = -(\\vec a + \\vec b)$, so $49 = 9 + 25 + 2\\,\\vec a\\cdot\\vec b$, giving $\\vec a\\cdot\\vec b = \\frac{15}{2}$ and $\\cos\\theta = \\frac{15/2}{15} = \\frac12$." },
        { text: "$30^\\circ$", feedback: "$\\cos\\theta = \\frac12$ gives $60^\\circ$, not $30^\\circ$." },
      ],
      hint: "Write $\\vec c = -(\\vec a + \\vec b)$ and square both sides.",
    },
    {
      type: "quiz",
      id: "va3-6-q11",
      variant: "mastery",
      question: "Find $\\vec x$ with $\\vec x\\cdot(\\hat i + \\hat j + \\hat k) = 6$, $\\vec x\\cdot(\\hat i - \\hat j) = -1$ and $\\vec x\\cdot(\\hat j - \\hat k) = -1$.",
      options: [
        { text: "$\\hat i + 2\\hat j + 3\\hat k$", correct: true, feedback: "With $\\vec x = (x_1, x_2, x_3)$: $x_1 + x_2 + x_3 = 6$, $x_1 - x_2 = -1$, $x_2 - x_3 = -1$. So $x_2 = x_1 + 1$, $x_3 = x_1 + 2$, and $3x_1 + 3 = 6$ gives $x_1 = 1$." },
        { text: "$3\\hat i + 2\\hat j + \\hat k$", feedback: "Check the second condition: $3 - 2 = 1$, not $-1$." },
        { text: "$2\\hat i + 2\\hat j + 2\\hat k$", feedback: "This meets the first condition only: $2 - 2 = 0$, not $-1$." },
        { text: "$\\hat j + 5\\hat k$", feedback: "The first two hold, but the third gives $1 - 5 = -4$, not $-1$." },
      ],
      hint: "Write $\\vec x = x_1\\hat i + x_2\\hat j + x_3\\hat k$. Each dot condition is one linear equation.",
    },
    {
      type: "quiz",
      id: "va3-6-q12",
      variant: "mastery",
      question: "Find the vector projection of $2\\hat i + \\hat j - 2\\hat k$ on $3\\hat i + 4\\hat k$.",
      options: [
        { text: "$-\\dfrac{2}{5}(3\\hat i + 4\\hat k)$", feedback: "Divide by $|\\vec b|^2 = 25$, not $|\\vec b| = 5$: the vector projection carries one factor of $|\\vec b|$ in the scalar part and another in $\\hat b$." },
        { text: "$-\\dfrac{2}{25}(3\\hat i + 4\\hat k)$", correct: true, feedback: "$\\frac{\\vec a\\cdot\\vec b}{|\\vec b|^2}\\vec b = \\frac{-2}{25}(3\\hat i + 4\\hat k)$." },
        { text: "$-\\dfrac25$", feedback: "That is the scalar projection. The question asks for the arrow along $\\vec b$." },
      ],
    },
    {
      type: "quiz",
      id: "va3-6-q13",
      variant: "mastery",
      question: "$ABC$ is an equilateral triangle with side 3. Find $\\overrightarrow{AB}\\cdot\\overrightarrow{BC}$.",
      options: [
        { text: "$\\dfrac92$", feedback: "That uses the interior angle $60^\\circ$. $\\overrightarrow{AB}$ and $\\overrightarrow{BC}$ meet head to tail; tail to tail the angle is $120^\\circ$." },
        { text: "$0$", feedback: "The sides of an equilateral triangle are not perpendicular." },
        { text: "$-\\dfrac92$", correct: true, feedback: "$3 \\cdot 3 \\cdot \\cos 120^\\circ = -\\frac92$." },
        { text: "$-9$", feedback: "$\\cos 120^\\circ = -\\frac12$, not $-1$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "The dot product measures how much two vectors agree. Chapter 4 builds the other product: a vector measuring how much they *disagree*. Its length is the area of the parallelogram they sweep out, and it points straight out of their plane.",
    },
  ]),
};

export const vectorsChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
