import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Permutations, Combinations & the Binomial Theorem — Chapter 1:
 * Permutations: Arranging Things.
 * Every arrangement formula (nPr, n^r, identical objects, circular,
 * together/apart, dictionary rank) comes from the slot picture plus one
 * correction: divide out the arrangements that look the same.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "arranging-r-of-n",
  title: "1.1 · Arranging r out of n",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pc-1-permutations.mp4",
      poster: "/videos/pc-1-permutations.jpg",
      title: "Chapter 1 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Eight runners line up for a race. Only three of them will stand on the podium: gold, silver, bronze. How many different podiums are possible?\n\nYou already have the tool from Chapter 0: the slot picture. Draw three slots, one per medal, and fill them in order.",
    },
    {
      type: "math",
      latex:
        "\\underset{\\text{gold}}{\\boxed{8}} \\times \\underset{\\text{silver}}{\\boxed{7}} \\times \\underset{\\text{bronze}}{\\boxed{6}} = 336",
    },
    {
      type: "text",
      content:
        "Gold can go to any of 8 runners. Whoever won gold cannot also win silver, so silver has 7 candidates, and bronze has 6. The *set* of candidates changes depending on who won gold, but the *number* of candidates is always 7, and that is all the product rule needs.",
    },
    {
      type: "text",
      content:
        "Before trusting this, shrink the problem until you can list every case. Take 4 letters A, B, C, D and fill 2 slots. The slot picture predicts $4 \\times 3 = 12$. Here they all are:",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "B", "C", "D"],
        r: 2,
        showSlots: true,
        caption:
          "Every ordered pair of different letters. AB and BA are both listed: in an arrangement, order matters. Count them: 12, exactly what the slots predicted.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Permutation",
      content:
        "A **permutation** of $r$ objects chosen from $n$ distinct objects is an ordered arrangement of $r$ of them in a row, with no object used twice. The number of such arrangements is written ${}^{n}P_{r}$ (also $P(n, r)$ or $_nP_r$).",
    },
    {
      type: "text",
      content:
        "**Deriving the formula.** With $r$ slots, the first has $n$ choices, the second $n - 1$, and so on. Slot $k$ has lost $k - 1$ objects to the earlier slots, so it has $n - (k-1)$ choices. The last slot, $k = r$, has $n - r + 1$:",
    },
    {
      type: "math",
      latex: "{}^{n}P_{r} = n(n-1)(n-2)\\cdots(n-r+1) \\qquad (r \\text{ factors})",
    },
    {
      type: "text",
      content:
        "That product is the front of $n!$ with the tail cut off. Multiply and divide by the missing tail, $(n-r)!$, and it becomes a neat ratio:",
    },
    {
      type: "math",
      latex:
        "{}^{n}P_{r} = \\frac{n(n-1)\\cdots(n-r+1)\\,\\cdot\\,(n-r)!}{(n-r)!} = \\frac{n!}{(n-r)!}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Two forms, two jobs",
      content:
        "Use the **product form** to compute: ${}^{10}P_{3} = 10 \\cdot 9 \\cdot 8 = 720$. Nobody should write out $10!$ to do that.\nUse the **factorial form** to do algebra and to check edge cases: ${}^{n}P_{n} = \\frac{n!}{0!} = n!$ (arrange everything), and ${}^{n}P_{0} = \\frac{n!}{n!} = 1$ (one way to arrange nothing). This is exactly why $0! = 1$ was the right definition in Chapter 0.",
    },
    {
      type: "table",
      headers: ["Expression", "Product form", "Value"],
      rows: [
        ["${}^{4}P_{2}$", "$4 \\cdot 3$", "12"],
        ["${}^{8}P_{3}$", "$8 \\cdot 7 \\cdot 6$", "336"],
        ["${}^{5}P_{5}$", "$5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1$", "120"],
        ["${}^{10}P_{3}$", "$10 \\cdot 9 \\cdot 8$", "720"],
        ["${}^{n}P_{1}$", "$n$", "$n$"],
        ["${}^{n}P_{0}$", "(empty product)", "1"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1.** How many 4-letter strings (meaningful or not) can be made from the letters of LOGARITHM, using each letter at most once?\n\n**Step 1 — check the letters are distinct.** L, O, G, A, R, I, T, H, M: nine different letters.\n**Step 2 — slots.** Four slots, no repetition, order matters (LOGA and GOLA are different strings).\n**Step 3 — count.** ${}^{9}P_{4} = 9 \\cdot 8 \\cdot 7 \\cdot 6 = 3024$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** How many 3-digit numbers have three different digits?\n\n**Step 1 — spot the restricted slot.** The hundreds digit cannot be 0, so fill it first (the habit from lesson 0.5): 9 choices.\n**Step 2 — the rest.** The tens digit can be anything except the digit already used, and 0 is now allowed: 9 choices. The units digit: 8 choices.\n**Step 3 — multiply.** $9 \\times 9 \\times 8 = 648$.\n\nNotice this is *not* ${}^{10}P_{3} = 720$. The formula counts arrangements of free slots; the leading-zero rule breaks that symmetry, and $720 - 648 = 72$ is exactly the number of strings starting with 0 (that is $1 \\times 9 \\times 8$).",
    },
    {
      type: "text",
      content:
        "**Application — railway tickets.** A railway line has 12 stations. A ticket is printed for every journey from one station to a *different* station, and it names both the start and the destination. How many different tickets must be printed?\n\n**Step 1 — does order matter?** Yes: a Pune → Mumbai ticket is useless for Mumbai → Pune. *Why this step:* \"order matters\" is the signal that you are counting arrangements, not selections.\n**Step 2 — slots.** Slot 1 is the start: 12 choices. Slot 2 is the destination: any station except the start, so 11 choices.\n**Step 3 — count.**",
    },
    {
      type: "math",
      latex: "{}^{12}P_{2} = 12 \\times 11 = 132",
    },
    {
      type: "text",
      content:
        "**Small-case check.** With 3 stations A, B, C the tickets are AB, AC, BA, BC, CA, CB, which is ${}^{3}P_{2} = 6$. ✓ If the railway printed one ticket per *pair* of stations, valid both ways, the count would halve to 66. That is a Chapter 2 question.",
    },
    {
      type: "text",
      content:
        "**Exam-style — divisible by 5.** How many 4-digit numbers with all digits different are divisible by 5?\n\n**Step 1 — find the restricted slots.** The units digit must be 0 or 5. The thousands digit cannot be 0. *Why split into cases:* the two restrictions interact. If the units digit is 0, then 0 is already used and the thousands digit has 9 options; if it is 5, the thousands digit has only 8 (not 0, not 5). The product rule needs a fixed number of choices per slot, so split on the units digit.\n**Case 1 — units digit 0.** Thousands: 9 (digits 1–9). Hundreds: 8 left. Tens: 7 left.",
    },
    {
      type: "math",
      latex:
        "\\text{Case 1: } \\underset{\\text{th}}{9} \\times \\underset{\\text{h}}{8} \\times \\underset{\\text{t}}{7} \\times \\underset{\\text{u}}{1} = 504",
    },
    {
      type: "text",
      content:
        "**Case 2 — units digit 5.** Thousands: not 0 and not 5, so 8 choices. Hundreds: any of the 8 unused digits (0 is allowed again here). Tens: 7.",
    },
    {
      type: "math",
      latex:
        "\\text{Case 2: } \\underset{\\text{th}}{8} \\times \\underset{\\text{h}}{8} \\times \\underset{\\text{t}}{7} \\times \\underset{\\text{u}}{1} = 448",
    },
    {
      type: "text",
      content:
        "**Step 4 — add.** A number ends in 0 or in 5, never both, so the cases don't overlap: $504 + 448 = 952$.\n\n**Cross-check.** The tempting one-liner \"units: 2 choices, then $9 \\times 8 \\times 7$\" gives $1008$. It overcounts by the strings in Case 2 that start with 0, of the form 0 _ _ 5: $1 \\times 8 \\times 7 = 56$ of them. $1008 - 56 = 952$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — solving for $n$.** If ${}^{n}P_{4} = 20 \\cdot {}^{n}P_{2}$, find $n$.\n\n**Step 1 — write both as products.** $n(n-1)(n-2)(n-3) = 20\\,n(n-1)$.\n**Step 2 — cancel the common front.** $n(n-1) \\neq 0$ (we need $n \\geq 4$), so $(n-2)(n-3) = 20$.\n**Step 3 — spot consecutive integers.** $20 = 5 \\times 4$, so $n - 2 = 5$ and $n = 7$.\n**Step 4 — check.** ${}^{7}P_{4} = 840$ and $20 \\cdot {}^{7}P_{2} = 20 \\cdot 42 = 840$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — a particular letter always in, or always out.** Take 4-letter arrangements of the letters of LOGARITHM again (${}^{9}P_{4} = 3024$ in all).\n\n**(a) L never appears.** Delete L from the menu. Four slots are filled from the other 8 letters: ${}^{8}P_{4} = 8 \\cdot 7 \\cdot 6 \\cdot 5 = 1680$.\n**(b) L always appears.** First decide *where* L goes: 4 choices of slot. The other 3 slots are filled from the remaining 8 letters, in order: ${}^{8}P_{3} = 336$. Total $4 \\times 336 = 1344$.\n**(c) Check.** Every arrangement either uses L or doesn't: $1344 + 1680 = 3024$. ✓\n\nIn general, among arrangements of $r$ out of $n$ distinct objects, those that **always include** a particular object number $r \\cdot {}^{n-1}P_{r-1}$, and those that **never include** it number ${}^{n-1}P_{r}$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Optional: a recurrence by counting two ways",
      content:
        "Worked example 4 split all arrangements into \"uses the special object\" and \"doesn't\". Nothing overlaps and nothing is missed, so the two counts must add up to the total:\n${}^{n}P_{r} = {}^{n-1}P_{r} + r \\cdot {}^{n-1}P_{r-1}.$\nThat is a proof with no algebra: one set counted two ways. (You can also check it with factorials: the right side is $\\frac{(n-1)!}{(n-1-r)!}\\left(1 + \\frac{r}{n-r}\\right) = \\frac{(n-1)!\\,n}{(n-r)!} = \\frac{n!}{(n-r)!}$.) For $n = 9$, $r = 4$: $1680 + 1344 = 3024$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (JEE extension) — the sum of all the numbers.** Find the sum of all 4-digit numbers formed from the digits 1, 2, 3, 4, each used once.\n\n**Step 1 — how many numbers?** $4! = 24$. Adding 24 numbers by hand is possible but slow, and it doesn't scale.\n**Step 2 — add column by column.** Look only at the units column. How often does the digit 4 sit there? Fix 4 in the units place and arrange the other 3 digits: $3! = 6$ times. The same holds for 1, 2 and 3. So the units column adds up to $6 \\times (1 + 2 + 3 + 4) = 60$.\n**Step 3 — every column is the same.** The tens, hundreds and thousands columns also add up to 60 each, but they are worth 10, 100 and 1000.\n**Step 4 — combine.** $60 \\times (1000 + 100 + 10 + 1) = 60 \\times 1111 = 66\\,660$.\n\nGeneral pattern (distinct nonzero digits, all used): sum $= (n-1)! \\times (\\text{sum of digits}) \\times \\underbrace{11\\ldots1}_{n}$. Sanity check with 2 digits: 12 + 21 = 33 = $1! \\cdot 3 \\cdot 11$. ✓",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Small-case check, always",
      content:
        "Before trusting any formula on a big problem, run it on one you can list. ${}^{3}P_{2}$ should be $3 \\cdot 2 = 6$: AB, AC, BA, BC, CA, CB. Six. If your formula had given 3, you would know it was counting *selections*, not arrangements. That is Chapter 2.",
    },
    {
      type: "quiz",
      id: "pc1-1-q1",
      variant: "practice",
      question:
        "A club of 12 members must elect a president, a secretary and a treasurer (three different people). In how many ways can this be done?",
      options: [
        { text: "$1320$", correct: true, feedback: "${}^{12}P_{3} = 12 \\cdot 11 \\cdot 10 = 1320$. The posts are different, so order matters." },
        { text: "$220$", feedback: "That is the number of ways to pick 3 people without giving them posts — you divided by $3!$ when order matters here." },
        { text: "$1728$", feedback: "That is $12^3$, which lets one person hold all three posts." },
        { text: "$36$", feedback: "$12 \\times 3$ does not come from any slot picture. Three slots means three factors." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-1-q2",
      variant: "practice",
      question: "If ${}^{n}P_{2} = 56$, what is $n$?",
      options: [
        { text: "$8$", correct: true, feedback: "$n(n-1) = 56 = 8 \\cdot 7$, so $n = 8$." },
        { text: "$7$", feedback: "${}^{7}P_{2} = 7 \\cdot 6 = 42$." },
        { text: "$28$", feedback: "You halved 56. ${}^{n}P_{2}$ is $n(n-1)$, a product of two consecutive integers." },
        { text: "$\\sqrt{56}$", feedback: "$n$ must be a whole number; look for two consecutive integers multiplying to 56." },
      ],
      hint: "Write ${}^{n}P_{2}$ as a product of two consecutive integers.",
    },
    {
      type: "quiz",
      id: "pc1-1-q3",
      variant: "concept",
      question: "Which of these is **not** equal to ${}^{6}P_{6}$?",
      options: [
        { text: "${}^{6}P_{0}$", correct: true, feedback: "${}^{6}P_{0} = \\frac{6!}{6!} = 1$: there is one way to arrange nothing. ${}^{6}P_{6} = 720$." },
        { text: "$6!$", feedback: "Arranging all 6 is exactly $6!$ — this one is equal." },
        { text: "${}^{6}P_{5}$", feedback: "${}^{6}P_{5} = \\frac{6!}{1!} = 720$ too. Once five slots are filled, the last object has only one place to go." },
        { text: "$\\dfrac{6!}{0!}$", feedback: "That is the factorial form of ${}^{6}P_{6}$ with $0! = 1$ — equal." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-1-q4",
      variant: "practice",
      question: "If ${}^{n}P_{4} = 12 \\cdot {}^{n}P_{2}$, what is $n$?",
      options: [
        { text: "$6$", correct: true, feedback: "Cancel $n(n-1)$: $(n-2)(n-3) = 12 = 4 \\cdot 3$, so $n = 6$. Check: $360 = 12 \\cdot 30$." },
        { text: "$5$", feedback: "Then $(n-2)(n-3) = 3 \\cdot 2 = 6$, not 12." },
        { text: "$7$", feedback: "Then $(n-2)(n-3) = 5 \\cdot 4 = 20$, not 12." },
        { text: "$4$", feedback: "Then $(n-2)(n-3) = 2$, far short of 12." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-1-q5",
      variant: "concept",
      question:
        "How many 3-digit numbers with all digits different can be formed from the digits 0 to 9?",
      options: [
        { text: "$648$", correct: true, feedback: "Hundreds first (not 0): 9, then 9, then 8. $9 \\cdot 9 \\cdot 8 = 648$." },
        { text: "$720$", feedback: "${}^{10}P_{3}$ includes strings like 045, which are not 3-digit numbers." },
        { text: "$504$", feedback: "That is $9 \\cdot 8 \\cdot 7$ — you banned 0 from every place, not just the first." },
      ],
      hint: "Fill the restricted slot first.",
    },
    {
      type: "quiz",
      id: "pc1-1-q6",
      variant: "practice",
      question:
        "From 10 different books, 3 are arranged in a row on a shelf. In how many of these arrangements does one particular book, *Gitanjali*, appear?",
      options: [
        { text: "$216$", correct: true, feedback: "Choose Gitanjali's place (3 ways), then fill the other 2 places from the other 9 books: ${}^{9}P_{2} = 72$. $3 \\times 72 = 216$. Check: ${}^{9}P_{3} = 504$ leave it out, and $216 + 504 = 720 = {}^{10}P_{3}$." },
        { text: "$72$", feedback: "That's ${}^{9}P_{2}$ with Gitanjali stuck in one fixed place. It can be in any of the 3 places." },
        { text: "$504$", feedback: "That's ${}^{9}P_{3}$, the arrangements that *leave Gitanjali out*." },
        { text: "$720$", feedback: "That's all ${}^{10}P_{3}$ arrangements, with or without Gitanjali." },
      ],
      hint: "Place the special book first, then fill the remaining places.",
    },
    {
      type: "quiz",
      id: "pc1-1-q7",
      variant: "practice",
      question:
        "What is the sum of all 3-digit numbers formed from the digits 2, 4, 6, each used exactly once?",
      options: [
        { text: "$2664$", correct: true, feedback: "Each digit sits in each column $2! = 2$ times, so each column adds up to $2 \\times 12 = 24$. Total $24 \\times 111 = 2664$." },
        { text: "$1332$", feedback: "That's $12 \\times 111$: you counted each digit once per column. With 3 digits, each digit appears in a given column $2! = 2$ times." },
        { text: "$3996$", feedback: "That's $3! \\times 12 \\times 111$. Fixing one digit in a column leaves only 2 digits to arrange, so each digit appears there $2!$ times, not $3!$." },
        { text: "$24$", feedback: "That's only the units column. The tens and hundreds columns also add up to 24, but they're worth 10 and 100: $24 \\times 111$." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-1-q8",
      variant: "practice",
      question:
        "How many **even** 3-digit numbers have all three digits different?",
      options: [
        { text: "$328$", correct: true, feedback: "Split on the units digit. Units 0: hundreds 9, tens 8, giving 72. Units 2, 4, 6 or 8: hundreds 8 (not 0, not the units digit), tens 8, giving $4 \\times 64 = 256$. Total $72 + 256 = 328$." },
        { text: "$360$", feedback: "$5 \\times 9 \\times 8$ fills the units first but lets the hundreds digit be 0 when the units digit is 2, 4, 6 or 8. Those $4 \\times 8 = 32$ strings aren't 3-digit numbers: $360 - 32 = 328$." },
        { text: "$320$", feedback: "$5 \\times 8 \\times 8$ treats units 0 like the others. When the units digit is 0, the hundreds digit has 9 choices, not 8." },
        { text: "$256$", feedback: "That's only the numbers ending in 2, 4, 6 or 8. Numbers ending in 0 (72 of them) are even too." },
      ],
      hint: "Two restricted slots that interact: split into cases on the units digit.",
    },
    {
      type: "quiz",
      id: "pc1-1-q9",
      variant: "practice",
      question:
        "A bus route has 15 stops. A ticket shows the boarding stop and a different alighting stop. How many different tickets are possible?",
      options: [
        { text: "$210$", correct: true, feedback: "Start: 15 choices, destination: 14. ${}^{15}P_{2} = 210$. Direction matters, so this is an arrangement." },
        { text: "$105$", feedback: "That's one ticket per *pair* of stops. A ticket from stop 3 to stop 9 is not the same as one from 9 to 3." },
        { text: "$225$", feedback: "$15^2$ includes tickets from a stop to itself." },
        { text: "$29$", feedback: "$15 + 14$ adds the slot choices. Filling two slots in turn means multiplying." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "repetition-allowed",
  title: "1.2 · When Repetition Is Allowed",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A phone lock asks for a 4-digit PIN. Nothing stops you from choosing 7 7 0 7. Using a digit does not take it away. So every slot sees the full menu of 10 digits:",
    },
    {
      type: "math",
      latex: "\\boxed{10} \\times \\boxed{10} \\times \\boxed{10} \\times \\boxed{10} = 10^4 = 10\\,000",
    },
    {
      type: "text",
      content:
        "Compare that with 1.1, where each slot had one fewer choice than the previous one. With repetition, the choices never shrink. Watch the tree for 3-letter strings over the alphabet {A, B, C}: every node splits into the same 3 branches.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "product",
        stages: [
          { label: "Letter 1", options: ["A", "B", "C"] },
          { label: "Letter 2", options: ["A", "B", "C"] },
          { label: "Letter 3", options: ["A", "B", "C"] },
        ],
        highlightPath: ["B", "B", "A"],
        caption:
          "Each level has all three letters again, so the leaves grow 3, 9, 27. The highlighted path BBA reuses B, which is allowed here.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Arrangements with repetition",
      content:
        "The number of ways to fill $r$ ordered slots when each slot can be any of $n$ objects (repeats allowed) is $n^r$. **The base is the number of choices per slot; the exponent is the number of slots.**",
    },
    {
      type: "text",
      content:
        "Drag the number of available symbols $n$ and watch how fast the number of 4-symbol codes grows. Digits give $10^4$; lowercase letters give $26^4$.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "x^4",
        exprLatex: "n^4",
        min: 1,
        max: 26,
        step: 1,
        initial: 10,
        inputLabel: "Symbols available (n)",
        outputLabel: "4-symbol codes",
      },
    },
    {
      type: "table",
      headers: ["", "Without repetition", "With repetition"],
      rows: [
        ["Slot 1", "$n$", "$n$"],
        ["Slot 2", "$n - 1$", "$n$"],
        ["Slot $r$", "$n - r + 1$", "$n$"],
        ["Total", "${}^{n}P_{r} = \\dfrac{n!}{(n-r)!}$", "$n^r$"],
        ["Needs $r \\leq n$?", "Yes — you run out of objects", "No — $r$ can be anything"],
        ["4-digit PIN", "${}^{10}P_{4} = 5040$", "$10^4 = 10\\,000$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1 — at least one repeat.** How many 4-digit PINs have at least one repeated digit?\n\n**Step 1 — complement.** \"At least one repeat\" is everything except \"all different\" (lesson 0.3).\n**Step 2 — count both.** All PINs: $10^4 = 10\\,000$. All different: ${}^{10}P_{4} = 5040$.\n**Step 3 — subtract.** $10\\,000 - 5040 = 4960$. Almost half of all PINs repeat a digit.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — functions.** How many functions are there from $A = \\{1, 2, 3\\}$ to $B = \\{p, q\\}$?\n\n**Step 1 — what is being chosen?** A function assigns each element of $A$ one output in $B$. So each element of $A$ is a slot.\n**Step 2 — choices per slot.** Each slot picks from the 2 elements of $B$, and different inputs may share an output.\n**Step 3 — count.** $2 \\times 2 \\times 2 = 2^3 = 8$.\n\nIn general, from an $r$-element set to an $n$-element set there are $n^r$ functions. If the function must be one-one (no two inputs share an output), the outputs cannot repeat and the count drops to ${}^{n}P_{r}$.",
    },
    {
      type: "text",
      content:
        "**Application — number plates, both rules at once.** A state issues plates made of two letters followed by four digits, such as MH 0427. How many plates are possible (a) with no restriction, (b) if the two letters must be different?\n\n**Step 1 — six slots.** Two letter slots with 26 options each, then four digit slots with 10 options each. *Why the product rule still works:* letters and digits come from separate menus, so a choice in one kind of slot never changes the options in the other kind.\n**(a) Repetition everywhere.**",
    },
    {
      type: "math",
      latex: "26^2 \\times 10^4 = 676 \\times 10\\,000 = 6\\,760\\,000",
    },
    {
      type: "text",
      content:
        "**(b) Letters different, digits still free.** Only the second letter slot shrinks, to 25 choices.",
    },
    {
      type: "math",
      latex: "26 \\times 25 \\times 10^4 = 650 \\times 10\\,000 = 6\\,500\\,000",
    },
    {
      type: "text",
      content:
        "Decide **slot by slot** whether that slot's menu shrinks. The difference, $260\\,000 = 26 \\times 10^4$, is exactly the plates with a doubled letter such as AA 1234: 26 doubled pairs, each with $10^4$ digit strings.",
    },
    {
      type: "text",
      content:
        "**Exam-style — numbers below 1000.** How many positive integers less than 1000 can be formed using the digits 0, 1, 2, 3, 4, 5, with repetition allowed?\n\n**Method 1 — split by length.** *Why split:* numbers of different lengths have different leading-digit rules. 1-digit: 1 to 5, so 5. 2-digit: first digit 5 choices (not 0), second 6: $5 \\times 6 = 30$. 3-digit: $5 \\times 6 \\times 6 = 180$. Total $5 + 30 + 180 = 215$.\n\n**Method 2 — pad with zeros.** Write every such number with exactly 3 digits: 7 becomes 007, 42 becomes 042. *Why this is allowed:* each number from 0 to 555 has exactly one padded form, and each 3-digit string over {0, …, 5} is the padded form of exactly one of them. Now every slot has all 6 digits. Count the strings, then drop 000, which isn't positive:",
    },
    {
      type: "math",
      latex: "6^3 - 1 = 216 - 1 = 215",
    },
    {
      type: "text",
      content:
        "Two independent methods agree, which is the best check there is. Padding turns a messy problem with a leading-digit rule into a clean $n^r$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: is it $r^n$ or $n^r$?",
      content:
        "Students swap base and exponent constantly. Don't memorise the letters; ask **\"who is choosing?\"** Each chooser is a slot, so the number of choosers is the exponent. The number of options each chooser has is the base.\n\n5 letters into 3 postboxes: each *letter* chooses a postbox. 5 choosers, 3 options each: $3^5 = 243$. It is not $5^3 = 125$, which would be each postbox choosing one letter, and postboxes do not choose.",
    },
    {
      type: "quiz",
      id: "pc1-2-q1",
      variant: "concept",
      question:
        "In how many ways can 5 different letters be posted into 3 postboxes (any postbox can take any number of letters)?",
      options: [
        { text: "$3^5 = 243$", correct: true, feedback: "Each of the 5 letters independently picks one of 3 boxes: five slots, three options each." },
        { text: "$5^3 = 125$", feedback: "That would have each postbox choose one letter, but a box can hold several letters or none. The letters are the choosers." },
        { text: "${}^{5}P_{3} = 60$", feedback: "That arranges 3 of the 5 letters with no repeats. Here many letters can share a box." },
        { text: "$15$", feedback: "$5 \\times 3$ adds up options instead of multiplying across choosers." },
      ],
      hint: "Ask who is choosing, and from how many options.",
    },
    {
      type: "quiz",
      id: "pc1-2-q2",
      variant: "practice",
      question:
        "How many 3-digit numbers can be formed from the digits 1, 2, 3, 4, 5 if repetition is allowed?",
      options: [
        { text: "$125$", correct: true, feedback: "No zero here, so no restricted slot: $5^3 = 125$." },
        { text: "$60$", feedback: "That is ${}^{5}P_{3}$, the count without repetition." },
        { text: "$243$", feedback: "That is $3^5$ — base and exponent swapped. Three slots, five options each." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-2-q3",
      variant: "practice",
      question:
        "Three prizes (first, second, third in a quiz) are to be given to 4 students, and one student may win more than one prize. In how many ways?",
      options: [
        { text: "$4^3 = 64$", correct: true, feedback: "Each *prize* picks a winner from 4 students: three choosers, four options." },
        { text: "$3^4 = 81$", feedback: "That has each student pick a prize, but a student may win none. The prizes are the ones that must each go somewhere." },
        { text: "${}^{4}P_{3} = 24$", feedback: "That forbids one student winning two prizes, which the question allows." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-2-q4",
      variant: "practice",
      question:
        "How many functions are there from a set with 4 elements to a set with 5 elements, and how many of them are one-one?",
      options: [
        { text: "$625$ functions, $120$ one-one", correct: true, feedback: "All functions: $5^4 = 625$. One-one: outputs can't repeat, so ${}^{5}P_{4} = 120$." },
        { text: "$1024$ functions, $120$ one-one", feedback: "$4^5 = 1024$ has base and exponent swapped: each of the 4 inputs picks from 5 outputs." },
        { text: "$625$ functions, $5$ one-one", feedback: "One-one functions are arrangements of 4 distinct outputs out of 5: ${}^{5}P_{4}$." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-2-q5",
      variant: "practice",
      question:
        "How many 3-letter codes (from the 26 capital letters) contain at least one repeated letter?",
      options: [
        { text: "$1976$", correct: true, feedback: "All codes $26^3 = 17\\,576$, all-different ${}^{26}P_{3} = 15\\,600$; difference $1976$." },
        { text: "$15\\,600$", feedback: "That counts codes with *no* repeat. Subtract it from the total." },
        { text: "$1950$", feedback: "That's $26 \\cdot 25 \\cdot 3$, the codes where exactly two letters match. You missed the 26 codes like AAA where all three match. Total minus all-different catches every pattern at once." },
        { text: "$17\\,576$", feedback: "That's all $26^3$ codes. Subtract the $15\\,600$ codes with no repeat." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-2-q6",
      variant: "practice",
      question:
        "How many positive integers less than $10\\,000$ can be formed using the digits 0, 1, 2, 3, 4 (repetition allowed)?",
      options: [
        { text: "$624$", correct: true, feedback: "Pad to 4 digits: $5^4 = 625$ strings, minus 0000. By length: $4 + 20 + 100 + 500 = 624$. ✓" },
        { text: "$625$", feedback: "That counts the padded string 0000, which is 0 and not positive." },
        { text: "$500$", feedback: "$4 \\times 5^3$ counts only the 4-digit numbers. Smaller numbers like 7 or 42 are also less than $10\\,000$." },
        { text: "$256$", feedback: "$4^4$ bans 0 from every place. 0 is fine anywhere except as a leading digit." },
      ],
      hint: "Pad every number with leading zeros to 4 digits.",
    },
    {
      type: "quiz",
      id: "pc1-2-q7",
      variant: "practice",
      question:
        "A plate has three letters, all different, followed by three digits (digits may repeat). How many plates are possible?",
      options: [
        { text: "$15\\,600\\,000$", correct: true, feedback: "Letters shrink, digits don't: ${}^{26}P_{3} \\times 10^3 = 15\\,600 \\times 1000$." },
        { text: "$17\\,576\\,000$", feedback: "$26^3 \\times 10^3$ lets letters repeat. The letters must be different." },
        { text: "$11\\,232\\,000$", feedback: "$15\\,600 \\times 720$ forbids repeated digits too. Only the letters must differ." },
        { text: "$15\\,600$", feedback: "That covers the letters only. Each letter pattern pairs with $10^3$ digit strings." },
      ],
      hint: "Decide slot by slot whether the menu shrinks.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "identical-objects",
  title: "1.3 · Arranging with Identical Objects",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "How many different \"words\" can you make by rearranging A, A, B? Three distinct letters would give $3! = 6$. But list them and you only see three: AAB, ABA, BAA. Where did the other three go?",
    },
    {
      type: "text",
      content:
        "Paint the two A's different colours for a moment: call them A₁ and A₂. Now all six arrangements are genuinely different. Take the paint off, and pairs of them become the same word.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "A", "B"],
        groupBy: "identical",
        showLabels: true,
        caption:
          "With labels there are 6 arrangements. Each visible word, such as ABA, shows up twice: A₁BA₂ and A₂BA₁. 6 ÷ 2 = 3 words.",
      },
    },
    {
      type: "text",
      content:
        "Each word appears **exactly twice** because the two A's can be swapped in $2! = 2$ ways without changing what you see. The overcount is the same for every word, so you can divide. Now a bigger case: BANANA, with three A's and two N's.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["B", "A", "N", "A", "N", "A"],
        groupBy: "identical",
        showLabels: true,
        maxShown: 720,
        caption:
          "Tap any word: its whole class lights up. Each class has 3! × 2! = 12 labelled versions (shuffle the A's, shuffle the N's). 720 ÷ 12 = 60 words.",
      },
    },
    {
      type: "text",
      content:
        "**The derivation.** Suppose $n$ objects include $p$ identical copies of one kind, $q$ of another, and so on. Label every copy so they are all distinct: $n!$ arrangements. Now pick any one visible word. The labelled arrangements that look like it are exactly the ones you get by permuting the labels among the $p$ copies ($p!$ ways) and, independently, among the $q$ copies ($q!$ ways). So every visible word is counted $p!\\,q!$ times:",
    },
    {
      type: "math",
      latex: "n! = (\\text{number of words}) \\times p!\\,q! \\quad\\Longrightarrow\\quad \\text{number of words} = \\frac{n!}{p!\\,q!}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Permutations of a multiset",
      content:
        "The number of arrangements of $n$ objects, of which $p_1$ are alike of one kind, $p_2$ alike of a second kind, …, $p_k$ alike of a $k$-th kind (with $p_1 + p_2 + \\cdots + p_k = n$), is\n$\\frac{n!}{p_1!\\,p_2!\\cdots p_k!}.$\nObjects that appear only once contribute $1! = 1$, so they can be left out of the denominator.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — MISSISSIPPI.**\n\n**Step 1 — tally.** M ×1, I ×4, S ×4, P ×2. Total $1 + 4 + 4 + 2 = 11$. ✓\n**Step 2 — label and count.** $11! = 39\\,916\\,800$.\n**Step 3 — divide by the overcount.** Each word is counted $4!\\,4!\\,2! = 24 \\cdot 24 \\cdot 2 = 1152$ times.\n**Step 4 — answer.** $\\dfrac{11!}{4!\\,4!\\,2!} = \\dfrac{39\\,916\\,800}{1152} = 34\\,650$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — flags on a pole.** A signal is made by hanging 7 flags in a vertical line: 4 red, 2 blue, 1 green (flags of one colour look the same). How many signals?\n\n**Step 1.** 7 positions, colour counts 4, 2, 1.\n**Step 2.** $\\dfrac{7!}{4!\\,2!\\,1!} = \\dfrac{5040}{48} = 105$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — paths on a grid.** To walk from the corner $(0,0)$ to $(3,2)$ moving only right (R) or up (U), you make 3 R's and 2 U's in some order. Every path is a word like RRURU, and every such word is a path. So the number of paths is the number of arrangements of R, R, R, U, U:\n$\\frac{5!}{3!\\,2!} = 10.$\nThis reframing — a path is a word — comes back in Chapter 4 with Pascal's triangle.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — identical digits and a leading zero.** How many numbers greater than 1 000 000 can be formed from the digits 2, 3, 0, 3, 4, 2, 3 (each used exactly as often as listed)?\n\n**Step 1 — what does \"greater than 1 000 000\" mean here?** All seven digits are used, so every arrangement is a 7-digit string. It is a genuine 7-digit number (and so bigger than 1 000 000) exactly when it **doesn't start with 0**.\n**Step 2 — count all strings.** Tally: 2 ×2, 3 ×3, 0 ×1, 4 ×1. $\\dfrac{7!}{2!\\,3!} = \\dfrac{5040}{12} = 420$.\n**Step 3 — count the bad ones.** Put 0 first. The other six digits 2, 2, 3, 3, 3, 4 fill the rest: $\\dfrac{6!}{2!\\,3!} = \\dfrac{720}{12} = 60$.\n**Step 4 — subtract.** $420 - 60 = 360$.\n\nThe complement habit from Chapter 0 and the multiset formula work together: count everything, then remove the strings with a leading zero, using the multiset formula both times.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — INDEPENDENCE (exam-style).** Find the number of arrangements of the letters of INDEPENDENCE, and how many of them (b) start with P, (c) start with I and end with P, (d) start with E.\n\n**Step 1 — tally.** I ×1, N ×3, D ×2, E ×4, P ×1, C ×1. Check: $1 + 3 + 2 + 4 + 1 + 1 = 12$. ✓\n**(a) All arrangements.**",
    },
    {
      type: "math",
      latex: "\\frac{12!}{4!\\,3!\\,2!} = \\frac{479\\,001\\,600}{288} = 1\\,663\\,200",
    },
    {
      type: "text",
      content:
        "**(b) Starts with P.** Put P in the first place and re-tally what's left: I, N ×3, D ×2, E ×4, C, which is 11 letters. *Why re-tally:* fixing a letter removes it from the multiset, and the denominator must describe the letters still being arranged.",
    },
    {
      type: "math",
      latex: "\\frac{11!}{4!\\,3!\\,2!} = \\frac{39\\,916\\,800}{288} = 138\\,600",
    },
    {
      type: "text",
      content:
        "**(c) Starts with I and ends with P.** Both ends are fixed. The middle 10 places take N ×3, D ×2, E ×4, C: $\\dfrac{10!}{4!\\,3!\\,2!} = \\dfrac{3\\,628\\,800}{288} = 12\\,600$.\n\n**(d) Starts with E.** Now the fixed letter is one of the *repeated* ones. What's left is I, N ×3, D ×2, E ×3, P, C: only three E's remain, so the denominator changes from $4!$ to $3!$.",
    },
    {
      type: "math",
      latex: "\\frac{11!}{3!\\,3!\\,2!} = \\frac{39\\,916\\,800}{72} = 554\\,400",
    },
    {
      type: "text",
      content:
        "**Sanity check on (d).** 4 of the 12 letters are E, so about a third of all words should start with E: $\\frac{4}{12} \\times 1\\,663\\,200 = 554\\,400$. ✓ By the same reasoning, (b) should be $\\frac{1}{12}$ of the total, and $\\frac{1\\,663\\,200}{12} = 138\\,600$. ✓",
    },
    {
      type: "table",
      headers: ["Letters", "Tally", "Count"],
      rows: [
        ["AAB", "A2, B1", "$\\frac{3!}{2!} = 3$"],
        ["LETTER", "E2, T2, L1, R1", "$\\frac{6!}{2!\\,2!} = 180$"],
        ["BANANA", "A3, N2, B1", "$\\frac{6!}{3!\\,2!} = 60$"],
        ["ALLAHABAD", "A4, L2, H1, B1, D1", "$\\frac{9!}{4!\\,2!} = 7560$"],
        ["MISSISSIPPI", "I4, S4, P2, M1", "$\\frac{11!}{4!\\,4!\\,2!} = 34\\,650$"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: subtract the repeats",
      content:
        "A tempting shortcut is \"$3! = 6$, but two A's are the same, so subtract the duplicate: $6 - 1 = 5$\" or \"$6 - 2 = 4$\". Listing shows 3. Subtraction fails because the overcount is not a fixed number of extra words; it is a **factor**. Every word is repeated the same number of times ($2!$ here), so the fix is division. For BANANA, subtracting anything from 720 can't get you near 60.",
    },
    {
      type: "quiz",
      id: "pc1-3-q1",
      variant: "concept",
      question: "How many different arrangements are there of the letters of AAB?",
      options: [
        { text: "$3$", correct: true, feedback: "AAB, ABA, BAA. $\\frac{3!}{2!} = 3$: each word is produced twice by the labelled A's." },
        { text: "$5$", feedback: "Subtracting one duplicate from 6 undercorrects. Three words appear twice each, so three are duplicates." },
        { text: "$6$", feedback: "That treats the two A's as different. Swapping them doesn't change the word." },
        { text: "$4$", feedback: "Subtraction again. The overcount is a factor of $2!$, so divide." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-3-q2",
      variant: "practice",
      question: "How many arrangements are there of the letters of the word LETTER?",
      options: [
        { text: "$180$", correct: true, feedback: "E and T each appear twice: $\\frac{6!}{2!\\,2!} = \\frac{720}{4} = 180$." },
        { text: "$360$", feedback: "You divided by only one $2!$. Both E and T repeat." },
        { text: "$720$", feedback: "That treats all six letters as distinct." },
        { text: "$90$", feedback: "You divided by $2!$ three times, but L and R appear once each." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-3-q3",
      variant: "practice",
      question: "How many 6-digit numbers can be formed using the digits 1, 1, 2, 2, 2, 3 (each exactly as often as listed)?",
      options: [
        { text: "$60$", correct: true, feedback: "$\\frac{6!}{2!\\,3!} = \\frac{720}{12} = 60$. No zero, so no leading-digit problem." },
        { text: "$120$", feedback: "You divided by $3!$ only. The two 1's are also identical." },
        { text: "$720$", feedback: "That treats the repeated digits as different." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-3-q6",
      variant: "practice",
      question:
        "How many 6-digit numbers can be formed using all of the digits 0, 1, 1, 2, 2, 2?",
      options: [
        { text: "$50$", correct: true, feedback: "All strings: $\\frac{6!}{2!\\,3!} = 60$. Strings starting with 0: arrange 1, 1, 2, 2, 2 in $\\frac{5!}{2!\\,3!} = 10$ ways. $60 - 10 = 50$." },
        { text: "$60$", feedback: "That includes strings like 012212, which start with 0 and are really 5-digit numbers. Subtract them." },
        { text: "$600$", feedback: "$6! - 5!$ removes the leading zeros but treats the repeated 1's and 2's as different. Divide both counts by $2!\\,3!$." },
        { text: "$30$", feedback: "You subtracted $\\frac{5!}{2!\\,2!} = 30$. After a leading 0 the digits left are 1, 1, 2, 2, 2: two 1's and **three** 2's, so the bad strings number $\\frac{5!}{2!\\,3!} = 10$." },
      ],
      hint: "Count all arrangements, then subtract the ones that start with 0.",
    },
    {
      type: "quiz",
      id: "pc1-3-q4",
      variant: "practice",
      question:
        "In how many ways can you walk on a grid from $(0, 0)$ to $(4, 3)$ if each step goes one unit right or one unit up?",
      options: [
        { text: "$35$", correct: true, feedback: "A path is a word of 4 R's and 3 U's: $\\frac{7!}{4!\\,3!} = 35$." },
        { text: "$5040$", feedback: "$7!$ treats every step as distinct, but all R-steps look alike and so do all U-steps." },
        { text: "$12$", feedback: "$4 \\times 3$ multiplies the distances; the count is the number of orders of the moves." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-3-q5",
      variant: "concept",
      question:
        "Why is dividing by $p!\\,q!$ valid, rather than just a convenient guess?",
      options: [
        { text: "Every visible word is produced by exactly $p!\\,q!$ labelled arrangements, the same number for every word.", correct: true, feedback: "Equal-sized classes are what make division legitimate: total = (classes) × (class size)." },
        { text: "Because there are $p!\\,q!$ duplicate words in total.", feedback: "The duplicates aren't a fixed number of extra words; each word has $p!\\,q!$ copies. That's a factor, not a count to subtract." },
        { text: "Because identical letters can't be arranged, so they count as one letter.", feedback: "They can be arranged among themselves, and that invisible rearranging is exactly what produces the overcount." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-3-q7",
      variant: "practice",
      question: "How many arrangements of the letters of COMMITTEE begin with C?",
      options: [
        { text: "$5040$", correct: true, feedback: "Fix C. Left: O, M ×2, I, T ×2, E ×2, which is 8 letters: $\\frac{8!}{2!\\,2!\\,2!} = \\frac{40\\,320}{8} = 5040$." },
        { text: "$45\\,360$", feedback: "That's $\\frac{9!}{2!\\,2!\\,2!}$, every arrangement of COMMITTEE. Fixing C leaves only 8 letters to arrange." },
        { text: "$10\\,080$", feedback: "You divided by only two $2!$'s. M, T and E all appear twice among the remaining letters." },
        { text: "$40\\,320$", feedback: "$8!$ treats the repeated M's, T's and E's as different." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-3-q8",
      variant: "practice",
      question: "How many arrangements of the letters of COMMITTEE begin with M?",
      options: [
        { text: "$10\\,080$", correct: true, feedback: "Fix one M. Left: C, O, M, I, T ×2, E ×2: now only one M, so $\\frac{8!}{2!\\,2!} = 10\\,080$. Check: 2 of the 9 letters are M, and $\\frac{2}{9} \\times 45\\,360 = 10\\,080$. ✓" },
        { text: "$5040$", feedback: "You kept the $2!$ for the M's. After one M is placed first, only one M is left, so re-tally before dividing." },
        { text: "$20\\,160$", feedback: "You doubled for 'either M could go first', but the two M's are identical: starting with either one gives the same words." },
        { text: "$45\\,360$", feedback: "That's every arrangement of COMMITTEE, with no condition." },
      ],
      hint: "Fix the first letter, then re-tally what's left.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "circular-arrangements",
  title: "1.4 · Circular Arrangements",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Four friends A, B, C, D sit at a round table. Is \"A, B, C, D going clockwise\" different from \"B, C, D, A going clockwise\"? Look at the table: everyone has the same person on their left and the same person on their right. Nothing about the seating changed. We just started reading at a different chair.",
    },
    {
      type: "text",
      content:
        "So around a circle with unmarked seats, **rotations are the same arrangement**. List all $4! = 24$ line arrangements and bend each into a circle:",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "B", "C", "D"],
        mode: "circular",
        groupBy: "rotation",
        caption:
          "Each colour is one seating. ABCD, BCDA, CDAB and DABC are the same table turned, so each class has 4 members. 24 ÷ 4 = 6 = 3!.",
      },
    },
    {
      type: "text",
      content:
        "**Derivation 1 — divide.** Each circular seating of $n$ people can be read starting from any of its $n$ seats, giving $n$ different line arrangements. So every circular seating is counted $n$ times among the $n!$ lines:",
    },
    {
      type: "math",
      latex: "\\text{circular seatings} = \\frac{n!}{n} = (n-1)!",
    },
    {
      type: "text",
      content:
        "**Derivation 2 — fix a reference.** Sit A down first. Because the seats are unmarked, it doesn't matter where; A's chair simply *becomes* the reference point. Now the remaining $n-1$ seats are distinguishable (\"first seat clockwise from A\", \"second seat\", …) and they can be filled like a line: $(n-1)!$ ways. Both derivations agree, and the second one is the one you'll use for restricted problems.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Circular permutations",
      content:
        "$n$ distinct objects around a circle, where rotations count as the same arrangement but clockwise and anticlockwise orders are different: $(n-1)!$.\nIf flipping the circle over also gives the same arrangement (a necklace or garland, viewed from either side): $\\frac{(n-1)!}{2}$, for $n \\geq 3$.",
    },
    {
      type: "text",
      content:
        "**Necklaces.** People at a table have a left and a right, so the clockwise order A B C D is a different seating from the anticlockwise A D C B (A's left neighbour changes). But a necklace of beads can be picked up and turned over. Then each arrangement also equals its mirror image, and the classes double in size.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "B", "C", "D", "E"],
        mode: "circular",
        groupBy: "rotation-reflection",
        caption:
          "Five beads. Each class now holds 5 rotations × 2 sides = 10 line arrangements. 120 ÷ 10 = 12 = 4!/2.",
      },
    },
    {
      type: "text",
      content:
        "**Why it fails for $n \\leq 2$.** Halving assumes every arrangement is different from its mirror image, so they pair off. With 3 or more beads that's true. With 2 beads, the \"mirror image\" of A–B is A–B again: flipping it is just a rotation. Nothing pairs off, and $\\frac{(2-1)!}{2} = \\frac{1}{2}$ is not even a whole number. The answer for 1 or 2 beads is simply 1.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "B"],
        mode: "circular",
        groupBy: "rotation-reflection",
        caption: "Two beads: flipping is the same as rotating, so there is nothing to halve. One necklace.",
      },
    },
    {
      type: "text",
      content:
        "**Worked example 1 — two people together.** Six people sit at a round table. In how many ways can they sit if A and B must sit next to each other?\n\n**Step 1 — glue.** Tie A and B into one block. Now there are 5 units around the table: [AB], C, D, E, F.\n**Step 2 — arrange the units in a circle.** $(5-1)! = 24$.\n**Step 3 — arrange inside the block.** AB or BA: $2! = 2$.\n**Step 4 — multiply.** $24 \\times 2 = 48$.\n\n**Follow-up:** A and B *not* together: total $(6-1)! = 120$, minus 48, gives 72.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — alternating.** 5 boys and 5 girls sit at a round table so that no two boys are neighbours. How many ways?\n\n**Step 1 — seat the boys around the circle.** $(5-1)! = 4! = 24$. This fixes the rotation.\n**Step 2 — the gaps.** Between the 5 boys there are exactly 5 gaps, and they are now distinguishable because the boys are seated. Each gap gets one girl.\n**Step 3 — girls into gaps.** $5! = 120$. Note: *not* $4!$ — the rotation was already used up in Step 1.\n**Step 4 — multiply.** $24 \\times 120 = 2880$.",
    },
    {
      type: "table",
      headers: ["Situation", "Same arrangement if…", "Count"],
      rows: [
        ["$n$ people in a row", "never", "$n!$"],
        ["$n$ people at a round table", "rotated", "$(n-1)!$"],
        ["$n$ beads on a necklace, $n \\geq 3$", "rotated or flipped", "$\\frac{(n-1)!}{2}$"],
        ["$n$ people in **numbered** chairs around a table", "never (seats are labelled)", "$n!$"],
        ["$r$ of $n$ people at a round table", "rotated", "$\\frac{{}^{n}P_{r}}{r}$"],
      ],
    },
    {
      type: "text",
      content:
        "**Only some of the people sit down.** A round table has 3 seats and 4 people A, B, C, D want them. In a row there would be ${}^{4}P_{3} = 24$ ways. Around the circle, each seating can be read from any of its **3** seats (not 4: there are only 3 people at the table), so each seating is counted 3 times:",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "B", "C", "D"],
        r: 3,
        mode: "circular",
        groupBy: "rotation",
        caption:
          "24 ordered triples, grouped by rotation. ABC, BCA and CAB are one seating, so each class has 3 members: 24 ÷ 3 = 8.",
      },
    },
    {
      type: "math",
      latex: "\\text{seatings of } r \\text{ out of } n \\text{ around a circle} = \\frac{{}^{n}P_{r}}{r}",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — 6 of 10 at a round table.** Ten guests, but the round table has only 6 chairs. How many seatings?\n\n**Step 1 — as a row.** Choose and order 6 of the 10: ${}^{10}P_{6} = 10 \\cdot 9 \\cdot 8 \\cdot 7 \\cdot 6 \\cdot 5 = 151\\,200$.\n**Step 2 — divide by the rotations.** Each seating has 6 rotations (one per person *at the table*): $\\dfrac{151\\,200}{6} = 25\\,200$.\n\nCheck against the old formula: when $r = n$, $\\frac{{}^{n}P_{n}}{n} = \\frac{n!}{n} = (n-1)!$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — couples at dinner (application).** Four married couples sit at a round table so that every husband sits next to his wife. How many seatings?\n\n**Step 1 — glue each couple.** That gives 4 blocks. *Why glue:* \"next to\" is the together condition, and it works around a table just as it does in a row.\n**Step 2 — blocks around the circle.** $(4-1)! = 6$. Fixing one block uses up the rotations.\n**Step 3 — inside each block.** Each couple can sit as husband–wife or wife–husband, independently of the others: $2^4 = 16$.\n**Step 4 — multiply.**",
    },
    {
      type: "math",
      latex: "(4-1)! \\times 2^4 = 6 \\times 16 = 96",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — exactly one person between (JEE).** Eight people, including A and B, sit at a round table. In how many seatings is there exactly one person between A and B?\n\n**Step 1 — seat A.** *Why start here:* seating A uses up the rotation, and every other seat now has a name (\"1st clockwise from A\", \"2nd clockwise\", …).\n**Step 2 — place B.** Exactly one seat between them means B is 2nd clockwise or 2nd anticlockwise from A: 2 choices. With 8 seats these are different seats. They would be the same seat only at a table of 4.\n**Step 3 — the person in between.** Any of the other 6 people: 6 choices.\n**Step 4 — everyone else.** 5 people, 5 remaining named seats: $5! = 120$.",
    },
    {
      type: "math",
      latex: "\\underset{\\text{B's side}}{2} \\times \\underset{\\text{middle}}{6} \\times \\underset{\\text{rest}}{5!} = 1440",
    },
    {
      type: "text",
      content:
        "**Cross-check with a block.** Treat A–x–B as one block. Choose x: 6 ways. Order AxB or BxA: 2 ways. Now 1 block and 5 other people make 6 units around the table: $(6-1)! = 120$. Total $6 \\times 2 \\times 120 = 1440$. ✓ Two different methods, same answer.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: use $(n-1)!/2$ for every circle",
      content:
        "Only divide by 2 when clockwise and anticlockwise really are the same — that is, when the object can be flipped over (necklaces, garlands, rings of keys). People around a table cannot be flipped: in a mirror image each person's left and right neighbours swap, and that's a different seating. And if the seats are numbered, even rotations are different, so you don't divide at all.",
    },
    {
      type: "quiz",
      id: "pc1-4-q1",
      variant: "concept",
      question: "In how many ways can 6 people sit around a round table (rotations counted as the same)?",
      options: [
        { text: "$120$", correct: true, feedback: "$(6-1)! = 5! = 120$. Fix one person, arrange the other five." },
        { text: "$60$", feedback: "$\\frac{5!}{2}$ treats clockwise and anticlockwise as the same, which is true for a necklace, not for people." },
        { text: "$720$", feedback: "$6!$ counts each seating 6 times, once for every rotation." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-4-q2",
      variant: "practice",
      question: "How many different garlands can be made from 8 different flowers?",
      options: [
        { text: "$2520$", correct: true, feedback: "A garland can be turned over, so $\\frac{(8-1)!}{2} = \\frac{5040}{2} = 2520$." },
        { text: "$5040$", feedback: "That's $7!$, correct for people at a table. A garland also equals its mirror image, so halve it." },
        { text: "$40\\,320$", feedback: "$8!$ ignores both the rotations and the flip." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-4-q3",
      variant: "practice",
      question:
        "Seven people sit at a round table. Two of them refuse to sit next to each other. In how many ways can they be seated?",
      options: [
        { text: "$480$", correct: true, feedback: "Total $6! = 720$. Together: glue them, $(6-1)! \\cdot 2 = 240$. Apart: $720 - 240 = 480$." },
        { text: "$240$", feedback: "That is the number of seatings where they *are* together." },
        { text: "$600$", feedback: "You used $5! = 120$ for 'together' without the factor 2 for the order inside the block." },
        { text: "$3600$", feedback: "That's the answer for 7 people in a **row**: $7! - 6! \\cdot 2$. Around a table, fix one person first: $6! - 5! \\cdot 2$." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-4-q4",
      variant: "concept",
      question: "How many distinct necklaces can be made from 2 different beads?",
      options: [
        { text: "$1$", correct: true, feedback: "With two beads, flipping is the same as rotating, so there's nothing to pair off. One necklace." },
        { text: "$\\dfrac{1}{2}$", feedback: "That's the formula $\\frac{(n-1)!}{2}$ used outside its range. It assumes every arrangement differs from its mirror image, which fails for $n \\leq 2$." },
        { text: "$2$", feedback: "A–B and B–A are the same necklace; rotate it half a turn." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-4-q5",
      variant: "practice",
      question: "4 boys and 4 girls sit around a round table so that boys and girls alternate. How many ways?",
      options: [
        { text: "$144$", correct: true, feedback: "Boys around the circle: $3! = 6$. The 4 gaps are now distinct: girls in $4! = 24$ ways. $6 \\times 24 = 144$." },
        { text: "$36$", feedback: "$3! \\times 3!$ removes the rotation twice. Once the boys are seated, the gaps are fixed, so the girls get $4!$." },
        { text: "$1152$", feedback: "$2 \\cdot 4! \\cdot 4!$ is the row count for alternating. Around a circle the rotation removes a factor." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-4-q6",
      variant: "practice",
      question: "A round table has 4 chairs and 7 people are waiting. In how many ways can 4 of them be seated around it?",
      options: [
        { text: "$210$", correct: true, feedback: "As a row: ${}^{7}P_{4} = 840$. Each seating has 4 rotations (one per seated person): $840 / 4 = 210$." },
        { text: "$840$", feedback: "That's ${}^{7}P_{4}$, the row count. Around a table, each seating shows up 4 times as you rotate it." },
        { text: "$120$", feedback: "You divided by 7, but only the 4 people at the table can be rotated into one another's seats. Divide by $r = 4$." },
        { text: "$6$", feedback: "$(4-1)!$ seats 4 *particular* people. First the 4 must be picked and ordered from 7." },
      ],
      hint: "Count as a row first, then ask how many rotations each seating has.",
    },
    {
      type: "quiz",
      id: "pc1-4-q7",
      variant: "practice",
      question:
        "Three couples sit at a round table so that each couple sits together. How many seatings?",
      options: [
        { text: "$16$", correct: true, feedback: "3 blocks around the table: $(3-1)! = 2$. Each couple has 2 inner orders: $2^3 = 8$. $2 \\times 8 = 16$." },
        { text: "$48$", feedback: "$3! \\times 2^3$ arranges the blocks in a row. Around a table, fix one block: $(3-1)!$." },
        { text: "$8$", feedback: "That's only the orders inside the couples. The 3 blocks can also be arranged around the table in $(3-1)! = 2$ ways." },
        { text: "$120$", feedback: "$(6-1)!$ seats the 6 people with no condition." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-4-q8",
      variant: "practice",
      question:
        "Seven people, including A and B, sit at a round table. In how many seatings is there exactly one person between A and B?",
      options: [
        { text: "$240$", correct: true, feedback: "Seat A. B goes 2nd clockwise or 2nd anticlockwise: 2. The middle seat: 5 people. The other 4 seats: $4! = 24$. $2 \\times 5 \\times 24 = 240$." },
        { text: "$120$", feedback: "You put B on one side of A only. B can be two seats clockwise *or* two seats anticlockwise." },
        { text: "$48$", feedback: "$2 \\times 4!$ forgets to choose who sits between A and B: any of the other 5 people." },
        { text: "$1200$", feedback: "$5 \\times 2 \\times 5!$ arranges the block and 4 others in a row. Around a table the 5 units give $(5-1)! = 24$." },
      ],
      hint: "Seat A first. Where can B go?",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "together-and-apart",
  title: "1.5 · Together, Apart, and Fixed Positions",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Most exam problems add a condition to a plain arrangement: *these must be together*, *no two of these can be adjacent*, *this one goes at the end*. Each condition has one standard move. Start small. Here are all 24 arrangements of A, B, C, D. Find the ones where A and B sit next to each other.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "B", "C", "D"],
        caption:
          "Scan for AB or BA as a neighbouring pair. You should find 12. Now predict that number without listing.",
      },
    },
    {
      type: "text",
      content:
        "**The block (glue) method.** Tape A and B together into one super-item [AB]. Now you're arranging 3 things: [AB], C, D, which gives $3! = 6$ ways. Inside the tape, the pair can be AB or BA, which gives $2! = 2$ ways. Total $6 \\times 2 = 12$. ✓",
    },
    {
      type: "text",
      content:
        "Check it against the list. Here are the 12, paired up: each of the 6 arrangements of the units [AB], C, D appears once with AB inside the block and once with BA.\n\n[AB]CD / [BA]CD · [AB]DC / [BA]DC · C[AB]D / C[BA]D · D[AB]C / D[BA]C · CD[AB] / CD[BA] · DC[AB] / DC[BA]\n\nSix block arrangements, two inner orders each: 12.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Block method (items together)",
      content:
        "To force $k$ particular items to be together among $n$ distinct items:\n1. Treat the $k$ items as one block. Arrange the $n - k + 1$ units: $(n-k+1)!$.\n2. Arrange the items inside the block: $k!$.\n3. Multiply: $(n-k+1)!\\,k!$.",
    },
    {
      type: "text",
      content:
        "**The gap method.** Now the opposite: no two of certain items may touch. Gluing doesn't help. Instead, place the *other* items first and look at the gaps they create. Arrange 3 consonants X, Y, Z:\n\n$\\_\\;X\\;\\_\\;Y\\;\\_\\;Z\\;\\_$\n\nThere are 4 gaps (both ends count). If each vowel goes into a *different* gap, no two vowels can be adjacent, because a consonant always sits between them. And every arrangement with no two vowels adjacent arises this way exactly once.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Gap method (items apart)",
      content:
        "To arrange $m$ unrestricted items and $k$ items with no two of the $k$ adjacent:\n1. Arrange the $m$ unrestricted items: $m!$.\n2. They create $m + 1$ gaps. Place the $k$ items into $k$ different gaps, in order: ${}^{m+1}P_{k}$.\n3. Multiply: $m! \\cdot {}^{m+1}P_{k}$. (If $k > m + 1$, it's impossible: 0.)",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — ORANGE.** Vowels O, A, E; consonants R, N, G. All six letters distinct, $6! = 720$ arrangements in total.\n\n**(a) All vowels together.** Block [OAE] + R, N, G = 4 units: $4! = 24$. Inside the block: $3! = 6$. Total $24 \\times 6 = 144$.\n\n**(b) No two vowels together.** Consonants first: $3! = 6$. They make 4 gaps; put the 3 vowels in 3 different gaps: ${}^{4}P_{3} = 24$. Total $6 \\times 24 = 144$.\n\n**(c) Vowels not all together.** Complement of (a): $720 - 144 = 576$.",
    },
    {
      type: "text",
      content:
        "Look at (b) and (c): 144 versus 576. They answer different questions. \"Not all together\" includes arrangements like O A R N E G, where O and A touch but E is off on its own. Those are *not* allowed in (b).",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"not all together\" = \"no two together\"",
      content:
        "Total minus all-together gives **not all together**: at least one vowel is separated from the rest, but two of them may still touch. **No two together** is much stricter, and it needs the gap method. The two only coincide when there are exactly 2 special items, because then \"not together\" and \"not adjacent\" mean the same thing.",
    },
    {
      type: "table",
      headers: ["Condition", "Method", "ORANGE (vowels O, A, E)"],
      rows: [
        ["All vowels together", "Block: $4! \\cdot 3!$", "144"],
        ["No two vowels together", "Gap: $3! \\cdot {}^{4}P_{3}$", "144"],
        ["Vowels not all together", "Complement: $6! - 144$", "576"],
        ["Vowels in even places (2, 4, 6)", "Fixed slots: $3! \\cdot 3!$", "36"],
        ["Starts with O and ends with E", "Fix ends, arrange middle: $4!$", "24"],
      ],
    },
    {
      type: "text",
      content:
        "**Fixed positions** need no new idea. Fill the constrained places first, then arrange the rest freely. For \"vowels in the even places\", the 3 even places take the 3 vowels ($3!$) and the odd places take the consonants ($3!$), giving 36.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — boys and girls in a row.** 5 boys and 3 girls stand in a row.\n\n**(a) Girls together.** Block of 3 girls + 5 boys = 6 units: $6! = 720$. Inside: $3! = 6$. Total $4320$.\n\n**(b) No two girls together.** Boys first: $5! = 120$, giving 6 gaps. Girls into 3 different gaps: ${}^{6}P_{3} = 120$. Total $120 \\times 120 = 14\\,400$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — gap method with identical letters (stretch).** In how many arrangements of MISSISSIPPI do no two S's stand together?\n\n**Step 1 — the others.** Arrange M, I, I, I, I, P, P (7 letters): $\\frac{7!}{4!\\,2!} = 105$.\n**Step 2 — gaps.** 7 letters make 8 gaps. The 4 S's go into 4 different gaps. If the S's were different, that would be ${}^{8}P_{4} = 1680$ ways, but they're identical, so divide by $4!$ (lesson 1.3): $\\frac{1680}{24} = 70$.\n**Step 3 — multiply.** $105 \\times 70 = 7350$.\n\nThat \"arrange, then divide by $k!$ because order no longer matters\" is exactly the move Chapter 2 names ${}^{n}C_{r}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — identical letters in a block (exam-style).** In how many arrangements of the letters of ARRANGE are the two R's (a) together, (b) not together?\n\n**Step 1 — tally.** A ×2, R ×2, N, G, E: 7 letters. All arrangements: $\\frac{7!}{2!\\,2!} = \\frac{5040}{4} = 1260$.\n**Step 2 — glue the R's.** Units: [RR], A, A, N, G, E. That's 6 units with two identical A's: $\\frac{6!}{2!} = 360$. *Why no $\\times 2!$ for the inside:* the two R's are identical, so the block RR has only one inner order. Multiplying by 2 here is the most common slip.\n**Step 3 — complement.** With exactly two R's, \"not together\" means \"not adjacent\", so subtract:",
    },
    {
      type: "math",
      latex:
        "\\underbrace{\\frac{7!}{2!\\,2!}}_{\\text{all}} - \\underbrace{\\frac{6!}{2!}}_{\\text{RR glued}} = 1260 - 360 = 900",
    },
    {
      type: "text",
      content:
        "**Cross-check by the gap method.** Arrange A, A, N, G, E: $\\frac{5!}{2!} = 60$. They make 6 gaps. Put the two R's in 2 different gaps: ${}^{6}P_{2} = 30$, but the R's are identical, so divide by $2!$: 15. $60 \\times 15 = 900$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — before, but not necessarily next to (application).** Six speakers A, B, C, D, E, F give talks one after another. In how many orders does A speak before B (not necessarily immediately before)?\n\n**Step 1 — all orders.** $6! = 720$.\n**Step 2 — pair them up.** Take any order and swap A and B. You get another order, and in exactly one of the two, A comes first. *Why this is a fair pairing:* swapping twice gets you back where you started, so every order has exactly one partner, and the other four speakers never move.\n**Step 3 — halve.** Exactly half the orders have A before B.",
    },
    {
      type: "math",
      latex:
        "\\text{A before B: } \\frac{6!}{2} = 360 \\qquad \\text{A, B, C in that order: } \\frac{6!}{3!} = 120",
    },
    {
      type: "text",
      content:
        "**The extension on the right.** The three speakers A, B, C can appear in $3! = 6$ relative orders, and each one occurs equally often. Only A, B, C is allowed, so keep $\\frac{1}{6}$ of 720.\n\n**Contrast: immediately before.** If A must speak *right* before B, glue [AB] in that fixed order: 5 units, $5! = 120$. There's no $\\times 2$ because the order inside the block is forced.",
    },
    {
      type: "quiz",
      id: "pc1-5-q1",
      variant: "concept",
      question:
        "In the arrangements of ORANGE, a student computes \"vowels not all together\" as $720 - 144 = 576$ and uses it as the answer to \"no two vowels together\". What's wrong?",
      options: [
        { text: "576 includes arrangements where two vowels touch but the third is apart; \"no two together\" excludes those, and the correct count is 144.", correct: true, feedback: "Complement of \"all together\" is \"not all together\", a much bigger set. The gap method gives $3! \\cdot {}^{4}P_{3} = 144$." },
        { text: "Nothing — the two conditions are the same.", feedback: "Try O A R N E G: vowels not all together, yet O and A are adjacent." },
        { text: "The total should be $6!/3!$ because vowels are alike.", feedback: "The vowels O, A, E are different letters; nothing is identical here." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-5-q2",
      variant: "practice",
      question: "In how many arrangements of the letters of DAUGHTER are the vowels together?",
      options: [
        { text: "$4320$", correct: true, feedback: "Vowels A, U, E as a block + 5 consonants = 6 units: $6! \\cdot 3! = 720 \\cdot 6 = 4320$." },
        { text: "$720$", feedback: "You arranged the 6 units but forgot the $3!$ orders inside the vowel block." },
        { text: "$14\\,400$", feedback: "That is the count for *no two* vowels together." },
        { text: "$36\\,000$", feedback: "That's $8! - 4320$, the count for vowels *not all* together." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-5-q3",
      variant: "practice",
      question: "In how many arrangements of DAUGHTER are no two vowels adjacent?",
      options: [
        { text: "$14\\,400$", correct: true, feedback: "Consonants D, G, H, T, R: $5! = 120$, making 6 gaps; vowels into 3 gaps: ${}^{6}P_{3} = 120$. $120 \\times 120 = 14\\,400$." },
        { text: "$36\\,000$", feedback: "That's total minus all-together, which still allows two vowels to touch." },
        { text: "$2400$", feedback: "You used ${}^{5}P_{3}$ — only the inner gaps. The two ends are gaps too: 6 of them." },
      ],
      hint: "Arrange the 5 consonants first and count the gaps, including both ends.",
    },
    {
      type: "quiz",
      id: "pc1-5-q4",
      variant: "practice",
      question:
        "4 different maths books and 3 different physics books go on a shelf so that the maths books stay together. How many ways?",
      options: [
        { text: "$576$", correct: true, feedback: "Maths block + 3 physics books = 4 units: $4!$. Inside the block: $4!$. $24 \\times 24 = 576$." },
        { text: "$24$", feedback: "That arranges the 4 units only. The maths books can also be reordered inside their block." },
        { text: "$144$", feedback: "$4! \\cdot 3!$ uses the wrong inside count. There are 4 maths books in the block, so $4!$ inside." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-5-q5",
      variant: "practice",
      question:
        "Six people stand in a row. Two of them, P and Q, must not stand next to each other. How many arrangements?",
      options: [
        { text: "$480$", correct: true, feedback: "Complement: $720 - 5! \\cdot 2 = 720 - 240 = 480$. Gap method agrees: $4! \\cdot {}^{5}P_{2} = 24 \\cdot 20 = 480$." },
        { text: "$240$", feedback: "That is the number with P and Q *together*." },
        { text: "$600$", feedback: "You subtracted $5! = 120$ without the factor 2 for PQ vs QP." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-5-q6",
      variant: "concept",
      question:
        "With exactly **two** special items, is \"total − together\" always equal to the gap-method count for \"not adjacent\"?",
      options: [
        { text: "Yes. With two items, \"not together\" and \"not adjacent\" are the same condition, so both methods count the same set.", correct: true, feedback: "Check: 6 people, P and Q apart. Complement $720 - 240 = 480$; gap method $4! \\cdot {}^{5}P_{2} = 24 \\cdot 20 = 480$. The two methods only split apart with three or more special items." },
        { text: "No. The complement method always overcounts, because it includes arrangements where special items touch.", feedback: "That's the trap for 3 or more items (ORANGE: 576 vs 144). With 2 items, \"not together\" already means \"not touching\", so nothing extra slips in." },
        { text: "No. The gap method needs at least 3 items to work.", feedback: "The gap method works for any $k \\leq m + 1$. For P and Q among 6 people it gives $4! \\cdot {}^{5}P_{2} = 480$." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-5-q7",
      variant: "practice",
      question:
        "In how many arrangements of the letters of EQUATION do the consonants occupy the first and last places?",
      options: [
        { text: "$4320$", correct: true, feedback: "Consonants Q, T, N. Fill the two ends first with 2 of them, in order: ${}^{3}P_{2} = 6$. The other 6 letters (5 vowels + the unused consonant) fill the middle: $6! = 720$. $6 \\times 720 = 4320$." },
        { text: "$40\\,320$", feedback: "That's $8!$, every arrangement with no condition at all." },
        { text: "$1440$", feedback: "$2 \\cdot 6!$ lets only one pair of consonants take the ends. There are 3 consonants, so the ends can be filled in ${}^{3}P_{2} = 6$ ways." },
        { text: "$720$", feedback: "$3! \\cdot 5!$ puts all 3 consonants in fixed places, but only the first and last places are fixed. The third consonant can go anywhere in the middle." },
      ],
      hint: "Fill the restricted places first.",
    },
    {
      type: "quiz",
      id: "pc1-5-q8",
      variant: "practice",
      question: "In how many arrangements of the letters of SUCCESS are all three S's together?",
      options: [
        { text: "$60$", correct: true, feedback: "Glue SSS (one inner order: the S's are identical). Units: [SSS], U, C, C, E, which is 5 units with two identical C's: $\\frac{5!}{2!} = 60$." },
        { text: "$360$", feedback: "That's $420 - 60$, the arrangements where the S's are *not all* together." },
        { text: "$120$", feedback: "$5!$ forgets that the two C's are identical. Divide by $2!$." },
        { text: "$720$", feedback: "$5! \\times 3!$ treats the S's in the block as different and the C's as different. Identical letters have only one order." },
      ],
      hint: "Glue the S's, then check what's still repeated among the units.",
    },
    {
      type: "quiz",
      id: "pc1-5-q9",
      variant: "practice",
      question:
        "Five runners, including Priya and Rahul, finish a race with no ties. In how many finishing orders does Priya finish ahead of Rahul (not necessarily just ahead)?",
      options: [
        { text: "$60$", correct: true, feedback: "Swap Priya and Rahul in any order to get its partner: exactly one of each pair has Priya ahead. $\\frac{5!}{2} = 60$." },
        { text: "$120$", feedback: "That's every finishing order. In half of them Rahul beats Priya." },
        { text: "$24$", feedback: "$4!$ glues Priya directly in front of Rahul. The question only needs her somewhere ahead." },
        { text: "$48$", feedback: "$4! \\times 2$ counts orders where the two finish next to each other, in either order." },
      ],
    },
  ]),
};

const lesson06: LessonSeed = {
  slug: "dictionary-rank",
  title: "1.6 · Rank of a Word in the Dictionary",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "Write every arrangement of the letters of a word in dictionary (alphabetical) order. Where does the original word land? Listing all 720 arrangements of a 6-letter word is out of the question, but you don't need the list. You only need to **count the words that come before it**.",
    },
    {
      type: "text",
      content:
        "The idea is how you already compare words: look at the first letter. Any word that starts with an earlier letter comes first, however the rest is arranged. If the first letters match, move on to the second letter, and so on. Each step is a product-rule count of \"choose a smaller letter here, then arrange everything after it freely\".",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The rank recipe",
      content:
        "Sort the letters alphabetically. Then for each position, left to right:\n1. Count the unused letters that are alphabetically smaller than the letter actually in this position.\n2. Each of them could sit here, followed by *any* arrangement of the remaining letters. Add (smaller letters) × (arrangements of what's left).\n3. Remove the actual letter and move right.\n\n**Rank = (total words counted) + 1**. The $+1$ is the word itself.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 — MOTHER** (distinct letters). Sorted: E, H, M, O, R, T.\n\n**Position 1: M.** Smaller unused letters: E, H (2). Each is followed by $5!$ arrangements: $2 \\times 120 = 240$.\n**Position 2: O.** Unused: E, H, O, R, T. Smaller than O: E, H (2). $2 \\times 4! = 48$.\n**Position 3: T.** Unused: E, H, R, T. Smaller: E, H, R (3). $3 \\times 3! = 18$.\n**Position 4: H.** Unused: E, H, R. Smaller: E (1). $1 \\times 2! = 2$.\n**Position 5: E.** Unused: E, R. Smaller: none. $0$.\n**Position 6: R.** Last letter: $0$.\n\n**Total before:** $240 + 48 + 18 + 2 = 308$. **Rank = 309.**",
    },
    {
      type: "table",
      headers: ["Position", "Letter", "Unused letters", "Smaller", "Remaining arrangements", "Contribution"],
      rows: [
        ["1", "M", "E H M O R T", "2", "$5! = 120$", "240"],
        ["2", "O", "E H O R T", "2", "$4! = 24$", "48"],
        ["3", "T", "E H R T", "3", "$3! = 6$", "18"],
        ["4", "H", "E H R", "1", "$2! = 2$", "2"],
        ["5", "E", "E R", "0", "$1! = 1$", "0"],
        ["6", "R", "R", "0", "$0! = 1$", "0"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Small-case check",
      content:
        "Test the recipe on something you can list. The arrangements of A, B, C in order are ABC, ACB, BAC, BCA, CAB, CBA. The rank of BCA: position 1, B has one smaller letter (A), giving $1 \\times 2! = 2$. Position 2, C among {A, C} has one smaller (A), giving $1 \\times 1! = 1$. Total 3, rank 4. The list agrees.",
    },
    {
      type: "text",
      content:
        "**Repeated letters.** The recipe is the same, but \"arrangements of what's left\" now means the multiset count from lesson 1.3. And a letter that appears twice among the unused letters still counts **once** as a smaller choice, because starting with the first A or the second A gives the same words.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 — AGAIN.** Letters A, A, G, I, N. Sorted: A, A, G, I, N. Total arrangements $\\frac{5!}{2!} = 60$.\n\n**Position 1: A.** Nothing is smaller than A. $0$.\n**Position 2: G.** Unused: A, G, I, N. Smaller: A. Then arrange G, I, N freely: $3! = 6$. Contribution $6$.\n**Position 3: A.** Unused: A, I, N. Nothing smaller. $0$.\n**Position 4: I.** Unused: I, N. Nothing smaller. $0$.\n**Position 5: N.** Last letter: $0$.\n\n**Total before:** 6 (the words AA _ _ _). **Rank = 7.**",
    },
    {
      type: "text",
      content:
        "**Worked example 3 — SCHOOL** (repeat among the later letters). Sorted: C, H, L, O, O, S.\n\n**Position 1: S.** Smaller distinct letters: C, H, L, O (4 kinds). After C, H or L the rest still has two O's: $\\frac{5!}{2!} = 60$ each. After O, the rest is C, H, L, O, S, all distinct: $5! = 120$. Contribution $60 + 60 + 60 + 120 = 300$.\n**Position 2: C.** Nothing smaller. $0$.\n**Position 3: H.** Unused: H, L, O, O. Nothing smaller. $0$.\n**Position 4: O.** Unused: L, O, O. Smaller: L, followed by O, O in $1$ way. Contribution $1$.\n**Position 5: O.** Unused: L, O. Smaller: L, then O. Contribution $1$.\n\n**Total before:** $302$. **Rank = 303.**",
    },
    {
      type: "text",
      content:
        "**Worked example 4 — SUCCESS (JEE Main).** Letters C ×2, E, S ×3, U: 7 letters and $\\frac{7!}{2!\\,3!} = 420$ words. Sorted: C, C, E, S, S, S, U.\n\n**Position 1: S.** Smaller kinds: C and E. *Why compute each one separately:* what's left depends on which letter you place, so the multiset denominator changes. C first leaves C, E, S, S, S, U: $\\frac{6!}{3!} = 120$. E first leaves C, C, S, S, S, U: $\\frac{6!}{2!\\,3!} = 60$. Contribution $180$.\n**Position 2: U.** Unused: C, C, E, S, S, U. Smaller kinds: C, E, S. C leaves C, E, S, S, U: $\\frac{5!}{2!} = 60$. E leaves C, C, S, S, U: $\\frac{5!}{2!\\,2!} = 30$. S leaves C, C, E, S, U: $\\frac{5!}{2!} = 60$. Contribution $150$.\n**Positions 3 to 7.** The unused letters are C, C, E, S, S, and the word continues C C E S S, already in alphabetical order. No smaller letter ever appears: $0$.",
    },
    {
      type: "table",
      headers: ["Position", "Letter", "Smaller kinds", "Words counted"],
      rows: [
        ["1", "S", "C, E", "$120 + 60 = 180$"],
        ["2", "U", "C, E, S", "$60 + 30 + 60 = 150$"],
        ["3–7", "C C E S S", "none", "0"],
        ["", "", "Total before", "330"],
      ],
    },
    {
      type: "math",
      latex: "\\text{rank(SUCCESS)} = 180 + 150 + 1 = 331",
    },
    {
      type: "text",
      content:
        "**Worked example 5 — numbers in increasing order (application).** All 5-digit numbers formed from 1, 2, 3, 4, 5, each used once, are written in increasing order. In which position is 35142?\n\n*Why the same recipe works:* for numbers with the same number of digits, increasing order *is* dictionary order on the digits. Compare the first digits; if they tie, compare the second; and so on.\n**Position 1: 3.** Smaller: 1, 2. $2 \\times 4! = 48$.\n**Position 2: 5.** Unused: 1, 2, 4, 5. Smaller: 1, 2, 4. $3 \\times 3! = 18$.\n**Position 3: 1.** Unused: 1, 2, 4. None smaller. $0$.\n**Position 4: 4.** Unused: 2, 4. Smaller: 2. $1 \\times 1! = 1$.\n**Position 5: 2.** Last digit. $0$.",
    },
    {
      type: "math",
      latex: "48 + 18 + 0 + 1 + 0 = 67 \\quad\\Longrightarrow\\quad \\text{35142 is in position } 68",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Two common slips",
      content:
        "**Forgetting the $+1$.** The count gives the words *before* yours; your word is the next one.\n**Counting smaller letters from the full word instead of the unused ones.** At each position only the letters not yet placed are available. In MOTHER at position 3, M and O are already used, so they don't count as smaller than T.",
    },
    {
      type: "text",
      content:
        "**Reversing the question — which word is at rank $k$?** Arrangements of A, B, C, D: words beginning with A take ranks 1–6, B takes 7–12, C takes 13–18, D takes 19–24. Rank 15 is therefore the 3rd word starting with C. The remaining letters A, B, D give CABD (13), CADB (14), CBAD (15). So rank 15 is **CBAD**. You peel off blocks of $3!$, then $2!$, then $1!$.",
    },
    {
      type: "quiz",
      id: "pc1-6-q1",
      variant: "practice",
      question:
        "All arrangements of the letters of RACE are listed in dictionary order. What is the rank of RACE?",
      options: [
        { text: "$19$", correct: true, feedback: "R: smaller A, C, E, so $3 \\times 3! = 18$. A: nothing smaller. C: among C, E, nothing smaller. Rank $18 + 1 = 19$." },
        { text: "$18$", feedback: "18 words come before RACE, so RACE itself is the 19th. Don't forget the $+1$." },
        { text: "$24$", feedback: "RACE is not the last word — REAC, RECA and others come after it." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-6-q2",
      variant: "practice",
      question: "What is the rank of ZENITH when its letters are arranged in dictionary order?",
      options: [
        { text: "$616$", correct: true, feedback: "Z: 5 smaller, $5 \\cdot 120 = 600$. E: 0. N among H, I, N, T: 2 smaller, $2 \\cdot 6 = 12$. I among H, I, T: 1 smaller, $1 \\cdot 2 = 2$. T among H, T: 1 smaller, $1$. H: 0. Total 615, rank 616." },
        { text: "$615$", feedback: "That's the number of words before ZENITH. Add 1." },
        { text: "$601$", feedback: "You stopped after the first letter. The later positions add $12 + 2 + 1$." },
        { text: "$720$", feedback: "ZENITH starts with Z but isn't the last Z-word; ZTNIHE comes later, for example." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-6-q3",
      variant: "concept",
      question:
        "Partway through finding a rank, the unused letters are A, A, M, T and the letter actually in this position is M. How many words are counted at this step?",
      options: [
        { text: "$6$", correct: true, feedback: "One smaller *kind* of letter (A). Put an A here and the rest is A, M, T, all different: $3! = 6$." },
        { text: "$12$", feedback: "You counted each A separately ($2 \\times 6$). Starting with the first A or the second A gives the same words, so A counts once." },
        { text: "$3$", feedback: "You divided by $2!$ for the A's, but once one A is placed here only one A is left, so the remaining letters A, M, T are distinct." },
        { text: "$0$", feedback: "A is smaller than M, so words with A in this position do come first." },
      ],
      hint: "Count smaller letters by kind, then arrange what is left after placing one of them.",
    },
    {
      type: "quiz",
      id: "pc1-6-q4",
      variant: "practice",
      question:
        "The 24 arrangements of A, B, C, D are listed in dictionary order. Which word is 10th?",
      options: [
        { text: "BCDA", correct: true, feedback: "Ranks 1–6 start with A, 7–12 with B. The B-words go BACD (7), BADC (8), BCAD (9), BCDA (10)." },
        { text: "BCAD", feedback: "That's 9th. BACD is 7th, not 6th — the A-block fills ranks 1 to 6." },
        { text: "CABD", feedback: "C-words start at rank 13." },
        { text: "ADCB", feedback: "That's the 6th word, the last one starting with A." },
      ],
      hint: "Each first letter owns a block of $3! = 6$ ranks.",
    },
    {
      type: "quiz",
      id: "pc1-6-q5",
      variant: "practice",
      question: "The 60 arrangements of the letters of BANANA are listed in dictionary order. What is the rank of BANANA?",
      options: [
        { text: "$35$", correct: true, feedback: "Sorted: A, A, A, B, N, N. **B:** smaller kind A; then A, A, N, N are left: $\\frac{5!}{2!\\,2!} = 30$. **A:** nothing smaller. **N:** unused A, A, N, N; smaller kind A; then A, N, N: $\\frac{3!}{2!} = 3$. **A:** nothing smaller. **N:** unused A, N; smaller A, then N: $1$. **A:** last. Total $30 + 3 + 1 = 34$, rank $35$." },
        { text: "$34$", feedback: "34 words come before BANANA. Its own rank is one more." },
        { text: "$38$", feedback: "At position 3 you counted the two unused A's as two separate smaller letters ($2 \\times 3 = 6$). Identical letters give the same words, so A counts once: $3$." },
        { text: "$31$", feedback: "You stopped after the first letter ($30 + 1$). Positions 3 and 5 also have a smaller A available, adding $3 + 1$." },
      ],
      hint: "Count smaller letters by kind, and use the multiset formula for what's left.",
    },
    {
      type: "quiz",
      id: "pc1-6-q6",
      variant: "practice",
      question:
        "All 4-digit numbers formed from 2, 4, 6, 8 (each used once) are written in increasing order. In which position is 6428?",
      options: [
        { text: "$15$", correct: true, feedback: "6: smaller 2, 4, so $2 \\times 3! = 12$. 4: unused 2, 4, 8, smaller 2, so $1 \\times 2! = 2$. 2: unused 2, 8, nothing smaller. Total 14, position 15." },
        { text: "$14$", feedback: "14 numbers come before 6428. Its own position is one more." },
        { text: "$13$", feedback: "You stopped after the first digit ($12 + 1$). At the second place, 2 is still unused and smaller than 4, adding 2 more." },
        { text: "$19$", feedback: "At the second place you used $3!$. After two digits are fixed, only $2!$ arrangements remain for the rest." },
      ],
      hint: "Increasing order of equal-length numbers is dictionary order on the digits.",
    },
    {
      type: "quiz",
      id: "pc1-6-q7",
      variant: "practice",
      question:
        "The 30 arrangements of the letters of COCOA are listed in dictionary order. What is the rank of COCOA?",
      options: [
        { text: "$16$", correct: true, feedback: "Sorted: A, C, C, O, O. **C:** A smaller; then C, C, O, O: $\\frac{4!}{2!\\,2!} = 6$. **O:** unused A, C, O, O; smaller A (leaves C, O, O: 3) and C (leaves A, O, O: 3), so 6. **C:** unused A, C, O; smaller A, leaving C, O: 2. **O:** unused A, O; smaller A: 1. Total 15, rank 16." },
        { text: "$15$", feedback: "15 words come before COCOA. Add 1 for the word itself." },
        { text: "$7$", feedback: "You stopped after the first letter. Positions 2, 3 and 4 also have smaller letters available: $6 + 2 + 1$ more." },
        { text: "$22$", feedback: "At position 1 you used $\\frac{4!}{2!} = 12$. After A is placed, both C and O are still doubled: $\\frac{4!}{2!\\,2!} = 6$." },
      ],
      hint: "At each position, count smaller letters by kind and re-tally what's left.",
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
        "Every question below is one of the moves from this chapter: slots with or without repetition, dividing out identical copies, fixing one seat around a circle, gluing or gapping, and counting what comes before. Before computing, say which move it is and what overcount (if any) needs dividing out.",
    },
    {
      type: "table",
      headers: ["Question to ask", "If yes", "Count"],
      rows: [
        ["Can an object be reused?", "Every slot has all $n$ choices", "$n^r$"],
        ["Distinct objects, no reuse, order matters?", "Shrinking slots", "${}^{n}P_{r} = \\frac{n!}{(n-r)!}$"],
        ["Are some objects identical?", "Divide by the invisible swaps", "$\\frac{n!}{p!\\,q!\\cdots}$"],
        ["Around a circle?", "Fix one object as reference", "$(n-1)!$, or $\\frac{(n-1)!}{2}$ if it can be flipped"],
        ["Must be together?", "Glue into a block", "$(\\text{units})! \\times k!$ in a row; $(\\text{units}-1)! \\times k!$ around a circle"],
        ["No two adjacent?", "Arrange the others, use the gaps", "$m! \\cdot {}^{m+1}P_{k}$"],
      ],
    },
    {
      type: "quiz",
      id: "pc1-7-q1",
      variant: "mastery",
      question:
        "A suitcase lock has 3 rings, each showing the 26 letters A–Z. How many different codes are possible?",
      options: [
        { text: "$17\\,576$", correct: true, feedback: "Letters can repeat across rings: $26^3 = 17\\,576$." },
        { text: "$15\\,600$", feedback: "That's ${}^{26}P_{3}$, which forbids codes like AAB. Each ring is independent." },
        { text: "$2600$", feedback: "That divides by $3!$ as if order didn't matter, but ABC and CBA are different codes." },
        { text: "$78$", feedback: "$26 \\times 3$ adds the rings instead of multiplying the choices." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-7-q2",
      variant: "mastery",
      question: "How many arrangements are there of the letters of ENGINEERING?",
      options: [
        { text: "$277\\,200$", correct: true, feedback: "E ×3, N ×3, G ×2, I ×2, R ×1 (total 11): $\\frac{11!}{3!\\,3!\\,2!\\,2!} = \\frac{39\\,916\\,800}{144} = 277\\,200$." },
        { text: "$554\\,400$", feedback: "You missed one $2!$. Both G and I appear twice." },
        { text: "$39\\,916\\,800$", feedback: "That's $11!$, treating all letters as distinct." },
        { text: "$1\\,108\\,800$", feedback: "You divided by $3!\\,3!$ only. G and I also repeat." },
      ],
      hint: "Tally each letter first and check the tallies add up to 11.",
    },
    {
      type: "quiz",
      id: "pc1-7-q3",
      variant: "mastery",
      question:
        "Eight people sit at a round table. Two particular people must sit next to each other. How many seatings?",
      options: [
        { text: "$1440$", correct: true, feedback: "Glue the pair: 7 units around the table, $(7-1)! = 720$, times $2!$ inside the block: $1440$." },
        { text: "$720$", feedback: "You forgot that the pair can sit in two orders." },
        { text: "$10\\,080$", feedback: "$7! \\cdot 2$ arranges the 7 units in a row. Around a table it's $(7-1)!$." },
        { text: "$5040$", feedback: "That's $7!$, the unrestricted count for 8 people at a round table." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-7-q4",
      variant: "mastery",
      question:
        "5 boys and 4 girls stand in a row so that no two girls are next to each other. How many arrangements?",
      options: [
        { text: "$43\\,200$", correct: true, feedback: "Boys: $5! = 120$, creating 6 gaps. Girls into 4 of them in order: ${}^{6}P_{4} = 360$. $120 \\times 360 = 43\\,200$." },
        { text: "$345\\,600$", feedback: "That's $9! - 6!\\,4!$, the count for girls *not all* together. Two girls may still touch in those." },
        { text: "$14\\,400$", feedback: "You used ${}^{5}P_{4}$, but 5 boys make 6 gaps including both ends." },
        { text: "$17\\,280$", feedback: "That's $6! \\cdot 4!$, the count with all girls *together*." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-7-q5",
      variant: "mastery",
      question: "The letters of SACHIN are arranged in all possible ways and listed in dictionary order. What is the rank of SACHIN?",
      options: [
        { text: "$601$", correct: true, feedback: "S has 5 smaller letters: $5 \\times 5! = 600$. After that A, C, H, I, N are in alphabetical order, so nothing more comes before. Rank $601$." },
        { text: "$600$", feedback: "600 words come before SACHIN. It is the next one." },
        { text: "$720$", feedback: "SACHIN is the *first* word starting with S, not the last word overall." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-7-q6",
      variant: "mastery",
      question: "How many different necklaces can be made from 6 different beads?",
      options: [
        { text: "$60$", correct: true, feedback: "Rotations and flips both give the same necklace: $\\frac{(6-1)!}{2} = \\frac{120}{2} = 60$." },
        { text: "$120$", feedback: "$(6-1)!$ is right for people at a table. A necklace can also be turned over." },
        { text: "$720$", feedback: "$6!$ counts every rotation and flip separately." },
        { text: "$360$", feedback: "$\\frac{6!}{2}$ removes the flip but not the 6 rotations." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-7-q7",
      variant: "mastery",
      question: "If ${}^{n}P_{5} = 42 \\cdot {}^{n}P_{3}$, find $n$.",
      options: [
        { text: "$10$", correct: true, feedback: "Cancel $n(n-1)(n-2)$: $(n-3)(n-4) = 42 = 7 \\cdot 6$, so $n = 10$. Check: $30\\,240 = 42 \\cdot 720$." },
        { text: "$9$", feedback: "Then $(n-3)(n-4) = 6 \\cdot 5 = 30$." },
        { text: "$7$", feedback: "You solved $(n-3)(n-4) = 12$. The factor is 42." },
        { text: "$11$", feedback: "Then $(n-3)(n-4) = 8 \\cdot 7 = 56$." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-7-q8",
      variant: "mastery",
      question:
        "How many functions from a 3-element set to a 4-element set are **not** one-one?",
      options: [
        { text: "$40$", correct: true, feedback: "All functions $4^3 = 64$; one-one ${}^{4}P_{3} = 24$; not one-one $64 - 24 = 40$." },
        { text: "$24$", feedback: "That's the number that *are* one-one." },
        { text: "$57$", feedback: "$3^4 - 24$ swaps base and exponent: each of the 3 inputs picks one of 4 outputs, so the total is $4^3$." },
        { text: "$64$", feedback: "That's every function, one-one or not." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-7-q9",
      variant: "mastery",
      question: "Which situation is counted by $4^6$?",
      options: [
        { text: "Each of 6 students picks a favourite among 4 sports.", correct: true, feedback: "Six choosers, four options each, and students may share a favourite: $4^6$." },
        { text: "Each of 4 sports picks one student out of 6 as captain, all captains different.", feedback: "Captains can't repeat and the sports are the choosers: ${}^{6}P_{4} = 360$." },
        { text: "4 different prizes are given to 6 students, no student getting two.", feedback: "Each prize picks a student, without repeats: ${}^{6}P_{4} = 360$, not a power." },
        { text: "4 students each pick one of 6 sports.", feedback: "Four choosers, six options: that's $6^4$. Base = options, exponent = choosers." },
      ],
    },
    {
      type: "quiz",
      id: "pc1-7-q10",
      variant: "mastery",
      question:
        "In how many arrangements of the letters of BANANA are the two N's **not** next to each other?",
      options: [
        { text: "$40$", correct: true, feedback: "Total $\\frac{6!}{3!\\,2!} = 60$. N's together: glue NN (identical, so 1 way inside), arrange B, A, A, A, [NN]: $\\frac{5!}{3!} = 20$. Apart: $60 - 20 = 40$." },
        { text: "$20$", feedback: "That's the count with the N's *together*." },
        { text: "$30$", feedback: "Halving the total is a guess, not a count. Count the together case directly: glue NN and arrange B, A, A, A, [NN] in $\\frac{5!}{3!} = 20$ ways."},
        { text: "$50$", feedback: "Check the 'together' count: $\\frac{5!}{3!} = 20$, not 10." },
      ],
      hint: "Glue the N's, but remember identical letters inside a block have only one order.",
    },
    {
      type: "quiz",
      id: "pc1-7-q11",
      variant: "mastery",
      question:
        "In how many arrangements of the letters of ALLAHABAD are the two L's together?",
      options: [
        { text: "$1680$", correct: true, feedback: "Glue LL into one unit. Units: [LL], A, A, A, A, H, B, D, that's 8 units with four identical A's: $\\frac{8!}{4!} = 1680$. The two L's are identical, so the block has only 1 inner order." },
        { text: "$3360$", feedback: "$\\frac{8!}{4!} \\times 2!$ gives the block 2 inner orders, but swapping two identical L's changes nothing." },
        { text: "$7560$", feedback: "That's $\\frac{9!}{4!\\,2!}$, all arrangements of ALLAHABAD with no condition." },
        { text: "$40\\,320$", feedback: "$8!$ glues the L's but forgets that the four A's are identical. Divide by $4!$." },
      ],
      hint: "Two moves: glue the L's, then divide out the identical letters that remain.",
    },
    {
      type: "quiz",
      id: "pc1-7-q12",
      variant: "mastery",
      question:
        "The 24 arrangements of the letters of RACE are listed in dictionary order. Which word is 20th?",
      options: [
        { text: "RAEC", correct: true, feedback: "Sorted: A, C, E, R. The A-, C- and E-blocks take ranks 1–18, so R-words are 19–24. The R-words in order: RACE (19), RAEC (20), RCAE (21), … So the 20th is RAEC." },
        { text: "RACE", feedback: "RACE is 19th, the very first R-word (that was the rank question in 1.6). The next one is 20th." },
        { text: "RCAE", feedback: "That's 21st. Within the R-block, the two words starting RA come first: RACE, RAEC." },
        { text: "EACR", feedback: "E-words occupy ranks 13–18. Rank 20 is past them, in the R-block." },
      ],
      hint: "Each first letter owns a block of $3! = 6$ ranks.",
    },
    {
      type: "quiz",
      id: "pc1-7-q13",
      variant: "mastery",
      question:
        "In how many arrangements of the letters of PENCIL does the word start with a vowel and end with a consonant?",
      options: [
        { text: "$192$", correct: true, feedback: "Vowels E, I; consonants P, N, C, L. First place: 2 vowels. Last place: 4 consonants. The middle 4 places take the other 4 letters: $4! = 24$. $2 \\times 4 \\times 24 = 192$." },
        { text: "$48$", feedback: "$2 \\cdot 4!$ fills the first place and the middle but forgets the last place has 4 consonant choices." },
        { text: "$720$", feedback: "That's $6!$, every arrangement with no condition." },
        { text: "$96$", feedback: "$2 \\cdot 2 \\cdot 4!$: the last place can be any of the 4 consonants, not 2." },
      ],
      hint: "Fixed positions: fill the restricted places first.",
    },
    {
      type: "quiz",
      id: "pc1-7-q14",
      variant: "mastery",
      question:
        "4 boys and 3 girls sit around a round table so that no two girls are next to each other. How many seatings?",
      options: [
        { text: "$144$", correct: true, feedback: "Circle + gaps. Boys around the table: $(4-1)! = 6$. Around a circle, 4 boys make exactly 4 gaps (no separate ends). Girls into 3 of them, in order: ${}^{4}P_{3} = 24$. $6 \\times 24 = 144$." },
        { text: "$1440$", feedback: "$4! \\cdot {}^{5}P_{3}$ is the row answer: in a row, 4 boys make 5 gaps. Around a table the two ends join, leaving 4 gaps, and the boys give $(4-1)!$." },
        { text: "$576$", feedback: "$4! \\cdot {}^{4}P_{3}$ seats the boys as if in a row. Around a table, fix one boy: $(4-1)! = 6$." },
        { text: "$720$", feedback: "That's $(7-1)!$, all seatings with no condition." },
      ],
      hint: "Seat the boys around the circle first, then count the gaps between them.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "Every count in this chapter cared about order. Chapter 2 forgets it: a selection is an arrangement with the order divided out, and that single division gives ${}^{n}C_{r}$ and every committee problem.",
    },
  ]),
};

export const pncChapter1Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lesson06,
  lessonMastery,
];
