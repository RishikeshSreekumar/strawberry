import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Permutations, Combinations & the Binomial Theorem Chapter 3 — Distributions
 * and Advanced Counting. Finishes the counting toolkit: dividing people into
 * labelled and unlabelled groups, identical objects into boxes (stars and
 * bars, with lower and upper bounds), distinct objects into distinct boxes
 * (k^n, onto counts by inclusion–exclusion, derangements), and a three-question
 * procedure for choosing the right model.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "dividing-into-groups",
  title: "3.1 · Dividing into Groups",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pc-3-distributions-and-advanced-counting.mp4",
      poster: "/videos/pc-3-distributions-and-advanced-counting.jpg",
      title: "Chapter 3 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "A teacher has 12 students and three projects: a model bridge that needs 5 students, a poster that needs 4 and a quiz stall that needs 3. How many ways can she split the class?\n\nYou already have the tool. Pick the bridge team, then the poster team from those left, and the quiz team is whoever remains:",
    },
    {
      type: "math",
      latex:
        "{}^{12}C_5 \\times {}^{7}C_4 \\times {}^{3}C_3 = 792 \\times 35 \\times 1 = 27\\,720",
    },
    {
      type: "text",
      content:
        "Write the three combinations out as factorials and most of it cancels:\n\n$\\displaystyle \\frac{12!}{5!\\,7!} \\times \\frac{7!}{4!\\,3!} \\times \\frac{3!}{3!\\,0!} = \\frac{12!}{5!\\,4!\\,3!}$\n\nThat shape should look familiar. It is the formula for arranging a word with repeated letters from 1.3. Give each student a letter for their team, B for bridge, P for poster, Q for quiz. Then a split of the class is a 12-letter word with five B's, four P's and three Q's, and 1.3 counted those words as $\\frac{12!}{5!\\,4!\\,3!}$.",
    },
    {
      type: "text",
      content:
        "Here is the same idea small enough to see all at once. Four friends, Asha, Ben, Chitra and Dev, are split into the **Red** team and the **Green** team, two each. Read each word below as a team sheet: position 1 is Asha, position 2 is Ben, position 3 is Chitra, position 4 is Dev, and the letter (R or G) says which team they are on.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["R", "R", "G", "G"],
        groupBy: "identical",
        showLabels: true,
        caption:
          "24 orderings with the copies labelled, 6 once the labels are erased. Each of the 6 words is one way to fill the Red and Green teams. Notice that RRGG and GGRR are the same two pairs with the team colours swapped.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Labelled groups (the multinomial count)",
      content:
        "The number of ways to split $n$ different objects into groups that have **names** (or different sizes) with $n_1, n_2, \\ldots, n_k$ objects, where $n_1 + n_2 + \\cdots + n_k = n$, is\n\n$\\displaystyle \\frac{n!}{n_1!\\,n_2!\\cdots n_k!}$\n\nIt is the same number as the arrangements of a word with $n_1$ copies of one letter, $n_2$ of another, and so on.",
    },
    {
      type: "text",
      content:
        "**Now take the names away.** Suppose the four friends just need to pair up for a game of doubles, with no Red team and no Green team. The 6 labelled splits come in matching twos:\n\n- RRGG and GGRR both mean {Asha, Ben} and {Chitra, Dev}\n- RGRG and GRGR both mean {Asha, Chitra} and {Ben, Dev}\n- RGGR and GRRG both mean {Asha, Dev} and {Ben, Chitra}\n\nOnce the names are gone, each split has been counted $2! = 2$ times, once for each way of putting the names back on. So there are $6 \\div 2 = 3$ ways to pair up.",
    },
    {
      type: "text",
      content:
        "The same reasoning works at any size. Split the 12 students into **three groups of 4** with nothing to tell the groups apart. With names on the groups there are $\\frac{12!}{4!\\,4!\\,4!} = 34\\,650$ splits. Every unnamed split turns into $3! = 6$ named ones, because you can hand out the three names in $3!$ orders. So the unnamed count is",
    },
    {
      type: "math",
      latex: "\\frac{12!}{4!\\,4!\\,4!\\,\\cdot\\,3!} = \\frac{34\\,650}{6} = 5775",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Unlabelled groups of equal size",
      content:
        "Splitting $mn$ different objects into $n$ groups of $m$ each, where the groups have no names:\n\n$\\displaystyle \\frac{(mn)!}{(m!)^n\\, n!}$\n\nThe extra $n!$ divides out the orders in which names could have been attached. Only groups that have **the same size** need it. Groups of different sizes can already be told apart by their size.\n\nIn general, divide the labelled count by $a!\\,b!\\cdots$, where $a$ groups share one size, $b$ groups share another size, and so on. For sizes 2, 2, 5 divide by $2!$ only.",
    },
    {
      type: "text",
      content:
        "**Putting the names back.** If the three groups of 4 are then sent to Rooms 1, 2 and 3, each of the 5775 unnamed splits can be sent in $3! = 6$ ways, and you get $5775 \\times 6 = 34\\,650$ again. Dividing by $3!$ and then multiplying by $3!$ agree, and that is a good check that the division was right.",
    },
    {
      type: "table",
      headers: ["Situation", "Count", "Why"],
      rows: [
        ["12 students into teams of 5, 4, 3", "$\\frac{12!}{5!\\,4!\\,3!} = 27\\,720$", "Sizes differ, so each team is known by its size"],
        ["12 students into 3 named teams of 4", "$\\frac{12!}{(4!)^3} = 34\\,650$", "The names tell the teams apart"],
        ["12 students into 3 unnamed teams of 4", "$\\frac{12!}{(4!)^3\\,3!} = 5775$", "Each split was counted $3!$ times"],
        ["4 people into two unnamed pairs", "$\\frac{4!}{(2!)^2\\,2!} = 3$", "Each split was counted $2!$ times"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: equal groups count like named groups",
      content:
        "\"Split 4 people into two pairs\" is **3**, not 6. The answer 6 treats the pairs as if they were called the Red team and the Green team. Before dividing by $k!$, check two things: are the groups the same size, and does anything in the question give them names? Look for words like rooms, projects, colours or \"first group\". Only equal-sized groups with no names get the $k!$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** In how many ways can 8 players be split into 4 doubles pairs?\n\n1. With named courts, 1 to 4: $\\frac{8!}{(2!)^4} = \\frac{40\\,320}{16} = 2520$.\n2. The pairs are not named, and there are 4 equal pairs, so divide by $4!$: $\\frac{2520}{24} = 105$.\n3. Check another way. Player 1 picks a partner in 7 ways. The lowest-numbered player still unpaired picks from 5, the next from 3, the last from 1. That gives $7 \\times 5 \\times 3 \\times 1 = 105$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2 (mixed sizes).** Split 9 people into groups of 2, 2 and 5, with no names on the groups.\n\n1. Named count: $\\frac{9!}{2!\\,2!\\,5!} = \\frac{362\\,880}{480} = 756$.\n2. The **two** pairs are the same size, so swapping them gives the same split. Divide by $2!$ only, not $3!$: $\\frac{756}{2} = 378$.\n3. Check another way. Choose the group of five in ${}^9C_5 = 126$ ways, then pair the remaining 4 people in 3 ways: $126 \\times 3 = 378$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (to people).** Share 9 different toys among 3 children, 3 toys each.\n\n1. The children are the names. Child 1 gets ${}^9C_3 = 84$ choices, child 2 gets ${}^6C_3 = 20$, and child 3 gets the rest.\n2. $84 \\times 20 = 1680 = \\frac{9!}{3!\\,3!\\,3!}$. There is no division by $3!$, because Riya getting the red set is different from Kabir getting it.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (a tournament draw).** 16 football teams are split into 4 groups of 4 for the league stage.\n\n**(a) The groups are Group A, B, C and D.**\n\n1. Choose Group A's four, then Group B's from the 12 left, then Group C's from the 8 left. Group D is whoever remains. *Why this step:* the groups have names, so filling them one at a time is exactly the labelled count.\n2. Multiply, and the factorials cancel into the multinomial:",
    },
    {
      type: "math",
      latex:
        "{}^{16}C_4 \\cdot {}^{12}C_4 \\cdot {}^{8}C_4 \\cdot {}^{4}C_4 = 1820 \\times 495 \\times 70 \\times 1 = \\frac{16!}{(4!)^4} = 63\\,063\\,000",
    },
    {
      type: "text",
      content:
        "**(b) The organisers first make four unnamed pools, and the letters are drawn later.**\n\n3. Now a split is only 'which teams play together'. Each unnamed split can be given the letters A to D in $4!$ orders, and each order is a different answer to part (a). *Why this step:* this is the equal-size, no-names case, so divide by the number of ways the names could have been attached.",
    },
    {
      type: "math",
      latex: "\\frac{16!}{(4!)^4\\,4!} = \\frac{63\\,063\\,000}{24} = 2\\,627\\,625",
    },
    {
      type: "text",
      content:
        "4. Check the logic in reverse: $2\\,627\\,625 \\times 24 = 63\\,063\\,000$. Unnamed splits times ways to name them gives the named splits.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (JEE style: a condition on two people).** 10 players are split into two teams of 5 for a practice match, with no names on the teams. In how many ways can this be done if the two captains, Aarav and Bhavna, must be on **opposite** teams?\n\n1. Without the condition: $\\frac{10!}{5!\\,5!\\,2!} = \\frac{252}{2} = 126$. *Why divide by $2!$:* two equal teams with no names.\n2. A cleaner idea: Aarav's team **names** itself. Call it 'Aarav's team'. Once one team has a name, the other is 'the rest', so no division is needed any more.\n3. Aarav needs 4 teammates, and Bhavna is not allowed. Choose them from the other 8 players:",
    },
    { type: "math", latex: "{}^{8}C_4 = 70" },
    {
      type: "text",
      content:
        "4. Check by the complement. Aarav and Bhavna on the **same** team: choose their 3 teammates from 8, ${}^8C_3 = 56$. Then $126 - 56 = 70$. The two methods agree.\n\n**The exam habit:** when one special person is in the problem, let them label their own group. It turns an unlabelled count into a labelled one and removes the risk of dividing wrongly.",
    },
    {
      type: "text",
      content:
        "**Worked example 6 (answers left in factorials).** A pack of 52 cards is dealt. Exam questions often want the answer as a factorial expression, so the skill is choosing the right denominator.\n\n1. **Dealt equally among 4 players.** The players are names: $\\dfrac{52!}{(13!)^4}$.\n2. **Divided into 4 piles of 13.** Four equal piles with no names: $\\dfrac{52!}{(13!)^4\\,4!}$. *Why:* each split into piles can be handed to 4 players in $4!$ ways.\n3. **Divided into 4 sets: three of 17 cards and one of 1 card.** Only the three 17-sets can swap with each other, so divide by $3!$, not $4!$:",
    },
    { type: "math", latex: "\\frac{52!}{(17!)^3\\,1!\\,3!}" },
    {
      type: "quiz",
      id: "pc3-1-q6",
      variant: "practice",
      question: "10 players are split into two unnamed teams of 5. In how many ways can this be done if Aarav and Bhavna must be on the **same** team?",
      options: [
        { text: "56", correct: true, feedback: "Aarav's team names itself. Bhavna joins it, and 3 more come from the other 8: ${}^8C_3 = 56$. Check: $126 - 70 = 56$." },
        { text: "112", feedback: "That doubles the count as if the teams had names. Once Aarav's team is identified, there is nothing left to swap." },
        { text: "70", feedback: "${}^8C_4 = 70$ is the count for **opposite** teams, where Aarav picks 4 teammates without Bhavna." },
      ],
      hint: "Let Aarav's team be the named one. How many more players does it need once Bhavna is in?",
    },
    {
      type: "quiz",
      id: "pc3-1-q7",
      variant: "practice",
      question: "In how many ways can 52 cards be divided into 4 piles of 13, with nothing to tell the piles apart?",
      options: [
        { text: "$\\dfrac{52!}{(13!)^4\\,4!}$", correct: true, feedback: "Four equal piles with no names: divide the named count by $4!$." },
        { text: "$\\dfrac{52!}{(13!)^4}$", feedback: "That is the count for dealing to 4 players, who are names. Piles with no owners can be swapped." },
        { text: "$\\dfrac{52!}{13!\\,4!}$", feedback: "Every pile has its own $13!$ of internal orders to divide out, so the denominator needs $(13!)^4$." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-1-q1",
      variant: "concept",
      question: "In how many ways can 4 people be split into two pairs, with nothing to tell the pairs apart?",
      options: [
        { text: "3", correct: true, feedback: "Asha's partner decides everything: Ben, Chitra or Dev. $\\frac{4!}{2!\\,2!\\,2!} = 3$." },
        { text: "6", feedback: "That is the count for a Red team and a Green team. Without names, RRGG and GGRR are the same split, so divide by $2!$." },
        { text: "12", feedback: "$4 \\times 3$ picks the first pair in order. Each split is then counted 4 times: 2 orders inside the pair, times 2 choices of which pair is 'first'. $12 \\div 4 = 3$." },
      ],
      hint: "Ask who Asha's partner is.",
    },
    {
      type: "quiz",
      id: "pc3-1-q2",
      variant: "concept",
      question:
        "12 students are split into groups of 5, 4 and 3 that have no names. Why is there no division by $3!$?",
      options: [
        { text: "The groups have different sizes, so each one is already known by its size.", correct: true, feedback: "The 5-group can never be swapped with the 4-group. The answer stays $\\frac{12!}{5!\\,4!\\,3!} = 27\\,720$." },
        { text: "You do divide: the answer is $27\\,720 \\div 6 = 4620$.", feedback: "Dividing by $3!$ undoes a swap of names. Groups of different sizes cannot swap, so nothing was overcounted." },
        { text: "Because 12 is not divisible by 3.", feedback: "12 is divisible by 3, and divisibility has nothing to do with the rule anyway." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-1-q3",
      variant: "practice",
      question: "In how many ways can 10 people be split into groups of 3, 3 and 4, with no names on the groups?",
      options: [
        { text: "2100", correct: true, feedback: "$\\frac{10!}{3!\\,3!\\,4!} = 4200$, and only the two 3-groups can swap, so divide by $2!$: 2100." },
        { text: "4200", feedback: "That treats the two groups of 3 as if they had names." },
        { text: "700", feedback: "That divides by $3!$. The 4-group is a different size and cannot be swapped with the others." },
      ],
      hint: "Which groups could be swapped without changing the split?",
    },
    {
      type: "quiz",
      id: "pc3-1-q4",
      variant: "practice",
      question: "8 players are split into 4 doubles pairs, with no names on the pairs. How many ways?",
      options: [
        { text: "105", correct: true, feedback: "$\\frac{8!}{(2!)^4\\,4!} = 105$, or $7 \\times 5 \\times 3 \\times 1$." },
        { text: "2520", feedback: "That is the count for pairs sent to named courts 1 to 4. Divide by $4!$." },
        { text: "420", feedback: "That divides by 3! instead of 4!. There are four equal pairs." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-1-q5",
      variant: "practice",
      question: "9 different toys are shared among 3 children, 3 toys each. How many ways?",
      options: [
        { text: "1680", correct: true, feedback: "The children are the names: $\\frac{9!}{(3!)^3} = 84 \\times 20 \\times 1 = 1680$." },
        { text: "280", feedback: "That divides by $3!$, as if the children could be swapped. Riya and Kabir are different people." },
        { text: "84", feedback: "That is only the choice for the first child." },
      ],
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "stars-and-bars",
  title: "3.2 · Stars and Bars",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "You have 4 identical toffees and 3 children: Arjun, Bela and Chirag. Some children may get none. How many ways can the toffees be shared?\n\nThe toffees are identical, so the only thing that matters is **how many** each child gets. A distribution is a list like (2, 1, 1) or (0, 4, 0). Listing them all by hand is error-prone, so here is a trick that turns the question into something you already know how to count.",
    },
    {
      type: "text",
      content:
        "Line the toffees up as stars, and put in **two bars** to split the line into three parts: Arjun's part, then Bela's, then Chirag's.\n\n- $\\star\\star\\,|\\,\\star\\,|\\,\\star$ means (2, 1, 1)\n- $|\\,\\star\\star\\star\\star\\,|$ means (0, 4, 0)\n- $\\star\\,|\\,|\\,\\star\\star\\star$ means (1, 0, 3)\n\nEvery distribution gives exactly one row of 4 stars and 2 bars, and every such row gives exactly one distribution. So we only need to count the rows.",
    },
    {
      type: "text",
      content:
        "Start small, with 2 toffees and 3 children. The rows have 2 stars and 2 bars.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["*", "*", "|", "|"],
        groupBy: "identical",
        display: "stars-bars",
        caption:
          "24 orderings with the copies labelled, 6 words once the labels are erased. Switch to 'One per word': (2,0,0), (0,2,0), (0,0,2), (1,1,0), (1,0,1), (0,1,1). That is every way to share 2 toffees among 3 children.",
      },
    },
    {
      type: "text",
      content:
        "A row of stars and bars is a word with repeated letters, the thing you counted in 1.3. With 4 stars and 2 bars there are 6 symbols, so\n\n$\\displaystyle \\frac{6!}{4!\\,2!} = 15 = {}^6C_2$\n\nAnother way to see it: out of 6 positions, choose the 2 that hold bars. The stars fill the rest.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["*", "*", "*", "*", "|", "|"],
        groupBy: "identical",
        display: "stars-bars",
        maxShown: 720,
        caption:
          "The toffee problem: 720 labelled orderings ÷ (4! × 2!) = 15 distributions. Each word shows its per-child counts beside it. Tap a word to see the 48 labelled orderings that collapse into it, and switch to 'One per word' to check that no distribution appears twice.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Stars and bars",
      content:
        "The number of ways to put $n$ **identical** objects into $k$ **distinct** boxes, with empty boxes allowed, is\n\n$\\displaystyle {}^{n+k-1}C_{k-1} = \\frac{(n+k-1)!}{n!\\,(k-1)!}$\n\n$n$ stars and $k-1$ bars make $n+k-1$ symbols. Choose which $k-1$ of them are bars. You need $k-1$ bars because $k$ boxes need $k-1$ dividers between them.",
    },
    {
      type: "text",
      content:
        "**The same count as an equation.** A distribution of $n$ identical things to $k$ boxes is a list of whole numbers adding to $n$. So the number of **non-negative integer solutions** of\n\n$\\displaystyle x_1 + x_2 + \\cdots + x_k = n$\n\nis also ${}^{n+k-1}C_{k-1}$. For example, $x + y + z = 10$ with $x, y, z \\ge 0$ is 10 stars and 2 bars:",
    },
    { type: "math", latex: "{}^{12}C_2 = \\frac{12 \\times 11}{2} = 66" },
    {
      type: "text",
      content:
        "Check it by counting a different way. If $x = 0$, then $y + z = 10$ has 11 solutions ($y = 0$ to $10$). If $x = 1$ there are 10, and so on down to 1 when $x = 10$. That gives $11 + 10 + \\cdots + 1 = 66$. The two counts agree.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: it's just ${}^nC_k$",
      content:
        "For 4 toffees and 3 children, ${}^4C_3 = 4$ is far too small. The list (2, 1, 1), (1, 2, 1), (1, 1, 2), (4, 0, 0), (0, 4, 0), ... already has more than 4 entries. ${}^nC_k$ chooses $k$ **different** things from $n$ with no repeats. Here a child can receive several toffees, and the toffees are all the same. The count you want arranges $n$ stars and $k-1$ bars: ${}^{n+k-1}C_{k-1}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1: choosing with repeats.** An ice-cream shop has 5 flavours. You order a cup of 3 scoops. Repeats are allowed and the order in the cup does not matter. How many different cups?\n\n1. What is identical and what is distinct? The 3 scoops are the stars, and the 5 flavours are the boxes.\n2. A cup is a record of how many scoops of each flavour, so it is a solution of $f_1 + \\cdots + f_5 = 3$.\n3. That gives ${}^{3+5-1}C_{5-1} = {}^7C_4 = 35$.\n\nThis is the standard way to count **selections with repetition**. Choosing $r$ things from $n$ types, with repeats allowed, gives ${}^{n+r-1}C_r$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2: terms of an expansion.** How many different terms are in $(a + b + c)^5$ once like terms are collected?\n\n1. Every term looks like $a^p b^q c^s$ with $p + q + s = 5$ and $p, q, s \\ge 0$.\n2. So count the non-negative solutions: ${}^{5+3-1}C_{3-1} = {}^7C_2 = 21$.\n3. Check with two letters: $(a+b)^5$ has ${}^6C_1 = 6$ terms, $a^5, a^4b, \\ldots, b^5$. That matches.",
    },
    {
      type: "table",
      headers: ["Question", "Stars $n$", "Boxes $k$", "Count"],
      rows: [
        ["4 toffees, 3 children", "4", "3", "${}^6C_2 = 15$"],
        ["$x + y + z = 10$, $x,y,z \\ge 0$", "10", "3", "${}^{12}C_2 = 66$"],
        ["3 scoops, 5 flavours", "3", "5", "${}^7C_4 = 35$"],
        ["Terms of $(a+b+c)^5$", "5", "3", "${}^7C_2 = 21$"],
        ["10 identical balls, 4 boxes", "10", "4", "${}^{13}C_3 = 286$"],
      ],
    },
    {
      type: "text",
      content:
        "**Three more worked examples, from routine to exam style.** Each one starts by naming the stars and the boxes. That single step is where most mistakes happen, so do it out loud.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (routine).** 12 identical mangoes are shared among 4 children, and a child may get none. How many ways?\n\n1. Stars: the 12 mangoes. Boxes: the 4 children. *Why:* the mangoes are identical, so a sharing is just the list of how many each child gets.\n2. 4 boxes need $4 - 1 = 3$ bars, so there are $12 + 3 = 15$ symbols in a row.\n3. Choose which 3 of the 15 places hold bars:",
    },
    { type: "math", latex: "{}^{15}C_3 = \\frac{15 \\times 14 \\times 13}{3 \\times 2 \\times 1} = 455" },
    {
      type: "text",
      content:
        "**Worked example 4 (application: a handful of coins).** A shopkeeper's drawer has plenty of ₹1, ₹2, ₹5 and ₹10 coins. You take out 5 coins. How many different handfuls are possible (only how many of each kind matters)?\n\n1. Stars: the 5 coins you take. Boxes: the 4 denominations. *Why this way round:* a handful is fixed by 'how many ₹1, how many ₹2, …', a list of 4 numbers adding to 5. Coins of the same value are identical.\n2. So count $c_1 + c_2 + c_5 + c_{10} = 5$ with every $c \\ge 0$: 5 stars, 3 bars.",
    },
    { type: "math", latex: "{}^{5+4-1}C_{4-1} = {}^{8}C_3 = 56" },
    {
      type: "text",
      content:
        "3. Sanity check on a tiny case: 1 coin from 4 kinds should give 4 handfuls, and ${}^{4}C_3 = 4$. Good.\n\nThe classic slip is ${}^5C_4$ or ${}^4C_5$, which treat the question as choosing different objects with no repeats. Here the same kind of coin can be taken many times.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (JEE style: digits in order).** How many 4-digit numbers have digits that never decrease from left to right, like 1129 or 3333?\n\n1. **Spot the hidden selection.** Once you know *which* digits are used, and how many times each, there is exactly one way to write them in non-decreasing order. So a number is the same thing as a **multiset** of 4 digits. *Why this matters:* order has been taken out of the problem, which is what stars and bars needs.\n2. **Which digits are allowed?** A 0 would have to come first, since it is the smallest digit, and a 4-digit number can't start with 0. So the digits come from 1 to 9.\n3. **Count.** Choose 4 digits from 9 kinds with repeats allowed. That is 4 stars in 9 boxes, so 8 bars:",
    },
    { type: "math", latex: "{}^{4+9-1}C_{4} = {}^{12}C_4 = 495" },
    {
      type: "text",
      content:
        "4. Watch the trap in step 2. Allowing 0 would give ${}^{13}C_4 = 715$, and every extra case starts with 0. The same method gives ${}^{11}C_3 = 165$ three-digit numbers with non-decreasing digits.",
    },
    {
      type: "quiz",
      id: "pc3-2-q6",
      variant: "practice",
      question: "From plenty of ₹1, ₹2, ₹5 and ₹10 coins, how many different handfuls of 5 coins can be taken, if only how many of each kind matters?",
      options: [
        { text: "56", correct: true, feedback: "5 coins are stars in 4 denomination boxes: ${}^{8}C_3 = 56$." },
        { text: "$4^5 = 1024$", feedback: "That treats the 5 coins as different, as if 'first coin ₹1, second ₹2' differed from the reverse. A handful has no order." },
        { text: "${}^{8}C_4 = 70$", feedback: "8 symbols is right, but 4 boxes need only 3 bars, so choose 3 places, not 4." },
      ],
      hint: "Stars are the coins, boxes are the denominations.",
    },
    {
      type: "quiz",
      id: "pc3-2-q7",
      variant: "practice",
      question: "How many 3-digit numbers have digits that never decrease from left to right (like 112, 459 or 777)?",
      options: [
        { text: "165", correct: true, feedback: "Such a number is a multiset of 3 digits from 1 to 9: ${}^{3+9-1}C_3 = {}^{11}C_3 = 165$." },
        { text: "84", feedback: "${}^9C_3$ forbids repeated digits, so it misses numbers like 112 and 777." },
        { text: "220", feedback: "${}^{12}C_3$ lets 0 in as a digit. A non-decreasing number containing 0 would have to start with 0." },
      ],
      hint: "Once you know which digits are used, how many ways are there to write them in non-decreasing order?",
    },
    {
      type: "quiz",
      id: "pc3-2-q1",
      variant: "concept",
      question: "5 identical chocolates are shared among 3 children, and some may get none. How many ways?",
      options: [
        { text: "${}^7C_2 = 21$", correct: true, feedback: "5 stars and 2 bars make 7 symbols. Choose where the 2 bars go." },
        { text: "${}^5C_3 = 10$", feedback: "That chooses 3 different chocolates. Here the chocolates are identical and one child can get several." },
        { text: "$3^5 = 243$", feedback: "$3^5$ lets each chocolate choose a child, which treats chocolate 1 going to Arjun as different from chocolate 2 going to Arjun. With identical chocolates only the counts matter." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-2-q2",
      variant: "practice",
      question: "With 3 children in order, which distribution does the word $\\star\\,|\\,|\\,\\star\\star\\star$ stand for?",
      options: [
        { text: "(1, 0, 3)", correct: true, feedback: "One star before the first bar, none between the bars, and three after the second bar." },
        { text: "(1, 3)", feedback: "Two bars make three boxes. The empty middle box still counts." },
        { text: "(1, 2, 3)", feedback: "Count the stars: there are only 4, and none of them sit between the two bars." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-2-q3",
      variant: "practice",
      question: "How many non-negative integer solutions does $a + b + c + d = 6$ have?",
      options: [
        { text: "84", correct: true, feedback: "6 stars and 3 bars: ${}^9C_3 = 84$." },
        { text: "126", feedback: "${}^9C_4$ puts 4 bars in. Four variables need only 3 dividers." },
        { text: "15", feedback: "${}^6C_4$ chooses variables. It does not share out 6 units among them." },
      ],
      hint: "How many bars do four boxes need?",
    },
    {
      type: "quiz",
      id: "pc3-2-q4",
      variant: "practice",
      question: "How many different terms are in $(x + y + z)^8$ after collecting like terms?",
      options: [
        { text: "45", correct: true, feedback: "The exponents solve $p + q + s = 8$: ${}^{10}C_2 = 45$." },
        { text: "9", feedback: "That is the count for two letters, $(x+y)^8$." },
        { text: "$3^8 = 6561$", feedback: "That counts the choices before like terms are collected. Many of them give the same term." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-2-q5",
      variant: "concept",
      question: "Why does stars and bars use $k - 1$ bars for $k$ boxes, not $k$?",
      options: [
        { text: "The bars are dividers, and $k$ parts need only $k - 1$ cuts between them.", correct: true, feedback: "Three children need two dividers: before the first bar is child 1, between the bars is child 2, after the second is child 3." },
        { text: "One box is always empty, so it needs no bar.", feedback: "No box is forced to be empty. The first and last boxes are simply the ends of the row." },
        { text: "It is a correction for double counting.", feedback: "Nothing is double counted. Each word matches exactly one distribution." },
      ],
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "bounds-on-variables",
  title: "3.3 · Lower and Upper Bounds",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "Real sharing problems come with rules: *every* child gets at least one toffee, Arjun gets at least two, nobody gets more than three. Stars and bars counts only the plain case with no rules. This lesson shows how to turn a problem with rules into a plain one, using two moves. **Hand things out first** handles a lower bound. **Subtract the rule-breakers** handles an upper bound.",
    },
    {
      type: "text",
      content:
        "**Move 1: at least one each.** Share 10 identical toffees among 3 children so that nobody is left out. First give each child one toffee. That leaves 7 toffees with no rules on them:\n\n$\\displaystyle x + y + z = 10,\\; x, y, z \\ge 1 \\quad\\longleftrightarrow\\quad x' + y' + z' = 7,\\; x', y', z' \\ge 0$\n\nwhere $x' = x - 1$ and so on. Stars and bars on the right: ${}^{9}C_{2} = 36$.",
    },
    {
      type: "text",
      content:
        "See it on a small case first. Here are all the ways to share 5 toffees among 3 children, as rows of 5 stars and 2 bars. Hunt for the rows where every child gets at least one.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-arrangement-lister",
        items: ["*", "*", "*", "*", "*", "|", "|"],
        groupBy: "identical",
        display: "stars-bars",
        maxShown: 720,
        caption:
          "21 ways to share 5 toffees among 3. Find the 6 with no zero: they are exactly the words with no bar at an end and no two bars together, ${}^4C_2 = 6$.",
      },
    },
    {
      type: "text",
      content:
        "**The same count from the gaps.** Put the 10 stars in a row. There are 9 gaps *between* them. A bar placed in a gap splits the row, and if each gap gets at most one bar, no part can be empty. So choose 2 of the 9 inner gaps: ${}^9C_2 = 36$. The two counts agree.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Positive solutions",
      content:
        "The number of solutions of $x_1 + \\cdots + x_k = n$ with every $x_i \\ge 1$ (every box non-empty) is\n\n$\\displaystyle {}^{n-1}C_{k-1}$\n\nIt is stars and bars on $n - k$ stars: ${}^{(n-k)+k-1}C_{k-1} = {}^{n-1}C_{k-1}$.",
    },
    {
      type: "text",
      content:
        "**Any lower bound works the same way.** For $x + y + z = 10$ with $x \\ge 2$ and $y, z \\ge 0$, give $x$ its 2 first. Put $x' = x - 2 \\ge 0$, so $x' + y + z = 8$ and the count is ${}^{10}C_2 = 45$. Each lower bound is paid out before the sharing starts, and the total drops by that amount.",
    },
    {
      type: "text",
      content:
        "**Worked example (routine): Diwali laddoos.** 15 identical laddoos are shared among 4 cousins so that each cousin gets **at least 2**. How many ways?\n\n1. Write it as an equation: $a + b + c + d = 15$ with every variable $\\ge 2$.\n2. Pay out the minimum first: hand each cousin 2 laddoos. That uses $4 \\times 2 = 8$, leaving 7. *Why this step:* after the payout nobody has a rule any more, so plain stars and bars applies.\n3. Now $a' + b' + c' + d' = 7$ with all values $\\ge 0$, where $a' = a - 2$ and so on. That is 7 stars and 3 bars:",
    },
    { type: "math", latex: "{}^{7+3}C_3 = {}^{10}C_3 = 120" },
    {
      type: "text",
      content:
        "4. Common slip: paying out only 2 in total instead of 2 **each** gives ${}^{16}C_3 = 560$, which is far too many.",
    },
    {
      type: "text",
      content:
        "**Move 2: an upper bound.** Count $x + y + z = 10$ with all values $\\ge 0$ and $x \\le 3$. An upper bound can't be paid out first. Instead, count the solutions that **break** the rule and subtract them:\n\n- With no rules there are ${}^{12}C_2 = 66$ solutions.\n- The rule-breakers have $x \\ge 4$. That is a lower bound, so use Move 1: $x' = x - 4$ gives $x' + y + z = 6$, with ${}^{8}C_2 = 28$ solutions.\n- So the answer is $66 - 28 = 38$.",
    },
    {
      type: "text",
      content:
        "Check directly. $x = 0, 1, 2, 3$ leave $y + z = 10, 9, 8, 7$, which have $11 + 10 + 9 + 8 = 38$ solutions. The two counts agree.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Off by one at the boundary",
      content:
        "\"$x \\le 3$\" is broken by $x \\ge 4$, **not** $x \\ge 3$. Subtracting the $x \\ge 3$ cases also throws away the allowed value $x = 3$. Write the broken rule down in words before you substitute.",
    },
    {
      type: "text",
      content:
        "**Dice sums are bounded equations.** In how many ways can three dice, red, blue and green, show a total of 10?\n\n1. Write it as an equation: $a + b + c = 10$ with $1 \\le a, b, c \\le 6$.\n2. Pay out the lower bounds. Put $a' = a - 1$ and so on. Then $a' + b' + c' = 7$ with $0 \\le a', b', c' \\le 5$.\n3. Ignore the upper bounds for now: ${}^{9}C_2 = 36$.\n4. Subtract the solutions with $a' \\ge 6$. Put $a'' = a' - 6$, so $a'' + b' + c' = 1$, which has ${}^3C_2 = 3$ solutions. The same happens for $b'$ and $c'$, so subtract $3 \\times 3 = 9$.\n5. Can two values both be $\\ge 6$? That needs a total of at least 12, which is more than 7. So nothing was subtracted twice.\n6. Answer: $36 - 9 = 27$.",
    },
    {
      type: "table",
      headers: ["Constraint", "What to do", "Example ($x+y+z=10$)"],
      rows: [
        ["$x \\ge 0$ for all", "Plain stars and bars", "${}^{12}C_2 = 66$"],
        ["$x \\ge 1$ for all", "Give one each first, or choose inner gaps", "${}^{9}C_2 = 36$"],
        ["$x \\ge 2$ only", "Give $x$ two first", "${}^{10}C_2 = 45$"],
        ["$x \\le 3$", "All minus ($x \\ge 4$)", "$66 - 28 = 38$"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example: a mixed set of rules.** Solve $x + y + z = 12$ with $x \\ge 3$, $y \\ge 2$, $z \\ge 0$ and $z \\le 4$.\n\n1. Pay out the lower bounds: $x' = x - 3$, $y' = y - 2$, so $x' + y' + z = 7$ with all values $\\ge 0$ and $z \\le 4$.\n2. Ignoring the upper bound: ${}^9C_2 = 36$.\n3. Rule-breakers have $z \\ge 5$. Put $z' = z - 5$, so $x' + y' + z' = 2$, with ${}^4C_2 = 6$ solutions.\n4. Answer: $36 - 6 = 30$.\n5. Check: $z = 0, 1, 2, 3, 4$ leave $x' + y' = 7, 6, 5, 4, 3$, with $8 + 7 + 6 + 5 + 4 = 30$ solutions.",
    },
    {
      type: "text",
      content:
        "**Worked example (application): setting a question paper.** A teacher sets 10 questions across 3 sections, A, B and C. Each section must have at least 2 questions and at most 5. How many ways can she choose the section sizes?\n\n1. Equation: $a + b + c = 10$ with $2 \\le a, b, c \\le 5$.\n2. Pay out the lower bounds: $a' = a - 2$ and so on. Now $a' + b' + c' = 4$ with $0 \\le a', b', c' \\le 3$. *Why first:* lower bounds are easy to remove, and they also shrink the numbers for the next step.\n3. Ignore the upper bounds: ${}^{6}C_2 = 15$.\n4. Rule-breakers have some value $\\ge 4$. If $a' \\ge 4$, put $a'' = a' - 4$, so $a'' + b' + c' = 0$, which has just 1 solution. The same for $b'$ and $c'$: subtract 3.\n5. Overlap check: two values $\\ge 4$ would need a total of at least 8, and the total is only 4. Nothing to add back.",
    },
    { type: "math", latex: "15 - 3 = 12" },
    {
      type: "text",
      content:
        "6. Check by listing the size patterns. $(5,3,2)$ in any order gives $3! = 6$. $(4,4,2)$ gives 3. $(4,3,3)$ gives 3. Total $6 + 3 + 3 = 12$.",
    },
    {
      type: "callout",
      variant: "info",
      title: "More than one upper bound",
      content:
        "When two rule-breaks can happen together, subtracting each one removes the overlap twice, so you add the overlap back once. That is inclusion–exclusion, and 3.4 builds it properly. In many exam questions, like the dice sum above, the totals are small enough that two breaks cannot happen together. Always check that. The next example is one where they can.",
    },
    {
      type: "text",
      content:
        "**Worked example: an overlap you must add back.** Solve $x + y + z + w = 8$ with $0 \\le x, y, z, w \\le 3$.\n\n1. Ignoring the upper bounds: 8 stars and 3 bars, ${}^{11}C_3 = 165$.\n2. One variable breaks its rule, say $x \\ge 4$. Put $x' = x - 4$, so $x' + y + z + w = 4$, with ${}^7C_3 = 35$ solutions. Any of the 4 variables could be the one, so subtract $4 \\times 35 = 140$.\n3. Can two variables break together? $x \\ge 4$ and $y \\ge 4$ uses up all 8, leaving $x' + y' + z + w = 0$, which has exactly 1 solution. There are ${}^4C_2 = 6$ such pairs, and each of these solutions was subtracted **twice** in step 2. Add them back: $+6$.\n4. Three variables $\\ge 4$ would need a total of at least 12, so nothing more.\n5. Answer: $165 - 140 + 6 = 31$.\n\nForgetting step 3 gives $25$, which is wrong. For example, $(4, 4, 0, 0)$ was removed once as '$x$ too big' and again as '$y$ too big'.",
    },
    {
      type: "text",
      content:
        "**Worked example: an inequality instead of an equation.** How many solutions does $x + y + z \\le 10$ have with $x, y, z \\ge 0$?\n\n1. The total is not fixed, but the amount left over is. Call the unused amount $w = 10 - (x + y + z)$, a **slack variable**. Then $w \\ge 0$ and\n\n$\\displaystyle x + y + z + w = 10$\n\n2. Each solution of the inequality matches exactly one solution of this equation, and back again.\n3. Stars and bars with 4 boxes: ${}^{13}C_3 = 286$.\n4. Check another way: add up the equation counts for totals $0, 1, \\ldots, 10$: ${}^2C_2 + {}^3C_2 + \\cdots + {}^{12}C_2 = 1 + 3 + 6 + \\cdots + 66 = 286$.\n\nFor a strict inequality such as $x + y + z < 10$, first rewrite it as $x + y + z \\le 9$.",
    },
    {
      type: "text",
      content:
        "**Worked example (JEE style): negative lower bounds and odd numbers.** Two classic exam twists use the same substitution idea.\n\n**(a)** How many integer solutions does $x + y + z = 0$ have with $x, y, z \\ge -5$?\n\n1. Negative values break stars and bars, because you can't hand out a negative number of stars. So shift each variable **up** to start at 0: $x' = x + 5$, and the same for $y$ and $z$. *Why +5:* the smallest allowed value, $-5$, must become 0.\n2. The total rises by $3 \\times 5 = 15$, so $x' + y' + z' = 15$ with all values $\\ge 0$.",
    },
    { type: "math", latex: "{}^{15+2}C_2 = {}^{17}C_2 = 136" },
    {
      type: "text",
      content:
        "**(b)** How many solutions does $x + y + z = 15$ have in **positive odd** integers?\n\n3. Every positive odd number is $2a + 1$ with $a \\ge 0$. Put $x = 2a + 1$, $y = 2b + 1$, $z = 2c + 1$. *Why this form:* it turns 'odd' into an ordinary non-negative variable.\n4. Then $2(a + b + c) + 3 = 15$, so $a + b + c = 6$:",
    },
    { type: "math", latex: "{}^{6+2}C_2 = {}^{8}C_2 = 28" },
    {
      type: "text",
      content:
        "5. Parity check before you start: three odd numbers add to an odd number, and 15 is odd, so solutions exist. For $x + y + z = 14$ the answer would be 0, and the substitution shows it too, because $a + b + c = 5.5$ has no whole-number solutions.",
    },
    {
      type: "callout",
      variant: "info",
      title: "JEE extension (optional): the coefficient method",
      content:
        "A bounded equation can also be read as a coefficient. For $0 \\le x, y, z, w \\le 3$, each variable contributes a factor $(1 + t + t^2 + t^3)$, and the number of solutions of $x + y + z + w = 8$ is the coefficient of $t^8$ in\n\n$\\displaystyle (1 + t + t^2 + t^3)^4 = \\left(\\frac{1 - t^4}{1 - t}\\right)^4$\n\nExpanding the top with the binomial theorem and the bottom as ${}^{n+3}C_3\\,t^n$ gives $165 - 4\\cdot 35 + 6\\cdot 1 = 31$, exactly the inclusion–exclusion sum above. Chapter 4 builds the binomial theorem used on the top, and lesson 5.5 previews the series for negative powers such as $(1 - t)^{-4}$.",
    },
    {
      type: "quiz",
      id: "pc3-3-q1",
      variant: "practice",
      question: "How many solutions does $a + b + c + d = 10$ have in **positive** integers?",
      options: [
        { text: "84", correct: true, feedback: "${}^{10-1}C_{4-1} = {}^9C_3 = 84$. Choose 3 of the 9 inner gaps." },
        { text: "286", feedback: "${}^{13}C_3$ is the count when zeros are allowed." },
        { text: "210", feedback: "${}^{10}C_4$ uses the wrong numbers. Positive solutions are ${}^{n-1}C_{k-1}$." },
      ],
      hint: "Give each variable 1 first, then share what is left.",
    },
    {
      type: "quiz",
      id: "pc3-3-q2",
      variant: "concept",
      question: "Why does choosing 2 of the 9 **inner** gaps between 10 stars give only positive solutions?",
      options: [
        { text: "Each part then has at least one star, because two bars can never be next to each other or at an end.", correct: true, feedback: "An empty part would need two bars side by side or a bar at an end. Using inner gaps, at most one per gap, rules out both." },
        { text: "Because there are fewer gaps than stars.", feedback: "Fewer choices is a result, not the reason. The reason is what the gaps rule out." },
        { text: "It doesn't. Some parts can still be empty.", feedback: "Try to make one empty: you would need two bars in the same gap, or a bar at an end." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-3-q3",
      variant: "practice",
      question: "Count the solutions of $x + y + z = 12$ with $x \\ge 3$, $y \\ge 2$ and $z \\ge 0$.",
      options: [
        { text: "36", correct: true, feedback: "Pay out 3 and 2 first, which leaves $x' + y' + z = 7$: ${}^9C_2 = 36$." },
        { text: "91", feedback: "${}^{14}C_2$ ignores the lower bounds." },
        { text: "15", feedback: "${}^6C_2$ takes too much off. Only $3 + 2 = 5$ is paid out, so 7 are left, not 4." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-3-q4",
      variant: "concept",
      question: "Count $x + y + z = 8$ with all values $\\ge 0$ and $x \\le 2$. Which set do you subtract from ${}^{10}C_2 = 45$?",
      options: [
        { text: "Solutions with $x \\ge 3$, giving $45 - {}^7C_2 = 24$.", correct: true, feedback: "The rule-breakers are $x \\ge 3$. Check: $x = 0, 1, 2$ give $9 + 8 + 7 = 24$." },
        { text: "Solutions with $x \\ge 2$, giving $45 - {}^8C_2 = 17$.", feedback: "That also throws away $x = 2$, which is allowed." },
        { text: "Solutions with $x = 3$ only, giving $45 - 6 = 39$.", feedback: "Values like $x = 5$ also break the rule and must go too." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-3-q5",
      variant: "practice",
      question: "Using a bounded equation, in how many ways can two dice (red and blue) show a total of 8?",
      options: [
        { text: "5", correct: true, feedback: "$a' + b' = 6$ with $0 \\le a', b' \\le 5$: $7 - 2 = 5$. They are (2,6), (3,5), (4,4), (5,3), (6,2)." },
        { text: "7", feedback: "That leaves in (0, 6) and (6, 0) after the shift, which would be a face showing 7." },
        { text: "6", feedback: "Two solutions break the upper bound, one for each die." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-3-q6",
      variant: "practice",
      question: "How many solutions does $x + y + z \\le 6$ have in non-negative integers?",
      options: [
        { text: "84", correct: true, feedback: "Add a slack $w \\ge 0$: $x + y + z + w = 6$, so ${}^9C_3 = 84$." },
        { text: "28", feedback: "${}^8C_2$ counts only $x + y + z = 6$ exactly. Totals below 6 are allowed too." },
        { text: "36", feedback: "${}^9C_2$ has the right 9 symbols but makes only 2 of them bars. With the slack there are 4 boxes, so 3 bars." },
      ],
      hint: "Let $w$ be the amount left unused.",
    },
    {
      type: "quiz",
      id: "pc3-3-q7",
      variant: "concept",
      question:
        "For $x + y + z = 10$ with $0 \\le x, y, z \\le 5$, a student computes $66 - 3 \\cdot {}^6C_2 = 21$ and adds nothing back. Is that right?",
      options: [
        { text: "Yes. Two variables $\\ge 6$ would need a total of at least 12, so there is no overlap to add back.", correct: true, feedback: "Always check the overlap. Here it is empty, so $66 - 45 = 21$ stands." },
        { text: "No. The overlaps must always be added back, so the answer is more than 21.", feedback: "You add back only what was subtracted twice. No solution has two values $\\ge 6$ when the total is 10." },
        { text: "No. The answer should be $66 - {}^6C_2 = 51$.", feedback: "Any of the three variables can break the rule, so there are three sets to subtract." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-3-q8",
      variant: "practice",
      question: "How many integer solutions does $x + y + z = 0$ have with $x, y, z \\ge -3$?",
      options: [
        { text: "55", correct: true, feedback: "Shift up by 3 each: $x' + y' + z' = 9$ with all values $\\ge 0$, so ${}^{11}C_2 = 55$." },
        { text: "1", feedback: "Only $(0,0,0)$ if everything had to be $\\ge 0$. Negative values like $(-3, 1, 2)$ are allowed here." },
        { text: "28", feedback: "${}^8C_2$ shifts the total by only 6. Each of the three variables moves up by 3, so the total rises by 9." },
      ],
      hint: "Make the smallest allowed value, $-3$, become 0.",
    },
    {
      type: "quiz",
      id: "pc3-3-q9",
      variant: "practice",
      question: "How many solutions does $x + y + z = 15$ have in positive **odd** integers?",
      options: [
        { text: "28", correct: true, feedback: "Write $x = 2a+1$ and so on. Then $a + b + c = 6$, so ${}^8C_2 = 28$." },
        { text: "91", feedback: "${}^{14}C_2$ counts all positive solutions, odd or even." },
        { text: "36", feedback: "${}^9C_2$ solves $a + b + c = 7$. Subtracting the three 1's from 15 leaves 12, and halving gives 6, not 7." },
      ],
      hint: "Every positive odd number is $2a + 1$ with $a \\ge 0$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "distinct-into-distinct",
  title: "3.4 · Distinct Objects into Distinct Boxes",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "Now make the objects different. You have 5 different letters and 3 postboxes. How many ways can they be posted?\n\nDon't think about the boxes. Think about the letters. Each letter makes one decision, which box to go in, and it has 3 choices whatever the other letters did. Five independent decisions, each with 3 choices, gives",
    },
    { type: "math", latex: "3 \\times 3 \\times 3 \\times 3 \\times 3 = 3^5 = 243" },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "product",
        stages: [
          { label: "Letter 1", options: ["P", "Q", "R"] },
          { label: "Letter 2", options: ["P", "Q", "R"] },
          { label: "Letter 3", options: ["P", "Q", "R"] },
        ],
        highlightPath: ["P", "P", "R"],
        caption:
          "Three letters, postboxes P, Q and R. Each stage is one letter choosing its box, so the tree has 3 × 3 × 3 = 27 leaves. The highlighted path puts letters 1 and 2 in P and letter 3 in R, which leaves Q empty.",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Distinct objects into distinct boxes",
      content:
        "$n$ different objects can go into $k$ different boxes, with no limit on how many per box and empty boxes allowed, in\n\n$\\displaystyle k^n$\n\nways. The **objects** make the choices, so the number of boxes goes in the base and the number of objects goes in the exponent.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Is it $3^5$ or $5^3$?",
      content:
        "Ask which things are choosing. Each letter picks a box, so it is $(\\text{boxes})^{\\text{letters}} = 3^5$. The answer $5^3$ would be each box picking one letter, but a box can hold several letters or none. That is the same trap as $n^r$ against $r^n$ in 1.2.",
    },
    {
      type: "text",
      content:
        "**Worked example (routine): rings on fingers.** In how many ways can 5 different rings be worn on the 4 fingers of one hand (not the thumb), if only which finger each ring is on matters?\n\n1. Who is choosing? Each **ring** picks a finger. A finger can take several rings or none, so fingers can't be the ones choosing. *Why ask this first:* it decides which number goes in the base.\n2. Each of 5 rings has 4 choices, independently:",
    },
    { type: "math", latex: "4 \\times 4 \\times 4 \\times 4 \\times 4 = 4^5 = 1024" },
    {
      type: "text",
      content:
        "3. The same count in the language of functions, which JEE uses a lot: a **function** from a 5-element set to a 4-element set sends each input to one output, so there are $4^5$ functions. Rings are the inputs and fingers are the outputs.",
    },
    {
      type: "text",
      content:
        "**Now require every box to be used.** How many ways can $n$ different letters go into 3 postboxes so that **no box is empty**? (These are called *onto* distributions.) Counting them directly is messy. Counting the bad ones is easier: take all $3^n$ and subtract the ones where some box is empty.\n\nLet $E_P$ be the distributions where P is empty, and $E_Q$, $E_R$ the same for Q and R.",
    },
    {
      type: "table",
      headers: ["Event", "Letters may use", "Count", "How many such events"],
      rows: [
        ["One named box empty, e.g. $E_P$", "Q, R", "$2^n$", "3"],
        ["Two named boxes empty, e.g. $E_P \\cap E_Q$", "R only", "$1^n = 1$", "3"],
        ["All three empty", "nothing", "0", "1"],
      ],
    },
    {
      type: "text",
      content:
        "Subtracting $3 \\times 2^n$ goes too far. Take a distribution with every letter in R. It lies in $E_P$ **and** in $E_Q$, so it was subtracted twice, but it should only go once. Each of the 3 \"everything in one box\" distributions needs to be added back once:",
    },
    {
      type: "math",
      latex:
        "\\#\\text{onto} = 3^n - 3\\cdot 2^n + 3\\cdot 1^n",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Inclusion–exclusion (three sets)",
      content:
        "$\\displaystyle |A \\cup B \\cup C| = |A| + |B| + |C| - |A\\cap B| - |A\\cap C| - |B\\cap C| + |A\\cap B\\cap C|$\n\nAdd the singles, subtract the pairs, add the triple. Each distribution in the union ends up counted exactly once.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Onto distributions into $k$ boxes",
      content:
        "The same pattern works for any number of boxes. Choose $j$ boxes to force empty (${}^kC_j$ ways), let the $n$ objects use the other $k - j$ boxes freely ($(k-j)^n$ ways), and alternate the signs. The number of ways to put $n$ different objects into $k$ different boxes with **no box empty** is\n\n$\\displaystyle \\sum_{j=0}^{k} (-1)^j\\,{}^kC_j\\,(k-j)^n = k^n - {}^kC_1(k-1)^n + {}^kC_2(k-2)^n - \\cdots$\n\nFor $k = 3$ this is $3^n - 3\\cdot 2^n + 3\\cdot 1^n - 0$, the formula above. For 5 objects into 4 boxes: $1024 - 4\\cdot 243 + 6\\cdot 32 - 4\\cdot 1 + 0 = 240$.",
    },
    {
      type: "text",
      content:
        "**Check small cases.**\n\n- $n = 3$: $27 - 24 + 3 = 6$. That is right, because 3 letters into 3 boxes with none empty means one letter per box, and there are $3! = 6$ ways.\n- $n = 2$: $9 - 12 + 3 = 0$. That is right too, because 2 letters cannot fill 3 boxes.\n- $n = 4$: $81 - 48 + 3 = 36$.\n- $n = 5$: $243 - 96 + 3 = 150$.",
    },
    {
      type: "text",
      content:
        "**Worked example: check 150 using groups from 3.1.** Five students go into three named rooms, with no room empty. The room sizes must be $3,1,1$ or $2,2,1$.\n\n1. Sizes $(3,1,1)$: choose which room gets 3 people (3 ways), then $\\frac{5!}{3!\\,1!\\,1!} = 20$. That gives 60.\n2. Sizes $(2,2,1)$: choose which room gets 1 person (3 ways), then $\\frac{5!}{2!\\,2!\\,1!} = 30$. That gives 90.\n3. Total: $60 + 90 = 150$. This matches $3^5 - 3\\cdot 2^5 + 3$.",
    },
    {
      type: "text",
      content:
        "**Worked example (application): tasks to teams.** A start-up has 6 different tasks for a sprint and 3 teams: design, backend and testing. Every team must get at least one task. How many ways can the tasks be assigned?\n\n1. Model: different objects (tasks) into different boxes (named teams), no box empty. That is an onto count with $n = 6$, $k = 3$.\n2. All assignments: $3^6 = 729$. *Why start here:* it's easy to count everything, then remove the bad cases.\n3. Subtract the ones that leave a named team idle: $3 \\times 2^6 = 192$.\n4. Add back the 3 'all six tasks to one team' cases, which were subtracted twice:",
    },
    { type: "math", latex: "3^6 - 3\\cdot 2^6 + 3\\cdot 1^6 = 729 - 192 + 3 = 540" },
    {
      type: "text",
      content:
        "5. Check by team sizes, using 3.1. Sizes $(4,1,1)$: pick the busy team (3 ways) times $\\frac{6!}{4!\\,1!\\,1!} = 30$, giving 90. Sizes $(3,2,1)$: $3! = 6$ ways to match sizes to teams times $\\frac{6!}{3!\\,2!\\,1!} = 60$, giving 360. Sizes $(2,2,2)$: $\\frac{6!}{2!\\,2!\\,2!} = 90$. Total $90 + 360 + 90 = 540$.",
    },
    {
      type: "text",
      content:
        "**Worked example (JEE style): onto functions.** Let $A = \\{1, 2, 3, 4, 5, 6\\}$ and $B = \\{a, b, c, d\\}$. How many functions from $A$ onto $B$ are there? (Onto means every element of $B$ is hit at least once.)\n\n1. Translate: the 6 inputs are different objects, the 4 outputs are different boxes, and 'onto' means no box is empty.\n2. Use the $k$-box formula with $k = 4$. Choose $j$ outputs to miss (${}^4C_j$ ways), send all inputs to the other $4 - j$, and alternate the signs. *Why alternate:* each correction over-corrects the next layer of overlaps.",
    },
    {
      type: "math",
      latex:
        "4^6 - {}^4C_1\\,3^6 + {}^4C_2\\,2^6 - {}^4C_3\\,1^6 = 4096 - 2916 + 384 - 4 = 1560",
    },
    {
      type: "text",
      content:
        "3. Check by sizes: 6 inputs onto 4 outputs means sizes $(3,1,1,1)$ or $(2,2,1,1)$. The first gives $4 \\times \\frac{6!}{3!} = 4 \\times 120 = 480$. The second gives ${}^4C_2 \\times \\frac{6!}{2!\\,2!} = 6 \\times 180 = 1080$. Total $480 + 1080 = 1560$.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Unnamed boxes, none empty",
      content:
        "Suppose the boxes have no names: three identical bags instead of Rooms 1, 2, 3. Take any split of the objects into $k$ non-empty unnamed groups. Its groups can be given the $k$ box names in exactly $k!$ ways, and each way is a different onto distribution. So divide the onto count by $k!$:\n\n- 5 different objects into 3 identical boxes, none empty: $150 \\div 3! = 25$.\n- 4 different balls into 2 identical boxes, none empty: $14 \\div 2! = 7$.\n\nOnly use this division when **no box may be empty**. Once two boxes can both be empty, swapping the names of the empty boxes changes nothing, so some splits have fewer than $k!$ labellings and dividing gives nonsense: $3^4 \\div 3! = 13.5$. Instead, count by cases of group sizes, as in 3.1. For example, 4 different balls into 3 identical boxes with empties allowed: sizes $(4,0,0)$ give 1, $(3,1,0)$ give 4, $(2,2,0)$ give $\\frac{4!}{2!\\,2!\\,2!} = 3$, and $(2,1,1)$ give $\\frac{4!}{2!\\,1!\\,1!\\,2!} = 6$, total 14.",
    },
    {
      type: "text",
      content:
        "**With two boxes** the same reasoning is shorter. All $2^n$, minus the 2 ways where everything goes in one box, gives $2^n - 2$. For example, 4 different balls in 2 different boxes, neither empty: $16 - 2 = 14$.",
    },
    {
      type: "text",
      content:
        "**Derangements: nobody gets their own.** Four friends put their name slips in a hat and each draws one. In how many ways does **nobody** draw their own name? Write a draw as a word: position $i$ is the slip person $i$ drew. We want words using 1, 2, 3, 4 where no digit sits in its own position. There are nine:\n\n2143, 2341, 2413, 3142, 3412, 3421, 4123, 4312, 4321\n\nSo $D_4 = 9$ out of $4! = 24$ draws.",
    },
    {
      type: "callout",
      variant: "info",
      title: "JEE extension (optional): the derangement formula",
      content:
        "Inclusion–exclusion counts derangements too. Let $F_i$ be the arrangements where person $i$ gets their own slip. Fixing any $j$ named people leaves $(n-j)!$ arrangements, and there are ${}^nC_j$ ways to pick them. So\n\n$\\displaystyle D_n = n! - {}^nC_1(n-1)! + {}^nC_2(n-2)! - \\cdots = n!\\left(1 - \\frac{1}{1!} + \\frac{1}{2!} - \\cdots + \\frac{(-1)^n}{n!}\\right)$\n\nFor $n = 4$: $24 - 24 + 12 - 4 + 1 = 9$. For $n = 5$: $120 - 120 + 60 - 20 + 5 - 1 = 44$. As $n$ grows, $D_n / n!$ gets closer to $1/e \\approx 0.37$.",
    },
    {
      type: "text",
      content:
        "**Worked example (JEE style): exactly some right.** A clerk puts 5 letters into their 5 addressed envelopes at random, one letter each. In how many ways do **exactly 2** letters go into the correct envelope?\n\n1. Choose which 2 letters are right: ${}^5C_2 = 10$ ways. *Why choose them first:* 'exactly 2' names a set of lucky letters, and once they are fixed, the rest of the problem is about the other 3.\n2. The other 3 letters must **all** be wrong, or we would have more than 2 right. That is a derangement of 3: $D_3 = 2$ (for letters $c, d, e$ the only options are $d, e, c$ and $e, c, d$).\n3. Multiply:",
    },
    { type: "math", latex: "{}^5C_2 \\times D_3 = 10 \\times 2 = 20" },
    {
      type: "text",
      content:
        "4. The general pattern: exactly $r$ of $n$ right is ${}^nC_r\\,D_{n-r}$. A quick check: exactly 4 of 5 right is ${}^5C_4\\,D_1 = 5 \\times 0 = 0$, which is correct, because if 4 letters are right the last one has only its own envelope left.",
    },
    {
      type: "table",
      headers: ["$n$", "All distributions $3^n$", "Onto $3^n - 3\\cdot2^n + 3$", "Derangements $D_n$ ($n$ letters, $n$ envelopes)"],
      rows: [
        ["2", "9", "0", "1"],
        ["3", "27", "6", "2"],
        ["4", "81", "36", "9"],
        ["5", "243", "150", "44"],
      ],
    },
    {
      type: "text",
      content:
        "The table only saves space. The first two columns put $n$ objects into **3** boxes. The last column puts $n$ letters into **$n$** envelopes, one each. They answer different questions and are not related to each other.",
    },
    {
      type: "quiz",
      id: "pc3-4-q1",
      variant: "concept",
      question: "4 different letters are posted into 6 postboxes. How many ways?",
      options: [
        { text: "$6^4 = 1296$", correct: true, feedback: "Each of the 4 letters chooses one of 6 boxes." },
        { text: "$4^6 = 4096$", feedback: "That has the boxes choosing letters. But a box can take several letters, or none." },
        { text: "${}^6P_4 = 360$", feedback: "That forbids two letters sharing a box. A postbox can hold many letters." },
      ],
      hint: "Which things are making the choices?",
    },
    {
      type: "quiz",
      id: "pc3-4-q2",
      variant: "practice",
      question: "4 different balls go into 2 different boxes, and neither box may be empty. How many ways?",
      options: [
        { text: "14", correct: true, feedback: "$2^4 - 2 = 14$. Only 'all in box 1' and 'all in box 2' are removed." },
        { text: "16", feedback: "That allows an empty box." },
        { text: "7", feedback: "$14 \\div 2!$ is the count for two identical boxes. These boxes are different." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-4-q3",
      variant: "practice",
      question: "4 different jobs are given to 3 workers, and every worker gets at least one job. How many ways?",
      options: [
        { text: "36", correct: true, feedback: "$3^4 - 3\\cdot2^4 + 3 = 81 - 48 + 3 = 36$." },
        { text: "33", feedback: "$81 - 48$ forgets to add back the 3 all-to-one-worker cases, which were subtracted twice." },
        { text: "81", feedback: "That allows a worker to get no jobs." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-4-q4",
      variant: "concept",
      question: "In $3^n - 3\\cdot 2^n + 3$, why is the $+3$ there?",
      options: [
        { text: "Each 'everything in one box' distribution lies in two of the 'box empty' sets, so it was subtracted twice.", correct: true, feedback: "All-in-R is in both 'P empty' and 'Q empty'. Adding it back once corrects the double subtraction." },
        { text: "To count the 3 empty boxes.", feedback: "Empty boxes are what we are removing, not adding." },
        { text: "It is a rounding correction.", feedback: "Counting is exact. Every term has a reason." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-4-q5",
      variant: "practice",
      question: "4 letters go into 4 addressed envelopes, one each, and **every** letter goes into a wrong envelope. How many ways?",
      options: [
        { text: "9", correct: true, feedback: "That is $D_4 = 9$, listed above: 2143, 2341, 2413, 3142, 3412, 3421, 4123, 4312, 4321." },
        { text: "23", feedback: "$24 - 1$ removes only the case where all are correct. 'At least one wrong' is not 'all wrong'." },
        { text: "$3^4 = 81$", feedback: "Letters cannot share an envelope, so this is not $k^n$." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-4-q6",
      variant: "practice",
      question: "5 students are sent to 3 named rooms, and no room may be empty. How many ways?",
      options: [
        { text: "150", correct: true, feedback: "$243 - 96 + 3 = 150$, and splitting by room sizes gives 60 + 90." },
        { text: "25", feedback: "$150 \\div 3!$ treats the rooms as identical, unnamed boxes. Here the rooms have names." },
        { text: "243", feedback: "That includes distributions with an empty room." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-4-q7",
      variant: "practice",
      question: "5 different balls go into 4 different boxes, and no box may be empty. How many ways?",
      options: [
        { text: "240", correct: true, feedback: "$4^5 - 4\\cdot 3^5 + 6\\cdot 2^5 - 4\\cdot 1^5 = 1024 - 972 + 192 - 4 = 240$. Check: one box gets 2 balls. Choose them, ${}^5C_2 = 10$, then share the 4 bundles among 4 boxes, $4! = 24$: $10 \\times 24 = 240$." },
        { text: "1024", feedback: "$4^5$ allows empty boxes." },
        { text: "256", feedback: "$4^4$ has the base and exponent in the wrong places, and still allows empty boxes. Start from $4^5$ and remove the empty-box cases." },
      ],
      hint: "Use the $k$-box formula with $k = 4$, or ask how the sizes must look.",
    },
    {
      type: "quiz",
      id: "pc3-4-q8",
      variant: "practice",
      question: "6 different tasks are assigned to 3 named teams, and every team must get at least one task. How many ways?",
      options: [
        { text: "540", correct: true, feedback: "$3^6 - 3\\cdot 2^6 + 3 = 729 - 192 + 3 = 540$. By sizes: $90 + 360 + 90$." },
        { text: "537", feedback: "$729 - 192$ forgets to add back the 3 'everything to one team' cases, which were subtracted twice." },
        { text: "90", feedback: "$540 \\div 3!$ is the count for unnamed groups. Design, backend and testing are different teams." },
      ],
      hint: "All assignments, minus those that leave a team idle, plus the double-subtracted ones.",
    },
    {
      type: "quiz",
      id: "pc3-4-q9",
      variant: "practice",
      question: "6 letters go into their 6 addressed envelopes, one each. In how many ways are **exactly 2** letters in the correct envelope?",
      options: [
        { text: "135", correct: true, feedback: "Choose the 2 right letters, ${}^6C_2 = 15$, and derange the other 4, $D_4 = 9$: $15 \\times 9 = 135$." },
        { text: "360", feedback: "${}^6C_2 \\times 4!$ lets the other 4 letters land anywhere, including more correct envelopes. They must all be wrong." },
        { text: "30", feedback: "$15 \\times D_3$ deranges only 3 letters. After fixing 2 of 6, four letters are left." },
      ],
      hint: "Exactly $r$ of $n$ right is ${}^nC_r\\,D_{n-r}$.",
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "choosing-the-model",
  title: "3.5 · Choosing the Right Model",
  position: 5,
  blocks: blocks([
    {
      type: "text",
      content:
        "You now have eight or nine counting formulas. In an exam the hard part is rarely the arithmetic. It is deciding **which** formula the story describes. Two problems can read almost the same and still need different models. This lesson is a procedure for choosing, followed by a sorting drill.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The three questions",
      content:
        "1. **Does order matter?** Would swapping two chosen items give a different outcome? That means arrangement. If not, it is a selection.\n2. **Can things repeat?** Can the same item or symbol be used again? Can a box take more than one item?\n3. **What is identical?** Are the items interchangeable? Are the boxes or seats told apart (named, or fixed in a line) or not (unlabelled groups, a round table)?",
    },
    {
      type: "table",
      headers: ["Situation", "Order?", "Repeat?", "Identical?", "Count"],
      rows: [
        ["Arrange $r$ of $n$ different items", "yes", "no", "—", "${}^nP_r = \\frac{n!}{(n-r)!}$"],
        ["Fill $r$ slots from $n$ symbols", "yes", "yes", "—", "$n^r$"],
        ["Arrange all, with $p$ alike and $q$ alike", "yes", "no", "some items", "$\\frac{n!}{p!\\,q!}$"],
        ["Seat $n$ around a round table", "yes (relative)", "no", "rotations", "$(n-1)!$"],
        ["Choose $r$ of $n$", "no", "no", "—", "${}^nC_r$"],
        ["Any subset of $n$", "no", "no", "—", "$2^n$"],
        ["$n$ identical items into $k$ boxes", "no", "yes", "items", "${}^{n+k-1}C_{k-1}$"],
        ["$n$ different items into $k$ boxes", "—", "yes", "no", "$k^n$"],
        ["Split into groups of given sizes", "no", "no", "equal unlabelled groups", "$\\frac{n!}{n_1!\\cdots n_k!}$, $\\div\\, m!$ for $m$ equal groups"],
        ["$n$ different items into $k$ identical boxes", "—", "yes", "boxes", "List the group-size cases (3.1); if none empty, onto count $\\div\\, k!$"],
        ["$n$ identical items into $k$ identical boxes", "no", "yes", "items and boxes", "List the ways to write $n$ as a sum of at most $k$ parts"],
        ["Select from $p$, $q$, $r$ identical items of each type", "no", "yes", "items within a type", "$(p+1)(q+1)(r+1)$, minus 1 if at least one is needed"],
      ],
    },
    {
      type: "text",
      content:
        "**Watch the models separate.** Four stories use the numbers 3 and 5:\n\n- 5 **different** books given to 3 students: each book chooses a student, $3^5 = 243$.\n- 5 **identical** books given to 3 students: only the counts matter, ${}^7C_2 = 21$.\n- 3 **different** prizes given to 5 students, at most one prize each: first prize has 5 choices, then 4, then 3, so ${}^5P_3 = 60$.\n- 3 **identical** prizes given to 5 students, at most one each: choose the winners, ${}^5C_3 = 10$.\n\nThe numbers are the same, the answers are all different, and each difference comes from one of the three questions.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Test your model on a tiny case",
      content:
        "When two models both seem to fit, shrink the numbers until you can list the outcomes by hand, for example 2 items and 2 boxes. List them, count them, and see which formula gives that number. This takes thirty seconds and settles almost every doubt.",
    },
    {
      type: "text",
      content:
        "Here is the tiny-case test on the first two stories, shrunk to 2 books and 2 students, Meera and Tanvi. With **different** books each book picks a student, and the tree has $2 \\times 2 = 4$ leaves. With **identical** books, the leaves (Meera, Tanvi) and (Tanvi, Meera) both mean \"one book each\", so only 3 outcomes survive: (2, 0), (1, 1), (0, 2). That is ${}^3C_1 = 3$ from stars and bars, not $2^2 = 4$.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "product",
        stages: [
          { label: "Book 1", options: ["Meera", "Tanvi"] },
          { label: "Book 2", options: ["Meera", "Tanvi"] },
        ],
        highlightPath: ["Meera", "Tanvi"],
        caption:
          "Different books: 4 leaves, $2^2$. If the books were identical, the highlighted leaf (book 1 to Meera, book 2 to Tanvi) and the leaf (Tanvi, Meera) would be the same outcome, leaving 3, which is the stars-and-bars count ${}^3C_1$.",
      },
    },
    {
      type: "text",
      content:
        "**Worked examples: the three questions in action.** Each example below answers the three questions *in writing* before any arithmetic. That is the habit to build.",
    },
    {
      type: "text",
      content:
        "**Worked example 1 (routine).** 7 different chocolates are shared between two children, Isha and Kabir, and each child must get at least one. How many ways?\n\n1. Order? No, a child's chocolates form a pile. Repeat? A child can get several chocolates, so yes. Identical? The chocolates are different and the children are named.\n2. That is the $k^n$ model with a 'none empty' rule: different objects into different boxes, onto.\n3. All shares: $2^7 = 128$. Remove 'all to Isha' and 'all to Kabir'. *Why only 2 cases:* with two boxes, an empty box means everything is in the other one.",
    },
    { type: "math", latex: "2^7 - 2 = 126" },
    {
      type: "text",
      content:
        "**Worked example 2 (application: hotel rooms).** 5 friends check into a hotel with 3 different rooms, and each room holds **at most 2** people. In how many ways can they be put into rooms?\n\n1. Order? No, a room holds a group. Repeat? A room holds up to 2, so boxes take more than one object. Identical? Friends are different, rooms are named.\n2. The cap changes the model. 5 people with at most 2 per room in 3 rooms forces the sizes to be $(2, 2, 1)$ in some order: $2 + 2 + 1 = 5$ is the only way. *Why list the sizes:* a cap on a box is easiest to handle by listing the allowed group sizes, the method from 3.1.\n3. Choose which room gets the single person (3 ways). Then fill the rooms, which are named: $\\frac{5!}{2!\\,2!\\,1!} = 30$.",
    },
    { type: "math", latex: "3 \\times \\frac{5!}{2!\\,2!\\,1!} = 3 \\times 30 = 90" },
    {
      type: "text",
      content:
        "4. Check by the complement. From all $3^5 = 243$, remove the ones where some room has 3 or more. For one named room that happens in ${}^5C_3\\,2^2 + {}^5C_4\\,2 + 1 = 40 + 10 + 1 = 51$ ways, and two rooms can't both have 3 of only 5 people, so subtract $3 \\times 51 = 153$: $243 - 153 = 90$. Both routes agree, but listing sizes was quicker.",
    },
    {
      type: "text",
      content:
        "**Worked example 3 (JEE style: two models in one question).** 5 different books and 4 identical pens are given to 3 students. A student may get nothing. In how many ways?\n\n1. Split the story. The books and the pens are handed out independently, so answer the three questions for **each** kind of object. *Why split:* one question can hide two models, and the multiplication principle joins them back up.\n2. Books: different objects into named students, $3^5 = 243$.\n3. Pens: identical objects into named students, stars and bars with 4 stars and 2 bars, ${}^6C_2 = 15$.\n4. Every book-share can go with every pen-share:",
    },
    { type: "math", latex: "3^5 \\times {}^{6}C_2 = 243 \\times 15 = 3645" },
    {
      type: "text",
      content:
        "5. Two wrong models to avoid. Treating all 9 objects as different gives $3^9$, which counts pen swaps that change nothing. Treating all 9 as identical gives ${}^{11}C_2 = 55$, which forgets that who gets the maths book matters.",
    },
    {
      type: "quiz",
      id: "pc3-5-q17",
      variant: "practice",
      question: "4 friends are put into 3 different hotel rooms, each room holding at most 2 people. Rooms may be empty. How many ways?",
      options: [
        { text: "54", correct: true, feedback: "Sizes $(2,2,0)$: 3 choices of empty room times $\\frac{4!}{2!\\,2!} = 6$, giving 18. Sizes $(2,1,1)$: 3 choices of the double room times $\\frac{4!}{2!} = 12$, giving 36. Total 54. Check: $81 - 27 = 54$." },
        { text: "81", feedback: "$3^4$ ignores the cap and lets 3 or 4 people share a room." },
        { text: "36", feedback: "That is only the $(2,1,1)$ case. Two rooms of 2 with the third room empty is also allowed." },
      ],
      hint: "List the allowed room sizes first.",
    },
    {
      type: "quiz",
      id: "pc3-5-q18",
      variant: "practice",
      question: "4 different books and 3 identical pens are given to 2 students, and a student may get nothing. How many ways?",
      options: [
        { text: "64", correct: true, feedback: "Books: $2^4 = 16$. Pens: 3 stars and 1 bar, ${}^4C_1 = 4$. Together $16 \\times 4 = 64$." },
        { text: "128", feedback: "$2^7$ treats the pens as different. Giving pen 1 or pen 2 to a student changes nothing." },
        { text: "20", feedback: "$16 + 4$ adds the two parts. Every book-share goes with every pen-share, so multiply." },
      ],
      hint: "Answer the three questions separately for the books and for the pens.",
    },
    {
      type: "text",
      content:
        "**Sorting drill.** For each problem, pick the model *before* computing anything. The options are models, not numbers. Once you have the model, the arithmetic is quick.",
    },
    {
      type: "quiz",
      id: "pc3-5-q7",
      variant: "practice",
      question: "How many 3-letter codes can be made from 26 letters, with repeats allowed? Which model?",
      options: [
        { text: "$n^r$: $26^3 = 17\\,576$", correct: true, feedback: "Order matters (ABC is not CBA) and letters may repeat, so each of the 3 slots has 26 choices." },
        { text: "${}^nP_r$: $26 \\times 25 \\times 24$", feedback: "That forbids repeats. Codes like AAB are allowed here." },
        { text: "${}^nC_r$: ${}^{26}C_3$", feedback: "That ignores order and forbids repeats. ABC and CBA are different codes." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q8",
      variant: "practice",
      question: "In how many ways can 7 people sit around a round table? Which model?",
      options: [
        { text: "Circular: $(7-1)! = 720$", correct: true, feedback: "Rotating everyone one seat gives the same seating, so fix one person and arrange the other 6." },
        { text: "Arrangement in a row: $7! = 5040$", feedback: "That counts each seating 7 times, once for every rotation." },
        { text: "Bracelet: $\\frac{6!}{2} = 360$", feedback: "People at a table are not flipped over. Clockwise and anticlockwise neighbours are different." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q9",
      variant: "concept",
      question: "How many 3-person committees can be picked from 8 people? Which model?",
      options: [
        { text: "${}^nC_r$: ${}^8C_3 = 56$", correct: true, feedback: "A committee is a set. Picking Asha, Ben, Chitra in any order gives the same committee." },
        { text: "${}^nP_r$: $8 \\times 7 \\times 6 = 336$", feedback: "That counts each committee $3! = 6$ times, once for each order of picking. Compare the next question, where order does matter." },
        { text: "$n^r$: $8^3 = 512$", feedback: "That lets the same person be picked twice and counts orders." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q10",
      variant: "concept",
      question: "In how many ways can gold, silver and bronze go to 3 of 8 runners? Which model?",
      options: [
        { text: "${}^nP_r$: $8 \\times 7 \\times 6 = 336$", correct: true, feedback: "The medals are different, so swapping gold and silver between two runners gives a new result. Order matters, no repeats." },
        { text: "${}^nC_r$: ${}^8C_3 = 56$", feedback: "That only says which 3 runners got a medal, not who got which. Same 8 and 3 as the committee, but here the positions have names." },
        { text: "$n^r$: $8^3 = 512$", feedback: "One runner cannot win both gold and silver." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q11",
      variant: "practice",
      question: "How many arrangements are there of the letters of LEVEL? Which model?",
      options: [
        { text: "Repeated letters: $\\frac{5!}{2!\\,2!} = 30$", correct: true, feedback: "Two L's and two E's. Swapping identical letters gives the same word." },
        { text: "All different: $5! = 120$", feedback: "That treats the two L's (and the two E's) as different letters." },
        { text: "Selection: ${}^5C_2 = 10$", feedback: "Nothing is being chosen. All five letters are used and order matters." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q12",
      variant: "concept",
      question: "In how many ways can 6 **identical** pens go to 3 students? Which model?",
      options: [
        { text: "Stars and bars: ${}^8C_2 = 28$", correct: true, feedback: "Only how many pens each student gets matters: 6 stars, 2 bars." },
        { text: "$k^n$: $3^6 = 729$", feedback: "That lets each pen choose a student, so it tells pens apart. These pens are identical. Compare the next question." },
        { text: "${}^nC_r$: ${}^6C_3 = 20$", feedback: "That picks 3 of 6 different things. Here nothing is picked out of the pens." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q13",
      variant: "concept",
      question: "In how many ways can 6 **different** pens go to 3 students? Which model?",
      options: [
        { text: "$k^n$: $3^6 = 729$", correct: true, feedback: "Each different pen chooses one of 3 students, independently." },
        { text: "Stars and bars: ${}^8C_2 = 28$", feedback: "That records only how many pens each student gets. With different pens, who gets the red pen matters." },
        { text: "$n^k$: $6^3 = 216$", feedback: "That has the students choosing pens, but a student can get several pens or none." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q14",
      variant: "practice",
      question: "How many pizzas can be made from 6 available toppings, using any number of them including none? Which model?",
      options: [
        { text: "All subsets: $2^6 = 64$", correct: true, feedback: "Each topping is either on or off." },
        { text: "${}^6C_r$ for one $r$", feedback: "The number of toppings is not fixed. Adding ${}^6C_0 + \\cdots + {}^6C_6$ gives 64 again." },
        { text: "$6! = 720$", feedback: "The order in which toppings go on does not change the pizza." },
      ],
    },
    {
      type: "text",
      content:
        "**Two more models from the same questions.** Sometimes the items come in identical **groups** and you choose some of them. You have 3 identical apples, 4 identical mangoes and 2 identical bananas, and you want a basket with at least one fruit. A basket is fixed by how many of each you take: 0 to 3 apples (4 choices), 0 to 4 mangoes (5 choices), 0 to 2 bananas (3 choices). Remove the empty basket:\n\n$\\displaystyle (3+1)(4+1)(2+1) - 1 = 60 - 1 = 59$\n\nThe same model counts divisors. A divisor of $2^3 \\cdot 3^2 \\cdot 5$ picks 0 to 3 twos, 0 to 2 threes and 0 to 1 five, so there are $4 \\times 3 \\times 2 = 24$ of them. Here the 'empty basket' is the divisor 1, and it is kept.\n\nAnd sometimes **both** the items and the boxes are identical. Then a distribution is just a way to write $n$ as a sum of at most $k$ parts, with the order of the parts ignored. For small numbers, list them. For 5 identical balls in 3 identical boxes: $5$, $4+1$, $3+2$, $3+1+1$, $2+2+1$, which makes 5 ways.",
    },
    {
      type: "quiz",
      id: "pc3-5-q1",
      variant: "concept",
      question:
        "A shop sells 3 flavours of ice cream. You buy 5 cones, and all that matters is how many of each flavour. Which model fits?",
      options: [
        { text: "Stars and bars: ${}^7C_2 = 21$", correct: true, feedback: "The cones are identical except for flavour, so 5 stars go into 3 flavour boxes." },
        { text: "$3^5 = 243$", feedback: "That treats the 5 cones as different, as if cone 1 being mango and cone 2 vanilla were different from the reverse." },
        { text: "${}^5C_3 = 10$", feedback: "That picks 3 of 5 different things. Nothing here is being picked out of five." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q2",
      variant: "concept",
      question: "Every pair of 10 people shakes hands once. How many handshakes?",
      options: [
        { text: "${}^{10}C_2 = 45$", correct: true, feedback: "A handshake is an unordered pair: Asha–Ben is the same handshake as Ben–Asha." },
        { text: "${}^{10}P_2 = 90$", feedback: "That counts each handshake twice, once from each side." },
        { text: "$10^2 = 100$", feedback: "That allows people to shake their own hands and counts each pair in both orders." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q3",
      variant: "concept",
      question: "6 different beads are threaded on a loop to make a bracelet, which can be flipped over. How many different bracelets?",
      options: [
        { text: "$\\frac{(6-1)!}{2} = 60$", correct: true, feedback: "Rotations do not change the bracelet, and a flip turns clockwise into anticlockwise. So divide $5!$ by 2." },
        { text: "$(6-1)! = 120$", feedback: "That is right for people at a table, where clockwise and anticlockwise differ. A bracelet can be turned over." },
        { text: "$6! = 720$", feedback: "That counts every rotation of the same loop separately." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q4",
      variant: "concept",
      question: "6 different books are shared between Meera and Tanvi, 3 each. How many ways?",
      options: [
        { text: "${}^6C_3 = 20$", correct: true, feedback: "Choose Meera's three and Tanvi gets the rest. The two girls are named groups, so there is no division." },
        { text: "10", feedback: "That divides by $2!$ as if the two piles had no owners. Meera and Tanvi are different people." },
        { text: "$2^6 = 64$", feedback: "That allows splits like 6 and 0, or 4 and 2. Each girl must get exactly 3." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q5",
      variant: "concept",
      question: "A 10-question true/false test is answered in full. How many different answer sheets are possible?",
      options: [
        { text: "$2^{10} = 1024$", correct: true, feedback: "Each question is a slot with 2 symbols, and repeats are allowed: $n^r$ with $n = 2$." },
        { text: "$10^2 = 100$", feedback: "The base and exponent are swapped. The questions are the slots and T or F are the symbols." },
        { text: "${}^{10}C_2 = 45$", feedback: "Nothing is being chosen two at a time. Every question gets an answer." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-5-q6",
      variant: "practice",
      question: "5 different toys are shared between two children, Isha and Kabir, and each child must get at least one toy. How many ways? Which model?",
      options: [
        { text: "Onto, $k^n$ minus empties: $2^5 - 2 = 30$", correct: true, feedback: "Different toys into named children: $2^5 = 32$, minus 'all to Isha' and 'all to Kabir'." },
        { text: "$k^n$: $2^5 = 32$", feedback: "That allows one child to get nothing. The rule 'at least one each' removes two cases." },
        { text: "Unnamed groups: $\\frac{2^5 - 2}{2!} = 15$", feedback: "Dividing by $2!$ treats the two children as identical boxes. Isha and Kabir are different people." },
        { text: "Stars and bars, positive: ${}^4C_1 = 4$", feedback: "That counts how many toys each child gets, as if the toys were identical. These toys are different." },
      ],
      hint: "Are the toys different? Are the children named? Can a child get nothing?",
    },
    {
      type: "quiz",
      id: "pc3-5-q15",
      variant: "practice",
      question: "5 identical balls go into 3 identical boxes, and boxes may be empty. How many ways?",
      options: [
        { text: "5", correct: true, feedback: "Only the multiset of box sizes matters: $5$, $4+1$, $3+2$, $3+1+1$, $2+2+1$." },
        { text: "21", feedback: "${}^7C_2$ is for **named** boxes, where (4, 1, 0) and (0, 1, 4) are different. Here they are the same." },
        { text: "$3^5 = 243$", feedback: "That tells the balls apart and the boxes apart. Here neither can be told apart." },
      ],
      hint: "List the ways to write 5 as a sum of at most 3 parts.",
    },
    {
      type: "quiz",
      id: "pc3-5-q16",
      variant: "practice",
      question: "From 3 identical apples, 4 identical mangoes and 2 identical bananas, how many baskets with at least one fruit can be made?",
      options: [
        { text: "59", correct: true, feedback: "$(3+1)(4+1)(2+1) - 1 = 60 - 1 = 59$. Taking 0 of a fruit is a choice too. Only the empty basket is removed." },
        { text: "24", feedback: "$3 \\times 4 \\times 2$ forgets that taking none of a fruit is also a choice." },
        { text: "511", feedback: "$2^9 - 1$ treats the 9 fruits as all different. Two apples are the same apple as far as the basket is concerned." },
      ],
      hint: "How many choices for the number of apples?",
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
        "These questions draw on everything from Chapters 0 to 3 and come in no particular order, just as they would in an exam. For each one, answer the three questions first: order, repetition, identical. Pick a model, then compute. If two models seem to fit, test them on a tiny case.",
    },
    {
      type: "quiz",
      id: "pc3-6-q1",
      variant: "mastery",
      question: "How many 5-digit numbers have all their digits different?",
      options: [
        { text: "$27\\,216$", correct: true, feedback: "The first digit can't be 0, so it has 9 choices. Then $9 \\times 8 \\times 7 \\times 6$ for the rest: $9 \\times 9 \\times 8 \\times 7 \\times 6 = 27\\,216$." },
        { text: "$30\\,240$", feedback: "${}^{10}P_5$ counts strings that start with 0 as well." },
        { text: "$15\\,120$", feedback: "$9 \\times 8 \\times 7 \\times 6 \\times 5$ leaves 0 out of the later places, where it is allowed." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-6-q2",
      variant: "mastery",
      question: "How many arrangements are there of the letters of MISSISSIPPI?",
      options: [
        { text: "$34\\,650$", correct: true, feedback: "$\\frac{11!}{4!\\,4!\\,2!} = 34\\,650$ for four I's, four S's and two P's." },
        { text: "$69\\,300$", feedback: "That forgets the two P's." },
        { text: "$39\\,916\\,800$", feedback: "$11!$ treats the repeated letters as different." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-6-q3",
      variant: "mastery",
      question: "8 identical balls go into 3 different boxes, and no box may be empty. How many ways?",
      options: [
        { text: "21", correct: true, feedback: "Positive solutions: ${}^{7}C_{2} = 21$." },
        { text: "45", feedback: "${}^{10}C_2$ allows empty boxes." },
        { text: "5796", feedback: "$3^8 - 3\\cdot 2^8 + 3 = 5796$ is the count for **different** balls. These balls are identical." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-6-q4",
      variant: "mastery",
      question: "6 people are split into 3 pairs for a project, with nothing to tell the pairs apart. How many ways?",
      options: [
        { text: "15", correct: true, feedback: "$\\frac{6!}{(2!)^3\\,3!} = 15$, or $5 \\times 3 \\times 1$." },
        { text: "90", feedback: "That treats the pairs as named. Divide by $3!$." },
        { text: "20", feedback: "${}^6C_3$ picks a group of three, which is a different question." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-6-q5",
      variant: "mastery",
      question: "4 different gifts go to 3 children, and every child gets at least one. How many ways?",
      options: [
        { text: "36", correct: true, feedback: "$81 - 48 + 3 = 36$. Another way: one child gets two gifts. Pick the pair, ${}^4C_2 = 6$, then share out the three bundles, $3! = 6$, giving 36." },
        { text: "81", feedback: "That allows a child to get nothing." },
        { text: "6", feedback: "That shares out only three bundles, after the pair of gifts has already been chosen." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-6-q6",
      variant: "mastery",
      question: "How many solutions does $x + y + z = 7$ have in non-negative integers with $z \\ge 2$?",
      options: [
        { text: "21", correct: true, feedback: "$z' = z - 2$ gives $x + y + z' = 5$: ${}^7C_2 = 21$." },
        { text: "36", feedback: "${}^9C_2$ ignores the rule $z \\ge 2$." },
        { text: "15", feedback: "${}^6C_2$ takes off one unit too many." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-6-q7",
      variant: "mastery",
      question: "A committee of 5 is chosen from 6 men and 4 women, with at least 3 women. How many committees?",
      options: [
        { text: "66", correct: true, feedback: "3 women: ${}^4C_3\\,{}^6C_2 = 60$. 4 women: ${}^4C_4\\,{}^6C_1 = 6$. Total 66." },
        { text: "60", feedback: "That forgets the case with all 4 women." },
        { text: "252", feedback: "${}^{10}C_5$ ignores the rule about women." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-6-q8",
      variant: "mastery",
      question: "6 people sit around a round table, and two particular friends must sit together. How many seatings?",
      options: [
        { text: "48", correct: true, feedback: "Tie the friends into one unit, which leaves 5 units in a circle: $4! = 24$. The friends can swap: $\\times 2 = 48$." },
        { text: "240", feedback: "$2 \\times 5!$ is the count for a row. A round table divides out rotations." },
        { text: "24", feedback: "The two friends can sit in either order." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-6-q9",
      variant: "mastery",
      question: "Using a bounded equation, in how many ways can three different-coloured dice show a total of 9?",
      options: [
        { text: "25", correct: true, feedback: "$a' + b' + c' = 6$ with each at most 5: ${}^8C_2 = 28$, minus 3 cases where one value is 6, gives 25." },
        { text: "28", feedback: "That keeps outcomes like (7, 1, 1), where a die shows 7." },
        { text: "6", feedback: "That counts unordered totals like {1, 2, 6} or {3, 3, 3}. The dice have different colours, so (1, 2, 6) and (6, 2, 1) are different outcomes." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-6-q10",
      variant: "mastery",
      question: "10 identical rings are worn on the 4 fingers of one hand, and only the number on each finger matters. How many ways?",
      options: [
        { text: "286", correct: true, feedback: "Stars and bars: ${}^{13}C_3 = 286$." },
        { text: "$4^{10}$", feedback: "That is for 10 **different** rings." },
        { text: "210", feedback: "${}^{10}C_4$ picks 4 of the rings. It does not share the rings out among the fingers." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-6-q11",
      variant: "mastery",
      question: "5 letters go into their 5 addressed envelopes, and every letter goes into a wrong envelope. How many ways?",
      options: [
        { text: "44", correct: true, feedback: "$D_5 = 120 - 120 + 60 - 20 + 5 - 1 = 44$." },
        { text: "119", feedback: "$5! - 1$ counts 'at least one wrong', not 'all wrong'." },
        { text: "$4^5 = 1024$", feedback: "Letters cannot share an envelope, so this is not $k^n$." },
      ],
    },
    {
      type: "quiz",
      id: "pc3-6-q12",
      variant: "mastery",
      question: "How many positive divisors does $360 = 2^3 \\cdot 3^2 \\cdot 5$ have?",
      options: [
        { text: "24", correct: true, feedback: "A divisor chooses its power of 2 (0 to 3), of 3 (0 to 2) and of 5 (0 to 1): $4 \\times 3 \\times 2 = 24$. This is the fruit-basket model from 3.5, $(p+1)(q+1)(r+1)$, with the divisor 1 playing the empty basket and kept." },
        { text: "6", feedback: "$3 \\times 2 \\times 1$ forgets that a power of 0 is also a choice." },
        { text: "$2^3 = 8$", feedback: "Divisors are not subsets of three distinct primes. The same prime can appear more than once." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Next",
      content:
        "You now have the full counting toolkit. Chapter 4 turns it on algebra. Expanding $(a+b)^n$ comes down to counting how many ways to choose $b$ from $r$ of the brackets, and those counts fill Pascal's triangle.",
    },
  ]),
};

export const pncChapter3Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
