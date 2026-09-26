import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Statistics Chapter 5 — The Normal Distribution and Estimation.
 * Histograms become density curves; the normal curve, z and Φ answer
 * questions forwards and backwards; then the first step into inference:
 * sampling, the spread of the sample mean, and confidence intervals.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

/** 120 student heights (cm), close to N(160, 8²). Mean 160, SD ≈ 7.9. */
const HEIGHTS_120 = [
  139, 142, 144, 145, 146, 147, 147, 148, 148, 149, 149, 150, 150, 150, 151, 151, 151, 152, 152, 152,
  152, 153, 153, 153, 153, 154, 154, 154, 154, 154, 155, 155, 155, 155, 156, 156, 156, 156, 156, 156,
  157, 157, 157, 157, 157, 158, 158, 158, 158, 158, 158, 159, 159, 159, 159, 159, 159, 160, 160, 160,
  160, 160, 160, 161, 161, 161, 161, 161, 161, 162, 162, 162, 162, 162, 162, 163, 163, 163, 163, 163,
  164, 164, 164, 164, 164, 164, 165, 165, 165, 165, 166, 166, 166, 166, 166, 167, 167, 167, 167, 168,
  168, 168, 168, 169, 169, 169, 170, 170, 170, 171, 171, 172, 172, 173, 173, 174, 175, 176, 178, 181,
];

const PHI_TABLE_ROWS = [
  ["0", "0.5000"],
  ["0.25", "0.5987"],
  ["0.5", "0.6915"],
  ["0.7", "0.7580"],
  ["1", "0.8413"],
  ["1.2", "0.8849"],
  ["1.25", "0.8944"],
  ["1.3", "0.9032"],
  ["1.5", "0.9332"],
  ["1.645", "0.9500"],
  ["1.8", "0.9641"],
  ["1.96", "0.9750"],
  ["2", "0.9772"],
  ["2.5", "0.9938"],
  ["3", "0.9987"],
];

const lesson01: LessonSeed = {
  slug: "histograms-to-density-curves",
  title: "5.1 · From Histograms to Density Curves",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/st-5-normal-distribution-and-estimation.mp4",
      poster: "/videos/st-5-normal-distribution-and-estimation.jpg",
      title: "Chapter 5 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Measure the heights of 120 students and draw a histogram. You get a jagged staircase of bars. Now picture measuring 12,000 students, then 12 lakh, with the bins getting narrower each time. The staircase gets finer and finer until it looks like a smooth curve.\n\nThis chapter is about that curve. Once we have it, questions like *what fraction of students are between 150 and 165 cm?* are answered by an **area**, and we no longer need the raw data at all.",
    },
    {
      type: "text",
      content:
        "One adjustment has to come first. In a frequency histogram the bar heights depend on how many students you measured and on how wide the bins are. Double the data and every bar doubles; double the bin width and the bars roughly double too. A curve that is supposed to describe *the shape of the population* cannot depend on either. So we rescale the bars so that each bar's **area** is the *fraction* of the data in that class:",
    },
    {
      type: "math",
      latex:
        "\\text{bar height} = \\frac{\\text{relative frequency}}{\\text{class width}} = \\frac{f}{n \\cdot w} \\qquad\\Longrightarrow\\qquad \\text{bar area} = w \\cdot \\frac{f}{n w} = \\frac{f}{n}",
    },
    {
      type: "text",
      content:
        "This is the **relative-frequency density**. Add up all the bar areas and you get $\\frac{f_1 + f_2 + \\cdots}{n} = \\frac{n}{n} = 1$. That total stays 1 whatever the sample size and whatever the bin width, and that is the property that lets a curve settle down as the bins shrink.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-distribution-builder",
        data: HEIGHTS_120,
        range: { min: 130, max: 190 },
        xLabel: "Height (cm)",
        view: "histogram",
        views: ["histogram", "dotplot"],
        binWidth: 5,
        binStart: 130,
        binSlider: { min: 1, max: 15, step: 1 },
        density: true,
        relative: true,
        curveExpr: "exp(-(x-160)^2/128)/(8*sqrt(2*pi))",
        curveLatex: "f(x) = \\frac{1}{8\\sqrt{2\\pi}}\\,e^{-(x-160)^2/128}",
        stats: ["mean", "sd"],
        editable: false,
        caption:
          "Relative-frequency density histogram of 120 heights. Move the bin-width slider: the bars change, but their total area stays 1 and they keep hugging the same curve.",
      },
    },
    {
      type: "text",
      content:
        "Try very narrow bins (width 1 or 2). With only 120 students the bars get spiky, because each narrow class holds just a few people. The curve is what you would see with narrow bins *and* a huge amount of data. Wide bins (15) go the other way and blur the shape into a few blocks. The density curve is the ideal the histogram is trying to show.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Density curve",
      content:
        "A **density curve** (probability density function) $f(x)$ for a continuous variable $X$ satisfies:\n1. $f(x) \\ge 0$ everywhere (the curve never goes below the axis).\n2. The total area under the curve is exactly 1.\n3. $P(a < X < b)$ = the area under the curve between $a$ and $b$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: reading a bar.** In the histogram above with width-5 bins, the class $[155, 160)$ holds 27 of the 120 students.\n\n**Step 1.** Relative frequency: $\\frac{27}{120} = 0.225$.\n\n**Step 2.** Density (bar height): $\\frac{0.225}{5} = 0.045$ per cm.\n\n**Step 3.** Check: bar area $= 5 \\times 0.045 = 0.225$, the fraction of students in that class.\n\nNotice the units. The height is *proportion per cm*, not a proportion, and that matters in a moment.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: a flat density.** A bus arrives every 20 minutes, and you turn up at a random moment. Your waiting time $X$ is equally likely to be anywhere in $[0, 20]$, so its density is a flat line. For the area to be 1, the rectangle $20 \\times h$ must equal 1, so $h = \\frac{1}{20} = 0.05$.\n\n**Step 1.** $P(5 < X < 12)$ is a rectangle of width 7 and height 0.05.\n\n**Step 2.** Area $= 7 \\times 0.05 = 0.35$.\n\nSo there is a 35% chance you wait between 5 and 12 minutes.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: a sloping density.** Let $f(x) = \\frac{x}{8}$ for $0 \\le x \\le 4$ (and 0 elsewhere).\n\n**Step 1. Is it a density?** It is never negative, and the region under it is a triangle with base 4 and height $\\frac{4}{8} = \\frac12$, so the area is $\\frac12 \\cdot 4 \\cdot \\frac12 = 1$. Yes.\n\n**Step 2.** $P(X < 2)$ is the small triangle with base 2 and height $\\frac{2}{8} = \\frac14$: area $= \\frac12 \\cdot 2 \\cdot \\frac14 = 0.25$.\n\nHalf the interval, but only a quarter of the probability, because the curve is low on the left. Area, not width, is what counts.",
    },
    {
      type: "text",
      content:
        "**Worked example 4: unequal classes (application).** A food-delivery app records 80 delivery times (minutes) in classes of *different* widths:",
    },
    {
      type: "table",
      headers: ["Time (min)", "Frequency $f$", "Width $w$", "Relative freq. $f/n$", "Density $f/(nw)$"],
      rows: [
        ["0–10", "12", "10", "0.150", "0.0150"],
        ["10–15", "18", "5", "0.225", "0.0450"],
        ["15–20", "24", "5", "0.300", "0.0600"],
        ["20–30", "16", "10", "0.200", "0.0200"],
        ["30–50", "10", "20", "0.125", "0.00625"],
      ],
    },
    {
      type: "text",
      content:
        "**Step 1. Compute densities.** Divide each relative frequency by its width, e.g. $\\frac{0.125}{20} = 0.00625$ for the last class.\n\n*Why this step:* a frequency histogram would draw the 30–50 bar at height 10, almost as tall as 0–10, even though its 10 deliveries are spread over 20 minutes. Dividing by width puts every class on the same *per-minute* footing.\n\n**Step 2. Check the total area.** $0.150 + 0.225 + 0.300 + 0.200 + 0.125 = 1$ ✓.\n\n**Step 3. Estimate the fraction delivered in under 18 minutes.** The first two classes are whole: $0.150 + 0.225 = 0.375$. From 15 to 18 we take 3 minutes of the 15–20 bar: $3 \\times 0.06 = 0.18$.",
    },
    { type: "math", latex: "P(X < 18) \\approx 0.150 + 0.225 + 3 \\times 0.060 = 0.555" },
    {
      type: "text",
      content:
        "*Why this step:* inside a bar the density is flat, so a part of the bar carries area in proportion to its width. About 55.5% of deliveries (roughly 44 of the 80) arrive within 18 minutes.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: find the constant (exam style).** A continuous variable has density $f(x) = k$ for $0 \\le x \\le 2$, falling in a straight line from $k$ to 0 as $x$ goes from 2 to 4, and 0 elsewhere. Find $k$, $P(X > 3)$ and $P(1 < X < 3)$.\n\n**Step 1. Total area = 1.** The region is a rectangle ($2 \\times k$) plus a triangle ($\\frac12 \\cdot 2 \\cdot k$):",
    },
    { type: "math", latex: "2k + k = 3k = 1 \\;\\Rightarrow\\; k = \\tfrac13" },
    {
      type: "text",
      content:
        "*Why this step:* the only condition that pins down an unknown constant in a density is that the total area is exactly 1.\n\n**Step 2. $P(X > 3)$.** On $[2, 4]$ the line drops from $\\frac13$ to 0, so at $x = 3$ (halfway) the height is $\\frac16$. The region right of 3 is a triangle: $\\frac12 \\cdot 1 \\cdot \\frac16 = \\frac{1}{12}$.\n\n**Step 3. $P(1 < X < 3)$.** Rectangle from 1 to 2: $1 \\times \\frac13 = \\frac13$. Trapezium from 2 to 3 with parallel sides $\\frac13$ and $\\frac16$: $\\frac12\\left(\\frac13 + \\frac16\\right) \\cdot 1 = \\frac14$. Total $\\frac13 + \\frac14 = \\frac{7}{12}$.\n\n**Check.** $P(X < 1) = \\frac13$, so $\\frac13 + \\frac{7}{12} + \\frac{1}{12} = \\frac{4 + 7 + 1}{12} = 1$ ✓.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The height of the curve is not a probability",
      content:
        "The height $f(x)$ is a *density*: probability per unit of $x$. It can be bigger than 1. If a waiting time is spread evenly over $[0, 0.5]$ hours, the height must be 2, because $0.5 \\times 2 = 1$. A probability of 2 is impossible, so the height cannot be one. Only **areas** under the curve are probabilities.",
    },
    {
      type: "text",
      content:
        "One strange consequence follows. What is the probability that a randomly chosen student is *exactly* 160 cm tall, meaning $160.000\\ldots$ to infinitely many decimal places? That is the area over a single point, a rectangle of width 0:",
    },
    { type: "math", latex: "P(X = 160) = \\text{area of a line} = 0" },
    {
      type: "text",
      content:
        "That does not mean nobody is 160 cm. When we *say* someone is 160 cm, we mean something like $159.5 \\le X < 160.5$, and that interval has positive area. For continuous variables it follows that $P(X < a)$ and $P(X \\le a)$ are equal: adding a single point adds nothing.",
    },
    {
      type: "table",
      headers: ["Histogram (data)", "Density curve (model)"],
      rows: [
        ["Bar area = fraction of the data in the class", "Area between $a$ and $b$ = $P(a < X < b)$"],
        ["Total area of bars = 1", "Total area under curve = 1"],
        ["Bar height = relative frequency ÷ width", "Height $f(x)$ = probability per unit of $x$"],
        ["Changes with every new sample", "Describes the whole population"],
      ],
    },
    {
      type: "quiz",
      id: "st5-1-q1",
      variant: "concept",
      question:
        "A density curve for a waiting time (in hours) is flat at height 2 on the interval $[0, 0.5]$. What does this tell you?",
      options: [
        {
          text: "Nothing is wrong: the area is $0.5 \\times 2 = 1$, and heights are densities, which may exceed 1.",
          correct: true,
          feedback: "Right. Heights are probability *per hour*; only areas are probabilities.",
        },
        {
          text: "It is impossible, because a probability cannot be 2.",
          feedback: "That would be true if the height were a probability. It is a density, and the area under it is exactly 1.",
        },
        {
          text: "Each waiting time has probability 2.",
          feedback: "Any single exact value has probability 0 for a continuous variable. The height is not a probability.",
        },
        {
          text: "The curve must be rescaled to height 1.",
          feedback: "At height 1 the area would be only 0.5, so it would no longer be a valid density.",
        },
      ],
      hint: "Work out the total area under the curve.",
    },
    {
      type: "quiz",
      id: "st5-1-q2",
      variant: "practice",
      question:
        "A waiting time $X$ is spread evenly over $[0, 20]$ minutes. What is $P(4 < X < 9)$?",
      options: [
        { text: "$0.25$", correct: true, feedback: "Width 5 times height $\\frac{1}{20}$ gives $0.25$." },
        { text: "$0.05$", feedback: "That is the height of the density, not the area over the interval." },
        { text: "$0.45$", feedback: "That uses the 9 alone: $\\frac{9}{20}$. You need the area between 4 and 9." },
        { text: "$5$", feedback: "That is the width. Multiply it by the height $0.05$." },
      ],
    },
    {
      type: "quiz",
      id: "st5-1-q3",
      variant: "concept",
      question:
        "Heights are modelled by a continuous density curve. What is $P(X = 160)$, meaning exactly 160 cm?",
      options: [
        {
          text: "0, because the area over a single point is zero.",
          correct: true,
          feedback: "Yes. Only intervals carry probability; a reported height of 160 really means an interval like $[159.5, 160.5)$.",
        },
        {
          text: "The height of the curve at 160.",
          feedback: "The height is a density (probability per cm), not a probability.",
        },
        {
          text: "It cannot be found without the data.",
          feedback: "For any continuous model the answer is the same, whatever the data: a line has no area.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st5-1-q4",
      variant: "practice",
      question:
        "In a relative-frequency density histogram of 200 students' heights, the class $[160, 170)$ has height $0.025$ per cm. How many students are in that class?",
      options: [
        {
          text: "50",
          correct: true,
          feedback: "Area $= 10 \\times 0.025 = 0.25$ of the students, and $0.25 \\times 200 = 50$.",
        },
        { text: "5", feedback: "That is $0.025 \\times 200$. You forgot to multiply by the class width 10 first." },
        { text: "25", feedback: "$0.25$ is the *fraction* in the class; you still need to multiply by 200." },
        { text: "0.25", feedback: "That is the fraction. The question asks for a count." },
      ],
      hint: "Area of the bar = fraction of the data. Then scale by $n$.",
    },
    {
      type: "quiz",
      id: "st5-1-q5",
      variant: "practice",
      question: "With the density $f(x) = \\frac{x}{8}$ on $[0, 4]$, what is $P(X > 2)$?",
      options: [
        { text: "$0.75$", correct: true, feedback: "The total area is 1 and $P(X < 2) = 0.25$, so $P(X > 2) = 1 - 0.25 = 0.75$." },
        { text: "$0.5$", feedback: "That would be true for a flat density. This one is taller on the right." },
        { text: "$0.25$", feedback: "That is $P(X < 2)$, the small triangle on the left." },
        { text: "$\\frac{3}{8}$", feedback: "That is the height at $x = 3$, the middle of the interval, not an area. Height times width 2 gives the trapezium area 0.75." },
      ],
    },
    {
      type: "quiz",
      id: "st5-1-q6",
      variant: "practice",
      question:
        "In the delivery-time table (80 deliveries), the class 30–50 minutes has frequency 10. What is its bar height in a relative-frequency density histogram?",
      options: [
        { text: "$0.00625$ per minute", correct: true, feedback: "$\\frac{10}{80} = 0.125$ of the data, spread over width 20: $\\frac{0.125}{20} = 0.00625$." },
        { text: "$0.125$", feedback: "That is the relative frequency, i.e. the bar's *area*. Divide by the width 20." },
        { text: "$0.5$", feedback: "That is $\\frac{f}{w} = \\frac{10}{20}$. You also need to divide by $n = 80$." },
        { text: "$0.0125$ per minute", feedback: "That divides by a width of 10. The class 30–50 is 20 minutes wide." },
      ],
      hint: "Height = relative frequency ÷ class width.",
    },
    {
      type: "quiz",
      id: "st5-1-q7",
      variant: "practice",
      question: "The density of $X$ is $f(x) = kx$ for $0 \\le x \\le 6$ and 0 elsewhere. What is $k$?",
      options: [
        { text: "$\\frac{1}{18}$", correct: true, feedback: "The region is a triangle with base 6 and height $6k$: $\\frac12 \\cdot 6 \\cdot 6k = 18k = 1$." },
        { text: "$\\frac{1}{36}$", feedback: "That forgets the $\\frac12$ in the triangle's area, which would make the total area only $\\frac12$." },
        { text: "$\\frac{1}{6}$", feedback: "That makes the peak height 1, but the area would then be $\\frac12 \\cdot 6 \\cdot 1 = 3$." },
        { text: "$\\frac{1}{3}$", feedback: "Check the area: $\\frac12 \\cdot 6 \\cdot 2 = 6$, not 1." },
      ],
      hint: "Set the triangle's area equal to 1.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-normal-curve",
  title: "5.2 · The Normal Curve",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "The curve that fitted the heights in 5.1 was not chosen at random. The same bell shape turns up for heights, for measurement errors in a physics practical, for the weight of biscuit packets off a machine, and for the total of many dice. It is the **normal distribution**, and every normal curve is fixed by just two numbers: its centre $\\mu$ and its spread $\\sigma$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The normal distribution N(μ, σ²)",
      content:
        "A continuous variable $X$ is normal with mean $\\mu$ and standard deviation $\\sigma$, written $X \\sim N(\\mu, \\sigma^2)$, if its density is $f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\, e^{-(x-\\mu)^2/(2\\sigma^2)}$.\n\nThe second number in the brackets is the **variance** $\\sigma^2$, so $N(70, 25)$ has $\\sigma = 5$.",
    },
    {
      type: "text",
      content:
        "You do not need to memorise that formula to use the normal distribution. You do need to know what each piece does, so read it from the inside out:\n\n- $(x - \\mu)^2$ measures how far $x$ is from the centre, and squaring makes the curve **symmetric** about $\\mu$.\n- Dividing by $2\\sigma^2$ sets the scale: distance is measured in units of $\\sigma$.\n- $e^{-(\\ldots)}$ is largest (1) at the centre and drops towards 0 very fast as you move away, which gives the thin **tails**.\n- $\\frac{1}{\\sigma\\sqrt{2\\pi}}$ is the constant that makes the total area exactly 1.",
    },
    {
      type: "text",
      content:
        "Start from the **standard normal** $N(0, 1)$, the grey curve below. Slide $m$ (the mean) and $s$ (the SD) and watch what happens.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "exp(-x^2/2)/sqrt(2*pi)",
        baseLatex: "y = \\frac{1}{\\sqrt{2\\pi}}e^{-x^2/2}",
        expr: "exp(-(x-m)^2/(2*s^2))/(s*sqrt(2*pi))",
        exprLatex: "\\frac{1}{s\\sqrt{2\\pi}}e^{-(x-m)^2/(2s^2)}",
        params: [
          { name: "m", min: -3, max: 3, step: 0.5, initial: 0 },
          { name: "s", min: 0.5, max: 2, step: 0.1, initial: 1 },
        ],
        window: { xmin: -6, xmax: 6, ymin: -0.1, ymax: 0.9 },
      },
    },
    {
      type: "text",
      content:
        "Two things to notice:\n\n**$\\mu$ only slides the curve.** The shape is identical; the peak just moves.\n\n**$\\sigma$ trades height for width.** Double $\\sigma$ and the curve spreads twice as wide, so the peak must drop to half its height: the peak height is $\\frac{1}{\\sigma\\sqrt{2\\pi}}$. The area has to stay 1, so a wider curve must be a lower one. At $s = 0.5$ the peak is about $0.8$; at $s = 2$ it is about $0.2$.",
    },
    {
      type: "table",
      headers: ["Property of every normal curve", "Why"],
      rows: [
        ["Symmetric about $\\mu$", "$(x - \\mu)^2$ is the same on both sides"],
        ["Mean = median = mode = $\\mu$", "Symmetry puts the balance point, the halfway point and the peak together"],
        ["Changes from bending down to bending up at $\\mu \\pm \\sigma$", "The points of inflection are one SD from the centre"],
        ["Tails approach the axis but never touch it", "$e^{-(\\ldots)}$ is never 0"],
        ["Total area = 1", "The constant $\\frac{1}{\\sigma\\sqrt{2\\pi}}$ is chosen for this"],
      ],
    },
    {
      type: "text",
      content:
        "Because every normal curve is the same shape, just stretched and shifted, the area within a given number of SDs of the mean is **the same for all of them**. Use the buttons below to shade $\\mu \\pm 1\\sigma$, $\\pm 2\\sigma$ and $\\pm 3\\sigma$ for heights $N(160, 8^2)$.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-normal-sampling-lab",
        mode: "area",
        mu: 160,
        sigma: 8,
        xLabel: "Height (cm)",
        bounds: { a: 152, b: 168 },
        showSigmaPresets: true,
        showZ: false,
        caption:
          "Shade within 1, 2 and 3 SDs of the mean. Then drag the bounds yourself: the shaded area is the proportion of heights in that range.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "The 68–95–99.7 rule",
      content:
        "For any normal distribution:\n- about **68%** of values lie within $\\mu \\pm \\sigma$,\n- about **95%** within $\\mu \\pm 2\\sigma$,\n- about **99.7%** within $\\mu \\pm 3\\sigma$.\n\nThe more precise values are 68.27%, 95.45% and 99.73%.",
    },
    {
      type: "text",
      content:
        "Symmetry turns those three numbers into many more. If 68% lies in $\\mu \\pm \\sigma$, then 34% is on each side of $\\mu$. The remaining 32% is split equally between the two tails, 16% each. Likewise 95% within $2\\sigma$ leaves 2.5% in each tail beyond $2\\sigma$.",
    },
    {
      type: "table",
      headers: ["Region", "Approximate area"],
      rows: [
        ["$\\mu$ to $\\mu + \\sigma$", "34%"],
        ["$\\mu + \\sigma$ to $\\mu + 2\\sigma$", "13.5%"],
        ["$\\mu + 2\\sigma$ to $\\mu + 3\\sigma$", "2.35%"],
        ["beyond $\\mu + 3\\sigma$", "0.15%"],
        ["below $\\mu$ (or above $\\mu$)", "50%"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Heights of students are $N(160, 8^2)$.\n\n(a) *Between 152 and 168 cm?* These are $160 \\pm 8$, i.e. $\\mu \\pm \\sigma$: about **68%**.\n\n(b) *Taller than 176 cm?* $176 = 160 + 2 \\times 8$, i.e. $\\mu + 2\\sigma$. Outside $\\mu \\pm 2\\sigma$ is 5%, half of it above: about **2.5%**.\n\n(c) *Between 144 and 168 cm?* $144 = \\mu - 2\\sigma$ and $168 = \\mu + \\sigma$. Split at $\\mu$: $47.5\\%$ (half of 95%) on the left plus $34\\%$ (half of 68%) on the right, about **81.5%**.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** A machine fills milk packets with volume $X \\sim N(500, 16)$ ml. Note the 16 is the variance, so $\\sigma = 4$ ml.\n\n(a) *Below 496 ml?* $496 = \\mu - \\sigma$. Below $\\mu - \\sigma$ is the left tail: about **16%**.\n\n(b) *Between 488 and 504 ml?* $488 = \\mu - 3\\sigma$, $504 = \\mu + \\sigma$. That is $49.85\\% + 34\\% \\approx$ **83.85%**.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: from percentages to counts (application).** A company tests 1000 phones. Battery life on a full charge is $N(20, 2^2)$ hours. How many phones should last between 16 and 22 hours, and how many less than 16?\n\n**Step 1. Locate the bounds in SD units.** $16 = 20 - 2 \\times 2 = \\mu - 2\\sigma$ and $22 = 20 + 2 = \\mu + \\sigma$.\n\n*Why this step:* the 68–95–99.7 rule speaks only in SDs from the mean, so every bound must be translated into that language first.\n\n**Step 2. Split at the mean.** Left part: half of 95% $= 47.5\\%$. Right part: half of 68% $= 34\\%$. Total $81.5\\%$.\n\n**Step 3. Convert to counts.** $0.815 \\times 1000 = 815$ phones last 16 to 22 hours. Below 16 is the lower tail beyond $2\\sigma$: $2.5\\%$, i.e. about **25 phones**.",
    },
    {
      type: "text",
      content:
        "**Worked example 4: finding $\\mu$ and $\\sigma$ (exam style).** In a normal distribution, 16% of values lie above 72 and 2.5% lie below 48. Using the 68–95–99.7 rule, find $\\mu$ and $\\sigma$.\n\n**Step 1. Read each tail.** 16% in one upper tail is the tail beyond $\\mu + \\sigma$, so $72 = \\mu + \\sigma$. 2.5% in the lower tail is the tail beyond $\\mu - 2\\sigma$, so $48 = \\mu - 2\\sigma$.\n\n*Why this step:* each percentage fixes *how many SDs* the value is from the mean, and the side of the tail fixes the sign.\n\n**Step 2. Solve the pair.**",
    },
    {
      type: "math",
      latex: "(\\mu + \\sigma) - (\\mu - 2\\sigma) = 72 - 48 \\;\\Rightarrow\\; 3\\sigma = 24 \\;\\Rightarrow\\; \\sigma = 8,\\quad \\mu = 64",
    },
    {
      type: "text",
      content:
        "**Check.** $64 + 8 = 72$ ✓ and $64 - 16 = 48$ ✓. The distribution is $N(64, 8^2)$.",
    },
    {
      type: "text",
      content:
        "**Where does the bell come from?** Think of a quantity built up from many small, independent pushes, some up and some down. Your height depends on hundreds of genes plus nutrition, sleep and more, each adding or subtracting a little. It is rare for almost all the pushes to go the same way, so extreme totals are rare, and most totals land near the middle. Add up enough small independent effects and the bell shape appears almost whatever the individual effects look like. You will see this happen for sample means in 5.5.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Not all data are normal",
      content:
        "The normal curve is a *model*, and plenty of real data do not fit it. **Incomes** are strongly right-skewed (a long tail of very high earners). **Waiting times** cannot be negative and pile up near 0. **Marks on an easy test** bunch up against the maximum. Before using the normal table, look at the data: a roughly symmetric, single-peaked histogram is the minimum requirement.",
    },
    {
      type: "quiz",
      id: "st5-2-q1",
      variant: "concept",
      question: "Which statement about real data is correct?",
      options: [
        {
          text: "Many variables are roughly normal, but many are not, e.g. household incomes are strongly right-skewed.",
          correct: true,
          feedback: "Yes. The normal curve is a model that fits some data well, and you should check the shape before using it.",
        },
        {
          text: "All data become normal if you collect enough of them.",
          feedback: "More data just shows the true shape more clearly. Incomes stay skewed however many you collect. (It is *sample means* that become normal, as 5.5 shows.)",
        },
        {
          text: "Any data with a mean and an SD are normal.",
          feedback: "Every data set has a mean and an SD. Being normal is about the *shape*.",
        },
        {
          text: "Data are normal whenever mean = median.",
          feedback: "Symmetric data can still be far from normal, e.g. a flat (uniform) or two-peaked shape.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st5-2-q2",
      variant: "practice",
      question: "$X \\sim N(50, 5^2)$. About what percentage of values lie between 40 and 60?",
      options: [
        { text: "95%", correct: true, feedback: "$40$ and $60$ are $\\mu \\pm 2\\sigma$." },
        { text: "68%", feedback: "That is $\\mu \\pm \\sigma$, which is 45 to 55." },
        { text: "99.7%", feedback: "That is $\\mu \\pm 3\\sigma$, which is 35 to 65." },
        { text: "47.5%", feedback: "That is only one half, from 50 to 60." },
      ],
    },
    {
      type: "quiz",
      id: "st5-2-q3",
      variant: "practice",
      question: "Heights are $N(160, 8^2)$. About what percentage of students are taller than 168 cm?",
      options: [
        { text: "16%", correct: true, feedback: "$168 = \\mu + \\sigma$. The two tails outside $\\mu \\pm \\sigma$ hold 32%, so one tail holds 16%." },
        { text: "32%", feedback: "That is both tails together. Only the upper one counts." },
        { text: "34%", feedback: "That is the area from 160 to 168, the part *below* 168 and above the mean." },
        { text: "68%", feedback: "That is the middle band, not a tail." },
      ],
    },
    {
      type: "quiz",
      id: "st5-2-q4",
      variant: "concept",
      question: "When $\\sigma$ increases (and $\\mu$ stays fixed), what happens to the normal curve?",
      options: [
        {
          text: "It gets wider and lower, because the total area must stay 1.",
          correct: true,
          feedback: "Right. The peak height is $\\frac{1}{\\sigma\\sqrt{2\\pi}}$, so it falls as $\\sigma$ grows.",
        },
        { text: "It gets wider and keeps the same peak height.", feedback: "Then the area would grow above 1." },
        { text: "It moves to the right.", feedback: "Moving the curve is $\\mu$'s job. $\\sigma$ changes only the spread." },
        { text: "It gets taller and narrower.", feedback: "That is what a *smaller* $\\sigma$ does." },
      ],
    },
    {
      type: "quiz",
      id: "st5-2-q5",
      variant: "practice",
      question: "$X \\sim N(70, 25)$. Between which values do about 99.7% of observations lie?",
      options: [
        { text: "55 and 85", correct: true, feedback: "$\\sigma = \\sqrt{25} = 5$, and $70 \\pm 3 \\times 5$ gives 55 to 85." },
        { text: "-5 and 145", feedback: "That treats 25 as the SD. In $N(\\mu, \\sigma^2)$ the second number is the variance." },
        { text: "60 and 80", feedback: "That is $\\mu \\pm 2\\sigma$, about 95%." },
        { text: "65 and 75", feedback: "That is $\\mu \\pm \\sigma$, about 68%." },
      ],
      hint: "The second number in $N(\\mu, \\sigma^2)$ is the variance.",
    },
    {
      type: "quiz",
      id: "st5-2-q6",
      variant: "practice",
      question:
        "Rice grain lengths are $N(6, 0.25)$ mm. In a batch of 2000 grains, about how many are longer than 7 mm?",
      options: [
        { text: "About 50", correct: true, feedback: "$\\sigma = \\sqrt{0.25} = 0.5$, so $7 = \\mu + 2\\sigma$. One tail beyond $2\\sigma$ holds 2.5%, and $0.025 \\times 2000 = 50$." },
        { text: "About 100", feedback: "That is 5%, both tails beyond $2\\sigma$. Only the upper tail counts." },
        { text: "About 320", feedback: "That is 16%, the tail beyond $\\mu + \\sigma$. Here 7 is two SDs above the mean." },
        { text: "Almost none", feedback: "That treats 0.25 as the SD, putting 7 four SDs above the mean. 0.25 is the variance." },
      ],
      hint: "Find $\\sigma$ first: the second number is the variance.",
    },
    {
      type: "quiz",
      id: "st5-2-q7",
      variant: "practice",
      question:
        "In a normal distribution, 2.5% of values lie above 90 and 16% lie below 60. Using the 68–95–99.7 rule, find $\\mu$ and $\\sigma$.",
      options: [
        { text: "$\\mu = 70$, $\\sigma = 10$", correct: true, feedback: "$90 = \\mu + 2\\sigma$ and $60 = \\mu - \\sigma$. Subtracting gives $3\\sigma = 30$." },
        { text: "$\\mu = 80$, $\\sigma = 10$", feedback: "That swaps the tails: it puts 90 at $\\mu + \\sigma$ and 60 at $\\mu - 2\\sigma$. Check: 2.5% above means two SDs." },
        { text: "$\\mu = 75$, $\\sigma = 15$", feedback: "That puts both values one SD from the mean. 2.5% in a tail means $2\\sigma$." },
        { text: "$\\mu = 75$, $\\sigma = 7.5$", feedback: "That puts both values two SDs from the mean. 16% in a tail means only $1\\sigma$." },
      ],
      hint: "2.5% in one tail ↔ $2\\sigma$; 16% in one tail ↔ $1\\sigma$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "standard-normal-table",
  title: "5.3 · Standardising: The Standard Normal Table",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "The 68–95–99.7 rule only works for whole numbers of SDs. What fraction of students are shorter than 170 cm, when that is $1.25\\sigma$ above the mean? We need areas for *any* position, and nobody could print a table for every possible $\\mu$ and $\\sigma$. We do not need to: one table does the job for every normal distribution.",
    },
    {
      type: "text",
      content:
        "The idea is the z-score from 3.4. Measure each value by how many SDs it sits from the mean:",
    },
    { type: "math", latex: "z = \\frac{x - \\mu}{\\sigma}" },
    {
      type: "text",
      content:
        "Subtracting $\\mu$ slides the curve so its centre is at 0. Dividing by $\\sigma$ rescales it so its SD is 1. Both steps just relabel the axis. The shape does not change and neither does any area. So if $X \\sim N(\\mu, \\sigma^2)$, then $Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1)$, and",
    },
    { type: "math", latex: "P(X < x) = P\\!\\left(Z < \\frac{x - \\mu}{\\sigma}\\right)" },
    {
      type: "callout",
      variant: "definition",
      title: "The function Φ(z)",
      content:
        "$\\Phi(z) = P(Z < z)$ is the area under the standard normal curve to the **left** of $z$. Tables list it for $z \\ge 0$. Since the whole area is 1, $\\Phi(z)$ is always between 0 and 1, with $\\Phi(0) = 0.5$.",
    },
    {
      type: "table",
      headers: ["$z$", "$\\Phi(z)$"],
      rows: PHI_TABLE_ROWS,
    },
    {
      type: "text",
      content:
        "Every other area comes from this left-area table plus two facts: the total area is 1, and the curve is symmetric about 0. The area to the left of $-z$ is a mirror image of the area to the right of $+z$.",
    },
    {
      type: "table",
      headers: ["You want", "Use", "Reason"],
      rows: [
        ["$P(Z < z)$", "$\\Phi(z)$", "definition"],
        ["$P(Z > z)$", "$1 - \\Phi(z)$", "total area 1"],
        ["$P(Z < -z)$", "$\\Phi(-z) = 1 - \\Phi(z)$", "symmetry: left tail at $-z$ equals right tail at $z$"],
        ["$P(a < Z < b)$", "$\\Phi(b) - \\Phi(a)$", "left of $b$ minus left of $a$"],
        ["$P(-z < Z < z)$", "$2\\Phi(z) - 1$", "$\\Phi(z) - (1 - \\Phi(z))$"],
      ],
    },
    {
      type: "interactive",
      config: {
        component: "stats-normal-sampling-lab",
        mode: "area",
        mu: 62,
        sigma: 10,
        xLabel: "Exam marks",
        bounds: { a: 55, b: 80 },
        showZ: true,
        caption:
          "Marks N(62, 10²). The lab converts each bound to z, looks up Φ, and subtracts. Toggle a = −∞ or b = +∞ to get one-sided areas.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1: heights.** $X \\sim N(160, 8^2)$. Find $P(X < 170)$.\n\n**Step 1. Standardise.** $z = \\frac{170 - 160}{8} = 1.25$.\n\n**Step 2. Look up.** $\\Phi(1.25) = 0.8944$.\n\n**Step 3. Interpret.** About 89.4% of students are shorter than 170 cm.\n\nAnd $P(150 < X < 170)$? The lower bound gives $z = \\frac{150 - 160}{8} = -1.25$, so the interval is symmetric: $2\\Phi(1.25) - 1 = 2(0.8944) - 1 = 0.7888$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: exam marks.** $X \\sim N(62, 10^2)$.\n\n(a) *Fail mark below 50.* $z = \\frac{50 - 62}{10} = -1.2$. The table has no negative $z$, so use symmetry: $\\Phi(-1.2) = 1 - \\Phi(1.2) = 1 - 0.8849 = 0.1151$. About 11.5% fail.\n\n(b) *Between 55 and 80.* $z_a = \\frac{55 - 62}{10} = -0.7$ and $z_b = \\frac{80 - 62}{10} = 1.8$, so",
    },
    {
      type: "math",
      latex: "P = \\Phi(1.8) - \\Phi(-0.7) = 0.9641 - (1 - 0.7580) = 0.9641 - 0.2420 = 0.7221",
    },
    {
      type: "text",
      content: "About 72% score between 55 and 80, which matches the lab.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: component lifetimes.** Bulbs last $X \\sim N(1200, 150^2)$ hours, and a batch has 5000 bulbs.\n\n**Step 1.** Lasting more than 1500 h: $z = \\frac{1500 - 1200}{150} = 2$, so $P = 1 - \\Phi(2) = 1 - 0.9772 = 0.0228$.\n\n**Step 2.** Expected number: $0.0228 \\times 5000 = 114$ bulbs.\n\n**Step 3.** Between 900 and 1500 h: $z = \\pm 2$, so $P = 2\\Phi(2) - 1 = 0.9544$. That is the precise version of the rule's 95%.",
    },
    {
      type: "text",
      content:
        "**Worked example 4: a count between two values (routine).** 1000 students take a test with marks $N(62, 10^2)$. How many score between 67 and 82?\n\n**Step 1. Standardise both bounds.** $z_a = \\frac{67 - 62}{10} = 0.5$ and $z_b = \\frac{82 - 62}{10} = 2$.\n\n**Step 2. Subtract left areas.** $\\Phi(2) - \\Phi(0.5) = 0.9772 - 0.6915 = 0.2857$.\n\n*Why this step:* $\\Phi(2)$ is everything left of 82; removing everything left of 67 leaves exactly the band between them.\n\n**Step 3. Scale up.** $0.2857 \\times 1000 = 285.7$, so about **286 students**.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: which machine underfills more? (application).** Machine A fills packets $N(500, 4^2)$ g; machine B fills $N(504, 6^2)$ g. A packet under 495 g is rejected. Which machine rejects a larger fraction?\n\n**Step 1. Machine A.** $z = \\frac{495 - 500}{4} = -1.25$, so $P = \\Phi(-1.25) = 1 - 0.8944 = 0.1056$.\n\n**Step 2. Machine B.** $z = \\frac{495 - 504}{6} = -1.5$, so $P = 1 - 0.9332 = 0.0668$.\n\n*Why this step:* raw distances mislead. 495 is 5 g below A's mean but 9 g below B's; B is more variable, yet in *SD units* 495 is further out for B ($1.5\\sigma$ against $1.25\\sigma$).\n\n**Step 3. Conclude.** A rejects about 10.6%, B about 6.7%. The less consistent machine wins here, because its higher mean more than makes up for its spread.",
    },
    {
      type: "text",
      content:
        "**Worked example 6: a conditional probability (exam style).** Marks are $N(62, 10^2)$. A student is known to have scored above the mean. What is the probability that the student scored above 80?\n\n**Step 1. Write the conditional probability.** Scoring above 80 already implies scoring above 62, so the \"and\" event is just $X > 80$:",
    },
    {
      type: "math",
      latex: "P(X > 80 \\mid X > 62) = \\frac{P(X > 80)}{P(X > 62)} = \\frac{1 - \\Phi(1.8)}{0.5} = \\frac{0.0359}{0.5} = 0.0718",
    },
    {
      type: "text",
      content:
        "*Why this step:* knowing the student is above the mean shrinks the whole world to the right half of the curve, whose area is 0.5. Dividing by 0.5 rescales that half to total 1.\n\n**Step 2. Interpret.** Unconditionally about 3.6% score above 80; among those above the mean it is about 7.2%, exactly double.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Always sketch first",
      content:
        "Draw a quick bell, mark $\\mu$ and your value, and shade the region you want. Before touching the table you will know whether the answer is more or less than 0.5, which catches most sign errors.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A negative z does not give a negative probability",
      content:
        "A negative $z$ only says the value is *below the mean*. $\\Phi(-1.2) = 0.1151$: a small positive area, less than 0.5 because the value is left of centre. Every $\\Phi$ value is an area, so it is always between 0 and 1.",
    },
    {
      type: "quiz",
      id: "st5-3-q1",
      variant: "concept",
      question: "Given $\\Phi(0.5) = 0.6915$, what is $\\Phi(-0.5)$?",
      options: [
        {
          text: "$0.3085$",
          correct: true,
          feedback: "$1 - 0.6915 = 0.3085$. Positive and below 0.5, because $-0.5$ is left of the centre.",
        },
        { text: "$-0.6915$", feedback: "$\\Phi$ is an area, and areas cannot be negative. A negative $z$ just means below the mean." },
        { text: "$0.6915$", feedback: "That is the area left of $+0.5$. The area left of $-0.5$ must be less than half." },
        { text: "$-0.3085$", feedback: "The size is right but areas are never negative." },
      ],
    },
    {
      type: "quiz",
      id: "st5-3-q2",
      variant: "practice",
      question: "Heights are $N(160, 8^2)$. Using $\\Phi(1.5) = 0.9332$, find the proportion taller than 172 cm.",
      options: [
        { text: "$0.0668$", correct: true, feedback: "$z = \\frac{172 - 160}{8} = 1.5$, and $1 - 0.9332 = 0.0668$." },
        { text: "$0.9332$", feedback: "That is the proportion *shorter* than 172 cm." },
        { text: "$0.4332$", feedback: "That is the area between 160 and 172 cm." },
        { text: "$0.1336$", feedback: "That is both tails beyond $\\pm 1.5$. Only the upper tail counts." },
      ],
    },
    {
      type: "quiz",
      id: "st5-3-q3",
      variant: "practice",
      question:
        "Marks are $N(62, 10^2)$. Using $\\Phi(1.3) = 0.9032$, what proportion score at least 75?",
      options: [
        { text: "$0.0968$", correct: true, feedback: "$z = 1.3$, and $1 - 0.9032 = 0.0968$. For a continuous variable, \"at least\" and \"more than\" give the same area." },
        { text: "$0.9032$", feedback: "That is the proportion below 75." },
        { text: "$0.4032$", feedback: "That is between the mean and 75." },
        { text: "$0.1587$", feedback: "That is $1 - \\Phi(1)$, as if 75 were exactly one SD above the mean. It is 1.3 SDs above: $\\frac{75 - 62}{10} = 1.3$." },
      ],
    },
    {
      type: "quiz",
      id: "st5-3-q4",
      variant: "practice",
      question:
        "$X \\sim N(40, 5^2)$. Using $\\Phi(1) = 0.8413$ and $\\Phi(2) = 0.9772$, find $P(35 < X < 50)$.",
      options: [
        {
          text: "$0.8185$",
          correct: true,
          feedback: "$z$-values $-1$ and $2$: $\\Phi(2) - \\Phi(-1) = 0.9772 - 0.1587 = 0.8185$.",
        },
        { text: "$0.1359$", feedback: "That is $\\Phi(2) - \\Phi(1)$. The lower bound gives $z = -1$, not $+1$." },
        { text: "$1.8185$", feedback: "A probability cannot exceed 1. You added $\\Phi(2)$ and $\\Phi(1)$." },
        { text: "$0.6826$", feedback: "That is $\\mu \\pm \\sigma$, which only goes up to 45." },
      ],
      hint: "Standardise both bounds, then subtract the left areas.",
    },
    {
      type: "quiz",
      id: "st5-3-q5",
      variant: "concept",
      question: "Without a table: if $z_1 < z_2$, which is certainly true?",
      options: [
        {
          text: "$\\Phi(z_1) < \\Phi(z_2)$",
          correct: true,
          feedback: "Moving the right edge further right can only add area, so $\\Phi$ increases with $z$.",
        },
        { text: "$\\Phi(z_1) + \\Phi(z_2) = 1$", feedback: "That holds only when $z_1 = -z_2$." },
        { text: "$\\Phi(z_1)$ is negative", feedback: "No $\\Phi$ value is ever negative." },
      ],
    },
    {
      type: "quiz",
      id: "st5-3-q6",
      variant: "practice",
      question:
        "Bulb lifetimes are $N(1200, 150^2)$ hours. In a batch of 800 bulbs, about how many last between 1125 and 1500 hours? (Use $\\Phi(0.5) = 0.6915$, $\\Phi(2) = 0.9772$.)",
      options: [
        { text: "About 535", correct: true, feedback: "$z$-values $-0.5$ and $2$: $0.9772 - (1 - 0.6915) = 0.9772 - 0.3085 = 0.6687$, and $0.6687 \\times 800 \\approx 535$." },
        { text: "About 229", feedback: "That uses $\\Phi(2) - \\Phi(0.5)$. The lower bound is *below* the mean, so $z = -0.5$." },
        { text: "About 782", feedback: "That is $\\Phi(2) \\times 800$, everything below 1500. You still need to remove the bulbs below 1125." },
        { text: "0.6687", feedback: "That is the proportion. The question asks how many of the 800 bulbs." },
      ],
      hint: "Standardise both bounds, subtract the left areas, then multiply by 800.",
    },
    {
      type: "quiz",
      id: "st5-3-q7",
      variant: "practice",
      question:
        "Heights are $N(160, 8^2)$. Given that a student is taller than 160 cm, what is the probability that the student is taller than 172 cm? (Use $\\Phi(1.5) = 0.9332$.)",
      options: [
        { text: "$0.1336$", correct: true, feedback: "$\\frac{P(X > 172)}{P(X > 160)} = \\frac{0.0668}{0.5} = 0.1336$." },
        { text: "$0.0668$", feedback: "That is the unconditional probability. Knowing the student is above 160 restricts attention to half the curve." },
        { text: "$0.0334$", feedback: "That multiplies by 0.5 instead of dividing by it." },
        { text: "$0.8664$", feedback: "That is the chance of being between 160 and 172, given above 160." },
      ],
      hint: "$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$, and here $A$ is inside $B$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "working-backwards",
  title: "5.4 · Working Backwards: From Proportion to Value",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "In 5.3 we went from a value to a proportion. Often the question runs the other way. *The top 10% get an A: what mark do you need?* *A company wants only 2.5% of packets to be underweight: how consistent must the machine be?* Now we know the area and want the boundary.",
    },
    {
      type: "text",
      content: "Run the chain from 5.3 in reverse:",
    },
    {
      type: "math",
      latex:
        "\\text{area} \\;\\xrightarrow{\\text{table, backwards}}\\; z \\;\\xrightarrow{\\;x = \\mu + z\\sigma\\;}\\; x",
    },
    {
      type: "text",
      content:
        "The second arrow is just $z = \\frac{x - \\mu}{\\sigma}$ solved for $x$. For the first, look inside the table for the area and read off the $z$ next to it. These values come up so often that they are worth knowing:",
    },
    {
      type: "table",
      headers: ["Area to the left, $\\Phi(z)$", "$z$"],
      rows: [
        ["0.75", "0.674"],
        ["0.80", "0.842"],
        ["0.90", "1.282"],
        ["0.95", "1.645"],
        ["0.975", "1.960"],
        ["0.99", "2.326"],
        ["0.995", "2.576"],
      ],
    },
    {
      type: "text",
      content:
        "Try the challenge. Marks are $N(62, 10^2)$. Drag the right bound until exactly 90% of the area is shaded to its left. That bound is the cut-off for the top 10%.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-normal-sampling-lab",
        mode: "area",
        mu: 62,
        sigma: 10,
        xLabel: "Exam marks",
        bounds: { a: null, b: 70 },
        targetArea: 0.9,
        caption:
          "Drag b until the shaded area to its left is 0.90. When you hit it, the lab shows b = μ + zσ.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1: the top 10%.** Marks are $N(62, 10^2)$ and the top 10% get an A.\n\n**Step 1. Sketch.** The cut-off $c$ has 10% above it, so 90% below: $\\Phi(z) = 0.90$.\n\n**Step 2. Table backwards.** $z = 1.282$.\n\n**Step 3. Unstandardise.** $c = 62 + 1.282 \\times 10 = 74.82$.\n\nYou need about **75 marks** for an A, far below 90.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The top-10% cut-off is not 90% of the maximum",
      content:
        "\"Top 10%\" is about *people*, not about *marks*. It means 10% of the **area**, and where that boundary falls depends on $\\mu$ and $\\sigma$. On a hard paper ($\\mu = 62$, $\\sigma = 10$) the top 10% starts near 75 out of 100. On an easy paper with $\\mu = 80$, $\\sigma = 5$ it would start near $80 + 1.282 \\times 5 \\approx 86.4$. Either way, 90 plays no special role.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: a lower tail.** Heights are $N(160, 8^2)$. A school checks on the shortest 5% for nutrition. Where is the cut-off?\n\n**Step 1.** 5% below, so $\\Phi(z) = 0.05$. That is below 0.5, so $z$ is **negative**.\n\n**Step 2.** By symmetry, it is the mirror of $\\Phi(1.645) = 0.95$: $z = -1.645$.\n\n**Step 3.** $c = 160 + (-1.645)(8) = 160 - 13.16 = 146.84$ cm.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: the middle 50%.** For heights $N(160, 8^2)$, the quartiles have 25% and 75% to their left, so $z = \\mp 0.674$:",
    },
    {
      type: "math",
      latex: "Q_1 = 160 - 0.674 \\times 8 \\approx 154.6, \\qquad Q_3 = 160 + 0.674 \\times 8 \\approx 165.4",
    },
    {
      type: "text",
      content:
        "The IQR is $2 \\times 0.674\\sigma \\approx 1.35\\sigma \\approx 10.8$ cm. For normal data, IQR $\\approx 1.35\\sigma$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4: an unknown $\\sigma$.** A machine fills bottles with mean 500 ml. The company wants only 2.5% of bottles below 490 ml. What SD can it allow?\n\n**Step 1.** 2.5% below 490 gives $z = -1.96$.\n\n**Step 2.** $\\frac{490 - 500}{\\sigma} = -1.96$, so $\\sigma = \\frac{10}{1.96} \\approx 5.10$ ml.\n\nThe machine's SD must be at most about 5.1 ml.",
    },
    {
      type: "text",
      content:
        "**Worked example 4b: an unknown $\\mu$.** A machine fills bags of sugar with $\\sigma = 3$ g. Only 5% of bags may weigh under 250 g. What mean should the machine be set to?\n\n**Step 1.** 5% below 250 means 250 is below the mean, so $z = -1.645$.\n\n**Step 2.** $\\frac{250 - \\mu}{3} = -1.645$, so $250 - \\mu = -4.935$.\n\n**Step 3.** $\\mu = 250 + 4.935 \\approx 254.9$ g.\n\nThe mean must sit about $1.645\\sigma$ above the limit so that only the thin left tail falls below it.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: unknown $\\mu$ and $\\sigma$.** In a normal distribution, 31% of items are below 45 and 8% are above 64. Find $\\mu$ and $\\sigma$. (Table: $\\Phi(0.5) \\approx 0.69$, $\\Phi(1.4) \\approx 0.92$.)\n\n**Step 1. Below 45.** 31% is less than half, so 45 is below the mean. $\\Phi(-z) = 0.31$ means $\\Phi(z) = 0.69$, so $z = -0.5$:",
    },
    {
      type: "math",
      latex: "\\frac{45 - \\mu}{\\sigma} = -0.5 \\;\\Rightarrow\\; \\mu - 0.5\\sigma = 45",
    },
    {
      type: "text",
      content: "**Step 2. Above 64.** 8% above means 92% below, so $z = 1.4$:",
    },
    {
      type: "math",
      latex: "\\frac{64 - \\mu}{\\sigma} = 1.4 \\;\\Rightarrow\\; \\mu + 1.4\\sigma = 64",
    },
    {
      type: "text",
      content:
        "**Step 3. Subtract.** $1.9\\sigma = 19$, so $\\sigma = 10$ and $\\mu = 45 + 5 = 50$.\n\n**Check.** $\\frac{45 - 50}{10} = -0.5$ ✓ and $\\frac{64 - 50}{10} = 1.4$ ✓.",
    },
    {
      type: "text",
      content:
        "**Worked example 6: a scholarship cut-off (application).** 5000 candidates sit an entrance test with scores $N(480, 60^2)$. There are 125 scholarships for the top scorers. What score guarantees one?\n\n**Step 1. Turn the count into an area.** $\\frac{125}{5000} = 0.025$, so 2.5% lie above the cut-off and 97.5% below: $\\Phi(z) = 0.975$.\n\n*Why this step:* the table works with proportions, not head-counts, so the first job is always to divide by the total.\n\n**Step 2. Table backwards.** $z = 1.96$.\n\n**Step 3. Unstandardise.** $c = 480 + 1.96 \\times 60 = 480 + 117.6 = 597.6$. A score of about **598** secures a scholarship.",
    },
    {
      type: "text",
      content:
        "**Worked example 7: a two-sided tolerance (exam style).** Bolts must have diameter $20 \\pm 0.5$ mm; anything outside is rejected. The machine is centred at 20 mm. What is the largest $\\sigma$ that keeps rejects to at most 1%?\n\n**Step 1. Split the reject rate.** Rejects come from *both* tails, and by symmetry they share equally: 0.5% below 19.5 and 0.5% above 20.5.\n\n*Why this step:* forgetting that there are two tails is the classic slip here. Using 1% in one tail would give $z = 2.326$ and a machine that actually rejects 2%.\n\n**Step 2. Table backwards.** 0.5% above means $\\Phi(z) = 0.995$, so $z = 2.576$.\n\n**Step 3. Solve for $\\sigma$.**",
    },
    {
      type: "math",
      latex: "\\frac{20.5 - 20}{\\sigma} = 2.576 \\;\\Rightarrow\\; \\sigma = \\frac{0.5}{2.576} \\approx 0.194 \\text{ mm}",
    },
    {
      type: "text",
      content:
        "The machine's SD must be at most about 0.19 mm. A tighter tolerance or a lower reject rate both force a smaller $\\sigma$, i.e. a more precise (and more expensive) machine.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Signs decide everything",
      content:
        "When you convert a proportion to $z$, first ask whether the value is below or above the mean. Below the mean means $z < 0$. Getting this sign wrong in a two-equation problem gives nonsense such as a negative $\\sigma$, which is a useful warning.",
    },
    {
      type: "quiz",
      id: "st5-4-q1",
      variant: "concept",
      question:
        "Marks out of 100 are $N(62, 10^2)$. A student says: \"The top 10% must be everyone scoring 90 or more.\" What is wrong?",
      options: [
        {
          text: "\"Top 10%\" means 10% of the students (area), so the cut-off is $62 + 1.282 \\times 10 \\approx 75$.",
          correct: true,
          feedback: "Exactly. The cut-off is a percentile of the distribution, not a percentage of the maximum.",
        },
        {
          text: "Nothing; 90 is 90% of 100.",
          feedback: "That is 90% of the maximum *mark*. Almost nobody scores 90 here: it is $2.8\\sigma$ above the mean.",
        },
        {
          text: "The cut-off should be $0.9 \\times 62 = 55.8$.",
          feedback: "That is 90% of the mean, which also has nothing to do with the top 10% of students.",
        },
        {
          text: "The cut-off is $62 + 10 = 72$.",
          feedback: "That is $\\mu + \\sigma$, which leaves about 16% above it, not 10%.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st5-4-q2",
      variant: "practice",
      question: "Heights are $N(160, 8^2)$. Above what height are the tallest 5% of students?",
      options: [
        { text: "About 173.2 cm", correct: true, feedback: "$160 + 1.645 \\times 8 = 173.16$." },
        { text: "About 146.8 cm", feedback: "That is the cut-off for the *shortest* 5%." },
        { text: "About 175.7 cm", feedback: "That uses $z = 1.96$, which leaves 2.5% above, not 5%." },
        { text: "168 cm", feedback: "That is $\\mu + \\sigma$, which leaves about 16% above." },
      ],
    },
    {
      type: "quiz",
      id: "st5-4-q3",
      variant: "practice",
      question:
        "A test has mean 70, and 97.5% of students score below 89.6. Assuming normality, what is $\\sigma$?",
      options: [
        { text: "10", correct: true, feedback: "97.5% below gives $z = 1.96$, so $\\sigma = \\frac{89.6 - 70}{1.96} = 10$." },
        { text: "19.6", feedback: "That is $x - \\mu$. Divide by $z = 1.96$." },
        { text: "9.8", feedback: "That uses $z = 2$. For exactly 97.5% the table gives 1.96." },
        { text: "11.9", feedback: "That uses $z = 1.645$, which is for 95% below." },
      ],
    },
    {
      type: "quiz",
      id: "st5-4-q7",
      variant: "practice",
      question:
        "Packets of rice have $\\sigma = 3$ g. The packer wants only 5% of packets under 250 g. What should the mean weight be set to?",
      options: [
        { text: "About 254.9 g", correct: true, feedback: "$z = -1.645$, so $\\frac{250 - \\mu}{3} = -1.645$ and $\\mu = 250 + 4.935 \\approx 254.9$ g." },
        { text: "About 246.1 g", feedback: "Sign error. With the mean below 250, more than half the packets would be underweight. 250 must be *below* the mean." },
        { text: "About 255.9 g", feedback: "That uses $z = 1.96$, which leaves 2.5% below, not 5%." },
        { text: "253 g", feedback: "That is $250 + \\sigma$, which leaves about 16% below 250." },
      ],
      hint: "5% below 250 means $\\frac{250 - \\mu}{\\sigma} = -1.645$.",
    },
    {
      type: "quiz",
      id: "st5-4-q4",
      variant: "practice",
      question: "Packets weigh $N(500, 4^2)$ grams. Between which weights does the middle 95% lie?",
      options: [
        { text: "492.16 g and 507.84 g", correct: true, feedback: "$500 \\pm 1.96 \\times 4 = 500 \\pm 7.84$." },
        { text: "493.42 g and 506.58 g", feedback: "That uses 1.645, which captures only the middle 90%." },
        { text: "496 g and 504 g", feedback: "That is $\\mu \\pm \\sigma$, about 68%." },
        { text: "480 g and 520 g", feedback: "That is $\\mu \\pm 5\\sigma$, essentially everything." },
      ],
    },
    {
      type: "quiz",
      id: "st5-4-q5",
      variant: "practice",
      question:
        "In a normal distribution, 15.87% of values are below 40 and 2.28% are above 70. (Table: $\\Phi(1) = 0.8413$, $\\Phi(2) = 0.9772$.) Find $\\mu$ and $\\sigma$.",
      options: [
        {
          text: "$\\mu = 50$, $\\sigma = 10$",
          correct: true,
          feedback: "$\\mu - \\sigma = 40$ and $\\mu + 2\\sigma = 70$. Subtracting gives $3\\sigma = 30$.",
        },
        { text: "$\\mu = 55$, $\\sigma = 15$", feedback: "That puts 40 and 70 at $z = \\pm 1$, but 2.28% above means $z = 2$." },
        { text: "$\\mu = 60$, $\\sigma = 5$", feedback: "Check: $\\frac{40 - 60}{5} = -4$, far too extreme for 15.87%." },
        { text: "$\\mu = 45$, $\\sigma = 12.5$", feedback: "Check it: $\\frac{40 - 45}{12.5} = -0.4$, which does not give 15.87%." },
      ],
      hint: "15.87% below means $z = -1$; 2.28% above means $z = 2$.",
    },
    {
      type: "quiz",
      id: "st5-4-q6",
      variant: "concept",
      question: "To find the value with 20% of the distribution below it, which $z$ do you use?",
      options: [
        { text: "$z = -0.842$", correct: true, feedback: "20% is less than half, so the value is below the mean: the mirror of $\\Phi(0.842) = 0.80$." },
        { text: "$z = 0.842$", feedback: "That value has 80% below it." },
        { text: "$z = 0.2$", feedback: "A proportion is not a $z$-score. You have to read the table backwards." },
        { text: "$z = -0.2$", feedback: "$\\Phi(-0.2) \\approx 0.42$, nowhere near 0.20." },
      ],
    },
    {
      type: "quiz",
      id: "st5-4-q8",
      variant: "practice",
      question:
        "Olympiad scores are $N(500, 50^2)$. Only the top 1% qualify for the next round. What is the qualifying score?",
      options: [
        { text: "About 616.3", correct: true, feedback: "99% below gives $z = 2.326$, so $500 + 2.326 \\times 50 = 616.3$." },
        { text: "About 598", feedback: "That uses $z = 1.96$, which leaves 2.5% above, not 1%." },
        { text: "About 582.3", feedback: "That uses $z = 1.645$, which leaves 5% above." },
        { text: "About 383.7", feedback: "Sign error: that is the cut-off for the *bottom* 1%." },
      ],
    },
    {
      type: "quiz",
      id: "st5-4-q9",
      variant: "practice",
      question:
        "Rods must be $100 \\pm 2$ mm long, and the machine is centred at 100 mm. What is the largest $\\sigma$ that keeps total rejects to at most 5%?",
      options: [
        { text: "About 1.02 mm", correct: true, feedback: "5% total means 2.5% in each tail, so $z = 1.96$ and $\\sigma = \\frac{2}{1.96} \\approx 1.02$." },
        { text: "About 1.22 mm", feedback: "That puts all 5% in one tail ($z = 1.645$). Rejects come from both ends, so the total would be 10%." },
        { text: "About 0.86 mm", feedback: "That uses $z = 2.326$, which keeps only 1% in each tail, stricter than needed." },
        { text: "3.92 mm", feedback: "That multiplies $2 \\times 1.96$. Solve $\\frac{2}{\\sigma} = 1.96$ for $\\sigma$." },
      ],
      hint: "Split the 5% between the two tails first.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "samples-and-sampling-distributions",
  title: "5.5 · Samples and Sampling Distributions",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Until now we assumed we knew $\\mu$ and $\\sigma$. In real life we rarely do. Nobody measures the height of every teenager in India. We measure a **sample** and use it to make a statement about the **population**, the two words you met in Lesson 0.1. That raises two questions: how should we choose the sample, and how far can the sample mean be trusted?",
    },
    {
      type: "table",
      headers: ["", "Population", "Sample"],
      rows: [
        ["What it is", "Everyone we want to know about", "The part we actually measure"],
        ["Its numbers are called", "**parameters**", "**statistics**"],
        ["Mean, SD", "$\\mu$, $\\sigma$ (fixed, usually unknown)", "$\\bar{x}$, $s$ (known, but change from sample to sample)"],
      ],
    },
    {
      type: "text",
      content:
        "**Choosing the sample.** The goal is a sample that looks like the population. The reliable way to get one is to let **chance** choose, so that no human preference can creep in.",
    },
    {
      type: "table",
      headers: ["Method", "How", "Example: 1200 students in a school"],
      rows: [
        ["Simple random sampling", "Every group of $n$ has the same chance: lottery or random numbers", "Number students 1 to 1200 and draw 80 numbers at random"],
        ["Systematic sampling", "Random start, then every $k$-th on a list, with $k = N/n$", "$k = 15$: random start 7, then 7, 22, 37, …"],
        ["Stratified sampling", "Split into groups (strata), then a random sample from each, in proportion", "Sample Class 9, 10 and 11 separately, in proportion to their sizes"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1: stratified allocation.** A school has 480 students in Class 9, 420 in Class 10 and 300 in Class 11 (1200 in total). Take a stratified sample of 80.\n\n**Step 1.** Sampling fraction: $\\frac{80}{1200} = \\frac{1}{15}$.\n\n**Step 2.** Class 9: $\\frac{480}{15} = 32$. Class 10: $\\frac{420}{15} = 28$. Class 11: $\\frac{300}{15} = 20$.\n\n**Step 3.** Check: $32 + 28 + 20 = 80$ ✓. Each class is represented in its true proportion. A simple random sample could, by bad luck, include very few Class 11 students.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: systematic sampling.** Choose 30 from a list of 600 customers.\n\n**Step 1.** $k = \\frac{600}{30} = 20$.\n\n**Step 2.** Pick a random start from 1 to 20, say 7.\n\n**Step 3.** Take customers 7, 27, 47, …, up to $7 + 29 \\times 20 = 587$. That gives 30 customers.\n\nWatch out if the list has a repeating pattern with period 20, for example every 20th entry being a manager. Then the sample could be badly skewed.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Sources of bias",
      content:
        "**Bias** is a *systematic* error: the method keeps leaning the same way.\n- **Convenience sampling:** asking whoever is nearby (friends, one tuition centre). They are not typical.\n- **Voluntary response:** online polls and phone-in shows. People with strong opinions reply far more often.\n- **Non-response:** the people you chose but who did not reply may differ from those who did, for example busy people in a survey about free time.\n- **Undercoverage:** part of the population can never be selected, e.g. a phone survey misses people without phones.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A larger sample does not remove bias",
      content:
        "In 1936 the *Literary Digest* magazine mailed about 10 million ballots, drawn from its subscribers plus telephone and car-owner lists, and got about 2.4 million back. It predicted a big win for Landon. Roosevelt won by a landslide. Better-off households were heavily overrepresented, and those who chose to reply were not typical either. George Gallup, with a far smaller but more representative sample, called the result correctly. More data from a biased method just gives you the wrong answer with more confidence.",
    },
    {
      type: "text",
      content:
        "**Sampling variability.** Even with perfect random sampling, different samples give different means. That is not a mistake; it is chance. The question is how much $\\bar{x}$ varies. Try it: the population below is **right-skewed** with $\\mu = 50$ and $\\sigma = 10$. Draw many samples of size $n$ and watch the histogram of their means.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-normal-sampling-lab",
        mode: "sampling",
        mu: 50,
        sigma: 10,
        population: "right-skewed",
        sampleSize: { min: 1, max: 100, initial: 1 },
        draws: 200,
        caption:
          "Start with n = 1: the means are just single values, so the histogram copies the skewed population. Then try n = 4, 25 and 100. The histogram of x̄ becomes a bell centred on 50 and gets narrower.",
      },
    },
    {
      type: "text",
      content:
        "What you should see:\n\n1. The histogram of $\\bar{x}$ is always centred at $\\mu = 50$. Sample means do not lean either way.\n2. It gets **narrower** as $n$ grows. Averaging lets high and low values cancel.\n3. Its **shape becomes normal**, even though the population is skewed.\n\nThe first two can be proved. If $\\bar{x} = \\frac{X_1 + \\cdots + X_n}{n}$ with independent $X_i$ that each have mean $\\mu$ and variance $\\sigma^2$, then the variance of the sum is $n\\sigma^2$, and dividing by $n$ divides the variance by $n^2$:",
    },
    {
      type: "math",
      latex:
        "E(\\bar{x}) = \\mu, \\qquad \\operatorname{Var}(\\bar{x}) = \\frac{n\\sigma^2}{n^2} = \\frac{\\sigma^2}{n}, \\qquad \\operatorname{SD}(\\bar{x}) = \\frac{\\sigma}{\\sqrt{n}}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The sampling distribution of x̄ (central limit theorem, informally)",
      content:
        "The distribution of $\\bar{x}$ over all possible samples of size $n$ has mean $\\mu$ and SD $\\frac{\\sigma}{\\sqrt{n}}$. If the population is normal, $\\bar{x}$ is exactly normal. If not, $\\bar{x}$ is still **approximately normal** once $n$ is reasonably large (a common rule of thumb is $n \\ge 30$): $\\bar{x} \\approx N\\!\\left(\\mu, \\frac{\\sigma^2}{n}\\right)$.",
    },
    {
      type: "text",
      content:
        "The $\\sqrt{n}$ matters. To halve the spread of $\\bar{x}$ you need $\\sqrt{n}$ to double, so $n$ must be **four times** as large. Precision gets expensive: going from $n = 25$ to $n = 100$ only halves the spread.",
    },
    {
      type: "table",
      headers: ["$n$", "$\\text{SD}(\\bar{x})$ when $\\sigma = 12$"],
      rows: [
        ["1", "12"],
        ["9", "4"],
        ["36", "2"],
        ["144", "1"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 3: a probability about a mean.** Daily phone screen time among teenagers has mean 180 minutes and SD 60 minutes, with a strong right skew. A random sample of 100 teenagers is taken. How likely is a sample mean above 192 minutes?\n\n**Step 1.** $n = 100$ is large, so $\\bar{x} \\approx N\\!\\left(180, \\left(\\frac{60}{\\sqrt{100}}\\right)^2\\right) = N(180, 6^2)$.\n\n**Step 2.** $z = \\frac{192 - 180}{6} = 2$.\n\n**Step 3.** $P(\\bar{x} > 192) = 1 - \\Phi(2) = 1 - 0.9772 = 0.0228$.\n\nOne teenager above 192 minutes is common. An *average* of 100 teenagers above 192 is rare.",
    },
    {
      type: "text",
      content:
        "**Worked example 4: one packet versus a carton (routine).** Packets of atta weigh $N(500, 4^2)$ g. An inspector weighs one packet; another weighs a random carton of 16 and takes the mean. What is the chance each result is below 498 g?\n\n**Step 1. One packet.** $z = \\frac{498 - 500}{4} = -0.5$, so $P = 1 - 0.6915 = 0.3085$.\n\n**Step 2. The carton mean.** The population is normal, so $\\bar{x}$ is exactly normal with SD $\\frac{4}{\\sqrt{16}} = 1$: $\\bar{x} \\sim N(500, 1^2)$.\n\n*Why this step:* the question is about a *mean*, so the spread to use is the SD of $\\bar{x}$, not of one packet. Using $\\sigma = 4$ here is the most common error.\n\n**Step 3.** $z = \\frac{498 - 500}{1} = -2$, so $P = 1 - 0.9772 = 0.0228$.\n\nA single light packet happens about 31% of the time; a light *carton average* only about 2% of the time.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: will the lift be overloaded? (exam style).** A lift is rated for 1160 kg. Adult weights are $N(68, 12^2)$ kg. If 16 randomly chosen adults get in, what is the probability the load exceeds the rating?\n\n**Step 1. Turn the total into a mean.** Total $> 1160$ exactly when $\\bar{x} > \\frac{1160}{16} = 72.5$ kg.\n\n*Why this step:* we know how $\\bar{x}$ behaves ($\\mu$ and $\\frac{\\sigma}{\\sqrt{n}}$), so rewrite any question about a sum as one about the mean.\n\n**Step 2. Sampling distribution.** $\\text{SD}(\\bar{x}) = \\frac{12}{\\sqrt{16}} = 3$, so $\\bar{x} \\sim N(68, 3^2)$.\n\n**Step 3. Standardise.**",
    },
    {
      type: "math",
      latex: "P(\\bar{x} > 72.5) = P\\!\\left(Z > \\frac{72.5 - 68}{3}\\right) = P(Z > 1.5) = 1 - 0.9332 = 0.0668",
    },
    {
      type: "text",
      content:
        "About a 6.7% chance: small, but far too big for a safety rating. That is why real lifts are rated well above the expected load: $16 \\times 68 = 1088$ kg on average.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A bigger population does not need a bigger sample",
      content:
        "The formula $\\frac{\\sigma}{\\sqrt{n}}$ contains the sample size $n$ but **not** the population size $N$. A random sample of 1000 voters is about as precise for all of India as for one city (as long as the population is much larger than the sample). A cook tastes one spoonful whether the pot holds 2 litres or 20, provided it is well stirred. Randomisation is the stirring.",
    },
    {
      type: "quiz",
      id: "st5-5-q7",
      variant: "concept",
      question:
        "A population is strongly right-skewed. You draw 1000 random samples of size $n = 64$ and plot a histogram of the 1000 sample means. The histogram will be:",
      options: [
        {
          text: "Roughly bell-shaped, centred at $\\mu$, with SD $\\frac{\\sigma}{8}$.",
          correct: true,
          feedback: "Yes. Averaging 64 values cancels most of the skew (the central limit theorem), keeps the centre at $\\mu$, and shrinks the spread by $\\sqrt{64} = 8$.",
        },
        {
          text: "Right-skewed, like the population.",
          feedback: "That is true only for $n = 1$, when each \"mean\" is a single value. Means of 64 values are close to normal.",
        },
        {
          text: "Bell-shaped, with the same SD $\\sigma$ as the population.",
          feedback: "The shape is right but the spread is not: averages vary less than single values, by a factor $\\sqrt{n} = 8$.",
        },
        {
          text: "Centred to the right of $\\mu$, because of the long tail.",
          feedback: "The long tail is already built into $\\mu$. $\\bar{x}$ is unbiased: $E(\\bar{x}) = \\mu$ for any population shape.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st5-5-q1",
      variant: "concept",
      question:
        "Pollster A takes a random sample of 1000 people from a city of 20 lakh. Pollster B takes a random sample of 1000 from the whole of India. Whose sample mean is more precise?",
      options: [
        {
          text: "About the same: precision depends on $n$ (through $\\sigma/\\sqrt{n}$), not on the population size.",
          correct: true,
          feedback: "Right. When the population is much bigger than the sample, its size hardly matters.",
        },
        {
          text: "A's, because 1000 is a larger fraction of a city.",
          feedback: "The fraction sampled is tiny in both cases. What sets the precision is $n$.",
        },
        {
          text: "B's, because India is bigger.",
          feedback: "A bigger population does not make the same sample more precise.",
        },
        {
          text: "Neither is useful: you need at least 10% of a population.",
          feedback: "There is no such rule. A well-mixed random sample of 1000 is informative for any large population.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st5-5-q2",
      variant: "concept",
      question:
        "A news website's online poll gets 50,000 votes. A random telephone survey gets 800 responses. Which is likely to reflect public opinion better?",
      options: [
        {
          text: "The random survey of 800. The online poll has voluntary-response bias, and more votes do not fix that.",
          correct: true,
          feedback: "Yes. Size reduces random error but does nothing about systematic error.",
        },
        {
          text: "The online poll, because 50,000 is much larger.",
          feedback: "Larger samples reduce *random* variation only. Everyone in the online poll chose to vote, so the bias remains.",
        },
        {
          text: "They are equally good, since both are large.",
          feedback: "How a sample is chosen matters more than how big it is.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st5-5-q3",
      variant: "practice",
      question:
        "A college has 900 boys and 600 girls. A stratified sample of 50 is taken in proportion. How many girls are chosen?",
      options: [
        { text: "20", correct: true, feedback: "$\\frac{600}{1500} \\times 50 = 20$." },
        { text: "25", feedback: "That splits the sample equally, not in proportion." },
        { text: "30", feedback: "That is the number of boys." },
        { text: "33", feedback: "That is $\\frac{50}{1.5}$. Use the girls' share, $\\frac{600}{1500} = 0.4$." },
      ],
    },
    {
      type: "quiz",
      id: "st5-5-q4",
      variant: "practice",
      question: "A population has $\\sigma = 20$. What is the SD of $\\bar{x}$ for random samples of size 25?",
      options: [
        { text: "4", correct: true, feedback: "$\\frac{20}{\\sqrt{25}} = \\frac{20}{5} = 4$." },
        { text: "0.8", feedback: "That divides by $n$ rather than $\\sqrt{n}$." },
        { text: "20", feedback: "That is the SD of one observation. Averaging reduces the spread." },
        { text: "16", feedback: "That is the variance of $\\bar{x}$, $\\frac{400}{25}$. The SD is its square root." },
      ],
    },
    {
      type: "quiz",
      id: "st5-5-q5",
      variant: "practice",
      question: "With $n = 50$, the SD of $\\bar{x}$ is 3. What sample size makes it 1.5?",
      options: [
        { text: "200", correct: true, feedback: "Halving $\\frac{\\sigma}{\\sqrt{n}}$ needs $\\sqrt{n}$ doubled, so $n \\times 4$." },
        { text: "100", feedback: "Doubling $n$ divides the SD by only $\\sqrt{2} \\approx 1.41$, giving about 2.12." },
        { text: "25", feedback: "A smaller sample makes $\\bar{x}$ *more* variable." },
        { text: "2500", feedback: "That is $50^2$. You only need $n$ multiplied by $2^2 = 4$." },
      ],
    },
    {
      type: "quiz",
      id: "st5-5-q6",
      variant: "practice",
      question:
        "To estimate how many hours students spend on sports, a researcher surveys students leaving the school's cricket ground. What is the main problem?",
      options: [
        {
          text: "Convenience sampling: these students are likely to play more sport than typical students, so the estimate will be too high.",
          correct: true,
          feedback: "Yes. The method leans one way, which is bias.",
        },
        { text: "Non-response bias.", feedback: "Nothing says the chosen students failed to answer. The problem is who was chosen." },
        { text: "The sample is too small.", feedback: "No size is given, and a bigger sample from the cricket ground would be just as biased." },
        { text: "There is no problem if the students answer honestly.", feedback: "Honest answers from an untypical group still give an untypical average." },
      ],
    },
    {
      type: "quiz",
      id: "st5-5-q8",
      variant: "practice",
      question:
        "Packets of dal weigh $N(250, 6^2)$ g. For a random sample of 9 packets, what is $P(\\bar{x} < 247)$? (Use $\\Phi(1.5) = 0.9332$.)",
      options: [
        { text: "$0.0668$", correct: true, feedback: "$\\text{SD}(\\bar{x}) = \\frac{6}{3} = 2$, $z = \\frac{247 - 250}{2} = -1.5$, and $1 - 0.9332 = 0.0668$." },
        { text: "$0.3085$", feedback: "That is the chance for *one* packet ($z = -0.5$). The mean of 9 varies less: use $\\frac{\\sigma}{\\sqrt{n}} = 2$." },
        { text: "$0.9332$", feedback: "That is $P(\\bar{x} > 247)$. 247 is below the mean, so the answer is a small left tail." },
        { text: "$0.1336$", feedback: "That counts both tails beyond $\\pm 1.5$. Only $\\bar{x} < 247$ is asked." },
      ],
    },
    {
      type: "quiz",
      id: "st5-5-q9",
      variant: "practice",
      question:
        "A lift is rated for 1850 kg. Weights are $N(70, 10^2)$ kg. What is the probability that 25 random adults exceed the rating? (Use $\\Phi(2) = 0.9772$.)",
      options: [
        { text: "$0.0228$", correct: true, feedback: "Total $> 1850$ means $\\bar{x} > 74$. $\\text{SD}(\\bar{x}) = \\frac{10}{5} = 2$, so $z = 2$ and $1 - 0.9772 = 0.0228$." },
        { text: "About $0.34$", feedback: "That treats 74 kg as one person's weight ($z = 0.4$). The average of 25 people varies much less." },
        { text: "Essentially 0", feedback: "That divides $\\sigma$ by $n = 25$, giving $z = 10$. Use $\\sqrt{25} = 5$." },
        { text: "$0.9772$", feedback: "That is the probability the lift is *not* overloaded." },
      ],
      hint: "Divide the rating by 25 to turn the total into a mean.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "estimation-and-confidence-intervals",
  title: "5.6 · Estimation and Confidence Intervals",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "You test 64 bulbs from a factory and find a mean life of $\\bar{x} = 1180$ hours. Is the true mean $\\mu$ exactly 1180? Almost certainly not: another 64 bulbs would give a different $\\bar{x}$. An honest answer gives a best guess *and* says how far off it might be: \"$\\mu$ is 1180, give or take about 30\". This lesson makes \"give or take\" precise.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Point estimate and standard error",
      content:
        "A **point estimate** is a single-number guess at a parameter: $\\bar{x}$ estimates $\\mu$. Its **standard error** is the SD of the estimate over repeated samples, i.e. how much it typically wobbles: $\\text{SE}(\\bar{x}) = \\frac{\\sigma}{\\sqrt{n}}$.",
    },
    {
      type: "text",
      content:
        "**Estimating $\\sigma$: why divide by $n - 1$.** The standard error needs $\\sigma$, which is usually unknown, so we estimate it from the sample. The obvious estimate, the SD from Chapter 2 with $n$ in the denominator, comes out **too small** on average.\n\nThe reason goes back to 2.4: $\\sum (x_i - a)^2$ is smallest when $a = \\bar{x}$. The true $\\mu$ is some other number, so the deviations from $\\bar{x}$ are, on average, smaller than the deviations from $\\mu$ that we really wanted. The data sit closer to their own mean than to the population mean.",
    },
    {
      type: "text",
      content:
        "**A small check.** Take the sample $\\{4, 7, 10\\}$, so $\\bar{x} = 7$, and suppose the true mean is $\\mu = 6$.\n\n- About $\\bar{x}$: $(-3)^2 + 0^2 + 3^2 = 18$.\n- About $\\mu$: $(-2)^2 + 1^2 + 4^2 = 21$.\n\nThe sum about $\\bar{x}$ is smaller, as it always will be. Dividing by $n - 1$ instead of $n$ makes up for this: on average $s^2$ equals $\\sigma^2$ exactly. ($s$ itself is still very slightly too small, but the difference is negligible for large $n$.)",
    },
    {
      type: "math",
      latex:
        "s^2 = \\frac{\\sum (x_i - \\bar{x})^2}{n - 1} \\qquad \\text{e.g. } \\{4, 7, 10\\}: \\; s^2 = \\frac{18}{2} = 9, \\text{ compared with } \\frac{18}{3} = 6",
    },
    {
      type: "callout",
      variant: "info",
      title: "Which formula when?",
      content:
        "Dividing by $n$ **describes** the spread of the data you have; Chapters 2–4 use that. Dividing by $n - 1$ **estimates** the spread of the population the data came from. For large $n$ the two are almost equal. When $\\sigma$ is unknown and $n$ is large, use $s$ in place of $\\sigma$ in the formulas below. (For small samples with unknown $\\sigma$, a slightly wider method called the $t$-distribution is used, beyond this course.)",
    },
    {
      type: "text",
      content:
        "**Building the interval.** From 5.5, $\\bar{x} \\approx N\\!\\left(\\mu, \\frac{\\sigma^2}{n}\\right)$. By the table, 95% of the area lies within $1.96$ SDs of the centre:",
    },
    {
      type: "math",
      latex:
        "P\\!\\left(-1.96 < \\frac{\\bar{x} - \\mu}{\\sigma/\\sqrt{n}} < 1.96\\right) = 0.95",
    },
    {
      type: "text",
      content:
        "Multiply through by $\\frac{\\sigma}{\\sqrt{n}}$ and rearrange the inequalities to get $\\mu$ in the middle:",
    },
    {
      type: "math",
      latex:
        "P\\!\\left(\\bar{x} - 1.96\\frac{\\sigma}{\\sqrt{n}} < \\mu < \\bar{x} + 1.96\\frac{\\sigma}{\\sqrt{n}}\\right) = 0.95",
    },
    {
      type: "text",
      content:
        "Nothing is special about 95%. For 99% confidence we need 0.5% in each tail, i.e. $\\Phi(z^*) = 0.995$, so $z^* = 2.576$; for 90%, $\\Phi(z^*) = 0.95$ gives $z^* = 1.645$.",
    },
    { type: "math", latex: "\\bar{x} \\pm z^* \\frac{\\sigma}{\\sqrt{n}}" },
    {
      type: "callout",
      variant: "definition",
      title: "Confidence interval for μ (σ known)",
      content:
        "The interval $\\bar{x} \\pm z^* \\frac{\\sigma}{\\sqrt{n}}$, with $z^* = 1.645$ for 90%, $1.96$ for 95%, $2.576$ for 99% confidence. The part after $\\pm$ is the **margin of error** $E = z^* \\frac{\\sigma}{\\sqrt{n}}$.",
    },
    {
      type: "text",
      content:
        "Read the probability statement carefully. It is about $\\bar{x}$, the random quantity **before** we sample. $\\mu$ is a fixed number. What varies is the interval. Watch it happen: each horizontal line below is the interval from one random sample, and red ones miss $\\mu$.",
    },
    {
      type: "interactive",
      config: {
        component: "stats-normal-sampling-lab",
        mode: "intervals",
        mu: 50,
        sigma: 10,
        sampleSize: { min: 5, max: 100, initial: 25 },
        confidence: 0.95,
        caption:
          "Each line is one sample's 95% interval x̄ ± 1.96σ/√n. Draw many: about 95 in every 100 cover μ = 50. Switch to 99% (wider, fewer misses) or 90% (narrower, more misses), and change n to see the widths change.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "What \"95% confident\" means",
      content:
        "It does **not** mean \"there is a 95% chance that $\\mu$ lies in *this* interval\". Once you have computed, say, $(1150.6, 1209.4)$, $\\mu$ either is in it or is not; nothing random is left. The 95% describes the **method**: if we repeated the sampling many times, about 95% of the intervals built this way would contain $\\mu$. We trust this interval because it came from a method that works 95% of the time.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** 64 bulbs give $\\bar{x} = 1180$ h, with known $\\sigma = 120$ h. Find a 95% confidence interval for $\\mu$.\n\n**Step 1. Standard error.** $\\frac{120}{\\sqrt{64}} = \\frac{120}{8} = 15$.\n\n**Step 2. Margin of error.** $1.96 \\times 15 = 29.4$.\n\n**Step 3. Interval.** $1180 \\pm 29.4 = (1150.6,\\ 1209.4)$ hours.\n\n**Step 4. Interpret.** We are 95% confident the factory's mean bulb life is between about 1151 and 1209 hours.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: more confidence costs width.** Same data, 99% confidence: margin $2.576 \\times 15 = 38.64$, so the interval is $(1141.36,\\ 1218.64)$. To be surer of catching $\\mu$, the net has to be wider.",
    },
    {
      type: "table",
      headers: ["Change", "Effect on margin of error $z^*\\sigma/\\sqrt{n}$"],
      rows: [
        ["Higher confidence (95% → 99%)", "wider ($z^*$ from 1.96 to 2.576)"],
        ["More variable population (larger $\\sigma$)", "wider"],
        ["Larger sample ($n \\times 4$)", "halved"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 3: choosing $n$.** A researcher wants to estimate mean study time to within $\\pm 3$ minutes with 95% confidence, and past studies suggest $\\sigma = 15$ minutes. How many students should she survey?\n\n**Step 1.** Require $1.96 \\frac{15}{\\sqrt{n}} \\le 3$.\n\n**Step 2.** $\\sqrt{n} \\ge \\frac{1.96 \\times 15}{3} = 9.8$.\n\n**Step 3.** $n \\ge 9.8^2 = 96.04$. Always **round up**, since 96 would fall just short: $n = 97$.",
    },
    { type: "math", latex: "n = \\left(\\frac{z^* \\sigma}{E}\\right)^2 \\quad \\text{(rounded up)}" },
    {
      type: "text",
      content:
        "**Worked example 4: $\\sigma$ unknown, so use $s$.** In real surveys $\\sigma$ is almost never known. A random sample of 100 students has a mean sleep deficit of $\\bar{x} = 5.2$ hours per week, with sample SD $s = 2.5$ h. Find a 95% confidence interval for $\\mu$.\n\n**Step 1. Standard error, with $s$ for $\\sigma$.** $n = 100$ is large, so $\\text{SE} \\approx \\frac{2.5}{\\sqrt{100}} = 0.25$.\n\n**Step 2. Margin.** $1.96 \\times 0.25 = 0.49$.\n\n**Step 3. Interval.** $5.2 \\pm 0.49 = (4.71,\\ 5.69)$ hours.\n\nThe method is unchanged; only the source of the SD is different.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: from raw data to a verdict (application).** A consumer group weighs 9 randomly bought packets of a brand labelled \"503 g average\". The filling machine's SD is known to be 3 g. The weights (g) are:",
    },
    { type: "math", latex: "498,\\; 502,\\; 497,\\; 501,\\; 503,\\; 499,\\; 500,\\; 504,\\; 496" },
    {
      type: "text",
      content:
        "**Step 1. Point estimate.** The sum is 4500, so $\\bar{x} = \\frac{4500}{9} = 500$ g.\n\n**Step 2. Standard error.** $\\frac{3}{\\sqrt{9}} = 1$ g.\n\n*Why this step:* the interval's width comes from how much $\\bar{x}$ wobbles, and for 9 packets that is a third of one packet's wobble.\n\n**Step 3. 95% interval.** $500 \\pm 1.96 \\times 1 = (498.04,\\ 501.96)$ g.\n\n**Step 4. Verdict.** The claimed 503 g lies well outside the interval. If the true mean really were 503, a sample mean as low as 500 would be 3 standard errors away, which is very unusual. The label looks doubtful. (This is the idea behind hypothesis testing.)",
    },
    {
      type: "text",
      content:
        "**Worked example 6: working backwards from an interval (exam style).** A 95% confidence interval for $\\mu$, based on $n = 100$ with $\\sigma$ known, is $(46.08,\\ 53.92)$. Find $\\bar{x}$, the margin of error, $\\sigma$, and the 99% interval from the same data.\n\n**Step 1. Centre and half-width.** The interval is symmetric about $\\bar{x}$:",
    },
    {
      type: "math",
      latex: "\\bar{x} = \\frac{46.08 + 53.92}{2} = 50, \\qquad E = \\frac{53.92 - 46.08}{2} = 3.92",
    },
    {
      type: "text",
      content:
        "*Why this step:* every $z$-interval has the form $\\bar{x} \\pm E$, so the midpoint and half the width give both pieces directly.\n\n**Step 2. Standard error and $\\sigma$.** $E = 1.96 \\cdot \\text{SE}$, so $\\text{SE} = \\frac{3.92}{1.96} = 2$. Then $\\sigma = \\text{SE} \\cdot \\sqrt{n} = 2 \\times 10 = 20$.\n\n**Step 3. 99% interval.** Same centre and SE, new multiplier: $50 \\pm 2.576 \\times 2 = 50 \\pm 5.152$, i.e. $(44.848,\\ 55.152)$.\n\nThe 99% interval is wider by the factor $\\frac{2.576}{1.96} \\approx 1.31$.",
    },
    {
      type: "quiz",
      id: "st5-6-q1",
      variant: "concept",
      question:
        "A 95% confidence interval for mean height is $(158.2, 161.8)$ cm. Which interpretation is correct?",
      options: [
        {
          text: "If we repeated the sampling many times, about 95% of the intervals built this way would contain the true mean.",
          correct: true,
          feedback: "Yes. The 95% belongs to the method, not to this particular interval.",
        },
        {
          text: "There is a 95% probability that $\\mu$ is between 158.2 and 161.8.",
          feedback: "$\\mu$ is fixed and so is this interval, so it either contains $\\mu$ or it does not. The 95% refers to repeated sampling.",
        },
        {
          text: "95% of students have heights between 158.2 and 161.8 cm.",
          feedback: "The interval is for the *mean*, not for individuals. Individual heights spread far more widely.",
        },
        {
          text: "95% of sample means will fall in $(158.2, 161.8)$.",
          feedback: "Sample means cluster around $\\mu$, not around this sample's $\\bar{x}$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "st5-6-q2",
      variant: "practice",
      question: "A sample of 100 gives $\\bar{x} = 75$, with $\\sigma = 20$. Find the 95% confidence interval for $\\mu$.",
      options: [
        { text: "$(71.08,\\ 78.92)$", correct: true, feedback: "SE $= \\frac{20}{10} = 2$, margin $1.96 \\times 2 = 3.92$." },
        { text: "$(35.8,\\ 114.2)$", feedback: "That uses $\\sigma$ instead of the standard error $\\frac{\\sigma}{\\sqrt{n}}$." },
        { text: "$(74.61,\\ 75.39)$", feedback: "That divides $\\sigma$ by $n$ rather than $\\sqrt{n}$." },
        { text: "$(71.71,\\ 78.29)$", feedback: "That uses $z^* = 1.645$, which gives a 90% interval." },
      ],
    },
    {
      type: "quiz",
      id: "st5-6-q7",
      variant: "practice",
      question:
        "A random sample of 64 auto-rickshaw trips has mean fare ₹84 and sample SD $s = 16$. The population SD is unknown. Find a 95% confidence interval for the mean fare.",
      options: [
        { text: "$(80.08,\\ 87.92)$", correct: true, feedback: "$n$ is large, so use $s$ for $\\sigma$: SE $\\approx \\frac{16}{8} = 2$, margin $1.96 \\times 2 = 3.92$." },
        { text: "$(83.51,\\ 84.49)$", feedback: "That divides $s$ by $n = 64$ instead of $\\sqrt{n} = 8$." },
        { text: "$(52.64,\\ 115.36)$", feedback: "That uses $s$ itself as the margin's SD. The mean of 64 trips varies far less than one trip: use $\\frac{s}{\\sqrt{n}}$." },
        { text: "It cannot be found without $\\sigma$.", feedback: "With a large sample, $s$ is a good stand-in for $\\sigma$." },
      ],
    },
    {
      type: "quiz",
      id: "st5-6-q3",
      variant: "practice",
      question:
        "With $n = 40$ the margin of error is 6. Keeping the confidence level fixed, what $n$ gives a margin of 3?",
      options: [
        { text: "160", correct: true, feedback: "The margin is proportional to $\\frac{1}{\\sqrt{n}}$: halve it by making $n$ four times as large." },
        { text: "80", feedback: "Doubling $n$ shrinks the margin only to $\\frac{6}{\\sqrt{2}} \\approx 4.24$." },
        { text: "20", feedback: "A smaller sample makes the margin *larger*." },
        { text: "1600", feedback: "That is $40^2$. You only need $\\times 4$." },
      ],
    },
    {
      type: "quiz",
      id: "st5-6-q4",
      variant: "practice",
      question: "For the sample $\\{2, 4, 6, 8\\}$, what is the sample variance $s^2$ (divisor $n - 1$)?",
      options: [
        { text: "$\\frac{20}{3} \\approx 6.67$", correct: true, feedback: "$\\bar{x} = 5$, $\\sum (x - \\bar{x})^2 = 9 + 1 + 1 + 9 = 20$, and $\\frac{20}{3}$." },
        { text: "$5$", feedback: "That divides by $n = 4$, which describes these four numbers but underestimates the population variance." },
        { text: "$20$", feedback: "That is the sum of squares, before dividing." },
        { text: "$2.58$", feedback: "That is $s$, the square root. The question asks for $s^2$." },
      ],
    },
    {
      type: "quiz",
      id: "st5-6-q5",
      variant: "concept",
      question: "From the same data, how does a 99% confidence interval compare with a 95% one?",
      options: [
        {
          text: "It is wider, because being surer of catching $\\mu$ needs a bigger net ($z^* = 2.576$ against $1.96$).",
          correct: true,
          feedback: "Right. More confidence means less precision, unless you collect more data.",
        },
        { text: "It is narrower, because 99% is more accurate.", feedback: "Higher confidence uses a larger $z^*$, so the interval widens." },
        { text: "It is the same width, with a different centre.", feedback: "Both are centred at $\\bar{x}$; only the width changes." },
      ],
    },
    {
      type: "quiz",
      id: "st5-6-q6",
      variant: "practice",
      question:
        "To estimate $\\mu$ within $\\pm 2$ at 95% confidence when $\\sigma = 10$, what is the smallest sample size?",
      options: [
        { text: "97", correct: true, feedback: "$\\left(\\frac{1.96 \\times 10}{2}\\right)^2 = 9.8^2 = 96.04$, rounded **up** to 97." },
        { text: "96", feedback: "96 gives a margin just over 2. Always round up." },
        { text: "10", feedback: "That is $\\sqrt{n}$ rounded. Square it." },
        { text: "68", feedback: "That uses $z^* = 1.645$, which is for 90% confidence." },
      ],
    },
    {
      type: "quiz",
      id: "st5-6-q8",
      variant: "practice",
      question:
        "Four measurements are 11, 13, 9 and 15, from a population with known $\\sigma = 2$. What is the 95% confidence interval for $\\mu$?",
      options: [
        { text: "$(10.04,\\ 13.96)$", correct: true, feedback: "$\\bar{x} = 12$, SE $= \\frac{2}{\\sqrt{4}} = 1$, margin $1.96 \\times 1 = 1.96$." },
        { text: "$(8.08,\\ 15.92)$", feedback: "That uses $\\sigma = 2$ in place of the standard error $\\frac{\\sigma}{\\sqrt{n}} = 1$." },
        { text: "$(10.355,\\ 13.645)$", feedback: "That uses $z^* = 1.645$, which gives a 90% interval." },
        { text: "$(11.02,\\ 12.98)$", feedback: "That divides $\\sigma$ by $n = 4$ instead of $\\sqrt{4} = 2$." },
      ],
      hint: "Find $\\bar{x}$ first, then $\\frac{\\sigma}{\\sqrt{n}}$.",
    },
    {
      type: "quiz",
      id: "st5-6-q9",
      variant: "practice",
      question:
        "A 95% confidence interval for $\\mu$ from a sample of $n = 64$ (with $\\sigma$ known) is $(72.08,\\ 79.92)$. What is $\\sigma$?",
      options: [
        { text: "16", correct: true, feedback: "$E = \\frac{79.92 - 72.08}{2} = 3.92$, SE $= \\frac{3.92}{1.96} = 2$, and $\\sigma = 2 \\times \\sqrt{64} = 16$." },
        { text: "2", feedback: "That is the standard error $\\frac{\\sigma}{\\sqrt{n}}$. Multiply by $\\sqrt{64} = 8$." },
        { text: "3.92", feedback: "That is the margin of error $E$. Divide by 1.96, then multiply by $\\sqrt{n}$." },
        { text: "31.36", feedback: "That multiplies $E$ by 8 but forgets to divide by $z^* = 1.96$ first." },
      ],
      hint: "Half-width = $1.96 \\cdot \\frac{\\sigma}{\\sqrt{n}}$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Where this leads",
      content:
        "Two ideas grow straight out of this lesson. **The $t$-distribution:** with a small sample and unknown $\\sigma$, $s$ is itself shaky, so intervals use a slightly wider multiplier than $z^*$ (for example about 2.26 instead of 1.96 when $n = 10$). **Hypothesis testing:** instead of asking where $\\mu$ might be, ask whether $\\bar{x}$ is surprisingly far from a claimed $\\mu$, measured in standard errors. If a claimed mean sits more than about 2 SE from $\\bar{x}$, the claim looks doubtful.",
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
        "A mixed check on the whole chapter: density curves, normal probabilities forwards and backwards, sampling, and confidence intervals. Sketch a bell before each calculation. Where a $\\Phi$ value is needed, it is in the table below or in the question.",
    },
    {
      type: "table",
      headers: ["$z$", "$\\Phi(z)$"],
      rows: PHI_TABLE_ROWS,
    },
    {
      type: "quiz",
      id: "st5-7-q1",
      variant: "mastery",
      question: "$X \\sim N(40, 5^2)$. Find $P(X < 47.5)$.",
      options: [
        { text: "$0.9332$", correct: true, feedback: "$z = \\frac{7.5}{5} = 1.5$ and $\\Phi(1.5) = 0.9332$." },
        { text: "$0.0668$", feedback: "That is the area *above* 47.5." },
        { text: "$0.4332$", feedback: "That is the area between 40 and 47.5." },
        { text: "$0.9938$", feedback: "That is $\\Phi(2.5)$, as if $\\sigma$ were 3." },
      ],
    },
    {
      type: "quiz",
      id: "st5-7-q2",
      variant: "mastery",
      question: "$X \\sim N(200, 20^2)$. Find $P(X > 170)$.",
      options: [
        { text: "$0.9332$", correct: true, feedback: "$z = -1.5$, and $P(Z > -1.5) = \\Phi(1.5) = 0.9332$ by symmetry." },
        { text: "$0.0668$", feedback: "That is $P(X < 170)$. Most values lie above 170, so the answer must exceed 0.5." },
        { text: "$-0.9332$", feedback: "A probability cannot be negative." },
        { text: "$0.8664$", feedback: "That is $P(170 < X < 230)$, the two-sided band." },
      ],
    },
    {
      type: "quiz",
      id: "st5-7-q3",
      variant: "mastery",
      question: "1000 students have heights $N(160, 8^2)$. About how many are taller than 176 cm?",
      options: [
        { text: "23", correct: true, feedback: "$z = 2$, $1 - 0.9772 = 0.0228$, and $0.0228 \\times 1000 \\approx 23$." },
        { text: "50", feedback: "That is both tails beyond $\\pm 2\\sigma$ (roughly). Only the upper tail counts." },
        { text: "977", feedback: "That is the number *shorter* than 176 cm." },
        { text: "160", feedback: "That is the number above $\\mu + \\sigma = 168$, roughly." },
      ],
    },
    {
      type: "quiz",
      id: "st5-7-q4",
      variant: "mastery",
      question: "Scores are $N(60, 12^2)$. What score marks the top 5%?",
      options: [
        { text: "About 79.7", correct: true, feedback: "$60 + 1.645 \\times 12 = 79.74$." },
        { text: "About 83.5", feedback: "That uses 1.96, the top 2.5%." },
        { text: "About 40.3", feedback: "That is the bottom 5%." },
        { text: "95", feedback: "\"Top 5%\" is about area, not 95% of the maximum mark." },
      ],
    },
    {
      type: "quiz",
      id: "st5-7-q5",
      variant: "mastery",
      question:
        "In a normal distribution, 30.85% of values are below 45 and 6.68% are above 65. Find $\\mu$ and $\\sigma$.",
      options: [
        {
          text: "$\\mu = 50$, $\\sigma = 10$",
          correct: true,
          feedback: "30.85% below means $z = -0.5$; 6.68% above means $z = 1.5$. So $\\mu - 0.5\\sigma = 45$ and $\\mu + 1.5\\sigma = 65$, giving $2\\sigma = 20$.",
        },
        { text: "$\\mu = 55$, $\\sigma = 10$", feedback: "Check: $\\frac{45 - 55}{10} = -1$, which leaves 15.87% below, not 30.85%." },
        { text: "$\\mu = 50$, $\\sigma = 20$", feedback: "Check: $\\frac{65 - 50}{20} = 0.75$, which leaves far more than 6.68% above." },
        { text: "$\\mu = 55$, $\\sigma = 5$", feedback: "Check: $\\frac{45 - 55}{5} = -2$ leaves only 2.28% below, not 30.85%. The tails are unequal (30.85% vs 6.68%), so 45 and 65 cannot be symmetric about $\\mu$." },
      ],
      hint: "Use $\\Phi(0.5) = 0.6915$ and $\\Phi(1.5) = 0.9332$, and mind the signs.",
    },
    {
      type: "quiz",
      id: "st5-7-q6",
      variant: "mastery",
      question: "A population has $\\sigma = 18$. What is the standard error of $\\bar{x}$ for samples of 81?",
      options: [
        { text: "2", correct: true, feedback: "$\\frac{18}{\\sqrt{81}} = \\frac{18}{9} = 2$." },
        { text: "0.22", feedback: "That divides by $n$ instead of $\\sqrt{n}$." },
        { text: "18", feedback: "That is the SD of one observation, not of the mean." },
        { text: "4", feedback: "That is the variance of $\\bar{x}$ ($\\frac{324}{81}$), not its SD." },
      ],
    },
    {
      type: "quiz",
      id: "st5-7-q7",
      variant: "mastery",
      question: "A sample of 49 gives $\\bar{x} = 32$, with $\\sigma = 7$. Find the 95% confidence interval for $\\mu$.",
      options: [
        { text: "$(30.04,\\ 33.96)$", correct: true, feedback: "SE $= \\frac{7}{7} = 1$, margin $1.96$." },
        { text: "$(18.28,\\ 45.72)$", feedback: "That uses $\\sigma$ rather than $\\frac{\\sigma}{\\sqrt{n}}$." },
        { text: "$(30.36,\\ 33.64)$", feedback: "That uses $z^* = 1.645$, a 90% interval." },
        { text: "$(29.42,\\ 34.58)$", feedback: "That uses $z^* = 2.576$, a 99% interval." },
      ],
    },
    {
      type: "quiz",
      id: "st5-7-q8",
      variant: "mastery",
      question:
        "How large a sample is needed to estimate $\\mu$ within $\\pm 5$ with 99% confidence when $\\sigma = 25$?",
      options: [
        { text: "166", correct: true, feedback: "$\\left(\\frac{2.576 \\times 25}{5}\\right)^2 = 12.88^2 \\approx 165.9$, rounded up to 166." },
        { text: "97", feedback: "That uses $z^* = 1.96$, which is for 95% confidence." },
        { text: "165", feedback: "165 falls just short of the requirement. Always round up." },
        { text: "13", feedback: "That is $\\sqrt{n}$. Square it." },
      ],
    },
    {
      type: "quiz",
      id: "st5-7-q9",
      variant: "mastery",
      question: "A report says: \"We are 95% confident the mean is between 12 and 18.\" Which statement is justified?",
      options: [
        {
          text: "The method used produces intervals that capture the true mean in about 95% of samples.",
          correct: true,
          feedback: "Yes. The confidence level describes how reliable the procedure is.",
        },
        { text: "The true mean has a 95% chance of changing to lie between 12 and 18.", feedback: "The true mean is a fixed number; it does not change." },
        { text: "95% of individual values lie between 12 and 18.", feedback: "The interval is for the mean, not for individual values." },
        { text: "A 99% interval from the same data would be narrower.", feedback: "More confidence means a wider interval." },
      ],
    },
    {
      type: "quiz",
      id: "st5-7-q10",
      variant: "mastery",
      question:
        "To estimate how often people in a city exercise, a survey is handed out at a gym. The results will most likely be:",
      options: [
        {
          text: "Biased upwards: gym-goers exercise more than typical residents, and a bigger sample would not fix it.",
          correct: true,
          feedback: "This is convenience sampling that also misses everyone who never goes to a gym.",
        },
        { text: "Unbiased, if the sample is large enough.", feedback: "Size reduces random error, not bias." },
        { text: "Biased downwards.", feedback: "Gym-goers are likely to exercise *more* than average." },
        { text: "Unbiased, because gym-goers are a random group.", feedback: "People choose to be at a gym, so they are not a random selection of residents." },
      ],
    },
    {
      type: "quiz",
      id: "st5-7-q11",
      variant: "mastery",
      question:
        "Commute times have mean 40 min and SD 15 min, with a right skew. For a random sample of 100 commuters, what is $P(\\bar{x} > 43)$?",
      options: [
        { text: "$0.0228$", correct: true, feedback: "$\\bar{x} \\approx N(40, 1.5^2)$ for large $n$, $z = \\frac{3}{1.5} = 2$, and $1 - 0.9772 = 0.0228$." },
        { text: "$0.4207$", feedback: "That uses the SD of one commuter (15). The mean of 100 varies much less." },
        { text: "It cannot be found, because the population is skewed.", feedback: "For $n = 100$ the sample mean is approximately normal whatever the population shape." },
        { text: "$0.9772$", feedback: "That is $P(\\bar{x} < 43)$." },
      ],
    },
    {
      type: "quiz",
      id: "st5-7-q12",
      variant: "mastery",
      question: "$X$ has density $f(x) = 0.1$ on $[0, 10]$. Which is correct?",
      options: [
        {
          text: "$P(X = 3) = 0$ and $P(2 < X < 5) = 0.3$",
          correct: true,
          feedback: "A single point has no area; the interval has area $3 \\times 0.1$.",
        },
        { text: "$P(X = 3) = 0.1$", feedback: "0.1 is the height (a density). A single point carries no area." },
        { text: "$P(2 < X < 5) = 0.1$", feedback: "That is the height. Multiply by the width 3." },
        { text: "$P(X \\le 5) > P(X < 5)$", feedback: "For a continuous variable they are equal, since the point 5 adds no area." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "What you can now do",
      content:
        "Turn data into a density curve, calculate normal areas in both directions, choose and criticise a sample, and give an estimate with an honest margin of error. That completes the course: from describing data to drawing careful conclusions from it.",
    },
  ]),
};

export const statisticsChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
