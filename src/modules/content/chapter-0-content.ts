import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";

/**
 * Chapter 0 — Functions: The Language of Calculus.
 * Authored from the content spec in chatper_0.md; consumed by
 * scripts/seed-chapter-0.ts and the rendering smoke test.
 */

export type LessonSeed = {
  slug: string;
  title: string;
  position: number;
  blocks: LessonBlock[];
};

// z.input type for blocks (defaults not yet applied) — validated below.
type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "what-is-a-function",
  title: "0.1 · What is a Function?",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/calc-0-functions.mp4",
      poster: "/videos/calc-0-functions.jpg",
      title: "Chapter 0 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Imagine you get into a taxi. The meter starts at ₹50, and every kilometre adds ₹15:",
    },
    { type: "math", latex: "\\text{Fare} = 50 + 15 \\cdot (\\text{distance})" },
    {
      type: "table",
      headers: ["Distance", "Fare"],
      rows: [
        ["1 km", "₹65"],
        ["2 km", "₹80"],
        ["5 km", "₹125"],
      ],
    },
    {
      type: "text",
      content:
        "Change the distance and the fare changes. The distance is the input. The fare is the output. The relationship between them is a function.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "50 + 15*x",
        exprLatex: "50 + 15x",
        min: 0,
        max: 10,
        step: 1,
        initial: 5,
        inputLabel: "Distance",
        outputLabel: "Fare",
        inputUnit: "km",
        outputPrefix: "₹",
      },
    },
    {
      type: "text",
      content:
        "Strip away the taxi and what remains is the abstraction calculus is built on: something goes in, a rule is applied, something comes out.\n\n$x \\;\\to\\; f \\;\\to\\; f(x)$",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Function",
      content: "A function assigns exactly one output to every valid input.",
    },
    {
      type: "text",
      content:
        'The phrase "exactly one" is doing all the work. A rule can send two different inputs to the same output — that is fine. What it can never do is send one input to two different outputs.',
    },
    {
      type: "table",
      headers: ["✓ Function", "✗ Not a function"],
      rows: [
        ["1 → A", "1 → A"],
        ["2 → B", "1 → B"],
        ["3 → A", ""],
      ],
    },
    {
      type: "quiz",
      id: "what-is-a-function-quiz-1",
      variant: "practice",
      question:
        "A vending machine gives you one specific snack for each button. Is (button → snack) a function?",
      options: [
        {
          text: "Yes — every button produces exactly one snack.",
          correct: true,
          feedback:
            "Each input (button) has exactly one output (snack). Two buttons could even give the same snack; that's still a function.",
        },
        {
          text: "No — two buttons might give the same snack.",
          feedback:
            "Repeated outputs are allowed. The rule only fails if one button gave two different snacks.",
        },
      ],
    },
    {
      type: "quiz",
      id: "what-is-a-function-quiz-2",
      variant: "practice",
      question:
        "This table pairs inputs with outputs: $1 \\to 4$, $2 \\to 4$, $3 \\to 9$. Is it a function?",
      options: [
        {
          text: "Yes",
          correct: true,
          feedback:
            "Every input appears once and has one output. Inputs 1 and 2 sharing the output 4 is perfectly legal.",
        },
        {
          text: "No, because 4 appears twice",
          feedback:
            "Outputs may repeat. Watch the inputs: each of 1, 2, 3 maps to exactly one value, so it is a function.",
        },
      ],
    },
    {
      type: "quiz",
      id: "what-is-a-function-quiz-3",
      variant: "concept",
      question:
        "A rule sends $1 \\to A$ and also $1 \\to B$. Why is this not a function?",
      options: [
        {
          text: "The input 1 has two different outputs.",
          correct: true,
          feedback:
            "Exactly. A function must be unambiguous: ask it about 1 and it must give one answer.",
        },
        {
          text: "Functions must use numbers, not letters.",
          feedback:
            "Functions can map anything to anything — buttons to snacks, letters included. The problem is the ambiguity of input 1.",
        },
        {
          text: "It has too few inputs.",
          feedback:
            "A function can have any number of inputs. The problem is that input 1 gets two different answers.",
        },
      ],
    },
    {
      type: "quiz",
      id: "what-is-a-function-quiz-4",
      variant: "mastery",
      question: "Which of these is NOT a function?",
      options: [
        {
          text: "Each person → their exact height right now",
          feedback:
            "One person has exactly one current height. This is a function.",
        },
        {
          text: "Each number → its square",
          feedback: "Every number has exactly one square. This is a function.",
        },
        {
          text: "Each number → a number whose square it is",
          correct: true,
          feedback:
            "Given 9, should the answer be 3 or −3? One input, two candidate outputs — not a function.",
        },
      ],
      hint: "Hunt for one input that could produce two different outputs.",
    },
    {
      type: "text",
      content:
        "**Worked example — checking a list of pairs.** Is $(1, 5), (2, 5), (3, 7), (2, 9)$ a function?\n\nStep 1: List the inputs — $1, 2, 3, 2$.\nStep 2: Look for a repeated input — $2$ appears twice.\nStep 3: Compare its outputs — $2 \\to 5$ and $2 \\to 9$. Two different answers for the same input.\n\nVerdict: not a function. Notice the contrast: the output $5$ appearing twice (for inputs 1 and 2) was never a problem. Only a repeated *input* with disagreeing outputs breaks the rule.",
    },
    {
      type: "quiz",
      id: "what-is-a-function-quiz-5",
      variant: "practice",
      question: "Is the set of pairs $(-1, 1), (0, 0), (1, 1)$ a function?",
      options: [
        {
          text: "Yes — each input appears once, with exactly one output.",
          correct: true,
          feedback:
            "Inputs $-1$ and $1$ sharing the output 1 is fine. (This is just $x \\to x^2$ in disguise.)",
        },
        {
          text: "No — the output 1 appears twice.",
          feedback:
            "Repeated outputs never disqualify. Check the inputs instead: $-1, 0, 1$, each used exactly once.",
        },
      ],
      hint: "Run the three steps from the worked example: list inputs, find repeats, compare their outputs.",
    },
    {
      type: "quiz",
      id: "what-is-a-function-quiz-6",
      variant: "concept",
      question: "Real-world check: which of these rules is a function?",
      options: [
        {
          text: "Each date → the noon temperature in your city on that date",
          correct: true,
          feedback:
            "One date, one noon temperature. Many dates can share a temperature — outputs repeating is allowed.",
        },
        {
          text: "Each temperature → a date your city hit it at noon",
          feedback:
            "The same temperature can occur on many dates — one input, many candidate outputs. Reversing a function doesn't always give a function.",
        },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "function-notation",
  title: "0.2 · Function Notation",
  position: 2,
  blocks: blocks([
    {
      type: "callout",
      variant: "warning",
      title: "The misconception this lesson exists to kill",
      content:
        "$f(x)$ does not mean $f \\times x$. It is not multiplication. It is the name of an output.",
    },
    {
      type: "text",
      content: "Take a function:",
    },
    { type: "math", latex: "f(x) = x^2 + 1" },
    {
      type: "text",
      content:
        'Read it as: "the function $f$, evaluated at $x$." To evaluate it at a particular input, substitute that input everywhere $x$ appears:',
    },
    { type: "math", latex: "f(3) = 3^2 + 1 = 10" },
    {
      type: "interactive",
      config: {
        component: "function-evaluator",
        expr: "x^2 + 1",
        exprLatex: "x^2 + 1",
        name: "f",
        min: -5,
        max: 5,
        step: 1,
        initial: 3,
      },
    },
    {
      type: "quiz",
      id: "function-notation-quiz-1",
      variant: "practice",
      question: "If $f(x) = 2x + 3$, what is $f(4)$?",
      options: [
        { text: "$11$", correct: true, feedback: "$f(4) = 2(4) + 3 = 11$." },
        {
          text: "$24$",
          feedback:
            "That's $2 \\cdot 4 \\cdot 3$. Substitute 4 for $x$: $2(4) + 3 = 11$.",
        },
        {
          text: "$2x + 7$",
          feedback:
            "Replace every $x$ with 4 — no $x$ should survive: $2(4) + 3 = 11$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "function-notation-quiz-2",
      variant: "practice",
      question:
        "If $g(t) = t^2 - 1$, what is $g(3)$? (The letter doesn't have to be $x$.)",
      options: [
        { text: "$8$", correct: true, feedback: "$g(3) = 3^2 - 1 = 8$." },
        { text: "$5$", feedback: "$3^2 = 9$, then $9 - 1 = 8$." },
        {
          text: "$9$",
          feedback: "Close — that's $3^2$. Don't forget the $-1$: the answer is 8.",
        },
      ],
    },
    {
      type: "text",
      content:
        "Now the step that quietly prepares you for derivatives: the input doesn't have to be a number. If $f(x) = x^2 + 2x$, then evaluating at $a$ means substituting $a$ everywhere $x$ appears:",
    },
    { type: "math", latex: "f(a) = a^2 + 2a" },
    {
      type: "quiz",
      id: "function-notation-quiz-3",
      variant: "mastery",
      question: "If $f(x) = x^2 + 2x$, what is $f(a+1)$?",
      options: [
        {
          text: "$(a+1)^2 + 2(a+1)$",
          correct: true,
          feedback:
            "Substitute the whole expression $a+1$ everywhere $x$ appears. That mechanical move is exactly what $f(x+h)$ will ask of you later.",
        },
        {
          text: "$a^2 + 2a + 1$",
          feedback:
            "That's $f(a) + 1$. Substituting means replacing every $x$ with $(a+1)$: $(a+1)^2 + 2(a+1)$.",
        },
        {
          text: "$f \\cdot (a+1)$",
          feedback:
            "$f(a+1)$ is not multiplication — it's the output of $f$ at the input $a+1$.",
        },
      ],
      hint: "Replace every $x$ in $x^2 + 2x$ with the whole package $(a+1)$, parentheses included.",
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "Later you will meet $f(x+h)$ in the definition of the derivative. It's the same move you just made: substitute the whole expression $x+h$ wherever the input variable appears. No panic required.",
    },
    {
      type: "text",
      content:
        "**Worked example — a negative input.** With $f(x) = x^2 - 3x$, find $f(-2)$.\n\nStep 1: Substitute $-2$ everywhere $x$ appears, *keeping the parentheses*:",
    },
    { type: "math", latex: "f(-2) = (-2)^2 - 3(-2)" },
    {
      type: "text",
      content:
        "Step 2: Evaluate each piece: $(-2)^2 = 4$ (a negative squared is positive) and $-3(-2) = +6$.\n\nStep 3: Combine: $f(-2) = 4 + 6 = 10$.\n\nThe classic mistake is dropping the parentheses and computing $-2^2 = -4$. Substituting means the *whole* input, sign included, goes into every slot.",
    },
    {
      type: "quiz",
      id: "function-notation-quiz-4",
      variant: "practice",
      question: "If $f(x) = x^2 + 2x$, what is $f(-3)$?",
      options: [
        {
          text: "$3$",
          correct: true,
          feedback: "$(-3)^2 + 2(-3) = 9 - 6 = 3$. Parentheses respected.",
        },
        {
          text: "$-15$",
          feedback:
            "That's $-9 - 6$, from computing $-3^2 = -9$. Squaring the whole input gives $(-3)^2 = +9$, so $9 - 6 = 3$.",
        },
        {
          text: "$15$",
          feedback:
            "The second term is $2(-3) = -6$, not $+6$. So $9 - 6 = 3$.",
        },
      ],
      hint: "Write $(-3)$ with parentheses in both slots before computing anything.",
    },
    {
      type: "quiz",
      id: "function-notation-quiz-5",
      variant: "practice",
      question:
        "The function $h(x) = 5$ ignores its input entirely. What is $h(100)$?",
      options: [
        {
          text: "$5$",
          correct: true,
          feedback:
            "A constant function outputs 5 no matter what goes in. Perfectly legal: every input still has exactly one output.",
        },
        {
          text: "$500$",
          feedback:
            "$h(100)$ isn't $h \\times 100$ — notation, not multiplication. The rule says: output 5, always.",
        },
        {
          text: "Undefined — there's no $x$ in the formula to substitute into",
          feedback:
            "No $x$ slots just means the substitution changes nothing. The output is 5 for every input.",
        },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "domain-and-range",
  title: "0.3 · Domain and Range",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Not every input makes sense. The real question behind this lesson is simple: which inputs can a function actually accept?\n\nTake",
    },
    { type: "math", latex: "f(x) = \\frac{1}{x}" },
    { type: "text", content: "and try feeding it inputs:" },
    {
      type: "table",
      headers: ["$x$", "$f(x)$"],
      rows: [
        ["$2$", "$0.5$"],
        ["$1$", "$1$"],
        ["$0.5$", "$2$"],
        ["$0$", "???"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "1/x",
        exprLatex: "\\frac{1}{x}",
        window: { xmin: -4, xmax: 4, ymin: -5, ymax: 5 },
        initial: 2,
        excluded: [0],
      },
    },
    {
      type: "text",
      content:
        "Slide $x$ to 0 and watch the graph refuse. Division by zero has no answer, so 0 is simply not an allowed input.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Domain and Range",
      content:
        "Domain: the set of allowed inputs.\nRange: the set of outputs the function can actually produce.",
    },
    { type: "text", content: "Three cases cover most of what you'll meet for now:" },
    {
      type: "table",
      headers: ["Function", "Domain", "Why"],
      rows: [
        ["$f(x) = x^2$", "all real numbers", "any number can be squared"],
        ["$f(x) = \\frac{1}{x}$", "$x \\ne 0$", "division by zero is undefined"],
        [
          "$f(x) = \\sqrt{x}$",
          "$x \\ge 0$",
          "no real square root of a negative",
        ],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content:
        "When finding a domain, hunt for the two usual suspects: division by zero and even roots of negative numbers.",
    },
    {
      type: "quiz",
      id: "domain-and-range-quiz-1",
      variant: "practice",
      question: "What is the domain of $f(x) = \\dfrac{1}{x - 3}$?",
      options: [
        {
          text: "All real numbers except $x = 3$",
          correct: true,
          feedback: "At $x = 3$ the denominator is 0, and everything else is fine.",
        },
        {
          text: "All real numbers",
          feedback: "Try $x = 3$: you'd be dividing by zero.",
        },
        {
          text: "$x \\ge 3$",
          feedback:
            "Nothing wrong with inputs below 3 — try $x=0$: $f(0) = -\\tfrac13$. Only $x = 3$ itself breaks.",
        },
      ],
      hint: "Which input makes the denominator zero?",
    },
    {
      type: "quiz",
      id: "domain-and-range-quiz-2",
      variant: "mastery",
      question:
        "What is the range of $f(x) = x^2$? (Which outputs can actually happen?)",
      options: [
        {
          text: "$y \\ge 0$",
          correct: true,
          feedback:
            "A square is never negative, and every value $\\ge 0$ is hit by some input.",
        },
        {
          text: "All real numbers",
          feedback:
            "Can $x^2$ ever equal $-4$? No input produces a negative output.",
        },
        {
          text: "$y > 0$",
          feedback: "Almost — but $f(0) = 0$, so 0 itself is in the range.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — both suspects at once.** Find the domain of",
    },
    { type: "math", latex: "f(x) = \\frac{\\sqrt{x - 1}}{x - 4}" },
    {
      type: "text",
      content:
        "Step 1: The square root demands $x - 1 \\ge 0$, so $x \\ge 1$.\n\nStep 2: The division demands $x - 4 \\ne 0$, so $x \\ne 4$.\n\nStep 3: Both conditions must hold at once. Domain: $x \\ge 1$ and $x \\ne 4$.\n\nThe method is always the same: interrogate each suspect separately, then intersect the verdicts.",
    },
    {
      type: "quiz",
      id: "domain-and-range-quiz-3",
      variant: "practice",
      question: "What is the domain of $f(x) = \\sqrt{x - 4}$?",
      options: [
        {
          text: "$x \\ge 4$",
          correct: true,
          feedback:
            "The expression under the root must be $\\ge 0$: $x - 4 \\ge 0$ means $x \\ge 4$. Equality is fine: $\\sqrt{0} = 0$.",
        },
        {
          text: "$x > 4$",
          feedback:
            "Almost — $x = 4$ itself works: $\\sqrt{0} = 0$ is a perfectly good output. Only strictly negative insides fail.",
        },
        {
          text: "$x \\ne 4$",
          feedback:
            "That's the division-by-zero reflex, but there's no division here. The root needs $x - 4 \\ge 0$: domain $x \\ge 4$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "domain-and-range-quiz-4",
      variant: "practice",
      question: "What is the domain of $f(x) = \\sqrt{5 - x}$?",
      options: [
        {
          text: "$x \\le 5$",
          correct: true,
          feedback:
            "Solve $5 - x \\ge 0$: that's $x \\le 5$. The inequality flips direction from the $\\sqrt{x-4}$ case because $x$ is being subtracted.",
        },
        {
          text: "$x \\ge 5$",
          feedback:
            "Try $x = 6$: $\\sqrt{5 - 6} = \\sqrt{-1}$ — not real. It's the small inputs that are safe here: $x \\le 5$.",
        },
        {
          text: "$x \\ge -5$",
          feedback:
            "Solve the actual condition $5 - x \\ge 0$ rather than pattern-matching: it gives $x \\le 5$.",
        },
      ],
      hint: "Set what's under the root $\\ge 0$ and solve the inequality carefully.",
    },
    {
      type: "quiz",
      id: "domain-and-range-quiz-5",
      variant: "mastery",
      question: "What is the domain of $f(x) = \\dfrac{1}{x^2 - 9}$?",
      options: [
        {
          text: "All real numbers except $x = 3$ and $x = -3$",
          correct: true,
          feedback:
            "$x^2 - 9 = (x-3)(x+3)$ is zero at BOTH $3$ and $-3$. A quadratic denominator can hide two forbidden inputs.",
        },
        {
          text: "All real numbers except $x = 3$",
          feedback:
            "Half credit — check $x = -3$ too: $(-3)^2 - 9 = 0$. Both roots of the denominator are forbidden.",
        },
        {
          text: "All real numbers except $x = 9$",
          feedback:
            "At $x = 9$ the denominator is $81 - 9 = 72$ — fine. Solve $x^2 - 9 = 0$: $x = \\pm 3$.",
        },
      ],
      hint: "Factor the denominator: which inputs make it zero?",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "reading-functions-from-graphs",
  title: "0.4 · Reading Functions from Graphs",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Plenty of students can draw a graph. Calculus needs the reverse skill: standing in front of a graph and pulling information out of it — where is $f(2)$? Where is $f(x) = 0$? Where is it climbing?",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "x^2",
        exprLatex: "x^2",
        window: { xmin: -4, xmax: 4, ymin: -2, ymax: 10 },
        initial: -2,
        excluded: [],
      },
    },
    {
      type: "text",
      content:
        "Drag the point and watch all three panels move together. This is the crucial idea of the whole chapter:",
    },
    {
      type: "callout",
      variant: "info",
      content:
        "Formula, table and graph are not separate topics. They are different representations of the same function.",
    },
    {
      type: "text",
      content:
        "Reading a graph means answering questions like these visually: what is $f(2)$? Where does $f(x) = 0$? Where is $f(x) > 0$? Where does the function increase or decrease? What are its highest and lowest values? Roughly what are its domain and range?",
    },
    {
      type: "quiz",
      id: "reading-functions-from-graphs-quiz-1",
      variant: "practice",
      question: "On the graph of $f(x) = x^2$ above, what is $f(2)$?",
      options: [
        {
          text: "$4$",
          correct: true,
          feedback:
            "Go to $x = 2$ on the horizontal axis, ride up to the curve, read the height: 4.",
        },
        {
          text: "$2$",
          feedback:
            "That's the input. $f(2)$ is the height of the curve above $x = 2$, which is 4.",
        },
        {
          text: "$\\pm 2$",
          feedback:
            "You solved $f(x) = 2$ backwards. $f(2)$ asks for the output at input 2: $2^2 = 4$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "reading-functions-from-graphs-quiz-2",
      variant: "practice",
      question: "Where does the graph of $f(x) = x^2$ touch $f(x) = 0$?",
      options: [
        {
          text: "Only at $x = 0$",
          correct: true,
          feedback: "The curve touches the x-axis exactly once, at the origin.",
        },
        {
          text: "At $x = 0$ and $x = 1$",
          feedback: "$f(1) = 1$, not 0. The curve meets the axis only at $x = 0$.",
        },
        {
          text: "Nowhere",
          feedback: "$f(0) = 0$ — the bottom of the parabola sits on the axis.",
        },
      ],
    },
    {
      type: "quiz",
      id: "reading-functions-from-graphs-quiz-3",
      variant: "mastery",
      question:
        "Reading the same graph: where is $f(x) = x^2$ decreasing?",
      options: [
        {
          text: "For $x < 0$",
          correct: true,
          feedback:
            "Walk left to right: the curve falls until $x = 0$, then rises. Decreasing on the left half.",
        },
        {
          text: "For $x > 0$",
          feedback:
            "For $x > 0$ the outputs grow as $x$ grows — that's increasing. It decreases on $x < 0$.",
        },
        {
          text: "Never — squares are positive",
          feedback:
            "Positive outputs can still shrink: $f(-3)=9$, $f(-2)=4$, $f(-1)=1$. Falling outputs = decreasing.",
        },
      ],
      hint: "Read the graph like a story, left to right. Falling curve = decreasing.",
    },
    {
      type: "text",
      content:
        "**Worked example — the two directions of reading.** Same graph, $f(x) = x^2$. Two questions that look similar and aren't:\n\n*Question A: what is $f(3)$?* Start on the x-axis at 3, ride up to the curve, read the height: $9$. One input → one answer, always.\n\n*Question B: where is $f(x) = 9$?* Start on the y-axis at height 9, slide horizontally, and mark every place you cross the curve: $x = 3$ and $x = -3$. Two answers — and that's fine, because this is the reverse question. A function promises one output per input, not one input per output.",
    },
    {
      type: "quiz",
      id: "reading-functions-from-graphs-quiz-4",
      variant: "practice",
      question: "On the graph of $f(x) = x^2$, for which $x$ does $f(x) = 4$?",
      options: [
        {
          text: "$x = 2$ and $x = -2$",
          correct: true,
          feedback:
            "The horizontal line at height 4 crosses the parabola twice. Reverse questions can have several answers.",
        },
        {
          text: "Only $x = 2$",
          feedback:
            "Check the left half: $(-2)^2 = 4$ too. Sweep the whole width of the graph before answering.",
        },
        {
          text: "$x = 16$",
          feedback:
            "That's $f(4)$, the forward question. Here we know the OUTPUT is 4 and hunt for the inputs: $x = \\pm 2$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "reading-functions-from-graphs-quiz-5",
      variant: "concept",
      question: "Still reading $f(x) = x^2$: where is $f(x) > 0$?",
      options: [
        {
          text: "Everywhere except $x = 0$",
          correct: true,
          feedback:
            "The curve sits above the x-axis at every point except the single touch at the origin, where $f(0) = 0$ exactly.",
        },
        {
          text: "Everywhere",
          feedback:
            "One point spoils it: $f(0) = 0$, and $0 > 0$ is false. Strict inequalities care about such details.",
        },
        {
          text: "Only for $x > 0$",
          feedback:
            "Look left: $f(-2) = 4 > 0$. Height above the axis is what matters, not the sign of the input.",
        },
      ],
      hint: "\"$f(x) > 0$\" asks: where is the curve strictly above the x-axis?",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "how-functions-change",
  title: "0.5 · How Functions Change",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "This is where the chapter quietly starts becoming calculus. Same function as before:",
    },
    { type: "math", latex: "f(x) = x^2" },
    {
      type: "text",
      content: "As $x$ moves from 1 → 2 → 3 → 4, what happens to $f(x)$?",
    },
    {
      type: "table",
      headers: ["$x$", "$f(x)$", "change"],
      rows: [
        ["$1$", "$1$", ""],
        ["$2$", "$4$", "$+3$"],
        ["$3$", "$9$", "$+5$"],
        ["$4$", "$16$", "$+7$"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      content:
        "The output isn't merely increasing. It's increasing faster and faster. That thought is the seed of differentiation.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "x^2",
        exprLatex: "x^2",
        window: { xmin: -4, xmax: 4, ymin: -2, ymax: 16 },
        initial: 1,
        excluded: [],
      },
    },
    {
      type: "text",
      content:
        "Drag the point slowly to the right and feel the steepness change. The vocabulary for describing this: a function is increasing where its outputs rise as $x$ grows, decreasing where they fall, and constant where they don't move. A local maximum is a hilltop — higher than all its neighbours; a local minimum is a valley floor. Steepness is how fast the change happens.",
    },
    {
      type: "quiz",
      id: "how-functions-change-quiz-1",
      variant: "practice",
      question:
        "For $f(x) = x^2$, which is larger: the change from $x=1$ to $x=2$, or from $x=3$ to $x=4$?",
      options: [
        {
          text: "From 3 to 4 — the function is steeper there.",
          correct: true,
          feedback: "$16 - 9 = 7$ beats $4 - 1 = 3$. Same step in $x$, bigger jump in $f(x)$.",
        },
        {
          text: "They're equal — both steps are 1 wide.",
          feedback:
            "Equal steps in $x$, but the outputs jump $+3$ versus $+7$. Steepness varies along the curve — that's the whole point.",
        },
      ],
    },
    {
      type: "quiz",
      id: "how-functions-change-quiz-2",
      variant: "concept",
      question: "Where does $f(x) = x^2$ have a local minimum?",
      options: [
        {
          text: "At $x = 0$",
          correct: true,
          feedback:
            "The curve falls, flattens for an instant at $x = 0$, then rises — a valley floor. Finding such points exactly is a job calculus was built for.",
        },
        {
          text: "At $x = -4$, the left edge",
          feedback:
            "The curve is still falling as it passes $x=-4$; a local minimum is where falling turns into rising: $x = 0$.",
        },
        {
          text: "It has none — it grows forever",
          feedback:
            "It grows forever on the right, but it bottoms out at $(0, 0)$ first. That's a local minimum.",
        },
      ],
    },
    {
      type: "quiz",
      id: "how-functions-change-quiz-3",
      variant: "mastery",
      question:
        "A car's distance from home is a function of time, and that function is increasing more and more slowly. What is the car doing?",
      options: [
        {
          text: "Still moving forward, but decelerating",
          correct: true,
          feedback:
            "Increasing distance = moving forward. Increasing more slowly = slowing down. You just read a second-order idea off a first-order description — very calculus.",
        },
        {
          text: "Moving backward",
          feedback:
            "Backward would mean distance decreasing. It's still increasing — just less steeply.",
        },
        {
          text: "Stopped",
          feedback:
            "Stopped would mean distance constant. It's still growing, just at a shrinking rate.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — building a change table.** How does $f(x) = 2^x$ change? Compute outputs, then the jumps between them:",
    },
    {
      type: "table",
      headers: ["$x$", "$f(x)$", "change"],
      rows: [
        ["$1$", "$2$", ""],
        ["$2$", "$4$", "$+2$"],
        ["$3$", "$8$", "$+4$"],
        ["$4$", "$16$", "$+8$"],
      ],
    },
    {
      type: "text",
      content:
        "Step 1: fill the output column. Step 2: subtract neighbours to get each change. Step 3: read the pattern in the change column — here every change *doubles*. Compare with $x^2$, whose changes went $+3, +5, +7$: growing, but only by 2 each time. The change column is a fingerprint; different function families leave different prints. (That column, taken to its logical extreme, is the derivative.)",
    },
    {
      type: "quiz",
      id: "how-functions-change-quiz-4",
      variant: "practice",
      question:
        "For $f(x) = x^3$: the change from $x=1$ to $x=2$ is $8 - 1 = 7$. What is the change from $x=2$ to $x=3$, and what does the comparison tell you?",
      options: [
        {
          text: "$+19$ — the curve is much steeper there.",
          correct: true,
          feedback:
            "$27 - 8 = 19$, nearly triple the previous jump. Cubics steepen even faster than squares.",
        },
        {
          text: "$+7$ — equal steps in $x$ give equal changes.",
          feedback:
            "Equal changes are the signature of a straight line. $x^3$ curves: $27 - 8 = 19$, much bigger than 7.",
        },
        {
          text: "$+27$",
          feedback:
            "$27$ is $f(3)$ itself. Change means the difference: $f(3) - f(2) = 27 - 8 = 19$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "how-functions-change-quiz-5",
      variant: "concept",
      question:
        "A bathtub fills at a steady 5 litres per minute. What does the change column of (time → volume) look like?",
      options: [
        {
          text: "Constant: $+5, +5, +5, \\ldots$ — the graph is a straight line.",
          correct: true,
          feedback:
            "Steady rate = constant change column = constant steepness = a line. This chain of equalities is worth memorizing.",
        },
        {
          text: "Growing: $+5, +10, +15, \\ldots$",
          feedback:
            "That would be a tap opening wider every minute. A steady tap adds the same 5 litres each minute: constant change.",
        },
        {
          text: "It depends on how full the tub already is.",
          feedback:
            "The rate is fixed at 5 L/min regardless of the current volume — so every minute's change is the same $+5$.",
        },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "transforming-functions",
  title: "0.6 · Transforming Functions",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Start from one graph you know well, $f(x) = x^2$, and discover what knobs on the formula do to the picture. Play first, rules later.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "x^2",
        baseLatex: "y = x^2",
        expr: "(x - a)^2 + b",
        exprLatex: "(x - a)^2 + b",
        params: [
          { name: "a", min: -3, max: 3, step: 0.5, initial: 0 },
          { name: "b", min: -3, max: 3, step: 0.5, initial: 0 },
        ],
        window: { xmin: -6, xmax: 6, ymin: -4, ymax: 8 },
      },
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "x^2",
        baseLatex: "y = x^2",
        expr: "a*x^2",
        exprLatex: "a \\cdot x^2",
        params: [{ name: "a", min: -2, max: 2, step: 0.25, initial: 1 }],
        window: { xmin: -4, xmax: 4, ymin: -6, ymax: 8 },
      },
    },
    { type: "text", content: "Now the summary you just discovered by hand:" },
    {
      type: "table",
      headers: ["Formula", "Effect on the graph"],
      rows: [
        ["$f(x) + k$", "moves vertically by $k$"],
        ["$f(x - k)$", "moves horizontally by $k$"],
        ["$a \\cdot f(x)$", "stretches vertically (flips if $a < 0$)"],
        ["$f(ax)$", "squeezes horizontally"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "The backwards one",
      content:
        "$f(x - 2)$ moves the graph right, not left. The graph at $x = 5$ shows what $f$ did at $x = 3$ — the curve has to slide right to reuse old outputs.",
    },
    {
      type: "quiz",
      id: "transforming-functions-quiz-1",
      variant: "concept",
      question:
        "Which way does the graph of $y = (x - 2)^2$ sit relative to $y = x^2$?",
      options: [
        {
          text: "Shifted 2 to the right",
          correct: true,
          feedback:
            "The vertex is where the squared part is zero: $x = 2$. Minus inside means right — the famous backwards one.",
        },
        {
          text: "Shifted 2 to the left",
          feedback:
            "Tempting — but find the vertex: $(x-2)^2 = 0$ at $x = 2$, so the whole parabola moved right.",
        },
        {
          text: "Shifted 2 down",
          feedback:
            "Down would be $x^2 - 2$, outside the square. Inside the parentheses moves things horizontally.",
        },
      ],
      hint: "Where does the new formula hit its minimum?",
    },
    {
      type: "quiz",
      id: "transforming-functions-quiz-2",
      variant: "mastery",
      question:
        "Which formula moves $f(x) = x^2$ up 3 and left 1?",
      options: [
        {
          text: "$(x + 1)^2 + 3$",
          correct: true,
          feedback:
            "Left 1 means $x - (-1)$, i.e. $x + 1$ inside; up 3 is $+3$ outside.",
        },
        {
          text: "$(x - 1)^2 + 3$",
          feedback: "$x - 1$ inside moves it right 1. Left needs $x + 1$.",
        },
        {
          text: "$(x + 3)^2 + 1$",
          feedback:
            "You swapped the knobs: the inside number moves horizontally, the outside one vertically.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — decoding a dressed-up formula.** Describe $y = -2(x - 3)^2 + 4$ as transformations of $y = x^2$. Read it from the inside out:\n\nStep 1: $(x - 3)$ inside — shift right 3 (the backwards one).\nStep 2: the factor $2$ — stretch vertically by 2 (twice as steep).\nStep 3: the minus sign — flip upside down.\nStep 4: $+4$ outside — shift up 4.\n\nResult: an upside-down, extra-steep parabola with its peak at $(3, 4)$. Four knobs, each with one job — no memorized \"vertex form\" needed.",
    },
    {
      type: "quiz",
      id: "transforming-functions-quiz-3",
      variant: "concept",
      question: "What does $y = -f(x)$ do to the graph of $f$?",
      options: [
        {
          text: "Flips it upside down (across the x-axis)",
          correct: true,
          feedback:
            "Every output's sign is reversed: heights become depths. It's the $a \\cdot f(x)$ stretch with $a = -1$.",
        },
        {
          text: "Flips it left-to-right (across the y-axis)",
          feedback:
            "Left-right flipping is $f(-x)$ — the minus acting on the INPUT. $-f(x)$ negates the output: upside down.",
        },
        {
          text: "Shifts it down",
          feedback:
            "Shifting down is $f(x) - c$: subtract a constant. Multiplying by $-1$ reverses each height instead: a flip.",
        },
      ],
    },
    {
      type: "quiz",
      id: "transforming-functions-quiz-4",
      variant: "mastery",
      question:
        "Which formula takes $y = \\sqrt{x}$ and moves it right 4 and up 2?",
      options: [
        {
          text: "$y = \\sqrt{x - 4} + 2$",
          correct: true,
          feedback:
            "Minus inside → right 4; plus outside → up 2. The starting point of the curve moves from $(0,0)$ to $(4, 2)$.",
        },
        {
          text: "$y = \\sqrt{x + 4} + 2$",
          feedback:
            "Plus inside moves LEFT. Right 4 needs $x - 4$ under the root.",
        },
        {
          text: "$y = \\sqrt{x + 2} - 4$",
          feedback:
            "The knobs are swapped and the signs are off: horizontal lives inside the root, vertical outside. Right 4, up 2 is $\\sqrt{x-4} + 2$.",
        },
      ],
      hint: "Same rules as the parabola — the rules don't care which function they dress up.",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "function-families",
  title: "0.7 · Function Families",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Calculus keeps reusing the same handful of functions. You don't need to memorize a taxonomy — you need each of these shapes to not be a stranger when it walks in later. Flip through them:",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        window: { xmin: -5, xmax: 5, ymin: -5, ymax: 6 },
        families: [
          { label: "Constant", expr: "3", latex: "3", excluded: [] },
          { label: "Linear", expr: "x", latex: "x", excluded: [] },
          { label: "Quadratic", expr: "x^2", latex: "x^2", excluded: [] },
          { label: "Cubic", expr: "x^3 / 4", latex: "\\tfrac{x^3}{4}", excluded: [] },
          { label: "Absolute value", expr: "abs(x)", latex: "|x|", excluded: [] },
          { label: "Reciprocal", expr: "1/x", latex: "\\tfrac{1}{x}", excluded: [0] },
          {
            label: "Square root",
            expr: "sqrt(x)",
            latex: "\\sqrt{x}",
            excluded: [],
            xminOverride: 0,
          },
          { label: "Exponential", expr: "2^x", latex: "2^x", excluded: [] },
          {
            label: "Logarithmic",
            expr: "ln(x)",
            latex: "\\ln x",
            excluded: [],
            xminOverride: 0.01,
          },
          { label: "Sine", expr: "sin(x)", latex: "\\sin x", excluded: [] },
          { label: "Cosine", expr: "cos(x)", latex: "\\cos x", excluded: [] },
        ],
      },
    },
    {
      type: "text",
      content:
        "A few personalities worth noticing: the exponential $2^x$ starts slow and then explodes; the logarithm $\\ln x$ is its mirror, growing forever but ever more slowly; $\\tfrac1x$ avoids $x=0$ entirely; $\\sqrt{x}$ only exists for $x \\ge 0$; sine and cosine repeat forever.",
    },
    {
      type: "quiz",
      id: "function-families-quiz-1",
      variant: "practice",
      question:
        "A graph rises forever from left to right, slowly at first and then explosively. Which family?",
      options: [
        {
          text: "Exponential, like $2^x$",
          correct: true,
          feedback: "Slow start, explosive finish is the exponential signature.",
        },
        {
          text: "Linear, like $x$",
          feedback: "Linear grows at the same rate forever — no explosion.",
        },
        {
          text: "Logarithmic, like $\\ln x$",
          feedback:
            "The logarithm does the opposite: fast at first, then ever slower.",
        },
      ],
    },
    {
      type: "quiz",
      id: "function-families-quiz-2",
      variant: "mastery",
      question: "Which family has a graph in two separate pieces?",
      options: [
        {
          text: "Reciprocal, $\\tfrac{1}{x}$",
          correct: true,
          feedback:
            "It can't cross $x = 0$, so the graph splits into two branches. That gap is where limit questions get interesting.",
        },
        {
          text: "Quadratic, $x^2$",
          feedback: "The parabola is one connected sweep.",
        },
        {
          text: "Absolute value, $|x|$",
          feedback: "The V has a sharp corner, but it's one connected piece.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — identifying a family from clues.** A function is described: *it repeats the same wave forever, and its outputs never leave $[-1, 1]$.*\n\nStep 1: \"repeats forever\" — only sine and cosine are periodic in the gallery.\nStep 2: need to split the tie. Extra clue: *its value at $x = 0$ is $1$.* Then $\\sin 0 = 0$ but $\\cos 0 = 1$ — it's cosine.\n\nThis is how the families earn their keep: each one has behaviours no other family can fake.",
    },
    {
      type: "quiz",
      id: "function-families-quiz-3",
      variant: "practice",
      question:
        "A quantity oscillates endlessly between fixed bounds — a pendulum's angle over time. Which family models it?",
      options: [
        {
          text: "Sine or cosine",
          correct: true,
          feedback:
            "Periodic repetition within fixed bounds is the trig signature. No polynomial or exponential ever repeats.",
        },
        {
          text: "Quadratic",
          feedback:
            "A parabola turns exactly once and then commits — no repetition. Endless oscillation is sine/cosine territory.",
        },
        {
          text: "Exponential",
          feedback:
            "Exponentials are monotonic: always growing or always dying. Repetition is the one thing they never do.",
        },
      ],
    },
    {
      type: "quiz",
      id: "function-families-quiz-4",
      variant: "mastery",
      question:
        "Which family is defined at $x = 0$ but at no negative $x$?",
      options: [
        {
          text: "Square root, $\\sqrt{x}$",
          correct: true,
          feedback:
            "$\\sqrt{0} = 0$ is fine; $\\sqrt{-1}$ is not real. Domain $x \\ge 0$, boundary included.",
        },
        {
          text: "Logarithmic, $\\ln x$",
          feedback:
            "Close — $\\ln$ also rejects negatives, but it rejects 0 too (the graph dives to $-\\infty$ there). Domain $x > 0$, strictly.",
        },
        {
          text: "Reciprocal, $\\tfrac{1}{x}$",
          feedback:
            "Backwards: $\\tfrac1x$ happily accepts negatives — it's exactly $x = 0$ it refuses.",
        },
      ],
      hint: "Two families dislike negatives. Only one of them accepts 0 itself.",
    },
  ]),
};

const lesson08: LessonSeed = {
  slug: "combining-functions",
  title: "0.8 · Combining Functions",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "Functions combine the way numbers do. Given two functions $f$ and $g$, you can add, subtract, multiply and divide them pointwise:",
    },
    {
      type: "math",
      latex:
        "(f+g)(x) = f(x) + g(x) \\qquad (f-g)(x) = f(x) - g(x) \\qquad (fg)(x) = f(x)\\,g(x) \\qquad \\left(\\tfrac{f}{g}\\right)(x) = \\tfrac{f(x)}{g(x)}",
    },
    {
      type: "text",
      content:
        "Those four are bookkeeping. The combination that matters most for calculus is different: feeding the output of one function into another. Watch a value flow through the chain:",
    },
    {
      type: "interactive",
      config: {
        component: "composition-machine",
        innerExpr: "x + 1",
        innerLatex: "x + 1",
        innerLabel: "g",
        outerExpr: "x^2",
        outerLatex: "x^2",
        outerLabel: "f",
        min: -5,
        max: 5,
        step: 1,
        initial: 2,
      },
    },
    {
      type: "text",
      content:
        "With $x = 2$: first $g$ adds one, $2 \\to 3$; then $f$ squares, $3 \\to 9$. So $f(g(2)) = 9$. Only now that the mechanism is clear does the notation deserve to appear:",
    },
    { type: "math", latex: "(f \\circ g)(x) = f(g(x))" },
    {
      type: "callout",
      variant: "tip",
      content:
        "Keep this pipeline picture — $x \\to g \\to f$ — in your head. When the chain rule arrives, it is exactly a statement about how change flows through this pipe.",
    },
    {
      type: "quiz",
      id: "combining-functions-quiz-1",
      variant: "practice",
      question: "With $g(x) = x + 1$ and $f(x) = x^2$, what is $f(g(4))$?",
      options: [
        {
          text: "$25$",
          correct: true,
          feedback: "$g(4) = 5$, then $f(5) = 25$.",
        },
        {
          text: "$17$",
          feedback:
            "That's $f(4) + 1 = 17$ — the chain run backwards. Do $g$ first: $g(4)=5$, then $f(5)=25$.",
        },
        {
          text: "$16$",
          feedback: "That's $f(4)$, skipping $g$ entirely. First $4 \\to 5$, then square: 25.",
        },
      ],
      hint: "Inside-out: evaluate $g(4)$ first, then feed the result to $f$.",
    },
    {
      type: "quiz",
      id: "combining-functions-quiz-2",
      variant: "concept",
      question:
        "Same $f$ and $g$: is $g(f(2))$ the same as $f(g(2))$?",
      options: [
        {
          text: "No — $g(f(2)) = 5$ but $f(g(2)) = 9$",
          correct: true,
          feedback:
            "Square-then-add gives $4+1=5$; add-then-square gives $3^2=9$. Order matters in composition.",
        },
        {
          text: "Yes — composition is like multiplication, order doesn't matter",
          feedback:
            "Try it: $g(f(2)) = g(4) = 5$, while $f(g(2)) = f(3) = 9$. The pipeline direction matters.",
        },
      ],
    },
    {
      type: "quiz",
      id: "combining-functions-quiz-3",
      variant: "mastery",
      question:
        "$h(x) = \\sqrt{x + 3}$ is a composition $f(g(x))$. Which decomposition works?",
      options: [
        {
          text: "$g(x) = x + 3$ inside, $f(x) = \\sqrt{x}$ outside",
          correct: true,
          feedback:
            "First add 3, then take the root. Spotting the inside function is the skill the chain rule will lean on.",
        },
        {
          text: "$g(x) = \\sqrt{x}$ inside, $f(x) = x + 3$ outside",
          feedback:
            "That pipeline gives $\\sqrt{x} + 3$ — root first, then add. We need to add first.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — composing formulas, not just numbers.** With $g(x) = x + 1$ and $f(x) = x^2$, find a single formula for $f(g(x))$.\n\nStep 1: Write the outer function with a blank slot: $f(\\square) = \\square^2$.\nStep 2: Fill the slot with ALL of $g(x)$: $f(g(x)) = (x + 1)^2$.\nStep 3: Sanity-check with a number from the machine above: $x = 2$ gives $(2+1)^2 = 9$. ✓\n\nAnd the other order? $g(f(x)) = f(x) + 1 = x^2 + 1$. Different pipeline, different formula — $(x+1)^2$ versus $x^2 + 1$ — confirming that order matters not just for single values but everywhere at once.",
    },
    {
      type: "quiz",
      id: "combining-functions-quiz-4",
      variant: "practice",
      question:
        "With $f(x) = x^2$ and $g(x) = x + 1$, what is $(f + g)(2)$?",
      options: [
        {
          text: "$7$",
          correct: true,
          feedback:
            "Pointwise addition: $f(2) + g(2) = 4 + 3 = 7$. No pipelines here — both functions eat the same input, then the outputs add.",
        },
        {
          text: "$9$",
          feedback:
            "$9$ is the composition $f(g(2))$. The SUM $(f+g)(2)$ evaluates each function at 2 separately and adds: $4 + 3 = 7$.",
        },
        {
          text: "$12$",
          feedback:
            "That's $f(2) \\cdot g(2)$ — the product. The sum is $4 + 3 = 7$.",
        },
      ],
      hint: "$(f+g)(x)$ means $f(x) + g(x)$: evaluate both at the same input, then add.",
    },
    {
      type: "quiz",
      id: "combining-functions-quiz-5",
      variant: "mastery",
      question:
        "$h(x) = (2x + 1)^3$ is a composition $f(g(x))$. Which decomposition works?",
      options: [
        {
          text: "$g(x) = 2x + 1$ inside, $f(x) = x^3$ outside",
          correct: true,
          feedback:
            "First build $2x+1$, then cube the result. \"What gets computed first\" is always the inner function.",
        },
        {
          text: "$g(x) = x^3$ inside, $f(x) = 2x + 1$ outside",
          feedback:
            "That pipeline gives $2x^3 + 1$ — cube first, then double and add. Expand the order: here the doubling happens first.",
        },
        {
          text: "$g(x) = 2x$ inside, $f(x) = x^3 + 1$ outside",
          feedback:
            "Check: $f(g(x)) = (2x)^3 + 1 = 8x^3 + 1$ — the $+1$ ended up outside the cube. It needs to ride inside: $g(x) = 2x + 1$.",
        },
      ],
      hint: "Evaluate $h(1) = 27$ by hand and watch which operation you do first.",
    },
  ]),
};

const lesson09: LessonSeed = {
  slug: "piecewise-functions",
  title: "0.9 · Piecewise Functions",
  position: 9,
  blocks: blocks([
    {
      type: "text",
      content:
        "One function can follow different rules in different regions — like a taxi with one rate in the city and another on the highway. Here is a function with two rules:",
    },
    {
      type: "math",
      latex:
        "f(x) = \\begin{cases} x + 2 & x < 0 \\\\ x^2 & x \\ge 0 \\end{cases}",
    },
    {
      type: "text",
      content:
        "To evaluate it, first ask which condition your input satisfies, then use that rule — never both. Slide $x$ across the boundary and watch the active rule switch:",
    },
    {
      type: "interactive",
      config: {
        component: "piecewise-explorer",
        breakpoint: 0,
        breakBelongsTo: "right",
        leftExpr: "x + 2",
        leftLatex: "x + 2",
        rightExpr: "x^2",
        rightLatex: "x^2",
        window: { xmin: -5, xmax: 3, ymin: -4, ymax: 9 },
        initial: -3,
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Open and closed circles",
      content:
        "A closed circle means the point is included — the function actually takes that value there. An open circle means the curve approaches that spot but the value belongs to the other rule. At $x = 0$ here, $x^2$ owns the point ($f(0) = 0$), while $x + 2$ approaches height 2 but never claims it.",
    },
    {
      type: "quiz",
      id: "piecewise-functions-quiz-1",
      variant: "practice",
      question: "For the function above, what is $f(-3)$?",
      options: [
        {
          text: "$-1$",
          correct: true,
          feedback: "$-3 < 0$, so use $x + 2$: $-3 + 2 = -1$.",
        },
        {
          text: "$9$",
          feedback:
            "$9$ comes from $x^2$, but that rule only applies when $x \\ge 0$. Since $-3 < 0$, use $x + 2 = -1$.",
        },
        {
          text: "Both $-1$ and $9$",
          feedback:
            "Exactly one rule applies to each input — that's what keeps it a function. $-3 < 0$, so only $x+2$ counts.",
        },
      ],
    },
    {
      type: "quiz",
      id: "piecewise-functions-quiz-2",
      variant: "concept",
      question: "What is $f(0)$, and why?",
      options: [
        {
          text: "$0$, because the $x \\ge 0$ rule owns the boundary",
          correct: true,
          feedback:
            "The condition $x \\ge 0$ includes 0, so $f(0) = 0^2 = 0$ — the closed circle on the graph.",
        },
        {
          text: "$2$, from the $x + 2$ rule",
          feedback:
            "The left rule requires $x < 0$, strictly. Height 2 is the open circle — approached, never taken.",
        },
        {
          text: "Undefined — the rules disagree there",
          feedback:
            "The conditions are written so exactly one rule owns each input: $x \\ge 0$ claims 0, giving $f(0)=0$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "piecewise-functions-quiz-3",
      variant: "mastery",
      question:
        "Near $x = 0$, the two pieces of this graph don't meet — there's a jump from height 2 down to height 0. Which question does that raise?",
      options: [
        {
          text: "What value does the function approach as $x$ gets close to 0 — and does it match $f(0)$?",
          correct: true,
          feedback:
            "That is precisely a limit-and-continuity question. You'll have the tools for it one chapter from now.",
        },
        {
          text: "Whether it's really a function",
          feedback:
            "It is one — every input still has exactly one output. The interesting issue is what happens as inputs approach the jump.",
        },
        {
          text: "Whether the domain is wrong",
          feedback:
            "The domain is all real numbers; nothing is missing. The jump is about behaviour near a point, not about allowed inputs.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — three pieces, three checks.** An electricity tariff charges by usage $u$ (in units):",
    },
    {
      type: "math",
      latex:
        "C(u) = \\begin{cases} 3u & u \\le 100 \\\\ 5u & 100 < u \\le 200 \\\\ 8u & u > 200 \\end{cases}",
    },
    {
      type: "text",
      content:
        "Find $C(100)$, $C(150)$ and $C(250)$.\n\nStep 1 — $C(100)$: which condition holds? $100 \\le 100$ ✓ (the first, since $\\le$ includes equality). So $C(100) = 3(100) = 300$.\nStep 2 — $C(150)$: $150 \\le 100$? No. $100 < 150 \\le 200$? Yes. So $C(150) = 5(150) = 750$.\nStep 3 — $C(250)$: only $u > 200$ holds. $C(250) = 8(250) = 2000$.\n\nThe discipline: check conditions *before* touching any formula, and note carefully who owns each boundary.",
    },
    {
      type: "quiz",
      id: "piecewise-functions-quiz-4",
      variant: "practice",
      question: "Using the tariff $C(u)$ above, what is $C(200)$?",
      options: [
        {
          text: "$1000$, from the middle rule",
          correct: true,
          feedback:
            "$100 < 200 \\le 200$ — the $\\le$ gives the middle rule ownership of the boundary: $5(200) = 1000$.",
        },
        {
          text: "$1600$, from the top rule",
          feedback:
            "The top rule needs $u > 200$, strictly — 200 itself doesn't qualify. The middle rule's $\\le 200$ claims it: $5(200) = 1000$.",
        },
        {
          text: "Both $1000$ and $1600$",
          feedback:
            "The strict/non-strict inequalities are written precisely so exactly one rule owns each input. $\\le 200$ wins: $C(200) = 1000$.",
        },
      ],
      hint: "Is the condition on the third piece $\\ge$ or a strict $>$?",
    },
    {
      type: "quiz",
      id: "piecewise-functions-quiz-5",
      variant: "concept",
      question:
        "The absolute value $|x|$ is secretly piecewise: $|x| = \\begin{cases} x & x \\ge 0 \\\\ -x & x < 0 \\end{cases}$. What is $|-5|$, by the rules?",
      options: [
        {
          text: "$5$ — the input is negative, so the $-x$ rule gives $-(-5) = 5$",
          correct: true,
          feedback:
            "The $-x$ rule doesn't output negatives — it flips the sign of an already-negative input. That's how $|x|$ makes everything non-negative.",
        },
        {
          text: "$-5$ — the second rule has a minus sign, so the output is negative",
          feedback:
            "Substitute carefully: $-x$ at $x = -5$ is $-(-5) = +5$. A minus applied to a negative turns positive.",
        },
        {
          text: "Undefined — $-5$ isn't allowed in an absolute value",
          feedback:
            "Every real number has an absolute value; the domain is all reals. $-5 < 0$ picks the second rule: $-(-5) = 5$.",
        },
      ],
    },
  ]),
};

const lesson10: LessonSeed = {
  slug: "from-functions-to-calculus",
  title: "0.10 · From Functions to Calculus",
  position: 10,
  blocks: blocks([
    {
      type: "text",
      content:
        "You can now read, evaluate, transform and combine functions. Time to ask the question this whole chapter has been building toward. Take $f(x) = x^2$ and ask: how fast is it changing?\n\nBetween $x = 1$ and $x = 3$ we can answer with division:",
    },
    {
      type: "math",
      latex: "\\frac{f(3) - f(1)}{3 - 1} = \\frac{9 - 1}{2} = 4",
    },
    {
      type: "text",
      content:
        "Geometrically, that number is the slope of the secant line — the straight line through the two points on the curve. It measures average change over the interval. But averages blur detail. What's the speed at exactly $x = 2$? Pin the first point and slide the second one toward it:",
    },
    {
      type: "interactive",
      config: {
        component: "secant-explorer",
        expr: "x^2",
        exprLatex: "x^2",
        x1: 2,
        min: 0,
        max: 4,
        step: 0.05,
        initial: 4,
        window: { xmin: 0, xmax: 4.5, ymin: -2, ymax: 18 },
      },
    },
    {
      type: "text",
      content:
        "As $x_2$ slides toward 2, the secant slope settles: 6, then 5, then 4.5, 4.1, 4.05… it's closing in on something. So make the two points equal and read off the answer:",
    },
    {
      type: "math",
      latex: "\\frac{f(2) - f(2)}{2 - 2} = \\frac{0}{0}",
    },
    {
      type: "text",
      content:
        "Oops. The formula that worked for every pair of points collapses at the exact moment we ask the question we actually care about.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The cliffhanger",
      content:
        "To find instantaneous change, we need a way of getting arbitrarily close without simply setting the two points equal.\n\nNext: Limits.",
    },
    {
      type: "quiz",
      id: "from-functions-to-calculus-quiz-1",
      variant: "practice",
      question:
        "For $f(x) = x^2$, what is the average rate of change between $x = 2$ and $x = 3$?",
      options: [
        {
          text: "$5$",
          correct: true,
          feedback: "$\\dfrac{f(3) - f(2)}{3 - 2} = \\dfrac{9 - 4}{1} = 5$.",
        },
        {
          text: "$4$",
          feedback:
            "Careful — that was the 1-to-3 answer. Here: $\\dfrac{9 - 4}{3 - 2} = 5$.",
        },
        {
          text: "$13$",
          feedback:
            "That's $f(3) + f(2)$. Rate of change is a difference over a difference: $\\frac{9-4}{3-2} = 5$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "from-functions-to-calculus-quiz-2",
      variant: "mastery",
      question:
        "In the explorer, the secant slopes were 4.1, 4.05, 4.01… as $x_2$ approached 2. What's the reasonable guess for the instantaneous rate of change of $x^2$ at $x = 2$?",
      options: [
        {
          text: "$4$ — the value the slopes are closing in on",
          correct: true,
          feedback:
            "You just computed your first limit, before being taught what a limit is. Making 'closing in on' precise is exactly the next chapter's job.",
        },
        {
          text: "$0$ — because the formula gives $\\frac{0}{0}$",
          feedback:
            "$\\frac{0}{0}$ isn't 0 — it's no answer at all. Trust the trend of the nearby slopes instead: they head to 4.",
        },
        {
          text: "There's no way to know",
          feedback:
            "The slopes aren't wandering — they march steadily toward 4. Turning that trend into a rigorous answer is what limits are for.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example — average rate of change, start to finish.** For $f(x) = x^3$, find the average rate of change between $x = 1$ and $x = 2$.\n\nStep 1: Evaluate at both ends: $f(1) = 1$, $f(2) = 8$.\nStep 2: Change in output: $8 - 1 = 7$.\nStep 3: Change in input: $2 - 1 = 1$.\nStep 4: Divide:",
    },
    {
      type: "math",
      latex: "\\frac{f(2) - f(1)}{2 - 1} = \\frac{8 - 1}{1} = 7",
    },
    {
      type: "text",
      content:
        "Geometrically: the secant line through $(1, 1)$ and $(2, 8)$ has slope 7. On average, over that stretch, the function climbs 7 units of output per unit of input.",
    },
    {
      type: "quiz",
      id: "from-functions-to-calculus-quiz-3",
      variant: "practice",
      question:
        "For the straight line $f(x) = 3x + 1$, what is the average rate of change between $x = 2$ and $x = 6$?",
      options: [
        {
          text: "$3$",
          correct: true,
          feedback:
            "$\\frac{f(6) - f(2)}{6 - 2} = \\frac{19 - 7}{4} = 3$. For a line, EVERY interval gives the same answer — the slope. Lines are the one family where average and instantaneous change already agree.",
        },
        {
          text: "$12$",
          feedback:
            "$12$ is just the change in output, $19 - 7$. Rate of change divides by the input change too: $\\frac{12}{4} = 3$.",
        },
        {
          text: "It depends on the interval.",
          feedback:
            "For curves, yes — but this is a line. Try any interval: the answer is always the slope, 3.",
        },
      ],
    },
    {
      type: "quiz",
      id: "from-functions-to-calculus-quiz-4",
      variant: "practice",
      question:
        "For $f(x) = \\dfrac{1}{x}$, the average rate of change between $x = 1$ and $x = 2$ is $\\dfrac{0.5 - 1}{2 - 1} = -0.5$. What does the minus sign mean?",
      options: [
        {
          text: "The function is decreasing over that stretch — outputs fall as $x$ grows.",
          correct: true,
          feedback:
            "Negative rate = falling secant line. Rates carry direction, not just speed: down 0.5 output units per input unit, on average.",
        },
        {
          text: "A calculation error — rates can't be negative.",
          feedback:
            "They can and constantly are: cooling coffee, draining batteries, depreciating cars. The sign is the direction of change.",
        },
        {
          text: "The function is negative there.",
          feedback:
            "The OUTPUTS are positive ($1$ and $0.5$); it's the CHANGE between them that's negative. Sign of value and sign of change are independent.",
        },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-mastery",
  title: "Chapter 0 Mastery Check",
  position: 11,
  blocks: blocks([
    {
      type: "text",
      content:
        "One question per big idea. If any of these feels shaky, revisit that lesson before moving on — limits will lean on all of them.",
    },
    {
      type: "quiz",
      id: "chapter-mastery-quiz-1",
      variant: "mastery",
      question:
        "Which relationship is a function? (0.1)",
      options: [
        {
          text: "Each real number → its cube",
          correct: true,
          feedback: "Exactly one cube per number.",
        },
        {
          text: "Each positive number → a number whose square it is",
          feedback: "9 could map to 3 or −3: two outputs for one input.",
        },
        {
          text: "$1 \\to A$, $1 \\to B$, $2 \\to C$",
          feedback: "Input 1 has two outputs.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-mastery-quiz-2",
      variant: "mastery",
      question: "If $f(x) = x^2 - 3x$, what is $f(x+h)$? (0.2)",
      options: [
        {
          text: "$(x+h)^2 - 3(x+h)$",
          correct: true,
          feedback:
            "Substitute the whole package everywhere $x$ appears. This exact expression opens the derivative chapter.",
        },
        {
          text: "$x^2 - 3x + h$",
          feedback: "That just adds $h$ at the end; every $x$ must become $(x+h)$.",
        },
        {
          text: "$f \\cdot (x + h)$",
          feedback: "Function notation isn't multiplication.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-mastery-quiz-3",
      variant: "mastery",
      question: "What is the domain of $f(x) = \\dfrac{1}{\\sqrt{x}}$? (0.3)",
      options: [
        {
          text: "$x > 0$",
          correct: true,
          feedback:
            "Both suspects at once: the root needs $x \\ge 0$, the division kicks out 0 itself.",
        },
        {
          text: "$x \\ge 0$",
          feedback: "At $x = 0$ you'd divide by $\\sqrt{0} = 0$.",
        },
        {
          text: "All real numbers except 0",
          feedback: "Negative inputs fail too: no real $\\sqrt{x}$ for $x < 0$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-mastery-quiz-4",
      variant: "mastery",
      question:
        "A graph reaches its highest point at $(2, 5)$ and falls on both sides of it. What can you read off? (0.4, 0.5)",
      options: [
        {
          text: "$f(2) = 5$, and it's a local maximum",
          correct: true,
          feedback:
            "Height at $x=2$ is 5, and rising-then-falling is exactly what a local max looks like.",
        },
        {
          text: "$f(5) = 2$",
          feedback: "Coordinates read (input, output): the input is 2, the output 5.",
        },
        {
          text: "The domain ends at $x = 2$",
          feedback:
            "The function keeps existing on both sides — it just decreases there.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-mastery-quiz-5",
      variant: "mastery",
      question:
        "Which formula shifts $y = |x|$ right 3 and down 1? (0.6)",
      options: [
        {
          text: "$y = |x - 3| - 1$",
          correct: true,
          feedback: "Minus inside moves right; minus outside moves down.",
        },
        {
          text: "$y = |x + 3| - 1$",
          feedback: "Plus inside moves left — the backwards one strikes again.",
        },
        {
          text: "$y = |x - 3| + 1$",
          feedback: "The outside sign is wrong: $+1$ moves up.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-mastery-quiz-6",
      variant: "mastery",
      question:
        "With $f(x) = 2^x$ and $g(x) = x - 1$, what is $f(g(3))$? (0.7, 0.8)",
      options: [
        { text: "$4$", correct: true, feedback: "$g(3) = 2$, then $f(2) = 2^2 = 4$." },
        { text: "$7$", feedback: "That's $f(3) - 1$ — the pipeline backwards. $g$ first: $3 \\to 2 \\to 4$." },
        { text: "$8$", feedback: "That's $f(3)$, skipping $g$. First subtract 1: $f(2) = 4$." },
      ],
    },
    {
      type: "quiz",
      id: "chapter-mastery-quiz-7",
      variant: "mastery",
      question:
        "$f(x) = \\begin{cases} 2x & x < 1 \\\\ 3 & x \\ge 1 \\end{cases}$ — what is $f(1)$? (0.9)",
      options: [
        { text: "$3$", correct: true, feedback: "$x \\ge 1$ owns the boundary, so $f(1) = 3$." },
        { text: "$2$", feedback: "The $2x$ rule needs $x < 1$, strictly. The boundary belongs to the constant rule." },
        { text: "Undefined", feedback: "Exactly one rule claims $x = 1$: the second one. $f(1) = 3$." },
      ],
    },
    {
      type: "quiz",
      id: "chapter-mastery-quiz-8",
      variant: "mastery",
      question:
        "The secant slope of $f$ between $x = a$ and a nearby point keeps approaching 7 as the points close in — but equals $\\frac{0}{0}$ when they coincide. What do we need? (0.10)",
      options: [
        {
          text: "A tool for getting arbitrarily close without touching — a limit",
          correct: true,
          feedback:
            "You're ready for Chapter 1. That tool is exactly what limits formalize.",
        },
        {
          text: "To conclude the rate is 0, since $0/0$ has a 0 on top",
          feedback:
            "$\\frac{0}{0}$ carries no information. The trend of nearby slopes (→ 7) is the meaningful signal.",
        },
        {
          text: "A bigger interval, to avoid the problem",
          feedback:
            "Bigger intervals give average change. The instantaneous question needs the points closer, not farther.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-mastery-quiz-9",
      variant: "mastery",
      question:
        "Compute-it-all check: $f(x) = x^2 - x$. What is $f(-2)$? (0.2)",
      options: [
        {
          text: "$6$",
          correct: true,
          feedback: "$(-2)^2 - (-2) = 4 + 2 = 6$. Parentheses on both slots.",
        },
        {
          text: "$2$",
          feedback: "That's $4 - 2$ — the second term is $-(-2) = +2$, so $4 + 2 = 6$.",
        },
        {
          text: "$-6$",
          feedback: "$(-2)^2 = +4$, not $-4$. Then $4 + 2 = 6$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "chapter-mastery-quiz-10",
      variant: "mastery",
      question:
        "What is the average rate of change of $f(x) = x^2$ between $x = 0$ and $x = 3$? (0.10)",
      options: [
        {
          text: "$3$",
          correct: true,
          feedback:
            "$\\frac{f(3) - f(0)}{3 - 0} = \\frac{9 - 0}{3} = 3$: the slope of the secant from $(0,0)$ to $(3,9)$.",
        },
        {
          text: "$9$",
          feedback: "That's the change in output alone. Divide by the input change: $\\frac{9}{3} = 3$.",
        },
        {
          text: "$6$",
          feedback:
            "$6$ will turn out to be the INSTANTANEOUS rate at $x = 3$ — a limit, next chapter's tool. The average over $[0,3]$ is $\\frac{9-0}{3-0} = 3$.",
        },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content: "All solid? Then you know why limits need to exist. On to Chapter 1.",
    },
  ]),
};

export const chapterLessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lesson08,
  lesson09,
  lesson10,
  lessonMastery,
];
