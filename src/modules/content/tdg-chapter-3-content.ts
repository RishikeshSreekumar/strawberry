import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Three-Dimensional Geometry Chapter 3 — Skew Lines and Shortest Distance.
 * In space two lines can miss each other without being parallel. The
 * chapter classifies pairs of lines (parallel, intersecting, skew),
 * measures the gap between skew lines by projecting the join on the common
 * normal b₁ × b₂ (vector and Cartesian/determinant forms), turns the
 * vanishing of that projection into the condition for two lines to
 * intersect, handles parallel lines separately, and finds the line of
 * shortest distance itself (JEE Advanced).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "parallel-intersecting-or-skew",
  title: "3.1 · Parallel, Intersecting or Skew",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "In the plane, two lines either meet or are parallel: if their slopes differ, they cross somewhere. Space has a third possibility. Look at a room: the line where the floor meets the front wall and the line where the ceiling meets a side wall never meet, yet they point in different directions. Such lines are called **skew**.",
    },
    {
      type: "text",
      content:
        "This chapter is about pairs of lines $\\vec r = \\vec a_1 + \\lambda\\vec b_1$ and $\\vec r = \\vec a_2 + \\mu\\vec b_2$ (Chapter 2). This first lesson sorts them into three kinds and gives a procedure that decides which kind any given pair is.",
    },
    { type: "heading", text: "Three ways two lines can sit in space" },
    {
      type: "callout",
      variant: "definition",
      title: "Parallel, intersecting, skew",
      content:
        "Two distinct lines in space are exactly one of:\n\n- **Parallel**: same direction ($\\vec b_1 \\parallel \\vec b_2$) and no common point. They lie in one plane.\n- **Intersecting**: different directions and exactly one common point. They lie in one plane.\n- **Skew**: different directions and no common point. No plane contains both.\n\nThe first two are the **coplanar** cases. (If the directions match **and** they share a point, the two equations describe the same line: they are **coincident**.)",
    },
    {
      type: "text",
      content:
        "A cube makes all three visible. Put a unit cube with one corner at the origin $O$ and edges along the axes, so its vertices are $O(0, 0, 0)$, $A(1, 0, 0)$, $B(1, 1, 0)$, $C(0, 1, 0)$ on the floor and $D(0, 0, 1)$, $E(1, 0, 1)$, $F(1, 1, 1)$, $G(0, 1, 1)$ above them. The edge $OA$ (on the x-axis) is parallel to $CB$, meets $OC$ at $O$, and is skew to $CG$: the line $CG$ is $x = 0, y = 1$, while every point of $OA$ has $y = 0$, and $CG$ points straight up while $OA$ points along $x$.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "two-lines",
        a: [1, 2, 3],
        b: [2, 3, 4],
        c: [2, 4, 5],
        d: [3, 4, 5],
        caption:
          "$L_1$ passes through $(1, 2, 3)$ with direction $(2, 3, 4)$, and $L_2$ through $(2, 4, 5)$ with direction $(3, 4, 5)$. Rotate the view: from some angles the lines **appear** to cross, but turn a little further and the apparent crossing splits into two points at different depths. A flat drawing of two skew lines always looks like two crossing lines.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"not parallel means they intersect\"",
      content:
        "That is a theorem of the **plane**, where two lines with different slopes must cross. In space, different directions only rule out \"parallel\"; the lines may still miss each other, as $OA$ and $CG$ on the cube do. You always have to **check** for a common point.",
    },
    { type: "heading", text: "The classification procedure" },
    {
      type: "text",
      content:
        "Write the general points $P(\\lambda) = \\vec a_1 + \\lambda\\vec b_1$ and $Q(\\mu) = \\vec a_2 + \\mu\\vec b_2$. A common point needs $P(\\lambda) = Q(\\mu)$, which is **three** equations (one per coordinate) in only **two** unknowns $\\lambda$ and $\\mu$. Two of them usually fix $\\lambda$ and $\\mu$; the third is then a test that may pass or fail. That is the whole reason skew lines exist.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Deciding parallel, intersecting or skew",
      content:
        "1. **Compare directions.** If $(a_1, b_1, c_1)$ and $(a_2, b_2, c_2)$ are proportional, the lines are parallel or coincident: check whether a point of one lies on the other.\n2. **Otherwise solve.** Equate two coordinates of $P(\\lambda)$ and $Q(\\mu)$ and solve for $\\lambda, \\mu$.\n3. **Test the third coordinate.** If it also agrees, the lines intersect at $P(\\lambda)$; if not, they are skew.",
    },
    {
      type: "worked-example",
      id: "tdg3-1-we1",
      title: "Worked example 1: a skew pair",
      problem:
        "Decide whether the lines $\\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z - 3}{4}$ and $\\frac{x - 2}{3} = \\frac{y - 4}{4} = \\frac{z - 5}{5}$ are parallel, intersecting or skew.",
      steps: [
        { text: "Directions $(2, 3, 4)$ and $(3, 4, 5)$: $\\frac23 \\ne \\frac34$, so the lines are not parallel." },
        {
          text: "General points: $P = (1 + 2\\lambda,\\ 2 + 3\\lambda,\\ 3 + 4\\lambda)$ and $Q = (2 + 3\\mu,\\ 4 + 4\\mu,\\ 5 + 5\\mu)$. Equate the x and y coordinates:",
          latex: "2\\lambda - 3\\mu = 1, \\qquad 3\\lambda - 4\\mu = 2 \\quad\\Longrightarrow\\quad \\lambda = 2,\\ \\mu = 1",
        },
        {
          text: "*Why this step:* two equations always pin down $\\lambda$ and $\\mu$ for non-parallel lines; the third coordinate is the real test. With $\\lambda = 2$, $z = 3 + 8 = 11$; with $\\mu = 1$, $z = 5 + 5 = 10$.",
        },
        { text: "$11 \\ne 10$: the x and y coordinates can be matched but the heights then differ. There is no common point." },
      ],
      answer: "Skew: different directions and no common point.",
    },
    {
      type: "worked-example",
      id: "tdg3-1-we2",
      title: "Worked example 2: an intersecting pair",
      problem:
        "Show that $\\vec r = (3\\hat j + \\hat k) + \\lambda(\\hat i - \\hat j + \\hat k)$ and $\\vec r = (3\\hat i + 3\\hat j + \\hat k) + \\mu(\\hat i + 2\\hat j - 2\\hat k)$ intersect, and find the point.",
      steps: [
        { text: "Directions $(1, -1, 1)$ and $(1, 2, -2)$ are not proportional." },
        {
          text: "General points $(\\lambda,\\ 3 - \\lambda,\\ 1 + \\lambda)$ and $(3 + \\mu,\\ 3 + 2\\mu,\\ 1 - 2\\mu)$. Equate x and y:",
          latex: "\\lambda = 3 + \\mu, \\qquad 3 - \\lambda = 3 + 2\\mu \\quad\\Longrightarrow\\quad \\lambda = 2,\\ \\mu = -1",
        },
        { text: "Test z: $1 + \\lambda = 3$ and $1 - 2\\mu = 3$. They agree, so the lines meet." },
        { text: "The point is $P(2) = (2, 1, 3)$. *Why this step:* substituting into **both** lines ($Q(-1) = (2, 1, 3)$ too) catches arithmetic slips." },
      ],
      answer: "They intersect at $(2, 1, 3)$.",
    },
    {
      type: "worked-example",
      id: "tdg3-1-we3",
      title: "Worked example 3: parallel or coincident?",
      problem:
        "Classify $\\frac{x - 1}{2} = \\frac{y + 1}{-1} = \\frac{z}{2}$ and $\\frac{x - 3}{-4} = \\frac{y - 1}{2} = \\frac{z + 2}{-4}$.",
      steps: [
        { text: "Directions $(2, -1, 2)$ and $(-4, 2, -4) = -2(2, -1, 2)$: proportional, so parallel or coincident. A negative multiple still means the same line direction." },
        {
          text: "Test whether the point $(3, 1, -2)$ of the second line lies on the first:",
          latex: "\\frac{3 - 1}{2} = 1, \\qquad \\frac{1 + 1}{-1} = -2",
        },
        { text: "The ratios differ, so $(3, 1, -2)$ is not on the first line. Two parallel lines with no common point." },
      ],
      answer: "Parallel and distinct.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Why the plane picture fails",
      content:
        "In the plane a line is **one** equation $ax + by + c = 0$, and two equations in two unknowns $x, y$ usually have a solution. In space a line needs **two** equations, so two lines give four equations in three unknowns $x, y, z$: one equation too many. Generic pairs of lines in space are skew; meeting is the special case. Chapter 3.3 turns \"the special case\" into a single determinant.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "tdg3-1-q1",
      variant: "concept",
      question: "Two lines in space have direction ratios that are **not** proportional. What can you conclude?",
      options: [
        { text: "They either intersect or are skew", correct: true, feedback: "Different directions rule out parallel only. You still need to test for a common point." },
        { text: "They intersect", feedback: "That is the plane's rule. In space they may miss each other entirely." },
        { text: "They are skew", feedback: "They may also meet, as in Worked example 2." },
        { text: "They are perpendicular", feedback: "Perpendicular needs $a_1a_2 + b_1b_2 + c_1c_2 = 0$, a much stronger condition." },
      ],
      hint: "Which of the three cases need equal directions?",
    },
    {
      type: "quiz",
      id: "tdg3-1-q2",
      variant: "practice",
      multiple: true,
      question:
        "In the unit cube with vertices $O(0, 0, 0)$, $A(1, 0, 0)$, $B(1, 1, 0)$, $C(0, 1, 0)$, $D(0, 0, 1)$, $E(1, 0, 1)$, $F(1, 1, 1)$, $G(0, 1, 1)$, which edges are skew to the edge $OA$? Select all that apply.",
      options: [
        { text: "$CG$", correct: true, feedback: "$CG$ is $x = 0, y = 1$ (vertical); $OA$ has $y = 0$. Different directions, no common point." },
        { text: "$BF$", correct: true, feedback: "$BF$ is $x = 1, y = 1$; at $x = 1$ the edge $OA$ has $y = 0$. No common point." },
        { text: "$EF$", correct: true, feedback: "$EF$ lies in $x = 1, z = 1$ and runs along $y$; $OA$ has $z = 0$." },
        { text: "$FG$", feedback: "$FG$ runs along the x-direction, like $OA$: they are parallel." },
        { text: "$AE$", feedback: "$AE$ starts at $A$, which is on $OA$: they intersect." },
      ],
      hint: "Rule out the edges parallel to the x-axis and those sharing $O$ or $A$.",
    },
    {
      type: "numeric",
      id: "tdg3-1-q3",
      variant: "practice",
      question: "A cube has 12 edges. How many of them are skew to one given edge?",
      answer: 4,
      hint: "Count the given edge, the edges parallel to it and the edges that touch it at either end, then subtract from 12.",
      solution:
        "The edge itself: 1. Parallel to it: 3. Meeting it: 2 at each end, so 4. That leaves $12 - 1 - 3 - 4 = 4$ skew edges (for $OA$: $CG$, $BF$, $DG$, $EF$).",
      commonMistakes: [
        { answer: 8, feedback: "Edges meeting the given one at its ends are not skew: there are 4 of those to remove as well." },
        { answer: 7, feedback: "Do not forget the 3 edges parallel to it; they are coplanar with it, not skew." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-1-q4",
      variant: "practice",
      question: "The lines $\\frac{x}{1} = \\frac{y}{2} = \\frac{z}{3}$ and $\\frac{x - 1}{-2} = \\frac{y - 2}{-4} = \\frac{z - 3}{-6}$ are",
      options: [
        { text: "coincident", correct: true, feedback: "Directions are proportional, and $(1, 2, 3)$ lies on the first line ($\\lambda = 1$). Same line." },
        { text: "parallel and distinct", feedback: "Check whether the point $(1, 2, 3)$ of the second line satisfies the first: $\\frac11 = \\frac22 = \\frac33$." },
        { text: "intersecting at exactly one point", feedback: "Proportional directions cannot give exactly one common point." },
        { text: "skew", feedback: "Skew lines have different directions; $(-2, -4, -6) = -2(1, 2, 3)$." },
      ],
      hint: "Proportional directions first; then test one point.",
    },
    {
      type: "numeric",
      id: "tdg3-1-q5",
      variant: "practice",
      question:
        "The lines $\\vec r = (\\hat i + 2\\hat k) + \\lambda(2\\hat i + \\hat j - \\hat k)$ and $\\vec r = (\\hat i + 3\\hat j - 3\\hat k) + \\mu(\\hat i - \\hat j + 2\\hat k)$ meet at a point $P$. Find the sum of the coordinates of $P$.",
      answer: 5,
      hint: "Equate the x and y coordinates of the general points, solve for $\\lambda$ and $\\mu$, and confirm with z.",
      solution:
        "$1 + 2\\lambda = 1 + \\mu$ and $\\lambda = 3 - \\mu$ give $\\mu = 2\\lambda$, so $3\\lambda = 3$: $\\lambda = 1$, $\\mu = 2$. z: $2 - 1 = 1$ and $-3 + 4 = 1$. $P = (3, 1, 1)$, sum 5.",
      commonMistakes: [
        { answer: 3, feedback: "That is $\\lambda + \\mu$. Substitute back to get the point $(3, 1, 1)$." },
        { answer: 7, feedback: "Recheck the z coordinate: $2 - \\lambda = 1$ at $\\lambda = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-1-q6",
      variant: "concept",
      question:
        "For two non-parallel lines you solve the x and y equations and get $\\lambda = 2$, $\\mu = 1$. Substituting, the z coordinates come out as $11$ and $10$. The lines",
      options: [
        { text: "are skew", correct: true, feedback: "The only candidate pair $(\\lambda, \\mu)$ fails the third equation, so there is no common point." },
        { text: "intersect at $P(\\lambda = 2)$", feedback: "A common point needs all three coordinates to agree." },
        { text: "are parallel", feedback: "They were given as non-parallel." },
        { text: "intersect, but a different pair $(\\lambda, \\mu)$ must be tried", feedback: "For non-parallel lines the x and y equations have only one solution, so no other pair exists." },
      ],
      hint: "How many solutions can the first two equations have?",
    },
    {
      type: "quiz",
      id: "tdg3-1-q7",
      variant: "concept",
      multiple: true,
      question: "Which statements about lines in space are true? Select all that apply.",
      options: [
        { text: "Two skew lines do not lie in any common plane", correct: true, feedback: "That is the definition: parallel and intersecting lines are exactly the coplanar ones." },
        { text: "Two lines parallel to the same line are parallel to each other", correct: true, feedback: "Their directions are both proportional to the third direction." },
        { text: "Two intersecting lines lie in exactly one plane", correct: true, feedback: "The common point and the two directions fix the plane." },
        { text: "Two lines perpendicular to the same line are parallel", feedback: "The x-axis and the y-axis are both perpendicular to the z-axis but meet at right angles." },
        { text: "Two lines that do not meet are parallel", feedback: "Skew lines do not meet and are not parallel." },
      ],
      hint: "Test each statement on the axes and the cube's edges.",
    },
    {
      type: "numeric",
      id: "tdg3-1-q8",
      variant: "practice",
      question:
        "JEE Main. The lines $\\frac{x - 1}{1} = \\frac{y - 2}{2} = \\frac{z - 3}{3}$ and $\\frac{x - 2}{1} = \\frac{y - 3}{1} = \\frac{z - k}{2}$ intersect. Find $k$.",
      answer: 5,
      hint: "Equate the x and y coordinates to find $\\lambda$ and $\\mu$; then make the z coordinates agree.",
      solution:
        "$1 + \\lambda = 2 + \\mu$ and $2 + 2\\lambda = 3 + \\mu$ give $\\lambda = 0$, $\\mu = -1$. The z coordinates are $3 + 0 = 3$ and $k - 2$, so $k = 5$. The common point is $(1, 2, 3)$.",
      commonMistakes: [
        { answer: 3, feedback: "That sets $k$ equal to the z-coordinate 3, forgetting the $2\\mu = -2$ on the second line." },
        { answer: 1, feedback: "With $\\mu = -1$ the second line's z is $k - 2$, not $k + 2$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-1-q9",
      variant: "practice",
      question: "A line with direction ratios $(2, -3, k)$ is parallel to a line with direction ratios $(4, m, 6)$. Find $k + m$.",
      answer: -3,
      hint: "Parallel means proportional: $(4, m, 6) = t(2, -3, k)$ for some $t$.",
      solution: "$t = 2$ from the first entries, so $m = -6$ and $2k = 6$, $k = 3$. Then $k + m = -3$.",
      commonMistakes: [
        { answer: 9, feedback: "$m = 2(-3) = -6$, negative." },
        { answer: 3, feedback: "That is $k$ alone; add $m = -6$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-1-q10",
      variant: "practice",
      question:
        "JEE Main. The lines $\\frac{x - 4}{1} = \\frac{y + 3}{-4} = \\frac{z + 1}{7}$ and $\\frac{x - 1}{2} = \\frac{y + 1}{-3} = \\frac{z + 10}{8}$ intersect at",
      options: [
        { text: "$(5, -7, 6)$", correct: true, feedback: "$\\lambda = 1$ on the first and $\\mu = 2$ on the second both give $(5, -7, 6)$." },
        { text: "$(3, 1, -8)$", feedback: "That is on the first line ($\\lambda = -1$) but not on the second." },
        { text: "$(1, -1, -10)$", feedback: "That is the given point of the second line; it is not on the first." },
        { text: "the lines are skew", feedback: "Solve x and y: $4 + \\lambda = 1 + 2\\mu$, $-3 - 4\\lambda = -1 - 3\\mu$ give $\\lambda = 1$, $\\mu = 2$, and z agrees ($6 = 6$)." },
      ],
      hint: "Solve the x and y equations for $\\lambda, \\mu$ and check z.",
    },
    {
      type: "numeric",
      id: "tdg3-1-q11",
      variant: "practice",
      question: "How many unordered pairs of edges of a cube are skew?",
      answer: 24,
      hint: "Each edge is skew to 4 others (Question 3). Each skew pair is counted from both of its edges.",
      solution: "$\\frac{12 \\times 4}{2} = 24$.",
      commonMistakes: [
        { answer: 48, feedback: "Each pair is counted twice, once from each edge: halve it." },
        { answer: 12, feedback: "Each edge has 4 skew partners, not 2." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-1-q12",
      variant: "concept",
      question:
        "Two lines in space are given by their general points. Equating coordinates gives how many equations, in how many unknowns?",
      options: [
        { text: "Three equations in two unknowns $\\lambda, \\mu$, so a solution is not guaranteed", correct: true, feedback: "One equation too many: that is why generic lines in space are skew." },
        { text: "Two equations in two unknowns, so there is always a solution", feedback: "There is one equation per coordinate: three of them." },
        { text: "Three equations in three unknowns, so there is always a solution", feedback: "The unknowns are only the two parameters $\\lambda$ and $\\mu$." },
        { text: "Two equations in three unknowns, so there are infinitely many solutions", feedback: "Count again: x, y and z each give an equation; $\\lambda, \\mu$ are the only unknowns." },
      ],
      hint: "One equation per coordinate; one unknown per line.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "shortest-distance-between-skew-lines",
  title: "3.2 · Shortest Distance Between Skew Lines",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two skew lines never meet, so there is a **gap** between them: the least distance from a point of one to a point of the other. Picture two straight wires crossing at different heights, one above the other. Slide a short rod between them until it is as short as possible. At that moment the rod is perpendicular to **both** wires; any tilt would lengthen it.",
    },
    {
      type: "text",
      content:
        "You met the formula once already, as a preview at the end of Vector Algebra (\"choosing the right product\"). Here we derive it properly, read it as a volume, and use it on JEE problems.",
    },
    { type: "heading", text: "The common perpendicular" },
    {
      type: "text",
      content:
        "Let the lines be $\\vec r = \\vec a_1 + \\lambda\\vec b_1$ and $\\vec r = \\vec a_2 + \\mu\\vec b_2$, with $\\vec b_1 \\nparallel \\vec b_2$. The shortest segment $PQ$ ($P$ on the first line, $Q$ on the second) is perpendicular to both $\\vec b_1$ and $\\vec b_2$, so it points along their cross product, the **common normal**:",
    },
    { type: "math", latex: "\\vec n = \\vec b_1 \\times \\vec b_2, \\qquad \\overrightarrow{PQ} \\parallel \\vec n" },
    {
      type: "text",
      content:
        "We do not need to find $P$ and $Q$ to know the length $PQ$. Take the two points we **are** given, $A_1$ (position vector $\\vec a_1$) and $A_2$ ($\\vec a_2$), and go around the loop $A_1 \\to P \\to Q \\to A_2$:",
    },
    { type: "math", latex: "\\vec a_2 - \\vec a_1 = \\overrightarrow{A_1P} + \\overrightarrow{PQ} + \\overrightarrow{QA_2}" },
    {
      type: "text",
      content:
        "$\\overrightarrow{A_1P}$ runs along the first line and $\\overrightarrow{QA_2}$ along the second, so both are perpendicular to $\\vec n$. Dot the loop with the unit normal $\\hat n$: those two terms vanish and only $\\overrightarrow{PQ}\\cdot\\hat n = \\pm PQ$ survives. So the shortest distance is the **projection of any join on the common normal**.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Shortest distance between skew lines",
      content:
        "For $\\vec r = \\vec a_1 + \\lambda\\vec b_1$ and $\\vec r = \\vec a_2 + \\mu\\vec b_2$ with $\\vec b_1 \\times \\vec b_2 \\ne \\vec 0$:\n\n$$d = \\frac{\\lvert(\\vec a_2 - \\vec a_1)\\cdot(\\vec b_1 \\times \\vec b_2)\\rvert}{\\lvert\\vec b_1 \\times \\vec b_2\\rvert}$$\n\n- $d > 0$: the lines are **skew**.\n- $d = 0$: the lines **intersect**.\n\nThe order of subtraction and of the cross product only changes the sign inside the modulus.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Reading it as a volume",
      content:
        "The numerator is the scalar triple product $\\lvert[\\vec a_2 - \\vec a_1,\\ \\vec b_1,\\ \\vec b_2]\\rvert$: the **volume** of the box with edges $\\vec a_2 - \\vec a_1$, $\\vec b_1$, $\\vec b_2$. The denominator $\\lvert\\vec b_1 \\times \\vec b_2\\rvert$ is the area of its base, the parallelogram on $\\vec b_1$ and $\\vec b_2$. Volume over base area is the **height** of the box, and the height is exactly the gap between the two lines, which run along the bottom and top faces.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "two-lines",
        a: [-1, -1, 4],
        b: [2, 1, -2],
        c: [6, -2, 6],
        d: [1, 2, 2],
        show: ["shortest-distance"],
        caption:
          "The highlighted segment is the common perpendicular: it meets both lines at right angles and its length is the shortest distance. Rotate until you look straight down $\\vec b_1 \\times \\vec b_2$: the two lines then appear to cross, and the segment shrinks to a point. That view is the projection onto the plane perpendicular to the common normal.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the shortest distance is $A_1A_2$\"",
      content:
        "$A_1$ and $A_2$ are just the points that happen to appear in the equations. Rewrite either line from a different point and $\\lvert\\vec a_2 - \\vec a_1\\rvert$ changes, while the gap between the lines does not. Only the **component of the join along $\\vec n$** is the same for every choice of points.",
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "tdg3-2-we1",
      title: "Worked example 1: the formula step by step",
      problem:
        "Find the shortest distance between $\\vec r = \\hat i + \\hat j + \\lambda(2\\hat i - \\hat j + \\hat k)$ and $\\vec r = 2\\hat i + \\hat j - \\hat k + \\mu(3\\hat i - 5\\hat j + 2\\hat k)$.",
      steps: [
        { text: "Read off $\\vec a_1 = (1, 1, 0)$, $\\vec b_1 = (2, -1, 1)$, $\\vec a_2 = (2, 1, -1)$, $\\vec b_2 = (3, -5, 2)$. The join is $\\vec a_2 - \\vec a_1 = (1, 0, -1)$." },
        {
          text: "Common normal. *Why this step:* the shortest segment points along it.",
          latex: "\\vec b_1 \\times \\vec b_2 = \\begin{vmatrix} \\hat i & \\hat j & \\hat k \\\\ 2 & -1 & 1 \\\\ 3 & -5 & 2 \\end{vmatrix} = 3\\hat i - \\hat j - 7\\hat k, \\qquad \\lvert\\vec b_1 \\times \\vec b_2\\rvert = \\sqrt{59}",
        },
        { text: "Project the join: $(1, 0, -1)\\cdot(3, -1, -7) = 3 + 0 + 7 = 10$." },
        { latex: "d = \\frac{10}{\\sqrt{59}} \\approx 1.30" },
      ],
      answer: "$d = \\frac{10}{\\sqrt{59}} \\approx 1.30$ units; the lines are skew.",
    },
    {
      type: "worked-example",
      id: "tdg3-2-we2",
      title: "Worked example 2: a body diagonal and an edge of a cube",
      problem:
        "A cube has edge $a$. Find the shortest distance between a body diagonal and an edge that does not meet it.",
      steps: [
        { text: "Place the cube with corner $O$ at the origin and edges along the axes. The body diagonal from $O$ to $(a, a, a)$ is $\\vec r = \\lambda(1, 1, 1)$." },
        {
          text: "The edge from $(a, 0, 0)$ to $(a, a, 0)$ does not meet it (a point $(t, t, t)$ with $x = a$ has $z = a \\ne 0$). Write it as $\\vec r = (a, 0, 0) + \\mu(0, 1, 0)$.",
        },
        { text: "Common normal: $(1, 1, 1)\\times(0, 1, 0) = (-1, 0, 1)$, of length $\\sqrt2$." },
        {
          text: "Join $(a, 0, 0) - (0, 0, 0) = (a, 0, 0)$; its dot product with the normal is $-a$. *Why this step:* the sign only records the orientation, so take the modulus.",
          latex: "d = \\frac{\\lvert -a\\rvert}{\\sqrt2} = \\frac{a}{\\sqrt2}",
        },
      ],
      answer: "$\\frac{a}{\\sqrt2}$: half a face diagonal. (Lesson 3.5 shows the common perpendicular joins the centre of the cube to the midpoint of the edge.)",
    },
    {
      type: "worked-example",
      id: "tdg3-2-we3",
      title: "Worked example 3: when the formula gives zero",
      problem:
        "Use the shortest-distance formula on the lines of Lesson 3.1, Worked example 2: $\\vec a_1 = (0, 3, 1)$, $\\vec b_1 = (1, -1, 1)$, $\\vec a_2 = (3, 3, 1)$, $\\vec b_2 = (1, 2, -2)$.",
      steps: [
        { text: "$\\vec b_1 \\times \\vec b_2 = ((-1)(-2) - (1)(2),\\ (1)(1) - (1)(-2),\\ (1)(2) - (-1)(1)) = (0, 3, 3)$." },
        { text: "Join $\\vec a_2 - \\vec a_1 = (3, 0, 0)$, and $(3, 0, 0)\\cdot(0, 3, 3) = 0$." },
        { text: "So $d = 0$: the lines meet, as we found by solving. *Why this step:* a zero shortest distance between non-parallel lines is a one-line test for intersection, used heavily in Lesson 3.3." },
      ],
      answer: "$d = 0$: the lines intersect (at $(2, 1, 3)$).",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg3-2-q1",
      variant: "practice",
      question: "Find the shortest distance between the x-axis and the line $\\vec r = 3\\hat k + \\mu\\hat j$.",
      answer: 3,
      hint: "$\\vec b_1 = \\hat i$, $\\vec b_2 = \\hat j$, so $\\vec b_1 \\times \\vec b_2 = \\hat k$.",
      solution: "The join from $O$ to $(0, 0, 3)$ is $(0, 0, 3)$, and its projection on $\\hat k$ is 3. Picture: the second line runs along $y$ at height 3, directly above the y-axis.",
      commonMistakes: [
        { answer: 0, feedback: "The lines do not meet: one is at height 0, the other at height 3." },
        { answer: 9, feedback: "The numerator is 3 and $\\lvert\\hat k\\rvert = 1$; nothing is squared." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-2-q2",
      variant: "practice",
      question:
        "Find the shortest distance between $\\vec r = (\\hat i - \\hat j + 2\\hat k) + \\lambda(\\hat i + 2\\hat j + 2\\hat k)$ and $\\vec r = (3\\hat i + 2\\hat j + 2\\hat k) + \\mu(2\\hat i + \\hat j - 2\\hat k)$. (A fraction is fine.)",
      answer: 0.6666667,
      tolerance: 0.01,
      hint: "$\\vec b_1 \\times \\vec b_2 = (-6, 6, -3)$, which has length 9.",
      solution: "Join $(2, 3, 0)$; $(2, 3, 0)\\cdot(-6, 6, -3) = -12 + 18 + 0 = 6$. $d = \\frac{6}{9} = \\frac23$.",
      commonMistakes: [
        { answer: 6, feedback: "Divide by $\\lvert\\vec b_1 \\times \\vec b_2\\rvert = 9$." },
        { answer: 3.6055513, tolerance: 0.01, feedback: "That is $\\lvert\\vec a_2 - \\vec a_1\\rvert = \\sqrt{13}$, the distance between the given points, not between the lines." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-2-q3",
      variant: "concept",
      multiple: true,
      question:
        "For skew lines $\\vec r = \\vec a_1 + \\lambda\\vec b_1$ and $\\vec r = \\vec a_2 + \\mu\\vec b_2$, with $\\hat n$ a unit vector along $\\vec b_1 \\times \\vec b_2$, which expressions equal the shortest distance? Select all that apply.",
      options: [
        { text: "$\\frac{\\lvert[\\vec a_2 - \\vec a_1,\\ \\vec b_1,\\ \\vec b_2]\\rvert}{\\lvert\\vec b_1 \\times \\vec b_2\\rvert}$", correct: true, feedback: "Volume of the box over the area of its base." },
        { text: "$\\lvert(\\vec a_2 - \\vec a_1)\\cdot\\hat n\\rvert$", correct: true, feedback: "The projection of the join on the common normal." },
        { text: "$\\frac{\\lvert(\\vec a_1 - \\vec a_2)\\cdot(\\vec b_2 \\times \\vec b_1)\\rvert}{\\lvert\\vec b_2 \\times \\vec b_1\\rvert}$", correct: true, feedback: "Both reversals flip a sign, and the modulus removes it." },
        { text: "$\\lvert\\vec a_2 - \\vec a_1\\rvert$", feedback: "That depends on which points you chose; the gap between the lines does not." },
        { text: "$\\frac{\\lvert(\\vec a_2 - \\vec a_1)\\times(\\vec b_1 \\times \\vec b_2)\\rvert}{\\lvert\\vec b_1 \\times \\vec b_2\\rvert}$", feedback: "The cross product with $\\hat n$ measures the part of the join **perpendicular** to the normal, the part that does not count." },
      ],
      hint: "The distance is the component of any join along the common normal.",
    },
    {
      type: "numeric",
      id: "tdg3-2-q4",
      variant: "practice",
      question:
        "Find the shortest distance between the z-axis and the line through $(1, 2, 0)$ with direction $(1, 1, 0)$ (to two decimal places).",
      answer: 0.7071068,
      tolerance: 0.01,
      hint: "$\\hat k \\times (1, 1, 0) = (-1, 1, 0)$.",
      solution:
        "Join $(1, 2, 0)$, normal $(-1, 1, 0)$ of length $\\sqrt2$: $d = \\frac{\\lvert -1 + 2\\rvert}{\\sqrt2} = \\frac{1}{\\sqrt2} \\approx 0.71$. Seen from above, the second line is $x - y + 1 = 0$ in the floor, and $\\frac{1}{\\sqrt2}$ is its distance from the origin, where the z-axis pierces the floor.",
      commonMistakes: [
        { answer: 2.236068, tolerance: 0.01, feedback: "That is the distance from the origin to the given point $(1, 2, 0)$, not to the line." },
        { answer: 1, feedback: "Divide by $\\lvert(-1, 1, 0)\\rvert = \\sqrt2$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-2-q5",
      variant: "concept",
      question: "Why does every join $\\overrightarrow{A_1A_2}$ (any point of one line to any point of the other) have the same projection on $\\vec b_1 \\times \\vec b_2$?",
      options: [
        { text: "Two joins differ by a vector along $\\vec b_1$ plus one along $\\vec b_2$, and both are perpendicular to $\\vec b_1 \\times \\vec b_2$", correct: true, feedback: "Moving an endpoint along its line adds nothing to the projection on the normal." },
        { text: "All joins have the same length", feedback: "They do not: joins can be arbitrarily long." },
        { text: "All joins are perpendicular to both lines", feedback: "Only the common perpendicular is." },
        { text: "Because $\\vec b_1 \\times \\vec b_2$ is a unit vector", feedback: "It usually is not; that is why we divide by its length." },
      ],
      hint: "What changes in $\\overrightarrow{A_1A_2}$ when $A_1$ slides along its line?",
    },
    {
      type: "numeric",
      id: "tdg3-2-q6",
      variant: "practice",
      question:
        "Lesson 3.1, Worked example 1 showed that $\\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z - 3}{4}$ and $\\frac{x - 2}{3} = \\frac{y - 4}{4} = \\frac{z - 5}{5}$ are skew. Find the shortest distance between them (to two decimal places).",
      answer: 0.4082483,
      tolerance: 0.01,
      hint: "$(2, 3, 4) \\times (3, 4, 5) = (-1, 2, -1)$.",
      solution: "Join $(1, 2, 2)$; $(1, 2, 2)\\cdot(-1, 2, -1) = -1 + 4 - 2 = 1$; $\\lvert(-1, 2, -1)\\rvert = \\sqrt6$. $d = \\frac{1}{\\sqrt6} \\approx 0.41$.",
      commonMistakes: [
        { answer: 1, feedback: "Divide the triple product by $\\sqrt6$." },
        { answer: 3, feedback: "That is $\\lvert\\vec a_2 - \\vec a_1\\rvert = \\sqrt{1 + 4 + 4}$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-2-q7",
      variant: "practice",
      question:
        "JEE Main. Find the shortest distance between $\\frac{x - 1}{2} = \\frac{y + 8}{-7} = \\frac{z - 10}{5}$ and $\\frac{x - 1}{2} = \\frac{y - 2}{1} = \\frac{z - 6}{-3}$ (to two decimal places).",
      answer: 3.4641016,
      tolerance: 0.01,
      hint: "$(2, -7, 5) \\times (2, 1, -3) = (16, 16, 16)$.",
      solution: "Join $(0, 10, -4)$; dot with $(16, 16, 16)$ gives $160 - 64 = 96$. $\\lvert(16, 16, 16)\\rvert = 16\\sqrt3$, so $d = \\frac{96}{16\\sqrt3} = 2\\sqrt3 \\approx 3.46$.",
      commonMistakes: [
        { answer: 96, feedback: "Divide by $\\lvert\\vec b_1 \\times \\vec b_2\\rvert = 16\\sqrt3$." },
        { answer: 6, feedback: "$\\frac{96}{16} = 6$, but the length of $(16, 16, 16)$ is $16\\sqrt3$, not 16." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-2-q8",
      variant: "practice",
      question:
        "A cube has edge 4. Find the shortest distance between a body diagonal and an edge that does not meet it (to two decimal places).",
      answer: 2.8284271,
      tolerance: 0.01,
      hint: "Worked example 2: the answer is $\\frac{a}{\\sqrt2}$.",
      solution: "$\\frac{4}{\\sqrt2} = 2\\sqrt2 \\approx 2.83$.",
      commonMistakes: [
        { answer: 4, feedback: "4 is the edge. The gap between the diagonal and the edge is shorter." },
        { answer: 1.6329932, tolerance: 0.01, feedback: "$\\frac{a}{\\sqrt6}$ is the distance from a body diagonal to a face diagonal that misses it, not to an edge." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-2-q9",
      variant: "concept",
      question: "For two **non-parallel** lines, $(\\vec a_2 - \\vec a_1)\\cdot(\\vec b_1 \\times \\vec b_2) = 0$. Then the lines",
      options: [
        { text: "intersect", correct: true, feedback: "The shortest distance is zero and they are not parallel, so they share a point." },
        { text: "are skew", feedback: "Skew lines have a positive shortest distance." },
        { text: "are perpendicular", feedback: "Perpendicularity is $\\vec b_1\\cdot\\vec b_2 = 0$, a statement about directions only." },
        { text: "are parallel", feedback: "They were given as non-parallel." },
      ],
      hint: "What does $d = 0$ mean for lines that are not parallel?",
    },
    {
      type: "numeric",
      id: "tdg3-2-q10",
      variant: "practice",
      question:
        "JEE Main. Find the shortest distance between $\\frac{x - 3}{3} = \\frac{y - 8}{-1} = \\frac{z - 3}{1}$ and $\\frac{x + 3}{-3} = \\frac{y + 7}{2} = \\frac{z - 6}{4}$ (to two decimal places).",
      answer: 16.4316767,
      tolerance: 0.01,
      hint: "$(3, -1, 1) \\times (-3, 2, 4) = (-6, -15, 3)$.",
      solution:
        "Join $(-6, -15, 3)$, which happens to be **equal** to the normal. So the numerator is $36 + 225 + 9 = 270$ and the denominator $\\sqrt{270}$: $d = \\sqrt{270} = 3\\sqrt{30} \\approx 16.43$.",
      commonMistakes: [
        { answer: 270, feedback: "Divide by $\\lvert\\vec n\\rvert = \\sqrt{270}$." },
        { answer: 3, feedback: "$3\\sqrt{30}$, not 3." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-2-q11",
      variant: "concept",
      question:
        "In the reading \"shortest distance = volume ÷ base area\", which box and which base are meant?",
      options: [
        { text: "The box on $\\vec a_2 - \\vec a_1$, $\\vec b_1$, $\\vec b_2$, with base the parallelogram on $\\vec b_1$ and $\\vec b_2$", correct: true, feedback: "Volume $\\lvert[\\vec a_2 - \\vec a_1,\\ \\vec b_1,\\ \\vec b_2]\\rvert$, base $\\lvert\\vec b_1 \\times \\vec b_2\\rvert$, height = gap." },
        { text: "The box on $\\vec a_1$, $\\vec a_2$, $\\vec b_1$, with base on $\\vec a_1$ and $\\vec a_2$", feedback: "The position vectors themselves depend on the origin; only their difference matters." },
        { text: "The box on $\\vec b_1$, $\\vec b_2$, $\\vec b_1 \\times \\vec b_2$, with base on $\\vec b_1$ and $\\vec b_2$", feedback: "That box has nothing to do with where the lines are." },
        { text: "The box on $\\vec a_2 - \\vec a_1$, $\\vec b_1$, $\\vec b_2$, with base the parallelogram on $\\vec a_2 - \\vec a_1$ and $\\vec b_1$", feedback: "The height above that base is not the gap between the lines." },
      ],
      hint: "The lines run along the base and the top face of the box.",
    },
    {
      type: "numeric",
      id: "tdg3-2-q12",
      variant: "practice",
      question: "Find the shortest distance between $\\vec r = \\lambda(\\hat i + \\hat j)$ and $\\vec r = \\hat k + \\mu(\\hat i - \\hat j)$.",
      answer: 1,
      hint: "Both lines are horizontal: one in the floor $z = 0$, the other in the plane $z = 1$.",
      solution: "$(1, 1, 0) \\times (1, -1, 0) = (0, 0, -2)$; join $(0, 0, 1)$; $d = \\frac{\\lvert -2\\rvert}{2} = 1$. The lines lie in parallel planes 1 apart, and their directions are not parallel, so the gap is the gap between the planes.",
      commonMistakes: [
        { answer: 2, feedback: "Divide the numerator 2 by $\\lvert(0, 0, -2)\\rvert = 2$." },
        { answer: 0, feedback: "The lines are at different heights, so they do not meet." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "cartesian-shortest-distance-and-intersection",
  title: "3.3 · The Cartesian Form and the Condition to Intersect",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "JEE papers usually give lines in Cartesian form, $\\frac{x - x_1}{a_1} = \\frac{y - y_1}{b_1} = \\frac{z - z_1}{c_1}$. Rewriting the shortest-distance formula of Lesson 3.2 in coordinates turns its numerator into a $3 \\times 3$ determinant, and the question \"do these lines meet?\" into \"is this determinant zero?\".",
    },
    { type: "heading", text: "The numerator is a determinant" },
    {
      type: "text",
      content:
        "For $\\frac{x - x_1}{a_1} = \\frac{y - y_1}{b_1} = \\frac{z - z_1}{c_1}$ and $\\frac{x - x_2}{a_2} = \\frac{y - y_2}{b_2} = \\frac{z - z_2}{c_2}$ we have $\\vec a_2 - \\vec a_1 = (x_2 - x_1,\\ y_2 - y_1,\\ z_2 - z_1)$, $\\vec b_1 = (a_1, b_1, c_1)$ and $\\vec b_2 = (a_2, b_2, c_2)$. The scalar triple product $[\\vec a_2 - \\vec a_1,\\ \\vec b_1,\\ \\vec b_2]$ is the determinant with these three rows (Vector Algebra, Chapter 5), and $\\lvert\\vec b_1 \\times \\vec b_2\\rvert$ is the length of the cross product:",
    },
    {
      type: "math",
      latex:
        "d = \\frac{\\left\\lvert \\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix} \\right\\rvert}{\\sqrt{(b_1c_2 - b_2c_1)^2 + (c_1a_2 - c_2a_1)^2 + (a_1b_2 - a_2b_1)^2}}",
    },
    {
      type: "text",
      content:
        "The three brackets in the denominator are the components of $\\vec b_1 \\times \\vec b_2$, so a quick way to get them is the same $2 \\times 2$ minors you would use for the cross product. Compute the cross product **once** and reuse it: its components are the denominator, and expanding the determinant along its first row is just the dot product of the join with it.",
    },
    {
      type: "worked-example",
      id: "tdg3-3-we1",
      title: "Worked example 1: the determinant form",
      problem:
        "Find the shortest distance between $\\frac{x + 1}{7} = \\frac{y + 1}{-6} = \\frac{z + 1}{1}$ and $\\frac{x - 3}{1} = \\frac{y - 5}{-2} = \\frac{z - 7}{1}$.",
      steps: [
        { text: "Points $(-1, -1, -1)$ and $(3, 5, 7)$, so the join is $(4, 6, 8)$. Directions $(7, -6, 1)$ and $(1, -2, 1)$." },
        {
          text: "Cross product of the directions (these are the denominator brackets):",
          latex: "(7, -6, 1)\\times(1, -2, 1) = (-6 + 2,\\ 1 - 7,\\ -14 + 6) = (-4, -6, -8)",
        },
        {
          text: "Numerator: expand the determinant along the join row. *Why this step:* the expansion is exactly the dot product of the join with the cross product.",
          latex: "\\begin{vmatrix} 4 & 6 & 8 \\\\ 7 & -6 & 1 \\\\ 1 & -2 & 1 \\end{vmatrix} = 4(-4) + 6(-6) + 8(-8) = -116",
        },
        { latex: "d = \\frac{116}{\\sqrt{16 + 36 + 64}} = \\frac{116}{\\sqrt{116}} = \\sqrt{116} = 2\\sqrt{29} \\approx 10.77" },
      ],
      answer: "$2\\sqrt{29} \\approx 10.77$ units.",
    },
    { type: "heading", text: "The condition for two lines to intersect" },
    {
      type: "text",
      content:
        "Two lines lie in one plane exactly when the box on $\\vec a_2 - \\vec a_1$, $\\vec b_1$, $\\vec b_2$ is flat, that is, when the determinant is zero. Coplanar lines either meet or are parallel, so:",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Coplanar and intersecting lines",
      content:
        "The lines are **coplanar** if and only if\n\n$$\\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix} = 0.$$\n\nThey **intersect** if and only if this determinant is zero **and** $(a_1, b_1, c_1)$, $(a_2, b_2, c_2)$ are not proportional.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"determinant zero means the lines intersect\"",
      content:
        "If the directions are proportional, the last two rows of the determinant are proportional and it is zero **automatically**, whatever the points. Parallel lines are coplanar but never meet. Always check the directions before you announce an intersection.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-distance-lab",
        mode: "skew-lines",
        p1: [1, 2, 3],
        d1: [1, 2, 3],
        p2: [2, 3, 1],
        d2: [2, 1, 1],
        caption:
          "The first line passes through $(1, 2, 3)$ with direction $(1, 2, 3)$; the second through $(2, k, 1)$ with direction $(2, 1, 1)$, starting at $k = 3$. Step the y-coordinate of the second point down and watch the triple product: it changes by 5 for every unit step and reaches zero at $k = 1$, where the shortest distance vanishes and the lines meet (Worked example 2).",
      },
    },
    {
      type: "worked-example",
      id: "tdg3-3-we2",
      title: "Worked example 2: find k so that the lines meet",
      problem:
        "Find $k$ so that $\\frac{x - 1}{1} = \\frac{y - 2}{2} = \\frac{z - 3}{3}$ and $\\frac{x - 2}{2} = \\frac{y - k}{1} = \\frac{z - 1}{1}$ intersect, and find the point of intersection.",
      steps: [
        { text: "Directions $(1, 2, 3)$ and $(2, 1, 1)$ are not proportional, so intersecting is the same as coplanar." },
        {
          text: "Join $(2 - 1,\\ k - 2,\\ 1 - 3) = (1, k - 2, -2)$. Set the determinant to zero:",
          latex: "\\begin{vmatrix} 1 & k - 2 & -2 \\\\ 1 & 2 & 3 \\\\ 2 & 1 & 1 \\end{vmatrix} = 1(2 - 3) - (k - 2)(1 - 6) - 2(1 - 4) = 5k - 5 = 0",
        },
        { text: "So $k = 1$." },
        {
          text: "Now find the point. General points $(1 + \\lambda,\\ 2 + 2\\lambda,\\ 3 + 3\\lambda)$ and $(2 + 2\\mu,\\ 1 + \\mu,\\ 1 + \\mu)$. From x and y: $\\lambda - 2\\mu = 1$ and $2\\lambda - \\mu = -1$, so $\\lambda = -1$, $\\mu = -1$. *Why this step:* the determinant guarantees the third equation will agree; z gives $0 = 0$.",
        },
      ],
      answer: "$k = 1$; the lines meet at the origin $(0, 0, 0)$.",
    },
    {
      type: "worked-example",
      id: "tdg3-3-we3",
      title: "Worked example 3: a zero determinant that is not an intersection",
      problem:
        "Evaluate the determinant for $\\frac{x - 1}{1} = \\frac{y - 2}{2} = \\frac{z - 3}{3}$ and $\\frac{x - 2}{2} = \\frac{y - 3}{4} = \\frac{z - 4}{6}$, and decide whether the lines meet.",
      steps: [
        {
          text: "Join $(1, 1, 1)$; rows $(1, 2, 3)$ and $(2, 4, 6)$:",
          latex: "\\begin{vmatrix} 1 & 1 & 1 \\\\ 1 & 2 & 3 \\\\ 2 & 4 & 6 \\end{vmatrix} = 0",
        },
        { text: "But the last two rows are proportional: the lines are parallel, so the zero tells us nothing more than \"coplanar\"." },
        { text: "Is $(2, 3, 4)$ on the first line? $\\frac{1}{1} = 1$ but $\\frac{1}{2} \\ne 1$. No: the lines are parallel and distinct (their distance is found in Lesson 3.4)." },
      ],
      answer: "Determinant 0, yet the lines never meet: they are parallel.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg3-3-q1",
      variant: "practice",
      question:
        "Find $k$ so that $\\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z - 3}{4}$ and $\\frac{x - 4}{5} = \\frac{y - 1}{2} = \\frac{z}{k}$ intersect.",
      answer: 1,
      hint: "The join is $(3, -1, -3)$. Set $\\begin{vmatrix} 3 & -1 & -3 \\\\ 2 & 3 & 4 \\\\ 5 & 2 & k \\end{vmatrix} = 0$.",
      solution:
        "$3(3k - 8) + 1(2k - 20) - 3(4 - 15) = 9k - 24 + 2k - 20 + 33 = 11k - 11 = 0$, so $k = 1$. The directions $(2, 3, 4)$ and $(5, 2, 1)$ are not proportional, so the lines really meet (at $(-1, -1, -1)$).",
      commonMistakes: [
        { answer: -1, feedback: "That drops the middle term. The entry $-1$ with its alternating minus sign gives $-(-1)(2k - 20) = +(2k - 20)$; the determinant is $11k - 11$." },
        { answer: 4, feedback: "That drops the third term, $-3(4 - 15) = +33$. Expand the whole determinant; it is $11k - 11$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-3-q2",
      variant: "practice",
      multiple: true,
      question:
        "JEE Main. The lines $\\frac{x - 2}{1} = \\frac{y - 3}{1} = \\frac{z - 4}{-k}$ and $\\frac{x - 1}{k} = \\frac{y - 4}{2} = \\frac{z - 5}{1}$ are coplanar for which values of $k$? Select all that apply.",
      options: [
        { text: "$k = 0$", correct: true, feedback: "The determinant is $-k(k + 3)$, which vanishes at $k = 0$." },
        { text: "$k = -3$", correct: true, feedback: "$-k(k + 3) = 0$ at $k = -3$ as well." },
        { text: "$k = 3$", feedback: "$-3(6) = -18 \\ne 0$." },
        { text: "$k = 1$", feedback: "$-1(4) = -4 \\ne 0$." },
        { text: "$k = -1$", feedback: "$1(2) = 2 \\ne 0$." },
      ],
      hint: "Join $(-1, 1, 1)$; rows $(1, 1, -k)$ and $(k, 2, 1)$. Expand and factor.",
    },
    {
      type: "quiz",
      id: "tdg3-3-q3",
      variant: "concept",
      question:
        "For two lines the coplanarity determinant is $0$ and the direction ratios are $(2, -1, 3)$ and $(-4, 2, -6)$. The lines",
      options: [
        { text: "are parallel or coincident", correct: true, feedback: "Proportional directions make the determinant vanish whatever the points; check a point to separate the two cases." },
        { text: "intersect at exactly one point", feedback: "Lines with proportional directions cannot meet at exactly one point." },
        { text: "are skew", feedback: "A zero determinant means coplanar, never skew." },
        { text: "are perpendicular", feedback: "$(2, -1, 3)\\cdot(-4, 2, -6) = -28 \\ne 0$, and in any case they are parallel." },
      ],
      hint: "What do proportional rows do to a determinant?",
    },
    {
      type: "numeric",
      id: "tdg3-3-q4",
      variant: "practice",
      question:
        "Find the shortest distance between $\\frac{x}{2} = \\frac{y}{-3} = \\frac{z}{1}$ and $\\frac{x - 2}{3} = \\frac{y - 1}{-5} = \\frac{z + 2}{2}$ (to two decimal places).",
      answer: 0.5773503,
      tolerance: 0.01,
      hint: "$(2, -3, 1)\\times(3, -5, 2) = (-1, -1, -1)$.",
      solution:
        "Join $(2, 1, -2)$. Determinant $= (2, 1, -2)\\cdot(-1, -1, -1) = -2 - 1 + 2 = -1$. Denominator $\\sqrt{1 + 1 + 1} = \\sqrt3$. $d = \\frac{1}{\\sqrt3} \\approx 0.58$.",
      commonMistakes: [
        { answer: 1, feedback: "Divide by $\\sqrt3$." },
        { answer: 3, feedback: "$\\lvert(2, 1, -2)\\rvert = 3$ is the distance between the given points." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-3-q5",
      variant: "practice",
      question:
        "Show that $\\frac{x + 1}{3} = \\frac{y + 3}{5} = \\frac{z + 5}{7}$ and $\\frac{x - 2}{1} = \\frac{y - 4}{3} = \\frac{z - 6}{5}$ intersect, and find the sum of the coordinates of the point of intersection.",
      answer: -1.5,
      hint: "Check the determinant with join $(3, 7, 11)$ first; then equate the x and y coordinates of the general points.",
      solution:
        "$3(25 - 21) - 7(15 - 7) + 11(9 - 5) = 12 - 56 + 44 = 0$, and the directions are not proportional, so the lines meet. $-1 + 3\\lambda = 2 + \\mu$ and $-3 + 5\\lambda = 4 + 3\\mu$ give $\\lambda = \\frac12$, $\\mu = -\\frac32$. The point is $\\left(\\frac12, -\\frac12, -\\frac32\\right)$, with coordinate sum $-\\frac32$.",
      commonMistakes: [
        { answer: -1, feedback: "That is $\\lambda + \\mu$. Substitute $\\lambda = \\frac12$ into the first line." },
        { answer: 1.5, feedback: "Check the signs: the point is $\\left(\\frac12, -\\frac12, -\\frac32\\right)$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-3-q6",
      variant: "concept",
      question:
        "In the determinant for $\\frac{x - x_1}{a_1} = \\frac{y - y_1}{b_1} = \\frac{z - z_1}{c_1}$ and $\\frac{x - x_2}{a_2} = \\frac{y - y_2}{b_2} = \\frac{z - z_2}{c_2}$, the three rows are",
      options: [
        { text: "the join $(x_2 - x_1, y_2 - y_1, z_2 - z_1)$ and the two direction ratios", correct: true, feedback: "That is $[\\vec a_2 - \\vec a_1,\\ \\vec b_1,\\ \\vec b_2]$." },
        { text: "the two points and one direction", feedback: "The position vectors depend on the origin; only their difference belongs in the box." },
        { text: "the two points and the join", feedback: "Without the directions the determinant knows nothing about the lines." },
        { text: "$(x_1, y_1, z_1)$ and the two direction ratios", feedback: "The first row must be the join, which uses both points." },
      ],
      hint: "The determinant is the triple product of the join and the two directions.",
    },
    {
      type: "numeric",
      id: "tdg3-3-q7",
      variant: "practice",
      question:
        "JEE Main. The lines $\\frac{x - 1}{2} = \\frac{y + 1}{3} = \\frac{z - 1}{4}$ and $\\frac{x - 3}{1} = \\frac{y - k}{2} = \\frac{z}{1}$ intersect. Find $k$.",
      answer: 4.5,
      hint: "Join $(2, k + 1, -1)$; rows $(2, 3, 4)$ and $(1, 2, 1)$.",
      solution:
        "$2(3 - 8) - (k + 1)(2 - 4) - 1(4 - 3) = -10 + 2k + 2 - 1 = 2k - 9 = 0$, so $k = \\frac92$. The lines meet at $\\left(-2, -\\frac{11}{2}, -5\\right)$.",
      commonMistakes: [
        { answer: -6.5, feedback: "Recheck the middle term: $-(k + 1)(2 - 4) = +2(k + 1)$, not $-2(k + 1)$." },
        { answer: 5.5, feedback: "The join's y-entry is $k - (-1) = k + 1$, not $k$: the expansion is $-10 + 2(k + 1) - 1 = 2k - 9$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-3-q8",
      variant: "practice",
      multiple: true,
      question: "Which pairs of lines are coplanar? Select all that apply.",
      options: [
        { text: "$\\frac{x}{1} = \\frac{y}{1} = \\frac{z}{1}$ and $\\frac{x - 1}{1} = \\frac{y - 1}{2} = \\frac{z - 1}{3}$", correct: true, feedback: "Both pass through $(1, 1, 1)$: they intersect." },
        { text: "$\\frac{x - 1}{2} = \\frac{y}{3} = \\frac{z}{4}$ and $\\frac{x - 3}{4} = \\frac{y - 2}{6} = \\frac{z - 4}{8}$", correct: true, feedback: "Proportional directions, and $(3, 2, 4)$ is not on the first line: parallel lines, which are coplanar." },
        { text: "$\\vec r = \\hat i + \\lambda(\\hat j + \\hat k)$ and $\\vec r = \\hat j + \\mu(\\hat i + \\hat k)$", correct: true, feedback: "Join $(-1, 1, 0)$, normal $(1, 1, -1)$: triple product 0. They meet at $(1, 1, 1)$." },
        { text: "the x-axis and the line through $(1, 0, 1)$ parallel to the y-axis", feedback: "Join $(1, 0, 1)$, normal $\\hat i \\times \\hat j = \\hat k$: triple product 1, so they are skew." },
        { text: "$\\vec r = \\hat i + \\hat j + \\lambda\\hat i$ and $\\vec r = \\hat k + \\mu\\hat j$", feedback: "Join $(-1, -1, 1)$, normal $\\hat i \\times \\hat j = \\hat k$: triple product 1, skew." },
      ],
      hint: "Coplanar = triple product zero, which includes the parallel case.",
    },
    {
      type: "quiz",
      id: "tdg3-3-q9",
      variant: "practice",
      multiple: true,
      question:
        "JEE Advanced. Consider $\\frac{x - 1}{1} = \\frac{y - 2}{2} = \\frac{z + 3}{\\lambda^2}$ and $\\frac{x - 3}{1} = \\frac{y - 2}{\\lambda^2} = \\frac{z - 1}{2}$. Which statements are true? Select all that apply.",
      options: [
        { text: "The lines are coplanar when $\\lambda = \\sqrt2$", correct: true, feedback: "The determinant is $-2\\lambda^2(\\lambda^2 - 2)$, which vanishes at $\\lambda^2 = 2$." },
        { text: "The lines are coplanar when $\\lambda = 0$", correct: true, feedback: "$-2\\lambda^2(\\lambda^2 - 2) = 0$ at $\\lambda = 0$ too." },
        { text: "The lines intersect when $\\lambda = 0$", correct: true, feedback: "Directions $(1, 2, 0)$ and $(1, 0, 2)$ are not proportional, so coplanar means intersecting: they meet at $(1, 2, -3)$." },
        { text: "The lines intersect when $\\lambda = \\sqrt2$", feedback: "Then both directions are $(1, 2, 2)$: the lines are parallel, and $(3, 2, 1)$ is not on the first one." },
        { text: "The lines are coplanar when $\\lambda = 2$", feedback: "$-2(4)(2) = -16 \\ne 0$." },
      ],
      hint: "Join $(2, 0, 4)$. Expand the determinant in $\\lambda^2$, then check each root for parallel directions.",
    },
    {
      type: "numeric",
      id: "tdg3-3-q10",
      variant: "practice",
      question:
        "JEE Main. Find the shortest distance between $\\frac{x - 3}{-1} = \\frac{y - 4}{2} = \\frac{z + 2}{1}$ and $\\frac{x - 1}{1} = \\frac{y + 7}{3} = \\frac{z + 2}{2}$ (to two decimal places).",
      answer: 5.9160798,
      tolerance: 0.01,
      hint: "$(-1, 2, 1)\\times(1, 3, 2) = (1, 3, -5)$.",
      solution:
        "Join $(-2, -11, 0)$. Determinant $= (-2)(1) + (-11)(3) + 0 = -35$. Denominator $\\sqrt{1 + 9 + 25} = \\sqrt{35}$. $d = \\frac{35}{\\sqrt{35}} = \\sqrt{35} \\approx 5.92$.",
      commonMistakes: [
        { answer: 35, feedback: "Divide by $\\sqrt{35}$." },
        { answer: 11.1803399, tolerance: 0.01, feedback: "That is $\\sqrt{125}$, the distance between the given points." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-3-q11",
      variant: "concept",
      question:
        "The denominator $\\sqrt{(b_1c_2 - b_2c_1)^2 + (c_1a_2 - c_2a_1)^2 + (a_1b_2 - a_2b_1)^2}$ is zero. What does that tell you?",
      options: [
        { text: "The direction ratios are proportional, so the lines are parallel or coincident and this formula cannot be used", correct: true, feedback: "It is $\\lvert\\vec b_1 \\times \\vec b_2\\rvert$, which vanishes exactly for parallel directions. Lesson 3.4 handles that case." },
        { text: "The lines intersect", feedback: "Intersection makes the **numerator** zero, not the denominator." },
        { text: "The shortest distance is infinite", feedback: "Parallel lines are a finite distance apart; the formula has just become $\\frac00$." },
        { text: "The lines are perpendicular", feedback: "Perpendicular directions make $\\lvert\\vec b_1 \\times \\vec b_2\\rvert = \\lvert\\vec b_1\\rvert\\lvert\\vec b_2\\rvert$, as large as possible." },
      ],
      hint: "The three brackets are the components of $\\vec b_1 \\times \\vec b_2$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "distance-between-parallel-lines",
  title: "3.4 · Distance Between Parallel Lines",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Two parallel lines are like the two rails of a railway track: the gap between them is the same wherever you measure it, as long as you measure **across** the rails. The skew-lines formula cannot see this gap. For parallel lines $\\vec b_1 \\times \\vec b_2 = \\vec 0$, so both its numerator and its denominator are zero: $\\frac00$ says nothing.",
    },
    { type: "heading", text: "Why the skew formula breaks" },
    {
      type: "text",
      content:
        "The skew formula projects the join onto the common normal $\\vec b_1 \\times \\vec b_2$. Parallel lines have no single common normal: **every** direction perpendicular to $\\vec b$ is perpendicular to both lines. We need a different construction, and the right one is already in Chapter 2: the distance from a point to a line.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"use the skew formula anyway\"",
      content:
        "With parallel directions the cross product is $\\vec 0$ and the formula becomes $\\frac{0}{0}$. Some students then write the answer as 0 (\"the lines meet\") or as $\\lvert\\vec a_2 - \\vec a_1\\rvert$. Both are wrong. **Always check the directions first**: proportional directions call for the formula below.",
    },
    { type: "heading", text: "Distance as the height of a parallelogram" },
    {
      type: "text",
      content:
        "Let the lines be $\\vec r = \\vec a_1 + \\lambda\\vec b$ and $\\vec r = \\vec a_2 + \\mu\\vec b$. The distance between them is the distance from the point $A_2$ to the first line. Build the parallelogram on $\\vec b$ and the join $\\vec a_2 - \\vec a_1$: its area is $\\lvert(\\vec a_2 - \\vec a_1)\\times\\vec b\\rvert$, its base is $\\lvert\\vec b\\rvert$, and its height is the gap between the lines.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Distance between parallel lines",
      content:
        "For $\\vec r = \\vec a_1 + \\lambda\\vec b$ and $\\vec r = \\vec a_2 + \\mu\\vec b$:\n\n$$d = \\frac{\\lvert(\\vec a_2 - \\vec a_1)\\times\\vec b\\rvert}{\\lvert\\vec b\\rvert} = \\lvert(\\vec a_2 - \\vec a_1)\\times\\hat b\\rvert.$$\n\nIf the second line is written with a multiple $k\\vec b$, use either direction: only the unit vector $\\hat b$ matters.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "two-lines",
        a: [1, 2, -4],
        b: [2, 3, 6],
        c: [3, 3, -5],
        d: [2, 3, 6],
        show: ["shortest-distance"],
        caption:
          "Two parallel lines with direction $(2, 3, 6)$. The viewer reports \"parallel\" and draws one of the infinitely many common perpendiculars: slide it along the lines in your head and its length never changes. Rotate to look along the direction $(2, 3, 6)$: both lines shrink to points, and the gap between those two points is the distance.",
      },
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "tdg3-4-we1",
      title: "Worked example 1: two lines with the same direction vector",
      problem:
        "Find the distance between $\\vec r = \\hat i + 2\\hat j - 4\\hat k + \\lambda(2\\hat i + 3\\hat j + 6\\hat k)$ and $\\vec r = 3\\hat i + 3\\hat j - 5\\hat k + \\mu(2\\hat i + 3\\hat j + 6\\hat k)$.",
      steps: [
        { text: "Same direction $\\vec b = (2, 3, 6)$ with $\\lvert\\vec b\\rvert = 7$. Join $\\vec a_2 - \\vec a_1 = (2, 1, -1)$." },
        {
          text: "Area of the parallelogram on the join and $\\vec b$:",
          latex: "(2, 1, -1)\\times(2, 3, 6) = (6 + 3,\\ -2 - 12,\\ 6 - 2) = (9, -14, 4), \\qquad \\lvert(9, -14, 4)\\rvert = \\sqrt{293}",
        },
        { latex: "d = \\frac{\\sqrt{293}}{7} \\approx 2.45" },
      ],
      answer: "$\\frac{\\sqrt{293}}{7} \\approx 2.45$ units.",
    },
    {
      type: "worked-example",
      id: "tdg3-4-we2",
      title: "Worked example 2: directions given as different multiples",
      problem:
        "Find the distance between $\\frac{x - 1}{2} = \\frac{y + 2}{-1} = \\frac{z}{2}$ and $\\frac{x - 3}{-4} = \\frac{y - 1}{2} = \\frac{z + 1}{-4}$.",
      steps: [
        { text: "$(-4, 2, -4) = -2(2, -1, 2)$: parallel. Use $\\vec b = (2, -1, 2)$, $\\lvert\\vec b\\rvert = 3$. *Why this step:* the shorter direction keeps the numbers small; any multiple gives the same $\\hat b$ up to sign." },
        { text: "Join from $(1, -2, 0)$ to $(3, 1, -1)$: $(2, 3, -1)$." },
        {
          latex: "(2, 3, -1)\\times(2, -1, 2) = (6 - 1,\\ -2 - 4,\\ -2 - 6) = (5, -6, -8), \\qquad \\lvert(5, -6, -8)\\rvert = \\sqrt{125} = 5\\sqrt5",
        },
        { latex: "d = \\frac{5\\sqrt5}{3} \\approx 3.73" },
      ],
      answer: "$\\frac{5\\sqrt5}{3} \\approx 3.73$ units.",
    },
    {
      type: "worked-example",
      id: "tdg3-4-we3",
      title: "Worked example 3: the same answer by the foot of the perpendicular",
      problem: "Check Worked example 2 by finding the foot of the perpendicular from $A_2(3, 1, -1)$ to the first line.",
      steps: [
        { text: "General point of the first line: $Q = (1 + 2\\lambda,\\ -2 - \\lambda,\\ 2\\lambda)$. Then $\\overrightarrow{A_2Q} = (2\\lambda - 2,\\ -3 - \\lambda,\\ 2\\lambda + 1)$." },
        {
          text: "Perpendicular to $\\vec b = (2, -1, 2)$ (Chapter 2's method):",
          latex: "2(2\\lambda - 2) - (-3 - \\lambda) + 2(2\\lambda + 1) = 9\\lambda + 1 = 0 \\quad\\Longrightarrow\\quad \\lambda = -\\tfrac19",
        },
        {
          text: "$\\overrightarrow{A_2Q} = \\left(-\\frac{20}{9}, -\\frac{26}{9}, \\frac79\\right)$, of length $\\frac{\\sqrt{400 + 676 + 49}}{9} = \\frac{\\sqrt{1125}}{9} = \\frac{15\\sqrt5}{9} = \\frac{5\\sqrt5}{3}$.",
        },
      ],
      answer: "Same distance, $\\frac{5\\sqrt5}{3}$; the cross-product formula is the quicker route.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg3-4-q1",
      variant: "practice",
      question:
        "Find the distance between $\\frac{x}{1} = \\frac{y}{1} = \\frac{z}{1}$ and $\\frac{x - 1}{2} = \\frac{y - 2}{2} = \\frac{z - 3}{2}$ (to two decimal places).",
      answer: 1.4142136,
      tolerance: 0.01,
      hint: "Parallel, with $\\vec b = (1, 1, 1)$. Join $(1, 2, 3)$.",
      solution: "$(1, 2, 3)\\times(1, 1, 1) = (-1, 2, -1)$, of length $\\sqrt6$. $d = \\frac{\\sqrt6}{\\sqrt3} = \\sqrt2 \\approx 1.41$.",
      commonMistakes: [
        { answer: 3.7416574, tolerance: 0.01, feedback: "That is $\\sqrt{14}$, the distance between the two given points." },
        { answer: 2.4494897, tolerance: 0.01, feedback: "Divide $\\sqrt6$ by $\\lvert\\vec b\\rvert = \\sqrt3$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-4-q2",
      variant: "concept",
      question: "Why can't the skew-lines formula $\\frac{\\lvert(\\vec a_2 - \\vec a_1)\\cdot(\\vec b_1 \\times \\vec b_2)\\rvert}{\\lvert\\vec b_1 \\times \\vec b_2\\rvert}$ be used for parallel lines?",
      options: [
        { text: "$\\vec b_1 \\times \\vec b_2 = \\vec 0$, so it reads $\\frac00$", correct: true, feedback: "Parallel lines have no unique common normal to project on." },
        { text: "It gives 0, which is the right answer only if the lines coincide", feedback: "It does not give 0: it gives the undefined $\\frac00$." },
        { text: "It gives a negative answer", feedback: "The modulus prevents that; the problem is the zero denominator." },
        { text: "It can be used; parallel lines are a special case of skew lines", feedback: "Skew lines are by definition not parallel." },
      ],
      hint: "What is the cross product of two parallel vectors?",
    },
    {
      type: "numeric",
      id: "tdg3-4-q3",
      variant: "practice",
      question:
        "Find the distance between $\\vec r = (\\hat i - \\hat k) + \\lambda(\\hat i + 2\\hat j + 2\\hat k)$ and $\\vec r = (3\\hat i + \\hat j + 2\\hat k) + \\mu(-2\\hat i - 4\\hat j - 4\\hat k)$ (to two decimal places).",
      answer: 1.6996732,
      tolerance: 0.01,
      hint: "Use $\\vec b = (1, 2, 2)$, $\\lvert\\vec b\\rvert = 3$; join $(2, 1, 3)$.",
      solution: "$(2, 1, 3)\\times(1, 2, 2) = (2 - 6,\\ 3 - 4,\\ 4 - 1) = (-4, -1, 3)$, length $\\sqrt{26}$. $d = \\frac{\\sqrt{26}}{3} \\approx 1.70$.",
      commonMistakes: [
        { answer: 5.0990195, tolerance: 0.01, feedback: "That is $\\sqrt{26}$; divide by $\\lvert\\vec b\\rvert = 3$." },
        { answer: 0.8498366, tolerance: 0.01, feedback: "You divided by $\\lvert(-2, -4, -4)\\rvert = 6$ while crossing with $(1, 2, 2)$. Use the same vector in both places." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-4-q4",
      variant: "practice",
      question:
        "A line through $(0, 3, k)$ parallel to the x-axis is at distance 5 from the x-axis. Find the positive value of $k$.",
      answer: 4,
      hint: "The distance of $(x, y, z)$ from the x-axis is $\\sqrt{y^2 + z^2}$.",
      solution: "$(0, 3, k)\\times(1, 0, 0) = (0, k, -3)$, so $d = \\sqrt{9 + k^2} = 5$ and $k = 4$ (or $-4$).",
      commonMistakes: [
        { answer: 2, feedback: "$5 - 3 = 2$ treats distances as adding along a line; use Pythagoras, $\\sqrt{9 + k^2} = 5$." },
        { answer: 16, feedback: "$k^2 = 16$, so $k = 4$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-4-q5",
      variant: "concept",
      multiple: true,
      question:
        "For parallel lines $\\vec r = \\vec a_1 + \\lambda\\vec b$ and $\\vec r = \\vec a_2 + \\mu\\vec b$, which expressions give the distance between them? Select all that apply.",
      options: [
        { text: "$\\frac{\\lvert(\\vec a_2 - \\vec a_1)\\times\\vec b\\rvert}{\\lvert\\vec b\\rvert}$", correct: true, feedback: "Parallelogram area over base." },
        { text: "$\\lvert(\\vec a_2 - \\vec a_1)\\times\\hat b\\rvert$", correct: true, feedback: "The same thing with the base length divided in already." },
        { text: "the distance from the point $A_2$ to the first line", correct: true, feedback: "Every point of the second line is the same distance from the first." },
        { text: "$\\frac{\\lvert(\\vec a_2 - \\vec a_1)\\cdot\\vec b\\rvert}{\\lvert\\vec b\\rvert}$", feedback: "That is the part of the join **along** the lines, the part that does not count." },
        { text: "$\\lvert\\vec a_2 - \\vec a_1\\rvert$", feedback: "Only if the join happens to be perpendicular to the lines." },
      ],
      hint: "The gap is the part of the join perpendicular to $\\vec b$.",
    },
    {
      type: "numeric",
      id: "tdg3-4-q6",
      variant: "practice",
      question:
        "Find the distance between $\\frac{x - 1}{2} = \\frac{y - 1}{-2} = \\frac{z + 1}{1}$ and $\\frac{x - 4}{-4} = \\frac{y - 1}{4} = \\frac{z - 2}{-2}$.",
      answer: 3,
      hint: "$\\vec b = (2, -2, 1)$ with $\\lvert\\vec b\\rvert = 3$; join $(3, 0, 3)$.",
      solution: "$(3, 0, 3)\\times(2, -2, 1) = (0 + 6,\\ 6 - 3,\\ -6 - 0) = (6, 3, -6)$, of length 9. $d = \\frac93 = 3$.",
      commonMistakes: [
        { answer: 9, feedback: "Divide by $\\lvert\\vec b\\rvert = 3$." },
        { answer: 4.2426407, tolerance: 0.01, feedback: "That is $3\\sqrt2$, the length of the join itself." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-4-q7",
      variant: "practice",
      question:
        "Find the distance of the point $(3, 0, 0)$ from the line through the origin with direction $(1, 2, 2)$; this is also the distance between that line and the parallel line through $(3, 0, 0)$. Give it to two decimal places.",
      answer: 2.8284271,
      tolerance: 0.01,
      hint: "$(3, 0, 0)\\times(1, 2, 2)$, then divide by 3.",
      solution: "$(3, 0, 0)\\times(1, 2, 2) = (0, -6, 6)$, length $6\\sqrt2$. $d = \\frac{6\\sqrt2}{3} = 2\\sqrt2 \\approx 2.83$.",
      commonMistakes: [
        { answer: 1, feedback: "That is the projection $\\frac{(3, 0, 0)\\cdot(1, 2, 2)}{3}$, the part **along** the line." },
        { answer: 3, feedback: "3 is the distance from the origin, not from the line." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-4-q8",
      variant: "concept",
      question:
        "In $d = \\frac{\\lvert(\\vec a_2 - \\vec a_1)\\times\\vec b\\rvert}{\\lvert\\vec b\\rvert}$, what does the numerator measure?",
      options: [
        { text: "The area of the parallelogram with sides $\\vec a_2 - \\vec a_1$ and $\\vec b$", correct: true, feedback: "Its base is $\\lvert\\vec b\\rvert$, so dividing gives the height, the gap between the lines." },
        { text: "The volume of a box", feedback: "A volume needs three vectors; here there are two." },
        { text: "The length of the join", feedback: "The cross product also carries $\\sin\\theta$, which removes the part along $\\vec b$." },
        { text: "The angle between the lines", feedback: "Parallel lines make no angle with each other." },
      ],
      hint: "$\\lvert\\vec u \\times \\vec v\\rvert$ is always an area.",
    },
    {
      type: "numeric",
      id: "tdg3-4-q9",
      variant: "practice",
      question:
        "JEE Main. A line $L_2$ passes through the origin and is parallel to $L_1$: $\\frac{x - 2}{1} = \\frac{y + 1}{2} = \\frac{z - 3}{2}$. Find the distance between $L_1$ and $L_2$ (to two decimal places).",
      answer: 3.1622777,
      tolerance: 0.01,
      hint: "Join from $(2, -1, 3)$ to the origin is $(-2, 1, -3)$; $\\vec b = (1, 2, 2)$.",
      solution: "$(-2, 1, -3)\\times(1, 2, 2) = (2 + 6,\\ -3 + 4,\\ -4 - 1) = (8, 1, -5)$, length $\\sqrt{90} = 3\\sqrt{10}$. $d = \\frac{3\\sqrt{10}}{3} = \\sqrt{10} \\approx 3.16$.",
      commonMistakes: [
        { answer: 3.7416574, tolerance: 0.01, feedback: "That is $\\sqrt{14}$, the distance from the origin to $(2, -1, 3)$." },
        { answer: 9.486833, tolerance: 0.01, feedback: "Divide $\\sqrt{90}$ by $\\lvert\\vec b\\rvert = 3$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-4-q10",
      variant: "practice",
      question:
        "Lesson 3.1, Worked example 3 found $\\frac{x - 1}{2} = \\frac{y + 1}{-1} = \\frac{z}{2}$ and $\\frac{x - 3}{-4} = \\frac{y - 1}{2} = \\frac{z + 2}{-4}$ to be parallel. Find the distance between them (to two decimal places).",
      answer: 3.3993463,
      tolerance: 0.01,
      hint: "$\\vec b = (2, -1, 2)$; join $(2, 2, -2)$.",
      solution: "$(2, 2, -2)\\times(2, -1, 2) = (4 - 2,\\ -4 - 4,\\ -2 - 4) = (2, -8, -6)$, length $\\sqrt{104} = 2\\sqrt{26}$. $d = \\frac{2\\sqrt{26}}{3} \\approx 3.40$.",
      commonMistakes: [
        { answer: 10.198039, tolerance: 0.01, feedback: "Divide $\\sqrt{104}$ by 3." },
        { answer: 3.4641016, tolerance: 0.01, feedback: "That is $\\lvert(2, 2, -2)\\rvert = 2\\sqrt3$, the join itself." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-4-q11",
      variant: "practice",
      multiple: true,
      question:
        "Which lines are at distance 5 from the z-axis and parallel to it? Select all that apply.",
      options: [
        { text: "$x = 3,\\ y = 4$", correct: true, feedback: "$\\sqrt{9 + 16} = 5$." },
        { text: "$x = -5,\\ y = 0$", correct: true, feedback: "$\\sqrt{25 + 0} = 5$." },
        { text: "$x = 4,\\ y = -3$", correct: true, feedback: "$\\sqrt{16 + 9} = 5$." },
        { text: "$x = 3,\\ y = 2$", feedback: "$\\sqrt{9 + 4} = \\sqrt{13}$." },
        { text: "$y = 5,\\ z = 0$", feedback: "That line runs along the x-direction: it is not parallel to the z-axis (it is skew to it, at distance 5)." },
      ],
      hint: "A vertical line $x = p, y = q$ is at distance $\\sqrt{p^2 + q^2}$ from the z-axis.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "the-line-of-shortest-distance",
  title: "3.5 · The Line of Shortest Distance",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lesson 3.2 measured the gap between skew lines without ever finding the shortest segment itself. JEE Advanced often asks for more: the two points where the common perpendicular meets the lines (its **feet**) and the equation of the common perpendicular, called the **line of shortest distance**.",
    },
    {
      type: "text",
      content:
        "The idea is the one you used for the foot of a perpendicular from a point to a line (Chapter 2), now applied at both ends at once: take a general point on each line and demand that the segment joining them is perpendicular to **both** lines.",
    },
    { type: "heading", text: "Two dot products, two unknowns" },
    {
      type: "text",
      content:
        "For $\\vec r = \\vec a_1 + \\lambda\\vec b_1$ and $\\vec r = \\vec a_2 + \\mu\\vec b_2$, let $P = \\vec a_1 + \\lambda\\vec b_1$ and $Q = \\vec a_2 + \\mu\\vec b_2$ be general points. The segment $PQ$ is the common perpendicular exactly when",
    },
    {
      type: "math",
      latex: "\\overrightarrow{PQ}\\cdot\\vec b_1 = 0 \\quad\\text{and}\\quad \\overrightarrow{PQ}\\cdot\\vec b_2 = 0, \\qquad \\overrightarrow{PQ} = (\\vec a_2 - \\vec a_1) + \\mu\\vec b_2 - \\lambda\\vec b_1",
    },
    {
      type: "text",
      content:
        "These are two linear equations in $\\lambda$ and $\\mu$. For skew lines they have exactly one solution, so the common perpendicular is **unique**. Substituting gives the feet $P$ and $Q$; the line of shortest distance is the line $PQ$, with direction $\\overrightarrow{PQ}$ (a multiple of $\\vec b_1 \\times \\vec b_2$), and its length $PQ$ must agree with the formula of Lesson 3.2: a built-in check.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The method in four moves",
      content:
        "1. Write general points $P(\\lambda)$ and $Q(\\mu)$ and the vector $\\overrightarrow{PQ}$ in terms of $\\lambda, \\mu$.\n2. Set $\\overrightarrow{PQ}\\cdot\\vec b_1 = 0$ and $\\overrightarrow{PQ}\\cdot\\vec b_2 = 0$ and solve.\n3. Substitute to get the feet $P$ and $Q$.\n4. The line of shortest distance is $\\frac{x - x_P}{l} = \\frac{y - y_P}{m} = \\frac{z - z_P}{n}$ with $(l, m, n) \\parallel \\overrightarrow{PQ}$. Check that $\\overrightarrow{PQ} \\parallel \\vec b_1 \\times \\vec b_2$ and that $PQ$ matches the shortest-distance formula.",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "two-lines",
        a: [0, 3, 0],
        b: [1, -1, 0],
        c: [0, -1, -1],
        d: [0, 1, 1],
        show: ["shortest-distance"],
        caption:
          "The lines of Worked example 1. The feet of the common perpendicular are $(1, 2, 0)$ on $L_1$ and $(0, 1, 1)$ on $L_2$, not the points $(0, 3, 0)$ and $(0, -1, -1)$ used to write the equations. Rotate until the common perpendicular looks like a single point: you are then looking along $\\vec b_1 \\times \\vec b_2$.",
      },
    },
    { type: "heading", text: "Worked examples" },
    {
      type: "worked-example",
      id: "tdg3-5-we1",
      title: "Worked example 1: feet and the line of shortest distance",
      problem:
        "Find the feet of the common perpendicular, the line of shortest distance and the shortest distance for $\\vec r = 3\\hat j + \\lambda(\\hat i - \\hat j)$ and $\\vec r = -\\hat j - \\hat k + \\mu(\\hat j + \\hat k)$.",
      steps: [
        {
          text: "General points $P = (\\lambda,\\ 3 - \\lambda,\\ 0)$ and $Q = (0,\\ -1 + \\mu,\\ -1 + \\mu)$, so",
          latex: "\\overrightarrow{PQ} = (-\\lambda,\\ -4 + \\mu + \\lambda,\\ -1 + \\mu)",
        },
        {
          text: "Perpendicular to $\\vec b_1 = (1, -1, 0)$ and to $\\vec b_2 = (0, 1, 1)$:",
          latex: "-\\lambda - (-4 + \\mu + \\lambda) = 0 \\;\\Rightarrow\\; 2\\lambda + \\mu = 4, \\qquad (-4 + \\mu + \\lambda) + (-1 + \\mu) = 0 \\;\\Rightarrow\\; \\lambda + 2\\mu = 5",
        },
        { text: "Solve: $\\lambda = 1$, $\\mu = 2$. The feet are $P = (1, 2, 0)$ and $Q = (0, 1, 1)$." },
        {
          text: "$\\overrightarrow{PQ} = (-1, -1, 1)$. *Why this step:* check it against $\\vec b_1 \\times \\vec b_2 = (1, -1, 0)\\times(0, 1, 1) = (-1, -1, 1)$; it matches, so no arithmetic slipped.",
        },
        { text: "Line of shortest distance through $P$ with direction $(1, 1, -1)$: $\\frac{x - 1}{1} = \\frac{y - 2}{1} = \\frac{z}{-1}$. Its length is $PQ = \\sqrt3$." },
      ],
      answer: "Feet $(1, 2, 0)$ and $(0, 1, 1)$; line $\\frac{x - 1}{1} = \\frac{y - 2}{1} = \\frac{z}{-1}$; shortest distance $\\sqrt3$.",
    },
    {
      type: "worked-example",
      id: "tdg3-5-we2",
      title: "Worked example 2: a JEE classic where the given points are the feet",
      problem:
        "Find the line of shortest distance between $\\frac{x - 3}{3} = \\frac{y - 8}{-1} = \\frac{z - 3}{1}$ and $\\frac{x + 3}{-3} = \\frac{y + 7}{2} = \\frac{z - 6}{4}$.",
      steps: [
        { text: "$P = (3 + 3\\lambda,\\ 8 - \\lambda,\\ 3 + \\lambda)$, $Q = (-3 - 3\\mu,\\ -7 + 2\\mu,\\ 6 + 4\\mu)$, so $\\overrightarrow{PQ} = (-6 - 3\\mu - 3\\lambda,\\ -15 + 2\\mu + \\lambda,\\ 3 + 4\\mu - \\lambda)$." },
        {
          text: "Dot with $(3, -1, 1)$ and with $(-3, 2, 4)$ and simplify:",
          latex: "-11\\lambda - 7\\mu = 0, \\qquad 7\\lambda + 29\\mu = 0",
        },
        { text: "The only solution is $\\lambda = \\mu = 0$: the feet are the given points $(3, 8, 3)$ and $(-3, -7, 6)$. *Why this step:* this happens because the join $(-6, -15, 3)$ is itself parallel to $\\vec b_1 \\times \\vec b_2 = (-6, -15, 3)$. It is a coincidence of this problem, not a rule." },
        { text: "Line of shortest distance: through $(3, 8, 3)$ with direction $(-6, -15, 3) \\parallel (2, 5, -1)$, i.e. $\\frac{x - 3}{2} = \\frac{y - 8}{5} = \\frac{z - 3}{-1}$. Length $\\sqrt{36 + 225 + 9} = 3\\sqrt{30}$." },
      ],
      answer: "$\\frac{x - 3}{2} = \\frac{y - 8}{5} = \\frac{z - 3}{-1}$, of length $3\\sqrt{30}$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the common perpendicular passes through the given points\"",
      content:
        "The points in the equations are arbitrary; rewrite a line from another point and they move. In Worked example 1 neither given point is a foot. Worked example 2 is the exception that tempts people: there the join of the given points is already along $\\vec b_1 \\times \\vec b_2$. Never assume it: solve for $\\lambda$ and $\\mu$, or at least check $(\\vec a_2 - \\vec a_1) \\parallel \\vec b_1 \\times \\vec b_2$.",
    },
    {
      type: "worked-example",
      id: "tdg3-5-we3",
      title: "Worked example 3: the cube again",
      problem:
        "In the unit cube with corner $O$ at the origin, find the feet of the common perpendicular of the body diagonal $\\vec r = \\lambda(1, 1, 1)$ and the edge $\\vec r = (1, 0, 0) + \\mu(0, 1, 0)$.",
      steps: [
        { text: "$P = (\\lambda, \\lambda, \\lambda)$, $Q = (1, \\mu, 0)$, $\\overrightarrow{PQ} = (1 - \\lambda,\\ \\mu - \\lambda,\\ -\\lambda)$." },
        {
          latex: "\\overrightarrow{PQ}\\cdot(1, 1, 1) = 1 + \\mu - 3\\lambda = 0, \\qquad \\overrightarrow{PQ}\\cdot(0, 1, 0) = \\mu - \\lambda = 0",
        },
        { text: "So $\\lambda = \\mu = \\frac12$: $P = \\left(\\frac12, \\frac12, \\frac12\\right)$, the **centre** of the cube, and $Q = \\left(1, \\frac12, 0\\right)$, the **midpoint** of the edge." },
        { text: "$PQ = \\sqrt{\\frac14 + 0 + \\frac14} = \\frac{1}{\\sqrt2}$, matching Lesson 3.2. *Why this step:* the symmetric answer is a strong sign the algebra is right." },
      ],
      answer: "The common perpendicular joins the centre of the cube to the midpoint of the edge; its length is $\\frac{1}{\\sqrt2}$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Looking ahead",
      content:
        "The plane containing the first line and the common perpendicular has normal $\\vec b_1 \\times (\\vec b_1 \\times \\vec b_2)$. Chapter 4 writes planes from a point and a normal, and then the common perpendicular appears as the intersection of two such planes: a second route to the same line.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "tdg3-5-q1",
      variant: "practice",
      question:
        "For $\\frac{x + 1}{2} = \\frac{y + 1}{1} = \\frac{z - 4}{-2}$ and $\\frac{x - 6}{1} = \\frac{y + 2}{2} = \\frac{z - 6}{2}$, the feet of the common perpendicular are $P(\\lambda)$ on the first line and $Q(\\mu)$ on the second (parameters measured from the given points). Find $\\lambda$.",
      answer: 1,
      hint: "$\\overrightarrow{PQ} = (7 + \\mu - 2\\lambda,\\ -1 + 2\\mu - \\lambda,\\ 2 + 2\\mu + 2\\lambda)$. Dot it with $(2, 1, -2)$ and with $(1, 2, 2)$.",
      solution:
        "Dot with $(2, 1, -2)$: $14 + 2\\mu - 4\\lambda - 1 + 2\\mu - \\lambda - 4 - 4\\mu - 4\\lambda = 9 - 9\\lambda = 0$, so $\\lambda = 1$. (The other equation gives $9 + 9\\mu = 0$, $\\mu = -1$; the directions are perpendicular, which decouples the equations.)",
      commonMistakes: [
        { answer: -1, feedback: "$-1$ is $\\mu$, the parameter on the second line." },
        { answer: 0, feedback: "The given point $(-1, -1, 4)$ is not the foot; solve the equations." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-5-q2",
      variant: "practice",
      question: "For the same two lines, find the shortest distance between them.",
      answer: 6,
      hint: "With $\\lambda = 1$ and $\\mu = -1$ the feet are $P(1, 0, 2)$ and $Q(5, -4, 4)$. Or use $\\vec b_1 \\times \\vec b_2 = (6, -6, 3)$.",
      solution: "$\\overrightarrow{PQ} = (4, -4, 2)$, length $\\sqrt{16 + 16 + 4} = 6$. Check: join $(7, -1, 2)$, $(7, -1, 2)\\cdot(6, -6, 3) = 54$, $\\frac{54}{9} = 6$.",
      commonMistakes: [
        { answer: 54, feedback: "Divide by $\\lvert(6, -6, 3)\\rvert = 9$." },
        { answer: 7.3484692, tolerance: 0.01, feedback: "That is the length of the join $(7, -1, 2)$ of the given points." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-5-q3",
      variant: "practice",
      question: "For the same two lines, the line of shortest distance is",
      options: [
        { text: "$\\frac{x - 1}{2} = \\frac{y}{-2} = \\frac{z - 2}{1}$", correct: true, feedback: "Through $P(1, 0, 2)$ with direction $(4, -4, 2) \\parallel (2, -2, 1)$; it also passes through $Q(5, -4, 4)$." },
        { text: "$\\frac{x + 1}{2} = \\frac{y + 1}{-2} = \\frac{z - 4}{1}$", feedback: "Right direction, but through the given point $(-1, -1, 4)$, which is not a foot." },
        { text: "$\\frac{x - 1}{2} = \\frac{y}{1} = \\frac{z - 2}{-2}$", feedback: "That is the first line's own direction, not the common perpendicular's." },
        { text: "$\\frac{x - 1}{3} = \\frac{y}{3} = \\frac{z - 2}{0}$", feedback: "$(3, 3, 0) = \\vec b_1 + \\vec b_2$; the common perpendicular is along $\\vec b_1 \\times \\vec b_2$." },
      ],
      hint: "It passes through both feet and is parallel to $\\vec b_1 \\times \\vec b_2$.",
    },
    {
      type: "numeric",
      id: "tdg3-5-q4",
      variant: "practice",
      question: "For the same two lines, find the sum of the coordinates of the foot $Q$ on the second line.",
      answer: 5,
      hint: "$Q = (6 + \\mu,\\ -2 + 2\\mu,\\ 6 + 2\\mu)$ with $\\mu = -1$.",
      solution: "$Q = (5, -4, 4)$, so the sum is 5.",
      commonMistakes: [
        { answer: 10, feedback: "That is the given point $(6, -2, 6)$, with $\\mu = 0$." },
        { answer: 3, feedback: "That is the foot $P(1, 0, 2)$ on the first line." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-5-q5",
      variant: "practice",
      multiple: true,
      question:
        "For $\\vec r = 3\\hat j + \\lambda(\\hat i - \\hat j)$ and $\\vec r = -\\hat j - \\hat k + \\mu(\\hat j + \\hat k)$ (Worked example 1), which statements are true? Select all that apply.",
      options: [
        { text: "The common perpendicular has direction $(1, 1, -1)$", correct: true, feedback: "It is parallel to $\\vec b_1 \\times \\vec b_2 = (-1, -1, 1)$." },
        { text: "The midpoint of the shortest segment is $\\left(\\frac12, \\frac32, \\frac12\\right)$", correct: true, feedback: "Average of the feet $(1, 2, 0)$ and $(0, 1, 1)$." },
        { text: "The shortest distance is $\\sqrt3$", correct: true, feedback: "$\\lvert(-1, -1, 1)\\rvert = \\sqrt3$." },
        { text: "The common perpendicular passes through $(0, 3, 0)$", feedback: "$(0, 3, 0)$ is just the point used to write the first line; the foot is $(1, 2, 0)$." },
        { text: "The shortest distance is $\\sqrt{17}$", feedback: "$\\sqrt{17}$ is the distance between the given points $(0, 3, 0)$ and $(0, -1, -1)$." },
      ],
      hint: "Use the feet found in Worked example 1.",
    },
    {
      type: "quiz",
      id: "tdg3-5-q6",
      variant: "concept",
      question: "The two equations that locate the feet of the common perpendicular are",
      options: [
        { text: "$\\overrightarrow{PQ}\\cdot\\vec b_1 = 0$ and $\\overrightarrow{PQ}\\cdot\\vec b_2 = 0$", correct: true, feedback: "The shortest segment is perpendicular to both lines." },
        { text: "$\\overrightarrow{PQ}\\times\\vec b_1 = \\vec 0$ and $\\overrightarrow{PQ}\\times\\vec b_2 = \\vec 0$", feedback: "That would make $PQ$ parallel to both lines, impossible for skew lines." },
        { text: "$\\overrightarrow{PQ}\\cdot(\\vec b_1 \\times \\vec b_2) = 0$", feedback: "That is one equation, and it says $PQ$ is perpendicular to the common normal, the opposite of what we want." },
        { text: "$\\lvert\\overrightarrow{PQ}\\rvert = \\lvert\\vec a_2 - \\vec a_1\\rvert$", feedback: "The shortest segment is usually shorter than the join of the given points." },
      ],
      hint: "What angle does the shortest segment make with each line?",
    },
    {
      type: "numeric",
      id: "tdg3-5-q7",
      variant: "practice",
      question:
        "The x-axis and the line $\\vec r = (\\hat i + 2\\hat j + 3\\hat k) + \\mu(\\hat j + \\hat k)$ are skew. The foot of their common perpendicular on the second line is at parameter $\\mu$. Find $\\mu$.",
      answer: -2.5,
      hint: "$P = (\\lambda, 0, 0)$ and $Q = (1, 2 + \\mu, 3 + \\mu)$. Perpendicular to $\\hat i$ fixes $\\lambda$; perpendicular to $(0, 1, 1)$ fixes $\\mu$.",
      solution:
        "$\\overrightarrow{PQ} = (1 - \\lambda,\\ 2 + \\mu,\\ 3 + \\mu)$. Dot with $\\hat i$: $\\lambda = 1$. Dot with $(0, 1, 1)$: $5 + 2\\mu = 0$, $\\mu = -\\frac52$. The feet are $(1, 0, 0)$ and $\\left(1, -\\frac12, \\frac12\\right)$, at distance $\\frac{1}{\\sqrt2}$.",
      commonMistakes: [
        { answer: 2.5, feedback: "Sign: $5 + 2\\mu = 0$ gives $\\mu = -\\frac52$." },
        { answer: 1, feedback: "$1$ is $\\lambda$, the parameter on the x-axis." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-5-q8",
      variant: "practice",
      question:
        "For the lines of Worked example 1, find the sum of the coordinates of the midpoint of the shortest segment.",
      answer: 2.5,
      hint: "Average the feet $(1, 2, 0)$ and $(0, 1, 1)$.",
      solution: "Midpoint $\\left(\\frac12, \\frac32, \\frac12\\right)$, sum $\\frac52$.",
      commonMistakes: [
        { answer: 5, feedback: "That is the sum of the coordinates of both feet together; halve it." },
        { answer: 0.5, feedback: "That is the midpoint of the given points $(0, 3, 0)$ and $(0, -1, -1)$. The shortest segment runs between the feet $(1, 2, 0)$ and $(0, 1, 1)$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-5-q9",
      variant: "concept",
      multiple: true,
      question: "Which statements about the common perpendicular of two skew lines are true? Select all that apply.",
      options: [
        { text: "There is exactly one", correct: true, feedback: "The two dot-product equations have a unique solution for skew lines." },
        { text: "It is parallel to $\\vec b_1 \\times \\vec b_2$", correct: true, feedback: "It is perpendicular to both directions." },
        { text: "Its length equals $\\frac{\\lvert(\\vec a_2 - \\vec a_1)\\cdot(\\vec b_1 \\times \\vec b_2)\\rvert}{\\lvert\\vec b_1 \\times \\vec b_2\\rvert}$", correct: true, feedback: "That is how Lesson 3.2 defined the shortest distance." },
        { text: "One of its feet is always one of the given points $A_1$, $A_2$", feedback: "Only by coincidence, as in Worked example 2." },
        { text: "It always passes through the origin", feedback: "The origin has no special role; the feet depend only on the lines." },
      ],
      hint: "Separate what follows from the geometry from what depends on how the equations were written.",
    },
    {
      type: "quiz",
      id: "tdg3-5-q10",
      variant: "practice",
      question:
        "JEE Advanced. In a cube, consider a body diagonal and an edge that does not meet it. The common perpendicular joins",
      options: [
        { text: "the centre of the cube to the midpoint of the edge", correct: true, feedback: "Worked example 3: $\\lambda = \\mu = \\frac12$ by symmetry." },
        { text: "a vertex of the cube to the midpoint of the edge", feedback: "The foot on the diagonal is at its midpoint, not at an end." },
        { text: "the centre of the cube to an end of the edge", feedback: "The foot on the edge is its midpoint, $\\mu = \\frac12$." },
        { text: "the midpoint of a face to the midpoint of the edge", feedback: "The foot on the body diagonal is the centre of the cube, not a face centre." },
      ],
      hint: "Solve $1 + \\mu - 3\\lambda = 0$ and $\\mu - \\lambda = 0$.",
    },
    {
      type: "numeric",
      id: "tdg3-5-q11",
      variant: "practice",
      question:
        "JEE Advanced. For $\\vec r = (-2\\hat j + \\hat k) + \\lambda(\\hat i + \\hat j)$ and $\\vec r = (\\hat j + 4\\hat k) + \\mu(\\hat j - \\hat k)$, find the shortest distance by first finding the feet of the common perpendicular (to two decimal places).",
      answer: 3.4641016,
      tolerance: 0.01,
      hint: "$\\overrightarrow{PQ} = (-\\lambda,\\ 3 + \\mu - \\lambda,\\ 3 - \\mu)$.",
      solution:
        "Dot with $(1, 1, 0)$: $3 + \\mu - 2\\lambda = 0$. Dot with $(0, 1, -1)$: $2\\mu - \\lambda = 0$. So $\\lambda = 2\\mu$ and $3 + \\mu - 4\\mu = 0$: $\\mu = 1$, $\\lambda = 2$. Feet $(2, 0, 1)$ and $(0, 2, 3)$, $\\overrightarrow{PQ} = (-2, 2, 2)$, length $2\\sqrt3 \\approx 3.46$.",
      commonMistakes: [
        { answer: 4.2426407, tolerance: 0.01, feedback: "That is $3\\sqrt2$, the distance between the given points $(0, -2, 1)$ and $(0, 1, 4)$. Neither is a foot: solve for $\\lambda$ and $\\mu$." },
        { answer: 1.7320508, tolerance: 0.01, feedback: "That is $\\lvert\\vec b_1 \\times \\vec b_2\\rvert = \\sqrt3$; the distance is $\\frac{6}{\\sqrt3} = 2\\sqrt3$." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-3-mastery",
  title: "3.6 · Chapter 3 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "No new theory here, and no formula sheet. Every question below can be rebuilt from one picture: two lines, the join of a point on each, and the common normal $\\vec b_1 \\times \\vec b_2$. If you are stuck, decide first whether the directions are parallel; then ask what the join projects to on the normal.",
    },
    { type: "heading", text: "Reconstruct it" },
    {
      type: "callout",
      variant: "tip",
      title: "Rebuild the chapter from the common normal",
      content:
        "Without notes:\n\n1. Why does equating the general points of two lines give one equation too many, and what does that say about how common skew lines are?\n2. Why does every join of the two lines have the same projection on $\\vec b_1 \\times \\vec b_2$? Turn that into the shortest-distance formula.\n3. Read the numerator as a volume and the denominator as an area. Why is the quotient the gap?\n4. Why is \"determinant zero\" the condition for coplanar lines, and why is it not enough for intersecting lines?\n5. What replaces the formula when $\\vec b_1 \\times \\vec b_2 = \\vec 0$, and why is that a parallelogram height?\n6. Which two equations find the feet of the common perpendicular?",
    },
    {
      type: "interactive",
      config: {
        component: "tdg-space-viewer",
        mode: "two-lines",
        a: [0, 0, 0],
        b: [1, 1, 1],
        c: [1, 0, 0],
        d: [0, 1, 0],
        show: ["shortest-distance"],
        caption:
          "A body diagonal of the unit cube and an edge that misses it. Before rotating, predict the verdict (parallel, intersecting or skew), the shortest distance and where the feet of the common perpendicular are. Then check your predictions against the readout.",
      },
    },
    { type: "heading", text: "Mastery questions" },
    {
      type: "quiz",
      id: "tdg3-6-q1",
      variant: "mastery",
      question:
        "The lines $\\frac{x - 1}{2} = \\frac{y + 1}{3} = \\frac{z}{1}$ and $\\frac{x - 4}{1} = \\frac{y}{-2} = \\frac{z - 4}{3}$ are",
      options: [
        { text: "intersecting, at $(3, 2, 1)$", correct: true, feedback: "$\\lambda = 1$ on the first and $\\mu = -1$ on the second both give $(3, 2, 1)$." },
        { text: "intersecting, at $(1, -1, 0)$", feedback: "$(1, -1, 0)$ is on the first line only: $\\frac{1 - 4}{1} = -3$ but $\\frac{-1}{-2} = \\frac12$." },
        { text: "skew", feedback: "Solve x and y: $1 + 2\\lambda = 4 + \\mu$ and $-1 + 3\\lambda = -2\\mu$ give $\\lambda = 1$, $\\mu = -1$, and z agrees." },
        { text: "parallel", feedback: "$(2, 3, 1)$ and $(1, -2, 3)$ are not proportional." },
      ],
      hint: "Lesson 3.1: directions first, then solve two coordinates and test the third.",
    },
    {
      type: "numeric",
      id: "tdg3-6-q2",
      variant: "mastery",
      question:
        "Find the shortest distance between $\\vec r = (\\hat i + 2\\hat j) + \\lambda(\\hat i - 2\\hat j + 2\\hat k)$ and $\\vec r = (3\\hat i + 4\\hat j - \\hat k) + \\mu(2\\hat i + 2\\hat j + \\hat k)$. (A fraction is fine.)",
      answer: 1.3333333,
      tolerance: 0.01,
      hint: "Lesson 3.2: $(1, -2, 2)\\times(2, 2, 1) = (-6, 3, 6)$, of length 9.",
      solution: "Join $(2, 2, -1)$; $(2, 2, -1)\\cdot(-6, 3, 6) = -12 + 6 - 6 = -12$. $d = \\frac{12}{9} = \\frac43$.",
      commonMistakes: [
        { answer: 12, feedback: "Divide by $\\lvert\\vec b_1 \\times \\vec b_2\\rvert = 9$." },
        { answer: 3, feedback: "That is $\\lvert(2, 2, -1)\\rvert$, the distance between the given points." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-6-q3",
      variant: "mastery",
      question:
        "Find $k$ so that $\\frac{x - 1}{1} = \\frac{y}{1} = \\frac{z + 1}{2}$ and $\\frac{x - 2}{2} = \\frac{y - k}{1} = \\frac{z - 4}{1}$ intersect.",
      answer: 2,
      hint: "Lesson 3.3: join $(1, k, 5)$; rows $(1, 1, 2)$ and $(2, 1, 1)$.",
      solution:
        "$1(1 - 2) - k(1 - 4) + 5(1 - 2) = -1 + 3k - 5 = 3k - 6 = 0$, so $k = 2$. The directions are not proportional, so the lines meet (at $(4, 3, 5)$).",
      commonMistakes: [
        { answer: -2, feedback: "The middle term is $-k(1 - 4) = +3k$." },
        { answer: 6, feedback: "Solve $3k - 6 = 0$: $k = 2$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-6-q4",
      variant: "mastery",
      question:
        "Find the distance between $\\vec r = (\\hat i + \\hat j + \\hat k) + \\lambda(2\\hat i - \\hat j + 2\\hat k)$ and $\\vec r = (4\\hat i + \\hat j + \\hat k) + \\mu(-4\\hat i + 2\\hat j - 4\\hat k)$ (to two decimal places).",
      answer: 2.236068,
      tolerance: 0.01,
      hint: "Lesson 3.4: the lines are parallel. Use $\\vec b = (2, -1, 2)$ and the join $(3, 0, 0)$.",
      solution: "$(3, 0, 0)\\times(2, -1, 2) = (0, -6, -3)$, length $3\\sqrt5$. $d = \\frac{3\\sqrt5}{3} = \\sqrt5 \\approx 2.24$.",
      commonMistakes: [
        { answer: 3, feedback: "3 is the length of the join; only its part perpendicular to the lines counts." },
        { answer: 6.7082039, tolerance: 0.01, feedback: "Divide $3\\sqrt5$ by $\\lvert\\vec b\\rvert = 3$." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-6-q5",
      variant: "mastery",
      question:
        "JEE Advanced. A cube has edge 6. Find the shortest distance between a body diagonal and a face diagonal that does not meet it (to two decimal places).",
      answer: 2.4494897,
      tolerance: 0.01,
      hint: "Lesson 3.2: take $\\vec r = \\lambda(1, 1, 1)$ and the face diagonal $\\vec r = (a, 0, 0) + \\mu(-1, 1, 0)$ of the floor.",
      solution:
        "$(1, 1, 1)\\times(-1, 1, 0) = (-1, -1, 2)$, of length $\\sqrt6$. Join $(a, 0, 0)$ gives $-a$. $d = \\frac{a}{\\sqrt6} = \\frac{6}{\\sqrt6} = \\sqrt6 \\approx 2.45$.",
      commonMistakes: [
        { answer: 4.2426407, tolerance: 0.01, feedback: "$\\frac{a}{\\sqrt2}$ is the distance from the body diagonal to an **edge**." },
        { answer: 6, feedback: "Divide by $\\sqrt6$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-6-q6",
      variant: "mastery",
      multiple: true,
      question: "Which statements are true? Select all that apply.",
      options: [
        { text: "If $\\vec b_1 \\times \\vec b_2 = \\vec 0$, the lines are parallel or coincident", correct: true, feedback: "Zero cross product means proportional directions." },
        { text: "Two skew lines have exactly one common perpendicular", correct: true, feedback: "Lesson 3.5: the two dot-product equations have a unique solution." },
        { text: "The shortest distance is the least distance between a point of one line and a point of the other", correct: true, feedback: "That is what the common perpendicular achieves." },
        { text: "If $(\\vec a_2 - \\vec a_1)\\cdot(\\vec b_1 \\times \\vec b_2) = 0$, the lines intersect", feedback: "They are coplanar; parallel lines satisfy this too." },
        { text: "Two lines both perpendicular to a third line are parallel", feedback: "The x- and y-axes are both perpendicular to the z-axis." },
      ],
      hint: "Lessons 3.1, 3.3 and 3.5.",
    },
    {
      type: "numeric",
      id: "tdg3-6-q7",
      variant: "mastery",
      question: "How many of the 12 edges of a cube are skew to a given body diagonal?",
      answer: 6,
      hint: "Lesson 3.1: which edges meet the diagonal? Is any edge parallel to it?",
      solution:
        "The diagonal joins two opposite vertices; the 3 edges at each of them meet it, which is 6 edges. No edge is parallel to a body diagonal. The other $12 - 6 = 6$ edges are skew to it.",
      commonMistakes: [
        { answer: 4, feedback: "4 is the number of edges skew to an **edge**." },
        { answer: 12, feedback: "The 6 edges at the diagonal's two end vertices meet it." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-6-q8",
      variant: "mastery",
      question:
        "For $\\vec r = (\\hat j + 2\\hat k) + \\lambda(\\hat i - \\hat k)$ and $\\vec r = (-2\\hat j + 2\\hat k) + \\mu(\\hat i + \\hat j)$, the feet of the common perpendicular are at parameters $\\lambda$ and $\\mu$. Find $\\lambda + \\mu$.",
      answer: 3,
      hint: "Lesson 3.5: $\\overrightarrow{PQ} = (\\mu - \\lambda,\\ -3 + \\mu,\\ \\lambda)$; dot with $(1, 0, -1)$ and with $(1, 1, 0)$.",
      solution:
        "Dot with $(1, 0, -1)$: $\\mu - 2\\lambda = 0$. Dot with $(1, 1, 0)$: $2\\mu - \\lambda - 3 = 0$. So $\\mu = 2\\lambda$ and $3\\lambda = 3$: $\\lambda = 1$, $\\mu = 2$, sum 3. The feet are $(1, 1, 1)$ and $(2, 0, 2)$.",
      commonMistakes: [
        { answer: 0, feedback: "The given points are not the feet here; solve the two equations." },
        { answer: 1, feedback: "That is $\\lambda$ alone; $\\mu = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-6-q9",
      variant: "mastery",
      question: "For the same two lines, the line of shortest distance is",
      options: [
        { text: "$\\frac{x - 1}{1} = \\frac{y - 1}{-1} = \\frac{z - 1}{1}$", correct: true, feedback: "Through the foot $(1, 1, 1)$ with direction $(1, -1, 1) = \\vec b_1 \\times \\vec b_2$; it reaches $(2, 0, 2)$ at parameter 1." },
        { text: "$\\frac{x}{1} = \\frac{y - 1}{-1} = \\frac{z - 2}{1}$", feedback: "Right direction, but through the given point $(0, 1, 2)$, which is not a foot." },
        { text: "$\\frac{x - 1}{2} = \\frac{y - 1}{1} = \\frac{z - 1}{-1}$", feedback: "$(2, 1, -1) = \\vec b_1 + \\vec b_2$, not the common normal." },
        { text: "$\\frac{x - 1}{1} = \\frac{y - 1}{1} = \\frac{z - 1}{1}$", feedback: "Check the cross product: $(1, 0, -1)\\times(1, 1, 0) = (1, -1, 1)$." },
      ],
      hint: "Through a foot, along $\\vec b_1 \\times \\vec b_2$.",
    },
    {
      type: "numeric",
      id: "tdg3-6-q10",
      variant: "mastery",
      question:
        "JEE Main. The lines $\\frac{x - 1}{2} = \\frac{y + 1}{3} = \\frac{z - 1}{4}$ and $\\frac{x - 3}{1} = \\frac{y - k}{2} = \\frac{z}{1}$ intersect (Lesson 3.3 found $k = \\frac92$). Find the sum of the coordinates of their point of intersection.",
      answer: -12.5,
      hint: "Equate the x and z coordinates of the general points: $1 + 2\\lambda = 3 + \\mu$ and $1 + 4\\lambda = \\mu$.",
      solution:
        "Subtracting, $1 + 2\\lambda = 4 + 4\\lambda$, so $\\lambda = -\\frac32$ and $\\mu = -5$. The point is $(1 - 3,\\ -1 - \\frac92,\\ 1 - 6) = \\left(-2, -\\frac{11}{2}, -5\\right)$, with sum $-12.5$.",
      commonMistakes: [
        { answer: -6.5, feedback: "That is $\\lambda + \\mu$. Substitute to get the point." },
        { answer: 12.5, feedback: "All three coordinates are negative: $(-2, -5.5, -5)$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-6-q11",
      variant: "mastery",
      multiple: true,
      question:
        "JEE Advanced. For which values of $k$ do the lines $\\frac{x}{1} = \\frac{y}{1} = \\frac{z}{k}$ and $\\frac{x - 1}{k} = \\frac{y - 1}{1} = \\frac{z}{1}$ **intersect**? Select all that apply.",
      options: [
        { text: "$k = 0$", correct: true, feedback: "The determinant is $k(k - 1)$; at $k = 0$ the directions $(1, 1, 0)$ and $(0, 1, 1)$ differ, and the lines meet at $(1, 1, 0)$." },
        { text: "$k = 1$", feedback: "The determinant vanishes, but both directions become $(1, 1, 1)$: the lines are parallel, not intersecting." },
        { text: "$k = -1$", feedback: "$(-1)(-2) = 2 \\ne 0$: skew." },
        { text: "$k = 2$", feedback: "$2 \\cdot 1 = 2 \\ne 0$: skew." },
      ],
      hint: "Lesson 3.3: join $(1, 1, 0)$; factor the determinant, then check each root for parallel directions.",
    },
    {
      type: "numeric",
      id: "tdg3-6-q12",
      variant: "mastery",
      question: "Find the shortest distance between the x-axis and the line $y = 2,\\ z = 3$ (to two decimal places).",
      answer: 3.6055513,
      tolerance: 0.01,
      hint: "Lesson 3.4: what is the direction of the line $y = 2, z = 3$?",
      solution:
        "The line $y = 2, z = 3$ runs along $\\hat i$: it is **parallel** to the x-axis. The distance is that of $(0, 2, 3)$ from the x-axis, $\\sqrt{4 + 9} = \\sqrt{13} \\approx 3.61$.",
      commonMistakes: [
        { answer: 3, feedback: "Both coordinates $y = 2$ and $z = 3$ contribute: $\\sqrt{4 + 9}$." },
        { answer: 5, feedback: "Combine the offsets with Pythagoras, not by adding them." },
      ],
    },
    {
      type: "numeric",
      id: "tdg3-6-q13",
      variant: "mastery",
      question:
        "The lines $\\frac{x - 1}{2} = \\frac{y - 2}{3} = \\frac{z - 3}{4}$ and $\\frac{x - 2}{3} = \\frac{y - 4}{4} = \\frac{z - k}{5}$ intersect. Find $k$. (With $k = 5$ they are skew: Lesson 3.1.)",
      answer: 6,
      hint: "Lesson 3.1: the x and y equations do not involve $k$; they give $\\lambda = 2$, $\\mu = 1$.",
      solution: "At $\\lambda = 2$ the first line has $z = 11$; at $\\mu = 1$ the second has $z = k + 5$. So $k = 6$.",
      commonMistakes: [
        { answer: 11, feedback: "11 is the common z-coordinate; $k + 5 = 11$." },
        { answer: 5, feedback: "With $k = 5$ the lines are skew, at distance $\\frac{1}{\\sqrt6}$." },
      ],
    },
    {
      type: "quiz",
      id: "tdg3-6-q14",
      variant: "mastery",
      question:
        "JEE Main. The shortest distance between $\\frac{x}{2} = \\frac{y}{2} = \\frac{z}{1}$ and $\\frac{x + 2}{-1} = \\frac{y - 4}{8} = \\frac{z - 5}{4}$ lies in the interval",
      options: [
        { text: "$(2, 3]$", correct: true, feedback: "$(2, 2, 1)\\times(-1, 8, 4) = (0, -9, 18)$; join $(-2, 4, 5)$ gives $54$; $d = \\frac{54}{9\\sqrt5} = \\frac{6}{\\sqrt5} \\approx 2.68$." },
        { text: "$(1, 2]$", feedback: "Recompute the cross product's length: $\\sqrt{81 + 324} = 9\\sqrt5$." },
        { text: "$(3, 4]$", feedback: "$\\frac{6}{\\sqrt5} \\approx 2.68$, below 3." },
        { text: "$[0, 1]$", feedback: "The lines are skew and not close: the triple product is 54." },
      ],
      hint: "Lesson 3.2: compute $\\vec b_1 \\times \\vec b_2$ and the triple product.",
    },
    {
      type: "quiz",
      id: "tdg3-6-q15",
      variant: "mastery",
      question: "Two lines are given by $\\vec r = \\vec a + \\lambda\\vec b$ and $\\vec r = \\vec a + \\mu\\vec c$, with $\\vec b \\times \\vec c \\ne \\vec 0$. The shortest distance between them is",
      options: [
        { text: "0, because both pass through the point $\\vec a$", correct: true, feedback: "The join $\\vec a - \\vec a = \\vec 0$ makes the triple product zero; they intersect at $\\vec a$." },
        { text: "$\\frac{\\lvert\\vec a\\cdot(\\vec b \\times \\vec c)\\rvert}{\\lvert\\vec b \\times \\vec c\\rvert}$", feedback: "The join between the given points is $\\vec a - \\vec a = \\vec 0$, not $\\vec a$." },
        { text: "$\\lvert\\vec a\\rvert$", feedback: "That is the distance of the common point from the origin." },
        { text: "undefined, because the lines are parallel", feedback: "$\\vec b \\times \\vec c \\ne \\vec 0$, so they are not parallel." },
      ],
      hint: "What is the join of the two given points?",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Where next",
      content:
        "The common normal $\\vec b_1 \\times \\vec b_2$ was the hero of this chapter. Chapter 4 makes the normal the defining feature of a **plane**: a plane is a point and a normal, $(\\vec r - \\vec a)\\cdot\\vec n = 0$. The coplanarity determinant you used here will reappear as the equation of the plane through three points, and the projection-on-the-normal argument will give the distance of a point from a plane.",
    },
  ]),
};

export const tdgChapter3Lessons: LessonSeed[] = [lesson01, lesson02, lesson03, lesson04, lesson05, lessonMastery];
