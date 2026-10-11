import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Electricity and Magnetism Chapter 6 — Magnetism and Matter and
 * Electromagnetic Waves. Builds on lessons 4.7 and 5.7 without repeating
 * them: the bar magnet as an equivalent solenoid and pole pair (exact and
 * general-point fields, cut and bent magnets), torque, energy and
 * oscillation in a uniform field, the Earth's field (apparent dip, neutral
 * points, tangent law, tangent galvanometer), M, H, susceptibility and the
 * three kinds of magnetic material with hysteresis; then displacement
 * current and Maxwell's equations, EM-wave properties and wave equations,
 * energy, intensity, momentum and radiation pressure, and the spectrum.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "bar-magnet-as-a-dipole",
  title: "6.1 · The Bar Magnet as a Magnetic Dipole",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Sprinkle iron filings round a bar magnet and round a short current-carrying solenoid, and photograph both. Hide the middle of each picture and you cannot tell them apart. Lesson 4.7 said why: a magnet is a crowd of atomic current loops. This lesson makes that picture do real work. We find the exact field of a magnet of finite length, the field at any point (not just on the two special lines), and what happens to the magnetic moment when a magnet is cut or bent.",
    },
    { type: "heading", text: "A bar magnet is a solenoid" },
    {
      type: "text",
      content:
        "Picture the aligned atomic loops inside a magnetised bar, packed side by side across each cross-section. Where two neighbouring loops touch, their currents run in opposite directions and cancel. Only the currents round the outer edge survive, so the whole bar behaves like a sheet of current wrapped round its surface: a **solenoid**. A solenoid of $N$ turns, each of area $A$, carrying current $I$, has magnetic moment",
    },
    { type: "math", latex: "m = NIA \\qquad (\\text{pointing along the axis, by the right-hand grip rule})" },
    {
      type: "text",
      content:
        "and its field outside is the bar magnet's field. The end from which the field lines leave behaves as the N pole. This is why we could borrow every solenoid result from Chapter 4 for magnets.",
    },
    { type: "heading", text: "The pole model" },
    {
      type: "text",
      content:
        "For calculating fields near a magnet, JEE also uses an older but very convenient picture: two **magnetic poles** of strength $+q_m$ (N) and $-q_m$ (S), a distance $2l$ apart. Each pole makes a field like a point charge's, with $\\dfrac{1}{4\\pi\\varepsilon_0}\\to\\dfrac{\\mu_0}{4\\pi}$:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Pole strength and magnetic moment",
      content:
        "Field of a single pole: $B = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{q_m}{r^2}$, away from N and towards S. Pole strength $q_m$ is measured in A m.\nMagnetic moment $\\vec m = q_m(2\\vec l)$, pointing from S to N inside the magnet. Unit A m² (equivalently J/T).\n$2l$ is the **magnetic length**. The poles sit a little inside the ends, so $2l \\approx 0.84\\times$ the geometric length.\nIsolated poles do not exist. The model is a calculating device, and it gives the right field everywhere outside the magnet.",
    },
    { type: "heading", text: "Exact fields on the axis and the equator" },
    {
      type: "text",
      content:
        "**On the axis**, at distance $r$ from the centre beyond the N pole, the N pole is $r - l$ away and the S pole $r + l$ away. Their fields point in opposite directions along the axis:",
    },
    {
      type: "math",
      latex: "B_{\\text{axial}} = \\frac{\\mu_0 q_m}{4\\pi}\\left[\\frac{1}{(r-l)^2} - \\frac{1}{(r+l)^2}\\right] = \\frac{\\mu_0}{4\\pi}\\,\\frac{2mr}{(r^2 - l^2)^2}",
    },
    {
      type: "text",
      content:
        "**On the equatorial line**, both poles are $\\sqrt{r^2 + l^2}$ away. The two fields have equal size; their components along the equatorial line cancel, and their components parallel to the axis add (each is the pole field times $l/\\sqrt{r^2 + l^2}$):",
    },
    {
      type: "math",
      latex: "B_{\\text{eq}} = 2\\cdot\\frac{\\mu_0}{4\\pi}\\frac{q_m}{r^2 + l^2}\\cdot\\frac{l}{\\sqrt{r^2 + l^2}} = \\frac{\\mu_0}{4\\pi}\\,\\frac{m}{(r^2 + l^2)^{3/2}}\\quad(\\text{opposite to }\\vec m)",
    },
    {
      type: "text",
      content:
        "When $r \\gg l$ these become the short-magnet results of lesson 4.7, $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{r^3}$ and $\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{r^3}$. In the lab below, P sits at distance $r$ from the centre and angle $\\theta$ from the magnet's N direction. Set $\\theta = 0^\\circ$ (axis) and then $90^\\circ$ (equator), and shrink $r$ until it is only twice $l$.",
    },
    {
      type: "interactive",
      config: {
        component: "em-magnet-lab",
        mode: "field",
        halfLength: 5,
        distance: { min: 7, max: 28, step: 1, initial: 15 },
        angle: 0,
        readouts: ["probe", "axial-equatorial"],
        caption:
          "Compare the exact field (both poles) with the short-magnet formula. Far away they agree; close in, the short-magnet formula **underestimates** the axial field and **overestimates** the equatorial field.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $r = 15$ cm with $l = 5$ cm the short-magnet formula is about 21% low on the axis and about 17% high on the equator, and the axial-to-equatorial ratio is nearer 3 than 2. Push $r$ to 28 cm and the errors fall to a few per cent, with the ratio close to 2. Use the exact forms whenever the question gives you the magnet's length and the distance is not much larger.",
    },
    { type: "heading", text: "The field at any point" },
    {
      type: "text",
      content:
        "For a short magnet, split $\\vec m$ at the point P (distance $r$, angle $\\theta$ from the axis) into a part $m\\cos\\theta$ along the line OP and a part $m\\sin\\theta$ across it. P lies on the **axis** of the first part and on the **equator** of the second, so",
    },
    {
      type: "math",
      latex: "B_r = \\frac{\\mu_0}{4\\pi}\\frac{2m\\cos\\theta}{r^3}, \\quad B_\\theta = \\frac{\\mu_0}{4\\pi}\\frac{m\\sin\\theta}{r^3} \\;\\Longrightarrow\\; B = \\frac{\\mu_0}{4\\pi}\\frac{m}{r^3}\\sqrt{1 + 3\\cos^2\\theta}, \\quad \\tan\\alpha = \\tfrac12\\tan\\theta",
    },
    {
      type: "text",
      content:
        "Here $\\alpha$ is the angle the field makes with the line OP. Two checks: $\\theta = 0$ gives the axial result and $\\theta = 90^\\circ$ the equatorial one. A favourite JEE question asks where the field is perpendicular to the magnet's axis. The field makes angle $\\theta + \\alpha$ with the axis, so we need $\\theta + \\alpha = 90^\\circ$, which means $\\tan\\alpha = \\cot\\theta$. With $\\tan\\alpha = \\tfrac12\\tan\\theta$ this gives $\\tan^2\\theta = 2$, so $\\theta = \\tan^{-1}\\sqrt2 \\approx 54.7^\\circ$.",
    },
    { type: "heading", text: "Cutting and bending a magnet" },
    {
      type: "text",
      content:
        "Every piece of a magnet is itself a magnet with an N and an S end, because cutting never separates the atomic loops, it only divides the crowd. Track $q_m$ and $l$ to see what happens to $m = q_m(2l)$:\n\n- **Cut across** the length into $n$ equal pieces: the cross-section is unchanged, so each piece keeps the full pole strength $q_m$, but its length is $2l/n$. Each piece has moment $m/n$.\n- **Cut along** the length into $n$ equal strips: each strip has $1/n$ of the cross-section, so pole strength $q_m/n$, with the full length. Each strip again has moment $m/n$.\n- **Bend** a thin magnet: the poles stay at the ends, so $q_m$ is unchanged but the straight-line distance between them shrinks. Bent at its middle into an L, the poles are $2l/\\sqrt2$ apart and $m' = m/\\sqrt2$. Bent into a semicircle of arc length $2l$, the poles are a diameter $4l/\\pi$ apart and $m' = 2m/\\pi$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Why there is no magnetic charge",
      content:
        "Since no cut ever isolates a pole, every closed surface encloses equal amounts of \"N\" and \"S\", and the net magnetic flux through it is zero: $\\oint\\vec B\\cdot d\\vec A = 0$ (lesson 4.7). Moments add as vectors: two identical magnets laid crossed at right angles, centres together, act like one magnet of moment $\\sqrt2\\,m$ along the bisector.",
    },
    { type: "heading", text: "Worked examples: exact fields and changed magnets" },
    {
      type: "worked-example",
      id: "em6-1-we1",
      title: "Worked example 1: exact axial field",
      problem:
        "A bar magnet has pole strength 20 A m and magnetic length 10 cm. Find the field on its axis 15 cm from its centre, and compare it with the short-magnet formula.",
      steps: [
        { text: "$m = q_m(2l) = 20\\times0.1 = 2$ A m², with $l = 0.05$ m and $r = 0.15$ m." },
        { text: "$B = 10^{-7}\\times\\dfrac{2\\times2\\times0.15}{(0.0225 - 0.0025)^2} = 10^{-7}\\times\\dfrac{0.6}{4\\times10^{-4}} = 1.5\\times10^{-4}$ T. *Why this step:* $r$ is only three times $l$, so the exact form is needed." },
        { text: "Short-magnet value: $10^{-7}\\times\\dfrac{2\\times2}{(0.15)^3} \\approx 1.19\\times10^{-4}$ T, about 21% too low." },
      ],
      answer: "$1.5\\times10^{-4}$ T along $\\vec m$ (the short-magnet formula gives $1.19\\times10^{-4}$ T)",
    },
    {
      type: "worked-example",
      id: "em6-1-we2",
      title: "Worked example 2: exact equatorial field",
      problem:
        "For the same magnet ($m = 2$ A m², $l = 5$ cm), find the field on the equatorial line 12 cm from the centre.",
      steps: [
        { text: "Distance to each pole: $\\sqrt{12^2 + 5^2} = 13$ cm, so $(r^2 + l^2)^{3/2} = (0.13)^3 = 2.197\\times10^{-3}$ m³. *Why this step:* the 5–12–13 triangle makes the power $3/2$ easy." },
        { text: "$B = 10^{-7}\\times\\dfrac{2}{2.197\\times10^{-3}} \\approx 9.1\\times10^{-5}$ T, pointing from the N end towards the S end (opposite to $\\vec m$)." },
      ],
      answer: "$B \\approx 9.1\\times10^{-5}$ T, antiparallel to $\\vec m$",
    },
    {
      type: "worked-example",
      id: "em6-1-we3",
      title: "Worked example 3: a general point",
      problem:
        "A short magnet of moment 1.6 A m². Find the field at 20 cm from its centre on a line at $60^\\circ$ to its axis, and the angle the field makes with that line.",
      steps: [
        { text: "$\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{r^3} = 10^{-7}\\times\\dfrac{1.6}{0.008} = 2\\times10^{-5}$ T." },
        { text: "$B = 2\\times10^{-5}\\sqrt{1 + 3\\cos^260^\\circ} = 2\\times10^{-5}\\sqrt{1.75} \\approx 2.65\\times10^{-5}$ T." },
        { text: "$\\tan\\alpha = \\tfrac12\\tan60^\\circ \\approx 0.866$, so $\\alpha \\approx 40.9^\\circ$ from the line OP. *Why this step:* $\\alpha = \\tan^{-1}(B_\\theta/B_r)$, and the ratio of the two components is $\\tfrac12\\tan\\theta$." },
      ],
      answer: "$B \\approx 2.65\\times10^{-5}$ T at about $40.9^\\circ$ to OP",
    },
    {
      type: "worked-example",
      id: "em6-1-we4",
      title: "Worked example 4: a bent magnet",
      problem:
        "A thin straight magnet of moment 3.14 A m² is bent into a semicircle. Find its new moment.",
      steps: [
        { text: "The pole strength is unchanged; the poles move from $L$ apart (along the magnet) to a diameter apart. Arc length $L = \\pi R$, so the diameter is $2R = 2L/\\pi$." },
        { text: "$m' = q_m\\cdot\\dfrac{2L}{\\pi} = \\dfrac{2m}{\\pi} = \\dfrac{2\\times3.14}{3.14} = 2$ A m²." },
      ],
      answer: "$m' = 2m/\\pi = 2$ A m²",
    },
    {
      type: "worked-example",
      id: "em6-1-we5",
      title: "Worked example 5: the equivalent solenoid",
      problem:
        "A short solenoid of 500 turns, cross-section 2 cm², carries 2 A. Find its magnetic moment and the field 10 cm from it on its axis.",
      steps: [
        { text: "$m = NIA = 500\\times2\\times2\\times10^{-4} = 0.2$ A m²." },
        { text: "Treat it as a short magnet: $B = 10^{-7}\\times\\dfrac{2\\times0.2}{(0.1)^3} = 4\\times10^{-5}$ T, comparable to the Earth's field." },
      ],
      answer: "$m = 0.2$ A m², $B = 4\\times10^{-5}$ T",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"cutting a magnet in half halves its pole strength\"",
      content:
        "It depends on how you cut. Across the length, each half keeps the **same** pole strength (same cross-section) and the moment halves because the length halves. Along the length, the pole strength halves and the length stays. The moment halves either way, and each piece is a complete magnet with both poles.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "em6-1-q1",
      variant: "practice",
      question: "A bar magnet of magnetic length 8 cm has pole strength 10 A m. What is the field at a point on its axis 10 cm from its centre? Give your answer in microtesla (μT).",
      answer: 226.8,
      relTolerance: 0.02,
      unit: "μT",
      hint: "First find $m = q_m(2l)$. The distance is only 2.5 times $l$, so use the exact axial formula $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2mr}{(r^2 - l^2)^2}$.",
      solution: "$m = 10\\times0.08 = 0.8$ A m², $l = 0.04$ m, $r = 0.1$ m.\n\n$B = 10^{-7}\\times\\dfrac{2\\times0.8\\times0.1}{(0.01 - 0.0016)^2} = 10^{-7}\\times\\dfrac{0.16}{7.056\\times10^{-5}} \\approx 2.27\\times10^{-4}$ T $\\approx 227\\ \\mu$T.",
      commonMistakes: [
        { answer: 160, feedback: "That is the short-magnet formula $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{r^3}$. At $r = 2.5l$ it is about 30% low." },
        { answer: 64.0, feedback: "That is the exact **equatorial** field. P is on the axis." },
        { answer: 113.4, feedback: "You have lost the factor 2 in $2mr$." },
      ],
    },
    {
      type: "quiz",
      id: "em6-1-q2",
      variant: "concept",
      question: "At points round a short bar magnet, at what angle $\\theta$ from the magnet's axis is the field perpendicular to the axis?",
      options: [
        { text: "$\\theta = 90^\\circ$, on the equatorial line", feedback: "On the equator the field is **parallel** to the axis (antiparallel to $\\vec m$)." },
        { text: "$\\theta = 45^\\circ$", feedback: "At $45^\\circ$, $\\tan\\alpha = \\tfrac12$, so $\\theta + \\alpha \\approx 71.6^\\circ$, not $90^\\circ$." },
        { text: "$\\tan\\theta = \\sqrt2$, about $54.7^\\circ$", correct: true, feedback: "We need $\\theta + \\alpha = 90^\\circ$: $\\tan\\alpha = \\cot\\theta$, and $\\tan\\alpha = \\tfrac12\\tan\\theta$, so $\\tan^2\\theta = 2$." },
        { text: "Nowhere; the field always has a component along the axis.", feedback: "At $\\theta = 54.7^\\circ$ the axial components of $B_r$ and $B_\\theta$ cancel exactly." },
      ],
      hint: "The field makes angle $\\theta + \\alpha$ with the axis, where $\\tan\\alpha = \\tfrac12\\tan\\theta$. Set $\\theta + \\alpha = 90^\\circ$.",
    },
    {
      type: "quiz",
      id: "em6-1-q3",
      variant: "practice",
      multiple: true,
      question: "A bar magnet of moment $m$ is cut into two equal halves **perpendicular** to its length. Which statements are true? Select all that apply.",
      options: [
        { text: "Each half has the same pole strength as the original magnet.", correct: true, feedback: "The cross-section is unchanged, so the pole strength is unchanged." },
        { text: "Each half has magnetic moment $m/2$.", correct: true, feedback: "Same $q_m$, half the length: $m/2$." },
        { text: "One half is an N pole and the other an S pole.", feedback: "Each half is a complete magnet with its own N and S ends. Isolated poles never appear." },
        { text: "Had the magnet been cut along its length instead, each half would still have moment $m/2$.", correct: true, feedback: "Then the pole strength halves and the length stays, so again $m/2$." },
        { text: "Each half has pole strength $q_m/2$.", feedback: "That happens for a cut **along** the length, not across it." },
      ],
      hint: "Write $m = q_m(2l)$ and ask what the cut does to the cross-section (which sets $q_m$) and to the length.",
    },
    {
      type: "numeric",
      id: "em6-1-q4",
      variant: "practice",
      question: "A thin magnet of moment 4 A m² is bent at its midpoint so that the two halves are at right angles (an L shape). What is its new magnetic moment? Give your answer in A m².",
      answer: 2.828,
      relTolerance: 0.01,
      unit: "A m²",
      hint: "The pole strength does not change. Find the new straight-line distance between the poles.",
      solution: "Each arm has length $l$ (half of $2l$). The poles are now the ends of two perpendicular arms, $\\sqrt{l^2 + l^2} = \\sqrt2\\,l$ apart instead of $2l$.\n\n$m' = q_m\\sqrt2\\,l = \\dfrac{m}{\\sqrt2} = \\dfrac{4}{\\sqrt2} \\approx 2.83$ A m².",
      commonMistakes: [
        { answer: 2, feedback: "The moment is not simply halved: the poles are $\\sqrt2\\,l$ apart, not $l$." },
        { answer: 4, feedback: "Bending brings the poles closer together, so the moment falls." },
        { answer: 2.546, feedback: "That is $2m/\\pi$, the result for bending into a semicircle." },
      ],
    },
    {
      type: "quiz",
      id: "em6-1-q5",
      variant: "practice",
      question: "A short magnet produces field $B_0$ at a point on its axis at distance $r$. What is the field at the same distance $r$ on a line making $60^\\circ$ with the axis?",
      options: [
        { text: "$\\dfrac{B_0}{2}$", feedback: "That is the equatorial value ($\\theta = 90^\\circ$)." },
        { text: "$\\dfrac{\\sqrt7}{4}B_0$", correct: true, feedback: "$B_0 = \\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{r^3}$, and $B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{r^3}\\sqrt{1 + \\tfrac34} = \\dfrac{B_0}{2}\\cdot\\dfrac{\\sqrt7}{2}$." },
        { text: "$\\dfrac{\\sqrt3}{2}B_0$", feedback: "The field does not simply scale with a cosine; use $\\sqrt{1 + 3\\cos^2\\theta}$." },
        { text: "$\\dfrac{7}{4}B_0$", feedback: "Take the square root, and remember $B_0$ already contains a factor 2." },
      ],
      hint: "Write $B_0$ with the general formula at $\\theta = 0$, then take the ratio with $\\theta = 60^\\circ$.",
    },
    {
      type: "quiz",
      id: "em6-1-q6",
      variant: "concept",
      question: "Two identical short magnets, each of moment $m$, are placed with their centres together and their axes at right angles. The combination behaves like a single magnet of moment",
      options: [
        { text: "$2m$ along either axis", feedback: "Moments are vectors; perpendicular vectors do not add to $2m$." },
        { text: "zero, because the fields cancel", feedback: "They would cancel only if the moments were antiparallel." },
        { text: "$\\sqrt2\\,m$ along the bisector of the two N directions", correct: true, feedback: "Vector sum of two perpendicular moments of size $m$: $\\sqrt{m^2 + m^2} = \\sqrt2\\,m$, at $45^\\circ$ to each." },
        { text: "$m/\\sqrt2$ along the bisector", feedback: "Adding two moments cannot make the result smaller than either one when they are perpendicular." },
      ],
      hint: "Magnetic moments add as vectors.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "magnet-in-a-uniform-field",
  title: "6.2 · A Magnet in a Uniform Field",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Flick a compass needle and it does not just snap back to north: it swings past, back and forth, a few times before settling. Time those swings and you have measured the Earth's magnetic field. This lesson explains why the needle turns, how much energy it stores when turned, and why its swing is simple harmonic, then puts that to use in the vibration magnetometer.",
    },
    { type: "heading", text: "The couple on a magnet" },
    {
      type: "text",
      content:
        "Put a magnet (pole strength $q_m$, magnetic length $2l$) at angle $\\theta$ to a uniform field $\\vec B$. The N pole feels $q_mB$ along $\\vec B$ and the S pole $q_mB$ against it. The two forces are equal and opposite, so the **net force is zero**, but they act along different lines: a couple. Its arm is $2l\\sin\\theta$:",
    },
    {
      type: "math",
      latex: "\\tau = q_mB\\,(2l\\sin\\theta) = mB\\sin\\theta, \\qquad \\vec\\tau = \\vec m\\times\\vec B",
    },
    {
      type: "text",
      content:
        "This is the same result as for a current loop in lesson 4.6, now seen through the poles. The torque turns $\\vec m$ towards $\\vec B$. Work done by an external agent turning the magnet slowly from $\\theta_1$ to $\\theta_2$ is stored as potential energy:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Energy and work in a uniform field",
      content:
        "$U(\\theta) = -mB\\cos\\theta$ (zero chosen at $\\theta = 90^\\circ$).\n$W_{\\theta_1\\to\\theta_2} = mB(\\cos\\theta_1 - \\cos\\theta_2)$.\n$\\theta = 0$: $U = -mB$, minimum, **stable** equilibrium. $\\theta = 180^\\circ$: $U = +mB$, maximum, **unstable** equilibrium. Both have zero torque.",
    },
    {
      type: "text",
      content:
        "Turn the magnet in the lab below. The orange curve is the torque and the green curve the energy, both in units of $mB$. Find the two angles where the torque vanishes and decide which is stable by nudging away from each.",
    },
    {
      type: "interactive",
      config: {
        component: "em-magnet-lab",
        mode: "torque",
        angle: 60,
        moment: { min: 0.5, max: 5, step: 0.5, initial: 2 },
        fieldStrength: { min: 10, max: 100, step: 10, initial: 40 },
        readouts: ["torque", "energy", "work", "period"],
        caption:
          "The two pole forces cancel, so the magnet does not drift; it only turns. Near $\\theta = 0$ the torque is restoring, so the magnet oscillates there.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the torque is largest at $90^\\circ$, where $U$ passes through zero, and vanishes at $0^\\circ$ and $180^\\circ$. Near $0^\\circ$ a small turn creates a torque back towards $0^\\circ$ (energy at a minimum: stable). Near $180^\\circ$ a small turn creates a torque that pushes it further away (energy at a maximum: unstable).",
    },
    { type: "heading", text: "Oscillations of a magnet" },
    {
      type: "text",
      content:
        "Let the magnet (moment of inertia $I$ about its suspension) swing through a small angle $\\theta$ from $\\vec B$. The restoring torque is $mB\\sin\\theta \\approx mB\\theta$, so",
    },
    {
      type: "math",
      latex: "I\\frac{d^2\\theta}{dt^2} = -mB\\,\\theta \\;\\Longrightarrow\\; \\omega = \\sqrt{\\frac{mB}{I}}, \\qquad T = 2\\pi\\sqrt{\\frac{I}{mB}}",
    },
    {
      type: "text",
      content:
        "This is the angular version of the spring–mass system: $I$ plays the mass and $mB$ the spring constant. For a bar magnet of mass $M$, length $L$ and breadth $b$ swinging about a vertical axis through its centre, $I = \\dfrac{M(L^2 + b^2)}{12}$. A stronger field or a stronger magnet makes a stiffer \"spring\" and a shorter period.",
    },
    { type: "heading", text: "The vibration magnetometer" },
    {
      type: "text",
      content:
        "The period formula turns into two measuring instruments.\n\n**Comparing fields.** The same magnet ($I$ and $m$ fixed) oscillates with period $T_1$ in field $B_1$ and $T_2$ in $B_2$. Since $T^2 \\propto 1/B$:\n$$\\frac{B_1}{B_2} = \\frac{T_2^2}{T_1^2}.$$\n**Comparing moments (sum and difference method).** Tie two magnets together, like poles together, so the moments add: period $T_s$. Then reverse one, so they subtract: period $T_d$. The moment of inertia is the same both times, so $(m_1 + m_2)T_s^2 = (m_1 - m_2)T_d^2$, which rearranges to",
    },
    { type: "math", latex: "\\frac{m_1}{m_2} = \\frac{T_d^2 + T_s^2}{T_d^2 - T_s^2}" },
    {
      type: "text",
      content:
        "**Cutting changes the period.** Cut a magnet into $n$ equal pieces **across** its length: each piece has moment $m/n$, mass $M/n$ and length $L/n$, so $I' = \\dfrac{(M/n)(L/n)^2}{12} = \\dfrac{I}{n^3}$ and $T' = 2\\pi\\sqrt{\\dfrac{I/n^3}{mB/n}} = \\dfrac{T}{n}$. Cut **along** its length into $n$ strips: $m/n$ and $I/n$ (ignoring the breadth), so $T' = T$.",
    },
    { type: "heading", text: "Worked examples: torque, work and periods" },
    {
      type: "worked-example",
      id: "em6-2-we1",
      title: "Worked example 1: torque and work",
      problem:
        "A magnet of moment 2.5 A m² is at $30^\\circ$ to a uniform 0.2 T field. Find the torque, and the work needed to turn it slowly from $30^\\circ$ to $90^\\circ$.",
      steps: [
        { text: "$\\tau = mB\\sin\\theta = 2.5\\times0.2\\times\\tfrac12 = 0.25$ N m." },
        { text: "$W = mB(\\cos30^\\circ - \\cos90^\\circ) = 0.5\\times0.866 \\approx 0.43$ J. *Why this step:* the work done by the external agent equals the rise in $U = -mB\\cos\\theta$." },
      ],
      answer: "$\\tau = 0.25$ N m, $W \\approx 0.43$ J",
    },
    {
      type: "worked-example",
      id: "em6-2-we2",
      title: "Worked example 2: work to an unstable position",
      problem:
        "A magnet of moment 1.5 A m² sits at $60^\\circ$ to a 0.4 T field. How much work turns it to $180^\\circ$?",
      steps: [
        { text: "$mB = 0.6$ J." },
        { text: "$W = mB(\\cos60^\\circ - \\cos180^\\circ) = 0.6\\times(0.5 + 1) = 0.9$ J." },
      ],
      answer: "$W = 0.9$ J",
    },
    {
      type: "worked-example",
      id: "em6-2-we3",
      title: "Worked example 3: period in the Earth's field",
      problem:
        "A magnet of moment 0.4 A m² and moment of inertia $4\\times10^{-6}$ kg m² swings horizontally where $B_H = 40\\ \\mu$T. Find its period.",
      steps: [
        { text: "$mB = 0.4\\times4\\times10^{-5} = 1.6\\times10^{-5}$ N m per radian. *Why this step:* only the horizontal component turns a magnet swinging in a horizontal plane." },
        { text: "$T = 2\\pi\\sqrt{\\dfrac{4\\times10^{-6}}{1.6\\times10^{-5}}} = 2\\pi\\times0.5 = \\pi \\approx 3.14$ s." },
      ],
      answer: "$T = \\pi$ s $\\approx 3.14$ s",
    },
    {
      type: "worked-example",
      id: "em6-2-we4",
      title: "Worked example 4: comparing two fields",
      problem:
        "A magnet oscillates with period 2 s at place A and 3 s at place B. Compare the horizontal fields.",
      steps: [
        { text: "$\\dfrac{B_A}{B_B} = \\dfrac{T_B^2}{T_A^2} = \\dfrac{9}{4} = 2.25$. *Why this step:* $T \\propto 1/\\sqrt B$, so the faster swing means the stronger field." },
      ],
      answer: "$B_A/B_B = 2.25$",
    },
    {
      type: "worked-example",
      id: "em6-2-we5",
      title: "Worked example 5: sum and difference",
      problem:
        "Two magnets tied together oscillate with period 3 s with like poles together and 5 s with unlike poles together. Find the ratio of their moments.",
      steps: [
        { text: "Sum position: $T_s = 3$ s. Difference position: $T_d = 5$ s (the net moment is smaller, so the period is longer)." },
        { text: "$\\dfrac{m_1}{m_2} = \\dfrac{25 + 9}{25 - 9} = \\dfrac{34}{16} = 2.125$." },
      ],
      answer: "$m_1/m_2 = 2.125$",
    },
    {
      type: "worked-example",
      id: "em6-2-we6",
      title: "Worked example 6: cutting a magnet",
      problem:
        "A magnet has period 4 s. It is cut into two equal halves (a) across its length, (b) along its length. Find the period of one half in the same field.",
      steps: [
        { text: "(a) Across: $m \\to m/2$, $I \\to I/8$, so $T \\to T\\sqrt{\\dfrac{1/8}{1/2}} = T/2 = 2$ s." },
        { text: "(b) Along: $m \\to m/2$, $I \\to I/2$, so $T$ is unchanged: 4 s. *Why this step:* the length, which enters $I$ squared, is unchanged by a lengthwise cut." },
      ],
      answer: "(a) 2 s, (b) 4 s",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"zero torque means a stable position\"",
      content:
        "A magnet pointing exactly against the field ($\\theta = 180^\\circ$) feels no torque, yet the smallest disturbance makes it flip. Equilibrium only needs zero torque; stability needs the torque after a small turn to point back. Check the energy: stable equilibria sit at minima of $U = -mB\\cos\\theta$, unstable ones at maxima.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "em6-2-q1",
      variant: "practice",
      question: "A magnet of moment 4 A m² lies at $30^\\circ$ to a uniform 0.25 T field. How much work is needed to turn it slowly until it is perpendicular to the field? Give your answer in joules.",
      answer: 0.866,
      relTolerance: 0.01,
      unit: "J",
      hint: "$W = mB(\\cos\\theta_1 - \\cos\\theta_2)$ with $\\theta_1 = 30^\\circ$ and $\\theta_2 = 90^\\circ$.",
      solution: "$mB = 4\\times0.25 = 1$ J.\n\n$W = mB(\\cos30^\\circ - \\cos90^\\circ) = 1\\times(0.866 - 0) \\approx 0.866$ J.",
      commonMistakes: [
        { answer: 0.5, feedback: "That uses $\\sin30^\\circ$. Work comes from the change in $-mB\\cos\\theta$." },
        { answer: 0.134, feedback: "That is the work from $0^\\circ$ to $30^\\circ$, $mB(1 - \\cos30^\\circ)$." },
        { answer: 1, feedback: "That is the work from $0^\\circ$ to $90^\\circ$. The magnet starts at $30^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "em6-2-q2",
      variant: "practice",
      question: "A magnet oscillates in a field $B$ with period $T$. The field is made four times stronger. The new period is",
      options: [
        { text: "$4T$", feedback: "A stronger field is a stiffer \"spring\": the period falls." },
        { text: "$T/4$", feedback: "$T \\propto 1/\\sqrt B$, not $1/B$." },
        { text: "$T/2$", correct: true, feedback: "$T = 2\\pi\\sqrt{I/mB}$: four times $B$ gives half the period." },
        { text: "$T$, since the period depends only on the magnet", feedback: "$B$ appears in the formula; the field provides the restoring torque." },
      ],
      hint: "How does $T = 2\\pi\\sqrt{I/mB}$ depend on $B$?",
    },
    {
      type: "numeric",
      id: "em6-2-q3",
      variant: "practice",
      question: "A compass needle makes 20 oscillations per minute where $B_H = 30\\ \\mu$T. At another place it makes 15 oscillations per minute. What is $B_H$ there? Give your answer in μT.",
      answer: 16.875,
      relTolerance: 0.01,
      unit: "μT",
      hint: "Frequency $\\propto \\sqrt B$, so $B \\propto (\\text{oscillations per minute})^2$.",
      solution: "$\\dfrac{B_2}{B_1} = \\left(\\dfrac{f_2}{f_1}\\right)^2 = \\left(\\dfrac{15}{20}\\right)^2 = \\dfrac{9}{16}$.\n\n$B_2 = 30\\times\\dfrac{9}{16} \\approx 16.9\\ \\mu$T.",
      commonMistakes: [
        { answer: 22.5, feedback: "That makes $B$ proportional to the frequency. It goes as the frequency **squared**." },
        { answer: 53.3, feedback: "Fewer oscillations per minute means a weaker field, not a stronger one." },
        { answer: 40, feedback: "That inverts the frequency ratio and leaves it unsquared." },
      ],
    },
    {
      type: "quiz",
      id: "em6-2-q4",
      variant: "practice",
      multiple: true,
      question: "A bar magnet with moment $m$, moment of inertia $I$ and period $T$ in a field is cut into three equal pieces **across** its length. For one piece in the same field, which statements are true? Select all that apply.",
      options: [
        { text: "Its pole strength equals the original pole strength.", correct: true, feedback: "The cross-section is unchanged." },
        { text: "Its magnetic moment is $m/3$.", correct: true, feedback: "Same pole strength, one third of the length." },
        { text: "Its moment of inertia is $I/27$.", correct: true, feedback: "Mass $M/3$ and length $L/3$: $I \\propto ML^2$ gives $1/27$." },
        { text: "Its period is $T/3$.", correct: true, feedback: "$T \\propto \\sqrt{I/m} = \\sqrt{(1/27)/(1/3)} = 1/3$." },
        { text: "Its period is $\\sqrt3\\,T$.", feedback: "The moment of inertia falls much faster (as $n^3$) than the moment ($n$), so the period falls." },
      ],
      hint: "Track $q_m$, $m$, $M$ and $L$ for one piece, then use $I = ML^2/12$ and $T = 2\\pi\\sqrt{I/mB}$.",
    },
    {
      type: "numeric",
      id: "em6-2-q5",
      variant: "practice",
      question: "In the sum and difference method, two magnets tied together oscillate with period 4 s in the sum position and 6 s in the difference position. What is the ratio $m_1/m_2$ of their moments?",
      answer: 2.6,
      relTolerance: 0.01,
      hint: "$(m_1 + m_2)T_s^2 = (m_1 - m_2)T_d^2$, so $\\dfrac{m_1}{m_2} = \\dfrac{T_d^2 + T_s^2}{T_d^2 - T_s^2}$.",
      solution: "$\\dfrac{m_1}{m_2} = \\dfrac{36 + 16}{36 - 16} = \\dfrac{52}{20} = 2.6$.",
      commonMistakes: [
        { answer: 1.5, feedback: "That is just $T_d/T_s$. Periods enter squared, and the moments are $m_1 + m_2$ and $m_1 - m_2$." },
        { answer: 2.25, feedback: "That is $(T_d/T_s)^2 = (m_1 + m_2)/(m_1 - m_2)$. Solve that for $m_1/m_2$." },
        { answer: 0.385, feedback: "That is $m_2/m_1$. The stronger magnet sets the sign in the difference position." },
      ],
    },
    {
      type: "quiz",
      id: "em6-2-q6",
      variant: "practice",
      question: "A compass needle oscillates with period 2 s in the Earth's horizontal field of $40\\ \\mu$T. A bar magnet placed nearby adds a uniform $50\\ \\mu$T in the **same** direction as $B_H$. The new period is",
      options: [
        { text: "about 1.33 s", correct: true, feedback: "$B = 90\\ \\mu$T, and $T' = 2\\sqrt{40/90} = 2\\times\\tfrac23 \\approx 1.33$ s." },
        { text: "about 1.79 s", feedback: "That uses only the magnet's $50\\ \\mu$T. The needle feels the total field, $90\\ \\mu$T." },
        { text: "0.89 s", feedback: "That uses $T \\propto 1/B$. The period goes as $1/\\sqrt B$." },
        { text: "3 s", feedback: "A stronger field shortens the period." },
      ],
      hint: "The needle responds to the total horizontal field, and $T \\propto 1/\\sqrt B$.",
    },
    {
      type: "quiz",
      id: "em6-2-q7",
      variant: "concept",
      multiple: true,
      question: "A magnet of moment $m$ is free to turn in a uniform field $B$. Which statements are true? Select all that apply.",
      options: [
        { text: "The net force on it is zero.", correct: true, feedback: "The pole forces are equal and opposite in a **uniform** field." },
        { text: "At $\\theta = 180^\\circ$ it is in unstable equilibrium with energy $+mB$.", correct: true, feedback: "Zero torque, maximum energy." },
        { text: "Turning it from $0^\\circ$ to $180^\\circ$ needs work $2mB$.", correct: true, feedback: "$mB(\\cos0^\\circ - \\cos180^\\circ) = 2mB$." },
        { text: "The torque is largest at $\\theta = 0^\\circ$, where it is most firmly held.", feedback: "The torque is **zero** at $0^\\circ$ and largest at $90^\\circ$." },
        { text: "Its potential energy is zero at $\\theta = 0^\\circ$.", feedback: "With the usual choice, $U = -mB\\cos\\theta$ is zero at $90^\\circ$ and $-mB$ at $0^\\circ$." },
      ],
      hint: "Use $\\tau = mB\\sin\\theta$ and $U = -mB\\cos\\theta$, and remember that the field is uniform.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "earths-magnetism",
  title: "6.3 · Earth's Magnetism",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "The Earth's field is weak (about $0.3$ to $0.6$ G, that is $30$ to $60\\ \\mu$T), but it is everywhere, and it tilts: hang a magnetised needle from its centre of gravity and in India it points north and dips its N end below the horizontal. Lesson 4.7 named the three numbers that describe the field at a place. Here we use them: what a dip needle shows when it is set up in the wrong plane, where a magnet's field and the Earth's cancel, and how comparing a known field with the Earth's turns a compass into an ammeter.",
    },
    { type: "heading", text: "The elements of the Earth's field" },
    {
      type: "text",
      content:
        "To a first approximation the Earth's field is that of a huge bar magnet (a dipole) near its centre, with its axis tilted about $11^\\circ$ from the rotation axis. Its S pole lies under the Arctic, which is why the N end of a compass points north. The vertical plane containing the field at a place is the **magnetic meridian**.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Declination, dip and horizontal component",
      content:
        "**Declination** $D$: the angle between the geographic and magnetic meridians.\n**Dip** (inclination) $\\delta$: the angle the total field $B$ makes with the horizontal, in the magnetic meridian.\n$B_H = B\\cos\\delta$, $B_V = B\\sin\\delta$, $\\tan\\delta = \\dfrac{B_V}{B_H}$, $B = \\sqrt{B_H^2 + B_V^2}$.\nAt the magnetic equator $\\delta = 0$ and $B_V = 0$. At the magnetic poles $\\delta = 90^\\circ$ and $B_H = 0$, so a horizontal compass has nothing to align with.",
    },
    { type: "heading", text: "Apparent dip" },
    {
      type: "text",
      content:
        "A dip needle swings in a vertical plane. If that plane is the magnetic meridian it reads the true dip. Turn the plane through an angle $\\beta$ from the meridian and the needle can only respond to the field components **in its plane**: all of $B_V$, but only $B_H\\cos\\beta$ of the horizontal part. It settles at the **apparent dip** $\\delta'$:",
    },
    {
      type: "math",
      latex: "\\tan\\delta' = \\frac{B_V}{B_H\\cos\\beta} = \\frac{\\tan\\delta}{\\cos\\beta} \\ge \\tan\\delta",
    },
    {
      type: "text",
      content:
        "So the apparent dip is never less than the true dip, and in the plane perpendicular to the meridian ($\\beta = 90^\\circ$) the needle stands vertical. In two planes at right angles to each other (angles $\\beta$ and $90^\\circ - \\beta$ to the meridian), $\\cot\\delta_1 = \\cot\\delta\\cos\\beta$ and $\\cot\\delta_2 = \\cot\\delta\\sin\\beta$. Squaring and adding removes $\\beta$:",
    },
    { type: "math", latex: "\\cot^2\\delta_1 + \\cot^2\\delta_2 = \\cot^2\\delta" },
    {
      type: "text",
      content:
        "That is how the true dip is found when the meridian is not known.",
    },
    { type: "heading", text: "Neutral points of a magnet in the Earth's field" },
    {
      type: "text",
      content:
        "Near a bar magnet lying horizontally in the magnetic meridian, the horizontal field is the magnet's field plus $B_H$. At a **neutral point** they cancel, and a compass placed there does not settle in any particular direction. Below, the Earth's $B_H$ points up the page (north). First keep the magnet's N pole pointing north, then look at the second configuration: N pole pointing south.",
    },
    {
      type: "interactive",
      config: {
        component: "em-magnet-lab",
        mode: "field",
        halfLength: 4,
        moment: { min: 0.5, max: 5, step: 0.5, initial: 2 },
        distance: { min: 6, max: 28, step: 1, initial: 18 },
        angle: 90,
        earthField: 40,
        magnetPointing: "north",
        readouts: ["probe", "neutral"],
        caption:
          "With the N pole pointing north, the magnet's field opposes $B_H$ only on its **equatorial** line, so the two neutral points lie east and west of it. Move P onto one and watch $B_{\\text{net}}$ fall to zero.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "em-magnet-lab",
        mode: "field",
        halfLength: 4,
        moment: { min: 0.5, max: 5, step: 0.5, initial: 2 },
        distance: { min: 6, max: 28, step: 1, initial: 22 },
        angle: 0,
        earthField: 40,
        magnetPointing: "south",
        readouts: ["probe", "neutral"],
        caption:
          "With the N pole pointing south, the magnet's **axial** field points south, against $B_H$, so the neutral points move onto the axis, north and south of the magnet.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: in the first picture the lines from the magnet are swept northwards and two empty spots appear on the east–west line; in the second the empty spots sit on the magnet's axis. Since the axial field is twice the equatorial field at the same distance, the axial neutral points are further out: for a short magnet $d_{\\text{axial}}^3 = 2d_{\\text{eq}}^3$.",
    },
    { type: "heading", text: "The tangent law" },
    {
      type: "text",
      content:
        "A compass needle sits in two perpendicular horizontal fields: the Earth's $B_H$ (north) and a field $B$ (east–west). It settles along their resultant, at angle $\\theta$ from the meridian with",
    },
    { type: "math", latex: "\\tan\\theta = \\frac{B}{B_H} \\qquad (\\text{tangent law})" },
    {
      type: "text",
      content:
        "So a measured deflection gives $B$ in units of $B_H$. **Deflection magnetometer:** place a short magnet with its axis east–west at distance $d$ from the needle. In the **end-on** (tan A) position the needle is on the magnet's axis and $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{d^3} = B_H\\tan\\theta$. In the **broadside-on** (tan B) position it is on the equatorial line and $\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{d^3} = B_H\\tan\\theta$. Either gives $m/B_H$; the vibration magnetometer of 6.2 gives $mB_H$; together they give both $m$ and $B_H$.",
    },
    { type: "heading", text: "The tangent galvanometer" },
    {
      type: "text",
      content:
        "A vertical circular coil of $N$ turns and radius $R$ is set in the magnetic meridian with a small compass at its centre. A current $I$ makes a field $\\dfrac{\\mu_0NI}{2R}$ at the centre, perpendicular to the coil, so east–west: exactly the set-up of the tangent law.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Tangent galvanometer",
      content:
        "$\\dfrac{\\mu_0NI}{2R} = B_H\\tan\\theta \\;\\Longrightarrow\\; I = K\\tan\\theta$, with **reduction factor** $K = \\dfrac{2RB_H}{\\mu_0N}$ (in amperes).\n$K$ depends on $B_H$, so it changes from place to place.\nA reading error $d\\theta$ gives $\\dfrac{dI}{I} = \\dfrac{2\\,d\\theta}{\\sin2\\theta}$, smallest at $\\theta = 45^\\circ$: the instrument is most accurate for deflections near $45^\\circ$ and useless near $90^\\circ$.",
    },
    { type: "heading", text: "Worked examples: dip, neutral points and the tangent law" },
    {
      type: "worked-example",
      id: "em6-3-we1",
      title: "Worked example 1: apparent dip",
      problem:
        "The true dip at a place is $45^\\circ$. What does a dip needle read in a vertical plane at $60^\\circ$ to the magnetic meridian?",
      steps: [
        { text: "$\\tan\\delta' = \\dfrac{\\tan45^\\circ}{\\cos60^\\circ} = \\dfrac{1}{0.5} = 2$. *Why this step:* only $B_H\\cos60^\\circ$ lies in the needle's plane, while all of $B_V$ does." },
        { text: "$\\delta' = \\tan^{-1}2 \\approx 63.4^\\circ$, larger than the true dip as it must be." },
      ],
      answer: "$\\delta' \\approx 63.4^\\circ$",
    },
    {
      type: "worked-example",
      id: "em6-3-we2",
      title: "Worked example 2: true dip from two planes",
      problem:
        "In two vertical planes at right angles, the apparent dips are $30^\\circ$ and $45^\\circ$. Find the true dip.",
      steps: [
        { text: "$\\cot^2\\delta = \\cot^230^\\circ + \\cot^245^\\circ = 3 + 1 = 4$." },
        { text: "$\\cot\\delta = 2$, so $\\delta = \\tan^{-1}0.5 \\approx 26.6^\\circ$, smaller than both apparent dips. ✓" },
      ],
      answer: "$\\delta = \\cot^{-1}2 \\approx 26.6^\\circ$",
    },
    {
      type: "worked-example",
      id: "em6-3-we3",
      title: "Worked example 3: axial neutral points",
      problem:
        "A short magnet lies in the magnetic meridian with its N pole pointing south. The neutral points are 20 cm from its centre, and $B_H = 3.6\\times10^{-5}$ T. Find its moment.",
      steps: [
        { text: "N pole south: the neutral points are on the **axis**, where $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{d^3} = B_H$." },
        { text: "$m = \\dfrac{B_Hd^3}{2\\times10^{-7}} = \\dfrac{3.6\\times10^{-5}\\times8\\times10^{-3}}{2\\times10^{-7}} = 1.44$ A m²." },
      ],
      answer: "$m = 1.44$ A m²",
    },
    {
      type: "worked-example",
      id: "em6-3-we4",
      title: "Worked example 4: a tangent galvanometer",
      problem:
        "A tangent galvanometer has 50 turns of radius 10 cm, where $B_H = \\pi\\times10^{-5}$ T $\\approx 3.14\\times10^{-5}$ T. Find its reduction factor and the current that deflects it by $60^\\circ$.",
      steps: [
        { text: "$K = \\dfrac{2RB_H}{\\mu_0N} = \\dfrac{2\\times0.1\\times\\pi\\times10^{-5}}{4\\pi\\times10^{-7}\\times50} = \\dfrac{2\\times10^{-6}}{2\\times10^{-5}} = 0.1$ A." },
        { text: "$I = K\\tan60^\\circ = 0.1\\times1.732 \\approx 0.17$ A. *Why this step:* the deflection is set by the ratio of the coil's field to $B_H$, which is $\\tan\\theta$, not $\\theta$." },
      ],
      answer: "$K = 0.1$ A, $I \\approx 0.17$ A",
    },
    {
      type: "worked-example",
      id: "em6-3-we5",
      title: "Worked example 5: deflection magnetometer",
      problem:
        "A short magnet in the end-on position, 20 cm from a compass, deflects it by $45^\\circ$. If $B_H = 4\\times10^{-5}$ T, find the magnet's moment.",
      steps: [
        { text: "End-on: $10^{-7}\\times\\dfrac{2m}{(0.2)^3} = B_H\\tan45^\\circ = 4\\times10^{-5}$ T." },
        { text: "$m = \\dfrac{4\\times10^{-5}\\times8\\times10^{-3}}{2\\times10^{-7}} = 1.6$ A m²." },
      ],
      answer: "$m = 1.6$ A m²",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a dip needle always shows the dip\"",
      content:
        "Only when it swings in the magnetic meridian. In any other vertical plane it reads a **larger** apparent dip, reaching $90^\\circ$ in the plane perpendicular to the meridian, even at a place where the true dip is small. Before reading a dip circle, rotate it until the needle reads its **smallest** angle (or stands vertical, then turn it through $90^\\circ$).",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "em6-3-q1",
      variant: "practice",
      question: "At a place the horizontal component of the Earth's field is $30\\ \\mu$T and the dip is $60^\\circ$. What is the total field? Give your answer in μT.",
      answer: 60,
      relTolerance: 0.01,
      unit: "μT",
      hint: "$B_H = B\\cos\\delta$.",
      solution: "$B = \\dfrac{B_H}{\\cos\\delta} = \\dfrac{30}{0.5} = 60\\ \\mu$T.",
      commonMistakes: [
        { answer: 15, feedback: "That is $B_H\\cos\\delta$. The total field is **larger** than its horizontal component." },
        { answer: 34.64, feedback: "That divides by $\\sin60^\\circ$. The dip is measured from the horizontal, so $B_H = B\\cos\\delta$." },
        { answer: 51.96, feedback: "That is the vertical component $B_H\\tan\\delta$." },
      ],
    },
    {
      type: "numeric",
      id: "em6-3-q2",
      variant: "practice",
      question: "The true dip at a place is $30^\\circ$. What does a dip needle read in a vertical plane at $45^\\circ$ to the magnetic meridian? Give your answer in degrees.",
      answer: 39.23,
      relTolerance: 0.01,
      unit: "°",
      hint: "$\\tan\\delta' = \\dfrac{\\tan\\delta}{\\cos\\beta}$.",
      solution: "$\\tan\\delta' = \\dfrac{\\tan30^\\circ}{\\cos45^\\circ} = \\dfrac{0.577}{0.707} \\approx 0.816$, so $\\delta' \\approx 39.2^\\circ$.",
      commonMistakes: [
        { answer: 22.2, feedback: "That multiplies by $\\cos\\beta$. Only the horizontal part is reduced, so $\\tan\\delta$ **increases**." },
        { answer: 30, feedback: "Out of the meridian the needle sees less horizontal field and dips more steeply." },
        { answer: 90, feedback: "The needle stands vertical only at $\\beta = 90^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "em6-3-q3",
      variant: "practice",
      question: "A dip needle reads $45^\\circ$ in one vertical plane and $60^\\circ$ in the vertical plane at right angles to it. The true dip is",
      options: [
        { text: "$52.5^\\circ$", feedback: "Dips do not average. Use $\\cot^2\\delta = \\cot^2\\delta_1 + \\cot^2\\delta_2$." },
        { text: "$\\tan^{-1}\\dfrac{\\sqrt3}{2} \\approx 40.9^\\circ$", correct: true, feedback: "$\\cot^2\\delta = 1 + \\tfrac13 = \\tfrac43$, so $\\tan\\delta = \\dfrac{\\sqrt3}{2}$." },
        { text: "$\\tan^{-1}\\dfrac{2}{\\sqrt3} \\approx 49.1^\\circ$", feedback: "That inverts the result: $\\cot\\delta = 2/\\sqrt3$, so $\\tan\\delta = \\sqrt3/2$." },
        { text: "$75^\\circ$", feedback: "The true dip is never larger than an apparent dip." },
      ],
      hint: "For two perpendicular planes, $\\cot^2\\delta_1 + \\cot^2\\delta_2 = \\cot^2\\delta$.",
    },
    {
      type: "numeric",
      id: "em6-3-q4",
      variant: "practice",
      question: "A tangent galvanometer has 100 turns of radius 15 cm, at a place where $B_H = 4\\times10^{-5}$ T. What current gives a deflection of $30^\\circ$? Take $\\mu_0 = 4\\pi\\times10^{-7}$ T m/A and give your answer in milliamperes (mA).",
      answer: 55.13,
      relTolerance: 0.02,
      unit: "mA",
      hint: "Find $K = \\dfrac{2RB_H}{\\mu_0N}$ first, then $I = K\\tan\\theta$.",
      solution: "$K = \\dfrac{2\\times0.15\\times4\\times10^{-5}}{4\\pi\\times10^{-7}\\times100} = \\dfrac{1.2\\times10^{-5}}{1.257\\times10^{-4}} \\approx 0.0955$ A.\n\n$I = K\\tan30^\\circ = 0.0955\\times0.577 \\approx 0.0551$ A $\\approx 55$ mA.",
      commonMistakes: [
        { answer: 47.75, feedback: "That uses $\\sin30^\\circ$. The tangent law needs $\\tan30^\\circ$." },
        { answer: 95.5, feedback: "That is $K$ itself, the current for a $45^\\circ$ deflection." },
        { answer: 165.4, feedback: "That uses $\\tan60^\\circ$. The deflection is $30^\\circ$ from the meridian." },
      ],
    },
    {
      type: "quiz",
      id: "em6-3-q5",
      variant: "concept",
      multiple: true,
      question: "Which statements about a tangent galvanometer are true? Select all that apply.",
      options: [
        { text: "Its coil must be set in the magnetic meridian.", correct: true, feedback: "Then the coil's field at the centre is east–west, perpendicular to $B_H$, as the tangent law needs." },
        { text: "It is most accurate for deflections near $45^\\circ$.", correct: true, feedback: "The fractional error $2\\,d\\theta/\\sin2\\theta$ is smallest there." },
        { text: "Its reduction factor is different at different places.", correct: true, feedback: "$K = 2RB_H/\\mu_0N$ contains $B_H$." },
        { text: "Doubling the number of turns doubles the reduction factor.", feedback: "$K \\propto 1/N$: more turns make it more sensitive, halving $K$." },
        { text: "It measures large currents best when the deflection is close to $90^\\circ$.", feedback: "Near $90^\\circ$, $\\tan\\theta$ changes enormously for a tiny change in angle, so readings are useless there." },
      ],
      hint: "Start from $\\dfrac{\\mu_0NI}{2R} = B_H\\tan\\theta$ and think about which way the coil's field must point.",
    },
    {
      type: "quiz",
      id: "em6-3-q6",
      variant: "concept",
      question: "A short bar magnet lies horizontally in the magnetic meridian with its N pole pointing geographic **south**. The neutral points lie",
      options: [
        { text: "on its equatorial line, east and west of it", feedback: "That is the N-pole-north arrangement, where the equatorial field opposes $B_H$." },
        { text: "on its axis, north and south of it", correct: true, feedback: "The axial field points along $\\vec m$, which is now southwards, against the northward $B_H$." },
        { text: "at its poles", feedback: "The magnet's field is far larger than $B_H$ near the poles." },
        { text: "nowhere, because the fields add everywhere", feedback: "On the axis the magnet's field points south and cancels $B_H$ at one distance." },
      ],
      hint: "Find where the magnet's field points south. On the axis it is along $\\vec m$; on the equator it is opposite to $\\vec m$.",
    },
    {
      type: "quiz",
      id: "em6-3-q7",
      variant: "concept",
      question: "At the Earth's magnetic poles,",
      options: [
        { text: "the dip is $0^\\circ$ and a compass works best", feedback: "That describes the magnetic equator." },
        { text: "the dip is $90^\\circ$ and a horizontal compass needle does not settle in any particular direction", correct: true, feedback: "The field is vertical, so $B_H = B\\cos90^\\circ = 0$ and there is nothing horizontal to align with." },
        { text: "the Earth's field is zero", feedback: "The field is vertical there, and in fact strongest near the poles." },
        { text: "the declination is $90^\\circ$", feedback: "Declination compares the magnetic and geographic meridians; it is not what makes a compass fail." },
      ],
      hint: "What are $\\delta$ and $B_H = B\\cos\\delta$ where the field is vertical?",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "magnetisation-and-magnetic-materials",
  title: "6.4 · Magnetisation and Magnetic Materials",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Slide an iron rod into a solenoid and the field inside jumps a thousandfold. Slide in a copper rod and almost nothing happens. Hang a bismuth rod between the poles of a strong electromagnet and it turns to lie **across** the field. Same field, three completely different responses. To compare them we need two new quantities: one for what the coil's current does (H) and one for what the material does in reply (M).",
    },
    { type: "heading", text: "Magnetisation M and magnetic intensity H" },
    {
      type: "text",
      content:
        "**Magnetisation** $\\vec M$ is the net magnetic moment per unit volume of the material, $M = \\dfrac{m_{\\text{net}}}{V}$, in A/m. **Magnetic intensity** $\\vec H$ measures the field the free currents (the coil) would make on their own: in a long solenoid $H = nI$, whatever is inside. The field actually present, $\\vec B$, has both sources:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "B, H and M",
      content:
        "$\\vec B = \\mu_0(\\vec H + \\vec M)$, with $H$ and $M$ both in A/m.\nFor most materials $M$ is proportional to $H$: $\\vec M = \\chi\\vec H$, where $\\chi$ is the dimensionless **magnetic susceptibility**.\nThen $B = \\mu_0(1 + \\chi)H = \\mu_0\\mu_rH = \\mu H$, with **relative permeability** $\\mu_r = 1 + \\chi$ and permeability $\\mu = \\mu_0\\mu_r$.\nInside a long solenoid filled with the material, $B = \\mu_0\\mu_r nI$.",
    },
    {
      type: "text",
      content:
        "Think of $H$ as the cause you control (current per metre of solenoid) and $M$ as the material's reply. A vacuum does not reply: $M = 0$ and $B = \\mu_0H$. Iron replies enormously: $M$ can be a thousand times $H$.",
    },
    { type: "heading", text: "Three kinds of response" },
    {
      type: "table",
      headers: ["Property", "Diamagnetic", "Paramagnetic", "Ferromagnetic"],
      rows: [
        ["Atomic moment with no field", "zero", "permanent, randomly oriented", "permanent, aligned within domains"],
        ["$\\chi$", "small, negative ($-10^{-5}$)", "small, positive ($10^{-5}$ to $10^{-3}$)", "large, positive ($10^2$ to $10^5$)"],
        ["$\\mu_r$", "slightly less than 1", "slightly more than 1", "much greater than 1"],
        ["In a non-uniform field", "moves from strong to weak field", "moves from weak to strong field", "strongly pulled into strong field"],
        ["Rod between pole pieces", "lies across the field", "lies along the field", "lies along the field"],
        ["Field lines inside", "slightly pushed out", "slightly drawn in", "strongly concentrated"],
        ["Temperature dependence", "none", "Curie's law, $\\chi \\propto 1/T$", "paramagnetic above the Curie temperature"],
        ["Examples", "Bi, Cu, Ag, water, N₂, superconductors", "Al, Na, Pt, O₂, CuCl₂", "Fe, Co, Ni, Gd, alnico"],
      ],
    },
    {
      type: "text",
      content:
        "**Diamagnetism** is Lenz's law at the atomic scale. Switching on a field changes the orbital motion of the electrons so as to oppose the change: the induced moments point **against** $\\vec B$. Every material has this effect; it shows up only when nothing stronger hides it. A superconductor expels the field completely ($\\chi = -1$, the Meissner effect), which is why a magnet can float above one.\n\n**Paramagnetism** needs atoms with a permanent moment (unpaired electrons). The field tries to align them; thermal jostling scrambles them. The balance gives **Curie's law**: $M = C\\dfrac{B_0}{T}$, so $\\chi = \\dfrac{C'}{T}$, where $B_0 = \\mu_0 H$ is the applied field.",
    },
    {
      type: "text",
      content:
        "**Ferromagnetism** is cooperative. A quantum effect (the exchange interaction) makes neighbouring atomic moments line up spontaneously, across regions called **domains**, typically a fraction of a millimetre across, each holding an enormous number of atoms. An unmagnetised bar has domains pointing every which way. In a weak field, domains already aligned with $\\vec B$ grow at their neighbours' expense (the walls move); in a stronger field whole domains rotate into line, until the bar saturates. Heat it above its **Curie temperature** $T_C$ (1043 K for iron, 631 K for nickel) and the order is destroyed: it becomes paramagnetic, with $\\chi = \\dfrac{C}{T - T_C}$ (the Curie–Weiss law).",
    },
    { type: "heading", text: "Hysteresis, in depth" },
    {
      type: "text",
      content:
        "Domain walls do not slide back freely: they snag on impurities and grain boundaries. So a ferromagnet's $B$ depends on its history, not just on the present $H$. Take it round a full cycle of $H$ in the lab below. Then press the two presets and compare a soft iron loop with a steel loop.",
    },
    {
      type: "interactive",
      config: {
        component: "em-magnet-lab",
        mode: "hysteresis",
        readouts: ["loop", "point"],
        caption:
          "Start the cycle at saturation, then lower $H$. At $H = 0$, $B$ stays at $B_r$. It takes a reverse field $H_c$ to bring $B$ to zero. The loop area is the energy turned into heat per cycle in each cubic metre.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the soft iron loop is tall and very thin; the steel loop is a little less tall but many times wider. Two facts JEE likes to test follow. First, soft iron has a slightly **higher** retentivity than steel but a **much lower** coercivity. Second, the loop area (and so the heat produced each cycle) is far smaller for soft iron.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Choosing a material",
      content:
        "**Permanent magnets** (loudspeakers, motors, meters): high coercivity and high retentivity, so the magnetism survives knocks and stray fields. Steel, alnico, cobalt steel, ticonal, neodymium magnets.\n**Electromagnets** (cranes, relays): high permeability so a small current gives a large $B$, and low retentivity so the magnetism vanishes when the current stops. Soft iron.\n**Transformer and motor cores**: high permeability, low coercivity and a thin loop (low hysteresis loss), plus high resistivity or lamination against eddy currents. Soft iron, silicon steel, ferrites.",
    },
    { type: "heading", text: "Worked examples: H, M, B and Curie's law" },
    {
      type: "worked-example",
      id: "em6-4-we1",
      title: "Worked example 1: a solenoid with an iron core",
      problem:
        "A solenoid with 1000 turns per metre carries 2 A. Its core has relative permeability 800. Find $H$, $M$ and $B$ inside.",
      steps: [
        { text: "$H = nI = 1000\\times2 = 2000$ A/m. *Why this step:* $H$ is set by the free current alone, so the core does not change it." },
        { text: "$\\chi = \\mu_r - 1 = 799$, so $M = \\chi H = 1.598\\times10^6$ A/m." },
        { text: "$B = \\mu_0(H + M) = \\mu_0\\mu_rH = 4\\pi\\times10^{-7}\\times800\\times2000 \\approx 2.01$ T, against $2.5\\times10^{-3}$ T with no core." },
      ],
      answer: "$H = 2000$ A/m, $M \\approx 1.6\\times10^6$ A/m, $B \\approx 2.0$ T",
    },
    {
      type: "worked-example",
      id: "em6-4-we2",
      title: "Worked example 2: magnetisation of a bar",
      problem:
        "An iron bar measuring 10 cm × 1 cm × 0.5 cm has a magnetic moment of 0.5 A m². Find its magnetisation.",
      steps: [
        { text: "$V = 0.1\\times0.01\\times0.005 = 5\\times10^{-6}$ m³." },
        { text: "$M = \\dfrac{m}{V} = \\dfrac{0.5}{5\\times10^{-6}} = 10^5$ A/m." },
      ],
      answer: "$M = 10^5$ A/m",
    },
    {
      type: "worked-example",
      id: "em6-4-we3",
      title: "Worked example 3: Curie's law",
      problem:
        "A paramagnetic sample has magnetisation 8 A/m in an applied field of 0.6 T at 4.2 K. Find its magnetisation in 0.2 T at 2.8 K.",
      steps: [
        { text: "Curie's law: $M \\propto \\dfrac{B_0}{T}$. *Why this step:* a stronger field aligns more moments; a lower temperature scrambles fewer." },
        { text: "$M_2 = 8\\times\\dfrac{0.2}{0.6}\\times\\dfrac{4.2}{2.8} = 8\\times\\dfrac13\\times1.5 = 4$ A/m." },
      ],
      answer: "$M_2 = 4$ A/m",
    },
    {
      type: "worked-example",
      id: "em6-4-we4",
      title: "Worked example 4: hysteresis loss in a core",
      problem:
        "A transformer core of volume 1000 cm³ has a hysteresis loop of area 250 J/m³. It runs on 50 Hz mains. Find the power lost to hysteresis.",
      steps: [
        { text: "Energy per cycle $= 250\\times10^{-3} = 0.25$ J. *Why this step:* the loop area is energy per unit volume per cycle." },
        { text: "Power $= 0.25\\times50 = 12.5$ W, heat that must be removed continuously." },
      ],
      answer: "12.5 W",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"diamagnetic materials are not affected by magnets\"",
      content:
        "They are weakly **repelled**. Water is diamagnetic, and a strong enough field (about 16 T) has levitated a living frog. The effect is tiny in ordinary fields only because $|\\chi| \\sim 10^{-5}$. In fact every material has a diamagnetic response; paramagnets and ferromagnets simply have a larger positive effect on top.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "em6-4-q1",
      variant: "practice",
      question: "A long solenoid with 500 turns per metre carries 1.5 A and is filled with a core of relative permeability 1000. What is the field inside? Take $\\mu_0 = 4\\pi\\times10^{-7}$ T m/A and give your answer in tesla.",
      answer: 0.9425,
      relTolerance: 0.01,
      unit: "T",
      hint: "$B = \\mu_0\\mu_r nI$.",
      solution: "$H = nI = 750$ A/m.\n\n$B = \\mu_0\\mu_rH = 4\\pi\\times10^{-7}\\times1000\\times750 \\approx 0.94$ T.",
      commonMistakes: [
        { answer: 0.0009425, feedback: "That is the field with no core, $\\mu_0nI$. The core multiplies it by $\\mu_r$." },
        { answer: 0.6283, feedback: "That uses $n = 500$ and $I = 1$ A. Use $nI = 750$ A/m." },
      ],
    },
    {
      type: "numeric",
      id: "em6-4-q2",
      variant: "practice",
      question: "A paramagnetic salt has magnetisation 6 A/m in an applied field of 0.4 T at 300 K. What is its magnetisation in 0.5 T at 250 K? Give your answer in A/m.",
      answer: 9,
      relTolerance: 0.01,
      unit: "A/m",
      hint: "Curie's law: $M \\propto B_0/T$.",
      solution: "$M_2 = 6\\times\\dfrac{0.5}{0.4}\\times\\dfrac{300}{250} = 6\\times1.25\\times1.2 = 9$ A/m.",
      commonMistakes: [
        { answer: 6.25, feedback: "That has the temperature ratio upside down. Cooling raises $M$." },
        { answer: 7.5, feedback: "That includes the field change but not the temperature change." },
        { answer: 7.2, feedback: "That includes the temperature change but not the field change." },
      ],
    },
    {
      type: "quiz",
      id: "em6-4-q3",
      variant: "concept",
      question: "A liquid fills a U-tube, and one limb sits between the poles of a strong electromagnet. When the magnet is switched on, the liquid level in that limb rises slightly. The liquid is",
      options: [
        { text: "diamagnetic", feedback: "A diamagnetic liquid is pushed out of the strong field, so its level in that limb would fall." },
        { text: "paramagnetic", correct: true, feedback: "It is drawn into the strong-field region, so the level between the poles rises." },
        { text: "non-magnetic, since liquids cannot be magnetised", feedback: "Liquids have susceptibilities too: a solution of a paramagnetic salt rises, water falls." },
        { text: "superconducting", feedback: "A superconductor is a perfect diamagnet: it would be pushed out." },
      ],
      hint: "Which kind of material moves from weak field into strong field?",
    },
    {
      type: "quiz",
      id: "em6-4-q4",
      variant: "concept",
      multiple: true,
      question: "Which statements about **diamagnetic** materials are true? Select all that apply.",
      options: [
        { text: "Their susceptibility is small and negative.", correct: true, feedback: "Typically about $-10^{-5}$." },
        { text: "They move from stronger to weaker regions of a non-uniform field.", correct: true, feedback: "They are weakly repelled by magnets." },
        { text: "Their susceptibility hardly changes with temperature.", correct: true, feedback: "The induced moments do not depend on thermal alignment, so there is no Curie's law." },
        { text: "Their atoms have permanent magnetic moments that line up against the field.", feedback: "Their atoms have no net permanent moment; the moment is **induced** by the field (Lenz)." },
        { text: "A diamagnetic rod between pole pieces lines up along the field.", feedback: "It lies **across** the field, keeping its ends out of the strongest region." },
      ],
      hint: "Diamagnetism is induced (Lenz's law at the atomic scale). Use the comparison table.",
    },
    {
      type: "quiz",
      id: "em6-4-q5",
      variant: "concept",
      question: "An unmagnetised iron bar is placed in a weak field and its magnetisation increases. The main reason is that",
      options: [
        { text: "each iron atom acquires a magnetic moment for the first time", feedback: "Iron atoms already carry permanent moments; within a domain they are already aligned." },
        { text: "domains aligned with the field grow at the expense of the others as their walls move", correct: true, feedback: "Wall motion dominates in weak fields; whole-domain rotation takes over in strong fields, near saturation." },
        { text: "the domains break up into single atoms", feedback: "Domains persist below the Curie temperature." },
        { text: "free electrons start circulating round the bar", feedback: "That would be an eddy current, which is temporary and opposes the change." },
      ],
      hint: "Think about the domain picture: what happens first, in a weak field?",
    },
    {
      type: "quiz",
      id: "em6-4-q6",
      variant: "concept",
      question: "Soft iron is preferred to steel for the core of an electromagnet because soft iron has",
      options: [
        { text: "high coercivity and a wide hysteresis loop", feedback: "That describes steel, which suits permanent magnets." },
        { text: "negative susceptibility", feedback: "Soft iron is ferromagnetic, with a huge positive susceptibility." },
        { text: "high permeability and low coercivity, so it magnetises strongly and loses its magnetism when the current stops", correct: true, feedback: "That is what an electromagnet needs: strong, and easy to switch off." },
        { text: "zero retentivity", feedback: "Soft iron's retentivity is actually slightly higher than steel's. Its coercivity is what is small." },
      ],
      hint: "An electromagnet must be strong while the current flows and must let go when it stops.",
    },
    {
      type: "numeric",
      id: "em6-4-q7",
      variant: "practice",
      question: "An iron core of volume $8\\times10^{-4}$ m³ is taken round a hysteresis loop of area 300 J/m³, fifty times a second. What power is dissipated? Give your answer in watts.",
      answer: 12,
      relTolerance: 0.01,
      unit: "W",
      hint: "Loop area × volume gives the energy per cycle; multiply by cycles per second.",
      solution: "Energy per cycle $= 300\\times8\\times10^{-4} = 0.24$ J.\n\nPower $= 0.24\\times50 = 12$ W.",
      commonMistakes: [
        { answer: 0.24, feedback: "That is the energy per cycle. Multiply by 50 cycles per second." },
        { answer: 15000, feedback: "That is the power per cubic metre. Multiply by the volume." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "displacement-current-and-maxwells-equations",
  title: "6.5 · Displacement Current and Maxwell's Equations",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 5.7 mentioned, in one paragraph, the fix Maxwell made to Ampère's law. This lesson takes it seriously. The fix looks like bookkeeping, but it is the single change that turns electricity and magnetism into a theory of light: without it there are no electromagnetic waves.",
    },
    { type: "heading", text: "The capacitor paradox" },
    {
      type: "text",
      content:
        "A capacitor is charging, with current $i$ in its leads. Draw a circular loop round one lead and apply Ampère's law, $\\oint\\vec B\\cdot d\\vec l = \\mu_0I_{\\text{enc}}$. The \"current enclosed\" means the current through **any** surface bounded by the loop. Choose a flat disc: the wire pierces it, so $I_{\\text{enc}} = i$. Now choose a surface with the same rim that balloons out between the capacitor plates: no wire crosses it, so $I_{\\text{enc}} = 0$. Same loop, same $\\oint\\vec B\\cdot d\\vec l$, two different answers. Ampère's law, as it stands, is inconsistent whenever currents are changing.",
    },
    { type: "heading", text: "Displacement current" },
    {
      type: "text",
      content:
        "What does cross the ballooning surface is a **changing electric field**. Between plates of area $A$ carrying charge $q$, $E = \\dfrac{q}{\\varepsilon_0A}$, so the electric flux is $\\Phi_E = EA = \\dfrac{q}{\\varepsilon_0}$. Differentiate:",
    },
    { type: "math", latex: "\\varepsilon_0\\frac{d\\Phi_E}{dt} = \\frac{dq}{dt} = i" },
    {
      type: "text",
      content:
        "The quantity $\\varepsilon_0\\,d\\Phi_E/dt$ in the gap equals the conduction current in the wire exactly. Maxwell called it the **displacement current** and added it to Ampère's law, so that both surfaces now give the same answer.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The Ampère–Maxwell law",
      content:
        "$\\displaystyle\\oint\\vec B\\cdot d\\vec l = \\mu_0\\left(i_c + \\varepsilon_0\\frac{d\\Phi_E}{dt}\\right)$, with displacement current $i_d = \\varepsilon_0\\dfrac{d\\Phi_E}{dt}$.\nDisplacement current density: $J_d = \\varepsilon_0\\dfrac{dE}{dt}$.\nThe total current $i_c + i_d$ is the same through every surface with the same rim: current is continuous round the circuit, through the gap included.",
    },
    { type: "heading", text: "The magnetic field between the plates" },
    {
      type: "text",
      content:
        "Take circular plates of radius $R$, charging with current $i$. Between the plates the electric field is uniform, so the displacement current is spread evenly over the area $\\pi R^2$. A circle of radius $r$ (centred on the axis, parallel to the plates) encloses the fraction $r^2/R^2$ of it when $r < R$, and all of it when $r > R$. By symmetry $B$ is the same all round the circle:",
    },
    {
      type: "math",
      latex: "B(r) = \\frac{\\mu_0 i\\,r}{2\\pi R^2}\\ \\ (r \\le R), \\qquad B(r) = \\frac{\\mu_0 i}{2\\pi r}\\ \\ (r \\ge R)",
    },
    {
      type: "text",
      content:
        "So between the plates $B$ rises linearly from zero on the axis to a maximum at the rim, then falls off as $1/r$ outside, exactly like a thick wire (lesson 4.4). Outside the plates you cannot tell whether a wire or a gap is there. In an RC circuit the current, and so the displacement current, dies away as $e^{-t/RC}$. In the lab below the blue curve is the current in the leads, which is also the displacement current between the plates.",
    },
    {
      type: "interactive",
      config: {
        component: "em-circuit-lab",
        mode: "rc",
        process: "charge",
        readouts: ["tau", "instant"],
        caption:
          "The current $|i|$ in the leads equals the displacement current $\\varepsilon_0\\,d\\Phi_E/dt$ in the gap at every instant. As the capacitor fills, $dE/dt$ falls and so does the magnetic field between the plates.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the current starts at $\\mathcal E/R$ and decays with time constant $RC$. The magnetic field circling the gap does the same, so the field between the plates is strongest at the instant the switch is closed and vanishes once the capacitor is full and $E$ stops changing.",
    },
    { type: "heading", text: "Maxwell's equations" },
    {
      type: "table",
      headers: ["Law", "Equation", "What it says"],
      rows: [
        ["Gauss (electric)", "$\\oint\\vec E\\cdot d\\vec A = \\dfrac{q_{\\text{enc}}}{\\varepsilon_0}$", "charges are the sources and sinks of $\\vec E$"],
        ["Gauss (magnetic)", "$\\oint\\vec B\\cdot d\\vec A = 0$", "no magnetic monopoles: $\\vec B$ lines close"],
        ["Faraday", "$\\oint\\vec E\\cdot d\\vec l = -\\dfrac{d\\Phi_B}{dt}$", "a changing $\\vec B$ makes a circulating $\\vec E$"],
        ["Ampère–Maxwell", "$\\oint\\vec B\\cdot d\\vec l = \\mu_0 i_c + \\mu_0\\varepsilon_0\\dfrac{d\\Phi_E}{dt}$", "currents and a changing $\\vec E$ make a circulating $\\vec B$"],
      ],
    },
    {
      type: "text",
      content:
        "Add the Lorentz force $\\vec F = q(\\vec E + \\vec v\\times\\vec B)$ and these four lines contain the whole of this course. JEE asks about them qualitatively. Notice the symmetry between the last two: a changing $\\vec B$ makes $\\vec E$, and a changing $\\vec E$ makes $\\vec B$. In empty space ($q = 0$, $i_c = 0$) each changing field can sustain the other, and the pair can travel away from its source as a wave, at the speed $1/\\sqrt{\\mu_0\\varepsilon_0} = c$ (computed in 5.7).",
    },
    {
      type: "callout",
      variant: "info",
      title: "What makes an EM wave",
      content:
        "A charge at rest has only an electric field. A charge moving at constant velocity carries steady $\\vec E$ and $\\vec B$ fields along with it, but radiates nothing. An **accelerated** charge radiates: an oscillating charge (in an antenna, or the LC circuit of 5.4) produces fields that oscillate at the same frequency and spread outwards as an electromagnetic wave.",
    },
    { type: "heading", text: "Worked examples: displacement current and the field in the gap" },
    {
      type: "worked-example",
      id: "em6-5-we1",
      title: "Worked example 1: displacement current from dV/dt",
      problem:
        "A parallel-plate capacitor has plates of area 0.01 m², 1 mm apart, in air. The voltage across it rises at $10^6$ V/s. Find the displacement current.",
      steps: [
        { text: "$C = \\dfrac{\\varepsilon_0A}{d} = \\dfrac{8.85\\times10^{-12}\\times0.01}{10^{-3}} = 8.85\\times10^{-11}$ F." },
        { text: "$i_d = \\varepsilon_0\\dfrac{d\\Phi_E}{dt} = \\varepsilon_0A\\dfrac{d}{dt}\\left(\\dfrac{V}{d}\\right) = C\\dfrac{dV}{dt} = 8.85\\times10^{-5}$ A. *Why this step:* $\\Phi_E = EA$ with $E = V/d$, so the displacement current is $C\\,dV/dt$, the same as the current in the leads." },
      ],
      answer: "$i_d \\approx 88.5\\ \\mu$A",
    },
    {
      type: "worked-example",
      id: "em6-5-we2",
      title: "Worked example 2: B inside and outside the gap",
      problem:
        "Circular plates of radius 5 cm are charged by a steady 2 A. Find $B$ between the plates at 2 cm and at 5 cm from the axis, and outside at 10 cm.",
      steps: [
        { text: "Inside: $B = \\dfrac{\\mu_0 i r}{2\\pi R^2} = 2\\times10^{-7}\\times\\dfrac{2\\times0.02}{0.0025} = 3.2\\times10^{-6}$ T. *Why this step:* the circle of radius 2 cm encloses only $(2/5)^2$ of the displacement current." },
        { text: "At the rim: $2\\times10^{-7}\\times\\dfrac{2}{0.05} = 8\\times10^{-6}$ T, the maximum." },
        { text: "Outside: $\\dfrac{\\mu_0 i}{2\\pi r} = 2\\times10^{-7}\\times\\dfrac{2}{0.1} = 4\\times10^{-6}$ T." },
      ],
      answer: "$3.2\\ \\mu$T, $8\\ \\mu$T (maximum, at the rim) and $4\\ \\mu$T",
    },
    {
      type: "worked-example",
      id: "em6-5-we3",
      title: "Worked example 3: an RC charging circuit",
      problem:
        "A 2 μF capacitor charges through 5 kΩ from a 10 V battery. Find the displacement current at $t = 0$ and at $t = 10$ ms.",
      steps: [
        { text: "$\\tau = RC = 5000\\times2\\times10^{-6} = 10$ ms, and $i(0) = \\mathcal E/R = 2$ mA." },
        { text: "$i_d(t) = i(t) = 2e^{-t/\\tau}$ mA, so at 10 ms, $i_d = 2e^{-1} \\approx 0.74$ mA." },
      ],
      answer: "2 mA at $t = 0$, about 0.74 mA at 10 ms",
    },
    {
      type: "worked-example",
      id: "em6-5-we4",
      title: "Worked example 4: an AC capacitor",
      problem:
        "A 10 μF capacitor is connected to $V = 200\\sin(100\\pi t)$ volts. Find the amplitude of the displacement current.",
      steps: [
        { text: "$i_d = C\\dfrac{dV}{dt} = C\\times200\\times100\\pi\\cos(100\\pi t)$." },
        { text: "Amplitude $= 10^{-5}\\times200\\times314 \\approx 0.63$ A. *Why this step:* with AC the field in the gap never stops changing, so the displacement current never stops: this is how AC \"flows through\" a capacitor." },
      ],
      answer: "about 0.63 A",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"displacement current is charge jumping across the gap\"",
      content:
        "No charge crosses the gap of an ideal capacitor. The displacement current is a changing electric flux, $\\varepsilon_0\\,d\\Phi_E/dt$, which has the units of current and makes a magnetic field exactly as a real current would. It exists wherever $\\vec E$ changes, even in empty space, and that is precisely what lets a light wave cross a vacuum.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "em6-5-q1",
      variant: "practice",
      question: "The electric field between the plates of a capacitor (plate area 0.02 m²) is increasing at $10^{12}$ V m⁻¹ s⁻¹. What is the displacement current? Take $\\varepsilon_0 = 8.85\\times10^{-12}$ F/m and give your answer in amperes.",
      answer: 0.177,
      relTolerance: 0.01,
      unit: "A",
      hint: "$i_d = \\varepsilon_0\\dfrac{d\\Phi_E}{dt} = \\varepsilon_0A\\dfrac{dE}{dt}$.",
      solution: "$i_d = \\varepsilon_0A\\dfrac{dE}{dt} = 8.85\\times10^{-12}\\times0.02\\times10^{12} = 0.177$ A.",
      commonMistakes: [
        { answer: 8.85, feedback: "That is $\\varepsilon_0\\,dE/dt$, the displacement current **density** in A/m². Multiply by the area." },
        { answer: 1.77, feedback: "Check the area: $0.02$ m², not $0.2$ m²." },
      ],
    },
    {
      type: "numeric",
      id: "em6-5-q2",
      variant: "practice",
      question: "A capacitor with circular plates of radius 6 cm is being charged by a current of 1.5 A. What is the magnetic field between the plates at 3 cm from the axis? Give your answer in microtesla (μT).",
      answer: 2.5,
      relTolerance: 0.01,
      unit: "μT",
      hint: "A circle of radius $r < R$ encloses the fraction $r^2/R^2$ of the displacement current.",
      solution: "$B = \\dfrac{\\mu_0 i r}{2\\pi R^2} = 2\\times10^{-7}\\times\\dfrac{1.5\\times0.03}{0.0036} = 2.5\\times10^{-6}$ T $= 2.5\\ \\mu$T.",
      commonMistakes: [
        { answer: 10, feedback: "That is $\\mu_0 i/2\\pi r$, as if the whole current were enclosed. Inside the gap only $(3/6)^2$ of it is." },
        { answer: 5, feedback: "That is the field at the rim, $r = R = 6$ cm." },
      ],
    },
    {
      type: "quiz",
      id: "em6-5-q3",
      variant: "concept",
      question: "While a capacitor charges, the displacement current between its plates is",
      options: [
        { text: "zero, because no charge crosses the gap", feedback: "No charge crosses, but the electric flux changes, and that is the displacement current." },
        { text: "equal to the conduction current in the connecting wires", correct: true, feedback: "$\\varepsilon_0\\,d\\Phi_E/dt = dq/dt = i$: current is continuous round the circuit." },
        { text: "larger than the conduction current, since it is spread over the whole plate area", feedback: "Spreading lowers the current **density**, not the total current." },
        { text: "equal to the conduction current only when the capacitor is fully charged", feedback: "When fully charged both are zero. They are equal at every instant." },
      ],
      hint: "Write $\\Phi_E = q/\\varepsilon_0$ and differentiate.",
    },
    {
      type: "quiz",
      id: "em6-5-q4",
      variant: "concept",
      multiple: true,
      question: "Which statements follow from Maxwell's equations? Select all that apply.",
      options: [
        { text: "A changing magnetic field produces an electric field.", correct: true, feedback: "Faraday's law." },
        { text: "A changing electric field produces a magnetic field, even in empty space.", correct: true, feedback: "The displacement-current term of the Ampère–Maxwell law." },
        { text: "The net magnetic flux out of any closed surface is zero.", correct: true, feedback: "Gauss's law for magnetism: no monopoles." },
        { text: "A charge moving with constant velocity radiates electromagnetic waves.", feedback: "Only **accelerated** charges radiate." },
        { text: "Electric field lines always form closed loops.", feedback: "Electrostatic field lines begin and end on charges. Only induced electric fields (Faraday) form closed loops." },
      ],
      hint: "Go through the four equations one at a time, and remember what is needed for radiation.",
    },
    {
      type: "quiz",
      id: "em6-5-q5",
      variant: "concept",
      question: "Which of these produces electromagnetic waves?",
      options: [
        { text: "A steady current in a long straight wire", feedback: "Steady current gives a steady $\\vec B$; nothing oscillates, nothing radiates." },
        { text: "An electron moving in a straight line at constant speed", feedback: "Uniform motion carries the fields along but does not radiate." },
        { text: "A charge oscillating up and down an antenna", correct: true, feedback: "It accelerates continually, and its fields oscillate and spread out as a wave." },
        { text: "A charged sphere at rest", feedback: "A static charge has only a static electric field." },
      ],
      hint: "Radiation needs accelerated charge.",
    },
    {
      type: "numeric",
      id: "em6-5-q6",
      variant: "practice",
      question: "A 5 μF capacitor is charged through a 10 kΩ resistor from a 20 V battery. What is the displacement current between its plates 50 ms after the switch is closed? Give your answer in milliamperes (mA).",
      answer: 0.7358,
      relTolerance: 0.02,
      unit: "mA",
      hint: "The displacement current equals the charging current $\\dfrac{\\mathcal E}{R}e^{-t/RC}$.",
      solution: "$\\tau = RC = 10^4\\times5\\times10^{-6} = 50$ ms, and $\\mathcal E/R = 2$ mA.\n\n$i_d = 2e^{-50/50} = 2e^{-1} \\approx 0.736$ mA.",
      commonMistakes: [
        { answer: 2, feedback: "That is the current at $t = 0$. After one time constant it has fallen to $1/e$ of that." },
        { answer: 1.264, feedback: "That is $2(1 - e^{-1})$: the charging current **decays**, it does not grow." },
        { answer: 0, tolerance: 0.01, feedback: "The capacitor is still charging after one time constant, so $E$ is still changing." },
      ],
    },
    {
      type: "quiz",
      id: "em6-5-q7",
      variant: "practice",
      question: "A capacitor with circular plates of radius $R$ is charging. Where between the plates is the induced magnetic field strongest?",
      options: [
        { text: "On the axis", feedback: "On the axis the enclosed displacement current is zero, so $B = 0$." },
        { text: "At the rim, $r = R$", correct: true, feedback: "$B \\propto r$ inside and $\\propto 1/r$ outside, so it peaks at $r = R$." },
        { text: "It is the same everywhere between the plates.", feedback: "The enclosed fraction $r^2/R^2$ grows with $r$." },
        { text: "Halfway out, at $r = R/2$", feedback: "There $B$ is half its value at the rim." },
      ],
      hint: "Sketch $B(r) = \\dfrac{\\mu_0 i r}{2\\pi R^2}$ for $r < R$ and $\\dfrac{\\mu_0 i}{2\\pi r}$ for $r > R$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "electromagnetic-waves",
  title: "6.6 · Electromagnetic Waves and Their Equations",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 1887 Heinrich Hertz made a spark jump across a gap in one circuit and saw a tiny spark jump across the gap of a separate loop of wire metres away, with nothing connecting them. He had sent and received Maxwell's waves. He measured their wavelength, showed they reflect, refract and polarise like light, and found their speed: $3\\times10^8$ m/s. This lesson describes those waves precisely and teaches you to read everything about a wave from its equation.",
    },
    { type: "heading", text: "The shape of the wave" },
    {
      type: "text",
      content:
        "In a plane EM wave travelling along $x$, the electric field oscillates along one fixed direction (say $y$) and the magnetic field along a second direction ($z$), perpendicular to the first. Both are perpendicular to the direction of travel, so the wave is **transverse**, and the two fields rise and fall **in phase**, reaching their maxima together. Use the lab to look at the wave from these angles.",
    },
    {
      type: "interactive",
      config: {
        component: "em-wave-lab",
        mode: "wave",
        amplitude: { min: 5, max: 100, step: 5, initial: 60 },
        wavelength: { min: 0.5, max: 5, step: 0.5, initial: 2 },
        readouts: ["fields", "equation", "speed"],
        caption:
          "Drag $\\omega t$ and watch the pattern move. Then reverse the direction of travel: the **B** pattern flips, because $\\vec E\\times\\vec B$ must always point the way the wave goes.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at every point E and B are zero together and maximum together. When the wave travels along $+x$ with $\\vec E$ along $y$, $\\vec B$ is along $+z$ wherever $E_y$ is positive. Reverse the travel and $\\vec B$ flips to $-z$. Switch E to the $z$ axis and B moves to the $y$ axis with the sign that keeps $\\vec E\\times\\vec B$ along the direction of travel. Raising $n$ crowds more wavelengths into the same distance: the wave slows down.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Properties of electromagnetic waves",
      content:
        "1. Transverse: $\\vec E \\perp \\vec B$, and both are perpendicular to the direction of travel $\\hat k$, which is the direction of $\\vec E\\times\\vec B$.\n2. In phase, with $E = cB$ at every instant (so $E_0 = cB_0$) in vacuum.\n3. Speed in vacuum $c = \\dfrac{1}{\\sqrt{\\mu_0\\varepsilon_0}} = 3\\times10^8$ m/s for every frequency. No medium is needed.\n4. In a medium $v = \\dfrac{1}{\\sqrt{\\mu\\varepsilon}} = \\dfrac{c}{\\sqrt{\\mu_r\\varepsilon_r}}$, refractive index $n = \\sqrt{\\mu_r\\varepsilon_r}$ ($\\approx\\sqrt{\\varepsilon_r}$ for non-magnetic materials), and $E_0 = vB_0$.\n5. They carry energy and momentum, and they are uncharged, so electric and magnetic fields do not deflect them.",
    },
    { type: "heading", text: "Speed in a medium" },
    {
      type: "text",
      content:
        "Crossing from vacuum into glass, the frequency stays the same (the fields at the boundary must oscillate together on both sides), so the slower speed means a shorter wavelength: $\\lambda = \\lambda_0/n$. Water is the classic trap: its static $\\varepsilon_r$ is about 80, but at optical frequencies the molecules cannot follow the field and the effective $\\varepsilon_r$ is about $1.33^2 \\approx 1.77$. The relation $n = \\sqrt{\\varepsilon_r}$ needs $\\varepsilon_r$ at the wave's own frequency.",
    },
    { type: "heading", text: "The wave equations" },
    {
      type: "math",
      latex: "E_y = E_0\\sin(kx - \\omega t), \\qquad B_z = B_0\\sin(kx - \\omega t), \\qquad k = \\frac{2\\pi}{\\lambda},\\ \\ \\omega = 2\\pi f,\\ \\ \\frac{\\omega}{k} = c",
    },
    {
      type: "text",
      content:
        "**Reading the direction.** The wave moves towards increasing $x$ when $kx$ and $\\omega t$ have **opposite** signs, $\\sin(kx - \\omega t)$, and towards decreasing $x$ when they have the **same** sign, $\\sin(kx + \\omega t)$. Think of riding a crest: $kx - \\omega t$ stays constant if $x$ grows as $t$ grows.\n\n**Finding B from E.** The direction comes from $\\hat B = \\hat k\\times\\hat E$, the magnitude from $B = E/c$, and the phase is the same:",
    },
    { type: "math", latex: "\\vec B = \\frac{1}{c}\\,\\hat k\\times\\vec E, \\qquad \\vec E = c\\,\\vec B\\times\\hat k" },
    {
      type: "text",
      content:
        "Check: $\\hat k = \\hat i$, $\\vec E$ along $\\hat j$ gives $\\hat i\\times\\hat j = \\hat k$, so $\\vec B$ is along $+z$, as in the lab. Every \"find $\\vec B$\" or \"find the direction of propagation\" question is one cross product.",
    },
    { type: "heading", text: "Worked examples: reading the wave equation" },
    {
      type: "worked-example",
      id: "em6-6-we1",
      title: "Worked example 1: everything from one equation",
      problem:
        "$E_y = 60\\sin(500x - 1.5\\times10^{11}t)$ V/m (SI units). Find the direction of travel, $\\lambda$, $f$, the speed, and write $\\vec B$.",
      steps: [
        { text: "Opposite signs on $kx$ and $\\omega t$: the wave travels along $+x$." },
        { text: "$\\lambda = \\dfrac{2\\pi}{k} = \\dfrac{2\\pi}{500} \\approx 1.26$ cm, and $f = \\dfrac{\\omega}{2\\pi} = \\dfrac{1.5\\times10^{11}}{2\\pi} \\approx 2.4\\times10^{10}$ Hz (microwaves)." },
        { text: "Speed $\\dfrac{\\omega}{k} = \\dfrac{1.5\\times10^{11}}{500} = 3\\times10^8$ m/s. *Why this step:* it checks that the equation describes a wave in vacuum." },
        { text: "$B_0 = \\dfrac{60}{3\\times10^8} = 2\\times10^{-7}$ T, along $\\hat i\\times\\hat j = \\hat k$: $B_z = 2\\times10^{-7}\\sin(500x - 1.5\\times10^{11}t)$ T." },
      ],
      answer: "$+x$; $\\lambda \\approx 1.26$ cm, $f \\approx 2.4\\times10^{10}$ Hz, $v = c$; $B_z = 2\\times10^{-7}\\sin(500x - 1.5\\times10^{11}t)$ T",
    },
    {
      type: "worked-example",
      id: "em6-6-we2",
      title: "Worked example 2: a wave along −y",
      problem:
        "A wave has $\\vec E = E_0\\sin(ky + \\omega t)\\,\\hat k$. Find its direction of travel and the direction of $\\vec B$.",
      steps: [
        { text: "Same signs on $ky$ and $\\omega t$: it travels along $-y$, so $\\hat k_{\\text{travel}} = -\\hat j$." },
        { text: "$\\hat B = (-\\hat j)\\times\\hat k = -\\hat i$. *Why this step:* $\\hat j\\times\\hat k = \\hat i$, and the minus sign carries through." },
        { text: "$\\vec B = -\\dfrac{E_0}{c}\\sin(ky + \\omega t)\\,\\hat i$. Check: $\\vec E\\times\\vec B \\propto \\hat k\\times(-\\hat i) = -\\hat j$. ✓" },
      ],
      answer: "Travels along $-y$, $\\vec B = -\\dfrac{E_0}{c}\\sin(ky + \\omega t)\\,\\hat i$",
    },
    {
      type: "worked-example",
      id: "em6-6-we3",
      title: "Worked example 3: E from B",
      problem:
        "A wave travelling along $+x$ has $\\vec B = 4\\times10^{-8}\\sin(kx - \\omega t)\\,\\hat j$ T. Find $\\vec E$.",
      steps: [
        { text: "$\\vec E = c\\,\\vec B\\times\\hat k_{\\text{travel}}$, with $\\hat j\\times\\hat i = -\\hat k$." },
        { text: "$E_0 = cB_0 = 3\\times10^8\\times4\\times10^{-8} = 12$ V/m, so $\\vec E = -12\\sin(kx - \\omega t)\\,\\hat k$ V/m." },
      ],
      answer: "$\\vec E = -12\\sin(kx - \\omega t)\\,\\hat k$ V/m",
    },
    {
      type: "worked-example",
      id: "em6-6-we4",
      title: "Worked example 4: into glass",
      problem:
        "Light of vacuum wavelength 600 nm and $E_0 = 30$ V/m enters a non-magnetic medium with $\\varepsilon_r = 4$. Find its speed, frequency, wavelength and $B_0$ in the medium.",
      steps: [
        { text: "$n = \\sqrt{\\varepsilon_r} = 2$, so $v = c/2 = 1.5\\times10^8$ m/s." },
        { text: "$f = \\dfrac{c}{\\lambda_0} = 5\\times10^{14}$ Hz, unchanged, so $\\lambda = \\lambda_0/n = 300$ nm." },
        { text: "$B_0 = \\dfrac{E_0}{v} = \\dfrac{30}{1.5\\times10^8} = 2\\times10^{-7}$ T. *Why this step:* in a medium the ratio of the amplitudes is the wave speed there, not $c$ (taking the $E_0$ quoted as the amplitude inside the medium)." },
      ],
      answer: "$v = 1.5\\times10^8$ m/s, $f = 5\\times10^{14}$ Hz, $\\lambda = 300$ nm, $B_0 = 2\\times10^{-7}$ T",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"E and B in a light wave are 90° out of phase\"",
      content:
        "That picture comes from the LC circuit, where energy sloshes between the capacitor's electric field and the inductor's magnetic field. In a **travelling** wave, $\\vec E$ and $\\vec B$ peak together and vanish together; the energy moves forward instead of sloshing. Out-of-phase fields appear only in standing waves.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "em6-6-q1",
      variant: "practice",
      question: "An EM wave in vacuum is described by $E_y = 40\\sin(10\\pi x - \\omega t)$ V/m, with $x$ in metres. What is its frequency? Give your answer in gigahertz (GHz).",
      answer: 1.5,
      relTolerance: 0.01,
      unit: "GHz",
      hint: "Find $\\lambda = 2\\pi/k$, then $f = c/\\lambda$.",
      solution: "$k = 10\\pi$ m⁻¹, so $\\lambda = \\dfrac{2\\pi}{10\\pi} = 0.2$ m.\n\n$f = \\dfrac{c}{\\lambda} = \\dfrac{3\\times10^8}{0.2} = 1.5\\times10^9$ Hz $= 1.5$ GHz.",
      commonMistakes: [
        { answer: 9.42, feedback: "That is $\\omega = ck = 3\\pi\\times10^9$ rad/s, in units of $10^9$. Divide by $2\\pi$ for the frequency." },
        { answer: 0.477, feedback: "That treats $k$ as 10 instead of $10\\pi$ m⁻¹, giving $\\lambda \\approx 0.63$ m." },
        { answer: 3, feedback: "That uses $\\lambda = 0.1$ m. With $k = 10\\pi$, $\\lambda = 2\\pi/k = 0.2$ m." },
      ],
    },
    {
      type: "quiz",
      id: "em6-6-q2",
      variant: "practice",
      question: "An EM wave is described by $\\vec E = E_0\\sin(kz + \\omega t)\\,\\hat i$. It travels along",
      options: [
        { text: "$+z$", feedback: "Same signs on $kz$ and $\\omega t$ mean travel towards **decreasing** $z$." },
        { text: "$-z$", correct: true, feedback: "For a crest, $kz + \\omega t$ is constant, so $z$ decreases as $t$ increases." },
        { text: "$+x$", feedback: "$\\vec E$ points along $x$; the wave is transverse, so it cannot travel along $x$." },
        { text: "$-x$", feedback: "The variable inside the sine is $z$, so the wave travels along the $z$ axis." },
      ],
      hint: "Follow a crest: what keeps $kz + \\omega t$ constant as $t$ increases?",
    },
    {
      type: "quiz",
      id: "em6-6-q3",
      variant: "practice",
      question: "A wave travelling along $+z$ has $\\vec E = E_0\\sin(kz - \\omega t)\\,\\hat j$. Its magnetic field is",
      options: [
        { text: "$\\dfrac{E_0}{c}\\sin(kz - \\omega t)\\,\\hat i$", feedback: "Check $\\hat k\\times\\hat j$: it is $-\\hat i$." },
        { text: "$-\\dfrac{E_0}{c}\\sin(kz - \\omega t)\\,\\hat i$", correct: true, feedback: "$\\hat B = \\hat k\\times\\hat j = -\\hat i$, magnitude $E/c$, same phase. Check: $\\hat j\\times(-\\hat i) = \\hat k$. ✓" },
        { text: "$\\dfrac{E_0}{c}\\cos(kz - \\omega t)\\,\\hat i$", feedback: "$\\vec E$ and $\\vec B$ are in phase in a travelling wave." },
        { text: "$cE_0\\sin(kz - \\omega t)\\,\\hat k$", feedback: "$\\vec B$ is perpendicular to the direction of travel, and its size is $E/c$." },
      ],
      hint: "$\\vec B = \\dfrac{1}{c}\\hat k_{\\text{travel}}\\times\\vec E$.",
    },
    {
      type: "numeric",
      id: "em6-6-q4",
      variant: "practice",
      question: "Light of wavelength 600 nm in vacuum passes into a non-magnetic transparent material with $\\varepsilon_r = 2.25$ at that frequency. What is its wavelength in the material? Give your answer in nm.",
      answer: 400,
      relTolerance: 0.01,
      unit: "nm",
      hint: "$n = \\sqrt{\\varepsilon_r}$, the frequency is unchanged, and $\\lambda = \\lambda_0/n$.",
      solution: "$n = \\sqrt{2.25} = 1.5$.\n\n$\\lambda = \\dfrac{600}{1.5} = 400$ nm.",
      commonMistakes: [
        { answer: 900, feedback: "The wave slows down in the material, so its wavelength gets **shorter**." },
        { answer: 266.7, feedback: "That divides by $\\varepsilon_r$. The refractive index is $\\sqrt{\\varepsilon_r}$." },
        { answer: 600, feedback: "The frequency stays the same; the wavelength changes with the speed." },
      ],
    },
    {
      type: "quiz",
      id: "em6-6-q5",
      variant: "concept",
      multiple: true,
      question: "Which statements about electromagnetic waves in vacuum are true? Select all that apply.",
      options: [
        { text: "They are transverse.", correct: true, feedback: "Both fields are perpendicular to the direction of travel." },
        { text: "$\\vec E\\cdot\\vec B = 0$ at every point.", correct: true, feedback: "The fields are perpendicular to each other." },
        { text: "Their speed is the same for all frequencies.", correct: true, feedback: "$c = 1/\\sqrt{\\mu_0\\varepsilon_0}$ contains no frequency." },
        { text: "They need a material medium to travel through.", feedback: "Each field regenerates the other; no medium is needed. That is how sunlight reaches us." },
        { text: "Being made of fields, they are deflected by a magnetic field.", feedback: "EM waves carry no charge, so they pass straight through static fields." },
      ],
      hint: "Use the property list in this lesson.",
    },
    {
      type: "quiz",
      id: "em6-6-q6",
      variant: "practice",
      question: "An EM wave with electric amplitude 3 V/m travels through a non-magnetic medium with $\\varepsilon_r = 4$. Its magnetic amplitude is",
      options: [
        { text: "$1\\times10^{-8}$ T", feedback: "That uses $c$. In the medium $B_0 = E_0/v$ with $v = c/2$." },
        { text: "$2\\times10^{-8}$ T", correct: true, feedback: "$v = c/\\sqrt4 = 1.5\\times10^8$ m/s, so $B_0 = 3/(1.5\\times10^8) = 2\\times10^{-8}$ T." },
        { text: "$4\\times10^{-8}$ T", feedback: "That uses $v = c/\\varepsilon_r$. The speed is $c/\\sqrt{\\varepsilon_r}$." },
        { text: "$9\\times10^{8}$ T", feedback: "That multiplies by the speed. $B_0 = E_0/v$." },
      ],
      hint: "In a medium, $E_0 = vB_0$ with $v = c/\\sqrt{\\varepsilon_r\\mu_r}$.",
    },
    {
      type: "quiz",
      id: "em6-6-q7",
      variant: "practice",
      question: "(JEE Main style) A wave travels along $+z$ with $\\vec E = E_0\\,\\dfrac{\\hat i + \\hat j}{\\sqrt2}\\cos(kz - \\omega t)$. Its magnetic field points along",
      options: [
        { text: "$\\dfrac{\\hat i + \\hat j}{\\sqrt2}$", feedback: "$\\vec B$ must be perpendicular to $\\vec E$." },
        { text: "$\\dfrac{-\\hat i + \\hat j}{\\sqrt2}$", correct: true, feedback: "$\\hat k\\times\\dfrac{\\hat i + \\hat j}{\\sqrt2} = \\dfrac{\\hat j - \\hat i}{\\sqrt2}$. Check: it is perpendicular to $\\vec E$ and to $\\hat k$." },
        { text: "$\\dfrac{\\hat i - \\hat j}{\\sqrt2}$", feedback: "That is the reverse. With it, $\\vec E\\times\\vec B$ would point along $-z$." },
        { text: "$\\hat k$", feedback: "$\\vec B$ is perpendicular to the direction of travel." },
      ],
      hint: "Use $\\hat B = \\hat k_{\\text{travel}}\\times\\hat E$ with $\\hat k\\times\\hat i = \\hat j$ and $\\hat k\\times\\hat j = -\\hat i$.",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "energy-momentum-and-the-spectrum",
  title: "6.7 · Energy, Momentum and the EM Spectrum",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Sunlight warms your face, so it carries energy. Less obviously, it also pushes: a comet's dust tail points away from the Sun partly because sunlight presses on the dust, and solar-sail spacecraft have been steered by nothing else. This lesson counts the energy and momentum an EM wave carries, then lays out the whole spectrum, from gamma rays to radio, the way JEE tests it.",
    },
    { type: "heading", text: "Energy density" },
    {
      type: "text",
      content:
        "Lessons 2.4 and 5.3 found the energy stored per unit volume in an electric field and in a magnetic field. In a wave in vacuum, $B = E/c$ and $c^2 = 1/\\mu_0\\varepsilon_0$, so the two are **equal**:",
    },
    {
      type: "math",
      latex: "u_E = \\tfrac12\\varepsilon_0E^2, \\qquad u_B = \\frac{B^2}{2\\mu_0} = \\frac{E^2}{2\\mu_0c^2} = \\tfrac12\\varepsilon_0E^2 = u_E",
    },
    {
      type: "text",
      content:
        "The total instantaneous energy density is $u = \\varepsilon_0E^2$. Averaged over a cycle, $\\overline{\\sin^2} = \\tfrac12$, so $\\bar u = \\tfrac12\\varepsilon_0E_0^2 = \\varepsilon_0E_{\\text{rms}}^2$, with $E_{\\text{rms}} = E_0/\\sqrt2$, exactly as for AC.",
    },
    { type: "heading", text: "Intensity and the Poynting vector" },
    {
      type: "text",
      content:
        "The energy moves at speed $c$, so in one second the energy in a column of length $c$ and unit cross-section crosses each square metre. The energy flow is described by the **Poynting vector**, which points along the direction of travel:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Poynting vector and intensity",
      content:
        "$\\vec S = \\dfrac{1}{\\mu_0}\\vec E\\times\\vec B$, energy per unit area per unit time (W/m²), along the direction of propagation. Its size is $\\dfrac{EB}{\\mu_0} = c\\varepsilon_0E^2$.\nIntensity (the time-average of $S$): $I = \\bar u\\,c = \\tfrac12c\\varepsilon_0E_0^2 = c\\varepsilon_0E_{\\text{rms}}^2 = \\dfrac{cB_0^2}{2\\mu_0}$.\nA point source of power $P$ spreading evenly in all directions: $I = \\dfrac{P}{4\\pi r^2}$, so $E_0 \\propto 1/r$.",
    },
    {
      type: "text",
      content:
        "In the lab, change $E_0$ and watch the intensity grow as its square. Then set $n$ above 1: the wave slows and its energy density rises, and the readouts switch to the medium's values.",
    },
    {
      type: "interactive",
      config: {
        component: "em-wave-lab",
        mode: "wave",
        amplitude: { min: 10, max: 1000, step: 10, initial: 1000 },
        wavelength: { min: 400, max: 700, step: 10, initial: 500 },
        wavelengthUnit: "nm",
        readouts: ["fields", "energy", "intensity", "pressure"],
        caption:
          "With $E_0 \\approx 1000$ V/m this is roughly bright sunlight: an intensity near 1.3 kW/m², yet a radiation pressure of only a few micropascals.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: halving $E_0$ quarters the intensity, and with $n = 1$ the radiation pressure on an absorbing surface is $I/c$, a few millionths of a pascal for full sunlight. Reflection doubles it. Those are tiny numbers, but in space nothing opposes them, and a sail of a few hundred square metres gains real speed over months.",
    },
    { type: "heading", text: "Momentum and radiation pressure" },
    {
      type: "text",
      content:
        "A wave carrying energy $U$ also carries momentum $p = U/c$. When it is absorbed, that momentum is handed to the surface; when it is reflected straight back, the momentum reverses and the surface receives twice as much. Dividing by time and area turns momentum into pressure:",
    },
    {
      type: "math",
      latex: "p_{\\text{absorbed}} = \\frac{U}{c}, \\quad p_{\\text{reflected}} = \\frac{2U}{c}, \\qquad P_{\\text{rad}} = \\frac{I}{c}\\ (\\text{absorbing}), \\quad \\frac{2I}{c}\\ (\\text{reflecting})",
    },
    {
      type: "text",
      content:
        "A surface that reflects a fraction $r$ and absorbs the rest feels $(1 + r)\\dfrac{I}{c}$. If the light arrives at angle $\\theta$ to the normal, two factors of $\\cos\\theta$ appear: the beam's power spreads over a larger area ($I\\cos\\theta$ per unit area of surface), and only the normal component of momentum pushes. So the pressure is $\\dfrac{I}{c}\\cos^2\\theta$ (absorbing) or $\\dfrac{2I}{c}\\cos^2\\theta$ (reflecting). The force on an absorbing area $A$ facing the beam is $IA/c$, which is the beam power over $c$.",
    },
    { type: "heading", text: "The electromagnetic spectrum" },
    {
      type: "text",
      content:
        "All EM waves are the same thing: transverse $\\vec E$ and $\\vec B$ travelling at $c$. They differ only in wavelength, which decides how they are made, how they are detected and what they do to matter. Slide through the spectrum below and read off each band.",
    },
    {
      type: "interactive",
      config: {
        component: "em-wave-lab",
        mode: "spectrum",
        wavelengthExp: { min: -13, max: 3, step: 0.05, initial: -6.3 },
        caption:
          "Shorter wavelength means higher frequency and more energetic photons ($E = hc/\\lambda$, with $hc \\approx 1240$ eV nm). Only the visible sliver, 400 to 700 nm, reaches our eyes.",
      },
    },
    {
      type: "table",
      headers: ["Band", "Wavelength", "Frequency", "Produced by", "Detected by", "Uses"],
      rows: [
        ["Radio", "> 0.1 m", "< $3\\times10^9$ Hz", "accelerated electrons in aerials", "receiver aerials", "AM/FM radio, TV, mobile phones"],
        ["Microwave", "1 mm – 0.1 m", "$3\\times10^9$ – $3\\times10^{11}$ Hz", "klystron, magnetron, Gunn diode", "point-contact diodes", "radar, microwave ovens, satellite links"],
        ["Infrared", "700 nm – 1 mm", "$3\\times10^{11}$ – $4.3\\times10^{14}$ Hz", "hot bodies, molecular vibrations", "thermopiles, bolometers", "remote controls, night vision, physiotherapy"],
        ["Visible", "400 – 700 nm", "$4.3\\times10^{14}$ – $7.5\\times10^{14}$ Hz", "electron transitions in atoms", "eye, photocells, film", "vision, photography, optical fibres"],
        ["Ultraviolet", "1 – 400 nm", "$7.5\\times10^{14}$ – $3\\times10^{17}$ Hz", "the Sun, arc and discharge lamps", "photocells, film", "sterilisation, forged-note detection, LASIK"],
        ["X-rays", "$10^{-3}$ – 1 nm", "$3\\times10^{17}$ – $3\\times10^{20}$ Hz", "X-ray tubes, inner-shell electrons", "film, Geiger tubes", "medical imaging, crystallography"],
        ["Gamma rays", "< $10^{-3}$ nm", "> $3\\times10^{20}$ Hz", "radioactive nuclei", "Geiger tubes, ionisation chambers", "radiotherapy, sterilising equipment"],
      ],
    },
    {
      type: "text",
      content:
        "Points JEE likes: microwave ovens heat food because the microwave frequency matches a rotational resonance of water molecules; infrared is \"heat radiation\" and the greenhouse effect traps it; the ozone layer absorbs most solar UV; X-rays and gamma rays overlap in wavelength and are named by their **source** (electrons versus nuclei); and in order of increasing wavelength the bands run gamma, X, UV, visible, IR, microwave, radio.",
    },
    { type: "heading", text: "Worked examples: intensity, fields and pressure" },
    {
      type: "worked-example",
      id: "em6-7-we1",
      title: "Worked example 1: the fields in sunlight",
      problem:
        "Sunlight above the atmosphere has intensity about 1.4 kW/m². Find $E_0$, $E_{\\text{rms}}$ and $B_0$.",
      steps: [
        { text: "$I = \\tfrac12c\\varepsilon_0E_0^2$, so $E_0 = \\sqrt{\\dfrac{2I}{c\\varepsilon_0}} = \\sqrt{\\dfrac{2800}{3\\times10^8\\times8.85\\times10^{-12}}} \\approx 1.03\\times10^3$ V/m." },
        { text: "$E_{\\text{rms}} = E_0/\\sqrt2 \\approx 726$ V/m, and $B_0 = E_0/c \\approx 3.4\\times10^{-6}$ T. *Why this step:* the magnetic amplitude is tiny in tesla, but it carries exactly half the energy." },
      ],
      answer: "$E_0 \\approx 1.03$ kV/m, $E_{\\text{rms}} \\approx 726$ V/m, $B_0 \\approx 3.4\\ \\mu$T",
    },
    {
      type: "worked-example",
      id: "em6-7-we2",
      title: "Worked example 2: a point source",
      problem:
        "A source radiates 60 W uniformly in all directions. Find the intensity and the peak electric field 2 m away.",
      steps: [
        { text: "$I = \\dfrac{P}{4\\pi r^2} = \\dfrac{60}{4\\pi\\times4} \\approx 1.19$ W/m². *Why this step:* the power spreads over a sphere of area $4\\pi r^2$." },
        { text: "$E_0 = \\sqrt{\\dfrac{2I}{c\\varepsilon_0}} = \\sqrt{\\dfrac{2.39}{2.655\\times10^{-3}}} \\approx 30$ V/m." },
      ],
      answer: "$I \\approx 1.19$ W/m², $E_0 \\approx 30$ V/m",
    },
    {
      type: "worked-example",
      id: "em6-7-we3",
      title: "Worked example 3: a solar sail",
      problem:
        "Sunlight of intensity 1.4 kW/m² falls normally on a 10 m² sail. Find the force if the sail (a) absorbs all the light, (b) reflects all of it.",
      steps: [
        { text: "(a) $F = \\dfrac{IA}{c} = \\dfrac{1400\\times10}{3\\times10^8} \\approx 4.7\\times10^{-5}$ N." },
        { text: "(b) Reflection reverses the momentum, doubling the force: $\\approx 9.3\\times10^{-5}$ N." },
      ],
      answer: "(a) $4.7\\times10^{-5}$ N, (b) $9.3\\times10^{-5}$ N",
    },
    {
      type: "worked-example",
      id: "em6-7-we4",
      title: "Worked example 4: momentum of a pulse",
      problem:
        "A laser pulse carrying 3 J is absorbed by a small mirror-free target. How much momentum does the target receive? What if the pulse had been reflected straight back?",
      steps: [
        { text: "Absorbed: $p = \\dfrac{U}{c} = \\dfrac{3}{3\\times10^8} = 10^{-8}$ kg m/s." },
        { text: "Reflected: $2\\times10^{-8}$ kg m/s. *Why this step:* the momentum changes from $+U/c$ to $-U/c$." },
      ],
      answer: "$10^{-8}$ kg m/s absorbed, $2\\times10^{-8}$ kg m/s reflected",
    },
    {
      type: "worked-example",
      id: "em6-7-we5",
      title: "Worked example 5: naming a band",
      problem:
        "A wave has frequency 3 GHz. Find its wavelength and name the band.",
      steps: [
        { text: "$\\lambda = \\dfrac{c}{f} = \\dfrac{3\\times10^8}{3\\times10^9} = 0.1$ m $= 10$ cm." },
        { text: "Between 1 mm and 0.1 m (the boundary): microwave, used for radar and mobile links." },
      ],
      answer: "$\\lambda = 10$ cm, microwave",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the magnetic field carries almost none of the energy\"",
      content:
        "In sunlight $B_0$ is only about $3\\ \\mu$T while $E_0$ is about 1000 V/m, so it is tempting to call the magnetic part negligible. But those numbers are in different units. The energy densities are $\\tfrac12\\varepsilon_0E^2$ and $B^2/2\\mu_0$, and in a wave they are **exactly equal**: the magnetic field carries half the energy.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "em6-7-q1",
      variant: "practice",
      question: "An EM wave in vacuum has electric amplitude 50 V/m. What is its intensity? Take $\\varepsilon_0 = 8.85\\times10^{-12}$ F/m and $c = 3\\times10^8$ m/s, and give your answer in W/m².",
      answer: 3.319,
      relTolerance: 0.01,
      unit: "W/m²",
      hint: "$I = \\tfrac12c\\varepsilon_0E_0^2$.",
      solution: "$I = \\tfrac12\\times3\\times10^8\\times8.85\\times10^{-12}\\times50^2 = \\tfrac12\\times2.655\\times10^{-3}\\times2500 \\approx 3.32$ W/m².",
      commonMistakes: [
        { answer: 6.638, feedback: "That leaves out the $\\tfrac12$ from averaging $\\sin^2$ over a cycle." },
        { answer: 1.106e-8, feedback: "That is the average energy density $\\bar u$ in J/m³. Multiply by $c$." },
        { answer: 0.0664, feedback: "That uses $E_0$ instead of $E_0^2$." },
      ],
    },
    {
      type: "numeric",
      id: "em6-7-q2",
      variant: "practice",
      question: "Light of intensity 1200 W/m² falls normally on a surface that reflects 40% of it and absorbs the rest. What radiation pressure does the surface feel? Give your answer in micropascals (μPa).",
      answer: 5.6,
      relTolerance: 0.01,
      unit: "μPa",
      hint: "The absorbed part gives $I/c$ per unit intensity, the reflected part $2I/c$: in total $(1 + r)I/c$.",
      solution: "$\\dfrac{I}{c} = \\dfrac{1200}{3\\times10^8} = 4\\times10^{-6}$ Pa.\n\n$P = (1 + 0.4)\\times4\\times10^{-6} = 5.6\\times10^{-6}$ Pa $= 5.6\\ \\mu$Pa.",
      commonMistakes: [
        { answer: 4, feedback: "That treats the surface as a perfect absorber. The reflected 40% pushes twice as hard." },
        { answer: 8, feedback: "That treats the surface as a perfect reflector." },
        { answer: 3.2, feedback: "That counts only the reflected 40% ($2\\times0.4\\times I/c$). The absorbed 60% pushes too, adding $0.6\\,I/c$." },
      ],
    },
    {
      type: "quiz",
      id: "em6-7-q3",
      variant: "concept",
      question: "In an electromagnetic wave in vacuum, the average energy density in the electric field is",
      options: [
        { text: "much larger than in the magnetic field, because $E_0 \\gg B_0$", feedback: "$E$ and $B$ are in different units; compare $\\tfrac12\\varepsilon_0E^2$ with $B^2/2\\mu_0$." },
        { text: "equal to that in the magnetic field", correct: true, feedback: "With $B = E/c$ and $c^2 = 1/\\mu_0\\varepsilon_0$, $B^2/2\\mu_0 = \\tfrac12\\varepsilon_0E^2$." },
        { text: "half that in the magnetic field", feedback: "They are exactly equal." },
        { text: "zero on average, since $E$ changes sign", feedback: "Energy density goes as $E^2$, which is never negative." },
      ],
      hint: "Write $u_B = B^2/2\\mu_0$ and substitute $B = E/c$.",
    },
    {
      type: "quiz",
      id: "em6-7-q4",
      variant: "practice",
      question: "Which list is in order of **increasing wavelength**?",
      options: [
        { text: "radio, microwave, infrared, visible, ultraviolet, X-rays, gamma rays", feedback: "That is decreasing wavelength (increasing frequency)." },
        { text: "gamma rays, X-rays, ultraviolet, visible, infrared, microwave, radio", correct: true, feedback: "Shortest (gamma) to longest (radio)." },
        { text: "X-rays, gamma rays, ultraviolet, visible, infrared, radio, microwave", feedback: "Gamma rays are shorter than X-rays, and radio is the longest band." },
        { text: "gamma rays, ultraviolet, X-rays, visible, microwave, infrared, radio", feedback: "X-rays come before UV, and infrared before microwave." },
      ],
      hint: "Gamma rays have the shortest wavelengths and radio waves the longest.",
    },
    {
      type: "quiz",
      id: "em6-7-q5",
      variant: "practice",
      multiple: true,
      question: "(JEE matching style) Which pairings of a band with its source or detector are correct? Select all that apply.",
      options: [
        { text: "Microwaves: magnetron or klystron", correct: true, feedback: "These vacuum tubes generate microwaves (the magnetron is inside every microwave oven)." },
        { text: "Infrared: thermopile or bolometer", correct: true, feedback: "IR is detected through the heating it produces." },
        { text: "Gamma rays: radioactive decay of nuclei", correct: true, feedback: "Gamma rays come from nuclear transitions." },
        { text: "X-rays: oscillating currents in an aerial", feedback: "That is how radio waves are made. X-rays come from fast electrons hitting a target (X-ray tubes)." },
        { text: "Ultraviolet: point-contact diodes", feedback: "Point-contact diodes detect microwaves. UV is detected with photocells and film." },
      ],
      hint: "Match each band with how it is made and detected (see the table).",
    },
    {
      type: "numeric",
      id: "em6-7-q6",
      variant: "practice",
      question: "A source radiates 100 W uniformly in all directions. What is the peak electric field 5 m away? Take $c\\varepsilon_0 = 2.655\\times10^{-3}$ S, and give your answer in V/m.",
      answer: 15.49,
      relTolerance: 0.02,
      unit: "V/m",
      hint: "$I = \\dfrac{P}{4\\pi r^2}$, then $E_0 = \\sqrt{\\dfrac{2I}{c\\varepsilon_0}}$.",
      solution: "$I = \\dfrac{100}{4\\pi\\times25} \\approx 0.318$ W/m².\n\n$E_0 = \\sqrt{\\dfrac{2\\times0.318}{2.655\\times10^{-3}}} \\approx \\sqrt{240} \\approx 15.5$ V/m.",
      commonMistakes: [
        { answer: 10.95, feedback: "That is the rms field, $\\sqrt{I/c\\varepsilon_0}$. The peak is $\\sqrt2$ times larger." },
        { answer: 54.9, feedback: "That uses $I = P/r^2$. The power spreads over $4\\pi r^2$." },
      ],
    },
    {
      type: "quiz",
      id: "em6-7-q7",
      variant: "practice",
      question: "A 30 W laser beam falls normally on a perfectly reflecting mirror. The force on the mirror is",
      options: [
        { text: "$1\\times10^{-7}$ N", feedback: "That is the force on a perfect **absorber**, $P/c$." },
        { text: "$2\\times10^{-7}$ N", correct: true, feedback: "Reflection doubles the momentum transfer: $F = 2P/c = 60/(3\\times10^8)$." },
        { text: "$9\\times10^{9}$ N", feedback: "That multiplies by $c$. Momentum per second is power **divided** by $c$." },
        { text: "zero, since light has no mass", feedback: "Light carries momentum $U/c$ even though it has no mass." },
      ],
      hint: "Momentum delivered per second is $P/c$ for absorption and twice that for reflection.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-6-mastery",
  title: "6.8 · Chapter 6 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every question below comes back to two pictures: a magnet is a dipole (a solenoid, or a pair of poles) that a field turns and a material answers with its own magnetisation; and a changing $\\vec E$ makes $\\vec B$ just as a changing $\\vec B$ makes $\\vec E$, so the two can travel together at $c$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in eight lines",
      content:
        "1. $m = NIA = q_m(2l)$; exact axial $\\frac{\\mu_0}{4\\pi}\\frac{2mr}{(r^2 - l^2)^2}$, equatorial $\\frac{\\mu_0}{4\\pi}\\frac{m}{(r^2 + l^2)^{3/2}}$; general point $\\frac{\\mu_0}{4\\pi}\\frac{m}{r^3}\\sqrt{1 + 3\\cos^2\\theta}$, $\\tan\\alpha = \\tfrac12\\tan\\theta$.\n2. $\\tau = mB\\sin\\theta$, $U = -mB\\cos\\theta$, $T = 2\\pi\\sqrt{I/mB}$; cutting across into $n$ pieces gives $T/n$.\n3. Earth: $\\tan\\delta = B_V/B_H$; apparent dip $\\tan\\delta' = \\tan\\delta/\\cos\\beta$; $\\cot^2\\delta_1 + \\cot^2\\delta_2 = \\cot^2\\delta$.\n4. Tangent law $B = B_H\\tan\\theta$; tangent galvanometer $I = \\frac{2RB_H}{\\mu_0N}\\tan\\theta$, best near $45^\\circ$.\n5. $B = \\mu_0(H + M)$, $M = \\chi H$, $\\mu_r = 1 + \\chi$; dia $\\chi < 0$, para $\\chi \\propto 1/T$, ferro: domains, $T_C$, hysteresis (area = loss per cycle).\n6. $i_d = \\varepsilon_0\\,d\\Phi_E/dt$ equals the conduction current; between circular plates $B = \\frac{\\mu_0 i r}{2\\pi R^2}$.\n7. EM wave: $\\vec E\\perp\\vec B\\perp\\hat k$, in phase, $E_0 = cB_0$, $\\hat k = \\hat E\\times\\hat B$, $v = c/\\sqrt{\\mu_r\\varepsilon_r}$.\n8. $\\bar u = \\tfrac12\\varepsilon_0E_0^2$ (shared equally), $I = \\tfrac12c\\varepsilon_0E_0^2$, pressure $I/c$ or $2I/c$; spectrum: gamma, X, UV, visible, IR, micro, radio.",
    },
    {
      type: "numeric",
      id: "em6-8-q1",
      variant: "mastery",
      question: "A bar magnet of moment 2 A m² has magnetic length 10 cm. What is the field on its equatorial line 12 cm from its centre? Give your answer in microtesla (μT).",
      answer: 91.03,
      relTolerance: 0.02,
      unit: "μT",
      hint: "Exact equatorial field (lesson 6.1, Worked example 2): each pole is $\\sqrt{r^2 + l^2}$ away.",
      solution: "$l = 5$ cm, so each pole is $\\sqrt{12^2 + 5^2} = 13$ cm away.\n\n$B = 10^{-7}\\times\\dfrac{2}{(0.13)^3} = \\dfrac{2\\times10^{-7}}{2.197\\times10^{-3}} \\approx 9.1\\times10^{-5}$ T $\\approx 91\\ \\mu$T.",
      commonMistakes: [
        { answer: 115.7, feedback: "That is the short-magnet formula $\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{r^3}$. With $l$ given and $r$ only 2.4 times $l$, use the exact form." },
        { answer: 339, feedback: "That is the exact **axial** field." },
      ],
    },
    {
      type: "quiz",
      id: "em6-8-q2",
      variant: "mastery",
      question: "A magnet makes 10 oscillations per minute in a horizontal field $B$. In a field of $4B$ it makes",
      options: [
        { text: "40 oscillations per minute", feedback: "Frequency goes as $\\sqrt B$, not $B$." },
        { text: "5 oscillations per minute", feedback: "A stronger field speeds the oscillations up." },
        { text: "20 oscillations per minute", correct: true, feedback: "$f \\propto \\sqrt{mB/I}$: four times the field doubles the frequency." },
        { text: "10 oscillations per minute", feedback: "The field supplies the restoring torque, so it changes the frequency." },
      ],
      hint: "Oscillations of a magnet (lesson 6.2): $T = 2\\pi\\sqrt{I/mB}$.",
    },
    {
      type: "numeric",
      id: "em6-8-q3",
      variant: "mastery",
      question: "A short magnet of moment 1.6 A m² lies in the magnetic meridian with its N pole pointing **south**, where $B_H = 40\\ \\mu$T. How far from its centre are the neutral points? Give your answer in cm.",
      answer: 20,
      relTolerance: 0.01,
      unit: "cm",
      hint: "Neutral points (lesson 6.3): with N pointing south they lie on the axis, where $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{d^3} = B_H$.",
      solution: "$d^3 = \\dfrac{2\\times10^{-7}\\times1.6}{4\\times10^{-5}} = 8\\times10^{-3}$ m³, so $d = 0.2$ m $= 20$ cm, on the axis.",
      commonMistakes: [
        { answer: 15.87, feedback: "That uses the equatorial field. With the N pole south, the cancellation happens on the axis." },
        { answer: 25.2, feedback: "Check the factor: $d^3 = 2\\times10^{-7}\\times1.6/(4\\times10^{-5}) = 8\\times10^{-3}$ m³, not $1.6\\times10^{-2}$." },
      ],
    },
    {
      type: "quiz",
      id: "em6-8-q4",
      variant: "mastery",
      question: "A dip circle is set in the vertical plane at right angles to the magnetic meridian. Its needle",
      options: [
        { text: "reads the true dip", feedback: "Only in the magnetic meridian." },
        { text: "stands vertical", correct: true, feedback: "No horizontal field lies in that plane ($B_H\\cos90^\\circ = 0$), so $\\tan\\delta' \\to \\infty$." },
        { text: "lies horizontal", feedback: "All of $B_V$ still acts in the plane; nothing horizontal does." },
        { text: "reads twice the true dip", feedback: "$\\tan\\delta' = \\tan\\delta/\\cos\\beta$, which is infinite at $\\beta = 90^\\circ$." },
      ],
      hint: "Apparent dip (lesson 6.3): $\\tan\\delta' = \\tan\\delta/\\cos\\beta$.",
    },
    {
      type: "numeric",
      id: "em6-8-q5",
      variant: "mastery",
      question: "A current of 0.2 A deflects a tangent galvanometer by $30^\\circ$. What deflection does 0.6 A produce? Give your answer in degrees.",
      answer: 60,
      relTolerance: 0.01,
      unit: "°",
      hint: "Tangent galvanometer (lesson 6.3): $I \\propto \\tan\\theta$.",
      solution: "$\\tan\\theta_2 = 3\\tan30^\\circ = 3\\times\\dfrac{1}{\\sqrt3} = \\sqrt3$, so $\\theta_2 = 60^\\circ$.",
      commonMistakes: [
        { answer: 90, feedback: "The current is proportional to $\\tan\\theta$, not to $\\theta$." },
        { answer: 45, feedback: "That would need $\\tan\\theta_2 = 1$, which is $\\sqrt3$ times $\\tan30^\\circ$, not three times." },
      ],
    },
    {
      type: "quiz",
      id: "em6-8-q6",
      variant: "mastery",
      question: "A long solenoid with 800 turns per metre carries 2.5 A around a core of susceptibility 1199. The field inside is about",
      options: [
        { text: "$2.5\\times10^{-3}$ T", feedback: "That is $\\mu_0nI$, the field without the core." },
        { text: "3.0 T", correct: true, feedback: "$H = 2000$ A/m, $\\mu_r = 1200$: $B = \\mu_0\\mu_rH = 4\\pi\\times10^{-7}\\times1200\\times2000 \\approx 3.0$ T." },
        { text: "$2.4\\times10^{6}$ T", feedback: "That is $M = \\chi H$ in A/m, not a field in tesla. Multiply by $\\mu_0$." },
        { text: "1.5 T", feedback: "Check the arithmetic: $4\\pi\\times10^{-7}\\times2.4\\times10^6 \\approx 3.0$." },
      ],
      hint: "M, H and B (lesson 6.4, Worked example 1): $B = \\mu_0(1 + \\chi)nI$.",
    },
    {
      type: "quiz",
      id: "em6-8-q7",
      variant: "mastery",
      multiple: true,
      question: "Which statements about magnetic materials are true? Select all that apply.",
      options: [
        { text: "Soft iron has a slightly higher retentivity than steel but a much lower coercivity.", correct: true, feedback: "That is why soft iron makes good electromagnets and steel good permanent magnets." },
        { text: "Above its Curie temperature, iron becomes paramagnetic.", correct: true, feedback: "Thermal agitation destroys the domain order." },
        { text: "A paramagnetic liquid rises in the limb of a U-tube placed between magnet poles.", correct: true, feedback: "It is drawn into the strong field." },
        { text: "Diamagnetic susceptibility obeys Curie's law.", feedback: "Diamagnetism is induced and almost independent of temperature." },
        { text: "The area of the B–H loop is the energy stored in the magnet.", feedback: "It is the energy **lost** as heat per cycle per unit volume." },
      ],
      hint: "Magnetic materials and hysteresis (lesson 6.4).",
    },
    {
      type: "numeric",
      id: "em6-8-q8",
      variant: "mastery",
      question: "A 5 μF capacitor is connected across $V = 100\\sin(1000t)$ volts. What is the amplitude of the displacement current between its plates? Give your answer in amperes.",
      answer: 0.5,
      relTolerance: 0.01,
      unit: "A",
      hint: "Displacement current (lesson 6.5, Worked example 4): $i_d = C\\,dV/dt$.",
      solution: "$i_d = C\\dfrac{dV}{dt} = 5\\times10^{-6}\\times100\\times1000\\cos(1000t)$, so the amplitude is $0.5$ A.",
      commonMistakes: [
        { answer: 0.3536, feedback: "That is the rms value. The question asks for the amplitude." },
        { answer: 0.0005, feedback: "That is $CV_0$, a charge. Differentiate: the factor $\\omega = 1000$ s⁻¹ appears." },
      ],
    },
    {
      type: "quiz",
      id: "em6-8-q9",
      variant: "mastery",
      question: "(JEE Advanced style) A capacitor with circular plates of radius $R$ is charged by a steady current. Compare the magnetic field at distance $R/2$ from the axis (between the plates) with that at distance $2R$ (outside).",
      options: [
        { text: "The field at $R/2$ is four times that at $2R$.", feedback: "Inside, only $(1/2)^2$ of the displacement current is enclosed." },
        { text: "The field at $R/2$ is half that at $2R$.", feedback: "Work both out: $\\dfrac{\\mu_0 i(R/2)}{2\\pi R^2}$ and $\\dfrac{\\mu_0 i}{2\\pi(2R)}$." },
        { text: "They are equal.", correct: true, feedback: "Inside: $\\dfrac{\\mu_0 i(R/2)}{2\\pi R^2} = \\dfrac{\\mu_0 i}{4\\pi R}$. Outside: $\\dfrac{\\mu_0 i}{2\\pi(2R)} = \\dfrac{\\mu_0 i}{4\\pi R}$." },
        { text: "The field at $R/2$ is zero, since no current flows between the plates.", feedback: "The displacement current between the plates makes a magnetic field just as conduction current does." },
      ],
      hint: "Field between the plates (lesson 6.5): $B \\propto r$ inside and $\\propto 1/r$ outside.",
    },
    {
      type: "quiz",
      id: "em6-8-q10",
      variant: "mastery",
      question: "The magnetic field of an EM wave is $\\vec B = B_0\\sin(ky + \\omega t)\\,\\hat k$. Its electric field is",
      options: [
        { text: "$cB_0\\sin(ky + \\omega t)\\,\\hat i$", correct: true, feedback: "It travels along $-y$. $\\vec E = c\\vec B\\times\\hat k_{\\text{travel}} = cB_0\\,\\hat k\\times(-\\hat j) = cB_0\\,\\hat i$. Check: $\\hat i\\times\\hat k = -\\hat j$. ✓" },
        { text: "$-cB_0\\sin(ky + \\omega t)\\,\\hat i$", feedback: "That would make $\\vec E\\times\\vec B$ point along $+y$, but the wave travels along $-y$." },
        { text: "$cB_0\\sin(ky + \\omega t)\\,\\hat j$", feedback: "$\\vec E$ must be perpendicular to the direction of travel, which is along $y$." },
        { text: "$\\dfrac{B_0}{c}\\sin(ky + \\omega t)\\,\\hat i$", feedback: "$E_0 = cB_0$, not $B_0/c$." },
      ],
      hint: "Wave equations (lesson 6.6): find the direction of travel from the signs, then use $\\vec E = c\\vec B\\times\\hat k$.",
    },
    {
      type: "numeric",
      id: "em6-8-q11",
      variant: "mastery",
      question: "Sunlight of intensity 1.2 kW/m² falls on a perfectly absorbing surface at $60^\\circ$ to the normal. What is the radiation pressure? Give your answer in micropascals (μPa).",
      answer: 1,
      relTolerance: 0.01,
      unit: "μPa",
      hint: "Radiation pressure at oblique incidence (lesson 6.7): $\\dfrac{I}{c}\\cos^2\\theta$ for an absorber.",
      solution: "$\\dfrac{I}{c} = \\dfrac{1200}{3\\times10^8} = 4\\times10^{-6}$ Pa.\n\n$P = 4\\times10^{-6}\\times\\cos^260^\\circ = 4\\times10^{-6}\\times\\tfrac14 = 1\\times10^{-6}$ Pa $= 1\\ \\mu$Pa.",
      commonMistakes: [
        { answer: 2, feedback: "That has only one factor of $\\cos\\theta$. Both the spread of the beam and the normal component of momentum contribute one each." },
        { answer: 4, feedback: "That is the value at normal incidence." },
        { answer: 3, feedback: "That uses $\\sin^2\\theta$. The angle is measured from the normal, so it is $\\cos^2\\theta$." },
      ],
    },
    {
      type: "quiz",
      id: "em6-8-q12",
      variant: "mastery",
      multiple: true,
      question: "Which statements about the electromagnetic spectrum are true? Select all that apply.",
      options: [
        { text: "All bands travel at the same speed in vacuum.", correct: true, feedback: "$c$ does not depend on frequency." },
        { text: "X-rays and gamma rays can overlap in wavelength; they are named by their source.", correct: true, feedback: "X-rays come from electrons, gamma rays from nuclei." },
        { text: "A 3 GHz wave is a microwave of wavelength 10 cm.", correct: true, feedback: "$\\lambda = c/f = 0.1$ m." },
        { text: "Infrared photons are more energetic than ultraviolet photons.", feedback: "Photon energy rises with frequency, and UV has the higher frequency." },
        { text: "Radio waves are produced by nuclear transitions.", feedback: "They come from accelerated electrons in aerials; nuclear transitions give gamma rays." },
      ],
      hint: "The spectrum table in lesson 6.7.",
    },
    {
      type: "quiz",
      id: "em6-8-q13",
      variant: "mastery",
      question: "(JEE Advanced style) A compass needle oscillates with period 3 s in the Earth's horizontal field of $30\\ \\mu$T. A strong magnet is placed so that it adds a uniform field of $120\\ \\mu$T **opposite** to $B_H$. What happens?",
      options: [
        { text: "The needle stays pointing north and oscillates with period 1.5 s.", feedback: "The net field now points south, so north is the unstable direction." },
        { text: "The needle turns round to point south and oscillates with period $\\sqrt3 \\approx 1.73$ s.", correct: true, feedback: "Net field $90\\ \\mu$T southwards; the needle settles along it and $T' = 3\\sqrt{30/90} = \\sqrt3$ s." },
        { text: "It turns round and oscillates with period about 1.34 s.", feedback: "That uses $150\\ \\mu$T, adding the fields. They are opposite, so they subtract." },
        { text: "It cannot oscillate at all, since the field is reversed.", feedback: "A reversed field just reverses the stable direction; the needle oscillates about the new one." },
      ],
      hint: "Find the net field and its direction, then use $T \\propto 1/\\sqrt B$ (lesson 6.2).",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where this leads",
      content:
        "The visible band of the spectrum is the subject of the optics course: the same waves reflecting, refracting, interfering and diffracting. There, everything this chapter proved about $\\vec E$ and $\\vec B$ quietly underlies the ray diagrams, and in modern physics the radiation pressure you calculated here reappears as the momentum $h/\\lambda$ of a single photon.",
    },
  ]),
};

export const emChapter6Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
