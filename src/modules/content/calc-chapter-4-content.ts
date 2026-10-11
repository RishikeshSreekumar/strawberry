import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Calculus Chapter 4 — Applications of Derivatives.
 * The derivative read as a rate (related rates, approximations and
 * errors) and as a slope (tangents and normals, subtangent and
 * subnormal, angles between curves, monotonicity), plus Rolle's theorem
 * and Lagrange's mean value theorem. Seeded by scripts/seed-calculus.ts.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "rates-of-change",
  title: "4.1 · Rates of Change and Related Rates",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Blow steadily into a balloon. You push air in at a constant rate, yet the balloon's radius grows quickly at first and then more and more slowly. Nothing about your breathing changed. What changed is the *relationship* between volume and radius: a big balloon needs a lot of extra air to grow its radius by one millimetre.\n\nThat is the whole chapter in one breath. Two quantities are tied together by a formula; both change with time; the derivative tells you how the rate of one controls the rate of the other.",
    },
    { type: "heading", text: "The derivative as a rate" },
    {
      type: "text",
      content:
        "Since Chapter 2, $\\frac{dy}{dx}$ has meant the instantaneous rate at which $y$ changes per unit change in $x$. When the independent variable is time, $\\frac{dy}{dt}$ is a speed: how fast $y$ is changing *right now*. When it is something else, it is still a rate: $\\frac{dA}{dr}$ is how fast a circle's area grows per unit of radius.",
    },
    {
      type: "math",
      latex: "A = \\pi r^2 \\quad\\Longrightarrow\\quad \\frac{dA}{dr} = 2\\pi r",
    },
    {
      type: "text",
      content:
        "Look at the picture behind that formula. Grow the radius by a thin $\\Delta r$ and the extra area is a thin ring. Unroll the ring: it is almost a rectangle of length $2\\pi r$ (the circumference) and width $\\Delta r$. So the area grows at the rate of the circumference. The same story makes $\\frac{dV}{dr} = 4\\pi r^2$ for a sphere: the new volume is a thin skin whose area is the surface area.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Rate of change",
      content:
        "If $y = f(x)$, then $\\frac{dy}{dx} = f'(x)$ is the rate of change of $y$ with respect to $x$. If both depend on time $t$, the chain rule links their rates:\n$$\\frac{dy}{dt} = \\frac{dy}{dx}\\cdot\\frac{dx}{dt}.$$",
    },
    { type: "heading", text: "The related-rates recipe" },
    {
      type: "text",
      content:
        "In a related-rates problem you are told one rate and asked for another. Every such problem yields to the same five steps:\n\n1. **Draw** the situation at a general moment, not at the special moment in the question.\n2. **Name** every changing quantity with a letter, and write down the given rate and the wanted rate as derivatives with respect to $t$.\n3. **Relate** the quantities with an equation true at *every* moment (geometry: Pythagoras, similar triangles, volume formulas).\n4. **Differentiate** both sides with respect to $t$, using the chain rule on every letter.\n5. **Substitute** the values at the special moment, last of all, and solve for the wanted rate.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"plug in the numbers first\"",
      content:
        "If the ladder's foot is 4 m from the wall *at this instant* and you write $x = 4$ before differentiating, then $\\frac{dx}{dt} = 0$: you have frozen the ladder. A value that holds only at one moment must enter **after** differentiating. Only quantities that are constant for the whole motion (the ladder's length, the tank's shape) may be substituted early.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "calc4-1-we1",
      title: "Worked example 1: the balloon",
      problem:
        "Air is pumped into a spherical balloon at $100\\ \\text{cm}^3/\\text{s}$. How fast is the radius increasing when the radius is $10$ cm?",
      steps: [
        { text: "Name: $V$ volume, $r$ radius. Given $\\frac{dV}{dt} = 100$; wanted $\\frac{dr}{dt}$ when $r = 10$." },
        { text: "Relate, valid at every moment:", latex: "V = \\tfrac43\\pi r^3" },
        {
          text: "Differentiate with respect to $t$. *Why this step:* $r$ depends on $t$, so the chain rule brings out $\\frac{dr}{dt}$.",
          latex: "\\frac{dV}{dt} = 4\\pi r^2\\,\\frac{dr}{dt}",
        },
        {
          text: "Now substitute $r = 10$:",
          latex: "100 = 4\\pi(100)\\frac{dr}{dt} \\;\\Longrightarrow\\; \\frac{dr}{dt} = \\frac{1}{4\\pi} \\approx 0.0796\\ \\text{cm/s}",
        },
      ],
      answer: "$\\frac{dr}{dt} = \\frac{1}{4\\pi} \\approx 0.080$ cm/s. A bigger balloon grows its radius more slowly for the same air supply.",
    },
    {
      type: "worked-example",
      id: "calc4-1-we2",
      title: "Worked example 2: the sliding ladder",
      problem:
        "A 5 m ladder leans against a wall. Its foot slides away from the wall at $2$ m/s. How fast is the top sliding down when the foot is $4$ m from the wall?",
      steps: [
        { text: "Name: $x$ = foot's distance from the wall, $y$ = height of the top. Given $\\frac{dx}{dt} = 2$; wanted $\\frac{dy}{dt}$ when $x = 4$." },
        { text: "Relate (Pythagoras, true at every moment; the length 5 never changes):", latex: "x^2 + y^2 = 25" },
        { text: "Differentiate:", latex: "2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0 \\;\\Longrightarrow\\; \\frac{dy}{dt} = -\\frac{x}{y}\\frac{dx}{dt}" },
        {
          text: "At the moment: $x = 4$ gives $y = 3$. *Why this step:* the height at that instant comes from the same relation, now that differentiating is done.",
          latex: "\\frac{dy}{dt} = -\\frac{4}{3}(2) = -\\frac{8}{3}\\ \\text{m/s}",
        },
      ],
      answer: "The top slides down at $\\frac83 \\approx 2.67$ m/s (the minus sign means $y$ is decreasing).",
    },
    {
      type: "worked-example",
      id: "calc4-1-we3",
      title: "Worked example 3: filling a cone",
      problem:
        "A conical tank, vertex down, has height 10 m and top radius 5 m. Water flows in at $2\\ \\text{m}^3/\\text{min}$. How fast is the water level rising when the water is 4 m deep?",
      steps: [
        {
          text: "The water forms a smaller cone of depth $h$ and radius $r$. Similar triangles: $\\frac{r}{h} = \\frac{5}{10}$, so $r = \\frac h2$. *Why this step:* eliminating $r$ leaves one changing quantity, $h$.",
        },
        { text: "Volume in terms of $h$ alone:", latex: "V = \\tfrac13\\pi r^2 h = \\tfrac13\\pi\\left(\\tfrac h2\\right)^2 h = \\frac{\\pi h^3}{12}" },
        { text: "Differentiate:", latex: "\\frac{dV}{dt} = \\frac{\\pi h^2}{4}\\,\\frac{dh}{dt}" },
        { text: "Substitute $h = 4$, $\\frac{dV}{dt} = 2$:", latex: "2 = \\frac{16\\pi}{4}\\frac{dh}{dt} \\;\\Longrightarrow\\; \\frac{dh}{dt} = \\frac{1}{2\\pi} \\approx 0.159\\ \\text{m/min}" },
      ],
      answer: "The level rises at $\\frac{1}{2\\pi} \\approx 0.16$ m/min, and it slows as the cone widens.",
    },
    {
      type: "worked-example",
      id: "calc4-1-we4",
      title: "Worked example 4: the shadow",
      problem:
        "A lamp hangs 6 m above the ground. A person 2 m tall walks directly away from the foot of the lamp post at $1.5$ m/s. How fast does the shadow lengthen, and how fast does the tip of the shadow move?",
      steps: [
        { text: "Name: $x$ = person's distance from the post, $s$ = shadow length. Given $\\frac{dx}{dt} = 1.5$." },
        {
          text: "Similar triangles (lamp-to-tip and head-to-tip):",
          latex: "\\frac{6}{x + s} = \\frac{2}{s} \\;\\Longrightarrow\\; 6s = 2x + 2s \\;\\Longrightarrow\\; s = \\frac{x}{2}",
        },
        { text: "Differentiate: $\\frac{ds}{dt} = \\frac12\\cdot 1.5 = 0.75$ m/s. *Why this step:* the ratio $s = \\frac x2$ holds at every moment, so it can be differentiated directly." },
        { text: "The tip is at distance $x + s$ from the post: $\\frac{d}{dt}(x + s) = 1.5 + 0.75 = 2.25$ m/s." },
      ],
      answer: "Shadow lengthens at $0.75$ m/s; its tip moves at $2.25$ m/s, independent of where the person is.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "calc4-1-q1",
      variant: "practice",
      question: "The radius of a circle grows at $0.3$ cm/s. How fast is its area growing when the radius is $10$ cm? Give the value in cm²/s.",
      answer: 18.85,
      relTolerance: 0.01,
      unit: "cm²/s",
      hint: "$\\frac{dA}{dt} = 2\\pi r\\,\\frac{dr}{dt}$.",
      solution: "$\\frac{dA}{dt} = 2\\pi(10)(0.3) = 6\\pi \\approx 18.85$ cm²/s.",
      commonMistakes: [
        { answer: 9.42, tolerance: 0.05, feedback: "That is $3\\pi$: the derivative of $\\pi r^2$ is $2\\pi r$, not $\\pi r$." },
        { answer: 6, feedback: "You dropped the $\\pi$: the answer is $6\\pi$." },
      ],
    },
    {
      type: "quiz",
      id: "calc4-1-q2",
      variant: "concept",
      question:
        "In the ladder problem, a student writes $x = 4$ and $x^2 + y^2 = 25$, gets $16 + y^2 = 25$ and then differentiates. What goes wrong?",
      options: [
        {
          text: "The equation $16 + y^2 = 25$ forces $y$ to be constant, so they get $\\frac{dy}{dt} = 0$.",
          correct: true,
          feedback: "Substituting the instantaneous value first freezes the motion. Differentiate the general relation, then substitute.",
        },
        { text: "Nothing: substituting early is just faster.", feedback: "It is faster to a wrong answer: $16 + y^2 = 25$ has derivative $2y\\,y' = 0$, so $y' = 0$." },
        { text: "They should have used $x = 3$.", feedback: "The given position is $x = 4$; the issue is *when* it is substituted, not its value." },
      ],
      hint: "What does $x = 4$ say about $\\frac{dx}{dt}$ if it is treated as true at every moment?",
    },
    {
      type: "numeric",
      id: "calc4-1-q3",
      variant: "practice",
      question: "The edge of a cube increases at $3$ cm/s. How fast is the volume increasing when the edge is $10$ cm? (cm³/s)",
      answer: 900,
      unit: "cm³/s",
      hint: "$V = a^3$, so $\\frac{dV}{dt} = 3a^2\\frac{da}{dt}$.",
      solution: "$\\frac{dV}{dt} = 3(10)^2(3) = 900$ cm³/s.",
      commonMistakes: [
        { answer: 300, feedback: "You found $\\frac{dV}{da} = 3a^2$; multiply by $\\frac{da}{dt} = 3$ (chain rule)." },
        { answer: 2700, feedback: "That is $3a^2 \\cdot 9$: the rate $\\frac{da}{dt}$ appears once, not squared." },
      ],
    },
    {
      type: "numeric",
      id: "calc4-1-q4",
      variant: "practice",
      question: "The radius of a spherical balloon increases at $2$ cm/s. How fast is its surface area increasing when $r = 5$ cm? (cm²/s)",
      answer: 251.33,
      relTolerance: 0.01,
      unit: "cm²/s",
      hint: "$S = 4\\pi r^2$.",
      solution: "$\\frac{dS}{dt} = 8\\pi r\\frac{dr}{dt} = 8\\pi(5)(2) = 80\\pi \\approx 251.3$ cm²/s.",
      commonMistakes: [{ answer: 125.66, tolerance: 0.5, feedback: "That is $40\\pi$: the derivative of $4\\pi r^2$ is $8\\pi r$." }],
    },
    {
      type: "quiz",
      id: "calc4-1-q5",
      variant: "practice",
      question:
        "A stone dropped into a pond makes circular ripples whose radius grows at $4$ cm/s. At the instant the radius is $10$ cm, the enclosed area grows at",
      options: [
        { text: "$80\\pi$ cm²/s", correct: true, feedback: "$2\\pi(10)(4) = 80\\pi$." },
        { text: "$40\\pi$ cm²/s", feedback: "The rate is $2\\pi r \\frac{dr}{dt}$; you lost the factor 2." },
        { text: "$20\\pi$ cm²/s", feedback: "That is $2\\pi r$ alone, the rate per unit radius. Multiply by $\\frac{dr}{dt} = 4$." },
        { text: "$16\\pi$ cm²/s", feedback: "That is $\\pi \\left(\\frac{dr}{dt}\\right)^2$, which is not a rate of area." },
      ],
      hint: "Differentiate $A = \\pi r^2$ with respect to $t$.",
    },
    {
      type: "quiz",
      id: "calc4-1-q6",
      variant: "practice",
      question:
        "Car A drives north at 60 km/h and car B drives east at 80 km/h, both leaving the same crossing at noon. How fast is the distance between them increasing at 2 pm?",
      options: [
        { text: "100 km/h, and in fact at every moment", correct: true, feedback: "$D = \\sqrt{(60t)^2 + (80t)^2} = 100t$, so $\\frac{dD}{dt} = 100$ always." },
        { text: "140 km/h", feedback: "Speeds at right angles do not add like numbers; they combine by Pythagoras." },
        { text: "200 km/h", feedback: "That is the distance after 2 hours, not its rate." },
        { text: "20 km/h", feedback: "That is the difference of the speeds, which would apply only on the same road." },
      ],
      hint: "Write the distance at time $t$ with Pythagoras, then differentiate.",
    },
    {
      type: "numeric",
      id: "calc4-1-q7",
      variant: "practice",
      question:
        "A person 1.6 m tall walks at $1.2$ m/s directly away from a lamp 4.8 m above the ground. How fast does the shadow lengthen? (m/s)",
      answer: 0.6,
      tolerance: 0.001,
      unit: "m/s",
      hint: "Similar triangles: $\\frac{4.8}{x + s} = \\frac{1.6}{s}$. Solve for $s$ in terms of $x$ first.",
      solution: "$4.8s = 1.6x + 1.6s$, so $3.2s = 1.6x$ and $s = \\frac x2$. Then $\\frac{ds}{dt} = \\frac12(1.2) = 0.6$ m/s.",
      commonMistakes: [
        { answer: 1.8, feedback: "That is the speed of the shadow's **tip** ($1.2 + 0.6$). The question asks how fast the shadow's length grows." },
        { answer: 0.4, feedback: "Check the ratio: $s = \\frac{1.6x}{4.8 - 1.6} = \\frac x2$, not $\\frac x3$." },
      ],
    },
    {
      type: "quiz",
      id: "calc4-1-q8",
      variant: "concept",
      question:
        "A ball of ice melts so that its volume decreases at a rate proportional to its surface area: $\\frac{dV}{dt} = -kS$. What happens to the radius?",
      options: [
        { text: "It decreases at the constant rate $k$.", correct: true, feedback: "$4\\pi r^2\\frac{dr}{dt} = -k\\cdot 4\\pi r^2$, so $\\frac{dr}{dt} = -k$." },
        { text: "It decreases faster and faster.", feedback: "Write $V$ and $S$ in terms of $r$: the $4\\pi r^2$ cancels exactly." },
        { text: "It decreases more and more slowly.", feedback: "That would be true if the volume fell at a constant rate. Here the rate is tied to the area." },
      ],
      hint: "Use $V = \\frac43\\pi r^3$ and $S = 4\\pi r^2$, then differentiate $V$.",
    },
    {
      type: "quiz",
      id: "calc4-1-q9",
      variant: "practice",
      multiple: true,
      question:
        "A particle moves along the curve $6y = x^3 + 2$. Select **all** points at which its $y$-coordinate is changing 8 times as fast as its $x$-coordinate.",
      options: [
        { text: "$(4, 11)$", correct: true, feedback: "$6\\dot y = 3x^2\\dot x$, so $\\dot y = \\frac{x^2}{2}\\dot x = 8\\dot x$ needs $x^2 = 16$. At $x = 4$, $y = \\frac{66}{6} = 11$." },
        { text: "$\\left(-4, -\\frac{31}{3}\\right)$", correct: true, feedback: "$x = -4$ also gives $x^2 = 16$; then $y = \\frac{-64 + 2}{6} = -\\frac{31}{3}$." },
        { text: "$\\left(4, -\\frac{31}{3}\\right)$", feedback: "That point is not on the curve: at $x = 4$, $y = 11$." },
        { text: "$\\left(2, \\frac53\\right)$", feedback: "At $x = 2$, $\\dot y = 2\\dot x$, not $8\\dot x$." },
      ],
      hint: "Differentiate $6y = x^3 + 2$ with respect to $t$ and set $\\frac{dy}{dt} = 8\\frac{dx}{dt}$.",
    },
    {
      type: "numeric",
      id: "calc4-1-q10",
      variant: "practice",
      question:
        "The radius of a cylinder increases at 2 cm/s while its height decreases at 3 cm/s. At the moment $r = 3$ cm and $h = 5$ cm, the volume is changing at $k\\pi$ cm³/s. Find $k$.",
      answer: 33,
      hint: "$V = \\pi r^2 h$ is a product: use the product rule with respect to $t$, and $\\frac{dh}{dt} = -3$.",
      solution:
        "$\\frac{dV}{dt} = \\pi\\left(2rh\\frac{dr}{dt} + r^2\\frac{dh}{dt}\\right) = \\pi\\left(2\\cdot3\\cdot5\\cdot2 + 9\\cdot(-3)\\right) = \\pi(60 - 27) = 33\\pi$.",
      commonMistakes: [
        { answer: 87, feedback: "The height is **decreasing**: $\\frac{dh}{dt} = -3$, not $+3$." },
        { answer: 60, feedback: "You kept only the radius term. The height changes too: add $r^2\\frac{dh}{dt}$." },
      ],
    },
    {
      type: "numeric",
      id: "calc4-1-q11",
      variant: "mastery",
      question:
        "Sand pours from a pipe at $12$ cm³/s and forms a cone on the ground whose height is always one-sixth of the base radius. How fast is the height increasing when the height is $4$ cm? (cm/s, to 4 decimal places)",
      answer: 0.00663,
      relTolerance: 0.02,
      unit: "cm/s",
      hint: "Write $r = 6h$ and express $V$ in terms of $h$ only before differentiating.",
      solution:
        "$V = \\frac13\\pi(6h)^2h = 12\\pi h^3$, so $\\frac{dV}{dt} = 36\\pi h^2\\frac{dh}{dt}$. At $h = 4$: $12 = 576\\pi\\frac{dh}{dt}$, so $\\frac{dh}{dt} = \\frac{1}{48\\pi} \\approx 0.00663$ cm/s.",
      commonMistakes: [
        { answer: 0.0398, tolerance: 0.002, feedback: "That is $\\frac{1}{8\\pi}$. Check that the radius is $6h$ (height is one-sixth of the radius), so $r^2 = 36h^2$." },
      ],
    },
    {
      type: "quiz",
      id: "calc4-1-q12",
      variant: "mastery",
      question:
        "The total cost of making $x$ units is $C(x) = 0.005x^3 - 0.02x^2 + 30x + 5000$. The marginal cost $C'(x)$ when $x = 3$ is",
      options: [
        { text: "$30.015$", correct: true, feedback: "$C'(x) = 0.015x^2 - 0.04x + 30$; at $x = 3$: $0.135 - 0.12 + 30 = 30.015$." },
        { text: "$30.255$", feedback: "That adds the two small terms. The $-0.04x$ term is negative: $0.135 - 0.12$." },
        { text: "$5089.955$", feedback: "That is close to $C(3)$, the total cost. Marginal cost is the derivative." },
        { text: "$30$", feedback: "The constant 30 is only the linear term's contribution; the other terms still matter at $x = 3$." },
      ],
      hint: "Marginal cost is the rate of change $C'(x)$.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "tangents-and-normals",
  title: "4.2 · Tangents and Normals",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A car drives a winding road at night. At every instant its headlights shine straight ahead along the **tangent** to the road. A wall built at right angles to the road at that spot runs along the **normal**. The derivative hands you the headlight direction for free; the normal is the direction perpendicular to it.",
    },
    { type: "heading", text: "Equations of the tangent and the normal" },
    {
      type: "text",
      content:
        "At the point $P(x_0, y_0)$ on $y = f(x)$, the tangent passes through $P$ with slope $m = f'(x_0)$. The normal passes through $P$ perpendicular to it, so its slope is the negative reciprocal (perpendicular slopes multiply to $-1$).",
    },
    {
      type: "math",
      latex:
        "\\text{tangent: } y - y_0 = f'(x_0)(x - x_0) \\qquad \\text{normal: } y - y_0 = -\\frac{1}{f'(x_0)}(x - x_0)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Special cases",
      content:
        "- $f'(x_0) = 0$: the tangent is horizontal, $y = y_0$, and the normal is vertical, $x = x_0$.\n- $\\frac{dx}{dy} = 0$ at $P$ (the slope is infinite): the tangent is vertical, $x = x_0$, and the normal is horizontal, $y = y_0$.\n- The normal can also be written without dividing: $(x - x_0) + f'(x_0)(y - y_0) = 0$.",
    },
    {
      type: "interactive",
      config: {
        component: "calc-tangent-explorer",
        expr: "x^2 - 4*x + 5",
        exprLatex: "x^2 - 4x + 5",
        derivExpr: "2*x - 4",
        derivLatex: "2x - 4",
        window: { xmin: -1, xmax: 5, ymin: -1, ymax: 8 },
        x0: { min: -0.5, max: 4.5, step: 0.1, initial: 3 },
        showDerivative: true,
        derivWindow: { ymin: -6, ymax: 6 },
        caption:
          "Drag $x_0$. The tangent's equation updates; at $x_0 = 2$ the slope is 0 and the tangent is the horizontal line $y = 1$, so the normal there is the vertical line $x = 2$.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $x_0 = 3$ the tangent is $y = 2x - 4$ (slope $f'(3) = 2$, through $(3, 2)$). Left of the vertex the tangent tilts down, right of it up, and at the vertex it lies flat. The lower graph is $f'$: its height under your point is the tangent's slope.",
    },
    { type: "heading", text: "Worked examples: explicit curves" },
    {
      type: "worked-example",
      id: "calc4-2-we1",
      title: "Worked example 1: tangent and normal at a point",
      problem: "Find the tangent and the normal to $y = x^3 - 2x + 3$ at $x = 1$.",
      steps: [
        { text: "Point: $y(1) = 1 - 2 + 3 = 2$, so $P = (1, 2)$." },
        { text: "Slope: $y' = 3x^2 - 2$, so $m = 3 - 2 = 1$." },
        { text: "Tangent: $y - 2 = 1(x - 1)$, i.e. $y = x + 1$." },
        { text: "Normal: slope $-\\frac11 = -1$, so $y - 2 = -(x - 1)$, i.e. $x + y = 3$. *Why this step:* the normal is perpendicular to the tangent, so its slope is the negative reciprocal." },
      ],
      answer: "Tangent $y = x + 1$; normal $x + y = 3$.",
    },
    {
      type: "worked-example",
      id: "calc4-2-we2",
      title: "Worked example 2: tangents with a given direction",
      problem:
        "(a) Where does $y = x^3 - 3x$ have horizontal tangents? (b) Find the tangent to $y = x^2 - 2x + 3$ that is perpendicular to the line $x + 2y = 5$.",
      steps: [
        { text: "(a) Horizontal means slope 0: $3x^2 - 3 = 0$, so $x = \\pm1$. Points $(1, -2)$ and $(-1, 2)$." },
        { text: "(b) The line $x + 2y = 5$ has slope $-\\frac12$, so a perpendicular tangent has slope $2$. *Why this step:* the condition on the tangent is really a condition on $f'$." },
        { text: "$2x - 2 = 2$ gives $x = 2$, and $y(2) = 4 - 4 + 3 = 3$." },
        { text: "Tangent: $y - 3 = 2(x - 2)$, i.e. $y = 2x - 1$." },
      ],
      answer: "(a) $(1, -2)$ and $(-1, 2)$. (b) $y = 2x - 1$, touching at $(2, 3)$.",
    },
    {
      type: "worked-example",
      id: "calc4-2-we3",
      title: "Worked example 3: tangents from an outside point",
      problem: "Find the tangents to $y = x^2$ that pass through the point $(1, -3)$, which is not on the curve.",
      steps: [
        {
          text: "You cannot use $(1, -3)$ as the point of contact. Let the contact point be $(t, t^2)$ instead. *Why this step:* the slope is known only at points on the curve, so name the unknown contact point.",
        },
        { text: "Tangent at $(t, t^2)$: $y - t^2 = 2t(x - t)$, i.e. $y = 2tx - t^2$." },
        { text: "Make it pass through $(1, -3)$: $-3 = 2t - t^2$, so $t^2 - 2t - 3 = 0$ and $t = 3$ or $t = -1$." },
        { text: "$t = 3$: $y = 6x - 9$. $t = -1$: $y = -2x - 1$." },
      ],
      answer: "Two tangents: $y = 6x - 9$ (touching at $(3, 9)$) and $y = -2x - 1$ (touching at $(-1, 1)$).",
    },
    { type: "heading", text: "Implicit and parametric curves" },
    {
      type: "text",
      content:
        "Nothing changes for curves not of the form $y = f(x)$: find the slope at the point by implicit or parametric differentiation (Chapter 3), then use the same point-slope form. Two results come up so often in JEE that they are worth deriving once.",
    },
    {
      type: "worked-example",
      id: "calc4-2-we4",
      title: "Worked example 4: tangent to an ellipse",
      problem: "Show that the tangent to $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ at $(x_0, y_0)$ is $\\frac{xx_0}{a^2} + \\frac{yy_0}{b^2} = 1$, and use it at $(1, \\tfrac32)$ on $\\frac{x^2}{4} + \\frac{y^2}{3} = 1$.",
      steps: [
        { text: "Differentiate implicitly: $\\frac{2x}{a^2} + \\frac{2y\\,y'}{b^2} = 0$, so the slope at $(x_0, y_0)$ is $-\\frac{b^2x_0}{a^2y_0}$." },
        { text: "Tangent: $y - y_0 = -\\frac{b^2x_0}{a^2y_0}(x - x_0)$. Multiply by $\\frac{y_0}{b^2}$ and rearrange:", latex: "\\frac{xx_0}{a^2} + \\frac{yy_0}{b^2} = \\frac{x_0^2}{a^2} + \\frac{y_0^2}{b^2} = 1" },
        { text: "*Why this step:* the right side is 1 because $(x_0, y_0)$ lies on the ellipse." },
        { text: "At $(1, \\tfrac32)$ with $a^2 = 4$, $b^2 = 3$: $\\frac{x}{4} + \\frac{y}{2} = 1$, i.e. $x + 2y = 4$." },
      ],
      answer: "Tangent at $(1, \\tfrac32)$: $x + 2y = 4$. (Rule of thumb: replace $x^2$ by $xx_0$ and $y^2$ by $yy_0$.)",
    },
    {
      type: "worked-example",
      id: "calc4-2-we5",
      title: "Worked example 5: a parametric curve",
      problem: "Find the tangent to $x = t^2$, $y = t^3$ at $t = 1$, and decide whether the curve has a vertical tangent at $t = 0$.",
      steps: [
        { text: "$\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{3t^2}{2t} = \\frac{3t}{2}$ for $t \\ne 0$. At $t = 1$: slope $\\frac32$, point $(1, 1)$." },
        { text: "Tangent: $y - 1 = \\frac32(x - 1)$, i.e. $3x - 2y = 1$." },
        {
          text: "At $t = 0$ both $\\frac{dx}{dt}$ and $\\frac{dy}{dt}$ vanish: the curve $y^2 = x^3$ has a cusp at the origin, with both branches arriving horizontally ($\\frac{dy}{dx} = \\frac{3t}{2} \\to 0$). *Why this step:* a vertical tangent needs $\\frac{dx}{dt} = 0$ with $\\frac{dy}{dt} \\ne 0$; here both are zero, so look at the limit of the slope instead.",
        },
      ],
      answer: "Tangent $3x - 2y = 1$ at $(1, 1)$; there is no vertical tangent (the origin is a cusp with a horizontal tangent).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a tangent touches the curve at only one point and never crosses it\"",
      content:
        "That is true for circles, not in general. The tangent to $y = x^3$ at the origin is $y = 0$, and it **crosses** the curve there. The tangent to $y = x^3$ at $(1, 1)$ is $y = 3x - 2$, which meets the curve again at $(-2, -8)$. A tangent is defined by the local slope, nothing else.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "calc4-2-q1",
      variant: "practice",
      question: "The slope of the normal to $y = x^2 + 3x$ at $x = 1$ is",
      options: [
        { text: "$-\\frac15$", correct: true, feedback: "$y' = 2x + 3 = 5$; the normal's slope is $-\\frac15$." },
        { text: "$5$", feedback: "That is the tangent's slope." },
        { text: "$-5$", feedback: "The normal's slope is the negative **reciprocal**, not just the negative." },
        { text: "$\\frac15$", feedback: "Perpendicular slopes multiply to $-1$, so the sign flips too." },
      ],
      hint: "Find $y'(1)$, then take the negative reciprocal.",
    },
    {
      type: "numeric",
      id: "calc4-2-q2",
      variant: "practice",
      question: "The tangent to $y = x^3$ at $(2, 8)$ meets the $x$-axis at $x = \\,?$",
      answer: 1.3333,
      tolerance: 0.005,
      hint: "Write the tangent, then set $y = 0$.",
      solution: "Slope $3(2)^2 = 12$. Tangent: $y - 8 = 12(x - 2)$. At $y = 0$: $x = 2 - \\frac{8}{12} = \\frac43$.",
      commonMistakes: [{ answer: 2.6667, tolerance: 0.005, feedback: "Sign slip: $0 - 8 = 12(x - 2)$ gives $x - 2 = -\\frac23$." }],
    },
    {
      type: "quiz",
      id: "calc4-2-q3",
      variant: "practice",
      multiple: true,
      question: "Select **all** points on $y = x^2 + 4$ at which the tangent passes through the origin.",
      options: [
        { text: "$(2, 8)$", correct: true, feedback: "Tangent at $(t, t^2 + 4)$ is $y = 2tx - t^2 + 4$; through $(0, 0)$ needs $t^2 = 4$." },
        { text: "$(-2, 8)$", correct: true, feedback: "$t = -2$ also works: the tangent is $y = -4x$." },
        { text: "$(0, 4)$", feedback: "The tangent there is $y = 4$, which misses the origin." },
        { text: "$(1, 5)$", feedback: "Tangent $y = 2x + 3$ misses the origin." },
      ],
      hint: "Let the point of contact be $(t, t^2 + 4)$ and make its tangent pass through $(0, 0)$.",
    },
    {
      type: "quiz",
      id: "calc4-2-q4",
      variant: "concept",
      question: "At a point where $f'(x_0) = 0$, the normal to $y = f(x)$ is",
      options: [
        { text: "the vertical line $x = x_0$", correct: true, feedback: "The tangent is horizontal, so the normal is vertical; its 'slope' $-\\frac10$ is undefined, which is why you write it as $x = x_0$." },
        { text: "the horizontal line $y = f(x_0)$", feedback: "That is the tangent." },
        { text: "undefined, so there is no normal", feedback: "The normal exists; only its slope is undefined. Use the form $(x - x_0) + f'(x_0)(y - y_0) = 0$." },
      ],
      hint: "Perpendicular to a horizontal line is a vertical line.",
    },
    {
      type: "numeric",
      id: "calc4-2-q5",
      variant: "practice",
      question: "The normal to $y = x^2$ at $(1, 1)$ meets the parabola again. Find the $x$-coordinate of that second point.",
      answer: -1.5,
      tolerance: 0.001,
      hint: "Normal slope $-\\frac12$. Substitute $y = x^2$ into the normal and factor out $(x - 1)$.",
      solution: "Normal: $y - 1 = -\\frac12(x - 1)$. With $y = x^2$: $2x^2 + x - 3 = 0$, i.e. $(x - 1)(2x + 3) = 0$. The new point has $x = -\\frac32$.",
      commonMistakes: [{ answer: 1, feedback: "That is the point you started from. The question asks for the other intersection." }],
    },
    {
      type: "quiz",
      id: "calc4-2-q6",
      variant: "practice",
      question: "The tangent to $\\frac{x^2}{4} + \\frac{y^2}{3} = 1$ at $\\left(1, \\frac32\\right)$ is",
      options: [
        { text: "$x + 2y = 4$", correct: true, feedback: "$\\frac{x\\cdot1}{4} + \\frac{y\\cdot\\frac32}{3} = 1$, i.e. $\\frac x4 + \\frac y2 = 1$." },
        { text: "$2x + y = 4$", feedback: "That swaps the coefficients. Use $\\frac{xx_0}{a^2} + \\frac{yy_0}{b^2} = 1$." },
        { text: "$x - 2y = -2$", feedback: "That line has positive slope, but in the first quadrant the ellipse slopes downward." },
        { text: "$2x - y = \\frac12$", feedback: "Check the slope: $-\\frac{b^2x_0}{a^2y_0} = -\\frac{3}{4\\cdot1.5} = -\\frac12$." },
      ],
      hint: "Replace $x^2$ by $xx_0$ and $y^2$ by $yy_0$.",
    },
    {
      type: "quiz",
      id: "calc4-2-q7",
      variant: "practice",
      question: "For the parabola $x = at^2$, $y = 2at$, the tangent at the point with parameter $t$ is",
      options: [
        { text: "$ty = x + at^2$", correct: true, feedback: "$\\frac{dy}{dx} = \\frac{2a}{2at} = \\frac1t$; $y - 2at = \\frac1t(x - at^2)$ gives $ty = x + at^2$." },
        { text: "$y = tx + at^2$", feedback: "The slope is $\\frac1t$, not $t$." },
        { text: "$ty = x - at^2$", feedback: "Expand carefully: $ty - 2at^2 = x - at^2$, so $ty = x + at^2$." },
        { text: "$y + tx = 2at + at^3$", feedback: "That is the **normal**, with slope $-t$." },
      ],
      hint: "Slope $= \\frac{dy/dt}{dx/dt}$.",
    },
    {
      type: "quiz",
      id: "calc4-2-q8",
      variant: "practice",
      multiple: true,
      question: "For $y = x^3 - 3x^2 - 9x + 5$, select **all** $x$-values at which the tangent is parallel to the $x$-axis.",
      options: [
        { text: "$x = 3$", correct: true, feedback: "$y' = 3x^2 - 6x - 9 = 3(x - 3)(x + 1)$ vanishes at 3." },
        { text: "$x = -1$", correct: true, feedback: "The other root of $3(x - 3)(x + 1)$." },
        { text: "$x = 1$", feedback: "$y'(1) = 3 - 6 - 9 = -12 \\ne 0$." },
        { text: "$x = -3$", feedback: "$y'(-3) = 27 + 18 - 9 = 36 \\ne 0$." },
      ],
      hint: "Parallel to the $x$-axis means $y' = 0$.",
    },
    {
      type: "quiz",
      id: "calc4-2-q9",
      variant: "practice",
      question: "At which point does the curve $x = t^2$, $y = t^3 - 3t$ have a vertical tangent?",
      options: [
        { text: "$(0, 0)$", correct: true, feedback: "$\\frac{dx}{dt} = 2t = 0$ at $t = 0$ while $\\frac{dy}{dt} = -3 \\ne 0$: the slope blows up." },
        { text: "$(1, -2)$", feedback: "At $t = 1$, $\\frac{dy}{dt} = 0$: that is a **horizontal** tangent." },
        { text: "$(3, 0)$", feedback: "At $t = \\pm\\sqrt3$ the slope is $\\frac{3t^2 - 3}{2t} = \\pm\\frac{6}{2\\sqrt3}$, finite." },
        { text: "There is none.", feedback: "Check where $\\frac{dx}{dt} = 0$." },
      ],
      hint: "Vertical tangent: $\\frac{dx}{dt} = 0$ with $\\frac{dy}{dt} \\ne 0$.",
    },
    {
      type: "numeric",
      id: "calc4-2-q10",
      variant: "mastery",
      question:
        "The tangent to $y = x^2 - 5x + 5$ that is parallel to the line $2y = 4x + 1$ cuts the $y$-axis at $(0, c)$. Find $c$.",
      answer: -7.25,
      tolerance: 0.001,
      hint: "The line has slope 2. Solve $y' = 2$ for the contact point.",
      solution:
        "$2x - 5 = 2$ gives $x = \\frac72$ and $y = \\frac{49}{4} - \\frac{35}{2} + 5 = -\\frac14$. Tangent: $y + \\frac14 = 2\\left(x - \\frac72\\right)$, i.e. $y = 2x - \\frac{29}{4}$. So $c = -7.25$. (It passes through $\\left(\\frac18, -7\\right)$, a popular JEE option.)",
      commonMistakes: [{ answer: -7, feedback: "Check the constant: $-7 - \\frac14 = -\\frac{29}{4}$." }],
    },
    {
      type: "numeric",
      id: "calc4-2-q11",
      variant: "mastery",
      question: "The tangent to $xy = 4$ at $(2, 2)$ forms a triangle with the coordinate axes. Find its area.",
      answer: 8,
      hint: "$y = \\frac4x$; find the tangent, then its two intercepts.",
      solution:
        "$y' = -\\frac{4}{x^2} = -1$ at $x = 2$. Tangent: $x + y = 4$, intercepts 4 and 4, area $\\frac12 \\cdot 4 \\cdot 4 = 8$. In fact every tangent to $xy = c^2$ cuts off area $2c^2$: a constant.",
      commonMistakes: [{ answer: 16, feedback: "A triangle's area is **half** base times height." }],
    },
    {
      type: "quiz",
      id: "calc4-2-q12",
      variant: "mastery",
      question: "Which statement about the tangent to $y = x^3$ at the origin is true?",
      options: [
        { text: "It is $y = 0$, and it crosses the curve at the origin.", correct: true, feedback: "$y'(0) = 0$. The curve is below the axis for $x < 0$ and above for $x > 0$: the tangent passes through." },
        { text: "There is no tangent, because the line $y = 0$ crosses the curve.", feedback: "Crossing does not disqualify a tangent; the slope $y'(0) = 0$ exists." },
        { text: "It is the vertical line $x = 0$.", feedback: "The slope at 0 is $3(0)^2 = 0$: horizontal, not vertical." },
      ],
      hint: "Compute $y'(0)$, then look at the sign of $x^3$ on each side.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "subtangent-subnormal-and-angles",
  title: "4.3 · Subtangent, Subnormal and Angles Between Curves",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Draw the tangent and the normal at a point $P$ of a curve and extend both until they hit the $x$-axis, at $T$ and $N$. Drop a perpendicular from $P$ to the axis, landing at $M$. You now have a right triangle $TPN$ standing on the axis, with $PM$ its altitude. Four lengths in that picture have names, and older JEE papers love them.",
    },
    { type: "heading", text: "Four lengths cut off by the tangent and normal" },
    {
      type: "text",
      content:
        "Let $P = (x_0, y_0)$ and $m = \\frac{dy}{dx}$ at $P$. The tangent $y - y_0 = m(x - x_0)$ meets $y = 0$ at $x = x_0 - \\frac{y_0}{m}$, so $TM = \\left|\\frac{y_0}{m}\\right|$. The normal $y - y_0 = -\\frac1m(x - x_0)$ meets $y = 0$ at $x = x_0 + my_0$, so $MN = |my_0|$. The slanted lengths $PT$ and $PN$ then come from Pythagoras with the height $|y_0|$.",
    },
    {
      type: "table",
      headers: ["Length", "Meaning", "Formula"],
      rows: [
        ["Subtangent $TM$", "shadow of the tangent segment on the $x$-axis", "$\\left\\lvert \\dfrac{y}{y'} \\right\\rvert$"],
        ["Subnormal $MN$", "shadow of the normal segment on the $x$-axis", "$\\lvert y\\,y' \\rvert$"],
        ["Length of tangent $PT$", "from $P$ to where the tangent meets the axis", "$\\left\\lvert \\dfrac{y\\sqrt{1 + y'^2}}{y'} \\right\\rvert$"],
        ["Length of normal $PN$", "from $P$ to where the normal meets the axis", "$\\lvert y \\rvert\\sqrt{1 + y'^2}$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "A quick check that you have not swapped them: in the right triangle $TPN$, the altitude satisfies $PM^2 = TM \\cdot MN$. Indeed $\\left|\\frac{y}{y'}\\right| \\cdot |yy'| = y^2$.",
    },
    {
      type: "worked-example",
      id: "calc4-3-we1",
      title: "Worked example 1: the parabola's constant subnormal",
      problem: "For $y^2 = 4ax$, find the subtangent and the subnormal at any point.",
      steps: [
        { text: "Differentiate implicitly: $2yy' = 4a$, so $yy' = 2a$. *Why this step:* the subnormal formula needs exactly the product $yy'$." },
        { text: "Subnormal $= |yy'| = 2a$: the same at every point of the parabola." },
        { text: "Subtangent $= \\left|\\frac{y}{y'}\\right| = \\frac{y^2}{|yy'|} = \\frac{4ax}{2a} = 2x$ (for $x > 0$)." },
      ],
      answer: "Subnormal $2a$ (constant); subtangent $2x$, twice the abscissa.",
    },
    {
      type: "worked-example",
      id: "calc4-3-we2",
      title: "Worked example 2: the exponential's constant subtangent",
      problem: "Show that $y = e^{x/c}$ has constant subtangent, and find the subnormal at $x = 0$.",
      steps: [
        { text: "$y' = \\frac1c e^{x/c} = \\frac yc$." },
        { text: "Subtangent $= \\left|\\frac{y}{y'}\\right| = |c|$, the same everywhere. *Why this step:* exponentials are exactly the curves whose slope is proportional to height." },
        { text: "Subnormal at $x = 0$: $|yy'| = \\left|1\\cdot\\frac1c\\right| = \\frac{1}{|c|}$." },
      ],
      answer: "Subtangent $|c|$ at every point; subnormal at $x = 0$ is $\\frac{1}{|c|}$.",
    },
    { type: "heading", text: "The angle between two curves" },
    {
      type: "text",
      content:
        "Two curves crossing at a point do not have a 'corner angle' of their own: each one, zoomed in, looks like its tangent line. So the **angle between the curves** is defined as the angle between their tangents at the point of intersection. If the slopes are $m_1$ and $m_2$, the acute angle $\\theta$ between the lines satisfies",
    },
    { type: "math", latex: "\\tan\\theta = \\left|\\frac{m_1 - m_2}{1 + m_1m_2}\\right|" },
    {
      type: "callout",
      variant: "definition",
      title: "Touching and orthogonal curves",
      content:
        "- The curves **touch** at the point if $m_1 = m_2$ (angle $0$): they share a tangent.\n- The curves cut **orthogonally** if $m_1m_2 = -1$ (angle $90^\\circ$), or if one tangent is horizontal and the other vertical.\n- Always find the intersection point(s) first: the angle can differ from one intersection to another.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the angle is the difference of the slopes\"",
      content:
        "A slope is $\\tan$ of an inclination, not an angle. Slopes $2$ and $-2$ do not meet at an 'angle of 4'. Use the formula, which is $\\tan(\\alpha_1 - \\alpha_2)$ written in slopes: here $\\tan\\theta = \\left|\\frac{4}{1 - 4}\\right| = \\frac43$.",
    },
    {
      type: "worked-example",
      id: "calc4-3-we3",
      title: "Worked example 3: two parabolas",
      problem: "Find the angles between $y = x^2$ and $y^2 = x$ at each point where they meet.",
      steps: [
        { text: "Intersections: $x = (x^2)^2$, so $x(x^3 - 1) = 0$: the points $(0, 0)$ and $(1, 1)$." },
        { text: "Slopes: for $y = x^2$, $m_1 = 2x$; for $y^2 = x$, $2yy' = 1$ so $m_2 = \\frac{1}{2y}$." },
        { text: "At $(1, 1)$: $m_1 = 2$, $m_2 = \\frac12$. $\\tan\\theta = \\left|\\frac{2 - \\frac12}{1 + 1}\\right| = \\frac34$." },
        { text: "At $(0, 0)$: $y = x^2$ has a horizontal tangent; $y^2 = x$ has a vertical one ($m_2$ blows up). *Why this step:* the formula fails when a slope is infinite, so read the angle from the picture: horizontal meets vertical at $90^\\circ$." },
      ],
      answer: "$\\theta = \\tan^{-1}\\frac34$ at $(1, 1)$ and $90^\\circ$ at the origin.",
    },
    {
      type: "worked-example",
      id: "calc4-3-we4",
      title: "Worked example 4: the orthogonality condition",
      problem:
        "Show that $ax^2 + by^2 = 1$ and $a'x^2 + b'y^2 = 1$ cut orthogonally if and only if $\\frac1a - \\frac1b = \\frac1{a'} - \\frac1{b'}$. Then check $x^2 + 4y^2 = 8$ and $x^2 - 2y^2 = 4$.",
      steps: [
        { text: "Slopes by implicit differentiation: $m_1 = -\\frac{ax}{by}$, $m_2 = -\\frac{a'x}{b'y}$." },
        { text: "Orthogonal: $m_1m_2 = -1$, i.e. $aa'x^2 = -bb'y^2$ at the intersection point." },
        { text: "At the intersection, subtracting the two equations gives $(a - a')x^2 = -(b - b')y^2$. *Why this step:* we need a second relation between $x^2$ and $y^2$ to eliminate them." },
        { text: "Divide the two relations: $\\frac{aa'}{a - a'} = \\frac{bb'}{b - b'}$. Cross-multiplying and dividing by $aa'bb'$ rearranges to $\\frac1a - \\frac1b = \\frac1{a'} - \\frac1{b'}$." },
        { text: "Check: $\\frac{x^2}{8} + \\frac{y^2}{2} = 1$ gives $\\frac1a - \\frac1b = 8 - 2 = 6$; $\\frac{x^2}{4} - \\frac{y^2}{2} = 1$ gives $4 - (-2) = 6$. Equal, so they are orthogonal." },
      ],
      answer: "The condition is $\\frac1a - \\frac1b = \\frac1{a'} - \\frac1{b'}$; the given pair cuts at right angles.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "calc4-3-q1",
      variant: "practice",
      question: "Find the length of the subnormal at any point of the parabola $y^2 = 8x$.",
      answer: 4,
      hint: "Differentiate implicitly and look at $yy'$.",
      solution: "$2yy' = 8$, so $yy' = 4$: the subnormal is 4 at every point.",
      commonMistakes: [{ answer: 2, feedback: "Here $4a = 8$, so $a = 2$ and the subnormal $2a$ is 4." }],
    },
    {
      type: "numeric",
      id: "calc4-3-q2",
      variant: "practice",
      question: "Find the length of the subtangent to $y = x^3$ at the point where $x = 2$.",
      answer: 0.6667,
      tolerance: 0.005,
      hint: "Subtangent $= \\left|\\frac{y}{y'}\\right|$.",
      solution: "$y = 8$, $y' = 12$, subtangent $= \\frac{8}{12} = \\frac23$.",
      commonMistakes: [{ answer: 96, feedback: "That is the subnormal $yy'$. The subtangent divides: $\\frac{y}{y'}$." }],
    },
    {
      type: "quiz",
      id: "calc4-3-q3",
      variant: "practice",
      question: "Which curve has the same subtangent at every point?",
      options: [
        { text: "$y = 3e^{2x}$", correct: true, feedback: "$y' = 2y$, so $\\frac{y}{y'} = \\frac12$ everywhere." },
        { text: "$y = x^2$", feedback: "$\\frac{y}{y'} = \\frac{x^2}{2x} = \\frac x2$, which varies." },
        { text: "$y^2 = 4x$", feedback: "That parabola has constant **subnormal**; its subtangent is $2x$." },
        { text: "$y = \\ln x$", feedback: "$\\frac{y}{y'} = x\\ln x$, which varies." },
      ],
      hint: "Constant subtangent means $\\frac{y}{y'}$ is constant, i.e. $y'$ is proportional to $y$.",
    },
    {
      type: "numeric",
      id: "calc4-3-q4",
      variant: "practice",
      question: "The curves $y = x^2$ and $y = 2 - x^2$ meet at $(1, 1)$. Find $\\tan\\theta$ for the acute angle $\\theta$ between them there.",
      answer: 1.3333,
      tolerance: 0.005,
      hint: "Slopes at $(1, 1)$ are $2$ and $-2$.",
      solution: "$\\tan\\theta = \\left|\\frac{2 - (-2)}{1 + (2)(-2)}\\right| = \\left|\\frac{4}{-3}\\right| = \\frac43$.",
      commonMistakes: [
        { answer: -1.3333, tolerance: 0.005, feedback: "Take the absolute value for the acute angle." },
        { answer: 4, feedback: "That is just $m_1 - m_2$; divide by $1 + m_1m_2$." },
      ],
    },
    {
      type: "quiz",
      id: "calc4-3-q5",
      variant: "concept",
      question: "Two curves meet at a point $P$ and have the same slope there. Geometrically this means",
      options: [
        { text: "they touch at $P$: they share a tangent line.", correct: true, feedback: "Angle 0 between the tangents: the curves are tangent to each other." },
        { text: "they cut at right angles.", feedback: "Right angles need $m_1m_2 = -1$." },
        { text: "they cannot both pass through $P$.", feedback: "They can: $y = x^2$ and $y = x^3 - x + 1$ both pass through $(1, 1)$ with slope 2 there, and they touch." },
      ],
      hint: "What is $\\tan\\theta$ when $m_1 = m_2$?",
    },
    {
      type: "quiz",
      id: "calc4-3-q6",
      variant: "practice",
      multiple: true,
      question: "For the parabola $y^2 = 4ax$ at the point $(at^2, 2at)$ with $t > 0$, select **all** true statements.",
      options: [
        { text: "The subtangent is $2at^2$.", correct: true, feedback: "Twice the abscissa $at^2$." },
        { text: "The subnormal is $2a$.", correct: true, feedback: "$yy' = 2a$ for every point." },
        { text: "The length of the normal is $2a\\sqrt{1 + t^2}$.", correct: true, feedback: "$y' = \\frac1t$, so $|y|\\sqrt{1 + y'^2} = 2at\\sqrt{1 + \\frac{1}{t^2}} = 2a\\sqrt{t^2 + 1}$." },
        { text: "The length of the tangent is $2a\\sqrt{1 + t^2}$.", feedback: "$\\left|\\frac{y}{y'}\\right|\\sqrt{1 + y'^2} = 2at^2\\cdot\\frac{\\sqrt{t^2 + 1}}{t} = 2at\\sqrt{1 + t^2}$." },
      ],
      hint: "First find $y' = \\frac{1}{t}$ at that point, then use the four formulas.",
    },
    {
      type: "numeric",
      id: "calc4-3-q7",
      variant: "practice",
      question: "Find the length of the normal to $y = x^2$ at $(1, 1)$, to 3 decimal places.",
      answer: 2.236,
      tolerance: 0.002,
      hint: "Length of normal $= |y|\\sqrt{1 + y'^2}$.",
      solution: "$y' = 2$, so the length is $1\\cdot\\sqrt{1 + 4} = \\sqrt5 \\approx 2.236$.",
      commonMistakes: [{ answer: 1.118, tolerance: 0.002, feedback: "That is the length of the **tangent**, $\\left|\\frac{y}{y'}\\right|\\sqrt{1 + y'^2} = \\frac{\\sqrt5}{2}$." }],
    },
    {
      type: "quiz",
      id: "calc4-3-q8",
      variant: "concept",
      question: "Why does every line through the centre of a circle $x^2 + y^2 = r^2$ cut the circle orthogonally?",
      options: [
        { text: "At each meeting point the line is a radius, and a radius is perpendicular to the tangent.", correct: true, feedback: "The circle's tangent has slope $-\\frac{x}{y}$; the line $y = mx$ has slope $\\frac yx$; the product is $-1$." },
        { text: "Because the line and the circle have equal slopes there.", feedback: "Equal slopes would mean the line touches the circle." },
        { text: "It does not: it depends on the slope of the line.", feedback: "Check the product of slopes: $\\frac yx\\cdot\\left(-\\frac xy\\right) = -1$ for every line through the centre." },
      ],
      hint: "Compute the circle's slope $-\\frac xy$ at a point on the line $y = mx$.",
    },
    {
      type: "numeric",
      id: "calc4-3-q9",
      variant: "mastery",
      question: "The curves $y^2 = 6x$ and $9x^2 + by^2 = 16$ intersect at right angles. Find $b$.",
      answer: 4.5,
      tolerance: 0.001,
      hint: "Slopes: $m_1 = \\frac3y$ and $m_2 = -\\frac{9x}{by}$. Use $y^2 = 6x$ at the meeting point.",
      solution:
        "$m_1m_2 = -\\frac{27x}{by^2} = -\\frac{27x}{6bx} = -\\frac{9}{2b}$. Setting this to $-1$: $b = \\frac92$.",
      commonMistakes: [{ answer: 2.25, tolerance: 0.001, feedback: "Recheck $m_1$: $2yy' = 6$ gives $y' = \\frac3y$, not $\\frac{3}{2y}$." }],
    },
    {
      type: "numeric",
      id: "calc4-3-q10",
      variant: "mastery",
      question: "Find $\\tan\\theta$, where $\\theta$ is the acute angle between $y = \\sin x$ and $y = \\cos x$ at $x = \\frac\\pi4$ (3 decimal places).",
      answer: 2.828,
      tolerance: 0.005,
      hint: "Slopes at $\\frac\\pi4$: $\\cos\\frac\\pi4$ and $-\\sin\\frac\\pi4$.",
      solution:
        "$m_1 = \\frac{1}{\\sqrt2}$, $m_2 = -\\frac{1}{\\sqrt2}$. $\\tan\\theta = \\left|\\frac{\\sqrt2}{1 - \\frac12}\\right| = 2\\sqrt2 \\approx 2.828$.",
      commonMistakes: [{ answer: 0.943, tolerance: 0.005, feedback: "The denominator is $1 + m_1m_2 = 1 - \\frac12$, not $1 + \\frac12$." }],
    },
    {
      type: "quiz",
      id: "calc4-3-q11",
      variant: "mastery",
      question: "Which family of curves has a constant subnormal?",
      options: [
        { text: "$y^2 = kx$", correct: true, feedback: "$2yy' = k$, so the subnormal $|yy'| = \\frac{|k|}{2}$ is constant." },
        { text: "$y = ke^x$", feedback: "That has constant **subtangent** 1." },
        { text: "$xy = k$", feedback: "$yy' = -\\frac{k^2}{x^3}$, which varies." },
        { text: "$y = kx^2$", feedback: "$yy' = 2k^2x^3$, which varies." },
      ],
      hint: "Constant subnormal means $yy'$ is constant, i.e. $\\frac{d}{dx}\\left(\\frac{y^2}{2}\\right)$ is constant.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "increasing-and-decreasing-functions",
  title: "4.4 · Increasing and Decreasing Functions",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Walk a hill trail from left to right. Wherever the path tilts up, your altitude increases; where it tilts down, it decreases. The tilt at each step is the slope of the path, which is the derivative. So the sign of $f'$ tells you which way $f$ is heading, and a **sign chart** of $f'$ is a map of the hills and valleys.",
    },
    { type: "heading", text: "Definitions" },
    {
      type: "callout",
      variant: "definition",
      title: "Increasing and decreasing on an interval",
      content:
        "On an interval $I$, $f$ is\n- **increasing** if $x_1 < x_2 \\Rightarrow f(x_1) \\le f(x_2)$, and **strictly increasing** if $x_1 < x_2 \\Rightarrow f(x_1) < f(x_2)$;\n- **decreasing** if $x_1 < x_2 \\Rightarrow f(x_1) \\ge f(x_2)$, and **strictly decreasing** with $>$.\nA function that is entirely one of these on $I$ is called **monotonic** on $I$. (JEE uses these NCERT meanings.)",
    },
    { type: "heading", text: "The derivative test" },
    {
      type: "math",
      latex:
        "f'(x) > 0 \\text{ on } (a, b) \\;\\Rightarrow\\; f \\text{ strictly increasing on } [a, b], \\qquad f'(x) < 0 \\;\\Rightarrow\\; \\text{strictly decreasing}",
    },
    {
      type: "text",
      content:
        "(This needs $f$ continuous on $[a, b]$ and differentiable inside; lesson 4.5 proves it from the mean value theorem.) Two refinements matter in JEE:\n\n- If $f'(x) \\ge 0$ and $f'$ is zero only at **isolated points**, $f$ is still strictly increasing. Example: $x^3$, whose derivative $3x^2$ vanishes only at 0.\n- Conversely, a strictly increasing differentiable function only guarantees $f' \\ge 0$, not $f' > 0$ (again $x^3$).",
    },
    {
      type: "text",
      content:
        "The working method: find where $f'$ is zero or undefined, cut the domain at those points, test the sign of $f'$ on each piece. Try it below on $f(x) = x^3 - 6x^2 + 9x + 1$, where $f'(x) = 3(x - 1)(x - 3)$.",
    },
    {
      type: "interactive",
      config: {
        component: "calc-sign-chart",
        expr: "x^3 - 6*x^2 + 9*x + 1",
        exprLatex: "x^3 - 6x^2 + 9x + 1",
        derivExpr: "3*x^2 - 12*x + 9",
        window: { xmin: -1, xmax: 5, ymin: -4, ymax: 8 },
        rows: ["first"],
        initial: 2,
        caption:
          "Scan $x$ along the graph. The sign chart of $f'$ splits at $x = 1$ and $x = 3$: $+$ then $-$ then $+$, so $f$ rises, falls, then rises again.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $f$ is increasing on $(-\\infty, 1]$ and $[3, \\infty)$, decreasing on $[1, 3]$. The graph turns at $(1, 5)$ and $(3, 1)$, exactly where the chart changes sign. Endpoints of the intervals can be included because $f$ is continuous there.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"increasing means $f' > 0$ everywhere\"",
      content:
        "$x^3$ is strictly increasing on all of $\\mathbb R$ although $f'(0) = 0$. Scan the second explorer below: the chart reads $+$, $+$ with a mark at 0 where nothing turns. Isolated zeros of $f'$ do not break monotonicity; a whole interval of zeros would (the function is constant there).",
    },
    {
      type: "interactive",
      config: {
        component: "calc-sign-chart",
        expr: "x^3",
        exprLatex: "x^3",
        derivExpr: "3*x^2",
        window: { xmin: -2, xmax: 2, ymin: -3, ymax: 3 },
        rows: ["first"],
        initial: 1,
        caption: "$f'(x) = 3x^2$ touches zero at the origin without changing sign, so $f$ keeps increasing straight through.",
      },
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "calc4-4-we1",
      title: "Worked example 1: intervals from a sign chart",
      problem: "Find the intervals on which $f(x) = 2x^3 - 9x^2 + 12x + 5$ is increasing or decreasing.",
      steps: [
        { text: "$f'(x) = 6x^2 - 18x + 12 = 6(x - 1)(x - 2)$." },
        { text: "Cut at $1$ and $2$ and test a point in each piece. *Why this step:* a polynomial derivative keeps its sign between consecutive zeros.", table: { headers: ["interval", "test $x$", "sign of $f'$", "$f$"], rows: [["$(-\\infty, 1)$", "$0$", "$+$", "increasing"], ["$(1, 2)$", "$1.5$", "$-$", "decreasing"], ["$(2, \\infty)$", "$3$", "$+$", "increasing"]] } },
      ],
      answer: "Increasing on $(-\\infty, 1]$ and $[2, \\infty)$; decreasing on $[1, 2]$.",
    },
    {
      type: "worked-example",
      id: "calc4-4-we2",
      title: "Worked example 2: a parameter for monotonicity on R",
      problem: "For which $a$ is $f(x) = x^3 + ax^2 + 3x + 1$ increasing on all of $\\mathbb R$?",
      steps: [
        { text: "Need $f'(x) = 3x^2 + 2ax + 3 \\ge 0$ for every $x$. *Why this step:* an upward parabola is never negative exactly when its discriminant is $\\le 0$." },
        { text: "Discriminant: $4a^2 - 36 \\le 0$, so $a^2 \\le 9$, i.e. $-3 \\le a \\le 3$." },
        { text: "At $a = \\pm 3$, $f'(x) = 3(x \\pm 1)^2$ vanishes at a single point only, so $f$ is still strictly increasing; the endpoints are included." },
      ],
      answer: "$a \\in [-3, 3]$.",
    },
    {
      type: "worked-example",
      id: "calc4-4-we3",
      title: "Worked example 3: trig and exponential functions",
      problem: "(a) Show $f(x) = x - \\sin x$ is increasing on $\\mathbb R$. (b) Where is $g(x) = xe^{-x}$ increasing?",
      steps: [
        { text: "(a) $f'(x) = 1 - \\cos x \\ge 0$, zero only at the isolated points $x = 2k\\pi$. So $f$ is strictly increasing on $\\mathbb R$." },
        { text: "(b) $g'(x) = e^{-x} - xe^{-x} = (1 - x)e^{-x}$. *Why this step:* $e^{-x} > 0$ always, so the sign of $g'$ is the sign of $1 - x$." },
        { text: "So $g$ increases on $(-\\infty, 1]$ and decreases on $[1, \\infty)$." },
      ],
      answer: "(a) Strictly increasing on $\\mathbb R$. (b) Increasing on $(-\\infty, 1]$, decreasing on $[1, \\infty)$.",
    },
    {
      type: "worked-example",
      id: "calc4-4-we4",
      title: "Worked example 4: a domain with a gap",
      problem: "Find where $f(x) = 2x^2 - \\ln\\lvert x\\rvert$ $(x \\ne 0)$ is decreasing.",
      steps: [
        { text: "$f'(x) = 4x - \\frac1x = \\frac{4x^2 - 1}{x} = \\frac{(2x - 1)(2x + 1)}{x}$." },
        { text: "Critical numbers $\\pm\\frac12$; also cut at $x = 0$, where $f$ is undefined. *Why this step:* the sign can change where the derivative is undefined, not only where it is zero.", table: { headers: ["interval", "sign of $f'$"], rows: [["$(-\\infty, -\\frac12)$", "$-$"], ["$(-\\frac12, 0)$", "$+$"], ["$(0, \\frac12)$", "$-$"], ["$(\\frac12, \\infty)$", "$+$"]] } },
      ],
      answer: "Decreasing on $\\left(-\\infty, -\\frac12\\right]$ and on $\\left(0, \\frac12\\right]$ (separately).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"decreasing on each piece means decreasing on the domain\"",
      content:
        "$\\frac1x$ is decreasing on $(-\\infty, 0)$ and on $(0, \\infty)$, but not on its whole domain: $-1 < 1$ while $f(-1) = -1 < f(1) = 1$. When the domain has a gap, report the intervals separately and never join them with a single word.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Composites",
      content:
        "If $f$ and $g$ are both increasing (or both decreasing), $f \\circ g$ is increasing; if one increases and the other decreases, $f \\circ g$ decreases. The chain rule says the same thing: $(f \\circ g)' = f'(g(x))\\,g'(x)$ is a product of two signs.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "calc4-4-q1",
      variant: "practice",
      question: "$f(x) = x^2 - 4x$ is decreasing on",
      options: [
        { text: "$(-\\infty, 2]$", correct: true, feedback: "$f'(x) = 2x - 4 \\le 0$ for $x \\le 2$." },
        { text: "$[2, \\infty)$", feedback: "There $f' \\ge 0$: increasing." },
        { text: "$(-\\infty, 0]$ only", feedback: "It keeps decreasing until the vertex at $x = 2$." },
        { text: "$[0, 4]$", feedback: "$0$ and $4$ are the roots of $f$, not of $f'$." },
      ],
      hint: "Solve $f'(x) \\le 0$.",
    },
    {
      type: "quiz",
      id: "calc4-4-q2",
      variant: "practice",
      multiple: true,
      question: "Select **all** functions that are strictly increasing on $\\mathbb R$.",
      options: [
        { text: "$x^3$", correct: true, feedback: "$3x^2 \\ge 0$ with an isolated zero." },
        { text: "$x + \\sin x$", correct: true, feedback: "$1 + \\cos x \\ge 0$, zero only at isolated points $x = (2k + 1)\\pi$." },
        { text: "$x\\lvert x\\rvert$", correct: true, feedback: "Its derivative is $2\\lvert x\\rvert \\ge 0$, zero only at 0." },
        { text: "$e^x - x$", feedback: "$e^x - 1 < 0$ for $x < 0$: it decreases there." },
        { text: "$x^2 + 1$", feedback: "Decreasing for $x < 0$." },
      ],
      hint: "Check $f' \\ge 0$ everywhere with zeros only at isolated points.",
    },
    {
      type: "quiz",
      id: "calc4-4-q3",
      variant: "concept",
      question: "Is $f(x) = \\frac1x$ a decreasing function on its domain $\\mathbb R \\setminus \\{0\\}$?",
      options: [
        { text: "No: it is decreasing on each of $(-\\infty, 0)$ and $(0, \\infty)$, but $f(-1) < f(1)$.", correct: true, feedback: "Monotonicity on a union of intervals can fail even when it holds on each piece." },
        { text: "Yes, because $f'(x) = -\\frac{1}{x^2} < 0$ wherever it is defined.", feedback: "The derivative test works on an **interval**. The domain here has a gap at 0." },
        { text: "No, because it is increasing for $x < 0$.", feedback: "For $x < 0$ it is decreasing too (from $0^-$ down to $-\\infty$ as $x \\to 0^-$)." },
      ],
      hint: "Compare $f(-1)$ and $f(1)$.",
    },
    {
      type: "numeric",
      id: "calc4-4-q4",
      variant: "practice",
      question: "$f(x) = x^3 - 3x^2 - 9x + 7$ is decreasing exactly on an interval $[a, b]$. Find $b - a$.",
      answer: 4,
      hint: "Factor $f'(x)$ and find where it is $\\le 0$.",
      solution: "$f'(x) = 3x^2 - 6x - 9 = 3(x - 3)(x + 1) \\le 0$ on $[-1, 3]$. Length $4$.",
      commonMistakes: [{ answer: 2, feedback: "The roots of $f'$ are $3$ and $-1$, not $3$ and $1$." }],
    },
    {
      type: "quiz",
      id: "calc4-4-q5",
      variant: "practice",
      question: "$f(x) = 2x^3 - 3x^2 - 12x + 4$ is decreasing on",
      options: [
        { text: "$[-1, 2]$", correct: true, feedback: "$f'(x) = 6(x - 2)(x + 1) \\le 0$ between the roots." },
        { text: "$(-\\infty, -1] \\cup [2, \\infty)$", feedback: "That is where it **increases**." },
        { text: "$[-2, 1]$", feedback: "Check the factorisation: $x^2 - x - 2 = (x - 2)(x + 1)$." },
        { text: "$[0, 2]$ only", feedback: "It is already decreasing from $x = -1$." },
      ],
      hint: "Factor $f'(x) = 6x^2 - 6x - 12$.",
    },
    {
      type: "quiz",
      id: "calc4-4-q6",
      variant: "practice",
      question: "If $f'(x) = (x - 1)^2(x - 2)$ for all $x$, then $f$ is decreasing on",
      options: [
        { text: "$(-\\infty, 2]$", correct: true, feedback: "$(x - 1)^2 \\ge 0$, so the sign is that of $x - 2$; the zero at 1 is isolated." },
        { text: "$[1, 2]$", feedback: "For $x < 1$, $(x - 1)^2 > 0$ and $x - 2 < 0$: still decreasing." },
        { text: "$(-\\infty, 1]$", feedback: "Nothing changes at $x = 1$: the squared factor does not flip the sign." },
        { text: "$[2, \\infty)$", feedback: "There $f' \\ge 0$: increasing." },
      ],
      hint: "A squared factor never changes sign.",
    },
    {
      type: "quiz",
      id: "calc4-4-q7",
      variant: "practice",
      multiple: true,
      question: "For $f(x) = x^4 - 4x^3$, select **all** true statements.",
      options: [
        { text: "$f$ is decreasing on $(-\\infty, 0]$.", correct: true, feedback: "$f'(x) = 4x^2(x - 3) \\le 0$ for $x \\le 3$." },
        { text: "$f$ is decreasing on $[0, 3]$.", correct: true, feedback: "Same reason: in fact it decreases on all of $(-\\infty, 3]$." },
        { text: "$f$ is increasing on $[3, \\infty)$.", correct: true, feedback: "$x - 3 \\ge 0$ there." },
        { text: "The graph turns around at $x = 0$.", feedback: "$f'$ has a double zero at 0 and does not change sign: no turn." },
      ],
      hint: "Factor $f'(x) = 4x^3 - 12x^2$.",
    },
    {
      type: "numeric",
      id: "calc4-4-q8",
      variant: "practice",
      question: "Find the least $c > 0$ such that $f(x) = x + \\frac4x$ is increasing on $[c, \\infty)$.",
      answer: 2,
      hint: "Solve $f'(x) \\ge 0$ for $x > 0$.",
      solution: "$f'(x) = 1 - \\frac{4}{x^2} \\ge 0 \\iff x^2 \\ge 4$, so on $x > 0$ we need $x \\ge 2$.",
      commonMistakes: [{ answer: 4, feedback: "$x^2 \\ge 4$ gives $x \\ge 2$, not $x \\ge 4$." }],
    },
    {
      type: "numeric",
      id: "calc4-4-q9",
      variant: "practice",
      question: "The function $f(x) = \\frac{\\ln x}{x}$ increases on $(0, k]$ and decreases on $[k, \\infty)$. Find $k$ (3 decimal places).",
      answer: 2.718,
      tolerance: 0.002,
      hint: "Quotient rule: $f'(x) = \\frac{1 - \\ln x}{x^2}$.",
      solution: "$f'(x) = \\frac{1 - \\ln x}{x^2} > 0 \\iff \\ln x < 1 \\iff x < e$. So $k = e \\approx 2.718$.",
      commonMistakes: [{ answer: 1, feedback: "At $x = 1$, $f = 0$; but $f' = 1 > 0$ there. The sign of $1 - \\ln x$ changes at $x = e$." }],
    },
    {
      type: "quiz",
      id: "calc4-4-q10",
      variant: "concept",
      question: "$f$ is increasing on $\\mathbb R$ and $g$ is decreasing on $\\mathbb R$. Then $f(g(x))$ is",
      options: [
        { text: "decreasing", correct: true, feedback: "$x$ up $\\Rightarrow g(x)$ down $\\Rightarrow f(g(x))$ down. In derivatives: $(+)(-) = (-)$." },
        { text: "increasing", feedback: "That needs both increasing or both decreasing." },
        { text: "impossible to tell", feedback: "The chain rule decides it: $f'(g(x))g'(x)$ has sign $(+)(-)$." },
      ],
      hint: "Follow an increase in $x$ through $g$, then through $f$.",
    },
    {
      type: "quiz",
      id: "calc4-4-q11",
      variant: "mastery",
      question: "The set of all $k$ for which $f(x) = kx^3 - 9kx^2 + 9x + 3$ is increasing on $\\mathbb R$ is",
      options: [
        { text: "$\\left[0, \\frac13\\right]$", correct: true, feedback: "$f'(x) = 3kx^2 - 18kx + 9$. For $k = 0$, $f' = 9 > 0$. For $k > 0$ need $324k^2 - 108k \\le 0$, i.e. $k \\le \\frac13$. $k < 0$ fails (downward parabola)." },
        { text: "$\\left(0, \\frac13\\right)$", feedback: "Both ends work: $k = 0$ makes $f$ linear with slope 9, and $k = \\frac13$ gives $f' = (x - 3)^2 \\ge 0$." },
        { text: "$k > \\frac13$", feedback: "Then the discriminant is positive and $f'$ is negative between its roots." },
        { text: "$k < 0$", feedback: "A downward parabola $f'$ is negative for large $\\lvert x\\rvert$." },
      ],
      hint: "Treat $k = 0$ separately; otherwise you need an upward parabola with discriminant $\\le 0$.",
    },
    {
      type: "quiz",
      id: "calc4-4-q12",
      variant: "mastery",
      question: "$f(x) = 2x^2 - \\ln\\lvert x\\rvert$ is decreasing on",
      options: [
        { text: "$\\left(-\\infty, -\\frac12\\right] \\cup \\left(0, \\frac12\\right]$", correct: true, feedback: "$f'(x) = \\frac{(2x - 1)(2x + 1)}{x}$ is negative on those two intervals." },
        { text: "$\\left[-\\frac12, \\frac12\\right]$", feedback: "That ignores both the gap at 0 and the sign of the denominator $x$." },
        { text: "$\\left[-\\frac12, 0\\right) \\cup \\left[\\frac12, \\infty\\right)$", feedback: "Those are the intervals where it **increases**." },
        { text: "$(0, \\infty)$", feedback: "For $x > \\frac12$, $f' > 0$." },
      ],
      hint: "Write $f'$ as one fraction and include $x = 0$ as a cut point.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "rolle-and-mean-value-theorems",
  title: "4.5 · Rolle's Theorem and the Mean Value Theorem",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "You drive out of your gate, run errands, and park back at the same gate. Somewhere in that trip your velocity was exactly zero: the moment you turned around. Now a different trip: 120 km in 2 hours on a highway with average-speed cameras. The ticket arrives because at some instant your speedometer must have read **exactly** 60 km/h, the average. Neither claim needs a formula for the trip. They need only that the motion is smooth. These are Rolle's theorem and the mean value theorem.",
    },
    { type: "heading", text: "Rolle's theorem" },
    {
      type: "callout",
      variant: "definition",
      title: "Rolle's theorem",
      content:
        "If $f$ is\n1. continuous on the closed interval $[a, b]$,\n2. differentiable on the open interval $(a, b)$, and\n3. $f(a) = f(b)$,\n\nthen there is **at least one** $c \\in (a, b)$ with $f'(c) = 0$.",
    },
    {
      type: "text",
      content:
        "Why it is true: a continuous function on $[a, b]$ reaches a maximum and a minimum. If both happen at the endpoints, $f$ is constant (the endpoint values are equal) and $f' = 0$ everywhere. Otherwise one of them happens at an interior point $c$, and at an interior peak or valley of a differentiable function the tangent is flat: $f'(c) = 0$.",
    },
    {
      type: "interactive",
      config: {
        component: "calc-tangent-explorer",
        expr: "x^3 - 4*x",
        exprLatex: "x^3 - 4x",
        derivExpr: "3*x^2 - 4",
        window: { xmin: -2.5, xmax: 2.5, ymin: -4, ymax: 4 },
        x0: { min: -2, max: 2, step: 0.05, initial: 0.5 },
        chord: { a: -2, b: 2 },
        caption:
          "Rolle's picture: $f(-2) = f(2) = 0$, so the chord is flat. The explorer marks every $c$ with $f'(c) = 0$: there are **two**, at $\\pm\\frac{2}{\\sqrt3} \\approx \\pm1.155$. Drag $x_0$ onto them.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"Rolle's theorem gives exactly one c\"",
      content:
        "It promises **at least one**. The explorer above shows two. The theorem also says nothing when its conditions fail: then a flat tangent may or may not exist.",
    },
    {
      type: "text",
      content:
        "Each condition matters. $\\lvert x\\rvert$ on $[-1, 1]$ has equal ends but a corner at 0: no tangent is ever flat. A function with a jump (say $f(x) = x$ on $[0, 1)$ and $f(1) = 0$) has equal ends but is not continuous: again no flat tangent. Try the corner case:",
    },
    {
      type: "interactive",
      config: {
        component: "calc-tangent-explorer",
        expr: "abs(x)",
        exprLatex: "\\lvert x \\rvert",
        derivExpr: "x/abs(x)",
        window: { xmin: -1.5, xmax: 1.5, ymin: -0.5, ymax: 1.5 },
        x0: { min: -1, max: 1, step: 0.1, initial: 0.5 },
        chord: { a: -1, b: 1 },
        caption:
          "$f(-1) = f(1)$, yet no tangent is flat: the slope is $-1$ or $+1$, and at 0 there is no tangent at all. Differentiability on $(-1, 1)$ fails, so Rolle's theorem does not apply.",
      },
    },
    { type: "heading", text: "Lagrange's mean value theorem" },
    {
      type: "callout",
      variant: "definition",
      title: "Mean value theorem (LMVT)",
      content:
        "If $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then for at least one $c \\in (a, b)$\n$$f'(c) = \\frac{f(b) - f(a)}{b - a}.$$\nGeometrically: some tangent is parallel to the chord joining the endpoints. In motion: at some instant the instantaneous speed equals the average speed.",
    },
    {
      type: "text",
      content:
        "**Derivation (tilt Rolle).** Let $m = \\frac{f(b) - f(a)}{b - a}$ be the chord's slope, and subtract the chord from the curve: $g(x) = f(x) - f(a) - m(x - a)$. Then $g(a) = 0$ and $g(b) = f(b) - f(a) - m(b - a) = 0$, and $g$ is as smooth as $f$. Rolle gives $c$ with $g'(c) = f'(c) - m = 0$. That is the whole proof: the mean value theorem is Rolle's theorem viewed on a tilted page.",
    },
    {
      type: "interactive",
      config: {
        component: "calc-tangent-explorer",
        expr: "x^3",
        exprLatex: "x^3",
        derivExpr: "3*x^2",
        window: { xmin: -1.5, xmax: 2.5, ymin: -2, ymax: 9 },
        x0: { min: -1, max: 2, step: 0.05, initial: 0 },
        chord: { a: -1, b: 2 },
        caption:
          "Chord from $(-1, -1)$ to $(2, 8)$ has slope 3. Solving $3c^2 = 3$ gives $c = \\pm1$, but only $c = 1$ lies inside $(-1, 2)$: the endpoint $-1$ does not count.",
      },
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "calc4-5-we1",
      title: "Worked example 1: verifying Rolle's theorem",
      problem: "Verify Rolle's theorem for $f(x) = x^2 - 5x + 6$ on $[2, 3]$.",
      steps: [
        { text: "Conditions: a polynomial is continuous and differentiable everywhere; $f(2) = 4 - 10 + 6 = 0$ and $f(3) = 9 - 15 + 6 = 0$. *Why this step:* always check all three conditions before looking for $c$." },
        { text: "$f'(x) = 2x - 5 = 0$ gives $c = \\frac52$, which lies in $(2, 3)$." },
      ],
      answer: "$c = \\frac52$. (For any quadratic, the Rolle or LMVT point is the midpoint of the interval.)",
    },
    {
      type: "worked-example",
      id: "calc4-5-we2",
      title: "Worked example 2: finding the mean value point",
      problem: "Find $c$ from the mean value theorem for $f(x) = \\ln x$ on $[1, e]$.",
      steps: [
        { text: "$\\ln$ is continuous on $[1, e]$ and differentiable on $(1, e)$." },
        { text: "Chord slope: $\\frac{\\ln e - \\ln 1}{e - 1} = \\frac{1}{e - 1}$." },
        { text: "$f'(c) = \\frac1c = \\frac{1}{e - 1}$ gives $c = e - 1 \\approx 1.718$, inside $(1, e)$." },
      ],
      answer: "$c = e - 1$.",
    },
    {
      type: "worked-example",
      id: "calc4-5-we3",
      title: "Worked example 3: bounding with the mean value theorem",
      problem:
        "(a) Show that $\\lvert \\sin a - \\sin b\\rvert \\le \\lvert a - b\\rvert$ for all real $a, b$. (b) $f$ is differentiable with $f(0) = -1$ and $f'(x) \\le 3$ for all $x$. How large can $f(2)$ be?",
      steps: [
        { text: "(a) By LMVT, $\\sin a - \\sin b = \\cos c\\,(a - b)$ for some $c$ between them. *Why this step:* the theorem turns a difference of values into one derivative times a difference of inputs." },
        { text: "Since $\\lvert\\cos c\\rvert \\le 1$, $\\lvert\\sin a - \\sin b\\rvert \\le \\lvert a - b\\rvert$." },
        { text: "(b) $f(2) - f(0) = 2f'(c) \\le 6$, so $f(2) \\le 5$. The bound is attained by $f(x) = 3x - 1$." },
      ],
      answer: "(a) Proved. (b) $f(2) \\le 5$.",
    },
    {
      type: "worked-example",
      id: "calc4-5-we4",
      title: "Worked example 4: counting roots with Rolle",
      problem: "Show that $x^3 + x - 1 = 0$ has exactly one real root.",
      steps: [
        { text: "At least one: $f(0) = -1 < 0$ and $f(1) = 1 > 0$, so the IVT gives a root in $(0, 1)$." },
        { text: "At most one: if there were two roots $p < q$, Rolle on $[p, q]$ would give $f'(c) = 0$. But $f'(x) = 3x^2 + 1 > 0$ always. *Why this step:* between any two roots of a differentiable function lies a root of its derivative, so no derivative root means at most one function root." },
      ],
      answer: "Exactly one real root, lying in $(0, 1)$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "What the mean value theorem buys you",
      content:
        "- $f' = 0$ on an interval $\\Rightarrow$ $f$ is constant there.\n- $f' > 0$ on an interval $\\Rightarrow$ $f$ is strictly increasing: for $x_1 < x_2$, $f(x_2) - f(x_1) = f'(c)(x_2 - x_1) > 0$. (This is the proof promised in lesson 4.4.)\n- Bounds on $f'$ give bounds on $f$.\n- Between two roots of $f$ there is a root of $f'$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "calc4-5-q1",
      variant: "practice",
      question: "Rolle's theorem cannot be applied to $f(x) = \\lvert x\\rvert$ on $[-1, 1]$ because",
      options: [
        { text: "$f$ is not differentiable at $x = 0$.", correct: true, feedback: "The corner at 0 breaks condition 2." },
        { text: "$f(-1) \\ne f(1)$.", feedback: "Both equal 1." },
        { text: "$f$ is not continuous on $[-1, 1]$.", feedback: "$\\lvert x\\rvert$ is continuous everywhere." },
      ],
      hint: "Check the three conditions one by one.",
    },
    {
      type: "numeric",
      id: "calc4-5-q2",
      variant: "practice",
      question: "Find the value of $c$ given by Rolle's theorem for $f(x) = x^2 - 6x + 8$ on $[2, 4]$.",
      answer: 3,
      hint: "Solve $f'(c) = 0$.",
      solution: "$f(2) = f(4) = 0$; $f'(c) = 2c - 6 = 0$ gives $c = 3$.",
    },
    {
      type: "numeric",
      id: "calc4-5-q3",
      variant: "practice",
      question: "Find $c$ from the mean value theorem for $f(x) = x^2$ on $[1, 3]$.",
      answer: 2,
      hint: "Chord slope $\\frac{9 - 1}{3 - 1}$.",
      solution: "Chord slope 4; $2c = 4$ gives $c = 2$, the midpoint, as for every quadratic.",
      commonMistakes: [{ answer: 4, feedback: "4 is the chord's slope $f'(c)$. Solve $2c = 4$ for $c$." }],
    },
    {
      type: "quiz",
      id: "calc4-5-q4",
      variant: "practice",
      multiple: true,
      question: "Select **all** cases in which Rolle's theorem applies.",
      options: [
        { text: "$\\sin x$ on $[0, \\pi]$", correct: true, feedback: "Smooth, with $\\sin 0 = \\sin\\pi = 0$; $c = \\frac\\pi2$." },
        { text: "$x^2$ on $[-1, 1]$", correct: true, feedback: "Smooth, equal ends; $c = 0$." },
        { text: "$\\tan x$ on $[0, \\pi]$", feedback: "$\\tan x$ is discontinuous at $\\frac\\pi2$." },
        { text: "$1 + (x - 2)^{2/3}$ on $[1, 3]$", feedback: "Equal ends, but $f'(x) = \\frac{2}{3(x - 2)^{1/3}}$ does not exist at $x = 2$ (a cusp)." },
        { text: "$\\lvert x\\rvert$ on $[-2, 2]$", feedback: "A corner at 0." },
      ],
      hint: "Each case must pass all three conditions: continuity on $[a, b]$, differentiability on $(a, b)$, equal end values.",
    },
    {
      type: "numeric",
      id: "calc4-5-q5",
      variant: "practice",
      question: "Find $c$ from the mean value theorem for $f(x) = x^3 - 2x$ on $[0, 2]$ (3 decimal places).",
      answer: 1.155,
      tolerance: 0.002,
      hint: "Chord slope $\\frac{f(2) - f(0)}{2}$, then solve $3c^2 - 2 = $ that slope.",
      solution: "$f(2) = 4$, $f(0) = 0$, chord slope 2. $3c^2 - 2 = 2$ gives $c^2 = \\frac43$, $c = \\frac{2}{\\sqrt3} \\approx 1.155$ (the negative root is outside the interval).",
      commonMistakes: [{ answer: -1.155, tolerance: 0.002, feedback: "$c$ must lie in $(0, 2)$." }],
    },
    {
      type: "quiz",
      id: "calc4-5-q6",
      variant: "concept",
      question: "For $f(x) = x^3 - 4x$ on $[-2, 2]$, how many values of $c$ satisfy the conclusion of Rolle's theorem?",
      options: [
        { text: "Two", correct: true, feedback: "$3c^2 - 4 = 0$ gives $c = \\pm\\frac{2}{\\sqrt3}$, both in $(-2, 2)$. Rolle guarantees at least one." },
        { text: "Exactly one, as the theorem says", feedback: "The theorem says **at least** one." },
        { text: "None, because $f$ is odd", feedback: "Oddness is irrelevant; check $f'(c) = 0$." },
      ],
      hint: "Solve $f'(c) = 0$ and count the roots in $(-2, 2)$.",
    },
    {
      type: "quiz",
      id: "calc4-5-q7",
      variant: "practice",
      question: "For $f(x) = x(x + 3)e^{-x/2}$ on $[-3, 0]$, the value of $c$ in Rolle's theorem is",
      options: [
        { text: "$-2$", correct: true, feedback: "$f'(x) = \\frac12 e^{-x/2}(-x^2 + x + 6) = 0$ gives $x = 3$ or $x = -2$; only $-2$ lies in $(-3, 0)$." },
        { text: "$3$", feedback: "$x = 3$ solves $f'(x) = 0$ but lies outside $(-3, 0)$." },
        { text: "$-\\frac32$", feedback: "That is the midpoint, which works for quadratics. This $f$ is not quadratic." },
        { text: "$-1$", feedback: "$f'(-1) = \\frac12 e^{1/2}(-1 - 1 + 6) \\ne 0$." },
      ],
      hint: "Product rule on $(x^2 + 3x)e^{-x/2}$, then factor out the exponential.",
    },
    {
      type: "numeric",
      id: "calc4-5-q8",
      variant: "practice",
      question: "Find $c$ from the mean value theorem for $f(x) = e^x$ on $[0, 1]$ (3 decimal places).",
      answer: 0.541,
      tolerance: 0.002,
      hint: "Solve $e^c = \\frac{e - 1}{1 - 0}$.",
      solution: "$e^c = e - 1$, so $c = \\ln(e - 1) \\approx \\ln 1.718 \\approx 0.541$.",
      commonMistakes: [{ answer: 0.5, feedback: "The midpoint works only for quadratics. Solve $e^c = e - 1$." }],
    },
    {
      type: "numeric",
      id: "calc4-5-q9",
      variant: "mastery",
      question: "$f$ is differentiable on $\\mathbb R$ with $f(1) = -2$ and $f'(x) \\ge 2$ for all $x$. What is the least possible value of $f(6)$?",
      answer: 8,
      hint: "LMVT on $[1, 6]$: $f(6) - f(1) = 5f'(c)$.",
      solution: "$f(6) = f(1) + 5f'(c) \\ge -2 + 10 = 8$. Equality for $f(x) = 2x - 4$.",
      commonMistakes: [{ answer: 10, feedback: "That is $5 \\times 2$; add $f(1) = -2$." }],
    },
    {
      type: "numeric",
      id: "calc4-5-q10",
      variant: "mastery",
      question: "Let $f(x) = (x - 1)(x - 2)(x - 3)(x - 4)$. How many real roots does $f'(x) = 0$ have?",
      answer: 3,
      hint: "Rolle on $[1, 2]$, $[2, 3]$, $[3, 4]$; and $f'$ is a cubic.",
      solution: "Each of $(1, 2)$, $(2, 3)$, $(3, 4)$ contains a root of $f'$ by Rolle. $f'$ is a cubic, so it has at most 3 roots: exactly 3.",
      commonMistakes: [{ answer: 4, feedback: "$f'$ has degree 3, so at most 3 roots." }],
    },
    {
      type: "quiz",
      id: "calc4-5-q11",
      variant: "mastery",
      multiple: true,
      question: "$f$ is differentiable on $\\mathbb R$ with $f(0) = 0$, $f(1) = 1$ and $f(2) = 1$. Select **all** statements that must be true.",
      options: [
        { text: "$f'(c) = 1$ for some $c \\in (0, 1)$.", correct: true, feedback: "LMVT on $[0, 1]$: chord slope $\\frac{1 - 0}{1} = 1$." },
        { text: "$f'(c) = 0$ for some $c \\in (1, 2)$.", correct: true, feedback: "Rolle on $[1, 2]$: $f(1) = f(2)$." },
        { text: "$f'(c) = \\frac12$ for some $c \\in (0, 2)$.", correct: true, feedback: "LMVT on $[0, 2]$: $\\frac{1 - 0}{2}$." },
        { text: "$f'(x) \\ge 0$ for all $x \\in [0, 2]$.", feedback: "Nothing forces that: $f$ could dip and recover between the given points." },
      ],
      hint: "Apply the theorems on $[0, 1]$, $[1, 2]$ and $[0, 2]$ separately.",
    },
    {
      type: "quiz",
      id: "calc4-5-q12",
      variant: "mastery",
      question: "How many real roots does $x^5 + x^3 + x + 1 = 0$ have?",
      options: [
        { text: "Exactly one", correct: true, feedback: "Odd degree gives at least one; $f'(x) = 5x^4 + 3x^2 + 1 > 0$ rules out two (Rolle)." },
        { text: "Three", feedback: "Two roots would force a zero of $f'$ between them, but $f' > 0$ always." },
        { text: "Five", feedback: "A quintic has at most five, but $f$ is strictly increasing here." },
        { text: "None", feedback: "An odd-degree polynomial always crosses the axis." },
      ],
      hint: "Look at the sign of $f'$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "approximations-and-errors",
  title: "4.6 · Approximations, Differentials and Errors",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Zoom in on any smooth curve, far enough, and it straightens out: under a microscope it is indistinguishable from its tangent line. That is the most useful fact in applied calculus. Near a point you know, a hard function can be replaced by an easy line, and the error is tiny.",
    },
    {
      type: "interactive",
      config: {
        component: "calc-tangent-explorer",
        expr: "sqrt(x)",
        exprLatex: "\\sqrt{x}",
        window: { xmin: 24, xmax: 26.5, ymin: 4.85, ymax: 5.15 },
        x0: { min: 24.5, max: 26, step: 0.1, initial: 25 },
        caption:
          "A close-up of $\\sqrt{x}$ near 25. The tangent at $x_0 = 25$ is $y = 5 + 0.1(x - 25)$, and at this zoom you can barely tell it from the curve.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "calc-tangent-explorer",
        expr: "sqrt(x)",
        exprLatex: "\\sqrt{x}",
        window: { xmin: 0, xmax: 50, ymin: 0, ymax: 9 },
        x0: { min: 1, max: 49, step: 1, initial: 25 },
        caption:
          "The same tangent from far away. Close to $x_0$ it hugs the curve; far from $x_0$ it drifts above it. Linear approximation is a **local** tool.",
      },
    },
    { type: "heading", text: "Linear approximation and the differential" },
    {
      type: "math",
      latex: "f(x_0 + \\Delta x) \\approx f(x_0) + f'(x_0)\\,\\Delta x",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Increment and differential",
      content:
        "For $y = f(x)$ and a change $\\Delta x$ in $x$:\n- the **increment** $\\Delta y = f(x + \\Delta x) - f(x)$ is the true change along the curve;\n- the **differential** $dy = f'(x)\\,dx$ (with $dx = \\Delta x$) is the change along the tangent.\n\nFor small $\\Delta x$, $\\Delta y \\approx dy$, and the gap $\\Delta y - dy$ shrinks like $(\\Delta x)^2$.",
    },
    {
      type: "worked-example",
      id: "calc4-6-we1",
      title: "Worked example 1: square root",
      problem: "Approximate $\\sqrt{25.2}$.",
      steps: [
        { text: "Pick a nearby point where the function is easy: $f(x) = \\sqrt x$, $x_0 = 25$, $\\Delta x = 0.2$. *Why this step:* the approximation is only good near a point where you know $f$ and $f'$ exactly." },
        { text: "$f'(x) = \\frac{1}{2\\sqrt x}$, so $f'(25) = \\frac{1}{10}$." },
        { text: "$\\sqrt{25.2} \\approx 5 + \\frac{1}{10}(0.2) = 5.02$. (Calculator: $5.01996\\ldots$)" },
      ],
      answer: "$\\sqrt{25.2} \\approx 5.02$.",
    },
    {
      type: "worked-example",
      id: "calc4-6-we2",
      title: "Worked example 2: a power and a trig value",
      problem: "Approximate (a) $(1.98)^5$ and (b) $\\sin 31^\\circ$.",
      steps: [
        { text: "(a) $f(x) = x^5$, $x_0 = 2$, $\\Delta x = -0.02$: $f'(2) = 5\\cdot16 = 80$, so $(1.98)^5 \\approx 32 - 1.6 = 30.4$ (true value $30.43\\ldots$)." },
        { text: "(b) Work in radians: $\\Delta x = 1^\\circ = \\frac{\\pi}{180} \\approx 0.01745$. *Why this step:* $\\frac{d}{dx}\\sin x = \\cos x$ holds only for $x$ in radians." },
        { text: "$\\sin 31^\\circ \\approx \\sin 30^\\circ + \\cos 30^\\circ\\cdot\\frac{\\pi}{180} = 0.5 + 0.8660 \\times 0.01745 \\approx 0.5151$ (true value $0.5150\\ldots$)." },
      ],
      answer: "(a) $\\approx 30.4$; (b) $\\approx 0.5151$.",
    },
    { type: "heading", text: "Absolute, relative and percentage error" },
    {
      type: "text",
      content:
        "If a measured quantity $x$ carries an error $\\Delta x$, then a quantity $y = f(x)$ computed from it carries an error $\\Delta y \\approx f'(x)\\Delta x$. Three ways to report it:\n\n- **absolute error** $\\Delta y$;\n- **relative error** $\\frac{\\Delta y}{y}$;\n- **percentage error** $\\frac{\\Delta y}{y} \\times 100$.\n\nFor powers, logarithms make it effortless: if $y = x^n$ then $\\ln y = n\\ln x$, so $\\frac{dy}{y} = n\\frac{dx}{x}$. More generally, for $y = x^pz^q$, $\\frac{dy}{y} = p\\frac{dx}{x} + q\\frac{dz}{z}$, and the largest possible percentage error adds the absolute values.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a 1% error in r gives a 1% error in r cubed\"",
      content:
        "Relative errors get **multiplied by the power**: a 1% error in a radius is about a 3% error in the volume $\\frac43\\pi r^3$ and a 2% error in the area $\\pi r^2$. The constant $\\frac43\\pi$ contributes no relative error at all.",
    },
    {
      type: "worked-example",
      id: "calc4-6-we3",
      title: "Worked example 3: error in a sphere's volume",
      problem: "A sphere's radius is measured as 10 cm with a possible error of 0.02 cm. Estimate the error in its volume, absolute and percentage.",
      steps: [
        { text: "$V = \\frac43\\pi r^3$, $dV = 4\\pi r^2\\,dr = 4\\pi(100)(0.02) = 8\\pi \\approx 25.1$ cm³." },
        { text: "Percentage: $\\frac{dV}{V} = 3\\frac{dr}{r} = 3 \\times 0.2\\% = 0.6\\%$. *Why this step:* the log rule gives the relative error without computing $V$ at all." },
      ],
      answer: "About $8\\pi \\approx 25.1$ cm³, i.e. $0.6\\%$.",
    },
    {
      type: "worked-example",
      id: "calc4-6-we4",
      title: "Worked example 4: a cube root and a polynomial",
      problem: "Approximate (a) $\\sqrt[3]{26}$ and (b) $f(5.001)$ for $f(x) = x^3 - 7x^2 + 15$.",
      steps: [
        { text: "(a) $x_0 = 27$, $\\Delta x = -1$, $f'(x) = \\frac13x^{-2/3}$, $f'(27) = \\frac{1}{27}$. So $\\sqrt[3]{26} \\approx 3 - \\frac{1}{27} \\approx 2.963$ (true $2.9625$)." },
        { text: "(b) $f(5) = 125 - 175 + 15 = -35$ and $f'(x) = 3x^2 - 14x$, so $f'(5) = 5$. Then $f(5.001) \\approx -35 + 5(0.001) = -34.995$." },
      ],
      answer: "(a) $\\approx 2.963$; (b) $\\approx -34.995$.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "calc4-6-q1",
      variant: "practice",
      question: "Use differentials to approximate $\\sqrt{36.6}$.",
      answer: 6.05,
      tolerance: 0.001,
      hint: "$x_0 = 36$, $\\Delta x = 0.6$, $f'(36) = \\frac{1}{12}$.",
      solution: "$\\sqrt{36.6} \\approx 6 + \\frac{0.6}{12} = 6.05$.",
      commonMistakes: [{ answer: 6.1, tolerance: 0.001, feedback: "$f'(36) = \\frac{1}{2\\sqrt{36}} = \\frac{1}{12}$, not $\\frac16$." }],
    },
    {
      type: "numeric",
      id: "calc4-6-q2",
      variant: "practice",
      question: "Use differentials to approximate $\\frac{1}{2.002}$.",
      answer: 0.4995,
      tolerance: 0.00005,
      hint: "$f(x) = \\frac1x$ at $x_0 = 2$, $\\Delta x = 0.002$.",
      solution: "$f'(x) = -\\frac{1}{x^2}$, so $\\frac{1}{2.002} \\approx \\frac12 - \\frac14(0.002) = 0.4995$.",
      commonMistakes: [{ answer: 0.5005, tolerance: 0.00005, feedback: "$\\frac1x$ decreases, so the correction is negative." }],
    },
    {
      type: "numeric",
      id: "calc4-6-q3",
      variant: "practice",
      question: "The edge of a cube is measured with a 1% error. What is the approximate percentage error in its volume?",
      answer: 3,
      unit: "%",
      hint: "$V = a^3$, so $\\frac{dV}{V} = 3\\frac{da}{a}$.",
      solution: "$3 \\times 1\\% = 3\\%$.",
      commonMistakes: [{ answer: 1, feedback: "Relative errors are multiplied by the power: $3 \\times 1\\%$." }],
    },
    {
      type: "quiz",
      id: "calc4-6-q4",
      variant: "practice",
      question: "For $y = x^4$, as $x$ changes from 2 to 2.01, the differential $dy$ is",
      options: [
        { text: "$0.32$", correct: true, feedback: "$dy = 4x^3\\,dx = 32 \\times 0.01$." },
        { text: "$0.3224$", feedback: "That is the true increment $\\Delta y = 2.01^4 - 16$. The differential uses the tangent." },
        { text: "$0.16$", feedback: "$4x^3$ at $x = 2$ is 32, not 16." },
        { text: "$0.01$", feedback: "That is $dx$." },
      ],
      hint: "$dy = f'(x)\\,dx$.",
    },
    {
      type: "quiz",
      id: "calc4-6-q5",
      variant: "concept",
      question: "For $y = x^2$ at $x > 0$ with $\\Delta x > 0$, how do $dy$ and $\\Delta y$ compare?",
      options: [
        { text: "$dy < \\Delta y$: the curve bends up above its tangent.", correct: true, feedback: "$\\Delta y = 2x\\Delta x + (\\Delta x)^2$ and $dy = 2x\\Delta x$; the gap is $(\\Delta x)^2 > 0$." },
        { text: "$dy = \\Delta y$ exactly.", feedback: "Only for straight lines." },
        { text: "$dy > \\Delta y$.", feedback: "That happens for curves bending down, like $\\sqrt x$." },
      ],
      hint: "Expand $(x + \\Delta x)^2 - x^2$.",
    },
    {
      type: "numeric",
      id: "calc4-6-q6",
      variant: "practice",
      question: "Use differentials to approximate $\\ln(1.03)$.",
      answer: 0.03,
      tolerance: 0.0006,
      hint: "$f(x) = \\ln x$ at $x_0 = 1$.",
      solution: "$f'(1) = 1$, so $\\ln(1.03) \\approx 0 + 1(0.03) = 0.03$ (true $0.0296$).",
    },
    {
      type: "numeric",
      id: "calc4-6-q7",
      variant: "practice",
      question: "Use differentials to approximate $f(5.001)$ for $f(x) = 2x^3 - 7x^2 + 15$.",
      answer: 90.08,
      tolerance: 0.001,
      hint: "Compute $f(5)$ and $f'(5)$ first, then add $f'(5)\\times 0.001$.",
      solution: "$f(5) = 250 - 175 + 15 = 90$ and $f'(x) = 6x^2 - 14x$, so $f'(5) = 80$. Then $f(5.001) \\approx 90 + 80(0.001) = 90.08$.",
      commonMistakes: [
        { answer: 90, feedback: "That is $f(5)$; add the tangent-line correction $f'(5)\\,\\Delta x$." },
        { answer: 90.008, tolerance: 0.0005, feedback: "Recheck $f'(5) = 6(25) - 14(5) = 80$, not 8." },
      ],
    },
    {
      type: "numeric",
      id: "calc4-6-q8",
      variant: "practice",
      question: "The radius of a circle is measured as 5 cm with an error of 0.05 cm. Approximate the error in its area (cm²).",
      answer: 1.571,
      relTolerance: 0.01,
      unit: "cm²",
      hint: "$dA = 2\\pi r\\,dr$.",
      solution: "$dA = 2\\pi(5)(0.05) = 0.5\\pi \\approx 1.571$ cm².",
      commonMistakes: [{ answer: 0.785, tolerance: 0.01, feedback: "That is $\\pi r\\,dr$; the derivative of $\\pi r^2$ is $2\\pi r$." }],
    },
    {
      type: "numeric",
      id: "calc4-6-q9",
      variant: "practice",
      question: "The period of a pendulum is $T = 2\\pi\\sqrt{l/g}$. If $l$ increases by 2%, by about what percentage does $T$ increase?",
      answer: 1,
      unit: "%",
      hint: "$T \\propto l^{1/2}$.",
      solution: "$\\frac{dT}{T} = \\frac12\\frac{dl}{l} = \\frac12 \\times 2\\% = 1\\%$.",
      commonMistakes: [{ answer: 4, feedback: "The power is $\\frac12$, not 2." }],
    },
    {
      type: "quiz",
      id: "calc4-6-q10",
      variant: "practice",
      question: "Using differentials, $\\sqrt[3]{65}$ is approximately",
      options: [
        { text: "$4.0208$", correct: true, feedback: "$4 + \\frac{1}{3\\cdot 16} = 4 + \\frac{1}{48}$." },
        { text: "$4.0625$", feedback: "That is $4 + \\frac{1}{16}$: you dropped the $\\frac13$ in $\\frac13x^{-2/3}$." },
        { text: "$4.0833$", feedback: "That is $4 + \\frac{1}{12}$. At $x = 64$, $x^{-2/3} = \\frac{1}{16}$." },
        { text: "$4.3333$", feedback: "The correction must be tiny, since 65 is very close to 64." },
      ],
      hint: "$x_0 = 64$, $\\Delta x = 1$, $f'(x) = \\frac13x^{-2/3}$.",
    },
    {
      type: "quiz",
      id: "calc4-6-q11",
      variant: "practice",
      question: "Using differentials, $\\tan 46^\\circ$ is approximately",
      options: [
        { text: "$1.0349$", correct: true, feedback: "$1 + \\sec^2 45^\\circ\\cdot\\frac{\\pi}{180} = 1 + 2(0.01745)$." },
        { text: "$1.0175$", feedback: "You forgot $\\sec^2 45^\\circ = 2$." },
        { text: "$3.0000$", feedback: "With $\\Delta x = 1$ (degrees) you get nonsense. Convert to radians." },
        { text: "$1.0000$", feedback: "That is $\\tan 45^\\circ$, with no correction." },
      ],
      hint: "$\\frac{d}{dx}\\tan x = \\sec^2 x$, and $1^\\circ = \\frac{\\pi}{180}$ rad.",
    },
    {
      type: "numeric",
      id: "calc4-6-q12",
      variant: "mastery",
      question: "The radius of a sphere is measured as 9 m with an error of 0.03 m. Find the approximate error in its surface area (m²).",
      answer: 6.786,
      relTolerance: 0.01,
      unit: "m²",
      hint: "$S = 4\\pi r^2$, so $dS = 8\\pi r\\,dr$.",
      solution: "$dS = 8\\pi(9)(0.03) = 2.16\\pi \\approx 6.79$ m².",
      commonMistakes: [{ answer: 3.393, tolerance: 0.02, feedback: "The derivative of $4\\pi r^2$ is $8\\pi r$, not $4\\pi r$." }],
    },
    {
      type: "numeric",
      id: "calc4-6-q13",
      variant: "mastery",
      question: "$y = x^2z^3$. If $x$ is measured with a 1% error and $z$ with a 2% error, what is the maximum approximate percentage error in $y$?",
      answer: 8,
      unit: "%",
      hint: "Take logs: $\\frac{dy}{y} = 2\\frac{dx}{x} + 3\\frac{dz}{z}$.",
      solution: "Worst case: $2(1\\%) + 3(2\\%) = 8\\%$.",
      commonMistakes: [
        { answer: 3, feedback: "Multiply each relative error by its power before adding." },
        { answer: 4, feedback: "For the maximum error the contributions add: $2 + 6$." },
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
      type: "text",
      content:
        "No formula sheet. Every question here comes from reading $f'$ in one of two ways: as a **rate** (how fast one quantity changes because another does) or as a **slope** (the direction of the curve at a point). If you can rebuild the six lines below from those two readings, you own the chapter.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 4 in six lines",
      content:
        "1. Related rates: relate the quantities at a general moment, differentiate with respect to $t$, substitute the instant's values last.\n2. Tangent $y - y_0 = m(x - x_0)$, normal $y - y_0 = -\\frac1m(x - x_0)$ with $m = f'(x_0)$; from an outside point, name the contact point.\n3. Subtangent $\\left\\lvert\\frac{y}{y'}\\right\\rvert$, subnormal $\\lvert yy'\\rvert$; angle between curves $\\tan\\theta = \\left\\lvert\\frac{m_1 - m_2}{1 + m_1m_2}\\right\\rvert$.\n4. $f' > 0$ on an interval means strictly increasing; isolated zeros of $f'$ are harmless.\n5. Rolle: smooth with equal ends gives a flat tangent; LMVT: some tangent is parallel to the chord.\n6. $\\Delta y \\approx f'(x)\\Delta x$; relative errors multiply by powers.",
    },
    {
      type: "numeric",
      id: "calc4-7-q1",
      variant: "mastery",
      question: "Gas is pumped into a spherical balloon at $50$ cm³/s. How fast is the radius increasing when the radius is $5$ cm? (cm/s, 3 decimal places)",
      answer: 0.159,
      tolerance: 0.002,
      unit: "cm/s",
      hint: "Lesson 4.1: $\\frac{dV}{dt} = 4\\pi r^2\\frac{dr}{dt}$.",
      solution: "$50 = 4\\pi(25)\\frac{dr}{dt}$, so $\\frac{dr}{dt} = \\frac{1}{2\\pi} \\approx 0.159$ cm/s.",
      commonMistakes: [{ answer: 0.477, tolerance: 0.003, feedback: "Differentiate $\\frac43\\pi r^3$ correctly: the derivative is $4\\pi r^2$, not $\\frac43\\pi r^2$." }],
    },
    {
      type: "numeric",
      id: "calc4-7-q2",
      variant: "mastery",
      question: "A 10 m ladder leans on a wall. Its foot is pulled away at $1.2$ m/s. At what speed is the top sliding down when the foot is 6 m from the wall? (m/s)",
      answer: 0.9,
      tolerance: 0.001,
      unit: "m/s",
      hint: "Lesson 4.1: $x^2 + y^2 = 100$; differentiate before substituting.",
      solution: "$x\\dot x + y\\dot y = 0$; at $x = 6$, $y = 8$: $\\dot y = -\\frac{6(1.2)}{8} = -0.9$. The top slides down at $0.9$ m/s.",
      commonMistakes: [
        { answer: 1.6, tolerance: 0.001, feedback: "You swapped $x$ and $y$: $\\dot y = -\\frac{x}{y}\\dot x$ with $x = 6$, $y = 8$." },
        { answer: -0.9, tolerance: 0.001, feedback: "The question asks for the speed, a positive number; the minus sign only says 'downward'." },
      ],
    },
    {
      type: "quiz",
      id: "calc4-7-q3",
      variant: "mastery",
      question: "A lamp is 6 m above the ground and a 2 m tall person walks away from it at 5 km/h. The tip of the shadow moves at",
      options: [
        { text: "7.5 km/h", correct: true, feedback: "$s = \\frac x2$, so the tip at $x + s = \\frac{3x}{2}$ moves at $\\frac32 \\times 5$." },
        { text: "2.5 km/h", feedback: "That is how fast the shadow **lengthens**." },
        { text: "5 km/h", feedback: "The tip runs ahead of the walker." },
        { text: "10 km/h", feedback: "Check the similar triangles: $\\frac{6}{x + s} = \\frac2s$ gives $s = \\frac x2$." },
      ],
      hint: "Lesson 4.1: similar triangles give the shadow length in terms of $x$.",
    },
    {
      type: "quiz",
      id: "calc4-7-q4",
      variant: "mastery",
      question: "The normal to $y = x^2 + 1$ at $(1, 2)$ is",
      options: [
        { text: "$x + 2y = 5$", correct: true, feedback: "Slope of tangent 2, normal $-\\frac12$: $y - 2 = -\\frac12(x - 1)$." },
        { text: "$y = 2x$", feedback: "That is the tangent." },
        { text: "$2x + y = 4$", feedback: "That line has slope $-2$, the negative of the tangent slope, not the negative reciprocal." },
        { text: "$x - 2y + 3 = 0$", feedback: "Slope $+\\frac12$: the sign is wrong." },
      ],
      hint: "Lesson 4.2: the normal's slope is $-\\frac{1}{f'(1)}$.",
    },
    {
      type: "numeric",
      id: "calc4-7-q5",
      variant: "mastery",
      question: "A tangent to $y = e^x$ passes through the origin. Find the $x$-coordinate of its point of contact.",
      answer: 1,
      hint: "Lesson 4.2: tangent at $(t, e^t)$ is $y - e^t = e^t(x - t)$; put in $(0, 0)$.",
      solution: "$-e^t = -te^t$ gives $t = 1$. The tangent is $y = ex$.",
      commonMistakes: [{ answer: 0, feedback: "At $t = 0$ the tangent is $y = x + 1$, which misses the origin." }],
    },
    {
      type: "quiz",
      id: "calc4-7-q6",
      variant: "mastery",
      multiple: true,
      question: "For $y = x^3$ at the point $(1, 1)$, select **all** true statements.",
      options: [
        { text: "The tangent is $y = 3x - 2$.", correct: true, feedback: "Slope $3$ through $(1, 1)$." },
        { text: "The tangent meets the curve again at $x = -2$.", correct: true, feedback: "$x^3 - 3x + 2 = (x - 1)^2(x + 2)$." },
        { text: "The subtangent is $\\frac13$.", correct: true, feedback: "$\\frac{y}{y'} = \\frac13$." },
        { text: "The subnormal is $\\frac13$.", feedback: "The subnormal is $yy' = 3$." },
      ],
      hint: "Lessons 4.2 and 4.3.",
    },
    {
      type: "numeric",
      id: "calc4-7-q7",
      variant: "mastery",
      question: "Find $\\tan\\theta$ for the acute angle between the curves $xy = 2$ and $x^2 + 4y = 0$ at their point of intersection.",
      answer: 3,
      hint: "Lesson 4.3: find the intersection first ($x^3 = -8$), then both slopes.",
      solution:
        "Substituting $y = \\frac2x$: $x^2 + \\frac8x = 0$, so $x = -2$, $y = -1$. Slopes: $-\\frac{2}{x^2} = -\\frac12$ and $-\\frac x2 = 1$. $\\tan\\theta = \\left\\lvert\\frac{-\\frac12 - 1}{1 - \\frac12}\\right\\rvert = 3$.",
      commonMistakes: [{ answer: 1, feedback: "Recheck the denominator: $1 + m_1m_2 = 1 + \\left(-\\frac12\\right)(1) = \\frac12$." }],
    },
    {
      type: "quiz",
      id: "calc4-7-q8",
      variant: "mastery",
      question: "At what angle do $4x^2 + 9y^2 = 72$ and $x^2 - y^2 = 5$ intersect?",
      options: [
        { text: "$90^\\circ$", correct: true, feedback: "In the form $ax^2 + by^2 = 1$: $\\frac1a - \\frac1b = 18 - 8 = 10$ and $\\frac1{a'} - \\frac1{b'} = 5 + 5 = 10$. Orthogonal." },
        { text: "$45^\\circ$", feedback: "Test the orthogonality condition before computing slopes." },
        { text: "$0^\\circ$ (they touch)", feedback: "Touching curves share a slope; here the slopes multiply to $-1$." },
        { text: "$60^\\circ$", feedback: "At $(3, 2)$ the slopes are $-\\frac{2}{3}$ and $\\frac32$: product $-1$." },
      ],
      hint: "Lesson 4.3: use $\\frac1a - \\frac1b = \\frac1{a'} - \\frac1{b'}$, or compute both slopes at $(3, 2)$.",
    },
    {
      type: "quiz",
      id: "calc4-7-q9",
      variant: "mastery",
      question: "$f(x) = x^3 - 27x + 5$ is decreasing on",
      options: [
        { text: "$[-3, 3]$", correct: true, feedback: "$f'(x) = 3(x^2 - 9) \\le 0$ for $\\lvert x\\rvert \\le 3$." },
        { text: "$(-\\infty, -3] \\cup [3, \\infty)$", feedback: "That is where it increases." },
        { text: "$[-9, 9]$", feedback: "$f' = 3x^2 - 27 = 0$ at $x^2 = 9$, i.e. $x = \\pm3$." },
        { text: "$[0, 27]$", feedback: "Solve $f'(x) \\le 0$, not $f(x) \\le 0$." },
      ],
      hint: "Lesson 4.4: the sign of $f'$.",
    },
    {
      type: "numeric",
      id: "calc4-7-q10",
      variant: "mastery",
      question: "Find the greatest integer $b$ for which $f(x) = x^3 + bx^2 + 12x + 3$ is increasing on $\\mathbb R$.",
      answer: 6,
      hint: "Lesson 4.4: $f'(x) = 3x^2 + 2bx + 12 \\ge 0$ for all $x$ needs discriminant $\\le 0$.",
      solution: "$4b^2 - 144 \\le 0$, so $\\lvert b\\rvert \\le 6$. At $b = 6$, $f' = 3(x + 2)^2$ has an isolated zero: still increasing. Greatest $b = 6$.",
      commonMistakes: [{ answer: 5, feedback: "At $b = 6$, $f'$ has a single zero and $f$ is still strictly increasing; include it." }],
    },
    {
      type: "quiz",
      id: "calc4-7-q11",
      variant: "mastery",
      multiple: true,
      question: "Let $f(x) = \\ln(1 + x) - x$ for $x > -1$. Select **all** true statements.",
      options: [
        { text: "$f$ is increasing on $(-1, 0]$.", correct: true, feedback: "$f'(x) = \\frac{1}{1 + x} - 1 = -\\frac{x}{1 + x} > 0$ for $-1 < x < 0$." },
        { text: "$f$ is decreasing on $[0, \\infty)$.", correct: true, feedback: "$-\\frac{x}{1 + x} < 0$ for $x > 0$." },
        { text: "$\\ln(1 + x) \\le x$ for all $x > -1$.", correct: true, feedback: "$f$ rises to $f(0) = 0$ and then falls, so $f(x) \\le 0$ everywhere." },
        { text: "$f$ is increasing on $(0, \\infty)$.", feedback: "It decreases there." },
      ],
      hint: "Lesson 4.4: simplify $f'(x)$ to one fraction.",
    },
    {
      type: "numeric",
      id: "calc4-7-q12",
      variant: "mastery",
      question: "Find $c$ from the mean value theorem for $f(x) = x^2 - 3x + 2$ on $[1, 4]$.",
      answer: 2.5,
      tolerance: 0.001,
      hint: "Lesson 4.5: for a quadratic the answer is the midpoint, but check by solving $f'(c) = $ chord slope.",
      solution: "$f(1) = 0$, $f(4) = 6$, chord slope 2. $2c - 3 = 2$ gives $c = 2.5$.",
    },
    {
      type: "quiz",
      id: "calc4-7-q13",
      variant: "mastery",
      question: "Rolle's theorem does not apply to $f(x) = \\lvert x - 1\\rvert$ on $[0, 2]$ because",
      options: [
        { text: "$f$ is not differentiable at $x = 1$.", correct: true, feedback: "A corner at 1, inside the interval." },
        { text: "$f(0) \\ne f(2)$.", feedback: "Both equal 1." },
        { text: "$f$ is not continuous at $x = 1$.", feedback: "It is continuous; it only has a corner." },
      ],
      hint: "Lesson 4.5: check the three conditions.",
    },
    {
      type: "numeric",
      id: "calc4-7-q14",
      variant: "mastery",
      question: "$f$ is differentiable on $\\mathbb R$, $f(1) = 3$, and $f'(x) \\le 4$ for all $x$. What is the greatest possible value of $f(4)$?",
      answer: 15,
      hint: "Lesson 4.5: $f(4) - f(1) = 3f'(c)$.",
      solution: "$f(4) \\le 3 + 3(4) = 15$, attained by $f(x) = 4x - 1$.",
      commonMistakes: [{ answer: 19, feedback: "The interval $[1, 4]$ has length 3, not 4." }],
    },
    {
      type: "numeric",
      id: "calc4-7-q15",
      variant: "mastery",
      question: "Use differentials to approximate $\\sqrt{49.5}$ (4 decimal places).",
      answer: 7.0357,
      tolerance: 0.0005,
      hint: "Lesson 4.6: $x_0 = 49$, $f'(49) = \\frac{1}{14}$.",
      solution: "$7 + \\frac{0.5}{14} \\approx 7.0357$.",
      commonMistakes: [{ answer: 7.0714, tolerance: 0.0005, feedback: "$f'(49) = \\frac{1}{2\\cdot7}$, not $\\frac17$." }],
    },
    {
      type: "numeric",
      id: "calc4-7-q16",
      variant: "mastery",
      question: "The side of a square is measured with a 2% error. What is the approximate percentage error in its area?",
      answer: 4,
      unit: "%",
      hint: "Lesson 4.6: $A = s^2$, so $\\frac{dA}{A} = 2\\frac{ds}{s}$.",
      solution: "$2 \\times 2\\% = 4\\%$.",
      commonMistakes: [{ answer: 2, feedback: "Relative error is multiplied by the power 2." }],
    },
    {
      type: "callout",
      variant: "info",
      content:
        "All solid? Then the derivative is working for you as a rate and as a slope. Chapter 5 puts both to work at once: finding the highest and lowest points of a function, optimising shapes, and sketching whole curves from the signs of $f'$ and $f''$.",
    },
  ]),
};

export const calcChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
