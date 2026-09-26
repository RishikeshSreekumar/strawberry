import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Statistics Chapter 1 — Measures of Centre.
 * One number to stand for the lot: the mean as a balance point, the median
 * as the middle, the mode as the peak. Each is derived from what it does,
 * computed for raw, frequency and grouped data, and tested against the
 * data sets where it misleads.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

/** 50 daily wages (₹) that fall into the CBSE-style classes used in 1.2. */
const WAGES = [
  101, 104, 106, 108, 110, 112, 113, 115, 116, 117, 118, 119, 121, 122, 124, 126, 127, 128, 130, 131, 133, 135, 136,
  137, 138, 139, 142, 145, 148, 150, 152, 155, 157, 159, 162, 166, 170, 172, 175, 178, 181, 184, 186, 188, 190, 192,
  194, 196, 198, 199,
];

const lesson01: LessonSeed = {
  slug: "mean-as-balance-point",
  title: "1.1 · The Mean as a Balance Point",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/st-1-measures-of-centre.mp4",
      poster: "/videos/st-1-measures-of-centre.jpg",
      title: "Chapter 1 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Chapter 0 left us with pictures of a whole distribution. Often you need something smaller: **one number that stands for the lot**. What was a typical score, a typical wage, a typical commute? This chapter builds three different answers (the mean, the median and the mode) and shows that each one answers a different question.",
    },
    {
      type: "text",
      content:
        "Start with the most familiar one, the mean. Forget the formula for a moment and think about what it *does*. Five friends bring ₹20, ₹30, ₹50, ₹40 and ₹60 to a picnic and decide to pool the money and share it equally. The pot holds ₹200, so each friend ends up with ₹40. That fair share is the mean: the amount everyone would have **if the total were levelled out evenly**.",
    },
    { type: "math", latex: "\\bar{x} = \\frac{x_1 + x_2 + \\cdots + x_n}{n} = \\frac{\\sum x_i}{n}" },
    {
      type: "text",
      content:
        "There is a second picture, and it is the one to carry around. Put each value on a number line as a weight of 1 kg on a weightless ruler. The mean is the point where the ruler **balances**. Below, the data are 4, 6, 7, 9 and 14, whose mean is $\\frac{40}{5} = 8$. The triangle under the axis is the fulcrum, and the bars show each value's deviation from the mean.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [4, 6, 7, 9, 14],
        range: { min: 0, max: 30 },
        xLabel: "Value",
        view: "dotplot",
        stats: ["mean"],
        showBalance: true,
        deviations: "bars",
        caption:
          "Drag the 14 out to 25 and watch the fulcrum chase it. Then add a sixth dot. The signed deviations always add to zero; that is exactly what 'balanced' means.",
      },
    },
    {
      type: "text",
      content:
        "Look at the deviations about 8: $4 - 8 = -4$, $6 - 8 = -2$, $7 - 8 = -1$, $9 - 8 = 1$ and $14 - 8 = 6$. The left side pulls with $-4 - 2 - 1 = -7$ and the right side with $1 + 6 = 7$. They cancel. One far-away value (14) balances three nearby ones, the same way a child sitting at the very end of a see-saw balances a heavier child sitting near the middle.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Deviation from the mean",
      content:
        "The **deviation** of a value $x_i$ is $x_i - \\bar{x}$: how far it sits from the mean, with a sign. Positive means above the mean, negative means below.",
    },
    {
      type: "text",
      content:
        "The cancelling is not a coincidence of these five numbers. It follows straight from the definition. Add up all the deviations and split the sum:",
    },
    {
      type: "math",
      latex:
        "\\sum_{i=1}^{n} (x_i - \\bar{x}) = \\sum x_i - n\\bar{x} = \\sum x_i - n\\cdot\\frac{\\sum x_i}{n} = 0",
    },
    {
      type: "callout",
      variant: "info",
      title: "The balance property",
      content:
        "The deviations from the mean always add to zero: $\\sum (x_i - \\bar{x}) = 0$. The mean is the **only** number with this property: if $\\sum(x_i - c) = 0$ then $\\sum x_i = nc$, so $c = \\bar{x}$. You will use this fact again for the assumed-mean method (1.2), for mean deviation (Chapter 2) and for the regression line (Chapter 4).",
    },
    {
      type: "text",
      content:
        "**Worked example: guess, then correct.** Five parcels weigh 52, 55, 49, 58 and 61 kg. Find the mean weight without adding the raw numbers.\n\n**Step 1: guess a balance point.** Say 54 kg. *Why:* any guess will do; the deviations will tell us how far off it is.\n\n**Step 2: deviations from the guess.** $52 - 54 = -2$, $55 - 54 = 1$, $49 - 54 = -5$, $58 - 54 = 4$, $61 - 54 = 7$. They add to $-2 + 1 - 5 + 4 + 7 = 5$, not 0, so 54 is not the balance point.",
    },
    {
      type: "math",
      latex: "\\sum (x_i - 54) = \\sum x_i - 5(54) = 5 \\;\\Rightarrow\\; \\bar{x} = 54 + \\frac{5}{5} = 55",
    },
    {
      type: "text",
      content:
        "**Step 3: correct the guess.** The leftover pull of $+5$, shared over 5 parcels, moves the balance point $1$ kg to the right: $\\bar{x} = 55$ kg. *Why it works:* the deviations about the true mean must add to zero, so the leftover sum measures exactly how far the guess missed, times $n$.\n\n**Check:** $52 + 55 + 49 + 58 + 61 = 275$ and $\\frac{275}{5} = 55$. ✓ This guess-and-correct trick is the assumed-mean method of 1.2 in miniature.",
    },
    {
      type: "text",
      content:
        "Notice something in the example: the mean, 8, is **not one of the data values**. Nothing forces the balance point to sit on a weight. The average Indian family might have 2.4 children, and no family has 2.4 children. What the statement *does* guarantee is the total: 100 families with a mean of 2.4 have 240 children between them.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Mean × count = total",
      content:
        "Whenever a problem hands you a mean, turn it into a total straight away: $\\sum x_i = n\\bar{x}$. Almost every 'find the missing value' problem falls apart once you do.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** The mean of 7 numbers is 12. Six of them are 10, 14, 9, 15, 11 and 11. Find the seventh.\n\n**Step 1: total.** The seven numbers add to $7 \\times 12 = 84$.\n\n**Step 2: known part.** $10 + 14 + 9 + 15 + 11 + 11 = 70$.\n\n**Step 3: missing part.** The seventh number is $84 - 70 = 14$.\n\n**Check with balance:** deviations from 12 are $-2, 2, -3, 3, -1, -1, 2$, which add to $0$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** A batter's mean score over 5 innings is 42. After a sixth innings the mean drops to 40. What did she score in the sixth innings?\n\n**Step 1:** total after 5 innings $= 5 \\times 42 = 210$.\n\n**Step 2:** total after 6 innings $= 6 \\times 40 = 240$.\n\n**Step 3:** sixth innings $= 240 - 210 = 30$.\n\nIn balance language: the new score sits $30 - 42 = -12$ below the old mean, and its pull of $-12$ is shared over 6 innings, moving the mean by $-12/6 = -2$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (exam style: the overlapping middle).** The mean of 25 observations is 36. The mean of the first 13 observations is 32 and the mean of the last 13 is 39. Find the 13th observation.\n\n**Step 1: turn every mean into a total.** *Why:* totals can be added and subtracted; means cannot.",
    },
    {
      type: "math",
      latex:
        "\\sum_{i=1}^{25} x_i = 25 \\times 36 = 900, \\qquad \\sum_{i=1}^{13} x_i = 13 \\times 32 = 416, \\qquad \\sum_{i=13}^{25} x_i = 13 \\times 39 = 507",
    },
    {
      type: "text",
      content:
        "**Step 2: spot the overlap.** 'The first 13' are positions 1–13 and 'the last 13' are positions 13–25. Together they name $13 + 13 = 26$ positions, but there are only 25, so position 13 is counted twice. *Why this matters:* adding the two partial totals gives the full total **plus one extra copy** of $x_{13}$.",
    },
    {
      type: "math",
      latex: "416 + 507 = 900 + x_{13} \\;\\Rightarrow\\; x_{13} = 923 - 900 = 23",
    },
    {
      type: "text",
      content:
        "**Check:** positions 1–12 total $416 - 23 = 393$ and positions 14–25 total $507 - 23 = 484$. Then $393 + 23 + 484 = 900$. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "One value can drag the mean a long way",
      content:
        "Moving a single value by $k$ moves the mean by $\\frac{k}{n}$. With 5 values, pushing one of them 20 units to the right shifts the mean 4 units right. The mean listens to every value, including the extreme ones. That is its strength and, as 1.6 will show, its weakness.",
    },
    {
      type: "quiz",
      id: "st1-1-q1",
      variant: "concept",
      question: "A survey reports that families in a town have a mean of 2.4 children. Which statement must be true?",
      options: [
        {
          text: "The total number of children is 2.4 times the number of families.",
          correct: true,
          feedback: "Yes. A mean always converts to a total: $\\sum x = n\\bar{x}$.",
        },
        {
          text: "At least one family has exactly 2.4 children.",
          feedback: "Counts of children are whole numbers. The balance point need not sit on any data value.",
        },
        {
          text: "Most families have 2 or 3 children.",
          feedback: "Not necessarily. If 60% of families had 0 children and 40% had 6, the mean would still be 2.4, and no family would have 2 or 3.",
        },
        {
          text: "The mean must equal one of the recorded values once there are enough families.",
          feedback: "More data does not force the balance point onto a data value. Data 1, 2 has mean 1.5 however often it is repeated.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st1-1-q2",
      variant: "practice",
      question: "The deviations of four values from their mean are $-3$, $1$, $5$ and $d$. What is $d$?",
      options: [
        { text: "$-3$", correct: true, feedback: "Deviations from the mean add to zero: $-3 + 1 + 5 + d = 0$, so $d = -3$." },
        { text: "$3$", feedback: "That makes the sum $6$, not $0$. Check the signs." },
        { text: "$0$", feedback: "Only if the other three already cancelled, which they do not: they add to $3$." },
        { text: "It cannot be found without the data values.", feedback: "The balance property alone pins it down: the four deviations must sum to zero." },
      ],
      hint: "What do the deviations from the mean always add up to?",
    },
    {
      type: "quiz",
      id: "st1-1-q3",
      variant: "practice",
      question: "The mean of 5 numbers is 18. If the number 30 is removed, what is the mean of the remaining four?",
      options: [
        { text: "$15$", correct: true, feedback: "Total $= 5 \\times 18 = 90$. Remove 30 to get 60, and $60 / 4 = 15$." },
        { text: "$12$", feedback: "That is $(90 - 30)/5$: the count must drop to 4 too." },
        { text: "$18$", feedback: "Removing a value above the mean pulls the mean down." },
        { text: "$16.5$", feedback: "Convert the mean to a total first: $\\sum x = 90$." },
      ],
    },
    {
      type: "quiz",
      id: "st1-1-q4",
      variant: "concept",
      question:
        "Data: 3, 5, 6, 8, 13 (mean 7). The largest value is changed from 13 to 23. What happens to the mean?",
      options: [
        { text: "It rises by 2, to 9.", correct: true, feedback: "The total rises by 10 and is shared over 5 values: $10/5 = 2$." },
        { text: "It rises by 10, to 17.", feedback: "The extra 10 is shared among all 5 values, not given to the mean in full." },
        { text: "It stays at 7, because only one value changed.", feedback: "The mean uses every value. Moving any one of them moves the balance point." },
        { text: "It rises by 5, to 12.", feedback: "Divide the extra 10 by the number of values, 5." },
      ],
    },
    {
      type: "quiz",
      id: "st1-1-q5",
      variant: "practice",
      question: "The deviations of 8 values from the number 30 add up to $-12$. What is the mean of the 8 values?",
      options: [
        {
          text: "$28.5$",
          correct: true,
          feedback: "$\\sum(x_i - 30) = \\sum x_i - 240 = -12$, so $\\sum x_i = 228$ and $\\bar{x} = 30 - \\frac{12}{8} = 28.5$.",
        },
        { text: "$18$", feedback: "That subtracts the whole $-12$ from 30. The leftover pull is shared over 8 values: $-12/8 = -1.5$." },
        { text: "$31.5$", feedback: "The deviations add to a negative number, so the values sit mostly below 30 and the mean is below 30." },
        { text: "$-1.5$", feedback: "That is how far the mean is from 30, i.e. $\\bar{x} - 30$. Add 30 back." },
      ],
      hint: "About the true mean the deviations add to 0. About 30 they add to $\\sum x_i - 8 \\times 30$.",
    },
    {
      type: "quiz",
      id: "st1-1-q6",
      variant: "practice",
      question:
        "The mean of 11 observations is 50. The mean of the first 6 is 49 and the mean of the last 6 is 52. Find the 6th observation.",
      options: [
        {
          text: "$56$",
          correct: true,
          feedback:
            "Totals: $11 \\times 50 = 550$, $6 \\times 49 = 294$, $6 \\times 52 = 312$. Positions 1–6 and 6–11 overlap at position 6, so $294 + 312 = 550 + x_6$, giving $x_6 = 56$.",
        },
        { text: "$50.5$", feedback: "That averages the two partial means. Convert every mean to a total instead." },
        { text: "$606$", feedback: "That is $294 + 312$, the full total plus the 6th value. Subtract the full total, 550." },
        {
          text: "It cannot be found without the other ten values.",
          feedback: "The three totals are enough: the only value counted twice is the 6th.",
        },
      ],
      hint: "How many positions do 'the first 6' and 'the last 6' cover together, out of 11?",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "mean-of-grouped-data",
  title: "1.2 · Mean of Frequency and Grouped Data",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Real data rarely arrive as a short list. They arrive as a **frequency table**: 'goals scored per match' with a count beside each value, or 'daily wages' sorted into classes. The mean still means the same thing (fair share, balance point), and you only need a way to add everything up without writing each value out.",
    },
    {
      type: "text",
      content:
        "Here are the goals a football club scored in 20 matches:",
    },
    {
      type: "table",
      headers: ["Goals $x$", "0", "1", "2", "3", "4"],
      rows: [["Matches $f$", "3", "5", "6", "4", "2"]],
    },
    {
      type: "text",
      content:
        "'3 matches with 0 goals' means the value 0 appears 3 times in the raw list. Writing the list out would give $0+0+0+1+1+1+1+1+2+\\cdots$. Each value $x$ appears $f$ times, so it contributes $f \\times x$ to the total. There are $\\sum f$ values in all. So the formula is not new; it is the ordinary mean with the repeats bundled:",
    },
    { type: "math", latex: "\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}" },
    {
      type: "text",
      content:
        "For the club: $\\sum fx = 0(3) + 1(5) + 2(6) + 3(4) + 4(2) = 0 + 5 + 12 + 12 + 8 = 37$ and $\\sum f = 20$, so $\\bar{x} = \\frac{37}{20} = 1.85$ goals per match.",
    },
    {
      type: "text",
      content:
        "**Grouped data** add one more problem. Suppose we only know that 12 workers earn between ₹100 and ₹120 a day. We do not know their individual wages, so we cannot add them. The standard fix is an **assumption**: pretend every value in a class sits at the class mark (the midpoint). Twelve workers at ₹110 each contribute $12 \\times 110$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The midpoint assumption",
      content:
        "For grouped data, each class is represented by its **class mark** $x_i = \\frac{\\text{lower limit} + \\text{upper limit}}{2}$, and then $\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}$ as before. This is exact only if the values in each class balance at the midpoint. In general it is an **estimate**.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: WAGES,
        range: { min: 100, max: 200 },
        xLabel: "Daily wage (₹)",
        view: "histogram",
        views: ["histogram", "dotplot"],
        binWidth: 20,
        binStart: 100,
        stats: ["mean"],
        caption:
          "These are the 50 raw wages behind the table below. The readout is the exact mean of the raw values (₹146.1). The grouped table gives ₹145.2, because inside each class the values do not balance exactly at the midpoint. Switch to the dot plot to see how the values sit inside each class.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example (direct method).** The daily wages of 50 workers:",
    },
    {
      type: "table",
      headers: ["Wage (₹)", "$f$", "Class mark $x$", "$fx$"],
      rows: [
        ["100–120", "12", "110", "1320"],
        ["120–140", "14", "130", "1820"],
        ["140–160", "8", "150", "1200"],
        ["160–180", "6", "170", "1020"],
        ["180–200", "10", "190", "1900"],
        ["Total", "50", "", "7260"],
      ],
    },
    {
      type: "text",
      content: "So $\\bar{x} = \\frac{7260}{50} = 145.2$. The estimated mean wage is ₹145.20.",
    },
    {
      type: "text",
      content:
        "The products $fx$ got large quickly. Exam tables with class marks like 245 or 1150 make the direct method painful. Two shortcuts shrink the numbers, and both come from one property of the mean.",
    },
    {
      type: "text",
      content:
        "**The shift-and-scale property.** If you subtract a constant $A$ from every value, the balance point slides by exactly $A$: every weight moves left by $A$, so the ruler balances $A$ further left. If you then divide every value by $h$, the whole picture shrinks by a factor $h$, and so does the balance point. In symbols, with $d = x - A$ and $u = \\frac{x - A}{h}$:",
    },
    {
      type: "math",
      latex:
        "\\bar{d} = \\frac{\\sum f(x - A)}{\\sum f} = \\frac{\\sum fx}{\\sum f} - A\\frac{\\sum f}{\\sum f} = \\bar{x} - A \\qquad \\bar{u} = \\frac{\\bar{x} - A}{h}",
    },
    {
      type: "text",
      content: "Rearranging gives the two shortcut formulas. They are not new facts; they undo the shift and the scale.",
    },
    {
      type: "math",
      latex:
        "\\text{Assumed mean: } \\bar{x} = A + \\frac{\\sum f d}{\\sum f} \\qquad \\text{Step deviation: } \\bar{x} = A + h\\cdot\\frac{\\sum f u}{\\sum f}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Choosing A and h",
      content:
        "Any $A$ works, because you add it back at the end. Choose a class mark near the middle of the table, preferably one with a large frequency, so the $d$ values are small and centred on 0. Choose $h$ as the common class width, so the $u$ values become small integers $\\ldots, -2, -1, 0, 1, 2, \\ldots$",
    },
    {
      type: "text",
      content:
        "**Worked example (step deviation), same wages.** Take $A = 150$ and $h = 20$.\n\n**Step 1: compute $u = \\frac{x - 150}{20}$ for each class mark.**",
    },
    {
      type: "table",
      headers: ["Wage (₹)", "$f$", "$x$", "$u = \\frac{x-150}{20}$", "$fu$"],
      rows: [
        ["100–120", "12", "110", "$-2$", "$-24$"],
        ["120–140", "14", "130", "$-1$", "$-14$"],
        ["140–160", "8", "150", "$0$", "$0$"],
        ["160–180", "6", "170", "$1$", "$6$"],
        ["180–200", "10", "190", "$2$", "$20$"],
        ["Total", "50", "", "", "$-12$"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 2: mean of $u$.** $\\bar{u} = \\frac{-12}{50} = -0.24$.\n\n**Step 3: undo the scale.** Multiply by $h$: $20 \\times (-0.24) = -4.8$. That is $\\bar{x} - A$.\n\n**Step 4: undo the shift.** $\\bar{x} = 150 - 4.8 = 145.2$. The same answer as the direct method, with arithmetic you can do in your head.\n\nWith the assumed-mean method only ($A = 150$, no scaling), $d = -40, -20, 0, 20, 40$ and $\\sum fd = -480 - 280 + 0 + 120 + 400 = -240$, so $\\bar{x} = 150 - \\frac{240}{50} = 145.2$ again.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The two classic slips",
      content:
        "Forgetting to multiply by $h$ at the end (writing $150 - 0.24$) and forgetting to add $A$ back (writing $-4.8$ as the mean). If your answer lies outside the range of the data, or is suspiciously close to $A$, check both.",
    },
    {
      type: "text",
      content:
        "**Worked example (application: an electricity bill).** A housing society records last month's electricity use of its 40 flats. Estimate the mean consumption, and the average bill at ₹6 per unit.",
    },
    {
      type: "table",
      headers: ["Units", "$f$", "$x$", "$u = \\frac{x-225}{50}$", "$fu$"],
      rows: [
        ["100–150", "4", "125", "$-2$", "$-8$"],
        ["150–200", "9", "175", "$-1$", "$-9$"],
        ["200–250", "14", "225", "$0$", "$0$"],
        ["250–300", "8", "275", "$1$", "$8$"],
        ["300–350", "5", "325", "$2$", "$10$"],
        ["Total", "40", "", "", "$1$"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1: choose $A$ and $h$.** $A = 225$ is the central class mark and has the largest frequency; $h = 50$ is the class width. *Why:* the $u$ column becomes $-2, \\ldots, 2$, and every $fu$ is a one-digit product.\n\n**Step 2: add the $fu$ column.** $-8 - 9 + 0 + 8 + 10 = 1$, so $\\bar{u} = \\frac{1}{40}$.\n\n**Step 3: undo the scale, then the shift.**",
    },
    {
      type: "math",
      latex: "\\bar{x} = A + h\\,\\bar{u} = 225 + 50 \\times \\frac{1}{40} = 225 + 1.25 = 226.25 \\text{ units}",
    },
    {
      type: "text",
      content:
        "**Step 4: answer the question asked.** The estimated mean bill is $226.25 \\times 6 = 1357.50$, i.e. ₹1357.50. *Why multiplying the mean is allowed:* bill $= 6 \\times$ units for every flat, and multiplying every value by 6 multiplies the mean by 6. The society's total is $40 \\times 1357.50 = 54{,}300$, i.e. ₹54,300.\n\n**Check (direct method):** $\\sum fx = 500 + 1575 + 3150 + 2200 + 1625 = 9050$ and $\\frac{9050}{40} = 226.25$. ✓ The $\\sum fu$ of just 1 tells you at a glance that the mean sits barely above $A$.",
    },
    {
      type: "text",
      content:
        "**Worked example (CBSE board style: missing frequencies).** The mean of the distribution below is 50 and the total frequency is 120. Find $f_1$ and $f_2$.",
    },
    {
      type: "table",
      headers: ["Class", "0–20", "20–40", "40–60", "60–80", "80–100"],
      rows: [
        ["$f$", "17", "$f_1$", "32", "$f_2$", "19"],
        ["$u = \\frac{x - 50}{20}$", "$-2$", "$-1$", "$0$", "$1$", "$2$"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1: use the total frequency.** $17 + f_1 + 32 + f_2 + 19 = 120$, so $f_1 + f_2 = 52$. *Why:* two unknowns need two equations, and this is the free one.\n\n**Step 2: pick $A$ equal to the given mean.** With $A = 50$ and $h = 20$, the formula $\\bar{x} = A + h\\,\\bar{u}$ says $50 = 50 + 20\\,\\bar{u}$, so $\\bar{u} = 0$ and $\\sum fu = 0$. *Why this choice:* the balance property says deviations about the true mean add to zero, so centring on 50 makes the second equation as simple as possible.",
    },
    {
      type: "math",
      latex:
        "\\sum fu = 17(-2) + f_1(-1) + 32(0) + f_2(1) + 19(2) = 4 - f_1 + f_2 = 0 \\;\\Rightarrow\\; f_1 - f_2 = 4",
    },
    {
      type: "text",
      content:
        "**Step 3: solve.** Adding $f_1 + f_2 = 52$ and $f_1 - f_2 = 4$ gives $2f_1 = 56$, so $f_1 = 28$ and $f_2 = 24$.\n\n**Check (direct method):** $\\sum fx = 17(10) + 28(30) + 32(50) + 24(70) + 19(90) = 170 + 840 + 1600 + 1680 + 1710 = 6000$, and $\\frac{6000}{120} = 50$. ✓",
    },
    {
      type: "text",
      content:
        "**How wrong can the midpoint assumption be?** Suppose the class 10–20 holds five values: 11, 12, 13, 18 and 19. Their true mean is $\\frac{73}{5} = 14.6$, but the grouped method counts all five at 15. Across a whole table these errors partly cancel (some classes lean left, some lean right), which is why grouped means are usually close. But 'usually close' is not 'exact'.",
    },
    {
      type: "quiz",
      id: "st1-2-q1",
      variant: "concept",
      question:
        "A grouped frequency table gives $\\bar{x} = 145.2$. The raw data behind it are then found. What should you expect?",
      options: [
        {
          text: "The raw mean is probably close to 145.2 but need not equal it.",
          correct: true,
          feedback:
            "Right. The grouped mean assumes every value sits at its class mark, so it is an estimate. For the wage data the raw mean is 146.1.",
        },
        {
          text: "The raw mean is exactly 145.2, because the formula uses every class.",
          feedback: "The formula uses every class, but not every value. Inside a class, values need not balance at the midpoint.",
        },
        {
          text: "The raw mean is always larger than the grouped mean.",
          feedback: "The error can go either way, depending on where the values sit within their classes.",
        },
        {
          text: "The raw mean cannot be compared, because grouped and raw means measure different things.",
          feedback: "They measure the same thing, the balance point. The grouped version just estimates it.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st1-2-q2",
      variant: "practice",
      question: "Find the mean: $x = 10, 20, 30$ with frequencies $f = 2, 5, 3$.",
      options: [
        { text: "$21$", correct: true, feedback: "$\\sum fx = 20 + 100 + 90 = 210$ and $\\sum f = 10$, so $\\bar{x} = 21$." },
        { text: "$20$", feedback: "That is the mean of the three values ignoring frequencies. The 30s outnumber the 10s here." },
        { text: "$70$", feedback: "That is $210/3$: divide by the number of observations, $\\sum f = 10$, not the number of distinct values." },
        { text: "$3.33$", feedback: "That is $\\sum f / 3$. The numerator should be $\\sum fx$." },
      ],
    },
    {
      type: "quiz",
      id: "st1-2-q3",
      variant: "practice",
      question:
        "A step-deviation table uses $A = 50$ and $h = 10$ and gives $\\sum f = 40$, $\\sum fu = -6$. What is the mean?",
      options: [
        { text: "$48.5$", correct: true, feedback: "$\\bar{x} = 50 + 10 \\times \\frac{-6}{40} = 50 - 1.5 = 48.5$." },
        { text: "$49.85$", feedback: "That is $50 - 0.15$: you forgot to multiply $\\bar{u}$ by $h = 10$." },
        { text: "$51.5$", feedback: "$\\sum fu$ is negative, so the mean lies below $A$." },
        { text: "$-1.5$", feedback: "That is $\\bar{x} - A$. Add $A$ back." },
      ],
      hint: "$\\bar{x} = A + h\\,\\bar{u}$.",
    },
    {
      type: "quiz",
      id: "st1-2-q4",
      variant: "concept",
      question: "Why does the assumed-mean method give the right answer whatever value of $A$ you choose?",
      options: [
        {
          text: "Subtracting $A$ from every value shifts the mean by exactly $A$, and the formula adds $A$ back.",
          correct: true,
          feedback: "Yes: $\\bar{d} = \\bar{x} - A$, so $\\bar{x} = A + \\bar{d}$ for any $A$.",
        },
        {
          text: "It only works when $A$ happens to be the true mean.",
          feedback: "If $A$ were the true mean you would not need the method. Any $A$ works; a central one just keeps the numbers small.",
        },
        {
          text: "The deviations $d$ always add to zero, so $A$ cancels out.",
          feedback: "The deviations add to zero only about the true mean. About an arbitrary $A$ they add to $n(\\bar{x} - A)$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st1-2-q5",
      variant: "practice",
      question:
        "The mean of the distribution $x = 5, 10, 15, 20$ with frequencies $3, p, 5, 2$ is 12. Find $p$.",
      options: [
        {
          text: "$p = 5$",
          correct: true,
          feedback:
            "$\\sum fx = 15 + 10p + 75 + 40 = 130 + 10p$ and $\\sum f = 10 + p$. Setting $130 + 10p = 12(10 + p)$ gives $2p = 10$.",
        },
        { text: "$p = 4$", feedback: "Check: $\\frac{170}{14} \\approx 12.14$, not 12." },
        { text: "$p = 10$", feedback: "Check: $\\frac{230}{20} = 11.5$, not 12." },
        { text: "$p = 6$", feedback: "Check: $\\frac{190}{16} = 11.875$, not 12." },
      ],
      hint: "Write $\\sum fx$ and $\\sum f$ in terms of $p$, then use $\\sum fx = \\bar{x}\\sum f$.",
    },
    {
      type: "quiz",
      id: "st1-2-q6",
      variant: "practice",
      question:
        "The daily screen time (minutes) of 50 students: classes 20–40, 40–60, 60–80, 80–100, 100–120 with frequencies 6, 10, 15, 12, 7. Using $A = 70$ and $h = 20$, find the mean.",
      options: [
        {
          text: "$71.6$ minutes",
          correct: true,
          feedback:
            "$u = -2, -1, 0, 1, 2$, so $\\sum fu = -12 - 10 + 0 + 12 + 14 = 4$. Then $\\bar{x} = 70 + 20 \\times \\frac{4}{50} = 70 + 1.6 = 71.6$.",
        },
        { text: "$70.08$ minutes", feedback: "That is $70 + \\frac{4}{50}$: you forgot to multiply $\\bar{u}$ by $h = 20$." },
        { text: "$68.4$ minutes", feedback: "$\\sum fu = +4$ is positive, so the mean lies above $A = 70$." },
        { text: "$1.6$ minutes", feedback: "That is $\\bar{x} - A$. Add $A = 70$ back." },
      ],
      hint: "Build the $fu$ column; $\\bar{x} = A + h \\cdot \\frac{\\sum fu}{\\sum f}$.",
    },
    {
      type: "quiz",
      id: "st1-2-q7",
      variant: "practice",
      question:
        "Classes 0–10, 10–20, 20–30, 30–40, 40–50 have frequencies 5, $p$, 20, $q$, 5. The total frequency is 50 and the mean is 27. Find $p$ and $q$.",
      options: [
        {
          text: "$p = 5$, $q = 15$",
          correct: true,
          feedback:
            "$p + q = 20$. With $A = 25$, $h = 10$: $\\sum fu = -10 - p + q + 10 = q - p$, and $\\bar{u} = \\frac{27 - 25}{10} = 0.2$ gives $\\sum fu = 10$. So $q - p = 10$: $q = 15$, $p = 5$.",
        },
        { text: "$p = 15$, $q = 5$", feedback: "Swapped. That puts more weight below 25 and gives a mean of 23. A mean above 25 needs more weight on the right, so $q > p$." },
        { text: "$p = 10$, $q = 10$", feedback: "That makes the table symmetric about 25, so the mean would be 25, not 27." },
        { text: "$p = 8$, $q = 12$", feedback: "Check: $\\sum fu = 4$, giving $\\bar{x} = 25 + 10 \\times \\frac{4}{50} = 25.8$." },
      ],
      hint: "Get one equation from $\\sum f = 50$ and one from the mean. Using $A = 25$ keeps the second equation short.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "weighted-and-combined-means",
  title: "1.3 · Weighted and Combined Means",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Section A has 30 students with a mean mark of 60. Section B has 20 students with a mean of 75. What is the mean of all 50 students? The tempting answer is $\\frac{60 + 75}{2} = 67.5$. It is wrong, and the balance picture shows why at once.",
    },
    {
      type: "text",
      content:
        "Think of each section as a single heavy weight placed at its own mean: 30 units at 60 and 20 units at 75. The combined balance point sits nearer the heavier weight, section A. Averaging the two means gives the sections equal weight, as if both had 25 students.",
    },
    {
      type: "text",
      content: "Go back to totals. Section A's marks total $30 \\times 60 = 1800$; section B's total $20 \\times 75 = 1500$. So",
    },
    {
      type: "math",
      latex: "\\bar{x}_{\\text{combined}} = \\frac{n_1\\bar{x}_1 + n_2\\bar{x}_2}{n_1 + n_2} = \\frac{1800 + 1500}{50} = \\frac{3300}{50} = 66",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Combined mean",
      content:
        "For groups of sizes $n_1, n_2, \\ldots$ with means $\\bar{x}_1, \\bar{x}_2, \\ldots$: $\\bar{x} = \\frac{\\sum n_k\\bar{x}_k}{\\sum n_k}$. It lies between the smallest and largest group mean, closer to the bigger groups. It equals the plain average of the means only when the groups are the same size (or the means are equal).",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [52, 55, 57, 58, 60, 60, 61, 62, 63, 72],
        compareData: [70, 74, 75, 76, 80],
        labels: { data: "Section A (10)", compare: "Section B (5)" },
        range: { min: 40, max: 100 },
        xLabel: "Mark",
        view: "dotplot",
        stats: ["mean"],
        caption:
          "Section A (mean 60) has twice as many students as section B (mean 75). The combined mean is (600 + 375)/15 = 65, two-thirds of the way toward A, not 67.5. Add students to B and watch their share of the pull grow.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example (JEE style: running the formula backwards).** In a company the mean monthly salary of all employees is ₹50,000. The mean salary of the men is ₹52,000 and that of the women is ₹42,000. What percentage of the employees are men?\n\n**Step 1: name the unknown as a proportion.** Let a fraction $p$ of the employees be men, so $1 - p$ are women. *Why a fraction and not a head-count:* the question gives no total, and the combined mean depends only on the *ratio* of the group sizes.\n\n**Step 2: write the combined mean (₹ thousand).**",
    },
    {
      type: "math",
      latex: "52p + 42(1 - p) = 50 \\;\\Rightarrow\\; 42 + 10p = 50 \\;\\Rightarrow\\; p = 0.8",
    },
    {
      type: "text",
      content:
        "**Step 3: interpret.** 80% of the employees are men and 20% are women.\n\n**Balance-point check:** the overall mean 50 sits 2 below the men's mean and 8 above the women's. The balance point is closer to the heavier weight, and the distances $2 : 8 = 1 : 4$ are the inverse of the weights $80 : 20 = 4 : 1$. ✓ This 'lever rule' is the quickest way to answer such questions: the distances to the group means are inversely proportional to the group sizes.",
    },
    {
      type: "text",
      content:
        "**Weighted means** are the same idea with the weights chosen on purpose. A course grade might count assignments 20%, the mid-term 30% and the final 50%. With scores 90, 70 and 80:",
    },
    {
      type: "math",
      latex: "\\bar{x}_w = \\frac{\\sum w_i x_i}{\\sum w_i} = \\frac{0.2(90) + 0.3(70) + 0.5(80)}{0.2 + 0.3 + 0.5} = \\frac{18 + 21 + 40}{1} = 79",
    },
    {
      type: "text",
      content:
        "The frequency formula $\\frac{\\sum fx}{\\sum f}$ from 1.2 and the combined-mean formula are both weighted means: frequencies and group sizes are the weights. The price index, CGPA from credits, and the average speed over stages of a journey (weight by time) all work this way.",
    },
    {
      type: "text",
      content:
        "**Worked example (application: a semester CGPA).** A first-year engineering student's grade points and course credits:",
    },
    {
      type: "table",
      headers: ["Course", "Credits $w$", "Grade point $x$", "$wx$"],
      rows: [
        ["Mathematics", "4", "9", "36"],
        ["Physics", "4", "8", "32"],
        ["Chemistry", "3", "7", "21"],
        ["English", "2", "10", "20"],
        ["Workshop", "1", "6", "6"],
        ["Total", "14", "", "115"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1: weight each grade by its credits.** *Why:* a 4-credit course takes twice the classroom hours of a 2-credit one, so it should count twice as much.\n\n**Step 2: divide by the total weight, not by the number of courses.**",
    },
    {
      type: "math",
      latex: "\\text{CGPA} = \\frac{\\sum wx}{\\sum w} = \\frac{115}{14} \\approx 8.21",
    },
    {
      type: "text",
      content:
        "**Compare:** the plain average of the five grades is $\\frac{40}{5} = 8$. The weighted mean is higher because the heavy courses (Maths, Physics) carry good grades, while the weakest grade (6) sits in the 1-credit Workshop and pulls only lightly.",
    },
    {
      type: "text",
      content:
        "**Correcting a mean (a JEE favourite).** The mean of 20 observations was computed as 40. Later it was found that the value 53 had been copied as 35. Find the correct mean.\n\n**Step 1: total used.** $20 \\times 40 = 800$.\n\n**Step 2: remove the wrong value, insert the right one.** $800 - 35 + 53 = 818$.\n\n**Step 3: divide by the (unchanged) count.** $\\frac{818}{20} = 40.9$.\n\nShortcut in balance language: one value moved up by $53 - 35 = 18$, so the mean moves up by $\\frac{18}{20} = 0.9$.",
    },
    {
      type: "text",
      content:
        "**Changing every value.** If each $x$ becomes $y = a + bx$, the shift-and-scale argument from 1.2 applies to the whole data set:",
    },
    {
      type: "math",
      latex: "\\bar{y} = \\frac{\\sum (a + bx_i)}{n} = \\frac{na + b\\sum x_i}{n} = a + b\\bar{x}",
    },
    {
      type: "text",
      content:
        "A week of temperatures has mean $25\\,^{\\circ}\\text{C}$. In Fahrenheit, $F = 32 + 1.8C$, so the mean is $32 + 1.8 \\times 25 = 77\\,^{\\circ}\\text{F}$, without converting a single reading.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [4, 6, 7, 9, 14],
        range: { min: -20, max: 40 },
        xLabel: "Value",
        view: "dotplot",
        stats: ["mean"],
        showBalance: true,
        transform: { shift: true, scale: true },
        caption:
          "The sliders apply x → a + bx to every dot. Start from mean 8: set a = 5 and the mean reads 13; set b = 2 (with a = 0) and it reads 16. The balance point is carried along with the data.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "The average of the averages",
      content:
        "Averaging group means without weights is right only for equal group sizes. A test: if one group is tiny, should its mean count as much as a huge group's? Clearly not, and the weighted formula is what stops it.",
    },
    {
      type: "quiz",
      id: "st1-3-q1",
      variant: "concept",
      question:
        "Class A has 10 students with mean 80; class B has 40 students with mean 60. What is the mean of all 50 students?",
      options: [
        { text: "$64$", correct: true, feedback: "$\\frac{10(80) + 40(60)}{50} = \\frac{800 + 2400}{50} = 64$, close to B because B is four times larger." },
        { text: "$70$", feedback: "That is the average of the two means, which treats the classes as equal-sized." },
        { text: "$76$", feedback: "That weights the classes the wrong way round. The bigger class, B, pulls harder." },
        { text: "It cannot be found without the individual marks.", feedback: "Means and sizes give the totals, and totals are all you need." },
      ],
    },
    {
      type: "quiz",
      id: "st1-3-q2",
      variant: "practice",
      question:
        "The mean of 10 observations was 15. It was later found that the value 12 had been recorded as 21. What is the correct mean?",
      options: [
        { text: "$14.1$", correct: true, feedback: "$150 - 21 + 12 = 141$, and $141 / 10 = 14.1$." },
        { text: "$15.9$", feedback: "The recorded value was too big, so the correction lowers the mean." },
        { text: "$14.2$", feedback: "Check the total: $10 \\times 15 = 150$, then subtract 9." },
        { text: "$15$", feedback: "Changing one value changes the total, and so the mean." },
      ],
    },
    {
      type: "quiz",
      id: "st1-3-q3",
      variant: "practice",
      question: "A data set has mean 10. Every value is multiplied by 3 and then 4 is subtracted. What is the new mean?",
      options: [
        { text: "$26$", correct: true, feedback: "$\\bar{y} = 3\\bar{x} - 4 = 30 - 4 = 26$." },
        { text: "$18$", feedback: "That subtracts 4 first and then multiplies. The order given is multiply, then subtract." },
        { text: "$30$", feedback: "The subtraction of 4 also shifts the mean." },
        { text: "$10$", feedback: "Changing every value changes the balance point." },
      ],
    },
    {
      type: "quiz",
      id: "st1-3-q4",
      variant: "practice",
      question:
        "The mean mark of 40 students is 55. The 25 boys have a mean of 52. What is the mean mark of the girls?",
      options: [
        { text: "$60$", correct: true, feedback: "Total $2200$, boys' total $1300$, so girls' total $900$ over 15 girls: $60$." },
        { text: "$58$", feedback: "That is $2 \\times 55 - 52$, which would be right only for equal group sizes." },
        { text: "$57.5$", feedback: "Work with totals: $40 \\times 55$ and $25 \\times 52$." },
        { text: "$36$", feedback: "That divides the girls' total by 25. There are $40 - 25 = 15$ girls." },
      ],
      hint: "Turn both means into totals, subtract, then divide by the number of girls.",
    },
    {
      type: "quiz",
      id: "st1-3-q5",
      variant: "concept",
      question: "When is the combined mean of two groups equal to the simple average of their two means?",
      options: [
        {
          text: "When the two groups have the same size (or the same mean).",
          correct: true,
          feedback: "With $n_1 = n_2$ the weights are equal and $\\frac{n\\bar{x}_1 + n\\bar{x}_2}{2n} = \\frac{\\bar{x}_1 + \\bar{x}_2}{2}$.",
        },
        { text: "Always.", feedback: "Only for equal weights. 10 students at 80 and 40 at 60 give 64, not 70." },
        { text: "When both groups are large.", feedback: "Size alone does not matter; the ratio of the sizes does." },
        { text: "Never.", feedback: "Equal group sizes make it exactly right." },
      ],
    },
    {
      type: "quiz",
      id: "st1-3-q6",
      variant: "concept",
      question:
        "A cyclist rides 60 km to a town at 30 km/h and returns the same 60 km at 60 km/h. What is her average speed for the round trip?",
      options: [
        {
          text: "$40$ km/h",
          correct: true,
          feedback:
            "Average speed is total distance over total time: $\\frac{120}{2 + 1} = 40$ km/h. It is a mean of the two speeds weighted by time, and the slow leg lasts twice as long.",
        },
        {
          text: "$45$ km/h",
          feedback:
            "That is $\\frac{30 + 60}{2}$, which weights the two speeds equally. But she spends 2 h at 30 km/h and only 1 h at 60 km/h, so the slower speed carries more weight.",
        },
        {
          text: "$50$ km/h",
          feedback: "That weights the faster leg more heavily. The time weights are 2 h (slow) and 1 h (fast), the other way round.",
        },
        {
          text: "$90$ km/h",
          feedback: "That adds the speeds. Divide the total distance, 120 km, by the total time, 3 h.",
        },
      ],
      hint: "Find the time for each leg first. Average speed = total distance ÷ total time.",
    },
    {
      type: "quiz",
      id: "st1-3-q7",
      variant: "practice",
      question:
        "The mean age of a group of teachers is 40 years. The mean age of the male teachers is 44 and of the female teachers is 34. What percentage of the teachers are male?",
      options: [
        {
          text: "$60\\%$",
          correct: true,
          feedback: "$44p + 34(1 - p) = 40$ gives $10p = 6$, so $p = 0.6$. Lever check: distances $4 : 6$ are the inverse of sizes $60 : 40$.",
        },
        { text: "$40\\%$", feedback: "That is the share of female teachers. The overall mean 40 is closer to the men's mean 44, so men are the larger group." },
        { text: "$50\\%$", feedback: "Equal groups would give a mean of $\\frac{44 + 34}{2} = 39$, not 40." },
        { text: "$66.7\\%$", feedback: "Check: $\\frac{2}{3}(44) + \\frac{1}{3}(34) \\approx 40.67$, not 40." },
      ],
      hint: "Let $p$ be the fraction who are male and write the combined mean as $44p + 34(1 - p)$.",
    },
    {
      type: "quiz",
      id: "st1-3-q8",
      variant: "practice",
      question:
        "The mean of 50 observations was found to be 36. Later it was discovered that two values, 34 and 53, had been recorded as 43 and 35. What is the correct mean?",
      options: [
        {
          text: "$36.18$",
          correct: true,
          feedback: "Total used $= 1800$. Remove the wrong values and add the right ones: $1800 - (43 + 35) + (34 + 53) = 1800 - 78 + 87 = 1809$, and $\\frac{1809}{50} = 36.18$.",
        },
        { text: "$35.82$", feedback: "That applies the correction the wrong way round: the right values add to 87, more than the recorded 78, so the mean goes up." },
        { text: "$36.9$", feedback: "The net change of $+9$ in the total is shared over 50 values: $\\frac{9}{50} = 0.18$, not $0.9$." },
        { text: "$36$", feedback: "The two errors do not cancel: $87 - 78 = 9$." },
      ],
    },
    {
      type: "quiz",
      id: "st1-3-q9",
      variant: "practice",
      question:
        "A student scores grade points 8, 9, 6 and 10 in courses worth 4, 3, 3 and 2 credits respectively. What is the CGPA?",
      options: [
        {
          text: "$\\approx 8.08$",
          correct: true,
          feedback: "$\\sum wx = 32 + 27 + 18 + 20 = 97$ and $\\sum w = 12$, so $\\frac{97}{12} \\approx 8.08$.",
        },
        { text: "$8.25$", feedback: "That is the plain average of the four grades, which ignores the credits." },
        { text: "$24.25$", feedback: "That divides $\\sum wx$ by the number of courses (4). Divide by the total credits, 12." },
        { text: "$\\approx 7.92$", feedback: "Recheck the products: $4 \\times 8 + 3 \\times 9 + 3 \\times 6 + 2 \\times 10 = 97$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "the-median",
  title: "1.4 · The Median: The Middle Value",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The mean listens to how far away every value is. Sometimes that is exactly what you do not want. The **median** asks a simpler question: **which value has half the data on each side?** Only the *order* of the values matters, not their distances.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [3, 5, 6, 7, 8, 9, 10],
        range: { min: 0, max: 50 },
        xLabel: "Value",
        view: "dotplot",
        stats: ["mean", "median"],
        caption:
          "Drag the 10 all the way to 45. The mean chases it (from 6.86 to 11.86); the median stays at 7, because 7 is still the fourth of seven values. Now drag a dot across the middle and watch the median jump.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Median of raw data",
      content:
        "Arrange the $n$ values in order. If $n$ is **odd**, the median is the value in position $\\frac{n+1}{2}$. If $n$ is **even**, there are two middle values, in positions $\\frac{n}{2}$ and $\\frac{n}{2} + 1$, and the median is their mean.",
    },
    {
      type: "text",
      content:
        "**Example (odd $n$).** 12, 5, 9, 21, 7, 15, 10. Sorted: 5, 7, 9, **10**, 12, 15, 21. With $n = 7$ the median is the 4th value, 10.\n\n**Example (even $n$).** Add 30 to the list: 5, 7, 9, **10, 12**, 15, 21, 30. With $n = 8$ the middle pair are the 4th and 5th values, so the median is $\\frac{10 + 12}{2} = 11$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Sort first",
      content:
        "The median is the middle of the *ordered* list. The middle of the list as written (21 in the first example) means nothing.",
    },
    {
      type: "text",
      content:
        "**Discrete frequency tables.** You do not need to write out the list; cumulative frequency tells you which value sits in each position. Marks of 40 students on a 50-point quiz:",
    },
    {
      type: "table",
      headers: ["Marks $x$", "$f$", "Cumulative frequency $cf$", "Positions covered"],
      rows: [
        ["10", "2", "2", "1–2"],
        ["20", "8", "10", "3–10"],
        ["30", "15", "25", "11–25"],
        ["40", "10", "35", "26–35"],
        ["50", "5", "40", "36–40"],
      ],
    },
    {
      type: "text",
      content:
        "$n = 40$ is even, so we need the 20th and 21st values. Both lie in positions 11–25, where every value is 30. The median is **30**.",
    },
    {
      type: "text",
      content:
        "**Grouped data.** Now we only know how many values fall in each class. Take the table below ($n = 50$). Half of 50 is 25, so the median is the value with 25 observations below it.",
    },
    {
      type: "table",
      headers: ["Class", "$f$", "$cf$ (less than upper boundary)"],
      rows: [
        ["0–10", "5", "5"],
        ["10–20", "8", "13"],
        ["20–30", "20", "33"],
        ["30–40", "12", "45"],
        ["40–50", "5", "50"],
      ],
    },
    {
      type: "text",
      content:
        "13 values lie below 20 and 33 lie below 30, so the 25th value is somewhere in the class 20–30: this is the **median class**. To say *where* in it, assume (as with the midpoint assumption) that the 20 values in this class are **spread evenly** across it. On the less-than ogive that means joining $(20, 13)$ to $(30, 33)$ with a straight line and reading off where the height reaches 25.",
    },
    {
      type: "text",
      content:
        "We need $25 - 13 = 12$ more values after reaching 20. The class holds 20 values over a width of 10, so 12 of them take up $\\frac{12}{20}$ of the width:",
    },
    {
      type: "math",
      latex: "\\text{Median} = 20 + \\frac{25 - 13}{20} \\times 10 = 20 + 6 = 26",
    },
    {
      type: "text",
      content: "Replace the numbers with their meanings and you have the general formula. Nothing in it is memorised; each symbol is one step of the interpolation.",
    },
    {
      type: "math",
      latex: "\\text{Median} = l + \\frac{\\frac{n}{2} - cf}{f} \\times h",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Grouped median, symbol by symbol",
      content:
        "$l$ = lower boundary of the median class · $n$ = total frequency · $cf$ = cumulative frequency of the class **before** the median class · $f$ = frequency of the median class · $h$ = its width. The fraction $\\frac{n/2 - cf}{f}$ is how far through the class (as a fraction of its values) the middle value lies.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Inclusive classes: convert to boundaries first",
      content:
        "Tables often use **inclusive** (discontinuous) classes such as 10–19, 20–29, 30–39. There is a gap between 19 and 20, and a value like 19.7 has no class. Before using the formula, close the gaps: subtract half the gap (0.5) from every lower limit and add it to every upper limit, giving 9.5–19.5, 19.5–29.5, 29.5–39.5. Then $l$ is the **lower boundary** (19.5, not 20) and $h$ is the boundary width (10, not 9). Using the printed limit 20 as $l$ shifts every answer by 0.5.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [
          2, 4, 6, 7, 9, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28,
          29, 29, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 38, 39, 41, 43, 45, 47, 49, 30,
        ],
        range: { min: 0, max: 50 },
        xLabel: "Value",
        view: "ogive",
        views: ["ogive", "histogram"],
        binWidth: 10,
        binStart: 0,
        ogiveType: "both",
        stats: ["median"],
        caption:
          "An ogive for 50 values in classes of width 10 with exactly the frequencies of the table above. Press the 'cf = n/2' button: the horizontal line at 25 meets the ogive inside the steepest segment, 20–30. The straight segment between class boundaries is exactly the 'spread evenly' assumption. The less-than and more-than ogives are both drawn: they cross at height n/2 = 25, directly above the median. (Here the raw-data median readout also comes out at 26; in general the interpolated value is only an estimate of it.)",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Not the midpoint of the median class",
      content:
        "A common shortcut says 'the median class is 20–30, so the median is 25'. That ignores where inside the class the middle value falls. Here the 25th value is the 12th of 20 values in the class, which is 60% of the way through: 26, not 25.",
    },
    {
      type: "text",
      content:
        "**Worked example (application: a hospital queue).** A clinic records how long 80 patients waited before seeing a doctor. Find the median waiting time and say what it means.",
    },
    {
      type: "table",
      headers: ["Waiting time (min)", "$f$", "$cf$"],
      rows: [
        ["0–10", "6", "6"],
        ["10–20", "14", "20"],
        ["20–30", "25", "45"],
        ["30–40", "20", "65"],
        ["40–50", "10", "75"],
        ["50–60", "5", "80"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1: locate the middle.** $n = 80$, so $\\frac{n}{2} = 40$. *Why $\\frac{n}{2}$ and not $\\frac{n+1}{2}$:* for grouped data we read the ogive at half the total height, where half the frequency lies below.\n\n**Step 2: find the median class.** The $cf$ column passes 40 between 20 (at 20 min) and 45 (at 30 min), so the median class is 20–30. Read off $l = 20$, $cf = 20$ (the class **before**), $f = 25$, $h = 10$.\n\n**Step 3: interpolate.** We need $40 - 20 = 20$ of the class's 25 patients, i.e. $\\frac{20}{25} = 80\\%$ of the way through the class.",
    },
    {
      type: "math",
      latex: "\\text{Median} = 20 + \\frac{40 - 20}{25} \\times 10 = 20 + 8 = 28 \\text{ min}",
    },
    {
      type: "text",
      content:
        "**Step 4: interpret.** Half the patients waited less than about 28 minutes and half waited longer. The grouped mean of the same table is $\\frac{2290}{80} \\approx 28.6$ min, slightly above the median, a hint that a few long waits (the 50–60 class) stretch the right tail. A clinic setting a target such as 'most patients seen within half an hour' would quote the median, because a handful of very long waits cannot move it.",
    },
    {
      type: "text",
      content:
        "**Worked example (CBSE board style: missing frequencies).** The median of the distribution below is 28.5 and the total frequency is 60. Find $x$ and $y$.",
    },
    {
      type: "table",
      headers: ["Class", "0–10", "10–20", "20–30", "30–40", "40–50", "50–60"],
      rows: [["$f$", "5", "$x$", "20", "15", "$y$", "5"]],
    },
    {
      type: "text",
      content:
        "**Step 1: total frequency.** $5 + x + 20 + 15 + y + 5 = 60$, so $x + y = 15$.\n\n**Step 2: the median tells you the median class.** 28.5 lies in 20–30, so $l = 20$, $f = 20$, $h = 10$, and the cumulative frequency before this class is $cf = 5 + x$. *Why this is the key step:* the unknown $x$ sits inside $cf$, so the median formula becomes an equation in $x$. Note that $y$ comes after the median class and does not appear at all.",
    },
    {
      type: "math",
      latex:
        "28.5 = 20 + \\frac{30 - (5 + x)}{20} \\times 10 \\;\\Rightarrow\\; 8.5 = \\frac{25 - x}{2} \\;\\Rightarrow\\; 25 - x = 17 \\;\\Rightarrow\\; x = 8",
    },
    {
      type: "text",
      content:
        "**Step 3: finish.** $y = 15 - 8 = 7$.\n\n**Check:** $cf$ becomes 5, 13, 33, 48, 55, 60. The 30th value lies in 20–30 (between 13 and 33), and $20 + \\frac{30 - 13}{20} \\times 10 = 20 + 8.5 = 28.5$. ✓",
    },
    {
      type: "text",
      content:
        "**Why the median resists outliers.** Changing the largest value (or the smallest) does not change the order of the middle values, so the median does not move. The mean, which uses the size of every value, does. This is why incomes, house prices and waiting times are usually summarised by the median.",
    },
    {
      type: "quiz",
      id: "st1-4-q1",
      variant: "concept",
      question:
        "For the grouped table above (median class 20–30, $n = 50$, $cf = 13$, $f = 20$), a student writes 'median = 25, the midpoint of the median class'. What is wrong?",
      options: [
        {
          text: "The median is where the 25th value falls inside the class. Interpolating gives 26, not the midpoint.",
          correct: true,
          feedback: "The 25th value is the 12th of 20 in the class: $20 + \\frac{12}{20}\\times 10 = 26$.",
        },
        {
          text: "Nothing: the median of grouped data is always the midpoint of the median class.",
          feedback: "That is only true in the lucky case $\\frac{n}{2} - cf = \\frac{f}{2}$. Usually it is not.",
        },
        {
          text: "The median class should be 30–40, because 33 is the first cumulative frequency above 25.",
          feedback: "The cumulative frequency 33 belongs to the class 20–30: 33 values lie below 30.",
        },
        {
          text: "The median should be the mean of the class marks, 25, for a different reason.",
          feedback: "The average of the class marks ignores the frequencies entirely.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st1-4-q2",
      variant: "practice",
      question: "Find the median of 8, 3, 11, 5, 14, 6.",
      options: [
        { text: "$7$", correct: true, feedback: "Sorted: 3, 5, 6, 8, 11, 14. The middle pair is 6 and 8, so the median is 7." },
        { text: "$11$", feedback: "That is a middle value of the unsorted list. Sort first." },
        { text: "$7.83$", feedback: "That is the mean. The median uses only the middle of the ordered list." },
        { text: "$6$", feedback: "With $n = 6$ there are two middle values; average them." },
      ],
    },
    {
      type: "quiz",
      id: "st1-4-q3",
      variant: "practice",
      question:
        "Classes 10–20, 20–30, 30–40, 40–50, 50–60 have frequencies 4, 6, 12, 10, 8. Find the median.",
      options: [
        {
          text: "$38.33$",
          correct: true,
          feedback:
            "$n = 40$, $\\frac{n}{2} = 20$. Cumulative frequencies 4, 10, 22, … so the median class is 30–40 with $cf = 10$, $f = 12$: $30 + \\frac{10}{12}\\times 10 \\approx 38.33$.",
        },
        { text: "$35$", feedback: "That is the midpoint of the median class. Interpolate instead." },
        { text: "$36.67$", feedback: "That uses $cf = 12$, the frequency of the median class itself. $cf$ is the cumulative frequency *before* the median class: $4 + 6 = 10$." },
        { text: "$40$", feedback: "Only 22 values lie below 40, so the 20th value is inside 30–40, not at its end." },
      ],
      hint: "Build the cumulative frequency column and find the first class where it reaches $\\frac{n}{2}$.",
    },
    {
      type: "quiz",
      id: "st1-4-q4",
      variant: "practice",
      question: "$x = 1, 2, 3, 4, 5$ with frequencies $3, 7, 9, 6, 5$. What is the median?",
      options: [
        { text: "$3$", correct: true, feedback: "$n = 30$; cf = 3, 10, 19, … The 15th and 16th values both lie in positions 11–19, where $x = 3$." },
        { text: "$2.5$", feedback: "That averages two neighbouring $x$ values, but both middle positions (15 and 16) hold the value 3." },
        { text: "$9$", feedback: "9 is a frequency, not a value of $x$." },
        { text: "$4$", feedback: "Values 4 only start at position 20." },
      ],
    },
    {
      type: "quiz",
      id: "st1-4-q5",
      variant: "concept",
      question: "In the data 4, 7, 9, 12, 15, the largest value is changed from 15 to 150. What happens?",
      options: [
        { text: "The median stays 9; the mean rises by 27.", correct: true, feedback: "The order of the middle values is unchanged. The total rises by 135, so the mean rises by $135/5 = 27$." },
        { text: "Both the mean and the median rise.", feedback: "The median depends only on which value is in the middle, and that is still 9." },
        { text: "The median rises; the mean stays the same.", feedback: "It is the other way round." },
        { text: "Neither changes.", feedback: "The mean uses the size of every value, so it moves." },
      ],
    },
    {
      type: "quiz",
      id: "st1-4-q6",
      variant: "practice",
      question: "$x = 1, 2, 3, 4$ with frequencies $5, 5, 6, 4$. What is the median?",
      options: [
        {
          text: "$2.5$",
          correct: true,
          feedback:
            "$n = 20$ is even, so we need the 10th and 11th values. cf = 5, 10, 16, 20: the 10th value is the last 2 (positions 6–10) and the 11th is the first 3 (positions 11–16). The median is $\\frac{2 + 3}{2} = 2.5$.",
        },
        {
          text: "$3$",
          feedback: "That reads only the value where cf first passes 10. The 10th value is still 2 (cf reaches exactly 10 at $x = 2$); only the 11th is 3. Average the two.",
        },
        { text: "$2$", feedback: "That is the 10th value alone. With $n$ even the median is the mean of the 10th and 11th values, and the 11th is 3." },
        { text: "$10.5$", feedback: "That is the *position* $\\frac{n+1}{2}$, not the value found there." },
      ],
      hint: "Write out which positions each value covers, then look at positions 10 and 11.",
    },
    {
      type: "quiz",
      id: "st1-4-q7",
      variant: "concept",
      question:
        "Classes 10–19, 20–29, 30–39, 40–49 have frequencies 5, 8, 12, 5. Find the median.",
      options: [
        {
          text: "$\\approx 31.17$",
          correct: true,
          feedback:
            "Convert to boundaries: 9.5–19.5, 19.5–29.5, 29.5–39.5, 39.5–49.5. $n = 30$, $\\frac{n}{2} = 15$; cf = 5, 13, 25, … so the median class is 29.5–39.5 with $l = 29.5$, $cf = 13$, $f = 12$, $h = 10$: $29.5 + \\frac{2}{12}\\times 10 \\approx 31.17$.",
        },
        {
          text: "$\\approx 31.67$",
          feedback: "That uses the printed limit $l = 30$. The classes have gaps, so $l$ must be the lower boundary, 29.5.",
        },
        {
          text: "$31$",
          feedback: "That uses $h = 9$ (39 − 30). After converting to boundaries the width is 39.5 − 29.5 = 10.",
        },
        { text: "$34.5$", feedback: "That is the midpoint of the median class. Interpolate instead." },
      ],
      hint: "Close the gaps first: subtract 0.5 from each lower limit and add 0.5 to each upper limit.",
    },
    {
      type: "quiz",
      id: "st1-4-q8",
      variant: "practice",
      question:
        "The monthly mobile data use (GB) of 50 students: classes 0–20, 20–40, 40–60, 60–80, 80–100 with frequencies 8, 12, 20, 6, 4. Find the median.",
      options: [
        {
          text: "$45$ GB",
          correct: true,
          feedback:
            "$\\frac{n}{2} = 25$; $cf = 8, 20, 40, \\ldots$ so the median class is 40–60 with $cf = 20$, $f = 20$, $h = 20$: $40 + \\frac{5}{20} \\times 20 = 45$.",
        },
        { text: "$50$ GB", feedback: "That is the midpoint of the median class. The 25th value is only the 5th of 20 in the class." },
        { text: "$42.5$ GB", feedback: "That uses $h = 10$. These classes are 20 wide." },
        { text: "$25$ GB", feedback: "That uses $cf = 40$, the cumulative frequency *up to the end* of the median class. Use the $cf$ of the class before it, 20." },
      ],
      hint: "Find where the cumulative frequency first passes $\\frac{n}{2} = 25$.",
    },
    {
      type: "quiz",
      id: "st1-4-q9",
      variant: "practice",
      question:
        "Classes 0–10, 10–20, 20–30, 30–40, 40–50 have frequencies 4, 6, $x$, 10, $y$. The total frequency is 40 and the median is 34. Find $x$ and $y$.",
      options: [
        {
          text: "$x = 6$, $y = 14$",
          correct: true,
          feedback:
            "$x + y = 20$. The median class is 30–40 with $cf = 10 + x$, $f = 10$: $34 = 30 + \\frac{20 - (10 + x)}{10} \\times 10$ gives $4 = 10 - x$, so $x = 6$ and $y = 14$.",
        },
        { text: "$x = 4$, $y = 16$", feedback: "Check: $cf$ before 30–40 would be 14, giving a median of $30 + \\frac{6}{10} \\times 10 = 36$." },
        { text: "$x = 8$, $y = 12$", feedback: "Check: $cf$ before 30–40 would be 18, giving a median of $32$." },
        { text: "$x = 14$, $y = 6$", feedback: "Then $cf$ reaches 24 by 30, so the 20th value falls in 20–30, not near 34." },
      ],
      hint: "Only $x$ appears in the $cf$ before the median class; $y$ comes after it.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "the-mode",
  title: "1.5 · The Mode: The Peak",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A shoe shop does not care that the mean foot size of its customers is 7.3. It cannot stock size 7.3. It wants to know which size sells **most often**. That is the **mode**: the value that occurs with the highest frequency, the peak of the distribution.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Mode",
      content:
        "The **mode** is the value (or values) with the greatest frequency. A data set can have one mode, two (**bimodal**), several, or none (if every value occurs equally often).",
    },
    {
      type: "table",
      headers: ["Data", "Mode", "Why"],
      rows: [
        ["4, 7, 7, 2, 9, 7, 4", "7", "7 occurs three times, more than any other value"],
        ["2, 3, 3, 5, 5, 8", "3 and 5 (bimodal)", "both occur twice"],
        ["1, 2, 3, 4", "no mode", "every value occurs once"],
        ["Blood groups: O, A, B, O, AB, O, A", "O", "the mode works for categories too"],
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "The only average for categories",
      content:
        "You cannot add blood groups or put favourite colours in order, so there is no mean or median of them. The mode just counts, so it is the **only** average that works for categorical data.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [4, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 10, 12],
        range: { min: 0, max: 20 },
        xLabel: "Shoe size",
        view: "dotplot",
        views: ["dotplot", "histogram"],
        stats: ["mode", "median", "mean"],
        caption:
          "The tallest stack is the mode (7). Drag two dots onto 9 and watch the data become bimodal; drag one more and 9 takes over. Changing the highest values moves the mean but not the mode.",
      },
    },
    {
      type: "text",
      content:
        "**Grouped data.** Here we only know the tallest bar, the **modal class**. The peak of the underlying distribution is somewhere inside it, and the neighbours tell us which way it leans. If the class before the modal class is almost as tall as the modal class and the class after is short, the peak must lean to the left.",
    },
    {
      type: "text",
      content:
        "The standard construction makes this precise. Let the modal class run from $l$ to $l + h$ with frequency $f_1$; the class before it has $f_0$, the class after it $f_2$. On the histogram draw two lines across the modal bar:\n\n- from the top-left corner of the modal bar, $(l, f_1)$, to the top-left corner of the next bar, $(l + h, f_2)$;\n- from the top-right corner of the previous bar, $(l, f_0)$, to the top-right corner of the modal bar, $(l + h, f_1)$.\n\nThey cross above the estimated mode. Call its distance from $l$ the value $m$.",
    },
    {
      type: "text",
      content:
        "The two lines cross, making two triangles that share the crossing point as a vertex. The left triangle stands on the left edge of the modal bar, where the lines are $f_1 - f_0$ apart (the step **up** into the modal bar). The right triangle stands on the right edge, where they are $f_1 - f_2$ apart (the step **down** out of it). Those two vertical sides are parallel and the angles at the crossing are vertically opposite, so the triangles are **similar**. Their widths, $m$ and $h - m$, are therefore in the same ratio as their vertical sides:",
    },
    {
      type: "math",
      latex: "\\frac{m}{h - m} = \\frac{f_1 - f_0}{f_1 - f_2}",
    },
    {
      type: "text",
      content: "Cross-multiply and collect the $m$ terms:",
    },
    {
      type: "math",
      latex:
        "m(f_1 - f_2) = (h - m)(f_1 - f_0) \\;\\Rightarrow\\; m\\bigl[(f_1 - f_0) + (f_1 - f_2)\\bigr] = h(f_1 - f_0) \\;\\Rightarrow\\; m = \\frac{f_1 - f_0}{2f_1 - f_0 - f_2}\\,h",
    },
    { type: "math", latex: "\\text{Mode} = l + \\frac{f_1 - f_0}{2f_1 - f_0 - f_2} \\times h" },
    {
      type: "text",
      content:
        "Check that it behaves sensibly. If $f_0 = f_2$ (equal neighbours), the fraction is $\\frac{f_1 - f_0}{2(f_1 - f_0)} = \\frac{1}{2}$ and the mode is the midpoint of the class. If $f_0$ is nearly as big as $f_1$, the numerator is small and the mode leans left, toward the tall neighbour. That is the lean we predicted.",
    },
    {
      type: "text",
      content: "**Worked example.** Find the mode of this distribution ($n = 50$):",
    },
    {
      type: "table",
      headers: ["Class", "0–10", "10–20", "20–30", "30–40", "40–50"],
      rows: [["$f$", "6", "10", "17", "12", "5"]],
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [0, 1, 3, 5, 6, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20, 21, 21, 22, 22, 23, 24, 24, 25, 25, 26, 27, 27, 28, 28, 29, 30, 30, 31, 32, 33, 34, 35, 35, 36, 37, 38, 39, 40, 42, 44, 46, 48],
        range: { min: 0, max: 50 },
        xLabel: "Value",
        view: "histogram",
        binWidth: 10,
        binStart: 0,
        stats: [],
        editable: false,
        caption:
          "The histogram of this table. Picture the two diagonals on the tallest bar (20–30, height 17): one from its top-left corner (20, 17) down to the top of the right neighbour at (30, 12), the other from the top of the left neighbour at (20, 10) up to the modal bar's top-right corner (30, 17). The step up on the left (7) is bigger than the step down on the right (5), so the crossing sits right of centre, at about 25.83. The chapter video animates this crossing.",
      },
    },
    {
      type: "text",
      content:
        "**Step 1: modal class.** The largest frequency is 17, so the modal class is 20–30: $l = 20$, $h = 10$.\n\n**Step 2: neighbours.** $f_0 = 10$ (before), $f_1 = 17$, $f_2 = 12$ (after).\n\n**Step 3: substitute.** $\\text{Mode} = 20 + \\frac{17 - 10}{34 - 10 - 12} \\times 10 = 20 + \\frac{7}{12}\\times 10 \\approx 25.83$.\n\n**Sense check:** the right neighbour (12) is taller than the left (10), so the mode should lean right of the midpoint 25. It does.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Modal class = largest frequency",
      content:
        "The modal class is the class with the **largest frequency**, not the largest class mark and not the last class. Also, the formula assumes equal class widths; with unequal widths, compare frequency densities (Chapter 0.4) to find the tallest bar. If the modal class is the first (or last) class, take $f_0 = 0$ (or $f_2 = 0$). If two classes tie for the largest frequency, the formula does not apply. With inclusive classes such as 20–29, use the lower boundary (19.5) as $l$, as for the median.",
    },
    {
      type: "text",
      content:
        "**Worked example (application: food delivery times).** A delivery app logs 60 orders from one restaurant. It wants to tell customers the most typical delivery time.",
    },
    {
      type: "table",
      headers: ["Time (min)", "10–15", "15–20", "20–25", "25–30", "30–35", "35–40"],
      rows: [["Orders $f$", "5", "12", "20", "14", "6", "3"]],
    },
    {
      type: "text",
      content:
        "**Step 1: modal class.** The largest frequency is 20, so the modal class is 20–25: $l = 20$ and, note, $h = 5$. *Why check $h$ every time:* these classes are 5 minutes wide, and using 10 out of habit doubles the lean.\n\n**Step 2: neighbours.** $f_0 = 12$, $f_1 = 20$, $f_2 = 14$.\n\n**Step 3: substitute.**",
    },
    {
      type: "math",
      latex: "\\text{Mode} = 20 + \\frac{20 - 12}{40 - 12 - 14} \\times 5 = 20 + \\frac{8}{14} \\times 5 = 20 + \\frac{40}{14} \\approx 22.86 \\text{ min}",
    },
    {
      type: "text",
      content:
        "**Step 4: sense check and interpret.** The step up from the left (8) is bigger than the step down to the right (6), so the peak leans right of the midpoint 22.5, and 22.86 does. The app can honestly say 'most orders arrive in about 23 minutes'. It should not quote this as a promise: the mode says nothing about the 9 orders that took over half an hour.",
    },
    {
      type: "text",
      content:
        "**Worked example (CBSE board style: missing frequency).** The mode of the distribution below is 36. Find the missing frequency $x$.",
    },
    {
      type: "table",
      headers: ["Class", "0–10", "10–20", "20–30", "30–40", "40–50", "50–60", "60–70"],
      rows: [["$f$", "8", "10", "$x$", "16", "12", "6", "7"]],
    },
    {
      type: "text",
      content:
        "**Step 1: which class is modal?** The mode 36 lies in 30–40, so that is the modal class: $l = 30$, $f_1 = 16$, $h = 10$. *Why we can say this before knowing $x$:* the mode formula always returns a value inside the modal class.\n\n**Step 2: identify the neighbours.** The class before is 20–30, so $f_0 = x$; the class after has $f_2 = 12$.\n\n**Step 3: set up and solve.**",
    },
    {
      type: "math",
      latex:
        "36 = 30 + \\frac{16 - x}{32 - x - 12} \\times 10 \\;\\Rightarrow\\; 6(20 - x) = 10(16 - x) \\;\\Rightarrow\\; 120 - 6x = 160 - 10x \\;\\Rightarrow\\; x = 10",
    },
    {
      type: "text",
      content:
        "**Check:** with $x = 10$, 16 is still the largest frequency (so 30–40 really is modal), and $30 + \\frac{6}{32 - 10 - 12} \\times 10 = 30 + \\frac{6}{10} \\times 10 = 36$. ✓",
    },
    {
      type: "quiz",
      id: "st1-5-q1",
      variant: "concept",
      question:
        "Classes 0–20, 20–40, 40–60, 60–80, 80–100 have frequencies 7, 15, 22, 9, 3. What is the modal class?",
      options: [
        { text: "40–60", correct: true, feedback: "It has the largest frequency, 22. The mode is about how common values are, not how big." },
        { text: "80–100", feedback: "That has the largest class mark (90) but the smallest frequency. The modal class is the most crowded class." },
        { text: "20–40", feedback: "15 is large, but 22 is larger." },
        { text: "There is no modal class, because the classes have different marks.", feedback: "Every class has a different mark; the modal class is simply the one with the greatest frequency." },
      ],
    },
    {
      type: "quiz",
      id: "st1-5-q2",
      variant: "practice",
      question:
        "Classes 40–50, 50–60, 60–70, 70–80, 80–90 have frequencies 7, 12, 18, 10, 3. Estimate the mode.",
      options: [
        {
          text: "$\\approx 64.29$",
          correct: true,
          feedback: "$l = 60$, $f_0 = 12$, $f_1 = 18$, $f_2 = 10$: $60 + \\frac{6}{36 - 22}\\times 10 = 60 + \\frac{60}{14} \\approx 64.29$.",
        },
        { text: "$65$", feedback: "That is the class midpoint. The neighbours are unequal, so the mode is pulled off-centre." },
        { text: "$67.5$", feedback: "Check the denominator: $2f_1 - f_0 - f_2 = 36 - 12 - 10 = 14$." },
        { text: "$75$", feedback: "That is in the class after the modal class." },
      ],
      hint: "Identify $f_0$, $f_1$, $f_2$ first; the denominator is $2f_1 - f_0 - f_2$.",
    },
    {
      type: "quiz",
      id: "st1-5-q3",
      variant: "practice",
      question: "What is the mode of 3, 5, 5, 6, 8, 8, 9?",
      options: [
        { text: "5 and 8 (the data are bimodal).", correct: true, feedback: "Both occur twice, more than any other value." },
        { text: "6.5", feedback: "There is no averaging in the mode. Two values tie for most frequent." },
        { text: "6", feedback: "6 is the median. It occurs only once." },
        { text: "No mode", feedback: "There is no mode only when every value occurs equally often." },
      ],
    },
    {
      type: "quiz",
      id: "st1-5-q4",
      variant: "concept",
      question: "A class records each student's favourite sport. Which average can describe these data?",
      options: [
        { text: "Only the mode.", correct: true, feedback: "Sports cannot be added or ordered, but they can be counted." },
        { text: "The mean, after coding each sport as a number.", feedback: "The codes are labels. A 'mean sport' of 2.6 means nothing." },
        { text: "The median, after listing the sports alphabetically.", feedback: "Alphabetical order is not a real order in the data, so its middle is meaningless." },
        { text: "All three.", feedback: "Mean and median need values that can be added or ordered." },
      ],
    },
    {
      type: "quiz",
      id: "st1-5-q5",
      variant: "practice",
      question:
        "In a grouped distribution the modal class is 30–40, and the classes on either side both have frequency 8. Where is the estimated mode?",
      options: [
        { text: "At 35, the midpoint of the modal class.", correct: true, feedback: "With $f_0 = f_2$, the fraction is $\\frac{1}{2}$. Equal pulls from both sides leave the peak in the middle." },
        { text: "At 30, the lower boundary.", feedback: "That would need $f_0 = f_1$: a left neighbour as tall as the modal bar." },
        { text: "It depends on $f_1$, which is not given.", feedback: "Put $f_0 = f_2$ into the formula: $\\frac{f_1 - f_0}{2(f_1 - f_0)} = \\frac{1}{2}$, whatever $f_1$ is." },
        { text: "At 40, the upper boundary.", feedback: "That would need $f_2 = f_1$." },
      ],
    },
    {
      type: "quiz",
      id: "st1-5-q6",
      variant: "practice",
      question: "Classes 0–10, 10–20, 20–30, 30–40 have frequencies 15, 9, 4, 2. Estimate the mode.",
      options: [
        {
          text: "$\\approx 7.14$",
          correct: true,
          feedback:
            "The modal class is the first class, so there is no class before it: take $f_0 = 0$. With $l = 0$, $f_1 = 15$, $f_2 = 9$, $h = 10$: $0 + \\frac{15 - 0}{30 - 0 - 9}\\times 10 = \\frac{150}{21} \\approx 7.14$.",
        },
        { text: "$5$", feedback: "That is the midpoint of the modal class. The neighbours are unequal (0 on the left, 9 on the right), so the mode leans right." },
        { text: "$\\approx 6.25$", feedback: "That uses $f_1 + f_2 = 24$ as the denominator. The formula has $2f_1 - f_0 - f_2 = 30 - 0 - 9 = 21$." },
        { text: "It cannot be estimated, because there is no class before the modal class.", feedback: "Take $f_0 = 0$: an empty class sits before the first one." },
      ],
      hint: "What is the frequency of the (empty) class before 0–10?",
    },
    {
      type: "quiz",
      id: "st1-5-q7",
      variant: "practice",
      question:
        "The distances (km) that 40 employees commute: classes 0–5, 5–10, 10–15, 15–20, 20–25 with frequencies 3, 8, 15, 11, 3. Estimate the mode.",
      options: [
        {
          text: "$\\approx 13.18$ km",
          correct: true,
          feedback:
            "Modal class 10–15: $l = 10$, $f_0 = 8$, $f_1 = 15$, $f_2 = 11$, $h = 5$. Mode $= 10 + \\frac{7}{30 - 19} \\times 5 = 10 + \\frac{35}{11} \\approx 13.18$.",
        },
        { text: "$12.5$ km", feedback: "That is the midpoint of the modal class. The neighbours are unequal (8 and 11), so the mode leans toward the taller one, to the right." },
        { text: "$\\approx 16.36$ km", feedback: "That uses $h = 10$. These classes are 5 km wide." },
        { text: "$15$ km", feedback: "15 is the largest frequency, not the mode. The mode is a distance, found inside the modal class." },
      ],
      hint: "Check the class width before substituting.",
    },
    {
      type: "quiz",
      id: "st1-5-q8",
      variant: "practice",
      question:
        "Classes 0–10, 10–20, 20–30, 30–40 have frequencies 4, $x$, 16, 10. The mode is 24. Find $x$.",
      options: [
        {
          text: "$x = 12$",
          correct: true,
          feedback:
            "Modal class 20–30 with $f_0 = x$, $f_1 = 16$, $f_2 = 10$: $24 = 20 + \\frac{16 - x}{22 - x} \\times 10$ gives $4(22 - x) = 10(16 - x)$, so $88 - 4x = 160 - 10x$ and $x = 12$.",
        },
        { text: "$x = 10$", feedback: "Check: equal neighbours ($f_0 = f_2 = 10$) put the mode at the midpoint, 25, not 24." },
        { text: "$x = 8$", feedback: "Check: $20 + \\frac{8}{14} \\times 10 \\approx 25.71$. A smaller left neighbour pushes the mode right, but we need it left of 25." },
        { text: "$x = 14$", feedback: "Check: $20 + \\frac{2}{8} \\times 10 = 22.5$. Too far left." },
      ],
      hint: "The mode 24 is left of the midpoint 25, so the left neighbour must be taller than the right one (10).",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "choosing-the-right-average",
  title: "1.6 · Choosing the Right Average",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A small company advertises: 'Average salary ₹84,500 a month!' Here are the ten monthly salaries (in ₹ thousand): 30, 32, 35, 35, 38, 40, 42, 45, 48 and the CEO's 500.",
    },
    {
      type: "table",
      headers: ["Average", "Calculation", "Value (₹ thousand)"],
      rows: [
        ["Mean", "$\\frac{345 + 500}{10} = \\frac{845}{10}$", "84.5"],
        ["Median", "mean of 5th and 6th values: $\\frac{38 + 40}{2}$", "39"],
        ["Mode", "35 occurs twice", "35"],
      ],
    },
    {
      type: "text",
      content:
        "Nine of the ten employees earn less than the advertised 'average', and seven of them earn less than half of it. The mean is not wrong; it is answering a different question: 'if the wage bill were shared equally, what would each person get?' The job-seeker's question is 'what does a typical employee earn?', and that is the median's question.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Three averages, three questions",
      content:
        "**Mean:** the fair share, the balance point; uses every value and its size.\n**Median:** the middle; half below, half above; uses only order.\n**Mode:** the most common value, the peak; uses only counts.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: [20, 22, 25, 25, 25, 28, 30, 32, 35, 40, 48, 60, 85],
        range: { min: 0, max: 100 },
        xLabel: "Value",
        view: "dotplot",
        views: ["dotplot", "histogram"],
        stats: ["mean", "median", "mode"],
        caption:
          "A right-skewed data set: the long tail is on the right, and the markers line up mode (25) < median (30) < mean (≈36.5). Drag the tail dots toward the left end to skew it the other way and watch the order reverse. Make it symmetric and the three markers come together.",
      },
    },
    {
      type: "text",
      content:
        "The pattern you just saw is general. A long **right** tail (incomes, house prices, waiting times) drags the mean toward the tail, while the median barely moves and the mode stays at the peak: **mode < median < mean**. A long **left** tail (marks on an easy test, age at retirement) reverses it: **mean < median < mode**. In a symmetric, single-peaked distribution all three coincide.",
    },
    {
      type: "text",
      content:
        "**Worked example (a left tail).** An easy 50-mark test gives these 11 scores: 40, 44, 45, 46, 46, 47, 48, 49, 49, 49, 50.\n\n**Step 1: mean.** $\\sum x = 513$, so $\\bar{x} = \\frac{513}{11} \\approx 46.64$.\n\n**Step 2: median.** The list is already sorted and $n = 11$ is odd, so the median is the 6th value, **47**.\n\n**Step 3: mode.** 49 occurs three times, more than any other score, so the mode is **49**.\n\n**Step 4: read the order.** $46.64 < 47 < 49$: mean < median < mode. *Why:* scores are capped at 50, so most students bunch near the top and the only room to spread is downward. The single 40 drags the mean left more than it moves the median, exactly the left-tail pattern.",
    },
    {
      type: "text",
      content:
        "For **moderately** skewed, single-peaked distributions, Karl Pearson observed that the median sits about a third of the way from the mean to the mode, which gives:",
    },
    { type: "math", latex: "\\text{Mode} \\approx 3\\,\\text{Median} - 2\\,\\text{Mean}" },
    {
      type: "callout",
      variant: "warning",
      title: "Empirical, not a theorem",
      content:
        "This relation is a rule of thumb observed in real data, not a law that can be derived. It fails badly for strongly skewed or bimodal data. Use it when a problem asks for it, or for a quick estimate, never as a proof.",
    },
    {
      type: "text",
      content:
        "**Worked example.** A moderately skewed distribution has mean 45 and median 42. Estimate the mode.\n\n$\\text{Mode} \\approx 3(42) - 2(45) = 126 - 90 = 36$. Check the order: $36 < 42 < 45$, mode < median < mean, which fits a right skew.",
    },
    {
      type: "text",
      content:
        "**Worked example (exam style: all three from one table).** 50 students record how many minutes of homework they did last night. Find the mean, median and mode, compare the mode with Pearson's estimate, and decide which average to report.",
    },
    {
      type: "table",
      headers: ["Minutes", "$f$", "$x$", "$fx$", "$cf$"],
      rows: [
        ["0–10", "10", "5", "50", "10"],
        ["10–20", "18", "15", "270", "28"],
        ["20–30", "12", "25", "300", "40"],
        ["30–40", "6", "35", "210", "46"],
        ["40–50", "4", "45", "180", "50"],
        ["Total", "50", "", "1010", ""],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1: mean (balance point).** $\\bar{x} = \\frac{1010}{50} = 20.2$ min.\n\n**Step 2: median (middle).** $\\frac{n}{2} = 25$; the $cf$ passes 25 in 10–20, with $cf = 10$ before it and $f = 18$:",
    },
    {
      type: "math",
      latex: "\\text{Median} = 10 + \\frac{25 - 10}{18} \\times 10 = 10 + \\frac{150}{18} \\approx 18.33 \\text{ min}",
    },
    {
      type: "text",
      content: "**Step 3: mode (peak).** Modal class 10–20, with $f_0 = 10$, $f_1 = 18$, $f_2 = 12$:",
    },
    {
      type: "math",
      latex: "\\text{Mode} = 10 + \\frac{18 - 10}{36 - 10 - 12} \\times 10 = 10 + \\frac{80}{14} \\approx 15.71 \\text{ min}",
    },
    {
      type: "text",
      content:
        "**Step 4: compare with Pearson.** $3\\,\\text{Median} - 2\\,\\text{Mean} = 3 \\times \\frac{55}{3} - 2 \\times 20.2 = 55 - 40.4 = 14.6$. It is about a minute below the formula mode of 15.71: close enough for a quick estimate, not close enough to replace the calculation. *Why they differ at all:* Pearson's relation is only a rule of thumb, and it fits best when the skew is mild.\n\n**Step 5: read the shape and choose.** $15.71 < 18.33 < 20.2$: mode < median < mean, a right skew (a few students did 40+ minutes). To describe the typical student, report the **median**: half the class did less than about 18 minutes. If the school needs the class's *total* homework time, use the mean: $50 \\times 20.2 = 1010$ minutes.",
    },
    {
      type: "table",
      headers: ["Situation", "Best average", "Reason"],
      rows: [
        ["Symmetric data, no outliers (heights, measurement errors)", "Mean", "uses every value; stable from sample to sample; works with later algebra"],
        ["Skewed data or outliers (incomes, house prices)", "Median", "resists extreme values; describes the typical case"],
        ["Categorical data (blood group, favourite brand)", "Mode", "the only one defined"],
        ["'Which size or option is most popular?' (stock, voting)", "Mode", "answers 'most common' directly"],
        ["Need a total later (budgets, wage bill)", "Mean", "mean × n gives the total; median does not"],
        ["Open-ended classes like '60 and above'", "Median", "needs no class mark for the open class"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Reporting honestly",
      content:
        "When mean and median differ a lot, that difference is itself information: it signals skew or outliers. Report both, and say which question each one answers.",
    },
    {
      type: "quiz",
      id: "st1-6-q1",
      variant: "concept",
      question:
        "A news report gives the 'average house price' in a city where a few mansions sell for crores. Which average best describes a typical house, and why?",
      options: [
        {
          text: "The median, because the few very expensive houses pull the mean far above what most houses cost.",
          correct: true,
          feedback: "Right. The mean is not always best; with a long right tail, the median describes the typical case.",
        },
        {
          text: "The mean, because it uses every price and is therefore always the most accurate.",
          feedback: "Using every value is exactly why the mean is dragged by the mansions. 'Uses all the data' is not the same as 'typical'.",
        },
        {
          text: "The mode, because house prices are categorical.",
          feedback: "Prices are numerical. The mode is also unstable here, since few houses sell for exactly the same price.",
        },
        {
          text: "Any of them: all three averages are always equal.",
          feedback: "They coincide only for symmetric, single-peaked data.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st1-6-q2",
      variant: "practice",
      question: "A moderately skewed distribution has mean 30 and mode 24. Estimate the median.",
      options: [
        { text: "$28$", correct: true, feedback: "$3\\,\\text{Median} \\approx \\text{Mode} + 2\\,\\text{Mean} = 24 + 60 = 84$, so the median is about 28." },
        { text: "$27$", feedback: "That is the midpoint of mode and mean. The median sits about a third of the way from the mean toward the mode." },
        { text: "$12$", feedback: "That is $3(24) - 2(30)$: the mode was put where the median goes. Rearrange $\\text{Mode} = 3\\,\\text{Median} - 2\\,\\text{Mean}$ for the median." },
        { text: "$42$", feedback: "That is $3(30) - 2(24)$, with the mean and mode swapped." },
      ],
    },
    {
      type: "quiz",
      id: "st1-6-q3",
      variant: "concept",
      question: "In a strongly right-skewed distribution (long tail to the right), what is the usual order of the averages?",
      options: [
        { text: "Mode < Median < Mean", correct: true, feedback: "The tail drags the mean furthest, the median a little, and the mode stays at the peak." },
        { text: "Mean < Median < Mode", feedback: "That is the pattern for a left (negative) skew." },
        { text: "Median < Mode < Mean", feedback: "The median sits between the mode and the mean." },
        { text: "All three are equal.", feedback: "That happens only for symmetric, single-peaked data." },
      ],
    },
    {
      type: "quiz",
      id: "st1-6-q4",
      variant: "practice",
      question: "A clothing store is deciding which shirt size to order in the greatest quantity. Which average should it use?",
      options: [
        { text: "The mode of the sizes sold.", correct: true, feedback: "It wants the most common size, which is the definition of the mode." },
        { text: "The mean size.", feedback: "The mean size might fall between two sizes, and it is not the most popular one anyway." },
        { text: "The median size.", feedback: "Half the customers are below it, but it need not be the size most people buy." },
      ],
    },
    {
      type: "quiz",
      id: "st1-6-q5",
      variant: "practice",
      question:
        "For the salary data 30, 32, 35, 35, 38, 40, 42, 45, 48, 500 (₹ thousand), the CEO's salary is cut to 60. Which average changes?",
      options: [
        { text: "Only the mean (it drops from 84.5 to 40.5).", correct: true, feedback: "The total drops by 440, so the mean drops by 44. The CEO is still the largest value, so the median (39) and mode (35) do not move." },
        { text: "Only the median.", feedback: "The CEO is still at the top of the list, so the middle pair is still 38 and 40." },
        { text: "All three.", feedback: "The mode depends only on which value repeats, and 35 still does." },
        { text: "None of them.", feedback: "The mean uses the size of every value, so it must change." },
      ],
    },
    {
      type: "quiz",
      id: "st1-6-q6",
      variant: "practice",
      question: "For the data 2, 3, 3, 3, 4, 5, 6, 9, 12, which statement is correct?",
      options: [
        {
          text: "Mode 3 < median 4 < mean $\\approx 5.22$: right-skewed.",
          correct: true,
          feedback: "$\\sum x = 47$ and $n = 9$, so $\\bar{x} \\approx 5.22$. The median is the 5th value, 4, and 3 occurs most often. The 9 and 12 form a right tail.",
        },
        { text: "Mode 3 < median 4 < mean $\\approx 5.22$: left-skewed.", feedback: "The values are right, but mean > median > mode signals a tail on the **right**." },
        { text: "Mode 3 < median 5 < mean $\\approx 5.22$: right-skewed.", feedback: "With $n = 9$ the median is the 5th sorted value, which is 4. 5 is the 6th." },
        { text: "Mode 3 < mean 4.7 < median 5.", feedback: "Recheck the mean: $\\frac{47}{9} \\approx 5.22$, not $\\frac{47}{10}$." },
      ],
      hint: "Compute all three, then ask which side the stray large values are on.",
    },
    {
      type: "quiz",
      id: "st1-6-q7",
      variant: "practice",
      question:
        "A moderately skewed set of class-test marks has mean 62 and median 66. Using the empirical relation, estimate the mode and describe the skew.",
      options: [
        {
          text: "Mode $\\approx 74$; left-skewed.",
          correct: true,
          feedback: "$3(66) - 2(62) = 198 - 124 = 74$. Mean < median < mode is the left-tail pattern: a few low scores pull the mean down.",
        },
        { text: "Mode $\\approx 74$; right-skewed.", feedback: "The value is right, but a right skew has the mean *above* the median. Here it is below." },
        { text: "Mode $\\approx 54$; right-skewed.", feedback: "That is $3(62) - 2(66)$: the mean and median were swapped. The formula is $3\\,\\text{Median} - 2\\,\\text{Mean}$." },
        { text: "Mode $\\approx 70$; left-skewed.", feedback: "That just continues the gap of 4 beyond the median. Pearson puts the mode twice as far from the median as the mean is: $66 + 2 \\times 4 = 74$." },
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
        "Every question below can be rebuilt from three pictures: the **balance point** (mean, and totals $n\\bar{x}$), the **middle of the ordered data** (median, interpolated on the ogive), and the **peak** (mode, leaning toward the taller neighbour). Try each one before you open a hint.",
    },
    {
      type: "text",
      content: "Questions 1–3 use this table of 50 values:",
    },
    {
      type: "table",
      headers: ["Class", "0–20", "20–40", "40–60", "60–80", "80–100"],
      rows: [["$f$", "8", "12", "20", "6", "4"]],
    },
    {
      type: "quiz",
      id: "st1-7-q1",
      variant: "mastery",
      question: "Using step deviation with $A = 50$ and $h = 20$, find the mean of the table above.",
      options: [
        {
          text: "$44.4$",
          correct: true,
          feedback: "$u = -2, -1, 0, 1, 2$; $\\sum fu = -16 - 12 + 0 + 6 + 8 = -14$. $\\bar{x} = 50 + 20\\cdot\\frac{-14}{50} = 50 - 5.6 = 44.4$.",
        },
        { text: "$49.72$", feedback: "That is $50 - 0.28$: you forgot to multiply $\\bar{u}$ by $h = 20$." },
        { text: "$55.6$", feedback: "$\\sum fu$ is negative, so the mean is below $A$." },
        { text: "$50$", feedback: "$A$ is only the assumed mean. The correction $h\\bar{u}$ must be added." },
      ],
      hint: "$u = \\frac{x - 50}{20}$ for class marks 10, 30, 50, 70, 90.",
    },
    {
      type: "quiz",
      id: "st1-7-q2",
      variant: "mastery",
      question: "Find the median of the same table.",
      options: [
        { text: "$45$", correct: true, feedback: "$\\frac{n}{2} = 25$; cf = 8, 20, 40, … so the median class is 40–60 with $cf = 20$, $f = 20$: $40 + \\frac{5}{20}\\times 20 = 45$." },
        { text: "$50$", feedback: "That is the midpoint of the median class. Interpolate." },
        { text: "$57$", feedback: "That uses $cf = 8$ (the frequency of the first class only). $cf$ is the running total before the median class: $8 + 12 = 20$." },
        { text: "$44.4$", feedback: "That is the mean from question 1. The median comes from the ogive, not the balance point." },
      ],
    },
    {
      type: "quiz",
      id: "st1-7-q3",
      variant: "mastery",
      question: "Estimate the mode of the same table.",
      options: [
        {
          text: "$\\approx 47.27$",
          correct: true,
          feedback: "$l = 40$, $f_0 = 12$, $f_1 = 20$, $f_2 = 6$, $h = 20$: $40 + \\frac{8}{40 - 18}\\times 20 = 40 + \\frac{160}{22} \\approx 47.27$.",
        },
        { text: "$50$", feedback: "The neighbours are unequal (12 and 6), so the mode is not the midpoint." },
        { text: "$\\approx 52.73$", feedback: "The taller neighbour is on the left (12 > 6), so the mode leans left of 50, not right." },
        { text: "$\\approx 44.71$", feedback: "Sign slip: the denominator is $2f_1 - f_0 - f_2 = 40 - 12 - 6 = 22$, not $40 - 12 + 6 = 34$." },
      ],
    },
    {
      type: "quiz",
      id: "st1-7-q4",
      variant: "mastery",
      question:
        "Classes 0–10, 10–20, 20–30, 30–40, 40–50 have frequencies 5, $f$, 20, 10, 5. The median is 24. Find $f$.",
      options: [
        {
          text: "$f = 14$",
          correct: true,
          feedback:
            "$n = 40 + f$ and the median class is 20–30 with $cf = 5 + f$: $24 = 20 + \\frac{\\frac{40+f}{2} - 5 - f}{20}\\times 10$ gives $15 - \\frac{f}{2} = 8$, so $f = 14$. Check: $n = 54$, $20 + \\frac{27 - 19}{20}\\times 10 = 24$.",
        },
        { text: "$f = 7$", feedback: "Check it: $n = 47$, $cf = 12$, median $= 20 + \\frac{23.5 - 12}{20}\\times 10 = 25.75$." },
        { text: "$f = 16$", feedback: "Check it: $n = 56$, $cf = 21$, median $= 20 + \\frac{28 - 21}{20}\\times 10 = 23.5$." },
        { text: "$f = 10$", feedback: "Check it: $n = 50$, $cf = 15$, median $= 20 + \\frac{25 - 15}{20}\\times 10 = 25$." },
      ],
      hint: "Write $n$ and $cf$ in terms of $f$, substitute into the median formula and solve.",
    },
    {
      type: "quiz",
      id: "st1-7-q10",
      variant: "mastery",
      question:
        "Classes 0–10, 10–20, 20–30, 30–40, 40–50, 50–60 have frequencies 5, $x$, 20, 15, $y$, 5. The total frequency is 60 and the median is 28.5. Find $x$ and $y$.",
      options: [
        {
          text: "$x = 8$, $y = 7$",
          correct: true,
          feedback:
            "Two unknowns need two equations. **Total:** $5 + x + 20 + 15 + y + 5 = 60$, so $x + y = 15$. **Median:** 28.5 lies in 20–30, so $l = 20$, $cf = 5 + x$, $f = 20$, $h = 10$: $28.5 = 20 + \\frac{30 - 5 - x}{20}\\times 10$, so $\\frac{25 - x}{2} = 8.5$ and $x = 8$. Then $y = 15 - 8 = 7$. Check: cf = 5, 13, 33, so the 30th value is in 20–30 ✓.",
        },
        { text: "$x = 7$, $y = 8$", feedback: "Swapped. Check: $cf = 12$ gives median $20 + \\frac{30 - 12}{20}\\times 10 = 29$, not 28.5." },
        { text: "$x = 9$, $y = 6$", feedback: "Check: $cf = 14$ gives median $20 + \\frac{30 - 14}{20}\\times 10 = 28$, not 28.5." },
        { text: "$x = 10$, $y = 5$", feedback: "Check: $cf = 15$ gives median $20 + \\frac{15}{20}\\times 10 = 27.5$, not 28.5." },
      ],
      hint: "Use $\\sum f = 60$ for one equation and the median formula (median class 20–30) for the other.",
    },
    {
      type: "quiz",
      id: "st1-7-q5",
      variant: "mastery",
      question:
        "The mean of 30 observations was 50. Later, two values 42 and 64 were found to have been recorded as 24 and 46. What is the correct mean?",
      options: [
        { text: "$51.2$", correct: true, feedback: "$1500 - (24 + 46) + (42 + 64) = 1536$, and $1536 / 30 = 51.2$." },
        { text: "$48.8$", feedback: "The recorded values were too small, so correcting them raises the mean." },
        { text: "$50.6$", feedback: "Both values were wrong by 18, so the total rises by 36, not 18." },
        { text: "$86$", feedback: "That adds 36 to the mean instead of to the total. Divide the change by 30: the mean rises by $36/30 = 1.2$." },
      ],
    },
    {
      type: "quiz",
      id: "st1-7-q6",
      variant: "mastery",
      question: "Three sections have 20, 30 and 50 students with mean marks 50, 60 and 70. What is the overall mean?",
      options: [
        { text: "$63$", correct: true, feedback: "$\\frac{20(50) + 30(60) + 50(70)}{100} = \\frac{1000 + 1800 + 3500}{100} = 63$." },
        { text: "$60$", feedback: "That is the unweighted average of the three means. The largest section has the highest mean, so the answer is above 60." },
        { text: "$70$", feedback: "That is just the largest section's mean." },
        { text: "$57$", feedback: "Check the weights: the section of 50 has mean 70, not 50." },
      ],
    },
    {
      type: "quiz",
      id: "st1-7-q7",
      variant: "mastery",
      question: "A data set has mean 7. Each value $x$ is replaced by $5 - 2x$. What is the new mean?",
      options: [
        { text: "$-9$", correct: true, feedback: "$\\bar{y} = 5 - 2\\bar{x} = 5 - 14 = -9$." },
        { text: "$9$", feedback: "Watch the sign: $5 - 14$ is negative." },
        { text: "$-2$", feedback: "Apply $\\bar{y} = a + b\\bar{x}$ with $a = 5$ and $b = -2$; the mean itself is transformed, not just the coefficients." },
        { text: "$7$", feedback: "Every value changed, so the balance point moves." },
      ],
    },
    {
      type: "quiz",
      id: "st1-7-q8",
      variant: "mastery",
      question:
        "A government report on household income has an open top class '₹5 lakh and above'. Which average can it compute from the grouped table without extra assumptions, and is also the fairest summary of a typical household?",
      options: [
        {
          text: "The median.",
          correct: true,
          feedback: "It needs only the class containing the middle household, not a class mark for the open class, and incomes are right-skewed, so it describes the typical household.",
        },
        { text: "The mean.", feedback: "The open class has no midpoint, so $\\sum fx$ cannot be computed; and the rich tail would pull it up anyway." },
        { text: "The mode, because it is always the most representative.", feedback: "No average is always best. Here the median answers the 'typical household' question and handles the open class." },
      ],
    },
    {
      type: "quiz",
      id: "st1-7-q9",
      variant: "mastery",
      question: "Which statement is true for every data set?",
      options: [
        { text: "The deviations from the mean add to zero.", correct: true, feedback: "$\\sum(x_i - \\bar{x}) = \\sum x_i - n\\bar{x} = 0$: the balance property." },
        { text: "The mean is one of the data values.", feedback: "Data 1, 2 has mean 1.5." },
        { text: "The median lies between the mean and the mode.", feedback: "That is typical for moderately skewed, single-peaked data, not a law." },
        { text: "There is exactly one mode.", feedback: "Data can be bimodal or have no mode." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Two data sets can share the same mean, median and mode and still look nothing alike. Chapter 2 builds the second number every summary needs: how spread out the values are around the centre.",
    },
  ]),
};

export const statisticsChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
