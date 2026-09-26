import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Statistics Chapter 3 — Shape, Position and Comparison.
 * Centre and spread combine into shape; a z-score places one value inside
 * its distribution; 1.5·IQR fences flag unusual values; and a four-part
 * comparison (centre, spread, shape, unusual values) compares groups fairly.
 * Conventions follow the rest of the course: SD divides by n, and quartiles
 * use the median-of-halves rule (the median is left out of both halves
 * when n is odd).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

/** Daily study minutes for 15 students (lesson 3.2). */
const STUDY_MINUTES = [12, 18, 20, 22, 25, 25, 28, 30, 32, 35, 38, 40, 45, 52, 58];

/** The same survey with two heavier studiers at the top (lesson 3.3). */
const STUDY_MINUTES_OUTLIER = [12, 18, 20, 22, 25, 25, 28, 30, 32, 35, 38, 40, 45, 60, 75];

/** Two sections, same mean mark (32 out of 50), very different stories (lesson 3.5). */
const SECTION_A = [18, 22, 25, 27, 28, 30, 31, 32, 33, 34, 35, 36, 38, 44, 47];
const SECTION_B = [4, 7, 21, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43];

// ---------------------------------------------------------------------------
// 3.1 · The Shape of a Distribution
// ---------------------------------------------------------------------------

const lesson01: LessonSeed = {
  slug: "shape-of-a-distribution",
  title: "3.1 · The Shape of a Distribution",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/st-3-shape-position-and-comparison.mp4",
      poster: "/videos/st-3-shape-position-and-comparison.jpg",
      title: "Chapter 3 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Chapters 1 and 2 gave you two numbers for any data set: a **centre** (mean, median, mode) and a **spread** (range, IQR, SD). Two numbers can still hide a lot. A class whose marks are spread evenly from 30 to 90 and a class split into two clusters around 43 and 77 can share both: mean 60, SD about 17. The piece that is missing is the **shape**: where the data pile up, and which way they trail off.",
    },
    {
      type: "text",
      content:
        "Imagine drawing a histogram of a very large data set with narrow bars and then smoothing the tops into a curve. That smooth outline is the shape. Area under it stands for the share of the data in a region, so the total area is 1. Flip through five shapes that come up again and again.",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          {
            label: "Symmetric (bell)",
            expr: "exp(-(x-5)^2/2)/sqrt(2*pi)",
            latex: "\\tfrac{1}{\\sqrt{2\\pi}}\\,e^{-(x-5)^2/2}",
            excluded: [],
          },
          {
            label: "Right-skewed",
            expr: "x*exp(-x/1.5)/2.25",
            latex: "\\tfrac{x}{2.25}\\,e^{-x/1.5}",
            excluded: [],
          },
          {
            label: "Left-skewed",
            expr: "(10-x)*exp(-(10-x)/1.5)/2.25",
            latex: "\\tfrac{10-x}{2.25}\\,e^{-(10-x)/1.5}",
            excluded: [],
          },
          {
            label: "Uniform (flat)",
            expr: "(1/6)/(1+(abs(x-5)/3)^40)",
            latex: "\\tfrac{1}{6} \\text{ on } [2, 8] \\text{ (edges smoothed)}",
            excluded: [],
          },
          {
            label: "Bimodal",
            expr: "0.5*exp(-(x-3)^2/1.28)/(0.8*sqrt(2*pi)) + 0.5*exp(-(x-7)^2/1.28)/(0.8*sqrt(2*pi))",
            latex: "\\text{an equal mix of two bells, centred at } 3 \\text{ and } 7",
            excluded: [],
          },
        ],
        window: { xmin: 0, xmax: 10, ymin: 0, ymax: 0.45 },
      },
    },
    {
      type: "text",
      content:
        "Look at the right-skewed curve. Its **peak** is on the *left*, near $x = 1.5$. What sits on the right is a long, thin **tail** that drags out towards 10. The left-skewed curve is its mirror image: peak on the right, tail to the left.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The five basic shapes",
      content:
        "**Symmetric:** the left half mirrors the right half about the centre.\n**Right-skewed (positively skewed):** a long tail stretches to the right, towards large values.\n**Left-skewed (negatively skewed):** a long tail stretches to the left, towards small values.\n**Uniform:** roughly flat; every region of equal width holds about the same share.\n**Bimodal:** two clear peaks, often a sign that two different groups have been mixed together.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The tail names the skew",
      content:
        "Skew is named after the direction of the **tail**, not the peak. A right-skewed distribution has its peak on the *left* and its long tail on the *right*. If it helps, think of skew as the direction in which the data are being stretched.",
    },
    {
      type: "quiz",
      id: "st3-1-q1",
      variant: "concept",
      question:
        "A histogram of reaction times has a tall peak at about 250 ms and a long thin tail running out to 900 ms. How is it skewed?",
      options: [
        {
          text: "Right-skewed: the long tail points towards the large values.",
          correct: true,
          feedback: "The tail gives the name. Here it stretches to the right, so the distribution is right-skewed (positively skewed).",
        },
        {
          text: "Left-skewed: the peak is on the left.",
          feedback: "This is the classic mix-up. The peak sits on the left *because* the tail is on the right. Skew is named after the tail.",
        },
        {
          text: "Symmetric: there is only one peak.",
          feedback: "Having one peak makes it unimodal. It is not symmetric, because one side trails off much further than the other.",
        },
      ],
      hint: "Find the long thin part of the picture and ask which way it points.",
    },
    {
      type: "text",
      content:
        "### Where do these shapes come from?\n\nShape is usually explained by what produced the data. A hard floor or ceiling squashes one side and leaves a tail on the other. A few extreme but possible values stretch one side.",
    },
    {
      type: "table",
      headers: ["Data", "Typical shape", "Why"],
      rows: [
        ["Monthly household incomes", "Right-skewed", "Incomes cannot go below 0, but a few households earn many times the typical amount."],
        ["Reaction times", "Right-skewed", "There is a physical minimum (about 150 ms), but a distracted moment can take a second or more."],
        ["Marks on an easy test out of 100", "Left-skewed", "Most students bunch near the ceiling of 100; a few who struggled trail off to the left."],
        ["Age at death in a country with good health care", "Left-skewed", "Most people die old; early deaths form a thin left tail."],
        ["Heights of adult women", "Roughly symmetric", "Many small, independent effects push up and down about equally."],
        ["Outcomes of a fair die rolled many times", "Uniform", "Each face is equally likely."],
        ["Heights of a mixed group of adults and 10-year-olds", "Bimodal", "Two different groups, each with its own peak."],
      ],
    },
    {
      type: "text",
      content:
        "### Shape decides the order of mean, median and mode\n\nIn Chapter 1 you met the mean as the **balance point** and the median as the **middle position**. That difference is all you need.\n\nTake a right-skewed data set and stretch its largest value further to the right. The median does not move, because the middle position is still the same value. The mean *does* move: a value far from the balance point has a long lever arm, so the balance point has to slide towards it. The mode stays at the peak.\n\nSo in a right-skewed distribution the tail pulls the mean furthest, the median a little, and the mode not at all.",
    },
    {
      type: "table",
      headers: ["Shape", "Usual order", "Picture"],
      rows: [
        ["Symmetric, one peak", "mean $=$ median $=$ mode", "All three at the centre of symmetry"],
        ["Right-skewed", "mode $<$ median $<$ mean", "The mean is pulled out into the right tail"],
        ["Left-skewed", "mean $<$ median $<$ mode", "The mean is pulled out into the left tail"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Quick diagnostic",
      content:
        "Mean well above the median suggests a right tail; mean well below the median suggests a left tail. This is why news reports quote the **median** income: the mean is inflated by a handful of very high earners.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — reading shape from raw data.** The number of books eight friends read last year: $2, 3, 3, 3, 4, 5, 9, 15$.\n\n**Step 1 (mode).** 3 appears most often, so the mode is 3.\n\n**Step 2 (median).** $n = 8$, so the median is the average of the 4th and 5th values: $\\frac{3 + 4}{2} = 3.5$.\n\n**Step 3 (mean).** $\\Sigma x = 44$, so $\\bar{x} = \\frac{44}{8} = 5.5$.\n\n**Step 4 (conclude).** mode $3 <$ median $3.5 <$ mean $5.5$. The values 9 and 15 form a right tail and drag the mean up. The distribution is right-skewed.",
    },
    {
      type: "text",
      content:
        "Karl Pearson turned this gap into a number. Dividing by the SD makes it unit-free, so data measured in rupees and data measured in minutes can be compared.",
    },
    {
      type: "math",
      latex: "\\text{Sk}_P = \\frac{3(\\bar{x} - \\text{median})}{\\sigma}",
    },
    {
      type: "text",
      content:
        "For the books data, $\\sigma^2 = \\frac{\\Sigma (x - 5.5)^2}{8} = \\frac{12.25 + 3(6.25) + 2.25 + 0.25 + 12.25 + 90.25}{8} = \\frac{136}{8} = 17$, so $\\sigma = \\sqrt{17} \\approx 4.12$ and $\\text{Sk}_P = \\frac{3(5.5 - 3.5)}{4.12} \\approx 1.46$. Positive means right-skewed, negative means left-skewed, and 0 means no skew by this measure.",
    },
    {
      type: "text",
      content:
        "You met Pearson's empirical rule of thumb in Lesson 1.6. For a **moderately** skewed distribution it connects the three centres:",
    },
    {
      type: "math",
      latex: "\\text{mode} \\approx 3\\,\\text{median} - 2\\,\\text{mean}",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — incomes.** In a town, the mean monthly income is ₹42 thousand and the median is ₹38 thousand.\n\n**Step 1.** Mean $>$ median, so the tail is on the right: right-skewed.\n\n**Step 2.** Estimated mode $\\approx 3(38) - 2(42) = 114 - 84 = 30$, i.e. about ₹30 thousand.\n\n**Step 3 (check).** $30 < 38 < 42$: mode $<$ median $<$ mean, exactly the right-skew order.\n\n**Worked example 3 — an easy test.** Mean 71, median 76. Now mean $<$ median, so the test scores are left-skewed (bunched near the top). Estimated mode $\\approx 3(76) - 2(71) = 228 - 142 = 86$, and $71 < 76 < 86$ is the left-skew order.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Rules of thumb, not laws",
      content:
        "The ordering and the empirical relation hold for smooth, single-peaked, moderately skewed distributions. Small or lumpy data sets can break them. The books data, for example, give $3(3.5) - 2(5.5) = -0.5$, which is nothing like the true mode of 3. Also, mean $=$ median does *not* prove symmetry: a symmetric bimodal distribution has mean $=$ median but no single central mode, and some lopsided data sets happen to have mean $=$ median too. Always look at the picture.",
    },
    {
      type: "quiz",
      id: "st3-1-q2",
      variant: "practice",
      question: "For a distribution of house prices, which ordering would you expect?",
      options: [
        {
          text: "mode $<$ median $<$ mean",
          correct: true,
          feedback: "Prices have a floor but a few mansions stretch a long right tail. That tail pulls the mean above the median.",
        },
        {
          text: "mean $<$ median $<$ mode",
          feedback: "That is the left-skew order. House prices trail off towards very large values, not very small ones.",
        },
        {
          text: "mean $=$ median $=$ mode",
          feedback: "That needs a symmetric, single-peaked shape. Prices are strongly right-skewed.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-1-q3",
      variant: "practice",
      question:
        "A moderately skewed distribution has mean 60 and median 57. Estimate its mode with the empirical relation.",
      options: [
        {
          text: "51",
          correct: true,
          feedback: "$3(57) - 2(60) = 171 - 120 = 51$. And $51 < 57 < 60$ is the right-skew order, as mean $>$ median promised.",
        },
        {
          text: "63",
          feedback: "That is $3(60) - 2(57)$: the roles of mean and median are swapped. It is 3 × *median* − 2 × *mean*.",
        },
        {
          text: "54",
          feedback: "Recompute: $3 \\times 57 = 171$ and $2 \\times 60 = 120$.",
        },
        {
          text: "58.5",
          feedback: "That is just the average of mean and median. The empirical relation weights them 3 and −2.",
        },
      ],
      hint: "mode ≈ 3·median − 2·mean.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — exam style (two parts).**\n\n**(a)** In a moderately skewed distribution the mean is 34.5 and the mode is 32.1. Find the median.\n\n**Step 1 (rearrange first).** From $\\text{mode} = 3\\,\\text{median} - 2\\,\\text{mean}$ we get $\\text{median} = \\frac{\\text{mode} + 2\\,\\text{mean}}{3}$. *Why this step:* the median is the unknown, so isolate it before putting in numbers. That leaves less room for arithmetic slips.\n\n**Step 2 (substitute).** $\\text{median} = \\frac{32.1 + 2(34.5)}{3} = \\frac{32.1 + 69}{3} = \\frac{101.1}{3} = 33.7$.\n\n**Step 3 (sense check).** $32.1 < 33.7 < 34.5$, so mode $<$ median $<$ mean, the right-skew order. *Why this step:* the relation puts the median between the mode and the mean, one third of the way from the mean towards the mode: $34.5 - \\frac{34.5 - 32.1}{3} = 34.5 - 0.8 = 33.7$. If your answer lands outside that gap, you have swapped a coefficient.\n\n**(b)** A distribution has mean 40, coefficient of variation 20% and Pearson's coefficient of skewness $\\text{Sk}_P = 0.6$. Find the median.\n\n**Step 1 (get the SD from the CV).** $\\text{CV} = \\frac{\\sigma}{\\bar{x}} \\times 100$, so $\\sigma = \\frac{20 \\times 40}{100} = 8$. *Why this step:* $\\text{Sk}_P$ needs $\\sigma$, and the CV is where the question has hidden it.\n\n**Step 2 (solve for the median).** $0.6 = \\frac{3(40 - \\text{median})}{8}$, so $40 - \\text{median} = \\frac{0.6 \\times 8}{3} = 1.6$ and the median is $38.4$.\n\n**Step 3 (sense check).** A positive coefficient needs mean $>$ median, and $40 > 38.4$. ✓",
    },
    {
      type: "quiz",
      id: "st3-1-q6",
      variant: "practice",
      question:
        "In a moderately skewed distribution of food-delivery times, the mean is 50 min and the mode is 44 min. Estimate the median.",
      options: [
        {
          text: "48 min",
          correct: true,
          feedback: "$\\text{median} = \\frac{\\text{mode} + 2\\,\\text{mean}}{3} = \\frac{44 + 100}{3} = \\frac{144}{3} = 48$. It sits one third of the way from the mean (50) towards the mode (44).",
        },
        {
          text: "47 min",
          feedback: "That is the plain average of mean and mode. The median sits closer to the mean, not halfway.",
        },
        {
          text: "46 min",
          feedback: "That is $\\frac{2(44) + 50}{3}$: the weights are swapped. The mean gets weight 2.",
        },
        {
          text: "62 min",
          feedback: "That is $3(50) - 2(44)$, which is not the relation. Rearrange $\\text{mode} = 3\\,\\text{median} - 2\\,\\text{mean}$ for the median.",
        },
      ],
      hint: "Rearrange mode = 3·median − 2·mean to make the median the subject.",
    },
    {
      type: "quiz",
      id: "st3-1-q7",
      variant: "practice",
      question:
        "A distribution has mean 60, coefficient of variation 25% and $\\text{Sk}_P = -0.4$. Find the median.",
      options: [
        {
          text: "62",
          correct: true,
          feedback: "$\\sigma = 0.25 \\times 60 = 15$. Then $-0.4 = \\frac{3(60 - \\text{median})}{15}$, so $60 - \\text{median} = -2$ and the median is 62. Negative skew means the median is above the mean. ✓",
        },
        {
          text: "58",
          feedback: "The sign has been dropped. A negative coefficient means the mean is *below* the median.",
        },
        {
          text: "66",
          feedback: "That uses $60 + 0.4 \\times 15$ and forgets the factor 3 in $\\text{Sk}_P = \\frac{3(\\bar{x} - \\text{median})}{\\sigma}$.",
        },
        {
          text: "63.3",
          feedback: "That uses 25 as the SD. The CV is a percentage of the mean: $\\sigma = 25\\% \\times 60 = 15$.",
        },
      ],
      hint: "First σ = CV × mean ÷ 100, then solve Sk_P for the median.",
    },
    {
      type: "quiz",
      id: "st3-1-q4",
      variant: "concept",
      question: "A data set has mean exactly equal to its median. What can you conclude?",
      options: [
        {
          text: "Nothing certain about shape; you need to look at the distribution.",
          correct: true,
          feedback: "Symmetric data do have mean = median, but the converse fails. Bimodal and some lopsided data sets can also have mean = median.",
        },
        {
          text: "It is symmetric.",
          feedback: "Symmetric implies mean = median, but not the other way round. The lopsided set $1, 2, 3, 3, 6$ has mean $15/5 = 3$ and median 3, yet its right side stretches to 6 and its left only to 1.",
        },
        {
          text: "It has no skew and exactly one mode.",
          feedback: "A symmetric bimodal distribution has mean = median and two modes.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-1-q5",
      variant: "practice",
      question:
        "Pearson's coefficient of skewness for a data set is $-0.8$. Which description fits?",
      options: [
        {
          text: "Left-skewed: the mean sits below the median, pulled by a tail of small values.",
          correct: true,
          feedback: "$\\text{Sk}_P = 3(\\bar{x} - \\text{median})/\\sigma < 0$ exactly when $\\bar{x} <$ median.",
        },
        {
          text: "Right-skewed, because the magnitude 0.8 is positive.",
          feedback: "The sign is the whole message. Negative means mean below median, a left tail.",
        },
        {
          text: "Impossible: a coefficient of skewness cannot be negative.",
          feedback: "It can. It is negative whenever the mean is less than the median.",
        },
      ],
    },
  ]),
};

// ---------------------------------------------------------------------------
// 3.2 · Five-Number Summary and Boxplots
// ---------------------------------------------------------------------------

const lesson02: LessonSeed = {
  slug: "five-number-summary-and-boxplots",
  title: "3.2 · Five-Number Summary and Boxplots",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A histogram shows shape well but takes up room, and its look depends on the bin width you chose. Sometimes you want a compact sketch that you can draw from five numbers and stack next to another group's. That sketch is the **boxplot** (box-and-whisker plot).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Five-number summary",
      content:
        "$\\text{min},\\ Q_1,\\ \\text{median},\\ Q_3,\\ \\text{max}$\nThe quartiles cut the ordered data into four parts with roughly a quarter of the values in each. We use the median-of-halves rule from lesson 2.2: split the ordered data at the median ($Q_2$), leaving the median out of both halves when $n$ is odd. $Q_1$ is the median of the lower half and $Q_3$ the median of the upper half.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — build a boxplot by hand.** Fifteen students logged their daily study time in minutes:\n\n$12,\\ 18,\\ 20,\\ 22,\\ 25,\\ 25,\\ 28,\\ 30,\\ 32,\\ 35,\\ 38,\\ 40,\\ 45,\\ 52,\\ 58$\n\n**Step 1 (order the data).** Already done. $n = 15$.\n\n**Step 2 (median).** Position $\\frac{n+1}{2} = 8$, so the median is the 8th value, **30**.\n\n**Step 3 ($Q_1$).** Lower half = the 7 values before the median: $12, 18, 20, 22, 25, 25, 28$. Its middle (4th) value is **22**.\n\n**Step 4 ($Q_3$).** Upper half = the 7 values after the median: $32, 35, 38, 40, 45, 52, 58$. Its middle value is **40**.\n\n**Step 5 (extremes).** min $= 12$, max $= 58$.\n\n**Step 6 (draw).** Draw a number line. Draw a box from $Q_1 = 22$ to $Q_3 = 40$, with a line across it at the median, 30. Draw whiskers from the box out to 12 and to 58.",
    },
    {
      type: "table",
      headers: ["min", "$Q_1$", "median", "$Q_3$", "max", "IQR"],
      rows: [["12", "22", "30", "40", "58", "$40 - 22 = 18$"]],
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: STUDY_MINUTES,
        range: { min: 0, max: 80 },
        xLabel: "Study time (minutes per day)",
        view: "dotplot",
        views: ["dotplot", "boxplot"],
        stats: ["median", "q1", "q3", "iqr", "mean"],
        caption:
          "The same 15 students as dots and as a box. Switch views, then drag a dot. Moving the top value from 58 to 78 stretches the whisker but leaves the box untouched. Moving a dot across the median can shift the box.",
      },
    },
    {
      type: "text",
      content:
        "Try it: drag the 58 far to the right. Only the right whisker changes. Now drag 32 down to 26. It crosses the median, and the median line jumps from 30 to 28. A boxplot is built from **positions** in the ordered list. A value only matters when it changes which value sits at one of those positions.",
    },
    {
      type: "callout",
      variant: "info",
      title: "What each piece holds",
      content:
        "The four pieces are: left whisker (min to $Q_1$), left part of the box ($Q_1$ to median), right part of the box (median to $Q_3$), right whisker ($Q_3$ to max). Each holds **about 25%** of the data. The whole box is the middle 50%, and its length is the IQR.",
    },
    {
      type: "quiz",
      id: "st3-2-q1",
      variant: "concept",
      question:
        "In the study-time boxplot the right whisker (40 to 58) is almost twice as long as the left whisker (12 to 22). Which whisker covers more students?",
      options: [
        {
          text: "About the same: each whisker covers roughly a quarter of the students.",
          correct: true,
          feedback: "Length shows how **spread out** that quarter is, not how many values it holds. The top quarter is stretched out; the bottom quarter is packed tightly.",
        },
        {
          text: "The right whisker, because it is longer.",
          feedback: "This is the trap. A boxplot's pieces are drawn by position, so each holds about 25% however long it is. A longer piece means the same number of values spread more thinly.",
        },
        {
          text: "The left whisker, because short means crowded and crowded means more.",
          feedback: "Short does mean crowded, but crowded does not mean more values. Both whiskers hold about a quarter.",
        },
      ],
    },
    {
      type: "text",
      content:
        "### Reading shape from a boxplot\n\nBecause every piece holds the same share, piece **length** measures how thinly that share is spread. A stretched right side (longer right whisker, median nearer $Q_1$) means the upper values are spread out: a right tail. For study time, median $- Q_1 = 8$ while $Q_3 -$ median $= 10$, and the whiskers are 10 and 18. Everything points to a right skew, and indeed mean $32 >$ median $30$.",
    },
    {
      type: "text",
      content:
        "### Putting a number on boxplot skew\n\nThe box itself gives a measure of skewness that uses only quartiles, so it is resistant to outliers. **Bowley's coefficient** compares the two halves of the box:\n$\\displaystyle \\text{Sk}_B = \\frac{(Q_3 - \\text{median}) - (\\text{median} - Q_1)}{Q_3 - Q_1} = \\frac{Q_3 + Q_1 - 2\\,\\text{median}}{Q_3 - Q_1}$\nIt is 0 when the median sits in the middle of the box, positive when the upper half is longer (right skew), and negative when the lower half is longer (left skew). It always lies between $-1$ and $1$.\n\nFor study time: $\\text{Sk}_B = \\frac{40 + 22 - 2(30)}{40 - 22} = \\frac{2}{18} \\approx 0.11$. The value is small and positive, a mild right skew, which agrees with the whisker reading. Pearson's $\\text{Sk}_P$ from Lesson 3.1 uses the mean and SD; Bowley's uses the quartiles and median, so it ignores the tails and any outliers.",
    },
    {
      type: "table",
      headers: ["Boxplot looks like", "Shape"],
      rows: [
        ["Median near the centre of the box, whiskers about equal", "Roughly symmetric"],
        ["Median nearer $Q_1$, longer right whisker", "Right-skewed"],
        ["Median nearer $Q_3$, longer left whisker", "Left-skewed"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 2 — even $n$.** Weekly pocket money (₹ tens) for 10 children: $4, 7, 8, 10, 11, 13, 15, 16, 20, 26$.\n\n**Step 1 (median).** $n = 10$, so the median is the average of the 5th and 6th values: $\\frac{11 + 13}{2} = 12$.\n\n**Step 2 (halves).** With $n$ even, the halves are simply the first five and the last five values. Lower half $4, 7, 8, 10, 11$ gives $Q_1 = 8$. Upper half $13, 15, 16, 20, 26$ gives $Q_3 = 16$.\n\n**Step 3 (summary).** $4,\\ 8,\\ 12,\\ 16,\\ 26$ with IQR $= 8$.\n\n**Step 4 (read shape).** The box is perfectly balanced ($12 - 8 = 16 - 12 = 4$), but the right whisker (10) is much longer than the left whisker (4). The middle half is symmetric, but the top quarter trails off: a mild right skew coming from the tail.",
    },
    {
      type: "quiz",
      id: "st3-2-q2",
      variant: "practice",
      question: "Find the five-number summary of $3, 5, 6, 8, 9, 11, 14, 15, 21$.",
      options: [
        {
          text: "$3,\\ 5.5,\\ 9,\\ 14.5,\\ 21$",
          correct: true,
          feedback: "$n = 9$: median = 5th value = 9. Lower half $3, 5, 6, 8$ gives $Q_1 = \\frac{5+6}{2} = 5.5$; upper half $11, 14, 15, 21$ gives $Q_3 = \\frac{14+15}{2} = 14.5$.",
        },
        {
          text: "$3,\\ 6,\\ 9,\\ 14,\\ 21$",
          feedback: "These are the 3rd and 7th values. With the median left out, each half has 4 values, so each quartile is an average of two.",
        },
        {
          text: "$3,\\ 5.5,\\ 10.2,\\ 14.5,\\ 21$",
          feedback: "10.2 is the mean ($92/9$). The boxplot uses the median, 9.",
        },
        {
          text: "$3,\\ 6,\\ 9,\\ 15,\\ 21$",
          feedback: "That includes the median in both halves. Our convention leaves it out when $n$ is odd.",
        },
      ],
      hint: "Median first, then the median of each 4-value half.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — food delivery times (application).** A cloud kitchen logs 12 delivery times in minutes:\n\n$14,\\ 16,\\ 17,\\ 19,\\ 20,\\ 21,\\ 23,\\ 25,\\ 28,\\ 31,\\ 36,\\ 44$\n\nThe manager wants a quick sketch and a number for the skew.\n\n**Step 1 (median).** $n = 12$ is even, so the median is the average of the 6th and 7th values: $\\frac{21 + 23}{2} = 22$. *Why this step:* with an even count no single value sits in the middle.\n\n**Step 2 (quartiles).** The halves are the first six and the last six values. Lower half $14, 16, 17, 19, 20, 21$ gives $Q_1 = \\frac{17 + 19}{2} = 18$. Upper half $23, 25, 28, 31, 36, 44$ gives $Q_3 = \\frac{28 + 31}{2} = 29.5$. *Why this step:* each half also has an even count, so each quartile is again an average of two values.\n\n**Step 3 (summary).** $14,\\ 18,\\ 22,\\ 29.5,\\ 44$, with IQR $= 29.5 - 18 = 11.5$.\n\n**Step 4 (read the shape).** Box halves: $22 - 18 = 4$ and $29.5 - 22 = 7.5$. Whiskers: $18 - 14 = 4$ and $44 - 29.5 = 14.5$. Every right-hand piece is longer, so the data are right-skewed. That fits the context: a delivery cannot be much faster than about 15 minutes, but traffic can make one much slower.\n\n**Step 5 (Bowley).** $\\text{Sk}_B = \\frac{29.5 + 18 - 2(22)}{11.5} = \\frac{3.5}{11.5} \\approx 0.30$, a moderate right skew. *Why Bowley here:* it uses only the box, so the single 44-minute delivery does not affect it. Change 44 to 90 and $\\text{Sk}_B$ stays 0.30.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — exam style (Bowley, working backwards).** For a distribution, Bowley's coefficient of skewness is $0.2$, $Q_1 = 30$ and the median is 40. Find $Q_3$ and the quartile deviation $\\frac{Q_3 - Q_1}{2}$.\n\n**Step 1 (write one equation).** $0.2 = \\frac{Q_3 + 30 - 2(40)}{Q_3 - 30} = \\frac{Q_3 - 50}{Q_3 - 30}$. *Why this step:* there is one unknown, so one equation is enough.\n\n**Step 2 (cross-multiply and solve).** $0.2(Q_3 - 30) = Q_3 - 50$, so $0.2Q_3 - 6 = Q_3 - 50$, which gives $44 = 0.8Q_3$ and $Q_3 = 55$.\n\n**Step 3 (check).** $\\frac{55 + 30 - 80}{55 - 30} = \\frac{5}{25} = 0.2$ ✓. The upper half of the box ($55 - 40 = 15$) is longer than the lower half ($40 - 30 = 10$), as a positive coefficient needs. *Why this step:* a sign error in Step 2 would give a $Q_3$ that fails this check.\n\n**Step 4 (quartile deviation).** $\\frac{55 - 30}{2} = 12.5$.",
    },
    {
      type: "quiz",
      id: "st3-2-q6",
      variant: "practice",
      question:
        "Find the five-number summary of the 10 values $5, 8, 9, 12, 14, 15, 17, 20, 24, 30$.",
      options: [
        {
          text: "$5,\\ 9,\\ 14.5,\\ 20,\\ 30$",
          correct: true,
          feedback: "$n = 10$: median $= \\frac{14 + 15}{2} = 14.5$. Lower half $5, 8, 9, 12, 14$ has middle value $Q_1 = 9$; upper half $15, 17, 20, 24, 30$ has middle value $Q_3 = 20$.",
        },
        {
          text: "$5,\\ 9,\\ 14,\\ 20,\\ 30$",
          feedback: "14 is only the 5th value. With $n$ even, the median averages the 5th and 6th values.",
        },
        {
          text: "$5,\\ 10.5,\\ 14.5,\\ 18.5,\\ 30$",
          feedback: "Each half has 5 values (an odd count), so each quartile is a single middle value, not an average of two.",
        },
        {
          text: "$5,\\ 8,\\ 14.5,\\ 24,\\ 30$",
          feedback: "Those are the 2nd and 9th values. $Q_1$ is the middle of the lower five, the 3rd value.",
        },
      ],
      hint: "Even n: split into the first five and the last five.",
    },
    {
      type: "quiz",
      id: "st3-2-q7",
      variant: "practice",
      question:
        "A distribution has $Q_1 = 40$, $Q_3 = 60$ and Bowley's coefficient of skewness $-0.25$. Find the median.",
      options: [
        {
          text: "52.5",
          correct: true,
          feedback: "$-0.25 = \\frac{60 + 40 - 2M}{20}$, so $100 - 2M = -5$ and $M = 52.5$. The median is nearer $Q_3$, which is the left-skew picture a negative coefficient describes.",
        },
        {
          text: "47.5",
          feedback: "That gives $\\frac{100 - 95}{20} = +0.25$. The sign is flipped.",
        },
        {
          text: "50",
          feedback: "A median exactly in the middle of the box gives a coefficient of 0, not $-0.25$.",
        },
        {
          text: "55",
          feedback: "Check: $\\frac{100 - 110}{20} = -0.5$, not $-0.25$.",
        },
      ],
      hint: "Sk_B = (Q₃ + Q₁ − 2·median) ÷ (Q₃ − Q₁).",
    },
    {
      type: "quiz",
      id: "st3-2-q3",
      variant: "practice",
      question:
        "A boxplot of 200 bus journey times has $Q_1 = 18$ min, median $= 24$ min, $Q_3 = 35$ min and max $= 70$ min. About how many journeys took longer than 24 minutes?",
      options: [
        {
          text: "About 100",
          correct: true,
          feedback: "Half the data lie above the median, and half of 200 is 100.",
        },
        {
          text: "About 50",
          feedback: "That is the number above $Q_3 = 35$. Above the median is two quarters.",
        },
        {
          text: "About 150",
          feedback: "That is the number above $Q_1 = 18$.",
        },
        {
          text: "It cannot be told without the raw data.",
          feedback: "A boxplot tells you exactly this kind of thing: the median splits the data in half.",
        },
      ],
    },
    {
      type: "text",
      content:
        "### What a boxplot hides\n\nFive numbers cannot hold everything. Here are two sets of 12 values with **identical** five-number summaries, $2, 3, 6, 9, 10$:\n\n**Set A:** $2, 2, 3, 3, 5, 6, 6, 7, 9, 9, 10, 10$\n**Set B:** $2, 2, 3, 3, 3, 4, 8, 8, 9, 9, 10, 10$\n\nSet A is spread fairly evenly from 2 to 10. Check B: median $= \\frac{4 + 8}{2} = 6$, $Q_1 = \\frac{3+3}{2} = 3$, $Q_3 = \\frac{9+9}{2} = 9$. Its boxplot is the same as A's, but B has **no values at all** between 4 and 8. It is two clusters, and its median of 6 lands in an empty gap where no one actually is.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [2, 2, 3, 3, 5, 6, 6, 7, 9, 9, 10, 10],
        compareData: [2, 2, 3, 3, 3, 4, 8, 8, 9, 9, 10, 10],
        labels: { data: "Set A", compare: "Set B" },
        range: { min: 0, max: 12 },
        view: "boxplot",
        views: ["boxplot", "dotplot"],
        stats: ["median", "q1", "q3"],
        editable: false,
        caption:
          "Identical boxes. Switch to the dot plot to see that Set B is bimodal, with a hole exactly where its median sits.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Always look before you summarise",
      content:
        "A boxplot cannot show gaps, clusters or more than one peak, and it does not tell you how many values there are. Use it to **compare** groups quickly, but check a dot plot or histogram first so you know what is being hidden.",
    },
    {
      type: "quiz",
      id: "st3-2-q4",
      variant: "concept",
      question:
        "Two classes have exactly the same boxplot for their test scores. Which statement must be true?",
      options: [
        {
          text: "They share the same min, quartiles, median and max, but their distributions could still look quite different.",
          correct: true,
          feedback: "Same five numbers, possibly different shapes inside each quarter: one could be bimodal, one smooth. The class sizes could differ too.",
        },
        {
          text: "Their dot plots must be identical.",
          feedback: "Sets A and B above have the same boxplot and very different dot plots.",
        },
        {
          text: "They must have the same mean.",
          feedback: "Not necessarily. A and B above share a boxplot, but A's mean is $72/12 = 6$ and B's is $71/12 \\approx 5.92$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-2-q5",
      variant: "practice",
      question:
        "A boxplot has min 20, $Q_1 = 44$, median 50, $Q_3 = 53$, max 58. What shape does it suggest?",
      options: [
        {
          text: "Left-skewed",
          correct: true,
          feedback: "The left pieces are longer (whisker 24, box half 6) than the right ones (box half 3, whisker 5). The lower values are spread out: a left tail.",
        },
        {
          text: "Right-skewed",
          feedback: "The long pieces are on the left, so the tail points left.",
        },
        {
          text: "Symmetric",
          feedback: "Compare $50 - 44 = 6$ with $53 - 50 = 3$, and whiskers of 24 and 5. Far from balanced.",
        },
      ],
    },
  ]),
};

// ---------------------------------------------------------------------------
// 3.3 · Outliers and Robust Summaries
// ---------------------------------------------------------------------------

const lesson03: LessonSeed = {
  slug: "outliers-and-robust-summaries",
  title: "3.3 · Outliers and Robust Summaries",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "A height survey of 40 students includes one entry of 1720 cm. It is almost certainly 172 cm with a slipped decimal. A marathon results table includes a runner who took 9 hours. That one is real: they walked and still finished. Both are **outliers**, values that sit far from the rest. We need a fair rule for flagging them, and summaries that one wild value cannot wreck.",
    },
    {
      type: "text",
      content:
        "\"Far\" must be measured against the data's own spread, and that measure of spread should not itself be distorted by the outliers. The IQR fits: it depends only on the middle half. John Tukey's rule measures out one and a half box-lengths beyond each end of the box.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The 1.5·IQR fences",
      content:
        "Lower fence $= Q_1 - 1.5 \\times \\text{IQR}$\nUpper fence $= Q_3 + 1.5 \\times \\text{IQR}$\nAny value below the lower fence or above the upper fence is flagged as a **possible outlier**.",
    },
    {
      type: "math",
      latex: "\\text{outlier if } \\; x < Q_1 - 1.5\\,\\text{IQR} \\quad \\text{or} \\quad x > Q_3 + 1.5\\,\\text{IQR}",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** The study-time survey from 3.2, except the two heaviest studiers now report 60 and 75 minutes:\n\n$12, 18, 20, 22, 25, 25, 28, 30, 32, 35, 38, 40, 45, 60, 75$\n\n**Step 1 (quartiles).** Nothing below the 13th value changed, so median $= 30$, $Q_1 = 22$, $Q_3 = 40$ as before.\n\n**Step 2 (IQR).** $40 - 22 = 18$, and $1.5 \\times 18 = 27$.\n\n**Step 3 (fences).** Lower: $22 - 27 = -5$. Upper: $40 + 27 = 67$.\n\n**Step 4 (check the data).** Nothing is below $-5$. Above 67: only **75**. So 75 is flagged; 60 is not.\n\n**Step 5 (modified boxplot).** Draw the box as before. The right whisker stops at the **largest value inside the fences**, 60, not at the fence itself. Plot 75 as a separate point.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: STUDY_MINUTES_OUTLIER,
        range: { min: 0, max: 160 },
        xLabel: "Study time (minutes per day)",
        view: "boxplot",
        views: ["boxplot", "dotplot"],
        stats: ["mean", "median", "sd", "iqr", "range"],
        showFences: true,
        caption:
          "A modified boxplot with 1.5·IQR fences. Drag the 75 out to 150 and watch the readouts: mean, SD and range jump; median and IQR do not move.",
      },
    },
    {
      type: "text",
      content:
        "### Resistant and non-resistant summaries\n\nDrag the top value from 75 to 150 and record what happens. Only one number changed, by $+75$.",
    },
    {
      type: "table",
      headers: ["Statistic", "Top value 75", "Top value 150", "Moved?"],
      rows: [
        ["Mean", "$505/15 \\approx 33.7$", "$580/15 \\approx 38.7$", "Yes, by $75/15 = 5$"],
        ["SD", "$\\approx 16.0$", "$\\approx 31.9$", "Yes, it almost doubled"],
        ["Range", "$75 - 12 = 63$", "$150 - 12 = 138$", "Yes, by all 75"],
        ["Median", "30", "30", "No"],
        ["IQR", "18", "18", "No"],
      ],
    },
    {
      type: "callout",
      variant: "definition",
      title: "Resistant (robust) statistic",
      content:
        "A statistic is **resistant** if a few extreme values cannot pull it far. The median and IQR are resistant, because they depend on **positions** in the ordered data. The mean, SD and range are **not resistant**, because they use the actual **sizes** of values. Every value enters the sum $\\Sigma x$, and squaring in the SD makes a far-out value count even more.",
    },
    {
      type: "text",
      content:
        "You can see exactly why the mean moved by 5. The mean is $\\frac{\\Sigma x}{n}$. Raising one value by 75 raises $\\Sigma x$ by 75, so the mean rises by $\\frac{75}{15} = 5$. Pushing that value to 1500 would push the mean to about 128.7, above every other value in the data. The median would still be 30.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Choosing a summary",
      content:
        "For roughly symmetric data without outliers, report **mean and SD**; they use every value and feed into later theory. For skewed data or data with outliers, report **median and IQR** (the five-number summary). Always keep centre and spread matched: median with IQR, mean with SD.",
    },
    {
      type: "quiz",
      id: "st3-3-q1",
      variant: "practice",
      question:
        "For a data set, $Q_1 = 40$ and $Q_3 = 56$. Which of the values 14, 20, 78 and 82 are flagged as outliers by the 1.5·IQR rule?",
      options: [
        {
          text: "14 and 82",
          correct: true,
          feedback: "IQR $= 16$, $1.5 \\times 16 = 24$, fences $40 - 24 = 16$ and $56 + 24 = 80$. 14 is below 16 and 82 is above 80. 20 and 78 are inside.",
        },
        {
          text: "Only 82",
          feedback: "Check the lower fence as well: $40 - 24 = 16$, and 14 lies below it.",
        },
        {
          text: "14, 20, 78 and 82",
          feedback: "Fences are 1.5 IQRs beyond the box, not at the box. The fences are 16 and 80.",
        },
        {
          text: "14 and 78 and 82",
          feedback: "78 is below the upper fence of 80.",
        },
      ],
      hint: "IQR first, then 1.5 × IQR, then subtract from Q₁ and add to Q₃.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — a long whisker that is not an outlier.** A boxplot has five-number summary $3, 20, 26, 32, 70$.\n\n**Step 1.** IQR $= 32 - 20 = 12$; $1.5 \\times 12 = 18$.\n\n**Step 2.** Fences: $20 - 18 = 2$ and $32 + 18 = 50$.\n\n**Step 3 (low end).** The minimum is 3, and $3 > 2$, so it is **not** an outlier, even though the left whisker from 20 down to 3 is 17 units long, longer than the whole box.\n\n**Step 4 (high end).** The maximum is 70, and $70 > 50$, so **it is** an outlier. The original boxplot's right whisker runs to 70. A modified boxplot would stop the whisker at the largest value that is $\\le 50$ and plot 70 as a point.",
    },
    {
      type: "quiz",
      id: "st3-3-q2",
      variant: "concept",
      question:
        "An (unmodified) boxplot has a very long left whisker, longer than the box itself. What can you say about the minimum?",
      options: [
        {
          text: "Nothing yet. It is an outlier only if it lies below $Q_1 - 1.5\\,\\text{IQR}$, so you need to check against the fence.",
          correct: true,
          feedback: "In worked example 2 the left whisker (17) is longer than the box (12), yet the minimum is inside the fence. A whisker longer than 1.5 box lengths guarantees *some* outlier; a merely long one does not.",
        },
        {
          text: "It must be an outlier; a long whisker means an outlier.",
          feedback: "Long whiskers are often just a skewed tail. The fence is the test, not the look.",
        },
        {
          text: "It cannot be an outlier, since outliers are never part of the whisker.",
          feedback: "In an unmodified boxplot the whisker runs all the way to the min, outlier or not. Only the modified boxplot plots outliers separately.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-3-q3",
      variant: "practice",
      question:
        "Nine friends have a mean pocket money of ₹200. A tenth friend with ₹1100 joins. What is the new mean?",
      options: [
        {
          text: "₹290",
          correct: true,
          feedback: "Old total $= 9 \\times 200 = 1800$. New total $= 2900$, over 10 people: ₹290. One friend raised the mean by 45%, which is why the mean is called non-resistant.",
        },
        {
          text: "₹650",
          feedback: "That averages the old mean with the new value as if they had equal weight. The old mean stands for 9 people.",
        },
        {
          text: "₹200",
          feedback: "A resistant statistic like the median might stay put, but the mean cannot: adding any value different from the mean moves it.",
        },
        {
          text: "₹322",
          feedback: "That divides the new total 2900 by 9. There are now 10 friends.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 3 — office commutes (application).** HR surveys 11 employees' one-way commute times in minutes:\n\n$18,\\ 20,\\ 21,\\ 22,\\ 24,\\ 25,\\ 26,\\ 28,\\ 30,\\ 33,\\ 95$\n\nThe 95 belongs to an employee who moved to a nearby city and comes in by train.\n\n**Step 1 (quartiles).** $n = 11$, so the median is the 6th value, **25**. Lower half $18, 20, 21, 22, 24$ gives $Q_1 = 21$; upper half $26, 28, 30, 33, 95$ gives $Q_3 = 30$. *Why this step:* the fences are built from $Q_1$ and $Q_3$. These come from positions, so the 95 cannot distort the yardstick used to judge it.\n\n**Step 2 (fences).** IQR $= 9$ and $1.5 \\times 9 = 13.5$, so the fences are $21 - 13.5 = 7.5$ and $30 + 13.5 = 43.5$. Only 95 lies outside: it is an outlier.\n\n**Step 3 (with and without).** $\\Sigma x = 342$, so the mean is $\\frac{342}{11} \\approx 31.1$ min. Without the 95: $\\Sigma x = 247$ over 10 people, mean $24.7$; median $= \\frac{24 + 25}{2} = 24.5$.\n\n**Step 4 (interpret).** With the outlier included, the mean of 31.1 minutes is longer than the commute of 9 of the 11 employees, so it describes almost nobody. Removing one value moved the mean by about 6.4 minutes and the median by only 0.5. *Why this matters:* if HR plans a shuttle around the 'average commute', the median of 25 minutes is the honest figure. The 95 is a real commute, so keep it and report it separately; do not delete it.",
    },
    {
      type: "quiz",
      id: "st3-3-q6",
      variant: "practice",
      question:
        "Which values in $4, 6, 7, 8, 9, 10, 11, 12, 13, 15, 31$ are outliers by the 1.5·IQR rule?",
      options: [
        {
          text: "Only 31",
          correct: true,
          feedback: "Median $= 10$ (6th value). $Q_1 = 7$ (middle of $4, 6, 7, 8, 9$), $Q_3 = 13$ (middle of $11, 12, 13, 15, 31$). IQR $= 6$, $1.5 \\times 6 = 9$, fences $-2$ and $22$. Only 31 lies outside.",
        },
        {
          text: "4 and 31",
          feedback: "The lower fence is $7 - 9 = -2$, and 4 is well above it. A value that is merely the smallest is not an outlier.",
        },
        {
          text: "None of them",
          feedback: "The upper fence is $13 + 9 = 22$, and 31 is beyond it.",
        },
        {
          text: "15 and 31",
          feedback: "15 is inside the upper fence of 22. Only 31 is flagged.",
        },
      ],
      hint: "n = 11: the median is the 6th value; leave it out of both halves.",
    },
    {
      type: "text",
      content:
        "### What to do with an outlier: investigate\n\nThe fences flag a value. They do not tell you to delete it. Ask where it came from:\n\n**A mistake** (a typed 1720 cm, a sensor glitch): correct it if you can; otherwise remove it and say so.\n**A member of a different population** (a teacher's score mixed into student scores): it doesn't belong in this data set.\n**A genuine extreme** (the 9-hour marathon, a billionaire's income): keep it. It is real information, and often the most interesting value in the data. Use resistant summaries so it does not distort the typical picture, or report results with and without it.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — exam style (correcting a recording error).** The mean and SD of 15 observations are 12 and 3. On checking, one observation recorded as 20 should have been 5. Find the correct mean and SD. (Lesson 2.5 solved a smaller slip of the same kind; here the wrong value was also the most extreme one.)\n\n**Step 1 (recover the totals).** $\\Sigma x = n\\bar{x} = 15 \\times 12 = 180$. From $\\sigma^2 = \\frac{\\Sigma x^2}{n} - \\bar{x}^2$ we get $\\Sigma x^2 = n(\\sigma^2 + \\bar{x}^2) = 15(9 + 144) = 2295$. *Why this step:* you cannot correct a mean or an SD directly, but you can correct a sum, because each observation appears in it exactly once.\n\n**Step 2 (swap the wrong value for the right one).** $\\Sigma x = 180 - 20 + 5 = 165$ and $\\Sigma x^2 = 2295 - 400 + 25 = 1920$. *Why this step:* take out the wrong value's contribution to each sum and put in the right one's. For $\\Sigma x^2$ that means the squares.\n\n**Step 3 (new mean).** $\\bar{x} = \\frac{165}{15} = 11$.\n\n**Step 4 (new SD).** $\\sigma^2 = \\frac{1920}{15} - 11^2 = 128 - 121 = 7$, so $\\sigma = \\sqrt{7} \\approx 2.65$.\n\n**Step 5 (sense check).** One value dropped by 15, so the mean should drop by $\\frac{15}{15} = 1$, and $12 - 1 = 11$ ✓. The SD fell from 3 to about 2.65: the miscopied 20 sat $8$ above the old mean, and its square was inflating $\\Sigma x^2$. Neither the mean nor the SD is resistant, so one slip changes both.",
    },
    {
      type: "quiz",
      id: "st3-3-q7",
      variant: "practice",
      question:
        "The mean of 25 observations was found to be 40. Later it was discovered that the value 64 had been copied as 46. What is the correct mean?",
      options: [
        {
          text: "40.72",
          correct: true,
          feedback: "Wrong total $= 25 \\times 40 = 1000$. Correct total $= 1000 - 46 + 64 = 1018$, and $\\frac{1018}{25} = 40.72$.",
        },
        {
          text: "39.28",
          feedback: "The total should go *up*: the true value 64 is larger than the recorded 46.",
        },
        {
          text: "41.8",
          feedback: "That spreads the 18-mark error over 10 observations. There are 25: $\\frac{18}{25} = 0.72$.",
        },
        {
          text: "40",
          feedback: "The mean is not resistant: changing any single value changes the total and so changes the mean.",
        },
      ],
      hint: "Rebuild the total, fix it, divide again.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The fence is a rule of thumb",
      content:
        "The 1.5 is a convention chosen by Tukey, not a law of nature. In strongly right-skewed data like incomes, the rule flags many perfectly ordinary large values. In very small samples it may flag nothing at all. Treat a flag as a question, not a verdict.",
    },
    {
      type: "quiz",
      id: "st3-3-q4",
      variant: "concept",
      question:
        "A hospital's list of patient waiting times includes one of 14 hours, far above the upper fence. What is the best first step?",
      options: [
        {
          text: "Check the record: was it a data-entry error or a real 14-hour wait?",
          correct: true,
          feedback: "If it is real, deleting it would hide exactly the kind of failure the hospital needs to know about.",
        },
        {
          text: "Delete it, because outliers distort the mean.",
          feedback: "Deleting by reflex throws information away. If the distortion is the worry, switch to the median and IQR, which barely notice one value.",
        },
        {
          text: "Replace it with the mean waiting time.",
          feedback: "That invents data. It also makes the SD look smaller than it really is.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-3-q5",
      variant: "practice",
      question:
        "Monthly salaries in a small firm include the owner's, which is ten times the others'. Which pair of summaries best describes a typical employee?",
      options: [
        {
          text: "Median and IQR",
          correct: true,
          feedback: "Both are resistant. The owner's salary shifts one position, not the middle of the ordered list.",
        },
        {
          text: "Mean and SD",
          feedback: "Both are dragged by the owner's salary. The mean may exceed what almost every employee earns.",
        },
        {
          text: "Mean and range",
          feedback: "The range is the least resistant of all: it is set by the single most extreme value.",
        },
      ],
    },
  ]),
};

// ---------------------------------------------------------------------------
// 3.4 · Relative Standing: Percentile Ranks and z-Scores
// ---------------------------------------------------------------------------

const lesson04: LessonSeed = {
  slug: "z-scores-and-relative-standing",
  title: "3.4 · Relative Standing: Percentile Ranks and z-Scores",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Riya scored **92** in the Maths exam. Arjun scored **84** in the Physics exam. The school wants one prize for the more outstanding performance. Riya's mark is higher, but the papers were different. Maybe Maths was easy and everyone scored well. Before comparing, we need to know where each mark sits **within its own exam**.",
    },
    {
      type: "table",
      headers: ["", "Mark", "Class mean", "Class SD"],
      rows: [
        ["Riya (Maths)", "92", "70", "10"],
        ["Arjun (Physics)", "84", "60", "8"],
      ],
    },
    {
      type: "text",
      content:
        "Riya is $92 - 70 = 22$ marks above her class mean. Arjun is $84 - 60 = 24$ marks above his. Even raw distances are not comparable, because a mark is 'worth' more in a tightly bunched exam. The fair unit is the class's own **standard deviation**, the typical distance from the mean. Riya is $\\frac{22}{10} = 2.2$ SDs above; Arjun is $\\frac{24}{8} = 3$ SDs above. **Arjun's performance is more exceptional**, even though his raw mark is lower.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "z-score (standard score)",
      content:
        "For a value $x$ from data with mean $\\bar{x}$ and standard deviation $\\sigma$:\n$\\displaystyle z = \\frac{x - \\bar{x}}{\\sigma}$\n$z$ counts how many SDs $x$ lies above ($z > 0$) or below ($z < 0$) the mean. It has no units: marks divided by marks.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "(x - 70)/10",
        exprLatex: "z = \\frac{x - 70}{10}",
        min: 20,
        max: 100,
        step: 1,
        initial: 92,
        inputLabel: "Maths mark",
        outputLabel: "z-score",
      },
    },
    {
      type: "text",
      content:
        "Slide the mark. At 70 (the mean) $z = 0$. Every 10 marks is exactly one unit of $z$. At 50, $z = -2$: two SDs below average. The machine does two things: **shift** (subtract the mean so that average becomes 0) and **scale** (divide by the SD so that one typical deviation becomes 1).",
    },
    {
      type: "quiz",
      id: "st3-4-q1",
      variant: "concept",
      question:
        "Meena scored 78 in English (class mean 72, SD 3). Kabir scored 88 in History (class mean 80, SD 8). Who did better **relative to their class**?",
      options: [
        {
          text: "Meena: $z = 2$ against Kabir's $z = 1$.",
          correct: true,
          feedback: "$z_M = \\frac{78 - 72}{3} = 2$; $z_K = \\frac{88 - 80}{8} = 1$. The lower raw mark is the stronger relative performance.",
        },
        {
          text: "Kabir, because 88 is higher than 78.",
          feedback: "Raw marks from different papers are not on the same scale. Relative to classmates Kabir is 1 SD above average; Meena is 2.",
        },
        {
          text: "Kabir, because he is 8 marks above his mean and Meena only 6.",
          feedback: "Distances must be measured in each class's own SD. 6 marks in a class with SD 3 is further out than 8 marks in a class with SD 8.",
        },
      ],
      hint: "Compute z = (x − mean)/SD for each.",
    },
    {
      type: "text",
      content:
        "### The z-scores of a whole data set\n\nConvert **every** value in a data set to its z-score. What are the mean and SD of the new list? Lesson 2.6 already answered this. The z-transformation is a linear map $x \\mapsto a + bx$ with",
    },
    {
      type: "math",
      latex: "z = \\frac{x - \\bar{x}}{\\sigma} = -\\frac{\\bar{x}}{\\sigma} + \\frac{1}{\\sigma}\\,x, \\qquad a = -\\frac{\\bar{x}}{\\sigma},\\quad b = \\frac{1}{\\sigma}",
    },
    {
      type: "text",
      content:
        "Under $x \\mapsto a + bx$, the mean becomes $a + b\\bar{x}$ and the SD becomes $|b|\\sigma$. So",
    },
    {
      type: "math",
      latex: "\\bar{z} = -\\frac{\\bar{x}}{\\sigma} + \\frac{1}{\\sigma}\\,\\bar{x} = 0, \\qquad \\sigma_z = \\frac{1}{\\sigma}\\cdot\\sigma = 1",
    },
    {
      type: "callout",
      variant: "info",
      title: "Standardising",
      content:
        "The z-scores of any data set (with $\\sigma > 0$) have **mean 0 and SD 1**. The shape does not change: a linear map slides and stretches the dot plot without rearranging it. A right-skewed data set gives right-skewed z-scores. Since the SD is 1, $\\frac{1}{n}\\Sigma z^2 = 1$, i.e. $\\Sigma z^2 = n$.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [2, 4, 4, 4, 5, 5, 7, 9],
        range: { min: -4, max: 12 },
        view: "dotplot",
        stats: ["mean", "sd"],
        transform: { shift: true, scale: true },
        snap: 0.5,
        caption:
          "Standardise the whole set by hand. The mean is 5 and the SD is 2, so $z = \\frac{x - 5}{2} = -2.5 + 0.5x$. Set the shift $a$ to $-2.5$ and the scale $b$ to $0.5$: the dots become the z-scores, the mean reads 0, the SD reads 1, and the pattern of the dots is unchanged.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1 — standardise a data set.** Data: $2, 4, 4, 4, 5, 5, 7, 9$.\n\n**Step 1 (mean).** $\\Sigma x = 40$, $\\bar{x} = 5$.\n\n**Step 2 (SD).** Squared deviations: $9, 1, 1, 1, 0, 0, 4, 16$, sum 32. $\\sigma^2 = \\frac{32}{8} = 4$, so $\\sigma = 2$.\n\n**Step 3 (z-scores).** $z = \\frac{x - 5}{2}$ gives $-1.5, -0.5, -0.5, -0.5, 0, 0, 1, 2$.\n\n**Step 4 (check).** Sum: $-1.5 - 1.5 + 0 + 1 + 2 = 0$, so the mean is 0. ✓ Sum of squares: $2.25 + 3(0.25) + 0 + 0 + 1 + 4 = 8 = n$, so the SD is $\\sqrt{8/8} = 1$. ✓",
    },
    {
      type: "text",
      content:
        "**Going back.** Rearranging $z = \\frac{x - \\bar{x}}{\\sigma}$ gives $x = \\bar{x} + z\\sigma$. A z-score of $-1.5$ in the Maths exam means a mark of $70 + (-1.5)(10) = 55$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — recover the mean and SD (JEE style).** In an exam, Ravi's mark 75 has z-score 1.5 and Sita's mark 51 has z-score $-0.5$. Find the mean and SD.\n\n**Step 1 (write both as equations).** $75 = \\bar{x} + 1.5\\sigma$ and $51 = \\bar{x} - 0.5\\sigma$.\n\n**Step 2 (subtract).** $24 = 2\\sigma$, so $\\sigma = 12$.\n\n**Step 3 (substitute).** $\\bar{x} = 51 + 0.5(12) = 57$.\n\n**Step 4 (check).** $57 + 1.5(12) = 75$ ✓ and $57 - 0.5(12) = 51$ ✓.",
    },
    {
      type: "quiz",
      id: "st3-4-q2",
      variant: "practice",
      question:
        "Heights in a class have mean 158 cm and SD 6 cm. What height has z-score $-1.5$?",
      options: [
        {
          text: "149 cm",
          correct: true,
          feedback: "$x = \\bar{x} + z\\sigma = 158 + (-1.5)(6) = 158 - 9 = 149$.",
        },
        {
          text: "167 cm",
          feedback: "A negative z-score is below the mean. $158 - 9$, not $158 + 9$.",
        },
        {
          text: "156.5 cm",
          feedback: "That subtracts 1.5 cm. z counts SDs, so subtract $1.5 \\times 6 = 9$ cm.",
        },
        {
          text: "152 cm",
          feedback: "That is 1 SD below. $z = -1.5$ is one and a half SDs below.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-4-q3",
      variant: "practice",
      question:
        "Every value in a data set of 25 numbers is converted to a z-score. What is $\\Sigma z^2$?",
      options: [
        {
          text: "25",
          correct: true,
          feedback: "The z-scores have mean 0 and SD 1, so $\\frac{1}{n}\\Sigma z^2 - 0^2 = 1$, giving $\\Sigma z^2 = n = 25$.",
        },
        {
          text: "0",
          feedback: "$\\Sigma z = 0$. Squares cannot cancel, so $\\Sigma z^2$ is positive.",
        },
        {
          text: "1",
          feedback: "1 is the *mean* of the squares (the variance). The sum is $n$ times that.",
        },
        {
          text: "It depends on the original mean and SD.",
          feedback: "Standardising removes the original mean and SD. The answer is the same for every data set of size 25.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 3 — when lower is better (application).** At a district athletics meet, Kavya ran the 100 m in 11.2 s (event mean 12.0 s, SD 0.4 s). Rohan long-jumped 6.9 m (event mean 6.0 m, SD 0.5 m). One award goes to the most outstanding performance.\n\n**Step 1 (Kavya's z).** $z_K = \\frac{11.2 - 12.0}{0.4} = \\frac{-0.8}{0.4} = -2$.\n\n**Step 2 (Rohan's z).** $z_R = \\frac{6.9 - 6.0}{0.5} = \\frac{0.9}{0.5} = 1.8$.\n\n**Step 3 (read the direction).** *Why this step:* a z-score tells you how far from the mean a value is and on which side. It does not tell you whether that side is good. In a race a smaller time is better, so $z_K = -2$ means Kavya was 2 SDs **better** than average. Rohan was 1.8 SDs better.\n\n**Step 4 (conclude).** $2 > 1.8$, so Kavya's run is the more outstanding performance. Seconds and metres cannot be compared directly, but numbers of SDs can.",
    },
    {
      type: "quiz",
      id: "st3-4-q7",
      variant: "practice",
      question:
        "Kiran ran 400 m in 56 s (event mean 60 s, SD 2.5 s). Neha swam 50 m in 28.2 s (event mean 30 s, SD 1.2 s). Who performed better relative to their event?",
      options: [
        {
          text: "Kiran: 1.6 SDs faster than average, against Neha's 1.5.",
          correct: true,
          feedback: "$z_K = \\frac{56 - 60}{2.5} = -1.6$ and $z_N = \\frac{28.2 - 30}{1.2} = -1.5$. For times, more negative is better, so Kiran wins narrowly.",
        },
        {
          text: "Neha, because $-1.5$ is larger than $-1.6$.",
          feedback: "For times, lower is better, so the better performance has the *more negative* z-score.",
        },
        {
          text: "Kiran, because he beat the mean by 4 s and Neha only by 1.8 s.",
          feedback: "Right person, wrong reason. Raw seconds from different events are not comparable; measure each gap in its own event's SD.",
        },
        {
          text: "They are equal, since both are about 1.5 SDs from the mean.",
          feedback: "Compute both exactly: 1.6 and 1.5 are different.",
        },
      ],
      hint: "Compute z for each, then remember that a lower time is better.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — exam style (rescaling marks).** A test's raw marks have mean 40 and SD 10. The board rescales every mark by $y = a + bx$ with $b > 0$, so that the new mean is 60 and the new SD is 12. Find $a$ and $b$, and the new mark of a student who scored 52.\n\n**Step 1 (the SD fixes $b$).** Under $x \\mapsto a + bx$ the SD becomes $|b|\\sigma$, so $12 = 10b$ and $b = 1.2$. *Why this step first:* adding a constant never changes spread, so the SD equation contains only $b$. Solve it first, then use it in the mean equation.\n\n**Step 2 (the mean fixes $a$).** $60 = a + 1.2(40) = a + 48$, so $a = 12$.\n\n**Step 3 (convert).** $y = 12 + 1.2(52) = 12 + 62.4 = 74.4$.\n\n**Step 4 (check with z).** Old $z = \\frac{52 - 40}{10} = 1.2$. New $z = \\frac{74.4 - 60}{12} = \\frac{14.4}{12} = 1.2$ ✓. *Why this works:* a linear rescaling with $b > 0$ keeps every z-score, so each student's standing is unchanged. That also gives a shortcut: new mark $= 60 + 1.2 \\times 12 = 74.4$.",
    },
    {
      type: "quiz",
      id: "st3-4-q8",
      variant: "practice",
      question:
        "Marks with mean 50 and SD 8 are rescaled linearly (keeping the order) to have mean 70 and SD 10. What does a raw mark of 62 become?",
      options: [
        {
          text: "85",
          correct: true,
          feedback: "$z = \\frac{62 - 50}{8} = 1.5$, and rescaling keeps $z$: $70 + 1.5 \\times 10 = 85$. (Equivalently $b = \\frac{10}{8} = 1.25$, $a = 70 - 62.5 = 7.5$, and $7.5 + 1.25 \\times 62 = 85$.)",
        },
        {
          text: "82",
          feedback: "That adds the 20-mark change in the mean and ignores the change in SD. The spread was stretched too.",
        },
        {
          text: "77.5",
          feedback: "That is $1.25 \\times 62$ with the shift $a = 7.5$ left out.",
        },
        {
          text: "80",
          feedback: "That is 1 SD above the new mean. The mark 62 is 1.5 SDs above the old mean.",
        },
      ],
      hint: "Find the z-score first; it stays the same after rescaling.",
    },
    {
      type: "text",
      content:
        "### Percentile rank\n\nA z-score uses the mean and SD. A second measure of standing uses only counting and works for any shape.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Percentile rank",
      content:
        "The **percentile rank** of a value is the percentage of the data that lie **below** it.\n$\\displaystyle \\text{PR}(x) = \\frac{\\text{number of values below } x}{n} \\times 100$\nIf 30 of 40 students scored below Meera, her percentile rank is $\\frac{30}{40} \\times 100 = 75$: she is at the 75th percentile. Some books count values 'at or below' $x$, or count ties as half. For large data sets the difference is small, but state your convention.",
    },
    {
      type: "text",
      content:
        "In the data $2, 4, 4, 4, 5, 5, 7, 9$, six of the eight values lie below 7, so $\\text{PR}(7) = \\frac{6}{8} \\times 100 = 75$. Its z-score is 1. Both say the same thing: 7 is well above the middle. The percentile rank says 'better than 75% of the group'; the z-score says 'one typical deviation above average'.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Percentiles and deciles",
      content:
        "Recall from Lesson 2.2: the $k$th **percentile** $P_k$ is the **value** below which about $k\\%$ of the data lie. Percentile rank goes the other way: it turns a value into a percentage, while a percentile turns a percentage into a value. The **deciles** $D_1, \\dots, D_9$ cut the data into tenths, so $D_k = P_{10k}$. The quartiles are special percentiles: $Q_1 = P_{25}$, median $= P_{50} = D_5$, $Q_3 = P_{75}$.",
    },
    {
      type: "quiz",
      id: "st3-4-q6",
      variant: "practice",
      question: "In a class of 200, $P_{90} = 78$. About how many students scored above 78?",
      options: [
        {
          text: "20",
          correct: true,
          feedback: "About 90% lie below $P_{90}$, so about 10% lie above it: $0.10 \\times 200 = 20$.",
        },
        {
          text: "180",
          feedback: "180 is the number **below** 78 (90% of 200). The question asks how many are above.",
        },
        {
          text: "90",
          feedback: "90 is the percentage in the subscript, not a count of students.",
        },
        {
          text: "78",
          feedback: "78 is the mark itself. $P_{90}$ is a data value, not a number of students.",
        },
      ],
      hint: "$P_{90}$ has about 90% of the data below it.",
    },
    {
      type: "table",
      headers: ["", "z-score", "Percentile rank"],
      rows: [
        ["Uses", "Mean and SD", "Only the order of the data"],
        ["Unit", "SDs from the mean", "Percent of the group below"],
        ["Affected by outliers?", "Yes (through mean and SD)", "Hardly"],
        ["Tells you", "How far out, even beyond the data", "How many are beaten; capped at 100"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "How unusual is a z-score?",
      content:
        "For roughly bell-shaped data, about 68% of values have $|z| < 1$ and about 95% have $|z| < 2$ (Chapter 5 returns to this with the normal curve). So $|z| > 2$ is unusual, and $|z| > 3$ is rare. Arjun's $z = 3$ is a truly exceptional performance.",
    },
    {
      type: "quiz",
      id: "st3-4-q4",
      variant: "practice",
      question:
        "In a class of 50, Tanvi's percentile rank is 84. How many students scored lower than her?",
      options: [
        {
          text: "42",
          correct: true,
          feedback: "$84\\%$ of 50 $= 0.84 \\times 50 = 42$.",
        },
        {
          text: "8",
          feedback: "That is 16% of 50: the students who did *not* score below her.",
        },
        {
          text: "84",
          feedback: "84 is a percentage, and there are only 50 students.",
        },
        {
          text: "34",
          feedback: "Compute $0.84 \\times 50$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-4-q5",
      variant: "concept",
      question:
        "Priya scored 45 out of 50 in a hard test (mean 30, SD 5). Dev scored 48 out of 50 in an easy test (mean 44, SD 4). Which is true?",
      options: [
        {
          text: "Priya's performance is relatively better: $z = 3$ against Dev's $z = 1$.",
          correct: true,
          feedback: "$z_P = \\frac{45 - 30}{5} = 3$ and $z_D = \\frac{48 - 44}{4} = 1$. A higher raw score is not automatically the better relative performance.",
        },
        {
          text: "Dev's performance is better; 48 beats 45 on the same total.",
          feedback: "Same maximum, different tests. On the easy test almost everyone scored in the 40s.",
        },
        {
          text: "They are equal, since both are within 5 marks of full marks.",
          feedback: "Closeness to full marks ignores how everyone else did. Standing is about the group, not the maximum.",
        },
      ],
    },
  ]),
};

// ---------------------------------------------------------------------------
// 3.5 · Comparing Distributions
// ---------------------------------------------------------------------------

const lesson05: LessonSeed = {
  slug: "comparing-distributions",
  title: "3.5 · Comparing Distributions",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two sections of Class 11 took the same 50-mark test. The teacher reports: \"Both sections averaged 32. No difference.\" Here are the marks.",
    },
    {
      type: "table",
      headers: ["Section", "Marks (ordered, $n = 15$ each)"],
      rows: [
        ["A", "18, 22, 25, 27, 28, 30, 31, 32, 33, 34, 35, 36, 38, 44, 47"],
        ["B", "4, 7, 21, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43"],
      ],
    },
    {
      type: "text",
      content:
        "Both totals are 480, so both means are $\\frac{480}{15} = 32$. The teacher is right about that. Now see the two data sets together.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: SECTION_A,
        compareData: SECTION_B,
        labels: { data: "Section A", compare: "Section B" },
        range: { min: 0, max: 50 },
        xLabel: "Test mark (out of 50)",
        view: "boxplot",
        views: ["boxplot", "dotplot"],
        stats: ["mean", "median", "q1", "q3", "iqr", "sd"],
        showFences: true,
        caption:
          "Parallel boxplots with 1.5·IQR fences. Same mean, but look at where each median sits, how the boxes are placed, and the two points ringed in Section B.",
      },
    },
    {
      type: "table",
      headers: ["", "min", "$Q_1$", "median", "$Q_3$", "max", "IQR", "mean", "SD"],
      rows: [
        ["A", "18", "27", "32", "36", "47", "9", "32", "$\\approx 7.4$"],
        ["B", "4", "30", "36", "40", "43", "10", "32", "$\\approx 11.7$"],
      ],
    },
    {
      type: "text",
      content:
        "The means match, but the stories don't. **Half of Section B scored 36 or more**, which is true of only about a quarter of Section A (36 is A's $Q_3$). B's typical student did better. B's mean was dragged down to 32 by two very low marks, 4 and 7. Fences for B are $30 - 15 = 15$ and $40 + 15 = 55$, so both are outliers. Maybe those two students were ill or absent for part of the test. That is worth finding out.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "A four-part comparison",
      content:
        "Compare any two distributions under four headings, **in context** and with **numbers**:\n**Centre:** which group is typically higher? (medians, or means if symmetric)\n**Spread:** which group is more variable? (IQRs, or SDs if symmetric)\n**Shape:** symmetric, skewed, bimodal?\n**Unusual values:** outliers or gaps, and what they might mean.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — writing the comparison.**\n\n**Centre.** Section B's median (36) is 4 marks higher than A's (32). The means are equal at 32, but B's mean is pulled down by two outliers, so the median is the fairer centre here.\n\n**Spread.** The middle halves are similar: IQR 9 for A and 10 for B. B's SD (11.7) is much larger than A's (7.4), mostly because of the outliers. The SD is not resistant.\n\n**Shape.** A is roughly symmetric: median in the middle of the box, whiskers of 9 and 11. B is left-skewed: the lower half of the box (30 to 36) is longer than the upper half (36 to 40), the upper whisker is only 3 marks long, and a thin tail runs down to 21 and then to the outliers 4 and 7.\n\n**Unusual values.** B has two low outliers, 4 and 7; A has none (its fences are 13.5 and 49.5).\n\n**Conclusion.** Most of Section B did better than most of Section A. A couple of B students did very badly, and the teacher should find out why.",
    },
    {
      type: "quiz",
      id: "st3-5-q1",
      variant: "concept",
      question: "Why was \"both sections averaged 32, so no difference\" a poor conclusion?",
      options: [
        {
          text: "The mean hid differences in centre (medians 32 vs 36), shape and outliers.",
          correct: true,
          feedback: "One number cannot summarise a distribution. Two outliers in B cancelled out what was otherwise a better performance.",
        },
        {
          text: "Because the teacher should have used the mode.",
          feedback: "Swapping one centre for another still leaves out spread, shape and unusual values.",
        },
        {
          text: "It was a fine conclusion: equal means mean equal performance.",
          feedback: "Equal means can come from very different distributions. Look at the parallel boxplots: B's box sits higher.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 2 — choosing a battery brand (application).** A school tests 40 torch batteries of each of two brands and records how many hours each lasts. Only the five-number summaries are published:\n\n**Brand P:** $38,\\ 44,\\ 47,\\ 50,\\ 53$\n**Brand Q:** $26,\\ 38,\\ 44,\\ 54,\\ 80$\n\n**Centre.** P's median (47 h) is 3 h more than Q's (44 h).\n\n**Spread.** IQR: P $= 50 - 44 = 6$, Q $= 54 - 38 = 16$. Q is far less predictable. *Why the IQR and not the range:* the range is set by a single battery, and Q's single best battery would dominate it.\n\n**Shape.** P: box halves $3$ and $3$, whiskers $6$ and $3$, so roughly symmetric with a slight left tail. Q: box halves $6$ and $10$, whiskers $12$ and $26$, so every right-hand piece is longer: right-skewed.\n\n**Unusual values.** P's fences are $44 - 9 = 35$ and $50 + 9 = 59$: no outliers. Q's fences are $38 - 24 = 14$ and $54 + 24 = 78$, so Q's 80-hour battery is an outlier. *Why this step matters:* Q's long right whisker could tempt you to call Q 'longer-lasting', but that impression comes from one exceptional battery.\n\n**Conclusion in context.** For an emergency kit you want reliability, so choose P. Half its batteries last at least 47 h and the middle half last between 44 and 50 h. About a quarter of Q's batteries are dead by 38 h, which is P's worst result.",
    },
    {
      type: "quiz",
      id: "st3-5-q5",
      variant: "practice",
      question:
        "Waiting times (minutes) at two clinics have five-number summaries M: $5, 10, 14, 18, 25$ and N: $8, 12, 13, 15, 30$. Which statement is correct?",
      options: [
        {
          text: "N has a slightly lower median and a much smaller IQR, and its 30-minute wait is an outlier; M has no outliers.",
          correct: true,
          feedback: "IQR: M $= 8$, N $= 3$. N's fences are $12 - 4.5 = 7.5$ and $15 + 4.5 = 19.5$, so 30 is an outlier (8 is inside). M's fences are $-2$ and $30$, so 25 is inside.",
        },
        {
          text: "M is more consistent, because its range (20) is smaller than N's (22).",
          feedback: "The range is set by the two extremes, and N's maximum is an outlier. The middle half tells the real story: IQR 8 for M against 3 for N.",
        },
        {
          text: "Both maximum waits are outliers.",
          feedback: "M's upper fence is $18 + 1.5 \\times 8 = 30$, and 25 lies inside it.",
        },
        {
          text: "N's typical wait is longer, because its maximum is larger.",
          feedback: "The typical wait is the median: 13 for N against 14 for M. One long wait does not make the typical wait longer.",
        },
      ],
      hint: "Work out each IQR and each pair of fences before judging.",
    },
    {
      type: "text",
      content:
        "### Back-to-back stem-and-leaf\n\nFor small data sets you can keep every value and still compare shapes. Put the **stems** (tens digit) in the middle column. Write A's leaves to the left, reading outwards from the stem, and B's leaves to the right.",
    },
    {
      type: "table",
      headers: ["Section A leaves", "Stem", "Section B leaves"],
      rows: [
        ["", "0", "4 7"],
        ["8", "1", ""],
        ["8 7 5 2", "2", "1"],
        ["8 6 5 4 3 2 1 0", "3", "0 3 4 5 6 7 8 9"],
        ["7 4", "4", "0 1 2 3"],
      ],
    },
    {
      type: "text",
      content:
        "Read it like two histograms turned on their side, back to back. Key: '2 | 1' on B's side means 21; '8 | 2' on A's side means 28. A's leaves pile up in the 30s and taper evenly both ways. B's leaves pile into the 30s and 40s with a thin trail down to the single-digit marks. That is the left skew, drawn with the actual numbers.",
    },
    {
      type: "text",
      content:
        "### Spread when the means differ: SD vs CV\n\nLesson 2.6 introduced the **coefficient of variation**, $\\text{CV} = \\frac{\\sigma}{\\bar{x}} \\times 100\\%$. It measures spread *relative to* the size of the values. This matters whenever the two groups have very different means or units.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — which batter is more consistent?** Over a season, batter P averages 50 runs with SD 15; batter Q averages 30 runs with SD 12.\n\n**Step 1.** By SD alone, Q looks steadier (12 $<$ 15).\n\n**Step 2 (CV).** $\\text{CV}_P = \\frac{15}{50} \\times 100 = 30\\%$ and $\\text{CV}_Q = \\frac{12}{30} \\times 100 = 40\\%$.\n\n**Step 3 (conclude).** Relative to what each usually scores, P varies less. **P is more consistent**, and also scores more.\n\nFor the two sections (same mean 32) the CV adds nothing new: $\\text{CV}_A \\approx 23\\%$, $\\text{CV}_B \\approx 36\\%$, the same order as the SDs.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "When to use which",
      content:
        "Use the **SD** (or IQR) to compare spread when the groups are measured in the same units and have similar centres. Use the **CV** when the centres differ a lot or the units differ (weights of elephants vs weights of mice, or rupees vs dollars). The CV only makes sense for data that are all positive and measured from a true zero.",
    },
    {
      type: "quiz",
      id: "st3-5-q2",
      variant: "practice",
      question:
        "Factory X's bulbs last a mean of 1200 h with SD 180 h. Factory Y's last a mean of 800 h with SD 140 h. Which factory's bulbs are relatively more consistent?",
      options: [
        {
          text: "X: CV 15% against Y's 17.5%",
          correct: true,
          feedback: "$\\frac{180}{1200} = 0.15$ and $\\frac{140}{800} = 0.175$. X has the larger SD but the smaller spread relative to its mean.",
        },
        {
          text: "Y, because its SD is smaller.",
          feedback: "With such different means, compare CVs rather than SDs. Y's CV is 17.5%, X's 15%.",
        },
        {
          text: "They are equally consistent.",
          feedback: "Compute both CVs: 15% and 17.5% are different.",
        },
      ],
      hint: "CV = SD ÷ mean × 100.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — exam style (which series is more variable?).** The heights of two varieties of seedling (cm) are summarised by totals only:\n\n**Variety A:** $n = 10$, $\\Sigma x = 500$, $\\Sigma x^2 = 25\\,810$\n**Variety B:** $n = 8$, $\\Sigma x = 320$, $\\Sigma x^2 = 13\\,088$\n\nWhich variety is more variable in height?\n\n**Step 1 (means).** $\\bar{x}_A = \\frac{500}{10} = 50$ and $\\bar{x}_B = \\frac{320}{8} = 40$.\n\n**Step 2 (variances).** $\\sigma_A^2 = \\frac{25\\,810}{10} - 50^2 = 2581 - 2500 = 81$, so $\\sigma_A = 9$. $\\sigma_B^2 = \\frac{13\\,088}{8} - 40^2 = 1636 - 1600 = 36$, so $\\sigma_B = 6$. *Why this form:* when only the totals are given, $\\sigma^2 = \\frac{\\Sigma x^2}{n} - \\bar{x}^2$ is the only route to the SD.\n\n**Step 3 (CVs).** $\\text{CV}_A = \\frac{9}{50} \\times 100 = 18\\%$ and $\\text{CV}_B = \\frac{6}{40} \\times 100 = 15\\%$. *Why this step:* the means differ (50 vs 40), so the fair comparison is spread relative to size. This is also the comparison that board exams expect.\n\n**Step 4 (conclude).** Variety A is more variable (18% against 15%); B is more consistent. Here the SD and the CV agree. In worked example 3 (the batters) they did not, which is why you compute the CV whenever the means differ.",
    },
    {
      type: "quiz",
      id: "st3-5-q6",
      variant: "practice",
      question:
        "For 5 observations, $\\Sigma x = 100$ and $\\Sigma x^2 = 2180$. What is the coefficient of variation?",
      options: [
        {
          text: "30%",
          correct: true,
          feedback: "$\\bar{x} = 20$, $\\sigma^2 = \\frac{2180}{5} - 20^2 = 436 - 400 = 36$, $\\sigma = 6$, and $\\text{CV} = \\frac{6}{20} \\times 100 = 30\\%$.",
        },
        {
          text: "180%",
          feedback: "That uses the variance, 36, in place of the SD. The CV uses $\\sigma = \\sqrt{36} = 6$.",
        },
        {
          text: "6%",
          feedback: "6 is the SD itself. Divide it by the mean, 20, before multiplying by 100.",
        },
        {
          text: "20%",
          feedback: "20 is the mean. The CV is SD ÷ mean × 100.",
        },
      ],
      hint: "Mean, then σ² = Σx²/n − mean², then CV.",
    },
    {
      type: "quiz",
      id: "st3-5-q3",
      variant: "practice",
      question:
        "Parallel boxplots of commute times: Route 1 has median 25 min, IQR 4 min; Route 2 has median 22 min, IQR 15 min. You must reach an exam on time. Which is the most defensible choice?",
      options: [
        {
          text: "Route 1: slightly slower typically, but far more predictable.",
          correct: true,
          feedback: "When lateness is costly, spread matters as much as centre. Route 2's IQR of 15 means a bad day can be much slower than its median.",
        },
        {
          text: "Route 2, because its median is lower.",
          feedback: "Centre is only one of the four parts. Route 2 is much more variable, and it's the bad days that make you late.",
        },
        {
          text: "It is impossible to say anything without the means.",
          feedback: "Medians and IQRs are perfectly good (often better) summaries for comparing commutes, which tend to be right-skewed.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-5-q4",
      variant: "concept",
      question:
        "Group P has mean 60, median 60, IQR 10. Group Q has mean 60, median 52, IQR 25. Which statement is best supported?",
      options: [
        {
          text: "Q is more spread out and probably right-skewed (mean above median), even though the means match.",
          correct: true,
          feedback: "Spread: IQR 25 vs 10. Shape: in Q the mean is pulled above the median, which suggests a right tail. The means alone would have hidden both.",
        },
        {
          text: "The groups are essentially the same, since their means are equal.",
          feedback: "Equal means, different medians, different spreads. They are not the same.",
        },
        {
          text: "Q performed better, because its IQR is larger.",
          feedback: "IQR measures spread, not level. A bigger IQR means less consistent, not better.",
        },
      ],
    },
  ]),
};

// ---------------------------------------------------------------------------
// 3.6 · Chapter 3 Mastery
// ---------------------------------------------------------------------------

const lessonMastery: LessonSeed = {
  slug: "chapter-3-mastery",
  title: "3.6 · Chapter 3 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Mixed questions from the whole chapter. For each one, first decide which idea it needs: shape, quartiles and fences, resistance, z-scores, or a comparison. Then compute. Every answer can be checked with a quick sanity test.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Toolkit",
      content:
        "**Shape:** the tail names the skew; right skew gives mode $<$ median $<$ mean.\n**Boxplot:** each of the four pieces holds about 25%, whatever its length.\n**Fences:** $Q_1 - 1.5\\,\\text{IQR}$ and $Q_3 + 1.5\\,\\text{IQR}$.\n**Resistant:** median, IQR. **Not resistant:** mean, SD, range.\n**z-score:** $z = \\frac{x - \\bar{x}}{\\sigma}$, and back again with $x = \\bar{x} + z\\sigma$; z-scores of a data set have mean 0 and SD 1.\n**Compare:** centre, spread, shape, unusual values; CV when the means differ.",
    },
    {
      type: "quiz",
      id: "st3-6-q1",
      variant: "mastery",
      question:
        "A boxplot of 80 students' marks has five-number summary $15, 24, 30, 33, 52$. About how many students scored between 24 and 52?",
      options: [
        {
          text: "About 60",
          correct: true,
          feedback: "From $Q_1$ to the max is three quarters of the data: $0.75 \\times 80 = 60$.",
        },
        {
          text: "About 40",
          feedback: "That is the middle half ($Q_1$ to $Q_3$). The question runs past $Q_3$ to the max.",
        },
        {
          text: "About 20",
          feedback: "That is one quarter, for example $Q_3$ to the max alone.",
        },
        {
          text: "More than 60, because the right whisker is the longest piece.",
          feedback: "Length shows spread, not count. The right whisker still holds about 25%.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-6-q2",
      variant: "mastery",
      question:
        "For the same summary $15, 24, 30, 33, 52$, which extreme values are outliers by the 1.5·IQR rule?",
      options: [
        {
          text: "Only the maximum, 52",
          correct: true,
          feedback: "IQR $= 9$, $1.5 \\times 9 = 13.5$, fences $10.5$ and $46.5$. $15 > 10.5$ is inside; $52 > 46.5$ is outside.",
        },
        {
          text: "Only the minimum, 15",
          feedback: "The lower fence is $24 - 13.5 = 10.5$, and 15 is above it.",
        },
        {
          text: "Both 15 and 52",
          feedback: "Check the lower fence: $24 - 13.5 = 10.5 < 15$.",
        },
        {
          text: "Neither",
          feedback: "The upper fence is $33 + 13.5 = 46.5$, and 52 is beyond it.",
        },
      ],
      hint: "IQR = 33 − 24.",
    },
    {
      type: "quiz",
      id: "st3-6-q3",
      variant: "mastery",
      question:
        "A data set of exam scores has mean 58 and median 64. What is the most likely shape?",
      options: [
        {
          text: "Left-skewed",
          correct: true,
          feedback: "Mean below median means a tail of low values is pulling the mean down, as happens when most students do well and a few do badly.",
        },
        {
          text: "Right-skewed",
          feedback: "A right tail would pull the mean *above* the median.",
        },
        {
          text: "Symmetric",
          feedback: "A 6-mark gap between mean and median points to a tail on one side.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-6-q4",
      variant: "mastery",
      question:
        "Aisha scored 68 on Test A (mean 60, SD 4). On Test B (mean 70, SD 8) she scored 81. On which test was her relative performance better?",
      options: [
        {
          text: "Test A: $z = 2$ against $z \\approx 1.38$",
          correct: true,
          feedback: "$z_A = \\frac{68 - 60}{4} = 2$; $z_B = \\frac{81 - 70}{8} = 1.375$.",
        },
        {
          text: "Test B, because 81 is higher than 68.",
          feedback: "Different tests, different scales. Standardise first.",
        },
        {
          text: "Test B, because she is 11 above the mean there and only 8 on A.",
          feedback: "Measure distance in each test's SD: 8 marks is 2 SDs on A, 11 marks is under 1.4 SDs on B.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-6-q5",
      variant: "mastery",
      question:
        "In an exam, a mark of 82 has z-score 2 and a mark of 58 has z-score $-1$. What are the mean and SD?",
      options: [
        {
          text: "Mean 66, SD 8",
          correct: true,
          feedback: "$82 = \\bar{x} + 2\\sigma$ and $58 = \\bar{x} - \\sigma$. Subtracting: $24 = 3\\sigma$, $\\sigma = 8$, $\\bar{x} = 66$. Check: $66 + 16 = 82$ ✓.",
        },
        {
          text: "Mean 70, SD 12",
          feedback: "That makes $70 - 12 = 58$ ✓ but $70 + 24 = 94 \\ne 82$.",
        },
        {
          text: "Mean 70, SD 6",
          feedback: "$70 + 12 = 82$ ✓ but $70 - 6 = 64 \\ne 58$.",
        },
        {
          text: "Mean 66, SD 12",
          feedback: "The two marks are 24 apart and 3 SDs apart ($2 - (-1)$), so $\\sigma = 24/3$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-6-q6",
      variant: "mastery",
      question:
        "The ages of guests at a party are summarised. Then a 95-year-old great-grandmother, older than every other guest, arrives. Which pair of statistics is guaranteed to change?",
      options: [
        {
          text: "The mean and the range",
          correct: true,
          feedback: "She is older than everyone else, so the max and hence the range grow, and a new value above the mean always raises the mean. The median and IQR may shift slightly or not at all.",
        },
        {
          text: "The median and the IQR",
          feedback: "These are resistant: one extra value can only nudge them to a neighbouring position (a small shift, sometimes none). They are not guaranteed to change, and they cannot jump the way the mean and range do.",
        },
        {
          text: "The mode and the median",
          feedback: "A single new value rarely changes the mode, and the median may stay put.",
        },
      ],
      hint: "Which statistics use the largest value or every value directly?",
    },
    {
      type: "quiz",
      id: "st3-6-q7",
      variant: "mastery",
      question:
        "Every value in a data set is converted to a z-score. Which is true of the list of z-scores?",
      options: [
        {
          text: "Mean 0, SD 1, and the same shape as the original data.",
          correct: true,
          feedback: "Standardising is a shift then a positive scale. That fixes the centre at 0 and the spread at 1 but cannot change the shape.",
        },
        {
          text: "Mean 0, SD 1, and a symmetric bell shape.",
          feedback: "Standardising does not make data normal. Skewed data give skewed z-scores.",
        },
        {
          text: "Mean 1, SD 0.",
          feedback: "Swapped. Subtracting the mean makes the new mean 0, and dividing by $\\sigma$ makes the new SD 1.",
        },
        {
          text: "All between $-1$ and 1.",
          feedback: "Values can be several SDs from the mean; Arjun's $z$ was 3.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-6-q8",
      variant: "mastery",
      question:
        "Group X: mean 40 kg, SD 8 kg. Group Y: mean 120 kg, SD 18 kg. Which group's weights are relatively more variable?",
      options: [
        {
          text: "X: CV 20% against Y's 15%",
          correct: true,
          feedback: "$\\frac{8}{40} = 20\\%$ and $\\frac{18}{120} = 15\\%$. Y has the bigger SD, but relative to its mean it varies less.",
        },
        {
          text: "Y, because 18 kg is more than 8 kg.",
          feedback: "With means this different, compare CVs, not raw SDs.",
        },
        {
          text: "They are equally variable.",
          feedback: "20% and 15% are not equal.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-6-q9",
      variant: "mastery",
      question:
        "A data set has mean 45, median 42 and SD 6. Find Pearson's coefficient of skewness $\\text{Sk}_P = \\frac{3(\\bar{x} - \\text{median})}{\\sigma}$.",
      options: [
        {
          text: "$1.5$",
          correct: true,
          feedback: "$\\text{Sk}_P = \\frac{3(45 - 42)}{6} = \\frac{9}{6} = 1.5$. Positive, so the data are right-skewed: the mean is pulled above the median.",
        },
        {
          text: "$0.5$",
          feedback: "That is $\\frac{45 - 42}{6}$. The formula has a factor of 3 in front of the difference.",
        },
        {
          text: "$-1.5$",
          feedback: "The sign is flipped. The mean is **above** the median, so $\\bar{x} - \\text{median} = +3$ and the coefficient is positive.",
        },
        {
          text: "$0.17$",
          feedback: "That is $\\frac{3}{18}$. Divide $3 \\times 3 = 9$ by the SD, 6.",
        },
      ],
      hint: "Mean minus median, times 3, divided by the SD.",
    },
    {
      type: "quiz",
      id: "st3-6-q10",
      variant: "mastery",
      question:
        "In a moderately skewed distribution the mean is 36 and the mode is 30. Estimate the median.",
      options: [
        {
          text: "34",
          correct: true,
          feedback: "$\\text{median} = \\frac{\\text{mode} + 2\\,\\text{mean}}{3} = \\frac{30 + 72}{3} = 34$. It lies between mode and mean, one third of the way from the mean: $30 < 34 < 36$ ✓.",
        },
        {
          text: "33",
          feedback: "That is the plain average of mean and mode. The mean carries weight 2.",
        },
        {
          text: "32",
          feedback: "That is $\\frac{2(30) + 36}{3}$: the weights on mode and mean are swapped.",
        },
        {
          text: "48",
          feedback: "That is $3(36) - 2(30)$, which lands outside the gap between mode and mean. Rearrange mode $= 3\\,$median$\\, - 2\\,$mean for the median.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st3-6-q11",
      variant: "mastery",
      question:
        "Five observations have mean 6 and SD 2. One of them was recorded as 10 but should have been 4. What are the correct mean and SD?",
      options: [
        {
          text: "Mean 4.8, SD 0.4",
          correct: true,
          feedback: "$\\Sigma x = 30 \\to 30 - 10 + 4 = 24$, mean $4.8$. $\\Sigma x^2 = 5(4 + 36) = 200 \\to 200 - 100 + 16 = 116$. $\\sigma^2 = \\frac{116}{5} - 4.8^2 = 23.2 - 23.04 = 0.16$, so $\\sigma = 0.4$.",
        },
        {
          text: "Mean 4.8, SD 2",
          feedback: "The SD is not resistant either. The wrong value 10 was the main source of spread, and correcting it shrinks the SD a lot.",
        },
        {
          text: "Mean 5.4, SD 0.4",
          feedback: "The value fell by 6, so the total fell by 6 and the mean by $\\frac{6}{5} = 1.2$, not 0.6.",
        },
        {
          text: "Mean 4.8, SD $\\approx 4.82$",
          feedback: "That is $\\sqrt{116/5}$: you forgot to subtract $\\bar{x}^2$. Use $\\sigma^2 = \\frac{\\Sigma x^2}{n} - \\bar{x}^2$.",
        },
      ],
      hint: "Correct Σx and Σx², then recompute.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "So far every question has involved one variable at a time. Chapter 4 moves to **pairs** of values, like hours studied and marks scored. It asks how two quantities move together, and it builds that from the same idea you used for the z-score: distance from the mean.",
    },
  ]),
};

export const statisticsChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
