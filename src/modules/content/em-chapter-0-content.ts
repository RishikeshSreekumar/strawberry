import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Electricity and Magnetism Chapter 0 — Electric Charge and Field.
 * Charge as a conserved, quantised property; Coulomb's law as a vector law;
 * superposition; the field as force per unit charge, read through field
 * lines; the dipole; and fields of continuous charge distributions.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "electric-charge",
  title: "0.1 · Electric Charge",
  position: 1,
  blocks: blocks([
    {
      type: "text",
      content:
        "Rub a balloon on your hair and press it against a wall. It stays there. The balloon is charged, but the wall is not: nobody rubbed the wall. So why does a charged object stick to a **neutral** one? Hold that question. By the end of this lesson you will be able to answer it in two sentences, and the answer contains most of what you need to know about charge.",
    },
    {
      type: "text",
      content:
        "**Two kinds of charge.** Rub a glass rod with silk and it attracts small bits of paper. Rub a second glass rod the same way and the two rods repel. Rub a plastic comb with wool and it *attracts* the glass rod. Every charged object ever tested behaves either like the glass or like the plastic, so there are exactly two kinds of charge. Benjamin Franklin named them **positive** (glass rubbed with silk) and **negative** (plastic rubbed with wool). Like charges repel; unlike charges attract.",
    },
    {
      type: "text",
      content:
        "**What is actually moving.** Ordinary matter is made of atoms: a positive nucleus (protons and neutrons) surrounded by negative electrons. A proton carries charge $+e$ and an electron $-e$, with",
    },
    { type: "math", latex: "e = 1.6\\times10^{-19}\\ \\text{C}" },
    {
      type: "text",
      content:
        "A neutral atom has as many electrons as protons, so the charges cancel. Rubbing does not create charge. It moves a few loosely held electrons from one surface to the other. Silk pulls electrons off glass, so the glass is left short of electrons (positive) and the silk has a surplus (negative), by exactly the same amount.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Three properties of charge",
      content:
        "**Quantised:** every charge is a whole-number multiple of $e$: $q = ne$ with $n$ an integer (positive, negative or zero).\n**Conserved:** the total charge of an isolated system never changes. Charge can move from body to body, and particle pairs of $+e$ and $-e$ can appear or vanish together, but the sum is fixed.\n**Additive:** the charge of a body is the algebraic sum of the charges in it, signs included: $+3\\ \\mu$C and $-5\\ \\mu$C make $-2\\ \\mu$C.",
    },
    {
      type: "text",
      content:
        "Why don't we notice quantisation in everyday life? Because $e$ is tiny. A modest $1\\ \\mu$C is millions of millions of electrons, so adding or removing one electron is like adding one grain of sand to a beach. At that scale charge looks continuous, and in Chapters 0 to 2 we will happily treat it as a smooth fluid ($dq = \\lambda\\,dl$). Quantisation matters when you count electrons or check whether a quoted charge is possible.",
    },
    {
      type: "text",
      content:
        "**Conductors and insulators.** In a metal, one or two electrons per atom are not tied to any atom; they wander through the whole piece. Put extra charge on a metal and it spreads over the surface in a moment. Such materials are **conductors** (metals, the human body, Earth, salty water). In glass, plastic, rubber and dry wood every electron is bound to its own atom or molecule, so charge placed on them stays where you put it. These are **insulators** (dielectrics). That is why you can charge a plastic comb by rubbing it while holding it in your hand, but not a metal spoon: the spoon's charge would leak straight through you to the ground.",
    },
    {
      type: "table",
      headers: ["Method", "What happens", "Sign of the charge left behind"],
      rows: [
        ["Friction", "Electrons move from one surface to the other", "The two bodies get equal and opposite charges"],
        ["Conduction (contact)", "Charge flows directly between touching bodies", "Same sign as the charging body"],
        ["Induction", "A nearby charge rearranges the free electrons; an earth connection lets some leave or arrive", "Opposite to the inducing charge"],
      ],
    },
    {
      type: "text",
      content:
        "**Charging by induction, step by step.** You have a neutral metal sphere on an insulating stand and a negatively charged plastic rod. You want the sphere charged *without* touching it.\n\n1. Bring the rod near (do not touch). The rod repels the sphere's free electrons to the far side. The near side is left positive, the far side negative. The sphere is still neutral overall; its charge has only been separated. *Why this step:* the free electrons in a conductor move until the forces on them balance.\n2. Connect the sphere to earth with a wire (touching it with your finger works). The repelled electrons now have somewhere further to go: they flow down to the ground. The positive charge on the near side stays, held by the rod's attraction.\n3. Remove the earth connection **while the rod is still near**. The electrons that left cannot come back. *Why this step:* if you removed the rod first, electrons would flow back up from the ground and undo everything.\n4. Now remove the rod. The sphere keeps a net **positive** charge, which spreads evenly over its surface.\n\nThe rod lost nothing. It only pushed; Earth supplied the change. Induction always leaves the opposite sign to the inducing charge.",
    },
    {
      type: "text",
      content:
        "**Back to the balloon.** The wall is an insulator, so its electrons cannot run away, but inside each molecule the electron cloud shifts slightly away from the negative balloon. Each molecule becomes a tiny separated pair: its positive side a little nearer the balloon, its negative side a little farther. The attraction on the near positive side is slightly stronger than the repulsion on the far negative side, because electric forces fall off with distance (0.2). So the net force is attraction. This is **polarisation**, and it is why any charged body attracts any neutral body, conductor or insulator.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a neutral body contains no charge\"",
      content:
        "A neutral body contains enormous amounts of charge: a copper coin has about $10^{23}$ protons and the same number of electrons, over $10^4$ C of each sign. \"Neutral\" means the positive and negative charges are **equal**, not absent. That is exactly why a neutral body can be polarised: the charges are there, ready to shift.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (counting electrons).** How many electrons must be removed from a neutral body to give it a charge of $+1\\ \\mu$C?\n\n1. Quantisation: $q = ne$, so $n = q/e$. *Why this step:* each removed electron leaves exactly $+e$ behind.\n2. $n = \\dfrac{1\\times10^{-6}}{1.6\\times10^{-19}} = 6.25\\times10^{12}$.\n3. Six and a quarter million million electrons for one microcoulomb. A single electron more or less is invisible at this scale.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (charge and mass after rubbing).** Rubbing transfers $5\\times10^{10}$ electrons from a glass rod to a piece of silk. Find the charge on each and the mass the rod loses ($m_e = 9.1\\times10^{-31}$ kg).\n\n1. Charge moved: $q = ne = 5\\times10^{10}\\times1.6\\times10^{-19} = 8\\times10^{-9}$ C $= 8$ nC.\n2. The rod lost electrons, so it is $+8$ nC. The silk gained them, so it is $-8$ nC. *Why this step:* conservation. The total was zero before and must be zero after.\n3. Mass lost by the rod: $5\\times10^{10}\\times9.1\\times10^{-31} \\approx 4.6\\times10^{-20}$ kg. No balance on Earth could detect that; for all practical purposes charging changes nothing but the charge.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (touch and separate).** Two identical metal spheres carry $+8\\ \\mu$C and $-2\\ \\mu$C. They are touched together and pulled apart. What does each carry now?\n\n1. Total charge before: $+8 + (-2) = +6\\ \\mu$C. *Why this step:* the pair is isolated, so this total is conserved.\n2. While touching, the two spheres form one conductor, and charge flows until it is shared. Identical spheres are symmetric, so they share it **equally**.\n3. Each ends with $\\dfrac{+6}{2} = +3\\ \\mu$C.\n\nThe rule \"charges average\" holds only for **identical** conductors. Unequal spheres share in proportion to their radii (you will see why in 1.7).",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (is this charge possible?).** An exam lists four charges: $3.2\\times10^{-19}$ C, $2.4\\times10^{-19}$ C, $8.0\\times10^{-19}$ C and $-4.8\\times10^{-19}$ C. Which one cannot occur on a body?\n\n1. Divide each by $e$: $2$, $1.5$, $5$ and $-3$. *Why this step:* quantisation says $q/e$ must be an integer.\n2. $1.5$ is not an integer, so $2.4\\times10^{-19}$ C is impossible. The others are fine (a negative integer is allowed).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a charge of $2.4\\times10^{-19}$ C is possible\"",
      content:
        "It is $1.5e$, and nobody has ever isolated half an electron's charge on a body. (Quarks do carry $\\pm\\tfrac13 e$ and $\\pm\\tfrac23 e$, but they are never found alone; every free particle and every body has a charge that is a whole multiple of $e$.)",
    },
    {
      type: "quiz",
      id: "em0-1-q1",
      variant: "practice",
      question: "Which of these charges can a body carry?",
      options: [
        { text: "$4.8\\times10^{-19}$ C", correct: true, feedback: "$4.8\\times10^{-19} = 3e$: three electrons removed." },
        { text: "$1.0\\times10^{-19}$ C", feedback: "$1.0\\times10^{-19}/1.6\\times10^{-19} = 0.625$, not a whole number." },
        { text: "$2.4\\times10^{-19}$ C", feedback: "That is $1.5e$. Half-electrons are not available." },
        { text: "$4.0\\times10^{-19}$ C", feedback: "$4.0/1.6 = 2.5$, so this is $2.5e$, which quantisation forbids." },
      ],
      hint: "Divide by $e = 1.6\\times10^{-19}$ C and look for a whole number.",
    },
    {
      type: "quiz",
      id: "em0-1-q2",
      variant: "practice",
      question: "How many electrons must be added to a neutral body to give it a charge of $-3.2\\ \\mu$C?",
      options: [
        { text: "$2\\times10^{12}$", feedback: "Check the powers: $10^{-6}/10^{-19} = 10^{13}$." },
        { text: "$5.1\\times10^{-25}$", feedback: "That multiplies $q$ by $e$. The number of electrons is $q/e$." },
        { text: "It cannot be done, a body cannot be negative.", feedback: "Adding electrons makes a body negative. That is exactly what the silk does in Worked example 2." },
        { text: "$2\\times10^{13}$", correct: true, feedback: "$n = \\dfrac{3.2\\times10^{-6}}{1.6\\times10^{-19}} = 2\\times10^{13}$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-1-q3",
      variant: "practice",
      question: "Identical metal spheres A and B carry $+10\\ \\mu$C and $-4\\ \\mu$C. They touch and separate. What is the charge on A afterwards?",
      options: [
        { text: "$+7\\ \\mu$C", feedback: "That averages the sizes, $(10 + 4)/2$, ignoring the minus sign. Add with signs first." },
        { text: "$+3\\ \\mu$C", correct: true, feedback: "Total $+6\\ \\mu$C is conserved and shared equally: $+3\\ \\mu$C each." },
        { text: "$+6\\ \\mu$C", feedback: "$+6\\ \\mu$C is the total. Identical spheres split it in half." },
        { text: "$+10\\ \\mu$C, touching does not move charge", feedback: "Metal spheres are conductors; free electrons flow between them the moment they touch." },
      ],
    },
    {
      type: "quiz",
      id: "em0-1-q4",
      variant: "concept",
      question: "A positively charged rod is held near a neutral metal sphere. The sphere is earthed briefly, the earth is removed, and then the rod is taken away. What is the charge on the sphere?",
      options: [
        { text: "Positive, same as the rod", feedback: "Same sign happens with conduction (contact). Induction leaves the opposite sign." },
        { text: "Zero, because the rod never touched it", feedback: "The earth connection let electrons in. Once it is cut, they cannot leave, so the sphere keeps a net charge." },
        { text: "Negative", correct: true, feedback: "The rod attracts electrons up from the earth onto the sphere. Cutting the earth traps them there." },
      ],
    },
    {
      type: "quiz",
      id: "em0-1-q5",
      variant: "concept",
      question: "Why does a charged balloon stick to a neutral wall?",
      options: [
        {
          text: "The wall's molecules are polarised: their opposite-sign side is nearer the balloon, and the nearer attraction beats the farther repulsion.",
          correct: true,
          feedback: "The net charge of the wall stays zero; what matters is that the attracted charge is closer than the repelled charge.",
        },
        { text: "The balloon transfers some charge to the wall, which then attracts it.", feedback: "Transferred charge would have the same sign as the balloon and would repel it. The attraction comes before any transfer." },
        { text: "Neutral bodies contain no charge, so the balloon sticks by friction.", feedback: "Neutral means equal amounts of $+$ and $-$, not none. Remove the charge from the balloon and it falls off." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "coulombs-law",
  title: "0.2 · Coulomb's Law",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Charges push and pull. The next question is *how hard*. In 1785 Charles-Augustin de Coulomb hung a charged ball from a thin twisted fibre and measured how much the fibre turned as he brought another charged ball closer. Two patterns came out. Double either charge and the force doubles. Double the distance and the force drops to a quarter.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Coulomb's law",
      content:
        "Two point charges $q_1$ and $q_2$ a distance $r$ apart exert forces on each other of size\n$F = \\dfrac{k\\,|q_1q_2|}{r^2}, \\qquad k = \\dfrac{1}{4\\pi\\varepsilon_0} = 9\\times10^9\\ \\text{N m}^2\\,\\text{C}^{-2}$\nalong the line joining them: repulsive for like charges, attractive for unlike. $\\varepsilon_0 = 8.85\\times10^{-12}\\ \\text{C}^2\\,\\text{N}^{-1}\\text{m}^{-2}$ is the permittivity of free space.",
    },
    {
      type: "text",
      content:
        "**Why $1/r^2$?** Picture the charge sending its influence out equally in all directions. At distance $r$ that influence is spread over a sphere of area $4\\pi r^2$, so its strength per unit area falls as $1/r^2$. That is why $4\\pi$ appears in $k = 1/4\\pi\\varepsilon_0$: it will cancel neatly against sphere areas in Gauss's law (Chapter 1). Gravity and light intensity fall off the same way for the same reason.",
    },
    {
      type: "text",
      content:
        "**The vector form.** Let $\\vec r_1$ and $\\vec r_2$ be the positions. Write $\\vec r_{12} = \\vec r_1 - \\vec r_2$ for the vector *from* $q_2$ *to* $q_1$, and $\\hat r_{12}$ for its unit vector. The force on $q_1$ due to $q_2$ is",
    },
    { type: "math", latex: "\\vec F_{12} = \\frac{k\\,q_1q_2}{r^2}\\,\\hat r_{12}" },
    {
      type: "text",
      content:
        "The signs do the work for you. If $q_1q_2 > 0$ (like charges) the force on $q_1$ points along $\\hat r_{12}$, away from $q_2$: repulsion. If $q_1q_2 < 0$ it points towards $q_2$: attraction. Swapping the labels flips $\\hat r$, so $\\vec F_{21} = -\\vec F_{12}$. Coulomb forces obey Newton's third law: equal size, opposite directions, along the same line.",
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "force",
        charges: [
          { q: 2, pos: [-2, 0] },
          { q: 3, pos: [2, 0] },
        ],
        forceOn: 1,
        chargeSlider: { min: -5, max: 5, step: 1 },
        caption:
          "Drag the charges apart and together and watch the force arrow on q₂. Double the gap and the arrow shrinks to a quarter. Then use the slider to flip the sign of one charge.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the force on $q_2$ always points along the line joining the charges. Moving from 4 m apart to 2 m apart made it four times longer, not twice. Flipping one sign turned the arrow round (repulsion became attraction) without changing its length. And making $q_1$ bigger lengthened the force on $q_2$: the force depends on the **product** $q_1q_2$.",
    },
    {
      type: "text",
      content:
        "**How strong is it?** Compare the electric and gravitational pulls between the electron and the proton in a hydrogen atom. The distance $r$ cancels, because both forces fall as $1/r^2$:",
    },
    {
      type: "math",
      latex:
        "\\frac{F_e}{F_g} = \\frac{ke^2}{G\\,m_em_p} = \\frac{(9\\times10^9)(1.6\\times10^{-19})^2}{(6.67\\times10^{-11})(9.1\\times10^{-31})(1.67\\times10^{-27})} \\approx 2.3\\times10^{39}",
    },
    {
      type: "text",
      content:
        "Electric forces are about $10^{39}$ times stronger. Gravity only wins at large scales because matter is almost perfectly neutral: the huge positive and negative forces cancel, while gravity's always-attractive pull keeps adding up.",
    },
    {
      type: "text",
      content:
        "**In a medium.** Put the two charges in oil or water instead of vacuum and the force is smaller by a factor $K$, the **dielectric constant** (relative permittivity) of the medium: $F = \\dfrac{k|q_1q_2|}{Kr^2}$, or $\\dfrac{1}{4\\pi\\varepsilon_0 K}\\dfrac{|q_1q_2|}{r^2}$. Water has $K \\approx 80$, which is why salt (held together by electric attraction between Na⁺ and Cl⁻) falls apart so easily in water. For air, $K \\approx 1$. The reason for the weakening, polarisation of the medium, is the subject of 2.3.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (the basic calculation).** Find the force between $+2\\ \\mu$C and $+3\\ \\mu$C that are 30 cm apart in air.\n\n1. Convert to SI: $q_1 = 2\\times10^{-6}$ C, $q_2 = 3\\times10^{-6}$ C, $r = 0.3$ m. *Why this step:* $k$ is in SI units, so everything else must be too. Forgetting to turn cm into m is the commonest error in this chapter.\n2. $F = \\dfrac{9\\times10^9\\times2\\times10^{-6}\\times3\\times10^{-6}}{(0.3)^2} = \\dfrac{5.4\\times10^{-2}}{0.09} = 0.6$ N.\n3. Both positive, so it is repulsive: each charge is pushed away from the other with $0.6$ N.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (changing the distance).** Two charges attract with force $F$. What is the force if the distance is halved?\n\n1. $F \\propto 1/r^2$, so $F' / F = (r / r')^2 = 2^2 = 4$.\n2. The new force is $4F$, still attractive. *Why this step:* ratio reasoning avoids plugging in numbers you do not have. Halving $r$ quadruples $F$; tripling $r$ divides it by 9.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (touch, separate, recompute).** Identical small metal spheres with $+6\\ \\mu$C and $-2\\ \\mu$C attract with force $F$ at some distance $r$. They are touched together and returned to the same distance. Find the new force.\n\n1. Before: $F = \\dfrac{k(6)(2)}{r^2} = \\dfrac{12k}{r^2}$ (in μC² units), attractive.\n2. Touching: total $+4\\ \\mu$C, shared equally, $+2\\ \\mu$C each. *Why this step:* 0.1, conservation plus symmetry.\n3. After: $F' = \\dfrac{k(2)(2)}{r^2} = \\dfrac{4k}{r^2}$, and now **repulsive** (both positive).\n4. $F' = F/3$, repulsive. The sign change is the part examiners check.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (hanging pith balls).** Two identical small balls, each of mass 10 g, carry equal charges $q$ and hang from the same point on light threads. In equilibrium each thread makes $45^\\circ$ with the vertical and the balls are 30 cm apart. Find $q$ (take $g = 10$ m/s²).\n\n1. Forces on one ball: weight $mg$ down, tension $T$ along the thread, Coulomb repulsion $F$ horizontal. *Why this step:* with three forces in equilibrium, resolving horizontally and vertically gives two equations.\n2. Vertical: $T\\cos45^\\circ = mg$. Horizontal: $T\\sin45^\\circ = F$. Divide: $F = mg\\tan45^\\circ = mg$.\n3. $mg = 0.01\\times10 = 0.1$ N, so $F = 0.1$ N.\n4. $\\dfrac{kq^2}{r^2} = 0.1 \\Rightarrow q^2 = \\dfrac{0.1\\times0.09}{9\\times10^9} = 10^{-12}$, so $q = 1\\times10^{-6}$ C $= 1\\ \\mu$C.\n\nIn general, $\\tan\\theta = F/mg$ is the whole of every hanging-ball problem.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the bigger charge pushes harder on the smaller one\"",
      content:
        "A $5\\ \\mu$C charge and a $1\\ \\mu$C charge push on each other with **the same** size of force: $k(5)(1)/r^2$ is symmetric in the two charges. Newton's third law holds exactly. What differs is the effect: if the $1\\ \\mu$C charge sits on a lighter body, that body accelerates more. Equal forces, unequal accelerations.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Point charges only",
      content:
        "Coulomb's law as written is for point charges, or for spheres whose charge is spread uniformly (they act as if all the charge were at the centre; Chapter 1 proves it). For two charged rods or plates close together, you must split them into small pieces and add (0.7).",
    },
    {
      type: "quiz",
      id: "em0-2-q1",
      variant: "practice",
      question: "Two point charges of $+4\\ \\mu$C and $-5\\ \\mu$C are 20 cm apart in air. What is the force between them?",
      options: [
        { text: "$4.5$ N, repulsive", feedback: "The size is right, but one charge is negative. Unlike charges attract." },
        { text: "$4.5$ N, attractive", correct: true, feedback: "$9\\times10^9\\times20\\times10^{-12}/0.04 = 0.18/0.04 = 4.5$ N; unlike signs attract." },
        { text: "$0.9$ N, attractive", feedback: "That divides by $r = 0.2$ instead of $r^2 = 0.04$." },
        { text: "$4.5\\times10^{-4}$ N, attractive", feedback: "You left $r$ in centimetres: $20^2 = 400$ instead of $0.2^2 = 0.04$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-2-q2",
      variant: "practice",
      question: "The distance between two charges is tripled. The force becomes",
      options: [
        { text: "$F/3$", feedback: "Force goes as $1/r^2$, not $1/r$." },
        { text: "$9F$", feedback: "Increasing the distance weakens the force." },
        { text: "$F/6$", feedback: "Squaring 3 gives 9, not 6." },
        { text: "$F/9$", correct: true, feedback: "$(1/3)^2 = 1/9$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-2-q3",
      variant: "concept",
      question: "A $+10\\ \\mu$C charge and a $+1\\ \\mu$C charge are near each other. Which statement is true?",
      options: [
        { text: "The $+10\\ \\mu$C charge exerts ten times the force the $+1\\ \\mu$C charge exerts.", feedback: "The force depends on the product $q_1q_2$, which is the same product for both. Newton's third law: equal and opposite." },
        { text: "Only the larger charge exerts a force; the smaller one is a test charge.", feedback: "Every charge acts on every other. A test charge is just one small enough not to disturb the others." },
        { text: "Each exerts a force of the same size on the other, in opposite directions.", correct: true, feedback: "$F = k(10)(1)/r^2$ acts on both." },
      ],
    },
    {
      type: "quiz",
      id: "em0-2-q4",
      variant: "practice",
      question: "Two charges repel with 0.6 N in air. They are immersed in oil of dielectric constant 3 at the same separation. The force is now",
      options: [
        { text: "$1.8$ N", feedback: "The medium weakens the force: divide by $K$, do not multiply." },
        { text: "$0.067$ N", feedback: "That divides by $K^2 = 9$. The force goes as $1/K$." },
        { text: "$0.2$ N", correct: true, feedback: "$F = F_0/K = 0.6/3$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-2-q5",
      variant: "practice",
      question: "Identical metal spheres carry $+5\\ \\mu$C and $-3\\ \\mu$C and attract with force $F$. They touch and are put back at the same distance. The new force is",
      options: [
        { text: "$F/15$, attractive", feedback: "After sharing both carry $+1\\ \\mu$C, so they now repel." },
        { text: "$16F/15$, repulsive", feedback: "That shares the sizes, $(5+3)/2 = 4$ each. Add with signs: $+5 - 3 = +2$." },
        { text: "Zero", feedback: "The total is $+2\\ \\mu$C, not zero, so each sphere keeps $+1\\ \\mu$C." },
        { text: "$F/15$, repulsive", correct: true, feedback: "Before: $k(5)(3)/r^2$. After: total $+2\\ \\mu$C, $+1\\ \\mu$C each, $k(1)(1)/r^2$. Ratio $1/15$, and like charges repel." },
      ],
    },
    {
      type: "quiz",
      id: "em0-2-q6",
      variant: "practice",
      question: "Two identical balls of mass 20 g hang from one point. Each carries the same charge and each thread makes $45^\\circ$ with the vertical. What is the electric force on each ball? ($g = 10$ m/s²)",
      options: [
        { text: "$0.14$ N", feedback: "That uses $\\sin45^\\circ$. Horizontal over vertical balance gives $\\tan\\theta$." },
        { text: "$0.2$ N", correct: true, feedback: "$F = mg\\tan45^\\circ = 0.02\\times10\\times1 = 0.2$ N." },
        { text: "$200$ N", feedback: "Convert grams to kilograms: 20 g $= 0.02$ kg." },
      ],
      hint: "Divide the horizontal balance by the vertical one.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "superposition-of-forces",
  title: "0.3 · Superposition of Forces",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Coulomb's law is about two charges. Real problems have three, four or a billion. What is the force on one charge when many others surround it? Experiment gives a simple answer: each pair interacts exactly as if the others were not there, and the forces add as vectors.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The principle of superposition",
      content:
        "The net force on $q_0$ due to charges $q_1, q_2, \\dots, q_n$ is the **vector** sum of the forces each would exert alone:\n$\\vec F_0 = \\vec F_{01} + \\vec F_{02} + \\dots + \\vec F_{0n} = \\sum_i \\dfrac{k\\,q_0q_i}{r_{0i}^2}\\,\\hat r_{0i}$\nThe presence of $q_2$ does not change the force that $q_1$ exerts on $q_0$.",
    },
    {
      type: "text",
      content:
        "Superposition is not a theorem; it is an experimental fact about electric forces (Coulomb's law is **linear** in each charge). Everything else in this course leans on it: fields add, potentials add, and in Chapter 4 magnetic fields add too.",
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "force",
        charges: [
          { q: 1, pos: [0, 0] },
          { q: 2, pos: [3, 0] },
          { q: -2, pos: [0, 3] },
        ],
        forceOn: 0,
        caption:
          "The dashed arrows are the forces on q₁ from each of the other charges, each computed as if the other were absent. The solid arrow is their vector sum. Drag q₂ and q₃ around and watch the parallelogram re-form.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: $q_2$ ($+2\\ \\mu$C) pushes $q_1$ straight away from it (to the left), $q_3$ ($-2\\ \\mu$C) pulls $q_1$ straight towards it (upwards). The two forces are equal in size here (same $|q|$, same 3 m distance), so the net force points up and to the left at $45^\\circ$, and it is $\\sqrt2$ times either one, not twice. Move $q_3$ to $(0, -3)$ and the net force swings downwards.",
    },
    {
      type: "text",
      content:
        "**The components method.** For any arrangement: (1) find the size of each force from Coulomb's law using magnitudes only; (2) decide each direction from a sketch (towards or away); (3) resolve into $x$ and $y$ components; (4) add the components; (5) recombine with Pythagoras and $\\tan\\phi = F_y/F_x$.",
    },
    {
      type: "text",
      content:
        "**Symmetry shortcuts.** Before calculating, look for pairs that cancel.\n\n- Equal charges at the corners of a square, triangle or any regular polygon exert **zero** net force on a charge at the centre: every push has an equal push from the opposite side, or the arrows form a closed polygon.\n- Remove one charge from such a polygon and the net force at the centre equals the force the *missing* charge would have exerted, reversed. (The full set gave zero; subtracting one force leaves minus that force.)\n- For a charge at one corner of an equilateral triangle with equal charges at the other two, the two forces have the same size $F$ and meet at $60^\\circ$, so the resultant is $2F\\cos30^\\circ = \\sqrt3F$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (the corner of a square).** Four equal charges $+q$ sit at the corners of a square of side $a$. Find the net force on one of them.\n\n1. Label the corner $D$ at the origin with neighbours $A$ at $(a, 0)$ and $C$ at $(0, a)$, and the far corner $B$ at $(a, a)$.\n2. From $A$ and $C$: each $F_1 = \\dfrac{kq^2}{a^2}$, pointing away along $-x$ and $-y$. They are perpendicular, so their sum is $\\sqrt2F_1$ along the diagonal, away from $B$. *Why this step:* two equal perpendicular vectors always add to $\\sqrt2$ times one, at $45^\\circ$.\n3. From $B$: distance $a\\sqrt2$, so $F_2 = \\dfrac{kq^2}{2a^2}$, also along the diagonal away from $B$.\n4. All three now lie along one line, so add as numbers:",
    },
    {
      type: "math",
      latex: "F_{\\text{net}} = \\frac{kq^2}{a^2}\\left(\\sqrt2 + \\frac12\\right) = \\frac{kq^2}{a^2}\\cdot\\frac{2\\sqrt2 + 1}{2} \\approx 1.91\\,\\frac{kq^2}{a^2}",
    },
    {
      type: "text",
      content:
        "5. Direction: along the diagonal, outwards from the centre of the square. Every corner charge is pushed out, which is why charge on a conductor runs to the surface (1.7).",
    },
    {
      type: "text",
      content:
        "**Equilibrium on a line.** Two charges are fixed. Where can a third charge sit with zero net force?\n\n- **Like charges** ($+4q$ and $+q$): between them, the two forces point in opposite directions, so they can cancel. Outside, both push the same way, so they cannot. The point is nearer the **smaller** charge, where its weaker pull is compensated by the shorter distance.\n- **Unlike charges** ($+4q$ and $-q$): between them both forces point the same way (towards $-q$ for a positive third charge). The balance point is outside, on the side of the **smaller** charge, so that the bigger charge's extra strength is offset by its extra distance.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (where to put $q_3$).** Charges $+4q$ and $+q$ are fixed 3 m apart. Where must a third charge be placed so that it is in equilibrium?\n\n1. Like charges, so between them. Let the point be $x$ from $+q$, hence $3 - x$ from $+4q$.\n2. Equal forces: $\\dfrac{k(4q)q_3}{(3-x)^2} = \\dfrac{k(q)q_3}{x^2}$. *Why this step:* $q_3$ cancels, so the position does not depend on the size or sign of $q_3$.\n3. $\\dfrac{4}{(3 - x)^2} = \\dfrac{1}{x^2}$. Take square roots (both distances positive): $\\dfrac{2}{3 - x} = \\dfrac1x$, so $2x = 3 - x$ and $x = 1$ m.\n4. The point is 1 m from $+q$ and 2 m from $+4q$. Check: $4/2^2 = 1 = 1/1^2$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (all three in equilibrium).** In Worked example 2, what charge $q_3$ at that point makes **every** charge in the system feel zero net force?\n\n1. $q_3$ is already balanced. Now balance $+q$, which is pushed away by $+4q$ (3 m away). $q_3$ must pull it back, so $q_3$ is negative.\n2. $\\dfrac{k(4q)(q)}{3^2} = \\dfrac{k|q_3|q}{1^2} \\Rightarrow |q_3| = \\dfrac{4q}{9}$.\n3. So $q_3 = -\\dfrac{4q}{9}$. Check $+4q$: repelled by $+q$ with $\\dfrac{k\\cdot4q^2}{9}$, attracted by $q_3$ with $\\dfrac{k\\cdot4q\\cdot(4q/9)}{2^2} = \\dfrac{k\\cdot4q^2}{9}$. ✓ Balanced.",
    },
    {
      type: "text",
      content:
        "**Stability.** Is the balance in Worked example 2 stable? Take $q_3$ positive. Nudge it along the line towards $+q$: the repulsion from $+q$ grows faster than the repulsion from $+4q$ falls, so it is pushed back. Stable along the line. Nudge it sideways: both charges push it further out. Unstable across the line. A negative $q_3$ is the other way round (unstable along the line, stable across). No arrangement of fixed charges traps a charge in all directions at once; this is Earnshaw's theorem: electrostatic forces alone can never hold a charge in stable equilibrium.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"net force = sum of magnitudes\"",
      content:
        "Forces are vectors. Two 3 N forces at right angles give $3\\sqrt2 \\approx 4.24$ N, not 6 N; at $120^\\circ$ they give 3 N; opposite each other they give zero. Add magnitudes only when the forces point along the same line in the same direction, as in the last step of Worked example 1.",
    },
    {
      type: "quiz",
      id: "em0-3-q1",
      variant: "practice",
      question: "Equal charges $+q$ sit at the three corners of an equilateral triangle of side $a$. What is the net force on any one of them?",
      options: [
        { text: "$\\dfrac{\\sqrt3\\,kq^2}{a^2}$", correct: true, feedback: "Two forces of $kq^2/a^2$ at $60^\\circ$: $2F\\cos30^\\circ = \\sqrt3F$." },
        { text: "$\\dfrac{2kq^2}{a^2}$", feedback: "That adds the two magnitudes. They are $60^\\circ$ apart, so the resultant is $2F\\cos30^\\circ$." },
        { text: "$\\dfrac{kq^2}{a^2}$", feedback: "That would be the resultant of two equal forces at $120^\\circ$. The angle between the two repulsions here is $60^\\circ$." },
        { text: "Zero, by symmetry", feedback: "Zero is for a charge at the centre. A corner charge is pushed outwards by both others." },
      ],
    },
    {
      type: "quiz",
      id: "em0-3-q2",
      variant: "practice",
      question: "Charges $+9\\ \\mu$C and $+1\\ \\mu$C are fixed 4 m apart. Where is a third charge in equilibrium?",
      options: [
        { text: "1 m from the $+9\\ \\mu$C charge, between them", feedback: "The balance point is nearer the **smaller** charge." },
        { text: "2 m from each (the midpoint)", feedback: "At the midpoint the $+9\\ \\mu$C charge pushes nine times harder." },
        { text: "2 m beyond the $+1\\ \\mu$C charge, outside", feedback: "Outside two like charges both forces point the same way, so they cannot cancel." },
        { text: "1 m from the $+1\\ \\mu$C charge, between them", correct: true, feedback: "$9/(4-x)^2 = 1/x^2 \\Rightarrow 3x = 4 - x \\Rightarrow x = 1$ m." },
      ],
    },
    {
      type: "quiz",
      id: "em0-3-q3",
      variant: "practice",
      question: "Charges $+4q$ at $x = 0$ and $-q$ at $x = 3$ m are fixed. Where on the $x$-axis is a third charge in equilibrium?",
      options: [
        { text: "$x = 1$ m", feedback: "Between unlike charges both forces point the same way. Look outside, beyond the smaller charge." },
        { text: "$x = 6$ m", correct: true, feedback: "Distance $d$ beyond $-q$: $4/(3+d)^2 = 1/d^2 \\Rightarrow 2d = 3 + d$, $d = 3$ m, so $x = 6$ m." },
        { text: "$x = -3$ m", feedback: "That is beyond the larger charge, where it always wins." },
        { text: "$x = 2$ m", feedback: "Between unlike charges no balance is possible." },
      ],
    },
    {
      type: "quiz",
      id: "em0-3-q4",
      variant: "concept",
      question: "Equal charges $+Q$ sit at the corners of a regular hexagon, and a test charge $+q_0$ is at the centre. One corner charge is removed. The net force on $q_0$ now",
      options: [
        { text: "points towards the empty corner, with size $kQq_0/a^2$ ($a$ the side)", correct: true, feedback: "Full hexagon gave zero, so the rest must give minus the missing force. The missing charge would have pushed $q_0$ away from the corner; the rest push it towards it. The centre-to-corner distance of a regular hexagon equals its side $a$." },
        { text: "is still zero, by symmetry", feedback: "The symmetry is broken once a charge is removed." },
        { text: "points away from the empty corner, with size $5kQq_0/a^2$", feedback: "Most of the five remaining forces cancel in pairs; only the partner of the removed charge is left over." },
      ],
    },
    {
      type: "quiz",
      id: "em0-3-q5",
      variant: "concept",
      question: "Two forces of 5 N each act on a charge, at $90^\\circ$ to each other. The net force is",
      options: [
        { text: "10 N", feedback: "That adds magnitudes, which only works for parallel forces." },
        { text: "0 N", feedback: "Zero needs opposite directions ($180^\\circ$)." },
        { text: "$5\\sqrt2 \\approx 7.1$ N", correct: true, feedback: "Pythagoras: $\\sqrt{25 + 25}$." },
      ],
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "electric-field",
  title: "0.4 · The Electric Field",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The Sun pulls on Earth across 150 million km of empty space. A charge pushes on another charge across empty space too. How does the second charge \"know\" the first is there? The modern answer: the first charge changes the space around it. It sets up a **field**, a condition at every point, and any charge placed at a point responds to the field right there. The force is no longer action at a distance; it is local.",
    },
    {
      type: "text",
      content:
        "To measure the field at a point $P$, place a small positive **test charge** $q_0$ there and measure the force $\\vec F$ on it. Double $q_0$ and $\\vec F$ doubles (Coulomb's law is linear in each charge), so the ratio $\\vec F/q_0$ does not depend on the test charge at all. It depends only on the other charges and on where $P$ is. That ratio is the field.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Electric field",
      content:
        "$\\vec E = \\lim_{q_0\\to0}\\dfrac{\\vec F}{q_0}$\nForce per unit positive charge, in N/C (equivalently V/m, 1.4). The limit $q_0 \\to 0$ just insists the test charge is too small to push the source charges out of place. Once you know $\\vec E$, the force on **any** charge $q$ at that point is $\\vec F = q\\vec E$: along $\\vec E$ for positive $q$, opposite to it for negative $q$.",
    },
    {
      type: "text",
      content:
        "**Field of a point charge.** Put $q_0$ at distance $r$ from $q$. Coulomb gives $\\vec F = \\dfrac{kqq_0}{r^2}\\hat r$, with $\\hat r$ pointing from $q$ to $P$. Divide by $q_0$:",
    },
    { type: "math", latex: "\\vec E = \\frac{kq}{r^2}\\,\\hat r, \\qquad E = \\frac{k|q|}{r^2}" },
    {
      type: "text",
      content:
        "Outward (away from $q$) for a positive charge, inward for a negative one. Because forces superpose, fields do too: the field of many charges is the vector sum $\\vec E = \\vec E_1 + \\vec E_2 + \\dots$ of the fields each would make alone.",
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "field-vectors",
        readouts: ["field", "components", "superposition"],
        caption:
          "The grid of arrows shows the direction of E everywhere (fainter = weaker). Drag the probe P: the two thin arrows are E₁ and E₂ from each charge, drawn to scale, and the thick one is their sum.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: at the midpoint of the $+2\\ \\mu$C and $-2\\ \\mu$C charges, $\\vec E_1$ (away from $+$) and $\\vec E_2$ (towards $-$) point the **same** way, so they add. Directly above the midpoint the vertical parts cancel and $\\vec E$ is horizontal, parallel to the line from $+$ to $-$. Far from both charges the field fades quickly because the two contributions nearly cancel.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (a single charge).** Find the field 30 cm from a $+5\\ \\mu$C charge, and the force on an electron placed there.\n\n1. $E = \\dfrac{kq}{r^2} = \\dfrac{9\\times10^9\\times5\\times10^{-6}}{0.09} = 5\\times10^5$ N/C, pointing away from the charge.\n2. Force on the electron: $F = eE = 1.6\\times10^{-19}\\times5\\times10^5 = 8\\times10^{-14}$ N. *Why this step:* once $E$ is known you never need Coulomb's law again for this point; $F = qE$ does it.\n3. Direction: the electron is negative, so the force is **opposite** to $\\vec E$, towards the $+5\\ \\mu$C charge.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (midpoint of $\\pm q$).** $+2\\ \\mu$C and $-2\\ \\mu$C are 4 m apart. Find the field at the midpoint.\n\n1. Each charge is 2 m away. Size of each field: $\\dfrac{9\\times10^9\\times2\\times10^{-6}}{4} = 4500$ N/C.\n2. Directions: away from $+$ and towards $-$. At the midpoint both point from $+$ to $-$. *Why this step:* the tempting \"equal and opposite charges cancel\" is wrong; check each arrow separately.\n3. $E = 4500 + 4500 = 9000$ N/C, from the positive towards the negative charge.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (the neutral point).** $+4\\ \\mu$C and $+1\\ \\mu$C are 3 m apart. Where is the field zero?\n\n1. Like charges: between them the fields point in opposite directions and can cancel. The point is nearer the smaller charge.\n2. Let it be $x$ from the $4\\ \\mu$C charge: $\\dfrac{k(4)}{x^2} = \\dfrac{k(1)}{(3-x)^2}$.\n3. Square roots: $\\dfrac{2}{x} = \\dfrac{1}{3 - x} \\Rightarrow 6 - 2x = x \\Rightarrow x = 2$ m.\n4. The neutral point is 2 m from the $4\\ \\mu$C charge (1 m from the $1\\ \\mu$C charge). It is exactly where a third charge would be in equilibrium in 0.3, and for the same reason.",
    },
    {
      type: "text",
      content:
        "**A charge in a uniform field.** Between two large parallel plates with opposite charges, the field is the same everywhere (Chapter 1 shows why). A particle of charge $q$ and mass $m$ there has constant acceleration",
    },
    { type: "math", latex: "\\vec a = \\frac{q\\vec E}{m}" },
    {
      type: "text",
      content:
        "This is projectile motion with $qE/m$ in place of $g$. An electron entering the plates horizontally with speed $v$ keeps that horizontal speed and falls sideways with $a = eE/m$. After horizontal distance $x$ (time $t = x/v$) its sideways displacement is",
    },
    { type: "math", latex: "y = \\tfrac12 a t^2 = \\frac{qE\\,x^2}{2mv^2}" },
    {
      type: "text",
      content:
        "a parabola, exactly like a thrown ball. Gravity is negligible here: for an electron in even a weak field of 1000 N/C, $eE/m \\approx 1.8\\times10^{14}$ m/s², about $10^{13}$ times $g$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (electron between deflecting plates).** An electron enters the region between two plates with speed $2\\times10^7$ m/s parallel to them. The plates are 10 cm long and the field between them is $2000$ N/C. How far is the electron deflected by the time it leaves? ($e/m = 1.76\\times10^{11}$ C/kg.)\n\n1. Time between the plates: $t = \\dfrac{0.1}{2\\times10^7} = 5\\times10^{-9}$ s. *Why this step:* the field is perpendicular to the initial velocity, so the horizontal motion is uniform and fixes the time.\n2. Acceleration: $a = \\dfrac{eE}{m} = 1.76\\times10^{11}\\times2000 = 3.52\\times10^{14}$ m/s².\n3. $y = \\tfrac12 at^2 = \\tfrac12\\times3.52\\times10^{14}\\times25\\times10^{-18} = 4.4\\times10^{-3}$ m $= 4.4$ mm.\n4. Direction: towards the **positive** plate, because the electron's force is opposite to $\\vec E$. This is how the old cathode-ray TV steered its beam.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"E at a point depends on the test charge placed there\"",
      content:
        "The test charge measures the field; it does not make it. A $2\\ \\mu$C charge feeling 8 N and a $4\\ \\mu$C charge feeling 16 N at the same point both report $E = 4\\times10^6$ N/C. Remove the test charge and the field is still there, set up by the source charges. What depends on the test charge is the **force** $q\\vec E$.",
    },
    {
      type: "quiz",
      id: "em0-4-q1",
      variant: "concept",
      question: "A $+2\\ \\mu$C charge at point P feels a force of 8 N. It is replaced by a $-4\\ \\mu$C charge. What are the field at P and the new force?",
      options: [
        { text: "$E = 2\\times10^6$ N/C; force 8 N", feedback: "The field does not change when you swap the test charge. Only the force does." },
        { text: "$E = -4\\times10^6$ N/C; force 16 N", feedback: "The test charge's sign flips the force, not the field." },
        { text: "$E = 4\\times10^6$ N/C (unchanged); force 16 N in the opposite direction", correct: true, feedback: "The field belongs to the source charges. The force is $qE$, doubled in size and reversed by the negative sign." },
      ],
    },
    {
      type: "quiz",
      id: "em0-4-q2",
      variant: "practice",
      question: "Find the field 20 cm from a point charge of $-8\\ \\mu$C.",
      options: [
        { text: "$1.8\\times10^6$ N/C, pointing towards the charge", correct: true, feedback: "$9\\times10^9\\times8\\times10^{-6}/0.04 = 1.8\\times10^6$ N/C; inward for a negative charge." },
        { text: "$1.8\\times10^6$ N/C, pointing away from the charge", feedback: "The size is right. A negative charge's field points inwards." },
        { text: "$3.6\\times10^5$ N/C, pointing towards the charge", feedback: "That divides by $r = 0.2$ instead of $r^2 = 0.04$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-4-q3",
      variant: "practice",
      question: "$+9\\ \\mu$C and $+1\\ \\mu$C are 4 m apart. Where is the electric field zero?",
      options: [
        { text: "1 m from the $9\\ \\mu$C charge, between them", feedback: "The neutral point is nearer the **smaller** charge." },
        { text: "3 m from the $9\\ \\mu$C charge, between them", correct: true, feedback: "$9/x^2 = 1/(4-x)^2 \\Rightarrow 3(4 - x) = x \\Rightarrow x = 3$ m." },
        { text: "Outside, beyond the $1\\ \\mu$C charge", feedback: "Outside two like charges both fields point the same way." },
        { text: "Nowhere", feedback: "Between like charges the fields oppose, so they cancel somewhere." },
      ],
    },
    {
      type: "quiz",
      id: "em0-4-q4",
      variant: "practice",
      question: "$+q$ and $-q$ are $2a$ apart. What is the field at the midpoint?",
      options: [
        { text: "Zero, the charges cancel", feedback: "The field from $+q$ points away from it, towards $-q$; the field from $-q$ also points towards $-q$. They add." },
        { text: "$\\dfrac{kq}{2a^2}$, towards $-q$", feedback: "Each charge is $a$ from the midpoint, not $2a$, and there are two equal contributions." },
        { text: "$\\dfrac{2kq}{a^2}$, towards $-q$", correct: true, feedback: "Each contributes $kq/a^2$ in the same direction." },
      ],
    },
    {
      type: "quiz",
      id: "em0-4-q5",
      variant: "practice",
      question: "A proton ($m = 1.67\\times10^{-27}$ kg) is released in a uniform field of $1.67\\times10^4$ N/C. Its acceleration is about",
      options: [
        { text: "$2.7\\times10^{-15}$ m/s²", feedback: "That is the force $eE$ in newtons. Divide by the mass." },
        { text: "$1.6\\times10^{12}$ m/s²", correct: true, feedback: "$a = eE/m = 1.6\\times10^{-19}\\times1.67\\times10^4/1.67\\times10^{-27} = 1.6\\times10^{12}$ m/s²." },
        { text: "$9.8$ m/s²", feedback: "Gravity is utterly negligible next to the electric force on a proton." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "field-lines",
  title: "0.5 · Field Lines",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A field is a vector at every point of space: infinitely many arrows. Michael Faraday, who had little mathematics but extraordinary visual intuition, found a way to draw the whole thing at once. Start at a positive charge, take a tiny step in the direction of $\\vec E$, look at $\\vec E$ again, take another step, and so on. The path you trace is a **field line**: a curve whose tangent at every point is the direction of $\\vec E$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Rules for field lines (electrostatics)",
      content:
        "1. The tangent to a line at any point gives the direction of $\\vec E$ there.\n2. Lines start on positive charges and end on negative charges (or run off to infinity).\n3. The number of lines leaving or entering a charge is proportional to its size.\n4. Where lines are crowded the field is strong; where they spread out it is weak.\n5. Two lines never cross.\n6. Electrostatic field lines never form closed loops.",
    },
    {
      type: "text",
      content:
        "None of these rules is arbitrary. Each follows from what $\\vec E$ is.\n\n- **No crossing:** at a crossing the line would have two tangents, so $\\vec E$ would point two ways at once. But $\\vec E$ at a point is a single vector (the force on a test charge there has one direction). So lines cannot cross, except at a point where $\\vec E = 0$, which has no direction at all.\n- **Density shows strength:** around a single charge $q$, $N$ lines spread over a sphere of area $4\\pi r^2$. Lines per unit area $= N/4\\pi r^2 \\propto 1/r^2$, exactly how $E$ falls. Drawing $N \\propto q$ makes the density match the field strength everywhere. (Chapter 1 turns this counting into Gauss's law.)\n- **Start on $+$, end on $-$:** a positive test charge is pushed away from $+$ and towards $-$.\n- **No closed loops:** a positive test charge carried once round a closed field line would have the field pushing it forward the whole way, gaining energy for free. Electrostatic forces do not allow that (1.6).",
    },
    {
      type: "text",
      content:
        "Now look at three pictures in turn. In each one, count lines and look for crowding and for empty spots.",
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "field-lines",
        charges: [
          { q: 2, pos: [-2, 0] },
          { q: 2, pos: [2, 0] },
        ],
        caption:
          "Two equal positive charges. The lines leave both and curve away from each other; none joins them. Find the empty spot in the middle: that is the neutral point, where E = 0.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "field-lines",
        charges: [
          { q: 2, pos: [-2, 0] },
          { q: -2, pos: [2, 0] },
        ],
        caption:
          "Equal and opposite charges (a dipole). Every line from + lands on −. The lines are densest on the segment between them, where both fields point the same way.",
      },
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "field-lines",
        charges: [
          { q: 2, pos: [-2, 0] },
          { q: -1, pos: [2, 0] },
        ],
        caption:
          "Unequal charges, +2 μC and −1 μC. Count: the + charge sends out twice as many lines as the − charge receives. Half the lines from + have nowhere to end and escape to infinity.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with like charges the lines repel each other's patterns and leave a gap (the neutral point) between the charges; far away the pair looks like a single charge of $+4\\ \\mu$C, with lines radiating evenly outward. With a dipole, lines bulge from $+$ to $-$ and the field between the charges is strong. With $+2$ and $-1$, the $-1$ charge swallows only half the lines; the rest curve round it and head off to infinity, and far away the pair looks like a single $+1\\ \\mu$C charge. Try dragging the charges; the rules survive every arrangement.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (reading charges from a picture).** A diagram shows 18 lines leaving charge A and 6 lines ending on charge B, with the remaining 12 going off the page.\n\n1. Lines leave A, so A is positive. Lines end on B, so B is negative.\n2. Lines are proportional to charge: $|q_A| : |q_B| = 18 : 6 = 3 : 1$. *Why this step:* rule 3 is what makes a line picture quantitative.\n3. Net charge of the pair $\\propto 18 - 6 = 12$ lines, positive: from far away the pair looks like a positive charge twice the size of B.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (where is the field strongest?).** In the dipole picture, compare the field at the midpoint between the charges with the field at a point a couple of metres directly above the midpoint.\n\n1. Between the charges the lines are packed together and nearly straight; above the midpoint they spread out along wide arcs.\n2. Denser lines mean stronger field, so the midpoint wins.\n3. Check with 0.4: at the midpoint both contributions point the same way and add in full; above it they are tilted and their vertical parts cancel. (0.6 makes a version of this exact: far away, the field on the axis is twice the field on the bisector at the same distance.)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"field lines are the paths charged particles follow\"",
      content:
        "A field line gives the direction of the **force**, which is the direction of the **acceleration**, not of the velocity. A charge released from rest starts off along the line, but once it is moving and the line curves, its inertia carries it off the line (just as a stone on a string flies off along a tangent when released). Only for straight field lines does a charge released from rest follow the line exactly.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a region with no lines drawn has no field\"",
      content:
        "We draw a finite number of lines to keep the picture readable. Between two drawn lines there is a field too; we just did not draw its line. The field is zero only where the pattern says so, as at the neutral point between like charges, where lines visibly swerve away.",
    },
    {
      type: "quiz",
      id: "em0-5-q1",
      variant: "concept",
      question: "In a field-line diagram, 12 lines leave charge P and 4 lines end on charge Q. What can you conclude?",
      options: [
        { text: "P is positive, Q is negative, and $|q_P| = 3|q_Q|$", correct: true, feedback: "Lines leave positive charges and end on negative ones, in numbers proportional to the charge." },
        { text: "P is negative, Q is positive, and $|q_P| = 3|q_Q|$", feedback: "Lines start on positive charges. P is the source, so it is positive." },
        { text: "P is positive, Q is negative, and $|q_Q| = 3|q_P|$", feedback: "More lines means more charge, so P is the bigger one." },
      ],
    },
    {
      type: "quiz",
      id: "em0-5-q2",
      variant: "concept",
      question: "Why can two electric field lines never cross?",
      options: [
        { text: "Because lines repel each other like charges.", feedback: "Lines are a drawing device, not objects. The reason is about what $\\vec E$ is at a point." },
        { text: "Because at a crossing $\\vec E$ would have two directions at once, but the field at a point is a single vector.", correct: true, feedback: "A test charge there feels one force in one direction, so only one line can pass." },
        { text: "Because the field is zero wherever lines meet.", feedback: "Where $\\vec E = 0$ there is no direction and no line passes; that is different from two lines crossing." },
      ],
    },
    {
      type: "quiz",
      id: "em0-5-q3",
      variant: "concept",
      question: "For charges $+2q$ and $-q$, what fraction of the field lines leaving $+2q$ end on $-q$?",
      options: [
        { text: "Half", correct: true, feedback: "Lines $\\propto$ charge: $+2q$ sends $2N$, $-q$ receives $N$. The other half run to infinity." },
        { text: "All of them", feedback: "$-q$ can receive only lines in proportion to its charge: half as many as $+2q$ sends out." },
        { text: "A third", feedback: "Compare $|q|$ values directly: $q/2q = 1/2$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-5-q4",
      variant: "concept",
      question: "An electron is released from rest on a **curved** field line. What path does it follow?",
      options: [
        { text: "Exactly along the field line, in the direction of $\\vec E$", feedback: "Two errors: it is pushed opposite to $\\vec E$ (negative charge), and once moving, its inertia takes it off a curved line." },
        { text: "It stays at rest, because field lines only show direction, not force", feedback: "Field lines show the direction of the force on a positive charge; the electron certainly feels a force." },
        { text: "It starts off opposite to $\\vec E$, tangent to the line, then drifts off the curved line", correct: true, feedback: "The field line gives the direction of force (acceleration), not of velocity." },
      ],
    },
    {
      type: "quiz",
      id: "em0-5-q5",
      variant: "concept",
      question: "In a field-line diagram, point A lies where lines are closely packed and point B where they are widely spaced. Which is true?",
      options: [
        { text: "$E_A < E_B$", feedback: "Crowded lines mean a strong field, not a weak one." },
        { text: "$E_B = 0$ if no line passes exactly through B", feedback: "A finite drawing leaves gaps between lines; the field is there all the same." },
        { text: "$E_A > E_B$", correct: true, feedback: "Line density is proportional to field strength." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "electric-dipole",
  title: "0.6 · The Electric Dipole",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "A water molecule is neutral, yet water dissolves salt, heats up in a microwave oven and clings to a charged comb. The reason: its electrons sit slightly closer to the oxygen than to the hydrogens, so the molecule is a tiny pair of equal and opposite charges a small distance apart. That pair is an **electric dipole**, and it is the most important charge arrangement after the single point charge.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Dipole moment",
      content:
        "Charges $+q$ and $-q$ separated by $2a$ form a dipole with dipole moment\n$\\vec p = q\\,(2a)\\,\\hat d$\na vector of size $p = 2aq$ pointing **from $-q$ to $+q$**. Unit: C m. An ideal (point) dipole is the limit $a \\to 0$, $q \\to \\infty$ with $p$ fixed.",
    },
    {
      type: "text",
      content:
        "**Field on the axis.** Put the dipole along the $x$-axis with $-q$ at $x = -a$, $+q$ at $x = +a$, and a point $P$ at $x = r > a$. Both fields at $P$ lie along the axis: $+q$ (distance $r - a$) pushes outward, $-q$ (distance $r + a$) pulls back. Superpose:",
    },
    {
      type: "math",
      latex:
        "E_{\\text{axial}} = kq\\left[\\frac{1}{(r-a)^2} - \\frac{1}{(r+a)^2}\\right] = kq\\,\\frac{4ar}{(r^2 - a^2)^2} = \\frac{2kpr}{(r^2-a^2)^2}",
    },
    {
      type: "text",
      content:
        "along $\\vec p$. Far away ($r \\gg a$) the $a^2$ in the bracket is negligible and",
    },
    { type: "math", latex: "E_{\\text{axial}} \\approx \\frac{2kp}{r^3}" },
    {
      type: "text",
      content:
        "**Field on the equator** (the perpendicular bisector). A point at distance $r$ from the centre is $\\sqrt{r^2 + a^2}$ from each charge, so both fields have the same size $\\dfrac{kq}{r^2 + a^2}$. Their components along the bisector cancel. Their components parallel to the axis both point from $+q$ towards $-q$, and each is the full field times $\\cos\\theta = \\dfrac{a}{\\sqrt{r^2+a^2}}$:",
    },
    {
      type: "math",
      latex:
        "E_{\\text{eq}} = 2\\cdot\\frac{kq}{r^2+a^2}\\cdot\\frac{a}{\\sqrt{r^2+a^2}} = \\frac{kp}{(r^2+a^2)^{3/2}} \\approx \\frac{kp}{r^3}\\quad\\text{opposite to }\\vec p",
    },
    {
      type: "text",
      content:
        "Two things to notice. A dipole's field falls as $1/r^3$, faster than a point charge's $1/r^2$, because from far away $+q$ and $-q$ almost cancel. And at the same distance the axial field is exactly **twice** the equatorial one. The slider below shrinks $a$ at fixed $p$ (units with $kp = 1$): the exact axial field closes in on the $2kp/r^3$ curve.",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "2/x^3",
        baseLatex: "\\frac{2kp}{x^3}",
        expr: "(1/(2*a))*(1/(x-a)^2 - 1/(x+a)^2)",
        exprLatex: "\\frac{kp}{2a}\\left[\\frac{1}{(x-a)^2} - \\frac{1}{(x+a)^2}\\right]",
        params: [{ name: "a", min: 0.1, max: 1, step: 0.1, initial: 1 }],
        window: { xmin: 0, xmax: 6, ymin: 0, ymax: 3 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: with $a = 1$ the exact field is noticeably above the $2kp/r^3$ curve for $r$ up to about 3 (and blows up at $r = a$, where you would be sitting on the charge). As you shrink $a$ the two curves merge, first far away and then closer in. The point-dipole formulas are the far-field limit, accurate once $r$ is several times $a$.",
    },
    {
      type: "interactive",
      config: {
        component: "em-field-canvas",
        mode: "field-vectors",
        charges: [
          { q: -2, pos: [-1, 0] },
          { q: 2, pos: [1, 0] },
        ],
        probe: [3, 0],
        readouts: ["field", "dipole"],
        caption:
          "A dipole with p pointing right (from − to +). Put P on the axis 3 m out, then on the perpendicular bisector 3 m out, and compare |E|. Then drag P farther along each direction.",
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: on the axis $\\vec E$ points along $\\vec p$; on the bisector it points opposite to $\\vec p$ and is smaller. At 3 m (only three times $a = 1$) the ratio is not 2 yet (the exact formulas give about 3), but as you move farther out it settles towards 2.",
    },
    {
      type: "text",
      content:
        "**A dipole in a uniform field.** Place the dipole in a uniform field $\\vec E$ with $\\vec p$ at angle $\\theta$ to $\\vec E$. The forces $+q\\vec E$ and $-q\\vec E$ are equal and opposite, so the **net force is zero**: the centre does not accelerate. But the two forces act at different points, so they form a couple. Each has lever arm $a\\sin\\theta$ about the centre:",
    },
    {
      type: "math",
      latex: "\\tau = 2\\,(qE)(a\\sin\\theta) = pE\\sin\\theta, \\qquad \\vec\\tau = \\vec p\\times\\vec E",
    },
    {
      type: "text",
      content:
        "The torque turns $\\vec p$ towards $\\vec E$. To rotate it slowly from $\\theta_1$ to $\\theta_2$ against this torque an external agent does work",
    },
    {
      type: "math",
      latex: "W = \\int_{\\theta_1}^{\\theta_2} pE\\sin\\theta\\,d\\theta = pE(\\cos\\theta_1 - \\cos\\theta_2)",
    },
    {
      type: "text",
      content:
        "Choosing the zero of energy at $\\theta = 90^\\circ$ gives the potential energy",
    },
    { type: "math", latex: "U(\\theta) = -pE\\cos\\theta = -\\vec p\\cdot\\vec E" },
    {
      type: "table",
      headers: ["Orientation", "$\\tau$", "$U$", "Equilibrium"],
      rows: [
        ["$\\theta = 0$ ($\\vec p$ along $\\vec E$)", "$0$", "$-pE$ (minimum)", "stable"],
        ["$\\theta = 90^\\circ$", "$pE$ (maximum)", "$0$", "not an equilibrium"],
        ["$\\theta = 180^\\circ$ ($\\vec p$ against $\\vec E$)", "$0$", "$+pE$ (maximum)", "unstable"],
      ],
    },
    {
      type: "text",
      content:
        "Nudge a dipole slightly from $\\theta = 0$ and the torque $pE\\sin\\theta \\approx pE\\,\\theta$ pulls it back: it oscillates like a pendulum with $\\omega = \\sqrt{pE/I}$, where $I$ is its moment of inertia. (You will meet this again as a compass needle in 4.7, and as a general SHM in the oscillations course.) In a **non-uniform** field the two forces no longer cancel, and the dipole is pulled towards the stronger field: that is the balloon on the wall from 0.1.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (axial and equatorial fields).** A dipole has $q = 2\\ \\mu$C and $2a = 1$ cm. Find the field 10 cm from its centre on the axis and on the equator.\n\n1. $p = q(2a) = 2\\times10^{-6}\\times0.01 = 2\\times10^{-8}$ C m.\n2. $r = 0.1$ m is ten times $2a$, so the far-field forms are good. *Why this step:* the exact formulas differ by under 1% here; the short forms save time.\n3. Axial: $E = \\dfrac{2kp}{r^3} = \\dfrac{2\\times9\\times10^9\\times2\\times10^{-8}}{10^{-3}} = 3.6\\times10^5$ N/C, along $\\vec p$.\n4. Equatorial: half of that, $1.8\\times10^5$ N/C, opposite to $\\vec p$. The ratio is $2:1$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (torque and work).** The same dipole ($p = 2\\times10^{-8}$ C m) sits in a uniform field of $10^5$ N/C.\n\n1. Maximum torque (at $90^\\circ$): $pE = 2\\times10^{-8}\\times10^5 = 2\\times10^{-3}$ N m. At $30^\\circ$: $pE\\sin30^\\circ = 1\\times10^{-3}$ N m.\n2. Work to turn it from $\\theta = 0$ to $180^\\circ$: $W = pE(\\cos0 - \\cos180^\\circ) = pE(1 - (-1)) = 2pE = 4\\times10^{-3}$ J. *Why this step:* using $W = pE(\\cos\\theta_1 - \\cos\\theta_2)$ avoids getting the sign wrong; the answer is positive because you are pushing it from stable to unstable.\n3. From $0$ to $90^\\circ$ the work is only $pE(1 - 0) = 2\\times10^{-3}$ J.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (JEE Main style: a dipole in a non-uniform field).** A point charge $Q$ sits at the origin and a small dipole $\\vec p$ lies on the $x$-axis at distance $r$, pointing away from $Q$. What is the force on the dipole?\n\n1. Instead of adding two Coulomb forces, use Newton's third law. The dipole's field at $Q$ is axial: $\\dfrac{2kp}{r^3}$, so the force on $Q$ has size $\\dfrac{2kpQ}{r^3}$. *Why this step:* the dipole field at a single point is one formula; the force on a spread-out dipole is two.\n2. The force on the dipole is equal and opposite, of size $\\dfrac{2kpQ}{r^3}$.\n3. Direction for positive $Q$: the dipole's $-q$ end is nearer $Q$, so attraction wins and the dipole is pulled **towards** $Q$ (into the stronger field).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"a dipole in a uniform field accelerates\"",
      content:
        "In a **uniform** field $q\\vec E$ and $-q\\vec E$ cancel exactly: zero net force, so the centre of mass does not accelerate. The dipole only **turns** until $\\vec p$ lines up with $\\vec E$. A net force needs a non-uniform field, where one end feels a stronger push than the other.",
    },
    {
      type: "quiz",
      id: "em0-6-q1",
      variant: "practice",
      question: "At the same large distance $r$ from a short dipole, the ratio of the axial field to the equatorial field is",
      options: [
        { text: "$1:1$", feedback: "The derivations give $2kp/r^3$ and $kp/r^3$; they are not equal." },
        { text: "$1:2$", feedback: "The axial field is the bigger one: both charges' fields lie along the axis there." },
        { text: "$4:1$", feedback: "Both fields fall as $1/r^3$; only the factor 2 differs." },
        { text: "$2:1$", correct: true, feedback: "$\\dfrac{2kp/r^3}{kp/r^3} = 2$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-6-q2",
      variant: "practice",
      question: "A dipole of moment $4\\times10^{-9}$ C m is at $30^\\circ$ to a uniform field of $5\\times10^4$ N/C. The torque on it is",
      options: [
        { text: "$1\\times10^{-4}$ N m", correct: true, feedback: "$pE\\sin30^\\circ = 4\\times10^{-9}\\times5\\times10^4\\times\\tfrac12 = 10^{-4}$ N m." },
        { text: "$1.73\\times10^{-4}$ N m", feedback: "That uses $\\cos30^\\circ$. Torque goes with $\\sin\\theta$ (zero when aligned)." },
        { text: "$2\\times10^{-4}$ N m", feedback: "That is the maximum torque $pE$, at $90^\\circ$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-6-q3",
      variant: "practice",
      question: "How much work is needed to turn a dipole $p$ from alignment with a uniform field $E$ ($\\theta = 0$) to $\\theta = 90^\\circ$?",
      options: [
        { text: "$2pE$", feedback: "$2pE$ takes it all the way to $180^\\circ$." },
        { text: "$0$", feedback: "The torque opposes the rotation all the way from $0$ to $90^\\circ$, so work must be done." },
        { text: "$-pE$", feedback: "The external agent does positive work against the torque, raising $U$ from $-pE$ to 0." },
        { text: "$pE$", correct: true, feedback: "$pE(\\cos0 - \\cos90^\\circ) = pE$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-6-q4",
      variant: "concept",
      question: "A dipole is released at rest at a small angle to a uniform electric field. What does it do?",
      options: [
        { text: "It accelerates along the field while turning.", feedback: "The net force in a uniform field is zero, so its centre stays put." },
        { text: "It oscillates about the direction of $\\vec E$ without its centre moving.", correct: true, feedback: "The restoring torque $pE\\sin\\theta$ makes it swing like a pendulum about $\\theta = 0$." },
        { text: "It stays at rest, because the forces on its charges cancel.", feedback: "The forces cancel but their torques do not; the couple turns it." },
      ],
    },
    {
      type: "quiz",
      id: "em0-6-q5",
      variant: "concept",
      question: "In which orientation is a dipole in a uniform field in **unstable** equilibrium?",
      options: [
        { text: "$\\vec p$ parallel to $\\vec E$", feedback: "That is the stable orientation, with minimum energy $-pE$." },
        { text: "$\\vec p$ perpendicular to $\\vec E$", feedback: "The torque there is at its maximum, so it is not an equilibrium at all." },
        { text: "$\\vec p$ antiparallel to $\\vec E$", correct: true, feedback: "Zero torque, but $U = +pE$ is a maximum; any nudge grows." },
      ],
    },
  ]),
};

const lesson07: LessonSeed = {
  slug: "continuous-charge-distributions",
  title: "0.7 · Continuous Charge Distributions",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "A charged ring, a charged rod, a charged disc: no point charges in sight, just charge smeared smoothly over a shape. We already know how to handle it. Chop the shape into pieces so small that each is a point charge $dq$, write down each piece's field $d\\vec E = \\dfrac{k\\,dq}{r^2}\\hat r$, and add them all up. With infinitely many pieces, \"add them all up\" is an integral.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Charge densities",
      content:
        "**Line** charge density $\\lambda = dq/dl$ (C/m), so $dq = \\lambda\\,dl$.\n**Surface** charge density $\\sigma = dq/dA$ (C/m²), so $dq = \\sigma\\,dA$.\n**Volume** charge density $\\rho = dq/dV$ (C/m³), so $dq = \\rho\\,dV$.\nFor a uniform distribution these are just total charge divided by length, area or volume.",
    },
    {
      type: "text",
      content:
        "The integral is of a **vector**, so never integrate magnitudes blindly. The routine that works every time: (1) pick a typical piece $dq$; (2) find its distance to the point and the direction of $d\\vec E$; (3) look for a partner piece whose field cancels some component; (4) integrate only the surviving component.",
    },
    {
      type: "text",
      content:
        "**A ring on its axis.** A ring of radius $R$ carries charge $Q$ spread uniformly. Find $\\vec E$ at a point $P$ on its axis, a distance $x$ from the centre.\n\n1. Every piece $dq$ of the ring is the same distance from $P$: $r = \\sqrt{R^2 + x^2}$. So each piece gives $dE = \\dfrac{k\\,dq}{R^2 + x^2}$, pointing along the line from the piece to $P$.\n2. Split $d\\vec E$ into a part along the axis and a part perpendicular to it. The piece diametrically opposite has an equal perpendicular part pointing the other way. *Why this step:* symmetry kills all the perpendicular parts, so only the axial part survives.\n3. The axial part is $dE\\cos\\theta$ with $\\cos\\theta = \\dfrac{x}{\\sqrt{R^2 + x^2}}$, the same for every piece. Adding them just adds up the $dq$'s to $Q$:",
    },
    { type: "math", latex: "E = \\frac{kQx}{(R^2 + x^2)^{3/2}}\\quad\\text{along the axis}" },
    {
      type: "text",
      content:
        "Check the limits. At the centre ($x = 0$), $E = 0$: every piece is cancelled by its opposite. Far away ($x \\gg R$), $E \\to kQ/x^2$: the ring looks like a point charge. In between, $E$ rises from zero and falls again, so it has a maximum. Setting $dE/dx = 0$:",
    },
    {
      type: "math",
      latex:
        "\\frac{d}{dx}\\frac{x}{(R^2+x^2)^{3/2}} = \\frac{(R^2 + x^2) - 3x^2}{(R^2+x^2)^{5/2}} = 0 \\;\\Rightarrow\\; x =\\frac{R}{\\sqrt2},\\qquad E_{\\max} = \\frac{2kQ}{3\\sqrt3\\,R^2}",
    },
    {
      type: "interactive",
      config: {
        component: "transform-playground",
        baseExpr: "x/(1 + x^2)^1.5",
        baseLatex: "\\frac{x}{(1+x^2)^{3/2}}",
        expr: "Q*x/(R^2 + x^2)^1.5",
        exprLatex: "\\frac{kQx}{(R^2+x^2)^{3/2}}",
        params: [
          { name: "Q", min: 1, max: 3, step: 0.5, initial: 1 },
          { name: "R", min: 0.5, max: 3, step: 0.5, initial: 1 },
        ],
        window: { xmin: -6, xmax: 6, ymin: -1.5, ymax: 1.5 },
      },
    },
    {
      type: "text",
      content:
        "What you should have seen: the curve passes through zero at the centre (negative $x$ just means the field points the other way along the axis). Increasing $Q$ stretches it vertically. Increasing $R$ slides the peaks outward to $x = \\pm R/\\sqrt2$ and flattens them, since $E_{\\max} \\propto 1/R^2$. For $R = 2$ the peak sits at $x \\approx 1.41$.",
    },
    {
      type: "text",
      content:
        "**A semicircular arc at its centre.** Charge with density $\\lambda$ on a semicircle of radius $R$. Measure the angle $\\theta$ of a piece from the symmetry axis, so $dl = R\\,d\\theta$ and every piece is at distance $R$:\n\n- Each piece gives $dE = \\dfrac{k\\lambda R\\,d\\theta}{R^2} = \\dfrac{k\\lambda}{R}d\\theta$.\n- Sideways parts cancel in pairs; the part along the axis is $dE\\cos\\theta$.",
    },
    {
      type: "math",
      latex: "E = \\frac{k\\lambda}{R}\\int_{-\\pi/2}^{\\pi/2}\\cos\\theta\\,d\\theta = \\frac{2k\\lambda}{R} = \\frac{2kQ}{\\pi R^2}\\quad(Q = \\lambda\\pi R)",
    },
    {
      type: "text",
      content:
        "**A straight line of charge.** A point $P$ is at perpendicular distance $d$ from a straight wire with density $\\lambda$. The ends of the wire are seen from $P$ at angles $\\alpha$ and $\\beta$ on either side of the perpendicular. A piece at angle $\\phi$ is at distance $d\\sec\\phi$ and has length $dy = d\\sec^2\\phi\\,d\\phi$, so the perpendicular part of its field is $\\dfrac{k\\lambda\\,d\\sec^2\\phi\\,d\\phi}{d^2\\sec^2\\phi}\\cos\\phi = \\dfrac{k\\lambda}{d}\\cos\\phi\\,d\\phi$. Integrate from $-\\alpha$ to $\\beta$:",
    },
    {
      type: "math",
      latex: "E_\\perp = \\frac{k\\lambda}{d}(\\sin\\alpha + \\sin\\beta)\\qquad\\xrightarrow{\\ \\alpha,\\beta\\to90^\\circ\\ }\\qquad E = \\frac{2k\\lambda}{d}",
    },
    {
      type: "text",
      content:
        "On the perpendicular bisector ($\\alpha = \\beta$) the parallel parts cancel and this is the whole field. For an infinite wire it falls as $1/d$, more slowly than a point charge. Chapter 1 gets the same $2k\\lambda/d$ in one line from Gauss's law.\n\n**A disc on its axis** is a set of concentric rings. A ring of radius $s$ and width $ds$ carries $dq = \\sigma\\,2\\pi s\\,ds$; add up the ring formula over $s$ from 0 to $R$ and you get $E = \\dfrac{\\sigma}{2\\varepsilon_0}\\left(1 - \\dfrac{x}{\\sqrt{R^2 + x^2}}\\right)$. As $R \\to \\infty$ this becomes $\\dfrac{\\sigma}{2\\varepsilon_0}$, the same at every distance: the field of an infinite sheet (1.3).",
    },
    {
      type: "table",
      headers: ["Distribution", "Point", "Field"],
      rows: [
        ["Ring, charge $Q$, radius $R$", "on axis, distance $x$", "$\\dfrac{kQx}{(R^2+x^2)^{3/2}}$ (zero at centre)"],
        ["Semicircular arc, density $\\lambda$", "centre", "$\\dfrac{2k\\lambda}{R}$"],
        ["Finite straight wire", "perpendicular distance $d$", "$\\dfrac{k\\lambda}{d}(\\sin\\alpha + \\sin\\beta)$"],
        ["Infinite straight wire", "distance $d$", "$\\dfrac{2k\\lambda}{d}$"],
        ["Disc, density $\\sigma$", "on axis, distance $x$", "$\\dfrac{\\sigma}{2\\varepsilon_0}\\left(1 - \\dfrac{x}{\\sqrt{R^2+x^2}}\\right)$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1 (ring on the axis).** A ring of radius 30 cm carries $1\\ \\mu$C. Find the field on its axis 40 cm from the centre.\n\n1. $R^2 + x^2 = 0.09 + 0.16 = 0.25$ m², so $(R^2 + x^2)^{3/2} = 0.5^3 = 0.125$ m³. *Why this step:* the distance from every piece to $P$ is the hypotenuse, 50 cm. Spotting the 3-4-5 triangle keeps the arithmetic clean.\n2. $E = \\dfrac{kQx}{(R^2+x^2)^{3/2}} = \\dfrac{9\\times10^9\\times10^{-6}\\times0.4}{0.125} = \\dfrac{3600}{0.125} = 2.88\\times10^4$ N/C along the axis, away from the ring.\n3. Compare a point charge at the centre: $kQ/x^2 = 9000/0.16 = 5.6\\times10^4$ N/C. The ring gives less, because its pieces are farther away and tilted.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (ring at $x = R$).** Express the field on the axis of a ring at $x = R$.\n\n1. $R^2 + x^2 = 2R^2$, so $(2R^2)^{3/2} = 2\\sqrt2\\,R^3$.\n2. $E = \\dfrac{kQR}{2\\sqrt2\\,R^3} = \\dfrac{kQ}{2\\sqrt2\\,R^2} \\approx 0.354\\,\\dfrac{kQ}{R^2}$.\n3. The maximum, at $x = R/\\sqrt2 \\approx 0.71R$, is $\\dfrac{2}{3\\sqrt3} \\approx 0.385$ of $kQ/R^2$. So at $x = R$ you are just past the peak.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (semicircle).** A thin rod bent into a semicircle of radius 10 cm has uniform $\\lambda = 1\\ \\mu$C/m. Find the field at the centre.\n\n1. $E = \\dfrac{2k\\lambda}{R} = \\dfrac{2\\times9\\times10^9\\times10^{-6}}{0.1} = 1.8\\times10^5$ N/C.\n2. Direction: along the symmetry axis, away from the arc (for positive $\\lambda$). *Why this step:* the sideways contributions from the two quarter-arcs cancel, so the field must lie on the symmetry line.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (finite rod, JEE Main).** A rod 60 cm long carries $\\lambda = 1\\ \\mu$C/m. Find the field at a point 40 cm from its midpoint, on the perpendicular bisector.\n\n1. Each half is 30 cm; the distance to either end is $\\sqrt{0.3^2 + 0.4^2} = 0.5$ m, so $\\sin\\alpha = \\sin\\beta = 0.3/0.5 = 0.6$.\n2. $E = \\dfrac{k\\lambda}{d}(\\sin\\alpha + \\sin\\beta) = \\dfrac{9\\times10^3}{0.4}\\times1.2 = 2.7\\times10^4$ N/C, perpendicular to the rod.\n3. An infinite rod would give $2k\\lambda/d = 4.5\\times10^4$ N/C; the finite rod gives 60% of that because it is missing the far-off pieces.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"the field is greatest at the centre of a charged ring\"",
      content:
        "At the centre every piece of the ring has a partner directly opposite pulling the other way, so $E = 0$ there. The field on the axis grows from zero, peaks at $x = R/\\sqrt2$ and then falls towards $kQ/x^2$. (The **potential**, a scalar, is largest at the centre; 1.4 shows the difference.)",
    },
    {
      type: "quiz",
      id: "em0-7-q1",
      variant: "concept",
      question: "What is the electric field at the centre of a uniformly charged ring?",
      options: [
        { text: "$kQ/R^2$", feedback: "That is the size of one piece's field scaled up, but the pieces point in all directions around the ring and cancel." },
        { text: "Zero", correct: true, feedback: "Diametrically opposite pieces cancel in pairs." },
        { text: "$2kQ/R^2$", feedback: "Put $x = 0$ into $kQx/(R^2+x^2)^{3/2}$: the $x$ in the numerator makes it zero." },
      ],
    },
    {
      type: "quiz",
      id: "em0-7-q2",
      variant: "practice",
      question: "A ring has radius $R = 10\\sqrt2$ cm. How far from the centre along its axis is the field largest?",
      options: [
        { text: "$10\\sqrt2$ cm", feedback: "At $x = R$ you are already past the peak." },
        { text: "At the centre", feedback: "The field at the centre is zero." },
        { text: "20 cm", feedback: "That is $R\\sqrt2$; the peak is at $R/\\sqrt2$." },
        { text: "10 cm", correct: true, feedback: "$x = R/\\sqrt2 = 10\\sqrt2/\\sqrt2 = 10$ cm." },
      ],
    },
    {
      type: "quiz",
      id: "em0-7-q3",
      variant: "practice",
      question: "An infinite line charge has $\\lambda = 4\\ \\mu$C/m. What is the field 90 cm from it?",
      options: [
        { text: "$8\\times10^4$ N/C", correct: true, feedback: "$2k\\lambda/d = 2\\times9\\times10^9\\times4\\times10^{-6}/0.9 = 8\\times10^4$ N/C." },
        { text: "$4\\times10^4$ N/C", feedback: "The infinite-line field has a factor 2: $2k\\lambda/d$." },
        { text: "$8.9\\times10^4$ N/C", feedback: "That divides by $d^2 = 0.81$. A line's field goes as $1/d$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-7-q4",
      variant: "practice",
      question: "Charge $Q$ is spread uniformly on a semicircular arc of radius $R$. The field at the centre has magnitude",
      options: [
        { text: "$\\dfrac{kQ}{R^2}$", feedback: "That would be all the charge at one point. Spreading it round the arc tilts the pieces, reducing the total." },
        { text: "Zero", feedback: "A full ring gives zero; a half ring has nothing to cancel its axial parts." },
        { text: "$\\dfrac{2kQ}{R^2}$", feedback: "You used $\\lambda = Q/R$. The arc length is $\\pi R$." },
        { text: "$\\dfrac{2kQ}{\\pi R^2}$", correct: true, feedback: "$\\lambda = Q/\\pi R$ and $E = 2k\\lambda/R$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-7-q5",
      variant: "concept",
      question: "Very far from a charged ring ($x \\gg R$) on its axis, the field is approximately",
      options: [
        { text: "$\\dfrac{kQ}{x^2}$", correct: true, feedback: "$(R^2 + x^2)^{3/2} \\approx x^3$, so $kQx/x^3 = kQ/x^2$: from far away the ring is a point charge." },
        { text: "$\\dfrac{kQ}{x^3}$", feedback: "That is the dipole fall-off. A ring has net charge $Q$, so it looks like a point charge." },
        { text: "Zero", feedback: "Only the perpendicular parts cancel; the axial parts add up to the full charge." },
      ],
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-0-mastery",
  title: "0.8 · Chapter 0 Mastery",
  position: 8,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "The chapter in 8 lines",
      content:
        "1. Charge is quantised ($q = ne$), conserved and additive; rubbing and induction only move electrons.\n2. Identical conductors that touch share their total charge equally.\n3. Coulomb: $F = k|q_1q_2|/r^2$ along the line joining them, equal and opposite on the two charges; divide by $K$ in a medium.\n4. Superposition: forces (and fields) from each charge add as vectors; use components and symmetry.\n5. Field $\\vec E = \\vec F/q_0$ belongs to the sources; $\\vec F = q\\vec E$ for any charge placed there.\n6. Field lines: tangent = direction, density = strength, $+$ to $-$, never crossing, number $\\propto q$.\n7. Dipole $\\vec p$ from $-$ to $+$: $2kp/r^3$ on the axis, $kp/r^3$ on the equator; in uniform $\\vec E$: $\\vec\\tau = \\vec p\\times\\vec E$, $U = -\\vec p\\cdot\\vec E$, no net force.\n8. Continuous charge: chop into $dq$, let symmetry cancel components, integrate what is left (ring: zero at centre, peak at $R/\\sqrt2$).",
    },
    {
      type: "text",
      content:
        "No formula sheet below. Each question can be rebuilt from Coulomb's law, superposition and $\\vec F = q\\vec E$. Take $k = 9\\times10^9$ N m² C⁻², $e = 1.6\\times10^{-19}$ C and $g = 10$ m/s².",
    },
    {
      type: "quiz",
      id: "em0-8-q1",
      variant: "mastery",
      question: "A body has a charge of $-8\\times10^{-18}$ C. It has",
      options: [
        { text: "a deficit of 50 electrons", feedback: "A deficit of electrons would make it positive." },
        { text: "an excess of 5 electrons", feedback: "Check the powers of ten: $10^{-18}/10^{-19} = 10$, so $8/1.6 \\times 10 = 50$." },
        { text: "an impossible charge, since it is not a multiple of $e$", feedback: "$8\\times10^{-18} = 50e$, a whole multiple." },
        { text: "an excess of 50 electrons", correct: true, feedback: "$8\\times10^{-18}/1.6\\times10^{-19} = 50$; negative means extra electrons." },
      ],
    },
    {
      type: "quiz",
      id: "em0-8-q2",
      variant: "mastery",
      question: "Three identical metal spheres: A has $+12\\ \\mu$C, B and C are neutral. A touches B, then B touches C, then C touches A (separating each time). What is the final charge on A?",
      options: [
        { text: "$+4\\ \\mu$C", feedback: "That shares the charge equally among all three at once. The touches happen in pairs, one after another." },
        { text: "$+4.5\\ \\mu$C", correct: true, feedback: "A,B: 6, 6. B,C: 3, 3. C,A: $(6 + 3)/2 = 4.5$ each. Final A $= 4.5$, B $= 3$, C $= 4.5$: total 12. ✓" },
        { text: "$+6\\ \\mu$C", feedback: "A had 6 after the first touch, but the last touch with C (holding 3) changes it again." },
        { text: "$+3\\ \\mu$C", feedback: "That is B's final charge. Track A through the last touch with C." },
      ],
    },
    {
      type: "quiz",
      id: "em0-8-q3",
      variant: "mastery",
      question: "Charges $+q$ and $+9q$ are fixed 16 cm apart. A third charge $Q$ is placed so that **all three** charges are in equilibrium. Find $Q$.",
      options: [
        { text: "$+\\dfrac{9q}{16}$, 4 cm from $+q$", feedback: "A positive $Q$ would push $+q$ outward along with $+9q$. It must pull, so it is negative." },
        { text: "$-\\dfrac{9q}{16}$, 12 cm from $+q$", feedback: "The balance point is nearer the smaller charge: 4 cm from $+q$." },
        { text: "$-\\dfrac{9q}{16}$, 4 cm from $+q$", correct: true, feedback: "Position: $1/x^2 = 9/(16 - x)^2 \\Rightarrow x = 4$ cm. Balance $+q$: $k\\cdot9q\\cdot q/16^2 = k|Q|q/4^2 \\Rightarrow |Q| = 9q/16$, and it must attract, so negative." },
        { text: "$-\\dfrac{q}{4}$, 4 cm from $+q$", feedback: "Balance $+q$: the $+9q$ is 16 cm away and $Q$ only 4 cm, so $|Q| = 9q\\times(4/16)^2 = 9q/16$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-8-q4",
      variant: "mastery",
      question: "Four charges of $+1\\ \\mu$C sit at the corners of a square of side 30 cm. The net force on any one of them is about",
      options: [
        { text: "$0.25$ N, along the diagonal away from the centre", feedback: "That adds magnitudes $0.1 + 0.1 + 0.05$. The two neighbour forces are perpendicular." },
        { text: "$0.14$ N, along the diagonal away from the centre", feedback: "You left out the far corner, which adds $kq^2/2a^2 = 0.05$ N along the same line." },
        { text: "Zero, by symmetry", feedback: "The symmetry makes the force at the **centre** zero. A corner charge is pushed outward." },
        { text: "$0.19$ N, along the diagonal away from the centre", correct: true, feedback: "$kq^2/a^2 = 0.1$ N. Neighbours give $0.1\\sqrt2 = 0.141$ N, the far corner $0.05$ N, all along the diagonal: $0.191$ N." },
      ],
    },
    {
      type: "quiz",
      id: "em0-8-q5",
      variant: "mastery",
      question: "$+16\\ \\mu$C sits at $x = 0$ and $-4\\ \\mu$C at $x = 1$ m. Where on the $x$-axis is the field zero?",
      options: [
        { text: "$x = \\tfrac23$ m", feedback: "Between unlike charges both fields point towards $-4\\ \\mu$C and cannot cancel." },
        { text: "$x = -1$ m", feedback: "On that side the larger charge is closer, so its field always wins." },
        { text: "$x = 2$ m", correct: true, feedback: "Unlike charges: outside, beyond the smaller. $16/(1+d)^2 = 4/d^2 \\Rightarrow 4d = 2(1 + d) \\Rightarrow d = 1$ m, so $x = 2$ m." },
        { text: "$x = 3$ m", feedback: "Check: at $x = 3$, $16/9 \\ne 4/4$. Solve $16/(1+d)^2 = 4/d^2$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-8-q6",
      variant: "mastery",
      question: "In a field-line diagram, 8 lines leave charge A and all 8 end on charge B. Another 8 lines come in from far away and also end on B. What are the charges?",
      options: [
        { text: "A $= +q$, B $= -2q$", correct: true, feedback: "A sends 8 lines (positive); B receives 16 (negative, twice the size)." },
        { text: "A $= +q$, B $= -q$", feedback: "B receives 16 lines in total, not 8." },
        { text: "A $= -q$, B $= +2q$", feedback: "Lines start on positive charges, so A is positive." },
      ],
    },
    {
      type: "quiz",
      id: "em0-8-q7",
      variant: "mastery",
      question: "A dipole with $pE = 2\\times10^{-3}$ J in a uniform field is turned from $\\theta = 60^\\circ$ to $\\theta = 180^\\circ$. How much work does the external agent do?",
      options: [
        { text: "$1\\times10^{-3}$ J", feedback: "Sign slip: $\\cos180^\\circ = -1$, so the bracket is $0.5 - (-1) = 1.5$." },
        { text: "$3\\times10^{-3}$ J", correct: true, feedback: "$pE(\\cos60^\\circ - \\cos180^\\circ) = 2\\times10^{-3}(0.5 + 1)$." },
        { text: "$4\\times10^{-3}$ J", feedback: "$2pE$ is the work from $0^\\circ$, not from $60^\\circ$." },
        { text: "$-3\\times10^{-3}$ J", feedback: "Turning towards the unstable position raises the energy, so the agent does positive work." },
      ],
    },
    {
      type: "quiz",
      id: "em0-8-q8",
      variant: "mastery",
      question: "A ring's upper half carries $+Q$ and its lower half $-Q$, each spread uniformly. What is the field at the centre?",
      options: [
        { text: "Zero, the halves cancel", feedback: "The $+$ half pushes a test charge down; the $-$ half pulls it down too. They add." },
        { text: "$\\dfrac{2kQ}{\\pi R^2}$, from the positive half towards the negative half", feedback: "That is one half's contribution. The other half adds an equal amount in the same direction." },
        { text: "$\\dfrac{2kQ}{R^2}$", feedback: "The arc spreads the charge over angle $\\pi$, which introduces the factor $2/\\pi$ for each half." },
        { text: "$\\dfrac{4kQ}{\\pi R^2}$, from the positive half towards the negative half", correct: true, feedback: "Each semicircle gives $2k\\lambda/R = 2kQ/\\pi R^2$, both pointing the same way." },
      ],
    },
    {
      type: "quiz",
      id: "em0-8-q9",
      variant: "mastery",
      question: "A ring of radius $R$ carries charge $Q$. The largest field anywhere on its axis is",
      options: [
        { text: "$\\dfrac{kQ}{R^2}$, at the centre", feedback: "The field at the centre is zero: opposite pieces cancel." },
        { text: "$\\dfrac{2kQ}{3\\sqrt3\\,R^2}$, at $x = R/\\sqrt2$", correct: true, feedback: "$dE/dx = 0$ gives $R^2 = 2x^2$; then $E = kQ(R/\\sqrt2)/(3R^2/2)^{3/2} = 2kQ/3\\sqrt3R^2 \\approx 0.385\\,kQ/R^2$." },
        { text: "$\\dfrac{kQ}{2\\sqrt2\\,R^2}$, at $x = R$", feedback: "That is the field at $x = R$, which is just past the peak ($0.354$ vs $0.385$ of $kQ/R^2$)." },
      ],
    },
    {
      type: "quiz",
      id: "em0-8-q10",
      variant: "mastery",
      question: "An electron is shot between deflecting plates parallel to them. If its entry speed is halved (field and plate length unchanged), its sideways deflection at exit becomes",
      options: [
        { text: "twice as large", feedback: "The time between the plates doubles, and deflection goes as $t^2$." },
        { text: "half as large", feedback: "A slower electron spends longer between the plates, so it is deflected more, not less." },
        { text: "four times as large", correct: true, feedback: "$y = eEx^2/2mv^2 \\propto 1/v^2$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-8-q11",
      variant: "mastery",
      question: "(JEE Advanced style, part 1) A 10 g pendulum bob carrying $+2\\ \\mu$C hangs from a 1 m thread in a uniform **horizontal** field of $5\\times10^4$ N/C. At what angle to the vertical does it rest?",
      options: [
        { text: "$45^\\circ$", correct: true, feedback: "$qE = 2\\times10^{-6}\\times5\\times10^4 = 0.1$ N and $mg = 0.1$ N, so $\\tan\\theta = qE/mg = 1$." },
        { text: "$30^\\circ$", feedback: "$\\tan30^\\circ \\approx 0.58$, but $qE/mg = 1$ here." },
        { text: "$0^\\circ$, the field is horizontal and gravity vertical", feedback: "The horizontal electric force pushes the bob sideways until the tension balances both forces." },
        { text: "$60^\\circ$", feedback: "Compute both forces: $qE = 0.1$ N, $mg = 0.1$ N. Equal forces mean $\\tan\\theta = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "em0-8-q12",
      variant: "mastery",
      question: "(JEE Advanced style, part 2) For the same pendulum, what is the period of small oscillations about the new equilibrium?",
      options: [
        { text: "about $1.99$ s", feedback: "That is the period without the field, $2\\pi\\sqrt{L/g}$. The electric force adds to the restoring pull." },
        { text: "about $1.41$ s", feedback: "That divides $T_0$ by $\\sqrt2$, i.e. uses $g_{\\text{eff}} = 2g$. The forces add as perpendicular vectors: $g_{\\text{eff}} = \\sqrt2\\,g$." },
        { text: "about $2.36$ s", feedback: "A stronger effective gravity shortens the period, not lengthens it." },
        { text: "about $1.67$ s", correct: true, feedback: "The bob feels a steady effective gravity $g_{\\text{eff}} = \\sqrt{g^2 + (qE/m)^2} = 10\\sqrt2$ m/s², so $T = 2\\pi\\sqrt{L/g_{\\text{eff}}} = 2\\pi\\sqrt{1/14.14} \\approx 1.67$ s." },
      ],
      hint: "Gravity and the electric force are both constant; combine them into one effective $g$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Adding field vectors piece by piece is honest but slow. Chapter 1 gives two shortcuts: Gauss's law, which counts field lines through a closed surface and turns symmetric problems into one line, and the potential, which replaces vectors with plain numbers.",
    },
  ]),
};

export const emChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lesson07,
  lessonMastery,
];
