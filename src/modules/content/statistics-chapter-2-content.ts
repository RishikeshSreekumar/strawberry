import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Statistics Chapter 2 — Measures of Spread.
 * Two data sets can share a mean and look nothing alike. Starting from
 * "typical distance from the centre", build range, quartiles and IQR, mean
 * deviation, variance and SD (raw, frequency and grouped), then see how
 * spread behaves under shift and scale and compare it with the CV.
 * Convention throughout: variance and SD divide by n.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

/** Two batsmen, ten innings each, both averaging exactly 40. */
const BATSMAN_A = [35, 38, 40, 42, 45, 36, 41, 39, 44, 40];
const BATSMAN_B = [0, 5, 12, 80, 95, 2, 110, 60, 8, 28];

/** 40 values whose class frequencies (width 10 from 0) are 5, 8, 12, 10, 5. */
const GROUPED_40 = [
  2, 4, 6, 7, 9,
  11, 12, 13, 14, 15, 16, 17, 19,
  20, 21, 22, 23, 24, 25, 25, 26, 27, 27, 28, 29,
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
  41, 43, 45, 46, 48,
];

const lesson01: LessonSeed = {
  slug: "same-centre-different-story",
  title: "2.1 · Same Centre, Different Story",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/st-2-measures-of-spread.mp4",
      poster: "/videos/st-2-measures-of-spread.jpg",
      title: "Chapter 2 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "A selector has one batting slot left and two batsmen to choose from. Both have played ten innings. Both average exactly **40 runs**. On the summary sheet they are identical. Should the selector toss a coin?",
    },
    {
      type: "table",
      headers: ["Innings", "Batsman A", "Batsman B"],
      rows: [
        ...BATSMAN_A.map((a, i) => [String(i + 1), String(a), String(BATSMAN_B[i])]),
        ["**Mean**", "**40**", "**40**"],
      ],
    },
    {
      type: "text",
      content:
        "Check the means yourself: each row adds to 400, and $400 \\div 10 = 40$. Yet the two careers could hardly be more different. A turns up with 35 to 45 almost every time. B is either out for next to nothing or scores a big hundred. Put both on the same number line and the difference stops being a matter of opinion.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: BATSMAN_A,
        compareData: BATSMAN_B,
        labels: { data: "Batsman A", compare: "Batsman B" },
        range: { min: 0, max: 120 },
        xLabel: "Runs in an innings",
        view: "dotplot",
        views: ["dotplot", "boxplot"],
        stats: ["mean", "median", "range"],
        caption:
          "Both bands balance at 40, but A's dots huddle around it while B's are flung across the whole axis. Drag any of B's dots and watch the mean move while the scatter stays.",
      },
    },
    {
      type: "text",
      content:
        "The mean answers *where is the data?* It says nothing about *how far apart are the values?* That second question needs a second number, a **measure of spread** (also called dispersion). A full summary of a data set always carries both: a centre and a spread.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Measure of spread",
      content:
        "A single number that says how widely the values are scattered. It is 0 when every value is the same and grows as the values move apart. The whole chapter builds one idea: **the typical distance of a value from the centre.**",
    },
    {
      type: "text",
      content:
        "Here is a first taste of that idea. For each innings, measure how far the score landed from 40, ignoring direction, and average those distances:",
    },
    {
      type: "table",
      headers: ["", "Distances from 40", "Total", "Average distance"],
      rows: [
        ["A", "5, 2, 0, 2, 5, 4, 1, 1, 4, 0", "24", "2.4 runs"],
        ["B", "40, 35, 28, 40, 55, 38, 70, 20, 32, 12", "370", "37 runs"],
      ],
    },
    {
      type: "text",
      content:
        "A typical innings from A lands about 2.4 runs from his average; one from B lands about 37 runs away. That is the difference the selector cares about, captured in a number. (This 'average distance' has a name, mean deviation, and gets a full lesson in 2.3.)",
    },
    {
      type: "quiz",
      id: "st2-1-q1",
      variant: "concept",
      question: "Two classes both have a mean score of 62 on the same test. What can you conclude about how the scores are spread?",
      options: [
        {
          text: "Nothing yet: equal means say nothing about spread, so you need a measure of spread for each class.",
          correct: true,
          feedback: "Exactly the batsmen story. The mean fixes the balance point, not how far the values sit from it.",
        },
        { text: "The two classes have similar spreads, since their means match.", feedback: "Batsmen A and B share a mean of 40 and have wildly different spreads. Equal centres do not force equal spreads." },
        { text: "The two classes must contain the same set of scores.", feedback: "Many different data sets share a mean: {60, 64} and {20, 104} both average 62." },
        { text: "The class with more students has the larger spread.", feedback: "Class size does not decide spread. A big class can be tightly bunched." },
      ],
    },
    {
      type: "text",
      content:
        "**The simplest spread: the range.** Take the gap between the two extremes.",
    },
    { type: "math", latex: "\\text{Range} = x_{\\max} - x_{\\min}" },
    {
      type: "text",
      content:
        "**Worked example.** Range of each batsman.\n\n**Step 1.** A: largest 45, smallest 35. Range $= 45 - 35 = 10$ runs.\n**Step 2.** B: largest 110, smallest 0. Range $= 110 - 0 = 110$ runs.\n**Step 3.** Interpret: B's range is eleven times A's, which matches the picture.\n\nThe range has the same units as the data, is quick to compute, and is useful for things like daily temperature swings or quality checks on a production line.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (routine): the coefficient of range.** The range carries units, so a 13 °C range cannot be compared fairly with a 10-run range. Dividing by the sum of the extremes gives a unit-free version:",
    },
    { type: "math", latex: "\\text{Coefficient of range} = \\frac{x_{\\max} - x_{\\min}}{x_{\\max} + x_{\\min}}" },
    {
      type: "text",
      content:
        "Maximum temperatures (°C) in one week: 18, 22, 25, 31, 27, 20, 24.\n\n**Step 1.** Largest 31, smallest 18. *Why:* the range needs only the extremes, so scan for them; no full sort is needed.\n**Step 2.** Range $= 31 - 18 = 13$ °C.\n**Step 3.** Coefficient of range $= \\frac{13}{31 + 18} = \\frac{13}{49} \\approx 0.27$. *Why divide:* °C over °C cancels the units, so this number can be set beside the coefficient of any other data set.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (application): quality control.** Two machines cut bolts meant to be 50 mm long. Five bolts from each (mm):\nMachine P: 49.8, 50.1, 50.0, 49.9, 50.2\nMachine Q: 49.5, 50.4, 50.0, 49.7, 50.4\n\n**Step 1. Check the centres.** Both lists add to 250.0, so both machines average exactly 50.0 mm. *Why check:* if the means differed, 'which machine is better' would partly be a question of aim, not of consistency.\n**Step 2. Ranges.** P: $50.2 - 49.8 = 0.4$ mm. Q: $50.4 - 49.5 = 0.9$ mm.\n**Step 3. Decide.** Both are on target, but Q's bolts wander more than twice as far. With a tolerance of $50 \\pm 0.3$ mm, every P bolt passes while three of Q's five (49.5, 50.4, 50.4) are rejected.",
    },
    {
      type: "quiz",
      id: "st2-1-q5",
      variant: "practice",
      question: "Find the coefficient of range of 12, 18, 30, 25, 20.",
      options: [
        { text: "$\\frac{3}{7} \\approx 0.43$", correct: true, feedback: "$\\frac{30 - 12}{30 + 12} = \\frac{18}{42} = \\frac37$." },
        { text: "18", feedback: "18 is the range, which still carries units. The coefficient divides it by $x_{\\max} + x_{\\min} = 42$." },
        { text: "0.6", feedback: "That is $\\frac{18}{30}$, dividing by the maximum only. The denominator is $x_{\\max} + x_{\\min}$." },
        { text: "$\\frac{7}{3} \\approx 2.33$", feedback: "Upside down. The difference of the extremes goes on top, the sum below, so the coefficient is always between 0 and 1 for positive data." },
      ],
      hint: "$\\frac{x_{\\max} - x_{\\min}}{x_{\\max} + x_{\\min}}$",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style).** A data set has smallest value 15 and range 20. Each value $x$ is replaced by $y = 4 - 3x$. Find the new largest value, smallest value and range.\n\n**Step 1.** Original largest value $= 15 + 20 = 35$.\n**Step 2. Transform both extremes.** $x = 15$ gives $y = 4 - 45 = -41$; $x = 35$ gives $y = 4 - 105 = -101$.\n**Step 3. Watch the roles swap.** *Why:* multiplying by a negative number reverses the order, so the old smallest value becomes the new largest. New largest $= -41$, new smallest $= -101$.\n**Step 4.** New range $= -41 - (-101) = 60 = |-3| \\times 20$. The $+4$ slid every value without changing any gap; the factor $-3$ stretched every gap threefold (and flipped it). Lesson 2.6 shows that every measure of spread behaves this way.",
    },
    {
      type: "quiz",
      id: "st2-1-q6",
      variant: "practice",
      question: "Data $x$ has minimum 3 and maximum 11. What is the range of $y = 5 - 2x$?",
      options: [
        { text: "16", correct: true, feedback: "The extremes map to $5 - 6 = -1$ and $5 - 22 = -17$. Range $= -1 - (-17) = 16 = 2 \\times 8$." },
        { text: "−16", feedback: "A range is largest minus smallest, never negative. After the flip, $-1$ is the largest value and $-17$ the smallest." },
        { text: "8", feedback: "8 is the range of $x$. Multiplying by $-2$ doubles every gap." },
        { text: "21", feedback: "The $+5$ shifts every value equally and cannot change the range. Only the factor $|-2|$ matters: $2 \\times 8$." },
      ],
      hint: "Transform the two extremes, then take largest minus smallest.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The range is fragile",
      content:
        "The range uses exactly two values, the most extreme ones, and ignores everything in between. One unusual value decides it. Heights of six students: 150, 152, 153, 155, 156, 158 cm give a range of 8 cm. Add a seventh, very tall student at 190 cm and the range jumps to 40 cm, even though the original six values have not moved.",
    },
    {
      type: "text",
      content:
        "Try it in the builder above: drag A's highest dot out to 100. A's range balloons from 10 to 65, but the other nine innings are exactly as consistent as before. A good measure of spread should listen to every value, not just the two loudest. The rest of the chapter builds such measures.",
    },
    {
      type: "quiz",
      id: "st2-1-q2",
      variant: "practice",
      question: "What is the range of 12, 7, 19, 3, 15?",
      options: [
        { text: "16", correct: true, feedback: "Largest 19, smallest 3, and $19 - 3 = 16$." },
        { text: "3", feedback: "3 is the smallest value. The range is the gap between the largest and the smallest: $19 - 3$." },
        { text: "8", feedback: "$15 - 7$? The range uses the largest and smallest values, 19 and 3." },
        { text: "11.2", feedback: "That is the mean, a measure of centre. The range is $19 - 3 = 16$." },
      ],
      hint: "Find the largest and the smallest value.",
    },
    {
      type: "quiz",
      id: "st2-1-q3",
      variant: "concept",
      question: "The data 50, 52, 53, 55, 56, 58 has range 8. A seventh value is added and the range becomes 45. What was added, and what does that tell you?",
      options: [
        {
          text: "95 (or 13): a single extreme value, which shows the range depends only on the two extremes.",
          correct: true,
          feedback: "$95 - 50 = 45$ and $58 - 13 = 45$. Either way one value changed the range more than fivefold while the rest stayed put.",
        },
        { text: "Seven moderate values were each shifted a little.", feedback: "Only one value was added. The range responds to the extremes alone." },
        { text: "It must have been 45.", feedback: "45 lies below 50, so the range would become $58 - 45 = 13$, not 45." },
      ],
    },
    {
      type: "quiz",
      id: "st2-1-q4",
      variant: "practice",
      question: "Which statement about the range is true?",
      options: [
        { text: "It is determined by only two values in the data set.", correct: true, feedback: "The maximum and the minimum. Every other value could move freely between them without changing it." },
        { text: "It uses every value in the data set equally.", feedback: "That is precisely what it does not do, which is why it is so sensitive to outliers." },
        { text: "It can be negative when the data are negative.", feedback: "Largest minus smallest is never negative: the range of $-8, -3, -1$ is $-1 - (-8) = 7$." },
        { text: "It is measured in squared units.", feedback: "Range is a difference of two values, so it has the data's own units." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "quartiles-percentiles-iqr",
  title: "2.2 · Quartiles, Percentiles and IQR",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "The range fails because it trusts the two most extreme values. A simple repair: **ignore the extremes**. Line the data up in order, cut it into four equal-sized groups, throw away the bottom quarter and the top quarter, and measure the width of the middle half. Outliers live in the outer quarters, so they cannot touch it.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Quartiles and the IQR",
      content:
        "The **quartiles** $Q_1, Q_2, Q_3$ cut the ordered data into four parts with (roughly) a quarter of the values in each.\n$Q_2$ is the median. $Q_1$ is the median of the lower half. $Q_3$ is the median of the upper half.\n**Interquartile range:** $\\text{IQR} = Q_3 - Q_1$, the width of the middle 50% of the data.\n**Semi-interquartile range** (quartile deviation): $\\dfrac{Q_3 - Q_1}{2}$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The convention used in this course",
      content:
        "For raw data we use the **median-of-halves** rule: find the median; if $n$ is odd, leave the median out of both halves; then $Q_1$ and $Q_3$ are the medians of the lower and upper halves. Textbooks and calculators use a few slightly different rules, so answers can differ by a small amount on small data sets. The idea never changes.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (odd $n$).** 3, 5, 7, 8, 10, 12, 13, 15, 18, 20, 25.\n\n**Step 1.** Already sorted, $n = 11$. The median is the 6th value: $Q_2 = 12$.\n**Step 2.** Leave 12 out. Lower half: 3, 5, 7, 8, 10, whose median is $Q_1 = 7$.\n**Step 3.** Upper half: 13, 15, 18, 20, 25, whose median is $Q_3 = 18$.\n**Step 4.** $\\text{IQR} = 18 - 7 = 11$. The semi-IQR is 5.5.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (even $n$).** 4, 6, 9, 11, 12, 14, 17, 19, 22, 30.\n\n**Step 1.** $n = 10$, so the median is the mean of the 5th and 6th values: $Q_2 = \\frac{12 + 14}{2} = 13$.\n**Step 2.** The halves split cleanly. Lower half 4, 6, 9, 11, 12 gives $Q_1 = 9$.\n**Step 3.** Upper half 14, 17, 19, 22, 30 gives $Q_3 = 19$.\n**Step 4.** $\\text{IQR} = 19 - 9 = 10$, semi-IQR 5.\n\nNow change the 30 to 300. The range goes from 26 to 296. The IQR stays at 10, because 300 is still just 'the largest value' in the upper half and the median of that half is still 19.",
    },
    {
      type: "text",
      content:
        "**Worked example 2b (application): delivery times.** A food-delivery app logs 12 orders (minutes), already sorted: 18, 22, 25, 25, 27, 29, 30, 31, 33, 35, 38, 95. The 95 was a rider stuck behind a flooded underpass. What spread should the app promise customers?\n\n**Step 1.** $n = 12$, so $Q_2 = \\frac{29 + 30}{2} = 29.5$ and each half has six values.\n**Step 2.** Lower half 18, 22, 25, 25, 27, 29: $Q_1 = \\frac{25 + 25}{2} = 25$.\n**Step 3.** Upper half 30, 31, 33, 35, 38, 95: $Q_3 = \\frac{33 + 35}{2} = 34$. *Why the 95 does not matter:* it is just the last value of the upper half, and the median of that half is decided by its 3rd and 4th values.\n**Step 4.** IQR $= 34 - 25 = 9$ minutes, against a range of $95 - 18 = 77$ minutes. The honest summary is 'the middle half of orders arrive in 25 to 34 minutes'. Quoting the range would describe one bad afternoon, not the service.",
    },
    {
      type: "quiz",
      id: "st2-2-q1",
      variant: "concept",
      question: "The data 20, 24, 30, 36, 40, 44, 52, 60 has maximum 60. What is $Q_1$?",
      options: [
        {
          text: "27",
          correct: true,
          feedback: "Lower half 20, 24, 30, 36 has median $\\frac{24 + 30}{2} = 27$. A quartile is about position in the ordered list, not a fraction of any value.",
        },
        { text: "15", feedback: "That is a quarter of the maximum, $\\frac{60}{4}$. $Q_1$ is the value a quarter of the way *through the ordered data*, and 15 is not even in the range of the data." },
        { text: "24", feedback: "That is the 2nd value. With 8 values, $Q_1$ is the median of the first four: halfway between 24 and 30." },
        { text: "40", feedback: "40 is above the median (38). $Q_1$ sits in the lower half." },
      ],
      hint: "Split the ordered list into halves, then take the median of the lower half.",
    },
    {
      type: "quiz",
      id: "st2-2-q6",
      variant: "practice",
      question: "Eight students' travel times to school (minutes) are 11, 14, 15, 18, 21, 23, 26, 40. Using the median-of-halves rule, what is the IQR?",
      options: [
        { text: "10", correct: true, feedback: "Lower half 11, 14, 15, 18 gives $Q_1 = 14.5$; upper half 21, 23, 26, 40 gives $Q_3 = 24.5$. IQR $= 10$." },
        { text: "29", feedback: "That is the range, $40 - 11$, which the one long trip of 40 minutes inflates." },
        { text: "14.5", feedback: "That is $Q_1$. The IQR is $Q_3 - Q_1$." },
        { text: "5", feedback: "That is the semi-IQR, half of the IQR." },
      ],
      hint: "With $n = 8$ the halves are the first four and the last four values.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Q1 is not a quarter of anything's value",
      content:
        "The 'quarter' in quartile counts **values**, not size. $Q_1$ is the value with a quarter of the data below it. For heights 150 to 180 cm, $Q_1$ might be 158 cm, nowhere near $\\frac{180}{4} = 45$ cm.",
    },
    {
      type: "text",
      content:
        "**Grouped data.** When only class frequencies are known, use exactly the same interpolation as the grouped median from Chapter 1.4. There you looked for the value with $\\frac{N}{2}$ items below it. For $Q_1$ look for $\\frac{N}{4}$ items, and for $Q_3$ look for $\\frac{3N}{4}$:",
    },
    {
      type: "math",
      latex:
        "Q_1 = l + \\frac{\\frac{N}{4} - cf}{f}\\times h, \\qquad Q_3 = l + \\frac{\\frac{3N}{4} - cf}{f}\\times h",
    },
    {
      type: "text",
      content:
        "Here $l$ is the lower boundary of the class containing the target position, $cf$ the cumulative frequency *before* that class, $f$ its frequency and $h$ its width. The formula assumes the $f$ values in the class are spread evenly across it, so walking $\\frac{N}{4} - cf$ values into the class means walking that fraction of $h$.",
    },
    {
      type: "table",
      headers: ["Class", "0–10", "10–20", "20–30", "30–40", "40–50"],
      rows: [
        ["Frequency $f$", "5", "8", "12", "10", "5"],
        ["Cumulative $cf$", "5", "13", "25", "35", "40"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Quartiles for the table above ($N = 40$).\n\n**Step 1.** $\\frac{N}{4} = 10$. The cumulative frequency first reaches 10 in class 10–20, so $l = 10$, $cf = 5$, $f = 8$, $h = 10$.\n**Step 2.** $Q_1 = 10 + \\frac{10 - 5}{8}\\times 10 = 10 + 6.25 = 16.25$.\n**Step 3.** $\\frac{3N}{4} = 30$, which falls in class 30–40: $l = 30$, $cf = 25$, $f = 10$. $Q_3 = 30 + \\frac{30 - 25}{10}\\times 10 = 35$.\n**Step 4.** $\\text{IQR} = 35 - 16.25 = 18.75$, and the semi-IQR is $9.375$.",
    },
    {
      type: "text",
      content:
        "**Reading it off the ogive.** The less-than ogive plots cumulative frequency against upper class boundaries. The quartiles are where the curve crosses heights $\\frac{N}{4}$, $\\frac{N}{2}$ and $\\frac{3N}{4}$. The builder below holds 40 values with exactly the frequencies in the table.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: GROUPED_40,
        range: { min: 0, max: 50 },
        xLabel: "Score",
        view: "ogive",
        views: ["ogive", "histogram", "dotplot"],
        binWidth: 10,
        ogiveType: "less-than",
        stats: ["q1", "median", "q3", "iqr"],
        editable: false,
        caption:
          "Press n/4, n/2 and 3n/4 and read where the line meets the ogive. The ogive line crossings give the grouped estimates 16.25, 25.8 and 35; the stat readouts use the 40 raw values (15.5, 25.5, 34.5). Grouping costs a little accuracy.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Percentiles",
      content:
        "The $k$-th **percentile** $P_k$ has $k\\%$ of the data below it. Quartiles are special percentiles: $Q_1 = P_{25}$, $Q_2 = P_{50}$, $Q_3 = P_{75}$. (Deciles cut into tenths: $D_k = P_{10k}$.) For grouped data:\n$P_k = l + \\dfrac{\\frac{kN}{100} - cf}{f}\\times h$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4.** $P_{90}$ for the same table.\n\n**Step 1.** Target position $\\frac{90 \\times 40}{100} = 36$. The $cf$ passes 36 in class 40–50: $l = 40$, $cf = 35$, $f = 5$.\n**Step 2.** $P_{90} = 40 + \\frac{36 - 35}{5}\\times 10 = 42$.\n**Step 3.** Interpret: 90% of the scores are below 42. In a competitive exam, 'the 90th percentile' means exactly this: you scored better than 90% of candidates, whatever your raw mark.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style): quartile deviation and its coefficient.** Daily wages (₹) of 50 workers are grouped below. Find the quartile deviation and the coefficient of quartile deviation, $\\dfrac{Q_3 - Q_1}{Q_3 + Q_1}$.",
    },
    {
      type: "table",
      headers: ["Wages (₹)", "100–120", "120–140", "140–160", "160–180", "180–200"],
      rows: [
        ["Workers $f$", "6", "10", "18", "10", "6"],
        ["Cumulative $cf$", "6", "16", "34", "44", "50"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1.** $\\frac{N}{4} = 12.5$. The $cf$ first passes 12.5 in class 120–140, so $l = 120$, $cf = 6$, $f = 10$, $h = 20$. *Why not 100–120:* that class holds only 6 workers, short of 12.5.\n**Step 2.** $Q_1 = 120 + \\frac{12.5 - 6}{10}\\times 20 = 120 + 13 = 133$.\n**Step 3.** $\\frac{3N}{4} = 37.5$ falls in 160–180 ($cf$ before it 34, $f = 10$): $Q_3 = 160 + \\frac{37.5 - 34}{10}\\times 20 = 160 + 7 = 167$.\n**Step 4.** Quartile deviation $= \\frac{167 - 133}{2} = 17$ rupees. Coefficient $= \\frac{167 - 133}{167 + 133} = \\frac{34}{300} \\approx 0.113$.\n**Step 5. Sense check.** The frequencies are symmetric about 140–160, and so are the quartiles: the median is $140 + \\frac{25 - 16}{18}\\times 20 = 150$, and 133 and 167 each sit 17 away from it.",
    },
    {
      type: "quiz",
      id: "st2-2-q2",
      variant: "practice",
      question: "For 3, 5, 7, 8, 10, 12, 13, 15, 18, 20, 25 (median-of-halves rule), what is the semi-interquartile range?",
      options: [
        { text: "5.5", correct: true, feedback: "$Q_1 = 7$, $Q_3 = 18$, so $\\frac{18 - 7}{2} = 5.5$." },
        { text: "11", feedback: "That is the IQR itself. The semi-IQR is half of it." },
        { text: "22", feedback: "That is the range, $25 - 3$." },
        { text: "6", feedback: "Check $Q_1$: the lower half is 3, 5, 7, 8, 10, so $Q_1 = 7$." },
      ],
    },
    {
      type: "quiz",
      id: "st2-2-q3",
      variant: "practice",
      question: "Using the grouped table (classes 0–10 to 40–50 with $f$ = 5, 8, 12, 10, 5), find $P_{10}$.",
      options: [
        { text: "8", correct: true, feedback: "Position $\\frac{10\\times 40}{100} = 4$ lies in 0–10: $0 + \\frac{4 - 0}{5}\\times 10 = 8$." },
        { text: "4", feedback: "4 is the *position* (the 4th value). Convert it to a value with the interpolation formula." },
        { text: "10", feedback: "That is the boundary of the first class. Only 4 of its 5 values are needed, so stop at $\\frac45$ of the way." },
        { text: "13", feedback: "13 is a cumulative frequency, not a value on the score axis." },
      ],
      hint: "First find the position $\\frac{kN}{100}$, then the class that contains it.",
    },
    {
      type: "quiz",
      id: "st2-2-q5",
      variant: "practice",
      question: "Using the same grouped table ($f$ = 5, 8, 12, 10, 5 for classes 0–10 to 40–50), find $Q_3$.",
      options: [
        { text: "35", correct: true, feedback: "Position $\\frac{3N}{4} = 30$ lies in 30–40 ($cf$ before it is 25): $30 + \\frac{30 - 25}{10}\\times 10 = 35$." },
        { text: "30", feedback: "30 is the *position* $\\frac{3N}{4}$ (and also the class's lower bound). Interpolate: you need 5 of the class's 10 values, so go halfway into it." },
        { text: "40", feedback: "40 is the upper bound of the class. Only 5 of its 10 values are needed to reach position 30, so stop halfway." },
        { text: "25", feedback: "25 is the cumulative frequency before the $Q_3$ class, a count, not a value on the score axis." },
      ],
      hint: "Target position $\\frac{3N}{4}$, then $Q_3 = l + \\frac{\\frac{3N}{4} - cf}{f}\\times h$.",
    },
    {
      type: "quiz",
      id: "st2-2-q7",
      variant: "practice",
      question: "Classes 0–20, 20–40, 40–60, 60–80 have frequencies 4, 8, 6, 2. Find $Q_1$.",
      options: [
        { text: "22.5", correct: true, feedback: "$N = 20$, so the target position is 5, in class 20–40 ($cf$ before it 4): $20 + \\frac{5 - 4}{8}\\times 20 = 22.5$." },
        { text: "32.5", feedback: "That is $20 + \\frac{5}{8}\\times 20$: you forgot to subtract the 4 values already counted before the class." },
        { text: "5", feedback: "5 is the *position* $\\frac{N}{4}$. Convert it to a value with the interpolation formula." },
        { text: "20", feedback: "That is the class boundary. Position 5 is one value into the class, so go $\\frac18$ of the way across it." },
      ],
      hint: "Find $\\frac{N}{4}$, the class that contains it, and the $cf$ before that class.",
    },
    {
      type: "quiz",
      id: "st2-2-q4",
      variant: "concept",
      question: "In 4, 6, 9, 11, 12, 14, 17, 19, 22, 30 the largest value 30 is replaced by 300. What happens?",
      options: [
        { text: "The range changes a lot; the IQR does not change at all.", correct: true, feedback: "$Q_3$ is still the median of 14, 17, 19, 22, (300), which is 19. The IQR stays 10; the range goes from 26 to 296." },
        { text: "Both the range and the IQR increase a lot.", feedback: "The IQR only uses the middle half. 300 sits in the top quarter, where it cannot move $Q_3$." },
        { text: "Neither changes, since only one value moved.", feedback: "The range is decided by the maximum, so it definitely changes." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "mean-deviation",
  title: "2.3 · Mean Deviation",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "The IQR ignores half the data. Back to the idea from 2.1: measure how far **every** value is from the centre and average those distances. The obvious first attempt is to average the deviations $x_i - \\bar{x}$. It fails, and Chapter 1.1 already told you why:",
    },
    { type: "math", latex: "\\sum_{i=1}^{n} (x_i - \\bar{x}) = \\sum x_i - n\\bar{x} = n\\bar{x} - n\\bar{x} = 0" },
    {
      type: "text",
      content:
        "The mean is the balance point, so the deviations to its left exactly cancel those to its right, for **every** data set. Their average is always 0 and says nothing. The cancelling comes from the signs, so drop the signs: a value 5 below the centre is just as far away as one 5 above it.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Mean deviation about a centre a",
      content:
        "$\\text{MD}(a) = \\dfrac{1}{n}\\sum |x_i - a|$, the average distance of the values from $a$.\nThe centre is usually the mean ($\\text{MD}(\\bar x)$) or the median ($\\text{MD}(M)$). For frequency data: $\\text{MD}(a) = \\dfrac{1}{N}\\sum f_i\\,|x_i - a|$, with $N = \\sum f_i$ and $x_i$ the class midpoints for grouped data.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (raw data).** 4, 7, 8, 9, 10, 12, 13, 17. Find the MD about the mean.\n\n**Step 1.** $\\bar{x} = \\frac{80}{8} = 10$.\n**Step 2.** Distances $|x - 10|$: 6, 3, 2, 1, 0, 2, 3, 7.\n**Step 3.** Their sum is 24.\n**Step 4.** $\\text{MD}(\\bar x) = \\frac{24}{8} = 3$. A typical value sits 3 units from the mean.",
    },
    {
      type: "text",
      content:
        "**Worked example 1b (application): a shop's week.** Daily sales of a stationery shop (₹ thousand): 12, 15, 9, 18, 14, 11, 19. Find the MD about the median and say what it means for the owner.\n\n**Step 1. Sort:** 9, 11, 12, 14, 15, 18, 19. *Why:* the median is a position in the ordered list.\n**Step 2.** $n = 7$, so the median is the 4th value: $M = 14$.\n**Step 3.** Distances $|x - 14|$: 5, 3, 2, 0, 1, 4, 5, total 20.\n**Step 4.** $\\text{MD}(M) = \\frac{20}{7} \\approx 2.86$, about ₹2,860.\n**Step 5. Interpret.** On a typical day sales land roughly ₹2,900 away from ₹14,000. Here the mean is also $\\frac{98}{7} = 14$, so the MD about the mean is the same 2.86. The two part ways only when mean and median differ.",
    },
    {
      type: "quiz",
      id: "st2-3-q5",
      variant: "practice",
      question: "Find the mean deviation about the mean of 3, 10, 10, 4, 7, 10, 5.",
      options: [
        { text: "$\\frac{18}{7} \\approx 2.57$", correct: true, feedback: "$\\bar x = \\frac{49}{7} = 7$. Distances 4, 3, 3, 3, 0, 3, 2 total 18, and $\\frac{18}{7} \\approx 2.57$." },
        { text: "3", feedback: "That is $\\frac{18}{6}$. Divide the total distance by the number of values, $n = 7$." },
        { text: "0", feedback: "Signed deviations from the mean sum to 0; absolute distances do not." },
        { text: "7", feedback: "7 is the mean itself, the centre. The MD is the typical distance from it." },
      ],
      hint: "Mean first, then the distances $|x - \\bar x|$.",
    },
    {
      type: "text",
      content:
        "**Which centre gives the smallest total distance?** Take the data 2, 3, 4, 6, 15 (mean 6, median 4). Drag the centre $a$ below and watch $\\sum|x - a|$ in the small graph.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [2, 3, 4, 6, 15],
        range: { min: 0, max: 20 },
        xLabel: "Value",
        view: "dotplot",
        deviations: "absolute",
        centerSlider: true,
        stats: ["mean", "median", "md-mean", "md-median"],
        caption:
          "Each bar is a distance |x − a|. The total is smallest when a sits on the median, 4, not on the mean, 6. Drag the 15 further right: the minimum stays at the median.",
      },
    },
    {
      type: "text",
      content:
        "**Why the median wins.** Stand at $a$ and step a little to the right. Every value to your right gets closer by that step; every value to your left gets further by the same step. If more values are on your right, the total falls, so keep walking. You stop improving exactly when the values are balanced in *number* on both sides, and that is the median. How far away the values are never enters this argument, only how many lie on each side. With an even number of values, every $a$ between the two middle values gives the same minimum; the median (their midpoint) is one of them.",
    },
    {
      type: "table",
      headers: ["$x$", "2", "3", "4", "6", "15", "Sum", "MD"],
      rows: [
        ["$|x - 6|$ (mean)", "4", "3", "2", "0", "9", "18", "3.6"],
        ["$|x - 4|$ (median)", "2", "1", "0", "2", "11", "16", "3.2"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "The mean does not minimise absolute distance",
      content:
        "It is tempting to assume the mean, being 'the' average, gives the smallest mean deviation. It does not: $\\sum|x - a|$ is smallest at the **median**. The two agree only when mean and median coincide, as in symmetric data. (The mean does minimise something, $\\sum (x - a)^2$, which is the story of the next lesson.)",
    },
    {
      type: "quiz",
      id: "st2-3-q1",
      variant: "concept",
      question: "For the data 1, 2, 3, 10, which statement is correct?",
      options: [
        {
          text: "MD about the median (2.5) is smaller than MD about the mean (4).",
          correct: true,
          feedback: "About 4: $3 + 2 + 1 + 6 = 12$, MD 3. About 2.5: $1.5 + 0.5 + 0.5 + 7.5 = 10$, MD 2.5. The median gives the smaller total distance.",
        },
        { text: "MD about the mean is smaller, since the mean always minimises deviation.", feedback: "The mean minimises the sum of *squared* deviations. For absolute deviations the median wins: MD 2.5 versus 3." },
        { text: "The two mean deviations are equal.", feedback: "They agree only when mean = median. Here the 10 pulls the mean to 4 while the median stays at 2.5." },
        { text: "MD about the mean is 0, since deviations from the mean sum to 0.", feedback: "The *signed* deviations sum to 0; the absolute ones do not. That is the whole reason for the absolute value." },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 2 (discrete frequency data).** Find the MD about the mean.",
    },
    {
      type: "table",
      headers: ["$x$", "2", "5", "6", "8", "10", "12", "Total"],
      rows: [
        ["$f$", "2", "8", "10", "7", "8", "5", "40"],
        ["$fx$", "4", "40", "60", "56", "80", "60", "300"],
        ["$|x - 7.5|$", "5.5", "2.5", "1.5", "0.5", "2.5", "4.5", ""],
        ["$f|x - 7.5|$", "11", "20", "15", "3.5", "20", "22.5", "92"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1.** $\\bar x = \\frac{\\sum fx}{N} = \\frac{300}{40} = 7.5$.\n**Step 2.** Distance of each value from 7.5, then multiply by how many times it occurs.\n**Step 3.** $\\text{MD}(\\bar x) = \\frac{92}{40} = 2.3$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2b (discrete frequency data, about the median).** Find the MD about the median.",
    },
    {
      type: "table",
      headers: ["$x$", "3", "6", "9", "12", "13", "15", "21", "22", "Total"],
      rows: [
        ["$f$", "3", "4", "5", "2", "4", "5", "4", "3", "30"],
        ["$cf$", "3", "7", "12", "14", "18", "23", "27", "30", ""],
        ["$|x - 13|$", "10", "7", "4", "1", "0", "2", "8", "9", ""],
        ["$f|x - 13|$", "30", "28", "20", "2", "0", "10", "32", "27", "149"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1.** $N = 30$ is even, so the median is the mean of the 15th and 16th values. The $cf$ column passes 14 at $x = 12$ and reaches 18 at $x = 13$, so the 15th and 16th values are both 13: $M = 13$.\n**Step 2.** Distances $|x - 13|$, each weighted by its frequency, total 149.\n**Step 3.** $\\text{MD}(M) = \\frac{149}{30} \\approx 4.97$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (grouped, about the mean).** Classes 10–20, 20–30, …, 70–80 with frequencies 2, 3, 8, 14, 8, 3, 2 ($N = 40$).\n\n**Step 1.** Midpoints 15, 25, 35, 45, 55, 65, 75. $\\sum fx = 30 + 75 + 280 + 630 + 440 + 195 + 150 = 1800$, so $\\bar x = 45$.\n**Step 2.** $|x - 45|$ = 30, 20, 10, 0, 10, 20, 30.\n**Step 3.** $\\sum f|x - 45| = 60 + 60 + 80 + 0 + 80 + 60 + 60 = 400$.\n**Step 4.** $\\text{MD}(\\bar x) = \\frac{400}{40} = 10$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (grouped, about the median).** Classes 0–10, 10–20, …, 50–60 with frequencies 6, 7, 15, 16, 4, 2 ($N = 50$).\n\n**Step 1.** Cumulative frequencies 6, 13, 28, 44, 48, 50. $\\frac{N}{2} = 25$ falls in 20–30: $M = 20 + \\frac{25 - 13}{15}\\times 10 = 28$.\n**Step 2.** Midpoints 5, 15, 25, 35, 45, 55, so $|x - 28|$ = 23, 13, 3, 7, 17, 27.\n**Step 3.** $f|x - 28|$ = 138, 91, 45, 112, 68, 54, total 508.\n**Step 4.** $\\text{MD}(M) = \\frac{508}{50} = 10.16$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (JEE Main style): an AP with an unknown gap.** The mean deviation about the median of the 101 numbers $1, 1 + d, 1 + 2d, \\dots, 1 + 100d$ (with $d > 0$) is 255. Find $d$.\n\n**Step 1. Median.** The terms are already in order and $n = 101$ is odd, so the median is the 51st term: $M = 1 + 50d$.\n**Step 2. Distances.** The term $1 + kd$ ($k = 0, 1, \\dots, 100$) is at distance $|k - 50|\\,d$ from $M$. *Why write it this way:* the 1s cancel, and every distance becomes a whole number of steps $d$.\n**Step 3. Sum.** The step counts $|k - 50|$ run $50, 49, \\dots, 1, 0, 1, \\dots, 50$, so:",
    },
    {
      type: "math",
      latex: "\\sum |x - M| = 2(1 + 2 + \\dots + 50)\\,d = 2\\cdot\\frac{50 \\cdot 51}{2}\\,d = 2550\\,d",
    },
    {
      type: "text",
      content:
        "**Step 4.** $\\text{MD}(M) = \\frac{2550\\,d}{101} = 255$, so $d = \\frac{255 \\times 101}{2550} = 10.1$.\n\nThe pattern generalises: an AP with an odd number $n = 2m + 1$ of terms has MD about the median $\\frac{m(m + 1)}{2m + 1}\\,|d|$. Check with $m = 50$: $\\frac{50 \\cdot 51}{101}\\,d = \\frac{2550}{101}\\,d$.",
    },
    {
      type: "quiz",
      id: "st2-3-q6",
      variant: "practice",
      question: "The 11 numbers $5, 5 + d, 5 + 2d, \\dots, 5 + 10d$ (with $d > 0$) have mean deviation about the median equal to 30. Find $d$.",
      options: [
        { text: "11", correct: true, feedback: "Median $5 + 5d$. Step counts $5, 4, \\dots, 0, \\dots, 5$ total $2(1 + \\dots + 5) = 30$, so MD $= \\frac{30d}{11} = 30$ and $d = 11$." },
        { text: "22", feedback: "That counts the distances on one side of the median only ($\\frac{15d}{11} = 30$). Both sides contribute $1 + 2 + \\dots + 5$." },
        { text: "10", feedback: "That divides the total distance by 10. There are $n = 11$ values." },
        { text: "6", feedback: "That sets $5d = 30$, treating the largest distance as the average. Average all 11 distances." },
      ],
      hint: "Write each distance from the median as a multiple of $d$, add, and divide by 11.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Strengths and weaknesses",
      content:
        "MD uses every value and has a clear meaning: typical distance from the centre, in the data's own units. Its weakness is the absolute value, which has a corner at 0 and is awkward in algebra. You cannot easily combine the MDs of two groups, for example. That awkwardness is why the next lesson squares instead.",
    },
    {
      type: "quiz",
      id: "st2-3-q2",
      variant: "practice",
      question: "Find the mean deviation about the median of 3, 7, 8, 12, 20.",
      options: [
        { text: "4.4", correct: true, feedback: "Median 8. Distances 5, 1, 0, 4, 12 total 22, and $\\frac{22}{5} = 4.4$." },
        { text: "4.8", feedback: "That is the MD about the mean, 10 (distances 7, 3, 2, 2, 10). The question asks about the median, 8." },
        { text: "0", feedback: "Absolute distances cannot cancel. Only signed deviations from the mean sum to zero." },
        { text: "22", feedback: "22 is the total distance. Divide by $n = 5$." },
      ],
      hint: "Sort, find the median, add the distances, divide by $n$.",
    },
    {
      type: "quiz",
      id: "st2-3-q3",
      variant: "practice",
      question: "Classes 0–10, 10–20, 20–30, 30–40 have frequencies 2, 3, 3, 2. Find the MD about the mean.",
      options: [
        { text: "9", correct: true, feedback: "Midpoints 5, 15, 25, 35 give $\\bar x = \\frac{200}{10} = 20$. $\\sum f|x - 20| = 30 + 15 + 15 + 30 = 90$, so MD $= 9$." },
        { text: "10", feedback: "The average of the distances 15, 5, 5, 15 ignoring frequencies. Weight each by $f$ and divide by $N = 10$." },
        { text: "22.5", feedback: "That is $\\frac{90}{4}$: divide by the total frequency $N = 10$, not by the number of classes." },
        { text: "20", feedback: "20 is the mean itself, the centre. The MD is the typical distance from it." },
      ],
    },
    {
      type: "quiz",
      id: "st2-3-q4",
      variant: "concept",
      question: "Why do we take absolute values in the mean deviation?",
      options: [
        { text: "Because signed deviations from the mean always sum to 0, so their average carries no information about spread.", correct: true, feedback: "Positive and negative deviations cancel exactly. Distances cannot cancel." },
        { text: "Because negative data values are not allowed in statistics.", feedback: "Data can be negative (temperatures, profits). The issue is the sign of the *deviation*, not of the data." },
        { text: "To make the answer bigger and easier to read.", feedback: "Absolute values fix a genuine problem: without them the average deviation from the mean is always 0." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "variance-and-standard-deviation",
  title: "2.4 · Variance and Standard Deviation",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Absolute values solve the cancelling problem, but there is another way to kill a sign: **square it**. $(-3)^2 = 3^2 = 9$. Squaring the deviations and averaging them gives the most important measure of spread in all of statistics.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Three reasons to square",
      content:
        "1. **It removes the sign**, just like $|\\cdot|$.\n2. **It punishes big deviations more.** A value 4 away counts 16, one 1 away counts 1. Wild values are exactly what we want a spread measure to notice.\n3. **It makes the algebra work.** Squares expand ($(x - a)^2 = x^2 - 2ax + a^2$), so sums of squares can be split, shifted and combined. This is why variance, not MD, runs through regression, the normal distribution and beyond.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Variance and standard deviation",
      content:
        "**Variance:** $\\sigma^2 = \\dfrac{1}{n}\\sum (x_i - \\bar x)^2$, the mean of the squared deviations.\n**Standard deviation:** $\\sigma = \\sqrt{\\sigma^2}$, taken to return to the data's units.",
    },
    {
      type: "text",
      content:
        "Draw each deviation as a square whose side is the distance from the mean. The variance is then literally the **average area** of those squares. Data: 2, 4, 4, 4, 5, 5, 7, 9.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [2, 4, 4, 4, 5, 5, 7, 9],
        range: { min: 0, max: 12 },
        xLabel: "Value",
        view: "dotplot",
        deviations: "squares",
        stats: ["mean", "variance", "sd", "md-mean"],
        caption:
          "Each square has side |x − x̄|. The variance is their mean area; the SD is the side of a square with that average area. Drag the 9 to 12 and watch its square dominate.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Variance and SD of 2, 4, 4, 4, 5, 5, 7, 9.\n\n**Step 1.** $\\bar x = \\frac{40}{8} = 5$.\n**Step 2.** Deviations: $-3, -1, -1, -1, 0, 0, 2, 4$ (they sum to 0, as they must).\n**Step 3.** Squares: 9, 1, 1, 1, 0, 0, 4, 16, total 32.\n**Step 4.** $\\sigma^2 = \\frac{32}{8} = 4$ and $\\sigma = 2$.",
    },
    {
      type: "text",
      content:
        "**A shortcut, derived.** Computing every $x_i - \\bar x$ is painful when $\\bar x$ is an ugly decimal. Expand the square and use $\\sum x_i = n\\bar x$:",
    },
    {
      type: "math",
      latex:
        "\\sum (x_i - \\bar x)^2 = \\sum x_i^2 - 2\\bar x\\sum x_i + n\\bar x^2 = \\sum x_i^2 - 2n\\bar x^2 + n\\bar x^2 = \\sum x_i^2 - n\\bar x^2",
    },
    { type: "text", content: "Divide by $n$:" },
    {
      type: "math",
      latex: "\\sigma^2 = \\frac{\\sum x_i^2}{n} - \\bar x^2 \\qquad \\text{(mean of the squares minus square of the mean)}",
    },
    {
      type: "text",
      content:
        "**Check on the same data.** $\\sum x^2 = 4 + 16 + 16 + 16 + 25 + 25 + 49 + 81 = 232$. Then $\\sigma^2 = \\frac{232}{8} - 5^2 = 29 - 25 = 4$. Same answer, no deviations needed.\n\nA side result: since $\\sigma^2 \\ge 0$, the mean of the squares is never less than the square of the mean, with equality only when every value is the same.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (from sums).** For 10 observations, $\\sum x = 60$ and $\\sum x^2 = 400$.\n\n**Step 1.** $\\bar x = 6$.\n**Step 2.** $\\sigma^2 = \\frac{400}{10} - 6^2 = 40 - 36 = 4$.\n**Step 3.** $\\sigma = 2$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** 6, 8, 10, 12, 14. The mean is 10, deviations $-4, -2, 0, 2, 4$, squares 16, 4, 0, 4, 16, total 40. So $\\sigma^2 = 8$ and $\\sigma = 2\\sqrt2 \\approx 2.83$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3b (application): checking tablets.** A pharmacist weighs six tablets labelled 250 mg: 248, 252, 250, 247, 253, 250. Find the SD.\n\n**Step 1. Mean.** The total is 1500, so $\\bar x = 250$ mg. *Why start here:* when the mean is a whole number the direct method stays clean; when it is an ugly decimal, use the shortcut instead.\n**Step 2. Deviations** from 250: $-2, 2, 0, -3, 3, 0$. They sum to 0, a free arithmetic check.\n**Step 3. Squares:** 4, 4, 0, 9, 9, 0, total 26.\n**Step 4.** $\\sigma^2 = \\frac{26}{6} \\approx 4.33$ mg², so $\\sigma \\approx 2.08$ mg.\n**Step 5. Interpret.** A typical tablet is about 2 mg off the label, under 1% of the dose. The two tablets 3 mg out supply 18 of the 26 squared units: squaring makes the SD listen hardest to the worst tablets, which is exactly what a quality check wants.",
    },
    {
      type: "quiz",
      id: "st2-4-q5",
      variant: "practice",
      question: "Find the standard deviation of 48, 52, 50, 46, 54.",
      options: [
        { text: "$2\\sqrt2 \\approx 2.83$", correct: true, feedback: "$\\bar x = 50$; squared deviations 4, 4, 0, 16, 16 total 40; $\\sigma^2 = 8$, $\\sigma = 2\\sqrt2$." },
        { text: "8", feedback: "8 is the variance. Take the square root for the SD." },
        { text: "2.4", feedback: "That is the MD about the mean, $\\frac{2 + 2 + 0 + 4 + 4}{5}$. The SD squares first, then roots, and comes out larger." },
        { text: "$\\sqrt{10} \\approx 3.16$", feedback: "That divides 40 by $n - 1 = 4$. In this course variance divides by $n = 5$." },
      ],
      hint: "Mean, deviations, squares, average, square root.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (JEE classic): the first $n$ natural numbers.** Find the variance of $1, 2, 3, \\dots, n$.\n\n**Step 1.** $\\bar x = \\frac{1 + 2 + \\dots + n}{n} = \\frac{n(n+1)/2}{n} = \\frac{n+1}{2}$.\n**Step 2.** Mean of the squares: $\\frac{\\sum k^2}{n} = \\frac{n(n+1)(2n+1)/6}{n} = \\frac{(n+1)(2n+1)}{6}$.\n**Step 3.** Shortcut: $\\sigma^2 = \\frac{(n+1)(2n+1)}{6} - \\frac{(n+1)^2}{4} = \\frac{(n+1)\\left[2(2n+1) - 3(n+1)\\right]}{12} = \\frac{(n+1)(n-1)}{12}$.\n**Step 4.** So $\\sigma^2 = \\dfrac{n^2 - 1}{12}$. Check with $n = 5$ (1 to 5): $\\frac{24}{12} = 2$, and directly the squared deviations 4, 1, 0, 1, 4 average to 2. Lesson 2.6 stretches this to any arithmetic progression.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (JEE Main style): sums about a convenient point.** For 10 observations, $\\sum (x_i - 5) = 10$ and $\\sum (x_i - 5)^2 = 50$. Find the mean and variance.\n\n**Step 1. Name the shifted values.** Let $u_i = x_i - 5$, so $\\sum u = 10$ and $\\sum u^2 = 50$. *Why:* the data arrive only through $x - 5$, so work with those numbers directly.\n**Step 2. Mean.** $\\bar u = 1$, and since each $x = u + 5$, $\\bar x = 6$.\n**Step 3. Variance of $u$.** $\\sigma_u^2 = \\frac{50}{10} - 1^2 = 4$.\n**Step 4. Variance of $x$.** Each deviation $x_i - \\bar x = (u_i + 5) - (\\bar u + 5) = u_i - \\bar u$ is untouched by the shift, so $\\sigma_x^2 = 4$.\n\nThe classic slip is to answer $\\frac{50}{10} = 5$. That is the mean squared distance from 5, not from the mean 6, and the identity proved later in this lesson shows the gap is exactly $(\\bar x - 5)^2$:",
    },
    { type: "math", latex: "\\frac{1}{n}\\sum (x_i - 5)^2 = \\sigma^2 + (\\bar x - 5)^2 \\quad\\Rightarrow\\quad 5 = 4 + 1" },
    {
      type: "quiz",
      id: "st2-4-q6",
      variant: "practice",
      question: "For 8 observations, $\\sum (x_i - 3) = 16$ and $\\sum (x_i - 3)^2 = 64$. Find the variance.",
      options: [
        { text: "4", correct: true, feedback: "With $u = x - 3$: $\\bar u = 2$, $\\sigma^2 = \\frac{64}{8} - 2^2 = 4$. The shift by 3 does not change the variance." },
        { text: "8", feedback: "$\\frac{64}{8} = 8$ is the mean squared distance from 3, not from the mean. Subtract $\\bar u^2 = 4$." },
        { text: "5", feedback: "5 is the mean, $\\bar x = 3 + 2$. The question asks for the variance." },
        { text: "2", feedback: "2 is the SD (or $\\bar u$). The variance is 4." },
      ],
      hint: "Work with $u = x - 3$, then remember a shift does not change variance.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Units",
      content:
        "If heights are in cm, deviations are in cm and their squares in **cm²**. So variance is in squared units, which is hard to picture (what is a 'squared mark'?). The square root brings SD back to cm, which is why SD is the number we report and variance is the number we calculate with.",
    },
    {
      type: "quiz",
      id: "st2-4-q1",
      variant: "practice",
      question: "For 5 observations, $\\sum x = 20$ and $\\sum x^2 = 100$. Find the standard deviation.",
      options: [
        { text: "2", correct: true, feedback: "$\\bar x = 4$, $\\sigma^2 = \\frac{100}{5} - 16 = 4$, $\\sigma = 2$." },
        { text: "4", feedback: "That is the variance. Take the square root for the SD." },
        { text: "$\\sqrt{20}$", feedback: "$\\frac{100}{5} = 20$ is the mean of the squares. Subtract $\\bar x^2 = 16$ first." },
        { text: "16", feedback: "16 is $\\bar x^2$. Use $\\frac{\\sum x^2}{n} - \\bar x^2 = 20 - 16$, then take the root." },
      ],
      hint: "Mean of the squares minus square of the mean.",
    },
    {
      type: "text",
      content:
        "**SD versus MD.** On the data 2, 4, 4, 4, 5, 5, 7, 9 the builder shows MD about the mean $= \\frac{3 + 1 + 1 + 1 + 0 + 0 + 2 + 4}{8} = 1.5$, while SD $= 2$. They measure the same idea in different ways and do not agree. Squaring gives the big deviations extra weight, so SD is always at least as big as MD about the mean, and strictly bigger unless every deviation has the same size.",
    },
    {
      type: "quiz",
      id: "st2-4-q2",
      variant: "concept",
      question: "For 1, 3, 5, 7 the mean distance from the mean is 2. What is the standard deviation?",
      options: [
        {
          text: "$\\sqrt5 \\approx 2.24$",
          correct: true,
          feedback: "Squares 9, 1, 1, 9 average to 5, so $\\sigma = \\sqrt5$. SD is the *root-mean-square* distance, not the mean distance, and it is at least as large.",
        },
        { text: "2", feedback: "That is the MD. The SD is not 'the average distance from the mean': it squares first, averages, then roots, which gives more weight to the far values." },
        { text: "5", feedback: "5 is the variance. The SD is its square root." },
        { text: "4", feedback: "4 is the mean of the data, not a measure of spread." },
      ],
    },
    {
      type: "text",
      content:
        "**The mean minimises squared distance.** In 2.3 the median minimised $\\sum|x - a|$. For squares, the winner is the mean, and here is why. Write $x - a = (x - \\bar x) + (\\bar x - a)$ and expand; the cross term vanishes because $\\sum (x - \\bar x) = 0$:",
    },
    { type: "math", latex: "\\sum (x_i - a)^2 = \\sum (x_i - \\bar x)^2 + n(\\bar x - a)^2" },
    {
      type: "text",
      content:
        "The first term does not depend on $a$; the second is never negative and is 0 only at $a = \\bar x$. So the total squared distance is smallest at the mean, a parabola in $a$. Drag the centre below and watch it.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [2, 3, 4, 6, 15],
        range: { min: 0, max: 20 },
        xLabel: "Value",
        view: "dotplot",
        deviations: "squares",
        centerSlider: true,
        stats: ["mean", "median", "variance"],
        caption:
          "The small graph of Σ(x − a)² is a parabola with its lowest point at the mean, 6. Compare with 2.3, where Σ|x − a| bottomed out at the median, 4.",
      },
    },
    {
      type: "callout",
      variant: "info",
      title: "Preview: dividing by n − 1",
      content:
        "When your data are a *sample* and you want to estimate the spread of a whole population, statisticians divide by $n - 1$ instead of $n$. The reason: deviations are measured from the sample's own mean, which sits closer to the data than the true population mean does, so dividing by $n$ comes out slightly too small. Chapter 5 returns to this. In this course, and in CBSE/JEE descriptive statistics, variance divides by $n$.",
    },
    {
      type: "quiz",
      id: "st2-4-q3",
      variant: "concept",
      question: "A data set has standard deviation 0. What must be true?",
      options: [
        { text: "Every value is the same.", correct: true, feedback: "A sum of squares is 0 only if each square is 0, so every value equals the mean." },
        { text: "The mean is 0.", feedback: "The data 7, 7, 7 has SD 0 and mean 7. SD measures spread, not location." },
        { text: "The values are symmetric about the mean.", feedback: "Symmetric data like 1, 5, 9 still have SD $> 0$." },
        { text: "Half the deviations are negative, so they cancel.", feedback: "Squared deviations never cancel; they are all $\\ge 0$." },
      ],
    },
    {
      type: "quiz",
      id: "st2-4-q4",
      variant: "practice",
      question: "Heights of plants are recorded in cm and have variance 16. What are the SD and its units?",
      options: [
        { text: "4 cm", correct: true, feedback: "Variance is in cm², so $\\sigma = \\sqrt{16} = 4$ cm." },
        { text: "16 cm", feedback: "16 is the variance, measured in cm². Take the square root." },
        { text: "4 cm²", feedback: "Square-rooting takes cm² back to cm." },
        { text: "8 cm", feedback: "The SD is the square root of the variance, not half of it." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "sd-for-grouped-data",
  title: "2.5 · SD for Frequency and Grouped Data",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A frequency table is shorthand: '$x$ occurs $f$ times' just means the value $x$ is written out $f$ times. So every sum over the raw data becomes a sum over the table with each term multiplied by its frequency. Nothing new is needed, only bookkeeping.",
    },
    {
      type: "math",
      latex:
        "\\sigma^2 = \\frac{1}{N}\\sum f_i (x_i - \\bar x)^2 = \\frac{\\sum f_i x_i^2}{N} - \\left(\\frac{\\sum f_i x_i}{N}\\right)^2, \\qquad N = \\sum f_i",
    },
    {
      type: "text",
      content:
        "The second form is the shortcut from 2.4 ('mean of squares minus square of mean') with $f$ attached. For grouped data, $x_i$ is the class midpoint, standing in for every value in that class, so the answer is an estimate, just as the grouped mean was in Chapter 1.2.",
    },
    {
      type: "text",
      content: "**Worked example 1 (discrete).** Find the variance and SD.",
    },
    {
      type: "table",
      headers: ["$x$", "4", "8", "11", "17", "20", "24", "32", "Total"],
      rows: [
        ["$f$", "3", "5", "9", "5", "4", "3", "1", "30"],
        ["$fx$", "12", "40", "99", "85", "80", "72", "32", "420"],
        ["$x - 14$", "−10", "−6", "−3", "3", "6", "10", "18", ""],
        ["$f(x - 14)^2$", "300", "180", "81", "45", "144", "300", "324", "1374"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1.** $\\bar x = \\frac{420}{30} = 14$.\n**Step 2.** Square each deviation and weight it by $f$; the total is 1374.\n**Step 3.** $\\sigma^2 = \\frac{1374}{30} = 45.8$ and $\\sigma = \\sqrt{45.8} \\approx 6.77$.",
    },
    {
      type: "text",
      content: "**Worked example 1b (application): family size, by the shortcut.** A survey of 20 households records the number of children in each.",
    },
    {
      type: "table",
      headers: ["Children $x$", "0", "1", "2", "3", "4", "Total"],
      rows: [
        ["Households $f$", "2", "4", "8", "4", "2", "20"],
        ["$fx$", "0", "4", "16", "12", "8", "40"],
        ["$fx^2$", "0", "4", "32", "36", "32", "104"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1.** $\\bar x = \\frac{40}{20} = 2$.\n**Step 2.** Mean of the squares: $\\frac{\\sum f x^2}{N} = \\frac{104}{20} = 5.2$. *Why the shortcut here:* each $fx^2$ entry is just the $fx$ entry multiplied by $x$ once more, with no deviations to compute.\n**Step 3.** $\\sigma^2 = 5.2 - 2^2 = 1.2$, so $\\sigma \\approx 1.10$ children.\n**Step 4. Interpret.** A typical household sits about one child away from the average of 2.",
    },
    {
      type: "quiz",
      id: "st2-5-q1",
      variant: "practice",
      question: "Values 1, 2, 3, 4, 5 occur with frequencies 1, 2, 4, 2, 1. Find the variance.",
      options: [
        { text: "1.2", correct: true, feedback: "$N = 10$, $\\sum fx = 30$ so $\\bar x = 3$; $\\sum fx^2 = 102$ so $\\sigma^2 = 10.2 - 9 = 1.2$." },
        { text: "2", feedback: "That is the variance of 1, 2, 3, 4, 5 each appearing once. The frequencies pile the data near 3, shrinking the spread." },
        { text: "10.2", feedback: "That is the mean of the squares. Subtract $\\bar x^2 = 9$." },
        { text: "$\\sqrt{1.2}$", feedback: "That is the SD. The question asks for the variance." },
      ],
    },
    {
      type: "quiz",
      id: "st2-5-q5",
      variant: "practice",
      question: "Values 1, 2, 3, 4 occur with frequencies 1, 3, 3, 1. Find the variance.",
      options: [
        { text: "0.75", correct: true, feedback: "$N = 8$, $\\sum fx = 20$ so $\\bar x = 2.5$; $\\sum fx^2 = 56$ so $\\sigma^2 = 7 - 6.25 = 0.75$." },
        { text: "1.25", feedback: "That is the variance of 1, 2, 3, 4 each appearing once. Weight each value by its frequency." },
        { text: "7", feedback: "7 is the mean of the squares. Subtract $\\bar x^2 = 6.25$." },
        { text: "$\\sqrt{0.75} \\approx 0.87$", feedback: "That is the SD. The question asks for the variance." },
      ],
      hint: "Build the $fx$ and $fx^2$ columns.",
    },
    {
      type: "text",
      content:
        "**Step deviation, derived.** With midpoints like 35, 45, …, 95 the squares get large. In Chapter 1.2 you tamed the mean by coding $u = \\frac{x - A}{h}$. The same code works for variance, and the reason is a two-line argument. Since $x = A + hu$:",
    },
    {
      type: "math",
      latex:
        "\\bar x = A + h\\bar u, \\qquad x - \\bar x = h(u - \\bar u) \\;\\Rightarrow\\; \\sigma_x^2 = \\frac{1}{N}\\sum f\\,h^2(u - \\bar u)^2 = h^2\\sigma_u^2",
    },
    {
      type: "text",
      content:
        "The shift $A$ disappears completely (subtracting a constant moves every value and the mean together, so no deviation changes), while the scale $h$ comes out **squared** in the variance. Taking roots:",
    },
    {
      type: "math",
      latex:
        "\\sigma_x = h\\,\\sqrt{\\frac{\\sum f u^2}{N} - \\left(\\frac{\\sum f u}{N}\\right)^2}",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (grouped, step deviation).** Find the mean, variance and SD.",
    },
    {
      type: "table",
      headers: ["Class", "Midpoint $x$", "$f$", "$u = \\frac{x - 65}{10}$", "$fu$", "$fu^2$"],
      rows: [
        ["30–40", "35", "3", "−3", "−9", "27"],
        ["40–50", "45", "7", "−2", "−14", "28"],
        ["50–60", "55", "12", "−1", "−12", "12"],
        ["60–70", "65", "15", "0", "0", "0"],
        ["70–80", "75", "8", "1", "8", "8"],
        ["80–90", "85", "3", "2", "6", "12"],
        ["90–100", "95", "2", "3", "6", "18"],
        ["Total", "", "50", "", "−15", "105"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1.** Choose $A = 65$ (a central midpoint) and $h = 10$ (the class width), and fill the $u$, $fu$, $fu^2$ columns.\n**Step 2.** Mean: $\\bar x = 65 + 10\\times\\frac{-15}{50} = 65 - 3 = 62$.\n**Step 3.** Coded variance: $\\sigma_u^2 = \\frac{105}{50} - \\left(\\frac{-15}{50}\\right)^2 = 2.1 - 0.09 = 2.01$.\n**Step 4.** Multiply back: $\\sigma_x^2 = 10^2 \\times 2.01 = 201$, so $\\sigma_x = \\sqrt{201} \\approx 14.18$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The step everyone forgets",
      content:
        "$\\sqrt{2.01} \\approx 1.42$ is the SD of the **coded** values $u$, not of the data. A spread of 1.42 for marks between 30 and 100 should look absurd. Multiply the SD by $h$ (or the variance by $h^2$) before you stop. And never multiply the variance by just $h$: variance picks up $h^2$.",
    },
    {
      type: "text",
      content: "**Worked example 2b (application): commute times.** An office surveys 40 employees about their commute. Find the mean and SD.",
    },
    {
      type: "table",
      headers: ["Minutes", "Midpoint $x$", "$f$", "$u = \\frac{x - 25}{10}$", "$fu$", "$fu^2$"],
      rows: [
        ["0–10", "5", "4", "−2", "−8", "16"],
        ["10–20", "15", "10", "−1", "−10", "10"],
        ["20–30", "25", "14", "0", "0", "0"],
        ["30–40", "35", "8", "1", "8", "8"],
        ["40–50", "45", "4", "2", "8", "16"],
        ["Total", "", "40", "", "−2", "50"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1.** Take $A = 25$ (the middle midpoint) and $h = 10$. *Why:* with $A$ in the middle, $u$ runs over the small integers $-2$ to $2$ and the $fu^2$ column stays tiny.\n**Step 2.** Mean: $\\bar x = 25 + 10 \\times \\frac{-2}{40} = 25 - 0.5 = 24.5$ minutes.\n**Step 3.** $\\sigma_u^2 = \\frac{50}{40} - \\left(\\frac{-2}{40}\\right)^2 = 1.25 - 0.0025 = 1.2475$.\n**Step 4.** $\\sigma_x^2 = 10^2 \\times 1.2475 = 124.75$ min², so $\\sigma_x \\approx 11.17$ minutes.\n**Step 5. Sanity check.** The commutes span 0 to 50 minutes, and an SD of about a quarter of that span is believable. A final answer of 1.12 (forgetting $h$) would not be.",
    },
    {
      type: "quiz",
      id: "st2-5-q2",
      variant: "practice",
      question:
        "Classes 0–10, 10–20, 20–30, 30–40, 40–50 have frequencies 5, 10, 20, 10, 5. Using $A = 25$, $h = 10$, you get $\\sum fu = 0$ and $\\sum fu^2 = 60$. What is the variance of the data?",
      options: [
        { text: "120", correct: true, feedback: "$\\sigma_u^2 = \\frac{60}{50} - 0 = 1.2$, then $\\sigma_x^2 = 10^2 \\times 1.2 = 120$." },
        { text: "1.2", feedback: "The trap: that is the variance of the coded $u$ values. Multiply back by $h^2 = 100$." },
        { text: "12", feedback: "Variance scales by $h^2$, not $h$. $1.2 \\times 10$ undercounts by a factor of 10." },
        { text: "10.95", feedback: "That is the SD, $\\sqrt{120}$. The question asks for the variance." },
      ],
      hint: "Find $\\sigma_u^2$ first, then undo the coding.",
    },
    {
      type: "quiz",
      id: "st2-5-q3",
      variant: "concept",
      question: "Why does the assumed mean $A$ not appear anywhere in $\\sigma_x = h\\,\\sigma_u$?",
      options: [
        { text: "Shifting every value by $A$ shifts the mean by $A$ too, so every deviation $x - \\bar x$ is unchanged.", correct: true, feedback: "Spread is built from deviations, and a common shift cancels out of each one." },
        { text: "Because $A$ is usually 0.", feedback: "$A$ was 65 in the example. It vanishes for a structural reason, not because it is small." },
        { text: "It does appear, but it is small enough to ignore.", feedback: "It cancels exactly: $x - \\bar x = (A + hu) - (A + h\\bar u) = h(u - \\bar u)$." },
      ],
    },
    {
      type: "text",
      content:
        "**Working backwards: missing values (JEE favourite).** Knowing $n$, $\\bar x$ and $\\sigma^2$ gives you both $\\sum x = n\\bar x$ and $\\sum x^2 = n(\\sigma^2 + \\bar x^2)$. That is two equations, so two unknown values can be recovered.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Five observations have mean 4.4 and variance 8.24. Three of them are 1, 2 and 6. Find the other two.\n\n**Step 1.** $\\sum x = 5 \\times 4.4 = 22$, so $x + y = 22 - 9 = 13$.\n**Step 2.** $\\sum x^2 = 5(8.24 + 4.4^2) = 5(8.24 + 19.36) = 138$, so $x^2 + y^2 = 138 - 41 = 97$.\n**Step 3.** $2xy = (x + y)^2 - (x^2 + y^2) = 169 - 97 = 72$, so $xy = 36$.\n**Step 4.** $x, y$ are roots of $t^2 - 13t + 36 = 0$, which gives **4 and 9**.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (correcting a wrong entry).** The mean and SD of 20 observations were found to be 10 and 2. Later it was found that the value 8 had been copied as 12. Find the correct mean and SD.\n\n**Step 1. Recover the sums** from the wrong figures: $\\sum x = 20 \\times 10 = 200$ and $\\sum x^2 = 20(2^2 + 10^2) = 2080$.\n**Step 2. Correct both sums.** Take out the wrong 12 and put in the true 8: $\\sum x = 200 - 12 + 8 = 196$; $\\sum x^2 = 2080 - 144 + 64 = 2000$.\n**Step 3. Recompute.** Mean $= \\frac{196}{20} = 9.8$. Variance $= \\frac{2000}{20} - 9.8^2 = 100 - 96.04 = 3.96$, so SD $= \\sqrt{3.96} \\approx 1.99$.\n\nThe usual slip is fixing $\\sum x$ and forgetting that the wrong value is also hiding inside $\\sum x^2$ as its square.",
    },
    {
      type: "quiz",
      id: "st2-5-q4",
      variant: "practice",
      question: "Seven observations have mean 8 and variance 16. Five of them are 2, 4, 10, 12, 14. What are the other two?",
      options: [
        { text: "6 and 8", correct: true, feedback: "$x + y = 56 - 42 = 14$; $x^2 + y^2 = 7(16 + 64) - 460 = 100$; so $xy = \\frac{196 - 100}{2} = 48$, giving 6 and 8." },
        { text: "7 and 7", feedback: "These give the right sum but $49 + 49 = 98 \\ne 100$, so the variance would be wrong." },
        { text: "4 and 10", feedback: "Sum 14 is right, but $16 + 100 = 116 \\ne 100$." },
        { text: "2 and 12", feedback: "Sum 14 again, but $4 + 144 = 148$. Both conditions must hold." },
      ],
      hint: "Use $\\sum x^2 = n(\\sigma^2 + \\bar x^2)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (CBSE/NCERT style): discarding wrong observations.** The mean and SD of 100 observations were 20 and 3. It was later found that three observations, 21, 21 and 18, were wrong and should be discarded. Find the mean and SD of the rest.\n\n**Step 1. Recover the sums.** $\\sum x = 100 \\times 20 = 2000$ and $\\sum x^2 = 100(3^2 + 20^2) = 40900$. *Why:* a mean or an SD cannot be edited directly, but sums can.\n**Step 2. Remove the three values from both sums.** $\\sum x = 2000 - 60 = 1940$ and $\\sum x^2 = 40900 - (441 + 441 + 324) = 39694$. Now $n = 97$.\n**Step 3. Mean.** $\\frac{1940}{97} = 20$, unchanged, because the removed values also average 20.\n**Step 4. Variance.** $\\frac{39694}{97} - 20^2 \\approx 409.216 - 400 = 9.216$, so SD $\\approx 3.036$.\n\nThe SD went *up* slightly. The three discarded values sat close to the mean, so removing them leaves the remaining values relatively more spread out.",
    },
    {
      type: "quiz",
      id: "st2-5-q6",
      variant: "practice",
      question: "Ten observations have mean 6 and variance 4. One observation, equal to 6, turns out to be an error and is removed. What is the variance of the remaining nine?",
      options: [
        { text: "$\\frac{40}{9} \\approx 4.44$", correct: true, feedback: "$\\sum x = 60$, $\\sum x^2 = 10(4 + 36) = 400$. Remove 6: $\\sum x = 54$, $\\sum x^2 = 364$, $n = 9$. Mean 6, variance $\\frac{364}{9} - 36 = \\frac{40}{9}$." },
        { text: "4", feedback: "The total squared deviation stays 40, but it is now shared among 9 values instead of 10, so the variance rises." },
        { text: "0.4", feedback: "That is $\\frac{364}{10} - 36$: you corrected the sums but still divided by 10. Only 9 values remain." },
        { text: "$\\frac{2\\sqrt{10}}{3} \\approx 2.11$", feedback: "That is the new SD. The question asks for the variance." },
      ],
      hint: "Recover $\\sum x$ and $\\sum x^2$, remove the 6, and divide by the new $n$.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "shift-scale-and-cv",
  title: "2.6 · Shift, Scale and the Coefficient of Variation",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A teacher adds 5 grace marks to every student's score. Does the class become more spread out? A scientist converts temperatures from °C to °F. What happens to the SD? These are questions about transforming every value by the same rule $y = a + bx$. The builder below applies it live.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [10, 12, 15, 18, 20],
        range: { min: -60, max: 80 },
        xLabel: "Value",
        view: "dotplot",
        transform: { shift: true, scale: true },
        stats: ["mean", "sd", "variance"],
        caption:
          "Move the shift a: every dot slides and the mean slides with it, while the SD does not change. Move the scale b: the mean scales, and the SD scales by |b|. Try b negative: the picture flips, but the SD is still positive.",
      },
    },
    {
      type: "text",
      content:
        "**Deriving what you saw.** Let $y_i = a + bx_i$.\n\n**Mean.** $\\bar y = \\frac{1}{n}\\sum(a + bx_i) = a + b\\bar x$. The mean follows the rule.\n**Deviations.** $y_i - \\bar y = (a + bx_i) - (a + b\\bar x) = b(x_i - \\bar x)$. The $a$ is gone: shifting everything shifts the centre too, so distances from the centre survive untouched.\n**Variance.** Square and average:",
    },
    {
      type: "math",
      latex: "\\bar y = a + b\\bar x, \\qquad \\sigma_y^2 = b^2\\sigma_x^2, \\qquad \\sigma_y = |b|\\,\\sigma_x",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Adding a constant does not change the spread",
      content:
        "Five grace marks for everyone moves the mean up by 5 and leaves the SD, variance, MD, range and IQR exactly as they were. Spread is about distances between values, and a common shift does not change any distance. Only multiplying (a change of scale) changes spread, and then by the factor $|b|$ (or $b^2$ for variance).",
    },
    {
      type: "quiz",
      id: "st2-6-q1",
      variant: "concept",
      question: "Scores have mean 52 and SD 7. Every score is increased by 10. What are the new mean and SD?",
      options: [
        { text: "Mean 62, SD 7", correct: true, feedback: "The shift moves the centre; every deviation from it is unchanged." },
        { text: "Mean 62, SD 17", feedback: "Adding 10 to every value does not push them further apart, so the SD cannot grow." },
        { text: "Mean 52, SD 7", feedback: "The mean must move: every value went up by 10." },
        { text: "Mean 520, SD 70", feedback: "That treats adding 10 as multiplying by 10. Adding 10 is a shift, not a scale; only multiplication changes the SD." },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Daily temperatures have mean 20 °C and SD 5 °C. Convert to °F using $F = 32 + 1.8C$.\n\n**Step 1.** Here $a = 32$, $b = 1.8$.\n**Step 2.** Mean: $32 + 1.8 \\times 20 = 68$ °F.\n**Step 3.** SD: $1.8 \\times 5 = 9$ °F. The +32 only relocates the zero, so it plays no part.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (negative scale).** $x$ has mean 12 and variance 9. Find the mean and SD of $y = 10 - 3x$.\n\n**Step 1.** $\\bar y = 10 - 3 \\times 12 = -26$.\n**Step 2.** $\\sigma_y^2 = (-3)^2 \\times 9 = 81$, so $\\sigma_y = 9$, not $-9$. A negative $b$ flips the data over, and flipping does not change distances.",
    },
    {
      type: "text",
      content:
        "**Worked example 2b (variance of an AP).** In 2.4 you found that $1, 2, \\dots, n$ has variance $\\frac{n^2 - 1}{12}$. Any AP $a, a + d, a + 2d, \\dots$ with $n$ terms is $y = (a - d) + d\\,x$ applied to $x = 1, 2, \\dots, n$. The shift $a - d$ drops out and the scale is $d$, so:",
    },
    { type: "math", latex: "\\sigma_y^2 = d^2\\cdot\\frac{n^2 - 1}{12}, \\qquad \\sigma_y = |d|\\sqrt{\\frac{n^2 - 1}{12}}" },
    {
      type: "text",
      content:
        "For example, $5, 8, 11, 14, 17$ has $n = 5$, $d = 3$, so $\\sigma^2 = 9 \\times \\frac{24}{12} = 18$. Check: the deviations from 11 are $-6, -3, 0, 3, 6$, whose squares average $\\frac{90}{5} = 18$.",
    },
    {
      type: "quiz",
      id: "st2-6-q2",
      variant: "practice",
      question: "A data set has variance 9. Every value is multiplied by $-2$ and then 3 is added. What is the new variance?",
      options: [
        { text: "36", correct: true, feedback: "$\\sigma_y^2 = (-2)^2 \\times 9 = 36$; the $+3$ has no effect." },
        { text: "−18", feedback: "Variance scales by $b^2$, which is never negative. A negative variance is impossible." },
        { text: "18", feedback: "That scales by $|b|$. The SD scales by $|b|$; the variance scales by $b^2$." },
        { text: "39", feedback: "The added 3 shifts every value and the mean equally, so it does not enter the variance." },
      ],
    },
    {
      type: "text",
      content:
        "**Combining two groups (JEE).** Section 1 has $n_1$ students with mean $\\bar x_1$ and SD $\\sigma_1$; section 2 has $n_2, \\bar x_2, \\sigma_2$. The combined mean is $\\bar x = \\frac{n_1\\bar x_1 + n_2\\bar x_2}{n_1 + n_2}$ (Chapter 1.3). For the variance, use the identity from 2.4, $\\sum (x - a)^2 = \\sum(x - \\bar x_1)^2 + n_1(\\bar x_1 - a)^2$, with $a$ the combined mean. Group 1 contributes $n_1\\sigma_1^2 + n_1 d_1^2$ to the total squared deviation, where $d_1 = \\bar x_1 - \\bar x$. Adding both groups and dividing by $n_1 + n_2$:",
    },
    {
      type: "math",
      latex:
        "\\sigma^2 = \\frac{n_1(\\sigma_1^2 + d_1^2) + n_2(\\sigma_2^2 + d_2^2)}{n_1 + n_2}, \\qquad d_i = \\bar x_i - \\bar x",
    },
    {
      type: "text",
      content:
        "Each group brings its own internal spread $\\sigma_i^2$, plus extra spread $d_i^2$ because its centre is not the combined centre. Averaging the two variances would miss that second part.\n\n**Worked example 3.** Group 1: 40 students, mean 50, SD 6. Group 2: 60 students, mean 60, SD 8.\n\n**Step 1.** $\\bar x = \\frac{40 \\times 50 + 60 \\times 60}{100} = \\frac{5600}{100} = 56$.\n**Step 2.** $d_1 = 50 - 56 = -6$, $d_2 = 60 - 56 = 4$.\n**Step 3.** $\\sigma^2 = \\frac{40(36 + 36) + 60(64 + 16)}{100} = \\frac{2880 + 4800}{100} = 76.8$.\n**Step 4.** $\\sigma = \\sqrt{76.8} \\approx 8.76$. That is larger than both group SDs, because the gap between the two centres adds spread of its own.",
    },
    {
      type: "text",
      content:
        "**Worked example 3b (JEE Main style).** Two data sets, each of size 5, have variances 4 and 5 and means 2 and 4. Find the variance of the combined data.\n\n**Step 1.** Combined mean $\\bar x = \\frac{5 \\times 2 + 5 \\times 4}{10} = 3$. *Why first:* both $d_i$ are measured from it.\n**Step 2.** $d_1 = 2 - 3 = -1$ and $d_2 = 4 - 3 = 1$.\n**Step 3.** $\\sigma^2 = \\frac{5(4 + 1) + 5(5 + 1)}{10} = \\frac{25 + 30}{10} = 5.5$.\n**Step 4. Sense check.** The answer exceeds the plain average of the two variances, 4.5, by exactly the between-group part $\\frac{5 \\cdot 1^2 + 5 \\cdot 1^2}{10} = 1$.",
    },
    {
      type: "quiz",
      id: "st2-6-q3",
      variant: "practice",
      question: "Two groups of 10 have means 10 and 20 and both have variance 4. What is the variance of all 20 values together?",
      options: [
        { text: "29", correct: true, feedback: "Combined mean 15, $d = \\pm 5$. $\\sigma^2 = \\frac{10(4 + 25) + 10(4 + 25)}{20} = 29$." },
        { text: "4", feedback: "That averages the two variances and ignores that the two centres are 10 apart. The gap adds $d^2 = 25$." },
        { text: "8", feedback: "Variances of separate groups do not simply add. Use the combined formula with $d_i$." },
        { text: "25", feedback: "That is only the between-group part. Add each group's own variance of 4." },
      ],
    },
    {
      type: "quiz",
      id: "st2-6-q6",
      variant: "practice",
      question: "Section A: 20 students, mean 12, variance 9. Section B: 30 students, mean 17, variance 4. What is the variance of all 50 students together?",
      options: [
        { text: "12", correct: true, feedback: "Combined mean $\\frac{240 + 510}{50} = 15$, so $d_1 = -3$, $d_2 = 2$. $\\sigma^2 = \\frac{20(9 + 9) + 30(4 + 4)}{50} = \\frac{600}{50} = 12$." },
        { text: "6", feedback: "That is the weighted average of the two variances, $\\frac{180 + 120}{50}$. It misses the extra spread from the two centres being 5 apart." },
        { text: "6.5", feedback: "That is the plain average of 9 and 4. It ignores both the group sizes and the gap between the means." },
        { text: "$2\\sqrt3 \\approx 3.46$", feedback: "That is the combined SD. The question asks for the variance." },
      ],
      hint: "Combined mean first, then $d_i = \\bar x_i - \\bar x$.",
    },
    {
      type: "text",
      content:
        "**Comparing spread across different scales.** Who is more consistent: a batsman averaging 40 with SD 5, or one averaging 50 with SD 8? Raw SDs are unfair here: a spread of 8 runs matters less for someone who averages 50 than it would for someone who averages 10. Divide the spread by the centre to get a unit-free, relative measure.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Coefficient of variation",
      content:
        "$\\text{CV} = \\dfrac{\\sigma}{\\bar x} \\times 100\\%$, the SD as a percentage of the mean. It has no units, so it compares data with different means or different units (kg vs cm). **Lower CV = more consistent (less variable).** Use it for data with a positive mean.",
    },
    {
      type: "table",
      headers: ["", "Mean", "SD", "CV"],
      rows: [
        ["Batsman P", "40", "5", "$\\frac{5}{40}\\times 100 = 12.5\\%$"],
        ["Batsman Q", "50", "8", "$\\frac{8}{50}\\times 100 = 16\\%$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 4.** P is more consistent (12.5% < 16%), while Q scores more on average. Similarly, for a class with heights of mean 160 cm, SD 8 cm (CV 5%) and weights of mean 50 kg, SD 5 kg (CV 10%), weight is the relatively more variable characteristic. Comparing '8 cm' with '5 kg' directly would be meaningless.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (routine, CBSE): means from CVs.** Two distributions have coefficients of variation 60% and 70%, and SDs 21 and 16. Find their means.\n\n**Step 1.** Rearrange $\\text{CV} = \\frac{\\sigma}{\\bar x}\\times 100$ to $\\bar x = \\frac{\\sigma \\times 100}{\\text{CV}}$. *Why rearrange first:* it stops you plugging a number into the wrong slot.\n**Step 2.** First distribution: $\\bar x = \\frac{21 \\times 100}{60} = 35$.\n**Step 3.** Second distribution: $\\bar x = \\frac{16 \\times 100}{70} \\approx 22.86$.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (application): a pay revision.** A company's monthly salaries have mean ₹30,000 and SD ₹4,000. Everyone gets a 10% raise, followed by a flat ₹2,000 allowance. Find the new mean, SD and CV. Did pay become more or less equal in relative terms?\n\n**Step 1. Write the rule.** New salary $y = 2000 + 1.1x$, so $a = 2000$, $b = 1.1$. *Why this form:* the raise multiplies, then the allowance adds.\n**Step 2.** $\\bar y = 2000 + 1.1 \\times 30000 = 35000$, that is ₹35,000.\n**Step 3.** $\\sigma_y = 1.1 \\times 4000 = 4400$, that is ₹4,400. The allowance plays no part.\n**Step 4. CVs.** Before: $\\frac{4000}{30000}\\times 100 \\approx 13.3\\%$. After: $\\frac{4400}{35000}\\times 100 \\approx 12.6\\%$.\n**Step 5. Interpret.** A pure raise ($a = 0$) would leave the CV unchanged, since $\\sigma$ and $\\bar x$ both scale by $b$. The flat allowance lifts the mean without lifting the SD, so relative spread fell: in proportion, salaries became slightly more equal.",
    },
    {
      type: "quiz",
      id: "st2-6-q4",
      variant: "concept",
      question: "Plant A: mean daily output 60 units, SD 12. Plant B: mean 40 units, SD 10. Which plant's output is more consistent?",
      options: [
        { text: "Plant A, CV 20% versus B's 25%.", correct: true, feedback: "$\\frac{12}{60} = 20\\%$ and $\\frac{10}{40} = 25\\%$. Relative to its level, A varies less." },
        { text: "Plant B, because its SD is smaller.", feedback: "With different means, raw SDs mislead. Compare $\\frac{\\sigma}{\\bar x}$ instead." },
        { text: "Plant A, because its mean is larger.", feedback: "The right answer, for the wrong reason. A larger mean alone says nothing about consistency; the CV does." },
        { text: "They are equally consistent.", feedback: "Their CVs are 20% and 25%, which are not equal." },
      ],
    },
    {
      type: "quiz",
      id: "st2-6-q5",
      variant: "practice",
      question: "A distribution has CV 25% and SD 15. What is its mean?",
      options: [
        { text: "60", correct: true, feedback: "$\\bar x = \\frac{\\sigma}{\\text{CV}} = \\frac{15}{0.25} = 60$." },
        { text: "3.75", feedback: "That is $15 \\times 0.25$. Rearrange $\\text{CV} = \\frac{\\sigma}{\\bar x}$ for $\\bar x$." },
        { text: "375", feedback: "That is $15 \\times 25$: you multiplied, and used 25 instead of 0.25. Rearrange $\\text{CV} = \\frac{\\sigma}{\\bar x}$ to $\\bar x = \\frac{\\sigma}{\\text{CV}} = \\frac{15}{0.25}$." },
        { text: "40", feedback: "Check: $\\frac{15}{40} = 37.5\\%$, not 25%." },
      ],
    },
    {
      type: "quiz",
      id: "st2-6-q7",
      variant: "practice",
      question: "Marks have mean 50 and SD 10. Every mark is converted by $y = 1.2x + 5$. What are the new SD and CV?",
      options: [
        { text: "SD 12, CV ≈ 18.5%", correct: true, feedback: "$\\bar y = 1.2 \\times 50 + 5 = 65$ and $\\sigma_y = 1.2 \\times 10 = 12$, so CV $= \\frac{12}{65}\\times 100 \\approx 18.5\\%$." },
        { text: "SD 17, CV ≈ 26.2%", feedback: "You added the 5 to the SD. A shift moves every value equally and leaves the SD alone: $\\sigma_y = 1.2 \\times 10$." },
        { text: "SD 12, CV 20%", feedback: "The SD is right, but the CV stays at 20% only under pure scaling. The $+5$ raises the mean to 65, so CV $= \\frac{12}{65}$." },
        { text: "SD 10, CV ≈ 15.4%", feedback: "Multiplying by 1.2 stretches every gap, so the SD becomes 12, not 10." },
      ],
      hint: "Find $\\bar y$ and $\\sigma_y$ separately, then divide.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-2-mastery",
  title: "2.7 · Chapter 2 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Every measure in this chapter answers one question: **how far is a typical value from the centre?** The questions below mix raw, frequency and grouped data with the transformation rules. Work each one on paper before you pick an option.",
    },
    {
      type: "callout",
      variant: "info",
      title: "The chapter in five lines",
      content:
        "1. Range $= x_{\\max} - x_{\\min}$: quick, but it listens to just two values.\n2. IQR $= Q_3 - Q_1$: the middle half's width, immune to extremes. Grouped quartiles use the median formula with $\\frac{N}{4}$, $\\frac{3N}{4}$.\n3. MD $= \\frac1n\\sum|x - a|$, smallest when $a$ is the median.\n4. $\\sigma^2 = \\frac1n\\sum(x - \\bar x)^2 = \\frac{\\sum x^2}{n} - \\bar x^2$; step deviation gives $\\sigma_x = h\\sigma_u$.\n5. $y = a + bx$: $\\bar y = a + b\\bar x$, $\\sigma_y = |b|\\sigma_x$. CV $= \\frac{\\sigma}{\\bar x}\\times 100$ compares relative spread.",
    },
    {
      type: "quiz",
      id: "st2-7-q1",
      variant: "mastery",
      question:
        "Classes 0–20, 20–40, 40–60, 60–80, 80–100 have frequencies 4, 6, 10, 6, 4. Using step deviation with $A = 50$, $h = 20$, find the variance.",
      options: [
        { text: "$\\approx 586.7$", correct: true, feedback: "$u = -2, \\dots, 2$: $\\sum fu = 0$, $\\sum fu^2 = 44$, $N = 30$. $\\sigma_u^2 = \\frac{44}{30}$, so $\\sigma_x^2 = 400 \\times \\frac{44}{30} \\approx 586.7$." },
        { text: "$\\approx 1.47$", feedback: "That is $\\sigma_u^2$. Multiply back by $h^2 = 400$." },
        { text: "$\\approx 29.3$", feedback: "That multiplies by $h$ instead of $h^2$." },
        { text: "$\\approx 24.2$", feedback: "That is the SD, $\\sqrt{586.7}$. The question asks for the variance." },
      ],
      hint: "Fill in $u$, $fu$, $fu^2$ first.",
    },
    {
      type: "quiz",
      id: "st2-7-q2",
      variant: "mastery",
      question:
        "Ten observations have mean 20 and variance 9. It is then discovered that one value, 15, was copied as 25. What is the correct variance?",
      options: [
        { text: "8", correct: true, feedback: "Wrong sums: $\\sum x = 200$, $\\sum x^2 = 10(9 + 400) = 4090$. Correct them: $\\sum x = 190$, $\\sum x^2 = 4090 - 625 + 225 = 3690$. New mean 19, variance $369 - 361 = 8$." },
        { text: "9", feedback: "Replacing a value changes both $\\sum x$ and $\\sum x^2$, so the variance changes." },
        { text: "−31", feedback: "You corrected $\\sum x^2$ but kept the old mean 20: $369 - 400$. Correct the mean too. A negative variance is a signal something is inconsistent." },
        { text: "48", feedback: "You corrected the mean to 19 but kept the wrong $\\sum x^2 = 4090$: $409 - 361 = 48$. The miscopied 25 also sits inside $\\sum x^2$ as 625; swap it for 225." },
      ],
      hint: "Recover $\\sum x$ and $\\sum x^2$ from the wrong mean and variance, fix them, then recompute.",
    },
    {
      type: "quiz",
      id: "st2-7-q3",
      variant: "mastery",
      question: "$x$ has mean 12 and SD 3. What are the mean and SD of $y = 5 - 2x$?",
      options: [
        { text: "Mean $-19$, SD 6", correct: true, feedback: "$\\bar y = 5 - 24 = -19$ and $\\sigma_y = |-2| \\times 3 = 6$." },
        { text: "Mean $-19$, SD $-6$", feedback: "An SD is never negative: it scales by $|b|$." },
        { text: "Mean $-19$, SD 11", feedback: "You applied the shift to the SD ($5 + 2 \\cdot 3$). The $+5$ moves every value equally, so it does not affect spread: $\\sigma_y = |-2| \\times 3 = 6$." },
        { text: "Mean 29, SD 6", feedback: "$5 - 2(12) = -19$, not $5 + 2(12)$." },
      ],
    },
    {
      type: "quiz",
      id: "st2-7-q4",
      variant: "mastery",
      question: "Share X has mean price ₹200 with SD ₹20. Share Y has mean price ₹50 with SD ₹8. Which is relatively more stable?",
      options: [
        { text: "X, CV 10% against Y's 16%.", correct: true, feedback: "$\\frac{20}{200} = 10\\%$, $\\frac{8}{50} = 16\\%$. Lower CV means relatively steadier." },
        { text: "Y, because its SD is smaller.", feedback: "With means this different, the raw SD is not a fair comparison. Use the CV." },
        { text: "They are equally stable.", feedback: "The CVs are 10% and 16%." },
      ],
    },
    {
      type: "quiz",
      id: "st2-7-q5",
      variant: "mastery",
      question: "Monthly household incomes in a town are heavily right-skewed by a handful of very rich families. Which pair best summarises centre and spread?",
      options: [
        { text: "Median and IQR", correct: true, feedback: "Both ignore the extreme tail, so they describe the typical household." },
        { text: "Mean and SD", feedback: "Both are dragged upward by the few huge incomes, and SD is inflated further by squaring their large deviations." },
        { text: "Mean and range", feedback: "The range is set entirely by the richest and poorest households, the worst choice here." },
        { text: "Mode and variance", feedback: "Variance is the most outlier-sensitive of all, and it is in squared rupees." },
      ],
    },
    {
      type: "quiz",
      id: "st2-7-q6",
      variant: "mastery",
      question: "For 2, 4, 5, 7, 9, 10, 12, 15, 18, using the median-of-halves rule, find the IQR.",
      options: [
        { text: "9", correct: true, feedback: "Median 9 (left out). Lower half 2, 4, 5, 7 gives $Q_1 = 4.5$; upper half 10, 12, 15, 18 gives $Q_3 = 13.5$. IQR $= 9$." },
        { text: "16", feedback: "That is the range, $18 - 2$." },
        { text: "7", feedback: "You kept the median 9 in both halves ($Q_1 = 5$, $Q_3 = 12$). The course rule leaves it out when $n$ is odd: $Q_1 = 4.5$, $Q_3 = 13.5$." },
        { text: "4.5", feedback: "That is $Q_1$ (or the semi-IQR). The IQR is $Q_3 - Q_1$." },
      ],
    },
    {
      type: "quiz",
      id: "st2-7-q7",
      variant: "mastery",
      question: "Five observations have mean 5 and variance 4. Three of them are 2, 4 and 6. What are the other two?",
      options: [
        { text: "5 and 8", correct: true, feedback: "$x + y = 25 - 12 = 13$; $x^2 + y^2 = 5(4 + 25) - 56 = 89$; $xy = \\frac{169 - 89}{2} = 40$, giving 5 and 8." },
        { text: "6 and 7", feedback: "Sum 13 is right, but $36 + 49 = 85 \\ne 89$." },
        { text: "4 and 9", feedback: "Sum 13, but $16 + 81 = 97 \\ne 89$." },
        { text: "3 and 10", feedback: "Sum 13, but $9 + 100 = 109 \\ne 89$." },
      ],
    },
    {
      type: "quiz",
      id: "st2-7-q8",
      variant: "mastery",
      question: "For the data 1, 2, 3, 4, 100, which statement is true?",
      options: [
        { text: "The MD about the median is smaller than the MD about the mean.", correct: true, feedback: "Median 3: distances 2, 1, 0, 1, 97 total 101, MD 20.2. Mean 22: distances 21, 20, 19, 18, 78 total 156, MD 31.2." },
        { text: "The SD is smaller than the MD about the mean.", feedback: "The SD is never smaller than the MD about the mean; squaring weights the 100 even more heavily." },
        { text: "The IQR is less than 5, because quartiles ignore the 100.", feedback: "With only 5 values the upper half is just 4 and 100, so $Q_3 = 52$ and the IQR is $52 - 1.5 = 50.5$. The IQR resists outliers on larger data sets, not on tiny ones." },
        { text: "Adding 10 to every value increases the SD by 10.", feedback: "Shifting never changes the SD." },
      ],
    },
    {
      type: "quiz",
      id: "st2-7-q9",
      variant: "mastery",
      question: "What is the variance of $2, 4, 6, \\dots, 20$?",
      options: [
        { text: "33", correct: true, feedback: "It is $2x$ for $x = 1, \\dots, 10$. $\\sigma_x^2 = \\frac{10^2 - 1}{12} = 8.25$, so $\\sigma^2 = 2^2 \\times 8.25 = 33$." },
        { text: "8.25", feedback: "That is the variance of $1, 2, \\dots, 10$. Doubling every value multiplies the variance by $2^2 = 4$." },
        { text: "16.5", feedback: "You multiplied the variance by $d = 2$. Variance scales by $d^2 = 4$." },
        { text: "$\\sqrt{33} \\approx 5.74$", feedback: "That is the SD. The question asks for the variance." },
      ],
      hint: "Write each term as $d \\cdot k$ and use $\\frac{n^2 - 1}{12}$ for $k = 1, \\dots, n$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Centre and spread together describe a distribution. Chapter 3 adds shape, finds outliers using the IQR fences, and uses $z = \\frac{x - \\bar x}{\\sigma}$ to place a single value inside its distribution.",
    },
  ]),
};

export const statisticsChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
