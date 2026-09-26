import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Vector Algebra Chapter 5 — The Scalar Triple Product and Vector Geometry.
 * Dot and cross combine into a signed volume; zero volume means coplanar.
 * The chapter closes with a toolkit for choosing the right product, a
 * workshop of classical proofs, and a full-course diagnostic.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "volume-of-a-box",
  title: "5.1 · Volume of a Box",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/va-5-triple-product-and-geometry.mp4",
      poster: "/videos/va-5-triple-product-and-geometry.jpg",
      title: "Chapter 5 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Take a rectangular box: volume is length × breadth × height, or more usefully, **base area × height**. Now push the top of the box sideways so every face becomes a parallelogram. The box leans, but no material was added or removed: the volume is still base area × *perpendicular* height.\n\nThat slanted box is a **parallelepiped**, and its three edges from one corner are three vectors $\\vec a$, $\\vec b$, $\\vec c$. This lesson finds its volume using nothing but the two products you already own.",
    },
    {
      type: "text",
      content:
        "Let $\\vec b$ and $\\vec c$ span the base, and let $\\vec a$ be the slanted edge. Two facts from Chapter 4 do all the work:\n\n**1.** $\\vec b\\times\\vec c$ has length equal to the base area, and it points along the normal to the base.\n\n**2.** Dotting a vector with a vector of length $L$ along some direction gives $L$ × (the component of the first vector along that direction).\n\nSo dot $\\vec a$ with $\\vec b\\times\\vec c$ and you get (base area) × (the part of $\\vec a$ that sticks straight up out of the base), which is exactly the height.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "triple",
        a: [0, 3, 4],
        b: [4, 0, 0],
        c: [1, 3, 0],
        sliders: [{ name: "tilt", min: -60, max: 90, step: 5, initial: 30 }],
        readouts: ["volume", "area"],
        caption:
          "The base is spanned by b = (4, 0, 0) and c = (1, 3, 0), so its area is |b × c| = 12. Edge a has length 5. Tilt a: the height is 5 sin(tilt), so the volume is 60 sin(tilt). At tilt 0 the box is flat; below 0 the volume turns negative.",
      },
    },
    {
      type: "text",
      content:
        "Play with the slider and notice three things. At a tilt of $90^\\circ$, $\\vec a$ stands straight up and the volume is its largest, $12\\times 5 = 60$. At $30^\\circ$ the height is $5\\sin 30^\\circ = 2.5$ and the volume is $30$. At $0^\\circ$ the edge lies in the base plane, the box is squashed flat, and the volume is $0$.",
    },
    {
      type: "math",
      latex:
        "\\vec a\\cdot(\\vec b\\times\\vec c) = |\\vec a|\\,|\\vec b\\times\\vec c|\\cos\\phi = \\underbrace{|\\vec b\\times\\vec c|}_{\\text{base area}}\\;\\underbrace{|\\vec a|\\cos\\phi}_{\\text{height}}",
    },
    {
      type: "text",
      content:
        "Here $\\phi$ is the angle between $\\vec a$ and the normal $\\vec b\\times\\vec c$. The height is $|\\vec a|\\cos\\phi$ because the height is measured *along the normal*, not along the slanted edge.\n\nThe slider's tilt is measured from the base plane, while $\\phi$ is measured from the normal, so $\\phi = 90^\\circ - \\text{tilt}$ and $|\\vec a|\\cos\\phi = |\\vec a|\\sin(\\text{tilt})$. That is where the $5\\sin(\\text{tilt})$ in the caption comes from.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Scalar triple product",
      content:
        "$[\\vec a\\;\\vec b\\;\\vec c] = \\vec a\\cdot(\\vec b\\times\\vec c)$. It is a **scalar**. Its absolute value is the volume of the parallelepiped with edges $\\vec a, \\vec b, \\vec c$ from one corner. Its sign says which side of the base $\\vec a$ points to (positive when $\\vec a$ is on the same side as $\\vec b\\times\\vec c$).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: (a · b) × c is a triple product",
      content:
        "It is not even a valid expression. $\\vec a\\cdot\\vec b$ is a plain number, and the cross product needs two vectors. The only meaningful way to combine one dot and one cross on three vectors into a number is to do the cross **first**: $\\vec a\\cdot(\\vec b\\times\\vec c)$. Brackets are often dropped, $\\vec a\\cdot\\vec b\\times\\vec c$, precisely because only one reading makes sense.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: a sheared box.** Edges $\\vec a = (3, 0, 0)$, $\\vec b = (0, 2, 0)$, $\\vec c = (1, 1, 5)$.\n\n**Step 1.** Cross the last two: $\\vec b\\times\\vec c = (2\\cdot 5 - 0\\cdot 1,\\; 0\\cdot 1 - 0\\cdot 5,\\; 0\\cdot 1 - 2\\cdot 1) = (10, 0, -2)$.\n\n**Step 2.** Dot with the first: $\\vec a\\cdot(10, 0, -2) = 30$.\n\n**Step 3.** Read it: volume $30$. Sanity check: the base spanned by $\\vec a$ and $\\vec b$ is a $3\\times 2$ rectangle in the $xy$-plane, and $\\vec c$ rises 5 above it, so the volume is $6\\times 5 = 30$. (Any face can serve as the base; 5.2 shows why the triple product gives the same number either way.) The sideways lean $(1, 1)$ in $\\vec c$ changes nothing, exactly like pushing a deck of cards.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** $\\vec a = (2, 1, 3)$, $\\vec b = (1, 1, 0)$, $\\vec c = (0, 1, 1)$.\n\n**Step 1.** $\\vec b\\times\\vec c = (1\\cdot 1 - 0\\cdot 1,\\; 0\\cdot 0 - 1\\cdot 1,\\; 1\\cdot 1 - 1\\cdot 0) = (1, -1, 1)$.\n\n**Step 2.** $\\vec a\\cdot(1, -1, 1) = 2 - 1 + 3 = 4$.\n\n**Step 3.** The parallelepiped has volume $4$.",
    },
    {
      type: "text",
      content:
        "**Worked example (application): a crystal's unit cell.** Many minerals, gypsum among them, are *monoclinic*: their repeating building block is a slanted box. Take a cell with edges (in ångströms, Å) $\\vec a = (5, 0, 0)$, $\\vec b = (0, 6, 0)$ and $\\vec c = (2, 0, 4)$, where $\\vec c$ leans over in the $xz$-plane. What is the volume of one cell?\n\n**Step 1 (cross the base edges).** $\\vec b\\times\\vec c = (6\\cdot 4 - 0\\cdot 0,\\; 0\\cdot 2 - 0\\cdot 4,\\; 0\\cdot 0 - 6\\cdot 2) = (24, 0, -12)$.\n*Why this step:* the cross product packs the base area (its length, $\\sqrt{720} = 12\\sqrt5$) and the base's normal direction into one vector, so we never need to find an angle.\n\n**Step 2 (dot with the remaining edge).**",
    },
    {
      type: "math",
      latex: "\\vec a\\cdot(\\vec b\\times\\vec c) = 5\\cdot 24 + 0\\cdot 0 + 0\\cdot(-12) = 120",
    },
    {
      type: "text",
      content:
        "*Why this step:* the dot picks out only the part of $\\vec a$ that sticks out of the base along the normal, which is the height.\n\n**Step 3 (interpret).** Each cell occupies $120\\ \\text{Å}^3$. Sanity check with a different base: $\\vec a$ and $\\vec b$ span a $5\\times 6$ rectangle in the $xy$-plane and $\\vec c$ rises 4 above it, so $30\\times 4 = 120$. The lean of $2$ Å in $\\vec c$ does not change the volume, only the shape. Chemists divide the mass of the atoms in one cell by this volume to predict the crystal's density.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam style): an unknown edge.** The parallelepiped with coterminous edges $\\vec a = \\hat i + 2\\hat j - \\hat k$, $\\vec b = \\hat j + \\lambda\\hat k$ and $\\vec c = 2\\hat i + \\hat k$ has volume $15$. Find $\\lambda$.\n\n**Step 1 (cross).** $\\vec b\\times\\vec c = (1\\cdot 1 - \\lambda\\cdot 0,\\; \\lambda\\cdot 2 - 0\\cdot 1,\\; 0\\cdot 0 - 1\\cdot 2) = (1,\\; 2\\lambda,\\; -2)$.\n\n**Step 2 (dot).** $\\vec a\\cdot(1, 2\\lambda, -2) = 1 + 4\\lambda + 2 = 3 + 4\\lambda$.\n\n**Step 3 (set up the equation).** Volume is the **absolute value** of the triple product:",
    },
    {
      type: "math",
      latex: "|3 + 4\\lambda| = 15 \\iff 3 + 4\\lambda = 15 \\;\\text{ or }\\; 3 + 4\\lambda = -15",
    },
    {
      type: "text",
      content:
        "*Why two cases:* a box of volume 15 can be right-handed (triple product $+15$) or left-handed ($-15$). The problem only fixes the size.\n\n**Step 4 (solve).** $\\lambda = 3$ or $\\lambda = -\\tfrac92$.\n\n**Check.** $\\lambda = 3$: $3 + 12 = 15$. $\\lambda = -\\tfrac92$: $3 - 18 = -15$, size 15. Dropping the absolute value is the most common way to lose half the marks here.",
    },
    {
      type: "text",
      content:
        "**Tetrahedra.** A triangular pyramid is a cone with a triangular base, so its volume is $\\tfrac13$ × base × height. Its base triangle is half the parallelogram, so the pyramid is $\\tfrac13\\cdot\\tfrac12 = \\tfrac16$ of the box built on the same three edges.",
    },
    {
      type: "math",
      latex: "V_{\\text{tetrahedron}} = \\tfrac16\\,\\big|[\\overrightarrow{AB}\\;\\overrightarrow{AC}\\;\\overrightarrow{AD}]\\big|",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Tetrahedron $A(1, 0, 1)$, $B(2, 1, 1)$, $C(1, 2, 2)$, $D(3, 1, 4)$.\n\n**Step 1.** Edges from $A$: $\\overrightarrow{AB} = (1, 1, 0)$, $\\overrightarrow{AC} = (0, 2, 1)$, $\\overrightarrow{AD} = (2, 1, 3)$.\n\n**Step 2.** $\\overrightarrow{AC}\\times\\overrightarrow{AD} = (2\\cdot 3 - 1\\cdot 1,\\; 1\\cdot 2 - 0\\cdot 3,\\; 0\\cdot 1 - 2\\cdot 2) = (5, 2, -4)$.\n\n**Step 3.** $\\overrightarrow{AB}\\cdot(5, 2, -4) = 5 + 2 + 0 = 7$.\n\n**Step 4.** Volume $= \\tfrac16\\cdot 7 = \\tfrac76$.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam style): a missing vertex.** The tetrahedron with vertices $A(1, 2, 0)$, $B(3, 2, 0)$, $C(1, 5, 0)$ and $D(2, 0, k)$ has volume $4$. Find $k$.\n\n**Step 1 (edges from $A$).** $\\overrightarrow{AB} = (2, 0, 0)$, $\\overrightarrow{AC} = (0, 3, 0)$, $\\overrightarrow{AD} = (1, -2, k)$.\n*Why this step:* the volume formula needs three edges from one common vertex, and $A$ keeps the numbers smallest.\n\n**Step 2 (cross, then dot).** $\\overrightarrow{AC}\\times\\overrightarrow{AD} = (3k - 0\\cdot(-2),\\; 0\\cdot 1 - 0\\cdot k,\\; 0\\cdot(-2) - 3\\cdot 1) = (3k, 0, -3)$, and $\\overrightarrow{AB}\\cdot(3k, 0, -3) = 6k$.\n\n**Step 3 (use the one-sixth and the absolute value).**",
    },
    {
      type: "math",
      latex: "\\tfrac16\\,|6k| = 4 \\iff |k| = 4 \\iff k = 4 \\;\\text{ or }\\; k = -4",
    },
    {
      type: "text",
      content:
        "*Why two answers:* $D$ can sit 4 units above or 4 units below the plane $z = 0$ that holds $A, B, C$; both tetrahedra have the same volume.\n\n**Check with base × height.** $A, B, C$ form a right triangle in the plane $z = 0$ with legs $2$ and $3$, so its area is $3$. The height of $D$ above that plane is $|k|$, so the volume is $\\tfrac13\\cdot 3\\cdot|k| = |k|$. Setting $|k| = 4$ agrees.",
    },
    {
      type: "table",
      headers: ["Shape built on $\\vec a, \\vec b, \\vec c$", "Volume"],
      rows: [
        ["Parallelepiped (slanted box)", "$|[\\vec a\\;\\vec b\\;\\vec c]|$"],
        ["Triangular prism (half the box)", "$\\tfrac12|[\\vec a\\;\\vec b\\;\\vec c]|$"],
        ["Tetrahedron", "$\\tfrac16|[\\vec a\\;\\vec b\\;\\vec c]|$"],
      ],
    },
    {
      type: "quiz",
      id: "va5-1-q1",
      variant: "concept",
      question: "A classmate writes $(\\vec a\\cdot\\vec b)\\times\\vec c$ for the volume of a box. What is wrong?",
      options: [
        { text: "$\\vec a\\cdot\\vec b$ is a scalar, and you cannot cross a scalar with a vector, so the expression has no meaning.", correct: true, feedback: "Right. The cross must come first: $\\vec a\\cdot(\\vec b\\times\\vec c)$." },
        { text: "Nothing, it equals $\\vec a\\cdot(\\vec b\\times\\vec c)$ by the associative law.", feedback: "Dot and cross are different operations; there is no associative law linking them this way. The expression is not even defined." },
        { text: "It gives the volume but with the wrong sign.", feedback: "It does not give anything: a number cannot be crossed with a vector." },
        { text: "It gives the area of the base, not the volume.", feedback: "The base area is $|\\vec b\\times\\vec c|$. The written expression is undefined." },
      ],
    },
    {
      type: "quiz",
      id: "va5-1-q2",
      variant: "practice",
      question:
        "A box has base area $|\\vec b\\times\\vec c| = 12$ and slanted edge $|\\vec a| = 5$, making an angle of $30^\\circ$ with the base plane. What is its volume?",
      options: [
        { text: "$30$", correct: true, feedback: "Height $= 5\\sin 30^\\circ = 2.5$, so the volume is $12\\times 2.5 = 30$. Check it on the slider above." },
        { text: "$60$", feedback: "That is the volume when $\\vec a$ is vertical. The edge is slanted, so the height is less than 5." },
        { text: "$30\\sqrt3 \\approx 52$", feedback: "You used $\\cos 30^\\circ$. The angle is with the base plane, so the height is $5\\sin 30^\\circ$." },
        { text: "$10$", feedback: "Volume is base area × height $= 12\\times 2.5$." },
      ],
      hint: "Height is the part of $\\vec a$ perpendicular to the base. With the angle measured from the base plane, use sine.",
    },
    {
      type: "quiz",
      id: "va5-1-q3",
      variant: "practice",
      question: "Find the volume of the parallelepiped with edges $\\vec a = (3, 0, 0)$, $\\vec b = (0, 4, 0)$, $\\vec c = (2, -1, 2)$.",
      options: [
        { text: "$24$", correct: true, feedback: "$\\vec b\\times\\vec c = (8, 0, -8)$, and $\\vec a\\cdot(8, 0, -8) = 24$. Or: base $3\\times 4 = 12$, height 2, volume 24." },
        { text: "$12$", feedback: "That is the base area. Multiply by the height, the $z$-component of $\\vec c$." },
        { text: "$36$", feedback: "Only the height of $\\vec c$ above the base (its $z$-component, 2) matters, not its full length 3." },
        { text: "$0$", feedback: "The three vectors are not in one plane ($\\vec c$ has a $z$-part), so the volume is not zero." },
      ],
    },
    {
      type: "quiz",
      id: "va5-1-q6",
      variant: "practice",
      question:
        "A crystal's unit cell has edges (in Å) $\\vec a = (4, 0, 0)$, $\\vec b = (0, 3, 0)$ and $\\vec c = (1, 2, 5)$. What is the volume of one cell?",
      options: [
        { text: "$60\\ \\text{Å}^3$", correct: true, feedback: "$\\vec b\\times\\vec c = (15, 0, -3)$ and $\\vec a\\cdot(15, 0, -3) = 60$. Or: base $4\\times 3 = 12$, height $5$, volume $60$." },
        { text: "$12\\sqrt{30}\\ \\text{Å}^3$", feedback: "You used the full length $|\\vec c| = \\sqrt{30}$ as the height. Only the part of $\\vec c$ perpendicular to the base, its $z$-component 5, counts." },
        { text: "$12\\ \\text{Å}^3$", feedback: "That is the base area $|\\vec a\\times\\vec b|$. Multiply by the height." },
        { text: "$-60\\ \\text{Å}^3$", feedback: "The triple product here is $+60$, and in any case a volume is reported as a positive number." },
      ],
      hint: "Compute $\\vec b\\times\\vec c$, then dot with $\\vec a$. The lean $(1, 2)$ in $\\vec c$ should not matter.",
    },
    {
      type: "quiz",
      id: "va5-1-q7",
      variant: "practice",
      question:
        "The parallelepiped with edges $\\vec a = (1, 1, 0)$, $\\vec b = (0, 1, 1)$, $\\vec c = (\\lambda, 0, 1)$ has volume $4$. Find all possible $\\lambda$.",
      options: [
        { text: "$\\lambda = 3$ or $\\lambda = -5$", correct: true, feedback: "$\\vec b\\times\\vec c = (1, \\lambda, -\\lambda)$, so $[\\vec a\\;\\vec b\\;\\vec c] = 1 + \\lambda$. Then $|1 + \\lambda| = 4$ gives $\\lambda = 3$ or $-5$." },
        { text: "$\\lambda = 3$ only", feedback: "Volume is $|[\\vec a\\;\\vec b\\;\\vec c]|$, so $1 + \\lambda = -4$ also works, giving $\\lambda = -5$." },
        { text: "$\\lambda = 4$ or $\\lambda = -4$", feedback: "The triple product is $1 + \\lambda$, not $\\lambda$. Recompute $\\vec b\\times\\vec c = (1\\cdot 1 - 1\\cdot 0,\\; 1\\cdot\\lambda - 0\\cdot 1,\\; 0\\cdot 0 - 1\\cdot\\lambda)$." },
        { text: "$\\lambda = -3$ or $\\lambda = 5$", feedback: "Sign slip: $1 + \\lambda = 4$ gives $\\lambda = 3$, and $1 + \\lambda = -4$ gives $\\lambda = -5$." },
      ],
      hint: "Find the triple product in terms of $\\lambda$, then remember that the volume is its absolute value.",
    },
    {
      type: "quiz",
      id: "va5-1-q4",
      variant: "practice",
      question: "For a tetrahedron $ABCD$, $[\\overrightarrow{AB}\\;\\overrightarrow{AC}\\;\\overrightarrow{AD}] = -12$. What is its volume?",
      options: [
        { text: "$2$", correct: true, feedback: "$\\tfrac16|-12| = 2$. Volume is never negative; the sign only records orientation." },
        { text: "$-2$", feedback: "Volumes are positive. Take the absolute value." },
        { text: "$12$", feedback: "That is the full parallelepiped. The tetrahedron is one-sixth of it." },
        { text: "$4$", feedback: "That would be $\\tfrac13$. A tetrahedron is $\\tfrac13$ of a prism which is $\\tfrac12$ of the box, so $\\tfrac16$." },
      ],
    },
    {
      type: "quiz",
      id: "va5-1-q8",
      variant: "practice",
      question:
        "The tetrahedron with vertices $O(0, 0, 0)$, $A(4, 0, 0)$, $B(0, 3, 0)$ and $C(1, 1, k)$ has volume $6$. Find all possible $k$.",
      options: [
        { text: "$k = 3$ or $k = -3$", correct: true, feedback: "$\\overrightarrow{OB}\\times\\overrightarrow{OC} = (3k, 0, -3)$ and $\\overrightarrow{OA}\\cdot(3k, 0, -3) = 12k$. So $\\tfrac16|12k| = 2|k| = 6$, giving $k = \\pm 3$. Check: base triangle area $6$, height $|k|$, volume $\\tfrac13\\cdot 6\\cdot|k| = 2|k|$." },
        { text: "$k = 3$ only", feedback: "Volume uses the absolute value: $C$ can also sit 3 units below the plane $z = 0$, giving $k = -3$." },
        { text: "$k = \\pm\\tfrac12$", feedback: "You set the full triple product $|12k|$ equal to 6. The tetrahedron is only $\\tfrac16$ of the box." },
        { text: "$k = \\pm\\tfrac32$", feedback: "You used $\\tfrac13$ instead of $\\tfrac16$: $\\tfrac13|12k| = 4|k|$. The base of the box is a parallelogram, twice the triangle." },
      ],
      hint: "Volume $= \\tfrac16\\,|[\\overrightarrow{OA}\\;\\overrightarrow{OB}\\;\\overrightarrow{OC}]|$, and only $\\overrightarrow{OC}$ contains $k$.",
    },
    {
      type: "quiz",
      id: "va5-1-q5",
      variant: "concept",
      question: "Vector $\\vec a$ lies in the plane spanned by $\\vec b$ and $\\vec c$. What is $\\vec a\\cdot(\\vec b\\times\\vec c)$?",
      options: [
        { text: "$0$, because $\\vec b\\times\\vec c$ is perpendicular to that plane and so to $\\vec a$.", correct: true, feedback: "The box is squashed flat: zero height, zero volume. Lesson 5.3 turns this into a test." },
        { text: "$|\\vec a|\\,|\\vec b\\times\\vec c|$, the largest possible value.", feedback: "The largest value comes when $\\vec a$ is along the normal, the opposite situation." },
        { text: "It depends on the lengths of the vectors.", feedback: "Whatever the lengths, a vector in the plane is perpendicular to the plane's normal, so the dot is 0." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "determinant-form-and-symmetries",
  title: "5.2 · The Determinant Form and Its Symmetries",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Computing a cross product and then a dot product works, but it is two steps and easy to slip on. Since the cross product already came from a determinant, there should be a one-step formula. There is, and its shape explains every symmetry of the triple product at a glance.",
    },
    {
      type: "text",
      content:
        "**Derivation.** Write $\\vec b\\times\\vec c$ as the determinant from Chapter 4, with $\\hat i, \\hat j, \\hat k$ in the top row:",
    },
    {
      type: "math",
      latex:
        "\\vec b\\times\\vec c = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix} = (b_2c_3 - b_3c_2)\\,\\hat i - (b_1c_3 - b_3c_1)\\,\\hat j + (b_1c_2 - b_2c_1)\\,\\hat k",
    },
    {
      type: "text",
      content:
        "Dotting with $\\vec a = a_1\\hat i + a_2\\hat j + a_3\\hat k$ replaces $\\hat i$ by $a_1$, $\\hat j$ by $a_2$ and $\\hat k$ by $a_3$. That is the same as putting $\\vec a$'s components into the top row:",
    },
    {
      type: "math",
      latex:
        "[\\vec a\\;\\vec b\\;\\vec c] = \\begin{vmatrix} a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\\\ c_1 & c_2 & c_3 \\end{vmatrix}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Determinant form",
      content:
        "The scalar triple product is the $3\\times 3$ determinant whose rows are the components of $\\vec a$, $\\vec b$, $\\vec c$ **in that order**.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** $\\vec a = (1, 2, 3)$, $\\vec b = (0, 1, 4)$, $\\vec c = (5, 6, 0)$.\n\n**Step 1.** Expand along the top row: $1(1\\cdot 0 - 4\\cdot 6) - 2(0\\cdot 0 - 4\\cdot 5) + 3(0\\cdot 6 - 1\\cdot 5)$.\n\n**Step 2.** $= 1(-24) - 2(-20) + 3(-5) = -24 + 40 - 15 = 1$.\n\n**Step 3.** $[\\vec a\\;\\vec b\\;\\vec c] = 1$: the box has volume 1, and the triple is right-handed.",
    },
    {
      type: "text",
      content:
        "Now every symmetry is a determinant fact you already know, and each one also has a volume picture.",
    },
    {
      type: "table",
      headers: ["Rule", "Determinant reason", "Volume picture"],
      rows: [
        ["$[\\vec a\\;\\vec b\\;\\vec c] = [\\vec b\\;\\vec c\\;\\vec a] = [\\vec c\\;\\vec a\\;\\vec b]$ (cyclic shift)", "A cyclic shift of rows is two row swaps: the sign flips twice", "Same box, and the same handedness"],
        ["$[\\vec b\\;\\vec a\\;\\vec c] = -[\\vec a\\;\\vec b\\;\\vec c]$ (any single swap)", "Swapping two rows flips the sign", "Same box, opposite handedness"],
        ["$\\vec a\\cdot(\\vec b\\times\\vec c) = (\\vec a\\times\\vec b)\\cdot\\vec c$", "Both equal the determinant with rows $\\vec a, \\vec b, \\vec c$", "Any face can be the base"],
        ["$[\\vec a\\;\\vec a\\;\\vec b] = 0$", "Two equal rows give determinant 0", "Two edges coincide: the box is flat"],
        ["$[k\\vec a\\;\\vec b\\;\\vec c] = k[\\vec a\\;\\vec b\\;\\vec c]$", "Scaling one row scales the determinant", "Stretching one edge stretches the volume"],
        ["$[\\vec a + \\vec d\\;\\vec b\\;\\vec c] = [\\vec a\\;\\vec b\\;\\vec c] + [\\vec d\\;\\vec b\\;\\vec c]$", "Determinant is linear in each row", "Dot product distributes"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example (routine): shearing keeps the volume.** Let $\\vec a = (1, 0, 2)$, $\\vec b = (0, 1, 1)$, $\\vec c = (1, 1, 0)$. Compare $[\\vec a\\;\\vec b\\;\\vec c]$ with $[\\vec a + 3\\vec b\\;\\;\\vec b\\;\\;\\vec c]$.\n\n**Step 1 (original box).** $1(1\\cdot 0 - 1\\cdot 1) - 0 + 2(0\\cdot 1 - 1\\cdot 1) = -1 - 2 = -3$.\n\n**Step 2 (sheared box).** $\\vec a + 3\\vec b = (1, 3, 5)$, and\n$1(0 - 1) - 3(0 - 1) + 5(0 - 1) = -1 + 3 - 5 = -3$.\n\n**Step 3 (why they agree, without computing).** By linearity, $[\\vec a + 3\\vec b\\;\\;\\vec b\\;\\;\\vec c] = [\\vec a\\;\\vec b\\;\\vec c] + 3[\\vec b\\;\\vec b\\;\\vec c] = [\\vec a\\;\\vec b\\;\\vec c] + 0$.\n*Why this step:* adding a multiple of $\\vec b$ to $\\vec a$ slides the top of the box parallel to a face that contains $\\vec b$, like pushing a deck of cards. The height above that face does not change, so neither does the volume. In determinant language: adding a multiple of one row to another leaves the determinant unchanged.",
    },
    {
      type: "text",
      content:
        "**Why dot and cross can be swapped.** $(\\vec a\\times\\vec b)\\cdot\\vec c = \\vec c\\cdot(\\vec a\\times\\vec b) = [\\vec c\\;\\vec a\\;\\vec b]$, and a cyclic shift gives $[\\vec a\\;\\vec b\\;\\vec c]$. So in $\\vec a\\cdot\\vec b\\times\\vec c$ you may put the dot and the cross in either slot, as long as the vectors keep their order. That is why the bracket notation $[\\vec a\\;\\vec b\\;\\vec c]$ records only the order.",
    },
    {
      type: "text",
      content:
        "**What the sign means.** $[\\hat i\\;\\hat j\\;\\hat k] = \\hat i\\cdot(\\hat j\\times\\hat k) = \\hat i\\cdot\\hat i = 1$, positive. A positive triple product means $\\vec a, \\vec b, \\vec c$ are arranged like $\\hat i, \\hat j, \\hat k$: a **right-handed** triple. Swap two and you get $[\\hat j\\;\\hat i\\;\\hat k] = -1$, a left-handed triple. The size is the volume; the sign is the handedness.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "triple",
        a: [1, 1, 3],
        b: [4, 0, 0],
        c: [1, 3, 0],
        sliders: [{ name: "tilt", min: -60, max: 60, step: 5, initial: 40 }],
        readouts: ["volume", "cross"],
        caption:
          "b × c points up here. With a above the base the volume is positive (right-handed); drag the tilt below 0 and it goes negative (left-handed) with the same size at matching angles.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example (application): checking a 3D camera's axes.** A game engine builds a camera frame from three axis vectors: $\\vec u = (1, 1, 0)$ (right), $\\vec v = (-1, 1, 0)$ (up) and $\\vec w = (0, 0, -2)$ (forward). The renderer assumes a right-handed frame; if the frame is left-handed, every model appears mirror-flipped. Is this frame safe?\n\n**Step 1 (determinant, rows in the order u, v, w).**",
    },
    {
      type: "math",
      latex:
        "[\\vec u\\;\\vec v\\;\\vec w] = \\begin{vmatrix} 1 & 1 & 0 \\\\ -1 & 1 & 0 \\\\ 0 & 0 & -2 \\end{vmatrix} = 1(1\\cdot(-2) - 0) - 1\\big((-1)(-2) - 0\\big) + 0 = -2 - 2 = -4",
    },
    {
      type: "text",
      content:
        "*Why this step:* only the **sign** is needed to decide handedness, and the determinant gives it in one line.\n\n**Step 2 (read the sign).** $-4 < 0$: the frame is left-handed, so the scene would render mirrored.\n\n**Step 3 (fix and check).** Flip the forward axis to $\\vec w = (0, 0, 2)$. One row changes sign, so the triple product becomes $+4$: right-handed. Cross-check: $\\vec u\\times\\vec v = (0, 0, 2)$, which points the same way as the new $\\vec w$, exactly as $\\hat i\\times\\hat j = \\hat k$ does. The size $4$ is the volume of the box, $|\\vec u\\times\\vec v|\\times|\\vec w| = 2\\times 2$, since $\\vec w$ is perpendicular to both.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: any rearrangement gives the same value",
      content:
        "Only **cyclic** rearrangements do: $abc \\to bca \\to cab$. The other three orders, $bac$, $acb$, $cba$, give the **negative**. The size never changes (same box), but the sign does. Quick test: read the order around a circle $a \\to b \\to c \\to a$; if your order goes the same way round, the sign is kept.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: expanding a sum.** Given $[\\vec a\\;\\vec b\\;\\vec c] = 5$, find $[\\vec a + \\vec b\\;\\;\\vec b + \\vec c\\;\\;\\vec c + \\vec a]$.\n\n**Step 1.** Cross the last two: $(\\vec b + \\vec c)\\times(\\vec c + \\vec a) = \\vec b\\times\\vec c + \\vec b\\times\\vec a + \\vec c\\times\\vec c + \\vec c\\times\\vec a$, and $\\vec c\\times\\vec c = \\vec 0$.\n\n**Step 2.** Dot with $\\vec a$: only $\\vec a\\cdot(\\vec b\\times\\vec c) = [\\vec a\\;\\vec b\\;\\vec c]$ survives; the other terms repeat $\\vec a$ and vanish.\n\n**Step 3.** Dot with $\\vec b$: only $\\vec b\\cdot(\\vec c\\times\\vec a) = [\\vec b\\;\\vec c\\;\\vec a] = [\\vec a\\;\\vec b\\;\\vec c]$ survives.\n\n**Step 4.** Total: $2[\\vec a\\;\\vec b\\;\\vec c] = 10$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Shortcut for the same question",
      content:
        "In determinant language, the rows $\\vec a + \\vec b$, $\\vec b + \\vec c$, $\\vec c + \\vec a$ come from $\\vec a, \\vec b, \\vec c$ by the matrix $\\begin{pmatrix}1&1&0\\\\0&1&1\\\\1&0&1\\end{pmatrix}$, whose determinant is 2. So the answer is $2\\times 5$. The same idea shows $[\\vec a - \\vec b\\;\\;\\vec b - \\vec c\\;\\;\\vec c - \\vec a] = 0$: those three vectors add up to $\\vec 0$, so they are coplanar.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam style).** If $[\\vec a\\;\\vec b\\;\\vec c] = 3$, find $[\\vec a - 2\\vec b\\;\\;\\vec b + \\vec c\\;\\;\\vec c - \\vec a]$.\n\n**Step 1 (write the coefficient matrix).** Each new vector is a combination of $\\vec a, \\vec b, \\vec c$; record the coefficients as rows:\n$\\vec a - 2\\vec b \\to (1, -2, 0)$, $\\vec b + \\vec c \\to (0, 1, 1)$, $\\vec c - \\vec a \\to (-1, 0, 1)$.\n*Why this step:* the triple product is linear in each slot, so expanding all $2\\times 2\\times 2 = 8$ terms is the same as multiplying $[\\vec a\\;\\vec b\\;\\vec c]$ by the determinant of these coefficients.\n\n**Step 2 (coefficient determinant).**",
    },
    {
      type: "math",
      latex:
        "\\begin{vmatrix} 1 & -2 & 0 \\\\ 0 & 1 & 1 \\\\ -1 & 0 & 1 \\end{vmatrix} = 1(1 - 0) - (-2)\\big(0 - (-1)\\big) + 0 = 1 + 2 = 3",
    },
    {
      type: "text",
      content:
        "**Step 3 (multiply).** $[\\vec a - 2\\vec b\\;\\;\\vec b + \\vec c\\;\\;\\vec c - \\vec a] = 3\\times[\\vec a\\;\\vec b\\;\\vec c] = 3\\times 3 = 9$.\n\n**Check by expanding directly.** Of the 8 terms, only those using each of $\\vec a, \\vec b, \\vec c$ exactly once survive: $\\vec a$ from slot 1 with $\\vec b$ from slot 2 and $\\vec c$ from slot 3 gives $+[\\vec a\\;\\vec b\\;\\vec c]$; $-2\\vec b$ from slot 1, $\\vec c$ from slot 2 and $-\\vec a$ from slot 3 gives $(-2)(-1)[\\vec b\\;\\vec c\\;\\vec a] = +2[\\vec a\\;\\vec b\\;\\vec c]$. Total $3[\\vec a\\;\\vec b\\;\\vec c] = 9$.",
    },
    {
      type: "quiz",
      id: "va5-2-q1",
      variant: "concept",
      question: "If $[\\vec a\\;\\vec b\\;\\vec c] = 4$, what is $[\\vec b\\;\\vec a\\;\\vec c]$?",
      options: [
        { text: "$-4$", correct: true, feedback: "A single swap reverses handedness: same box, opposite sign." },
        { text: "$4$", feedback: "Only cyclic shifts keep the sign. $bac$ is one swap away from $abc$." },
        { text: "$0$", feedback: "Zero needs a repeated or coplanar vector. Here the box is unchanged, only its orientation flips." },
        { text: "$\\tfrac14$", feedback: "Rearranging never inverts the value; at most it flips the sign." },
      ],
    },
    {
      type: "quiz",
      id: "va5-2-q2",
      variant: "practice",
      question: "If $[\\vec a\\;\\vec b\\;\\vec c] = 4$, what is $[\\vec c\\;\\vec a\\;\\vec b]$?",
      options: [
        { text: "$4$", correct: true, feedback: "$cab$ is a cyclic shift of $abc$, so the value is unchanged." },
        { text: "$-4$", feedback: "Go round the circle $a\\to b\\to c\\to a$: $c, a, b$ follows it. Cyclic, so no sign change." },
        { text: "$12$", feedback: "Rearranging does not multiply the volume." },
      ],
    },
    {
      type: "quiz",
      id: "va5-2-q3",
      variant: "practice",
      question: "Evaluate $[\\vec a\\;\\vec b\\;\\vec c]$ for $\\vec a = (2, 0, 1)$, $\\vec b = (1, 3, 0)$, $\\vec c = (0, 1, 4)$.",
      options: [
        { text: "$25$", correct: true, feedback: "$2(3\\cdot 4 - 0\\cdot 1) - 0 + 1(1\\cdot 1 - 3\\cdot 0) = 24 + 1 = 25$." },
        { text: "$23$", feedback: "Check the last cofactor sign: the third term is $+a_3(b_1c_2 - b_2c_1) = +1$." },
        { text: "$24$", feedback: "You dropped the $a_3$ term: $1\\cdot(1\\cdot 1 - 3\\cdot 0) = 1$." },
        { text: "$-25$", feedback: "Rows in the order $\\vec a, \\vec b, \\vec c$ give $+25$." },
      ],
      hint: "Expand along the top row: $a_1(b_2c_3 - b_3c_2) - a_2(b_1c_3 - b_3c_1) + a_3(b_1c_2 - b_2c_1)$.",
    },
    {
      type: "quiz",
      id: "va5-2-q4",
      variant: "concept",
      question: "What is $[\\vec a\\;\\vec b\\;\\;\\vec a + \\vec b]$ for any vectors $\\vec a, \\vec b$?",
      options: [
        { text: "$0$", correct: true, feedback: "$[\\vec a\\;\\vec b\\;\\vec a] + [\\vec a\\;\\vec b\\;\\vec b] = 0 + 0$. Geometrically, $\\vec a + \\vec b$ lies in the plane of $\\vec a$ and $\\vec b$." },
        { text: "$[\\vec a\\;\\vec b\\;\\vec a] + [\\vec a\\;\\vec b\\;\\vec b]$, which depends on $\\vec a$ and $\\vec b$", feedback: "The split is right, but each term has a repeated vector and so equals 0." },
        { text: "$|\\vec a\\times\\vec b|^2$", feedback: "$(\\vec a\\times\\vec b)\\cdot(\\vec a + \\vec b) = 0$ since the cross is perpendicular to both." },
      ],
    },
    {
      type: "quiz",
      id: "va5-2-q5",
      variant: "practice",
      question: "If $[\\vec a\\;\\vec b\\;\\vec c] = 2$, find $[2\\vec a\\;\\;3\\vec b\\;\\;-\\vec c]$.",
      options: [
        { text: "$-12$", correct: true, feedback: "Scalars pull out of each slot: $2\\cdot 3\\cdot(-1)\\cdot 2 = -12$." },
        { text: "$12$", feedback: "Don't lose the $-1$ from $-\\vec c$." },
        { text: "$8$", feedback: "Scalars multiply, not add: $2\\times 3\\times(-1) = -6$, then times 2." },
        { text: "$-4$", feedback: "Each factor multiplies the whole value: $2\\cdot 3\\cdot(-1) = -6$, and $-6\\times 2 = -12$." },
      ],
    },
    {
      type: "quiz",
      id: "va5-2-q7",
      variant: "practice",
      question: "If $[\\vec a\\;\\vec b\\;\\vec c] = 5$, find $[\\vec a + 2\\vec c\\;\\;\\vec b\\;\\;\\vec c]$.",
      options: [
        { text: "$5$", correct: true, feedback: "$[\\vec a\\;\\vec b\\;\\vec c] + 2[\\vec c\\;\\vec b\\;\\vec c] = 5 + 0$. Sliding one edge along another is a shear: the volume is unchanged." },
        { text: "$15$", feedback: "The factor 2 multiplies $[\\vec c\\;\\vec b\\;\\vec c]$, which is 0 because $\\vec c$ repeats. It does not scale the whole product." },
        { text: "$10$", feedback: "Only scaling a whole slot scales the product. Here you added $2\\vec c$ to $\\vec a$, and that extra piece contributes $2[\\vec c\\;\\vec b\\;\\vec c] = 0$." },
        { text: "$-5$", feedback: "No two vectors were swapped, so the sign cannot flip." },
      ],
      hint: "Split the first slot: $[\\vec a\\;\\vec b\\;\\vec c] + 2[\\vec c\\;\\vec b\\;\\vec c]$.",
    },
    {
      type: "quiz",
      id: "va5-2-q8",
      variant: "practice",
      question: "If $[\\vec a\\;\\vec b\\;\\vec c] = 3$, find $[\\vec a - \\vec b\\;\\;\\vec b - \\vec c\\;\\;\\vec c + \\vec a]$.",
      options: [
        { text: "$6$", correct: true, feedback: "Coefficient determinant $\\begin{vmatrix}1&-1&0\\\\0&1&-1\\\\1&0&1\\end{vmatrix} = 1(1) - (-1)(0 + 1) + 0 = 2$, so the answer is $2\\times 3 = 6$." },
        { text: "$0$", feedback: "That is the answer for $\\vec c - \\vec a$ in the last slot, where the three vectors add to $\\vec 0$. Here the last one is $\\vec c + \\vec a$." },
        { text: "$3$", feedback: "The coefficient determinant is 2, not 1. Expand it along the top row carefully." },
        { text: "$-6$", feedback: "Sign slip in the middle cofactor: $-(-1)\\cdot(0\\cdot 1 - (-1)\\cdot 1) = +1$." },
      ],
      hint: "Write the coefficients of $\\vec a, \\vec b, \\vec c$ in each slot as the rows of a $3\\times 3$ determinant.",
    },
    {
      type: "quiz",
      id: "va5-2-q6",
      variant: "concept",
      question: "Which equals $\\vec a\\cdot(\\vec b\\times\\vec c)$ for every choice of vectors?",
      options: [
        { text: "$(\\vec a\\times\\vec b)\\cdot\\vec c$", correct: true, feedback: "Dot and cross may be exchanged as long as the order $a, b, c$ is kept." },
        { text: "$(\\vec b\\times\\vec a)\\cdot\\vec c$", feedback: "That is $[\\vec b\\;\\vec a\\;\\vec c] = -[\\vec a\\;\\vec b\\;\\vec c]$." },
        { text: "$\\vec a\\times(\\vec b\\cdot\\vec c)$", feedback: "$\\vec b\\cdot\\vec c$ is a scalar; crossing it with $\\vec a$ is meaningless." },
        { text: "$\\vec c\\cdot(\\vec b\\times\\vec a)$", feedback: "That is $[\\vec c\\;\\vec b\\;\\vec a]$, a reversed order, so it is the negative." },
      ],
    },
    {
      type: "quiz",
      id: "va5-2-q9",
      variant: "practice",
      question:
        "A robot arm's controller uses the axes $\\vec u = (0, 1, 0)$, $\\vec v = (1, 0, 0)$, $\\vec w = (0, 0, 3)$, in that order. Is the frame right-handed?",
      options: [
        { text: "No: $[\\vec u\\;\\vec v\\;\\vec w] = -3 < 0$, so it is left-handed.", correct: true, feedback: "$0(0 - 0) - 1(1\\cdot 3 - 0) + 0 = -3$. Indeed $\\vec u\\times\\vec v = \\hat j\\times\\hat i = -\\hat k$, which points against $\\vec w$. Flipping any one axis fixes it." },
        { text: "Yes: $[\\vec u\\;\\vec v\\;\\vec w] = 3 > 0$.", feedback: "Sign slip in the middle cofactor: the term is $-u_2(v_1w_3 - v_3w_1) = -1\\cdot 3$." },
        { text: "Yes, because the three axes are mutually perpendicular.", feedback: "Perpendicular axes can be arranged either way round. Only the sign of the triple product decides handedness." },
        { text: "It cannot be decided because $\\vec w$ is not a unit vector.", feedback: "Scaling an axis by a positive number scales the triple product but never changes its sign." },
      ],
      hint: "Put the rows in the order $\\vec u, \\vec v, \\vec w$ and look only at the sign of the determinant.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "coplanarity",
  title: "5.3 · Coplanarity",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 5.1, tilting $\\vec a$ down into the base squashed the box flat and the volume dropped to 0. Turn that around: **if the volume is 0, the box must be flat**, which means all three edges lie in one plane. That single observation gives the cleanest coplanarity test in the syllabus.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "triple",
        a: [2, 2, 3],
        b: [4, 0, 0],
        c: [1, 3, 0],
        sliders: [{ name: "tilt", min: -30, max: 60, step: 5, initial: 45 }],
        readouts: ["volume"],
        caption:
          "Lower the tilt to 0. The top face falls onto the base, the box has no height, and the volume readout hits 0 exactly when a joins the plane of b and c.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Coplanarity test",
      content:
        "Three vectors $\\vec a, \\vec b, \\vec c$ are coplanar **if and only if** $[\\vec a\\;\\vec b\\;\\vec c] = 0$.\n\nFour points $A, B, C, D$ are coplanar **if and only if** $[\\overrightarrow{AB}\\;\\overrightarrow{AC}\\;\\overrightarrow{AD}] = 0$.",
    },
    {
      type: "text",
      content:
        "**Why the four-point test works.** Points lie in one plane exactly when the three edges from one of them, $\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}$, lie in that plane. Equivalently, the tetrahedron $ABCD$ has zero volume.\n\n**Link back to 2.4.** If $\\vec c = x\\vec a + y\\vec b$, then $[\\vec a\\;\\vec b\\;\\vec c] = x[\\vec a\\;\\vec b\\;\\vec a] + y[\\vec a\\;\\vec b\\;\\vec b] = 0$. Conversely, if $\\vec a$ and $\\vec b$ are not parallel and the triple product is 0, then $\\vec c$ lies in their plane and so is a combination of them. So:",
    },
    {
      type: "math",
      latex:
        "[\\vec a\\;\\vec b\\;\\vec c] = 0 \\iff \\text{one of the vectors is a linear combination of the other two}",
    },
    {
      type: "text",
      content:
        "**Worked example 1: find λ.** For which $\\lambda$ are $\\vec a = (2, -1, 1)$, $\\vec b = (1, 2, -3)$, $\\vec c = (3, \\lambda, 5)$ coplanar?\n\n**Step 1.** Set the determinant to zero, expanding along the top row:\n$2\\big(2\\cdot 5 - (-3)\\lambda\\big) - (-1)\\big(1\\cdot 5 - (-3)\\cdot 3\\big) + 1\\big(1\\cdot\\lambda - 2\\cdot 3\\big) = 0$.\n\n**Step 2.** Simplify: $2(10 + 3\\lambda) + 14 + (\\lambda - 6) = 28 + 7\\lambda$.\n\n**Step 3.** $28 + 7\\lambda = 0$ gives $\\lambda = -4$.\n\n**Check.** With $\\lambda = -4$: $\\vec c = (3, -4, 5)$. Try $\\vec c = x\\vec a + y\\vec b$: the first two components give $2x + y = 3$, $-x + 2y = -4$, so $x = 2$, $y = -1$. Third component: $2\\cdot 1 + (-1)(-3) = 5$. It matches.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: four points.** Find $x$ if $A(3, 2, 1)$, $B(4, x, 5)$, $C(4, 2, -2)$, $D(6, 5, -1)$ are coplanar.\n\n**Step 1.** Edges from $A$: $\\overrightarrow{AB} = (1, x - 2, 4)$, $\\overrightarrow{AC} = (1, 0, -3)$, $\\overrightarrow{AD} = (3, 3, -2)$.\n\n**Step 2.** Determinant: $1\\big(0\\cdot(-2) - (-3)\\cdot 3\\big) - (x - 2)\\big(1\\cdot(-2) - (-3)\\cdot 3\\big) + 4\\big(1\\cdot 3 - 0\\cdot 3\\big)$.\n\n**Step 3.** $= 9 - 7(x - 2) + 12 = 35 - 7x$.\n\n**Step 4.** $35 - 7x = 0$, so $x = 5$.",
    },
    {
      type: "text",
      content:
        "**Worked example (application): will the solar panel sit flat?** A flat solar panel is to be bolted onto four mounting brackets on a sloping roof. A surveyor measures the bracket tips (in metres, from a corner of the roof) as $P(1, 0, 2)$, $Q(3, 1, 3)$, $R(2, 3, 4)$, $S(4, 4, 5)$. A rigid flat panel can only touch all four if they are coplanar. Will it rock?\n\n**Step 1 (edges from one bracket).** $\\overrightarrow{PQ} = (2, 1, 1)$, $\\overrightarrow{PR} = (1, 3, 2)$, $\\overrightarrow{PS} = (3, 4, 3)$.\n*Why this step:* coplanarity of points becomes coplanarity of the three edge vectors from one of them.\n\n**Step 2 (triple product).**",
    },
    {
      type: "math",
      latex:
        "\\begin{vmatrix} 2 & 1 & 1 \\\\ 1 & 3 & 2 \\\\ 3 & 4 & 3 \\end{vmatrix} = 2(9 - 8) - 1(3 - 6) + 1(4 - 9) = 2 + 3 - 5 = 0",
    },
    {
      type: "text",
      content:
        "**Step 3 (interpret).** The tetrahedron $PQRS$ has zero volume, so the four tips lie in one plane and the panel will sit flat. You can even see why: $\\overrightarrow{PS} = \\overrightarrow{PQ} + \\overrightarrow{PR}$, so $PQSR$ is a parallelogram.\n\n**What if a bracket is 10 cm too high?** Move $S$ to $(4, 4, 5.1)$. Only the last row changes, to $(3, 4, 3.1)$, and the determinant becomes $2(9.3 - 8) - 1(3.1 - 6) + 1(4 - 9) = 2.6 + 2.9 - 5 = 0.5 \\neq 0$. The panel would rock on a diagonal. The tetrahedron's volume $\\tfrac16(0.5) \\approx 0.083\\ \\text{m}^3$ measures how badly.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: coplanar but nowhere near parallel.** $\\vec a = (1, 2, 3)$, $\\vec b = (2, 3, 4)$, $\\vec c = (3, 4, 5)$.\n\n**Step 1.** $1(15 - 16) - 2(10 - 12) + 3(8 - 9) = -1 + 4 - 3 = 0$.\n\n**Step 2.** So they are coplanar. Indeed $\\vec c = 2\\vec b - \\vec a$. No two of them are parallel, yet all three lie in one plane.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam style, a CBSE favourite).** $\\vec a, \\vec b, \\vec c$ are non-coplanar. Show that $\\vec p = \\vec a - 2\\vec b + 3\\vec c$, $\\vec q = -2\\vec a + 3\\vec b - 4\\vec c$ and $\\vec r = \\vec a - 3\\vec b + 5\\vec c$ are coplanar, and express $\\vec r$ in terms of $\\vec p$ and $\\vec q$.\n\n**Step 1 (reduce to a number determinant).** As in 5.2, $[\\vec p\\;\\vec q\\;\\vec r] = D\\,[\\vec a\\;\\vec b\\;\\vec c]$, where $D$ is the determinant of the coefficients.\n*Why this step:* we do not know the components of $\\vec a, \\vec b, \\vec c$, but we don't need them. Only the coefficients matter.",
    },
    {
      type: "math",
      latex:
        "D = \\begin{vmatrix} 1 & -2 & 3 \\\\ -2 & 3 & -4 \\\\ 1 & -3 & 5 \\end{vmatrix} = 1(15 - 12) - (-2)(-10 + 4) + 3(6 - 3) = 3 - 12 + 9 = 0",
    },
    {
      type: "text",
      content:
        "**Step 2 (conclude).** $[\\vec p\\;\\vec q\\;\\vec r] = 0\\cdot[\\vec a\\;\\vec b\\;\\vec c] = 0$, so $\\vec p, \\vec q, \\vec r$ are coplanar.\n\n**Step 3 (find the combination).** Try $\\vec r = x\\vec p + y\\vec q$. Since $\\vec a, \\vec b, \\vec c$ are non-coplanar, their coefficients must match separately:\n$\\vec a$: $x - 2y = 1$; $\\vec b$: $-2x + 3y = -3$.\nFrom the first, $x = 1 + 2y$; substituting, $-2 - 4y + 3y = -3$, so $y = 1$ and $x = 3$.\n*Why this step:* matching coefficients is only allowed because $\\vec a, \\vec b, \\vec c$ form a basis (non-zero triple product), so each vector has a unique set of coefficients.\n\n**Step 4 (check the unused equation).** $\\vec c$: $3x - 4y = 9 - 4 = 5$. It matches, so $\\vec r = 3\\vec p + \\vec q$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: three vectors are coplanar only if they are parallel",
      content:
        "Parallel is far too strong. **Any two** vectors are always coplanar (they span a plane, or a line if parallel). Three vectors are coplanar when the third lies in the plane of the other two: $\\hat i$, $\\hat j$ and $\\hat i + \\hat j$ are coplanar, and no two of them are parallel. Parallel vectors are a special case of coplanar, not the definition.",
    },
    {
      type: "table",
      headers: ["Value of $[\\vec a\\;\\vec b\\;\\vec c]$", "Meaning"],
      rows: [
        ["$\\neq 0$", "Not coplanar. The three vectors form a basis: every vector in space is a unique combination $x\\vec a + y\\vec b + z\\vec c$"],
        ["$= 0$", "Coplanar (flat box). One vector is a combination of the others"],
        ["$> 0$ / $< 0$", "Right-handed / left-handed triple"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 4: using a non-coplanar basis.** The table says a non-zero triple product lets you write *every* vector as $x\\vec a + y\\vec b + z\\vec c$. Let us actually do it. Write $\\vec r = (1, 2, 3)$ in terms of $\\vec a = (1, 0, 0)$, $\\vec b = (1, 1, 0)$, $\\vec c = (1, 1, 1)$.\n\n**Step 1 (is it a basis?).** $[\\vec a\\;\\vec b\\;\\vec c] = \\begin{vmatrix}1&0&0\\\\1&1&0\\\\1&1&1\\end{vmatrix} = 1 \\neq 0$, so the three are not coplanar and an answer exists and is unique.\n\n**Step 2 (match components).** $x(1, 0, 0) + y(1, 1, 0) + z(1, 1, 1) = (x + y + z,\\; y + z,\\; z) = (1, 2, 3)$.\n\n**Step 3 (solve from the bottom).** $z = 3$; then $y + 3 = 2$ gives $y = -1$; then $x - 1 + 3 = 1$ gives $x = -1$.\n\n**Check.** $-(1, 0, 0) - (1, 1, 0) + 3(1, 1, 1) = (1, 2, 3)$. So $\\vec r = -\\vec a - \\vec b + 3\\vec c$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Preview: the equation of a plane",
      content:
        "The plane through the point with position vector $\\vec a$, spanned by directions $\\vec b$ and $\\vec c$, is the set of points $\\vec r$ for which $\\vec r - \\vec a$, $\\vec b$, $\\vec c$ are coplanar: $[\\,\\vec r - \\vec a\\;\\;\\vec b\\;\\;\\vec c\\,] = 0$. You will meet this again in 3D geometry.",
    },
    {
      type: "quiz",
      id: "va5-3-q1",
      variant: "concept",
      question: "Are $\\hat i$, $\\hat j$ and $\\hat i + \\hat j$ coplanar?",
      options: [
        { text: "Yes: all three lie in the $xy$-plane, even though no two are parallel.", correct: true, feedback: "And $[\\hat i\\;\\hat j\\;\\hat i + \\hat j] = 0$ confirms it. Coplanar does not require parallel." },
        { text: "No, because no two of them are parallel.", feedback: "That is the misconception. Coplanar only needs a common plane, and the $xy$-plane holds all three." },
        { text: "Only if we also include $\\hat k$.", feedback: "$\\hat k$ sticks out of the $xy$-plane; adding it would break coplanarity." },
      ],
    },
    {
      type: "quiz",
      id: "va5-3-q2",
      variant: "practice",
      question: "Find $\\lambda$ so that $(1, 1, 0)$, $(0, 1, 1)$ and $(1, \\lambda, 1)$ are coplanar.",
      options: [
        { text: "$\\lambda = 2$", correct: true, feedback: "Determinant $= 1(1 - \\lambda) - 1(0 - 1) + 0 = 2 - \\lambda$. Also $(1, 2, 1)$ is the sum of the first two." },
        { text: "$\\lambda = 0$", feedback: "Then the determinant is $2$, not 0." },
        { text: "$\\lambda = 1$", feedback: "Then the determinant is $1$. Recompute $1(1\\cdot 1 - 1\\cdot\\lambda) - 1(0\\cdot 1 - 1\\cdot 1)$." },
        { text: "$\\lambda = -2$", feedback: "Sign slip: $2 - \\lambda = 0$ gives $\\lambda = 2$." },
      ],
      hint: "Look for $\\vec c = \\vec a + \\vec b$ before computing anything.",
    },
    {
      type: "quiz",
      id: "va5-3-q3",
      variant: "practice",
      question: "For which $\\lambda$ are the points $O(0,0,0)$, $A(1,0,0)$, $B(0,1,0)$, $C(1,1,\\lambda)$ coplanar?",
      options: [
        { text: "$\\lambda = 0$", correct: true, feedback: "$[\\overrightarrow{OA}\\;\\overrightarrow{OB}\\;\\overrightarrow{OC}] = \\lambda$, zero only when $C$ is in the $xy$-plane with the others." },
        { text: "$\\lambda = 1$", feedback: "Then $C = (1,1,1)$ sits one unit above the plane of $O, A, B$." },
        { text: "Every $\\lambda$, since any four points are coplanar", feedback: "Any **three** points are coplanar. Four points need the test." },
      ],
    },
    {
      type: "quiz",
      id: "va5-3-q6",
      variant: "practice",
      question: "Find $k$ if the points $A(1, 2, 1)$, $B(2, 3, 1)$, $C(1, 4, 2)$, $D(3, k, 4)$ are coplanar.",
      options: [
        { text: "$k = 10$", correct: true, feedback: "$\\overrightarrow{AB} = (1, 1, 0)$, $\\overrightarrow{AC} = (0, 2, 1)$, $\\overrightarrow{AD} = (2, k - 2, 3)$. Determinant $= 1\\big(6 - (k - 2)\\big) - 1(0 - 2) + 0 = 10 - k$. Check: with $k = 10$, $\\overrightarrow{AD} = (2, 8, 3) = 2\\overrightarrow{AB} + 3\\overrightarrow{AC}$." },
        { text: "$k = 6$", feedback: "Sign slip in the middle term: $-a_2(b_1c_3 - b_3c_1) = -1(0\\cdot 3 - 1\\cdot 2) = +2$, not $-2$." },
        { text: "$k = 8$", feedback: "You dropped the middle cofactor. The determinant is $(8 - k) + 2 = 10 - k$." },
        { text: "$k = -10$", feedback: "$10 - k = 0$ gives $k = +10$." },
      ],
      hint: "Use edges from $A$: $[\\overrightarrow{AB}\\;\\overrightarrow{AC}\\;\\overrightarrow{AD}] = 0$. Only $\\overrightarrow{AD}$ contains $k$.",
    },
    {
      type: "quiz",
      id: "va5-3-q7",
      variant: "practice",
      question:
        "Four anchor points for a flat glass canopy are $A(0, 0, 0)$, $B(1, 2, 0)$, $C(0, 1, 1)$ and $D(2, 5, k)$ (in metres). For which height $k$ do all four lie in one plane?",
      options: [
        { text: "$k = 1$", correct: true, feedback: "$\\overrightarrow{AB} = (1, 2, 0)$, $\\overrightarrow{AC} = (0, 1, 1)$, $\\overrightarrow{AD} = (2, 5, k)$. Determinant $= 1(k - 5) - 2(0 - 2) + 0 = k - 1$. Check: $(2, 5, 1) = 2\\overrightarrow{AB} + \\overrightarrow{AC}$." },
        { text: "$k = 5$", feedback: "You dropped the middle cofactor $-2(0\\cdot k - 1\\cdot 2) = +4$." },
        { text: "$k = 9$", feedback: "Sign slip in the middle term: $-a_2(b_1c_3 - b_3c_1) = -2(0 - 2) = +4$, so the determinant is $k - 5 + 4$." },
        { text: "Any $k$: four points always fit on a canopy", feedback: "Any **three** points are coplanar; a fourth must pass the triple-product test." },
      ],
      hint: "Set $[\\overrightarrow{AB}\\;\\overrightarrow{AC}\\;\\overrightarrow{AD}] = 0$.",
    },
    {
      type: "quiz",
      id: "va5-3-q8",
      variant: "practice",
      question:
        "$\\vec a, \\vec b, \\vec c$ are non-coplanar. For which $\\lambda$ are $\\vec a + \\vec b$, $\\vec b + \\vec c$ and $\\vec a + \\lambda\\vec c$ coplanar?",
      options: [
        { text: "$\\lambda = -1$", correct: true, feedback: "Coefficient determinant $\\begin{vmatrix}1&1&0\\\\0&1&1\\\\1&0&\\lambda\\end{vmatrix} = \\lambda + 1$. At $\\lambda = -1$, indeed $(\\vec a + \\vec b) - (\\vec b + \\vec c) = \\vec a - \\vec c$." },
        { text: "$\\lambda = 1$", feedback: "Then the determinant is $2$, not 0. Recompute: $1(\\lambda - 0) - 1(0 - 1) + 0 = \\lambda + 1$." },
        { text: "$\\lambda = 0$", feedback: "Then the determinant is $1$: $\\vec a$, $\\vec a + \\vec b$, $\\vec b + \\vec c$ are not coplanar." },
        { text: "No value, because $\\vec a, \\vec b, \\vec c$ are non-coplanar", feedback: "Combinations of non-coplanar vectors can still be coplanar. The test is whether the coefficient determinant is 0." },
      ],
      hint: "$[\\vec p\\;\\vec q\\;\\vec r] = (\\text{coefficient determinant})\\times[\\vec a\\;\\vec b\\;\\vec c]$, and $[\\vec a\\;\\vec b\\;\\vec c] \\neq 0$.",
    },
    {
      type: "quiz",
      id: "va5-3-q9",
      variant: "practice",
      question:
        "Using the basis $\\vec a = (1, 0, 0)$, $\\vec b = (1, 1, 0)$, $\\vec c = (1, 1, 1)$ from Worked example 4, write $\\vec r = (2, 3, 4)$ as $x\\vec a + y\\vec b + z\\vec c$.",
      options: [
        { text: "$\\vec r = -\\vec a - \\vec b + 4\\vec c$", correct: true, feedback: "$(x + y + z,\\; y + z,\\; z) = (2, 3, 4)$ gives $z = 4$, $y = -1$, $x = -1$. Check: $-(1, 0, 0) - (1, 1, 0) + (4, 4, 4) = (2, 3, 4)$." },
        { text: "$\\vec r = 2\\vec a + 3\\vec b + 4\\vec c$", feedback: "Those are the coefficients along $\\hat i, \\hat j, \\hat k$. In the new basis $2\\vec a + 3\\vec b + 4\\vec c = (9, 7, 4)$." },
        { text: "$\\vec r = \\vec a - \\vec b + 4\\vec c$", feedback: "Sign slip for $x$: $x + y + z = 2$ with $y = -1$, $z = 4$ gives $x = -1$." },
        { text: "It cannot be done, because $\\vec a, \\vec b, \\vec c$ are not perpendicular.", feedback: "A basis only needs a non-zero triple product, and here $[\\vec a\\;\\vec b\\;\\vec c] = 1$. Perpendicularity is not required." },
      ],
      hint: "Solve from the bottom component up: the $z$-component only involves $\\vec c$.",
    },
    {
      type: "quiz",
      id: "va5-3-q4",
      variant: "concept",
      question: "$[\\vec a\\;\\vec b\\;\\vec c] = 7$. Which statement must be true?",
      options: [
        { text: "Every vector in space can be written uniquely as $x\\vec a + y\\vec b + z\\vec c$.", correct: true, feedback: "A non-zero triple product means the box has volume, so the three edges are not coplanar and form a basis." },
        { text: "Two of the vectors are parallel.", feedback: "Parallel vectors would make the box flat and the product 0." },
        { text: "$\\vec a$ is a combination of $\\vec b$ and $\\vec c$.", feedback: "Then $\\vec a$ would be in their plane and the product would be 0." },
        { text: "The three vectors are mutually perpendicular.", feedback: "They could be, but they need not be. Any non-flat box gives a non-zero value." },
      ],
    },
    {
      type: "quiz",
      id: "va5-3-q5",
      variant: "concept",
      question: "Are any two vectors always coplanar?",
      options: [
        { text: "Yes. Place them tail to tail and they lie in a plane (or on a line, if parallel).", correct: true, feedback: "That is why coplanarity questions only become interesting with three or more vectors." },
        { text: "No, only if they are parallel.", feedback: "Two non-parallel vectors span a plane, so they are certainly coplanar." },
        { text: "Only if they are perpendicular.", feedback: "The angle between them is irrelevant; two vectors always fit in a plane." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "choosing-the-right-product",
  title: "5.4 · Choosing the Right Product",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "You now own four tools: length, dot, cross and triple product. Most vector questions are easy **once you know which tool the question is asking for**, and hard only when you guess. This lesson is about recognising the question.",
    },
    {
      type: "text",
      content:
        "Each product answers one kind of geometric question:\n\n**Dot** measures how much two vectors agree in direction, so it answers questions about angles and shadows.\n\n**Cross** measures how much they disagree (the area they sweep out) and gives the direction perpendicular to both.\n\n**Triple** measures how much three vectors fill space.",
    },
    {
      type: "table",
      headers: ["The question asks for…", "Reach for", "Formula"],
      rows: [
        ["Length, distance between two points", "Magnitude", "$|\\overrightarrow{AB}| = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$"],
        ["Angle between two vectors", "Dot", "$\\cos\\theta = \\dfrac{\\vec a\\cdot\\vec b}{|\\vec a||\\vec b|}$"],
        ["Are they perpendicular?", "Dot", "$\\vec a\\cdot\\vec b = 0$"],
        ["Projection, component along a direction", "Dot", "$\\vec a\\cdot\\hat b$"],
        ["Work done by a force", "Dot", "$W = \\vec F\\cdot\\vec d$"],
        ["Area of a parallelogram / triangle", "Cross", "$|\\vec a\\times\\vec b|$, $\\tfrac12|\\vec a\\times\\vec b|$"],
        ["A vector perpendicular to two given vectors", "Cross", "$\\vec a\\times\\vec b$"],
        ["Are they parallel?", "Cross", "$\\vec a\\times\\vec b = \\vec 0$"],
        ["Torque (moment) of a force", "Cross", "$\\vec\\tau = \\vec r\\times\\vec F$"],
        ["Volume of a box / tetrahedron", "Triple", "$|[\\vec a\\;\\vec b\\;\\vec c]|$, $\\tfrac16|[\\vec a\\;\\vec b\\;\\vec c]|$"],
        ["Are three vectors / four points coplanar?", "Triple", "$[\\vec a\\;\\vec b\\;\\vec c] = 0$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Two quick reflexes",
      content:
        "The word **perpendicular** asks for a dot product when it is a *test* (is this 90°?) and a cross product when it is a *construction* (find a vector at 90° to both). The word **parallel** is the reverse: test with cross ($=\\vec 0$), construct with scalar multiples.",
    },
    {
      type: "text",
      content:
        "Real problems chain the tools. Here are three chains you will meet again and again.",
    },
    {
      type: "text",
      content:
        "**Chain 1: height of a triangle from its area.** Triangle $A(1, 1, 1)$, $B(1, 2, 3)$, $C(2, 3, 1)$. Find the height from $C$ to side $AB$.\n\n**Step 1 (cross, for area).** $\\overrightarrow{AB} = (0, 1, 2)$, $\\overrightarrow{AC} = (1, 2, 0)$. $\\overrightarrow{AB}\\times\\overrightarrow{AC} = (1\\cdot 0 - 2\\cdot 2,\\; 2\\cdot 1 - 0\\cdot 0,\\; 0\\cdot 2 - 1\\cdot 1) = (-4, 2, -1)$, of length $\\sqrt{21}$. Area $= \\tfrac12\\sqrt{21}$.\n\n**Step 2 (magnitude, for the base).** $|\\overrightarrow{AB}| = \\sqrt5$.\n\n**Step 3 (area = ½ base × height).** $h = \\dfrac{2\\cdot\\text{Area}}{|\\overrightarrow{AB}|} = \\dfrac{\\sqrt{21}}{\\sqrt5} = \\sqrt{\\tfrac{21}{5}} \\approx 2.05$.",
    },
    {
      type: "text",
      content:
        "**Worked example (application): a tilted solar panel.** A triangular solar panel has corners $A(0, 0, 0)$, $B(4, 0, 0)$, $C(0, 3, 3)$ (metres, $z$ pointing up). Find (a) its area, (b) a unit normal, (c) the angle the panel makes with the horizontal ground.\n\n**Step 1 (cross: area and normal together).** $\\overrightarrow{AB} = (4, 0, 0)$, $\\overrightarrow{AC} = (0, 3, 3)$.",
    },
    {
      type: "math",
      latex:
        "\\overrightarrow{AB}\\times\\overrightarrow{AC} = (0\\cdot 3 - 0\\cdot 3,\\; 0\\cdot 0 - 4\\cdot 3,\\; 4\\cdot 3 - 0\\cdot 0) = (0, -12, 12)",
    },
    {
      type: "text",
      content:
        "*Why this step:* the questions \"area\" and \"perpendicular direction\" both point to the cross product, and one computation answers both.\n\n**Step 2 (magnitude: area).** $|(0, -12, 12)| = 12\\sqrt2$, so the area is $\\tfrac12\\cdot 12\\sqrt2 = 6\\sqrt2 \\approx 8.49\\ \\text{m}^2$.\n\n**Step 3 (unit normal).** $\\hat n = \\dfrac{(0, -12, 12)}{12\\sqrt2} = \\dfrac{1}{\\sqrt2}(0, -1, 1)$.\n\n**Step 4 (dot: the tilt).** The angle between two planes equals the angle between their normals. The ground's normal is $\\hat k$, so $\\cos\\theta = \\hat n\\cdot\\hat k = \\tfrac{1}{\\sqrt2}$ and $\\theta = 45^\\circ$.\n*Why this step:* \"angle\" is a dot-product word, but it needs *directions*, so we first built the normal with a cross. Chaining cross then dot is the everyday pattern.\n\n**Check.** Edge $AC$ climbs 3 m while moving 3 m horizontally, a $45^\\circ$ slope, and $AB$ is level, so the panel does tilt at $45^\\circ$.",
    },
    {
      type: "text",
      content:
        "**Chain 2: distance from a point to a line.** The parallelogram on $\\overrightarrow{AP}$ and a unit vector $\\hat d$ along the line has base 1, so its area *is* its height, which is the distance from $P$ to the line.",
    },
    {
      type: "math",
      latex: "\\text{dist}(P, \\text{line}) = |\\overrightarrow{AP}\\times\\hat d| = \\frac{|\\overrightarrow{AP}\\times\\vec d|}{|\\vec d|}",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "dot",
        a: [5, 0],
        b: [3, 4],
        draggable: ["a", "b"],
        showProjection: true,
        showPerpendicular: true,
        readouts: ["dot", "projection", "angle"],
        labels: { a: "\\vec d", b: "\\overrightarrow{AP}" },
        caption:
          "The line runs along d; the point P is the tip of AP. The perpendicular part of AP is the distance from P to the line; here it is 4 = |AP × d̂| = |3·0 − 4·5|/5. Drag P and watch the perpendicular readout.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example.** Distance from $P(2, 3, 4)$ to the line through $A(1, 0, 0)$ with direction $\\vec d = (1, 2, 2)$.\n\n**Step 1.** $\\overrightarrow{AP} = (1, 3, 4)$, $|\\vec d| = 3$.\n\n**Step 2.** $\\overrightarrow{AP}\\times\\vec d = (3\\cdot 2 - 4\\cdot 2,\\; 4\\cdot 1 - 1\\cdot 2,\\; 1\\cdot 2 - 3\\cdot 1) = (-2, 2, -1)$, length 3.\n\n**Step 3.** Distance $= 3/3 = 1$.\n\n**Cross-check with dot and Pythagoras.** The projection of $\\overrightarrow{AP}$ on the line is $\\overrightarrow{AP}\\cdot\\hat d = (1 + 6 + 8)/3 = 5$, and $|\\overrightarrow{AP}|^2 = 26$. The perpendicular part is $\\sqrt{26 - 25} = 1$. Two tools, one answer.",
    },
    {
      type: "text",
      content:
        "**Chain 3 (preview of 3D geometry): shortest distance between skew lines.** Lines $\\vec r = \\vec b_1 + s\\vec d_1$ and $\\vec r = \\vec b_2 + t\\vec d_2$ that neither meet nor are parallel. The common perpendicular points along $\\vec d_1\\times\\vec d_2$ (cross, for the normal). The gap is the projection of $\\vec b_2 - \\vec b_1$ on that normal (dot). Together, a triple product divided by an area:",
    },
    {
      type: "math",
      latex: "d = \\frac{\\big|[\\,\\vec b_2 - \\vec b_1\\;\\;\\vec d_1\\;\\;\\vec d_2\\,]\\big|}{|\\vec d_1\\times\\vec d_2|}",
    },
    {
      type: "text",
      content:
        "**Sanity check.** The $x$-axis ($\\vec b_1 = \\vec 0$, $\\vec d_1 = \\hat i$) and the line through $(0, 0, 3)$ along $\\hat j$. Then $\\vec d_1\\times\\vec d_2 = \\hat k$ and $[3\\hat k\\;\\hat i\\;\\hat j] = 3$, so $d = 3$: the second line runs 3 units above the first, as expected.\n\n**A real one.** $\\vec b_1 = \\vec 0$, $\\vec d_1 = (1, 1, 0)$; $\\vec b_2 = (1, 0, 1)$, $\\vec d_2 = (0, 1, 1)$. $\\vec d_1\\times\\vec d_2 = (1, -1, 1)$, length $\\sqrt3$. $(1, 0, 1)\\cdot(1, -1, 1) = 2$. So $d = 2/\\sqrt3$.\n\n**When the triple product is 0.** Then $\\vec b_2 - \\vec b_1$, $\\vec d_1$, $\\vec d_2$ are coplanar, so the two lines lie in one plane: they intersect (or are parallel), and the shortest distance between intersecting lines is 0. So $[\\,\\vec b_2 - \\vec b_1\\;\\;\\vec d_1\\;\\;\\vec d_2\\,] = 0$ is the test for two lines being coplanar.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam style, NCERT/CBSE).** Find the shortest distance between the lines $\\vec r = (\\hat i + 2\\hat j + \\hat k) + \\lambda(\\hat i - \\hat j + \\hat k)$ and $\\vec r = (2\\hat i - \\hat j - \\hat k) + \\mu(2\\hat i + \\hat j + 2\\hat k)$.\n\n**Step 1 (read off the data).** $\\vec b_1 = (1, 2, 1)$, $\\vec d_1 = (1, -1, 1)$; $\\vec b_2 = (2, -1, -1)$, $\\vec d_2 = (2, 1, 2)$. So $\\vec b_2 - \\vec b_1 = (1, -3, -2)$.\n*Why this step:* the directions $\\vec d_1, \\vec d_2$ are not parallel, so the lines are either intersecting or skew and the triple-product formula applies.\n\n**Step 2 (cross: the common normal).**",
    },
    {
      type: "math",
      latex:
        "\\vec d_1\\times\\vec d_2 = \\big((-1)(2) - (1)(1),\\; (1)(2) - (1)(2),\\; (1)(1) - (-1)(2)\\big) = (-3, 0, 3),\\qquad |\\vec d_1\\times\\vec d_2| = 3\\sqrt2",
    },
    {
      type: "text",
      content:
        "**Step 3 (dot: project the gap onto the normal).** $(\\vec b_2 - \\vec b_1)\\cdot(\\vec d_1\\times\\vec d_2) = (1)(-3) + (-3)(0) + (-2)(3) = -9$.\n*Why this step:* only the part of the gap along the common perpendicular is the shortest distance; sliding along either line changes the rest.\n\n**Step 4 (divide).** $d = \\dfrac{|-9|}{3\\sqrt2} = \\dfrac{3}{\\sqrt2} = \\dfrac{3\\sqrt2}{2} \\approx 2.12$ units.\n\n**Verdict.** $d \\neq 0$, so the lines are skew: they neither meet nor run parallel.",
    },
    {
      type: "text",
      content:
        "**Physics, briefly.** A force $\\vec F = (2, 1, 3)$ N moving a body through $\\vec d = (1, -1, 2)$ m does work $\\vec F\\cdot\\vec d = 2 - 1 + 6 = 7$ J (dot: only the part of the force along the motion counts). A force $\\vec F = 2\\hat j$ N applied at $\\vec r = \\hat i$ m has torque $\\vec r\\times\\vec F = 2\\hat k$ N·m about the origin (cross: turning effect, with an axis).",
    },
    {
      type: "text",
      content:
        "**Worked example (application): opening a door is a triple product.** A door is hinged along the $z$-axis. Its handle is at $\\vec r = (0.8, 0, 1)$ m from the origin (a point on the hinge line), and you push with $\\vec F = (0, 20, 0)$ N. How much of your effort actually turns the door?\n\n**Step 1 (cross: torque about the origin).**",
    },
    {
      type: "math",
      latex:
        "\\vec r\\times\\vec F = (0\\cdot 0 - 1\\cdot 20,\\; 1\\cdot 0 - 0.8\\cdot 0,\\; 0.8\\cdot 20 - 0\\cdot 0) = (-20,\\; 0,\\; 16)\\ \\text{N}\\cdot\\text{m}",
    },
    {
      type: "text",
      content:
        "*Why this step:* \"turning effect\" is a cross-product word, so we start with the torque about a point on the axis.\n\n**Step 2 (dot: keep only the part along the hinge).** The door can only rotate about $\\hat k$, so the useful part is $\\hat k\\cdot(\\vec r\\times\\vec F) = [\\hat k\\;\\vec r\\;\\vec F] = 16$ N·m.\n*Why this step:* the $-20$ N·m part of the torque tries to twist the door about the $x$-axis. The hinges resist it and it does nothing to open the door.\n\n**Step 3 (interpret).** The moment of a force about an **axis** with unit direction $\\hat n$ is the triple product $[\\hat n\\;\\vec r\\;\\vec F]$: the volume of the box on the axis, the lever arm and the force. It is zero when the three are coplanar. Try lifting the handle straight up, $\\vec F = (0, 0, 20)$: then $\\vec r\\times\\vec F = (0, -16, 0)$ and $[\\hat k\\;\\vec r\\;\\vec F] = 0$. The force is in the plane of the door and the hinge, and no amount of lifting opens it.",
    },
    {
      type: "quiz",
      id: "va5-4-q1",
      variant: "concept",
      question: "You need the angle between the two diagonals of a parallelogram. Which product do you use?",
      options: [
        { text: "Dot product of the diagonal vectors", correct: true, feedback: "Angles come from $\\cos\\theta = \\dfrac{\\vec p\\cdot\\vec q}{|\\vec p||\\vec q|}$." },
        { text: "Cross product of the diagonal vectors", feedback: "The cross gives $\\sin\\theta$ via its length, which cannot tell $\\theta$ from $180^\\circ - \\theta$. Dot is the angle tool." },
        { text: "Triple product", feedback: "Triple products need three vectors and measure volume." },
      ],
    },
    {
      type: "quiz",
      id: "va5-4-q2",
      variant: "concept",
      question: "Which question is answered by a scalar triple product?",
      options: [
        { text: "Do the points $A, B, C, D$ lie in one plane?", correct: true, feedback: "Coplanarity is zero volume: $[\\overrightarrow{AB}\\;\\overrightarrow{AC}\\;\\overrightarrow{AD}] = 0$." },
        { text: "What is the area of triangle $ABC$?", feedback: "Area is a cross product: $\\tfrac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$." },
        { text: "Is $\\overrightarrow{AB}$ perpendicular to $\\overrightarrow{CD}$?", feedback: "A perpendicularity test is a dot product." },
        { text: "How far apart are $A$ and $B$?", feedback: "Distance between points is a magnitude." },
      ],
    },
    {
      type: "quiz",
      id: "va5-4-q3",
      variant: "concept",
      question: "Find a vector perpendicular to both $\\vec a$ and $\\vec b$. Which tool?",
      options: [
        { text: "$\\vec a\\times\\vec b$", correct: true, feedback: "Constructing a common perpendicular is exactly what the cross product does." },
        { text: "$\\vec a\\cdot\\vec b$", feedback: "That is a number, not a vector; it tests perpendicularity rather than constructing it." },
        { text: "$\\vec a + \\vec b$", feedback: "The sum lies in the plane of $\\vec a$ and $\\vec b$, not perpendicular to it." },
      ],
    },
    {
      type: "quiz",
      id: "va5-4-q4",
      variant: "practice",
      question: "What is the distance from $P(3, 4, 7)$ to the $z$-axis?",
      options: [
        { text: "$5$", correct: true, feedback: "$\\overrightarrow{OP}\\times\\hat k = (4, -3, 0)$, length 5. Geometrically, only the $x$ and $y$ parts are off the axis: $\\sqrt{9 + 16}$." },
        { text: "$7$", feedback: "That is the height along the axis, the part that does *not* count." },
        { text: "$\\sqrt{74}$", feedback: "That is the distance from the origin, not from the axis." },
        { text: "$\\sqrt{65}$", feedback: "Use $\\sqrt{x^2 + y^2}$ for distance from the $z$-axis." },
      ],
      hint: "Use $|\\overrightarrow{AP}\\times\\hat d|$ with $A$ at the origin and $\\hat d = \\hat k$.",
    },
    {
      type: "quiz",
      id: "va5-4-q5",
      variant: "practice",
      question:
        "Triangle $ABC$ has area 6 and $|\\overrightarrow{AB}| = 4$. What is the perpendicular distance from $C$ to line $AB$?",
      options: [
        { text: "$3$", correct: true, feedback: "$\\text{Area} = \\tfrac12\\cdot\\text{base}\\cdot h$, so $h = 2\\cdot 6/4 = 3$." },
        { text: "$1.5$", feedback: "You forgot the factor 2: the triangle is half the parallelogram." },
        { text: "$24$", feedback: "Divide by the base, don't multiply." },
      ],
    },
    {
      type: "quiz",
      id: "va5-4-q6",
      variant: "concept",
      question: "A force $\\vec F$ moves a trolley through a displacement $\\vec d$. Which expression gives the work done?",
      options: [
        { text: "$\\vec F\\cdot\\vec d$", correct: true, feedback: "Work counts only the part of the force along the motion, which is exactly what a dot product measures. The answer is a scalar, in joules." },
        { text: "$\\vec F\\times\\vec d$", feedback: "That is a vector. Work is a scalar, so it cannot be a cross product." },
        { text: "$|\\vec F\\times\\vec d|$", feedback: "This measures the part of $\\vec F$ perpendicular to the motion, and that part does no work." },
        { text: "$\\vec r\\times\\vec F$", feedback: "That is torque, the turning effect about a point, with $\\vec r$ the lever arm." },
      ],
    },
    {
      type: "quiz",
      id: "va5-4-q7",
      variant: "practice",
      question: "Find the distance from $P(1, 2, 3)$ to the line through the origin with direction $\\vec d = (1, 1, 1)$.",
      options: [
        { text: "$\\sqrt2$", correct: true, feedback: "$\\overrightarrow{OP}\\times\\vec d = (2 - 3,\\; 3 - 1,\\; 1 - 2) = (-1, 2, -1)$, length $\\sqrt6$. Divide by $|\\vec d| = \\sqrt3$: $\\sqrt6/\\sqrt3 = \\sqrt2$. Check: projection $6/\\sqrt3$, and $14 - 12 = 2$." },
        { text: "$\\sqrt6$", feedback: "That is $|\\overrightarrow{OP}\\times\\vec d|$. The direction $(1, 1, 1)$ is not a unit vector, so divide by $|\\vec d| = \\sqrt3$." },
        { text: "$2\\sqrt3$", feedback: "That is $\\overrightarrow{OP}\\cdot\\hat d$, the part of $\\overrightarrow{OP}$ *along* the line. The distance is the perpendicular part." },
        { text: "$\\sqrt{14}$", feedback: "That is the distance from $P$ to the origin, not to the line." },
      ],
      hint: "$\\text{dist} = \\dfrac{|\\overrightarrow{AP}\\times\\vec d|}{|\\vec d|}$ with $A$ at the origin.",
    },
    {
      type: "quiz",
      id: "va5-4-q8",
      variant: "practice",
      question:
        "Find the shortest distance between the lines $\\vec r = s(1, 1, 0)$ and $\\vec r = (1, 4, 0) + t(0, 1, 1)$.",
      options: [
        { text: "$\\sqrt3$", correct: true, feedback: "$\\vec d_1\\times\\vec d_2 = (1, -1, 1)$, length $\\sqrt3$. $[\\,\\vec b_2 - \\vec b_1\\;\\;\\vec d_1\\;\\;\\vec d_2\\,] = (1, 4, 0)\\cdot(1, -1, 1) = -3$. So $d = |-3|/\\sqrt3 = \\sqrt3$." },
        { text: "$3$", feedback: "That is the size of the triple product, a volume. Divide by the base area $|\\vec d_1\\times\\vec d_2| = \\sqrt3$ to get the height." },
        { text: "$-\\sqrt3$", feedback: "A distance cannot be negative. The formula takes the absolute value of the triple product." },
        { text: "$1/\\sqrt3$", feedback: "You divided by $|\\vec d_1\\times\\vec d_2|^2 = 3$. Divide by the length $\\sqrt3$ only once." },
      ],
      hint: "$d = \\dfrac{|[\\,\\vec b_2 - \\vec b_1\\;\\;\\vec d_1\\;\\;\\vec d_2\\,]|}{|\\vec d_1\\times\\vec d_2|}$. The directions are the same pair as in the worked example.",
    },
    {
      type: "quiz",
      id: "va5-4-q9",
      variant: "practice",
      question:
        "A triangular awning has corners $A(0, 0, 0)$, $B(2, 0, 0)$, $C(0, 2, 2)$ (metres). What is its area?",
      options: [
        { text: "$2\\sqrt2\\ \\text{m}^2$", correct: true, feedback: "$\\overrightarrow{AB}\\times\\overrightarrow{AC} = (0, -4, 4)$, of length $4\\sqrt2$. The triangle is half of that: $2\\sqrt2$." },
        { text: "$4\\sqrt2\\ \\text{m}^2$", feedback: "That is the parallelogram. A triangle is half of it." },
        { text: "$2\\ \\text{m}^2$", feedback: "That would be the area of its shadow on the ground ($\\tfrac12\\cdot 2\\cdot 2$). The awning is tilted, so it is larger." },
        { text: "$4\\ \\text{m}^2$", feedback: "Take the length of the cross product, $\\sqrt{0 + 16 + 16} = 4\\sqrt2$, then halve it." },
      ],
      hint: "Area of triangle $= \\tfrac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$.",
    },
    {
      type: "quiz",
      id: "va5-4-q10",
      variant: "practice",
      question:
        "Find the shortest distance between the lines $\\vec r = s(1, 0, 0)$ and $\\vec r = (0, 1, 2) + t(0, 1, 1)$.",
      options: [
        { text: "$\\dfrac{1}{\\sqrt2}$", correct: true, feedback: "$\\vec d_1\\times\\vec d_2 = (0, -1, 1)$, length $\\sqrt2$. $(0, 1, 2)\\cdot(0, -1, 1) = 1$. So $d = 1/\\sqrt2$." },
        { text: "$1$", feedback: "That is the triple product, a volume. Divide by the base area $|\\vec d_1\\times\\vec d_2| = \\sqrt2$." },
        { text: "$\\sqrt5$", feedback: "That is the distance between the two given points $\\vec b_1$ and $\\vec b_2$, not between the lines. Only the part of the gap along the common normal counts." },
        { text: "$\\dfrac{3}{\\sqrt2}$", feedback: "You projected the gap onto $\\vec d_2$. Project it onto the common normal $\\vec d_1\\times\\vec d_2$ instead." },
      ],
      hint: "$d = \\dfrac{|[\\,\\vec b_2 - \\vec b_1\\;\\;\\vec d_1\\;\\;\\vec d_2\\,]|}{|\\vec d_1\\times\\vec d_2|}$.",
    },
    {
      type: "quiz",
      id: "va5-4-q11",
      variant: "practice",
      question:
        "A gate is hinged along the $z$-axis. A force $\\vec F = (0, 30, 5)$ N acts at $\\vec r = (0.5, 0, 2)$ m. What is the moment of the force about the hinge axis?",
      options: [
        { text: "$15$ N·m", correct: true, feedback: "$\\vec r\\times\\vec F = (0\\cdot 5 - 2\\cdot 30,\\; 2\\cdot 0 - 0.5\\cdot 5,\\; 0.5\\cdot 30 - 0) = (-60, -2.5, 15)$. The part along $\\hat k$ is $[\\hat k\\;\\vec r\\;\\vec F] = 15$." },
        { text: "$\\approx 61.9$ N·m", feedback: "That is $|\\vec r\\times\\vec F|$, the full torque about the origin. Only its component along the hinge turns the gate." },
        { text: "$60$ N·m", feedback: "That is the size of the $x$-component, which twists the gate against its hinges. The hinge axis is $\\hat k$." },
        { text: "$17.5$ N·m", feedback: "The $5$ N vertical part of the force is parallel to the hinge and has no moment about it. Only $0.5\\times 30$ counts." },
      ],
      hint: "Moment about an axis $\\hat n$ through the origin is $\\hat n\\cdot(\\vec r\\times\\vec F)$.",
    },
    {
      type: "quiz",
      id: "va5-4-q12",
      variant: "practice",
      question:
        "A constant force $\\vec F = (3, -1, 2)$ N moves a particle from $A(1, 1, 0)$ to $B(3, 2, 4)$ (metres). How much work does it do?",
      options: [
        { text: "$13$ J", correct: true, feedback: "Displacement $\\overrightarrow{AB} = (2, 1, 4)$, and $W = \\vec F\\cdot\\overrightarrow{AB} = 6 - 1 + 8 = 13$ J." },
        { text: "$15$ J", feedback: "You dotted $\\vec F$ with the position vector of $B$. Work uses the displacement $\\overrightarrow{AB} = B - A$." },
        { text: "$5\\sqrt5$ J", feedback: "That is $|\\vec F\\times\\overrightarrow{AB}|$. Work is a dot product: only the part of the force along the motion counts." },
        { text: "$7\\sqrt6$ J", feedback: "That is $|\\vec F|\\,|\\overrightarrow{AB}|$, which assumes the force points exactly along the motion. It does not." },
      ],
      hint: "Find the displacement first, then dot it with the force.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "vector-geometry-workshop",
  title: "5.5 · Vector Geometry Workshop",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Classical geometry proofs often need clever constructions: extra lines, congruent triangles, similar triangles. With vectors, many of them become **two or three lines of algebra**. The recipe is always the same:\n\n**1.** Put the origin at a convenient point and name a few vectors.\n\n**2.** Write every side or diagonal as a sum or difference of them.\n\n**3.** Translate the geometric claim (a length, a right angle, parallel lines) into a dot or cross statement, and expand.",
    },
    {
      type: "text",
      content:
        "**Proof 1: the cosine rule.** Triangle with vertex $C$ at the origin, $\\overrightarrow{CA} = \\vec a$, $\\overrightarrow{CB} = \\vec b$, angle $C$ between them. The third side is $\\overrightarrow{BA} = \\vec a - \\vec b$.\n\n**Step 1.** $|\\vec a - \\vec b|^2 = (\\vec a - \\vec b)\\cdot(\\vec a - \\vec b)$.\n\n**Step 2.** Expand: $= \\vec a\\cdot\\vec a - 2\\,\\vec a\\cdot\\vec b + \\vec b\\cdot\\vec b$.\n\n**Step 3.** Switch from vectors to lengths. Write $a = |\\vec a| = CA$, $b = |\\vec b| = CB$ and $c = |\\vec a - \\vec b| = AB$. Then $\\vec a\\cdot\\vec a = a^2$, $\\vec b\\cdot\\vec b = b^2$ and $\\vec a\\cdot\\vec b = ab\\cos C$, so:",
    },
    {
      type: "math",
      latex: "c^2 = a^2 + b^2 - 2ab\\cos C",
    },
    {
      type: "text",
      content:
        "From here on $a$, $b$, $c$ are plain lengths, not vectors. In textbook triangle notation the side opposite $A$ is called $a$, so our $a = CA$ would be named $b$ there. It makes no difference: the formula is symmetric in $a$ and $b$, so swapping their labels gives the same rule.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "subtract",
        a: [4, 1],
        b: [1, 3],
        draggable: ["a", "b"],
        readouts: ["components", "magnitude"],
        caption:
          "The difference a − b closes the triangle. Drag either tip: the cosine rule c² = a² + b² − 2ab cos C always matches |a − b|².",
      },
    },
    {
      type: "text",
      content:
        "**Proof 2: the diagonals of a rhombus are perpendicular.** (You first met this in Lesson 3.4; here it is again as part of the toolkit.) A parallelogram with sides $\\vec a$ and $\\vec b$ from one corner has diagonals $\\vec a + \\vec b$ and $\\vec a - \\vec b$.\n\n**Step 1.** $(\\vec a + \\vec b)\\cdot(\\vec a - \\vec b) = |\\vec a|^2 - \\vec a\\cdot\\vec b + \\vec b\\cdot\\vec a - |\\vec b|^2 = |\\vec a|^2 - |\\vec b|^2$.\n\n**Step 2.** In a rhombus $|\\vec a| = |\\vec b|$, so the dot is 0: the diagonals are perpendicular.\n\n**Bonus.** The same line proves the converse: a parallelogram with perpendicular diagonals must have equal sides, so it is a rhombus.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "dot",
        a: [8, 4],
        b: [-2, 4],
        draggable: ["a", "b"],
        showProjection: false,
        window: { xmin: -4, xmax: 9, ymin: -3, ymax: 6 },
        readouts: ["dot", "angle"],
        labels: { a: "\\vec a+\\vec b", b: "\\vec a-\\vec b" },
        caption:
          "The rhombus with sides a = (3, 4) and b = (5, 0), both of length 5, has diagonals a + b = (8, 4) and a − b = (−2, 4). Their dot product is 8·(−2) + 4·4 = 0 and the angle readout shows 90°. Drag either tip to see that a general pair of diagonals is not perpendicular.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example (routine): the angle in a semicircle is a right angle.** You proved this in Lesson 3.5; redo it here without looking back, because it is the same one-line trick as the rhombus.\n\n**Step 1 (set up).** Put the origin at the centre $O$ of a circle of radius $r$. Let the diameter be $AB$ with $\\overrightarrow{OA} = \\vec a$ and $\\overrightarrow{OB} = -\\vec a$, and let $P$ be any other point on the circle, $\\overrightarrow{OP} = \\vec p$.\n*Why this step:* with the origin at the centre, \"on the circle\" becomes the simple statement $|\\vec p| = |\\vec a| = r$.\n\n**Step 2 (write the two chords).** $\\overrightarrow{PA} = \\vec a - \\vec p$ and $\\overrightarrow{PB} = -\\vec a - \\vec p$.\n\n**Step 3 (dot and expand).**",
    },
    {
      type: "math",
      latex:
        "\\overrightarrow{PA}\\cdot\\overrightarrow{PB} = (\\vec a - \\vec p)\\cdot(-\\vec a - \\vec p) = -|\\vec a|^2 - \\vec a\\cdot\\vec p + \\vec p\\cdot\\vec a + |\\vec p|^2 = |\\vec p|^2 - |\\vec a|^2 = r^2 - r^2 = 0",
    },
    {
      type: "text",
      content:
        "**Step 4 (conclude).** The dot is 0, so $\\angle APB = 90^\\circ$ wherever $P$ sits on the circle. Notice this is the rhombus computation in disguise: $\\overrightarrow{PA}$ and $\\overrightarrow{PB}$ are the diagonals of the parallelogram with sides $\\vec a$ and $-\\vec p$, which have equal lengths.",
    },
    {
      type: "text",
      content:
        "**Proof 3: Apollonius' theorem (median length).** Triangle $ABC$ with $A$ at the origin, $\\overrightarrow{AB} = \\vec b$, $\\overrightarrow{AC} = \\vec c$. The midpoint of $BC$ is $M = \\tfrac12(\\vec b + \\vec c)$ by the section formula.\n\n**Step 1.** Add the two expansions $|\\vec b + \\vec c|^2 = b^2 + 2\\,\\vec b\\cdot\\vec c + c^2$ and $|\\vec b - \\vec c|^2 = b^2 - 2\\,\\vec b\\cdot\\vec c + c^2$. The dot terms cancel: $|\\vec b + \\vec c|^2 + |\\vec b - \\vec c|^2 = 2b^2 + 2c^2$ (the parallelogram law).\n\n**Step 2.** Now $|\\vec b + \\vec c| = 2AM$ and $|\\vec b - \\vec c| = BC = 2BM$. So $4AM^2 + 4BM^2 = 2AB^2 + 2AC^2$:",
    },
    {
      type: "math",
      latex: "AB^2 + AC^2 = 2\\,AM^2 + 2\\,BM^2",
    },
    {
      type: "text",
      content:
        "**Numerical use.** $AB = 7$, $AC = 5$, $BC = 8$. Then $AM^2 = \\dfrac{2\\cdot 49 + 2\\cdot 25 - 64}{4} = \\dfrac{84}{4} = 21$, so the median $AM = \\sqrt{21}$.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam style, a CBSE favourite): the midpoint parallelogram.** (This is Varignon's theorem from Lesson 2.5, written the way a board answer expects.) Prove that the midpoints of the sides of **any** quadrilateral $ABCD$ are the vertices of a parallelogram.\n\n**Step 1 (name position vectors).** Let $A, B, C, D$ have position vectors $\\vec a, \\vec b, \\vec c, \\vec d$, and let $P, Q, R, S$ be the midpoints of $AB, BC, CD, DA$. By the section formula,\n$\\vec p = \\tfrac12(\\vec a + \\vec b)$, $\\vec q = \\tfrac12(\\vec b + \\vec c)$, $\\vec r = \\tfrac12(\\vec c + \\vec d)$, $\\vec s = \\tfrac12(\\vec d + \\vec a)$.\n*Why this step:* a general quadrilateral has no convenient corner, so we use a free origin and let the algebra do the work.\n\n**Step 2 (write two opposite sides).**",
    },
    {
      type: "math",
      latex:
        "\\overrightarrow{PQ} = \\vec q - \\vec p = \\tfrac12(\\vec c - \\vec a),\\qquad \\overrightarrow{SR} = \\vec r - \\vec s = \\tfrac12(\\vec c - \\vec a)",
    },
    {
      type: "text",
      content:
        "**Step 3 (conclude).** $\\overrightarrow{PQ} = \\overrightarrow{SR}$, so $PQ$ and $SR$ are equal in length **and** parallel. A quadrilateral with one pair of opposite sides equal and parallel is a parallelogram.\n*Why this step:* equality of vectors carries both facts at once, length and direction, which is exactly what the classical proof needs two congruent triangles to establish.\n\n**Bonus.** Both sides equal half the diagonal $\\overrightarrow{AC}$, and the proof never used a plane: it works even for a \"skew\" quadrilateral whose four corners are not coplanar.\n\n**Numeric check.** $A(0, 0, 0)$, $B(4, 0, 0)$, $C(6, 4, 0)$, $D(0, 2, 0)$ give $P(2, 0, 0)$, $Q(5, 2, 0)$, $R(3, 3, 0)$, $S(0, 1, 0)$. Then $\\overrightarrow{PQ} = (3, 2, 0) = \\overrightarrow{SR}$, and $\\tfrac12\\overrightarrow{AC} = (3, 2, 0)$ too.",
    },
    {
      type: "text",
      content:
        "**Proof 4: the angle bisector direction.** $\\hat a$ and $\\hat b$ both have length 1, so the parallelogram they span is a rhombus. The diagonal of a rhombus bisects its angle (its two halves are congruent triangles with sides $1, 1$ and the shared diagonal). Therefore:",
    },
    {
      type: "math",
      latex: "\\hat a + \\hat b \\;\\text{ is along the internal bisector of the angle between } \\vec a \\text{ and } \\vec b,\\qquad \\hat a - \\hat b \\;\\text{ along the external bisector.}",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "add",
        a: [3, 4],
        b: [5, 0],
        draggable: ["a", "b"],
        showParallelogram: true,
        window: { xmin: -2, xmax: 9, ymin: -3, ymax: 6 },
        readouts: ["components", "magnitude", "sum"],
        caption:
          "Here |a| = |b| = 5, so the parallelogram is a rhombus and its diagonal a + b = (8, 4) bisects the angle between the sides. Drag b to break the equal lengths and watch the diagonal drift off the bisector. Unit vectors â and b̂ always give equal lengths, which is why â + b̂ always bisects.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example.** $\\vec a = (3, 4)$, $\\vec b = (2, 0)$.\n\n**Step 1.** $\\hat a = (0.6, 0.8)$, $\\hat b = (1, 0)$.\n\n**Step 2.** $\\hat a + \\hat b = (1.6, 0.8)$, which points along $(2, 1)$.\n\n**Step 3 (check).** $\\vec a$ makes $\\tan^{-1}\\tfrac43 \\approx 53.13^\\circ$ with the $x$-axis, and $(2, 1)$ makes $\\tan^{-1}\\tfrac12 \\approx 26.57^\\circ$, exactly half. By contrast $\\vec a + \\vec b = (5, 4)$ makes $38.66^\\circ$: not the bisector, because $|\\vec a| \\neq |\\vec b|$.",
    },
    {
      type: "text",
      content:
        "**Worked example (application): a path that splits a corner evenly.** Two straight garden walls leave a gate at the origin along $\\vec a = (3, 4)$ and $\\vec b = (12, 5)$ (metres). The gardener wants a path from the gate that makes equal angles with both walls. Which direction?\n\n**Step 1 (normalise).** $|\\vec a| = 5$ and $|\\vec b| = 13$, so $\\hat a = \\left(\\tfrac35, \\tfrac45\\right)$ and $\\hat b = \\left(\\tfrac{12}{13}, \\tfrac{5}{13}\\right)$.\n*Why this step:* the walls have different lengths, so $\\vec a + \\vec b$ would lean toward the longer wall. Unit vectors make the parallelogram a rhombus.\n\n**Step 2 (add).** $\\hat a + \\hat b = \\left(\\tfrac{39 + 60}{65}, \\tfrac{52 + 25}{65}\\right) = \\tfrac{1}{65}(99, 77) = \\tfrac{11}{65}(9, 7)$. The path runs along $(9, 7)$.\n\n**Step 3 (check the angles).** $\\vec a$ makes $\\tan^{-1}\\tfrac43 \\approx 53.13^\\circ$ with the $x$-axis and $\\vec b$ makes $\\tan^{-1}\\tfrac{5}{12} \\approx 22.62^\\circ$. Their average is $37.87^\\circ$, and $\\tan^{-1}\\tfrac79 \\approx 37.87^\\circ$. Equal angles of about $15.3^\\circ$ with each wall.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam style, 3D).** Find a unit vector along the internal bisector of the angle between $\\vec a = 2\\hat i + \\hat j - 2\\hat k$ and $\\vec b = 3\\hat j + 4\\hat k$.\n\n**Step 1 (lengths).** $|\\vec a| = \\sqrt{4 + 1 + 4} = 3$, $|\\vec b| = \\sqrt{9 + 16} = 5$.\n\n**Step 2 (add the unit vectors over a common denominator).**",
    },
    {
      type: "math",
      latex:
        "\\hat a + \\hat b = \\tfrac13(2, 1, -2) + \\tfrac15(0, 3, 4) = \\tfrac{1}{15}(10,\\; 5 + 9,\\; -10 + 12) = \\tfrac{1}{15}(10, 14, 2) = \\tfrac{2}{15}(5, 7, 1)",
    },
    {
      type: "text",
      content:
        "**Step 3 (normalise the answer).** $|(5, 7, 1)| = \\sqrt{25 + 49 + 1} = \\sqrt{75} = 5\\sqrt3$, so the unit bisector is $\\dfrac{1}{5\\sqrt3}(5\\hat i + 7\\hat j + \\hat k)$.\n*Why this step:* $\\hat a + \\hat b$ has the right direction but is not itself a unit vector (its length is $2\\cos\\tfrac{\\theta}{2}$), and the question asks for one.\n\n**Check (equal angles).** Let $\\vec w = (5, 7, 1)$. $\\vec a\\cdot\\vec w = 10 + 7 - 2 = 15$, so $\\cos(\\text{angle with } \\vec a) = \\dfrac{15}{3\\cdot 5\\sqrt3} = \\dfrac{1}{\\sqrt3}$. $\\vec b\\cdot\\vec w = 21 + 4 = 25$, so $\\cos(\\text{angle with } \\vec b) = \\dfrac{25}{5\\cdot 5\\sqrt3} = \\dfrac{1}{\\sqrt3}$. Equal, as promised.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: â + b̂ bisects the angle only if |a| = |b|",
      content:
        "That condition belongs to $\\vec a + \\vec b$, not to $\\hat a + \\hat b$. The hats have already made both lengths equal to 1, so $\\hat a + \\hat b$ **always** bisects, whatever $|\\vec a|$ and $|\\vec b|$ are. Normalise first, then add.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Optional JEE extension: the vector triple product",
      content:
        "Crossing three vectors gives a vector, and it expands as\n$\\vec a\\times(\\vec b\\times\\vec c) = (\\vec a\\cdot\\vec c)\\,\\vec b - (\\vec a\\cdot\\vec b)\\,\\vec c$.\n\nWhy it must have this shape: $\\vec b\\times\\vec c$ is normal to the plane of $\\vec b, \\vec c$, and crossing that normal with $\\vec a$ brings the result back into that plane, so it is a combination of $\\vec b$ and $\\vec c$.\n\n**Check on basis vectors.** $\\vec a = \\hat i$, $\\vec b = \\hat i$, $\\vec c = \\hat j$: left side $\\hat i\\times(\\hat i\\times\\hat j) = \\hat i\\times\\hat k = -\\hat j$; right side $(\\hat i\\cdot\\hat j)\\hat i - (\\hat i\\cdot\\hat i)\\hat j = -\\hat j$. And $\\vec a = \\hat j$, $\\vec b = \\hat i$, $\\vec c = \\hat j$: left $\\hat j\\times\\hat k = \\hat i$; right $(\\hat j\\cdot\\hat j)\\hat i - (\\hat j\\cdot\\hat i)\\hat j = \\hat i$.\n\n**Why those checks are enough.** Both sides are linear in each of $\\vec a$, $\\vec b$, $\\vec c$, so the identity holds everywhere once it holds for all 27 choices of $\\vec a, \\vec b, \\vec c$ from $\\{\\hat i, \\hat j, \\hat k\\}$. When $\\vec b = \\vec c$ both sides are $\\vec 0$. When $\\vec a$ differs from both $\\vec b$ and $\\vec c$, both sides are again $\\vec 0$ (for example $\\hat k\\times(\\hat i\\times\\hat j) = \\hat k\\times\\hat k = \\vec 0$, and both dots on the right vanish). The remaining cases are the two above, or are obtained from them by relabelling the axes cyclically ($\\hat i\\to\\hat j\\to\\hat k\\to\\hat i$) or by swapping $\\vec b$ and $\\vec c$ (both sides change sign).\n\n**Numeric check with general vectors.** $\\vec a = (1, 2, 0)$, $\\vec b = (0, 1, 1)$, $\\vec c = (1, 0, 1)$. Then $\\vec b\\times\\vec c = (1, 1, -1)$ and $\\vec a\\times(\\vec b\\times\\vec c) = (-2, 1, -1)$. Right side: $\\vec a\\cdot\\vec c = 1$, $\\vec a\\cdot\\vec b = 2$, so $1\\cdot(0, 1, 1) - 2\\cdot(1, 0, 1) = (-2, 1, -1)$. They agree.\n\n**Brackets matter.** $(\\hat i\\times\\hat i)\\times\\hat j = \\vec 0$, but $\\hat i\\times(\\hat i\\times\\hat j) = -\\hat j$. The cross product is not associative. With the brackets on the left, $(\\vec a\\times\\vec b)\\times\\vec c = -\\vec c\\times(\\vec a\\times\\vec b) = (\\vec a\\cdot\\vec c)\\,\\vec b - (\\vec b\\cdot\\vec c)\\,\\vec a$, a combination of $\\vec a$ and $\\vec b$ instead. In both forms the answer lies in the plane of the two vectors inside the brackets.\n\n**Lagrange's identity.** $(\\vec a\\times\\vec b)\\cdot(\\vec c\\times\\vec d) = (\\vec a\\cdot\\vec c)(\\vec b\\cdot\\vec d) - (\\vec a\\cdot\\vec d)(\\vec b\\cdot\\vec c)$. Sketch: swap dot and cross to get $\\vec a\\cdot\\big(\\vec b\\times(\\vec c\\times\\vec d)\\big)$, then expand the inner part with the rule above. With $\\vec c = \\vec a$, $\\vec d = \\vec b$ it gives $|\\vec a\\times\\vec b|^2 = |\\vec a|^2|\\vec b|^2 - (\\vec a\\cdot\\vec b)^2$.\n\n**A classic.** $[\\,\\vec a\\times\\vec b\\;\\;\\vec b\\times\\vec c\\;\\;\\vec c\\times\\vec a\\,] = [\\vec a\\;\\vec b\\;\\vec c]^2$. Sketch: $(\\vec b\\times\\vec c)\\times(\\vec c\\times\\vec a) = \\big((\\vec b\\times\\vec c)\\cdot\\vec a\\big)\\vec c - \\big((\\vec b\\times\\vec c)\\cdot\\vec c\\big)\\vec a = [\\vec a\\;\\vec b\\;\\vec c]\\,\\vec c$, and dotting with $\\vec a\\times\\vec b$ gives $[\\vec a\\;\\vec b\\;\\vec c]\\,[\\vec a\\;\\vec b\\;\\vec c]$.",
    },
    {
      type: "quiz",
      id: "va5-5-q1",
      variant: "concept",
      question: "$|\\vec a| = 2$ and $|\\vec b| = 7$. Along which vector does the internal bisector of the angle between them lie?",
      options: [
        { text: "$\\hat a + \\hat b$", correct: true, feedback: "The unit vectors span a rhombus, whose diagonal bisects the angle, regardless of the original lengths." },
        { text: "$\\vec a + \\vec b$", feedback: "With unequal lengths the parallelogram is not a rhombus, and $\\vec a + \\vec b$ leans toward the longer vector $\\vec b$." },
        { text: "No simple formula exists unless $|\\vec a| = |\\vec b|$.", feedback: "That is the misconception. Normalising first makes the lengths equal automatically." },
        { text: "$\\hat a - \\hat b$", feedback: "That is the external bisector." },
      ],
    },
    {
      type: "quiz",
      id: "va5-5-q2",
      variant: "practice",
      question: "In triangle $ABC$, $AB = 7$, $AC = 5$, $BC = 8$. What is the length of the median from $A$?",
      options: [
        { text: "$\\sqrt{21}$", correct: true, feedback: "$AM^2 = \\tfrac14(2\\cdot 49 + 2\\cdot 25 - 64) = 21$." },
        { text: "$\\sqrt{37}$", feedback: "Check the formula: $AB^2 + AC^2 = 2AM^2 + 2BM^2$ with $BM = 4$, so $2AM^2 = 74 - 32 = 42$." },
        { text: "$6$", feedback: "The median length is not the average of the sides. Use Apollonius." },
        { text: "$\\sqrt{84}$", feedback: "You found $4AM^2$. Divide by 4 before taking the root." },
      ],
      hint: "$AB^2 + AC^2 = 2AM^2 + 2BM^2$, and $BM = \\tfrac12 BC$.",
    },
    {
      type: "quiz",
      id: "va5-5-q3",
      variant: "concept",
      question:
        "In a parallelogram with sides $\\vec a, \\vec b$, $(\\vec a + \\vec b)\\cdot(\\vec a - \\vec b) = |\\vec a|^2 - |\\vec b|^2$. What does this prove?",
      options: [
        { text: "The diagonals are perpendicular exactly when the sides are equal (a rhombus).", correct: true, feedback: "The dot is 0 if and only if $|\\vec a| = |\\vec b|$. One line gives both directions of the theorem." },
        { text: "The diagonals of every parallelogram are perpendicular.", feedback: "Only when $|\\vec a|^2 - |\\vec b|^2 = 0$. A long thin rectangle is a counterexample." },
        { text: "The diagonals are always equal in length.", feedback: "Equal diagonals come from $|\\vec a + \\vec b| = |\\vec a - \\vec b|$, which means $\\vec a\\cdot\\vec b = 0$: a rectangle." },
      ],
    },
    {
      type: "quiz",
      id: "va5-5-q4",
      variant: "practice",
      question: "$|\\vec a| = 3$, $|\\vec b| = 5$ and the angle between them is $60^\\circ$. Find $|\\vec a - \\vec b|$.",
      options: [
        { text: "$\\sqrt{19}$", correct: true, feedback: "$9 + 25 - 2\\cdot 3\\cdot 5\\cdot\\tfrac12 = 19$." },
        { text: "$7$", feedback: "That is $|\\vec a + \\vec b|$: $9 + 25 + 15 = 49$. The difference has a minus sign." },
        { text: "$2$", feedback: "Lengths do not subtract like numbers unless the vectors are parallel." },
        { text: "$\\sqrt{34}$", feedback: "You dropped the $-2\\,\\vec a\\cdot\\vec b$ term; that would need a right angle." },
      ],
    },
    {
      type: "quiz",
      id: "va5-5-q6",
      variant: "practice",
      question:
        "A drone flies from a mast along $\\vec a = (3, 0, 4)$ or along $\\vec b = (0, 0, 2)$. Which direction makes equal angles with both routes (the internal bisector)?",
      options: [
        { text: "$(1, 0, 3)$", correct: true, feedback: "$\\hat a = (0.6, 0, 0.8)$ and $\\hat b = (0, 0, 1)$, so $\\hat a + \\hat b = (0.6, 0, 1.8)$, which points along $(1, 0, 3)$." },
        { text: "$(1, 0, 2)$", feedback: "That is the direction of $\\vec a + \\vec b = (3, 0, 6)$. The lengths 5 and 2 differ, so normalise first." },
        { text: "$(3, 0, -1)$", feedback: "That is $\\hat a - \\hat b = (0.6, 0, -0.2)$, the external bisector." },
        { text: "$(3, 0, 14)$", feedback: "You normalised $\\vec a$ but not $\\vec b$: $\\hat a + \\vec b = (0.6, 0, 2.8)$. Both must be unit vectors." },
      ],
      hint: "Normalise both vectors, then add.",
    },
    {
      type: "quiz",
      id: "va5-5-q7",
      variant: "practice",
      question:
        "A parallelogram has sides of length 5 and 7, and one diagonal of length 8. How long is the other diagonal?",
      options: [
        { text: "$2\\sqrt{21}$", correct: true, feedback: "Parallelogram law: $|\\vec a + \\vec b|^2 + |\\vec a - \\vec b|^2 = 2(25 + 49) = 148$. So the other diagonal squared is $148 - 64 = 84$, and $\\sqrt{84} = 2\\sqrt{21}$." },
        { text: "$\\sqrt{21}$", feedback: "That is half the diagonal, the median length from the Apollonius example. The full diagonal is twice it." },
        { text: "$\\sqrt{10}$", feedback: "You used $25 + 49 - 64$. The law is $|\\vec a + \\vec b|^2 + |\\vec a - \\vec b|^2 = 2|\\vec a|^2 + 2|\\vec b|^2$: the factor 2 is essential." },
        { text: "$8$", feedback: "Diagonals of a parallelogram are equal only in a rectangle, when $\\vec a\\cdot\\vec b = 0$. Nothing says the angle is $90^\\circ$ here." },
      ],
      hint: "Add $|\\vec a + \\vec b|^2$ and $|\\vec a - \\vec b|^2$: the dot terms cancel.",
    },
    {
      type: "quiz",
      id: "va5-5-q8",
      variant: "practice",
      question:
        "Quadrilateral $ABCD$ has $A(1, 0, 2)$, $B(3, 2, 0)$, $C(5, 4, 6)$, $D(1, 2, 4)$. $P$ and $Q$ are the midpoints of $AB$ and $BC$. What is $\\overrightarrow{PQ}$?",
      options: [
        { text: "$(2, 2, 2)$", correct: true, feedback: "$\\overrightarrow{PQ} = \\tfrac12(\\vec c - \\vec a) = \\tfrac12(4, 4, 4)$. Directly: $P = (2, 1, 1)$, $Q = (4, 3, 3)$." },
        { text: "$(4, 4, 4)$", feedback: "That is the whole diagonal $\\overrightarrow{AC}$. The midpoint side is half of it." },
        { text: "$(1, 1, -1)$", feedback: "That is $\\tfrac12\\overrightarrow{AB}$. $\\overrightarrow{PQ} = \\vec q - \\vec p = \\tfrac12(\\vec b + \\vec c) - \\tfrac12(\\vec a + \\vec b)$; the $\\vec b$ cancels." },
        { text: "$(-1, 0, 2)$", feedback: "That is half the other diagonal, $\\tfrac12\\overrightarrow{BD}$. That one equals $\\overrightarrow{QR}$, not $\\overrightarrow{PQ}$." },
      ],
      hint: "Subtract the section-formula midpoints; one of the position vectors cancels.",
    },
    {
      type: "quiz",
      id: "va5-5-q9",
      variant: "concept",
      question:
        "$AB$ is a diameter of a circle with centre $O$ at the origin, $\\overrightarrow{OA} = \\vec a$, and $P$ is on the circle with $\\overrightarrow{OP} = \\vec p$. Why is $\\overrightarrow{PA}\\cdot\\overrightarrow{PB} = 0$?",
      options: [
        { text: "It expands to $|\\vec p|^2 - |\\vec a|^2$, and both lengths equal the radius.", correct: true, feedback: "$(\\vec a - \\vec p)\\cdot(-\\vec a - \\vec p) = |\\vec p|^2 - |\\vec a|^2 = r^2 - r^2 = 0$, so $\\angle APB = 90^\\circ$." },
        { text: "Because $\\vec a$ and $\\vec p$ are perpendicular.", feedback: "They need not be: $P$ can be anywhere on the circle. The cross terms $\\vec a\\cdot\\vec p$ cancel whatever their value." },
        { text: "Because $\\overrightarrow{PA}$ and $\\overrightarrow{PB}$ have equal length.", feedback: "They are equal only when $P$ is midway round the arc. The right angle holds for every $P$." },
        { text: "It is only true when $P$ is at the top of the circle.", feedback: "The expansion $|\\vec p|^2 - |\\vec a|^2$ is 0 for every point on the circle." },
      ],
    },
    {
      type: "quiz",
      id: "va5-5-q5",
      variant: "practice",
      question: "Using $\\vec a\\times(\\vec b\\times\\vec c) = (\\vec a\\cdot\\vec c)\\vec b - (\\vec a\\cdot\\vec b)\\vec c$, find $\\hat j\\times(\\hat j\\times\\hat k)$.",
      options: [
        { text: "$-\\hat k$", correct: true, feedback: "$(\\hat j\\cdot\\hat k)\\hat j - (\\hat j\\cdot\\hat j)\\hat k = 0 - \\hat k$. Directly: $\\hat j\\times\\hat k = \\hat i$ and $\\hat j\\times\\hat i = -\\hat k$." },
        { text: "$\\hat k$", feedback: "Check the sign: $\\hat j\\times\\hat i = -\\hat k$." },
        { text: "$\\vec 0$", feedback: "That would be $(\\hat j\\times\\hat j)\\times\\hat k$. Brackets matter." },
        { text: "$\\hat i$", feedback: "That is only the inner product $\\hat j\\times\\hat k$; you still need to cross with $\\hat j$." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-5-mastery",
  title: "5.6 · Chapter 5 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "This is the full-course check: vector types and addition, components and direction cosines, the section formula, all three products, coplanarity, choosing the right tool, and one multi-step problem. Work each one on paper before you pick an option. If a question trips you up, the feedback names the lesson to revisit.",
    },
    {
      type: "quiz",
      id: "va5-6-q1",
      variant: "mastery",
      question: "Which of these is a unit vector?",
      options: [
        { text: "$\\tfrac{1}{\\sqrt3}(\\hat i + \\hat j + \\hat k)$", correct: true, feedback: "Its length is $\\tfrac{1}{\\sqrt3}\\cdot\\sqrt3 = 1$." },
        { text: "$\\tfrac13(\\hat i + \\hat j + \\hat k)$", feedback: "Length $\\tfrac{\\sqrt3}{3} \\approx 0.58$. Divide by the magnitude $\\sqrt3$, not by 3. (Chapter 1)" },
        { text: "$\\hat i + \\hat j$", feedback: "Length $\\sqrt2$. (Chapter 1)" },
        { text: "$\\hat i - \\hat i$", feedback: "That is the zero vector, which has no direction. (Chapter 0)" },
      ],
    },
    {
      type: "quiz",
      id: "va5-6-q2",
      variant: "mastery",
      question: "For any triangle $ABC$, what is $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CA}$?",
      options: [
        { text: "$\\vec 0$", correct: true, feedback: "Walk round the triangle and you end where you started. (Chapter 0, triangle law)" },
        { text: "$2\\overrightarrow{AC}$", feedback: "$\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$, and then $+\\overrightarrow{CA}$ cancels it." },
        { text: "The perimeter of the triangle", feedback: "The perimeter adds lengths; this adds vectors, which can cancel." },
      ],
    },
    {
      type: "quiz",
      id: "va5-6-q3",
      variant: "mastery",
      question: "What are the direction cosines of $2\\hat i - 3\\hat j + 6\\hat k$?",
      options: [
        { text: "$\\tfrac27,\\; -\\tfrac37,\\; \\tfrac67$", correct: true, feedback: "The magnitude is $\\sqrt{4 + 9 + 36} = 7$; divide each component by it. (Chapter 1)" },
        { text: "$2,\\; -3,\\; 6$", feedback: "Those are direction ratios. Cosines must satisfy $l^2 + m^2 + n^2 = 1$." },
        { text: "$\\tfrac27,\\; \\tfrac37,\\; \\tfrac67$", feedback: "The $y$-component is negative, so its cosine is negative: the angle with the $y$-axis is obtuse." },
        { text: "$\\tfrac{2}{11},\\; -\\tfrac{3}{11},\\; \\tfrac{6}{11}$", feedback: "You divided by the sum of the sizes of the components ($2 + 3 + 6 = 11$). Divide by the magnitude, 7." },
      ],
    },
    {
      type: "quiz",
      id: "va5-6-q4",
      variant: "mastery",
      question: "Can a vector make angles of $45^\\circ$, $45^\\circ$, $45^\\circ$ with the three axes?",
      options: [
        { text: "No, because $\\cos^2 45^\\circ \\times 3 = \\tfrac32 \\neq 1$.", correct: true, feedback: "Direction cosines must satisfy $l^2 + m^2 + n^2 = 1$. The equal-angle direction $(1,1,1)$ makes about $54.7^\\circ$ with each axis. (Chapter 1)" },
        { text: "Yes, the vector $\\hat i + \\hat j + \\hat k$ does.", feedback: "Its angle with each axis is $\\cos^{-1}\\tfrac{1}{\\sqrt3} \\approx 54.7^\\circ$, not $45^\\circ$." },
        { text: "Yes, any angles are possible in 3D.", feedback: "The three angles are tied together by $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "va5-6-q5",
      variant: "mastery",
      question: "$A = (1, 2, 3)$ and $B = (4, 5, 6)$. Which point divides $AB$ internally in the ratio $1 : 2$?",
      options: [
        { text: "$(2, 3, 4)$", correct: true, feedback: "$P = \\dfrac{2A + 1B}{3} = \\dfrac{(6, 9, 12)}{3}$. It is one-third of the way from $A$. (Chapter 2)" },
        { text: "$(3, 4, 5)$", feedback: "That divides $AB$ in $2 : 1$, two-thirds of the way. The weight on each end is the *other* part of the ratio." },
        { text: "$(2.5, 3.5, 4.5)$", feedback: "That is the midpoint, ratio $1 : 1$." },
      ],
    },
    {
      type: "quiz",
      id: "va5-6-q6",
      variant: "mastery",
      question: "What is the angle between $\\hat i + \\hat j$ and $\\hat j + \\hat k$?",
      options: [
        { text: "$60^\\circ$", correct: true, feedback: "Dot $= 1$, lengths $\\sqrt2$ each, so $\\cos\\theta = \\tfrac12$. (Chapter 3)" },
        { text: "$90^\\circ$", feedback: "The dot product is 1, not 0, so they are not perpendicular." },
        { text: "$45^\\circ$", feedback: "$\\cos\\theta = \\tfrac{1}{\\sqrt2\\cdot\\sqrt2} = \\tfrac12$, which is $60^\\circ$." },
        { text: "$30^\\circ$", feedback: "$\\cos 30^\\circ = \\tfrac{\\sqrt3}{2}$, but here $\\cos\\theta = \\tfrac12$." },
      ],
    },
    {
      type: "quiz",
      id: "va5-6-q7",
      variant: "mastery",
      question: "For which $\\lambda$ is $2\\hat i + \\lambda\\hat j + \\hat k$ perpendicular to $\\hat i - 2\\hat j + 3\\hat k$?",
      options: [
        { text: "$\\lambda = \\tfrac52$", correct: true, feedback: "$2 - 2\\lambda + 3 = 0$. (Chapter 3)" },
        { text: "$\\lambda = -\\tfrac52$", feedback: "Sign slip: $5 - 2\\lambda = 0$ gives $\\lambda = +\\tfrac52$." },
        { text: "$\\lambda = 1$", feedback: "Then the dot is $2 - 2 + 3 = 3 \\neq 0$." },
      ],
    },
    {
      type: "quiz",
      id: "va5-6-q8",
      variant: "mastery",
      question: "What is the area of the parallelogram with adjacent sides $\\hat i + 2\\hat j$ and $3\\hat i + \\hat j$?",
      options: [
        { text: "$5$", correct: true, feedback: "The cross product is $(0, 0, 1 - 6) = -5\\hat k$, length 5. (Chapter 4)" },
        { text: "$2.5$", feedback: "That is the triangle. The parallelogram is the full $|\\vec a\\times\\vec b|$." },
        { text: "$7$", feedback: "$1\\cdot 1 + 2\\cdot 3$ mixes the components the wrong way. Area uses $|a_1b_2 - a_2b_1| = |1 - 6|$." },
        { text: "$5\\sqrt2$", feedback: "The cross product is $-5\\hat k$, whose length is exactly 5." },
      ],
    },
    {
      type: "quiz",
      id: "va5-6-q9",
      variant: "mastery",
      question: "What is the volume of the parallelepiped with edges $\\hat i + \\hat j$, $\\hat j + \\hat k$, $\\hat k + \\hat i$?",
      options: [
        { text: "$2$", correct: true, feedback: "$\\begin{vmatrix}1&1&0\\\\0&1&1\\\\1&0&1\\end{vmatrix} = 1(1) - 1(0 - 1) + 0 = 2$. (5.1, 5.2)" },
        { text: "$0$", feedback: "These three are not coplanar: no one of them is a combination of the other two." },
        { text: "$1$", feedback: "Recheck the second cofactor: $-a_2(b_1c_3 - b_3c_1) = -1(0\\cdot 1 - 1\\cdot 1) = +1$." },
        { text: "$\\tfrac13$", feedback: "That is the tetrahedron on these edges, $\\tfrac16\\cdot 2$. The parallelepiped is the full $|[\\vec a\\;\\vec b\\;\\vec c]| = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "va5-6-q10",
      variant: "mastery",
      question: "For which $\\lambda$ are $\\hat i - \\hat j + \\hat k$, $2\\hat i + \\hat j + \\hat k$ and $3\\hat i + \\lambda\\hat k$ coplanar?",
      options: [
        { text: "$\\lambda = 2$", correct: true, feedback: "Determinant $= 1(\\lambda - 0) + 1(2\\lambda - 3) + 1(0 - 3) = 3\\lambda - 6$. Also $(3, 0, 2)$ is the sum of the first two. (5.3)" },
        { text: "$\\lambda = 3$", feedback: "Then the determinant is $3$, not 0." },
        { text: "$\\lambda = 0$", feedback: "Then the determinant is $-6$." },
        { text: "No value works, since none of them are parallel.", feedback: "Coplanar does not need parallel vectors. (5.3)" },
      ],
    },
    {
      type: "quiz",
      id: "va5-6-q11",
      variant: "mastery",
      question: "A force $\\vec F$ acts at a point with position vector $\\vec r$. Which expression gives its moment (torque) about the origin?",
      options: [
        { text: "$\\vec r\\times\\vec F$", correct: true, feedback: "Turning effect is a cross product, with the order arm × force. (5.4)" },
        { text: "$\\vec r\\cdot\\vec F$", feedback: "A dot product is a scalar; torque has an axis, so it is a vector." },
        { text: "$\\vec F\\times\\vec r$", feedback: "That is the negative of the torque. Order matters in a cross product." },
      ],
    },
    {
      type: "quiz",
      id: "va5-6-q12",
      variant: "mastery",
      question:
        "Multi-step: $A(1,0,0)$, $B(0,1,0)$, $C(0,0,1)$. Using the volume of tetrahedron $OABC$ and the area of triangle $ABC$, find the distance from the origin $O$ to the plane $ABC$.",
      options: [
        { text: "$\\tfrac{1}{\\sqrt3}$", correct: true, feedback: "Volume $= \\tfrac16[\\hat i\\;\\hat j\\;\\hat k] = \\tfrac16$. Area $= \\tfrac12|\\overrightarrow{AB}\\times\\overrightarrow{AC}| = \\tfrac12|(1,1,1)| = \\tfrac{\\sqrt3}{2}$. Since $V = \\tfrac13\\cdot\\text{area}\\cdot h$, $h = \\dfrac{3\\cdot\\tfrac16}{\\tfrac{\\sqrt3}{2}} = \\tfrac{1}{\\sqrt3}$." },
        { text: "$\\tfrac{1}{3\\sqrt3}$", feedback: "You used $V = \\text{area}\\times h$. A tetrahedron is $\\tfrac13$ base × height, so multiply the volume by 3." },
        { text: "$1$", feedback: "That is the distance from $O$ to each vertex, not to the plane." },
        { text: "$\\sqrt3$", feedback: "Check the division: $\\tfrac12 \\div \\tfrac{\\sqrt3}{2} = \\tfrac{1}{\\sqrt3}$." },
      ],
      hint: "Tetrahedron volume $= \\tfrac13\\times$ base area $\\times$ height. Find the volume with a triple product and the base area with a cross product.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Course complete",
      content:
        "You started with arrows on a grid and finished with signed volumes and a toolkit that turns geometry into algebra. The same ideas return in 3D geometry (lines and planes), in mechanics (work, torque, angular momentum), and in the matrices course, where the triple product becomes the $3\\times 3$ determinant and 'zero volume' becomes 'no inverse'.",
    },
  ]),
};

export const vectorsChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
