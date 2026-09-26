import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Statistics Chapter 4 — Two Variables: Correlation and Regression.
 * From one variable to two. Put the origin at the point of means and one
 * picture, the co-deviation rectangle, gives covariance, Pearson's r,
 * Spearman's rho (r on ranks) and the least-squares line. Then the two
 * regression lines, r² as variation explained, and honest prediction.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

/** Hours studied vs marks for 10 students: r ≈ 0.95, ŷ ≈ 32.5 + 5.75x. */
const STUDY = [
  { x: 1, y: 35 },
  { x: 2, y: 42 },
  { x: 2, y: 50 },
  { x: 3, y: 48 },
  { x: 4, y: 58 },
  { x: 5, y: 55 },
  { x: 5, y: 66 },
  { x: 6, y: 70 },
  { x: 7, y: 68 },
  { x: 8, y: 80 },
];
const STUDY_WINDOW = { xmin: 0, xmax: 10, ymin: 20, ymax: 100 };

/** The running five-point example: x̄ = 3, ȳ = 4, Cov = 1.6, σx² = σy² = 2, r = 0.8, ŷ = 1.6 + 0.8x. */
const FIVE = [
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 3 },
  { x: 4, y: 6 },
  { x: 5, y: 5 },
];
const FIVE_WINDOW = { xmin: 0, xmax: 6, ymin: 0, ymax: 8 };

/** y = x² on x = −3 … 3: a perfect relationship with r = 0. */
const PARABOLA = [
  { x: -3, y: 9 },
  { x: -2, y: 4 },
  { x: -1, y: 1 },
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 2, y: 4 },
  { x: 3, y: 9 },
];
const PARABOLA_WINDOW = { xmin: -4, xmax: 4, ymin: -1, ymax: 10 };

// ---------------------------------------------------------------------------
// 4.1 Scatter plots and association
// ---------------------------------------------------------------------------

const lesson01: LessonSeed = {
  slug: "scatter-plots-and-association",
  title: "4.1 · Scatter Plots and Association",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/st-4-correlation-and-regression.mp4",
      poster: "/videos/st-4-correlation-and-regression.jpg",
      title: "Chapter 4 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Until now every data set has been a list of *single* numbers: heights, marks, commute times. But the interesting questions usually involve *two* numbers per person. Do students who study longer score higher? Do heavier cars use more fuel? Does a hotter day sell more ice cream? To answer them you need both measurements from the same individual, kept together as a pair $(x, y)$.",
    },
    {
      type: "text",
      content:
        "The picture for paired data is the **scatter plot**: one dot per individual, placed at $(x, y)$. Below are ten students, hours studied on the horizontal axis and marks on the vertical. Before any formula, just look. Then drag the dots around: try to make the cloud slope *down*, then make it a shapeless blob, then bend it into a curve.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-scatter-regression",
        points: STUDY,
        window: STUDY_WINDOW,
        xLabel: "Hours studied",
        yLabel: "Marks",
        stats: [],
        caption:
          "Each dot is one student. Drag dots to reshape the cloud, tap empty space to add a student, select a dot and press Remove to delete one.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Scatter plot",
      content:
        "A graph of paired data $(x_1, y_1), (x_2, y_2), \\dots, (x_n, y_n)$ with one point per individual. The **explanatory variable** $x$ (the one we think might influence or predict) goes on the horizontal axis; the **response variable** $y$ (the one we want to explain or predict) goes on the vertical axis.",
    },
    {
      type: "text",
      content:
        "Whenever you describe a scatter plot, say four things, in this order:",
    },
    {
      type: "table",
      headers: ["Feature", "Question to ask", "Study-hours example"],
      rows: [
        ["Direction", "As $x$ increases, does $y$ tend to increase (positive), decrease (negative), or neither?", "Positive: more hours, higher marks"],
        ["Form", "Does the cloud follow a straight line, a curve, or clusters?", "Roughly linear"],
        ["Strength", "How tightly do the points hug that form?", "Strong: little scatter around a line"],
        ["Outliers", "Are any points far from the overall pattern?", "None obvious"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Direction is about tendency, not every pair",
      content:
        "Positive association does not mean every extra hour raises the mark. Look at the students at $x = 5$: one scored 55, the other 66, and the 55 is lower than the 58 at $x = 4$. Association describes the *overall drift* of the cloud, and individual pairs can go against it.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (routine): reading a table as a scatter plot.** A juice stall records the afternoon temperature and the number of cups sold on six days.",
    },
    {
      type: "table",
      headers: ["Temperature $x$ (°C)", "24", "26", "28", "30", "32", "34"],
      rows: [
        ["Cups sold $y$", "120", "135", "160", "170", "200", "215"],
        ["Change in $y$ per 2 °C step", "", "$+15$", "$+25$", "$+10$", "$+30$", "$+15$"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1: roles.** Temperature comes first and plausibly drives sales, so temperature is $x$. *Why this step:* the axes are fixed by the question you want to answer, not by the numbers.\n\n**Step 2: direction.** As $x$ rises, $y$ rises in every step: **positive**. *Why:* direction is the overall drift, so read the table left to right.\n\n**Step 3: form.** The increases per 2 °C are $15, 25, 10, 30, 15$: they wobble around an average of $\\frac{95}{5} = 19$ cups but show no steady growth or shrinkage. So the form is roughly **linear**. *Why:* a straight line means equal steps in $x$ give roughly equal steps in $y$; a curve would show the steps growing or shrinking steadily.\n\n**Step 4: strength and outliers.** The wobble ($10$ to $30$) is modest compared with the total rise of $95$ cups, and no day breaks the pattern: **strong, no outliers**.\n\n**Summary sentence:** a strong, positive, roughly linear association between temperature and cups sold, with no outliers.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (application): spotting an outlier.** Eight students report daily screen time $x$ (hours) and sleep $y$ (hours): $(1, 8.5), (2, 8), (3, 7.5), (4, 7), (5, 6), (6, 6), (7, 5), (3, 4)$.\n\n**Step 1: the main pattern.** Seven of the points fall steadily, from 8.5 hours of sleep at 1 hour of screen time to 5 hours at 7: about $\\frac{3.5}{6} \\approx 0.6$ hours (35 minutes) less sleep per extra hour of screen time. That is a **negative, linear, strong** pattern. *Why this step:* describe the bulk of the data first, then look for what does not fit.\n\n**Step 2: the misfit.** The point $(3, 4)$ sits far below the others at $x = 3$ (its neighbour is $(3, 7.5)$). That is an **outlier**. *Why:* an outlier is judged against the pattern, not against the range of $y$; 4 hours is not the smallest $y$ in some absolute sense, but it is 3.5 hours below what the pattern predicts at $x = 3$.\n\n**Step 3: report, do not delete.** \"Strong negative linear association between screen time and sleep, with one outlier at $(3, 4)$\". Perhaps that student was ill or had an exam that night; find out before removing the point.",
    },
    {
      type: "quiz",
      id: "st4-1-q5",
      variant: "practice",
      question:
        "Distance from the city centre $x$ (km) and monthly rent $y$ (₹ thousand) for five similar flats: $(2, 50), (4, 44), (6, 41), (8, 33), (10, 30)$. Which description fits best?",
      options: [
        {
          text: "Strong, negative, roughly linear association with no outliers.",
          correct: true,
          feedback: "Each 2 km step lowers rent by $6, 3, 8, 3$ thousand: always down, by roughly similar amounts, with no point breaking the pattern.",
        },
        {
          text: "Positive association, because both columns contain large numbers.",
          feedback: "Direction is about how $y$ changes as $x$ grows. Rent falls as distance rises, so it is negative.",
        },
        {
          text: "No association, because the drops are not all equal.",
          feedback: "Unequal steps just mean the points scatter a little around a line. The drift is clearly downward every time.",
        },
      ],
      hint: "Read the table left to right: what happens to rent at each step?",
    },
    {
      type: "text",
      content:
        "**Which variable goes on which axis?** Ask which one you would use to *predict* the other, or which one comes first in time. Rainfall explains crop yield, not the other way round, so rainfall is $x$. Sometimes neither variable explains the other (height and arm span of the same person); then the choice is arbitrary, and you are only describing association.",
    },
    {
      type: "quiz",
      id: "st4-1-q1",
      variant: "practice",
      question:
        "A researcher records, for 40 villages, the number of days of rain in the monsoon and the rice yield per hectare. Which is the natural explanatory variable?",
      options: [
        {
          text: "Days of rain, because rainfall comes first and plausibly influences yield.",
          correct: true,
          feedback: "Yes. Rainfall happens before harvest and is the natural predictor, so it goes on the horizontal axis.",
        },
        {
          text: "Rice yield, because it is the bigger number.",
          feedback: "The size of the numbers never decides the roles. Ask which variable you would use to predict the other.",
        },
        {
          text: "Either; with paired data the roles never matter.",
          feedback: "For pure description the roles can be swapped, but here one variable plausibly drives the other, so the roles are clear. In 4.7 you will see the choice changes the regression line.",
        },
      ],
    },
    {
      type: "text",
      content:
        "Now the most important trap of the chapter. Here are seven points lying *exactly* on the curve $y = x^2$. Knowing $x$ tells you $y$ perfectly. Is there a relationship?",
    },
    {
      type: "interactive",
      config: {
        component: "stats-scatter-regression",
        points: PARABOLA,
        window: PARABOLA_WINDOW,
        xLabel: "x",
        yLabel: "y",
        stats: [],
        caption:
          "Seven points on y = x². The left half slopes down and the right half slopes up, so there is no single up or down direction, yet the relationship is perfect.",
      },
    },
    {
      type: "text",
      content:
        "The relationship is perfect, but it has **no direction** and **no straight-line form**: the left half falls, the right half rises, and the two tendencies cancel. Everything in 4.2 to 4.3 measures *linear* association only, and on this data every one of those measures will come out as exactly zero. Keep this picture in mind; it will come back.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: no straight-line pattern means no relationship",
      content:
        "A clean curve, a U shape, or two separate clusters are all relationships. The honest description is \"strong, curved (non-linear) association\", not \"no association\". Always *look at the plot* before trusting any single number.",
    },
    {
      type: "quiz",
      id: "st4-1-q2",
      variant: "concept",
      question:
        "The fuel efficiency of a car (km per litre) is highest at around 60 km/h, and lower at both slower and faster speeds. A scatter plot of efficiency against speed for many trips will show:",
      options: [
        {
          text: "A strong curved (hump-shaped) association, even though there is no single overall direction.",
          correct: true,
          feedback: "Right. The pattern rises then falls. That is a real, strong relationship with a non-linear form.",
        },
        {
          text: "No association, because efficiency neither always rises nor always falls with speed.",
          feedback: "That is the trap. A hump is a relationship; knowing the speed tells you a lot about efficiency. It just is not a straight line.",
        },
        {
          text: "A strong positive association, because faster cars are more efficient.",
          feedback: "Only up to about 60 km/h. Above that efficiency drops, so the overall form is a hump, not a rising line.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-1-q3",
      variant: "practice",
      question:
        "For 30 used cars of the same model, age (years) is plotted against selling price (lakh ₹). The points drift down from left to right, fairly close to a line, except one 3-year-old car priced far below the rest. Which description is best?",
      options: [
        {
          text: "Negative, roughly linear, fairly strong association, with one low outlier at 3 years.",
          correct: true,
          feedback: "All four features: direction, form, strength and outliers. The outlier might be a damaged car, worth investigating.",
        },
        {
          text: "Positive association, because both age and price are large for some cars.",
          feedback: "Direction is about how $y$ changes as $x$ grows. Older cars sell for less, so the association is negative.",
        },
        {
          text: "No association, because of the outlier.",
          feedback: "One stray point does not erase the pattern of the other 29. Report the pattern and the outlier separately.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-1-q4",
      variant: "practice",
      question: "Which pair of variables would you expect to show a *negative* association?",
      options: [
        {
          text: "Altitude of a town and its average winter temperature.",
          correct: true,
          feedback: "Higher towns tend to be colder, so as $x$ rises, $y$ falls.",
        },
        {
          text: "Height and weight of adults.",
          feedback: "Taller people tend to be heavier: that is positive association.",
        },
        {
          text: "Roll number and marks in a class.",
          feedback: "Roll numbers are usually assigned alphabetically, so we would expect no association at all.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 3 (exam-style, CBSE Class 11 Economics): classify the association.** State whether each pair shows positive, negative or no (linear) correlation, with a reason.",
    },
    {
      type: "table",
      headers: ["Pair", "Verdict", "Why"],
      rows: [
        ["(a) Price of a good and quantity demanded", "Negative", "Law of demand: as price rises, buyers purchase less"],
        ["(b) Family income and expenditure on food", "Positive", "Richer families spend more in rupees, even if a smaller share"],
        ["(c) Temperature and sales of woollen clothes", "Negative", "Warmer days mean fewer sweaters sold"],
        ["(d) Height of students and their marks in Maths", "No correlation", "No plausible link; tall and short students score across the range"],
        ["(e) Speed of a car and its fuel efficiency over 20 to 120 km/h", "No single direction (curved)", "Efficiency rises then falls, a hump shape, so linear correlation is weak even though the relationship is real"],
      ],
    },
    {
      type: "text",
      content:
        "**How to answer.** For each pair, *imagine the scatter plot*: pick a low and a high value of $x$ and ask which way $y$ moves. *Why this step:* it turns a vague word question into a concrete picture. Part (e) is the trap: \"no correlation\" is wrong there, because the variables *are* related; the honest answer is \"curved relationship, so $r$ would be close to zero\".",
    },
    {
      type: "quiz",
      id: "st4-1-q6",
      variant: "practice",
      question:
        "Which pair is most likely to show a *positive* association?",
      options: [
        {
          text: "The number of hours a shop is open per day and its daily sales.",
          correct: true,
          feedback: "Longer opening hours give more time for customers, so higher $x$ tends to go with higher $y$.",
        },
        {
          text: "The age of a scooter and its resale value.",
          feedback: "Older scooters sell for less, which is a negative association.",
        },
        {
          text: "A person's shoe size and their mobile number's last digit.",
          feedback: "There is no conceivable link, so we expect no association.",
        },
        {
          text: "The number of absent days and a student's attendance percentage.",
          feedback: "More absences mean a lower attendance percentage: negative, and in fact an exact straight-line relationship.",
        },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Words like \"strong\" and \"weak\" are vague. In 4.2 we build a number that measures linear association, starting from a single picture: rectangles drawn from the point of means.",
    },
  ]),
};

// ---------------------------------------------------------------------------
// 4.2 Covariance
// ---------------------------------------------------------------------------

const lesson02: LessonSeed = {
  slug: "covariance",
  title: "4.2 · Covariance: Moving Together",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "We want one number that is positive when the cloud rises, negative when it falls, and near zero when it has no linear trend. The trick is to **move the origin to the point of means** $(\\bar{x}, \\bar{y})$. Draw a vertical line at $\\bar{x}$ and a horizontal line at $\\bar{y}$. They cut the plane into four quadrants.",
    },
    {
      type: "text",
      content:
        "In a rising cloud, most points sit in the top-right (above average in *both*) or the bottom-left (below average in *both*). In a falling cloud they sit top-left and bottom-right. So look at the *signs* of the deviations $x - \\bar{x}$ and $y - \\bar{y}$:",
    },
    {
      type: "table",
      headers: ["Quadrant (from the means)", "$x - \\bar{x}$", "$y - \\bar{y}$", "Product"],
      rows: [
        ["Top-right (I)", "$+$", "$+$", "$+$"],
        ["Top-left (II)", "$-$", "$+$", "$-$"],
        ["Bottom-left (III)", "$-$", "$-$", "$+$"],
        ["Bottom-right (IV)", "$+$", "$-$", "$-$"],
      ],
    },
    {
      type: "text",
      content:
        "The product $(x - \\bar{x})(y - \\bar{y})$ is the *area* of a rectangle with one corner at the point and the opposite corner at $(\\bar{x}, \\bar{y})$, signed: positive in quadrants I and III, negative in II and IV. Add up all the signed areas and you have a verdict on the whole cloud. Try it: the green rectangles add, the orange ones subtract.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-scatter-regression",
        points: FIVE,
        window: FIVE_WINDOW,
        showCoDeviation: true,
        stats: ["cov"],
        caption:
          "Each rectangle joins a point to the mean cross-hairs. Drag the point at (5, 5) down to (5, 1) and watch its rectangle turn orange and the covariance fall.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Covariance",
      content:
        "The covariance of $n$ pairs $(x_i, y_i)$ is the mean co-deviation rectangle, shown below. Positive covariance means the cloud tends to rise, negative means it tends to fall, and near zero means there is no linear trend. (As everywhere in this course, we divide by $n$.)",
    },
    {
      type: "math",
      latex: "\\operatorname{Cov}(x, y) = \\frac{1}{n}\\sum_{i=1}^{n} (x_i - \\bar{x})(y_i - \\bar{y})",
    },
    {
      type: "text",
      content:
        "Notice the family resemblance: $\\operatorname{Cov}(x, x) = \\frac{1}{n}\\sum (x_i - \\bar{x})^2 = \\sigma_x^2$. Variance is just the covariance of a variable with itself, and the rectangles become squares.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: covariance from the definition.** Take the five points in the interactive: $(1, 2), (2, 4), (3, 3), (4, 6), (5, 5)$.",
    },
    {
      type: "text",
      content:
        "**Step 1: means.** $\\bar{x} = \\frac{15}{5} = 3$, $\\bar{y} = \\frac{20}{5} = 4$.\n\n**Step 2: deviations and their products.**",
    },
    {
      type: "table",
      headers: ["$x$", "$y$", "$x - \\bar{x}$", "$y - \\bar{y}$", "$(x - \\bar{x})(y - \\bar{y})$"],
      rows: [
        ["1", "2", "$-2$", "$-2$", "$4$"],
        ["2", "4", "$-1$", "$0$", "$0$"],
        ["3", "3", "$0$", "$-1$", "$0$"],
        ["4", "6", "$1$", "$2$", "$2$"],
        ["5", "5", "$2$", "$1$", "$2$"],
        ["", "", "", "Total", "$8$"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 3: average.** $\\operatorname{Cov}(x, y) = \\frac{8}{5} = 1.6$. Positive, as the rising cloud suggested. Two points sit on a mean line, so their rectangles have zero area and contribute nothing.",
    },
    {
      type: "text",
      content:
        "**A shortcut, derived.** Deviations get messy when the means are not whole numbers. Expand the product:",
    },
    {
      type: "math",
      latex:
        "\\frac{1}{n}\\sum (x_i - \\bar{x})(y_i - \\bar{y}) = \\frac{1}{n}\\sum x_i y_i - \\bar{y}\\cdot\\frac{1}{n}\\sum x_i - \\bar{x}\\cdot\\frac{1}{n}\\sum y_i + \\bar{x}\\bar{y}",
    },
    {
      type: "math",
      latex: "= \\frac{1}{n}\\sum x_i y_i - \\bar{y}\\bar{x} - \\bar{x}\\bar{y} + \\bar{x}\\bar{y} \\quad\\Longrightarrow\\quad \\operatorname{Cov}(x, y) = \\frac{\\sum x_i y_i}{n} - \\bar{x}\\,\\bar{y}",
    },
    {
      type: "text",
      content:
        "\"Mean of the products minus product of the means\", the exact twin of $\\sigma^2 = \\frac{\\sum x^2}{n} - \\bar{x}^2$. Check it on the five points: $\\sum xy = 2 + 8 + 9 + 24 + 25 = 68$, so $\\operatorname{Cov} = \\frac{68}{5} - 3 \\times 4 = 13.6 - 12 = 1.6$. Same answer.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: a negative covariance with the shortcut.** Pairs $(2, 10), (4, 8), (6, 6), (8, 2)$.\n\n**Step 1.** $\\bar{x} = \\frac{20}{4} = 5$, $\\bar{y} = \\frac{26}{4} = 6.5$.\n\n**Step 2.** $\\sum xy = 20 + 32 + 36 + 16 = 104$, so $\\frac{\\sum xy}{n} = 26$.\n\n**Step 3.** $\\operatorname{Cov} = 26 - 5 \\times 6.5 = 26 - 32.5 = -6.5$. Negative: as $x$ rises, $y$ falls.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (application): rainfall and crop yield.** Over five seasons a farmer records monsoon rainfall $x$ (in tens of cm, so $10$ means 100 cm) and wheat yield $y$ (quintals per acre).",
    },
    {
      type: "table",
      headers: ["$x$", "$y$", "$x - 14$", "$y - 24$", "Product"],
      rows: [
        ["10", "20", "$-4$", "$-4$", "$16$"],
        ["12", "23", "$-2$", "$-1$", "$2$"],
        ["14", "22", "$0$", "$-2$", "$0$"],
        ["16", "27", "$2$", "$3$", "$6$"],
        ["18", "28", "$4$", "$4$", "$16$"],
        ["", "", "", "Total", "$40$"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1: means.** $\\bar{x} = \\frac{70}{5} = 14$, $\\bar{y} = \\frac{120}{5} = 24$. *Why this step:* every rectangle is measured from the point of means, so they come first.\n\n**Step 2: co-deviations.** From the table the products sum to $40$. Notice that no product is negative: every season is either above average in both or below average in both (or on a mean line). *Why:* reading the signs tells you the answer's sign before any division.\n\n**Step 3: average.** $\\operatorname{Cov} = \\frac{40}{5} = 8$, in units of (tens of cm) × (quintals per acre).\n\n**Check with the shortcut.** $\\sum xy = 200 + 276 + 308 + 432 + 504 = 1720$, so $\\operatorname{Cov} = \\frac{1720}{5} - 14 \\times 24 = 344 - 336 = 8$. Both routes agree.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam-style): a miscopied pair.** For 10 pairs, $\\sum x = 60$, $\\sum y = 40$, $\\sum xy = 260$. Later it is found that the pair $(8, 6)$ was copied as $(6, 8)$. Find the correct covariance.\n\n**Step 1: the wrong value (for comparison).** $\\bar{x} = 6$, $\\bar{y} = 4$, $\\operatorname{Cov} = 26 - 24 = 2$.\n\n**Step 2: repair each sum.** Remove the wrong pair and add the right one.\n- $\\sum x = 60 - 6 + 8 = 62$\n- $\\sum y = 40 - 8 + 6 = 38$\n- $\\sum xy = 260 - 48 + 48 = 260$\n\n*Why this step:* sums are easy to repair one term at a time; means and covariances are not.\n\n**Step 3: recompute.** $\\bar{x} = 6.2$, $\\bar{y} = 3.8$, so $\\operatorname{Cov} = \\frac{260}{10} - 6.2 \\times 3.8 = 26 - 23.56 = 2.44$.\n\nThe trap: $\\sum xy$ did not change ($6 \\times 8 = 8 \\times 6$), so it is tempting to say the covariance did not change either. But the *means* moved, and so did the answer.",
    },
    {
      type: "quiz",
      id: "st4-2-q6",
      variant: "practice",
      question:
        "Find $\\operatorname{Cov}(x, y)$ for the pairs $(1, 5), (2, 3), (3, 4), (4, 1), (5, 2)$.",
      options: [
        {
          text: "$-1.6$",
          correct: true,
          feedback: "$\\bar{x} = \\bar{y} = 3$. Deviations $d_x = -2, -1, 0, 1, 2$ and $d_y = 2, 0, 1, -2, -1$ give products $-4, 0, 0, -2, -2$, total $-8$. Divide by $n = 5$: $-1.6$.",
        },
        {
          text: "$-8$",
          feedback: "That is the sum of the products. The covariance is their mean, so divide by $n = 5$.",
        },
        {
          text: "$-2$",
          feedback: "You divided by $n - 1 = 4$. This course defines covariance with division by $n$.",
        },
        {
          text: "$1.6$",
          feedback: "Check the signs: the cloud falls from $(1, 5)$ to $(5, 2)$, and the products are all zero or negative.",
        },
      ],
      hint: "Both means are 3. Tabulate $d_x$, $d_y$ and their products.",
    },
    {
      type: "quiz",
      id: "st4-2-q1",
      variant: "practice",
      question:
        "For 5 pairs, $\\sum x = 15$, $\\sum y = 25$ and $\\sum xy = 81$. What is $\\operatorname{Cov}(x, y)$?",
      options: [
        {
          text: "$1.2$",
          correct: true,
          feedback: "$\\bar{x} = 3$, $\\bar{y} = 5$, so $\\operatorname{Cov} = \\frac{81}{5} - 15 = 16.2 - 15 = 1.2$.",
        },
        {
          text: "$16.2$",
          feedback: "That is only the mean of the products. You still need to subtract $\\bar{x}\\bar{y} = 15$.",
        },
        {
          text: "$6$",
          feedback: "That is $\\sum(x - \\bar{x})(y - \\bar{y}) = 81 - 75$. Divide by $n = 5$ to get the covariance.",
        },
        {
          text: "$-1.2$",
          feedback: "Check the order: mean of products ($16.2$) minus product of means ($15$) is positive.",
        },
      ],
      hint: "Mean of the products minus the product of the means.",
    },
    {
      type: "quiz",
      id: "st4-2-q2",
      variant: "practice",
      question:
        "In a scatter plot with the mean cross-hairs drawn, almost all points lie in the top-left and bottom-right quadrants. The covariance is:",
      options: [
        {
          text: "Negative",
          correct: true,
          feedback: "In those quadrants one deviation is positive and the other negative, so every rectangle subtracts.",
        },
        {
          text: "Positive",
          feedback: "Positive products come from quadrants I and III (both deviations the same sign). Top-left and bottom-right give negative products.",
        },
        {
          text: "Zero, because the positive and negative deviations cancel.",
          feedback: "The *deviations* do sum to zero separately, but the *products* here are all negative, so they do not cancel.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**The flaw in covariance: units.** Covariance carries the units of $x$ times the units of $y$. Measure the heights of the same people in centimetres instead of metres and every $x - \\bar{x}$ is 100 times bigger, so every rectangle and the covariance are 100 times bigger. The people have not changed at all.",
    },
    {
      type: "math",
      latex: "\\operatorname{Cov}(ax + b,\\; cy + d) = ac\\,\\operatorname{Cov}(x, y)",
    },
    {
      type: "text",
      content:
        "Why: adding $b$ shifts every $x$ and $\\bar{x}$ by the same amount, so deviations do not change; multiplying by $a$ multiplies every deviation by $a$. The same happens on the $y$ side. Shifts do nothing and scalings multiply.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam-style): covariance after a change of origin and scale.** $\\operatorname{Cov}(x, y) = -6$. Find $\\operatorname{Cov}(u, v)$ where $u = 3x - 2$ and $v = \\frac{5 - y}{2}$.\n\n**Step 1: write each new variable as (multiplier) × old + (constant).** $u = 3x + (-2)$, so $a = 3$. $v = -\\frac{1}{2}y + \\frac{5}{2}$, so $c = -\\frac{1}{2}$. *Why this step:* only the multipliers matter; the constants are shifts, which leave every deviation unchanged.\n\n**Step 2: multiply.** $\\operatorname{Cov}(u, v) = ac\\,\\operatorname{Cov}(x, y) = 3 \\times \\left(-\\frac{1}{2}\\right) \\times (-6) = 9$.\n\n**Step 3: sanity check the sign.** $x$ and $y$ move in opposite directions. $u$ moves with $x$, but $v$ moves *against* $y$, so $u$ and $v$ move together: positive covariance, as found.",
    },
    {
      type: "quiz",
      id: "st4-2-q7",
      variant: "practice",
      question:
        "$\\operatorname{Cov}(x, y) = 4$. If $u = \\frac{x - 10}{2}$ and $v = \\frac{20 - y}{4}$, what is $\\operatorname{Cov}(u, v)$?",
      options: [
        {
          text: "$-0.5$",
          correct: true,
          feedback: "Multipliers $\\frac{1}{2}$ and $-\\frac{1}{4}$: $\\frac{1}{2} \\times \\left(-\\frac{1}{4}\\right) \\times 4 = -0.5$. The shifts 10 and 20 have no effect.",
        },
        {
          text: "$0.5$",
          feedback: "$v = 5 - \\frac{y}{4}$ has a *negative* multiplier, which flips the sign of the covariance.",
        },
        {
          text: "$4$",
          feedback: "That is true only for shifts. Scaling by $\\frac{1}{2}$ and $-\\frac{1}{4}$ does change covariance.",
        },
        {
          text: "$-0.25$",
          feedback: "You squared one of the multipliers. Covariance picks up each multiplier once: $\\frac{1}{2} \\times \\left(-\\frac{1}{4}\\right) \\times 4$.",
        },
      ],
      hint: "$\\operatorname{Cov}(ax + b, cy + d) = ac\\operatorname{Cov}(x, y)$. Write $v$ as $-\\frac{1}{4}y + 5$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: a large covariance means a strong relationship",
      content:
        "The size of a covariance depends on the units and the spread of the data, not just on how tightly the points hug a line. A weak relationship between incomes in rupees can have a covariance in the millions; a near-perfect one between lengths in metres can have a covariance of 0.01. Only the **sign** of covariance is meaningful on its own. To judge strength we must remove the units, which is exactly what 4.3 does.",
    },
    {
      type: "quiz",
      id: "st4-2-q3",
      variant: "concept",
      question:
        "Data set A (monthly income in ₹ vs spending in ₹) has covariance 250 000. Data set B (height in m vs arm span in m) has covariance 0.008. What can you conclude?",
      options: [
        {
          text: "Both associations are positive, but the covariances alone cannot tell us which is stronger.",
          correct: true,
          feedback: "Right. Rupees squared and metres squared are not comparable, and even within one data set the size depends on the spread. Standardise first (4.3).",
        },
        {
          text: "A is a far stronger relationship than B.",
          feedback: "A's covariance is huge because rupee amounts are huge numbers. Rewrite A in thousands of rupees and it drops by a factor of a million.",
        },
        {
          text: "B shows essentially no relationship, since 0.008 is almost zero.",
          feedback: "Height and arm span are very closely related. The covariance is tiny only because deviations in metres are tiny numbers.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-2-q4",
      variant: "practice",
      question:
        "Heights $x$ (in m) and weights $y$ (in kg) of a group have $\\operatorname{Cov}(x, y) = 0.12$. If heights are recorded in cm instead, the covariance becomes:",
      options: [
        {
          text: "$12$",
          correct: true,
          feedback: "Every height deviation is multiplied by 100, so the covariance is multiplied by 100.",
        },
        {
          text: "$0.12$",
          feedback: "Covariance is not unit-free. Changing metres to centimetres multiplies each $x$-deviation by 100.",
        },
        {
          text: "$1200$",
          feedback: "That would be a factor of $100^2$, as for the *variance* of height. Covariance involves $x$ only once per product.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-2-q5",
      variant: "concept",
      question: "What is $\\operatorname{Cov}(x, x)$?",
      options: [
        {
          text: "$\\sigma_x^2$, the variance of $x$.",
          correct: true,
          feedback: "With $y = x$ each rectangle becomes a square $(x - \\bar{x})^2$, and their mean is the variance.",
        },
        {
          text: "$1$, since a variable is perfectly related to itself.",
          feedback: "That is the value of the *correlation* of $x$ with itself (4.3). Covariance still carries units.",
        },
        {
          text: "$0$, since the deviations sum to zero.",
          feedback: "The deviations sum to zero, but their squares do not, unless every value is the same.",
        },
      ],
    },
  ]),
};

// ---------------------------------------------------------------------------
// 4.3 Pearson's r
// ---------------------------------------------------------------------------

const lesson03: LessonSeed = {
  slug: "pearson-correlation",
  title: "4.3 · Karl Pearson's Correlation Coefficient",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Covariance has the right *sign* but the wrong *units*. The fix is one you already know from z-scores (Chapter 3): measure each deviation in units of its own standard deviation. A student 1.5 SD above average in hours and 1.2 SD above average in marks contributes $1.5 \\times 1.2 = 1.8$, whatever units hours and marks were measured in.",
    },
    {
      type: "math",
      latex:
        "r = \\frac{1}{n}\\sum_{i=1}^{n} \\left(\\frac{x_i - \\bar{x}}{\\sigma_x}\\right)\\left(\\frac{y_i - \\bar{y}}{\\sigma_y}\\right) = \\frac{1}{n}\\sum z_{x,i}\\, z_{y,i}",
    },
    {
      type: "text",
      content:
        "Pull the constants $\\sigma_x, \\sigma_y$ out of the sum and what is left is the covariance:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Karl Pearson's coefficient of correlation",
      content:
        "Pearson's $r$, defined below, is the mean product of z-scores: a unit-free measure of the direction and strength of **linear** association, always between $-1$ and $1$.",
    },
    {
      type: "math",
      latex:
        "r = \\frac{\\operatorname{Cov}(x, y)}{\\sigma_x\\,\\sigma_y} = \\frac{\\sum (x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum (x_i - \\bar{x})^2}\\,\\sqrt{\\sum (y_i - \\bar{y})^2}}",
    },
    {
      type: "text",
      content:
        "In the second form the $\\frac{1}{n}$ factors cancel top and bottom, which is why many textbooks write it without them. Now play with the live $r$. Try to push it to $1$, then to $-1$, then to $0$.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-scatter-regression",
        points: STUDY,
        window: STUDY_WINDOW,
        xLabel: "Hours studied",
        yLabel: "Marks",
        showCoDeviation: true,
        stats: ["cov", "r"],
        caption:
          "The study-hours data start at r ≈ 0.95. Line the points up exactly and r hits 1. Scatter them into a round blob and r drops towards 0.",
      },
    },
    {
      type: "table",
      headers: ["Value of $r$", "What the cloud looks like"],
      rows: [
        ["$r = 1$", "Every point exactly on a rising straight line"],
        ["$r \\approx 0.8$ to $0.95$", "Clear rising band with some scatter"],
        ["$r \\approx 0.3$", "Faint upward drift in a wide cloud"],
        ["$r = 0$", "No *linear* trend (could still be a curve)"],
        ["$r = -1$", "Every point exactly on a falling straight line"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1: r from a table, in steps.** The five points $(1, 2), (2, 4), (3, 3), (4, 6), (5, 5)$ from 4.2.",
    },
    {
      type: "table",
      headers: ["$x$", "$y$", "$d_x = x - 3$", "$d_y = y - 4$", "$d_x^2$", "$d_y^2$", "$d_x d_y$"],
      rows: [
        ["1", "2", "$-2$", "$-2$", "4", "4", "4"],
        ["2", "4", "$-1$", "$0$", "1", "0", "0"],
        ["3", "3", "$0$", "$-1$", "0", "1", "0"],
        ["4", "6", "$1$", "$2$", "1", "4", "2"],
        ["5", "5", "$2$", "$1$", "4", "1", "2"],
        ["", "", "", "Totals", "10", "10", "8"],
      ],
    },
    {
      type: "math",
      latex: "r = \\frac{\\sum d_x d_y}{\\sqrt{\\sum d_x^2}\\sqrt{\\sum d_y^2}} = \\frac{8}{\\sqrt{10}\\,\\sqrt{10}} = \\frac{8}{10} = 0.8",
    },
    {
      type: "text",
      content:
        "Equivalently $\\sigma_x^2 = \\sigma_y^2 = \\frac{10}{5} = 2$ and $\\operatorname{Cov} = 1.6$, so $r = \\frac{1.6}{\\sqrt{2}\\sqrt{2}} = 0.8$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: r from sums.** For $n = 10$ pairs: $\\sum x = 50$, $\\sum y = 80$, $\\sum x^2 = 290$, $\\sum y^2 = 680$, $\\sum xy = 430$.\n\n**Step 1: means.** $\\bar{x} = 5$, $\\bar{y} = 8$.\n\n**Step 2: variances.** $\\sigma_x^2 = \\frac{290}{10} - 25 = 4$, so $\\sigma_x = 2$. $\\sigma_y^2 = \\frac{680}{10} - 64 = 4$, so $\\sigma_y = 2$.\n\n**Step 3: covariance.** $\\operatorname{Cov} = \\frac{430}{10} - 5 \\times 8 = 43 - 40 = 3$.\n\n**Step 4.** $r = \\frac{3}{2 \\times 2} = 0.75$.",
    },
    {
      type: "quiz",
      id: "st4-3-q1",
      variant: "practice",
      question:
        "For 5 pairs, $\\sum x = 15$, $\\sum y = 25$, $\\sum x^2 = 55$, $\\sum y^2 = 135$, $\\sum xy = 81$. Find $r$.",
      options: [
        {
          text: "$0.6$",
          correct: true,
          feedback: "$\\sigma_x^2 = 11 - 9 = 2$, $\\sigma_y^2 = 27 - 25 = 2$, $\\operatorname{Cov} = 16.2 - 15 = 1.2$, so $r = \\frac{1.2}{\\sqrt{2}\\sqrt{2}} = 0.6$.",
        },
        {
          text: "$1.2$",
          feedback: "That is the covariance. Divide by $\\sigma_x \\sigma_y = 2$ to standardise; $r$ can never exceed 1.",
        },
        {
          text: "$0.3$",
          feedback: "You divided by $\\sigma_x^2 \\sigma_y^2 = 4$. The denominator is the product of the standard deviations, $\\sqrt{2}\\times\\sqrt{2} = 2$.",
        },
        {
          text: "$0.12$",
          feedback: "You divided by $n$ twice: $\\frac{\\sum xy}{n} - \\bar{x}\\bar{y}$ is already the covariance $1.2$. Dividing it by $5$ again and then by $\\sigma_x\\sigma_y = 2$ gives $0.12$. The correct value is $\\frac{1.2}{2} = 0.6$.",
        },
      ],
      hint: "Find $\\bar{x}$, $\\bar{y}$, then $\\sigma_x^2 = \\frac{\\sum x^2}{n} - \\bar{x}^2$, and so on.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: the step-deviation method.** Board exams love realistic data with awkward numbers. Heights $x$ (cm) and weights $y$ (kg) of six students:",
    },
    {
      type: "table",
      headers: ["$x$ (cm)", "$y$ (kg)", "$u = \\frac{x - 165}{5}$", "$v = \\frac{y - 60}{2}$", "$u^2$", "$v^2$", "$uv$"],
      rows: [
        ["155", "52", "$-2$", "$-4$", "4", "16", "8"],
        ["160", "54", "$-1$", "$-3$", "1", "9", "3"],
        ["165", "62", "$0$", "$1$", "0", "1", "0"],
        ["165", "64", "$0$", "$2$", "0", "4", "0"],
        ["170", "62", "$1$", "$1$", "1", "1", "1"],
        ["175", "66", "$2$", "$3$", "4", "9", "6"],
        ["", "Totals", "$0$", "$0$", "10", "40", "18"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1: choose an assumed mean and a step.** Take $A = 165$, $h = 5$ for heights and $B = 60$, $k = 2$ for weights. The new numbers $u, v$ are small integers.\n\n**Step 2: the sums.** From the table, $\\sum u = 0$, $\\sum v = 0$, $\\sum u^2 = 10$, $\\sum v^2 = 40$, $\\sum uv = 18$, $n = 6$.\n\n**Step 3: the sums formula.** Multiply the covariance and variances by $n^2$ to clear fractions:",
    },
    {
      type: "math",
      latex:
        "r_{uv} = \\frac{n\\sum uv - \\sum u \\sum v}{\\sqrt{n\\sum u^2 - \\left(\\sum u\\right)^2}\\,\\sqrt{n\\sum v^2 - \\left(\\sum v\\right)^2}} = \\frac{6(18) - 0}{\\sqrt{60}\\,\\sqrt{240}} = \\frac{108}{120} = 0.9",
    },
    {
      type: "text",
      content:
        "**Step 4: go back to x and y.** $u$ and $v$ are shifts and positive rescalings of $x$ and $y$, so by Property 2 below, $r_{xy} = r_{uv} = 0.9$. There is nothing to convert back, which is the whole point of the method. (Here the assumed means happen to be the true means, so $\\sum u = \\sum v = 0$. They need not be; the formula handles any $A$ and $B$.)",
    },
    {
      type: "quiz",
      id: "st4-3-q6",
      variant: "practice",
      question:
        "For 5 pairs, with $u = \\frac{x - 170}{5}$ and $v = \\frac{y - 60}{2}$: $\\sum u = 5$, $\\sum v = 0$, $\\sum u^2 = 15$, $\\sum v^2 = 10$, $\\sum uv = 6$. Find $r_{xy}$.",
      options: [
        {
          text: "$0.6$",
          correct: true,
          feedback: "$n\\sum uv - \\sum u\\sum v = 30 - 0 = 30$; $n\\sum u^2 - (\\sum u)^2 = 75 - 25 = 50$; $n\\sum v^2 - (\\sum v)^2 = 50$. So $r_{uv} = \\frac{30}{\\sqrt{50}\\sqrt{50}} = 0.6$, and $r_{xy} = r_{uv}$.",
        },
        {
          text: "$\\approx 0.49$",
          feedback: "That is $\\frac{6}{\\sqrt{15 \\times 10}}$, which treats $\\sum u^2$ as if it were measured from the mean. Here $\\sum u = 5 \\ne 0$, so you must subtract $(\\sum u)^2$ in the sums formula.",
        },
        {
          text: "$1.5$",
          feedback: "You multiplied by $\\frac{h}{k} = \\frac{5}{2}$ to undo the scaling. $r$ is unchanged by change of origin and positive scale, so no conversion is needed, and $|r|$ can never exceed 1.",
        },
      ],
      hint: "Use $r = \\frac{n\\sum uv - \\sum u\\sum v}{\\sqrt{n\\sum u^2 - (\\sum u)^2}\\sqrt{n\\sum v^2 - (\\sum v)^2}}$ on $u, v$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (application): advertising and sales.** A shop tracks monthly advertising spend $x$ (₹ thousand) and sales $y$ (₹ lakh) for five months. Is the link strong?",
    },
    {
      type: "table",
      headers: ["$x$", "$y$", "$d_x = x - 6$", "$d_y = y - 7$", "$d_x^2$", "$d_y^2$", "$d_x d_y$"],
      rows: [
        ["2", "5", "$-4$", "$-2$", "16", "4", "8"],
        ["4", "7", "$-2$", "$0$", "4", "0", "0"],
        ["6", "6", "$0$", "$-1$", "0", "1", "0"],
        ["8", "8", "$2$", "$1$", "4", "1", "2"],
        ["10", "9", "$4$", "$2$", "16", "4", "8"],
        ["", "", "", "Totals", "40", "10", "18"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1: means.** $\\bar{x} = \\frac{30}{5} = 6$, $\\bar{y} = \\frac{35}{5} = 7$. Both are whole numbers, so the deviation method is the quickest. *Why this step:* when the means are integers, deviations stay small and there is no need for $\\sum x^2$ or $\\sum xy$.\n\n**Step 2: the three column totals.** $\\sum d_x^2 = 40$, $\\sum d_y^2 = 10$, $\\sum d_x d_y = 18$.\n\n**Step 3: combine.**",
    },
    {
      type: "math",
      latex: "r = \\frac{18}{\\sqrt{40}\\,\\sqrt{10}} = \\frac{18}{\\sqrt{400}} = \\frac{18}{20} = 0.9",
    },
    {
      type: "text",
      content:
        "**Step 4: interpret.** A strong positive linear association: months with more advertising had clearly higher sales. *Why this step:* a number without a sentence earns no marks. Note what $r$ does **not** say: it does not say advertising *caused* the sales (perhaps the shop advertised more during festival months, when sales rise anyway). That is the subject of 4.4.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam-style, CBSE): working backwards from r.** The coefficient of correlation between $x$ and $y$ is $0.4$, their covariance is $6$, and the variance of $x$ is $9$. Find the standard deviation of $y$.\n\n**Step 1: write the definition and fill in what is known.** $r = \\frac{\\operatorname{Cov}}{\\sigma_x\\sigma_y}$, so $0.4 = \\frac{6}{\\sigma_x \\sigma_y}$.\n\n**Step 2: variance to SD.** $\\sigma_x = \\sqrt{9} = 3$. *Why this step:* the formula uses standard deviations, and the question deliberately gives a variance. This is the most common slip.\n\n**Step 3: solve.** $0.4 = \\frac{6}{3\\sigma_y}$ gives $\\sigma_y = \\frac{6}{1.2} = 5$.\n\n**Step 4: check.** $r = \\frac{6}{3 \\times 5} = 0.4$. ✓",
    },
    {
      type: "quiz",
      id: "st4-3-q7",
      variant: "practice",
      question:
        "Find Pearson's $r$ for the pairs $(1, 6), (2, 10), (3, 8), (4, 14), (5, 12)$.",
      options: [
        {
          text: "$0.8$",
          correct: true,
          feedback: "$\\bar{x} = 3$, $\\bar{y} = 10$. $d_x = -2, -1, 0, 1, 2$ and $d_y = -4, 0, -2, 4, 2$, so $\\sum d_x^2 = 10$, $\\sum d_y^2 = 40$, $\\sum d_x d_y = 8 + 0 + 0 + 4 + 4 = 16$. $r = \\frac{16}{\\sqrt{400}} = 0.8$.",
        },
        {
          text: "$3.2$",
          feedback: "That is the covariance $\\frac{16}{5}$. Standardise it: divide by $\\sigma_x\\sigma_y = \\sqrt{2}\\times\\sqrt{8} = 4$.",
        },
        {
          text: "$0.64$",
          feedback: "That is $r^2 = 0.8^2$, the fraction of variation explained (4.7). The question asks for $r = \\frac{16}{\\sqrt{10}\\sqrt{40}} = \\frac{16}{20}$.",
        },
        {
          text: "$1.6$",
          feedback: "That is $\\frac{\\sum d_x d_y}{\\sum d_x^2}$, the regression slope (4.6), not $r$. The denominator for $r$ is $\\sqrt{\\sum d_x^2}\\sqrt{\\sum d_y^2}$.",
        },
      ],
      hint: "Both means are whole numbers; use deviations.",
    },
    {
      type: "quiz",
      id: "st4-3-q8",
      variant: "practice",
      question:
        "$r = 0.5$, $\\operatorname{Cov}(x, y) = 18$ and $\\operatorname{Var}(x) = 16$. Find $\\sigma_y$.",
      options: [
        {
          text: "$9$",
          correct: true,
          feedback: "$\\sigma_x = 4$, so $0.5 = \\frac{18}{4\\sigma_y}$ and $\\sigma_y = \\frac{18}{2} = 9$.",
        },
        {
          text: "$2.25$",
          feedback: "You used the variance $16$ in place of $\\sigma_x = 4$: $\\frac{18}{0.5 \\times 16}$.",
        },
        {
          text: "$4.5$",
          feedback: "You forgot the factor $r$: $\\frac{18}{4} = 4.5$. Solve $0.5 = \\frac{18}{4\\sigma_y}$.",
        },
        {
          text: "$81$",
          feedback: "That is the variance of $y$. The question asks for the standard deviation, $\\sqrt{81} = 9$.",
        },
      ],
      hint: "Convert the variance of $x$ to a standard deviation first.",
    },
    {
      type: "text",
      content:
        "**Why r lies between −1 and 1: a Cauchy–Schwarz sketch.** Write $d_x, d_y$ for the deviations. For *any* real number $t$, a sum of squares cannot be negative:",
    },
    {
      type: "math",
      latex: "0 \\le \\sum (t\\,d_x - d_y)^2 = t^2 \\sum d_x^2 - 2t\\sum d_x d_y + \\sum d_y^2",
    },
    {
      type: "text",
      content:
        "The right side is a quadratic in $t$ that is never negative, so it has at most one real root and its discriminant is $\\le 0$:",
    },
    {
      type: "math",
      latex:
        "4\\Big(\\sum d_x d_y\\Big)^2 - 4\\sum d_x^2 \\sum d_y^2 \\le 0 \\;\\Longrightarrow\\; r^2 = \\frac{\\left(\\sum d_x d_y\\right)^2}{\\sum d_x^2 \\sum d_y^2} \\le 1",
    },
    {
      type: "text",
      content:
        "Equality ($r = \\pm 1$) happens exactly when the quadratic touches zero, that is when $d_y = t\\,d_x$ for every point: all points lie on one straight line through $(\\bar{x}, \\bar{y})$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Properties of r",
      content:
        "1. **Unit-free**, and symmetric: $r_{xy} = r_{yx}$.\n2. **Unchanged by change of origin and positive scale.** If $u = \\frac{x - a}{h}$ and $v = \\frac{y - b}{k}$, then $r_{uv} = r_{xy}$ when $h, k$ have the same sign and $r_{uv} = -r_{xy}$ when they have opposite signs. (Covariance gains the factor $\\frac{1}{hk}$; the SDs gain $\\frac{1}{|h||k|}$.)\n3. $-1 \\le r \\le 1$, with $\\pm 1$ only for a perfect straight line.\n4. Measures **linear** association only.",
    },
    {
      type: "quiz",
      id: "st4-3-q2",
      variant: "practice",
      question:
        "$r_{xy} = 0.6$. Let $u = 2x + 3$ and $v = 1 - \\frac{y}{4}$. What is $r_{uv}$?",
      options: [
        {
          text: "$-0.6$",
          correct: true,
          feedback: "The scale factors are $2$ (positive) and $-\\frac{1}{4}$ (negative). Opposite signs flip the sign of $r$; the size is unchanged.",
        },
        {
          text: "$0.6$",
          feedback: "Shifts and positive scalings leave $r$ alone, but $v$ uses a *negative* multiple of $y$, which reverses the direction.",
        },
        {
          text: "$-0.3$",
          feedback: "The magnitude of $r$ never changes under linear transformations; the factors $2$ and $\\frac{1}{4}$ cancel in the standardisation.",
        },
      ],
    },
    {
      type: "text",
      content:
        "Now back to the parabola from 4.1. Seven points exactly on $y = x^2$, with $\\bar{x} = 0$. Each point $(x, x^2)$ has a mirror point $(-x, x^2)$ whose rectangle has the same area and the opposite sign, so the sum cancels: $\\operatorname{Cov} = 0$ and $r = 0$.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-scatter-regression",
        points: PARABOLA,
        window: PARABOLA_WINDOW,
        showCoDeviation: true,
        stats: ["cov", "r"],
        caption:
          "Mirror-image rectangles cancel in pairs, so r = 0 exactly, for a perfect relationship. Drag one point off the curve and r moves away from 0.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: r = 0 means no relationship",
      content:
        "$r = 0$ means **no linear** relationship. The parabola is perfectly determined by $x$ and still has $r = 0$. Before you conclude \"unrelated\", look at the scatter plot.",
    },
    {
      type: "quiz",
      id: "st4-3-q3",
      variant: "concept",
      question:
        "For some paired data $r = 0$. Which statement must be true?",
      options: [
        {
          text: "There is no linear trend; the variables might still be strongly related along a curve.",
          correct: true,
          feedback: "Exactly. $y = x^2$ on symmetric $x$ values is a perfect relationship with $r = 0$.",
        },
        {
          text: "The variables are unrelated: knowing $x$ tells you nothing about $y$.",
          feedback: "The parabola is the counterexample. Knowing $x$ gives $y$ exactly, yet $r = 0$.",
        },
        {
          text: "All points lie on a horizontal line.",
          feedback: "Not so. On a horizontal line $\\sigma_y = 0$, so $r$ is undefined ($\\frac{0}{0}$), not $0$. And $r = 0$ also happens for round blobs and symmetric curves like the parabola.",
        },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: r = 0.8 means 80% of the points lie on the line",
      content:
        "$r$ is not a percentage of anything. With $r = 0.8$ it is quite possible that *no* point lies exactly on any line; our five-point example has $r = 0.8$ and none of its points is on the best-fitting line $\\hat{y} = 1.6 + 0.8x$ (4.6). The closest percentage-style reading is $r^2 = 0.64$, the fraction of the *variation* in $y$ accounted for by the line (4.7).",
    },
    {
      type: "quiz",
      id: "st4-3-q4",
      variant: "concept",
      question: "A report says the correlation between two exam scores is $r = 0.8$. Which interpretation is correct?",
      options: [
        {
          text: "There is a strong positive linear association; the points form a clear rising band, not necessarily touching a line.",
          correct: true,
          feedback: "Yes. $r$ describes how tightly the cloud hugs a line, not how many points are on it.",
        },
        {
          text: "80% of the students have points exactly on the regression line.",
          feedback: "$r$ counts nothing. You can have $r = 0.8$ with no point on the line at all.",
        },
        {
          text: "80% of the variation in one score is explained by the other.",
          feedback: "That is the reading of $r^2$, which here is $0.64$, i.e. 64%.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-3-q5",
      variant: "practice",
      question: "Which value of $r$ indicates the *strongest* linear association?",
      options: [
        {
          text: "$-0.92$",
          correct: true,
          feedback: "Strength is $|r|$. $|-0.92| = 0.92$ is the largest; the minus sign only says the trend falls.",
        },
        { text: "$0.85$", feedback: "$0.85 < 0.92$. The sign of $r$ is direction, not strength." },
        { text: "$0$", feedback: "$r = 0$ means no linear association at all." },
        { text: "$1.3$", feedback: "Impossible: $|r| \\le 1$ always (Cauchy–Schwarz)." },
      ],
    },
  ]),
};

// ---------------------------------------------------------------------------
// 4.4 Correlation is not causation
// ---------------------------------------------------------------------------

const CLUSTER_PLUS_ONE = [
  { x: 1, y: 3 },
  { x: 2, y: 5 },
  { x: 3, y: 2 },
  { x: 4, y: 4 },
  { x: 5, y: 3 },
  { x: 2, y: 2 },
  { x: 4, y: 5 },
  { x: 3, y: 4 },
  { x: 12, y: 12 },
];

const lesson04: LessonSeed = {
  slug: "correlation-is-not-causation",
  title: "4.4 · Correlation Is Not Causation",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Across the months of a year in a coastal city, ice-cream sales and the number of drownings have a strong positive correlation. Should the city ban ice cream to save swimmers?",
    },
    {
      type: "text",
      content:
        "Of course not. Both are driven by a third thing: **hot weather**. Hot months bring more ice-cream buyers *and* more swimmers. Ice cream and drowning move together because they share a cause, not because one causes the other.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Lurking (confounding) variable",
      content:
        "A variable not included in the analysis that influences both $x$ and $y$, creating an association between them. Temperature is the lurking variable behind ice cream and drowning.",
    },
    {
      type: "text",
      content:
        "A strong $r$ between $x$ and $y$ can arise in four quite different ways. Causation is only one of them.",
    },
    {
      type: "table",
      headers: ["Explanation", "Structure", "Example"],
      rows: [
        ["Causation", "$x \\to y$", "More fertiliser, higher yield (within limits), shown by controlled experiments"],
        ["Lurking variable", "$z \\to x$ and $z \\to y$", "Shoe size and reading ability of schoolchildren: both grow with **age**"],
        ["Reverse causation", "$y \\to x$", "Cities with more police have more crime: high crime leads cities to hire police"],
        ["Coincidence", "no link", "Two unrelated series that both rose over the same decade"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Among children aged 5 to 12, shoe size and reading score have $r \\approx 0.8$. Would bigger shoes improve reading? No. Older children have bigger feet *and* more years of reading practice. If you compared only children of the *same age*, the correlation would largely disappear. Holding the lurking variable fixed is the standard test.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Hospitals with more doctors per patient record more deaths per patient. Severity of illness is the lurking variable: the sickest patients are sent to the best-staffed hospitals, so severity raises both staffing and deaths. More doctors do not cause deaths.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: correlation implies causation",
      content:
        "Correlation measures how two variables move *together* in the data you have. It says nothing about *why*. Evidence for causation needs a controlled, randomised experiment, or at least careful control of plausible lurking variables, plus a believable mechanism.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (routine): the four-question checklist.** A survey finds that students who eat breakfast every day score higher in board exams ($r = 0.4$ between breakfast days per week and marks). A headline says \"Breakfast boosts marks\". Test the claim.\n\n**Q1. Is there a lurking variable?** Families with regular routines (and often more income) are more likely to serve breakfast *and* to support study habits, tuition and sleep. Plausible. *Why this step:* this is the most common alternative, so check it first.\n\n**Q2. Could causation run backwards?** Could high marks make a student eat breakfast? Unlikely here, but always ask; in other examples (police and crime) it is the answer.\n\n**Q3. Could it be coincidence?** With $r = 0.4$ from a large survey, chance alone is an unlikely explanation.\n\n**Q4. Was it an experiment?** No: nobody *assigned* breakfast. It is observational, so lurking variables were not controlled.\n\n**Verdict:** the data show an association, not an effect. A fair headline: \"Students who eat breakfast tend to score higher\". To test the causal claim, randomly assign a school breakfast programme to some classes and compare.",
    },
    {
      type: "quiz",
      id: "st4-4-q1",
      variant: "concept",
      question:
        "In a survey of Indian districts, the number of mobile phones per 100 people is strongly correlated with life expectancy ($r = 0.85$). A news report says \"phones make people live longer\". The best criticism is:",
      options: [
        {
          text: "A lurking variable such as district income could raise both phone ownership and life expectancy.",
          correct: true,
          feedback: "Wealthier districts can afford more phones *and* better food, water and healthcare. Correlation cannot separate these.",
        },
        {
          text: "$r = 0.85$ is too weak to say anything; only $r = 1$ proves causation.",
          feedback: "Even $r = 1$ would not prove causation. The problem is not the size of $r$ but what else could produce it.",
        },
        {
          text: "The report is right: a strong positive correlation shows phones cause longer life.",
          feedback: "That is exactly the error. Correlation shows association, not a cause-and-effect direction.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-4-q2",
      variant: "practice",
      question:
        "Across many fires, the number of fire engines sent is positively correlated with the amount of damage. What best explains this?",
      options: [
        {
          text: "The size of the fire: bigger fires cause more damage and also get more engines sent.",
          correct: true,
          feedback: "Fire size is the lurking variable: it drives both the damage and the dispatcher's decision to send more engines.",
        },
        {
          text: "Fire engines cause damage, so fewer should be sent.",
          feedback: "That reads causation into correlation, in the wrong direction.",
        },
        {
          text: "It must be coincidence, because engines and damage are unrelated.",
          feedback: "They are related, through the size of the fire. Coincidence is not needed.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-4-q6",
      variant: "practice",
      question:
        "In a school, students who attend extra coaching classes have *lower* average marks than those who do not. Which explanation fits best?",
      options: [
        {
          text: "Reverse causation: students who are already struggling are the ones sent to coaching.",
          correct: true,
          feedback: "Low marks lead to coaching, not the other way round. Run the checklist: Q2 (could $y$ drive $x$?) is the answer here.",
        },
        {
          text: "Coaching causes students to score lower.",
          feedback: "That reads a cause into observational data, and ignores why students join coaching in the first place.",
        },
        {
          text: "Coincidence: coaching and marks are unrelated.",
          feedback: "There is a clear reason for the link, through who chooses coaching. No coincidence is needed.",
        },
      ],
      hint: "Ask which comes first: the low marks or the coaching.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam-style, numerical): watching a lurking variable create r.** Foot length $x$ (cm) and reading score $y$ for six children, three aged 6 and three aged 11:",
    },
    {
      type: "table",
      headers: ["Group", "Pairs $(x, y)$", "Means", "$r$ within group"],
      rows: [
        ["Age 6", "$(15, 21), (16, 18), (17, 21)$", "$\\bar{x} = 16$, $\\bar{y} = 20$", "$0$"],
        ["Age 11", "$(21, 41), (22, 38), (23, 41)$", "$\\bar{x} = 22$, $\\bar{y} = 40$", "$0$"],
        ["All six", "pooled", "$\\bar{x} = 19$, $\\bar{y} = 30$", "$\\approx 0.96$"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1: within each age group.** In the age-6 group the deviations are $d_x = -1, 0, 1$ and $d_y = 1, -2, 1$, so $\\sum d_x d_y = -1 + 0 + 1 = 0$ and $r = 0$. The age-11 group has the same pattern. *Why this step:* holding the lurking variable (age) fixed is the standard test; if the link vanishes, age was doing the work.\n\n**Step 2: pool all six.** $\\bar{x} = \\frac{114}{6} = 19$, $\\bar{y} = \\frac{180}{6} = 30$. Now $d_x = -4, -3, -2, 2, 3, 4$ and $d_y = -9, -12, -9, 11, 8, 11$.\n\n**Step 3: the sums.** $\\sum d_x d_y = 36 + 36 + 18 + 22 + 24 + 44 = 180$, $\\sum d_x^2 = 58$, $\\sum d_y^2 = 612$.",
    },
    {
      type: "math",
      latex: "r = \\frac{180}{\\sqrt{58}\\,\\sqrt{612}} = \\frac{180}{\\sqrt{35\\,496}} \\approx \\frac{180}{188.4} \\approx 0.96",
    },
    {
      type: "text",
      content:
        "**Step 4: read the result.** Inside each age group, foot length tells you nothing about reading. The strong pooled $r$ comes entirely from the *gap between the groups*: older children sit top-right, younger ones bottom-left. Every point's rectangle is positive because of which group it belongs to. That is exactly what a lurking variable looks like in numbers.",
    },
    {
      type: "quiz",
      id: "st4-4-q7",
      variant: "concept",
      question:
        "Data on fertiliser used and crop yield come from two districts. Within district A, $r \\approx 0.05$; within district B, $r \\approx 0.02$. Pooled together, $r = 0.85$. District B has both more fertiliser use and much better irrigation. What is the most reasonable conclusion?",
      options: [
        {
          text: "The pooled correlation mainly reflects the difference between districts (such as irrigation), not an effect of fertiliser.",
          correct: true,
          feedback: "Within each district the link is almost nil. The pooled $r$ is created by B sitting top-right and A bottom-left, just like the age groups above.",
        },
        {
          text: "Fertiliser strongly raises yield, since the pooled $r = 0.85$.",
          feedback: "The within-district correlations say otherwise. Pooling across a lurking variable manufactured the high $r$.",
        },
        {
          text: "The data must contain an error, because pooling cannot raise $r$ above both group values.",
          feedback: "It can, and it happens often: two clusters placed diagonally create large positive rectangles for every point.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Influential points.** Because $r$ is built from rectangle *areas*, a single point far from the rest makes a huge rectangle and can dominate the sum. Below, eight points form a shapeless cluster ($r \\approx 0.18$ on its own). One extra point at $(12, 12)$, far out along the diagonal, lifts $r$ to about $0.89$. Drag that point down to $(12, 1)$ and watch $r$ swing the other way.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-scatter-regression",
        points: CLUSTER_PLUS_ONE,
        window: { xmin: 0, xmax: 14, ymin: 0, ymax: 14 },
        showCoDeviation: true,
        stats: ["r"],
        caption:
          "The lone point at (12, 12) owns one giant green rectangle. Delete it and r falls from about 0.89 to about 0.18.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      title: "Always report an influential point",
      content:
        "Recompute $r$ with and without the suspect point. If the conclusion changes, say so. Never silently delete a point just because it is inconvenient; find out *why* it is different.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (application): measuring one point's influence.** Four shops report staff count $x$ and daily customers $y$ (in hundreds): $(1, 2), (2, 1), (3, 3), (4, 2)$. A large supermarket $(10, 10)$ is then added.\n\n**Step 1: without the supermarket.** $\\bar{x} = 2.5$, $\\bar{y} = 2$. $d_x = -1.5, -0.5, 0.5, 1.5$ and $d_y = 0, -1, 1, 0$, so $\\sum d_x d_y = 0 + 0.5 + 0.5 + 0 = 1$, $\\sum d_x^2 = 5$, $\\sum d_y^2 = 2$. Then $r = \\frac{1}{\\sqrt{10}} \\approx 0.32$: weak.\n\n**Step 2: with it.** Now $n = 5$, $\\bar{x} = 4$, $\\bar{y} = 3.6$. $d_x = -3, -2, -1, 0, 6$ and $d_y = -1.6, -2.6, -0.6, -1.6, 6.4$.\n\n- $\\sum d_x d_y = 4.8 + 5.2 + 0.6 + 0 + 38.4 = 49$\n- $\\sum d_x^2 = 9 + 4 + 1 + 0 + 36 = 50$\n- $\\sum d_y^2 = 2.56 + 6.76 + 0.36 + 2.56 + 40.96 = 53.2$\n\nSo $r = \\frac{49}{\\sqrt{50 \\times 53.2}} = \\frac{49}{\\sqrt{2660}} \\approx \\frac{49}{51.6} \\approx 0.95$.\n\n**Step 3: find the culprit.** The supermarket's rectangle alone is $6 \\times 6.4 = 38.4$ out of $49$, about 78% of the total. *Why this step:* looking at each point's share of $\\sum d_x d_y$ shows *where* the correlation comes from. Here one point that belongs to a different kind of business manufactures most of it.\n\n**Step 4: report.** \"$r \\approx 0.32$ for the four small shops; $r \\approx 0.95$ when the supermarket is included, almost entirely because of that one store.\"",
    },
    {
      type: "quiz",
      id: "st4-4-q8",
      variant: "practice",
      question:
        "For 6 points, $\\sum d_x d_y = 40$. One of the points has $d_x = 5$ and $d_y = 6$. What share of $\\sum d_x d_y$ does that single point contribute, and what does this suggest?",
      options: [
        {
          text: "$75\\%$; it is an influential point, so report $r$ with and without it.",
          correct: true,
          feedback: "Its rectangle is $5 \\times 6 = 30$, and $\\frac{30}{40} = 75\\%$. One point carrying most of the co-deviation is the signature of an influential point.",
        },
        {
          text: "$\\frac{1}{6} \\approx 17\\%$; every point contributes equally.",
          feedback: "Points contribute according to the *area* of their rectangle, not equally. This one's area is $30$ out of $40$.",
        },
        {
          text: "$27.5\\%$; it is a normal point.",
          feedback: "You may have added $d_x + d_y = 11$. The contribution is the product $d_x d_y = 30$.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Restricted range.** The study-hours data have $r \\approx 0.95$ over 1 to 8 hours. Keep only the students who studied 3 to 6 hours and $r$ drops to about $0.87$: with a narrow spread of $x$, the random scatter in $y$ becomes relatively larger. This is why entrance-exam scores often correlate only weakly with later grades *among admitted students*: the low scorers were never admitted, so the range is restricted.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-scatter-regression",
        points: STUDY.filter((p) => p.x >= 3 && p.x <= 6),
        window: { xmin: 2, xmax: 7, ymin: 20, ymax: 100 },
        xLabel: "Hours studied",
        yLabel: "Marks",
        stats: ["r"],
        caption:
          "Only the 3–6 hour students: r drops to about 0.87. Compare with r ≈ 0.95 for all ten in 4.3.",
      },
    },
    {
      type: "quiz",
      id: "st4-4-q3",
      variant: "concept",
      question:
        "A college finds that, among its admitted students, entrance-test score and first-year grade have $r = 0.2$. Which conclusion is most justified?",
      options: [
        {
          text: "The weak $r$ may partly reflect restricted range, since only high scorers were admitted; the test may predict better across all applicants.",
          correct: true,
          feedback: "Right. Cutting off the low end of $x$ usually lowers $r$, so this sample understates the full relationship.",
        },
        {
          text: "The test is useless for predicting grades, so it should be dropped.",
          feedback: "That ignores restricted range. The students who would have done badly were never in the data.",
        },
        {
          text: "High test scores cause low grades.",
          feedback: "$r = 0.2$ is positive, and correlation would not show causation anyway.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-4-q4",
      variant: "practice",
      question:
        "A scatter plot of 20 points has $r = 0.05$. Adding one point far to the upper right raises $r$ to $0.7$. That new point is best described as:",
      options: [
        {
          text: "An influential point: on its own it creates most of the correlation.",
          correct: true,
          feedback: "One huge co-deviation rectangle is doing all the work. Report $r$ with and without it.",
        },
        {
          text: "Proof that the variables are strongly related.",
          feedback: "Twenty points showed no trend. One point cannot establish a relationship on its own.",
        },
        {
          text: "Irrelevant, because one point cannot change $r$ much.",
          feedback: "It changed $r$ from $0.05$ to $0.7$. Points far from $(\\bar{x}, \\bar{y})$ have enormous leverage.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-4-q5",
      variant: "concept",
      question:
        "Which study design could best show that a new teaching method *causes* higher marks?",
      options: [
        {
          text: "Randomly assign students to the new or old method, then compare marks.",
          correct: true,
          feedback: "Random assignment balances lurking variables (ability, motivation, family support) between the groups, so a difference can be credited to the method.",
        },
        {
          text: "Find schools that already use the new method and correlate its use with marks.",
          feedback: "Schools that choose new methods may differ in funding or intake. That is observational, open to lurking variables.",
        },
        {
          text: "Compute $r$ between hours of the new method and marks; if $r > 0.9$, it causes improvement.",
          feedback: "No value of $r$ turns association into causation.",
        },
      ],
    },
  ]),
};

// ---------------------------------------------------------------------------
// 4.5 Rank correlation
// ---------------------------------------------------------------------------

const CUBE = [
  { x: 1, y: 1 },
  { x: 2, y: 8 },
  { x: 3, y: 27 },
  { x: 4, y: 64 },
  { x: 5, y: 125 },
];

const lesson05: LessonSeed = {
  slug: "rank-correlation",
  title: "4.5 · Rank Correlation",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two judges at a school singing contest each put six contestants in order, 1 for best. They never give scores, only positions. Do the judges broadly agree? There are no measurements to feed into Pearson's formula, only **ranks**. Charles Spearman's idea: *correlate the ranks themselves*.",
    },
    {
      type: "table",
      headers: ["Contestant", "A", "B", "C", "D", "E", "F"],
      rows: [
        ["Judge 1 rank $u$", "1", "2", "3", "4", "5", "6"],
        ["Judge 2 rank $v$", "2", "1", "4", "3", "6", "5"],
        ["$d = u - v$", "$-1$", "$1$", "$-1$", "$1$", "$-1$", "$1$"],
        ["$d^2$", "1", "1", "1", "1", "1", "1"],
      ],
    },
    {
      type: "text",
      content:
        "The judges swap neighbours in three places but agree on the overall order. The differences $d$ are small, so agreement is high. When the judges agree perfectly every $d = 0$; when they disagree, $\\sum d^2$ grows. We need to turn $\\sum d^2$ into a number on the $-1$ to $1$ scale.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Spearman's rank correlation coefficient",
      content:
        "For $n$ individuals ranked $1, \\dots, n$ on two criteria, with $d_i$ the difference in ranks, Spearman's $\\rho$ is given below. $\\rho = 1$ for identical rankings, $\\rho = -1$ for exactly reversed rankings.",
    },
    {
      type: "math",
      latex: "\\rho = 1 - \\frac{6\\sum d_i^2}{n(n^2 - 1)}",
    },
    {
      type: "text",
      content:
        "For the judges: $\\sum d^2 = 6$ and $n = 6$, so $\\rho = 1 - \\frac{6 \\times 6}{6 \\times 35} = 1 - \\frac{36}{210} = \\frac{29}{35} \\approx 0.83$. Strong agreement.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (routine): from raw marks to ρ.** Seven students' marks in Maths and Science. Find the rank correlation.",
    },
    {
      type: "table",
      headers: ["Student", "A", "B", "C", "D", "E", "F", "G"],
      rows: [
        ["Maths", "78", "65", "90", "55", "70", "82", "60"],
        ["Science", "72", "60", "85", "58", "75", "80", "50"],
        ["Rank $u$ (Maths)", "3", "5", "1", "7", "4", "2", "6"],
        ["Rank $v$ (Science)", "4", "5", "1", "6", "3", "2", "7"],
        ["$d = u - v$", "$-1$", "0", "0", "1", "1", "0", "$-1$"],
        ["$d^2$", "1", "0", "0", "1", "1", "0", "1"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1: rank each subject separately**, 1 for the highest. Maths in order: $90, 82, 78, 70, 65, 60, 55$, so C is 1, F is 2, A is 3, and so on. *Why this step:* Spearman uses only order, so the raw marks are replaced by positions within their own column.\n\n**Step 2: differences.** $d = u - v$ for each student. Check: $\\sum d = -1 + 0 + 0 + 1 + 1 + 0 - 1 = 0$. *Why:* both columns are the numbers 1 to 7, so the differences must sum to zero; if they do not, a rank is wrong.\n\n**Step 3: substitute.** $\\sum d^2 = 4$, $n = 7$, $n(n^2 - 1) = 7 \\times 48 = 336$.",
    },
    {
      type: "math",
      latex: "\\rho = 1 - \\frac{6 \\times 4}{336} = 1 - \\frac{24}{336} = 1 - \\frac{1}{14} = \\frac{13}{14} \\approx 0.93",
    },
    {
      type: "text",
      content:
        "**Step 4: interpret.** Very strong agreement: students who rank high in Maths tend to rank high in Science.",
    },
    {
      type: "quiz",
      id: "st4-5-q7",
      variant: "practice",
      question:
        "Five products are scored by two testers. Tester X: $10, 20, 30, 40, 50$. Tester Y (same products, same order): $12, 30, 18, 40, 35$. Find Spearman's $\\rho$.",
      options: [
        {
          text: "$0.8$",
          correct: true,
          feedback: "Ranks (1 = highest): X gives $5, 4, 3, 2, 1$; Y gives $5, 3, 4, 1, 2$. $d = 0, 1, -1, 1, -1$, $\\sum d^2 = 4$, so $\\rho = 1 - \\frac{24}{120} = 0.8$.",
        },
        {
          text: "$0.2$",
          feedback: "That is the fraction $\\frac{6\\sum d^2}{n(n^2-1)} = \\frac{24}{120}$. Subtract it from 1.",
        },
        {
          text: "$\\approx 0.97$",
          feedback: "You left out the 6: $1 - \\frac{4}{120}$. The formula is $1 - \\frac{6\\sum d^2}{n(n^2-1)}$.",
        },
        {
          text: "$-0.8$",
          feedback: "Both testers give high scores to the same products, so agreement is positive. Rank both columns in the same direction.",
        },
      ],
      hint: "Rank each tester's scores separately, then tabulate $d$ and $d^2$. Here $n(n^2 - 1) = 120$.",
    },
    {
      type: "text",
      content:
        "**Where the formula comes from: it is Pearson's r on the ranks.** Each set of ranks is just $1, 2, \\dots, n$ in some order, so both have the same mean and variance:",
    },
    {
      type: "math",
      latex:
        "\\bar{u} = \\bar{v} = \\frac{n + 1}{2}, \\qquad \\sum (u - \\bar{u})^2 = \\sum (v - \\bar{v})^2 = \\frac{n(n^2 - 1)}{12}",
    },
    {
      type: "text",
      content:
        "(The second comes from $\\sum k^2 - n\\left(\\frac{n+1}{2}\\right)^2 = \\frac{n(n+1)(2n+1)}{6} - \\frac{n(n+1)^2}{4} = \\frac{n(n^2 - 1)}{12}$.) Since the means are equal, $d = u - v = (u - \\bar{u}) - (v - \\bar{v})$. Square and sum:",
    },
    {
      type: "math",
      latex:
        "\\sum d^2 = \\sum (u - \\bar{u})^2 + \\sum (v - \\bar{v})^2 - 2\\sum (u - \\bar{u})(v - \\bar{v}) = \\frac{n(n^2-1)}{6} - 2\\sum (u - \\bar{u})(v - \\bar{v})",
    },
    {
      type: "text",
      content:
        "Solve for the co-deviation sum and divide by $\\sqrt{\\sum (u-\\bar u)^2}\\sqrt{\\sum (v-\\bar v)^2} = \\frac{n(n^2-1)}{12}$:",
    },
    {
      type: "math",
      latex:
        "r_{\\text{ranks}} = \\frac{\\frac{n(n^2-1)}{12} - \\frac{1}{2}\\sum d^2}{\\frac{n(n^2-1)}{12}} = 1 - \\frac{6\\sum d^2}{n(n^2 - 1)} = \\rho",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: Spearman's coefficient is a different kind of correlation, unrelated to r",
      content:
        "Spearman's $\\rho$ *is* Pearson's $r$, computed on ranks instead of raw values. The formula with $\\sum d^2$ is just a shortcut that works because ranks $1, \\dots, n$ have a known mean and variance. Everything you know about $r$ (between $-1$ and $1$, sign gives direction) carries over.",
    },
    {
      type: "quiz",
      id: "st4-5-q1",
      variant: "concept",
      question: "What is the relationship between Spearman's $\\rho$ and Pearson's $r$?",
      options: [
        {
          text: "$\\rho$ is Pearson's $r$ applied to the ranks of the data (exactly so when there are no ties).",
          correct: true,
          feedback: "Right. The $6\\sum d^2$ formula is an algebraic shortcut for $r$ on ranks $1, \\dots, n$.",
        },
        {
          text: "They are unrelated measures that happen to share the range $-1$ to $1$.",
          feedback: "The derivation above turns Pearson's formula on ranks directly into Spearman's.",
        },
        {
          text: "$\\rho = r^2$ always.",
          feedback: "No; $\\rho$ can be negative and need not equal $r^2$. They are different computations on different inputs (ranks vs values).",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-5-q2",
      variant: "practice",
      question: "Ten students are ranked in Maths and in Physics. $\\sum d^2 = 33$. Find $\\rho$.",
      options: [
        {
          text: "$0.8$",
          correct: true,
          feedback: "$\\rho = 1 - \\frac{6 \\times 33}{10 \\times 99} = 1 - \\frac{198}{990} = 1 - 0.2 = 0.8$.",
        },
        {
          text: "$0.2$",
          feedback: "$0.2$ is the fraction $\\frac{6\\sum d^2}{n(n^2-1)}$. Subtract it from 1.",
        },
        {
          text: "$0.97$",
          feedback: "You left out the 6: $1 - \\frac{33}{990} \\approx 0.97$. The formula is $1 - \\frac{6\\sum d^2}{n(n^2-1)}$.",
        },
      ],
      hint: "$n(n^2 - 1) = 10 \\times 99$.",
    },
    {
      type: "quiz",
      id: "st4-5-q3",
      variant: "practice",
      question:
        "Two judges rank 7 dancers in exactly opposite orders (first becomes last, and so on). What is $\\sum d^2$ and $\\rho$?",
      options: [
        {
          text: "$\\sum d^2 = 112$, $\\rho = -1$",
          correct: true,
          feedback: "$d = -6, -4, -2, 0, 2, 4, 6$, so $\\sum d^2 = 36+16+4+0+4+16+36 = 112$, and $\\rho = 1 - \\frac{672}{336} = -1$.",
        },
        {
          text: "$\\sum d^2 = 0$, $\\rho = 1$",
          feedback: "That is complete agreement. Reversed rankings give the largest possible $\\sum d^2$.",
        },
        {
          text: "$\\sum d^2 = 56$, $\\rho = 0$",
          feedback: "$\\rho = 0$ would be no association. Reversal is perfect *negative* association. Recompute $\\sum d^2$ from $d = -6, -4, \\dots, 6$.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 2 (application): a negative ρ.** A consumer magazine ranks six phone models by price (1 = most expensive) and by battery life (1 = longest).",
    },
    {
      type: "table",
      headers: ["Model", "P", "Q", "R", "S", "T", "U"],
      rows: [
        ["Price rank $u$", "1", "2", "3", "4", "5", "6"],
        ["Battery rank $v$", "5", "6", "3", "4", "1", "2"],
        ["$d$", "$-4$", "$-4$", "0", "0", "4", "4"],
        ["$d^2$", "16", "16", "0", "0", "16", "16"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1.** $\\sum d = 0$ (check passed) and $\\sum d^2 = 64$.\n\n**Step 2.** $n(n^2 - 1) = 6 \\times 35 = 210$, so $\\rho = 1 - \\frac{6 \\times 64}{210} = 1 - \\frac{384}{210} = -\\frac{174}{210} = -\\frac{29}{35} \\approx -0.83$.\n\n*Why the answer can be negative:* $\\frac{6\\sum d^2}{n(n^2-1)}$ exceeds 1 whenever the rankings disagree more than chance would suggest. The largest possible value, for fully reversed rankings, is exactly 2, giving $\\rho = -1$.\n\n**Step 3: interpret.** Strong negative rank correlation: in this group, the pricier phones tend to have *shorter* battery life (perhaps because they spend power on bigger, brighter screens).",
    },
    {
      type: "text",
      content:
        "**Tied ranks.** When raw values are tied, give each tied value the *average* of the positions they occupy. Marks $70, 60, 50, 50, 40$ (rank 1 = highest) occupy positions 1 to 5; the two 50s share positions 3 and 4, so each gets rank $3.5$, and the 40 still gets rank 5.",
    },
    {
      type: "text",
      content:
        "The shortcut formula assumed ranks are exactly $1, \\dots, n$, which ties break. The standard fix in board exams is to add a **correction factor** $\\frac{m(m^2 - 1)}{12}$ to $\\sum d^2$ for every group of $m$ tied values:",
    },
    {
      type: "math",
      latex: "\\rho = 1 - \\frac{6\\left[\\sum d^2 + \\sum \\frac{m(m^2 - 1)}{12}\\right]}{n(n^2 - 1)}",
    },
    {
      type: "text",
      content:
        "**Worked example (ties).** Five students' marks in two tests:",
    },
    {
      type: "table",
      headers: ["Student", "P", "Q", "R", "S", "T"],
      rows: [
        ["Test 1 marks", "40", "50", "50", "60", "70"],
        ["Test 2 marks", "30", "45", "55", "50", "65"],
        ["Rank $u$ (Test 1)", "5", "3.5", "3.5", "2", "1"],
        ["Rank $v$ (Test 2)", "5", "4", "2", "3", "1"],
        ["$d$", "0", "$-0.5$", "$1.5$", "$-1$", "0"],
        ["$d^2$", "0", "0.25", "2.25", "1", "0"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1.** $\\sum d^2 = 3.5$.\n\n**Step 2.** One tie of $m = 2$ values: correction $\\frac{2(4 - 1)}{12} = 0.5$.\n\n**Step 3.** $\\rho = 1 - \\frac{6(3.5 + 0.5)}{5 \\times 24} = 1 - \\frac{24}{120} = 0.8$.\n\n(Without the correction you would get $1 - \\frac{21}{120} = 0.825$; Pearson's $r$ on the average ranks is about $0.82$. With ties all three are close, and exam questions expect the corrected version.)",
    },
    {
      type: "quiz",
      id: "st4-5-q4",
      variant: "practice",
      question:
        "Scores $92, 85, 85, 85, 70$ are ranked with 1 for the highest. What rank does each 85 receive, and what correction factor does this tie add to $\\sum d^2$?",
      options: [
        {
          text: "Rank 3 each; correction $\\frac{3(9 - 1)}{12} = 2$.",
          correct: true,
          feedback: "The three 85s occupy positions 2, 3, 4, whose average is 3. With $m = 3$, the correction is $\\frac{3 \\times 8}{12} = 2$.",
        },
        {
          text: "Rank 2 each; correction $0.5$.",
          feedback: "Giving all three the top shared position overstates them. Average the positions 2, 3, 4. And $0.5$ is the correction for $m = 2$.",
        },
        {
          text: "Rank 3 each; no correction needed because the ranks were averaged.",
          feedback: "Averaging fixes the ranks, but the $\\sum d^2$ shortcut still needs the $\\frac{m(m^2-1)}{12}$ correction.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-5-q6",
      variant: "practice",
      question:
        "Spearman's $\\rho$ for 10 pairs of ranks was computed as $0.5$. Later it was found that one difference $d = 3$ had been wrongly recorded as $7$. Find the correct $\\rho$.",
      options: [
        {
          text: "$\\approx 0.742$",
          correct: true,
          feedback: "From $0.5 = 1 - \\frac{6\\sum d^2}{990}$, the wrong $\\sum d^2 = 82.5$. Correct it: $82.5 - 7^2 + 3^2 = 42.5$. Then $\\rho = 1 - \\frac{6 \\times 42.5}{990} = 1 - \\frac{255}{990} \\approx 0.742$.",
        },
        {
          text: "$\\approx 0.524$",
          feedback: "You corrected $\\sum d^2$ by $d$ instead of $d^2$: $82.5 - 7 + 3 = 78.5$. The sum is of *squares*, so remove $49$ and add $9$.",
        },
        {
          text: "$\\approx 0.258$",
          feedback: "That is $\\frac{255}{990}$, the fraction you subtract. $\\rho = 1 - 0.258 \\approx 0.742$.",
        },
        {
          text: "$0.5$",
          feedback: "A miscopied $d$ changes $\\sum d^2$, so $\\rho$ must change. Recover $\\sum d^2 = 82.5$ from the wrong $\\rho$ first.",
        },
      ],
      hint: "Work backwards from $\\rho = 0.5$ to the wrong $\\sum d^2$, then swap $7^2$ for $3^2$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (exam-style): find the number of individuals.** The rank correlation between two judges' rankings is $\\frac{2}{3}$ and $\\sum d^2 = 55$. How many contestants were there?\n\n**Step 1: substitute what is known.** $\\frac{2}{3} = 1 - \\frac{6 \\times 55}{n(n^2 - 1)}$, so $\\frac{330}{n(n^2 - 1)} = \\frac{1}{3}$.\n\n**Step 2: isolate the cubic.** $n(n^2 - 1) = 990$. *Why this step:* rather than solving a cubic, notice that $n(n^2 - 1) = (n - 1)\\,n\\,(n + 1)$ is a product of three consecutive integers.\n\n**Step 3: spot the product.** $990 = 9 \\times 10 \\times 11$, so $n = 10$.\n\n**Step 4: check.** $1 - \\frac{330}{990} = 1 - \\frac{1}{3} = \\frac{2}{3}$. ✓",
    },
    {
      type: "quiz",
      id: "st4-5-q8",
      variant: "practice",
      question:
        "Spearman's $\\rho = 0.5$ and $\\sum d^2 = 28$. Find the number of pairs $n$.",
      options: [
        {
          text: "$7$",
          correct: true,
          feedback: "$0.5 = 1 - \\frac{168}{n(n^2-1)}$ gives $n(n^2 - 1) = 336 = 6 \\times 7 \\times 8$, so $n = 7$.",
        },
        {
          text: "$8$",
          feedback: "$8 \\times 63 = 504$, not $336$. The three consecutive integers are $6, 7, 8$, and $n$ is the *middle* one.",
        },
        {
          text: "$6$",
          feedback: "$6 \\times 35 = 210$, not $336$. Remember $n(n^2 - 1) = (n-1)n(n+1)$, with $n$ in the middle.",
        },
        {
          text: "$336$",
          feedback: "That is the value of $n(n^2 - 1)$. Factor it as three consecutive integers to find $n$.",
        },
      ],
      hint: "Rearrange to $n(n^2 - 1) = \\frac{6\\sum d^2}{1 - \\rho}$.",
    },
    {
      type: "text",
      content:
        "**Monotone but curved.** Ranks only care about *order*. Take the five points $(1, 1), (2, 8), (3, 27), (4, 64), (5, 125)$ on $y = x^3$. As $x$ increases, $y$ always increases, so the ranks agree perfectly: $\\rho = 1$. But the points bend away from any straight line, so Pearson's $r \\approx 0.94 < 1$.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-scatter-regression",
        points: CUBE,
        window: { xmin: 0, xmax: 6, ymin: 0, ymax: 130 },
        xLabel: "x",
        yLabel: "y = x³",
        stats: ["r"],
        caption:
          "The ranks of x and y agree perfectly, so Spearman's ρ = 1, but the curve bends, so Pearson's r ≈ 0.94. Drag a point up or down without changing the order: the ranks, and so ρ = 1, cannot change, but watch r move.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      title: "When to use which",
      content:
        "Use Spearman's $\\rho$ when the data are ranks or ordinal (grades, preferences, positions), when the relationship is monotone but not linear, or when an outlier would dominate $r$ (ranks cap how far any point can be). Use Pearson's $r$ for measured data with a linear pattern.",
    },
    {
      type: "quiz",
      id: "st4-5-q5",
      variant: "concept",
      question:
        "For data on the curve $y = \\sqrt{x}$ at $x = 1, 4, 9, 16, 25$, which is true?",
      options: [
        {
          text: "$\\rho = 1$ and $r < 1$.",
          correct: true,
          feedback: "$y$ always increases with $x$, so the ranks match exactly. But $y = \\sqrt{x}$ curves, so the points are not on a line and $r < 1$.",
        },
        {
          text: "$\\rho = r = 1$.",
          feedback: "$r = 1$ needs a straight line. $\\sqrt{x}$ bends, so $r$ falls short of 1.",
        },
        {
          text: "$\\rho < 1$ because the curve is not a straight line.",
          feedback: "Spearman only looks at order. Any strictly increasing relationship gives $\\rho = 1$.",
        },
      ],
    },
  ]),
};

// ---------------------------------------------------------------------------
// 4.6 Least-squares line
// ---------------------------------------------------------------------------

const lesson06: LessonSeed = {
  slug: "least-squares-line",
  title: "4.6 · The Least-Squares Line",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Correlation tells you *how strongly* the cloud follows a line. Now we want the line itself, so we can predict: \"a student who studies 5.5 hours should score about ...\". Many lines look reasonable. We need a rule for *best*.",
    },
    {
      type: "text",
      content:
        "For a candidate line $\\hat{y} = a + bx$, each data point has a **residual** $e_i = y_i - \\hat{y}_i$: the vertical miss, actual minus predicted. Draw each residual as the side of a square. A good line keeps the total area of the squares small. The **sum of squared errors** $\\text{SSE} = \\sum e_i^2$ is the thing to minimise.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-scatter-regression",
        points: FIVE,
        window: FIVE_WINDOW,
        showMeans: true,
        stats: ["sse", "slope", "intercept"],
        userLine: { slope: 0.5, intercept: 2.5 },
        showLeastSquares: "toggle",
        caption:
          "Drag the two handles on the orange line to make the squares as small as you can. Your starting line has SSE = 4.5. Then press \"Snap my line to least squares\" and compare.",
      },
    },
    {
      type: "text",
      content:
        "If you experimented, you probably noticed two things. The best line passes through the crossing of the mean lines, and once it does, only the tilt is left to adjust. That is exactly how the derivation goes.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Least-squares regression line of y on x",
      content:
        "The line $\\hat{y} = a + bx$ that makes $\\text{SSE} = \\sum (y_i - a - bx_i)^2$ as small as possible. Its slope $b_{yx}$ and intercept $a$ are given below, so the line always passes through $(\\bar{x}, \\bar{y})$: $\\hat{y} - \\bar{y} = b_{yx}(x - \\bar{x})$.",
    },
    {
      type: "math",
      latex: "b_{yx} = \\frac{\\operatorname{Cov}(x, y)}{\\sigma_x^2}, \\qquad a = \\bar{y} - b_{yx}\\bar{x}",
    },
    {
      type: "text",
      content:
        "**Derivation, step 1: the best intercept.** Fix the slope $b$ for a moment. Then $\\text{SSE} = \\sum (w_i - a)^2$ where $w_i = y_i - bx_i$. That is the sum of squared deviations of the numbers $w_i$ from a single value $a$, and you met this in Chapter 2: it is smallest when $a$ is the **mean** of the $w_i$.",
    },
    {
      type: "math",
      latex: "a = \\bar{w} = \\bar{y} - b\\bar{x} \\quad\\Longleftrightarrow\\quad \\bar{y} = a + b\\bar{x}",
    },
    {
      type: "text",
      content:
        "Whatever the slope, the best line goes through the balance point $(\\bar{x}, \\bar{y})$. **Step 2: the best slope.** Substitute $a = \\bar{y} - b\\bar{x}$; each residual becomes $(y_i - \\bar{y}) - b(x_i - \\bar{x})$. Expand the square and sum:",
    },
    {
      type: "math",
      latex:
        "\\text{SSE}(b) = \\sum (y_i - \\bar{y})^2 - 2b\\sum (x_i - \\bar{x})(y_i - \\bar{y}) + b^2\\sum (x_i - \\bar{x})^2 = n\\left[\\sigma_y^2 - 2b\\operatorname{Cov} + b^2\\sigma_x^2\\right]",
    },
    {
      type: "text",
      content:
        "An upward-opening quadratic in $b$. Its vertex is at $b = -\\frac{-2\\operatorname{Cov}}{2\\sigma_x^2}$:",
    },
    {
      type: "math",
      latex: "b_{yx} = \\frac{\\operatorname{Cov}(x, y)}{\\sigma_x^2} = r\\,\\frac{\\sigma_y}{\\sigma_x}",
    },
    {
      type: "text",
      content:
        "Put this $b$ back in and the minimum is $\\text{SSE}_{\\min} = n\\sigma_y^2\\left(1 - \\frac{\\operatorname{Cov}^2}{\\sigma_x^2\\sigma_y^2}\\right) = n\\sigma_y^2(1 - r^2)$. It is zero exactly when $r = \\pm 1$, which matches 4.3. We will use this in 4.7.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** The five points: $\\bar{x} = 3$, $\\bar{y} = 4$, $\\operatorname{Cov} = 1.6$, $\\sigma_x^2 = 2$.\n\n**Step 1.** $b = \\frac{1.6}{2} = 0.8$.\n\n**Step 2.** $a = 4 - 0.8 \\times 3 = 1.6$. So $\\hat{y} = 1.6 + 0.8x$.\n\n**Step 3: check the SSE.**",
    },
    {
      type: "table",
      headers: ["$x$", "$y$", "$\\hat{y} = 1.6 + 0.8x$", "$e = y - \\hat{y}$", "$e^2$"],
      rows: [
        ["1", "2", "2.4", "$-0.4$", "0.16"],
        ["2", "4", "3.2", "$0.8$", "0.64"],
        ["3", "3", "4.0", "$-1.0$", "1.00"],
        ["4", "6", "4.8", "$1.2$", "1.44"],
        ["5", "5", "5.6", "$-0.6$", "0.36"],
        ["", "", "", "Total $0$", "3.60"],
      ],
    },
    {
      type: "text",
      content:
        "$\\text{SSE} = 3.6 = n\\sigma_y^2(1 - r^2) = 5 \\times 2 \\times (1 - 0.64)$. The residuals also sum to zero: a line through $(\\bar{x}, \\bar{y})$ always balances its misses above and below.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: from sums.** $n = 10$, $\\sum x = 50$, $\\sum y = 80$, $\\sum x^2 = 290$, $\\sum xy = 430$.\n\n**Step 1.** $\\bar{x} = 5$, $\\bar{y} = 8$, $\\sigma_x^2 = 29 - 25 = 4$, $\\operatorname{Cov} = 43 - 40 = 3$.\n\n**Step 2.** $b = \\frac{3}{4} = 0.75$, $a = 8 - 0.75 \\times 5 = 4.25$.\n\n**Step 3.** $\\hat{y} = 4.25 + 0.75x$. At $x = 6$: $\\hat{y} = 4.25 + 4.5 = 8.75$.",
    },
    {
      type: "quiz",
      id: "st4-6-q1",
      variant: "practice",
      question:
        "Using $\\hat{y} = 4.25 + 0.75x$ from worked example 2, what is the predicted $y$ at $x = 8$?",
      options: [
        { text: "$10.25$", correct: true, feedback: "$4.25 + 0.75 \\times 8 = 4.25 + 6 = 10.25$." },
        { text: "$6.75$", feedback: "You may have used $0.75 \\times 8 = 6$ and then added $0.75$. The intercept is $4.25$." },
        { text: "$34.75$", feedback: "That swaps slope and intercept: $0.75 + 4.25 \\times 8$." },
      ],
    },
    {
      type: "quiz",
      id: "st4-6-q2",
      variant: "practice",
      question:
        "A least-squares line is $\\hat{y} = 2 + 3x$ and $\\bar{x} = 4$. What is $\\bar{y}$?",
      options: [
        {
          text: "$14$",
          correct: true,
          feedback: "The least-squares line passes through $(\\bar{x}, \\bar{y})$, so $\\bar{y} = 2 + 3 \\times 4 = 14$.",
        },
        {
          text: "It cannot be found without the data.",
          feedback: "It can: the line is forced through the point of means (step 1 of the derivation).",
        },
        {
          text: "$12$",
          feedback: "Do not forget the intercept: $2 + 12 = 14$.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Interpreting the line in context.** A dealer fits $\\hat{y} = 8.5 - 0.9x$ for price $y$ (lakh ₹) against age $x$ (years) of one car model, using cars aged 1 to 8 years.\n\n- **Slope:** each extra year of age is associated with a price about ₹0.9 lakh lower, *on average*.\n- **Intercept:** the predicted price at age 0 is ₹8.5 lakh. That is meaningful only if age 0 is near the data; here it is just outside, so treat it with caution. Often the intercept has no real-world meaning at all (height at age 0 years from adult data, for instance).",
    },
    {
      type: "quiz",
      id: "st4-6-q3",
      variant: "practice",
      question:
        "For the study-hours data the least-squares line is roughly $\\hat{y} = 32.5 + 5.75x$ (marks vs hours). The best interpretation of $5.75$ is:",
      options: [
        {
          text: "On average, each extra hour of study is associated with about 5.75 more marks.",
          correct: true,
          feedback: "Slope = predicted change in $y$ per unit increase in $x$, as an average tendency.",
        },
        {
          text: "Every student gains exactly 5.75 marks for each extra hour.",
          feedback: "The line describes the average trend; individual students scatter above and below it.",
        },
        {
          text: "A student who studies 0 hours scores 5.75 marks.",
          feedback: "That would be the intercept, which is $32.5$ here.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 3 (application): a sales forecast.** Return to the shop from 4.3: advertising $x$ (₹ thousand) $= 2, 4, 6, 8, 10$ and sales $y$ (₹ lakh) $= 5, 7, 6, 8, 9$. The owner plans to spend ₹7 thousand next month. Forecast the sales.\n\n**Step 1: reuse the deviation table.** From 4.3, $\\bar{x} = 6$, $\\bar{y} = 7$, $\\sum d_x d_y = 18$, $\\sum d_x^2 = 40$. *Why this step:* the slope needs exactly the same sums as $r$, so a good table does double duty.\n\n**Step 2: slope.** $b_{yx} = \\frac{\\sum d_x d_y}{\\sum d_x^2} = \\frac{18}{40} = 0.45$. (The $\\frac{1}{n}$ in $\\operatorname{Cov}$ and $\\sigma_x^2$ cancels.)\n\n**Step 3: intercept, through the point of means.** $a = 7 - 0.45 \\times 6 = 7 - 2.7 = 4.3$. So $\\hat{y} = 4.3 + 0.45x$.\n\n**Step 4: forecast.** $\\hat{y}(7) = 4.3 + 3.15 = 7.45$, about ₹7.45 lakh. $x = 7$ lies inside the observed range 2 to 10, so this is a reasonable interpolation.\n\n**Step 5: interpret the slope in units.** Each extra ₹1 thousand of advertising is associated with about ₹0.45 lakh (₹45 000) more sales, on average. The intercept $4.3$ is the predicted sales with no advertising at all; $x = 0$ is outside the data, so treat it cautiously.",
    },
    {
      type: "quiz",
      id: "st4-6-q6",
      variant: "practice",
      question:
        "Find the least-squares line of $y$ on $x$ for $(1, 6), (2, 10), (3, 8), (4, 14), (5, 12)$.",
      options: [
        {
          text: "$\\hat{y} = 5.2 + 1.6x$",
          correct: true,
          feedback: "$\\bar{x} = 3$, $\\bar{y} = 10$, $\\sum d_x d_y = 16$, $\\sum d_x^2 = 10$. So $b = 1.6$ and $a = 10 - 1.6 \\times 3 = 5.2$.",
        },
        {
          text: "$\\hat{y} = 7.6 + 0.8x$",
          feedback: "$0.8$ is $r$ for these data (4.3). The slope is $r\\frac{\\sigma_y}{\\sigma_x} = 0.8 \\times 2 = 1.6$.",
        },
        {
          text: "$\\hat{y} = 8.8 + 0.4x$",
          feedback: "You divided by $\\sum d_y^2 = 40$. That gives $b_{xy}$, the slope for predicting $x$ from $y$. For $y$ on $x$ divide by $\\sum d_x^2$.",
        },
        {
          text: "$\\hat{y} = 1.6 + 5.2x$",
          feedback: "Slope and intercept are swapped. Check: the line must pass through $(3, 10)$, and $1.6 + 5.2 \\times 3 = 17.2$.",
        },
      ],
      hint: "Both means are whole numbers. Then $b = \\frac{\\sum d_x d_y}{\\sum d_x^2}$ and $a = \\bar{y} - b\\bar{x}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: the best line goes through as many points as possible",
      content:
        "The line through $(1, 2)$ and $(2, 4)$, $\\hat{y} = 2x$, hits two of our five points exactly. Its predictions for $x = 3, 4, 5$ are $6, 8, 10$, with residuals $-3, -2, -5$, so $\\text{SSE} = 0 + 0 + 9 + 4 + 25 = 38$, more than ten times the least-squares $3.6$, which hits *no* point. \"Best\" means smallest total squared miss, not most exact hits.",
    },
    {
      type: "quiz",
      id: "st4-6-q4",
      variant: "concept",
      question: "Which statement about the least-squares line is correct?",
      options: [
        {
          text: "It minimises the sum of squared vertical distances from the points, and it may pass through none of them.",
          correct: true,
          feedback: "Yes. For our five points it misses every one and still has the smallest possible SSE.",
        },
        {
          text: "It passes through as many data points as possible.",
          feedback: "Hitting two points exactly can leave huge misses elsewhere. The line through $(1,2)$ and $(2,4)$ has SSE $38$ versus $3.6$.",
        },
        {
          text: "It minimises the sum of the residuals.",
          feedback: "The residuals of *any* line through $(\\bar{x}, \\bar{y})$ sum to zero, so that rule cannot pick one line. Squaring is what makes the minimum unique.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-6-q5",
      variant: "practice",
      question:
        "Data have $\\sigma_x = 2$, $\\sigma_y = 5$ and $r = 0.6$. What is the slope $b_{yx}$ of the regression line of $y$ on $x$?",
      options: [
        { text: "$1.5$", correct: true, feedback: "$b_{yx} = r\\frac{\\sigma_y}{\\sigma_x} = 0.6 \\times \\frac{5}{2} = 1.5$." },
        { text: "$0.24$", feedback: "That uses $\\frac{\\sigma_x}{\\sigma_y}$, which is the slope factor for $x$ on $y$." },
        { text: "$0.6$", feedback: "The slope equals $r$ only when $\\sigma_x = \\sigma_y$." },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam-style): the regression line by step deviations.** Use the six students of 4.3 (heights $x$ in cm, weights $y$ in kg), coded as $u = \\frac{x - 165}{5}$, $v = \\frac{y - 60}{2}$, with $n = 6$, $\\sum u = 0$, $\\sum v = 0$, $\\sum u^2 = 10$, $\\sum uv = 18$. Find the regression line of $y$ on $x$ and estimate the weight of a student 172 cm tall.\n\n**Step 1: slope in coded units.** Since $\\sum u = \\sum v = 0$, $b_{vu} = \\frac{n\\sum uv - \\sum u\\sum v}{n\\sum u^2 - (\\sum u)^2} = \\frac{108}{60} = 1.8$.\n\n**Step 2: undo the scaling.** A rise of 1 in $v$ is 2 kg and a run of 1 in $u$ is 5 cm, so $b_{yx} = \\frac{k}{h}\\,b_{vu} = \\frac{2}{5} \\times 1.8 = 0.72$ kg per cm. *Why this step:* unlike $r$, a slope carries units, so the step sizes do not cancel. (The shifts 165 and 60 still have no effect.)\n\n**Step 3: the means.** $\\bar{x} = 165 + 5\\bar{u} = 165$ and $\\bar{y} = 60 + 2\\bar{v} = 60$.\n\n**Step 4: the line.** $\\hat{y} - 60 = 0.72(x - 165)$, that is $\\hat{y} = 0.72x - 58.8$.\n\n**Step 5: predict.** $\\hat{y}(172) = 60 + 0.72 \\times 7 = 65.04$ kg, about 65 kg. 172 cm is inside the observed range 155 to 175 cm.",
    },
    {
      type: "quiz",
      id: "st4-6-q7",
      variant: "practice",
      question:
        "Data are coded as $u = \\frac{x - 20}{5}$ and $v = \\frac{y - 100}{10}$, and the regression coefficient of $v$ on $u$ is $b_{vu} = 0.6$. Find $b_{yx}$.",
      options: [
        {
          text: "$1.2$",
          correct: true,
          feedback: "$b_{yx} = \\frac{k}{h}\\,b_{vu} = \\frac{10}{5} \\times 0.6 = 1.2$. One step of $v$ is 10 units of $y$; one step of $u$ is 5 units of $x$.",
        },
        {
          text: "$0.3$",
          feedback: "You used $\\frac{h}{k} = \\frac{5}{10}$. Converting back from coded units multiplies by (step in $y$) ÷ (step in $x$) $= \\frac{10}{5}$.",
        },
        {
          text: "$0.6$",
          feedback: "That would hold for $r$. A slope has units, so changing the scales changes it.",
        },
        {
          text: "$30$",
          feedback: "You multiplied by $hk = 50$. The factor is $\\frac{k}{h}$, because $\\operatorname{Cov}$ scales by $hk$ but $\\sigma_x^2$ by $h^2$.",
        },
      ],
      hint: "$b_{yx} = \\frac{\\operatorname{Cov}(x,y)}{\\sigma_x^2} = \\frac{hk\\operatorname{Cov}(u,v)}{h^2\\sigma_u^2}$.",
    },
  ]),
};

// ---------------------------------------------------------------------------
// 4.7 Two regression lines, prediction and fit
// ---------------------------------------------------------------------------

const lesson07: LessonSeed = {
  slug: "two-regression-lines-and-prediction",
  title: "4.7 · Two Regression Lines, Prediction and Fit",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "The least-squares line of 4.6 minimised *vertical* misses, because we wanted to predict $y$ from $x$. Suppose instead you know a student's marks and want to estimate their study hours. Now the misses that matter are *horizontal*: errors in $x$. Minimising those gives a different line, the **regression line of x on y**.",
    },
    {
      type: "math",
      latex:
        "\\text{y on x: } \\; \\hat{y} - \\bar{y} = b_{yx}(x - \\bar{x}), \\; b_{yx} = \\frac{\\operatorname{Cov}}{\\sigma_x^2} = r\\frac{\\sigma_y}{\\sigma_x} \\qquad \\text{x on y: } \\; \\hat{x} - \\bar{x} = b_{xy}(y - \\bar{y}), \\; b_{xy} = \\frac{\\operatorname{Cov}}{\\sigma_y^2} = r\\frac{\\sigma_x}{\\sigma_y}",
    },
    {
      type: "text",
      content:
        "The x-on-y formula is the y-on-x formula with the roles of $x$ and $y$ swapped: the same derivation, run sideways. Both lines pass through $(\\bar{x}, \\bar{y})$, so they cross there. Below, the solid line is $y$ on $x$ and the dashed line is $x$ on $y$. Drag points to make the cloud tighter and watch them close like scissors.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-scatter-regression",
        points: STUDY,
        window: STUDY_WINDOW,
        xLabel: "Hours studied",
        yLabel: "Marks",
        showMeans: true,
        showLeastSquares: "always",
        showXonY: true,
        stats: ["r", "r2", "slope"],
        caption:
          "Both lines meet at (x̄, ȳ). As |r| approaches 1 they merge into one; with a round cloud (r near 0) they open out towards the two mean lines.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1: the five points.** $\\bar{x} = 3$, $\\bar{y} = 4$, $\\operatorname{Cov} = 1.6$, $\\sigma_x^2 = \\sigma_y^2 = 2$.\n\n- $y$ on $x$: $b_{yx} = 0.8$, so $\\hat{y} = 4 + 0.8(x - 3) = 1.6 + 0.8x$.\n- $x$ on $y$: $b_{xy} = \\frac{1.6}{2} = 0.8$, so $\\hat{x} = 3 + 0.8(y - 4) = 0.8y - 0.2$.\n\nTo estimate $x$ when $y = 6$, use the x-on-y line: $\\hat{x} = 4.8 - 0.2 = 4.6$. If you wrongly rearranged the y-on-x line to $x = \\frac{y - 1.6}{0.8}$ you would get $5.5$: a different, worse answer.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: x-on-y is just y-on-x rearranged",
      content:
        "Solving $\\hat{y} = 1.6 + 0.8x$ for $x$ gives $x = 1.25y - 2$: the *same* line, slope $0.8$ on the $xy$-axes. The x-on-y line $\\hat{x} = 0.8y - 0.2$, redrawn with $y$ up the page, is $y = 1.25x + 0.25$, with slope $1.25$: a *different* line. In general the x-on-y line has slope $\\frac{1}{b_{xy}}$ on the $xy$-axes, and $\\frac{1}{b_{xy}} = b_{yx}$ only when $b_{yx}b_{xy} = r^2 = 1$. The two lines minimise different misses (vertical vs horizontal), so they coincide only for a perfect straight-line cloud.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (routine): both lines from summary statistics.** $\\bar{x} = 20$, $\\bar{y} = 30$, $\\sigma_x = 4$, $\\sigma_y = 6$, $r = 0.6$. Find both regression lines, estimate $y$ at $x = 25$ and $x$ at $y = 36$.\n\n**Step 1: the two slopes.** $b_{yx} = r\\frac{\\sigma_y}{\\sigma_x} = 0.6 \\times \\frac{6}{4} = 0.9$ and $b_{xy} = r\\frac{\\sigma_x}{\\sigma_y} = 0.6 \\times \\frac{4}{6} = 0.4$. *Why this step:* the slope for predicting a variable has *that* variable's SD on top.\n\n**Step 2: check.** $b_{yx}b_{xy} = 0.36 = r^2$. ✓\n\n**Step 3: y on x.** $\\hat{y} - 30 = 0.9(x - 20)$, so $\\hat{y} = 0.9x + 12$. At $x = 25$: $\\hat{y} = 22.5 + 12 = 34.5$.\n\n**Step 4: x on y.** $\\hat{x} - 20 = 0.4(y - 30)$, so $\\hat{x} = 0.4y + 8$. At $y = 36$: $\\hat{x} = 14.4 + 8 = 22.4$. *Why a separate line:* we are now predicting $x$, so we need the line that minimises errors in $x$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (application, CBSE-style): marks in two subjects.** In a class, Economics marks $x$ have mean $40$ and SD $10$; Statistics marks $y$ have mean $45$ and SD $16$; $r = 0.5$. (a) Estimate the Statistics marks of a student who scored 50 in Economics. (b) Estimate the Economics marks of a student who scored 55 in Statistics.\n\n**(a) Predicting $y$, so use y on x.** $b_{yx} = 0.5 \\times \\frac{16}{10} = 0.8$. $\\hat{y} = 45 + 0.8(50 - 40) = 45 + 8 = 53$.\n\n**(b) Predicting $x$, so use x on y.** $b_{xy} = 0.5 \\times \\frac{10}{16} = 0.3125$. $\\hat{x} = 40 + 0.3125(55 - 45) = 40 + 3.125 \\approx 43.1$.\n\n**Why the answers are not symmetric.** A student 10 marks above average in Economics (1 SD) is predicted only $0.5$ SD above average in Statistics, and vice versa. Both predictions are pulled back towards the mean by the factor $r$. This is **regression to the mean**, the effect that gave regression its name.",
    },
    {
      type: "quiz",
      id: "st4-7-q8",
      variant: "practice",
      question:
        "$\\bar{x} = 50$, $\\bar{y} = 60$, $\\sigma_x = 5$, $\\sigma_y = 10$, $r = 0.8$. Estimate $x$ when $y = 70$.",
      options: [
        {
          text: "$54$",
          correct: true,
          feedback: "Predicting $x$, so use x on y: $b_{xy} = 0.8 \\times \\frac{5}{10} = 0.4$, and $\\hat{x} = 50 + 0.4 \\times 10 = 54$.",
        },
        {
          text: "$56.25$",
          feedback: "You rearranged the y-on-x line: $70 = 60 + 1.6(x - 50)$. That line minimises errors in $y$, not $x$.",
        },
        {
          text: "$66$",
          feedback: "You used $b_{yx} = 1.6$ as if it were the x-on-y slope. For x on y the SD of $x$ goes on top: $0.8 \\times \\frac{5}{10}$.",
        },
        {
          text: "$58$",
          feedback: "You used $r = 0.8$ as the slope. $b_{xy} = r\\frac{\\sigma_x}{\\sigma_y} = 0.4$.",
        },
      ],
      hint: "Which variable are you predicting? Its SD goes in the numerator of the slope.",
    },
    {
      type: "text",
      content:
        "**The product rule.** Multiply the two slopes:",
    },
    {
      type: "math",
      latex: "b_{yx}\\cdot b_{xy} = r\\frac{\\sigma_y}{\\sigma_x}\\cdot r\\frac{\\sigma_x}{\\sigma_y} = r^2 \\quad\\Longrightarrow\\quad r = \\pm\\sqrt{b_{yx}\\,b_{xy}}",
    },
    {
      type: "text",
      content:
        "Three consequences exam problems love (ISC, Class 11 Statistics for Economics, many entrance tests): (1) $b_{yx}$, $b_{xy}$ and $r$ all have the **same sign** (all carry the sign of $\\operatorname{Cov}$); (2) $b_{yx} b_{xy} \\le 1$, so both slopes cannot exceed 1 in size; (3) $r$ takes the common sign of the slopes. Also: if $r = 0$ the lines are $y = \\bar{y}$ and $x = \\bar{x}$, perpendicular; if $r = \\pm 1$ they coincide.",
    },
    {
      type: "callout",
      variant: "info",
      title: "More properties of the regression coefficients",
      content:
        "1. **Change of origin: no effect. Change of scale: yes.** If $u = \\frac{x - a}{h}$ and $v = \\frac{y - b}{k}$, then $\\operatorname{Cov}(u, v) = \\frac{\\operatorname{Cov}(x, y)}{hk}$ and $\\sigma_u^2 = \\frac{\\sigma_x^2}{h^2}$, so $b_{vu} = \\frac{h}{k}\\,b_{yx}$ and $b_{uv} = \\frac{k}{h}\\,b_{xy}$. Unlike $r$, a slope has units (units of $y$ per unit of $x$), so rescaling changes it.\n2. **Angle between the lines.** On the $xy$-axes the slopes are $b_{yx} = r\\frac{\\sigma_y}{\\sigma_x}$ and $\\frac{1}{b_{xy}} = \\frac{\\sigma_y}{r\\,\\sigma_x}$. The formula $\\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|$ gives the acute angle below. At $r = \\pm 1$, $\\tan\\theta = 0$: the scissors close. As $r \\to 0$, $\\tan\\theta \\to \\infty$: the lines open to $90^\\circ$.\n3. **Mean of the slopes.** $b_{yx}$ and $b_{xy}$ have the same sign, so AM $\\ge$ GM gives $\\left|\\frac{b_{yx} + b_{xy}}{2}\\right| \\ge \\sqrt{b_{yx}b_{xy}} = |r|$.",
    },
    {
      type: "math",
      latex: "\\tan\\theta = \\frac{1 - r^2}{|r|}\\cdot\\frac{\\sigma_x\\,\\sigma_y}{\\sigma_x^2 + \\sigma_y^2}",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam-style): the angle between the lines, two ways.** $r = 0.5$, $\\sigma_x = 3$, $\\sigma_y = 4$. Find the acute angle between the regression lines.\n\n**Route 1: the formula.** $\\frac{1 - r^2}{|r|} = \\frac{0.75}{0.5} = 1.5$ and $\\frac{\\sigma_x\\sigma_y}{\\sigma_x^2 + \\sigma_y^2} = \\frac{12}{25} = 0.48$, so $\\tan\\theta = 1.5 \\times 0.48 = 0.72$.\n\n**Route 2: from the slopes (a check).** On the $xy$-axes, y on x has slope $m_1 = b_{yx} = 0.5 \\times \\frac{4}{3} = \\frac{2}{3}$. The x-on-y line has $b_{xy} = 0.5 \\times \\frac{3}{4} = \\frac{3}{8}$, so on the $xy$-axes its slope is $m_2 = \\frac{8}{3}$. *Why the reciprocal:* $\\hat{x} = \\bar{x} + b_{xy}(y - \\bar{y})$ rises $1$ in $y$ for every $b_{xy}$ in $x$.\n\n$\\tan\\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right| = \\frac{\\frac{8}{3} - \\frac{2}{3}}{1 + \\frac{16}{9}} = \\frac{2}{\\frac{25}{9}} = \\frac{18}{25} = 0.72$. ✓\n\n**Answer.** $\\theta = \\tan^{-1}(0.72) \\approx 35.8^\\circ$. A moderate $r$ leaves the scissors half open.",
    },
    {
      type: "quiz",
      id: "st4-7-q9",
      variant: "practice",
      question:
        "$r = 0.6$ and $\\sigma_x = \\sigma_y = 2$. Find $\\tan\\theta$ for the acute angle between the two regression lines.",
      options: [
        {
          text: "$\\frac{8}{15}$",
          correct: true,
          feedback: "$\\frac{1 - 0.36}{0.6} = \\frac{16}{15}$ and $\\frac{\\sigma_x\\sigma_y}{\\sigma_x^2 + \\sigma_y^2} = \\frac{4}{8} = \\frac{1}{2}$, so $\\tan\\theta = \\frac{8}{15}$.",
        },
        {
          text: "$\\frac{16}{15}$",
          feedback: "You left out the factor $\\frac{\\sigma_x\\sigma_y}{\\sigma_x^2 + \\sigma_y^2} = \\frac{1}{2}$.",
        },
        {
          text: "$\\frac{4}{15}$",
          feedback: "You used $\\frac{\\sigma_x}{\\sigma_x^2 + \\sigma_y^2} = \\frac{2}{8}$. The numerator is the product $\\sigma_x\\sigma_y = 4$, so the factor is $\\frac{4}{8} = \\frac{1}{2}$.",
        },
        {
          text: "$0$",
          feedback: "The lines coincide only when $r = \\pm 1$. With $r = 0.6$ they meet at a genuine angle.",
        },
      ],
      hint: "Compute $\\frac{1 - r^2}{|r|}$ and $\\frac{\\sigma_x\\sigma_y}{\\sigma_x^2 + \\sigma_y^2}$ separately, then multiply.",
    },
    {
      type: "quiz",
      id: "st4-7-q7",
      variant: "practice",
      question: "$b_{yx} = 0.8$. Let $u = \\frac{x}{2}$ and $v = \\frac{y}{5}$. Find $b_{vu}$.",
      options: [
        {
          text: "$0.32$",
          correct: true,
          feedback: "Here $h = 2$, $k = 5$, so $b_{vu} = \\frac{h}{k}\\,b_{yx} = \\frac{2}{5} \\times 0.8 = 0.32$.",
        },
        {
          text: "$0.8$",
          feedback: "That would be true for $r$, which ignores change of scale. A regression coefficient has units, so rescaling changes it.",
        },
        {
          text: "$2$",
          feedback: "You used $\\frac{k}{h} = \\frac{5}{2}$. Dividing $y$ by 5 shrinks rises by 5; dividing $x$ by 2 shrinks runs by 2. So the slope is multiplied by $\\frac{2}{5}$.",
        },
        {
          text: "$0.08$",
          feedback: "You divided by $hk = 10$. The covariance gains $\\frac{1}{hk}$, but the variance of $u$ gains $\\frac{1}{h^2}$, so the net factor is $\\frac{h}{k}$.",
        },
      ],
      hint: "$\\operatorname{Cov}(u, v) = \\frac{\\operatorname{Cov}(x, y)}{hk}$ and $\\sigma_u^2 = \\frac{\\sigma_x^2}{h^2}$.",
    },
    {
      type: "quiz",
      id: "st4-7-q1",
      variant: "practice",
      question: "The regression coefficients are $b_{yx} = 1.6$ and $b_{xy} = 0.4$. Find $r$.",
      options: [
        {
          text: "$0.8$",
          correct: true,
          feedback: "$r^2 = 1.6 \\times 0.4 = 0.64$, and both slopes are positive, so $r = +0.8$.",
        },
        { text: "$-0.8$", feedback: "$r$ takes the sign of the slopes, both positive here." },
        { text: "$0.64$", feedback: "That is $r^2$. Take the square root." },
        { text: "$1.0$", feedback: "$|r| = 1$ would need $b_{yx}b_{xy} = 1$, but here the product is $0.64$." },
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam-style): which line is which?** The two regression lines are $3x + 2y = 26$ and $6x + y = 31$. Find $\\bar{x}$, $\\bar{y}$ and $r$.",
    },
    {
      type: "text",
      content:
        "**Step 1: means from the intersection.** From the second, $y = 31 - 6x$. Substitute: $3x + 62 - 12x = 26$, so $x = 4$ and $y = 7$. Hence $\\bar{x} = 4$, $\\bar{y} = 7$.\n\n**Step 2: try an assignment.** Suppose $3x + 2y = 26$ is $y$ on $x$: $y = 13 - 1.5x$, so $b_{yx} = -1.5$. Then $6x + y = 31$ is $x$ on $y$: $x = \\frac{31 - y}{6}$, so $b_{xy} = -\\frac{1}{6}$. Product $= 0.25 \\le 1$. Valid.\n\n**Step 3: check the other assignment.** If $6x + y = 31$ were $y$ on $x$, $b_{yx} = -6$ and $b_{xy} = -\\frac{2}{3}$, product $4 > 1$. Impossible, so rejected.\n\n**Step 4.** $r^2 = 0.25$, both slopes negative, so $r = -0.5$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The recipe",
      content:
        "Solve the two equations for $(\\bar{x}, \\bar{y})$. Write one line as $y = \\dots$ and the other as $x = \\dots$, read off $b_{yx}$ and $b_{xy}$, and check $b_{yx}b_{xy} \\le 1$. If it fails, swap the roles. Then $r = \\pm\\sqrt{b_{yx}b_{xy}}$ with the common sign, and $\\sigma_y$ follows from $b_{yx} = r\\frac{\\sigma_y}{\\sigma_x}$ if $\\sigma_x$ is given.",
    },
    {
      type: "quiz",
      id: "st4-7-q2",
      variant: "practice",
      question:
        "The regression lines are $8x - 10y + 66 = 0$ and $40x - 18y = 214$, and $\\sigma_x^2 = 9$. Find $\\bar{x}$, $\\bar{y}$, $r$ and $\\sigma_y$.",
      options: [
        {
          text: "$\\bar{x} = 13$, $\\bar{y} = 17$, $r = 0.6$, $\\sigma_y = 4$",
          correct: true,
          feedback: "Solving gives $(13, 17)$. Taking the first as y on x: $b_{yx} = 0.8$, $b_{xy} = \\frac{18}{40} = 0.45$, product $0.36$, so $r = 0.6$. Then $0.8 = 0.6\\cdot\\frac{\\sigma_y}{3}$ gives $\\sigma_y = 4$.",
        },
        {
          text: "$\\bar{x} = 17$, $\\bar{y} = 13$, $r = 0.6$, $\\sigma_y = 4$",
          feedback: "The means are swapped. Substitute back: $8(13) - 10(17) + 66 = 0$ checks, but $8(17) - 10(13) + 66 \\ne 0$.",
        },
        {
          text: "$\\bar{x} = 13$, $\\bar{y} = 17$, $r = 0.6$, $\\sigma_y = 12$",
          feedback: "You used $\\sigma_x = 9$. That is the variance; $\\sigma_x = 3$, so $0.8 = 0.6\\cdot\\frac{\\sigma_y}{3}$ gives $\\sigma_y = 4$.",
        },
        {
          text: "$\\bar{x} = 13$, $\\bar{y} = 17$, $r = 1.67$, $\\sigma_y = 4$",
          feedback: "That comes from the wrong assignment ($b_{yx} = \\frac{40}{18}$, $b_{xy} = \\frac{10}{8}$, product $> 1$). Since $|r| \\le 1$, swap the roles.",
        },
      ],
      hint: "Try the first line as y on x: $y = 0.8x + 6.6$.",
    },
    {
      type: "quiz",
      id: "st4-7-q3",
      variant: "concept",
      question:
        "Using the five-point data, a teacher wants to estimate a student's $x$ when $y = 6$. Which method is right?",
      options: [
        {
          text: "Use the regression line of $x$ on $y$: $\\hat{x} = 0.8y - 0.2 = 4.6$.",
          correct: true,
          feedback: "To predict $x$ you minimise errors in $x$, which is exactly what the x-on-y line does.",
        },
        {
          text: "Rearrange $\\hat{y} = 1.6 + 0.8x$ to get $x = \\frac{6 - 1.6}{0.8} = 5.5$.",
          feedback: "That line was chosen to minimise *vertical* errors. Solving it for $x$ does not minimise horizontal errors, so it is a different (worse) estimate unless $|r| = 1$.",
        },
        {
          text: "Either; the two lines are the same line written differently.",
          feedback: "They coincide only when $|r| = 1$. Here $r = 0.8$, and the two methods give $4.6$ and $5.5$.",
        },
      ],
    },
    {
      type: "text",
      content:
        "**How good is the fit? r².** Before using $x$, the best guess for every $y$ is $\\bar{y}$, with total squared error $\\sum (y_i - \\bar{y})^2 = n\\sigma_y^2$. After fitting the line, the leftover error is $\\text{SSE} = n\\sigma_y^2(1 - r^2)$ (4.6). So the fraction of the variation removed by the line is",
    },
    {
      type: "math",
      latex: "\\frac{n\\sigma_y^2 - \\text{SSE}}{n\\sigma_y^2} = 1 - (1 - r^2) = r^2",
    },
    {
      type: "text",
      content:
        "For the five points, $n\\sigma_y^2 = 10$ and $\\text{SSE} = 3.6$, so the line explains $\\frac{6.4}{10} = 64\\% = 0.8^2$ of the variation in $y$. The other 36% is the scatter the line cannot account for, visible in the residuals.",
    },
    {
      type: "quiz",
      id: "st4-7-q4",
      variant: "practice",
      question: "A regression of weight on height has $r = 0.7$. What fraction of the variation in weight is explained by the line?",
      options: [
        { text: "$49\\%$", correct: true, feedback: "$r^2 = 0.49$." },
        { text: "$70\\%$", feedback: "That is $r$ read as a percentage, the misconception from 4.3. Square it." },
        { text: "$51\\%$", feedback: "That is $1 - r^2$, the *unexplained* fraction." },
      ],
    },
    {
      type: "text",
      content:
        "**Extrapolation.** A line fitted to children aged 3 to 10 might be $\\hat{h} = 80 + 6t$ (height in cm, age in years). Inside that range it predicts well. At $t = 40$ it predicts $320$ cm. Nothing in the data says the straight-line pattern continues outside the range of $x$ you observed, and here it clearly does not: children stop growing.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: the model works for any x",
      content:
        "A regression line is a description of the data you have. Predicting within the observed range of $x$ (**interpolation**) is reasonable; predicting far outside it (**extrapolation**) assumes the pattern continues, which the data cannot confirm. Also check the residuals: if they show a curve, a straight line was the wrong model even inside the range.",
    },
    {
      type: "quiz",
      id: "st4-7-q5",
      variant: "concept",
      question:
        "A line fitted to monthly sales for months 1 to 12 is $\\hat{s} = 200 + 15m$. Which prediction is most trustworthy?",
      options: [
        {
          text: "Month 7: $\\hat{s} = 305$",
          correct: true,
          feedback: "Month 7 is inside the observed range 1 to 12, so this is interpolation.",
        },
        {
          text: "Month 60: $\\hat{s} = 1100$",
          feedback: "Five years out is far beyond the data; markets saturate, prices change. The line has no evidence there.",
        },
        {
          text: "All predictions are equally trustworthy because the equation is exact.",
          feedback: "The equation is exact arithmetic, but the *pattern* it describes is only supported where you have data.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-7-q6",
      variant: "practice",
      question: "Which pair could NOT be the two regression coefficients of the same data?",
      options: [
        {
          text: "$b_{yx} = 2$, $b_{xy} = 0.8$",
          correct: true,
          feedback: "Their product is $1.6 > 1$, which would need $r^2 > 1$. Impossible.",
        },
        { text: "$b_{yx} = 2$, $b_{xy} = 0.3$", feedback: "Product $0.6 \\le 1$, same sign: possible, with $r \\approx 0.77$." },
        { text: "$b_{yx} = -0.5$, $b_{xy} = -1.2$", feedback: "Product $0.6 \\le 1$, same sign: possible, with $r \\approx -0.77$." },
      ],
    },
  ]),
};

// ---------------------------------------------------------------------------
// 4.8 Mastery
// ---------------------------------------------------------------------------

const lessonMastery: LessonSeed = {
  slug: "chapter-4-mastery",
  title: "4.8 · Chapter 4 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "Everything in this chapter grows from one picture: rectangles drawn from the point of means. Their average is the covariance; standardised, it is $r$; applied to ranks, it is Spearman's $\\rho$; divided by $\\sigma_x^2$, it is the slope of the best line. Here is the whole chapter on one table, then a mixed set of questions.",
    },
    {
      type: "table",
      headers: ["Quantity", "Formula", "Remember"],
      rows: [
        ["Covariance", "$\\frac{\\sum xy}{n} - \\bar{x}\\bar{y}$", "Sign is meaningful; size depends on units"],
        ["Pearson's $r$", "$\\frac{\\operatorname{Cov}}{\\sigma_x\\sigma_y}$", "$-1 \\le r \\le 1$; linear only; $|r|$ unchanged by linear rescaling"],
        ["Spearman's $\\rho$", "$1 - \\frac{6\\sum d^2}{n(n^2-1)}$", "Pearson on ranks; add $\\frac{m(m^2-1)}{12}$ per tie group"],
        ["$y$ on $x$", "$\\hat{y} - \\bar{y} = b_{yx}(x - \\bar{x})$, $b_{yx} = \\frac{\\operatorname{Cov}}{\\sigma_x^2}$", "Minimises vertical squared residuals"],
        ["$x$ on $y$", "$\\hat{x} - \\bar{x} = b_{xy}(y - \\bar{y})$, $b_{xy} = \\frac{\\operatorname{Cov}}{\\sigma_y^2}$", "Minimises horizontal squared residuals"],
        ["Link", "$b_{yx}b_{xy} = r^2$", "Same sign; product $\\le 1$; lines meet at $(\\bar{x}, \\bar{y})$"],
        ["Fit", "$r^2 = 1 - \\frac{\\text{SSE}}{n\\sigma_y^2}$", "Fraction of variation in $y$ explained"],
      ],
    },
    {
      type: "quiz",
      id: "st4-8-q1",
      variant: "mastery",
      question:
        "For 8 pairs, $\\sum x = 40$, $\\sum y = 48$, $\\sum x^2 = 232$, $\\sum y^2 = 360$, $\\sum xy = 276$. Find $r$.",
      options: [
        {
          text: "$0.75$",
          correct: true,
          feedback: "$\\bar{x} = 5$, $\\bar{y} = 6$. $\\sigma_x^2 = 29 - 25 = 4$, $\\sigma_y^2 = 45 - 36 = 9$, $\\operatorname{Cov} = 34.5 - 30 = 4.5$. $r = \\frac{4.5}{2 \\times 3} = 0.75$.",
        },
        { text: "$4.5$", feedback: "That is the covariance. Divide by $\\sigma_x\\sigma_y = 6$." },
        { text: "$0.125$", feedback: "You divided by $\\sigma_x^2\\sigma_y^2 = 36$. Use the standard deviations, not the variances." },
        { text: "$0.5625$", feedback: "You squared $r$: $0.75^2 = 0.5625$ is $r^2$, the fraction of variation explained. The question asks for $r = \\frac{4.5}{2 \\times 3} = 0.75$." },
      ],
    },
    {
      type: "quiz",
      id: "st4-8-q2",
      variant: "mastery",
      question:
        "The two regression lines of some data are $x + 2y = 5$ and $2x + 3y = 8$. Which is the regression line of $y$ on $x$, and what is $r$?",
      options: [
        {
          text: "$x + 2y = 5$ is $y$ on $x$; $r = -\\frac{\\sqrt{3}}{2} \\approx -0.87$.",
          correct: true,
          feedback: "As y on x: $b_{yx} = -\\frac{1}{2}$; the other as x on y: $x = 4 - 1.5y$, $b_{xy} = -\\frac{3}{2}$. Product $0.75 \\le 1$, both negative, so $r = -\\sqrt{0.75}$.",
        },
        {
          text: "$2x + 3y = 8$ is $y$ on $x$; $r = -\\frac{2}{\\sqrt{3}}$.",
          feedback: "That assignment gives $b_{yx} = -\\frac{2}{3}$, $b_{xy} = -2$, product $\\frac{4}{3} > 1$: impossible, and $\\frac{2}{\\sqrt{3}} > 1$ anyway.",
        },
        {
          text: "$x + 2y = 5$ is $y$ on $x$; $r = +\\frac{\\sqrt{3}}{2}$.",
          feedback: "The assignment is right, but both slopes are negative, so $r$ is negative too.",
        },
      ],
      hint: "Test one assignment; the product of the slopes must be at most 1.",
    },
    {
      type: "quiz",
      id: "st4-8-q3",
      variant: "mastery",
      question: "For the same lines $x + 2y = 5$ and $2x + 3y = 8$, what are $\\bar{x}$ and $\\bar{y}$?",
      options: [
        {
          text: "$\\bar{x} = 1$, $\\bar{y} = 2$",
          correct: true,
          feedback: "Both lines pass through $(\\bar{x}, \\bar{y})$. From the first $x = 5 - 2y$; then $10 - 4y + 3y = 8$ gives $y = 2$, $x = 1$.",
        },
        { text: "$\\bar{x} = 2$, $\\bar{y} = 1$", feedback: "Check: $2 + 2(1) = 4 \\ne 5$. The means are swapped." },
        { text: "They cannot be found without the data.", feedback: "The two regression lines always intersect at the point of means." },
      ],
    },
    {
      type: "quiz",
      id: "st4-8-q4",
      variant: "mastery",
      question:
        "Six students' marks: Maths $85, 70, 70, 60, 55, 40$ and Physics (same students, same order) $80, 75, 60, 65, 50, 45$. Using average ranks for ties and the tie correction, find Spearman's $\\rho$.",
      options: [
        {
          text: "$\\frac{31}{35} \\approx 0.886$",
          correct: true,
          feedback: "Maths ranks $1, 2.5, 2.5, 4, 5, 6$; Physics $1, 2, 4, 3, 5, 6$. $\\sum d^2 = 0 + 0.25 + 2.25 + 1 + 0 + 0 = 3.5$; correction $0.5$. $\\rho = 1 - \\frac{6 \\times 4}{6 \\times 35} = \\frac{31}{35}$.",
        },
        {
          text: "$0.9$",
          feedback: "That is $1 - \\frac{6 \\times 3.5}{210}$, without the tie correction $\\frac{2(4-1)}{12} = 0.5$.",
        },
        {
          text: "$\\approx 0.94$",
          feedback: "You ranked the two 70s as 2 and 3 instead of $2.5$ each. That gives $\\sum d^2 = 2$ and $1 - \\frac{12}{210} \\approx 0.94$. Tied values share the average of their positions, $2.5$, and then need the tie correction.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-8-q5",
      variant: "mastery",
      question:
        "$r_{xy} = -0.4$. If $u = \\frac{x - 100}{5}$ and $v = \\frac{50 - y}{2}$, then $r_{uv}$ equals:",
      options: [
        {
          text: "$0.4$",
          correct: true,
          feedback: "$u$ uses a positive scale factor, $v = 25 - \\frac{y}{2}$ a negative one. Opposite signs flip $r$: $-(-0.4) = 0.4$.",
        },
        { text: "$-0.4$", feedback: "Look at $v$: $y$ enters with a minus sign, which reverses its direction." },
        { text: "$-0.16$", feedback: "Linear changes of scale never alter $|r|$; the factors $\\frac{1}{5}$ and $\\frac{1}{2}$ cancel in standardisation." },
      ],
    },
    {
      type: "quiz",
      id: "st4-8-q6",
      variant: "mastery",
      question:
        "Across Indian states, the number of cinemas per million people correlates positively with the literacy rate. Which conclusion is justified?",
      options: [
        {
          text: "The two tend to be higher together; a lurking variable such as urbanisation or income could explain both.",
          correct: true,
          feedback: "Correlation describes co-movement. Richer, more urban states tend to have both more cinemas and higher literacy.",
        },
        {
          text: "Building cinemas will raise literacy.",
          feedback: "That claims causation from observational data. No experiment has shown cinemas cause literacy.",
        },
        {
          text: "Literacy causes people to build cinemas.",
          feedback: "Reverse causation is just as unsupported. Correlation alone cannot pick a direction.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-8-q7",
      variant: "mastery",
      question:
        "A line fitted to data with $x$ from 10 to 30 is $\\hat{y} = 5 + 2x$, and $r = 0.9$. Which statement is correct?",
      options: [
        {
          text: "About 81% of the variation in $y$ is explained by the line, and predictions near $x = 20$ are more trustworthy than at $x = 100$.",
          correct: true,
          feedback: "$r^2 = 0.81$, and $x = 100$ would be an extrapolation far beyond the data.",
        },
        {
          text: "90% of the points lie on the line, so the prediction at $x = 100$ ($\\hat{y} = 205$) is reliable.",
          feedback: "Two errors: $r$ is not a proportion of points, and $x = 100$ is far outside the observed range.",
        },
        {
          text: "Since $r = 0.9$, increasing $x$ will cause $y$ to increase.",
          feedback: "Correlation, however strong, does not establish causation.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-8-q8",
      variant: "mastery",
      question:
        "For some data $\\bar{x} = 10$, $\\bar{y} = 20$, $\\sigma_x = 2$, $\\sigma_y = 6$, $r = 0.5$. What is the regression line of $y$ on $x$, and the predicted $y$ at $x = 12$?",
      options: [
        {
          text: "$\\hat{y} = 20 + 1.5(x - 10)$; $\\hat{y}(12) = 23$",
          correct: true,
          feedback: "$b_{yx} = r\\frac{\\sigma_y}{\\sigma_x} = 0.5 \\times 3 = 1.5$. At $x = 12$: $20 + 1.5 \\times 2 = 23$.",
        },
        {
          text: "$\\hat{y} = 20 + \\frac{1}{6}(x - 10)$; $\\hat{y}(12) \\approx 20.33$",
          feedback: "$\\frac{1}{6} = r\\frac{\\sigma_x}{\\sigma_y}$ is $b_{xy}$, the slope for x on y.",
        },
        {
          text: "$\\hat{y} = 20 + 3(x - 10)$; $\\hat{y}(12) = 26$",
          feedback: "$\\frac{\\sigma_y}{\\sigma_x} = 3$ is the slope only when $r = 1$. Multiply by $r = 0.5$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-8-q9",
      variant: "mastery",
      question:
        "Points lie exactly on $y = (x - 5)^2$ for $x = 1, 2, \\dots, 9$. Which is true?",
      options: [
        {
          text: "$r = 0$, even though $y$ is completely determined by $x$.",
          correct: true,
          feedback: "The points are symmetric about $\\bar{x} = 5$, so mirror-image co-deviation rectangles cancel. A perfect curved relationship with no linear trend.",
        },
        {
          text: "$r = 1$, because the relationship is exact.",
          feedback: "$r = 1$ requires a rising straight line. A U-shape has no single direction.",
        },
        {
          text: "Spearman's $\\rho = 1$, because $y$ is a function of $x$.",
          feedback: "$\\rho = 1$ needs a strictly increasing relationship. Here $y$ falls then rises, so the ranks do not agree.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st4-8-q10",
      variant: "mastery",
      question:
        "Using $\\tan\\theta = \\frac{1 - r^2}{|r|}\\cdot\\frac{\\sigma_x\\sigma_y}{\\sigma_x^2 + \\sigma_y^2}$ for the acute angle $\\theta$ between the two regression lines, which statement is correct?",
      options: [
        {
          text: "$\\theta = 0^\\circ$ when $r = \\pm 1$, and $\\theta \\to 90^\\circ$ as $r \\to 0$.",
          correct: true,
          feedback: "At $r = \\pm 1$ the factor $1 - r^2$ is 0, so the lines coincide. As $r \\to 0$, $\\frac{1 - r^2}{|r|} \\to \\infty$, and at $r = 0$ the lines are $y = \\bar{y}$ and $x = \\bar{x}$, perpendicular.",
        },
        {
          text: "$\\theta = 90^\\circ$ when $r = \\pm 1$, and $\\theta = 0^\\circ$ when $r = 0$.",
          feedback: "Backwards. A perfect line makes both regressions the same line (angle 0); no linear trend makes them the two perpendicular mean lines.",
        },
        {
          text: "$\\theta = 45^\\circ$ whenever $\\sigma_x = \\sigma_y$, whatever $r$ is.",
          feedback: "With $\\sigma_x = \\sigma_y$ the second factor is $\\frac{1}{2}$, but $\\tan\\theta = \\frac{1 - r^2}{2|r|}$ still depends on $r$. It is $1$ (so $45^\\circ$) only when $r^2 + 2|r| - 1 = 0$, i.e. $|r| = \\sqrt{2} - 1$.",
        },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "So far every calculation has been about the data in front of you. Chapter 5 asks what those data say about a larger population: the normal curve, sampling, and how confident we can be in an estimate.",
    },
  ]),
};

export const statisticsChapter4Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
