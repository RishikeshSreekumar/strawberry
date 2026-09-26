import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Probability Chapter 3 — Total Probability and Bayes' Theorem.
 * Split a problem by its hidden causes (the law of total probability), then
 * run the tree backwards from an observed effect to its likely cause (Bayes).
 * The base-rate trap, many-cause JEE problems, Monty Hall and sequential
 * updating all come from the same one-line derivation.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

/** The three-machine factory used in 3.1 and 3.2. */
const FACTORY_TREE = {
  label: "start",
  children: [
    {
      label: "M1",
      prob: 0.25,
      children: [
        { label: "D", prob: 0.05 },
        { label: "OK", prob: 0.95 },
      ],
    },
    {
      label: "M2",
      prob: 0.35,
      children: [
        { label: "D", prob: 0.04 },
        { label: "OK", prob: 0.96 },
      ],
    },
    {
      label: "M3",
      prob: 0.4,
      children: [
        { label: "D", prob: 0.02 },
        { label: "OK", prob: 0.98 },
      ],
    },
  ],
};

/** 1% prevalence, 99% sensitivity, 95% specificity. */
const MEDICAL_TREE = {
  label: "start",
  children: [
    {
      label: "Sick",
      prob: 0.01,
      children: [
        { label: "+", prob: 0.99 },
        { label: "−", prob: 0.01 },
      ],
    },
    {
      label: "Healthy",
      prob: 0.99,
      children: [
        { label: "+", prob: 0.05 },
        { label: "−", prob: 0.95 },
      ],
    },
  ],
};

const lesson01: LessonSeed = {
  slug: "law-of-total-probability",
  title: "3.1 · Partitions and the Law of Total Probability",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pr-3-total-probability-and-bayes.mp4",
      poster: "/videos/pr-3-total-probability-and-bayes.jpg",
      title: "Chapter 3 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "A factory makes bolts on three machines. Machine $M_1$ makes 25% of the output, $M_2$ makes 35% and $M_3$ makes 40%. Their defect rates are 5%, 4% and 2%. Pick a bolt off the end of the line. What is the chance it is defective?\n\nYou are not told which machine made it. That is the whole difficulty: the answer depends on a **hidden cause**. The trick of this lesson is to stop fighting the hidden cause and instead split the problem along it.",
    },
    {
      type: "text",
      content:
        "Draw the story as a tree. The first stage is the hidden cause (which machine), the second is the thing you care about (defective or not). Every bolt walks exactly one path from left to right.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        root: FACTORY_TREE,
        format: "decimal",
        highlight: { label: "bolt is defective", latex: "D", leaves: { matchLastStage: "D" } },
        editable: [
          { path: "0.0", label: "P(D\\mid M_1)", min: 0, max: 0.2, step: 0.01 },
          { path: "2", label: "P(M_3)", min: 0, max: 0.9, step: 0.01 },
        ],
        caption:
          "Three D-leaves, one per machine. Each leaf holds P(machine) × P(defective | machine); P(D) is their sum. Drag the sliders and watch which leaf moves the total most.",
      },
    },
    {
      type: "text",
      content:
        "Read the highlighted leaves. A defective bolt must have come from exactly one machine, so the event $D$ is cut into three non-overlapping pieces, and their probabilities add:",
    },
    {
      type: "math",
      latex:
        "P(D) = \\underbrace{0.25 \\times 0.05}_{0.0125} + \\underbrace{0.35 \\times 0.04}_{0.0140} + \\underbrace{0.40 \\times 0.02}_{0.0080} = 0.0345",
    },
    {
      type: "text",
      content:
        "So about 3.45% of all bolts are defective. Nothing new was used: the multiplication rule along each path, the addition rule across the leaves. The only new idea is *choosing* the first stage to be the hidden cause.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Partition of the sample space",
      content:
        "Events $E_1, E_2, \\ldots, E_n$ form a **partition** of $S$ if\n1. they are pairwise disjoint: $E_i \\cap E_j = \\varnothing$ for $i \\ne j$,\n2. they are exhaustive: $E_1 \\cup E_2 \\cup \\cdots \\cup E_n = S$,\n3. each has $P(E_i) > 0$.\nIn words: every outcome lands in exactly one $E_i$. The machines are a partition of the bolts.",
    },
    {
      type: "text",
      content:
        "**Deriving the law.** Let $E_1, \\ldots, E_n$ partition $S$ and let $A$ be any event. Because the $E_i$ cover $S$ without overlapping, they slice $A$ into disjoint pieces:",
    },
    {
      type: "math",
      latex: "A = (A \\cap E_1) \\cup (A \\cap E_2) \\cup \\cdots \\cup (A \\cap E_n)",
    },
    {
      type: "text",
      content:
        "Disjoint pieces add, and each piece is a path in the tree, so it is a product by the multiplication rule $P(A \\cap E_i) = P(E_i)\\,P(A \\mid E_i)$:",
    },
    {
      type: "math",
      latex: "P(A) = \\sum_{i=1}^{n} P(A \\cap E_i) = \\sum_{i=1}^{n} P(E_i)\\,P(A \\mid E_i)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Law of total probability",
      content:
        "If $E_1, \\ldots, E_n$ partition $S$, then for any event $A$:\n$P(A) = P(E_1)P(A \\mid E_1) + P(E_2)P(A \\mid E_2) + \\cdots + P(E_n)P(A \\mid E_n)$.\nOn a tree: add up every leaf where $A$ happens.",
    },
    {
      type: "text",
      content:
        "**Read it as a weighted average.** The weights $P(E_i)$ add to 1, so $P(A)$ is an *average* of the conditional probabilities $P(A \\mid E_i)$, where each cause counts in proportion to how often it occurs. That reading gives you a free sanity check: $P(A)$ must lie between the smallest and the largest $P(A \\mid E_i)$. Here $0.0345$ sits between $0.02$ and $0.05$, and it is pulled toward $0.02$ because $M_3$, the careful machine, does the most work.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Don't average the rates without weights",
      content:
        "The tempting shortcut is $\\frac{5\\% + 4\\% + 2\\%}{3} \\approx 3.67\\%$. That treats the three machines as if each made a third of the bolts. They don't. A plain average is only right when the causes are equally likely; otherwise each rate must be weighted by how often its cause happens.",
    },
    {
      type: "text",
      content:
        "**Worked example: an urn chosen by a die.** Urn I holds 3 red and 2 black balls; urn II holds 1 red and 4 black. Roll a die: on a 1 or 2 draw from urn I, otherwise from urn II. Find $P(\\text{red})$.\n\n**Step 1: name the partition.** $E_1$ = \"urn I used\", $E_2$ = \"urn II used\". Exactly one happens. $P(E_1) = \\frac{2}{6} = \\frac{1}{3}$, $P(E_2) = \\frac{2}{3}$.\n\n**Step 2: conditional probabilities.** $P(R \\mid E_1) = \\frac{3}{5}$, $P(R \\mid E_2) = \\frac{1}{5}$.\n\n**Step 3: weight and add.**",
    },
    {
      type: "math",
      latex:
        "P(R) = \\frac{1}{3}\\cdot\\frac{3}{5} + \\frac{2}{3}\\cdot\\frac{1}{5} = \\frac{3}{15} + \\frac{2}{15} = \\frac{1}{3}",
    },
    {
      type: "text",
      content:
        "**Check:** $\\frac{1}{3}$ lies between $\\frac{1}{5}$ and $\\frac{3}{5}$, and closer to $\\frac{1}{5}$ because urn II is used twice as often. The unweighted average $\\frac{2}{5}$ would be wrong.",
    },
    {
      type: "text",
      content:
        "**Worked example: getting to school.** 60% of students come by bus and 40% walk. A bus rider is late with probability $0.2$; a walker with probability $0.05$. What fraction of students are late?\n\nThe partition is {bus, walk}. Then",
    },
    {
      type: "math",
      latex: "P(L) = 0.6 \\times 0.2 + 0.4 \\times 0.05 = 0.12 + 0.02 = 0.14",
    },
    {
      type: "table",
      headers: ["Cause $E_i$", "$P(E_i)$", "$P(L \\mid E_i)$", "Leaf $P(E_i)P(L \\mid E_i)$"],
      rows: [
        ["Bus", "0.6", "0.2", "0.12"],
        ["Walk", "0.4", "0.05", "0.02"],
        ["**Total**", "1", "", "**0.14**"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "The table layout",
      content:
        "For any total-probability problem, make three columns: prior weight, conditional rate, product. The last column's sum is $P(A)$. Next lesson you will see that the same table, read one more column to the right, is Bayes' theorem.",
    },
    {
      type: "text",
      content:
        "**Worked example (application): dropped calls.** A mobile network handles calls through three kinds of tower: 50% of calls go through urban towers, 30% through suburban towers and 20% through rural towers. The drop rates are 1%, 2% and 5%. What fraction of all calls are dropped?\n\n**Step 1: name the partition.** Every call goes through exactly one kind of tower, so {urban, suburban, rural} is a partition with weights $0.5, 0.3, 0.2$. *Why this step:* the drop rate is only known *per tower type*, so that is the hidden cause to split on.\n\n**Step 2: one leaf per cause.** Urban: $0.5 \\times 0.01 = 0.005$. Suburban: $0.3 \\times 0.02 = 0.006$. Rural: $0.2 \\times 0.05 = 0.010$. *Why this step:* each leaf is $P(\\text{tower} \\cap \\text{dropped})$, a path through the tree, so it is a product.\n\n**Step 3: add the leaves.**",
    },
    {
      type: "math",
      latex: "P(\\text{dropped}) = 0.005 + 0.006 + 0.010 = 0.021",
    },
    {
      type: "text",
      content:
        "**Check:** $2.1\\%$ lies between $1\\%$ and $5\\%$. Notice that the rural towers carry only a fifth of the calls but produce almost half the drops ($0.010$ of $0.021$). That observation is already a Bayes question, and it is where the next lesson starts.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam-style, CBSE/JEE): two balls change bags.** Bag I holds 5 red and 3 black balls; bag II holds 4 red and 5 black. **Two** balls are moved at random from bag I to bag II, and then one ball is drawn from bag II. Find the probability that it is red.\n\n(The one-ball transfer and the urn that grows after each draw, both from Lesson 2.4, were already total-probability problems with a two-piece partition. Moving two balls needs three pieces.)\n\n**Step 1: find the hidden cause and partition on it.** What was moved decides what bag II looks like, so the partition is: $E_1$ = both red, $E_2$ = one of each, $E_3$ = both black. Out of $\\binom{8}{2} = 28$ equally likely pairs, $\\binom{5}{2} = 10$ are both red, $5 \\times 3 = 15$ are mixed and $\\binom{3}{2} = 3$ are both black. So $P(E_1) = \\frac{10}{28}$, $P(E_2) = \\frac{15}{28}$, $P(E_3) = \\frac{3}{28}$, and $10 + 15 + 3 = 28$ confirms nothing is missing. *Why this step:* you cannot write $P(\\text{red})$ directly, because bag II's contents are unknown until you fix what was moved.\n\n**Step 2: rebuild bag II in each case.** It now holds 11 balls: 6, 5 or 4 of them red. So $P(R \\mid E_1) = \\frac{6}{11}$, $P(R \\mid E_2) = \\frac{5}{11}$, $P(R \\mid E_3) = \\frac{4}{11}$. *Why this step:* the conditional probabilities are always computed from the situation **after** the hidden step.\n\n**Step 3: weight and add.**",
    },
    {
      type: "math",
      latex:
        "P(R) = \\frac{10}{28}\\cdot\\frac{6}{11} + \\frac{15}{28}\\cdot\\frac{5}{11} + \\frac{3}{28}\\cdot\\frac{4}{11} = \\frac{60 + 75 + 12}{308} = \\frac{147}{308} = \\frac{21}{44} \\approx 0.477",
    },
    {
      type: "text",
      content:
        "**Check:** $\\frac{21}{44}$ lies between the smallest and largest conditional values, $\\frac{4}{11} \\approx 0.36$ and $\\frac{6}{11} \\approx 0.55$, and sits nearest $\\frac{5}{11}$ because the mixed transfer is the most common. A second route: on average $2 \\times \\frac58 = 1.25$ red balls are moved, so bag II ends up with $4 + 1.25 = 5.25$ red balls out of 11 on average, and $\\frac{5.25}{11} = \\frac{21}{44}$. That shortcut is justified by linearity of expectation in Chapter 4; here it is simply a welcome confirmation.",
    },
    {
      type: "quiz",
      id: "pr3-1-q1",
      variant: "concept",
      question:
        "Plant X makes 90% of a company's phones with a 1% defect rate; plant Y makes 10% with an 11% defect rate. What is the probability a randomly chosen phone is defective?",
      options: [
        {
          text: "$0.02$",
          correct: true,
          feedback: "$0.9 \\times 0.01 + 0.1 \\times 0.11 = 0.009 + 0.011 = 0.02$. The big, careful plant drags the average toward 1%.",
        },
        {
          text: "$0.06$",
          feedback: "That is $\\frac{1\\% + 11\\%}{2}$, an unweighted average. It pretends each plant makes half the phones.",
        },
        { text: "$0.12$", feedback: "You added the two rates. Rates for different causes are averaged (with weights), never added." },
        { text: "$0.011$", feedback: "That is only plant Y's leaf. Add plant X's leaf, $0.009$, too." },
      ],
      hint: "Weight each plant's rate by its share of production.",
    },
    {
      type: "quiz",
      id: "pr3-1-q2",
      variant: "practice",
      question: "A die is rolled. Which of these collections is a partition of the sample space $\\{1,2,3,4,5,6\\}$?",
      options: [
        {
          text: "$\\{1, 2\\},\\ \\{3, 4, 5\\},\\ \\{6\\}$",
          correct: true,
          feedback: "No overlaps, nothing missing, none empty. Every roll lands in exactly one piece.",
        },
        { text: "$\\{1,2,3\\},\\ \\{3,4,5,6\\}$", feedback: "They overlap at 3, so a roll of 3 would be counted twice." },
        { text: "$\\{\\text{even}\\},\\ \\{1, 3\\}$", feedback: "5 is in neither piece, so they are not exhaustive." },
        { text: "$\\{\\text{prime}\\},\\ \\{\\text{even}\\}$", feedback: "2 is in both, and 1 is in neither." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-1-q3",
      variant: "practice",
      question:
        "Toss a fair coin. Heads: draw a ball from a bag with 2 red and 3 blue. Tails: draw from a bag with 4 red and 1 blue. What is $P(\\text{red})$?",
      options: [
        {
          text: "$\\dfrac{3}{5}$",
          correct: true,
          feedback: "$\\frac{1}{2}\\cdot\\frac{2}{5} + \\frac{1}{2}\\cdot\\frac{4}{5} = \\frac{2}{10} + \\frac{4}{10} = \\frac{3}{5}$. With equal weights the weighted average is the plain average. (Pooling all 10 balls also gives $\\frac{6}{10}$ here, but only because both bags hold 5 balls; with unequal bags pooling fails.)",
        },
        { text: "$\\dfrac{1}{5}$", feedback: "That is only the heads leaf, $\\frac12\\cdot\\frac25$. Add the tails leaf $\\frac12\\cdot\\frac45$." },
        { text: "$\\dfrac{4}{5}$", feedback: "That is $P(\\text{red} \\mid \\text{tails})$ only." },
        { text: "$\\dfrac{8}{25}$", feedback: "You multiplied the two conditional probabilities. The causes are alternatives, so their leaves add." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-1-q4",
      variant: "concept",
      question:
        "Three suppliers have late-delivery rates of 2%, 5% and 9%. Without knowing their market shares, which value is **impossible** for the overall late rate?",
      options: [
        {
          text: "$10\\%$",
          correct: true,
          feedback: "The total is a weighted average of 2%, 5% and 9%, so it must lie between 2% and 9%. No weighting can push it above the largest rate.",
        },
        { text: "$2.5\\%$", feedback: "Possible: if the 2% supplier handles almost everything." },
        { text: "$8\\%$", feedback: "Possible: if the 9% supplier dominates." },
        { text: "$5.3\\%$", feedback: "Possible for many choices of shares." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-1-q5",
      variant: "practice",
      question:
        "In a town, 30% of days are rainy. On a rainy day a bus is late with probability $0.5$, on a dry day with probability $0.1$. What is the probability the bus is late on a random day?",
      options: [
        { text: "$0.22$", correct: true, feedback: "$0.3 \\times 0.5 + 0.7 \\times 0.1 = 0.15 + 0.07 = 0.22$." },
        { text: "$0.30$", feedback: "That is the unweighted average of 0.5 and 0.1. Dry days are more than twice as common." },
        { text: "$0.15$", feedback: "That is only the rainy-day leaf. Dry days also produce late buses." },
        { text: "$0.6$", feedback: "Adding 0.5 and 0.1 treats the rates as if they were disjoint pieces of one event. They are conditional on different days." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-1-q6",
      variant: "practice",
      question:
        "Bag I has 3 white and 2 black balls; bag II has 2 white and 3 black. Two balls are moved at random from bag I to bag II, and then one ball is drawn from bag II. What is the probability that it is white?",
      options: [
        {
          text: "$\\dfrac{16}{35}$",
          correct: true,
          feedback: "Transfers: both white $\\frac{3}{10}$, one of each $\\frac{6}{10}$, both black $\\frac{1}{10}$. Bag II then has 7 balls with 4, 3 or 2 white: $\\frac{3}{10}\\cdot\\frac47 + \\frac{6}{10}\\cdot\\frac37 + \\frac{1}{10}\\cdot\\frac27 = \\frac{12 + 18 + 2}{70} = \\frac{32}{70} = \\frac{16}{35}$.",
        },
        { text: "$\\dfrac{3}{7}$", feedback: "That is the plain average of $\\frac47$, $\\frac37$ and $\\frac27$. The three transfers are not equally likely: one of each happens 6 times in 10." },
        { text: "$\\dfrac{2}{5}$", feedback: "That is bag II's white fraction before the transfer. The two moved balls change it." },
        { text: "$\\dfrac{6}{35}$", feedback: "That is only the both-white leaf, $\\frac{3}{10} \\cdot \\frac47$. Add the other two leaves." },
      ],
      hint: "Partition on what was moved (two white, one of each, two black), using $\\binom{5}{2} = 10$ equally likely pairs. Then rebuild bag II, now 7 balls, in each case.",
    },
    {
      type: "quiz",
      id: "pr3-1-q7",
      variant: "practice",
      question:
        "A call centre gets 60% of its calls in the morning, 30% in the afternoon and 10% in the evening. The probability a call is dropped is 1%, 2% and 6% respectively. What is the probability a random call is dropped?",
      options: [
        { text: "$0.018$", correct: true, feedback: "$0.6(0.01) + 0.3(0.02) + 0.1(0.06) = 0.006 + 0.006 + 0.006 = 0.018$. Each period contributes the same leaf, even though their rates differ sixfold." },
        { text: "$0.03$", feedback: "That is $\\frac{1\\% + 2\\% + 6\\%}{3}$, the unweighted average. Mornings are six times busier than evenings." },
        { text: "$0.09$", feedback: "You added the three rates. Each rate must first be weighted by its share of calls." },
        { text: "$0.006$", feedback: "That is a single leaf. Add all three." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "bayes-theorem",
  title: "3.2 · Reversing the Tree: Bayes' Theorem",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Back to the factory. An inspector picks a bolt, finds it **defective**, and wants to know which machine to blame. The tree answers forward questions, \"given the machine, how likely is a defect?\" The inspector is asking the backward question: \"given the defect, how likely is each machine?\"\n\nThat reversal is Bayes' theorem, and you already have everything needed for it.",
    },
    {
      type: "text",
      content:
        "**The picture first.** Once you know the bolt is defective, every OK-leaf is ruled out. Only the three D-leaves survive: $0.0125$, $0.0140$ and $0.0080$, with total $0.0345$. The machine that made the bolt is whichever D-leaf it came from, so each machine's share of the defective bolts is its leaf divided by the total.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        root: FACTORY_TREE,
        bayes: { observedLeaves: { matchLastStage: "D" }, observedLabel: "bolt is defective", population: 10000 },
        editable: [{ path: "0.0", label: "P(D\\mid M_1)", min: 0, max: 0.2, step: 0.01 }],
        caption:
          "Observing \"defective\" keeps only the D-leaves. Each machine's posterior is its leaf over their sum. Toggle to the reversed tree to see defectiveness as the first stage, and read the counts out of 10,000 bolts.",
      },
    },
    {
      type: "math",
      latex:
        "P(M_2 \\mid D) = \\frac{0.0140}{0.0125 + 0.0140 + 0.0080} = \\frac{0.0140}{0.0345} = \\frac{28}{69} \\approx 0.406",
    },
    {
      type: "text",
      content:
        "In natural frequencies: of 10,000 bolts, $M_1$ makes 2,500 and 125 are defective; $M_2$ makes 3,500 and 140 are defective; $M_3$ makes 4,000 and 80 are defective. Among the 345 defective bolts, 140 are from $M_2$. $\\frac{140}{345} = \\frac{28}{69}$. Same answer, no formula.",
    },
    {
      type: "text",
      content:
        "**Deriving the formula.** The joint probability $P(E_i \\cap A)$ can be computed by conditioning on either event:",
    },
    {
      type: "math",
      latex: "P(E_i)\\,P(A \\mid E_i) = P(E_i \\cap A) = P(A)\\,P(E_i \\mid A)",
    },
    {
      type: "text",
      content:
        "Divide by $P(A)$, and expand $P(A)$ with the law of total probability from 3.1:",
    },
    {
      type: "math",
      latex:
        "P(E_i \\mid A) = \\frac{P(E_i)\\,P(A \\mid E_i)}{P(A)} = \\frac{P(E_i)\\,P(A \\mid E_i)}{\\sum_{j=1}^{n} P(E_j)\\,P(A \\mid E_j)}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Bayes' theorem, with names",
      content:
        "For a partition $E_1, \\ldots, E_n$ and an observed event $A$ with $P(A) > 0$:\n$P(E_i \\mid A) = \\dfrac{P(E_i)\\,P(A \\mid E_i)}{\\sum_j P(E_j)\\,P(A \\mid E_j)}$\n**Prior** $P(E_i)$: how plausible the cause was before the evidence.\n**Likelihood** $P(A \\mid E_i)$: how well that cause explains the evidence.\n**Posterior** $P(E_i \\mid A)$: how plausible the cause is after the evidence.\nIn one line: posterior ∝ prior × likelihood, then rescale so the posteriors add to 1.",
    },
    {
      type: "text",
      content:
        "The numerator is one leaf; the denominator is the sum of all the leaves consistent with what you saw. That's the whole theorem. Everything else in this chapter is this sentence applied carefully.",
    },
    {
      type: "text",
      content:
        "**Worked example (in steps): which machine made the defective bolt?**\n\n**Step 1: partition and priors.** $P(M_1) = 0.25$, $P(M_2) = 0.35$, $P(M_3) = 0.40$.\n\n**Step 2: likelihoods of the evidence.** $P(D \\mid M_1) = 0.05$, $P(D \\mid M_2) = 0.04$, $P(D \\mid M_3) = 0.02$.\n\n**Step 3: joints (the leaves).** $0.0125$, $0.0140$, $0.0080$.\n\n**Step 4: total.** $P(D) = 0.0345$.\n\n**Step 5: divide.**",
    },
    {
      type: "table",
      headers: ["Machine", "Prior", "Likelihood $P(D \\mid M_i)$", "Joint", "Posterior $P(M_i \\mid D)$"],
      rows: [
        ["$M_1$", "0.25", "0.05", "0.0125", "$\\frac{25}{69} \\approx 0.362$"],
        ["$M_2$", "0.35", "0.04", "0.0140", "$\\frac{28}{69} \\approx 0.406$"],
        ["$M_3$", "0.40", "0.02", "0.0080", "$\\frac{16}{69} \\approx 0.232$"],
        ["**Total**", "1", "", "0.0345", "1"],
      ],
    },
    {
      type: "text",
      content:
        "Look at how the evidence shifted belief. $M_3$ was the most likely source of a *random* bolt (40%), but it is the least likely source of a *defective* one (23%), because it rarely makes defects. $M_1$ rose from 25% to 36%: it makes few bolts but a lot of bad ones. The posterior balances both how common a cause is and how well it explains what you saw.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "P(A | B) is not P(B | A)",
      content:
        "$P(D \\mid M_1) = 0.05$ but $P(M_1 \\mid D) \\approx 0.36$. The two conditionals answer different questions and can be wildly different. Swapping them is called **confusing the inverse**, and it is behind most real-world Bayes errors. Bayes' theorem is the correct way to swap.",
    },
    {
      type: "text",
      content:
        "**Worked example: hostel and grades.** In a college, 30% of students live in the hostel and 70% are day scholars. 50% of hostellers and 30% of day scholars get an A grade. A student chosen at random has an A. What is the probability they live in the hostel?\n\nLet $G$ be the event \"gets an A grade\" (a separate letter, so it doesn't clash with the $A$ in the formula).\n\n**Leaves:** hostel and $G$: $0.3 \\times 0.5 = 0.15$; day and $G$: $0.7 \\times 0.3 = 0.21$.\n\n**Total:** $P(G) = 0.36$.",
    },
    {
      type: "math",
      latex: "P(\\text{hostel} \\mid G) = \\frac{0.15}{0.36} = \\frac{5}{12} \\approx 0.417",
    },
    {
      type: "text",
      content:
        "The A grade raised the hostel probability from 30% to about 42%, because hostellers explain an A better. But day scholars are still more likely, simply because there are so many more of them.",
    },
    {
      type: "text",
      content:
        "**Worked example (application): a spam filter.** 40% of the email reaching an inbox is spam. The word \"free\" appears in 25% of spam emails and in 2% of genuine ones. An email containing \"free\" arrives. What is the probability it is spam?\n\n**Step 1: hypotheses and priors.** Spam $0.4$, genuine $0.6$. *Why this step:* before reading the email, the only information is how common spam is.\n\n**Step 2: likelihood of the evidence.** $P(\\text{free} \\mid \\text{spam}) = 0.25$, $P(\\text{free} \\mid \\text{genuine}) = 0.02$. *Why this step:* these measure how well each hypothesis explains the word you saw.\n\n**Step 3: joints and total.** $0.4 \\times 0.25 = 0.100$ and $0.6 \\times 0.02 = 0.012$, so $P(\\text{free}) = 0.112$.\n\n**Step 4: divide.**",
    },
    {
      type: "math",
      latex: "P(\\text{spam} \\mid \\text{free}) = \\frac{0.100}{0.100 + 0.012} = \\frac{0.100}{0.112} = \\frac{25}{28} \\approx 0.893",
    },
    {
      type: "text",
      content:
        "One word moved the spam probability from 40% to about 89%, because \"free\" is $\\frac{0.25}{0.02} = 12.5$ times more common in spam. Real filters do exactly this with thousands of words, updating once per word; you will see that chaining in 3.6.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam-style, CBSE): the late doctor.** A doctor visits a patient. From past experience, the probabilities that she comes by train, bus, scooter or some other means are $\\frac{3}{10}$, $\\frac15$, $\\frac{1}{10}$ and $\\frac25$. The probabilities that she is late are $\\frac14$ by train, $\\frac13$ by bus and $\\frac{1}{12}$ by scooter; by other means she is never late. She arrives late. What is the probability she came by train?\n\n**Step 1: check the partition.** $\\frac{3}{10} + \\frac15 + \\frac{1}{10} + \\frac25 = 1$, and she uses exactly one mode. *Why this step:* Bayes' denominator must cover every way the evidence can happen, so the causes must be exhaustive and disjoint.\n\n**Step 2: joints over a common denominator of 120.** *Why this step:* fractions with different denominators are error-prone; one denominator makes the final division a ratio of whole numbers.",
    },
    {
      type: "table",
      headers: ["Mode", "Prior", "$P(\\text{late} \\mid \\text{mode})$", "Joint", "Joint $\\times 120$"],
      rows: [
        ["Train", "$\\frac{3}{10}$", "$\\frac14$", "$\\frac{3}{40}$", "9"],
        ["Bus", "$\\frac15$", "$\\frac13$", "$\\frac{1}{15}$", "8"],
        ["Scooter", "$\\frac{1}{10}$", "$\\frac{1}{12}$", "$\\frac{1}{120}$", "1"],
        ["Other", "$\\frac25$", "0", "0", "0"],
        ["**Total**", "1", "", "$\\frac{18}{120}$", "18"],
      ],
    },
    {
      type: "math",
      latex: "P(\\text{train} \\mid \\text{late}) = \\frac{9}{9 + 8 + 1 + 0} = \\frac{9}{18} = \\frac{1}{2}",
    },
    {
      type: "text",
      content:
        "**Step 3: sanity check.** The \"other\" row has prior $\\frac25$, the biggest, yet posterior 0: a cause that *cannot* produce the evidence is ruled out entirely, however common it is. Train rose from 30% to 50% because it is both common and a frequent cause of lateness.",
    },
    {
      type: "quiz",
      id: "pr3-2-q1",
      variant: "practice",
      question: "Using the factory table, what is $P(M_3 \\mid D)$?",
      options: [
        { text: "$\\dfrac{16}{69}$", correct: true, feedback: "$\\frac{0.0080}{0.0345} = \\frac{80}{345} = \\frac{16}{69} \\approx 0.232$." },
        { text: "$0.40$", feedback: "That is the prior $P(M_3)$. Observing a defect changes it." },
        { text: "$0.02$", feedback: "That is the likelihood $P(D \\mid M_3)$, the conditional the wrong way round." },
        { text: "$0.008$", feedback: "That is the joint $P(M_3 \\cap D)$. Divide it by $P(D)$." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-2-q2",
      variant: "concept",
      question:
        "A report says \"5% of bolts from $M_1$ are defective.\" A reader concludes \"so 5% of defective bolts come from $M_1$.\" What is wrong?",
      options: [
        {
          text: "The reader swapped the conditional: $P(D \\mid M_1)$ was given, but $P(M_1 \\mid D)$ needs Bayes and the other machines' data.",
          correct: true,
          feedback: "Exactly. In our factory $P(M_1 \\mid D) \\approx 36\\%$, nowhere near 5%.",
        },
        { text: "Nothing: the two statements mean the same thing.", feedback: "They condition on different events. One looks inside $M_1$'s output, the other inside the defective pile." },
        { text: "The reader should have used $1 - 5\\% = 95\\%$.", feedback: "Complements don't reverse a conditional." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-2-q3",
      variant: "practice",
      question:
        "Bag I has 3 red and 4 black balls; bag II has 5 red and 6 black. A bag is chosen at random and a ball drawn from it is red. What is the probability it came from bag II?",
      options: [
        {
          text: "$\\dfrac{35}{68}$",
          correct: true,
          feedback: "Leaves: $\\frac12\\cdot\\frac37$ and $\\frac12\\cdot\\frac{5}{11}$. The halves cancel: $\\frac{5/11}{3/7 + 5/11} = \\frac{35/77}{68/77} = \\frac{35}{68}$.",
        },
        { text: "$\\dfrac{5}{11}$", feedback: "That is $P(\\text{red} \\mid \\text{II})$, the likelihood, not the posterior." },
        { text: "$\\dfrac{1}{2}$", feedback: "That is the prior. Bag II has a slightly higher red fraction ($\\frac{5}{11} \\approx 0.45$ vs $\\frac37 \\approx 0.43$), so a red ball nudges you toward bag II." },
        { text: "$\\dfrac{5}{8}$", feedback: "That pools red balls ($5$ of $3 + 5$), which would only be right if each red ball were equally likely to be drawn. The bags have different sizes." },
      ],
      hint: "Equal priors cancel, so the posterior is just each likelihood over the sum of likelihoods.",
    },
    {
      type: "quiz",
      id: "pr3-2-q4",
      variant: "concept",
      question: "In $P(E_i \\mid A) = \\dfrac{P(E_i)P(A \\mid E_i)}{P(A)}$, which quantity is the **prior**?",
      options: [
        { text: "$P(E_i)$", correct: true, feedback: "Your belief in cause $E_i$ before seeing $A$." },
        { text: "$P(A \\mid E_i)$", feedback: "That is the likelihood: how well $E_i$ predicts the evidence." },
        { text: "$P(E_i \\mid A)$", feedback: "That is the posterior, the output." },
        { text: "$P(A)$", feedback: "That is the evidence's total probability, the normaliser." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-2-q5",
      variant: "practice",
      question:
        "In the hostel example, what is the probability that a student with an A grade is a day scholar?",
      options: [
        { text: "$\\dfrac{7}{12}$", correct: true, feedback: "$\\frac{0.21}{0.36} = \\frac{7}{12}$. It pairs with $\\frac{5}{12}$ to make 1, as posteriors over a partition must." },
        { text: "$0.7$", feedback: "That is the prior share of day scholars, before the A grade was observed." },
        { text: "$0.3$", feedback: "That is $P(G \\mid \\text{day})$, a likelihood." },
        { text: "$0.21$", feedback: "That is the joint leaf. Divide by $P(G) = 0.36$." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-2-q6",
      variant: "practice",
      question: "In the late-doctor example, given that she is late, what is the probability she came by bus?",
      options: [
        { text: "$\\dfrac{4}{9}$", correct: true, feedback: "$\\frac{8}{18} = \\frac49$. With train at $\\frac{9}{18}$ and scooter at $\\frac{1}{18}$, the posteriors add to 1." },
        { text: "$\\dfrac{1}{5}$", feedback: "That is the prior $P(\\text{bus})$, before lateness was observed." },
        { text: "$\\dfrac{1}{3}$", feedback: "That is $P(\\text{late} \\mid \\text{bus})$, the likelihood." },
        { text: "$\\dfrac{1}{15}$", feedback: "That is the joint $P(\\text{bus} \\cap \\text{late})$. Divide by $P(\\text{late}) = \\frac{18}{120}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-2-q7",
      variant: "practice",
      question:
        "30% of a company's emails are spam. The word \"winner\" appears in 20% of spam and in 1% of genuine emails. An email contains \"winner\". What is the probability it is spam?",
      options: [
        {
          text: "$\\dfrac{60}{67}$",
          correct: true,
          feedback: "Joints: $0.3 \\times 0.2 = 0.06$ and $0.7 \\times 0.01 = 0.007$. $\\frac{0.06}{0.067} = \\frac{60}{67} \\approx 0.90$.",
        },
        { text: "$0.2$", feedback: "That is $P(\\text{winner} \\mid \\text{spam})$, the conditional the wrong way round." },
        { text: "$0.3$", feedback: "That is the prior. The word is 20 times commoner in spam, so it should rise a lot." },
        { text: "$0.067$", feedback: "That is $P(\\text{winner})$, the denominator." },
      ],
      hint: "Two leaves: spam and \"winner\", genuine and \"winner\". Posterior = spam leaf ÷ sum.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "base-rate-trap",
  title: "3.3 · The Base-Rate Trap",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A disease affects 1% of people. A test for it is excellent: it catches 99% of sick people, and it correctly clears 95% of healthy people. You test positive.\n\nBefore reading on, commit to a guess: what is the chance you actually have the disease? Most people, including many doctors in published surveys, say something around 95% or 99%.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The vocabulary of tests",
      content:
        "**Prevalence** (base rate): $P(D)$, the fraction of the population with the condition.\n**Sensitivity**: $P(+ \\mid D)$, how often the test catches a sick person.\n**Specificity**: $P(- \\mid D')$, how often it clears a healthy person.\n**False-positive rate**: $P(+ \\mid D') = 1 - \\text{specificity}$.\nThe question you care about, $P(D \\mid +)$, is none of these.",
    },
    {
      type: "text",
      content:
        "**Natural frequencies.** Forget formulas and imagine 10,000 people walking through the clinic.",
    },
    {
      type: "table",
      headers: ["", "Test $+$", "Test $-$", "Total"],
      rows: [
        ["Sick (1%)", "99", "1", "100"],
        ["Healthy (99%)", "495", "9,405", "9,900"],
        ["**Total**", "**594**", "9,406", "10,000"],
      ],
    },
    {
      type: "text",
      content:
        "100 people are sick, and the test flags 99 of them. 9,900 are healthy, and 5% of them, **495 people**, also get flagged. The positive pile has 594 people in it, and only 99 of them are sick:",
    },
    {
      type: "math",
      latex: "P(D \\mid +) = \\frac{99}{99 + 495} = \\frac{99}{594} = \\frac{1}{6} \\approx 16.7\\%",
    },
    {
      type: "text",
      content:
        "About one in six. A positive result from a 99%-sensitive test still leaves you **five times more likely to be healthy than sick**. The reason is visible in the table: the 5% false-positive rate is applied to a huge healthy group, and 5% of a huge number beats 99% of a tiny one.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        root: MEDICAL_TREE,
        editable: [
          { path: "0", label: "P(D)", min: 0.001, max: 0.5, step: 0.001 },
          { path: "1.0", label: "P(+\\mid \\text{healthy})", min: 0.001, max: 0.2, step: 0.001 },
        ],
        bayes: { observedLeaves: { matchLastStage: "+" }, observedLabel: "tests positive", population: 10000 },
        caption:
          "Slide the prevalence up and the posterior climbs fast; slide the false-positive rate down and it climbs too. The natural-frequency line counts the people in each positive leaf.",
      },
    },
    {
      type: "text",
      content:
        "Bayes' theorem says the same thing in symbols. Write $x = P(D)$ for the prior:",
    },
    {
      type: "math",
      latex: "P(D \\mid +) = \\frac{0.99\\,x}{0.99\\,x + 0.05\\,(1 - x)}",
    },
    {
      type: "text",
      content:
        "Treat the posterior as a function of the prior and plot it. Drag the point to see what the same positive test means for populations with different base rates.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "0.99*x/(0.99*x + 0.05*(1 - x))",
        exprLatex: "\\frac{0.99x}{0.99x + 0.05(1-x)}",
        window: { xmin: 0, xmax: 1, ymin: -0.05, ymax: 1.05 },
        initial: 0.01,
        excluded: [],
      },
    },
    {
      type: "text",
      content:
        "The curve rises steeply near 0 and flattens near 1. At prior $0.01$ the posterior is $0.167$; at prior $0.1$ it is $\\frac{0.099}{0.144} \\approx 0.69$; at prior $0.5$ it is $\\frac{0.495}{0.52} \\approx 0.95$. **The same test result means very different things depending on who took the test.** That is why doctors screen high-risk groups and why a positive screening test is followed by a confirmatory test, not a diagnosis.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "\"99% accurate\" does not mean \"99% chance you're sick\"",
      content:
        "The 99% is $P(+ \\mid D)$. The question is $P(D \\mid +)$. Ignoring the prior and reading one as the other is **base-rate neglect**. When the condition is rare, most positives are false positives no matter how sensitive the test is.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The prosecutor's fallacy",
      content:
        "In court the same error has a name. \"Only 1 in a million innocent people would match this DNA sample, so there is a 1 in a million chance the defendant is innocent.\" That swaps $P(\\text{match} \\mid \\text{innocent})$ for $P(\\text{innocent} \\mid \\text{match})$. In a city of 10 million, about 10 innocent people would match. If the culprit is known to be one of the city's 10 million and, before the DNA test, no one was more suspect than anyone else, then with the match as the only evidence the defendant is one of roughly 11 matching people, not a near-certain culprit. (That uniform prior is itself an assumption; other evidence would change it.) Real convictions have been overturned over this.",
    },
    {
      type: "text",
      content:
        "**Worked example: a rarer disease.** Prevalence 1 in 1,000; the test catches every sick person (sensitivity 100%) and has a 1% false-positive rate. Out of 100,000 people: 100 sick, all positive; 99,900 healthy, of whom 999 test positive.",
    },
    {
      type: "math",
      latex: "P(D \\mid +) = \\frac{100}{100 + 999} = \\frac{100}{1099} \\approx 9.1\\%",
    },
    {
      type: "text",
      content:
        "A \"perfect-sensitivity\" test and still only about a 1-in-11 chance. Improving sensitivity barely helps; the false positives come from the healthy majority, so **specificity is what matters for rare conditions**.",
    },
    {
      type: "text",
      content:
        "**Worked example: what does a negative mean?** Back to the original test (1%, 99%, 95%). From the table, 9,406 people test negative and only 1 of them is sick: $P(D \\mid -) = \\frac{1}{9406} \\approx 0.011\\%$. For a rare disease, a negative from a sensitive test is very reassuring. Positives and negatives are not symmetric.",
    },
    {
      type: "text",
      content:
        "**Worked example (application): a fraud alarm.** A bank's software flags suspicious card transactions. 0.2% of transactions are fraudulent. The alarm flags 95% of fraudulent transactions and 1% of legitimate ones. A transaction is flagged. How likely is it to be fraud?\n\n**Step 1: pick a round population.** Take 100,000 transactions. *Why this step:* with a base rate of 0.2%, you want a population big enough that every cell of the table is a whole number, so the reasoning becomes counting.\n\n**Step 2: split by the hidden cause.** $0.2\\%$ of 100,000 is 200 fraudulent; 99,800 are legitimate.\n\n**Step 3: apply the alarm to each group.** Fraud flagged: $0.95 \\times 200 = 190$. Legitimate flagged: $0.01 \\times 99{,}800 = 998$. *Why this step:* each rate only applies inside its own group; mixing them is exactly the inverse-confusion error.\n\n**Step 4: look only inside the flagged pile.**",
    },
    {
      type: "math",
      latex: "P(\\text{fraud} \\mid \\text{flag}) = \\frac{190}{190 + 998} = \\frac{190}{1188} = \\frac{95}{594} \\approx 16\\%",
    },
    {
      type: "text",
      content:
        "Five out of six alarms are false. This is why banks send you a \"was this you?\" text instead of blocking the card outright: the alarm is a screening test, and for rare events a screening test mostly finds innocent people. The fix, again, is specificity: cutting the false-alarm rate to 0.1% would drop the false flags to about 100 and lift the posterior to about 66%.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam-style, NCERT):** A laboratory blood test is 99% effective in detecting a certain disease when it is present. However, the test also gives a false positive for 0.5% of healthy people tested. If 0.1% of the population has the disease, find the probability that a person has the disease given a positive result.\n\n**Step 1: translate every sentence into a probability.** Let $E$ = \"has the disease\". $P(E) = 0.001$, $P(E') = 0.999$, $P(+ \\mid E) = 0.99$, $P(+ \\mid E') = 0.005$. *Why this step:* exam questions hide the likelihoods in words like \"effective\" and \"false positive\"; naming them first stops you from plugging the wrong one in.\n\n**Step 2: apply Bayes.**",
    },
    {
      type: "math",
      latex:
        "P(E \\mid +) = \\frac{0.001 \\times 0.99}{0.001 \\times 0.99 + 0.999 \\times 0.005} = \\frac{0.00099}{0.00099 + 0.004995} = \\frac{0.00099}{0.005985}",
    },
    {
      type: "text",
      content:
        "**Step 3: clear the decimals.** Multiply top and bottom by $10^6$: $\\frac{990}{5985}$. Both are divisible by 45, giving $\\frac{22}{133} \\approx 0.165$. *Why this step:* exam answers are expected as exact fractions, and scaling to whole numbers makes common factors visible.\n\n**Step 4: interpret.** A \"99% effective\" test, and a positive result still means only about a 1-in-6 chance of disease. The disease is so rare (1 in 1,000) that the 0.5% false-positive rate, applied to 999 healthy people, produces five times as many positives as the sick group does.",
    },
    {
      type: "quiz",
      id: "pr3-3-q1",
      variant: "concept",
      question:
        "A disease affects 1% of people. A test is 99% sensitive and 95% specific. You test positive. Roughly what is the probability you have the disease?",
      options: [
        {
          text: "About 17%",
          correct: true,
          feedback: "Out of 10,000: 99 true positives and 495 false positives. $\\frac{99}{594} = \\frac16$.",
        },
        { text: "About 99%", feedback: "That is the sensitivity, $P(+ \\mid D)$. You need $P(D \\mid +)$, which depends on how rare the disease is." },
        { text: "About 95%", feedback: "That is the specificity, a statement about healthy people. It doesn't answer the question either." },
        { text: "About 1%", feedback: "That was the prior. The positive result does raise it, by a factor of about 17." },
      ],
      hint: "Imagine 10,000 people and count the positives in each group.",
    },
    {
      type: "quiz",
      id: "pr3-3-q2",
      variant: "practice",
      question:
        "A condition has prevalence 1 in 1,000. A test has sensitivity 100% and a false-positive rate of 1%. Given a positive result, the probability of having the condition is closest to:",
      options: [
        { text: "$9\\%$", correct: true, feedback: "$\\frac{100}{100 + 999} \\approx 0.091$ out of 100,000 people." },
        { text: "$99\\%$", feedback: "That is $1 -$ the false-positive rate, which ignores the base rate entirely." },
        { text: "$50\\%$", feedback: "There are about ten false positives for every true one, not one." },
        { text: "$0.1\\%$", feedback: "That's the prior. A positive result raises it a lot." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-3-q3",
      variant: "concept",
      question:
        "A DNA profile matches 1 in a million people. A suspect from a city of 10 million matches, and there is no other evidence. The prosecutor says the chance of innocence is 1 in a million. Which is the best response?",
      options: [
        {
          text: "If the culprit is one of the city's 10 million and no one was more suspect than anyone else before the test, about 10 innocent people would also match, so on this evidence alone the suspect is roughly 1 of 11 matches.",
          correct: true,
          feedback: "The 1-in-a-million is $P(\\text{match} \\mid \\text{innocent})$. The court needs $P(\\text{innocent} \\mid \\text{match})$, which depends on how many people could have matched.",
        },
        { text: "The prosecutor is right: 1 in a million is the probability of innocence.", feedback: "That is the prosecutor's fallacy: reading $P(E \\mid I)$ as $P(I \\mid E)$." },
        { text: "The probability of innocence is exactly 50%, match or no match.", feedback: "The match is strong evidence; it just isn't as strong as the prosecutor claims." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-3-q4",
      variant: "practice",
      question:
        "Starting from 1% prevalence, 99% sensitivity and 95% specificity ($P(D \\mid +) = \\frac16$), which single change raises $P(D \\mid +)$ the most?",
      options: [
        {
          text: "Raising specificity to 99.9%",
          correct: true,
          feedback: "False positives fall from 495 to 9.9 per 10,000, so $P(D \\mid +) = \\frac{99}{108.9} \\approx 91\\%$.",
        },
        {
          text: "Raising sensitivity to 100%",
          feedback: "True positives go from 99 to 100, so $\\frac{100}{595} \\approx 16.8\\%$: almost no change. The false positives are the problem.",
        },
        { text: "Testing 100,000 people instead of 10,000", feedback: "Scaling the population scales every cell of the table; the ratio is unchanged." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-3-q5",
      variant: "practice",
      question:
        "With the original test (1%, 99%, 95%), what is the probability that someone who tests **negative** is actually sick?",
      options: [
        { text: "$\\dfrac{1}{9406}$", correct: true, feedback: "1 sick person among 9,406 negatives, about 0.011%." },
        { text: "$0.01$", feedback: "That is $P(- \\mid D)$, the miss rate, the conditional the wrong way round." },
        { text: "$0.05$", feedback: "That is the false-positive rate, about healthy people testing positive." },
        { text: "$\\dfrac{1}{100}$", feedback: "That's the prior. A negative from a sensitive test lowers it sharply." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-3-q6",
      variant: "practice",
      question:
        "A condition affects 2% of people. A test has sensitivity 95% and a false-positive rate of 5%. A person tests positive. What is the probability they have the condition?",
      options: [
        {
          text: "$\\dfrac{19}{68} \\approx 28\\%$",
          correct: true,
          feedback: "Out of 10,000: 200 have it and 190 test positive; 9,800 don't and 490 test positive. $\\frac{190}{190 + 490} = \\frac{190}{680} = \\frac{19}{68}$.",
        },
        { text: "$95\\%$", feedback: "That is the sensitivity $P(+ \\mid \\text{condition})$: base-rate neglect." },
        { text: "$\\dfrac{19}{49}$", feedback: "That is $\\frac{190}{490}$, true positives over false positives (the odds). The probability divides by *all* positives, $190 + 490$." },
        { text: "$2\\%$", feedback: "That is the prior. A positive result raises it." },
      ],
      hint: "Imagine 10,000 people. Count true positives and false positives separately.",
    },
    {
      type: "quiz",
      id: "pr3-3-q7",
      variant: "practice",
      question:
        "In a town, 5% of men and 0.25% of women have grey hair. There are equal numbers of men and women. A grey-haired person is chosen at random. What is the probability this person is a man?",
      options: [
        {
          text: "$\\dfrac{20}{21}$",
          correct: true,
          feedback: "Equal priors cancel: $\\frac{0.05}{0.05 + 0.0025} = \\frac{0.05}{0.0525} = \\frac{20}{21}$.",
        },
        { text: "$\\dfrac{1}{2}$", feedback: "That is the prior. Grey hair is 20 times more common among men here, so it shifts belief a lot." },
        { text: "$0.05$", feedback: "That is $P(\\text{grey} \\mid \\text{man})$, the reverse conditional." },
        { text: "$\\dfrac{1}{21}$", feedback: "That is the probability the person is a woman." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "bayes-many-causes",
  title: "3.4 · Bayes with Many Causes",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Exam problems dress Bayes up in many costumes: liars and truth-tellers, bags of coloured balls, insurance companies, students guessing on multiple-choice tests. Underneath, every one of them is the same table:\n\n**causes → priors → likelihood of what was observed → joints → divide by the total.**\n\nThe skill is spotting the partition and the observation. This lesson drills that with six classic setups, including one where the \"cause\" is a hidden earlier draw and one where it is the unknown contents of a bag.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The five-column recipe",
      content:
        "1. List the hypotheses $E_1, \\ldots, E_n$ (they must be a partition).\n2. Write each prior $P(E_i)$.\n3. Write each likelihood $P(A \\mid E_i)$ of **exactly** what was observed.\n4. Multiply to get the joints; add them to get $P(A)$.\n5. Posterior = joint ÷ total. Check the posteriors add to 1.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: the truth-teller.** Asha speaks the truth 3 times out of 4. A die is thrown, and Asha reports that it shows a six. What is the probability it really is a six?\n\n**Hypotheses:** $E_1$ = \"it is a six\", $E_2$ = \"it is not a six\". **Priors:** $\\frac16$, $\\frac56$.\n\n**Observation:** Asha *reports* six (call this event $R$; it plays the role of $A$ in the recipe). If it is a six, Asha reports six by telling the truth: $\\frac34$. If it isn't, Asha reports six by lying: $\\frac14$ (the standard textbook convention is that the lie is \"six\").",
    },
    {
      type: "table",
      headers: ["Hypothesis", "Prior", "$P(\\text{reports six} \\mid E_i)$", "Joint", "Posterior"],
      rows: [
        ["Six", "$\\frac16$", "$\\frac34$", "$\\frac{3}{24}$", "$\\frac{3}{8}$"],
        ["Not six", "$\\frac56$", "$\\frac14$", "$\\frac{5}{24}$", "$\\frac{5}{8}$"],
        ["**Total**", "1", "", "$\\frac{8}{24}$", "1"],
      ],
    },
    {
      type: "math",
      latex: "P(\\text{six} \\mid \\text{reports six}) = \\frac{\\frac{3}{24}}{\\frac{3}{24} + \\frac{5}{24}} = \\frac{3}{8}",
    },
    {
      type: "text",
      content:
        "Even from a mostly honest witness, the report of a rare event leaves it less likely than not. It is the base-rate trap in disguise: sixes are rare, and a quarter of the frequent non-sixes produce the same report.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The likelihood depends on how the liar lies",
      content:
        "The $\\frac14$ above assumes a lie is always \"six\". If instead a liar names one of the five wrong faces at random, then $P(\\text{reports six} \\mid \\text{not six}) = \\frac14 \\cdot \\frac15 = \\frac{1}{20}$, and\n$P(\\text{six} \\mid \\text{reports six}) = \\dfrac{\\frac16 \\cdot \\frac34}{\\frac16\\cdot\\frac34 + \\frac56 \\cdot \\frac{1}{20}} = \\dfrac{\\frac{3}{24}}{\\frac{3}{24} + \\frac{1}{24}} = \\dfrac34$.\nBayes is only as good as the likelihoods you feed it. Always ask: *how exactly would this observation arise under each hypothesis?* In exams, follow the convention the question states or implies.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: three bags.** Bag I has 1 white, 2 black, 3 red balls. Bag II has 2 white, 1 black, 1 red. Bag III has 4 white, 5 black, 3 red. A bag is chosen at random and two balls are drawn from it (without replacement). They are one white and one red. What is the probability they came from bag I?\n\n**Likelihoods** (count white-red pairs over all pairs):\n- Bag I: $\\dfrac{1 \\times 3}{\\binom{6}{2}} = \\dfrac{3}{15} = \\dfrac15$\n- Bag II: $\\dfrac{2 \\times 1}{\\binom{4}{2}} = \\dfrac{2}{6} = \\dfrac13$\n- Bag III: $\\dfrac{4 \\times 3}{\\binom{12}{2}} = \\dfrac{12}{66} = \\dfrac{2}{11}$\n\nThe priors are all $\\frac13$, so they cancel and the posterior is each likelihood over their sum. Over a common denominator of 165:",
    },
    {
      type: "table",
      headers: ["Bag", "Prior", "Likelihood", "Likelihood (over 165)", "Posterior"],
      rows: [
        ["I", "$\\frac13$", "$\\frac15$", "$\\frac{33}{165}$", "$\\frac{33}{118}$"],
        ["II", "$\\frac13$", "$\\frac13$", "$\\frac{55}{165}$", "$\\frac{55}{118}$"],
        ["III", "$\\frac13$", "$\\frac{2}{11}$", "$\\frac{30}{165}$", "$\\frac{30}{118} = \\frac{15}{59}$"],
        ["**Total**", "1", "", "sum of likelihoods: $\\frac{118}{165}$", "1"],
      ],
    },
    {
      type: "math",
      latex: "P(\\text{I} \\mid \\text{white and red}) = \\frac{33}{33 + 55 + 30} = \\frac{33}{118}",
    },
    {
      type: "text",
      content:
        "The $\\frac{118}{165}$ in the table is a sum of likelihoods, not a probability. For the record, $P(\\text{white and red}) = \\frac13\\cdot\\frac{118}{165} = \\frac{118}{495}$; the common $\\frac13$ cancels in every posterior.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Equal priors cancel",
      content:
        "When the hypotheses start equally likely, the posterior is simply $\\dfrac{P(A \\mid E_i)}{\\sum_j P(A \\mid E_j)}$. Common factors in every joint always cancel, so clear them before you do any arithmetic.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: insurance.** An insurer covers 2,000 scooter riders, 4,000 car drivers and 6,000 truck drivers. The probabilities of an accident in a year are $0.01$, $0.03$ and $0.15$. One insured person has an accident. What is the probability they are a scooter rider?\n\nHere the priors come as counts, and natural frequencies are easiest: expected accidents are $2000 \\times 0.01 = 20$, $4000 \\times 0.03 = 120$, $6000 \\times 0.15 = 900$.",
    },
    {
      type: "table",
      headers: ["Class", "Insured", "$P(\\text{accident} \\mid \\text{class})$", "Expected accidents", "Posterior"],
      rows: [
        ["Scooter", "2,000", "0.01", "20", "$\\frac{20}{1040} = \\frac{1}{52}$"],
        ["Car", "4,000", "0.03", "120", "$\\frac{120}{1040} = \\frac{3}{26}$"],
        ["Truck", "6,000", "0.15", "900", "$\\frac{900}{1040} = \\frac{45}{52}$"],
        ["**Total**", "12,000", "", "1,040", "1"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 4: knows or guesses?** In a multiple-choice test with 4 options per question, a student knows the answer with probability $\\frac34$ and otherwise guesses at random. Given that the student answered correctly, what is the probability they knew it?\n\n**Hypotheses:** knew ($\\frac34$), guessed ($\\frac14$). **Likelihood of a correct answer:** 1 if they knew, $\\frac14$ if they guessed.",
    },
    {
      type: "math",
      latex:
        "P(\\text{knew} \\mid \\text{correct}) = \\frac{\\frac34 \\cdot 1}{\\frac34 \\cdot 1 + \\frac14 \\cdot \\frac14} = \\frac{\\frac{12}{16}}{\\frac{13}{16}} = \\frac{12}{13}",
    },
    {
      type: "text",
      content:
        "The tree for this one is worth seeing: the \"correct\" leaves are one from each branch, and the Bayes panel divides each by their sum.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        root: {
          label: "start",
          children: [
            {
              label: "Knows",
              prob: 0.75,
              children: [{ label: "Right", prob: 1 }],
            },
            {
              label: "Guesses",
              prob: 0.25,
              children: [
                { label: "Right", prob: 0.25 },
                { label: "Wrong", prob: 0.75 },
              ],
            },
          ],
        },
        format: "fraction",
        editable: [{ path: "0", label: "P(\\text{knows})", min: 0.05, max: 0.95, step: 0.05 }],
        bayes: { observedLeaves: { matchLastStage: "Right" }, observedLabel: "answers correctly", population: 1600 },
        caption:
          "Slide P(knows) down. When students rarely know the answer, a correct answer is weaker evidence that they knew it.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 5: a transferred ball.** Bag I has 3 red and 4 black balls; bag II has 4 red and 5 black. One ball is drawn from bag I, *without looking*, and put into bag II. Then a ball is drawn from bag II, and it is red. What is the probability that the transferred ball was red?\n\n**Spot the partition.** Nobody chose a bag here. The hidden cause is the colour of the transferred ball: $E_1$ = \"transferred red\", $E_2$ = \"transferred black\". **Priors** come from bag I: $\\frac37$ and $\\frac47$.\n\n**Likelihoods** come from the *new* bag II, which now has 10 balls:\n- If a red was moved, bag II has 5 red of 10: $P(\\text{red} \\mid E_1) = \\frac{5}{10}$.\n- If a black was moved, bag II has 4 red of 10: $P(\\text{red} \\mid E_2) = \\frac{4}{10}$.",
    },
    {
      type: "table",
      headers: ["Transferred", "Prior", "$P(\\text{red from II} \\mid E_i)$", "Joint", "Posterior"],
      rows: [
        ["Red", "$\\frac37$", "$\\frac{5}{10}$", "$\\frac{15}{70}$", "$\\frac{15}{31}$"],
        ["Black", "$\\frac47$", "$\\frac{4}{10}$", "$\\frac{16}{70}$", "$\\frac{16}{31}$"],
        ["**Total**", "1", "", "$\\frac{31}{70}$", "1"],
      ],
    },
    {
      type: "math",
      latex:
        "P(\\text{transferred red} \\mid \\text{red}) = \\frac{\\frac{15}{70}}{\\frac{15}{70} + \\frac{16}{70}} = \\frac{15}{31}",
    },
    {
      type: "text",
      content:
        "The forward question, \"what is the probability the ball drawn from bag II is red?\", is the law of total probability with the same partition: $P(\\text{red}) = \\frac{15}{70} + \\frac{16}{70} = \\frac{31}{70}$. The red draw nudged the transferred-red probability from $\\frac37 \\approx 0.43$ up to $\\frac{15}{31} \\approx 0.48$: a red transfer makes a red draw a little more likely, so the evidence leans that way.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "When the cause is a hidden earlier draw",
      content:
        "Transfer problems, \"a card is lost from the pack\" problems and similar ones all hide the partition in an unseen first step. Ask: *what earlier event, which I didn't see, changes the odds of what I did see?* Its possible outcomes are your $E_i$, its probabilities are the priors, and the likelihoods are computed from the situation **after** that step.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (exam-style, JEE): what is in the bag?** A bag contains 4 balls, each either white or not. Two balls are drawn at random (without replacement) and both are white. Assuming all possible numbers of white balls are equally likely *among those consistent with the draw*, find the probability that all four balls are white.\n\n**Step 1: list the hypotheses.** Two white balls came out, so the bag has at least 2 white. $E_2, E_3, E_4$ = \"the bag has 2, 3, 4 white balls\", each with prior $\\frac13$. *Why this step:* the hidden cause here is not a choice of bag but the bag's unknown **composition**. Hypotheses with fewer than 2 white balls have likelihood 0, and the question tells you to leave them out.\n\n**Step 2: likelihood of \"two white\" under each.** There are $\\binom42 = 6$ equally likely pairs.\n- $E_2$: only $\\binom22 = 1$ white pair, so $\\frac16$.\n- $E_3$: $\\binom32 = 3$ white pairs, so $\\frac36$.\n- $E_4$: every pair is white, so $\\frac66 = 1$.\n*Why this step:* the observation is a specific event (both drawn balls white), and counting pairs gives its probability exactly.\n\n**Step 3: equal priors cancel.** The posterior is each likelihood over their sum, $\\frac16 + \\frac36 + \\frac66 = \\frac{10}{6}$.",
    },
    {
      type: "table",
      headers: ["Hypothesis", "Prior", "Likelihood", "Likelihood $\\times 6$", "Posterior"],
      rows: [
        ["2 white", "$\\frac13$", "$\\frac16$", "1", "$\\frac{1}{10}$"],
        ["3 white", "$\\frac13$", "$\\frac36$", "3", "$\\frac{3}{10}$"],
        ["4 white", "$\\frac13$", "1", "6", "$\\frac{6}{10} = \\frac35$"],
        ["**Total**", "1", "", "10", "1"],
      ],
    },
    {
      type: "math",
      latex: "P(E_4 \\mid \\text{two white}) = \\frac{1}{\\frac16 + \\frac12 + 1} = \\frac{6}{10} = \\frac{3}{5}",
    },
    {
      type: "text",
      content:
        "The all-white bag was one of three equal possibilities, and it explains the draw perfectly, so it ends up with more than half the belief. Watch the stated assumption: if the question had said \"all numbers 0 to 4 are equally likely\" (priors $\\frac15$ each), the impossible hypotheses $E_0$ and $E_1$ would get posterior 0 anyway, and since the remaining priors are still equal, the answer would *also* be $\\frac35$. Equal priors cancel, whatever their common value.",
    },
    {
      type: "quiz",
      id: "pr3-4-q1",
      variant: "practice",
      question:
        "Ravi speaks the truth 4 times out of 5. A die is thrown and Ravi reports a six (a lie is always \"six\"). What is the probability it actually is a six?",
      options: [
        {
          text: "$\\dfrac{4}{9}$",
          correct: true,
          feedback: "Joints: $\\frac16\\cdot\\frac45 = \\frac{4}{30}$ and $\\frac56\\cdot\\frac15 = \\frac{5}{30}$. Posterior $\\frac{4}{4+5} = \\frac49$.",
        },
        { text: "$\\dfrac{4}{5}$", feedback: "That is Ravi's truthfulness, $P(\\text{reports six} \\mid \\text{six})$. The rarity of sixes pulls the posterior down." },
        { text: "$\\dfrac{2}{15}$", feedback: "That is the joint $\\frac{4}{30}$. Divide it by the total $\\frac{9}{30}$." },
        { text: "$\\dfrac{1}{6}$", feedback: "That's the prior; the report is evidence and should raise it." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-4-q2",
      variant: "practice",
      question:
        "Each MCQ has 5 options. A student knows an answer with probability $0.6$ and otherwise guesses at random. Given a correct answer, what is the probability the student knew it?",
      options: [
        {
          text: "$\\dfrac{15}{17}$",
          correct: true,
          feedback: "$\\frac{0.6 \\times 1}{0.6 + 0.4 \\times 0.2} = \\frac{0.6}{0.68} = \\frac{15}{17} \\approx 0.88$.",
        },
        { text: "$0.6$", feedback: "That's the prior. A correct answer is evidence of knowing, so it should go up." },
        { text: "$\\dfrac{3}{4}$", feedback: "With 5 options a guess is right with probability $\\frac15$. Put that into the denominator: $0.6 + 0.4 \\times 0.2 = 0.68$." },
        { text: "$0.68$", feedback: "That is $P(\\text{correct})$, the denominator." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-4-q3",
      variant: "practice",
      question: "In the insurance example (20, 120 and 900 expected accidents), what is the probability that the person who had an accident is a truck driver?",
      options: [
        { text: "$\\dfrac{45}{52}$", correct: true, feedback: "$\\frac{900}{1040} = \\frac{45}{52} \\approx 0.87$." },
        { text: "$\\dfrac{1}{2}$", feedback: "That is the prior share of truck drivers, $\\frac{6000}{12000}$. The accident raises it." },
        { text: "$0.15$", feedback: "That is $P(\\text{accident} \\mid \\text{truck})$, the reverse conditional." },
        { text: "$\\dfrac{900}{12000}$", feedback: "That is the joint $P(\\text{truck and accident})$; divide by $P(\\text{accident}) = \\frac{1040}{12000}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-4-q4",
      variant: "practice",
      question:
        "Three coins: one two-headed, one fair, one biased to show heads 75% of the time. One coin is chosen at random and tossed; it shows heads. What is the probability it is the two-headed coin?",
      options: [
        {
          text: "$\\dfrac{4}{9}$",
          correct: true,
          feedback: "Equal priors cancel: $\\frac{1}{1 + 0.5 + 0.75} = \\frac{1}{2.25} = \\frac49$.",
        },
        { text: "$\\dfrac{1}{3}$", feedback: "That is the prior. Heads is more likely from the two-headed coin, so its probability rises." },
        { text: "$1$", feedback: "Heads doesn't prove it: the other two coins can also show heads." },
        { text: "$\\dfrac{3}{4}$", feedback: "That is $P(\\text{heads})$ averaged over the coins: $\\frac{1 + 0.5 + 0.75}{3} = 0.75$. It's the denominator, not the answer." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-4-q5",
      variant: "concept",
      question:
        "A student computes posteriors for three bags as $0.3$, $0.5$ and $0.3$. What can you conclude?",
      options: [
        {
          text: "There is an arithmetic error: posteriors over a partition must add to 1.",
          correct: true,
          feedback: "They add to 1.1. Given $A$, exactly one hypothesis is true, so the posteriors form a probability distribution.",
        },
        { text: "Nothing: posteriors can add to more than 1 because the evidence adds information.", feedback: "Evidence reshuffles belief among the hypotheses; it never creates extra probability." },
        { text: "Bag II is certainly the source.", feedback: "Even if the numbers were right, 0.5 is far from certain." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-4-q6",
      variant: "concept",
      question:
        "In the truth-teller problem, why does the answer change from $\\frac38$ to $\\frac34$ when a liar names a random wrong face instead of always saying \"six\"?",
      options: [
        {
          text: "The likelihood $P(\\text{reports six} \\mid \\text{not six})$ drops from $\\frac14$ to $\\frac{1}{20}$, so fewer false reports compete with the true ones.",
          correct: true,
          feedback: "Same prior, different likelihood, different posterior. Modelling how the evidence arises is part of the problem.",
        },
        { text: "The prior probability of a six changes.", feedback: "The die is the same fair die: the prior is $\\frac16$ in both versions." },
        { text: "Asha tells the truth more often in the second version.", feedback: "Asha still tells the truth $\\frac34$ of the time; only the content of the lies changed." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-4-q7",
      variant: "practice",
      question:
        "Bag I has 4 white and 2 black balls; bag II has 3 white and 5 black. One ball is moved, unseen, from bag I to bag II, and then a ball drawn from bag II is white. What is the probability that the transferred ball was white?",
      options: [
        {
          text: "$\\dfrac{8}{11}$",
          correct: true,
          feedback: "Priors $\\frac46 = \\frac23$ and $\\frac13$. Bag II then has 9 balls: likelihoods $\\frac49$ (white moved) and $\\frac39$ (black moved). Joints $\\frac{8}{27}$ and $\\frac{3}{27}$, so the posterior is $\\frac{8}{8+3} = \\frac{8}{11}$.",
        },
        { text: "$\\dfrac{2}{3}$", feedback: "That is the prior, $P(\\text{white moved}) = \\frac46$, before the draw from bag II was seen." },
        { text: "$\\dfrac{4}{9}$", feedback: "That is the likelihood $P(\\text{white from II} \\mid \\text{white moved})$: bag II then holds 4 white of 9." },
        { text: "$\\dfrac{8}{27}$", feedback: "That is the joint $\\frac23 \\cdot \\frac49$. Divide it by $P(\\text{white}) = \\frac{8}{27} + \\frac{3}{27} = \\frac{11}{27}$." },
      ],
      hint: "The partition is the colour of the moved ball. Compute the likelihoods from bag II after the move, when it holds 9 balls.",
    },
    {
      type: "quiz",
      id: "pr3-4-q8",
      variant: "practice",
      question:
        "In worked example 6 (a bag of 4 balls, two drawn and both white, 2, 3 or 4 white balls equally likely), what is the probability the bag has **exactly 3** white balls?",
      options: [
        { text: "$\\dfrac{3}{10}$", correct: true, feedback: "$\\frac{3/6}{10/6} = \\frac{3}{10}$." },
        { text: "$\\dfrac{1}{3}$", feedback: "That is the prior. The draw shifts belief toward the whiter bags." },
        { text: "$\\dfrac{1}{2}$", feedback: "That is the likelihood $P(\\text{two white} \\mid 3 \\text{ white}) = \\frac36$." },
        { text: "$\\dfrac{3}{5}$", feedback: "That is the posterior for 4 white balls." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-4-q9",
      variant: "practice",
      question:
        "A card from a well-shuffled pack of 52 is lost. One card is then drawn from the remaining 51 and it is a heart. What is the probability the lost card was a heart?",
      options: [
        {
          text: "$\\dfrac{4}{17}$",
          correct: true,
          feedback: "Priors $\\frac14$, $\\frac34$. Likelihoods $\\frac{12}{51}$ (a heart was lost) and $\\frac{13}{51}$ (it wasn't). Posterior $\\frac{\\frac14 \\cdot 12}{\\frac14 \\cdot 12 + \\frac34 \\cdot 13} = \\frac{12}{12 + 39} = \\frac{12}{51} = \\frac{4}{17}$.",
        },
        { text: "$\\dfrac{1}{4}$", feedback: "That is the prior. Drawing a heart is slight evidence that hearts were *not* depleted, so the posterior dips a little." },
        { text: "$\\dfrac{13}{51}$", feedback: "That is the likelihood $P(\\text{heart drawn} \\mid \\text{lost card not a heart})$." },
        { text: "$\\dfrac{13}{17}$", feedback: "That is the probability the lost card was **not** a heart." },
      ],
      hint: "The lost card is the hidden earlier draw. Compute each likelihood from the 51 cards left.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "monty-hall",
  title: "3.5 · The Monty Hall Problem",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A game show has three doors. Behind one is a car; behind the other two, goats. You pick a door, say door 1. The host, **who knows where the car is**, opens one of the other doors to reveal a goat, say door 3. He then offers you the chance to switch to door 2.\n\nShould you switch? Decide before you scroll. Then play.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "monty-hall",
        montyDoors: 3,
        batchSizes: [1, 10, 100, 1000],
        seed: 7,
        caption:
          "Play a few games by hand, sometimes sticking and sometimes switching. Then run 1,000 automatic games and compare the stick and switch win rates.",
      },
    },
    {
      type: "text",
      content:
        "The simulation settles near **stick ≈ 1/3, switch ≈ 2/3**. Switching doubles your chance of winning. If that feels wrong, you are in good company: when this was published in a magazine column in 1990, thousands of readers, including mathematicians, wrote in to say it was wrong. The simulator does not care.",
    },
    {
      type: "text",
      content:
        "**The one-line argument.** Sticking wins exactly when your first pick was the car, which happens with probability $\\frac13$. The host's action cannot change what is behind your door. Switching wins in every other case, because the host has removed the only other goat from the doors you didn't pick. So switching wins with probability $\\frac23$.",
    },
    {
      type: "text",
      content:
        "**The Bayes derivation.** You picked door 1; the host opened door 3. Hypotheses: $C_1, C_2, C_3$ = \"car behind door 1, 2, 3\", each with prior $\\frac13$. The host's rule: never open your door, never reveal the car, and if he has a choice, choose at random. So the likelihoods of \"host opens door 3\" ($H_3$) are:\n- $P(H_3 \\mid C_1) = \\frac12$ (doors 2 and 3 both hide goats; he picks one at random)\n- $P(H_3 \\mid C_2) = 1$ (he must avoid door 2 and your door 1)\n- $P(H_3 \\mid C_3) = 0$ (he never reveals the car)",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        root: {
          label: "start",
          children: [
            {
              label: "Car 1",
              children: [
                { label: "Opens 2", prob: 0.5 },
                { label: "Opens 3", prob: 0.5 },
              ],
            },
            { label: "Car 2", children: [{ label: "Opens 3", prob: 1 }] },
            { label: "Car 3", children: [{ label: "Opens 2", prob: 1 }] },
          ],
        },
        format: "fraction",
        bayes: { observedLeaves: { matchLastStage: "Opens 3" }, observedLabel: "host opens door 3", population: 600 },
        caption:
          "You picked door 1. Observing \"opens 3\" keeps two leaves: 1/6 (car behind 1) and 1/3 (car behind 2). The posterior for door 2 is twice that for door 1.",
      },
    },
    {
      type: "math",
      latex:
        "P(C_2 \\mid H_3) = \\frac{\\frac13 \\cdot 1}{\\frac13 \\cdot \\frac12 + \\frac13 \\cdot 1 + \\frac13 \\cdot 0} = \\frac{\\frac13}{\\frac12} = \\frac23, \\qquad P(C_1 \\mid H_3) = \\frac{\\frac16}{\\frac12} = \\frac13",
    },
    {
      type: "text",
      content:
        "Look at where the asymmetry comes from. If the car were behind door 2, the host was **forced** to open door 3. If it were behind door 1, he opened door 3 only half the time. Door 3 opening is twice as likely under $C_2$ as under $C_1$, so it doubles the odds in favour of door 2.",
    },
    {
      type: "text",
      content:
        "**The 100-door version.** Suppose there are 100 doors. You pick one. The host, who knows where the car is, opens 98 of the others, all goats, and leaves one door closed. Would you stick with your original 1-in-100 guess, or switch to the one door he carefully avoided?\n\nYour door is still the car with probability $\\frac{1}{100}$. The other closed door carries all of the remaining $\\frac{99}{100}$. Try it: the simulator has a 100-door mode.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "monty-hall",
        montyDoors: 100,
        batchSizes: [1, 10, 100, 1000],
        seed: 11,
        caption: "With 100 doors, switching wins about 99% of the time. The same logic as 3 doors, just harder to argue with.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "\"Two doors left, so it's 50-50\"",
      content:
        "Two options do not mean equal probabilities. \"Equally likely\" is a claim that has to be justified, and here it is false: the two remaining doors got there in different ways. Your door survived because you chose it; the other door survived because the host, knowing where the car is, chose not to open it. That knowledge is what makes the other door special.",
    },
    {
      type: "text",
      content:
        "**The host's rule is what does the work.** Change the rule and the answer changes. Suppose the host *doesn't know* where the car is and opens one of the other two doors at random, and it happens to show a goat. Now:\n- $P(\\text{opens 3, goat} \\mid C_1) = \\frac12$\n- $P(\\text{opens 3, goat} \\mid C_2) = \\frac12$\n- $P(\\text{opens 3, goat} \\mid C_3) = 0$ (he would have revealed the car)\n\nThe two surviving likelihoods are equal, so the posteriors for doors 1 and 2 are both $\\frac12$. With an ignorant host, switching and sticking really are 50-50. Same doors, same goat, different information, because the goat was revealed by luck rather than by knowledge.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The general lesson",
      content:
        "The same observed event can carry different evidence depending on the **process that produced it**. In Bayes' theorem the process lives in the likelihoods $P(\\text{observation} \\mid \\text{hypothesis})$. Whenever a puzzle feels paradoxical, write those likelihoods out explicitly.",
    },
    {
      type: "text",
      content:
        "**Worked example (routine): four doors.** Four doors, one car. You pick door 1. The host, who knows where the car is, opens one of the other three doors to show a goat, choosing at random when he has a choice. He opens door 4. Find the posterior for every door.\n\n**Step 1: priors.** $P(C_i) = \\frac14$ for $i = 1, 2, 3, 4$.\n\n**Step 2: likelihoods of \"opens 4\".** *Why this step:* this is where the host's rule enters; everything else is arithmetic.\n- $C_1$: doors 2, 3, 4 all hide goats; he picks one of three: $\\frac13$.\n- $C_2$: he can't open 1 (yours) or 2 (car), so he picks 3 or 4: $\\frac12$.\n- $C_3$: similarly $\\frac12$.\n- $C_4$: he never reveals the car: $0$.\n\n**Step 3: joints over a common denominator of 24.** $\\frac14 \\cdot \\frac13 = \\frac{2}{24}$, $\\frac14 \\cdot \\frac12 = \\frac{3}{24}$, $\\frac{3}{24}$, $0$. Total $\\frac{8}{24}$.",
    },
    {
      type: "math",
      latex:
        "P(C_1 \\mid H_4) = \\frac{2}{8} = \\frac14, \\qquad P(C_2 \\mid H_4) = P(C_3 \\mid H_4) = \\frac{3}{8}",
    },
    {
      type: "text",
      content:
        "**Step 4: read it.** Your door stays at $\\frac14$, just as in the 3-door game. The $\\frac14$ that door 4 lost is shared equally by doors 2 and 3, each rising from $\\frac14$ to $\\frac38$. Switching to either of them beats sticking: that is why, in quiz 4 below, switching to a random one of them wins with probability $\\frac38$.",
    },
    {
      type: "text",
      content:
        "**Worked example (word problem): the three prisoners.** Prisoners A, B and C are told one of them, chosen at random, will be pardoned. A asks the warden: \"Tell me the name of one of the *others* who will not be pardoned. If both will not, pick at random.\" The warden says \"B\". A reasons: \"Now it's between me and C, so my chance rose to $\\frac12$.\" Is A right?\n\n**Step 1: hypotheses.** $P_A, P_B, P_C$ = \"A, B, C is pardoned\", priors $\\frac13$ each.\n\n**Step 2: likelihoods of \"warden says B\".** *Why this step:* the warden's answer is evidence, and its strength depends on his rule, just like the host's.\n- $P_A$: B and C both not pardoned; he names B half the time: $\\frac12$.\n- $P_B$: he can't name the pardoned man: $0$.\n- $P_C$: B is the only one he can name: $1$.",
    },
    {
      type: "math",
      latex:
        "P(P_A \\mid \\text{says B}) = \\frac{\\frac13 \\cdot \\frac12}{\\frac13 \\cdot \\frac12 + 0 + \\frac13 \\cdot 1} = \\frac{\\frac16}{\\frac12} = \\frac13, \\qquad P(P_C \\mid \\text{says B}) = \\frac23",
    },
    {
      type: "text",
      content:
        "A is wrong: his chance is still $\\frac13$. The warden was always going to name someone other than A, so the answer tells A nothing about himself. It does tell him a lot about C. This is Monty Hall with a different costume: A is \"your door\", the warden is the host, and C is the door he carefully avoided.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam-style): Bertrand's box, card version.** In Lesson 2.6 you met Bertrand's box with gold and silver coins. Exam papers usually set it with cards, so here it is again, run through the Bayes recipe step by step. Three cards are in a bag: one red on both sides (RR), one white on both sides (WW), one red on one side and white on the other (RW). A card is drawn and placed on the table; the side facing up is red. What is the probability the other side is also red?\n\nThe tempting answer is $\\frac12$: \"it's RR or RW, one of two cards\". Bayes says otherwise.\n\n**Step 1: hypotheses and priors.** RR, WW, RW, each $\\frac13$.\n\n**Step 2: likelihood of \"red face up\".** RR: 1 (both faces red). WW: 0. RW: $\\frac12$ (either face could land up). *Why this step:* what you observe is a **face**, not a card. RR has two ways to show red, RW only one.\n\n**Step 3: equal priors cancel.**",
    },
    {
      type: "math",
      latex: "P(\\text{RR} \\mid \\text{red up}) = \\frac{1}{1 + 0 + \\frac12} = \\frac{2}{3}",
    },
    {
      type: "text",
      content:
        "**Step 4: count faces to confirm.** There are three red faces in the bag, all equally likely to be the one facing up. Two of them belong to RR, so $\\frac23$. The \"two cards left, so 50-50\" error is the same one as \"two doors left, so 50-50\": two possibilities are not automatically equally likely.",
    },
    {
      type: "quiz",
      id: "pr3-5-q1",
      variant: "concept",
      question:
        "In the standard game (the host knows, always opens a goat door, and always offers the switch), after one goat is revealed which statement is correct?",
      options: [
        {
          text: "Switching wins with probability $\\frac23$.",
          correct: true,
          feedback: "Your door keeps its $\\frac13$; the host's informed choice concentrates the remaining $\\frac23$ on the other closed door.",
        },
        { text: "It's 50-50: two doors, one car.", feedback: "Two outcomes don't have to be equally likely. The doors reached this point by different processes." },
        { text: "Sticking is better because the host is trying to trick you.", feedback: "Under the stated rule the host always opens a goat door and offers a switch, whatever you picked. Nothing he does depends on tricking you." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-5-q2",
      variant: "practice",
      question:
        "With 100 doors, you pick one and the host (who knows) opens 98 goat doors. What is the probability of winning if you switch?",
      options: [
        { text: "$\\dfrac{99}{100}$", correct: true, feedback: "You lose by switching only if your first pick was the car: $\\frac{1}{100}$." },
        { text: "$\\dfrac{1}{2}$", feedback: "Two doors remain, but they are not equally likely." },
        { text: "$\\dfrac{1}{99}$", feedback: "The 98 goats were removed deliberately, so the other door takes all the remaining probability." },
        { text: "$\\dfrac{1}{100}$", feedback: "That's the probability for your original door, i.e. of winning by sticking." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-5-q3",
      variant: "concept",
      question:
        "The host does **not** know where the car is. He opens one of the two other doors at random, and it happens to show a goat. What is your probability of winning if you switch?",
      options: [
        {
          text: "$\\dfrac{1}{2}$",
          correct: true,
          feedback: "Given the goat reveal, the likelihoods for your door and the other closed door are both $\\frac12$, so the posteriors are equal.",
        },
        { text: "$\\dfrac{2}{3}$", feedback: "That needs the host to know and deliberately avoid the car. A lucky goat carries less information." },
        { text: "$\\dfrac{1}{3}$", feedback: "That would make your door (2/3) better than the other one. But $P(\\text{opens 3, goat} \\mid C_1) = P(\\text{opens 3, goat} \\mid C_2) = \\frac12$, so the two closed doors end up equally likely." },
      ],
      hint: "Write $P(\\text{opens 3, shows goat} \\mid C_i)$ for $i = 1, 2, 3$.",
    },
    {
      type: "quiz",
      id: "pr3-5-q4",
      variant: "practice",
      question:
        "Four doors, one car. You pick a door; the host (who knows) opens one goat door among the other three. You then switch to one of the two remaining closed doors at random. What is your probability of winning?",
      options: [
        {
          text: "$\\dfrac{3}{8}$",
          correct: true,
          feedback: "You can only win by switching if your first pick was wrong ($\\frac34$). Then the car is behind one of the two doors you might switch to: $\\frac34 \\cdot \\frac12 = \\frac38$, which beats sticking ($\\frac14$).",
        },
        { text: "$\\dfrac{1}{4}$", feedback: "That's the probability of winning by sticking." },
        { text: "$\\dfrac{1}{3}$", feedback: "That treats the three remaining closed doors as equally likely, but your door is still at $\\frac14$." },
        { text: "$\\dfrac{3}{4}$", feedback: "That assumes you'd switch to the right door for sure. There are two doors to switch to." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-5-q5",
      variant: "concept",
      question: "In the Bayes derivation, why is $P(\\text{host opens 3} \\mid \\text{car behind 2}) = 1$?",
      options: [
        {
          text: "The host can't open your door (1) or the car's door (2), so door 3 is his only option.",
          correct: true,
          feedback: "A forced move is strong evidence. It's twice as likely as the $\\frac12$ under \"car behind 1\".",
        },
        { text: "Because door 3 always hides a goat.", feedback: "Door 3 hides the car one time in three; that's the $C_3$ case." },
        { text: "Because the host prefers higher-numbered doors.", feedback: "No preference is assumed; when he has a choice he picks at random." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-5-q6",
      variant: "practice",
      question:
        "In the four-door example (you pick door 1, the host who knows opens door 4 at random among his goat doors), what is the probability the car is behind door 2?",
      options: [
        { text: "$\\dfrac{3}{8}$", correct: true, feedback: "Joints over 24: $2, 3, 3, 0$. $P(C_2 \\mid H_4) = \\frac{3}{8}$." },
        { text: "$\\dfrac{1}{3}$", feedback: "That treats the three closed doors as equally likely. Your door is still at $\\frac14$." },
        { text: "$\\dfrac{1}{4}$", feedback: "That is the prior, and also your own door's posterior. Doors 2 and 3 gain from door 4 being opened." },
        { text: "$\\dfrac{1}{2}$", feedback: "That is the likelihood $P(H_4 \\mid C_2)$, not the posterior." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-5-q7",
      variant: "practice",
      question:
        "A bag holds four cards: two red on both sides (RR), one red/white (RW) and one white on both sides (WW). A card is drawn and shows a red face. What is the probability its other side is red?",
      options: [
        {
          text: "$\\dfrac{4}{5}$",
          correct: true,
          feedback: "Count red faces: $2 + 2 + 1 = 5$, all equally likely to be showing, and 4 of them belong to RR cards. By Bayes: $\\frac{\\frac24 \\cdot 1}{\\frac24 \\cdot 1 + \\frac14 \\cdot \\frac12} = \\frac{1/2}{5/8} = \\frac45$.",
        },
        { text: "$\\dfrac{2}{3}$", feedback: "That treats the three red-capable cards as equally likely. You observe a face, and RR cards have two red faces each." },
        { text: "$\\dfrac{1}{2}$", feedback: "That's the prior $P(\\text{RR})$. A red face favours cards with more red faces." },
        { text: "$\\dfrac{5}{8}$", feedback: "That is $P(\\text{red face up})$, the denominator." },
      ],
      hint: "The observation is a face, not a card. Count the red faces.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "updating-beliefs",
  title: "3.6 · Updating Beliefs",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 3.3 a positive test moved you from 1% to $\\frac16$. That's unsettling but not conclusive, so the doctor orders a second, independent test. It is also positive. Now what?\n\nThe key idea of this lesson: **after the first result, $\\frac16$ is simply your new prior.** Run Bayes again with it. Today's posterior is tomorrow's prior.",
    },
    {
      type: "math",
      latex:
        "P(D \\mid +,+) = \\frac{\\frac16 \\cdot 0.99}{\\frac16 \\cdot 0.99 + \\frac56 \\cdot 0.05} = \\frac{0.99}{0.99 + 0.25} = \\frac{0.99}{1.24} \\approx 0.798",
    },
    {
      type: "text",
      content:
        "About 80%. The first positive took you from 1% to 17%; the identical second positive took you from 17% to 80%. Same test, same accuracy, but a much bigger jump, because it started from a higher prior.\n\nCheck it with natural frequencies: of the 594 people who tested positive once (99 sick, 495 healthy), a retest flags $99 \\times 0.99 \\approx 98$ sick and $495 \\times 0.05 \\approx 25$ healthy. $\\frac{98}{123} \\approx 80\\%$.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        root: {
          label: "start",
          children: [
            {
              label: "Sick",
              prob: 0.01,
              children: [
                {
                  label: "+",
                  prob: 0.99,
                  children: [
                    { label: "+", prob: 0.99 },
                    { label: "−", prob: 0.01 },
                  ],
                },
                {
                  label: "−",
                  prob: 0.01,
                  children: [
                    { label: "+", prob: 0.99 },
                    { label: "−", prob: 0.01 },
                  ],
                },
              ],
            },
            {
              label: "Healthy",
              prob: 0.99,
              children: [
                {
                  label: "+",
                  prob: 0.05,
                  children: [
                    { label: "+", prob: 0.05 },
                    { label: "−", prob: 0.95 },
                  ],
                },
                {
                  label: "−",
                  prob: 0.95,
                  children: [
                    { label: "+", prob: 0.05 },
                    { label: "−", prob: 0.95 },
                  ],
                },
              ],
            },
          ],
        },
        editable: [{ path: "0", label: "P(D)", min: 0.001, max: 0.5, step: 0.001 }],
        bayes: { observedLeaves: ["0.0.0", "1.0.0"], observedLabel: "tests positive twice", population: 10000 },
        caption:
          "Two tests in a row. Observing \"+ then +\" keeps one leaf from each branch. The posterior matches the two-step update: about 0.80 at 1% prevalence. Move the prevalence and compare.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      title: "One step or two, same answer",
      content:
        "Updating on both results at once (the tree above) and updating one result at a time (posterior → prior → posterior) give exactly the same answer, and the order of the evidence doesn't matter. Either way you multiply the prior by both likelihoods and then normalise.",
    },
    {
      type: "text",
      content:
        "**The odds form makes chaining effortless.** Divide Bayes for $D$ by Bayes for $D'$; the denominator $P(+)$ cancels:",
    },
    {
      type: "math",
      latex:
        "\\underbrace{\\frac{P(D \\mid +)}{P(D' \\mid +)}}_{\\text{posterior odds}} = \\underbrace{\\frac{P(D)}{P(D')}}_{\\text{prior odds}} \\times \\underbrace{\\frac{P(+ \\mid D)}{P(+ \\mid D')}}_{\\text{likelihood ratio}}",
    },
    {
      type: "text",
      content:
        "For our test the likelihood ratio is $\\frac{0.99}{0.05} = 19.8$. Each positive multiplies the odds by 19.8:",
    },
    {
      type: "table",
      headers: ["After", "Odds $D : D'$", "Probability of $D$"],
      rows: [
        ["No tests (prior)", "$1 : 99$", "$1\\%$"],
        ["One positive", "$19.8 : 99 = 1 : 5$", "$\\frac16 \\approx 16.7\\%$"],
        ["Two positives", "$3.96 : 1$", "$\\approx 79.8\\%$"],
        ["Three positives", "$78.4 : 1$", "$\\approx 98.7\\%$"],
      ],
    },
    {
      type: "text",
      content:
        "In odds, the evidence acts by **multiplication**: each result scales the odds by the same factor. In probability, that same multiplication produces jumps of very different sizes: tiny near 0, huge in the middle, tiny again near 1.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Evidence doesn't move you by a fixed amount",
      content:
        "It is tempting to think a 99%-sensitive test \"moves you most of the way to certainty\" whatever your starting point. It doesn't. The same positive takes a 1% prior to 17%, a 17% prior to 80%, and a 50% prior to 95%. What the evidence fixes is the **likelihood ratio** (how much the odds are multiplied), not the size of the jump in probability. You must know the prior to know where you land.",
    },
    {
      type: "text",
      content:
        "**Worked example: a coin that might be two-headed.** A bag has 10 coins: 9 fair and 1 two-headed. You pull one out at random and toss it $n$ times. Every toss is heads. How sure should you be that it's the two-headed coin?\n\n**Prior:** $P(\\text{2H}) = \\frac{1}{10}$. **Likelihoods of $n$ heads:** 1 for the two-headed coin, $\\left(\\frac12\\right)^n$ for a fair one.",
    },
    {
      type: "math",
      latex:
        "P(\\text{2H} \\mid n \\text{ heads}) = \\frac{\\frac{1}{10}}{\\frac{1}{10} + \\frac{9}{10}\\left(\\frac12\\right)^{n}} = \\frac{1}{1 + 9/2^{n}}",
    },
    {
      type: "table",
      headers: ["Heads in a row $n$", "Posterior $P(\\text{2H})$"],
      rows: [
        ["0", "$\\frac{1}{10} = 0.10$"],
        ["1", "$\\frac{2}{11} \\approx 0.18$"],
        ["2", "$\\frac{4}{13} \\approx 0.31$"],
        ["3", "$\\frac{8}{17} \\approx 0.47$"],
        ["5", "$\\frac{32}{41} \\approx 0.78$"],
        ["10", "$\\frac{1024}{1033} \\approx 0.991$"],
      ],
    },
    {
      type: "text",
      content:
        "Each head doubles the odds in favour of the two-headed coin (the likelihood ratio is $\\frac{1}{1/2} = 2$). Plot the posterior against $n$ and watch the S-shape: slow start, fast middle, slow approach to certainty. A single tail would end the story instantly: its likelihood under the two-headed coin is 0. The curve below joins the dots; only whole-number $n$ correspond to real toss counts. Drag the point to $n = 3$, $5$ and $10$ and match the table.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "1/(1 + 9/2^x)",
        exprLatex: "\\frac{1}{1 + 9/2^{n}}",
        window: { xmin: 0, xmax: 12, ymin: -0.05, ymax: 1.05 },
        initial: 3,
        excluded: [],
      },
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        root: {
          label: "start",
          children: [
            {
              label: "2H",
              prob: 0.1,
              children: [{ label: "H", prob: 1, children: [{ label: "H", prob: 1, children: [{ label: "H", prob: 1 }] }] }],
            },
            {
              label: "Fair",
              prob: 0.9,
              children: [
                {
                  label: "H",
                  prob: 0.5,
                  children: [
                    { label: "H", prob: 0.5, children: [{ label: "H", prob: 0.5 }, { label: "T", prob: 0.5 }] },
                    { label: "T", prob: 0.5, children: [{ label: "H", prob: 0.5 }, { label: "T", prob: 0.5 }] },
                  ],
                },
                {
                  label: "T",
                  prob: 0.5,
                  children: [
                    { label: "H", prob: 0.5, children: [{ label: "H", prob: 0.5 }, { label: "T", prob: 0.5 }] },
                    { label: "T", prob: 0.5, children: [{ label: "H", prob: 0.5 }, { label: "T", prob: 0.5 }] },
                  ],
                },
              ],
            },
          ],
        },
        editable: [{ path: "0", label: "P(\\text{2H})", min: 0.01, max: 0.9, step: 0.01 }],
        bayes: { observedLeaves: ["0.0.0.0", "1.0.0.0"], observedLabel: "three heads in a row", population: 10000 },
        caption:
          "Three tosses, all heads. Only two leaves survive: 0.1 × 1 and 0.9 × 1/8. The posterior for the two-headed coin is 8/17 ≈ 0.47.",
      },
    },
    {
      type: "callout",
      variant: "info",
      title: "When chaining is legitimate",
      content:
        "Multiplying likelihoods assumes the pieces of evidence are **independent given each hypothesis** (conditionally independent). Two separate labs testing separate samples, or separate coin tosses, qualify. Re-running the same test on the same sample may not: if something about you fooled the test once (a cross-reacting antibody, say), it may fool it again, and the second positive adds much less than a factor of 19.8.",
    },
    {
      type: "text",
      content:
        "**Worked example (application): two weather forecasts.** In a city it rains on 30% of monsoon days. A forecasting service says \"rain\" on 80% of the days it actually rains and on 20% of the days it stays dry. Two services, working independently, both say \"rain\" tomorrow. What is the probability of rain?\n\n**Step 1: prior odds.** $P(\\text{rain}) : P(\\text{dry}) = 0.3 : 0.7 = 3 : 7$. *Why this step:* in odds form, each new piece of evidence is just one multiplication.\n\n**Step 2: likelihood ratio of one \"rain\" forecast.** $\\frac{0.8}{0.2} = 4$. *Why this step:* the ratio, not either rate on its own, measures how strongly a forecast favours rain over dry.\n\n**Step 3: multiply once per forecast.** The services are independent given the weather, so chaining is legitimate.",
    },
    {
      type: "table",
      headers: ["After", "Odds rain : dry", "$P(\\text{rain})$"],
      rows: [
        ["No forecasts", "$3 : 7$", "$\\frac{3}{10} = 0.30$"],
        ["One \"rain\"", "$12 : 7$", "$\\frac{12}{19} \\approx 0.63$"],
        ["Two \"rain\"", "$48 : 7$", "$\\frac{48}{55} \\approx 0.87$"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 4: convert back.** Odds $a : b$ mean probability $\\frac{a}{a+b}$, so $\\frac{48}{55}$. Check it the long way: $\\frac{0.3 \\times 0.8^2}{0.3 \\times 0.8^2 + 0.7 \\times 0.2^2} = \\frac{0.192}{0.192 + 0.028} = \\frac{0.192}{0.220} = \\frac{48}{55}$. Same answer, more arithmetic.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam-style, JEE): which coin, and what next?** A bag has two coins: a fair one and a biased one with $P(H) = \\frac34$. One is chosen at random and tossed three times, giving H, H, T. (a) Find the probability it is the biased coin. (b) Find the probability the next toss is a head.\n\n**(a) Step 1: likelihood ratios per toss.** Biased vs fair: a head gives $\\frac{3/4}{1/2} = \\frac32$; a tail gives $\\frac{1/4}{1/2} = \\frac12$. *Why this step:* the tosses are independent given the coin, so each toss multiplies the odds by its own ratio, and the tail counts as evidence *against* the biased coin.\n\n**Step 2: chain them.** Prior odds $1 : 1$.",
    },
    {
      type: "math",
      latex:
        "\\text{odds(biased : fair)} = 1 \\times \\frac32 \\times \\frac32 \\times \\frac12 = \\frac98 \\quad\\Longrightarrow\\quad P(\\text{biased} \\mid HHT) = \\frac{9}{9+8} = \\frac{9}{17}",
    },
    {
      type: "text",
      content:
        "**Check directly:** $P(HHT \\mid \\text{biased}) = \\left(\\frac34\\right)^2 \\cdot \\frac14 = \\frac{9}{64}$ and $P(HHT \\mid \\text{fair}) = \\frac18 = \\frac{8}{64}$. With equal priors, $\\frac{9}{9+8} = \\frac{9}{17}$.\n\n**(b) Step 3: today's posterior is the weight for tomorrow's forecast.** The next toss is a total-probability problem, with the partition {biased, fair} now weighted by the *posteriors*. *Why this step:* after seeing HHT, $\\frac{9}{17}$ and $\\frac{8}{17}$ are your current beliefs, so they are the right weights.",
    },
    {
      type: "math",
      latex:
        "P(H_4 \\mid HHT) = \\frac{9}{17}\\cdot\\frac34 + \\frac{8}{17}\\cdot\\frac12 = \\frac{27}{68} + \\frac{16}{68} = \\frac{43}{68} \\approx 0.63",
    },
    {
      type: "text",
      content:
        "Before any tosses, $P(H) = \\frac12\\cdot\\frac34 + \\frac12\\cdot\\frac12 = \\frac58 = 0.625$. The data nudged the prediction up only slightly, to $\\frac{43}{68} \\approx 0.632$, because two heads and one tail is weak evidence either way. This two-step pattern (Bayes to update the causes, then total probability to predict) is a favourite in JEE papers.",
    },
    {
      type: "quiz",
      id: "pr3-6-q1",
      variant: "concept",
      question:
        "The same positive test (99% sensitive, 95% specific) is given to a person from a population with 1% prevalence and to one from a population with 50% prevalence. Which is true?",
      options: [
        {
          text: "Their posteriors are very different (about 17% vs 95%), even though the test and the result are identical.",
          correct: true,
          feedback: "The test fixes the likelihood ratio (19.8), which multiplies the odds. Where you end up depends on where you started.",
        },
        { text: "Both end up at 99%, since that is the test's sensitivity.", feedback: "Sensitivity is $P(+ \\mid D)$, not a posterior. It doesn't tell you where anyone lands." },
        { text: "Both move up by the same amount, about 16 percentage points.", feedback: "Evidence multiplies odds; it doesn't add a fixed amount of probability." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-6-q2",
      variant: "practice",
      question:
        "A bag has 9 fair coins and 1 two-headed coin. You draw one at random and toss it twice: two heads. What is the probability it is the two-headed coin?",
      options: [
        { text: "$\\dfrac{4}{13}$", correct: true, feedback: "$\\frac{1}{1 + 9/4} = \\frac{4}{13} \\approx 0.31$." },
        { text: "$\\dfrac{2}{11}$", feedback: "That's after one head. The second head doubles the odds again, from $2:9$ to $4:9$." },
        { text: "$\\dfrac{1}{10}$", feedback: "That's the prior before any tosses." },
        { text: "$\\dfrac{1}{4}$", feedback: "That's $P(HH \\mid \\text{fair})$, a likelihood." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-6-q3",
      variant: "practice",
      question:
        "After one positive test your probability of disease is $\\frac16$. A second, independent test (99% sensitive, 95% specific) comes back **negative**. What is your new probability of disease?",
      options: [
        {
          text: "About $0.2\\%$",
          correct: true,
          feedback: "$\\frac{\\frac16 \\cdot 0.01}{\\frac16 \\cdot 0.01 + \\frac56 \\cdot 0.95} = \\frac{0.01}{0.01 + 4.75} = \\frac{0.01}{4.76} \\approx 0.0021$.",
        },
        { text: "Back to exactly $1\\%$", feedback: "A positive and a negative don't simply cancel: the negative is much stronger evidence (likelihood ratio $\\frac{0.01}{0.95}$) than the positive ($19.8$)." },
        { text: "$\\dfrac{1}{6}$, unchanged", feedback: "A negative from a sensitive test is strong evidence against disease." },
        { text: "$0.01$", feedback: "That is $P(- \\mid D)$, the miss rate: a likelihood, not the posterior." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-6-q4",
      variant: "concept",
      question:
        "Two independent tests both come back positive. Does it matter whether you update on test A first and then B, or B first and then A?",
      options: [
        {
          text: "No. Each update multiplies by a likelihood, and multiplication doesn't care about order.",
          correct: true,
          feedback: "Posterior ∝ prior × $L_A$ × $L_B$ either way.",
        },
        { text: "Yes: the first test always counts more.", feedback: "The first test causes a smaller jump in probability here, but the final answer is the same either way." },
        { text: "Yes: you must use the more accurate test first.", feedback: "Order is irrelevant to the final posterior." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-6-q5",
      variant: "concept",
      question:
        "A lab re-runs the **same** blood sample through the same machine and gets a second positive. Why might this raise the probability of disease less than an independent second test would?",
      options: [
        {
          text: "Whatever caused a false positive the first time may cause it again, so the results aren't conditionally independent.",
          correct: true,
          feedback: "Chaining by multiplying likelihoods needs independence given each hypothesis. Correlated errors add much less information.",
        },
        { text: "Because the prior resets to 1% before every test.", feedback: "The prior should be your current belief, which is $\\frac16$ after the first positive." },
        { text: "It wouldn't: every positive multiplies the odds by 19.8 regardless.", feedback: "Only if the tests are conditionally independent." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-6-q6",
      variant: "practice",
      question:
        "Rain and dry days are equally likely. Each of two independent forecasters says \"rain\" on 80% of rainy days and 20% of dry days. Both say \"rain\". What is the probability of rain?",
      options: [
        {
          text: "$\\dfrac{16}{17}$",
          correct: true,
          feedback: "Prior odds $1:1$, likelihood ratio 4 per forecast: $1 \\times 4 \\times 4 = 16 : 1$, so $\\frac{16}{17} \\approx 0.94$.",
        },
        { text: "$\\dfrac{4}{5}$", feedback: "That is the posterior after only **one** forecast (odds $4:1$). Multiply by 4 again for the second." },
        { text: "$\\dfrac{8}{9}$", feedback: "You added the likelihood ratios ($4 + 4 = 8$). Independent evidence multiplies odds." },
        { text: "$0.64$", feedback: "That is $0.8^2 = P(\\text{both say rain} \\mid \\text{rain})$, a likelihood." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-6-q7",
      variant: "practice",
      question:
        "A coin is chosen at random from a fair coin and one with $P(H) = \\frac34$. Tossed twice, it shows H then T. What is the probability it is the biased coin?",
      options: [
        {
          text: "$\\dfrac{3}{7}$",
          correct: true,
          feedback: "Odds $1 \\times \\frac32 \\times \\frac12 = \\frac34$, so $\\frac{3}{3+4} = \\frac37$. Directly: $\\frac{3/16}{3/16 + 4/16} = \\frac37$.",
        },
        { text: "$\\dfrac{1}{2}$", feedback: "A head and a tail don't cancel: the tail's ratio $\\frac12$ is stronger against the biased coin than the head's $\\frac32$ is for it." },
        { text: "$\\dfrac{9}{17}$", feedback: "That's the answer for H, H, T in the worked example. Here there's only one head." },
        { text: "$\\dfrac{3}{16}$", feedback: "That's $P(HT \\mid \\text{biased})$, a likelihood." },
      ],
      hint: "Multiply the prior odds $1:1$ by $\\frac32$ for the head and $\\frac12$ for the tail.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-3-mastery",
  title: "3.7 · Chapter 3 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Mixed problems, no labels. For each one, name the partition (the hidden causes), write the priors and the likelihood of what was observed, and only then compute. If you're asked for $P(A)$, add the leaves; if you're asked for a cause given an effect, divide one leaf by that sum.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Checklist",
      content:
        "1. Is the question forward ($P(\\text{effect})$) or backward ($P(\\text{cause} \\mid \\text{effect})$)?\n2. Are the causes a genuine partition?\n3. Weighted, not plain, average.\n4. For a rare cause, expect the posterior to stay surprisingly low.\n5. Check the posteriors sum to 1.",
    },
    {
      type: "quiz",
      id: "pr3-7-q1",
      variant: "mastery",
      question:
        "Plant P makes 70% of a company's chips with a 2% defect rate; plant Q makes 30% with a 5% defect rate. What is the probability a random chip is defective?",
      options: [
        { text: "$0.029$", correct: true, feedback: "$0.7 \\times 0.02 + 0.3 \\times 0.05 = 0.014 + 0.015 = 0.029$." },
        { text: "$0.035$", feedback: "That's the unweighted average of 2% and 5%." },
        { text: "$0.07$", feedback: "You added the rates. Weight and average them instead." },
        { text: "$0.015$", feedback: "That's only plant Q's leaf." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-7-q2",
      variant: "mastery",
      question: "In the previous question, a chip is found to be defective. What is the probability it came from plant Q?",
      options: [
        { text: "$\\dfrac{15}{29}$", correct: true, feedback: "$\\frac{0.015}{0.029} = \\frac{15}{29} \\approx 0.52$. Q makes only 30% of chips but just over half the defective ones." },
        { text: "$0.3$", feedback: "That's the prior. Q's higher defect rate raises it." },
        { text: "$0.05$", feedback: "That's $P(\\text{defective} \\mid Q)$, the reverse conditional." },
        { text: "$\\dfrac{14}{29}$", feedback: "That's plant P's posterior." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-7-q3",
      variant: "mastery",
      question:
        "Bag I has 4 red and 4 black balls; bag II has 2 red and 6 black. A fair coin picks the bag and one ball is drawn. It is red. What is the probability it came from bag I?",
      options: [
        {
          text: "$\\dfrac{2}{3}$",
          correct: true,
          feedback: "$\\frac{\\frac12 \\cdot \\frac12}{\\frac12 \\cdot \\frac12 + \\frac12 \\cdot \\frac14} = \\frac{1/4}{3/8} = \\frac23$.",
        },
        { text: "$\\dfrac{1}{2}$", feedback: "That's the prior from the coin. Bag I has more red, so red favours it." },
        { text: "$\\dfrac{3}{8}$", feedback: "That's $P(\\text{red})$, the denominator." },
        { text: "$\\dfrac{1}{4}$", feedback: "That's $P(\\text{red} \\mid \\text{II})$, a likelihood for the other bag." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-7-q4",
      variant: "mastery",
      question:
        "Meera tells the truth with probability $\\frac23$. A die is thrown and Meera says \"it shows a number greater than 4\". Assume that when Meera lies, she says \"greater than 4\" about a roll that isn't. What is the probability the roll really is greater than 4?",
      options: [
        {
          text: "$\\dfrac{1}{2}$",
          correct: true,
          feedback: "Prior $P(>4) = \\frac13$. Joints: $\\frac13 \\cdot \\frac23 = \\frac29$ and $\\frac23 \\cdot \\frac13 = \\frac29$. Equal, so $\\frac12$.",
        },
        { text: "$\\dfrac{2}{3}$", feedback: "That's Meera's truthfulness. The rarity of rolls above 4 pulls it down." },
        { text: "$\\dfrac{1}{3}$", feedback: "That's the prior. Meera's report is evidence and moves it." },
        { text: "$\\dfrac{2}{9}$", feedback: "That's one joint. Divide by the total $\\frac49$." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-7-q5",
      variant: "mastery",
      question:
        "A condition has prevalence 2%. A test has sensitivity 90% and a false-positive rate of 10%. What is $P(\\text{condition} \\mid +)$?",
      options: [
        {
          text: "$\\dfrac{9}{58} \\approx 15.5\\%$",
          correct: true,
          feedback: "Out of 10,000: 200 have it, 180 test positive; 9,800 don't, 980 test positive. $\\frac{180}{1160} = \\frac{9}{58}$.",
        },
        { text: "$90\\%$", feedback: "That's the sensitivity, $P(+ \\mid \\text{condition})$: base-rate neglect." },
        { text: "$18\\%$", feedback: "Check the false positives: 10% of 9,800 is 980, so the positives total 1,160." },
        { text: "$2\\%$", feedback: "That's the prior; a positive result raises it." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-7-q6",
      variant: "mastery",
      question:
        "Monty variant: the host knows where the car is and never reveals it, but whenever he has a choice between doors 2 and 3 he **always** opens door 3. You pick door 1 and he opens door 3. What is the probability the car is behind door 2?",
      options: [
        {
          text: "$\\dfrac{1}{2}$",
          correct: true,
          feedback: "Likelihoods of \"opens 3\": car behind 1: now 1 (he always prefers 3); car behind 2: 1 (forced). Equal likelihoods, equal priors, so $\\frac12$ each.",
        },
        { text: "$\\dfrac{2}{3}$", feedback: "That uses the standard random-choice host, for whom $P(\\text{opens 3} \\mid C_1) = \\frac12$. This host's preference changes that likelihood to 1." },
        { text: "$1$", feedback: "Certainty would come if he had opened door 2: this host opens 2 only when forced, i.e. when the car is behind 3. Opening 3 is less revealing." },
        { text: "$\\dfrac{1}{3}$", feedback: "The car can't be behind door 3, so the $\\frac13$ it had is redistributed." },
      ],
      hint: "Write $P(\\text{opens 3} \\mid C_1)$ and $P(\\text{opens 3} \\mid C_2)$ for this host.",
    },
    {
      type: "quiz",
      id: "pr3-7-q7",
      variant: "mastery",
      question:
        "A box has 5 coins: 1 two-headed and 4 fair. You draw one at random and toss it twice, getting two heads. What is the probability it is the two-headed coin?",
      options: [
        {
          text: "$\\dfrac{1}{2}$",
          correct: true,
          feedback: "$\\frac{\\frac15 \\cdot 1}{\\frac15 \\cdot 1 + \\frac45 \\cdot \\frac14} = \\frac{1/5}{2/5} = \\frac12$. Prior odds $1:4$, times 2 per head, give $4:4$.",
        },
        { text: "$\\dfrac{1}{3}$", feedback: "That's after one head: odds $2:4$. Update again for the second head." },
        { text: "$\\dfrac{1}{5}$", feedback: "That's the prior." },
        { text: "$\\dfrac{4}{5}$", feedback: "Odds $4:4$ mean a probability of $\\frac12$, not $\\frac45$." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-7-q8",
      variant: "mastery",
      question:
        "MCQs have 4 options. A student knows an answer with probability $\\frac12$ and otherwise guesses at random. Given a correct answer, what is the probability the student guessed?",
      options: [
        {
          text: "$\\dfrac{1}{5}$",
          correct: true,
          feedback: "Joints: knew $\\frac12 \\cdot 1 = \\frac12$; guessed $\\frac12 \\cdot \\frac14 = \\frac18$. $P(\\text{guessed} \\mid \\text{correct}) = \\frac{1/8}{5/8} = \\frac15$.",
        },
        { text: "$\\dfrac{4}{5}$", feedback: "That's $P(\\text{knew} \\mid \\text{correct})$. The question asks for the complement." },
        { text: "$\\dfrac{1}{4}$", feedback: "That's $P(\\text{correct} \\mid \\text{guessed})$." },
        { text: "$\\dfrac{1}{2}$", feedback: "That's the prior. A correct answer is evidence against guessing." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-7-q9",
      variant: "mastery",
      question:
        "One card is lost from a well-shuffled pack of 52. Two cards are then drawn from the remaining 51 and both are diamonds. What is the probability that the lost card was a diamond?",
      options: [
        {
          text: "$\\dfrac{11}{50}$",
          correct: true,
          feedback: "Partition: lost card diamond ($\\frac14$) or not ($\\frac34$). Likelihoods: $\\frac{\\binom{12}{2}}{\\binom{51}{2}}$ and $\\frac{\\binom{13}{2}}{\\binom{51}{2}}$, i.e. proportional to 66 and 78. Posterior $\\frac{\\frac14 \\cdot 66}{\\frac14 \\cdot 66 + \\frac34 \\cdot 78} = \\frac{66}{66 + 234} = \\frac{11}{50}$.",
        },
        { text: "$\\dfrac{1}{4}$", feedback: "That's the prior. Two diamonds drawn is slight evidence that the diamonds were *not* depleted, so the posterior dips below $\\frac14$." },
        { text: "$\\dfrac{39}{50}$", feedback: "That's $P(\\text{lost card not a diamond} \\mid \\text{two diamonds})$, the complement." },
        { text: "$\\dfrac{22}{425}$", feedback: "That's the likelihood $\\frac{\\binom{12}{2}}{\\binom{51}{2}} = \\frac{66}{1275}$, the chance of two diamonds if a diamond was lost." },
      ],
      hint: "The hidden cause is the lost card. Compute each likelihood from the 51 cards that remain.",
    },
    {
      type: "quiz",
      id: "pr3-7-q10",
      variant: "mastery",
      question:
        "A town's buses come from three depots: 50% from X, 30% from Y and 20% from Z. The probability a bus runs late is $0.1$, $0.2$ and $0.3$ respectively. What is the probability that a randomly chosen bus runs late?",
      options: [
        { text: "$0.17$", correct: true, feedback: "$0.5(0.1) + 0.3(0.2) + 0.2(0.3) = 0.05 + 0.06 + 0.06 = 0.17$, a weighted average pulled toward X's $0.1$." },
        { text: "$0.2$", feedback: "That's the plain average of $0.1, 0.2, 0.3$. Weight each rate by its depot's share." },
        { text: "$0.6$", feedback: "You added the three rates. They are conditional on different depots, so weight and add the leaves instead." },
        { text: "$0.06$", feedback: "That's a single leaf (Y's, or Z's). Add all three." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-7-q11",
      variant: "mastery",
      question:
        "Which statement about Bayes' theorem is **false**?",
      options: [
        {
          text: "A test with 99% sensitivity guarantees that a positive result means at least a 99% chance of disease.",
          correct: true,
          feedback: "False: that's base-rate neglect. With 1% prevalence and 95% specificity, a positive means only about 17%.",
        },
        { text: "The posteriors over a partition add up to 1.", feedback: "True: given the evidence, exactly one hypothesis holds." },
        { text: "Today's posterior can be used as tomorrow's prior for independent new evidence.", feedback: "True: that's sequential updating." },
        { text: "Equal priors cancel, leaving each likelihood over the sum of likelihoods.", feedback: "True: that's the shortcut for \"a bag is chosen at random\" problems." },
      ],
    },
    {
      type: "quiz",
      id: "pr3-7-q12",
      variant: "mastery",
      question:
        "A bag has one fair coin and one two-headed coin. One is chosen at random and tossed once: heads. The **same** coin is tossed again. What is the probability of heads on the second toss?",
      options: [
        {
          text: "$\\dfrac{5}{6}$",
          correct: true,
          feedback: "Bayes first: $P(\\text{2H} \\mid H) = \\frac{1/2}{1/2 + 1/4} = \\frac23$. Then total probability with the updated weights: $\\frac23 \\cdot 1 + \\frac13 \\cdot \\frac12 = \\frac56$.",
        },
        { text: "$\\dfrac{3}{4}$", feedback: "That is $P(H)$ before any toss, $\\frac12 \\cdot 1 + \\frac12 \\cdot \\frac12$. The first head should update the weights." },
        { text: "$\\dfrac{2}{3}$", feedback: "That is $P(\\text{two-headed} \\mid H)$. You still need to predict the toss: even the fair coin can give heads." },
        { text: "$\\dfrac{1}{2}$", feedback: "Tosses of the same coin are independent **given the coin**, but not when you don't know which coin it is." },
      ],
      hint: "Update the coin probabilities with Bayes, then use them as weights in the law of total probability.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Everything so far has been about events: yes-or-no questions. Chapter 4 attaches **numbers** to outcomes (winnings, counts, scores) and asks what their average and spread are. The weighted average you met in the law of total probability returns as the expected value.",
    },
  ]),
};

export const probabilityChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
