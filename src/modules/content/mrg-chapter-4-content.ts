import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics II Chapter 4 — Angular Momentum and Rolling.
 * L = r × p for particles and Iω for rigid bodies, τ = dL/dt and its
 * conservation law, then rolling as translation plus rotation locked by
 * v = ωR: velocities of points, rolling down inclines, the slip-to-roll
 * transition, and impulses on rigid bodies.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "angular-momentum",
  title: "4.1 · Angular Momentum",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mrg-4-angular-momentum-rolling.mp4",
      poster: "/videos/mrg-4-angular-momentum-rolling.jpg",
      title: "Chapter 4 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Force changes momentum: $\\vec F = d\\vec p/dt$. Chapter 3 showed that torque changes spin: $\\tau = I\\alpha$. The analogy suggests there should be a \"rotational momentum\" that torque changes, just as force changes $\\vec p$. It exists, it is called **angular momentum**, and it turns out to be one of the most powerful conserved quantities in physics: it keeps planets in their planes, spinning tops upright and gyroscopes pointing north.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Angular momentum of a particle",
      content:
        "A particle with momentum $\\vec p = m\\vec v$ at position $\\vec r$ relative to a point $O$ has angular momentum about $O$\n$\\vec L = \\vec r\\times\\vec p$.\nIts magnitude is $L = rp\\sin\\theta = m v\\,r_\\perp$, where $r_\\perp$ is the perpendicular distance from $O$ to the line along which the particle is moving. Unit: kg m²/s (or J s).",
    },
    { type: "heading", text: "The lever arm of momentum" },
    {
      type: "text",
      content:
        "The pattern is the same as torque: $\\vec\\tau = \\vec r\\times\\vec F$ and $\\vec L = \\vec r\\times\\vec p$. So everything you learned about lever arms carries over. Only the part of the momentum perpendicular to $\\vec r$ counts, or equivalently the full momentum times its lever arm.",
    },
    {
      type: "text",
      content:
        "Drag the vectors below. Think of $\\vec a$ as the direction of motion (the momentum) and $\\vec b$ as the position $\\vec r$ of the particle from $O$. The part of $\\vec r$ perpendicular to $\\vec a$ is the lever arm $r_\\perp$.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "dot",
        a: [3, 1],
        b: [1, 3],
        showPerpendicular: true,
        labels: { a: "\\vec p", b: "\\vec r" },
        readouts: ["angle", "projection"],
        caption:
          "Split r into a part along p and a part perpendicular to p. Only the perpendicular part, the lever arm, enters L = p r⊥.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: slide the tip of $\\vec r$ parallel to $\\vec p$ (the particle moving along its path) and the perpendicular part does not change. A particle moving in a straight line at constant speed therefore has **constant** angular momentum about any fixed point: $p$ is fixed and so is $r_\\perp$. Its angular momentum is zero only about points on its own line.",
    },
    { type: "heading", text: "Torque changes angular momentum" },
    {
      type: "text",
      content:
        "Differentiate $\\vec L = \\vec r\\times\\vec p$ with the product rule (keeping the order, since the cross product is not commutative):",
    },
    {
      type: "math",
      latex: "\\frac{d\\vec L}{dt} = \\frac{d\\vec r}{dt}\\times\\vec p + \\vec r\\times\\frac{d\\vec p}{dt} = \\underbrace{\\vec v\\times m\\vec v}_{=\\,\\vec 0} + \\vec r\\times\\vec F = \\vec\\tau",
    },
    {
      type: "text",
      content:
        "The first term vanishes because any vector crossed with itself (or a multiple of itself) is zero. For a system of particles, add up: internal forces come in equal and opposite pairs along the joining line, so their torques cancel, leaving",
    },
    { type: "math", latex: "\\vec\\tau_{\\text{ext}} = \\frac{d\\vec L}{dt}" },
    {
      type: "callout",
      variant: "definition",
      title: "Angular momentum of a rigid body",
      content:
        "For a rigid body rotating with angular velocity $\\omega$ about a fixed axis, each particle has $L_i = m_i v_i r_i = m_i r_i^2\\omega$ about the axis. Summing: $L = I\\omega$. Then $\\tau = dL/dt = I\\,d\\omega/dt = I\\alpha$: Chapter 3's law is a special case.\nFor a body that moves **and** spins, about a fixed point $O$: $\\vec L_O = \\vec r_{cm}\\times M\\vec v_{cm} + I_{cm}\\vec\\omega$, the \"orbital\" part of the COM plus the \"spin\" about the COM.",
    },
    { type: "heading", text: "Lines, components and spinning discs" },
    {
      type: "worked-example",
      id: "mrg4-1-we1",
      title: "Worked example 1: a particle on a straight line",
      problem:
        "A 2 kg particle moves at 3 m/s in the $+x$ direction along the line $y = 4$ m. Find its angular momentum about the origin, and about the point $(0, 4)$.",
      steps: [
        { text: "$p = 6$ kg m/s. The perpendicular distance from the origin to the line $y = 4$ is 4 m. *Why this step:* the lever-arm form avoids finding $\\vec r$ at a particular instant." },
        { text: "$L = p\\,r_\\perp = 6 \\times 4 = 24$ kg m²/s. By components, $L_z = xp_y - yp_x = x(0) - 4(6) = -24$: clockwise, at every instant." },
        { text: "About $(0, 4)$, a point on the line: $r_\\perp = 0$, so $L = 0$. The same motion has different angular momenta about different points." },
      ],
      answer: "24 kg m²/s (clockwise, $L_z = -24$) about the origin; 0 about $(0, 4)$.",
    },
    {
      type: "worked-example",
      id: "mrg4-1-we2",
      title: "Worked example 2: components",
      problem:
        "A particle at $\\vec r = \\hat i + 2\\hat j$ m has momentum $\\vec p = 3\\hat i + \\hat k$ kg m/s. Find $\\vec L$ about the origin.",
      steps: [
        { latex: "\\vec L = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ 1 & 2 & 0 \\\\ 3 & 0 & 1 \\end{vmatrix} = \\hat i(2 - 0) - \\hat j(1 - 0) + \\hat k(0 - 6) = 2\\hat i - \\hat j - 6\\hat k\\ \\text{kg m}^2/\\text{s}" },
      ],
      answer: "$\\vec L = 2\\hat i - \\hat j - 6\\hat k$ kg m²/s.",
    },
    {
      type: "worked-example",
      id: "mrg4-1-we3",
      title: "Worked example 3: a spinning disc",
      problem:
        "A uniform disc of mass 2 kg and radius 0.5 m spins at 10 rad/s about its axis. Find its angular momentum.",
      steps: [
        { text: "$I = \\tfrac12 MR^2 = \\tfrac12(2)(0.25) = 0.25$ kg m²." },
        { text: "$L = I\\omega = 2.5$ kg m²/s, along the axis by the right-hand rule." },
      ],
      answer: "$L = 2.5$ kg m²/s along the axis ($I = 0.25$ kg m²).",
    },
    {
      type: "worked-example",
      id: "mrg4-1-we4",
      title: "Worked example 4: rolling disc about the ground, JEE favourite",
      problem:
        "The same disc rolls without slipping along the ground at $v = 4$ m/s (so $\\omega = v/R = 8$ rad/s). Find its angular momentum about a point on the ground in its path.",
      steps: [
        { text: "Orbital part: the COM moves horizontally at height $R$ above the point, so $|\\vec r_{cm}\\times M\\vec v| = MvR = 2 \\times 4 \\times 0.5 = 4$ kg m²/s. *Why this step:* the lever arm of the COM's momentum about any ground point is the height $R$." },
        { text: "Spin part: $I_{cm}\\omega = 0.25 \\times 8 = 2$ kg m²/s." },
        { text: "Both are clockwise for a wheel rolling to the right, so they add: $L = 6$ kg m²/s $= \\tfrac32 MvR$." },
      ],
      answer: "$L = 6$ kg m²/s $= \\tfrac32 MvR$, clockwise.",
    },
    {
      type: "worked-example",
      id: "mrg4-1-we5",
      title: "Worked example 5: checking $\\tau = dL/dt$",
      problem:
        "A ball of mass $m$ is dropped from rest at horizontal distance $d$ from $O$. Find its angular momentum about $O$ after time $t$, and compare $dL/dt$ with the torque of its weight about $O$.",
      steps: [
        { text: "After time $t$ its momentum is $mgt$ downwards and its lever arm about $O$ is $d$, so $L = mgd\\,t$ (clockwise)." },
        { text: "Then $dL/dt = mgd$, which is exactly the torque of its weight about $O$. ✓ A falling body gains angular momentum about a point off to the side." },
      ],
      answer: "$L = mgd\\,t$, so $dL/dt = mgd$: exactly the torque of its weight about $O$.",
    },
    { type: "heading", text: "The direction of $\\vec L$" },
    {
      type: "text",
      content:
        "The 3D view shows the directions: $\\vec a$ as $\\vec r$, $\\vec b$ as $\\vec p$. The normal arrow is $\\vec L$.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-space-3d",
        mode: "cross",
        a: [2, 0, 0],
        b: [0, 3, 0],
        sliders: [{ name: "angle", min: 0, max: 180, step: 5, initial: 90 }],
        readouts: ["cross", "area"],
        caption: "a is r, b is p. The normal arrow is L = r × p, perpendicular to the plane of the motion.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $\\vec L$ stands perpendicular to the plane containing $\\vec r$ and $\\vec p$. For motion in a fixed plane (orbits, rolling, anything in a JEE plane problem) $\\vec L$ always points along the same line, which is why we can treat it as a signed number.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a particle moving in a straight line has no angular momentum\"",
      content:
        "It has none only about points **on** its line. About any other point it has $L = mv\\,r_\\perp \\neq 0$, and that value stays constant as it moves. Angular momentum is not about curving paths; it is about the lever arm of the momentum relative to a chosen point.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg4-1-q1",
      variant: "practice",
      question: "A 0.5 kg ball moves at 4 m/s along a straight line that passes 3 m from a point $O$. What is the magnitude of its angular momentum about $O$? Give your answer in kg m²/s.",
      answer: 6,
      unit: "kg m²/s",
      hint: "Use the lever-arm form $L = mv\\,r_\\perp$.",
      solution: "$L = mv\\,r_\\perp = 0.5 \\times 4 \\times 3 = 6$ kg m²/s. A straight-line path still has angular momentum about any point off the line.",
      commonMistakes: [
        { answer: 0, feedback: "Straight-line motion has zero $L$ only about points on its line. $O$ is 3 m off the line." },
        { answer: 2, feedback: "That is the linear momentum $mv$. Multiply by the lever arm." },
        { answer: 24, feedback: "Mass is 0.5 kg, not 2 kg: $0.5 \\times 4 \\times 3$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-1-q2",
      variant: "concept",
      question: "A free particle moves in a straight line at constant velocity. How does its angular momentum about a fixed point $O$ off the line change with time?",
      options: [
        { text: "It grows as the particle gets farther from $O$", feedback: "$r$ grows, but $\\sin\\theta$ shrinks in exactly the right way: $r\\sin\\theta = r_\\perp$ is fixed." },
        { text: "It stays constant", correct: true, feedback: "$p$ and the lever arm $r_\\perp$ are both constant. Equivalently, no force means no torque, so $d\\vec L/dt = 0$." },
        { text: "It is largest when the particle is nearest $O$", feedback: "At the nearest point $\\vec r \\perp \\vec p$, but the value $p\\,r_\\perp$ is the same at every point." },
      ],
      hint: "Use $L = p\\,d_\\perp$, where $d_\\perp$ is the perpendicular distance from $O$ to the line of motion. Which of $p$ and $d_\\perp$ change as the particle moves?",
    },
    {
      type: "numeric",
      id: "mrg4-1-q3",
      variant: "practice",
      question: "A uniform rod of mass 3 kg and length 2 m rotates at 2 rad/s about an axis through one end, perpendicular to the rod. What is its angular momentum about that axis? Give your answer in kg m²/s.",
      answer: 8,
      unit: "kg m²/s",
      hint: "$L = I\\omega$, with $I$ about the end of the rod.",
      solution: "$I_{\\text{end}} = \\tfrac13 ML^2 = \\tfrac13 \\times 3 \\times 4 = 4$ kg m², so $L = I\\omega = 4 \\times 2 = 8$ kg m²/s.",
      commonMistakes: [
        { answer: 2, feedback: "That uses $I = \\tfrac{1}{12}ML^2 = 1$ kg m², about the centre. The axis is at the end." },
        { answer: 24, feedback: "That uses $I = ML^2$, as if all the mass were at the far end." },
        { answer: 4, feedback: "That is $I$ itself. Multiply by $\\omega = 2$ rad/s." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-1-q4",
      variant: "practice",
      question: "A uniform disc of mass 1 kg and radius 0.5 m rolls without slipping at 2 m/s. What is its angular momentum about the point of contact with the ground?",
      options: [
        { text: "$1.5$ kg m²/s", correct: true, feedback: "$MvR + I_{cm}\\omega = 1 + \\tfrac12(1)(0.25)(4) = 1 + 0.5 = 1.5$, i.e. $\\tfrac32 MvR$." },
        { text: "$1$ kg m²/s", feedback: "That is only the orbital part $MvR$. The disc is spinning too." },
        { text: "$0.5$ kg m²/s", feedback: "That is only the spin $I_{cm}\\omega$. The COM also moves, at height $R$ above the point." },
        { text: "$2$ kg m²/s", feedback: "That would be a ring ($I_{cm} = MR^2$). A disc has $\\tfrac12 MR^2$." },
      ],
      hint: "Split $L$ into the COM's orbital part, $Mv\\,d_\\perp$ with $d_\\perp = R$, plus the spin part $I_{cm}\\omega$ (Worked example 4). Both point the same way for rolling.",
    },
    {
      type: "quiz",
      id: "mrg4-1-q5",
      variant: "concept",
      question: "Starting from $\\vec L = \\vec r\\times\\vec p$, why is $d\\vec L/dt = \\vec r\\times\\vec F$ with no extra term?",
      options: [
        { text: "Because $\\vec r$ is constant", feedback: "$\\vec r$ changes as the particle moves. Its derivative is $\\vec v$, which happens to be parallel to $\\vec p$." },
        { text: "Because the extra term $\\vec v\\times m\\vec v$ is zero: a vector crossed with a parallel vector vanishes", correct: true, feedback: "The product rule gives $\\dot{\\vec r}\\times\\vec p + \\vec r\\times\\dot{\\vec p}$, and $\\dot{\\vec r}\\times\\vec p = \\vec v\\times m\\vec v = \\vec 0$." },
        { text: "Because the cross product is commutative", feedback: "It is anticommutative. The key is that $\\vec v$ and $\\vec p$ are parallel." },
      ],
      hint: "Differentiate the product: $\\dfrac{d\\vec L}{dt} = \\dfrac{d\\vec r}{dt}\\times\\vec p + \\vec r\\times\\dfrac{d\\vec p}{dt}$. What is $\\dfrac{d\\vec r}{dt}$, and how is it related to $\\vec p$?",
    },
    {
      type: "quiz",
      id: "mrg4-1-q6",
      variant: "practice",
      multiple: true,
      question: "A free particle moves at constant velocity along a straight line that misses a fixed point $O$. Select all the statements that are correct.",
      options: [
        { text: "Its angular momentum about $O$ is constant in time.", correct: true, feedback: "$p$ and the lever arm $r_\\perp$ are both fixed; equivalently, no force means no torque, so $d\\vec L/dt = 0$." },
        { text: "Its angular momentum about any point on its line of motion is zero.", correct: true, feedback: "For such a point $\\vec r$ is parallel to $\\vec p$ (or zero), so $\\vec r\\times\\vec p = \\vec 0$." },
        { text: "Its angular momentum about $O$ is perpendicular to the plane containing $O$ and the line of motion.", correct: true, feedback: "$\\vec L = \\vec r\\times\\vec p$ is perpendicular to both $\\vec r$ and $\\vec p$, which both lie in that plane." },
        { text: "Its angular momentum has the same magnitude about every point off the line.", feedback: "$L = p\\,r_\\perp$ depends on the chosen point through its distance from the line." },
      ],
      hint: "Use $\\vec L = \\vec r\\times m\\vec v$ and $L = mv\\,d_\\perp$. For each statement, ask what $d_\\perp$ and the direction of $\\vec r\\times\\vec v$ are for the chosen point.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "conservation-of-angular-momentum",
  title: "4.2 · Conservation of Angular Momentum",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A figure skater starts a slow spin with her arms stretched wide, then pulls them in to her chest. Nobody pushes her, yet she whirls several times faster. Divers tuck to somersault and open out to stop. A cat dropped upside down rights itself in mid-air. All of these follow from one line.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Conservation of angular momentum",
      content:
        "If the net external torque on a system about a point (or axis) is zero, the system's angular momentum about that point (or axis) is constant:\n$\\vec\\tau_{\\text{ext}} = \\vec 0 \\;\\Rightarrow\\; \\vec L = \\text{constant}$.\nFor a body or system turning about a fixed axis: $I_1\\omega_1 = I_2\\omega_2$.",
    },
    {
      type: "text",
      content:
        "It follows immediately from $\\vec\\tau_{\\text{ext}} = d\\vec L/dt$. Note the words \"about that point\". A system can have zero torque about one point and non-zero torque about another, so the first job in every problem is to choose the point about which the external torques vanish (for example, a hinge, through which the unknown hinge force passes).",
    },
    { type: "heading", text: "What happens to kinetic energy?" },
    {
      type: "text",
      content:
        "Write $K = \\tfrac12 I\\omega^2 = \\dfrac{L^2}{2I}$. With $L$ fixed, $K$ is inversely proportional to $I$. When the skater pulls her arms in, $I$ falls and $K$ **rises**. The extra energy comes from her muscles: she has to pull her arms inwards against their tendency to fly outwards, and that pull does work.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "8/x",
        baseLatex: "L = 4",
        expr: "L^2/(2*x)",
        exprLatex: "K = \\frac{L^2}{2I}",
        params: [{ name: "L", min: 1, max: 8, step: 0.5, initial: 4 }],
        window: { xmin: 0, xmax: 8, ymin: 0, ymax: 20 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $L$ fixed, the curve is a hyperbola in $I$ (the $x$-axis). Halving $I$ doubles $K$. A system that shrinks while spinning gains energy; one that spreads out loses it. Energy and angular momentum are separate bookkeeping, and only one of them is conserved automatically.",
    },
    { type: "heading", text: "Skaters, turntables and hinged rods" },
    {
      type: "worked-example",
      id: "mrg4-2-we1",
      title: "Worked example 1: the skater",
      problem:
        "A skater with arms out has $I_1 = 4$ kg m² and spins at 3 rad/s. She pulls in her arms to $I_2 = 1.6$ kg m². Find her new angular speed and the work she does pulling her arms in.",
      steps: [
        { text: "The ice exerts a vertical normal force and her weight is vertical; both act along (or parallel to) the vertical spin axis and have no torque about it. Ice friction is negligible. So $L$ about the axis is conserved. *Why this step:* always justify conservation by checking external torques about the chosen axis." },
        { text: "$I_1\\omega_1 = I_2\\omega_2$: $4 \\times 3 = 1.6\\,\\omega_2$, so $\\omega_2 = 7.5$ rad/s." },
        { text: "Energies: $K_1 = \\tfrac12(4)(9) = 18$ J, $K_2 = \\tfrac12(1.6)(56.25) = 45$ J. She did $27$ J of work pulling her arms in. The ratio $45/18 = 2.5 = I_1/I_2$, as $K = L^2/2I$ predicts." },
      ],
      answer: "$\\omega_2 = 7.5$ rad/s; $K$ rises from 18 J to 45 J, so she does 27 J of work.",
    },
    {
      type: "worked-example",
      id: "mrg4-2-we2",
      title: "Worked example 2: disc dropped on a spinning disc",
      problem:
        "A disc with $I_1 = 0.1$ kg m² spins at $\\omega_0 = 20$ rad/s on a frictionless axle. An identical disc, not spinning, is dropped onto it coaxially; friction between them brings them to a common angular speed. Find the common angular speed and the kinetic energy lost.",
      steps: [
        { text: "The friction between the discs is internal to the two-disc system; the axle exerts no torque. So $L$ is conserved: $I_1\\omega_0 = (I_1 + I_2)\\omega$, giving $\\omega = 10$ rad/s." },
        { text: "$K_i = \\tfrac12(0.1)(400) = 20$ J. $K_f = \\tfrac12(0.2)(100) = 10$ J. Half the energy has become heat. *Why this step:* this is the rotational version of a perfectly inelastic collision, and in general $\\Delta K = \\tfrac12\\frac{I_1I_2}{I_1+I_2}\\omega_0^2$." },
      ],
      answer: "$\\omega = 10$ rad/s; $K$ falls from 20 J to 10 J (half lost as heat).",
    },
    {
      type: "worked-example",
      id: "mrg4-2-we3",
      title: "Worked example 3: man on a turntable",
      problem:
        "A horizontal platform (a disc with $I = 200$ kg m²) turns freely at 1 rad/s with a 50 kg man standing at its centre. He walks out to the rim, 2 m from the axis. Find the platform's new angular speed and the change in kinetic energy.",
      steps: [
        { text: "The man and platform push each other (internal forces); the bearing exerts no torque about the axis. $L$ is conserved." },
        { text: "$I_i = 200$ kg m² (the man at the axis adds nothing, treating him as a point). $I_f = 200 + 50(2)^2 = 400$ kg m²." },
        { text: "$\\omega_f = \\frac{200 \\times 1}{400} = 0.5$ rad/s. Kinetic energy falls from 100 J to 50 J: the man does negative work as he walks outwards, resisting being flung off." },
      ],
      answer: "$\\omega_f = 0.5$ rad/s; kinetic energy falls from 100 J to 50 J.",
    },
    {
      type: "worked-example",
      id: "mrg4-2-we4",
      title: "Worked example 4: clay hits a hinged rod, JEE Advanced favourite",
      problem:
        "A uniform rod of mass $M = 3$ kg and length $L = 1$ m hangs vertically from a frictionless hinge at its top. A 1 kg lump of clay moving horizontally at 8 m/s hits the bottom end and sticks. Find the angular speed just after the impact, and the impulse the hinge delivers.",
      steps: [
        { text: "**Which quantity is conserved?** During the short collision the hinge exerts a large impulsive force, so linear momentum is **not** conserved. But the hinge force passes through the hinge, so it has no torque about it; gravity is not impulsive. Conserve $L$ about the hinge. *Why this step:* choose the point that the unknown impulsive force passes through." },
        { text: "Before: $L = mvL = 1 \\times 8 \\times 1 = 8$ kg m²/s." },
        { text: "After: $I = \\tfrac13 ML^2 + mL^2 = 1 + 1 = 2$ kg m², so $\\omega = 8/2 = 4$ rad/s." },
        { text: "Check the linear momentum afterwards: rod COM moves at $\\omega L/2 = 2$ m/s, clay at $\\omega L = 4$ m/s, total $3(2) + 1(4) = 10$ kg m/s, up from 8. The hinge delivered a forward impulse of 2 N s." },
      ],
      answer: "$\\omega = 4$ rad/s; the hinge delivers a forward impulse of 2 N s.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"kinetic energy is conserved whenever angular momentum is\"",
      content:
        "The skater gains kinetic energy; the dropped disc and the man on the turntable lose it; the clay collision loses it. Angular momentum conservation needs only zero external torque. Kinetic energy conservation needs, in addition, that no internal work is done (no muscles, no friction, no sticking). The two are independent.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"linear momentum is conserved when a ball hits a hinged rod\"",
      content:
        "A hinge (or pivot, or axle) can exert a large impulsive force during a collision, so linear momentum is generally not conserved. What survives is angular momentum **about the hinge**, because the hinge force has no torque about it. (On a smooth table with no hinge, both linear and angular momentum are conserved: see Lesson 4.6.)",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg4-2-q1",
      variant: "practice",
      question: "A skater spinning at 3 rad/s with $I = 4$ kg m² pulls her arms in until $I = 1.6$ kg m². What is her new angular speed? Give your answer in rad/s.",
      answer: 7.5,
      tolerance: 0.01,
      unit: "rad/s",
      hint: "No external torque about the vertical axis: which quantity stays fixed?",
      solution: "Angular momentum about the spin axis is conserved: $I_1\\omega_1 = I_2\\omega_2$, so $4 \\times 3 = 1.6\\,\\omega_2$ and $\\omega_2 = 7.5$ rad/s.",
      commonMistakes: [
        { answer: 1.2, feedback: "That multiplies by $I_2/I_1$. Smaller $I$ means faster spin, so divide by it." },
        { answer: 4.74, tolerance: 0.01, feedback: "That conserves kinetic energy, $\\omega \\propto 1/\\sqrt I$. Her muscles do work, so $K$ is not conserved; $L$ is." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-2-q2",
      variant: "concept",
      question: "A spinning skater halves her moment of inertia. What happens to her rotational kinetic energy?",
      options: [
        { text: "It doubles", correct: true, feedback: "$K = L^2/2I$ with $L$ fixed, so halving $I$ doubles $K$." },
        { text: "It stays the same", feedback: "That would need no work done, but she pulls her arms in against their outward tendency." },
        { text: "It halves", feedback: "$\\omega$ doubles while $I$ halves, so $\\tfrac12 I\\omega^2$ doubles." },
        { text: "It quadruples", feedback: "$\\omega^2$ quadruples, but $I$ halves. Net factor 2." },
      ],
      hint: "$L = I\\omega$ is conserved, and kinetic energy can be written as $K = \\dfrac{L^2}{2I}$. What happens to $K$ when $I$ halves at fixed $L$?",
    },
    {
      type: "quiz",
      id: "mrg4-2-q3",
      variant: "practice",
      question: "Disc A ($I$) spins at $\\omega_0$ on a frictionless axle. Disc B, with moment of inertia $3I$ and not spinning, is dropped coaxially onto it and they reach a common speed. What fraction of the original kinetic energy is lost?",
      options: [
        { text: "$\\frac14$", feedback: "That is the fraction that **remains**." },
        { text: "$\\frac12$", feedback: "Half is lost only for identical discs." },
        { text: "None, since angular momentum is conserved", feedback: "Friction between the discs turns kinetic energy into heat, even though $L$ is conserved." },
        { text: "$\\frac34$", correct: true, feedback: "$\\omega = \\omega_0/4$, so $K_f = \\tfrac12(4I)\\frac{\\omega_0^2}{16} = \\frac14 K_i$. Three quarters is lost." },
      ],
      hint: "Conserve angular momentum to find the common $\\omega$, then compare $K = \\tfrac12 I\\omega^2$ before and after (Worked example 2).",
    },
    {
      type: "numeric",
      id: "mrg4-2-q4",
      variant: "practice",
      question: "A uniform rod ($M = 3$ kg, $L = 1$ m) hangs from a hinge at its top end. A 1 kg ball of clay moving horizontally at 8 m/s hits the bottom end and sticks. What is the angular speed just after? Give your answer in rad/s.",
      answer: 4,
      unit: "rad/s",
      hint: "The hinge force is impulsive, so linear momentum is not conserved. About which point does it have no torque?",
      solution: "Conserve angular momentum about the hinge. Before: $mvL = 1 \\times 8 \\times 1 = 8$ kg m²/s. After: $I = \\tfrac13 ML^2 + mL^2 = 1 + 1 = 2$ kg m². So $\\omega = 8/2 = 4$ rad/s.",
      commonMistakes: [
        { answer: 2, feedback: "That conserves linear momentum ($(m+M)v' = 8$) and sets $\\omega = v'/L$. The hinge gives an impulse, so $p$ is not conserved." },
        { answer: 6.4, feedback: "That uses the rod's $I$ about its centre, $\\tfrac{1}{12}ML^2$. The rod turns about the hinge at its end." },
        { answer: 8, feedback: "That ignores the rod's inertia: $\\omega = v/L$ with the clay alone." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-2-q5",
      variant: "concept",
      question: "If the Earth shrank to half its radius with no change in mass (staying a uniform sphere), how long would a day be?",
      options: [
        { text: "12 hours", feedback: "$I$ depends on $R^2$, not $R$. Halving $R$ quarters $I$." },
        { text: "6 hours", correct: true, feedback: "$I = \\tfrac25 MR^2$ falls to a quarter, so $\\omega$ quadruples and the period becomes $24/4 = 6$ h." },
        { text: "96 hours", feedback: "A smaller $I$ means faster spin, not slower." },
        { text: "Still 24 hours", feedback: "No external torque, so $I\\omega$ is fixed. $I$ changes, so $\\omega$ must." },
      ],
      hint: "With no external torque, $I\\omega$ is conserved, and for a uniform sphere $I \\propto R^2$. The day length is the period $2\\pi/\\omega$.",
    },
    {
      type: "quiz",
      id: "mrg4-2-q6",
      variant: "practice",
      multiple: true,
      question: "A horizontal platform is spinning freely on a frictionless vertical bearing, with a man standing at its centre. He walks out to the rim. Select all the statements that are correct.",
      options: [
        { text: "The angular momentum of man + platform about the axis is conserved.", correct: true, feedback: "The forces between man and platform are internal, and the bearing exerts no torque about the axis." },
        { text: "The platform's angular speed decreases.", correct: true, feedback: "The man's mass moves away from the axis, so $I$ rises and $\\omega = L/I$ falls." },
        { text: "The kinetic energy of the system decreases.", correct: true, feedback: "$K = L^2/2I$ with $L$ fixed and $I$ larger. The man does negative work resisting being flung outwards." },
        { text: "The kinetic energy stays the same, because no external force does work.", feedback: "Internal forces can do work: his feet push on the platform as he walks. In Worked example 3 the energy halves." },
        { text: "The bearing must exert a torque to slow the platform down.", feedback: "No external torque is needed. The slowing is the redistribution of a fixed $L$ over a larger $I$." },
      ],
      hint: "The bearing is frictionless and vertical, so there is no external torque about the axis. As the man moves out, the system's $I$ grows; use $K = L^2/2I$ for the energy.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "rolling-without-slipping",
  title: "4.3 · Rolling Without Slipping",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Watch a bicycle wheel roll past. The hub glides forward smoothly. The spokes near the top are a blur, while the spokes near the bottom are sharp enough to count. The tyre leaves no skid marks, so the rubber touching the road cannot be sliding. A rolling wheel is doing two things at once, and those two motions combine so that different points move at very different speeds.",
    },
    { type: "heading", text: "Rolling = translation + rotation" },
    {
      type: "text",
      content:
        "Every point of the wheel shares the centre's velocity $\\vec v_{cm}$ and, on top of that, moves round the centre with speed $\\omega r$ perpendicular to its radius:",
    },
    { type: "math", latex: "\\vec v_P = \\vec v_{cm} + \\vec\\omega\\times\\vec r_{P/cm}" },
    {
      type: "text",
      content:
        "For a wheel of radius $R$ moving to the right at $v$ and turning clockwise at $\\omega$: the bottom point has $v$ forwards from translation and $\\omega R$ backwards from rotation, so $v_{\\text{bottom}} = v - \\omega R$. The top point has both forwards: $v_{\\text{top}} = v + \\omega R$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Rolling without slipping",
      content:
        "A body rolls without slipping when the point in contact with the ground is momentarily at rest:\n$v_{cm} = \\omega R$ (and $a_{cm} = \\alpha R$).\nIf $v_{cm} > \\omega R$ the body skids (the contact point slides forwards); if $v_{cm} < \\omega R$ it wheel-spins (the contact point slides backwards).",
    },
    {
      type: "text",
      content:
        "In the lab below the centre speed $v$ and the spin $\\omega$ (clockwise positive) are separate sliders, so you can make the wheel skid or spin. Start with $\\omega = 0$ (pure sliding) and find the value of $\\omega$ that stops the bottom point.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-rolling-lab",
        mode: "velocities",
        body: "disc",
        radius: 0.5,
        v: { min: -4, max: 4, step: 0.5, initial: 2 },
        omega: { min: -12, max: 12, step: 0.5, initial: 0 },
        lockRolling: false,
        showParts: true,
        showIcr: true,
        showTrace: true,
        caption:
          "R = 0.5 m. Each rim arrow is the translation part plus the rotation part. Raise ω until the contact-point readout says pure rolling.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $v = 2$ m/s and $R = 0.5$ m the bottom point stops at $\\omega = 4$ rad/s, exactly $v/R$. At that moment the top point moves at $2v = 4$ m/s, the front and back points at $\\sqrt2 v$, and the instantaneous centre sits at the contact point. The traced rim point draws a **cycloid**, with a sharp cusp each time it touches the ground. Below $4$ rad/s the wheel skids; above it, the wheel spins.",
    },
    { type: "heading", text: "The instantaneous axis" },
    {
      type: "text",
      content:
        "At any instant, a rolling wheel moves exactly as if it were rotating purely about the contact point $P$ with the same $\\omega$. So the speed of any point is $\\omega \\times$ (its distance from $P$), directed perpendicular to the line joining it to $P$. The top is $2R$ from $P$: speed $2\\omega R = 2v$. The front point is $\\sqrt2 R$ from $P$: speed $\\sqrt2 v$, pointing $45^\\circ$ below the horizontal. A rim point whose radius makes angle $\\phi$ with the downward vertical is a chord $2R\\sin\\frac\\phi2$ from $P$, so its speed is $2v\\sin\\frac\\phi2$.",
    },
    { type: "heading", text: "Kinetic energy of rolling" },
    {
      type: "text",
      content:
        "Add the translational and rotational parts, with $\\omega = v/R$ and $I_{cm} = Mk^2$ ($k$ the radius of gyration):",
    },
    {
      type: "math",
      latex: "K = \\tfrac12 Mv^2 + \\tfrac12 Mk^2\\frac{v^2}{R^2} = \\tfrac12 Mv^2\\left(1 + \\frac{k^2}{R^2}\\right)",
    },
    {
      type: "text",
      content:
        "The same answer comes from pure rotation about the contact point: $K = \\tfrac12 I_P\\omega^2$ with $I_P = I_{cm} + MR^2$ (parallel axes). The fraction of the energy that is rotational is $\\dfrac{k^2/R^2}{1 + k^2/R^2}$: $\\tfrac12$ for a ring, $\\tfrac13$ for a disc, $\\tfrac27$ for a solid sphere, $\\tfrac25$ for a hollow sphere.",
    },
    {
      type: "table",
      headers: ["Body", "$k^2/R^2$", "$K / \\tfrac12Mv^2$", "Rotational share of $K$"],
      rows: [
        ["ring / thin hollow cylinder", "$1$", "$2$", "$\\tfrac12$"],
        ["disc / solid cylinder", "$\\tfrac12$", "$\\tfrac32$", "$\\tfrac13$"],
        ["hollow sphere", "$\\tfrac23$", "$\\tfrac53$", "$\\tfrac25$"],
        ["solid sphere", "$\\tfrac25$", "$\\tfrac75$", "$\\tfrac27$"],
      ],
    },
    {
      type: "worked-example",
      id: "mrg4-3-we1",
      title: "Worked example 1: car tyre",
      problem:
        "A car moves at 72 km/h on tyres of radius 0.3 m, rolling without slipping. Find $\\omega$, and the speeds of the top of the tyre, the contact point, the front point level with the axle and a rim point $60^\\circ$ round from the contact point.",
      steps: [
        { text: "$v = 72 \\times \\frac{5}{18} = 20$ m/s. *Why this step:* SI units before anything else." },
        { text: "$\\omega = v/R = 20/0.3 \\approx 66.7$ rad/s." },
        { text: "Top of the tyre: $2v = 40$ m/s. Contact point: 0. Front point (level with the axle): $\\sqrt2 \\times 20 \\approx 28.3$ m/s." },
        { text: "A rim point $60^\\circ$ round from the contact point: $2v\\sin 30^\\circ = v = 20$ m/s. *Why this step:* its distance from $P$ is the chord $2R\\sin 30^\\circ = R$, and speed is $\\omega$ times that." },
      ],
      answer: "$\\omega \\approx 66.7$ rad/s; top 40 m/s, contact point 0, front point $\\approx 28.3$ m/s, the $60^\\circ$ point 20 m/s.",
    },
    {
      type: "worked-example",
      id: "mrg4-3-we2",
      title: "Worked example 2: energy of a rolling disc",
      problem:
        "A 2 kg uniform disc rolls at 3 m/s. Find its translational, rotational and total kinetic energy.",
      steps: [
        { text: "Translational: $\\tfrac12(2)(9) = 9$ J." },
        { text: "Rotational: $\\tfrac12\\cdot\\tfrac12 MR^2\\cdot\\frac{v^2}{R^2} = \\tfrac14 Mv^2 = 4.5$ J." },
        { text: "Total 13.5 J $= \\tfrac32\\times 9$. ✓ Check with $I_P = \\tfrac32 MR^2$: $\\tfrac12\\cdot\\tfrac32 MR^2\\cdot\\frac{v^2}{R^2} = \\tfrac34(2)(9) = 13.5$ J." },
      ],
      answer: "9 J translational, 4.5 J rotational, 13.5 J in total.",
    },
    {
      type: "worked-example",
      id: "mrg4-3-we3",
      title: "Worked example 3: a point inside the wheel",
      problem:
        "A disc of radius 0.5 m rolls at 4 m/s. How fast is the point halfway between the centre and the top moving?",
      steps: [
        { text: "$\\omega = 4/0.5 = 8$ rad/s." },
        { text: "The point is $0.75$ m above the contact point, directly above it. *Why this step:* using the contact point as the instantaneous axis turns the vector sum into a single multiplication." },
        { text: "Speed $= 8 \\times 0.75 = 6$ m/s, horizontal. Check by parts: $v + \\omega(0.25) = 4 + 2 = 6$. ✓" },
      ],
      answer: "6 m/s, horizontal.",
    },
    {
      type: "text",
      content: "Now lock the wheel into pure rolling. Only $v$ is a slider; $\\omega = v/R$ follows automatically.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-rolling-lab",
        mode: "velocities",
        body: "solid-sphere",
        radius: 0.5,
        v: { min: -4, max: 4, step: 0.5, initial: 2 },
        lockRolling: true,
        showParts: true,
        showIcr: true,
        showTrace: true,
        caption: "Pure rolling: the contact point is always at rest, and every velocity arrow is perpendicular to the line to the contact point.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: every rim arrow is perpendicular to the line from the contact point, with length proportional to the distance from it. The KE readout shows the rotational share fixed at $\\tfrac27$ for the solid sphere whatever the speed, since it depends only on $k^2/R^2$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the contact point moves forward at $v$\"",
      content:
        "In rolling without slipping the contact point is **at rest** at each instant: translation carries it forward at $v$ and rotation carries it backward at $\\omega R = v$. That is why rolling tyres leave no skid marks and why static (not kinetic) friction acts there. The contact point is a different piece of rubber from one instant to the next.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the top of a wheel moves at the same speed as the centre\"",
      content:
        "The top moves at $2v$, twice as fast as the centre. Photographs of moving bicycles show blurred upper spokes and sharp lower ones for exactly this reason.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mrg4-3-q1",
      variant: "practice",
      question: "A wheel rolls without slipping; its centre moves at 5 m/s. How fast is the topmost point moving?",
      options: [
        { text: "$10$ m/s", correct: true, feedback: "Translation $v$ plus rotation $\\omega R = v$, both forwards: $2v$." },
        { text: "$5$ m/s", feedback: "That is the centre. The top also has the rotation part, forwards." },
        { text: "$0$", feedback: "That is the contact point at the bottom." },
        { text: "$7.07$ m/s", feedback: "That is $\\sqrt2 v$, the speed of the front and back points." },
      ],
      hint: "The velocity of any point is $\\vec v_{cm} + \\vec\\omega\\times\\vec r$. At the top, the rotational part points the same way as the centre's velocity, with size $\\omega R = v$.",
    },
    {
      type: "quiz",
      id: "mrg4-3-q2",
      variant: "concept",
      question: "For a wheel rolling to the right without slipping, what is the velocity of the rim point level with the axle, at the front?",
      options: [
        { text: "$\\sqrt2 v$, directed $45^\\circ$ above the horizontal", feedback: "That is the back point. At the front, clockwise rotation moves the rim downwards." },
        { text: "$v$ horizontally", feedback: "That leaves out the rotation part, which is vertical at this point." },
        { text: "$2v$ horizontally", feedback: "That is the top point." },
        { text: "$\\sqrt2 v$, directed $45^\\circ$ below the horizontal", correct: true, feedback: "Translation $v$ forwards plus rotation $v$ downwards (clockwise spin), at right angles." },
      ],
      hint: "Add the centre's velocity $v$ (horizontal) to the rotational velocity $\\omega R = v$ at that point. For clockwise rolling, which way does the front point move in pure rotation?",
    },
    {
      type: "numeric",
      id: "mrg4-3-q3",
      variant: "practice",
      question: "A uniform disc of mass 2 kg rolls without slipping at 3 m/s. What is its total kinetic energy? Give your answer in joules.",
      answer: 13.5,
      tolerance: 0.01,
      unit: "J",
      hint: "Add translational and rotational parts, or use $K = \\tfrac12 Mv^2(1 + k^2/R^2)$.",
      solution: "For a disc $k^2/R^2 = \\tfrac12$. Translational: $\\tfrac12 \\times 2 \\times 9 = 9$ J; rotational: $\\tfrac12 \\times 9 = 4.5$ J. Total $K = 9 \\times 1.5 = 13.5$ J.",
      commonMistakes: [
        { answer: 9, feedback: "That is only the translational part." },
        { answer: 18, feedback: "That is a ring ($k^2/R^2 = 1$). A disc has $k^2/R^2 = \\tfrac12$." },
        { answer: 12.6, feedback: "That is a solid sphere ($k^2/R^2 = \\tfrac25$)." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-3-q4",
      variant: "practice",
      question: "What fraction of a rolling solid sphere's kinetic energy is rotational?",
      options: [
        { text: "$\\frac25$", feedback: "That is $k^2/R^2$, the ratio of rotational to *translational* KE. The fraction of the total is $\\frac{2/5}{7/5}$." },
        { text: "$\\frac27$", correct: true, feedback: "$\\frac{2/5}{1 + 2/5} = \\frac{2/5}{7/5} = \\frac27$." },
        { text: "$\\frac12$", feedback: "That is a ring, where all the mass is at radius $R$." },
        { text: "$\\frac57$", feedback: "That is the translational fraction." },
      ],
      hint: "Write $K = \\tfrac12 Mv^2 + \\tfrac12 I\\omega^2$ with $I = \\tfrac25 MR^2$ and $\\omega = v/R$, then take the rotational part as a fraction of the total.",
    },
    {
      type: "numeric",
      id: "mrg4-3-q5",
      variant: "practice",
      question: "A disc of radius 0.5 m rolls without slipping at 4 m/s. How fast is the point halfway between the centre and the top moving? Give your answer in m/s.",
      answer: 6,
      unit: "m/s",
      hint: "Treat the contact point as the instantaneous axis: speed $= \\omega \\times$ distance from it.",
      solution: "$\\omega = v/R = 4/0.5 = 8$ rad/s. The point is $0.5 + 0.25 = 0.75$ m above the contact point, so its speed is $8 \\times 0.75 = 6$ m/s. Check by parts: $v + \\omega(0.25) = 4 + 2 = 6$ m/s.",
      commonMistakes: [
        { answer: 2, feedback: "That is only the rotation part $\\omega \\times 0.25$. Add the translation $v$." },
        { answer: 4, feedback: "That is the centre's speed. Points above the centre move faster." },
        { answer: 8, feedback: "That is the top point, 1 m above the contact point." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-3-q6",
      variant: "practice",
      multiple: true,
      question: "A wheel of radius $R$ rolls without slipping, its centre moving at $v$. Select all the statements that are correct.",
      options: [
        { text: "The point in contact with the ground is momentarily at rest.", correct: true, feedback: "Translation carries it forwards at $v$ and rotation backwards at $\\omega R = v$." },
        { text: "The topmost point moves at $2v$.", correct: true, feedback: "Both parts point forwards at the top: $v + \\omega R = 2v$." },
        { text: "Every point's velocity is perpendicular to the line joining it to the contact point.", correct: true, feedback: "At each instant the wheel turns about the contact point, so every velocity is perpendicular to its radius from that point." },
        { text: "Every rim point moves at speed $v$.", feedback: "Rim speeds range from 0 at the contact point to $2v$ at the top: $2v\\sin\\frac\\phi2$." },
        { text: "The angular speed is $\\omega = 2v/R$, because the top moves at $2v$.", feedback: "$\\omega = v/R$. The top is $2R$ from the contact point, which is why it moves at $\\omega \\cdot 2R = 2v$." },
      ],
      hint: "Use the instantaneous axis through the contact point: the wheel momentarily rotates about it at $\\omega = v/R$. Test each statement using that picture.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "rolling-down-an-incline",
  title: "4.4 · Rolling Down an Incline",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Line up a ring, a disc, a hollow ball and a solid ball at the top of a ramp and let them go together. Most people bet on the heaviest, or the biggest. Neither matters. The same body wins every time, and the order can be predicted before the race with one number per body.",
    },
    { type: "heading", text: "Deriving the acceleration down the slope" },
    {
      type: "text",
      content:
        "**Derivation 1: forces and torques.** A body of mass $M$, radius $R$ and $I_{cm} = Mk^2$ rolls without slipping down a slope at angle $\\theta$. Along the slope (down +): gravity $Mg\\sin\\theta$ and static friction $f$ up the slope.",
    },
    {
      type: "math",
      latex: "Mg\\sin\\theta - f = Ma, \\qquad fR = I_{cm}\\alpha = Mk^2\\frac{a}{R}",
    },
    {
      type: "text",
      content:
        "The torque equation is about the centre of mass (allowed, Lesson 3.2); only friction has a torque there, because gravity acts at the centre and the normal force points through it. The rolling constraint $a = \\alpha R$ links the two. From the second equation $f = Ma\\,\\frac{k^2}{R^2}$; substitute into the first:",
    },
    {
      type: "math",
      latex: "a = \\frac{g\\sin\\theta}{1 + k^2/R^2}, \\qquad f = \\frac{Mg\\sin\\theta\\,(k^2/R^2)}{1 + k^2/R^2}",
    },
    {
      type: "text",
      content:
        "**Derivation 2: energy.** Static friction acts at a point that is momentarily at rest, so it does **no work**. Mechanical energy is conserved. Falling a height $h$ from rest:",
    },
    {
      type: "math",
      latex: "Mgh = \\tfrac12 Mv^2\\left(1 + \\frac{k^2}{R^2}\\right) \\;\\Rightarrow\\; v^2 = \\frac{2gh}{1 + k^2/R^2}",
    },
    {
      type: "text",
      content:
        "Both answers depend only on $g$, $\\theta$ (or $h$) and the **shape number** $k^2/R^2$. Mass and radius cancel. A body that keeps more of its mass near the rim (larger $k^2/R^2$) must put more of its energy into spin, leaving less for forward motion, so it is slower.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Rolling down an incline",
      content:
        "$a = \\dfrac{g\\sin\\theta}{1 + k^2/R^2}$, $\\quad v^2 = \\dfrac{2gh}{1 + k^2/R^2}$, $\\quad f = \\dfrac{Mg\\sin\\theta\\,(k^2/R^2)}{1 + k^2/R^2}$ (up the slope).\nPure rolling needs $f \\le \\mu Mg\\cos\\theta$, i.e. $\\mu \\ge \\mu_{\\min} = \\dfrac{\\tan\\theta\\,(k^2/R^2)}{1 + k^2/R^2}$.\nRace order (fastest first): frictionless sliding block, solid sphere ($\\tfrac25$), disc ($\\tfrac12$), hollow sphere ($\\tfrac23$), ring ($1$).",
    },
    { type: "heading", text: "The rolling race" },
    {
      type: "text",
      content:
        "Run the race. The slope is 7 m long; change the angle and watch whether the order ever changes.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-rolling-lab",
        mode: "incline",
        bodies: ["ring", "disc", "solid-sphere", "hollow-sphere", "sliding-block"],
        angle: { min: 10, max: 60, step: 5, initial: 30 },
        length: 7,
        caption: "Five bodies released together on a 7 m slope (rough enough to roll; the block slides without friction). Press Play.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the frictionless block wins, then the solid sphere, disc, hollow sphere and ring, at every angle. At $30^\\circ$ the times are about 1.67 s, 1.98 s, 2.05 s, 2.16 s and 2.37 s. Steeper slopes shorten every time but never reorder them, because every $a$ carries the same factor $g\\sin\\theta$.",
    },
    {
      type: "text",
      content:
        "Take $g = 10$ m/s² in this lesson.",
    },
    {
      type: "worked-example",
      id: "mrg4-4-we1",
      title: "Worked example 1: solid sphere, JEE Main",
      problem:
        "A solid sphere rolls from rest down a $30^\\circ$ slope 7 m long. Find its acceleration, final speed and time.",
      steps: [
        { text: "$k^2/R^2 = \\tfrac25$, so $a = \\dfrac{10 \\times \\tfrac12}{7/5} = \\dfrac{25}{7} \\approx 3.57$ m/s²." },
        { text: "$v^2 = 2as = 2 \\times \\tfrac{25}{7} \\times 7 = 50$, so $v = \\sqrt{50} \\approx 7.07$ m/s. *Why this step:* constant acceleration from rest; energy gives the same: $h = 3.5$ m, $v^2 = \\frac{2(10)(3.5)}{1.4} = 50$." },
        { text: "$t = v/a = 7.07 \\times \\tfrac{7}{25} \\approx 1.98$ s." },
      ],
      answer: "$a = \\frac{25}{7} \\approx 3.57$ m/s², $v = \\sqrt{50} \\approx 7.07$ m/s, $t \\approx 1.98$ s.",
    },
    {
      type: "worked-example",
      id: "mrg4-4-we2",
      title: "Worked example 2: friction needed by a disc",
      problem:
        "A uniform disc rolls down a $30^\\circ$ incline. Find its acceleration, the friction force on it, and the least coefficient of friction that lets it roll without slipping.",
      steps: [
        { text: "$a = \\dfrac{5}{3/2} = \\tfrac{10}{3} \\approx 3.33$ m/s²." },
        { text: "$f = Ma\\,\\frac{k^2}{R^2} = M \\cdot \\tfrac{10}{3} \\cdot \\tfrac12 = \\tfrac53 M$ N, one third of $Mg\\sin\\theta$." },
        { text: "$\\mu_{\\min} = \\dfrac{f}{Mg\\cos\\theta} = \\dfrac{5/3}{10 \\times 0.866} \\approx 0.19$. Equivalently $\\tan 30^\\circ \\times \\tfrac13 = 0.192$. *Why this step:* the friction must be *available*: static friction can supply up to $\\mu N$, no more." },
      ],
      answer: "$a = \\frac{10}{3} \\approx 3.33$ m/s², $f = \\frac53 M$ N, $\\mu_{\\min} \\approx 0.19$.",
    },
    {
      type: "text",
      content:
        "For comparison at $30^\\circ$: solid sphere $\\mu_{\\min} = 0.165$, hollow sphere $0.231$, ring $0.289$.",
    },
    {
      type: "worked-example",
      id: "mrg4-4-we3",
      title: "Worked example 3: rolling up a slope",
      problem:
        "A solid sphere rolling at 7 m/s reaches the foot of a $30^\\circ$ slope and rolls up it. How far up does it go?",
      steps: [
        { text: "Energy: $\\tfrac12 Mv^2 \\cdot \\tfrac75 = Mgh$, so $h = \\dfrac{7 \\times 49}{10 \\times 10} = 3.43$ m." },
        { text: "Distance along the slope: $h/\\sin 30^\\circ = 6.86$ m." },
        { text: "Which way does friction point on the way up? The sphere must slow its spin as it slows down, so it needs a torque against its spin; about the centre only friction can supply it, and for a sphere rolling up that torque requires friction **up the slope**. *Why this step:* friction on a rolling body points wherever the no-slip constraint needs it, not automatically against the motion." },
      ],
      answer: "$h = 3.43$ m, i.e. 6.86 m along the slope; friction acts up the slope.",
    },
    { type: "heading", text: "When friction is not enough" },
    {
      type: "text",
      content:
        "If $\\mu < \\mu_{\\min}$, the body slips: kinetic friction $\\mu Mg\\cos\\theta$ acts, $a = g(\\sin\\theta - \\mu\\cos\\theta)$, and $\\alpha = \\mu Mg\\cos\\theta\\,R/I$. The centre accelerates *faster* than it would when rolling, but kinetic friction now does work, and mechanical energy is lost as heat. Try it: the slider below starts at $\\mu = 0.3$ (everything rolls at $30^\\circ$); lower it to 0.1.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-rolling-lab",
        mode: "incline",
        bodies: ["ring", "disc", "solid-sphere", "hollow-sphere", "sliding-block"],
        angle: { min: 10, max: 60, step: 5, initial: 30 },
        length: 7,
        mu: { min: 0, max: 0.4, step: 0.02, initial: 0.3 },
        caption: "Now friction is finite and the block feels it too. Watch the (slips) flags as μ falls below each body's μ_min.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the ring starts slipping first (below 0.29), then the hollow sphere (0.23), the disc (0.19) and the solid sphere (0.17). Slipping bodies speed up towards the sliding-block time, but their final kinetic energy is less than $Mgh$. At $\\mu = 0$ every body just slides without turning.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the heavier (or bigger) ball wins\"",
      content:
        "Mass and radius cancel from $a = \\frac{g\\sin\\theta}{1 + k^2/R^2}$. A marble and a bowling ball (both solid spheres) tie. Only the shape number $k^2/R^2$ decides the race.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"friction always opposes motion, so it points down the slope\"",
      content:
        "For a body rolling down, static friction points **up** the slope: it is what spins the body up. For a body rolling up, it also points up the slope. Static friction opposes relative *slipping* at the contact point, and it takes whatever direction and size the rolling constraint demands (up to $\\mu N$). Because the contact point does not move, it does no work.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mrg4-4-q1",
      variant: "concept",
      question: "A ring, a disc, a hollow sphere and a solid sphere of different masses and radii roll from rest down the same slope. In what order do they reach the bottom?",
      options: [
        { text: "Solid sphere, disc, hollow sphere, ring", correct: true, feedback: "Smallest $k^2/R^2$ first: $\\tfrac25 < \\tfrac12 < \\tfrac23 < 1$." },
        { text: "It depends on their masses", feedback: "Mass cancels from $a = \\frac{g\\sin\\theta}{1 + k^2/R^2}$." },
        { text: "Ring, hollow sphere, disc, solid sphere", feedback: "Reversed. Mass at the rim (large $k^2/R^2$) takes energy into spin and slows the body." },
        { text: "All together", feedback: "That is true only without rotation (frictionless sliding)." },
      ],
      hint: "The rolling acceleration is $a = \\dfrac{g\\sin\\theta}{1 + I/MR^2}$. Mass and radius cancel; only the shape factor $I/MR^2$ matters.",
    },
    {
      type: "numeric",
      id: "mrg4-4-q2",
      variant: "practice",
      question: "A uniform disc rolls without slipping down a $30^\\circ$ incline. Take $g = 10$ m/s². What is its acceleration? Give your answer in m/s².",
      answer: 3.333,
      relTolerance: 0.01,
      unit: "m/s²",
      hint: "$a = \\dfrac{g\\sin\\theta}{1 + k^2/R^2}$. What is $k^2/R^2$ for a disc?",
      solution: "For a disc $k^2/R^2 = \\tfrac12$, so $a = \\dfrac{10 \\times \\tfrac12}{1 + \\tfrac12} = \\dfrac{5}{1.5} = \\dfrac{10}{3} \\approx 3.33$ m/s².",
      commonMistakes: [
        { answer: 5, feedback: "That is $g\\sin\\theta$, a frictionless slide. Rolling bodies are slower." },
        { answer: 2.5, feedback: "That is a ring ($k^2/R^2 = 1$)." },
        { answer: 3.571, feedback: "That is a solid sphere ($k^2/R^2 = \\tfrac25$)." },
      ],
    },
    {
      type: "numeric",
      id: "mrg4-4-q3",
      variant: "practice",
      question: "A thin hollow sphere rolls from rest down a slope, dropping a height of 5 m. Take $g = 10$ m/s². What is its speed at the bottom? Give your answer in m/s.",
      answer: 7.746,
      relTolerance: 0.01,
      unit: "m/s",
      hint: "Static friction does no work, so $Mgh = \\tfrac12 Mv^2(1 + k^2/R^2)$.",
      solution: "For a thin hollow sphere $k^2/R^2 = \\tfrac23$. Energy: $v^2 = \\dfrac{2gh}{1 + 2/3} = \\dfrac{100}{5/3} = 60$, so $v = \\sqrt{60} \\approx 7.75$ m/s.",
      commonMistakes: [
        { answer: 10, feedback: "That is $\\sqrt{2gh}$, which forgets the rotational energy." },
        { answer: 8.452, feedback: "That is a solid sphere. A hollow sphere has $k^2/R^2 = \\tfrac23$." },
        { answer: 7.071, feedback: "That is a ring ($k^2/R^2 = 1$)." },
        { answer: 60, feedback: "That is $v^2$. Take the square root." },
      ],
    },
    {
      type: "numeric",
      id: "mrg4-4-q4",
      variant: "practice",
      question: "What is the minimum coefficient of friction for a ring to roll without slipping down a $45^\\circ$ incline? Give your answer as a decimal.",
      answer: 0.5,
      tolerance: 0.005,
      hint: "$\\mu_{\\min} = \\dfrac{\\tan\\theta\\,(k^2/R^2)}{1 + k^2/R^2}$.",
      solution: "For a ring $k^2/R^2 = 1$, so $\\mu_{\\min} = \\tan 45^\\circ \\times \\dfrac{1}{1 + 1} = 0.5$.",
      commonMistakes: [
        { answer: 1, feedback: "That is $\\tan\\theta$, the value needed to stop a block sliding at all. Rolling needs less." },
        { answer: 0.333, tolerance: 0.005, feedback: "That is a disc: $\\tan 45^\\circ \\times \\frac{1/2}{3/2}$." },
        { answer: 0.289, tolerance: 0.005, feedback: "That is a ring on a $30^\\circ$ slope. Use $\\tan 45^\\circ = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-4-q5",
      variant: "concept",
      question: "A solid ball rolls without slipping **up** an incline, slowing down. In which direction does the static friction on it act?",
      options: [
        { text: "Up the slope", correct: true, feedback: "The spin must decrease along with $v$; up-slope friction at the bottom gives the torque about the centre that reduces the forward spin." },
        { text: "Down the slope, opposing the motion", feedback: "Then friction would *increase* the forward spin while the ball slows down, breaking $v = \\omega R$." },
        { text: "There is no friction when rolling up", feedback: "Without friction the spin would stay constant while $v$ fell, and the ball would start to slip." },
      ],
      hint: "Gravity's component down the slope acts through the centre and cannot change $\\omega$. For the spin to slow down along with $v$, which way must friction's torque about the centre point?",
    },
    {
      type: "quiz",
      id: "mrg4-4-q6",
      variant: "practice",
      question: "A ring and a solid sphere roll from rest down the same incline. What is the ratio of their times, $t_{\\text{ring}} : t_{\\text{sphere}}$?",
      options: [
        { text: "$10/7 \\approx 1.43$", feedback: "That is the ratio of accelerations inverted. Time goes as $1/\\sqrt a$." },
        { text: "$5/2$", feedback: "That is the ratio of $k^2/R^2$ values. The time depends on $1 + k^2/R^2$, and through a square root." },
        { text: "$\\sqrt{10/7} \\approx 1.20$", correct: true, feedback: "$t \\propto \\sqrt{1 + k^2/R^2}$: $\\sqrt{2 / (7/5)} = \\sqrt{10/7}$." },
        { text: "$1$", feedback: "They do not tie: the ring puts half of its energy into spin, the sphere only $\\tfrac27$." },
      ],
      hint: "With $s = \\tfrac12 a t^2$ over the same distance, $t \\propto 1/\\sqrt a$, and $a = \\dfrac{g\\sin\\theta}{1 + k}$ with $k = I/MR^2$. Compare the two values of $1 + k$.",
    },
    {
      type: "quiz",
      id: "mrg4-4-q7",
      variant: "practice",
      multiple: true,
      question: "A solid cylinder rolls without slipping down a fixed rough incline of angle $\\theta$. Select all the statements that are correct.",
      options: [
        { text: "The static friction on it acts up the slope.", correct: true, feedback: "It supplies the torque about the centre that spins the cylinder up as it speeds up." },
        { text: "The friction does no work on it.", correct: true, feedback: "It acts at the contact point, which is momentarily at rest." },
        { text: "Its mechanical energy is conserved.", correct: true, feedback: "Gravity is conservative, the normal force is perpendicular to the motion, and static friction does no work." },
        { text: "Its acceleration is $g\\sin\\theta$.", feedback: "That is a frictionless slide. Rolling gives $\\frac{g\\sin\\theta}{1 + 1/2} = \\tfrac23 g\\sin\\theta$." },
        { text: "The friction force equals $\\mu Mg\\cos\\theta$.", feedback: "That is the *maximum* static friction. Rolling needs only $f = \\tfrac13 Mg\\sin\\theta$, which may be less." },
      ],
      hint: "Rolling without slipping means the contact point is momentarily at rest. Ask what that implies about the kind of friction acting and its work, and get the acceleration from $a = \\frac{g\\sin\\theta}{1 + I/MR^2}$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "rolling-with-slipping",
  title: "4.5 · From Slipping to Rolling",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A bowling ball leaves the bowler's hand sliding, with hardly any spin. For the first few metres it skids down the lane; then, quite suddenly, it grips and rolls. Snooker players make a ball screw back after hitting another; a coin set spinning on a table shoots off sideways. All of these are a body that starts with the \"wrong\" spin for rolling, and kinetic friction fixing it.",
    },
    { type: "heading", text: "What friction does while the body slips" },
    {
      type: "text",
      content:
        "Take a body with $I_{cm} = Mk^2$ launched along a level floor at $v_0$ with spin $\\omega_0$ (clockwise, the forward-rolling sense, positive). If $v > \\omega R$, the contact point slides forwards, so kinetic friction $\\mu Mg$ acts **backwards**. It does two things at once:\n\n- it decelerates the centre: $\\dfrac{dv}{dt} = -\\mu g$;\n- about the centre it gives a torque $\\mu MgR$ in the forward-spin sense: $\\dfrac{d\\omega}{dt} = \\dfrac{\\mu gR}{k^2}$.\n\nSo $v$ falls and $\\omega R$ rises until they meet. At that instant the contact point stops sliding, kinetic friction switches off, and (on level ground) the body rolls on at constant speed.",
    },
    {
      type: "worked-example",
      id: "mrg4-5-we1",
      title: "Worked example 1: the bowling ball, by forces",
      problem:
        "A solid sphere is launched at $v_0 = 7$ m/s with no spin on a floor with $\\mu = 0.2$. Take $g = 10$ m/s². When does it start rolling without slipping, at what speed, and how far does it skid?",
      steps: [
        { text: "Centre: $v = 7 - 2t$ (since $\\mu g = 2$ m/s²)." },
        { text: "Spin: $\\alpha = \\dfrac{\\mu MgR}{\\tfrac25 MR^2} = \\dfrac{5\\mu g}{2R}$, so $\\omega R = \\tfrac52\\mu g\\,t = 5t$." },
        { text: "Pure rolling when $7 - 2t = 5t$: $t = 1$ s. In general $t = \\dfrac{2v_0}{7\\mu g}$." },
        { text: "Final speed $v_f = 7 - 2 = 5$ m/s $= \\tfrac57 v_0$." },
        { text: "Distance skidded: $s = 7(1) - \\tfrac12(2)(1)^2 = 6$ m." },
      ],
      answer: "After $t = 1$ s, at $v_f = 5$ m/s $= \\tfrac57 v_0$, having skidded 6 m.",
    },
    { type: "heading", text: "Angular momentum about the contact point" },
    {
      type: "text",
      content:
        "**The slick route: angular momentum about the contact point.** Friction and the normal force both act **at the contact line**, and gravity and the normal force cancel. So about any fixed point on the floor the external torque is zero, and $L$ about that point is conserved throughout the slipping. Using Lesson 4.1 ($L = MvR + I_{cm}\\omega$ about a ground point):",
    },
    {
      type: "math",
      latex: "Mv_0R + Mk^2\\omega_0 = Mv_fR + Mk^2\\frac{v_f}{R} \\;\\Rightarrow\\; v_f = \\frac{v_0 + (k^2/R^2)\\,\\omega_0R}{1 + k^2/R^2}",
    },
    {
      type: "text",
      content:
        "For the bowling ball ($\\omega_0 = 0$, $k^2/R^2 = \\tfrac25$): $v_f = \\frac{v_0}{7/5} = \\tfrac57 v_0$. ✓ One line, no time, no $\\mu$. The final speed does not depend on $\\mu$ at all; $\\mu$ only controls how long and how far the skid lasts.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Slip to roll on a level floor",
      content:
        "Angular momentum about the contact line is conserved, so $v_f = \\dfrac{v_0 + (k^2/R^2)\\,\\omega_0R}{1 + k^2/R^2}$ (spin $\\omega_0$ positive in the forward-rolling sense).\nFriction does negative work while the body slips, so kinetic energy is lost. Once $v = \\omega R$, kinetic friction stops and the body rolls at constant $v_f$.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-rolling-lab",
        mode: "slip-to-roll",
        body: "solid-sphere",
        radius: 0.5,
        v0: { min: 0, max: 8, step: 0.5, initial: 7 },
        omega0: { min: -20, max: 20, step: 1, initial: 0 },
        muK: { min: 0.1, max: 0.8, step: 0.05, initial: 0.2 },
        caption: "A solid sphere (R = 0.5 m) launched without spin. The graph shows v falling and ωR rising until they meet.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the lines meet at $t^* = 1$ s at 5 m/s. Change $\\mu_k$ and the meeting time changes, but not the final speed, and the readout of $L$ about the contact point stays constant throughout. $K_f/K_i = \\tfrac57$: two sevenths of the energy went into heat.",
    },
    { type: "heading", text: "Spinning rings, backspin and cue strikes" },
    {
      type: "worked-example",
      id: "mrg4-5-we2",
      title: "Worked example 2: a spinning ring set down",
      problem:
        "A ring of radius 0.5 m spinning at $\\omega_0 = 16$ rad/s (in the forward sense) is placed gently on a floor ($v_0 = 0$, $\\mu = 0.2$). Find its final rolling speed, the time taken to reach it and the fraction of kinetic energy lost.",
      steps: [
        { text: "Now the contact point slides **backwards** ($\\omega_0R = 8 > v$), so friction acts **forwards**. It speeds the centre up and slows the spin. *Why this step:* friction opposes the sliding of the contact point, not the motion of the body." },
        { text: "$v_f = \\dfrac{0 + 1\\times 8}{1 + 1} = 4$ m/s $= \\tfrac12\\omega_0R$." },
        { text: "Time: $v = \\mu g t = 2t$ and $\\omega R = 8 - 2t$ (ring: $\\alpha R = \\mu g$); they meet at $t = 2$ s." },
        { text: "Energy: $K_i = \\tfrac12 MR^2\\omega_0^2 = 32M$; $K_f = \\tfrac12 Mv_f^2\\times 2 = 16M$. Half is lost." },
      ],
      answer: "$v_f = 4$ m/s after 2 s; half the kinetic energy is lost.",
    },
    {
      type: "worked-example",
      id: "mrg4-5-we3",
      title: "Worked example 3: backspin that brings the ball back",
      problem:
        "A ring is thrown forward at $v_0 = 4$ m/s with backspin $\\omega_0R = -6$ m/s (spinning the wrong way). Find its final rolling velocity.",
      steps: [
        { text: "Both translation and spin make the contact point slide forwards, so friction acts backwards, slowing the centre and eating into the backspin." },
        { text: "$v_f = \\dfrac{4 + 1\\times(-6)}{2} = -1$ m/s. The negative sign means the ring ends up rolling **back** towards the thrower at 1 m/s." },
        { text: "It returns whenever $(k^2/R^2)|\\omega_0|R > v_0$: the backspin's angular momentum about the floor outweighs the forward motion's." },
      ],
      answer: "$v_f = -1$ m/s: it rolls back towards the thrower at 1 m/s.",
    },
    {
      type: "interactive",
      config: {
        component: "mrg-rolling-lab",
        mode: "slip-to-roll",
        body: "ring",
        radius: 0.5,
        v0: { min: 0, max: 8, step: 0.5, initial: 4 },
        omega0: { min: -20, max: 20, step: 1, initial: -12 },
        muK: { min: 0.1, max: 0.8, step: 0.05, initial: 0.2 },
        caption: "A ring thrown forwards at 4 m/s with 12 rad/s of backspin (ω₀R = −6 m/s). Watch v pass through zero.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $v$ falls through zero and becomes negative while $\\omega R$ climbs from $-6$ towards it; they meet at $-1$ m/s. Reduce the backspin to less than 8 rad/s (e.g. $\\omega_0 = -6$ rad/s, so $\\omega_0R = -3$ m/s) and the ring still ends up rolling forwards, at 0.5 m/s.",
    },
    {
      type: "worked-example",
      id: "mrg4-5-we4",
      title: "Worked example 4: where to strike a ball so it rolls at once",
      problem:
        "A cue gives a solid ball a horizontal impulse $J$ at height $h$ above its centre. Find $h$ for immediate rolling.",
      steps: [
        { text: "Linear: $Mv_0 = J$. Angular about the centre: $I_{cm}\\omega_0 = Jh$, so $\\omega_0 = \\dfrac{Jh}{\\tfrac25 MR^2}$." },
        { text: "Rolling at once needs $\\omega_0R = v_0$: $\\dfrac{JhR}{\\tfrac25 MR^2} = \\dfrac JM$, giving $h = \\tfrac25 R$." },
        { text: "Height above the table: $R + \\tfrac25R = \\tfrac75 R$. Strike lower and the ball skids first; higher and it has topspin and speeds up as it settles." },
      ],
      answer: "$h = \\tfrac25 R$ above the centre, i.e. $\\tfrac75 R$ above the table.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"friction always slows a ball down\"",
      content:
        "Kinetic friction opposes the **sliding of the contact point**. For a body with too little spin (bowling ball) it points backwards and slows the centre. For a body with too much forward spin (ring set down spinning, ball with topspin) it points forwards and *speeds the centre up*. Either way, it drives $v$ and $\\omega R$ towards each other, and it always removes kinetic energy while slipping lasts.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mrg4-5-q1",
      variant: "practice",
      question: "A uniform disc is launched along a rough floor at 6 m/s with no spin. What is its speed once it rolls without slipping?",
      options: [
        { text: "$\\frac{30}{7} \\approx 4.29$ m/s", feedback: "That is the solid-sphere factor $\\tfrac57$. A disc has $k^2/R^2 = \\tfrac12$." },
        { text: "$4$ m/s", correct: true, feedback: "$v_f = \\frac{v_0}{1 + 1/2} = \\frac{6}{1.5} = 4$ m/s." },
        { text: "$3$ m/s", feedback: "That is a ring's factor, $\\tfrac12$." },
        { text: "It depends on $\\mu$", feedback: "Angular momentum about the contact line fixes $v_f$ without $\\mu$. $\\mu$ only sets how long it takes." },
      ],
      hint: "Friction acts at the contact point, so angular momentum about any fixed point on the floor is conserved. Equate $Mv_0R$ to the rolling $L = Mv R + I\\omega$ with $\\omega = v/R$.",
    },
    {
      type: "numeric",
      id: "mrg4-5-q2",
      variant: "practice",
      question: "A solid sphere is launched at 7 m/s with no spin on a floor with $\\mu = 0.1$. Take $g = 10$ m/s². After how long does it start rolling without slipping? Give your answer in seconds.",
      answer: 2,
      unit: "s",
      hint: "Write $v(t)$ and $\\omega R(t)$ while it slips, and set them equal.",
      solution: "While slipping, $v = 7 - \\mu g t = 7 - t$ and $\\omega R = \\tfrac52\\mu g t = 2.5t$. They meet when $7 - t = 2.5t$: $t = 2$ s. In general $t = \\dfrac{2v_0}{7\\mu g} = \\dfrac{14}{7} = 2$ s.",
      commonMistakes: [
        { answer: 1, feedback: "That is for $\\mu = 0.2$. Halving $\\mu$ doubles the time." },
        { answer: 7, feedback: "That is $v_0/(\\mu g)$, the time to stop if it only slid. The spin catches up well before." },
        { answer: 5, feedback: "That is $v_f/(\\mu g)$. Solve $v_0 - \\mu g t = \\tfrac52\\mu g t$." },
      ],
    },
    {
      type: "numeric",
      id: "mrg4-5-q3",
      variant: "practice",
      question: "A ring of radius 0.4 m spinning at 20 rad/s is placed on a rough floor with no forward velocity. What is its final rolling speed? Give your answer in m/s.",
      answer: 4,
      unit: "m/s",
      hint: "Angular momentum about the contact line is conserved while it slips.",
      solution: "Initially $\\omega_0R = 20 \\times 0.4 = 8$ m/s and $v_0 = 0$. With $k^2/R^2 = 1$: $v_f = \\dfrac{v_0 + (k^2/R^2)\\,\\omega_0R}{1 + k^2/R^2} = \\dfrac{0 + 8}{2} = 4$ m/s.",
      commonMistakes: [
        { answer: 8, feedback: "That is $\\omega_0R$, the rim speed. Friction trades half of it for forward motion." },
        { answer: 0, feedback: "Friction pushes the ring forwards here, since its contact point slides backwards." },
        { answer: 2.67, tolerance: 0.01, feedback: "That is a disc's $\\tfrac13\\omega_0R$. A ring has $k^2/R^2 = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-5-q4",
      variant: "concept",
      question: "A ball is sliding forwards with heavy **topspin** ($\\omega R > v$). Which way does kinetic friction act on it, and what does it do to $v$?",
      options: [
        { text: "Backwards, decreasing $v$", feedback: "That is the bowling-ball case, $v > \\omega R$. With topspin the contact point slides the other way." },
        { text: "No friction acts, because the ball is spinning the right way", feedback: "The spin is in the right sense but too large; the contact point is still sliding." },
        { text: "Forwards, increasing $v$ until $v = \\omega R$", correct: true, feedback: "The contact point slides backwards relative to the floor, so friction acts forwards and speeds the centre up." },
      ],
      hint: "Compare the bottom point's velocity, $v - \\omega R$, with zero. Kinetic friction opposes the bottom point's slipping.",
    },
    {
      type: "quiz",
      id: "mrg4-5-q5",
      variant: "practice",
      question: "A uniform disc launched without spin skids until it rolls. What fraction of its initial kinetic energy is lost?",
      options: [
        { text: "$\\frac27$", feedback: "That is the solid sphere's loss. Redo it with $k^2/R^2 = \\tfrac12$." },
        { text: "$\\frac13$", correct: true, feedback: "$v_f = \\tfrac23 v_0$, so $K_f = \\tfrac12 M\\tfrac49 v_0^2 \\times \\tfrac32 = \\tfrac23 K_i$. One third is lost." },
        { text: "$\\frac12$", feedback: "That is the ring set down with pure spin." },
        { text: "None, since friction does no work", feedback: "Static friction on a rolling body does no work. Here the body is slipping, and kinetic friction does." },
      ],
      hint: "Find the final rolling speed from angular momentum about the contact point, then compare the initial KE with $\\tfrac12 Mv^2 + \\tfrac12 I\\omega^2$ at the end.",
    },
    {
      type: "quiz",
      id: "mrg4-5-q6",
      variant: "practice",
      question: "A snooker ball of radius $R$ is struck horizontally by a cue. At what height above the table must the cue hit it so that it rolls without slipping immediately?",
      options: [
        { text: "$R$ (at the centre)", feedback: "A central blow gives no spin at all; the ball skids first." },
        { text: "$\\frac25 R$", feedback: "That is the height above the *centre*. Add $R$ for the height above the table." },
        { text: "$2R$ (at the top)", feedback: "That gives too much topspin ($\\omega_0R = 2.5v_0$); the ball speeds up as it settles." },
        { text: "$\\frac75 R$", correct: true, feedback: "$\\omega_0R = v_0$ needs $\\frac{JhR}{\\frac25 MR^2} = \\frac JM$, so $h = \\tfrac25R$ above the centre, $\\tfrac75R$ above the table." },
      ],
      hint: "For immediate rolling the blow must give $\\omega = v/R$ at once. Write the linear impulse $J = Mv$ and the angular impulse about the centre, then solve for the height.",
    },
    {
      type: "quiz",
      id: "mrg4-5-q7",
      variant: "practice",
      multiple: true,
      question: "A solid sphere is launched along a rough level floor at $v_0$ with no spin. While it is still slipping, select all the statements that are correct.",
      options: [
        { text: "Kinetic friction on it acts backwards.", correct: true, feedback: "$v > \\omega R$, so the contact point slides forwards and friction opposes that." },
        { text: "Its angular momentum about a fixed point on the floor is conserved.", correct: true, feedback: "Friction and the normal force act at floor level and gravity balances the normal force, so the net torque about any floor point is zero." },
        { text: "The speed it finally rolls at does not depend on $\\mu$.", correct: true, feedback: "Conserving $L$ about the floor gives $v_f = \\tfrac57 v_0$ with no $\\mu$; $\\mu$ only sets how long the skid lasts." },
        { text: "Its kinetic energy is conserved.", feedback: "Kinetic friction does negative work while the contact point slides; $\\tfrac27$ of the energy becomes heat." },
        { text: "Its angular momentum about its own centre is conserved.", feedback: "Friction has a torque $\\mu MgR$ about the centre; that torque is what builds up the spin." },
      ],
      hint: "While slipping, kinetic friction acts at the contact point and opposes the bottom point's slip. Ask which point friction exerts no torque about, and what kinetic friction does to energy.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "impulse-on-rigid-bodies",
  title: "4.6 · Angular Impulse and Impulses on Rigid Bodies",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Hit a cricket ball with the middle of the bat and it flies; hit it near the handle and your hands sting. Tap a pencil lying on a smooth desk at its centre and it slides straight; tap it at one end and it slides *and* spins, and one point near the far end hardly moves at all. A sudden blow on an extended body does two jobs at once, and this lesson separates them.",
    },
    { type: "heading", text: "Angular impulse" },
    {
      type: "text",
      content:
        "Integrate $\\tau = dL/dt$ over the short time of a blow, exactly as $F = dp/dt$ gave $J = \\Delta p$ in Chapter 1:",
    },
    { type: "math", latex: "\\int\\tau\\,dt = \\Delta L" },
    {
      type: "text",
      content:
        "If a force with impulse $J$ acts along a line at perpendicular distance $d$ from a point, its angular impulse about that point is $Jd$. So a single blow on a free rigid body gives",
    },
    {
      type: "math",
      latex: "M\\,\\Delta v_{cm} = J \\qquad\\text{and}\\qquad I_{cm}\\,\\Delta\\omega = J d \\quad(d = \\text{distance of the blow's line from the COM})",
    },
    {
      type: "callout",
      variant: "definition",
      title: "A blow on a free rigid body",
      content:
        "An impulse $J$ whose line of action passes a distance $d$ from the centre of mass gives\n$v_{cm} = \\dfrac JM$ (independent of where the blow lands) and $\\omega = \\dfrac{Jd}{I_{cm}}$.\nDuring the blow, finite forces such as gravity and friction are negligible; only impulsive forces count.",
    },
    { type: "heading", text: "A rod struck off-centre" },
    {
      type: "worked-example",
      id: "mrg4-6-we1",
      title: "Worked example 1: a rod struck at one end, JEE Main",
      problem:
        "A uniform rod of mass 2 kg and length 1.2 m lies on a smooth horizontal table. It is struck at one end with an impulse of 3 N s perpendicular to the rod. Find $v_{cm}$, $\\omega$, the speeds of both ends, the point momentarily at rest and the kinetic energy given to the rod.",
      steps: [
        { text: "$v_{cm} = J/M = 1.5$ m/s. *Why this step:* the linear impulse equation doesn't care where the blow lands." },
        { text: "$I_{cm} = \\tfrac{1}{12}ML^2 = 0.24$ kg m² and $d = L/2 = 0.6$ m, so $\\omega = \\dfrac{3 \\times 0.6}{0.24} = 7.5$ rad/s. In general $\\omega = \\dfrac{6J}{ML}$." },
        { text: "Velocity of a point at distance $x$ from the centre towards the struck end: $v(x) = 1.5 + 7.5x$. The struck end moves at $1.5 + 4.5 = 6$ m/s; the far end at $1.5 - 4.5 = -3$ m/s (backwards)." },
        { text: "The point at rest: $1.5 + 7.5x = 0$ gives $x = -0.2$ m, i.e. $L/6$ beyond the centre, or $0.8$ m $= \\tfrac23 L$ from the struck end." },
        { text: "Energy: $\\tfrac12(2)(1.5)^2 + \\tfrac12(0.24)(7.5)^2 = 2.25 + 6.75 = 9$ J. A central blow of the same size would give only 2.25 J." },
      ],
      answer: "$v_{cm} = 1.5$ m/s, $\\omega = 7.5$ rad/s; ends at 6 m/s and $-3$ m/s; at rest 0.8 m from the struck end; $K = 9$ J.",
    },
    {
      type: "text",
      content:
        "The graph shows the velocity profile $v(x)$ along a rod 6 m long ($x$ from $-3$ to $3$ m, centre at 0) with $J/M = 1$ m/s and $I_{cm}/M = 3$ m². The slider $d$ is where along the rod the blow lands, measured from the centre; then $\\omega = d/3$ rad/s.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "1",
        baseLatex: "\\text{central blow}",
        expr: "1 + (d/3)*x",
        exprLatex: "v(x) = \\frac{J}{M} + \\omega x",
        params: [{ name: "d", min: 0, max: 3, step: 0.25, initial: 3 }],
        window: { xmin: -3, xmax: 3, ymin: -1, ymax: 3 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: every profile passes through $v = 1$ at the centre (same $v_{cm}$, whatever $d$). A blow at the end ($d = 3$) tilts the line so it crosses zero at $x = -1$, which is $L/6$ past the centre: the instantaneous rest point. Move the blow towards the centre and the rest point slides off the far end of the rod: then no point of the rod is momentarily at rest.",
    },
    { type: "heading", text: "Centre of percussion" },
    {
      type: "text",
      content:
        "Now hinge the rod at one end and strike it a distance $y$ from the hinge. For which $y$ does the hinge feel **no** impulse? With no hinge impulse the rod behaves as if free, so its motion must also be a rotation about the hinge:\n\n1. Linear: $J = Mv_{cm} = M\\omega\\frac L2$.\n2. Angular about the hinge: $Jy = I_{\\text{hinge}}\\,\\omega = \\tfrac13 ML^2\\omega$.\n3. Divide: $y = \\dfrac{\\tfrac13 ML^2}{M L/2} = \\tfrac23 L$.\n\nThis point is the **centre of percussion**: it is exactly where, in example 1, a blow at the other end left the point $\\tfrac23 L$ from it at rest. A cricket bat held at the handle has its \"sweet spot\" near this point, so the hands feel no jar.",
    },
    { type: "heading", text: "Collisions with rods and ledges" },
    {
      type: "worked-example",
      id: "mrg4-6-we2",
      title: "Worked example 2: ball sticks to a rod on a smooth table, JEE Advanced",
      problem:
        "A uniform rod ($M = 3$ kg, $L = 1$ m) lies at rest on a smooth horizontal table. A 1 kg ball moving at 4 m/s perpendicular to the rod hits one end and sticks. Find the velocity of the combined COM and the angular velocity after the impact.",
      steps: [
        { text: "No hinge, no friction: both linear momentum and angular momentum (about any fixed point) are conserved during the collision." },
        { text: "Linear: $1 \\times 4 = 4v_{cm}$, so the combined COM moves at 1 m/s." },
        { text: "Where is the new COM? From the rod's centre towards the ball's end: $\\frac{1 \\times 0.5}{4} = 0.125$ m. *Why this step:* taking angular momentum about the point that will be the combined COM makes the final $L$ just $I_{cm}\\omega$." },
        { text: "Angular momentum of the ball about that point (lever arm $0.5 - 0.125 = 0.375$ m): $1 \\times 4 \\times 0.375 = 1.5$ kg m²/s." },
        { text: "$I$ about the new COM: rod $\\tfrac{1}{12}(3)(1)^2 + 3(0.125)^2 = 0.296875$; ball $1(0.375)^2 = 0.140625$; total $0.4375 = \\tfrac{7}{16}$ kg m²." },
        { text: "$\\omega = \\dfrac{1.5}{7/16} = \\dfrac{24}{7} \\approx 3.43$ rad/s." },
      ],
      answer: "$v_{cm} = 1$ m/s and $\\omega = \\frac{24}{7} \\approx 3.43$ rad/s.",
    },
    {
      type: "worked-example",
      id: "mrg4-6-we3",
      title: "Worked example 3: a block hits a small ledge",
      problem:
        "A cube of side $a = 0.3$ m slides on a smooth floor at speed $v$ and hits a small ledge at its front bottom edge, which stops that edge dead. What is the least $v$ for which the cube tips over? Take $g = 10$ m/s².",
      steps: [
        { text: "During the impact the ledge's impulsive force acts at the edge, so angular momentum about the edge is conserved. Before: $Mv\\cdot\\frac a2$ (COM at height $a/2$)." },
        { text: "After: rotation about the edge with $I_{\\text{edge}} = \\tfrac16 Ma^2 + M\\frac{a^2}{2} = \\tfrac23 Ma^2$. So $\\omega = \\dfrac{3v}{4a}$." },
        { text: "To tip over, the COM must rise from $\\frac a2$ to $\\frac{a}{\\sqrt2}$ (directly above the edge): $\\tfrac12 I_{\\text{edge}}\\omega^2 \\ge Mg\\frac{a}{2}(\\sqrt2 - 1)$. *Why this step:* after the impact only gravity does work, so energy is conserved from here on." },
        { text: "$\\tfrac12\\cdot\\tfrac23 Ma^2\\cdot\\dfrac{9v^2}{16a^2} = \\tfrac{3}{16}Mv^2$, so $v^2 \\ge \\tfrac83 ga(\\sqrt2 - 1) = 3.31$, i.e. $v \\ge 1.82$ m/s." },
      ],
      answer: "$v \\ge 1.82$ m/s.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"an off-centre blow gives the body less linear speed than a central one\"",
      content:
        "The same impulse $J$ always gives the same $v_{cm} = J/M$, wherever it lands. An off-centre blow gives the spin *in addition*, so it actually delivers **more** kinetic energy (9 J against 2.25 J in example 1). The extra energy comes from the striker, who pushes against a point that moves away faster.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mrg4-6-q1",
      variant: "practice",
      question: "A uniform rod (mass 2 kg, length 1.2 m) on a smooth table receives an impulse of 3 N s at one end, perpendicular to the rod. What is its angular speed just after? Give your answer in rad/s.",
      answer: 7.5,
      tolerance: 0.01,
      unit: "rad/s",
      hint: "A free rod turns about its COM: $I_{cm}\\,\\omega = J d$ with $d$ the blow's distance from the COM.",
      solution: "$I_{cm} = \\tfrac{1}{12}ML^2 = \\tfrac{1}{12} \\times 2 \\times 1.44 = 0.24$ kg m² and $d = L/2 = 0.6$ m. So $\\omega = \\dfrac{Jd}{I_{cm}} = \\dfrac{3 \\times 0.6}{0.24} = 7.5$ rad/s.",
      commonMistakes: [
        { answer: 1.875, feedback: "That uses $I$ about the end. A free rod turns about its COM, so use $I_{cm} = \\tfrac{1}{12}ML^2$." },
        { answer: 15, feedback: "That uses a lever arm of $L$. The blow is $L/2$ from the COM." },
        { answer: 2.5, feedback: "That assumes the far end stays at rest ($v_{cm}/(L/2)$). The rest point is $\\tfrac23 L$ from the struck end, not at the far end." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-6-q2",
      variant: "practice",
      question: "A uniform rod 1.5 m long lying on a smooth table is struck perpendicularly at one end. Which point of the rod is momentarily at rest just after the blow?",
      options: [
        { text: "The far end, 1.5 m from the struck end", feedback: "The far end actually moves backwards at $2v_{cm}$ (since $\\omega\\frac L2 = 3v_{cm}$)." },
        { text: "The point 1.0 m from the struck end", correct: true, feedback: "The rest point is $\\tfrac23 L = 1.0$ m from the struck end ($L/6$ beyond the centre)." },
        { text: "The centre, 0.75 m from the struck end", feedback: "The centre moves at $J/M$; it is never at rest after a blow." },
        { text: "The point 0.5 m from the struck end", feedback: "That is $\\tfrac13 L$. The rest point is on the far side of the centre." },
      ],
      hint: "Just after the blow, $v_{cm} = J/M$ and $\\omega = \\dfrac{J(L/2)}{ML^2/12}$. Find where on the rod the rotational velocity cancels $v_{cm}$ (Worked example 1).",
    },
    {
      type: "quiz",
      id: "mrg4-6-q3",
      variant: "concept",
      multiple: true,
      question: "Two identical rods on a smooth table receive equal impulses $J$ perpendicular to their length, one at the centre and one at an end. Select all the statements that are correct.",
      options: [
        { text: "Both centres of mass move off at the same speed, $J/M$.", correct: true, feedback: "Linear impulse fixes $v_{cm} = J/M$ regardless of where the blow lands." },
        { text: "The end-struck rod has more kinetic energy.", correct: true, feedback: "It has the same translational KE plus rotational KE on top." },
        { text: "The end-struck rod has four times the kinetic energy of the centre-struck rod.", correct: true, feedback: "$\\omega = 6J/ML$ gives rotational KE $\\tfrac12 \\cdot \\tfrac{1}{12}ML^2 \\cdot \\frac{36J^2}{M^2L^2} = \\frac{3J^2}{2M}$, three times the translational $\\frac{J^2}{2M}$: four times in total." },
        { text: "The end-struck rod has smaller $v_{cm}$, because part of the impulse goes into spin.", feedback: "Impulse is not shared out. All of $J$ changes $p$, and $Jd$ separately changes $L$." },
        { text: "The centre-struck rod also starts to spin.", feedback: "A blow through the COM has no lever arm about it ($d = 0$), so it gives no spin." },
      ],
      hint: "Linear impulse gives $Mv_{cm} = J$ wherever it acts; angular impulse about the COM gives $I\\omega = J\\,d$. Compute the KE in each case as translational plus rotational.",
    },
    {
      type: "numeric",
      id: "mrg4-6-q4",
      variant: "practice",
      question: "A uniform rod 1.2 m long hangs from a hinge at its top end. How far below the hinge should it be struck horizontally so that the hinge feels no impulsive reaction? Give your answer in metres.",
      answer: 0.8,
      tolerance: 0.01,
      unit: "m",
      hint: "With no hinge impulse: $J = M\\omega\\frac L2$ (linear) and $Jy = \\tfrac13 ML^2\\omega$ (about the hinge).",
      solution: "Dividing the two equations, $y = \\dfrac{\\tfrac13 ML^2}{ML/2} = \\tfrac23 L = \\tfrac23 \\times 1.2 = 0.8$ m: the centre of percussion.",
      commonMistakes: [
        { answer: 0.6, feedback: "That is the COM. A blow there would push the whole rod sideways, and the hinge would have to hold the top back." },
        { answer: 1.2, feedback: "That is the bottom end. Below the centre of percussion the top would try to move backwards, and the hinge would push it forwards." },
        { answer: 0.4, feedback: "That is $\\tfrac13 L$. Solve $J = M\\omega\\frac L2$ with $Jy = \\tfrac13 ML^2\\omega$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-6-q5",
      variant: "practice",
      question: "A 1 kg ball moving at 4 m/s hits the end of a 3 kg rod at rest on a smooth table, perpendicular to the rod, and sticks. What is the speed of the combined centre of mass afterwards?",
      options: [
        { text: "$4$ m/s", feedback: "That is the ball's original speed. The rod shares the momentum." },
        { text: "$1.33$ m/s", feedback: "That divides by the rod's mass alone. The combined mass is 4 kg." },
        { text: "$0$, because the rod starts spinning instead", feedback: "Spin takes angular momentum, not linear momentum. $p$ is still conserved." },
        { text: "$1$ m/s", correct: true, feedback: "Linear momentum is conserved (no hinge, no friction): $4 = 4v_{cm}$." },
      ],
      hint: "The table is smooth and the rod is not hinged, so linear momentum of ball + rod is conserved. The combined COM moves with total momentum over total mass.",
    },
    {
      type: "numeric",
      id: "mrg4-6-q6",
      variant: "practice",
      question: "A torque of 4 N m acts for 0.5 s on a wheel with $I = 0.5$ kg m², initially at rest. What angular speed does it reach? Give your answer in rad/s.",
      answer: 4,
      unit: "rad/s",
      hint: "Angular impulse $\\int\\tau\\,dt$ equals the change in $L = I\\omega$.",
      solution: "Angular impulse $= 4 \\times 0.5 = 2$ kg m²/s $= I\\omega$, so $\\omega = 2/0.5 = 4$ rad/s.",
      commonMistakes: [
        { answer: 1, feedback: "That multiplies by $I$. Divide the angular impulse by $I$." },
        { answer: 2, feedback: "That is the angular impulse (the change in $L$), not $\\omega$." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-4-mastery",
  title: "4.7 · Chapter 4 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "The chapter in seven lines",
      content:
        "1. $\\vec L = \\vec r\\times\\vec p$ ($mv\\,r_\\perp$); for a rigid body about a fixed axis $L = I\\omega$; for a moving, spinning body $L_O = MvR_\\perp + I_{cm}\\omega$.\n2. $\\vec\\tau_{\\text{ext}} = d\\vec L/dt$, so zero external torque about a point conserves $L$ about that point; kinetic energy is a separate question.\n3. Rolling without slipping: $v = \\omega R$, contact point at rest, top at $2v$, speed of any point $= \\omega \\times$ distance from the contact point.\n4. Rolling KE $= \\tfrac12 Mv^2(1 + k^2/R^2)$.\n5. On an incline: $a = \\frac{g\\sin\\theta}{1 + k^2/R^2}$, static friction up the slope, $\\mu_{\\min} = \\frac{\\tan\\theta\\,(k^2/R^2)}{1 + k^2/R^2}$.\n6. Slip to roll: $L$ about the contact line is conserved; $v_f = \\frac{v_0 + (k^2/R^2)\\omega_0R}{1 + k^2/R^2}$.\n7. A blow $J$ at distance $d$ from the COM: $v_{cm} = J/M$, $\\omega = Jd/I_{cm}$.",
    },
    {
      type: "text",
      content:
        "No formula sheet: rebuild each result from $\\vec r\\times\\vec p$, $\\tau = dL/dt$ and $v = \\omega R$. Take $g = 10$ m/s² throughout.",
    },
    {
      type: "quiz",
      id: "mrg4-7-q1",
      variant: "mastery",
      question: "A 1 kg particle moves at 2 m/s in the $+x$ direction along the line $y = 3$ m. What are the magnitudes of its angular momentum about the origin and about the point $(0, -1)$?",
      options: [
        { text: "$6$ and $2$ kg m²/s", feedback: "The point $(0, -1)$ is 4 m from the line $y = 3$, not 1 m." },
        { text: "$6$ and $8$ kg m²/s", correct: true, feedback: "Lever arms are the perpendicular distances to the line: 3 m and 4 m; $L = mv\\,r_\\perp$." },
        { text: "$6$ and $6$ kg m²/s", feedback: "Angular momentum depends on the reference point through the lever arm." },
        { text: "$0$ and $0$", feedback: "Straight-line motion has zero $L$ only about points on the line." },
      ],
      hint: "Angular momentum of a particle (lesson 4.1).",
    },
    {
      type: "numeric",
      id: "mrg4-7-q2",
      variant: "mastery",
      question: "A skater spinning at 2 rad/s with $I = 5$ kg m² pulls her arms in to $I = 2$ kg m². How much work do her muscles do? Give your answer in joules.",
      answer: 15,
      unit: "J",
      hint: "Conservation of angular momentum, and where the extra kinetic energy comes from (lesson 4.2).",
      solution: "$L$ is conserved: $5 \\times 2 = 2\\,\\omega_2$, so $\\omega_2 = 5$ rad/s. $K$ rises from $\\tfrac12(5)(4) = 10$ J to $\\tfrac12(2)(25) = 25$ J, so her muscles do $25 - 10 = 15$ J.",
      commonMistakes: [
        { answer: 0, feedback: "$L$ is conserved but $K = L^2/2I$ rises as $I$ falls; the difference is her work." },
        { answer: 25, feedback: "That is the final kinetic energy. The work is the change." },
        { answer: 6, feedback: "That is $\\tfrac12(I_1 - I_2)\\omega_1^2$, which keeps $\\omega$ fixed while $I$ changes. Compute both energies: $\\omega_2 = 5$ rad/s gives 10 J before and 25 J after." },
      ],
    },
    {
      type: "numeric",
      id: "mrg4-7-q3",
      variant: "mastery",
      question: "A disc ($I = 0.2$ kg m²) spinning at 30 rad/s on a frictionless axle has an identical non-spinning disc dropped coaxially onto it. How much kinetic energy is converted to heat? Give your answer in joules.",
      answer: 45,
      unit: "J",
      hint: "Conservation of angular momentum, then compare kinetic energies (lesson 4.2).",
      solution: "$L$ is conserved: $0.2 \\times 30 = 0.4\\,\\omega$, so $\\omega = 15$ rad/s. $K$ goes from $\\tfrac12(0.2)(900) = 90$ J to $\\tfrac12(0.4)(225) = 45$ J: $45$ J becomes heat.",
      commonMistakes: [
        { answer: 90, feedback: "That is all of the initial energy. The discs keep turning, with half of it." },
        { answer: 0, feedback: "Friction between the discs does negative internal work until they move together." },
        { answer: 67.5, feedback: "That uses $\\omega = 15$ with the original $I$ only. After the drop, $I = 0.4$ kg m²." },
      ],
    },
    {
      type: "numeric",
      id: "mrg4-7-q4",
      variant: "mastery",
      question: "A uniform rod ($M = 6$ kg, $L = 2$ m) lies on a smooth horizontal table, pivoted at one end about a vertical axis. A 1 kg particle moving at 10 m/s on the table, perpendicular to the rod, hits the free end and sticks. What is the angular speed afterwards? Give your answer in rad/s.",
      answer: 1.667,
      relTolerance: 0.01,
      unit: "rad/s",
      hint: "The pivot gives an impulse, so conserve angular momentum about the pivot only.",
      solution: "About the pivot: before, $mvL = 1 \\times 10 \\times 2 = 20$ kg m²/s. After, $I = \\tfrac13 ML^2 + mL^2 = 8 + 4 = 12$ kg m². So $\\omega = \\dfrac{20}{12} = \\dfrac53 \\approx 1.67$ rad/s.",
      commonMistakes: [
        { answer: 2.5, feedback: "That ignores the stuck particle's own moment of inertia, $mL^2 = 4$ kg m²." },
        { answer: 3.333, feedback: "That uses the rod's $I$ about its centre. It turns about the pivot at its end." },
        { answer: 0.714, feedback: "That conserves linear momentum. The pivot gives an impulse; only $L$ about the pivot is conserved." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-7-q5",
      variant: "mastery",
      question: "A wheel rolls without slipping with its centre moving at 2 m/s. How fast is a rim point moving when its radius makes $120^\\circ$ with the downward vertical (i.e. $60^\\circ$ from the top)?",
      options: [
        { text: "$4$ m/s", feedback: "That is the top point, $2R$ from the contact point." },
        { text: "$2\\sqrt3 \\approx 3.46$ m/s", correct: true, feedback: "Its distance from the contact point is the chord $2R\\sin 60^\\circ = \\sqrt3R$, so the speed is $\\omega\\sqrt3R = \\sqrt3 v$." },
        { text: "$2\\sqrt2 \\approx 2.83$ m/s", feedback: "That is the point level with the axle ($90^\\circ$)." },
        { text: "$2$ m/s", feedback: "Speed $v$ belongs to rim points $60^\\circ$ from the *bottom*, a chord $R$ from the contact point." },
      ],
      hint: "Velocities of points on a rolling wheel (lesson 4.3).",
    },
    {
      type: "quiz",
      id: "mrg4-7-q6",
      variant: "mastery",
      question: "A thin hollow sphere rolls without slipping. What fraction of its kinetic energy is rotational?",
      options: [
        { text: "$\\frac23$", feedback: "That is $k^2/R^2$ itself, the ratio of rotational to translational KE." },
        { text: "$\\frac27$", feedback: "That is the solid sphere." },
        { text: "$\\frac12$", feedback: "That is a ring, with all mass at radius $R$." },
        { text: "$\\frac25$", correct: true, feedback: "$\\frac{k^2/R^2}{1 + k^2/R^2} = \\frac{2/3}{5/3} = \\frac25$." },
      ],
      hint: "Kinetic energy of a rolling body (lesson 4.3).",
    },
    {
      type: "quiz",
      id: "mrg4-7-q7",
      variant: "mastery",
      question: "What is the least coefficient of friction that lets a solid sphere roll without slipping down a $37^\\circ$ incline ($\\tan 37^\\circ = \\tfrac34$)?",
      options: [
        { text: "$\\frac{3}{14} \\approx 0.21$", correct: true, feedback: "$\\mu_{\\min} = \\tan\\theta\\cdot\\frac{2/5}{7/5} = \\frac34 \\cdot \\frac27 = \\frac{3}{14}$." },
        { text: "$\\frac34$", feedback: "That is $\\tan\\theta$, the value for a block to stay at rest. Rolling needs less." },
        { text: "$\\frac{3}{10}$", feedback: "That multiplies by $k^2/R^2 = \\tfrac25$ without dividing by $1 + k^2/R^2$." },
        { text: "$\\frac14$", feedback: "That is a disc: $\\tfrac34 \\cdot \\tfrac13$." },
      ],
      hint: "Friction needed for rolling down an incline (lesson 4.4).",
    },
    {
      type: "quiz",
      id: "mrg4-7-q8",
      variant: "mastery",
      question: "A solid sphere is launched at 14 m/s without spin on a floor with $\\mu = 0.2$. When does it start rolling, and at what speed?",
      options: [
        { text: "After 7 s, at 0 m/s", feedback: "That ignores the spin that friction builds up. Rolling begins long before it would stop." },
        { text: "After 2 s, at 10 m/s", correct: true, feedback: "$v = 14 - 2t$, $\\omega R = 5t$; equal at $t = 2$ s, where $v = 10 = \\tfrac57 \\times 14$." },
        { text: "After 2 s, at 9.33 m/s", feedback: "$\\tfrac23 \\times 14$ is the disc's final speed. A solid sphere keeps $\\tfrac57$." },
        { text: "After 1 s, at 10 m/s", feedback: "The final speed is right; the time is $\\frac{2v_0}{7\\mu g} = \\frac{28}{14} = 2$ s." },
      ],
      hint: "From slipping to rolling (lesson 4.5).",
    },
    {
      type: "quiz",
      id: "mrg4-7-q9",
      variant: "mastery",
      question: "A ring is thrown along a rough floor at 3 m/s with backspin such that $\\omega_0R = 5$ m/s (against rolling). What happens once it stops slipping?",
      options: [
        { text: "It rolls forwards at 4 m/s", feedback: "That treats the spin as forward topspin. Backspin enters with a minus sign." },
        { text: "It stops dead", feedback: "That needs $v_0 = (k^2/R^2)|\\omega_0|R$ exactly, i.e. $3 = 5$." },
        { text: "It rolls back towards the thrower at 1 m/s", correct: true, feedback: "$L$ about the contact line: $v_f = \\frac{3 + 1 \\times(-5)}{2} = -1$ m/s." },
        { text: "It rolls back at 2 m/s", feedback: "That is $v_0 - |\\omega_0|R$, forgetting to divide by $1 + k^2/R^2 = 2$." },
      ],
      hint: "Backspin (lesson 4.5): keep track of the sign of the spin.",
    },
    {
      type: "quiz",
      id: "mrg4-7-q10",
      variant: "mastery",
      question: "A uniform rod 0.9 m long lies on a smooth table and is struck perpendicularly at one end. How far from the struck end is the point that is momentarily at rest?",
      options: [
        { text: "$0.6$ m", correct: true, feedback: "$v_{cm} = J/M$, $\\omega = 6J/ML$; zero velocity at $L/6$ beyond the centre, i.e. $\\tfrac23 L = 0.6$ m from the struck end." },
        { text: "$0.45$ m", feedback: "The centre always moves at $J/M$." },
        { text: "$0.9$ m", feedback: "The far end moves backwards, at $2J/M$ (its velocity is $J/M - \\omega\\frac L2 = -2J/M$)." },
        { text: "$0.3$ m", feedback: "That is $\\tfrac13 L$ from the struck end, on the wrong side of the centre." },
      ],
      hint: "A free rod struck at one end (lesson 4.6).",
    },
    {
      type: "numeric",
      id: "mrg4-7-q11",
      variant: "mastery",
      question: "A uniform disc rolls without slipping at 4 m/s along a floor and then rolls (without slipping) up a rough ramp. How high does it rise before stopping? Give your answer in metres.",
      answer: 1.2,
      tolerance: 0.01,
      unit: "m",
      hint: "Static friction on a rolling body does no work, so all the kinetic energy, spin included, becomes height.",
      solution: "$\\tfrac12 Mv^2\\left(1 + \\tfrac12\\right) = Mgh$, so $h = \\dfrac{3v^2}{4g} = \\dfrac{3 \\times 16}{40} = 1.2$ m.",
      commonMistakes: [
        { answer: 0.8, feedback: "That is $\\frac{v^2}{2g}$, which forgets the rotational energy. Static friction on a rolling body does no work, so the spin energy is also converted into height." },
        { answer: 1.6, feedback: "That is a ring's $\\frac{v^2}{g}$. A disc has $k^2/R^2 = \\tfrac12$." },
        { answer: 1.12, feedback: "That is a solid sphere's $\\frac{7v^2}{10g}$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-7-q12",
      variant: "mastery",
      question: "A solid ball resting on a rough table is struck horizontally by a cue at its very top (height $R$ above the centre), giving it $v_0 = 1.4$ m/s. What is its speed once it rolls without slipping?",
      options: [
        { text: "$1$ m/s", feedback: "That is $\\tfrac57 v_0$, the no-spin case. A blow at the top gives lots of topspin." },
        { text: "$1.4$ m/s", feedback: "That would need a blow at $\\tfrac25 R$ above the centre, where rolling starts at once." },
        { text: "$2$ m/s", correct: true, feedback: "$\\omega_0R = \\frac{JR\\cdot R}{\\frac25 MR^2} = 2.5v_0$ (topspin). Then $v_f = \\frac{v_0 + \\frac25(2.5v_0)}{7/5} = \\frac{2v_0}{1.4} = 2$ m/s: friction speeds it up." },
        { text: "$3.5$ m/s", feedback: "That is $\\omega_0R$. Friction trades some of the spin for speed until $v = \\omega R$." },
      ],
      hint: "A ball struck above its centre (lesson 4.5).",
    },
    {
      type: "quiz",
      id: "mrg4-7-q13",
      variant: "mastery",
      multiple: true,
      question: "JEE Advanced. A uniform disc of mass $M$ and radius $R$ rolls without slipping on level ground, its centre moving at $v$. Select all the statements that are correct.",
      options: [
        { text: "Its kinetic energy is $\\tfrac34 Mv^2$.", correct: true, feedback: "$\\tfrac12 Mv^2(1 + \\tfrac12) = \\tfrac34 Mv^2$." },
        { text: "Its angular momentum about the contact point is $\\tfrac32 MvR$.", correct: true, feedback: "Orbital $MvR$ plus spin $I_{cm}\\omega = \\tfrac12 MR^2 \\cdot \\frac vR = \\tfrac12 MvR$." },
        { text: "Its angular momentum about its centre is $\\tfrac12 MvR$.", correct: true, feedback: "About the COM only the spin counts: $I_{cm}\\omega = \\tfrac12 MvR$." },
        { text: "Half of its kinetic energy is rotational.", feedback: "That is a ring. For a disc the rotational share is $\\frac{1/2}{3/2} = \\tfrac13$." },
        { text: "Its angular momentum about the contact point is $MvR$.", feedback: "That is only the orbital part of the COM. The spin adds $\\tfrac12 MvR$." },
      ],
      hint: "Kinetic energy and angular momentum of a rolling disc (lessons 4.1 and 4.3).",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "So far every force has come from contact: strings, hinges, floors, cues. Chapter 5 turns to a force that acts across empty space, gravitation, where angular momentum conservation reappears as Kepler's law of equal areas.",
    },
  ]),
};

export const mrgChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
