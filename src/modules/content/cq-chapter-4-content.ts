import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Complex Numbers & Quadratics Chapter 4 — De Moivre's Theorem and Roots of
 * Unity. Powers of a complex number as repeated rotation, the n-th roots of
 * any complex number as a regular polygon, the cube roots of unity ω with
 * their factorisations and JEE-style simplifications, and the n-th roots of
 * unity (sum, product, power sums, chord products).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "de-moivres-theorem",
  title: "4.1 · De Moivre's Theorem",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Chapter 3 ended with one picture: multiplying by $\\cos\\theta + i\\sin\\theta$ turns every point of the plane through the angle $\\theta$ and changes no lengths. So what does multiplying by it **ten times** do? Ten turns of $\\theta$ each, which is one turn of $10\\theta$. That one sentence is De Moivre's theorem, and it turns brutal expansions like $(1 + i)^{10}$ or $(\\sqrt3 + i)^{6}$ into two-line calculations.",
    },
    { type: "heading", text: "The statement" },
    {
      type: "callout",
      variant: "definition",
      title: "De Moivre's theorem",
      content:
        "For every integer $n$ and every real $\\theta$,\n\n$$(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta.$$\n\nIn Euler form this is simply $(e^{i\\theta})^n = e^{in\\theta}$. For a complex number of any modulus, $z = r(\\cos\\theta + i\\sin\\theta)$ gives $z^n = r^n(\\cos n\\theta + i\\sin n\\theta)$: the modulus is raised to the power, the angle is multiplied.",
    },
    { type: "heading", text: "Why it is true" },
    {
      type: "text",
      content:
        "**Proof by induction for $n \\ge 1$.** The case $n = 1$ is trivial. Suppose it holds for $n = k$. Then multiply once more and use the angle-addition formulas:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned}(\\cos\\theta + i\\sin\\theta)^{k+1} &= (\\cos k\\theta + i\\sin k\\theta)(\\cos\\theta + i\\sin\\theta) \\\\ &= (\\cos k\\theta\\cos\\theta - \\sin k\\theta\\sin\\theta) + i(\\sin k\\theta\\cos\\theta + \\cos k\\theta\\sin\\theta) \\\\ &= \\cos(k+1)\\theta + i\\sin(k+1)\\theta.\\end{aligned}",
    },
    {
      type: "text",
      content:
        "**Zero and negative $n$.** For $n = 0$ both sides are 1. For $n = -m$ with $m > 0$, first note $(\\cos\\theta + i\\sin\\theta)(\\cos\\theta - i\\sin\\theta) = \\cos^2\\theta + \\sin^2\\theta = 1$, so the reciprocal is $\\cos\\theta - i\\sin\\theta = \\cos(-\\theta) + i\\sin(-\\theta)$. Applying the positive case to the angle $-\\theta$:",
    },
    {
      type: "math",
      latex:
        "(\\cos\\theta + i\\sin\\theta)^{-m} = \\big(\\cos(-\\theta) + i\\sin(-\\theta)\\big)^{m} = \\cos(-m\\theta) + i\\sin(-m\\theta).",
    },
    {
      type: "callout",
      variant: "info",
      title: "Fractional powers have several values",
      content:
        "For a rational power $\\frac pq$ (lowest terms), $\\cos\\frac{p\\theta}{q} + i\\sin\\frac{p\\theta}{q}$ is **one** of the $q$ values of $(\\cos\\theta + i\\sin\\theta)^{p/q}$, not the only one. For example $1^{1/2}$ is both $1$ and $-1$. Lesson 4.2 finds all of them.",
    },
    { type: "heading", text: "Watching the powers spiral" },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "powers",
        z1: [0.9, 0.4],
        n: { min: 1, max: 12, initial: 6 },
        snap: 0.1,
        show: ["unit-circle"],
        window: { xmin: -2, xmax: 2, ymin: -2, ymax: 2 },
        caption:
          "The dots are $z, z^2, \\dots, z^n$. Each step multiplies the modulus by $r = |z|$ and adds $\\theta = \\arg z$. Drag $z$ onto the unit circle and the spiral becomes a walk around the circle.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $|z| < 1$ the powers spiral inwards, with $|z| > 1$ they spiral outwards, and with $|z| = 1$ they march round the unit circle in equal steps of $\\theta$. The readout confirms $|z^n| = r^n$ and $\\arg z^n = n\\theta$ (up to a multiple of $360^\\circ$).",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "cq4-1-we1",
      title: "Worked example 1: a tenth power",
      problem: "Evaluate $(1 + i)^{10}$.",
      steps: [
        { text: "Polar form: $|1 + i| = \\sqrt2$ and $\\arg(1 + i) = \\frac\\pi4$, so $1 + i = \\sqrt2\\,e^{i\\pi/4}$. *Why this step:* De Moivre works on polar form, so convert first, never expand ten brackets." },
        { latex: "(1 + i)^{10} = (\\sqrt2)^{10}\\,e^{i\\cdot 10\\pi/4} = 32\\,e^{i5\\pi/2}" },
        { text: "Remove whole turns: $\\frac{5\\pi}2 = 2\\pi + \\frac\\pi2$, so $e^{i5\\pi/2} = e^{i\\pi/2} = i$." },
      ],
      answer: "$(1 + i)^{10} = 32i$.",
    },
    {
      type: "worked-example",
      id: "cq4-1-we2",
      title: "Worked example 2: when is a power equal to 1?",
      problem: "Find the least positive integer $n$ for which $\\left(\\dfrac{1 + i\\sqrt3}{1 - i\\sqrt3}\\right)^{n} = 1$.",
      steps: [
        { text: "Top and bottom are conjugates of modulus 2: $1 + i\\sqrt3 = 2e^{i\\pi/3}$, $1 - i\\sqrt3 = 2e^{-i\\pi/3}$. *Why this step:* a quotient of polar forms divides moduli and subtracts angles." },
        { latex: "\\frac{1 + i\\sqrt3}{1 - i\\sqrt3} = e^{i2\\pi/3}" },
        { text: "So the $n$-th power is $e^{i2n\\pi/3}$, which equals 1 exactly when $\\frac{2n\\pi}{3}$ is a multiple of $2\\pi$, that is, when $3 \\mid n$." },
      ],
      answer: "$n = 3$ (and every multiple of 3).",
    },
    {
      type: "worked-example",
      id: "cq4-1-we3",
      title: "Worked example 3: multiple-angle formulas",
      problem: "Use De Moivre's theorem to express $\\cos 3\\theta$ in powers of $\\cos\\theta$ and $\\sin 3\\theta$ in powers of $\\sin\\theta$.",
      steps: [
        { text: "Write $c = \\cos\\theta$, $s = \\sin\\theta$. Then $\\cos 3\\theta + i\\sin 3\\theta = (c + is)^3$. Expand with the binomial theorem:" },
        { latex: "(c + is)^3 = c^3 + 3c^2(is) + 3c(is)^2 + (is)^3 = (c^3 - 3cs^2) + i(3c^2s - s^3)" },
        { text: "Compare real parts: $\\cos 3\\theta = c^3 - 3c(1 - c^2) = 4c^3 - 3c$. *Why this step:* two complex numbers are equal only when their real parts and imaginary parts are separately equal." },
        { text: "Compare imaginary parts: $\\sin 3\\theta = 3(1 - s^2)s - s^3 = 3s - 4s^3$." },
      ],
      answer: "$\\cos 3\\theta = 4\\cos^3\\theta - 3\\cos\\theta$ and $\\sin 3\\theta = 3\\sin\\theta - 4\\sin^3\\theta$.",
    },
    {
      type: "worked-example",
      id: "cq4-1-we4",
      title: "Worked example 4: the wrong-way-round form",
      problem: "Simplify $(\\sin\\theta + i\\cos\\theta)^{n}$.",
      steps: [
        { text: "This is **not** in the form $\\cos\\phi + i\\sin\\phi$: sine sits in the real slot. Rewrite with co-angles: $\\sin\\theta = \\cos\\left(\\frac\\pi2 - \\theta\\right)$ and $\\cos\\theta = \\sin\\left(\\frac\\pi2 - \\theta\\right)$. *Why this step:* De Moivre applies only once the number is in standard polar form." },
        { latex: "\\sin\\theta + i\\cos\\theta = \\cos\\left(\\tfrac\\pi2 - \\theta\\right) + i\\sin\\left(\\tfrac\\pi2 - \\theta\\right)" },
        { latex: "(\\sin\\theta + i\\cos\\theta)^n = \\cos n\\left(\\tfrac\\pi2 - \\theta\\right) + i\\sin n\\left(\\tfrac\\pi2 - \\theta\\right)" },
      ],
      answer: "$(\\sin\\theta + i\\cos\\theta)^n = \\cos\\left(\\frac{n\\pi}2 - n\\theta\\right) + i\\sin\\left(\\frac{n\\pi}2 - n\\theta\\right)$, which equals $\\sin n\\theta + i\\cos n\\theta$ only when $n \\equiv 1 \\pmod 4$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"(sin θ + i cos θ)ⁿ = sin nθ + i cos nθ\"",
      content:
        "Try $n = 2$, $\\theta = 0$: the left side is $(0 + i)^2 = -1$, the right side is $0 + i = i$. De Moivre's theorem needs **cosine in the real part, sine in the imaginary part, the same angle in both**. Always rewrite first: $\\sin\\theta + i\\cos\\theta = e^{i(\\pi/2 - \\theta)}$ and $\\cos\\theta - i\\sin\\theta = e^{-i\\theta}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"(r e^{iθ})ⁿ = r e^{inθ}\"",
      content:
        "The modulus is raised to the power too: $(2e^{i\\theta})^3 = 8e^{3i\\theta}$, not $2e^{3i\\theta}$. Forgetting $r^n$ is the commonest slip in $(1 + i)^n$ questions, where $r = \\sqrt2$ quietly becomes $2^{n/2}$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq4-1-q1",
      variant: "practice",
      question: "Evaluate $(1 + i)^8$.",
      answer: 16,
      hint: "$1 + i = \\sqrt2\\,e^{i\\pi/4}$. Raise the modulus to the 8th power and multiply the angle by 8.",
      solution: "$(1 + i)^8 = (\\sqrt2)^8 e^{i8\\pi/4} = 16e^{2\\pi i} = 16$.",
      commonMistakes: [
        { answer: 256, feedback: "You used $|1 + i| = 2$. The modulus is $\\sqrt{1^2 + 1^2} = \\sqrt2$, so $(\\sqrt2)^8 = 16$." },
        { answer: -16, feedback: "$8 \\cdot \\frac\\pi4 = 2\\pi$, a whole turn, so the angle part is $+1$, not $-1$." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-1-q2",
      variant: "practice",
      question: "Simplify $(\\cos\\theta + i\\sin\\theta)^5(\\cos\\theta - i\\sin\\theta)^3$.",
      options: [
        { text: "$\\cos 2\\theta + i\\sin 2\\theta$", correct: true, feedback: "$e^{5i\\theta}\\cdot e^{-3i\\theta} = e^{2i\\theta}$." },
        { text: "$\\cos 8\\theta + i\\sin 8\\theta$", feedback: "That treats $\\cos\\theta - i\\sin\\theta$ as $e^{i\\theta}$. It is $e^{-i\\theta}$, so the angles subtract." },
        { text: "$\\cos 15\\theta + i\\sin 15\\theta$", feedback: "Powers of a product add their exponents: $5 + (-3)$, not $5 \\times 3$." },
        { text: "$1$", feedback: "That would need equal powers on both factors." },
      ],
      hint: "Write $\\cos\\theta - i\\sin\\theta = e^{-i\\theta}$ and add the exponents.",
    },
    {
      type: "numeric",
      id: "cq4-1-q3",
      variant: "practice",
      question: "$(\\sqrt3 + i)^6$ is a real number. What is it?",
      answer: -64,
      hint: "$\\sqrt3 + i = 2e^{i\\pi/6}$.",
      solution: "$(\\sqrt3 + i)^6 = 2^6 e^{i\\pi} = -64$.",
      commonMistakes: [
        { answer: 64, feedback: "The angle is $6 \\cdot \\frac\\pi6 = \\pi$, and $e^{i\\pi} = -1$." },
        { answer: -8, feedback: "The modulus is raised to the 6th power: $2^6 = 64$." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-1-q4",
      variant: "practice",
      question: "What is $(1 - i)^6$?",
      options: [
        { text: "$8i$", correct: true, feedback: "$1 - i = \\sqrt2 e^{-i\\pi/4}$, so the sixth power is $8e^{-3\\pi i/2} = 8i$. Check: $(1 - i)^2 = -2i$ and $(-2i)^3 = 8i$." },
        { text: "$-8i$", feedback: "$e^{-3\\pi i/2}$ is $+i$ (a three-quarter turn clockwise lands on the positive imaginary axis)." },
        { text: "$-8$", feedback: "The angle $-\\frac{3\\pi}2$ points along the imaginary axis, so the answer is purely imaginary." },
        { text: "$64i$", feedback: "$|1 - i| = \\sqrt2$, and $(\\sqrt2)^6 = 8$." },
      ],
      hint: "Either use polar form $\\sqrt2\\,e^{-i\\pi/4}$, or square first: $(1 - i)^2 = -2i$.",
    },
    {
      type: "quiz",
      id: "cq4-1-q5",
      variant: "concept",
      multiple: true,
      question: "Which of these hold for **every** real $\\theta$ and every positive integer $n$? Select all that apply.",
      options: [
        { text: "$(\\cos\\theta - i\\sin\\theta)^n = \\cos n\\theta - i\\sin n\\theta$", correct: true, feedback: "$\\cos\\theta - i\\sin\\theta = e^{-i\\theta}$, so the $n$-th power is $e^{-in\\theta}$." },
        { text: "$(\\cos\\theta + i\\sin\\theta)^{-n} = \\cos n\\theta - i\\sin n\\theta$", correct: true, feedback: "De Moivre holds for negative integers: $e^{-in\\theta}$." },
        { text: "$(\\sin\\theta + i\\cos\\theta)^n = \\sin n\\theta + i\\cos n\\theta$", feedback: "False in general (try $n = 2$, $\\theta = 0$). The left side is $e^{in(\\pi/2 - \\theta)}$." },
        { text: "$\\big(2(\\cos\\theta + i\\sin\\theta)\\big)^n = 2(\\cos n\\theta + i\\sin n\\theta)$", feedback: "The modulus gets the power too: $2^n$, not $2$." },
      ],
      hint: "Rewrite each base as $re^{i\\phi}$ first, then raise to the power.",
    },
    {
      type: "numeric",
      id: "cq4-1-q6",
      variant: "practice",
      question: "Find the least positive integer $n$ such that $\\left(\\dfrac{1 + i}{1 - i}\\right)^{n} = 1$.",
      answer: 4,
      hint: "Simplify the fraction first (multiply top and bottom by $1 + i$).",
      solution: "$\\dfrac{1 + i}{1 - i} = \\dfrac{(1 + i)^2}{2} = \\dfrac{2i}{2} = i$, and $i^n = 1$ first when $n = 4$.",
      commonMistakes: [
        { answer: 2, feedback: "$i^2 = -1$, not 1." },
        { answer: 8, feedback: "8 works, but 4 is smaller: $i^4 = 1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-1-q7",
      variant: "practice",
      question: "Find the least positive integer $n$ for which $(1 + i\\sqrt3)^{n}$ is a real number.",
      answer: 3,
      hint: "$\\arg(1 + i\\sqrt3) = \\frac\\pi3$. A complex number is real when its argument is a multiple of $\\pi$.",
      solution: "$(1 + i\\sqrt3)^n = 2^n e^{in\\pi/3}$ is real when $\\frac{n\\pi}3$ is a multiple of $\\pi$, first at $n = 3$, where it equals $-8$.",
      commonMistakes: [
        { answer: 6, feedback: "At $n = 6$ the value is $+64$, but it is already real (equal to $-8$) at $n = 3$. Real includes negative." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-1-q8",
      variant: "practice",
      question: "Which expression equals $\\cos 3\\theta$?",
      options: [
        { text: "$4\\cos^3\\theta - 3\\cos\\theta$", correct: true, feedback: "Real part of $(\\cos\\theta + i\\sin\\theta)^3$, with $\\sin^2\\theta = 1 - \\cos^2\\theta$." },
        { text: "$3\\cos\\theta - 4\\cos^3\\theta$", feedback: "Sign flipped. That pattern belongs to $\\sin 3\\theta = 3\\sin\\theta - 4\\sin^3\\theta$." },
        { text: "$\\cos^3\\theta - 3\\cos\\theta\\sin^2\\theta + \\sin^3\\theta$", feedback: "The real part of $(c + is)^3$ has no $s^3$ term: $(is)^3 = -is^3$ is imaginary." },
        { text: "$3\\cos\\theta$", feedback: "$\\cos$ is not linear: $\\cos 3\\theta \\ne 3\\cos\\theta$ (try $\\theta = 0$)." },
      ],
      hint: "Expand $(c + is)^3$ and keep only the real terms.",
    },
    {
      type: "numeric",
      id: "cq4-1-q9",
      variant: "practice",
      question: "If $\\sin\\theta = \\frac13$, find $\\sin 3\\theta$. (A fraction such as 5/9 is fine.)",
      answer: 23 / 27,
      tolerance: 0.001,
      hint: "Use $\\sin 3\\theta = 3\\sin\\theta - 4\\sin^3\\theta$, from the imaginary part of $(\\cos\\theta + i\\sin\\theta)^3$.",
      solution: "$\\sin 3\\theta = 3\\cdot\\frac13 - 4\\cdot\\frac1{27} = 1 - \\frac4{27} = \\frac{23}{27}$.",
      commonMistakes: [
        { answer: 1, feedback: "That is $3\\sin\\theta$ alone. Subtract $4\\sin^3\\theta = \\frac4{27}$." },
        { answer: 31 / 27, feedback: "The cubic term is subtracted: $3s - 4s^3$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-1-q10",
      variant: "concept",
      question: "Find the real part of $\\left(\\cos\\frac\\pi9 + i\\sin\\frac\\pi9\\right)^{-3}$.",
      answer: 0.5,
      tolerance: 0.001,
      hint: "De Moivre holds for negative integers: the angle becomes $-3 \\cdot \\frac\\pi9$.",
      solution: "The power is $\\cos\\left(-\\frac\\pi3\\right) + i\\sin\\left(-\\frac\\pi3\\right) = \\frac12 - \\frac{\\sqrt3}2 i$. Its real part is $\\frac12$.",
      commonMistakes: [
        { answer: -0.5, feedback: "Cosine is even: $\\cos(-\\frac\\pi3) = +\\frac12$." },
        { answer: 2, feedback: "The modulus is 1, so the power has modulus 1. You may have inverted $\\frac12$." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-1-q11",
      variant: "practice",
      question: "JEE Main. Let $z = \\left(\\frac{\\sqrt3}{2} + \\frac i2\\right)^5 + \\left(\\frac{\\sqrt3}{2} - \\frac i2\\right)^5$. Which statement is true?",
      options: [
        { text: "$\\mathrm{Re}(z) < 0$ and $\\mathrm{Im}(z) = 0$", correct: true, feedback: "The two terms are conjugates, so $z = 2\\cos\\frac{5\\pi}6 = -\\sqrt3$." },
        { text: "$\\mathrm{Re}(z) > 0$ and $\\mathrm{Im}(z) = 0$", feedback: "$\\cos\\frac{5\\pi}6$ is negative: $\\frac{5\\pi}6$ is in the second quadrant." },
        { text: "$\\mathrm{Re}(z) = 0$", feedback: "A sum of a number and its conjugate is $2\\,\\mathrm{Re}$, which is real and here nonzero." },
        { text: "$\\mathrm{Im}(z) > 0$", feedback: "The imaginary parts of conjugates cancel exactly." },
      ],
      hint: "The two bases are $e^{i\\pi/6}$ and $e^{-i\\pi/6}$. What is $w + \\bar w$?",
    },
    {
      type: "quiz",
      id: "cq4-1-q12",
      variant: "practice",
      question: "JEE Main. For a positive integer $n$, $\\left(\\dfrac{1 + \\sin\\theta + i\\cos\\theta}{1 + \\sin\\theta - i\\cos\\theta}\\right)^{n}$ equals",
      options: [
        { text: "$\\cos\\left(\\frac{n\\pi}2 - n\\theta\\right) + i\\sin\\left(\\frac{n\\pi}2 - n\\theta\\right)$", correct: true, feedback: "With $\\phi = \\frac\\pi2 - \\theta$ the fraction is $\\frac{1 + \\cos\\phi + i\\sin\\phi}{1 + \\cos\\phi - i\\sin\\phi} = \\frac{e^{i\\phi/2}}{e^{-i\\phi/2}} = e^{i\\phi}$." },
        { text: "$\\cos n\\theta + i\\sin n\\theta$", feedback: "Test $\\theta = \\frac\\pi2$: the fraction is 1, but $\\cos\\frac{n\\pi}2 + i\\sin\\frac{n\\pi}2$ need not be." },
        { text: "$\\cos\\left(\\frac{n\\pi}2 + n\\theta\\right) + i\\sin\\left(\\frac{n\\pi}2 + n\\theta\\right)$", feedback: "Sign error: $\\sin\\theta = \\cos(\\frac\\pi2 - \\theta)$, so the angle is $\\frac\\pi2 - \\theta$." },
        { text: "$1$", feedback: "Only for special $\\theta$. In general the fraction has modulus 1 but a nonzero angle." },
      ],
      hint: "Put $\\phi = \\frac\\pi2 - \\theta$ and use the half-angle forms $1 + \\cos\\phi = 2\\cos^2\\frac\\phi2$, $\\sin\\phi = 2\\sin\\frac\\phi2\\cos\\frac\\phi2$.",
    },
    {
      type: "numeric",
      id: "cq4-1-q13",
      variant: "practice",
      question: "JEE Advanced style. For how many integers $n$ with $1 \\le n \\le 100$ is $(\\sqrt3 + i)^{n}$ a real number?",
      answer: 16,
      hint: "$(\\sqrt3 + i)^n = 2^n e^{in\\pi/6}$. When is $\\frac{n\\pi}6$ a multiple of $\\pi$?",
      solution: "Real exactly when $\\frac{n\\pi}6 = k\\pi$, i.e. $6 \\mid n$. The multiples of 6 up to 100 are $6, 12, \\dots, 96$: there are $\\lfloor 100/6 \\rfloor = 16$ of them.",
      commonMistakes: [
        { answer: 8, feedback: "That counts multiples of 12 (where the value is positive). Negative reals count too." },
        { answer: 33, feedback: "That counts multiples of 3, where $\\frac{n\\pi}6$ is a multiple of $\\frac\\pi2$, which includes purely imaginary values." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-n-th-roots-of-a-complex-number",
  title: "4.2 · The n-th Roots of a Complex Number",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "The equation $z^3 = 8$ has an obvious solution, $z = 2$. But a cubic equation has three roots (counted with multiplicity), and $z^3 - 8$ has no repeated factor. So where are the other two? De Moivre's theorem run backwards answers this for every equation $z^n = w$, and the answer is a picture: the roots sit at the corners of a regular polygon.",
    },
    { type: "heading", text: "Solving the equation in polar form" },
    {
      type: "text",
      content:
        "Write the given number as $w = \\rho e^{i\\varphi}$ ($\\rho > 0$) and the unknown as $z = re^{i\\theta}$. Then $z^n = r^n e^{in\\theta}$, and two complex numbers in polar form are equal when their moduli are equal and their angles differ by a whole number of turns:",
    },
    {
      type: "math",
      latex: "r^n = \\rho \\quad\\text{and}\\quad n\\theta = \\varphi + 2k\\pi \\ (k \\in \\mathbb Z) \\qquad\\Longrightarrow\\qquad r = \\rho^{1/n},\\quad \\theta = \\frac{\\varphi + 2k\\pi}{n}.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The n-th roots of w",
      content:
        "For $w = \\rho e^{i\\varphi} \\ne 0$, the equation $z^n = w$ has exactly $n$ distinct roots\n\n$$z_k = \\rho^{1/n}\\, e^{i(\\varphi + 2k\\pi)/n}, \\qquad k = 0, 1, \\dots, n - 1.$$\n\nHere $\\rho^{1/n}$ is the ordinary positive real root.",
    },
    {
      type: "text",
      content:
        "Why only $n$ of them? Replacing $k$ by $k + n$ adds $\\frac{2n\\pi}{n} = 2\\pi$ to the angle, a whole turn, so $k = n$ gives back $z_0$, $k = n + 1$ gives $z_1$, and so on. The values $k = 0, \\dots, n - 1$ give $n$ different angles in $[0, 2\\pi)$ after the shift $\\frac\\varphi n$, so they are genuinely different numbers.",
    },
    { type: "heading", text: "The picture: a regular polygon" },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "roots",
        z1: [0, 4],
        n: { min: 2, max: 8, initial: 3 },
        snap: 0.5,
        show: ["polygon", "unit-circle"],
        window: { xmin: -5, xmax: 5, ymin: -5, ymax: 5 },
        caption:
          "The roots of $z^n = w$ all have modulus $|w|^{1/n}$ and are spaced $\\frac{2\\pi}{n}$ apart. Drag $w$ and change $n$: the polygon turns and resizes but stays regular, and the sum of the roots stays 0.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: every root lies on one circle centred at 0 with radius $|w|^{1/n}$, consecutive roots are $\\frac{360^\\circ}{n}$ apart, so they form a regular $n$-gon. Turning $w$ through an angle $\\alpha$ turns the whole polygon through only $\\frac\\alpha n$. The readout shows the sum of the roots is always 0 and the product is $(-1)^{n-1}w$.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "cq4-2-we1",
      title: "Worked example 1: fourth roots of a negative number",
      problem: "Solve $z^4 = -16$.",
      steps: [
        { text: "Polar form of the right side: $-16 = 16e^{i\\pi}$. *Why this step:* the argument $\\pi$ is what spreads the roots around the circle." },
        { latex: "z_k = 16^{1/4}\\, e^{i(\\pi + 2k\\pi)/4} = 2e^{i(\\pi/4 + k\\pi/2)}, \\quad k = 0, 1, 2, 3" },
        { text: "The angles are $45^\\circ, 135^\\circ, 225^\\circ, 315^\\circ$, and $2e^{i\\pi/4} = \\sqrt2 + i\\sqrt2$." },
      ],
      answer: "$z = \\pm\\sqrt2 \\pm i\\sqrt2$ (all four sign choices): a square of side $2\\sqrt2$ centred at 0.",
    },
    {
      type: "worked-example",
      id: "cq4-2-we2",
      title: "Worked example 2: cube roots of 8i",
      problem: "Find all $z$ with $z^3 = 8i$ in the form $a + ib$.",
      steps: [
        { text: "$8i = 8e^{i\\pi/2}$, so $z_k = 2e^{i(\\pi/2 + 2k\\pi)/3} = 2e^{i(\\pi/6 + 2k\\pi/3)}$." },
        { text: "$k = 0$: $2e^{i\\pi/6} = 2\\left(\\frac{\\sqrt3}2 + \\frac i2\\right) = \\sqrt3 + i$." },
        { text: "$k = 1$: angle $\\frac\\pi6 + \\frac{2\\pi}3 = \\frac{5\\pi}6$, giving $-\\sqrt3 + i$." },
        { text: "$k = 2$: angle $\\frac\\pi6 + \\frac{4\\pi}3 = \\frac{3\\pi}2$, giving $-2i$. *Why this step:* a quick check, $(-2i)^3 = -8i^3 = 8i$." },
      ],
      answer: "$z = \\sqrt3 + i,\\ -\\sqrt3 + i,\\ -2i$.",
    },
    {
      type: "worked-example",
      id: "cq4-2-we3",
      title: "Worked example 3: an awkward right-hand side",
      problem: "Solve $z^5 = 1 + i$, leaving the answers in polar form.",
      steps: [
        { text: "$1 + i = \\sqrt2\\,e^{i\\pi/4} = 2^{1/2}e^{i\\pi/4}$." },
        { text: "Modulus of each root: $(2^{1/2})^{1/5} = 2^{1/10}$. Angles: $\\frac{\\pi/4 + 2k\\pi}{5} = \\frac{\\pi}{20} + \\frac{2k\\pi}{5}$. *Why this step:* divide the argument by $n$ and add multiples of $\\frac{2\\pi}n$, nothing else changes." },
        { latex: "z_k = 2^{1/10}\\, e^{i(\\pi/20 + 2k\\pi/5)}, \\quad k = 0, 1, 2, 3, 4" },
      ],
      answer: "$z_k = 2^{1/10}e^{i(\\pi + 8k\\pi)/20}$, $k = 0, \\dots, 4$: angles $9^\\circ, 81^\\circ, 153^\\circ, 225^\\circ, 297^\\circ$.",
    },
    {
      type: "worked-example",
      id: "cq4-2-we4",
      title: "Worked example 4: a power equal to the conjugate",
      problem: "How many complex numbers satisfy $z^5 = \\bar z$?",
      steps: [
        { text: "Take moduli: $|z|^5 = |z|$, so $|z| = 0$ or $|z| = 1$. *Why this step:* the modulus equation pins the circle the roots must lie on." },
        { text: "$|z| = 0$ gives $z = 0$, which works." },
        { text: "If $|z| = 1$ then $\\bar z = \\frac1z$, so the equation becomes $z^5 = \\frac1z$, i.e. $z^6 = 1$: six roots, all of modulus 1." },
      ],
      answer: "$7$ solutions: $0$ and the six sixth roots of unity.",
    },
    { type: "heading", text: "Sum and product of the roots" },
    {
      type: "text",
      content:
        "The $n$ roots are the roots of the polynomial $z^n - w = z^n + 0\\cdot z^{n-1} + \\dots + 0\\cdot z - w$. By Vieta's relations (Lesson 1.7), for $n \\ge 2$:",
    },
    {
      type: "math",
      latex: "z_0 + z_1 + \\dots + z_{n-1} = 0, \\qquad z_0 z_1 \\cdots z_{n-1} = (-1)^{n}\\cdot(-w) = (-1)^{n-1}\\,w.",
    },
    {
      type: "text",
      content:
        "The sum being zero is also visible in the picture: the vertices of a regular polygon centred at 0 balance about 0, like equal weights at the corners of a regular plate.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Rational powers",
      content:
        "$w^{p/q}$ (lowest terms) has $q$ values: the $q$-th roots of $w^p$. So $(-8)^{1/3}$ means three numbers, $-2,\\ 1 + i\\sqrt3,\\ 1 - i\\sqrt3$, and $(-8)^{2/3}$ means the three cube roots of $64$. When a JEE question writes $\\sqrt[n]{w}$ for a non-real $w$, read it as \"the set of all $n$-th roots\" unless a principal value is specified.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"z³ = 8 has only z = 2\"",
      content:
        "2 is the only **real** cube root of 8. The equation has three complex roots, $2,\\ 2e^{2\\pi i/3},\\ 2e^{4\\pi i/3}$, which are $2,\\ -1 + i\\sqrt3,\\ -1 - i\\sqrt3$. Factorising confirms it: $z^3 - 8 = (z - 2)(z^2 + 2z + 4)$ and the quadratic has $D = 4 - 16 < 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the roots are the principal root times 1, 2, 3, …\"",
      content:
        "The roots all have the **same** modulus. They differ by **rotations** of $\\frac{2\\pi}n$, i.e. each is the previous one multiplied by $e^{2\\pi i/n}$, not by an integer.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq4-2-q1",
      variant: "concept",
      question: "How many distinct complex numbers satisfy $z^7 = 3 - 4i$?",
      answer: 7,
      hint: "$z^n = w$ with $w \\ne 0$ always has exactly $n$ distinct roots.",
      solution: "$3 - 4i \\ne 0$, so there are exactly 7 seventh roots, $5^{1/7}e^{i(\\varphi + 2k\\pi)/7}$ for $k = 0, \\dots, 6$ with $\\varphi = \\arg(3 - 4i)$.",
      commonMistakes: [
        { answer: 1, feedback: "There is exactly one real seventh root of a positive real, but $3 - 4i$ is not real, and in any case there are 7 complex roots." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-2-q2",
      variant: "practice",
      question: "The roots of $z^3 = -8$ are",
      options: [
        { text: "$-2,\\ 1 + i\\sqrt3,\\ 1 - i\\sqrt3$", correct: true, feedback: "$-8 = 8e^{i\\pi}$, so the roots are $2e^{i\\pi/3}, 2e^{i\\pi}, 2e^{i5\\pi/3}$." },
        { text: "$-2,\\ -1 + i\\sqrt3,\\ -1 - i\\sqrt3$", feedback: "Those are $-2$, $2\\omega$, $2\\omega^2$. Their cubes are $-8, 8, 8$. The non-real roots of $z^3 = -8$ are $-2\\omega$ and $-2\\omega^2$." },
        { text: "$-2$ only", feedback: "That is the only real root. A cubic has three roots." },
        { text: "$2,\\ -2,\\ 2i$", feedback: "$2^3 = 8$ and $(2i)^3 = -8i$. Neither is $-8$." },
      ],
      hint: "Write $-8 = 8e^{i\\pi}$, take modulus $2$ and angles $\\frac{\\pi + 2k\\pi}3$.",
    },
    {
      type: "numeric",
      id: "cq4-2-q3",
      variant: "practice",
      question: "Every root of $z^5 = 32i$ has the same modulus. What is it?",
      answer: 2,
      hint: "The common modulus is $|w|^{1/n}$.",
      solution: "$|32i| = 32$, and $32^{1/5} = 2$.",
      commonMistakes: [
        { answer: 32, feedback: "That is $|w|$. Each root's modulus is its fifth root." },
        { answer: 6.4, feedback: "Divide the argument by 5, not the modulus. The modulus is a fifth **root**: $32^{1/5} = 2$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-2-q4",
      variant: "practice",
      question: "What is the sum of the six roots of $z^6 = 1 + i$?",
      answer: 0,
      tolerance: 0.0001,
      hint: "Vieta: the coefficient of $z^5$ in $z^6 - (1 + i)$ is 0.",
      solution: "The sum of the roots of $z^6 + 0z^5 + \\dots - (1 + i)$ is $-\\frac{0}{1} = 0$. Geometrically, the vertices of a regular hexagon centred at 0 balance.",
      commonMistakes: [
        { answer: 1, feedback: "The sum does not depend on $w$ at all for $n \\ge 2$; it is 0." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-2-q5",
      variant: "practice",
      question: "What is the product of the four roots of $z^4 = -16$?",
      options: [
        { text: "$16$", correct: true, feedback: "$(-1)^{n-1}w = (-1)^3(-16) = 16$. Or pair conjugates: $(\\sqrt2 + i\\sqrt2)(\\sqrt2 - i\\sqrt2) = 4$, twice, giving 16." },
        { text: "$-16$", feedback: "The product is $(-1)^{n-1}w$, and with $n = 4$ the sign flips: $-(-16) = 16$." },
        { text: "$2$", feedback: "That is one root's modulus. Four roots of modulus 2 have a product of modulus $2^4 = 16$." },
        { text: "$0$", feedback: "That is the sum, not the product." },
      ],
      hint: "For $z^n - w = 0$ the product of the roots is $(-1)^n$ times the constant term $-w$.",
    },
    {
      type: "quiz",
      id: "cq4-2-q6",
      variant: "practice",
      multiple: true,
      question: "Which of these are roots of $z^4 = -16$? Select all that apply.",
      options: [
        { text: "$\\sqrt2 + i\\sqrt2$", correct: true, feedback: "$2e^{i\\pi/4}$: its fourth power is $16e^{i\\pi} = -16$." },
        { text: "$-\\sqrt2 - i\\sqrt2$", correct: true, feedback: "$2e^{i5\\pi/4}$: fourth power $16e^{5\\pi i} = -16$." },
        { text: "$-\\sqrt2 + i\\sqrt2$", correct: true, feedback: "$2e^{i3\\pi/4}$: fourth power $16e^{3\\pi i} = -16$." },
        { text: "$2i$", feedback: "$(2i)^4 = 16i^4 = 16$, not $-16$." },
        { text: "$2$", feedback: "$2^4 = 16$. A real number to an even power is never negative." },
      ],
      hint: "The roots have modulus 2 and angles $45^\\circ + k\\cdot 90^\\circ$.",
    },
    {
      type: "numeric",
      id: "cq4-2-q7",
      variant: "concept",
      question: "The roots of $z^8 = w$ (for some $w \\ne 0$) are plotted. What is the angle between two adjacent roots, in degrees?",
      answer: 45,
      unit: "degrees",
      hint: "Consecutive roots differ by a factor $e^{2\\pi i/n}$.",
      solution: "$\\frac{360^\\circ}{8} = 45^\\circ$, whatever $w$ is.",
      commonMistakes: [
        { answer: 22.5, feedback: "That is half the spacing. The angles are $\\frac{\\varphi}8 + k\\cdot\\frac{360^\\circ}8$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-2-q8",
      variant: "practice",
      question: "How many roots of $z^6 = -64$ have positive real part?",
      answer: 2,
      hint: "The roots are $2e^{i(\\pi + 2k\\pi)/6}$. List the angles.",
      solution: "Angles $30^\\circ, 90^\\circ, 150^\\circ, 210^\\circ, 270^\\circ, 330^\\circ$. Positive real part means the angle is strictly between $-90^\\circ$ and $90^\\circ$: only $30^\\circ$ and $330^\\circ$.",
      commonMistakes: [
        { answer: 3, feedback: "$90^\\circ$ gives $2i$, which has real part 0, not positive." },
        { answer: 1, feedback: "$330^\\circ$ (i.e. $-30^\\circ$) also has positive real part." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-2-q9",
      variant: "practice",
      question: "JEE Main. The roots of $z^6 = 64$ are the vertices of a polygon. Find its area (to 2 decimal places).",
      answer: 6 * Math.sqrt(3),
      tolerance: 0.01,
      hint: "Regular hexagon with circumradius $64^{1/6} = 2$: six equilateral triangles of side 2.",
      solution: "Circumradius 2, so the hexagon is six equilateral triangles of side 2, each of area $\\frac{\\sqrt3}4\\cdot 4 = \\sqrt3$. Area $= 6\\sqrt3 \\approx 10.39$.",
      commonMistakes: [
        { answer: Math.sqrt(3), feedback: "That is one of the six triangles." },
        { answer: 12, feedback: "That is the perimeter (six sides of length 2)." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-2-q10",
      variant: "practice",
      question: "JEE Advanced style. How many complex numbers $z$ satisfy $z^5 = \\bar z$?",
      answer: 7,
      hint: "Take moduli first: $|z|^5 = |z|$. Then for $|z| = 1$ use $\\bar z = \\frac1z$.",
      solution: "$|z| = 0$ or $1$. $z = 0$ works. For $|z| = 1$, $z^5 = \\frac1z$ gives $z^6 = 1$, six roots. Total $1 + 6 = 7$.",
      commonMistakes: [
        { answer: 6, feedback: "Don't forget $z = 0$: $0^5 = \\bar 0$." },
        { answer: 5, feedback: "The equation is not $z^5 = 1$. Using $\\bar z = 1/z$ on the unit circle turns it into $z^6 = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-2-q11",
      variant: "practice",
      multiple: true,
      question: "JEE Advanced (one or more correct). Let $z_0, \\dots, z_{n-1}$ be the roots of $z^n = w$, where $w \\ne 0$ and $n \\ge 3$. Which statements are true?",
      options: [
        { text: "They lie on a circle centred at the origin", correct: true, feedback: "All have modulus $|w|^{1/n}$." },
        { text: "They are the vertices of a regular $n$-gon", correct: true, feedback: "Equal modulus and equal angular spacing $\\frac{2\\pi}{n}$." },
        { text: "Their sum is 0", correct: true, feedback: "Vieta: the $z^{n-1}$ coefficient of $z^n - w$ is 0." },
        { text: "Their product is $w$", feedback: "The product is $(-1)^{n-1}w$, which is $-w$ for even $n$." },
        { text: "Exactly one of them is real", feedback: "It depends on $w$: $z^4 = 16$ has two real roots, $z^3 = i$ has none." },
      ],
      hint: "Use the formula $z_k = |w|^{1/n}e^{i(\\varphi + 2k\\pi)/n}$ and Vieta on $z^n - w$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "cube-roots-of-unity",
  title: "4.3 · Cube Roots of Unity",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Of all the root families, one appears in JEE papers more than every other: the three cube roots of 1. Two of them are non-real, and the letter $\\omega$ for one of them has become standard. A handful of facts about $\\omega$ (it cubes to 1, and $1 + \\omega + \\omega^2 = 0$) collapse expressions that look hopeless.",
    },
    { type: "heading", text: "Finding the three cube roots of 1" },
    {
      type: "text",
      content:
        "Solve $x^3 = 1$ by factorising: $x^3 - 1 = (x - 1)(x^2 + x + 1)$. The quadratic factor has $D = 1 - 4 = -3$, so",
    },
    {
      type: "math",
      latex: "x = 1, \\qquad x = \\frac{-1 + i\\sqrt3}{2}, \\qquad x = \\frac{-1 - i\\sqrt3}{2}.",
    },
    {
      type: "text",
      content:
        "In polar form the same three numbers are $e^{0}, e^{2\\pi i/3}, e^{4\\pi i/3}$: modulus 1, angles $0^\\circ, 120^\\circ, 240^\\circ$, which is exactly what Lesson 4.2's formula gives for $z^3 = 1$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "ω",
      content:
        "$\\omega = \\dfrac{-1 + i\\sqrt3}{2} = e^{2\\pi i/3}$. Then $\\omega^2 = \\dfrac{-1 - i\\sqrt3}{2} = e^{4\\pi i/3}$, and the cube roots of unity are $1, \\omega, \\omega^2$. (Either non-real root can be called $\\omega$; the other is then $\\omega^2$. Every identity below is symmetric under that swap.)",
    },
    { type: "heading", text: "The picture: an equilateral triangle" },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "roots",
        z1: [1, 0],
        n: { min: 3, max: 3, initial: 3 },
        snap: 0.5,
        show: ["polygon", "unit-circle"],
        window: { xmin: -2, xmax: 2, ymin: -2, ymax: 2 },
        caption:
          "With $w = 1$ the three roots are $1, \\omega, \\omega^2$: an equilateral triangle on the unit circle. The readout shows their sum is 0 and their product is 1. Drag $w$ to see the cube roots of other numbers: always $\\sqrt[3]{w}$ times $1, \\omega, \\omega^2$.",
      },
    },
    { type: "heading", text: "Properties of ω" },
    {
      type: "table",
      headers: ["Property", "Why"],
      rows: [
        ["$\\omega^3 = 1$", "$\\omega$ is a cube root of 1"],
        ["$1 + \\omega + \\omega^2 = 0$", "$\\omega$ is a root of $x^2 + x + 1$ (or: the sum of the roots of $x^3 - 1$ is 0)"],
        ["$|\\omega| = 1$", "$\\frac14 + \\frac34 = 1$"],
        ["$\\bar\\omega = \\omega^2 = \\frac1\\omega$", "reflection of $e^{2\\pi i/3}$ is $e^{-2\\pi i/3} = e^{4\\pi i/3}$"],
        ["$\\omega - \\omega^2 = i\\sqrt3$", "the real parts cancel"],
        ["$\\omega^{3k + r} = \\omega^r$", "$\\omega^{3k} = (\\omega^3)^k = 1$"],
        ["Cube roots of $-1$: $-1, -\\omega, -\\omega^2$", "$(-\\omega)^3 = -\\omega^3 = -1$"],
        ["Cube roots of $a$: $\\sqrt[3]a,\\ \\sqrt[3]a\\,\\omega,\\ \\sqrt[3]a\\,\\omega^2$", "multiply the real root by each cube root of 1"],
      ],
    },
    {
      type: "text",
      content:
        "The workhorse is $1 + \\omega + \\omega^2 = 0$. Read it in every direction: $1 + \\omega = -\\omega^2$, $1 + \\omega^2 = -\\omega$, $\\omega + \\omega^2 = -1$. Most JEE simplifications are one of these substitutions followed by $\\omega^3 = 1$.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "cq4-3-we1",
      title: "Worked example 1: reducing exponents",
      problem: "Simplify $\\omega^{40} + \\omega^{-40}$.",
      steps: [
        { text: "Reduce exponents modulo 3: $40 = 39 + 1$, so $\\omega^{40} = \\omega$. *Why this step:* $\\omega^{39} = (\\omega^3)^{13} = 1$." },
        { text: "$-40 = -42 + 2$, so $\\omega^{-40} = \\omega^{2}$. (Negative exponents reduce the same way: add a multiple of 3 to land in $\\{0, 1, 2\\}$.)" },
        { text: "Sum: $\\omega + \\omega^2 = -1$." },
      ],
      answer: "$\\omega^{40} + \\omega^{-40} = -1$.",
    },
    {
      type: "worked-example",
      id: "cq4-3-we2",
      title: "Worked example 2: the replace-the-pair trick",
      problem: "Evaluate $(1 + \\omega - \\omega^2)^3$ and $(1 - \\omega + \\omega^2)(1 + \\omega - \\omega^2)$.",
      steps: [
        { text: "$1 + \\omega = -\\omega^2$, so $1 + \\omega - \\omega^2 = -2\\omega^2$. *Why this step:* whenever two of $1, \\omega, \\omega^2$ appear with the same coefficient, replace their sum by minus the third." },
        { text: "Similarly $1 + \\omega^2 = -\\omega$, so $1 - \\omega + \\omega^2 = -2\\omega$." },
        { latex: "(1 + \\omega - \\omega^2)^3 = (-2\\omega^2)^3 = -8\\omega^6 = -8" },
        { latex: "(1 - \\omega + \\omega^2)(1 + \\omega - \\omega^2) = (-2\\omega)(-2\\omega^2) = 4\\omega^3 = 4" },
      ],
      answer: "$(1 + \\omega - \\omega^2)^3 = -8$ and $(1 - \\omega + \\omega^2)(1 + \\omega - \\omega^2) = 4$.",
    },
    {
      type: "worked-example",
      id: "cq4-3-we3",
      title: "Worked example 3: cube roots of other numbers",
      problem: "Solve $z^3 = 27$ and $z^3 = -1$ using $\\omega$.",
      steps: [
        { text: "$z^3 = 27$: one root is 3, and $(3\\omega)^3 = 27\\omega^3 = 27$, $(3\\omega^2)^3 = 27$. So the roots are $3, 3\\omega, 3\\omega^2$." },
        { text: "$z^3 = -1$: one root is $-1$, and $(-\\omega)^3 = -1$, $(-\\omega^2)^3 = -1$. *Why this step:* multiplying a root by a cube root of unity never changes its cube." },
        { text: "In Cartesian form $-\\omega = \\frac{1 - i\\sqrt3}2$ and $-\\omega^2 = \\frac{1 + i\\sqrt3}2$." },
      ],
      answer: "$z^3 = 27$: $3, 3\\omega, 3\\omega^2$. $z^3 = -1$: $-1, \\frac{1 \\pm i\\sqrt3}2$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"1 + ω + ω² = 3\"",
      content:
        "Each term has modulus 1, but they point in three directions $120^\\circ$ apart and cancel: $1 + \\omega + \\omega^2 = 0$. The sum $1 + \\omega^n + \\omega^{2n}$ equals 3 only when $3 \\mid n$ (all three terms become 1), and 0 otherwise.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"ω̄ = −ω\"",
      content:
        "Conjugation reflects in the real axis: $\\bar\\omega = \\frac{-1 - i\\sqrt3}2 = \\omega^2$. The number $-\\omega = \\frac{1 - i\\sqrt3}{2}$ is a reflection through the origin, and it is a cube root of $-1$, not of $1$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq4-3-q1",
      variant: "practice",
      question: "$\\omega^{2026}$ equals",
      options: [
        { text: "$\\omega$", correct: true, feedback: "$2026 = 3 \\times 675 + 1$, so $\\omega^{2026} = \\omega$." },
        { text: "$\\omega^2$", feedback: "Check the remainder: $2026 - 2025 = 1$, not 2." },
        { text: "$1$", feedback: "That needs a multiple of 3. $2026$ leaves remainder 1 on division by 3." },
        { text: "$-1$", feedback: "Powers of $\\omega$ are always $1$, $\\omega$ or $\\omega^2$; $-1$ never appears." },
      ],
      hint: "Divide the exponent by 3 and keep the remainder.",
    },
    {
      type: "numeric",
      id: "cq4-3-q2",
      variant: "practice",
      question: "Evaluate $(1 - \\omega + \\omega^2)^6$.",
      answer: 64,
      hint: "$1 + \\omega^2 = -\\omega$.",
      solution: "$1 - \\omega + \\omega^2 = -2\\omega$, so the sixth power is $64\\omega^6 = 64$.",
      commonMistakes: [
        { answer: -64, feedback: "An even power removes the minus sign: $(-2)^6 = +64$." },
        { answer: 0, feedback: "$1 - \\omega + \\omega^2$ is not $1 + \\omega + \\omega^2$: the middle sign is minus." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-3-q3",
      variant: "practice",
      question: "Evaluate $1 + \\omega^{2025} + \\omega^{4050}$.",
      answer: 3,
      hint: "Are the exponents multiples of 3?",
      solution: "$2025 = 3 \\times 675$ and $4050 = 3 \\times 1350$, so both powers are 1 and the sum is $3$.",
      commonMistakes: [
        { answer: 0, feedback: "$1 + \\omega^n + \\omega^{2n} = 0$ only when $3 \\nmid n$. Here $3 \\mid 2025$." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-3-q4",
      variant: "concept",
      question: "Which number equals $\\bar\\omega$?",
      options: [
        { text: "$\\omega^2$", correct: true, feedback: "Reflection of $e^{2\\pi i/3}$ in the real axis is $e^{-2\\pi i/3} = e^{4\\pi i/3} = \\omega^2$." },
        { text: "$-\\omega$", feedback: "$-\\omega = \\frac{1 - i\\sqrt3}2$ has positive real part; $\\bar\\omega$ has real part $-\\frac12$." },
        { text: "$\\dfrac1{\\omega^2}$", feedback: "$\\frac1{\\omega^2} = \\omega$, not $\\bar\\omega$." },
        { text: "$\\omega$", feedback: "$\\omega$ is not real, so it differs from its conjugate." },
      ],
      hint: "For $|z| = 1$, $\\bar z = \\frac1z$.",
    },
    {
      type: "quiz",
      id: "cq4-3-q5",
      variant: "concept",
      multiple: true,
      question: "Which of these are true? Select all that apply.",
      options: [
        { text: "$\\omega^2 + \\omega + 1 = 0$", correct: true, feedback: "$\\omega$ is a root of $x^2 + x + 1$." },
        { text: "$|\\omega| = 1$", correct: true, feedback: "$\\left(-\\frac12\\right)^2 + \\left(\\frac{\\sqrt3}2\\right)^2 = 1$." },
        { text: "$\\omega - \\omega^2 = i\\sqrt3$", correct: true, feedback: "The real parts $-\\frac12$ cancel and the imaginary parts give $\\frac{\\sqrt3}2 + \\frac{\\sqrt3}2$." },
        { text: "$\\omega^2 = -\\omega$", feedback: "$\\omega^2 = -1 - \\omega$, not $-\\omega$." },
        { text: "$\\omega$ is a cube root of $-1$", feedback: "$\\omega^3 = +1$. The non-real cube roots of $-1$ are $-\\omega, -\\omega^2$." },
      ],
      hint: "Use $\\omega = \\frac{-1 + i\\sqrt3}2$ directly for anything you are unsure of.",
    },
    {
      type: "numeric",
      id: "cq4-3-q6",
      variant: "practice",
      question: "Evaluate $(1 + \\omega)(1 + \\omega^2)(1 + \\omega^4)(1 + \\omega^8)$.",
      answer: 1,
      hint: "$\\omega^4 = \\omega$ and $\\omega^8 = \\omega^2$. What is $(1 + \\omega)(1 + \\omega^2)$?",
      solution: "$(1 + \\omega)(1 + \\omega^2) = 1 + \\omega + \\omega^2 + \\omega^3 = 0 + 1 = 1$. The other pair is the same pair again, so the product is $1 \\cdot 1 = 1$.",
      commonMistakes: [
        { answer: 0, feedback: "$(1 + \\omega)(1 + \\omega^2)$ includes the term $\\omega^3 = 1$." },
        { answer: 16, feedback: "That is $2^4$, as if $\\omega = 1$. $\\omega$ is the non-real root." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-3-q7",
      variant: "practice",
      question: "The cube roots of $-8$ are",
      options: [
        { text: "$-2,\\ -2\\omega,\\ -2\\omega^2$", correct: true, feedback: "$(-2\\omega)^3 = -8\\omega^3 = -8$." },
        { text: "$-2,\\ 2\\omega,\\ 2\\omega^2$", feedback: "$(2\\omega)^3 = 8$, not $-8$." },
        { text: "$2,\\ 2\\omega,\\ 2\\omega^2$", feedback: "Those are the cube roots of $+8$." },
        { text: "$-2$ only", feedback: "Every nonzero number has three cube roots." },
      ],
      hint: "Take one real cube root and multiply it by $1, \\omega, \\omega^2$.",
    },
    {
      type: "numeric",
      id: "cq4-3-q8",
      variant: "practice",
      question: "Evaluate $(1 - \\omega)(1 - \\omega^2)$.",
      answer: 3,
      hint: "Expand and use $\\omega + \\omega^2 = -1$, $\\omega^3 = 1$.",
      solution: "$1 - \\omega - \\omega^2 + \\omega^3 = 1 - (\\omega + \\omega^2) + 1 = 1 + 1 + 1 = 3$. (Lesson 4.5 shows this is the $n = 3$ case of $\\prod(1 - \\alpha^k) = n$.)",
      commonMistakes: [
        { answer: 1, feedback: "That is $(1 + \\omega)(1 + \\omega^2)$. With minus signs the middle terms become $+1$." },
        { answer: 0, feedback: "Neither factor is 0, since $\\omega \\ne 1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-3-q9",
      variant: "practice",
      question: "Evaluate $(3 + 5\\omega + 3\\omega^2)^2 + (3 + 3\\omega + 5\\omega^2)^2$.",
      answer: -4,
      hint: "Split off $3(1 + \\omega + \\omega^2)$ from each bracket.",
      solution: "$3 + 5\\omega + 3\\omega^2 = 3(1 + \\omega + \\omega^2) + 2\\omega = 2\\omega$, and similarly the second bracket is $2\\omega^2$. The sum is $4\\omega^2 + 4\\omega^4 = 4(\\omega^2 + \\omega) = -4$.",
      commonMistakes: [
        { answer: 4, feedback: "$\\omega^2 + \\omega = -1$, so the sum is $-4$." },
        { answer: 8, feedback: "$4\\omega^2 + 4\\omega^4$ is not $4 + 4$: $\\omega^4 = \\omega$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-3-q10",
      variant: "practice",
      question: "JEE Main. If $\\alpha$ and $\\beta$ are the roots of $x^2 + x + 1 = 0$, find $\\alpha^{19} + \\beta^{7}$.",
      answer: -1,
      hint: "The roots are $\\omega$ and $\\omega^2$. Reduce the exponents modulo 3.",
      solution: "Take $\\alpha = \\omega$, $\\beta = \\omega^2$. Then $\\alpha^{19} = \\omega^{19} = \\omega$ and $\\beta^7 = \\omega^{14} = \\omega^2$. Sum $= \\omega + \\omega^2 = -1$. (Swapping $\\alpha$ and $\\beta$ gives $\\omega^{38} + \\omega^7 = \\omega^2 + \\omega$, the same.)",
      commonMistakes: [
        { answer: 2, feedback: "That treats both powers as 1. Neither 19 nor 14 is a multiple of 3." },
        { answer: 0, feedback: "$\\omega + \\omega^2 = -1$; the 0 comes only with the extra $+1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-3-q11",
      variant: "practice",
      question: "JEE Main. Evaluate $(1 - \\omega + \\omega^2)^5 + (1 + \\omega - \\omega^2)^5$.",
      answer: 32,
      hint: "Each bracket is $-2$ times a power of $\\omega$.",
      solution: "$(-2\\omega)^5 + (-2\\omega^2)^5 = -32(\\omega^5 + \\omega^{10}) = -32(\\omega^2 + \\omega) = 32$.",
      commonMistakes: [
        { answer: -32, feedback: "$-32(\\omega^2 + \\omega) = -32 \\times (-1) = +32$." },
        { answer: 64, feedback: "$(-2)^5 = -32$, and the two terms together contribute $\\omega^2 + \\omega = -1$, not 2." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-3-q12",
      variant: "practice",
      multiple: true,
      question: "JEE Advanced (one or more correct). Which of these equal 0?",
      options: [
        { text: "$1 + \\omega^{100} + \\omega^{200}$", correct: true, feedback: "$\\omega^{100} = \\omega$, $\\omega^{200} = \\omega^2$: the sum is $1 + \\omega + \\omega^2 = 0$." },
        { text: "$(1 + \\omega)^3 + 1$", correct: true, feedback: "$1 + \\omega = -\\omega^2$, so $(1 + \\omega)^3 = -\\omega^6 = -1$." },
        { text: "$\\omega^2 - \\bar\\omega$", correct: true, feedback: "$\\bar\\omega = \\omega^2$." },
        { text: "$1 + \\omega^3 + \\omega^6$", feedback: "All three terms are 1: the sum is 3." },
        { text: "$\\omega - \\omega^2$", feedback: "That is $i\\sqrt3$." },
      ],
      hint: "Reduce every exponent mod 3 and use $1 + \\omega = -\\omega^2$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "factorisations-and-simplifications-with-omega",
  title: "4.4 · Factorisations and Simplifications with ω",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Over the reals, $a^3 + b^3 = (a + b)(a^2 - ab + b^2)$ and the second factor refuses to split. Over the complex numbers it does split, and the cube roots of unity are exactly the numbers needed. The same idea gives the two most famous three-variable identities in algebra, both of which JEE tests repeatedly.",
    },
    { type: "heading", text: "Splitting quadratic factors with ω" },
    {
      type: "text",
      content:
        "The roots of $x^2 + x + 1$ are $\\omega$ and $\\omega^2$, so $x^2 + x + 1 = (x - \\omega)(x - \\omega^2)$. Every factorisation below comes from this one by substituting $x = \\pm\\frac ab$ and clearing denominators:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} x^3 - 1 &= (x - 1)(x - \\omega)(x - \\omega^2) & x^3 + 1 &= (x + 1)(x + \\omega)(x + \\omega^2) \\\\ a^2 + ab + b^2 &= (a - b\\omega)(a - b\\omega^2) & a^2 - ab + b^2 &= (a + b\\omega)(a + b\\omega^2) \\\\ a^3 - b^3 &= (a - b)(a - b\\omega)(a - b\\omega^2) & a^3 + b^3 &= (a + b)(a + b\\omega)(a + b\\omega^2) \\end{aligned}",
    },
    {
      type: "text",
      content:
        "To check any one of them, expand the conjugate pair: $(a + b\\omega)(a + b\\omega^2) = a^2 + ab(\\omega + \\omega^2) + b^2\\omega^3 = a^2 - ab + b^2$.",
    },
    { type: "heading", text: "The two famous identities" },
    {
      type: "text",
      content:
        "Now take three letters. Expand $(a + b\\omega + c\\omega^2)(a + b\\omega^2 + c\\omega)$ term by term. The squares pick up $\\omega^3 = 1$, and every cross term picks up $\\omega + \\omega^2 = -1$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned}(a + b\\omega + c\\omega^2)(a + b\\omega^2 + c\\omega) &= a^2 + b^2\\omega^3 + c^2\\omega^3 + ab(\\omega^2 + \\omega) + ac(\\omega + \\omega^2) + bc(\\omega^4 + \\omega^2) \\\\ &= a^2 + b^2 + c^2 - ab - bc - ca.\\end{aligned}",
    },
    {
      type: "text",
      content:
        "Multiply both sides by $a + b + c$ and use the real identity $a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The ω factorisations",
      content:
        "$$a^2 + b^2 + c^2 - ab - bc - ca = (a + b\\omega + c\\omega^2)(a + b\\omega^2 + c\\omega)$$\n\n$$a^3 + b^3 + c^3 - 3abc = (a + b + c)(a + b\\omega + c\\omega^2)(a + b\\omega^2 + c\\omega)$$\n\nFor **real** $a, b, c$ the two ω-factors are conjugates, so $|a + b\\omega + c\\omega^2|^2 = a^2 + b^2 + c^2 - ab - bc - ca = \\frac12\\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right]$.",
    },
    {
      type: "text",
      content:
        "Two consequences JEE uses constantly: if $a + b + c = 0$ then $a^3 + b^3 + c^3 = 3abc$, and $a^3 + b^3 + c^3 = 3abc$ forces **either** $a + b + c = 0$ **or** $a = b = c$ (for real numbers).",
    },
    { type: "heading", text: "Multiplying by ω is a 120° turn" },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "product",
        z1: [2, 1],
        z2: [-0.5, 0.866],
        draggable: ["z1"],
        snap: 0.5,
        show: ["unit-circle"],
        window: { xmin: -4, xmax: 4, ymin: -4, ymax: 4 },
        caption:
          "Here $z_2 = \\omega$ is fixed. Drag $z_1$: the product $\\omega z_1$ always has the same modulus as $z_1$ and is turned $120^\\circ$ further round. That is why $a, a\\omega, a\\omega^2$ are always the corners of an equilateral triangle.",
      },
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "cq4-4-we1",
      title: "Worked example 1: a cyclic ratio",
      problem: "Simplify $\\dfrac{a + b\\omega + c\\omega^2}{c + a\\omega + b\\omega^2}$ (assume the denominator is nonzero).",
      steps: [
        { text: "Look for a power of $\\omega$ that turns the denominator into the numerator. Factor $\\omega$ out of the denominator: *Why this step:* the letters are shifted cyclically, which is what multiplying by a power of $\\omega$ does to the coefficients." },
        { latex: "c + a\\omega + b\\omega^2 = \\omega\\left(c\\omega^{-1} + a + b\\omega\\right) = \\omega\\left(a + b\\omega + c\\omega^2\\right)" },
        { text: "using $\\omega^{-1} = \\omega^2$. So the ratio is $\\frac1\\omega = \\omega^2$." },
      ],
      answer: "$\\dfrac{a + b\\omega + c\\omega^2}{c + a\\omega + b\\omega^2} = \\omega^2$.",
    },
    {
      type: "worked-example",
      id: "cq4-4-we2",
      title: "Worked example 2: divisibility by x² + x + 1",
      problem: "Show that $x^{3m} + x^{3n+1} + x^{3p+2}$ is divisible by $x^2 + x + 1$ for all non-negative integers $m, n, p$.",
      steps: [
        { text: "$x^2 + x + 1 = (x - \\omega)(x - \\omega^2)$, with distinct roots. A polynomial is divisible by it exactly when both $\\omega$ and $\\omega^2$ are roots. *Why this step:* the factor theorem turns a divisibility question into two substitutions." },
        { latex: "\\omega^{3m} + \\omega^{3n+1} + \\omega^{3p+2} = 1 + \\omega + \\omega^2 = 0" },
        { latex: "(\\omega^2)^{3m} + (\\omega^2)^{3n+1} + (\\omega^2)^{3p+2} = 1 + \\omega^2 + \\omega^4 = 1 + \\omega^2 + \\omega = 0" },
      ],
      answer: "Both roots of $x^2 + x + 1$ are roots of the polynomial, so it is divisible by $x^2 + x + 1$.",
    },
    {
      type: "worked-example",
      id: "cq4-4-we3",
      title: "Worked example 3: the x, y, z substitution",
      problem: "Let $x = a + b$, $y = a\\omega + b\\omega^2$, $z = a\\omega^2 + b\\omega$. Find $x + y + z$, $xyz$ and $x^2 + y^2 + z^2$ in terms of $a, b$.",
      steps: [
        { text: "$x + y + z = a(1 + \\omega + \\omega^2) + b(1 + \\omega^2 + \\omega) = 0$." },
        { text: "$yz = (a\\omega + b\\omega^2)(a\\omega^2 + b\\omega) = a^2\\omega^3 + ab\\omega^2 + ab\\omega^4 + b^2\\omega^3 = a^2 - ab + b^2$. *Why this step:* this is the conjugate pair from the start of the lesson." },
        { text: "So $xyz = (a + b)(a^2 - ab + b^2) = a^3 + b^3$." },
        { text: "Squares: $x^2 + y^2 + z^2 = a^2(1 + \\omega^2 + \\omega^4) + b^2(1 + \\omega^4 + \\omega^2) + 2ab(1 + \\omega^3 + \\omega^3) = 0 + 0 + 6ab$." },
      ],
      answer: "$x + y + z = 0$, $xyz = a^3 + b^3$, $x^2 + y^2 + z^2 = 6ab$ (and so $x^3 + y^3 + z^3 = 3xyz = 3(a^3 + b^3)$).",
    },
    {
      type: "worked-example",
      id: "cq4-4-we4",
      title: "Worked example 4: powers of 1 + ω",
      problem: "Write $(1 + \\omega)^7$ in the form $A + B\\omega$ with $A, B$ real.",
      steps: [
        { text: "$1 + \\omega = -\\omega^2$. *Why this step:* a sum of two of the three roots is minus the third, which is a single power that De Moivre-style rules handle." },
        { latex: "(1 + \\omega)^7 = (-\\omega^2)^7 = -\\omega^{14} = -\\omega^2" },
        { text: "Finally $-\\omega^2 = 1 + \\omega$ (from $1 + \\omega + \\omega^2 = 0$)." },
      ],
      answer: "$(1 + \\omega)^7 = 1 + \\omega$, so $A = 1$, $B = 1$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"ω² = −ω\"",
      content:
        "From $1 + \\omega + \\omega^2 = 0$ you get $\\omega^2 = -1 - \\omega$, not $-\\omega$. Dropping the $-1$ is the commonest slip in $\\omega$ simplifications. If in doubt, substitute $\\omega = \\frac{-1 + i\\sqrt3}2$ and check numerically.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a³ + b³ + c³ = 3abc means a = b = c\"",
      content:
        "The factorisation shows a second way: $a + b + c = 0$. For example $1 + 8 - 27 = -18 = 3(1)(2)(-3)$ with $a, b, c = 1, 2, -3$, which are not equal. (For real numbers these two are the only ways, since the ω-factors vanish only when $a = b = c$.)",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "cq4-4-q1",
      variant: "practice",
      question: "$x^2 - x + 1$ factorises as",
      options: [
        { text: "$(x + \\omega)(x + \\omega^2)$", correct: true, feedback: "$x^2 + x(\\omega + \\omega^2) + \\omega^3 = x^2 - x + 1$." },
        { text: "$(x - \\omega)(x - \\omega^2)$", feedback: "That gives $x^2 + x + 1$." },
        { text: "$(x - 1)(x - \\omega)$", feedback: "$x = 1$ is not a root of $x^2 - x + 1$ (it gives 1)." },
        { text: "$(x + \\omega)(x - \\omega^2)$", feedback: "The constant term would be $-\\omega^3 = -1$." },
      ],
      hint: "Expand each option, using $\\omega + \\omega^2 = -1$ and $\\omega^3 = 1$.",
    },
    {
      type: "quiz",
      id: "cq4-4-q2",
      variant: "practice",
      question: "$\\dfrac{a + b\\omega + c\\omega^2}{b + c\\omega + a\\omega^2}$ equals (denominator nonzero)",
      options: [
        { text: "$\\omega$", correct: true, feedback: "$b + c\\omega + a\\omega^2 = \\omega^2(a + b\\omega + c\\omega^2)$ since $b\\omega^{-2} = b\\omega$ and $c\\omega^{-1} = c\\omega^2$. The ratio is $\\frac1{\\omega^2} = \\omega$." },
        { text: "$\\omega^2$", feedback: "That is the answer when the letters shift the other way, as in $c + a\\omega + b\\omega^2$." },
        { text: "$1$", feedback: "The coefficients are permuted, which multiplies by a power of $\\omega$, not by 1." },
        { text: "$-1$", feedback: "Cyclic shifts multiply by $\\omega$ or $\\omega^2$, never by $-1$." },
      ],
      hint: "Factor a power of $\\omega$ out of the denominator so that $a$ becomes the constant term.",
    },
    {
      type: "numeric",
      id: "cq4-4-q3",
      variant: "practice",
      question: "Find $|1 + 3\\omega + 4\\omega^2|^2$.",
      answer: 7,
      hint: "For real $a, b, c$: $|a + b\\omega + c\\omega^2|^2 = a^2 + b^2 + c^2 - ab - bc - ca$.",
      solution: "$1 + 9 + 16 - 3 - 12 - 4 = 7$. (Check with halves of squared differences: $\\frac12(4 + 1 + 9) = 7$.)",
      commonMistakes: [
        { answer: 26, feedback: "That is $a^2 + b^2 + c^2$ alone. Subtract $ab + bc + ca = 19$." },
        { answer: 45, feedback: "The cross terms are subtracted, not added." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-4-q4",
      variant: "concept",
      multiple: true,
      question: "Which of these are factors of $a^3 + b^3$? Select all that apply.",
      options: [
        { text: "$a + b$", correct: true, feedback: "$a = -b$ makes $a^3 + b^3 = 0$." },
        { text: "$a + b\\omega$", correct: true, feedback: "$a = -b\\omega$ gives $-b^3\\omega^3 + b^3 = 0$." },
        { text: "$a + b\\omega^2$", correct: true, feedback: "$a = -b\\omega^2$ gives $-b^3\\omega^6 + b^3 = 0$." },
        { text: "$a - b\\omega$", feedback: "$a = b\\omega$ gives $b^3 + b^3 = 2b^3 \\ne 0$. That is a factor of $a^3 - b^3$." },
        { text: "$a - b$", feedback: "$a = b$ gives $2b^3$. $a - b$ divides $a^3 - b^3$." },
      ],
      hint: "$L$ is a factor exactly when setting $L = 0$ makes $a^3 + b^3 = 0$.",
    },
    {
      type: "numeric",
      id: "cq4-4-q5",
      variant: "practice",
      question: "Real numbers satisfy $a + b + c = 0$ and $abc = 4$. Find $a^3 + b^3 + c^3$.",
      answer: 12,
      hint: "$a^3 + b^3 + c^3 - 3abc$ has the factor $a + b + c$.",
      solution: "With $a + b + c = 0$ the identity gives $a^3 + b^3 + c^3 = 3abc = 12$.",
      commonMistakes: [
        { answer: 0, feedback: "The sum of the cubes is not 0: it equals $3abc$." },
        { answer: 4, feedback: "Missing the factor 3: $a^3 + b^3 + c^3 = 3abc$." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-4-q6",
      variant: "practice",
      question: "Evaluate the determinant $\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & \\omega & \\omega^2 \\\\ 1 & \\omega^2 & \\omega \\end{vmatrix}$ with $\\omega = \\frac{-1 + i\\sqrt3}{2}$.",
      options: [
        { text: "$-3\\sqrt3\\, i$", correct: true, feedback: "Expanding along the first row gives $(\\omega^2 - \\omega^4) - (\\omega - \\omega^2) + (\\omega^2 - \\omega) = 3(\\omega^2 - \\omega) = 3(-i\\sqrt3)$." },
        { text: "$3\\sqrt3\\, i$", feedback: "$\\omega^2 - \\omega = -i\\sqrt3$ (it is $-(\\omega - \\omega^2)$)." },
        { text: "$0$", feedback: "The rows are not proportional, so the determinant is nonzero." },
        { text: "$3$", feedback: "The entries are complex and the answer is purely imaginary: $3(\\omega^2 - \\omega)$." },
      ],
      hint: "Expand along the first row, reduce $\\omega^4 = \\omega$, and use $\\omega - \\omega^2 = i\\sqrt3$.",
    },
    {
      type: "quiz",
      id: "cq4-4-q7",
      variant: "concept",
      multiple: true,
      question: "Let $x = a + b$, $y = a\\omega + b\\omega^2$, $z = a\\omega^2 + b\\omega$. Which are true for all $a, b$? Select all that apply.",
      options: [
        { text: "$xyz = a^3 + b^3$", correct: true, feedback: "$yz = a^2 - ab + b^2$ and $(a + b)(a^2 - ab + b^2) = a^3 + b^3$." },
        { text: "$x + y + z = 0$", correct: true, feedback: "Each of $a, b$ is multiplied by $1 + \\omega + \\omega^2 = 0$." },
        { text: "$x^2 + y^2 + z^2 = 6ab$", correct: true, feedback: "Squares contribute $0$ and cross terms $2ab(1 + 1 + 1)$." },
        { text: "$x^3 + y^3 + z^3 = 3(a^3 + b^3)$", correct: true, feedback: "Since $x + y + z = 0$, $x^3 + y^3 + z^3 = 3xyz$." },
        { text: "$x^2 + y^2 + z^2 = 0$", feedback: "Only the $a^2$ and $b^2$ parts vanish; the cross terms give $6ab$." },
      ],
      hint: "Compute $x + y + z$ and $yz$ first, then use $a^3 + b^3 + c^3 - 3abc = (\\dots)(\\dots)$ with $x, y, z$.",
    },
    {
      type: "quiz",
      id: "cq4-4-q8",
      variant: "practice",
      question: "For non-negative integers $m, n, p$, the polynomial $x^{3m} + x^{3n+1} + x^{3p+2}$ is always divisible by",
      options: [
        { text: "$x^2 + x + 1$", correct: true, feedback: "Substituting $\\omega$ or $\\omega^2$ gives $1 + \\omega + \\omega^2 = 0$." },
        { text: "$x^2 - x + 1$", feedback: "Its roots are $-\\omega, -\\omega^2$. With $m = n = p = 0$ the polynomial is $1 + x + x^2$, and at $x = -\\omega$ it equals $1 - \\omega + \\omega^2 = -2\\omega \\ne 0$." },
        { text: "$x - 1$", feedback: "At $x = 1$ the polynomial is $3$." },
        { text: "$x^3 - 1$", feedback: "$x = 1$ is not a root, so $x^3 - 1$ cannot divide it." },
      ],
      hint: "Test the roots of each candidate factor using the factor theorem.",
    },
    {
      type: "numeric",
      id: "cq4-4-q9",
      variant: "practice",
      question: "For how many integers $n$ with $1 \\le n \\le 30$ is $x^{2n} + x^n + 1$ divisible by $x^2 + x + 1$?",
      answer: 20,
      hint: "Substitute $x = \\omega$: when is $\\omega^{2n} + \\omega^n + 1 = 0$?",
      solution: "If $3 \\nmid n$, then $\\omega^n$ and $\\omega^{2n}$ are $\\omega$ and $\\omega^2$ in some order, and the sum is 0 (and likewise at $\\omega^2$). If $3 \\mid n$, the value is 3. So $n$ must avoid the 10 multiples of 3: $30 - 10 = 20$.",
      commonMistakes: [
        { answer: 10, feedback: "That counts the multiples of 3, which are exactly the $n$ that **fail** (the value there is 3)." },
        { answer: 30, feedback: "Try $n = 3$: $\\omega^6 + \\omega^3 + 1 = 3 \\ne 0$." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-4-q10",
      variant: "practice",
      question: "JEE Main. If $(1 + \\omega)^7 = A + B\\omega$ with $A, B$ real, then $(A, B)$ is",
      options: [
        { text: "$(1, 1)$", correct: true, feedback: "$(1 + \\omega)^7 = (-\\omega^2)^7 = -\\omega^{14} = -\\omega^2 = 1 + \\omega$." },
        { text: "$(1, 0)$", feedback: "$-\\omega^2$ is not real; it equals $1 + \\omega$." },
        { text: "$(-1, 1)$", feedback: "$-\\omega^2 = 1 + \\omega$, with $A = +1$." },
        { text: "$(0, 1)$", feedback: "$(1 + \\omega)^7$ is not $\\omega$: check by modulus, $|1 + \\omega| = 1$, and the angle is $7 \\times 60^\\circ = 420^\\circ \\equiv 60^\\circ$, which is $1 + \\omega$." },
      ],
      hint: "$1 + \\omega = -\\omega^2$. Simplify the power, then rewrite $-\\omega^2$ using $1 + \\omega + \\omega^2 = 0$.",
    },
    {
      type: "numeric",
      id: "cq4-4-q11",
      variant: "practice",
      question: "JEE Advanced. Let $\\omega \\ne 1$ be a cube root of unity. Find the minimum of $|a + b\\omega + c\\omega^2|^2$ over all **distinct non-zero integers** $a, b, c$.",
      answer: 3,
      hint: "$|a + b\\omega + c\\omega^2|^2 = \\frac12\\left[(a - b)^2 + (b - c)^2 + (c - a)^2\\right]$. How small can the squared differences of three distinct integers be?",
      solution: "Three distinct integers have pairwise differences at least $1, 1, 2$ (consecutive integers), so the bracket is at least $1 + 1 + 4 = 6$ and the value at least $3$. It is attained at $a, b, c = 1, 2, 3$: $1 + 4 + 9 - 2 - 6 - 3 = 3$.",
      commonMistakes: [
        { answer: 1, feedback: "Three distinct integers cannot all differ by 1: the outer pair differs by at least 2." },
        { answer: 0, feedback: "0 needs $a = b = c$, which is excluded." },
        { answer: 6, feedback: "That is the bracket; the expression is half of it." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "the-n-th-roots-of-unity",
  title: "4.5 · The n-th Roots of Unity",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "The cube roots of unity made a triangle. Replace 3 by any $n$ and the same story plays out on a regular $n$-gon inscribed in the unit circle. The polygon picture explains every fact about these roots, from why they add to zero to why the product of a polygon's diagonals from one corner is exactly $n$.",
    },
    { type: "heading", text: "The n roots and the polygon" },
    {
      type: "callout",
      variant: "definition",
      title: "n-th roots of unity",
      content:
        "The solutions of $z^n = 1$ are $z_k = e^{2\\pi i k/n} = \\cos\\frac{2k\\pi}n + i\\sin\\frac{2k\\pi}n$ for $k = 0, 1, \\dots, n - 1$. With $\\alpha = e^{2\\pi i/n}$ they are\n\n$$1,\\ \\alpha,\\ \\alpha^2,\\ \\dots,\\ \\alpha^{n-1}.$$",
    },
    {
      type: "table",
      headers: ["$n$", "Roots", "Shape"],
      rows: [
        ["2", "$1, -1$", "a diameter"],
        ["3", "$1, \\omega, \\omega^2$", "equilateral triangle"],
        ["4", "$1, i, -1, -i$", "square"],
        ["6", "$\\pm1, \\pm\\omega, \\pm\\omega^2$", "regular hexagon"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "cq-argand-plane",
        mode: "roots",
        z1: [1, 0],
        n: { min: 2, max: 12, initial: 5 },
        snap: 0.5,
        show: ["polygon", "unit-circle"],
        window: { xmin: -2, xmax: 2, ymin: -2, ymax: 2 },
        caption:
          "Keep $w = 1$ and slide $n$. One vertex is always at 1, the polygon is always regular, the sum is always 0, and the product alternates between $1$ (odd $n$) and $-1$ (even $n$).",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the readout for the product flips sign with the parity of $n$. For even $n$, the root $-1$ is present and every other non-real root pairs with its conjugate to give 1, so the product is $-1$. For odd $n$, all non-real roots pair off and the product is $+1$.",
    },
    { type: "heading", text: "Sum, product and power sums" },
    {
      type: "text",
      content:
        "**Sum.** For $n \\ge 2$, $\\alpha \\ne 1$, so the geometric series formula applies:",
    },
    {
      type: "math",
      latex: "1 + \\alpha + \\alpha^2 + \\dots + \\alpha^{n-1} = \\frac{\\alpha^n - 1}{\\alpha - 1} = \\frac{1 - 1}{\\alpha - 1} = 0.",
    },
    {
      type: "text",
      content:
        "Taking real and imaginary parts gives $\\sum_{k=0}^{n-1}\\cos\\frac{2k\\pi}n = 0$ and $\\sum_{k=0}^{n-1}\\sin\\frac{2k\\pi}n = 0$.\n\n**Product.** By Vieta on $z^n - 1$, the product of the roots is $(-1)^n\\cdot(-1) = (-1)^{n-1}$.\n\n**Sums of $p$-th powers.** Raise each root to the power $p$: the sum becomes $1 + \\alpha^p + \\alpha^{2p} + \\dots + \\alpha^{(n-1)p}$, again a geometric series with ratio $\\alpha^p$.",
    },
    {
      type: "math",
      latex: "\\sum_{k=0}^{n-1} \\alpha^{kp} = \\begin{cases} n, & n \\mid p \\ (\\text{every term is } 1) \\\\ 0, & n \\nmid p \\ (\\text{ratio } \\alpha^p \\ne 1) \\end{cases}",
    },
    { type: "heading", text: "The product formula and chord lengths" },
    {
      type: "text",
      content:
        "Factorise $z^n - 1$ over its roots and divide by the factor $z - 1$:",
    },
    {
      type: "math",
      latex: "\\frac{z^n - 1}{z - 1} = 1 + z + z^2 + \\dots + z^{n-1} = (z - \\alpha)(z - \\alpha^2)\\cdots(z - \\alpha^{n-1}).",
    },
    {
      type: "text",
      content:
        "This identity holds for every $z$. Put $z = 1$: the left side is $n$ (n ones), so",
    },
    {
      type: "math",
      latex: "\\prod_{k=1}^{n-1}(1 - \\alpha^k) = n, \\qquad |1 - \\alpha^k| = 2\\sin\\frac{k\\pi}{n}, \\qquad \\prod_{k=1}^{n-1}\\sin\\frac{k\\pi}n = \\frac{n}{2^{n-1}}.",
    },
    {
      type: "text",
      content:
        "$|1 - \\alpha^k|$ is the distance from the vertex 1 to the vertex $\\alpha^k$ of the polygon (a chord subtending the angle $\\frac{2k\\pi}n$, of length $2\\sin\\frac{k\\pi}n$). So: **in a regular $n$-gon inscribed in a unit circle, the product of the distances from one vertex to all the others is $n$.**",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "cq4-5-we1",
      title: "Worked example 1: a disguised sum of roots",
      problem: "Evaluate $\\displaystyle\\sum_{k=1}^{6}\\left(\\sin\\frac{2k\\pi}{7} - i\\cos\\frac{2k\\pi}{7}\\right)$.",
      steps: [
        { text: "Turn each term into a root of unity: $\\sin x - i\\cos x = -i(\\cos x + i\\sin x) = -ie^{ix}$. *Why this step:* sine in the real slot means a factor of $\\pm i$ is hiding." },
        { latex: "\\sum_{k=1}^{6}\\left(\\sin\\tfrac{2k\\pi}{7} - i\\cos\\tfrac{2k\\pi}{7}\\right) = -i\\sum_{k=1}^{6}\\alpha^k, \\qquad \\alpha = e^{2\\pi i/7}" },
        { text: "All seven roots add to 0, so the six non-trivial ones add to $-1$: the sum is $-i \\cdot (-1) = i$." },
      ],
      answer: "The sum equals $i$.",
    },
    {
      type: "worked-example",
      id: "cq4-5-we2",
      title: "Worked example 2: diagonals of a 12-gon",
      problem: "A regular 12-gon is inscribed in a circle of radius 1. Find the product of the lengths of the 11 segments joining one vertex to all the others.",
      steps: [
        { text: "Place the polygon at the 12th roots of unity with the chosen vertex at 1. *Why this step:* then the lengths are $|1 - \\alpha^k|$, which the product formula handles." },
        { latex: "\\prod_{k=1}^{11}|1 - \\alpha^k| = \\left|\\prod_{k=1}^{11}(1 - \\alpha^k)\\right| = 12" },
      ],
      answer: "The product is $12$. (For radius $R$ it would be $12R^{11}$.)",
    },
    {
      type: "worked-example",
      id: "cq4-5-we3",
      title: "Worked example 3: power sums",
      problem: "Let $1, \\alpha, \\dots, \\alpha^5$ be the sixth roots of unity. Find $\\sum_{k=0}^{5}\\alpha^{4k}$ and $\\sum_{k=0}^{5}\\alpha^{12k}$.",
      steps: [
        { text: "$\\sum\\alpha^{4k}$ is geometric with ratio $\\alpha^4 \\ne 1$ (since $6 \\nmid 4$), so it is $\\frac{\\alpha^{24} - 1}{\\alpha^4 - 1} = 0$." },
        { text: "$\\alpha^{12} = (\\alpha^6)^2 = 1$, so every term of the second sum is 1. *Why this step:* when $n \\mid p$ the formula's denominator would be 0, so count terms instead." },
      ],
      answer: "$\\sum\\alpha^{4k} = 0$ and $\\sum\\alpha^{12k} = 6$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the product of the n-th roots of unity is always 1\"",
      content:
        "For $n = 2$ the roots are $1$ and $-1$, product $-1$. In general the product is $(-1)^{n-1}$: $+1$ for odd $n$, $-1$ for even $n$. Only the **sum** is the same (zero) for every $n \\ge 2$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the sum of the n-th roots of unity is 1 because one of them is 1\"",
      content:
        "The root 1 is cancelled by the others: $1 + (\\alpha + \\dots + \\alpha^{n-1}) = 0$, so the non-trivial roots add to $-1$. JEE problems that sum $k = 1$ to $n - 1$ want $-1$, not 0.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "cq4-5-q1",
      variant: "practice",
      question: "What is the sum of the ninth roots of unity?",
      answer: 0,
      tolerance: 0.0001,
      hint: "Geometric series with ratio $\\alpha = e^{2\\pi i/9}$.",
      solution: "$\\frac{\\alpha^9 - 1}{\\alpha - 1} = 0$.",
      commonMistakes: [
        { answer: 1, feedback: "The root 1 is balanced by the other eight." },
        { answer: 9, feedback: "That would be true only if every root were 1." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-5-q2",
      variant: "practice",
      question: "What is the product of the eighth roots of unity?",
      answer: -1,
      hint: "The product is $(-1)^{n-1}$.",
      solution: "$(-1)^{8-1} = -1$. (The root $-1$ is present and the other non-real roots pair into conjugates with product 1; $1$ contributes 1.)",
      commonMistakes: [
        { answer: 1, feedback: "For even $n$ the root $-1$ is one of them, and everything else pairs to 1." },
        { answer: 0, feedback: "That is the sum. No root is 0." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-5-q3",
      variant: "practice",
      question: "Let $1, \\alpha, \\alpha^2, \\alpha^3, \\alpha^4$ be the fifth roots of unity. Find $1 + \\alpha^{10} + \\alpha^{20} + \\alpha^{30} + \\alpha^{40}$.",
      answer: 5,
      hint: "Is $10$ a multiple of $5$?",
      solution: "$\\alpha^{10} = (\\alpha^5)^2 = 1$, so all five terms are 1 and the sum is 5.",
      commonMistakes: [
        { answer: 0, feedback: "The sum of $p$-th powers is 0 only when $n \\nmid p$. Here $5 \\mid 10$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-5-q4",
      variant: "practice",
      question: "With $\\alpha = e^{2\\pi i/6}$, find $\\prod_{k=1}^{5}(1 - \\alpha^k)$.",
      answer: 6,
      hint: "Set $z = 1$ in $1 + z + \\dots + z^{n-1} = \\prod_{k=1}^{n-1}(z - \\alpha^k)$.",
      solution: "The product equals $1 + 1 + 1 + 1 + 1 + 1 = 6$.",
      commonMistakes: [
        { answer: 0, feedback: "That would need some $\\alpha^k = 1$, but $k$ runs only from 1 to 5." },
        { answer: -1, feedback: "That is the product of the roots themselves, not of $1 - \\alpha^k$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-5-q5",
      variant: "practice",
      question: "Evaluate $\\displaystyle\\sum_{k=1}^{6}\\cos\\frac{2k\\pi}7$.",
      answer: -1,
      tolerance: 0.001,
      hint: "This is the real part of the sum of the six non-trivial seventh roots of unity.",
      solution: "$\\sum_{k=0}^{6}\\cos\\frac{2k\\pi}7 = 0$ and the $k = 0$ term is 1, so the requested sum is $-1$.",
      commonMistakes: [
        { answer: 0, feedback: "The sum from $k = 0$ is 0. Leaving out $k = 0$ removes a 1." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-5-q6",
      variant: "practice",
      question: "The eighth roots of unity are joined in order to form a regular octagon. Find its perimeter (to 2 decimal places).",
      answer: 16 * Math.sin(Math.PI / 8),
      tolerance: 0.01,
      hint: "Each side is a chord $|1 - \\alpha| = 2\\sin\\frac\\pi8$.",
      solution: "Perimeter $= 8 \\times 2\\sin\\frac{\\pi}{8} = 16\\sin 22.5^\\circ \\approx 6.12$.",
      commonMistakes: [
        { answer: 2 * Math.PI, feedback: "That is the circle's circumference; the octagon's perimeter is a little less." },
        { answer: 8 * Math.sin(Math.PI / 8), feedback: "A chord subtending $2\\theta$ has length $2\\sin\\theta$, not $\\sin\\theta$." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-5-q7",
      variant: "concept",
      multiple: true,
      question: "Let $\\alpha = e^{2\\pi i/n}$ with $n \\ge 3$. Which statements are true? Select all that apply.",
      options: [
        { text: "$1 + \\alpha + \\alpha^2 + \\dots + \\alpha^{n-1} = 0$", correct: true, feedback: "Geometric series with $\\alpha^n = 1$, $\\alpha \\ne 1$." },
        { text: "$\\bar\\alpha = \\alpha^{n-1}$", correct: true, feedback: "$\\bar\\alpha = \\frac1\\alpha = \\alpha^{n-1}$ because $\\alpha^n = 1$." },
        { text: "$|\\alpha^k| = 1$ for every integer $k$", correct: true, feedback: "All roots of unity lie on the unit circle." },
        { text: "The product of all the $n$-th roots of unity is 1", feedback: "It is $(-1)^{n-1}$, which is $-1$ for even $n$." },
        { text: "$\\alpha^k$ for $k = 1, \\dots, n - 1$ are all non-real", feedback: "For even $n$, $\\alpha^{n/2} = -1$ is real." },
      ],
      hint: "Picture the regular $n$-gon on the unit circle with one vertex at 1.",
    },
    {
      type: "quiz",
      id: "cq4-5-q8",
      variant: "practice",
      question: "JEE Main. $\\displaystyle\\sum_{k=1}^{10}\\left(\\sin\\frac{2k\\pi}{11} + i\\cos\\frac{2k\\pi}{11}\\right)$ equals",
      options: [
        { text: "$-i$", correct: true, feedback: "$\\sin x + i\\cos x = ie^{-ix}$, so the sum is $i\\sum_{k=1}^{10}\\bar\\alpha^{k} = i \\cdot (-1)$." },
        { text: "$i$", feedback: "Sign: the non-trivial roots add to $-1$, and the factor in front is $+i$." },
        { text: "$-1$", feedback: "There is a factor of $i$ from rewriting $\\sin x + i\\cos x$." },
        { text: "$0$", feedback: "The sum starts at $k = 1$, so the root 1 is missing: the total is $i(-1)$." },
      ],
      hint: "Write $\\sin x + i\\cos x = i(\\cos x - i\\sin x)$.",
    },
    {
      type: "numeric",
      id: "cq4-5-q9",
      variant: "practice",
      question: "JEE Main. Let $z \\ne 1$ satisfy $z^5 = 1$. Find $(1 + z)(1 + z^2)(1 + z^3)(1 + z^4)$.",
      answer: 1,
      hint: "$z, z^2, z^3, z^4$ are the four non-trivial fifth roots of unity. Evaluate $\\prod(x - \\alpha^k)$ at $x = -1$.",
      solution: "Since 5 is prime, $z, z^2, z^3, z^4$ are all four non-trivial roots. $\\prod_{k=1}^{4}(1 + \\alpha^k) = \\prod(-1 - \\alpha^k)$ (four sign changes cancel) $= 1 + x + x^2 + x^3 + x^4$ at $x = -1$, which is $1 - 1 + 1 - 1 + 1 = 1$.",
      commonMistakes: [
        { answer: 0, feedback: "No factor vanishes: $z^k = -1$ is impossible for a fifth root of unity." },
        { answer: 5, feedback: "That is $\\prod(1 - \\alpha^k)$. With plus signs, evaluate at $x = -1$ instead." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-5-q10",
      variant: "practice",
      question: "JEE Advanced. Let $z = e^{2\\pi i/7}$, $S_1 = z + z^2 + z^4$ and $S_2 = z^3 + z^5 + z^6$. Find $S_1 S_2$.",
      answer: 2,
      hint: "Expand the product into nine powers of $z$ and reduce exponents modulo 7.",
      solution: "$S_1S_2 = z^4 + z^6 + z^7 + z^5 + z^7 + z^8 + z^7 + z^9 + z^{10} = 3 + (z + z^2 + z^3 + z^4 + z^5 + z^6) = 3 - 1 = 2$. (Also $S_1 + S_2 = -1$, so $S_1, S_2$ are the roots of $t^2 + t + 2 = 0$.)",
      commonMistakes: [
        { answer: -1, feedback: "That is $S_1 + S_2$, not the product." },
        { answer: 3, feedback: "Three terms are $z^7 = 1$, but the other six add to $-1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-5-q11",
      variant: "practice",
      question: "JEE Advanced. With $\\alpha = e^{2\\pi i/7}$, evaluate $\\displaystyle\\sum_{k=1}^{6}\\frac{1}{1 - \\alpha^k}$.",
      answer: 3,
      tolerance: 0.0001,
      hint: "Pair $k$ with $7 - k$: $\\frac1{1 - \\alpha^k} + \\frac1{1 - \\alpha^{-k}}$.",
      solution: "$\\frac1{1 - \\alpha^{-k}} = \\frac{\\alpha^k}{\\alpha^k - 1} = -\\frac{\\alpha^k}{1 - \\alpha^k}$, so each pair adds to $\\frac{1 - \\alpha^k}{1 - \\alpha^k} = 1$. Three pairs give 3. (In general the sum is $\\frac{n-1}2$.)",
      commonMistakes: [
        { answer: 6, feedback: "Each **pair** contributes 1, and there are three pairs." },
        { answer: 0, feedback: "The terms do not cancel; each pair adds to exactly 1." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-4-mastery",
  title: "4.6 · Chapter 4 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "This chapter has one picture at its heart: a regular polygon of points on a circle, each obtained from the last by the same rotation. Powers walk round it, roots are its corners, and ω is the triangle case. Before the questions, rebuild the facts from that picture without the formula sheet.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild each fact in one line",
      content:
        "1. **De Moivre.** Multiplying by $e^{i\\theta}$ rotates by $\\theta$, so $n$ multiplications rotate by $n\\theta$: $(\\cos\\theta + i\\sin\\theta)^n = \\cos n\\theta + i\\sin n\\theta$. With modulus $r$, the lengths multiply: $r^n$.\n2. **n-th roots.** To solve $z^n = \\rho e^{i\\varphi}$, take the $n$-th root of the length and divide the angle, but the angle is only known up to $2k\\pi$: $z_k = \\rho^{1/n}e^{i(\\varphi + 2k\\pi)/n}$, $n$ corners of a regular polygon.\n3. **Sum zero.** A regular polygon centred at 0 balances at 0 (or: geometric series, or: no $z^{n-1}$ term in $z^n - w$).\n4. **Product.** Vieta on $z^n - 1$: $(-1)^{n-1}$. Even $n$ includes $-1$.\n5. **ω.** $x^3 - 1 = (x - 1)(x^2 + x + 1)$, so $\\omega^3 = 1$ and $1 + \\omega + \\omega^2 = 0$; the triangle is equilateral, so $\\bar\\omega = \\omega^2$.\n6. **Factorisations.** $x^2 + x + 1 = (x - \\omega)(x - \\omega^2)$. Expanding $(a + b\\omega + c\\omega^2)(a + b\\omega^2 + c\\omega)$ gives squares times $\\omega^3 = 1$ and cross terms times $\\omega + \\omega^2 = -1$: that is $a^2 + b^2 + c^2 - ab - bc - ca$. Multiply by $a + b + c$ for $a^3 + b^3 + c^3 - 3abc$.\n7. **Chord product.** Put $z = 1$ in $1 + z + \\dots + z^{n-1} = \\prod_{k=1}^{n-1}(z - \\alpha^k)$: $\\prod(1 - \\alpha^k) = n$.",
    },
    {
      type: "math",
      latex: "z^n = \\rho e^{i\\varphi} \\iff z = \\rho^{1/n}e^{i(\\varphi + 2k\\pi)/n},\\quad k = 0, \\dots, n - 1",
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "numeric",
      id: "cq4-6-q1",
      variant: "mastery",
      question: "Evaluate $\\left(\\dfrac{1 + i}{1 - i}\\right)^{2026}$.",
      answer: -1,
      hint: "Simplify the fraction to a power of $i$ first.",
      solution: "$\\frac{1 + i}{1 - i} = i$, and $i^{2026} = i^{4 \\cdot 506 + 2} = i^2 = -1$.",
      commonMistakes: [
        { answer: 1, feedback: "$2026 \\equiv 2 \\pmod 4$, so the value is $i^2 = -1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-6-q2",
      variant: "mastery",
      question: "Evaluate $(1 + i\\sqrt3)^9$.",
      answer: -512,
      hint: "$1 + i\\sqrt3 = 2e^{i\\pi/3}$.",
      solution: "$2^9 e^{i3\\pi} = 512 \\times (-1) = -512$.",
      commonMistakes: [
        { answer: 512, feedback: "$e^{3\\pi i} = e^{i\\pi} = -1$." },
        { answer: -1, feedback: "Don't forget the modulus: $2^9 = 512$." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-6-q3",
      variant: "mastery",
      question: "The three cube roots of $i$ are",
      options: [
        { text: "$\\frac{\\sqrt3}2 + \\frac i2,\\ -\\frac{\\sqrt3}2 + \\frac i2,\\ -i$", correct: true, feedback: "$i = e^{i\\pi/2}$ gives angles $30^\\circ, 150^\\circ, 270^\\circ$ on the unit circle." },
        { text: "$i,\\ i\\omega,\\ i\\omega^2$", feedback: "$i^3 = -i$, so these are the cube roots of $-i$." },
        { text: "$\\frac{\\sqrt3}2 + \\frac i2$ only", feedback: "That is the principal root; there are two more, $120^\\circ$ apart." },
        { text: "$\\frac12 + \\frac{\\sqrt3}2 i,\\ -1,\\ \\frac12 - \\frac{\\sqrt3}2 i$", feedback: "Those are the cube roots of $-1$." },
      ],
      hint: "Divide the angle $\\frac\\pi2$ by 3 and add multiples of $\\frac{2\\pi}3$.",
    },
    {
      type: "numeric",
      id: "cq4-6-q4",
      variant: "mastery",
      question: "How many complex numbers satisfy $z^3 = \\bar z$?",
      answer: 5,
      hint: "Moduli first: $|z|^3 = |z|$. On the unit circle, $\\bar z = 1/z$.",
      solution: "$|z| = 0$ gives $z = 0$. $|z| = 1$ gives $z^3 = \\frac1z$, i.e. $z^4 = 1$: four roots $\\pm1, \\pm i$. Total 5.",
      commonMistakes: [
        { answer: 4, feedback: "$z = 0$ is also a solution." },
        { answer: 3, feedback: "With $\\bar z = 1/z$ the equation becomes $z^4 = 1$, not $z^3 = 1$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-6-q5",
      variant: "mastery",
      question: "Evaluate $(x + y)(x\\omega + y\\omega^2)(x\\omega^2 + y\\omega)$ for $x = 3$, $y = -1$.",
      answer: 26,
      hint: "The product is $x^3 + y^3$.",
      solution: "$(x\\omega + y\\omega^2)(x\\omega^2 + y\\omega) = x^2 - xy + y^2$, so the whole product is $x^3 + y^3 = 27 - 1 = 26$.",
      commonMistakes: [
        { answer: 28, feedback: "That is $x^3 - y^3$. The factors with $+y$ give $x^3 + y^3$." },
        { answer: 8, feedback: "That is $(x + y)^3$. The ω-factors are not all equal to $x + y$." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-6-q6",
      variant: "mastery",
      multiple: true,
      question: "The six roots of $z^6 = 64$ are plotted. Which statements are true? Select all that apply.",
      options: [
        { text: "They form a regular hexagon of side 2", correct: true, feedback: "Circumradius $64^{1/6} = 2$, and a regular hexagon's side equals its circumradius." },
        { text: "Their sum is 0", correct: true, feedback: "No $z^5$ term in $z^6 - 64$." },
        { text: "Their product is $-64$", correct: true, feedback: "$(-1)^{6-1} \\cdot 64 = -64$." },
        { text: "Two of them are real", correct: true, feedback: "$2$ and $-2$." },
        { text: "Their product is $64$", feedback: "For even $n$ the product is $(-1)^{n-1}w = -64$: the real roots $2$ and $-2$ already contribute a minus sign, and the other four pair into conjugates." },
      ],
      hint: "Roots $2e^{ik\\pi/3}$: list the angles $0^\\circ, 60^\\circ, \\dots, 300^\\circ$.",
    },
    {
      type: "numeric",
      id: "cq4-6-q7",
      variant: "mastery",
      question: "Let $1, \\alpha, \\dots, \\alpha^7$ be the eighth roots of unity. Find $\\sum_{k=0}^{7}\\alpha^{4k}$.",
      answer: 0,
      tolerance: 0.0001,
      hint: "Is the power 4 a multiple of $n = 8$?",
      solution: "$\\alpha^4 = -1 \\ne 1$, so the geometric series $\\sum(\\alpha^4)^k = \\frac{(\\alpha^4)^8 - 1}{\\alpha^4 - 1} = 0$. (Directly: the terms alternate $1, -1, 1, \\dots$.)",
      commonMistakes: [
        { answer: 8, feedback: "That needs $8 \\mid 4$. Here $\\alpha^4 = -1$, so the terms alternate." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-6-q8",
      variant: "mastery",
      question: "Find $\\sin\\frac\\pi6\\,\\sin\\frac{2\\pi}6\\,\\sin\\frac{3\\pi}6\\,\\sin\\frac{4\\pi}6\\,\\sin\\frac{5\\pi}6$. (A fraction is fine.)",
      answer: 3 / 16,
      tolerance: 0.0001,
      hint: "$\\prod_{k=1}^{n-1}|1 - \\alpha^k| = n$ and $|1 - \\alpha^k| = 2\\sin\\frac{k\\pi}n$.",
      solution: "With $n = 6$: $\\prod_{k=1}^{5}2\\sin\\frac{k\\pi}6 = 6$, so the product of sines is $\\frac{6}{2^5} = \\frac{3}{16}$. (Check: $\\frac12\\cdot\\frac{\\sqrt3}2\\cdot1\\cdot\\frac{\\sqrt3}2\\cdot\\frac12 = \\frac3{16}$.)",
      commonMistakes: [
        { answer: 6, feedback: "That is the product of the chords $2\\sin\\frac{k\\pi}6$. Divide by $2^5$." },
        { answer: 3 / 32, feedback: "There are 5 factors of 2, not 6: $\\frac{6}{2^5}$." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-6-q9",
      variant: "mastery",
      question: "Find the least positive integer $n$ for which $\\left(\\dfrac{\\sqrt3 + i}{\\sqrt3 - i}\\right)^{n} = 1$.",
      answer: 6,
      hint: "Top and bottom are conjugates of modulus 2.",
      solution: "$\\frac{\\sqrt3 + i}{\\sqrt3 - i} = \\frac{2e^{i\\pi/6}}{2e^{-i\\pi/6}} = e^{i\\pi/3}$, and $e^{in\\pi/3} = 1$ first at $n = 6$.",
      commonMistakes: [
        { answer: 12, feedback: "The angles subtract: $\\frac\\pi6 - (-\\frac\\pi6) = \\frac\\pi3$, so 6 suffices." },
        { answer: 3, feedback: "At $n = 3$ the value is $e^{i\\pi} = -1$." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-6-q10",
      variant: "mastery",
      multiple: true,
      question: "JEE Advanced (one or more correct). With $\\omega \\ne 1$ a cube root of unity, which of these are real?",
      options: [
        { text: "$(1 + \\omega)^6$", correct: true, feedback: "$(-\\omega^2)^6 = \\omega^{12} = 1$." },
        { text: "$\\omega + \\omega^2$", correct: true, feedback: "$= -1$." },
        { text: "$(1 - \\omega)(1 - \\omega^2)$", correct: true, feedback: "$= 3$." },
        { text: "$\\omega - \\omega^2$", feedback: "$= i\\sqrt3$, purely imaginary." },
        { text: "$\\omega^{2026}$", feedback: "$= \\omega$, not real." },
      ],
      hint: "Reduce powers mod 3 and use $1 + \\omega = -\\omega^2$.",
    },
    {
      type: "numeric",
      id: "cq4-6-q11",
      variant: "mastery",
      question: "Evaluate $\\displaystyle\\sum_{k=1}^{12}\\left|e^{2k\\pi i/12} - 1\\right|^2$.",
      answer: 24,
      hint: "$|e^{ix} - 1|^2 = 2 - 2\\cos x$.",
      solution: "$\\sum_{k=1}^{12}(2 - 2\\cos\\frac{2k\\pi}{12}) = 24 - 2\\sum_{k=1}^{12}\\cos\\frac{2k\\pi}{12} = 24 - 0 = 24$, because $k = 1, \\dots, 12$ runs over all twelfth roots of unity (the $k = 12$ term is the root 1).",
      commonMistakes: [
        { answer: 12, feedback: "Each term is $2 - 2\\cos x$, not $1 - \\cos x$." },
        { answer: 26, feedback: "The cosines over a full set of roots add to 0, not $-1$: here $k = 12$ supplies the root 1." },
      ],
    },
    {
      type: "numeric",
      id: "cq4-6-q12",
      variant: "mastery",
      question: "JEE Main. How many complex numbers satisfy both $z^{12} = 1$ and $z^{8} = 1$?",
      answer: 4,
      hint: "If $z^{12} = z^8 = 1$ then $z^{4} = z^{12}/z^{8} = 1$.",
      solution: "Common roots satisfy $z^{\\gcd(12, 8)} = z^4 = 1$, and every fourth root of unity satisfies both. So there are 4: $\\pm1, \\pm i$.",
      commonMistakes: [
        { answer: 2, feedback: "$\\pm i$ also work: $i^8 = i^{12} = 1$." },
        { answer: 24, feedback: "That is the lcm. Common roots are governed by the gcd." },
      ],
    },
    {
      type: "quiz",
      id: "cq4-6-q13",
      variant: "mastery",
      question: "Which factorisation is correct?",
      options: [
        { text: "$a^2 + b^2 + c^2 - ab - bc - ca = (a + b\\omega + c\\omega^2)(a + b\\omega^2 + c\\omega)$", correct: true, feedback: "Squares get $\\omega^3 = 1$, cross terms get $\\omega + \\omega^2 = -1$." },
        { text: "$a^2 + b^2 + c^2 - ab - bc - ca = (a + b + c)(a + b\\omega + c\\omega^2)$", feedback: "The factor $a + b + c$ belongs to the cubic $a^3 + b^3 + c^3 - 3abc$." },
        { text: "$a^3 + b^3 + c^3 - 3abc = (a + b\\omega + c\\omega^2)^3$", feedback: "The three factors are different: $a + b + c$, $a + b\\omega + c\\omega^2$ and $a + b\\omega^2 + c\\omega$." },
        { text: "$a^2 + b^2 + c^2 - ab - bc - ca = (a + b\\omega + c\\omega^2)^2$", feedback: "The second factor has $\\omega$ and $\\omega^2$ swapped; it is the conjugate (for real $a, b, c$), not a copy." },
      ],
      hint: "Expand the candidate and check the coefficient of $ab$.",
    },
    {
      type: "numeric",
      id: "cq4-6-q14",
      variant: "mastery",
      question: "JEE Advanced. Let $\\alpha = e^{2\\pi i/9}$. Find $\\displaystyle\\prod_{k=1}^{8}\\left(2 - \\alpha^k\\right)$.",
      answer: 511,
      hint: "Put $z = 2$ in $1 + z + \\dots + z^{8} = \\prod_{k=1}^{8}(z - \\alpha^k)$.",
      solution: "$\\prod_{k=1}^{8}(2 - \\alpha^k) = 1 + 2 + 4 + \\dots + 2^8 = 2^9 - 1 = 511$.",
      commonMistakes: [
        { answer: 512, feedback: "The sum $1 + 2 + \\dots + 2^8$ is $2^9 - 1$." },
        { answer: 9, feedback: "That is the value at $z = 1$. Here $z = 2$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "You can now treat complex numbers as rotations and polygons. Chapter 5 turns this into geometry: $|z - a|$ as distance, $\\arg$ as angle, loci such as circles and perpendicular bisectors, the rotation theorem $\\frac{z_3 - z_1}{z_2 - z_1} = \\frac{|z_3 - z_1|}{|z_2 - z_1|}e^{i\\theta}$, and the equilateral-triangle condition, which is $\\omega$ in disguise.",
    },
  ]),
};

export const cqChapter4Lessons: LessonSeed[] = [lesson01, lesson02, lesson03, lesson04, lesson05, lessonMastery];
