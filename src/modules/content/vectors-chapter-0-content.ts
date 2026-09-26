import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Vector Algebra Chapter 0 — What a Vector Is.
 * Quantities where direction matters; the free arrow defined only by
 * magnitude and direction; adding, subtracting and scaling arrows
 * geometrically, before any coordinates appear.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "scalars-and-vectors",
  title: "0.1 · Scalars and Vectors",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/va-0-what-a-vector-is.mp4",
      poster: "/videos/va-0-what-a-vector-is.jpg",
      title: "Chapter 0 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "You leave home and walk 3 km. Then you walk another 4 km. How far are you from home now?\n\nThe tempting answer is 7 km. But that is only right if both legs went the same way. Walk 3 km east and then 4 km back west and you finish 1 km from home. Walk 3 km east and then 4 km north and you finish 5 km away. The honest answer is \"anywhere from 1 km to 7 km, depending on which way you turned\".",
    },
    {
      type: "text",
      content:
        "Try it. The first leg is fixed at 3 units east. Drag the tip of the second leg around; keep it 4 units long by putting it on one of the four grid points exactly 4 away (straight up, down, left or right), and watch the straight-line distance from home, the thick arrow.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "add",
        a: [3, 0],
        b: [0, 4],
        draggable: ["b"],
        window: { xmin: -3, xmax: 8, ymin: -5, ymax: 5 },
        readouts: ["magnitude", "sum"],
        labels: { a: "\\vec{p}", b: "\\vec{q}" },
        caption:
          "Leg 1 is fixed. Drag the tip of leg 2. The thick arrow is where you actually end up: its length is 7 only when both legs point the same way.",
      },
    },
    {
      type: "text",
      content:
        "Three positions are worth finding on purpose:\n\n**Same direction** (second leg east): you end $3 + 4 = 7$ km away.\n\n**Opposite direction** (second leg west): you end $4 - 3 = 1$ km away.\n\n**At right angles** (second leg north): the two legs and the line home form a right triangle, so the distance is $\\sqrt{3^2 + 4^2} = 5$ km.\n\nThe lengths alone did not decide the answer. The *directions* did. That is the whole reason vectors exist.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Scalar and vector",
      content:
        "A **scalar** is a quantity that is completely described by a single number (with a unit): mass 5 kg, temperature 30 °C, time 2 s.\n\nA **vector** is a quantity that needs a number *and* a direction: a displacement of 5 km north-east, a velocity of 20 m/s downward, a force of 10 N to the left. Vectors combine by the rules of arrows, which this chapter builds, not by plain arithmetic.",
    },
    {
      type: "text",
      content:
        "Physics is full of pairs where one member is a scalar and the other is its vector cousin. The scalar tells you *how much*; the vector tells you *how much and which way*.",
    },
    {
      type: "table",
      headers: ["Scalar", "Its vector partner", "What the direction adds"],
      rows: [
        ["Distance (length of the path walked)", "Displacement (straight arrow from start to finish)", "Where you ended up, not how much you walked"],
        ["Speed (how fast)", "Velocity (how fast, and which way)", "A car turning a corner at a steady 40 km/h has constant speed but changing velocity"],
        ["Mass (amount of matter, in kg)", "Weight (the gravitational force, in N, pointing down)", "Weight always points towards the centre of the Earth; mass has no direction"],
      ],
    },
    {
      type: "text",
      content:
        "Here is a wider sorting of quantities you will meet in school physics and mathematics.",
    },
    {
      type: "table",
      headers: ["Scalars", "Vectors"],
      rows: [
        ["Mass, time, temperature", "Displacement, velocity, acceleration"],
        ["Distance, speed", "Force, weight"],
        ["Volume, density, energy, work", "Momentum, electric field"],
        ["Electric current, pressure", "Torque, magnetic field"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Having a direction is not enough",
      content:
        "Electric current flows *along* a wire, so it seems to have a direction, yet it is a scalar. The test for a vector is not \"can I point somewhere?\" but \"do two of them combine by the arrow rule?\" At a junction, currents of 2 A and 3 A entering always give 5 A leaving, whatever the angle between the wires. They add like plain numbers, so current is a scalar.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — the running track.** An athlete runs one full lap of a 400 m track and stops where she started.\n\n**Step 1.** Distance is the length of the path: 400 m.\n\n**Step 2.** Displacement is the arrow from start to finish. Start and finish are the same point, so the displacement is zero.\n\n**Step 3.** If the lap took 50 s, her average speed was $\\frac{400}{50} = 8$ m/s, but her average velocity was 0. Speed rewards effort; velocity only cares where you got to.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — half a circle.** A cyclist rides half-way round a circular track of radius 7 m. Find the distance and the size of the displacement (take $\\pi = \\frac{22}{7}$).\n\n**Step 1.** Distance is half the circumference: $\\pi r = \\frac{22}{7} \\times 7 = 22$ m.\n\n**Step 2.** Half-way round a circle you are at the diametrically opposite point, so the displacement is straight across the diameter: $2r = 14$ m.\n\n**Step 3.** Check: the displacement (14 m) is shorter than the distance (22 m). It always is, unless the path was a straight line in one direction, because a straight line is the shortest route between two points.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — right angles.** You walk 6 km north and then 8 km east. The legs are perpendicular, so the displacement is the hypotenuse: $\\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$ km, pointing somewhere between north and east. The distance walked is $6 + 8 = 14$ km.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — a flight with a detour.** A small aircraft flies 400 km due west, then 300 km due south, and the whole trip takes 2 hours. Find the distance flown, the displacement (size and direction), the average speed and the average velocity.\n\n**Step 1 (distance).** Add the leg lengths: $400 + 300 = 700$ km.\n*Why this step:* distance is a scalar, the length of the path actually flown, so plain addition is correct here.\n\n**Step 2 (size of displacement).** West and south are at right angles, so the displacement is the hypotenuse of a right triangle with legs 400 and 300:",
    },
    {
      type: "math",
      latex: "|\\vec d| = \\sqrt{400^2 + 300^2} = \\sqrt{160000 + 90000} = \\sqrt{250000} = 500 \\text{ km}",
    },
    {
      type: "text",
      content:
        "*Why this step:* the displacement is the single straight arrow from start to finish, and with perpendicular legs that arrow closes a right triangle.\n\n**Step 3 (direction).** Measure the angle $\\alpha$ from due west towards south: $\\tan\\alpha = \\dfrac{300}{400} = 0.75$, so $\\alpha \\approx 36.9^\\circ$. The displacement is 500 km, about $36.9^\\circ$ south of west.\n*Why this step:* a vector answer is incomplete without its direction. \"500 km\" alone is only the magnitude.\n\n**Step 4 (averages).** Average speed $= \\dfrac{700}{2} = 350$ km/h. Average velocity $= \\dfrac{500 \\text{ km}}{2 \\text{ h}} = 250$ km/h, about $36.9^\\circ$ south of west.\n\n**Check.** The displacement (500 km) is less than the distance (700 km), as it must be for a path that turns.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — exam style: an arc of a circle.** A particle moves along a circle of radius $r$ and turns through an angle $\\theta$ about the centre. Show that the size of its displacement is $2r\\sin\\frac{\\theta}{2}$, and use it for $r = 10$ m, $\\theta = 60^\\circ$.\n\n**Step 1 (picture).** Let the centre be $O$, the start $A$ and the finish $B$. Then $OA = OB = r$ and $\\angle AOB = \\theta$. The displacement is the chord $\\overrightarrow{AB}$.\n\n**Step 2 (split the triangle).** Triangle $OAB$ is isosceles, so the perpendicular from $O$ to $AB$ bisects both the chord and the angle $\\theta$. Each half is a right triangle with hypotenuse $r$ and angle $\\frac{\\theta}{2}$ at $O$, so each half-chord is $r\\sin\\frac{\\theta}{2}$.\n*Why this step:* cutting an isosceles triangle down its axis of symmetry turns it into two right triangles, where plain trigonometry applies.",
    },
    {
      type: "math",
      latex: "|\\overrightarrow{AB}| = 2r\\sin\\frac{\\theta}{2}, \\qquad \\text{distance along the arc} = r\\theta \\;\\;(\\theta \\text{ in radians})",
    },
    {
      type: "text",
      content:
        "**Step 3 (numbers).** For $r = 10$ m and $\\theta = 60^\\circ$: displacement $= 2 \\times 10 \\times \\sin 30^\\circ = 10$ m. The arc length is $10 \\times \\frac{\\pi}{3} \\approx 10.47$ m.\n\n**Check.** For a half-turn, $\\theta = 180^\\circ$ gives $2r\\sin 90^\\circ = 2r$, the diameter, as in Worked example 2. For a full turn, $\\theta = 360^\\circ$ gives $2r\\sin 180^\\circ = 0$, as in Worked example 1. At $60^\\circ$ the triangle $OAB$ is equilateral, so a chord equal to the radius is exactly right.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The size of a combined displacement",
      content:
        "Two legs $\\vec p$ and $\\vec q$ can combine to any length from $\\big||\\vec p| - |\\vec q|\\big|$ (opposite directions) to $|\\vec p| + |\\vec q|$ (same direction). For 3 and 4 that is every length from 1 to 7. Lesson 0.4 proves this in general.",
    },
    {
      type: "quiz",
      id: "va0-1-q1",
      variant: "concept",
      question:
        "A displacement of 3 m is followed by a displacement of 4 m. Which statement is correct?",
      options: [
        {
          text: "The total displacement has size 7 m.",
          feedback: "Only if both point the same way. Put them at right angles and you get 5 m.",
        },
        {
          text: "The total displacement can be any size from 1 m to 7 m, depending on the directions.",
          correct: true,
          feedback: "Right. Arrows do not add like plain numbers; the angle between them decides the answer.",
        },
        {
          text: "The total displacement is always 5 m, by Pythagoras.",
          feedback: "Pythagoras applies only when the two legs are at right angles.",
        },
        {
          text: "The total displacement is 1 m, because the second cancels the first.",
          feedback: "That is the special case where they point in opposite directions.",
        },
      ],
      hint: "Try the three special positions in the interactive: same way, opposite way, right angle.",
    },
    {
      type: "quiz",
      id: "va0-1-q2",
      variant: "practice",
      question: "Which of these quantities is a vector?",
      options: [
        { text: "Temperature", feedback: "A temperature of 30 °C has no direction. Scalar." },
        { text: "Time", feedback: "Time is a single number with a unit. Scalar." },
        {
          text: "Acceleration",
          correct: true,
          feedback: "Acceleration has a size and a direction: braking accelerates you backwards.",
        },
        { text: "Energy", feedback: "Energy is a single number of joules. Scalar." },
      ],
    },
    {
      type: "quiz",
      id: "va0-1-q3",
      variant: "practice",
      question: "Which of these quantities is a scalar?",
      options: [
        { text: "Weight", feedback: "Weight is a force, so it points (downwards). Vector." },
        { text: "Velocity", feedback: "Velocity is speed plus direction. Vector." },
        {
          text: "Speed",
          correct: true,
          feedback: "Speed is just \"how fast\", with no direction attached.",
        },
        { text: "Momentum", feedback: "Momentum is mass times velocity, so it inherits velocity's direction. Vector." },
      ],
    },
    {
      type: "quiz",
      id: "va0-1-q4",
      variant: "practice",
      question:
        "A boat travels 5 km east and then 12 km north. How far is it from its starting point?",
      options: [
        { text: "17 km", feedback: "That is the distance travelled, which would be the displacement only if both legs were in the same direction." },
        { text: "7 km", feedback: "That would need the legs to point in opposite directions." },
        {
          text: "13 km",
          correct: true,
          feedback: "The legs are perpendicular: $\\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$ km.",
        },
        { text: "$\\sqrt{17}$ km", feedback: "Square the lengths before adding: $5^2 + 12^2$, not $5 + 12$." },
      ],
      hint: "East and north are at right angles.",
    },
    {
      type: "quiz",
      id: "va0-1-q5",
      variant: "concept",
      question:
        "Electric current flows along a wire in a definite direction. Why is it still classed as a scalar?",
      options: [
        {
          text: "Because currents meeting at a junction add as plain numbers, whatever the angle between the wires.",
          correct: true,
          feedback: "Right. A vector is something that combines by the arrow rule; current does not.",
        },
        {
          text: "Because it is measured in amperes.",
          feedback: "Units do not decide it. Force is measured in newtons and is a vector.",
        },
        {
          text: "Because it can only flow in one direction.",
          feedback: "Current can flow either way along a wire. The deciding fact is how currents combine.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va0-1-q6",
      variant: "practice",
      question:
        "A runner completes exactly one lap of a 400 m track in 80 s. What is her average velocity over the lap?",
      options: [
        { text: "5 m/s", feedback: "That is her average speed: distance divided by time." },
        {
          text: "0 m/s",
          correct: true,
          feedback: "She finished where she started, so her displacement is zero, and so is her average velocity.",
        },
        { text: "400 m/s", feedback: "Divide by the time, and use displacement rather than distance." },
      ],
    },
    {
      type: "quiz",
      id: "va0-1-q7",
      variant: "practice",
      question:
        "A delivery van drives 9 km north and then 12 km west. How far is it, in a straight line, from where it started?",
      options: [
        { text: "21 km", feedback: "That is the distance driven. It equals the displacement only if both legs point the same way." },
        { text: "3 km", feedback: "That would need the two legs to point in opposite directions." },
        {
          text: "15 km",
          correct: true,
          feedback: "North and west are perpendicular: $\\sqrt{9^2 + 12^2} = \\sqrt{81 + 144} = \\sqrt{225} = 15$ km.",
        },
        { text: "$\\sqrt{21}$ km", feedback: "Square each leg before adding: $81 + 144$, not $9 + 12$." },
      ],
      hint: "Sketch the two legs. They form two sides of a right triangle.",
    },
    {
      type: "quiz",
      id: "va0-1-q8",
      variant: "practice",
      question:
        "A child on a merry-go-round of radius 6 m is carried a quarter of the way round. What is the size of her displacement?",
      options: [
        {
          text: "$6\\sqrt2$ m",
          correct: true,
          feedback: "Chord $= 2r\\sin\\frac{\\theta}{2} = 2 \\times 6 \\times \\sin 45^\\circ = 6\\sqrt2 \\approx 8.49$ m. Equivalently, the two radii are perpendicular, so Pythagoras gives $\\sqrt{36 + 36}$.",
        },
        { text: "$3\\pi$ m", feedback: "That is the arc length, $\\frac14 \\times 2\\pi \\times 6$: the distance travelled, not the displacement." },
        { text: "12 m", feedback: "That is the diameter, the displacement after a half-turn." },
        { text: "6 m", feedback: "A chord equal to the radius needs a $60^\\circ$ turn. A quarter-turn is $90^\\circ$." },
      ],
      hint: "Join the start and finish to the centre. What angle do the two radii make?",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "anatomy-of-an-arrow",
  title: "0.2 · Anatomy of an Arrow",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A vector is a size together with a direction. The natural picture for that is an arrow: its length shows the size, and the way it points shows the direction. Before we can calculate with arrows, we need names for their parts.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Directed line segment",
      content:
        "A line segment with a chosen direction, from an **initial point** $A$ (the tail) to a **terminal point** $B$ (the tip). It is written $\\overrightarrow{AB}$, with the arrow over the letters showing the order: start first, finish second.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Magnitude",
      content:
        "The **magnitude** (or length, or modulus) of $\\overrightarrow{AB}$ is the distance from $A$ to $B$. It is written $|\\overrightarrow{AB}|$, or $|\\vec a|$ for a vector named $\\vec a$. A magnitude is a distance, so it is never negative.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Naming vectors",
      content:
        "A single vector is often given a single letter: $\\vec a$, $\\vec b$, $\\vec v$. Printed books use bold type, $\\mathbf{a}$, for the same thing. When writing by hand, always put the arrow on top: without it, $a$ is just a number.",
    },
    {
      type: "text",
      content:
        "**Direction** needs a reference. On a map we say \"30° north of east\"; on a grid we measure the angle anticlockwise from a fixed horizontal line. Either way, direction is an angle measured from something agreed in advance.",
    },
    {
      type: "text",
      content:
        "Order matters. $\\overrightarrow{AB}$ goes from $A$ to $B$; $\\overrightarrow{BA}$ goes from $B$ to $A$. They have the same length but point in opposite directions, so they are different vectors:",
    },
    {
      type: "math",
      latex:
        "|\\overrightarrow{AB}| = |\\overrightarrow{BA}| \\qquad\\text{but}\\qquad \\overrightarrow{AB} \\neq \\overrightarrow{BA}",
    },
    {
      type: "text",
      content:
        "Now the key question. Suppose two arrows have the same length and point the same way but start at different places. Are they the same vector?\n\nThink about displacement. \"Walk 3 km north-east\" is the same instruction whether you start in Delhi or in Chennai. The instruction says nothing about where you begin. So in mathematics we decide that **an arrow is defined by its magnitude and direction alone**. Slide it anywhere, without turning or stretching it, and it is still the same vector.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "free",
        a: [3, 2],
        tail: [-3, -2],
        draggable: ["tail"],
        readouts: ["magnitude", "angle"],
        caption:
          "Drag the tail anywhere. The arrow slides without turning or stretching, and its length and angle never change: it is the same vector wherever it sits. The faint dashed arrow is a copy drawn from the origin.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Free vector",
      content:
        "A vector that is determined only by its magnitude and direction, with no fixed initial point. All the vectors in this course are free vectors: any arrow of the right length and direction, placed anywhere, represents the same vector.\n\nThe contrast is a **localised vector**, which is tied to a particular line of action or point of application, such as a force pushing on one particular point of a door.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a vector lives at one particular place\"",
      content:
        "An arrow on paper has to be drawn somewhere, but the *vector* is not tied to that spot. Two arrows drawn in different places with the same length and direction are the same vector. This freedom is what lets us move arrows tip to tail when we add them in Lesson 0.4.\n\nPhysics sometimes cares where a force acts (a push at the edge of a door turns it; the same push at the hinge does not). That extra information, the point of application, is carried separately. The vector itself is still just size and direction.",
    },
    {
      type: "text",
      content:
        "Now you can drag both the tail and the tip. Moving the tail slides the arrow; moving the tip changes the vector itself.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "free",
        a: [4, 0],
        tail: [-2, 1],
        draggable: ["tail", "a"],
        readouts: ["magnitude", "angle"],
        caption:
          "Drag the tip to change the length or the angle, which gives a different vector. Drag the tail and only the position changes, which leaves the vector as it was.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1 — a square.** $ABCD$ is a square with side 2, labelled anticlockwise from the bottom-left corner $A$.\n\n**Step 1.** $\\overrightarrow{AB}$ runs along the bottom edge, left to right. $\\overrightarrow{DC}$ runs along the top edge, also left to right.\n\n**Step 2.** Both have length 2 and point in the same direction, so $\\overrightarrow{AB} = \\overrightarrow{DC}$, even though they share no points.\n\n**Step 3.** $\\overrightarrow{CD}$ runs along the top edge right to left. It has the same length as $\\overrightarrow{AB}$ but points the opposite way, so $\\overrightarrow{CD} \\neq \\overrightarrow{AB}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — a diagonal.** $PQRS$ is a rectangle with $PQ = 8$ and $QR = 6$. Find $|\\overrightarrow{PR}|$ and $|\\overrightarrow{RP}|$.\n\n**Step 1.** $PR$ is a diagonal, the hypotenuse of right triangle $PQR$: $\\sqrt{8^2 + 6^2} = \\sqrt{100} = 10$.\n\n**Step 2.** $|\\overrightarrow{PR}| = 10$, and $|\\overrightarrow{RP}| = 10$ too: reversing an arrow does not change its length.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — the return voyage.** A ship sails from port $P$ to port $Q$: 10 km in the direction $30^\\circ$ north of east. Describe the vector $\\overrightarrow{QP}$ for the trip home, in words and as an angle measured anticlockwise from east.\n\n**Step 1 (magnitude).** $|\\overrightarrow{QP}| = |\\overrightarrow{PQ}| = 10$ km.\n*Why this step:* the journey home covers the same segment, so the length is unchanged.\n\n**Step 2 (direction).** Reversing an arrow turns it through $180^\\circ$. Measured anticlockwise from east, $\\overrightarrow{PQ}$ is at $30^\\circ$, so $\\overrightarrow{QP}$ is at $30^\\circ + 180^\\circ = 210^\\circ$.\n*Why this step:* opposite directions differ by exactly half a turn, whatever the starting angle.\n\n**Step 3 (in words).** $210^\\circ$ is $30^\\circ$ past due west, turning towards south: $\\overrightarrow{QP}$ is 10 km, $30^\\circ$ south of west.\n\n**Check.** \"North of east\" became \"south of west\": *both* compass words flip, and the $30^\\circ$ stays the same.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — exam style: equal arrows inside a triangle.** $ABC$ is an equilateral triangle of side 6 and $M$ is the midpoint of $BC$. (a) Is $\\overrightarrow{BM} = \\overrightarrow{MC}$? (b) Is $\\overrightarrow{MB} = \\overrightarrow{MC}$? (c) Find $|\\overrightarrow{AM}|$ and $|\\overrightarrow{MA}|$.\n\n**Step 1 (a).** $\\overrightarrow{BM}$ and $\\overrightarrow{MC}$ both lie along $BC$, both point from the $B$ end towards the $C$ end, and both have length 3. Same magnitude, same direction: **equal**, even though one starts at $B$ and the other at $M$.\n*Why this step:* this is the free-vector idea. Equality asks only about length and direction.\n\n**Step 2 (b).** $\\overrightarrow{MB}$ and $\\overrightarrow{MC}$ both start at $M$ and both have length 3, but one points towards $B$ and the other towards $C$. They are **not equal**; in fact $\\overrightarrow{MB} = -\\overrightarrow{MC}$.\n\n**Step 3 (c).** The median of an equilateral triangle is perpendicular to the base, so triangle $AMB$ has a right angle at $M$ with hypotenuse $AB = 6$ and leg $BM = 3$:",
    },
    {
      type: "math",
      latex: "|\\overrightarrow{AM}| = \\sqrt{6^2 - 3^2} = \\sqrt{27} = 3\\sqrt3 \\approx 5.20, \\qquad |\\overrightarrow{MA}| = 3\\sqrt3",
    },
    {
      type: "text",
      content:
        "*Why this step:* a magnitude is just a distance, so all the usual geometry (Pythagoras, symmetry) is available to compute it. Reversing to $\\overrightarrow{MA}$ changes the direction only.",
    },
    {
      type: "quiz",
      id: "va0-2-q1",
      variant: "concept",
      question:
        "Arrow 1 starts at the origin; arrow 2 starts 5 units to the right. Both are 3 units long and point straight up. Which is true?",
      options: [
        {
          text: "They represent the same vector.",
          correct: true,
          feedback: "Same magnitude, same direction. Where an arrow is drawn does not change the vector.",
        },
        {
          text: "They are different vectors because they start at different points.",
          feedback: "That is the misconception this lesson addresses. A vector is only a magnitude and a direction.",
        },
        {
          text: "They are different vectors because arrow 2 is further from the origin.",
          feedback: "Distance from the origin is about where the arrow sits, not about the vector.",
        },
      ],
    },
    {
      type: "quiz",
      id: "va0-2-q2",
      variant: "practice",
      question: "If $|\\overrightarrow{AB}| = 7$, what is $|\\overrightarrow{BA}|$?",
      options: [
        { text: "$-7$", feedback: "A magnitude is a length and is never negative. The *direction* reverses, not the length." },
        { text: "$7$", correct: true, feedback: "Same segment, same length; only the direction flips." },
        { text: "$0$", feedback: "$\\overrightarrow{AB}$ and $\\overrightarrow{BA}$ are both 7 long. You may be thinking of their sum, which is the zero vector." },
        { text: "It cannot be determined", feedback: "The distance from $B$ to $A$ equals the distance from $A$ to $B$." },
      ],
    },
    {
      type: "quiz",
      id: "va0-2-q3",
      variant: "practice",
      question:
        "$ABCD$ is a square labelled anticlockwise. Which vector equals $\\overrightarrow{AB}$?",
      options: [
        { text: "$\\overrightarrow{CD}$", feedback: "Same length, but it runs the opposite way along the opposite side." },
        { text: "$\\overrightarrow{DC}$", correct: true, feedback: "Opposite side, same length, same direction." },
        { text: "$\\overrightarrow{BC}$", feedback: "Same length, but it is turned through 90°." },
        { text: "$\\overrightarrow{BA}$", feedback: "That is the same segment traversed backwards." },
      ],
      hint: "Look for the side parallel to $AB$ traced in the same direction.",
    },
    {
      type: "quiz",
      id: "va0-2-q4",
      variant: "concept",
      question: "What does it take for two arrows to represent the same vector?",
      options: [
        { text: "The same length only.", feedback: "Arrows of the same length can point anywhere. Direction must match too." },
        { text: "The same initial point.", feedback: "Where the arrow starts does not matter for a free vector." },
        {
          text: "The same length and the same direction.",
          correct: true,
          feedback: "That is all a free vector is.",
        },
        { text: "The same initial point and the same terminal point.", feedback: "That describes the same *arrow*. Different arrows can still be the same vector." },
      ],
    },
    {
      type: "quiz",
      id: "va0-2-q5",
      variant: "practice",
      question:
        "A rectangle $PQRS$ has $PQ = 5$ and $QR = 12$. What is $|\\overrightarrow{QS}|$?",
      options: [
        { text: "17", feedback: "Adding the sides gives the path around the corner, not the diagonal." },
        { text: "13", correct: true, feedback: "$QS$ is a diagonal: $\\sqrt{5^2 + 12^2} = 13$." },
        { text: "$\\sqrt{17}$", feedback: "Square the sides first: $25 + 144 = 169$." },
      ],
    },
    {
      type: "quiz",
      id: "va0-2-q6",
      variant: "practice",
      question:
        "$\\overrightarrow{AB}$ points at $50^\\circ$ measured anticlockwise from east. At what angle (anticlockwise from east) does $\\overrightarrow{BA}$ point?",
      options: [
        { text: "$230^\\circ$", correct: true, feedback: "Reversing an arrow turns it through half a turn: $50^\\circ + 180^\\circ = 230^\\circ$, which is $50^\\circ$ south of west." },
        { text: "$130^\\circ$", feedback: "$180^\\circ - 50^\\circ$ is the mirror image in the north-south line, not the reverse. The reverse must differ by exactly $180^\\circ$." },
        { text: "$-50^\\circ$", feedback: "That is the mirror image in the east-west line. The reversed arrow points into the opposite quarter." },
        { text: "$50^\\circ$", feedback: "Same angle means same direction. $\\overrightarrow{BA}$ points the opposite way to $\\overrightarrow{AB}$." },
      ],
      hint: "Opposite directions differ by $180^\\circ$.",
    },
    {
      type: "quiz",
      id: "va0-2-q7",
      variant: "practice",
      question:
        "$ABC$ is an equilateral triangle of side 4 and $M$ is the midpoint of $BC$. What is $|\\overrightarrow{MA}|$?",
      options: [
        { text: "$2\\sqrt3$", correct: true, feedback: "Right angle at $M$: $\\sqrt{4^2 - 2^2} = \\sqrt{12} = 2\\sqrt3$. Reversing to $\\overrightarrow{MA}$ does not change the length." },
        { text: "$2\\sqrt5$", feedback: "You added the squares: $\\sqrt{16 + 4}$. $AB$ is the hypotenuse, so subtract: $16 - 4$." },
        { text: "$2$", feedback: "That is $|\\overrightarrow{BM}|$, half the base." },
        { text: "$-2\\sqrt3$", feedback: "A magnitude is never negative, even for a reversed arrow." },
      ],
      hint: "The median of an equilateral triangle meets the base at right angles.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "types-of-vectors",
  title: "0.3 · Types of Vectors",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Once a vector is just a length and a direction, a few special cases and relationships come up again and again. Each gets a name, and the names are precise: two of them in particular (equal and collinear) are easy to mix up.",
    },
    {
      type: "table",
      headers: ["Type", "Meaning", "Picture"],
      rows: [
        ["Zero (null) vector $\\vec 0$", "Magnitude 0; initial and terminal points coincide, as in $\\overrightarrow{AA}$", "A single dot. Its direction is not defined, so it may be taken as any direction"],
        ["Unit vector $\\hat a$", "Magnitude exactly 1", "An arrow one unit long, pointing any way. There is one unit vector for each direction"],
        ["Co-initial vectors", "Vectors with the same initial point", "Several arrows fanning out from one point"],
        ["Collinear (parallel) vectors", "Vectors along the same line or parallel lines, whatever their lengths and whichever way they point", "Arrows lying on one line or on parallel rails, some possibly pointing backwards"],
        ["Equal vectors $\\vec a = \\vec b$", "Same magnitude and same direction", "Two copies of one arrow, possibly in different places"],
        ["Negative vector $-\\vec a$", "Same magnitude as $\\vec a$, opposite direction", "The arrow of $\\vec a$ with the head swapped to the other end"],
        ["Coplanar vectors", "Vectors whose arrows, slid to a common tail, lie in one plane", "Any two vectors are always coplanar; three may or may not be (Chapter 5 returns to this)"],
      ],
    },
    {
      type: "callout",
      variant: "definition",
      title: "Collinear vectors",
      content:
        "Vectors are **collinear** (also called **parallel**) if they lie along the same line or along parallel lines. Their magnitudes can differ, and they can point in the same direction (**like** vectors) or in opposite directions (**unlike** vectors).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Equal and negative vectors",
      content:
        "$\\vec a = \\vec b$ means the two have the same magnitude **and** the same direction. Their initial points do not matter.\n\n$-\\vec a$ has the same magnitude as $\\vec a$ and the opposite direction. In particular $\\overrightarrow{BA} = -\\overrightarrow{AB}$.",
    },
    {
      type: "text",
      content:
        "The names nest inside one another. Equal vectors are certainly collinear (same direction means parallel lines), and so are negatives. But collinear vectors need not be equal: they may have different lengths or point opposite ways.",
    },
    {
      type: "math",
      latex:
        "\\text{equal} \\;\\Longrightarrow\\; \\text{collinear}, \\qquad \\text{negative} \\;\\Longrightarrow\\; \\text{collinear}, \\qquad \\text{collinear} \\;\\not\\Longrightarrow\\; \\text{equal}",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"parallel vectors must point the same way\"",
      content:
        "In everyday speech, parallel lines just run side by side. For vectors, *parallel* means the same as *collinear*: the arrows lie along the same line or parallel lines, and they may point in **opposite** directions. $\\vec a$ and $-3\\vec a$ are parallel.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"equal vectors must start at the same point\"",
      content:
        "Equality of vectors looks only at magnitude and direction. The opposite sides $\\overrightarrow{AB}$ and $\\overrightarrow{DC}$ of a parallelogram $ABCD$ share no point, yet they are equal. This is the free-vector idea from Lesson 0.2.",
    },
    {
      type: "text",
      content:
        "You can see equality directly. Below, the arrow keeps its length and direction as you drag its tail, so every position shows the same vector. Now watch the angle readout: it starts at about $18.4^\\circ$. Drag the tip to 3 left and 1 down from the tail, and the angle reads about $198.4^\\circ$ (exactly $180^\\circ$ more) while the magnitude stays the same. That reversed arrow is $-\\vec a$.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "free",
        a: [3, 1],
        tail: [-2, -1],
        draggable: ["tail", "a"],
        readouts: ["magnitude", "angle"],
        caption:
          "Sliding the tail gives equal vectors. Turning the arrow through exactly 180° with the same length gives the negative vector. Collapsing the tip onto the tail gives the zero vector.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1 — the regular hexagon.** $ABCDEF$ is a regular hexagon labelled anticlockwise, with centre $O$. Opposite sides of a regular hexagon are parallel, and joining $O$ to the vertices cuts it into six equilateral triangles.\n\n**Step 1 (equal).** $\\overrightarrow{AB}$ and $\\overrightarrow{ED}$ are opposite sides traced the same way round, so $\\overrightarrow{AB} = \\overrightarrow{ED}$. The radius $\\overrightarrow{OC}$ is also parallel to $AB$, points the same way and has the same length (the triangles are equilateral), so $\\overrightarrow{AB} = \\overrightarrow{OC}$ as well.\n\n**Step 2 (negative).** $\\overrightarrow{DE}$ runs along the same side as $\\overrightarrow{ED}$ the other way, so $\\overrightarrow{DE} = -\\overrightarrow{AB}$.\n\n**Step 3 (collinear, not equal).** The long diagonal $\\overrightarrow{AD}$ passes through $O$ and is parallel to $BC$, pointing the same way, but it is twice as long. So $\\overrightarrow{AD}$ and $\\overrightarrow{BC}$ are collinear but not equal.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — sorting a list.** In a rectangle $PQRS$ (anticlockwise), classify each pair.\n\n$\\overrightarrow{PQ}$ and $\\overrightarrow{SR}$: opposite sides, same direction, same length, so **equal**.\n\n$\\overrightarrow{PQ}$ and $\\overrightarrow{RS}$: same length, opposite direction, so **negatives** (and therefore collinear).\n\n$\\overrightarrow{PQ}$ and $\\overrightarrow{PS}$: same starting point, so **co-initial**; perpendicular, so not collinear.\n\n$\\overrightarrow{PR}$ and $\\overrightarrow{QS}$: the diagonals have equal length but different directions, so they are **not equal**.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — traffic on a straight highway.** A highway runs north-south. Car $A$ drives north at 60 km/h, car $B$ drives north at 60 km/h in another lane, car $C$ drives south at 80 km/h and car $D$ drives south at 60 km/h. Classify the velocity pairs.\n\n**Step 1 ($\\vec v_A$, $\\vec v_B$).** Same speed, same direction: **equal**. The different lanes do not matter.\n*Why this step:* velocities are free vectors. Where each car is on the road is position, not velocity.\n\n**Step 2 ($\\vec v_A$, $\\vec v_D$).** Same speed, opposite direction: $\\vec v_D = -\\vec v_A$, **negatives**.\n\n**Step 3 ($\\vec v_A$, $\\vec v_C$).** Opposite directions but different speeds (60 and 80): **collinear (unlike) but not negatives**. In fact $\\vec v_C = -\\tfrac{80}{60}\\vec v_A = -\\tfrac43\\vec v_A$.\n*Why this step:* negatives need equal magnitudes; collinear does not.\n\n**Step 4 (all four).** Every velocity lies along the north-south line, so all four are **collinear** with one another.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — exam style: the centre of a square.** $ABCD$ is a square with centre $O$ (where the diagonals meet). Consider $\\overrightarrow{OA}$, $\\overrightarrow{OB}$, $\\overrightarrow{OC}$, $\\overrightarrow{OD}$. Which statements are true? (i) They are co-initial. (ii) They all have the same magnitude. (iii) $\\overrightarrow{OA} = -\\overrightarrow{OC}$. (iv) $\\overrightarrow{AO} = \\overrightarrow{OC}$. (v) $\\overrightarrow{OA}$ and $\\overrightarrow{OB}$ are collinear.\n\n**Step 1 (i) and (ii).** All four start at $O$, so they are co-initial. The diagonals of a square are equal and bisect each other, so each half-diagonal has the same length. Both **true**.\n*Why this step:* write down the geometric facts about the figure first; the vector facts follow from them.\n\n**Step 2 (iii).** $A$, $O$, $C$ lie on one diagonal with $O$ in the middle, so $\\overrightarrow{OA}$ and $\\overrightarrow{OC}$ have equal length and opposite directions. **True**.\n\n**Step 3 (iv).** $\\overrightarrow{AO}$ runs from $A$ to the centre and $\\overrightarrow{OC}$ carries on from the centre to $C$, the same length along the same line in the same direction. **True**, even though they share only the point $O$.\n\n**Step 4 (v).** The diagonals of a square are perpendicular, so $\\overrightarrow{OA}$ and $\\overrightarrow{OB}$ are at $90^\\circ$. **False**: equal length is not enough for collinearity.",
    },
    {
      type: "quiz",
      id: "va0-3-q1",
      variant: "concept",
      question: "$\\vec a$ points east with length 2; $\\vec b$ points west with length 5. Which description is correct?",
      options: [
        { text: "They are equal.", feedback: "Equal needs the same length and the same direction. Both differ here." },
        {
          text: "They are collinear (parallel) but not equal.",
          correct: true,
          feedback: "They lie along parallel lines. Collinear vectors may point opposite ways and have different lengths.",
        },
        { text: "They are not parallel, because they point in opposite directions.", feedback: "That is the misconception. For vectors, parallel includes pointing the opposite way." },
        { text: "They are negatives of each other.", feedback: "Negatives must have the same length. These are 2 and 5 long." },
      ],
    },
    {
      type: "quiz",
      id: "va0-3-q2",
      variant: "concept",
      question:
        "$ABCD$ is a parallelogram. Are $\\overrightarrow{AB}$ and $\\overrightarrow{DC}$ equal vectors?",
      options: [
        {
          text: "Yes: they have the same length and the same direction.",
          correct: true,
          feedback: "Where they start does not matter for equality.",
        },
        { text: "No: they start at different points.", feedback: "That is the misconception. Equality depends only on magnitude and direction." },
        { text: "No: they are only parallel.", feedback: "They are parallel *and* of the same length, pointing the same way. That is exactly equality." },
      ],
    },
    {
      type: "quiz",
      id: "va0-3-q3",
      variant: "concept",
      question: "Two unit vectors are always…",
      options: [
        { text: "equal", feedback: "Every direction has its own unit vector. East-pointing and north-pointing unit vectors are different." },
        { text: "collinear", feedback: "Two unit vectors can point in any two directions." },
        { text: "of the same magnitude", correct: true, feedback: "Both have magnitude exactly 1. Nothing is guaranteed about their directions." },
        { text: "co-initial", feedback: "Co-initial is about where they are drawn from, which a unit vector does not fix." },
      ],
    },
    {
      type: "quiz",
      id: "va0-3-q4",
      variant: "practice",
      question:
        "$ABCDEF$ is a regular hexagon labelled anticlockwise. Which vector equals $\\overrightarrow{AB}$?",
      options: [
        { text: "$\\overrightarrow{DE}$", feedback: "That side is parallel to $AB$ but traced the other way: it is $-\\overrightarrow{AB}$." },
        { text: "$\\overrightarrow{ED}$", correct: true, feedback: "Opposite side, traced in the same direction, and the same length." },
        { text: "$\\overrightarrow{BC}$", feedback: "Adjacent sides of a hexagon meet at 120°, so they are not parallel." },
        { text: "$\\overrightarrow{AD}$", feedback: "$AD$ is a long diagonal, twice the side length, and parallel to $BC$, not $AB$." },
      ],
      hint: "Opposite sides of a regular hexagon are parallel.",
    },
    {
      type: "quiz",
      id: "va0-3-q5",
      variant: "practice",
      question: "Which statement about the zero vector $\\vec 0$ is correct?",
      options: [
        { text: "It is a unit vector.", feedback: "A unit vector has length 1. The zero vector has length 0." },
        {
          text: "Its magnitude is 0 and its direction is not defined.",
          correct: true,
          feedback: "Start and finish coincide, so there is no arrow to point anywhere. By convention it counts as collinear with every vector.",
        },
        { text: "It points along the positive x-axis.", feedback: "There is nothing to point. Its direction is indeterminate." },
        { text: "It is the same thing as the number 0.", feedback: "It is a vector: adding it to a vector gives a vector back. The number 0 is a scalar." },
      ],
    },
    {
      type: "quiz",
      id: "va0-3-q6",
      variant: "practice",
      question: "For any two points $A$ and $B$, which is always true?",
      options: [
        { text: "$\\overrightarrow{BA} = \\overrightarrow{AB}$", feedback: "They point opposite ways, so they are not equal unless $A = B$." },
        { text: "$\\overrightarrow{BA} = -\\overrightarrow{AB}$", correct: true, feedback: "Same length, opposite direction: the definition of the negative vector." },
        { text: "$|\\overrightarrow{BA}| = -|\\overrightarrow{AB}|$", feedback: "Magnitudes are never negative. The lengths are equal." },
      ],
    },
    {
      type: "quiz",
      id: "va0-3-q7",
      variant: "practice",
      question:
        "On a straight east-west road, a truck drives east at 50 km/h and a car drives west at 50 km/h. How are their velocities related?",
      options: [
        { text: "They are equal.", feedback: "Equal speeds, but opposite directions. Equal vectors need the same direction too." },
        { text: "They are negatives of each other.", correct: true, feedback: "Same magnitude, opposite direction: $\\vec v_{\\text{car}} = -\\vec v_{\\text{truck}}$. They are also collinear." },
        { text: "They are not collinear, because they point opposite ways.", feedback: "Both lie along the east-west line. Collinear vectors may point in opposite directions." },
        { text: "They are collinear but cannot be negatives, because the vehicles are in different places.", feedback: "Position does not matter for velocity vectors. Only magnitude and direction count." },
      ],
    },
    {
      type: "quiz",
      id: "va0-3-q8",
      variant: "practice",
      question: "$ABCD$ is a square with centre $O$. Which vector equals $\\overrightarrow{AO}$?",
      options: [
        { text: "$\\overrightarrow{OC}$", correct: true, feedback: "$O$ is the midpoint of $AC$, so $\\overrightarrow{OC}$ has the same length and direction as $\\overrightarrow{AO}$." },
        { text: "$\\overrightarrow{CO}$", feedback: "Same length, but it points back towards $A$: $\\overrightarrow{CO} = -\\overrightarrow{AO}$." },
        { text: "$\\overrightarrow{OB}$", feedback: "Same length, but the diagonals of a square are perpendicular, so the direction is wrong." },
        { text: "$\\overrightarrow{AC}$", feedback: "Right direction, but twice as long: $\\overrightarrow{AC} = 2\\overrightarrow{AO}$." },
      ],
      hint: "The diagonals of a square bisect each other.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "triangle-and-parallelogram-laws",
  title: "0.4 · Adding Arrows: Triangle and Parallelogram Laws",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Go back to the walk from Lesson 0.1. You walked $\\vec a$, then $\\vec b$. Where did you end up? Wherever you are, the single arrow from home to there is the one displacement that does the same job as the two legs. That arrow is what we *mean* by $\\vec a + \\vec b$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Triangle law of addition",
      content:
        "Place the tail of $\\vec b$ at the tip of $\\vec a$. Then $\\vec a + \\vec b$ is the arrow from the tail of $\\vec a$ to the tip of $\\vec b$. In points:\n\n$\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$.",
    },
    {
      type: "text",
      content:
        "This only works because vectors are free (Lesson 0.2): we are allowed to slide $\\vec b$ so that it starts where $\\vec a$ ends. Notice the pattern in the letters: the inner letters match ($B$ and $B$) and cancel, leaving the outer ones.",
    },
    {
      type: "text",
      content:
        "There is a second picture. Draw $\\vec a$ and $\\vec b$ from the *same* point and complete the parallelogram. The diagonal from the common tail is the sum. Both pictures are drawn below: the solid arrows go $\\vec a$ then $\\vec b$ (triangle law), and the dashed arrows go $\\vec b$ then $\\vec a$ (the other two sides of the parallelogram). Drag either tip and check that both routes always reach the same corner.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "add",
        a: [4, 1],
        b: [1, 3],
        draggable: ["a", "b"],
        showParallelogram: true,
        readouts: ["magnitude", "sum"],
        caption:
          "Solid arrows: a then b, tip to tail (triangle law). Dashed arrows: b then a, completing the parallelogram. Both routes reach the same corner, and the thick diagonal is the sum. Drag either tip.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Parallelogram law of addition",
      content:
        "If $\\vec a$ and $\\vec b$ are drawn from a common point $O$ as two adjacent sides of a parallelogram, then $\\vec a + \\vec b$ is the diagonal through $O$.",
    },
    {
      type: "text",
      content:
        "**Why the two laws agree, and why order does not matter.** Let the parallelogram be $OACB$ with $\\overrightarrow{OA} = \\vec a$ and $\\overrightarrow{OB} = \\vec b$. Opposite sides of a parallelogram are equal vectors, so $\\overrightarrow{AC} = \\vec b$ and $\\overrightarrow{BC} = \\vec a$. Go round the parallelogram both ways using the triangle law:",
    },
    {
      type: "math",
      latex:
        "\\vec a + \\vec b = \\overrightarrow{OA} + \\overrightarrow{AC} = \\overrightarrow{OC}, \\qquad \\vec b + \\vec a = \\overrightarrow{OB} + \\overrightarrow{BC} = \\overrightarrow{OC}",
    },
    {
      type: "text",
      content:
        "Both routes end at $C$, so the parallelogram law is the triangle law in disguise, and we have proved **commutativity**: $\\vec a + \\vec b = \\vec b + \\vec a$.",
    },
    {
      type: "text",
      content:
        "**Associativity.** Take three arrows tip to tail: $\\vec a = \\overrightarrow{PQ}$, $\\vec b = \\overrightarrow{QR}$, $\\vec c = \\overrightarrow{RS}$. Group them either way:",
    },
    {
      type: "math",
      latex:
        "(\\vec a + \\vec b) + \\vec c = \\overrightarrow{PR} + \\overrightarrow{RS} = \\overrightarrow{PS}, \\qquad \\vec a + (\\vec b + \\vec c) = \\overrightarrow{PQ} + \\overrightarrow{QS} = \\overrightarrow{PS}",
    },
    {
      type: "text",
      content:
        "Same arrow, so $(\\vec a + \\vec b) + \\vec c = \\vec a + (\\vec b + \\vec c)$, and we may simply write $\\vec a + \\vec b + \\vec c$. Two more facts complete the rules. Adding $\\vec 0$ changes nothing, since $\\overrightarrow{AB} + \\overrightarrow{BB} = \\overrightarrow{AB}$. And every vector cancels with its negative, since $\\overrightarrow{AB} + \\overrightarrow{BA} = \\overrightarrow{AA} = \\vec 0$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Polygon law",
      content:
        "Chaining the triangle law along any path of arrows gives\n\n$\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD} + \\cdots + \\overrightarrow{YZ} = \\overrightarrow{AZ}$.\n\nIf the path closes up and returns to its start, the sum is $\\vec 0$. For a triangle, $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CA} = \\vec 0$. Three forces in equilibrium, drawn tip to tail, form a closed triangle for exactly this reason.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Angle between two vectors",
      content:
        "Slide the two vectors so that their **tails coincide**. The angle $\\theta$ between the arrows is the angle between $\\vec a$ and $\\vec b$, and it is always taken with $0^\\circ \\le \\theta \\le 180^\\circ$.\n\n$\\theta = 0^\\circ$ means **like** vectors (same direction); $\\theta = 180^\\circ$ means **unlike** vectors (opposite directions); $\\theta = 90^\\circ$ means perpendicular.\n\nIf the arrows are drawn head to tail, as along the sides of a triangle, you must first slide one so the tails meet. The angle you then see is usually **not** the interior angle of the figure.",
    },
    {
      type: "text",
      content:
        "**How long is the sum?** Let $\\theta$ be the angle between $\\vec a$ and $\\vec b$ when they are drawn **tail to tail**. In the triangle with sides $|\\vec a|$, $|\\vec b|$ and $|\\vec a + \\vec b|$, the angle at the joint is $180^\\circ - \\theta$ (co-interior angles in the parallelogram). The law of cosines gives:",
    },
    {
      type: "math",
      latex:
        "|\\vec a + \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2 - 2|\\vec a||\\vec b|\\cos(180^\\circ - \\theta) = |\\vec a|^2 + |\\vec b|^2 + 2|\\vec a||\\vec b|\\cos\\theta",
    },
    {
      type: "text",
      content:
        "If $\\alpha$ is the angle the sum makes with $\\vec a$, dropping a perpendicular from the far corner of the parallelogram gives",
    },
    {
      type: "math",
      latex: "\\tan\\alpha = \\frac{|\\vec b|\\sin\\theta}{|\\vec a| + |\\vec b|\\cos\\theta}",
    },
    {
      type: "text",
      content:
        "Since $\\cos\\theta$ runs from $1$ (same direction) down to $-1$ (opposite directions), $|\\vec a + \\vec b|^2$ runs from $(|\\vec a| + |\\vec b|)^2$ down to $(|\\vec a| - |\\vec b|)^2$. Taking square roots gives the **triangle inequality**:",
    },
    {
      type: "math",
      latex: "\\big|\\,|\\vec a| - |\\vec b|\\,\\big| \\;\\le\\; |\\vec a + \\vec b| \\;\\le\\; |\\vec a| + |\\vec b|",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the length of a sum is the sum of the lengths\"",
      content:
        "It is tempting to write $|\\vec a + \\vec b| = |\\vec a| + |\\vec b|$. Lengths add only when the arrows point the same way. In every other case the sum is shorter, because the straight arrow cuts the corner of the triangle. The readout in the interactive shows \"<\" until you line the arrows up.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — two forces.** Forces of 3 N and 5 N act on a particle, with an angle of $60^\\circ$ between them. Find the resultant.\n\n**Step 1.** $R^2 = 3^2 + 5^2 + 2(3)(5)\\cos 60^\\circ = 9 + 25 + 15 = 49$, so $R = 7$ N.\n\n**Step 2.** Direction, measured from the 3 N force: $\\tan\\alpha = \\dfrac{5\\sin 60^\\circ}{3 + 5\\cos 60^\\circ} = \\dfrac{5\\sqrt3/2}{11/2} = \\dfrac{5\\sqrt3}{11} \\approx 0.787$, so $\\alpha \\approx 38.2^\\circ$.\n\n**Step 3 (sense check).** 7 N lies between $5 - 3 = 2$ and $5 + 3 = 8$, as the triangle inequality demands, and $\\alpha < 60^\\circ$, so the resultant lies between the two forces, leaning towards the bigger one.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — equal forces at $120^\\circ$.** Two forces, each of size $F$, act at $120^\\circ$ to each other.\n\n$R^2 = F^2 + F^2 + 2F^2\\cos 120^\\circ = 2F^2 - F^2 = F^2$, so $R = F$.\n\nThe picture explains it: the parallelogram is a rhombus with a $60^\\circ$ angle, and its short diagonal splits it into two equilateral triangles.\n\n**Consequence.** By symmetry the resultant lies along the bisector of the $120^\\circ$ angle, so it makes $60^\\circ$ with each force. A third force of size $F$ placed at $120^\\circ$ to each of the first two points exactly opposite that bisector, at $180^\\circ$ to the resultant. A force $F$ in exactly the opposite direction to a resultant of size $F$ cancels it, so three equal forces at $120^\\circ$ to one another cancel exactly.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — the polygon law.** In any quadrilateral $ABCD$, simplify $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD}$ and $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD} + \\overrightarrow{DA}$.\n\nThe first chain runs $A \\to B \\to C \\to D$, so it equals $\\overrightarrow{AD}$. The second returns to $A$, so it equals $\\vec 0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — crossing a river.** A boat heads straight across a river 80 m wide, moving at 4 m/s relative to the water. The river flows at 3 m/s. Find the boat's actual velocity, the time to cross and how far downstream it lands.\n\n**Step 1 (set up the arrows).** The boat's velocity relative to the water, $\\vec u$, points straight across with $|\\vec u| = 4$. The water's velocity $\\vec w$ points downstream with $|\\vec w| = 3$. The actual velocity over the ground is $\\vec v = \\vec u + \\vec w$.\n*Why this step:* each second the boat moves 4 m across *and* is carried 3 m downstream. Two displacements in the same second add by the triangle law.\n\n**Step 2 (resultant).** The two arrows are perpendicular ($\\theta = 90^\\circ$, $\\cos\\theta = 0$):",
    },
    {
      type: "math",
      latex: "|\\vec v| = \\sqrt{4^2 + 3^2 + 2(4)(3)\\cos 90^\\circ} = \\sqrt{16 + 9} = 5 \\text{ m/s}, \\qquad \\tan\\alpha = \\frac{3}{4} \\;\\Rightarrow\\; \\alpha \\approx 36.9^\\circ",
    },
    {
      type: "text",
      content:
        "Here $\\alpha$ is the angle between the boat's actual path and the straight-across direction.\n\n**Step 3 (time).** Only the across-the-river part of the motion gets the boat to the other bank: $t = \\dfrac{80}{4} = 20$ s.\n*Why this step:* the current pushes along the bank, so it neither helps nor hinders the crossing.\n\n**Step 4 (drift).** In those 20 s the current carries the boat $3 \\times 20 = 60$ m downstream.\n\n**Check.** Path length $= 5 \\times 20 = 100$ m, and indeed $\\sqrt{80^2 + 60^2} = 100$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — exam style (JEE).** The resultant of two forces $P$ and $Q$ is $R$. If $Q$ is doubled, the resultant is doubled; if instead $Q$ is reversed, the resultant is again doubled. Find $P : Q : R$.\n\n**Step 1 (translate each sentence).** Let $\\theta$ be the angle between the forces and write $c = \\cos\\theta$. Doubling $Q$ keeps $\\theta$; reversing $Q$ replaces $\\theta$ by $180^\\circ - \\theta$, which flips the sign of $c$:",
    },
    {
      type: "math",
      latex:
        "\\begin{aligned} R^2 &= P^2 + Q^2 + 2PQc \\quad &(1)\\\\ 4R^2 &= P^2 + 4Q^2 + 4PQc \\quad &(2)\\\\ 4R^2 &= P^2 + Q^2 - 2PQc \\quad &(3) \\end{aligned}",
    },
    {
      type: "text",
      content:
        "*Why this step:* each situation is just the length-of-a-sum formula with different data. Three facts, three equations.\n\n**Step 2 (eliminate $R$).** (2) and (3) have the same left side, so $4Q^2 + 4PQc = Q^2 - 2PQc$, giving $3Q^2 = -6PQc$, so $2PQc = -Q^2$.\n\n**Step 3 (find $R$).** Put $2PQc = -Q^2$ into (1): $R^2 = P^2 + Q^2 - Q^2 = P^2$, so $R = P$.\n\n**Step 4 (find $Q$).** Put it into (3): $4R^2 = P^2 + Q^2 + Q^2$. With $R = P$ this is $4P^2 = P^2 + 2Q^2$, so $Q^2 = \\tfrac32 P^2$ and $Q = \\sqrt{\\tfrac32}\\,P$.\n\n**Answer.** $P : Q : R = 1 : \\sqrt{\\tfrac32} : 1 = \\sqrt2 : \\sqrt3 : \\sqrt2$.\n\n**Check.** $c = -\\dfrac{Q}{2P} = -\\dfrac{\\sqrt3}{2\\sqrt2} \\approx -0.61$, a genuine cosine, so the angle (about $128^\\circ$) really exists.",
    },
    {
      type: "quiz",
      id: "va0-4-q1",
      variant: "concept",
      question: "$|\\vec a| = 3$ and $|\\vec b| = 4$. When is $|\\vec a + \\vec b| = 7$?",
      options: [
        { text: "Always.", feedback: "That is the misconception. At right angles the sum is only 5." },
        { text: "Only when $\\vec a$ and $\\vec b$ point in the same direction.", correct: true, feedback: "Only then does the arrow of the sum run straight along both legs. Otherwise it cuts the corner and is shorter." },
        { text: "Only when $\\vec a$ and $\\vec b$ are perpendicular.", feedback: "Perpendicular gives $\\sqrt{9 + 16} = 5$." },
        { text: "Never.", feedback: "Line the arrows up in the interactive: the readout switches to \"=\"." },
      ],
    },
    {
      type: "quiz",
      id: "va0-4-q7",
      variant: "concept",
      question: "$ABC$ is an equilateral triangle. What is the angle between the vectors $\\overrightarrow{AB}$ and $\\overrightarrow{BC}$?",
      options: [
        { text: "$60^\\circ$", feedback: "That is the interior angle at $B$, where the arrows meet head to tail. Slide $\\overrightarrow{BC}$ back so its tail sits at $A$ first." },
        { text: "$120^\\circ$", correct: true, feedback: "Slide $\\overrightarrow{AB}$ so its tail sits at $B$: it now runs along the extension of $AB$ beyond $B$. The angle between that extension and $BC$ is the exterior angle at $B$, $180^\\circ - 60^\\circ = 120^\\circ$." },
        { text: "$240^\\circ$", feedback: "The angle between two vectors is always between $0^\\circ$ and $180^\\circ$." },
        { text: "$30^\\circ$", feedback: "Nothing in an equilateral triangle halves the $60^\\circ$ here. Put the tails together and look again." },
      ],
      hint: "The angle between vectors is measured with their tails together, not head to tail.",
    },
    {
      type: "quiz",
      id: "va0-4-q2",
      variant: "practice",
      question: "For any triangle $ABC$, $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CA}$ equals…",
      options: [
        { text: "$2\\overrightarrow{AC}$", feedback: "Follow the chain: $A \\to B \\to C \\to A$. Where do you end up?" },
        { text: "$\\vec 0$", correct: true, feedback: "The path closes, so the total displacement is zero." },
        { text: "the perimeter of the triangle", feedback: "The perimeter is a scalar, a sum of lengths. The sum of the vectors is a vector." },
        { text: "$\\overrightarrow{AC}$", feedback: "That is $\\overrightarrow{AB} + \\overrightarrow{BC}$. The last arrow brings you back to $A$." },
      ],
    },
    {
      type: "quiz",
      id: "va0-4-q3",
      variant: "practice",
      question: "Forces of 3 N and 5 N act at $60^\\circ$ to each other. What is the size of the resultant?",
      options: [
        { text: "8 N", feedback: "That would need the forces to point the same way." },
        { text: "7 N", correct: true, feedback: "$R^2 = 9 + 25 + 2(15)(\\tfrac12) = 49$." },
        { text: "$\\sqrt{19}$ N", feedback: "You used $-2ab\\cos\\theta$. With $\\theta$ measured tail to tail, the sign is $+$." },
        { text: "$\\sqrt{34}$ N", feedback: "That is the right-angle case. At $60^\\circ$ the cross term $2ab\\cos\\theta$ adds 15." },
      ],
      hint: "$|\\vec a + \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2 + 2|\\vec a||\\vec b|\\cos\\theta$.",
    },
    {
      type: "quiz",
      id: "va0-4-q4",
      variant: "concept",
      question: "$|\\vec a| = 3$ and $|\\vec b| = 4$. Which of these can **not** be $|\\vec a + \\vec b|$?",
      options: [
        { text: "1", feedback: "Possible: opposite directions give $4 - 3 = 1$." },
        { text: "5", feedback: "Possible: perpendicular arrows give 5." },
        { text: "7", feedback: "Possible: same direction gives 7." },
        { text: "8", correct: true, feedback: "The sum can never be longer than $3 + 4 = 7$: the triangle inequality." },
      ],
    },
    {
      type: "quiz",
      id: "va0-4-q5",
      variant: "practice",
      question: "Two forces, each of 10 N, act at $120^\\circ$ to each other. What is the resultant?",
      options: [
        { text: "20 N", feedback: "Only if they pointed the same way." },
        { text: "0 N", feedback: "They cancel only at $180^\\circ$." },
        { text: "10 N", correct: true, feedback: "$R^2 = 100 + 100 + 200\\cos 120^\\circ = 100$. The rhombus splits into equilateral triangles." },
        { text: "$10\\sqrt3$ N", feedback: "That is the result at $60^\\circ$, where $\\cos\\theta = +\\tfrac12$." },
      ],
    },
    {
      type: "quiz",
      id: "va0-4-q6",
      variant: "practice",
      question: "$\\overrightarrow{PQ} + \\overrightarrow{QR} + \\overrightarrow{RS} + \\overrightarrow{ST}$ simplifies to…",
      options: [
        { text: "$\\overrightarrow{PT}$", correct: true, feedback: "The inner letters cancel along the chain, leaving start $P$ and finish $T$." },
        { text: "$\\overrightarrow{TP}$", feedback: "Direction matters: the chain starts at $P$ and ends at $T$." },
        { text: "$\\vec 0$", feedback: "The path does not return to $P$, so the sum is not zero." },
      ],
    },
    {
      type: "quiz",
      id: "va0-4-q8",
      variant: "practice",
      question:
        "A swimmer heads straight across a river 60 m wide at 1.5 m/s relative to the water. The current flows at 2 m/s. How far downstream does she land?",
      options: [
        { text: "80 m", correct: true, feedback: "Crossing time $= \\frac{60}{1.5} = 40$ s, and the current carries her $2 \\times 40 = 80$ m downstream." },
        { text: "45 m", feedback: "You swapped the speeds. The time comes from the across speed (1.5 m/s); the drift from the current (2 m/s)." },
        { text: "100 m", feedback: "That is the length of her actual path, $2.5 \\times 40$ m, not the drift along the bank." },
        { text: "60 m", feedback: "That is the width of the river. The drift depends on how long the current acts on her." },
      ],
      hint: "First find how long she takes to cross, using only her across-the-river speed.",
    },
    {
      type: "quiz",
      id: "va0-4-q9",
      variant: "practice",
      question:
        "Two forces, each of size $F$, have a resultant of size $F\\sqrt3$. What is the angle between them?",
      options: [
        { text: "$30^\\circ$", feedback: "At $30^\\circ$, $R^2 = 2F^2 + 2F^2\\cos 30^\\circ = (2 + \\sqrt3)F^2$, which is more than $3F^2$." },
        { text: "$60^\\circ$", correct: true, feedback: "$3F^2 = 2F^2 + 2F^2\\cos\\theta$ gives $\\cos\\theta = \\tfrac12$, so $\\theta = 60^\\circ$." },
        { text: "$90^\\circ$", feedback: "At right angles, $R = F\\sqrt2$." },
        { text: "$120^\\circ$", feedback: "At $120^\\circ$, $R = F$ (Worked example 2)." },
      ],
      hint: "$R^2 = F^2 + F^2 + 2F^2\\cos\\theta$. Set it equal to $3F^2$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "subtraction-and-scalar-multiples",
  title: "0.5 · Subtraction and Scalar Multiples",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "What should $2\\vec a$ mean? The obvious guess is $\\vec a + \\vec a$: two copies tip to tail, so the same direction and twice the length. And $-\\vec a$ is already defined as the flipped arrow. Put those together and a single slider covers every multiple.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "scale",
        a: [2, 1],
        window: { xmin: -7, xmax: 7, ymin: -4, ymax: 4 },
        scalar: { min: -3, max: 3, step: 0.5, initial: 2 },
        readouts: ["magnitude"],
        caption:
          "Slide k from 3 down to -3. The arrow shrinks, vanishes at k = 0, then grows again pointing the other way. Its length is always |k| times the original.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Scalar multiple",
      content:
        "For a real number $k$, $k\\vec a$ is the vector with magnitude $|k|\\,|\\vec a|$ that points\n\n- the same way as $\\vec a$ if $k > 0$,\n- the opposite way if $k < 0$,\n\nand $k\\vec a = \\vec 0$ if $k = 0$.",
    },
    {
      type: "text",
      content:
        "Two special multiples are worth naming. $(-1)\\vec a = -\\vec a$, the negative vector. And for $\\vec a \\neq \\vec 0$, dividing by its own length gives a vector of length 1 in the same direction, the **unit vector** of $\\vec a$:",
    },
    {
      type: "math",
      latex: "\\hat a = \\frac{1}{|\\vec a|}\\,\\vec a, \\qquad \\text{so} \\qquad \\vec a = |\\vec a|\\,\\hat a",
    },
    {
      type: "text",
      content:
        "The second form says every vector is (its length) times (its direction). Magnitude and direction, split cleanly.\n\n**Example.** $|\\vec a| = 4$. Find the vector of magnitude 10 in the direction of $\\vec a$.\n\n**Step 1.** The direction is $\\hat a = \\tfrac14\\vec a$.\n\n**Step 2.** Ten units along it: $10\\hat a = \\tfrac{10}{4}\\vec a = \\tfrac52\\vec a$.\n\n**Check.** $|\\tfrac52\\vec a| = \\tfrac52 \\times 4 = 10$. The vector of magnitude 10 in the *opposite* direction would be $-\\tfrac52\\vec a$.",
    },
    {
      type: "text",
      content:
        "**Subtraction.** Define it the way you did for numbers, as adding the negative: $\\vec a - \\vec b = \\vec a + (-\\vec b)$. Now find its picture. Draw $\\vec a = \\overrightarrow{OA}$ and $\\vec b = \\overrightarrow{OB}$ from a common point $O$. Then",
    },
    {
      type: "math",
      latex:
        "\\vec a - \\vec b = \\overrightarrow{OA} + (-\\overrightarrow{OB}) = \\overrightarrow{BO} + \\overrightarrow{OA} = \\overrightarrow{BA}",
    },
    {
      type: "text",
      content:
        "So $\\vec a - \\vec b$ is the arrow **from the tip of $\\vec b$ to the tip of $\\vec a$**. Check it by the triangle law: $\\vec b + (\\vec a - \\vec b)$ should be $\\vec a$, and indeed $\\overrightarrow{OB} + \\overrightarrow{BA} = \\overrightarrow{OA}$.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "subtract",
        a: [4, 1],
        b: [1, 3],
        draggable: ["a", "b"],
        readouts: ["magnitude"],
        caption:
          "The thick arrow a − b runs from the tip of b to the tip of a. The faint copy from the origin is the same vector, slid over. Drag either tip.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a − b points from a to b\"",
      content:
        "The arrow $\\vec a - \\vec b$ does not run from $\\vec a$ to $\\vec b$. It points **to** $\\vec a$, **from** $\\vec b$. Remember it as \"the arrow you add to $\\vec b$ to get $\\vec a$\": $\\vec b + (\\vec a - \\vec b) = \\vec a$. The arrow from the tip of $\\vec a$ to the tip of $\\vec b$ is $\\vec b - \\vec a$, which is the negative.",
    },
    {
      type: "text",
      content:
        "**How long is the difference?** In triangle $OBA$ the sides $\\overrightarrow{OA} = \\vec a$ and $\\overrightarrow{OB} = \\vec b$ meet at $O$ with the angle $\\theta$ between them (they are tail to tail), and the third side is $\\overrightarrow{BA} = \\vec a - \\vec b$. This time the angle at the joint *is* $\\theta$, so the law of cosines applies directly:",
    },
    {
      type: "math",
      latex: "|\\vec a - \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2 - 2|\\vec a||\\vec b|\\cos\\theta",
    },
    {
      type: "text",
      content:
        "Compare it with the sum: the only change is the sign of the cross term. The sum is the long diagonal of the parallelogram when $\\theta$ is acute, the difference is the other diagonal. For unit vectors, $|\\vec a - \\vec b| = \\sqrt3$ gives $3 = 2 - 2\\cos\\theta$, so $\\cos\\theta = -\\tfrac12$ and $\\theta = 120^\\circ$.",
    },
    {
      type: "text",
      content:
        "**The laws of scalar multiplication.** For scalars $k, m$ and vectors $\\vec a, \\vec b$:",
    },
    {
      type: "math",
      latex:
        "k(m\\vec a) = (km)\\vec a, \\qquad (k + m)\\vec a = k\\vec a + m\\vec a, \\qquad k(\\vec a + \\vec b) = k\\vec a + k\\vec b",
    },
    {
      type: "text",
      content:
        "The first two are about arrows along a single line, where lengths simply multiply or add (with signs for direction). The third is the interesting one, and it is a fact about **similar triangles**. Draw $\\overrightarrow{OP} = \\vec a$ and $\\overrightarrow{PQ} = \\vec b$, so $\\overrightarrow{OQ} = \\vec a + \\vec b$. Now scale the whole triangle $OPQ$ from $O$ by the factor $k$ (take $k > 0$ first): $P$ moves to $P'$ with $\\overrightarrow{OP'} = k\\vec a$, and $Q$ moves to $Q'$ with $\\overrightarrow{OQ'} = k(\\vec a + \\vec b)$. Triangle $OP'Q'$ is similar to $OPQ$ with ratio $k$, so $P'Q'$ is parallel to $PQ$, points the same way and is $k$ times as long: $\\overrightarrow{P'Q'} = k\\vec b$. The triangle law in the big triangle then reads",
    },
    {
      type: "math",
      latex: "k(\\vec a + \\vec b) = \\overrightarrow{OQ'} = \\overrightarrow{OP'} + \\overrightarrow{P'Q'} = k\\vec a + k\\vec b",
    },
    {
      type: "text",
      content:
        "For $k < 0$ the same argument works with the enlarged triangle rotated through $180^\\circ$ about $O$. So vector algebra obeys the ordinary rules of algebra for addition and scaling, and you can expand brackets and collect terms as usual.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Collinearity criterion",
      content:
        "If $\\vec a \\neq \\vec 0$, then $\\vec b$ is collinear with $\\vec a$ exactly when $\\vec b = \\lambda\\vec a$ for some scalar $\\lambda$.\n\nThe reason: collinear means the same or the opposite direction, and scaling by $\\lambda$ can produce any length in either direction ($\\lambda > 0$ keeps the direction, $\\lambda < 0$ reverses it, $\\lambda = 0$ gives $\\vec 0$).",
    },
    {
      type: "text",
      content:
        "A consequence you will use constantly: if $\\vec a$ and $\\vec b$ are **not** collinear and $x\\vec a + y\\vec b = \\vec 0$, then $x = y = 0$. If $x$ were not zero, we could write $\\vec a = -\\frac{y}{x}\\vec b$, which would make them collinear. So $x = 0$, which leaves $y\\vec b = \\vec 0$. Since $\\vec b \\neq \\vec 0$ (the zero vector is collinear with everything, so a non-collinear pair cannot contain it), $y = 0$ as well. So with two non-collinear vectors you may **compare coefficients**: $x\\vec a + y\\vec b = x'\\vec a + y'\\vec b$ forces $x = x'$ and $y = y'$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — diagonals of a parallelogram.** $ABCD$ is a parallelogram with $\\overrightarrow{AB} = \\vec a$ and $\\overrightarrow{AD} = \\vec b$.\n\n**Step 1.** $\\overrightarrow{BC} = \\overrightarrow{AD} = \\vec b$ (opposite sides), so $\\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{BC} = \\vec a + \\vec b$.\n\n**Step 2.** $\\overrightarrow{BD}$ goes from the tip of $\\vec a$ to the tip of $\\vec b$ (both drawn from $A$), so $\\overrightarrow{BD} = \\vec b - \\vec a$.\n\n**Step 3 (reverse).** If the diagonals are given, $\\overrightarrow{AC} = \\vec p$ and $\\overrightarrow{BD} = \\vec q$, then adding and subtracting $\\vec p = \\vec a + \\vec b$ and $\\vec q = \\vec b - \\vec a$ gives\n\n$\\vec a = \\tfrac12(\\vec p - \\vec q)$ and $\\vec b = \\tfrac12(\\vec p + \\vec q)$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — the median of a triangle.** In triangle $ABC$, $M$ is the midpoint of $BC$. Express $\\overrightarrow{AM}$ in terms of $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$.\n\n**Step 1.** $\\overrightarrow{AM} = \\overrightarrow{AB} + \\overrightarrow{BM}$, and $\\overrightarrow{BM} = \\tfrac12\\overrightarrow{BC}$.\n\n**Step 2.** $\\overrightarrow{BC} = \\overrightarrow{AC} - \\overrightarrow{AB}$ (tip of $\\overrightarrow{AB}$ to tip of $\\overrightarrow{AC}$).\n\n**Step 3.** $\\overrightarrow{AM} = \\overrightarrow{AB} + \\tfrac12\\left(\\overrightarrow{AC} - \\overrightarrow{AB}\\right) = \\tfrac12\\left(\\overrightarrow{AB} + \\overrightarrow{AC}\\right)$.\n\nSo the median is half the diagonal of the parallelogram built on $AB$ and $AC$, which makes sense: the diagonals of a parallelogram bisect each other.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — finding $\\lambda$.** $\\vec a$ and $\\vec b$ are not collinear. For which $\\lambda$ are $\\vec p = 2\\vec a + 3\\vec b$ and $\\vec q = \\lambda\\vec a + 6\\vec b$ collinear?\n\n**Step 1.** Collinear means $\\vec q = t\\vec p$ for some $t$: $\\lambda\\vec a + 6\\vec b = 2t\\vec a + 3t\\vec b$.\n\n**Step 2.** Compare coefficients (allowed, since $\\vec a$ and $\\vec b$ are not collinear): $6 = 3t$ gives $t = 2$, and then $\\lambda = 2t = 4$.\n\n**Check.** $\\vec q = 4\\vec a + 6\\vec b = 2(2\\vec a + 3\\vec b) = 2\\vec p$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — relative velocity at a crossroads.** Car $A$ drives north at 40 km/h and car $B$ drives east at 30 km/h. How fast, and in what direction, does car $A$ appear to move to someone sitting in car $B$?\n\n**Step 1 (which operation?).** The velocity of $A$ relative to $B$ is $\\vec v_A - \\vec v_B$.\n*Why this step:* the passenger in $B$ sees everything shifted by $B$'s own motion. Subtracting $\\vec v_B$ is exactly \"what you add to $\\vec v_B$ to get $\\vec v_A$\".\n\n**Step 2 (picture).** $\\vec v_A - \\vec v_B = \\vec v_A + (-\\vec v_B)$: 40 km/h north together with 30 km/h **west**.\n\n**Step 3 (size).** The angle between $\\vec v_A$ and $\\vec v_B$ is $90^\\circ$, so the cross term vanishes:",
    },
    {
      type: "math",
      latex: "|\\vec v_A - \\vec v_B|^2 = 40^2 + 30^2 - 2(40)(30)\\cos 90^\\circ = 1600 + 900 = 2500, \\qquad |\\vec v_A - \\vec v_B| = 50 \\text{ km/h}",
    },
    {
      type: "text",
      content:
        "**Step 4 (direction).** Measured from north towards west, $\\tan\\phi = \\dfrac{30}{40}$, so $\\phi \\approx 36.9^\\circ$: car $A$ seems to move at 50 km/h, about $36.9^\\circ$ west of north.\n\n**Check.** Although $B$ drives east, $A$ appears to drift **west**. That is the negative vector at work, and it matches experience: from a moving car, things you pass seem to slide backwards.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — exam style: three collinear points.** With respect to an origin $O$, $\\overrightarrow{OA} = \\vec a$, $\\overrightarrow{OB} = \\vec b$ and $\\overrightarrow{OC} = 3\\vec a - 2\\vec b$, where $\\vec a$ and $\\vec b$ are not collinear. Show that $A$, $B$, $C$ lie on one line, and find the ratio $AC : AB$.\n\n**Step 1 (arrows between the points).** Use \"tip minus tail\" (the difference rule):\n\n$\\overrightarrow{AB} = \\vec b - \\vec a$, and $\\overrightarrow{AC} = (3\\vec a - 2\\vec b) - \\vec a = 2\\vec a - 2\\vec b$.\n*Why this step:* statements about points become statements about vectors once every arrow starts from the same point $A$.\n\n**Step 2 (spot the multiple).** $2\\vec a - 2\\vec b = -2(\\vec b - \\vec a)$, so",
    },
    {
      type: "math",
      latex: "\\overrightarrow{AC} = -2\\,\\overrightarrow{AB}",
    },
    {
      type: "text",
      content:
        "**Step 3 (conclude).** By the collinearity criterion, $\\overrightarrow{AC}$ and $\\overrightarrow{AB}$ are parallel. They also share the point $A$, so they lie along the **same** line, and $A$, $B$, $C$ are collinear.\n*Why this step:* parallel alone would allow two separate parallel lines; the common point $A$ rules that out.\n\n**Step 4 (ratio).** $|\\overrightarrow{AC}| = 2|\\overrightarrow{AB}|$, so $AC : AB = 2 : 1$. The minus sign says $C$ is on the opposite side of $A$ from $B$.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 — exam style (CBSE): the parallelogram identity.** $|\\vec a| = 3$, $|\\vec b| = 5$ and $|\\vec a + \\vec b| = 7$. Find $|\\vec a - \\vec b|$.\n\n**Step 1 (add the two length formulas).** The cross terms $+2|\\vec a||\\vec b|\\cos\\theta$ and $-2|\\vec a||\\vec b|\\cos\\theta$ cancel:",
    },
    {
      type: "math",
      latex: "|\\vec a + \\vec b|^2 + |\\vec a - \\vec b|^2 = 2\\left(|\\vec a|^2 + |\\vec b|^2\\right)",
    },
    {
      type: "text",
      content:
        "*Why this step:* we do not know $\\theta$, and adding the formulas removes it without ever finding it. Geometrically: the squares of the two diagonals of a parallelogram add up to the squares of its four sides.\n\n**Step 2 (substitute).** $49 + |\\vec a - \\vec b|^2 = 2(9 + 25) = 68$, so $|\\vec a - \\vec b|^2 = 19$ and $|\\vec a - \\vec b| = \\sqrt{19}$.\n\n**Check (the long way).** $49 = 9 + 25 + 30\\cos\\theta$ gives $\\cos\\theta = \\tfrac12$, $\\theta = 60^\\circ$. Then $|\\vec a - \\vec b|^2 = 34 - 30 \\times \\tfrac12 = 19$. The same answer.",
    },
    {
      type: "quiz",
      id: "va0-5-q1",
      variant: "concept",
      question: "$\\vec a$ and $\\vec b$ are drawn from a common point. Which arrow is $\\vec a - \\vec b$?",
      options: [
        { text: "From the tip of $\\vec a$ to the tip of $\\vec b$.", feedback: "That arrow is $\\vec b - \\vec a$. Check: adding it to $\\vec a$ gives $\\vec b$, not the other way round." },
        { text: "From the tip of $\\vec b$ to the tip of $\\vec a$.", correct: true, feedback: "It is what you add to $\\vec b$ to reach $\\vec a$." },
        { text: "The diagonal of the parallelogram from the common point.", feedback: "That diagonal is $\\vec a + \\vec b$." },
      ],
      hint: "$\\vec b + (\\vec a - \\vec b) = \\vec a$. Start at the tip of $\\vec b$.",
    },
    {
      type: "quiz",
      id: "va0-5-q2",
      variant: "practice",
      question: "$|\\vec a| = 2$. What is $|-3\\vec a|$?",
      options: [
        { text: "$-6$", feedback: "Magnitudes are never negative. The minus sign reverses the direction instead." },
        { text: "$6$", correct: true, feedback: "$|k|\\,|\\vec a| = 3 \\times 2 = 6$, pointing opposite to $\\vec a$." },
        { text: "$-1$", feedback: "Scaling multiplies the length; it does not add to it." },
        { text: "$\\tfrac23$", feedback: "Multiply the length by $|k|$, do not divide." },
      ],
    },
    {
      type: "quiz",
      id: "va0-5-q3",
      variant: "practice",
      question:
        "$ABCD$ is a parallelogram with $\\overrightarrow{AB} = \\vec a$ and $\\overrightarrow{AD} = \\vec b$. What is $\\overrightarrow{BD}$?",
      options: [
        { text: "$\\vec a + \\vec b$", feedback: "That is the other diagonal, $\\overrightarrow{AC}$." },
        { text: "$\\vec a - \\vec b$", feedback: "That is $\\overrightarrow{DB}$: the direction is reversed." },
        { text: "$\\vec b - \\vec a$", correct: true, feedback: "From the tip of $\\vec a$ (point $B$) to the tip of $\\vec b$ (point $D$)." },
        { text: "$\\tfrac12(\\vec a + \\vec b)$", feedback: "That reaches the centre of the parallelogram from $A$." },
      ],
      hint: "$\\overrightarrow{BD} = \\overrightarrow{BA} + \\overrightarrow{AD}$.",
    },
    {
      type: "quiz",
      id: "va0-5-q4",
      variant: "practice",
      question:
        "$\\vec a$ and $\\vec b$ are not collinear. For which $\\lambda$ are $2\\vec a + 3\\vec b$ and $\\lambda\\vec a + 6\\vec b$ collinear?",
      options: [
        { text: "$\\lambda = 2$", feedback: "Then the second vector is $2\\vec a + 6\\vec b$: the $\\vec b$ part doubled but the $\\vec a$ part did not." },
        { text: "$\\lambda = 4$", correct: true, feedback: "$4\\vec a + 6\\vec b = 2(2\\vec a + 3\\vec b)$." },
        { text: "$\\lambda = 1$", feedback: "Compare the ratios of coefficients: $\\lambda : 6$ must equal $2 : 3$." },
        { text: "$\\lambda = 9$", feedback: "You may have cross-multiplied the wrong way. $\\frac{\\lambda}{2} = \\frac{6}{3}$." },
      ],
    },
    {
      type: "quiz",
      id: "va0-5-q5",
      variant: "practice",
      question: "In triangle $ABC$, $\\overrightarrow{AB} - \\overrightarrow{AC}$ equals…",
      options: [
        { text: "$\\overrightarrow{BC}$", feedback: "The difference points towards the tip of the first vector, $B$. This one points away from it." },
        { text: "$\\overrightarrow{CB}$", correct: true, feedback: "From the tip of $\\overrightarrow{AC}$ (point $C$) to the tip of $\\overrightarrow{AB}$ (point $B$)." },
        { text: "$\\overrightarrow{AB} + \\overrightarrow{AC}$", feedback: "Subtracting is adding the negative, not adding the vector itself." },
        { text: "$\\vec 0$", feedback: "Only if $B = C$." },
      ],
    },
    {
      type: "quiz",
      id: "va0-5-q7",
      variant: "practice",
      question: "$\\vec a$ and $\\vec b$ are unit vectors with $|\\vec a - \\vec b| = 1$. What is the angle between them?",
      options: [
        { text: "$60^\\circ$", correct: true, feedback: "$1 = 1 + 1 - 2\\cos\\theta$ gives $\\cos\\theta = \\tfrac12$, so $\\theta = 60^\\circ$: $O$, $A$, $B$ form an equilateral triangle." },
        { text: "$120^\\circ$", feedback: "That is the answer for $|\\vec a + \\vec b| = 1$. For a difference the cross term is $-2|\\vec a||\\vec b|\\cos\\theta$." },
        { text: "$90^\\circ$", feedback: "At $90^\\circ$, $|\\vec a - \\vec b| = \\sqrt2$." },
        { text: "$0^\\circ$", feedback: "Equal unit vectors give $\\vec a - \\vec b = \\vec 0$, of length 0." },
      ],
      hint: "$|\\vec a - \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2 - 2|\\vec a||\\vec b|\\cos\\theta$.",
    },
    {
      type: "quiz",
      id: "va0-5-q6",
      variant: "concept",
      question: "Which statement about $k\\vec a$ (with $\\vec a \\neq \\vec 0$) is correct?",
      options: [
        { text: "It always points the same way as $\\vec a$.", feedback: "Negative $k$ reverses the direction. Slide $k$ below 0 in the interactive." },
        { text: "For $k = 0$ it is the number 0.", feedback: "It is the zero **vector** $\\vec 0$: a scalar times a vector is still a vector." },
        { text: "It is always collinear with $\\vec a$.", correct: true, feedback: "Whatever $k$ is, $k\\vec a$ lies along the line of $\\vec a$. That is the collinearity criterion." },
        { text: "Its magnitude is $k|\\vec a|$.", feedback: "Only for $k \\ge 0$. In general it is $|k|\\,|\\vec a|$." },
      ],
    },
    {
      type: "quiz",
      id: "va0-5-q8",
      variant: "practice",
      question:
        "A train moves east at 60 km/h and a car moves north at 80 km/h. How fast does the car appear to move to a passenger on the train?",
      options: [
        { text: "100 km/h", correct: true, feedback: "$|\\vec v_{\\text{car}} - \\vec v_{\\text{train}}|^2 = 80^2 + 60^2 - 0 = 10000$: perpendicular velocities, so the cross term vanishes." },
        { text: "20 km/h", feedback: "Subtracting speeds works only for velocities along the same line. These are perpendicular." },
        { text: "140 km/h", feedback: "Adding speeds works only when the relative velocities point the same way along one line." },
        { text: "$20\\sqrt7$ km/h", feedback: "You subtracted the squares. With $\\cos 90^\\circ = 0$, $|\\vec a - \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2$." },
      ],
      hint: "Relative velocity is $\\vec v_{\\text{car}} - \\vec v_{\\text{train}}$. What is the angle between the two velocities?",
    },
    {
      type: "quiz",
      id: "va0-5-q9",
      variant: "practice",
      question:
        "$\\overrightarrow{OA} = \\vec a$, $\\overrightarrow{OB} = \\vec b$ and $\\overrightarrow{OC} = \\lambda\\vec a + 3\\vec b$, where $\\vec a$ and $\\vec b$ are not collinear. For which $\\lambda$ are $A$, $B$, $C$ collinear?",
      options: [
        { text: "$\\lambda = -2$", correct: true, feedback: "$\\overrightarrow{AC} = (\\lambda - 1)\\vec a + 3\\vec b$ must be a multiple of $\\overrightarrow{AB} = -\\vec a + \\vec b$. The $\\vec b$ part forces the multiple to be 3, so $\\lambda - 1 = -3$. Check: $\\overrightarrow{AC} = -3\\vec a + 3\\vec b = 3\\overrightarrow{AB}$." },
        { text: "$\\lambda = 4$", feedback: "That makes $\\lambda - 1 = +3$, but the $\\vec a$ coefficient of $\\overrightarrow{AB}$ is $-1$, so it must be $-3$." },
        { text: "$\\lambda = -3$", feedback: "$-3$ is the coefficient of $\\vec a$ in $\\overrightarrow{AC}$, which is $\\lambda - 1$. Solve for $\\lambda$." },
        { text: "$\\lambda = 2$", feedback: "Then $\\overrightarrow{AC} = \\vec a + 3\\vec b$, which is not a multiple of $\\vec b - \\vec a$." },
      ],
      hint: "Write $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ as tip minus tail, then compare coefficients.",
    },
    {
      type: "quiz",
      id: "va0-5-q10",
      variant: "practice",
      question: "$|\\vec a| = 2$, $|\\vec b| = 3$ and $|\\vec a + \\vec b| = 4$. What is $|\\vec a - \\vec b|$?",
      options: [
        { text: "$\\sqrt{10}$", correct: true, feedback: "$16 + |\\vec a - \\vec b|^2 = 2(4 + 9) = 26$, so $|\\vec a - \\vec b|^2 = 10$." },
        { text: "$10$", feedback: "That is $|\\vec a - \\vec b|^2$. Take the square root." },
        { text: "$1$", feedback: "Lengths do not add or subtract like numbers. Use the parallelogram identity." },
        { text: "$\\sqrt{42}$", feedback: "You added $16$ instead of subtracting it: $|\\vec a - \\vec b|^2 = 26 - 16$." },
      ],
      hint: "$|\\vec a + \\vec b|^2 + |\\vec a - \\vec b|^2 = 2(|\\vec a|^2 + |\\vec b|^2)$.",
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
        "Everything in this chapter was done without a single coordinate: arrows, their lengths and directions, and the rules for adding, subtracting and scaling them. These questions mix all of it. Draw a sketch for each one; with vectors, the picture usually gives you the answer.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The toolkit",
      content:
        "**Triangle law:** $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$. **Polygon law:** a closed loop sums to $\\vec 0$.\n**Difference:** $\\vec a - \\vec b$ runs from the tip of $\\vec b$ to the tip of $\\vec a$.\n**Length of a sum:** $|\\vec a + \\vec b|^2 = |\\vec a|^2 + |\\vec b|^2 + 2|\\vec a||\\vec b|\\cos\\theta$, with $\\theta$ measured tail to tail, and $\\big||\\vec a| - |\\vec b|\\big| \\le |\\vec a + \\vec b| \\le |\\vec a| + |\\vec b|$.\n**Collinear:** $\\vec b = \\lambda\\vec a$. For non-collinear $\\vec a$ and $\\vec b$, compare coefficients.",
    },
    {
      type: "quiz",
      id: "va0-6-q1",
      variant: "mastery",
      question: "Which statement is true?",
      options: [
        { text: "Equal vectors must have the same initial point.", feedback: "Equality is magnitude and direction only. Opposite sides of a parallelogram are equal." },
        { text: "Parallel vectors must point in the same direction.", feedback: "Parallel (collinear) vectors may point in opposite directions." },
        {
          text: "Two collinear vectors of the same magnitude are either equal or negatives of each other.",
          correct: true,
          feedback: "Collinear means same or opposite direction. With equal lengths, that gives $\\vec b = \\vec a$ or $\\vec b = -\\vec a$.",
        },
        { text: "Any two unit vectors are equal.", feedback: "Unit vectors share a length, not a direction." },
      ],
    },
    {
      type: "quiz",
      id: "va0-6-q2",
      variant: "mastery",
      question: "$|\\vec a| = 5$ and $|\\vec b| = 3$. Which value can $|\\vec a + \\vec b|$ **not** take?",
      options: [
        { text: "2", feedback: "Possible: opposite directions give $5 - 3 = 2$." },
        { text: "5", feedback: "Possible: $25 = 25 + 9 + 30\\cos\\theta$ gives $\\cos\\theta = -0.3$, a valid angle (about $107^\\circ$)." },
        { text: "8", feedback: "Possible: the same direction gives $5 + 3 = 8$." },
        { text: "1", correct: true, feedback: "The sum is at least $5 - 3 = 2$ long: $\\big||\\vec a| - |\\vec b|\\big| \\le |\\vec a + \\vec b|$." },
      ],
    },
    {
      type: "quiz",
      id: "va0-6-q3",
      variant: "mastery",
      question:
        "$ABCDEF$ is a regular hexagon. What is $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD} + \\overrightarrow{DE} + \\overrightarrow{EF} + \\overrightarrow{FA}$?",
      options: [
        { text: "$6\\overrightarrow{AB}$", feedback: "The six sides point in six different directions; they do not add up like lengths." },
        { text: "$\\vec 0$", correct: true, feedback: "The chain goes all the way round and returns to $A$: the polygon law." },
        { text: "$2\\overrightarrow{AD}$", feedback: "Follow the letters: the path ends back at $A$." },
        { text: "The perimeter of the hexagon.", feedback: "The perimeter is a scalar. A sum of vectors is a vector." },
      ],
    },
    {
      type: "quiz",
      id: "va0-6-q4",
      variant: "mastery",
      question:
        "$ABCDEF$ is a regular hexagon. Simplify $\\overrightarrow{AB} + \\overrightarrow{AC} + \\overrightarrow{AD} + \\overrightarrow{AE} + \\overrightarrow{AF}$.",
      options: [
        { text: "$\\vec 0$", feedback: "These arrows all start at $A$; they do not form a closed loop." },
        { text: "$2\\overrightarrow{AD}$", feedback: "Close, but you have left one pair or the middle term out." },
        { text: "$3\\overrightarrow{AD}$", correct: true, feedback: "Opposite sides are equal: $\\overrightarrow{AB} = \\overrightarrow{ED}$ and $\\overrightarrow{AF} = \\overrightarrow{CD}$. So $\\overrightarrow{AB} + \\overrightarrow{AE} = \\overrightarrow{AE} + \\overrightarrow{ED} = \\overrightarrow{AD}$, and likewise $\\overrightarrow{AC} + \\overrightarrow{AF} = \\overrightarrow{AD}$. Add the middle term for $3\\overrightarrow{AD}$." },
        { text: "$5\\overrightarrow{AD}$", feedback: "Only the middle arrow is $\\overrightarrow{AD}$; the others are shorter and point in other directions." },
      ],
      hint: "Pair $\\overrightarrow{AB}$ with $\\overrightarrow{AE}$, and $\\overrightarrow{AC}$ with $\\overrightarrow{AF}$. Opposite sides of the hexagon are equal vectors.",
    },
    {
      type: "quiz",
      id: "va0-6-q5",
      variant: "mastery",
      question:
        "The diagonals of parallelogram $ABCD$ are $\\overrightarrow{AC} = \\vec p$ and $\\overrightarrow{BD} = \\vec q$. What is $\\overrightarrow{AB}$?",
      options: [
        { text: "$\\tfrac12(\\vec p + \\vec q)$", feedback: "That is $\\overrightarrow{AD}$." },
        { text: "$\\tfrac12(\\vec p - \\vec q)$", correct: true, feedback: "With $\\overrightarrow{AB} = \\vec a$ and $\\overrightarrow{AD} = \\vec b$: $\\vec p = \\vec a + \\vec b$ and $\\vec q = \\vec b - \\vec a$, so $\\vec p - \\vec q = 2\\vec a$." },
        { text: "$\\vec p - \\vec q$", feedback: "$\\vec p - \\vec q$ is $2\\overrightarrow{AB}$; halve it." },
        { text: "$\\tfrac12(\\vec q - \\vec p)$", feedback: "That is $\\overrightarrow{BA}$, the reverse." },
      ],
      hint: "Write $\\vec p$ and $\\vec q$ in terms of $\\overrightarrow{AB}$ and $\\overrightarrow{AD}$ first.",
    },
    {
      type: "quiz",
      id: "va0-6-q6",
      variant: "mastery",
      question:
        "$\\vec a$ and $\\vec b$ are unit vectors and $\\vec a + \\vec b$ is also a unit vector. What is the angle between $\\vec a$ and $\\vec b$?",
      options: [
        { text: "$60^\\circ$", feedback: "At $60^\\circ$, $|\\vec a + \\vec b|^2 = 1 + 1 + 1 = 3$." },
        { text: "$90^\\circ$", feedback: "At $90^\\circ$, $|\\vec a + \\vec b| = \\sqrt2$." },
        { text: "$120^\\circ$", correct: true, feedback: "$1 = 1 + 1 + 2\\cos\\theta$ gives $\\cos\\theta = -\\tfrac12$, so $\\theta = 120^\\circ$: two sides of an equilateral triangle." },
        { text: "$180^\\circ$", feedback: "Opposite unit vectors cancel to $\\vec 0$." },
      ],
    },
    {
      type: "quiz",
      id: "va0-6-q7",
      variant: "mastery",
      question:
        "The resultant of two forces $P$ and $Q$ is at most 17 N and at least 7 N. What is the resultant when they act at right angles?",
      options: [
        { text: "12 N", feedback: "That is the larger force itself: $P + Q = 17$ and $P - Q = 7$ give $P = 12$, $Q = 5$." },
        { text: "13 N", correct: true, feedback: "$P = 12$, $Q = 5$, and at right angles $\\sqrt{144 + 25} = 13$ N." },
        { text: "$\\sqrt{338}$ N", feedback: "You squared 17 and 7 instead of the forces themselves." },
        { text: "10 N", feedback: "Averaging 17 and 7 does not give the right-angle resultant." },
      ],
      hint: "The largest resultant is $P + Q$ and the smallest is $P - Q$.",
    },
    {
      type: "quiz",
      id: "va0-6-q8",
      variant: "mastery",
      question:
        "$\\vec a$ and $\\vec b$ are not collinear. For which $\\mu$ are $\\vec a - 2\\vec b$ and $3\\vec a + \\mu\\vec b$ collinear?",
      options: [
        { text: "$\\mu = 6$", feedback: "The sign matters: tripling $\\vec a - 2\\vec b$ gives $-6\\vec b$." },
        { text: "$\\mu = -6$", correct: true, feedback: "$3\\vec a - 6\\vec b = 3(\\vec a - 2\\vec b)$." },
        { text: "$\\mu = -\\tfrac23$", feedback: "Set $3\\vec a + \\mu\\vec b = t(\\vec a - 2\\vec b)$: $t = 3$, then $\\mu = -2t$." },
        { text: "No value works.", feedback: "One value of $\\mu$ makes the second vector a multiple of the first." },
      ],
    },
    {
      type: "quiz",
      id: "va0-6-q9",
      variant: "mastery",
      question:
        "In triangle $ABC$, $D$ is the midpoint of $BC$. Which is equal to $\\overrightarrow{AB} + \\overrightarrow{AC}$?",
      options: [
        { text: "$\\overrightarrow{AD}$", feedback: "$\\overrightarrow{AD}$ is only half of the sum." },
        { text: "$2\\overrightarrow{AD}$", correct: true, feedback: "$\\overrightarrow{AD} = \\tfrac12(\\overrightarrow{AB} + \\overrightarrow{AC})$: the median is half the parallelogram diagonal." },
        { text: "$\\overrightarrow{BC}$", feedback: "$\\overrightarrow{BC}$ is the *difference* $\\overrightarrow{AC} - \\overrightarrow{AB}$." },
        { text: "$2\\overrightarrow{DA}$", feedback: "The sum points away from $A$, towards $D$." },
      ],
    },
    {
      type: "quiz",
      id: "va0-6-q10",
      variant: "mastery",
      question:
        "$ABCDEF$ is a regular hexagon with $\\overrightarrow{AB} = \\vec a$ and $\\overrightarrow{BC} = \\vec b$. What is $\\overrightarrow{CD}$?",
      options: [
        { text: "$\\vec b - \\vec a$", correct: true, feedback: "The long diagonal $\\overrightarrow{AD}$ is parallel to $BC$ and twice as long, so $\\overrightarrow{AD} = 2\\vec b$. Then $\\overrightarrow{CD} = \\overrightarrow{AD} - \\overrightarrow{AB} - \\overrightarrow{BC} = 2\\vec b - \\vec a - \\vec b = \\vec b - \\vec a$." },
        { text: "$\\vec a - \\vec b$", feedback: "That is $\\overrightarrow{DC}$, the reverse. Check the chain $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD}$ must equal $\\overrightarrow{AD} = 2\\vec b$." },
        { text: "$\\vec a + \\vec b$", feedback: "That is $\\overrightarrow{AC}$, the short diagonal from $A$ by the triangle law." },
        { text: "$2\\vec b$", feedback: "That is $\\overrightarrow{AD}$, the long diagonal. $\\overrightarrow{CD}$ is one side of the hexagon." },
      ],
      hint: "First show $\\overrightarrow{AD} = 2\\vec b$, then use $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD} = \\overrightarrow{AD}$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "So far every argument was a picture. Chapter 1 pins the arrows to an origin and a grid, and each vector becomes a list of numbers that can be added and scaled one component at a time, with the same rules you proved here with triangles.",
    },
  ]),
};

export const vectorsChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
