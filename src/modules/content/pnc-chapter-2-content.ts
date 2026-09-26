import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Permutations, Combinations & the Binomial Theorem Chapter 2 — Combinations:
 * Choosing Things. A selection is an arrangement with the order forgotten, so
 * nCr = nPr / r!. Identities are proved by counting one set two ways, then
 * the toolkit is applied to committees, choose-then-arrange problems,
 * geometry counts and all-possible-selections (subsets, identical items,
 * divisors).
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "from-arrangements-to-selections",
  title: "2.1 · From Arrangements to Selections",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pc-2-combinations.mp4",
      poster: "/videos/pc-2-combinations.jpg",
      title: "Chapter 2 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Four friends — Asha, Ben, Chitra and Dev — want to send two of them to buy snacks. How many different pairs could go?\n\nChapter 1 taught you to fill slots: the first person can be any of 4, the second any of the remaining 3, so $4 \\times 3 = 12$. But that answer is too big. \"Asha then Ben\" and \"Ben then Asha\" are the same snack run: the same two people walk out of the door. The slot method counted every pair **twice**.",
    },
    {
      type: "text",
      content:
        "That is the whole chapter in one observation. An **arrangement** cares about order: first, second, third. A **selection** only cares about *who is in*. Every selection hides several arrangements inside it, and if we know how many, we can divide them out.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "B", "C", "D"],
        r: 2,
        groupBy: "selection",
        showSlots: true,
        caption:
          "All 12 ordered pairs, coloured by which two people they contain. Switch to 'Grouped': every colour appears exactly twice (AB and BA), so 12 ÷ 2 = 6 selections.",
      },
    },
    {
      type: "text",
      content:
        "Why exactly twice? Because once the two people are chosen, there are $2! = 2$ ways to put them in order. Now try three people out of five. Each group of three, say $\\{A, B, C\\}$, can be written in $3! = 6$ orders: ABC, ACB, BAC, BCA, CAB, CBA. So the $5 \\times 4 \\times 3 = 60$ arrangements collapse into $60 \\div 6 = 10$ selections.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "B", "C", "D", "E"],
        r: 3,
        groupBy: "selection",
        showSlots: true,
        caption:
          "60 ordered triples, 10 colours, each colour 6 times. Tap any triple to light up its 3! = 6 re-orderings.",
      },
    },
    {
      type: "text",
      content:
        "The general argument is a *count-two-ways*. Count the arrangements of $r$ things taken from $n$ in two stages: first **choose** which $r$ things (call the number of ways $^nC_r$), then **arrange** the chosen ones in the $r$ slots ($r!$ ways). That must equal the direct count $^nP_r$:",
    },
    { type: "math", latex: "{}^nP_r = {}^nC_r \\times r! \\qquad\\Longrightarrow\\qquad {}^nC_r = \\frac{{}^nP_r}{r!} = \\frac{n!}{r!\\,(n-r)!}" },
    {
      type: "callout",
      variant: "definition",
      title: "Combinations",
      content:
        "The number of ways to **select** $r$ objects from $n$ distinct objects, with order irrelevant, is",
    },
    { type: "math", latex: "{}^nC_r = \\binom{n}{r} = \\frac{n!}{r!\\,(n-r)!}, \\qquad 0 \\le r \\le n" },
    {
      type: "text",
      content: "Read $\\binom{n}{r}$ as \"$n$ choose $r$\". Both notations mean the same number.",
    },
    {
      type: "text",
      content:
        "In practice, never compute the full factorials. Cancel $(n-r)!$ first, and you are left with $r$ falling factors on top and $r!$ below:",
    },
    { type: "math", latex: "{}^{10}C_3 = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = \\frac{720}{6} = 120" },
    {
      type: "text",
      content:
        "**Edge cases, derived rather than memorised.**\n\n$^nC_0 = 1$: there is exactly one way to choose nothing — the empty selection. The formula agrees because $0! = 1$.\n\n$^nC_n = 1$: there is one way to take everything.\n\n$^nC_1 = n$: choosing one item is just picking which one.\n\nIf $r > n$ there is no way to choose, so ${}^nC_r = 0$ (and likewise ${}^nC_r = 0$ for $r < 0$). Some exam questions lean on this convention.",
    },
    {
      type: "table",
      headers: ["$r$", "0", "1", "2", "3", "4", "5"],
      rows: [
        ["$^5P_r$ (ordered)", "1", "5", "20", "60", "120", "120"],
        ["$r!$ (orders per group)", "1", "1", "2", "6", "24", "120"],
        ["$^5C_r$ (selections)", "1", "5", "10", "10", "5", "1"],
      ],
    },
    {
      type: "text",
      content:
        "Look along the last row: 1, 5, 10, 10, 5, 1. It reads the same forwards and backwards. That is not a coincidence, and the next lesson explains it with one sentence.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — handshakes.** Twelve people at a party each shake hands once with everyone else. How many handshakes?\n\n1. A handshake is fixed by *which two people* are involved. \"Priya shakes Rahul\" is the same handshake as \"Rahul shakes Priya\", so order does not matter.\n2. Count: $^{12}C_2 = \\frac{12 \\times 11}{2} = 66$.\n3. Sanity check the slot method: $12 \\times 11 = 132$ counts each handshake from both ends, and $132 \\div 2 = 66$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — a quiz team.** A class has 8 students. How many 3-person quiz teams can be formed? And how many ways to choose a team *leader, speaker and scribe*?\n\n1. A team is a set: $^8C_3 = \\frac{8 \\times 7 \\times 6}{6} = 56$.\n2. Leader, speaker, scribe are three **different jobs**. Swapping who is leader and who is scribe gives a different outcome, so order matters: $^8P_3 = 8 \\times 7 \\times 6 = 336$.\n3. Check: $56 \\times 3! = 336$. Every team can hand out its three jobs in $3! = 6$ ways.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — a football league.** Ten clubs play a league. (a) If every pair of clubs meets **once**, how many matches are there? (b) If every pair meets twice, **home and away**, how many?\n\n1. (a) A single match is fixed by which two clubs play. Mumbai vs Pune is the same match as Pune vs Mumbai. *Why this step:* apply the swap test — swapping the two clubs gives the same fixture, so this is a selection.",
    },
    { type: "math", latex: "{}^{10}C_2 = \\frac{10 \\times 9}{2} = 45 \\text{ matches}" },
    {
      type: "text",
      content:
        "2. (b) Now \"Mumbai at home to Pune\" and \"Pune at home to Mumbai\" are different fixtures. *Why this step:* the host is a role, and roles make order matter.",
    },
    { type: "math", latex: "{}^{10}P_2 = 10 \\times 9 = 90 = 2 \\times {}^{10}C_2 \\text{ matches}" },
    {
      type: "text",
      content:
        "3. *Check:* each pair of clubs plays exactly twice, so the answer to (b) must be double the answer to (a). It is.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — recover $n$ and $r$ (CBSE / JEE).** If $^nP_r = 840$ and $^nC_r = 35$, find $n$ and $r$.\n\n1. Divide the two facts. *Why this step:* $^nP_r = {}^nC_r \\times r!$, so the ratio isolates $r!$ and gets rid of $n$ entirely.",
    },
    { type: "math", latex: "r! = \\frac{{}^nP_r}{{}^nC_r} = \\frac{840}{35} = 24 = 4! \\quad\\Longrightarrow\\quad r = 4" },
    {
      type: "text",
      content:
        "2. Now $^nP_4 = n(n-1)(n-2)(n-3) = 840$. *Why this step:* with $r$ known, $^nP_r$ is a product of $r$ consecutive integers, and we just need to spot which four multiply to 840.",
    },
    { type: "math", latex: "840 = 7 \\times 6 \\times 5 \\times 4 \\quad\\Longrightarrow\\quad n = 7" },
    {
      type: "text",
      content:
        "3. *Check:* $^7C_4 = {}^7C_3 = \\frac{7 \\times 6 \\times 5}{6} = 35$. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"captain and vice-captain is a combination\"",
      content:
        "It feels like choosing two players from a squad, so students reach for $^{11}C_2 = 55$. But the two chosen people get **different roles**. (Kohli captain, Rohit vice) and (Rohit captain, Kohli vice) are different outcomes. Roles are positions, and positions make order matter: the answer is $^{11}P_2 = 11 \\times 10 = 110$.\n\nThe test to apply every time: *if I swap two of the chosen things, do I get a different outcome?* Yes → arrangement ($P$). No → selection ($C$).",
    },
    {
      type: "quiz",
      id: "pc2-1-q1",
      variant: "concept",
      question: "From 11 players, a captain and a vice-captain are chosen. How many ways?",
      options: [
        { text: "110", correct: true, feedback: "Right. The two roles are different, so swapping the two people gives a new outcome: $11 \\times 10 = 110$." },
        { text: "55", feedback: "That is $^{11}C_2$, the number of *pairs*. Each pair can be assigned the two roles in 2 ways, so this undercounts by a factor of 2." },
        { text: "121", feedback: "$11^2$ allows the same player to be both captain and vice-captain." },
        { text: "22", feedback: "That adds 11 + 11. Two successive choices multiply; they do not add." },
      ],
      hint: "Swap the captain and the vice-captain. Is it the same outcome?",
    },
    {
      type: "quiz",
      id: "pc2-1-q2",
      variant: "practice",
      question: "Evaluate $^{9}C_4$.",
      options: [
        { text: "126", correct: true, feedback: "$\\frac{9 \\times 8 \\times 7 \\times 6}{24} = \\frac{3024}{24} = 126$." },
        { text: "3024", feedback: "That is $^9P_4$. You still need to divide by $4! = 24$, the number of orders of each group." },
        { text: "84", feedback: "That is $^9C_3$. Check how many factors belong on top." },
        { text: "36", feedback: "That is $^9C_2$." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-1-q3",
      variant: "practice",
      question: "Twenty points lie on a circle. How many chords join pairs of them?",
      options: [
        { text: "190", correct: true, feedback: "A chord is fixed by its two endpoints, unordered: $^{20}C_2 = \\frac{20 \\times 19}{2} = 190$." },
        { text: "380", feedback: "That is $20 \\times 19$, which counts the chord from P to Q and from Q to P separately." },
        { text: "400", feedback: "$20^2$ includes a 'chord' from a point to itself and counts each chord twice." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-1-q4",
      variant: "concept",
      question: "Which of these is counted by a **combination**, not a permutation?",
      options: [
        { text: "Choosing 3 toppings for a pizza from 10.", correct: true, feedback: "Onion-corn-paneer is the same pizza as paneer-corn-onion. Only the set matters: $^{10}C_3 = 120$." },
        { text: "Forming a 3-digit PIN from 10 digits without repeats.", feedback: "1-2-3 and 3-2-1 open different locks. Order matters." },
        { text: "Awarding gold, silver and bronze among 10 runners.", feedback: "The medals are different roles, so order matters." },
        { text: "Seating 3 guests in 3 of 10 numbered chairs.", feedback: "Numbered chairs are positions. Swapping two guests changes the seating." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-1-q5",
      variant: "concept",
      question: "For fixed $n$ and $r \\ge 2$, how do $^nP_r$ and $^nC_r$ compare?",
      options: [
        { text: "$^nP_r = r! \\cdot {}^nC_r$, so $^nP_r$ is always the bigger one.", correct: true, feedback: "Each selection produces $r!$ arrangements, so arrangements outnumber selections by exactly that factor." },
        { text: "$^nC_r$ is bigger because choosing is more general than arranging.", feedback: "It is the other way round. Forgetting order *merges* outcomes, so there are fewer selections." },
        { text: "They are equal, since they use the same $n$ objects.", feedback: "They agree only for $r = 0$ or $r = 1$, where $r! = 1$." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-1-q6",
      variant: "practice",
      question: "If $^nP_r = 720$ and $^nC_r = 120$, find $n$ and $r$.",
      options: [
        { text: "$n = 10,\\ r = 3$", correct: true, feedback: "$r! = 720 \\div 120 = 6$, so $r = 3$. Then $n(n-1)(n-2) = 720 = 10 \\times 9 \\times 8$, so $n = 10$. Check: $^{10}C_3 = 120$." },
        { text: "$n = 6,\\ r = 3$", feedback: "The ratio $720 \\div 120 = 6$ is $r!$, not $n$. With $r = 3$ you still need three consecutive integers multiplying to 720." },
        { text: "$n = 10,\\ r = 6$", feedback: "$r! = 6$ means $r = 3$, not $r = 6$ (that would need $r! = 720$)." },
        { text: "$n = 9,\\ r = 3$", feedback: "$9 \\times 8 \\times 7 = 504$, not 720. Try $10 \\times 9 \\times 8$." },
      ],
      hint: "Divide: $^nP_r \\div {}^nC_r = r!$.",
    },
    {
      type: "quiz",
      id: "pc2-1-q7",
      variant: "practice",
      question: "Twelve teams play a league in which every pair of teams meets twice, once at each team's home ground. How many matches are played?",
      options: [
        { text: "132", correct: true, feedback: "The host is a role, so order matters: $^{12}P_2 = 12 \\times 11 = 132$. Equivalently $2 \\times {}^{12}C_2 = 2 \\times 66$." },
        { text: "66", feedback: "That is $^{12}C_2$, one match per pair. Each pair plays twice." },
        { text: "144", feedback: "$12^2$ includes a team playing itself." },
        { text: "264", feedback: "That doubles $^{12}P_2$. The ordered pair (home, away) already counts both fixtures of a pair." },
      ],
      hint: "Does \"A at home to B\" differ from \"B at home to A\"?",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "ncr-identities",
  title: "2.2 · Identities by Counting",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "You could prove every identity in this lesson by pushing factorials around. But there is a cleaner method, and it tells you *why* the identity is true: **count the same collection in two different ways.** Both counts are correct, so they must be equal. Each identity below gets a counting proof first, then an algebra check.",
    },
    {
      type: "text",
      content:
        "**Identity 1 — Symmetry.** A class has 10 students and 8 go on a trip. Choosing the 8 who go is the same act as choosing the 2 who stay behind: every choice of the goers fixes the stayers and vice versa. So the two counts match:",
    },
    { type: "math", latex: "{}^nC_r = {}^nC_{n-r}" },
    {
      type: "text",
      content:
        "*Algebra check:* swap $r$ and $n - r$ in $\\frac{n!}{r!\\,(n-r)!}$ — the denominator is the same product written in the other order.\n\n*Use it:* $^{20}C_{18}$ looks like 18 factors of work but is $^{20}C_2 = \\frac{20 \\times 19}{2} = 190$. Always pick the smaller of $r$ and $n - r$.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "highlight",
        pattern: "symmetry",
        rows: 10,
        initialCell: { n: 7, r: 2 },
        caption:
          "Row n of this triangle lists nC0, nC1, …, nCn. Pick any entry: its mirror image across the centre line is the same number. Choosing who is in = choosing who is out.",
      },
    },
    {
      type: "text",
      content:
        "**Identity 2 — Pascal's rule.** How many committees of $r$ can be chosen from $n + 1$ people? Directly: $^{n+1}C_r$. Now single out one person, say Meera, and split on a yes/no question: **is Meera on the committee?**\n\n- **Meera is in.** The other $r - 1$ members come from the remaining $n$ people: $^nC_{r-1}$ ways.\n- **Meera is out.** All $r$ members come from the other $n$: $^nC_r$ ways.\n\nThe two cases do not overlap and cover everything, so by the sum rule:",
    },
    { type: "math", latex: "{}^nC_r + {}^nC_{r-1} = {}^{n+1}C_r \\qquad (1 \\le r \\le n)" },
    {
      type: "text",
      content:
        "*Algebra check:* put the two fractions over the common denominator $r!\\,(n - r + 1)!$:",
    },
    {
      type: "math",
      latex:
        "\\frac{n!}{r!\\,(n-r)!} + \\frac{n!}{(r-1)!\\,(n-r+1)!} = \\frac{n!\\,\\bigl[(n-r+1) + r\\bigr]}{r!\\,(n-r+1)!} = \\frac{(n+1)!}{r!\\,(n+1-r)!} = {}^{n+1}C_r",
    },
    {
      type: "text",
      content:
        "*Number check:* $^5C_2 + {}^5C_1 = 10 + 5 = 15 = {}^6C_2$. In the triangle above, every entry is the sum of the two just above it — that is Pascal's rule drawn. Chapter 4 builds the whole binomial theorem on it.",
    },
    {
      type: "text",
      content:
        "**Worked example — a club working group (application).** A club has 15 members, one of whom is the treasurer, Kavya. A 6-member working group is to be chosen. Count the groups directly, then again by splitting on Kavya.\n\n1. Directly. *Why this step:* with no restriction this is a plain selection of 6 from 15.",
    },
    { type: "math", latex: "{}^{15}C_6 = \\frac{15 \\times 14 \\times 13 \\times 12 \\times 11 \\times 10}{720} = \\frac{3\\,603\\,600}{720} = 5005" },
    {
      type: "text",
      content:
        "2. Split on the yes/no question \"is Kavya in?\". *Why this step:* every group falls in exactly one of the two cases, so the sum rule applies.\n\n- Kavya in: the other 5 come from the remaining 14, ${}^{14}C_5 = 2002$.\n- Kavya out: all 6 come from the other 14, ${}^{14}C_6 = 3003$.",
    },
    { type: "math", latex: "{}^{14}C_5 + {}^{14}C_6 = 2002 + 3003 = 5005 = {}^{15}C_6" },
    {
      type: "text",
      content:
        "3. *Check:* the two routes agree, which is Pascal's rule with $n = 14$, $r = 6$. The split is also useful on its own: if the question asks only for groups that include the treasurer, the answer is the first case, 2002.",
    },
    {
      type: "text",
      content:
        "**Identity 3 — Committee with a chair.** From $n$ people, form a committee of $r$ and name one member as chair. Count this two ways.\n\n- **Committee first:** choose the $r$ members ($^nC_r$), then choose the chair from among them ($r$ ways). Total $r \\cdot {}^nC_r$.\n- **Chair first:** choose the chair from everyone ($n$ ways), then the other $r - 1$ members from the remaining $n - 1$ ($^{n-1}C_{r-1}$). Total $n \\cdot {}^{n-1}C_{r-1}$.",
    },
    { type: "math", latex: "r \\cdot {}^nC_r = n \\cdot {}^{n-1}C_{r-1} \\qquad\\text{equivalently}\\qquad {}^nC_r = \\frac{n}{r}\\,{}^{n-1}C_{r-1}" },
    {
      type: "text",
      content:
        "*Algebra check:* $r \\cdot \\frac{n!}{r!\\,(n-r)!} = \\frac{n!}{(r-1)!\\,(n-r)!} = n \\cdot \\frac{(n-1)!}{(r-1)!\\,(n-r)!}$.\n\n*Number check* with $n = 5$, $r = 3$: $3 \\times 10 = 30$ and $5 \\times {}^4C_2 = 5 \\times 6 = 30$. This identity returns in Chapter 5, where it turns $\\sum r\\,{}^nC_r$ into $n\\,2^{n-1}$ without calculus.",
    },
    {
      type: "text",
      content:
        "A close cousin compares neighbours in the same row. Dividing the formulas,",
    },
    { type: "math", latex: "\\frac{{}^nC_r}{{}^nC_{r-1}} = \\frac{n - r + 1}{r}" },
    {
      type: "text",
      content:
        "So the row grows while $n - r + 1 > r$, i.e. while $r < \\frac{n+1}{2}$, and shrinks after that. That is why the biggest entries sit in the middle of each row.",
    },
    {
      type: "text",
      content:
        "**Worked example — three neighbours in a row (JEE).** Three consecutive entries of some row are ${}^nC_{r-1} = 36$, ${}^nC_r = 84$ and ${}^nC_{r+1} = 126$. Find $n$ and $r$.\n\n1. Divide the first two. *Why this step:* the neighbour ratio cancels all the factorials and leaves a linear equation in $n$ and $r$.",
    },
    { type: "math", latex: "\\frac{{}^nC_r}{{}^nC_{r-1}} = \\frac{n-r+1}{r} = \\frac{84}{36} = \\frac{7}{3} \\quad\\Longrightarrow\\quad 3n + 3 = 10r" },
    {
      type: "text",
      content:
        "2. Divide the next two, using the same ratio with $r$ replaced by $r + 1$. *Why this step:* two unknowns need two equations.",
    },
    { type: "math", latex: "\\frac{{}^nC_{r+1}}{{}^nC_r} = \\frac{n-r}{r+1} = \\frac{126}{84} = \\frac{3}{2} \\quad\\Longrightarrow\\quad 2n = 5r + 3" },
    {
      type: "text",
      content:
        "3. Solve. From step 1, $n = \\frac{10r - 3}{3}$. Substituting, $\\frac{2(10r-3)}{3} = 5r + 3$, so $20r - 6 = 15r + 9$, giving $r = 3$ and $n = 9$.\n\n4. *Check:* ${}^9C_2 = 36$, ${}^9C_3 = 84$, ${}^9C_4 = 126$. ✓",
    },
    {
      type: "text",
      content:
        "**Identity 4 — When two combinations are equal.** The ratio above shows each row strictly increases until the middle and strictly decreases after it, so apart from mirror pairs no value repeats. A value can appear at most twice, at positions $a$ and $n - a$:",
    },
    { type: "math", latex: "{}^nC_a = {}^nC_b \\quad\\Longrightarrow\\quad a = b \\ \\text{ or } \\ a + b = n" },
    {
      type: "text",
      content:
        "**Worked example 1.** If $^nC_8 = {}^nC_6$, find $^nC_2$.\n\n1. $8 \\ne 6$, so the second option must hold: $8 + 6 = n$, giving $n = 14$.\n2. $^{14}C_2 = \\frac{14 \\times 13}{2} = 91$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** If $^{18}C_r = {}^{18}C_{r+2}$, find $^rC_5$.\n\n1. $r \\ne r + 2$, so $r + (r + 2) = 18$, giving $r = 8$.\n2. $^8C_5 = {}^8C_3 = \\frac{8 \\times 7 \\times 6}{6} = 56$ — symmetry saved two factors of work.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — Pascal twice.** Simplify $^nC_r + 2\\,{}^nC_{r-1} + {}^nC_{r-2}$.\n\n1. Split the middle term: $\\bigl({}^nC_r + {}^nC_{r-1}\\bigr) + \\bigl({}^nC_{r-1} + {}^nC_{r-2}\\bigr)$.\n2. Pascal on each bracket: $^{n+1}C_r + {}^{n+1}C_{r-1}$.\n3. Pascal again: $^{n+2}C_r$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The counting-proof recipe",
      content:
        "1. Invent a concrete collection (committees, teams, paths) whose size is one side of the identity.\n2. Find a second way to build the same collection — usually by singling out one special person, or by doing the choices in a different order.\n3. Both counts are correct, so they are equal. Then check with algebra and one small number case.",
    },
    {
      type: "quiz",
      id: "pc2-2-q1",
      variant: "practice",
      question: "Evaluate $^{20}C_{17}$.",
      options: [
        { text: "1140", correct: true, feedback: "$^{20}C_{17} = {}^{20}C_3 = \\frac{20 \\times 19 \\times 18}{6} = 1140$." },
        { text: "6840", feedback: "That is $20 \\times 19 \\times 18$ — you forgot to divide by $3! = 6$." },
        { text: "190", feedback: "That is $^{20}C_2$. Here $n - r = 3$, not 2." },
        { text: "380", feedback: "That is $20 \\times 19$. Use symmetry to reduce to $^{20}C_3$." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-2-q2",
      variant: "concept",
      question: "Which sentence proves $^{10}C_3 = {}^{10}C_7$ by counting?",
      options: [
        { text: "Choosing the 3 people who are picked is the same as choosing the 7 who are left out.", correct: true, feedback: "Each picked group fixes exactly one left-out group, so the two collections have the same size." },
        { text: "Both are equal to $10!$ divided by something.", feedback: "True of every combination, but it doesn't show these two are equal." },
        { text: "3 and 7 are both odd.", feedback: "Parity has nothing to do with it; $^{10}C_3 = {}^{10}C_7$ because $3 + 7 = 10$." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-2-q3",
      variant: "practice",
      question: "$^{7}C_3 + {}^{7}C_4 = \\;?$",
      options: [
        { text: "$^8C_4 = 70$", correct: true, feedback: "Pascal's rule with $n = 7$, $r = 4$: $^7C_4 + {}^7C_3 = {}^8C_4$. Check: $35 + 35 = 70$." },
        { text: "$^{14}C_7$", feedback: "Pascal's rule adds 1 to the top, not the two tops together." },
        { text: "$^8C_7 = 8$", feedback: "The bottom index is the larger of the two bottoms, 4." },
        { text: "$^7C_7 = 1$", feedback: "Bottom indices do not add; the top goes up by 1." },
      ],
      hint: "Neighbouring entries in the same row add to the entry below them.",
    },
    {
      type: "quiz",
      id: "pc2-2-q4",
      variant: "concept",
      question:
        "In the proof of Pascal's rule, we split on whether one special person is in the committee. Why is adding the two cases allowed?",
      options: [
        { text: "Every committee is in exactly one case: the person is either in it or not.", correct: true, feedback: "Disjoint cases that cover everything — that is the sum rule." },
        { text: "Because both cases have the same number of committees.", feedback: "They usually don't ($^nC_{r-1}$ vs $^nC_r$). Adding needs disjointness, not equal sizes." },
        { text: "Because we are choosing one thing AND another.", feedback: "\"AND\" signals multiplication. Here it is \"in OR out\" — which signals addition." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-2-q5",
      variant: "practice",
      question: "If $^nC_9 = {}^nC_{11}$, what is $^nC_{19}$?",
      options: [
        { text: "20", correct: true, feedback: "$9 + 11 = n$ so $n = 20$, and $^{20}C_{19} = {}^{20}C_1 = 20$." },
        { text: "1", feedback: "That would be $^{20}C_{20}$ or $^{20}C_0$." },
        { text: "190", feedback: "That is $^{20}C_2$ (or $^{20}C_{18}$)." },
        { text: "Cannot be determined.", feedback: "Since $9 \\ne 11$, the identity forces $n = 9 + 11$." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-2-q6",
      variant: "practice",
      question: "Using $r\\,{}^nC_r = n\\,{}^{n-1}C_{r-1}$, what is $5 \\cdot {}^{12}C_5$?",
      options: [
        { text: "$12 \\cdot {}^{11}C_4 = 3960$", correct: true, feedback: "$^{11}C_4 = 330$, so $12 \\times 330 = 3960$. Check: $5 \\times 792 = 3960$." },
        { text: "$12 \\cdot {}^{11}C_5 = 5544$", feedback: "Choosing the chair first leaves $r - 1 = 4$ more members, not 5." },
        { text: "$11 \\cdot {}^{12}C_4 = 5445$", feedback: "The chair is picked from all 12 people, so the multiplier is 12." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-2-q7",
      variant: "practice",
      question: "Three consecutive entries of a row are ${}^nC_{r-1} = 28$, ${}^nC_r = 56$, ${}^nC_{r+1} = 70$. Find $n$ and $r$.",
      options: [
        { text: "$n = 8,\\ r = 3$", correct: true, feedback: "$\\frac{n-r+1}{r} = 2$ gives $n + 1 = 3r$; $\\frac{n-r}{r+1} = \\frac{5}{4}$ gives $4n = 9r + 5$. So $r = 3$, $n = 8$. Check: ${}^8C_2 = 28$, ${}^8C_3 = 56$, ${}^8C_4 = 70$." },
        { text: "$n = 8,\\ r = 4$", feedback: "$n = 8$ is right, but $70 = {}^8C_4$ is ${}^nC_{r+1}$, so $r + 1 = 4$ and $r = 3$." },
        { text: "$n = 7,\\ r = 3$", feedback: "Row 7 reads 1, 7, 21, 35, 35, 21, 7, 1 — no 28, 56 or 70 in it." },
        { text: "$n = 9,\\ r = 3$", feedback: "Row 9 has 36, 84, 126 in those positions. Use the neighbour ratio $\\frac{n-r+1}{r}$ with $56 \\div 28 = 2$." },
      ],
      hint: "Use $\\frac{{}^nC_r}{{}^nC_{r-1}} = \\frac{n-r+1}{r}$ twice.",
    },
    {
      type: "quiz",
      id: "pc2-2-q8",
      variant: "practice",
      question: "A club has 13 members, including the president. Five-member committees are formed. How many include the president, and how many do not?",
      options: [
        { text: "495 include, 792 do not", correct: true, feedback: "President in: ${}^{12}C_4 = 495$. President out: ${}^{12}C_5 = 792$. Together $1287 = {}^{13}C_5$, as Pascal's rule says." },
        { text: "792 include, 495 do not", feedback: "Swapped. If the president is in, only 4 places remain: ${}^{12}C_4 = 495$." },
        { text: "495 include, 1287 do not", feedback: "1287 is ${}^{13}C_5$, every committee. Those without the president are ${}^{12}C_5 = 792$." },
        { text: "1287 include, 0 do not", feedback: "Plenty of committees leave the president out: all 5 members can come from the other 12." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "selections-with-restrictions",
  title: "2.3 · Selections with Restrictions",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Real committees come with rules: *at least two women*, *the treasurer must be on it*, *these two refuse to serve together*. The formula $^nC_r$ still does all the work. The skill is splitting the problem so that each piece is a plain, unrestricted choice.\n\nTwo strategies cover almost everything:\n\n- **Cases.** Split by the exact value of the restricted quantity (exactly 2 women, exactly 3, …), count each case with the product rule, and add.\n- **Complement.** Count everything, then subtract the outcomes that break the rule.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — at least 2 women.** A committee of 5 is chosen from 6 men and 4 women. How many committees have at least 2 women?\n\n*By cases.* \"At least 2\" means exactly 2, 3 or 4 women; the rest are men.",
    },
    {
      type: "table",
      headers: ["Women", "Men", "Count", "Value"],
      rows: [
        ["2", "3", "$^4C_2 \\times {}^6C_3$", "$6 \\times 20 = 120$"],
        ["3", "2", "$^4C_3 \\times {}^6C_2$", "$4 \\times 15 = 60$"],
        ["4", "1", "$^4C_4 \\times {}^6C_1$", "$1 \\times 6 = 6$"],
        ["", "", "**Total**", "**186**"],
      ],
    },
    {
      type: "text",
      content:
        "*By complement.* All committees: $^{10}C_5 = 252$. The bad ones have 0 or 1 woman:\n\n- 0 women: $^6C_5 = 6$.\n- 1 woman: $^4C_1 \\times {}^6C_4 = 4 \\times 15 = 60$.\n\nSo $252 - 66 = 186$. Two different routes, same answer — the best check you can have.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Cases or complement?",
      content:
        "Count how many cases each route needs. \"At least 1\" almost always wants the complement (one bad case: \"none\"). \"At least 3 out of 4\" wants direct cases. When both are short, do both and compare.",
    },
    {
      type: "text",
      content:
        "**Worked example — at least one of each (routine).** A committee of 5 is chosen from 6 boys and 5 girls so that it has at least one boy **and** at least one girl.\n\n1. Count everything. *Why this step:* the condition fails in only two ways, so the complement is shorter than listing the four mixed cases.",
    },
    { type: "math", latex: "{}^{11}C_5 = \\frac{11 \\times 10 \\times 9 \\times 8 \\times 7}{120} = 462" },
    {
      type: "text",
      content:
        "2. Subtract the two bad cases, all boys and all girls. *Why this step:* they cannot overlap (a committee of 5 cannot be all boys and all girls at once), so nothing is subtracted twice.",
    },
    { type: "math", latex: "462 - {}^6C_5 - {}^5C_5 = 462 - 6 - 1 = 455" },
    {
      type: "text",
      content:
        "3. *Check by cases:* (1 boy, 4 girls) $6 \\times 5 = 30$; (2, 3) $15 \\times 10 = 150$; (3, 2) $20 \\times 10 = 200$; (4, 1) $15 \\times 5 = 75$. Total $30 + 150 + 200 + 75 = 455$. ✓",
    },
    {
      type: "text",
      content:
        "**The tempting shortcut that fails.** For \"at least one woman\", many students write: *pick one woman to guarantee the condition ($^4C_1$), then fill the other 4 seats from anyone left ($^9C_4$)*, giving $4 \\times 126 = 504$. That is more than the 252 committees that exist at all! Let's shrink the problem until we can see what went wrong.",
    },
    {
      type: "text",
      content:
        "Take 2 women $W_1, W_2$ and 2 men $M_1, M_2$, and choose 2 people with at least one woman. The shortcut says: pick a woman (2 ways), then anyone of the remaining 3 (3 ways) — 6. List them:",
    },
    {
      type: "table",
      headers: ["Guaranteed woman", "Then anyone", "Committee"],
      rows: [
        ["$W_1$", "$W_2$", "$\\{W_1, W_2\\}$ ←"],
        ["$W_1$", "$M_1$", "$\\{W_1, M_1\\}$"],
        ["$W_1$", "$M_2$", "$\\{W_1, M_2\\}$"],
        ["$W_2$", "$W_1$", "$\\{W_1, W_2\\}$ ← again"],
        ["$W_2$", "$M_1$", "$\\{W_2, M_1\\}$"],
        ["$W_2$", "$M_2$", "$\\{W_2, M_2\\}$"],
      ],
    },
    {
      type: "text",
      content:
        "The committee $\\{W_1, W_2\\}$ appears twice: once with $W_1$ as the \"guaranteed\" woman and once with $W_2$. The true count is $^4C_2 - {}^2C_2 = 6 - 1 = 5$. The shortcut secretly **labels** one woman as special, and any committee with several women gets counted once per possible label.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "product",
        stages: [
          { label: "Guaranteed woman", options: ["W1", "W2"] },
          { label: "Then anyone", options: ["other W", "M1", "M2"] },
        ],
        highlightPath: ["W1", "other W"],
        caption:
          "The shortcut's tree has 6 leaves, but the two 'other W' leaves are the same committee {W1, W2}. Committees with k women are counted k times.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"choose one woman first, then any 4\"",
      content:
        "Guaranteeing a condition by pre-placing one item overcounts: a committee with $k$ women is counted $k$ times. Use cases (exactly 1, exactly 2, …) or the complement (all minus none). For 6 men and 4 women, committees of 5 with at least one woman number $252 - 6 = 246$, not 504.",
    },
    {
      type: "text",
      content:
        "**Particular people.** From 10 people, choose 5, where Arjun **must** be included. Put Arjun on first; the remaining 4 seats come from the other 9: $^9C_4 = 126$. If Arjun must be **excluded**, all 5 come from the other 9: $^9C_5 = 126$.\n\nNotice $126 + 126 = 252 = {}^{10}C_5$ — every committee either has Arjun or doesn't. That is Pascal's rule again, now doing real work.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — two who won't serve together.** From 10 people choose 5, but Arjun and Bina refuse to be on the same committee.\n\n1. Complement: committees *with both* Arjun and Bina have 3 more seats from 8 others: $^8C_3 = 56$.\n2. Answer: $252 - 56 = 196$.\n3. Cases check: neither ($^8C_5 = 56$) + Arjun only ($^8C_4 = 70$) + Bina only ($70$) $= 196$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example — no married couple (JEE).** From 5 married couples (10 people), 4 people are chosen so that no husband and wife are both chosen. How many ways?\n\n1. Choose which 4 couples are represented. *Why this step:* \"no couple together\" means the 4 people come from 4 **different** couples. Think in couples first, people second.",
    },
    { type: "math", latex: "{}^5C_4 = 5" },
    {
      type: "text",
      content:
        "2. From each chosen couple, pick the husband or the wife. *Why this step:* the four picks are independent, 2 options each, so they multiply.",
    },
    { type: "math", latex: "{}^5C_4 \\times 2^4 = 5 \\times 16 = 80" },
    {
      type: "text",
      content:
        "3. *Complement check:* all selections ${}^{10}C_4 = 210$. Those containing a given couple: ${}^8C_2 = 28$, so $5 \\times 28 = 140$ over all couples. But a selection made of **two** couples was counted once for each couple, and there are ${}^5C_2 = 10$ of those. So selections with at least one couple number $140 - 10 = 130$, and $210 - 130 = 80$. ✓ Notice the $-10$: the same double-counting as the 'guaranteed woman' shortcut, caught and corrected.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — an exam choice (NCERT).** A student must answer 10 of 13 questions, including at least 4 of the first 5.\n\n1. The first 5 and the last 8 are separate pools, so split by how many of the first 5 are chosen.\n2. Exactly 4 of the first 5, then 6 of the last 8: $^5C_4 \\times {}^8C_6 = 5 \\times 28 = 140$.\n3. All 5 of the first 5, then 5 of the last 8: $^5C_5 \\times {}^8C_5 = 1 \\times 56 = 56$.\n4. Total: $140 + 56 = 196$.",
    },
    {
      type: "text",
      content:
        "**Worked example — picking a cricket XI (CBSE / JEE).** A squad of 16 has 5 bowlers, 2 wicket-keepers and 9 batters. An XI must contain exactly 1 wicket-keeper and at least 4 bowlers. How many XIs are possible?\n\n1. Choose the keeper: ${}^2C_1 = 2$. *Why this step:* \"exactly 1\" is a single fixed case, so it is just a factor.\n2. Split on the bowlers: exactly 4 or exactly 5. *Why this step:* the bowler count changes how many batter places are left, so each case needs its own count. The XI has $11 - 1 = 10$ places after the keeper.",
    },
    {
      type: "table",
      headers: ["Bowlers", "Batters", "Count", "Value"],
      rows: [
        ["4", "6", "${}^5C_4 \\times {}^9C_6$", "$5 \\times 84 = 420$"],
        ["5", "5", "${}^5C_5 \\times {}^9C_5$", "$1 \\times 126 = 126$"],
        ["", "", "**Sum**", "**546**"],
      ],
    },
    { type: "math", latex: "\\text{XIs} = 2 \\times 546 = 1092" },
    {
      type: "text",
      content:
        "3. *Check the bookkeeping:* in each row keeper + bowlers + batters $= 1 + 4 + 6 = 1 + 5 + 5 = 11$. The keeper factor multiplies the **sum** of the cases because every XI picks a keeper and then falls into one bowler case.",
    },
    {
      type: "quiz",
      id: "pc2-3-q1",
      variant: "practice",
      question: "A group of 3 is chosen from 5 boys and 4 girls. How many groups contain at least one girl?",
      options: [
        { text: "74", correct: true, feedback: "All groups $^9C_3 = 84$, minus all-boy groups $^5C_3 = 10$: $84 - 10 = 74$." },
        { text: "112", feedback: "That is $4 \\times {}^8C_2 = 4 \\times 28$ — the 'guarantee a girl first' shortcut, which counts a group with two girls twice." },
        { text: "84", feedback: "That is every group, including the 10 all-boy ones." },
        { text: "40", feedback: "That counts only groups with exactly one girl ($4 \\times 10$). Groups with 2 or 3 girls also qualify." },
      ],
      hint: "\"At least one\" — count the opposite.",
    },
    {
      type: "quiz",
      id: "pc2-3-q2",
      variant: "practice",
      question: "From 5 boys and 4 girls, how many 3-person groups have **exactly** 2 girls?",
      options: [
        { text: "30", correct: true, feedback: "Choose the girls and the boy independently: $^4C_2 \\times {}^5C_1 = 6 \\times 5 = 30$." },
        { text: "11", feedback: "That adds $6 + 5$. Choosing girls AND a boy multiplies." },
        { text: "36", feedback: "That is $^9C_2$ — it ignores who is a girl." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-3-q3",
      variant: "concept",
      question:
        "A student counts 5-person committees from 6 men and 4 women with at least one woman as $^4C_1 \\times {}^9C_4 = 504$. What went wrong?",
      options: [
        { text: "A committee with several women is counted once for each woman who could be the 'first' one.", correct: true, feedback: "Exactly. Pre-placing one woman labels her as special; a committee with 3 women is counted 3 times. The true count is $252 - 6 = 246$." },
        { text: "It should be $^4C_1 + {}^9C_4$, since the stages are separate.", feedback: "Stages done one after the other multiply. The problem is the overlap, not the operation." },
        { text: "Nothing — 504 is correct.", feedback: "There are only $^{10}C_5 = 252$ committees in total, so 504 cannot be right." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-3-q4",
      variant: "practice",
      question: "From 12 players, a team of 11 is chosen. In how many ways if the captain is always included?",
      options: [
        { text: "11", correct: true, feedback: "Captain in; the other 10 places come from 11 players: $^{11}C_{10} = {}^{11}C_1 = 11$. Equivalently, choose the one player to drop." },
        { text: "12", feedback: "That is $^{12}C_{11}$, which lets the captain be dropped." },
        { text: "1", feedback: "There are 11 other players who could be the one left out." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-3-q5",
      variant: "practice",
      question: "From 8 people, a group of 4 is chosen so that two particular people, P and Q, are **both** included. How many ways?",
      options: [
        { text: "15", correct: true, feedback: "P and Q take 2 places; the other 2 come from the remaining 6: $^6C_2 = 15$." },
        { text: "70", feedback: "That is $^8C_4$ with no restriction." },
        { text: "20", feedback: "That is $^6C_3$ — only 2 more places remain after P and Q." },
        { text: "28", feedback: "That is $^8C_2$ — P and Q are fixed, so they should not be chosen again." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-3-q6",
      variant: "practice",
      question: "A committee of 4 is chosen from 5 men and 4 women with **at most 2 women**. How many committees are possible?",
      options: [
        { text: "105", correct: true, feedback: "Split by the number of women: 0 women ${}^5C_4 = 5$, 1 woman ${}^4C_1 \\times {}^5C_3 = 40$, 2 women ${}^4C_2 \\times {}^5C_2 = 60$. Total $5 + 40 + 60 = 105$. Complement check: $126 - ({}^4C_3 \\cdot 5 + {}^4C_4) = 126 - 21 = 105$." },
        { text: "126", feedback: "That is ${}^9C_4$ with no restriction. It still includes the 20 committees with 3 women and the 1 with 4 women." },
        { text: "60", feedback: "That is only the exactly-2-women case. \"At most 2\" also includes 0 women (5) and 1 woman (40)." },
        { text: "45", feedback: "That is $5 + 40$: the 0- and 1-woman cases. You left out the exactly-2-women case (60)." },
      ],
      hint: "\"At most 2\" means exactly 0, 1 or 2 women. Count each case and add.",
    },
    {
      type: "quiz",
      id: "pc2-3-q7",
      variant: "practice",
      question: "A team of 3 is chosen from 4 boys and 3 girls with at least one boy and at least one girl. How many teams?",
      options: [
        { text: "30", correct: true, feedback: "All teams ${}^7C_3 = 35$, minus all-boy ${}^4C_3 = 4$, minus all-girl ${}^3C_3 = 1$: $35 - 5 = 30$. Cases check: $4 \\times 3 + 6 \\times 3 = 12 + 18 = 30$." },
        { text: "31", feedback: "You removed the all-boy teams but not the all-girl team. There are two bad cases." },
        { text: "60", feedback: "That is 'pick a boy, pick a girl, then anyone' $= 4 \\times 3 \\times 5$, which counts a team with two boys or two girls twice." },
        { text: "35", feedback: "That is every team, with no restriction." },
      ],
      hint: "Two bad cases: all boys, all girls.",
    },
    {
      type: "quiz",
      id: "pc2-3-q8",
      variant: "practice",
      question: "From 4 married couples, 3 people are chosen so that no couple is included. How many ways?",
      options: [
        { text: "32", correct: true, feedback: "Choose 3 of the 4 couples (${}^4C_3 = 4$), then one partner from each ($2^3 = 8$): $32$. Check: ${}^8C_3 - 4 \\times 6 = 56 - 24 = 32$." },
        { text: "56", feedback: "That is ${}^8C_3$, which allows a husband and wife together." },
        { text: "24", feedback: "That is the number of selections that **do** contain a couple (a couple plus one of the other 6 people, for each of 4 couples)." },
        { text: "4", feedback: "That only chooses which couples are represented. Each chosen couple still sends either partner: multiply by $2^3$." },
      ],
      hint: "Choose the couples first, then one person from each.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "choose-then-arrange",
  title: "2.4 · Choose, Then Arrange",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Many problems have two stages hidden in one sentence: first decide **which** things you are using (a selection), then decide **how** to lay them out (an arrangement). Split them apart and each stage is something you already know.\n\nA small case first: how many 3-letter words use 2 consonants from B, C, D and 1 vowel from A, E? Grow the tree one stage at a time.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "product",
        stages: [
          { label: "Pick 2 consonants from B,C,D", options: ["BC", "BD", "CD"] },
          { label: "Pick 1 vowel from A,E", options: ["A", "E"] },
          { label: "Arrange the 3 letters", options: ["1", "2", "3", "4", "5", "6"] },
        ],
        highlightPath: ["BD", "A", "3"],
        caption:
          "3 × 2 × 3! = 36 words: choose with C, arrange once. The highlighted path picks {B, D}, then A, then the 3rd of the 6 orders of B, D, A.",
      },
    },
    { type: "math", latex: "\\text{count} = (\\text{ways to choose}) \\times (\\text{ways to arrange what was chosen})" },
    {
      type: "text",
      content:
        "In fact, $^nP_r = {}^nC_r \\times r!$ from Lesson 2.1 is the simplest example: choose $r$ objects, then arrange them. The pattern scales to choices from several pools.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — words from vowels and consonants (NCERT).** From 7 consonants and 4 vowels, how many words (any string of letters) can be made using 3 consonants and 2 vowels, all letters different?\n\n1. **Choose** the consonants: $^7C_3 = 35$.\n2. **Choose** the vowels: $^4C_2 = 6$.\n3. **Arrange** the 5 chosen letters: $5! = 120$.\n4. Total: $35 \\times 6 \\times 120 = 25\\,200$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Don't arrange twice",
      content:
        "A common slip is $^7P_3 \\times {}^4P_2 \\times 5!$. The $P$s already put the consonants and vowels in order *within their own groups*, and then $5!$ orders all five letters again. Choose with $C$, arrange once at the end.",
    },
    {
      type: "text",
      content:
        "**Geometry: counting shapes by choosing points.** A figure is fixed by its corner points, and points have no order. So these are pure selections.\n\n- **Lines through $n$ points, no three collinear:** each line is fixed by 2 points: $^nC_2$.\n- **Triangles:** any 3 non-collinear points: $^nC_3$.\n- **Diagonals of an $n$-gon:** every pair of vertices gives a side or a diagonal, and there are $n$ sides:",
    },
    { type: "math", latex: "\\text{diagonals} = {}^nC_2 - n = \\frac{n(n-1)}{2} - n = \\frac{n(n-3)}{2}" },
    {
      type: "text",
      content:
        "*Picture check:* from any one vertex, you can draw a diagonal to every vertex except itself and its two neighbours — $n - 3$ of them. Doing that from all $n$ vertices draws each diagonal from both ends, so divide by 2. Same formula, second derivation. A hexagon has $\\frac{6 \\times 3}{2} = 9$; an octagon $\\frac{8 \\times 5}{2} = 20$.",
    },
    {
      type: "table",
      headers: ["Polygon", "$n$", "$^nC_2$", "Sides", "Diagonals $\\frac{n(n-3)}{2}$"],
      rows: [
        ["Quadrilateral", "4", "6", "4", "2"],
        ["Pentagon", "5", "10", "5", "5"],
        ["Hexagon", "6", "15", "6", "9"],
        ["Octagon", "8", "28", "8", "20"],
        ["Decagon", "10", "45", "10", "35"],
      ],
    },
    {
      type: "text",
      content:
        "**When points are collinear.** Suppose 12 points lie in a plane, and exactly 4 of them are on one straight line (no other three collinear).\n\n**Lines.** $^{12}C_2 = 66$ treats every pair as a different line. But the $^4C_2 = 6$ pairs taken from the collinear 4 all give the *same* line. Remove them and add that one line back:",
    },
    { type: "math", latex: "66 - 6 + 1 = 61 \\text{ lines}" },
    {
      type: "text",
      content:
        "**Triangles.** Any 3 of the 12 points, minus the triples that lie flat on the line (they make no triangle):",
    },
    { type: "math", latex: "{}^{12}C_3 - {}^4C_3 = 220 - 4 = 216 \\text{ triangles}" },
    {
      type: "text",
      content:
        "**Worked example 2 — reverse a diagonal count.** A polygon has 44 diagonals. How many sides?\n\n1. $\\frac{n(n-3)}{2} = 44 \\Rightarrow n^2 - 3n - 88 = 0$.\n2. Factor: $(n - 11)(n + 8) = 0$, so $n = 11$ (a side count must be positive).",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — parallelograms.** A family of 4 parallel lines is crossed by a family of 3 parallel lines (in another direction). How many parallelograms do they form?\n\n1. A parallelogram needs two sides from each family.\n2. Choose 2 lines from the first family: $^4C_2 = 6$. Choose 2 from the second: $^3C_2 = 3$.\n3. Each such choice encloses exactly one parallelogram: $6 \\times 3 = 18$.\n\nThe same idea counts rectangles on a chessboard: its 8×8 grid of squares is bounded by 9 horizontal and 9 vertical lines, so there are $^9C_2 \\times {}^9C_2 = 36 \\times 36 = 1296$ rectangles.",
    },
    {
      type: "text",
      content:
        "**Squares are not rectangles-by-choice.** Choosing 2 horizontal and 2 vertical lines at random rarely gives equal sides, so squares need a direct count. A $k \\times k$ square can start in $9 - k$ columns and $9 - k$ rows, so it has $(9-k)^2$ positions. The total is $1^2 + 2^2 + \\cdots + 8^2 = 204$ squares.\n\n**Intersection points.** Two lines meet in at most one point, so $n$ lines (no two parallel, no three through one point) meet in at most ${}^nC_2$ points. Two circles meet in at most 2 points, so $n$ circles meet in at most $2 \\cdot {}^nC_2$ points.",
    },
    {
      type: "callout",
      variant: "info",
      title: "JEE extension: triangles with no side on the polygon",
      content:
        "Choose 3 vertices of an $n$-gon so that no side of the triangle is a side of the polygon. Start from all ${}^nC_3$ triangles. Triangles using **two** polygon sides are three consecutive vertices: $n$ of them. Triangles using **exactly one** side: pick the side ($n$ ways), then a third vertex that is not next to either end ($n - 4$ ways). So the count is ${}^nC_3 - n(n-4) - n$. For a hexagon: $20 - 12 - 6 = 2$, the two large triangles of the star.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — choose people, then seats.** From 6 men and 4 women, 3 men and 2 women are chosen and seated in a row of 5 chairs.\n\n1. Choose: $^6C_3 \\times {}^4C_2 = 20 \\times 6 = 120$.\n2. Arrange the 5 chosen people: $5! = 120$.\n3. Total: $120 \\times 120 = 14\\,400$.",
    },
    {
      type: "text",
      content:
        "**Worked example — choose, then arrange with a rule (application).** From 4 boys and 3 girls, 2 boys and 2 girls are chosen for a photo and stand in a row so that the two girls are side by side. How many photos are possible?\n\n1. **Choose** the people. *Why this step:* the side-by-side rule is about positions, so it does not affect who is picked. Settle *who* first.",
    },
    { type: "math", latex: "{}^4C_2 \\times {}^3C_2 = 6 \\times 3 = 18" },
    {
      type: "text",
      content:
        "2. **Arrange** with the girls glued together. *Why this step:* treat the two girls as one block, so there are 3 units (block, boy, boy) to order, and then the girls can swap inside the block.",
    },
    { type: "math", latex: "3! \\times 2! = 6 \\times 2 = 12" },
    { type: "math", latex: "\\text{photos} = 18 \\times 12 = 216" },
    {
      type: "text",
      content:
        "3. *Check:* with no rule there would be $18 \\times 4! = 432$ photos. In a row of 4, the girls occupy 2 of the 6 possible pairs of places, and 3 of those pairs are adjacent, so exactly half the photos qualify: $432 \\div 2 = 216$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — words from a word with repeated letters (JEE).** How many 4-letter words can be formed from the letters of EXAMINATION?\n\nFirst take stock of the letters: A, I and N appear twice each; E, X, M, T and O once each. That is **8 distinct letters, 3 of them doubled**. A chosen A is just \"an A\", so we cannot use ${}^{11}C_4$. Instead split by the *pattern* of the 4 letters, choose, then arrange each pattern with the repeated-letter formula.",
    },
    {
      type: "table",
      headers: ["Pattern", "Choose", "Arrange", "Words", "Selections"],
      rows: [
        ["All 4 different", "${}^8C_4 = 70$", "$4! = 24$", "$1680$", "$70$"],
        ["One pair + 2 different", "${}^3C_1 \\times {}^7C_2 = 63$", "$\\frac{4!}{2!} = 12$", "$756$", "$63$"],
        ["Two pairs", "${}^3C_2 = 3$", "$\\frac{4!}{2!\\,2!} = 6$", "$18$", "$3$"],
        ["**Total**", "", "", "**2454**", "**136**"],
      ],
    },
    {
      type: "text",
      content:
        "Two details decide this problem. In the one-pair case, the pair comes from the 3 doubled letters, and the 2 singles come from the **other 7** distinct letters (the paired letter can't appear a third time). And each pattern has its own arrangement count, because repeated letters make some orders identical. Only the selections column (136) answers \"how many ways to *choose* 4 letters\".",
    },
    {
      type: "quiz",
      id: "pc2-4-q1",
      variant: "practice",
      question: "From 5 consonants and 3 vowels (all different), how many words can be formed with 3 consonants and 2 vowels?",
      options: [
        { text: "3600", correct: true, feedback: "$^5C_3 \\times {}^3C_2 \\times 5! = 10 \\times 3 \\times 120 = 3600$." },
        { text: "30", feedback: "That chooses the letters but never arranges them. A word cares about order: multiply by $5!$." },
        { text: "43 200", feedback: "That is $^5P_3 \\times {}^3P_2 \\times 5!$ — the letters were ordered twice." },
        { text: "6720", feedback: "That is $^8P_5$, which ignores the 3-consonant/2-vowel requirement." },
      ],
      hint: "Choose the consonants, choose the vowels, then arrange all five once.",
    },
    {
      type: "quiz",
      id: "pc2-4-q2",
      variant: "practice",
      question: "How many diagonals does a decagon (10 sides) have?",
      options: [
        { text: "35", correct: true, feedback: "$\\frac{10 \\times 7}{2} = 35$. Check: $^{10}C_2 - 10 = 45 - 10 = 35$." },
        { text: "45", feedback: "That is $^{10}C_2$, which includes the 10 sides." },
        { text: "70", feedback: "That is $10 \\times 7$, counting each diagonal from both of its ends." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-4-q3",
      variant: "practice",
      question: "10 points lie in a plane; exactly 4 of them are collinear and no other three are. How many triangles can be formed?",
      options: [
        { text: "116", correct: true, feedback: "$^{10}C_3 - {}^4C_3 = 120 - 4 = 116$." },
        { text: "120", feedback: "That includes the 4 'triangles' whose vertices all lie on the line — they are flat." },
        { text: "114", feedback: "Only triples lying entirely on the line fail; that is $^4C_3 = 4$, not 6." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-4-q4",
      variant: "concept",
      question: "With 4 of 10 points collinear, why do we subtract $^4C_2$ and then **add 1** when counting lines?",
      options: [
        { text: "The 6 pairs on the line all give the same single line, so 6 counted lines should be 1.", correct: true, feedback: "Right. Subtracting 6 removes that line completely, so add it back once: $45 - 6 + 1 = 40$." },
        { text: "To account for the line at infinity.", feedback: "No such thing is being counted here — this is an ordinary plane." },
        { text: "Because one of the pairs is not a line.", feedback: "Every pair of distinct points makes a line; the issue is that several pairs make the *same* line." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-4-q5",
      variant: "practice",
      question: "5 parallel lines are crossed by 4 other parallel lines. How many parallelograms are formed?",
      options: [
        { text: "60", correct: true, feedback: "$^5C_2 \\times {}^4C_2 = 10 \\times 6 = 60$." },
        { text: "20", feedback: "That is $5 \\times 4$ — the crossing points, not parallelograms. A parallelogram needs two lines from each family." },
        { text: "16", feedback: "That adds $10 + 6$; the two choices are independent and multiply." },
        { text: "12", feedback: "That counts only the smallest cells ($4 \\times 3$). Larger parallelograms span several cells." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-4-q6",
      variant: "practice",
      question: "In how many ways can 3 letters be **selected** (order does not matter) from the letters of BANANA?",
      options: [
        { text: "6", correct: true, feedback: "The letters are A×3, N×2, B×1. By pattern: all different {A, N, B}: 1. One pair + one other: pair AA or NN (2), then one of the other 2 letters (2): 4. Three alike AAA: 1. Total $1 + 4 + 1 = 6$." },
        { text: "20", feedback: "That is ${}^6C_3$, which treats the six letters as distinct. The three As can't be told apart." },
        { text: "5", feedback: "You missed the triple AAA. BANANA has three As, so that selection is possible." },
        { text: "1", feedback: "That counts only the all-different selection {A, N, B}. Repeated letters may be selected more than once." },
      ],
      hint: "List the distinct letters with their counts, then split by pattern: all different, one pair, three alike.",
    },
    {
      type: "quiz",
      id: "pc2-4-q7",
      variant: "practice",
      question: "10 lines are drawn in a plane, no two parallel and no three through one point. How many intersection points are there?",
      options: [
        { text: "45", correct: true, feedback: "Each point is fixed by the unordered pair of lines through it: ${}^{10}C_2 = 45$." },
        { text: "90", feedback: "That is $10 \\times 9$, which counts each point once from each of its two lines." },
        { text: "100", feedback: "That is $10^2$, which pairs each line with itself and counts every point twice." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-4-q8",
      variant: "practice",
      question: "From 5 men and 4 women, 2 men and 2 women are chosen and seated in a row of 4 chairs. How many seatings are possible?",
      options: [
        { text: "1440", correct: true, feedback: "Choose: ${}^5C_2 \\times {}^4C_2 = 10 \\times 6 = 60$. Arrange the 4 chosen: $4! = 24$. Total $60 \\times 24 = 1440$." },
        { text: "60", feedback: "That chooses the four people but never seats them. A row has an order: multiply by $4!$." },
        { text: "5760", feedback: "That is ${}^5P_2 \\times {}^4P_2 \\times 4!$ — the people were put in order twice." },
        { text: "3024", feedback: "That is ${}^9P_4$, which ignores the 2-men/2-women requirement." },
      ],
      hint: "Choose with $C$, then arrange once.",
    },
    {
      type: "quiz",
      id: "pc2-4-q9",
      variant: "practice",
      question: "How many 3-letter **words** can be formed from the letters of BANANA?",
      options: [
        { text: "19", correct: true, feedback: "Split by pattern. All different {A, N, B}: $1 \\times 3! = 6$. One pair + one other: 4 selections (AA or NN, with one of the other 2 letters), each $\\frac{3!}{2!} = 3$ words: $12$. AAA: $1$. Total $6 + 12 + 1 = 19$." },
        { text: "6", feedback: "That is the number of **selections**. Each selection must still be arranged, and different patterns give different numbers of words." },
        { text: "120", feedback: "That is ${}^6P_3$, which treats the three As and two Ns as different letters." },
        { text: "36", feedback: "That arranges all 6 selections in $3! = 6$ ways each. Repeated letters make some of those orders identical (AAN has only 3 orders, AAA only 1)." },
      ],
      hint: "Letters: A×3, N×2, B×1. Choose by pattern, then arrange each pattern with repeats in mind.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "all-possible-selections",
  title: "2.5 · All Possible Selections",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "A new question: not \"how many ways to choose 3\" but \"how many ways to choose **any number** — none, some, or all\"? A pizza shop offers 5 toppings; how many different pizzas can you order?\n\nYou could add $^5C_0 + {}^5C_1 + \\cdots + {}^5C_5$. But there is a faster way to see it. Walk past the toppings one at a time and make a yes/no decision for each. The tree below shows just three of the toppings so it stays readable.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "product",
        stages: [
          { label: "Onion", options: ["In", "Out"] },
          { label: "Corn", options: ["In", "Out"] },
          { label: "Paneer", options: ["In", "Out"] },
        ],
        highlightPath: ["In", "Out", "In"],
        caption:
          "Each leaf is one selection. The highlighted path is {onion, paneer}. The all-'Out' leaf is the plain pizza — the empty selection. 2 × 2 × 2 = 8.",
      },
    },
    {
      type: "text",
      content:
        "Each item independently is either **in** or **out** — 2 choices — so by the product rule,",
    },
    { type: "math", latex: "\\text{selections from } n \\text{ distinct items} = \\underbrace{2 \\times 2 \\times \\cdots \\times 2}_{n} = 2^n" },
    {
      type: "text",
      content:
        "If at least one item must be chosen, remove the all-out case: $2^n - 1$. Five toppings give $2^5 = 32$ pizzas, or 31 if a plain base doesn't count.",
    },
    {
      type: "text",
      content:
        "Now count the same leaves a second way: group them by *how many* items are in. There are $^nC_r$ leaves with exactly $r$ items in. Two correct counts of the same thing must agree:",
    },
    { type: "math", latex: "{}^nC_0 + {}^nC_1 + {}^nC_2 + \\cdots + {}^nC_n = 2^n" },
    {
      type: "text",
      content:
        "For $n = 4$: $1 + 4 + 6 + 4 + 1 = 16 = 2^4$. ✓ Chapter 5 gets the same fact from the binomial theorem by putting $x = 1$; here it is just counting.",
    },
    {
      type: "text",
      content:
        "**Identical items change the question.** A fruit bowl has 3 apples, 2 bananas and 4 oranges, where apples are indistinguishable from each other (and so on). Choosing \"one apple\" is a single choice — it doesn't matter which apple. So the decision for apples is not in/out but **how many**: 0, 1, 2 or 3 — that is 4 options.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "product",
        stages: [
          { label: "Apples", options: ["0", "1", "2", "3"] },
          { label: "Bananas", options: ["0", "1", "2"] },
        ],
        highlightPath: ["2", "1"],
        caption:
          "With identical fruit, each kind contributes 'how many' options: 4 for apples, 3 for bananas. 4 × 3 = 12 baskets, including the empty one (0, 0).",
      },
    },
    { type: "math", latex: "p \\text{ identical of one kind}, q \\text{ of another}, \\ldots \\;\\Longrightarrow\\; (p+1)(q+1)\\cdots \\text{ selections}" },
    {
      type: "text",
      content:
        "For the full bowl: $(3+1)(2+1)(4+1) = 4 \\times 3 \\times 5 = 60$ selections, or $59$ if the basket must contain at least one fruit. If some items are distinct too, each distinct item still contributes a factor of 2. E.g. the bowl plus one mango and one pineapple: $60 \\times 2 \\times 2 = 240$.",
    },
    {
      type: "text",
      content:
        "**Worked example — a stationery kit (application).** A drawer holds 4 identical pens, 3 identical pencils and 2 different erasers (one white, one pink). (a) How many non-empty selections can be made? (b) How many selections contain at least one pen and at least one pencil?\n\n1. (a) Give each kind its options. *Why this step:* identical items only ask *how many* (pens 0–4: 5 options; pencils 0–3: 4 options), while each distinct eraser asks *in or out* (2 options each).",
    },
    { type: "math", latex: "5 \\times 4 \\times 2 \\times 2 = 80 \\quad\\Longrightarrow\\quad 80 - 1 = 79 \\text{ non-empty selections}" },
    {
      type: "text",
      content:
        "2. (b) Remove the 0 option for pens and pencils only. *Why this step:* \"at least one pen\" means 1–4 pens (4 options) and \"at least one pencil\" means 1–3 pencils (3 options). The erasers are unrestricted, and no subtraction is needed.",
    },
    { type: "math", latex: "4 \\times 3 \\times 2 \\times 2 = 48" },
    {
      type: "text",
      content:
        "3. *Complement check for (b):* from the 80 selections, remove those with no pen ($1 \\times 4 \\times 4 = 16$) and those with no pencil ($5 \\times 1 \\times 4 = 20$), then add back those with neither, which were removed twice ($1 \\times 1 \\times 4 = 4$): $80 - 16 - 20 + 4 = 48$. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"selecting from identical items uses $^nC_r$\"",
      content:
        "From 5 identical apples, how many ways to pick some? Not $2^5 = 32$ (that is $\\sum {}^5C_r$, which counts *which* apples, and the apples can't be told apart). The only thing you decide is *how many*: 0, 1, 2, 3, 4 or 5. That is **6** ways. $^nC_r$ needs distinct objects.",
    },
    {
      type: "text",
      content:
        "**Divisors are selections from identical items.** Every divisor of $360$ is built by choosing how many of each prime factor to take from its prime factorisation:",
    },
    { type: "math", latex: "360 = 2^3 \\times 3^2 \\times 5^1" },
    {
      type: "text",
      content:
        "The three 2s are identical, so a divisor takes 0, 1, 2 or 3 of them (4 options); 0, 1 or 2 threes (3 options); 0 or 1 five (2 options). Different choices give different divisors (unique factorisation), so",
    },
    { type: "math", latex: "\\text{number of divisors of } 360 = (3+1)(2+1)(1+1) = 24" },
    {
      type: "text",
      content:
        "This count includes 1 (take nothing) and 360 itself (take everything).\n\n**Worked example — even divisors of 360.** An even divisor must take at least one 2: that is 1, 2 or 3 twos (3 options). The rest is unchanged: $3 \\times 3 \\times 2 = 18$. The odd divisors take zero 2s: $1 \\times 3 \\times 2 = 6$. Check: $18 + 6 = 24$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example — divisors of 10 800 with conditions (routine).** Find (a) the number of divisors of $10\\,800$, (b) how many are multiples of 10, (c) how many are odd.\n\n1. Factorise. *Why this step:* every divisor question becomes a \"how many of each prime\" selection once the prime powers are known. $10\\,800 = 108 \\times 100 = (2^2 \\cdot 3^3)(2^2 \\cdot 5^2)$.",
    },
    { type: "math", latex: "10\\,800 = 2^4 \\times 3^3 \\times 5^2 \\qquad\\Longrightarrow\\qquad (4+1)(3+1)(2+1) = 60 \\text{ divisors}" },
    {
      type: "text",
      content:
        "2. (b) A multiple of 10 needs at least one 2 **and** at least one 5. *Why this step:* $10 = 2 \\times 5$, so each of those primes loses its \"take none\" option: 2s from 1–4 (4 options), 3s unchanged (4 options), 5s from 1–2 (2 options).",
    },
    { type: "math", latex: "4 \\times 4 \\times 2 = 32 \\text{ multiples of 10}" },
    {
      type: "text",
      content:
        "3. (c) An odd divisor takes **no** 2s (1 option): $1 \\times 4 \\times 3 = 12$. *Check:* the even divisors number $4 \\times 4 \\times 3 = 48$, and $48 + 12 = 60$. ✓",
    },
    {
      type: "callout",
      variant: "info",
      title: "JEE extension: sum of divisors, and factor pairs",
      content:
        "The same \"choose how many of each prime\" picture gives more. Expand the product $(1+2+4+8)(1+3+9)(1+5)$: each term of the expansion picks one power of 2, one power of 3 and one power of 5, so every divisor of 360 appears exactly once. Hence\n\n**sum of divisors of 360** $= 15 \\times 13 \\times 6 = 1170$.\n\n**Writing 360 as a product of two factors** (order ignored): each divisor $d$ pairs with $360/d$, and since 360 is not a perfect square no divisor pairs with itself. So there are $24 / 2 = 12$ such products.",
    },
    {
      type: "text",
      content:
        "**Worked example — factor pairs of a perfect square (JEE).** In how many ways can $3600$ be written as a product of two positive integers, order ignored? How many if the two factors must be different?\n\n1. Count the divisors. *Why this step:* each factorisation $a \\times b$ is fixed by choosing $a$, a divisor.",
    },
    { type: "math", latex: "3600 = 2^4 \\times 3^2 \\times 5^2 \\qquad\\Longrightarrow\\qquad (4+1)(2+1)(2+1) = 45 \\text{ divisors}" },
    {
      type: "text",
      content:
        "2. Pair each divisor $d$ with $3600/d$. *Why this step:* $d \\times \\frac{3600}{d}$ and $\\frac{3600}{d} \\times d$ are the same product, so pairs, not divisors, are what we count. But $3600 = 60^2$ is a perfect square (every exponent is even), so $d = 60$ pairs with **itself**.",
    },
    {
      type: "text",
      content:
        "3. The other $45 - 1 = 44$ divisors fall into $22$ genuine pairs. Add the product $60 \\times 60$:",
    },
    { type: "math", latex: "22 + 1 = 23 = \\frac{45 + 1}{2} \\text{ products}, \\qquad 22 \\text{ with different factors}" },
    {
      type: "text",
      content:
        "4. *Rule to remember:* with $D$ divisors, a non-square has $\\frac{D}{2}$ factor pairs and a perfect square has $\\frac{D+1}{2}$. An odd divisor count is itself the sign of a perfect square.",
    },
    {
      type: "table",
      headers: ["Situation", "Choices per item", "Count"],
      rows: [
        ["$n$ distinct items, any selection", "2 (in / out)", "$2^n$"],
        ["… at least one chosen", "2", "$2^n - 1$"],
        ["$p, q, r, \\ldots$ identical copies of each kind", "$p+1,\\ q+1,\\ \\ldots$", "$(p+1)(q+1)(r+1)\\cdots$"],
        ["Divisors of $p_1^{a}\\,p_2^{b}\\,p_3^{c}$", "$a+1,\\ b+1,\\ c+1$", "$(a+1)(b+1)(c+1)$"],
      ],
    },
    {
      type: "quiz",
      id: "pc2-5-q1",
      variant: "practice",
      question: "You have 10 friends. In how many ways can you invite **one or more** of them to dinner?",
      options: [
        { text: "1023", correct: true, feedback: "Each friend is in or out: $2^{10} = 1024$, minus the empty invitation: $1023$." },
        { text: "1024", feedback: "That includes inviting nobody." },
        { text: "100", feedback: "That is $10^2$. Each friend contributes a factor of 2, giving $2^{10}$." },
        { text: "3 628 800", feedback: "That is $10!$, the number of ways to *line up* all ten friends." },
      ],
      hint: "Each friend: in or out.",
    },
    {
      type: "quiz",
      id: "pc2-5-q2",
      variant: "practice",
      question: "How many positive divisors does 72 have?",
      options: [
        { text: "12", correct: true, feedback: "$72 = 2^3 \\times 3^2$, so $(3+1)(2+1) = 12$." },
        { text: "6", feedback: "That is $3 \\times 2$ — each exponent needs $+1$ to allow taking none of that prime." },
        { text: "5", feedback: "Exponents multiply after adding 1; they don't add." },
        { text: "10", feedback: "That leaves out 1 and 72. Every number is a divisor of itself, and 1 divides everything; the count $(3+1)(2+1)$ already includes both." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-5-q7",
      variant: "practice",
      question: "What is the sum of all positive divisors of 72?",
      options: [
        { text: "195", correct: true, feedback: "$72 = 2^3 \\times 3^2$, so the sum is $(1+2+4+8)(1+3+9) = 15 \\times 13 = 195$." },
        { text: "12", feedback: "That is the *number* of divisors, $(3+1)(2+1)$. The question asks for their sum." },
        { text: "28", feedback: "That adds the brackets, $15 + 13$. Expanding the product lists every divisor, so the brackets multiply." },
        { text: "123", feedback: "That leaves out 72 itself. Every number is one of its own divisors." },
      ],
      hint: "Expand $(1+2+4+8)(1+3+9)$: every divisor of 72 appears exactly once.",
    },
    {
      type: "quiz",
      id: "pc2-5-q3",
      variant: "concept",
      question: "From 5 identical apples, in how many ways can you pick some apples (possibly none)?",
      options: [
        { text: "6", correct: true, feedback: "Identical apples: only the number matters — 0, 1, 2, 3, 4 or 5." },
        { text: "32", feedback: "$2^5$ treats the apples as distinct (which apple is in?). Identical apples can't be told apart." },
        { text: "31", feedback: "Still treats the apples as distinct, and drops the empty choice the question allows." },
        { text: "5", feedback: "Don't forget the option of picking zero apples." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-5-q4",
      variant: "practice",
      question: "A basket has 4 identical mangoes, 3 identical guavas and 2 identical pears. How many selections contain **at least one fruit**?",
      options: [
        { text: "59", correct: true, feedback: "$(4+1)(3+1)(2+1) - 1 = 60 - 1 = 59$." },
        { text: "60", feedback: "That includes the empty selection." },
        { text: "23", feedback: "That is $2 \\times 3 \\times 4 - 1$ — each kind should give $k + 1$ options, not $k$." },
        { text: "511", feedback: "$2^9 - 1$ treats all 9 fruits as distinct." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-5-q5",
      variant: "practice",
      question: "How many **even** divisors does 360 have?",
      options: [
        { text: "18", correct: true, feedback: "At least one factor of 2: 3 choices for the power of 2, then $3 \\times 2$ for the others: $3 \\times 3 \\times 2 = 18$." },
        { text: "24", feedback: "That is all divisors, including the 6 odd ones." },
        { text: "12", feedback: "Half of 24 feels natural, but even and odd divisors don't split evenly: odd ones must take zero 2s (1 option), even ones get 3 options." },
        { text: "6", feedback: "That is the number of odd divisors." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-5-q6",
      variant: "concept",
      question: "Why is $^6C_0 + {}^6C_1 + \\cdots + {}^6C_6 = 2^6$?",
      options: [
        { text: "Both sides count all subsets of 6 items: grouped by size on the left, by in/out decisions on the right.", correct: true, feedback: "Two correct counts of the same collection — the chapter's main proof technique." },
        { text: "Because there are 7 terms and $7 \\approx 2^3$.", feedback: "The number of terms isn't what matters; the sum is $64$." },
        { text: "Because each $^6C_r$ is a power of 2.", feedback: "$^6C_2 = 15$ is not a power of 2. Only the total is." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-5-q8",
      variant: "practice",
      question: "$1800 = 2^3 \\times 3^2 \\times 5^2$. How many divisors of 1800 are multiples of 10?",
      options: [
        { text: "18", correct: true, feedback: "At least one 2 (3 options), any 3s (3 options), at least one 5 (2 options): $3 \\times 3 \\times 2 = 18$." },
        { text: "36", feedback: "That is every divisor, $(3+1)(2+1)(2+1)$. A multiple of 10 must take at least one 2 and at least one 5." },
        { text: "24", feedback: "That requires a 5 but not a 2: those are the multiples of 5. Also drop the 'no 2s' option." },
        { text: "27", feedback: "That requires a 2 but not a 5: those are the even divisors. Also drop the 'no 5s' option." },
      ],
      hint: "$10 = 2 \\times 5$: remove the 'take none' option for both primes.",
    },
    {
      type: "quiz",
      id: "pc2-5-q9",
      variant: "practice",
      question: "In how many ways can 900 be written as a product of two positive integers, order ignored?",
      options: [
        { text: "14", correct: true, feedback: "$900 = 2^2 \\times 3^2 \\times 5^2$ has $3 \\times 3 \\times 3 = 27$ divisors. It is $30^2$, so $30 \\times 30$ pairs with itself: $\\frac{27 + 1}{2} = 14$." },
        { text: "13", feedback: "That counts only products of two different factors. $30 \\times 30$ is also a way to write 900." },
        { text: "27", feedback: "That is the number of divisors. $d \\times \\frac{900}{d}$ and $\\frac{900}{d} \\times d$ are the same product." },
        { text: "8", feedback: "That uses $2^3$ divisors, as if each prime were in/out. Each exponent is 2, so each prime has 3 options." },
      ],
      hint: "Count divisors, then pair them up. Is 900 a perfect square?",
    },
    {
      type: "quiz",
      id: "pc2-5-q10",
      variant: "practice",
      question: "A pencil box holds 3 identical pens, 2 identical pencils and 3 different erasers. How many selections contain **at least one item**?",
      options: [
        { text: "95", correct: true, feedback: "Pens: 4 options (0–3). Pencils: 3 options (0–2). Each eraser in/out: $2^3 = 8$. Total $4 \\times 3 \\times 8 = 96$, minus the empty selection: $95$." },
        { text: "96", feedback: "That includes taking nothing at all." },
        { text: "47", feedback: "That treats the erasers as identical (4 options). They are different, so each is in or out: $2^3 = 8$." },
        { text: "255", feedback: "That is $2^8 - 1$, treating all 8 items as distinct. Identical pens and pencils only ask 'how many'." },
      ],
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
        "Before you calculate, ask the chapter's two questions:\n\n1. **Arrange or choose?** If swapping two chosen things gives a different outcome, order matters ($P$). Otherwise it is a selection ($C$).\n2. **Cases or complement?** Count whichever side needs fewer cases, and never 'guarantee' a condition by pre-placing one item.\n\nThen look for the special structures: collinear points to subtract, identical items that give $(p+1)$ choices, and a choose-then-arrange split.",
    },
    {
      type: "quiz",
      id: "pc2-6-q1",
      variant: "mastery",
      question: "From 8 club members, how many ways can a **president and a treasurer** be chosen?",
      options: [
        { text: "56", correct: true, feedback: "Two different roles, so order matters: $^8P_2 = 8 \\times 7 = 56$." },
        { text: "28", feedback: "That is $^8C_2$, which would be right for two identical 'delegate' posts. Here the posts differ." },
        { text: "64", feedback: "$8^2$ lets one person hold both roles." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-6-q2",
      variant: "mastery",
      question: "From the same 8 members, how many ways can **two delegates** be sent to a conference?",
      options: [
        { text: "28", correct: true, feedback: "The two delegates have the same role; swapping them changes nothing: $^8C_2 = 28$." },
        { text: "56", feedback: "That counts (A, B) and (B, A) as different, but the pair of delegates is the same." },
        { text: "16", feedback: "That is $8 + 8$; choosing two people is not a sum of two independent choices." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-6-q3",
      variant: "mastery",
      question: "A committee of 4 is chosen from 5 men and 4 women. How many committees include **at least one woman**?",
      options: [
        { text: "121", correct: true, feedback: "All: $^9C_4 = 126$. All-men: $^5C_4 = 5$. So $126 - 5 = 121$." },
        { text: "224", feedback: "That is $4 \\times {}^8C_3 = 4 \\times 56$, the 'pick one woman first' overcount." },
        { text: "126", feedback: "That includes the 5 all-male committees." },
        { text: "40", feedback: "That counts exactly one woman ($4 \\times {}^5C_3$) only." },
      ],
      hint: "Complement: one bad case.",
    },
    {
      type: "quiz",
      id: "pc2-6-q4",
      variant: "mastery",
      question: "12 points lie in a plane; exactly 5 are collinear and no other three are. How many triangles have vertices among these points?",
      options: [
        { text: "210", correct: true, feedback: "$^{12}C_3 - {}^5C_3 = 220 - 10 = 210$." },
        { text: "220", feedback: "That includes the 10 flat 'triangles' taken from the collinear points." },
        { text: "211", feedback: "Adding 1 back is right for *lines*, not triangles: a straight line is not a triangle." },
        { text: "200", feedback: "Collinear triples number $^5C_3 = 10$, not 20." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-6-q5",
      variant: "mastery",
      question: "With the same 12 points (exactly 5 collinear), how many distinct straight lines pass through at least two of them?",
      options: [
        { text: "57", correct: true, feedback: "$^{12}C_2 - {}^5C_2 + 1 = 66 - 10 + 1 = 57$." },
        { text: "56", feedback: "You removed all pairs on the line but forgot that the line itself still counts once." },
        { text: "66", feedback: "The 10 pairs on the common line all give one and the same line." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-6-q6",
      variant: "mastery",
      question: "How many positive divisors does 540 have?",
      options: [
        { text: "24", correct: true, feedback: "$540 = 2^2 \\times 3^3 \\times 5$, so $(2+1)(3+1)(1+1) = 24$." },
        { text: "6", feedback: "That multiplies the exponents $2 \\times 3 \\times 1$. Each needs $+1$ for 'take none'." },
        { text: "18", feedback: "That uses $3^2$. Since $540 = 4 \\times 135$ and $135 = 27 \\times 5$, the power of 3 is 3, giving $(2+1)(3+1)(1+1) = 24$." },
        { text: "12", feedback: "One prime factor is missing or undercounted — $540 = 2^2 \\cdot 3^3 \\cdot 5$." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-6-q7",
      variant: "mastery",
      question: "If $^nC_7 = {}^nC_5$, find $^nC_2$.",
      options: [
        { text: "66", correct: true, feedback: "$7 \\ne 5$, so $n = 7 + 5 = 12$ and $^{12}C_2 = 66$." },
        { text: "1", feedback: "That comes from $n = 7 - 5 = 2$, giving ${}^2C_2 = 1$. When the bottoms differ, they must add to $n$: $n = 12$." },
        { text: "78", feedback: "That is $^{13}C_2$; $n = 7 + 5 = 12$." },
        { text: "12", feedback: "That is $n$ itself. The question asks for ${}^{12}C_2 = 66$." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-6-q8",
      variant: "mastery",
      question: "A regular polygon has 54 diagonals. How many sides does it have?",
      options: [
        { text: "12", correct: true, feedback: "$\\frac{n(n-3)}{2} = 54 \\Rightarrow n^2 - 3n - 108 = 0 \\Rightarrow (n-12)(n+9) = 0$, so $n = 12$." },
        { text: "11", feedback: "An 11-gon has $\\frac{11 \\times 8}{2} = 44$ diagonals." },
        { text: "9", feedback: "A 9-gon has $\\frac{9 \\times 6}{2} = 27$ diagonals. The quadratic's other root is $-9$; dropping its sign does not give a valid answer." },
        { text: "108", feedback: "That's $2 \\times 54$, which is $n(n-3)$, not $n$." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-6-q9",
      variant: "mastery",
      question: "From 6 different books, 3 are chosen and placed in a row on a shelf. How many arrangements are possible?",
      options: [
        { text: "120", correct: true, feedback: "Choose then arrange: $^6C_3 \\times 3! = 20 \\times 6 = 120 = {}^6P_3$." },
        { text: "20", feedback: "That only chooses the books; a row on a shelf has an order." },
        { text: "720", feedback: "That is $6!$ — arranging all six books, not three." },
      ],
    },
    {
      type: "quiz",
      id: "pc2-6-q10",
      variant: "mastery",
      question: "Simplify $^{10}C_4 + 2\\,{}^{10}C_3 + {}^{10}C_2$.",
      options: [
        { text: "$^{12}C_4 = 495$", correct: true, feedback: "Pascal twice: $({}^{10}C_4 + {}^{10}C_3) + ({}^{10}C_3 + {}^{10}C_2) = {}^{11}C_4 + {}^{11}C_3 = {}^{12}C_4$. Check: $210 + 240 + 45 = 495$." },
        { text: "$^{11}C_4 = 330$", feedback: "That uses Pascal's rule once. There is a second layer." },
        { text: "$^{12}C_3 = 220$", feedback: "The bottom index stays at the largest one, 4." },
        { text: "$^{30}C_9$", feedback: "Pascal's rule does not add the top or bottom indices together." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "You can now choose, restrict and choose-then-arrange. Chapter 3 finishes the toolkit: dividing people into groups, sharing identical sweets among children (stars and bars), and a decision table for picking the right model under exam pressure.",
    },
  ]),
};

export const pncChapter2Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
