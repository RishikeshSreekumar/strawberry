import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Trigonometry Chapter 3 — Identities: The Derivation Toolkit.
 * A small core (Pythagoras + angle sum + circle symmetry) and the moves
 * that generate everything else from it.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const WAVE_WINDOW = { xmin: -6.5, xmax: 6.5, ymin: -3.5, ymax: 3.5 };

const lesson01: LessonSeed = {
  slug: "what-an-identity-is",
  title: "3.1 · What an Identity Is",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two equations that look alike but behave nothing alike:",
    },
    { type: "math", latex: "\\sin x = \\tfrac{1}{2} \\qquad\\text{versus}\\qquad \\sin^2 x + \\cos^2 x = 1" },
    {
      type: "text",
      content:
        "The first is a **question**: which $x$ make this true? (Some do, most do not — Chapter 4 is about answering it.) The second is a **statement**: it is true for every $x$ whatsoever. There is nothing to solve.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Identity",
      content:
        "An **identity** is an equation true for every value of the variable for which both sides are defined. An **equation** is a constraint that singles out particular values. Same notation, opposite jobs.",
    },
    {
      type: "text",
      content:
        "The \"where both sides are defined\" clause does real work. $\\tan x = \\frac{\\sin x}{\\cos x}$ is an identity, but neither side exists at $x = \\frac{\\pi}{2}$. Excluded points do not spoil an identity; they just come with it.",
    },
    {
      type: "text",
      content:
        "**How to prove one.** The rules are narrow, and following them is most of the skill:",
    },
    {
      type: "callout",
      variant: "info",
      title: "The rules of the game",
      content:
        "1. **Work on one side only**, and transform it until it becomes the other. Do not move terms across the equals sign — you are not solving, you are rewriting.\n2. **Start from the messier side.** There is more to simplify there.\n3. **Convert to sine and cosine** when stuck. Nearly every identity collapses once everything is in those two.\n4. **Look for a Pythagorean pattern.** A $1 - \\sin^2$ or a $1 + \\tan^2$ is almost always the intended move.",
    },
    {
      type: "text",
      content:
        "Worked example: show $\\dfrac{\\sin x}{\\cos x} + \\dfrac{\\cos x}{\\sin x} = \\dfrac{1}{\\sin x\\cos x}$.\n\nStart on the left, which is messier. Common denominator:",
    },
    {
      type: "math",
      latex:
        "\\frac{\\sin x}{\\cos x} + \\frac{\\cos x}{\\sin x} = \\frac{\\sin^2 x + \\cos^2 x}{\\sin x\\cos x} = \\frac{1}{\\sin x\\cos x}",
    },
    {
      type: "text",
      content:
        "One Pythagorean substitution and it is done. Notice what was *not* done: nothing was multiplied across, nothing was moved to the other side.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Graphs as a check, not a proof",
      content:
        "Plotting both sides is a fast way to catch a false claim — if the curves differ anywhere, it is not an identity. Agreement on a screen is strong evidence but not a proof; two curves can agree on a window and part company elsewhere.",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "sin²x + cos²x", expr: "sin(x)^2 + cos(x)^2", latex: "\\sin^2 x + \\cos^2 x", excluded: [] },
          { label: "sin(2x)", expr: "sin(2*x)", latex: "\\sin 2x", excluded: [] },
          { label: "2 sin x cos x", expr: "2*sin(x)*cos(x)", latex: "2\\sin x\\cos x", excluded: [] },
        ],
        window: WAVE_WINDOW,
      },
    },
    {
      type: "text",
      content:
        "The first is the flat line $y = 1$ — the identity, visible. The second and third are indistinguishable, which is a preview of lesson 3.4.",
    },
    {
      type: "quiz",
      id: "t3-1-q1",
      variant: "concept",
      question: "Which of these is an identity rather than an equation to solve?",
      options: [
        { text: "$\\tan x \\cos x = \\sin x$", correct: true, feedback: "Substitute $\\tan x = \\frac{\\sin x}{\\cos x}$ and the cosines cancel — true wherever both sides are defined." },
        { text: "$\\cos x = 0$", feedback: "Only true at particular angles; that is a question, not a statement." },
        { text: "$2\\sin x = 1$", feedback: "Same — it constrains $x$ rather than describing every $x$." },
      ],
    },
    {
      type: "quiz",
      id: "t3-1-q2",
      variant: "concept",
      question: "Why is it bad practice to prove an identity by cross-multiplying across the equals sign?",
      options: [
        {
          text: "It assumes the statement you are trying to prove, so the argument is circular.",
          correct: true,
          feedback: "Transforming one side alone never assumes the result — that is why the rule exists.",
        },
        { text: "It gives the wrong answer.", feedback: "It often reaches a true statement; the trouble is the logic, not the arithmetic." },
        { text: "It takes longer.", feedback: "Sometimes shorter, in fact — and still not a proof." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-pythagorean-family",
  title: "3.2 · The Pythagorean Family",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Textbooks list three Pythagorean identities. There is only one, plus a division you can do in your head.",
    },
    { type: "math", latex: "\\sin^2\\theta + \\cos^2\\theta = 1" },
    {
      type: "text",
      content:
        "**Divide every term by $\\cos^2\\theta$.** (Legal wherever $\\cos\\theta \\ne 0$.)",
    },
    {
      type: "math",
      latex:
        "\\frac{\\sin^2\\theta}{\\cos^2\\theta} + \\frac{\\cos^2\\theta}{\\cos^2\\theta} = \\frac{1}{\\cos^2\\theta} \\quad\\Longrightarrow\\quad \\tan^2\\theta + 1 = \\sec^2\\theta",
    },
    {
      type: "text",
      content:
        "**Now divide the original by $\\sin^2\\theta$ instead:**",
    },
    {
      type: "math",
      latex:
        "\\frac{\\sin^2\\theta}{\\sin^2\\theta} + \\frac{\\cos^2\\theta}{\\sin^2\\theta} = \\frac{1}{\\sin^2\\theta} \\quad\\Longrightarrow\\quad 1 + \\cot^2\\theta = \\csc^2\\theta",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Three identities, one fact, two divisions",
      content:
        "Do not memorize the second and third. If you need $1 + \\tan^2 = \\sec^2$, write $\\sin^2 + \\cos^2 = 1$ and divide by $\\cos^2$ — ten seconds, and you cannot misremember which is which. A useful check: the function that ends up alone on the right is the reciprocal of whatever you divided by.",
    },
    {
      type: "text",
      content:
        "These earn their keep in two situations.\n\n**Swapping squares.** Any $\\sin^2$ can become $1 - \\cos^2$ and vice versa. That is how a mixed expression is reduced to a single function — the central move of Chapter 4.2.\n\n**Killing radicals.** Expressions like $\\sqrt{1 - \\sin^2\\theta}$ collapse to $|\\cos\\theta|$, which is why these identities reappear all over integral calculus.",
    },
    {
      type: "text",
      content:
        "Worked example: simplify $\\dfrac{\\sec^2\\theta - 1}{\\sec^2\\theta}$.\n\nThe numerator is $\\tan^2\\theta$ by the first division. So the fraction is $\\frac{\\tan^2\\theta}{\\sec^2\\theta}$. Convert to sine and cosine:",
    },
    {
      type: "math",
      latex:
        "\\frac{\\tan^2\\theta}{\\sec^2\\theta} = \\frac{\\sin^2\\theta/\\cos^2\\theta}{1/\\cos^2\\theta} = \\sin^2\\theta",
    },
    {
      type: "quiz",
      id: "t3-2-q1",
      variant: "practice",
      question: "Simplify $(1 - \\cos^2\\theta)\\csc^2\\theta$.",
      options: [
        { text: "$1$", correct: true, feedback: "$1 - \\cos^2\\theta = \\sin^2\\theta$, and $\\csc^2\\theta = \\frac{1}{\\sin^2\\theta}$ — they cancel." },
        { text: "$\\sin^2\\theta$", feedback: "You applied the Pythagorean swap but dropped the cosecant factor." },
        { text: "$\\cot^2\\theta$", feedback: "That would need $\\cos^2\\theta \\cdot \\csc^2\\theta$ instead." },
      ],
    },
    {
      type: "quiz",
      id: "t3-2-q2",
      variant: "concept",
      question:
        "You need an identity linking $\\cot$ and $\\csc$ but cannot recall it. What is the fastest safe route?",
      options: [
        {
          text: "Write $\\sin^2 + \\cos^2 = 1$ and divide every term by $\\sin^2\\theta$.",
          correct: true,
          feedback: "Dividing by $\\sin^2$ produces cotangent and cosecant, by construction.",
        },
        { text: "Divide by $\\cos^2\\theta$.", feedback: "That produces the tangent/secant version instead." },
        { text: "Guess $1 + \\csc^2 = \\cot^2$ and check a value.", feedback: "It is backwards — cosecant is the larger one — and guessing is what this method exists to avoid." },
      ],
    },
    {
      type: "quiz",
      id: "t3-2-q3",
      variant: "practice",
      question: "Rewrite $\\tan^2\\theta - \\sec^2\\theta$ as a constant.",
      options: [
        { text: "$-1$", correct: true, feedback: "From $\\tan^2 + 1 = \\sec^2$, subtracting gives $\\tan^2 - \\sec^2 = -1$." },
        { text: "$1$", feedback: "Sign flipped — secant is the bigger of the two, so the difference is negative." },
        { text: "$0$", feedback: "They differ by exactly 1, never by 0." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "angle-sum-and-difference",
  title: "3.3 · Angle Sum and Difference",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "This is the one identity worth deriving slowly, because almost everything in the rest of the chapter is a special case of it.\n\nFirst, kill the tempting wrong answer. Is $\\sin(\\alpha + \\beta) = \\sin\\alpha + \\sin\\beta$? Test it with $\\alpha = \\beta = \\frac{\\pi}{2}$: the left is $\\sin\\pi = 0$, the right is $1 + 1 = 2$. Sine is not linear, and no trig function distributes over addition.",
    },
    {
      type: "text",
      content:
        "The real formula comes from a construction. Stack two right triangles: rotate through $\\alpha$, then a further $\\beta$, and land on a point $P$ at distance 1 from the origin.\n\nIn the inner triangle, $OQ = \\cos\\beta$ and $QP = \\sin\\beta$. Project each of those onto the axes using the angle $\\alpha$, and every segment of the picture becomes a *product* of two ratios.",
    },
    {
      type: "interactive",
      config: {
        component: "identity-diagram",
        initialAlpha: 30,
        initialBeta: 25,
        highlight: "both",
        caption:
          "Height of P = QR + PT = sinα·cosβ + cosα·sinβ. Horizontal position of P = OR − QT = cosα·cosβ − sinα·sinβ. Move the sliders: the numbers keep agreeing.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Angle sum formulas",
      content:
        "$\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$\n$\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$",
    },
    {
      type: "text",
      content:
        "Two features are worth burning in, because they are what people get wrong:\n\n**Sine mixes, cosine matches.** The sine formula pairs sine with cosine in both terms; the cosine formula pairs like with like.\n**Cosine flips the sign.** A plus inside becomes a minus in the middle. It comes from the subtraction in the construction — the horizontal position of $P$ is reduced by the width $QT$.",
    },
    {
      type: "text",
      content:
        "**The difference formulas come free.** Replace $\\beta$ by $-\\beta$ and use the symmetry facts of Chapter 1.2, $\\cos(-\\beta) = \\cos\\beta$ and $\\sin(-\\beta) = -\\sin\\beta$:",
    },
    {
      type: "math",
      latex:
        "\\sin(\\alpha - \\beta) = \\sin\\alpha\\cos\\beta - \\cos\\alpha\\sin\\beta, \\qquad \\cos(\\alpha - \\beta) = \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta",
    },
    {
      type: "text",
      content:
        "So there are not four formulas to hold — there are two, plus the rule that swapping to a difference flips both middle signs.\n\nTangent's version follows by dividing the sine formula by the cosine formula and then dividing top and bottom by $\\cos\\alpha\\cos\\beta$:",
    },
    {
      type: "math",
      latex:
        "\\tan(\\alpha + \\beta) = \\frac{\\tan\\alpha + \\tan\\beta}{1 - \\tan\\alpha\\tan\\beta}",
    },
    {
      type: "text",
      content:
        "**Immediate payoff.** Exact values for angles that are not on the standard list. For instance $75^\\circ = 45^\\circ + 30^\\circ$:",
    },
    {
      type: "math",
      latex:
        "\\sin 75^\\circ = \\sin 45^\\circ\\cos 30^\\circ + \\cos 45^\\circ\\sin 30^\\circ = \\frac{\\sqrt2}{2}\\cdot\\frac{\\sqrt3}{2} + \\frac{\\sqrt2}{2}\\cdot\\frac12 = \\frac{\\sqrt6 + \\sqrt2}{4}",
    },
    {
      type: "quiz",
      id: "t3-3-q1",
      variant: "concept",
      question: "Expand $\\cos(x - y)$.",
      options: [
        { text: "$\\cos x\\cos y + \\sin x\\sin y$", correct: true, feedback: "Cosine matches like with like, and the difference version carries a plus in the middle." },
        { text: "$\\cos x\\cos y - \\sin x\\sin y$", feedback: "That is $\\cos(x + y)$. The difference flips that middle sign." },
        { text: "$\\cos x - \\cos y$", feedback: "The distributive error — test it at $x = \\pi$, $y = \\pi$." },
      ],
    },
    {
      type: "quiz",
      id: "t3-3-q2",
      variant: "practice",
      question: "Which computation gives the exact value of $\\cos 15^\\circ$?",
      options: [
        { text: "$\\cos(45^\\circ - 30^\\circ) = \\cos45^\\circ\\cos30^\\circ + \\sin45^\\circ\\sin30^\\circ$", correct: true, feedback: "Yielding $\\frac{\\sqrt6+\\sqrt2}{4}$ — and $60^\\circ - 45^\\circ$ works just as well." },
        { text: "$\\cos 45^\\circ - \\cos 30^\\circ$", feedback: "Cosine does not distribute; this even comes out negative, while $\\cos15^\\circ$ is close to 1." },
        { text: "$\\frac{1}{2}\\cos 30^\\circ$", feedback: "Halving the angle is not halving the value — that is what 3.4 exists to fix." },
      ],
    },
    {
      type: "quiz",
      id: "t3-3-q3",
      variant: "concept",
      question:
        "Using the sum formula, simplify $\\sin\\left(x + \\frac{\\pi}{2}\\right)$.",
      options: [
        { text: "$\\cos x$", correct: true, feedback: "$\\sin x\\cos\\frac{\\pi}{2} + \\cos x\\sin\\frac{\\pi}{2} = 0 + \\cos x$ — the shift relationship from 2.2, now proved." },
        { text: "$-\\cos x$", feedback: "That is $\\sin\\left(x - \\frac{\\pi}{2}\\right)$." },
        { text: "$\\sin x + 1$", feedback: "The distributive error again." },
      ],
      hint: "Substitute the exact values of $\\sin\\frac{\\pi}{2}$ and $\\cos\\frac{\\pi}{2}$ and watch a term vanish.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "double-and-half-angle",
  title: "3.4 · Double and Half Angle",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "There is nothing new in this lesson. Every formula in it is the angle-sum formula with $\\beta$ set equal to $\\alpha$ — which is exactly how you should reconstruct them when your memory fails.",
    },
    { type: "math", latex: "\\sin 2\\theta = \\sin(\\theta + \\theta) = \\sin\\theta\\cos\\theta + \\cos\\theta\\sin\\theta = 2\\sin\\theta\\cos\\theta" },
    { type: "math", latex: "\\cos 2\\theta = \\cos(\\theta + \\theta) = \\cos^2\\theta - \\sin^2\\theta" },
    {
      type: "text",
      content:
        "The cosine version has three faces, and which one you want depends on what you are trying to eliminate. Feed the Pythagorean identity into it:",
    },
    {
      type: "math",
      latex:
        "\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = 1 - 2\\sin^2\\theta = 2\\cos^2\\theta - 1",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Which form to reach for",
      content:
        "Need everything in **sine**? Use $1 - 2\\sin^2\\theta$. Everything in **cosine**? Use $2\\cos^2\\theta - 1$. All three are the same statement — derived by substituting $\\sin^2 = 1 - \\cos^2$ (or the reverse) into the first one.",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "cos 2x", expr: "cos(2*x)", latex: "\\cos 2x", excluded: [] },
          { label: "1 − 2sin²x", expr: "1 - 2*sin(x)^2", latex: "1 - 2\\sin^2 x", excluded: [] },
          { label: "2cos²x − 1", expr: "2*cos(x)^2 - 1", latex: "2\\cos^2 x - 1", excluded: [] },
        ],
        window: { xmin: -6.5, xmax: 6.5, ymin: -3.5, ymax: 3.5 },
      },
    },
    {
      type: "text",
      content:
        "Three labels, one curve. Flip between them and nothing moves.\n\n**Half-angle by rearrangement.** Take $\\cos 2\\theta = 1 - 2\\sin^2\\theta$ and solve for $\\sin^2\\theta$:",
    },
    { type: "math", latex: "\\sin^2\\theta = \\frac{1 - \\cos 2\\theta}{2}, \\qquad \\cos^2\\theta = \\frac{1 + \\cos 2\\theta}{2}" },
    {
      type: "text",
      content:
        "Now substitute $\\theta = \\frac{x}{2}$, so $2\\theta = x$:",
    },
    {
      type: "math",
      latex:
        "\\sin\\frac{x}{2} = \\pm\\sqrt{\\frac{1 - \\cos x}{2}}, \\qquad \\cos\\frac{x}{2} = \\pm\\sqrt{\\frac{1 + \\cos x}{2}}",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The $\\pm$ is not decoration",
      content:
        "The square root cannot know which sign you want — only the quadrant of $\\frac{x}{2}$ can decide. Exactly the situation from Chapter 1.4: algebra offers both, geometry picks one.",
    },
    {
      type: "text",
      content:
        "The half-angle forms without the root — $\\sin^2\\theta = \\frac{1 - \\cos 2\\theta}{2}$ — have a second life in calculus, where they are the standard trick for integrating $\\sin^2$ and $\\cos^2$. Squares are hard to integrate; a plain cosine is easy.",
    },
    {
      type: "quiz",
      id: "t3-4-q1",
      variant: "practice",
      question: "If $\\sin\\theta = \\dfrac{3}{5}$ and $\\theta$ is in quadrant I, what is $\\sin 2\\theta$?",
      options: [
        { text: "$\\dfrac{24}{25}$", correct: true, feedback: "$\\cos\\theta = \\frac45$, so $2\\sin\\theta\\cos\\theta = 2\\cdot\\frac35\\cdot\\frac45$." },
        { text: "$\\dfrac{6}{5}$", feedback: "That is $2\\sin\\theta$ — doubling the angle is not doubling the value, and no sine exceeds 1." },
        { text: "$\\dfrac{7}{25}$", feedback: "That is $\\cos 2\\theta = 1 - 2\\left(\\frac35\\right)^2$." },
      ],
    },
    {
      type: "quiz",
      id: "t3-4-q2",
      variant: "concept",
      question: "Which is *not* equal to $\\cos 2\\theta$?",
      options: [
        { text: "$2\\sin^2\\theta - 1$", correct: true, feedback: "Sign error: the sine version is $1 - 2\\sin^2\\theta$. This one is its negative." },
        { text: "$\\cos^2\\theta - \\sin^2\\theta$", feedback: "The direct expansion from the sum formula." },
        { text: "$2\\cos^2\\theta - 1$", feedback: "Obtained by substituting $\\sin^2 = 1 - \\cos^2$." },
      ],
    },
    {
      type: "quiz",
      id: "t3-4-q3",
      variant: "concept",
      question:
        "You have forgotten the double-angle formula for sine. What is the fastest reconstruction?",
      options: [
        {
          text: "Write $\\sin(\\theta + \\theta)$ and expand with the angle-sum formula.",
          correct: true,
          feedback: "The two terms are identical, so they add to $2\\sin\\theta\\cos\\theta$.",
        },
        { text: "Assume $\\sin 2\\theta = 2\\sin\\theta$ and check later.", feedback: "It fails at $\\theta = \\frac{\\pi}{2}$: the left is 0, the right is 2." },
        { text: "Look up the half-angle formula and invert it.", feedback: "Possible but a detour; the sum formula is the parent of both." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "rewriting-products-and-sums",
  title: "3.5 · Rewriting Products and Sums",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A short lesson, and a consequence rather than a new idea. Write the sum and difference formulas for cosine one above the other:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned}\\cos(\\alpha - \\beta) &= \\cos\\alpha\\cos\\beta + \\sin\\alpha\\sin\\beta\\\\ \\cos(\\alpha + \\beta) &= \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta\\end{aligned}",
    },
    {
      type: "text",
      content:
        "**Add them** and the sine terms cancel. **Subtract them** and the cosine terms cancel. Either way, a product becomes a sum:",
    },
    {
      type: "math",
      latex:
        "\\cos\\alpha\\cos\\beta = \\tfrac{1}{2}\\bigl[\\cos(\\alpha-\\beta) + \\cos(\\alpha+\\beta)\\bigr], \\qquad \\sin\\alpha\\sin\\beta = \\tfrac{1}{2}\\bigl[\\cos(\\alpha-\\beta) - \\cos(\\alpha+\\beta)\\bigr]"
    },
    {
      type: "text",
      content:
        "Doing the same with the two sine formulas gives the mixed case:",
    },
    {
      type: "math",
      latex:
        "\\sin\\alpha\\cos\\beta = \\tfrac{1}{2}\\bigl[\\sin(\\alpha+\\beta) + \\sin(\\alpha-\\beta)\\bigr]",
    },
    {
      type: "callout",
      variant: "info",
      title: "Why anyone cares: beats",
      content:
        "Two tuning forks at 440 Hz and 444 Hz sound together. The combined pressure is a sum of two sines, and the sum-to-product identity rewrites it as a single 442 Hz tone multiplied by a slow $2$ Hz envelope. You hear one note pulsing four times a second — the **beat frequency**, which is the *difference* of the two frequencies. That is why piano tuners listen for the beats to disappear.",
    },
    {
      type: "text",
      content:
        "Read backwards, the same identities turn sums into products:",
    },
    {
      type: "math",
      latex:
        "\\sin A + \\sin B = 2\\sin\\!\\left(\\frac{A+B}{2}\\right)\\cos\\!\\left(\\frac{A-B}{2}\\right)",
    },
    {
      type: "text",
      content:
        "The half-sum and half-difference in there are the average frequency and the beat envelope, in exactly the acoustic sense above. And this direction is what makes such sums solvable in Chapter 4 — a product equals zero when one factor does, whereas a sum offers no such handle.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Do not memorize these",
      content:
        "Six formulas, all obtainable in one line by adding or subtracting two you already have. When you meet one in the wild, ask which pair of sum/difference formulas produces the terms you see, and add or subtract them.",
    },
    {
      type: "quiz",
      id: "t3-5-q1",
      variant: "concept",
      question:
        "Adding the sum and difference formulas for cosine eliminates which terms?",
      options: [
        { text: "The $\\sin\\alpha\\sin\\beta$ terms, since they carry opposite signs.", correct: true, feedback: "Leaving $2\\cos\\alpha\\cos\\beta$, which gives the product-to-sum formula." },
        { text: "The $\\cos\\alpha\\cos\\beta$ terms.", feedback: "Those have the same sign in both, so adding doubles them." },
        { text: "Nothing cancels; you must subtract.", feedback: "Subtracting cancels the *cosine* products instead — both operations are useful." },
      ],
    },
    {
      type: "quiz",
      id: "t3-5-q2",
      variant: "practice",
      question: "Two notes at 300 Hz and 306 Hz are played together. How many beats per second are heard?",
      options: [
        { text: "6", correct: true, feedback: "The beat rate is the difference of the frequencies, which the sum-to-product form makes explicit." },
        { text: "303", feedback: "That is the average — the pitch you hear, not the pulsing rate." },
        { text: "3", feedback: "Half the difference appears inside the envelope, but the envelope's magnitude peaks twice per cycle, giving 6 beats." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "the-derivation-game",
  title: "3.6 · The Derivation Game",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Everything in this chapter came from a handful of facts. Here is the complete list — the only things worth committing to memory in all of trigonometry.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The core set",
      content:
        "1. **Pythagoras:** $\\sin^2\\theta + \\cos^2\\theta = 1$ (the circle's own equation).\n2. **Angle sum:** $\\sin(\\alpha+\\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$ and $\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$.\n3. **Circle symmetry:** $\\sin(-\\theta) = -\\sin\\theta$, $\\cos(-\\theta) = \\cos\\theta$, and $\\cos\\theta = \\sin\\left(\\theta + \\frac{\\pi}{2}\\right)$.\n\nPlus two definitions: $\\tan = \\frac{\\sin}{\\cos}$, and the reciprocals $\\sec, \\csc, \\cot$.",
    },
    {
      type: "text",
      content:
        "Everything else is a *path* from that core. The game is to name the path before doing any algebra.",
    },
    {
      type: "table",
      headers: ["Target", "Path from the core"],
      rows: [
        ["$1 + \\tan^2 = \\sec^2$", "Pythagoras, divided by $\\cos^2$"],
        ["$1 + \\cot^2 = \\csc^2$", "Pythagoras, divided by $\\sin^2$"],
        ["$\\sin(\\alpha - \\beta)$", "Angle sum with $\\beta \\to -\\beta$, then symmetry"],
        ["$\\sin 2\\theta$", "Angle sum with $\\beta = \\alpha$"],
        ["$\\cos 2\\theta$ (three forms)", "Angle sum with $\\beta = \\alpha$, then Pythagoras twice"],
        ["Half angle", "Rearrange $\\cos 2\\theta$, then substitute $\\theta \\to \\frac{x}{2}$"],
        ["Product to sum", "Add or subtract two angle-sum formulas"],
        ["$\\tan(\\alpha+\\beta)$", "Divide the two sum formulas, then divide through by $\\cos\\alpha\\cos\\beta$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "The three questions to ask when stuck",
      content:
        "1. **Can I write everything in sine and cosine?** Usually yes, and usually it helps.\n2. **Is there a hidden $\\sin^2 + \\cos^2$?** Look for a $1$ that wants to be split, or a pair that wants to be joined.\n3. **Is a double or half angle in sight?** If the two sides use different angles ($2x$ and $x$, say), the sum formula is the bridge.",
    },
    {
      type: "text",
      content:
        "Try one under the rules. Prove $\\dfrac{\\sin 2\\theta}{1 + \\cos 2\\theta} = \\tan\\theta$.\n\nStart on the left (messier). Use the double-angle forms — $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$, and choose the cosine version that makes the denominator collapse, $\\cos 2\\theta = 2\\cos^2\\theta - 1$:",
    },
    {
      type: "math",
      latex:
        "\\frac{2\\sin\\theta\\cos\\theta}{1 + 2\\cos^2\\theta - 1} = \\frac{2\\sin\\theta\\cos\\theta}{2\\cos^2\\theta} = \\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta",
    },
    {
      type: "text",
      content:
        "The whole proof hinged on picking the *right* face of $\\cos 2\\theta$ — the one whose $-1$ cancels the $+1$. That choice is the skill; the algebra afterwards is routine.",
    },
    {
      type: "quiz",
      id: "t3-6-q1",
      variant: "concept",
      question:
        "To prove $\\dfrac{1 - \\cos 2\\theta}{\\sin 2\\theta} = \\tan\\theta$, which form of $\\cos 2\\theta$ should you choose?",
      options: [
        { text: "$1 - 2\\sin^2\\theta$", correct: true, feedback: "Then the numerator becomes $2\\sin^2\\theta$, and the $\\cos\\theta$ in the denominator survives to make a tangent." },
        { text: "$2\\cos^2\\theta - 1$", feedback: "That leaves $2 - 2\\cos^2\\theta$ — recoverable, but a longer road." },
        { text: "$\\cos^2\\theta - \\sin^2\\theta$", feedback: "Nothing cancels against the 1; you would still have to convert." },
      ],
      hint: "You want the $1$ in the numerator to disappear.",
    },
    {
      type: "quiz",
      id: "t3-6-q2",
      variant: "concept",
      question:
        "Which of these is *not* in the core set — i.e. must be derived rather than remembered?",
      options: [
        { text: "$\\sin\\alpha\\cos\\beta = \\frac12[\\sin(\\alpha+\\beta) + \\sin(\\alpha-\\beta)]$", correct: true, feedback: "A product-to-sum formula: obtained by adding two angle-sum formulas." },
        { text: "$\\sin^2\\theta + \\cos^2\\theta = 1$", feedback: "Core — it is the circle's equation." },
        { text: "$\\cos(\\alpha+\\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$", feedback: "Core — the angle-sum construction from 3.3." },
      ],
    },
    {
      type: "quiz",
      id: "t3-6-q3",
      variant: "practice",
      question: "Simplify $\\dfrac{\\cos^2\\theta - \\sin^2\\theta}{\\cos\\theta + \\sin\\theta}$.",
      options: [
        { text: "$\\cos\\theta - \\sin\\theta$", correct: true, feedback: "The numerator is a difference of squares, $(\\cos + \\sin)(\\cos - \\sin)$; the common factor cancels." },
        { text: "$\\cos 2\\theta$", feedback: "The numerator alone is $\\cos 2\\theta$ — but the denominator is still there." },
        { text: "$1$", feedback: "That would need the numerator to be $\\cos^2 + \\sin^2$, with a plus." },
      ],
      hint: "Before reaching for an identity, check whether it factors.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "trig-chapter-3-mastery",
  title: "3.7 · Chapter 3 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Unseen identities, under time. For each one, decide the *path* first — which core fact, and in which direction — and only then check the option list.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in three lines",
      content:
        "1. An identity is true for all valid inputs; prove it by transforming one side.\n2. The core set is Pythagoras, angle sum, and circle symmetry. Everything else is a derivation.\n3. When stuck: convert to sine and cosine, hunt for a hidden Pythagoras, or bridge different angles with the sum formula.",
    },
    {
      type: "quiz",
      id: "t3-m-q1",
      variant: "mastery",
      question: "Simplify $\\cos^4\\theta - \\sin^4\\theta$.",
      options: [
        { text: "$\\cos 2\\theta$", correct: true, feedback: "Difference of squares gives $(\\cos^2+\\sin^2)(\\cos^2-\\sin^2) = 1 \\cdot \\cos 2\\theta$." },
        { text: "$1$", feedback: "That is $\\left(\\cos^2 + \\sin^2\\right)^2$'s first factor only; the second factor is not 1." },
        { text: "$\\cos 4\\theta$", feedback: "Fourth powers are not quadruple angles — factor rather than guess." },
      ],
    },
    {
      type: "quiz",
      id: "t3-m-q2",
      variant: "mastery",
      question: "Express $\\sin 3\\theta$ using the core set.",
      options: [
        {
          text: "$\\sin(2\\theta + \\theta) = \\sin2\\theta\\cos\\theta + \\cos2\\theta\\sin\\theta$",
          correct: true,
          feedback: "Split the angle, apply the sum formula, then expand the double angles if a fully expanded form is wanted.",
        },
        { text: "$3\\sin\\theta$", feedback: "Fails at $\\theta = \\frac{\\pi}{2}$: the left is $-1$, the right is 3." },
        { text: "$\\sin\\theta\\cdot\\sin2\\theta$", feedback: "No identity turns a sum of angles into a product of sines." },
      ],
    },
    {
      type: "quiz",
      id: "t3-m-q3",
      variant: "mastery",
      question: "Which is equivalent to $\\dfrac{1}{1 - \\sin\\theta} + \\dfrac{1}{1 + \\sin\\theta}$?",
      options: [
        { text: "$2\\sec^2\\theta$", correct: true, feedback: "Common denominator gives $\\frac{2}{1 - \\sin^2\\theta} = \\frac{2}{\\cos^2\\theta}$." },
        { text: "$2\\csc^2\\theta$", feedback: "That would need $\\sin^2$ underneath; the Pythagorean swap gives $\\cos^2$." },
        { text: "$\\dfrac{2}{\\sin^2\\theta}$", feedback: "Same slip — $1 - \\sin^2\\theta$ is $\\cos^2\\theta$, not $\\sin^2\\theta$." },
      ],
      hint: "Add the fractions first; the denominator becomes a difference of squares.",
    },
    {
      type: "quiz",
      id: "t3-m-q4",
      variant: "mastery",
      question: "If $\\cos\\theta = \\dfrac{1}{3}$, what is $\\cos 2\\theta$?",
      options: [
        { text: "$-\\dfrac{7}{9}$", correct: true, feedback: "$2\\cos^2\\theta - 1 = \\frac29 - 1$. The cosine form is the one that needs no extra information." },
        { text: "$\\dfrac{2}{3}$", feedback: "That doubles the value rather than the angle." },
        { text: "It cannot be found without the quadrant.", feedback: "This is the merit of the $2\\cos^2 - 1$ form: no sign ambiguity, so no quadrant needed." },
      ],
    },
    {
      type: "quiz",
      id: "t3-m-q5",
      variant: "mastery",
      question: "Prove or refute: $\\sec\\theta - \\cos\\theta = \\sin\\theta\\tan\\theta$.",
      options: [
        {
          text: "True — $\\frac{1}{\\cos\\theta} - \\cos\\theta = \\frac{1-\\cos^2\\theta}{\\cos\\theta} = \\frac{\\sin^2\\theta}{\\cos\\theta}$.",
          correct: true,
          feedback: "And $\\frac{\\sin^2\\theta}{\\cos\\theta} = \\sin\\theta \\cdot \\frac{\\sin\\theta}{\\cos\\theta} = \\sin\\theta\\tan\\theta$.",
        },
        { text: "False — the two sides differ at $\\theta = \\frac{\\pi}{4}$.", feedback: "Both give $\\sqrt2 - \\frac{\\sqrt2}{2} = \\frac{\\sqrt2}{2}$ there." },
        { text: "True, but only for acute $\\theta$.", feedback: "The derivation never assumed a quadrant — only that $\\cos\\theta \\ne 0$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Identities rewrite; they do not solve. Chapter 4 turns the machinery backwards: given a value, find *every* angle that produces it — and identities become the tool that reduces a messy equation to one you can actually solve.",
    },
  ]),
};

export const trigChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
