import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Probability Chapter 4 — Random Variables, Expectation and Variance.
 * Outcomes get numbers attached so they can be summarised: a random
 * variable is a function on the sample space, its distribution is a table
 * that sums to 1, expectation is the balance point of that table, variance
 * measures spread about it, and linearity of expectation (with indicator
 * variables) turns hard counting problems into one-line sums.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

/** Sum of two fair dice: n(sum = s) out of 36, for s = 2..12. */
const TWO_DICE_VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const TWO_DICE_PROBS = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map((n) => n / 36);

const lesson01: LessonSeed = {
  slug: "numbers-from-outcomes",
  title: "4.1 · Numbers from Outcomes",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pr-4-random-variables-expectation-variance.mp4",
      poster: "/videos/pr-4-random-variables-expectation-variance.jpg",
      title: "Chapter 4 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Toss a coin three times. The sample space has 8 outcomes: $HHH, HHT, HTH, THH, HTT, THT, TTH, TTT$. Very often, though, you don't care *which* of the 8 happened. You care about something like **how many heads** came up. $HHT$, $HTH$ and $THH$ are different outcomes, but they all give the same answer: 2.\n\nThat small step, from the outcome to a number the outcome produces, is the idea behind this whole chapter. Once outcomes become numbers you can average them, measure how spread out they are, and add them up.",
    },
    {
      type: "table",
      headers: ["Outcome $\\omega$", "$HHH$", "$HHT$", "$HTH$", "$THH$", "$HTT$", "$THT$", "$TTH$", "$TTT$"],
      rows: [["$X(\\omega)$ = number of heads", "3", "2", "2", "2", "1", "1", "1", "0"]],
    },
    {
      type: "text",
      content:
        "Read the table as a machine. Each outcome goes in and one number comes out. Every outcome gets **exactly one** number, and several outcomes are allowed to share the same number. That is exactly the definition of a function.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Random variable",
      content:
        "A **random variable** $X$ is a function from the sample space to the real numbers, $X : S \\to \\mathbb{R}$. It assigns a single real number $X(\\omega)$ to every outcome $\\omega$.\n\nIn this course $X$ takes a finite (or listable) set of values, so it is a **discrete** random variable.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "It is not an unknown, and it is not random in its rule",
      content:
        "The name is misleading on both counts. $X$ is not a \"variable\" like the $x$ in $2x + 3 = 7$ that you solve for. It is a fixed *rule*: \"count the heads.\" The rule never changes. What is random is the **outcome** fed into it. Once the coins land, $X$ has a definite value.",
    },
    {
      type: "text",
      content:
        "One sample space can carry many random variables, because you can ask many numerical questions about the same experiment. For the three tosses:",
    },
    {
      type: "table",
      headers: ["Outcome", "$X$ = heads", "$Y$ = heads − tails", "$Z$ = 1 if first toss is $H$, else 0"],
      rows: [
        ["$HHH$", "3", "3", "1"],
        ["$HHT$", "2", "1", "1"],
        ["$HTH$", "2", "1", "1"],
        ["$THH$", "2", "1", "0"],
        ["$HTT$", "1", "−1", "1"],
        ["$THT$", "1", "−1", "0"],
        ["$TTH$", "1", "−1", "0"],
        ["$TTT$", "0", "−3", "0"],
      ],
    },
    {
      type: "text",
      content:
        "Notice that $Y = X - (3 - X) = 2X - 3$. A new random variable built out of an old one is still a function on $S$: you just apply one more rule. $Z$ takes only the values 0 and 1. Variables like that are called **indicators**, and they will become the strongest tool in the chapter by Lesson 4.5.",
    },
    {
      type: "text",
      content:
        "**Events come from random variables.** \"$X = 2$\" is shorthand for the set of outcomes that the rule sends to 2:\n\n$\\{X = 2\\} = \\{HHT, HTH, THH\\}$, $\\quad \\{X \\ge 2\\} = \\{HHH, HHT, HTH, THH\\}$.\n\nSo everything from Chapters 0–3 still applies. $P(X = 2)$ is the probability of an ordinary event, and here it is $\\frac{3}{8}$.",
    },
    {
      type: "text",
      content:
        "**The sum of two dice.**\n\nRoll two dice. $S$ has 36 equally likely ordered pairs $(a, b)$. Let $X = a + b$. The rule squashes 36 outcomes onto only 11 values, $2, 3, \\ldots, 12$, and the values collect different numbers of outcomes. A sum of 7 can happen six ways, $(1,6), (2,5), \\ldots, (6,1)$, but a sum of 2 happens only one way, $(1,1)$.",
    },
    {
      type: "table",
      headers: ["Sum $x$", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      rows: [["Outcomes with $X = x$", "1", "2", "3", "4", "5", "6", "5", "4", "3", "2", "1"]],
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "two-dice",
        track: "sum-distribution",
        showGrid: true,
        seed: 4,
        caption:
          "Each roll is one outcome in the 6×6 grid. The bars record only the number the outcome produces, its sum. Run a thousand rolls and the bars take on the 1-2-3-4-5-6-5-4-3-2-1 shape of the table.",
      },
    },
    {
      type: "text",
      content:
        "**Money is a random variable too.**\n\nA stall charges ₹10 to play. You roll one die, and if it shows 6 you receive ₹30, otherwise nothing. Your **profit** is\n\n$X = 30 - 10 = 20$ if the die shows 6, $\\quad X = -10$ if it shows 1, 2, 3, 4 or 5.\n\nSix outcomes, two values. Losses are just negative values, and a random variable is allowed to take them.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 1 · Red balls in a draw",
      content:
        "A bag has 3 red balls ($R_1, R_2, R_3$) and 2 blue balls ($B_1, B_2$). Two are drawn together. Let $X$ be the number of red balls drawn.\n\n**Step 1: the sample space.** Unordered pairs from 5 balls: $\\binom{5}{2} = 10$ outcomes, all equally likely.\n\n**Step 2: apply the rule.** Both red: $\\binom{3}{2} = 3$ pairs give $X = 2$. One of each: $3 \\times 2 = 6$ pairs give $X = 1$. Both blue: $\\binom{2}{2} = 1$ pair gives $X = 0$.\n\n**Step 3: check.** $3 + 6 + 1 = 10$. Every outcome got exactly one value, as a function must.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 2 · The larger of two dice",
      content:
        "Roll two dice and let $M = \\max(a, b)$. How many of the 36 outcomes give $M = k$?\n\n**Step 1.** $M \\le k$ means both dice are at most $k$: that is $k \\times k = k^2$ outcomes.\n\n**Step 2.** $M = k$ means $M \\le k$ but not $M \\le k - 1$: $k^2 - (k-1)^2 = 2k - 1$ outcomes.\n\n**Step 3.** So $M = 1, 2, 3, 4, 5, 6$ collect $1, 3, 5, 7, 9, 11$ outcomes, and $1 + 3 + 5 + 7 + 9 + 11 = 36$. ✓",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 3 · A delivery rider's day (word problem)",
      content:
        "A rider has 3 deliveries today. Each one is either on time ($O$) or late ($L$), so there are $2^3 = 8$ possible strings such as $OLO$. The app pays ₹40 for an on-time delivery and fines ₹20 for a late one. Let $X$ be the rider's net earnings for the day. What values can $X$ take, and how many of the 8 strings give each value?",
    },
    {
      type: "text",
      content:
        "**Step 1: find a simpler variable underneath.** Let $K$ be the number of on-time deliveries. Then $K \\in \\{0, 1, 2, 3\\}$ and there are $3 - K$ late ones, so",
    },
    { type: "math", latex: "X = 40K - 20(3 - K) = 60K - 60" },
    {
      type: "text",
      content:
        "*Why this step:* the earnings depend only on *how many* deliveries were on time, not on which ones. $K$ is the heads-count from the three-coin table in disguise.\n\n**Step 2: push each value of $K$ through the rule.** $K = 3, 2, 1, 0$ give $X = 120, 60, 0, -60$.\n\n**Step 3: count the strings.** The number of strings with $K$ on-time deliveries is $\\binom{3}{K}$, which is $1, 3, 3, 1$. Check: $1 + 3 + 3 + 1 = 8$. ✓\n\n*Why this step:* $X = 60K - 60$ is one-to-one, so each value of $X$ collects exactly the strings that give one value of $K$, and the counts carry over unchanged. A day with one on-time delivery earns exactly ₹0, and 0 is a perfectly good value of a random variable.",
    },
    {
      type: "table",
      headers: ["On time $K$", "0", "1", "2", "3"],
      rows: [
        ["Earnings $X$ (₹)", "−60", "0", "60", "120"],
        ["Strings giving it", "1", "3", "3", "1"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 4 · The gap between two dice (exam style)",
      content:
        "Two dice are rolled and $D = |a - b|$ is the absolute difference of the two numbers. List the values of $D$ and count how many of the 36 outcomes give each value.",
    },
    {
      type: "text",
      content:
        "**Step 1: the range.** The smallest gap is 0 (a double) and the largest is $6 - 1 = 5$, so $D \\in \\{0, 1, 2, 3, 4, 5\\}$.\n\n**Step 2: gap 0.** The doubles $(1,1), \\ldots, (6,6)$ give 6 outcomes.\n\n**Step 3: gap $d \\ge 1$.** First count the pairs with $a - b = d$: $b$ can be $1, 2, \\ldots, 6 - d$, so there are $6 - d$ of them. The pairs with $b - a = d$ are their mirror images, another $6 - d$.",
    },
    { type: "math", latex: "\\#\\{D = d\\} = 2(6 - d) \\qquad (d = 1, 2, \\ldots, 5)" },
    {
      type: "text",
      content:
        "*Why this step:* the absolute value folds the $6 \\times 6$ grid along its main diagonal. Every gap $d \\ge 1$ is collected from two diagonals, one on each side, while gap 0 is the main diagonal itself and is counted once.\n\n**Step 4: tabulate and check.**",
    },
    {
      type: "table",
      headers: ["$d$", "0", "1", "2", "3", "4", "5"],
      rows: [["Outcomes with $D = d$", "6", "10", "8", "6", "4", "2"]],
    },
    {
      type: "text",
      content:
        "$6 + 10 + 8 + 6 + 4 + 2 = 36$. ✓ The most common gap is 1, not 0: the doubles fill one diagonal, but a gap of 1 fills two.",
    },
    {
      type: "quiz",
      id: "pr4-1-q1",
      variant: "concept",
      question: "Which statement best describes a random variable $X$?",
      options: [
        {
          text: "A fixed rule that assigns one real number to every outcome in the sample space.",
          correct: true,
          feedback: "Yes. The rule is fixed; the randomness lives in which outcome occurs.",
        },
        {
          text: "An unknown number whose value we solve for using the probabilities.",
          feedback: "That is an algebra unknown. $X$ is never solved for: it is a function, and it has a value as soon as the outcome is known.",
        },
        {
          text: "A number that changes its rule each time the experiment is repeated.",
          feedback: "The rule (e.g. \"count the heads\") stays the same every time. Only the outcome fed into it changes.",
        },
        {
          text: "Any event, such as \"at least two heads\".",
          feedback: "An event is a set of outcomes. $\\{X \\ge 2\\}$ is an event built *from* $X$, but $X$ itself outputs numbers, not yes/no.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pr4-1-q2",
      variant: "practice",
      question: "Three coins are tossed and $Y$ = (number of heads) − (number of tails). What values can $Y$ take?",
      options: [
        { text: "$-3, -1, 1, 3$", correct: true, feedback: "$Y = 2X - 3$ with $X \\in \\{0,1,2,3\\}$ gives $-3, -1, 1, 3$. The difference is always odd because 3 is odd." },
        { text: "$-3, -2, -1, 0, 1, 2, 3$", feedback: "With 3 tosses, heads + tails = 3, so heads − tails can never be even. Try $X = 1$: $1 - 2 = -1$." },
        { text: "$0, 1, 2, 3$", feedback: "Those are the values of the number of heads, not the difference." },
      ],
      hint: "If there are $X$ heads, there are $3 - X$ tails.",
    },
    {
      type: "quiz",
      id: "pr4-1-q3",
      variant: "practice",
      question: "Two dice are rolled and $M$ is the larger of the two numbers. How many of the 36 outcomes give $M = 4$?",
      options: [
        { text: "7", correct: true, feedback: "$4^2 - 3^2 = 16 - 9 = 7$: the pairs with both dice $\\le 4$, minus those with both $\\le 3$." },
        { text: "4", feedback: "That counts only one row of the grid. $(4,1)$ and $(1,4)$ are different outcomes, and $(4,4)$ also counts." },
        { text: "8", feedback: "Close, but $(4,4)$ has been counted twice. It is one outcome." },
        { text: "16", feedback: "16 is the count for $M \\le 4$. Subtract those with $M \\le 3$." },
      ],
      hint: "Count outcomes with $M \\le 4$, then remove those with $M \\le 3$.",
    },
    {
      type: "quiz",
      id: "pr4-1-q4",
      variant: "concept",
      question: "For three coin tosses, $X$ is the number of heads. Which describes the event $\\{X = 1\\}$?",
      options: [
        { text: "The set $\\{HTT, THT, TTH\\}$", correct: true, feedback: "It is the set of all outcomes the rule sends to 1." },
        { text: "The number 1", feedback: "1 is the value. The event is the collection of outcomes that produce that value." },
        { text: "The single outcome $HTT$", feedback: "$THT$ and $TTH$ also have exactly one head, so they belong to the event too." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-1-q5",
      variant: "practice",
      question: "You pay ₹20 to draw one card from a standard deck. An ace pays ₹100, a king pays ₹50, anything else pays nothing. What values can your profit $X$ take?",
      options: [
        { text: "$80, 30, -20$", correct: true, feedback: "Profit = payout − ₹20: $100 - 20$, $50 - 20$ and $0 - 20$." },
        { text: "$100, 50, 0$", feedback: "Those are the payouts. Profit subtracts the ₹20 you paid in every case." },
        { text: "$80, 30, 0$", feedback: "If you draw anything else you still paid ₹20, so the profit is $-20$, not 0." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-1-q6",
      variant: "practice",
      question: "Two dice are rolled and $D = |a - b|$. How many of the 36 outcomes give $D = 3$?",
      options: [
        { text: "6", correct: true, feedback: "$2(6 - 3) = 6$: $(4,1), (5,2), (6,3)$ and their mirror images $(1,4), (2,5), (3,6)$." },
        { text: "3", feedback: "That counts only the pairs with $a > b$. $(1,4)$ is a different outcome from $(4,1)$, and it also has gap 3." },
        { text: "12", feedback: "You have doubled twice. There are 3 pairs with $a - b = 3$ and 3 mirror images: 6 in all." },
        { text: "4", feedback: "Count the pairs with $a - b = 3$: $b$ can be 1, 2 or 3, so there are 3, not 4. Then add the mirror images." },
      ],
      hint: "Count the pairs with $a - b = 3$, then add their mirror images.",
    },
    {
      type: "quiz",
      id: "pr4-1-q7",
      variant: "practice",
      question: "A rider makes 4 deliveries. Each on-time delivery earns ₹50 and each late one costs a ₹30 fine. What values can the net earnings $X$ take?",
      options: [
        { text: "$-120, -40, 40, 120, 200$", correct: true, feedback: "With $K$ on time, $X = 50K - 30(4 - K) = 80K - 120$. $K = 0, 1, 2, 3, 4$ gives these five values." },
        { text: "$0, 50, 100, 150, 200$", feedback: "That ignores the fines. Every late delivery subtracts ₹30." },
        { text: "$-120, -40, 40, 120$", feedback: "You've missed $K = 4$: four on-time deliveries earn ₹200. With 4 deliveries, $K$ runs from 0 to 4, which is five values." },
      ],
      hint: "Let $K$ be the number of on-time deliveries and write $X$ in terms of $K$.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "probability-distributions",
  title: "4.2 · Probability Distributions",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A random variable tells you *which* numbers can appear. The next question is *how often*. To find $P(X = x)$, collect every outcome that the rule sends to $x$ and add up their probabilities.\n\nFor the number of heads in three fair tosses, all 8 outcomes have probability $\\frac{1}{8}$:",
    },
    {
      type: "table",
      headers: ["$x$", "0", "1", "2", "3"],
      rows: [
        ["Outcomes", "$TTT$", "$HTT, THT, TTH$", "$HHT, HTH, THH$", "$HHH$"],
        ["$P(X = x)$", "$\\frac{1}{8}$", "$\\frac{3}{8}$", "$\\frac{3}{8}$", "$\\frac{1}{8}$"],
      ],
    },
    {
      type: "text",
      content:
        "That table is the **probability distribution** of $X$. It drops the outcomes entirely and keeps only what you need: each value and its probability. Once you have it, you can answer any question about $X$ without going back to the coins.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Probability mass function (PMF)",
      content:
        "If $X$ takes values $x_1, x_2, \\ldots, x_n$, its **probability distribution** (or PMF) is the list of $p_i = P(X = x_i)$. Every valid distribution satisfies two conditions:\n\n**1.** $p_i \\ge 0$ for every $i$;\n\n**2.** $p_1 + p_2 + \\cdots + p_n = 1$.",
    },
    {
      type: "text",
      content:
        "Neither condition is a new rule. They are inherited from the sample space:\n\n**Non-negative:** each $p_i$ is the probability of an event, and probabilities of events are never negative.\n\n**Sum to 1:** the events $\\{X = x_1\\}, \\{X = x_2\\}, \\ldots$ are mutually exclusive, because a function gives each outcome only one value. They are also exhaustive, because every outcome gets *some* value. So between them they partition $S$, and their probabilities add up to $P(S) = 1$.",
    },
    { type: "math", latex: "\\sum_{i} P(X = x_i) = P\\Big(\\bigcup_i \\{X = x_i\\}\\Big) = P(S) = 1" },
    {
      type: "interactive",
      config: {
        component: "prob-distribution-explorer",
        mode: "custom",
        values: [0, 1, 2, 3],
        probs: [0.2, 0.3, 0.4, 0.3],
        editable: true,
        showMean: false,
        showCdf: true,
        label: "X",
        caption:
          "This table is broken on purpose: its bars add up to 1.2. Drag the bars until the ΣP check shows ✓. Then try pulling one bar below zero and watch the warning. Switch to the CDF view to see the staircase.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "A distribution is not just any list of numbers",
      content:
        "If a bar is negative, or the bars add up to 0.9 or to 1.2, the table does not describe any real experiment. There is no outcome that happens −10% of the time, and a total other than 1 means some probability has gone missing or been counted twice. Always check both conditions before using a table.",
    },
    {
      type: "text",
      content:
        "**Finding the constant $k$.**\n\nA standard exam question gives a distribution with an unknown constant. You use the condition $\\sum p_i = 1$ to find it, and the condition $p_i \\ge 0$ to throw away any impossible solution.",
    },
    {
      type: "table",
      headers: ["$x$", "0", "1", "2", "3", "4", "5", "6", "7"],
      rows: [["$P(X = x)$", "0", "$k$", "$2k$", "$2k$", "$3k$", "$k^2$", "$2k^2$", "$7k^2 + k$"]],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 1 · A quadratic in k",
      content:
        "**Step 1: sum to 1.** $0 + k + 2k + 2k + 3k + k^2 + 2k^2 + 7k^2 + k = 1$, so $10k^2 + 9k - 1 = 0$.\n\n**Step 2: solve.** $(10k - 1)(k + 1) = 0$, so $k = \\frac{1}{10}$ or $k = -1$.\n\n**Step 3: reject.** $k = -1$ would make $P(X = 1) = -1$, which is not allowed. So $k = \\frac{1}{10}$.\n\n**Step 4: use it.** $P(X < 3) = 0 + k + 2k = \\frac{3}{10}$. $\\;P(X > 6) = 7k^2 + k = 0.07 + 0.1 = 0.17$.",
    },
    {
      type: "text",
      content:
        "**The cumulative distribution function.**\n\nMany questions ask \"at most\": at most 2 heads, a score of 4 or less. The running total of the PMF answers all of them at once.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Cumulative distribution function (CDF)",
      content:
        "$F(x) = P(X \\le x) = \\displaystyle\\sum_{x_i \\le x} P(X = x_i)$.\n\n$F$ starts at 0 far to the left, never decreases, and reaches 1 at the largest value. It is flat between values and **jumps** at each value $x_i$ by exactly $P(X = x_i)$.",
    },
    {
      type: "table",
      headers: ["$x$", "0", "1", "2", "3"],
      rows: [
        ["$P(X = x)$", "$\\frac{1}{8}$", "$\\frac{3}{8}$", "$\\frac{3}{8}$", "$\\frac{1}{8}$"],
        ["$F(x) = P(X \\le x)$", "$\\frac{1}{8}$", "$\\frac{4}{8}$", "$\\frac{7}{8}$", "$1$"],
      ],
    },
    {
      type: "text",
      content:
        "Because $F$ is a running total, you can go back from the CDF to the PMF by taking differences. You can also read off any interval:",
    },
    {
      type: "math",
      latex:
        "P(X = x_i) = F(x_i) - F(x_{i-1}), \\qquad P(a < X \\le b) = F(b) - F(a)",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 2 · From staircase back to bars",
      content:
        "$X$ takes the values 1, 2, 3, 4 with $F(1) = 0.2$, $F(2) = 0.5$, $F(3) = 0.9$, $F(4) = 1$.\n\n**Step 1: the PMF is the jumps.** $P(X=1) = 0.2$, $P(X=2) = 0.5 - 0.2 = 0.3$, $P(X=3) = 0.9 - 0.5 = 0.4$, $P(X=4) = 1 - 0.9 = 0.1$.\n\n**Step 2: check.** $0.2 + 0.3 + 0.4 + 0.1 = 1$. ✓\n\n**Step 3: an interval.** $P(2 \\le X \\le 3) = P(1 < X \\le 3) = F(3) - F(1) = 0.9 - 0.2 = 0.7$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 3 · The gap between two dice, as a distribution",
      content:
        "In 4.1 (Worked example 4) the gap $D = |a - b|$ collected 6, 10, 8, 6, 4, 2 of the 36 outcomes. Write down its distribution and its CDF, then find $P(D \\le 2)$ and $P(D \\ge 3)$.",
    },
    {
      type: "text",
      content:
        "**Step 1: divide by 36.** Every outcome has probability $\\frac{1}{36}$, so $P(D = d)$ is the count divided by 36.\n\n*Why this step:* $\\{D = d\\}$ is an ordinary event, and for equally likely outcomes its probability is favourable over total.\n\n**Step 2: running totals.** Add the bars from the left to get $F$.",
    },
    {
      type: "table",
      headers: ["$d$", "0", "1", "2", "3", "4", "5"],
      rows: [
        ["$P(D = d)$", "$\\frac{6}{36}$", "$\\frac{10}{36}$", "$\\frac{8}{36}$", "$\\frac{6}{36}$", "$\\frac{4}{36}$", "$\\frac{2}{36}$"],
        ["$F(d)$", "$\\frac{6}{36}$", "$\\frac{16}{36}$", "$\\frac{24}{36}$", "$\\frac{30}{36}$", "$\\frac{34}{36}$", "$1$"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 3: read off.** $P(D \\le 2) = F(2) = \\frac{24}{36} = \\frac{2}{3}$, and $P(D \\ge 3) = 1 - F(2) = \\frac{1}{3}$.\n\n*Why this step:* \"$D \\ge 3$\" is the complement of \"$D \\le 2$\", so one CDF value answers both questions. The last CDF entry coming out as exactly 1 is your built-in check.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 4 · Testing bulbs until both duds are found (word problem)",
      content:
        "A box of 6 bulbs contains 2 defective ones. A technician tests the bulbs one at a time, in random order, and stops as soon as both defective bulbs have been found. Let $X$ be the number of tests made. Find the distribution of $X$ and $P(X \\le 4)$.",
    },
    {
      type: "text",
      content:
        "**Step 1: choose a sample space that makes counting easy.** All that matters is *which two positions* in the testing order hold the defective bulbs. Every pair of positions is equally likely, and there are $\\binom{6}{2} = 15$ pairs.\n\n*Why this step:* listing all $6! = 720$ testing orders would work, but it is far more than you need. Only the positions of the two duds decide $X$.\n\n**Step 2: apply the rule.** Testing stops at the *later* of the two positions, so $X$ is the larger position. For $X = k$, one dud sits at position $k$ and the other at any of the $k - 1$ earlier positions.",
    },
    { type: "math", latex: "P(X = k) = \\frac{k - 1}{15}, \\qquad k = 2, 3, 4, 5, 6" },
    {
      type: "text",
      content:
        "This is the \"larger of two\" rule from 4.1 again, now without repeats, since two duds can't share a position.\n\n**Step 3: check.** $\\frac{1 + 2 + 3 + 4 + 5}{15} = \\frac{15}{15} = 1$. ✓\n\n**Step 4: answer.** $P(X \\le 4) = \\frac{1 + 2 + 3}{15} = \\frac{6}{15} = \\frac{2}{5}$. So 60% of the time the technician has to test at least 5 bulbs.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 5 · Throwing until a six (exam style)",
      content:
        "A die is thrown repeatedly until a 6 appears. Let $X$ be the number of throws needed. Find the distribution of $X$, show that it is a valid distribution, and find $P(X \\ge 4)$.",
    },
    {
      type: "text",
      content:
        "**Step 1: the event $X = k$.** It means the first $k - 1$ throws are not sixes and throw $k$ is a six. The throws are independent, so the probabilities multiply.",
    },
    {
      type: "math",
      latex: "P(X = k) = \\left(\\tfrac{5}{6}\\right)^{k-1} \\cdot \\tfrac{1}{6}, \\qquad k = 1, 2, 3, \\ldots",
    },
    {
      type: "text",
      content:
        "*Why this step:* $X$ has no largest value, so no finite table can hold it. A formula in $k$ is the distribution. This is the **listable** set of values that the definition in 4.1 allowed for.\n\n**Step 2: check validity.** Every term is positive. The sum is a geometric series with first term $\\frac{1}{6}$ and ratio $\\frac{5}{6}$:",
    },
    {
      type: "math",
      latex: "\\sum_{k=1}^{\\infty} \\left(\\tfrac{5}{6}\\right)^{k-1} \\tfrac{1}{6} = \\frac{1/6}{1 - 5/6} = 1",
    },
    {
      type: "text",
      content:
        "**Step 3: $P(X \\ge 4)$ without summing a tail.** $X \\ge 4$ happens exactly when the first 3 throws all miss the six:\n\n$P(X \\ge 4) = \\left(\\frac{5}{6}\\right)^3 = \\frac{125}{216} \\approx 0.58$.\n\n*Why this step:* adding $P(X = 4) + P(X = 5) + \\cdots$ would need another infinite series. Describing the event in words first turns it into a single product.\n\n**Step 4: check with the complement.** $P(X \\le 3) = \\frac{1}{6} + \\frac{5}{36} + \\frac{25}{216} = \\frac{36 + 30 + 25}{216} = \\frac{91}{216}$, and $\\frac{91}{216} + \\frac{125}{216} = 1$. ✓",
    },
    {
      type: "interactive",
      config: {
        component: "prob-distribution-explorer",
        mode: "custom",
        values: TWO_DICE_VALUES,
        probs: TWO_DICE_PROBS,
        label: "sum of two dice",
        showMean: false,
        showCdf: true,
        range: { a: 4, b: 9, adjustable: true },
        caption:
          "The distribution of the sum of two dice, with P(4 ≤ X ≤ 9) shaded. In the CDF view, the same probability is the rise of the staircase from just before 4 up to 9.",
      },
    },
    {
      type: "quiz",
      id: "pr4-2-q1",
      variant: "concept",
      question: "Which of these tables is a valid probability distribution for $X$ taking the values 1, 2, 3?",
      options: [
        { text: "$0.5,\\ 0.3,\\ 0.2$", correct: true, feedback: "All three are non-negative and they add up to 1." },
        { text: "$0.6,\\ 0.5,\\ -0.1$", feedback: "They add up to 1, but a probability of $-0.1$ is impossible. Both conditions are needed." },
        { text: "$0.4,\\ 0.4,\\ 0.4$", feedback: "These add up to 1.2. The three events partition $S$, so they must add up to exactly 1." },
        { text: "$0.3,\\ 0.3,\\ 0.3$", feedback: "These add up to 0.9, which leaves 0.1 of the probability unaccounted for." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-2-q2",
      variant: "practice",
      question: "$P(X = x) = kx^2$ for $x = 1, 2, 3$. Find $k$.",
      options: [
        { text: "$\\frac{1}{14}$", correct: true, feedback: "$k(1 + 4 + 9) = 14k = 1$." },
        { text: "$\\frac{1}{6}$", feedback: "That uses $1 + 2 + 3$. The probabilities are $k x^2$, so square each value first." },
        { text: "$\\frac{1}{9}$", feedback: "That makes only $P(X = 3) = 1$. All three probabilities must add to 1." },
      ],
      hint: "Write out $k \\cdot 1^2 + k \\cdot 2^2 + k \\cdot 3^2 = 1$.",
    },
    {
      type: "quiz",
      id: "pr4-2-q3",
      variant: "concept",
      question: "Solving $\\sum p_i = 1$ for a distribution gives $k = \\frac{1}{5}$ or $k = -2$, and one entry of the table is $P(X = 0) = k$. What is $k$?",
      options: [
        { text: "$k = \\frac{1}{5}$ only", correct: true, feedback: "$k = -2$ would make $P(X = 0) = -2$, which violates $p_i \\ge 0$. Algebra gives you candidates; the conditions choose between them." },
        { text: "Both values are fine, because both satisfy the equation", feedback: "Summing to 1 is only one of the two conditions. Every $p_i$ must also be non-negative." },
        { text: "$k = -2$, since it is the integer solution", feedback: "Probabilities need not be integers, but they cannot be negative." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-2-q4",
      variant: "practice",
      question: "$X$ takes the values 1, 2, 3, 4 with $F(1) = 0.1$, $F(2) = 0.35$, $F(3) = 0.75$, $F(4) = 1$. Find $P(X = 3)$.",
      options: [
        { text: "$0.4$", correct: true, feedback: "The jump at 3: $F(3) - F(2) = 0.75 - 0.35 = 0.4$." },
        { text: "$0.75$", feedback: "$F(3) = P(X \\le 3)$ includes $X = 1$ and $X = 2$ as well. Subtract $F(2)$." },
        { text: "$0.25$", feedback: "That is $1 - F(3) = P(X = 4)$." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-2-q6",
      variant: "concept",
      question: "$X$ is the number of heads in three tosses, with CDF $F(0) = \\frac{1}{8}$, $F(1) = \\frac{4}{8}$, $F(2) = \\frac{7}{8}$, $F(3) = 1$. What is $F(2.6)$?",
      options: [
        { text: "$\\frac{7}{8}$", correct: true, feedback: "$F(2.6) = P(X \\le 2.6) = P(X \\le 2)$, since no value lies between 2 and 2.6. The staircase is flat between jumps." },
        { text: "$1$", feedback: "That is $F(3)$. $X \\le 2.6$ does not include $X = 3$, so you can't round up." },
        { text: "$\\frac{3}{8}$", feedback: "That is $P(X = 2)$, a single bar. The CDF is the running total up to 2.6." },
        { text: "Undefined, because $X$ can never equal 2.6", feedback: "$F(x) = P(X \\le x)$ is defined for every real $x$. The event $X \\le 2.6$ makes sense even though $X = 2.6$ is impossible." },
      ],
      hint: "Which values of $X$ satisfy $X \\le 2.6$?",
    },
    {
      type: "quiz",
      id: "pr4-2-q5",
      variant: "practice",
      question: "Two dice are rolled. Using the distribution of the sum $X$, find $P(X \\ge 10)$.",
      options: [
        { text: "$\\frac{1}{6}$", correct: true, feedback: "$\\frac{3 + 2 + 1}{36} = \\frac{6}{36} = \\frac{1}{6}$." },
        { text: "$\\frac{1}{12}$", feedback: "That is $\\frac{3}{36}$, just $P(X = 10)$. Include 11 and 12." },
        { text: "$\\frac{1}{4}$", feedback: "That is $\\frac{9}{36}$. Recount the outcomes with sums 10, 11 and 12: 3, 2 and 1." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-2-q7",
      variant: "practice",
      question: "A box of 5 fuses has 2 defective ones. The fuses are tested one at a time, in random order, until both defective ones are found. If $X$ is the number of tests, what is $P(X = 4)$?",
      options: [
        { text: "$\\frac{3}{10}$", correct: true, feedback: "There are $\\binom{5}{2} = 10$ equally likely position pairs for the duds. $X = 4$ needs one dud at position 4 and the other in positions 1 to 3: 3 pairs." },
        { text: "$\\frac{1}{4}$", feedback: "$X$ takes the values 2, 3, 4, 5, but they are not equally likely. Later stopping points collect more position pairs." },
        { text: "$\\frac{4}{10}$", feedback: "The other dud must come *before* position 4, so there are 3 choices for it, not 4." },
        { text: "$\\frac{3}{15}$", feedback: "$\\binom{6}{2} = 15$ belongs to a box of 6. With 5 fuses there are $\\binom{5}{2} = 10$ position pairs." },
      ],
      hint: "Count the pairs of positions for the two duds whose later position is 4.",
    },
    {
      type: "quiz",
      id: "pr4-2-q8",
      variant: "practice",
      question: "A fair coin is tossed until the first head appears, and $X$ is the number of tosses. Find $P(X > 3)$.",
      options: [
        { text: "$\\frac{1}{8}$", correct: true, feedback: "$X > 3$ means the first three tosses are all tails: $\\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$." },
        { text: "$\\frac{1}{16}$", feedback: "That is $P(X = 4)$: three tails and then a head. $X > 3$ also includes $X = 5, 6, \\ldots$" },
        { text: "$\\frac{7}{8}$", feedback: "That is $P(X \\le 3)$, the complement." },
      ],
      hint: "Say in words what has to happen in the first three tosses.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "expectation",
  title: "4.3 · Expectation: The Balance Point",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A fair die is rolled and you win as many rupees as it shows. You play 600 times. How much do you win per game, on average?\n\nYou can't know the exact counts, but each face will come up about 100 times. So the total is about\n\n$1 \\cdot 100 + 2 \\cdot 100 + \\cdots + 6 \\cdot 100 = 2100$, which is ₹2100 over 600 games, or **₹3.50 per game**.",
    },
    {
      type: "text",
      content:
        "Now repeat that calculation in general. Suppose you run the experiment $N$ times and value $x_i$ turns up $n_i$ times. The average of all the values you saw is",
    },
    {
      type: "math",
      latex:
        "\\bar{x} = \\frac{x_1 n_1 + x_2 n_2 + \\cdots + x_k n_k}{N} = x_1 \\frac{n_1}{N} + x_2 \\frac{n_2}{N} + \\cdots + x_k \\frac{n_k}{N}",
    },
    {
      type: "text",
      content:
        "Each fraction $\\frac{n_i}{N}$ is a relative frequency, and in the long run relative frequency settles at probability. So the long-run average settles at $\\sum x_i p_i$. That limit gets a name.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Expectation (mean)",
      content:
        "The **expected value** of a discrete random variable $X$ is\n\n$E[X] = \\mu = \\displaystyle\\sum_i x_i\\, p_i$.\n\nIt is the long-run average value of $X$ over many independent repetitions: each value weighted by how often it occurs.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "die",
        track: "value-mean",
        seed: 35,
        caption:
          "The line is the running average of all rolls so far. Early on it jumps around. After a thousand rolls it hugs 3.5, which is the average of 1 to 6.",
      },
    },
    {
      type: "text",
      content:
        "**Why \"balance point\".**\n\nDraw the distribution as bars on a see-saw, where each bar's weight is its probability. The pivot that makes it balance is the point $\\mu$ where the moments cancel: $\\sum (x_i - \\mu) p_i = 0$. Solving gives $\\sum x_i p_i = \\mu \\sum p_i = \\mu$. So **the expectation is the centre of mass of the bar chart.**",
    },
    {
      type: "interactive",
      config: {
        component: "prob-distribution-explorer",
        mode: "custom",
        values: [0, 1, 2, 3, 4],
        probs: [0.4, 0.3, 0.15, 0.1, 0.05],
        editable: true,
        showMean: true,
        label: "X",
        caption:
          "The wedge sits at E[X] = 1.1, not under the tallest bar at 0. The long light tail on the right pulls the balance point toward it. Drag the bars and watch the wedge slide.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Expected does not mean most likely",
      content:
        "The expected value of a die roll is 3.5, and no roll ever shows 3.5. In the distribution above the most likely value is 0 but $E[X] = 1.1$. The mean is a long-run *average*. It need not be a possible value, and it need not be the value with the tallest bar.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 1 · Heads in three tosses",
      content:
        "Using the distribution from 4.2:\n\n$E[X] = 0 \\cdot \\frac{1}{8} + 1 \\cdot \\frac{3}{8} + 2 \\cdot \\frac{3}{8} + 3 \\cdot \\frac{1}{8} = \\frac{0 + 3 + 6 + 3}{8} = \\frac{12}{8} = 1.5$.\n\nThat is half of 3 tosses, as you would expect. The distribution is symmetric about 1.5, so the see-saw balances at its centre.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 2 · Sum of two dice by symmetry",
      content:
        "The distribution 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1 (out of 36) is symmetric about 7. A symmetric bar chart balances at its centre, so $E[X] = 7$ without any arithmetic.\n\nCheck: $\\frac{2\\cdot1 + 3\\cdot2 + 4\\cdot3 + 5\\cdot4 + 6\\cdot5 + 7\\cdot6 + 8\\cdot5 + 9\\cdot4 + 10\\cdot3 + 11\\cdot2 + 12\\cdot1}{36} = \\frac{252}{36} = 7$. ✓",
    },
    {
      type: "text",
      content:
        "**Fair games and expected profit.**\n\nA game is **fair** if your expected profit is 0. Neither side gains in the long run. A positive expected profit favours you and a negative one favours the house.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 3 · The ₹10 die stall",
      content:
        "From 4.1: pay ₹10, win ₹30 on a 6. Profit $X = 20$ with probability $\\frac{1}{6}$ and $X = -10$ with probability $\\frac{5}{6}$.\n\n**Step 1.** $E[X] = 20 \\cdot \\frac{1}{6} + (-10) \\cdot \\frac{5}{6} = \\frac{20 - 50}{6} = -5$.\n\n**Step 2: interpret.** On average you lose ₹5 per game. Over 600 games you expect to lose about ₹3000.\n\n**Step 3: the fair price.** Expected payout is $30 \\cdot \\frac{1}{6} = 5$, so ₹5. A ₹5 entry fee would make the game fair.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 4 · A charity lottery",
      content:
        "1000 tickets are sold at ₹100 each. Prizes: one of ₹50,000, five of ₹2,000 and twenty of ₹500.\n\n**Step 1: expected payout per ticket.** A ticket is equally likely to be any of the 1000, so the expected payout is the total prize money divided by 1000: $\\frac{50000 + 5 \\cdot 2000 + 20 \\cdot 500}{1000} = \\frac{70000}{1000} = 70$, so ₹70.\n\n**Step 2: expected profit.** $70 - 100 = -30$, a loss of ₹30 per ticket. The charity keeps ₹30,000 in total, which is the point of the lottery.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 5 · Pricing an insurance policy (word problem)",
      content:
        "An insurer sells one-year phone insurance for a premium of ₹3,000. Each year 2% of insured phones are written off, and the insurer then pays out ₹1,00,000. Otherwise it pays nothing. Find the insurer's expected profit per policy and the break-even premium.",
    },
    {
      type: "text",
      content:
        "**Step 1: the random variable.** Let $X$ be the insurer's profit on one policy. The premium comes in whether or not there is a claim.",
    },
    {
      type: "table",
      headers: ["Case", "Profit $x$ (₹)", "$p$"],
      rows: [
        ["No claim", "$3000$", "$0.98$"],
        ["Claim", "$3000 - 100000 = -97000$", "$0.02$"],
      ],
    },
    {
      type: "text",
      content:
        "*Why this step:* writing both cases as *profit* keeps the signs honest. The claim case is a large negative value, and it has to enter the average with its sign.\n\n**Step 2: the expectation.**",
    },
    { type: "math", latex: "E[X] = 3000(0.98) + (-97000)(0.02) = 2940 - 1940 = 1000" },
    {
      type: "text",
      content:
        "**Step 3: a faster route.** $X = 3000 - C$, where $C$ is the payout. Subtracting from a fixed ₹3,000 subtracts the average too, so $E[X] = 3000 - E[C] = 3000 - 0.02 \\times 100000 = 1000$. (This is the rule $E[aX + b] = aE[X] + b$, derived at the end of this lesson.)\n\n**Step 4: break-even.** The premium that gives expected profit 0 equals the expected payout, ₹2,000.\n\n*Why this matters:* on any single policy the insurer either gains ₹3,000 or loses ₹97,000. It never makes ₹1,000. Over 10,000 policies, though, it can count on roughly $10000 \\times 1000$, about ₹1 crore. The mean describes the whole portfolio, not one customer.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 6 · How many bulbs get tested? (exam style)",
      content:
        "In 4.2 (Worked example 4), 6 bulbs including 2 defective ones are tested until both duds are found, and $P(X = k) = \\frac{k - 1}{15}$ for $k = 2, \\ldots, 6$. Find $E[X]$.",
    },
    {
      type: "text",
      content: "**Step 1: weight each value by its probability.**",
    },
    {
      type: "math",
      latex:
        "E[X] = \\frac{2 \\cdot 1 + 3 \\cdot 2 + 4 \\cdot 3 + 5 \\cdot 4 + 6 \\cdot 5}{15} = \\frac{2 + 6 + 12 + 20 + 30}{15} = \\frac{70}{15} = \\frac{14}{3} \\approx 4.67",
    },
    {
      type: "text",
      content:
        "*Why this step:* pulling the common $\\frac{1}{15}$ out front keeps the arithmetic in whole numbers until the very end.\n\n**Step 2: a sanity check by symmetry.** The two duds cut the 4 good bulbs into three gaps: before the first dud, between the duds, and after the second. By symmetry each gap holds $\\frac{4}{3}$ good bulbs on average. Testing stops before the last gap, so $E[X] = 6 - \\frac{4}{3} = \\frac{14}{3}$. ✓\n\nTwo different methods agreeing is the strongest check you can make in an exam.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 7 · Expected throws until a six (JEE style)",
      content:
        "In 4.2 (Worked example 5), the number of throws needed to get a six has $P(X = k) = q^{k-1}p$ for $k = 1, 2, 3, \\ldots$, with $p = \\frac{1}{6}$ and $q = \\frac{5}{6}$. Find $E[X]$.",
    },
    {
      type: "text",
      content:
        "**Step 1: set up the sum.** $E[X] = \\sum_{k \\ge 1} k\\,q^{k-1} p = p\\,S$, where $S = 1 + 2q + 3q^2 + 4q^3 + \\cdots$.\n\n*Why this step:* $p$ is a factor of every term, so pull it out. What remains is an arithmetico-geometric series: the coefficients rise by 1 while the powers of $q$ rise by 1.\n\n**Step 2: shift and subtract.** Multiply $S$ by $q$ and subtract, lining up equal powers of $q$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} S &= 1 + 2q + 3q^2 + 4q^3 + \\cdots \\\\ qS &= \\quad\\;\\; q + 2q^2 + 3q^3 + \\cdots \\\\ (1 - q)S &= 1 + q + q^2 + q^3 + \\cdots = \\frac{1}{1 - q} \\end{aligned}",
    },
    {
      type: "text",
      content:
        "*Why this step:* subtracting cancels the rising coefficients and leaves a plain geometric series, which you know how to sum.\n\n**Step 3: finish.** $S = \\frac{1}{(1 - q)^2} = \\frac{1}{p^2}$, so",
    },
    { type: "math", latex: "E[X] = p \\cdot \\frac{1}{p^2} = \\frac{1}{p} = 6" },
    {
      type: "text",
      content:
        "The answer matches intuition: a six turns up once in every 6 throws on average, so on average you wait 6 throws for one. The same working gives $\\frac{1}{p}$ for any success probability $p$: 2 tosses for a head, 36 throws of two dice for a double six.",
    },
    {
      type: "text",
      content:
        "**Expectation of a function of $X$.**\n\nIf $Y = g(X)$, then $Y$ takes the value $g(x_i)$ whenever $X = x_i$. So you don't need a new table. You weight $g(x_i)$ by the same $p_i$:",
    },
    { type: "math", latex: "E[g(X)] = \\sum_i g(x_i)\\, p_i, \\qquad \\text{e.g.}\\quad E[X^2] = \\sum_i x_i^2\\, p_i" },
    {
      type: "text",
      content:
        "The most useful special case is a linear change, $g(x) = ax + b$. Split the sum:",
    },
    {
      type: "math",
      latex:
        "E[aX + b] = \\sum (a x_i + b) p_i = a \\sum x_i p_i + b \\sum p_i = a\\,E[X] + b",
    },
    {
      type: "text",
      content:
        "Changing units or shifting the scale does the same thing to the average. If your die winnings are doubled and you get a ₹1 bonus, you expect $2(3.5) + 1 = 8$ rupees per game. Be careful, though: $E[X^2]$ is **not** $(E[X])^2$ in general. For a die, $E[X^2] = \\frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \\frac{91}{6} \\approx 15.17$, while $3.5^2 = 12.25$. The gap between those two numbers is the subject of the next lesson.",
    },
    {
      type: "quiz",
      id: "pr4-3-q1",
      variant: "concept",
      question: "$X$ takes the values 0, 1, 2, 3, 4 with probabilities 0.4, 0.3, 0.15, 0.1, 0.05. Which statement is true?",
      options: [
        { text: "The most likely value is 0, but $E[X] = 1.1$.", correct: true, feedback: "$0.3 + 0.3 + 0.3 + 0.2 = 1.1$. The tail pulls the balance point to the right of the tallest bar." },
        { text: "$E[X] = 0$, because 0 is the most likely value.", feedback: "The expected value is a weighted average of *all* values, not the peak. The bars at 1 to 4 all pull it upwards." },
        { text: "$E[X] = 2$, the middle of the values 0 to 4.", feedback: "That would be the balance point only if the bars were symmetric. Most of the weight here is on the left." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-3-q2",
      variant: "practice",
      question: "$X$ takes the values 1, 2, 3 with probabilities 0.2, 0.5, 0.3. Find $E[X]$.",
      options: [
        { text: "$2.1$", correct: true, feedback: "$0.2 + 1.0 + 0.9 = 2.1$." },
        { text: "$2$", feedback: "That is the plain average of 1, 2, 3. The values are not equally likely, so weight each one by its probability." },
        { text: "$4.9$", feedback: "That is $E[X^2] = 0.2 + 2 + 2.7$: you squared the values. $E[X]$ uses the values themselves." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-3-q3",
      variant: "practice",
      question: "Two dice are rolled. You win ₹36 on a double six and nothing otherwise. What entry fee makes the game fair?",
      options: [
        { text: "₹1", correct: true, feedback: "Expected payout $= 36 \\cdot \\frac{1}{36} = 1$. A fee equal to the expected payout gives expected profit 0." },
        { text: "₹6", feedback: "That would be fair if a double six had probability $\\frac{1}{6}$. It has probability $\\frac{1}{36}$." },
        { text: "₹36", feedback: "That is the prize itself. Paying it would give an expected profit of $1 - 36 = -35$." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-3-q4",
      variant: "practice",
      question: "$E[X] = 4$. Find $E[2X + 3]$.",
      options: [
        { text: "$11$", correct: true, feedback: "$E[aX + b] = aE[X] + b = 2 \\cdot 4 + 3$." },
        { text: "$8$", feedback: "Adding 3 to every value adds 3 to the average as well." },
        { text: "$7$", feedback: "The 2 multiplies every value, so it multiplies the average too: $2 \\cdot 4$, then add 3." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-3-q5",
      variant: "practice",
      question: "$X$ takes the values 0, 1, 2 with probabilities $a$, $b$, $0.3$, and $E[X] = 1$. Find $a$ and $b$.",
      options: [
        { text: "$a = 0.3,\\ b = 0.4$", correct: true, feedback: "Mean: $b + 0.6 = 1$ gives $b = 0.4$. Sum: $a + 0.4 + 0.3 = 1$ gives $a = 0.3$." },
        { text: "$a = 0.4,\\ b = 0.3$", feedback: "Then $E[X] = 0.3 + 0.6 = 0.9$. Check the mean equation again: it involves $b$, not $a$." },
        { text: "$a = 0.35,\\ b = 0.35$", feedback: "That uses only the sum-to-1 condition. The mean gives a second equation that fixes both." },
      ],
      hint: "You have two equations: $\\sum p = 1$ and $\\sum x p = 1$.",
    },
    {
      type: "quiz",
      id: "pr4-3-q6",
      variant: "practice",
      question: "Two dice are rolled and $M$ is the larger of the two numbers (Worked example 2 in 4.1: $P(M = k) = \\frac{2k - 1}{36}$). Find $E[M]$.",
      options: [
        { text: "$\\frac{161}{36} \\approx 4.47$", correct: true, feedback: "$\\frac{1 \\cdot 1 + 2 \\cdot 3 + 3 \\cdot 5 + 4 \\cdot 7 + 5 \\cdot 9 + 6 \\cdot 11}{36} = \\frac{161}{36}$. The chart leans right, so the balance point sits above 3.5." },
        { text: "$3.5$", feedback: "That is the mean of one die. Taking the larger of two pulls the value upward: $M = 1$ needs both dice to show 1." },
        { text: "$6$", feedback: "6 is the most likely value of $M$ (11 out of 36), but the mean averages all values, weighted by probability." },
        { text: "$\\frac{91}{36} \\approx 2.53$", feedback: "That weights each $k$ by $\\frac{k}{36}$, which does not add to 1. The number of outcomes with $M = k$ is $2k - 1$." },
      ],
      hint: "Multiply each value $k$ by its count $2k - 1$, add, then divide by 36.",
    },
    {
      type: "quiz",
      id: "pr4-3-q7",
      variant: "practice",
      question: "An insurer charges a premium of ₹1,500. With probability 0.005 it must pay out ₹2,00,000, and otherwise it pays nothing. What is its expected profit per policy?",
      options: [
        { text: "₹500", correct: true, feedback: "Expected payout $= 0.005 \\times 200000 = 1000$, so expected profit $= 1500 - 1000 = 500$." },
        { text: "₹1,500", feedback: "That is the profit when there is no claim. The rare claim still has to be averaged in." },
        { text: "−₹1,98,500", feedback: "That is the profit in the claim case alone. Weight it by its probability, 0.005, and add the no-claim case." },
        { text: "₹1,000", feedback: "₹1,000 is the expected *payout*. Profit is the premium minus the payout." },
      ],
      hint: "Expected profit = premium − expected payout.",
    },
    {
      type: "quiz",
      id: "pr4-3-q8",
      variant: "practice",
      question: "A box of 5 bulbs contains 2 defective ones. Bulbs are tested in random order until both defective ones are found, so $P(X = k) = \\frac{k - 1}{10}$ for $k = 2, 3, 4, 5$. Find $E[X]$.",
      options: [
        { text: "$4$", correct: true, feedback: "$\\frac{2 \\cdot 1 + 3 \\cdot 2 + 4 \\cdot 3 + 5 \\cdot 4}{10} = \\frac{40}{10} = 4$. Check by gaps: 3 good bulbs in 3 gaps is 1 per gap on average, so $5 - 1 = 4$." },
        { text: "$3.5$", feedback: "That is the plain average of 2, 3, 4, 5. The larger values are more likely, so the mean is pulled up." },
        { text: "$5$", feedback: "5 is the most likely value (probability $\\frac{4}{10}$), not the mean." },
        { text: "$\\frac{14}{3}$", feedback: "That is the answer for a box of 6 bulbs. Redo the sum with denominator 10." },
      ],
      hint: "Multiply each $k$ by $k - 1$, add, and divide by 10.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "variance-and-standard-deviation",
  title: "4.4 · Variance and Standard Deviation",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two bus routes both take 30 minutes on average. One is always within a minute of that. The other sometimes takes 20 minutes and sometimes 40. The mean is the same, but you would plan your morning very differently.\n\nThe mean tells you where a distribution balances. It says nothing about how far the values stray from that point. That second number is **spread**.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-distribution-explorer",
        mode: "custom",
        values: [1, 2, 3, 4, 5],
        probs: [0.2, 0.2, 0.2, 0.2, 0.2],
        label: "X",
        compare: { values: [1, 2, 3, 4, 5], probs: [0.05, 0.15, 0.6, 0.15, 0.05], label: "Y" },
        showMean: true,
        showSd: true,
        caption:
          "X and Y both balance at 3. X spreads its weight evenly while Y piles it in the middle. The ±σ bands show the difference: Var(X) = 2 and Var(Y) = 0.7.",
      },
    },
    {
      type: "text",
      content:
        "**Building a measure of spread.**\n\n**First try: the average deviation.** Measure each value's distance from the mean, $X - \\mu$, and average it. That fails every time:\n\n$E[X - \\mu] = E[X] - \\mu = 0$.\n\nPositive and negative deviations always cancel. That is exactly what \"balance point\" means.\n\n**Fix: square the deviations** so they can't cancel. Squares are never negative, they punish large deviations more than small ones, and they lead to clean algebra.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Variance and standard deviation",
      content:
        "With $\\mu = E[X]$:\n\n$\\operatorname{Var}(X) = \\sigma^2 = E\\big[(X - \\mu)^2\\big] = \\displaystyle\\sum_i (x_i - \\mu)^2 p_i$.\n\nThe **standard deviation** is $\\sigma = \\sqrt{\\operatorname{Var}(X)}$. Squaring changed the units (rupees become rupees²), and taking the square root brings them back. So $\\sigma$ is measured in the same units as $X$.",
    },
    {
      type: "text",
      content:
        "For the two distributions above, with $\\mu = 3$:\n\n$\\operatorname{Var}(X) = 0.2\\,(4 + 1 + 0 + 1 + 4) = 2$, so $\\sigma_X = \\sqrt{2} \\approx 1.41$.\n\n$\\operatorname{Var}(Y) = 0.05 \\cdot 4 + 0.15 \\cdot 1 + 0.6 \\cdot 0 + 0.15 \\cdot 1 + 0.05 \\cdot 4 = 0.7$, so $\\sigma_Y \\approx 0.84$.",
    },
    {
      type: "text",
      content:
        "**The shortcut formula, derived.**\n\nThe definition needs $x_i - \\mu$ for every value, and that gets messy when $\\mu$ is a fraction. Expand the square and use $E[aX + b] = aE[X] + b$ from 4.3. Here $\\mu$ is a constant:",
    },
    {
      type: "math",
      latex:
        "E\\big[(X - \\mu)^2\\big] = E\\big[X^2 - 2\\mu X + \\mu^2\\big] = E[X^2] - 2\\mu\\,E[X] + \\mu^2 = E[X^2] - 2\\mu^2 + \\mu^2",
    },
    { type: "math", latex: "\\boxed{\\operatorname{Var}(X) = E[X^2] - \\big(E[X]\\big)^2}" },
    {
      type: "text",
      content:
        "In words: **the mean of the squares minus the square of the mean.** A variance can never be negative, so this also shows $E[X^2] \\ge (E[X])^2$ for every random variable. Equality holds only when $X$ never strays from $\\mu$, that is, when $X$ is a constant.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 1 · A fair die",
      content:
        "**Step 1.** $\\mu = 3.5 = \\frac{7}{2}$.\n\n**Step 2.** $E[X^2] = \\frac{1 + 4 + 9 + 16 + 25 + 36}{6} = \\frac{91}{6}$.\n\n**Step 3.** $\\operatorname{Var}(X) = \\frac{91}{6} - \\frac{49}{4} = \\frac{182 - 147}{12} = \\frac{35}{12} \\approx 2.92$.\n\n**Step 4.** $\\sigma = \\sqrt{35/12} \\approx 1.71$. A typical roll lands about 1.7 away from 3.5.",
    },
    {
      type: "text",
      content: "When the numbers get heavier, lay the calculation out as a table with one column each for $p$, $xp$ and $x^2p$:",
    },
    {
      type: "table",
      headers: ["$x$", "$p$", "$x\\,p$", "$x^2\\,p$"],
      rows: [
        ["0", "$\\frac{1}{8}$", "0", "0"],
        ["1", "$\\frac{3}{8}$", "$\\frac{3}{8}$", "$\\frac{3}{8}$"],
        ["2", "$\\frac{3}{8}$", "$\\frac{6}{8}$", "$\\frac{12}{8}$"],
        ["3", "$\\frac{1}{8}$", "$\\frac{3}{8}$", "$\\frac{9}{8}$"],
        ["Total", "1", "$\\frac{12}{8} = 1.5$", "$\\frac{24}{8} = 3$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 2 · Heads in three tosses",
      content:
        "From the table: $\\mu = 1.5$ and $E[X^2] = 3$. So $\\operatorname{Var}(X) = 3 - 1.5^2 = 3 - 2.25 = 0.75$, and $\\sigma = \\sqrt{0.75} \\approx 0.87$.\n\nThe column totals are all you need. Check the $p$ column adds up to 1 before going further.",
    },
    {
      type: "text",
      content:
        "**What happens to spread under $aX + b$.**\n\nLet $Y = aX + b$. From 4.3, $\\mu_Y = a\\mu + b$. Look at a deviation:",
    },
    {
      type: "math",
      latex:
        "Y - \\mu_Y = (aX + b) - (a\\mu + b) = a(X - \\mu)",
    },
    {
      type: "text",
      content:
        "The $b$ cancels. Shifting every value by the same amount moves the mean by that amount too, so no distance changes. The $a$ survives and gets squared:",
    },
    {
      type: "math",
      latex:
        "\\operatorname{Var}(aX + b) = E\\big[a^2 (X - \\mu)^2\\big] = a^2 \\operatorname{Var}(X), \\qquad \\sigma_{aX+b} = |a|\\,\\sigma_X",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Not aVar(X) + b",
      content:
        "A tempting wrong answer is $\\operatorname{Var}(aX + b) = a\\operatorname{Var}(X) + b$, which copies the rule for the mean. But **adding $b$ slides the whole bar chart sideways without changing its width**, so $b$ contributes nothing to spread. And variance is measured in squared units, so scaling by $a$ scales the variance by $a^2$. A negative $a$ flips the chart over, which doesn't change its width either: $\\operatorname{Var}(-X) = \\operatorname{Var}(X)$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 3 · Celsius to Fahrenheit",
      content:
        "A city's noon temperature $C$ has mean 30 °C and standard deviation 5 °C. In Fahrenheit, $F = 1.8C + 32$.\n\n**Mean:** $1.8 \\cdot 30 + 32 = 86$ °F.\n\n**SD:** $|1.8| \\cdot 5 = 9$ °F. The $+32$ does nothing to it.\n\n**Variance:** $1.8^2 \\cdot 25 = 81$ (°F)², which is $9^2$. ✓",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 4 · A negative scale",
      content:
        "$\\operatorname{Var}(X) = 4$. Find $\\operatorname{Var}(3 - 2X)$.\n\nHere $a = -2$ and $b = 3$. $\\operatorname{Var} = (-2)^2 \\cdot 4 = 16$, and $\\sigma = 4$. The sign of $a$ and the constant 3 play no part.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 5 · Red balls, all the way to σ",
      content:
        "Back to the bag from 4.1: 3 red and 2 blue balls, two drawn together, $X$ = number of red balls. We found $P(X = 0) = \\frac{1}{10}$, $P(X = 1) = \\frac{6}{10}$, $P(X = 2) = \\frac{3}{10}$.\n\n**Step 1: the mean.** $E[X] = 0 \\cdot \\frac{1}{10} + 1 \\cdot \\frac{6}{10} + 2 \\cdot \\frac{3}{10} = 0.6 + 0.6 = 1.2$.\n\n**Step 2: the mean of the squares.** $E[X^2] = 0 + 1 \\cdot \\frac{6}{10} + 4 \\cdot \\frac{3}{10} = 0.6 + 1.2 = 1.8$.\n\n**Step 3: the shortcut.** $\\operatorname{Var}(X) = 1.8 - 1.2^2 = 1.8 - 1.44 = 0.36$.\n\n**Step 4: the SD.** $\\sigma = \\sqrt{0.36} = 0.6$.\n\nThis is the shape of the standard board question: build the table from the experiment, then mean, variance, SD.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 6 · Same average, different risk (word problem)",
      content:
        "Two business plans have these one-year returns, in ₹ lakh.\n\n**Plan A:** 2 or 6, each with probability 0.5.\n\n**Plan B:** $-2$ with probability 0.25, 4 with probability 0.5, 10 with probability 0.25.\n\nCompare the two plans.",
    },
    { type: "text", content: "**Step 1: the means.**" },
    {
      type: "math",
      latex: "E[A] = 0.5(2) + 0.5(6) = 4, \\qquad E[B] = 0.25(-2) + 0.5(4) + 0.25(10) = -0.5 + 2 + 2.5 = 4",
    },
    {
      type: "text",
      content:
        "*Why this step:* always compare centres first. If the means differed, that alone might settle the choice. Here they tie, so spread decides.\n\n**Step 2: the means of the squares.**",
    },
    {
      type: "math",
      latex: "E[A^2] = 0.5(4) + 0.5(36) = 20, \\qquad E[B^2] = 0.25(4) + 0.5(16) + 0.25(100) = 1 + 8 + 25 = 34",
    },
    {
      type: "text",
      content:
        "*Why this step:* the square of $-2$ is $+4$. A loss adds to the spread just as much as a gain of the same size.\n\n**Step 3: variance and SD.**",
    },
    {
      type: "math",
      latex:
        "\\operatorname{Var}(A) = 20 - 4^2 = 4,\\ \\ \\sigma_A = 2; \\qquad \\operatorname{Var}(B) = 34 - 4^2 = 18,\\ \\ \\sigma_B = \\sqrt{18} \\approx 4.24",
    },
    {
      type: "text",
      content:
        "**Step 4: interpret.** Both plans return ₹4 lakh on average, but B's typical distance from that average is more than twice A's, and B can lose money. A cautious owner picks A. This is how banks and fund managers use $\\sigma$: as a number for **risk**.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 7 · The larger of two numbers (board exam style)",
      content:
        "Two numbers are chosen at random, without replacement, from $1, 2, 3, 4, 5, 6$. Let $X$ be the larger of the two. Find the mean and the variance of $X$.",
    },
    {
      type: "text",
      content:
        "**Step 1: the distribution.** There are $\\binom{6}{2} = 15$ equally likely pairs. For $X = k$ the larger number is $k$ and the smaller is any of $1, \\ldots, k - 1$, so $P(X = k) = \\frac{k - 1}{15}$ for $k = 2, \\ldots, 6$.\n\n*Why this step:* this is exactly the count from the bulb-testing problem in 4.2. Recognising a structure you have already solved is the biggest time-saver in an exam.\n\n**Step 2: the table.** Keep the common denominator 15 outside, so every entry is a whole number.",
    },
    {
      type: "table",
      headers: ["$x$", "2", "3", "4", "5", "6", "Total"],
      rows: [
        ["$15\\,p$", "1", "2", "3", "4", "5", "15"],
        ["$15\\,x\\,p$", "2", "6", "12", "20", "30", "70"],
        ["$15\\,x^2\\,p$", "4", "18", "48", "100", "180", "350"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 3: mean and mean of squares.** $E[X] = \\frac{70}{15} = \\frac{14}{3}$ and $E[X^2] = \\frac{350}{15} = \\frac{70}{3}$.\n\n**Step 4: variance.**",
    },
    {
      type: "math",
      latex:
        "\\operatorname{Var}(X) = \\frac{70}{3} - \\left(\\frac{14}{3}\\right)^2 = \\frac{210}{9} - \\frac{196}{9} = \\frac{14}{9}, \\qquad \\sigma = \\frac{\\sqrt{14}}{3} \\approx 1.25",
    },
    {
      type: "text",
      content:
        "*Why this step:* put both terms over 9 before subtracting. Converting $\\frac{70}{3}$ and $\\frac{196}{9}$ to decimals first invites rounding errors, and board answers expect the exact fraction.",
    },
    {
      type: "quiz",
      id: "pr4-4-q1",
      variant: "concept",
      question: "$\\operatorname{Var}(X) = 5$. What is $\\operatorname{Var}(3X + 7)$?",
      options: [
        { text: "$45$", correct: true, feedback: "$3^2 \\cdot 5 = 45$. The $+7$ shifts the chart without widening it." },
        { text: "$22$", feedback: "That is $3 \\cdot 5 + 7$, which copies the rule for the mean. Shifting adds no spread, and scaling squares." },
        { text: "$15$", feedback: "You dropped the $+7$ correctly, but deviations get multiplied by 3 and then squared, giving a factor of 9." },
        { text: "$52$", feedback: "The factor $3^2 = 9$ is right, but the constant 7 contributes nothing to variance." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-4-q2",
      variant: "practice",
      question: "$X$ takes the values 0, 1, 2 with probabilities 0.25, 0.5, 0.25. Find $\\operatorname{Var}(X)$.",
      options: [
        { text: "$0.5$", correct: true, feedback: "$\\mu = 1$, $E[X^2] = 0.5 + 1 = 1.5$, so $\\operatorname{Var} = 1.5 - 1 = 0.5$." },
        { text: "$1.5$", feedback: "That is $E[X^2]$. Subtract $\\mu^2 = 1$." },
        { text: "$0$", feedback: "That is $E[X - \\mu]$, which is always 0. Variance averages the *squared* deviations." },
      ],
      hint: "Find $E[X]$ and $E[X^2]$ first.",
    },
    {
      type: "quiz",
      id: "pr4-4-q3",
      variant: "concept",
      question: "A student reports $E[X] = 2$ and $E[X^2] = 3$ for some random variable. What can you conclude?",
      options: [
        { text: "There is a mistake: it would give $\\operatorname{Var}(X) = -1$, which is impossible.", correct: true, feedback: "Variance is an average of squares, so it can't be negative. That forces $E[X^2] \\ge (E[X])^2 = 4$." },
        { text: "$\\operatorname{Var}(X) = 1$", feedback: "That is $E[X^2] - E[X]$. The shortcut subtracts the *square* of the mean: $3 - 4$." },
        { text: "$\\operatorname{Var}(X) = -1$, so $X$ has very little spread.", feedback: "Zero is the smallest possible variance and it means no spread at all. A negative variance signals an error." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-4-q4",
      variant: "practice",
      question: "$X$ has standard deviation 3. What is the standard deviation of $5 - 2X$?",
      options: [
        { text: "$6$", correct: true, feedback: "$\\sigma_{aX+b} = |a|\\sigma = 2 \\cdot 3$." },
        { text: "$-6$", feedback: "A standard deviation is a distance, so it is never negative. Use $|a|$." },
        { text: "$36$", feedback: "That is the variance, $(-2)^2 \\cdot 9$. Take its square root for the SD." },
        { text: "$3$", feedback: "Shifts don't change spread, but scaling does: the SD is multiplied by $|-2| = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-4-q5",
      variant: "practice",
      question: "Two distributions have the same mean. Distribution A has $\\sigma = 0.8$ and distribution B has $\\sigma = 2.5$. Which is true?",
      options: [
        { text: "Values of B typically land farther from the mean than values of A.", correct: true, feedback: "The standard deviation measures typical distance from the mean." },
        { text: "B has a larger expected value.", feedback: "The means are equal. Spread and centre are separate summaries." },
        { text: "B's values are all larger than A's values.", feedback: "Larger spread means values are further from the mean in *both* directions, not larger overall." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-4-q6",
      variant: "practice",
      question: "Two cards are drawn **with replacement** from a well-shuffled deck of 52. $X$ is the number of aces drawn. Find $\\operatorname{Var}(X)$.",
      options: [
        { text: "$\\frac{24}{169}$", correct: true, feedback: "$P(X=0) = \\frac{144}{169}$, $P(X=1) = 2 \\cdot \\frac{1}{13} \\cdot \\frac{12}{13} = \\frac{24}{169}$, $P(X=2) = \\frac{1}{169}$. So $E[X] = \\frac{26}{169} = \\frac{2}{13}$, $E[X^2] = \\frac{24 + 4}{169} = \\frac{28}{169}$, and $\\operatorname{Var} = \\frac{28}{169} - \\frac{4}{169} = \\frac{24}{169}$." },
        { text: "$\\frac{2}{13}$", feedback: "That is $E[X]$, the mean. Variance needs $E[X^2] - \\mu^2$." },
        { text: "$\\frac{12}{169}$", feedback: "You took $P(X = 1) = \\frac{1}{13} \\cdot \\frac{12}{13}$. One ace can come on the first draw or the second, so multiply by 2." },
        { text: "$\\frac{28}{169}$", feedback: "That is $E[X^2]$. Finish with the shortcut: subtract $\\mu^2 = \\frac{4}{169}$." },
      ],
      hint: "Each draw is an ace with probability $\\frac{1}{13}$. Build the table for $X = 0, 1, 2$ first.",
    },
    {
      type: "quiz",
      id: "pr4-4-q7",
      variant: "practice",
      question: "$E[X] = 2$ and $\\operatorname{Var}(X) = 3$. Find $E[X^2]$ and $E[(X + 1)^2]$.",
      options: [
        { text: "$7$ and $12$", correct: true, feedback: "$E[X^2] = \\operatorname{Var}(X) + \\mu^2 = 3 + 4 = 7$. Then $E[(X+1)^2] = E[X^2] + 2E[X] + 1 = 7 + 4 + 1 = 12$." },
        { text: "$-1$ and $4$", feedback: "You used $\\operatorname{Var} - \\mu^2$. Rearrange the shortcut: $E[X^2] = \\operatorname{Var}(X) + \\mu^2$." },
        { text: "$7$ and $9$", feedback: "$9 = (E[X] + 1)^2$. Expectation doesn't pass through a square. Expand $(X+1)^2 = X^2 + 2X + 1$ first, then use linearity." },
        { text: "$5$ and $10$", feedback: "$5 = 3 + 2$ adds $\\mu$, not $\\mu^2$. The shortcut is $\\operatorname{Var} = E[X^2] - \\mu^2$." },
      ],
      hint: "Rearrange $\\operatorname{Var}(X) = E[X^2] - \\mu^2$, then expand $(X+1)^2$.",
    },
    {
      type: "quiz",
      id: "pr4-4-q8",
      variant: "practice",
      question: "Two numbers are chosen at random, without replacement, from 1, 2, 3, 4, and $X$ is the larger of the two. Find $\\operatorname{Var}(X)$.",
      options: [
        { text: "$\\frac{5}{9}$", correct: true, feedback: "$P(X = 2, 3, 4) = \\frac{1}{6}, \\frac{2}{6}, \\frac{3}{6}$. $E[X] = \\frac{20}{6} = \\frac{10}{3}$ and $E[X^2] = \\frac{70}{6} = \\frac{35}{3}$, so $\\operatorname{Var} = \\frac{105 - 100}{9} = \\frac{5}{9}$." },
        { text: "$\\frac{2}{3}$", feedback: "That treats 2, 3 and 4 as equally likely. The larger number is 4 in three of the six pairs." },
        { text: "$\\frac{35}{3}$", feedback: "That is $E[X^2]$. Subtract $\\left(\\frac{10}{3}\\right)^2$." },
        { text: "$\\frac{10}{3}$", feedback: "That is the mean, $E[X]$." },
      ],
      hint: "There are $\\binom{4}{2} = 6$ pairs, and $P(X = k) = \\frac{k - 1}{6}$.",
    },
    {
      type: "quiz",
      id: "pr4-4-q9",
      variant: "practice",
      question: "A business plan returns $-1$, 3 or 7 (₹ lakh) with probabilities 0.2, 0.6, 0.2. Its mean is 3. Find its standard deviation.",
      options: [
        { text: "$\\sqrt{6.4} \\approx 2.53$", correct: true, feedback: "$E[X^2] = 0.2 + 5.4 + 9.8 = 15.4$, so $\\operatorname{Var} = 15.4 - 9 = 6.4$ and $\\sigma \\approx 2.53$ lakh." },
        { text: "$6.4$", feedback: "That is the variance, in (₹ lakh)². Take the square root to get back to ₹ lakh." },
        { text: "$\\sqrt{15.4} \\approx 3.92$", feedback: "That is $\\sqrt{E[X^2]}$. Subtract $\\mu^2 = 9$ before taking the square root." },
        { text: "$\\sqrt{6} \\approx 2.45$", feedback: "That comes from taking $(-1)^2 \\cdot 0.2$ as $-0.2$. A square is never negative." },
      ],
      hint: "Find $E[X^2]$, subtract $3^2$, then take the square root.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "linearity-and-indicators",
  title: "4.5 · Linearity and Indicator Variables",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Toss a coin 100 times. What is the expected number of heads? You could write down the distribution of $X$, with 101 values and probabilities like $\\binom{100}{37}/2^{100}$, and then compute $\\sum x p$. Nobody wants to do that.\n\nYour instinct probably says 50, because each toss contributes half a head on average. This lesson shows that the instinct is exactly right, and that the same idea works in far harder problems.",
    },
    {
      type: "text",
      content:
        "**Expectation over outcomes.**\n\nFirst, one more way to compute $E[X]$. Instead of grouping outcomes by value, go outcome by outcome and weight each outcome's value by its probability:",
    },
    { type: "math", latex: "E[X] = \\sum_{\\omega \\in S} X(\\omega)\\, P(\\omega)" },
    {
      type: "text",
      content:
        "This is the same number as $\\sum x_i p_i$. Grouping the outcomes that share the value $x_i$ turns their total weight into $p_i$. With that form the key fact takes one line. Let $X$ and $Y$ be any two random variables on the same sample space:",
    },
    {
      type: "math",
      latex:
        "E[X + Y] = \\sum_{\\omega} \\big(X(\\omega) + Y(\\omega)\\big) P(\\omega) = \\sum_{\\omega} X(\\omega) P(\\omega) + \\sum_{\\omega} Y(\\omega) P(\\omega) = E[X] + E[Y]",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Linearity of expectation",
      content:
        "For **any** random variables $X_1, \\ldots, X_n$ and constants $a_1, \\ldots, a_n$:\n\n$E[a_1 X_1 + \\cdots + a_n X_n] = a_1 E[X_1] + \\cdots + a_n E[X_n]$.\n\nThe derivation only split a sum. It never asked whether $X$ and $Y$ are related, so **no independence is needed**.",
    },
    {
      type: "text",
      content:
        "A check with dependent variables: in three tosses let $X$ = heads and $Y$ = tails. They are as dependent as two variables can be, since $Y = 3 - X$. Still $E[X] + E[Y] = 1.5 + 1.5 = 3 = E[X + Y]$, because $X + Y$ is always 3.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "two-dice",
        track: "value-mean",
        seed: 7,
        caption:
          "The running mean of the sum of two dice settles at 7. That is 3.5 + 3.5: the expectation of a sum is the sum of the expectations.",
      },
    },
    {
      type: "text",
      content:
        "**Indicator variables: counting by adding.**\n\nMost \"how many\" questions ask you to count how many of several events happen. The trick is to give each event its own 0/1 switch.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Indicator variable",
      content:
        "For an event $A$, the **indicator** $I_A$ is 1 if $A$ occurs and 0 if it doesn't. Its expectation is\n\n$E[I_A] = 1 \\cdot P(A) + 0 \\cdot P(A') = P(A)$.\n\nIf $X$ counts how many of the events $A_1, \\ldots, A_n$ occur, then $X = I_{A_1} + \\cdots + I_{A_n}$. By linearity,\n\n$E[X] = P(A_1) + P(A_2) + \\cdots + P(A_n)$.",
    },
    {
      type: "text",
      content:
        "The recipe has three steps. **(1)** Write the count as a sum of indicators. **(2)** Find the probability of each single event, which is usually easy. **(3)** Add them up. You never need the distribution of $X$ itself.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 1 · Heads, done properly",
      content:
        "Toss a coin with $P(H) = p$ a total of $n$ times. Let $I_k = 1$ if toss $k$ is heads. Then $X = I_1 + \\cdots + I_n$ and $E[I_k] = p$, so\n\n$E[X] = np$.\n\nFor 100 fair tosses, that gives 50. For 12 rolls of a die, counting sixes, it gives $12 \\cdot \\frac{1}{6} = 2$. This is the binomial mean you will meet again in Chapter 5, obtained here without writing the distribution.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 2 · Letters in the wrong envelopes",
      content:
        "A secretary puts $n$ letters into $n$ addressed envelopes completely at random. What is the expected number of letters that land in their own envelope?\n\n**Step 1.** Let $I_k = 1$ if letter $k$ is in envelope $k$. The number of matches is $X = I_1 + \\cdots + I_n$.\n\n**Step 2.** Letter $k$ is equally likely to go into any of the $n$ envelopes, so $P(I_k = 1) = \\frac{1}{n}$.\n\n**Step 3.** $E[X] = n \\cdot \\frac{1}{n} = 1$.\n\nThat holds for **every** $n$: 3 letters or a million, you expect exactly one match on average. The indicators are dependent (if letters 1 to $n-1$ all match, letter $n$ must match too), but linearity doesn't care.",
    },
    {
      type: "text",
      content: "For $n = 3$ you can check by brute force. There are $3! = 6$ equally likely ways to put the letters in:",
    },
    {
      type: "table",
      headers: ["Envelopes get letters", "123", "132", "213", "321", "231", "312"],
      rows: [["Matches $X$", "3", "1", "1", "1", "0", "0"]],
    },
    {
      type: "text",
      content:
        "$E[X] = \\frac{3 + 1 + 1 + 1 + 0 + 0}{6} = 1$. ✓ Notice that $X = 2$ is impossible (two matches force the third), and the most likely value is 1. Linearity got the mean without either of those facts.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 3 · Shared birthdays",
      content:
        "In a class of $n$ people (365 equally likely birthdays, ignoring leap years), what is the expected number of **pairs** of people who share a birthday?\n\n**Step 1.** One indicator per pair: there are $\\binom{n}{2}$ pairs.\n\n**Step 2.** Any given pair shares a birthday with probability $\\frac{1}{365}$: whatever the first person's birthday is, the second must match it.\n\n**Step 3.** $E[\\text{pairs}] = \\binom{n}{2} \\cdot \\frac{1}{365}$.\n\nFor $n = 23$: $\\frac{253}{365} \\approx 0.69$. For $n = 28$: $\\frac{378}{365} \\approx 1.04$. So with about 28 people you should expect one shared-birthday pair. The count of pairs grows like $n^2$, which is why coincidences arrive much sooner than intuition suggests.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 4 · Faces that never show up",
      content:
        "Roll a die 6 times. What is the expected number of faces that **never** appear?\n\n**Step 1.** Let $I_k = 1$ if face $k$ is missing from all 6 rolls.\n\n**Step 2.** $P(\\text{face } k \\text{ missing}) = \\left(\\frac{5}{6}\\right)^6 \\approx 0.335$.\n\n**Step 3.** $E[\\text{missing faces}] = 6\\left(\\frac{5}{6}\\right)^6 \\approx 2.01$.\n\nSo six rolls typically show only about 4 different faces. Finding the full distribution of the number of missing faces would take a page of inclusion–exclusion. Linearity takes three lines.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 5 · How often does the lift stop? (word problem)",
      content:
        "Ten people get into a lift on the ground floor of a building with 5 floors above. Each person gets off at one of the 5 floors, chosen at random and independently of the others. What is the expected number of floors at which the lift stops?",
    },
    {
      type: "text",
      content:
        "**Step 1: one switch per floor.** Let $I_f = 1$ if at least one person gets off at floor $f$. The number of stops is $X = I_1 + I_2 + \\cdots + I_5$.\n\n*Why this step:* the lift stops at a floor, not for a person. Indicators on floors count stops directly, while indicators on people would just count passengers.\n\n**Step 2: one floor at a time.** It is easier to find when floor $f$ is **skipped**: all 10 people choose one of the other 4 floors.",
    },
    {
      type: "math",
      latex: "P(I_f = 1) = 1 - \\left(\\tfrac{4}{5}\\right)^{10} \\approx 1 - 0.107 = 0.893",
    },
    {
      type: "text",
      content:
        "*Why this step:* \"at least one\" is almost always easiest through its complement, \"none\".\n\n**Step 3: add.** $E[X] = 5\\left(1 - \\left(\\frac{4}{5}\\right)^{10}\\right) \\approx 4.46$.\n\nSo with ten passengers the lift usually stops at 4 or 5 floors. The indicators are dependent (if the lift skips four floors, it must stop at the fifth), and linearity ignores that. It is the same method as the faces that never show up, moved into a building.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 6 · Boys and girls side by side (exam style)",
      content:
        "5 boys and 5 girls stand in a row in random order. Find the expected number of neighbouring pairs made up of one boy and one girl.",
    },
    {
      type: "text",
      content:
        "**Step 1: indicators on neighbouring spots.** A row of 10 has 9 neighbouring pairs of spots, $(1,2), (2,3), \\ldots, (9,10)$. Let $I_j = 1$ if spots $j$ and $j + 1$ hold one boy and one girl.\n\n**Step 2: the probability for one pair.** Spot $j$ holds a boy with probability $\\frac{5}{10}$. Given that, spot $j + 1$ holds a girl with probability $\\frac{5}{9}$, since 9 people remain and 5 of them are girls. The girl-then-boy order gives the same amount again.",
    },
    { type: "math", latex: "P(I_j = 1) = 2 \\cdot \\frac{5}{10} \\cdot \\frac{5}{9} = \\frac{5}{9}" },
    {
      type: "text",
      content:
        "*Why this step:* inside a single indicator you may use conditional probability freely. Linearity only frees you from worrying about how *different* indicators depend on each other.\n\n**Step 3: add.** $E[X] = 9 \\cdot \\frac{5}{9} = 5$.\n\nA common slip is to take $P(I_j = 1) = \\frac{1}{2}$, as if each spot were a fair coin toss, which gives 4.5. Once a boy is placed, only 4 boys are left among the 9 remaining people, so his neighbour is slightly more likely to be a girl.",
    },
    {
      type: "text",
      content:
        "**Where independence does matter: variance.**\n\nFor variance there is no free lunch. Expand $\\operatorname{Var}(X + Y)$ with the shortcut formula and a cross term appears:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} \\operatorname{Var}(X + Y) &= E[(X+Y)^2] - (E[X] + E[Y])^2 \\\\ &= \\big(E[X^2] + 2E[XY] + E[Y^2]\\big) - \\big(E[X]^2 + 2E[X]E[Y] + E[Y]^2\\big) \\\\ &= \\big(E[X^2] - E[X]^2\\big) + \\big(E[Y^2] - E[Y]^2\\big) + 2\\big(E[XY] - E[X]E[Y]\\big) \\end{aligned}",
    },
    {
      type: "math",
      latex:
        "\\operatorname{Var}(X + Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y) + 2\\big(E[XY] - E[X]E[Y]\\big)",
    },
    {
      type: "text",
      content:
        "Why does independence kill the cross term? For independent $X$ and $Y$, $P(X = x, Y = y) = P(X = x)P(Y = y)$, so $E[XY] = \\sum_x \\sum_y xy\\, p_x p_y = \\left(\\sum_x x p_x\\right)\\left(\\sum_y y p_y\\right) = E[X]E[Y]$.\n\nWhen $X$ and $Y$ are independent, then, the cross term vanishes, so the variances add. Otherwise they need not add. Heads and tails again: $\\operatorname{Var}(X) = \\operatorname{Var}(Y) = 0.75$, but $X + Y = 3$ is a constant with variance 0, not 1.5. For independent coin tosses, each indicator has variance $E[I^2] - p^2 = p - p^2 = pq$. So $n$ tosses give $\\operatorname{Var}(X) = npq$, which for 3 fair tosses is $0.75$, matching 4.4.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Worked example 7 · The spread of the sum of two dice",
      content:
        "Find the variance of the sum $S = X_1 + X_2$ of two fair dice, first with the independence rule, then directly from the distribution.",
    },
    {
      type: "text",
      content:
        "**Step 1: one die.** From 4.4 (Worked example 1), a single die has $\\operatorname{Var} = \\frac{35}{12}$.\n\n**Step 2: add, because the dice are independent.** $\\operatorname{Var}(X_1 + X_2) = \\frac{35}{12} + \\frac{35}{12} = \\frac{35}{6} \\approx 5.83$.\n\n*Why this step is allowed:* two separate dice don't influence each other, so the cross term $E[X_1 X_2] - E[X_1]E[X_2]$ is 0.\n\n**Step 3: check directly.** Use the 1-2-3-4-5-6-5-4-3-2-1 table from 4.1 and $E[S] = 7$:",
    },
    {
      type: "math",
      latex:
        "E[S^2] = \\frac{4 \\cdot 1 + 9 \\cdot 2 + 16 \\cdot 3 + 25 \\cdot 4 + 36 \\cdot 5 + 49 \\cdot 6 + 64 \\cdot 5 + 81 \\cdot 4 + 100 \\cdot 3 + 121 \\cdot 2 + 144 \\cdot 1}{36} = \\frac{1974}{36} = \\frac{329}{6}",
    },
    {
      type: "math",
      latex: "\\operatorname{Var}(S) = \\frac{329}{6} - 7^2 = \\frac{329 - 294}{6} = \\frac{35}{6} \\ \\checkmark",
    },
    {
      type: "text",
      content:
        "The one-line rule and the eleven-term sum agree. With the rule, $n$ dice have variance $\\frac{35n}{12}$, which nobody would want to find from a table.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Linearity needs nothing; variance addition needs independence",
      content:
        "$E[X + Y] = E[X] + E[Y]$ holds for **all** $X, Y$, dependent or not. It is $\\operatorname{Var}(X + Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y)$ that needs independence. Mixing the two up leads students to avoid indicator methods exactly where they are most useful: envelopes, birthdays and draws without replacement.",
    },
    {
      type: "quiz",
      id: "pr4-5-q1",
      variant: "concept",
      question: "Five cards are dealt from a shuffled deck, and $X$ counts the aces. The events \"card $k$ is an ace\" are dependent. Can you still say $E[X] = 5 \\cdot \\frac{4}{52}$?",
      options: [
        { text: "Yes. Each card on its own is an ace with probability $\\frac{4}{52}$, and linearity needs no independence.", correct: true, feedback: "$E[X] = \\frac{20}{52} = \\frac{5}{13} \\approx 0.38$. Dependence changes the *distribution* of $X$, not the sum of the expectations." },
        { text: "No. Linearity only holds for independent indicators.", feedback: "The derivation of $E[X + Y] = E[X] + E[Y]$ just splits a sum over outcomes. It never uses independence." },
        { text: "No. You must use $\\frac{4}{52}, \\frac{3}{51}, \\ldots$ because the probabilities change.", feedback: "Those are *conditional* probabilities, given earlier aces. Without conditioning, the 3rd card (say) is equally likely to be any of the 52 cards, so it is an ace with probability $\\frac{4}{52}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-5-q2",
      variant: "practice",
      question: "10 letters are placed at random into 10 addressed envelopes. What is the expected number of letters in the correct envelope?",
      options: [
        { text: "$1$", correct: true, feedback: "$10 \\cdot \\frac{1}{10} = 1$, the same as for any $n$." },
        { text: "$\\frac{1}{10}$", feedback: "That is the probability for one particular letter. Add it over all 10 letters." },
        { text: "$\\frac{1}{10!}$", feedback: "That is the chance that *all* letters match. The question asks for the expected number of matches." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-5-q3",
      variant: "practice",
      question: "In a class of 30, what is the expected number of pairs of students who share a birthday (365 equally likely days)?",
      options: [
        { text: "$\\frac{435}{365} \\approx 1.19$", correct: true, feedback: "$\\binom{30}{2} = 435$ pairs, each matching with probability $\\frac{1}{365}$." },
        { text: "$\\frac{30}{365} \\approx 0.08$", feedback: "That uses one indicator per *person*. A shared birthday belongs to a *pair*, so count pairs: $\\binom{30}{2}$." },
        { text: "$\\frac{870}{365} \\approx 2.38$", feedback: "$30 \\times 29 = 870$ counts ordered pairs, so each pair is counted twice. Use $\\binom{30}{2} = 435$." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-5-q4",
      variant: "practice",
      question: "A bag holds 4 red and 6 blue balls. Three are drawn **without** replacement. What is the expected number of red balls drawn?",
      options: [
        { text: "$1.2$", correct: true, feedback: "Each draw on its own is red with probability $\\frac{4}{10}$, so $E = 3 \\cdot 0.4 = 1.2$, even though the draws are dependent." },
        { text: "$1.33$", feedback: "$3 \\cdot \\frac{4}{9}$ uses a conditional probability, as if the first ball were known to be blue. With no information about earlier draws, each draw is red with probability $\\frac{4}{10}$." },
        { text: "$0.4$", feedback: "That is the expectation for a single draw. Three draws give three indicators." },
      ],
      hint: "Use one indicator per draw. What is $P(\\text{draw 2 is red})$ if you know nothing about draw 1?",
    },
    {
      type: "quiz",
      id: "pr4-5-q5",
      variant: "concept",
      question: "In three tosses, $X$ = heads and $Y$ = tails, each with variance 0.75. What is $\\operatorname{Var}(X + Y)$?",
      options: [
        { text: "$0$, because $X + Y = 3$ always.", correct: true, feedback: "$X$ and $Y$ are dependent, so the variances do not add. A constant has no spread." },
        { text: "$1.5$, by adding the variances.", feedback: "Adding variances needs independence. Here $Y = 3 - X$, as dependent as possible." },
        { text: "$3$, the same as $E[X + Y]$.", feedback: "That is the mean. The spread of a constant is 0." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-5-q6",
      variant: "practice",
      question: "A fair coin is tossed 10 times. What is the expected number of places where two heads appear in a row (positions $k, k+1$ both $H$)?",
      options: [
        { text: "$2.25$", correct: true, feedback: "There are 9 adjacent pairs, each $HH$ with probability $\\frac{1}{4}$: $9 \\cdot \\frac{1}{4} = 2.25$. Overlapping pairs are dependent, which doesn't matter here." },
        { text: "$2.5$", feedback: "10 tosses have only 9 adjacent pairs: positions (1,2) up to (9,10)." },
        { text: "$4.5$", feedback: "A pair is $HH$ with probability $\\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$, not $\\frac{1}{2}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-5-q7",
      variant: "practice",
      question: "Four people enter a lift on the ground floor of a building with 3 floors above. Each gets off at a random floor, independently. What is the expected number of floors at which the lift stops?",
      options: [
        { text: "$3\\left(1 - \\left(\\frac{2}{3}\\right)^4\\right) = \\frac{65}{27} \\approx 2.41$", correct: true, feedback: "A floor is skipped only if all four people choose another floor: $\\left(\\frac{2}{3}\\right)^4 = \\frac{16}{81}$. So each floor is used with probability $\\frac{65}{81}$, and $3 \\cdot \\frac{65}{81} = \\frac{65}{27}$." },
        { text: "$3$", feedback: "Three is the most possible. Quite often two or more people pick the same floor and some floor is skipped." },
        { text: "$4 \\cdot \\frac{1}{3} \\approx 1.33$", feedback: "That is the expected number of people getting off at one particular floor. Put the indicators on floors, not people." },
        { text: "$3\\left(\\frac{2}{3}\\right)^4 \\approx 0.59$", feedback: "That is the expected number of floors *skipped*. The stops are $3$ minus the skipped floors." },
      ],
      hint: "Find the chance that one particular floor is skipped by everyone.",
    },
    {
      type: "quiz",
      id: "pr4-5-q8",
      variant: "practice",
      question: "3 boys and 3 girls stand in a row in random order. What is the expected number of neighbouring boy–girl pairs?",
      options: [
        { text: "$3$", correct: true, feedback: "There are 5 neighbouring pairs, each mixed with probability $2 \\cdot \\frac{3}{6} \\cdot \\frac{3}{5} = \\frac{3}{5}$. So $5 \\cdot \\frac{3}{5} = 3$." },
        { text: "$2.5$", feedback: "That takes each pair to be mixed with probability $\\frac{1}{2}$. Once a boy is placed, the next spot holds a girl with probability $\\frac{3}{5}$, not $\\frac{1}{2}$." },
        { text: "$3.6$", feedback: "A row of 6 has 5 neighbouring pairs, not 6." },
        { text: "$5$", feedback: "That is the most possible (for $BGBGBG$). The average is lower." },
      ],
      hint: "One indicator per neighbouring pair. Find $P(\\text{boy then girl})$ and double it.",
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
        "Everything from the chapter in one place. Work each question on paper before you choose an option. Several wrong options are the answers that the misconceptions from this chapter produce.",
    },
    {
      type: "table",
      headers: ["Tool", "Formula", "Remember"],
      rows: [
        ["Valid distribution", "$p_i \\ge 0,\\ \\sum p_i = 1$", "Reject any $k$ that makes a $p_i$ negative"],
        ["CDF", "$F(x) = P(X \\le x)$", "$P(a < X \\le b) = F(b) - F(a)$"],
        ["Mean", "$E[X] = \\sum x_i p_i$", "Balance point; need not be a possible value"],
        ["Waiting for a success", "$P(X = k) = q^{k-1}p$, $E[X] = \\frac{1}{p}$", "$P(X > n) = q^n$: the first $n$ tries all fail"],
        ["Variance", "$E[X^2] - (E[X])^2$", "Never negative"],
        ["Linear change", "$E[aX+b] = aE[X]+b$, $\\operatorname{Var}(aX+b) = a^2\\operatorname{Var}(X)$", "Shifts add no spread"],
        ["Linearity", "$E[\\sum X_i] = \\sum E[X_i]$", "No independence needed"],
        ["Indicators", "$E[\\text{count}] = \\sum P(A_i)$", "Variances add only under independence"],
      ],
    },
    {
      type: "quiz",
      id: "pr4-6-q1",
      variant: "mastery",
      question: "$X$ takes the values 0, 1, 2 with $P(X=0) = 2k^2$, $P(X=1) = k$, $P(X=2) = 4k^2$. Find $k$.",
      options: [
        { text: "$\\frac{1}{3}$", correct: true, feedback: "$6k^2 + k - 1 = 0$ gives $(3k - 1)(2k + 1) = 0$. Reject $k = -\\frac{1}{2}$ because it makes $P(X=1)$ negative. Check: $\\frac{2}{9} + \\frac{3}{9} + \\frac{4}{9} = 1$." },
        { text: "$-\\frac{1}{2}$", feedback: "It solves the equation, but it makes $P(X = 1) = -\\frac{1}{2}$. Probabilities can't be negative." },
        { text: "$\\frac{1}{6}$", feedback: "Substitute it back: $\\frac{2}{36} + \\frac{6}{36} + \\frac{4}{36} = \\frac{12}{36} \\ne 1$." },
        { text: "$\\frac{1}{2}$", feedback: "Then $\\frac{1}{2} + \\frac{1}{2} + 1 = 2$. Recheck the factorisation of $6k^2 + k - 1$." },
      ],
      hint: "Set the sum equal to 1 and factorise the quadratic.",
    },
    {
      type: "quiz",
      id: "pr4-6-q2",
      variant: "mastery",
      question: "$X$ takes the values 1, 2, 3, 4 with $F(1) = 0.15$, $F(2) = 0.45$, $F(3) = 0.8$, $F(4) = 1$. Find $P(2 \\le X \\le 3)$.",
      options: [
        { text: "$0.65$", correct: true, feedback: "$P(2 \\le X \\le 3) = F(3) - F(1) = 0.8 - 0.15$." },
        { text: "$0.35$", feedback: "$F(3) - F(2)$ gives only $P(X = 3)$. To include $X = 2$, subtract $F(1)$ instead." },
        { text: "$0.8$", feedback: "$F(3) = P(X \\le 3)$ also includes $X = 1$." },
        { text: "$1.25$", feedback: "Adding CDF values double-counts. The PMF is the jumps, so subtract." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-6-q3",
      variant: "mastery",
      question: "You pay ₹5 to toss two fair coins. You win ₹12 for two heads, ₹4 for exactly one head and nothing for no heads. What is your expected profit?",
      options: [
        { text: "₹0: the game is fair", correct: true, feedback: "Expected payout $= 12 \\cdot \\frac{1}{4} + 4 \\cdot \\frac{1}{2} + 0 \\cdot \\frac{1}{4} = 3 + 2 = 5$, which equals the fee." },
        { text: "−₹1", feedback: "Exactly one head has probability $\\frac{2}{4} = \\frac{1}{2}$ ($HT$ and $TH$), not $\\frac{1}{4}$." },
        { text: "₹5", feedback: "₹5 is the expected *payout*. Profit subtracts the ₹5 fee." },
        { text: "₹11", feedback: "That is $12 + 4 - 5$. Each prize must be weighted by its probability." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-6-q4",
      variant: "mastery",
      question: "$X$ takes the values $-1, 0, 1, 2$ with probabilities 0.1, 0.2, 0.3, 0.4. Find $\\operatorname{Var}(X)$.",
      options: [
        { text: "$1$", correct: true, feedback: "$\\mu = -0.1 + 0.3 + 0.8 = 1$ and $E[X^2] = 0.1 + 0.3 + 1.6 = 2$, so $\\operatorname{Var} = 2 - 1 = 1$." },
        { text: "$2$", feedback: "That is $E[X^2]$. Subtract $\\mu^2$." },
        { text: "$0.8$", feedback: "That comes from $E[X^2] = 1.8$. Check it: $(-1)^2 \\cdot 0.1 = +0.1$. Squaring removes the minus sign." },
        { text: "$0$", feedback: "$E[X - \\mu] = 0$ always. Variance uses squared deviations." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-6-q5",
      variant: "mastery",
      question: "$E[X] = 3$ and $\\operatorname{Var}(X) = 2$. For $Y = 4 - 3X$, find $E[Y]$ and $\\operatorname{Var}(Y)$.",
      options: [
        { text: "$E[Y] = -5,\\ \\operatorname{Var}(Y) = 18$", correct: true, feedback: "$E[Y] = 4 - 3 \\cdot 3 = -5$ and $\\operatorname{Var}(Y) = (-3)^2 \\cdot 2 = 18$." },
        { text: "$E[Y] = -5,\\ \\operatorname{Var}(Y) = -2$", feedback: "That is $-3 \\cdot 2 + 4$, which copies the rule for the mean. Variance scales by $a^2$ and ignores shifts." },
        { text: "$E[Y] = -5,\\ \\operatorname{Var}(Y) = 22$", feedback: "$9 \\cdot 2 = 18$ is right, but the constant 4 adds no spread." },
        { text: "$E[Y] = 13,\\ \\operatorname{Var}(Y) = 18$", feedback: "The variance is right. For the mean, $4 - 3 \\cdot 3 = -5$." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-6-q6",
      variant: "mastery",
      question: "$X$ takes the values 0, 1, 2, 3 with probabilities 0.1, $a$, $b$, 0.2, and $E[X] = 1.6$. Find $a$ and $b$.",
      options: [
        { text: "$a = 0.4,\\ b = 0.3$", correct: true, feedback: "$a + b = 0.7$ and $a + 2b + 0.6 = 1.6$, so $a + 2b = 1$. Subtracting gives $b = 0.3$ and $a = 0.4$." },
        { text: "$a = 0.3,\\ b = 0.4$", feedback: "Then $E[X] = 0.3 + 0.8 + 0.6 = 1.7$. Check the mean equation again." },
        { text: "$a = 0.35,\\ b = 0.35$", feedback: "That satisfies $\\sum p = 1$ but gives $E[X] = 1.65$. Use both equations." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-6-q7",
      variant: "mastery",
      question: "A die is rolled 4 times. What is the expected number of distinct faces that appear?",
      options: [
        { text: "$6\\left(1 - \\left(\\frac{5}{6}\\right)^4\\right) \\approx 3.11$", correct: true, feedback: "Face $k$ appears at least once with probability $1 - \\left(\\frac{5}{6}\\right)^4$. Add this over the 6 faces." },
        { text: "$4$", feedback: "Four is the most possible. Repeats are common, so the average is lower." },
        { text: "$4 \\cdot \\frac{1}{6} \\approx 0.67$", feedback: "That is the expected number of times one *particular* face shows up. Use one indicator per face instead." },
        { text: "It cannot be found without the full distribution.", feedback: "Indicators plus linearity give it directly, and the dependence between faces doesn't matter." },
      ],
      hint: "Use one indicator per face: \"face $k$ shows up at least once\".",
    },
    {
      type: "quiz",
      id: "pr4-6-q8",
      variant: "mastery",
      question: "A random variable $X$ takes only whole-number values and has $E[X] = 2.5$. Which statement must be true?",
      options: [
        { text: "$X$ never equals 2.5, but its long-run average is 2.5.", correct: true, feedback: "The mean is a balance point and need not be a value $X$ can take, just as a die never shows 3.5." },
        { text: "2.5 is the most likely value of $X$.", feedback: "$X$ can't equal 2.5 at all, and the mean is not the mode in general." },
        { text: "$X$ equals 2 or 3 with probability $\\frac{1}{2}$ each.", feedback: "That is one possible distribution with mean 2.5, but many others share that mean." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-6-q9",
      variant: "mastery",
      question: "$\\operatorname{Var}(X) = 0$. What does this tell you about $X$?",
      options: [
        { text: "$X$ is a constant: it equals $\\mu$ with probability 1.", correct: true, feedback: "A sum of non-negative terms $(x_i - \\mu)^2 p_i$ is 0 only if every value with positive probability equals $\\mu$." },
        { text: "$E[X] = 0$.", feedback: "Variance measures spread, not location. A constant 7 has variance 0 and mean 7." },
        { text: "$X$ takes the values $\\mu - 1$ and $\\mu + 1$ equally often.", feedback: "Then every deviation is $\\pm 1$, so $\\operatorname{Var}(X) = 1$, not 0." },
      ],
    },
    {
      type: "quiz",
      id: "pr4-6-q10",
      variant: "mastery",
      question: "Two numbers are chosen at random, without replacement, from 1, 2, 3, 4, 5, and $X$ is the smaller of the two. Find $E[X]$.",
      options: [
        { text: "$2$", correct: true, feedback: "$P(X = k) = \\frac{5 - k}{10}$ for $k = 1, 2, 3, 4$, so $E[X] = \\frac{1 \\cdot 4 + 2 \\cdot 3 + 3 \\cdot 2 + 4 \\cdot 1}{10} = \\frac{20}{10} = 2$." },
        { text: "$2.5$", feedback: "That is the plain average of 1, 2, 3, 4. Smaller values are more likely: $X = 1$ happens in 4 of the 10 pairs." },
        { text: "$3$", feedback: "That is the mean of all five numbers. The *smaller* of two picks sits below it." },
        { text: "$4$", feedback: "That is the mean of the *larger* number, $\\frac{2 \\cdot 1 + 3 \\cdot 2 + 4 \\cdot 3 + 5 \\cdot 4}{10} = 4$." },
      ],
      hint: "For $X = k$, the other number is one of the $5 - k$ numbers above $k$.",
    },
    {
      type: "quiz",
      id: "pr4-6-q11",
      variant: "mastery",
      question: "A die is thrown until a 5 or a 6 appears. What are the expected number of throws, and the probability that more than 2 throws are needed?",
      options: [
        { text: "$3$ and $\\frac{4}{9}$", correct: true, feedback: "Each throw succeeds with $p = \\frac{2}{6} = \\frac{1}{3}$, so $E[X] = \\frac{1}{p} = 3$. More than 2 throws means the first two both miss: $\\left(\\frac{2}{3}\\right)^2 = \\frac{4}{9}$." },
        { text: "$3$ and $\\frac{2}{9}$", feedback: "$\\frac{2}{9}$ is $P(X = 2)$. \"More than 2\" means the first two throws both miss." },
        { text: "$6$ and $\\frac{25}{36}$", feedback: "Those are the answers when only a six ends the game. A 5 also ends it here, so $p = \\frac{1}{3}$." },
        { text: "$\\frac{1}{3}$ and $\\frac{4}{9}$", feedback: "$\\frac{1}{3}$ is the success probability of one throw. The expected wait is its reciprocal." },
      ],
      hint: "Find $p$ for one throw. The expected wait is $\\frac{1}{p}$.",
    },
    {
      type: "text",
      content:
        "You can now turn any experiment into a distribution, find its centre and its spread, and count things with indicators. Chapter 5 applies all of this to one especially common random variable: the number of successes in repeated independent trials.",
    },
  ]),
};

export const probabilityChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
