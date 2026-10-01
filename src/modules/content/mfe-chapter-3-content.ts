import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Mechanics I Chapter 3 — Newton's Laws of Motion.
 * Forces as interactions, the three laws, and the one method that solves
 * every problem: isolate the body, draw its free-body diagram, choose axes,
 * write ΣF = ma per axis and add the constraint equations. Then equilibrium,
 * connected bodies, constraint relations and pseudo forces.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "force-inertia-and-the-first-law",
  title: "3.1 · Force, Inertia and the First Law",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Push a book across a table and let go. It slides a little and stops. For nearly two thousand years this was taken as the natural law of motion: Aristotle taught that a moving thing stops unless something keeps pushing it, so motion needs a cause and rest does not. Everyday experience agrees with him almost every time. And yet he was wrong, and seeing *why* he was wrong is the whole of this lesson.",
    },
    {
      type: "text",
      content:
        "**Galileo's double inclined plane.** Roll a ball down one ramp and up a facing ramp. It climbs almost to the height it started from, and the smoother the ramps, the closer it gets. Now make the second ramp less steep: the ball still climbs to nearly the same height, but has to travel further along the ramp to get there. Lower the second ramp all the way to horizontal. The ball can never reach its starting height, so how far does it go? Galileo's answer: for ever, if nothing slows it. The book on the table stops not because motion dies out on its own, but because a force, friction, is acting on it the whole time.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Newton's first law (the law of inertia)",
      content:
        "A body stays at rest, or keeps moving in a straight line at constant speed, unless a net external force acts on it.\nIn symbols: $\\sum \\vec F = \\vec 0 \\iff \\vec v$ is constant. Rest is just the special case $\\vec v = \\vec 0$.",
    },
    {
      type: "text",
      content:
        "The law talks about **net** force. A car cruising at a steady 72 km/h on a level road has plenty of forces on it (engine drive through the tyres, air drag, rolling resistance, weight, the road's push), but they add up to zero. Zero net force does not mean *no motion*; it means *no change in motion*. The track below is the kinematics lab from Chapter 1 with the acceleration pinned at zero. Choose any starting velocity you like and play it.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-motion-lab",
        mode: "line",
        sliders: {
          x0: { min: 0, max: 0, step: 1, initial: 0 },
          u: { min: -10, max: 10, step: 1, initial: 4 },
          a: { min: 0, max: 0, step: 1, initial: 0 },
        },
        duration: 6,
        graphs: ["x", "v"],
        caption:
          "Acceleration is pinned at zero, which is what zero net force means. Change u and replay: the x-t graph is always a straight line and the v-t graph is always flat.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: whatever $u$ you pick, the velocity graph stays perfectly flat and the position grows in a straight line. With no net force the particle neither speeds up, slows down nor turns. It does not \"run out\" of motion. Only when you pick $u = 0$ does it stay at rest, and that is no more natural than any other constant velocity.",
    },
    {
      type: "text",
      content:
        "**Where forces come from.** At the deepest level physics knows four fundamental interactions: gravitation, electromagnetism, and the strong and weak nuclear forces. In mechanics you meet only two of them directly. Gravity gives the **weight** $mg$. Every other force you draw (the **normal force** from a surface, the **tension** in a string, **friction**, the push of a **spring**) is electromagnetism in disguise: atoms at the contact surfaces are squeezed or stretched a tiny amount and their electric forces push back. We call these **contact forces**, and we never need their microscopic details, only their directions and the rules they obey.",
    },
    {
      type: "table",
      headers: ["Force", "Acts along", "Origin"],
      rows: [
        ["Weight $mg$", "vertically down", "gravitation"],
        ["Normal force $N$", "perpendicular to the contact surface, pushing", "electromagnetic (contact)"],
        ["Tension $T$", "along the string, pulling", "electromagnetic (contact)"],
        ["Friction $f$", "along the surface, opposing relative sliding", "electromagnetic (contact)"],
        ["Spring force $kx$", "along the spring, towards its natural length", "electromagnetic (contact)"],
      ],
    },
    {
      type: "text",
      content:
        "**Inertia and mass.** The first law says bodies *resist changes* in their velocity. That resistance is called **inertia**, and its measure is **mass**. A loaded truck and a bicycle rolling at the same speed both keep rolling, but the truck needs a far bigger force to stop in the same time: it has more inertia. Mass (in kg) is a scalar property of the body; it is not the same thing as weight, which is a force (in N) that depends on where the body is.",
    },
    {
      type: "text",
      content:
        "**Three everyday demonstrations.**\n\n1. **The bus starts.** The floor drags your feet forward; your upper body, with nothing pushing it, tends to stay where it was. You feel \"thrown back\", but in the ground's view you were simply left behind. When the bus brakes, the opposite happens and you lurch forward.\n2. **Beating a carpet.** The stick jerks the carpet forward suddenly. The dust particles are only weakly attached, so they tend to stay at rest and the carpet moves out from under them.\n3. **The coin on a card.** Put a card on a glass and a coin on the card. Flick the card away sharply: the coin drops straight into the glass. The friction from the card acts only for a tiny moment, too briefly to give the coin much velocity.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Inertial frames",
      content:
        "The first law is not true from every point of view. Sitting in a bus that brakes, you see a loose bottle roll forward with no horizontal force on it. A frame of reference in which the first law **does** hold is called an **inertial frame**. The ground is an inertial frame to excellent accuracy for everything in this course; any frame moving at constant velocity relative to it is inertial too. An accelerating bus, lift or merry-go-round is **not**. Lesson 3.7 shows how to work in such frames anyway.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a raindrop at terminal velocity).** A raindrop of mass $3 \\times 10^{-5}$ kg falls at a steady 8 m/s near the ground. Take $g = 10$ m/s² (as throughout this course unless stated). What is the air resistance on it?\n\n1. The speed is steady and the path is straight, so $\\vec v$ is constant. *Why this step:* the first law turns \"constant velocity\" directly into \"net force zero\"; no other information about the motion is needed.\n2. Forces: weight $mg = 3 \\times 10^{-5} \\times 10 = 3 \\times 10^{-4}$ N down, and air drag $D$ up.\n3. Net force zero: $D - mg = 0$, so $D = 3 \\times 10^{-4}$ N upward.\n4. Notice what is *not* in the answer: the speed 8 m/s. Any steady speed would give the same drag. The drop is not \"held up\" by anything clever; drag simply grew as it sped up until it balanced the weight.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (a car at steady speed).** A 1000 kg car moves at a constant 20 m/s along a straight level road. The road drives the car forward with a force of 600 N. Find the total resistance (air drag plus rolling resistance) and the normal force.\n\n1. Constant velocity, so $\\sum \\vec F = \\vec 0$ along each axis separately. *Why this step:* a vector equation is really one equation per axis; here, horizontal and vertical.\n2. Horizontal: $600 - R = 0$, so $R = 600$ N backward.\n3. Vertical: $N - mg = 0$, so $N = 1000 \\times 10 = 10\\,000$ N.\n4. The engine is not \"winning\" against resistance; it is exactly tied with it. Press harder and the forces stop cancelling: then (and only then) the car speeds up.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (finding the missing force).** Two forces act on a puck on smooth ice: $\\vec F_1 = 3\\hat i + 4\\hat j$ N and $\\vec F_2 = -5\\hat i + 2\\hat j$ N. What third force keeps it moving at constant velocity?\n\n1. Constant velocity requires $\\vec F_1 + \\vec F_2 + \\vec F_3 = \\vec 0$.\n2. So $\\vec F_3 = -(\\vec F_1 + \\vec F_2) = -(-2\\hat i + 6\\hat j) = 2\\hat i - 6\\hat j$ N. *Why this step:* the third force must exactly cancel the resultant of the other two, so it is the resultant reversed.\n3. Its size is $\\sqrt{4 + 36} = \\sqrt{40} = 2\\sqrt{10} \\approx 6.32$ N.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a lift at constant speed).** A 60 kg student stands on a bathroom scale in a lift moving **upward** at a steady 3 m/s. What does the scale push with?\n\n1. The velocity is constant (3 m/s up, unchanging), so the net force is zero. *Why this step:* it is tempting to think \"moving up means the upward force wins\"; the first law says motion at constant velocity needs no winner.\n2. $N - mg = 0$, so $N = 600$ N, exactly as if the lift were standing still.\n3. The scale reading changes only while the lift is *speeding up or slowing down*, which is Lesson 3.7.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a moving body needs a force to keep it moving\"",
      content:
        "A force is needed to **change** velocity, not to maintain it. When you keep pushing a trolley to keep it rolling, your push is not keeping the motion alive; it is cancelling friction. Remove friction (a puck on ice, a probe in deep space) and the body keeps going on its own. The Voyager probes have coasted beyond the outermost planets for decades with their engines off.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Read \"constant velocity\" as \"equilibrium\"",
      content:
        "In an exam, the words *steady*, *uniform*, *constant speed in a straight line*, *terminal velocity* or *at rest* all mean the same thing for forces: the vector sum is zero. Write $\\sum F_x = 0$ and $\\sum F_y = 0$ and solve.",
    },
    {
      type: "quiz",
      id: "mfe3-1-q1",
      variant: "concept",
      question: "A spacecraft far from all stars and planets is moving at 2 km/s with its engines off. What happens to its velocity?",
      options: [
        { text: "It slowly decreases, because there is nothing to keep it moving.", feedback: "That is Aristotle's view. With no force acting, nothing changes the velocity; motion does not \"run out\"." },
        { text: "It decreases to zero quickly, because space has no air to push on.", feedback: "Nothing needs to push the craft for it to keep moving. Air would actually slow it down." },
        { text: "It stays at 2 km/s in the same direction.", correct: true, feedback: "Zero net force means constant velocity: same speed, same direction, for ever." },
        { text: "It keeps its speed but gradually curves.", feedback: "A curve is a change of direction, which is a change of velocity and needs a sideways force." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-1-q2",
      variant: "practice",
      question: "A 1200 kg car moves at a constant 25 m/s on a straight level road. The total resistance on it is 900 N. What forward force does the road exert on the tyres?",
      options: [
        { text: "$900$ N", correct: true, feedback: "Constant velocity: forward force − 900 N = 0." },
        { text: "$0$ N, since the car is not accelerating", feedback: "The *net* force is zero, but that needs a forward force to cancel the 900 N of resistance." },
        { text: "$12\\,000$ N", feedback: "That is the weight $mg$, which acts vertically and is balanced by the normal force, not by the drive." },
        { text: "$30\\,000$ N", feedback: "Force is not mass times speed. With constant velocity the acceleration, not the speed, is what enters $\\sum F = ma$, and it is zero." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-1-q3",
      variant: "concept",
      question: "When a bus brakes suddenly, standing passengers lurch forward. From the ground frame, what is the correct explanation?",
      options: [
        { text: "A forward force acts on the passengers when the bus brakes.", feedback: "No new forward force appears. In the ground frame nothing pushes them forward." },
        { text: "Air in the bus pushes them forward.", feedback: "The air moves with the bus; it has nothing to do with the lurch." },
        { text: "The passengers' bodies tend to keep moving at the old speed while the bus (and their feet) slow down.", correct: true, feedback: "That is inertia. The floor slows their feet through friction; their upper bodies carry on until the rest of the body drags them back." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-1-q4",
      variant: "practice",
      question: "Forces $\\vec F_1 = 2\\hat i - 3\\hat j$ N and $\\vec F_2 = \\hat i + 7\\hat j$ N act on a particle. What single extra force makes it move with constant velocity?",
      options: [
        { text: "$3\\hat i + 4\\hat j$ N", feedback: "That is the resultant of the two forces. You need the force that cancels it." },
        { text: "$-3\\hat i - 4\\hat j$ N", correct: true, feedback: "$\\vec F_1 + \\vec F_2 = 3\\hat i + 4\\hat j$, so the third force is $-(3\\hat i + 4\\hat j)$, of size 5 N." },
        { text: "$-\\hat i + 10\\hat j$ N", feedback: "That is $\\vec F_2 - \\vec F_1$. Constant velocity needs the sum of all three to vanish." },
        { text: "No extra force: the particle already moves at constant velocity.", feedback: "The two forces add to $3\\hat i + 4\\hat j \\neq \\vec 0$, so the particle is accelerating." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-1-q5",
      variant: "concept",
      question: "Which of these is an inertial frame (to a good approximation)?",
      options: [
        { text: "A train moving at a steady 100 km/h on straight track", correct: true, feedback: "Constant velocity relative to the ground, so the first law holds inside it: a ball on the floor stays put." },
        { text: "A car turning a corner at constant speed", feedback: "Turning means the velocity's direction is changing: the car accelerates towards the centre." },
        { text: "A lift that is slowing down as it arrives at a floor", feedback: "Slowing down is acceleration. In this frame a hanging bob behaves as if gravity were weaker or stronger." },
        { text: "A merry-go-round spinning at a steady rate", feedback: "Every point on it moves in a circle, so it accelerates. Loose objects slide outward with no push." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "second-law-momentum-and-impulse",
  title: "3.2 · Second Law, Momentum and Impulse",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Catch a cricket ball with stiff arms and it stings. Catch the same ball while drawing your hands back and it barely hurts. The ball arrives with the same speed and ends at rest either way, so something about the catch is the same and something is different. The second law, written in its original form, tells you exactly what.",
    },
    {
      type: "text",
      content:
        "The first law says force changes motion. To say *how much*, we need a measure of \"quantity of motion\" that captures both how heavy and how fast. A slow truck and a fast bullet can be equally hard to stop. Newton used the product of mass and velocity.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Momentum",
      content:
        "The linear momentum of a body of mass $m$ moving with velocity $\\vec v$ is $\\vec p = m\\vec v$.\nIt is a vector along $\\vec v$. SI unit: kg m/s (which, you will see, is the same as N s).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Newton's second law",
      content:
        "The net force on a body equals the rate of change of its momentum:\n$\\displaystyle \\sum\\vec F = \\frac{d\\vec p}{dt}$.\nFor a body of constant mass, $\\frac{d}{dt}(m\\vec v) = m\\frac{d\\vec v}{dt}$, so $\\sum\\vec F = m\\vec a$.",
    },
    {
      type: "text",
      content:
        "Three things are packed into $\\sum\\vec F = m\\vec a$. It is a **vector** equation, so it holds along each axis separately: $\\sum F_x = ma_x$, $\\sum F_y = ma_y$. The acceleration is along the **net** force, not along the velocity. And it contains the first law as the case $\\sum\\vec F = \\vec 0 \\Rightarrow \\vec a = \\vec 0$.",
    },
    {
      type: "text",
      content:
        "**The newton.** The unit of force is *defined* by the second law: 1 N is the net force that gives a 1 kg mass an acceleration of 1 m/s². So $1\\text{ N} = 1\\text{ kg m s}^{-2}$, and a force times a time, N s, is kg m/s, the unit of momentum.",
    },
    {
      type: "text",
      content:
        "**Impulse.** Multiply the second law by $dt$ and add up over the time the force acts:",
    },
    {
      type: "math",
      latex: "\\vec J = \\int_{t_1}^{t_2} \\vec F\\,dt = \\int_{t_1}^{t_2} \\frac{d\\vec p}{dt}\\,dt = \\vec p_2 - \\vec p_1 = \\Delta\\vec p",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Impulse–momentum theorem",
      content:
        "The impulse of a force, $\\vec J = \\int \\vec F\\,dt$, is the **area under the $F$-$t$ graph**. The impulse of the net force equals the change in momentum: $\\vec J = \\Delta\\vec p$.\nThe average force over a time $\\Delta t$ is $\\vec F_{\\text{avg}} = \\dfrac{\\Delta\\vec p}{\\Delta t}$.",
    },
    {
      type: "text",
      content:
        "Now the cricket catch is clear. Stopping the ball requires a fixed impulse, $\\Delta p = mv$, however you catch it. Drawing the hands back stretches the stopping time $\\Delta t$, so the average force $\\Delta p/\\Delta t$ is smaller. Airbags, crumple zones, the sand pit for long jumpers and bending your knees when you land all use the same trade: same area under the $F$-$t$ graph, longer and lower.",
    },
    {
      type: "text",
      content:
        "Real impact forces are not constant. A bat hitting a ball pushes gently at first, peaks, and falls off. The graph below is a model of such a pulse: $x$ stands for time $t$ in seconds and the curve is the force in newtons, rising linearly to 400 N at $t = 0.1$ s and falling back to zero at $t = 0.2$ s.",
    },
    {
      type: "interactive",
      config: {
        component: "graph-explorer",
        expr: "400 - 4000*abs(x - 0.1)",
        exprLatex: "400 - 4000\\,|x - 0.1|",
        window: { xmin: 0, xmax: 0.2, ymin: 0, ymax: 450 },
        initial: 0.1,
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the force is 400 N only at the single instant $t = 0.1$ s and much less on either side (at $t = 0.05$ s it is 200 N). The impulse is the area of the triangle, $\\tfrac12 \\times 0.2 \\times 400 = 40$ N s, and the average force is $40/0.2 = 200$ N, half the peak. For a triangular pulse the average is always half the peak.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (ball against a wall).** A 0.15 kg ball hits a wall at 20 m/s and rebounds along the same line at 15 m/s. Contact lasts 0.01 s. Find the impulse and the average force on the ball.\n\n1. Choose a sign: away from the wall is positive. Then $u = -20$ m/s and $v = +15$ m/s. *Why this step:* momentum is a vector; the rebound reverses its direction, and a sign convention keeps track of that.\n2. $\\Delta p = m(v - u) = 0.15\\,(15 - (-20)) = 0.15 \\times 35 = 5.25$ N s, away from the wall.\n3. $F_{\\text{avg}} = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{5.25}{0.01} = 525$ N away from the wall.\n4. Check the trap: using speeds $15 - 20$ gives $-0.75$ N s, which would mean the wall barely touched the ball. Reversing direction always *adds* the speeds.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (machine gun).** A machine gun fires 10 bullets per second, each of mass 20 g, at 500 m/s. What average force must the gunner apply to hold it still?\n\n1. Each bullet gains momentum $mv = 0.02 \\times 500 = 10$ N s. *Why this step:* the gun gives every bullet this momentum and, by the third law (Lesson 3.3), receives an equal and opposite kick.\n2. In one second the gun delivers $n\\,m v = 10 \\times 10 = 100$ N s of momentum.\n3. Average force = momentum per second = 100 N. The gunner must push forward with 100 N on average.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (force from $\\vec p(t)$).** A particle's momentum is $\\vec p = 2t^2\\,\\hat i + 3t\\,\\hat j$ kg m/s. Find the force at $t = 1$ s.\n\n1. $\\vec F = \\dfrac{d\\vec p}{dt} = 4t\\,\\hat i + 3\\,\\hat j$. *Why this step:* the second law in momentum form needs no mass or acceleration, only the derivative of $\\vec p$.\n2. At $t = 1$: $\\vec F = 4\\hat i + 3\\hat j$ N, of size $\\sqrt{16 + 9} = 5$ N.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (reading the pulse).** The triangular pulse above acts on a 2 kg puck initially at rest on smooth ice. How fast is the puck moving afterwards?\n\n1. Impulse = area = 40 N s.\n2. $\\Delta p = mv - 0 = 40$, so $v = 40/2 = 20$ m/s. *Why this step:* you never need the force at every instant, only the area. That is why impulse is so useful for collisions, where $F(t)$ is unknown but $\\Delta p$ is easy.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (bounce on a floor, JEE Main style).** A 0.2 kg ball is dropped from 5 m, bounces, and rises to 1.25 m. Contact with the floor lasts 0.05 s. Find the average force exerted by the floor.\n\n1. Speed on arrival: $\\sqrt{2gh} = \\sqrt{100} = 10$ m/s down. Speed on leaving: $\\sqrt{2 \\times 10 \\times 1.25} = 5$ m/s up.\n2. Taking up as positive, $\\Delta p = 0.2\\,(5 - (-10)) = 3$ N s.\n3. This is the impulse of the **net** force, so $F_{\\text{net, avg}} = 3/0.05 = 60$ N upward.\n4. The net force is $N - mg$, so $N_{\\text{avg}} = 60 + 0.2 \\times 10 = 62$ N. *Why this step:* the impulse–momentum theorem uses the net force. During the bounce the weight still acts; the floor has to beat it too. Here it barely matters (62 vs 60), which is why weight is often neglected during short impacts.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the bigger impulse always means the bigger force\"",
      content:
        "Impulse is force *times time*. A 10 N s impulse delivered in 0.001 s needs 10 000 N; the same impulse delivered in 1 s needs only 10 N. A gentle push held for a long time can change momentum more than a sharp blow. When the question asks about force, you need the time as well.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Always fix a positive direction first",
      content:
        "Almost every impulse error is a sign error in $\\Delta p = m(v - u)$. Write \"+ is ...\" at the top of your working before you substitute a single velocity.",
    },
    {
      type: "quiz",
      id: "mfe3-2-q1",
      variant: "practice",
      question: "A 0.5 kg ball moving at 12 m/s hits a bat and returns along the same line at 18 m/s. Contact lasts 0.02 s. What is the average force on the ball?",
      options: [
        { text: "$150$ N", feedback: "That uses $18 - 12 = 6$ m/s. The ball reverses, so the change in velocity is $18 + 12 = 30$ m/s." },
        { text: "$15$ N", feedback: "15 N s is the impulse. Divide by the contact time to get the force." },
        { text: "$750$ N", correct: true, feedback: "$\\Delta p = 0.5 \\times 30 = 15$ N s, and $15/0.02 = 750$ N." },
        { text: "$450$ N", feedback: "That is $0.5 \\times 18/0.02$: it counts only the final momentum, as if the ball started at rest." },
      ],
      hint: "Take the rebound direction as positive, so the initial velocity is $-12$ m/s.",
    },
    {
      type: "quiz",
      id: "mfe3-2-q2",
      variant: "concept",
      question: "Why does an airbag reduce injury in a crash?",
      options: [
        { text: "It reduces the change in the passenger's momentum.", feedback: "The passenger goes from the car's speed to rest either way, so $\\Delta p$ is the same." },
        { text: "It spreads the same change in momentum over a longer time, so the average force is smaller.", correct: true, feedback: "$F_{\\text{avg}} = \\Delta p/\\Delta t$. Same $\\Delta p$, bigger $\\Delta t$, smaller force (and spread over a bigger area too)." },
        { text: "It increases the impulse on the passenger.", feedback: "The impulse equals $\\Delta p$, which is fixed by the initial and final speeds." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-2-q3",
      variant: "practice",
      question: "A force rises linearly from 0 to 600 N in 0.1 s and then falls linearly back to 0 in another 0.1 s. It acts on a 3 kg body at rest. What is the body's final speed?",
      options: [
        { text: "$40$ m/s", feedback: "That is the area of a rectangle $600 \\times 0.2 = 120$ divided by 3. The pulse is a triangle." },
        { text: "$10$ m/s", feedback: "That uses only half the pulse (the rising part, 30 N s). The force keeps acting while it falls." },
        { text: "$200$ m/s", feedback: "You divided the peak force by the mass: that is the peak acceleration, not a speed." },
        { text: "$20$ m/s", correct: true, feedback: "Area $= \\tfrac12 \\times 0.2 \\times 600 = 60$ N s, and $v = 60/3 = 20$ m/s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-2-q4",
      variant: "practice",
      question: "The momentum of a particle is $p = 5t^2 - 2t$ (SI units) along a line. What force acts on it at $t = 2$ s?",
      options: [
        { text: "$16$ N", feedback: "That is the momentum at $t = 2$, not its rate of change." },
        { text: "$18$ N", correct: true, feedback: "$F = dp/dt = 10t - 2 = 18$ N." },
        { text: "$20$ N", feedback: "You dropped the $-2$ from the derivative." },
        { text: "$10$ N", feedback: "That is $d^2p/dt^2$. Force is the first derivative of momentum." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-2-q5",
      variant: "concept",
      question: "Two forces act on identical carts at rest: force A is 100 N for 0.01 s; force B is 2 N for 1 s. Which cart ends up faster?",
      options: [
        { text: "Cart A, because its force is fifty times bigger.", feedback: "Force alone does not decide it. Compare impulses: A gives 1 N s, B gives 2 N s." },
        { text: "They end up equally fast.", feedback: "Work out the two areas under $F$-$t$: 1 N s and 2 N s." },
        { text: "Cart B, because its impulse (2 N s) is twice A's (1 N s).", correct: true, feedback: "The change in momentum equals the impulse, force times time, not the force." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "third-law-and-free-body-diagrams",
  title: "3.3 · Third Law and Free-Body Diagrams",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Lean on a wall and it pushes back on you. Step off a small boat and it drifts away behind you. A rocket, with nothing to push on, still accelerates. All three are the same fact: forces are never lone pushes. A force is one half of an **interaction** between two bodies, and the other half always acts on the other body.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Newton's third law",
      content:
        "If body A exerts a force $\\vec F_{AB}$ on body B, then B exerts a force $\\vec F_{BA} = -\\vec F_{AB}$ on A.\nThe two forces of a pair are equal in size, opposite in direction, of the **same kind** (both gravitational, both contact...), act at the same time, and act on **different bodies**.",
    },
    {
      type: "text",
      content:
        "The last clause is the one that matters. Because the two forces act on different bodies, they **never** appear in the same free-body diagram, and they can never cancel each other. A horse pulling a cart is pulled back by the cart just as hard, yet the cart moves: the cart's motion is decided only by forces *on the cart* (the horse's pull and the road's friction on its wheels).",
    },
    {
      type: "text",
      content:
        "**The book on the table.** A book rests on a table. Two forces act *on the book*: its weight $mg$ (pulled by the Earth) and the normal force $N$ (pushed by the table). They are equal and opposite, but they are **not** a third-law pair: they act on the same body, and they are of different kinds. The real pairs are:",
    },
    {
      type: "table",
      headers: ["Force on the book", "Its third-law partner", "Partner acts on"],
      rows: [
        ["Weight: Earth pulls book down", "Book pulls Earth up (same size, $mg$)", "the Earth"],
        ["Normal: table pushes book up", "Book pushes table down", "the table"],
      ],
    },
    {
      type: "text",
      content:
        "$N = mg$ for the book comes from the **second** law (the book is not accelerating), not from the third. Tip the table, or put the table in an accelerating lift, and $N$ stops being $mg$ while the third-law pairs stay exactly equal.",
    },
    {
      type: "text",
      content:
        "**Three contact forces you will use constantly.**\n\n- **Normal force $N$.** Perpendicular to the surfaces in contact, always a push. It is whatever size is needed to stop the bodies passing through each other, so you never assume its value; you find it from the equations.\n- **Tension $T$.** A string can only pull, along its own length. For an **ideal string** (massless and inextensible) the tension is the same all along it, even around a smooth, massless pulley: a massless piece of string with unequal pulls on its ends would have infinite acceleration.\n- **Weight $mg$.** Always straight down, acting on the body as a whole (at its centre of gravity).",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The free-body diagram (FBD) method",
      content:
        "1. **Isolate** one body (or a group you choose to treat as one). Draw it alone, as a dot or a box.\n2. **List every force on it**: its weight, plus one force for every *contact* (surface, string, spring, hand). Nothing else. No \"force of motion\", no $ma$ arrow.\n3. **Choose axes**, ideally with one axis along the acceleration (along the slope for an incline).\n4. **Resolve** every force along the axes and write $\\sum F_x = ma_x$, $\\sum F_y = ma_y$.\n5. **Add constraints** (strings, contact, known accelerations) until you have as many equations as unknowns.",
    },
    {
      type: "text",
      content:
        "Apply the method to a block on a smooth incline of angle $\\theta$. The forces on the block are its weight $mg$ (down) and the normal force $N$ (perpendicular to the slope). Take the $x$-axis down the slope and $y$ perpendicular to it. The weight splits into $mg\\sin\\theta$ along the slope and $mg\\cos\\theta$ into it. The block cannot sink into the slope, so $a_y = 0$:",
    },
    {
      type: "math",
      latex: "\\begin{aligned} y:\\quad N - mg\\cos\\theta &= 0 &\\Rightarrow\\quad N &= mg\\cos\\theta \\\\ x:\\quad mg\\sin\\theta &= ma &\\Rightarrow\\quad a &= g\\sin\\theta \\end{aligned}",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "incline",
        sliders: {
          muS: { min: 0, max: 0, step: 0.05, initial: 0 },
          muK: { min: 0, max: 0, step: 0.05, initial: 0 },
          force: { min: 0, max: 0, step: 5, initial: 0 },
        },
        showComponents: true,
        caption:
          "A smooth incline: friction and applied force are pinned at zero. Change the angle and the mass and watch N and the acceleration.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $N$ is always less than $mg$ and shrinks towards zero as the slope steepens, because the surface only has to cancel the part of the weight pressing into it. The acceleration $g\\sin\\theta$ does not depend on the mass at all: double $m$ and both the pulling component and the inertia double.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (smooth incline).** A 5 kg block slides down a smooth $30^\\circ$ incline. Find $N$ and $a$.\n\n1. FBD: weight 50 N down, $N$ perpendicular to the slope. *Why this step:* smooth means no friction, so these are the only two contacts.\n2. Perpendicular: $N = mg\\cos 30^\\circ = 50 \\times \\tfrac{\\sqrt3}{2} = 25\\sqrt3 \\approx 43.3$ N.\n3. Along the slope: $a = g\\sin 30^\\circ = 5$ m/s².",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (who pushes whom).** You push a heavy box across the floor at constant speed. Sort the forces into the right FBDs.\n\n1. **On the box:** your push $P$ (forward), friction from the floor $f$ (backward), weight $mg$, normal $N$ from the floor.\n2. **On you:** the box's push back on you, $P$ (backward, the partner of your push), friction from the floor on your shoes (**forward**), your weight, the floor's normal force.\n3. *Why this step:* the forward force that moves *you* is friction on your shoes; the box pushing back on you is not \"cancelled\" by your push on it, because those two act on different bodies. You and the box each obey their own $\\sum F = ma$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (two blocks in contact, JEE Main favourite).** Blocks of 2 kg and 3 kg sit side by side on a smooth floor. A horizontal force $F = 20$ N pushes the 2 kg block, which pushes the 3 kg block. Find the acceleration and the contact force.\n\n1. **System first.** Both blocks move together, so treat them as one 5 kg body: $a = F/(m_1 + m_2) = 20/5 = 4$ m/s². *Why this step:* the contact forces between them are internal to the system; they cancel in pairs and drop out.\n2. **Then isolate the 3 kg block.** The only horizontal force on it is the contact force $C$ from the 2 kg block: $C = m_2 a = 3 \\times 4 = 12$ N.\n3. Check on the 2 kg block: $F - C = m_1 a$, i.e. $20 - 12 = 8 = 2 \\times 4$. ✓\n4. In general $C = \\dfrac{m_2}{m_1 + m_2}F$: the contact force is the share of $F$ needed to accelerate the block **ahead**. Push from the other side and $C = \\frac{2}{5} \\times 20 = 8$ N.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (blocks hanging in series).** A 2 kg block hangs from the ceiling by string A; a 3 kg block hangs from the 2 kg block by string B. Everything is at rest. Find both tensions.\n\n1. Isolate the lower block: $T_B - 30 = 0$, so $T_B = 30$ N.\n2. Isolate the upper block. Forces: $T_A$ up, its weight 20 N down, **and $T_B$ down** (string B pulls the upper block down). *Why this step:* a string pulls on *both* bodies it connects. Leaving $T_B$ off the upper block's FBD is the commonest FBD error.\n3. $T_A - 20 - 30 = 0$, so $T_A = 50$ N. Check with the system (both blocks together): $T_A = 50$ N supports the whole 5 kg. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"action and reaction cancel, so nothing can ever move\"",
      content:
        "They would cancel only if they acted on the same body, and they never do. Your push on the box acts on the box; the box's push acts on you. Whether the box accelerates depends only on the forces *on the box*.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the normal force always equals $mg$\"",
      content:
        "$N$ equals whatever the second law needs. On an incline it is $mg\\cos\\theta$; press down on a book and it is more than $mg$; lift a bag partly off a table and it is less; in an accelerating lift it is $m(g + a)$. Always get $N$ from the equation perpendicular to the surface.",
    },
    {
      type: "quiz",
      id: "mfe3-3-q1",
      variant: "concept",
      question: "A book rests on a table. What is the third-law partner of the book's weight?",
      options: [
        { text: "The gravitational pull of the book on the Earth", correct: true, feedback: "The weight is the Earth pulling the book; its partner is the book pulling the Earth, equally hard, upward." },
        { text: "The normal force of the table on the book", feedback: "That acts on the same body (the book) and is a contact force, not gravity. Equal size here, but not a third-law pair." },
        { text: "The push of the book on the table", feedback: "That is the partner of the normal force, not of the weight." },
        { text: "The weight has no partner because the book is at rest.", feedback: "Every force has a partner, whatever the motion." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-3-q2",
      variant: "practice",
      question: "Blocks of 4 kg and 6 kg are in contact on a smooth floor. A 30 N horizontal force pushes the 4 kg block. What is the contact force between them?",
      options: [
        { text: "$12$ N", feedback: "That is the force needed to accelerate the 4 kg block. The contact force accelerates the block *ahead*, the 6 kg one." },
        { text: "$30$ N", feedback: "The full 30 N would accelerate both blocks only if the 4 kg block had no mass. Part of the push goes into the 4 kg block itself." },
        { text: "$0$ N, since action and reaction cancel", feedback: "The pushes between the blocks act on different blocks and do not cancel. The front block needs a force to accelerate." },
        { text: "$18$ N", correct: true, feedback: "$a = 30/10 = 3$ m/s², and the 6 kg block needs $6 \\times 3 = 18$ N." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-3-q3",
      variant: "practice",
      question: "A 10 kg block is released on a smooth incline of $37^\\circ$ ($\\sin 37^\\circ = 0.6$, $\\cos 37^\\circ = 0.8$) and slides freely. What is the normal force on it?",
      options: [
        { text: "$100$ N", feedback: "That is $mg$. On an incline the surface only cancels the part of the weight pressing into it." },
        { text: "$60$ N", feedback: "That is $mg\\sin\\theta$, the component *along* the slope." },
        { text: "$80$ N", correct: true, feedback: "$N = mg\\cos 37^\\circ = 100 \\times 0.8 = 80$ N." },
        { text: "$125$ N", feedback: "That is $mg/\\cos\\theta$, which is the normal force when a horizontal force holds the block in place (Lesson 3.4). Here nothing else pushes." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-3-q4",
      variant: "concept",
      question: "A 1 kg block hangs from a 2 kg block by a light string, and the 2 kg block hangs from the ceiling by another string. Which forces belong on the FBD of the 2 kg block?",
      options: [
        { text: "Upper tension (up), its own weight (down) and the lower tension (down)", correct: true, feedback: "Every attachment is a force. The upper tension works out to 30 N." },
        { text: "Upper tension (up) and its own weight (down) only", feedback: "The lower string is attached to the 2 kg block, so it pulls on it too." },
        { text: "Upper tension (up), its own weight and the 1 kg block's weight (both down)", feedback: "The 1 kg block's weight acts on the 1 kg block. What the 2 kg block feels is the lower string's tension (which happens to equal 10 N here)." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-3-q5",
      variant: "concept",
      question: "A horse pulls a cart and they speed up together. How does the force of the horse on the cart compare with the force of the cart on the horse?",
      options: [
        { text: "The horse pulls harder, otherwise the cart would not accelerate.", feedback: "The third law holds whatever the motion. The cart accelerates because the horse's pull on it beats the friction on the cart's wheels." },
        { text: "They are equal only if the speed is constant.", feedback: "That confuses the third law (always true) with equilibrium (second law with $a = 0$)." },
        { text: "They are equal in size and opposite in direction.", correct: true, feedback: "Always. The horse accelerates because the ground pushes it forward (friction on its hooves) more than the cart pulls it back." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "equilibrium-of-concurrent-forces",
  title: "3.4 · Equilibrium of Concurrent Forces",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "A street lamp hangs from two cables. A picture hangs on a nail from a string. A tent pole is held upright by guy ropes. In each case several forces meet at a single point (they are **concurrent**) and the point does not move. The second law with $\\vec a = \\vec 0$ gives the condition, and it has a picture you can draw.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Equilibrium of a particle",
      content:
        "A particle (or a point where forces meet) is in equilibrium when $\\sum\\vec F = \\vec 0$. In components:\n$\\sum F_x = 0$ and $\\sum F_y = 0$.\nGeometrically: drawn **tip to tail**, the force arrows form a **closed polygon**.",
    },
    {
      type: "text",
      content:
        "Why a closed polygon? Adding vectors tip to tail takes you from the tail of the first to the tip of the last; that arrow is the resultant. If the resultant is zero, the last tip lands back on the first tail. In the canvas below $\\vec F_1$ and $\\vec F_2$ are drawn tip to tail and the readout shows their sum. The third force that balances them must be exactly that sum reversed, which is the arrow that closes the triangle.",
    },
    {
      type: "interactive",
      config: {
        component: "vec-canvas-2d",
        mode: "add",
        a: [4, 0],
        b: [-1, 3],
        showParallelogram: false,
        readouts: ["components", "magnitude", "sum"],
        labels: { a: "\\vec F_1", b: "\\vec F_2" },
        caption:
          "F₂ is drawn from the tip of F₁. The balancing force F₃ = −(F₁ + F₂) is the arrow from the tip of F₂ back to the origin: it closes the triangle.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $\\vec F_1 = (4, 0)$ and $\\vec F_2 = (-1, 3)$, the sum is $(3, 3)$, so the balancing force is $(-3, -3)$, of size $3\\sqrt2$. Drag either force and the closing side changes to match. Three forces in equilibrium always form a triangle; that is the whole geometric content of equilibrium.",
    },
    {
      type: "text",
      content:
        "**Lami's theorem from the sine rule.** Suppose three forces $F_1$, $F_2$, $F_3$ act at a point in equilibrium. Let $\\alpha$ be the angle between $\\vec F_2$ and $\\vec F_3$ (drawn tail to tail, from the point), $\\beta$ the angle between $\\vec F_3$ and $\\vec F_1$, and $\\gamma$ the angle between $\\vec F_1$ and $\\vec F_2$. Redraw the three arrows tip to tail as a triangle. The interior angle of that triangle opposite side $F_1$ is $180^\\circ - \\alpha$ (turning one arrow round to go tip to tail replaces an angle by its supplement). The sine rule for the triangle then gives $\\dfrac{F_1}{\\sin(180^\\circ - \\alpha)} = \\dots$, and since $\\sin(180^\\circ - \\alpha) = \\sin\\alpha$:",
    },
    {
      type: "math",
      latex: "\\frac{F_1}{\\sin\\alpha} = \\frac{F_2}{\\sin\\beta} = \\frac{F_3}{\\sin\\gamma}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Lami's theorem",
      content:
        "If three concurrent forces are in equilibrium, each force is proportional to the sine of the angle **between the other two**.\nIt only applies to exactly three forces meeting at a point. For more forces, resolve into components.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (the lamp).** A 10 kg lamp hangs from two strings making $30^\\circ$ and $60^\\circ$ with the horizontal ceiling. Find the tensions. ($g = 10$ m/s².)\n\n1. The knot is in equilibrium under $T_1$ (string at $30^\\circ$), $T_2$ (string at $60^\\circ$) and the weight 100 N. *Why this step:* isolate the point where the three forces meet, not the lamp or the ceiling.\n2. Horizontal: $T_1\\cos 30^\\circ = T_2\\cos 60^\\circ$, so $T_2 = \\sqrt3\\,T_1$.\n3. Vertical: $T_1\\sin 30^\\circ + T_2\\sin 60^\\circ = 100$, so $\\tfrac12 T_1 + \\sqrt3 T_1 \\cdot \\tfrac{\\sqrt3}{2} = 2T_1 = 100$.\n4. $T_1 = 50$ N and $T_2 = 50\\sqrt3 \\approx 86.6$ N.\n5. Lami check: the angle between the strings is $180^\\circ - 30^\\circ - 60^\\circ = 90^\\circ$; the angle between $T_2$ and the weight is $90^\\circ + 60^\\circ = 150^\\circ$; between $T_1$ and the weight, $120^\\circ$. So $\\dfrac{T_1}{\\sin 150^\\circ} = \\dfrac{T_2}{\\sin 120^\\circ} = \\dfrac{100}{\\sin 90^\\circ}$ gives $T_1 = 50$ and $T_2 = 50\\sqrt3$. ✓ The steeper string carries more.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (block held by a horizontal force).** A 2 kg block rests on a smooth $30^\\circ$ incline, held still by a horizontal force $F$. Find $F$ and $N$.\n\n1. Forces: weight 20 N down, $N$ perpendicular to the slope, $F$ horizontal (towards the slope).\n2. Resolve horizontally and vertically this time. *Why this step:* two of the three forces ($mg$ and $F$) lie along those axes, so only $N$ needs splitting.\n3. Vertical: $N\\cos 30^\\circ = mg$, so $N = \\dfrac{20}{\\cos 30^\\circ} = \\dfrac{40}{\\sqrt3} \\approx 23.1$ N.\n4. Horizontal: $F = N\\sin 30^\\circ = mg\\tan 30^\\circ = \\dfrac{20}{\\sqrt3} \\approx 11.5$ N.\n5. Notice $N > mg$ here: $F$ presses the block into the slope. Compare $N = mg\\cos\\theta$ in Lesson 3.3, where nothing else pushed.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (pulling a bob aside).** A 2 kg bob hangs on a string. A horizontal force $F$ pulls it aside until the string makes $37^\\circ$ with the vertical. Find $F$ and $T$ ($\\sin 37^\\circ = 0.6$, $\\cos 37^\\circ = 0.8$).\n\n1. Vertical: $T\\cos 37^\\circ = 20$, so $T = 25$ N.\n2. Horizontal: $F = T\\sin 37^\\circ = 15$ N, i.e. $F = mg\\tan 37^\\circ$.\n3. The force triangle is the 3-4-5 triangle scaled by 5: 15, 20, 25. *Why this step:* spotting the triangle lets you check both answers at a glance.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (the rope that cannot be straight).** A rope is stretched between two posts at the same height and a 20 N weight hangs from its midpoint. If each half sags only $5^\\circ$ below the horizontal, what is the tension?\n\n1. Vertical equilibrium of the midpoint: $2T\\sin 5^\\circ = 20$.\n2. $T = \\dfrac{10}{\\sin 5^\\circ} = \\dfrac{10}{0.0872} \\approx 115$ N, nearly six times the weight.\n3. As the sag angle goes to zero, $\\sin\\theta \\to 0$ and $T \\to \\infty$. *Why this step:* a perfectly horizontal rope has no vertical component to hold anything up, however tight it is. No rope with a weight on it can ever be pulled perfectly straight.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a string at a shallower angle carries less tension\"",
      content:
        "It is the other way round. A string close to horizontal contributes little upward component per newton of tension, so it needs a *large* tension to do its share. In the lamp, the $30^\\circ$ string carries 50 N and the $60^\\circ$ string carries 86.6 N; the flatter the pair of strings, the larger both tensions become. That is why washing lines snap when pulled too tight.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Choosing axes",
      content:
        "Pick axes so that as many forces as possible lie along them. On an incline with only $mg$, $N$ and a force along the slope, use slope axes. With a horizontal force, horizontal and vertical axes are usually quicker. The answer never depends on the choice; the amount of algebra does.",
    },
    {
      type: "quiz",
      id: "mfe3-4-q1",
      variant: "practice",
      question: "A 6 kg mass hangs from two strings, each making $30^\\circ$ with the horizontal ceiling. What is the tension in each string?",
      options: [
        { text: "$30$ N", feedback: "That shares the weight equally but ignores the angle. Only the vertical parts of the tensions hold the mass up." },
        { text: "$60$ N", correct: true, feedback: "$2T\\sin 30^\\circ = 60$, so $T = 60$ N. Each string carries the whole weight's worth of tension." },
        { text: "$20\\sqrt3$ N", feedback: "That uses $\\cos 30^\\circ$ for the vertical part. The strings are at $30^\\circ$ to the *horizontal*, so the vertical part is $T\\sin 30^\\circ$." },
        { text: "$120$ N", feedback: "That is $T\\sin 30^\\circ = 60$, as if one string held the whole weight. Two strings share the load: $2T \\times \\tfrac12 = 60$ gives $T = 60$ N." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-4-q2",
      variant: "practice",
      question: "A block of mass $m$ is held at rest on a smooth incline of angle $\\theta$ by a horizontal force $F$. Which is correct?",
      options: [
        { text: "$F = mg\\tan\\theta$", correct: true, feedback: "Along the slope: $F\\cos\\theta = mg\\sin\\theta$." },
        { text: "$F = mg\\sin\\theta$", feedback: "That is the force needed *along the slope*. A horizontal force must be larger, since only $F\\cos\\theta$ of it acts up the slope." },
        { text: "$F = mg\\cos\\theta$", feedback: "At small angles this would demand almost $mg$ to hold a block on a nearly flat surface, which is absurd." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-4-q3",
      variant: "concept",
      question: "Three forces of 3 N, 4 N and 5 N act at a point in equilibrium. What is the angle between the 3 N and 4 N forces?",
      options: [
        { text: "$37^\\circ$", feedback: "That is an interior angle of the triangle opposite the 3 N side, not the angle between the 3 N and 4 N forces." },
        { text: "$180^\\circ$", feedback: "Opposite forces of 3 N and 4 N would leave 1 N, which the 5 N force could not balance." },
        { text: "$90^\\circ$", correct: true, feedback: "The forces close a triangle with sides 3, 4, 5, which is right-angled. Arrows at $90^\\circ$ tip to tail are also at $90^\\circ$ tail to tail (the supplement of $90^\\circ$ is $90^\\circ$)." },
      ],
      hint: "Lami: the 5 N force is proportional to the sine of the angle between the other two, and $5 = 5\\sin 90^\\circ$ in a 3-4-5 triangle.",
    },
    {
      type: "quiz",
      id: "mfe3-4-q4",
      variant: "practice",
      question: "A 3 kg bob on a string is pulled aside by a horizontal force until the string makes $45^\\circ$ with the vertical. What is the tension?",
      options: [
        { text: "$30$ N", feedback: "That is the weight. The string must also balance the horizontal pull." },
        { text: "$30\\sqrt2$ N", correct: true, feedback: "$T\\cos 45^\\circ = 30$, so $T = 30\\sqrt2 \\approx 42.4$ N; the horizontal force is also 30 N." },
        { text: "$15\\sqrt2$ N", feedback: "That is $30\\cos 45^\\circ$. The vertical *component* of $T$ must be 30 N, so $T$ itself is larger." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-4-q5",
      variant: "concept",
      question: "A clothes line is tightened more and more while a wet shirt hangs from its middle. What happens to the tension as the line gets closer to straight?",
      options: [
        { text: "It decreases, because a straight line holds the shirt more efficiently.", feedback: "A nearly straight line has almost no vertical component to support the shirt." },
        { text: "It increases without limit as the sag angle goes to zero.", correct: true, feedback: "$T = \\dfrac{W}{2\\sin\\theta}$ grows as $\\theta \\to 0$. The line can never be perfectly straight." },
        { text: "It stays equal to the shirt's weight.", feedback: "Vertical balance is $2T\\sin\\theta = W$, so $T$ depends on the sag angle." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "connected-bodies-and-pulleys",
  title: "3.5 · Connected Bodies and Pulleys",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Hang two unequal masses over a pulley and let go. The heavier one sinks, the lighter one rises, and they do it together, at the same rate. In 1784 George Atwood built exactly this machine to *slow gravity down*: with nearly equal masses the acceleration is small enough to time with a pendulum clock. It is also the cleanest example of the FBD method applied to two bodies at once.",
    },
    {
      type: "text",
      content:
        "**Why the string makes things simple.** An ideal string (massless, inextensible, over a smooth massless pulley) does two jobs. Being massless, it has the **same tension $T$** all along its length. Being inextensible, it forces the two ends to move by the same amount, so the two blocks have the **same size of acceleration $a$**, one up and one down. Two bodies, two unknowns ($a$ and $T$), two equations.",
    },
    {
      type: "text",
      content:
        "**The Atwood machine.** Masses $m_1 < m_2$. Take the direction of motion as positive for each body: up for $m_1$, down for $m_2$. *Why this step:* choosing each body's positive direction along the way the string moves it makes both accelerations $+a$, so the constraint is automatic.",
    },
    {
      type: "math",
      latex: "\\begin{aligned} m_1:\\quad T - m_1 g &= m_1 a \\\\ m_2:\\quad m_2 g - T &= m_2 a \\end{aligned}",
    },
    {
      type: "text",
      content:
        "Add the two equations: $T$ cancels, leaving $(m_2 - m_1)g = (m_1 + m_2)a$. Substitute back for $T$:",
    },
    {
      type: "math",
      latex: "a = \\frac{(m_2 - m_1)\\,g}{m_1 + m_2}, \\qquad T = m_1(g + a) = \\frac{2m_1m_2\\,g}{m_1 + m_2}",
    },
    {
      type: "text",
      content:
        "Sanity checks: equal masses give $a = 0$ and $T = mg$; if $m_1 \\to 0$ then $a \\to g$ (free fall) and $T \\to 0$. The tension always lies **between** the two weights: less than $m_2 g$ (or the heavy block would not accelerate down) and more than $m_1 g$ (or the light one would not accelerate up).",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "atwood",
        caption:
          "Two masses over an ideal pulley. Start at 3 kg and 5 kg, then make them nearly equal and watch the acceleration collapse while T approaches the common weight.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with 3 kg and 5 kg, $a = \\frac{2 \\times 10}{8} = 2.5$ m/s² and $T = \\frac{2 \\times 3 \\times 5 \\times 10}{8} = 37.5$ N, between 30 N and 50 N. The acceleration depends on the *difference* of the masses divided by their *sum*, so 5 kg vs 6 kg accelerates far more gently than 1 kg vs 2 kg.",
    },
    {
      type: "text",
      content:
        "**The table pulley.** Now put $m_1$ on a smooth table and hang $m_2$ over a pulley at the edge. The only horizontal force on $m_1$ is $T$; $m_2$ feels its weight down and $T$ up:",
    },
    {
      type: "math",
      latex: "m_1:\\ T = m_1 a, \\qquad m_2:\\ m_2 g - T = m_2 a \\qquad\\Rightarrow\\qquad a = \\frac{m_2\\,g}{m_1 + m_2},\\quad T = \\frac{m_1 m_2\\,g}{m_1 + m_2}",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "table-pulley",
        sliders: { mu: { min: 0, max: 0, step: 0.05, initial: 0 } },
        caption:
          "The table is smooth (μ pinned at 0). Only the hanging weight drives the motion, but both masses must be accelerated.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with 4 kg on the table and 2 kg hanging, $a = \\frac{20}{6} \\approx 3.33$ m/s² and $T = 4 \\times 3.33 \\approx 13.3$ N, well below the hanging weight of 20 N. However light the table block, the hanging one never falls faster than $g$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The system method",
      content:
        "When connected bodies share the same size of acceleration, treat them as **one body** to find $a$:\n$a = \\dfrac{\\text{net external driving force along the string}}{\\text{total mass}}$.\nTensions are internal to the system and drop out. Then **isolate one body** to find a tension.",
    },
    {
      type: "text",
      content:
        "**The pulley and the spring balance.** The pulley itself is pulled down by the string on **both** sides, so its clamp must hold $2T$ (for two vertical strands), not $(m_1 + m_2)g$. In the Atwood machine above that is 75 N, less than the 80 N total weight, because the system's centre of mass is accelerating downward. And a spring balance cut into the string reads $T$, the pull at its ends, not the sum of anything.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (Atwood numbers).** Masses 3 kg and 5 kg hang over a light pulley fixed to the ceiling. Find $a$, $T$ and the force on the ceiling hook.\n\n1. $a = \\frac{(5 - 3) \\times 10}{8} = 2.5$ m/s².\n2. $T = 3(10 + 2.5) = 37.5$ N. Check with the heavy block: $5(10 - 2.5) = 37.5$ N. ✓ *Why this step:* computing $T$ from both bodies is a free arithmetic check.\n3. Hook force $= 2T = 75$ N (the pulley is light).",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (three blocks in a train).** Blocks A (1 kg), B (2 kg) and C (3 kg) lie in a line on a smooth floor, A–B and B–C joined by light strings. A 30 N force pulls C forward. Find $a$ and both tensions.\n\n1. System: $a = 30/6 = 5$ m/s².\n2. The string A–B only has to accelerate A: $T_{AB} = 1 \\times 5 = 5$ N. *Why this step:* isolate the body at the *end* of the string you want; it has just one horizontal force on it.\n3. The string B–C has to accelerate A and B together: $T_{BC} = (1 + 2) \\times 5 = 15$ N.\n4. Check C: $30 - 15 = 15 = 3 \\times 5$. ✓ Tension grows towards the pulling end.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (incline and hanging block, which way?).** A 4 kg block on a smooth $30^\\circ$ incline is tied by a string over a pulley at the top to a 3 kg block hanging freely. Which way does the system move, and with what acceleration and tension?\n\n1. Compare the two driving forces along the string. Down-slope pull on the 4 kg block: $mg\\sin 30^\\circ = 20$ N. Weight of the hanging block: 30 N. *Why this step:* decide the direction first, then choose positive directions to match; the algebra is then all positive.\n2. The 3 kg block goes down. System: $a = \\dfrac{30 - 20}{4 + 3} = \\dfrac{10}{7} \\approx 1.43$ m/s².\n3. Hanging block: $30 - T = 3 \\times \\tfrac{10}{7}$, so $T = 30 - \\tfrac{30}{7} = \\tfrac{180}{7} \\approx 25.7$ N.\n4. Check on the incline block: $T - 20 = \\tfrac{180}{7} - \\tfrac{140}{7} = \\tfrac{40}{7} = 4 \\times \\tfrac{10}{7}$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (smooth table, JEE Main).** A 4 kg block on a smooth table is joined over the edge pulley to a 1 kg hanging block. Find $a$ and $T$.\n\n1. $a = \\dfrac{m_2 g}{m_1 + m_2} = \\dfrac{10}{5} = 2$ m/s².\n2. $T = m_1 a = 8$ N. *Why this step:* the table block is the simpler FBD, with only $T$ horizontal.\n3. Compare with the hanging weight: 8 N < 10 N. The hanging block accelerates down, so the string cannot be holding its full weight.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"tension equals the hanging weight\"",
      content:
        "Only when the hanging block is in equilibrium. If it accelerates downward, $T = m(g - a) < mg$; if upward, $T = m(g + a) > mg$. In Worked example 4 the tension is 8 N, not 10 N. Write the hanging block's equation, never assume.",
    },
    {
      type: "quiz",
      id: "mfe3-5-q1",
      variant: "practice",
      question: "Masses of 2 kg and 3 kg hang over a light smooth pulley. What is the tension in the string?",
      options: [
        { text: "$20$ N", feedback: "That is the lighter weight. The 2 kg block accelerates upward, so the tension must exceed its weight." },
        { text: "$24$ N", correct: true, feedback: "$a = \\frac{10}{5} = 2$ m/s², $T = 2(10 + 2) = 24$ N, or $\\frac{2 \\cdot 2 \\cdot 3 \\cdot 10}{5} = 24$." },
        { text: "$25$ N", feedback: "That averages the two weights. The tension is $\\frac{2m_1m_2g}{m_1+m_2}$, which is a bit less than the average." },
        { text: "$30$ N", feedback: "That is the heavier weight. The 3 kg block accelerates down, so the tension is less than its weight." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-5-q2",
      variant: "practice",
      question: "A 6 kg block on a smooth table is joined over the edge pulley to a 2 kg hanging block. What is the acceleration?",
      options: [
        { text: "$\\dfrac{10}{3}$ m/s²", feedback: "That divides the hanging weight by the table mass only. Both blocks must be accelerated." },
        { text: "$5$ m/s²", feedback: "That is the Atwood formula with masses 6 and 2 hanging. Here the 6 kg block is on a table; its weight does not drive the motion." },
        { text: "$2.5$ m/s²", correct: true, feedback: "$a = \\frac{2 \\times 10}{6 + 2} = 2.5$ m/s²." },
        { text: "$10$ m/s²", feedback: "The hanging block would fall at $g$ only if the table block had no mass." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-5-q3",
      variant: "practice",
      question: "Blocks of 2 kg, 3 kg and 5 kg are tied in a line by light strings on a smooth floor. A 40 N force pulls the 5 kg block. What is the tension in the string between the 2 kg and 3 kg blocks?",
      options: [
        { text: "$8$ N", correct: true, feedback: "$a = 40/10 = 4$ m/s²; that string only accelerates the 2 kg block: $2 \\times 4 = 8$ N." },
        { text: "$20$ N", feedback: "That is the tension between the 3 kg and 5 kg blocks, which accelerates both the 2 kg and 3 kg blocks." },
        { text: "$40$ N", feedback: "40 N is the applied pull on the 5 kg block. Each string inside the train only has to accelerate the blocks behind it, so it carries less." },
        { text: "$12$ N", feedback: "That is $3 \\times 4$, the force to accelerate the 3 kg block alone. The string between 2 kg and 3 kg pulls the 2 kg block." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-5-q4",
      variant: "concept",
      question: "In an Atwood machine with 1 kg and 4 kg, what does the ceiling hook holding the light pulley support?",
      options: [
        { text: "$50$ N, the total weight", feedback: "That would be true only if the masses were at rest. The system's centre of mass accelerates down, so the hook holds less." },
        { text: "$16$ N", feedback: "That is the tension. The pulley is pulled down by the string on both sides: $2T$." },
        { text: "$32$ N", correct: true, feedback: "$T = \\frac{2 \\cdot 1 \\cdot 4 \\cdot 10}{5} = 16$ N, and the hook holds $2T = 32$ N." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-5-q5",
      variant: "practice",
      question: "A 5 kg block on a smooth $30^\\circ$ incline is tied over a pulley at the top to a 2 kg hanging block. What happens?",
      options: [
        { text: "The hanging block goes down with $a = \\frac{10}{7}$ m/s².", feedback: "Compare the drives: the hanging weight is 20 N, the down-slope pull is $50 \\times \\tfrac12 = 25$ N. The incline block wins." },
        { text: "Nothing moves: the forces balance.", feedback: "25 N down the slope against 20 N; they do not balance." },
        { text: "The incline block slides down with $a = \\frac57 \\approx 0.71$ m/s².", correct: true, feedback: "Net drive $25 - 20 = 5$ N over a total mass of 7 kg." },
        { text: "The incline block slides down with $a = 1$ m/s².", feedback: "Divide the 5 N net drive by the *total* mass, 7 kg, not by the 5 kg block alone." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "constraint-relations",
  title: "3.6 · Constraint Relations",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "In Lesson 3.5 every body on the string moved with the same size of acceleration. That was a special case. Hang a block from a pulley that is itself free to move, and the two ends of the string no longer move equally: pull one end down by 2 cm and the movable pulley rises only 1 cm. When bodies are tied together by strings, rods or contact, their accelerations are linked by **constraint relations**, and finding the right one is usually the hardest step in a JEE pulley problem.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The string-length method",
      content:
        "1. Measure the position of every moving body (and moving pulley) from a **fixed** point, along the direction it moves.\n2. Write the total length of each string in terms of those positions (fixed lengths around pulleys are constants).\n3. The length does not change, so differentiate twice: the positions' second derivatives give a linear relation between the accelerations.",
    },
    {
      type: "text",
      content:
        "**The movable pulley.** A string is tied to the ceiling, runs down under a light movable pulley P (from which block B hangs), up over a fixed pulley on the ceiling, and down to block A. Measure $y_P$ and $y_A$ downward from the ceiling. Two strands of string go from the ceiling to P and one from the fixed pulley to A:",
    },
    {
      type: "math",
      latex: "2y_P + y_A = \\text{const} \\;\\Rightarrow\\; 2\\ddot y_P + \\ddot y_A = 0 \\;\\Rightarrow\\; a_A = -2a_P",
    },
    {
      type: "text",
      content:
        "So A moves twice as fast as the pulley (and block B), in the opposite direction. The forces tell the other half of the story: the pulley is held by **two** strands, each pulling up with $T$, so block B is supported by $2T$. Moving twice as far with half the force: that is exactly what a pulley is for.",
    },
    {
      type: "text",
      content:
        "**A useful check: tension does no net work.** For an ideal string, the total power delivered by the tension to everything it touches is zero. Here the tension pulls A up with $T$ and the pulley up with $2T$. Taking down as positive, the total power is $-T v_A - 2T v_P = -T(v_A + 2v_P) = 0$, which is the constraint again. If your constraint makes $\\sum T\\,v \\neq 0$, it is wrong.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a surprising balance).** In the set-up above, A is 1 kg and B is 2 kg. Find the accelerations.\n\n1. Take down as positive. A: $m_A g - T = m_A a_A$, i.e. $10 - T = a_A$.\n2. B (with its light pulley): $m_B g - 2T = m_B a_B$, i.e. $20 - 2T = 2a_B$. *Why this step:* two strands of the same string pull the pulley up, so B's FBD has $2T$.\n3. Constraint: $a_A = -2a_B$.\n4. From step 1, $T = 10 + 2a_B$. Into step 2: $20 - 20 - 4a_B = 2a_B$, so $a_B = 0$.\n5. Nothing moves, and $T = 10$ N. The 2 kg block is exactly balanced by the 1 kg block, because the pulley doubles the 1 kg block's pull.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (JEE Advanced style).** Same set-up, but now A is 2 kg and B (on the movable pulley) is 1 kg. Find both accelerations and the tension.\n\n1. A: $20 - T = 2a_A$. B: $10 - 2T = a_B$. Constraint: $a_A = -2a_B$.\n2. From A: $T = 20 - 2a_A = 20 + 4a_B$.\n3. Into B: $10 - 40 - 8a_B = a_B$, so $a_B = -\\tfrac{30}{9} = -\\tfrac{10}{3}$ m/s². *Why this step:* a negative answer is not an error; it means B accelerates **up**, opposite to the direction assumed.\n4. $a_A = -2a_B = \\tfrac{20}{3} \\approx 6.67$ m/s² down, and $T = 20 + 4(-\\tfrac{10}{3}) = \\tfrac{20}{3} \\approx 6.67$ N.\n5. Check B: net force up $= 2T - 10 = \\tfrac{40}{3} - 10 = \\tfrac{10}{3} = 1 \\times \\tfrac{10}{3}$. ✓",
    },
    {
      type: "math",
      latex: "\\text{In general (down positive):}\\quad a_B = \\frac{(m_B - 2m_A)\\,g}{m_B + 4m_A}, \\qquad a_A = -2a_B",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (table plus movable pulley).** Block A (1 kg) lies on a smooth table. A string from A runs over a pulley at the table's edge, down under a movable pulley carrying B (4 kg), and up to a hook fixed under the table's edge. Find the accelerations.\n\n1. Constraint: let $x$ be A's distance from the edge pulley and $y$ the depth of the movable pulley below it. Length $x + 2y = $ const, so when A moves towards the edge ($x$ decreases) at rate $a_A$, B descends at $a_B = a_A/2$. *Why this step:* the string-length method works identically whether the strands are horizontal or vertical.\n2. A: $T = 1 \\cdot a_A = 2a_B$.\n3. B: $40 - 2T = 4a_B$, so $40 - 4a_B = 4a_B$ and $a_B = 5$ m/s².\n4. $a_A = 10$ m/s² and $T = 10$ N. Power check: starting from rest, the velocities are in the same ratio as the accelerations, $v_A = 2v_B$. Tension delivers $T v_A$ to A and $-2T v_B$ to the pulley (whose strands pull up while it moves down), and $T v_A - 2T v_B = 0$. ✓",
    },
    {
      type: "text",
      content:
        "**Rigid contact constraints.** A rod held in vertical guides rests on the sloping face of a wedge of angle $\\theta$. If the wedge slides sideways by $x$, the face under the rod rises by $x\\tan\\theta$, and the rod, which must stay in contact, rises with it. So $y = x\\tan\\theta$ and",
    },
    {
      type: "math",
      latex: "a_{\\text{rod}} = a_{\\text{wedge}}\\tan\\theta",
    },
    {
      type: "text",
      content:
        "The general rule behind it: two bodies in smooth contact that stay in contact must have **equal components of acceleration along the common normal**. They may slide freely along the surface, but they cannot separate or interpenetrate.\n\n**Worked example 4 (rod on a wedge).** The wedge ($\\theta = 37^\\circ$, $\\tan 37^\\circ = 0.75$) is pushed with acceleration 4 m/s². The rod has mass 2 kg. Find the rod's acceleration and the normal force on it from the wedge (surfaces smooth, guides smooth).\n\n1. Constraint: $a_{\\text{rod}} = 4 \\times 0.75 = 3$ m/s² upward.\n2. The wedge's normal force on the rod is perpendicular to the slope, at $37^\\circ$ to the vertical. The guides can only push horizontally. *Why this step:* the vertical part of $N$ is the only upward force, so it alone must lift the rod.\n3. Vertical: $N\\cos 37^\\circ - 20 = 2 \\times 3$, so $N = \\dfrac{26}{0.8} = 32.5$ N.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"all bodies on one string have the same acceleration\"",
      content:
        "Only when every pulley is fixed. A movable pulley halves or doubles the rate at which string is taken in. Always derive the constraint from the string length; never assume $a_1 = a_2$ when a pulley moves.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Count the strands",
      content:
        "A quick shortcut for vertical systems: if a pulley (and its load) is held by $n$ strands of one string, the load moves at $\\frac1n$ of the speed of the free end and is supported by $nT$. Confirm with the length method when in doubt.",
    },
    {
      type: "quiz",
      id: "mfe3-6-q1",
      variant: "concept",
      question: "A string fixed to the ceiling passes under a movable pulley and over a fixed pulley to a free end, which you pull down by 30 cm. How far does the movable pulley rise?",
      options: [
        { text: "15 cm", correct: true, feedback: "$2y_P + y_{\\text{end}} = $ const, so $\\Delta y_P = -\\tfrac12\\Delta y_{\\text{end}}$." },
        { text: "30 cm", feedback: "That would be true if the pulley were held by one strand. It is held by two, and both shorten." },
        { text: "60 cm", feedback: "The pulley moves *less* than the free end, not more; that is the mechanical advantage." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-6-q2",
      variant: "practice",
      question: "Block A (1 kg) on a smooth table is pulled by a string that runs over the edge pulley, under a movable pulley carrying B (4 kg), and up to a fixed hook. What is B's acceleration?",
      options: [
        { text: "$10$ m/s²", feedback: "That is A's acceleration, twice B's." },
        { text: "$\\dfrac{20}{3}$ m/s²", feedback: "That assumes $a_A = a_B$. The movable pulley means A moves twice as fast." },
        { text: "$8$ m/s²", feedback: "That comes from $a_A = \\tfrac12 a_B$, the constraint the wrong way round. A, at the free end, moves faster." },
        { text: "$5$ m/s²", correct: true, feedback: "$a_A = 2a_B$, $T = 2a_B$ and $40 - 2T = 4a_B$ give $a_B = 5$ m/s²." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-6-q3",
      variant: "concept",
      question: "In a movable-pulley system (down positive) a student writes $a_A = -2a_B$ and $T_{\\text{on A}} = 2T_{\\text{on pulley}}$. Using the \"tension does no net work\" check, what is wrong?",
      options: [
        { text: "Nothing is wrong.", feedback: "Check the power: $T_A v_A + T_P v_P$ with these values is not zero." },
        { text: "The force relation is backwards: the pulley (moving half as fast) feels $2T$, while A feels $T$.", correct: true, feedback: "Power balance: $T v_A = 2T \\cdot \\tfrac{v_A}{2}$. The slower body gets the bigger force." },
        { text: "The constraint should be $a_A = a_B$.", feedback: "The constraint $a_A = -2a_B$ is right for one movable pulley with two strands." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-6-q4",
      variant: "practice",
      question: "A rod in smooth vertical guides rests on a smooth wedge of angle $30^\\circ$. The wedge moves horizontally with acceleration $2\\sqrt3$ m/s². What is the rod's acceleration?",
      options: [
        { text: "$2$ m/s²", correct: true, feedback: "$a_{\\text{rod}} = a\\tan 30^\\circ = 2\\sqrt3 \\times \\tfrac{1}{\\sqrt3} = 2$ m/s²." },
        { text: "$6$ m/s²", feedback: "That uses $\\tan 60^\\circ$. The rise per unit sideways motion is the slope of the face, $\\tan 30^\\circ$." },
        { text: "$\\sqrt3$ m/s²", feedback: "That uses $\\sin 30^\\circ$. The rise is $x\\tan\\theta$, from the right triangle with horizontal leg $x$." },
        { text: "$2\\sqrt3$ m/s²", feedback: "The rod moves vertically, the wedge horizontally; they are linked by the slope, not equal." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-6-q5",
      variant: "practice",
      question: "In the ceiling–movable-pulley–fixed-pulley set-up, the free-end block A is 3 kg and the block on the movable pulley, B, is 2 kg. What is B's acceleration?",
      options: [
        { text: "$8$ m/s² upward", feedback: "That comes from the flipped constraint $a_B = -2a_A$. The free end A moves twice as fast as the pulley, not the other way round." },
        { text: "$2$ m/s² upward", feedback: "That is the Atwood result $\\frac{(3 - 2)10}{5}$, which ignores the movable pulley." },
        { text: "$\\dfrac{20}{7} \\approx 2.86$ m/s² upward", correct: true, feedback: "$a_B = \\frac{(2 - 6) \\times 10}{2 + 12} = -\\frac{40}{14} = -\\frac{20}{7}$: upward." },
        { text: "$\\dfrac{40}{7}$ m/s² downward", feedback: "$\\frac{40}{7}$ is A's acceleration (downward). B moves half as fast, upward." },
      ],
      hint: "Down positive: $30 - T = 3a_A$, $20 - 2T = 2a_B$, $a_A = -2a_B$.",
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "pseudo-forces-and-non-inertial-frames",
  title: "3.7 · Pseudo Forces and Non-Inertial Frames",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Stand on a bathroom scale in a lift. As the lift starts upward, the reading jumps; as it slows near the top, the reading drops. You have not gained or lost any mass, and the Earth's pull on you has not changed. What changed is the push of the scale, and to someone riding the lift that looks exactly like gravity getting stronger or weaker. This lesson shows how to do Newton's laws from *inside* an accelerating frame, and why the answers agree with the ground view.",
    },
    {
      type: "text",
      content:
        "**The ground view first.** A person of mass $m$ stands on a scale in a lift accelerating upward at $a$. From the ground (an inertial frame) the forces on the person are the weight $mg$ down and the scale's push $N$ up, and the person accelerates with the lift:",
    },
    {
      type: "math",
      latex: "N - mg = ma \\quad\\Rightarrow\\quad N = m(g + a)",
    },
    {
      type: "text",
      content:
        "**The lift view.** Inside the lift, the person is at rest. But the forces $N$ and $mg$ do not balance, so the first law seems to fail. The fix: in a frame accelerating at $\\vec a_0$, pretend that every body feels an extra force $-m\\vec a_0$, and then use $\\sum\\vec F = m\\vec a_{\\text{rel}}$ as if the frame were inertial. For the lift, $\\vec a_0$ is $a$ upward, so the extra force is $ma$ **downward**, and at rest in the lift, $N - mg - ma = 0$. Same answer.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Pseudo (inertial) force",
      content:
        "In a frame with acceleration $\\vec a_0$ relative to an inertial frame, add to every body a pseudo force $\\vec F_{\\text{pseudo}} = -m\\vec a_0$ (opposite to the frame's acceleration). Then $\\sum\\vec F_{\\text{real}} + \\vec F_{\\text{pseudo}} = m\\vec a_{\\text{rel}}$.\nWhy it works: $\\vec a_{\\text{ground}} = \\vec a_{\\text{rel}} + \\vec a_0$, so $\\sum\\vec F_{\\text{real}} = m\\vec a_{\\text{rel}} + m\\vec a_0$. Move $m\\vec a_0$ to the left and it looks like one more force.",
    },
    {
      type: "interactive",
      config: {
        component: "mfe-force-lab",
        mode: "lift",
        frame: "ground",
        caption:
          "Change the lift's acceleration (+ is up) and toggle between the ground frame and the lift frame. Try a = −10 for free fall.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: both frames always give the same scale reading $N = m(g + a)$; they just book-keep it differently (an $ma$ on the right in the ground frame, a pseudo force on the left in the lift frame). Accelerating up (or slowing while going down) makes you feel heavier. At $a = -10$ m/s² the scale reads zero: the lift and you fall together and nothing needs to hold you up.",
    },
    {
      type: "text",
      content:
        "**Weightlessness.** In free fall ($a = -g$), $N = m(g - g) = 0$. Gravity has not switched off (it is what makes you fall), but nothing supports you, and support is what you feel as weight. Astronauts in orbit are weightless for the same reason: they and their station are falling around the Earth together.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (four stages of a lift ride).** A 60 kg student stands on a scale. Find the reading (in N) when the lift (a) starts upward with acceleration 2 m/s², (b) moves up at constant speed, (c) slows down on the way up at 2 m/s², (d) falls freely after the cable snaps.\n\n1. In every case $N = m(g + a)$ with $a$ the lift's acceleration, **up positive**. *Why this step:* what matters is the direction of the acceleration, not of the velocity.\n2. (a) $a = +2$: $N = 60 \\times 12 = 720$ N (the scale shows 72 kg).\n3. (b) $a = 0$: $N = 600$ N.\n4. (c) moving up but slowing, so the acceleration is **down**: $a = -2$, $N = 60 \\times 8 = 480$ N.\n5. (d) $a = -10$: $N = 0$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (a bolt falls inside a lift).** A lift accelerates upward at 2 m/s². A bolt comes loose from its ceiling, 3 m above the floor. How long does it take to hit the floor?\n\n1. Work in the lift frame. The bolt starts at rest relative to the lift. *Why this step:* in the lift frame both the start and the finish (the floor) are fixed points, so this is simple free fall with a new $g$.\n2. Forces on the bolt in the lift frame: $mg$ down and the pseudo force $ma$ down. Effective gravity $g_{\\text{eff}} = g + a = 12$ m/s².\n3. $3 = \\tfrac12 \\times 12 \\times t^2$, so $t^2 = 0.5$ and $t = \\tfrac{1}{\\sqrt2} \\approx 0.71$ s.\n4. From the ground the bolt moves up at first (it had the lift's velocity), but the floor rises to meet it faster; the time is the same.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (pendulum in an accelerating car).** A 0.1 kg bob hangs from the roof of a car that accelerates at 5 m/s² on a level road. Find the angle of the string and its tension.\n\n1. In the car frame the bob is at rest under three forces: $T$ along the string, $mg$ down, and the pseudo force $ma$ **backward**.\n2. Horizontal: $T\\sin\\theta = ma$. Vertical: $T\\cos\\theta = mg$. Divide: $\\tan\\theta = \\dfrac{a}{g} = 0.5$, so $\\theta \\approx 26.6^\\circ$ behind the vertical.\n3. Square and add: $T = m\\sqrt{g^2 + a^2} = 0.1\\sqrt{125} \\approx 1.12$ N. *Why this step:* $\\sqrt{g^2 + a^2}$ is the **effective gravity** in the car. The bob simply hangs along it, like a plumb line in a tilted world.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (block at rest on an accelerating wedge).** A smooth wedge of angle $37^\\circ$ is pushed horizontally, in the direction that presses it into a block sitting on its face. With what acceleration $a$ must it move so that the block does not slide?\n\n1. In the wedge frame the block is at rest: forces $mg$ down, $N$ normal to the face, and pseudo force $ma$ horizontal, pointing away from the direction of acceleration (into the slope).\n2. Along the slope: $ma\\cos 37^\\circ = mg\\sin 37^\\circ$. *Why this step:* resolving along the slope removes the unknown $N$.\n3. $a = g\\tan 37^\\circ = 10 \\times 0.75 = 7.5$ m/s². Perpendicular: $N = m\\sqrt{g^2 + a^2} = 12.5m$, i.e. $N = mg/\\cos 37^\\circ$. The same answer from the ground: $N$ alone must give the block both its support and its acceleration.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (water in a tanker).** A tanker lorry of water accelerates at 2.5 m/s². At what angle does the water surface settle?\n\n1. In the lorry frame every drop feels $g$ down and $a$ backward; the effective gravity is tilted back by $\\theta$ with $\\tan\\theta = a/g = 0.25$.\n2. A liquid surface at rest is perpendicular to effective gravity, so it tilts at $\\theta = \\tan^{-1}(0.25) \\approx 14^\\circ$ to the horizontal, higher at the back.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"pseudo forces are real interactions with a third-law pair\"",
      content:
        "No body exerts a pseudo force; nothing feels a reaction to it. It is a bookkeeping term that appears only because you chose an accelerating frame. Work in the ground frame and it disappears. Never add both $ma$ on the right **and** a pseudo force on the left: use one frame or the other.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"weightless means gravity has switched off\"",
      content:
        "In a freely falling lift, or on the International Space Station, gravity is very much on: at the ISS it is about 90% of its surface value. Weightlessness means there is no **support force**, because you and your surroundings accelerate together at $g$.",
    },
    {
      type: "quiz",
      id: "mfe3-7-q1",
      variant: "practice",
      question: "A 50 kg person stands on a scale in a lift that is moving **down** and **speeding up** at 2 m/s². What is the scale reading?",
      options: [
        { text: "$600$ N", feedback: "That uses $a$ upward. Speeding up while moving down means the acceleration is downward." },
        { text: "$400$ N", correct: true, feedback: "Up positive: $a = -2$, so $N = 50(10 - 2) = 400$ N." },
        { text: "$500$ N", feedback: "That is the reading only when the lift's acceleration is zero." },
        { text: "$100$ N", feedback: "$ma = 100$ N is only the change from the normal reading, not the reading." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-7-q2",
      variant: "concept",
      question: "A lift is moving upward but slowing down. How does a scale reading inside compare with the person's true weight $mg$?",
      options: [
        { text: "Greater, because the lift is moving up.", feedback: "The velocity direction does not matter; the acceleration does. Slowing on the way up means acceleration downward." },
        { text: "Less, because the acceleration is downward.", correct: true, feedback: "$N = m(g + a)$ with $a < 0$." },
        { text: "Equal, because the lift is still moving.", feedback: "Equal only at constant velocity." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-7-q3",
      variant: "practice",
      question: "A bob hangs from the roof of a car accelerating at $10\\sqrt3$ m/s² on a level road. What angle does the string make with the vertical?",
      options: [
        { text: "$30^\\circ$", feedback: "That is $\\tan^{-1}(g/a)$, the angle with the horizontal." },
        { text: "$60^\\circ$", correct: true, feedback: "$\\tan\\theta = a/g = \\sqrt3$, so $\\theta = 60^\\circ$ from the vertical." },
        { text: "$45^\\circ$", feedback: "$45^\\circ$ would need $a = g = 10$ m/s²." },
        { text: "$0^\\circ$", feedback: "The string hangs vertically only if the car is not accelerating." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-7-q4",
      variant: "practice",
      question: "A lift accelerates upward at 2.5 m/s². A coin is dropped from 1.25 m above the lift floor. How long does it take to land?",
      options: [
        { text: "$0.5$ s", feedback: "That is the free-fall time in a stationary lift. The floor is accelerating up to meet the coin." },
        { text: "$\\sqrt{\\tfrac13} \\approx 0.58$ s", feedback: "That uses $g - a = 7.5$ m/s². An upward-accelerating lift makes effective gravity stronger, not weaker." },
        { text: "$\\sqrt{0.2} \\approx 0.45$ s", correct: true, feedback: "$g_{\\text{eff}} = 12.5$ m/s², $t = \\sqrt{2 \\times 1.25/12.5} = \\sqrt{0.2}$ s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-7-q5",
      variant: "concept",
      question: "Which statement about the pseudo force $-m\\vec a_0$ is correct?",
      options: [
        { text: "It is added only when working in an accelerating frame, and it has no third-law partner.", correct: true, feedback: "It corrects for the frame's own acceleration and exists only in that description." },
        { text: "It is exerted by the accelerating frame on the body, and the body pushes back on the frame.", feedback: "Nothing exerts it, so there is no third-law partner." },
        { text: "It must be added in the ground frame to explain accelerated motion.", feedback: "In the ground frame real forces alone give $\\sum F = ma$. The pseudo force is only for accelerating frames." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-3-mastery",
  title: "3.8 · Chapter 3 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "text",
      content:
        "No formula sheet. Every question below can be rebuilt from a free-body diagram, $\\sum F = ma$ along two axes, and the right constraint. Draw the diagram before you reach for an equation. ($g = 10$ m/s² throughout.)",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 3 in six lines",
      content:
        "1. No net force ⇔ constant velocity; that defines an inertial frame.\n2. $\\sum\\vec F = d\\vec p/dt = m\\vec a$; impulse $\\int F\\,dt$ = area under $F$-$t$ = $\\Delta p$.\n3. Third-law pairs are equal and opposite and act on **different** bodies; an FBD shows only forces **on** one body.\n4. Equilibrium: $\\sum F_x = \\sum F_y = 0$, a closed force polygon; three forces obey Lami's theorem.\n5. Connected bodies: same string ⇒ same $T$; constraints from string length (movable pulley: $a_{\\text{end}} = 2a_{\\text{pulley}}$).\n6. In a frame accelerating at $\\vec a_0$, add $-m\\vec a_0$ to every body.",
    },
    {
      type: "quiz",
      id: "mfe3-8-q1",
      variant: "mastery",
      question: "A magnet hangs on a fridge door without slipping. Which pair of forces is a third-law pair?",
      options: [
        { text: "The magnet's weight and the friction from the door", feedback: "Both act on the magnet and are of different kinds. They balance by the second law." },
        { text: "The door's normal force on the magnet and the door's magnetic pull on the magnet", feedback: "These act on the same body (the magnet) and balance each other horizontally; they are not a pair." },
        { text: "The door's magnetic pull on the magnet and the magnet's magnetic pull on the door", correct: true, feedback: "Same kind (magnetic), equal and opposite, on different bodies." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-8-q2",
      variant: "mastery",
      question: "Blocks of 1 kg, 2 kg and 3 kg stand in contact in that order on a smooth floor. A 12 N force pushes the 1 kg block. What force does the 2 kg block exert on the 3 kg block?",
      options: [
        { text: "$10$ N", feedback: "That is the force between the 1 kg and 2 kg blocks, which must accelerate 5 kg." },
        { text: "$4$ N", feedback: "$2 \\times 2 = 4$ N accelerates the 2 kg block. The push on the 3 kg block must accelerate the 3 kg block." },
        { text: "$6$ N", correct: true, feedback: "$a = 12/6 = 2$ m/s², and the 3 kg block needs $3 \\times 2 = 6$ N." },
        { text: "$12$ N", feedback: "The applied force is shared out; the last block receives only what it needs to accelerate." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-8-q3",
      variant: "mastery",
      question: "A 5 kg body moves at 2 m/s along $+x$. A force along $+x$ acts on it: 10 N for the first 2 s, then decreasing linearly to zero over the next 2 s. What is the final speed?",
      options: [
        { text: "$8$ m/s", correct: true, feedback: "Impulse $= 20 + 10 = 30$ N s, so $\\Delta v = 6$ m/s and $v = 2 + 6 = 8$ m/s." },
        { text: "$6$ m/s", feedback: "That uses only the rectangle (20 N s). The ramp-down triangle adds $\\tfrac12 \\times 2 \\times 10 = 10$ N s." },
        { text: "$10$ m/s", feedback: "That counts the triangle as a full rectangle (40 N s). A linear fall to zero has half that area." },
        { text: "$4$ m/s", feedback: "That is the rectangle alone applied to a body at rest. The body already moves at 2 m/s, and the triangle adds another 10 N s." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-8-q4",
      variant: "mastery",
      question: "A 50 N weight hangs by two strings making $30^\\circ$ and $60^\\circ$ with the **vertical**. What is the tension in the string at $60^\\circ$ to the vertical?",
      options: [
        { text: "$25\\sqrt3$ N", feedback: "That is the tension in the steeper string (at $30^\\circ$ to the vertical), which carries more." },
        { text: "$50$ N", feedback: "A single string would carry 50 N; here two strings share the load." },
        { text: "$100$ N", feedback: "Tensions exceed the weight only for very shallow strings. These strings are at right angles, so each carries less than 50 N." },
        { text: "$25$ N", correct: true, feedback: "The strings are $90^\\circ$ apart. Lami: $\\frac{T}{\\sin 150^\\circ} = \\frac{50}{\\sin 90^\\circ}$, where $150^\\circ$ is the angle between the other string and the weight. $T = 25$ N." },
      ],
      hint: "Lami: each tension over the sine of the angle between the *other two* forces.",
    },
    {
      type: "quiz",
      id: "mfe3-8-q5",
      variant: "mastery",
      question: "In an Atwood machine the heavier block starts from rest and descends 4 m in 2 s. If the lighter block is 3 kg, what is the heavier one?",
      options: [
        { text: "$4$ kg", feedback: "That gives $a = \\frac{10}{7}$ m/s², not 2 m/s²." },
        { text: "$4.5$ kg", correct: true, feedback: "$4 = \\tfrac12 a (2)^2$ gives $a = 2$; then $\\frac{(M - 3)10}{M + 3} = 2$, so $10M - 30 = 2M + 6$ and $M = 4.5$ kg." },
        { text: "$\\dfrac{11}{3}$ kg", feedback: "That comes from $a = 1$ m/s² (using $s = at^2$ without the half). From rest, $s = \\tfrac12 at^2$, so $a = 2s/t^2 = 2$ m/s²." },
        { text: "$6$ kg", feedback: "That gives $a = \\frac{30}{9} \\approx 3.3$ m/s²." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-8-q6",
      variant: "mastery",
      question: "A 6 kg block on a smooth table is tied over the edge pulley to a 4 kg hanging block. Find the tension.",
      options: [
        { text: "$24$ N", correct: true, feedback: "$a = \\frac{40}{10} = 4$ m/s², $T = 6 \\times 4 = 24$ N; check $40 - 24 = 16 = 4 \\times 4$." },
        { text: "$40$ N", feedback: "That is the hanging weight. The hanging block accelerates down, so $T < 40$ N." },
        { text: "$16$ N", feedback: "That is the net force on the hanging block, $4 \\times 4$, not the tension." },
        { text: "$48$ N", feedback: "That is the Atwood formula $\\frac{2m_1m_2g}{m_1+m_2}$. On a table the 6 kg block's weight is balanced by the table." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-8-q7",
      variant: "mastery",
      question: "A 60 kg person stands on a scale in a lift. The scale reads 540 N. Which motion is possible?",
      options: [
        { text: "Moving up and speeding up", feedback: "That needs an upward acceleration and a reading above 600 N." },
        { text: "Moving up at constant speed", feedback: "Constant velocity gives exactly 600 N." },
        { text: "Moving up and slowing down at 1 m/s²", correct: true, feedback: "$540 = 60(10 + a)$ gives $a = -1$ m/s²: acceleration down, which fits slowing on the way up (or speeding up on the way down)." },
        { text: "Moving down and slowing down", feedback: "Slowing on the way down means acceleration upward, which raises the reading." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-8-q8",
      variant: "mastery",
      question: "A 0.2 kg bob hangs from the roof of a truck accelerating at 7.5 m/s². What is the tension in the string?",
      options: [
        { text: "$2$ N", feedback: "That is the weight alone. The string must also provide the horizontal acceleration." },
        { text: "$2.5$ N", correct: true, feedback: "$T = m\\sqrt{g^2 + a^2} = 0.2 \\times 12.5 = 2.5$ N, with the string $37^\\circ$ from the vertical." },
        { text: "$1.5$ N", feedback: "That is $ma$, only the horizontal part of the tension." },
        { text: "$3.5$ N", feedback: "That adds the two parts arithmetically. They are perpendicular, so add them as a right triangle." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-8-q9",
      variant: "mastery",
      question: "A block of mass $m$ rests on a smooth wedge of angle $\\theta$ that is accelerated horizontally so that the block stays at rest relative to it. What is the normal force on the block?",
      options: [
        { text: "$mg\\cos\\theta$", feedback: "That is the normal force on a *stationary* wedge. Here $N$ must also supply the horizontal acceleration." },
        { text: "$mg\\sin\\theta$", feedback: "That is the component of weight along the slope, not the normal force." },
        { text: "$mg$", feedback: "The block accelerates horizontally, so $N$ must be tilted and larger than $mg$." },
        { text: "$\\dfrac{mg}{\\cos\\theta}$", correct: true, feedback: "Vertical balance: $N\\cos\\theta = mg$. (Also $N = m\\sqrt{g^2 + a^2}$ with $a = g\\tan\\theta$.)" },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-8-q10",
      variant: "mastery",
      question: "JEE Advanced. A 1 kg block slides on the smooth $45^\\circ$ face of a 2 kg wedge that rests on a smooth floor and is free to move. What is the wedge's acceleration?",
      options: [
        { text: "$2.5$ m/s²", feedback: "That takes $N = mg\\cos 45^\\circ$ as on a fixed wedge, giving $N\\sin 45^\\circ / M = 5/2$. Because the wedge recedes, the normal force is smaller." },
        { text: "$2$ m/s²", correct: true, feedback: "Wedge frame for the block: $N = m(g\\cos\\theta - A\\sin\\theta)$. Wedge: $N\\sin\\theta = MA$. So $A = \\frac{mg\\sin\\theta\\cos\\theta}{M + m\\sin^2\\theta} = \\frac{5}{2.5} = 2$ m/s²." },
        { text: "$\\dfrac{5}{3}$ m/s²", feedback: "That divides $mg\\sin\\theta\\cos\\theta$ by $M + m$. Only the $\\sin^2\\theta$ share of the block's mass loads the wedge horizontally." },
        { text: "$0$: the floor is smooth, so nothing pushes the wedge.", feedback: "The block's normal force on the wedge has a horizontal part, and that pushes it." },
      ],
      hint: "In the wedge's frame add a pseudo force $mA$ on the block, then resolve perpendicular to the face.",
    },
    {
      type: "quiz",
      id: "mfe3-8-q11",
      variant: "mastery",
      question: "JEE Advanced. A string tied to the ceiling runs down under a light movable pulley carrying a 4 kg block, up over a fixed pulley, and down to a 1 kg block. What is the tension?",
      options: [
        { text: "$10$ N", feedback: "That would hold the 1 kg block at rest, but then $2T = 20$ N cannot hold 40 N: the system moves." },
        { text: "$20$ N", feedback: "Half the 4 kg weight is what $T$ would be if the 4 kg block were in equilibrium, but then the 1 kg block would accelerate upward at $g$." },
        { text: "$15$ N", correct: true, feedback: "Down positive: $10 - T = a_1$, $40 - 2T = 4a_2$, $a_1 = -2a_2$. So $T = 10 + 2a_2$ and $40 - 20 - 4a_2 = 4a_2$, giving $a_2 = 2.5$ m/s² (down), $a_1 = 5$ m/s² (up), $T = 15$ N." },
        { text: "$16$ N", feedback: "That is the Atwood tension for 1 kg and 4 kg over a fixed pulley. The movable pulley changes the constraint." },
      ],
    },
    {
      type: "quiz",
      id: "mfe3-8-q12",
      variant: "mastery",
      question: "A 5 kg block on a smooth $30^\\circ$ incline is tied over a pulley at the top to a 5 kg hanging block. Find the acceleration.",
      options: [
        { text: "$2.5$ m/s², hanging block going down", correct: true, feedback: "Drive $50 - 25 = 25$ N over 10 kg." },
        { text: "$5$ m/s², hanging block going down", feedback: "You divided the net drive by 5 kg; both blocks must be accelerated." },
        { text: "$0$, the masses are equal", feedback: "Equal masses balance only if both hang. On the incline only $mg\\sin 30^\\circ$ opposes the hanging weight." },
        { text: "$7.5$ m/s², hanging block going down", feedback: "That adds the drives. The down-slope pull opposes the hanging weight." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Every surface in this chapter was smooth. Chapter 4 adds friction, a force that adjusts itself up to a ceiling, and then uses the same FBD method for bodies moving in circles, where the net force must point to the centre.",
    },
  ]),
};

export const mfeChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
