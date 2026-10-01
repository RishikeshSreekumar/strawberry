import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics II Chapter 3 — Torque and Rotational Dynamics.
 * The turning effect of a force as r × F, Newton's second law for rotation
 * (τ = Iα) grown from F = ma particle by particle, massive pulleys and
 * hinged rods, the two conditions of rigid-body equilibrium, rotational
 * work, energy and power, and hinge forces at an instant.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "torque",
  title: "3.1 · Torque: The Turning Effect of a Force",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Try to open a heavy door by pushing right next to the hinges. It barely moves. Push with the same force at the handle, on the far edge, and it swings easily. Push at the handle but straight towards the hinges, and nothing happens at all. The size of the force is the same in all three cases, so size alone cannot be what turns things.",
    },
    {
      type: "text",
      content:
        "Two more ingredients matter: **how far from the hinge** you push, and **in what direction**. A force turns a body best when it is applied far from the axis and at right angles to the line joining the axis to the point of application. The quantity that captures all three ingredients is called **torque** (or moment of force).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Torque about a point",
      content:
        "If a force $\\vec F$ acts at a point whose position relative to a chosen point $O$ is $\\vec r$, the torque of $\\vec F$ about $O$ is $\\vec\\tau = \\vec r\\times\\vec F$.\nIts magnitude is $\\tau = rF\\sin\\theta$, where $\\theta$ is the angle between $\\vec r$ and $\\vec F$ drawn tail to tail. Its direction is along the axis about which $\\vec F$ tends to turn the body, given by the right-hand rule. Unit: N m (not joule, even though the units match).",
    },
    {
      type: "text",
      content:
        "**Two ways to read $rF\\sin\\theta$.** Group it as $r\\,(F\\sin\\theta)$: only the part of the force perpendicular to $\\vec r$ turns the body; the part along $\\vec r$ just pulls on the hinge. Or group it as $F\\,(r\\sin\\theta)$: the force times its **lever arm** $r_\\perp = r\\sin\\theta$, the perpendicular distance from $O$ to the **line of action** of the force.",
    },
    { type: "math", latex: "\\tau = r F\\sin\\theta = r\\,F_\\perp = r_\\perp F" },
    {
      type: "text",
      content:
        "The lever-arm reading has a useful consequence. Slide a force along its own line of action and $r_\\perp$ does not change, so neither does the torque. That is why you can treat the weight of a body as acting anywhere on the vertical line through its centre of mass (Chapter 0): the whole weight produces the same torque as if it acted at the COM.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Sign convention for plane problems",
      content:
        "When every force lies in the $xy$-plane, every torque points along $\\pm\\hat k$. Treat it as a signed number: **anticlockwise positive**, clockwise negative. By components, a force $(F_x, F_y)$ at the point $(x, y)$ gives $\\tau_z = xF_y - yF_x$ about the origin.",
    },
    {
      type: "text",
      content:
        "**Torque about an axis.** A door can only turn about its hinge line. The torque that matters is the component of $\\vec\\tau$ (taken about any point on the axis) **along** the axis. A force parallel to the axis, or one whose line of action cuts the axis, has zero torque about that axis. In plane problems the axis is perpendicular to the page, and the signed $\\tau_z$ above is exactly this component.",
    },
    {
      type: "text",
      content:
        "Below, $\\vec a$ plays $\\vec r$ and $\\vec b$ plays $\\vec F$. Turn the force with the angle slider and watch the normal arrow, which is the torque.",
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
        caption:
          "a is r (from the pivot to where the force acts), b is F. The normal arrow is the torque r × F. Sweep the angle from 0° to 180°.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the torque arrow always stands perpendicular to both $\\vec r$ and $\\vec F$, along the axis the force tries to turn about. Its length (the parallelogram's area, $rF\\sin\\theta$) is largest at $90^\\circ$ and falls to zero at $0^\\circ$ and $180^\\circ$, when the force points straight along $\\vec r$, towards or away from the pivot, like pushing a door towards its hinges.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Couple",
      content:
        "Two forces of equal size and opposite direction whose lines of action are a distance $d$ apart form a **couple**. The net force is zero, but the net torque is $Fd$, and it is the **same about every point**. A couple turns a body without pushing its centre of mass anywhere.",
    },
    {
      type: "text",
      content:
        "Why is a couple's torque the same about every point? Put the forces $\\vec F$ at $\\vec r_1$ and $-\\vec F$ at $\\vec r_2$. About any origin the total torque is $\\vec r_1\\times\\vec F + \\vec r_2\\times(-\\vec F) = (\\vec r_1 - \\vec r_2)\\times\\vec F$. Moving the origin changes $\\vec r_1$ and $\\vec r_2$ by the same vector, so their difference, and the torque, stay put.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (the spanner).** A spanner 0.25 m long turns a nut. You pull on the end with 40 N.\n\n1. Pull at right angles to the handle: $\\tau = rF\\sin 90^\\circ = 0.25 \\times 40 = 10$ N m.\n2. Pull at $30^\\circ$ to the handle: $\\tau = 0.25 \\times 40 \\times \\sin 30^\\circ = 5$ N m. *Why this step:* only $F\\sin 30^\\circ = 20$ N of the pull is perpendicular to the handle; the other part pulls along the spanner.\n3. To get 10 N m back at $30^\\circ$ you would need 80 N. Angle costs you exactly what $\\sin\\theta$ says.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (torque by components, JEE Main).** A force $\\vec F = 3\\hat i - \\hat j + 2\\hat k$ N acts at the point $\\vec r = \\hat i + 2\\hat j$ m. Find the torque about the origin, and the torque about the $z$-axis.\n\n1. Set up the determinant. *Why this step:* the cross product in components is the only reliable route when the angle is not given.",
    },
    {
      type: "math",
      latex:
        "\\vec\\tau = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ 1 & 2 & 0 \\\\ 3 & -1 & 2 \\end{vmatrix} = \\hat i(4 - 0) - \\hat j(2 - 0) + \\hat k(-1 - 6) = 4\\hat i - 2\\hat j - 7\\hat k\\ \\text{N m}",
    },
    {
      type: "text",
      content:
        "2. Magnitude: $|\\vec\\tau| = \\sqrt{16 + 4 + 49} = \\sqrt{69} \\approx 8.3$ N m.\n3. Torque about the $z$-axis is the $\\hat k$ component: $-7$ N m. *Why this step:* only the component along the axis can turn a body that is free to rotate about that axis. The minus sign means clockwise when viewed from $+z$.\n4. Check with the plane formula: $\\tau_z = xF_y - yF_x = 1(-1) - 2(3) = -7$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (weight of a rod).** A uniform rod of mass 2 kg and length 1 m is pivoted at one end and held horizontal. Take $g = 10$ m/s². Find the torque of its weight about the pivot, then again when the rod makes $60^\\circ$ with the horizontal.\n\n1. The weight, 20 N, acts at the COM, 0.5 m from the pivot. *Why this step:* the whole weight can be placed at the COM for torque purposes.\n2. Horizontal rod: the weight is perpendicular to the rod, so $\\tau = 0.5 \\times 20 = 10$ N m.\n3. At $60^\\circ$ to the horizontal the lever arm is the horizontal distance from pivot to COM: $0.5\\cos 60^\\circ = 0.25$ m. So $\\tau = 20 \\times 0.25 = 5$ N m. *Why this step:* the line of action of the weight is vertical, and its perpendicular distance from the pivot is the horizontal offset, not the length along the rod.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a steering wheel couple).** A driver pushes up with 10 N on one side of a steering wheel of radius 0.2 m and down with 10 N on the other side.\n\n1. The two forces are equal, opposite and 0.4 m apart: a couple.\n2. $\\tau = Fd = 10 \\times 0.4 = 4$ N m.\n3. About the centre each force gives $10 \\times 0.2 = 2$ N m in the same sense, total 4 N m. About the rim point where one force acts, that force gives zero and the other gives $10 \\times 0.4 = 4$ N m. Same answer. *Why this step:* this is the \"same about every point\" property in action.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a bigger force always gives a bigger torque\"",
      content:
        "A 100 N push aimed straight at a door's hinge line gives **zero** torque, while a 10 N push at right angles on a handle 1 m from the hinges gives 10 N m. Torque depends on the force, the lever arm and the angle together. Also, torque is always *about* some point or axis: the same force has different torques about different points.",
    },
    {
      type: "quiz",
      id: "mrg3-1-q1",
      variant: "practice",
      question: "A 50 N force acts at the end of a rod 0.4 m from a pivot, at $30^\\circ$ to the rod. What is the magnitude of its torque about the pivot?",
      options: [
        { text: "$17.3$ N m", feedback: "That uses $\\cos 30^\\circ$. The turning part of the force is the component perpendicular to the rod, $F\\sin\\theta$." },
        { text: "$20$ N m", feedback: "That treats the force as perpendicular to the rod. At $30^\\circ$ only half of it turns the rod." },
        { text: "$10$ N m", correct: true, feedback: "$0.4 \\times 50 \\times \\sin 30^\\circ = 20 \\times \\tfrac12 = 10$ N m." },
        { text: "$125$ N m", feedback: "Torque multiplies force by distance; you divided $50$ by $0.4$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-1-q2",
      variant: "practice",
      question: "A force $\\vec F = \\hat i + 3\\hat j$ N acts at $\\vec r = 2\\hat i + \\hat j$ m. Find the torque about the origin.",
      options: [
        { text: "$-5\\hat k$ N m", feedback: "You computed $\\vec F\\times\\vec r$. Order matters: torque is $\\vec r\\times\\vec F$." },
        { text: "$5\\hat k$ N m", correct: true, feedback: "$\\tau_z = xF_y - yF_x = 2(3) - 1(1) = 5$, anticlockwise." },
        { text: "$7\\hat k$ N m", feedback: "You added the products. The formula is $xF_y - yF_x$, a difference." },
        { text: "$2\\hat i + 3\\hat j$ N m", feedback: "That multiplies components pairwise. A cross product of two vectors in the $xy$-plane points along $\\hat k$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-1-q3",
      variant: "concept",
      question: "Which change leaves the torque of a force about a point $O$ unchanged?",
      options: [
        { text: "Doubling the distance from $O$ to the point of application, keeping the direction of the force.", feedback: "That generally changes the lever arm, and with it the torque." },
        { text: "Rotating the force by $90^\\circ$ about its point of application.", feedback: "That changes the angle with $\\vec r$, and so $\\sin\\theta$ and the torque." },
        { text: "Moving $O$ to a different point.", feedback: "Torque is always about a point; move the point and the torque generally changes (except for a couple)." },
        { text: "Sliding the force along its own line of action.", correct: true, feedback: "The perpendicular distance from $O$ to the line of action is unchanged, so $r_\\perp F$ is unchanged." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-1-q4",
      variant: "concept",
      question: "A couple consists of two 6 N forces, 0.5 m apart. What is its torque about a point 3 m away from both forces?",
      options: [
        { text: "$3$ N m, the same as about any other point", correct: true, feedback: "A couple's torque is $Fd = 6 \\times 0.5 = 3$ N m about every point." },
        { text: "$18$ N m, because the lever arm is now 3 m", feedback: "Each force has a large lever arm about the far point, but the two torques almost cancel; what survives is $Fd$." },
        { text: "Zero, because the net force is zero", feedback: "Zero net force does not mean zero torque. That is exactly what makes a couple interesting." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-1-q5",
      variant: "practice",
      question: "A uniform rod of mass 3 kg and length 2 m is pivoted at one end and held at $30^\\circ$ above the horizontal. Take $g = 10$ m/s². What is the torque of gravity about the pivot?",
      options: [
        { text: "$15$ N m", feedback: "That uses $\\sin 30^\\circ$. The lever arm of a vertical force is the horizontal distance, $1\\cos 30^\\circ$ here." },
        { text: "$15\\sqrt3 \\approx 26$ N m", correct: true, feedback: "The weight 30 N acts at the COM, 1 m along the rod; its lever arm is the horizontal offset $1\\cos 30^\\circ$, giving $30\\cos 30^\\circ = 15\\sqrt3$ N m." },
        { text: "$30$ N m", feedback: "That would be correct for a horizontal rod. Tilting it shortens the lever arm." },
        { text: "$30\\sqrt3 \\approx 52$ N m", feedback: "The weight acts at the COM, 1 m from the pivot, not at the far end 2 m away." },
      ],
      hint: "Put the weight at the COM and find the horizontal distance from the pivot.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "torque-and-angular-acceleration",
  title: "3.2 · τ = Iα",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Hang a bucket from a rope wound round a heavy wooden drum on a well. Let go, and the bucket falls, but noticeably more slowly than a dropped stone, because the falling bucket also has to spin up the drum. How much more slowly? To answer that we need the rotational version of $F = ma$: a law linking the torque on a body to how fast its spin changes.",
    },
    {
      type: "text",
      content:
        "**Derivation.** A rigid body turns about a fixed axis with angular acceleration $\\alpha$. Pick one particle of mass $m_i$ at distance $r_i$ from the axis. It moves on a circle, so its tangential acceleration is $a_{t,i} = r_i\\alpha$ (Chapter 2). Newton's second law along the tangent says",
    },
    { type: "math", latex: "F_{t,i} = m_i a_{t,i} = m_i r_i \\alpha" },
    {
      type: "text",
      content:
        "where $F_{t,i}$ is the tangential part of the net force on that particle. Multiply both sides by $r_i$. The left side becomes the torque of that force about the axis (the radial part of the force points at the axis and has no torque):",
    },
    { type: "math", latex: "\\tau_i = r_i F_{t,i} = m_i r_i^2\\,\\alpha" },
    {
      type: "text",
      content:
        "Now add over every particle. $\\alpha$ is the same for all of them (rigid body), so it comes out of the sum, and $\\sum m_i r_i^2$ is the moment of inertia $I$. The forces on each particle include internal forces from its neighbours, but those come in equal and opposite pairs along the line joining the two particles (Newton's third law), with the same lever arm, so their torques cancel in pairs. Only external torques survive:",
    },
    { type: "math", latex: "\\sum \\tau_{\\text{ext}} = \\Big(\\sum m_i r_i^2\\Big)\\alpha = I\\alpha" },
    {
      type: "callout",
      variant: "definition",
      title: "Newton's second law for rotation",
      content:
        "For a rigid body rotating about a fixed axis: $\\tau_{\\text{ext}} = I\\alpha$, with $\\tau$ and $I$ both about that axis.\nThe same equation also holds about an axis through the **centre of mass**, even when the COM is accelerating (a rolling ball, a falling yo-yo). About any other moving point it can fail, so use the fixed axis or the COM.",
    },
    {
      type: "table",
      headers: ["Translation", "Rotation about a fixed axis"],
      rows: [
        ["mass $m$", "moment of inertia $I$"],
        ["force $F$", "torque $\\tau$"],
        ["$F = ma$", "$\\tau = I\\alpha$"],
        ["internal forces cancel in pairs", "internal torques cancel in pairs"],
      ],
    },
    {
      type: "text",
      content:
        "**The recipe for pulley problems.** (i) Draw a free-body diagram for every block and for the pulley. (ii) Write $F = ma$ for each block and $\\tau = I\\alpha$ for the pulley. (iii) Link them with the string constraint: if the string does not slip on the pulley, $a = \\alpha R$. (iv) Solve. Take $g = 10$ m/s² throughout this lesson.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (block on a string wound round a disc).** A 2 kg block hangs from a light string wound round a uniform disc of mass 4 kg and radius $R$ that turns freely on a fixed horizontal axle. Find the block's acceleration and the tension.\n\n1. Block (down positive): $mg - T = ma$, so $20 - T = 2a$.\n2. Disc: the only torque about the axle is $TR$ (the axle force and the disc's weight pass through the axis). $TR = I\\alpha = \\tfrac12 MR^2\\alpha$. *Why this step:* this is the rotational law applied to the pulley alone.\n3. Constraint: the string unwinds without slipping, so $a = \\alpha R$. Then $TR = \\tfrac12 MR\\,a$, i.e. $T = \\tfrac12 Ma = 2a$.\n4. Substitute: $20 - 2a = 2a$, so $a = 5$ m/s² and $T = 10$ N.",
    },
    { type: "math", latex: "a = \\frac{mg}{m + M/2} = \\frac{g}{1 + \\dfrac{M}{2m}} = \\frac{10}{1 + 1} = 5\\ \\text{m/s}^2" },
    {
      type: "text",
      content:
        "5. Sanity checks: as $M \\to 0$, $a \\to g$ (free fall); a very heavy disc makes $a \\to 0$. The radius cancelled, so any size of uniform disc of mass 4 kg gives the same answer.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (Atwood machine with a massive pulley).** Blocks of 3 kg and 1 kg hang over a uniform disc pulley of mass 4 kg; the string does not slip.\n\n1. Heavy block (down +): $30 - T_1 = 3a$. Light block (up +): $T_2 - 10 = 1\\cdot a$.\n2. Pulley: the two tensions pull on opposite sides of the rim, so the net torque is $(T_1 - T_2)R = \\tfrac12 MR^2\\alpha = \\tfrac12 MRa$. *Why this step:* a pulley with mass needs a net torque to speed up, and that torque can only come from a difference in the tensions.\n3. Add all three equations (the $T$'s cancel): $30 - 10 = (3 + 1 + \\tfrac12\\cdot 4)a$, so $a = \\frac{20}{6} = \\frac{10}{3} \\approx 3.33$ m/s².",
    },
    { type: "math", latex: "a = \\frac{(m_1 - m_2)g}{m_1 + m_2 + I/R^2}" },
    {
      type: "text",
      content:
        "4. Tensions: $T_1 = 3(10 - \\tfrac{10}{3}) = 20$ N and $T_2 = 1(10 + \\tfrac{10}{3}) = \\tfrac{40}{3} \\approx 13.3$ N. Different, as they must be.\n5. Check the pulley: $T_1 - T_2 = \\tfrac{20}{3}$ N and $\\tfrac12 Ma = 2\\times\\tfrac{10}{3} = \\tfrac{20}{3}$ N. ✓\n\nThe pulley simply adds $I/R^2$ to the inertia being dragged along. For a uniform disc $I/R^2 = M/2$.",
    },
    {
      type: "text",
      content:
        "Slide the pulley mass $M$ (the $x$-axis) and the block masses below. The flat line is the light-pulley answer for the starting masses.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "5 + 0*x",
        baseLatex: "\\text{light pulley}",
        expr: "(m1 - m2)*10/(m1 + m2 + x/2)",
        exprLatex: "a = \\frac{(m_1 - m_2)g}{m_1 + m_2 + M/2}",
        params: [
          { name: "m1", min: 1, max: 6, step: 1, initial: 3 },
          { name: "m2", min: 1, max: 6, step: 1, initial: 1 },
        ],
        window: { xmin: 0, xmax: 10, ymin: 0, ymax: 8 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $M = 0$ the curve meets the light-pulley value, and every kilogram of pulley pulls the acceleration down, but only half as effectively as a kilogram of hanging mass would (the $M/2$). Set $m_1 = m_2$ and the acceleration is zero whatever the pulley.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (hinged rod released from horizontal).** A uniform rod of mass $m$ and length $L = 1.5$ m is hinged at one end and held horizontal, then released.\n\n1. Torque of gravity about the hinge: $mg\\cdot\\frac L2$ (weight at the COM, perpendicular to the rod).\n2. Moment of inertia about the hinge: $\\frac13 mL^2$ (Chapter 2). *Why this step:* the axis is the hinge, so $I$ must be about the end, not the centre.\n3. $\\alpha = \\dfrac{mgL/2}{mL^2/3} = \\dfrac{3g}{2L} = \\dfrac{30}{3} = 10$ rad/s².\n4. Acceleration of the free end: $\\alpha L = \\tfrac32 g = 15$ m/s², **more than $g$**. The COM accelerates at $\\alpha\\frac L2 = \\tfrac34 g$. A coin resting on the free end would be left behind for an instant.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (braking a flywheel).** A flywheel with $I = 2$ kg m² spins at 20 rad/s. A brake applies a constant torque of 5 N m. How long, and through how many radians, until it stops?\n\n1. $\\alpha = -\\tau/I = -2.5$ rad/s² (taking the spin direction as positive).\n2. $0 = 20 - 2.5t$, so $t = 8$ s.\n3. $0 = 20^2 - 2(2.5)\\theta$, so $\\theta = 80$ rad, about 12.7 turns. *Why this step:* once $\\alpha$ is known, the constant-$\\alpha$ equations of Chapter 2 take over, exactly as $F = ma$ hands over to the kinematic equations.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"tension is the same on both sides of a pulley\"",
      content:
        "That is true only for a **massless** (or frictionless, non-rotating) pulley. If the pulley has moment of inertia $I$ and accelerates, $\\tau = I\\alpha$ demands $(T_1 - T_2)R = I\\alpha \\ne 0$. In the Atwood example the two tensions were 20 N and 13.3 N.",
    },
    {
      type: "quiz",
      id: "mrg3-2-q1",
      variant: "practice",
      question: "A 1 kg block hangs from a light string wound round a uniform disc of mass 2 kg and radius 0.1 m, free to turn on a fixed axle. Take $g = 10$ m/s². What is the block's acceleration?",
      options: [
        { text: "$10$ m/s²", feedback: "That ignores the disc. The string tension has to spin it up, so the block falls more slowly than $g$." },
        { text: "$3.33$ m/s²", feedback: "That uses $I = MR^2$ (a ring). A uniform disc has $I = \\tfrac12 MR^2$, so $I/R^2 = 1$ kg, not 2 kg." },
        { text: "$5$ m/s²", correct: true, feedback: "$a = \\frac{mg}{m + M/2} = \\frac{10}{1 + 1} = 5$ m/s²." },
        { text: "$6.67$ m/s²", feedback: "That uses $I/R^2 = M/4$. For a disc about its axis it is $M/2$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-2-q2",
      variant: "concept",
      question: "In an Atwood machine with a massive pulley, the heavier block $m_1$ accelerates down. How do the string tensions compare?",
      options: [
        { text: "$T_1 > T_2$: the difference provides the torque that spins up the pulley", correct: true, feedback: "$(T_1 - T_2)R = I\\alpha$. The heavier side's segment has the larger tension." },
        { text: "$T_1 = T_2$, since it is one string", feedback: "One string, but the pulley between the two sides has inertia. Equal tensions would give zero net torque, and the pulley could not speed up." },
        { text: "$T_1 < T_2$, because the heavier block pulls the string down harder", feedback: "Look at the pulley: it turns towards the $m_1$ side, so the larger tension must be on that side." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-2-q3",
      variant: "practice",
      question: "A uniform rod 2 m long is hinged at one end and released from rest in a horizontal position. Take $g = 10$ m/s². What is its angular acceleration at the instant of release?",
      options: [
        { text: "$30$ rad/s²", feedback: "That uses $I = \\frac{1}{12}mL^2$, about the centre. The rod turns about the hinge at its end, where $I = \\frac13 mL^2$." },
        { text: "$15$ rad/s²", feedback: "That puts the weight at the free end (lever arm $L$). It acts at the COM, lever arm $L/2$." },
        { text: "$5$ rad/s²", feedback: "That assumes the free end falls at exactly $g$. It actually accelerates at $1.5g$." },
        { text: "$7.5$ rad/s²", correct: true, feedback: "$\\alpha = \\frac{3g}{2L} = \\frac{30}{4} = 7.5$ rad/s²." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-2-q4",
      variant: "concept",
      question: "A small coin rests on the free end of a horizontal hinged rod. The rod is released. What happens to the coin at the first instant?",
      options: [
        { text: "It moves down with the rod, pressed against it", feedback: "That would need the rod's end to accelerate at most $g$. It accelerates at $\\tfrac32 g$." },
        { text: "It slides towards the hinge", feedback: "At the first instant the rod is horizontal and nothing pushes the coin sideways; the issue is vertical." },
        { text: "It loses contact, because the rod's end accelerates down faster than $g$", correct: true, feedback: "The end accelerates at $\\alpha L = 1.5g$, and nothing can pull the coin down faster than $g$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-2-q5",
      variant: "practice",
      question: "A constant torque of 2 N m acts on a wheel with $I = 0.5$ kg m², starting from rest. What is its angular speed after 5 s?",
      options: [
        { text: "$5$ rad/s", feedback: "That uses $\\alpha = \\tau I = 1$ rad/s². Divide by $I$, just as $a = F/m$." },
        { text: "$20$ rad/s", correct: true, feedback: "$\\alpha = 2/0.5 = 4$ rad/s², so $\\omega = 4 \\times 5 = 20$ rad/s." },
        { text: "$50$ rad/s", feedback: "That is $\\frac12\\alpha t^2$, the angle turned in radians, not the angular speed." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "equilibrium-of-rigid-bodies",
  title: "3.3 · Equilibrium of Rigid Bodies",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A ladder leans against a wall. A shop sign hangs from a bracket. A bridge deck rests on two piers with lorries crawling across it. None of these is moving, and engineers need to know the forces holding each one still. For a particle, \"not moving\" meant $\\sum\\vec F = 0$. For an extended body that is not enough.",
    },
    {
      type: "text",
      content:
        "Picture a steering wheel with a couple on it: 10 N up on one side and 10 N down on the other. The net force is zero, so the centre does not accelerate, yet the wheel spins faster and faster. A rigid body can fail to be in equilibrium in two separate ways: its COM can accelerate ($\\vec F_{\\text{ext}} = M\\vec a_{cm}$, Chapter 0), or it can start to turn ($\\tau = I\\alpha$). Both must be ruled out.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Conditions for equilibrium of a rigid body",
      content:
        "A rigid body at rest stays at rest if and only if\n1. $\\sum\\vec F_{\\text{ext}} = \\vec 0$ (translational equilibrium), and\n2. $\\sum\\vec\\tau_{\\text{ext}} = \\vec 0$ about **any one** point (rotational equilibrium).\nIn a plane problem this gives three scalar equations: $\\sum F_x = 0$, $\\sum F_y = 0$, $\\sum\\tau = 0$.",
    },
    {
      type: "text",
      content:
        "**Why \"any one point\" is enough.** Suppose the net torque about a point $A$ is zero and the net force is zero. About another point $B$, each force's position vector changes by the same vector $\\vec d = \\overrightarrow{BA}$, so",
    },
    {
      type: "math",
      latex: "\\sum \\vec\\tau_B = \\sum(\\vec d + \\vec r_i)\\times\\vec F_i = \\vec d\\times\\sum\\vec F_i + \\sum\\vec\\tau_A = \\vec 0 + \\vec 0",
    },
    {
      type: "text",
      content:
        "So once the forces balance, you may take torques about whichever point makes the algebra easiest. The best choice is almost always a point that **unknown forces pass through**: their torques vanish, and the equation contains fewer unknowns.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Three-force bodies",
      content:
        "If a body is in equilibrium under exactly three non-parallel forces, their lines of action must pass through **one point**. (Take torques about the point where two of them cross: the third must have zero torque there too.) And the three force arrows, placed head to tail, close into a triangle.",
    },
    {
      type: "text",
      content:
        "The canvas below shows two forces $\\vec F_1$ and $\\vec F_2$ acting on a body and their resultant. For equilibrium the third force must be exactly the reverse of that resultant.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "add",
        a: [3, 2],
        b: [2, -2],
        showParallelogram: false,
        labels: { a: "\\vec F_1", b: "\\vec F_2" },
        readouts: ["components", "magnitude", "sum"],
        caption:
          "F₂ is drawn from the tip of F₁. The third force that holds the body in equilibrium runs from the tip of F₂ back to the start: the reverse of the sum.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: whatever you do to $\\vec F_1$ and $\\vec F_2$, the balancing force closes the triangle back to the starting point, with components equal and opposite to the sum's. The force condition fixes the balancing force's size and direction; the torque condition then fixes *where* it must act.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (beam on two supports).** A uniform beam 4 m long weighing 200 N rests on supports at its ends $A$ and $B$. A 300 N load sits 1 m from $A$. Find the support forces.\n\n1. Torques about $A$ (anticlockwise +, $B$ to the right). *Why this step:* $N_A$ passes through $A$ and drops out.",
    },
    { type: "math", latex: "N_B(4) - 200(2) - 300(1) = 0 \\;\\Rightarrow\\; N_B = 175\\ \\text{N}" },
    {
      type: "text",
      content:
        "2. Vertical forces: $N_A + N_B = 200 + 300$, so $N_A = 325$ N.\n3. Check with torques about $B$: $-N_A(4) + 200(2) + 300(3) = -1300 + 400 + 900 = 0$. ✓ The support nearer the load carries more of it, as it should.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (ladder, JEE classic).** A uniform ladder 5 m long weighing 200 N leans against a smooth wall with its top 4 m up the wall and its foot 3 m out. Find the minimum coefficient of friction at the floor.\n\n1. Forces: weight 200 N at the midpoint; wall reaction $N_w$ horizontal (smooth wall, no friction); floor reaction $N$ up and friction $f$ towards the wall.\n2. Vertical: $N = 200$ N. Horizontal: $f = N_w$.\n3. Torques about the foot. *Why this step:* $N$ and $f$ both act at the foot and drop out, leaving one unknown. $N_w$ acts at height 4 m; the weight acts 1.5 m horizontally from the foot.",
    },
    { type: "math", latex: "N_w(4) = 200(1.5) \\;\\Rightarrow\\; N_w = 75\\ \\text{N} = f" },
    {
      type: "text",
      content:
        "4. The ladder does not slip if $f \\le \\mu N$: $\\mu \\ge \\frac{75}{200} = 0.375$.\n5. In general, for a ladder at angle $\\theta$ to the floor: $N_w L\\sin\\theta = W\\frac L2\\cos\\theta$, so $\\mu_{\\min} = \\dfrac{1}{2\\tan\\theta}$. Here $\\tan\\theta = \\frac43$ gives $\\frac38$. ✓ Steeper ladders need less friction.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a rod held by a string).** A uniform horizontal rod weighing 100 N is hinged to a wall at one end. A string from the other end runs back to the wall at $30^\\circ$ above the rod. Find the tension and the hinge force.\n\n1. Torques about the hinge (the hinge force drops out): the string's perpendicular component $T\\sin 30^\\circ$ acts at distance $L$, the weight at $L/2$.\n2. $T\\sin 30^\\circ\\cdot L = 100\\cdot\\frac L2$, so $T = 100$ N.\n3. Horizontal: the string pulls the rod towards the wall with $T\\cos 30^\\circ = 86.6$ N, so the hinge pushes out with $H = 86.6$ N.\n4. Vertical: $V + T\\sin 30^\\circ = 100$, so $V = 50$ N up.\n5. The hinge force is $\\sqrt{86.6^2 + 50^2} = 100$ N at $\\tan^{-1}(50/86.6) = 30^\\circ$ above the horizontal. *Why this step:* three-force check: the weight line (at $L/2$) and the string meet at a height $\\frac L2\\tan 30^\\circ$ above the rod's midpoint, and the hinge force at $30^\\circ$ from the wall end passes through exactly that point.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (slide or topple?).** A cube of side $a$ and weight $W$ stands on a floor with friction coefficient $\\mu$. You push horizontally with force $F$ at height $h$.\n\n1. **Sliding** starts when $F > \\mu W$.\n2. **Toppling** about the front bottom edge: just before tipping, the whole normal force and friction act at that edge. Torques about it: $Fh$ (tipping) against $W\\frac a2$ (restoring). It tips when $F > \\dfrac{Wa}{2h}$. *Why this step:* taking torques about the edge removes both floor forces at once.\n3. It topples first if $\\dfrac{Wa}{2h} < \\mu W$, i.e. $h > \\dfrac{a}{2\\mu}$.\n4. With $a = 1$ m and $\\mu = 0.4$: toppling first needs $h > 1.25$ m, higher than the cube itself, so a push anywhere on it slides the cube. With $\\mu = 0.6$ the threshold is $0.83$ m, and a push at the top ($h = 1$ m) tips it over.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"torques must be taken about the pivot or the COM\"",
      content:
        "When the body is in equilibrium, the net torque is zero about **every** point, including points off the body entirely. Choose the point that kills the most unknowns (a hinge, a contact point, the crossing point of two unknown forces). The pivot and the COM are often good choices, but they have no special status. (This freedom is for equilibrium; for an accelerating body, $\\tau = I\\alpha$ must be used about a fixed axis or the COM.)",
    },
    {
      type: "quiz",
      id: "mrg3-3-q1",
      variant: "concept",
      question: "Why is $\\sum\\vec F = 0$ not enough for a rigid body to stay at rest?",
      options: [
        { text: "Because a couple has zero net force but a non-zero torque, so the body can start to spin.", correct: true, feedback: "Zero net force only stops the COM from accelerating. The torque condition stops rotation." },
        { text: "Because internal forces can also make the body move.", feedback: "Internal forces cancel in pairs, in both the force sum and the torque sum. They cannot start a rigid body moving." },
        { text: "It is enough; the torque condition follows from it.", feedback: "The steering wheel with a couple is the counterexample: $\\sum\\vec F = 0$, yet it spins up." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-3-q2",
      variant: "practice",
      question: "A 30 kg child sits 2 m from the pivot of a light see-saw. Where must a 40 kg child sit, on the other side, to balance it?",
      options: [
        { text: "$1.5$ m from the pivot", correct: true, feedback: "$30 \\times 2 = 40 \\times d$, so $d = 1.5$ m. The heavier child sits closer." },
        { text: "$2.67$ m from the pivot", feedback: "That puts the heavier child farther out, which doubles the imbalance. Solve $30 \\times 2 = 40 d$." },
        { text: "$2$ m from the pivot", feedback: "Equal distances balance only equal weights." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-3-q3",
      variant: "practice",
      question: "A uniform beam 6 m long weighing 600 N rests on supports at its two ends. A 400 N load is placed 2 m from the left end. What force does the **left** support exert?",
      options: [
        { text: "$433.3$ N", feedback: "That is the right support's force. The load is nearer the left end, so the left support carries more." },
        { text: "$500$ N", feedback: "Half the total weight would be right only for a load at the centre." },
        { text: "$566.7$ N", correct: true, feedback: "Torques about the right end: $N_L(6) = 600(3) + 400(4) = 3400$, so $N_L \\approx 566.7$ N." },
        { text: "$700$ N", feedback: "Check the torque sum: the beam's own weight acts at the middle, 3 m from either end." },
      ],
      hint: "Take torques about the right end so the right support's force drops out.",
    },
    {
      type: "quiz",
      id: "mrg3-3-q4",
      variant: "practice",
      question: "A uniform ladder rests against a smooth wall at $45^\\circ$ to a rough floor. What is the minimum coefficient of friction at the floor?",
      options: [
        { text: "$1$", feedback: "That is $\\frac{1}{\\tan\\theta}$. The weight acts at the ladder's midpoint, which halves its torque." },
        { text: "$0.5$", correct: true, feedback: "$\\mu_{\\min} = \\frac{1}{2\\tan\\theta} = \\frac{1}{2}$ at $45^\\circ$." },
        { text: "$0.25$", feedback: "You halved twice. Taking torques about the foot gives $N_w = \\frac{W}{2\\tan\\theta}$." },
        { text: "$0.707$", feedback: "That is $\\cos 45^\\circ$. Work from torques about the foot: $N_w L\\sin\\theta = W\\frac L2\\cos\\theta$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-3-q5",
      variant: "concept",
      question: "A cube rests on a floor with $\\mu = 0.3$. You push horizontally at the top edge and slowly increase the push. What happens first?",
      options: [
        { text: "It slides, when $F$ passes $0.3W$", correct: true, feedback: "Toppling from the top needs $F > \\frac{Wa}{2a} = 0.5W$, but sliding begins at $0.3W$." },
        { text: "It topples, when $F$ passes $0.5W$", feedback: "It would, if friction could hold it that long. Friction gives up at $0.3W$." },
        { text: "Both at the same moment", feedback: "That needs $\\mu = 0.5$ exactly (for a push at the top)." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "work-energy-and-power-in-rotation",
  title: "3.4 · Work, Energy and Power in Rotation",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A potter kicks a heavy stone wheel a few times and then shapes a pot while the wheel keeps turning on its own for a minute. The kicks did work; the wheel stored that work as kinetic energy of rotation; the clay's drag slowly takes it back. In Chapter 2 we met $K = \\tfrac12 I\\omega^2$. Now we connect it to torque the way Mechanics I connected $\\tfrac12 mv^2$ to force.",
    },
    {
      type: "text",
      content:
        "**Work done by a torque.** A tangential force $F_t$ acts at distance $r$ from the axis while the body turns through a small angle $d\\theta$. The point of application moves along an arc $ds = r\\,d\\theta$, so the work is",
    },
    { type: "math", latex: "dW = F_t\\,ds = F_t r\\,d\\theta = \\tau\\,d\\theta \\qquad\\Rightarrow\\qquad W = \\int_{\\theta_1}^{\\theta_2}\\tau\\,d\\theta" },
    {
      type: "text",
      content:
        "(The radial part of the force does no work: it is perpendicular to the arc.) For a constant torque, $W = \\tau\\theta$ with $\\theta$ in **radians**.",
    },
    {
      type: "text",
      content:
        "**The rotational work–energy theorem.** Write $\\alpha = \\frac{d\\omega}{dt} = \\frac{d\\omega}{d\\theta}\\frac{d\\theta}{dt} = \\omega\\frac{d\\omega}{d\\theta}$. Then $\\tau = I\\alpha$ becomes $\\tau\\,d\\theta = I\\omega\\,d\\omega$, and integrating,",
    },
    { type: "math", latex: "W_{\\text{net}} = \\int\\tau\\,d\\theta = \\tfrac12 I\\omega_2^2 - \\tfrac12 I\\omega_1^2" },
    {
      type: "text",
      content:
        "**Power.** Divide $dW = \\tau\\,d\\theta$ by $dt$: $P = \\tau\\omega$, the rotational twin of $P = Fv$. This is why car brochures quote both torque and rpm: power needs both.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Rotational work, energy and power",
      content:
        "Work: $W = \\int\\tau\\,d\\theta$ (constant torque: $W = \\tau\\theta$).\nKinetic energy of rotation about a fixed axis: $K = \\tfrac12 I\\omega^2$.\nWork–energy theorem: $W_{\\text{net}} = \\Delta\\big(\\tfrac12 I\\omega^2\\big)$.\nPower: $P = \\tau\\omega$.\nFor energy conservation in a system, add $\\tfrac12 I\\omega^2$ for every spinning body to the usual $\\tfrac12 mv^2$ and $mgh$ terms.",
    },
    {
      type: "text",
      content:
        "Take $g = 10$ m/s² in this lesson.\n\n**Worked example 1 (block and disc pulley, by energy).** A 2 kg block hangs from a string wound round a uniform 4 kg disc on a fixed frictionless axle. It is released from rest. Find its speed after falling 1 m.\n\n1. Energy lost by the block: $mgh = 2 \\times 10 \\times 1 = 20$ J.\n2. It goes into **two** kinetic energies: the block's $\\tfrac12 mv^2$ and the disc's $\\tfrac12 I\\omega^2$. *Why this step:* the disc is part of the system and it is spinning.\n3. Constraint $\\omega = v/R$ and $I = \\tfrac12 MR^2$ give $\\tfrac12 I\\omega^2 = \\tfrac14 Mv^2$.",
    },
    { type: "math", latex: "mgh = \\tfrac12 mv^2 + \\tfrac14 Mv^2 = \\tfrac12\\big(m + \\tfrac M2\\big)v^2 \\;\\Rightarrow\\; 20 = \\tfrac12(4)v^2" },
    {
      type: "text",
      content:
        "4. $v^2 = 10$, so $v = \\sqrt{10} \\approx 3.16$ m/s.\n5. Cross-check with Lesson 3.2: $a = 5$ m/s² and $v^2 = 2as = 10$. ✓ The disc took $\\tfrac14(4)(10) = 10$ J, exactly half the energy.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (a falling rod, JEE favourite).** A uniform rod of length $L$ stands vertically on its lower end, which is hinged (or rough enough not to slip). It topples. Find the speed of the top end as it hits the ground.\n\n1. The COM falls from height $L/2$ to 0: loss of PE $= mg\\frac L2$.\n2. The rod rotates about its lower end, so all of its KE is $\\tfrac12 I\\omega^2$ with $I = \\tfrac13 mL^2$. *Why this step:* a body rotating about a fixed axis has $K = \\tfrac12 I_{\\text{axis}}\\omega^2$; no separate translational term.\n3. $mg\\frac L2 = \\tfrac12\\cdot\\tfrac13 mL^2\\omega^2 \\Rightarrow \\omega = \\sqrt{3g/L}$.\n4. Tip speed $v = \\omega L = \\sqrt{3gL}$. For $L = 1.2$ m: $v = \\sqrt{36} = 6$ m/s.\n5. Compare: a stone dropped from 1.2 m lands at $\\sqrt{2gL} \\approx 4.9$ m/s. The tip beats free fall because the heavy lower part of the rod pushes it round.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "sqrt(30*x)",
        exprLatex: "v_{\\text{tip}} = \\sqrt{3gL}",
        min: 0.2,
        max: 3,
        step: 0.1,
        initial: 1.2,
        inputLabel: "Rod length L",
        inputUnit: "m",
        outputLabel: "Tip speed (m/s)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the tip speed grows like $\\sqrt L$, so a rod four times as long lands only twice as fast. Try $L = 1.2$ m for 6 m/s and $L = 3$ m for $\\sqrt{90} \\approx 9.5$ m/s. The mass never enters.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (flywheel storage).** A flywheel with $I = 10$ kg m² spins at 600 rpm. How much energy does it store?\n\n1. Convert: $\\omega = 600 \\times \\frac{2\\pi}{60} = 20\\pi$ rad/s. *Why this step:* $K = \\tfrac12 I\\omega^2$ needs rad/s, never rpm.\n2. $K = \\tfrac12 \\times 10 \\times (20\\pi)^2 = 2000\\pi^2 \\approx 1.97\\times10^4$ J, about 20 kJ.\n\n**Worked example 4 (engine torque and power).** An engine delivers 150 N m at 3000 rpm.\n\n1. $\\omega = 3000\\times\\frac{2\\pi}{60} = 100\\pi \\approx 314$ rad/s.\n2. $P = \\tau\\omega = 150 \\times 314.2 \\approx 4.71\\times10^4$ W $= 47.1$ kW.\n\n**Worked example 5 (work by a constant torque).** A torque of 5 N m turns a wheel through 10 revolutions.\n\n1. $\\theta = 10 \\times 2\\pi = 20\\pi$ rad.\n2. $W = \\tau\\theta = 100\\pi \\approx 314$ J. Using $\\theta = 10$ would give 50 J, a factor $2\\pi$ too small.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the block's loss of PE all goes into the block's KE\"",
      content:
        "Then the block would land at $\\sqrt{2gh}$, as if the pulley were not there. But the string drags the pulley round, and the pulley's rotational KE comes out of the same budget. With a 4 kg disc and a 2 kg block, half of the energy ends up in the disc. Always ask: which bodies in the system are moving or spinning?",
    },
    {
      type: "quiz",
      id: "mrg3-4-q1",
      variant: "practice",
      question: "A 1 kg block hangs from a string wound on a uniform 2 kg disc pulley (fixed frictionless axle). Released from rest, how fast is it moving after falling 0.8 m? Take $g = 10$ m/s².",
      options: [
        { text: "$2.83$ m/s", correct: true, feedback: "$mgh = \\tfrac12(m + \\tfrac M2)v^2$: $8 = \\tfrac12(2)v^2$, so $v = \\sqrt8 \\approx 2.83$ m/s." },
        { text: "$4$ m/s", feedback: "That is $\\sqrt{2gh}$, which ignores the disc's rotational KE." },
        { text: "$2.31$ m/s", feedback: "That treats the pulley as a ring ($I = MR^2$). For a disc, $I/R^2 = M/2 = 1$ kg." },
        { text: "$2$ m/s", feedback: "Recheck: $\\tfrac12(1 + 1)v^2 = 8$ gives $v^2 = 8$, not 4." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-4-q2",
      variant: "practice",
      question: "A uniform rod 2.7 m long, standing vertically on a hinged lower end, falls over. With what speed does its top end hit the ground? Take $g = 10$ m/s².",
      options: [
        { text: "$7.35$ m/s", feedback: "That is $\\sqrt{2gL}$, free fall from 2.7 m. The rod's rotation makes the tip faster." },
        { text: "$9$ m/s", correct: true, feedback: "$v = \\sqrt{3gL} = \\sqrt{81} = 9$ m/s." },
        { text: "$4.5$ m/s", feedback: "That is the speed of the midpoint, $\\omega L/2$." },
        { text: "$18$ m/s", feedback: "That uses $I = \\frac{1}{12}mL^2$ about the centre ($\\omega^2 = 12g/L$). The rod turns about its lower end, so $I = \\frac13 mL^2$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-4-q3",
      variant: "practice",
      question: "A motor delivers a torque of 20 N m at 1200 rpm. What is its power output?",
      options: [
        { text: "$24$ kW", feedback: "That multiplies by rpm directly. $P = \\tau\\omega$ needs $\\omega$ in rad/s." },
        { text: "$400$ W", feedback: "That uses revolutions per second (20). Each revolution is $2\\pi$ radians." },
        { text: "about $2.5$ kW", correct: true, feedback: "$\\omega = 1200\\times\\frac{2\\pi}{60} = 40\\pi \\approx 125.7$ rad/s, and $P = 20 \\times 125.7 \\approx 2513$ W." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-4-q4",
      variant: "concept",
      question: "A ring and a uniform disc have the same mass and radius and spin at the same $\\omega$ about their axes. Which stores more kinetic energy?",
      options: [
        { text: "The ring, twice as much", correct: true, feedback: "$I_{\\text{ring}} = MR^2$ and $I_{\\text{disc}} = \\tfrac12 MR^2$; $K = \\tfrac12 I\\omega^2$ follows $I$." },
        { text: "The disc, because it has more material near the axis", feedback: "Material near the axis contributes little to $I$. The ring puts all of its mass at the rim." },
        { text: "They are equal, since mass, radius and $\\omega$ are equal", feedback: "Rotational KE depends on how the mass is distributed, through $I$, not just on $M$ and $R$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-4-q5",
      variant: "practice",
      question: "A constant torque of 2 N m spins a wheel with $I = 0.2$ kg m² from rest to 10 rad/s. Through what angle does it turn?",
      options: [
        { text: "$2.5$ rad", feedback: "You halved twice. $\\tau\\theta = \\tfrac12 I\\omega^2$ gives $2\\theta = 10$." },
        { text: "$50$ rad", feedback: "Check $\\Delta K$: $\\tfrac12 \\times 0.2 \\times 10^2 = 10$ J, not 100 J." },
        { text: "$10$ rad", feedback: "That is $\\Delta K$ in joules, not the angle. Divide by the torque." },
        { text: "$5$ rad", correct: true, feedback: "Work $= \\Delta K = \\tfrac12(0.2)(100) = 10$ J, and $\\theta = W/\\tau = 5$ rad." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "hinge-forces-and-instantaneous-problems",
  title: "3.5 · Hinge Forces and Instantaneous Analysis",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A plank rests on two bricks, one at each end. Each brick carries half its weight. Now kick one brick away. At that very instant, before the plank has moved at all, how hard does the other brick push? Most people say \"the whole weight\" or \"still half\". The answer is a quarter, and finding it needs every tool of this chapter at once.",
    },
    {
      type: "text",
      content:
        "The key is that $\\tau = I\\alpha$ and $\\vec F_{\\text{ext}} = M\\vec a_{cm}$ hold **at every instant**, including the first. A support force is not a fixed share of the weight; it is whatever the motion requires.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The four-step recipe for hinge and support forces",
      content:
        "1. Find $\\alpha$ from torques about the hinge (the unknown hinge force has no torque there).\n2. Find $\\omega$ at that instant, from energy if the body has already turned (zero at release).\n3. Find the COM's acceleration: tangential $a_t = \\alpha d$ and centripetal $a_c = \\omega^2 d$, where $d$ is the hinge–COM distance.\n4. Apply $\\vec F_{\\text{hinge}} + M\\vec g = M\\vec a_{cm}$ component by component.",
    },
    {
      type: "text",
      content:
        "Take $g = 10$ m/s² in this lesson.\n\n**Worked example 1 (rod hinged at one end, at release).** A uniform rod of mass $m$ and length $L$ is hinged at one end, held horizontal and released.\n\n1. $\\alpha = \\dfrac{mgL/2}{mL^2/3} = \\dfrac{3g}{2L}$ (Lesson 3.2).\n2. At release $\\omega = 0$, so there is no centripetal acceleration.\n3. The COM, at $L/2$ from the hinge, accelerates straight down at $a_{cm} = \\alpha\\frac L2 = \\frac34 g$. *Why this step:* with the rod horizontal, the tangent to the COM's circle is vertical.\n4. Vertical: $mg - N = m\\cdot\\frac34 g$, so the hinge pushes up with $N = \\dfrac{mg}{4}$.",
    },
    {
      type: "text",
      content:
        "That is the plank answer. The instant one brick goes, the plank begins to pivot about the other end exactly like this rod, and the remaining brick's force drops from $\\frac{mg}{2}$ to $\\frac{mg}{4}$. The same holds for a rod hanging horizontally from two vertical strings when one is cut: the other string's tension jumps from $\\frac{mg}{2}$ to $\\frac{mg}{4}$ at that instant.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (the same rod at angle $\\theta$ below the horizontal).**\n\n1. Energy: the COM has dropped $\\frac L2\\sin\\theta$, so $mg\\frac L2\\sin\\theta = \\tfrac12\\cdot\\tfrac13 mL^2\\omega^2$, giving $\\omega^2 = \\dfrac{3g\\sin\\theta}{L}$.\n2. Torque: the weight's lever arm is now $\\frac L2\\cos\\theta$, so $\\alpha = \\dfrac{3g\\cos\\theta}{2L}$.\n3. COM accelerations: towards the hinge, $a_c = \\omega^2\\frac L2 = \\tfrac32 g\\sin\\theta$; along the tangent, $a_t = \\alpha\\frac L2 = \\tfrac34 g\\cos\\theta$.\n4. Resolve gravity along the rod (outwards, away from the hinge: $mg\\sin\\theta$) and across it (in the direction of turning: $mg\\cos\\theta$). *Why this step:* the accelerations are naturally radial and tangential, so resolve the forces the same way.",
    },
    {
      type: "math",
      latex:
        "F_r - mg\\sin\\theta = m\\cdot\\tfrac32 g\\sin\\theta \\Rightarrow F_r = \\tfrac52 mg\\sin\\theta, \\qquad mg\\cos\\theta - F_t = m\\cdot\\tfrac34 g\\cos\\theta \\Rightarrow F_t = \\tfrac14 mg\\cos\\theta",
    },
    {
      type: "text",
      content:
        "5. The hinge force is $mg\\sqrt{6.25\\sin^2\\theta + 0.0625\\cos^2\\theta}$. At $\\theta = 0$ it is $0.25mg$ (release). At $\\theta = 90^\\circ$ (rod hanging straight down, moving fastest) it is $2.5mg$: the hinge must hold up the weight *and* supply the centripetal force $1.5mg$.",
    },
    {
      type: "text",
      content:
        "Drag the point along the curve below ($x$ is the angle $\\theta$ in radians, from 0 at release to about $\\pi/2$ at the bottom).",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "sqrt(6.25*sin(x)^2 + 0.0625*cos(x)^2)",
        exprLatex: "\\frac{F_{\\text{hinge}}}{mg} = \\sqrt{6.25\\sin^2\\theta + 0.0625\\cos^2\\theta}",
        window: { xmin: 0, xmax: 1.6, ymin: 0, ymax: 3 },
        initial: 0,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the hinge force starts at only a quarter of the weight, passes $mg$ at about $\\theta \\approx 23^\\circ$ (0.40 rad), and climbs to $2.5mg$ at the bottom. A hinge designed to carry \"the weight of the rod\" would fail as the rod swings through.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (a point mass on a light rod).** A 1 kg ball is fixed to the end of a light rod of length $L$, hinged at the other end, held horizontal and released. Find the hinge force at release.\n\n1. $I = mL^2$ and $\\tau = mgL$, so $\\alpha = g/L$.\n2. The ball's acceleration is $\\alpha L = g$: it starts off in free fall.\n3. $mg - N = mg$, so $N = 0$. *Why this step:* compare with the uniform rod: there the inner parts of the rod hold the outer parts back, and the hinge has work to do; here nothing needs holding.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (axle force on a massive pulley, JEE Main).** In the Atwood machine of Lesson 3.2 (3 kg and 1 kg on a 4 kg disc, $a = \\frac{10}{3}$ m/s², $T_1 = 20$ N, $T_2 = \\frac{40}{3}$ N), what force does the axle exert on the pulley?\n\n1. Pulley: its centre does not move, so the axle force balances everything else: $N = Mg + T_1 + T_2 = 40 + 20 + 13.3 = 73.3$ N.\n2. Check with the whole system (both blocks and pulley). The external forces are the axle force and the total weight 80 N. The 3 kg block accelerates down at $\\frac{10}{3}$ and the 1 kg block up at $\\frac{10}{3}$: $\\sum m a_y = -3\\cdot\\tfrac{10}{3} + 1\\cdot\\tfrac{10}{3} = -\\tfrac{20}{3}$ (up +). *Why this step:* $\\vec F_{\\text{ext}} = \\sum m_i\\vec a_i$ for the system, from Chapter 0.\n3. $N - 80 = -\\tfrac{20}{3}$, so $N = 73.3$ N. ✓ The axle holds up less than the total weight because the system's COM is accelerating downwards.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"at the instant a support is removed, the other support still carries half the weight\"",
      content:
        "Support forces are not shares of the weight fixed in advance. They are whatever $\\vec F = M\\vec a_{cm}$ requires. Once the plank begins to fall, its COM accelerates down at $\\frac34 g$, so the remaining support needs to provide only $\\frac14 mg$. The force changes instantly even though the position has not changed yet.",
    },
    {
      type: "quiz",
      id: "mrg3-5-q1",
      variant: "practice",
      question: "A uniform rod of mass 3 kg is hinged at one end and released from rest in a horizontal position. What is the hinge force at the instant of release? Take $g = 10$ m/s².",
      options: [
        { text: "$15$ N", feedback: "That is half the weight, the value while the rod was held. Once released, the COM accelerates and the hinge force drops." },
        { text: "$22.5$ N", feedback: "That is $m a_{cm} = \\frac34 mg$. The hinge force is $mg - ma_{cm}$." },
        { text: "$7.5$ N", correct: true, feedback: "$N = \\frac{mg}{4} = 7.5$ N, since the COM accelerates down at $\\frac34 g$." },
        { text: "$30$ N", feedback: "The full weight would mean the COM does not accelerate, but it does." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-5-q2",
      variant: "practice",
      question: "The same 3 kg rod swings down and passes the vertical (hanging) position. What is the hinge force then?",
      options: [
        { text: "$30$ N", feedback: "That is just the weight. The COM is moving on a circle and needs a centripetal force too." },
        { text: "$75$ N", correct: true, feedback: "$\\omega^2 = 3g/L$ gives a centripetal acceleration $\\omega^2\\frac L2 = 1.5g$ at the COM, so $N = mg + 1.5mg = 2.5mg = 75$ N." },
        { text: "$45$ N", feedback: "That is the centripetal force alone, $1.5mg$. The hinge must also hold up the weight." },
        { text: "$60$ N", feedback: "That takes the centripetal acceleration of the COM as $g$. Energy gives $\\omega^2 = 3g/L$, so at $L/2$ it is $1.5g$ and the total is $2.5mg$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-5-q3",
      variant: "concept",
      question: "A uniform rod hangs horizontally from two vertical strings, one at each end. One string is cut. What is the tension in the other string at that instant?",
      options: [
        { text: "$\\frac{mg}{4}$", correct: true, feedback: "The rod starts to pivot about the remaining end: $\\alpha = \\frac{3g}{2L}$, $a_{cm} = \\frac34 g$, so $T = mg - \\frac34 mg$." },
        { text: "$\\frac{mg}{2}$, unchanged", feedback: "That was the tension in equilibrium. Once the COM starts accelerating, the tension must change." },
        { text: "$mg$, since it now carries the whole rod", feedback: "Carrying the whole weight would mean the COM stays put, but the rod starts to fall." },
        { text: "zero, since the rod falls freely", feedback: "The end attached to the string cannot fall at the first instant, so the rod is not in free fall." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-5-q4",
      variant: "concept",
      question: "A small heavy ball is fixed to the end of a light rod, hinged at its other end. The rod is released from horizontal. What is the hinge force at the instant of release?",
      options: [
        { text: "Zero", correct: true, feedback: "$\\alpha = g/L$ makes the ball accelerate at exactly $g$; nothing needs to hold it back." },
        { text: "$\\frac{mg}{4}$", feedback: "That is for a uniform rod, whose inner parts hold back the outer parts. Here all the mass is at the end." },
        { text: "$\\frac{mg}{2}$", feedback: "Work it out: $\\tau = mgL$, $I = mL^2$, so the ball starts in free fall." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-5-q5",
      variant: "practice",
      question: "Blocks of 3 kg and 1 kg hang over a uniform disc pulley of mass 4 kg (Atwood machine). The tensions are 20 N and $\\frac{40}{3}$ N. What force does the axle exert on the pulley? Take $g = 10$ m/s².",
      options: [
        { text: "$80$ N", feedback: "That is the total weight. The system's COM accelerates downwards, so the axle pushes up with less." },
        { text: "$33.3$ N", feedback: "You left out the pulley's own weight, 40 N." },
        { text: "$73.3$ N", correct: true, feedback: "$Mg + T_1 + T_2 = 40 + 20 + 13.3 = 73.3$ N." },
        { text: "$66.7$ N", feedback: "That subtracts $\\sum ma$ twice. Check: $N - 80 = -\\frac{20}{3}$." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-3-mastery",
  title: "3.6 · Chapter 3 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "The chapter in six lines",
      content:
        "1. Torque $\\vec\\tau = \\vec r\\times\\vec F$: magnitude $rF\\sin\\theta = F \\times$ lever arm; a couple has the same torque about every point.\n2. $F = ma$ for each particle, multiplied by $r$ and summed, gives $\\tau_{\\text{ext}} = I\\alpha$ about a fixed axis (or the COM).\n3. Pulleys with mass: different tensions on each side, and the pulley adds $I/R^2$ to the inertia.\n4. Equilibrium needs $\\sum\\vec F = 0$ **and** $\\sum\\vec\\tau = 0$; the torque sum may be taken about any point.\n5. $W = \\int\\tau\\,d\\theta$, $K = \\tfrac12 I\\omega^2$, $P = \\tau\\omega$; energy conservation must include every spinning body.\n6. Hinge forces: $\\alpha$ from torques, $\\omega$ from energy, then $\\vec F_{\\text{hinge}} + M\\vec g = M\\vec a_{cm}$.",
    },
    {
      type: "text",
      content:
        "No formula sheet: rebuild each result from $\\vec r\\times\\vec F$, $\\tau = I\\alpha$ and energy. Take $g = 10$ m/s² throughout.",
    },
    {
      type: "quiz",
      id: "mrg3-6-q1",
      variant: "mastery",
      question: "A force $\\vec F = \\hat i + 2\\hat j - \\hat k$ N acts at the point $\\vec r = 2\\hat i + \\hat k$ m. Find its torque about the origin.",
      options: [
        { text: "$2\\hat i - 3\\hat j - 4\\hat k$ N m", feedback: "That is $\\vec F\\times\\vec r$. The order is $\\vec r\\times\\vec F$." },
        { text: "$-2\\hat i + 3\\hat j + 4\\hat k$ N m", correct: true, feedback: "$\\hat i(0\\cdot(-1) - 1\\cdot 2) - \\hat j(2\\cdot(-1) - 1\\cdot 1) + \\hat k(2\\cdot 2 - 0\\cdot 1) = -2\\hat i + 3\\hat j + 4\\hat k$." },
        { text: "$-2\\hat i - 3\\hat j + 4\\hat k$ N m", feedback: "Watch the minus sign in front of the $\\hat j$ cofactor: $-(2(-1) - 1) = +3$." },
        { text: "$1$ N m", feedback: "That is $\\vec r\\cdot\\vec F = 2 + 0 - 1$. Torque is the cross product, a vector." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-6-q2",
      variant: "mastery",
      question: "A uniform disc lying on a smooth horizontal table is acted on by a couple only. What happens to it?",
      options: [
        { text: "Its centre stays at rest while it spins with increasing $\\omega$", correct: true, feedback: "Net force zero, so $a_{cm} = 0$; net torque $Fd$, so $\\alpha = Fd/I_{cm}$." },
        { text: "It moves off in the direction of the larger lever arm", feedback: "A couple has zero net force, so the COM cannot accelerate in any direction." },
        { text: "Nothing, because the two forces cancel", feedback: "The forces cancel in the sum, but their torques add." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-6-q3",
      variant: "mastery",
      question: "Blocks of 5 kg and 3 kg hang over a uniform disc pulley of mass 4 kg; the string does not slip. Find the acceleration.",
      options: [
        { text: "$2$ m/s²", correct: true, feedback: "$a = \\frac{(5-3)(10)}{5 + 3 + 4/2} = \\frac{20}{10} = 2$ m/s²." },
        { text: "$2.5$ m/s²", feedback: "That is the light-pulley answer, $\\frac{20}{8}$. The disc adds $M/2 = 2$ kg of inertia." },
        { text: "$1.67$ m/s²", feedback: "That treats the pulley as a ring, adding $M = 4$ kg. A disc adds $M/2$." },
        { text: "$2.22$ m/s²", feedback: "That adds $M/4$. For a disc about its axis, $I/R^2 = M/2$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-6-q4",
      variant: "mastery",
      question: "In the machine of the previous question (5 kg and 3 kg, disc of 4 kg, $a = 2$ m/s²), what are the tensions on the two sides?",
      options: [
        { text: "$37.5$ N on both sides", feedback: "That is $\\frac{2m_1m_2g}{m_1+m_2}$ for a light pulley. A massive pulley needs unequal tensions." },
        { text: "$40$ N on the 5 kg side, $36$ N on the 3 kg side", correct: true, feedback: "$T_1 = 5(10 - 2) = 40$ N, $T_2 = 3(10 + 2) = 36$ N, and $(T_1 - T_2) = \\tfrac12 Ma = 4$ N. ✓" },
        { text: "$36$ N on the 5 kg side, $40$ N on the 3 kg side", feedback: "Reversed: the pulley turns towards the heavy side, so the larger tension is there." },
        { text: "$50$ N and $30$ N", feedback: "Those are the weights. Accelerating blocks do not have tension equal to weight." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-6-q5",
      variant: "mastery",
      question: "A uniform rod of mass 4 kg is hinged at one end and released from horizontal. Find the force on the hinge at the instant of release.",
      options: [
        { text: "$20$ N upwards", feedback: "Half the weight holds only while the rod is supported at both ends." },
        { text: "$30$ N upwards", feedback: "That is $ma_{cm}$. The hinge supplies $mg - ma_{cm}$." },
        { text: "$10$ N upwards", correct: true, feedback: "$a_{cm} = \\frac34 g$, so $N = mg - \\frac34 mg = \\frac14(40) = 10$ N." },
        { text: "zero", feedback: "Zero hinge force at release is the point-mass-on-light-rod result. A uniform rod needs $\\frac{mg}{4}$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-6-q6",
      variant: "mastery",
      question: "A uniform ladder rests against a smooth wall, making $60^\\circ$ with a rough floor. What is the least coefficient of friction that stops it slipping?",
      options: [
        { text: "$\\frac{1}{2\\sqrt3} \\approx 0.29$", correct: true, feedback: "$\\mu_{\\min} = \\frac{1}{2\\tan 60^\\circ} = \\frac{1}{2\\sqrt3}$." },
        { text: "$\\frac{\\sqrt3}{2} \\approx 0.87$", feedback: "That is $\\frac{\\tan 60^\\circ}{2}$. The wall force is $\\frac{W}{2\\tan\\theta}$: steeper means less friction." },
        { text: "$\\frac{1}{\\sqrt3} \\approx 0.58$", feedback: "That forgets that the weight acts at the midpoint, halving its torque about the foot." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-6-q7",
      variant: "mastery",
      question: "A tall block (base 0.4 m wide, height 1 m, weight $W$) stands on a floor with $\\mu = 0.5$. A horizontal push is applied at height $h$. Above what height does it topple before it slides?",
      options: [
        { text: "$0.2$ m", feedback: "That is half the base, the restoring lever arm. Compare the two threshold forces." },
        { text: "$0.5$ m", feedback: "Half the height has no special role here. Set $\\frac{Wb}{2h} = \\mu W$." },
        { text: "$0.8$ m", feedback: "That is $b/\\mu$; the restoring lever arm is $b/2$, so the threshold is $\\frac{b}{2\\mu}$." },
        { text: "$0.4$ m", correct: true, feedback: "Topple: $Fh > W\\frac{0.4}{2}$; slide: $F > 0.5W$. Toppling comes first when $\\frac{0.2W}{h} < 0.5W$, i.e. $h > 0.4$ m." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-6-q8",
      variant: "mastery",
      question: "A constant torque takes a flywheel ($I = 4$ kg m²) from rest to 30 rad/s in 6 s. What power is the torque delivering at the end of the 6 s?",
      options: [
        { text: "$300$ W", feedback: "That is the average power, $\\frac{1800\\text{ J}}{6\\text{ s}}$. With constant torque the power grows with $\\omega$." },
        { text: "$1800$ W", feedback: "1800 J is the kinetic energy gained, not a power." },
        { text: "$600$ W", correct: true, feedback: "$\\alpha = 5$ rad/s², $\\tau = I\\alpha = 20$ N m, and $P = \\tau\\omega = 20 \\times 30 = 600$ W." },
        { text: "$120$ W", feedback: "$\\tau \\times t$ is an angular impulse. Power is $\\tau\\omega$." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-6-q9",
      variant: "mastery",
      question: "A uniform rod 1.2 m long stands vertically on a hinged lower end and falls over. How fast is its **midpoint** moving when the rod hits the floor?",
      options: [
        { text: "$6$ m/s", feedback: "That is the tip, at distance $L$ from the hinge." },
        { text: "$3$ m/s", correct: true, feedback: "$\\omega = \\sqrt{3g/L} = 5$ rad/s, so the midpoint moves at $\\omega\\frac L2 = 3$ m/s (the tip at 6 m/s)." },
        { text: "$3.46$ m/s", feedback: "That is $\\sqrt{gL}$, free fall of the COM through $L/2$. Some of the energy goes into rotation about the COM." },
        { text: "$4.9$ m/s", feedback: "That is $\\sqrt{2gL}$, free fall from the full length." },
      ],
    },
    {
      type: "quiz",
      id: "mrg3-6-q10",
      variant: "mastery",
      question: "A 2 kg block on a smooth horizontal table is tied to a string that runs over a uniform disc pulley (mass 2 kg, at the table edge) to a hanging 3 kg block. What is the tension in the horizontal part of the string?",
      options: [
        { text: "$10$ N", correct: true, feedback: "$a = \\frac{3g}{2 + 3 + 2/2} = 5$ m/s², and the table block needs $T = 2 \\times 5 = 10$ N. (Hanging side: $3(10-5) = 15$ N.)" },
        { text: "$15$ N", feedback: "That is the tension in the hanging part. The pulley's inertia makes the two differ." },
        { text: "$12$ N", feedback: "That is the light-pulley tension, $\\frac{m_1m_2g}{m_1+m_2}$." },
        { text: "$30$ N", feedback: "That is the hanging block's weight. It accelerates, so the tension is less." },
      ],
      hint: "Write $F = ma$ for each block and $(T_2 - T_1)R = \\tfrac12 MR^2\\alpha$ for the pulley, with $a = \\alpha R$.",
    },
    {
      type: "quiz",
      id: "mrg3-6-q11",
      variant: "mastery",
      question: "A yo-yo (a uniform disc of mass 0.6 kg) falls as its string unwinds; the top of the string is held fixed. What is the tension in the string?",
      options: [
        { text: "$6$ N", feedback: "That is the full weight. The yo-yo accelerates down, so the string must pull less than $mg$." },
        { text: "$3$ N", feedback: "That is $\\frac{mg}{2}$. Solve the pair of equations: $a = \\frac23 g$, then $T = m(g - a)$." },
        { text: "$4$ N", feedback: "That is $m a$ with $a = \\frac23 g$, not the tension." },
        { text: "$2$ N", correct: true, feedback: "$mg - T = ma$ and $TR = \\tfrac12 mR^2\\alpha$ with $a = \\alpha R$ give $T = \\tfrac12 ma$, so $a = \\frac23 g$ and $T = \\frac{mg}{3} = 2$ N." },
      ],
      hint: "Use $\\tau = I\\alpha$ about the centre of the yo-yo, which is allowed even though the centre accelerates.",
    },
    {
      type: "quiz",
      id: "mrg3-6-q12",
      variant: "mastery",
      question: "A uniform rod of mass 2 kg and length 1.5 m is hinged at one end and released from horizontal. As it passes the vertical, what are its angular speed and the hinge force?",
      options: [
        { text: "$\\omega = \\sqrt{20}$ rad/s, hinge force $20$ N", feedback: "At the bottom the COM moves on a circle; the hinge must supply centripetal force as well as the weight." },
        { text: "$\\omega = \\sqrt{40/3} \\approx 3.7$ rad/s, hinge force $40$ N", feedback: "That uses $\\omega^2 = 2g/L$, as if all the mass fell a height $L$. The COM falls only $L/2$ and $I = \\frac13 mL^2$." },
        { text: "$\\omega = \\sqrt{20} \\approx 4.5$ rad/s, hinge force $50$ N", correct: true, feedback: "$\\omega^2 = \\frac{3g}{L} = 20$; centripetal at the COM $\\omega^2\\frac L2 = 15$ m/s², so $N = 2(10 + 15) = 50$ N." },
        { text: "$\\omega = \\sqrt{80} \\approx 8.9$ rad/s, hinge force $140$ N", feedback: "That uses $I = \\frac{1}{12}mL^2$. The rod turns about the hinge, not its centre." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Torque changes spin, just as force changes motion. Chapter 4 finds the quantity torque changes, angular momentum, and the conservation law that follows when there is no torque: spinning skaters, sticking particles and rolling balls.",
    },
  ]),
};

export const mrgChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
