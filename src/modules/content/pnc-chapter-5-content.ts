import type { z } from "zod";
import type { LessonBlock } from "@/modules/content/schemas/blocks";
import { lessonBlocksSchema } from "@/modules/content/schemas/blocks";
import type { LessonSeed } from "@/modules/content/chapter-0-content";

/**
 * Permutations, Combinations & the Binomial Theorem, Chapter 5: Binomial
 * Coefficients at Work.
 * The theorem used as a tool: coefficient sums by substitution, weighted
 * sums and Vandermonde by counting, divisibility and remainders by writing
 * the base as (multiple + small), approximations for small x, a preview of
 * non-integer powers, and a full-course diagnostic to close.
 */

type BlockInput = z.input<typeof lessonBlocksSchema>;

function blocks(input: BlockInput): LessonBlock[] {
  return lessonBlocksSchema.parse(input);
}

const lesson01: LessonSeed = {
  slug: "sums-by-substitution",
  title: "5.1 · Sums by Substitution",
  position: 1,
  blocks: blocks([
    {
      type: "video",
      src: "/videos/pc-5-binomial-coefficients-at-work.mp4",
      poster: "/videos/pc-5-binomial-coefficients-at-work.jpg",
      title: "Chapter 5 overview video",
      caption:
        "A narrated walk through the whole chapter. Watch it now for the big picture, or come back to it as a recap.",
    },
    {
      type: "text",
      content:
        "Chapter 4 gave you the binomial theorem as a statement about counting:\n\n$\\displaystyle (1 + x)^n = \\binom{n}{0} + \\binom{n}{1}x + \\binom{n}{2}x^2 + \\cdots + \\binom{n}{n}x^n.$\n\nThis chapter treats that line as a **machine**. The left side is short and easy to evaluate. The right side is long but holds every coefficient. Feed a well-chosen number in for $x$, and the short side tells you something about the whole long side at once.\n\nFrom here on we write ${}^nC_r$ as $\\binom{n}{r}$ (the same number, as in 2.1) because the stacked form keeps long sums readable.",
    },
    {
      type: "text",
      content:
        "The cheapest input is $x = 1$. Every power of 1 is 1, so every $x^r$ on the right vanishes into a plain 1 and only the coefficients survive:",
    },
    {
      type: "math",
      latex:
        "2^n = (1+1)^n = \\binom{n}{0} + \\binom{n}{1} + \\binom{n}{2} + \\cdots + \\binom{n}{n}",
    },
    {
      type: "text",
      content:
        "Watch this happen row by row. Every row of Pascal's triangle adds up to a power of 2.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "highlight",
        pattern: "row-sum",
        rows: 8,
        initialCell: { n: 5, r: 0 },
        caption:
          "Slide n and read the row total. Row 5 is 1 + 5 + 10 + 10 + 5 + 1 = 32 = 2⁵.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      title: "The counting reason, again",
      content:
        "You met this in 4.2: $\\binom{n}{r}$ counts the subsets of size $r$ of an $n$-element set, so adding over every $r$ counts *all* subsets. Each element is either in or out, which gives $2^n$. The substitution $x = 1$ is the algebraic version of the same fact.",
    },
    {
      type: "text",
      content:
        "Now try $x = -1$. The powers alternate: $(-1)^r$ is $+1$ for even $r$ and $-1$ for odd $r$. The left side becomes $(1 - 1)^n = 0^n = 0$ (for $n \\ge 1$):",
    },
    {
      type: "math",
      latex:
        "0 = \\binom{n}{0} - \\binom{n}{1} + \\binom{n}{2} - \\binom{n}{3} + \\cdots + (-1)^n\\binom{n}{n}",
    },
    {
      type: "text",
      content:
        "So the even-position entries and the odd-position entries of every row balance exactly. Row 4: $1 - 4 + 6 - 4 + 1 = 0$. Row 5: $1 - 5 + 10 - 10 + 5 - 1 = 0$.\n\nTwo equations, two unknowns. Write $E = \\binom{n}{0} + \\binom{n}{2} + \\binom{n}{4} + \\cdots$ and $O = \\binom{n}{1} + \\binom{n}{3} + \\binom{n}{5} + \\cdots$. Then",
    },
    {
      type: "math",
      latex:
        "E + O = 2^n, \\qquad E - O = 0 \\quad\\Longrightarrow\\quad E = O = 2^{n-1}",
    },
    {
      type: "callout",
      variant: "definition",
      title: "Three sums from two substitutions",
      content:
        "For $n \\ge 1$:\n$\\sum_{r=0}^{n}\\binom{n}{r} = 2^n$ (put $x = 1$).\n$\\sum_{r=0}^{n}(-1)^r\\binom{n}{r} = 0$ (put $x = -1$).\n$\\binom{n}{0} + \\binom{n}{2} + \\cdots = \\binom{n}{1} + \\binom{n}{3} + \\cdots = 2^{n-1}$ (add and subtract).",
    },
    {
      type: "text",
      content:
        "There is a counting reason for the last one too. Fix one person, say Asha, in a group of $n$. Pair up each subset that leaves Asha out with the same subset plus Asha. The two subsets in each pair differ in size by exactly 1, so one is even and one is odd. Every subset is in exactly one pair, so even and odd subsets are equal in number, $2^n / 2 = 2^{n-1}$ each.",
    },
    {
      type: "table",
      headers: ["Row $n$", "Entries", "All ($2^n$)", "Even positions", "Odd positions"],
      rows: [
        ["3", "1, 3, 3, 1", "8", "1 + 3 = 4", "3 + 1 = 4"],
        ["4", "1, 4, 6, 4, 1", "16", "1 + 6 + 1 = 8", "4 + 4 = 8"],
        ["5", "1, 5, 10, 10, 5, 1", "32", "1 + 10 + 5 = 16", "5 + 10 + 1 = 16"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Find $\\binom{10}{1} + \\binom{10}{3} + \\binom{10}{5} + \\binom{10}{7} + \\binom{10}{9}$.\n\n**Step 1.** These are the odd-position entries of row 10.\n**Step 2.** The odd-position sum is $2^{n-1} = 2^9$.\n**Answer:** $512$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** A fruit bowl has 6 different fruits. In how many ways can you pick at least one?\n\n**Step 1.** Any selection is a subset. There are $2^6 = 64$ subsets.\n**Step 2.** \"At least one\" removes only the empty subset, $\\binom{6}{0} = 1$.\n**Answer:** $\\binom{6}{1} + \\binom{6}{2} + \\cdots + \\binom{6}{6} = 64 - 1 = 63$.",
    },
    {
      type: "text",
      content:
        "**Worked example 2b (word problem).** A pizza place offers 8 different toppings. The chef has a rule: every pizza carries an **odd** number of toppings. How many different pizzas are possible?\n\n**Step 1.** A pizza is a subset of the 8 toppings, and the rule keeps only the odd-sized subsets: $\\binom{8}{1} + \\binom{8}{3} + \\binom{8}{5} + \\binom{8}{7}$.\n*Why this step:* translating the story into \"which subsets?\" turns it into a row sum of Pascal's triangle.\n**Step 2.** Odd-position entries make up exactly half of row 8, so the sum is $2^{8-1} = 2^7$.\n*Why this step:* the Asha pairing (add or remove one fixed topping) matches every odd pizza with an even one, so the $2^8$ subsets split evenly.\n**Answer:** $128$ pizzas. **Check:** $8 + 56 + 56 + 8 = 128$.",
    },
    {
      type: "text",
      content:
        "**Any polynomial, not just (1 + x)ⁿ**\n\nThe substitution idea works for **any** polynomial. If $P(x) = a_0 + a_1x + a_2x^2 + \\cdots + a_mx^m$, then:\n\n**Sum of all coefficients** $= a_0 + a_1 + \\cdots + a_m = P(1)$.\n**Alternating sum** $= a_0 - a_1 + a_2 - \\cdots = P(-1)$.\n**Constant term** $= a_0 = P(0)$.\n**Sum of even-power coefficients** $= \\dfrac{P(1) + P(-1)}{2}$, **odd-power** $= \\dfrac{P(1) - P(-1)}{2}$.\n\nNo expansion needed. You never have to find a single coefficient.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Find the sum of the coefficients of $(3x - 2)^7$.\n\n**Step 1.** Call it $P(x) = (3x - 2)^7$. The sum of coefficients is $P(1)$.\n**Step 2.** $P(1) = (3 - 2)^7 = 1^7$.\n**Answer:** $1$.\n\nThe individual coefficients are huge: the first is $(-2)^7 = -128$ and the last is $3^7 = 2187$. The positives and negatives cancel almost completely.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"sum of coefficients = sum of binomial coefficients\"",
      content:
        "For $(3x - 2)^7$ many students answer $2^7 = 128$. That is the sum of the **binomial** coefficients $\\binom{7}{0} + \\cdots + \\binom{7}{7}$, which are only part of each coefficient. The actual coefficient of $x^r$ is $\\binom{7}{r}3^r(-2)^{7-r}$, and the 3 and the $-2$ change everything. The only safe method is to put $x = 1$ into the **whole expression**. The two answers agree only for $(1 + x)^n$ itself.",
    },
    {
      type: "text",
      content:
        "**Worked example 4.** For $(1 + 2x)^5$, find the sum of the coefficients of the even powers of $x$.\n\n**Step 1.** $P(1) = 3^5 = 243$ and $P(-1) = (-1)^5 = -1$.\n**Step 2.** Even-power sum $= \\dfrac{243 + (-1)}{2} = 121$.\n**Check by expanding:** $(1 + 2x)^5 = 1 + 10x + 40x^2 + 80x^3 + 80x^4 + 32x^5$, and $1 + 40 + 80 = 121$. The odd-power sum is $10 + 80 + 32 = 122 = \\dfrac{243 - (-1)}{2}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 5 (JEE style).** Let $(1 + x + x^2)^n = a_0 + a_1x + a_2x^2 + \\cdots + a_{2n}x^{2n}$. Find $a_0 + a_2 + a_4 + \\cdots + a_{2n}$.\n\n**Step 1.** Call the left side $P(x)$. The wanted sum is the even-power sum, $\\dfrac{P(1) + P(-1)}{2}$.\n*Why this step:* the coefficients $a_r$ are not binomial coefficients, so no Pascal-row fact applies. The substitution rule works for any polynomial.\n**Step 2.** $P(1) = (1 + 1 + 1)^n = 3^n$ and $P(-1) = (1 - 1 + 1)^n = 1$.\n*Why this step:* at $x = -1$ the odd powers flip sign and the even powers do not, which is exactly what separates the two groups.\n**Step 3.** Even-power sum $= \\dfrac{3^n + 1}{2}$.\n**Answer:** $\\dfrac{3^n + 1}{2}$ (and the odd-power sum is $\\dfrac{3^n - 1}{2}$).\n**Check with $n = 2$:** $(1 + x + x^2)^2 = 1 + 2x + 3x^2 + 2x^3 + x^4$, and $1 + 3 + 1 = 5 = \\dfrac{9 + 1}{2}$.",
    },
    {
      type: "quiz",
      id: "pc5-1-q1",
      variant: "concept",
      question: "What is the sum of the coefficients in the expansion of $(3x - 2)^7$?",
      options: [
        { text: "$1$", correct: true, feedback: "Put $x = 1$: $(3 - 2)^7 = 1$. Large positive and negative coefficients cancel." },
        { text: "$128$", feedback: "That is $2^7$, the sum of the binomial coefficients only. It ignores the 3 and the $-2$ inside each term." },
        { text: "$5^7$", feedback: "That would be $(3 + 2)^7$. It is the sum of the coefficients' absolute values, and it loses the minus sign." },
        { text: "$-128$", feedback: "That is the constant term, $P(0) = (-2)^7$, not the sum of all coefficients." },
      ],
      hint: "Sum of coefficients of $P(x)$ is $P(1)$.",
    },
    {
      type: "quiz",
      id: "pc5-1-q2",
      variant: "practice",
      question:
        "Evaluate $\\binom{9}{0} + \\binom{9}{2} + \\binom{9}{4} + \\binom{9}{6} + \\binom{9}{8}$.",
      options: [
        { text: "$256$", correct: true, feedback: "Even-position entries make up half the row: $2^{9-1} = 256$." },
        { text: "$512$", feedback: "That is the whole row, $2^9$. You only want half of it." },
        { text: "$255$", feedback: "Nothing is subtracted here. The empty subset is $\\binom{9}{0}$, and it is included." },
        { text: "$128$", feedback: "That is $2^7$. The even-position sum is $2^{n-1}$ with $n = 9$." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-1-q3",
      variant: "practice",
      question:
        "What is the sum of the coefficients of $(1 + x - 3x^2)^{2163}$?",
      options: [
        { text: "$-1$", correct: true, feedback: "$P(1) = (1 + 1 - 3)^{2163} = (-1)^{2163} = -1$, since 2163 is odd." },
        { text: "$1$", feedback: "$(-1)$ raised to an odd power stays $-1$." },
        { text: "$2^{2163}$", feedback: "That would need the bracket to equal 2 at $x = 1$. It equals $1 + 1 - 3 = -1$." },
        { text: "$0$", feedback: "A power of $-1$ is never 0." },
      ],
      hint: "You do not need to expand anything. Substitute $x = 1$.",
    },
    {
      type: "quiz",
      id: "pc5-1-q4",
      variant: "concept",
      question:
        "Why is $\\binom{8}{0} - \\binom{8}{1} + \\binom{8}{2} - \\cdots + \\binom{8}{8}$ equal to 0?",
      options: [
        { text: "It is $(1 + x)^8$ evaluated at $x = -1$, which is $0^8 = 0$.", correct: true, feedback: "Right. Equivalently, row 8 has as many even-sized subsets as odd-sized ones." },
        { text: "Because row 8 is symmetric, so each term cancels its mirror image.", feedback: "Symmetry pairs $\\binom{8}{r}$ with $\\binom{8}{8-r}$, and $r$ and $8 - r$ have the same parity, so these terms have the same sign and do not cancel. Symmetry alone cannot explain it." },
        { text: "Because $2^8$ is even.", feedback: "Being even does not make a signed sum vanish. The reason is the substitution $x = -1$." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-1-q5",
      variant: "practice",
      question:
        "In the expansion of $(1 + 2x)^5$, what is the sum of the coefficients of the **odd** powers of $x$?",
      options: [
        { text: "$122$", correct: true, feedback: "$\\dfrac{P(1) - P(-1)}{2} = \\dfrac{243 - (-1)}{2} = 122$. Check: $10 + 80 + 32$." },
        { text: "$121$", feedback: "That is the even-power sum, $\\dfrac{P(1) + P(-1)}{2}$." },
        { text: "$16$", feedback: "That is $2^{5-1}$, which only works for $(1 + x)^5$. The 2 in front of $x$ changes the coefficients." },
        { text: "$243$", feedback: "That is the sum of all the coefficients." },
      ],
      hint: "Find $P(1)$ and $P(-1)$, then subtract and halve.",
    },
    {
      type: "quiz",
      id: "pc5-1-q6",
      variant: "practice",
      question:
        "A test has 10 questions. A student must attempt an **even** number of them, and at least 2. In how many ways can she choose which questions to attempt?",
      options: [
        { text: "$511$", correct: true, feedback: "Even-sized subsets of 10 questions: $2^9 = 512$. Remove the empty choice, $\\binom{10}{0} = 1$, to get 511." },
        { text: "$512$", feedback: "That counts every even-sized subset, including attempting none. The rule says at least 2." },
        { text: "$1023$", feedback: "That is every non-empty subset. Only the even-sized ones are allowed." },
        { text: "$256$", feedback: "That is $2^8$. Half of row 10 is $2^{10-1} = 2^9$." },
      ],
      hint: "Even-sized subsets are half of all $2^{10}$ subsets. Then remove the empty one.",
    },
    {
      type: "quiz",
      id: "pc5-1-q7",
      variant: "practice",
      question:
        "If $(1 + x + x^2)^4 = a_0 + a_1x + \\cdots + a_8x^8$, what is $a_0 + a_2 + a_4 + a_6 + a_8$?",
      options: [
        { text: "$41$", correct: true, feedback: "$P(1) = 3^4 = 81$ and $P(-1) = 1^4 = 1$, so the even-power sum is $\\frac{81 + 1}{2} = 41$." },
        { text: "$40$", feedback: "That is $\\frac{81 - 1}{2}$, the odd-power sum." },
        { text: "$81$", feedback: "That is $P(1)$, the sum of all the coefficients." },
        { text: "$8$", feedback: "That is $2^{4-1}$, which only works for $(1 + x)^4$. These coefficients are not a Pascal row." },
      ],
      hint: "Evaluate $P(1)$ and $P(-1)$, then add and halve.",
    },
  ]),
};

const lesson02: LessonSeed = {
  slug: "weighted-sums-and-vandermonde",
  title: "5.2 · Weighted Sums and Vandermonde",
  position: 2,
  blocks: blocks([
    {
      type: "text",
      content:
        "Plain row sums were easy. Now weight each entry by its position:\n\n$\\displaystyle 1\\cdot\\binom{n}{1} + 2\\cdot\\binom{n}{2} + 3\\cdot\\binom{n}{3} + \\cdots + n\\cdot\\binom{n}{n} = \\;?$\n\nSubstituting a number for $x$ will not produce those multipliers $1, 2, 3, \\ldots$ directly. Instead, change what the term $r\\binom{n}{r}$ **counts**.",
    },
    {
      type: "text",
      content:
        "From $n$ people, form a committee of $r$ and then pick one member of it as the chair. There are two ways to count this.\n\n**Committee first.** Choose the $r$ members ($\\binom{n}{r}$ ways), then choose the chair from them ($r$ ways). Total: $r\\binom{n}{r}$.\n\n**Chair first.** Choose the chair from everyone ($n$ ways), then the other $r - 1$ members from the remaining $n - 1$ people ($\\binom{n-1}{r-1}$ ways). Total: $n\\binom{n-1}{r-1}$.\n\nBoth count the same committees-with-chairs, so the totals must be equal.",
    },
    {
      type: "math",
      latex: "r\\binom{n}{r} = n\\binom{n-1}{r-1} \\qquad (1 \\le r \\le n)",
    },
    {
      type: "text",
      content:
        "The algebra agrees. Cancel the $r$ against $r! = r\\,(r-1)!$:\n\n$\\displaystyle r\\cdot\\frac{n!}{r!\\,(n-r)!} = \\frac{n!}{(r-1)!\\,(n-r)!} = n\\cdot\\frac{(n-1)!}{(r-1)!\\,\\bigl((n-1)-(r-1)\\bigr)!} = n\\binom{n-1}{r-1}.$",
    },
    {
      type: "text",
      content:
        "Now the weighted sum falls out. Replace every term using the identity, pull out the common $n$, and what remains is an entire row of Pascal's triangle, row $n - 1$:",
    },
    {
      type: "math",
      latex:
        "\\sum_{r=1}^{n} r\\binom{n}{r} = n\\sum_{r=1}^{n}\\binom{n-1}{r-1} = n\\left[\\binom{n-1}{0} + \\binom{n-1}{1} + \\cdots + \\binom{n-1}{n-1}\\right] = n\\cdot 2^{n-1}",
    },
    {
      type: "callout",
      variant: "tip",
      title: "One-line counting proof",
      content:
        "$\\sum r\\binom{n}{r}$ counts every (committee, chair) pair, over committees of every size. Count it chair first: $n$ choices of chair, then any subset of the other $n - 1$ people may join, which is $2^{n-1}$ ways. Total $n\\cdot 2^{n-1}$.",
    },
    {
      type: "table",
      headers: ["$r$", "$\\binom{4}{r}$", "$r\\binom{4}{r}$", "$4\\binom{3}{r-1}$"],
      rows: [
        ["1", "4", "4", "4 × 1 = 4"],
        ["2", "6", "12", "4 × 3 = 12"],
        ["3", "4", "12", "4 × 3 = 12"],
        ["4", "1", "4", "4 × 1 = 4"],
        ["Total", "", "32", "4 × 8 = 32"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 0 (word problem).** A class of 10 students must send a project team of any size (at least one student), and the team needs a leader chosen from its members. How many different (team, leader) choices are there?\n\n**Step 1.** Split by team size $r$: choose the team ($\\binom{10}{r}$ ways), then its leader ($r$ ways). Total $\\sum_{r=1}^{10} r\\binom{10}{r}$.\n*Why this step:* the sum is the honest, case-by-case count. It is correct but slow to add up.\n**Step 2.** Count leader first instead: 10 choices of leader, then each of the other 9 students is in or out, $2^9$ ways.\n*Why this step:* choosing the leader first removes the size cases entirely, because the rest of the team is just any subset of 9 people.\n**Step 3.** $10 \\times 2^9 = 10 \\times 512$.\n**Answer:** $5120$, which is $n2^{n-1}$ with $n = 10$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Evaluate $\\sum_{r=0}^{5}(r + 1)\\binom{5}{r}$.\n\n**Step 1.** Split the weight: $(r + 1)\\binom{5}{r} = r\\binom{5}{r} + \\binom{5}{r}$.\n**Step 2.** $\\sum r\\binom{5}{r} = 5\\cdot 2^4 = 80$ and $\\sum\\binom{5}{r} = 2^5 = 32$.\n**Answer:** $80 + 32 = 112$.\n**Check:** row 5 is $1, 5, 10, 10, 5, 1$, and $1\\cdot1 + 2\\cdot5 + 3\\cdot10 + 4\\cdot10 + 5\\cdot5 + 6\\cdot1 = 1 + 10 + 30 + 40 + 25 + 6 = 112$.",
    },
    {
      type: "text",
      content:
        "**Dividing instead of multiplying.** The committee-with-chair identity, read backwards, handles weights like $\\frac{1}{r+1}$. Put $n + 1$ in place of $n$ and $r + 1$ in place of $r$:\n\n$\\displaystyle (r + 1)\\binom{n+1}{r+1} = (n + 1)\\binom{n}{r} \\quad\\Longrightarrow\\quad \\frac{1}{r+1}\\binom{n}{r} = \\frac{1}{n+1}\\binom{n+1}{r+1}.$\n\nIn words: a committee of $r + 1$ from $n + 1$ people with a chair can be counted chair first, and the division by $r + 1$ just undoes the choice of chair.",
    },
    {
      type: "text",
      content:
        "**Worked example 1b.** Evaluate $\\sum_{r=0}^{n}\\dfrac{1}{r+1}\\binom{n}{r}$.\n\n**Step 1.** Replace each term: $\\dfrac{1}{r+1}\\binom{n}{r} = \\dfrac{1}{n+1}\\binom{n+1}{r+1}$.\n**Step 2.** As $r$ runs from $0$ to $n$, the bottom $r + 1$ runs from $1$ to $n + 1$. That is all of row $n + 1$ except $\\binom{n+1}{0} = 1$.\n**Step 3.** So the sum is $\\dfrac{1}{n+1}\\left(2^{n+1} - 1\\right)$.\n**Answer:** $\\dfrac{2^{n+1} - 1}{n + 1}$.\n**Check with $n = 3$:** $1 + \\frac{3}{2} + \\frac{3}{3} + \\frac{1}{4} = \\frac{15}{4}$, and $\\frac{2^4 - 1}{4} = \\frac{15}{4}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1c (reverse and add).** Evaluate $S = \\binom{n}{0} + 3\\binom{n}{1} + 5\\binom{n}{2} + \\cdots + (2n + 1)\\binom{n}{n}$.\n\nThe weights $1, 3, 5, \\ldots$ go up in equal steps. That is the signal for Gauss's trick: write the sum forwards and backwards.\n\n**Step 1.** $S = \\sum_{r=0}^{n}(2r + 1)\\binom{n}{r}$.\n**Step 2.** Reverse the order, replacing $r$ by $n - r$ and using $\\binom{n}{n-r} = \\binom{n}{r}$: $S = \\sum_{r=0}^{n}(2n - 2r + 1)\\binom{n}{r}$.\n**Step 3.** Add the two lines. The weights in each position add to $(2r + 1) + (2n - 2r + 1) = 2n + 2$, the same for every $r$: $2S = (2n + 2)\\sum\\binom{n}{r} = (2n + 2)2^n$.\n**Answer:** $S = (n + 1)2^n$.\n**Check with $n = 2$:** $1\\cdot1 + 3\\cdot2 + 5\\cdot1 = 12 = 3 \\cdot 2^2$.",
    },
    {
      type: "text",
      content:
        "**Two more standard sums** follow from the same identity used twice.\n\n**Squared weights.** Write $r^2 = r(r - 1) + r$. Applying the chair identity twice gives $r(r - 1)\\binom{n}{r} = n(n - 1)\\binom{n-2}{r-2}$ (a committee with a chair and a secretary). So\n$\\displaystyle \\sum r^2\\binom{n}{r} = n(n - 1)2^{n-2} + n2^{n-1} = n(n + 1)2^{n-2}.$\n\n**Alternating weights.** $\\sum(-1)^r r\\binom{n}{r} = n\\sum(-1)^r\\binom{n-1}{r-1} = -n\\left[\\binom{n-1}{0} - \\binom{n-1}{1} + \\cdots\\right] = 0$ for $n \\ge 2$, because the bracket is an alternating row sum.\n\n**Check with $n = 3$:** $1\\cdot3 + 4\\cdot3 + 9\\cdot1 = 24 = 3 \\cdot 4 \\cdot 2$, and $-3 + 6 - 3 = 0$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "The calculus route (for JEE)",
      content:
        "Once you know calculus, every sum in this lesson has a second proof. Differentiate $(1 + x)^n = \\sum\\binom{n}{r}x^r$ to get $n(1 + x)^{n-1} = \\sum r\\binom{n}{r}x^{r-1}$, then put $x = 1$ for $\\sum r\\binom{n}{r}$ or $x = -1$ for the alternating version. Integrate from 0 to 1 instead and you get $\\sum\\frac{1}{r+1}\\binom{n}{r} = \\frac{2^{n+1}-1}{n+1}$. Weights that multiply by $r$ mean differentiate; weights that divide by $r + 1$ mean integrate.",
    },
    {
      type: "text",
      content:
        "**Squares of a row**\n\nNext: $\\binom{n}{0}^2 + \\binom{n}{1}^2 + \\cdots + \\binom{n}{n}^2$. Row 3 gives $1 + 9 + 9 + 1 = 20$. Row 4 gives $1 + 16 + 36 + 16 + 1 = 70$. Those are $\\binom{6}{3}$ and $\\binom{8}{4}$. Why?\n\nPut $2n$ people in a room: team A has $n$, team B has $n$. Choose $n$ of them. Directly, that is $\\binom{2n}{n}$. Now split by how many come from team A. If $k$ come from A, the other $n - k$ come from B:",
    },
    {
      type: "math",
      latex:
        "\\binom{2n}{n} = \\sum_{k=0}^{n}\\binom{n}{k}\\binom{n}{n-k} = \\sum_{k=0}^{n}\\binom{n}{k}^2",
    },
    {
      type: "text",
      content:
        "The last step uses symmetry, $\\binom{n}{n-k} = \\binom{n}{k}$. The tree below shows the smallest case: 4 people in two teams of 2, choose 2. Each branch is one value of $k$, and the branch totals add up to $\\binom{4}{2} = 6$.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-counting-tree",
        mode: "sum",
        branches: [
          {
            label: "0 from A",
            stages: [{ label: "From B", options: ["B1 B2"] }],
          },
          {
            label: "1 from A",
            stages: [
              { label: "From A", options: ["A1", "A2"] },
              { label: "From B", options: ["B1", "B2"] },
            ],
          },
          {
            label: "2 from A",
            stages: [{ label: "From A", options: ["A1 A2"] }],
          },
        ],
        caption:
          "Split the choices by how many come from team A: 1 + 4 + 1 = 6 = C(4, 2), which is 1² + 2² + 1².",
      },
    },
    {
      type: "callout",
      variant: "definition",
      title: "Vandermonde's identity",
      content:
        "Teams need not be equal, and you need not choose exactly $n$. With $m$ people in team A, $n$ in team B, and $r$ to be chosen:\n$\\displaystyle \\sum_{k}\\binom{m}{k}\\binom{n}{r-k} = \\binom{m+n}{r}.$\nThe sum runs over every $k$ that makes sense ($0 \\le k \\le m$ and $0 \\le r - k \\le n$). The sum of squares is the special case $m = n = r$.",
    },
    {
      type: "text",
      content:
        "The binomial theorem gives the same identity. $(1 + x)^m(1 + x)^n = (1 + x)^{m+n}$. On the right, the coefficient of $x^r$ is $\\binom{m+n}{r}$. On the left, an $x^r$ is made by taking $x^k$ from the first bracket and $x^{r-k}$ from the second, which contributes $\\binom{m}{k}\\binom{n}{r-k}$. Adding over $k$ gives Vandermonde.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** A club has 5 men and 4 women. Count 3-person committees by splitting into cases, and check against the direct count.\n\n**Step 1.** 0 men: $\\binom{5}{0}\\binom{4}{3} = 4$.\n**Step 2.** 1 man: $\\binom{5}{1}\\binom{4}{2} = 5 \\times 6 = 30$.\n**Step 3.** 2 men: $\\binom{5}{2}\\binom{4}{1} = 10 \\times 4 = 40$.\n**Step 4.** 3 men: $\\binom{5}{3}\\binom{4}{0} = 10$.\n**Total:** $4 + 30 + 40 + 10 = 84$, and directly $\\binom{9}{3} = 84$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Evaluate $\\sum_{r=0}^{n-1}\\binom{n}{r}\\binom{n}{r+1}$.\n\n**Step 1.** Rewrite the second factor with symmetry: $\\binom{n}{r+1} = \\binom{n}{n-r-1}$.\n**Step 2.** Now the bottom numbers add to $r + (n - r - 1) = n - 1$ in every term. That is Vandermonde with two teams of $n$ and committee size $n - 1$: $\\sum_k \\binom{n}{k}\\binom{n}{n-1-k} = \\binom{2n}{n-1}$.\n**Answer:** $\\binom{2n}{n-1}$, which also equals $\\binom{2n}{n+1}$.\n**Check with $n = 2$:** $\\binom{2}{0}\\binom{2}{1} + \\binom{2}{1}\\binom{2}{2} = 2 + 2 = 4 = \\binom{4}{1}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (JEE style).** Evaluate $\\sum_{r=1}^{n} r\\binom{n}{r}^2$.\n\n**Step 1.** Use the chair identity on **one** of the two factors: $r\\binom{n}{r}^2 = n\\binom{n-1}{r-1}\\binom{n}{r}$.\n*Why this step:* the weight $r$ is the obstacle to Vandermonde. The chair identity absorbs it and leaves a plain product of two binomial coefficients.\n**Step 2.** Flip the other factor: $\\binom{n}{r} = \\binom{n}{n-r}$. Now the bottoms are $r - 1$ and $n - r$, which add to $n - 1$ for every $r$.\n*Why this step:* Vandermonde needs the bottoms to add to a constant (see the warning just after this example).\n**Step 3.** Teams of $n - 1$ and $n$, committee of $n - 1$: $\\sum_{r}\\binom{n-1}{r-1}\\binom{n}{n-r} = \\binom{2n-1}{n-1}$.\n**Answer:** $n\\binom{2n-1}{n-1}$.\n**Check with $n = 3$:** $1 \\cdot 9 + 2 \\cdot 9 + 3 \\cdot 1 = 30$, and $3\\binom{5}{2} = 30$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Make the bottoms add to a constant",
      content:
        "Vandermonde needs the two lower indices in each term to add to the **same** number. $\\binom{n}{r}\\binom{n}{r+1}$ does not look like that until you flip one factor with symmetry. When a product sum resists, try flipping one factor.",
    },
    {
      type: "quiz",
      id: "pc5-2-q1",
      variant: "practice",
      question: "Evaluate $\\sum_{r=1}^{6} r\\binom{6}{r}$.",
      options: [
        { text: "$192$", correct: true, feedback: "$n\\cdot 2^{n-1} = 6 \\times 32 = 192$." },
        { text: "$64$", feedback: "That is $\\sum\\binom{6}{r}$ without the weights." },
        { text: "$384$", feedback: "That is $6 \\times 2^6$. After pulling out $n$, what remains is row $n - 1$, which sums to $2^5$." },
        { text: "$96$", feedback: "That is $3 \\times 2^5$. The factor in front is $n = 6$, not $n/2$." },
      ],
      hint: "Use $r\\binom{n}{r} = n\\binom{n-1}{r-1}$.",
    },
    {
      type: "quiz",
      id: "pc5-2-q2",
      variant: "concept",
      question: "Which story shows that $r\\binom{n}{r} = n\\binom{n-1}{r-1}$?",
      options: [
        { text: "Pick an $r$-person committee with a chair: committee then chair, or chair then the other $r - 1$.", correct: true, feedback: "Two orders of choosing, one set of outcomes, so the counts agree." },
        { text: "Pick $r$ people, then arrange them in a line.", feedback: "That counts $r!\\binom{n}{r} = {}^nP_r$, a different number." },
        { text: "Choose $r$ people to include or $n - r$ to leave out.", feedback: "That story proves the symmetry $\\binom{n}{r} = \\binom{n}{n-r}$, not this identity." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-2-q3",
      variant: "practice",
      question:
        "Evaluate $\\binom{5}{0}^2 + \\binom{5}{1}^2 + \\binom{5}{2}^2 + \\binom{5}{3}^2 + \\binom{5}{4}^2 + \\binom{5}{5}^2$.",
      options: [
        { text: "$252$", correct: true, feedback: "$\\binom{10}{5} = 252$. Check: $1 + 25 + 100 + 100 + 25 + 1 = 252$." },
        { text: "$1024$", feedback: "That is $(2^5)^2$. Squaring the row sum is not the same as summing the squares." },
        { text: "$126$", feedback: "That is $\\binom{9}{4}$. With two teams of 5 you choose 5 from 10." },
        { text: "$32$", feedback: "That is the plain row sum $2^5$." },
      ],
      hint: "Two teams of 5; choose 5 people in total.",
    },
    {
      type: "quiz",
      id: "pc5-2-q4",
      variant: "practice",
      question:
        "Evaluate $\\binom{6}{0}\\binom{4}{4} + \\binom{6}{1}\\binom{4}{3} + \\binom{6}{2}\\binom{4}{2} + \\binom{6}{3}\\binom{4}{1} + \\binom{6}{4}\\binom{4}{0}$.",
      options: [
        { text: "$210$", correct: true, feedback: "The bottoms always add to 4, so this is Vandermonde: $\\binom{10}{4} = 210$. (Termwise: $1 + 24 + 90 + 80 + 15$.)" },
        { text: "$1024$", feedback: "That is $2^{10}$, every subset of 10 people. Here the committee size is fixed at 4." },
        { text: "$120$", feedback: "That is $\\binom{10}{3}$. The bottom numbers in each term add to 4, not 3." },
        { text: "$5040$", feedback: "That is ${}^{10}P_4$. Committees are unordered." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-2-q5",
      variant: "practice",
      question: "For $n \\ge 1$, $\\sum_{r=0}^{n-1}\\binom{n}{r}\\binom{n}{r+1}$ equals",
      options: [
        { text: "$\\binom{2n}{n+1}$", correct: true, feedback: "Flip $\\binom{n}{r+1} = \\binom{n}{n-r-1}$. The bottoms then add to $n - 1$, giving $\\binom{2n}{n-1} = \\binom{2n}{n+1}$." },
        { text: "$\\binom{2n}{n}$", feedback: "That is the sum of squares, where the bottoms add to $n$. Here they add to $n - 1$." },
        { text: "$2^{2n-1}$", feedback: "Try $n = 2$: the sum is $2 + 2 = 4$, but $2^3 = 8$." },
        { text: "$n\\cdot 2^{n-1}$", feedback: "That is the weighted sum $\\sum r\\binom{n}{r}$, a different identity." },
      ],
      hint: "Use symmetry on the second factor so the lower indices add to a constant.",
    },
    {
      type: "quiz",
      id: "pc5-2-q6",
      variant: "practice",
      question:
        "Evaluate $\\binom{5}{0} + \\dfrac{1}{2}\\binom{5}{1} + \\dfrac{1}{3}\\binom{5}{2} + \\dfrac{1}{4}\\binom{5}{3} + \\dfrac{1}{5}\\binom{5}{4} + \\dfrac{1}{6}\\binom{5}{5}$.",
      options: [
        { text: "$\\dfrac{21}{2}$", correct: true, feedback: "Each term is $\\frac{1}{6}\\binom{6}{r+1}$, so the sum is $\\frac{1}{6}(2^6 - 1) = \\frac{63}{6} = \\frac{21}{2}$." },
        { text: "$\\dfrac{32}{3}$", feedback: "That is $\\frac{2^6}{6}$. The bottoms run from 1 to 6, so $\\binom{6}{0} = 1$ is not in the sum. Subtract it." },
        { text: "$\\dfrac{31}{5}$", feedback: "That uses row 5 and divides by 5. The identity moves you up to row $n + 1 = 6$ and divides by $n + 1 = 6$." },
        { text: "$32$", feedback: "That is the plain row sum $2^5$, ignoring the fractions in front." },
      ],
      hint: "$\\frac{1}{r+1}\\binom{n}{r} = \\frac{1}{n+1}\\binom{n+1}{r+1}$.",
    },
    {
      type: "quiz",
      id: "pc5-2-q7",
      variant: "practice",
      question:
        "Evaluate $\\binom{4}{0} + 3\\binom{4}{1} + 5\\binom{4}{2} + 7\\binom{4}{3} + 9\\binom{4}{4}$.",
      options: [
        { text: "$80$", correct: true, feedback: "Reverse and add: each position gives weight $2n + 2 = 10$, so $2S = 10 \\cdot 2^4$ and $S = 80$. Check: $1 + 12 + 30 + 28 + 9 = 80$." },
        { text: "$160$", feedback: "That is $2S$. Adding the sum to its reverse doubles it, so halve at the end." },
        { text: "$64$", feedback: "That is $n \\cdot 2^n = 4 \\cdot 16$. The formula is $(n + 1)2^n$." },
        { text: "$16$", feedback: "That is the unweighted row sum $2^4$." },
      ],
      hint: "Write the sum forwards and backwards; the weights in each position add to the same number.",
    },
    {
      type: "quiz",
      id: "pc5-2-q8",
      variant: "practice",
      question:
        "A group of 7 friends forms a trekking party of any size (at least one person) and picks a guide from within the party. How many (party, guide) choices are there?",
      options: [
        { text: "$448$", correct: true, feedback: "Guide first: 7 choices, then any subset of the other 6 joins, $2^6 = 64$ ways. $7 \\times 64 = 448$." },
        { text: "$896$", feedback: "That is $7 \\times 2^7$. Once the guide is fixed, only the other 6 people are in-or-out." },
        { text: "$128$", feedback: "That is $2^7$, the number of parties without a guide (including the empty one)." },
        { text: "$127$", feedback: "That counts non-empty parties but forgets to choose the guide." },
      ],
      hint: "Pick the guide first.",
    },
    {
      type: "quiz",
      id: "pc5-2-q9",
      variant: "practice",
      question: "Evaluate $\\sum_{r=1}^{4} r\\binom{4}{r}^2$.",
      options: [
        { text: "$140$", correct: true, feedback: "$n\\binom{2n-1}{n-1} = 4\\binom{7}{3} = 4 \\times 35 = 140$. Termwise: $16 + 72 + 48 + 4 = 140$." },
        { text: "$280$", feedback: "That is $4\\binom{8}{4}$. After the chair identity the bottoms add to $n - 1 = 3$, and the teams have $3$ and $4$ people." },
        { text: "$70$", feedback: "That is $\\binom{8}{4}$, the unweighted sum of squares." },
        { text: "$32$", feedback: "That is $4 \\cdot 2^3 = \\sum r\\binom{4}{r}$, which ignores the square." },
      ],
      hint: "Apply $r\\binom{n}{r} = n\\binom{n-1}{r-1}$ to one factor, then flip the other.",
    },
  ]),
};

const lesson03: LessonSeed = {
  slug: "divisibility-and-remainders",
  title: "5.3 · Divisibility and Remainders",
  position: 3,
  blocks: blocks([
    {
      type: "text",
      content:
        "What is the remainder when $2^{100}$ is divided by 7? The number $2^{100}$ has 31 digits, so computing it by hand is not an option. But you do not need to. Only the **remainder** matters, and the binomial theorem is very good at separating the part divisible by 7 from the part left over.\n\nFirst, look at the pattern. Here are the first few powers of 2 and their remainders on division by 7:",
    },
    {
      type: "table",
      headers: ["$k$", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      rows: [
        ["$2^k$", "2", "4", "8", "16", "32", "64", "128", "256", "512"],
        ["remainder mod 7", "2", "4", "**1**", "2", "4", "**1**", "2", "4", "**1**"],
      ],
    },
    {
      type: "text",
      content:
        "The remainders cycle $2, 4, 1$ and every third power leaves remainder 1. The reason is $2^3 = 8 = 7 + 1$. Now see why a power of $(7 + 1)$ always leaves 1. Expand $(7 + 1)^n$ in the triangle below: every term except the last carries at least one factor of 7.",
    },
    {
      type: "interactive",
      config: {
        component: "pnc-pascal-triangle",
        mode: "expansion",
        rows: 6,
        expansion: { a: "7", b: "1" },
        initialCell: { n: 4, r: 0 },
        caption:
          "Pick a row n. Every term nCr · 7^(n−r) · 1^r with r < n has a factor of 7; only the last term, 1ⁿ = 1, does not. So (7 + 1)ⁿ is a multiple of 7, plus 1.",
      },
    },
    {
      type: "text",
      content:
        "The trick is to write the base as **(a multiple of the divisor) + (something small)**, usually $\\pm 1$. Then expand:\n\n$\\displaystyle (m + 1)^N = 1 + \\binom{N}{1}m + \\binom{N}{2}m^2 + \\cdots + m^N.$\n\nEvery term after the first has a factor of $m$. So $(m + 1)^N$ is a multiple of $m$, plus 1. Every term after the second has a factor of $m^2$, which gives an even finer statement.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The two workhorse facts",
      content:
        "For whole numbers $m$ and $N \\ge 1$:\n$(m + 1)^N = (\\text{multiple of } m) + 1$ and $(m - 1)^N = (\\text{multiple of } m) + (-1)^N$.\nOne level deeper: $(m + 1)^N = (\\text{multiple of } m^2) + Nm + 1$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Find the remainder when $2^{100}$ is divided by 7.\n\n**Step 1.** Look for a power of 2 close to a multiple of 7. $2^3 = 8 = 7 + 1$.\n**Step 2.** $100 = 3 \\times 33 + 1$, so $2^{100} = 2 \\cdot (2^3)^{33} = 2(7 + 1)^{33}$.\n**Step 3.** $(7 + 1)^{33} = 7k + 1$ for some whole number $k$.\n**Step 4.** $2^{100} = 2(7k + 1) = 14k + 2$.\n**Answer:** remainder $2$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1b (word problem).** Today is Monday. What day of the week will it be $3^{100}$ days from today?\n\n**Step 1.** Whole weeks bring you back to Monday, so only the remainder of $3^{100}$ on division by 7 matters.\n*Why this step:* it turns a calendar question into a remainder question.\n**Step 2.** Find a power of 3 next to a multiple of 7: $3^3 = 27 = 28 - 1$, and $28 = 4 \\times 7$.\n*Why this step:* a base of the form (multiple of 7) $\\pm 1$ is what makes the expansion collapse.\n**Step 3.** $100 = 3 \\times 33 + 1$, so $3^{100} = 3 \\cdot (28 - 1)^{33} = 3(28k - 1) = 84k - 3$.\n*Why this step:* $(28 - 1)^{33}$ is a multiple of 28 plus $(-1)^{33} = -1$.\n**Step 4.** $84k - 3 = 7(12k - 1) + 4$, so the remainder is $4$.\n*Why this step:* $-3$ is not a remainder; add 7 to land in $0, \\ldots, 6$.\n**Answer:** 4 days after Monday, which is **Friday**.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Show that $9^n - 8n - 1$ is divisible by 64 for every $n \\ge 1$.\n\n**Step 1.** Write $9 = 8 + 1$ and expand:\n$\\displaystyle 9^n = (1 + 8)^n = 1 + 8n + \\binom{n}{2}8^2 + \\binom{n}{3}8^3 + \\cdots + 8^n.$\n**Step 2.** Move the first two terms across:\n$\\displaystyle 9^n - 8n - 1 = 8^2\\left[\\binom{n}{2} + \\binom{n}{3}8 + \\cdots + 8^{n-2}\\right].$\n**Step 3.** The bracket is a whole number and $8^2 = 64$. Done.\n**Check:** $n = 2$ gives $81 - 17 = 64$; $n = 3$ gives $729 - 25 = 704 = 64 \\times 11$.\n\nLesson 4.3 proved the NCERT form of this fact, $9^{n+1} - 8n - 9$. It is the same statement with $n + 1$ written in place of $n$, since $8(n + 1) + 1 = 8n + 9$.",
    },
    {
      type: "callout",
      variant: "tip",
      title: "Why exactly 8n + 1 is subtracted",
      content:
        "The first two terms of $(1 + 8)^n$ are $1 + 8n$. They are the only ones **not** divisible by $8^2$. Subtracting them leaves only terms with $8^2$ in them. When you see \"$a^n - bn - 1$ is divisible by $b^2$\" with $a = b + 1$, this is the whole argument.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Find the last two digits of $7^{100}$.\n\n\"Last two digits\" means the remainder on division by 100.\n\n**Step 1.** $7^2 = 49 = 50 - 1$, so $7^{100} = 49^{50} = (50 - 1)^{50} = (1 - 50)^{50}$.\n**Step 2.** Expand: $(1 - 50)^{50} = 1 - \\binom{50}{1}50 + \\binom{50}{2}50^2 - \\cdots$\n**Step 3.** The second term is $50 \\times 50 = 2500$, a multiple of 100. Every later term contains $50^2 = 2500$. So everything after the 1 is a multiple of 100.\n**Answer:** $7^{100}$ ends in $01$.\n**A second route:** $7^4 = 2401 = 2400 + 1$, so $7^{100} = (2400 + 1)^{25} = (\\text{multiple of } 2400) + 1$. Same answer.",
    },
    {
      type: "text",
      content:
        "**Worked example 4.** Find the remainder when $5^{99}$ is divided by 13.\n\n**Step 1.** $5^2 = 25 = 26 - 1$, and $26 = 2 \\times 13$.\n**Step 2.** $5^{99} = 5 \\cdot (5^2)^{49} = 5(26 - 1)^{49}$.\n**Step 3.** $(26 - 1)^{49} = 26k + (-1)^{49} = 26k - 1$.\n**Step 4.** $5^{99} = 130k - 5$.\n**Step 5.** A remainder must lie between 0 and 12, and $-5$ does not. Borrow one 13: $130k - 5 = 13(10k - 1) + 8$.\n**Answer:** remainder $8$.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "A negative leftover is not a remainder",
      content:
        "When the expansion ends in $-1$ or $-5$, you are not finished. The remainder on division by $d$ is always one of $0, 1, \\ldots, d - 1$. Add $d$ to a negative leftover (and take one $d$ from the multiple) until it lands in that range: $-5 \\to 8$ for $d = 13$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4b (JEE Main style).** Find the remainder when $7^{103}$ is divided by 25.\n\n**Step 1.** $7^2 = 49 = 50 - 1$, and $50 = 2 \\times 25$.\n*Why this step:* 25 itself is not near a power of 7, but its multiple 50 is. Any multiple of the divisor works as the base.\n**Step 2.** $103 = 2 \\times 51 + 1$, so $7^{103} = 7 \\cdot 49^{51} = 7(50 - 1)^{51}$.\n**Step 3.** $(50 - 1)^{51} = 50k + (-1)^{51} = 50k - 1$, so $7^{103} = 350k - 7$.\n*Why this step:* the exponent 51 is odd, so the lone term without a 50 is $-1$, not $+1$.\n**Step 4.** $350k = 25 \\times 14k$ is a multiple of 25. The leftover $-7$ becomes $-7 + 25 = 18$.\n**Answer:** remainder $18$.\n**Check:** $7^4 = 2401 = 96 \\times 25 + 1$, so powers of 7 repeat every 4 steps mod 25; $103 = 4 \\times 25 + 3$ and $7^3 = 343 = 13 \\times 25 + 18$.",
    },
    {
      type: "text",
      content:
        "**Comparing giant numbers**\n\n**Worked example 5.** Which is larger: $101^{50}$ or $100^{50} + 99^{50}$?\n\n**Step 1.** Compare $101^{50} - 99^{50}$ with $100^{50}$. Write $101 = 100 + 1$ and $99 = 100 - 1$.\n**Step 2.** In $(100 + 1)^{50} - (100 - 1)^{50}$, the terms where the $\\pm 1$ carries an even power cancel, and those where it carries an odd power double:\n$\\displaystyle 101^{50} - 99^{50} = 2\\left[\\binom{50}{1}100^{49} + \\binom{50}{3}100^{47} + \\cdots + \\binom{50}{49}100\\right].$\n**Step 3.** The first term alone is $2 \\times 50 \\times 100^{49} = 100 \\times 100^{49} = 100^{50}$. Every other term is positive.\n**Step 4.** So $101^{50} - 99^{50} > 100^{50}$.\n**Answer:** $101^{50}$ is larger.",
    },
    {
      type: "text",
      content:
        "**Cancel and double with surds**\n\nThe same \"subtract the mirror expansion\" idea evaluates surd expressions exactly. In $(a + b)^n$ and $(a - b)^n$ the terms with an even power of $b$ are identical, and the terms with an odd power of $b$ are opposite. So\n\n$(a + b)^n + (a - b)^n = 2 \\times$ (terms with even powers of $b$), and $(a + b)^n - (a - b)^n = 2 \\times$ (terms with odd powers of $b$).\n\n**Worked example 6.** Evaluate $(\\sqrt3 + \\sqrt2)^4 - (\\sqrt3 - \\sqrt2)^4$.\n\n**Step 1.** Take $a = \\sqrt3$, $b = \\sqrt2$, $n = 4$. Only the odd powers of $b$ survive, doubled:\n$\\displaystyle 2\\left[\\binom{4}{1}(\\sqrt3)^3\\sqrt2 + \\binom{4}{3}\\sqrt3(\\sqrt2)^3\\right].$\n**Step 2.** $(\\sqrt3)^3 = 3\\sqrt3$ and $(\\sqrt2)^3 = 2\\sqrt2$, so the bracket is $4 \\cdot 3\\sqrt6 + 4 \\cdot 2\\sqrt6 = 12\\sqrt6 + 8\\sqrt6 = 20\\sqrt6$.\n**Answer:** $40\\sqrt6$.\n\nWith a **plus** sign between the two powers, the odd powers of $b$ cancel instead. That is why $(2 + \\sqrt3)^n + (2 - \\sqrt3)^n$ is always a whole number: only even powers of $\\sqrt3$ survive, and those are whole numbers. Since $0 < 2 - \\sqrt3 < 1$, the power $(2 - \\sqrt3)^n$ is a small positive number, so $(2 + \\sqrt3)^n$ sits just below that whole number. This is how JEE problems about the integer and fractional parts of $(2 + \\sqrt3)^n$ are solved.",
    },
    {
      type: "text",
      content:
        "**Worked example 6b (JEE Advanced style).** Let $R = (5\\sqrt5 + 11)^{2n+1}$ and let $f = R - \\lfloor R \\rfloor$ be its fractional part. Show that $Rf = 4^{2n+1}$.\n\n**Step 1.** Bring in the partner $G = (5\\sqrt5 - 11)^{2n+1}$. Since $5\\sqrt5 = \\sqrt{125} \\approx 11.18$, we have $0 < 5\\sqrt5 - 11 < 1$, so $0 < G < 1$.\n*Why this step:* a number strictly between 0 and 1 is the natural candidate for a fractional part.\n**Step 2.** Expand $R - G$ with $a = 5\\sqrt5$, $b = 11$ and odd exponent $m = 2n + 1$. Only the terms with odd powers of $b$ survive (doubled): $2\\binom{m}{r}(5\\sqrt5)^{m-r}11^r$ with $r$ odd.\n*Why this step:* we want the surds to disappear. With $m$ odd and $r$ odd, $m - r$ is even, so $(5\\sqrt5)^{m-r} = 125^{(m-r)/2}$ is a whole number.\n**Step 3.** So $R - G = I$, a whole number. Then $R = I + G$ with $0 < G < 1$, which means $\\lfloor R \\rfloor = I$ and $f = G$.\n**Step 4.** $Rf = RG = \\bigl[(5\\sqrt5 + 11)(5\\sqrt5 - 11)\\bigr]^{2n+1} = (125 - 121)^{2n+1} = 4^{2n+1}$.\n**Check with $n = 0$:** $R \\approx 22.18034$, $f \\approx 0.18034$, and $22.18034 \\times 0.18034 \\approx 4.000$.",
    },
    {
      type: "table",
      headers: ["Problem", "Rewrite the base", "What survives"],
      rows: [
        ["$2^{100} \\bmod 7$", "$2^3 = 7 + 1$", "$2 \\cdot 1 = 2$"],
        ["$9^n - 8n - 1$ by 64", "$9 = 8 + 1$", "first two terms cancel; rest has $8^2$"],
        ["last two digits of $7^{100}$", "$7^2 = 50 - 1$", "$(-1)^{50} = 1$, so $01$"],
        ["$5^{99} \\bmod 13$", "$5^2 = 26 - 1$", "$5 \\cdot (-1) = -5 \\to 8$"],
      ],
    },
    {
      type: "quiz",
      id: "pc5-3-q1",
      variant: "practice",
      question: "What is the remainder when $2^{50}$ is divided by 7?",
      options: [
        { text: "$4$", correct: true, feedback: "$50 = 3 \\times 16 + 2$, so $2^{50} = 4 \\cdot 8^{16} = 4(7k + 1) = 28k + 4$." },
        { text: "$2$", feedback: "That is the remainder for $2^{100}$. Here the leftover power after taking out threes is $2^2 = 4$." },
        { text: "$1$", feedback: "That would need 50 to be a multiple of 3. It leaves 2 over." },
        { text: "$6$", feedback: "$8 = 7 + 1$, so each factor of 8 leaves remainder $+1$, not $-1$. The leftover is $2^2 = 4$." },
      ],
      hint: "$2^3 = 8 = 7 + 1$.",
    },
    {
      type: "quiz",
      id: "pc5-3-q2",
      variant: "concept",
      question:
        "Riya writes $5^{99} = 5(26 - 1)^{49} = 130k - 5$ and says \"the remainder on division by 13 is $-5$\". What is the remainder?",
      options: [
        { text: "$8$", correct: true, feedback: "$130k - 5 = 13(10k - 1) + 8$. Remainders must be between 0 and 12." },
        { text: "$-5$", feedback: "A remainder cannot be negative. Add 13 to it." },
        { text: "$5$", feedback: "Dropping the minus sign is not allowed; $-5$ and $5$ leave different remainders." },
        { text: "$1$", feedback: "The $(-1)^{49}$ is multiplied by the leftover 5, giving $-5$ before adjusting." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-3-q3",
      variant: "practice",
      question:
        "For every $n \\ge 1$, $7^n - 6n - 1$ is always divisible by which of these?",
      options: [
        { text: "$36$", correct: true, feedback: "$7^n = (1 + 6)^n = 1 + 6n + 6^2\\left[\\binom{n}{2} + \\binom{n}{3}6 + \\cdots\\right]$, so $7^n - 6n - 1$ is a multiple of $6^2 = 36$." },
        { text: "$49$", feedback: "At $n = 2$: $49 - 12 - 1 = 36$, which 49 does not divide. Write $7 = 1 + 6$, not a multiple of 7." },
        { text: "$72$", feedback: "At $n = 2$ the value is exactly 36, which 72 does not divide." },
        { text: "$42$", feedback: "At $n = 2$ the value is 36, which 42 does not divide." },
      ],
      hint: "Write $7 = 1 + 6$. Which two terms of $(1 + 6)^n$ are not multiples of $6^2$?",
    },
    {
      type: "quiz",
      id: "pc5-3-q4",
      variant: "practice",
      question: "What are the last two digits of $3^{40}$?",
      options: [
        { text: "$01$", correct: true, feedback: "$3^{40} = 9^{20} = (10 - 1)^{20} = 1 - 200 + \\binom{20}{2}100 - \\cdots$. Everything after the 1 is a multiple of 100." },
        { text: "$81$", feedback: "81 is $3^4$. Raising further changes the last two digits." },
        { text: "$21$", feedback: "Check the second term: $\\binom{20}{1} \\times 10 = 200$, which is a multiple of 100." },
        { text: "$99$", feedback: "That would need a $-1$ to survive, but $(-1)^{20} = +1$." },
      ],
      hint: "$3^2 = 9 = 10 - 1$.",
    },
    {
      type: "quiz",
      id: "pc5-3-q5",
      variant: "concept",
      question: "Why is $101^{50} > 100^{50} + 99^{50}$?",
      options: [
        { text: "In $101^{50} - 99^{50}$, the first surviving term is already $2 \\cdot 50 \\cdot 100^{49} = 100^{50}$, and the rest are positive.", correct: true, feedback: "The even-numbered terms cancel, the odd-numbered terms double, and the first of them alone matches $100^{50}$." },
        { text: "Because $101 > 100 > 99$, so the left side has the largest base.", feedback: "Largest base does not settle it: the right side has two terms. You need to compare sizes, which is what the expansion does." },
        { text: "Because $101 + 99 = 200 = 2 \\times 100$.", feedback: "Adding the bases says nothing about 50th powers." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-3-q6",
      variant: "practice",
      question: "Evaluate $(\\sqrt2 + 1)^4 + (\\sqrt2 - 1)^4$.",
      options: [
        { text: "$34$", correct: true, feedback: "With a plus sign the odd powers of 1 cancel: $2\\left[(\\sqrt2)^4 + \\binom{4}{2}(\\sqrt2)^2 + 1\\right] = 2[4 + 12 + 1] = 34$." },
        { text: "$17$", feedback: "That is the bracket before doubling. Each surviving term appears once in each expansion, so it counts twice." },
        { text: "$24\\sqrt2$", feedback: "That is the **difference** $(\\sqrt2 + 1)^4 - (\\sqrt2 - 1)^4$, where the odd powers survive. With a plus sign the even powers survive." },
        { text: "$0$", feedback: "Only the terms with odd powers of the second number cancel. The even-power terms add up." },
      ],
      hint: "Which terms are the same in both expansions, and which are opposite?",
    },
    {
      type: "quiz",
      id: "pc5-3-q7",
      variant: "practice",
      question: "Today is Wednesday. What day of the week will it be $2^{40}$ days from today?",
      options: [
        { text: "Friday", correct: true, feedback: "$40 = 3 \\times 13 + 1$, so $2^{40} = 2 \\cdot 8^{13} = 2(7k + 1) = 14k + 2$. Two days after Wednesday is Friday." },
        { text: "Thursday", feedback: "That uses remainder 1, as if 40 were a multiple of 3. One factor of 2 is left over." },
        { text: "Saturday", feedback: "That would need remainder 3. Each $8 = 7 + 1$ contributes 1, and the leftover $2^1$ contributes 2." },
        { text: "Wednesday", feedback: "That would need $2^{40}$ to be a multiple of 7, but a power of 2 never is." },
      ],
      hint: "Find the remainder of $2^{40}$ on division by 7 using $8 = 7 + 1$.",
    },
    {
      type: "quiz",
      id: "pc5-3-q8",
      variant: "practice",
      question: "What is the remainder when $7^{102}$ is divided by 25?",
      options: [
        { text: "$24$", correct: true, feedback: "$7^{102} = 49^{51} = (50 - 1)^{51} = 50k - 1$. Adjust: $-1 + 25 = 24$." },
        { text: "$1$", feedback: "The exponent 51 is odd, so $(-1)^{51} = -1$, not $+1$." },
        { text: "$-1$", feedback: "A remainder cannot be negative. Add 25." },
        { text: "$18$", feedback: "That is the remainder for $7^{103} = 7 \\cdot 49^{51}$. Here there is no extra factor of 7." },
      ],
      hint: "$7^2 = 49 = 50 - 1$.",
    },
  ]),
};

const lesson04: LessonSeed = {
  slug: "approximations",
  title: "5.4 · Binomial Approximations",
  position: 4,
  blocks: blocks([
    {
      type: "text",
      content:
        "**Exact first, then approximate.** For a whole-number power of a number near a round base, the binomial theorem gives the **exact** answer if you keep every term.\n\n**Worked example 0.** Evaluate $(99)^5$ exactly.\n\n**Step 1.** $99 = 100 - 1$, so $(99)^5 = (100 - 1)^5$.\n**Step 2.** $= 100^5 - 5\\cdot100^4 + 10\\cdot100^3 - 10\\cdot100^2 + 5\\cdot100 - 1$\n$= 10^{10} - 5\\cdot10^8 + 10\\cdot10^6 - 10\\cdot10^4 + 500 - 1$.\n**Step 3.** $10\\,000\\,000\\,000 - 500\\,000\\,000 + 10\\,000\\,000 - 100\\,000 + 500 - 1$.\n**Answer:** $9\\,509\\,900\\,499$.\n\nAll six terms were needed for the exact value. But look how fast they shrink: the first two already give $9\\,500\\,000\\,000$, within $0.1\\%$. The rest of this lesson is about when you can stop early and still be accurate enough.",
    },
    {
      type: "text",
      content:
        "A bank adds 2% interest each year. After 10 years, your money has been multiplied by $(1.02)^{10}$. How much is that, without a calculator?\n\nWrite it as $(1 + x)^{10}$ with $x = 0.02$ and look at the size of each term:\n\n$\\displaystyle (1 + x)^{10} = 1 + 10x + 45x^2 + 120x^3 + 210x^4 + \\cdots$\n\nWhen $x$ is small, $x^2$ is **much** smaller, and $x^3$ smaller still. The first two terms do almost all the work.",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "(1+x)^5", expr: "(1+x)^5", latex: "(1+x)^5", excluded: [] },
          { label: "1 + 5x", expr: "1+5*x", latex: "1 + 5x", excluded: [] },
          { label: "1 + 5x + 10x²", expr: "1+5*x+10*x^2", latex: "1 + 5x + 10x^2", excluded: [] },
        ],
        window: { xmin: -0.5, xmax: 0.5, ymin: 0, ymax: 8 },
      },
    },
    {
      type: "text",
      content:
        "Flip between the three curves. Near $x = 0$ all three sit almost on top of each other. The straight line $1 + 5x$ is the tangent line: it touches the curve at $(0, 1)$ and peels away as you move out. The parabola $1 + 5x + 10x^2$ hugs the curve for longer. Every extra term buys a wider window of accuracy.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The binomial approximation",
      content:
        "For small $x$ (and $nx$ small too):\n$\\displaystyle (1 + x)^n \\approx 1 + nx.$\nFor more accuracy, keep the next term: $(1 + x)^n \\approx 1 + nx + \\binom{n}{2}x^2$. The error is roughly the size of the first term you dropped.",
    },
    {
      type: "text",
      content:
        "Now a bigger power. Flip between $(1 + x)^{10}$, the line $1 + 10x$ and the parabola $1 + 10x + 45x^2$. At $x = 0.02$ the line says 1.2 and the curve says about 1.219. At $x = 0.1$ the line says 2 and the curve says 2.594. At $x = 0.3$ the curve has climbed to almost 14 while the line is at 4. Read the exact values from the table below.",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "(1+x)^10", expr: "(1+x)^10", latex: "(1+x)^{10}", excluded: [] },
          { label: "1 + 10x", expr: "1+10*x", latex: "1 + 10x", excluded: [] },
          { label: "1 + 10x + 45x²", expr: "1+10*x+45*x^2", latex: "1 + 10x + 45x^2", excluded: [] },
        ],
        window: { xmin: -0.3, xmax: 0.3, ymin: 0, ymax: 14 },
      },
    },
    {
      type: "table",
      headers: ["$x$", "$(1+x)^{10}$", "$1 + 10x$", "$1 + 10x + 45x^2$"],
      rows: [
        ["0.01", "1.10462", "1.1", "1.1045"],
        ["0.02", "1.21899", "1.2", "1.218"],
        ["0.05", "1.62889", "1.5", "1.6125"],
        ["0.1", "2.59374", "2", "2.45"],
        ["0.3", "13.78585", "4", "8.05"],
      ],
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Find $(1.02)^{10}$ correct to 3 decimal places.\n\n**Step 1.** Term by term with $x = 0.02$:\n$1$\n$10x = 0.2$\n$45x^2 = 45 \\times 0.0004 = 0.018$\n$120x^3 = 120 \\times 0.000008 = 0.00096$\n$210x^4 = 210 \\times 0.00000016 = 0.0000336$\n**Step 2.** The fifth term, $0.0000336$, is below $0.0005$, and later terms are smaller still, so nothing after it can change the third decimal place. We include it here only to show how small it is.\n**Step 3.** $1 + 0.2 + 0.018 + 0.00096 + 0.0000336 = 1.2189936$.\n**Answer:** $(1.02)^{10} \\approx 1.219$. (True value: $1.218994\\ldots$)",
    },
    {
      type: "callout",
      variant: "tip",
      title: "When to stop adding terms",
      content:
        "For $d$ decimal places, keep adding terms until the next one is clearly smaller than half a unit in the last place ($0.0005$ for 3 d.p.). Each term is $\\frac{(n-r)x}{r+1}$ times the one before, which is at most $nx$, so when $nx$ is small the terms shrink fast.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Find $(0.99)^5$ correct to 3 decimal places.\n\n**Step 1.** $(0.99)^5 = (1 - 0.01)^5 = 1 - 5(0.01) + 10(0.01)^2 - 10(0.01)^3 + \\cdots$\n**Step 2.** $= 1 - 0.05 + 0.001 - 0.00001 + \\cdots$\n**Step 3.** The fourth term is already far below 0.0005.\n**Step 4.** $1 - 0.05 + 0.001 - 0.00001 = 0.95099$.\n**Answer:** $(0.99)^5 \\approx 0.951$. With $x$ negative, the signs alternate.",
    },
    {
      type: "text",
      content:
        "**Worked example 2b (base not near 1).** Find $(2.01)^5$ correct to 3 decimal places.\n\n**Step 1.** Write $2.01 = 2 + 0.01$ and expand $(a + b)^5$ with $a = 2$, $b = 0.01$:\n$\\displaystyle 2^5 + \\binom{5}{1}2^4(0.01) + \\binom{5}{2}2^3(0.01)^2 + \\binom{5}{3}2^2(0.01)^3 + \\cdots$\n*Why this step:* the number is close to 2, not to 1. The big part $a$ can be anything easy to raise to a power, as long as $b$ is small next to it.\n**Step 2.** Term by term: $32$, $5 \\times 16 \\times 0.01 = 0.8$, $10 \\times 8 \\times 0.0001 = 0.008$, $10 \\times 4 \\times 0.000001 = 0.00004$.\n**Step 3.** The fourth term, $0.00004$, is well below $0.0005$, and the last two terms are smaller still.\n*Why this step:* this is the stopping rule from the tip above. Nothing left can move the third decimal place.\n**Step 4.** $32 + 0.8 + 0.008 + 0.00004 = 32.80804$.\n**Answer:** $(2.01)^5 \\approx 32.808$. (Exact value: $32.8080401\\ldots$)",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Misconception: \"(1 + x)ⁿ ≈ 1 + xⁿ\"",
      content:
        "It is tempting to \"apply the power to each part\". Try it on $(1.02)^{10}$: $1 + (0.02)^{10} = 1.0000000000000000102$, basically 1. The real answer is about 1.219. For small $x$, the term $x^n$ is the **smallest** term in the expansion, not the important one. The important term is $nx$, the second one. This is the same error as $(a + b)^n = a^n + b^n$ from 4.3.",
    },
    {
      type: "text",
      content:
        "**When the approximation fails**\n\n\"$x$ small\" is not enough. What matters is that $nx$ is small. Each term is roughly $\\frac{(n - r)x}{r + 1}$ times the one before, so the terms keep growing while that ratio is above 1.\n\nTake $(1.01)^{100}$. Here $x = 0.01$ is small, but $nx = 1$. The straight-line guess is $1 + 1 = 2$. The true value is about $2.705$. The second term $\\binom{100}{2}(0.01)^2 = 0.495$ is nowhere near negligible.\n\nOr take $(1.1)^{20}$: $1 + nx = 3$, but the true value is about $6.727$.",
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Prices rise 1% every month for a year. Estimate the total rise.\n\n**Step 1.** The price is multiplied by $(1.01)^{12}$.\n**Step 2.** $(1 + 0.01)^{12} \\approx 1 + 12(0.01) + 66(0.0001) = 1 + 0.12 + 0.0066 = 1.1266$.\n**Step 3.** The next term is $220(0.000001) = 0.00022$, so the estimate is good to about 3 decimal places.\n**Answer:** a rise of about $12.7\\%$, not $12\\%$. The extra $0.7\\%$ is interest on interest, the $\\binom{12}{2}x^2$ term.",
    },
    {
      type: "text",
      content:
        "**Worked example 3b (depreciation).** A car bought for ₹6,00,000 loses 5% of its value every year. Estimate its value after 4 years.\n\n**Step 1.** Each year the value is multiplied by $0.95$, so after 4 years it is $6{,}00{,}000 \\times (0.95)^4 = 6{,}00{,}000 \\times (1 - 0.05)^4$.\n*Why this step:* a percentage loss each year is repeated multiplication, which is exactly a power of $(1 + x)$ with $x = -0.05$.\n**Step 2.** Here $nx = 4 \\times 0.05 = 0.2$, small but not tiny, so keep a few terms:\n$1 - 4(0.05) + 6(0.05)^2 - 4(0.05)^3 = 1 - 0.2 + 0.015 - 0.0005 = 0.8145$.\n*Why this step:* the $x^2$ term, $0.015$, is worth ₹9,000 here, far too much to drop.\n**Step 3.** $6{,}00{,}000 \\times 0.8145 = 4{,}88{,}700$.\n**Answer:** about ₹4,88,700. (The last term, $(0.05)^4 = 0.00000625$, adds only ₹3.75.)\n\nThe tempting shortcut \"5% a year for 4 years is 20%\" gives ₹4,80,000. That is $1 + nx$ alone, and it undercounts because each year's loss is taken from a smaller value.",
    },
    {
      type: "text",
      content:
        "**Worked example 4 (NCERT/CBSE style).** Which is larger, $(1.1)^{10000}$ or $1000$?\n\n**Step 1.** Expand: $(1 + 0.1)^{10000} = 1 + 10000(0.1) + \\binom{10000}{2}(0.1)^2 + \\cdots$\n*Why this step:* we do not need the value, only a lower bound. Every term here is positive, so any two of them already give one.\n**Step 2.** The first two terms are $1 + 1000 = 1001$, and every remaining term is positive.\n**Step 3.** So $(1.1)^{10000} > 1001 > 1000$.\n**Answer:** $(1.1)^{10000}$ is larger.\n\nNotice that $1 + nx$ is a poor **estimate** here ($nx = 1000$ is huge), yet it is a perfectly valid **lower bound**. For $x > 0$ and whole $n$, $(1 + x)^n \\ge 1 + nx$ always.",
    },
    {
      type: "quiz",
      id: "pc5-4-q1",
      variant: "concept",
      question: "Which is the best quick estimate of $(1.001)^8$?",
      options: [
        { text: "$1.008$", correct: true, feedback: "$1 + nx = 1 + 8(0.001)$. The next term, $28 \\times 10^{-6}$, is tiny." },
        { text: "$1.000$", feedback: "This comes from $1 + x^n = 1 + (0.001)^8$, which keeps the smallest term and drops the biggest one." },
        { text: "$1.0008$", feedback: "The second term is $nx = 8 \\times 0.001 = 0.008$, not $0.0008$." },
        { text: "$8.008$", feedback: "A number just above 1, raised to a small power, stays just above 1." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-4-q2",
      variant: "practice",
      question: "Find $(1.03)^5$ correct to 2 decimal places.",
      options: [
        { text: "$1.16$", correct: true, feedback: "$1 + 0.15 + 10(0.0009) + 10(0.000027) = 1.15927 \\approx 1.16$." },
        { text: "$1.15$", feedback: "That keeps only $1 + nx$. The $x^2$ term adds $0.009$, which changes the second decimal place." },
        { text: "$1.09$", feedback: "$nx = 5 \\times 0.03 = 0.15$." },
        { text: "$1.24$", feedback: "$(0.03)^2 = 0.0009$, not $0.009$. Count the decimal places: 3 hundredths squared is 9 ten-thousandths." },
      ],
      hint: "Terms: $1$, $5x$, $10x^2$, $10x^3$ with $x = 0.03$.",
    },
    {
      type: "quiz",
      id: "pc5-4-q3",
      variant: "practice",
      question: "Find $(0.99)^{10}$ correct to 3 decimal places.",
      options: [
        { text: "$0.904$", correct: true, feedback: "$1 - 0.1 + 45(0.0001) - 120(0.000001) = 0.90438 \\approx 0.904$." },
        { text: "$0.900$", feedback: "That keeps only $1 - 10x$. The $+45x^2 = 0.0045$ term matters at 3 d.p." },
        { text: "$0.905$", feedback: "Close, but the $-120x^3 = -0.00012$ term pulls $0.9045$ down to $0.90438$." },
        { text: "$0.910$", feedback: "Remember $x = -0.01$: the $x$ term is subtracted, so the total drops by about $0.1$." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-4-q4",
      variant: "concept",
      question:
        "Why does $1 + nx$ give a poor estimate of $(1.1)^{20}$ (it gives 3; the true value is about 6.73)?",
      options: [
        { text: "Because $nx = 2$ is not small, so later terms like $\\binom{20}{2}(0.1)^2 = 1.9$ are large.", correct: true, feedback: "The approximation needs $nx$ small, not just $x$ small." },
        { text: "Because $x = 0.1$ is not small; it only works for $x < 0.01$.", feedback: "Size of $x$ alone is not the test: $(1.001)^{2000}$ has tiny $x$ yet $1 + nx = 3$ while the true value is about 7.4. What must be small is $nx$." },
        { text: "Because the binomial theorem only works for $n \\le 10$.", feedback: "The theorem holds for every whole $n$. Only the truncation fails here." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-4-q5",
      variant: "practice",
      question:
        "Prices rise 1% every month for 12 months. Using the first three terms, by about how much has the price risen overall?",
      options: [
        { text: "About $12.7\\%$", correct: true, feedback: "$(1.01)^{12} \\approx 1 + 0.12 + 66(0.0001) = 1.1266$." },
        { text: "Exactly $12\\%$", feedback: "That ignores compounding, the $\\binom{12}{2}x^2$ term." },
        { text: "About $13.5\\%$", feedback: "The $x^2$ term is $66 \\times 0.0001 = 0.0066$, not $0.015$." },
        { text: "About $1.2\\%$", feedback: "$nx = 12 \\times 0.01 = 0.12$, which is 12%." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-4-q6",
      variant: "practice",
      question:
        "A phone worth ₹40,000 loses 10% of its value every year. Expanding $(1 - 0.1)^3$ in full, what is it worth after 3 years?",
      options: [
        { text: "₹29,160", correct: true, feedback: "$(1 - 0.1)^3 = 1 - 0.3 + 0.03 - 0.001 = 0.729$, and $40{,}000 \\times 0.729 = 29{,}160$." },
        { text: "₹28,000", feedback: "That is $1 + nx = 0.7$: a flat 30% loss. Each year's 10% comes off a smaller value, so the loss is less." },
        { text: "₹29,200", feedback: "That stops at $1 - 0.3 + 0.03 = 0.73$. The question asks for the full expansion, which includes $-0.001$." },
        { text: "₹36,000", feedback: "That is the value after just one year." },
      ],
      hint: "Terms: $1$, $3x$, $3x^2$, $x^3$ with $x = -0.1$.",
    },
    {
      type: "quiz",
      id: "pc5-4-q7",
      variant: "practice",
      question: "Which is larger, $(1.2)^{4000}$ or $800$?",
      options: [
        { text: "$(1.2)^{4000}$, since its expansion starts $1 + 4000(0.2) = 801$ and every other term is positive.", correct: true, feedback: "Two terms already beat 800. The rest only add." },
        { text: "$800$, because $1 + nx = 801$ is only an approximation and the true value could be smaller.", feedback: "For $x > 0$ every dropped term is positive, so $1 + nx$ can only underestimate. The true value is far larger." },
        { text: "They are equal, since $4000 \\times 0.2 = 800$.", feedback: "The expansion starts with $1 + 800$, and many positive terms follow." },
        { text: "It cannot be decided without a calculator.", feedback: "Two terms of the binomial expansion settle it." },
      ],
    },
  ]),
};

const lesson05: LessonSeed = {
  slug: "beyond-whole-number-powers",
  title: "5.5 · Beyond Whole-Number Powers",
  position: 5,
  blocks: blocks([
    {
      type: "callout",
      variant: "info",
      title: "JEE enrichment",
      content:
        "This lesson goes beyond the CBSE Class 11 and current JEE syllabi, which cover only whole-number powers. It appears in older JEE papers and in calculus later on. Read it for the idea; the drill is optional. Proofs need calculus, so here the results are shown and checked numerically rather than proved.",
    },
    {
      type: "text",
      content:
        "The coefficient $\\binom{n}{r}$ has a form that does not mention factorials of $n$ at all:\n\n$\\displaystyle \\binom{n}{r} = \\frac{n(n-1)(n-2)\\cdots(n-r+1)}{r!}.$\n\nThe top has $r$ factors, starting at $n$ and dropping by 1 each time. Nothing in that formula needs $n$ to be a whole number. You can put in $n = -1$ or $n = \\frac{1}{2}$ and get a perfectly good number. So what does $(1 + x)^{-1}$ or $(1 + x)^{1/2}$ expand into?",
    },
    {
      type: "text",
      content:
        "**Why the series stops for whole $n$.** With $n = 4$ and $r = 5$, the top is $4 \\cdot 3 \\cdot 2 \\cdot 1 \\cdot 0 = 0$. Once the factors reach zero, every later coefficient is 0 and the expansion ends at $x^n$.\n\nFor $n = -1$ the factors are $-1, -2, -3, \\ldots$ and they never reach zero. The series **never stops**.",
    },
    {
      type: "callout",
      variant: "definition",
      title: "The binomial series",
      content:
        "For any real $n$ and $|x| < 1$:\n$\\displaystyle (1 + x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\frac{n(n-1)(n-2)}{3!}x^3 + \\cdots$\nWhen $n$ is a whole number it stops after $x^n$ and holds for every $x$. Otherwise it is an infinite series and needs $|x| < 1$.",
    },
    {
      type: "text",
      content:
        "**Worked example 1.** Expand $(1 - x)^{-1}$.\n\n**Step 1.** Use $n = -1$ and replace $x$ by $-x$.\n**Step 2.** Coefficient of $(-x)^r$: $\\dfrac{(-1)(-2)\\cdots(-r)}{r!} = \\dfrac{(-1)^r r!}{r!} = (-1)^r$.\n**Step 3.** So the term is $(-1)^r(-x)^r = x^r$.\n**Answer:** $\\dfrac{1}{1 - x} = 1 + x + x^2 + x^3 + \\cdots$, the geometric series.\n**Check without calculus:** $(1 - x)(1 + x + x^2 + \\cdots + x^k) = 1 - x^{k+1}$. When $|x| < 1$, $x^{k+1}$ shrinks to 0 as $k$ grows, so the partial sums approach $\\frac{1}{1 - x}$.",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "1/(1−x)", expr: "1/(1-x)", latex: "\\frac{1}{1-x}", excluded: [1] },
          { label: "1 + x", expr: "1+x", latex: "1 + x", excluded: [] },
          { label: "1 + x + x²", expr: "1+x+x^2", latex: "1 + x + x^2", excluded: [] },
          { label: "up to x⁵", expr: "1+x+x^2+x^3+x^4+x^5", latex: "1 + x + x^2 + x^3 + x^4 + x^5", excluded: [] },
        ],
        window: { xmin: -1.5, xmax: 2.5, ymin: -4, ymax: 10 },
      },
    },
    {
      type: "text",
      content:
        "Flip through the partial sums. Between $x = -1$ and $x = 1$ each new term pulls the polynomial closer to $\\frac{1}{1-x}$. Past $x = 1$ the curve $\\frac{1}{1-x}$ jumps to negative values, while every partial sum shoots upward. They are not converging to it at all.",
    },
    {
      type: "table",
      headers: ["Terms kept", "Partial sum at $x = \\frac{1}{2}$", "Partial sum at $x = 2$"],
      rows: [
        ["1", "1", "1"],
        ["2", "1.5", "3"],
        ["3", "1.75", "7"],
        ["4", "1.875", "15"],
        ["5", "1.9375", "31"],
        ["6", "1.96875", "63"],
        ["Formula $\\frac{1}{1-x}$", "2", "$-1$"],
      ],
    },
    {
      type: "callout",
      variant: "warning",
      title: "Why |x| < 1 is not optional",
      content:
        "At $x = 2$ the formula says $\\frac{1}{1-2} = -1$, but the series $1 + 2 + 4 + 8 + \\cdots$ grows without end. Adding up positive numbers can never give $-1$. Outside $|x| < 1$ the powers $x^r$ grow instead of shrink, so the series does not settle on any value. For whole-number $n$ this question never came up, because the series stopped.",
    },
    {
      type: "text",
      content:
        "**Worked example 2.** Expand $\\sqrt{1 + x} = (1 + x)^{1/2}$ up to $x^3$.\n\n**Step 1.** $n = \\frac{1}{2}$, so $nx = \\frac{1}{2}x$.\n**Step 2.** $\\dfrac{n(n-1)}{2!} = \\dfrac{\\frac{1}{2}\\cdot(-\\frac{1}{2})}{2} = -\\dfrac{1}{8}$.\n**Step 3.** $\\dfrac{n(n-1)(n-2)}{3!} = \\dfrac{\\frac{1}{2}\\cdot(-\\frac{1}{2})\\cdot(-\\frac{3}{2})}{6} = \\dfrac{3/8}{6} = \\dfrac{1}{16}$.\n**Answer:** $\\sqrt{1 + x} = 1 + \\dfrac{x}{2} - \\dfrac{x^2}{8} + \\dfrac{x^3}{16} - \\cdots$",
    },
    {
      type: "interactive",
      config: {
        component: "family-gallery",
        families: [
          { label: "√(1+x)", expr: "sqrt(1+x)", latex: "\\sqrt{1+x}", excluded: [], xminOverride: -1 },
          { label: "1 + x/2", expr: "1+x/2", latex: "1 + \\tfrac{x}{2}", excluded: [] },
          { label: "… − x²/8", expr: "1+x/2-x^2/8", latex: "1 + \\tfrac{x}{2} - \\tfrac{x^2}{8}", excluded: [] },
          { label: "… + x³/16", expr: "1+x/2-x^2/8+x^3/16", latex: "1 + \\tfrac{x}{2} - \\tfrac{x^2}{8} + \\tfrac{x^3}{16}", excluded: [] },
        ],
        window: { xmin: -1.5, xmax: 3, ymin: -0.5, ymax: 2.5 },
      },
    },
    {
      type: "text",
      content:
        "**Worked example 3.** Estimate $\\sqrt{1.02}$.\n\n**Step 1.** $x = 0.02$.\n**Step 2.** $1 + \\frac{0.02}{2} - \\frac{(0.02)^2}{8} = 1 + 0.01 - 0.00005 = 1.00995$.\n**Answer:** $\\sqrt{1.02} \\approx 1.01$ to 2 decimal places, or $1.00995$ with the correction. The true value is $1.0099505\\ldots$\n\nThis is the same rule as 5.4: $(1 + x)^n \\approx 1 + nx$, now with $n = \\frac{1}{2}$. A square root of \"1 plus a bit\" is \"1 plus half the bit\".",
    },
    {
      type: "text",
      content:
        "**Worked example 3b (square root by hand).** Find $\\sqrt{99}$ to 4 decimal places.\n\n**Step 1.** $99 = 100(1 - 0.01)$, so $\\sqrt{99} = 10(1 - 0.01)^{1/2}$.\n*Why this step:* the series needs the form $(1 + x)$ with $|x| < 1$, and small. Pulling out the nearest perfect square, 100, leaves $x = -0.01$.\n**Step 2.** $(1 - 0.01)^{1/2} \\approx 1 + \\dfrac{-0.01}{2} - \\dfrac{(0.01)^2}{8} = 1 - 0.005 - 0.0000125 = 0.9949875$.\n*Why this step:* the next term, $\\frac{x^3}{16}$, is about $-6 \\times 10^{-8}$, even after multiplying by 10 far too small to affect 4 decimal places.\n**Step 3.** Multiply back by 10: $9.949875$.\n**Answer:** $\\sqrt{99} \\approx 9.9499$. (True value: $9.9498743\\ldots$)\n\nWriting $\\sqrt{99} = \\sqrt{81 + 18} = 9(1 + \\frac{2}{9})^{1/2}$ also works, but $x = \\frac{2}{9}$ is much larger, so you would need many more terms. Pick the base that makes $x$ smallest.",
    },
    {
      type: "text",
      content:
        "**Worked example 4.** Find the coefficient of $x^r$ in $(1 + x)^{-2}$.\n\n**Step 1.** $\\dfrac{(-2)(-3)(-4)\\cdots(-2 - r + 1)}{r!} = \\dfrac{(-1)^r\\,(2 \\cdot 3 \\cdots (r+1))}{r!} = (-1)^r\\dfrac{(r+1)!}{r!}$.\n**Answer:** $(-1)^r(r + 1)$, so $(1 + x)^{-2} = 1 - 2x + 3x^2 - 4x^3 + \\cdots$",
    },
    {
      type: "text",
      content:
        "**Worked example 4b (routine).** Expand $(1 + x)^{-3}$ up to $x^3$.\n\n**Step 1.** $n = -3$, so the $x$ coefficient is $n = -3$.\n**Step 2.** $\\dfrac{n(n-1)}{2!} = \\dfrac{(-3)(-4)}{2} = 6$.\n**Step 3.** $\\dfrac{n(n-1)(n-2)}{3!} = \\dfrac{(-3)(-4)(-5)}{6} = -10$.\n*Why these steps:* each new coefficient takes one more factor, dropping by 1, and one more factor in the factorial. The number of negative factors decides the sign.\n**Answer:** $(1 + x)^{-3} = 1 - 3x + 6x^2 - 10x^3 + \\cdots$ for $|x| < 1$. The sizes $1, 3, 6, 10$ are the triangular numbers $\\binom{r+2}{2}$.",
    },
    {
      type: "text",
      content:
        "**Worked example 4c (JEE style).** Find the coefficient of $x^4$ in $\\dfrac{1 + x}{(1 - x)^2}$, for $|x| < 1$.\n\n**Step 1.** $(1 - x)^{-2} = 1 + 2x + 3x^2 + 4x^3 + 5x^4 + \\cdots$, the coefficient of $x^r$ being $r + 1$.\n*Why this step:* this is Worked example 4 with $x$ replaced by $-x$, which turns every sign positive.\n**Step 2.** Multiply by $(1 + x)$. An $x^4$ comes either from $1 \\times 5x^4$ or from $x \\times 4x^3$.\n*Why this step:* like Vandermonde, the coefficient of a product is found by listing the ways the powers can add up to 4.\n**Step 3.** $5 + 4 = 9$.\n**Answer:** $9$. In general the coefficient of $x^r$ is $(r + 1) + r = 2r + 1$.\n**Check:** $\\frac{1 + x}{(1 - x)^2}$ at $x = 0.1$ is $\\frac{1.1}{0.81} = 1.3580\\ldots$, and $1 + 3(0.1) + 5(0.01) + 7(0.001) + 9(0.0001) = 1.3579$.",
    },
    {
      type: "table",
      headers: ["Expression", "Series (valid for $|x| < 1$)"],
      rows: [
        ["$(1 - x)^{-1}$", "$1 + x + x^2 + x^3 + \\cdots$"],
        ["$(1 + x)^{-1}$", "$1 - x + x^2 - x^3 + \\cdots$"],
        ["$(1 + x)^{-2}$", "$1 - 2x + 3x^2 - 4x^3 + \\cdots$"],
        ["$(1 + x)^{1/2}$", "$1 + \\frac{x}{2} - \\frac{x^2}{8} + \\frac{x^3}{16} - \\cdots$"],
        ["$(1 - x)^{-1/2}$", "$1 + \\frac{x}{2} + \\frac{3x^2}{8} + \\frac{5x^3}{16} + \\cdots$"],
      ],
    },
    {
      type: "quiz",
      id: "pc5-5-q1",
      variant: "practice",
      question: "What is the coefficient of $x^3$ in the expansion of $(1 - x)^{-1}$?",
      options: [
        { text: "$1$", correct: true, feedback: "$\\frac{1}{1-x} = 1 + x + x^2 + x^3 + \\cdots$, so every coefficient is 1." },
        { text: "$-1$", feedback: "That is the coefficient in $(1 + x)^{-1}$. The $-x$ inside flips the signs back to $+$." },
        { text: "$0$", feedback: "The series does not stop because $n = -1$ is not a whole number." },
        { text: "$3$", feedback: "3 is the coefficient of $x^2$ in $(1 - x)^{-2} = 1 + 2x + 3x^2 + \\cdots$. Here the power is $-1$ and every coefficient is 1." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-5-q2",
      variant: "concept",
      question:
        "Put $x = 2$ into $\\frac{1}{1-x} = 1 + x + x^2 + \\cdots$. What goes wrong?",
      options: [
        { text: "The series $1 + 2 + 4 + 8 + \\cdots$ grows without end, so it does not equal $-1$. The identity needs $|x| < 1$.", correct: true, feedback: "Outside $|x| < 1$ the powers grow, and the series has no value." },
        { text: "Nothing: the infinite sum really equals $-1$.", feedback: "A sum of positive numbers can never be negative. The partial sums are 1, 3, 7, 15, 31, …" },
        { text: "The left side is undefined at $x = 2$.", feedback: "$\\frac{1}{1-2} = -1$ is defined. The failure is on the series side." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-5-q3",
      variant: "practice",
      question: "What is the coefficient of $x^2$ in $(1 + x)^{1/2}$?",
      options: [
        { text: "$-\\dfrac{1}{8}$", correct: true, feedback: "$\\dfrac{\\frac{1}{2}(\\frac{1}{2} - 1)}{2!} = \\dfrac{-\\frac{1}{4}}{2} = -\\dfrac{1}{8}$." },
        { text: "$\\dfrac{1}{8}$", feedback: "The factor $n - 1 = -\\frac{1}{2}$ is negative, so the coefficient is negative." },
        { text: "$-\\dfrac{1}{4}$", feedback: "You still need to divide by $2! = 2$." },
        { text: "$\\dfrac{1}{4}$", feedback: "Two problems: the sign ($n - 1 < 0$) and the missing division by $2!$." },
      ],
      hint: "Use $\\frac{n(n-1)}{2!}$ with $n = \\frac{1}{2}$.",
    },
    {
      type: "quiz",
      id: "pc5-5-q4",
      variant: "practice",
      question: "Using $\\sqrt{1 + x} \\approx 1 + \\frac{x}{2} - \\frac{x^2}{8}$, estimate $\\sqrt{0.98}$ to 3 decimal places.",
      options: [
        { text: "$0.990$", correct: true, feedback: "$x = -0.02$: $1 - 0.01 - 0.00005 = 0.98995 \\approx 0.990$." },
        { text: "$0.980$", feedback: "That would be $1 + x$. The square root halves the change: $1 + \\frac{x}{2}$." },
        { text: "$1.010$", feedback: "That is $\\sqrt{1.02}$. Here $x = -0.02$, so the root is below 1." },
        { text: "$0.999$", feedback: "$\\frac{x}{2} = -0.01$, which moves the answer down to about 0.99." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-5-q5",
      variant: "practice",
      question: "What is the coefficient of $x^3$ in $(1 + x)^{-2}$?",
      options: [
        { text: "$-4$", correct: true, feedback: "$\\dfrac{(-2)(-3)(-4)}{3!} = \\dfrac{-24}{6} = -4$." },
        { text: "$4$", feedback: "Three negative factors multiply to a negative number." },
        { text: "$-3$", feedback: "The pattern is $(-1)^r(r + 1)$, so $r = 3$ gives $-4$." },
        { text: "$0$", feedback: "With $n = -2$ no factor is ever zero, so the series does not stop." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-5-q6",
      variant: "concept",
      question: "Why does the expansion of $(1 + x)^5$ stop after $x^5$, while $(1 + x)^{1/2}$ goes on forever?",
      options: [
        { text: "For $n = 5$, the top product $n(n-1)\\cdots(n-r+1)$ contains a 0 once $r \\ge 6$; for $n = \\frac{1}{2}$ no factor is ever 0.", correct: true, feedback: "The factors $\\frac{1}{2}, -\\frac{1}{2}, -\\frac{3}{2}, \\ldots$ skip past zero." },
        { text: "Because $\\binom{5}{6}$ is undefined.", feedback: "With the product formula it is defined, and it equals 0. That zero is what ends the series." },
        { text: "Because fractional powers only make sense for $x > 1$.", feedback: "The series actually needs $|x| < 1$, the opposite." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-5-q7",
      variant: "practice",
      question: "What is the coefficient of $x^2$ in the expansion of $(1 + x)^{-3}$?",
      options: [
        { text: "$6$", correct: true, feedback: "$\\dfrac{(-3)(-4)}{2!} = \\dfrac{12}{2} = 6$." },
        { text: "$-6$", feedback: "Two negative factors multiply to a positive number." },
        { text: "$12$", feedback: "You still need to divide by $2! = 2$." },
        { text: "$-10$", feedback: "That is the coefficient of $x^3$, which has three negative factors." },
      ],
      hint: "Use $\\frac{n(n-1)}{2!}$ with $n = -3$.",
    },
    {
      type: "quiz",
      id: "pc5-5-q8",
      variant: "practice",
      question: "For $|x| < 1$, what is the coefficient of $x^3$ in $\\dfrac{1 + 2x}{(1 - x)^2}$?",
      options: [
        { text: "$10$", correct: true, feedback: "$(1 - x)^{-2}$ has coefficients $1, 2, 3, 4, \\ldots$. An $x^3$ comes from $1 \\times 4x^3$ or $2x \\times 3x^2$: $4 + 6 = 10$." },
        { text: "$7$", feedback: "That is $4 + 3$, which forgets the 2 in front of $x$." },
        { text: "$4$", feedback: "That uses only the 1 from the numerator. The $2x$ also pairs with $3x^2$." },
        { text: "$-2$", feedback: "In $(1 - x)^{-2}$ the signs are all positive: the $-x$ inside cancels the alternating signs of $(1 + x)^{-2}$." },
      ],
      hint: "List the ways the powers from $(1 + 2x)$ and from $(1 - x)^{-2}$ can add to 3.",
    },
  ]),
};

const lessonMastery: LessonSeed = {
  slug: "chapter-5-mastery",
  title: "5.6 · Chapter 5 Mastery",
  position: 6,
  blocks: blocks([
    {
      type: "text",
      content:
        "This is the last check of the course. It mixes every chapter: counting models, the general term, coefficient sums, divisibility and approximation. Work each question on paper first, then choose.",
    },
    {
      type: "callout",
      variant: "info",
      title: "Chapter 5 in five lines",
      content:
        "**Coefficient sums:** put $x = 1$ (all) or $x = -1$ (alternating) into the whole expression.\n**Weighted sums:** $r\\binom{n}{r} = n\\binom{n-1}{r-1}$, so $\\sum r\\binom{n}{r} = n2^{n-1}$.\n**Vandermonde:** $\\sum_k\\binom{m}{k}\\binom{n}{r-k} = \\binom{m+n}{r}$; squares give $\\binom{2n}{n}$.\n**Remainders:** write the base as (multiple of $d$) $\\pm 1$ and expand.\n**Approximation:** $(1 + x)^n \\approx 1 + nx$ when $nx$ is small; any real $n$ works for $|x| < 1$.",
    },
    {
      type: "table",
      headers: ["Question shape", "Tool", "Chapter"],
      rows: [
        ["Arrange, with order", "${}^nP_r$, $n!/(p!q!)$, $(n-1)!$", "1"],
        ["Select, no order", "$\\binom{n}{r}$, complements, cases", "2"],
        ["Identical items into boxes", "stars and bars $\\binom{n+k-1}{k-1}$", "3"],
        ["One term of $(a + b)^n$", "$T_{r+1} = \\binom{n}{r}a^{n-r}b^r$", "4"],
        ["Sum of coefficients", "$P(1)$, $P(-1)$", "5"],
        ["Remainder of a huge power", "base $=$ multiple $\\pm 1$", "5"],
        ["Value of $(1 + x)^n$, $x$ small", "$1 + nx + \\binom{n}{2}x^2$", "5"],
      ],
    },
    {
      type: "text",
      content:
        "**One exam problem, start to finish.** The sum of the coefficients in the expansion of $(1 + 2x)^n$ is $6561$. Find the middle term.\n\n**Step 1.** Sum of coefficients $= P(1) = 3^n$, so $3^n = 6561$.\n*Why this step:* \"sum of coefficients\" always means substitute $x = 1$ into the whole expression (5.1), not $2^n$.\n**Step 2.** $3^8 = 6561$, so $n = 8$.\n**Step 3.** With $n = 8$ there are 9 terms, and the middle one is $T_5$, which has $r = 4$.\n*Why this step:* for even $n$ the single middle term is $T_{n/2 + 1}$ (Chapter 4).\n**Step 4.** $T_5 = \\binom{8}{4}(2x)^4 = 70 \\times 16x^4 = 1120x^4$.\n**Answer:** $1120x^4$.\n\nTwo chapters in one question: Chapter 5 found $n$, Chapter 4 found the term. Many of the questions below work the same way.",
    },
    {
      type: "quiz",
      id: "pc5-6-q1",
      variant: "mastery",
      question: "How many different arrangements are there of the letters of ASSASSIN?",
      options: [
        { text: "$840$", correct: true, feedback: "8 letters: S four times, A twice, I and N once. $\\frac{8!}{4!\\,2!} = \\frac{40\\,320}{48} = 840$." },
        { text: "$40\\,320$", feedback: "$8!$ treats the four S's and the two A's as different letters." },
        { text: "$1680$", feedback: "That divides by $4!$ only. The two A's are identical too." },
        { text: "$20\\,160$", feedback: "That divides by $2!$ only. The four S's are identical too." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q2",
      variant: "mastery",
      question: "From 7 men and 5 women, how many 4-person committees include at least one woman?",
      options: [
        { text: "$460$", correct: true, feedback: "Complement: $\\binom{12}{4} - \\binom{7}{4} = 495 - 35 = 460$." },
        { text: "$495$", feedback: "That is every committee, including the 35 with no woman." },
        { text: "$5 \\times \\binom{11}{3} = 825$", feedback: "\"Pick a woman first, then anyone\" counts a committee with two women twice." },
        { text: "$35$", feedback: "That is the number with no woman at all, the part to subtract." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q3",
      variant: "mastery",
      question: "How many solutions does $x + y + z = 8$ have in non-negative integers?",
      options: [
        { text: "$45$", correct: true, feedback: "8 stars and 2 bars: $\\binom{10}{2} = 45$." },
        { text: "$21$", feedback: "That is $\\binom{7}{2}$, the count of positive solutions." },
        { text: "$\\binom{8}{3} = 56$", feedback: "Identical items into boxes is not $\\binom{n}{k}$. Arrange 8 stars and 2 bars." },
        { text: "$3^8$", feedback: "That counts 8 distinct objects into 3 boxes. Here the units are identical." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q4",
      variant: "mastery",
      question: "What is the coefficient of $x^3$ in $(1 + 2x)^6$?",
      options: [
        { text: "$160$", correct: true, feedback: "$T_4 = \\binom{6}{3}(2x)^3 = 20 \\times 8x^3$." },
        { text: "$20$", feedback: "That forgets the $2^3$ carried by $(2x)^3$." },
        { text: "$40$", feedback: "The 2 is cubed along with $x$: $2^3 = 8$, not 2." },
        { text: "$240$", feedback: "That is $\\binom{6}{4}2^4$, the coefficient of $x^4$." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q5",
      variant: "mastery",
      question: "What is the term independent of $x$ in $\\left(x + \\dfrac{1}{x}\\right)^6$?",
      options: [
        { text: "$20$", correct: true, feedback: "$T_{r+1} = \\binom{6}{r}x^{6-2r}$; power 0 needs $r = 3$, giving $\\binom{6}{3} = 20$." },
        { text: "$15$", feedback: "That is $\\binom{6}{2}$, the coefficient of $x^2$." },
        { text: "$1$", feedback: "That is the coefficient of $x^6$ (or $x^{-6}$)." },
        { text: "$64$", feedback: "That is the sum of all the coefficients, $2^6$." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q6",
      variant: "mastery",
      question: "What is the sum of the coefficients in the expansion of $(2x - 1)^{20}$?",
      options: [
        { text: "$1$", correct: true, feedback: "$P(1) = (2 - 1)^{20} = 1$." },
        { text: "$2^{20}$", feedback: "That is the sum of the binomial coefficients only. Substitute $x = 1$ into the whole expression." },
        { text: "$3^{20}$", feedback: "That is $P(-1) = (-3)^{20}$, the alternating sum." },
        { text: "$0$", feedback: "$(2 - 1)^{20} = 1$, not 0." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q7",
      variant: "mastery",
      question: "Evaluate $\\sum_{r=1}^{8} r\\binom{8}{r}$.",
      options: [
        { text: "$1024$", correct: true, feedback: "$8 \\cdot 2^7 = 1024$." },
        { text: "$256$", feedback: "That is $2^8$, the unweighted row sum." },
        { text: "$2048$", feedback: "That is $8 \\cdot 2^8$. After pulling out $n$, row $n - 1$ remains, summing to $2^7$." },
        { text: "$128$", feedback: "That is $2^7$ without the factor $n = 8$." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q8",
      variant: "mastery",
      question: "Evaluate $\\binom{6}{0}^2 + \\binom{6}{1}^2 + \\cdots + \\binom{6}{6}^2$.",
      options: [
        { text: "$924$", correct: true, feedback: "Two teams of 6, choose 6: $\\binom{12}{6} = 924$." },
        { text: "$4096$", feedback: "That is $(2^6)^2$. The square of the sum is not the sum of the squares." },
        { text: "$462$", feedback: "That is $\\binom{11}{5}$. You choose 6 from 12." },
        { text: "$64$", feedback: "That is the plain row sum." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q9",
      variant: "mastery",
      question: "What is the remainder when $3^{37}$ is divided by 80?",
      options: [
        { text: "$3$", correct: true, feedback: "$3^4 = 81 = 80 + 1$; $3^{37} = 3 \\cdot 81^9 = 3(80k + 1) = 240k + 3$." },
        { text: "$1$", feedback: "37 is not a multiple of 4. One factor of 3 is left over." },
        { text: "$27$", feedback: "That would need $37 = 4k + 3$. In fact $37 = 4 \\times 9 + 1$." },
        { text: "$81$", feedback: "A remainder on division by 80 is below 80." },
      ],
      hint: "Find a small power of 3 that is one more than a multiple of 80.",
    },
    {
      type: "quiz",
      id: "pc5-6-q10",
      variant: "mastery",
      question: "Find $(1.01)^6$ correct to 3 decimal places.",
      options: [
        { text: "$1.062$", correct: true, feedback: "$1 + 0.06 + 15(0.0001) + 20(0.000001) = 1.06152 \\approx 1.062$." },
        { text: "$1.060$", feedback: "That keeps only $1 + nx$. The $x^2$ term adds $0.0015$." },
        { text: "$1.061$", feedback: "$1.06152$ rounds up at the third decimal place." },
        { text: "$1.000$", feedback: "That comes from $1 + x^6$, the misconception from 5.4." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q11",
      variant: "mastery",
      question: "In how many ways can 6 people sit around a round table, if only their positions relative to each other matter?",
      options: [
        { text: "$120$", correct: true, feedback: "$(6 - 1)! = 120$: fix one person and arrange the other 5." },
        { text: "$720$", feedback: "That is $6!$, which counts each seating 6 times, once per rotation." },
        { text: "$60$", feedback: "That halves again for reflections, which only applies to necklaces or garlands that can be flipped." },
        { text: "$36$", feedback: "There is no reason to square 6 here." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q12",
      variant: "mastery",
      question: "What is the largest number that divides $7^{2n} - 48n - 1$ for every $n \\ge 1$?",
      options: [
        { text: "$2304$", correct: true, feedback: "$7^{2n} = 49^n = (1 + 48)^n = 1 + 48n + 48^2[\\ldots]$, so the expression is a multiple of $48^2 = 2304$. At $n = 2$ it equals $2401 - 97 = 2304$ exactly, so nothing larger works." },
        { text: "$48$", feedback: "48 does divide it, but so does $48^2$. Subtracting $48n + 1$ removes the only terms that are not multiples of $48^2$." },
        { text: "$96$", feedback: "96 divides it, but it is not the largest. Every term left after subtracting $1 + 48n$ carries $48^2$." },
        { text: "$49$", feedback: "At $n = 1$ the value is $49 - 48 - 1 = 0$, but at $n = 2$ it is $2304$, which 49 does not divide. Write $49 = 1 + 48$, not a multiple of 49." },
      ],
      hint: "Write $7^2 = 49 = 1 + 48$ and expand $(1 + 48)^n$.",
    },
    {
      type: "quiz",
      id: "pc5-6-q13",
      variant: "mastery",
      question: "Evaluate $\\sum_{k=0}^{3}\\binom{7}{k}\\binom{5}{3-k}$.",
      options: [
        { text: "$220$", correct: true, feedback: "The bottoms always add to 3: choose 3 people from a team of 7 and a team of 5 together, $\\binom{12}{3} = 220$." },
        { text: "$350$", feedback: "That is $\\binom{7}{3}\\binom{5}{3}$, which picks 3 from each team. The sum picks 3 in total, split $k$ and $3 - k$ between the teams." },
        { text: "$495$", feedback: "That is $\\binom{12}{4}$. The committee size is the constant sum of the bottoms, which is 3." },
        { text: "$4096$", feedback: "That is $2^{12}$, all subsets of 12 people. Here the committee size is fixed at 3." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q14",
      variant: "mastery",
      question: "What is the middle term of $\\left(x - \\dfrac{1}{x}\\right)^{10}$?",
      options: [
        { text: "$-252$", correct: true, feedback: "11 terms, so the middle is $T_6 = \\binom{10}{5}x^5\\left(-\\frac{1}{x}\\right)^5 = -252$." },
        { text: "$252$", feedback: "The $-\\frac{1}{x}$ is raised to an odd power, 5, so the sign is negative." },
        { text: "$-210$", feedback: "That is $\\binom{10}{4}$, from $T_5$. With $n = 10$ the middle term is $T_{n/2 + 1} = T_6$." },
        { text: "$126$", feedback: "That is $\\binom{9}{4}$ or half of 252. The coefficient is $\\binom{10}{5}$ itself." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q15",
      variant: "mastery",
      question: "(Enrichment, from 5.5.) What is the coefficient of $x^2$ in $(1 - x)^{-2}$?",
      options: [
        { text: "$3$", correct: true, feedback: "$\\frac{(-2)(-3)}{2!}(-x)^2 = 3x^2$. In general $(1 - x)^{-2} = 1 + 2x + 3x^2 + 4x^3 + \\cdots$." },
        { text: "$-3$", feedback: "Two negative factors give a positive product, and $(-x)^2 = x^2$ is positive too." },
        { text: "$1$", feedback: "That is the coefficient in $(1 - x)^{-1}$, where every coefficient is 1." },
        { text: "$0$", feedback: "With $n = -2$ no factor $n - r + 1$ is ever zero, so the series does not stop." },
      ],
    },
    {
      type: "quiz",
      id: "pc5-6-q16",
      variant: "mastery",
      question:
        "The sum of the coefficients in the expansion of $(3x - 1)^n$ is $256$. What is the middle term?",
      options: [
        { text: "$5670x^4$", correct: true, feedback: "$P(1) = 2^n = 256$ gives $n = 8$. The middle term is $T_5 = \\binom{8}{4}(3x)^4(-1)^4 = 70 \\times 81x^4 = 5670x^4$." },
        { text: "$-5670x^4$", feedback: "The $-1$ is raised to the 4th power, so the sign is $+$." },
        { text: "$70x^4$", feedback: "The 3 is raised to the 4th power along with $x$: $3^4 = 81$." },
        { text: "$-1512x^3$", feedback: "That is $T_6$. With $n = 8$ the middle term is $T_{n/2 + 1} = T_5$." },
      ],
      hint: "Put $x = 1$ to find $n$ first.",
    },
    {
      type: "text",
      content:
        "That completes the course. You started by multiplying shirts by trousers and finished using the same counting to find remainders of 31-digit numbers and square roots by hand. Every formula along the way came from one question: **how many ways, counted two different ways?**",
    },
  ]),
};

export const pncChapter5Lessons: LessonSeed[] = [
  lesson01,
  lesson02,
  lesson03,
  lesson04,
  lesson05,
  lessonMastery,
];
