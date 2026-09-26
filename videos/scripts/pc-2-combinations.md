# Combinations: Choosing Things — Explainer Script

- **Course:** Permutations, Combinations & the Binomial Theorem
- **Chapter:** Chapter 2 · Combinations: Choosing Things (id: `pc-2-combinations`)
- **Scene class:** `PcCh2Video` in `videos/scenes/pc-2-combinations.py`
- **Target runtime:** about 5 to 5.5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner sees a selection as an arrangement with the order forgotten: every group of r things shows up r factorial times in the arrangement list, so n choose r equals n P r divided by r factorial. They use the swap test (does swapping two chosen things change the outcome?) to decide between P and C, and so avoid the "captain and vice-captain is a combination" trap. They prove identities by counting one collection two ways (symmetry, Pascal's rule). They handle restrictions with cases or the complement and know why "choose one woman first, then any four" overcounts. They split problems into choose-then-arrange, count diagonals and lines with collinear points, and count all selections: two to the power n for distinct items, (p + 1)(q + 1)... for identical items and for divisors.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). The six pairs of the hook each get their own colour and keep it wherever they appear. "Chosen / in" = PRIMARY (strawberry red), "left out / stays" = SECONDARY (teal), special person (Meera) = deep gold `#D19A00`, results and totals = gold, warnings = PRIMARY with a cross mark, checks = GREEN. Maths uses `MathTex` with `{}^nC_r` notation. Each scene has a small grey lesson header top left. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("n choose r", "n P r", "r factorial", "two to the power n").

---

## Scene 0: Title card

**Narration:** Chapter two. Combinations. Choosing things.

**Visuals:** kicker "Permutations, Combinations & the Binomial Theorem", title "Chapter 2 · Combinations: Choosing Things".

---

## Scene 1: Hook. Twelve pairs that are really six (Lesson 2.1)

**Narration:**

- **Beat a:** Four friends: Asha, Ben, Chitra and Dev. Two of them will go out to buy snacks. How many different pairs could go?
- **Beat b:** Fill two slots, the way we did in chapter one. Four choices for the first person, three for the second. Twelve. But look at the list. Asha then Ben is the same snack run as Ben then Asha. The same two people walk out of the door.
- **Beat c:** Group the list by who is in it. Every pair shows up exactly twice. Twelve divided by two: six pairs.

**Visuals:**

- **Beat a:** Header "2.1 · From Arrangements to Selections". Four coloured name chips A, B, C, D with names underneath. Question "How many different pairs?".
- **Beat b:** `4 \times 3 = 12`. Twelve ordered-pair tiles in a 3 by 4 grid (AB, AC, AD, BA, ...), each coloured by the set it contains. AB and BA get gold boxes.
- **Beat c:** Tiles slide into six columns of two (AB over BA, AC over CA, ...). `12 \div 2 = 6` and the card "same two people, same snack run".

---

## Scene 2: n choose r, and the swap test (Lesson 2.1)

**Narration:**

- **Beat a:** Why exactly twice? Once two people are chosen, there are two factorial ways to put them in order. Take three people out of five instead. One group, like A, B, C, can be written in three factorial, six, orders. So sixty arrangements collapse into ten selections.
- **Beat b:** In general, count the arrangements in two stages. First choose which r things. Call that number n choose r. Then arrange them, in r factorial ways. Together that must equal n P r. So n choose r is n P r divided by r factorial, which is n factorial over r factorial times n minus r factorial.
- **Beat c:** Before you use it, run one test. If I swap two of the chosen things, do I get a different outcome? For a captain and a vice captain from eleven players, the answer is yes. Swap them and the outcome changes. Roles make order matter, so the answer is eleven P two, one hundred and ten, not fifty five.

**Visuals:**

- **Beat a:** `\{A, B, C\}` on the left, arrow, six tiles ABC, ACB, BAC, BCA, CAB, CBA; label `3! = 6` orders. Below, `{}^5P_3 = 60`, `60 \div 3! = 10` selections.
- **Beat b:** `{}^nP_r = {}^nC_r \times r!` with "choose" and "arrange" under the two factors. Then boxed `{}^nC_r = \frac{{}^nP_r}{r!} = \frac{n!}{r!\,(n-r)!}`.
- **Beat c:** Card "Swap two chosen things. Different outcome? Yes: P. No: C." Captain / vice example: `{}^{11}P_2 = 110` with a check, `{}^{11}C_2 = 55` with a cross.

---

## Scene 3: Identities by counting (Lesson 2.2)

**Narration:**

- **Beat a:** Identities come from one trick: count the same collection in two ways. Ten students, and eight go on a trip. Choosing the eight who go is the same as choosing the two who stay. So ten choose eight equals ten choose two. In general, n choose r equals n choose n minus r.
- **Beat b:** Pascal's rule. Count committees of r from n plus one people. Single out one person, Meera. Either Meera is in, and the other r minus one come from the remaining n. Or Meera is out, and all r come from the other n. The two cases never overlap, so we add.
- **Beat c:** In Pascal's triangle this says every entry is the sum of the two above it. Five choose one plus five choose two: five plus ten, fifteen. That is six choose two.

**Visuals:**

- **Beat a:** Ten dots in a row; eight turn red under a brace "8 go", two turn teal under a brace "2 stay". `{}^{10}C_8 = {}^{10}C_2 = 45`, then `{}^nC_r = {}^nC_{n-r}`.
- **Beat b:** Gold "Meera" dot next to a group of n grey dots. Two boxes: "Meera in" `{}^nC_{r-1}` and "Meera out" `{}^nC_r`. Formula `{}^nC_{r-1} + {}^nC_r = {}^{n+1}C_r`.
- **Beat c:** Pascal's triangle rows 0 to 6. The 5 and the 10 in row 5 glow, then the 15 below them. `{}^5C_1 + {}^5C_2 = {}^6C_2`.

---

## Scene 4: Selections with restrictions (Lesson 2.3)

**Narration:**

- **Beat a:** Real committees have rules. Choose five people from six men and four women, with at least two women. Split into cases: exactly two women, three, or four. One hundred and twenty, plus sixty, plus six. One hundred and eighty six.
- **Beat b:** Or count the opposite. All committees: ten choose five, two hundred and fifty two. Take away the ones with no women, six, and with exactly one woman, sixty. Two hundred and fifty two minus sixty six is one hundred and eighty six again. Two routes, one answer.
- **Beat c:** Now a shortcut that fails. For at least one woman, pick one woman first, then any four of the other nine. Four times one hundred and twenty six is five hundred and four. That is more than the two hundred and fifty two committees that exist at all.
- **Beat d:** Shrink it to see why. Two women, two men, choose two. The shortcut lists woman one then woman two, and also woman two then woman one. That is the same committee, counted twice. A committee with k women gets counted k times. Use cases, or the complement.

**Visuals:**

- **Beat a:** Header "2.3 · Selections with Restrictions". Problem line on top. Left column "Cases": three rows `{}^4C_2 \times {}^6C_3 = 120`, `{}^4C_3 \times {}^6C_2 = 60`, `{}^4C_4 \times {}^6C_1 = 6`, total `186`.
- **Beat b:** Right column "Complement": `{}^{10}C_5 = 252`, `-\,{}^6C_5 = 6`, `-\,{}^4C_1 \times {}^6C_4 = 60`, `252 - 66 = 186`. Green check between the columns.
- **Beat c:** `{}^4C_1 \times {}^9C_4 = 504` next to `> 252` with a cross.
- **Beat d:** Six rows "first woman / then anyone / committee"; the two `\{W_1, W_2\}` rows light up red. Card "a committee with k women is counted k times".

---

## Scene 5: Choose, then arrange (Lesson 2.4)

**Narration:**

- **Beat a:** Many problems hide two stages: choose which things, then arrange them. Words with three consonants from seven and two vowels from four: seven choose three, times four choose two, times five factorial. Twenty five thousand two hundred. Choose with C, and arrange only once, at the end.
- **Beat b:** Shapes are selections of points. A hexagon's six corners give six choose two, fifteen segments. Six of them are sides, so nine are diagonals. In general, n times n minus three, over two.
- **Beat c:** Collinear points need care. Twelve points, and four of them sit on one line. Those four give four choose two, six pairs, but they all make the same line. So subtract six and add that one line back: sixty one lines. For triangles, the four flat triples make nothing: two hundred and twenty minus four, two hundred and sixteen.

**Visuals:**

- **Beat a:** `{}^7C_3 \times {}^4C_2 \times 5!` with braces "choose", "choose", "arrange", then `= 35 \times 6 \times 120 = 25200`. Warning card "choose with C, arrange once".
- **Beat b:** Hexagon on the left: sides in ink, then nine diagonals in red. Right: `{}^6C_2 = 15`, `15 - 6 = 9`, boxed `\frac{n(n-3)}{2}`.
- **Beat c:** Twelve points, four of them on a teal line. Right: `{}^{12}C_2 - {}^4C_2 + 1 = 61` lines, `{}^{12}C_3 - {}^4C_3 = 216` triangles.

---

## Scene 6: All possible selections (Lesson 2.5)

**Narration:**

- **Beat a:** Last question: choose any number of things. None, some, or all. Walk past each topping and decide: in or out. Two choices each. Three toppings give two times two times two, eight pizzas, and n items give two to the power n.
- **Beat b:** Now group those eight leaves by how many toppings are in. One, three, three, one. That is the sum of three choose r. So the sum of n choose r, over every r, is two to the power n.
- **Beat c:** Identical items change the question. From three identical apples you only decide how many: zero, one, two or three. Four options, not eight.
- **Beat d:** Divisors work the same way. Three hundred and sixty is two cubed, times three squared, times five. A divisor takes zero to three twos, zero to two threes, and zero or one five. Four times three times two: twenty four divisors.

**Visuals:**

- **Beat a:** Binary tree, levels labelled Onion, Corn, Paneer; "in" branches red, "out" branches grey; 8 leaves. Right: `2 \times 2 \times 2 = 8`, then `2^n`.
- **Beat b:** Each leaf gets its number of ins (3, 2, 2, 1, 2, 1, 1, 0). Right: `1 + 3 + 3 + 1 = 8` and `{}^nC_0 + {}^nC_1 + \cdots + {}^nC_n = 2^n`.
- **Beat c:** Three identical red apples; options 0, 1, 2, 3 in chips; `3 + 1 = 4`; a cross beside `2^3 = 8`.
- **Beat d:** `360 = 2^3 \times 3^2 \times 5`, then `(3+1)(2+1)(1+1) = 24`.

---

## Scene 7: Recap

**Narration:** Chapter two comes down to two questions. First: arrange, or choose? Swap two chosen things. If the outcome changes, use P. If not, use C. Second: cases, or complement? Count whichever side is shorter, and never guarantee a condition by placing one item first. Then watch for collinear points, identical items, and problems that choose, then arrange. Now open lesson two point one, and try it yourself.

**Visuals:** Two question cards: "Arrange or choose?" (swap test) and "Cases or complement?". Three chips below: "collinear points", "identical items: (p+1)(q+1)", "choose, then arrange".
