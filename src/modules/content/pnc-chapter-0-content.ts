import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Permutations, Combinations & the Binomial Theorem, Chapter 0: Counting
 * from First Principles.
 * The product rule (AND multiplies), the sum rule (OR adds), counting the
 * complement, factorials, and filling the most restricted slot first, all
 * checked against small cases that can still be listed by hand.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "why-count-cleverly",
  title: "0.1 · Why Count Cleverly",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pc-0-counting-from-first-principles.mp4",
      poster: "/videos/pc-0-counting-from-first-principles.jpg",
      title: "Chapter 0 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "You have 3 shirts (red, blue, white) and 4 trousers (jeans, chinos, shorts, cargo). How many different outfits can you put together?\n\nThis one is small enough to answer the honest way: write every outfit down.",
    },
    {
      type: "table",
      headers: ["", "Jeans", "Chinos", "Shorts", "Cargo"],
      rows: [
        ["Red", "Red + Jeans", "Red + Chinos", "Red + Shorts", "Red + Cargo"],
        ["Blue", "Blue + Jeans", "Blue + Chinos", "Blue + Shorts", "Blue + Cargo"],
        ["White", "White + Jeans", "White + Chinos", "White + Shorts", "White + Cargo"],
      ],
    },
    {
      type: "text",
      content:
        "12 outfits. Look at *how* the list came out, though. It is a rectangle: 3 rows, one per shirt, and 4 columns, one per trouser. You did not need to write the cells to know there are $3 \\times 4 = 12$ of them.\n\nNow a harder question. A number plate has two letters followed by four digits, like **KA 4821**. How many plates are possible?",
    },
    {
      type: "text",
      content:
        "Listing is hopeless here. Even writing one plate per second, day and night, would take you about **78 days**. There are $26 \\times 26 \\times 10 \\times 10 \\times 10 \\times 10 = 6{,}760{,}000$ plates, and by the end of this lesson you will see where that product comes from.\n\nThis whole course is about one idea: **find the structure of the list, and the structure tells you its length.** You never write the list out.",
    },
    {
      type: "text",
      content:
        "The tool for seeing structure is a **tree**. Start at a root. The first decision (which shirt?) splits it into one branch per option. Every one of those branches then splits again for the second decision (which trousers?). Each **leaf** at the bottom is one complete outcome, and the path from the root to a leaf spells out that outcome.\n\nClick *Next stage* to grow the tree one decision at a time. Watch the leaf count, not the drawing.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "product",
        stages: [
          { label: "Shirt", options: ["Red", "Blue", "White"] },
          { label: "Trousers", options: ["Jeans", "Chinos", "Shorts", "Cargo"] },
        ],
        caption:
          "Stage 1 gives 3 branches. At stage 2, each of those 3 grows the same 4 branches, so there are 3 groups of 4 leaves. Tap any leaf to trace its outfit.",
      },
    },
    {
      type: "text",
      content:
        "Add a third decision: 2 pairs of shoes (sneakers, sandals). You do not have to redo anything. Every one of the 12 existing leaves sprouts 2 new branches, so the count doubles.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "product",
        stages: [
          { label: "Shirt", options: ["Red", "Blue", "White"] },
          { label: "Trousers", options: ["Jeans", "Chinos", "Shorts", "Cargo"] },
          { label: "Shoes", options: ["Sneakers", "Sandals"] },
        ],
        highlightPath: ["Blue", "Chinos", "Sandals"],
        caption:
          "Grow the tree stage by stage: 3, then 3 × 4 = 12, then 12 × 2 = 24. The highlighted path is one outfit: blue shirt, chinos, sandals.",
      },
    },
    {
      type: "math",
      latex: "\\underbrace{3}_{\\text{shirts}} \\times \\underbrace{4}_{\\text{trousers}} \\times \\underbrace{2}_{\\text{shoes}} = 24 \\text{ outfits}",
    },
    {
      type: "text",
      content:
        "Go back to the number plates with the tree in mind. There are 6 decisions: letter, letter, digit, digit, digit, digit. The first splits into 26 branches. Each of those splits into 26, giving $26 \\times 26 = 676$. Each of those splits into 10, then 10, then 10, then 10. The tree is far too big to draw, but its **shape** is easy to describe: it branches 26, 26, 10, 10, 10, 10 ways. That shape is enough to count its leaves:",
    },
    {
      type: "math",
      latex: "26 \\times 26 \\times 10^4 = 676 \\times 10{,}000 = 6{,}760{,}000",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The tree has a shape, and the shape has a formula",
      content:
        "If every node at a given level splits into the same number of branches, the number of leaves is the product of those branch numbers. The next lesson turns this into the **product rule** and says exactly when it is allowed.",
    },
    {
      type: "text",
      content:
        "**Worked example A (routine): an ice-cream counter.** A counter offers 3 kinds of cone (plain, waffle, chocolate), 6 flavours and 4 toppings. An order is one cone, one flavour and one topping. How many different orders are there?\n\n**Step 1.** List the decisions: cone, then flavour, then topping. That is a 3-stage tree.\n*Why this step:* once the stages are named, you only need the branch count at each one.\n\n**Step 2.** Branch counts: 3, then 6, then 4. Whichever cone was picked, all 6 flavours are still on offer, and whichever flavour was picked, all 4 toppings are.\n*Why this step:* the tree has a fixed shape only if each node at a level splits the same number of ways. Here it does.\n\n**Step 3.** Multiply the branch counts.",
    },
    {
      type: "math",
      latex: "3 \\times 6 \\times 4 = 72 \\text{ orders}",
    },
    {
      type: "text",
      content:
        "**Worked example B (word problem): school ID numbers.** A school gives every senior student an ID made of a house (4 houses), a class (11 or 12), a section (A to E) and a roll number from 1 to 45. How many different IDs can the school issue?\n\n**Step 1.** The ID is built in 4 stages: house, class, section, roll number.\n\n**Step 2.** Branch counts: 4, 2, 5 and 45. Every section of every class of every house uses roll numbers 1 to 45.\n*Why this step:* if one section had only 30 roll numbers, the tree would be lopsided and you could not just multiply. Check the shape before multiplying.\n\n**Step 3.** Multiply: $4 \\times 2 \\times 5 \\times 45 = 1800$.\n\n**Step 4 (different paths, different IDs).** Two IDs that differ in any stage are different IDs, so no leaf is counted twice.\n*Why this step:* the leaf count equals the ID count only when each path gives a different ID.",
    },
    {
      type: "math",
      latex: "\\underbrace{4}_{\\text{house}} \\times \\underbrace{2}_{\\text{class}} \\times \\underbrace{5}_{\\text{section}} \\times \\underbrace{45}_{\\text{roll no.}} = 1800",
    },
    {
      type: "text",
      content:
        "**Worked example C (CBSE/JEE classic): letters and postboxes.** In how many ways can 5 different letters be posted in 4 postboxes? Any box may take any number of letters.\n\nThe common wrong answer is $5^4 = 625$. The right one is $4^5$. The difference comes from which things are making the decisions.\n\n**Step 1 (who decides?).** Each **letter** must go into exactly one box. A box does not have to take exactly one letter: it can take none or several. So the stages are the letters, and the options are the boxes.\n*Why this step:* a stage has to be a decision that is made exactly once. \"Which box does letter 1 go in?\" is made exactly once. \"Which letter goes in box 1?\" is not, because box 1 might get zero letters or three.\n\n**Step 2.** 5 stages (letters), each with 4 branches (boxes), whatever happened to the other letters.\n\n**Step 3.** $4 \\times 4 \\times 4 \\times 4 \\times 4 = 4^5 = 1024$.\n\n**Check on a small case.** 2 letters, 2 boxes. The rule gives $2^2 = 4$. List them: both in box 1, both in box 2, letter 1 in box 1 and letter 2 in box 2, or the other way round. That is 4. ✓",
    },
    {
      type: "math",
      latex: "\\underbrace{4 \\times 4 \\times 4 \\times 4 \\times 4}_{\\text{one choice of box per letter}} = 4^5 = 1024",
    },
    {
      type: "callout",
      variant: "info",
      title: "Keep one habit from listing",
      content:
        "Clever counting is easy to get wrong without noticing. Whenever you find a formula, try it on a version small enough to list, as the outfit table did for $3 \\times 4$. If the formula and the list disagree, the formula is wrong. This check will catch many mistakes in the chapters ahead.",
    },
    {
      type: "quiz",
      id: "pc0-1-q1",
      variant: "concept",
      question: "Which of these could you sensibly count by writing out the full list?",
      options: [
        {
          text: "Outfits from 2 shirts and 3 pairs of trousers.",
          correct: true,
          feedback: "Only $2 \\times 3 = 6$ outfits, so a list is quick, and it is a good way to check a formula.",
        },
        {
          text: "8-character passwords made from the 26 letters.",
          feedback: "There are $26^8 \\approx 2 \\times 10^{11}$ of them. At one per second, listing them would take over 6,000 years.",
        },
        {
          text: "Ways to shuffle a deck of 52 cards.",
          feedback: "That number has 68 digits. No list could ever be written. You will be able to count it exactly by lesson 0.4.",
        },
        {
          text: "10-digit mobile numbers.",
          feedback: "There are up to $10^{10}$ of those. At one per second, listing them would take over 300 years.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pc0-1-q2",
      variant: "practice",
      question:
        "A tree has 3 stages. Stage 1 has 2 options, stage 2 has 3 options and stage 3 has 4 options, and every node splits the same way at each stage. How many leaves does it have?",
      options: [
        { text: "24", correct: true, feedback: "$2 \\times 3 \\times 4 = 24$. Every one of the 6 nodes after stage 2 splits into 4." },
        { text: "9", feedback: "$2 + 3 + 4 = 9$ counts branches drawn at one node per stage. Each node at a stage splits separately, so the counts multiply." },
        { text: "12", feedback: "That is $3 \\times 4$. You left out the 2 branches at the first stage." },
        { text: "4", feedback: "That is only the last stage. Each of the earlier 6 nodes grows its own 4 leaves." },
      ],
      hint: "Count the nodes after each stage: 2, then 2 × 3, then …",
    },
    {
      type: "quiz",
      id: "pc0-1-q3",
      variant: "concept",
      question:
        "A 2-stage tree has 12 leaves. You add a third stage with 2 options, and every leaf splits. How many leaves are there now?",
      options: [
        { text: "24", correct: true, feedback: "Each of the 12 old leaves becomes a node with 2 children: $12 \\times 2 = 24$." },
        { text: "14", feedback: "Adding 2 would mean only one leaf split. Every leaf splits, so the count is multiplied by 2." },
        { text: "12", feedback: "The old leaves are not leaves any more. Each one has grown 2 new leaves below it." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-1-q4",
      variant: "practice",
      question: "A shop code is one letter (A to Z) followed by three digits, such as P042. How many codes are possible?",
      options: [
        { text: "26,000", correct: true, feedback: "$26 \\times 10 \\times 10 \\times 10 = 26{,}000$. The tree branches 26, then 10, 10, 10 ways." },
        { text: "56", feedback: "$26 + 10 + 10 + 10$ adds the branches instead of multiplying. Each letter comes with every possible digit string." },
        { text: "2,600", feedback: "That uses only two digits. The code has three." },
        { text: "17,576,000", feedback: "That would be three letters and three digits." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-1-q5",
      variant: "practice",
      question:
        "You have 5 shirts, 3 pairs of trousers and 2 caps, and an outfit is one of each. How many outfits are possible?",
      options: [
        { text: "30", correct: true, feedback: "$5 \\times 3 \\times 2 = 30$." },
        { text: "10", feedback: "That adds the three numbers. Each shirt goes with each pair of trousers and each cap." },
        { text: "15", feedback: "$5 \\times 3$ leaves out the caps. Each of those 15 outfits can take either cap." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-1-q6",
      variant: "practice",
      question: "In how many ways can 3 different letters be posted in 2 postboxes? A box may take any number of letters.",
      options: [
        { text: "8", correct: true, feedback: "Each letter picks one of 2 boxes: $2 \\times 2 \\times 2 = 2^3 = 8$." },
        { text: "9", feedback: "$3^2$ treats each box as choosing one letter. A box can hold none or several letters, but each letter goes in exactly one box." },
        { text: "6", feedback: "$3 \\times 2$ only decides one letter's box. All 3 letters need a box." },
        { text: "5", feedback: "$3 + 2$ adds the numbers. Letter 1 AND letter 2 AND letter 3 each choose a box, so multiply." },
      ],
      hint: "Which choice is made exactly once: the box for each letter, or the letter for each box?",
    },
    {
      type: "quiz",
      id: "pc0-1-q7",
      variant: "practice",
      question:
        "A college ID is a department (6 departments), a year (1 to 4) and a roll number from 1 to 60. How many IDs are possible?",
      options: [
        { text: "1440", correct: true, feedback: "$6 \\times 4 \\times 60 = 1440$. Every department and year uses the same 60 roll numbers." },
        { text: "70", feedback: "$6 + 4 + 60$ adds the stages. An ID has a department AND a year AND a roll number." },
        { text: "360", feedback: "$6 \\times 60$ leaves out the year." },
        { text: "240", feedback: "$4 \\times 60$ leaves out the department." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-1-q8",
      variant: "practice",
      question:
        "4 students each sign up for exactly one of 3 electives (Music, Art, Coding). An elective may get any number of students, including none. In how many ways can the sign-ups turn out?",
      options: [
        { text: "81", correct: true, feedback: "Each **student** makes exactly one choice from 3: $3 \\times 3 \\times 3 \\times 3 = 3^4 = 81$. Same shape as letters and postboxes." },
        { text: "64", feedback: "$4^3$ treats each elective as picking one student. An elective can get zero or several students, so the electives are the options, not the stages." },
        { text: "12", feedback: "$4 \\times 3$ decides only one student's elective. All 4 students choose." },
        { text: "24", feedback: "$4 \\times 3 \\times 2$ stops electives being shared. Two students may pick the same elective." },
      ],
      hint: "Who makes exactly one choice: each student, or each elective?",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "the-product-rule",
  title: "0.2 · The Product Rule (AND)",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "A restaurant thali lets you pick a starter **and** a main **and** a dessert. Starters: soup or salad. Mains: biryani, paneer or dosa. Desserts: kulfi or gulab jamun. How many different meals are there?",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "product",
        stages: [
          { label: "Starter", options: ["Soup", "Salad"] },
          { label: "Main", options: ["Biryani", "Paneer", "Dosa"] },
          { label: "Dessert", options: ["Kulfi", "Gulab jamun"] },
        ],
        caption: "Each stage is one decision in the sequence. The word AND between decisions is what makes the leaves multiply.",
      },
    },
    {
      type: "text",
      content:
        "$2 \\times 3 \\times 2 = 12$ meals. The tree from lesson 0.1 is doing the same thing again, and now we can state the rule properly.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The product rule",
      content:
        "Suppose a task is done in a sequence of $k$ stages, and:\n• stage 1 can be done in $n_1$ ways,\n• **whatever happened at stage 1**, stage 2 can be done in $n_2$ ways,\n• **whatever happened before**, stage 3 can be done in $n_3$ ways, and so on.\n\nThen the whole task can be done in $n_1 \\times n_2 \\times \\cdots \\times n_k$ ways, **provided different sequences of choices give different outcomes** (each leaf is a different result).",
    },
    {
      type: "text",
      content:
        "**Why it is true.** Think about the tree. After stage 1 there are $n_1$ nodes. Each of them splits into exactly $n_2$ branches, so there are $n_1$ groups of $n_2$, which is $n_1 n_2$ nodes. Each of those splits into $n_3$, and so on. The word *whatever* in the definition is what makes every node at a level split into the same number of branches. The last condition makes sure the number of leaves really is the number of outcomes: if two different paths led to the same result, that result would be counted twice. That is the whole proof.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: three-letter codes.** How many 3-letter codes can be made from the 26 letters (a) if letters may repeat, (b) if all three letters must be different?\n\n**Step 1.** Draw three slots: $\\_\\,\\_\\,\\_$. Each slot is one stage.\n\n**Step 2 (a).** With repetition, each slot has all 26 letters available, whatever was chosen before: $26 \\times 26 \\times 26 = 17{,}576$.\n\n**Step 3 (b).** Without repetition: 26 choices for the first slot. Whatever letter was used, 25 remain for the second. Whatever two were used, 24 remain for the third: $26 \\times 25 \\times 24 = 15{,}600$.\n\n**Check.** (b) should be smaller than (a), since it is (a) with the codes such as AAB removed. It is.",
    },
    {
      type: "math",
      latex: "\\text{repetition: } 26^3 = 17{,}576 \\qquad \\text{no repetition: } 26 \\cdot 25 \\cdot 24 = 15{,}600",
    },
    {
      type: "text",
      content:
        "**Worked example 2: routes.** There are 3 roads from town A to town B and 4 roads from B to C.\n\n**Step 1.** A trip from A to C means a road A→B **and** a road B→C: $3 \\times 4 = 12$ routes.\n\n**Step 2.** A round trip A→C→A has four legs: A→B, B→C, C→B, B→A. If any road may be reused: $3 \\times 4 \\times 4 \\times 3 = 144$.\n\n**Step 3.** If no road may be used twice, then on the way back the road B→C already used is not allowed, which leaves 3 roads for C→B. The road A→B already used is not allowed, which leaves 2 roads for B→A: $3 \\times 4 \\times 3 \\times 2 = 72$.\n\n**Check.** Try a version small enough to list: 2 roads A→B (call them $a_1, a_2$) and 2 roads B→C (call them $p, q$), with no road reused. The formula gives $2 \\times 2 \\times 1 \\times 1 = 4$. Listing each trip as its four roads in order: $a_1\\,p\\,q\\,a_2$, $a_1\\,q\\,p\\,a_2$, $a_2\\,p\\,q\\,a_1$, $a_2\\,q\\,p\\,a_1$. That is 4. ✓ (With only 1 road A→B the formula gives $1 \\times 2 \\times 1 \\times 0 = 0$, which is also right: no unused road is left for the last leg.)",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (word problem): a suitcase lock.** A suitcase lock has 3 rings, and each ring shows 10 different letters. Only one setting opens it. How many unsuccessful attempts could a thief make at most?\n\n**Step 1.** A setting is: a letter on ring 1 AND a letter on ring 2 AND a letter on ring 3.\n\n**Step 2.** Each ring can show any of its 10 letters, whatever the other rings show. The rings turn independently, so a letter can \"repeat\" across rings with no problem.\n*Why this step:* each ring has its own 10 letters, so no ring uses up another ring's options. The count at every stage is 10.\n\n**Step 3.** Settings: $10 \\times 10 \\times 10 = 1000$.\n\n**Step 4.** Exactly one of those opens the lock, so the number of unsuccessful attempts is $1000 - 1 = 999$.\n*Why this step:* the question asks for failures, not settings. Reading exactly what is asked is part of the answer.",
    },
    {
      type: "math",
      latex: "10^3 - 1 = 999 \\text{ unsuccessful attempts}",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (CBSE Class 11 / JEE): counting functions.** Let $A = \\{a, b, c\\}$ and $B = \\{1, 2, 3, 4\\}$. How many functions $f : A \\to B$ are there? How many of them are one-one?\n\n**Step 1 (what is a function, as a sequence of choices?).** A function gives each element of $A$ exactly one image in $B$. So: choose $f(a)$, then $f(b)$, then $f(c)$. Three stages.\n*Why this step:* like the letters and postboxes, the elements of $A$ each make exactly one choice. Elements of $B$ may be hit several times or not at all, so they are the options, not the stages.\n\n**Step 2 (all functions).** Each of $f(a), f(b), f(c)$ can be any of the 4 elements of $B$: $4 \\times 4 \\times 4 = 4^3 = 64$.\n\n**Step 3 (one-one functions).** One-one means no two elements share an image. $f(a)$: 4 choices. $f(b)$: anything but $f(a)$, so 3. $f(c)$: anything but those two, so 2. That gives $4 \\times 3 \\times 2 = 24$.\n*Why this step:* the *set* of allowed images for $f(b)$ depends on $f(a)$, but the *number* is always 3. That is exactly what the product rule needs.\n\n**Step 4 (the general result).** If $|A| = m$ and $|B| = n$, there are $n^m$ functions from $A$ to $B$, and $n(n-1)\\cdots(n-m+1)$ one-one functions (zero when $m > n$).",
    },
    {
      type: "math",
      latex: "\\#\\{f : A \\to B\\} = 4^3 = 64 \\qquad \\#\\{\\text{one-one } f\\} = 4 \\cdot 3 \\cdot 2 = 24",
    },
    {
      type: "text",
      content:
        "The pattern in example 1(b), *$n$ choices, then one fewer, then one fewer*, will come up in almost every lesson. Here it is in its simplest form. From $x$ people, choose a class president **and** then a different person as vice-president: $x$ ways for the president, then $x - 1$ for the vice-president. Slide $x$ and see how fast the count grows.",
    },
    {
      type: "interactive",
      config: {
        component: "function-machine",
        expr: "x*(x-1)",
        exprLatex: "x(x-1)",
        min: 2,
        max: 20,
        step: 1,
        initial: 5,
        inputLabel: "People",
        outputLabel: "(President, Vice) pairs",
      },
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: the options at step 2 must be the same each time",
      content:
        "In the president example, which people are available for vice-president depends on who became president. If Asha is president, the choices are everyone except Asha. If Ravi is president, the choices are everyone except Ravi. The **set** changes, but the **number** is always $x - 1$, and that is all the product rule needs. Every node at level 2 of the tree has $x - 1$ branches, even though they are labelled differently.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: every leaf is a different outcome",
      content:
        "Now drop the titles. How many 2-person **teams** (no roles) can be picked from 8 students? Picking a first person and then a second gives $8 \\times 7 = 56$ leaves, but a team does not care about order: *Asha then Ravi* and *Ravi then Asha* are two leaves for the **same** team. Every team appears exactly twice, so there are $56 \\div 2 = 28$ teams. The product rule counts leaves; it counts outcomes only when different leaves are different outcomes. Chapter 2 turns this dividing-out into a general method.",
    },
    {
      type: "text",
      content:
        "**When the rule does not apply as it stands.** How many 2-digit numbers have their second digit strictly larger than their first (like 27 or 58)?\n\nThe first digit $d$ can be 1 to 9. But the number of choices for the second digit is $9 - d$, which **depends on which** $d$ was picked. With first digit 1 there are 8 choices (2 to 9). With first digit 8 there is only 1 (just 9). No single $n_2$ exists, so you cannot multiply. You have to split into cases and add them:",
    },
    {
      type: "math",
      latex: "8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 + 0 = 36",
    },
    {
      type: "text",
      content:
        "Notice that 36 is also the number of ways to pick two different digits from 1 to 9: each pair can be written in increasing order in exactly one way, so pairs and increasing numbers match up one to one. Chapter 2 turns this into a formula.\n\nSplitting into cases and adding the results is the **sum rule**, the subject of the next lesson. The test to remember: *does the number of choices at this stage stay the same, whatever was picked earlier?* If yes, multiply. If no, split into cases.",
    },
    {
      type: "quiz",
      id: "pc0-2-q1",
      variant: "practice",
      question:
        "A café offers 4 drinks, 5 sandwiches and 3 snacks. A combo is one of each. How many combos are there?",
      options: [
        { text: "60", correct: true, feedback: "$4 \\times 5 \\times 3 = 60$." },
        { text: "12", feedback: "That adds the menus. A combo has a drink AND a sandwich AND a snack, so the counts multiply." },
        { text: "20", feedback: "$4 \\times 5$ leaves out the snack stage." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-2-q2",
      variant: "practice",
      question: "How many 4-letter codes can be made from the letters A to F (6 letters) if no letter may repeat?",
      options: [
        { text: "360", correct: true, feedback: "$6 \\times 5 \\times 4 \\times 3 = 360$. Whatever has been used, one fewer letter is left for the next slot." },
        { text: "1296", feedback: "That is $6^4$, which allows repeats." },
        { text: "24", feedback: "$4 \\times 3 \\times 2 \\times 1$ counts the orderings of 4 letters that are already chosen. Each slot has 6, 5, 4, 3 letters to choose from." },
        { text: "15", feedback: "That counts which 4 letters are used, ignoring order. A code is ordered: ABCD and DCBA are different codes." },
      ],
      hint: "Four slots. How many letters are left for each slot, whatever was used before?",
    },
    {
      type: "quiz",
      id: "pc0-2-q3",
      variant: "concept",
      question:
        "From 8 students, a captain and then a different vice-captain are chosen. Priya says: \"The product rule doesn't work here, because the students available for vice-captain are different depending on who is captain.\" Is she right?",
      options: [
        {
          text: "No. The set changes, but there are always 7 choices, so the answer is $8 \\times 7 = 56$.",
          correct: true,
          feedback: "The product rule needs a fixed **number** of options at each stage, not a fixed set.",
        },
        {
          text: "Yes. You must split into 8 cases, one per captain, and add them.",
          feedback: "You can do that: $7 + 7 + \\cdots + 7$ (8 times) $= 56$. But adding 8 equal cases is exactly multiplication, which is why the product rule works here.",
        },
        {
          text: "No, and the answer is $8 \\times 8 = 64$.",
          feedback: "That lets the same student be both captain and vice-captain.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pc0-2-q4",
      variant: "practice",
      question:
        "3 roads join A to B and 4 roads join B to C. How many ways are there to go A→C→A without using any road twice?",
      options: [
        { text: "72", correct: true, feedback: "$3 \\times 4 \\times 3 \\times 2$: going back, one road B→C and one road A→B are already used." },
        { text: "144", feedback: "That lets roads be reused. On the way back you have one fewer choice on each leg." },
        { text: "12", feedback: "That is only the trip from A to C." },
        { text: "24", feedback: "$4 \\times 3 \\times 2$ leaves out the first leg A→B." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-2-q5",
      variant: "concept",
      question: "For which count can you **not** simply multiply a fixed number of choices per stage?",
      options: [
        {
          text: "2-digit numbers whose second digit is larger than the first.",
          correct: true,
          feedback: "The number of choices for the second digit is $9 - d$, which depends on the first digit $d$. You have to split into cases: $8 + 7 + \\cdots + 0 = 36$.",
        },
        {
          text: "2-digit numbers whose digits are different.",
          feedback: "First digit 9 ways (1 to 9), then 9 ways for the second (0 to 9 except the first): always 9, so $9 \\times 9 = 81$ works.",
        },
        {
          text: "2-digit numbers with an odd second digit.",
          feedback: "9 choices for the first digit, then always 5 for the second: $9 \\times 5 = 45$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pc0-2-q6",
      variant: "practice",
      question: "A club of 12 elects a president, a secretary and a treasurer, who must be three different people. How many outcomes are there?",
      options: [
        { text: "1320", correct: true, feedback: "$12 \\times 11 \\times 10 = 1320$." },
        { text: "1728", feedback: "$12^3$ lets one person hold two posts." },
        { text: "220", feedback: "That ignores which post each person gets. Here the posts are different, so order matters." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-2-q7",
      variant: "concept",
      question: "From 8 students, how many 2-person teams (no roles) can be formed?",
      options: [
        {
          text: "28",
          correct: true,
          feedback: "Ordered picks give $8 \\times 7 = 56$ leaves, but each team is two leaves (one per order), so $56 \\div 2 = 28$.",
        },
        {
          text: "56",
          feedback: "Each team is counted twice, once per order: Asha-then-Ravi and Ravi-then-Asha are the same team. Chapter 2 fixes this by dividing by $2!$.",
        },
        {
          text: "64",
          feedback: "$8 \\times 8$ lets a student team up with themselves, and still counts each team twice.",
        },
        {
          text: "15",
          feedback: "$8 + 7$ adds the stages. Picking a first AND a second person multiplies; then remove the double count.",
        },
      ],
      hint: "Count ordered picks first, then ask how many ordered picks give the same team.",
    },
    {
      type: "quiz",
      id: "pc0-2-q8",
      variant: "practice",
      question:
        "A lock has 4 rings, each showing 5 different digits. Only one setting opens it. How many unsuccessful attempts are possible?",
      options: [
        { text: "624", correct: true, feedback: "Settings: $5^4 = 625$. One of them opens the lock, so $625 - 1 = 624$ fail." },
        { text: "625", feedback: "That counts every setting, including the one that opens the lock." },
        { text: "1023", feedback: "$4^5 - 1$ swaps the roles. There are 4 rings (stages), each with 5 options." },
        { text: "119", feedback: "$5 \\times 4 \\times 3 \\times 2 - 1$ assumes no digit can appear on two rings. Each ring has its own 5 digits." },
      ],
      hint: "Count all settings first, then remove the one that works.",
    },
    {
      type: "quiz",
      id: "pc0-2-q9",
      variant: "practice",
      question: "$A$ has 3 elements and $B$ has 5 elements. How many one-one functions $f : A \\to B$ are there?",
      options: [
        { text: "60", correct: true, feedback: "The images of the 3 elements must all differ: $5 \\times 4 \\times 3 = 60$." },
        { text: "125", feedback: "$5^3$ counts all functions, including ones where two elements share an image." },
        { text: "243", feedback: "$3^5$ treats the elements of $B$ as the stages. Each element of $A$ makes one choice, so there are 3 stages with 5, 4, 3 options." },
        { text: "10", feedback: "That counts which 3 images are used but not which element goes to which. $f(a) = 1, f(b) = 2$ differs from $f(a) = 2, f(b) = 1$." },
      ],
      hint: "Choose $f$ of each element of $A$ in turn. How many images are still unused each time?",
    },
    {
      type: "quiz",
      id: "pc0-2-q10",
      variant: "practice",
      question: "How many functions are there from $A = \\{1, 2\\}$ to $B = \\{a, b, c, d, e\\}$?",
      options: [
        { text: "25", correct: true, feedback: "Each of the 2 elements of $A$ picks one image from 5: $5 \\times 5 = 5^2 = 25$." },
        { text: "32", feedback: "$2^5$ makes the elements of $B$ the stages. Each element of $A$ makes exactly one choice, so there are 2 stages with 5 options each." },
        { text: "20", feedback: "$5 \\times 4$ counts only one-one functions. A function may send 1 and 2 to the same image." },
        { text: "7", feedback: "$2 + 5$ adds. $f(1)$ AND $f(2)$ are both chosen, so multiply." },
      ],
      hint: "A function is a choice of $f(1)$ and a choice of $f(2)$.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "the-sum-rule",
  title: "0.3 · The Sum Rule (OR) and the Complement",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "You need to get to the city tomorrow. You can take a bus: one of 3 routes, in the morning or the afternoon. **Or** you can take a train: a fast or a slow one, again morning or afternoon. How many ways are there to travel?\n\nThis is not one long sequence of decisions. It is a choice between two **separate** plans. Each plan has its own tree.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "sum",
        branches: [
          {
            label: "Bus",
            stages: [
              { label: "Route", options: ["1", "2", "3"] },
              { label: "Time", options: ["AM", "PM"] },
            ],
          },
          {
            label: "Train",
            stages: [
              { label: "Train", options: ["Fast", "Slow"] },
              { label: "Time", options: ["AM", "PM"] },
            ],
          },
        ],
        caption:
          "Two separate trees. Inside each tree the stages multiply; then the two trees' leaves are added, because every trip belongs to exactly one tree.",
      },
    },
    {
      type: "math",
      latex: "\\underbrace{3 \\times 2}_{\\text{bus}} + \\underbrace{2 \\times 2}_{\\text{train}} = 6 + 4 = 10",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The sum rule",
      content:
        "If the outcomes split into cases that do not overlap (no outcome is in two cases), and case 1 has $m$ outcomes, case 2 has $n$, and so on, then the total is $m + n + \\cdots$.",
    },
    {
      type: "text",
      content:
        "**Why it is true.** Stack the lists from the separate cases on top of each other. Since no outcome appears in two lists, the combined list has no repeats, and its length is the sum of the lengths.\n\nSo there are two rules, and one question tells you which to use. **Is the outcome made of several choices made one after another (AND), or is it one choice from several separate groups (OR)?**",
    },
    {
      type: "table",
      headers: ["Situation", "Key word", "Operation"],
      rows: [
        ["A meal = a starter, then a main, then a dessert", "AND (all stages happen)", "Multiply"],
        ["Travel by bus or by train", "OR (exactly one case happens)", "Add"],
        ["Passwords of length 1, 2 or 3", "OR between lengths, AND inside each", "Add the products"],
        ["A number that is even and has distinct digits", "Two conditions on one object", "Both: product rule on slots, split into cases and add (lesson 0.5)"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1: passwords of mixed length.** A password uses the letters A to E (repeats allowed) and is 1, 2 or 3 letters long. How many passwords are there?\n\n**Step 1.** Split by length. A password cannot be two lengths at once, so the cases do not overlap.\n\n**Step 2.** Count each case with the product rule: length 1 gives $5$, length 2 gives $5^2 = 25$, length 3 gives $5^3 = 125$.\n\n**Step 3.** Add: $5 + 25 + 125 = 155$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (word problem, a CBSE favourite): flag signals.** A ship has 4 flags of different colours. A signal is made by hoisting one or more flags, one above another, on a single mast. The order from top to bottom matters. How many different signals can be sent?\n\n**Step 1 (split by the number of flags).** A signal uses 1, 2, 3 or 4 flags. No signal uses two different numbers of flags, so the cases do not overlap.\n*Why this step:* inside one case every signal has the same number of slots, so the product rule works. Across cases the number of slots changes, so the cases have to be added.\n\n**Step 2 (product rule inside each case).** A flag can't be used twice on the mast.\n• 1 flag: $4$\n• 2 flags: $4 \\times 3 = 12$\n• 3 flags: $4 \\times 3 \\times 2 = 24$\n• 4 flags: $4 \\times 3 \\times 2 \\times 1 = 24$\n*Why this step:* whichever flag is on top, one fewer is left for the next position.\n\n**Step 3 (sum rule across cases).** $4 + 12 + 24 + 24 = 64$.",
    },
    {
      type: "math",
      latex: "\\underbrace{4}_{1\\text{ flag}} + \\underbrace{4 \\cdot 3}_{2\\text{ flags}} + \\underbrace{4 \\cdot 3 \\cdot 2}_{3\\text{ flags}} + \\underbrace{4 \\cdot 3 \\cdot 2 \\cdot 1}_{4\\text{ flags}} = 4 + 12 + 24 + 24 = 64",
    },
    {
      type: "text",
      content:
        "**The complement.** Some questions ask for *at least one* of something. Counting them directly usually means many cases: exactly one, exactly two, and so on. It is almost always easier to count the outcomes that have *none*, then subtract.\n\nThis is the sum rule used backwards. Every outcome either has the property or it does not, and never both:",
    },
    {
      type: "math",
      latex: "\\#(\\text{at least one}) = \\#(\\text{all}) - \\#(\\text{none})",
    },
    {
      type: "text",
      content:
        "**Worked example 3: codes with a repeated digit.** A lock code is 4 digits, from 0000 to 9999. How many codes have **at least one** digit repeated?\n\n**Step 1 (why not directly?).** A repeat could be one pair (1123), two pairs (1122), a triple (1112) or all four the same (1111), and the repeats can sit in many positions. That is a lot of cases.\n\n**Step 2 (all).** Each of the 4 slots takes any of 10 digits: $10^4 = 10{,}000$.\n\n**Step 3 (none).** All digits different: $10 \\times 9 \\times 8 \\times 7 = 5040$.\n\n**Step 4 (subtract).** $10{,}000 - 5040 = 4960$ codes have at least one repeat.\n\n**Sense check.** Almost half of all codes repeat a digit. That seems like a lot until you remember that 4 digits drawn from only 10 bump into each other often. This is the same effect as the famous birthday problem.",
    },
    {
      type: "math",
      latex: "10^4 - 10 \\cdot 9 \\cdot 8 \\cdot 7 = 10000 - 5040 = 4960",
    },
    {
      type: "text",
      content:
        "**Worked example 4: at least one vowel.** How many 3-letter strings (letters may repeat) contain at least one vowel? There are 5 vowels and 21 consonants.\n\nAll strings: $26^3 = 17{,}576$. Strings with no vowel use only consonants: $21^3 = 9261$. So $17{,}576 - 9261 = 8315$ have at least one vowel.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style): the digit 7.** How many positive integers less than 1000 contain the digit 7 at least once?\n\n**Step 1 (make every number the same length).** The numbers 1 to 999 have 1, 2 or 3 digits, which would mean three cases. Instead, write each one with 3 digits by padding with leading zeros: 7 becomes 007 and 42 becomes 042. The strings 000 to 999 are then exactly the numbers 0 to 999.\n*Why this step:* padding with zeros adds no 7s, so it does not change which numbers contain a 7. And it turns three cases into one set of 3 equal slots.\n\n**Step 2 (all).** $10^3 = 1000$ strings, from 000 to 999.\n\n**Step 3 (none).** Strings with no 7 use only the other 9 digits in each slot: $9^3 = 729$.\n*Why this step:* \"at least one 7\" could be one, two or three 7s in various places. \"No 7\" is a single clean product.\n\n**Step 4 (subtract).** $1000 - 729 = 271$ strings contain a 7.\n\n**Step 5 (the edge).** 000 is not a positive integer, but it has no 7, so it is among the 729 and not in our answer. So **271** positive integers below 1000 contain a 7.\n\n**Check on a smaller version.** Positive integers below 100 with a 7: $10^2 - 9^2 = 19$. By hand: 7, 17, 27, 37, 47, 57, 67, 87, 97 (9 numbers ending in 7, apart from 77) and 70 to 79 (10 numbers). That is 19. ✓",
    },
    {
      type: "math",
      latex: "\\underbrace{10^3}_{000\\text{ to }999} - \\underbrace{9^3}_{\\text{no }7} = 1000 - 729 = 271",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (JEE style): all digits different.** How many positive integers less than 1000 have all their digits different?\n\nIt is tempting to reuse the padding trick from example 5. Don't. Padding 7 to 007 creates two zeros, so a number with distinct digits can turn into a string with a repeat. The trick worked for \"contains a 7\" because zeros never affect 7s. Here they do.\n\n**Step 1 (split by length).** A number below 1000 has 1, 2 or 3 digits, and no number has two lengths. So the cases do not overlap and the sum rule will apply.\n*Why this step:* inside a fixed length every number has the same slots, including a leading slot that can't be 0.\n\n**Step 2 (product rule inside each case).**\n• 1 digit: 1 to 9, so $9$.\n• 2 digits: leading slot 9 (not 0), then 9 (any digit except the first, 0 allowed): $9 \\times 9 = 81$.\n• 3 digits: $9 \\times 9 \\times 8 = 648$.\n*Why this step:* the leading slot is the fussy one (no 0), so it goes first. After it, 0 is back in play, which is why the second slot also has 9.\n\n**Step 3 (sum rule).** $9 + 81 + 648 = 738$.\n\n**Check on a smaller version.** Positive integers below 100 with distinct digits: $9 + 81 = 90$. Below 100 there are 99 numbers, and the ones with a repeat are 11, 22, …, 99, which is 9 of them. $99 - 9 = 90$. ✓",
    },
    {
      type: "math",
      latex: "\\underbrace{9}_{1\\text{ digit}} + \\underbrace{9 \\cdot 9}_{2\\text{ digits}} + \\underbrace{9 \\cdot 9 \\cdot 8}_{3\\text{ digits}} = 9 + 81 + 648 = 738",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: OR always means add",
      content:
        "How many numbers from 1 to 20 are divisible by 2 **or** by 3? There are 10 multiples of 2 and 6 multiples of 3, but the answer is **not** 16. The numbers 6, 12 and 18 are in both lists, so adding counts them twice. The sum rule needs cases that **do not overlap**. Here the fix is to subtract the overlap once: $10 + 6 - 3 = 13$. This fix is called **inclusion–exclusion**, and it comes back in Chapter 3. For now, before you add, always ask: *can one outcome be in two of my cases?*",
    },
    {
      type: "quiz",
      id: "pc0-3-q1",
      variant: "concept",
      question:
        "A student picks one book to read: one of 5 novels or one of 3 comics. Which calculation gives the number of choices?",
      options: [
        { text: "$5 + 3 = 8$", correct: true, feedback: "One book is chosen, from one of two separate groups. That is OR, so add." },
        { text: "$5 \\times 3 = 15$", feedback: "Multiplying would count choosing a novel AND a comic. Only one book is picked." },
        { text: "$5 + 3 - 1 = 7$", feedback: "You subtract only when something is in both groups. No book is both a novel and a comic here." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-3-q2",
      variant: "concept",
      question: "Which situation calls for **multiplying**?",
      options: [
        {
          text: "Choosing a phone case colour (4 options) and a screen guard type (3 options) for the same phone.",
          correct: true,
          feedback: "Both choices are made: a case AND a guard, so $4 \\times 3 = 12$.",
        },
        {
          text: "Choosing a flight (4 options) or a train (3 options) to Delhi.",
          feedback: "You take exactly one of them. That is OR, so add: $4 + 3 = 7$.",
        },
        {
          text: "Choosing one prize from a table of 4 books and 3 pens.",
          feedback: "One prize, from two separate groups: add, $4 + 3 = 7$.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pc0-3-q3",
      variant: "practice",
      question: "How many 3-digit strings (000 to 999) have at least one repeated digit?",
      options: [
        { text: "280", correct: true, feedback: "All: $10^3 = 1000$. None repeated: $10 \\times 9 \\times 8 = 720$. So $1000 - 720 = 280$." },
        { text: "720", feedback: "That is the number with **no** repeat. Subtract it from the total." },
        { text: "270", feedback: "That counts strings with **exactly** two equal digits. The 10 strings like 000 and 777 also have a repeat." },
        { text: "10", feedback: "That counts only 000, 111, …, 999. A repeat needs just two equal digits, like 353." },
      ],
      hint: "Total strings minus strings whose digits are all different.",
    },
    {
      type: "quiz",
      id: "pc0-3-q4",
      variant: "concept",
      question:
        "How many numbers from 1 to 30 are divisible by 3 or by 5? Arjun answers $10 + 6 = 16$. What went wrong?",
      options: [
        {
          text: "15 and 30 are multiples of both, so they were counted twice. The answer is $16 - 2 = 14$.",
          correct: true,
          feedback: "The two cases overlap, so adding double counts the overlap. Subtract it once.",
        },
        {
          text: "Nothing. OR always means add.",
          feedback: "Adding only works for cases that do not overlap. Here 15 and 30 are in both lists.",
        },
        {
          text: "He should multiply: $10 \\times 6 = 60$.",
          feedback: "Multiplying counts pairs (a multiple of 3 AND a multiple of 5). We want single numbers.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pc0-3-q5",
      variant: "practice",
      question:
        "A PIN is 2, 3 or 4 digits long (any digits, repeats allowed). How many PINs are possible?",
      options: [
        { text: "11,100", correct: true, feedback: "$10^2 + 10^3 + 10^4 = 100 + 1000 + 10{,}000 = 11{,}100$. The lengths are separate cases, so they add." },
        { text: "10,000", feedback: "That is only the 4-digit case." },
        { text: "$10^9$", feedback: "Multiplying the cases treats a PIN as a 2-digit part AND a 3-digit part AND a 4-digit part. A PIN has only one length." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-3-q6",
      variant: "practice",
      question:
        "A ship has 5 flags of different colours. A signal is 1 or 2 flags hoisted one above the other, and the order matters. How many signals are possible?",
      options: [
        { text: "25", correct: true, feedback: "1 flag: 5. 2 flags: $5 \\times 4 = 20$. The cases don't overlap, so add: $5 + 20 = 25$." },
        { text: "100", feedback: "$5 \\times 20$ multiplies the cases, as if a signal used 1 flag AND 2 flags. Each signal has one length, so add." },
        { text: "30", feedback: "$5 + 5^2$ lets the same flag appear twice on the mast. There is only one flag of each colour." },
        { text: "15", feedback: "$5 + 10$ treats a 2-flag signal as an unordered pair. Red above blue is a different signal from blue above red." },
      ],
      hint: "Split by the number of flags, count each case, then add.",
    },
    {
      type: "quiz",
      id: "pc0-3-q7",
      variant: "practice",
      question: "How many positive integers less than 10,000 have all their digits different?",
      options: [
        { text: "5274", correct: true, feedback: "By length: $9 + 9 \\cdot 9 + 9 \\cdot 9 \\cdot 8 + 9 \\cdot 9 \\cdot 8 \\cdot 7 = 9 + 81 + 648 + 4536 = 5274$." },
        { text: "5040", feedback: "$10 \\times 9 \\times 8 \\times 7$ pads to 4 digits. Padding turns 7 into 0007, which has a repeated 0, so many valid shorter numbers get thrown out. Split by length instead." },
        { text: "4536", feedback: "That is only the 4-digit case. Numbers with 1, 2 or 3 digits are also less than 10,000." },
        { text: "738", feedback: "That stops at 3 digits (less than 1000). Add the 4-digit case, $9 \\cdot 9 \\cdot 8 \\cdot 7 = 4536$." },
      ],
      hint: "Split by the number of digits. In each case the leading slot can't be 0.",
    },
    {
      type: "quiz",
      id: "pc0-3-q8",
      variant: "practice",
      question: "A coin is tossed 6 times and the sequence of heads and tails is recorded. How many sequences contain at least one head?",
      options: [
        { text: "63", correct: true, feedback: "All: $2^6 = 64$. No head means TTTTTT, just 1 sequence. $64 - 1 = 63$." },
        { text: "64", feedback: "That includes TTTTTT, which has no head." },
        { text: "6", feedback: "That counts sequences with **exactly** one head. Two, three or more heads also count as \"at least one\"." },
        { text: "32", feedback: "$2^5$ fixes the first toss as a head, so it misses sequences like THHTTT that start with a tail. Count all − none instead." },
      ],
      hint: "How many sequences have no head at all?",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "factorials",
  title: "0.4 · Factorials: Arranging Everything",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Three friends (A, B, C) stand in a line for a photo. How many different orders are possible?\n\nDraw three slots, one per position. Any of the 3 friends can go in the first slot. Whoever it was, 2 friends are left for the second slot. Then just 1 friend remains for the last slot.",
    },
    {
      type: "math",
      latex: "\\boxed{3} \\times \\boxed{2} \\times \\boxed{1} = 6",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "B", "C"],
        showSlots: true,
        caption: "All 3 × 2 × 1 = 6 orders. Each first letter starts exactly 2 of them.",
      },
    },
    {
      type: "text",
      content:
        "With a fourth friend D, the first slot has 4 choices and the other three slots are the same problem as before. So every choice of first person is followed by 6 orders of the rest: $4 \\times 6 = 24$.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["A", "B", "C", "D"],
        showSlots: true,
        caption: "24 orders, in 4 blocks of 6, one block per person in the first slot.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Factorial",
      content:
        "For a positive whole number $n$, **$n$ factorial** is\n$n! = n \\times (n-1) \\times (n-2) \\times \\cdots \\times 2 \\times 1$.\nIt is the number of ways to arrange $n$ different objects in a line.",
    },
    {
      type: "text",
      content:
        "**Worked example A (routine): the chief guest.** At a school function, 7 speakers sit in a row of 7 chairs on stage. (a) How many seatings are there? (b) How many if the chief guest must take the middle chair? (c) How many if the principal and the chief guest must take the two end chairs?\n\n**(a)** 7 different people in 7 slots: $7! = 5040$.\n\n**(b) Step 1.** The middle chair is the fussy slot. Fill it first: only 1 way (the chief guest).\n*Why this step:* a slot with a fixed occupant has exactly 1 choice. Placing it first means the other slots are free again.\n**Step 2.** The other 6 speakers fill the other 6 chairs in any order: $6! = 720$. Total $1 \\times 720 = 720$.\n\n**(c) Step 1.** The two end chairs take the principal and the chief guest: 2 ways (principal left and guest right, or the other way round).\n*Why this step:* \"the two ends\" says which chairs, not who sits in which. Both orders count.\n**Step 2.** The remaining 5 speakers fill the 5 middle chairs: $5! = 120$. Total $2 \\times 120 = 240$.\n\n**Sense check.** Each of the 7 people is equally likely to be in the middle, so (b) should be $\\frac{1}{7}$ of (a): $5040 \\div 7 = 720$. ✓",
    },
    {
      type: "math",
      latex: "\\text{(a) } 7! = 5040 \\qquad \\text{(b) } 1 \\times 6! = 720 \\qquad \\text{(c) } 2! \\times 5! = 240",
    },
    {
      type: "text",
      content:
        "**Worked example B (JEE/CBSE classic): friends who must sit together.** 6 students sit in a row. In how many seatings do two particular friends, Asha and Ravi, sit next to each other? In how many do they **not** sit together?\n\n**Step 1 (glue them).** Tie Asha and Ravi together into one block. Now there are 5 things to arrange: the block and the other 4 students.\n*Why this step:* \"next to each other\" is hard to handle slot by slot, but once they are one unit the condition holds automatically.\n\n**Step 2 (arrange the units).** 5 units in a line: $5! = 120$.\n\n**Step 3 (arrange inside the block).** The block can read Asha–Ravi or Ravi–Asha: $2! = 2$.\n*Why this step:* gluing hid the order inside the block. Each seating of units opens into 2 real seatings.\n\n**Step 4 (product rule).** $5! \\times 2! = 240$ seatings with them together.\n\n**Step 5 (complement).** All seatings: $6! = 720$. Not together: $720 - 240 = 480$.\n*Why this step:* \"not together\" has many shapes (one seat apart, two seats apart, …). The complement turns it into one subtraction.\n\n**Check on a small case.** 3 students A, B, C with A and B together. The formula gives $2! \\times 2! = 4$. Listing: ABC, BAC, CAB, CBA. That is 4. ✓",
    },
    {
      type: "math",
      latex: "\\text{together: } 5! \\times 2! = 240 \\qquad \\text{not together: } 6! - 240 = 480",
    },
    {
      type: "text",
      content:
        "The 4-friend argument works for any $n$. Choose the first person, then arrange the rest. That gives the key property of factorials:",
    },
    {
      type: "math",
      latex: "n! = n \\times (n-1)!",
    },
    {
      type: "text",
      content:
        "**What is $0!$?** The definition as a product makes no sense for $n = 0$. But there are four separate reasons, which all agree, for setting $0! = 1$:\n\n**1. Continue the pattern.** Use $n! = n \\times (n-1)!$ with $n = 1$: $1! = 1 \\times 0!$. Since $1! = 1$, we need $0! = 1$.\n\n**2. Count.** How many ways are there to arrange zero objects? Exactly one: the empty arrangement, where you do nothing. That is one outcome, not zero outcomes.\n\n**3. Keep formulas valid.** Filling $r$ slots from $n$ objects gives $n(n-1)\\cdots(n-r+1)$, which equals $\\frac{n!}{(n-r)!}$ (Chapter 1 builds on this). With $r = n$, filling every slot should give $n!$, and the formula gives $\\frac{n!}{0!}$. That is right only if $0! = 1$.\n\n**4. The empty product.** An empty product is 1, just as an empty sum is 0. A running total starts at 0 before anything is added, and a running product starts at 1 before anything is multiplied. Multiplying by nothing leaves that starting value 1 unchanged, so the product of no numbers is 1.",
    },
    {
      type: "math",
      latex: "0! = 1",
    },
    {
      type: "text",
      content: "**How fast factorials grow.** Each step multiplies by a bigger number, so they get very large very quickly.",
    },
    {
      type: "table",
      headers: ["$n$", "$n!$", "To put it in perspective"],
      rows: [
        ["5", "120", "Orders of 5 books on a shelf"],
        ["10", "3,628,800", "One arrangement per second: 6 weeks nonstop"],
        ["13", "6,227,020,800", "Already more than 6 billion"],
        ["20", "2,432,902,008,176,640,000", "About $2.4 \\times 10^{18}$: one per second would take 77 billion years"],
        ["52", "about $8.07 \\times 10^{67}$", "Shuffles of a deck: almost surely no two real shuffles have ever matched"],
      ],
    },
    {
      type: "text",
      content:
        "Because the numbers are so large, **never multiply factorials out in full when you can cancel.** Write the bigger factorial down until the smaller one appears, then cancel it.\n\n**Worked example 1.** $\\dfrac{10!}{8!} = \\dfrac{10 \\times 9 \\times 8!}{8!} = 10 \\times 9 = 90$.\n\n**Worked example 2.** $\\dfrac{(n+1)!}{(n-1)!} = \\dfrac{(n+1) \\times n \\times (n-1)!}{(n-1)!} = (n+1)n = n^2 + n$.\n\n**Worked example 3.** Solve $\\dfrac{n!}{(n-2)!} = 56$.\n\n**Step 1.** Cancel: $\\dfrac{n(n-1)(n-2)!}{(n-2)!} = n(n-1)$.\n\n**Step 2.** $n(n-1) = 56$, so $n^2 - n - 56 = 0$, which is $(n-8)(n+7) = 0$.\n\n**Step 3.** $n = 8$ or $n = -7$. $(n-2)!$ needs $n - 2 \\geq 0$, so $n$ must be a whole number at least 2; $n = 8$. **Check:** $8 \\times 7 = 56$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 4.** Find $x$ if $\\dfrac{1}{8!} + \\dfrac{1}{9!} = \\dfrac{x}{10!}$.\n\nMultiply every term by $10!$: $\\dfrac{10!}{8!} + \\dfrac{10!}{9!} = x$, so $x = 90 + 10 = 100$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (exam style).** Find $n$ if $(n+2)! = 2550 \\times n!$.\n\n**Step 1 (write the bigger factorial down to the smaller one).** $(n+2)! = (n+2)(n+1) \\times n!$.\n*Why this step:* once $n!$ appears on both sides you can divide it away, since $n! \\neq 0$.\n\n**Step 2 (cancel).** $(n+2)(n+1) = 2550$.\n\n**Step 3 (spot the product of neighbours).** The left side is two consecutive whole numbers multiplied. $\\sqrt{2550} \\approx 50.5$, so try $51 \\times 50 = 2550$. ✓ So $n + 2 = 51$ and $n = 49$.\n*Why this step:* you could expand to $n^2 + 3n - 2548 = 0$, but spotting two neighbours near the square root is faster. The quadratic's other root is $n = -52$, which is not allowed.\n\n**Check.** $\\dfrac{51!}{49!} = 51 \\times 50 = 2550$. ✓",
    },
    {
      type: "math",
      latex: "\\frac{(n+2)!}{n!} = (n+2)(n+1) = 2550 = 51 \\times 50 \\;\\Rightarrow\\; n = 49",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: factorials behave like ordinary numbers",
      content:
        "$\\dfrac{6!}{3!}$ is **not** $2!$. It is $6 \\times 5 \\times 4 = 120$, while $2! = 2$.\n$(2n)!$ is **not** $2 \\cdot n!$. For $n = 3$: $6! = 720$, but $2 \\cdot 3! = 12$.\n$(a+b)!$ is **not** $a! + b!$. For $a = b = 2$: $4! = 24$, but $2! + 2! = 4$.\nThe factorial is a product of many terms, so it does not split up like that. Expand it and cancel.",
    },
    {
      type: "callout",
      variant: "info",
      title: "JEE extension: how many times does a prime divide $n!$?",
      content:
        "How many factors of 2 are in $10! = 1 \\times 2 \\times \\cdots \\times 10$? Count them in layers instead of multiplying out.\n• Every multiple of 2 (2, 4, 6, 8, 10) gives at least one 2: $\\lfloor 10/2 \\rfloor = 5$.\n• Every multiple of 4 (4, 8) gives one **more** 2: $\\lfloor 10/4 \\rfloor = 2$.\n• Every multiple of 8 (just 8) gives one more again: $\\lfloor 10/8 \\rfloor = 1$.\nSo the exponent of 2 in $10!$ is $5 + 2 + 1 = 8$. Check: $10! = 3{,}628{,}800 = 2^8 \\times 14{,}175$, and $14{,}175$ is odd. ✓\n\nIn general the exponent of a prime $p$ in $n!$ is $\\lfloor n/p \\rfloor + \\lfloor n/p^2 \\rfloor + \\lfloor n/p^3 \\rfloor + \\cdots$ (Legendre's formula). Each layer counts the numbers that contribute one more $p$.\n\n**Trailing zeros.** Each trailing zero of $n!$ is a factor $10 = 2 \\times 5$. There are far more 2s than 5s, so the 5s decide. Trailing zeros of $100!$: $\\lfloor 100/5 \\rfloor + \\lfloor 100/25 \\rfloor = 20 + 4 = 24$. The multiples of 25 (25, 50, 75, 100) each carry a second 5, which is why the second term is needed.",
    },
    {
      type: "quiz",
      id: "pc0-4-q1",
      variant: "practice",
      question: "In how many ways can 5 different books be arranged on a shelf?",
      options: [
        { text: "120", correct: true, feedback: "$5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$." },
        { text: "25", feedback: "$5 \\times 5$ lets the same book fill two places." },
        { text: "15", feedback: "$5 + 4 + 3 + 2 + 1$ adds the slot counts. The slots are filled one after another (AND), so multiply." },
        { text: "3125", feedback: "$5^5$ allows repeats: the same book in several places." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-4-q2",
      variant: "practice",
      question: "Simplify $\\dfrac{12!}{10!}$.",
      options: [
        { text: "132", correct: true, feedback: "$\\frac{12 \\times 11 \\times 10!}{10!} = 12 \\times 11 = 132$." },
        { text: "$\\dfrac{6}{5}$", feedback: "Factorials cannot be divided like ordinary numbers. Expand $12!$ down to $10!$ and cancel." },
        { text: "$2!$", feedback: "$\\frac{12!}{10!}$ is not $(12-10)!$. Write $12! = 12 \\times 11 \\times 10!$." },
        { text: "12", feedback: "You stopped one term early. $12!$ has both 12 and 11 above $10!$." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-4-q3",
      variant: "concept",
      question: "Why is $0!$ defined to be 1 and not 0?",
      options: [
        {
          text: "There is exactly one way to arrange nothing, and $0! = 1$ keeps $n! = n \\times (n-1)!$ true at $n = 1$.",
          correct: true,
          feedback: "Both the counting meaning and the pattern agree on 1.",
        },
        {
          text: "It is an arbitrary convention with no reason behind it.",
          feedback: "It is forced. Any other value would break $1! = 1 \\times 0!$ and the formula $\\frac{n!}{(n-r)!}$ at $r = n$.",
        },
        {
          text: "Because the product of no numbers is 0.",
          feedback: "An empty product is 1, the starting value for multiplication, in the same way that an empty sum is 0.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pc0-4-q4",
      variant: "practice",
      question: "Solve $\\dfrac{n!}{(n-2)!} = 30$ for a whole number $n$.",
      options: [
        { text: "$n = 6$", correct: true, feedback: "$n(n-1) = 30$, so $(n-6)(n+5) = 0$. Reject $-5$, which leaves $n = 6$. Check: $6 \\times 5 = 30$." },
        { text: "$n = 5$", feedback: "$5 \\times 4 = 20$, not 30." },
        { text: "$n = 32$", feedback: "$\\frac{n!}{(n-2)!}$ is not $n - 2$. It is $n(n-1)$." },
        { text: "$n = 6$ or $n = -5$", feedback: "$(-5)!$ is not defined. Only $n = 6$ is allowed." },
      ],
      hint: "Cancel to get $n(n-1)$, then solve the quadratic.",
    },
    {
      type: "quiz",
      id: "pc0-4-q5",
      variant: "concept",
      question: "Which statement is true?",
      options: [
        { text: "$\\dfrac{6!}{3!} = 120$", correct: true, feedback: "$6 \\times 5 \\times 4 = 120$." },
        { text: "$\\dfrac{6!}{3!} = 2!$", feedback: "Dividing factorials does not divide the numbers inside them. $\\frac{720}{6} = 120$." },
        { text: "$(2 \\cdot 3)! = 2 \\cdot 3!$", feedback: "$6! = 720$, but $2 \\cdot 3! = 12$." },
        { text: "$4! = 2! + 2!$", feedback: "$24 \\neq 4$. A factorial of a sum does not split up." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-4-q6",
      variant: "practice",
      question: "If $\\dfrac{1}{6!} + \\dfrac{1}{7!} = \\dfrac{x}{8!}$, what is $x$?",
      options: [
        { text: "64", correct: true, feedback: "Multiply by $8!$: $\\frac{8!}{6!} + \\frac{8!}{7!} = 56 + 8 = 64$." },
        { text: "2", feedback: "Fractions with factorials cannot be added across like that. Multiply every term by $8!$ first." },
        { text: "56", feedback: "That is only the first term. Add $\\frac{8!}{7!} = 8$ as well." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-4-q7",
      variant: "practice",
      question: "How many zeros does $50!$ end with?",
      options: [
        { text: "12", correct: true, feedback: "Count the 5s: $\\lfloor 50/5 \\rfloor + \\lfloor 50/25 \\rfloor = 10 + 2 = 12$. There are plenty of 2s to pair with them." },
        { text: "10", feedback: "$\\lfloor 50/5 \\rfloor = 10$ misses that 25 and 50 each carry a **second** factor of 5. Add $\\lfloor 50/25 \\rfloor = 2$." },
        { text: "5", feedback: "$\\lfloor 50/10 \\rfloor$ counts only multiples of 10. A zero also comes from a 5 (like 15) paired with a 2 from somewhere else." },
        { text: "59", feedback: "That adds the 2s and the 5s. Each zero needs one 2 **and** one 5, so the scarcer prime, 5, decides." },
      ],
      hint: "Each trailing zero needs a 2 and a 5. Which is scarcer?",
    },
    {
      type: "quiz",
      id: "pc0-4-q8",
      variant: "practice",
      question: "What is the highest power of 3 that divides $20!$?",
      options: [
        { text: "$3^8$", correct: true, feedback: "$\\lfloor 20/3 \\rfloor + \\lfloor 20/9 \\rfloor = 6 + 2 = 8$. The 27 layer gives 0." },
        { text: "$3^6$", feedback: "$\\lfloor 20/3 \\rfloor = 6$ misses that 9 and 18 each carry a second factor of 3." },
        { text: "$3^2$", feedback: "That counts only the multiples of 9. Every multiple of 3 contributes at least one 3." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-4-q9",
      variant: "practice",
      question: "8 people stand in a row for a photo. Two of them, the bride and the groom, must stand at the two ends. How many arrangements are there?",
      options: [
        { text: "1440", correct: true, feedback: "Ends first: bride and groom in $2! = 2$ ways. The other 6 fill the middle in $6! = 720$ ways. $2 \\times 720 = 1440$." },
        { text: "720", feedback: "That fixes who stands at which end. The bride can be on the left or on the right, so multiply by 2." },
        { text: "40,320", feedback: "$8!$ ignores the condition. Most of those orders don't have the couple at the ends." },
        { text: "10,080", feedback: "$2 \\times 7!$ places one person at an end and lets the other 7 go anywhere. Both ends are taken by the couple." },
      ],
      hint: "Fill the two end slots first, then arrange everyone else.",
    },
    {
      type: "quiz",
      id: "pc0-4-q10",
      variant: "practice",
      question: "5 friends sit in a row at the cinema. In how many seatings do two particular friends **not** sit next to each other?",
      options: [
        { text: "72", correct: true, feedback: "Together: glue the pair, $4! \\times 2! = 48$. All: $5! = 120$. Not together: $120 - 48 = 72$." },
        { text: "48", feedback: "That is the number of seatings where they **are** together. Subtract it from $5!$." },
        { text: "96", feedback: "$120 - 24$ forgets that the glued pair can sit in 2 orders inside the block, so together is $4! \\times 2 = 48$." },
        { text: "120", feedback: "That is every seating, including the ones with the two friends side by side." },
      ],
      hint: "Count \"together\" by gluing the two into one block, then use the complement.",
    },
    {
      type: "quiz",
      id: "pc0-4-q11",
      variant: "practice",
      question: "Find $n$ if $(n+1)! = 12 \\times (n-1)!$.",
      options: [
        { text: "$n = 3$", correct: true, feedback: "$(n+1)! = (n+1)n(n-1)!$, so $(n+1)n = 12 = 4 \\times 3$ and $n = 3$. Check: $4! = 24 = 12 \\times 2!$." },
        { text: "$n = 4$", feedback: "Then $(n+1)n = 5 \\times 4 = 20$, not 12." },
        { text: "$n = 11$", feedback: "$\\frac{(n+1)!}{(n-1)!}$ is not $n + 1$. It is $(n+1)n$." },
        { text: "$n = 3$ or $n = -4$", feedback: "$(-5)!$ is not defined, so $n = -4$ is rejected. Only $n = 3$." },
      ],
      hint: "Write $(n+1)!$ down until $(n-1)!$ appears, then cancel.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "restricted-slots-first",
  title: "0.5 · Restricted Slots First",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "Up to now every slot has been equally free. Real problems have conditions, such as *a number can't start with 0* or *the number must be even*. A condition makes one slot fussier than the others, and the order in which you fill the slots starts to matter a lot.\n\nThe rule for this whole lesson: **fill the most restricted slot first.**",
    },
    {
      type: "text",
      content:
        "**Worked example 1: 4-digit numbers with distinct digits.** Using the digits 0 to 9 without repetition, how many 4-digit numbers can be formed?\n\n**Step 1 (the fussy slot).** The thousands digit cannot be 0, or the number would really have 3 digits. So it has **9** choices (1 to 9).\n\n**Step 2 (the rest).** Whatever digit went first, 9 digits are left, and 0 is now allowed. Then 8, then 7.\n\n**Step 3.** $9 \\times 9 \\times 8 \\times 7 = 4536$.",
    },
    {
      type: "math",
      latex: "\\underset{\\text{not } 0}{\\boxed{9}} \\times \\boxed{9} \\times \\boxed{8} \\times \\boxed{7} = 4536",
    },
    {
      type: "text",
      content:
        "The same idea works away from digits. **Worked example (word problem): the family car.** A family of 5 goes on a trip in a 5-seater car. Only Dad and Mum can drive. In how many ways can the family be seated?\n\n**Step 1 (the fussy slot).** The driver's seat can take only Dad or Mum: 2 choices.\n*Why this step:* the other 4 seats accept anyone, so they can wait. If you filled a passenger seat first and put Dad there, the driver's seat would have 1 choice instead of 2, and the count would stop being fixed.\n\n**Step 2 (the rest).** Whoever drives, the other 4 people fill the 4 remaining seats in $4! = 24$ ways.\n\n**Step 3.** $2 \\times 24 = 48$.\n\n**Sense check.** Without the driving rule there are $5! = 120$ seatings. The driver is one of 5 people, and 2 of those 5 can drive, so the answer should be $\\frac{2}{5}$ of 120, which is 48. ✓",
    },
    {
      type: "math",
      latex: "\\underset{\\text{Dad or Mum}}{\\boxed{2}} \\times \\underbrace{4!}_{\\text{everyone else}} = 2 \\times 24 = 48",
    },
    {
      type: "text",
      content:
        "**Worked example 2: even numbers.** How many of those 4536 numbers are **even**?\n\nNow two slots are fussy. The units digit must be 0, 2, 4, 6 or 8, and the thousands digit must not be 0. Try filling left to right and you get stuck. The thousands digit has 9 choices, but how many even digits are left for the units slot? That depends on whether earlier slots used even digits, so there is no fixed number and the product rule fails.\n\n**Step 1 (units first).** Fill the units digit first. But the choice there changes what the thousands slot is allowed to be, because it matters whether 0 has been used up. So **split into cases** on the units digit.",
    },
    {
      type: "text",
      content:
        "**Case A: units digit is 0.** Then 0 is used, so the thousands slot can take any of the 9 remaining digits (all nonzero). Then 8, then 7:\n$1 \\times 9 \\times 8 \\times 7 = 504$.\n\n**Case B: units digit is 2, 4, 6 or 8** (4 ways). The thousands slot can't be 0 and can't be the units digit, which leaves **8** choices. The hundreds slot then has 8 left (0 is back in play), and the tens has 7:\n$4 \\times 8 \\times 8 \\times 7 = 1792$.\n\n**Step 2 (add; the cases don't overlap).** $504 + 1792 = 2296$.\n\n**Check with the complement.** Odd numbers: units digit 1, 3, 5, 7 or 9 (5 ways). The thousands slot then has 8 choices (not 0, not the units digit), then 8, then 7: $5 \\times 8 \\times 8 \\times 7 = 2240$. And $4536 - 2240 = 2296$. ✓",
    },
    {
      type: "text",
      content:
        "The case split is easier to see on a smaller version you can list. How many 3-digit even numbers can be made from the digits $\\{0, 1, 2, 3\\}$ without repetition? The units digit is 0 or 2, and those two cases behave differently.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "sum",
        branches: [
          {
            label: "Units = 0",
            stages: [
              { label: "Hundreds", options: ["1", "2", "3"] },
              { label: "Tens", options: ["smaller leftover", "larger leftover"] },
            ],
          },
          {
            label: "Units = 2",
            stages: [
              { label: "Hundreds", options: ["1", "3"] },
              { label: "Tens", options: ["smaller leftover", "larger leftover"] },
            ],
          },
        ],
        caption:
          "With units 0, the hundreds slot has 3 choices (1, 2, 3). With units 2, it has only 2 (1 or 3), because 0 is still unused and cannot lead. The tens slot always has the 2 digits not yet used; which 2 depends on the hundreds digit, but the count is always 2. (3 × 2) + (2 × 2) = 10.",
      },
    },
    {
      type: "text",
      content:
        "**List to confirm.** Ending in 0: 120, 130, 210, 230, 310, 320. Ending in 2: 102, 132, 302, 312. That is 6 + 4 = 10. ✓ The two branches really do have different shapes. That is why one product cannot count them, and the sum rule has to join them.",
    },
    {
      type: "text",
      content:
        "**Worked example 3: numbers greater than 5000.** How many 4-digit numbers with distinct digits (from 0 to 9) are greater than 5000?\n\n**Step 1 (the fussy slot).** The number exceeds 5000 exactly when the thousands digit is 5, 6, 7, 8 or 9. (5000 itself repeats the digit 0, so it is not in our list anyway.) That gives 5 choices.\n\n**Step 2.** The other three slots have 9, 8, 7 choices, and 0 is allowed there.\n\n**Step 3.** $5 \\times 9 \\times 8 \\times 7 = 2520$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: always fill slots from left to right",
      content:
        "The slots of a number are read from left to right, but you do not have to fill them in that order. If you fill left to right and a later slot has a condition, the number of choices left for that slot depends on what you picked earlier, and the product rule breaks. **Find the slot with the tightest condition and fill it first.** If the choice there changes what another restricted slot can take (as 0 did above), split into cases.",
    },
    {
      type: "table",
      headers: ["Condition", "Restricted slot", "Watch out for"],
      rows: [
        ["Number has $k$ digits", "First digit: not 0", "Whether 0 has been used by another restricted slot"],
        ["Even / odd", "Units digit", "0 is even. It can split the count into cases"],
        ["Divisible by 5", "Units digit: 0 or 5", "Same 0 interaction: split into cases"],
        ["Greater than some value", "Leading digit(s)", "Check the boundary number itself"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example (JEE style): two fussy slots that interact.** How many even numbers between 3000 and 5000 can be formed from the digits 0, 1, 2, 3, 4, 5, 6 if no digit is repeated?\n\n**Step 1 (find the fussy slots).** Between 3000 and 5000 means the thousands digit is 3 or 4. (3000 repeats 0, and 5000 is not below 5000, so neither boundary sneaks in.) Even means the units digit is 0, 2, 4 or 6.\n\n**Step 2 (spot the interaction).** The digit 4 is on both lists. If the thousands digit is 4, the units slot loses one of its even options. So the number of units choices depends on the thousands digit, and one product can't cover both.\n*Why this step:* this is the same trap as 0 in the even-number example. Whenever one digit is allowed in two restricted slots, split on it.\n\n**Step 3 (Case A: thousands digit 3).** Units: any of 0, 2, 4, 6, so 4 choices. The middle two slots take any of the 5 digits left, then 4: $1 \\times 5 \\times 4 \\times 4 = 80$.\n\n**Step 4 (Case B: thousands digit 4).** Units: 0, 2 or 6, so 3 choices. Middle slots: $5 \\times 4$. Total $1 \\times 5 \\times 4 \\times 3 = 60$.\n*Why this step:* 0 causes no trouble here, because the leading slot is already fixed as 3 or 4. The only interaction is the shared 4.\n\n**Step 5 (add).** $80 + 60 = 140$.",
    },
    {
      type: "math",
      latex: "\\underbrace{1 \\cdot 5 \\cdot 4 \\cdot 4}_{\\text{starts with 3}} + \\underbrace{1 \\cdot 5 \\cdot 4 \\cdot 3}_{\\text{starts with 4}} = 80 + 60 = 140",
    },
    {
      type: "text",
      content:
        "**When the boundary matters.** In worked example 3 the boundary 5000 dropped out by itself, because it repeats 0. With repetition allowed it does not. How many 4-digit numbers (digits may repeat) are greater than 5000?\n\n**Step 1.** Leading digit 5 to 9: $5 \\times 10 \\times 10 \\times 10 = 5000$ numbers, running from 5000 to 9999.\n\n**Step 2.** 5000 itself has leading digit 5 but is **not** greater than 5000. Remove it: $5000 - 1 = 4999$.\n\n**Check.** The numbers 5001 to 9999 are $9999 - 5001 + 1 = 4999$. ✓",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (optional, JEE favourite): the sum of all the numbers.** Find the sum of all 3-digit numbers formed from 1, 2, 3 without repetition.\n\n**Step 1 (don't list, count by place).** Fix a digit, say 1, in the units place. The other two places take the other two digits in $2! = 2$ ways. So each digit sits in the units place exactly 2 times, and the same holds for the tens and the hundreds.\n\n**Step 2.** The units column adds up to $2 \\times (1 + 2 + 3) = 12$. The tens column is also 12, but worth 10 each, and the hundreds column is worth 100 each.\n\n**Step 3.** Sum $= (1 + 2 + 3) \\times 2 \\times (100 + 10 + 1) = 6 \\times 2 \\times 111 = 1332$.\n\n**Check by listing.** $123 + 132 + 213 + 231 + 312 + 321 = 1332$. ✓",
    },
    {
      type: "math",
      latex: "\\text{Sum} = (\\text{sum of digits}) \\times (\\text{times each digit sits in a place}) \\times 111 = 6 \\times 2 \\times 111 = 1332",
    },
    {
      type: "quiz",
      id: "pc0-5-q1",
      variant: "practice",
      question: "How many 3-digit numbers have all digits different (digits 0 to 9)?",
      options: [
        { text: "648", correct: true, feedback: "Hundreds: 9 (not 0). Tens: 9. Units: 8. $9 \\times 9 \\times 8 = 648$." },
        { text: "720", feedback: "$10 \\times 9 \\times 8$ allows a leading 0, like 012, which is not a 3-digit number." },
        { text: "504", feedback: "$9 \\times 8 \\times 7$ never lets 0 appear anywhere. 0 is fine in the tens or units slot." },
        { text: "900", feedback: "That is every 3-digit number, including ones with repeated digits." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-5-q2",
      variant: "concept",
      question:
        "Meera counts 4-digit even numbers with distinct digits by going left to right: $9 \\times 9 \\times 8 \\times ?$. Why does she get stuck at the last slot?",
      options: [
        {
          text: "The number of even digits still available depends on which digits she used earlier, so there is no single number to put there.",
          correct: true,
          feedback: "The product rule needs a fixed count at each stage. Filling the units slot first (and splitting on 0) fixes this.",
        },
        {
          text: "She isn't stuck. It is always 5, since there are 5 even digits.",
          feedback: "If she already used, say, 2 and 0, only 3 even digits remain. The count varies.",
        },
        {
          text: "Even numbers can't be counted with slots at all.",
          feedback: "They can. You just fill the units slot first and split into cases on whether it is 0.",
        },
      ],
    },
    {
      type: "quiz",
      id: "pc0-5-q3",
      variant: "practice",
      question: "How many 3-digit odd numbers can be formed from the digits 1, 2, 3, 4, 5, 6 without repetition?",
      options: [
        { text: "60", correct: true, feedback: "Units first: 3 odd choices (1, 3, 5). Then 5 for hundreds and 4 for tens: $3 \\times 5 \\times 4 = 60$. No 0 here, so no case split is needed." },
        { text: "120", feedback: "$6 \\times 5 \\times 4$ counts every number, odd or even." },
        { text: "108", feedback: "$3 \\times 6 \\times 6$ allows digits to repeat. Without repetition the hundreds and tens slots have 5 and 4 choices." },
        { text: "90", feedback: "$6 \\times 5 \\times 3$ fills left to right and assumes 3 odd digits are always left for the units. How many are left depends on what was used, so fill the units slot first." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-5-q4",
      variant: "practice",
      question: "How many 4-digit numbers with distinct digits (from 0 to 9) are greater than 6000?",
      options: [
        { text: "2016", correct: true, feedback: "Thousands digit 6, 7, 8 or 9 (4 ways), then $9 \\times 8 \\times 7$: $4 \\times 504 = 2016$. 6000 itself has repeated digits, so nothing needs removing." },
        { text: "2520", feedback: "That is for greater than 5000, which allows 5 leading digits." },
        { text: "1512", feedback: "$3 \\times 504$ misses one leading digit. 6, 7, 8 and 9 are four digits." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-5-q5",
      variant: "practice",
      question: "How many 3-digit even numbers with distinct digits can be formed from $\\{0, 1, 2, 3, 4\\}$?",
      options: [
        { text: "30", correct: true, feedback: "Units 0: $4 \\times 3 = 12$. Units 2 or 4: hundreds 3 choices (not 0, not the units digit), tens 3, giving $2 \\times 3 \\times 3 = 18$. Total $12 + 18 = 30$." },
        { text: "36", feedback: "That treats all three even units digits like the 0 case. When the units digit is 2 or 4, 0 is still unused and cannot lead." },
        { text: "27", feedback: "$3 \\times 3 \\times 3$ treats every case like units 2 or 4. When the units digit is 0, the hundreds slot has 4 choices, not 3." },
        { text: "48", feedback: "$4 \\times 4 \\times 3$ counts all 3-digit numbers from these digits, odd ones included." },
      ],
      hint: "Split on the units digit: 0, or one of 2 and 4.",
    },
    {
      type: "quiz",
      id: "pc0-5-q6",
      variant: "practice",
      question: "Digits may repeat. How many 4-digit numbers are greater than 6000?",
      options: [
        { text: "3999", correct: true, feedback: "Leading digit 6 to 9: $4 \\times 10^3 = 4000$ numbers, from 6000 to 9999. Remove 6000 itself, which is not greater than 6000: 3999." },
        { text: "4000", feedback: "That includes 6000, which is equal to 6000, not greater. With repetition allowed, the boundary is a real number in the count." },
        { text: "2016", feedback: "That is the count with **distinct** digits. Here digits may repeat, so the last three slots have 10 choices each." },
      ],
      hint: "Count by the leading digit, then check whether 6000 itself sneaked in.",
    },
    {
      type: "quiz",
      id: "pc0-5-q7",
      variant: "practice",
      question: "What is the sum of all 3-digit numbers formed from the digits 2, 4, 6 without repetition?",
      options: [
        { text: "2664", correct: true, feedback: "Each digit sits in each place $2! = 2$ times: $(2 + 4 + 6) \\times 2 \\times 111 = 12 \\times 222 = 2664$." },
        { text: "1332", feedback: "$12 \\times 111$ forgets that each digit appears in each place **twice** (the other two digits can be arranged in 2 ways)." },
        { text: "72", feedback: "That adds only the digits, $6 \\times 12$. Each digit's place value (100, 10 or 1) has to be counted." },
      ],
      hint: "How many times does 2 appear in the units place? Then use place values 100 + 10 + 1.",
    },
    {
      type: "quiz",
      id: "pc0-5-q8",
      variant: "practice",
      question: "6 friends share a 6-seater van. Only 3 of them have a driving licence. In how many ways can they be seated?",
      options: [
        { text: "360", correct: true, feedback: "Driver's seat first: 3 choices. The other 5 fill the remaining seats in $5! = 120$ ways. $3 \\times 120 = 360$." },
        { text: "720", feedback: "$6!$ lets anyone drive, including the 3 without a licence." },
        { text: "36", feedback: "$3 \\times 3!$ arranges only the 3 non-drivers. After the driver is chosen, 5 people (including 2 licence holders) fill the other seats." },
        { text: "120", feedback: "$5!$ is the passengers only. Multiply by the 3 choices of driver." },
      ],
      hint: "Which seat has a condition? Fill it first.",
    },
    {
      type: "quiz",
      id: "pc0-5-q9",
      variant: "practice",
      question:
        "How many even numbers between 2000 and 4000 can be formed from the digits 0, 1, 2, 3, 4, 5 without repetition?",
      options: [
        { text: "60", correct: true, feedback: "Thousands 2: units 0 or 4 (2 ways), middle $4 \\times 3$, giving 24. Thousands 3: units 0, 2 or 4 (3 ways), middle $4 \\times 3$, giving 36. $24 + 36 = 60$." },
        { text: "72", feedback: "$2 \\times 3 \\times 12$ gives the units slot 3 even digits in both cases. When the number starts with 2, the 2 is used up." },
        { text: "48", feedback: "$2 \\times 2 \\times 12$ treats both cases like the thousands-2 case. Starting with 3 leaves all three even digits for the units." },
        { text: "120", feedback: "That counts every number from 2000 to 3999 with these digits, odd ones included." },
      ],
      hint: "Split on the thousands digit. Does it use up one of the even digits?",
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
        "Every question below uses the same few tools: **AND multiplies, OR adds (only when the cases don't overlap), at least one = all − none, and fill the fussiest slot first.** Before calculating, decide which tool the question needs. If you are unsure, try a small case you can list.",
    },
    {
      type: "table",
      headers: ["Signal in the question", "Tool"],
      rows: [
        ["A sequence of choices: this, then that", "Product rule"],
        ["Separate alternatives: this kind or that kind", "Sum rule (check they don't overlap)"],
        ["\"at least one\"", "Complement: all − none"],
        ["Arrange all $n$ distinct things", "$n!$"],
        ["A slot with a condition (no leading 0, even, > 5000)", "Fill it first; split into cases if 0 interferes"],
      ],
    },
    {
      type: "quiz",
      id: "pc0-6-q1",
      variant: "mastery",
      question:
        "A meal must include one of 5 mains. You may also add one of 4 starters or skip the starter, and add one of 3 desserts or skip dessert. How many different meals are possible?",
      options: [
        { text: "100", correct: true, feedback: "Treat skipping as one more option: starter $4 + 1 = 5$, main 5, dessert $3 + 1 = 4$. So $5 \\times 5 \\times 4 = 100$." },
        { text: "60", feedback: "$4 \\times 5 \\times 3$ forces a starter and a dessert. Skipping is an extra option at each of those stages." },
        { text: "12", feedback: "Adding the menus treats the meal as a single choice. It is a starter-option AND a main AND a dessert-option." },
        { text: "120", feedback: "$5 \\times 6 \\times 4$ adds a skip option to the main as well, but a main is required." },
      ],
      hint: "\"None\" counts as an option at any stage that can be skipped.",
    },
    {
      type: "quiz",
      id: "pc0-6-q2",
      variant: "mastery",
      question:
        "A code is 2 different letters followed by 3 different digits (like QZ407). How many codes are possible?",
      options: [
        { text: "468,000", correct: true, feedback: "$26 \\times 25 \\times 10 \\times 9 \\times 8 = 650 \\times 720 = 468{,}000$." },
        { text: "676,000", feedback: "$26^2 \\times 10^3$ allows repeats." },
        { text: "1370", feedback: "$650 + 720$ adds the letter part and the digit part. A code has both parts, so multiply." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-6-q3",
      variant: "mastery",
      question:
        "How many 5-digit numbers can be formed using each of the digits 0, 1, 2, 3, 4 exactly once?",
      options: [
        { text: "96", correct: true, feedback: "Leading slot first: 4 choices (not 0), then the other 4 digits in $4! = 24$ ways. $4 \\times 24 = 96$. Or: $5! - 4! = 120 - 24$ (all orders minus those starting with 0)." },
        { text: "120", feedback: "$5!$ includes orders like 01234 that start with 0, which are not 5-digit numbers." },
        { text: "24", feedback: "$4!$ counts only the orders of the last four digits, for one fixed first digit." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-6-q4",
      variant: "mastery",
      question:
        "How many of those 5-digit numbers (each of 0, 1, 2, 3, 4 used once) are even?",
      options: [
        { text: "60", correct: true, feedback: "Units 0: $4! = 24$. Units 2 or 4: first digit 3 ways (not 0, not the units digit), then $3! = 6$, giving $2 \\times 3 \\times 6 = 36$. $24 + 36 = 60$. Check: odd = $2 \\times 3 \\times 6 = 36$, and $96 - 36 = 60$ ✓." },
        { text: "72", feedback: "$3 \\times 24$ treats every even units digit like the 0 case. With units 2 or 4, 0 can still end up in front." },
        { text: "54", feedback: "$3 \\times 3 \\times 6$ treats every case like units 2 or 4. With units 0, the first slot has all 4 remaining digits." },
        { text: "48", feedback: "$96 \\div 2$ assumes exactly half are even. The 0 makes the cases uneven." },
      ],
      hint: "Units digit first. Split on whether it is 0.",
    },
    {
      type: "quiz",
      id: "pc0-6-q5",
      variant: "mastery",
      question:
        "Using the letters A, B, C, D, E without repetition, how many 3-letter arrangements contain **at least one** vowel?",
      options: [
        { text: "54", correct: true, feedback: "All: $5 \\times 4 \\times 3 = 60$. No vowel means using only B, C, D: $3! = 6$. So $60 - 6 = 54$." },
        { text: "6", feedback: "That is the number with **no** vowel. Subtract it from the total." },
        { text: "36", feedback: "That is the number with **exactly** one vowel. The 18 arrangements containing both A and E also count. The complement avoids this split." },
        { text: "60", feedback: "That is every arrangement, including BCD-type ones with no vowel." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-6-q6",
      variant: "mastery",
      question: "How many 4-digit numbers with distinct digits (from 0 to 9) are divisible by 5?",
      options: [
        { text: "952", correct: true, feedback: "Units 0: $9 \\times 8 \\times 7 = 504$. Units 5: thousands 8 (not 0, not 5), then 8, then 7 = 448. $504 + 448 = 952$." },
        { text: "1008", feedback: "$2 \\times 504$ treats units 5 like units 0. With units 5, 0 is still available and must not lead." },
        { text: "896", feedback: "$2 \\times 448$ treats units 0 like units 5. When 0 sits in the units place, the thousands slot has 9 choices." },
      ],
      hint: "Divisible by 5 means the units digit is 0 or 5. The two cases behave differently.",
    },
    {
      type: "quiz",
      id: "pc0-6-q7",
      variant: "mastery",
      question: "How many 3-digit numbers (100 to 999) have at least one repeated digit?",
      options: [
        { text: "252", correct: true, feedback: "All: 900. All different: $9 \\times 9 \\times 8 = 648$. $900 - 648 = 252$." },
        { text: "280", feedback: "That is for 3-digit **strings** 000 to 999. Numbers cannot start with 0." },
        { text: "648", feedback: "That is the number with all digits different." },
        { text: "243", feedback: "That counts **exactly** two equal digits. The 9 numbers like 111 and 777 also have a repeat." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-6-q8",
      variant: "mastery",
      question: "How many numbers from 1 to 50 are divisible by 2 or by 5?",
      options: [
        { text: "30", correct: true, feedback: "Multiples of 2: 25. Of 5: 10. Of both (multiples of 10): 5. $25 + 10 - 5 = 30$." },
        { text: "35", feedback: "Adding 25 and 10 counts 10, 20, 30, 40, 50 twice. The cases overlap." },
        { text: "250", feedback: "A number is chosen once, so this is not AND. Multiplying counts pairs." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-6-q9",
      variant: "mastery",
      question: "Solve $\\dfrac{n!}{(n-2)!} = 132$.",
      options: [
        { text: "$n = 12$", correct: true, feedback: "$n(n-1) = 132$, so $(n-12)(n+11) = 0$ and $n = 12$. Check: $12 \\times 11 = 132$." },
        { text: "$n = 11$", feedback: "$11 \\times 10 = 110$." },
        { text: "$n = 134$", feedback: "The ratio is $n(n-1)$, not $n - 2$." },
      ],
    },
    {
      type: "quiz",
      id: "pc0-6-q10",
      variant: "mastery",
      question:
        "A student goes from home to school by one of 3 buses or along one of 2 walking paths, and returns home, again by one of the 3 buses or one of the 2 paths. The return need not match the way there. How many round trips are possible?",
      options: [
        { text: "25", correct: true, feedback: "Each way: $3 + 2 = 5$ options (OR: add). Going AND returning: $5 \\times 5 = 25$." },
        { text: "5", feedback: "That forces the return to copy the outward trip. Here any of the 5 options may be used on the way back." },
        { text: "10", feedback: "$5 + 5$ adds the two legs, but the trip includes both legs, so multiply." },
        { text: "36", feedback: "$6 \\times 6$ multiplies bus and path within one leg, but on each leg you use a bus OR a path." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "You can now count sequences, alternatives, complements and full arrangements, and handle fussy slots. Chapter 1 takes the slot picture further: arranging only **some** of the objects, arranging with repeats, with identical letters, and around a circle. Every one of those formulas comes from the tools in this chapter.",
    },
  ]),
};

export const pncChapter0Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
