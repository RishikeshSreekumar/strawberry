# Binomial Coefficients at Work — Explainer Script

- **Course:** Permutations, Combinations & the Binomial Theorem
- **Chapter:** Chapter 5 · Binomial Coefficients at Work (id: `pc-5-binomial-coefficients-at-work`)
- **Scene class:** `PcCh5Video` in `videos/scenes/pc-5-binomial-coefficients-at-work.py`
- **Target runtime:** about 6 minutes (rendered: 6 min 16 s, roughly 1,050 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner treats the binomial theorem as a tool. They see (1 + x) to the n as a machine: put in x = 1 and x = −1 to get the row sum 2 to the n, the alternating sum 0, and the even and odd sums 2 to the n − 1. They see that the sum of the coefficients of any polynomial is its value at x = 1, and why "2 to the 7" is wrong for (3x − 2) to the 7. They learn r times n choose r = n times (n − 1 choose r − 1) by counting a committee with a chair, which gives the weighted sum n times 2 to the n − 1. They see the sum of squares of a row as 2n choose n, split across two teams, and Vandermonde as the general case. For remainders they write the base as a multiple plus or minus one and expand: 2 to the 100 mod 7, 9 to the n − 8n − 1 divisible by 64, and the rule that a negative leftover is not a remainder. They use (1 + x) to the n ≈ 1 + nx, see it as the tangent line, learn that nx must be small, and avoid "(1 + x) to the n ≈ 1 + x to the n". As a JEE preview, they see the coefficient formula extend to any real n, the series for 1/(1 − x), and why |x| < 1 is required.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Team A / first quantity = SECONDARY (teal), team B = PRIMARY (strawberry red), highlights and results = deep gold `#D19A00`, checks = GREEN, warnings = PRIMARY with a cross mark and a red-bordered card. Maths uses `MathTex` with `\binom{n}{r}` notation, matching the chapter's lessons. Each scene has a small grey lesson header at the top left. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("n choose r", "two to the n minus one", "one plus x, to the n").

---

## Scene 0: Title card

**Narration:** Chapter five. Binomial coefficients at work.

**Visuals:** kicker "Permutations, Combinations & the Binomial Theorem", title "Chapter 5 · Binomial Coefficients at Work".

---

## Scene 1: Hook. The theorem as a machine (Lesson 5.1)

**Narration:**

- **Beat a:** Chapter four gave us the binomial theorem. One plus x, to the n, equals n choose zero, plus n choose one times x, plus n choose two times x squared, and so on. The left side is short. The right side is long, but it holds every coefficient. So treat the line as a machine. Feed in a number for x, and the short side tells you something about the whole long side at once.
- **Beat b:** The cheapest input is x equals one. Every power of x becomes one, so only the coefficients survive. Two to the n is the sum of the whole row. Row five: one plus five plus ten plus ten plus five plus one is thirty two, which is two to the fifth.

**Visuals:**

- **Beat a:** Header "5.1 · Sums by Substitution". `(1+x)^n = \binom{n}{0} + \binom{n}{1}x + \cdots + \binom{n}{n}x^n` at the top. A teal brace under the left side labelled "short"; a red brace under the right side labelled "long, but holds every coefficient". Gold "Feed in a number for x".
- **Beat b:** `x = 1:\ 2^n = \binom{n}{0} + \binom{n}{1} + \cdots + \binom{n}{n}` (the "x = 1" in gold). Below it, `n = 5: 1 + 5 + 10 + 10 + 5 + 1 = 32 = 2^5` with a green check.

---

## Scene 2: x = −1, even and odd sums, and the (3x − 2)^7 trap (Lesson 5.1)

**Narration:**

- **Beat a:** Now try x equals minus one. The signs alternate, and the left side is zero to the n, which is zero. So the entries in even positions and the entries in odd positions balance exactly. Row four: one minus four plus six minus four plus one is zero.
- **Beat b:** Call the even position sum E, and the odd position sum O. E plus O is two to the n. E minus O is zero. So each one is half: two to the n minus one.
- **Beat c:** This works for any polynomial. The sum of the coefficients of three x minus two, to the seventh, is its value at x equals one. Three minus two, to the seventh, is just one.
- **Beat d:** It is not two to the seventh, one hundred and twenty eight. That adds only the binomial coefficients, and ignores the three and the minus two that sit inside every real coefficient.

**Visuals:**

- **Beat a:** `x = -1:\ 0 = \binom{n}{0} - \binom{n}{1} + \binom{n}{2} - \binom{n}{3} + \cdots`; then `n = 4: 1 - 4 + 6 - 4 + 1 = 0` with a check.
- **Beat b:** `E + O = 2^n \qquad E - O = 0`, then gold `\Rightarrow E = O = 2^{n-1}`, grey key "E: even positions, O: odd positions".
- **Beat c:** Frame clears. `P(x) = (3x - 2)^7`, then green `\text{sum of coefficients} = P(1) = (3-2)^7 = 1`, grey note "any polynomial: put x = 1 into the whole expression".
- **Beat d:** Red-bordered card: `\binom{7}{0} + \cdots + \binom{7}{7} = 2^7 = 128` with a red cross, and "ignores the 3 and the −2 inside every coefficient".

---

## Scene 3: Weighted sums, squares, Vandermonde (Lesson 5.2)

**Narration:**

- **Beat a:** Now weight each entry by its position. One times n choose one, plus two times n choose two, and so on. No substitution makes those weights. Instead, ask what r times n choose r counts.
- **Beat b:** From n people, pick a committee of r, then a chair from inside it. That is n choose r, times r. Or pick the chair first, from everyone, in n ways, then the other r minus one members from the remaining n minus one people. Both count the same committees with chairs, so they are equal.
- **Beat c:** Now add over every r. Each term becomes n times an entry of row n minus one, and that whole row adds to two to the n minus one. So the weighted sum is n times two to the n minus one. Row four checks out: thirty two.
- **Beat d:** Squares of a row. Put two n people in two teams of n, and choose n of them. Split by k, the number taken from team A. The rest come from team B, so each case gives n choose k, times n choose n minus k. By symmetry that is n choose k, squared. So the squares of row n add up to two n choose n.
- **Beat e:** Row four: one plus sixteen plus thirty six plus sixteen plus one is seventy, which is eight choose four.
- **Beat f:** With teams of m and n, choosing r, the same split gives Vandermonde's identity.

**Visuals:**

- **Beat a:** Header "5.2 · Weighted Sums and Vandermonde". `1\cdot\binom{n}{1} + 2\cdot\binom{n}{2} + \cdots + n\cdot\binom{n}{n} = ?`
- **Beat b:** Six grey dots ("n = 6 people"). Three turn teal (the committee); a gold ring labelled "chair" circles one of them and it turns gold. `r\binom{n}{r}` (teal) with "committee, then chair". The committee resets, the ring pulses, the other two members turn teal again, and `= n\binom{n-1}{r-1}` (gold) appears with "chair, then the rest".
- **Beat c:** `\sum r\binom{n}{r} = n\sum\binom{n-1}{r-1} = n\cdot 2^{n-1}` (result gold), then `n = 4: 1\cdot4 + 2\cdot6 + 3\cdot4 + 4\cdot1 = 32 = 4\cdot 2^3` with a check.
- **Beat d:** Team A (four teal dots) on the left, Team B (four red dots) on the right, "choose 4 of the 8" between them. Gold rings pick one from A and three from B with `k = 1: \binom{4}{1}\binom{4}{3}`, then morph to two and two with `k = 2: \binom{4}{2}\binom{4}{2}`. Then `\binom{2n}{n} = \sum\binom{n}{k}\binom{n}{n-k} = \sum\binom{n}{k}^2`.
- **Beat e:** `n = 4: 1 + 16 + 36 + 16 + 1 = 70 = \binom{8}{4}` with a check.
- **Beat f:** Teams fade and the formulas slide down. A gold box at the top: "Vandermonde's identity", `\sum_k \binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}`.

---

## Scene 4: Remainders and divisibility (Lesson 5.3)

**Narration:**

- **Beat a:** What is the remainder when two to the one hundred is divided by seven? That number has thirty one digits, but you only need the leftover. The trick is to write the base as a multiple of seven, plus something small.
- **Beat b:** Two cubed is eight, which is seven plus one. So two to the one hundred is two times, seven plus one, to the thirty third. Expand. Every term except the last carries a factor of seven, so that power is seven k plus one. Double it: fourteen k plus two. The remainder is two.
- **Beat c:** The same move proves that nine to the n, minus eight n, minus one, is always divisible by sixty four. Write nine as one plus eight. The first two terms are one plus eight n. Every other term carries eight squared, which is sixty four. Subtract the first two terms, and only multiples of sixty four remain.
- **Beat d:** One warning. If the expansion leaves a negative leftover, like minus five when you divide by thirteen, you are not done. A remainder must be between zero and twelve. Borrow one thirteen, and the remainder is eight.

**Visuals:**

- **Beat a:** Header "5.3 · Divisibility and Remainders". `2^{100} \div 7:\ \text{remainder?}`, grey "31 digits. Only the leftover matters.", gold hint "write the base as (multiple of 7) + something small".
- **Beat b:** Steps appear one at a time: `2^3 = 8 = 7 + 1`; `2^{100} = 2\cdot(2^3)^{33} = 2(7+1)^{33}`; `(7+1)^{33} = 7^{33} + \cdots + \binom{33}{1}7 + 1 = 7k + 1`; `2^{100} = 2(7k+1) = 14k + 2`; gold `\text{remainder} = 2`.
- **Beat c:** Title morphs to `9^n - 8n - 1 \text{ is divisible by } 64`. `9^n = (1+8)^n = 1 + 8n + \binom{n}{2}8^2 + \cdots + 8^n` with `1 + 8n` in teal (pulses). Then `9^n - 8n - 1 = 8^2[\binom{n}{2} + \binom{n}{3}8 + \cdots + 8^{n-2}]` with `8^2` in gold, and `n = 3: 729 - 25 = 704 = 64 \times 11` with a check.
- **Beat d:** Red-bordered card "A negative leftover is not a remainder": `5^{99} = 5(26-1)^{49} = 130k - 5`, `130k - 5 = 13(10k - 1) + 8`, gold `\text{remainder} = 8, \text{ not } -5`.

---

## Scene 5: Binomial approximations (Lesson 5.4)

**Narration:**

- **Beat a:** A two percent rise, ten years running, multiplies your money by one point zero two, to the tenth. Write it as one plus x, to the tenth, with x equal to zero point zero two. The terms are one, then ten x, then forty five x squared, and each one is far smaller than the one before.
- **Beat b:** Add them up. One point two one nine, correct to three decimal places. The first two terms alone already give one point two. That is the binomial approximation. For small x, one plus x to the n is roughly one plus n x.
- **Beat c:** On a graph, one plus five x is the tangent line at x equals zero. Near zero it hugs the curve. Keep the x squared term, and the fit lasts longer. Farther out, both peel away. What matters is that n x is small, not just x.
- **Beat d:** And one common slip. One plus x, to the n, is not one plus x to the power n. Try it: one plus zero point zero two to the tenth is basically one. For small x, x to the n is the smallest term, not the important one.

**Visuals:**

- **Beat a:** Header "5.4 · Binomial Approximations". `(1.02)^{10} = (1+x)^{10},\ x = 0.02`. Five rows: term (`1`, `10x`, `45x^2`, `120x^3`, `210x^4`), value (1, 0.2, 0.018, 0.00096, 0.0000336) and a horizontal bar proportional to the value (first two gold, the rest teal slivers).
- **Beat b:** Gold `1 + 0.2 + 0.018 + 0.00096 + \cdots \approx 1.219`; the first two rows pulse; boxed `(1+x)^n \approx 1 + nx` below.
- **Beat c:** Axes (x from −0.6 to 0.6, y from −1 to 8) on the left. `(1+x)^5` in red, `1 + 5x` in teal with a dot at (0, 1), then `1 + 5x + 10x^2` in green. Legend on the right, teal note "tangent line at x = 0", gold "needs nx small, not just x".
- **Beat d:** Red-bordered card: `(1+x)^n \approx 1 + x^n` with a cross; `1 + (0.02)^{10} \approx 1 \text{ but } (1.02)^{10} \approx 1.219`; grey `x^n` "is the smallest term; nx is the important one".

---

## Scene 6: Beyond whole-number powers (Lesson 5.5, JEE preview)

**Narration:**

- **Beat a:** One last step, a preview for J E E. The coefficient n choose r can be written as n, times n minus one, and so on down r factors, all over r factorial. Nothing there needs n to be a whole number.
- **Beat b:** For a whole number n, the factors eventually hit zero, and the series stops. For n equal to minus one, the factors are minus one, minus two, minus three, and they never reach zero. The series goes on forever. One over one minus x is one plus x plus x squared plus x cubed, and so on.
- **Beat c:** But only when x is between minus one and one. At x equals one half, the partial sums creep up to two, just as the formula says. At x equals two, they run one, three, seven, fifteen, and blow up, while the formula claims minus one. Adding positive numbers can never give minus one.
- **Beat d:** Inside that range it is a sharp tool. The square root of one point zero two is about one plus half of zero point zero two, which is one point zero one.

**Visuals:**

- **Beat a:** Header "5.5 · Beyond Whole-Number Powers", purple tag "JEE preview" top right. `\binom{n}{r} = \frac{n(n-1)(n-2)\cdots(n-r+1)}{r!}`, grey note "no factorial of n needed, so n can be any number".
- **Beat b:** `n = 4: 4\cdot3\cdot2\cdot1\cdot0 = 0 \Rightarrow \text{the series stops}`; `n = -1: (-1)(-2)(-3)\cdots \ne 0 \Rightarrow \text{it never stops}`; gold `\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots`.
- **Beat c:** The series slides to the top. `x = \tfrac12: 1, 1.5, 1.75, 1.875, 1.9375, \ldots \to 2` with a check; `x = 2: 1, 3, 7, 15, 31, \ldots \to \infty` with a cross; red `\text{but the formula says } \frac{1}{1-2} = -1`; gold boxed `\text{valid only for } |x| < 1`.
- **Beat d:** `\sqrt{1.02} = (1+0.02)^{1/2} \approx 1 + \tfrac12(0.02) = 1.01`, grey "true value: 1.00995...".

---

## Scene 7: Recap

**Narration:** To recap. Put x equal to one, or minus one, into the whole expression to get coefficient sums. A weighted sum becomes n times two to the n minus one, by choosing a chair. Splitting a choice between two teams gives Vandermonde's identity and the sum of squares of a row. For remainders, write the base as a multiple, plus or minus one, and expand. And when n x is small, one plus x to the n is about one plus n x. Try the chapter five mastery check next.

**Visuals:** Bold title "Chapter 5 in five lines". Five rows appear in turn, each a gold dot, a teal bold label and a formula: Coefficient sums (`\text{put } x = 1 \text{ or } x = -1 \text{ into the whole expression}`), Weighted sums (`\sum r\binom{n}{r} = n\,2^{n-1}`), Vandermonde (`\sum_k\binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}`), Remainders (`\text{base} = (\text{multiple of } d) \pm 1, \text{ then expand}`), Approximation (`(1+x)^n \approx 1 + nx\ (nx \text{ small})`). Gold footer "Next: the Chapter 5 mastery check".
