import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Probability Chapter 5 — Bernoulli Trials and the Binomial Distribution.
 * Repeated independent yes/no trials: the four conditions, the binomial
 * formula derived from a tree, its shape, mean and variance, the geometric
 * wait for a first success, the Poisson limit for rare events, and how to
 * choose the right model. Closes with a full-course diagnostic.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "bernoulli-trials",
  title: "5.1 · Bernoulli Trials",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pr-5-bernoulli-trials-and-binomial.mp4",
      poster: "/videos/pr-5-bernoulli-trials-and-binomial.jpg",
      title: "Chapter 5 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "A basketball player takes 10 free throws. A factory tests 20 bulbs off the line. You answer 8 true/false questions by guessing. A die is rolled 5 times and you only care whether each roll is a six.\n\nThese stories look different, but they have the same skeleton. Something is **repeated a fixed number of times**, and each time you record only **yes or no**. That skeleton turns up so often that it has its own name and its own distribution, and this chapter builds both.",
    },
    {
      type: "text",
      content:
        "Start with one repetition. Flip a coin that lands heads with probability 0.3 and watch the running proportion of heads. Each flip is one trial with two outcomes, and nothing about one flip affects the next.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "coin",
        coinP: 0.3,
        batchSizes: [1, 10, 100, 1000],
        caption:
          "Each flip is one Bernoulli trial with p = 0.3. The running proportion wanders early and then settles on p. Watch the streak readout too: a run of heads does not change what the next flip does.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Bernoulli trials",
      content:
        "A sequence of trials is a sequence of **Bernoulli trials** when all four of these hold:\n\n1. **Fixed number of trials** $n$, decided in advance.\n2. **Two outcomes** per trial, called *success* and *failure*.\n3. **Constant probability**: success has the same probability $p$ on every trial. Failure has probability $q = 1 - p$.\n4. **Independence**: the outcome of one trial does not change the probabilities for any other.",
    },
    {
      type: "text",
      content:
        "\"Success\" is only a label. It means *the outcome we are counting*. If you count defective bulbs, a defective bulb is a success. Choose the label that matches the question, and then $p$ is the probability of that outcome.",
    },
    {
      type: "table",
      headers: ["Situation", "Bernoulli trials?", "Why"],
      rows: [
        ["A die is rolled 5 times; success = a six", "Yes", "$n = 5$, $p = \\frac{1}{6}$ every roll, rolls are independent"],
        ["10 free throws by a player who hits 70% of the time", "Yes (as a model)", "$n = 10$, $p = 0.7$, assuming confidence and fatigue don't change $p$"],
        ["3 cards drawn **without** replacement; success = an ace", "No", "Given the first card, the chance of an ace on the second is $\\frac{3}{51}$ or $\\frac{4}{51}$: it depends on the history, so the draws are dependent"],
        ["3 cards drawn **with** replacement; success = an ace", "Yes", "The deck is restored, so $p = \\frac{4}{52} = \\frac{1}{13}$ every time"],
        ["Roll a die until a six appears", "No", "The number of trials is not fixed in advance (this is the geometric story in 5.4)"],
        ["Record each roll's face value 1 to 6", "No", "Six outcomes per trial, not two, unless you merge them into yes/no"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: drawing without replacement is Bernoulli",
      content:
        "It feels like \"the same draw, repeated\", but it isn't. Once a card is gone the deck is different, so the probability of success *given what has already been drawn* changes. For example, $P(\\text{2nd ace} \\mid \\text{1st ace}) = \\frac{3}{51}$, not $\\frac{4}{52}$. The next draw depends on what came before, so independence (condition 4) fails. Curiously, the unconditional chance of an ace on draw 2 is still $\\frac{4}{52}$ (you will use this in 5.3). What breaks is independence. Drawing **with** replacement restores the deck and gives genuine Bernoulli trials. Without replacement the count follows a different law, the hypergeometric, which you will meet again in 5.6.",
    },
    {
      type: "text",
      content:
        "When the population is huge compared with the sample, removing a few items barely changes $p$. Picking 5 bulbs from a batch of 100,000 without replacement is not *exactly* Bernoulli, but it is so close that everyone models it that way. The misconception is treating a small deck or bag as if it were huge.",
    },
    {
      type: "text",
      content:
        "**The Bernoulli random variable.** For a single trial, let $X = 1$ on success and $X = 0$ on failure. That tiny variable is the building block of everything in this chapter, so compute its mean and variance straight from the definitions of Chapter 4.",
    },
    {
      type: "table",
      headers: ["$x$", "0", "1"],
      rows: [["$P(X = x)$", "$q$", "$p$"]],
    },
    {
      type: "math",
      latex:
        "E[X] = 0\\cdot q + 1\\cdot p = p, \\qquad E[X^2] = 0^2\\cdot q + 1^2 \\cdot p = p",
    },
    {
      type: "math",
      latex:
        "\\operatorname{Var}(X) = E[X^2] - (E[X])^2 = p - p^2 = p(1-p) = pq",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Bernoulli(p)",
      content:
        "$X \\in \\{0, 1\\}$ with $P(X = 1) = p$. Mean $p$, variance $pq$.\n\nThe mean is the proportion of successes you expect. The variance $pq$ is zero when $p = 0$ or $p = 1$, since then there is no uncertainty at all. It is largest, $\\frac{1}{4}$, at $p = \\frac{1}{2}$, when the trial is hardest to predict.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** A die is rolled once. Let $X = 1$ if it shows a number greater than 4.\n\n*Step 1.* Success is $\\{5, 6\\}$, so $p = \\frac{2}{6} = \\frac{1}{3}$ and $q = \\frac{2}{3}$.\n\n*Step 2.* $E[X] = p = \\frac{1}{3}$.\n\n*Step 3.* $\\operatorname{Var}(X) = pq = \\frac{1}{3}\\cdot\\frac{2}{3} = \\frac{2}{9}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** A bag holds 4 red and 6 blue balls. Three balls are drawn and you count reds. Is this a sequence of Bernoulli trials?\n\n*With replacement:* yes. $n = 3$, $p = \\frac{4}{10} = 0.4$ on every draw, and the draws are independent.\n\n*Without replacement:* no. The first draw has $P(\\text{red}) = 0.4$, but given that a red was removed, the second has $P(\\text{red} \\mid \\text{1st red}) = \\frac{3}{9} = \\frac{1}{3}$. The success probability given the history changes, so independence fails.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (an application).** A lottery ticket wins a prize with probability $0.01$. Ravi buys one ticket every week for a year, 52 weeks, and each week's draw is independent. Is \"did this week's ticket win?\" a Bernoulli trial, and what are the mean and variance of one week's indicator?\n\n*Step 1: check the four conditions.* $n = 52$ is fixed in advance. Each week has two outcomes, win or not. The chance is $0.01$ every week, and the draws are independent.\n\n*Why this step:* the formulas only apply once the story passes all four tests. Skipping the check is how the without-replacement trap catches people.\n\n*Step 2: one week's indicator.* Let $X = 1$ if the ticket wins. Then $X \\sim$ Bernoulli$(0.01)$:",
    },
    {
      type: "math",
      latex: "E[X] = p = 0.01, \\qquad \\operatorname{Var}(X) = pq = 0.01 \\times 0.99 = 0.0099",
    },
    {
      type: "text",
      content:
        "*Why this step:* the Bernoulli mean and variance come from its two-row table, so there is nothing new to compute. Just read off $p$ and $q$.\n\n*Step 3: a sense check.* The variance $0.0099$ is almost exactly the mean $0.01$. When $p$ is tiny, $q \\approx 1$ and so $pq \\approx p$. You will see this pattern again in 5.5, where rare events give a distribution whose variance *equals* its mean.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style).** A Bernoulli variable $X$ has $\\operatorname{Var}(X) = \\frac{2}{9}$ and $P(X = 1) > P(X = 0)$. Find $p$ and $E[X]$.\n\n*Step 1: turn the variance into an equation in $p$.*",
    },
    {
      type: "math",
      latex: "p(1 - p) = \\frac{2}{9} \\iff 9p^2 - 9p + 2 = 0 \\iff (3p - 1)(3p - 2) = 0",
    },
    {
      type: "text",
      content:
        "*Why this step:* the variance $pq$ is the only fact that involves $p$, and it is a quadratic. A quadratic has two roots, so expect two candidates.\n\n*Step 2: use the extra condition.* The roots are $p = \\frac{1}{3}$ and $p = \\frac{2}{3}$. They give the same variance because $pq$ is symmetric: swapping success and failure doesn't change the spread. $P(X = 1) > P(X = 0)$ means $p > q$, so $p = \\frac{2}{3}$.\n\n*Why this step:* the variance alone cannot tell $p$ from $q$. The question adds the inequality exactly to break that tie.\n\n*Step 3.* $E[X] = p = \\frac{2}{3}$.",
    },
    {
      type: "quiz",
      id: "pr5-1-q1",
      variant: "concept",
      question:
        "Five cards are drawn one at a time **without replacement** from a standard deck, and you count the hearts. Why is this *not* a sequence of Bernoulli trials?",
      options: [
        {
          text: "The chance of a heart on each draw depends on what earlier draws removed, so the trials are not independent.",
          correct: true,
          feedback: "Right. Given that the first card was a heart, $P(\\text{2nd heart} \\mid \\text{1st heart}) = \\frac{12}{51}$, not $\\frac{13}{52}$. The history changes the odds, so independence fails.",
        },
        {
          text: "Each draw has more than two outcomes.",
          feedback: "A card has 52 faces, but \"heart or not\" is a perfectly good two-outcome split. The problem is elsewhere.",
        },
        {
          text: "The number of draws is not fixed.",
          feedback: "It is fixed at 5. That condition holds.",
        },
        {
          text: "It is a sequence of Bernoulli trials; the order of drawing doesn't matter.",
          feedback: "This is the misconception. Without replacement, the deck changes after each draw, so each draw's odds depend on the earlier draws.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pr5-1-q2",
      variant: "practice",
      question: "Which of these **is** a sequence of Bernoulli trials?",
      options: [
        {
          text: "Tossing a fair coin 12 times and counting heads.",
          correct: true,
          feedback: "Fixed $n = 12$, two outcomes, $p = \\frac{1}{2}$ each time, independent tosses.",
        },
        {
          text: "Tossing a coin until the first head appears.",
          feedback: "The number of trials isn't fixed in advance. That is the geometric setting of 5.4.",
        },
        {
          text: "Drawing 4 balls without replacement from a bag of 3 red and 5 green, counting reds.",
          feedback: "Without replacement from a small bag: each draw's odds depend on what was removed before, so the draws are not independent.",
        },
        {
          text: "Rolling a die 6 times and recording each face value.",
          feedback: "Each trial has six recorded outcomes. You would need a yes/no question such as \"is it a six?\".",
        },
      ],
    },
    {
      type: "quiz",
      id: "pr5-1-q3",
      variant: "practice",
      question:
        "A Bernoulli variable has $P(X = 1) = 0.2$. What are $E[X]$ and $\\operatorname{Var}(X)$?",
      options: [
        { text: "$E[X] = 0.2$, $\\operatorname{Var}(X) = 0.16$", correct: true, feedback: "$E[X] = p = 0.2$ and $\\operatorname{Var}(X) = pq = 0.2 \\times 0.8 = 0.16$." },
        { text: "$E[X] = 0.2$, $\\operatorname{Var}(X) = 0.04$", feedback: "$0.04 = p^2$. Variance is $E[X^2] - (E[X])^2 = p - p^2 = pq$." },
        { text: "$E[X] = 0.5$, $\\operatorname{Var}(X) = 0.25$", feedback: "Those are the values for a fair coin. Here $p = 0.2$." },
        { text: "$E[X] = 0.8$, $\\operatorname{Var}(X) = 0.16$", feedback: "$0.8$ is $q$, the failure probability. The mean of the 0/1 variable is $p$." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-1-q4",
      variant: "concept",
      question:
        "An inspector picks 5 bulbs from a batch of 200,000, of which 2% are defective, without replacement. Is it reasonable to model the count of defectives with Bernoulli trials, $p = 0.02$?",
      options: [
        {
          text: "Yes, approximately: removing 5 bulbs from 200,000 changes $p$ by a negligible amount.",
          correct: true,
          feedback: "Right. Strictly the draws are dependent, but when the sample is tiny compared with the population the change in $p$ is invisible. Treating a *small* bag this way is the error.",
        },
        {
          text: "No, never: any sampling without replacement rules out Bernoulli trials entirely.",
          feedback: "Strictly, the draws are dependent, but the dependence is negligible here: after 5 of 200,000 bulbs are removed, $p$ moves by about $10^{-5}$. A model only has to be good enough, and this one is excellent.",
        },
        {
          text: "Yes, exactly: without replacement and with replacement always give identical probabilities.",
          feedback: "Not for small populations. From a bag of 4 red and 6 blue, $P(\\text{2nd red} \\mid \\text{1st red})$ is $\\frac{3}{9}$, not $\\frac{4}{10}$.",
        },
      ],
      hint: "Ask how much $p$ can move after 5 of 200,000 bulbs are removed.",
    },
    {
      type: "quiz",
      id: "pr5-1-q5",
      variant: "practice",
      question: "For which value of $p$ is the variance of a Bernoulli variable largest, and what is that largest variance?",
      options: [
        { text: "$p = \\frac{1}{2}$, variance $\\frac{1}{4}$", correct: true, feedback: "$pq = p(1-p)$ is a downward parabola with its peak at $p = \\frac{1}{2}$, where it equals $\\frac{1}{4}$." },
        { text: "$p = 1$, variance $1$", feedback: "At $p = 1$ success is certain, so there is no spread at all: $pq = 0$." },
        { text: "$p = \\frac{1}{2}$, variance $\\frac{1}{2}$", feedback: "Right $p$, but $\\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-1-q6",
      variant: "practice",
      question:
        "A Bernoulli variable has $\\operatorname{Var}(X) = \\frac{3}{16}$, and success is more likely than failure. What is $p$?",
      options: [
        { text: "$\\frac{3}{4}$", correct: true, feedback: "$p(1-p) = \\frac{3}{16}$ gives $16p^2 - 16p + 3 = 0$, so $(4p - 1)(4p - 3) = 0$. Success is the likelier outcome, so $p = \\frac{3}{4}$." },
        { text: "$\\frac{1}{4}$", feedback: "That root also gives variance $\\frac{3}{16}$, but then failure is the likelier outcome. The condition $p > q$ picks the other root." },
        { text: "$\\frac{3}{16}$", feedback: "That is the variance itself. Solve $p(1 - p) = \\frac{3}{16}$ for $p$." },
        { text: "$\\frac{13}{16}$", feedback: "That is $1 - \\frac{3}{16}$, which treats the variance as $q$. The variance is the product $pq$." },
      ],
      hint: "Solve $p(1-p) = \\frac{3}{16}$; it factorises. Then use $p > q$.",
    },
    {
      type: "quiz",
      id: "pr5-1-q7",
      variant: "practice",
      question:
        "A seed germinates with probability 0.85. For one seed, let $X = 1$ if it **fails** to germinate. What are $E[X]$ and $\\operatorname{Var}(X)$?",
      options: [
        { text: "$E[X] = 0.15$, $\\operatorname{Var}(X) = 0.1275$", correct: true, feedback: "The outcome being counted is failure to germinate, so $p = 0.15$. Then $pq = 0.15 \\times 0.85 = 0.1275$." },
        { text: "$E[X] = 0.85$, $\\operatorname{Var}(X) = 0.1275$", feedback: "The variance is right, since $pq$ is the same either way. But $X = 1$ marks a *failed* seed, so its mean is $0.15$." },
        { text: "$E[X] = 0.15$, $\\operatorname{Var}(X) = 0.0225$", feedback: "$0.0225 = 0.15^2$. The variance is $p - p^2 = pq$, not $p^2$." },
        { text: "$E[X] = 0.15$, $\\operatorname{Var}(X) = 0.85$", feedback: "$0.85$ is $q$. Multiply: $\\operatorname{Var}(X) = pq$." },
      ],
      hint: "\"Success\" is whatever $X = 1$ marks. Here that is a seed that fails.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "binomial-formula",
  title: "5.2 · The Binomial Formula, Derived",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A striker scores each penalty with probability $0.6$, independently. She takes 3 penalties. What is the probability she scores **exactly 2**?\n\nDon't reach for a formula yet. Draw every way the three kicks can go. Each kick is a split into S (score) and F (miss), so three kicks give $2^3 = 8$ paths.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        stages: [
          { label: "Kick 1", branches: [{ label: "S" }, { label: "F" }] },
          { label: "Kick 2", branches: [{ label: "S" }, { label: "F" }] },
          { label: "Kick 3", branches: [{ label: "S" }, { label: "F" }] },
        ],
        probs: [[0.6, 0.4]],
        editable: [{ allStages: true, label: "p" }],
        collapseEqualPaths: true,
        highlight: { label: "exactly 2 goals", latex: "E", leaves: { successCount: { label: "S", k: 2 } } },
        caption:
          "The three shaded leaves are SSF, SFS and FSS. Look at their products: all three are the same number. Move the p slider and they stay equal to each other. The table below the tree groups the leaves by the number of successes.",
      },
    },
    {
      type: "text",
      content:
        "**Step 1: one path.** Take SSF. Multiply along the branches, which is allowed because the kicks are independent:",
    },
    { type: "math", latex: "P(SSF) = 0.6 \\times 0.6 \\times 0.4 = (0.6)^2(0.4)^1 = 0.144" },
    {
      type: "text",
      content:
        "**Step 2: every path with 2 successes has the same probability.** SFS gives $0.6 \\times 0.4 \\times 0.6$ and FSS gives $0.4 \\times 0.6 \\times 0.6$. Multiplication doesn't care about order, so each is $p^2 q^1 = 0.144$. Where the successes fall changes nothing. Only *how many* there are matters.\n\n**Step 3: count those paths.** A path with exactly 2 successes is fixed by choosing *which* 2 of the 3 kicks were successes. That is $\\binom{3}{2} = 3$ ways, straight from the combinations chapter.\n\n**Step 4: add.** The paths are mutually exclusive, so add their probabilities:",
    },
    { type: "math", latex: "P(X = 2) = \\binom{3}{2}(0.6)^2(0.4)^1 = 3 \\times 0.144 = 0.432" },
    {
      type: "text",
      content:
        "Nothing in those four steps depended on $n = 3$ or $k = 2$. With $n$ trials, a path with exactly $k$ successes has $k$ factors of $p$ and $n - k$ factors of $q$, and there are $\\binom{n}{k}$ ways to choose where the successes sit.",
    },
    {
      type: "math",
      latex: "P(X = k) = \\binom{n}{k} p^k q^{n-k}, \\qquad k = 0, 1, \\ldots, n",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The binomial distribution B(n, p)",
      content:
        "If $X$ counts the successes in $n$ Bernoulli trials with success probability $p$, then $P(X = k)$ is given by the formula above, with $q = 1 - p$. We write $X \\sim B(n, p)$. Read it as (number of paths) × (probability of any one path).",
    },
    {
      type: "table",
      headers: ["$k$ goals", "Paths $\\binom{3}{k}$", "One path $p^k q^{3-k}$", "$P(X = k)$"],
      rows: [
        ["0", "1", "$(0.4)^3 = 0.064$", "0.064"],
        ["1", "3", "$(0.6)(0.4)^2 = 0.096$", "0.288"],
        ["2", "3", "$(0.6)^2(0.4) = 0.144$", "0.432"],
        ["3", "1", "$(0.6)^3 = 0.216$", "0.216"],
        ["Total", "8", "", "1.000"],
      ],
    },
    {
      type: "text",
      content:
        "**Why the name \"binomial\"?** Expand $(q + p)^n$ with the binomial theorem. The general term is $\\binom{n}{k} p^k q^{n-k}$, which is exactly $P(X = k)$. So the whole distribution sits inside one expansion, and the total comes for free:",
    },
    {
      type: "math",
      latex:
        "\\sum_{k=0}^{n} \\binom{n}{k} p^k q^{n-k} = (q + p)^n = 1^n = 1",
    },
    {
      type: "text",
      content:
        "For $n = 3$: $(q + p)^3 = q^3 + 3pq^2 + 3p^2q + p^3$. Those four terms are the four rows of the table, in order. This is the same identity the tree's leaf sum checks when it shows 1.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: forgetting the nCk",
      content:
        "Writing $P(\\text{exactly 2 heads in 4 tosses}) = \\left(\\tfrac{1}{2}\\right)^2\\left(\\tfrac{1}{2}\\right)^2 = \\tfrac{1}{16}$ computes the probability of **one particular arrangement**, such as HHTT. But HTHT, HTTH, THHT, THTH and TTHH also have exactly 2 heads. There are $\\binom{4}{2} = 6$ arrangements, so the answer is $\\frac{6}{16} = \\frac{3}{8}$. The $p^k q^{n-k}$ part is one path. The $\\binom{n}{k}$ counts the paths.",
    },
    {
      type: "text",
      content:
        "**The three question types.** Exam questions say *exactly*, *at least* or *at most*. Each one is a sum of binomial terms, and a complement often makes the sum much shorter.",
    },
    {
      type: "table",
      headers: ["Wording", "Meaning", "Quickest route"],
      rows: [
        ["exactly $k$", "$P(X = k)$", "One term"],
        ["at most $k$", "$P(X \\le k) = P(0) + \\cdots + P(k)$", "Direct if $k$ is small"],
        ["at least $k$", "$P(X \\ge k) = P(k) + \\cdots + P(n)$", "$1 - P(X \\le k-1)$ if $k$ is small"],
        ["at least one", "$P(X \\ge 1)$", "$1 - P(X = 0) = 1 - q^n$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1.** A fair coin is tossed 6 times. Here $n = 6$, $p = q = \\frac{1}{2}$, so every path has probability $\\left(\\frac{1}{2}\\right)^6 = \\frac{1}{64}$ and only the path counts differ.\n\n*Exactly 4 heads:* $\\binom{6}{4}\\cdot\\frac{1}{64} = \\frac{15}{64}$.\n\n*At least 5 heads:* $P(5) + P(6) = \\frac{6 + 1}{64} = \\frac{7}{64}$.\n\n*At least one head:* $1 - P(0) = 1 - \\frac{1}{64} = \\frac{63}{64}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** A die is rolled 4 times. Find the probability of at least one six.\n\n*Step 1.* $n = 4$, success = six, $p = \\frac{1}{6}$, $q = \\frac{5}{6}$.\n\n*Step 2.* \"At least one\" has four cases (1, 2, 3 or 4 sixes). Its complement has one: no sixes.\n\n*Step 3.* $P(X \\ge 1) = 1 - \\left(\\frac{5}{6}\\right)^4 = 1 - \\frac{625}{1296} = \\frac{671}{1296} \\approx 0.518$.\n\nSlightly better than even. This is the bet the Chevalier de Méré won in the 1650s.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** The probability that a bulb is defective is 0.05. In a pack of 10 bulbs, find the probability that at most one is defective.\n\n*Step 1.* Success = defective, $n = 10$, $p = 0.05$, $q = 0.95$.\n\n*Step 2.* $P(X \\le 1) = P(0) + P(1) = (0.95)^{10} + \\binom{10}{1}(0.05)(0.95)^9$.\n\n*Step 3.* $(0.95)^{10} \\approx 0.5987$ and $10 \\times 0.05 \\times (0.95)^9 \\approx 0.3151$, so $P(X \\le 1) \\approx 0.914$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (sports).** In a hurdle race an athlete must cross 10 hurdles. She clears each hurdle with probability $\\frac{5}{6}$, independently. Find the probability that she knocks down fewer than 2 hurdles.\n\n*Step 1: choose what to count.* The question is about hurdles knocked down, so call a knock-down a success: $n = 10$, $p = \\frac{1}{6}$, $q = \\frac{5}{6}$.\n\n*Why this step:* you could count clears instead, but then \"fewer than 2 knocked down\" becomes \"at least 9 cleared\". Labelling the counted outcome as success keeps the sum short and the arithmetic honest.\n\n*Step 2: translate the wording.* \"Fewer than 2\" means $X = 0$ or $X = 1$:",
    },
    {
      type: "math",
      latex:
        "P(X \\le 1) = \\left(\\frac{5}{6}\\right)^{10} + \\binom{10}{1}\\frac{1}{6}\\left(\\frac{5}{6}\\right)^{9}",
    },
    {
      type: "text",
      content:
        "*Step 3: factor before you calculate.* Both terms contain $\\left(\\frac{5}{6}\\right)^9$:",
    },
    {
      type: "math",
      latex:
        "P(X \\le 1) = \\left(\\frac{5}{6}\\right)^{9}\\left(\\frac{5}{6} + \\frac{10}{6}\\right) = \\frac{5}{2}\\left(\\frac{5}{6}\\right)^{9} \\approx 2.5 \\times 0.1938 \\approx 0.485",
    },
    {
      type: "text",
      content:
        "*Why this step:* pulling out the common power turns two awkward terms into one. Board exams often accept the answer left as $\\frac{5}{2}\\left(\\frac{5}{6}\\right)^9$, and factoring gets you there in one line.\n\nSo even a strong hurdler, clearing 5 in 6, has roughly an even chance of a clean-or-nearly-clean run over 10 hurdles.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: a success that is itself a compound event.** A pair of dice is thrown 4 times. Let $X$ be the number of doublets. Find the distribution of $X$.\n\n*Step 1.* One throw of the pair is one trial. Success = a doublet: $(1,1), (2,2), \\ldots, (6,6)$, which is 6 of the 36 outcomes. So $p = \\frac{6}{36} = \\frac{1}{6}$ and $q = \\frac{5}{6}$.\n\n*Step 2.* The throws are independent and $n = 4$ is fixed, so $X \\sim B\\!\\left(4, \\frac{1}{6}\\right)$ and $P(X = k) = \\binom{4}{k}\\frac{5^{4-k}}{6^4} = \\binom{4}{k}\\frac{5^{4-k}}{1296}$.\n\n*Step 3.* Fill in $k = 0, \\ldots, 4$:",
    },
    {
      type: "table",
      headers: ["$k$ doublets", "0", "1", "2", "3", "4"],
      rows: [
        ["$\\binom{4}{k}\\,5^{4-k}$", "$1 \\cdot 625$", "$4 \\cdot 125$", "$6 \\cdot 25$", "$4 \\cdot 5$", "$1 \\cdot 1$"],
        ["$P(X = k)$", "$\\frac{625}{1296}$", "$\\frac{500}{1296}$", "$\\frac{150}{1296}$", "$\\frac{20}{1296}$", "$\\frac{1}{1296}$"],
      ],
    },
    {
      type: "text",
      content:
        "The numerators add to $625 + 500 + 150 + 20 + 1 = 1296$, as they must. The only new idea is that a \"success\" can be any event you define on a single trial, as long as it has the same probability every time.",
    },
    {
      type: "text",
      content:
        "**Worked example 6: how many trials are enough?** How many tosses of a fair coin are needed so that $P(\\text{at least one head}) > 0.9$?\n\n*Step 1.* $P(X \\ge 1) = 1 - \\left(\\frac{1}{2}\\right)^n$.\n\n*Step 2.* Need $1 - \\left(\\frac{1}{2}\\right)^n > 0.9$, that is, $\\left(\\frac{1}{2}\\right)^n < 0.1$, or $2^n > 10$.\n\n*Step 3.* $2^3 = 8$ is not enough, but $2^4 = 16$ is. So the minimum is $n = 4$, and then $P(X \\ge 1) = \\frac{15}{16} \\approx 0.94$.\n\nThe same move, solving $q^n < 1 - \\alpha$, handles every \"minimum $n$\" question.",
    },
    {
      type: "text",
      content:
        "**Worked example 7 (JEE style: a random walk).** A man takes a step forward with probability $0.4$ and a step backward with probability $0.6$, independently. Find the probability that after 11 steps he is exactly one step away from where he started.\n\n*Step 1: turn position into a count.* Let $X$ be the number of forward steps, so $X \\sim B(11, 0.4)$ and there are $11 - X$ backward steps. His final position is $X - (11 - X) = 2X - 11$.\n\n*Why this step:* the binomial counts successes, not positions. Rewriting the position in terms of $X$ turns a question about *where he ends up* into a question about *how many* forward steps he took.\n\n*Step 2: solve for the counts.* One step away means $2X - 11 = \\pm 1$, so $X = 6$ or $X = 5$.\n\n*Why this step:* \"one step away\" has two directions, in front of the start or behind it. Missing one of them is the usual way to lose half the marks.\n\n*Step 3: add the two binomial terms.*",
    },
    {
      type: "math",
      latex:
        "P = \\binom{11}{6}(0.4)^6(0.6)^5 + \\binom{11}{5}(0.4)^5(0.6)^6 = \\binom{11}{5}(0.4)^5(0.6)^5\\,(0.4 + 0.6)",
    },
    {
      type: "text",
      content:
        "*Why this step:* $\\binom{11}{6} = \\binom{11}{5} = 462$, so the two terms share almost everything. Factoring leaves $(0.4 + 0.6) = 1$.\n\n*Step 4.* $P = 462\\,(0.4 \\times 0.6)^5 = 462\\,(0.24)^5 \\approx 462 \\times 0.000796 \\approx 0.368$.",
    },
    {
      type: "quiz",
      id: "pr5-2-q1",
      variant: "concept",
      question: "A fair coin is tossed 4 times. What is the probability of exactly 2 heads?",
      options: [
        { text: "$\\dfrac{3}{8}$", correct: true, feedback: "$\\binom{4}{2}\\left(\\frac{1}{2}\\right)^4 = \\frac{6}{16} = \\frac{3}{8}$: six arrangements, each with probability $\\frac{1}{16}$." },
        { text: "$\\dfrac{1}{16}$", feedback: "That is one arrangement, such as HHTT. You left out the $\\binom{4}{2} = 6$ ways to place the heads." },
        { text: "$\\dfrac{1}{2}$", feedback: "\"Half the tosses are heads\" is the most likely single outcome, but it is not certain. Only 6 of the 16 paths have exactly 2 heads." },
        { text: "$\\dfrac{1}{4}$", feedback: "Check the count: $\\binom{4}{2} = 6$, not 4." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-2-q2",
      variant: "practice",
      question: "A die is rolled 3 times. What is the probability of getting at least one six?",
      options: [
        { text: "$\\dfrac{91}{216}$", correct: true, feedback: "$1 - \\left(\\frac{5}{6}\\right)^3 = 1 - \\frac{125}{216} = \\frac{91}{216}$." },
        { text: "$\\dfrac{1}{2}$", feedback: "Adding $\\frac{1}{6}$ three times double-counts outcomes with more than one six. Use the complement." },
        { text: "$\\dfrac{75}{216}$", feedback: "That is $P(\\text{exactly one six}) = 3\\cdot\\frac{1}{6}\\cdot\\frac{25}{36}$. \"At least one\" also includes two or three sixes." },
        { text: "$\\dfrac{1}{216}$", feedback: "That is the probability of three sixes." },
      ],
      hint: "The complement of \"at least one six\" is \"no sixes at all\".",
    },
    {
      type: "quiz",
      id: "pr5-2-q3",
      variant: "practice",
      question:
        "A student guesses every answer on a 10-question true/false test. What is the probability of getting at least 9 right?",
      options: [
        { text: "$\\dfrac{11}{1024}$", correct: true, feedback: "$P(9) + P(10) = \\frac{\\binom{10}{9} + \\binom{10}{10}}{2^{10}} = \\frac{10 + 1}{1024}$." },
        { text: "$\\dfrac{10}{1024}$", feedback: "That is exactly 9. \"At least 9\" also includes a perfect 10." },
        { text: "$\\dfrac{2}{1024}$", feedback: "Each count needs its number of paths: there are 10 ways to get exactly 9 right, not one." },
        { text: "$\\dfrac{1}{10}$", feedback: "Guessing is far worse than that. Only 11 of the $2^{10} = 1024$ answer patterns have at least 9 right." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-2-q4",
      variant: "practice",
      question: "For $X \\sim B(5, p)$, which expression equals $P(X \\le 1)$?",
      options: [
        { text: "$q^5 + 5pq^4$", correct: true, feedback: "$P(0) + P(1) = \\binom{5}{0}q^5 + \\binom{5}{1}p\\,q^4$." },
        { text: "$q^5 + pq^4$", feedback: "The $P(1)$ term needs $\\binom{5}{1} = 5$: the one success can come on any of the 5 trials." },
        { text: "$1 - q^5$", feedback: "That is $P(X \\ge 1)$, the complement of $P(X = 0)$." },
        { text: "$5pq^4$", feedback: "That is only $P(X = 1)$. \"At most 1\" also includes zero successes." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-2-q5",
      variant: "concept",
      question: "Why do the probabilities $\\binom{n}{k}p^k q^{n-k}$ for $k = 0, \\ldots, n$ always add up to 1?",
      options: [
        { text: "They are the terms of the expansion of $(q + p)^n$, and $q + p = 1$.", correct: true, feedback: "Exactly. The binomial theorem does the sum, and that's where the distribution gets its name." },
        { text: "Because $\\sum_k \\binom{n}{k} = 1$.", feedback: "That sum is $2^n$, not 1. The powers of $p$ and $q$ are what bring the total down to 1." },
        { text: "They only add to 1 when $p = \\frac{1}{2}$.", feedback: "The total is $(q + p)^n = 1$ for every $p$. You can watch the leaf sum stay at 1 as you move the slider." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-2-q6",
      variant: "practice",
      question: "A pair of dice is thrown 3 times. What is the probability of getting exactly one doublet?",
      options: [
        { text: "$\\dfrac{25}{72}$", correct: true, feedback: "Success = doublet, $p = \\frac{6}{36} = \\frac{1}{6}$. Then $\\binom{3}{1}\\cdot\\frac{1}{6}\\cdot\\left(\\frac{5}{6}\\right)^2 = \\frac{75}{216} = \\frac{25}{72}$." },
        { text: "$\\dfrac{25}{216}$", feedback: "That is one arrangement, doublet on a particular throw. The doublet can come on any of the 3 throws, so multiply by $\\binom{3}{1}$." },
        { text: "$\\dfrac{1}{12}$", feedback: "That is $3 \\times \\frac{1}{36}$, which treats a doublet as one particular pair such as (6,6). Any of the 6 doubles counts, so $p = \\frac{1}{6}$, and the other throws must not be doublets." },
        { text: "$\\dfrac{1}{2}$", feedback: "$3 \\times \\frac{1}{6}$ is the expected number of doublets, not the probability of exactly one." },
      ],
      hint: "One throw of the pair is one trial. How many of the 36 outcomes are doublets?",
    },
    {
      type: "quiz",
      id: "pr5-2-q7",
      variant: "practice",
      question: "A die is rolled $n$ times. What is the smallest $n$ for which $P(\\text{at least one six}) > \\frac{1}{2}$?",
      options: [
        { text: "4", correct: true, feedback: "Need $\\left(\\frac{5}{6}\\right)^n < \\frac{1}{2}$. $\\left(\\frac{5}{6}\\right)^3 \\approx 0.579$ is too big, but $\\left(\\frac{5}{6}\\right)^4 \\approx 0.482$ works. This is de Méré's bet from worked example 2." },
        { text: "3", feedback: "Check: $1 - \\left(\\frac{5}{6}\\right)^3 = \\frac{91}{216} \\approx 0.421$, still below one half." },
        { text: "6", feedback: "$6 \\times \\frac{1}{6} = 1$ is the expected number of sixes, not a probability. Solve $\\left(\\frac{5}{6}\\right)^n < \\frac{1}{2}$ instead." },
        { text: "2", feedback: "$1 - \\frac{25}{36} = \\frac{11}{36}$, well below one half." },
      ],
      hint: "$P(\\text{at least one}) = 1 - q^n$.",
    },
    {
      type: "quiz",
      id: "pr5-2-q8",
      variant: "practice",
      question:
        "An athlete clears each of 8 hurdles with probability 0.9, independently. What is the probability that she knocks down **exactly one** hurdle?",
      options: [
        { text: "$8(0.1)(0.9)^7 \\approx 0.383$", correct: true, feedback: "Success = knock-down, $p = 0.1$, $n = 8$. The one knock-down can be any of the 8 hurdles: $\\binom{8}{1}(0.1)(0.9)^7$." },
        { text: "$(0.1)(0.9)^7 \\approx 0.048$", feedback: "That is one particular hurdle knocked down and the rest cleared. It could be any of the 8, so multiply by $\\binom{8}{1}$." },
        { text: "$8(0.9)(0.1)^7$", feedback: "The powers are swapped: that is exactly one hurdle *cleared*. Knock-downs have probability 0.1, and seven clears give $(0.9)^7$." },
        { text: "$1 - (0.9)^8 \\approx 0.570$", feedback: "That is at least one knock-down. It also includes two, three or more." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-2-q9",
      variant: "practice",
      question:
        "A particle moves one unit right or left with probability $\\frac{1}{2}$ each, independently. What is the probability that after 6 moves it is back at its starting point?",
      options: [
        { text: "$\\dfrac{5}{16}$", correct: true, feedback: "Back at the start means 3 right and 3 left: $\\binom{6}{3}\\left(\\frac{1}{2}\\right)^6 = \\frac{20}{64} = \\frac{5}{16}$." },
        { text: "$\\dfrac{1}{64}$", feedback: "That is one particular sequence, such as RRRLLL. There are $\\binom{6}{3} = 20$ sequences with 3 of each." },
        { text: "$\\dfrac{1}{2}$", feedback: "Right and left are equally likely per move, but ending exactly at 0 needs exactly 3 of each, which happens in only 20 of the 64 sequences." },
        { text: "$\\dfrac{15}{32}$", feedback: "That is $P(X = 2) + P(X = 4) = \\frac{15 + 15}{64}$, which leaves the particle 2 units away. Position 0 needs $2X - 6 = 0$, so $X = 3$." },
      ],
      hint: "With $X$ right moves, the position is $X - (6 - X) = 2X - 6$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "binomial-shape-mean-variance",
  title: "5.3 · Shape, Mean and Variance of the Binomial",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "If a player hits 30% of her shots and takes 10, you would guess \"about 3\" without doing any algebra. That guess is the mean, and it's right. This lesson shows *why* it is $np$, how spread out the results are around it, and what the whole distribution looks like as $n$ and $p$ change.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-distribution-explorer",
        mode: "binomial",
        params: [
          { name: "n", min: 1, max: 30, step: 1, initial: 10 },
          { name: "p", min: 0, max: 1, step: 0.01, initial: 0.3 },
        ],
        showMean: true,
        showSd: true,
        showCdf: true,
        range: { a: 0, b: 3, adjustable: true },
        showFormula: true,
        caption:
          "The wedge marks the mean np, where the bars would balance. The band shows ±σ. The shaded bars are P(0 ≤ X ≤ 3). Set p = 0.5 and look at the symmetry, then slide p towards 0 or 1 and watch a tail stretch out.",
      },
    },
    {
      type: "text",
      content:
        "**The mean via indicators.** You could compute $\\sum k\\binom{n}{k}p^kq^{n-k}$ directly, but there is a far cleaner route. Let $I_j = 1$ if trial $j$ is a success and $0$ otherwise. Then the total number of successes is just the sum of these indicators:",
    },
    { type: "math", latex: "X = I_1 + I_2 + \\cdots + I_n" },
    {
      type: "text",
      content:
        "Each $I_j$ is Bernoulli$(p)$, with mean $p$ and variance $pq$ (5.1). The expectation of a sum is the sum of expectations, always, so",
    },
    { type: "math", latex: "E[X] = E[I_1] + \\cdots + E[I_n] = \\underbrace{p + p + \\cdots + p}_{n} = np" },
    {
      type: "text",
      content:
        "For variance you need more: variances add when the variables are **independent**, and Bernoulli trials are independent by definition. So",
    },
    { type: "math", latex: "\\operatorname{Var}(X) = \\operatorname{Var}(I_1) + \\cdots + \\operatorname{Var}(I_n) = npq, \\qquad \\sigma = \\sqrt{npq}" },
    {
      type: "callout",
      variant: "definition",
      title: "Mean and variance of B(n, p)",
      content:
        "$E[X] = np, \\qquad \\operatorname{Var}(X) = npq, \\qquad \\sigma = \\sqrt{npq}.$\n\nNote that $\\operatorname{Var}(X) = npq < np = E[X]$ whenever $p > 0$, because $q < 1$. For a binomial the variance is always smaller than the mean.",
    },
    {
      type: "text",
      content:
        "**Check against the table from 5.2** ($n = 3$, $p = 0.6$): $E[X] = 0(0.064) + 1(0.288) + 2(0.432) + 3(0.216) = 0.288 + 0.864 + 0.648 = 1.8$. And $np = 3 \\times 0.6 = 1.8$. The shortcut agrees with the long way.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The mean didn't need independence",
      content:
        "Linearity of expectation holds for *any* random variables. Draw 5 cards without replacement: the draws are dependent, but each position is an ace with probability $\\frac{4}{52}$, so the expected number of aces is still $5 \\times \\frac{4}{52} = \\frac{5}{13}$. The variance formula $npq$ would be wrong there, because it relies on independence.",
    },
    {
      type: "text",
      content:
        "**Shape.** Play with the explorer and three facts show up.\n\n**Symmetric at $p = \\frac{1}{2}$.** $P(X = k) = P(X = n - k)$ because $\\binom{n}{k} = \\binom{n}{n-k}$ and $p = q$.\n\n**Skewed otherwise.** For $p < \\frac{1}{2}$ the bars pile up on the left and a tail stretches to the right. For $p > \\frac{1}{2}$ it is the mirror image.\n\n**Spread is largest at $p = \\frac{1}{2}$.** $npq = n\\,p(1 - p) \\le \\frac{n}{4}$, with equality only at $p = \\frac{1}{2}$.",
    },
    {
      type: "text",
      content:
        "**The most likely value (the mode).** Compare neighbouring bars. Dividing $P(X = k)$ by $P(X = k-1)$ and cancelling the factorials leaves",
    },
    {
      type: "math",
      latex:
        "\\frac{P(X = k)}{P(X = k-1)} = \\frac{(n - k + 1)\\,p}{k\\,q} \\ \\ge 1 \\iff (n - k + 1)p \\ge k(1 - p) \\iff k \\le (n + 1)p",
    },
    {
      type: "text",
      content:
        "So the bars keep rising while $k \\le (n+1)p$ and fall after that. For $0 < p < 1$, the mode is $\\lfloor (n+1)p \\rfloor$, the largest integer not exceeding $(n+1)p$. If $(n+1)p$ is itself an integer, the ratio equals 1 there and two neighbouring values tie: $(n+1)p - 1$ and $(n+1)p$. (At the extremes $p = 0$ or $p = 1$ there is only one possible value, $0$ or $n$, so no rule is needed.)",
    },
    {
      type: "table",
      headers: ["$n$", "$p$", "Mean $np$", "$(n+1)p$", "Most likely value(s)"],
      rows: [
        ["10", "0.3", "3", "3.3", "3"],
        ["10", "0.35", "3.5", "3.85", "3"],
        ["9", "0.4", "3.6", "4", "3 and 4 (tie, each ≈ 0.2508)"],
        ["5", "0.5", "2.5", "3", "2 and 3 (tie, each 0.3125)"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: the most likely value is always exactly np",
      content:
        "$np$ is the **mean**, a balance point. It need not be a possible value at all: with $n = 5$, $p = \\frac{1}{2}$, $np = 2.5$ and you can't get 2.5 heads. The **mode** is a whole number within 1 of $np$, found from $(n+1)p$. The two agree when $np$ is a whole number, but not in general.",
    },
    {
      type: "text",
      content:
        "**JEE staple: find n and p from the mean and variance.** Divide the variance by the mean and $n$ cancels:",
    },
    { type: "math", latex: "\\frac{\\operatorname{Var}(X)}{E[X]} = \\frac{npq}{np} = q" },
    {
      type: "text",
      content:
        "**Worked example 1.** A binomial variable has mean 4 and variance 3. Find $n$, $p$ and $P(X = 1)$.\n\n*Step 1.* $q = \\frac{3}{4}$, so $p = \\frac{1}{4}$.\n\n*Step 2.* $np = 4 \\Rightarrow n = 16$.\n\n*Step 3.* $P(X = 1) = \\binom{16}{1}\\left(\\frac{1}{4}\\right)\\left(\\frac{3}{4}\\right)^{15} = 4\\left(\\frac{3}{4}\\right)^{15} \\approx 0.053$.\n\nIt is small because 1 is far below the mean of 4.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Can a binomial variable have mean 3 and variance 4?\n\n$q = \\frac{4}{3} > 1$, which is impossible for a probability. So no. The quick test is that the variance of a binomial must be smaller than its mean.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (JEE style).** For a binomial distribution, the sum of the mean and variance is 24 and their product is 128. Find $n$ and $p$.\n\n*Step 1: treat the mean and variance as two unknown numbers.* Their sum is 24 and their product is 128, so they are the roots of a quadratic:",
    },
    {
      type: "math",
      latex: "t^2 - 24t + 128 = 0 \\iff (t - 16)(t - 8) = 0 \\iff t = 16 \\text{ or } 8",
    },
    {
      type: "text",
      content:
        "*Why this step:* any two numbers with sum $S$ and product $P$ are the roots of $t^2 - St + P = 0$. This avoids juggling $n$, $p$ and $q$ in two messy equations.\n\n*Step 2: decide which root is which.* A binomial's variance is smaller than its mean, so $np = 16$ and $npq = 8$.\n\n*Why this step:* the other assignment, mean 8 and variance 16, would force $q = 2$. The rule from worked example 2 settles it without trial and error.\n\n*Step 3: divide, then back-substitute.*",
    },
    {
      type: "math",
      latex: "q = \\frac{npq}{np} = \\frac{8}{16} = \\frac{1}{2}, \\qquad p = \\frac{1}{2}, \\qquad n = \\frac{16}{1/2} = 32",
    },
    {
      type: "text",
      content:
        "*Check.* $np = 16$, $npq = 32 \\cdot \\frac{1}{2} \\cdot \\frac{1}{2} = 8$. The sum is 24 and the product is 128.",
    },
    {
      type: "text",
      content:
        "**Another route to p: a relation between two probabilities.** Sometimes you are told how two binomial probabilities compare instead of the mean and variance. Write both out with the formula; the $\\binom{n}{k}$ factors and most powers cancel.\n\n**Worked example 4.** $X \\sim B(6, p)$ and $9P(X = 4) = P(X = 2)$. Find $p$.\n\n*Step 1.* $P(X = 4) = \\binom{6}{4}p^4q^2 = 15p^4q^2$ and $P(X = 2) = \\binom{6}{2}p^2q^4 = 15p^2q^4$.\n\n*Step 2.* $9 \\cdot 15p^4q^2 = 15p^2q^4$. Divide both sides by $15p^2q^2$ (neither $p$ nor $q$ is 0): $9p^2 = q^2$.\n\n*Step 3.* Both are positive, so $3p = q = 1 - p$, giving $4p = 1$ and $p = \\frac{1}{4}$.\n\n*Check.* $P(X = 4) = 15 \\cdot \\frac{1}{256} \\cdot \\frac{9}{16}$ and $P(X = 2) = 15 \\cdot \\frac{1}{16} \\cdot \\frac{81}{256}$. The second is $9$ times the first.",
    },
    {
      type: "text",
      content:
        "**Worked example 5.** A fair coin is tossed 100 times. Then $E[X] = 50$, $\\operatorname{Var}(X) = 100 \\cdot \\frac{1}{2} \\cdot \\frac{1}{2} = 25$ and $\\sigma = 5$. Typical runs land within about 5 of 50. Getting 70 heads would be 4 standard deviations out and should make you suspect the coin.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (quality control).** A factory's process makes a defective chip 4% of the time, independently. Chips ship in boxes of 500. How many defectives should a box have on average, how much does that vary, and should a box with 35 defectives worry the manager?\n\n*Step 1: set up the model.* Success = defective, so $X \\sim B(500, 0.04)$.\n\n*Why this step:* a fixed box size, two outcomes per chip, the same 4% for every chip and independent production are exactly the four Bernoulli conditions.\n\n*Step 2: mean, variance, spread.*",
    },
    {
      type: "math",
      latex:
        "E[X] = 500 \\times 0.04 = 20, \\qquad \\operatorname{Var}(X) = 20 \\times 0.96 = 19.2, \\qquad \\sigma = \\sqrt{19.2} \\approx 4.38",
    },
    {
      type: "text",
      content:
        "*Why this step:* the mean alone says \"about 20\", but it can't say whether 35 is ordinary. The standard deviation gives the yardstick for \"normal wobble\".\n\n*Step 3: measure 35 with that yardstick.* $\\frac{35 - 20}{4.38} \\approx 3.4$ standard deviations above the mean.\n\n*Why this step:* distances in units of $\\sigma$ are comparable across problems. Most boxes land within about 2 standard deviations of the mean, so 3.4 is a red flag. The manager should suspect that $p$ has risen, which means the machine may need checking.",
    },
    {
      type: "quiz",
      id: "pr5-3-q1",
      variant: "practice",
      question: "For $X \\sim B(20, 0.3)$, what are the mean and variance?",
      options: [
        { text: "Mean 6, variance 4.2", correct: true, feedback: "$np = 20(0.3) = 6$ and $npq = 6(0.7) = 4.2$." },
        { text: "Mean 6, variance 1.8", feedback: "$1.8 = np^2$. The variance uses $q$: $npq = 6 \\times 0.7$." },
        { text: "Mean 14, variance 4.2", feedback: "$14 = nq$ counts the expected *failures*." },
        { text: "Mean 6, variance $\\sqrt{4.2}$", feedback: "$\\sqrt{4.2}$ is the standard deviation, not the variance." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-3-q2",
      variant: "practice",
      question: "The mean and variance of a binomial distribution are 4 and 3. What are $n$ and $p$?",
      options: [
        { text: "$n = 16$, $p = \\frac{1}{4}$", correct: true, feedback: "$q = \\frac{3}{4}$ from variance ÷ mean, so $p = \\frac{1}{4}$ and $n = \\frac{4}{1/4} = 16$." },
        { text: "$n = 16$, $p = \\frac{3}{4}$", feedback: "Variance ÷ mean gives $q$, not $p$. Then $np = 12$, not 4." },
        { text: "$n = 12$, $p = \\frac{1}{3}$", feedback: "Check: $npq = 12 \\cdot \\frac{1}{3} \\cdot \\frac{2}{3} = \\frac{8}{3} \\ne 3$." },
        { text: "$n = 7$, $p = \\frac{4}{7}$", feedback: "Adding mean and variance doesn't give $n$. Divide variance by mean instead." },
      ],
      hint: "$\\dfrac{npq}{np} = q$.",
    },
    {
      type: "quiz",
      id: "pr5-3-q7",
      variant: "practice",
      question: "$X \\sim B(6, p)$ and $9P(X = 4) = P(X = 2)$. What is $p$?",
      options: [
        { text: "$\\frac{1}{4}$", correct: true, feedback: "$9 \\cdot 15p^4q^2 = 15p^2q^4 \\Rightarrow 9p^2 = q^2 \\Rightarrow 3p = q = 1 - p \\Rightarrow p = \\frac{1}{4}$." },
        { text: "$\\frac{1}{3}$", feedback: "You reached $3p = q$ and then set $3p = 1$. Remember $q = 1 - p$, so $3p = 1 - p$." },
        { text: "$\\frac{3}{4}$", feedback: "That is $q$, not $p$. From $9p^2 = q^2$ you get $q = 3p$: failure is three times as likely as success, so $p$ is the small one." },
        { text: "$\\frac{1}{10}$", feedback: "That comes from $9p = q$, which skips the square root. $9p^2 = q^2$ gives $3p = q$." },
      ],
      hint: "Write both probabilities with the formula and cancel $15p^2q^2$.",
    },
    {
      type: "quiz",
      id: "pr5-3-q3",
      variant: "concept",
      question: "For $X \\sim B(9, 0.4)$, $np = 3.6$. What is the most likely number of successes?",
      options: [
        { text: "3 and 4 are equally likely, and both beat every other value.", correct: true, feedback: "$(n + 1)p = 10 \\times 0.4 = 4$ is an integer, so $P(X = 3) = P(X = 4) \\approx 0.2508$. The mode is not the mean." },
        { text: "3.6, since the most likely value is $np$.", feedback: "3.6 isn't even a possible count. $np$ is the balance point, not the tallest bar." },
        { text: "4 only, because 3.6 rounds to 4.", feedback: "Rounding the mean is a guess, not a rule. Here 3 ties with 4, as the ratio $\\frac{(n-k+1)p}{kq}$ equals 1 at $k = 4$." },
        { text: "3 only, because you always round down.", feedback: "The ratio test gives a tie between 3 and 4 here." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-3-q4",
      variant: "concept",
      question: "A claim: \"a binomial variable has mean 3 and variance 4\". What is wrong with it?",
      options: [
        { text: "It would need $q = \\frac{4}{3}$, which exceeds 1. A binomial's variance must be less than its mean.", correct: true, feedback: "Right: $npq < np$ since $q < 1$." },
        { text: "Nothing: $n = 9$, $p = \\frac{1}{3}$ works.", feedback: "Check: $npq = 9 \\cdot \\frac{1}{3} \\cdot \\frac{2}{3} = 2$, not 4." },
        { text: "The mean of a binomial must be an integer.", feedback: "The mean $np$ can be any value between 0 and $n$, such as 2.5 or 3.6." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-3-q5",
      variant: "practice",
      question: "With $n = 20$ fixed, which $p$ gives a binomial distribution that is symmetric and as spread out as possible?",
      options: [
        { text: "$p = 0.5$", correct: true, feedback: "At $p = \\frac{1}{2}$, $\\binom{n}{k} = \\binom{n}{n-k}$ makes the bars symmetric, and $npq = 5$ is the maximum possible." },
        { text: "$p = 0.9$", feedback: "That is heavily skewed, with a long tail to the left, and $npq = 1.8$." },
        { text: "$p = 1$", feedback: "Then $X = 20$ every time: variance 0, a single bar." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-3-q6",
      variant: "concept",
      question:
        "Five cards are dealt **without replacement** from a standard deck. What is the expected number of aces?",
      options: [
        { text: "$\\frac{5}{13}$", correct: true, feedback: "Each of the 5 positions is an ace with probability $\\frac{4}{52}$, and expectation adds even for dependent draws: $5 \\cdot \\frac{1}{13}$." },
        { text: "It can't be found, because the draws are not independent.", feedback: "Linearity of expectation needs no independence. Only the variance formula does." },
        { text: "$\\frac{4}{13}$", feedback: "Count the positions: there are 5 draws, each with a $\\frac{1}{13}$ chance of being an ace." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-3-q8",
      variant: "practice",
      question:
        "For a binomial distribution, the mean plus the variance is 15 and the mean times the variance is 50. What are $n$ and $p$?",
      options: [
        { text: "$n = 20$, $p = \\frac{1}{2}$", correct: true, feedback: "Mean and variance are the roots of $t^2 - 15t + 50 = 0$, that is 10 and 5. The mean is the larger: $np = 10$, $npq = 5$, so $q = \\frac{1}{2}$ and $n = 20$." },
        { text: "$n = 10$, $p = \\frac{1}{2}$", feedback: "That gives mean 5 and variance 2.5: their sum is 7.5, not 15. The mean must be the *larger* root, 10." },
        { text: "$n = 30$, $p = \\frac{1}{3}$", feedback: "The mean is 10, but the variance is $30 \\cdot \\frac{1}{3} \\cdot \\frac{2}{3} = \\frac{20}{3}$, not 5. Get $q$ from variance ÷ mean." },
        { text: "No such binomial exists.", feedback: "Assigning mean 5 and variance 10 would be impossible, but the other way round, mean 10 and variance 5, works fine." },
      ],
      hint: "Mean and variance are the roots of $t^2 - 15t + 50 = 0$. Which one must be the mean?",
    },
    {
      type: "quiz",
      id: "pr5-3-q9",
      variant: "practice",
      question:
        "A binomial variable has mean 2 and variance $\\frac{4}{3}$. What is $P(X \\ge 1)$?",
      options: [
        { text: "$\\dfrac{665}{729}$", correct: true, feedback: "$q = \\frac{4/3}{2} = \\frac{2}{3}$, $p = \\frac{1}{3}$, $n = 6$. Then $P(X \\ge 1) = 1 - \\left(\\frac{2}{3}\\right)^6 = 1 - \\frac{64}{729}$." },
        { text: "$\\dfrac{64}{729}$", feedback: "That is $P(X = 0) = q^6$. \"At least one\" is its complement." },
        { text: "$\\dfrac{26}{27}$", feedback: "That is $1 - \\left(\\frac{1}{3}\\right)^3$: it swaps $p$ and $q$ and uses the wrong $n$. Variance ÷ mean gives $q = \\frac{2}{3}$, and then $n = \\frac{2}{1/3} = 6$." },
        { text: "$\\dfrac{2}{3}$", feedback: "That is $q$. Find $n$ as well, then use $1 - q^n$." },
      ],
      hint: "First find $q$, $p$ and $n$, then use $P(X \\ge 1) = 1 - q^n$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "geometric-distribution",
  title: "5.4 · Waiting for the First Success: Geometric",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "In a board game you need a six to start. How many rolls will it take? Now the question has changed. The number of trials is no longer fixed. You keep going until the first success, and the thing you count is **how long you waited**.",
    },
    {
      type: "text",
      content:
        "The tree for this is lopsided. A success ends the story, so only the failure branch grows another level. Here a success has probability 0.2 on each trial.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        root: {
          label: "start",
          children: [
            { label: "S", prob: 0.2 },
            {
              label: "F",
              prob: 0.8,
              children: [
                { label: "S", prob: 0.2 },
                {
                  label: "F",
                  prob: 0.8,
                  children: [
                    { label: "S", prob: 0.2 },
                    { label: "F", prob: 0.8 },
                  ],
                },
              ],
            },
          ],
        },
        highlight: { label: "no success in 3 trials", latex: "X > 3", leaves: ["1.1.1"] },
        caption:
          "Each leaf ending in S is \"first success on trial k\": 0.2, then 0.8 × 0.2, then 0.8² × 0.2. The shaded leaf is three failures in a row, with probability 0.8³ = 0.512.",
      },
    },
    {
      type: "text",
      content:
        "**Deriving the pmf.** For the first success to land on trial $k$, the path must be $k - 1$ failures followed by one success. There is exactly **one** such path, so no $\\binom{n}{k}$ factor appears:",
    },
    { type: "math", latex: "P(X = k) = q^{k-1}p, \\qquad k = 1, 2, 3, \\ldots" },
    {
      type: "callout",
      variant: "definition",
      title: "Geometric distribution",
      content:
        "If $X$ is the number of the trial on which the first success occurs in independent trials with success probability $p$, then $X$ has the **geometric distribution** above.\n\nThe probabilities shrink by the factor $q$ at every step, like a geometric progression, and that is where the name comes from.",
    },
    {
      type: "text",
      content:
        "**They add to 1.** It's a geometric series with first term $p$ and ratio $q$:",
    },
    { type: "math", latex: "\\sum_{k=1}^{\\infty} q^{k-1}p = \\frac{p}{1 - q} = \\frac{p}{p} = 1" },
    {
      type: "text",
      content:
        "**The tail: $P(X > k) = q^k$.** \"The first success comes *after* trial $k$\" means \"the first $k$ trials all failed\", and that is a single path with probability $q^k$. You don't need to sum a series. Try it for waiting for a six:",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "(5/6)^x",
        exprLatex: "P(X > k) = \\left(\\tfrac{5}{6}\\right)^{k}",
        min: 0,
        max: 40,
        step: 1,
        initial: 4,
        inputLabel: "Rolls so far (k)",
        outputLabel: "P(still no six)",
      },
    },
    {
      type: "text",
      content:
        "Find the first $k$ where the output drops below 0.1. That is how many rolls you need to be 90% sure of at least one six. You should land on $k = 13$: $(5/6)^{12} \\approx 0.112$ but $(5/6)^{13} \\approx 0.093$. Algebraically, $\\left(\\frac{5}{6}\\right)^k < 0.1 \\iff k > \\frac{\\ln 10}{\\ln 1.2} \\approx 12.6$.",
    },
    {
      type: "text",
      content:
        "**The mean: $E[X] = \\frac{1}{p}$, by first-step analysis.** Look at the first trial. With probability $p$ it succeeds and you waited exactly 1. With probability $q$ it fails, you have used 1 trial, and you face *the same problem from scratch*, which takes $E[X]$ more trials on average:",
    },
    {
      type: "math",
      latex:
        "E[X] = p \\cdot 1 + q\\,(1 + E[X]) \\ \\Longrightarrow\\ E[X](1 - q) = 1 \\ \\Longrightarrow\\ E[X] = \\frac{1}{p}",
    },
    {
      type: "text",
      content:
        "So you expect 6 rolls to see a six, and 2 tosses to see a head. That matches intuition: if one trial in five succeeds, you wait about five trials. (The variance is $\\frac{q}{p^2}$. It is quoted here, not derived.)",
    },
    {
      type: "interactive",
      config: {
        component: "prob-distribution-explorer",
        mode: "geometric",
        params: [{ name: "p", min: 0.05, max: 1, step: 0.01, initial: 0.2 }],
        maxK: 20,
        showMean: true,
        showSd: true,
        showCdf: true,
        caption:
          "The tallest bar is always k = 1. Each bar is q times the one before it. The mean 1/p sits well to the right of the peak because of the long tail. Lower p and watch the tail stretch.",
      },
    },
    {
      type: "callout",
      variant: "info",
      title: "Two conventions",
      content:
        "Some books let $Y$ count the **failures before** the first success, so $Y = X - 1$, $P(Y = k) = q^k p$ for $k = 0, 1, 2, \\ldots$, and $E[Y] = \\frac{q}{p}$. Read the question carefully to see which one is meant. In this course $X$ counts trials, starting at 1.",
    },
    {
      type: "text",
      content:
        "**Memorylessness.** Suppose you have already failed $m$ times. What is the chance you need more than $n$ further trials?",
    },
    {
      type: "math",
      latex:
        "P(X > m + n \\mid X > m) = \\frac{P(X > m + n)}{P(X > m)} = \\frac{q^{m+n}}{q^m} = q^n = P(X > n)",
    },
    {
      type: "text",
      content:
        "The past failures have vanished from the answer. Someone who has already failed $m$ times is in exactly the same position as someone starting fresh. The process has no memory, because each trial is independent of everything before it.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"after 10 misses, a success is due\"",
      content:
        "This is the gambler's fallacy from Chapter 0, and memorylessness is the proof that it is wrong. With $p = 0.2$, after 10 misses in a row the next trial still succeeds with probability $0.2$, and the expected *remaining* wait is still $\\frac{1}{p} = 5$. The sequence doesn't owe you anything. The long-run proportion settles on $p$ because early streaks get diluted by later trials, not because they get compensated.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** A die is rolled until a six appears. Find the probability that the first six comes on the 4th roll.\n\n*Step 1.* Three failures then a success: one path.\n\n*Step 2.* $P(X = 4) = \\left(\\frac{5}{6}\\right)^3 \\cdot \\frac{1}{6} = \\frac{125}{1296} \\approx 0.0965$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (a classic).** A and B take turns rolling a die, A first. The first to roll a six wins. Find $P(\\text{A wins})$. (You solved this in Lesson 2.5. Here it is again, now seen as a geometric waiting time split between two players.)\n\n*Step 1.* A wins on roll 1, 3, 5, … of the combined sequence. Those probabilities are $\\frac{1}{6}$, $\\left(\\frac{5}{6}\\right)^2\\frac{1}{6}$, $\\left(\\frac{5}{6}\\right)^4\\frac{1}{6}$, and so on.\n\n*Step 2.* That's a geometric series with ratio $\\left(\\frac{5}{6}\\right)^2 = \\frac{25}{36}$:\n\n$P(\\text{A wins}) = \\dfrac{1/6}{1 - 25/36} = \\dfrac{1}{6} \\cdot \\dfrac{36}{11} = \\dfrac{6}{11}$.\n\nGoing first is worth something: $\\frac{6}{11} \\approx 0.545$ against $\\frac{5}{11}$ for B.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Two dice are rolled repeatedly until the sum is 7. On average, how many rolls does that take?\n\n$p = P(\\text{sum } 7) = \\frac{6}{36} = \\frac{1}{6}$, so $E[X] = 6$ rolls.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (sales calls).** A telemarketer makes a sale on each call with probability $0.1$, independently. (a) How many calls should she expect to make up to and including her first sale? (b) What is the probability that her first sale comes within her first 5 calls?\n\n*Step 1: spot the model.* She keeps calling *until* the first sale, so the number of calls $X$ is geometric with $p = 0.1$.\n\n*Why this step:* no fixed $n$ is given, and the question asks about a waiting time. That is the geometric signature, not the binomial one.\n\n*Step 2: the mean.* $E[X] = \\frac{1}{p} = \\frac{1}{0.1} = 10$ calls.\n\n*Step 3: \"within 5\" through the tail.* \"First sale within 5 calls\" is $X \\le 5$, the complement of $X > 5$, and $X > 5$ means the first 5 calls all failed:",
    },
    {
      type: "math",
      latex: "P(X \\le 5) = 1 - P(X > 5) = 1 - (0.9)^5 = 1 - 0.59049 = 0.40951 \\approx 0.41",
    },
    {
      type: "text",
      content:
        "*Why this step:* adding $P(X = 1) + \\cdots + P(X = 5)$ would take five terms. The tail $q^k$ is a single path, so the complement does it in one line.\n\nNotice the gap between the two answers: she *expects* to need 10 calls, yet has only about a 41% chance of a sale within 5. The long right tail of the geometric pulls the mean well past the typical early values.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (CBSE/JEE classic: unequal targets).** A and B throw a pair of dice alternately, A first. A wins if he throws a sum of 6 before B throws a sum of 7, and B wins if he throws a 7 first. Find the probability that A wins.\n\n*Step 1: each player's success probability.* Sum 6 comes from $(1,5), (2,4), (3,3), (4,2), (5,1)$, so $p_A = \\frac{5}{36}$. Sum 7 has 6 outcomes, so $p_B = \\frac{6}{36} = \\frac{1}{6}$.\n\n*Why this step:* unlike worked example 2, the two players are chasing different events. Each needs his own $p$.\n\n*Step 2: one full round with no winner.* A misses and then B misses:",
    },
    {
      type: "math",
      latex: "r = \\frac{31}{36} \\cdot \\frac{5}{6} = \\frac{155}{216}",
    },
    {
      type: "text",
      content:
        "*Why this step:* A can only win on his own turns, and to reach his next turn a whole round must pass with no winner. So the successive terms shrink by the factor $r$ each round, which gives a geometric series.\n\n*Step 3: sum the series.*",
    },
    {
      type: "math",
      latex:
        "P(\\text{A wins}) = \\frac{5}{36}\\left(1 + r + r^2 + \\cdots\\right) = \\frac{5/36}{1 - 155/216} = \\frac{5}{36} \\cdot \\frac{216}{61} = \\frac{30}{61} \\approx 0.492",
    },
    {
      type: "text",
      content:
        "Going first is not quite enough here. A's target is harder to hit ($\\frac{5}{36} < \\frac{6}{36}$), and that outweighs the head start, so A is a slight underdog.",
    },
    {
      type: "quiz",
      id: "pr5-4-q1",
      variant: "practice",
      question: "A fair coin is tossed until the first head. What is the probability that the first head comes on the 3rd toss?",
      options: [
        { text: "$\\dfrac{1}{8}$", correct: true, feedback: "T, T, H: $\\left(\\frac{1}{2}\\right)^2 \\cdot \\frac{1}{2} = \\frac{1}{8}$." },
        { text: "$\\dfrac{3}{8}$", feedback: "That uses $\\binom{3}{1}$, but the head's position is forced: it must be last. There is only one path." },
        { text: "$\\dfrac{1}{2}$", feedback: "That's the probability that any single toss is a head. The first two must also be tails." },
        { text: "$\\dfrac{1}{4}$", feedback: "$\\frac{1}{4}$ is the probability that the first head comes on toss 2." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-4-q2",
      variant: "concept",
      question:
        "A shooter hits with probability 0.2 on each independent shot. She has just missed 10 in a row. What is the probability she hits on the next shot?",
      options: [
        { text: "0.2", correct: true, feedback: "Independence means the history is irrelevant. Memorylessness says the same about the whole remaining wait." },
        { text: "Higher than 0.2, because a hit is due after so many misses.", feedback: "That is the gambler's fallacy. Nothing in the model lets past misses change $p$." },
        { text: "$1 - 0.8^{11}$", feedback: "That is the probability of at least one hit in 11 shots, *before* any shots were taken. Given 10 misses have already happened, only one shot remains in question." },
        { text: "Lower than 0.2, because she is clearly on a bad run.", feedback: "In a real person, form might change, but then the trials are no longer Bernoulli. In the model, $p$ stays at 0.2." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-4-q3",
      variant: "practice",
      question: "A and B take turns rolling a die, A first. The first to roll a six wins. What is $P(\\text{A wins})$?",
      options: [
        { text: "$\\dfrac{6}{11}$", correct: true, feedback: "$\\frac{1/6}{1 - (5/6)^2} = \\frac{1/6}{11/36} = \\frac{6}{11}$." },
        { text: "$\\dfrac{1}{2}$", feedback: "The game isn't fair. A gets the first chance, so A's probability is higher." },
        { text: "$\\dfrac{1}{6}$", feedback: "That is only A winning on the very first roll. A can also win on turns 3, 5, 7, …" },
        { text: "$\\dfrac{5}{11}$", feedback: "That is B's probability." },
      ],
      hint: "A wins on rolls 1, 3, 5, … of the combined sequence. Sum the geometric series with ratio $(5/6)^2$.",
    },
    {
      type: "quiz",
      id: "pr5-4-q4",
      variant: "practice",
      question: "With $p = 0.2$, what is $P(X > 5)$, the probability that the first success comes after the 5th trial?",
      options: [
        { text: "$0.8^5 \\approx 0.328$", correct: true, feedback: "The first 5 trials must all fail: one path, $q^5$." },
        { text: "$0.8^4 \\times 0.2 \\approx 0.082$", feedback: "That's $P(X = 5)$, the first success exactly on trial 5." },
        { text: "$1 - 0.8^5 \\approx 0.672$", feedback: "That is $P(X \\le 5)$, at least one success in the first 5." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-4-q5",
      variant: "concept",
      question:
        "You are rolling a die until a six appears, and the first 4 rolls were not sixes. From now on, what is the expected number of **further** rolls?",
      options: [
        { text: "6", correct: true, feedback: "Memorylessness: the remaining wait is geometric with $p = \\frac{1}{6}$ again, so its mean is 6." },
        { text: "2, because you expect 6 in total and have used 4.", feedback: "The past rolls earn no credit. $P(X > 4 + n \\mid X > 4) = P(X > n)$." },
        { text: "10", feedback: "That's the expected *total* count including the 4 already rolled: $4 + 6$. The question asks for further rolls." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-4-q6",
      variant: "practice",
      question:
        "A salesperson closes a deal on each visit with probability 0.25, independently. What is the probability that the first deal comes within the first 3 visits?",
      options: [
        { text: "$1 - (0.75)^3 = \\dfrac{37}{64}$", correct: true, feedback: "\"Within 3\" is the complement of \"the first 3 visits all fail\", which is one path with probability $q^3 = \\frac{27}{64}$." },
        { text: "$(0.75)^2(0.25) = \\dfrac{9}{64}$", feedback: "That is the first deal on *exactly* visit 3. Within 3 also includes visits 1 and 2." },
        { text: "$(0.75)^3 = \\dfrac{27}{64}$", feedback: "That is $P(X > 3)$, no deal in the first 3 visits. The question asks for its complement." },
        { text: "$3 \\times 0.25 = \\dfrac{3}{4}$", feedback: "Adding $p$ three times overcounts, because it ignores the fact that an earlier deal ends the wait. Use $1 - q^3$." },
      ],
      hint: "$P(X \\le k) = 1 - P(X > k) = 1 - q^k$.",
    },
    {
      type: "quiz",
      id: "pr5-4-q7",
      variant: "practice",
      question:
        "A, B and C take turns rolling a die in that order, A first, and the first to roll a six wins. What is the probability that A wins?",
      options: [
        { text: "$\\dfrac{36}{91}$", correct: true, feedback: "A wins on turn 1, or after a full round of three misses, and so on. $P = \\frac{1/6}{1 - (5/6)^3} = \\frac{1/6}{91/216} = \\frac{36}{91}$." },
        { text: "$\\dfrac{1}{3}$", feedback: "Three players, but the game isn't symmetric: A always gets the first chance, so A's share is more than a third." },
        { text: "$\\dfrac{6}{11}$", feedback: "That is the two-player answer. With three players, a full round is three misses, so the ratio is $\\left(\\frac{5}{6}\\right)^3$, not $\\left(\\frac{5}{6}\\right)^2$." },
        { text: "$\\dfrac{1}{6}$", feedback: "That is only A's first roll. If all three miss, A gets another chance." },
      ],
      hint: "Between two of A's turns, all three players must miss. What is the common ratio?",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "glimpse-of-poisson",
  title: "5.5 · Rare Events: A Glimpse of Poisson",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A careful typist makes on average 2 typos per page. A help desk gets on average 3 calls a minute. In both cases there are a huge number of tiny opportunities for the event (every character, every second), each with a tiny probability, and we count how many happen.\n\nThat is a binomial with a large $n$ and a small $p$. The exact $n$ and $p$ are unknown and don't really matter. The only number we know is the average, $\\lambda = np$.",
    },
    {
      type: "text",
      content:
        "So fix $\\lambda$ and let $n$ grow with $p = \\frac{\\lambda}{n}$. Watch what happens to $B\\!\\left(n, \\frac{\\lambda}{n}\\right)$:",
    },
    {
      type: "interactive",
      config: {
        component: "prob-distribution-explorer",
        mode: "binomial-vs-poisson",
        params: [
          { name: "n", min: 2, max: 100, step: 1, initial: 10 },
          { name: "lambda", min: 0.5, max: 8, step: 0.1, initial: 2 },
        ],
        showMean: true,
        showFormula: true,
        caption:
          "Bars are Binomial(n, λ/n). Dots are the Poisson(λ) limit. Push n from 10 towards 100 and watch the biggest gap shrink. The binomial settles onto a fixed shape that depends on λ alone.",
      },
    },
    {
      type: "text",
      content:
        "**Where the formula comes from.** Write the binomial term with $p = \\frac{\\lambda}{n}$ and split it into four pieces:",
    },
    {
      type: "math",
      latex:
        "\\binom{n}{k}\\left(\\frac{\\lambda}{n}\\right)^{k}\\left(1 - \\frac{\\lambda}{n}\\right)^{n-k} = \\underbrace{\\frac{n(n-1)\\cdots(n-k+1)}{n^k}}_{\\to\\,1} \\cdot \\frac{\\lambda^k}{k!} \\cdot \\underbrace{\\left(1 - \\frac{\\lambda}{n}\\right)^{n}}_{\\to\\,e^{-\\lambda}} \\cdot \\underbrace{\\left(1 - \\frac{\\lambda}{n}\\right)^{-k}}_{\\to\\,1}",
    },
    {
      type: "text",
      content:
        "For fixed $k$, the first piece is $1 \\cdot \\left(1 - \\frac{1}{n}\\right)\\cdots\\left(1 - \\frac{k-1}{n}\\right) \\to 1$. The third is the standard limit $\\left(1 + \\frac{x}{n}\\right)^n \\to e^x$ with $x = -\\lambda$. The last has a fixed power of something tending to 1. What survives is:",
    },
    { type: "math", latex: "P(X = k) = \\frac{e^{-\\lambda}\\lambda^k}{k!}, \\qquad k = 0, 1, 2, \\ldots" },
    {
      type: "callout",
      variant: "definition",
      title: "Poisson distribution",
      content:
        "A count $X$ with the probabilities above has the **Poisson distribution** with parameter $\\lambda$. It models counts of rare, independent events over a stretch of time or space, where $\\lambda$ is the average count. It is the limit of $B(n, p)$ as $n \\to \\infty$ with $np = \\lambda$ held fixed.",
    },
    {
      type: "text",
      content:
        "**Mean and variance from the limit.** The binomial has mean $np = \\lambda$ and variance $npq = \\lambda\\left(1 - \\frac{\\lambda}{n}\\right) \\to \\lambda$. So for Poisson",
    },
    { type: "math", latex: "E[X] = \\lambda, \\qquad \\operatorname{Var}(X) = \\lambda" },
    {
      type: "text",
      content:
        "The probabilities add to 1 as well: $\\sum_k \\frac{\\lambda^k}{k!} = e^{\\lambda}$ is the exponential series, and it cancels the $e^{-\\lambda}$ in front.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: Poisson is a separate formula to memorise",
      content:
        "Poisson is the binomial with the details blurred out. Each piece of $\\frac{e^{-\\lambda}\\lambda^k}{k!}$ has a source: $\\frac{\\lambda^k}{k!}$ comes from $\\binom{n}{k}p^k$, and $e^{-\\lambda}$ is the limit of $q^n$, the probability of no events. If you remember the derivation, you can't forget the formula, and you know when it applies: many independent chances, each rare.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Typos average 2 per page. For a random page:\n\n*No typos:* $P(0) = e^{-2} \\approx 0.135$.\n\n*At most one:* $P(0) + P(1) = e^{-2}(1 + 2) = 3e^{-2} \\approx 0.406$.\n\n*At least two:* $1 - 3e^{-2} \\approx 0.594$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (checking the approximation).** 1% of items are defective. In a box of 200, find $P(\\text{no defectives})$.\n\n*Exact binomial:* $(0.99)^{200} \\approx 0.1340$.\n\n*Poisson with $\\lambda = 200 \\times 0.01 = 2$:* $e^{-2} \\approx 0.1353$.\n\nThey agree to two decimal places, and the Poisson is much easier to compute by hand.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** A help desk receives on average 3 calls a minute. The probability of exactly 2 calls in a given minute is $\\frac{e^{-3}3^2}{2!} = 4.5e^{-3} \\approx 0.224$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a health screening).** A rare condition affects 1 person in 1000. A town screens 3000 people. Find the probability that at least 2 cases are found.\n\n*Step 1: recognise the binomial, then pass to Poisson.* Strictly $X \\sim B(3000, 0.001)$. Here $n$ is large, $p$ is tiny and $\\lambda = np = 3$ is moderate.\n\n*Why this step:* the exact binomial would need $(0.999)^{3000}$ and $(0.999)^{2999}$ by hand. The Poisson limit replaces all of that with $e^{-3}$.\n\n*Step 2: \"at least 2\" through the complement.*",
    },
    {
      type: "math",
      latex:
        "P(X \\ge 2) = 1 - P(0) - P(1) = 1 - e^{-3}\\left(1 + 3\\right) = 1 - 4e^{-3} \\approx 1 - 0.199 = 0.801",
    },
    {
      type: "text",
      content:
        "*Why this step:* \"at least 2\" has no upper limit under Poisson, so a direct sum would never end. The complement has just two terms.\n\n*Check.* The exact binomial answer is also $0.801$ to three decimal places. The approximation is excellent because $p = 0.001$ is so small.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style).** A Poisson variable $X$ satisfies $P(X = 1) = P(X = 2)$. Find $\\lambda$ and $P(X = 0)$.\n\n*Step 1: write both sides with the formula.*",
    },
    {
      type: "math",
      latex: "\\frac{e^{-\\lambda}\\lambda^1}{1!} = \\frac{e^{-\\lambda}\\lambda^2}{2!} \\iff \\lambda = \\frac{\\lambda^2}{2}",
    },
    {
      type: "text",
      content:
        "*Why this step:* $e^{-\\lambda}$ is never zero, so it cancels from both sides. What is left is a simple equation in $\\lambda$.\n\n*Step 2: solve.* Divide by $\\lambda$, which is allowed because $\\lambda > 0$: $1 = \\frac{\\lambda}{2}$, so $\\lambda = 2$.\n\n*Why this step:* $\\lambda = 0$ also solves $\\lambda = \\frac{\\lambda^2}{2}$, but a Poisson rate must be positive. Say so in one line in an exam answer.\n\n*Step 3.* $P(X = 0) = e^{-2} \\approx 0.135$.\n\nThe tie makes sense: the ratio of neighbouring Poisson terms is $\\frac{P(k)}{P(k-1)} = \\frac{\\lambda}{k}$, which equals 1 exactly when $k = \\lambda$. This is the Poisson version of the mode rule from 5.3.",
    },
    {
      type: "table",
      headers: ["", "Binomial $B(n, p)$", "Poisson$(\\lambda)$"],
      rows: [
        ["Counts", "successes in $n$ fixed trials", "events in a stretch of time or space"],
        ["Values", "$0, 1, \\ldots, n$", "$0, 1, 2, \\ldots$ (no upper limit)"],
        ["Mean", "$np$", "$\\lambda$"],
        ["Variance", "$npq$ (less than the mean)", "$\\lambda$ (equal to the mean)"],
        ["Use Poisson for binomial when", "", "$n$ large, $p$ small, $np$ moderate"],
      ],
    },
    {
      type: "quiz",
      id: "pr5-5-q1",
      variant: "concept",
      question: "How is the Poisson distribution related to the binomial?",
      options: [
        { text: "It is the limit of $B(n, p)$ as $n \\to \\infty$ and $p \\to 0$ with $np = \\lambda$ fixed.", correct: true, feedback: "Right. That is why its mean is $\\lambda = np$ and its variance is the limit of $npq$." },
        { text: "It is unrelated: a separate empirical formula that happens to fit data.", feedback: "It is derived, not observed. $\\frac{\\lambda^k}{k!}$ comes from $\\binom{n}{k}p^k$ and $e^{-\\lambda}$ from $q^n$." },
        { text: "It is the binomial with $p = \\frac{1}{2}$.", feedback: "The opposite: Poisson is for small $p$. With $p = \\frac{1}{2}$ events aren't rare." },
        { text: "It is the geometric distribution for large $n$.", feedback: "Geometric counts trials until the first success. Poisson counts how many rare events happen." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-5-q2",
      variant: "practice",
      question: "A page has on average 2 typos, modelled as Poisson. What is the probability that a page has no typos?",
      options: [
        { text: "$e^{-2} \\approx 0.135$", correct: true, feedback: "$P(0) = \\frac{e^{-2}2^0}{0!} = e^{-2}$." },
        { text: "$0$", feedback: "An average of 2 doesn't rule out a clean page. Poisson gives every count a positive probability." },
        { text: "$2e^{-2} \\approx 0.271$", feedback: "That's $P(X = 1)$." },
        { text: "$\\frac{1}{2}$", feedback: "Nothing here gives $\\frac{1}{2}$. Substitute $k = 0$ into $\\frac{e^{-\\lambda}\\lambda^k}{k!}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-5-q3",
      variant: "practice",
      question: "Which binomial is best approximated by Poisson(3)?",
      options: [
        { text: "$B(300, 0.01)$", correct: true, feedback: "Large $n$, small $p$, and $np = 3$: the Poisson limit applies." },
        { text: "$B(6, 0.5)$", feedback: "$np = 3$, but $n$ is small and $p$ is large. The variance $1.5$ is far from 3." },
        { text: "$B(30, 0.9)$", feedback: "$np = 27$, and success is common, not rare." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-5-q4",
      variant: "practice",
      question: "Calls arrive at an average rate of 3 per minute (Poisson). What is $P(\\text{exactly 2 calls in a minute})$?",
      options: [
        { text: "$\\dfrac{9}{2}e^{-3} \\approx 0.224$", correct: true, feedback: "$\\frac{e^{-3}3^2}{2!} = 4.5e^{-3}$." },
        { text: "$9e^{-3} \\approx 0.448$", feedback: "You forgot the $k! = 2$ in the denominator." },
        { text: "$e^{-2} \\approx 0.135$", feedback: "That uses $\\lambda = 2$. The rate is $\\lambda = 3$ and $k = 2$ is the count." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-5-q5",
      variant: "concept",
      question: "A Poisson variable has variance 4. What is its standard deviation, and what is its mean?",
      options: [
        { text: "Standard deviation 2, mean 4", correct: true, feedback: "For Poisson the mean equals the variance, $\\lambda = 4$, and $\\sigma = \\sqrt{4} = 2$." },
        { text: "Standard deviation 4, mean 4", feedback: "4 is the variance. The standard deviation is its square root." },
        { text: "Standard deviation 2, mean 2", feedback: "The *mean* equals the variance, not the standard deviation." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-5-q6",
      variant: "concept",
      question:
        "For $X \\sim B(10, 0.3)$, the exact $P(X = 0) = 0.7^{10} \\approx 0.028$. Poisson(3), with the same mean, gives $e^{-3} \\approx 0.050$. Why is the approximation so poor here?",
      options: [
        { text: "$p = 0.3$ is not small, so the events aren't rare and the limit hasn't kicked in.", correct: true, feedback: "Right. The Poisson limit needs $p \\to 0$. Here $q^n = 0.7^{10}$ is far from $e^{-np}$, and the binomial variance $npq = 2.1$ is well below Poisson's $\\lambda = 3$." },
        { text: "The means don't match.", feedback: "They do: $np = 10 \\times 0.3 = 3 = \\lambda$. Matching the mean is necessary but not enough." },
        { text: "Poisson can never be used when $n$ is as small as 10.", feedback: "Small $n$ is part of the problem, but the real requirement is a small $p$. $B(10, 0.01)$ is approximated well by Poisson(0.1)." },
        { text: "The Poisson formula only works for $k \\ge 1$.", feedback: "$k = 0$ is fine: $P(0) = e^{-\\lambda}$. The formula works for every $k$; the approximation is what fails." },
      ],
      hint: "The Poisson limit holds when $n$ is large **and** $p$ is small. Which one fails?",
    },
    {
      type: "quiz",
      id: "pr5-5-q7",
      variant: "practice",
      question: "A Poisson variable satisfies $P(X = 2) = P(X = 3)$. What is $\\lambda$?",
      options: [
        { text: "3", correct: true, feedback: "$\\frac{e^{-\\lambda}\\lambda^2}{2} = \\frac{e^{-\\lambda}\\lambda^3}{6}$. Cancel $e^{-\\lambda}\\lambda^2$: $\\frac{1}{2} = \\frac{\\lambda}{6}$, so $\\lambda = 3$." },
        { text: "2", feedback: "With $\\lambda = 2$, $\\frac{P(3)}{P(2)} = \\frac{\\lambda}{3} = \\frac{2}{3}$, so they are not equal. $P(k-1)$ and $P(k)$ tie when $\\lambda = k$, and here $k = 3$." },
        { text: "1.5", feedback: "Check: with $\\lambda = 1.5$, $\\frac{P(3)}{P(2)} = \\frac{\\lambda}{3} = 0.5$, so $P(3)$ is only half of $P(2)$." },
        { text: "6", feedback: "$\\frac{\\lambda}{6} = \\frac{1}{2}$ gives $\\lambda = 3$, not 6." },
      ],
      hint: "Cancel $e^{-\\lambda}$ and $\\lambda^2$ from both sides.",
    },
    {
      type: "quiz",
      id: "pr5-5-q8",
      variant: "practice",
      question:
        "1 bulb in 500 is faulty. Using the Poisson approximation, what is the probability that a carton of 1000 bulbs contains exactly 3 faulty ones?",
      options: [
        { text: "$\\dfrac{4}{3}e^{-2} \\approx 0.180$", correct: true, feedback: "$\\lambda = 1000 \\times \\frac{1}{500} = 2$, and $\\frac{e^{-2}2^3}{3!} = \\frac{8}{6}e^{-2}$. The exact binomial gives $0.1806$, almost identical." },
        { text: "$8e^{-2} \\approx 1.083$", feedback: "That is bigger than 1, a sure sign something is missing: divide by $3! = 6$." },
        { text: "$\\dfrac{e^{-3}3^2}{2!} \\approx 0.224$", feedback: "That swaps $\\lambda$ and $k$. The rate is $\\lambda = np = 2$ and the count is $k = 3$." },
        { text: "$e^{-2} \\approx 0.135$", feedback: "That is $P(0)$, a carton with no faulty bulbs." },
      ],
      hint: "First find $\\lambda = np$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "choosing-the-right-model",
  title: "5.6 · Choosing the Right Model",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Formulas are the easy part. The mark is usually won or lost on the first line: **which model does this story fit?** Pick the wrong one and every later step is wasted. This lesson is a checklist and plenty of practice using it.",
    },
    {
      type: "table",
      headers: ["Ask", "If yes", "Model", "$P(X = k)$"],
      rows: [
        ["Fixed $n$, independent yes/no trials, constant $p$?", "Count successes", "Binomial $B(n, p)$", "$\\binom{n}{k}p^kq^{n-k}$"],
        ["Drawing a fixed number from a small population **without replacement**?", "Count one type", "Hypergeometric (plain counting)", "$\\dfrac{\\binom{K}{k}\\binom{N-K}{n-k}}{\\binom{N}{n}}$"],
        ["Repeating until the **first** success?", "Count trials", "Geometric", "$q^{k-1}p$"],
        ["Rare events over time or space, only an average rate known?", "Count events", "Poisson$(\\lambda)$", "$\\dfrac{e^{-\\lambda}\\lambda^k}{k!}$"],
      ],
    },
    {
      type: "text",
      content:
        "The hypergeometric row is just Chapter 1 counting. From $N$ items of which $K$ are \"special\", choose $n$ without replacement. The favourable selections take $k$ from the $K$ special items and $n - k$ from the rest, and every selection is equally likely.",
    },
    {
      type: "text",
      content:
        "Compare the two directly. A bag has 5 red and 3 blue balls. Draw 3 and count the reds. Run it without replacement first, then flip the toggle.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "urn",
        urn: {
          colors: [
            { label: "red", count: 5 },
            { label: "blue", count: 3 },
          ],
          draws: 3,
          replacement: false,
          allowReplacementToggle: true,
          trackColor: "red",
          trackCount: 2,
        },
        batchSizes: [1, 10, 100, 1000],
        caption:
          "Tracked event: exactly 2 reds in 3 draws. Without replacement the reference line is hypergeometric (15/28 ≈ 0.536). With replacement it is binomial (225/512 ≈ 0.439). A bag this small makes the difference easy to see.",
      },
    },
    {
      type: "math",
      latex:
        "\\text{without: } \\frac{\\binom{5}{2}\\binom{3}{1}}{\\binom{8}{3}} = \\frac{10 \\cdot 3}{56} = \\frac{15}{28} \\approx 0.536, \\qquad \\text{with: } \\binom{3}{2}\\left(\\frac{5}{8}\\right)^2\\frac{3}{8} = \\frac{225}{512} \\approx 0.439",
    },
    {
      type: "callout",
      variant: "tip",
      title: "When the difference disappears",
      content:
        "If the population is large compared with the sample (a common rule of thumb: the sample is at most 5% of the population), removing a few items barely changes $p$. Then the hypergeometric and the binomial agree closely, and the binomial is simpler to use. With 8 balls and 3 draws you are nowhere near that, which is why the two lines in the simulator are so far apart.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Five cards are dealt from a well-shuffled deck. Find the probability of exactly 2 aces.\n\n*Model check.* Dealing means without replacement, from a population of only 52. So use plain counting, not binomial.\n\n*Compute.* $\\dfrac{\\binom{4}{2}\\binom{48}{3}}{\\binom{52}{5}} = \\dfrac{6 \\times 17296}{2598960} \\approx 0.0399$.\n\n*The wrong model.* Binomial $\\binom{5}{2}\\left(\\frac{1}{13}\\right)^2\\left(\\frac{12}{13}\\right)^3 \\approx 0.0465$, about 17% too high.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: five stories, sorted.**\n\n*The number of heads in 20 tosses:* fixed $n$, independent, so binomial $B(20, \\frac{1}{2})$.\n\n*The toss on which the first head appears:* geometric, $p = \\frac{1}{2}$.\n\n*Accidents at a junction in a month, averaging 1.5:* rare events in time, so Poisson(1.5).\n\n*Girls on a committee of 4 chosen from 6 girls and 5 boys:* without replacement from 11 people, so plain counting: $P(k) = \\frac{\\binom{6}{k}\\binom{5}{4-k}}{\\binom{11}{4}}$.\n\n*Defective phones among 10 picked from a day's output of 50,000 with a 3% defect rate:* technically without replacement, but the population is huge, so binomial $B(10, 0.03)$ is the sensible model.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (one story, two models).** A student guesses on multiple-choice questions, each with 4 options and one correct answer, so each guess is right with probability $\\frac{1}{4}$, independently.\n\n(a) On a 5-question quiz, what is the probability she gets exactly 3 right?\n\n(b) On a long paper, she guesses question after question. What is the probability that her first correct guess is on question 3, and how many questions does she expect to get through up to her first correct one?\n\n*Step 1: read the question for its model.* Part (a) fixes $n = 5$ and counts correct answers: binomial. Part (b) has no fixed $n$ and asks *when* the first success comes: geometric.\n\n*Why this step:* the setting is identical in both parts, and only the question changes. The model belongs to the question, not to the story.\n\n*Step 2: part (a).*",
    },
    {
      type: "math",
      latex:
        "P(X = 3) = \\binom{5}{3}\\left(\\frac{1}{4}\\right)^3\\left(\\frac{3}{4}\\right)^2 = 10 \\cdot \\frac{1}{64} \\cdot \\frac{9}{16} = \\frac{90}{1024} = \\frac{45}{512} \\approx 0.088",
    },
    {
      type: "text",
      content:
        "*Why this step:* the $\\binom{5}{3}$ is there because the 3 correct answers can be any 3 of the 5 questions.\n\n*Step 3: part (b).* The first correct guess on question 3 means wrong, wrong, right: one path, no $\\binom{n}{k}$.",
    },
    {
      type: "math",
      latex: "P(Y = 3) = \\left(\\frac{3}{4}\\right)^2 \\cdot \\frac{1}{4} = \\frac{9}{64} \\approx 0.141, \\qquad E[Y] = \\frac{1}{p} = 4",
    },
    {
      type: "text",
      content:
        "*Why this step:* here the position of the success is forced (it must be last), which is exactly why the geometric formula has no binomial coefficient.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (CBSE board style).** A lot of 30 bulbs contains 6 defectives. A sample of 4 bulbs is drawn **with replacement**. Find the probability distribution of the number of defective bulbs. Then compare $P(\\text{no defectives})$ with the answer when the sample is drawn without replacement.\n\n*Step 1: check the model.* With replacement, the lot is restored after each draw, so each draw is defective with probability $p = \\frac{6}{30} = \\frac{1}{5}$, independently. So $X \\sim B\\!\\left(4, \\frac{1}{5}\\right)$.\n\n*Why this step:* the phrase \"with replacement\" is the examiner telling you the binomial is exact. Always quote it as your justification.\n\n*Step 2: write the pmf with a common denominator.* $P(X = k) = \\binom{4}{k}\\left(\\frac{1}{5}\\right)^k\\left(\\frac{4}{5}\\right)^{4-k} = \\binom{4}{k}\\frac{4^{4-k}}{625}$.\n\n*Why this step:* the common denominator $5^4 = 625$ makes the table quick to fill and easy to check.",
    },
    {
      type: "table",
      headers: ["$k$ defective", "0", "1", "2", "3", "4"],
      rows: [
        ["$\\binom{4}{k}\\,4^{4-k}$", "$1 \\cdot 256$", "$4 \\cdot 64$", "$6 \\cdot 16$", "$4 \\cdot 4$", "$1 \\cdot 1$"],
        ["$P(X = k)$", "$\\frac{256}{625}$", "$\\frac{256}{625}$", "$\\frac{96}{625}$", "$\\frac{16}{625}$", "$\\frac{1}{625}$"],
      ],
    },
    {
      type: "text",
      content:
        "*Step 3: check.* $256 + 256 + 96 + 16 + 1 = 625$, so the probabilities sum to 1.\n\n*Step 4: the without-replacement contrast.* Now all 4 bulbs must come from the 24 good ones:",
    },
    {
      type: "math",
      latex:
        "\\text{without: } \\frac{\\binom{24}{4}}{\\binom{30}{4}} = \\frac{10626}{27405} \\approx 0.388, \\qquad \\text{with: } \\frac{256}{625} = 0.4096",
    },
    {
      type: "text",
      content:
        "*Why this step:* a sample of 4 from 30 is over 13% of the lot, far above the 5% rule of thumb, so the two models really do differ. Without replacement, each good bulb removed makes the next draw a little more likely to be defective, which is why no-defectives is less likely.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Three red flags",
      content:
        "**\"Until\"** in the question points to geometric, not binomial, because $n$ isn't fixed.\n\n**\"Dealt\", \"selected\", \"a committee is chosen\"** point to without replacement. Check the population size before you reach for $B(n, p)$.\n\n**\"On average … per hour / per page\"** with no $n$ given points to Poisson.",
    },
    {
      type: "text",
      content:
        "**A neat equivalence.** \"The first success comes after trial $k$\" is the same event as \"zero successes in the first $k$ trials\". So $P_{\\text{geo}}(X > k) = P_{\\text{bin}}(\\text{0 successes in } k) = q^k$. Both models give the same number for this one event. They part ways as soon as you ask about the expected wait or the first success landing on a particular trial, where only the geometric model applies.",
    },
    {
      type: "quiz",
      id: "pr5-6-q1",
      variant: "concept",
      question: "A committee of 4 is chosen at random from 6 women and 5 men. Which model gives the number of women on it?",
      options: [
        { text: "Plain counting (hypergeometric): $\\frac{\\binom{6}{k}\\binom{5}{4-k}}{\\binom{11}{4}}$", correct: true, feedback: "People are chosen without replacement from a population of 11, so $p$ changes with each pick." },
        { text: "Binomial $B\\!\\left(4, \\frac{6}{11}\\right)$", feedback: "That would allow the same woman to be picked twice. From only 11 people, not replacing matters a lot." },
        { text: "Geometric with $p = \\frac{6}{11}$", feedback: "Nobody is waiting for a first success. A fixed group of 4 is chosen." },
        { text: "Poisson with $\\lambda = \\frac{24}{11}$", feedback: "These aren't rare events in time or space. The count can't exceed 4." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-6-q2",
      variant: "concept",
      question:
        "\"A die is rolled until a 1 appears. Find the expected number of rolls needed and the probability that it takes more than 4 rolls.\" Which model and answers?",
      options: [
        { text: "Geometric: $E[X] = 6$ and $P(X > 4) = \\left(\\frac{5}{6}\\right)^4$", correct: true, feedback: "\"Until\" signals a wait for the first success. The mean is $\\frac{1}{p} = 6$ and the tail is $q^4$." },
        { text: "Binomial $B\\!\\left(4, \\frac{1}{6}\\right)$: expected $\\frac{4}{6}$ and probability $P(X = 1)$", feedback: "A binomial with $n = 4$ counts ones among 4 rolls, so its mean $\\frac{4}{6}$ is not a waiting time. And \"more than 4 rolls\" means *zero* ones in the first 4, not one." },
        { text: "Geometric: $E[X] = 6$ and $P(X > 4) = \\left(\\frac{5}{6}\\right)^4 \\cdot \\frac{1}{6}$", feedback: "Right model and mean, but $q^4 p$ is $P(X = 5)$, the first 1 exactly on roll 5. \"More than 4\" only needs the first 4 rolls to fail: $q^4$." },
        { text: "Poisson with $\\lambda = \\frac{4}{6}$", feedback: "Die rolls are discrete trials with a known $p$. Poisson is for rare events with only an average rate known." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-6-q3",
      variant: "concept",
      question: "A call centre gets on average 4 calls per 10 minutes. Which model fits the number of calls in a given 10-minute window?",
      options: [
        { text: "Poisson(4)", correct: true, feedback: "A count of events over time with a known average rate, and no fixed $n$." },
        { text: "Binomial $B(10, 0.4)$", feedback: "That invents 10 trials. Nothing limits calls to one per minute." },
        { text: "Geometric with $p = 0.4$", feedback: "Geometric counts trials until one success, not events in a window." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-6-q4",
      variant: "concept",
      question: "Ten bulbs are tested from a day's production of 100,000, of which 2% are defective. Which model is most sensible for the number of defectives?",
      options: [
        { text: "Binomial $B(10, 0.02)$: the population is so large that removing 10 bulbs barely changes $p$.", correct: true, feedback: "Strictly it's hypergeometric, but the binomial is practically identical and much simpler." },
        { text: "Hypergeometric only; the binomial would be seriously wrong.", feedback: "With a 10-bulb sample from 100,000, the change in $p$ is around $10^{-4}$, which you can ignore." },
        { text: "Geometric with $p = 0.02$", feedback: "There's no waiting for a first defective here. The sample size is fixed at 10." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-6-q5",
      variant: "practice",
      question:
        "A bag has 5 red and 3 blue balls. Three are drawn **without** replacement. What is the probability of exactly 2 reds?",
      options: [
        { text: "$\\dfrac{15}{28}$", correct: true, feedback: "$\\frac{\\binom{5}{2}\\binom{3}{1}}{\\binom{8}{3}} = \\frac{30}{56} = \\frac{15}{28}$." },
        { text: "$\\dfrac{225}{512}$", feedback: "That is the with-replacement (binomial) answer. The balls aren't returned here." },
        { text: "$\\dfrac{10}{56}$", feedback: "You chose the 2 reds but forgot to choose which blue fills the third place: multiply by $\\binom{3}{1} = 3$." },
        { text: "$\\dfrac{5}{8}\\cdot\\dfrac{4}{7}\\cdot\\dfrac{3}{6}$", feedback: "That is P(RRB) in one specific order. There are 3 orders (RRB, RBR, BRR), each with the same probability." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-6-q6",
      variant: "concept",
      question: "For which of these stories is the binomial model **exactly** right?",
      options: [
        { text: "Counting sixes in 8 rolls of a fair die.", correct: true, feedback: "Fixed $n$, independent rolls, and $p = \\frac{1}{6}$ every time." },
        { text: "Counting aces in a 13-card bridge hand.", feedback: "Dealt without replacement from 52. That is hypergeometric." },
        { text: "Counting rolls of a die until the first six.", feedback: "No fixed $n$. That is geometric." },
        { text: "Counting earthquakes in a region per year.", feedback: "Rare events in time with only a rate known. That is the Poisson setting." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-6-q7",
      variant: "practice",
      question: "Three cards are dealt from a well-shuffled deck. What is the probability of exactly 1 ace?",
      options: [
        { text: "$\\dfrac{\\binom{4}{1}\\binom{48}{2}}{\\binom{52}{3}} = \\dfrac{4512}{22100} \\approx 0.204$", correct: true, feedback: "Dealing is without replacement from 52 cards, so count: choose the 1 ace from 4 and the 2 other cards from the 48 non-aces, out of $\\binom{52}{3} = 22100$ hands." },
        { text: "$3 \\cdot \\dfrac{1}{13}\\left(\\dfrac{12}{13}\\right)^2 \\approx 0.197$", feedback: "That is the binomial answer, which assumes each card is replaced. From only 52 cards the draws are dependent: once a non-ace is dealt, the next card is slightly more likely to be an ace. Close here, but not exact." },
        { text: "$\\dfrac{4}{52}\\cdot\\dfrac{48}{51}\\cdot\\dfrac{47}{50} \\approx 0.068$", feedback: "That is the ace coming first in one specific order. The ace can be in any of the 3 positions, so multiply by 3." },
        { text: "$\\dfrac{\\binom{4}{1}}{\\binom{52}{3}}$", feedback: "You chose the ace but not the other two cards. Multiply by $\\binom{48}{2}$ ways to fill the rest of the hand with non-aces." },
      ],
      hint: "Favourable hands: choose 1 of the 4 aces and 2 of the 48 non-aces.",
    },
    {
      type: "quiz",
      id: "pr5-6-q8",
      variant: "practice",
      question:
        "A lot of 20 bulbs contains 5 defectives. Two bulbs are drawn **with replacement**. What is the probability that exactly one is defective?",
      options: [
        { text: "$\\dfrac{3}{8}$", correct: true, feedback: "With replacement, $p = \\frac{5}{20} = \\frac{1}{4}$ on both draws, so $\\binom{2}{1}\\cdot\\frac{1}{4}\\cdot\\frac{3}{4} = \\frac{6}{16} = \\frac{3}{8}$." },
        { text: "$\\dfrac{15}{38}$", feedback: "That is the without-replacement answer, $\\frac{\\binom{5}{1}\\binom{15}{1}}{\\binom{20}{2}} = \\frac{75}{190}$. Here the bulb goes back, so the binomial is exact." },
        { text: "$\\dfrac{3}{16}$", feedback: "That is one order only, defective then good. The defective one could also come second, so multiply by $\\binom{2}{1} = 2$." },
        { text: "$\\dfrac{1}{4}$", feedback: "That is $p$ for a single draw, not the probability of exactly one defective in two draws." },
      ],
      hint: "\"With replacement\" makes the draws independent Bernoulli trials.",
    },
    {
      type: "quiz",
      id: "pr5-6-q9",
      variant: "practice",
      question:
        "A student guesses all 4 questions on a quiz, each with 4 options. Which model and answer give the probability that she gets at least one right?",
      options: [
        { text: "Binomial $B\\!\\left(4, \\frac{1}{4}\\right)$: $1 - \\left(\\frac{3}{4}\\right)^4 = \\frac{175}{256}$", correct: true, feedback: "A fixed 4 independent guesses, each right with probability $\\frac{1}{4}$. The complement of \"at least one\" is \"all wrong\", $\\left(\\frac{3}{4}\\right)^4 = \\frac{81}{256}$." },
        { text: "Geometric with $p = \\frac{1}{4}$: $\\left(\\frac{3}{4}\\right)^3\\frac{1}{4} = \\frac{27}{256}$", feedback: "That is the first correct answer landing exactly on question 4. The question asks how many are right among a fixed 4, so it is binomial." },
        { text: "Binomial $B\\!\\left(4, \\frac{1}{4}\\right)$: $4 \\cdot \\frac{1}{4}\\left(\\frac{3}{4}\\right)^3 = \\frac{108}{256}$", feedback: "Right model, but that is *exactly* one right. At least one also includes 2, 3 or 4 right." },
        { text: "Poisson(1): $1 - e^{-1} \\approx 0.632$", feedback: "$np = 1$, but $p = \\frac{1}{4}$ is not small and $n = 4$ is tiny. The exact binomial is easy here, so use it." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-5-mastery",
  title: "5.7 · Chapter 5 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "This is the final check, and it covers the whole course: sample spaces, the addition rule, conditional probability and Bayes, expectation and variance, and everything in this chapter. Work each question on paper before you open the options. When you miss one, the feedback points you back to the lesson.",
    },
    {
      type: "quiz",
      id: "pr5-7-q1",
      variant: "mastery",
      question: "Four fair coins are tossed. What is the probability of at least three heads?",
      options: [
        { text: "$\\dfrac{5}{16}$", correct: true, feedback: "Of the $2^4 = 16$ equally likely outcomes, $\\binom{4}{3} = 4$ have exactly three heads and 1 has four: $\\frac{4 + 1}{16}$." },
        { text: "$\\dfrac{1}{4}$", feedback: "That's exactly three heads, $\\frac{4}{16}$. \"At least three\" also includes HHHH." },
        { text: "$\\dfrac{11}{16}$", feedback: "That is at least *two* heads, $\\frac{6 + 4 + 1}{16}$. At least three leaves out the six outcomes with exactly two." },
        { text: "$\\dfrac{2}{5}$", feedback: "That treats the five head-counts 0 to 4 as equally likely and takes 2 of them. They are not equally likely: 2 heads has 6 outcomes, 4 heads has only 1." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-7-q2",
      variant: "mastery",
      question: "$P(A) = 0.5$, $P(B) = 0.4$ and $P(A \\cap B) = 0.2$. What is the probability that **neither** $A$ nor $B$ occurs?",
      options: [
        { text: "0.3", correct: true, feedback: "$P(A \\cup B) = 0.5 + 0.4 - 0.2 = 0.7$, so $P(\\text{neither}) = 1 - 0.7 = 0.3$." },
        { text: "0.1", feedback: "You used $1 - (0.5 + 0.4)$ and forgot to add back the overlap." },
        { text: "0.7", feedback: "That's $P(A \\cup B)$, at least one of them. Neither is its complement." },
        { text: "0.8", feedback: "That's $1 - P(A \\cap B)$, \"not both\", which is a different event." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-7-q3",
      variant: "mastery",
      question: "Two fair dice are rolled and the sum is 8. What is the probability that the roll was a double?",
      options: [
        { text: "$\\dfrac{1}{5}$", correct: true, feedback: "Sum 8: (2,6), (3,5), (4,4), (5,3), (6,2). Exactly one of these 5 is a double." },
        { text: "$\\dfrac{1}{6}$", feedback: "That is the unconditional $P(\\text{double})$. Conditioning shrinks the sample space to the 5 outcomes with sum 8." },
        { text: "$\\dfrac{1}{36}$", feedback: "That's $P(\\text{double and sum 8})$. You must divide by $P(\\text{sum 8}) = \\frac{5}{36}$." },
        { text: "$\\dfrac{1}{3}$", feedback: "That counts (3,5)/(5,3) and (2,6)/(6,2) as single outcomes. Ordered pairs are the equally likely ones." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-7-q4",
      variant: "mastery",
      question:
        "Bag I has 2 red and 4 black balls; Bag II has 3 red and 2 black. A bag is chosen by tossing a fair coin, and one ball is drawn. It is red. What is the probability it came from Bag I?",
      options: [
        { text: "$\\dfrac{5}{14}$", correct: true, feedback: "$\\frac{\\frac{1}{2}\\cdot\\frac{1}{3}}{\\frac{1}{2}\\cdot\\frac{1}{3} + \\frac{1}{2}\\cdot\\frac{3}{5}} = \\frac{5/30}{14/30} = \\frac{5}{14}$. The equal priors cancel, leaving $\\frac{1/3}{1/3 + 3/5}$." },
        { text: "$\\dfrac{1}{3}$", feedback: "That's $P(\\text{red} \\mid \\text{Bag I})$. Bayes reverses it: $P(\\text{Bag I} \\mid \\text{red})$." },
        { text: "$\\dfrac{2}{5}$", feedback: "Pooling the balls (2 of the 5 reds are in Bag I) would be right only if every ball were equally likely to be drawn. Bag I's balls are each less likely, because Bag I holds more balls." },
        { text: "$\\dfrac{7}{15}$", feedback: "That's $P(\\text{red}) = \\frac12\\cdot\\frac13 + \\frac12\\cdot\\frac35$, the denominator. Divide Bag I's leaf by it." },
      ],
      hint: "Draw a tree: bag first, then colour. Use joint(Bag I, red) ÷ P(red).",
    },
    {
      type: "quiz",
      id: "pr5-7-q5",
      variant: "mastery",
      question: "$X$ takes the values 0, 1, 2 with probabilities $\\frac{1}{4}, \\frac{1}{2}, \\frac{1}{4}$. What are $E[X]$ and $\\operatorname{Var}(X)$?",
      options: [
        { text: "$E[X] = 1$, $\\operatorname{Var}(X) = \\frac{1}{2}$", correct: true, feedback: "$E[X] = 0 + \\frac{1}{2} + \\frac{2}{4} = 1$, $E[X^2] = \\frac{1}{2} + \\frac{4}{4} = \\frac{3}{2}$, so $\\operatorname{Var} = \\frac{3}{2} - 1 = \\frac{1}{2}$. It is $B(2, \\frac{1}{2})$, and $npq = \\frac{1}{2}$ agrees." },
        { text: "$E[X] = 1$, $\\operatorname{Var}(X) = \\frac{3}{2}$", feedback: "$\\frac{3}{2}$ is $E[X^2]$. Subtract $(E[X])^2 = 1$." },
        { text: "$E[X] = 1$, $\\operatorname{Var}(X) = 1$", feedback: "Compute $E[X^2] - (E[X])^2 = \\frac{3}{2} - 1$." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-7-q6",
      variant: "mastery",
      question: "A fair coin is tossed 5 times. What is the probability of exactly 3 heads?",
      options: [
        { text: "$\\dfrac{5}{16}$", correct: true, feedback: "$\\binom{5}{3}\\left(\\frac{1}{2}\\right)^5 = \\frac{10}{32} = \\frac{5}{16}$." },
        { text: "$\\dfrac{1}{32}$", feedback: "One arrangement only. Multiply by $\\binom{5}{3} = 10$." },
        { text: "$\\dfrac{3}{5}$", feedback: "That's the proportion of heads, not a probability." },
        { text: "$\\dfrac{1}{2}$", feedback: "$\\frac{1}{2}$ is $P(\\text{at least 3 heads})$, by symmetry. Exactly 3 is one part of that." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-7-q7",
      variant: "mastery",
      question: "A die is rolled 6 times. What is the probability of at least one six?",
      options: [
        { text: "$1 - \\left(\\dfrac{5}{6}\\right)^6 \\approx 0.665$", correct: true, feedback: "The complement of \"at least one\" is \"none\", which is one path, $q^6 = \\left(\\frac{5}{6}\\right)^6 \\approx 0.335$." },
        { text: "$1$, since $6 \\times \\dfrac{1}{6} = 1$", feedback: "Six rolls do not guarantee a six. Adding $\\frac{1}{6}$ six times counts outcomes with two or more sixes more than once; $6 \\times \\frac16 = 1$ is the expected *number* of sixes, not a probability." },
        { text: "$\\left(\\dfrac{5}{6}\\right)^6 \\approx 0.335$", feedback: "That's the probability of *no* six. Subtract it from 1." },
        { text: "$6 \\cdot \\dfrac{1}{6}\\left(\\dfrac{5}{6}\\right)^5 \\approx 0.402$", feedback: "That's exactly one six. At least one also includes 2 to 6 sixes." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-7-q8",
      variant: "mastery",
      question:
        "A shooter hits a target with probability 0.2 per shot, independently. What is the minimum number of shots needed for $P(\\text{at least one hit}) > 0.9$?",
      options: [
        { text: "11", correct: true, feedback: "Need $0.8^n < 0.1$. $0.8^{10} \\approx 0.107$ is not enough, but $0.8^{11} \\approx 0.086$ is. So $n = 11$." },
        { text: "10", feedback: "Check: $1 - 0.8^{10} \\approx 0.893$, just short of 0.9." },
        { text: "5", feedback: "$5 \\times 0.2 = 1$ is the expected number of hits, not a probability. $1 - 0.8^5 \\approx 0.67$." },
        { text: "9", feedback: "Check: $1 - 0.8^9 \\approx 0.866$, still below 0.9. You need $0.8^n < 0.1$, and $0.8^9 \\approx 0.134$ is too big." },
      ],
      hint: "$P(\\text{at least one}) = 1 - q^n$. Solve $q^n < 0.1$.",
    },
    {
      type: "quiz",
      id: "pr5-7-q9",
      variant: "mastery",
      question: "A binomial distribution has mean 6 and variance 2. What are $n$ and $p$?",
      options: [
        { text: "$n = 9$, $p = \\frac{2}{3}$", correct: true, feedback: "$q = \\frac{2}{6} = \\frac{1}{3}$, $p = \\frac{2}{3}$, $n = \\frac{6}{2/3} = 9$. Check: $npq = 9 \\cdot \\frac{2}{3} \\cdot \\frac{1}{3} = 2$." },
        { text: "$n = 18$, $p = \\frac{1}{3}$", feedback: "Variance ÷ mean is $q$, not $p$. Then $npq = 18 \\cdot \\frac{1}{3} \\cdot \\frac{2}{3} = 4$." },
        { text: "$n = 8$, $p = \\frac{3}{4}$", feedback: "Check: $npq = 8 \\cdot \\frac{3}{4} \\cdot \\frac{1}{4} = 1.5 \\ne 2$." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-7-q10",
      variant: "mastery",
      question: "A die is rolled until the first six. What is the probability that the first six appears on the 3rd roll, and how many rolls do you expect to need?",
      options: [
        { text: "$\\frac{25}{216}$; expected 6 rolls", correct: true, feedback: "$\\left(\\frac{5}{6}\\right)^2\\frac{1}{6} = \\frac{25}{216}$ and $E[X] = \\frac{1}{p} = 6$." },
        { text: "$\\frac{75}{216}$; expected 6 rolls", feedback: "Right mean, but there's no $\\binom{3}{1}$: the six must come last." },
        { text: "$\\frac{25}{216}$; expected 3.5 rolls", feedback: "3.5 is the mean face value of one roll, not the waiting time." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-7-q11",
      variant: "mastery",
      question: "Four cards are dealt from a standard deck. Which model gives the probability that exactly 2 are spades?",
      options: [
        { text: "$\\dfrac{\\binom{13}{2}\\binom{39}{2}}{\\binom{52}{4}}$", correct: true, feedback: "Dealing is without replacement from only 52 cards, so use plain counting (hypergeometric)." },
        { text: "$\\binom{4}{2}\\left(\\frac{1}{4}\\right)^2\\left(\\frac{3}{4}\\right)^2$", feedback: "This is binomial, which assumes replacement. From 52 cards, $p$ changes noticeably after each spade." },
        { text: "$\\left(\\frac{3}{4}\\right)\\left(\\frac{1}{4}\\right)$", feedback: "That looks like a geometric term, but nobody is waiting for a first spade." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-7-q12",
      variant: "mastery",
      question: "Defects on a roll of fabric average 1 per metre (Poisson). What is the probability that a given metre has at least one defect?",
      options: [
        { text: "$1 - e^{-1} \\approx 0.632$", correct: true, feedback: "$P(X \\ge 1) = 1 - P(0) = 1 - e^{-1}$." },
        { text: "1, because the average is 1.", feedback: "An average of 1 per metre still leaves some metres clean: $P(0) = e^{-1} \\approx 0.368$." },
        { text: "$e^{-1} \\approx 0.368$", feedback: "That's $P(0)$, no defects. \"At least one\" is its complement." },
      ],
    },
    {
      type: "quiz",
      id: "pr5-7-q13",
      variant: "mastery",
      question: "For $X \\sim B(100, 0.1)$, what is the standard deviation?",
      options: [
        { text: "3", correct: true, feedback: "$npq = 100 \\times 0.1 \\times 0.9 = 9$, so $\\sigma = 3$." },
        { text: "9", feedback: "9 is the variance. Take its square root." },
        { text: "10", feedback: "10 is the mean $np$." },
        { text: "$\\sqrt{10}$", feedback: "That is $\\sqrt{np}$. The variance has the extra factor $q = 0.9$." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Course complete",
      content:
        "You started with \"what can happen?\" and finished with models that predict how often. Every tool in this course came from three moves: **count** the equally likely outcomes, **multiply along** a tree for \"and then\", **add across** for \"or\". The binomial, geometric and Poisson distributions are those three moves, used many times over.",
    },
  ]),
};

export const probabilityChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
