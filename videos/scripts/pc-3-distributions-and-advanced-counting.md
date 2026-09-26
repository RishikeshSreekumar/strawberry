# Distributions and Advanced Counting — Explainer Script

- **Course:** Permutations, Combinations & the Binomial Theorem
- **Chapter:** Chapter 3 · Distributions and Advanced Counting (id: `pc-3-distributions-and-advanced-counting`)
- **Scene class:** `PcCh3Video` in `videos/scenes/pc-3-distributions-and-advanced-counting.py`
- **Target runtime:** about 5 to 5.5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner sees that a distribution problem is decided by what is identical and what is named. They split people into groups with the multinomial count, and divide by k factorial only for equal-sized groups with no names. They turn identical objects into boxes into a row of stars and bars, counted by n plus k minus 1 choose k minus 1, and handle lower bounds by paying out first and upper bounds by subtracting the rule-breakers (x at most 3 is broken by x at least 4). They count different objects into different boxes as k to the power n, and use inclusion–exclusion for "no box empty". Finally they pick a model with three questions: does order matter, can things repeat, what is identical. Named traps: "equal groups count like named groups", "it's just n choose k", "off by one at the boundary", "is it 3 to the 5 or 5 to the 3".

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: groups/teams in PRIMARY (red), SECONDARY (teal), PURPLE; stars = amber `ACCENT`; bars = INK; results and totals = deep gold `#D19A00`; warnings = PRIMARY with a cross mark; checks = GREEN. Each scene has a small grey lesson header top left. Maths uses `MathTex`. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("twelve factorial", "three to the power five", "nine choose two").

---

## Scene 0 — Title card

**Narration:** Chapter three. Distributions and advanced counting.

**Visuals:** kicker "Permutations, Combinations & the Binomial Theorem", title "Chapter 3 · Distributions and Advanced Counting".

---

## Scene 1 — Hook: same numbers, different answers

**Narration:**

- **Beat a:** Give five books to three students. How many ways? It depends. If the books are all different, each book picks a student: three to the power five, two hundred and forty three.
- **Beat b:** If the books are identical, all that matters is how many each student gets: just twenty one. Same five, same three, a completely different answer. This chapter is about noticing what is identical, what has a name, and choosing the right count.

**Visuals:**

- **Beat a:** Three student chips (Riya, Kabir, Meera) on the right. Five coloured book rectangles on the left, each labelled 1..5. Arrows from each book fan to students. `3^5 = 243` in gold.
- **Beat b:** Books recolour to identical amber. A count triple `(2, 2, 1)` appears under the students. `21` in gold. Card "What is identical? What has a name?".

---

## Scene 2 — Dividing into groups (Lesson 3.1)

**Narration:**

- **Beat a:** Twelve students go to three projects: five on the bridge, four on the poster, three on the quiz. Give each student a letter for their team. Then a split is a twelve letter word with five B's, four P's and three Q's. So the count is twelve factorial over five factorial, four factorial, three factorial: twenty seven thousand seven hundred and twenty.
- **Beat b:** Now take the names away. Four friends pair up for doubles. With teams A and B there are six ways. But A A B B and B B A A are the same two pairs with the names swapped. Every split was counted twice. So there are three.
- **Beat c:** In general, for equal sized groups with no names, divide by the number of ways to hand out the names. Twelve students in three unnamed groups of four: thirty four thousand six hundred and fifty, divided by three factorial, five thousand seven hundred and seventy five. Groups of different sizes never need this, their size already names them.

**Visuals:**

- **Beat a:** Header "3.1 · Dividing into Groups". Twelve small tiles in a row, letters B B B B B P P P P Q Q Q coloured red, teal, purple. Formula `\frac{12!}{5!\,4!\,3!} = 27\,720`.
- **Beat b:** Six words stacked in two columns: AABB | BBAA, ABAB | BABA, ABBA | BAAB, with a gold brace "= same pairs" on each row. Formula `6 \div 2! = 3`. Warning card "Equal groups with no names: divide by k!".
- **Beat c:** `\frac{12!}{(4!)^3\,3!} = \frac{34\,650}{6} = 5775` and definition card `\frac{(mn)!}{(m!)^n\,n!}`.

---

## Scene 3 — Stars and bars (Lesson 3.2)

**Narration:**

- **Beat a:** Four identical toffees for three children. Only the amounts matter. Line the toffees up as stars, and drop in two bars to cut the line into three parts. Star star, bar, star, bar, star means two, one, one. Bar, four stars, bar means nought, four, nought.
- **Beat b:** Every sharing is exactly one row of four stars and two bars. Six positions, choose which two are bars: six choose two, fifteen. In general, n identical things into k boxes: n plus k minus one, choose k minus one.
- **Beat c:** Careful: it is not four choose three, which is only four. That formula picks different things without repeats. Here a child can take several toffees. The same count solves equations too: x plus y plus z equals ten, in whole numbers, is ten stars and two bars. Twelve choose two, sixty six.

**Visuals:**

- **Beat a:** Header "3.2 · Stars and Bars". Three child chips (Arjun, Bela, Chirag). Row of 4 amber stars; two bars slide in; brace labels under parts "2 · 1 · 1". Row morphs to `| ★★★★ |` with "0 · 4 · 0".
- **Beat b:** Six boxes numbered 1..6, two marked with bars. `{}^6C_2 = 15`. Definition card `{}^{n+k-1}C_{k-1}`.
- **Beat c:** `{}^4C_3 = 4` crossed out. `x + y + z = 10` → `{}^{12}C_2 = 66`.

---

## Scene 4 — Lower and upper bounds (Lesson 3.3)

**Narration:**

- **Beat a:** Now add rules. Ten toffees, three children, and everyone gets at least one. Hand out one each first. Seven toffees are left with no rules at all: nine choose two, thirty six.
- **Beat b:** An upper bound cannot be paid out. So count the rule breakers and subtract. x plus y plus z equals ten with x at most three. All solutions: sixty six. The rule is broken when x is at least four. Pay out four: six left, eight choose two, twenty eight. Answer: thirty eight.
- **Beat c:** Watch the boundary. At most three is broken by at least four, not at least three. Subtracting the at least three cases throws away the allowed value three.

**Visuals:**

- **Beat a:** Header "3.3 · Lower and Upper Bounds". Ten amber stars; three drop into child chips (one each). Seven remain. `x' + y' + z' = 7 \Rightarrow {}^9C_2 = 36`.
- **Beat b:** `x \le 3`: `66 - 28 = 38`. Side column: `x \ge 4:\; x' + y + z = 6 \Rightarrow {}^8C_2 = 28`.
- **Beat c:** Number line 0..10 for x, 0..3 green (allowed), 4..10 red (broken). A wrong mark at 3 crossed out. Warning card "x ≤ 3 is broken by x ≥ 4".

---

## Scene 5 — Distinct objects into distinct boxes (Lesson 3.4)

**Narration:**

- **Beat a:** Five different letters, three postboxes. Think about the letters, not the boxes. Each letter chooses a box, three choices each, whatever the others did. Three to the power five, two hundred and forty three. Not five to the power three: a box can hold many letters, or none.
- **Beat b:** Now demand that no box is empty. Count the bad ones. Pick a box to leave empty, three ways, and the letters use the other two: two to the power n each. But a distribution with every letter in one box was subtracted twice, so add those three back.
- **Beat c:** Three to the n, minus three times two to the n, plus three. For five letters: two hundred and forty three minus ninety six plus three, one hundred and fifty. This is inclusion–exclusion: add the singles, subtract the pairs, add the triple.

**Visuals:**

- **Beat a:** Header "3.4 · Distinct into Distinct". Five letter chips L1..L5 top; three postboxes P, Q, R bottom. Each letter shows "3 choices". `3 \times 3 \times 3 \times 3 \times 3 = 3^5 = 243`. `5^3` crossed out.
- **Beat b:** Three overlapping circles labelled "P empty", "Q empty", "R empty"; each lights with `2^n`; pairwise overlaps glow with `1`.
- **Beat c:** `\#\text{onto} = 3^n - 3\cdot 2^n + 3` and `n = 5:\; 243 - 96 + 3 = 150`. Check line `n = 3:\; 27 - 24 + 3 = 6 = 3!` with a green tick.

---

## Scene 6 — Choosing the right model (Lesson 3.5)

**Narration:**

- **Beat a:** So which formula? Ask three questions. Does order matter? Can things repeat? And what is identical?
- **Beat b:** Watch four stories with the same numbers. Five different books to three students: three to the five, two hundred and forty three. Five identical books: stars and bars, twenty one. Three different prizes to five students, one each at most: five times four times three, sixty. Three identical prizes: five choose three, ten.
- **Beat c:** And when two models both seem to fit, shrink the numbers until you can list every case by hand, and see which formula agrees.

**Visuals:**

- **Beat a:** Header "3.5 · Choosing the Right Model". Three question cards stacked: "1. Does order matter?", "2. Can things repeat?", "3. What is identical?".
- **Beat b:** 2 by 2 grid of story cards with answers in gold: `3^5 = 243`, `{}^7C_2 = 21`, `{}^5P_3 = 60`, `{}^5C_3 = 10`.
- **Beat c:** Tip card "Stuck between two models? Shrink it and list it."

---

## Scene 7 — Recap (Lesson 3.6)

**Narration:** Here is the toolkit. Groups: n factorial over the group factorials, and divide by k factorial only for equal groups with no names. Identical things into boxes: stars and bars. Lower bounds: pay out first. Upper bounds: subtract the rule breakers. Different things into boxes: k to the n, and inclusion–exclusion when no box may be empty. Next chapter, these same choices build Pascal's triangle and the binomial theorem.

**Visuals:** Checklist of five rows with ticks and formulas: `\frac{n!}{n_1!\cdots n_k!}`, `{}^{n+k-1}C_{k-1}`, "pay out first", "all − breakers", `k^n`. Ends with card "Next: Pascal's Triangle and the Binomial Theorem".
