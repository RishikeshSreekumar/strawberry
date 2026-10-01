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
    {
      type: "text",
      content:
        "**Torque changes angular momentum.** Differentiate $\\vec L = \\vec r\\times\\vec p$ with the product rule (keeping the order, since the cross product is not commutative):",
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
    {
      type: "text",
      content:
        "**Worked example 1 (a particle on a straight line).** A 2 kg particle moves at 3 m/s in the $+x$ direction along the line $y = 4$ m. Find its angular momentum about the origin, and about the point $(0, 4)$.\n\n1. $p = 6$ kg m/s. The perpendicular distance from the origin to the line $y = 4$ is 4 m. *Why this step:* the lever-arm form avoids finding $\\vec r$ at a particular instant.\n2. $L = p\\,r_\\perp = 6 \\times 4 = 24$ kg m²/s. By components, $L_z = xp_y - yp_x = x(0) - 4(6) = -24$: clockwise, at every instant.\n3. About $(0, 4)$, a point on the line: $r_\\perp = 0$, so $L = 0$. The same motion has different angular momenta about different points.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (components).** A particle at $\\vec r = \\hat i + 2\\hat j$ m has momentum $\\vec p = 3\\hat i + \\hat k$ kg m/s. Find $\\vec L$ about the origin.",
    },
    {
      type: "math",
      latex: "\\vec L = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ 1 & 2 & 0 \\\\ 3 & 0 & 1 \\end{vmatrix} = \\hat i(2 - 0) - \\hat j(1 - 0) + \\hat k(0 - 6) = 2\\hat i - \\hat j - 6\\hat k\\ \\text{kg m}^2/\\text{s}",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a spinning disc).** A uniform disc of mass 2 kg and radius 0.5 m spins at 10 rad/s about its axis.\n\n1. $I = \\tfrac12 MR^2 = \\tfrac12(2)(0.25) = 0.25$ kg m².\n2. $L = I\\omega = 2.5$ kg m²/s, along the axis by the right-hand rule.\n\n**Worked example 4 (rolling disc about the ground, JEE favourite).** The same disc rolls without slipping along the ground at $v = 4$ m/s (so $\\omega = v/R = 8$ rad/s). Find its angular momentum about a point on the ground in its path.\n\n1. Orbital part: the COM moves horizontally at height $R$ above the point, so $|\\vec r_{cm}\\times M\\vec v| = MvR = 2 \\times 4 \\times 0.5 = 4$ kg m²/s. *Why this step:* the lever arm of the COM's momentum about any ground point is the height $R$.\n2. Spin part: $I_{cm}\\omega = 0.25 \\times 8 = 2$ kg m²/s.\n3. Both are clockwise for a wheel rolling to the right, so they add: $L = 6$ kg m²/s $= \\tfrac32 MvR$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (checking $\\tau = dL/dt$).** A ball of mass $m$ is dropped from rest at horizontal distance $d$ from $O$. After time $t$ its momentum is $mgt$ downwards and its lever arm about $O$ is $d$, so $L = mgd\\,t$ (clockwise). Then $dL/dt = mgd$, which is exactly the torque of its weight about $O$. ✓ A falling body gains angular momentum about a point off to the side.",
    },
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
    {
      type: "quiz",
      id: "mrg4-1-q1",
      variant: "practice",
      question: "A 0.5 kg ball moves at 4 m/s along a straight line that passes 3 m from a point $O$. What is its angular momentum about $O$?",
      options: [
        { text: "$0$, because it is moving in a straight line", feedback: "Only about points on its line. $O$ is 3 m off the line." },
        { text: "$2$ kg m²/s", feedback: "That is the linear momentum $mv$. Multiply by the lever arm." },
        { text: "$6$ kg m²/s", correct: true, feedback: "$L = mv\\,r_\\perp = 0.5 \\times 4 \\times 3 = 6$ kg m²/s." },
        { text: "$24$ kg m²/s", feedback: "Mass is 0.5 kg, not 2 kg: $0.5 \\times 4 \\times 3$." },
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
    },
    {
      type: "quiz",
      id: "mrg4-1-q3",
      variant: "practice",
      question: "A uniform rod of mass 3 kg and length 2 m rotates at 2 rad/s about an axis through one end, perpendicular to the rod. What is its angular momentum?",
      options: [
        { text: "$2$ kg m²/s", feedback: "That uses $I = \\tfrac{1}{12}ML^2 = 1$ kg m², about the centre. The axis is at the end." },
        { text: "$24$ kg m²/s", feedback: "That uses $I = ML^2$, as if all the mass were at the far end." },
        { text: "$4$ kg m²/s", feedback: "That is $I$ itself. Multiply by $\\omega = 2$ rad/s." },
        { text: "$8$ kg m²/s", correct: true, feedback: "$I = \\tfrac13 ML^2 = 4$ kg m², so $L = I\\omega = 8$ kg m²/s." },
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
    {
      type: "text",
      content:
        "**What happens to kinetic energy?** Write $K = \\tfrac12 I\\omega^2 = \\dfrac{L^2}{2I}$. With $L$ fixed, $K$ is inversely proportional to $I$. When the skater pulls her arms in, $I$ falls and $K$ **rises**. The extra energy comes from her muscles: she has to pull her arms inwards against their tendency to fly outwards, and that pull does work.",
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
    {
      type: "text",
      content:
        "**Worked example 1 (the skater).** A skater with arms out has $I_1 = 4$ kg m² and spins at 3 rad/s. She pulls in her arms to $I_2 = 1.6$ kg m².\n\n1. The ice exerts a vertical normal force and her weight is vertical; both act along (or parallel to) the vertical spin axis and have no torque about it. Ice friction is negligible. So $L$ about the axis is conserved. *Why this step:* always justify conservation by checking external torques about the chosen axis.\n2. $I_1\\omega_1 = I_2\\omega_2$: $4 \\times 3 = 1.6\\,\\omega_2$, so $\\omega_2 = 7.5$ rad/s.\n3. Energies: $K_1 = \\tfrac12(4)(9) = 18$ J, $K_2 = \\tfrac12(1.6)(56.25) = 45$ J. She did $27$ J of work pulling her arms in. The ratio $45/18 = 2.5 = I_1/I_2$, as $K = L^2/2I$ predicts.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (disc dropped on a spinning disc).** A disc with $I_1 = 0.1$ kg m² spins at $\\omega_0 = 20$ rad/s on a frictionless axle. An identical disc, not spinning, is dropped onto it coaxially; friction between them brings them to a common angular speed.\n\n1. The friction between the discs is internal to the two-disc system; the axle exerts no torque. So $L$ is conserved: $I_1\\omega_0 = (I_1 + I_2)\\omega$, giving $\\omega = 10$ rad/s.\n2. $K_i = \\tfrac12(0.1)(400) = 20$ J. $K_f = \\tfrac12(0.2)(100) = 10$ J. Half the energy has become heat. *Why this step:* this is the rotational version of a perfectly inelastic collision, and in general $\\Delta K = \\tfrac12\\frac{I_1I_2}{I_1+I_2}\\omega_0^2$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (man on a turntable).** A horizontal platform (a disc with $I = 200$ kg m²) turns freely at 1 rad/s with a 50 kg man standing at its centre. He walks out to the rim, 2 m from the axis.\n\n1. The man and platform push each other (internal forces); the bearing exerts no torque about the axis. $L$ is conserved.\n2. $I_i = 200$ kg m² (the man at the axis adds nothing, treating him as a point). $I_f = 200 + 50(2)^2 = 400$ kg m².\n3. $\\omega_f = \\frac{200 \\times 1}{400} = 0.5$ rad/s. Kinetic energy falls from 100 J to 50 J: the man does negative work as he walks outwards, resisting being flung off.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (clay hits a hinged rod, JEE Advanced favourite).** A uniform rod of mass $M = 3$ kg and length $L = 1$ m hangs vertically from a frictionless hinge at its top. A 1 kg lump of clay moving horizontally at 8 m/s hits the bottom end and sticks.\n\n1. **Which quantity is conserved?** During the short collision the hinge exerts a large impulsive force, so linear momentum is **not** conserved. But the hinge force passes through the hinge, so it has no torque about it; gravity is not impulsive. Conserve $L$ about the hinge. *Why this step:* choose the point that the unknown impulsive force passes through.\n2. Before: $L = mvL = 1 \\times 8 \\times 1 = 8$ kg m²/s.\n3. After: $I = \\tfrac13 ML^2 + mL^2 = 1 + 1 = 2$ kg m², so $\\omega = 8/2 = 4$ rad/s.\n4. Check the linear momentum afterwards: rod COM moves at $\\omega L/2 = 2$ m/s, clay at $\\omega L = 4$ m/s, total $3(2) + 1(4) = 10$ kg m/s, up from 8. The hinge delivered a forward impulse of 2 N s.",
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
    {
      type: "quiz",
      id: "mrg4-2-q1",
      variant: "practice",
      question: "A skater spinning at 3 rad/s with $I = 4$ kg m² pulls her arms in until $I = 1.6$ kg m². What is her new angular speed?",
      options: [
        { text: "$1.2$ rad/s", feedback: "That multiplies by $I_2/I_1$. Smaller $I$ means faster spin, so divide by it." },
        { text: "$4.74$ rad/s", feedback: "That conserves kinetic energy, $\\omega \\propto 1/\\sqrt I$. Her muscles do work, so $K$ is not conserved; $L$ is." },
        { text: "$7.5$ rad/s", correct: true, feedback: "$4 \\times 3 = 1.6\\,\\omega$, so $\\omega = 7.5$ rad/s." },
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
    },
    {
      type: "quiz",
      id: "mrg4-2-q4",
      variant: "practice",
      question: "A uniform rod ($M = 3$ kg, $L = 1$ m) hangs from a hinge at its top end. A 1 kg ball of clay moving horizontally at 8 m/s hits the bottom end and sticks. What is the angular speed just after?",
      options: [
        { text: "$2$ rad/s", feedback: "That conserves linear momentum ($(m+M)v' = 8$) and sets $\\omega = v'/L$. The hinge gives an impulse, so $p$ is not conserved." },
        { text: "$6.4$ rad/s", feedback: "That uses the rod's $I$ about its centre, $\\tfrac{1}{12}ML^2$. The rod turns about the hinge at its end." },
        { text: "$4$ rad/s", correct: true, feedback: "$L$ about the hinge: $1 \\times 8 \\times 1 = (\\tfrac13 \\cdot 3 \\cdot 1 + 1 \\cdot 1)\\omega$, so $\\omega = 4$ rad/s." },
        { text: "$8$ rad/s", feedback: "That ignores the rod's inertia: $\\omega = v/L$ with the clay alone." },
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
    {
      type: "text",
      content:
        "**Rolling = translation + rotation.** Every point of the wheel shares the centre's velocity $\\vec v_{cm}$ and, on top of that, moves round the centre with speed $\\omega r$ perpendicular to its radius:",
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
    {
      type: "text",
      content:
        "**The instantaneous axis.** At any instant, a rolling wheel moves exactly as if it were rotating purely about the contact point $P$ with the same $\\omega$. So the speed of any point is $\\omega \\times$ (its distance from $P$), directed perpendicular to the line joining it to $P$. The top is $2R$ from $P$: speed $2\\omega R = 2v$. The front point is $\\sqrt2 R$ from $P$: speed $\\sqrt2 v$, pointing $45^\\circ$ below the horizontal. A rim point whose radius makes angle $\\phi$ with the downward vertical is a chord $2R\\sin\\frac\\phi2$ from $P$, so its speed is $2v\\sin\\frac\\phi2$.",
    },
    {
      type: "text",
      content:
        "**Kinetic energy of rolling.** Add the translational and rotational parts, with $\\omega = v/R$ and $I_{cm} = Mk^2$ ($k$ the radius of gyration):",
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
      type: "text",
      content:
        "**Worked example 1 (car tyre).** A car moves at 72 km/h on tyres of radius 0.3 m, rolling without slipping.\n\n1. $v = 72 \\times \\frac{5}{18} = 20$ m/s. *Why this step:* SI units before anything else.\n2. $\\omega = v/R = 20/0.3 \\approx 66.7$ rad/s.\n3. Top of the tyre: $2v = 40$ m/s. Contact point: 0. Front point (level with the axle): $\\sqrt2 \\times 20 \\approx 28.3$ m/s.\n4. A rim point $60^\\circ$ round from the contact point: $2v\\sin 30^\\circ = v = 20$ m/s. *Why this step:* its distance from $P$ is the chord $2R\\sin 30^\\circ = R$, and speed is $\\omega$ times that.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (energy of a rolling disc).** A 2 kg uniform disc rolls at 3 m/s.\n\n1. Translational: $\\tfrac12(2)(9) = 9$ J.\n2. Rotational: $\\tfrac12\\cdot\\tfrac12 MR^2\\cdot\\frac{v^2}{R^2} = \\tfrac14 Mv^2 = 4.5$ J.\n3. Total 13.5 J $= \\tfrac32\\times 9$. ✓ Check with $I_P = \\tfrac32 MR^2$: $\\tfrac12\\cdot\\tfrac32 MR^2\\cdot\\frac{v^2}{R^2} = \\tfrac34(2)(9) = 13.5$ J.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a point inside the wheel).** A disc of radius 0.5 m rolls at 4 m/s. How fast is the point halfway between the centre and the top moving?\n\n1. $\\omega = 4/0.5 = 8$ rad/s.\n2. The point is $0.75$ m above the contact point, directly above it. *Why this step:* using the contact point as the instantaneous axis turns the vector sum into a single multiplication.\n3. Speed $= 8 \\times 0.75 = 6$ m/s, horizontal. Check by parts: $v + \\omega(0.25) = 4 + 2 = 6$. ✓",
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
    },
    {
      type: "quiz",
      id: "mrg4-3-q3",
      variant: "practice",
      question: "A uniform disc of mass 2 kg rolls without slipping at 3 m/s. What is its total kinetic energy?",
      options: [
        { text: "$9$ J", feedback: "That is only the translational part." },
        { text: "$18$ J", feedback: "That is a ring ($k^2/R^2 = 1$). A disc has $k^2/R^2 = \\tfrac12$." },
        { text: "$13.5$ J", correct: true, feedback: "$\\tfrac12 Mv^2(1 + \\tfrac12) = 9 \\times 1.5 = 13.5$ J." },
        { text: "$12.6$ J", feedback: "That is a solid sphere ($k^2/R^2 = \\tfrac25$)." },
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
    },
    {
      type: "quiz",
      id: "mrg4-3-q5",
      variant: "practice",
      question: "A disc of radius 0.5 m rolls without slipping at 4 m/s. How fast is the point halfway between the centre and the top moving?",
      options: [
        { text: "$2$ m/s", feedback: "That is only the rotation part $\\omega \\times 0.25$. Add the translation $v$." },
        { text: "$4$ m/s", feedback: "That is the centre's speed. Points above the centre move faster." },
        { text: "$8$ m/s", feedback: "That is the top point, 1 m above the contact point." },
        { text: "$6$ m/s", correct: true, feedback: "$\\omega = 8$ rad/s and the point is 0.75 m above the contact point: $8 \\times 0.75 = 6$ m/s." },
      ],
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
        "Take $g = 10$ m/s² in this lesson.\n\n**Worked example 1 (solid sphere, JEE Main).** A solid sphere rolls from rest down a $30^\\circ$ slope 7 m long. Find its acceleration, final speed and time.\n\n1. $k^2/R^2 = \\tfrac25$, so $a = \\dfrac{10 \\times \\tfrac12}{7/5} = \\dfrac{25}{7} \\approx 3.57$ m/s².\n2. $v^2 = 2as = 2 \\times \\tfrac{25}{7} \\times 7 = 50$, so $v = \\sqrt{50} \\approx 7.07$ m/s. *Why this step:* constant acceleration from rest; energy gives the same: $h = 3.5$ m, $v^2 = \\frac{2(10)(3.5)}{1.4} = 50$.\n3. $t = v/a = 7.07 \\times \\tfrac{7}{25} \\approx 1.98$ s.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (friction needed by a disc).** A uniform disc rolls down a $30^\\circ$ incline.\n\n1. $a = \\dfrac{5}{3/2} = \\tfrac{10}{3} \\approx 3.33$ m/s².\n2. $f = Ma\\,\\frac{k^2}{R^2} = M \\cdot \\tfrac{10}{3} \\cdot \\tfrac12 = \\tfrac53 M$ N, one third of $Mg\\sin\\theta$.\n3. $\\mu_{\\min} = \\dfrac{f}{Mg\\cos\\theta} = \\dfrac{5/3}{10 \\times 0.866} \\approx 0.19$. Equivalently $\\tan 30^\\circ \\times \\tfrac13 = 0.192$. *Why this step:* the friction must be *available*: static friction can supply up to $\\mu N$, no more.\n\nFor comparison at $30^\\circ$: solid sphere $\\mu_{\\min} = 0.165$, hollow sphere $0.231$, ring $0.289$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (rolling up a slope).** A solid sphere rolling at 7 m/s reaches the foot of a $30^\\circ$ slope and rolls up it. How far up does it go?\n\n1. Energy: $\\tfrac12 Mv^2 \\cdot \\tfrac75 = Mgh$, so $h = \\dfrac{7 \\times 49}{10 \\times 10} = 3.43$ m.\n2. Distance along the slope: $h/\\sin 30^\\circ = 6.86$ m.\n3. Which way does friction point on the way up? The sphere must slow its spin as it slows down, so it needs a torque against its spin; about the centre only friction can supply it, and for a sphere rolling up that torque requires friction **up the slope**. *Why this step:* friction on a rolling body points wherever the no-slip constraint needs it, not automatically against the motion.",
    },
    {
      type: "text",
      content:
        "**When friction is not enough.** If $\\mu < \\mu_{\\min}$, the body slips: kinetic friction $\\mu Mg\\cos\\theta$ acts, $a = g(\\sin\\theta - \\mu\\cos\\theta)$, and $\\alpha = \\mu Mg\\cos\\theta\\,R/I$. The centre accelerates *faster* than it would when rolling, but kinetic friction now does work, and mechanical energy is lost as heat. Try it: the slider below starts at $\\mu = 0.3$ (everything rolls at $30^\\circ$); lower it to 0.1.",
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
    },
    {
      type: "quiz",
      id: "mrg4-4-q2",
      variant: "practice",
      question: "A uniform disc rolls without slipping down a $30^\\circ$ incline. Take $g = 10$ m/s². What is its acceleration?",
      options: [
        { text: "$5$ m/s²", feedback: "That is $g\\sin\\theta$, a frictionless slide. Rolling bodies are slower." },
        { text: "$3.33$ m/s²", correct: true, feedback: "$a = \\frac{5}{1 + 1/2} = \\frac{10}{3}$ m/s²." },
        { text: "$2.5$ m/s²", feedback: "That is a ring ($k^2/R^2 = 1$)." },
        { text: "$3.57$ m/s²", feedback: "That is a solid sphere ($k^2/R^2 = \\tfrac25$)." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-4-q3",
      variant: "practice",
      question: "A thin hollow sphere rolls from rest down a slope, dropping a height of 5 m. Take $g = 10$ m/s². What is its speed at the bottom?",
      options: [
        { text: "$10$ m/s", feedback: "That is $\\sqrt{2gh}$, which forgets the rotational energy." },
        { text: "$\\sqrt{71.4} \\approx 8.45$ m/s", feedback: "That is a solid sphere. A hollow sphere has $k^2/R^2 = \\tfrac23$." },
        { text: "$\\sqrt{60} \\approx 7.75$ m/s", correct: true, feedback: "$v^2 = \\frac{2gh}{1 + 2/3} = \\frac{100}{5/3} = 60$." },
        { text: "$\\sqrt{50} \\approx 7.07$ m/s", feedback: "That is a ring ($k^2/R^2 = 1$)." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-4-q4",
      variant: "practice",
      question: "What is the minimum coefficient of friction for a ring to roll without slipping down a $45^\\circ$ incline?",
      options: [
        { text: "$0.5$", correct: true, feedback: "$\\mu_{\\min} = \\tan 45^\\circ \\times \\frac{1}{1+1} = 0.5$." },
        { text: "$1$", feedback: "That is $\\tan\\theta$, the value needed to stop a block sliding at all. Rolling needs less." },
        { text: "$0.33$", feedback: "That is a disc: $\\tan 45^\\circ \\times \\frac{1/2}{3/2}$." },
        { text: "$0.29$", feedback: "That is a ring on a $30^\\circ$ slope. Use $\\tan 45^\\circ = 1$." },
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
    {
      type: "text",
      content:
        "**What friction does while the body slips.** Take a body with $I_{cm} = Mk^2$ launched along a level floor at $v_0$ with spin $\\omega_0$ (clockwise, the forward-rolling sense, positive). If $v > \\omega R$, the contact point slides forwards, so kinetic friction $\\mu Mg$ acts **backwards**. It does two things at once:\n\n- it decelerates the centre: $\\dfrac{dv}{dt} = -\\mu g$;\n- about the centre it gives a torque $\\mu MgR$ in the forward-spin sense: $\\dfrac{d\\omega}{dt} = \\dfrac{\\mu gR}{k^2}$.\n\nSo $v$ falls and $\\omega R$ rises until they meet. At that instant the contact point stops sliding, kinetic friction switches off, and (on level ground) the body rolls on at constant speed.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (the bowling ball, by forces).** A solid sphere is launched at $v_0 = 7$ m/s with no spin on a floor with $\\mu = 0.2$. Take $g = 10$ m/s².\n\n1. Centre: $v = 7 - 2t$ (since $\\mu g = 2$ m/s²).\n2. Spin: $\\alpha = \\dfrac{\\mu MgR}{\\tfrac25 MR^2} = \\dfrac{5\\mu g}{2R}$, so $\\omega R = \\tfrac52\\mu g\\,t = 5t$.\n3. Pure rolling when $7 - 2t = 5t$: $t = 1$ s. In general $t = \\dfrac{2v_0}{7\\mu g}$.\n4. Final speed $v_f = 7 - 2 = 5$ m/s $= \\tfrac57 v_0$.\n5. Distance skidded: $s = 7(1) - \\tfrac12(2)(1)^2 = 6$ m.",
    },
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
    {
      type: "text",
      content:
        "**Worked example 2 (a spinning ring set down).** A ring of radius 0.5 m spinning at $\\omega_0 = 16$ rad/s (in the forward sense) is placed gently on a floor ($v_0 = 0$, $\\mu = 0.2$).\n\n1. Now the contact point slides **backwards** ($\\omega_0R = 8 > v$), so friction acts **forwards**. It speeds the centre up and slows the spin. *Why this step:* friction opposes the sliding of the contact point, not the motion of the body.\n2. $v_f = \\dfrac{0 + 1\\times 8}{1 + 1} = 4$ m/s $= \\tfrac12\\omega_0R$.\n3. Time: $v = \\mu g t = 2t$ and $\\omega R = 8 - 2t$ (ring: $\\alpha R = \\mu g$); they meet at $t = 2$ s.\n4. Energy: $K_i = \\tfrac12 MR^2\\omega_0^2 = 32M$; $K_f = \\tfrac12 Mv_f^2\\times 2 = 16M$. Half is lost.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (backspin that brings the ball back).** A ring is thrown forward at $v_0 = 4$ m/s with backspin $\\omega_0R = -6$ m/s (spinning the wrong way).\n\n1. Both translation and spin make the contact point slide forwards, so friction acts backwards, slowing the centre and eating into the backspin.\n2. $v_f = \\dfrac{4 + 1\\times(-6)}{2} = -1$ m/s. The negative sign means the ring ends up rolling **back** towards the thrower at 1 m/s.\n3. It returns whenever $(k^2/R^2)|\\omega_0|R > v_0$: the backspin's angular momentum about the floor outweighs the forward motion's.",
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
      type: "text",
      content:
        "**Worked example 4 (where to strike a ball so it rolls at once).** A cue gives a solid ball a horizontal impulse $J$ at height $h$ above its centre. Find $h$ for immediate rolling.\n\n1. Linear: $Mv_0 = J$. Angular about the centre: $I_{cm}\\omega_0 = Jh$, so $\\omega_0 = \\dfrac{Jh}{\\tfrac25 MR^2}$.\n2. Rolling at once needs $\\omega_0R = v_0$: $\\dfrac{JhR}{\\tfrac25 MR^2} = \\dfrac JM$, giving $h = \\tfrac25 R$.\n3. Height above the table: $R + \\tfrac25R = \\tfrac75 R$. Strike lower and the ball skids first; higher and it has topspin and speeds up as it settles.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"friction always slows a ball down\"",
      content:
        "Kinetic friction opposes the **sliding of the contact point**. For a body with too little spin (bowling ball) it points backwards and slows the centre. For a body with too much forward spin (ring set down spinning, ball with topspin) it points forwards and *speeds the centre up*. Either way, it drives $v$ and $\\omega R$ towards each other, and it always removes kinetic energy while slipping lasts.",
    },
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
    },
    {
      type: "quiz",
      id: "mrg4-5-q2",
      variant: "practice",
      question: "A solid sphere is launched at 7 m/s with no spin on a floor with $\\mu = 0.1$. Take $g = 10$ m/s². After how long does it start rolling without slipping?",
      options: [
        { text: "$2$ s", correct: true, feedback: "$t = \\frac{2v_0}{7\\mu g} = \\frac{14}{7} = 2$ s." },
        { text: "$1$ s", feedback: "That is for $\\mu = 0.2$. Halving $\\mu$ doubles the time." },
        { text: "$7$ s", feedback: "That is $v_0/(\\mu g)$, the time to stop if it only slid. The spin catches up well before." },
        { text: "$5$ s", feedback: "That is $v_f/(\\mu g)$. Solve $v_0 - \\mu g t = \\tfrac52\\mu g t$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-5-q3",
      variant: "practice",
      question: "A ring of radius 0.4 m spinning at 20 rad/s is placed on a rough floor with no forward velocity. What is its final rolling speed?",
      options: [
        { text: "$8$ m/s", feedback: "That is $\\omega_0R$, the rim speed. Friction trades half of it for forward motion." },
        { text: "$0$", feedback: "Friction pushes the ring forwards here, since its contact point slides backwards." },
        { text: "$2.67$ m/s", feedback: "That is a disc's $\\tfrac13\\omega_0R$. A ring has $k^2/R^2 = 1$." },
        { text: "$4$ m/s", correct: true, feedback: "$v_f = \\frac{0 + 1 \\times (20 \\times 0.4)}{2} = 4$ m/s." },
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
    {
      type: "text",
      content:
        "**Angular impulse.** Integrate $\\tau = dL/dt$ over the short time of a blow, exactly as $F = dp/dt$ gave $J = \\Delta p$ in Chapter 1:",
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
    {
      type: "text",
      content:
        "**Worked example 1 (a rod struck at one end, JEE Main).** A uniform rod of mass 2 kg and length 1.2 m lies on a smooth horizontal table. It is struck at one end with an impulse of 3 N s perpendicular to the rod.\n\n1. $v_{cm} = J/M = 1.5$ m/s. *Why this step:* the linear impulse equation doesn't care where the blow lands.\n2. $I_{cm} = \\tfrac{1}{12}ML^2 = 0.24$ kg m² and $d = L/2 = 0.6$ m, so $\\omega = \\dfrac{3 \\times 0.6}{0.24} = 7.5$ rad/s. In general $\\omega = \\dfrac{6J}{ML}$.\n3. Velocity of a point at distance $x$ from the centre towards the struck end: $v(x) = 1.5 + 7.5x$. The struck end moves at $1.5 + 4.5 = 6$ m/s; the far end at $1.5 - 4.5 = -3$ m/s (backwards).\n4. The point at rest: $1.5 + 7.5x = 0$ gives $x = -0.2$ m, i.e. $L/6$ beyond the centre, or $0.8$ m $= \\tfrac23 L$ from the struck end.\n5. Energy: $\\tfrac12(2)(1.5)^2 + \\tfrac12(0.24)(7.5)^2 = 2.25 + 6.75 = 9$ J. A central blow of the same size would give only 2.25 J.",
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
    {
      type: "text",
      content:
        "**Centre of percussion.** Now hinge the rod at one end and strike it a distance $y$ from the hinge. For which $y$ does the hinge feel **no** impulse? With no hinge impulse the rod behaves as if free, so its motion must also be a rotation about the hinge:\n\n1. Linear: $J = Mv_{cm} = M\\omega\\frac L2$.\n2. Angular about the hinge: $Jy = I_{\\text{hinge}}\\,\\omega = \\tfrac13 ML^2\\omega$.\n3. Divide: $y = \\dfrac{\\tfrac13 ML^2}{M L/2} = \\tfrac23 L$.\n\nThis point is the **centre of percussion**: it is exactly where, in example 1, a blow at the other end left the point $\\tfrac23 L$ from it at rest. A cricket bat held at the handle has its \"sweet spot\" near this point, so the hands feel no jar.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (ball sticks to a rod on a smooth table, JEE Advanced).** A uniform rod ($M = 3$ kg, $L = 1$ m) lies at rest on a smooth horizontal table. A 1 kg ball moving at 4 m/s perpendicular to the rod hits one end and sticks.\n\n1. No hinge, no friction: both linear momentum and angular momentum (about any fixed point) are conserved during the collision.\n2. Linear: $1 \\times 4 = 4v_{cm}$, so the combined COM moves at 1 m/s.\n3. Where is the new COM? From the rod's centre towards the ball's end: $\\frac{1 \\times 0.5}{4} = 0.125$ m. *Why this step:* taking angular momentum about the point that will be the combined COM makes the final $L$ just $I_{cm}\\omega$.\n4. Angular momentum of the ball about that point (lever arm $0.5 - 0.125 = 0.375$ m): $1 \\times 4 \\times 0.375 = 1.5$ kg m²/s.\n5. $I$ about the new COM: rod $\\tfrac{1}{12}(3)(1)^2 + 3(0.125)^2 = 0.296875$; ball $1(0.375)^2 = 0.140625$; total $0.4375 = \\tfrac{7}{16}$ kg m².\n6. $\\omega = \\dfrac{1.5}{7/16} = \\dfrac{24}{7} \\approx 3.43$ rad/s.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a block hits a small ledge).** A cube of side $a = 0.3$ m slides on a smooth floor at speed $v$ and hits a small ledge at its front bottom edge, which stops that edge dead. What is the least $v$ for which the cube tips over? Take $g = 10$ m/s².\n\n1. During the impact the ledge's impulsive force acts at the edge, so angular momentum about the edge is conserved. Before: $Mv\\cdot\\frac a2$ (COM at height $a/2$).\n2. After: rotation about the edge with $I_{\\text{edge}} = \\tfrac16 Ma^2 + M\\frac{a^2}{2} = \\tfrac23 Ma^2$. So $\\omega = \\dfrac{3v}{4a}$.\n3. To tip over, the COM must rise from $\\frac a2$ to $\\frac{a}{\\sqrt2}$ (directly above the edge): $\\tfrac12 I_{\\text{edge}}\\omega^2 \\ge Mg\\frac{a}{2}(\\sqrt2 - 1)$. *Why this step:* after the impact only gravity does work, so energy is conserved from here on.\n4. $\\tfrac12\\cdot\\tfrac23 Ma^2\\cdot\\dfrac{9v^2}{16a^2} = \\tfrac{3}{16}Mv^2$, so $v^2 \\ge \\tfrac83 ga(\\sqrt2 - 1) = 3.31$, i.e. $v \\ge 1.82$ m/s.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"an off-centre blow gives the body less linear speed than a central one\"",
      content:
        "The same impulse $J$ always gives the same $v_{cm} = J/M$, wherever it lands. An off-centre blow gives the spin *in addition*, so it actually delivers **more** kinetic energy (9 J against 2.25 J in example 1). The extra energy comes from the striker, who pushes against a point that moves away faster.",
    },
    {
      type: "quiz",
      id: "mrg4-6-q1",
      variant: "practice",
      question: "A uniform rod (mass 2 kg, length 1.2 m) on a smooth table receives an impulse of 3 N s at one end, perpendicular to the rod. What is its angular speed just after?",
      options: [
        { text: "$7.5$ rad/s", correct: true, feedback: "$\\omega = \\frac{J(L/2)}{ML^2/12} = \\frac{1.8}{0.24} = 7.5$ rad/s." },
        { text: "$1.875$ rad/s", feedback: "That uses $I$ about the end. A free rod turns about its COM, so use $I_{cm} = \\tfrac{1}{12}ML^2$." },
        { text: "$15$ rad/s", feedback: "That uses a lever arm of $L$. The blow is $L/2$ from the COM." },
        { text: "$2.5$ rad/s", feedback: "That assumes the far end stays at rest ($v_{cm}/(L/2)$). The rest point is $\\tfrac23 L$ from the struck end, not at the far end." },
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
    },
    {
      type: "quiz",
      id: "mrg4-6-q3",
      variant: "concept",
      question: "Two identical rods on a smooth table receive equal impulses $J$, one at the centre and one at an end. Compare their centre-of-mass speeds and kinetic energies.",
      options: [
        { text: "The centre-struck rod moves faster; energies are equal", feedback: "Linear impulse fixes $v_{cm} = J/M$ regardless of where the blow lands." },
        { text: "The end-struck rod has smaller $v_{cm}$, because part of the impulse goes into spin", feedback: "Impulse is not shared out. All of $J$ changes $p$, and $Jd$ separately changes $L$." },
        { text: "Same $v_{cm}$; the end-struck rod has more kinetic energy", correct: true, feedback: "$v_{cm} = J/M$ for both. The end-struck rod also spins, with three times as much rotational as translational KE, so it carries four times the energy." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-6-q4",
      variant: "practice",
      question: "A uniform rod 1.2 m long hangs from a hinge at its top end. Where should it be struck horizontally so that the hinge feels no impulsive reaction?",
      options: [
        { text: "$0.8$ m below the hinge", correct: true, feedback: "The centre of percussion is at $\\tfrac23 L = 0.8$ m from the hinge." },
        { text: "$0.6$ m below the hinge (the COM)", feedback: "A blow at the COM would push the whole rod sideways, and the hinge would have to hold the top back." },
        { text: "$1.2$ m below the hinge (the bottom end)", feedback: "Below the centre of percussion the top would try to move backwards, and the hinge would push it forwards." },
        { text: "$0.4$ m below the hinge", feedback: "That is $\\tfrac13 L$. Solve $J = M\\omega\\frac L2$ with $Jy = \\tfrac13 ML^2\\omega$." },
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
    },
    {
      type: "quiz",
      id: "mrg4-6-q6",
      variant: "practice",
      question: "A torque of 4 N m acts for 0.5 s on a wheel with $I = 0.5$ kg m², initially at rest. What angular speed does it reach?",
      options: [
        { text: "$1$ rad/s", feedback: "That multiplies by $I$. Divide the angular impulse by $I$." },
        { text: "$2$ rad/s", feedback: "That is the angular impulse (the change in $L$), not $\\omega$." },
        { text: "$4$ rad/s", correct: true, feedback: "Angular impulse $= 4 \\times 0.5 = 2$ kg m²/s $= I\\omega$, so $\\omega = 4$ rad/s." },
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
    },
    {
      type: "quiz",
      id: "mrg4-7-q2",
      variant: "mastery",
      question: "A skater spinning at 2 rad/s with $I = 5$ kg m² pulls her arms in to $I = 2$ kg m². How much work do her muscles do?",
      options: [
        { text: "$15$ J", correct: true, feedback: "$\\omega_2 = 5$ rad/s; $K$ rises from $\\tfrac12(5)(4) = 10$ J to $\\tfrac12(2)(25) = 25$ J." },
        { text: "$0$, since angular momentum is conserved", feedback: "$L$ is conserved but $K = L^2/2I$ rises as $I$ falls; the difference is her work." },
        { text: "$25$ J", feedback: "That is the final kinetic energy. The work is the change." },
        { text: "$6$ J", feedback: "That is $\\tfrac12(I_1 - I_2)\\omega_1^2$, which keeps $\\omega$ fixed while $I$ changes. Compute both energies: $\\omega_2 = 5$ rad/s gives 10 J before and 25 J after." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-7-q3",
      variant: "mastery",
      question: "A disc ($I = 0.2$ kg m²) spinning at 30 rad/s on a frictionless axle has an identical non-spinning disc dropped coaxially onto it. How much kinetic energy is converted to heat?",
      options: [
        { text: "$90$ J", feedback: "That is all of the initial energy. The discs keep turning, with half of it." },
        { text: "$0$", feedback: "Friction between the discs does negative internal work until they move together." },
        { text: "$67.5$ J", feedback: "That uses $\\omega = 15$ with the original $I$ only. After the drop, $I = 0.4$ kg m²." },
        { text: "$45$ J", correct: true, feedback: "$\\omega = 15$ rad/s; $K$ goes from $\\tfrac12(0.2)(900) = 90$ J to $\\tfrac12(0.4)(225) = 45$ J." },
      ],
    },
    {
      type: "quiz",
      id: "mrg4-7-q4",
      variant: "mastery",
      question: "A uniform rod ($M = 6$ kg, $L = 2$ m) lies on a smooth horizontal table, pivoted at one end about a vertical axis. A 1 kg particle moving at 10 m/s on the table, perpendicular to the rod, hits the free end and sticks. What is the angular speed afterwards?",
      options: [
        { text: "$2.5$ rad/s", feedback: "That ignores the stuck particle's own moment of inertia, $mL^2 = 4$ kg m²." },
        { text: "$3.33$ rad/s", feedback: "That uses the rod's $I$ about its centre. It turns about the pivot at its end." },
        { text: "$\\frac53 \\approx 1.67$ rad/s", correct: true, feedback: "About the pivot: $1 \\times 10 \\times 2 = (\\tfrac13 \\cdot 6 \\cdot 4 + 1 \\cdot 4)\\omega = 12\\omega$." },
        { text: "$0.71$ rad/s", feedback: "That conserves linear momentum. The pivot gives an impulse; only $L$ about the pivot is conserved." },
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
    },
    {
      type: "quiz",
      id: "mrg4-7-q11",
      variant: "mastery",
      question: "A uniform disc rolls without slipping at 4 m/s along a floor and then rolls up a rough ramp. How high does it rise before stopping?",
      options: [
        { text: "$0.8$ m", feedback: "That is $\\frac{v^2}{2g}$, which forgets the rotational energy. Static friction on a rolling body does no work, so the spin energy is also converted into height." },
        { text: "$1.6$ m", feedback: "That is a ring's $\\frac{v^2}{g}$. A disc has $k^2/R^2 = \\tfrac12$." },
        { text: "$1.12$ m", feedback: "That is a solid sphere's $\\frac{7v^2}{10g}$." },
        { text: "$1.2$ m", correct: true, feedback: "$\\tfrac12 Mv^2(1 + \\tfrac12) = Mgh$ gives $h = \\frac{3v^2}{4g} = \\frac{48}{40} = 1.2$ m." },
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
