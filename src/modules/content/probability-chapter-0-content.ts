import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Probability Chapter 0 — Chance, Experiments and Events.
 * "Chance" becomes a precise object: a random experiment, its sample space,
 * and events as subsets combined with set algebra. Counting tools size the
 * sample space when listing is impossible. Every later rule is written in
 * this language.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "uncertainty-you-can-measure",
  title: "0.1 · Uncertainty You Can Measure",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pr-0-chance-experiments-and-events.mp4",
      poster: "/videos/pr-0-chance-experiments-and-events.jpg",
      title: "Chapter 0 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Flip a coin once. Will it land heads? Nobody can tell you, not a physicist and not a computer. Now flip it 10,000 times. What fraction will be heads? Almost anybody will say \"about half\" and be right to within a percent or so.\n\nThat contrast is the whole subject. **A single outcome is unpredictable, but the long-run proportion is remarkably stable.** Probability is the mathematics of that stable proportion.",
    },
    {
      type: "text",
      content:
        "Try it before reading any definitions. Press the batch buttons and watch the line. It records the fraction of heads so far, after every flip. Notice the horizontal axis is logarithmic, so the first few flips get lots of room.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "coin",
        track: "heads",
        batchSizes: [1, 10, 100, 1000, 10000],
        seed: 7,
        caption:
          "The running proportion of heads. Early on it lurches wildly; after a few thousand flips it hugs the dashed line at 0.5. Run it again with more batches and watch the wobbles shrink.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "The gambler's fallacy",
      content:
        "\"Heads came up five times running, so tails is due.\" It is not. The coin has no memory, and the next flip is still 50–50. The simulator above shows the proof: after every run of 3 or more heads, the readout under the chart counts how often the *next* flip was heads. Run 10,000 flips and that fraction sits near one half, not below it.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Relative frequency",
      content:
        "If an experiment is repeated $n$ times and an outcome $E$ happens $m$ of those times, the **relative frequency** of $E$ is $\\dfrac{m}{n}$. It is always between 0 and 1. **Statistical regularity** is the observed fact that, as $n$ grows, this fraction settles down near a fixed number.",
    },
    {
      type: "math",
      latex: "f_n(\\text{H}) = \\frac{\\text{number of heads in } n \\text{ flips}}{n} \\;\\longrightarrow\\; \\tfrac{1}{2} \\quad \\text{as } n \\text{ grows}",
    },
    {
      type: "text",
      content:
        "Here is one typical run of a fair coin, recorded at four checkpoints (your simulator run will give different numbers, with the same pattern). Read the last two columns carefully, because they seem to disagree.",
    },
    {
      type: "table",
      headers: ["Flips $n$", "Heads", "Proportion $\\frac{m}{n}$", "Heads minus $\\frac{n}{2}$"],
      rows: [
        ["10", "7", "0.7", "+2"],
        ["100", "46", "0.46", "−4"],
        ["1,000", "509", "0.509", "+9"],
        ["10,000", "4,978", "0.4978", "−22"],
      ],
    },
    {
      type: "text",
      content:
        "The **proportion** gets closer to 0.5 at every checkpoint. The **raw count** of heads above or below half actually drifts *further* away: +2, then −4, +9, −22. Both are normal. The proportion settles because the gap is divided by an ever-larger $n$: a gap of 22 out of 10,000 is only 0.22%.\n\nSo the coin never \"corrects\" its earlier excess. It simply buries it under thousands of new flips.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — the numbers do not need to balance.** A fair coin gives 4 heads in the first 4 flips. What proportion of heads do you expect after 1,000 flips?\n\n**Step 1.** The remaining 996 flips know nothing about the first four, so expect half of them to be heads: $498$.\n\n**Step 2.** Add the heads already seen: $4 + 498 = 502$.\n\n**Step 3.** Proportion $= \\frac{502}{1000} = 0.502$.\n\nThe early streak is diluted, not cancelled. You would still expect 4 more heads than tails at the end, yet the proportion is almost exactly one half.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — estimating from data.** A die is rolled 600 times and a six appears 94 times.\n\n**Step 1.** Relative frequency of a six $= \\frac{94}{600} \\approx 0.157$.\n\n**Step 2.** For a fair die we would expect about $\\frac{1}{6} \\approx 0.167$, which is $100$ sixes in 600 rolls.\n\n**Step 3.** 94 is 6 below 100. With only 600 rolls a gap of that size happens often, so this is no evidence that the die is loaded. With 60,000 rolls and the same proportion, it would be.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — reading a frequency table (CBSE style).** A die is thrown 300 times with the results below. Find the relative frequency of (i) an even number, (ii) a number greater than 4, (iii) a prime number.",
    },
    {
      type: "table",
      headers: ["Face", "1", "2", "3", "4", "5", "6", "Total"],
      rows: [["Frequency", "45", "54", "51", "48", "57", "45", "300"]],
    },
    {
      type: "text",
      content:
        "**Step 1. Check the total.** $45 + 54 + 51 + 48 + 57 + 45 = 300$. *Why this step:* the number of trials is the denominator of every relative frequency, so confirm it before dividing anything.\n\n**Step 2. Add the counts of the faces inside each event.** *Why this step:* one throw shows exactly one face, so no throw is counted twice when face counts are added.\n\n(i) Even $= \\{2, 4, 6\\}$: $54 + 48 + 45 = 147$.\n(ii) Greater than 4 $= \\{5, 6\\}$: $57 + 45 = 102$.\n(iii) Prime $= \\{2, 3, 5\\}$: $54 + 51 + 57 = 162$. (1 is **not** prime, a favourite exam trap.)\n\n**Step 3. Divide each count by 300.**",
    },
    {
      type: "math",
      latex: "f(\\text{even}) = \\frac{147}{300} = 0.49, \\qquad f(\\text{greater than } 4) = \\frac{102}{300} = 0.34, \\qquad f(\\text{prime}) = \\frac{162}{300} = 0.54",
    },
    {
      type: "text",
      content:
        "*Sanity check:* a fair die would give roughly $0.5$, $0.33$ and $0.5$. The data sit close to all three, which is what 300 throws of a fair die typically look like.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — using a frequency to forecast.** A school cricketer has been out for fewer than 10 runs in 36 of her last 120 innings. About how many of her next 50 innings should the coach expect to end below 10?\n\n**Step 1. Estimate the long-run proportion.** $f = \\frac{36}{120} = 0.3$. *Why this step:* with 120 trials the relative frequency is the best available estimate of the stable long-run fraction.\n\n**Step 2. Scale to the new number of trials.** $0.3 \\times 50 = 15$ innings.\n\n**Step 3. Read it correctly.** \"About 15\" is a forecast of the proportion, not a promise. The real number could easily be 12 or 18, and a coach who sees 3 low scores in a row has learned almost nothing new.",
    },
    { type: "math", latex: "\\text{expected count} \\approx (\\text{relative frequency}) \\times (\\text{number of new trials}) = 0.3 \\times 50 = 15" },
    {
      type: "text",
      content:
        "Now a coin that is *not* fair. The reference line is hidden. Predict where the proportion will settle, then run a few thousand flips to check.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "coin",
        coinP: 0.3,
        track: "heads",
        showTheoretical: false,
        batchSizes: [10, 100, 1000, 10000],
        seed: 11,
        caption:
          "A bent coin. Ten flips could suggest almost anything; ten thousand flips leave very little doubt about its long-run proportion of heads.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      title: "What this chapter builds",
      content:
        "To talk about \"the fraction of the time something happens\" we first need a precise list of what *can* happen (the sample space) and a precise way to name the things we care about (events). That is Chapter 0. Chapter 1 then attaches numbers to events.",
    },
    {
      type: "quiz",
      id: "pr0-1-q1",
      variant: "concept",
      question: "A fair coin has just landed heads five times in a row. What is the probability that the next flip is tails?",
      options: [
        {
          text: "Exactly $\\frac{1}{2}$: the coin has no memory of earlier flips.",
          correct: true,
          feedback: "Each flip is a fresh experiment. The long-run proportion settles by dilution, not by the coin compensating.",
        },
        {
          text: "More than $\\frac{1}{2}$, because tails is now due.",
          feedback: "This is the gambler's fallacy. Nothing in the coin can store the previous five results.",
        },
        {
          text: "Less than $\\frac{1}{2}$, because the coin is on a heads streak.",
          feedback: "This is the \"hot hand\" version of the same mistake. A fair coin has no streaks built in.",
        },
        {
          text: "Exactly $\\frac{1}{64}$, because six heads in a row is rare.",
          feedback: "$\\frac{1}{64}$ is the chance of six heads *before any flip is made*. Five of those heads have already happened; only one flip is still uncertain.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pr0-1-q2",
      variant: "practice",
      question: "A coin is flipped 1,000 times and lands heads 488 times. What is the relative frequency of heads?",
      options: [
        { text: "$0.488$", correct: true, feedback: "$\\frac{488}{1000} = 0.488$, close to 0.5 as expected for a fair coin." },
        { text: "$0.512$", feedback: "That is the relative frequency of *tails*: $\\frac{512}{1000}$." },
        { text: "$488$", feedback: "That is the count. A relative frequency divides by the number of trials, so it is always between 0 and 1." },
        { text: "$0.976$", feedback: "That compares heads to half the flips ($\\frac{488}{500}$). Divide by all 1,000 flips." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-1-q3",
      variant: "concept",
      question: "As a fair coin is flipped more and more times, which statement is typically true?",
      options: [
        {
          text: "The proportion of heads gets closer to 0.5, even though the gap between the number of heads and $\\frac{n}{2}$ usually grows.",
          correct: true,
          feedback: "The gap grows roughly like $\\sqrt{n}$ while the proportion divides it by $n$, so the proportion still converges.",
        },
        {
          text: "The number of heads becomes exactly equal to the number of tails.",
          feedback: "Exact balance becomes *less* likely as $n$ grows. Only the proportion settles.",
        },
        {
          text: "Both the proportion and the raw gap shrink towards zero.",
          feedback: "Look at the table: the raw gap went +2, −4, +9, −22. It tends to grow; only the proportion settles.",
        },
      ],
      hint: "Compare the last two columns of the table above.",
    },
    {
      type: "quiz",
      id: "pr0-1-q4",
      variant: "practice",
      question:
        "Two students estimate the chance that a thumbtack lands point-up. Riya drops it 20 times and gets 13 point-up. Karan drops it 2,000 times and gets 1,240 point-up. Whose estimate should you trust more, and what is it?",
      options: [
        {
          text: "Karan's: $\\frac{1240}{2000} = 0.62$.",
          correct: true,
          feedback: "The relative frequency is only stable for large $n$. Riya's $\\frac{13}{20} = 0.65$ is close, but 20 trials could easily have given 0.5 or 0.8.",
        },
        {
          text: "Riya's: $\\frac{13}{20} = 0.65$, because it is the larger value.",
          feedback: "A bigger number is not a better estimate. More trials are what make it reliable.",
        },
        {
          text: "Neither: a thumbtack has two ways to land, so the answer is 0.5.",
          feedback: "Two outcomes does not mean equally likely. A thumbtack is lopsided, and only experiment tells us the proportion.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pr0-1-q5",
      variant: "practice",
      question:
        "Use the 300-throw table from Worked example 3 (faces 1 to 6: 45, 54, 51, 48, 57, 45). What is the relative frequency of a multiple of 3?",
      options: [
        { text: "$0.32$", correct: true, feedback: "Multiples of 3 are 3 and 6: $\\frac{51 + 45}{300} = \\frac{96}{300} = 0.32$." },
        { text: "$0.17$", feedback: "That is $\\frac{51}{300}$, face 3 only. 6 is a multiple of 3 too." },
        { text: "$0.15$", feedback: "That is $\\frac{45}{300}$, face 6 only. Include face 3 as well." },
        { text: "$0.33$", feedback: "That is the theoretical $\\frac{1}{3}$ for a fair die. The question asks for the frequency in this data." },
      ],
      hint: "List the faces in the event first, then add their frequencies.",
    },
    {
      type: "quiz",
      id: "pr0-1-q6",
      variant: "practice",
      question:
        "A school bus arrived late on 12 of the last 80 school days. Using this record, about how many late arrivals should you expect in the next 200 school days?",
      options: [
        { text: "About $30$", correct: true, feedback: "$\\frac{12}{80} = 0.15$, and $0.15 \\times 200 = 30$." },
        { text: "About $12$", feedback: "That repeats the old count. The new period is 200 days, two and a half times as long." },
        { text: "About $170$", feedback: "That is the expected number of on-time days, $0.85 \\times 200$." },
        { text: "$0.15$", feedback: "That is the relative frequency. Multiply it by 200 to get a count of days." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "experiments-and-sample-spaces",
  title: "0.2 · Experiments and Sample Spaces",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Before you can say how likely something is, you need to say exactly what *could* happen. Vague lists cause most wrong answers in probability. So the first job is to write down all the possibilities, with no gaps and no overlaps.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Experiment, outcome, sample space",
      content:
        "A **random experiment** is an action that (i) has more than one possible result, (ii) whose result cannot be predicted in advance, and (iii) can be repeated under the same conditions.\nEach possible result is an **outcome** (also called a *sample point*).\nThe set of all outcomes is the **sample space**, written $S$. The number of outcomes is $n(S)$.",
    },
    {
      type: "text",
      content:
        "Tossing a coin: $S = \\{\\text{H}, \\text{T}\\}$, $n(S) = 2$.\nRolling a die: $S = \\{1, 2, 3, 4, 5, 6\\}$, $n(S) = 6$.\n\nThose are easy. Things get interesting when an experiment has **stages**. Toss two coins, one after the other. The first coin can land two ways, and *for each of those* the second can land two ways. A tree draws that literally.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        showProbabilities: false,
        stages: [
          { label: "Coin 1", branches: [{ label: "H" }, { label: "T" }] },
          { label: "Coin 2", branches: [{ label: "H" }, { label: "T" }] },
        ],
        highlight: { label: "exactly one head", latex: "E", leaves: { successCount: { label: "H", k: 1 } } },
        caption:
          "Each path from left to right is one outcome. Four paths, so n(S) = 4. The highlighted leaves are the outcomes with exactly one head: there are two of them, HT and TH.",
      },
    },
    { type: "math", latex: "S = \\{\\text{HH},\\ \\text{HT},\\ \\text{TH},\\ \\text{TT}\\}, \\qquad n(S) = 4" },
    {
      type: "callout",
      variant: "warning",
      title: "d'Alembert's error",
      content:
        "In 1754 Jean d'Alembert argued that in two tosses the chance of at least one head is $\\frac{2}{3}$, listing three cases (H at once; TH; TT) as equally likely. The same trap in its most common form: \"two coins give 0, 1 or 2 heads, each with chance $\\frac{1}{3}$\". That list is a valid *description*, but its items are not equally likely. \"1 head\" happens in **two** ways, HT and TH, while \"2 heads\" happens in only one. Paint one coin red and the other blue if it helps: red-heads-blue-tails is plainly a different result from red-tails-blue-heads. The tree above shows it: \"1 head\" owns two of the four paths, so it happens about half the time, not a third.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Equally likely outcomes",
      content:
        "Outcomes are **equally likely** when there is no reason, by symmetry or by construction, for one to occur more often than another in the long run. HH, HT, TH, TT are equally likely; 0, 1, 2 heads are not. Chapter 1 builds the classical definition of probability on exactly this idea.",
    },
    {
      type: "text",
      content:
        "**Coin and die.** Toss a coin, then roll a die. Each of the 2 coin results is followed by any of 6 faces, so the tree has $2 \\times 6 = 12$ leaves.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        showProbabilities: false,
        stages: [
          { label: "Coin", branches: [{ label: "H" }, { label: "T" }] },
          {
            label: "Die",
            branches: [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }, { label: "6" }],
          },
        ],
        highlight: { label: "heads and an even number", latex: "E", leaves: ["0.1", "0.3", "0.5"] },
        caption:
          "Twelve paths: H1, …, H6, T1, …, T6. The highlighted leaves are \"heads and an even number\" (3 outcomes). Tap leaves to build your own event and watch n(E) update.",
      },
    },
    {
      type: "text",
      content:
        "**Two dice** would need a tree with 36 leaves, which is cluttered. A grid is neater: first die across the top, second die down the side, the same layout as every dice grid in this course. Every cell is one ordered pair $(a, b)$, sitting in column $a$ and row $b$, and $(1,2)$ and $(2,1)$ are different cells for the same reason HT and TH are different outcomes.",
    },
    {
      type: "table",
      headers: ["2nd \\ 1st", "1", "2", "3", "4", "5", "6"],
      rows: [
        ["1", "(1,1)", "(2,1)", "(3,1)", "(4,1)", "(5,1)", "(6,1)"],
        ["2", "(1,2)", "(2,2)", "(3,2)", "(4,2)", "(5,2)", "(6,2)"],
        ["3", "(1,3)", "(2,3)", "(3,3)", "(4,3)", "(5,3)", "(6,3)"],
        ["4", "(1,4)", "(2,4)", "(3,4)", "(4,4)", "(5,4)", "(6,4)"],
        ["5", "(1,5)", "(2,5)", "(3,5)", "(4,5)", "(5,5)", "(6,5)"],
        ["6", "(1,6)", "(2,6)", "(3,6)", "(4,6)", "(5,6)", "(6,6)"],
      ],
    },
    { type: "math", latex: "S = \\{(a, b) : a, b \\in \\{1, 2, 3, 4, 5, 6\\}\\}, \\qquad n(S) = 6 \\times 6 = 36" },
    {
      type: "callout",
      variant: "tip",
      title: "Choosing the level of detail",
      content:
        "The same experiment can be described by more than one sample space. For a die you could use $\\{1,2,3,4,5,6\\}$ or $\\{\\text{even}, \\text{odd}\\}$. Both are legitimate as long as the outcomes are **mutually exclusive** (exactly one happens) and **exhaustive** (one always happens). The finer list is usually better: it can answer more questions, and its outcomes are more often equally likely, which Chapter 1 will need.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — three coins.** Extend the tree one more stage. Each of the 4 two-coin outcomes splits into 2, giving $4 \\times 2 = 8$:\n\n$S = \\{\\text{HHH}, \\text{HHT}, \\text{HTH}, \\text{HTT}, \\text{THH}, \\text{THT}, \\text{TTH}, \\text{TTT}\\}$.\n\nThe pattern: $n$ coins give $2^n$ outcomes, because every coin doubles the number of paths.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        showProbabilities: false,
        stages: [
          { label: "Coin 1", branches: [{ label: "H" }, { label: "T" }] },
          { label: "Coin 2", branches: [{ label: "H" }, { label: "T" }] },
          { label: "Coin 3", branches: [{ label: "H" }, { label: "T" }] },
        ],
        highlight: { label: "exactly two heads", latex: "E", leaves: { successCount: { label: "H", k: 2 } } },
        caption:
          "Eight outcomes. Exactly two heads happens in three of them (HHT, HTH, THH), which is why \"0, 1, 2 or 3 heads\" are far from equally likely.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 2 — roll a die until a six appears.** Record the whole sequence of rolls. The six could come first, or after one non-six, or after two, and so on with no upper limit:\n\n$S = \\{(6),\\ (1,6),\\ (2,6),\\ \\ldots,\\ (5,6),\\ (1,1,6),\\ (1,2,6),\\ \\ldots\\}$,\n\nwhere every entry before the last is a non-six.\n\nThis sample space is **infinite**. If you only record the *number* of rolls, then $S = \\{1, 2, 3, \\ldots\\}$, still infinite. Sample spaces do not have to be finite; they only have to list every possibility.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — drawing two balls.** A bag holds two red balls and one blue ball. Two are drawn one after the other without replacement.\n\n**Step 1. Make identical-looking objects distinguishable.** Call them $R_1, R_2, B$. The balls are physically different even if you cannot tell them apart by eye.\n\n**Step 2. Ordered draws.** The first ball can be any of 3, the second any of the remaining 2: $3 \\times 2 = 6$ outcomes, $\\{R_1R_2, R_2R_1, R_1B, BR_1, R_2B, BR_2\\}$.\n\n**Step 3. If order is not recorded,** each pair appears twice in that list, so there are $\\frac{6}{2} = 3$ outcomes: $\\{\\{R_1,R_2\\}, \\{R_1,B\\}, \\{R_2,B\\}\\}$.\n\nBoth are valid sample spaces. What is *not* valid is writing $\\{\\text{RR}, \\text{RB}\\}$ and treating the two as equally likely: RR happens in 1 of the 3 unordered pairs.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — two traffic signals.** On the way to school Meera passes two traffic signals. When she reaches each one it is red (R), amber (A) or green (G). Write the sample space. How many outcomes make her meet at least one red?\n\n**Step 1. Treat each signal as a stage.** *Why this step:* the first signal has 3 results and, for each of them, the second has 3, so the tree has $3 \\times 3$ leaves.\n\n**Step 2. List in order (signal 1, then signal 2).**",
    },
    {
      type: "math",
      latex: "S = \\{\\text{RR}, \\text{RA}, \\text{RG}, \\text{AR}, \\text{AA}, \\text{AG}, \\text{GR}, \\text{GA}, \\text{GG}\\}, \\qquad n(S) = 3 \\times 3 = 9",
    },
    {
      type: "text",
      content:
        "**Step 3. Pick out the outcomes with an R anywhere.** RR, RA, RG (red at the first signal), then AR, GR (red only at the second): **5 outcomes**.\n\n*A warning worth keeping:* a sample space only lists what **can** happen. A signal may show green for 40 seconds and amber for 4, so these 9 outcomes are almost certainly **not** equally likely. Counting 5 out of 9 does not make the chance $\\frac{5}{9}$. Chapter 1 returns to this.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — a stage that depends on the first (NCERT style).** A coin is tossed. If it shows heads, a die is rolled; if it shows tails, the coin is tossed once more. Write the sample space.\n\n**Step 1. Draw the first stage.** Two branches: H and T.\n\n**Step 2. Grow each branch by its own rule.** *Why this step:* the second action is different on the two branches, so you cannot simply multiply $2 \\times 6$. Heads sprouts 6 branches (the die); tails sprouts 2 (a coin).\n\n**Step 3. Read off the leaves.**",
    },
    {
      type: "math",
      latex: "S = \\{\\text{H}1, \\text{H}2, \\text{H}3, \\text{H}4, \\text{H}5, \\text{H}6, \\text{TH}, \\text{TT}\\}, \\qquad n(S) = 6 + 2 = 8",
    },
    {
      type: "text",
      content:
        "Here the counts **add** across branches ($6 + 2$) because the branches are alternatives; they only multiply when every branch splits the same way. And again the outcomes are not equally likely: TH happens about a quarter of the time (tails, then heads), while H3 happens about one time in twelve.",
    },
    {
      type: "quiz",
      id: "pr0-2-q1",
      variant: "concept",
      question:
        "Two fair coins are tossed. A student writes $S = \\{0 \\text{ heads}, 1 \\text{ head}, 2 \\text{ heads}\\}$ and says each has chance $\\frac{1}{3}$. What is wrong?",
      options: [
        {
          text: "The outcomes are not equally likely: \"1 head\" covers both HT and TH.",
          correct: true,
          feedback: "That is d'Alembert's error. The list is a valid description, but the equally likely outcomes are HH, HT, TH, TT.",
        },
        {
          text: "Nothing. There really are three possible numbers of heads, so each is $\\frac{1}{3}$.",
          feedback: "Three possible results does not make three equally likely results. The tree above shows 1 head arises from two paths (HT and TH), 2 heads from only one, so 1 head happens about half the time.",
        },
        {
          text: "The list is missing \"3 heads\".",
          feedback: "With only two coins, 3 heads is impossible. The list is complete; the problem is the likelihoods.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pr0-2-q2",
      variant: "practice",
      question: "A coin is tossed four times. How many outcomes are in the sample space?",
      options: [
        { text: "16", correct: true, feedback: "Each toss doubles the number of paths: $2^4 = 16$." },
        { text: "8", feedback: "That is three tosses, $2^3$." },
        { text: "5", feedback: "That counts the possible *numbers* of heads (0 to 4), which are not the individual outcomes." },
        { text: "4", feedback: "That adds the tosses. Stages multiply." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-2-q3",
      variant: "practice",
      question: "A die is rolled and then a coin is tossed. Which of these is an outcome of the experiment, and what is $n(S)$?",
      options: [
        { text: "$(4, \\text{T})$ is an outcome; $n(S) = 12$.", correct: true, feedback: "An outcome records both stages. $6 \\times 2 = 12$ ordered pairs." },
        { text: "$4$ is an outcome; $n(S) = 8$.", feedback: "An outcome must record the coin too. And stages multiply ($6 \\times 2$), they do not add." },
        { text: "$(4, \\text{T})$ is an outcome; $n(S) = 8$.", feedback: "The outcome is right, but $6 + 2 = 8$ adds the stages instead of multiplying them." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-2-q4",
      variant: "concept",
      question: "A die is rolled repeatedly until the first six appears, and the number of rolls is recorded. What is the sample space?",
      options: [
        {
          text: "$\\{1, 2, 3, \\ldots\\}$, an infinite set.",
          correct: true,
          feedback: "There is no roll count that is guaranteed to be enough, so every positive integer is possible.",
        },
        { text: "$\\{1, 2, 3, 4, 5, 6\\}$", feedback: "Those are the faces. The experiment records how many rolls were needed, which has no upper bound." },
        { text: "$\\{6\\}$", feedback: "The last face is always 6, so recording it tells us nothing. The number of rolls varies." },
        { text: "$\\{1, 2, \\ldots, 36\\}$", feedback: "There is no cap at 36 rolls; long waits are unlikely but possible." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-2-q5",
      variant: "practice",
      question: "Four different books are on a shelf. You take one, then take a second from the remaining books, recording the order. How many outcomes are there?",
      options: [
        { text: "12", correct: true, feedback: "4 choices for the first, 3 for the second: $4 \\times 3 = 12$." },
        { text: "16", feedback: "That allows the same book to be taken twice. Without replacement the second stage has only 3 options." },
        { text: "6", feedback: "That ignores order (each pair counted once). Here the order is recorded." },
        { text: "8", feedback: "That adds rather than multiplying, or doubles 4. Use the tree: 4 branches, each splitting into 3." },
      ],
      hint: "Draw the first stage of the tree, then ask how many branches leave each node.",
    },
    {
      type: "quiz",
      id: "pr0-2-q6",
      variant: "practice",
      question:
        "A coin is tossed. If it shows heads, the coin is tossed again; if it shows tails, a die is rolled. How many outcomes are in the sample space?",
      options: [
        { text: "8", correct: true, feedback: "$S = \\{\\text{HH}, \\text{HT}, \\text{T}1, \\ldots, \\text{T}6\\}$: $2 + 6 = 8$ leaves." },
        { text: "12", feedback: "That assumes the die is rolled after every toss ($2 \\times 6$). After heads, only a coin is tossed." },
        { text: "4", feedback: "That assumes a coin follows every toss. After tails the die gives 6 branches." },
        { text: "6", feedback: "That lists only the tails branch. HH and HT are outcomes too." },
      ],
      hint: "Grow each first-stage branch by its own rule, then count leaves.",
    },
    {
      type: "quiz",
      id: "pr0-2-q7",
      variant: "practice",
      question:
        "A quiz has 3 true/false questions followed by one multiple-choice question with 4 options. A student's full answer sheet is recorded. How many outcomes are there?",
      options: [
        { text: "32", correct: true, feedback: "$2 \\times 2 \\times 2 \\times 4 = 2^3 \\times 4 = 32$." },
        { text: "10", feedback: "That adds the options ($2 + 2 + 2 + 4$). Every branch splits the same way, so stages multiply." },
        { text: "24", feedback: "That is $3 \\times 2 \\times 4$: the three true/false questions each double the count, giving $2^3$, not $3 \\times 2$." },
        { text: "12", feedback: "That treats the three true/false questions as one stage with 3 options. There are three separate stages of 2." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "events-as-subsets",
  title: "0.3 · Events as Subsets",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "We rarely care about one exact outcome. We care about things like \"the sum is 7\" or \"at least one six\". Each of those statements is true for some outcomes and false for others. Collect the outcomes where it is true, and you have captured the statement as a set.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Event",
      content:
        "An **event** is a subset of the sample space: $E \\subseteq S$.\nWe say $E$ **occurs** when the actual outcome of the experiment lands in $E$.",
    },
    {
      type: "text",
      content:
        "Roll two dice. The event \"sum is 7\" is the set of cells whose coordinates add to 7. On the grid they form a diagonal. Run the dice and watch each roll light up a cell: when it lands on the diagonal, the event has occurred.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "two-dice",
        events: [{ id: "A", label: "sum is 7", latex: "A", preset: "sum-eq", value: 7 }],
        track: "event-A",
        batchSizes: [1, 10, 100, 1000],
        seed: 3,
        caption:
          "The shaded cells are the event A = \"sum is 7\". Every roll lands in one cell; the event occurs when that cell is shaded.",
      },
    },
    { type: "math", latex: "A = \\{(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)\\}, \\qquad n(A) = 6" },
    {
      type: "text",
      content:
        "Events come in a few named kinds, and each is just a subset of a particular size:",
    },
    {
      type: "table",
      headers: ["Kind", "As a set", "Example with one die, $S = \\{1,\\ldots,6\\}$"],
      rows: [
        ["Simple (elementary) event", "exactly one outcome", "\"a 4\": $\\{4\\}$"],
        ["Compound event", "more than one outcome", "\"a prime\": $\\{2, 3, 5\\}$"],
        ["Sure event", "the whole of $S$", "\"less than 7\": $\\{1, 2, 3, 4, 5, 6\\}$"],
        ["Impossible event", "the empty set $\\varnothing$", "\"a 7\": $\\varnothing$"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "The impossible event is still an event",
      content:
        "\"The die shows 7\" is a perfectly good event. It is the empty set, so it never occurs. Likewise \"less than 7\" is the whole of $S$, so it always occurs. Having these two extremes in the family keeps the algebra of the next lesson closed: combining events always produces another event.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — sum at least 10.** Which cells of the two-dice grid make up \"sum $\\geq 10$\"?\n\n**Step 1. Split by the exact sum.** Sum 10: $(4,6), (5,5), (6,4)$. Sum 11: $(5,6), (6,5)$. Sum 12: $(6,6)$.\n\n**Step 2. Collect.** $E = \\{(4,6), (5,5), (6,4), (5,6), (6,5), (6,6)\\}$, so $n(E) = 3 + 2 + 1 = 6$.\n\nOn the grid these fill the bottom-right corner, a small triangle. Check it below.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "two-dice",
        events: [{ id: "A", label: "sum is at least 10", latex: "E", preset: "sum-ge", value: 10 }],
        track: "event-A",
        seed: 5,
        caption: "\"Sum ≥ 10\" is the corner triangle of 6 cells. Constant sums run along anti-diagonals, so \"sum at least\" events are always triangles in this corner.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 2 — at least one six.** Count the cells with a 6 in either coordinate.\n\n**Step 1.** Column 6 (first die is 6): 6 cells. Row 6 (second die is 6): 6 cells.\n\n**Step 2.** The cell $(6,6)$ is in both and has been counted twice, so subtract it once: $6 + 6 - 1 = 11$.\n\nThat double-counting correction is your first sight of the addition rule of Chapter 1.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — three coins.** $E$ = \"at least two heads\" $= \\{\\text{HHH}, \\text{HHT}, \\text{HTH}, \\text{THH}\\}$, so $n(E) = 4$. The event $F$ = \"the first and last tosses match\" $= \\{\\text{HHH}, \\text{HTH}, \\text{THT}, \\text{TTT}\\}$, also 4 outcomes. Different events can have the same size.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — a quality check.** A shop has 5 phones, labelled $P_1, \\ldots, P_5$. Phones $P_1$ and $P_2$ are faulty. An inspector picks 2 phones at once. Write the sample space, the event $E$ = \"at least one faulty phone is picked\" and the event $F$ = \"no faulty phone is picked\".\n\n**Step 1. Label the phones.** *Why this step:* two faulty phones look the same, but they are different objects. Labels keep $\\{P_1, P_3\\}$ and $\\{P_2, P_3\\}$ as separate outcomes (the lesson from d'Alembert).\n\n**Step 2. List the unordered pairs.** Pair $P_1$ with each later phone, then $P_2$, and so on: $4 + 3 + 2 + 1 = 10$ outcomes.",
    },
    {
      type: "math",
      latex: "S = \\{P_1P_2,\\ P_1P_3,\\ P_1P_4,\\ P_1P_5,\\ P_2P_3,\\ P_2P_4,\\ P_2P_5,\\ P_3P_4,\\ P_3P_5,\\ P_4P_5\\}, \\qquad n(S) = 10",
    },
    {
      type: "text",
      content:
        "**Step 3. Test each outcome against the statement.** Any pair containing $P_1$ or $P_2$ belongs to $E$:\n\n$E = \\{P_1P_2, P_1P_3, P_1P_4, P_1P_5, P_2P_3, P_2P_4, P_2P_5\\}$, so $n(E) = 7$.\n$F = \\{P_3P_4, P_3P_5, P_4P_5\\}$, so $n(F) = 3$.\n\n**Step 4. Check.** $7 + 3 = 10$: every outcome is in exactly one of $E$ and $F$, because \"no faulty phone\" is exactly the failure of \"at least one\". Next lesson gives this relationship a name: $F = E'$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — product is a perfect square (exam style).** Two dice are rolled. How many outcomes are in $E$ = \"the product of the two numbers is a perfect square\"?\n\n**Step 1. List the possible target values.** Products run from 1 to 36, so the perfect squares available are $1, 4, 9, 16, 25, 36$. *Why this step:* splitting by the value of the product turns one fuzzy question into six small, checkable ones.\n\n**Step 2. Find the cells for each value, with both orders.**\n• $1$: $(1,1)$.\n• $4$: $(1,4), (4,1), (2,2)$.\n• $9$: $(3,3)$ only, since $1 \\times 9$ needs a 9.\n• $16$: $(4,4)$ only, since $2 \\times 8$ needs an 8.\n• $25$: $(5,5)$.\n• $36$: $(6,6)$ only, since $4 \\times 9$ needs a 9.",
    },
    { type: "math", latex: "n(E) = 1 + 3 + 1 + 1 + 1 + 1 = 8" },
    {
      type: "text",
      content:
        "The common slips are opposite: forgetting $(4,1)$ once $(1,4)$ is written, and writing $(2,2)$ twice. A double sits on the diagonal and has only one order.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "How many events are there?",
      content:
        "Every subset of $S$ is an event. A set with $n$ elements has $2^n$ subsets: each outcome is either in or out. So one die ($n(S) = 6$) has $2^6 = 64$ events, including $\\varnothing$ and $S$ itself.",
    },
    {
      type: "quiz",
      id: "pr0-3-q1",
      variant: "practice",
      question: "Two dice are rolled. How many outcomes are in the event \"the sum is 9\"?",
      options: [
        { text: "4", correct: true, feedback: "$(3,6), (4,5), (5,4), (6,3)$." },
        { text: "2", feedback: "That counts $\\{3,6\\}$ and $\\{4,5\\}$ as unordered pairs. On the grid $(3,6)$ and $(6,3)$ are different cells." },
        { text: "5", feedback: "Sum 8 has 5 cells. For sum 9 the first die must be at least 3." },
        { text: "6", feedback: "Only sum 7 has 6 cells; it is the longest anti-diagonal." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-3-q2",
      variant: "practice",
      question: "Two dice are rolled. How many outcomes are in the event \"at least one die shows a 6\"?",
      options: [
        { text: "11", correct: true, feedback: "Row 6 plus column 6 is 12 cells, but $(6,6)$ is in both: $12 - 1 = 11$." },
        { text: "12", feedback: "The cell $(6,6)$ has been counted twice, once in the row and once in the column." },
        { text: "6", feedback: "That is only one die being a 6. The event allows either die." },
        { text: "10", feedback: "That removes $(6,6)$ entirely. It does belong to the event; it was just counted twice." },
      ],
      hint: "Shade row 6 and column 6 on the grid and count the shaded cells, not the shadings.",
    },
    {
      type: "quiz",
      id: "pr0-3-q3",
      variant: "concept",
      question: "Two dice are rolled. What kind of event is \"the sum is 1\"?",
      options: [
        {
          text: "The impossible event $\\varnothing$: a perfectly valid event that never occurs.",
          correct: true,
          feedback: "The smallest sum is 2, so no cell qualifies. The empty set is still a subset of $S$.",
        },
        { text: "Not an event, since it cannot happen.", feedback: "Every subset of $S$ is an event, including the empty one." },
        { text: "A simple event, because it names a single sum.", feedback: "A simple event contains exactly one *outcome*. This one contains none." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-3-q4",
      variant: "practice",
      question: "Two dice are rolled and show $(3, 4)$. Which of these events occurred?",
      options: [
        { text: "\"The sum is odd\"", correct: true, feedback: "$3 + 4 = 7$ is odd, so the outcome lies inside that event." },
        { text: "\"Doubles\"", feedback: "Doubles means both dice match; $3 \\neq 4$." },
        { text: "\"The first die is even\"", feedback: "The first die shows 3, which is odd." },
        { text: "\"The sum is at least 10\"", feedback: "The sum is 7." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-3-q5",
      variant: "practice",
      question: "A coin is tossed twice, so $S = \\{\\text{HH}, \\text{HT}, \\text{TH}, \\text{TT}\\}$. How many different events can be defined on this sample space?",
      options: [
        { text: "16", correct: true, feedback: "Each of the 4 outcomes is in or out of an event: $2^4 = 16$ subsets." },
        { text: "4", feedback: "That counts the simple events only. Compound, sure and impossible events are events too." },
        { text: "15", feedback: "That leaves out one subset, probably $\\varnothing$. The impossible event counts." },
        { text: "8", feedback: "$2^3$ would be right for a 3-outcome sample space; here there are 4 outcomes." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-3-q6",
      variant: "practice",
      question: "Two dice are rolled. How many outcomes are in the event \"the product of the two numbers is odd\"?",
      options: [
        { text: "9", correct: true, feedback: "A product is odd only when both factors are odd: $3 \\times 3 = 9$ cells." },
        { text: "18", feedback: "18 cells have an odd *sum* (one odd, one even). An odd product needs both numbers odd." },
        { text: "27", feedback: "That is \"at least one die is odd\", $36 - 9$. One even factor makes the product even." },
        { text: "3", feedback: "That counts the odd faces $1, 3, 5$. Each die can show any of them, so there are $3 \\times 3$ ordered pairs." },
      ],
      hint: "When is a product of two whole numbers odd?",
    },
    {
      type: "quiz",
      id: "pr0-3-q7",
      variant: "practice",
      question:
        "In Worked example 4 (phones $P_1, \\ldots, P_5$, with $P_1, P_2$ faulty, two picked at once), how many outcomes are in the event \"exactly one faulty phone is picked\"?",
      options: [
        {
          text: "6",
          correct: true,
          feedback: "$P_1P_3, P_1P_4, P_1P_5, P_2P_3, P_2P_4, P_2P_5$: one of the 2 faulty phones with one of the 3 good ones, $2 \\times 3 = 6$.",
        },
        { text: "7", feedback: "That is \"at least one\", which also contains $P_1P_2$, where both phones are faulty." },
        { text: "12", feedback: "That counts ordered picks. The phones are picked at once, so $P_1P_3$ and $P_3P_1$ are the same outcome." },
        { text: "3", feedback: "That fixes the faulty phone as $P_1$. The single faulty phone could be $P_2$ as well." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "algebra-of-events",
  title: "0.4 · The Algebra of Events",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Everyday language builds new statements out of old ones with *or*, *and*, *not* and *but not*. Because events are sets, each of those words becomes a set operation. That translation is the core skill of this lesson: once a worded event is written in set notation, it can be counted and, from Chapter 1 onwards, measured.",
    },
    {
      type: "table",
      headers: ["In words", "Set notation", "Occurs when the outcome is…"],
      rows: [
        ["$A$ or $B$ (at least one of them)", "$A \\cup B$", "in $A$, in $B$, or in both"],
        ["$A$ and $B$ (both)", "$A \\cap B$", "in $A$ and also in $B$"],
        ["not $A$", "$A'$ $= S - A$", "outside $A$"],
        ["$A$ but not $B$", "$A - B = A \\cap B'$", "in $A$ and outside $B$"],
      ],
    },
    {
      type: "text",
      content:
        "**The general picture: a Venn diagram.** Draw $S$ as a rectangle and $A$, $B$ as two overlapping circles inside it. The two circles cut $S$ into exactly four regions, and every outcome lands in exactly one of them. Every event you can build from $A$ and $B$ with *or*, *and*, *not* is a union of some of these four regions, so once you can name the regions you can shade anything.",
    },
    {
      type: "table",
      headers: ["Venn region", "Set", "In words", "Cells in the dice grid below"],
      rows: [
        ["left circle only", "$A \\cap B'$", "$A$ but not $B$", "9"],
        ["the overlap (lens)", "$A \\cap B$", "both", "9"],
        ["right circle only", "$A' \\cap B$", "$B$ but not $A$", "6"],
        ["outside both circles", "$(A \\cup B)' = A' \\cap B'$", "neither", "12"],
      ],
    },
    {
      type: "text",
      content:
        "The four counts add up to $9 + 9 + 6 + 12 = 36 = n(S)$, as they must: the regions form a partition. The dice grid is one concrete Venn diagram in which the \"circles\" happen to be blocks of cells. With three events $A$, $B$, $C$, three overlapping circles cut $S$ into $2^3 = 8$ regions, one for each in/out pattern.",
    },
    {
      type: "text",
      content:
        "Shading makes every one of these visible. Below, $A$ = \"first die even\" and $B$ = \"sum $\\geq 8$\". Use the buttons to switch the shaded region between $A \\cup B$, $A \\cap B$, $A'$ and $A - B$, and count cells each time.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "two-dice",
        events: [
          { id: "A", label: "first die even", latex: "A", preset: "first-even" },
          { id: "B", label: "sum at least 8", latex: "B", preset: "sum-ge", value: 8 },
        ],
        combine: "union",
        allowCombineToggle: true,
        track: "event-A",
        seed: 42,
        caption:
          "A is columns 2, 4 and 6 (the first die is even; 18 cells). B is the lower-right triangle (15 cells). Toggle the combinations and verify the counts in the table below.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1 — counting the combinations.**\n\n**Step 1. $A$.** Columns 2, 4, 6 (first die even), six cells each: $n(A) = 18$.\n\n**Step 2. $B$.** Sums 8, 9, 10, 11, 12 have $5 + 4 + 3 + 2 + 1 = 15$ cells.\n\n**Step 3. $A \\cap B$.** Go column by column. First die 2: second must be 6 (1 cell). First die 4: second $\\geq 4$ (3 cells). First die 6: second $\\geq 2$ (5 cells). Total $1 + 3 + 5 = 9$.\n\n**Step 4. $A \\cup B$.** Adding 18 and 15 counts the 9 overlap cells twice, so $n(A \\cup B) = 18 + 15 - 9 = 24$.\n\n**Step 5.** $n(A') = 36 - 18 = 18$ and $n(A - B) = 18 - 9 = 9$.",
    },
    {
      type: "table",
      headers: ["Region", "$A \\cup B$", "$A \\cap B$", "$A'$", "$A - B$", "$(A \\cup B)'$"],
      rows: [["Cells", "24", "9", "18", "9", "12"]],
    },
    {
      type: "callout",
      variant: "warning",
      title: "\"Or\" includes both",
      content:
        "In ordinary speech \"tea or coffee?\" usually means one, not both. In probability, **$A$ or $B$ always means at least one**, and the outcomes in both are included. When a question really wants just one of them, it says \"**exactly** one\", and that is a different event: $(A - B) \\cup (B - A)$.",
    },
    {
      type: "text",
      content:
        "**De Morgan's laws, by shading.** What is the region *outside* $A \\cup B$? Those cells are outside $A$ and also outside $B$. So the complement of a union is the intersection of the complements. Check the count: cells with first die odd and sum $\\leq 7$. First die 1: 6 cells. First die 3: second $\\leq 4$, 4 cells. First die 5: second $\\leq 2$, 2 cells. Total $6 + 4 + 2 = 12 = 36 - 24$. It matches.",
    },
    {
      type: "math",
      latex: "(A \\cup B)' = A' \\cap B' \\qquad\\qquad (A \\cap B)' = A' \\cup B'",
    },
    {
      type: "text",
      content:
        "The argument works for any sets, not just this grid. An outcome is outside $A \\cup B$ exactly when it is in neither $A$ nor $B$, which is the definition of $A' \\cap B'$. For the second law: an outcome fails to be in *both* exactly when it misses at least one of them, which is $A' \\cup B'$.\n\nIn words: \"**not (A or B)**\" is \"**neither A nor B**\", and \"**not both**\" is \"**at least one fails**\".",
    },
    {
      type: "callout",
      variant: "info",
      title: "Laws of the algebra of events",
      content:
        "Each law below can be checked by shading both sides on a Venn diagram and seeing the same region.\n• **Complement laws:** $A \\cup A' = S$ (every outcome is in $A$ or outside it); $A \\cap A' = \\varnothing$ (none is both); $(A')' = A$ (outside the outside is inside); $S' = \\varnothing$, $\\varnothing' = S$.\n• **Commutative:** $A \\cup B = B \\cup A$ and $A \\cap B = B \\cap A$ (the order of naming does not change the shaded region).\n• **Associative:** $(A \\cup B) \\cup C = A \\cup (B \\cup C)$ and $(A \\cap B) \\cap C = A \\cap (B \\cap C)$ (so $A \\cup B \\cup C$ needs no brackets).\n• **Distributive:** $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$ and $A \\cup (B \\cap C) = (A \\cup B) \\cap (A \\cup C)$ (shade $A$ and the union of $B$, $C$: the overlap is the part of $A$ inside $B$ plus the part inside $C$).\n• **Difference:** $A - B = A \\cap B'$ (in $A$, and outside $B$).\n• **Identity:** $A \\cup \\varnothing = A$, $A \\cap S = A$, $A \\cup S = S$, $A \\cap \\varnothing = \\varnothing$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Mutually exclusive, exhaustive, partition",
      content:
        "$A$ and $B$ are **mutually exclusive** (disjoint) if $A \\cap B = \\varnothing$: they cannot happen together.\nEvents $E_1, E_2, \\ldots, E_k$ are **exhaustive** if $E_1 \\cup E_2 \\cup \\cdots \\cup E_k = S$: at least one always happens.\nIf they are pairwise mutually exclusive and exhaustive, and each $E_i \\neq \\varnothing$, they form a **partition** of $S$: **exactly one** of them happens on every trial.",
    },
    {
      type: "table",
      headers: ["Events on one die", "Mutually exclusive?", "Exhaustive?", "Partition?"],
      rows: [
        ["$\\{1,2\\}, \\{3,4\\}, \\{5,6\\}$", "yes", "yes", "yes"],
        ["$\\{1,2,3\\}, \\{3,4,5,6\\}$", "no (both contain 3)", "yes", "no"],
        ["$\\{1\\}, \\{2\\}$", "yes", "no (3 to 6 are missing)", "no"],
        ["$A, A'$ for any event $A$ other than $\\varnothing$ and $S$", "yes", "yes", "yes"],
      ],
    },
    {
      type: "text",
      content:
        "Partitions matter later: splitting $S$ into pieces that cannot overlap and leave nothing out is exactly what the law of total probability and Bayes' theorem need in Chapter 3.",
    },
    {
      type: "text",
      content:
        "**The translation dictionary.** These phrases appear in almost every exam question. Each has a set form you should be able to write without thinking.",
    },
    {
      type: "table",
      headers: ["Phrase", "Set notation"],
      rows: [
        ["at least one of $A$, $B$", "$A \\cup B$"],
        ["both $A$ and $B$", "$A \\cap B$"],
        ["exactly one of $A$, $B$", "$(A \\cap B') \\cup (A' \\cap B)$"],
        ["neither $A$ nor $B$", "$A' \\cap B' = (A \\cup B)'$"],
        ["at most one of $A$, $B$", "$(A \\cap B)' = A' \\cup B'$"],
        ["none of $A$, $B$, $C$", "$A' \\cap B' \\cap C' = (A \\cup B \\cup C)'$"],
        ["all of $A$, $B$, $C$", "$A \\cap B \\cap C$"],
        ["at least one of $A$, $B$, $C$", "$A \\cup B \\cup C$"],
        ["exactly one of $A$, $B$, $C$", "$(A \\cap B' \\cap C') \\cup (A' \\cap B \\cap C') \\cup (A' \\cap B' \\cap C)$"],
        ["at least two of $A$, $B$, $C$", "$(A \\cap B) \\cup (B \\cap C) \\cup (C \\cap A)$"],
        ["exactly two of $A$, $B$, $C$", "$(A \\cap B \\cap C') \\cup (A \\cap B' \\cap C) \\cup (A' \\cap B \\cap C)$"],
      ],
    },
    {
      type: "text",
      content:
        "**Reading the three-event phrases.** \"Exactly one\" means one of the three happens and the other two fail, so each piece has one plain letter and two complements; there are three ways to choose which letter is plain. \"At least two\" means *some pair* happens: if $A$ and $B$ both happen, the outcome is in $A \\cap B$ whatever $C$ does, so the union of the three pairwise intersections catches every outcome with two or three successes. On a three-circle Venn diagram it is the three lens-shaped overlaps together with the centre.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — three coins.** Let $A$ = \"first toss is heads\" and $B$ = \"exactly one head\".\n\n$A = \\{\\text{HHH}, \\text{HHT}, \\text{HTH}, \\text{HTT}\\}$, $B = \\{\\text{HTT}, \\text{THT}, \\text{TTH}\\}$.\n\n$A \\cap B = \\{\\text{HTT}\\}$: first is a head and it is the only head.\n$A \\cup B = \\{\\text{HHH}, \\text{HHT}, \\text{HTH}, \\text{HTT}, \\text{THT}, \\text{TTH}\\}$, six outcomes.\n$B - A = \\{\\text{THT}, \\text{TTH}\\}$.\nNeither: $(A \\cup B)' = \\{\\text{THH}, \\text{TTT}\\}$.\n\n$A$ and $B$ are **not** mutually exclusive, because they share HTT. Check: $6 + 2 = 8 = n(S)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — raffle tickets.** Tickets numbered 1 to 30 are in a drum and one is drawn. $A$ = \"a multiple of 3\", $B$ = \"a multiple of 5\". Count $A \\cap B$, $A \\cup B$, \"neither\" and \"exactly one\".\n\n**Step 1. Size each event.** Multiples of 3 up to 30: $3, 6, \\ldots, 30$, so $n(A) = 10$. Multiples of 5: $5, 10, \\ldots, 30$, so $n(B) = 6$.\n\n**Step 2. Find the overlap.** A number is a multiple of both 3 and 5 exactly when it is a multiple of 15: $A \\cap B = \\{15, 30\\}$, $n(A \\cap B) = 2$. *Why this step:* the overlap has to be found first, because every other region is built from it.\n\n**Step 3. Fill the four Venn regions.** $A$ only: $10 - 2 = 8$. $B$ only: $6 - 2 = 4$. Both: 2. Neither: $30 - (8 + 2 + 4) = 16$.",
    },
    {
      type: "math",
      latex: "n(A \\cup B) = 10 + 6 - 2 = 14, \\qquad n\\big((A \\cup B)'\\big) = 30 - 14 = 16, \\qquad n(\\text{exactly one}) = 8 + 4 = 12",
    },
    {
      type: "text",
      content:
        "*Check:* $8 + 2 + 4 + 16 = 30$. The four regions are a partition, so their counts must add back to $n(S)$. If they do not, a region was double-counted or missed.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — which pairs are mutually exclusive? (NCERT style).** Two dice are rolled. Let\n$A$ = \"the sum is even\", $B$ = \"the sum is a multiple of 3\", $C$ = \"the sum is less than 4\", $D$ = \"the sum is greater than 11\".\nWhich pairs are mutually exclusive? Are $A, B, C, D$ exhaustive?\n\n**Step 1. Rewrite each event as a set of sums.** $A$: 2, 4, 6, 8, 10, 12. $B$: 3, 6, 9, 12. $C$: 2, 3. $D$: 12. *Why this step:* every event here depends only on the sum, so comparing lists of sums is far quicker than comparing 36 cells.\n\n**Step 2. Look for one shared outcome in each pair.** *Why this step:* a single common outcome is enough to prove two events are **not** exclusive.",
    },
    {
      type: "table",
      headers: ["Pair", "A shared outcome?", "Mutually exclusive?"],
      rows: [
        ["$A, B$", "sum 6, e.g. $(3,3)$", "no"],
        ["$A, C$", "sum 2, $(1,1)$", "no"],
        ["$A, D$", "sum 12, $(6,6)$", "no"],
        ["$B, C$", "sum 3, e.g. $(1,2)$", "no"],
        ["$B, D$", "sum 12, $(6,6)$", "no"],
        ["$C, D$", "none: a sum cannot be both $< 4$ and $> 11$", "**yes**"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 3. Exhaustive?** No. The outcome $(1,4)$ has sum 5, which is odd, not a multiple of 3, not below 4 and not above 11, so it lies in none of the four events. One outcome left out is enough to break exhaustiveness.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — three events in words.** Three friends $A$, $B$, $C$ each try the same puzzle; let the same letters stand for \"$A$ solves it\" and so on. Translate:\n\n• \"The puzzle gets solved\" means at least one solves it: $A \\cup B \\cup C$.\n• \"Only $A$ solves it\": $A$ succeeds and the other two fail, $A \\cap B' \\cap C'$.\n• \"Nobody solves it\": $A' \\cap B' \\cap C' = (A \\cup B \\cup C)'$, by De Morgan.\n• \"Not everyone solves it\": $(A \\cap B \\cap C)' = A' \\cup B' \\cup C'$.\n\n*Why this matters:* \"nobody\" and \"not everyone\" sound similar but are different regions. \"Nobody\" is the single region outside all three circles; \"not everyone\" is everything except the centre.",
    },
    {
      type: "quiz",
      id: "pr0-4-q1",
      variant: "concept",
      question: "A die is rolled. $A$ = \"even\" $= \\{2, 4, 6\\}$ and $B$ = \"greater than 3\" $= \\{4, 5, 6\\}$. What is the event \"$A$ or $B$\"?",
      options: [
        { text: "$\\{2, 4, 5, 6\\}$", correct: true, feedback: "The union keeps every outcome in at least one of them, including 4 and 6, which are in both." },
        { text: "$\\{2, 5\\}$", feedback: "That is \"exactly one\" of $A$, $B$. In probability, \"or\" includes the outcomes in both." },
        { text: "$\\{4, 6\\}$", feedback: "That is \"$A$ and $B$\", the intersection." },
        { text: "$\\{2, 4, 4, 5, 6, 6\\}$", feedback: "A set lists each element once. Joining the lists gives $\\{2, 4, 5, 6\\}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-4-q2",
      variant: "practice",
      question: "Which set describes \"neither $A$ nor $B$ occurs\"?",
      options: [
        { text: "$(A \\cup B)'$", correct: true, feedback: "Neither means outside both, which by De Morgan is $A' \\cap B' = (A \\cup B)'$." },
        { text: "$(A \\cap B)'$", feedback: "That is \"not both\", which still allows exactly one of them to happen." },
        { text: "$A' \\cup B'$", feedback: "That is \"at least one fails\", equal to $(A \\cap B)'$. Neither needs *both* to fail." },
        { text: "$A - B$", feedback: "That is \"$A$ but not $B$\", where $A$ does happen." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-4-q3",
      variant: "practice",
      question: "By De Morgan's law, the statement \"it is not true that both $A$ and $B$ occur\" is the same as:",
      options: [
        { text: "At least one of $A$, $B$ does not occur: $A' \\cup B'$.", correct: true, feedback: "$(A \\cap B)' = A' \\cup B'$. Missing at least one is enough to spoil \"both\"." },
        { text: "Neither $A$ nor $B$ occurs: $A' \\cap B'$.", feedback: "Too strong. Failing \"both\" only needs one of them to fail." },
        { text: "Exactly one of $A$, $B$ occurs.", feedback: "This leaves out the case where neither occurs, which also makes \"both\" false." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-4-q4",
      variant: "concept",
      question: "A die is rolled. $E_1 = \\{1, 2, 3\\}$ and $E_2 = \\{3, 4, 5, 6\\}$. Which is correct?",
      options: [
        { text: "They are exhaustive but not mutually exclusive.", correct: true, feedback: "Together they cover all six faces, but both contain 3." },
        { text: "They are mutually exclusive but not exhaustive.", feedback: "They overlap at 3, so they are not exclusive, and they do cover $S$." },
        { text: "They form a partition of $S$.", feedback: "A partition needs no overlap; 3 is in both." },
        { text: "They are neither exclusive nor exhaustive.", feedback: "Check the union: $\\{1,2,3\\} \\cup \\{3,4,5,6\\} = S$, so they are exhaustive." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-4-q5",
      variant: "practice",
      question: "Two dice are rolled. $A$ = \"first die shows 6\", $B$ = \"second die shows 6\". How many outcomes are in \"exactly one of $A$, $B$\"?",
      options: [
        { text: "10", correct: true, feedback: "$n(A \\cup B) = 11$, minus the one cell $(6,6)$ in both: $11 - 1 = 10$." },
        { text: "11", feedback: "That is \"at least one six\", which includes $(6,6)$. Exactly one excludes it." },
        { text: "12", feedback: "That counts $(6,6)$ twice and keeps it; it should appear zero times." },
        { text: "25", feedback: "That is \"neither\", $36 - 11$." },
      ],
      hint: "Shade row 6 and column 6, then remove the corner they share.",
    },
    {
      type: "quiz",
      id: "pr0-4-q6",
      variant: "practice",
      question: "For three events $A$, $B$, $C$, which set represents \"at least two of $A$, $B$, $C$ occur\"?",
      options: [
        {
          text: "$(A \\cap B) \\cup (B \\cap C) \\cup (C \\cap A)$",
          correct: true,
          feedback: "Any outcome with two or more successes lies in at least one pairwise intersection, and every outcome in a pairwise intersection has at least two successes.",
        },
        { text: "$A \\cap B \\cap C$", feedback: "That is all three. \"At least two\" also includes outcomes where exactly two occur." },
        { text: "$A \\cup B \\cup C$", feedback: "That is \"at least one\", which also includes outcomes where only one event occurs." },
        { text: "$(A \\cap B) \\cup C$", feedback: "Here $C$ alone is enough to be in the set, so an outcome with only $C$ would count." },
      ],
      hint: "An outcome with at least two successes must have some *pair* of events both happening.",
    },
    {
      type: "quiz",
      id: "pr0-4-q7",
      variant: "practice",
      question:
        "A student is picked from a class. $M$ = \"plays music\", $F$ = \"plays football\". Which set is the event \"plays music but not football\"?",
      options: [
        { text: "$M \\cap F'$", correct: true, feedback: "\"But not\" means \"and outside\": in $M$ and in the complement of $F$. This is $M - F$." },
        { text: "$M \\cup F'$", feedback: "That also includes students who play neither, since they are in $F'$." },
        { text: "$M' \\cap F$", feedback: "That is the reverse: plays football but not music." },
        { text: "$(M \\cap F)'$", feedback: "That is \"not both\", which also includes students who play only football, or neither." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-4-q8",
      variant: "practice",
      question: "A number is picked from 1 to 50. How many outcomes are in the event \"a multiple of 4 or a multiple of 6\"?",
      options: [
        {
          text: "16",
          correct: true,
          feedback: "Multiples of 4: 12. Multiples of 6: 8. Both means multiples of 12: $12, 24, 36, 48$, so 4. $12 + 8 - 4 = 16$.",
        },
        { text: "20", feedback: "That adds 12 and 8 without removing the overlap, so $12, 24, 36, 48$ are counted twice." },
        { text: "34", feedback: "That is \"neither\", $50 - 16$." },
        { text: "18", feedback: "That removes only the multiples of 24 (24 and 48). A number is a multiple of both 4 and 6 when it is a multiple of 12, their LCM, not of 24." },
      ],
      hint: "Find the overlap first: which numbers are multiples of both 4 and 6?",
    },
    {
      type: "quiz",
      id: "pr0-4-q9",
      variant: "practice",
      question: "Two dice are rolled. Which pair of events is mutually exclusive?",
      options: [
        {
          text: "\"The sum is 7\" and \"doubles\"",
          correct: true,
          feedback: "A double $(k, k)$ has sum $2k$, which is even, so it can never be 7. No outcome is in both.",
        },
        { text: "\"The sum is even\" and \"doubles\"", feedback: "Every double has an even sum, so the doubles lie *inside* the even-sum event." },
        { text: "\"The sum is more than 9\" and \"at least one die shows 6\"", feedback: "$(4,6)$ is in both: sum 10, and a 6 is showing." },
        { text: "\"The sum is prime\" and \"the first die shows 1\"", feedback: "$(1,1)$ has sum 2, which is prime, and its first die is 1." },
      ],
      hint: "To rule a pair out, one shared outcome is enough.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "counting-outcomes",
  title: "0.5 · Counting Outcomes Without Listing",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A grid of 36 cells can be listed. A hand of 5 cards from a deck cannot: there are over two and a half million hands. From here on, most sample spaces are sized by **counting rules** rather than by writing them out. This lesson is a quick toolkit; the Permutations & Combinations course builds each tool from scratch.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The fundamental counting principle",
      content:
        "If a task is done in stages, with $m$ ways to do the first stage and, **for each of those**, $n$ ways to do the second, then the whole task can be done in $m \\times n$ ways. More stages multiply in the same way.",
    },
    {
      type: "text",
      content:
        "This is just the tree from Lesson 0.2, counted instead of drawn: every node at one level sprouts the same number of branches, so the leaves multiply. Two dice: $6 \\times 6 = 36$. $n$ coins: $2^n$. Coin then die: $2 \\times 6 = 12$.",
    },
    {
      type: "text",
      content:
        "Two special cases come up so often that they have their own symbols. Choose $r$ objects from $n$ distinct ones:\n\n**Order matters** (arrangements, first/second/third, PINs, seatings): $n$ choices for the first slot, $n - 1$ for the second, and so on down to $n - r + 1$.",
    },
    { type: "math", latex: "{}^{n}P_{r} = n(n-1)(n-2)\\cdots(n-r+1) = \\frac{n!}{(n-r)!}" },
    {
      type: "text",
      content:
        "**Order does not matter** (hands, committees, selections): every unordered group of $r$ objects was counted $r!$ times in ${}^nP_r$, once for each way of ordering it. See it before dividing it out: below are all the ordered picks of 2 letters from A, B, C, D.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "B", "C", "D"],
        r: 2,
        groupBy: "selection",
        showSlots: true,
        caption:
          "All 12 ordered picks of 2 from 4. Same-coloured rows are the same selection: each unordered pair appears 2! = 2 times, so there are 12 / 2 = 6 selections.",
      },
    },
    {
      type: "text",
      content:
        "Every selection shows up exactly $r!$ times in the ordered list, so dividing ${}^nP_r$ by $r!$ counts each selection once.",
    },
    { type: "math", latex: "{}^{n}C_{r} = \\binom{n}{r} = \\frac{{}^{n}P_{r}}{r!} = \\frac{n!}{r!\\,(n-r)!}" },
    {
      type: "callout",
      variant: "tip",
      title: "Which one?",
      content:
        "Ask: **if I swap two of the chosen objects, do I get a different outcome?** Swapping the gold and silver medallists changes the result, so use ${}^nP_r$. Swapping two members of a committee changes nothing, so use ${}^nC_r$.",
    },
    {
      type: "text",
      content:
        "Cards appear in a large share of probability problems, and the questions assume you know the deck's layout.",
    },
    {
      type: "table",
      headers: ["Feature", "Count", "Details"],
      rows: [
        ["Whole deck", "52", "4 suits × 13 ranks"],
        ["Suits", "4 of 13 cards each", "♠ spades, ♣ clubs (black); ♥ hearts, ♦ diamonds (red)"],
        ["Ranks", "13 of 4 cards each", "A, 2, 3, …, 10, J, Q, K"],
        ["Red / black cards", "26 / 26", "two suits of each colour"],
        ["Face (court) cards", "12", "J, Q, K in each of 4 suits"],
        ["Aces", "4", "one per suit"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1 — poker hands.** How many 5-card hands can be dealt from a deck, and how many of them are all hearts?\n\n**Step 1. Order?** A hand is the same hand however it was dealt, so use combinations.\n\n**Step 2. Sample space.** $n(S) = \\binom{52}{5} = \\frac{52 \\cdot 51 \\cdot 50 \\cdot 49 \\cdot 48}{5!} = \\frac{311{,}875{,}200}{120} = 2{,}598{,}960$.\n\n**Step 3. Event.** All five from the 13 hearts: $n(E) = \\binom{13}{5} = \\frac{13 \\cdot 12 \\cdot 11 \\cdot 10 \\cdot 9}{120} = 1287$.\n\nBoth counts are unordered, so they are consistent with each other.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — a committee with a condition.** A committee of 3 is chosen from 6 men and 4 women. How many committees are possible, and how many have exactly 2 women?\n\n**Step 1.** $n(S) = \\binom{10}{3} = \\frac{10 \\cdot 9 \\cdot 8}{6} = 120$.\n\n**Step 2. Split the choice into stages.** Choose the 2 women from 4, *then* the 1 man from 6. Stages multiply: $n(E) = \\binom{4}{2} \\times \\binom{6}{1} = 6 \\times 6 = 36$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — letters.** How many arrangements does the word EQUATION have, and in how many are all the vowels together?\n\n**Step 1.** EQUATION has 8 different letters, so it has $8! = 40{,}320$ arrangements.\n\n**Step 2. Glue the vowels.** The vowels E, U, A, I, O become one block. That leaves 4 units to arrange: the block, Q, T, N, giving $4! = 24$ ways.\n\n**Step 3. Arrange inside the block.** The 5 vowels can be ordered in $5! = 120$ ways.\n\n**Step 4.** $n(E) = 4! \\times 5! = 24 \\times 120 = 2880$.\n\nIf letters repeat, divide out the swaps that change nothing. BANANA has $\\frac{6!}{3!\\,2!} = \\frac{720}{12} = 60$ distinct arrangements (three A's, two N's).",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — a number plate.** A college issues parking stickers with 2 letters followed by 3 digits, like KV-407. Letters may repeat, but the 3 digits must all be different. How many stickers are possible?\n\n**Step 1. One slot, one stage.** There are 5 slots, filled left to right. *Why this step:* the counting principle only needs the number of options at each stage, given the earlier stages.\n\n**Step 2. Letters.** Repeats allowed, so each letter slot has 26 options: $26 \\times 26 = 676$.\n\n**Step 3. Digits.** No repeats, so the options shrink: $10 \\times 9 \\times 8 = 720$ (that is ${}^{10}P_3$; order matters because 407 and 704 are different stickers).",
    },
    { type: "math", latex: "n(S) = 26 \\times 26 \\times 10 \\times 9 \\times 8 = 676 \\times 720 = 486{,}720" },
    {
      type: "text",
      content:
        "**Worked example 5 — \"at least\" by cases (NCERT style).** A group of 5 is chosen from 7 men and 6 women. In how many ways can the group contain at least 3 men?\n\n**Step 1. Split \"at least 3 men\" into exact cases.** With 5 people the group is 3M + 2W, 4M + 1W or 5M. *Why this step:* each case fixes exactly how many of each kind to choose, so each can be counted by stages.\n\n**Step 2. Count each case with stages (multiply).**\n• 3 men, 2 women: $\\binom{7}{3}\\binom{6}{2} = 35 \\times 15 = 525$.\n• 4 men, 1 woman: $\\binom{7}{4}\\binom{6}{1} = 35 \\times 6 = 210$.\n• 5 men: $\\binom{7}{5} = 21$.\n\n**Step 3. Combine the cases (add).** *Why add here:* the cases are mutually exclusive (a group cannot have exactly 3 men and exactly 4 men), so no group is counted twice.",
    },
    { type: "math", latex: "n(E) = 525 + 210 + 21 = 756" },
    {
      type: "callout",
      variant: "warning",
      title: "The \"pick 3 men first, then anyone\" trap",
      content:
        "A tempting shortcut is $\\binom{7}{3} \\times \\binom{10}{2} = 35 \\times 45 = 1575$: choose 3 guaranteed men, then any 2 of the remaining 10 people. It overcounts. A group with 4 men is produced four times, once for each choice of which 3 men were the \"guaranteed\" ones. Split into exact cases instead.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 — \"at least one\" by the complement (JEE style).** How many 5-card hands contain at least one ace?\n\n**Step 1. Notice the cases are many.** One, two, three or four aces: four separate counts. *Why switch:* the complement \"no ace\" is a single case, and $E = S - E'$ from Lesson 0.4 turns it into the answer.\n\n**Step 2. Count the complement.** No ace means all 5 cards from the 48 non-aces: $\\binom{48}{5} = \\frac{48 \\cdot 47 \\cdot 46 \\cdot 45 \\cdot 44}{120} = 1{,}712{,}304$.\n\n**Step 3. Subtract from the whole.**",
    },
    { type: "math", latex: "n(E) = \\binom{52}{5} - \\binom{48}{5} = 2{,}598{,}960 - 1{,}712{,}304 = 886{,}656" },
    {
      type: "text",
      content:
        "*Check by cases:* $4\\binom{48}{4} + 6\\binom{48}{3} + 4\\binom{48}{2} + 1 \\cdot 48 = 778{,}320 + 103{,}776 + 4{,}512 + 48 = 886{,}656$. Same answer, four times the work. **Whenever you read \"at least one\", try the complement first.**",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Never mix ordered and unordered",
      content:
        "Draw 2 cards; how often are both aces?\n**All ordered:** $n(S) = 52 \\times 51 = 2652$ and $n(E) = 4 \\times 3 = 12$. The ratio is $\\frac{12}{2652} = \\frac{1}{221}$.\n**All unordered:** $n(S) = \\binom{52}{2} = 1326$ and $n(E) = \\binom{4}{2} = 6$. The ratio is $\\frac{6}{1326} = \\frac{1}{221}$.\n**Mixed:** $\\frac{\\binom{4}{2}}{52 \\times 51} = \\frac{6}{2652} = \\frac{1}{442}$, which is **wrong** by a factor of 2.\nEither viewpoint works. The event and the sample space must be counted the same way.",
    },
    {
      type: "text",
      content:
        "The ratio $\\frac{n(E)}{n(S)}$ is exactly how Chapter 1 will define a probability when outcomes are equally likely. That is why sizing $S$ and $E$ consistently matters so much.",
    },
    {
      type: "quiz",
      id: "pr0-5-q1",
      variant: "practice",
      question: "Two cards are drawn together from a standard deck. How many outcomes are in the sample space?",
      options: [
        { text: "$1326$", correct: true, feedback: "Drawn together means unordered: $\\binom{52}{2} = \\frac{52 \\times 51}{2} = 1326$." },
        { text: "$2652$", feedback: "That is ${}^{52}P_2$, which counts each pair twice. Cards drawn together have no order." },
        { text: "$2704$", feedback: "That is $52^2$, which allows the same card twice." },
        { text: "$104$", feedback: "That adds the two stages. Stages multiply." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-5-q2",
      variant: "concept",
      question:
        "A student counts \"two aces from two cards\" as $\\binom{4}{2} = 6$ and the sample space as $52 \\times 51 = 2652$. What is wrong?",
      options: [
        {
          text: "The event is counted unordered but the sample space ordered, so the ratio is off by a factor of $2! = 2$.",
          correct: true,
          feedback: "Use $\\frac{12}{2652}$ (both ordered) or $\\frac{6}{1326}$ (both unordered). Each gives $\\frac{1}{221}$.",
        },
        {
          text: "Nothing, because both counts are correct numbers.",
          feedback: "Each count is correct on its own, but they count different kinds of outcomes and cannot be compared.",
        },
        {
          text: "The sample space should be $52 \\times 52$.",
          feedback: "A card cannot be drawn twice, so the second stage has 51 options.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pr0-5-q3",
      variant: "practice",
      question: "A team of 4 is chosen from 7 boys and 5 girls. In how many ways can the team contain exactly 2 girls?",
      options: [
        { text: "$210$", correct: true, feedback: "$\\binom{5}{2} \\times \\binom{7}{2} = 10 \\times 21 = 210$." },
        { text: "$31$", feedback: "That adds $10 + 21$. The girls and the boys are chosen in stages, so multiply." },
        { text: "$495$", feedback: "That is $\\binom{12}{4}$, all teams with no condition." },
        { text: "$840$", feedback: "That multiplies ordered counts (${}^5P_2 \\times {}^7P_2 = 20 \\times 42$). Team members have no order." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-5-q4",
      variant: "practice",
      question: "How many 3-digit PINs (digits 0–9) have all digits different?",
      options: [
        { text: "$720$", correct: true, feedback: "Order matters in a PIN: ${}^{10}P_3 = 10 \\times 9 \\times 8 = 720$." },
        { text: "$120$", feedback: "That is $\\binom{10}{3}$. PIN 123 and PIN 321 are different, so order matters." },
        { text: "$1000$", feedback: "That allows repeated digits, $10^3$." },
        { text: "$648$", feedback: "That forbids a leading 0, as for 3-digit *numbers*. A PIN may start with 0." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-5-q5",
      variant: "practice",
      question: "How many 5-card hands contain all four aces?",
      options: [
        { text: "$48$", correct: true, feedback: "The four aces are forced ($\\binom{4}{4} = 1$ way); the fifth card is any of the other 48." },
        { text: "$1$", feedback: "The aces are fixed, but the fifth card still has 48 choices." },
        { text: "$52$", feedback: "The fifth card cannot be one of the four aces already in the hand." },
        { text: "$240$", feedback: "That multiplies by $5$ positions, but a hand has no positions." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-5-q6",
      variant: "practice",
      question: "A committee of 4 is chosen from 5 men and 4 women. In how many ways can it contain at least 3 women?",
      options: [
        {
          text: "$21$",
          correct: true,
          feedback: "Exactly 3 women: $\\binom{4}{3}\\binom{5}{1} = 4 \\times 5 = 20$. All 4 women: $\\binom{4}{4} = 1$. Add the exclusive cases: $21$.",
        },
        { text: "$20$", feedback: "That is exactly 3 women. \"At least 3\" also includes the all-women committee." },
        { text: "$24$", feedback: "That is $\\binom{4}{3} \\times 6$: 3 guaranteed women, then anyone. The all-women committee gets counted 4 times. Split into exact cases." },
        { text: "$126$", feedback: "That is $\\binom{9}{4}$, every committee with no condition." },
      ],
      hint: "Split \"at least 3 women\" into \"exactly 3\" and \"exactly 4\".",
    },
    {
      type: "quiz",
      id: "pr0-5-q7",
      variant: "practice",
      question: "How many 3-digit numbers (100 to 999) contain at least one digit 7?",
      options: [
        {
          text: "$252$",
          correct: true,
          feedback: "Complement: no 7 at all gives $8 \\times 9 \\times 9 = 648$ (first digit not 0 or 7). So $900 - 648 = 252$.",
        },
        { text: "$171$", feedback: "That uses $9 \\times 9 \\times 9 = 729$ for \"no 7\". The first digit cannot be 0 *or* 7, leaving only 8 options." },
        { text: "$280$", feedback: "That adds \"7 first\" (100), \"7 second\" (90) and \"7 third\" (90), counting numbers such as 777 more than once." },
        { text: "$648$", feedback: "That is the complement, numbers with no 7. Subtract it from 900." },
      ],
      hint: "\"At least one\": count the numbers with no 7 first.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.6 · Chapter 0 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Set up the sample space, name the event, count both. Each question below tests one of those three steps on a setup you have not seen in exactly this form.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in five lines",
      content:
        "1. Single outcomes are unpredictable; relative frequencies settle. The coin has no memory.\n2. A sample space lists every outcome at a useful level of detail, with ordered pairs kept distinct (HT ≠ TH).\n3. An event is a subset of $S$; it occurs when the outcome lands inside it.\n4. or $= \\cup$ (includes both), and $= \\cap$, not $=$ complement; $(A \\cup B)' = A' \\cap B'$ and $(A \\cap B)' = A' \\cup B'$.\n5. Size large sample spaces with the multiplication principle, ${}^nP_r$ and ${}^nC_r$, counting $S$ and $E$ the same way.",
    },
    {
      type: "text",
      content:
        "**Worked exam problem — all three steps in one.** A bag holds 5 red and 3 blue balls. Three are drawn at once. Let $A$ = \"all three the same colour\" and $B$ = \"at least two red\". Find $n(S)$, $n(A)$, $n(B)$, $n(A \\cap B)$ and $n(A \\cup B)$.\n\n**Step 1. Sample space.** Drawn at once, so unordered: $n(S) = \\binom{8}{3} = 56$. *Why:* the event counts below are also unordered, and the two must match.\n\n**Step 2. $A$ by cases.** All red: $\\binom{5}{3} = 10$. All blue: $\\binom{3}{3} = 1$. The cases cannot overlap, so $n(A) = 11$.\n\n**Step 3. $B$ by cases.** Exactly 2 red: $\\binom{5}{2}\\binom{3}{1} = 10 \\times 3 = 30$. Exactly 3 red: $10$. So $n(B) = 40$.\n\n**Step 4. The overlap.** Same colour *and* at least two red can only mean all red: $n(A \\cap B) = 10$.\n\n**Step 5. Union, correcting the double count.**",
    },
    { type: "math", latex: "n(A \\cup B) = 11 + 40 - 10 = 41" },
    {
      type: "text",
      content:
        "*Check with the complement:* outside $A \\cup B$ means mixed colours with fewer than two red, which is exactly 1 red and 2 blue: $\\binom{5}{1}\\binom{3}{2} = 5 \\times 3 = 15$. And $56 - 41 = 15$. Two independent routes agree, so the answer is safe.",
    },
    {
      type: "quiz",
      id: "pr0-6-q1",
      variant: "mastery",
      question: "A coin is tossed three times and then a die is rolled. How many outcomes are in the sample space?",
      options: [
        { text: "$48$", correct: true, feedback: "$2^3 \\times 6 = 8 \\times 6 = 48$." },
        { text: "$12$", feedback: "That is one coin and one die. Each extra coin doubles the count." },
        { text: "$36$", feedback: "That is $6 \\times 6$, two dice. Here there are three coins and one die." },
        { text: "$14$", feedback: "That adds the coin outcomes to the die outcomes ($8 + 6$). Stages multiply." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-6-q2",
      variant: "mastery",
      question: "Two dice are rolled. How many outcomes give a prime sum?",
      options: [
        { text: "$15$", correct: true, feedback: "Prime sums are 2, 3, 5, 7, 11 with $1 + 2 + 4 + 6 + 2 = 15$ cells." },
        { text: "$5$", feedback: "That counts the prime *values*, not the cells that produce them." },
        { text: "$14$", feedback: "Check sum 2: $(1,1)$ counts, and 2 is prime." },
        { text: "$19$", feedback: "That counts sum 9 as prime, but $9 = 3 \\times 3$." },
      ],
      hint: "List the primes between 2 and 12 first, then count the cells on each anti-diagonal.",
    },
    {
      type: "quiz",
      id: "pr0-6-q3",
      variant: "mastery",
      question: "Two dice are rolled. Which is more likely: a sum of 11 or a sum of 12?",
      options: [
        { text: "A sum of 11: it has 2 outcomes, $(5,6)$ and $(6,5)$, against 1 for sum 12.", correct: true, feedback: "The same distinction that corrects d'Alembert: $(5,6)$ and $(6,5)$ are different outcomes." },
        { text: "They are equally likely, since each needs one specific pair of numbers.", feedback: "This is d'Alembert's error again. $\\{5,6\\}$ can land in two orders; $\\{6,6\\}$ in only one." },
        { text: "A sum of 12, because 6 is the most likely face.", feedback: "On a fair die every face is equally likely." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-6-q4",
      variant: "mastery",
      question: "For three events $A$, $B$, $C$, which set represents \"at least one of them does **not** occur\"?",
      options: [
        { text: "$(A \\cap B \\cap C)'$", correct: true, feedback: "At least one failing is the same as \"not all three\", and by De Morgan $A' \\cup B' \\cup C' = (A \\cap B \\cap C)'$." },
        { text: "$(A \\cup B \\cup C)'$", feedback: "That is \"none of them occurs\", which requires all three to fail." },
        { text: "$A' \\cap B' \\cap C'$", feedback: "Also \"none occurs\". At least one failing is weaker than all failing." },
        { text: "$A \\cup B \\cup C$", feedback: "That is \"at least one occurs\", not \"at least one fails\"." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-6-q5",
      variant: "mastery",
      question: "Which set represents \"exactly one of $A$ and $B$ occurs\"?",
      options: [
        { text: "$(A \\cap B') \\cup (A' \\cap B)$", correct: true, feedback: "Either $A$ without $B$, or $B$ without $A$. The two pieces are mutually exclusive." },
        { text: "$A \\cup B$", feedback: "The union also contains $A \\cap B$, where both occur." },
        { text: "$(A \\cup B)'$", feedback: "That is \"neither occurs\"." },
        { text: "$A' \\cup B'$", feedback: "That is \"not both\", which also includes \"neither\"." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-6-q6",
      variant: "mastery",
      question: "A card is drawn from a deck. Which pair of events is mutually exclusive **and** exhaustive?",
      options: [
        { text: "\"Red card\" and \"black card\"", correct: true, feedback: "Every card is exactly one colour, so the two events partition the deck." },
        { text: "\"Heart\" and \"face card\"", feedback: "Not exclusive (the J, Q, K of hearts are in both) and not exhaustive (the 2 of spades is in neither)." },
        { text: "\"Heart\" and \"spade\"", feedback: "Exclusive, but not exhaustive: clubs and diamonds are left out." },
        { text: "\"Red card\" and \"not an ace\"", feedback: "Neither: the ace of spades is in neither event, and the 5 of hearts is in both." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-6-q7",
      variant: "mastery",
      question: "A box holds 12 bulbs, 4 of them defective. Three bulbs are taken at once. What are $n(S)$ and $n(E)$ for $E$ = \"exactly one defective\"?",
      options: [
        { text: "$n(S) = 220$, $n(E) = 112$", correct: true, feedback: "$\\binom{12}{3} = 220$; $\\binom{4}{1}\\binom{8}{2} = 4 \\times 28 = 112$." },
        { text: "$n(S) = 1320$, $n(E) = 112$", feedback: "$1320 = {}^{12}P_3$ is ordered, but the event was counted unordered. Keep them consistent." },
        { text: "$n(S) = 220$, $n(E) = 32$", feedback: "That is $4 \\times 8$: only one good bulb. Two of the three bulbs must be good, $\\binom{8}{2} = 28$." },
        { text: "$n(S) = 220$, $n(E) = 4$", feedback: "That chooses the defective bulb but forgets to choose the two good ones." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-6-q8",
      variant: "mastery",
      question: "A roulette wheel has come up red eight times running. A friend says black is now more likely. What is the best reply?",
      options: [
        {
          text: "Each spin is independent of the last; the long-run proportion settles by dilution, not by compensation.",
          correct: true,
          feedback: "The wheel does not know the history. The gambler's fallacy mistakes stable long-run proportions for short-run correction.",
        },
        {
          text: "They are right: over time reds and blacks must even out, so black has to catch up.",
          feedback: "Only the *proportion* evens out, and it does so by being swamped by many later spins.",
        },
        {
          text: "Red is now more likely, since the wheel is clearly biased.",
          feedback: "Eight reds is not strong evidence of bias; runs like this happen often in long sequences of spins.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pr0-6-q9",
      variant: "mastery",
      question: "Three coins are tossed. Which set is the event \"more heads than tails\"?",
      options: [
        {
          text: "$\\{\\text{HHH}, \\text{HHT}, \\text{HTH}, \\text{THH}\\}$",
          correct: true,
          feedback: "More heads than tails with three coins means 2 or 3 heads: three outcomes with exactly two heads, plus HHH.",
        },
        { text: "$\\{\\text{HHT}, \\text{HTH}, \\text{THH}\\}$", feedback: "This leaves out HHH, which also has more heads than tails." },
        { text: "$\\{\\text{HHH}, \\text{HHT}\\}$", feedback: "This lists outcomes as if order does not matter, missing HTH and THH." },
        { text: "$\\{\\text{HH}, \\text{HHH}\\}$", feedback: "HH is not an outcome of three tosses; every outcome has three letters." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-6-q10",
      variant: "mastery",
      question: "Two dice are rolled. How many outcomes are in the event \"the sum is even but the roll is not a double\"?",
      options: [
        {
          text: "$12$",
          correct: true,
          feedback: "Even sums fill 18 cells, and all 6 doubles have even sums, so $18 - 6 = 12$. In set form this is $E - D = E \\cap D'$.",
        },
        { text: "$18$", feedback: "That is every even sum, including the 6 doubles that the event excludes." },
        { text: "$6$", feedback: "That counts the doubles only, the part being removed." },
        { text: "$24$", feedback: "That adds the 6 doubles to the 18 even sums ($18 + 6$). \"But not\" is a difference: remove the doubles, do not add them." },
      ],
      hint: "Count the even-sum cells first, then remove the ones on the main diagonal.",
    },
    {
      type: "quiz",
      id: "pr0-6-q11",
      variant: "mastery",
      question: "A box holds 10 pens: 3 red and 7 black. Four pens are taken at once. How many selections contain at least one red pen?",
      options: [
        { text: "$175$", correct: true, feedback: "Complement: no red means 4 from the 7 black, $\\binom{7}{4} = 35$. So $\\binom{10}{4} - 35 = 210 - 35 = 175$." },
        { text: "$252$", feedback: "That is $3 \\times \\binom{9}{3}$: one guaranteed red, then any 3. Selections with 2 or 3 red pens get counted more than once." },
        { text: "$105$", feedback: "That is exactly one red, $3 \\times \\binom{7}{3}$. \"At least one\" also includes 2 or 3 red." },
        { text: "$35$", feedback: "That is the complement, no red pen at all. Subtract it from 210." },
      ],
    },
    {
      type: "quiz",
      id: "pr0-6-q12",
      variant: "mastery",
      question: "A number is picked from 1 to 100. How many outcomes are in the event \"a multiple of 2 or a multiple of 5\"?",
      options: [
        { text: "$60$", correct: true, feedback: "$50 + 20 - 10 = 60$. The multiples of 10 are in both events and must be counted once." },
        { text: "$70$", feedback: "That adds 50 and 20 and counts the 10 multiples of 10 twice." },
        { text: "$40$", feedback: "That is \"neither\", $100 - 60$." },
        { text: "$10$", feedback: "That is the intersection, multiples of 10. \"Or\" is the union." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "You can now write down any sample space and name any event precisely. Chapter 1 attaches numbers to events, first by counting ($\\frac{n(E)}{n(S)}$), then by frequency, and then from three axioms that every other rule follows from.",
    },
  ]),
};

export const probabilityChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
