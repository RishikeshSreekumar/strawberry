import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Probability Chapter 1 — Measuring Probability.
 * Numbers for events: the classical ratio, long-run frequency, and the three
 * axioms from which complement, bounds, the addition rule and
 * inclusion–exclusion all follow. Then the complement trick (De Méré,
 * birthdays) and probability by counting.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "classical-probability",
  title: "1.1 · Classical Probability",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pr-1-measuring-probability.mp4",
      poster: "/videos/pr-1-measuring-probability.jpg",
      title: "Chapter 1 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Chapter 0 gave us a precise object: a sample space $S$ listing every outcome, and events as subsets of it. Now we attach a *number* to an event, a number that says how much of the uncertainty lands inside it.",
    },
    {
      type: "text",
      content:
        "Start with the picture. Roll two fair dice and draw all 36 outcomes as a $6 \\times 6$ grid, first die across, second die down. The event \"sum is 7\" is the diagonal of 6 cells. If every cell is as likely as every other, then the event owns exactly $\\frac{6}{36}$ of the grid, and that fraction is its probability.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "two-dice",
        events: [{ id: "A", label: "sum is 7", latex: "A", preset: "sum-eq", value: 7 }],
        track: "event-A",
        seed: 11,
        caption:
          "The shaded diagonal is the event 'sum is 7': 6 of the 36 equally likely cells. Run a few batches and watch the proportion of 7s settle near 6/36 ≈ 0.167.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Classical probability",
      content:
        "If a sample space $S$ has finitely many outcomes **and all of them are equally likely**, the probability of an event $E$ is the fraction of the sample space it occupies:\n\n$\\displaystyle P(E) = \\frac{n(E)}{n(S)} = \\frac{\\text{number of outcomes in } E}{\\text{total number of outcomes}}$",
    },
    {
      type: "text",
      content:
        "Why a fraction? Suppose $n(S) = N$ outcomes share the total certainty equally. Symmetry says each outcome gets the same amount, and together they must make up the whole, so each gets $\\frac{1}{N}$. An event made of $n(E)$ of them collects $n(E)$ shares:",
    },
    {
      type: "math",
      latex:
        "P(E) = \\underbrace{\\tfrac{1}{N} + \\tfrac{1}{N} + \\cdots + \\tfrac{1}{N}}_{n(E)\\text{ terms}} = \\frac{n(E)}{N}",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The assumption is doing all the work",
      content:
        "\"Equally likely\" is not a detail. The formula is only valid when the outcomes you count are symmetric: a fair die, a well-shuffled deck, a fair coin. If you list outcomes that are *not* equally likely (such as \"0, 1 or 2 heads\" for two coins), the ratio gives a wrong answer.",
    },
    {
      type: "text",
      content:
        "Three immediate consequences, straight from the fraction:\n\n**$0 \\le P(E) \\le 1$**, because $0 \\le n(E) \\le n(S)$.\n\n**$P(S) = 1$** (the sure event) and **$P(\\varnothing) = 0$** (the impossible event).\n\n**$P(E') = 1 - P(E)$**, because the outcomes not in $E$ number $n(S) - n(E)$.",
    },
    {
      type: "table",
      headers: ["Sum of two dice", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      rows: [
        ["Number of cells", "1", "2", "3", "4", "5", "6", "5", "4", "3", "2", "1"],
        ["Probability", "1/36", "2/36", "3/36", "4/36", "5/36", "6/36", "5/36", "4/36", "3/36", "2/36", "1/36"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1: a card.** One card is drawn from a well-shuffled deck of 52.\n\n1. $S$ = the 52 cards, all equally likely, so $n(S) = 52$.\n2. \"A king\": 4 cards, so $P = \\frac{4}{52} = \\frac{1}{13}$.\n3. \"A red face card\": the J, Q, K of hearts and of diamonds, 6 cards, so $P = \\frac{6}{52} = \\frac{3}{26}$.\n4. \"Not a king\": $1 - \\frac{1}{13} = \\frac{12}{13}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: a prime sum.** Two fair dice are rolled. Find $P(\\text{sum is prime})$.\n\n1. Prime sums possible: 2, 3, 5, 7, 11.\n2. Read the cell counts from the table: $1 + 2 + 4 + 6 + 2 = 15$.\n3. $P = \\frac{15}{36} = \\frac{5}{12}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: 53 Sundays.** What is the probability that a randomly chosen leap year has 53 Sundays?\n\n1. A leap year has 366 days = 52 weeks + 2 days. The 52 full weeks give 52 Sundays.\n2. The 2 extra days are one of 7 equally likely consecutive pairs: (Sun, Mon), (Mon, Tue), …, (Sat, Sun).\n3. A 53rd Sunday happens for (Sun, Mon) and (Sat, Sun): 2 of the 7.\n4. $P = \\frac{2}{7}$. (For a non-leap year, only 1 extra day, so $\\frac{1}{7}$.)",
    },
    {
      type: "text",
      content:
        "**Worked example 4: d'Alembert's mistake.** Two fair coins are tossed. Find $P(\\text{exactly one head})$.\n\n1. *Wrong sample space:* $\\{0 \\text{ heads}, 1 \\text{ head}, 2 \\text{ heads}\\}$. Three outcomes, one favourable, so \"$P = \\frac{1}{3}$\". The great mathematician Jean d'Alembert argued exactly this in 1754.\n2. *Check the assumption:* are the three outcomes equally likely? Label the coins (a 1-rupee and a 2-rupee coin, say). Then \"1 head\" can happen in two ways, HT and TH, while \"2 heads\" happens only as HH.\n3. *Right sample space:* $\\{HH, HT, TH, TT\\}$, four equally likely outcomes by symmetry. Exactly one head is $\\{HT, TH\\}$, so $P = \\frac{2}{4} = \\frac{1}{2}$.\n4. *Frequency check:* toss two coins a few hundred times and \"exactly one head\" turns up about half the time, not a third. The coins do not know they look alike; they land as if they were labelled.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style): an inequality in disguise.** A number $x$ is chosen at random from $1, 2, \\ldots, 100$. Find the probability that $x + \\frac{100}{x} > 29$.\n\n1. *Sample space.* 100 equally likely numbers, so $n(S) = 100$. *Why:* \"at random\" from a finite list means each value is equally likely, so the classical ratio applies.\n2. *Turn the condition into something countable.* $x$ is positive, so multiplying by $x$ keeps the direction of the inequality:",
    },
    {
      type: "math",
      latex: "x + \\frac{100}{x} > 29 \\iff x^2 - 29x + 100 > 0 \\iff (x - 4)(x - 25) > 0",
    },
    {
      type: "text",
      content:
        "3. *Read off the solution.* A product of two factors is positive when both have the same sign: $x < 4$ or $x > 25$. *Why check the endpoints:* at $x = 4$ and $x = 25$ the expression equals exactly 29 ($4 + 25$ and $25 + 4$), which is not *greater* than 29, so both are excluded.\n4. *Count.* $x \\in \\{1, 2, 3\\}$ gives 3 values; $x \\in \\{26, \\ldots, 100\\}$ gives $100 - 25 = 75$ values. So $n(E) = 78$.\n5. $P(E) = \\frac{78}{100} = \\frac{39}{50}$.\n\nThe probability part is one line; the real work was turning a condition into a list of outcomes. That is typical of exam questions on classical probability.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"two outcomes, so 50-50\"",
      content:
        "\"Either I win the lottery or I don't, so it's 50-50.\" \"Either the sum is 2 or it isn't, so $P = \\frac{1}{2}$.\" Splitting the world into two *events* does not make them equally likely. The sum is 2 in 1 cell and not 2 in 35 cells, so $P(\\text{sum} = 2) = \\frac{1}{36}$. Count equally likely *outcomes*, never categories.",
    },
    {
      type: "quiz",
      id: "pr1-1-q1",
      variant: "concept",
      question:
        "A friend says: \"When two dice are rolled, the sum is either 12 or not 12. So $P(\\text{sum} = 12) = \\frac{1}{2}$.\" What is wrong?",
      options: [
        {
          text: "The two events are not equally likely: 'sum is 12' is 1 of 36 equally likely cells, so the probability is $\\frac{1}{36}$.",
          correct: true,
          feedback: "Right. The classical formula counts equally likely outcomes, and 'sum 12' holds only for (6, 6).",
        },
        {
          text: "Nothing. With two possibilities, each has probability $\\frac{1}{2}$.",
          feedback: "That rule holds only when the two possibilities are equally likely, and here they are wildly unequal.",
        },
        {
          text: "The answer should be $\\frac{1}{11}$, since there are 11 possible sums.",
          feedback: "Same mistake one level down: the 11 sums are not equally likely (7 has 6 cells, 12 has 1).",
        },
      ],
    },
    {
      type: "quiz",
      id: "pr1-1-q2",
      variant: "practice",
      question: "Two fair dice are rolled. What is the probability that the sum is at least 10?",
      options: [
        { text: "$\\frac{1}{6}$", correct: true, feedback: "Sums 10, 11, 12 have $3 + 2 + 1 = 6$ cells, and $\\frac{6}{36} = \\frac{1}{6}$." },
        { text: "$\\frac{3}{11}$", feedback: "That treats the 11 sums as equally likely. Count cells instead." },
        { text: "$\\frac{1}{12}$", feedback: "$\\frac{3}{36}$ counts only sum 10. 'At least 10' also includes 11 (2 cells) and 12 (1 cell)." },
        { text: "$\\frac{5}{36}$", feedback: "You missed one cell. Sums 10, 11, 12 give $3 + 2 + 1$." },
      ],
      hint: "Use the table of cell counts for each sum.",
    },
    {
      type: "quiz",
      id: "pr1-1-q3",
      variant: "practice",
      question: "Three fair coins are tossed. What is the probability of getting at least two heads?",
      options: [
        { text: "$\\frac{1}{2}$", correct: true, feedback: "Of the 8 outcomes, HHT, HTH, THH and HHH have at least two heads: $\\frac{4}{8}$." },
        { text: "$\\frac{3}{8}$", feedback: "That is exactly two heads. 'At least two' also includes HHH." },
        { text: "$\\frac{5}{8}$", feedback: "Recount: only HHT, HTH, THH and HHH have two or more heads, 4 of the 8 outcomes." },
        { text: "$\\frac{1}{4}$", feedback: "List the 8 equally likely outcomes and count those with two or three heads." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-1-q4",
      variant: "practice",
      question: "A card is drawn from a well-shuffled deck. What is the probability that it is a spade or an ace?",
      options: [
        { text: "$\\frac{4}{13}$", correct: true, feedback: "13 spades plus the 3 non-spade aces make 16 cards, and $\\frac{16}{52} = \\frac{4}{13}$." },
        { text: "$\\frac{17}{52}$", feedback: "The ace of spades was counted twice. Count distinct cards." },
        { text: "$\\frac{1}{52}$", feedback: "That is 'a spade *and* an ace', the single ace of spades." },
      ],
      hint: "Count the cards directly, taking care not to count any card twice.",
    },
    {
      type: "quiz",
      id: "pr1-1-q5",
      variant: "concept",
      question: "When is it valid to use $P(E) = \\frac{n(E)}{n(S)}$?",
      options: [
        { text: "When $S$ is finite and every outcome in $S$ is equally likely.", correct: true, feedback: "Both conditions are needed: finitely many outcomes, each with the same share of probability." },
        { text: "Whenever you can list the outcomes of an experiment.", feedback: "Listing is not enough. A loaded die has a listable sample space, but its faces are not equally likely." },
        { text: "Only for coins and dice.", feedback: "It works for any symmetric situation: cards, lotteries, random seating, and so on." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-1-q6",
      variant: "concept",
      question:
        "Two coins are tossed. Why is $P(\\text{exactly one head})$ not $\\frac{1}{3}$, even though the number of heads can only be 0, 1 or 2?",
      options: [
        {
          text: "0, 1 and 2 heads are not equally likely: '1 head' covers two outcomes (HT and TH), so $P = \\frac{2}{4} = \\frac{1}{2}$.",
          correct: true,
          feedback: "Right. The classical ratio needs equally likely outcomes, and $\\{HH, HT, TH, TT\\}$ supplies them.",
        },
        {
          text: "It is $\\frac{1}{3}$: there are three possible outcomes and one of them is favourable.",
          feedback: "That is d'Alembert's error. Counting three *categories* only works if the categories are equally likely, and they are not.",
        },
        {
          text: "Because HT and TH are the same outcome, so the answer is $\\frac{1}{4}$.",
          feedback: "If HT and TH were one outcome you would be back to three categories. They are different outcomes of labelled coins, and together they make $\\frac{2}{4}$.",
        },
        {
          text: "Because a coin toss has no sample space; only frequencies can answer this.",
          feedback: "The sample space $\\{HH, HT, TH, TT\\}$ is fine and gives the answer directly. Frequencies merely confirm it.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pr1-1-q7",
      variant: "practice",
      question:
        "A leap year is chosen at random. What is the probability that it has 53 Sundays **or** 53 Mondays?",
      options: [
        { text: "$\\frac{3}{7}$", correct: true, feedback: "The 2 extra days are one of 7 equally likely pairs. (Sat, Sun), (Sun, Mon) and (Mon, Tue) give a 53rd Sunday or Monday: 3 of the 7." },
        { text: "$\\frac{4}{7}$", feedback: "Adding $\\frac{2}{7} + \\frac{2}{7}$ counts the pair (Sun, Mon) twice: it gives both a 53rd Sunday and a 53rd Monday." },
        { text: "$\\frac{2}{7}$", feedback: "That is 53 Sundays alone. The pair (Mon, Tue) adds a 53rd Monday." },
        { text: "$\\frac{1}{7}$", feedback: "That is 53 Sundays *and* 53 Mondays, the single pair (Sun, Mon)." },
      ],
      hint: "List the 7 possible pairs of extra days and mark the ones that work.",
    },
    {
      type: "quiz",
      id: "pr1-1-q8",
      variant: "practice",
      question:
        "A number $x$ is chosen at random from $1, 2, \\ldots, 50$. What is the probability that $x + \\frac{36}{x} > 13$?",
      options: [
        { text: "$\\frac{22}{25}$", correct: true, feedback: "$x^2 - 13x + 36 > 0$ means $(x - 4)(x - 9) > 0$, so $x \\le 3$ or $x \\ge 10$: $3 + 41 = 44$ values, and $\\frac{44}{50} = \\frac{22}{25}$." },
        { text: "$\\frac{23}{25}$", feedback: "That counts 46 values, including $x = 4$ and $x = 9$. There the expression equals exactly 13, which is not greater than 13." },
        { text: "$\\frac{3}{25}$", feedback: "That counts only the 6 values $4, \\ldots, 9$, which are exactly the ones that *fail*. Take the rest." },
        { text: "$\\frac{41}{50}$", feedback: "You found the values from 10 to 50 but forgot $x = 1, 2, 3$, where $\\frac{36}{x}$ is large." },
      ],
      hint: "Multiply through by $x > 0$ and factor the quadratic.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "long-run-frequency",
  title: "1.2 · Probability as Long-Run Frequency",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Classical probability needs symmetry. But what is the probability that a drawing pin lands point-up, that a new bulb lasts 1000 hours, or that a batsman scores a fifty? There is no list of equally likely outcomes. There is only **data**.",
    },
    {
      type: "text",
      content:
        "The idea: repeat the experiment many times and record the fraction of times the event happens. One roll tells you almost nothing. A thousand rolls tell you a lot. Watch it happen with two dice: the bars show how often each sum has come up so far.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "two-dice",
        track: "sum-distribution",
        batchSizes: [1, 10, 100, 1000, 10000],
        seed: 7,
        caption:
          "After 10 rolls the bars are ragged. After 10,000 they hug the triangle 1/36, 2/36, …, 6/36, …, 1/36 that the grid predicted.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Empirical (experimental) probability",
      content:
        "If an experiment is repeated $n$ times under the same conditions and event $E$ occurs $f$ times, the **relative frequency** of $E$ is $\\frac{f}{n}$. The empirical probability of $E$ is this relative frequency, taken over a large number of trials:\n\n$\\displaystyle P(E) \\approx \\frac{f}{n}$",
    },
    {
      type: "text",
      content:
        "Why should the ratio settle down at all? Think of $\\frac{f}{n}$ as an average of 0s and 1s (1 when $E$ happens). Each new trial moves the ratio by at most $\\frac{1}{n}$, so it gets harder and harder to push around. What it settles on is the true probability. This is the **law of large numbers**, which we state here without proof; Chapter 4 shows the same settling for averages (the running mean of a die approaching 3.5).",
    },
    {
      type: "callout",
      variant: "info",
      title: "The two views agree",
      content:
        "For a fair die the classical value of $P(\\text{sum} = 7)$ is $\\frac{6}{36} \\approx 0.1667$. Simulations of thousands of rolls give relative frequencies like 0.165, 0.168, 0.1669. When symmetry is available, frequency confirms it; when it isn't, frequency is the only measurement we have.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: a data table.** A die is rolled 300 times with these results.",
    },
    {
      type: "table",
      headers: ["Face", "1", "2", "3", "4", "5", "6", "Total"],
      rows: [["Frequency", "48", "52", "45", "55", "50", "50", "300"]],
    },
    {
      type: "text",
      content:
        "1. Empirical $P(\\text{face } 4) = \\frac{55}{300} \\approx 0.183$.\n2. Empirical $P(\\text{even}) = \\frac{52 + 55 + 50}{300} = \\frac{157}{300} \\approx 0.523$.\n3. Compare with the classical values $\\frac{1}{6} \\approx 0.167$ and $\\frac{1}{2}$. The gaps are small for 300 rolls, so the data give no real reason to suspect the die.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: no symmetry available.** A factory tests 1000 bulbs.",
    },
    {
      type: "table",
      headers: ["Lifetime (hours)", "under 500", "500 to 999", "1000 or more", "Total"],
      rows: [["Bulbs", "80", "370", "550", "1000"]],
    },
    {
      type: "text",
      content:
        "1. $P(\\text{lasts under 500 h}) \\approx \\frac{80}{1000} = 0.08$.\n2. $P(\\text{lasts at least 500 h}) \\approx \\frac{370 + 550}{1000} = 0.92$, which is also $1 - 0.08$. The complement rule holds for frequencies too.\n3. *Using the estimate.* A shop orders 5000 bulbs from the same factory. How many should it expect to fail before 500 hours? Expected number $\\approx 5000 \\times 0.08 = 400$. *Why this works:* the relative frequency is our best estimate of the probability, and a probability is exactly the fraction of a large batch we expect to see the event in.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (CBSE style): checking a model against data.** Two coins are tossed together 1000 times with these results.",
    },
    {
      type: "table",
      headers: ["Outcome", "2 heads", "1 head", "0 heads", "Total"],
      rows: [["Frequency", "245", "508", "247", "1000"]],
    },
    {
      type: "text",
      content:
        "Find the empirical probability of (a) at most one head, (b) at least one head, and compare with the classical values.\n\n1. *At most one head* means 1 head or 0 heads. *Why add:* the rows are separate categories, so no toss is counted twice.",
    },
    {
      type: "math",
      latex:
        "P(\\text{at most one head}) \\approx \\frac{508 + 247}{1000} = \\frac{755}{1000} = 0.755",
    },
    {
      type: "text",
      content:
        "2. *At least one head* is the complement of 0 heads: $1 - \\frac{247}{1000} = \\frac{753}{1000} = 0.753$. *Why the complement:* one subtraction is quicker than adding two rows, and it gives the same answer ($\\frac{245 + 508}{1000}$).\n3. *Compare with the model.* From $\\{HH, HT, TH, TT\\}$ the classical values are $P(\\text{at most one head}) = \\frac{3}{4}$ and $P(\\text{at least one head}) = \\frac{3}{4}$. The data give 0.755 and 0.753.\n4. *Conclusion.* The middle row (about half the tosses) matches $\\frac{2}{4}$, not d'Alembert's $\\frac{1}{3}$. A thousand tosses are enough to tell those two models apart.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "coin",
        batchSizes: [1, 4, 10, 100, 1000],
        seed: 3,
        caption:
          "Press 'Flip ×4' once and note the proportion of heads (often 0.75 or 0.25). Reset and try again a few times. Then run 1000 and watch the line flatten at 0.5.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: small samples are reliable",
      content:
        "Flip a fair coin 4 times and get 3 heads. That does **not** mean $P(\\text{heads}) = 0.75$. With a fair coin, exactly 3 heads in 4 flips happens in 4 of the 16 equally likely sequences, a quarter of the time, and 3 or more heads happens $\\frac{5}{16} \\approx 31\\%$ of the time. A small sample is mostly noise. The frequency definition only means something when $n$ is large.",
    },
    {
      type: "quiz",
      id: "pr1-2-q1",
      variant: "concept",
      question:
        "A coin is flipped 4 times and shows 3 heads. What is the most sensible conclusion?",
      options: [
        {
          text: "Nothing much: a fair coin gives 3 or more heads in 4 flips about 31% of the time. Many more flips are needed.",
          correct: true,
          feedback: "Right. Four flips cannot distinguish a fair coin from a biased one.",
        },
        { text: "$P(\\text{heads}) = 0.75$ for this coin.", feedback: "That is the relative frequency over 4 trials, which is far too few to estimate a probability." },
        { text: "The coin is biased, since a fair coin would give exactly 2 heads.", feedback: "A fair coin gives exactly 2 heads in 4 flips only $\\frac{6}{16} = 37.5\\%$ of the time." },
        { text: "The next flip is more likely to be tails, to balance things out.", feedback: "That is the gambler's fallacy. The coin has no memory." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-2-q2",
      variant: "practice",
      question:
        "In 250 overs a bowler conceded a boundary in 60 overs. What is the empirical probability that he concedes no boundary in an over?",
      options: [
        { text: "$0.76$", correct: true, feedback: "$\\frac{250 - 60}{250} = \\frac{190}{250} = 0.76$." },
        { text: "$0.24$", feedback: "That is the probability of conceding a boundary. The question asks for the complement." },
        { text: "$0.5$", feedback: "'Boundary or not' is two categories, not two equally likely outcomes. Use the data." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-2-q3",
      variant: "practice",
      question:
        "Using the 300-roll table above (faces 1 to 6: 48, 52, 45, 55, 50, 50), what is the empirical probability of a face greater than 4?",
      options: [
        { text: "$\\frac{1}{3}$", correct: true, feedback: "Faces 5 and 6: $\\frac{50 + 50}{300} = \\frac{100}{300} = \\frac{1}{3}$, which happens to equal the classical value." },
        { text: "$\\frac{155}{300}$", feedback: "That includes face 4. 'Greater than 4' means 5 or 6." },
        { text: "$\\frac{50}{300}$", feedback: "That is only face 5 (or only face 6). Add both." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-2-q4",
      variant: "concept",
      question:
        "As the number of rolls of a fair die grows from 100 to 100,000, what happens to the relative frequency of sixes?",
      options: [
        { text: "It fluctuates less and less, and settles close to $\\frac{1}{6}$.", correct: true, feedback: "That is the law of large numbers, informally." },
        { text: "It becomes exactly $\\frac{1}{6}$ at some point and stays there.", feedback: "It gets close and stays close, but it need not ever equal $\\frac{1}{6}$ exactly." },
        { text: "The number of sixes becomes exactly one-sixth of the rolls, because the die must catch up.", feedback: "The *proportion* settles; the raw count difference from $\\frac{n}{6}$ can actually grow. Nothing 'catches up'." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-2-q5",
      variant: "practice",
      question:
        "Using the bulb table above (80 under 500 h, 370 from 500 to 999 h, 550 for 1000 h or more), how many bulbs in a shipment of 2500 would you expect to last 1000 hours or more?",
      options: [
        { text: "1375", correct: true, feedback: "The empirical probability is $\\frac{550}{1000} = 0.55$, and $2500 \\times 0.55 = 1375$." },
        { text: "550", feedback: "That is the count in the 1000-bulb sample. Scale the *probability* to the new batch size." },
        { text: "2300", feedback: "$2500 \\times 0.92$ counts every bulb that lasts at least 500 hours, not 1000." },
        { text: "925", feedback: "$2500 \\times 0.37$ counts the 500 to 999 hour group." },
      ],
      hint: "Find the relative frequency first, then multiply by 2500.",
    },
    {
      type: "quiz",
      id: "pr1-2-q6",
      variant: "practice",
      question:
        "Three coins are tossed 400 times: 3 heads 52 times, 2 heads 148 times, 1 head 150 times, 0 heads 50 times. What is the empirical probability of at least two heads?",
      options: [
        { text: "$0.5$", correct: true, feedback: "$\\frac{52 + 148}{400} = \\frac{200}{400} = 0.5$, matching the classical $\\frac{4}{8}$." },
        { text: "$0.37$", feedback: "$\\frac{148}{400}$ is exactly two heads. 'At least two' also includes three heads." },
        { text: "$0.875$", feedback: "That is $1 - \\frac{50}{400}$, the probability of at least *one* head." },
        { text: "$0.13$", feedback: "$\\frac{52}{400}$ is three heads only." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "axioms-of-probability",
  title: "1.3 · The Axioms of Probability",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "We now have two ways to get a probability, counting and experiment, and they agree. But neither works everywhere: counting needs symmetry, and experiment needs repetition. In 1933 Andrey Kolmogorov asked a different question: whatever probability *is*, which rules must it obey? He found that three rules are enough. Every other rule in this chapter follows from them.",
    },
    {
      type: "text",
      content:
        "Keep one picture in mind. Think of probability as **1 kg of sand** spread over the outcomes in $S$; the probability of an event is the weight of sand on its outcomes. You cannot have a negative amount of sand on any pile. The total is exactly 1 kg. And the sand on two separate piles, with no outcome in common, is just the two weights added. Those three facts are the three axioms.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Kolmogorov's axioms",
      content:
        "A probability $P$ assigns a number $P(E)$ to each event $E$ of a sample space $S$ so that:\n\n**Axiom 1 (non-negativity):** $P(E) \\ge 0$ for every event $E$. *(No pile holds negative sand.)*\n\n**Axiom 2 (certainty):** $P(S) = 1$. *(All the sand is 1 kg.)*\n\n**Axiom 3 (additivity):** if $A$ and $B$ are mutually exclusive ($A \\cap B = \\varnothing$), then $P(A \\cup B) = P(A) + P(B)$. *(Separate piles add.)*",
    },
    {
      type: "text",
      content:
        "Check that the two earlier views satisfy them. Classical: a fraction $\\frac{n(E)}{n(S)}$ is never negative, $\\frac{n(S)}{n(S)} = 1$, and disjoint events have counts that simply add. Frequency: the same three facts hold for $\\frac{f}{n}$. So both are special cases of the axioms.",
    },
    {
      type: "text",
      content:
        "Now derive, using only the axioms.\n\n**Rule 1: $P(\\varnothing) = 0$.** In the picture, the empty set covers no outcomes, so it holds no sand. From the axioms: $S$ and $\\varnothing$ are mutually exclusive and $S \\cup \\varnothing = S$. By Axiom 3:",
    },
    { type: "math", latex: "P(S) = P(S \\cup \\varnothing) = P(S) + P(\\varnothing) \\;\\Rightarrow\\; P(\\varnothing) = 0" },
    {
      type: "text",
      content:
        "**Rule 2: the complement rule.** The sand not on $E$ is on $E'$, and together it is 1 kg. Formally, $E$ and $E'$ are mutually exclusive and together make up $S$. So by Axioms 3 and 2:",
    },
    { type: "math", latex: "P(E) + P(E') = P(E \\cup E') = P(S) = 1 \\;\\Rightarrow\\; P(E') = 1 - P(E)" },
    {
      type: "text",
      content:
        "**Rule 3: monotonicity.** A bigger region holds at least as much sand. If $A \\subseteq B$, split $B$ into the disjoint pieces $A$ and $B \\cap A'$ (the part of $B$ outside $A$):",
    },
    {
      type: "math",
      latex: "P(B) = P(A) + P(B \\cap A') \\ge P(A) \\quad \\text{since } P(B \\cap A') \\ge 0 \\text{ (Axiom 1)}",
    },
    {
      type: "text",
      content:
        "**Rule 4: $0 \\le P(E) \\le 1$.** No event can hold more than all the sand. The lower bound is Axiom 1. For the upper bound, every event satisfies $E \\subseteq S$, so monotonicity gives $P(E) \\le P(S) = 1$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Why bother?",
      content:
        "Because now any answer outside $[0, 1]$ is not a slip in arithmetic but a sign that a rule was misapplied. The axioms are a built-in error detector, and they let us assign probabilities in situations with no symmetry at all.",
    },
    {
      type: "text",
      content:
        "**Assigning probabilities without symmetry.** For a finite sample space $S = \\{o_1, \\ldots, o_n\\}$, the axioms say exactly this: give each outcome a weight $p_i \\ge 0$ with $p_1 + \\cdots + p_n = 1$, and let $P(E)$ be the sum of the weights of the outcomes in $E$. Equal weights $\\frac{1}{n}$ bring back classical probability.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: a loaded die.** A die is weighted so that the probability of face $k$ is proportional to $k$. Find $P(\\text{even})$.\n\n1. Write $P(k) = ck$ for $k = 1, \\ldots, 6$.\n2. The weights must sum to 1: $c(1 + 2 + 3 + 4 + 5 + 6) = 21c = 1$, so $c = \\frac{1}{21}$.\n3. $P(\\text{even}) = \\frac{2 + 4 + 6}{21} = \\frac{12}{21} = \\frac{4}{7} \\approx 0.571$.\n\nThe simulator below uses exactly these weights and tracks even faces.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "die",
        dieWeights: [1, 2, 3, 4, 5, 6],
        dieFaces: [2, 4, 6],
        track: "event-A",
        seed: 21,
        caption:
          "A die weighted 1 : 2 : 3 : 4 : 5 : 6. The tracked event is 'even face'; its frequency settles near 12/21 ≈ 0.571, not 0.5.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 2: checking an assignment.** Outcomes $\\{a, b, c, d\\}$. Which assignments are valid?\n\n1. $0.1, 0.2, 0.3, 0.4$: all non-negative, sum 1. **Valid.**\n2. $0.4, 0.4, 0.3, -0.1$: sums to 1 but has a negative weight. **Violates Axiom 1.**\n3. $0.3, 0.3, 0.3, 0.3$: sum 1.2. **Violates Axiom 2.**\n4. $\\frac{1}{2}, \\frac{1}{4}, \\frac{1}{8}, \\frac{1}{8}$: non-negative, sum 1. **Valid.**",
    },
    {
      type: "text",
      content:
        "**Worked example 3: using the rules.** $A$ and $B$ are mutually exclusive with $P(A) = 0.3$ and $P(B) = 0.5$. Find $P(\\text{neither})$.\n\n1. By Axiom 3, $P(A \\cup B) = 0.3 + 0.5 = 0.8$.\n2. \"Neither\" is $(A \\cup B)'$, so $P = 1 - 0.8 = 0.2$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (JEE style): which values of a parameter are allowed?** The probabilities of three mutually exclusive events are $\\frac{1 + 3p}{3}$, $\\frac{1 - p}{4}$ and $\\frac{1 - 2p}{2}$. Find the set of possible values of $p$.\n\n1. *Each probability must lie in $[0, 1]$.* *Why:* Axiom 1 gives $\\ge 0$, and Rule 4 gives $\\le 1$. Solve each pair of inequalities:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} 0 \\le \\tfrac{1 + 3p}{3} \\le 1 &\\iff -\\tfrac{1}{3} \\le p \\le \\tfrac{2}{3} \\\\ 0 \\le \\tfrac{1 - p}{4} \\le 1 &\\iff -3 \\le p \\le 1 \\\\ 0 \\le \\tfrac{1 - 2p}{2} \\le 1 &\\iff -\\tfrac{1}{2} \\le p \\le \\tfrac{1}{2} \\end{aligned}",
    },
    {
      type: "text",
      content:
        "2. *The union of the three events is an event too, so its probability is at most 1.* *Why this is needed:* the events are mutually exclusive, so by Axiom 3 the probability of their union is the sum, and that sum cannot exceed $P(S) = 1$. Put the sum over 12:",
    },
    {
      type: "math",
      latex:
        "\\frac{4(1 + 3p) + 3(1 - p) + 6(1 - 2p)}{12} = \\frac{13 - 3p}{12} \\le 1 \\iff p \\ge \\tfrac{1}{3}",
    },
    {
      type: "text",
      content:
        "3. *Intersect all the conditions.* The tightest lower bound is $\\frac{1}{3}$ (from the sum) and the tightest upper bound is $\\frac{1}{2}$ (from the third event). So $\\frac{1}{3} \\le p \\le \\frac{1}{2}$.\n4. *Sanity check at $p = \\frac{1}{3}$:* the probabilities are $\\frac{2}{3}, \\frac{1}{6}, \\frac{1}{6}$, which sum to exactly 1. At $p = \\frac{1}{2}$: $\\frac{5}{6}, \\frac{1}{8}, 0$, sum $\\frac{23}{24} \\le 1$. Both ends work.\n\nThe common slip is to forget step 2. Each number can be a valid probability on its own while the three together claim more than all the sand.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Odds",
      content:
        "The **odds in favour** of $E$ compare the chances for and against: $P(E) : P(E')$, usually written in whole numbers as $a : b$. The **odds against** $E$ are $b : a$. If the odds in favour are $a : b$, then out of $a + b$ equal shares, $a$ favour $E$:\n\n$\\displaystyle P(E) = \\frac{a}{a + b}, \\qquad P(E') = \\frac{b}{a + b}$",
    },
    {
      type: "table",
      headers: ["Stated odds", "Meaning", "P(E)"],
      rows: [
        ["3 : 2 in favour", "3 shares for, 2 against", "3/5"],
        ["5 : 3 against", "5 shares against, 3 for", "3/8"],
        ["1 : 1 (evens)", "equal shares", "1/2"],
        ["1 : 4 in favour", "1 share for, 4 against (from P(E) = 0.2, 0.2 : 0.8)", "1/5"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: odds are probabilities",
      content:
        "Odds of $3 : 2$ in favour do **not** mean $P = \\frac{3}{2}$ (impossible, since it exceeds 1) or $P = \\frac{2}{3}$. Odds compare *for* against *against*; probability compares *for* against *total*. So $P = \\frac{3}{3 + 2} = \\frac{3}{5}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: odds at the racecourse.** In a race with a single winner, the odds against horse $A$ are $3 : 1$ and the odds against horse $B$ are $5 : 2$. Find the probability that $A$ or $B$ wins, and the odds in favour of that.\n\n1. *Convert odds to probabilities.* Against $3 : 1$ means 3 shares against and 1 for, so $P(A) = \\frac{1}{3 + 1} = \\frac{1}{4}$. Similarly $P(B) = \\frac{2}{5 + 2} = \\frac{2}{7}$. *Why convert first:* odds cannot be added; probabilities of disjoint events can.\n2. *Check the events are mutually exclusive.* Only one horse can win, so $A \\cap B = \\varnothing$ and Axiom 3 applies:",
    },
    {
      type: "math",
      latex: "P(A \\cup B) = \\frac{1}{4} + \\frac{2}{7} = \\frac{7 + 8}{28} = \\frac{15}{28}",
    },
    {
      type: "text",
      content:
        "3. *Back to odds.* $P(\\text{neither}) = 1 - \\frac{15}{28} = \\frac{13}{28}$, so the odds in favour of \"$A$ or $B$ wins\" are $15 : 13$.",
    },
    {
      type: "quiz",
      id: "pr1-3-q1",
      variant: "concept",
      question: "The odds in favour of a team winning are $3 : 2$. What is the probability that it wins?",
      options: [
        { text: "$\\frac{3}{5}$", correct: true, feedback: "3 favourable shares out of $3 + 2 = 5$ equal shares." },
        { text: "$\\frac{3}{2}$", feedback: "That exceeds 1, which Rule 4 forbids. Odds are a ratio of for to against, not a probability." },
        { text: "$\\frac{2}{3}$", feedback: "That compares 'against' with 'for'. Probability divides by the total $3 + 2$." },
        { text: "$\\frac{2}{5}$", feedback: "That is the probability that the team does *not* win." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-3-q2",
      variant: "practice",
      question:
        "A die is loaded so that 6 is twice as likely as each of the other faces, which are equally likely. What is $P(6)$?",
      options: [
        { text: "$\\frac{2}{7}$", correct: true, feedback: "Let each other face have $x$. Then $5x + 2x = 1$, so $x = \\frac{1}{7}$ and $P(6) = \\frac{2}{7}$." },
        { text: "$\\frac{1}{3}$", feedback: "That doubles $\\frac{1}{6}$, but then the weights sum to more than 1. Impose the sum first." },
        { text: "$\\frac{1}{6}$", feedback: "That is a fair die. The loading moves probability onto 6, so each of the other faces must lose some." },
      ],
      hint: "Call each ordinary face's probability $x$ and use Axiom 2.",
    },
    {
      type: "quiz",
      id: "pr1-3-q3",
      variant: "practice",
      question:
        "Which of these can be a valid probability assignment to the outcomes $\\{a, b, c\\}$?",
      options: [
        { text: "$P(a) = 0.5,\\ P(b) = 0.5,\\ P(c) = 0$", correct: true, feedback: "All non-negative, sum 1. A probability of 0 is allowed." },
        { text: "$P(a) = 0.6,\\ P(b) = 0.6,\\ P(c) = -0.2$", feedback: "It sums to 1, but $-0.2$ breaks Axiom 1." },
        { text: "$P(a) = 0.3,\\ P(b) = 0.3,\\ P(c) = 0.3$", feedback: "The total is 0.9, so $P(S) \\neq 1$. That breaks Axiom 2." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-3-q4",
      variant: "concept",
      question: "If $A \\subseteq B$, which statement must be true?",
      options: [
        { text: "$P(A) \\le P(B)$", correct: true, feedback: "Monotonicity: $P(B) = P(A) + P(B \\cap A')$ and the second term is non-negative." },
        { text: "$P(A) < P(B)$", feedback: "Equality is possible, e.g. if $B \\cap A'$ has probability 0, or if $A = B$." },
        { text: "$P(A) + P(B) = 1$", feedback: "Nothing forces that. Take $A = B = S$: the sum is 2." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-3-q5",
      variant: "practice",
      question: "The odds against an event are $7 : 5$. What is the probability that the event happens?",
      options: [
        { text: "$\\frac{5}{12}$", correct: true, feedback: "7 shares against, 5 for, 12 in total: $P = \\frac{5}{12}$." },
        { text: "$\\frac{7}{12}$", feedback: "That is the probability it does *not* happen. 'Against' puts the unfavourable shares first." },
        { text: "$\\frac{5}{7}$", feedback: "Probability divides by the total $7 + 5$, not by the 'against' shares." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-3-q6",
      variant: "practice",
      question:
        "In a race with one winner, the odds against horse $A$ are $4 : 1$ and the odds against horse $B$ are $7 : 3$. What is the probability that $A$ or $B$ wins?",
      options: [
        { text: "$\\frac{1}{2}$", correct: true, feedback: "$P(A) = \\frac{1}{5}$ and $P(B) = \\frac{3}{10}$. Only one horse wins, so they are exclusive: $\\frac{2}{10} + \\frac{3}{10} = \\frac{1}{2}$." },
        { text: "$\\frac{4}{15}$", feedback: "That adds the 'for' shares and the totals separately, $\\frac{1 + 3}{5 + 10}$. Convert each to a probability first, then add." },
        { text: "$\\frac{1}{4} + \\frac{3}{7}$", feedback: "Those are the odds read as for : against ratios, $\\frac{1}{4}$ and $\\frac{3}{7}$. Probability divides by the total shares." },
        { text: "$\\frac{3}{50}$", feedback: "Multiplying gives nothing meaningful here, and both horses cannot win. Use Axiom 3." },
      ],
      hint: "Odds against $a : b$ give $P = \\frac{b}{a + b}$.",
    },
    {
      type: "quiz",
      id: "pr1-3-q7",
      variant: "practice",
      question:
        "Three mutually exclusive events have probabilities $\\frac{1 + 2p}{4}$, $\\frac{1 - p}{2}$ and $\\frac{1 - p}{4}$. What is the set of possible values of $p$?",
      options: [
        { text: "$0 \\le p \\le 1$", correct: true, feedback: "Each in $[0, 1]$ gives $-\\frac{1}{2} \\le p \\le 1$. The sum $\\frac{4 - p}{4} \\le 1$ forces $p \\ge 0$. Together: $[0, 1]$." },
        { text: "$-\\frac{1}{2} \\le p \\le 1$", feedback: "Each probability is fine on this range, but you forgot that their sum (the probability of the union) cannot exceed 1." },
        { text: "$0 \\le p \\le \\frac{3}{2}$", feedback: "For $p > 1$ the second and third probabilities become negative." },
        { text: "$-1 \\le p \\le 1$", feedback: "That comes from the second event alone. Check the others, and the sum." },
      ],
      hint: "Two kinds of condition: each probability in $[0, 1]$, and the sum at most 1.",
    },
    {
      type: "quiz",
      id: "pr1-3-q8",
      variant: "concept",
      question:
        "Three mutually exclusive events have probabilities $0.5$, $0.4$ and $0.3$. What is wrong?",
      options: [
        { text: "Their union would have probability $1.2 > 1$, which the axioms forbid.", correct: true, feedback: "Each number is fine alone, but Axiom 3 makes the union's probability the sum, and Rule 4 caps it at 1." },
        { text: "Nothing: each number is between 0 and 1.", feedback: "That checks each event on its own. Mutually exclusive events must also have a total of at most 1." },
        { text: "The probabilities must add to exactly 1.", feedback: "Only if the events are also exhaustive (cover all of $S$). Here the sum must be *at most* 1, and 1.2 fails that." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "addition-rule",
  title: "1.4 · The Addition Rule",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Axiom 3 adds probabilities only when events cannot happen together. What if they overlap? Try it on the grid. Let $A$ = \"first die is even\" (18 cells) and $B$ = \"sum is 7\" (6 cells). Adding $18 + 6 = 24$ counts some cells twice.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "two-dice",
        events: [
          { id: "A", label: "first die even", latex: "A", preset: "first-even" },
          { id: "B", label: "sum is 7", latex: "B", preset: "sum-eq", value: 7 },
        ],
        combine: "union",
        allowCombineToggle: true,
        track: "event-A",
        seed: 42,
        caption:
          "Switch between A∩B and A∪B. The overlap is (2,5), (4,3), (6,1): 3 cells shaded by both A and B. The union has 18 + 6 − 3 = 21 cells.",
      },
    },
    {
      type: "text",
      content:
        "The three cells $(2,5), (4,3), (6,1)$ are in both events. Adding $n(A) + n(B)$ counts them once for $A$ and again for $B$, so subtract them once: $n(A \\cup B) = 18 + 6 - 3 = 21$ and $P(A \\cup B) = \\frac{21}{36} = \\frac{7}{12}$.",
    },
    {
      type: "text",
      content:
        "**Derivation from the axioms** (so it works for every probability, not only counting). Split $A \\cup B$ into two disjoint pieces: all of $A$, and the part of $B$ outside $A$. Also split $B$ into the disjoint pieces $A \\cap B$ and $B \\cap A'$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} P(A \\cup B) &= P(A) + P(B \\cap A') \\\\ P(B) &= P(A \\cap B) + P(B \\cap A') \\end{aligned}",
    },
    {
      type: "text",
      content: "Subtract the second line from the first; the unknown $P(B \\cap A')$ cancels:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Addition rule",
      content:
        "For any events $A$ and $B$:\n\n$\\displaystyle P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$\n\nIf $A$ and $B$ are mutually exclusive, $P(A \\cap B) = 0$ and this reduces to Axiom 3.",
    },
    {
      type: "text",
      content:
        "**Three events.** Add the three probabilities. Each pairwise overlap has been counted twice, so subtract the three pairwise intersections. But look at the centre, $A \\cap B \\cap C$: it was added 3 times and subtracted 3 times, so now it is not counted at all. Add it back once:",
    },
    {
      type: "math",
      latex:
        "P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(B \\cap C) - P(C \\cap A) + P(A \\cap B \\cap C)",
    },
    {
      type: "table",
      headers: ["Region of the Venn diagram", "Added", "Subtracted", "Added back", "Net"],
      rows: [
        ["In exactly one event", "1", "0", "0", "1"],
        ["In exactly two events", "2", "1", "0", "1"],
        ["In all three events", "3", "3", "1", "1"],
      ],
    },
    {
      type: "text",
      content:
        "Every region ends up counted exactly once, which is why the formula is right. This alternating pattern is called **inclusion–exclusion**.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Reading regions",
      content:
        "Many questions ask for one *region* of the Venn diagram rather than the whole union. Read each one off the picture.\n\n**$A$ but not $B$.** $A$ splits into $A \\cap B$ and $A \\cap B'$, so $P(A \\cap B') = P(A) - P(A \\cap B)$.\n\n**Exactly one of $A$, $B$.** That is $A$ only plus $B$ only: $[P(A) - P(A \\cap B)] + [P(B) - P(A \\cap B)] = P(A) + P(B) - 2P(A \\cap B)$. The overlap is removed twice, not once, because this time it is not wanted at all.\n\n**Bounds on the overlap.** $A \\cap B$ sits inside both $A$ and $B$, so $P(A \\cap B) \\le \\min(P(A), P(B))$. And $P(A \\cup B) \\le 1$ in the addition rule gives $P(A \\cap B) \\ge P(A) + P(B) - 1$. Equivalently, $\\max(P(A), P(B)) \\le P(A \\cup B) \\le \\min(1, P(A) + P(B))$.\n\n**Three events.** Write $S_1 = P(A) + P(B) + P(C)$, $S_2$ = the sum of the three pairwise intersections, $S_3 = P(A \\cap B \\cap C)$. A point in exactly two events is counted once in $S_2$; a point in all three is counted 3 times in $S_2$ and 3 times in $S_1$. Tracking the regions gives\n\n$P(\\text{exactly one}) = S_1 - 2S_2 + 3S_3$, $\\quad P(\\text{exactly two}) = S_2 - 3S_3$, $\\quad P(\\text{at least two}) = S_2 - 2S_3$.",
    },
    {
      type: "text",
      content:
        "**Worked example: reading the regions of a survey.** Of 100 students, 50 read newspaper $A$, 40 read $B$, 30 read $C$; 20 read $A$ and $B$, 15 read $B$ and $C$, 10 read $A$ and $C$; 5 read all three.\n\n1. Totals: $S_1 = 50 + 40 + 30 = 120$, $S_2 = 20 + 15 + 10 = 45$, $S_3 = 5$.\n2. Exactly two: $S_2 - 3S_3 = 45 - 15 = 30$. (Check: $A \\cap B$ only is $20 - 5 = 15$, $B \\cap C$ only is $10$, $A \\cap C$ only is $5$; total 30.)\n3. Exactly one: $S_1 - 2S_2 + 3S_3 = 120 - 90 + 15 = 45$. (Check: $A$ only is $50 - 15 - 5 - 5 = 25$, $B$ only is $40 - 15 - 10 - 5 = 10$, $C$ only is $30 - 10 - 5 - 5 = 10$; total 45.)\n4. At least one: $45 + 30 + 5 = 80$, which matches inclusion–exclusion $120 - 45 + 5$.\n5. So $P(\\text{exactly one}) = 0.45$ and $P(\\text{exactly two}) = 0.30$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: divisible by 2 or 3.** A number is chosen at random from 1 to 100. Find the probability that it is divisible by 2 or 3.\n\n1. $A$ = divisible by 2: $\\lfloor 100/2 \\rfloor = 50$ numbers.\n2. $B$ = divisible by 3: $\\lfloor 100/3 \\rfloor = 33$ numbers.\n3. $A \\cap B$ = divisible by 6: $\\lfloor 100/6 \\rfloor = 16$ numbers.\n4. $n(A \\cup B) = 50 + 33 - 16 = 67$, so $P = \\frac{67}{100} = 0.67$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: add a third divisor.** Same choice, divisible by 2, 3 or 5.\n\n1. Singles: $50 + 33 + 20 = 103$.\n2. Pairs: by 6: 16, by 10: 10, by 15: 6. Total 32.\n3. Triple: by 30: 3.\n4. $n = 103 - 32 + 3 = 74$, so $P = 0.74$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: two subjects.** In a class of 60 students, 30 take NCC, 32 take NSS and 24 take both. A student is chosen at random.\n\n1. $P(\\text{NCC or NSS}) = \\frac{30}{60} + \\frac{32}{60} - \\frac{24}{60} = \\frac{38}{60} = \\frac{19}{30}$.\n2. $P(\\text{neither}) = 1 - \\frac{19}{30} = \\frac{11}{30}$.\n3. $P(\\text{NCC only}) = P(A) - P(A \\cap B) = \\frac{30 - 24}{60} = \\frac{1}{10}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style): bounds on an unknown overlap.** In a town, 60% of households read an English paper ($E$) and 50% read a Hindi paper ($H$). Nobody tells us how many read both. Find the smallest and largest possible values of $P(E \\cap H)$, and the range of $P(E \\cup H)$.\n\n1. *Largest overlap.* $E \\cap H$ sits inside $H$, so by monotonicity $P(E \\cap H) \\le P(H) = 0.5$. *Why this can happen:* if every Hindi reader also reads English, $H \\subseteq E$ and the overlap is all of $H$.\n2. *Smallest overlap.* Rearrange the addition rule and use $P(E \\cup H) \\le 1$:",
    },
    {
      type: "math",
      latex:
        "P(E \\cap H) = P(E) + P(H) - P(E \\cup H) \\ge 0.6 + 0.5 - 1 = 0.1",
    },
    {
      type: "text",
      content:
        "*Why this can happen:* if every household reads at least one paper, $P(E \\cup H) = 1$ and the overlap is as small as it can be.\n3. So $0.1 \\le P(E \\cap H) \\le 0.5$, and correspondingly $P(E \\cup H) = 1.1 - P(E \\cap H)$ lies between $0.6$ and $1$.\n4. *Picture it.* Slide the Hindi circle inside the English one (overlap 0.5, union 0.6), then pull it outward until the two circles fill the whole square (overlap 0.1, union 1). Every position in between is possible.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: P(A or B) = P(A) + P(B) always",
      content:
        "Plain addition is only for mutually exclusive events. If $P(A) = 0.7$ and $P(B) = 0.6$, adding gives $1.3$, which is impossible. That tells you the events *must* overlap, by at least $0.3$. Whenever a sum of probabilities exceeds 1, you have double-counted an intersection.",
    },
    {
      type: "quiz",
      id: "pr1-4-q1",
      variant: "concept",
      question: "$P(A) = 0.7$ and $P(B) = 0.6$. What can you conclude?",
      options: [
        { text: "$A$ and $B$ overlap: $P(A \\cap B) \\ge 0.3$.", correct: true, feedback: "Since $P(A \\cup B) \\le 1$, the addition rule gives $P(A \\cap B) = 1.3 - P(A \\cup B) \\ge 0.3$." },
        { text: "$P(A \\cup B) = 1.3$", feedback: "A probability cannot exceed 1. Plain addition double-counts the overlap." },
        { text: "The numbers are inconsistent; no such events exist.", feedback: "They exist fine, as long as they overlap by at least 0.3." },
        { text: "$P(A \\cup B) = 1$", feedback: "Possible but not forced. $P(A \\cup B)$ could be anything from 0.7 to 1, depending on the overlap." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-4-q2",
      variant: "practice",
      question: "$P(A) = 0.5$, $P(B) = 0.4$ and $P(A \\cup B) = 0.7$. What is the probability that exactly one of $A$, $B$ occurs?",
      options: [
        { text: "$0.5$", correct: true, feedback: "$P(A \\cap B) = 0.5 + 0.4 - 0.7 = 0.2$. Exactly one is the union minus the overlap: $0.7 - 0.2 = 0.5$." },
        { text: "$0.7$", feedback: "That is 'at least one', which includes 'both'." },
        { text: "$0.2$", feedback: "That is 'both'." },
        { text: "$0.9$", feedback: "That is $P(A) + P(B)$, which counts the overlap twice." },
      ],
      hint: "First find $P(A \\cap B)$ from the addition rule.",
    },
    {
      type: "quiz",
      id: "pr1-4-q3",
      variant: "practice",
      question: "Two dice are rolled. What is the probability that the sum is 7 or the roll is a double?",
      options: [
        { text: "$\\frac{1}{3}$", correct: true, feedback: "A double sums to an even number, so the events are exclusive: $\\frac{6}{36} + \\frac{6}{36} = \\frac{12}{36}$." },
        { text: "$\\frac{11}{36}$", feedback: "You subtracted an overlap that doesn't exist. Can a double sum to 7?" },
        { text: "$\\frac{1}{36}$", feedback: "That would be the overlap if there were one. There is none." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-4-q4",
      variant: "practice",
      question:
        "A number is chosen at random from 1 to 105. What is the probability that it is divisible by 3, 5 or 7?",
      options: [
        { text: "$\\frac{19}{35}$", correct: true, feedback: "$35 + 21 + 15 - 7 - 5 - 3 + 1 = 57$, and $\\frac{57}{105} = \\frac{19}{35}$." },
        { text: "$\\frac{71}{105}$", feedback: "That adds the singles without removing the overlaps." },
        { text: "$\\frac{56}{105}$", feedback: "You removed the pairs but forgot to add back 105 itself, which is divisible by all three." },
      ],
      hint: "Counts: by 3: 35, by 5: 21, by 7: 15, by 15: 7, by 21: 5, by 35: 3, by 105: 1.",
    },
    {
      type: "quiz",
      id: "pr1-4-q5",
      variant: "concept",
      question: "In the three-event formula, why is $P(A \\cap B \\cap C)$ added back at the end?",
      options: [
        { text: "The centre region is added three times and then subtracted three times, so without it, it would not be counted at all.", correct: true, feedback: "Exactly. Adding it back once gives a net count of 1, like every other region." },
        { text: "To make sure the final answer is not above 1.", feedback: "The term fixes a counting error. Keeping the answer at most 1 is a side effect." },
        { text: "Because it was subtracted twice in the pairwise step.", feedback: "The centre lies in all three pairwise intersections, so it is subtracted three times, not twice." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-4-q6",
      variant: "practice",
      question:
        "For events $A$, $B$, $C$: $P(A \\cap B) = 0.2$, $P(B \\cap C) = 0.15$, $P(C \\cap A) = 0.1$ and $P(A \\cap B \\cap C) = 0.05$. What is the probability that at least two of the events occur?",
      options: [
        { text: "$0.35$", correct: true, feedback: "$S_2 - 2S_3 = 0.45 - 0.10$. The centre is counted three times in $S_2$ but should count once, so remove it twice." },
        { text: "$0.45$", feedback: "Adding the three pairwise intersections counts the centre $A \\cap B \\cap C$ three times." },
        { text: "$0.30$", feedback: "That is $S_2 - 3S_3$, *exactly* two. 'At least two' also includes the centre." },
        { text: "$0.40$", feedback: "Removing the centre once still leaves it counted twice. It sits in all three pairwise overlaps." },
      ],
      hint: "Picture the Venn diagram: the three 'exactly two' regions plus the centre.",
    },
    {
      type: "quiz",
      id: "pr1-4-q7",
      variant: "practice",
      question:
        "In an exam, 70% of students passed Mathematics and 65% passed Physics. What is the smallest possible percentage who passed both?",
      options: [
        { text: "35%", correct: true, feedback: "$P(M \\cap P) \\ge 0.70 + 0.65 - 1 = 0.35$, reached when every student passed at least one subject." },
        { text: "0%", feedback: "Then the union would be $0.70 + 0.65 = 1.35 > 1$, impossible. The two groups must overlap." },
        { text: "65%", feedback: "That is the *largest* possible overlap, when every Physics pass also passed Maths." },
        { text: "45.5%", feedback: "$0.70 \\times 0.65$ assumes a special relation between the events (independence, Chapter 2) that the data do not give." },
      ],
      hint: "Use $P(A \\cup B) \\le 1$ in the addition rule.",
    },
    {
      type: "quiz",
      id: "pr1-4-q8",
      variant: "practice",
      question:
        "A number is chosen at random from 1 to 50. What is the probability that it is divisible by 4 or by 6?",
      options: [
        { text: "$\\frac{8}{25}$", correct: true, feedback: "By 4: 12, by 6: 8, by both (that is, by 12, the LCM): 4. So $12 + 8 - 4 = 16$ and $\\frac{16}{50} = \\frac{8}{25}$." },
        { text: "$\\frac{2}{5}$", feedback: "$\\frac{12 + 8}{50}$ counts 12, 24, 36, 48 twice." },
        { text: "$\\frac{9}{25}$", feedback: "That subtracts multiples of 24 (only 2 of them). The overlap is divisibility by $\\text{lcm}(4, 6) = 12$, not by $4 \\times 6$." },
      ],
      hint: "The overlap is 'divisible by the LCM of 4 and 6'.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "complement-and-birthday",
  title: "1.5 · The Complement Trick and the Birthday Problem",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "The gambler Chevalier de Méré had a puzzle. He had won steadily betting on **at least one six in 4 rolls of a die**. So he reasoned that **at least one double-six in 24 rolls of two dice** should be just as good: a double-six is 6 times rarer, and 24 is 6 times 4. Yet the second bet seemed to lose (or at least his reasoning troubled him), and in 1654 he put the puzzle to Pascal, whose correspondence with Fermat helped start probability theory.",
    },
    {
      type: "text",
      content:
        "\"At least one six\" is messy: exactly one six, or two, or three, or four. Its complement is clean: **no six at all**. In each roll the chance of no six is $\\frac{5}{6}$, and the 4 rolls give $6^4$ equally likely sequences of which $5^4$ contain no six. So",
    },
    {
      type: "math",
      latex:
        "P(\\text{at least one six in 4 rolls}) = 1 - \\left(\\frac{5}{6}\\right)^4 = 1 - \\frac{625}{1296} = \\frac{671}{1296} \\approx 0.518",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The complement trick",
      content:
        "$\\displaystyle P(\\text{at least one}) = 1 - P(\\text{none})$\n\nUse it whenever an event is described by \"at least one\", or more generally whenever the complement has fewer cases than the event.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "1 - (5/6)^x",
        exprLatex: "P(n) = 1 - \\left(\\tfrac{5}{6}\\right)^{n}",
        min: 1,
        max: 30,
        step: 1,
        initial: 4,
        inputLabel: "Rolls n",
        outputLabel: "P(at least one six)",
      },
    },
    {
      type: "text",
      content:
        "Slide from 3 to 4: the probability crosses $\\frac{1}{2}$ at exactly 4 rolls (3 rolls give $\\frac{91}{216} \\approx 0.421$). De Méré's first bet was a small but real edge. Notice also that the curve climbs towards 1 and never reaches it.",
    },
    {
      type: "text",
      content:
        "Now the second bet. Two dice show a double-six with probability $\\frac{1}{36}$, so no double-six has probability $\\frac{35}{36}$ per roll:",
    },
    {
      type: "math",
      latex:
        "P(\\text{at least one double-six in 24 rolls}) = 1 - \\left(\\frac{35}{36}\\right)^{24} \\approx 0.491",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "1 - (35/36)^x",
        exprLatex: "P(n) = 1 - \\left(\\tfrac{35}{36}\\right)^{n}",
        min: 1,
        max: 60,
        step: 1,
        initial: 24,
        inputLabel: "Rolls of two dice n",
        outputLabel: "P(at least one double-six)",
      },
    },
    {
      type: "text",
      content:
        "Just under $\\frac{1}{2}$, so the second bet loses in the long run. He needed 25 rolls ($\\approx 0.506$). His \"scale everything by 6\" rule fails because $1 - q^n$ is not proportional to $n$.",
    },
    {
      type: "quiz",
      id: "pr1-5-q5",
      variant: "concept",
      question:
        "De Méré bets on at least one double-six in 24 rolls of two dice. Is this a winning bet in the long run?",
      options: [
        {
          text: "No: $1 - \\left(\\frac{35}{36}\\right)^{24} \\approx 0.491 < 0.5$; he needs 25 rolls.",
          correct: true,
          feedback: "Right. The complement 'no double-six in 24 rolls' has probability $\\approx 0.509$, so the bet loses slightly more often than it wins.",
        },
        {
          text: "Yes, since $24 \\times \\frac{1}{36} = \\frac{2}{3}$.",
          feedback: "That adds the 24 rolls as if they were mutually exclusive, but two rolls can both be double-six. At 36 rolls the same method would give certainty.",
        },
        {
          text: "It is exactly even, since $\\frac{24}{36}$ scales $\\frac{4}{6}$ just as the first bet did.",
          feedback: "That is de Méré's own proportional-scaling error. $1 - q^n$ is not proportional to $n$, so scaling $q$ and $n$ together does not keep the probability fixed.",
        },
        {
          text: "Yes, since $\\left(\\frac{35}{36}\\right)^{24} \\approx 0.49$ is below 0.5.",
          feedback: "$\\left(\\frac{35}{36}\\right)^{24}$ is the probability of *no* double-six. The value is about 0.509, and 'at least one' is $1 - 0.509 \\approx 0.491$.",
        },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"at least one six in 4 rolls = 4/6\"",
      content:
        "Adding $\\frac{1}{6}$ four times treats the rolls as mutually exclusive events, but two rolls can both show a six, and that overlap is counted twice. The error becomes obvious at 6 rolls ($\\frac{6}{6} = 1$, certainty?) and 7 rolls ($\\frac{7}{6} > 1$). The correct answer is $1 - \\left(\\frac{5}{6}\\right)^4 \\approx 0.518$, well below $\\frac{4}{6} \\approx 0.667$.",
    },
    {
      type: "quiz",
      id: "pr1-5-q1",
      variant: "concept",
      question: "What is the probability of at least one six in 4 rolls of a fair die?",
      options: [
        { text: "$1 - \\left(\\frac{5}{6}\\right)^4 \\approx 0.518$", correct: true, feedback: "The complement of 'at least one six' is 'no six in any roll'." },
        { text: "$\\frac{4}{6}$", feedback: "That adds overlapping events as if they were exclusive. At 7 rolls the same method gives $\\frac{7}{6}$." },
        { text: "$\\left(\\frac{1}{6}\\right)^4$", feedback: "That is the probability of four sixes in a row, a much rarer event." },
        { text: "$\\left(\\frac{5}{6}\\right)^4$", feedback: "That is the probability of *no* six. Subtract it from 1." },
      ],
    },
    {
      type: "text",
      content:
        "**The birthday problem.** How many people must be in a room for it to be more likely than not that two share a birthday? Ignore 29 February and assume the 365 days are equally likely.",
    },
    {
      type: "text",
      content:
        "The complement again: \"at least one shared birthday\" is messy, but \"all birthdays different\" is a product. Line the people up. The first can have any of 365 days; the second must avoid 1 day, so 364 choices; the third must avoid 2, and so on:",
    },
    {
      type: "math",
      latex:
        "P(\\text{all } n \\text{ different}) = \\frac{365}{365} \\cdot \\frac{364}{365} \\cdot \\frac{363}{365} \\cdots \\frac{365 - n + 1}{365} = \\frac{{}^{365}P_n}{365^{\\,n}}",
    },
    {
      type: "math",
      latex: "P(\\text{some shared birthday}) = 1 - \\frac{{}^{365}P_n}{365^{\\,n}}",
    },
    {
      type: "text",
      content:
        "The exact product is awkward to evaluate by hand, but there is a good approximation. Each factor is $1 - \\frac{k}{365}$, and for small $t$, $1 - t \\approx e^{-t}$. Multiplying the exponentials adds the exponents: $\\frac{0 + 1 + \\cdots + (n-1)}{365} = \\frac{n(n-1)}{730}$. So",
    },
    {
      type: "math",
      latex: "P(\\text{some shared birthday}) \\approx 1 - e^{-n(n-1)/730}",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "1 - exp(-x*(x - 1)/730)",
        exprLatex: "P(n) \\approx 1 - e^{-n(n-1)/730}",
        min: 2,
        max: 80,
        step: 1,
        initial: 23,
        inputLabel: "People n",
        outputLabel: "P(a shared birthday)",
      },
    },
    {
      type: "table",
      headers: ["People n", "10", "20", "22", "23", "30", "40", "50", "70"],
      rows: [
        ["Exact P(shared)", "0.117", "0.411", "0.476", "0.507", "0.706", "0.891", "0.970", "0.999"],
        ["Approximation", "0.116", "0.406", "0.469", "0.500", "0.696", "0.882", "0.965", "0.999"],
      ],
    },
    {
      type: "text",
      content:
        "The approximation crosses $\\frac{1}{2}$ just below 23 (at $n \\approx 22.9999$), so it shows 0.500 there, while the exact value 0.507 is clearly above. Both agree that the crossing is at 23.",
    },
    {
      type: "text",
      content:
        "The crossing is at **23 people**. The reason it is so small: with $n$ people there are ${}^nC_2$ *pairs*, and each pair could match. 23 people make ${}^{23}C_2 = 253$ pairs. The count of pairs grows like $n^2$, which is exactly the $n(n-1)$ in the exponent.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"you need 183 people\"",
      content:
        "183 is half of 365, and the intuition behind it is \"half the days must be covered\". But a match can happen between *any* two people, not just with one fixed day. (The question \"does someone share **my** birthday?\" is different: it needs $1 - \\left(\\frac{364}{365}\\right)^n > \\frac{1}{2}$, which takes $n = 253$ others. Even that is not 183.)",
    },
    {
      type: "quiz",
      id: "pr1-5-q2",
      variant: "concept",
      question: "Roughly how many people are needed for a better-than-even chance that two of them share a birthday?",
      options: [
        { text: "23", correct: true, feedback: "At 23 the probability is about 0.507. With 253 pairs, there are many chances for a match." },
        { text: "183", feedback: "That halves 365, which answers no real question. Matches can occur between any pair of people." },
        { text: "366", feedback: "366 people *guarantees* a match (pigeonhole). Better than even needs far fewer." },
        { text: "253", feedback: "253 is the number needed for someone to match *your* birthday, a different and much harder event." },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example: a birthday-style variant.** Four people are chosen. Assuming the 12 months are equally likely, find the probability that at least two share a birth month.\n\n1. All four in different months: $\\frac{12 \\cdot 11 \\cdot 10 \\cdot 9}{12^4} = \\frac{11880}{20736} = \\frac{55}{96}$.\n2. At least two share: $1 - \\frac{55}{96} = \\frac{41}{96} \\approx 0.427$.\n3. With only four people, the chance of a shared month is already over 40%.",
    },
    {
      type: "text",
      content:
        "**Worked example: a random ATM PIN.** A 4-digit PIN (digits 0 to 9, repeats allowed, leading 0 allowed) is generated at random. Find the probability that some digit appears more than once.\n\n1. *Sample space.* Each of the 4 places has 10 choices, so $n(S) = 10^4 = 10000$ equally likely PINs.\n2. *Complement.* \"Some digit repeats\" covers one pair, two pairs, a triple, four of a kind… Its complement \"all four digits different\" is one clean product. *Why:* this is the birthday problem with 10 \"days\" and 4 \"people\".",
    },
    {
      type: "math",
      latex:
        "P(\\text{all different}) = \\frac{10 \\cdot 9 \\cdot 8 \\cdot 7}{10^4} = \\frac{5040}{10000} = 0.504",
    },
    {
      type: "text",
      content:
        "3. $P(\\text{some repeat}) = 1 - 0.504 = 0.496$, almost a coin flip. Most people guess far lower, for the same reason they guess 183 in the birthday problem: they forget how many *pairs* of positions there are (${}^4C_2 = 6$).",
    },
    {
      type: "text",
      content:
        "**Worked example (exam style): at least one ace.** Five cards are dealt from a well-shuffled deck. Find the probability of at least one ace.\n\n1. *Why the complement:* \"at least one ace\" splits into 1, 2, 3 or 4 aces, four separate counts. \"No ace\" is a single count: all 5 cards come from the 48 non-aces.\n2. *Count both sides as unordered hands* (the consistency rule from Lesson 0.5, which Lesson 1.6 makes a habit):",
    },
    {
      type: "math",
      latex:
        "P(\\text{no ace}) = \\frac{{}^{48}C_5}{{}^{52}C_5} = \\frac{48 \\cdot 47 \\cdot 46 \\cdot 45 \\cdot 44}{52 \\cdot 51 \\cdot 50 \\cdot 49 \\cdot 48} = \\frac{35673}{54145} \\approx 0.659",
    },
    {
      type: "text",
      content:
        "3. $P(\\text{at least one ace}) = 1 - \\frac{35673}{54145} = \\frac{18472}{54145} \\approx 0.341$.\n4. *Sanity check:* the naive $5 \\times \\frac{4}{52} \\approx 0.385$ is too big. It counts hands with two aces twice, which is exactly the error the complement avoids.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam style): how many trials?** How many times must a fair coin be tossed so that the probability of at least one head exceeds $0.99$?\n\n1. The complement is \"all tails\": 1 of the $2^n$ equally likely sequences, so $P(\\text{no head}) = \\frac{1}{2^n}$.\n2. We need $1 - \\frac{1}{2^n} > 0.99$, that is $\\frac{1}{2^n} < 0.01$, that is $2^n > 100$. *Why flip the inequality this way:* it turns a probability condition into a plain power-of-2 comparison.\n3. $2^6 = 64 < 100$ but $2^7 = 128 > 100$, so the least $n$ is **7**.",
    },
    {
      type: "quiz",
      id: "pr1-5-q3",
      variant: "practice",
      question: "A family has 3 children, each equally likely to be a boy or a girl. What is the probability of at least one girl?",
      options: [
        { text: "$\\frac{7}{8}$", correct: true, feedback: "The complement is 'all boys', with probability $\\frac{1}{8}$." },
        { text: "$\\frac{3}{8}$", feedback: "That is 'exactly one girl'. 'At least one' also includes two and three girls." },
        { text: "$\\frac{1}{2}$", feedback: "Use the complement: $1 - P(\\text{no girls})$." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-5-q4",
      variant: "practice",
      question: "What is the smallest number of rolls of a fair die for which $P(\\text{at least one six})$ exceeds $0.9$?",
      options: [
        { text: "13", correct: true, feedback: "You need $\\left(\\frac{5}{6}\\right)^n < 0.1$. At $n = 12$ it is about 0.112; at $n = 13$ about 0.093." },
        { text: "6", feedback: "At 6 rolls $1 - \\left(\\frac{5}{6}\\right)^6 \\approx 0.665$. The '6 rolls makes it certain' idea is the $\\frac{n}{6}$ error." },
        { text: "10", feedback: "At 10 rolls $1 - \\left(\\frac{5}{6}\\right)^{10} \\approx 0.838$. Not enough yet." },
        { text: "9", feedback: "At 9 rolls $1 - \\left(\\frac{5}{6}\\right)^9 \\approx 0.81$, still short of 0.9." },
      ],
      hint: "Use the first function machine and slide $n$ until the output passes 0.9.",
    },
    {
      type: "quiz",
      id: "pr1-5-q6",
      variant: "practice",
      question:
        "A bicycle lock has a 3-digit code (digits 0 to 9, repeats allowed), set at random. What is the probability that at least one digit is repeated?",
      options: [
        { text: "$0.28$", correct: true, feedback: "All different: $\\frac{10 \\cdot 9 \\cdot 8}{1000} = 0.72$. So some repeat has probability $1 - 0.72 = 0.28$." },
        { text: "$0.72$", feedback: "That is the probability that all three digits are *different*. Take the complement." },
        { text: "$0.3$", feedback: "$3 \\times \\frac{1}{10}$ adds the three pairs of positions as if they could not match at the same time. Codes like 777 are counted three times." },
        { text: "$0.01$", feedback: "That is 'all three digits the same' (10 codes out of 1000), only one way of repeating." },
      ],
      hint: "Count the codes with all digits different first.",
    },
    {
      type: "quiz",
      id: "pr1-5-q7",
      variant: "practice",
      question:
        "What is the least number of tosses of a fair coin for which the probability of at least one head exceeds $0.95$?",
      options: [
        { text: "5", correct: true, feedback: "Need $\\frac{1}{2^n} < 0.05$, that is $2^n > 20$. $2^4 = 16$ is too small, $2^5 = 32$ works." },
        { text: "4", feedback: "$1 - \\frac{1}{16} = 0.9375$, just short of 0.95." },
        { text: "20", feedback: "That is the value $2^n$ must exceed, not $n$ itself." },
        { text: "2", feedback: "$2 \\times \\frac{1}{2} = 1$ adds the tosses as if exclusive. Two tosses give $1 - \\frac{1}{4} = 0.75$." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "probability-by-counting",
  title: "1.6 · Probability by Counting",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Classical probability is a ratio of two counts. When the sample space is too big to draw (${}^{52}C_5 = 2{,}598{,}960$ poker hands) we count with the tools of Lesson 0.5: the multiplication principle, ${}^nP_r$ and ${}^nC_r$. There is one rule to keep in mind throughout this lesson.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The consistency rule",
      content:
        "Choose **one** description of an outcome (ordered or unordered) and use it for **both** the numerator and the denominator. If outcomes are unordered selections, count both with ${}^nC_r$. If they are ordered sequences, count both with ${}^nP_r$ or the multiplication principle. Either way, the outcomes you count must be equally likely.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: an urn, two ways.** An urn has 5 red and 3 blue balls. Two are drawn without replacement. Find $P(\\text{both red})$.\n\n*Unordered:* $\\;\\dfrac{{}^5C_2}{{}^8C_2} = \\dfrac{10}{28} = \\dfrac{5}{14}$.\n\n*Ordered:* $\\;\\dfrac{5 \\times 4}{8 \\times 7} = \\dfrac{20}{56} = \\dfrac{5}{14}$.\n\nThe answers agree because each unordered pair corresponds to exactly $2! = 2$ ordered pairs, both in the event and in the sample space, and the factor of 2 cancels.",
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
          draws: 2,
          replacement: false,
          trackColor: "red",
          trackCount: 2,
        },
        seed: 14,
        caption:
          "Draw 2 balls from 5 red and 3 blue, without replacement. The frequency of 'both red' settles at 5/14 ≈ 0.357. Toggle replacement to see it change to (5/8)² ≈ 0.391.",
      },
    },
    {
      type: "table",
      headers: ["Method", "Numerator", "Denominator", "Result"],
      rows: [
        ["Unordered / unordered", "⁵C₂ = 10", "⁸C₂ = 28", "5/14 ✓"],
        ["Ordered / ordered", "5 × 4 = 20", "8 × 7 = 56", "5/14 ✓"],
        ["Unordered / ordered (mixed)", "⁵C₂ = 10", "8 × 7 = 56", "5/28 ✗"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: mixing ordered and unordered counts",
      content:
        "The third row is the classic error: counting the event as a *selection* but the sample space as a *sequence*. The denominator is then twice too big, so the answer is half the true value. Before dividing, ask: does my numerator count the same *kind* of object as my denominator?",
    },
    {
      type: "text",
      content:
        "**Worked example 2: mixed colours.** Same urn, draw 3. Find $P(\\text{at least 2 red})$.\n\n1. $n(S) = {}^8C_3 = 56$.\n2. Exactly 2 red: ${}^5C_2 \\cdot {}^3C_1 = 10 \\cdot 3 = 30$.\n3. Exactly 3 red: ${}^5C_3 = 10$.\n4. $P = \\frac{30 + 10}{56} = \\frac{40}{56} = \\frac{5}{7}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: card hands.** Two cards are drawn from a deck. $P(\\text{both aces}) = \\frac{{}^4C_2}{{}^{52}C_2} = \\frac{6}{1326} = \\frac{1}{221}$.\n\nFour cards are drawn. Find $P(\\text{one from each suit})$.\n\n1. $n(S) = {}^{52}C_4 = 270725$.\n2. Choose one card from each suit: $13 \\times 13 \\times 13 \\times 13 = 28561$.\n3. $P = \\frac{28561}{270725} = \\frac{2197}{20825} \\approx 0.105$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4: a committee with a constraint.** A committee of 3 is chosen at random from 4 men and 6 women.\n\n1. $n(S) = {}^{10}C_3 = 120$.\n2. Exactly 2 women: ${}^6C_2 \\cdot {}^4C_1 = 15 \\cdot 4 = 60$, so $P = \\frac{60}{120} = \\frac{1}{2}$.\n3. At least one man: complement is 'all women', ${}^6C_3 = 20$. So $P = 1 - \\frac{20}{120} = \\frac{5}{6}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: letters together.** The letters of ORANGE are arranged at random. Find $P(\\text{the three vowels are together})$.\n\n1. Here order matters: $n(S) = 6! = 720$ arrangements, all equally likely.\n2. Glue O, A, E into one block. Arrange the block with R, N, G: $4! = 24$ ways. Arrange letters inside the block: $3! = 6$ ways.\n3. $n(E) = 24 \\times 6 = 144$, so $P = \\frac{144}{720} = \\frac{1}{5}$.\n4. By the complement, $P(\\text{vowels not all together}) = \\frac{4}{5}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 6: repeated letters and the gap method.** The letters of ASSASSIN are arranged at random. Find $P(\\text{no two S's are together})$.\n\n1. The letters are A, A, I, N and four S's. Distinct arrangements: $n(S) = \\frac{8!}{4! \\, 2!} = 840$.\n2. Are these 840 patterns equally likely? Yes: imagine the letters labelled ($S_1, \\ldots, S_4$, $A_1, A_2$). All $8!$ labelled orders are equally likely, and each pattern corresponds to exactly $4! \\, 2! = 48$ of them. Equal-sized groups of equally likely outcomes are equally likely.\n3. *Gap method:* first arrange the non-S letters A, A, I, N in $\\frac{4!}{2!} = 12$ ways. That creates 5 gaps (\\_ X \\_ X \\_ X \\_ X \\_). Placing the S's in 4 different gaps keeps them apart: ${}^5C_4 = 5$ ways.\n4. $n(E) = 12 \\times 5 = 60$, so $P = \\frac{60}{840} = \\frac{1}{14}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 7: quality control.** A box of 12 bulbs contains 3 defective ones. An inspector picks 4 at random. Find (a) $P(\\text{none defective})$ and (b) $P(\\text{exactly one defective})$.\n\n1. *One outcome* is a set of 4 bulbs; order of picking is irrelevant, so count with ${}^nC_r$ on both sides. $n(S) = {}^{12}C_4 = 495$.\n2. *(a)* All 4 from the 9 good bulbs: ${}^9C_4 = 126$. *Why only the good bulbs:* \"none defective\" leaves no choice about which pool to draw from.",
    },
    {
      type: "math",
      latex: "P(\\text{none defective}) = \\frac{{}^9C_4}{{}^{12}C_4} = \\frac{126}{495} = \\frac{14}{55} \\approx 0.255",
    },
    {
      type: "text",
      content:
        "3. *(b)* Choose which defective bulb (${}^3C_1 = 3$) and which 3 good ones (${}^9C_3 = 84$). *Why multiply:* each choice of defective bulb pairs with each choice of good bulbs (multiplication principle). $n(E) = 3 \\times 84 = 252$, so $P = \\frac{252}{495} = \\frac{28}{55} \\approx 0.509$.\n4. *Consequence:* the inspector finds at least one defective bulb with probability $1 - \\frac{14}{55} = \\frac{41}{55} \\approx 0.745$. A sample of 4 misses a 25% defect rate about a quarter of the time.",
    },
    {
      type: "text",
      content:
        "**Worked example 8 (JEE style): three numbers in AP.** Three distinct numbers are chosen at random from $1, 2, \\ldots, 20$. Find the probability that they form an arithmetic progression.\n\n1. $n(S) = {}^{20}C_3 = 1140$ unordered triples.\n2. *Key idea:* arrange the chosen numbers as $a < b < c$. They are in AP exactly when $a + c = 2b$, so $b = \\frac{a + c}{2}$. *Why this helps:* once $a$ and $c$ are fixed, $b$ is forced, and it is a whole number exactly when $a$ and $c$ have the same parity. So count pairs $\\{a, c\\}$ instead of triples.\n3. Same-parity pairs: two odd numbers from the 10 odd ones, or two even from the 10 even ones:",
    },
    {
      type: "math",
      latex: "n(E) = {}^{10}C_2 + {}^{10}C_2 = 45 + 45 = 90, \\qquad P = \\frac{90}{1140} = \\frac{3}{38}",
    },
    {
      type: "text",
      content:
        "4. *Check the middle term is valid:* for same-parity $a < c$, the middle $b = \\frac{a + c}{2}$ lies strictly between them, so it is a different number from 1 to 20. Every such pair gives exactly one AP triple, and every AP triple arises this way.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "A three-question checklist",
      content:
        "1. **What is one outcome?** A set of cards, a sequence of letters, a list of dice values?\n2. **Are these outcomes equally likely?** If not, change the description.\n3. **Does the numerator count the same kind of outcome as the denominator?**",
    },
    {
      type: "quiz",
      id: "pr1-6-q1",
      variant: "concept",
      question:
        "A student computes $P(\\text{both red})$ for 2 draws from 5 red and 3 blue as $\\frac{{}^5C_2}{8 \\times 7} = \\frac{5}{28}$. What went wrong?",
      options: [
        {
          text: "The numerator counts unordered pairs but the denominator counts ordered pairs; each pair is counted twice below and once above.",
          correct: true,
          feedback: "Right. Use ${}^8C_2 = 28$ below, or $5 \\times 4 = 20$ above. Both give $\\frac{5}{14}$.",
        },
        { text: "Nothing: ${}^5C_2$ and $8 \\times 7$ are both correct counts.", feedback: "Each is a correct count of something, but of different kinds of object. The ratio is meaningless." },
        { text: "The draws should be with replacement, giving $\\left(\\frac{5}{8}\\right)^2$.", feedback: "The problem says without replacement. The fix is consistency, not a different model." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-6-q2",
      variant: "practice",
      question: "From 5 red and 3 blue balls, 2 are drawn without replacement. What is the probability of one of each colour?",
      options: [
        { text: "$\\frac{15}{28}$", correct: true, feedback: "${}^5C_1 \\cdot {}^3C_1 = 15$ pairs out of ${}^8C_2 = 28$." },
        { text: "$\\frac{15}{56}$", feedback: "Mixed counts: 15 unordered pairs over 56 ordered pairs. Ordered, the event has $2 \\times 15 = 30$." },
        { text: "$\\frac{15}{64}$", feedback: "$\\frac{5}{8} \\cdot \\frac{3}{8}$ assumes replacement and also forgets that red-then-blue and blue-then-red both count." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-6-q3",
      variant: "practice",
      question:
        "Three cards are drawn from a well-shuffled deck. What is the probability that all three are of the same suit?",
      options: [
        { text: "$\\frac{22}{425}$", correct: true, feedback: "$\\frac{4 \\cdot {}^{13}C_3}{{}^{52}C_3} = \\frac{4 \\cdot 286}{22100} = \\frac{22}{425} \\approx 0.052$." },
        { text: "$\\frac{11}{850}$", feedback: "That is one particular suit. Multiply by 4 for the choice of suit." },
        { text: "$\\frac{1}{16}$", feedback: "$\\left(\\frac{1}{4}\\right)^2$ ignores that cards are not replaced: after two hearts, only 11 of the remaining 50 are hearts." },
      ],
      hint: "Choose the suit, then choose 3 cards from its 13.",
    },
    {
      type: "quiz",
      id: "pr1-6-q4",
      variant: "practice",
      question:
        "The letters of the word ORANGE are arranged at random. What is the probability that the arrangement begins with O?",
      options: [
        { text: "$\\frac{1}{6}$", correct: true, feedback: "Fix O first; the other 5 letters fill the rest in $5! = 120$ ways, and $\\frac{120}{720} = \\frac{1}{6}$. By symmetry, each letter is equally likely to be first." },
        { text: "$\\frac{1}{720}$", feedback: "That is the probability of one specific full arrangement." },
        { text: "$\\frac{1}{2}$", feedback: "O is one of 3 vowels, but the question is about O specifically, and there are 6 letters." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-6-q5",
      variant: "practice",
      question: "A committee of 3 is chosen from 4 men and 6 women. What is the probability that it has at least one man?",
      options: [
        { text: "$\\frac{5}{6}$", correct: true, feedback: "$1 - \\frac{{}^6C_3}{{}^{10}C_3} = 1 - \\frac{20}{120}$." },
        { text: "$\\frac{1}{2}$", feedback: "That is the probability of exactly 2 women (so exactly 1 man). 'At least one man' also includes 2 or 3 men." },
        { text: "$\\frac{2}{5}$", feedback: "That is the fraction of men in the group, not a committee probability." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-6-q6",
      variant: "practice",
      question:
        "A 3-digit number is formed at random from the digits 1, 2, 3, 4, 5 without repetition. What is the probability that it is even?",
      options: [
        { text: "$\\frac{2}{5}$", correct: true, feedback: "Units digit 2 or 4 (2 ways), then $4 \\times 3$ for the other places: $\\frac{24}{60}$. Or by symmetry: the units digit is equally likely to be any of the 5 digits, and 2 are even." },
        { text: "$\\frac{1}{2}$", feedback: "Half of all whole numbers are even, but here only 2 of the 5 available digits are." },
        { text: "$\\frac{3}{5}$", feedback: "That is the probability it is odd: units digit 1, 3 or 5." },
        { text: "$\\frac{24}{125}$", feedback: "The 24 even numbers are right, but 125 allows repeated digits. Without repetition there are $5 \\times 4 \\times 3 = 60$ numbers." },
      ],
      hint: "Fill the units place first.",
    },
    {
      type: "quiz",
      id: "pr1-6-q7",
      variant: "practice",
      question:
        "A batch of 10 phone chargers contains 2 faulty ones. A buyer tests 3 chosen at random. What is the probability that at least one faulty charger is found?",
      options: [
        { text: "$\\frac{8}{15}$", correct: true, feedback: "None faulty: $\\frac{{}^8C_3}{{}^{10}C_3} = \\frac{56}{120} = \\frac{7}{15}$. So at least one faulty is $1 - \\frac{7}{15} = \\frac{8}{15}$." },
        { text: "$\\frac{7}{15}$", feedback: "That is the probability that *no* faulty charger is found. Take the complement." },
        { text: "$\\frac{3}{5}$", feedback: "$3 \\times \\frac{2}{10}$ adds the three tests as if exclusive, double-counting samples with both faulty chargers." },
        { text: "$\\frac{1}{15}$", feedback: "That is *both* faulty chargers found (${}^2C_2 \\cdot {}^8C_1 = 8$ of 120). 'At least one' also includes exactly one." },
      ],
      hint: "Use the complement: all 3 chosen from the 8 good chargers.",
    },
    {
      type: "quiz",
      id: "pr1-6-q8",
      variant: "practice",
      question:
        "Three distinct numbers are chosen at random from $1, 2, \\ldots, 10$. What is the probability that they form an arithmetic progression?",
      options: [
        { text: "$\\frac{1}{6}$", correct: true, feedback: "Same-parity end pairs: ${}^5C_2 + {}^5C_2 = 20$, and ${}^{10}C_3 = 120$. So $\\frac{20}{120} = \\frac{1}{6}$." },
        { text: "$\\frac{1}{3}$", feedback: "That counts each AP twice (as $a, b, c$ and $c, b, a$) while the denominator counts unordered triples. Keep both sides unordered." },
        { text: "$\\frac{7}{60}$", feedback: "That counts only common differences 1 and 2 ($8 + 6 = 14$ triples). Differences 3 and 4 add $4 + 2$ more. Counting same-parity end pairs avoids missing any." },
        { text: "$\\frac{4}{9}$", feedback: "$\\frac{20}{45}$ divides by the number of *pairs* ${}^{10}C_2$, but outcomes are triples: divide by ${}^{10}C_3$." },
      ],
      hint: "The smallest and largest numbers fix the middle one, and they must have the same parity.",
    },
    {
      type: "quiz",
      id: "pr1-6-q9",
      variant: "concept",
      question:
        "For the 12-bulb box (3 defective), a student writes $P(\\text{exactly one defective}) = \\frac{3 \\times {}^9C_3}{12 \\times 11 \\times 10 \\times 9}$. What is wrong?",
      options: [
        { text: "The numerator counts unordered selections but the denominator counts ordered ones; use ${}^{12}C_4 = 495$ below.", correct: true, feedback: "Right. Each set of 4 bulbs appears $4! = 24$ times in $12 \\times 11 \\times 10 \\times 9$, so the answer comes out 24 times too small." },
        { text: "The numerator should be $3 \\times 9$, one defective and one good bulb.", feedback: "Four bulbs are chosen: one defective and *three* good, so ${}^9C_3$ is right." },
        { text: "Nothing: both counts are correct.", feedback: "Each count is correct for its own kind of object, but they are different kinds. That breaks the consistency rule." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-1-mastery",
  title: "1.7 · Chapter 1 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Mixed questions from the whole chapter. For each one, decide first **which tool** fits: counting equally likely outcomes, an axiom-based deduction, the addition rule, the complement, or odds. Work it out on paper before looking at the options.",
    },
    {
      type: "quiz",
      id: "pr1-7-q1",
      variant: "mastery",
      question: "Two fair dice are rolled. What is the probability that the larger of the two numbers is 5?",
      options: [
        { text: "$\\frac{1}{4}$", correct: true, feedback: "Max $\\le 5$ has $5^2 = 25$ cells and max $\\le 4$ has 16, so max $= 5$ has $9$ cells: $\\frac{9}{36}$." },
        { text: "$\\frac{11}{36}$", feedback: "$\\frac{11}{36}$ is P(max = 6): the $36 - 25 = 11$ cells containing a 6." },
        { text: "$\\frac{1}{6}$", feedback: "The six possible maxima are not equally likely." },
        { text: "$\\frac{5}{18}$", feedback: "That counts 10 cells. List them: $(5,1)$ to $(5,5)$ and $(1,5)$ to $(4,5)$ make 9." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-7-q2",
      variant: "mastery",
      question: "$P(A) = 0.42$, $P(B) = 0.48$ and $P(A \\cap B) = 0.16$. Find $P(A' \\cap B')$.",
      options: [
        { text: "$0.26$", correct: true, feedback: "$P(A \\cup B) = 0.42 + 0.48 - 0.16 = 0.74$. By De Morgan, $A' \\cap B' = (A \\cup B)'$, so $1 - 0.74$." },
        { text: "$0.10$", feedback: "That is $1 - P(A) - P(B)$, which forgets to add back the overlap." },
        { text: "$0.84$", feedback: "That is $1 - P(A \\cap B) = P(A' \\cup B')$, a different event." },
        { text: "$0.3016$", feedback: "Multiplying $0.58 \\times 0.52$ has no justification here. It is only valid for a special kind of event (independent events, Chapter 2), and the data do not say $A$ and $B$ are of that kind." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-7-q3",
      variant: "mastery",
      question:
        "In a survey of 100 students: 50 read newspaper $A$, 40 read $B$, 30 read $C$, 20 read $A$ and $B$, 15 read $B$ and $C$, 10 read $A$ and $C$, and 5 read all three. What is the probability that a random student reads none of them?",
      options: [
        { text: "$0.20$", correct: true, feedback: "$50 + 40 + 30 - 20 - 15 - 10 + 5 = 80$ read at least one, so $1 - 0.80$." },
        { text: "$0.25$", feedback: "You forgot to add back the 5 who read all three." },
        { text: "$0$", feedback: "That treats $50 + 40 + 30 = 120 \\ge 100$ as meaning everyone reads something. The overlaps must be removed first." },
      ],
      hint: "Three-event inclusion–exclusion gives the number reading at least one.",
    },
    {
      type: "quiz",
      id: "pr1-7-q4",
      variant: "mastery",
      question: "Three fair dice are rolled. What is the probability of at least one six?",
      options: [
        { text: "$\\frac{91}{216}$", correct: true, feedback: "$1 - \\left(\\frac{5}{6}\\right)^3 = 1 - \\frac{125}{216}$." },
        { text: "$\\frac{1}{2}$", feedback: "That is $\\frac{3}{6}$, adding overlapping events as if exclusive." },
        { text: "$\\frac{75}{216}$", feedback: "That is exactly one six: $3 \\cdot \\frac{1}{6} \\cdot \\left(\\frac{5}{6}\\right)^2$. 'At least one' is larger." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-7-q5",
      variant: "mastery",
      question: "If $P(E) = 0.2$, what are the odds in favour of $E$?",
      options: [
        { text: "$1 : 4$", correct: true, feedback: "$P(E) : P(E') = 0.2 : 0.8 = 1 : 4$." },
        { text: "$1 : 5$", feedback: "Odds compare 'for' with 'against', not with the total. $1 : 5$ would mean $P = \\frac{1}{6}$." },
        { text: "$4 : 1$", feedback: "That is the odds *against* $E$." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-7-q6",
      variant: "mastery",
      question:
        "A bag has 4 white and 6 black balls. Three are drawn at random without replacement. What is the probability that exactly 2 are white?",
      options: [
        { text: "$\\frac{3}{10}$", correct: true, feedback: "$\\frac{{}^4C_2 \\cdot {}^6C_1}{{}^{10}C_3} = \\frac{6 \\cdot 6}{120} = \\frac{36}{120}$." },
        { text: "$\\frac{1}{2}$", feedback: "That is exactly 1 white: ${}^4C_1 \\cdot {}^6C_2 = 60$ out of 120." },
        { text: "$\\frac{1}{20}$", feedback: "That mixes an unordered count ($36$) with an ordered sample space ($720$)." },
        { text: "$\\frac{1}{30}$", feedback: "That is 3 white: $\\frac{{}^4C_3}{{}^{10}C_3} = \\frac{4}{120}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-7-q7",
      variant: "mastery",
      question:
        "Five people are chosen at random. Assuming the 7 days of the week are equally likely, what is the probability that at least two were born on the same day of the week?",
      options: [
        {
          text: "$1 - \\frac{7 \\cdot 6 \\cdot 5 \\cdot 4 \\cdot 3}{7^5} \\approx 0.85$",
          correct: true,
          feedback: "Birthday logic: all different is $\\frac{2520}{16807} \\approx 0.15$, so a match is about 85% likely.",
        },
        { text: "$\\frac{5}{7}$", feedback: "That scales linearly with the number of people. Probabilities of 'a match' do not add like this." },
        { text: "$1 - \\left(\\frac{6}{7}\\right)^5 \\approx 0.54$", feedback: "That is the chance that one of 5 others shares a *specific* day, like 'matching my birthday'. Any pair can match." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-7-q8",
      variant: "mastery",
      question:
        "A die is loaded so that $P(k) = ck^2$ for faces $k = 1, \\ldots, 6$. What is $P(\\text{face} \\ge 5)$?",
      options: [
        { text: "$\\frac{61}{91}$", correct: true, feedback: "$1 + 4 + 9 + 16 + 25 + 36 = 91$, so $c = \\frac{1}{91}$ and $P = \\frac{25 + 36}{91}$." },
        { text: "$\\frac{1}{3}$", feedback: "That is the fair-die answer. The weights are not equal." },
        { text: "$\\frac{11}{21}$", feedback: "That uses weights $k$, not $k^2$." },
      ],
      hint: "Find $c$ from Axiom 2 first.",
    },
    {
      type: "quiz",
      id: "pr1-7-q9",
      variant: "mastery",
      question: "Which of these is *impossible* for two events $A$ and $B$?",
      options: [
        { text: "$P(A) = 0.6$, $P(B) = 0.3$, $P(A \\cap B) = 0.4$", correct: true, feedback: "$A \\cap B \\subseteq B$, so monotonicity demands $P(A \\cap B) \\le P(B) = 0.3$." },
        { text: "$P(A) = 0.6$, $P(B) = 0.7$, $P(A \\cap B) = 0.3$", feedback: "Possible: the union is $1.0$, which is allowed." },
        { text: "$P(A) = 0.5$, $P(B) = 0.5$, $P(A \\cap B) = 0$", feedback: "Possible: $A$ and $B = A'$, for instance." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-7-q10",
      variant: "mastery",
      question:
        "A drawing pin is tossed 400 times and lands point-up 248 times. What is the empirical probability that it lands point-down?",
      options: [
        { text: "$0.38$", correct: true, feedback: "$\\frac{400 - 248}{400} = \\frac{152}{400} = 0.38$." },
        { text: "$0.62$", feedback: "That is $\\frac{248}{400}$, the probability of point-up. The question asks for the complement." },
        { text: "$0.5$", feedback: "Two categories are not two equally likely outcomes. A pin is not symmetric, which is exactly why we use data." },
        { text: "$\\frac{152}{248}$", feedback: "That compares down with up, which is the odds in favour of point-down, not a probability. Divide by the total 400." },
      ],
    },
    {
      type: "quiz",
      id: "pr1-7-q11",
      variant: "mastery",
      question: "The letters of MONDAY are arranged at random. What is the probability that the two vowels are together?",
      options: [
        { text: "$\\frac{1}{3}$", correct: true, feedback: "Glue O and A into one block: $5!$ arrangements of the block and M, N, D, Y, times $2!$ inside the block. $\\frac{5! \\cdot 2!}{6!} = \\frac{240}{720}$." },
        { text: "$\\frac{1}{6}$", feedback: "$\\frac{5!}{6!}$ forgets that the glued block can read OA or AO. Multiply by $2!$." },
        { text: "$\\frac{1}{15}$", feedback: "The vowels' two positions form one of ${}^6C_2 = 15$ equally likely pairs, but 5 of those pairs are adjacent, not 1: $\\frac{5}{15} = \\frac{1}{3}$." },
        { text: "$\\frac{2}{3}$", feedback: "That is the complement, the probability that the vowels are *not* together." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Every probability so far was measured with no extra information. Chapter 2 asks what happens when you *learn* something, such as \"the first die is even\". The sample space shrinks, and that shrinking is conditional probability.",
    },
  ]),
};

export const probabilityChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
