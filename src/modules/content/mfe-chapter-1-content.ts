import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics I Chapter 1 — Motion in a Straight Line.
 * Kinematics in one dimension as three linked graphs: position, velocity,
 * acceleration. Slopes go down the chain, areas come back up. The three
 * equations of uniformly accelerated motion come from one v-t trapezium,
 * then free fall, then the calculus of non-uniform acceleration.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "position-displacement-and-distance",
  title: "1.1 · Position, Displacement and Distance",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/mfe-1-motion-in-a-straight-line.mp4",
      poster: "/videos/mfe-1-motion-in-a-straight-line.jpg",
      title: "Chapter 1 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "You drive 5 km east to a friend's house, realise you forgot the gift, and drive 3 km back west to a shop. The odometer says you have driven 8 km. Yet you are only 2 km from home, to the east. Both numbers are correct; they answer different questions. Physics gives them different names, **distance** and **displacement**, and mixing them up is the first trap in kinematics.",
    },
    { type: "heading", text: "Frame of reference and displacement" },
    {
      type: "text",
      content:
        "To describe motion at all we need a **frame of reference**: an origin, a direction called positive, and a clock. On a straight line, the position of a particle is then a single signed number $x$, and motion is the function $x(t)$. We treat the car as a **point object**, which is fair whenever its size is small compared with the distances it moves.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Displacement and distance",
      content:
        "**Displacement** is the change in position, $\\Delta x = x_{\\text{final}} - x_{\\text{initial}}$. It has a sign (a direction) and depends only on the end points.\n**Distance** is the total length of path actually travelled. It is never negative and never decreases.\nAlways $\\text{distance} \\ge |\\text{displacement}|$, with equality only if the particle never turns back.",
    },
    { type: "heading", text: "Average speed and average velocity" },
    {
      type: "text",
      content:
        "Take east as positive and home as $x = 0$. The trip goes $0 \\to 5 \\to 2$ km. Displacement $= 2 - 0 = +2$ km. Distance $= 5 + 3 = 8$ km. Dividing each by the time gives two different \"averages\":",
    },
    {
      type: "math",
      latex:
        "\\text{average velocity} = \\frac{\\Delta x}{\\Delta t} = \\frac{\\text{displacement}}{\\text{time}}, \\qquad \\text{average speed} = \\frac{\\text{distance}}{\\text{time}}",
    },
    {
      type: "text",
      content:
        "If the whole trip took half an hour, the average speed is $\\frac{8}{0.5} = 16$ km/h but the average velocity is $\\frac{+2}{0.5} = +4$ km/h (4 km/h east). Now watch a particle that turns round. It starts at $x = 0$ with velocity $u = 10$ m/s and a steady acceleration $a = -2$ m/s² (pointing backwards).",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "line",
        sliders: {
          x0: { min: 0, max: 0, step: 1, initial: 0 },
          u: { min: -20, max: 20, step: 1, initial: 10 },
          a: { min: -5, max: 5, step: 0.5, initial: -2 },
        },
        duration: 10,
        caption:
          "Scrub the time from 0 to 10 s. Watch the particle slow down, stop, and come back, and compare the distance and displacement readouts as it does.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the particle stops at $t = 5$ s at $x = 25$ m and then returns. Up to 5 s, distance and displacement are equal. After that, displacement falls while distance keeps climbing. At $t = 10$ s the particle is back at $x = 0$: displacement 0, distance 50 m, so its average velocity over the 10 s is zero while its average speed is 5 m/s.",
    },
    { type: "heading", text: "Average speed over two legs" },
    {
      type: "worked-example",
      id: "mfe1-1-we1",
      title: "Worked example 1: equal distances",
      problem:
        "A cyclist rides from A to B at 40 km/h and returns along the same road at 60 km/h. Find the average speed for the round trip.",
      steps: [
        { text: "Let AB $= d$. Time out $= \\dfrac{d}{40}$, time back $= \\dfrac{d}{60}$. *Why this step:* the speeds apply to equal **distances**, so they are held for unequal times. Work from the definition, not from intuition." },
        { text: "Total distance $2d$, total time $\\dfrac{d}{40} + \\dfrac{d}{60} = \\dfrac{3d + 2d}{120} = \\dfrac{d}{24}$." },
        { text: "Average speed $= \\dfrac{2d}{d/24} = 48$ km/h." },
        { text: "In general, for equal distances at $v_1$ and $v_2$ the average speed is the **harmonic mean**:", latex: "\\bar v = \\frac{2d}{d/v_1 + d/v_2} = \\frac{2v_1v_2}{v_1 + v_2}" },
        { text: "Average velocity for the round trip is zero: it ends where it began." },
      ],
      answer: "Average speed $= 48$ km/h (the harmonic mean); average velocity $= 0$.",
    },
    {
      type: "worked-example",
      id: "mfe1-1-we2",
      title: "Worked example 2: equal times",
      problem:
        "The same cyclist rides for half an hour at 40 km/h, then half an hour at 60 km/h. Find the average speed.",
      steps: [
        { text: "Distances: $40 \\times 0.5 = 20$ km and $60 \\times 0.5 = 30$ km." },
        { text: "Average speed $= \\dfrac{50}{1} = 50$ km/h, the ordinary **arithmetic mean** $\\frac{v_1 + v_2}{2}$. *Why this step:* with equal times each speed gets equal weight; with equal distances the slower speed is held for longer and drags the average down, which is why 48 < 50." },
      ],
      answer: "Average speed $= 50$ km/h (the arithmetic mean).",
    },
    {
      type: "worked-example",
      id: "mfe1-1-we3",
      title: "Worked example 3: a track",
      problem:
        "An athlete runs one full lap of a 400 m track in 50 s. Find her average speed and average velocity.",
      steps: [
        { text: "Distance $= 400$ m, so average speed $= 8$ m/s." },
        { text: "She ends where she started, so displacement $= 0$ and average velocity $= 0$." },
      ],
      answer: "Average speed $= 8$ m/s; average velocity $= 0$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"average speed is the magnitude of average velocity\"",
      content:
        "Only if the particle never reverses. For the lap, average speed is 8 m/s and $|$average velocity$|$ is 0. The two quantities divide different numerators (distance versus displacement) by the same time.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"average speed is the average of the speeds\"",
      content:
        "Average speed is total distance over total time, always. $\\frac{v_1 + v_2}{2}$ is right only when equal **times** are spent at each speed. For equal distances it is the harmonic mean, which is smaller.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe1-1-q1",
      variant: "practice",
      question: "A car covers the first half of a distance at 20 m/s and the second half at 30 m/s. What is its average speed for the whole trip? Give your answer in m/s.",
      answer: 24,
      unit: "m/s",
      hint: "Call the whole distance $2d$ and add up the times for the two halves.",
      solution: "Time for the two halves: $\\frac{d}{20} + \\frac{d}{30} = \\frac{d}{12}$. Average speed $= \\frac{2d}{d/12} = 24$ m/s.\n\nThis is the harmonic mean $\\frac{2(20)(30)}{20 + 30} = \\frac{1200}{50} = 24$ m/s.",
      commonMistakes: [
        { answer: 25, feedback: "That is the arithmetic mean, correct only for equal **times**. Here the distances are equal." },
        { answer: 50, feedback: "Speeds do not add. That is the sum, not an average." },
        { answer: 26, feedback: "The average must be closer to the slower speed, since more time is spent at it." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-1-q2",
      variant: "practice",
      question: "A car moves at 20 m/s for the first half of the **time** and 30 m/s for the second half. Its average speed is",
      options: [
        { text: "$25$ m/s", correct: true, feedback: "In time $2t$ it covers $20t + 30t = 50t$, so the average is $25$ m/s." },
        { text: "$24$ m/s", feedback: "That is the equal-distance answer. With equal times, each speed carries equal weight." },
        { text: "$50$ m/s", feedback: "That is the sum of the speeds." },
      ],
      hint: "Equal **times**, not equal distances: find the total distance, then divide by the total time.",
    },
    {
      type: "quiz",
      id: "mfe1-1-q3",
      variant: "concept",
      question: "Which statement is always true for a particle moving along a line?",
      options: [
        { text: "Average speed $\\ge$ magnitude of average velocity.", correct: true, feedback: "Distance is at least the size of the displacement, and both are divided by the same time." },
        { text: "Average speed $=$ magnitude of average velocity.", feedback: "Not if the particle turns back: the 400 m lap gives 8 m/s and 0." },
        { text: "Average speed $\\le$ magnitude of average velocity.", feedback: "Distance can never be less than the size of the displacement." },
      ],
      hint: "Compare the path length with the straight-line displacement between the same two points. Which one can never be the larger?",
    },
    {
      type: "numeric",
      id: "mfe1-1-q4",
      variant: "practice",
      question: "A particle starts at $x = 0$ with $u = 10$ m/s and $a = -2$ m/s². It turns round at $t = 5$ s ($x = 25$ m) and is at $x = 16$ m at $t = 8$ s. What distance has it covered in 8 s? Give your answer in metres.",
      answer: 34,
      unit: "m",
      hint: "Split the motion at the turnaround.",
      solution: "Out to the turnaround: $25$ m. Back from $x = 25$ m to $x = 16$ m: $25 - 16 = 9$ m.\n\nDistance $= 25 + 9 = 34$ m (while the displacement is only 16 m).",
      commonMistakes: [
        { answer: 16, feedback: "That is the displacement. The particle went out to 25 m and came back 9 m." },
        { answer: 41, feedback: "You added 25 and 16. The return leg is $25 - 16 = 9$ m, not 16 m." },
        { answer: 25, feedback: "That is only the outward leg." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-1-q5",
      variant: "practice",
      question: "You walk 30 m north in 20 s and then 10 m south in 20 s. What is your average velocity?",
      options: [
        { text: "$1$ m/s north", feedback: "That divides the displacement by 20 s. The total time is 40 s." },
        { text: "$1$ m/s, from 40 m in 40 s", feedback: "That is the average **speed**, $40/40$. Velocity uses displacement." },
        { text: "$0.5$ m/s north", correct: true, feedback: "Displacement $= 30 - 10 = 20$ m north, in 40 s: $0.5$ m/s north." },
        { text: "$0.5$ m/s south", feedback: "You end 20 m **north** of the start, so the average velocity points north." },
      ],
      hint: "Average velocity uses the net displacement (north minus south) divided by the total time, not the total distance.",
    },
    {
      type: "quiz",
      id: "mfe1-1-q6",
      variant: "practice",
      multiple: true,
      question: "Over a 10 s interval, a particle moving along a straight line has zero average velocity. Which of the following **must** be true? Select all that apply.",
      options: [
        { text: "It ends the interval at the same position where it started.", correct: true, feedback: "Zero average velocity means zero displacement: final position equals initial position." },
        { text: "The distance it covers in the interval is zero.", feedback: "Not necessarily. Going 10 m out and 10 m back gives zero displacement but 20 m of distance." },
        { text: "Its average speed over the interval is zero.", feedback: "Average speed uses distance, which can be large even when the displacement is zero: 10 m out and 10 m back in 10 s is an average speed of 2 m/s." },
        { text: "If it moved at all, it reversed direction at least once during the interval.", correct: true, feedback: "On a line, a particle that leaves its starting point can only get back by turning round." },
      ],
      hint: "Zero average velocity means zero net displacement. For each statement, ask whether a particle could go out and come back and still violate it.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "velocity-and-position-time-graphs",
  title: "1.2 · Velocity and Position–Time Graphs",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A speedometer does not show your average speed for the whole journey. It shows how fast you are going **right now**. But \"right now\" is a single instant, and in a single instant you travel zero distance in zero time. What does $\\frac{0}{0}$ mean? The answer is the most important idea in kinematics, and it is easiest to see on a graph of $x$ against $t$.",
    },
    { type: "heading", text: "From chord slope to tangent slope" },
    {
      type: "text",
      content:
        "On an $x$-$t$ graph, the average velocity between $t_1$ and $t_2$ is $\\frac{x_2 - x_1}{t_2 - t_1}$: rise over run, the **slope of the chord** (secant) joining the two points. Now slide $t_2$ towards $t_1$. The chord swings round and settles on the **tangent** at $t_1$. The limit of those average velocities is the instantaneous velocity.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Instantaneous velocity",
      content:
        "$v = \\displaystyle\\lim_{\\Delta t \\to 0} \\frac{\\Delta x}{\\Delta t} = \\frac{dx}{dt}$, the **slope of the tangent** to the $x$-$t$ graph at that instant. Its sign gives the direction of motion; its size is the instantaneous speed.",
    },
    {
      type: "text",
      content:
        "A ball rolls from rest down a ramp with $x = 5t^2$ (metres, seconds). In the explorer below, $x$ on the horizontal axis stands for the time $t$ and the curve is the position. The first point is fixed at $t_1 = 1$ s; drag the second point towards it.",
    },
    {
      type: "interactive",
      config: {
        component: "secant-explorer",
        expr: "5*x^2",
        exprLatex: "5x^2",
        x1: 1,
        min: 1.05,
        max: 3,
        step: 0.05,
        initial: 2,
        window: { xmin: 0, xmax: 3.5, ymin: 0, ymax: 50 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the chord slope falls from 15 m/s (between 1 s and 2 s) towards 10 m/s as the second point closes in. It never quite reaches 10 at any allowed position, but it homes in on it without doubt.",
    },
    {
      type: "table",
      headers: ["$t_2$ (s)", "$x_2 = 5t_2^2$ (m)", "Average velocity $\\frac{x_2 - 5}{t_2 - 1}$ (m/s)"],
      rows: [
        ["2", "20", "15"],
        ["1.5", "11.25", "12.5"],
        ["1.1", "6.05", "10.5"],
        ["1.01", "5.1005", "10.05"],
      ],
    },
    {
      type: "worked-example",
      id: "mfe1-2-we1",
      title: "Worked example 1: the limit by algebra",
      problem:
        "Find the velocity at $t = 1$ s for $x = 5t^2$.",
      steps: [
        { text: "Over a short interval $h$: $\\dfrac{x(1 + h) - x(1)}{h} = \\dfrac{5(1 + 2h + h^2) - 5}{h} = \\dfrac{10h + 5h^2}{h}$." },
        { text: "Cancel $h$ (allowed, since $h \\ne 0$): $10 + 5h$. *Why this step:* the troublesome $\\frac{0}{0}$ disappears once the common factor is cancelled; only then do we let $h$ shrink." },
        { text: "As $h \\to 0$, this tends to $10$. So $v(1) = 10$ m/s, matching the table." },
        { text: "Repeating at a general time $t$ gives $v = 10t$, which is the derivative $\\frac{d}{dt}(5t^2)$." },
      ],
      answer: "$v(1) = 10$ m/s (and $v = 10t$ in general).",
    },
    {
      type: "worked-example",
      id: "mfe1-2-we2",
      title: "Worked example 2: from a straight graph",
      problem:
        "An $x$-$t$ graph is a straight line from $(0\\text{ s}, 4\\text{ m})$ to $(4\\text{ s}, 20\\text{ m})$. Find the velocity.",
      steps: [
        { text: "A straight line has the same slope everywhere, so velocity is constant." },
        { text: "$v = \\dfrac{20 - 4}{4 - 0} = 4$ m/s. The starting value 4 m is the initial position, not the velocity." },
      ],
      answer: "$v = 4$ m/s, constant.",
    },
    {
      type: "text",
      content:
        "Now see the tangent live. The lab below runs the same motion, $x = 5t^2$ (it starts at rest with $a = 10$ m/s²), and draws the tangent at the current time.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "line",
        sliders: {
          x0: { min: 0, max: 0, step: 1, initial: 0 },
          u: { min: -10, max: 10, step: 1, initial: 0 },
          a: { min: -10, max: 10, step: 1, initial: 10 },
        },
        duration: 3,
        graphs: ["x"],
        showTangent: true,
        caption:
          "Scrub t and watch the tangent steepen. Then set u = 10 and a = −10: the tangent flattens to horizontal at the top of the curve, where the particle is momentarily at rest.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the tangent's slope is 10 m/s at 1 s, 20 m/s at 2 s, 30 m/s at 3 s, the velocity growing steadily. With $u = 10$, $a = -10$, the curve rises, flattens at $t = 1$ s and falls: a horizontal tangent means the particle is momentarily at rest.",
    },
    { type: "heading", text: "Reading an $x$-$t$ graph" },
    {
      type: "table",
      headers: ["Feature of the $x$-$t$ graph", "What the motion is doing"],
      rows: [
        ["Horizontal straight line", "At rest"],
        ["Sloping straight line", "Uniform velocity (slope $= v$)"],
        ["Steeper", "Faster"],
        ["Negative slope", "Moving in the negative direction"],
        ["Curving upward (slope increasing)", "Velocity increasing"],
        ["Horizontal tangent at a peak or trough", "Momentarily at rest; turning round"],
        ["Two graphs crossing", "The two bodies are at the same place at that instant: they meet"],
      ],
    },
    {
      type: "worked-example",
      id: "mfe1-2-we3",
      title: "Worked example 3: which graphs are impossible?",
      problem:
        "Four students sketch $x$-$t$ graphs. Which cannot describe a real particle?",
      steps: [
        { text: "A graph with a **vertical** segment: the particle would change position in zero time, an infinite velocity. Impossible." },
        { text: "A graph that loops back so that one $t$ has two values of $x$: the particle would be in two places at once. Impossible. *Why this step:* $x(t)$ is a function of time, so each vertical line may cut the graph at most once." },
        { text: "A graph with a sharp corner: the velocity jumps instantly, which needs an infinite force. It is an idealisation (a perfectly hard bounce), allowed in problems but not strictly real." },
        { text: "A smooth graph that goes down and then up: perfectly fine; the particle reverses." },
      ],
      answer: "Impossible: a vertical segment and a graph with two $x$ values at one $t$. A sharp corner is an idealisation; a smooth down-then-up graph is fine.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the x-t graph is the path of the particle\"",
      content:
        "The particle moves along a straight line. The curve on an $x$-$t$ graph is a record of *where* it was *when*, not a picture of its route. A parabola on the $x$-$t$ graph of a ball rolling down a straight ramp does not mean the ball moves in a parabola.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe1-2-q1",
      variant: "practice",
      question: "An $x$-$t$ graph is a straight line from $(0\\text{ s}, 30\\text{ m})$ to $(6\\text{ s}, 0\\text{ m})$. What is the velocity (with its sign, taking increasing $x$ as positive)? Give your answer in m/s.",
      answer: -5,
      unit: "m/s",
      hint: "Velocity is the slope, $\\frac{\\Delta x}{\\Delta t}$. Is $x$ rising or falling?",
      solution: "Slope $= \\frac{0 - 30}{6 - 0} = -5$ m/s: the particle moves towards the origin at 5 m/s.",
      commonMistakes: [
        { answer: 5, feedback: "The size is right but the slope is negative: position decreases with time." },
        { answer: 30, feedback: "30 m is the starting position, not a velocity." },
        { answer: -0.2, feedback: "That is run over rise, $6/(-30)$. Velocity is $\\Delta x / \\Delta t$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-2-q2",
      variant: "concept",
      question: "At a point where the tangent to the $x$-$t$ graph is horizontal, the particle",
      options: [
        { text: "is momentarily at rest.", correct: true, feedback: "Zero slope means zero velocity at that instant." },
        { text: "has zero acceleration.", feedback: "Not necessarily: at the top of a throw, $v = 0$ but $a = -g$. The slope is zero, not the curvature." },
        { text: "is at the origin.", feedback: "The height of the graph gives position; the slope gives velocity. A flat tangent says nothing about where." },
      ],
      hint: "The slope of the $x$-$t$ graph is the velocity. What is the slope of a horizontal tangent, and does that say anything about how the slope is changing?",
    },
    {
      type: "quiz",
      id: "mfe1-2-q3",
      variant: "practice",
      question: "For $x = 5t^2$, what is the average velocity between $t = 1$ s and $t = 3$ s?",
      options: [
        { text: "$15$ m/s", feedback: "That is $45/3$, which uses the whole time from 0. Use the change over the interval." },
        { text: "$20$ m/s", correct: true, feedback: "$\\frac{45 - 5}{3 - 1} = 20$ m/s: the chord slope." },
        { text: "$10$ m/s", feedback: "That is the instantaneous velocity at $t = 1$ s." },
        { text: "$30$ m/s", feedback: "That is the instantaneous velocity at $t = 3$ s." },
      ],
      hint: "Average velocity is the chord slope: $\\dfrac{x(3) - x(1)}{3 - 1}$. Evaluate $x$ at both ends first.",
    },
    {
      type: "numeric",
      id: "mfe1-2-q4",
      variant: "practice",
      question: "For $x = 3t^2 + 2t$ (metres, seconds), what is the instantaneous velocity at $t = 2$ s? Give your answer in m/s.",
      answer: 14,
      unit: "m/s",
      hint: "Find the chord slope from $t = 2$ to $t = 2 + h$, then let $h \\to 0$, or differentiate.",
      solution: "$\\frac{x(2 + h) - x(2)}{h} = \\frac{3(4 + 4h + h^2) + 2(2 + h) - 16}{h} = 14 + 3h \\to 14$ m/s.\n\nOr directly: $v = \\frac{dx}{dt} = 6t + 2 = 14$ m/s.",
      commonMistakes: [
        { answer: 16, feedback: "That is $x(2)$, the position. Velocity is the slope." },
        { answer: 8, feedback: "That is the average velocity over the first 2 s, $16/2$." },
        { answer: 12, feedback: "You dropped the $2t$ term, whose slope adds 2 m/s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-2-q5",
      variant: "concept",
      question: "The $x$-$t$ graphs of two cars on the same road cross at $t = 4$ s. What does that mean?",
      options: [
        { text: "They have the same velocity at $t = 4$ s.", feedback: "Equal velocity would mean equal **slopes**. Crossing means equal heights." },
        { text: "They collide head-on.", feedback: "They are level, but they may be moving the same way (overtaking)." },
        { text: "They are at the same position at $t = 4$ s.", correct: true, feedback: "Equal $x$ at the same $t$: the cars are side by side." },
      ],
      hint: "An $x$-$t$ graph plots position against time. At a crossing point, which quantity do the two graphs share?",
    },
    {
      type: "quiz",
      id: "mfe1-2-q6",
      variant: "practice",
      multiple: true,
      question: "A particle moves along a line with $x = 8t - 2t^2$ (metres, seconds). Select all the statements that are true.",
      options: [
        { text: "It is momentarily at rest at $t = 2$ s.", correct: true, feedback: "$v = 8 - 4t = 0$ at $t = 2$ s: the $x$-$t$ graph has a horizontal tangent there." },
        { text: "Its acceleration is zero at $t = 2$ s.", feedback: "$v = 0$ there, but $v$ is still changing: $a = -4$ m/s² throughout." },
        { text: "Its average velocity from $t = 0$ to $t = 4$ s is zero.", correct: true, feedback: "$x(4) = 32 - 32 = 0 = x(0)$: zero displacement, so zero average velocity." },
        { text: "Its speed at $t = 3$ s is 4 m/s.", correct: true, feedback: "$v(3) = 8 - 12 = -4$ m/s: moving in the negative direction at 4 m/s." },
        { text: "Its $x$-$t$ graph has a horizontal tangent at $t = 4$ s.", feedback: "At $t = 4$ s the particle is back at $x = 0$, but moving: $v(4) = -8$ m/s. The graph crosses the axis there; it is not flat." },
      ],
      hint: "Differentiate to get $v(t)$, then test each statement.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "acceleration-and-velocity-time-graphs",
  title: "1.3 · Acceleration and Velocity–Time Graphs",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "The $v$-$t$ graph is the most useful picture in kinematics, because it carries two things at once. Its **slope** is the acceleration, just as the slope of $x$-$t$ was the velocity. And its **area** gives back the displacement. Going down the chain uses slopes; coming back up uses areas.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Acceleration",
      content:
        "Average acceleration $= \\dfrac{\\Delta v}{\\Delta t}$; instantaneous acceleration $a = \\dfrac{dv}{dt}$, the slope of the tangent to the $v$-$t$ graph. Unit m/s², dimensions $[LT^{-2}]$.",
    },
    { type: "heading", text: "Why area gives displacement" },
    {
      type: "text",
      content:
        "Over a tiny interval $dt$ the velocity is nearly constant, so the particle moves $dx = v\\,dt$: a thin strip of height $v$ and width $dt$ under the $v$-$t$ graph. Adding all the strips from $t_1$ to $t_2$ gives",
    },
    { type: "math", latex: "\\Delta x = \\int_{t_1}^{t_2} v\\,dt = \\text{signed area under the } v\\text{-}t \\text{ graph}" },
    {
      type: "text",
      content:
        "Area **below** the time axis (negative $v$) counts as negative displacement. Distance adds all the areas as positive. The same argument one level up says the area under an $a$-$t$ graph is the change in velocity, $\\Delta v = \\int a\\,dt$.\n\nTry it: a particle starts with $u = -6$ m/s (moving backwards) and has $a = +2$ m/s².",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "line",
        sliders: {
          x0: { min: 0, max: 0, step: 1, initial: 0 },
          u: { min: -10, max: 10, step: 1, initial: -6 },
          a: { min: -4, max: 4, step: 0.5, initial: 2 },
        },
        duration: 8,
        graphs: ["v", "a"],
        showArea: true,
        caption:
          "Scrub t. The shaded area under v-t is the displacement so far: it grows negative first, then the positive part eats it back.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $v$ crosses zero at $t = 3$ s. The area from 0 to 3 s is a triangle of $\\tfrac12 \\times 3 \\times (-6) = -9$ m. From 3 s to 6 s another triangle of $+9$ m cancels it, so at $t = 6$ s the particle is back at the start (displacement 0, distance 18 m). By $t = 8$ s the positive triangle is $\\tfrac12 \\times 5 \\times 10 = 25$ m: displacement $-9 + 25 = 16$ m, distance $9 + 25 = 34$ m. Throughout, the $a$-$t$ graph is a flat line at $+2$.",
    },
    { type: "heading", text: "Speeding up or slowing down?" },
    {
      type: "text",
      content:
        "In the lab the acceleration was always positive, yet the particle first slowed down (from 6 m/s to 0) and then sped up. The sign of $a$ alone does not decide. What matters is whether $a$ and $v$ point the same way:",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The speeding-up rule",
      content:
        "A particle **speeds up** when $v$ and $a$ have the **same sign** and **slows down** when they have **opposite signs**. On a $v$-$t$ graph: speeding up means the graph is moving away from the time axis; slowing down means it is heading towards it.",
    },
    { type: "heading", text: "Using slopes and areas together" },
    {
      type: "worked-example",
      id: "mfe1-3-we1",
      title: "Worked example 1: a car trip, trapezium graph",
      problem:
        "A car starts from rest, accelerates uniformly to 20 m/s in 10 s, cruises at 20 m/s for 20 s, then brakes uniformly to rest in 5 s. Find the accelerations in each stage, the displacement, the distance and the average velocity.",
      steps: [
        { text: "Accelerations are slopes: $\\frac{20}{10} = 2$ m/s², then $0$, then $\\frac{0 - 20}{5} = -4$ m/s²." },
        { text: "Displacement is the area of the trapezium: split into a triangle, a rectangle and a triangle. *Why this step:* areas of simple shapes are exact for straight-line graphs; no formula to remember.", latex: "\\Delta x = \\tfrac12(10)(20) + (20)(20) + \\tfrac12(5)(20) = 100 + 400 + 50 = 550\\text{ m}" },
        { text: "The graph never goes below the axis, so distance is also 550 m. Average velocity $= \\frac{550}{35} \\approx 15.7$ m/s." },
      ],
      answer: "$a = 2$, $0$, $-4$ m/s²; displacement $=$ distance $= 550$ m; average velocity $\\approx 15.7$ m/s.",
    },
    {
      type: "worked-example",
      id: "mfe1-3-we2",
      title: "Worked example 2: through zero",
      problem:
        "A ball's velocity changes uniformly from $+10$ m/s to $-10$ m/s in 4 s. Find the acceleration, the displacement and the distance covered in the 4 s.",
      steps: [
        { text: "Slope: $a = \\dfrac{-10 - 10}{4} = -5$ m/s²." },
        { text: "$v = 0$ at $t = 2$ s. Area 0–2 s $= \\tfrac12(2)(10) = +10$ m; area 2–4 s $= -10$ m." },
        { text: "Displacement $= 0$; distance $= 20$ m. *Why this step:* whenever $v$ changes sign, split the area at the crossing, or distance will be wrong." },
      ],
      answer: "$a = -5$ m/s²; displacement $= 0$; distance $= 20$ m.",
    },
    {
      type: "worked-example",
      id: "mfe1-3-we3",
      title: "Worked example 3: from an $a$-$t$ graph",
      problem:
        "Starting from rest, $a = 2$ m/s² for 3 s, then $a = -1$ m/s² for the next 4 s. Find the velocity at 3 s and at 7 s.",
      steps: [
        { text: "Area under $a$-$t$ from 0 to 3 s: $2 \\times 3 = 6$, so $v(3) = 0 + 6 = 6$ m/s." },
        { text: "From 3 to 7 s: $-1 \\times 4 = -4$, so $v(7) = 6 - 4 = 2$ m/s. The car is still moving forward, just more slowly." },
      ],
      answer: "$v(3) = 6$ m/s and $v(7) = 2$ m/s.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"negative acceleration means slowing down\"",
      content:
        "A falling stone with up taken positive has $a = -10$ m/s² and $v$ negative: same signs, so it is **speeding up**. \"Negative\" only says which way the acceleration points relative to your chosen axis. Use the speeding-up rule, not the sign alone.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"v = 0 means a = 0\"",
      content:
        "At the top of a vertical throw, and at the turnaround in the lab ($t = 3$ s), the velocity is zero but it is still **changing**: the slope of $v$-$t$ is $+2$ m/s² there. If $a$ were zero at that instant, the particle would stay stuck. Zero velocity and zero acceleration are unrelated.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "quiz",
      id: "mfe1-3-q1",
      variant: "concept",
      question: "At some instant a particle has $v = -4$ m/s and $a = -2$ m/s². It is",
      options: [
        { text: "slowing down, because the acceleration is negative.", feedback: "The sign of $a$ alone does not decide. Compare it with the sign of $v$." },
        { text: "speeding up, because $v$ and $a$ have the same sign.", correct: true, feedback: "Both point in the negative direction, so the speed grows." },
        { text: "at rest, because the signs cancel.", feedback: "Velocity is $-4$ m/s, not zero." },
      ],
      hint: "Use the speeding-up rule: compare the signs of $v$ and $a$.",
    },
    {
      type: "numeric",
      id: "mfe1-3-q2",
      variant: "practice",
      question: "A body starts from rest, accelerates uniformly to 12 m/s in 4 s, then moves at 12 m/s for 2 s. What is its displacement in the 6 s? Give your answer in metres.",
      answer: 48,
      unit: "m",
      hint: "Sketch the $v$-$t$ graph and add the areas of a triangle and a rectangle.",
      solution: "Triangle (0 to 4 s): $\\tfrac12(4)(12) = 24$ m. Rectangle (4 to 6 s): $12 \\times 2 = 24$ m.\n\nDisplacement $= 24 + 24 = 48$ m.",
      commonMistakes: [
        { answer: 72, feedback: "That treats the whole 6 s as 12 m/s. The first 4 s is a triangle, not a rectangle." },
        { answer: 36, feedback: "Triangle $24$ m is right; the cruising part is $12 \\times 2 = 24$ m, not 12 m." },
        { answer: 24, feedback: "That is only the accelerating phase." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-3-q3",
      variant: "practice",
      question: "A particle moves with $v = +4$ m/s for 2 s, then $v = -2$ m/s for 3 s. Find its displacement and distance.",
      options: [
        { text: "Displacement 14 m, distance 2 m", feedback: "Swapped: distance can never be less than the size of the displacement." },
        { text: "Displacement 2 m, distance 14 m", correct: true, feedback: "Areas: $+8$ and $-6$. Displacement $8 - 6 = 2$ m; distance $8 + 6 = 14$ m." },
        { text: "Displacement 2 m, distance 2 m", feedback: "Distance counts the backward 6 m as positive." },
        { text: "Displacement 14 m, distance 14 m", feedback: "The area below the axis is negative displacement." },
      ],
      hint: "Displacement is the signed area under the $v$-$t$ graph; distance adds the magnitudes of the areas on each side of the axis.",
    },
    {
      type: "quiz",
      id: "mfe1-3-q4",
      variant: "practice",
      question: "A body starts from rest with $a = 4$ m/s² for 3 s, then $a = 0$. What is its velocity at $t = 5$ s?",
      options: [
        { text: "$12$ m/s", correct: true, feedback: "Area under $a$-$t$ $= 4 \\times 3 = 12$ m/s, and it stays 12 m/s once $a = 0$." },
        { text: "$20$ m/s", feedback: "The acceleration stops at 3 s. After that, the area under $a$-$t$ adds nothing." },
        { text: "$0$", feedback: "$a = 0$ means constant velocity, not zero velocity." },
      ],
      hint: "Find the velocity reached at the end of the accelerating phase with $v = u + at$. What happens to it once $a = 0$?",
    },
    {
      type: "quiz",
      id: "mfe1-3-q5",
      variant: "concept",
      question: "In the lab ($u = -6$ m/s, $a = +2$ m/s²), what is the acceleration at $t = 3$ s, when the particle is at rest?",
      options: [
        { text: "$+2$ m/s²", correct: true, feedback: "The acceleration is constant throughout: $+2$ m/s², even at the turnaround." },
        { text: "$0$, because the particle is at rest.", feedback: "Zero velocity is not zero acceleration. The $v$-$t$ line still has slope 2 there." },
        { text: "$-2$ m/s²", feedback: "The acceleration never changes sign here; only the velocity does." },
      ],
      hint: "What is the slope of the $v$–$t$ line, and does it change at the instant $v = 0$?",
    },
    {
      type: "quiz",
      id: "mfe1-3-q6",
      variant: "practice",
      multiple: true,
      question: "A particle starts at $x = 0$ with $u = -6$ m/s and a constant $a = +2$ m/s². Select all the statements that are true.",
      options: [
        { text: "It slows down between $t = 0$ and $t = 3$ s.", correct: true, feedback: "$v$ is negative and $a$ positive: opposite signs, so the speed falls from 6 m/s to 0." },
        { text: "It speeds up between $t = 3$ s and $t = 6$ s.", correct: true, feedback: "Now $v$ is positive and so is $a$: same signs, so the speed grows from 0 to 6 m/s." },
        { text: "Its displacement at $t = 6$ s is zero.", correct: true, feedback: "The triangles of $-9$ m and $+9$ m under the $v$-$t$ graph cancel: it is back at the start." },
        { text: "The distance it covers in the first 6 s is 9 m.", feedback: "Distance adds both triangles as positive: $9 + 9 = 18$ m." },
        { text: "Its acceleration changes sign at $t = 3$ s.", feedback: "Only the velocity changes sign. The acceleration is $+2$ m/s² throughout." },
      ],
      hint: "Use the speeding-up rule, and split the $v$-$t$ area where $v$ crosses zero.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "equations-of-uniformly-accelerated-motion",
  title: "1.4 · Equations of Uniformly Accelerated Motion",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A driver on a highway at 72 km/h (20 m/s) sees a stalled truck and brakes hard. Will the car stop in time? If the deceleration is constant, one straight-line $v$-$t$ graph answers every question about the stop. Constant acceleration is the single most common situation in mechanics: free fall, braking, a block sliding on a slope. So it pays to squeeze everything out of one graph.",
    },
    { type: "heading", text: "Deriving the equations from the $v$-$t$ graph" },
    {
      type: "text",
      content:
        "**The derivation.** With constant $a$, the $v$-$t$ graph is a straight line from $u$ (at $t = 0$) to $v$ (at time $t$).\n\n*Slope:* $a = \\dfrac{v - u}{t}$, so",
    },
    { type: "math", latex: "v = u + at \\qquad (1)" },
    {
      type: "text",
      content:
        "*Area:* the region under the line is a trapezium with parallel sides $u$ and $v$ and width $t$. Its area is the displacement $s$:",
    },
    { type: "math", latex: "s = \\frac{u + v}{2}\\,t \\qquad (2)" },
    {
      type: "text",
      content:
        "Substitute $v$ from (1) into (2): $s = \\frac{u + u + at}{2}\\,t$, or split the trapezium into a rectangle $ut$ and a triangle $\\tfrac12 t (at)$:",
    },
    { type: "math", latex: "s = ut + \\tfrac12 at^2 \\qquad (3)" },
    {
      type: "text",
      content:
        "*Eliminate the time:* from (1), $t = \\frac{v - u}{a}$; put it in (2): $s = \\frac{(v + u)(v - u)}{2a}$, so",
    },
    { type: "math", latex: "v^2 = u^2 + 2as \\qquad (4)" },
    {
      type: "callout",
      variant: "definition",
      title: "The equations of uniformly accelerated motion",
      content:
        "For constant $a$ along a line: $v = u + at$; $s = ut + \\tfrac12 at^2$; $v^2 = u^2 + 2as$; $s = \\frac{u + v}{2}t$. Here $s$ is the **displacement** (not distance) and every quantity carries its sign.\nEach equation leaves out one of $v$, $s$, $t$, $a$: pick the one that omits what you neither know nor want.",
    },
    { type: "heading", text: "Displacement in the $n$th second" },
    {
      type: "text",
      content:
        "The distance covered *during* the $n$th second is $s(n) - s(n - 1)$:",
    },
    {
      type: "math",
      latex:
        "s_n = \\left[un + \\tfrac12 an^2\\right] - \\left[u(n-1) + \\tfrac12 a(n-1)^2\\right] = u + \\frac{a}{2}(2n - 1)",
    },
    {
      type: "text",
      content:
        "(It looks dimensionally odd because a hidden \"× 1 s\" has been dropped; the result is in metres when $u$ and $a$ are in SI.)\n\nIn the lab below a car brakes from $u = 20$ m/s at $a = -5$ m/s². The readout checks $v^2 - u^2 = 2as$ at every instant.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "line",
        sliders: {
          x0: { min: 0, max: 0, step: 1, initial: 0 },
          u: { min: 0, max: 30, step: 1, initial: 20 },
          a: { min: -10, max: 0, step: 0.5, initial: -5 },
        },
        duration: 4,
        caption:
          "Scrub to t = 4 s, where the car stops. Then set u = 10: the car stops at t = 2 s after only 10 m, a quarter of the distance for half the speed. (After the stop the lab keeps the same a, so ignore the reversing: real brakes do not drive a car backwards.)",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the car stops at $t = 4$ s after 40 m, and $v^2 - u^2 = 0 - 400 = -400 = 2(-5)(40)$ at the end. The $v$-$t$ line is straight and the $x$-$t$ curve is a parabola that flattens exactly where the car stops.",
    },
    { type: "heading", text: "Braking distances and chases" },
    {
      type: "worked-example",
      id: "mfe1-4-we1",
      title: "Worked example 1: braking distance ∝ $u^2$",
      problem:
        "A car at 20 m/s brakes at 5 m/s². How far does it go? What if it were doing 40 m/s?",
      steps: [
        { text: "We know $u$, $v = 0$, $a$ and want $s$; time is irrelevant, so use (4). *Why this step:* choosing the equation that omits $t$ saves a step." },
        { text: "$0 = 20^2 - 2(5)s \\Rightarrow s = \\dfrac{400}{10} = 40$ m." },
        { text: "At 40 m/s: $s = \\dfrac{1600}{10} = 160$ m. Doubling the speed **quadruples** the stopping distance, because $s = \\dfrac{u^2}{2|a|}$." },
      ],
      answer: "40 m at 20 m/s; 160 m at 40 m/s.",
    },
    {
      type: "worked-example",
      id: "mfe1-4-we2",
      title: "Worked example 2: reaction time",
      problem:
        "Same car at 20 m/s, but the driver takes 0.5 s to react before braking. Find the total stopping distance.",
      steps: [
        { text: "During the reaction time the car still moves at 20 m/s: $20 \\times 0.5 = 10$ m. *Why this step:* the brakes are not yet on, so there is no acceleration in this phase; it is a separate uniform-motion stage." },
        { text: "Braking distance as before: 40 m." },
        { text: "Total stopping distance: $10 + 40 = 50$ m." },
      ],
      answer: "Total stopping distance $= 50$ m (10 m reacting + 40 m braking).",
    },
    {
      type: "worked-example",
      id: "mfe1-4-we3",
      title: "Worked example 3: a chase",
      problem:
        "Car A starts from rest at a signal with $a = 2$ m/s² just as car B passes it at a steady 10 m/s. When and where does A catch B, and what is the largest gap between them before that?",
      steps: [
        { text: "Positions from the signal: $x_A = \\tfrac12(2)t^2 = t^2$ and $x_B = 10t$." },
        { text: "Meeting means equal positions: $t^2 = 10t \\Rightarrow t = 0$ or $t = 10$ s. *Why this step:* $t = 0$ is the start (they are level then too), so the catch-up is at 10 s." },
        { text: "Where: $x = 100$ m. A's speed then: $v = 2 \\times 10 = 20$ m/s, twice B's." },
        { text: "The gap is largest when their speeds are equal ($2t = 10$, $t = 5$ s): $x_B - x_A = 50 - 25 = 25$ m." },
      ],
      answer: "A catches B after 10 s, 100 m from the signal (A then at 20 m/s); the largest gap is 25 m, at 5 s.",
    },
    {
      type: "worked-example",
      id: "mfe1-4-we4",
      title: "Worked example 4: a bullet, JEE classic",
      problem:
        "A bullet loses half its speed after penetrating 3 cm into a block. How much further will it go, assuming constant retardation?",
      steps: [
        { text: "First 3 cm: $\\left(\\tfrac u2\\right)^2 = u^2 - 2a(3)$, so $2a(3) = \\tfrac34 u^2$, giving $2a = \\tfrac{u^2}{4}$ (per cm)." },
        { text: "From $\\tfrac u2$ to rest: $0 = \\tfrac{u^2}{4} - 2a\\,x \\Rightarrow x = \\dfrac{u^2/4}{u^2/4} = 1$ cm. *Why this step:* we never needed $u$ or $a$ numerically; the ratio did everything." },
        { text: "So it penetrates only 1 cm more. Kinetic energy explains it: losing half the speed already removed three quarters of the energy." },
      ],
      answer: "1 cm further.",
    },
    {
      type: "worked-example",
      id: "mfe1-4-we5",
      title: "Worked example 5: $n$th second",
      problem:
        "A body falls from rest with $a = 10$ m/s². How far does it fall during the 3rd second?",
      steps: [
        { text: "$s_3 = 0 + \\dfrac{10}{2}(2 \\cdot 3 - 1) = 5 \\times 5 = 25$ m." },
        { text: "Check: $s(3) - s(2) = 45 - 20 = 25$ m. ✓" },
      ],
      answer: "25 m.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"these equations work for any motion\"",
      content:
        "They were derived from a **straight** $v$-$t$ line, so they hold only when $a$ is constant. For a car whose acceleration changes, or a particle with $a = -kv$, you must go back to $v = \\frac{dx}{dt}$ and $a = \\frac{dv}{dt}$ (lesson 1.6). Using $v^2 = u^2 + 2as$ there gives wrong answers with complete confidence.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe1-4-q1",
      variant: "practice",
      question: "A body has $u = 2$ m/s and $a = 4$ m/s². How far does it travel in the 5th second? Give your answer in metres.",
      answer: 20,
      unit: "m",
      hint: "Use $s_n = u + \\frac a2(2n - 1)$, or subtract $s(4)$ from $s(5)$.",
      solution: "$s_5 = 2 + \\frac42(2 \\cdot 5 - 1) = 2 + 18 = 20$ m.\n\nCheck: $s(5) - s(4) = 60 - 40 = 20$ m.",
      commonMistakes: [
        { answer: 60, feedback: "That is the displacement in the first 5 s, not in the 5th second." },
        { answer: 24, feedback: "Use $(2n - 1) = 9$, not $2n + 1 = 11$." },
        { answer: 11, feedback: "You left out the factor $\\frac a2 = 2$: it multiplies $(2n - 1) = 9$ to give 18, and then you add $u = 2$." },
      ],
    },
    {
      type: "numeric",
      id: "mfe1-4-q2",
      variant: "practice",
      question: "A particle with $u = 10$ m/s and $a = 2$ m/s² moves 24 m. What is its speed then? Give your answer in m/s.",
      answer: 14,
      unit: "m/s",
      hint: "Time is neither given nor asked for, so use the equation without $t$.",
      solution: "$v^2 = u^2 + 2as = 100 + 2(2)(24) = 196$, so $v = 14$ m/s.",
      commonMistakes: [
        { answer: 12.166, tolerance: 0.01, feedback: "That is $\\sqrt{148}$: you used $u^2 + as$. The factor 2 is part of the equation: $v^2 = u^2 + 2as$." },
        { answer: 196, feedback: "That is $v^2$ (in m²/s²). Take the square root." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-4-q3",
      variant: "concept",
      question: "With the same brakes, a car's stopping distance at 60 km/h is how many times that at 30 km/h?",
      options: [
        { text: "4", correct: true, feedback: "$s = u^2/2|a|$: doubling $u$ multiplies $s$ by 4." },
        { text: "2", feedback: "Stopping distance goes as $u^2$, not $u$." },
        { text: "$\\sqrt2$", feedback: "That would be the ratio of speeds for a doubled distance, the inverse question." },
      ],
      hint: "Same brakes means the same deceleration. From $v^2 = u^2 + 2as$ with $v = 0$, how does the stopping distance scale with $u$ (Worked example 1)?",
    },
    {
      type: "quiz",
      id: "mfe1-4-q4",
      variant: "practice",
      question: "A car moving at 72 km/h stops uniformly in 4 s. What distance does it cover while stopping?",
      options: [
        { text: "$80$ m", feedback: "That is $ut$, as if the car never slowed. Use the average speed $\\frac{u + v}{2}$." },
        { text: "$144$ m", feedback: "You used 72 km/h as 72 m/s in $\\frac{u+v}{2}t$. Convert first: $72/3.6 = 20$ m/s." },
        { text: "$20$ m", feedback: "Recompute: average speed 10 m/s for 4 s." },
        { text: "$40$ m", correct: true, feedback: "$u = 20$ m/s, $s = \\frac{u + v}{2}t = \\frac{20 + 0}{2} \\times 4 = 40$ m." },
      ],
      hint: "Convert to m/s first, then with uniform deceleration the distance is the average velocity $\\frac{u + v}{2}$ times the time.",
    },
    {
      type: "numeric",
      id: "mfe1-4-q5",
      variant: "practice",
      question: "Starting from rest with uniform acceleration, a body covers 20 m in the first 2 s. How far does it go in the **next** 2 s? Give your answer in metres.",
      answer: 60,
      unit: "m",
      hint: "Find $a$ from the first 2 s, then compute $s(4) - s(2)$.",
      solution: "$20 = \\tfrac12 a (2)^2 \\Rightarrow a = 10$ m/s². Then $s(4) = \\tfrac12(10)(16) = 80$ m, so the next 2 s gives $80 - 20 = 60$ m.\n\nFrom rest, equal time intervals give distances in the ratio $1 : 3 : 5 : \\dots$, so $3 \\times 20 = 60$ m.",
      commonMistakes: [
        { answer: 20, feedback: "It is speeding up, so it covers more in the next 2 s." },
        { answer: 80, feedback: "That is the total in 4 s. Subtract the first 20 m." },
        { answer: 40, feedback: "Distance does not grow in proportion to time under acceleration; it grows as $t^2$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-4-q6",
      variant: "concept",
      multiple: true,
      question: "For which of these motions can you **not** use $v^2 = u^2 + 2as$? Select all that apply.",
      options: [
        { text: "A boat whose deceleration is proportional to its speed, $a = -kv$.", correct: true, feedback: "$a$ changes as $v$ changes, so the constant-$a$ equations fail. Integrate instead (1.6)." },
        { text: "A stone in free fall (no air resistance).", feedback: "Constant $a = g$: the equation applies." },
        { text: "A car braking with constant deceleration.", feedback: "Constant $a$: the equation applies." },
        { text: "A rocket sled whose acceleration grows steadily with time, $a = 2t$.", correct: true, feedback: "$a$ is not constant, so the equation fails. Integrate $a(t)$ twice instead (1.6)." },
        { text: "A ball thrown straight up, on its way down again.", feedback: "The acceleration is $-g$ on the way up, at the top and on the way down: constant, so the equation applies to the whole flight." },
      ],
      hint: "The equations of uniformly accelerated motion need $a$ to be **constant**. Check each motion: is its acceleration fixed in size and direction throughout?",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "free-fall-and-vertical-motion",
  title: "1.5 · Free Fall and Vertical Motion",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Drop a cricket ball and a tennis ball from the same balcony: they hit the ground together. Galileo argued this against 2000 years of belief that heavier bodies fall faster. Near the Earth's surface, with air resistance negligible, **every** body has the same acceleration $g$ straight down, whether it is rising, falling or momentarily at rest. We take $g = 10$ m/s² throughout the course.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Sign convention: choose once, stick to it",
      content:
        "Pick **up as positive** and put the origin at the launch point. Then $a = -g = -10$ m/s² for the whole flight, on the way up and on the way down. Positions below the launch point are negative, and downward velocities are negative. The four equations of 1.4 then work in a single line, with no need to split the motion.",
    },
    { type: "heading", text: "Galileo's odd-number rule" },
    {
      type: "text",
      content:
        "Dropped from rest ($u = 0$, $a = g$ downward), the distance fallen in the $n$th second is $s_n = \\frac g2(2n - 1) = 5(2n - 1)$ m: 5, 15, 25, 35 m, in the ratio $1 : 3 : 5 : 7$. The total after $n$ seconds is $5n^2$: 5, 20, 45, 80 m, the sums of odd numbers being perfect squares.\n\n**A vertical throw.** Throw up with speed $u$ (up positive, $a = -g$).",
    },
    {
      type: "math",
      latex:
        "\\text{top: } v = 0 \\Rightarrow t_{\\uparrow} = \\frac{u}{g}, \\quad H = \\frac{u^2}{2g}\\; \\qquad \\text{back to start: } 0 = ut - \\tfrac12 gt^2 \\Rightarrow T = \\frac{2u}{g}",
    },
    { type: "heading", text: "Symmetry of an upward throw" },
    {
      type: "text",
      content:
        "Time up equals time down, and at any given height the speed going up equals the speed coming down (from $v^2 = u^2 - 2gy$, which fixes $v^2$ by the height alone). Watch it below: $x$ is the height above the launch point, $u = 20$ m/s and $a$ is pinned at $-10$ m/s².",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "line",
        sliders: {
          x0: { min: 0, max: 0, step: 1, initial: 0 },
          u: { min: 0, max: 30, step: 1, initial: 20 },
          a: { min: -10, max: -10, step: 1, initial: -10 },
        },
        duration: 4,
        caption: "x is the height above the launch point (up positive). The acceleration is fixed at −10 m/s².",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the ball rises for 2 s to a height of 20 m, turns round, and is back at the launch point at 4 s, moving down at 20 m/s. The $v$-$t$ graph is one straight line of slope $-10$ from $+20$ to $-20$; nothing special happens to it at the top. The $a$-$t$ graph is flat at $-10$ the whole time.",
    },
    { type: "heading", text: "Throws from towers and balloons" },
    {
      type: "worked-example",
      id: "mfe1-5-we1",
      title: "Worked example 1: a throw from a tower",
      problem:
        "A ball is thrown up at 20 m/s from the top of a 25 m tower. When does it hit the ground, and how fast?",
      steps: [
        { text: "Up positive, origin at the throw. The ground is at $y = -25$ m. *Why this step:* with a fixed origin and sign, the whole up-and-down flight is one equation." },
        { text: "$y = ut - \\tfrac12 gt^2$: $-25 = 20t - 5t^2$, i.e. $t^2 - 4t - 5 = 0$, so $(t - 5)(t + 1) = 0$." },
        { text: "$t = 5$ s or $t = -1$ s. Reject $-1$ s: the ball was not thrown until $t = 0$. (It is when a ball on this same parabola would have had to leave the ground to arrive at the tower top at 20 m/s.)" },
        { text: "Speed: $v = 20 - 10(5) = -30$ m/s, so 30 m/s downward. Check with $v^2 = u^2 + 2as = 400 + 2(-10)(-25) = 900$. ✓" },
      ],
      answer: "It lands after 5 s, at 30 m/s downward.",
    },
    {
      type: "worked-example",
      id: "mfe1-5-we2",
      title: "Worked example 2: released from a rising balloon",
      problem:
        "A balloon rises steadily at 10 m/s. At a height of 40 m a stone is released from it. How long does the stone take to reach the ground?",
      steps: [
        { text: "The stone shares the balloon's velocity at release: $u = +10$ m/s, **upward**. *Why this step:* \"released\" or \"dropped\" from a moving object means zero velocity relative to the object, not relative to the ground." },
        { text: "$-40 = 10t - 5t^2 \\Rightarrow t^2 - 2t - 8 = 0 \\Rightarrow (t - 4)(t + 2) = 0$, so $t = 4$ s." },
        { text: "It first rises 5 m for 1 s, then falls 45 m in 3 s. Treating it as dropped from rest would give $\\sqrt{8} \\approx 2.83$ s, wrong." },
      ],
      answer: "$t = 4$ s.",
    },
    {
      type: "worked-example",
      id: "mfe1-5-we3",
      title: "Worked example 3: two balls at an interval",
      problem:
        "Ball A is thrown up at 20 m/s. One second later ball B is thrown up from the same point at 20 m/s. When and where do they meet?",
      steps: [
        { text: "$y_A = 20t - 5t^2$ and $y_B = 20(t - 1) - 5(t - 1)^2$ for $t \\ge 1$. *Why this step:* B's clock starts 1 s late, so replace $t$ by $t - 1$ in its equation." },
        { text: "Set equal: $20t - 5t^2 = 20t - 20 - 5t^2 + 10t - 5$, which gives $10t = 25$, so $t = 2.5$ s." },
        { text: "Height: $y = 50 - 31.25 = 18.75$ m. Symmetry confirms it: A is 0.5 s past its top (2 s) while B is 0.5 s before its top." },
      ],
      answer: "They meet at $t = 2.5$ s (after A is thrown), 18.75 m above the point of projection.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"at the highest point the acceleration is zero\"",
      content:
        "At the top the velocity is zero, but gravity has not switched off: $a = -g$ exactly as before. If $a$ were zero there, the ball would stay hanging in the air. It is the *velocity* that passes through zero, changing from up to down.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a heavier body falls faster\"",
      content:
        "Without air resistance, all bodies fall with the same $g$ (Chapter 3 shows why: the pull of gravity is proportional to mass, and so is the inertia it must overcome). A feather falls slowly in air because of drag, not because it is light; in a vacuum tube it falls alongside a coin.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe1-5-q1",
      variant: "practice",
      question: "A ball is thrown vertically up at 30 m/s. Taking $g = 10$ m/s², what is its maximum height above the launch point? Give your answer in metres.",
      answer: 45,
      unit: "m",
      hint: "At the top $v = 0$. Use the equation that leaves out time.",
      solution: "$0 = u^2 - 2gH \\Rightarrow H = \\frac{u^2}{2g} = \\frac{900}{20} = 45$ m.",
      commonMistakes: [
        { answer: 90, feedback: "You forgot the 2 in $2g$." },
        { answer: 3, feedback: "That is $u/g$, which is the **time** to the top (3 s), not the height." },
        { answer: 30, feedback: "30 m/s is the launch speed, not a height." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-5-q2",
      variant: "practice",
      question: "A stone is dropped from rest from a height of 80 m. How long does it take to reach the ground?",
      options: [
        { text: "$8$ s", feedback: "That is $80/10$, which assumes a constant speed. Use $h = \\tfrac12 gt^2$." },
        { text: "$4$ s", correct: true, feedback: "$80 = 5t^2 \\Rightarrow t^2 = 16 \\Rightarrow t = 4$ s." },
        { text: "$16$ s", feedback: "That is $t^2$; take the square root." },
        { text: "$2\\sqrt2$ s", feedback: "That uses $h = gt^2$ without the $\\tfrac12$." },
      ],
      hint: "Dropped from rest means $u = 0$, so use $h = \\tfrac12 g t^2$ with $g = 10$ m/s² and solve for $t$.",
    },
    {
      type: "numeric",
      id: "mfe1-5-q3",
      variant: "practice",
      question: "A body falls from rest ($g = 10$ m/s²). How far does it fall **during** the 4th second? Give your answer in metres.",
      answer: 35,
      unit: "m",
      hint: "The 4th second runs from $t = 3$ s to $t = 4$ s.",
      solution: "$s_4 = \\frac g2(2 \\cdot 4 - 1) = 5 \\times 7 = 35$ m.\n\nCheck: $s(4) - s(3) = 80 - 45 = 35$ m.",
      commonMistakes: [
        { answer: 80, feedback: "That is the total in 4 s. The 4th second alone is $s(4) - s(3)$." },
        { answer: 40, feedback: "Use $(2n - 1) = 7$, not $2n = 8$: $5 \\times 7 = 35$ m." },
        { answer: 45, feedback: "That is the total after 3 s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-5-q4",
      variant: "concept",
      question: "A ball is thrown straight up. At its highest point, its velocity and acceleration are",
      options: [
        { text: "$v = 0$, $a = 0$", feedback: "If $a$ were zero with $v = 0$, the ball would stay put forever." },
        { text: "$v = 0$, $a = g$ downward", correct: true, feedback: "Gravity acts throughout; only the velocity passes through zero." },
        { text: "$v = u$ upward, $a = g$ downward", feedback: "At the top the ball has stopped rising." },
      ],
      hint: "Treat velocity and acceleration separately: what is the vertical velocity at the turning point, and what forces still act on the ball there?",
    },
    {
      type: "quiz",
      id: "mfe1-5-q5",
      variant: "practice",
      question: "A ball is thrown up at 20 m/s. At what times is it 15 m above the launch point?",
      options: [
        { text: "Only at $t = 1$ s", feedback: "It also passes 15 m on the way down. Both roots of the quadratic are physical here." },
        { text: "$t = 0.75$ s", feedback: "That is $15/20$, assuming constant speed." },
        { text: "It never reaches 15 m.", feedback: "Its maximum height is $400/20 = 20$ m, above 15 m." },
        { text: "$t = 1$ s and $t = 3$ s", correct: true, feedback: "$15 = 20t - 5t^2 \\Rightarrow t^2 - 4t + 3 = 0 \\Rightarrow t = 1, 3$ s: up and down, symmetric about the top at 2 s." },
      ],
      hint: "Put $s = 15$ m into $s = ut - \\tfrac12 g t^2$ and solve the quadratic in $t$. How many positive roots does it have, and what does each mean?",
    },
    {
      type: "numeric",
      id: "mfe1-5-q6",
      variant: "practice",
      question: "A helicopter rising at 5 m/s releases a packet when it is 30 m above the ground. Taking $g = 10$ m/s², how long does the packet take to land? Give your answer in seconds.",
      answer: 3,
      unit: "s",
      hint: "The packet leaves with the helicopter's velocity. Up positive, origin at the release point: the ground is at $y = -30$ m.",
      solution: "$u = +5$ m/s, $a = -10$ m/s²: $-30 = 5t - 5t^2 \\Rightarrow t^2 - t - 6 = 0 \\Rightarrow (t - 3)(t + 2) = 0$.\n\nReject $t = -2$ s: the packet lands at $t = 3$ s.",
      commonMistakes: [
        { answer: 2.449, tolerance: 0.01, feedback: "That is $\\sqrt6$: it treats the packet as dropped from rest. It starts with the helicopter's 5 m/s upward." },
        { answer: 2, feedback: "That is the magnitude of the rejected root, from the wrong sign convention. Check: $5(2) - 5(4) = -10 \\ne -30$." },
        { answer: 6, feedback: "That is the product of the roots, not a root." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-5-q7",
      variant: "practice",
      multiple: true,
      question: "A ball is thrown straight up at 20 m/s ($g = 10$ m/s², no air resistance). Select all the statements that are true.",
      options: [
        { text: "It rises 20 m above the launch point.", correct: true, feedback: "$H = \\frac{u^2}{2g} = \\frac{400}{20} = 20$ m." },
        { text: "Its acceleration is zero at the highest point.", feedback: "Only the velocity is zero there. The acceleration is $g$ downward throughout the flight." },
        { text: "It is back at the launch point after 4 s, moving down at 20 m/s.", correct: true, feedback: "$T = \\frac{2u}{g} = 4$ s, and by symmetry it returns with the speed it left with." },
        { text: "At 15 m above the launch point its speed is 10 m/s, both going up and coming down.", correct: true, feedback: "$v^2 = u^2 - 2gy = 400 - 300 = 100$, fixed by the height alone: 10 m/s up, then 10 m/s down." },
        { text: "It takes longer to come down than to go up.", feedback: "Without air resistance the motion is symmetric: 2 s up and 2 s down." },
      ],
      hint: "Test each statement with the constant-$a$ equations ($v^2 = u^2 - 2gh$ for heights and speeds, $s = ut - \\tfrac12 gt^2$ for times) and the symmetry of an upward throw.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "calculus-of-kinematics",
  title: "1.6 · Calculus of Kinematics",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A lift starts smoothly, a boat coasts to a stop in water, a mass bobs on a spring. In none of these is the acceleration constant, so the equations of 1.4 are useless. But the definitions never change: $v$ is the slope of $x$, $a$ is the slope of $v$. Calculus is simply the machine that computes slopes and areas exactly.",
    },
    { type: "heading", text: "Differentiating down, integrating up" },
    {
      type: "callout",
      variant: "definition",
      title: "The calculus chain",
      content:
        "Down (differentiate): $v = \\dfrac{dx}{dt}$, $a = \\dfrac{dv}{dt} = \\dfrac{d^2x}{dt^2}$.\nUp (integrate): $v = u + \\displaystyle\\int_0^t a\\,dt$, $x = x_0 + \\displaystyle\\int_0^t v\\,dt$.\nWhen $a$ depends on position, use the chain rule: $a = \\dfrac{dv}{dt} = \\dfrac{dv}{dx}\\dfrac{dx}{dt} = v\\dfrac{dv}{dx}$.",
    },
    { type: "heading", text: "Full analysis of a cubic motion" },
    {
      type: "worked-example",
      id: "mfe1-6-we1",
      title: "Worked example 1: a full analysis",
      problem:
        "A particle moves with $x(t) = t^3 - 6t^2 + 9t$ (metres, seconds). Find its velocity, acceleration, turning points, and the distance covered in the first 4 s.",
      steps: [
        { text: "Differentiate: $v = 3t^2 - 12t + 9 = 3(t - 1)(t - 3)$ and $a = 6t - 12$." },
        { text: "Turning points where $v = 0$: $t = 1$ s and $t = 3$ s. *Why this step:* a particle can only reverse where its velocity passes through zero; those instants split the path into one-way legs." },
        { text: "Positions: $x(0) = 0$, $x(1) = 1 - 6 + 9 = 4$, $x(3) = 27 - 54 + 27 = 0$, $x(4) = 64 - 96 + 36 = 4$ m." },
        { text: "Legs: $0 \\to 4$ (4 m), $4 \\to 0$ (4 m), $0 \\to 4$ (4 m). Distance $= 12$ m, displacement $= 4$ m." },
        { text: "$a = 0$ at $t = 2$ s: there the velocity is at its most negative, $v(2) = 12 - 24 + 9 = -3$ m/s." },
      ],
      answer: "$v = 3(t - 1)(t - 3)$, $a = 6t - 12$; turning points at 1 s and 3 s; distance in 4 s $= 12$ m.",
    },
    {
      type: "text",
      content:
        "In the explorer, $x$ on the horizontal axis stands for $t$, and the curve is the position $x(t)$. Drag the point to $t = 1$ and $t = 3$.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "x^3 - 6*x^2 + 9*x",
        exprLatex: "x^3 - 6x^2 + 9x",
        window: { xmin: 0, xmax: 4.5, ymin: -2, ymax: 8 },
        initial: 1,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: a peak at $t = 1$ (height 4), a trough at $t = 3$ (height 0), and a rise back to 4 at $t = 4$. The particle goes out, comes back to the origin, and goes out again. Now compare with the velocity. Below, the dashed base curve is $x(t)$ and the solid curve is $v(t) = 3t^2 - 12t + 9 + c$. The true velocity has $c = 0$; the slider $c$ deliberately adds a wrong constant.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "x^3 - 6*x^2 + 9*x",
        baseLatex: "x^3 - 6x^2 + 9x",
        expr: "3*x^2 - 12*x + 9 + c",
        exprLatex: "3x^2 - 12x + 9 + c",
        params: [{ name: "c", min: -2, max: 2, step: 1, initial: 0 }],
        window: { xmin: 0, xmax: 4.5, ymin: -4, ymax: 10 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at $c = 0$ the solid $v$ curve crosses zero exactly at $t = 1$ and $t = 3$, beneath the peak and trough of $x$. It is negative between them, precisely where $x$ is falling. Move $c$ away from 0 and the zeros of $v$ slide off the turning points: only the true derivative lines them up.",
    },
    { type: "heading", text: "When $a$ depends on $t$, $v$ or $x$" },
    {
      type: "worked-example",
      id: "mfe1-6-we2",
      title: "Worked example 2: integrating $a(t)$",
      problem:
        "$a = 6t$ m/s², with $v = 2$ m/s and $x = 0$ at $t = 0$. Find $v$ and $x$ at $t = 2$ s.",
      steps: [
        { text: "$v = 2 + \\int_0^t 6t\\,dt = 2 + 3t^2$. *Why this step:* the initial velocity is the constant of integration; without it you would get the change in $v$, not $v$." },
        { text: "$x = 0 + \\int_0^t (2 + 3t^2)\\,dt = 2t + t^3$." },
        { text: "At $t = 2$: $v = 14$ m/s and $x = 12$ m. (The constant-$a$ formula $s = ut + \\frac12 at^2$ with $a(2) = 12$ would give $28$ m, badly wrong.)" },
      ],
      answer: "$v = 14$ m/s and $x = 12$ m at $t = 2$ s.",
    },
    {
      type: "worked-example",
      id: "mfe1-6-we3",
      title: "Worked example 3: $a$ as a function of $v$: $a = -kv$",
      problem:
        "A motor boat cuts its engine at speed $u$; water drag gives $a = -kv$. Find $v(t)$, $x(t)$ and the total distance it coasts.",
      steps: [
        { text: "$\\dfrac{dv}{dt} = -kv \\Rightarrow \\dfrac{dv}{v} = -k\\,dt$. *Why this step:* separating the variables puts all the $v$'s on one side and all the $t$'s on the other, so each side can be integrated." },
        { text: "$\\displaystyle\\int_u^v \\frac{dv}{v} = -k\\int_0^t dt \\Rightarrow \\ln\\frac vu = -kt \\Rightarrow v = ue^{-kt}$." },
        { text: "Integrate again: $x = \\displaystyle\\int_0^t ue^{-kt}\\,dt = \\frac uk\\left(1 - e^{-kt}\\right)$." },
        { text: "As $t \\to \\infty$, $x \\to \\dfrac uk$. The boat never quite stops in finite time, yet it travels only a finite distance." },
        { text: "Same result via $v\\frac{dv}{dx} = -kv$: $\\frac{dv}{dx} = -k$, so $v = u - kx$, which reaches zero at $x = \\frac uk$. ✓" },
      ],
      answer: "$v = ue^{-kt}$, $x = \\dfrac uk\\left(1 - e^{-kt}\\right)$; total distance $\\dfrac uk$.",
    },
    {
      type: "worked-example",
      id: "mfe1-6-we4",
      title: "Worked example 4: $a$ as a function of $x$: $a = -\\omega^2 x$",
      problem:
        "A particle attached to a spring has $a = -\\omega^2x$ and is released from rest at $x = A$. Find $v$ as a function of $x$.",
      steps: [
        { text: "$a$ depends on $x$, so use $a = v\\dfrac{dv}{dx}$: $v\\,dv = -\\omega^2 x\\,dx$. *Why this step:* $a$ is given in terms of $x$, so we need an equation linking $v$ and $x$ directly, with $t$ eliminated." },
        { text: "Integrate from ($x = A$, $v = 0$): $\\tfrac12 v^2 = -\\tfrac12\\omega^2(x^2 - A^2)$." },
        { text: "$v^2 = \\omega^2(A^2 - x^2)$. The speed is greatest ($\\omega A$) at $x = 0$ and zero at $x = \\pm A$: the particle oscillates. This is simple harmonic motion, the subject of the Oscillations course." },
      ],
      answer: "$v^2 = \\omega^2(A^2 - x^2)$, greatest speed $\\omega A$ at $x = 0$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Graph conversion drill",
      content:
        "From an $x$-$t$ sketch: mark where the slope is zero (those are the zeros of $v$), where the slope is steepest (the extremes of $v$) and where the curve bends up or down (the sign of $a$). Then sketch $v$-$t$ and repeat to get $a$-$t$. Going the other way, areas under $a$-$t$ build $v$, and areas under $v$-$t$ build $x$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"v dv/dx is a different acceleration\"",
      content:
        "It is the same $a = \\frac{dv}{dt}$, rewritten with the chain rule: $\\frac{dv}{dt} = \\frac{dv}{dx}\\cdot\\frac{dx}{dt} = \\frac{dv}{dx}\\cdot v$. It is just the convenient form when $a$ is known as a function of position.",
    },
    { type: "heading", text: "Check your understanding" },
    {
      type: "numeric",
      id: "mfe1-6-q1",
      variant: "practice",
      question: "A particle moves with $x = 2t^3 - 3t^2$ (SI). What is its acceleration at $t = 2$ s? Give your answer in m/s².",
      answer: 18,
      unit: "m/s²",
      hint: "Differentiate twice.",
      solution: "$v = \\frac{dx}{dt} = 6t^2 - 6t$ and $a = \\frac{dv}{dt} = 12t - 6$.\n\nAt $t = 2$ s: $a = 24 - 6 = 18$ m/s².",
      commonMistakes: [
        { answer: 12, feedback: "That is $v(2) = 24 - 12$. Differentiate once more." },
        { answer: 4, feedback: "That is $x(2) = 16 - 12$, the position." },
        { answer: 24, feedback: "You dropped the $-3t^2$ term, whose second derivative is $-6$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-6-q2",
      variant: "practice",
      question: "For $x = t^3 - 6t^2 + 9t$, what is the distance covered between $t = 0$ and $t = 3$ s?",
      options: [
        { text: "$0$ m", feedback: "That is the displacement: $x(3) = x(0) = 0$. The particle went out to 4 m and back." },
        { text: "$4$ m", feedback: "That counts only one leg. Split at the turning point $t = 1$ s." },
        { text: "$8$ m", correct: true, feedback: "It turns at $t = 1$ ($x = 4$): 4 m out, 4 m back." },
        { text: "$12$ m", feedback: "That is the distance up to $t = 4$ s." },
      ],
      hint: "Distance needs the turning points: solve $v = \\frac{dx}{dt} = 0$, then add the magnitudes of the displacement on each leg (Worked example 1).",
    },
    {
      type: "quiz",
      id: "mfe1-6-q3",
      variant: "practice",
      question: "A particle has $a = -4x$ (SI) and speed 6 m/s at $x = 0$. How far from the origin does it get?",
      options: [
        { text: "$3$ m", correct: true, feedback: "$v^2 = 36 - 4x^2$; $v = 0$ at $x = 3$ m." },
        { text: "$1.5$ m", feedback: "That is $6/4$. Use $v\\,dv = a\\,dx$: $v^2 = 36 - 4x^2$." },
        { text: "$9$ m", feedback: "That is $36/4$, which is $x^2$. Take the root." },
        { text: "$\\sqrt6$ m", feedback: "Integrate carefully: $\\tfrac12v^2 - 18 = -2x^2$, so $x^2 = 9$." },
      ],
      hint: "Use $a = v\\frac{dv}{dx}$ and integrate from $x = 0$.",
    },
    {
      type: "numeric",
      id: "mfe1-6-q4",
      variant: "practice",
      question: "A body moving at 10 m/s has retardation given by $a = -2v$ (SI). It never stops in finite time, but the distance it travels approaches a limit. What is that total distance? Give your answer in metres.",
      answer: 5,
      unit: "m",
      hint: "$a$ depends on $v$ and you want a distance: use $a = v\\frac{dv}{dx}$.",
      solution: "$v\\frac{dv}{dx} = -2v \\Rightarrow \\frac{dv}{dx} = -2 \\Rightarrow v = 10 - 2x$.\n\nThe speed reaches zero at $x = 5$ m, which is $u/k$. (In time, $v = 10e^{-2t}$ never quite reaches zero, but the distance converges to 5 m.)",
      commonMistakes: [
        { answer: 25, feedback: "That is $u^2/2k$, the constant-retardation formula with $a = 2$. Here $a$ changes with $v$." },
        { answer: 20, feedback: "That is $u \\cdot k$. Distance is $u/k$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-6-q5",
      variant: "concept",
      question: "Why do we write $a = v\\frac{dv}{dx}$ when $a$ is given as a function of $x$?",
      options: [
        { text: "It is a new kind of acceleration that applies only to springs.", feedback: "It is the same acceleration, by the chain rule." },
        { text: "It removes $t$, giving a separable equation in $v$ and $x$.", correct: true, feedback: "With $a(x)$ known, $v\\,dv = a(x)\\,dx$ integrates directly." },
        { text: "Because $\\frac{dv}{dt}$ is undefined when $a$ depends on $x$.", feedback: "$\\frac{dv}{dt}$ is perfectly defined; it is just hard to integrate when $a$ is a function of $x$." },
      ],
      hint: "Think about what you need to separate the variables when $a$ is a function of $x$: the chain rule $\\frac{dv}{dt} = \\frac{dv}{dx}\\frac{dx}{dt}$ changes which variables appear.",
    },
    {
      type: "quiz",
      id: "mfe1-6-q6",
      variant: "practice",
      multiple: true,
      question: "A particle moves with $x = t^3 - 6t^2 + 9t$ (SI), as in worked example 1. Select all the statements that are true.",
      options: [
        { text: "It is momentarily at rest at $t = 1$ s and at $t = 3$ s.", correct: true, feedback: "$v = 3(t - 1)(t - 3)$ vanishes at both instants: these are the turning points." },
        { text: "Its acceleration is zero at $t = 2$ s.", correct: true, feedback: "$a = 6t - 12 = 0$ at $t = 2$ s, where the velocity is at its most negative." },
        { text: "It slows down throughout $1 < t < 3$ s.", feedback: "For $1 < t < 2$, $v < 0$ and $a < 0$: same signs, so it speeds up. It slows down only for $2 < t < 3$." },
        { text: "Its greatest speed between $t = 1$ s and $t = 3$ s is 3 m/s.", correct: true, feedback: "The speed peaks where $a = 0$: $|v(2)| = |12 - 24 + 9| = 3$ m/s." },
        { text: "Its displacement in the first 4 s is 12 m.", feedback: "12 m is the distance. The displacement is $x(4) - x(0) = 4$ m." },
      ],
      hint: "Get $v(t)$ and $a(t)$ first, then use the speeding-up rule.",
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
        "No formula sheet. Every question below can be rebuilt from two definitions, $v = \\frac{dx}{dt}$ and $a = \\frac{dv}{dt}$, plus the fact that areas undo slopes. $g = 10$ m/s² throughout.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 1 in six lines",
      content:
        "1. Displacement is change in position (signed); distance is path length. Average speed $=$ distance/time, never the average of speeds.\n2. $v$ = slope of $x$-$t$; $a$ = slope of $v$-$t$. Area under $v$-$t$ = displacement; area under $a$-$t$ = change in $v$.\n3. Speeding up iff $v$ and $a$ have the same sign. $v = 0$ does not mean $a = 0$.\n4. Constant $a$ only: $v = u + at$, $s = ut + \\frac12at^2$, $v^2 = u^2 + 2as$, $s_n = u + \\frac a2(2n - 1)$.\n5. Free fall: $a = -g$ always (up positive); $H = \\frac{u^2}{2g}$, $T = \\frac{2u}{g}$.\n6. Varying $a$: integrate; use $a = v\\frac{dv}{dx}$ when $a$ depends on $x$ or $v$.",
    },
    {
      type: "quiz",
      id: "mfe1-7-q1",
      variant: "mastery",
      question: "A car covers one third of a distance at 10 km/h and the remaining two thirds at 20 km/h. Its average speed is",
      options: [
        { text: "$15$ km/h", correct: true, feedback: "Times: $\\frac{d/3}{10} = \\frac{d}{30}$ and $\\frac{2d/3}{20} = \\frac{d}{30}$. Total $\\frac{d}{15}$, so $\\bar v = 15$ km/h." },
        { text: "$16.7$ km/h", feedback: "That is the distance-weighted average $\\frac13(10) + \\frac23(20)$. Speeds must be weighted by **time**." },
        { text: "$13.3$ km/h", feedback: "That is the equal-distance harmonic mean of 10 and 20. Here the distances are unequal." },
        { text: "$30$ km/h", feedback: "Speeds do not add." },
      ],
      hint: "Lesson 1.1: unequal distances, so average speed is total distance over total time, not the mean of the speeds.",
    },
    {
      type: "numeric",
      id: "mfe1-7-q2",
      variant: "mastery",
      question: "A body starting from rest with uniform acceleration covers 10 m during the 3rd second. What is its acceleration? Give your answer in m/s².",
      answer: 4,
      unit: "m/s²",
      hint: "The 3rd second runs from $t = 2$ s to $t = 3$ s: use $s_n = u + \\frac a2(2n - 1)$.",
      solution: "$s_3 = 0 + \\frac a2(2 \\cdot 3 - 1) = \\frac{5a}{2} = 10 \\Rightarrow a = 4$ m/s².\n\nCheck: $s(3) - s(2) = 18 - 8 = 10$ m.",
      commonMistakes: [
        { answer: 2.222, tolerance: 0.01, feedback: "That is $\\frac{20}{9}$: it uses $s = \\frac12at^2$ with $s = 10$, $t = 3$, treating 10 m as the total in 3 s." },
        { answer: 3.333, tolerance: 0.01, feedback: "That is $\\frac{10}{3}$. Use $(2n - 1) = 5$, not $2n = 6$." },
        { answer: 2, feedback: "You dropped the $\\frac12$: $\\frac a2 \\times 5 = 10$ gives $a = 4$." },
      ],
    },
    {
      type: "numeric",
      id: "mfe1-7-q3",
      variant: "mastery",
      question: "A driver at 30 m/s has a reaction time of 0.4 s, and the brakes give $6$ m/s² of retardation. What is the total stopping distance? Give your answer in metres.",
      answer: 87,
      unit: "m",
      hint: "Two stages: uniform motion during the reaction time, then constant retardation.",
      solution: "Reaction: the brakes are not yet on, so the car moves $30 \\times 0.4 = 12$ m.\n\nBraking: $s = \\frac{u^2}{2|a|} = \\frac{900}{12} = 75$ m.\n\nTotal: $12 + 75 = 87$ m.",
      commonMistakes: [
        { answer: 75, feedback: "That is the braking distance only. The car moves $30 \\times 0.4 = 12$ m before the brakes act." },
        { answer: 162, feedback: "You used $u^2/|a|$ without the 2. Braking distance is $\\frac{u^2}{2|a|} = 75$ m." },
        { answer: 81, feedback: "The reaction phase is at full speed, $30 \\times 0.4 = 12$ m, not $\\frac12 \\times 30 \\times 0.4 = 6$ m." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-7-q4",
      variant: "mastery",
      question: "A ball is thrown up at 10 m/s from the edge of a roof 15 m high. How long before it hits the ground below?",
      options: [
        { text: "$1$ s", feedback: "That is the magnitude of the rejected negative root. Check: $10(1) - 5(1) = 5$, not $-15$." },
        { text: "$\\sqrt3$ s", feedback: "That treats the ball as dropped from rest. It first rises for 1 s." },
        { text: "$2$ s", feedback: "That is the time to return to roof level. It still has 15 m to fall." },
        { text: "$3$ s", correct: true, feedback: "$-15 = 10t - 5t^2 \\Rightarrow t^2 - 2t - 3 = 0 \\Rightarrow t = 3$ s." },
      ],
      hint: "Throws from a height (lesson 1.5): mind the sign of the final displacement.",
    },
    {
      type: "quiz",
      id: "mfe1-7-q5",
      variant: "mastery",
      question: "Ball A is dropped from the top of a 100 m tower. At the same instant ball B is thrown up from the foot of the tower at 25 m/s along the same vertical line. When and where do they meet?",
      options: [
        { text: "After 4 s, 80 m above the ground", feedback: "80 m is how far A has **fallen**. It is $100 - 80 = 20$ m above the ground." },
        { text: "After 4 s, 20 m above the ground", correct: true, feedback: "Relative to A, B moves up at a steady 25 m/s (both accelerate at $g$), so $t = 100/25 = 4$ s. A has fallen $5(16) = 80$ m: 20 m above ground." },
        { text: "After 2 s, 50 m above the ground", feedback: "They do not meet halfway; B slows while A speeds up. Use the relative velocity 25 m/s." },
        { text: "After 5 s, at ground level", feedback: "B would be back at the ground at 5 s, but they meet earlier." },
      ],
      hint: "Both balls have the same acceleration $g$. How does the gap between them change with time?",
    },
    {
      type: "quiz",
      id: "mfe1-7-q6",
      variant: "mastery",
      question: "Starting from rest, a body falls freely. What is the ratio of the distance fallen in the first 3 s to that in the next 3 s?",
      options: [
        { text: "$1 : 2$", feedback: "Distance goes as $t^2$: $s(6) = 4\\,s(3)$, so the second interval is $3\\,s(3)$." },
        { text: "$1 : 4$", feedback: "That compares $s(3)$ with $s(6)$, the total. The **next** 3 s is $s(6) - s(3)$." },
        { text: "$1 : 1$", feedback: "The body speeds up, so it covers more in the second interval." },
        { text: "$1 : 3$", correct: true, feedback: "$s(3) = 45$ m, $s(6) - s(3) = 180 - 45 = 135$ m: $45 : 135 = 1 : 3$." },
      ],
      hint: "Distances fallen from rest in successive equal times (lesson 1.5).",
    },
    {
      type: "quiz",
      id: "mfe1-7-q7",
      variant: "mastery",
      question: "A particle moves with $x = t^3 - 9t^2 + 24t$ (SI). What distance does it cover in the first 5 s?",
      options: [
        { text: "$28$ m", correct: true, feedback: "$v = 3(t - 2)(t - 4)$, so it turns at $t = 2$ ($x = 20$) and $t = 4$ ($x = 16$), and $x(5) = 20$: $20 + 4 + 4 = 28$ m." },
        { text: "$20$ m", feedback: "That is the displacement $x(5) - x(0)$." },
        { text: "$24$ m", feedback: "That covers only up to $t = 4$ s; from 4 to 5 s it goes another 4 m." },
        { text: "$56$ m", feedback: "You added the positions $x(2) + x(4) + x(5)$. Add the distances between them instead." },
      ],
      hint: "Distance is not displacement: find when the particle turns round in the first 5 s and add the distance on each leg.",
    },
    {
      type: "quiz",
      id: "mfe1-7-q8",
      variant: "mastery",
      question: "A boat's engine is cut at 20 m/s and water drag gives $a = -0.5v$ (SI). How far does it coast?",
      options: [
        { text: "$10$ m", feedback: "That is $u \\times k$. The distance is $u/k$." },
        { text: "$400$ m", feedback: "That uses the constant-retardation formula $u^2/(2 \\times 0.5)$. The retardation here falls as the boat slows." },
        { text: "$40$ m", correct: true, feedback: "$v\\frac{dv}{dx} = -0.5v \\Rightarrow v = 20 - 0.5x$, which reaches zero at $x = 40$ m." },
        { text: "It coasts forever.", feedback: "It never stops in finite time, but the total distance is finite: $u/k$." },
      ],
      hint: "Acceleration as a function of velocity (lesson 1.6).",
    },
    {
      type: "quiz",
      id: "mfe1-7-q9",
      variant: "mastery",
      question: "A particle has $a = -9x$ (SI) and speed 12 m/s at $x = 0$. What is the greatest distance it reaches from the origin?",
      options: [
        { text: "$\\frac43$ m", feedback: "That is $12/9$. Use $v\\,dv = a\\,dx$: $v^2 = 144 - 9x^2$." },
        { text: "$16$ m", feedback: "That is $x^2$. Take the root." },
        { text: "$4$ m", correct: true, feedback: "$v^2 = 144 - 9x^2$, zero when $x^2 = 16$, so $x = 4$ m." },
        { text: "$8$ m", feedback: "Recompute: $9x^2 = 144$ gives $x^2 = 16$." },
      ],
      hint: "Acceleration as a function of position (lesson 1.6).",
    },
    {
      type: "numeric",
      id: "mfe1-7-q10",
      variant: "mastery",
      question: "A bullet moving through air has $a = -kv^2$ with $k = 0.01$ m⁻¹. Over what distance does its speed halve? ($\\ln 2 \\approx 0.693$) Give your answer in metres.",
      answer: 69.3,
      relTolerance: 0.01,
      unit: "m",
      hint: "Use $a = v\\frac{dv}{dx}$ and separate the variables.",
      solution: "$v\\frac{dv}{dx} = -kv^2 \\Rightarrow \\frac{dv}{v} = -k\\,dx \\Rightarrow v = ue^{-kx}$.\n\nHalf speed when $e^{-kx} = \\frac12$, i.e. $kx = \\ln 2$: $x = \\frac{0.693}{0.01} = 69.3$ m. Surprisingly, this does not depend on the initial speed $u$.",
      commonMistakes: [
        { answer: 50, feedback: "That assumes the speed falls linearly with distance. With $a \\propto v^2$ it falls exponentially." },
        { answer: 100, feedback: "That is $1/k$, where the speed has dropped to $u/e$, not $u/2$." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-7-q11",
      variant: "mastery",
      question: "A lift is accelerating **upward** at 2 m/s². A bolt comes loose from its ceiling, 3 m above the floor. How long does it take to hit the floor?",
      options: [
        { text: "$\\sqrt{0.6} \\approx 0.77$ s", feedback: "That is the answer for a lift at rest or moving steadily. The floor is also accelerating upward." },
        { text: "$\\sqrt{0.75} \\approx 0.87$ s", feedback: "That uses $g - a = 8$ m/s². An upward-accelerating floor closes the gap **faster**, so add." },
        { text: "It depends on the lift's speed.", feedback: "Relative to the lift the bolt starts from rest whatever the lift's speed; only accelerations matter." },
        { text: "$\\sqrt{0.5} \\approx 0.71$ s", correct: true, feedback: "Relative to the lift, the bolt starts at rest and the floor rushes up to meet it: relative acceleration $g + a = 12$ m/s². $3 = \\frac12(12)t^2 \\Rightarrow t^2 = 0.5$." },
      ],
      hint: "Measure everything relative to the lift floor: what are the bolt's initial velocity and acceleration relative to it?",
    },
    {
      type: "numeric",
      id: "mfe1-7-q12",
      variant: "mastery",
      question: "A particle starts from rest. Its acceleration is $2$ m/s² for 5 s, then $-1$ m/s² until it stops. What is its total displacement? Give your answer in metres.",
      answer: 75,
      unit: "m",
      hint: "Sketch the $v$-$t$ graph: it is a single triangle.",
      solution: "After 5 s, $v_{\\max} = 2 \\times 5 = 10$ m/s. At $-1$ m/s² it then takes 10 s to stop, so the motion lasts 15 s.\n\nArea of the $v$-$t$ triangle $= \\frac12 \\times 15 \\times 10 = 75$ m.",
      commonMistakes: [
        { answer: 25, feedback: "That is only the accelerating phase, $\\frac12 \\times 5 \\times 10$." },
        { answer: 50, feedback: "That is only the slowing phase, $\\frac12 \\times 10 \\times 10$." },
        { answer: 150, feedback: "That is base × height without the $\\frac12$ for the triangle." },
      ],
    },
    {
      type: "quiz",
      id: "mfe1-7-q13",
      variant: "mastery",
      multiple: true,
      question: "A particle's $v$-$t$ graph is a straight line from $v = +12$ m/s at $t = 0$ to $v = -12$ m/s at $t = 6$ s. Select all the statements that are true.",
      options: [
        { text: "Its acceleration is $-4$ m/s² throughout.", correct: true, feedback: "Slope $= \\frac{-12 - 12}{6} = -4$ m/s², the same at every instant of a straight line." },
        { text: "It turns round at $t = 3$ s.", correct: true, feedback: "The line crosses $v = 0$ halfway, at $t = 3$ s: the velocity changes sign there." },
        { text: "Its displacement over the 6 s is zero.", correct: true, feedback: "The triangle above the axis ($+18$ m) and the one below ($-18$ m) cancel." },
        { text: "The distance it covers in the 6 s is 18 m.", feedback: "That is one triangle. Distance counts both as positive: $18 + 18 = 36$ m." },
        { text: "Its acceleration is zero at $t = 3$ s.", feedback: "Only the velocity is zero at $t = 3$ s. The slope of the $v$-$t$ line is still $-4$ m/s² there." },
      ],
      hint: "Lesson 1.3: slope of the $v$-$t$ graph for acceleration, signed area for displacement, unsigned area for distance.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "One line was enough for every problem in this chapter. Chapter 2 frees the particle into a plane. The trick is that nothing new is needed: split the motion into $x$ and $y$, solve two straight-line problems, and let time tie them together.",
    },
  ]),
};

export const mfeChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
