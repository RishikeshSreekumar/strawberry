# Pascal's Triangle and the Binomial Theorem — Explainer Script

- **Course:** Permutations, Combinations & the Binomial Theorem
- **Chapter:** Chapter 4 · Pascal's Triangle and the Binomial Theorem (id: `pc-4-pascal-and-the-binomial-theorem`)
- **Scene class:** `PcCh4Video` in `videos/scenes/pc-4-pascal-and-the-binomial-theorem.py`
- **Target runtime:** about 5 to 5.5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner sees Pascal's triangle as a counting object: the entry in row n, position r counts the down-left / down-right routes from the top, which are words of n letters with r R's, so the entry is n choose r, and Pascal's adding rule is "look at the last step". Each pattern (row sums two to the power n, symmetry, hockey stick) gets a counting reason, and the "powers of eleven" pattern is shown to break at row five because of carries. Expanding (a + b) to the n is choosing one letter from each bracket, so the coefficient of a to the n minus r, b to the r, is n choose r; (a + b) to the n is not a to the n plus b to the n. The general term T sub r plus one finds any single term (with the off-by-one warning), and it finds a coefficient and a term independent of x. The middle of a row holds the largest binomial coefficient, even n gives one middle term and odd n two, and the ratio T sub r plus one over T sub r finds the numerically greatest term, including ties.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). "L / a" = SECONDARY (teal), "R / b" = PRIMARY (strawberry red), highlights and results = deep gold `#D19A00`, checks = GREEN, warnings = PRIMARY with a cross mark. Maths uses `MathTex` with `{}^nC_r` notation. Rows and positions of the triangle are numbered from zero. Each scene has a small grey lesson header top left. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("n choose r", "T sub r plus one", "two to the power n").

---

## Scene 0: Title card

**Narration:** Chapter four. Pascal's triangle and the binomial theorem.

**Visuals:** kicker "Permutations, Combinations & the Binomial Theorem", title "Chapter 4 · Pascal's Triangle and the Binomial Theorem".

---

## Scene 1: Hook. A triangle built by adding (Lesson 4.1)

**Narration:**

- **Beat a:** Put a one at the top. Every number below it is the sum of the two numbers just above, and a missing neighbour counts as zero.
- **Beat b:** One, one. One, two, one. One, three, three, one. Then one, four, six, four, one. The rule is easy to follow. The real question is, what are these numbers counting?

**Visuals:**

- **Beat a:** Header "4.1 · Pascal's Triangle as Paths". Rows 0 and 1 appear. For the 2 in row 2, two small arrows from the parent 1s, then the 2 pops in.
- **Beat b:** Rows 2 to 5 appear row by row; the 3 in row 3 and the 6 in row 4 get parent arrows. Question text "What do these numbers count?" in gold under the triangle.

---

## Scene 2: Entries count paths (Lesson 4.1)

**Narration:**

- **Beat a:** Drop a ball at the top. At every number it bounces down to the left or down to the right. Call those L and R. Counting rows and positions from zero, how many routes end at row four, position two, the six?
- **Beat b:** Here they are. Every route makes four bounces, and exactly two of them must be R. So a route is a four letter word with two R's. Picking the word means picking which two of the four bounces are R. That is four choose two, which is six.
- **Beat c:** The same argument works everywhere. The number in row n, position r counts words of n letters with r R's. So it is n choose r.
- **Beat d:** And the adding rule? Look at the last bounce. A route to the six arrives either from the three up on the left, with a final R, or from the three up on the right, with a final L. Three plus three is six. That is Pascal's rule.

**Visuals:**

- **Beat a:** Triangle rows 0 to 4 on the left. The 6 at (4, 2) gets a gold box.
- **Beat b:** Six coloured polylines drawn one after another through the triangle; each route's L/R word (LLRR, LRLR, LRRL, RLLR, RLRL, RRLL) appears in a 2 by 3 grid on the right, R letters red and L letters teal. Then `\#\text{routes} = {}^4C_2 = 6`.
- **Beat c:** Every entry morphs into its `{}^nC_r` label; `\text{row } n,\ \text{position } r = {}^nC_r` on the right; entries morph back.
- **Beat d:** Arrows from (3, 1) and (3, 2) into (4, 2), labelled R and L. `3 + 3 = 6`, then `{}^nC_r = {}^{n-1}C_{r-1} + {}^{n-1}C_r` with "last step R" / "last step L" under the two terms.

---

## Scene 3: Patterns with reasons (Lesson 4.2)

**Narration:**

- **Beat a:** Every pattern in the triangle has a counting reason. Add row four: sixteen, two to the power four. The row counts every route of four bounces, and each bounce has two choices. So row n always adds to two to the power n.
- **Beat b:** Every row reads the same backwards. Swap every L with R, and a route to position r becomes a route to position n minus r.
- **Beat c:** Now run down a diagonal and add: one, three, six, ten, fifteen. Thirty five, the entry just below and to the right, like the blade of a hockey stick. The reason: to choose three numbers from one to seven, split by the largest number chosen.
- **Beat d:** Rows zero to four, read as numbers, are powers of eleven. But row five has two digit entries. The tens carry, and eleven to the power five is one six one zero five one, not the row read straight off. The pattern holds only while every entry is a single digit.

**Visuals:**

- **Beat a:** Triangle rows 0 to 7 on the left, header "4.2 · Patterns in the Triangle". Row 4 boxed in gold; right panel `1 + 4 + 6 + 4 + 1 = 16 = 2^4`, then `{}^nC_0 + \cdots + {}^nC_n = 2^n`.
- **Beat b:** Dashed mirror line down the middle; matching pairs (4, 1)/(4, 3) and (6, 2)/(6, 4) flash together. Right panel `{}^nC_r = {}^nC_{n-r}`.
- **Beat c:** Entries 1, 3, 6, 10, 15 on the r = 2 diagonal turn red, 35 in row 7 turns gold, a stick-shaped polyline through them. Right: `1 + 3 + 6 + 10 + 15 = 35` and `{}^2C_2 + \cdots + {}^6C_2 = {}^7C_3`.
- **Beat d:** Right panel lists `1, 11, 121, 1331, 14641` as `11^0 … 11^4` with checks. Row 5 boxed; `1\,5\,10\,10\,5\,1 \to 15101051` with a cross, and `11^5 = 161051`.

---

## Scene 4: Expanding by choosing (Lesson 4.3)

**Narration:**

- **Beat a:** Now expand a plus b, cubed. Write out three brackets. To make one term of the product, pick one letter from each bracket and multiply. Two choices, three times: eight picks.
- **Beat b:** Group the picks by how many b's they contain. One has no b. Three have one b, because you choose which bracket gives the b: three choose one. Three have two b's, and one has three. One, three, three, one. Row three of the triangle.
- **Beat c:** With n brackets, the term a to the n minus r, b to the r, appears once for every choice of which r brackets give b. That is the binomial theorem.
- **Beat d:** So a plus b, to the power n, is not a to the n plus b to the n. That keeps only the all a and all b picks and throws the mixed ones away. Try a and b equal to one, squared. Four, not two.

**Visuals:**

- **Beat a:** Header "4.3 · Expanding (a + b)^n by Choosing". `(a+b)^3 = (a+b)(a+b)(a+b)`. Eight tiles: aaa, aab, aba, abb, baa, bab, bba, bbb (a teal, b red).
- **Beat b:** Tiles slide into four columns by number of b's. Under each: `a^3`, `3a^2b`, `3ab^2`, `b^3`; the "3" is gold. `{}^3C_1 = 3` over the second column.
- **Beat c:** Tiles fade. Boxed `(a+b)^n = \sum_{r=0}^{n} {}^nC_r\, a^{n-r} b^r`, with "choose which r brackets give b" under `{}^nC_r`.
- **Beat d:** Card `(a+b)^n \ne a^n + b^n` with a cross; `(1+1)^2 = 4` vs `1^2 + 1^2 = 2`.

---

## Scene 5: The general term (Lesson 4.4)

**Narration:**

- **Beat a:** Often you need one term, not all of them. The term with r b's is term number r plus one, because r starts at zero. T sub r plus one equals n choose r, a to the n minus r, b to the r. Mixing up r and r plus one is the classic slip.
- **Beat b:** Find the coefficient of x to the fifth in two x minus three, to the eighth. Here a is two x, and b is minus three, sign included. The power of x is eight minus r, so r is three, and we want the fourth term. Eight choose three is fifty six. Two to the fifth is thirty two. Minus three, cubed, is minus twenty seven. The coefficient is minus forty eight thousand, three hundred and eighty four.
- **Beat c:** For the term free of x in x squared plus one over x, to the ninth, collect the powers of x: eighteen minus three r. Set that power to zero. r is six, so it is the seventh term, nine choose six, which is eighty four.

**Visuals:**

- **Beat a:** Header "4.4 · The General Term". Boxed `T_{r+1} = {}^nC_r\, a^{n-r} b^r`. Small note `r = 0 \to T_1` with a warning colour.
- **Beat b:** Formula moves to the top. Steps appear one by one: `(2x - 3)^8:\ a = 2x,\ b = -3`; `T_{r+1} = {}^8C_r (2x)^{8-r}(-3)^r`; `8 - r = 5 \Rightarrow r = 3`; `T_4 = {}^8C_3 (2x)^5 (-3)^3 = 56 \cdot 32 \cdot (-27)\, x^5`; gold `\text{coefficient} = -48384`.
- **Beat c:** Steps replaced: `(x^2 + \tfrac1x)^9`; `T_{r+1} = {}^9C_r (x^2)^{9-r} x^{-r} = {}^9C_r\, x^{18-3r}`; `18 - 3r = 0 \Rightarrow r = 6`; gold `T_7 = {}^9C_6 = 84`.

---

## Scene 6: Middle terms and the greatest term (Lesson 4.5)

**Narration:**

- **Beat a:** Along any row, the numbers climb, peak in the middle, and fall back. Row ten peaks at two hundred and fifty two. Why the middle? Compare neighbours. n choose r plus one, over n choose r, is n minus r over r plus one. That is bigger than one until you pass the middle.
- **Beat b:** So the middle term carries the largest coefficient. There are n plus one terms. Even n gives one middle term. Odd n gives two, tied by symmetry. In x minus two over x, to the tenth, the middle term is T six: two hundred and fifty two times minus thirty two, which is minus eight thousand and sixty four.
- **Beat c:** When a and b are numbers, the coefficient is not the whole story. Compare each term with the one before it. Keep stepping while the ratio is at least one. The last step up is the greatest term, and if the ratio is exactly one, two terms tie. In three plus two x, to the ninth, at x equals one, T four and T five tie.

**Visuals:**

- **Beat a:** Header "4.5 · Middle Terms and the Largest Coefficient". Bar chart of row 10 (bars grow from the baseline, values above, r below); the 252 bar gold. Right: `\frac{{}^nC_{r+1}}{{}^nC_r} = \frac{n-r}{r+1}` and `> 1 \iff r < \frac{n-1}{2}`.
- **Beat b:** Chart shrinks up-left. Card: "n even: one middle term `T_{\frac n2 + 1}`", "n odd: two, `T_{\frac{n+1}2}` and `T_{\frac{n+3}2}`". Example `\left(x - \tfrac2x\right)^{10}:\ T_6 = {}^{10}C_5\, x^5\left(-\tfrac2x\right)^5 = -8064`.
- **Beat c:** Replace with `\frac{T_{r+1}}{T_r} = \frac{n-r+1}{r}\cdot\frac{b}{a}`, the rule "last r with ratio \ge 1", and `(3+2x)^9,\ x = 1:\ \frac{10-r}{r}\cdot\frac23 = 1 \text{ at } r = 4 \Rightarrow T_4 = T_5 = 489888`.

---

## Scene 7: Recap

**Narration:** To recap. Every entry of Pascal's triangle counts paths, so it is n choose r, and the adding rule is just the last step. Each pattern has a counting reason. Expanding a plus b to the n is choosing which brackets give b. The general term, T sub r plus one, finds any single term, so watch the plus one. And the middle holds the largest coefficient, while the ratio test finds the greatest term. Next chapter, we put these coefficients to work.

**Visuals:** Header "Recap". Five lines appear one per sentence, each a small red dot, text and a formula: paths `{}^nC_r`; patterns `2^n,\ {}^nC_r = {}^nC_{n-r}`; choosing `(a+b)^n = \sum {}^nC_r a^{n-r}b^r`; `T_{r+1}`; middle / ratio test. Final line "Next: binomial coefficients at work" in gold.
