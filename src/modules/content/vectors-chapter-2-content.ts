import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Vector Algebra Chapter 2 — Dividing Lines and Proving Geometry.
 * Position vectors locate points: the section formula (internal and
 * external), the midpoint and the centroid. Linear combinations and the
 * collinearity test follow, and the chapter ends by proving classical
 * geometry theorems in a few lines of vector algebra.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "section-formula-internal",
  title: "2.1 · The Section Formula (Internal)",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/va-2-section-formula-and-geometry.mp4",
      poster: "/videos/va-2-section-formula-and-geometry.jpg",
      title: "Chapter 2 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "A bead is threaded on a straight wire from A to B. Slide it two-fifths of the way along. Where is it? In Chapter 1 you learnt to name every point by its **position vector** from a fixed origin O: $\\vec a$ for A, $\\vec b$ for B. This chapter is about answering questions like that one with those names alone. Once points have names you can add and scale, locating and proving turn into algebra.",
    },
    {
      type: "text",
      content:
        "Start with a picture. Below, P sits on the segment AB and splits it so that $AP : PB = m : n$. Change $m$ and $n$ and watch P slide. Drag A and B too. However the segment is placed, the formula in the panel keeps finding P.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "section",
        a: [-5, -3],
        b: [5, 2],
        draggable: ["a", "b"],
        ratio: {
          m: { min: 1, max: 5, step: 1, initial: 2 },
          n: { min: 1, max: 5, step: 1, initial: 3 },
          allowExternal: false,
        },
        readouts: ["components", "ratio"],
        caption:
          "P divides AB internally in the ratio m : n. With m = 2, n = 3, P is two-fifths of the way from A. Push m up and P runs towards B.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Dividing internally in the ratio m : n",
      content:
        "P divides the segment AB **internally** in the ratio $m : n$ (with $m, n > 0$) when P lies between A and B and $\\dfrac{AP}{PB} = \\dfrac{m}{n}$. Then P is the fraction $\\dfrac{m}{m+n}$ of the way from A to B.",
    },
    {
      type: "text",
      content:
        "**Deriving the formula.** The whole segment has $m + n$ equal parts and AP takes $m$ of them. Because P lies on AB, the vector $\\overrightarrow{AP}$ points the same way as $\\overrightarrow{AB}$ and is the fraction $\\frac{m}{m+n}$ of it:",
    },
    {
      type: "math",
      latex: "\\overrightarrow{AP} = \\frac{m}{m+n}\\,\\overrightarrow{AB}",
    },
    {
      type: "text",
      content:
        "Write every arrow as *tip minus tail*: $\\overrightarrow{AP} = \\vec p - \\vec a$ and $\\overrightarrow{AB} = \\vec b - \\vec a$. Then solve for $\\vec p$:",
    },
    {
      type: "math",
      latex:
        "\\vec p = \\vec a + \\frac{m}{m+n}(\\vec b - \\vec a) = \\frac{(m+n)\\vec a + m\\vec b - m\\vec a}{m+n} = \\frac{n\\,\\vec a + m\\,\\vec b}{m+n}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Section formula (internal)",
      content:
        "If P divides AB internally in the ratio $m : n$, then $\\vec p = \\dfrac{n\\,\\vec a + m\\,\\vec b}{m+n}$. In components this works coordinate by coordinate, in 2D and in 3D alike.",
    },
    {
      type: "text",
      content:
        "**Read it as a weighted average.** The weights $\\frac{n}{m+n}$ and $\\frac{m}{m+n}$ are positive and add to 1, so $\\vec p$ is a weighted average of $\\vec a$ and $\\vec b$. Think of a seesaw: a heavier weight at one end pulls the balance point towards that end. P is **closer** to A when $m < n$, and A's weight is then $n$, the **bigger** one. Each point is weighted by the part of the segment on the *far* side of P.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: the weights go straight across",
      content:
        "It is tempting to write $\\dfrac{m\\,\\vec a + n\\,\\vec b}{m+n}$ because $m$ is written next to A in the ratio. That is backwards. Test it with $m = 1$, $n = 3$: P is a quarter of the way from A, so it should sit near A. The correct formula gives $\\frac{3\\vec a + \\vec b}{4}$, three-quarters A. The crossed version gives $\\frac{\\vec a + 3\\vec b}{4}$, which is near B. **The nearer point gets the bigger weight.** (In the limit $n \\to 0$, P slides onto B, and only the correct formula tends to $\\vec b$.)",
    },
    {
      type: "text",
      content:
        "**The midpoint** is the case $m = n$. Both weights are $\\frac12$:",
    },
    {
      type: "math",
      latex: "\\vec m_{AB} = \\frac{\\vec a + \\vec b}{2}",
    },
    {
      type: "table",
      headers: ["Ratio $AP : PB$", "Where P is", "$\\vec p$"],
      rows: [
        ["$1 : 1$", "midpoint", "$\\dfrac{\\vec a + \\vec b}{2}$"],
        ["$1 : 2$", "one-third of the way from A (first point of trisection)", "$\\dfrac{2\\vec a + \\vec b}{3}$"],
        ["$2 : 1$", "two-thirds of the way from A (second point of trisection)", "$\\dfrac{\\vec a + 2\\vec b}{3}$"],
        ["$1 : 3$", "one-quarter of the way from A", "$\\dfrac{3\\vec a + \\vec b}{4}$"],
        ["$m : n$", "fraction $\\frac{m}{m+n}$ from A", "$\\dfrac{n\\vec a + m\\vec b}{m+n}$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1.** A and B have position vectors $\\vec a = \\hat i + 2\\hat j$ and $\\vec b = 7\\hat i - 4\\hat j$. Find P dividing AB internally in the ratio $1 : 2$.\n\n**Step 1.** Here $m = 1$ and $n = 2$, so A gets weight 2 and B gets weight 1: $\\vec p = \\dfrac{2\\vec a + \\vec b}{3}$.\n\n**Step 2.** $2\\vec a + \\vec b = (2 + 7)\\hat i + (4 - 4)\\hat j = 9\\hat i$.\n\n**Step 3.** $\\vec p = 3\\hat i$, the point $(3, 0)$.\n\n**Check.** $\\overrightarrow{AP} = 2\\hat i - 2\\hat j$ and $\\overrightarrow{AB} = 6\\hat i - 6\\hat j$. So AP is exactly one-third of AB, as a $1 : 2$ split requires.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (3D).** A is $(2, -1, 3)$ and B is $(5, 5, -3)$. Find the point dividing AB internally in the ratio $2 : 1$.\n\n**Step 1.** $m = 2$, $n = 1$, so $\\vec p = \\dfrac{1\\cdot\\vec a + 2\\vec b}{3}$.\n\n**Step 2.** $\\vec a + 2\\vec b = (2 + 10,\\ -1 + 10,\\ 3 - 6) = (12, 9, -3)$.\n\n**Step 3.** $\\vec p = (4, 3, -1)$.\n\n**Check.** $\\overrightarrow{AP} = (2, 4, -4)$ and $\\overrightarrow{PB} = (1, 2, -2)$. The first is twice the second: $2 : 1$, same direction, so P is between A and B.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (running it backwards).** M$(3, 1)$ is the midpoint of AB and A is $(1, -2)$. Find B.\n\n**Step 1.** $\\vec m = \\frac{\\vec a + \\vec b}{2}$, so $\\vec b = 2\\vec m - \\vec a$.\n\n**Step 2.** $\\vec b = (6 - 1,\\ 2 + 2) = (5, 4)$.\n\nThe section formula is one vector equation. Any one of $\\vec a$, $\\vec b$, $\\vec p$ can be found from the other two.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (application: a zip-line).** A zip-line runs straight from a platform at A$(0, 0, 20)$ to a landing point B$(60, 80, 5)$, in metres, with the last coordinate the height. A safety marker is fixed two-fifths of the way down the line, so $AP : PB = 2 : 3$. Where is the marker, and how high is it?\n\n**Step 1 (set up the weights).** $m = 2$ and $n = 3$. *Why this step:* the marker is nearer A, so A must carry the bigger weight, 3. Deciding which end is nearer before you write anything stops the weights from getting crossed.",
    },
    {
      type: "math",
      latex: "\\vec p = \\frac{3\\vec a + 2\\vec b}{5}",
    },
    {
      type: "text",
      content:
        "**Step 2 (compute).** $3\\vec a + 2\\vec b = (0 + 120,\\ 0 + 160,\\ 60 + 10) = (120, 160, 70)$, so $\\vec p = (24, 32, 14)$. *Why this step:* the section formula works on each coordinate separately. The height is just the third coordinate, so you get it for free.\n\n**Step 3 (answer).** The marker is at $(24, 32, 14)$, 14 m above the ground.\n\n**Check.** $\\overrightarrow{AB} = (60, 80, -15)$ and $\\frac25\\overrightarrow{AB} = (24, 32, -6) = \\overrightarrow{AP}$ ✓. The height makes sense too: the rider drops 15 m in all, two-fifths of that is 6 m, and $20 - 6 = 14$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style: chaining the formula).** P divides AB internally in the ratio $3 : 1$, and Q is the midpoint of AP. Find $\\vec q$ in terms of $\\vec a$ and $\\vec b$, and find the ratio in which Q divides AB.\n\n**Step 1.** $\\vec p = \\dfrac{1\\cdot\\vec a + 3\\vec b}{4}$. *Why this step:* P is three-quarters of the way along, nearer B, so B carries the weight 3.\n\n**Step 2.** Q is the midpoint of AP, so average $\\vec a$ and $\\vec p$ and put everything over one denominator. *Why this step:* written over a single denominator, the weights can be read straight off.",
    },
    {
      type: "math",
      latex:
        "\\vec q = \\frac12\\left(\\vec a + \\frac{\\vec a + 3\\vec b}{4}\\right) = \\frac{4\\vec a + \\vec a + 3\\vec b}{8} = \\frac{5\\vec a + 3\\vec b}{8}",
    },
    {
      type: "text",
      content:
        "**Step 3 (read the formula backwards).** The weights $\\frac58$ and $\\frac38$ are positive and add to 1, so Q lies between A and B. The weight on $\\vec b$ is $m$ and the weight on $\\vec a$ is $n$, so $AQ : QB = 3 : 5$. *Why this step:* $\\frac{n\\vec a + m\\vec b}{m+n}$ has a unique ratio once its weights add to 1, so the ratio can be read off.\n\n**Check by lengths.** P is $\\frac34$ of the way from A, so halfway to P is $\\frac38$ of the way. That leaves $\\frac58$ for QB, and $\\frac38 : \\frac58 = 3 : 5$ ✓.",
    },
    {
      type: "quiz",
      id: "va2-1-q1",
      variant: "concept",
      question: "P divides AB internally in the ratio $1 : 3$. Which expression is $\\vec p$?",
      options: [
        {
          text: "$\\dfrac{\\vec a + 3\\vec b}{4}$",
          feedback: "This puts the weights straight across, and it lands a quarter of the way from B. The nearer point gets the bigger weight.",
        },
        {
          text: "$\\dfrac{\\vec a + 3\\vec b}{3}$",
          feedback: "The denominator must be the total $m + n = 4$ so that the weights add to 1.",
        },
        {
          text: "$\\dfrac{3\\vec a + \\vec b}{4}$",
          correct: true,
          feedback: "P is a quarter of the way from A, so it is near A and A carries the big weight 3.",
        },
        {
          text: "$\\dfrac{\\vec a + \\vec b}{4}$",
          feedback: "The weights $\\frac14 + \\frac14$ add to $\\frac12$, not 1. This point is not even on the line AB in general.",
        },
      ],
      hint: "Is P nearer A or nearer B? The nearer point gets the bigger weight.",
    },
    {
      type: "quiz",
      id: "va2-1-q2",
      variant: "practice",
      question: "A is $(2, 5)$ and B is $(8, -1)$. Find the point dividing AB internally in the ratio $1 : 2$.",
      options: [
        {
          text: "$(6, 1)$",
          feedback: "That is $\\frac{(2,5) + 2(8,-1)}{3}$, the $2 : 1$ point. The weights have been crossed over.",
        },
        {
          text: "$(4, 3)$",
          correct: true,
          feedback: "$\\frac{2(2,5) + (8,-1)}{3} = \\frac{(12, 9)}{3} = (4, 3)$. Check: AP $= (2,-2)$ is a third of AB $= (6,-6)$.",
        },
        {
          text: "$(5, 2)$",
          feedback: "That is the midpoint, the $1 : 1$ split.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-1-q3",
      variant: "practice",
      question:
        "$\\vec a = 2\\hat i - 3\\hat j + \\hat k$ and $\\vec b = 4\\hat i + \\hat j - 5\\hat k$. What is the position vector of the midpoint of AB?",
      options: [
        {
          text: "$3\\hat i - \\hat j - 2\\hat k$",
          correct: true,
          feedback: "Average each component: $\\frac{2+4}{2} = 3$, $\\frac{-3+1}{2} = -1$, $\\frac{1-5}{2} = -2$.",
        },
        {
          text: "$\\hat i + 2\\hat j - 3\\hat k$",
          feedback: "That is $\\frac{\\vec b - \\vec a}{2}$, half of $\\overrightarrow{AB}$. It is a displacement, not a position.",
        },
        {
          text: "$6\\hat i - 2\\hat j - 4\\hat k$",
          feedback: "That is $\\vec a + \\vec b$. You still need to divide by 2.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-1-q4",
      variant: "concept",
      question: "A point P has $\\vec p = \\dfrac{2\\vec a + 3\\vec b}{5}$. Which statement is true?",
      options: [
        {
          text: "P is closer to A, and $AP : PB = 2 : 3$.",
          feedback: "This reads the weights as if they went straight across. A's weight is $n$, the part of the segment on the far side of P.",
        },
        {
          text: "P is closer to B, and $AP : PB = 3 : 2$.",
          correct: true,
          feedback: "B carries the larger weight, so it pulls P towards itself. The weight on $\\vec b$ is $m$, so $m = 3$ and $n = 2$.",
        },
        {
          text: "P is the midpoint, because $2 + 3 = 5$ is the denominator.",
          feedback: "Every internal division has the sum of the weights in the denominator. The midpoint needs equal weights.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-1-q5",
      variant: "practice",
      question: "P$(3, 5)$ divides AB internally in the ratio $2 : 1$, and A is $(1, 1)$. Find B.",
      options: [
        {
          text: "$(5, 9)$",
          feedback: "That is $2\\vec p - \\vec a$, which would make P the midpoint.",
        },
        {
          text: "$(7, 13)$",
          feedback: "That comes from $\\vec p = \\frac{2\\vec a + \\vec b}{3}$ with the weights crossed. P would then be only a third of the way along.",
        },
        {
          text: "$(4, 7)$",
          correct: true,
          feedback: "$\\vec p = \\frac{\\vec a + 2\\vec b}{3}$, so $\\vec b = \\frac{3\\vec p - \\vec a}{2} = \\frac{(8, 14)}{2} = (4, 7)$. Check: AP $= (2, 4)$ is twice PB $= (1, 2)$.",
        },
      ],
      hint: "Write $\\vec p$ with the correct weights, then solve the vector equation for $\\vec b$.",
    },
    {
      type: "quiz",
      id: "va2-1-q6",
      variant: "practice",
      question: "A is $(1, -2)$ and B is $(7, 4)$. Find the points of trisection of AB (the two points that cut it into three equal parts).",
      options: [
        {
          text: "$(3, 0)$ and $(5, 2)$",
          correct: true,
          feedback: "The $1 : 2$ point is $\\frac{2\\vec a + \\vec b}{3} = \\frac{(9, 0)}{3} = (3, 0)$ and the $2 : 1$ point is $\\frac{\\vec a + 2\\vec b}{3} = \\frac{(15, 6)}{3} = (5, 2)$. Each step along AB is $(2, 2)$.",
        },
        {
          text: "$(3, 0)$ only",
          feedback: "Cutting a segment into three equal parts takes two cuts: the $1 : 2$ point and the $2 : 1$ point.",
        },
        {
          text: "$(4, 1)$",
          feedback: "That is the midpoint, which bisects AB. Trisection needs the $1 : 2$ and $2 : 1$ points.",
        },
      ],
      hint: "Trisection points divide AB in the ratios $1 : 2$ and $2 : 1$.",
    },
    {
      type: "quiz",
      id: "va2-1-q7",
      variant: "practice",
      question:
        "A straight gas pipe runs from valve A$(2, -1, 4)$ to valve B$(8, 5, -2)$. A pressure sensor goes one-third of the way along from A, so $AP : PB = 1 : 2$. Where is the sensor?",
      options: [
        {
          text: "$(6, 3, 0)$",
          feedback: "That is $\\frac{\\vec a + 2\\vec b}{3}$, two-thirds of the way along. The sensor is nearer A, so A should get the weight 2.",
        },
        {
          text: "$(4, 1, 2)$",
          correct: true,
          feedback: "$\\frac{2\\vec a + \\vec b}{3} = \\frac{(4 + 8,\\ -2 + 5,\\ 8 - 2)}{3} = \\frac{(12, 3, 6)}{3} = (4, 1, 2)$. Check: $\\overrightarrow{AP} = (2, 2, -2)$ is a third of $\\overrightarrow{AB} = (6, 6, -6)$.",
        },
        {
          text: "$(5, 2, 1)$",
          feedback: "That is the midpoint, the $1 : 1$ point.",
        },
        {
          text: "$(2, 2, -2)$",
          feedback: "That is $\\frac13\\overrightarrow{AB}$, the displacement from A to the sensor. Add it to $\\vec a$ to get the sensor's position.",
        },
      ],
      hint: "The sensor is nearer A, so A gets the bigger weight.",
    },
    {
      type: "quiz",
      id: "va2-1-q8",
      variant: "practice",
      question:
        "P divides AB internally in the ratio $1 : 3$, and Q is the midpoint of PB. In what ratio does Q divide AB?",
      options: [
        {
          text: "$3 : 5$",
          feedback: "You found $\\vec q = \\frac{3\\vec a + 5\\vec b}{8}$ but read the weights straight across. The weight on $\\vec b$ is $m$.",
        },
        {
          text: "$5 : 3$",
          correct: true,
          feedback: "$\\vec p = \\frac{3\\vec a + \\vec b}{4}$ and $\\vec q = \\frac{\\vec p + \\vec b}{2} = \\frac{3\\vec a + 5\\vec b}{8}$. The weight on $\\vec b$ is 5, so $AQ : QB = 5 : 3$. By lengths: P is at $\\frac14$ and Q is halfway from $\\frac14$ to 1, at $\\frac58$.",
        },
        {
          text: "$1 : 1$",
          feedback: "Q is the midpoint of PB, not of AB. PB is only the last three-quarters of the segment.",
        },
        {
          text: "$5 : 8$",
          feedback: "$\\frac58$ is the fraction of the way from A. The ratio compares AQ with QB, so it is $\\frac58 : \\frac38$.",
        },
      ],
      hint: "Find $\\vec p$ first, then average it with $\\vec b$. Put the result over one denominator.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "external-division",
  title: "2.2 · External Division",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "The ratio $AP : PB$ still makes sense when P is **off** the segment but still on the line through A and B. Stand beyond B: you are farther from A than from B, so $AP : PB$ is bigger than 1. Stand beyond A and it is smaller than 1. That is **external division**.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "section",
        a: [-1, 0],
        b: [1, 0],
        draggable: ["a", "b"],
        window: { xmin: -10, xmax: 10, ymin: -8, ymax: 8 },
        ratio: {
          m: { min: 1, max: 5, step: 1, initial: 3 },
          n: { min: 1, max: 5, step: 1, initial: 1 },
          allowExternal: true,
          external: true,
        },
        readouts: ["components", "ratio"],
        caption:
          "External division: P is on the line AB but outside the segment. With m > n, P is beyond B. Make m < n and it jumps behind A. Set m = n and the point disappears.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Dividing externally in the ratio m : n",
      content:
        "P divides AB **externally** in the ratio $m : n$ (with $m \\neq n$) when P lies on the line AB, outside the segment, and $\\dfrac{AP}{PB} = \\dfrac{m}{n}$.",
    },
    {
      type: "text",
      content:
        "**Deriving the formula.** Take $m > n$, so P is beyond B. Let $AP = mk$ and $PB = nk$. Going from A to P passes through B, so $AB = AP - PB = (m - n)k$. P lies on ray AB, which gives",
    },
    {
      type: "math",
      latex:
        "\\overrightarrow{AP} = \\frac{m}{m-n}\\,\\overrightarrow{AB} \\;\\Longrightarrow\\; \\vec p = \\vec a + \\frac{m}{m-n}(\\vec b - \\vec a) = \\frac{m\\,\\vec b - n\\,\\vec a}{m-n}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Section formula (external)",
      content:
        "If P divides AB externally in the ratio $m : n$, then $\\vec p = \\dfrac{m\\,\\vec b - n\\,\\vec a}{m-n}$. The same formula covers $m < n$: numerator and denominator both change sign, and P lands behind A.",
    },
    {
      type: "text",
      content:
        "Compare it with the internal formula $\\frac{n\\vec a + m\\vec b}{m+n}$. Replace $n$ by $-n$ and you get exactly the external one. So you only need **one formula**: external division is internal division by the **negative ratio** $m : (-n)$. The weights $\\frac{-n}{m-n}$ and $\\frac{m}{m-n}$ still add to 1, which keeps P on the line AB, but one of them is now negative, which pushes P outside the segment.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Why m = n has no external point",
      content:
        "The formula would divide by $m - n = 0$. Geometrically, $AP = PB$ means P is the same distance from A and from B. Such points lie on the perpendicular bisector of AB, and it crosses the line AB only once, at the midpoint, which is *inside*. On the slider, as $m/n$ creeps towards 1 the external point runs off to infinity.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** A is $(1, 2)$ and B is $(3, 5)$. Find P dividing AB externally in the ratio $2 : 1$.\n\n**Step 1.** $\\vec p = \\dfrac{2\\vec b - \\vec a}{2 - 1} = 2\\vec b - \\vec a$.\n\n**Step 2.** $\\vec p = (6 - 1,\\ 10 - 2) = (5, 8)$.\n\n**Check.** $\\overrightarrow{AP} = (4, 6)$ and $\\overrightarrow{PB} = (-2, -3)$. Lengths are in the ratio $2 : 1$, and P lies beyond B as $m > n$ predicts.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (m < n).** A is $(4, 1)$ and B is $(6, 3)$. Find P dividing AB externally in the ratio $1 : 3$.\n\n**Step 1.** $\\vec p = \\dfrac{1\\cdot\\vec b - 3\\vec a}{1 - 3} = \\dfrac{\\vec b - 3\\vec a}{-2}$.\n\n**Step 2.** $\\vec b - 3\\vec a = (6 - 12,\\ 3 - 3) = (-6, 0)$, so $\\vec p = (3, 0)$.\n\n**Check.** $\\overrightarrow{AP} = (-1, -1)$ and $\\overrightarrow{PB} = (3, 3)$. The lengths are in the ratio $1 : 3$, and P is behind A.",
    },
    {
      type: "text",
      content:
        "**Finding the ratio from a point.** Often the point is given and the ratio is the unknown. Call the ratio $\\lambda : 1$ and use the internal formula $\\vec p = \\dfrac{\\vec a + \\lambda\\vec b}{1 + \\lambda}$. Solve one coordinate for $\\lambda$, check the others, then read off the sign.",
    },
    {
      type: "table",
      headers: ["Value of $\\lambda$", "Where P is", "Division"],
      rows: [
        ["$\\lambda > 0$", "between A and B", "internal, $\\lambda : 1$"],
        ["$\\lambda = 0$", "at A", "(trivial)"],
        ["$-1 < \\lambda < 0$", "beyond A", "external, $\\lvert\\lambda\\rvert : 1$, nearer A"],
        ["$\\lambda < -1$", "beyond B", "external, $\\lvert\\lambda\\rvert : 1$, nearer B"],
        ["$\\lambda = -1$", "nowhere", "impossible (the $m = n$ case)"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 3.** In what ratio does P$(8, -9)$ divide the segment joining A$(2, 3)$ and B$(6, -5)$?\n\n**Step 1.** x-coordinate: $\\dfrac{2 + 6\\lambda}{1 + \\lambda} = 8 \\Rightarrow 2 + 6\\lambda = 8 + 8\\lambda \\Rightarrow \\lambda = -3$.\n\n**Step 2.** Check with y: $\\dfrac{3 + (-5)(-3)}{1 - 3} = \\dfrac{18}{-2} = -9$. ✓ (If the y-check failed, P would not be on line AB at all.)\n\n**Step 3.** $\\lambda = -3 < -1$: P divides AB **externally**, in the ratio $3 : 1$, beyond B. The external formula agrees: $\\frac{3\\vec b - \\vec a}{2} = \\frac{(16, -18)}{2} = (8, -9)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a coordinate plane divides a segment).** In what ratio does the yz-plane divide the segment joining $(-2, 4, 7)$ and $(3, -5, 8)$?\n\n**Step 1.** Points on the yz-plane have $x = 0$. So $\\dfrac{-2 + 3\\lambda}{1 + \\lambda} = 0 \\Rightarrow \\lambda = \\dfrac23$.\n\n**Step 2.** $\\lambda > 0$: the plane divides the segment **internally**, in the ratio $2 : 3$. This makes sense, because the endpoints have x-coordinates of opposite signs, so they are on opposite sides of the plane.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (no coordinates at all).** P and Q have position vectors $2\\vec a + \\vec b$ and $\\vec a - 3\\vec b$. R divides PQ externally in the ratio $1 : 2$. Find $\\vec r$, and show that P is the midpoint of RQ.\n\n**Step 1.** The external formula with $m = 1$, $n = 2$: $\\vec r = \\dfrac{1\\cdot\\vec q - 2\\vec p}{1 - 2} = 2\\vec p - \\vec q$.\n\n**Step 2.** $\\vec r = 2(2\\vec a + \\vec b) - (\\vec a - 3\\vec b) = 3\\vec a + 5\\vec b$.\n\n**Step 3.** Midpoint of RQ: $\\dfrac{\\vec r + \\vec q}{2} = \\dfrac{(3\\vec a + 5\\vec b) + (\\vec a - 3\\vec b)}{2} = 2\\vec a + \\vec b = \\vec p$. ∎\n\nThe formulas never needed components. Position vectors written in terms of $\\vec a$ and $\\vec b$ are handled exactly like numbers. This is the form NCERT and board papers use most.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (application: extending a fence line).** Fence posts stand at A$(1, 2)$ and B$(5, 4)$, in metres. A gate post C must continue the same straight line past B and be three times as far from A as from B. Where does C go?\n\n**Step 1 (internal or external?).** C is on line AB but outside the segment, with $AC : CB = 3 : 1$. That is **external** division with $m = 3$, $n = 1$. *Why this step:* the words \"past B\" put C outside the segment. Since $m > n$, the formula will also place C beyond B, which agrees with the words.",
    },
    {
      type: "math",
      latex:
        "\\vec c = \\frac{3\\vec b - 1\\cdot\\vec a}{3 - 1} = \\frac{(15, 12) - (1, 2)}{2} = \\frac{(14, 10)}{2} = (7, 5)",
    },
    {
      type: "text",
      content:
        "**Step 2 (check it).** $\\overrightarrow{AB} = (4, 2)$ and $\\overrightarrow{AC} = (6, 3) = \\frac32\\overrightarrow{AB}$, so C is on the line, beyond B. $\\overrightarrow{CB} = (-2, -1)$, and $\\overrightarrow{AC} = -3\\,\\overrightarrow{CB}$, so $AC = 3\\,CB$ ✓. *Why this step:* a sign slip in the external formula lands you behind A instead, and this check catches it straight away.",
    },
    {
      type: "text",
      content:
        "**Worked example 7 (exam style: internal and external together).** P and Q divide AB internally and externally in the same ratio $m : n$, with $m > n$. Prove that $\\dfrac{1}{AP} + \\dfrac{1}{AQ} = \\dfrac{2}{AB}$. In words, AB is the **harmonic mean** of AP and AQ. P and Q are called **harmonic conjugates** with respect to A and B.\n\n**Step 1 (origin at A).** Take $\\vec a = \\vec 0$. *Why this step:* every length in the statement is measured from A, and this choice removes $\\vec a$ from both formulas.\n\n**Step 2 (both section formulas).** With $\\vec a = \\vec 0$ they collapse to multiples of $\\vec b$:",
    },
    {
      type: "math",
      latex: "\\vec p = \\frac{m}{m+n}\\,\\vec b, \\qquad \\vec q = \\frac{m}{m-n}\\,\\vec b",
    },
    {
      type: "text",
      content:
        "**Step 3 (lengths).** Both multipliers are positive because $m > n$, so $AP = \\frac{m}{m+n}AB$ and $AQ = \\frac{m}{m-n}AB$. *Why this step:* the length of $k\\vec b$ is $\\lvert k\\rvert\\,\\lvert\\vec b\\rvert$, and $\\lvert\\vec b\\rvert = AB$ when the origin is at A.\n\n**Step 4 (add the reciprocals).**",
    },
    {
      type: "math",
      latex:
        "\\frac{1}{AP} + \\frac{1}{AQ} = \\frac{m+n}{m\\,AB} + \\frac{m-n}{m\\,AB} = \\frac{2m}{m\\,AB} = \\frac{2}{AB} \\quad \\blacksquare",
    },
    {
      type: "text",
      content:
        "**Numerical check.** Take $AB = 6$ and the ratio $2 : 1$. Then $AP = 4$ and $AQ = 12$, and $\\frac14 + \\frac1{12} = \\frac{4}{12} = \\frac13 = \\frac26$ ✓.",
    },
    {
      type: "quiz",
      id: "va2-2-q1",
      variant: "concept",
      question:
        "You set the ratio as $\\lambda : 1$ and solve to get $\\lambda = -2$. What does that tell you?",
      options: [
        {
          text: "P divides AB internally in the ratio $2 : 1$, and the minus sign is a slip.",
          feedback: "The sign carries real information. A negative weight pushes P outside the segment.",
        },
        {
          text: "P divides AB externally in the ratio $2 : 1$, and it lies beyond B.",
          correct: true,
          feedback: "A negative $\\lambda$ means external division. Since $\\lvert\\lambda\\rvert > 1$, P is farther from A than from B, so it is past B.",
        },
        {
          text: "P divides AB externally in the ratio $2 : 1$, and it lies beyond A.",
          feedback: "Beyond A, P is nearer A, so $AP < PB$ and $\\lvert\\lambda\\rvert < 1$. Here $\\lvert\\lambda\\rvert = 2$.",
        },
        {
          text: "No such point exists.",
          feedback: "Only $\\lambda = -1$ is impossible.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-2-q6",
      variant: "concept",
      question: "P divides AB externally in the ratio $3 : 1$. Which is $\\vec p$?",
      options: [
        {
          text: "$\\dfrac{3\\vec b + \\vec a}{2}$",
          feedback: "That is not on line AB at all: the weights $\\frac32 + \\frac12$ add to 2, not 1. External division needs a minus sign in the numerator.",
        },
        {
          text: "$\\dfrac{\\vec a - 3\\vec b}{2}$",
          feedback: "The numerator's sign is flipped, so this is $-\\vec p$, the reflection of P through O. Keep $m\\vec b - n\\vec a$ over $m - n$.",
        },
        {
          text: "$\\dfrac{3\\vec b - \\vec a}{2}$",
          correct: true,
          feedback: "$\\frac{m\\vec b - n\\vec a}{m - n}$ with $m = 3$, $n = 1$. The weights $\\frac32$ and $-\\frac12$ add to 1, and the negative weight on A pushes P out beyond B.",
        },
        {
          text: "$\\dfrac{3\\vec a - \\vec b}{2}$",
          feedback: "The weights are crossed. This is the external $1 : 3$ point, which lies behind A.",
        },
      ],
      hint: "Check two things: the weights must add to 1, and P is beyond B, so B carries the big positive weight.",
    },
    {
      type: "quiz",
      id: "va2-2-q2",
      variant: "practice",
      question: "A is $(1, 0)$ and B is $(3, 2)$. Find P dividing AB externally in the ratio $3 : 2$.",
      options: [
        {
          text: "$(7, 6)$",
          correct: true,
          feedback: "$\\frac{3\\vec b - 2\\vec a}{3 - 2} = (9 - 2,\\ 6 - 0) = (7, 6)$. Check: AP $= (6, 6)$ and PB $= (-4, -4)$, lengths in the ratio $3 : 2$.",
        },
        {
          text: "$\\left(\\frac{11}{5}, \\frac{6}{5}\\right)$",
          feedback: "That is the internal $3 : 2$ point, which lies between A and B.",
        },
        {
          text: "$(-3, -4)$",
          feedback: "That is $3\\vec a - 2\\vec b$, the external $2 : 3$ point behind A. The weights are crossed.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-2-q3",
      variant: "concept",
      question: "Why is there no point dividing AB externally in the ratio $1 : 1$?",
      options: [
        {
          text: "External division is defined only for $m > n$.",
          feedback: "$m < n$ is fine: P then lies behind A.",
        },
        {
          text: "The point exists but is at the origin.",
          feedback: "Nothing about the ratio ties P to the origin. The equation $0\\cdot\\vec p = \\vec b - \\vec a$ has no solution.",
        },
        {
          text: "The points with $AP = PB$ lie on the perpendicular bisector of AB, which meets line AB only at the midpoint, and the midpoint is inside the segment.",
          correct: true,
          feedback: "The formula's zero denominator is this geometric fact in algebraic form.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-2-q4",
      variant: "practice",
      question: "In what ratio does C$(0, -3)$ divide the segment joining A$(2, 1)$ and B$(4, 5)$?",
      options: [
        {
          text: "Externally, $1 : 2$ (C is beyond A)",
          correct: true,
          feedback: "$\\frac{2 + 4\\lambda}{1+\\lambda} = 0$ gives $\\lambda = -\\frac12$. Check y: $\\frac{1 - \\frac52}{\\frac12} = -3$ ✓. Since $-1 < \\lambda < 0$, C is behind A.",
        },
        {
          text: "Internally, $1 : 2$",
          feedback: "C's x-coordinate 0 is not between 2 and 4, so C cannot be between A and B.",
        },
        {
          text: "Externally, $2 : 1$ (C is beyond B)",
          feedback: "Beyond B, the x-coordinate would exceed 4. C went the other way.",
        },
      ],
      hint: "Let the ratio be $\\lambda : 1$ and set the x-coordinate equal to 0.",
    },
    {
      type: "quiz",
      id: "va2-2-q5",
      variant: "practice",
      question: "In what ratio does the x-axis divide the segment joining $(3, -4)$ and $(-1, 2)$?",
      options: [
        {
          text: "Internally, $1 : 2$",
          feedback: "The first endpoint is 4 units from the axis and the second is 2, so the crossing is farther from the first. The ratio is $2 : 1$.",
        },
        {
          text: "Internally, $2 : 1$",
          correct: true,
          feedback: "On the x-axis $y = 0$: $\\frac{-4 + 2\\lambda}{1 + \\lambda} = 0$, so $\\lambda = 2$. It is positive, so the division is internal. The endpoints are on opposite sides of the axis, as expected.",
        },
        {
          text: "Externally, $2 : 1$",
          feedback: "The y-coordinates $-4$ and $2$ have opposite signs, so the axis crosses between the endpoints. The division is internal.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-2-q7",
      variant: "practice",
      question:
        "P and Q have position vectors $\\vec a + 2\\vec b$ and $4\\vec a - \\vec b$. R divides PQ internally in the ratio $1 : 2$. Find $\\vec r$.",
      options: [
        {
          text: "$3\\vec a$",
          feedback: "That is $\\frac{\\vec p + 2\\vec q}{3}$, the $2 : 1$ point. The weights are crossed: R is nearer P, so P gets the weight 2.",
        },
        {
          text: "$\\frac52\\vec a + \\frac12\\vec b$",
          feedback: "That is the midpoint of PQ, the $1 : 1$ split.",
        },
        {
          text: "$2\\vec a + \\vec b$",
          correct: true,
          feedback: "$\\vec r = \\frac{2\\vec p + \\vec q}{3} = \\frac{(2\\vec a + 4\\vec b) + (4\\vec a - \\vec b)}{3} = \\frac{6\\vec a + 3\\vec b}{3}$.",
        },
        {
          text: "$-2\\vec a + 5\\vec b$",
          feedback: "That is $2\\vec p - \\vec q$, the external $2 : 1$ point. The division here is internal.",
        },
      ],
      hint: "Treat $\\vec a$ and $\\vec b$ like numbers: $\\vec r = \\frac{n\\vec p + m\\vec q}{m + n}$.",
    },
    {
      type: "quiz",
      id: "va2-2-q8",
      variant: "practice",
      question:
        "Two street lamps stand at A$(2, 3)$ and B$(5, 7)$. A third lamp C goes on line AB, behind A, so that $AC : CB = 1 : 2$. Where is C?",
      options: [
        {
          text: "$(1, 1)$",
          feedback: "That is only the numerator $\\vec b - 2\\vec a$. The denominator is $m - n = -1$, which flips the sign.",
        },
        {
          text: "$(-1, -1)$",
          correct: true,
          feedback: "$\\vec c = \\frac{1\\cdot\\vec b - 2\\vec a}{1 - 2} = 2\\vec a - \\vec b = (4 - 5,\\ 6 - 7) = (-1, -1)$. Check: $\\overrightarrow{AC} = (-3, -4)$ has length 5 and $\\overrightarrow{CB} = (6, 8)$ has length 10.",
        },
        {
          text: "$(8, 11)$",
          feedback: "That is $2\\vec b - \\vec a$, the external $2 : 1$ point beyond B. The weights are crossed.",
        },
        {
          text: "$\\left(3, \\frac{13}{3}\\right)$",
          feedback: "That is the internal $1 : 2$ point, between A and B. C is behind A.",
        },
      ],
      hint: "Use $\\vec c = \\frac{m\\vec b - n\\vec a}{m - n}$ with $m = 1$, $n = 2$, and watch the negative denominator.",
    },
    {
      type: "quiz",
      id: "va2-2-q9",
      variant: "practice",
      question:
        "A segment AB has length 8. P and Q divide AB internally and externally in the ratio $3 : 1$. How long is PQ?",
      options: [
        {
          text: "12",
          feedback: "That is AQ, measured from A. P is 6 along the same ray, so subtract.",
        },
        {
          text: "18",
          feedback: "That adds AP and AQ as if P and Q were on opposite sides of A. With $m > n$ both lie on ray AB.",
        },
        {
          text: "6",
          correct: true,
          feedback: "With the origin at A: $AP = \\frac34 \\cdot 8 = 6$ and $AQ = \\frac32 \\cdot 8 = 12$, on the same ray, so $PQ = 6$. Harmonic check: $\\frac16 + \\frac1{12} = \\frac14 = \\frac28$ ✓.",
        },
        {
          text: "4",
          feedback: "That is BQ, the stretch beyond B. P is still 2 short of B, so add $PB = 2$.",
        },
      ],
      hint: "Put the origin at A. Then $\\vec p = \\frac{m}{m+n}\\vec b$ and $\\vec q = \\frac{m}{m-n}\\vec b$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "centroid-and-medians",
  title: "2.3 · Centroid and Medians",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Cut a triangle out of cardboard and try to balance it on a pencil tip. There is exactly one point where it balances. That point is the **centroid**, where the three **medians** cross. A median joins a vertex to the midpoint of the opposite side. Why should three lines drawn this way pass through one point? The section formula answers that in two lines.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "triangle",
        a: [-4, -3],
        b: [5, -2],
        c: [2, 4],
        draggable: ["a", "b", "c"],
        readouts: ["components", "ratio"],
        caption:
          "Drag any vertex. The three medians always meet at one point G. It always sits two-thirds of the way down each median from the vertex.",
      },
    },
    {
      type: "text",
      content:
        "**Deriving the centroid.** Let D be the midpoint of BC, so $\\vec d = \\dfrac{\\vec b + \\vec c}{2}$. On the median AD, take the point G that divides it in the ratio $2 : 1$ from A. By the section formula (A gets weight 1, D gets weight 2):",
    },
    {
      type: "math",
      latex:
        "\\vec g = \\frac{1\\cdot\\vec a + 2\\,\\vec d}{3} = \\frac{\\vec a + (\\vec b + \\vec c)}{3} = \\frac{\\vec a + \\vec b + \\vec c}{3}",
    },
    {
      type: "text",
      content:
        "**Now use symmetry.** The result $\\frac{\\vec a + \\vec b + \\vec c}{3}$ does not care which vertex was called A. Repeat the calculation on the median from B, taking the $2 : 1$ point from B, and you get $\\frac{\\vec b + \\vec c + \\vec a}{3}$. It is the same vector. So the $2 : 1$ point of every median is the same point, and all three medians pass through it. The concurrence of the medians is proved.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Centroid of a triangle",
      content:
        "The centroid of triangle ABC is $\\vec g = \\dfrac{\\vec a + \\vec b + \\vec c}{3}$, the plain average of the three vertices. It lies on every median and divides each one in the ratio $2 : 1$ **measured from the vertex**: $AG : GD = 2 : 1$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: '1 : 2 from the vertex'",
      content:
        "The centroid is **closer to the side** than to the vertex. From the vertex it is $AG : GD = 2 : 1$, so $AG = \\frac23 AD$. If you place it one-third of the way from the vertex, you get $\\frac{2\\vec a + \\vec d}{3} = \\frac{4\\vec a + \\vec b + \\vec c}{6}$. That is not symmetric in A, B, C, so it cannot be the common point of all three medians.",
    },
    {
      type: "text",
      content:
        "**A tidy consequence.** The vectors from the centroid to the three vertices cancel:",
    },
    {
      type: "math",
      latex:
        "\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC} = (\\vec a - \\vec g) + (\\vec b - \\vec g) + (\\vec c - \\vec g) = (\\vec a + \\vec b + \\vec c) - 3\\vec g = \\vec 0",
    },
    {
      type: "text",
      content:
        "This is the balance point in vector language: equal masses at the vertices pull on G with total zero. In particular, if the centroid is taken as the origin, then $\\vec a + \\vec b + \\vec c = \\vec 0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Find the centroid of the triangle with vertices A$(2, -1, 4)$, B$(-3, 5, 1)$ and C$(4, 2, -2)$.\n\n**Step 1.** Add the vertices: $(2 - 3 + 4,\\ -1 + 5 + 2,\\ 4 + 1 - 2) = (3, 6, 3)$.\n\n**Step 2.** Divide by 3: G is $(1, 2, 1)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (missing vertex).** The centroid of triangle ABC is G$(2, 1)$, with A$(1, 3)$ and B$(4, -2)$. Find C.\n\n**Step 1.** $\\vec a + \\vec b + \\vec c = 3\\vec g$, so $\\vec c = 3\\vec g - \\vec a - \\vec b$.\n\n**Step 2.** $\\vec c = (6 - 1 - 4,\\ 3 - 3 + 2) = (1, 2)$.\n\n**Check.** $\\frac{(1,3) + (4,-2) + (1,2)}{3} = \\frac{(6, 3)}{3} = (2, 1)$ ✓.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (median lengths).** Median AD has length 12. How far is the centroid from A, and from D?\n\n**Step 1.** $AG : GD = 2 : 1$ splits 12 into $2 + 1 = 3$ parts of 4.\n\n**Step 2.** $AG = 8$ and $GD = 4$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (application: hanging a plate level).** A uniform triangular steel plate has corners A$(0, 0)$, B$(12, 0)$ and C$(3, 9)$, in cm. A hole drilled at the centroid lets the plate hang level from a hook. Where should the hole go? Confirm that it is two-thirds of the way down the median from A.\n\n**Step 1 (average the corners).** $\\vec g = \\frac{(0 + 12 + 3,\\ 0 + 0 + 9)}{3} = \\frac{(15, 9)}{3} = (5, 3)$. *Why this step:* a uniform plate balances where equal masses at its three corners would balance, and that is the plain average of the corners.\n\n**Step 2 (the median's foot).** D, the midpoint of BC, is $\\left(\\frac{15}{2}, \\frac92\\right)$. *Why this step:* the median from A ends at the midpoint of the side opposite A.\n\n**Step 3 (compare).**",
    },
    {
      type: "math",
      latex:
        "\\tfrac23\\,\\overrightarrow{AD} = \\tfrac23\\left(\\tfrac{15}{2}, \\tfrac92\\right) = (5, 3) = \\overrightarrow{AG} \\;\\checkmark",
    },
    {
      type: "text",
      content:
        "So the hole goes at $(5, 3)$, two-thirds of the way from A to D. *Why check at all:* if you had placed G one-third of the way down the median, this comparison would fail.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style: triangle from its midpoints).** The midpoints of sides BC, CA and AB of triangle ABC are D$(1, 2, -3)$, E$(3, 0, 1)$ and F$(-1, 1, -4)$. Find the centroid of ABC and its vertices.\n\n**Step 1 (add the midpoints).** Each vertex appears in exactly two of the three midpoints. *Why this step:* adding the midpoints therefore counts every vertex twice, and the $\\frac12$ cancels that.",
    },
    {
      type: "math",
      latex:
        "\\vec d + \\vec e + \\vec f = \\frac{(\\vec b + \\vec c) + (\\vec c + \\vec a) + (\\vec a + \\vec b)}{2} = \\vec a + \\vec b + \\vec c",
    },
    {
      type: "text",
      content:
        "**Step 2 (centroid).** $\\vec g = \\frac{\\vec d + \\vec e + \\vec f}{3} = \\frac{(3, 3, -6)}{3} = (1, 1, -2)$. So the midpoint triangle DEF has **the same centroid** as ABC.\n\n**Step 3 (vertices).** $\\vec e + \\vec f = \\frac{\\vec c + \\vec a}{2} + \\frac{\\vec a + \\vec b}{2} = \\vec a + \\frac{\\vec b + \\vec c}{2} = \\vec a + \\vec d$, so $\\vec a = \\vec e + \\vec f - \\vec d$. *Why this step:* AFDE is a parallelogram (by the midpoint theorem, proved in 2.5), so this is the same as finding its fourth vertex.\n\n$\\vec a = (3 - 1 - 1,\\ 0 + 1 - 2,\\ 1 - 4 + 3) = (1, -1, 0)$. In the same way, $\\vec b = \\vec d + \\vec f - \\vec e = (-3, 3, -8)$ and $\\vec c = \\vec d + \\vec e - \\vec f = (5, 1, 2)$.\n\n**Check.** $\\frac{\\vec b + \\vec c}{2} = \\frac{(2, 4, -6)}{2} = (1, 2, -3) = \\vec d$ ✓, and $\\frac{\\vec a + \\vec b + \\vec c}{3} = \\frac{(3, 3, -6)}{3} = (1, 1, -2)$ ✓.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Extension (JEE): the incentre",
      content:
        "The centroid weights the vertices equally. The **incentre** I, where the three angle bisectors meet, weights each vertex by the length of the **opposite side**:\n\n$\\vec I = \\dfrac{BC\\cdot\\vec a + CA\\cdot\\vec b + AB\\cdot\\vec c}{BC + CA + AB}$\n\n**Why.** The bisector from A meets BC at D with $BD : DC = AB : CA$ (angle bisector theorem), so $\\vec d = \\dfrac{CA\\,\\vec b + AB\\,\\vec c}{AB + CA}$. In triangle ABD the bisector from B cuts AD in the ratio $AI : ID = AB : BD = (AB + CA) : BC$. The section formula then gives the expression above. It is symmetric in the three vertices, so all three bisectors pass through I.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Extension: the centroid of a tetrahedron",
      content:
        "For a tetrahedron ABCD the same averaging gives $\\vec g = \\dfrac{\\vec a + \\vec b + \\vec c + \\vec d}{4}$. It lies on the segment from each vertex to the centroid of the opposite face, dividing it $3 : 1$ from the vertex. Check: $\\frac{1\\cdot\\vec d + 3\\cdot\\frac{\\vec a + \\vec b + \\vec c}{3}}{4} = \\frac{\\vec a + \\vec b + \\vec c + \\vec d}{4}$. It is also the midpoint of each segment joining the midpoints of opposite edges.",
    },
    {
      type: "table",
      headers: ["Figure", "Balance point", "Ratio from a vertex"],
      rows: [
        ["Segment AB", "$\\dfrac{\\vec a + \\vec b}{2}$", "$1 : 1$"],
        ["Triangle ABC", "$\\dfrac{\\vec a + \\vec b + \\vec c}{3}$", "$2 : 1$ along a median"],
        ["Tetrahedron ABCD", "$\\dfrac{\\vec a + \\vec b + \\vec c + \\vec d}{4}$", "$3 : 1$ to the opposite face's centroid"],
      ],
    },
    {
      type: "quiz",
      id: "va2-3-q1",
      variant: "concept",
      question: "In triangle ABC, D is the midpoint of BC and G is the centroid. What is $AG : GD$?",
      options: [
        {
          text: "$1 : 2$",
          feedback: "That point is one-third of the way from A, and it is not symmetric in A, B, C. The centroid is nearer the side.",
        },
        {
          text: "$1 : 1$",
          feedback: "The midpoint of the median is $\\frac{2\\vec a + \\vec b + \\vec c}{4}$. That is not symmetric, so it is not on the other medians.",
        },
        {
          text: "$3 : 1$",
          feedback: "$3 : 1$ is the tetrahedron's ratio, one dimension up.",
        },
        {
          text: "$2 : 1$",
          correct: true,
          feedback: "G is two-thirds of the way from the vertex, closer to the side.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-3-q2",
      variant: "practice",
      question: "Find the centroid of the triangle with vertices $(1, 4)$, $(-2, 3)$ and $(4, -1)$.",
      options: [
        {
          text: "$(1, 2)$",
          correct: true,
          feedback: "Sum $= (3, 6)$. Divide by 3 to get $(1, 2)$.",
        },
        {
          text: "$(3, 6)$",
          feedback: "That is the sum of the vertices. Divide by 3.",
        },
        {
          text: "$\\left(\\frac32, 3\\right)$",
          feedback: "That divides by 2. A triangle's centroid averages three points.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-3-q3",
      variant: "practice",
      question: "The centroid of triangle ABC is at the origin, with A$(3, -1)$ and B$(-5, 4)$. Find C.",
      options: [
        {
          text: "$(-2, 3)$",
          feedback: "That is $\\vec a + \\vec b$. The sign is wrong, and the three vectors would then add to $2(\\vec a + \\vec b)$, not zero.",
        },
        {
          text: "$(-1, 1.5)$",
          feedback: "That is the midpoint of AB, not a vertex.",
        },
        {
          text: "$(2, -3)$",
          correct: true,
          feedback: "$\\vec a + \\vec b + \\vec c = \\vec 0$, so $\\vec c = -\\vec a - \\vec b = (-3 + 5,\\ 1 - 4) = (2, -3)$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-3-q4",
      variant: "concept",
      question: "G is the centroid of triangle ABC. What is $\\overrightarrow{GA} + \\overrightarrow{GB} + \\overrightarrow{GC}$?",
      options: [
        {
          text: "$3\\vec g$",
          feedback: "That is $\\vec a + \\vec b + \\vec c$, the sum of position vectors from O, not from G.",
        },
        {
          text: "$\\vec 0$",
          correct: true,
          feedback: "$(\\vec a + \\vec b + \\vec c) - 3\\vec g = \\vec 0$. The three pulls balance.",
        },
        {
          text: "$\\overrightarrow{AB} + \\overrightarrow{BC}$",
          feedback: "That equals $\\overrightarrow{AC}$, which is not zero in general.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-3-q5",
      variant: "practice",
      question: "The median from A has length 9. How far is the centroid from A?",
      options: [
        { text: "6", correct: true, feedback: "$AG = \\frac23 \\times 9 = 6$ and $GD = 3$." },
        { text: "3", feedback: "3 is GD, the short piece next to the side." },
        { text: "4.5", feedback: "That is the midpoint of the median. The centroid is past it, nearer the side." },
      ],
    },
    {
      type: "quiz",
      id: "va2-3-q6",
      variant: "practice",
      question:
        "Find the centroid of the tetrahedron with vertices $(0,0,0)$, $(4,0,0)$, $(0,4,0)$ and $(0,0,4)$.",
      options: [
        {
          text: "$\\left(\\frac43, \\frac43, \\frac43\\right)$",
          feedback: "That divides by 3. It is the centroid of the face opposite the origin, not of the solid.",
        },
        {
          text: "$(1, 1, 1)$",
          correct: true,
          feedback: "Sum $= (4, 4, 4)$. Four vertices, so divide by 4.",
        },
        {
          text: "$(2, 2, 2)$",
          feedback: "That divides by 2 and lands outside the tetrahedron, which lies in $x + y + z \\le 4$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-3-q7",
      variant: "practice",
      question: "Find the incentre of the right triangle with vertices O$(0, 0)$, A$(4, 0)$ and B$(0, 3)$.",
      options: [
        {
          text: "$\\left(\\frac43, 1\\right)$",
          feedback: "That is the centroid, with equal weights. The incentre weights each vertex by its opposite side.",
        },
        {
          text: "$\\left(\\frac43, \\frac34\\right)$",
          feedback: "That weights each vertex by an adjacent side (A by $OA = 4$, B by $OB = 3$). The weight belongs to the side opposite the vertex.",
        },
        {
          text: "$(1, 1)$",
          correct: true,
          feedback: "Opposite sides: $AB = 5$ (opposite O), $OB = 3$ (opposite A), $OA = 4$ (opposite B). $\\vec I = \\frac{5(0,0) + 3(4,0) + 4(0,3)}{12} = \\frac{(12, 12)}{12} = (1, 1)$. It is 1 unit from both axes, and the inradius $\\frac{3 + 4 - 5}{2} = 1$ agrees.",
        },
        {
          text: "$\\left(2, \\frac32\\right)$",
          feedback: "That is the midpoint of the hypotenuse, the circumcentre of a right triangle. It is not the incentre.",
        },
      ],
      hint: "Weight each vertex by the length of the side opposite it, then divide by the perimeter.",
    },
    {
      type: "quiz",
      id: "va2-3-q8",
      variant: "practice",
      question:
        "A uniform triangular signboard has corners at $(0, 0)$, $(9, 0)$ and $(0, 6)$, in decimetres. At which point should it be hung so that it stays level?",
      options: [
        {
          text: "$\\left(\\frac92, 3\\right)$",
          feedback: "That is the midpoint of the hypotenuse, which is the sum of the corners divided by 2. A triangle balances at the average of three points.",
        },
        {
          text: "$(3, 2)$",
          correct: true,
          feedback: "$\\frac{(0 + 9 + 0,\\ 0 + 0 + 6)}{3} = (3, 2)$. It is two-thirds of the way from the right-angle corner to the midpoint $\\left(\\frac92, 3\\right)$ of the hypotenuse.",
        },
        {
          text: "$(9, 6)$",
          feedback: "That is the sum of the corners, and it is not even on the board. Divide by 3.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-3-q9",
      variant: "practice",
      question:
        "The midpoints of the sides of triangle ABC are $(2, 1)$, $(5, 3)$ and $(2, 5)$. Where is the centroid of ABC?",
      options: [
        {
          text: "It cannot be found without first finding A, B and C.",
          feedback: "It can. The midpoints add up to $\\vec a + \\vec b + \\vec c$, so the midpoint triangle has the same centroid as ABC.",
        },
        {
          text: "$(9, 9)$",
          feedback: "That is the sum of the midpoints, which equals $\\vec a + \\vec b + \\vec c$. Divide by 3.",
        },
        {
          text: "$\\left(\\frac92, \\frac92\\right)$",
          feedback: "That divides by 2. The centroid divides $\\vec a + \\vec b + \\vec c$ by 3.",
        },
        {
          text: "$(3, 3)$",
          correct: true,
          feedback: "The midpoints add to $(9, 9) = \\vec a + \\vec b + \\vec c$, so $\\vec g = (3, 3)$. It is also the centroid of the midpoint triangle.",
        },
      ],
      hint: "Each vertex appears in two of the three midpoints. What do the midpoints add up to?",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "linear-combinations-and-collinearity",
  title: "2.4 · Linear Combinations and Collinearity",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The section formula builds a new point from $\\vec a$ and $\\vec b$ by scaling them and adding. Now let the two scalars be **anything**, not weights that add to 1. The result $x\\vec a + y\\vec b$ is called a **linear combination** of $\\vec a$ and $\\vec b$. Which vectors can you build this way?",
    },
    {
      type: "text",
      content:
        "Try it. Below, $\\vec a = (2, 1)$ and $\\vec b = (-1, 2)$. Use the $x$ and $y$ sliders to land the tip on the point $(3, 4)$. Then reach $(-4, 3)$, and after that $(5, 0)$. Two fixed directions, and three quite different targets.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "combination",
        a: [2, 1],
        b: [-1, 2],
        draggable: ["a", "b"],
        window: { xmin: -8, xmax: 8, ymin: -6, ymax: 6 },
        combo: {
          x: { min: -3, max: 3, step: 0.5, initial: 1 },
          y: { min: -3, max: 3, step: 0.5, initial: 1 },
        },
        readouts: ["components", "sum"],
        caption:
          "x·a + y·b: slide x to stretch along a and y to stretch along b. The two directions together cover the whole plane. (x = 2, y = 1 lands on (3, 4); x = −1, y = 2 lands on (−4, 3); x = 2, y = −1 lands on (5, 0).)",
      },
    },
    {
      type: "text",
      content:
        "**Why every point is reachable.** Take any vector $\\vec r$ from O. Through its tip draw a line parallel to $\\vec b$. It is not parallel to the line of $\\vec a$, so it meets that line at some point, and that point is $x\\vec a$ for some $x$. The remaining leg is parallel to $\\vec b$, so it is $y\\vec b$. That gives $\\vec r = x\\vec a + y\\vec b$, a parallelogram with $\\vec r$ as its diagonal.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Every plane vector is a combination of two non-collinear ones",
      content:
        "If $\\vec a$ and $\\vec b$ are non-zero and **not collinear**, every vector $\\vec r$ in their plane can be written as $\\vec r = x\\vec a + y\\vec b$ for **exactly one** pair of scalars $x, y$.",
    },
    {
      type: "text",
      content:
        "**Why the pair is unique.** Suppose $x\\vec a + y\\vec b = x'\\vec a + y'\\vec b$. Then $(x - x')\\vec a = (y' - y)\\vec b$. If $x \\neq x'$, dividing shows $\\vec a$ is a multiple of $\\vec b$, so they are collinear, which contradicts the assumption. So $x = x'$, and then $y = y'$. This gives a working rule you will use again and again:",
    },
    {
      type: "math",
      latex:
        "\\vec a, \\vec b \\text{ not collinear and } x\\vec a + y\\vec b = \\vec 0 \\;\\Longrightarrow\\; x = y = 0",
    },
    {
      type: "text",
      content:
        "In other words, you may **compare coefficients** of $\\vec a$ and $\\vec b$, just as you compare coefficients of $\\hat i$ and $\\hat j$. That is the engine behind several proofs in 2.5.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: any two vectors can build any vector",
      content:
        "Only if they point in genuinely different directions. If $\\vec b = 2\\vec a$, then $x\\vec a + y\\vec b = (x + 2y)\\vec a$, which is always a multiple of $\\vec a$. However you set the sliders, you stay on one line. Below, $\\vec b$ is parallel to $\\vec a$. Try to leave the line.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "combination",
        a: [2, 1],
        b: [4, 2],
        draggable: ["a", "b"],
        combo: {
          x: { min: -3, max: 3, step: 0.5, initial: 1 },
          y: { min: -3, max: 3, step: 0.5, initial: 0.5 },
        },
        readouts: ["components", "sum"],
        caption:
          "With b parallel to a, every combination lies on a single line through O. Drag b off the line and the whole plane opens up again.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Write $\\vec r = (5, 3)$ as a combination of $\\vec a = (1, 2)$ and $\\vec b = (3, -1)$.\n\n**Step 1.** $x(1, 2) + y(3, -1) = (5, 3)$ gives two equations: $x + 3y = 5$ and $2x - y = 3$.\n\n**Step 2.** From the second, $y = 2x - 3$. Substituting, $x + 6x - 9 = 5$, so $x = 2$ and $y = 1$.\n\n**Check.** $2(1, 2) + (3, -1) = (5, 3)$ ✓. So $\\vec r = 2\\vec a + \\vec b$.",
    },
    {
      type: "text",
      content:
        "**Collinearity of three points.** A, B and C lie on one line exactly when $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel:",
    },
    {
      type: "math",
      latex:
        "A, B, C \\text{ collinear} \\iff \\overrightarrow{AB} = \\lambda\\,\\overrightarrow{AC} \\text{ for some scalar } \\lambda",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Are A$(1, 2, -1)$, B$(3, 5, 1)$ and C$(7, 11, 5)$ collinear?\n\n**Step 1.** $\\overrightarrow{AB} = (2, 3, 2)$ and $\\overrightarrow{AC} = (6, 9, 6)$.\n\n**Step 2.** $\\overrightarrow{AC} = 3\\,\\overrightarrow{AB}$, so the two arrows are parallel and share the point A. The points are collinear, and B is a third of the way from A to C.\n\nChange C to $(7, 11, 6)$: now $\\overrightarrow{AC} = (6, 9, 7)$. The ratios $\\frac62 = \\frac93 \\neq \\frac72$, so the points are not collinear.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (application: will the laser hit?).** On a lab bench a laser at A$(1, 2)$ shines through a pinhole at B$(4, 6)$, in cm. Will the beam hit a target at C$(10, 14)$? What about a target at D$(13, 17)$?\n\n**Step 1.** The beam's direction is $\\overrightarrow{AB} = (3, 4)$. *Why this step:* the beam is the line through A along $\\overrightarrow{AB}$, so the test is whether $\\overrightarrow{AC}$ is a multiple of it.\n\n**Step 2 (target C).** $\\overrightarrow{AC} = (9, 12) = 3\\,\\overrightarrow{AB}$. The multiplier is 3, positive and bigger than 1, so C is on the beam **beyond** the pinhole. It is hit.\n\n**Step 3 (target D).** $\\overrightarrow{AD} = (12, 15)$. The x-components give $\\frac{12}{3} = 4$, but the y-components give $\\frac{15}{4} = 3.75$. They do not match, so D is missed. *Why check every component:* one matching ratio only says D is at the right x-position. The line test needs the **same** multiplier in every component.",
    },
    {
      type: "text",
      content:
        "**The weighted form of the test.** If C is on line AB, then $\\vec c = (1 - t)\\vec a + t\\vec b$ for some $t$. This is the section formula with weights that add to 1. Move everything to one side:",
    },
    {
      type: "math",
      latex:
        "(1 - t)\\,\\vec a + t\\,\\vec b - \\vec c = \\vec 0, \\qquad (1 - t) + t + (-1) = 0",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Collinearity from a vector relation",
      content:
        "A, B, C are collinear if and only if there are scalars $\\alpha, \\beta, \\gamma$, not all zero, with $\\alpha\\vec a + \\beta\\vec b + \\gamma\\vec c = \\vec 0$ **and** $\\alpha + \\beta + \\gamma = 0$.",
    },
    {
      type: "text",
      content:
        "Why must the coefficients add to zero? Collinearity is a fact about the points, so it cannot depend on where you put the origin. Move the origin to a point Q and every position vector drops by $\\vec q$. The relation then picks up an extra $-(\\alpha + \\beta + \\gamma)\\vec q$. That extra term is zero for every choice of origin only when the coefficients add to zero. A relation like $\\vec a + \\vec b + \\vec c = \\vec 0$ (sum 3) is different: it says the origin is the centroid, a statement about O, not about the line.",
    },
    {
      type: "text",
      content:
        "**Worked example 4.** $\\vec u, \\vec v, \\vec w$ are non-coplanar. Show that the points with position vectors $\\vec u - 2\\vec v + 3\\vec w$, $2\\vec u + 3\\vec v - 4\\vec w$ and $-7\\vec v + 10\\vec w$ are collinear.\n\n**Step 1.** $\\overrightarrow{AB} = (2\\vec u + 3\\vec v - 4\\vec w) - (\\vec u - 2\\vec v + 3\\vec w) = \\vec u + 5\\vec v - 7\\vec w$.\n\n**Step 2.** $\\overrightarrow{AC} = (-7\\vec v + 10\\vec w) - (\\vec u - 2\\vec v + 3\\vec w) = -\\vec u - 5\\vec v + 7\\vec w$.\n\n**Step 3.** $\\overrightarrow{AC} = -\\overrightarrow{AB}$, so the two are parallel and share A. The points are collinear, with A the midpoint of BC.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style: collinear vectors with a parameter).** $\\vec a$ and $\\vec b$ are not collinear. Find $x$ so that $\\vec u = (x - 2)\\vec a + \\vec b$ and $\\vec v = (3 + 2x)\\vec a - 2\\vec b$ are collinear.\n\n**Step 1 (translate).** $\\vec u \\neq \\vec 0$, because its $\\vec b$-coefficient is 1. So collinear means $\\vec v = k\\,\\vec u$ for some scalar $k$. *Why this step:* parallel vectors are scalar multiples of each other, and writing one as $k$ times the other turns the geometry into an equation.",
    },
    {
      type: "math",
      latex: "(3 + 2x)\\,\\vec a - 2\\,\\vec b = k(x - 2)\\,\\vec a + k\\,\\vec b",
    },
    {
      type: "text",
      content:
        "**Step 2 (compare coefficients).** $\\vec b$: $-2 = k$. $\\vec a$: $3 + 2x = k(x - 2)$. *Why this step is allowed:* $\\vec a$ and $\\vec b$ are not collinear, so every vector has exactly one pair of coefficients along them.\n\n**Step 3 (solve).** $3 + 2x = -2(x - 2) = -2x + 4$, so $4x = 1$ and $x = \\frac14$.\n\n**Check.** $\\vec u = -\\frac74\\vec a + \\vec b$ and $\\vec v = \\frac72\\vec a - 2\\vec b = -2\\vec u$ ✓. The two vectors are parallel but point in opposite directions.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Preview: one dimension up",
      content:
        "In space, two non-collinear vectors build only a **plane** of combinations. A third vector $\\vec c$ is **coplanar** with $\\vec a$ and $\\vec b$ exactly when $\\vec c = x\\vec a + y\\vec b$. Three non-coplanar vectors build all of space. Chapter 5 turns this into a single number, the scalar triple product, which is zero exactly for coplanar vectors.",
    },
    {
      type: "quiz",
      id: "va2-4-q1",
      variant: "concept",
      question: "With $\\vec a = (1, 2)$ and $\\vec b = (2, 4)$, can you write $(3, 1)$ as $x\\vec a + y\\vec b$?",
      options: [
        {
          text: "Yes. Any two non-zero vectors can build any plane vector.",
          feedback: "Only if they are not collinear. These two point the same way.",
        },
        {
          text: "No. Every combination is a multiple of $(1, 2)$, and $(3, 1)$ is not.",
          correct: true,
          feedback: "$\\vec b = 2\\vec a$, so $x\\vec a + y\\vec b = (x + 2y)(1, 2)$. That covers one line only.",
        },
        {
          text: "Yes, but only with negative $x$ and $y$.",
          feedback: "Negative scalars still keep you on the line through O along $(1, 2)$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-4-q2",
      variant: "practice",
      question: "Write $(1, 8)$ as $x\\vec a + y\\vec b$ with $\\vec a = (2, 1)$ and $\\vec b = (-1, 2)$.",
      options: [
        {
          text: "$x = 2,\\ y = 3$",
          correct: true,
          feedback: "$2(2,1) + 3(-1,2) = (4 - 3,\\ 2 + 6) = (1, 8)$ ✓.",
        },
        {
          text: "$x = 3,\\ y = 2$",
          feedback: "$3(2,1) + 2(-1,2) = (4, 7)$. Close, but the coefficients are swapped.",
        },
        {
          text: "$x = 1,\\ y = 8$",
          feedback: "Those are the components along $\\hat i$ and $\\hat j$. Along $\\vec a$ and $\\vec b$ the coefficients are different.",
        },
      ],
      hint: "Solve $2x - y = 1$ and $x + 2y = 8$ together.",
    },
    {
      type: "quiz",
      id: "va2-4-q3",
      variant: "practice",
      question: "For what value of $k$ are A$(1, 3)$, B$(3, k)$ and C$(4, 9)$ collinear?",
      options: [
        {
          text: "$k = 6$",
          feedback: "Then $\\overrightarrow{AB} = (2, 3)$, which is not a multiple of $(3, 6)$.",
        },
        {
          text: "$k = 9$",
          feedback: "Then B would be level with C, and A is lower, so the three points cannot be on one line.",
        },
        {
          text: "$k = 7$",
          correct: true,
          feedback: "$\\overrightarrow{AC} = (3, 6)$ has slope 2, so $\\overrightarrow{AB} = (2, k - 3)$ needs $k - 3 = 4$.",
        },
        {
          text: "$k = 5$",
          feedback: "Then $\\overrightarrow{AB} = (2, 2)$ has slope 1, not 2.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-4-q4",
      variant: "concept",
      question:
        "The position vectors of A, B, C satisfy $2\\vec a - 5\\vec b + 3\\vec c = \\vec 0$. What can you conclude?",
      options: [
        {
          text: "The origin is the centroid of triangle ABC.",
          feedback: "That needs $\\vec a + \\vec b + \\vec c = \\vec 0$, with equal coefficients.",
        },
        {
          text: "Nothing, because the coefficients are not all equal.",
          feedback: "Equal coefficients are not what matters. What matters is that they add to zero.",
        },
        {
          text: "They are collinear only if the origin is on the same line.",
          feedback: "Because the coefficients add to zero, the relation holds for every origin. The line does not need to pass through O.",
        },
        {
          text: "A, B and C are collinear.",
          correct: true,
          feedback: "The coefficients add to $2 - 5 + 3 = 0$, which is the collinearity test. In fact $\\vec b = \\frac{2\\vec a + 3\\vec c}{5}$, so B divides AC internally in the ratio $3 : 2$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-4-q5",
      variant: "concept",
      question:
        "$\\vec a$ and $\\vec b$ are not collinear, and $(x - 2)\\vec a + (y + 1)\\vec b = \\vec 0$. What are $x$ and $y$?",
      options: [
        {
          text: "Any $x, y$ with $x - 2 = -(y + 1)$",
          feedback: "That would make the combination $(x-2)(\\vec a - \\vec b)$, which is not zero unless $x = 2$.",
        },
        {
          text: "$x = 2,\\ y = -1$",
          correct: true,
          feedback: "For non-collinear vectors the only combination giving $\\vec 0$ has both coefficients zero.",
        },
        {
          text: "It cannot be decided without the components of $\\vec a$ and $\\vec b$.",
          feedback: "Not needed. Non-collinearity alone forces both coefficients to be zero.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-4-q6",
      variant: "practice",
      question: "A straight road passes through A$(2, 1)$ and B$(5, 7)$. Which of these points is on the road?",
      options: [
        {
          text: "$(7, 10)$",
          feedback: "$\\overrightarrow{AC} = (5, 9)$. The multipliers are $\\frac53$ and $\\frac96 = \\frac32$, which do not match.",
        },
        {
          text: "$(8, 13)$",
          correct: true,
          feedback: "$\\overrightarrow{AC} = (6, 12) = 2\\,\\overrightarrow{AB}$, the same multiplier in both components. It is on the road beyond B.",
        },
        {
          text: "$(4, 6)$",
          feedback: "$\\overrightarrow{AC} = (2, 5)$. The multipliers are $\\frac23$ and $\\frac56$, which do not match.",
        },
        {
          text: "$(0, -2)$",
          feedback: "$\\overrightarrow{AC} = (-2, -3)$. The multipliers are $-\\frac23$ and $-\\frac12$, which do not match. (The road meets $x = 0$ at $(0, -3)$.)",
        },
      ],
      hint: "$\\overrightarrow{AB} = (3, 6)$. Look for a point C with $\\overrightarrow{AC}$ a multiple of it, using the same multiplier in both components.",
    },
    {
      type: "quiz",
      id: "va2-4-q7",
      variant: "practice",
      question:
        "$\\vec a$ and $\\vec b$ are not collinear. For which $\\lambda$ are $\\lambda\\vec a + 2\\vec b$ and $3\\vec a + (\\lambda - 1)\\vec b$ collinear?",
      options: [
        {
          text: "$\\lambda = 3$ only",
          feedback: "$\\lambda = 3$ works, since the two vectors are then identical. But the quadratic has a second root. Try $\\lambda = -2$: you get $-2\\vec a + 2\\vec b$ and $3\\vec a - 3\\vec b$.",
        },
        {
          text: "$\\lambda = 3$ or $\\lambda = -2$",
          correct: true,
          feedback: "Set $3\\vec a + (\\lambda - 1)\\vec b = k(\\lambda\\vec a + 2\\vec b)$. Comparing coefficients gives $3 = k\\lambda$ and $\\lambda - 1 = 2k$. Eliminating $k$: $\\lambda(\\lambda - 1) = 6$, so $(\\lambda - 3)(\\lambda + 2) = 0$. For $\\lambda = -2$, $3\\vec a - 3\\vec b = -\\frac32(-2\\vec a + 2\\vec b)$ ✓.",
        },
        {
          text: "$\\lambda = 2$ or $\\lambda = -3$",
          feedback: "Those are the roots of $\\lambda^2 + \\lambda - 6 = 0$, so a sign slipped. Check $\\lambda = 2$: $2\\vec a + 2\\vec b$ and $3\\vec a + \\vec b$ are not parallel.",
        },
        {
          text: "No value, because $\\vec a$ and $\\vec b$ are not collinear.",
          feedback: "Non-collinear $\\vec a$ and $\\vec b$ can still build two parallel vectors. This is exactly what lets you compare coefficients.",
        },
      ],
      hint: "Write the second vector as $k$ times the first, compare coefficients of $\\vec a$ and $\\vec b$, and eliminate $k$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "proofs-with-vectors",
  title: "2.5 · Proofs with Vectors",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Classical geometry proofs need a clever construction: an extra line, a pair of congruent triangles. Vector proofs replace the cleverness with a routine. You name every point by its position vector, translate the hypothesis into equations, compute, and translate the answer back into words. The routine is the same for every problem.",
    },
    {
      type: "table",
      headers: ["Geometric statement", "Vector translation"],
      rows: [
        ["M is the midpoint of AB", "$\\vec m = \\frac12(\\vec a + \\vec b)$"],
        ["P divides AB in $m : n$", "$\\vec p = \\dfrac{n\\vec a + m\\vec b}{m+n}$"],
        ["PQ is parallel to RS", "$\\overrightarrow{PQ} = \\lambda\\,\\overrightarrow{RS}$"],
        ["PQ is parallel to RS and equal in length, same direction", "$\\overrightarrow{PQ} = \\overrightarrow{RS}$"],
        ["ABCD is a parallelogram", "$\\overrightarrow{AB} = \\overrightarrow{DC}$, i.e. $\\vec a + \\vec c = \\vec b + \\vec d$"],
        ["P and Q are the same point", "$\\vec p = \\vec q$"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Strategy: put the origin at a vertex",
      content:
        "You may choose the origin anywhere, and a good choice removes a variable. With the origin at A, $\\vec a = \\vec 0$ and every other point is measured from A. Put it at the vertex that appears most often in the hypothesis.",
    },
    {
      type: "text",
      content:
        "**Proof 1: the diagonals of a parallelogram bisect each other.**\n\n**Step 1 (translate).** ABCD is a parallelogram, so $\\overrightarrow{AB} = \\overrightarrow{DC}$, that is $\\vec b - \\vec a = \\vec c - \\vec d$.\n\n**Step 2 (rearrange).** $\\vec a + \\vec c = \\vec b + \\vec d$.\n\n**Step 3 (divide by 2).** $\\frac{\\vec a + \\vec c}{2} = \\frac{\\vec b + \\vec d}{2}$.\n\n**Step 4 (translate back).** The left side is the midpoint of diagonal AC and the right side is the midpoint of diagonal BD. They are the same point, so each diagonal passes through the other's midpoint. ∎\n\nEvery step reverses, so the converse holds too: a quadrilateral whose diagonals bisect each other is a parallelogram.",
    },
    {
      type: "text",
      content:
        "**Worked example (using Proof 1 on numbers).** Show that A$(1, 1)$, B$(4, 2)$, C$(5, 5)$, D$(2, 4)$ form a parallelogram. Then decide whether it is a rhombus.\n\n**Step 1 (test the diagonals).** $\\vec a + \\vec c = (6, 6)$ and $\\vec b + \\vec d = (6, 6)$. They are equal, so the diagonals share the midpoint $(3, 3)$, and ABCD is a parallelogram by the converse of Proof 1. *Why this test:* it is one addition per diagonal, and it does not depend on which sides you compare.\n\n**Step 2 (cross-check with sides).** $\\overrightarrow{AB} = (3, 1)$ and $\\overrightarrow{DC} = (5 - 2,\\ 5 - 4) = (3, 1)$ ✓.\n\n**Step 3 (rhombus?).** $\\overrightarrow{AD} = (1, 3)$. So $AB = \\sqrt{9 + 1} = \\sqrt{10}$ and $AD = \\sqrt{1 + 9} = \\sqrt{10}$. Adjacent sides are equal, so ABCD is a **rhombus**. *Why this step:* a parallelogram with two equal adjacent sides has all four sides equal.",
    },
    {
      type: "text",
      content:
        "**Proof 2: the midpoint theorem.** In triangle ABC, D and E are the midpoints of AB and AC. Show that $DE \\parallel BC$ and $DE = \\frac12 BC$.\n\n**Step 1 (origin at A).** $\\vec a = \\vec 0$, so $\\vec d = \\frac12\\vec b$ and $\\vec e = \\frac12\\vec c$.\n\n**Step 2 (tip minus tail).** $\\overrightarrow{DE} = \\vec e - \\vec d = \\frac12(\\vec c - \\vec b)$.\n\n**Step 3 (recognise).** $\\vec c - \\vec b = \\overrightarrow{BC}$, so $\\overrightarrow{DE} = \\frac12\\overrightarrow{BC}$.\n\n**Step 4 (translate back).** One vector is a positive multiple of the other, so DE is parallel to BC, points the same way, and is half as long. ∎",
    },
    {
      type: "text",
      content:
        "**Proof 3: the midpoints of a trapezium's diagonals.** ABCD is a trapezium with $AB \\parallel DC$. M and N are the midpoints of diagonals AC and BD. Show that $MN \\parallel AB$ and $MN = \\frac12\\lvert AB - DC\\rvert$ (half the difference of the parallel sides).\n\n**Step 1 (origin at A, translate).** $\\vec a = \\vec 0$. Parallel sides pointing the same way: $\\overrightarrow{DC} = k\\,\\overrightarrow{AB}$ with $k > 0$, that is $\\vec c - \\vec d = k\\vec b$.\n\n**Step 2 (midpoints).** $\\vec m = \\frac12\\vec c$ and $\\vec n = \\frac12(\\vec b + \\vec d)$.\n\n**Step 3 (compute).** $\\overrightarrow{MN} = \\vec n - \\vec m = \\frac12(\\vec b - (\\vec c - \\vec d)) = \\frac12(\\vec b - k\\vec b) = \\frac{1 - k}{2}\\,\\vec b$.\n\n**Step 4 (translate back).** $\\overrightarrow{MN}$ is a multiple of $\\overrightarrow{AB}$, so $MN \\parallel AB$. Its length is $\\frac{\\lvert 1 - k\\rvert}{2}AB = \\frac12\\lvert AB - DC\\rvert$, because $DC = k\\cdot AB$. ∎",
    },
    {
      type: "text",
      content:
        "**Proof 4: the medians meet in the ratio 2 : 1.** In 2.3 you *guessed* the $2 : 1$ point and checked it was symmetric. Here is a proof that assumes nothing about the ratio. It uses the comparing-coefficients rule from 2.4.\n\n**Step 1 (origin at C).** $\\vec c = \\vec 0$. D, the midpoint of BC, is $\\frac12\\vec b$. E, the midpoint of CA, is $\\frac12\\vec a$.\n\n**Step 2 (unknown ratios).** Let medians AD and BE meet at G. G is on AD, so $\\vec g = \\vec a + s(\\vec d - \\vec a) = (1 - s)\\vec a + \\frac{s}{2}\\vec b$. G is also on BE, so $\\vec g = \\vec b + t(\\vec e - \\vec b) = \\frac{t}{2}\\vec a + (1 - t)\\vec b$.\n\n**Step 3 (compare coefficients).** $\\vec a = \\overrightarrow{CA}$ and $\\vec b = \\overrightarrow{CB}$ are not collinear, because ABC is a genuine triangle. So $1 - s = \\frac{t}{2}$ and $\\frac{s}{2} = 1 - t$.\n\n**Step 4 (solve).** From the second equation $t = 1 - \\frac{s}{2}$. Substituting, $1 - s = \\frac12 - \\frac{s}{4}$, so $s = \\frac23$, and then $t = \\frac23$.\n\n**Step 5 (translate back).** $AG = \\frac23 AD$ and $BG = \\frac23 BE$: each median is cut in the ratio $2 : 1$ from its vertex. ∎",
    },
    {
      type: "text",
      content:
        "**Proof 5 (exam style): a line from a vertex trisects the diagonal.** ABCD is a parallelogram and E is the midpoint of CD. AE meets the diagonal BD at P. Show that $BP : PD = 2 : 1$, so P is a point of trisection of BD. Show also that $AP : PE = 2 : 1$.\n\n**Step 1 (origin at A).** Let $\\vec b = \\overrightarrow{AB}$ and $\\vec d = \\overrightarrow{AD}$, so $\\vec c = \\vec b + \\vec d$. *Why this step:* A lies on the line AE, and the two sides from A, $\\vec b$ and $\\vec d$, are not collinear. Every other point can be written in terms of them.\n\n**Step 2 (the midpoint).** $\\vec e = \\frac{\\vec c + \\vec d}{2} = \\frac12\\vec b + \\vec d$.\n\n**Step 3 (P on both lines, with unknown ratios).** P is on AE, so $\\vec p = s\\,\\vec e$. P is on BD, so $\\vec p = (1 - t)\\vec b + t\\,\\vec d$. *Why this step:* we do not assume where P is. Each line gives a one-parameter description of P, and the two descriptions must agree.",
    },
    {
      type: "math",
      latex: "\\frac{s}{2}\\,\\vec b + s\\,\\vec d = (1 - t)\\,\\vec b + t\\,\\vec d",
    },
    {
      type: "text",
      content:
        "**Step 4 (compare coefficients).** $\\frac{s}{2} = 1 - t$ and $s = t$. *Why this step is allowed:* $\\vec b$ and $\\vec d$ are not collinear. Substituting, $\\frac{t}{2} = 1 - t$, so $t = \\frac23$ and $s = \\frac23$.\n\n**Step 5 (translate back).** $t = \\frac23$ means $BP = \\frac23 BD$, so $BP : PD = 2 : 1$. $s = \\frac23$ means $AP = \\frac23 AE$, so $AP : PE = 2 : 1$. ∎\n\n**Another view.** In triangle ACD, AE is a median, and so is DB, since it passes through the midpoint of AC. So P is the centroid of ACD, and both $2 : 1$ ratios follow from 2.3. Check: $\\frac{\\vec 0 + (\\vec b + \\vec d) + \\vec d}{3} = \\frac13\\vec b + \\frac23\\vec d$, which is $\\vec p$ with $t = \\frac23$ ✓.",
    },
    {
      type: "text",
      content:
        "**Bonus (Varignon).** Join the midpoints of the sides of *any* quadrilateral ABCD and you get a parallelogram. With P, Q, R, S the midpoints of AB, BC, CD, DA: $\\overrightarrow{PQ} = \\frac{\\vec b + \\vec c}{2} - \\frac{\\vec a + \\vec b}{2} = \\frac{\\vec c - \\vec a}{2}$ and $\\overrightarrow{SR} = \\frac{\\vec c + \\vec d}{2} - \\frac{\\vec d + \\vec a}{2} = \\frac{\\vec c - \\vec a}{2}$. So one pair of opposite sides is equal and parallel, and PQRS is a parallelogram. Both sides are also half the diagonal AC.",
    },
    {
      type: "text",
      content:
        "**Worked example (application: a flower bed inside a plot).** An irregular plot of land has corners A$(0, 0)$, B$(8, 2)$, C$(10, 8)$, D$(1, 7)$, in metres. A gardener pegs the midpoints of the four sides and ropes them off as a flower bed. Show that the bed is a parallelogram.\n\n**Step 1 (is the plot itself a parallelogram?).** $\\vec a + \\vec c = (10, 8)$ but $\\vec b + \\vec d = (9, 9)$, so it is not. *Why this step:* it shows that Varignon's theorem does not rely on the outer shape being special.\n\n**Step 2 (midpoints).** P$(4, 1)$ on AB, Q$(9, 5)$ on BC, R$\\left(\\frac{11}{2}, \\frac{15}{2}\\right)$ on CD, S$\\left(\\frac12, \\frac72\\right)$ on DA.\n\n**Step 3 (opposite sides).** $\\overrightarrow{PQ} = (5, 4)$ and $\\overrightarrow{SR} = (5, 4)$. Also $\\overrightarrow{PS} = \\left(-\\frac72, \\frac52\\right)$ and $\\overrightarrow{QR} = \\left(-\\frac72, \\frac52\\right)$. Both pairs are equal, so PQRS is a parallelogram ✓.\n\n**Step 4 (link to the proof).** $\\frac{\\vec c - \\vec a}{2} = (5, 4)$ and $\\frac{\\vec d - \\vec b}{2} = \\left(-\\frac72, \\frac52\\right)$. The bed's sides are half the plot's diagonals, just as the general proof predicts. *Why this step:* the numbers confirm the proof, and the proof explains the numbers.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Where vector proofs go wrong",
      content:
        "**Reversed arrows:** $\\overrightarrow{PQ}$ is $\\vec q - \\vec p$ (tip minus tail), never $\\vec p - \\vec q$.\n**Illegal coefficient matching:** you may compare coefficients only of **non-collinear** vectors.\n**Splitting a sum:** $\\vec a + \\vec c = \\vec b + \\vec d$ does **not** give $\\vec a = \\vec b$ and $\\vec c = \\vec d$.\n**Losing direction:** $AB \\parallel DC$ gives $\\overrightarrow{DC} = k\\overrightarrow{AB}$, not $\\overrightarrow{DC} = \\overrightarrow{AB}$. Equality would also force equal lengths.",
    },
    {
      type: "quiz",
      id: "va2-5-q1",
      variant: "concept",
      question:
        "A student proves the midpoint theorem as follows. Which step contains the FIRST error?\n\n**(1)** Origin at A, so $\\vec d = \\frac12\\vec b$, $\\vec e = \\frac12\\vec c$.\n**(2)** $\\overrightarrow{DE} = \\vec d - \\vec e$.\n**(3)** So $\\overrightarrow{DE} = \\frac12(\\vec b - \\vec c)$.\n**(4)** Hence $\\overrightarrow{DE} = \\frac12\\overrightarrow{BC}$.",
      options: [
        {
          text: "Step (2)",
          correct: true,
          feedback: "$\\overrightarrow{DE}$ is tip minus tail: $\\vec e - \\vec d$. What the student wrote is $\\overrightarrow{ED}$, and step (4) then quietly flips the sign back.",
        },
        {
          text: "Step (1)",
          feedback: "With $\\vec a = \\vec 0$ the midpoint of AB is $\\frac12(\\vec 0 + \\vec b)$. That step is correct.",
        },
        {
          text: "Step (4)",
          feedback: "(4) is also wrong, since $\\frac12(\\vec b - \\vec c) = \\frac12\\overrightarrow{CB}$. But the first error is earlier and caused it.",
        },
        {
          text: "None. The proof is valid.",
          feedback: "The final statement happens to be true, but it was reached through two sign errors that cancel.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-5-q2",
      variant: "concept",
      question:
        "In a proof, a student writes: \"ABCD is a parallelogram, so $\\vec a + \\vec c = \\vec b + \\vec d$. Therefore $\\vec a = \\vec b$ and $\\vec c = \\vec d$.\" What is wrong?",
      options: [
        {
          text: "Nothing. Comparing both sides term by term is always allowed.",
          feedback: "You can compare coefficients of a fixed pair of non-collinear vectors. You cannot match up arbitrary terms.",
        },
        {
          text: "The first equation should be $\\vec a + \\vec b = \\vec c + \\vec d$.",
          feedback: "$\\vec a + \\vec c = \\vec b + \\vec d$ is correct: the diagonals share a midpoint.",
        },
        {
          text: "Equal sums do not force equal terms. Many different pairs of vectors have the same sum.",
          correct: true,
          feedback: "For example, $(1, 0) + (0, 1) = (0, 0) + (1, 1)$. Besides, $\\vec a = \\vec b$ would make A and B the same point.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-5-q3",
      variant: "concept",
      question:
        "In Proof 4, why were we allowed to equate the coefficients of $\\vec a$ and $\\vec b$ in $(1 - s)\\vec a + \\frac{s}{2}\\vec b = \\frac{t}{2}\\vec a + (1 - t)\\vec b$?",
      options: [
        {
          text: "Coefficients can always be matched when two vector expressions are equal.",
          feedback: "Not if $\\vec a$ and $\\vec b$ are parallel. Then many different coefficient pairs give the same vector.",
        },
        {
          text: "With the origin at C, $\\vec a = \\overrightarrow{CA}$ and $\\vec b = \\overrightarrow{CB}$ are not collinear, because ABC is a triangle.",
          correct: true,
          feedback: "Uniqueness of the combination (2.4) holds exactly for non-collinear vectors.",
        },
        {
          text: "Because $s$ and $t$ are between 0 and 1.",
          feedback: "The range of $s$ and $t$ is irrelevant. The step rests on $\\vec a$ and $\\vec b$ being independent.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-5-q4",
      variant: "practice",
      question: "ABCD is a parallelogram with A$(1, 2)$, B$(4, 3)$ and C$(6, 7)$. Find D.",
      options: [
        {
          text: "$(3, 6)$",
          correct: true,
          feedback: "$\\vec d = \\vec a + \\vec c - \\vec b = (1 + 6 - 4,\\ 2 + 7 - 3) = (3, 6)$. Check: $\\overrightarrow{AB} = (3, 1) = \\overrightarrow{DC}$.",
        },
        {
          text: "$(9, 8)$",
          feedback: "That is $\\vec b + \\vec c - \\vec a$, the fourth vertex of the parallelogram ABDC, where BC is a diagonal.",
        },
        {
          text: "$(-1, -2)$",
          feedback: "That is $\\vec a + \\vec b - \\vec c$, the vertex that makes AB a diagonal.",
        },
      ],
      hint: "In ABCD the diagonals are AC and BD, and they share a midpoint.",
    },
    {
      type: "quiz",
      id: "va2-5-q5",
      variant: "practice",
      question:
        "Trapezium ABCD has $AB \\parallel DC$ (same direction), $AB = 10$ and $DC = 4$. How long is the segment joining the midpoints of the diagonals?",
      options: [
        {
          text: "7",
          feedback: "That is $\\frac12(AB + DC)$, the midline joining the midpoints of the non-parallel sides.",
        },
        {
          text: "3",
          correct: true,
          feedback: "$MN = \\frac12(AB - DC) = \\frac12(10 - 4) = 3$.",
        },
        {
          text: "6",
          feedback: "That is $AB - DC$. Proof 3 gives a factor of $\\frac12$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-5-q6",
      variant: "practice",
      question: "A$(2, 1)$, B$(5, 2)$, C$(7, 6)$ and D$(k, 5)$ are the vertices, in order, of a parallelogram ABCD. Find $k$.",
      options: [
        {
          text: "$k = 4$",
          correct: true,
          feedback: "The diagonals share a midpoint: $\\vec a + \\vec c = \\vec b + \\vec d$ gives $(9, 7) = (5 + k, 7)$, so $k = 4$. The y-coordinates agree too. Check: $\\overrightarrow{AB} = (3, 1) = \\overrightarrow{DC}$.",
        },
        {
          text: "$k = 10$",
          feedback: "That is the x-coordinate of $\\vec b + \\vec c - \\vec a$, the fourth vertex when BC is a diagonal. Its y-coordinate would be 7, not 5.",
        },
        {
          text: "$k = 0$",
          feedback: "That is the x-coordinate of $\\vec a + \\vec b - \\vec c$, the fourth vertex when AB is a diagonal. In ABCD the diagonals are AC and BD.",
        },
      ],
      hint: "In ABCD the diagonals are AC and BD, so $\\vec a + \\vec c = \\vec b + \\vec d$.",
    },
    {
      type: "quiz",
      id: "va2-5-q7",
      variant: "practice",
      question:
        "ABCD is a parallelogram and F is the midpoint of BC. AF meets the diagonal BD at Q. Which is true?",
      options: [
        {
          text: "$BQ : QD = 2 : 1$ and $AQ : QF = 2 : 1$",
          feedback: "That is the answer for the midpoint of CD, which is next to D. F is next to B, so Q ends up nearer B.",
        },
        {
          text: "$BQ : QD = 1 : 1$ and $AQ : QF = 1 : 1$",
          feedback: "The midpoint of BD is where AC crosses it, not AF.",
        },
        {
          text: "$BQ : QD = 1 : 2$ and $AQ : QF = 1 : 2$",
          feedback: "BQ is right, but Q is two-thirds of the way along AF, not one-third.",
        },
        {
          text: "$BQ : QD = 1 : 2$ and $AQ : QF = 2 : 1$",
          correct: true,
          feedback: "With the origin at A, $\\vec f = \\vec b + \\frac12\\vec d$. Q on AF: $\\vec q = s\\vec b + \\frac{s}{2}\\vec d$. Q on BD: $\\vec q = (1 - t)\\vec b + t\\vec d$. Comparing coefficients gives $s = 1 - t$ and $\\frac{s}{2} = t$, so $s = \\frac23$ and $t = \\frac13$. (Q is the centroid of triangle ABC.)",
        },
      ],
      hint: "Copy Proof 5: origin at A, write Q on each line with its own parameter, and compare coefficients of $\\vec b$ and $\\vec d$.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-2-mastery",
  title: "2.6 · Chapter 2 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Locate, divide and prove. These questions mix everything in the chapter. Work each one on paper before choosing, and check your answer by substituting it back in.",
    },
    {
      type: "quiz",
      id: "va2-6-q1",
      variant: "mastery",
      question: "A is $(-2, 5)$ and B is $(4, -1)$. Find the point dividing AB internally in the ratio $2 : 1$.",
      options: [
        {
          text: "$(0, 3)$",
          feedback: "That is $\\frac{2\\vec a + \\vec b}{3}$. The weights are crossed, which gives the $1 : 2$ point.",
        },
        {
          text: "$(1, 2)$",
          feedback: "That is the midpoint.",
        },
        {
          text: "$(2, 1)$",
          correct: true,
          feedback: "$\\frac{\\vec a + 2\\vec b}{3} = \\frac{(6, 3)}{3} = (2, 1)$. It is two-thirds of the way to B.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-6-q2",
      variant: "mastery",
      question: "A is $(2, 3)$ and B is $(5, 7)$. Find the point dividing AB externally in the ratio $2 : 1$.",
      options: [
        {
          text: "$(8, 11)$",
          correct: true,
          feedback: "$\\frac{2\\vec b - \\vec a}{2 - 1} = (10 - 2,\\ 14 - 3) = (8, 11)$. It lies beyond B.",
        },
        {
          text: "$(-1, -1)$",
          feedback: "That is $2\\vec a - \\vec b$, the external $1 : 2$ point behind A.",
        },
        {
          text: "$\\left(4, \\frac{17}{3}\\right)$",
          feedback: "That is the internal $2 : 1$ point.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-6-q3",
      variant: "mastery",
      question:
        "In what ratio does the xy-plane divide the segment joining $(1, 2, -3)$ and $(4, -1, 6)$?",
      options: [
        {
          text: "$2 : 1$ internally",
          feedback: "The first endpoint is 3 from the plane and the second is 6. The crossing is nearer the first, so the ratio is $1 : 2$.",
        },
        {
          text: "$1 : 2$ internally",
          correct: true,
          feedback: "On the xy-plane $z = 0$: $\\frac{-3 + 6\\lambda}{1 + \\lambda} = 0$, so $\\lambda = \\frac12$. The crossing point is $(2, 1, 0)$.",
        },
        {
          text: "$1 : 2$ externally",
          feedback: "The z-coordinates have opposite signs, so the endpoints are on opposite sides of the plane. The division is internal.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-6-q4",
      variant: "mastery",
      question:
        "Three vertices of parallelogram ABCD are A$(-1, 0, 2)$, B$(1, 2, 3)$ and C$(3, 1, 5)$. Find D.",
      options: [
        {
          text: "$(1, -1, 4)$",
          correct: true,
          feedback: "$\\vec d = \\vec a + \\vec c - \\vec b = (-1 + 3 - 1,\\ 0 + 1 - 2,\\ 2 + 5 - 3) = (1, -1, 4)$.",
        },
        {
          text: "$(5, 3, 6)$",
          feedback: "That is $\\vec b + \\vec c - \\vec a$, which belongs to the parallelogram ABDC.",
        },
        {
          text: "$(-3, 1, 0)$",
          feedback: "That is $\\vec a + \\vec b - \\vec c$, the vertex opposite C.",
        },
      ],
      hint: "The diagonals AC and BD share a midpoint.",
    },
    {
      type: "quiz",
      id: "va2-6-q5",
      variant: "mastery",
      question: "Find the centroid of the triangle with vertices $(3, -2, 1)$, $(-1, 4, 5)$ and $(4, 1, -3)$.",
      options: [
        {
          text: "$(3, 1.5, 1.5)$",
          feedback: "That divides by 2. Average all three vertices.",
        },
        {
          text: "$(6, 3, 3)$",
          feedback: "That is the sum of the vertices. Divide by 3.",
        },
        {
          text: "$(2, 1, 1)$",
          correct: true,
          feedback: "Sum $= (6, 3, 3)$. Divide by 3.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-6-q6",
      variant: "mastery",
      question: "For what $p$ are A$(2, -1)$, B$(4, 3)$ and C$(p, 7)$ collinear?",
      options: [
        {
          text: "$p = 8$",
          feedback: "Then $\\overrightarrow{AC} = (6, 8)$, which is not a multiple of $(2, 4)$.",
        },
        {
          text: "$p = 6$",
          correct: true,
          feedback: "$\\overrightarrow{AB} = (2, 4)$ and $\\overrightarrow{AC} = (p - 2, 8) = 2\\overrightarrow{AB}$ needs $p - 2 = 4$.",
        },
        {
          text: "$p = 4$",
          feedback: "Then C would be directly above B, and the line AB is not vertical.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-6-q7",
      variant: "mastery",
      question: "The centroid of a triangle is 8 units from vertex A. How long is the median from A?",
      options: [
        {
          text: "12",
          correct: true,
          feedback: "$AG = \\frac23 AD$, so $AD = \\frac32 \\times 8 = 12$.",
        },
        {
          text: "24",
          feedback: "That assumes $AG : GD = 1 : 2$. From the vertex the ratio is $2 : 1$.",
        },
        {
          text: "16",
          feedback: "That assumes G is the midpoint of the median.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-6-q8",
      variant: "mastery",
      question:
        "$\\vec a$ and $\\vec b$ are not collinear, and $(2x - 1)\\vec a + (x + y)\\vec b = 3\\vec a - 4\\vec b$. Find $x$ and $y$.",
      options: [
        {
          text: "$x = 2,\\ y = -2$",
          feedback: "That solves $x + y = 0$. The coefficient of $\\vec b$ on the right is $-4$.",
        },
        {
          text: "$x = 2,\\ y = -6$",
          correct: true,
          feedback: "Compare coefficients: $2x - 1 = 3$ gives $x = 2$, and $x + y = -4$ gives $y = -6$.",
        },
        {
          text: "It cannot be decided without components.",
          feedback: "Non-collinearity is enough to compare coefficients.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-6-q9",
      variant: "mastery",
      question:
        "Reconstruct the proof of the midpoint theorem. With the origin at A and D, E the midpoints of AB and AC, we have $\\vec d = \\frac12\\vec b$ and $\\vec e = \\frac12\\vec c$. What is the missing step before \"hence $DE \\parallel BC$ and $DE = \\frac12 BC$\"?",
      options: [
        {
          text: "$\\vec d + \\vec e = \\frac12(\\vec b + \\vec c)$, the midpoint of BC",
          feedback: "$\\vec d + \\vec e$ is not a displacement between the points, so it says nothing about DE. (It is the midpoint of BC here, but that is a different fact.)",
        },
        {
          text: "$\\overrightarrow{DE} = \\vec d - \\vec e = \\frac12\\overrightarrow{BC}$",
          feedback: "$\\vec d - \\vec e$ is $\\overrightarrow{ED}$, and it equals $\\frac12\\overrightarrow{CB}$. The arrow is reversed.",
        },
        {
          text: "$\\overrightarrow{DE} = \\vec e - \\vec d = \\frac12(\\vec c - \\vec b) = \\frac12\\overrightarrow{BC}$",
          correct: true,
          feedback: "Tip minus tail, factor out $\\frac12$, and recognise $\\overrightarrow{BC}$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va2-6-q10",
      variant: "mastery",
      question: "For what $k$ are A$(2, -1, 3)$, B$(4, 3, 1)$ and C$(k, 7, -1)$ collinear?",
      options: [
        {
          text: "$k = 8$",
          feedback: "Then $\\overrightarrow{AC} = (6, 8, -4)$. The x-component needs a multiple of 3 but the others need 2, so the vectors are not parallel.",
        },
        {
          text: "$k = 4$",
          feedback: "Then $\\overrightarrow{AC} = (2, 8, -4)$. Its x-component matches $\\overrightarrow{AB}$ but the rest are doubled, so it is not a multiple.",
        },
        {
          text: "No value of $k$ works.",
          feedback: "The y and z components both give the multiplier 2, so they are consistent. Only x is free, and $k = 6$ fixes it.",
        },
        {
          text: "$k = 6$",
          correct: true,
          feedback: "$\\overrightarrow{AB} = (2, 4, -2)$ and $\\overrightarrow{AC} = (k - 2, 8, -4)$. The y and z components force $\\overrightarrow{AC} = 2\\overrightarrow{AB}$, so $k - 2 = 4$.",
        },
      ],
      hint: "Find the multiplier $\\lambda$ from the components that do not involve $k$.",
    },
    {
      type: "quiz",
      id: "va2-6-q11",
      variant: "mastery",
      question:
        "In triangle OAB, P is the midpoint of OA, and Q divides OB internally in the ratio $2 : 1$ from O. The lines AQ and BP meet at X. In what ratio does X divide AQ?",
      options: [
        {
          text: "$AX : XQ = 3 : 1$",
          correct: true,
          feedback: "Origin at O: $\\vec q = \\frac23\\vec b$, $\\vec p = \\frac12\\vec a$. On AQ, $\\vec x = (1 - s)\\vec a + \\frac{2s}{3}\\vec b$. On BP, $\\vec x = \\frac{t}{2}\\vec a + (1 - t)\\vec b$. Comparing coefficients: $1 - s = \\frac t2$ and $\\frac{2s}{3} = 1 - t$, so $s = \\frac34$, $t = \\frac12$.",
        },
        {
          text: "$AX : XQ = 2 : 1$",
          feedback: "$2 : 1$ is the centroid ratio, and it holds only when both lines are medians. Q is not the midpoint of OB, so solve for the ratio.",
        },
        {
          text: "$AX : XQ = 1 : 1$",
          feedback: "$t = \\frac12$ means X is the midpoint of **BP**. On AQ the parameter is $s = \\frac34$.",
        },
        {
          text: "$AX : XQ = 1 : 3$",
          feedback: "$s = \\frac34$ is measured from A, so $AX$ is three-quarters of AQ: the ratio is $3 : 1$, not $1 : 3$.",
        },
      ],
      hint: "Put the origin at O. Write X on each line with its own unknown, then compare coefficients of $\\vec a$ and $\\vec b$ as in Proof 4.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "So far vectors have been added and scaled. Chapter 3 multiplies two vectors and gets a **number** that measures how much they point the same way. It is the dot product, and it brings lengths and angles into vector algebra.",
    },
  ]),
};

export const vectorsChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
