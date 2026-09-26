import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Probability Chapter 2 — Conditional Probability and Independence.
 * New information shrinks the sample space. One definition gives the
 * multiplication rule, trees, a precise notion of independence, and the
 * tools to see through the classic conditioning traps.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "shrinking-the-sample-space",
  title: "2.1 · Shrinking the Sample Space",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pr-2-conditional-probability-and-independence.mp4",
      poster: "/videos/pr-2-conditional-probability-and-independence.jpg",
      title: "Chapter 2 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "A friend rolls two dice behind a book. Before they say anything, the chance that the first die shows a 6 is $\\frac{1}{6}$. Then they add: *\"the total is at least 10.\"* Does your answer change?\n\nIt should. Most of the 36 outcomes, like $(1, 2)$ or $(3, 3)$, have just been ruled out. The only ones left are those with a big total, and a 6 on the first die is heavily involved in those. The information hasn't changed the dice. It has changed **which outcomes are still possible**.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "two-dice",
        events: [
          { id: "A", label: "first die is 6", latex: "A", preset: "first-eq", value: 6 },
          { id: "B", label: "sum is at least 10", latex: "B", preset: "sum-ge", value: 10 },
        ],
        givenEvent: "B",
        batchSizes: [1, 10, 100, 1000],
        seed: 21,
        caption:
          "Cells outside B (sum at least 10) are greyed out: they can no longer happen. Count what is left. Six cells survive, and three of them have a 6 on the first die. Run the simulation and watch the frequency among the surviving rolls settle near 1/2, not 1/6.",
      },
    },
    {
      type: "text",
      content:
        "Count it out. The event $B$ = \"sum at least 10\" is $\\{(4,6), (5,5), (6,4), (5,6), (6,5), (6,6)\\}$, which is 6 cells. Inside $B$, the first die is 6 in $(6,4), (6,5), (6,6)$: 3 cells. So once we know $B$ happened,\n\n$$P(\\text{first is } 6 \\mid B) = \\frac{3}{6} = \\frac{1}{2}.$$\n\nThe knowledge tripled the probability, from $\\frac{1}{6}$ to $\\frac{1}{2}$.",
    },
    {
      type: "text",
      content:
        "**Turning the count into a formula.** With equally likely outcomes we just did\n\n$$P(A \\mid B) = \\frac{n(A \\cap B)}{n(B)}.$$\n\nWe count only the part of $A$ that lies inside $B$, because the rest of $A$ is ruled out, and we divide by the size of the new universe $B$ instead of $S$. Divide the top and bottom by $n(S)$ and the counts become probabilities:",
    },
    {
      type: "math",
      latex:
        "P(A \\mid B) = \\frac{n(A\\cap B)/n(S)}{n(B)/n(S)} = \\frac{P(A \\cap B)}{P(B)}, \\qquad P(B) > 0",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Conditional probability",
      content:
        "The probability of $A$ **given** $B$ is $P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}$, defined whenever $P(B) > 0$.\nRead the bar as \"given that\". $B$ becomes the new sample space, and the formula rescales it so that its total probability is 1.",
    },
    {
      type: "text",
      content:
        "**Why dividing by $P(B)$ is the right move.** Inside the new universe $B$, the probabilities of all surviving outcomes must add up to 1, because *something* in $B$ happened. They currently add up to $P(B)$. Dividing everything by $P(B)$ scales them up so they total 1, and it leaves their *ratios* untouched: two surviving outcomes that were equally likely before stay equally likely.",
    },
    {
      type: "text",
      content:
        "Because $P(\\cdot \\mid B)$ is just a probability on the smaller universe $B$, every rule from Chapter 1 carries over unchanged:",
    },
    {
      type: "table",
      headers: ["Property", "Why it holds"],
      rows: [
        ["$P(S \\mid B) = 1$", "$\\frac{P(S\\cap B)}{P(B)} = \\frac{P(B)}{P(B)} = 1$: something in $B$ certainly happened"],
        ["$P(B \\mid B) = 1$", "Same reason; $B$ is the whole new universe"],
        ["$P(A' \\mid B) = 1 - P(A \\mid B)$", "$A \\cap B$ and $A' \\cap B$ split $B$ into two pieces, so their probabilities add to $P(B)$"],
        ["$P(A \\cup C \\mid B) = P(A \\mid B) + P(C \\mid B) - P(A\\cap C \\mid B)$", "The addition rule, applied inside $B$"],
        ["$0 \\le P(A \\mid B) \\le 1$", "$A \\cap B$ is a piece of $B$, so its probability is at most $P(B)$"],
      ],
    },
    {
      type: "text",
      content:
        "**Two-way tables.** Survey data usually arrives already counted. In a class of 100 students, each student was asked whether they play cricket:",
    },
    {
      type: "table",
      headers: ["", "Plays cricket", "Doesn't", "Total"],
      rows: [
        ["Boy", "36", "24", "60"],
        ["Girl", "14", "26", "40"],
        ["Total", "50", "50", "100"],
      ],
    },
    {
      type: "text",
      content:
        "Conditioning means **picking a row or a column and forgetting the rest of the table**.\n\n$P(\\text{cricket} \\mid \\text{girl})$: restrict to the Girl row, which has 40 students. 14 of them play, so the answer is $\\frac{14}{40} = 0.35$.\n\n$P(\\text{girl} \\mid \\text{cricket})$: restrict to the Cricket column, which has 50 students. 14 of them are girls, so the answer is $\\frac{14}{50} = 0.28$.\n\nThe overlap is the same 14 students both times. Only the denominator, the new universe, changed.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The bar is not symmetric",
      content:
        "$P(A \\mid B)$ and $P(B \\mid A)$ share a numerator, $P(A \\cap B)$, but divide by different things. Almost everyone with measles has spots, so $P(\\text{spots} \\mid \\text{measles}) \\approx 1$. But most people with spots have acne, chickenpox or a rash, so $P(\\text{measles} \\mid \\text{spots})$ is small. Swapping the two is the single most expensive mistake in probability, and Chapter 3 is built around undoing it.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** A fair die is rolled and you are told the result is odd. What is the probability that it is prime?\n\n1. New universe: $B = \\{1, 3, 5\\}$, so $n(B) = 3$.\n2. The primes inside $B$ are $\\{3, 5\\}$ (1 is not prime), so $n(A \\cap B) = 2$.\n3. $P(\\text{prime} \\mid \\text{odd}) = \\frac{2}{3}$.\n\nWithout the information the answer would be $\\frac{3}{6} = \\frac{1}{2}$, since the primes are 2, 3 and 5.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** $P(A) = 0.8$, $P(B) = 0.5$ and $P(B \\mid A) = 0.4$. Find $P(A \\cap B)$, $P(A \\mid B)$ and $P(A \\cup B)$.\n\n1. From the definition, $P(A \\cap B) = P(A)\\,P(B \\mid A) = 0.8 \\times 0.4 = 0.32$.\n2. $P(A \\mid B) = \\frac{P(A\\cap B)}{P(B)} = \\frac{0.32}{0.5} = 0.64$.\n3. $P(A \\cup B) = 0.8 + 0.5 - 0.32 = 0.98$.\n\nNotice $P(B \\mid A) = 0.4$ but $P(A \\mid B) = 0.64$. Same overlap, different universe.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (application): exam results.** In a school, 30% of students fail Physics, 25% fail Maths and 10% fail both. A student is picked at random.\n\n(a) She failed Physics. What is the probability she also failed Maths?\n(b) She failed Maths. What is the probability she also failed Physics?\n(c) She failed at least one subject. What is the probability she failed Maths?\n\nLet $P$ = \"fails Physics\" and $M$ = \"fails Maths\".\n\n1. **(a)** The new universe is the Physics failures: $P(M \\mid P) = \\frac{0.10}{0.30} = \\frac{1}{3}$. *Why:* the 10% who failed both are the only part of $M$ that survives inside $P$.\n2. **(b)** Same overlap, new universe: $P(P \\mid M) = \\frac{0.10}{0.25} = \\frac{2}{5}$. *Why:* the bar is not symmetric, so the denominator switches to $P(M)$.\n3. **(c)** First find the universe: $P(P \\cup M) = 0.30 + 0.25 - 0.10 = 0.45$. Everyone who failed Maths is inside it, so $M \\cap (P \\cup M) = M$. *Why:* when the target sits entirely inside the condition, the intersection is just the target.",
    },
    {
      type: "math",
      latex:
        "P(M \\mid P \\cup M) = \\frac{P(M)}{P(P \\cup M)} = \\frac{0.25}{0.45} = \\frac{5}{9}",
    },
    {
      type: "text",
      content:
        "Three different answers, $\\frac{1}{3}$, $\\frac{2}{5}$ and $\\frac{5}{9}$, all built from the same three percentages. Each question names a different universe, and the whole job is to read which one.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style).** A die is thrown three times. Given that the three numbers are all different, find the probability that at least one of them is a 6.\n\n1. **Size the universe.** Ordered triples with all numbers different: $6 \\times 5 \\times 4 = 120$. *Why:* the condition is now the sample space, so count it first; the other $216 - 120 = 96$ triples are gone.\n2. **Count the complement inside it.** All different **and** no 6 means choosing from $\\{1, \\dots, 5\\}$: $5 \\times 4 \\times 3 = 60$. *Why:* \"at least one\" is messy to count directly; \"none\" is a single product.\n3. **Subtract and divide.** The complement rule holds inside $B$ (see the table above):",
    },
    {
      type: "math",
      latex:
        "P(\\text{at least one } 6 \\mid \\text{all different}) = 1 - \\frac{60}{120} = \\frac{1}{2}",
    },
    {
      type: "text",
      content:
        "Sanity check by symmetry: three distinct faces out of six means each face has a $\\frac{3}{6}$ chance of being among them, and 6 is just one face. Without the condition the answer is $1 - \\left(\\frac{5}{6}\\right)^3 = \\frac{91}{216} \\approx 0.42$; knowing the numbers are distinct pushes it up to $0.5$.",
    },
    {
      type: "quiz",
      id: "pr2-1-q1",
      variant: "practice",
      question: "Two fair dice are rolled and the sum is 6. What is the probability that the roll was a double?",
      options: [
        { text: "$\\dfrac{1}{5}$", correct: true, feedback: "Sum 6 has five cells: $(1,5), (2,4), (3,3), (4,2), (5,1)$. Only $(3,3)$ is a double." },
        { text: "$\\dfrac{1}{6}$", feedback: "That is $P(\\text{double})$ with no information. Given the sum, only 5 cells remain." },
        { text: "$\\dfrac{1}{36}$", feedback: "That is $P(\\text{double and sum } 6)$ out of all 36 cells. Divide by the new universe, not by $S$." },
        { text: "$\\dfrac{5}{36}$", feedback: "That is $P(\\text{sum is } 6)$, the size of the condition, not the answer." },
      ],
      hint: "List the cells with sum 6 and treat them as the whole sample space.",
    },
    {
      type: "quiz",
      id: "pr2-1-q2",
      variant: "concept",
      question:
        "Nearly everyone with measles has spots. A student concludes: \"so if you have spots, you almost certainly have measles.\" What is wrong?",
      options: [
        {
          text: "They swapped $P(\\text{spots} \\mid \\text{measles})$ for $P(\\text{measles} \\mid \\text{spots})$; the second divides by everyone with spots, and most of them have something else.",
          correct: true,
          feedback: "Same overlap, very different universes. The spots universe is huge, and measles is a tiny part of it.",
        },
        { text: "Nothing. Conditional probability is symmetric, so $P(A \\mid B) = P(B \\mid A)$.", feedback: "They share the numerator $P(A \\cap B)$, but the denominators are $P(B)$ and $P(A)$. They are equal only when $P(A) = P(B)$." },
        { text: "The claim is wrong only because medical data is unreliable.", feedback: "Even with perfect data the reasoning fails. The error is in the logic, not the measurements." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-1-q3",
      variant: "practice",
      question: "Using the cricket table above, what is $P(\\text{boy} \\mid \\text{plays cricket})$?",
      options: [
        { text: "$0.72$", correct: true, feedback: "The Cricket column has 50 students, and 36 of them are boys: $\\frac{36}{50} = 0.72$." },
        { text: "$0.60$", feedback: "That is $P(\\text{cricket} \\mid \\text{boy}) = \\frac{36}{60}$. You conditioned on the wrong event." },
        { text: "$0.36$", feedback: "That is $P(\\text{boy} \\cap \\text{cricket})$ out of all 100 students. Restrict to the column first." },
        { text: "$0.50$", feedback: "That is $P(\\text{cricket})$, not a conditional probability." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-1-q4",
      variant: "practice",
      question: "$P(A) = 0.6$, $P(B) = 0.3$ and $P(A \\cap B) = 0.2$. Find $P(A' \\mid B)$.",
      options: [
        { text: "$\\dfrac{1}{3}$", correct: true, feedback: "$P(A \\mid B) = \\frac{0.2}{0.3} = \\frac{2}{3}$, and the complement rule works inside $B$: $1 - \\frac{2}{3} = \\frac{1}{3}$." },
        { text: "$0.4$", feedback: "That is $P(A') = 1 - 0.6$, which ignores the condition." },
        { text: "$\\dfrac{2}{3}$", feedback: "That is $P(A \\mid B)$. The question asks for its complement." },
        { text: "$0.1$", feedback: "That is $P(A' \\cap B) = 0.3 - 0.2$. You still need to divide by $P(B)$." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-1-q5",
      variant: "concept",
      question: "When is $P(A \\mid B) = 1$ (with $P(B) > 0$)?",
      options: [
        { text: "When every outcome of $B$ is also in $A$ ($B \\subseteq A$).", correct: true, feedback: "Then $A \\cap B = B$, so the ratio is $\\frac{P(B)}{P(B)} = 1$." },
        { text: "Whenever $A$ and $B$ overlap.", feedback: "Overlap gives $P(A \\mid B) > 0$, but it equals 1 only if all of $B$ lies in $A$." },
        { text: "When $A$ and $B$ are mutually exclusive.", feedback: "Then $A \\cap B = \\varnothing$ and $P(A \\mid B) = 0$, the opposite." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-1-q6",
      variant: "practice",
      question:
        "A card is drawn from a standard 52-card deck, and you are told it is a face card (J, Q or K). What is $P(\\text{king or heart} \\mid \\text{face card})$?",
      options: [
        { text: "$\\dfrac{1}{2}$", correct: true, feedback: "The new universe has 12 face cards. Kings: 4. Face hearts: 3. King of hearts: 1, counted in both. So $\\frac{4 + 3 - 1}{12} = \\frac{6}{12} = \\frac{1}{2}$. The addition rule works inside $B$." },
        { text: "$\\dfrac{7}{12}$", feedback: "That adds 4 kings and 3 face hearts but counts the king of hearts twice. Subtract the overlap." },
        { text: "$\\dfrac{6}{52}$", feedback: "The 6 favourable cards are right, but the condition shrinks the universe to the 12 face cards." },
        { text: "$\\dfrac{1}{3}$", feedback: "That is $P(\\text{king} \\mid \\text{face card}) = \\frac{4}{12}$ alone. The event is 'king **or** heart'." },
      ],
      hint: "Restrict to the 12 face cards, then use the addition rule inside that universe.",
    },
    {
      type: "quiz",
      id: "pr2-1-q7",
      variant: "practice",
      question:
        "In a coaching centre, 40% of students take Physics tuition, 30% take Maths tuition and 15% take both. A student taking Physics tuition is picked at random. What is the probability they also take Maths tuition?",
      options: [
        { text: "$\\dfrac{3}{8}$", correct: true, feedback: "Restrict to the Physics group: $\\frac{0.15}{0.40} = \\frac{3}{8}$." },
        { text: "$\\dfrac{1}{2}$", feedback: "That is $\\frac{0.15}{0.30} = P(\\text{Physics} \\mid \\text{Maths})$. You divided by the wrong universe." },
        { text: "$0.15$", feedback: "That is $P(\\text{both})$ out of all students. The condition shrinks the universe to the Physics group." },
        { text: "$0.30$", feedback: "That is $P(\\text{Maths})$, which ignores the information." },
      ],
      hint: "The new universe is the 40% who take Physics tuition.",
    },
    {
      type: "quiz",
      id: "pr2-1-q8",
      variant: "practice",
      question: "Two dice are thrown and the two numbers are different. What is the probability that the sum is 4?",
      options: [
        { text: "$\\dfrac{1}{15}$", correct: true, feedback: "30 cells have different numbers. Sum 4 with different numbers: $(1,3)$ and $(3,1)$. So $\\frac{2}{30} = \\frac{1}{15}$." },
        { text: "$\\dfrac{1}{12}$", feedback: "That is $\\frac{3}{36} = P(\\text{sum } 4)$ with no information." },
        { text: "$\\dfrac{1}{10}$", feedback: "That uses the new universe of 30 but keeps $(2,2)$, which has been ruled out." },
        { text: "$\\dfrac{1}{18}$", feedback: "That is $\\frac{2}{36}$: the right cells, the old universe." },
      ],
      hint: "Remove the 6 doubles first. How many cells are left?",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "multiplication-rule",
  title: "2.2 · The Multiplication Rule",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "The definition of conditional probability is a division. Multiply both sides by $P(A)$ and it becomes a tool for building the probability of two things happening together, one step at a time:",
    },
    {
      type: "math",
      latex:
        "P(B \\mid A) = \\frac{P(A \\cap B)}{P(A)} \\quad\\Longrightarrow\\quad P(A \\cap B) = P(A)\\,P(B \\mid A)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The multiplication rule",
      content:
        "$P(A \\cap B) = P(A)\\,P(B \\mid A) = P(B)\\,P(A \\mid B)$.\nRead it as a story: **first** $A$ happens, **then**, in the world where $A$ has happened, $B$ happens. It is always true. No independence is needed.",
    },
    {
      type: "text",
      content:
        "The sequential reading is what makes it useful. When you draw cards or balls one after another **without replacement**, the second draw happens in a changed world: the urn is smaller, and its make-up depends on what came out first. $P(B \\mid A)$ is exactly the probability in that changed world.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "urn",
        urn: {
          colors: [
            { label: "red", count: 5 },
            { label: "blue", count: 3 },
          ],
          draws: 2,
          replacement: false,
          allowReplacementToggle: true,
          trackColor: "red",
          trackCount: 2,
        },
        seed: 7,
        caption:
          "Two balls drawn from 5 red and 3 blue; the tracked event is 'both red'. Without replacement the theory is 5/8 × 4/7 = 5/14 ≈ 0.357. Flip the replacement toggle and it becomes 5/8 × 5/8 ≈ 0.391. The second draw really does see a different urn.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1: two aces.** Two cards are dealt from a shuffled 52-card deck. What is the probability that both are aces?\n\n1. $P(\\text{1st ace}) = \\frac{4}{52}$.\n2. Given the first was an ace, 51 cards remain and only 3 of them are aces: $P(\\text{2nd ace} \\mid \\text{1st ace}) = \\frac{3}{51}$.\n3. Multiply: $\\frac{4}{52} \\times \\frac{3}{51} = \\frac{12}{2652} = \\frac{1}{221}$.\n\n**Check by counting (Chapter 1):** $\\dfrac{\\binom{4}{2}}{\\binom{52}{2}} = \\dfrac{6}{1326} = \\dfrac{1}{221}$. The two methods agree, as they must.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "The urn changed",
      content:
        "$\\frac{4}{52} \\times \\frac{4}{52} = \\frac{1}{169}$ is the answer **with** replacement, where the first card goes back before the second is drawn. Without replacement the second factor must describe the deck as it now is: 51 cards, 3 aces. Every factor after the first is a conditional probability.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: defective bulbs.** A box has 10 bulbs, 3 of them defective. Two are taken out one after another without replacement.\n\n- Both defective: $\\frac{3}{10} \\times \\frac{2}{9} = \\frac{6}{90} = \\frac{1}{15}$.\n- Neither defective: $\\frac{7}{10} \\times \\frac{6}{9} = \\frac{42}{90} = \\frac{7}{15}$.\n- Exactly one defective: either defective-then-good, $\\frac{3}{10} \\times \\frac{7}{9} = \\frac{21}{90}$, or good-then-defective, $\\frac{7}{10} \\times \\frac{3}{9} = \\frac{21}{90}$. Together that is $\\frac{42}{90} = \\frac{7}{15}$.\n\nCheck: $\\frac{1}{15} + \\frac{7}{15} + \\frac{7}{15} = 1$. The three cases cover everything.",
    },
    {
      type: "text",
      content:
        "**Three events.** Apply the rule twice. Treat $A \\cap B$ as a single event and multiply by the chance of $C$ given it:",
    },
    {
      type: "math",
      latex:
        "P(A \\cap B \\cap C) = P(A \\cap B)\\,P(C \\mid A \\cap B) = P(A)\\,P(B \\mid A)\\,P(C \\mid A \\cap B)",
    },
    {
      type: "text",
      content:
        "Each factor conditions on **everything that has already happened**. The chain can be as long as you like.\n\n**Worked example 3.** Three cards are dealt. $P(\\text{all kings}) = \\frac{4}{52} \\times \\frac{3}{51} \\times \\frac{2}{50} = \\frac{24}{132600} = \\frac{1}{5525}$.",
    },
    {
      type: "table",
      headers: ["Draw", "Cards left", "Kings left", "Factor"],
      rows: [
        ["1st", "52", "4", "$\\frac{4}{52}$"],
        ["2nd (given 1st was a king)", "51", "3", "$\\frac{3}{51}$"],
        ["3rd (given both were kings)", "50", "2", "$\\frac{2}{50}$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 4 (application): the bunch of keys.** You have 5 similar-looking keys and only one opens your front door. You try them one at a time, putting each wrong key aside. What is the probability that the door opens on the **third** try?\n\n1. **Try 1 fails:** 4 of the 5 keys are wrong, so $\\frac{4}{5}$. *Why:* every key is equally likely to be picked first.\n2. **Try 2 fails, given try 1 failed:** 4 keys remain and 3 are wrong, so $\\frac{3}{4}$. *Why:* the discarded key changed the bunch, so this factor is conditional.\n3. **Try 3 works, given two failures:** 3 keys remain and exactly one is right, so $\\frac{1}{3}$.\n4. Multiply along the story:",
    },
    {
      type: "math",
      latex:
        "P(\\text{opens on try } 3) = \\frac{4}{5} \\times \\frac{3}{4} \\times \\frac{1}{3} = \\frac{1}{5}",
    },
    {
      type: "text",
      content:
        "The answer is $\\frac{1}{5}$ for **every** try from 1 to 5. That makes sense: trying the keys in a random order is the same as shuffling them, and the right key is equally likely to sit in any of the 5 positions. The telescoping product is the multiplication rule's way of proving it. (If you foolishly put wrong keys back, the answer becomes $\\left(\\frac{4}{5}\\right)^2 \\cdot \\frac{1}{5} = \\frac{16}{125}$ instead.)",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style, NCERT/CBSE).** Three cards are drawn one after another, without replacement, from a well-shuffled deck of 52. Find the probability that the first two are kings and the third is an ace.\n\n1. $P(K_1) = \\frac{4}{52}$. *Why:* 4 kings in a full deck.\n2. $P(K_2 \\mid K_1) = \\frac{3}{51}$. *Why:* one king has gone, and the deck has one card fewer.\n3. $P(A_3 \\mid K_1 \\cap K_2) = \\frac{4}{50}$. *Why:* the two cards removed were kings, so **all 4 aces are still there**, now among 50 cards. Only the count of cards drops, not the count of aces.\n4. Chain them together:",
    },
    {
      type: "math",
      latex:
        "P(K_1 \\cap K_2 \\cap A_3) = \\frac{4}{52} \\cdot \\frac{3}{51} \\cdot \\frac{4}{50} = \\frac{48}{132600} = \\frac{2}{5525}",
    },
    {
      type: "text",
      content:
        "The common slip is writing $\\frac{3}{50}$ for the ace, as though the aces had been touched. Each factor asks \"what does the deck look like **now**?\", and the answer depends on what was actually removed.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The order of the story is your choice",
      content:
        "$P(A)P(B \\mid A)$ and $P(B)P(A \\mid B)$ give the same number. Tell the story in whichever order makes the conditional probabilities easy to write down. For sequential draws that is almost always the order in which things actually happen.",
    },
    {
      type: "quiz",
      id: "pr2-2-q1",
      variant: "concept",
      question: "Two cards are dealt without replacement. Which expression gives $P(\\text{both aces})$?",
      options: [
        { text: "$\\dfrac{4}{52} \\times \\dfrac{3}{51}$", correct: true, feedback: "The second factor describes the deck after one ace has gone: 51 cards, 3 aces." },
        { text: "$\\dfrac{4}{52} \\times \\dfrac{4}{52}$", feedback: "That treats the second draw as if the first card had gone back. Without replacement, the deck has changed." },
        { text: "$\\dfrac{4}{52} + \\dfrac{3}{51}$", feedback: "Adding is for 'or' across separate cases. 'First and then second' multiplies." },
        { text: "$\\dfrac{2}{52}$", feedback: "$\\frac{2}{52}$ treats \"two aces\" as picking 2 favourable cards out of 52 in a single draw. There are two draws, and each needs its own factor: $\\frac{4}{52}$ for the first, then $\\frac{3}{51}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-2-q2",
      variant: "practice",
      question: "A bag has 5 white and 7 black balls. Two are drawn without replacement. What is $P(\\text{both black})$?",
      options: [
        { text: "$\\dfrac{7}{22}$", correct: true, feedback: "$\\frac{7}{12} \\times \\frac{6}{11} = \\frac{42}{132} = \\frac{7}{22}$." },
        { text: "$\\dfrac{49}{144}$", feedback: "That is $\\left(\\frac{7}{12}\\right)^2$, the with-replacement answer." },
        { text: "$\\dfrac{7}{12}$", feedback: "That is only the first draw." },
        { text: "$\\dfrac{35}{132}$", feedback: "That is $\\frac{7}{12} \\times \\frac{5}{11}$, black then white." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-2-q3",
      variant: "practice",
      question: "From a box of 10 bulbs with 3 defective, three are taken without replacement. What is $P(\\text{all three good})$?",
      options: [
        { text: "$\\dfrac{7}{24}$", correct: true, feedback: "$\\frac{7}{10} \\times \\frac{6}{9} \\times \\frac{5}{8} = \\frac{210}{720} = \\frac{7}{24}$." },
        { text: "$\\dfrac{343}{1000}$", feedback: "That is $0.7^3$, as if each bulb went back into the box." },
        { text: "$\\dfrac{7}{10}$", feedback: "That is the first draw alone." },
        { text: "$\\dfrac{1}{120}$", feedback: "That is $\\frac{3}{10}\\times\\frac{2}{9}\\times\\frac{1}{8}$, all three defective." },
      ],
      hint: "Each factor uses the box as it is after the earlier draws.",
    },
    {
      type: "quiz",
      id: "pr2-2-q4",
      variant: "concept",
      question: "Which statement is true for **any** two events with positive probability?",
      options: [
        { text: "$P(A \\cap B) = P(B)\\,P(A \\mid B)$", correct: true, feedback: "It is just the definition rearranged. No assumption about independence is needed." },
        { text: "$P(A \\cap B) = P(A)\\,P(B)$", feedback: "That holds only for independent events (lesson 2.3)." },
        { text: "$P(A \\cap B) = P(A \\mid B)\\,P(B \\mid A)$", feedback: "$P(A \\mid B)\\,P(B \\mid A) = \\frac{P(A\\cap B)^2}{P(A)P(B)}$. This equals $P(A \\cap B)$ only when $A$ and $B$ are independent (or $P(A \\cap B) = 0$), so it is not true in general. Example: one die, $A = \\{2\\}$, $B$ = even. $P(A \\cap B) = \\frac{1}{6}$, but $\\frac{1}{3} \\cdot 1 = \\frac{1}{3}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-2-q5",
      variant: "practice",
      question: "$P(A) = 0.4$ and $P(B \\mid A) = 0.25$. What is $P(A \\cap B)$?",
      options: [
        { text: "$0.1$", correct: true, feedback: "$0.4 \\times 0.25 = 0.1$." },
        { text: "$0.65$", feedback: "Adding the two numbers has no meaning here." },
        { text: "$1.6$", feedback: "That divides $0.4$ by $0.25$. A probability can't exceed 1." },
        { text: "$0.625$", feedback: "That is $0.25 / 0.4$." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-2-q6",
      variant: "practice",
      question:
        "A drawer has 6 similar keys and only one fits a padlock. You try them one by one, setting aside each key that fails. What is the probability the padlock opens on the **fourth** try?",
      options: [
        { text: "$\\dfrac{1}{6}$", correct: true, feedback: "$\\frac{5}{6}\\cdot\\frac{4}{5}\\cdot\\frac{3}{4}\\cdot\\frac{1}{3} = \\frac{1}{6}$. The right key is equally likely to be in any position." },
        { text: "$\\dfrac{125}{1296}$", feedback: "That is $\\left(\\frac{5}{6}\\right)^3\\cdot\\frac{1}{6}$, as if failed keys went back into the drawer." },
        { text: "$\\dfrac{1}{3}$", feedback: "That is only the last factor, the chance on try 4 **given** three failures. The failures have to happen first." },
        { text: "$\\dfrac{2}{3}$", feedback: "That is $\\frac{4}{6}$, which has no role in the chain." },
      ],
      hint: "Write one factor per try, each describing the keys that are left.",
    },
    {
      type: "quiz",
      id: "pr2-2-q7",
      variant: "practice",
      question:
        "Three cards are drawn one after another without replacement. What is the probability that the first two are hearts and the third is a spade?",
      options: [
        { text: "$\\dfrac{13}{850}$", correct: true, feedback: "$\\frac{13}{52}\\cdot\\frac{12}{51}\\cdot\\frac{13}{50} = \\frac{2028}{132600} = \\frac{13}{850}$. All 13 spades are still in the deck for the third draw." },
        { text: "$\\dfrac{11}{850}$", feedback: "That is $\\frac{13}{52}\\cdot\\frac{12}{51}\\cdot\\frac{11}{50}$, all three hearts. Removing hearts doesn't remove any spades." },
        { text: "$\\dfrac{1}{64}$", feedback: "That is $\\left(\\frac{1}{4}\\right)^3$, drawing with replacement." },
        { text: "$\\dfrac{2}{17}$", feedback: "That is $\\frac{13}{52}\\cdot\\frac{12}{51} \\cdot 2$, which is not a valid chain. Write one factor per draw." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "independence",
  title: "2.3 · Independence",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Sometimes the news doesn't matter. Being told that it rained in Chennai shouldn't change your chance of rolling a 6. When learning $B$ leaves the probability of $A$ exactly where it was, we call the events **independent**.",
    },
    {
      type: "text",
      content:
        "Test it on two dice. Let $A$ = \"first die is even\" and $B$ = \"sum is 7\". Knowing the sum is 7 sounds as if it should tell you something about the first die. Condition on $B$ in the grid and count.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "two-dice",
        events: [
          { id: "A", label: "first die even", latex: "A", preset: "first-even" },
          { id: "B", label: "sum is 7", latex: "B", preset: "sum-eq", value: 7 },
        ],
        givenEvent: "B",
        seed: 3,
        caption:
          "Given the sum is 7, six cells survive: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). The first die is even in exactly three of them, so P(A | B) = 1/2, the same as P(A). The news changed nothing.",
      },
    },
    {
      type: "text",
      content:
        "Sum 7 is special: **every** value of the first die has exactly one partner that makes 7. So knowing the sum is 7 tells you nothing about the first die. Change the target to sum 8 and the balance breaks. The cells are $(2,6), (3,5), (4,4), (5,3), (6,2)$, three of the five have an even first die, and $P(A \\mid \\text{sum } 8) = \\frac{3}{5} \\ne \\frac{1}{2}$.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-simulator",
        mode: "two-dice",
        events: [
          { id: "A", label: "first die even", latex: "A", preset: "first-even" },
          { id: "B", label: "sum is 8", latex: "B", preset: "sum-eq", value: 8 },
        ],
        givenEvent: "B",
        seed: 4,
        caption:
          "Same A, but now given sum = 8. Only five cells survive and three have an even first die: P(A | B) = 3/5. These two events are dependent.",
      },
    },
    {
      type: "text",
      content:
        "Now turn the idea into a formula. \"Learning $B$ doesn't change $A$\" means $P(A \\mid B) = P(A)$. Put that into the multiplication rule:",
    },
    {
      type: "math",
      latex: "P(A \\cap B) = P(B)\\,P(A \\mid B) = P(B)\\,P(A)",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Independent events",
      content:
        "$A$ and $B$ are **independent** if $P(A \\cap B) = P(A)\\,P(B)$.\nWhen $P(B) > 0$ this is equivalent to $P(A \\mid B) = P(A)$, and when $P(A) > 0$ it is equivalent to $P(B \\mid A) = P(B)$. The product form is the official definition because it is symmetric and still makes sense when a probability is 0.",
    },
    {
      type: "text",
      content:
        "Check the dice with the product form: $P(A) = \\frac{18}{36} = \\frac{1}{2}$, $P(B) = \\frac{6}{36} = \\frac{1}{6}$, and $P(A \\cap B) = \\frac{3}{36} = \\frac{1}{12} = \\frac{1}{2} \\times \\frac{1}{6}$. Independent. Independence is something you **verify with numbers**, not something you decide by gut feeling.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** A die is rolled. Let $E$ = \"multiple of 3\" = $\\{3, 6\\}$ and $F$ = \"even\" = $\\{2, 4, 6\\}$.\n\n1. $P(E) = \\frac{1}{3}$ and $P(F) = \\frac{1}{2}$.\n2. $E \\cap F = \\{6\\}$, so $P(E \\cap F) = \\frac{1}{6}$.\n3. $\\frac{1}{3} \\times \\frac{1}{2} = \\frac{1}{6}$. **Independent.**\n\nNow replace $E$ by $G = \\{1, 2, 3\\}$. Then $G \\cap F = \\{2\\}$, so $P(G \\cap F) = \\frac{1}{6}$, but $P(G)P(F) = \\frac{1}{4}$. **Dependent**: learning the roll is even makes $G$ less likely, $\\frac{1}{3}$ instead of $\\frac{1}{2}$.",
    },
    {
      type: "text",
      content:
        "**Complements of independent events are independent.** If $A$ doesn't care about $B$, it shouldn't care about $B$ failing either. Here is the derivation. $A$ splits into the part inside $B$ and the part outside it, so $P(A \\cap B') = P(A) - P(A \\cap B)$. Then:",
    },
    {
      type: "math",
      latex:
        "P(A \\cap B') = P(A) - P(A)P(B) = P(A)\\bigl(1 - P(B)\\bigr) = P(A)\\,P(B')",
    },
    {
      type: "text",
      content:
        "The same argument swapped gives $A'$ and $B$, and applying it twice gives $A'$ and $B'$. Directly: $P(A' \\cap B') = 1 - P(A \\cup B) = 1 - P(A) - P(B) + P(A)P(B) = (1 - P(A))(1 - P(B))$.\n\n**Worked example 2.** $A$ and $B$ are independent with $P(A) = 0.3$ and $P(B) = 0.4$.\n- $P(A \\cap B) = 0.12$.\n- $P(A \\cup B) = 0.3 + 0.4 - 0.12 = 0.58$.\n- $P(\\text{neither}) = 0.7 \\times 0.6 = 0.42$, and this matches $1 - 0.58$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (application): is tea preference linked to gender?** A café surveys 200 customers:",
    },
    {
      type: "table",
      headers: ["", "Prefers tea", "Prefers coffee", "Total"],
      rows: [
        ["Men", "54", "66", "120"],
        ["Women", "36", "44", "80"],
        ["Total", "90", "110", "200"],
      ],
    },
    {
      type: "text",
      content:
        "Let $M$ = \"is a man\" and $T$ = \"prefers tea\" for a customer picked at random.\n\n1. **Read off the singles from the margins:** $P(M) = \\frac{120}{200} = 0.6$ and $P(T) = \\frac{90}{200} = 0.45$. *Why:* the product test needs both unconditional probabilities.\n2. **Read off the overlap from the cell:** $P(M \\cap T) = \\frac{54}{200} = 0.27$.\n3. **Test:** $P(M)P(T) = 0.6 \\times 0.45 = 0.27$. Equal, so **independent**.\n4. **Cross-check with the conditional form:** $P(T \\mid M) = \\frac{54}{120} = 0.45$ and $P(T \\mid \\text{woman}) = \\frac{36}{80} = 0.45$. *Why:* independence means every row has the same tea rate as the whole table, and here both rows do.\n\nIf the men's tea cell had been 60 (with the totals adjusted), $P(T \\mid M) = \\frac{60}{120} = 0.5$ would differ from the women's rate and the events would be dependent. In real survey data exact equality is rare. Deciding whether a small gap is \"real\" is the job of statistics; probability only tells you what exact independence looks like.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style).** $A$ and $B$ are independent events with $P(A) = 0.4$ and $P(A \\cup B) = 0.6$. Find $P(B)$ and $P(A \\mid B')$.\n\n1. **Write the addition rule with the product built in.** Independence gives $P(A \\cap B) = P(A)P(B)$, so with $p = P(B)$:",
    },
    {
      type: "math",
      latex: "0.6 = 0.4 + p - 0.4p \\;\\Longrightarrow\\; 0.2 = 0.6p \\;\\Longrightarrow\\; p = \\frac{1}{3}",
    },
    {
      type: "text",
      content:
        "*Why:* independence is the extra equation that makes the unknown solvable. Without it, $P(A \\cap B)$ would be a second unknown.\n\n2. **Use the complement result.** $A$ and $B'$ are independent too, so $P(A \\mid B') = P(A) = 0.4$ with no further work.\n3. **Check it the long way.** $P(A \\cap B') = P(A) - P(A \\cap B) = 0.4 - \\frac{0.4}{3} = \\frac{4}{15}$ and $P(B') = \\frac{2}{3}$, so $P(A \\mid B') = \\frac{4/15}{2/3} = \\frac{2}{5} = 0.4$. *Why:* in an exam, a one-line check against the definition catches sign and arithmetic slips.",
    },
    {
      type: "text",
      content:
        "**Certain and impossible events are independent of everything.** Suppose $P(B) = 0$. Since $A \\cap B$ is a piece of $B$, $P(A \\cap B) \\le P(B) = 0$, so $P(A \\cap B) = 0 = P(A) \\cdot 0 = P(A)P(B)$. The product test passes for *every* $A$. Now suppose $P(B) = 1$. Then $P(B') = 0$, so $A$ and $B'$ are independent by what we just showed, and the complement result makes $A$ and $B$ independent too. This matches intuition: being told something you already knew for certain is no news at all.",
    },
    {
      type: "text",
      content:
        "**Independent experiments.** Often independence isn't checked on a grid. It comes from the setup. Toss a coin **and** roll a die: the two experiments have no physical link, so we build the combined sample space of $2 \\times 6 = 12$ equally likely pairs, $(H,1), \\dots, (T,6)$. Then\n\n$$P(H \\text{ and } 4) = \\frac{1}{12} = \\frac{1}{2} \\cdot \\frac{1}{6}.$$\n\nEvery event about the coin is independent of every event about the die. Separate tosses, separate draws *with replacement*, and separate people working alone are all modelled this way.",
    },
    {
      type: "quiz",
      id: "pr2-3-q6",
      variant: "concept",
      question: "$S$ is the whole sample space and $A$ is any event. Are $A$ and $S$ independent?",
      options: [
        { text: "Yes. $P(A \\cap S) = P(A) = P(A) \\cdot 1 = P(A)P(S)$.", correct: true, feedback: "Knowing that *something* happened tells you nothing about $A$. The same holds for any event of probability 0 or 1." },
        { text: "No. $A$ lies inside $S$, so they overlap completely.", feedback: "Overlap is not dependence. The product test is what decides, and it passes: $P(A) \\cdot 1 = P(A)$." },
        { text: "Only if $P(A) = \\frac{1}{2}$.", feedback: "The product test $P(A \\cap S) = P(A) \\cdot 1$ holds for every value of $P(A)$." },
        { text: "The question makes no sense, because independence needs two different experiments.", feedback: "Independence is a condition on two events in one sample space. It is checked with the product test." },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Independent is not the same as mutually exclusive",
      content:
        "Mutually exclusive means $A$ and $B$ can't happen together: $P(A \\cap B) = 0$. If both have positive probability, then $P(A)P(B) > 0 \\ne 0$, so they are **not** independent. In fact they are strongly dependent: learning $A$ happened drops $P(B \\mid A)$ to 0, however likely $B$ was before. Exclusive is about the sets not overlapping; independent is about how the probabilities multiply.",
    },
    {
      type: "text",
      content:
        "**Three events: pairwise is not enough.** Toss two fair coins and let $A$ = \"first is H\", $B$ = \"second is H\", $C$ = \"both show the same face\" = $\\{HH, TT\\}$. Each has probability $\\frac{1}{2}$.",
    },
    {
      type: "table",
      headers: ["Pair or triple", "Outcome(s)", "Probability", "Product of singles", "Equal?"],
      rows: [
        ["$A \\cap B$", "HH", "$\\frac{1}{4}$", "$\\frac{1}{2}\\cdot\\frac{1}{2} = \\frac{1}{4}$", "Yes"],
        ["$A \\cap C$", "HH", "$\\frac{1}{4}$", "$\\frac{1}{4}$", "Yes"],
        ["$B \\cap C$", "HH", "$\\frac{1}{4}$", "$\\frac{1}{4}$", "Yes"],
        ["$A \\cap B \\cap C$", "HH", "$\\frac{1}{4}$", "$\\frac{1}{8}$", "**No**"],
      ],
    },
    {
      type: "text",
      content:
        "Any two of these events are independent. But once you know $A$ and $B$ both happened, $C$ is **certain**. So together they are dependent.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Mutual independence of three events",
      content:
        "$A$, $B$, $C$ are **mutually independent** when all four hold:\n$P(A\\cap B) = P(A)P(B)$, $P(A\\cap C) = P(A)P(C)$, $P(B\\cap C) = P(B)P(C)$, and $P(A\\cap B\\cap C) = P(A)P(B)P(C)$.\nPairwise independence is the first three conditions only. It is strictly weaker.\nFor $n$ events, **every** sub-collection of 2 or more must satisfy the product rule. That is $2^n - n - 1$ conditions: 4 for three events, 11 for four.",
    },
    {
      type: "quiz",
      id: "pr2-3-q1",
      variant: "concept",
      question: "$A$ and $B$ are mutually exclusive with $P(A) = 0.3$ and $P(B) = 0.4$. Are they independent?",
      options: [
        { text: "No. $P(A \\cap B) = 0$, but $P(A)P(B) = 0.12$.", correct: true, feedback: "Exclusive events with positive probability are strongly dependent: if $A$ happens, $B$ certainly doesn't." },
        { text: "Yes. They have nothing to do with each other.", feedback: "'Can't happen together' is a strong connection. Knowing one rules out the other." },
        { text: "Yes, because $P(A \\cup B) = P(A) + P(B)$.", feedback: "That is the addition rule for exclusive events. It says nothing about independence." },
        { text: "It can't be decided without more information.", feedback: "It can: the product test fails, since $0 \\ne 0.12$." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-3-q2",
      variant: "practice",
      question: "$P(A) = 0.5$, $P(B) = 0.4$ and $P(A \\cup B) = 0.7$. Are $A$ and $B$ independent?",
      options: [
        { text: "Yes. $P(A \\cap B) = 0.5 + 0.4 - 0.7 = 0.2 = 0.5 \\times 0.4$.", correct: true, feedback: "Use the addition rule to get the intersection, then apply the product test." },
        { text: "No, because $0.5 + 0.4 \\ne 0.7$.", feedback: "That only shows they are not mutually exclusive." },
        { text: "No, because $P(A \\cap B) = 0.3$.", feedback: "Recompute: $0.5 + 0.4 - 0.7 = 0.2$." },
      ],
      hint: "Find $P(A \\cap B)$ from the addition rule first.",
    },
    {
      type: "quiz",
      id: "pr2-3-q3",
      variant: "practice",
      question: "$A$ and $B$ are independent with $P(A) = 0.6$ and $P(B) = 0.5$. Find $P(A' \\cap B')$.",
      options: [
        { text: "$0.2$", correct: true, feedback: "Complements of independent events are independent: $0.4 \\times 0.5 = 0.2$." },
        { text: "$0.3$", feedback: "That is $P(A \\cap B)$." },
        { text: "$0.7$", feedback: "That is $1 - P(A \\cap B)$, the probability that not both happen." },
        { text: "$0.9$", feedback: "That is $P(A') + P(B')$. 'Neither' means both complements happen, so multiply." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-3-q4",
      variant: "concept",
      question: "If $A$, $B$, $C$ are independent in every pair, must $P(A \\cap B \\cap C) = P(A)P(B)P(C)$?",
      options: [
        { text: "No. With two coins, $A$ = first H, $B$ = second H, $C$ = same face: each pair is independent, but the triple has probability $\\frac{1}{4}$, not $\\frac{1}{8}$.", correct: true, feedback: "Mutual independence needs the three-way condition as well." },
        { text: "Yes. Pairwise independence implies mutual independence.", feedback: "The two-coin counterexample breaks this." },
        { text: "Yes, but only when all three probabilities are $\\frac{1}{2}$.", feedback: "The counterexample has all three equal to $\\frac{1}{2}$, and it still fails." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-3-q5",
      variant: "practice",
      question: "One card is drawn from a standard deck. Are \"spade\" and \"ace\" independent?",
      options: [
        { text: "Yes. $P(\\text{ace of spades}) = \\frac{1}{52} = \\frac{1}{4} \\times \\frac{1}{13}$.", correct: true, feedback: "Also $P(\\text{ace} \\mid \\text{spade}) = \\frac{1}{13} = P(\\text{ace})$, so knowing the suit doesn't change the chance of an ace." },
        { text: "No. The ace of spades belongs to both, so they overlap.", feedback: "Overlap is exactly what independence needs. Overlap of the right size is the test." },
        { text: "No. They are mutually exclusive.", feedback: "They share the ace of spades, so they are not exclusive." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-3-q7",
      variant: "practice",
      question:
        "In a class of 100, 40 students are in the sports club, 50 are in the music club and 20 are in both. For a student picked at random, are \"sports\" and \"music\" independent?",
      options: [
        { text: "Yes. $P(S \\cap M) = 0.2 = 0.4 \\times 0.5$.", correct: true, feedback: "Also $P(M \\mid S) = \\frac{20}{40} = 0.5 = P(M)$: half of the sports club does music, just like half the class." },
        { text: "No. 20 students are in both, so the events overlap.", feedback: "Overlap is required for independence. The question is whether it is the right size, and $0.4 \\times 0.5 = 0.2$ says it is." },
        { text: "No. $P(M \\mid S) = \\frac{20}{50} = 0.4$, which differs from $P(M)$.", feedback: "$\\frac{20}{50}$ is $P(S \\mid M)$, and it equals $P(S) = 0.4$. Both conditional checks pass." },
        { text: "It can't be decided without knowing who is in neither club.", feedback: "The product test only needs $P(S)$, $P(M)$ and $P(S \\cap M)$, which are all given." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-3-q8",
      variant: "practice",
      question: "$A$ and $B$ are independent, $P(A) = 0.3$ and $P(A \\cup B) = 0.65$. What is $P(B)$?",
      options: [
        { text: "$0.5$", correct: true, feedback: "$0.65 = 0.3 + p - 0.3p$, so $0.35 = 0.7p$ and $p = 0.5$." },
        { text: "$0.35$", feedback: "That is $0.65 - 0.3$, which assumes $A$ and $B$ don't overlap. Independent events with positive probability do overlap." },
        { text: "$0.95$", feedback: "That adds the two numbers. Solve $0.65 = 0.3 + p - 0.3p$ instead." },
        { text: "$0.25$", feedback: "Check it: $0.3 + 0.25 - 0.075 = 0.475$, not $0.65$." },
      ],
      hint: "Replace $P(A \\cap B)$ by $0.3p$ in the addition rule.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "probability-trees",
  title: "2.4 · Trees for Multi-Stage Experiments",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "The multiplication rule tells one story at a time: *first this, then that*. Most problems have several possible stories. A **probability tree** draws all of them at once. Each fork is a stage, each branch is labelled with its conditional probability, and each path from root to leaf is one complete story.",
    },
    {
      type: "text",
      content:
        "Two balls are drawn without replacement from a bag with 5 red and 3 blue. The second fork depends on the first: after a red, the bag holds 4 red and 3 blue; after a blue, 5 red and 2 blue.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        root: {
          label: "start",
          children: [
            {
              label: "R",
              prob: 5 / 8,
              children: [
                { label: "R", prob: 4 / 7 },
                { label: "B", prob: 3 / 7 },
              ],
            },
            {
              label: "B",
              prob: 3 / 8,
              children: [
                { label: "R", prob: 5 / 7 },
                { label: "B", prob: 2 / 7 },
              ],
            },
          ],
        },
        format: "fraction",
        highlight: { label: "one of each colour", latex: "E", leaves: ["0.1", "1.0"] },
        caption:
          "Each leaf shows the product along its path. The highlighted event 'one of each colour' is the sum of two leaves: 15/56 + 15/56 = 15/28. Tap leaves to build other events, and check that all four leaves add to 1.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Two rules for trees",
      content:
        "**Multiply along a branch.** A path is \"this *and then* that\", which is the multiplication rule, one factor per fork.\n**Add across branches.** Different leaves are different complete stories. They are mutually exclusive, so an event made of several leaves has probability equal to the sum of those leaves.",
    },
    {
      type: "text",
      content:
        "Why must the leaves add to 1? At each fork the branch probabilities add to 1, because *something* happens next. Expand the product: $\\frac{5}{8}\\left(\\frac{4}{7} + \\frac{3}{7}\\right) + \\frac{3}{8}\\left(\\frac{5}{7} + \\frac{2}{7}\\right) = \\frac{5}{8} + \\frac{3}{8} = 1$. The leaf sum is a free error check. Use it every time.",
    },
    {
      type: "table",
      headers: ["Leaf", "Path product", "Probability"],
      rows: [
        ["RR", "$\\frac{5}{8}\\cdot\\frac{4}{7}$", "$\\frac{20}{56} = \\frac{5}{14}$"],
        ["RB", "$\\frac{5}{8}\\cdot\\frac{3}{7}$", "$\\frac{15}{56}$"],
        ["BR", "$\\frac{3}{8}\\cdot\\frac{5}{7}$", "$\\frac{15}{56}$"],
        ["BB", "$\\frac{3}{8}\\cdot\\frac{2}{7}$", "$\\frac{6}{56} = \\frac{3}{28}$"],
        ["Total", "", "$\\frac{56}{56} = 1$"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Along and across, not the other way round",
      content:
        "Adding along a branch, as in $\\frac{5}{8} + \\frac{4}{7}$, gives numbers above 1, which is a sure sign of an error. Multiplying across branches, as in $\\frac{15}{56} \\times \\frac{15}{56}$, would be the chance of getting RB in one run and BR in a second, separate run. In a single run the experiment follows exactly one path, so two different leaves can never both happen: \"RB and BR\" has probability 0, and \"RB or BR\" is their sum. **And** moves you along a path; **or** moves you across paths.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: urn transfer.** Bag I has 3 red and 2 black balls. Bag II has 2 red and 4 black. One ball is moved at random from Bag I to Bag II, and then a ball is drawn from Bag II. What is $P(\\text{red})$? (In the tree, **K** stands for black, so it isn't confused with the blue **B** above.)\n\n1. Stage 1 (the transfer): red with $\\frac{3}{5}$, black with $\\frac{2}{5}$.\n2. Stage 2 (the draw, from a Bag II that now holds 7 balls): after a red transfer, Bag II has 3 red and 4 black, so red has probability $\\frac{3}{7}$. After a black transfer, it has 2 red and 5 black, so red has probability $\\frac{2}{7}$.\n3. Two leaves end in red: $\\frac{3}{5}\\cdot\\frac{3}{7} + \\frac{2}{5}\\cdot\\frac{2}{7} = \\frac{9}{35} + \\frac{4}{35} = \\frac{13}{35}$.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        root: {
          label: "start",
          children: [
            {
              label: "R moved",
              prob: 3 / 5,
              children: [
                { label: "R", prob: 3 / 7 },
                { label: "K", prob: 4 / 7 },
              ],
            },
            {
              label: "K moved",
              prob: 2 / 5,
              children: [
                { label: "R", prob: 2 / 7 },
                { label: "K", prob: 5 / 7 },
              ],
            },
          ],
        },
        format: "fraction",
        highlight: { label: "red drawn from Bag II", latex: "R", leaves: { matchLastStage: "R" } },
        editable: [{ path: "0", label: "P(\\text{move red})", min: 0, max: 1, step: 0.05 }],
        caption:
          "The red leaves add to 13/35. Drag the transfer probability and watch P(R) move between 2/7 (always move black) and 3/7 (always move red). It is a weighted average of the two, and Chapter 3 builds on exactly that idea.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 2 (application): late for school.** On any morning in the monsoon, it rains with probability $0.3$. If it rains, Kavya's bus is late with probability $0.4$; if it doesn't rain, the bus is late with probability $0.1$. What is the probability that the bus is late on a given morning, and what is the probability that it rains **and** the bus is late?\n\n1. **First fork (weather):** Rain $0.3$, Dry $0.7$. *Why start here:* the lateness probabilities are given **conditional on the weather**, so the weather must come first in the tree.\n2. **Second fork (bus):** after Rain, Late $0.4$ / On time $0.6$; after Dry, Late $0.1$ / On time $0.9$.\n3. **Multiply along each late path:** Rain→Late $= 0.3 \\times 0.4 = 0.12$; Dry→Late $= 0.7 \\times 0.1 = 0.07$.\n4. **Add across the late leaves:**",
    },
    {
      type: "math",
      latex: "P(\\text{late}) = 0.3 \\times 0.4 + 0.7 \\times 0.1 = 0.12 + 0.07 = 0.19",
    },
    {
      type: "text",
      content:
        "\"Rains **and** late\" is a single leaf, $0.12$. \"Late\" is two leaves, $0.19$. The four leaves are $0.12, 0.18, 0.07, 0.63$, which add to 1. Notice that $0.19$ lies between $0.1$ and $0.4$, much closer to $0.1$ because dry mornings are more common: once again, a weighted average.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: best of three.** Asha beats Ravi in each game with probability $0.6$, and the games are independent. The match goes to whoever wins two games first. What is the probability that Asha wins the match?\n\nA real match stops once someone reaches two wins. A useful trick is to **pretend all three games are always played**. The extra game can't change who won, since a player with 2 wins still has at least 2, and its two branches add to 1, so it doesn't change any probability either. That gives a clean 3-stage tree with the same probability, $0.6$, at every fork.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        stages: [
          { label: "Game 1", branches: [{ label: "W" }, { label: "L" }] },
          { label: "Game 2", branches: [{ label: "W" }, { label: "L" }] },
          { label: "Game 3", branches: [{ label: "W" }, { label: "L" }] },
        ],
        probs: [[0.6, 0.4]],
        editable: [{ allStages: true, label: "p", min: 0, max: 1, step: 0.05 }],
        highlight: { label: "Asha wins the match", latex: "M", leaves: ["0.0.0", "0.0.1", "0.1.0", "1.0.0"] },
        caption:
          "The highlighted leaves are WWW, WWL, WLW and LWW, the paths with at least two wins. Their sum is 0.648. Drag p to 0.5 and the match becomes a fair 1/2. For p above 1/2, the best-of-three format gives the stronger player a bigger edge than a single game would.",
      },
    },
    {
      type: "math",
      latex:
        "P(\\text{Asha}) = \\underbrace{0.6^3}_{WWW} + \\underbrace{3 \\times 0.6^2 \\times 0.4}_{WWL,\\ WLW,\\ LWW} = 0.216 + 0.432 = 0.648",
    },
    {
      type: "text",
      content:
        "The same number comes from the real, stopping version: win the first two ($0.36$), or split the first two in either order and then win the decider ($2 \\times 0.6 \\times 0.4 \\times 0.6 = 0.288$). The total is $0.648$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style, JEE): the growing urn.** An urn holds 4 red and 6 black balls. A ball is drawn, its colour is noted, and it is put back **together with 2 more balls of the same colour**. A second ball is then drawn. Find the probability that the second ball is red.\n\n1. **Stage 1:** Red $\\frac{4}{10}$, Black $\\frac{6}{10}$.\n2. **Rebuild the urn for each branch.** *Why:* the second fork depends on what happened, so write the new contents before writing any probability. After red: 6 red, 6 black (12 balls), so Red has $\\frac{6}{12}$. After black: 4 red, 8 black (12 balls), so Red has $\\frac{4}{12}$.\n3. **Multiply along, add across** the two leaves that end in red:",
    },
    {
      type: "math",
      latex:
        "P(R_2) = \\frac{4}{10}\\cdot\\frac{6}{12} + \\frac{6}{10}\\cdot\\frac{4}{12} = \\frac{24}{120} + \\frac{24}{120} = \\frac{48}{120} = \\frac{2}{5}",
    },
    {
      type: "text",
      content:
        "The answer is $\\frac{2}{5}$, **exactly the same** as for the first draw. That is not a coincidence. Before you look at the first ball, you have no reason to think the second draw is any different from the first, so by symmetry it must have the same distribution. What the first draw does change is the **conditional** chances: $P(R_2 \\mid R_1) = \\frac{1}{2}$ is larger than $\\frac{2}{5}$, so $R_1$ and $R_2$ are dependent. The two draws have the same distribution but are not independent.",
    },
    {
      type: "quiz",
      id: "pr2-4-q1",
      variant: "concept",
      question:
        "In a tree, the path R then B has probability $\\frac{5}{8}$ then $\\frac{3}{7}$. How do you get the probability of that leaf?",
      options: [
        { text: "Multiply: $\\frac{5}{8} \\times \\frac{3}{7} = \\frac{15}{56}$.", correct: true, feedback: "One path is 'this and then that', which is the multiplication rule." },
        { text: "Add: $\\frac{5}{8} + \\frac{3}{7}$.", feedback: "That is about 1.05, more than 1. Adding is for combining different leaves." },
        { text: "Take the smaller branch: $\\frac{3}{7}$.", feedback: "The leaf needs both stages to happen, so both factors appear." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-4-q2",
      variant: "practice",
      question:
        "Bag I has 2 white and 3 black balls. Bag II has 4 white and 1 black. One ball is moved at random from Bag I to Bag II, then a ball is drawn from Bag II. What is $P(\\text{white})$?",
      options: [
        { text: "$\\dfrac{11}{15}$", correct: true, feedback: "$\\frac{2}{5}\\cdot\\frac{5}{6} + \\frac{3}{5}\\cdot\\frac{4}{6} = \\frac{10}{30} + \\frac{12}{30} = \\frac{22}{30} = \\frac{11}{15}$." },
        { text: "$\\dfrac{4}{5}$", feedback: "That ignores the transfer; Bag II has 6 balls when you draw." },
        { text: "$\\dfrac{3}{4}$", feedback: "That averages $\\frac{5}{6}$ and $\\frac{4}{6}$ equally. Weight each by its transfer probability." },
        { text: "$\\dfrac{1}{3}$", feedback: "That is only the white-transfer leaf. Add the black-transfer leaf too." },
      ],
      hint: "After the transfer Bag II holds 6 balls. Draw the two-stage tree.",
    },
    {
      type: "quiz",
      id: "pr2-4-q3",
      variant: "practice",
      question: "In a best-of-three match a player wins each game independently with probability $0.7$. What is the probability that they win the match?",
      options: [
        { text: "$0.784$", correct: true, feedback: "$0.7^2 + 2(0.7)(0.3)(0.7) = 0.49 + 0.294 = 0.784$." },
        { text: "$0.7$", feedback: "The format changes the odds: it helps the stronger player." },
        { text: "$0.49$", feedback: "That only counts winning the first two games. You can also win 2–1." },
        { text: "$0.637$", feedback: "That uses one arrangement of 2–1 instead of two, since the loss can be game 1 or game 2." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-4-q4",
      variant: "practice",
      question: "A tree has four leaves. Three of them have probabilities $0.3$, $0.2$ and $0.35$. What is the fourth?",
      options: [
        { text: "$0.15$", correct: true, feedback: "The leaves cover every complete story, so they add to 1." },
        { text: "$0.25$", feedback: "Leaves don't have to be equal. Use the sum-to-1 check." },
        { text: "$0.021$", feedback: "That multiplies across leaves. Leaves add." },
        { text: "It can't be found.", feedback: "It can: the leaves must add to 1." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-4-q5",
      variant: "concept",
      question: "Why is it valid to pretend that all three games of a best-of-three match are played?",
      options: [
        { text: "The extra game can't change who won, and its branches add to 1, so every probability is unchanged.", correct: true, feedback: "Multiplying a path by $(p + q) = 1$ leaves it alone. This trick turns uneven trees into regular ones." },
        { text: "Because matches always go to three games in practice.", feedback: "They often don't. The trick works because the extra game has no effect, not because it is played." },
        { text: "It isn't valid; it overcounts the wins.", feedback: "Each real 2–0 win splits into two imaginary leaves whose probabilities add back to the original." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-4-q6",
      variant: "practice",
      question:
        "It rains with probability $0.4$. If it rains, a cricket match is delayed with probability $0.5$; if not, with probability $0.2$. What is the probability that the match is delayed?",
      options: [
        { text: "$0.32$", correct: true, feedback: "$0.4 \\times 0.5 + 0.6 \\times 0.2 = 0.20 + 0.12 = 0.32$." },
        { text: "$0.35$", feedback: "That averages $0.5$ and $0.2$ equally. Weight each by how likely its weather is." },
        { text: "$0.20$", feedback: "That is only the rain-and-delayed leaf. Dry days can be delayed too." },
        { text: "$0.70$", feedback: "That adds $0.5 + 0.2$. Multiply along each path first, then add." },
      ],
      hint: "Weather first, delay second. Add the two 'delayed' leaves.",
    },
    {
      type: "quiz",
      id: "pr2-4-q7",
      variant: "practice",
      question:
        "An urn has 3 white and 2 black balls. A ball is drawn and put back together with **one** more ball of the same colour. A second ball is drawn. What is $P(\\text{second is white})$?",
      options: [
        { text: "$\\dfrac{3}{5}$", correct: true, feedback: "$\\frac{3}{5}\\cdot\\frac{4}{6} + \\frac{2}{5}\\cdot\\frac{3}{6} = \\frac{12}{30} + \\frac{6}{30} = \\frac{18}{30} = \\frac{3}{5}$, the same as the first draw." },
        { text: "$\\dfrac{2}{3}$", feedback: "That is $P(W_2 \\mid W_1) = \\frac{4}{6}$, only one branch. The first ball might have been black." },
        { text: "$\\dfrac{2}{5}$", feedback: "That is the chance of the first ball being black." },
        { text: "$\\dfrac{7}{12}$", feedback: "That averages $\\frac{4}{6}$ and $\\frac{3}{6}$ equally. Weight them by $\\frac{3}{5}$ and $\\frac{2}{5}$." },
      ],
      hint: "After the first draw the urn has 6 balls. Rebuild it on each branch.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "independent-trials-and-reliability",
  title: "2.5 · Repeated Independent Trials and Reliability",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A plane has two engines, a bank keeps three backup servers, and a rocket's launch depends on a dozen parts all working. Whether a system survives depends on how its parts are wired together. If the parts fail independently, the product rule from 2.3 answers every such question.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Series and parallel",
      content:
        "**Series:** the system works only if **every** part works. $P(\\text{works}) = p_1 p_2 \\cdots p_n$.\n**Parallel (redundant):** the system fails only if **every** part fails. $P(\\text{fails}) = q_1 q_2 \\cdots q_n$ with $q_i = 1 - p_i$, so $P(\\text{works}) = 1 - q_1 q_2 \\cdots q_n$.",
    },
    {
      type: "text",
      content:
        "**Why parallel is computed through failures.** \"At least one part works\" contains many cases: exactly one works, exactly two, and so on. Its complement, \"all fail\", is a single case, and with independence it is a single product. This is the complement trick from Chapter 1, now with independence doing the multiplying.",
    },
    {
      type: "table",
      headers: ["3 parts, each works with $p = 0.9$", "Calculation", "P(system works)"],
      rows: [
        ["Series", "$0.9^3$", "$0.729$"],
        ["Parallel", "$1 - 0.1^3$", "$0.999$"],
        ["Two in parallel, then in series with a third ($0.95$)", "$(1 - 0.1^2)\\times 0.95$", "$0.9405$"],
      ],
    },
    {
      type: "text",
      content:
        "Series makes a chain weaker than its weakest link. Parallel makes the system stronger than its strongest part. For a mixed system, reduce each parallel block to a single number first, then multiply along the series chain.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (application): a village water supply.** Water reaches a village only if the main valve $A$ works **and** at least one of two pumps $B$, $C$ (installed side by side as backups) works. The parts fail independently. $A$ works with probability $0.9$ and each pump with probability $0.8$. How reliable is the supply?\n\n1. **Collapse the parallel block first.** Both pumps fail with $0.2 \\times 0.2 = 0.04$, so the block works with $1 - 0.04 = 0.96$. *Why:* a parallel block behaves like a single part whose reliability we can compute through its one failure case.\n2. **Now it is a series chain of two \"parts\":** valve ($0.9$) then pump block ($0.96$). *Why:* water needs both, so multiply.",
    },
    {
      type: "math",
      latex: "P(\\text{water}) = 0.9 \\times \\bigl(1 - 0.2^2\\bigr) = 0.9 \\times 0.96 = 0.864",
    },
    {
      type: "text",
      content:
        "The backup pump raised the block from $0.8$ to $0.96$, but the system can never beat the single valve's $0.9$. The weak link is now $A$. If the budget allows one more part, a second valve in parallel with $A$ gives $(1 - 0.1^2) \\times 0.96 = 0.99 \\times 0.96 = 0.9504$, which helps more than a third pump would: $0.9 \\times (1 - 0.2^3) = 0.9 \\times 0.992 = 0.8928$.",
    },
    {
      type: "text",
      content:
        "**Repeated trials are the same idea.** A shooter hits a target with probability $0.3$ on each shot, independently. Each shot is a \"part\", and the target is hit if *at least one* shot lands, which is a parallel system:",
    },
    { type: "math", latex: "P(\\text{at least one hit in } n \\text{ shots}) = 1 - 0.7^{\\,n}" },
    {
      type: "text",
      content:
        "**Try it.** Slide until the output first passes $0.9$. How many shots does that take? Then find where it first passes $0.99$. The table and worked example 2 below confirm what you find.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "1 - 0.7^x",
        exprLatex: "1 - 0.7^{x}",
        min: 1,
        max: 20,
        step: 1,
        initial: 5,
        inputLabel: "Shots fired",
        outputLabel: "P(at least one hit)",
      },
    },
    {
      type: "table",
      headers: ["Shots $n$", "$0.7^n$ (all miss)", "$1 - 0.7^n$"],
      rows: [
        ["1", "0.7", "0.3"],
        ["2", "0.49", "0.51"],
        ["3", "0.343", "0.657"],
        ["5", "0.168", "0.832"],
        ["7", "0.082", "0.918"],
        ["10", "0.028", "0.972"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 2: how many shots?** What is the fewest shots that makes $P(\\text{at least one hit}) > 0.9$?\n\n1. We need $1 - 0.7^n > 0.9$, that is, $0.7^n < 0.1$.\n2. $0.7^6 \\approx 0.118$ is too big. $0.7^7 \\approx 0.082$ is small enough.\n3. So **7 shots**. The probability climbs towards 1 but never reaches it.\n\nFor $0.99$ we need $0.7^n < 0.01$: $0.7^{12} \\approx 0.0138$ is too big and $0.7^{13} \\approx 0.0097$ is small enough, so **13 shots**. Going from 90% to 99% sure costs almost as many extra shots again.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Three 50% chances do not make a certainty",
      content:
        "Adding them, $50\\% + 50\\% + 50\\% = 150\\%$, is impossible on its face. The additions overcount the cases where two or three succeed together. The honest calculation goes through failures: $1 - \\left(\\frac{1}{2}\\right)^3 = \\frac{7}{8}$. Redundancy helps a lot, but it only ever approaches certainty.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "1 - 0.5^x",
        exprLatex: "1 - \\left(\\tfrac{1}{2}\\right)^{x}",
        min: 1,
        max: 12,
        step: 1,
        initial: 3,
        inputLabel: "Independent 50% attempts",
        outputLabel: "P(at least one succeeds)",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 3: three students.** A problem is given to three students who work independently. They solve it with probabilities $\\frac{1}{2}$, $\\frac{1}{3}$ and $\\frac{1}{4}$. What is the probability that the problem gets solved?\n\n1. It stays unsolved only if all three fail: $\\frac{1}{2} \\cdot \\frac{2}{3} \\cdot \\frac{3}{4} = \\frac{6}{24} = \\frac{1}{4}$.\n2. $P(\\text{solved}) = 1 - \\frac{1}{4} = \\frac{3}{4}$.\n\n**Exactly one solves it:** add the three single-success cases, using complements for the others.\n$\\frac{1}{2}\\cdot\\frac{2}{3}\\cdot\\frac{3}{4} + \\frac{1}{2}\\cdot\\frac{1}{3}\\cdot\\frac{3}{4} + \\frac{1}{2}\\cdot\\frac{2}{3}\\cdot\\frac{1}{4} = \\frac{6}{24} + \\frac{3}{24} + \\frac{2}{24} = \\frac{11}{24}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (exam style, CBSE): contradicting witnesses.** A speaks the truth in 60% of cases and B in 90% of cases, independently. In what percentage of cases are they likely to **contradict** each other when stating the same fact?\n\n1. **Translate the words into events.** They contradict exactly when one tells the truth and the other lies. *Why:* on a yes/no fact, two truths agree and two lies also agree (both say the same false thing).\n2. **List the two separate cases**, each a product by independence:\n   - A true, B lies: $0.6 \\times 0.1 = 0.06$.\n   - A lies, B true: $0.4 \\times 0.9 = 0.36$.\n3. **Add**, since the two cases can't both happen:",
    },
    {
      type: "math",
      latex: "P(\\text{contradict}) = 0.6 \\times 0.1 + 0.4 \\times 0.9 = 0.06 + 0.36 = 0.42 = 42\\%",
    },
    {
      type: "text",
      content:
        "Check through the complement: they agree with $0.6 \\times 0.9 + 0.4 \\times 0.1 = 0.54 + 0.04 = 0.58$, and $0.42 + 0.58 = 1$. The trap is to answer $0.06$ or $0.36$ alone: \"exactly one\" always means adding every arrangement.",
    },
    {
      type: "text",
      content:
        "**Worked example 5: taking turns.** A and B throw a die alternately, A first. The first to throw a 6 wins. What is $P(\\text{A wins})$?\n\nWrite $p = \\frac{1}{6}$ for a six and $q = \\frac{5}{6}$ for anything else. The throws are independent.\n\n1. A can win on throw 1, 3, 5, and so on. To win on throw 3, both earlier throws must miss: $q \\cdot q \\cdot p$. To win on throw 5, four misses come first: $q^4 p$.\n2. These cases are mutually exclusive, so add them:\n$$P(\\text{A}) = p + q^2 p + q^4 p + \\cdots = \\frac{p}{1 - q^2},$$\na geometric series with ratio $q^2 < 1$.\n3. $P(\\text{A}) = \\dfrac{1/6}{1 - 25/36} = \\dfrac{1/6}{11/36} = \\dfrac{6}{11}$.\n\n**The restart argument** gets there without a series. Either A wins at once (probability $p$), or both miss (probability $q^2$), and then the game is exactly as it was at the start, with A to throw. So $P(\\text{A}) = p + q^2\\,P(\\text{A})$, which gives $P(\\text{A}) = \\frac{p}{1 - q^2} = \\frac{6}{11}$.\n\nCheck: $P(\\text{B}) = \\frac{5}{11}$. Going first is an advantage, but a small one, because a six is rare.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Signal words",
      content:
        "\"**At least one**\" → $1 - P(\\text{none})$.\n\"**All**\" or \"**every**\" → multiply the successes.\n\"**Exactly one**\" → add up the separate cases, each one a product.\nAll three shortcuts depend on independence. Check that it is stated or reasonable before you multiply.",
    },
    {
      type: "quiz",
      id: "pr2-5-q1",
      variant: "concept",
      question: "Three independent attempts each succeed with probability $\\frac{1}{2}$. What is $P(\\text{at least one succeeds})$?",
      options: [
        { text: "$\\dfrac{7}{8}$", correct: true, feedback: "All three fail with probability $\\frac{1}{8}$, so at least one succeeds with $\\frac{7}{8}$." },
        { text: "1, since $\\frac{1}{2} + \\frac{1}{2} + \\frac{1}{2} \\ge 1$.", feedback: "Adding overcounts the cases where several attempts succeed. Probabilities of overlapping events don't simply add." },
        { text: "$\\dfrac{1}{2}$", feedback: "Extra attempts do help; they just can't guarantee success." },
        { text: "$\\dfrac{3}{8}$", feedback: "That is exactly one success. 'At least one' also includes two and three." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-5-q2",
      variant: "practice",
      question: "A hits a target with probability $0.4$ and B with probability $0.5$, independently. Each fires once. What is $P(\\text{target is hit})$?",
      options: [
        { text: "$0.7$", correct: true, feedback: "Both miss with $0.6 \\times 0.5 = 0.3$, so the target is hit with $1 - 0.3 = 0.7$." },
        { text: "$0.9$", feedback: "Adding counts the 'both hit' case, $0.2$, twice." },
        { text: "$0.2$", feedback: "That is both hitting. The target only needs one." },
        { text: "$0.5$", feedback: "That is B alone." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-5-q3",
      variant: "practice",
      question: "Four components, each working with probability $0.95$, are connected in series. About how likely is the system to work?",
      options: [
        { text: "$0.815$", correct: true, feedback: "$0.95^4 \\approx 0.8145$. Every extra link in a series chain lowers reliability." },
        { text: "$0.95$", feedback: "In series every part must work, so the chance falls with each part added." },
        { text: "$0.99999375$", feedback: "That is the parallel answer, $1 - 0.05^4$." },
        { text: "$0.80$", feedback: "That subtracts $4 \\times 0.05$, which only approximates the product." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-5-q4",
      variant: "practice",
      question:
        "A village installs identical backup pumps in parallel. Each pump works with probability $0.6$, independently of the others. What is the least number of pumps that makes $P(\\text{water supply works}) > 0.99$?",
      options: [
        { text: "6", correct: true, feedback: "The supply fails only if every pump fails, so we need $0.4^n < 0.01$. $0.4^5 = 0.01024$ is just too big; $0.4^6 \\approx 0.0041$ works. So 6 pumps give $1 - 0.4^6 \\approx 0.996$." },
        { text: "5", feedback: "Close: $1 - 0.4^5 = 0.98976$, which falls just short of 0.99. Check the boundary case carefully." },
        { text: "2", feedback: "$0.6 + 0.6 = 1.2$ adds the pumps as if they could not both work. Parallel reliability goes through failures: $1 - 0.4^2 = 0.84$." },
        { text: "No finite number works.", feedback: "The reliability never reaches exactly 1, but it passes 0.99 after a handful of pumps, because the failure probability shrinks by a factor of 0.4 with each one." },
      ],
      hint: "Rewrite the condition through failures: $0.4^n < 0.01$.",
    },
    {
      type: "quiz",
      id: "pr2-5-q5",
      variant: "practice",
      question: "Three students solve a problem independently with probabilities $\\frac{1}{2}$, $\\frac{1}{3}$, $\\frac{1}{4}$. What is $P(\\text{exactly one solves it})$?",
      options: [
        { text: "$\\dfrac{11}{24}$", correct: true, feedback: "$\\frac{6}{24} + \\frac{3}{24} + \\frac{2}{24}$: each case has one success and two failures." },
        { text: "$\\dfrac{13}{12}$", feedback: "That adds $\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{4}$ and ignores that the other two must fail." },
        { text: "$\\dfrac{3}{4}$", feedback: "That is 'at least one'." },
        { text: "$\\dfrac{1}{24}$", feedback: "That is all three solving it." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-5-q7",
      variant: "practice",
      question: "A and B toss a fair coin alternately, A first. The first to get a head wins. What is $P(\\text{A wins})$?",
      options: [
        { text: "$\\dfrac{2}{3}$", correct: true, feedback: "$P(\\text{A}) = \\frac{1}{2} + \\frac{1}{4}\\cdot\\frac{1}{2} + \\cdots = \\frac{1/2}{1 - 1/4} = \\frac{2}{3}$. Or by restarting: $P = \\frac{1}{2} + \\frac{1}{4}P$." },
        { text: "$\\dfrac{1}{2}$", feedback: "That ignores who goes first. A gets the first chance, and wins half the time right there." },
        { text: "$\\dfrac{1}{3}$", feedback: "That is B's chance, $\\frac{1}{2}\\cdot\\frac{1}{2} + \\cdots = \\frac{1}{3}$." },
        { text: "$\\dfrac{5}{8}$", feedback: "That is $\\frac{1}{2} + \\frac{1}{8}$, only A's first two turns. The series keeps going." },
      ],
      hint: "A wins on toss 1, 3, 5, ... Before each of those, every earlier toss must be a tail.",
    },
    {
      type: "quiz",
      id: "pr2-5-q6",
      variant: "concept",
      question: "Why do we multiply *failure* probabilities for a parallel system?",
      options: [
        { text: "A parallel system fails only when every part fails, and independence lets us multiply those failures.", correct: true, feedback: "One product gives the single failure case; subtract it from 1." },
        { text: "Because failure probabilities are always smaller than success probabilities.", feedback: "That isn't generally true, and it isn't the reason." },
        { text: "Because the parts in a parallel system are mutually exclusive.", feedback: "Several parts can work at once. They are independent, not exclusive." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-5-q8",
      variant: "practice",
      question:
        "A server works only if its power unit $A$ works and at least one of two network cards $B$, $C$ (in parallel) works. Independently, $A$ works with probability $0.95$ and each card with probability $0.7$. What is $P(\\text{server works})$?",
      options: [
        { text: "$0.8645$", correct: true, feedback: "Card block: $1 - 0.3^2 = 0.91$. Then series with $A$: $0.95 \\times 0.91 = 0.8645$." },
        { text: "$0.4655$", feedback: "That is $0.95 \\times 0.7^2$, which puts the two cards in series. With backups, only one needs to work." },
        { text: "$0.99955$", feedback: "That is $1 - 0.05 \\times 0.09$, treating $A$ as a backup too. The server needs $A$." },
        { text: "$0.665$", feedback: "That is $0.95 \\times 0.7$, which ignores the second card." },
      ],
      hint: "Collapse the parallel block into one number, then multiply along the series chain.",
    },
    {
      type: "quiz",
      id: "pr2-5-q9",
      variant: "practice",
      question:
        "A speaks the truth with probability $\\frac{3}{4}$ and B with probability $\\frac{4}{5}$, independently. What is the probability that they contradict each other when stating the same fact?",
      options: [
        { text: "$\\dfrac{7}{20}$", correct: true, feedback: "$\\frac{3}{4}\\cdot\\frac{1}{5} + \\frac{1}{4}\\cdot\\frac{4}{5} = \\frac{3}{20} + \\frac{4}{20} = \\frac{7}{20}$." },
        { text: "$\\dfrac{13}{20}$", feedback: "That is the chance they **agree**: both truthful $\\frac{12}{20}$ plus both lying $\\frac{1}{20}$." },
        { text: "$\\dfrac{3}{20}$", feedback: "That is only A-true-B-lies. B-true-A-lies is a second way to contradict." },
        { text: "$\\dfrac{3}{5}$", feedback: "That is both telling the truth, which is an agreement." },
      ],
      hint: "Contradiction = exactly one of them lies. Add both arrangements.",
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "conditioning-traps",
  title: "2.6 · Conditioning Traps",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Conditional probability has one rule: **write down exactly which outcomes are still possible, then count**. The famous puzzles all catch people who skip that step and reason from a vague feeling that \"the other one is 50-50\". Here are two classics, each solved twice.",
    },
    {
      type: "text",
      content:
        "**The two-child problem.** A family has two children. Each child is a boy or a girl with probability $\\frac{1}{2}$, independently. Listing the elder child first, the sample space is\n\n$$S = \\{BB,\\ BG,\\ GB,\\ GG\\},$$\n\nwith each outcome having probability $\\frac{1}{4}$. Now compare two pieces of information.",
    },
    {
      type: "table",
      headers: ["What you are told", "Surviving outcomes", "P(both boys | info)"],
      rows: [
        ["The elder child is a boy", "$BB,\\ BG$", "$\\frac{1}{2}$"],
        ["At least one child is a boy", "$BB,\\ BG,\\ GB$", "$\\frac{1}{3}$"],
      ],
    },
    {
      type: "text",
      content:
        "\"At least one boy\" is **weaker** information than \"the elder is a boy\". It rules out only $GG$, so three outcomes survive. Two of those, $BG$ and $GB$, are mixed families. Being told there is a boy without being told *which* child he is leaves two ways for the other child to be a girl.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        stages: [
          { label: "Elder", branches: [{ label: "B" }, { label: "G" }] },
          { label: "Younger", branches: [{ label: "B" }, { label: "G" }] },
        ],
        format: "fraction",
        highlight: { label: "at least one boy", latex: "E", leaves: ["0.0", "0.1", "1.0"] },
        caption:
          "The event \"at least one boy\" is three leaves, total 3/4. BB is one of them, 1/4. So P(BB | at least one boy) = (1/4)/(3/4) = 1/3. Out of 1000 families, about 750 have a boy and about 250 of those have two.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "How you learned it matters",
      content:
        "Suppose instead that you meet one of the two children at random and it is a boy. Then $P(\\text{met a boy}) = \\frac{1}{2}$ and $P(BB \\text{ and met a boy}) = \\frac{1}{4}$, so $P(BB \\mid \\text{met a boy}) = \\frac{1}{2}$. The event you condition on is \"the child I happened to meet is a boy\", not \"there is at least one boy\". These are different events and they give different answers. Always write the conditioning event out precisely.",
    },
    {
      type: "text",
      content:
        "**Bertrand's box.** Three boxes each hold two coins: one has gold–gold (GG), one gold–silver (GS), one silver–silver (SS). You pick a box at random, take out one coin without looking, and it is gold. What is the probability that the other coin in the box is also gold?\n\nThe tempting argument goes: \"It is either the GG box or the GS box, so the answer is $\\frac{1}{2}$.\" That treats the two boxes as equally likely *given what you saw*. They are not.",
    },
    {
      type: "text",
      content:
        "**Solution 1: explicit sample space.** Label all six coins. Each is equally likely to be the one you pulled out. Three of them are gold: $G_1$ and $G_2$ from the GG box, and $G_3$ from the GS box. The partner of $G_1$ is gold, the partner of $G_2$ is gold, and the partner of $G_3$ is silver. So\n\n$$P(\\text{other is gold} \\mid \\text{drew gold}) = \\frac{2}{3}.$$\n\nThe GG box has two ways to show you gold; the GS box has only one.",
    },
    {
      type: "interactive",
      config: {
        component: "prob-tree-diagram",
        root: {
          label: "start",
          children: [
            { label: "GG", prob: 1 / 3, children: [{ label: "G", prob: 1 }] },
            {
              label: "GS",
              prob: 1 / 3,
              children: [
                { label: "G", prob: 1 / 2 },
                { label: "S", prob: 1 / 2 },
              ],
            },
            { label: "SS", prob: 1 / 3, children: [{ label: "S", prob: 1 }] },
          ],
        },
        format: "fraction",
        bayes: { observedLeaves: { matchLastStage: "G" }, observedLabel: "drew gold", population: 600 },
        caption:
          "Solution 2, the tree. The gold leaves are GG→G with 1/3 and GS→G with 1/6, a total of 1/2. The GG box's share is (1/3)/(1/2) = 2/3. Out of 600 plays, about 300 show gold, and about 200 of those come from the GG box.",
      },
    },
    {
      type: "math",
      latex:
        "P(GG \\mid \\text{gold}) = \\frac{P(GG)\\,P(\\text{gold} \\mid GG)}{P(\\text{gold})} = \\frac{\\frac{1}{3}\\cdot 1}{\\frac{1}{3}\\cdot 1 + \\frac{1}{3}\\cdot\\frac{1}{2}} = \\frac{1/3}{1/2} = \\frac{2}{3}",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (application): the trick coin.** A friend has two coins in his pocket: one fair, one with heads on both sides. He takes one out at random, tosses it, and it lands heads. What is the probability that it is the double-headed coin?\n\nThe tempting answer is $\\frac{1}{2}$: \"it's one of two coins\". Run the routine instead.\n\n1. **Full sample space with weights.** Coin choice first, then the toss: Fair→H $\\frac{1}{2}\\cdot\\frac{1}{2} = \\frac{1}{4}$, Fair→T $\\frac{1}{4}$, Double→H $\\frac{1}{2}\\cdot 1 = \\frac{1}{2}$. *Why:* the stages have different probabilities, so a tree (not a list of equally likely outcomes) is the honest picture.\n2. **The information as an event:** \"the toss showed heads\" = the two H leaves, total $\\frac{1}{4} + \\frac{1}{2} = \\frac{3}{4}$.\n3. **Divide the target's share by what survives:**",
    },
    {
      type: "math",
      latex:
        "P(\\text{double} \\mid H) = \\frac{P(\\text{double} \\cap H)}{P(H)} = \\frac{1/2}{3/4} = \\frac{2}{3}",
    },
    {
      type: "text",
      content:
        "This is Bertrand's box in disguise. The double-headed coin has two ways to show heads and the fair coin only one, so heads is evidence for the trick coin. Toss again and get heads a second time, and the evidence grows: the practice question below asks you to find how much.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: at least one six.** Two dice are rolled and you are told at least one shows a 6. What is the probability that both do?\n\n1. The cells with at least one 6 are the last row and last column of the grid: $6 + 6 - 1 = 11$ cells.\n2. Only $(6,6)$ has both, so the answer is $\\frac{1}{11}$.\n3. Compare \"the **first** die is a 6\", which leaves six cells and gives $\\frac{1}{6}$. As with the children, the vaguer statement gives the smaller answer.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (exam style): the ace of spades.** Two cards are dealt from a shuffled deck. Compare\n\n(a) $P(\\text{both aces} \\mid \\text{at least one ace})$ and (b) $P(\\text{both aces} \\mid \\text{one of them is the ace of spades})$.\n\nThe hands are unordered pairs, all $\\binom{52}{2} = 1326$ equally likely.\n\n1. **(a) Size the universe through its complement.** Hands with no ace: $\\binom{48}{2} = 1128$. So hands with at least one ace: $1326 - 1128 = 198$. *Why:* \"at least one\" is always easier via \"none\". Hands with two aces: $\\binom{4}{2} = 6$.",
    },
    {
      type: "math",
      latex: "P(\\text{both aces} \\mid \\text{at least one ace}) = \\frac{6}{198} = \\frac{1}{33}",
    },
    {
      type: "text",
      content:
        "2. **(b) A named card makes a different universe.** Hands containing the ace of spades: its partner is any of the other 51 cards, so 51 hands. Of those, the partner is an ace in 3. *Why:* conditioning on a **specific** card pins one card down and leaves the other free, just as \"the elder is a boy\" did.",
    },
    {
      type: "math",
      latex: "P(\\text{both aces} \\mid \\text{ace of spades held}) = \\frac{3}{51} = \\frac{1}{17}",
    },
    {
      type: "text",
      content:
        "Naming the suit nearly **doubles** the answer, from $\\frac{1}{33}$ to $\\frac{1}{17}$, even though it sounds like irrelevant detail. The reason is the same as in the two-child problem: \"at least one ace\" admits many one-ace hands (192 of them), while pinning down the ace of spades admits only 48 one-ace hands. The more specific the information, the fewer mixed outcomes survive.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "A routine that defeats every trap",
      content:
        "1. Write out the full sample space, with each outcome's probability. Use a tree if the stages differ.\n2. Write the information as a precise event, including *how* it was learned.\n3. Cross out everything outside that event.\n4. Divide the target's share by what survives. Don't trust any \"it's obviously 50-50\" shortcut until the count agrees.",
    },
    {
      type: "quiz",
      id: "pr2-6-q1",
      variant: "concept",
      question: "A family has two children, and at least one is a boy. What is the probability that both are boys?",
      options: [
        { text: "$\\dfrac{1}{3}$", correct: true, feedback: "The surviving outcomes are $BB$, $BG$ and $GB$, all equally likely, and one of them is $BB$." },
        { text: "$\\dfrac{1}{2}$, because the other child is equally likely to be either.", feedback: "That would be right if you knew *which* child is the boy. 'At least one' leaves two mixed outcomes, $BG$ and $GB$." },
        { text: "$\\dfrac{1}{4}$", feedback: "That is $P(BB)$ before any information. $GG$ has been ruled out." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-6-q2",
      variant: "practice",
      question: "In Bertrand's box, you draw a **silver** coin. What is the probability that the other coin is silver?",
      options: [
        { text: "$\\dfrac{2}{3}$", correct: true, feedback: "It is the mirror image of the gold case: three silver coins, two of them in the SS box." },
        { text: "$\\dfrac{1}{2}$", feedback: "The SS box has twice as many ways to show silver as the GS box." },
        { text: "$\\dfrac{1}{3}$", feedback: "That is $P(\\text{SS box})$ before you looked." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-6-q3",
      variant: "practice",
      question: "Two dice are rolled and at least one shows a 6. What is $P(\\text{both show } 6)$?",
      options: [
        { text: "$\\dfrac{1}{11}$", correct: true, feedback: "11 cells have at least one 6, and only $(6,6)$ has two." },
        { text: "$\\dfrac{1}{6}$", feedback: "That is the answer given that the *first* die is 6. 'At least one' is a larger set of 11 cells." },
        { text: "$\\dfrac{1}{36}$", feedback: "That ignores the information." },
        { text: "$\\dfrac{1}{12}$", feedback: "The row and column share $(6,6)$, so there are 11 cells, not 12." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-6-q4",
      variant: "practice",
      question: "A family has three children, and at least one is a girl. What is the probability that all three are girls?",
      options: [
        { text: "$\\dfrac{1}{7}$", correct: true, feedback: "Of the 8 equally likely outcomes, only $BBB$ is ruled out. $GGG$ is 1 of the 7 that remain." },
        { text: "$\\dfrac{1}{4}$", feedback: "That would be the answer if you knew a *particular* child was a girl." },
        { text: "$\\dfrac{1}{8}$", feedback: "That ignores the information." },
        { text: "$\\dfrac{1}{3}$", feedback: "$\\frac{1}{3}$ would come from treating \"number of girls\" (1, 2 or 3) as equally likely. It isn't: 1 girl and 2 girls each have 3 arrangements, while 3 girls has only 1. Of the 7 surviving outcomes, $GGG$ is 1." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-6-q5",
      variant: "concept",
      question:
        "A family has two children. You meet one of them, chosen at random, and he is a boy. Why is $P(\\text{both boys})$ now $\\frac{1}{2}$ rather than $\\frac{1}{3}$?",
      options: [
        { text: "The event is 'the child I met is a boy'. It has probability $\\frac{1}{2}$, and a $BB$ family always produces it, so the ratio is $\\frac{1/4}{1/2} = \\frac{1}{2}$.", correct: true, feedback: "Mixed families only show you a boy half the time. The way the information arrived changes the conditioning event." },
        { text: "Meeting a boy makes the family more likely to have boys in general.", feedback: "The biology hasn't changed; only the event you condition on has." },
        { text: "It isn't. The answer is still $\\frac{1}{3}$.", feedback: "Compute it: $P(BB \\cap \\text{met boy}) = \\frac{1}{4}$ and $P(\\text{met boy}) = \\frac{1}{2}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-6-q6",
      variant: "practice",
      question:
        "One of two coins, a fair one and a double-headed one, is picked at random and tossed **twice**. Both tosses show heads. What is the probability that it is the double-headed coin?",
      options: [
        { text: "$\\dfrac{4}{5}$", correct: true, feedback: "$P(HH) = \\frac{1}{2}\\cdot\\frac{1}{4} + \\frac{1}{2}\\cdot 1 = \\frac{5}{8}$, and the double coin's share is $\\frac{1/2}{5/8} = \\frac{4}{5}$." },
        { text: "$\\dfrac{2}{3}$", feedback: "That is the answer after **one** head. The second head is more evidence for the trick coin." },
        { text: "$\\dfrac{1}{2}$", feedback: "That is the chance before any toss. The heads you saw are information." },
        { text: "$\\dfrac{5}{8}$", feedback: "That is $P(HH)$, the size of the surviving universe, not the double coin's share of it." },
      ],
      hint: "The fair coin gives $HH$ with probability $\\frac{1}{4}$; the trick coin always does.",
    },
    {
      type: "quiz",
      id: "pr2-6-q7",
      variant: "practice",
      question: "Two cards are dealt from a shuffled deck, and at least one of them is a heart. What is the probability that both are hearts?",
      options: [
        { text: "$\\dfrac{2}{15}$", correct: true, feedback: "At least one heart: $\\binom{52}{2} - \\binom{39}{2} = 1326 - 741 = 585$ hands. Both hearts: $\\binom{13}{2} = 78$. So $\\frac{78}{585} = \\frac{2}{15}$." },
        { text: "$\\dfrac{4}{17}$", feedback: "That is $\\frac{12}{51}$, the answer if you knew a **particular** card (say the first dealt) was a heart. 'At least one' is weaker information." },
        { text: "$\\dfrac{1}{17}$", feedback: "That is $\\frac{78}{1326} = P(\\text{both hearts})$ with no information." },
        { text: "$\\dfrac{1}{4}$", feedback: "That treats the other card as an independent fresh draw. Count the surviving hands instead." },
      ],
      hint: "Count hands with no heart first, then subtract from $\\binom{52}{2}$.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-2-mastery",
  title: "2.7 · Chapter 2 Mastery",
  position: 7,
  blocks: blocks([
    {
      type: "text",
      content:
        "Mixed problems from the whole chapter. For each one, decide first **what the new universe is**, whether the stages are **independent**, and whether you need **and** (multiply) or **or** (add). Then compute.",
    },
    {
      type: "table",
      headers: ["Situation", "Tool"],
      rows: [
        ["Information given, counts known", "$P(A \\mid B) = \\frac{n(A\\cap B)}{n(B)}$"],
        ["Sequence of stages", "Multiply along: $P(A)P(B \\mid A)P(C \\mid A\\cap B)$"],
        ["Several routes to the same event", "Tree: add across the leaves"],
        ["Is the news irrelevant?", "Test $P(A\\cap B) = P(A)P(B)$"],
        ["At least one of several independent tries", "$1 - \\prod q_i$"],
        ["Players take turns until someone succeeds", "$P(\\text{first player}) = \\frac{p}{1 - q^2}$"],
      ],
    },
    {
      type: "quiz",
      id: "pr2-7-q1",
      variant: "mastery",
      question:
        "Of 200 people surveyed, 60 smoke, and 24 of those have a chronic cough. Of the 140 non-smokers, 21 have a chronic cough. A person with a chronic cough is picked at random. What is the probability that they smoke?",
      options: [
        { text: "$\\dfrac{8}{15}$", correct: true, feedback: "The cough column has $24 + 21 = 45$ people, and 24 of them smoke: $\\frac{24}{45} = \\frac{8}{15}$." },
        { text: "$\\dfrac{2}{5}$", feedback: "That is $P(\\text{cough} \\mid \\text{smoker}) = \\frac{24}{60}$, the reverse condition." },
        { text: "$\\dfrac{3}{25}$", feedback: "That is $\\frac{24}{200}$, the joint probability. Divide by the cough total." },
        { text: "$\\dfrac{9}{40}$", feedback: "That is $P(\\text{cough}) = \\frac{45}{200}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-7-q2",
      variant: "mastery",
      question: "A bag has 4 red and 6 green balls. Three are drawn one by one without replacement. What is $P(\\text{red, green, red in that order})$?",
      options: [
        { text: "$\\dfrac{1}{10}$", correct: true, feedback: "$\\frac{4}{10}\\cdot\\frac{6}{9}\\cdot\\frac{3}{8} = \\frac{72}{720} = \\frac{1}{10}$." },
        { text: "$\\dfrac{12}{125}$", feedback: "That is $0.4 \\times 0.6 \\times 0.4$, with replacement." },
        { text: "$\\dfrac{3}{10}$", feedback: "That is 'exactly two red' in any order. The question fixes the order." },
        { text: "$\\dfrac{2}{15}$", feedback: "Check the third factor: after one red and one green are gone, there are 3 red among 8 balls." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-7-q3",
      variant: "mastery",
      question: "$P(A) = \\frac{1}{2}$, $P(B) = \\frac{1}{3}$ and $P(A \\cup B) = \\frac{2}{3}$. Which is true?",
      options: [
        { text: "$A$ and $B$ are independent, since $P(A\\cap B) = \\frac{1}{6} = P(A)P(B)$.", correct: true, feedback: "$\\frac{1}{2} + \\frac{1}{3} - \\frac{2}{3} = \\frac{1}{6}$, which matches $\\frac{1}{2}\\cdot\\frac{1}{3}$." },
        { text: "$A$ and $B$ are mutually exclusive.", feedback: "Then $P(A \\cup B)$ would be $\\frac{5}{6}$." },
        { text: "$A$ and $B$ are dependent, since $P(A \\mid B) = \\frac{1}{3}$.", feedback: "$P(A \\mid B) = \\frac{1/6}{1/3} = \\frac{1}{2} = P(A)$." },
        { text: "There isn't enough information.", feedback: "The addition rule gives $P(A\\cap B)$, which is all the test needs." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-7-q4",
      variant: "mastery",
      question: "Three students solve a problem independently with probabilities $\\frac{1}{3}$, $\\frac{1}{4}$ and $\\frac{1}{5}$. What is the probability that the problem is solved?",
      options: [
        { text: "$\\dfrac{3}{5}$", correct: true, feedback: "All fail with $\\frac{2}{3}\\cdot\\frac{3}{4}\\cdot\\frac{4}{5} = \\frac{2}{5}$, so the problem is solved with $1 - \\frac{2}{5}$." },
        { text: "$\\dfrac{47}{60}$", feedback: "That adds the three probabilities, which overcounts the overlaps." },
        { text: "$\\dfrac{1}{60}$", feedback: "That is all three solving it." },
        { text: "$\\dfrac{2}{5}$", feedback: "That is the probability that it stays unsolved." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-7-q5",
      variant: "mastery",
      question: "Two dice are rolled and at least one shows a 6. What is $P(\\text{sum} \\ge 10)$?",
      options: [
        { text: "$\\dfrac{5}{11}$", correct: true, feedback: "11 cells have a 6. Of those, $(4,6), (6,4), (5,6), (6,5), (6,6)$ have sum at least 10." },
        { text: "$\\dfrac{1}{6}$", feedback: "That is $P(\\text{sum} \\ge 10)$ with no information: 6 of 36 cells." },
        { text: "$\\dfrac{5}{12}$", feedback: "The row and column of sixes share $(6,6)$, so the universe has 11 cells, not 12." },
        { text: "$\\dfrac{5}{36}$", feedback: "That is the joint probability. Divide by $P(\\text{at least one } 6) = \\frac{11}{36}$." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-7-q6",
      variant: "mastery",
      question: "$A$ and $B$ are independent with $P(A) = 0.3$ and $P(B) = 0.6$. What is $P(\\text{exactly one of } A, B)$?",
      options: [
        { text: "$0.54$", correct: true, feedback: "$P(A\\cap B') + P(A'\\cap B) = 0.3\\cdot 0.4 + 0.7 \\cdot 0.6 = 0.12 + 0.42$." },
        { text: "$0.72$", feedback: "That is $P(A \\cup B)$, which also includes both happening ($0.18$)." },
        { text: "$0.9$", feedback: "Adding $P(A) + P(B)$ counts 'both' twice and doesn't exclude it." },
        { text: "$0.18$", feedback: "That is both happening." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-7-q7",
      variant: "mastery",
      question: "Each missile hits a target with probability $0.75$, independently. What is the fewest missiles needed so that $P(\\text{at least one hit}) \\ge 0.99$?",
      options: [
        { text: "4", correct: true, feedback: "$0.25^3 \\approx 0.0156$ is too big, and $0.25^4 \\approx 0.0039 \\le 0.01$." },
        { text: "3", feedback: "$1 - 0.25^3 \\approx 0.984$, which is just short of $0.99$." },
        { text: "2", feedback: "$1 - 0.0625 = 0.9375$." },
        { text: "100", feedback: "The failure probability shrinks by a factor of 4 with each missile, so far fewer are needed." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-7-q8",
      variant: "mastery",
      question: "$P(A) = 0.2$, $P(B) = 0.5$ and $P(A \\mid B) = 0.3$. Find $P(B \\mid A)$.",
      options: [
        { text: "$0.75$", correct: true, feedback: "$P(A\\cap B) = 0.5 \\times 0.3 = 0.15$, so $P(B \\mid A) = \\frac{0.15}{0.2} = 0.75$." },
        { text: "$0.3$", feedback: "Conditional probability isn't symmetric. Divide the overlap by $P(A)$." },
        { text: "$0.15$", feedback: "That is $P(A \\cap B)$." },
        { text: "$0.5$", feedback: "That is $P(B)$. The events are not independent, since $P(A \\mid B) \\ne P(A)$." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-7-q9",
      variant: "mastery",
      question: "$A$ and $B$ both have positive probability. Can they be both independent and mutually exclusive?",
      options: [
        { text: "No. Exclusive means $P(A \\cap B) = 0$, but independence would need it to equal $P(A)P(B) > 0$.", correct: true, feedback: "Exclusive events with positive probability are always dependent." },
        { text: "Yes. Both words mean the events don't affect each other.", feedback: "Exclusive events affect each other completely: one happening rules out the other." },
        { text: "Only if $P(A) + P(B) = 1$.", feedback: "Even then $P(A)P(B) > 0 = P(A \\cap B)$." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-7-q10",
      variant: "mastery",
      question: "$A$ and $B$ are independent. Which line correctly proves that $A'$ and $B$ are independent?",
      options: [
        {
          text: "$P(A' \\cap B) = P(B) - P(A \\cap B) = P(B) - P(A)P(B) = \\bigl(1 - P(A)\\bigr)P(B) = P(A')P(B)$.",
          correct: true,
          feedback: "$B$ splits into the part inside $A$ and the part outside it. Independence is used exactly once, to replace $P(A \\cap B)$ by $P(A)P(B)$.",
        },
        { text: "$P(A' \\cup B) = P(A') + P(B)$, so the events are independent.", feedback: "That is the addition rule for **exclusive** events, and $A'$ and $B$ need not be exclusive. Independence is about $P(A' \\cap B)$, not the union." },
        { text: "$A'$ and $B$ don't overlap, so $P(A' \\cap B) = 0 = P(A')P(B)$.", feedback: "$A'$ and $B$ can overlap, and $P(A')P(B)$ is usually positive. This mixes up independence and exclusivity." },
        { text: "$P(A' \\cap B) = 1 - P(A \\cap B) = 1 - P(A)P(B)$.", feedback: "$1 - P(A \\cap B)$ is $P\\bigl((A \\cap B)'\\bigr)$, 'not both', which is a different event from $A' \\cap B$." },
      ],
    },
    {
      type: "quiz",
      id: "pr2-7-q11",
      variant: "mastery",
      question: "A bag has 3 red and 5 blue balls. Two are drawn without replacement. What is $P(\\text{the two balls are different colours})$?",
      options: [
        { text: "$\\dfrac{15}{28}$", correct: true, feedback: "Two leaves of the tree: RB is $\\frac{3}{8}\\cdot\\frac{5}{7} = \\frac{15}{56}$, and BR is $\\frac{5}{8}\\cdot\\frac{3}{7} = \\frac{15}{56}$. Add across: $\\frac{30}{56} = \\frac{15}{28}$." },
        { text: "$\\dfrac{15}{56}$", feedback: "That is only one order, red then blue. Blue then red is a second leaf of the tree." },
        { text: "$\\dfrac{15}{32}$", feedback: "That is $2 \\cdot \\frac{3}{8} \\cdot \\frac{5}{8}$, with replacement. The second draw sees a bag of 7." },
        { text: "$\\dfrac{1}{2}$", feedback: "Two colours don't make a 50-50 chance. Draw the tree and add the two mixed leaves." },
      ],
      hint: "Draw the two-stage tree and add every leaf with one ball of each colour.",
    },
    {
      type: "quiz",
      id: "pr2-7-q12",
      variant: "mastery",
      question: "A and B take turns drawing a card from a shuffled deck, **replacing** it and reshuffling each time. A goes first, and the first to draw an ace wins. What is $P(\\text{A wins})$?",
      options: [
        { text: "$\\dfrac{13}{25}$", correct: true, feedback: "$p = \\frac{1}{13}$, $q = \\frac{12}{13}$. $P(\\text{A}) = \\frac{p}{1 - q^2} = \\frac{1/13}{25/169} = \\frac{13}{25}$." },
        { text: "$\\dfrac{12}{25}$", feedback: "That is B's chance, $q \\cdot \\frac{13}{25}$." },
        { text: "$\\dfrac{1}{2}$", feedback: "Going first gives A a small edge: A has a chance to win before B has thrown at all." },
        { text: "$\\dfrac{1}{13}$", feedback: "That is A winning on the very first draw. A can also win on draw 3, 5, and so on." },
      ],
      hint: "Use the restart argument: $P(\\text{A}) = p + q^2\\,P(\\text{A})$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "The trees in this chapter ran forwards: from a cause to what we see. Chapter 3 runs them backwards. If you see a red ball, a positive test or a gold coin, which cause produced it? That is Bayes' theorem, and you have already used it once, in Bertrand's box.",
    },
  ]),
};

export const probabilityChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
