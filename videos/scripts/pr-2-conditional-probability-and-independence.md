# Conditional Probability and Independence — Explainer Script

- **Course:** Probability
- **Chapter:** Chapter 2 · Conditional Probability and Independence (id: `pr-2-conditional-probability-and-independence`)
- **Scene class:** `PrCh2Video` in `videos/scenes/pr-2-conditional-probability-and-independence.py`
- **Target runtime:** about 5 to 5.5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner sees that new information shrinks the sample space: given B, only the outcomes in B survive, and P(A | B) = P(A ∩ B)/P(B) rescales B to be the new universe. They read a two-way table by picking a row or a column, and they never swap P(A | B) with P(B | A). They rearrange the definition into the multiplication rule and use it for draws without replacement, where every factor after the first is conditional. They test independence with numbers (first die even vs sum 7 is independent, vs sum 8 is not), know P(A ∩ B) = P(A)P(B) as the definition, and do not confuse independent with mutually exclusive. They draw trees, multiply along a branch, add across branches, and use the leaf sum as a check. They handle series and parallel systems and "at least one" through 1 − P(none), and they reject "three 50% chances make a sure thing". Finally they see why the precise conditioning event matters in the two-child problem and Bertrand's box.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: event A = PRIMARY (strawberry red), event B / the given event = SECONDARY (teal), results and highlights = deep gold `#D19A00`, rules = PURPLE, warnings = PRIMARY with a cross, checks = GREEN. Outcomes ruled out by the given information are greyed (MUTED fill at low opacity). The two-dice grid is 6 by 6 with the first die along the bottom (red numbers) and the second die up the side (teal numbers), same as Chapter 0. Maths uses `MathTex`. Each scene has a small grey lesson header top left. Clear the frame with `FadeOut` between scenes.

**TTS note:** symbols are spoken as words: "the probability of A given B", "A and B", "four over fifty two", "one half cubed". Where a lone letter could be read as an article, the narration says "event A".

---

## Scene 0 — Title card

**Narration:** Chapter two. Conditional probability and independence.

**Visuals:** kicker "Probability", title "Chapter 2 · Conditional Probability and Independence".

---

## Scene 1 — Shrinking the sample space (Lesson 2.1)

**Narration:**

- **Beat a:** A friend rolls two dice behind a book. What is the chance the first die shows a six? Six cells out of thirty six. One sixth.
- **Beat b:** Then they add: the total is at least ten. Most outcomes just became impossible, so grey them out. Six cells survive, and three of them have a six first. The chance is now three out of six, one half. The news tripled it.
- **Beat c:** That is conditional probability. Given event B, B becomes the new universe. Count the part of A inside B, and divide by the size of B. Divide top and bottom by thirty six, and the counts become probabilities: the probability of A given B is the probability of A and B, over the probability of B.
- **Beat d:** Survey data works the same way. Conditioning means picking a row or a column and forgetting the rest. Of forty girls, fourteen play cricket: zero point three five. Of fifty cricketers, fourteen are girls: zero point two eight. Same fourteen students, different universe. The bar is not symmetric.

**Visuals:**

- **Beat a:** Dice grid (left). Column "first die = 6" fills light red. Right: label card "A: first die is 6" and `P(A) = 6/36 = 1/6`.
- **Beat b:** Label card "B: sum is at least 10" (teal). Every cell outside B greys out. B's six cells are teal; the three in A ∩ B turn solid red. `P(A | B) = 3/6 = 1/2` in gold, with "was 1/6" beneath.
- **Beat c:** Right panel replaced by `P(A|B) = n(A∩B)/n(B)`, then `= P(A∩B)/P(B)` and a definition card "B becomes the new sample space".
- **Beat d:** Grid fades. A 3 by 3 two-way table (Boy/Girl × Cricket/Doesn't/Total: 36 24 60 / 14 26 40 / 50 50 100). The Girl row is boxed in red and `P(cricket | girl) = 14/40 = 0.35` appears; then the Cricket column is boxed in teal and `P(girl | cricket) = 14/50 = 0.28` appears. The cell 14 flashes gold. A warning card reads `P(A|B) ≠ P(B|A)`.

---

## Scene 2 — The multiplication rule (Lesson 2.2)

**Narration:**

- **Beat a:** The definition is a division. Multiply across, and it becomes the multiplication rule: the probability of A and B equals the probability of A, times the probability of B given A. Read it as a story. First A happens. Then, in the world where A happened, B happens.
- **Beat b:** Two cards are dealt. What is the chance both are aces? The first is an ace with probability four over fifty two. Now the deck has changed: fifty one cards, three aces. So the second factor is three over fifty one. Multiply: one over two hundred and twenty one.
- **Beat c:** The common slip is four over fifty two, twice. That is the answer only if the first card goes back. Without replacement, every factor after the first is a conditional probability. Three kings in a row: four over fifty two, times three over fifty one, times two over fifty.

**Visuals:**

- **Beat a:** `P(B|A) = P(A∩B)/P(A)` transforms into `P(A∩B) = P(A) P(B|A)`. Card: "first A, then B in the world where A happened".
- **Beat b:** Two card-stacks: "52 cards, 4 aces" → `4/52`, then "51 cards, 3 aces" → `3/51`, joined by ×, with `= 1/221` in gold.
- **Beat c:** Red card `4/52 × 4/52 = 1/169` labelled "with replacement" is crossed out. Then the chain `P(A∩B∩C) = P(A) P(B|A) P(C|A∩B)` and `4/52 · 3/51 · 2/50`.

---

## Scene 3 — Independence (Lesson 2.3)

**Narration:**

- **Beat a:** Sometimes the news changes nothing. Let event A be: the first die is even, one half. Now learn that the sum is seven. Surely that says something about the first die? Grey out the rest. Six cells survive, and the first die is even in three. One half. Exactly what it was.
- **Beat b:** Change the news to: the sum is eight. Five cells survive, three with an even first die. Three fifths. This time the news mattered.
- **Beat c:** When the news changes nothing, the events are independent. Put that into the multiplication rule and you get the definition: the probability of A and B equals the probability of A times the probability of B. Check it: three over thirty six is one half times one sixth. And independent is not mutually exclusive. If two events cannot happen together, learning one tells you the other did not happen. They are as dependent as events can be.

**Visuals:**

- **Beat a:** Dice grid. Columns 2, 4, 6 fill light red; `P(A) = 1/2`. Sum-7 diagonal in teal; everything else greys. Three red cells; `P(A | sum 7) = 3/6 = 1/2` with a green check "no change".
- **Beat b:** Grid resets, then sum-8 diagonal; `P(A | sum 8) = 3/5 ≠ 1/2` with "dependent".
- **Beat c:** Grid fades. Purple definition card `P(A∩B) = P(A) P(B)`, check line `3/36 = 1/2 × 1/6`. Then two disjoint circles A and B with "exclusive: P(A∩B) = 0 ≠ P(A)P(B)", tagged "maximally dependent".

---

## Scene 4 — Trees (Lesson 2.4)

**Narration:**

- **Beat a:** When stages depend on each other, draw a tree. Two balls from a bag of five red and three blue, without replacement. First fork: red five eighths, blue three eighths. After a red, the bag holds four red and three blue. After a blue, five red and two blue.
- **Beat b:** Multiply along a branch. Red then blue is five eighths times three sevenths: fifteen over fifty six. Each leaf is one complete story. For one ball of each colour, add across the two mixed leaves: fifteen over twenty eight. And all four leaves add up to one. That is a free check.
- **Beat c:** So, and moves you along a path. Or moves you across paths. Adding along a branch gives numbers bigger than one, a sure sign of an error.

**Visuals:**

- **Beat a:** Tree grows left to right; branches red/teal with fraction labels 5/8, 3/8; 4/7, 3/7; 5/7, 2/7. Caption at the bottom: "5 red, 3 blue, two draws, no replacement".
- **Beat b:** Leaf products appear: 20/56, 15/56, 15/56, 6/56. The two mixed leaves glow gold; bottom line becomes `P(one of each) = 15/56 + 15/56 = 15/28`. A brace on the products column reads "sum = 1".
- **Beat c:** Products column fades. Purple rule card: "multiply along a branch (and)" / "add across branches (or)". Red card `5/8 + 4/7 > 1` crossed out.

---

## Scene 5 — Independent trials and reliability (Lesson 2.5)

**Narration:**

- **Beat a:** Now systems of independent parts. In series, the system works only if every part works, so multiply the successes. In parallel, it fails only if every part fails, so multiply the failures, and subtract from one. Series is weaker than its weakest link. Parallel is stronger than its strongest part.
- **Beat b:** Three students each have a fifty percent chance of solving a problem. Is it certain to be solved? Fifty plus fifty plus fifty percent is a hundred and fifty, which is impossible. The problem stays unsolved only if all three fail: one half cubed, one eighth. So it gets solved with probability seven eighths. At least one means one minus none.

**Visuals:**

- **Beat a:** Left: three boxes p₁, p₂, p₃ wired in a chain, "Series", `P(works) = p₁p₂p₃`. Right: three boxes in parallel, "Parallel", `P(works) = 1 − q₁q₂q₃`, with `q = 1 − p` beneath.
- **Beat b:** Three student circles, each "50%". Red card `50% + 50% + 50% = 150%` crossed out. `P(all fail) = (1/2)^3 = 1/8`, then `P(solved) = 1 − 1/8 = 7/8` in gold. Purple tip: "at least one = 1 − P(none)".

---

## Scene 6 — Conditioning traps (Lesson 2.6)

**Narration:**

- **Beat a:** The famous traps catch anyone who skips writing the sample space. A family has two children. List the elder first: boy boy, boy girl, girl boy, girl girl. Each one quarter.
- **Beat b:** You are told at least one is a boy. Only girl girl is ruled out. Three stories survive, and just one is boy boy. One third, not one half.
- **Beat c:** Now you are told the elder is a boy. Girl boy and girl girl go. Two survive, so one half. Different information, different answer.
- **Beat d:** Bertrand's box. Three boxes: gold gold, gold silver, silver silver. Pick a box, pull out one coin. It is gold. Is the other one gold? It feels like one half. It is one of two boxes. But label the coins. There are three gold coins you could have drawn, and two of them have a gold partner. Two thirds.

**Visuals:**

- **Beat a:** Four tiles BB, BG, GB, GG (row 1), `S`, each 1/4.
- **Beat b:** Row 1 labelled "at least one boy": GG greys, BB glows gold; `P(BB) = 1/3`.
- **Beat c:** Row 2 copy labelled "elder is a boy": GB and GG grey; `P(BB) = 1/2`.
- **Beat d:** Three boxes with two coins each (gold filled / silver outlined), labelled G₁ G₂, G₃ S, S S. SS box greys. Each gold coin pulses in turn with its partner below: gold, gold, silver. Red "1/2" crossed; gold `P = 2/3`.

---

## Scene 7 — Recap (Lesson 2.7 Mastery)

**Narration:** Here is the chapter in five lines. Given B, shrink the sample space to B, then count. The probability of A and B is the probability of A times the probability of B given A. Independent means the probabilities multiply, and it is not the same as exclusive. On a tree, multiply along and add across. And at least one is one minus none. Write the condition precisely. The mastery lesson mixes all of these. Next: total probability and Bayes' theorem.

**Visuals:** five numbered lines fade in one by one, then "Next: Chapter 3 · Total Probability and Bayes' Theorem".

---

**Lesson coverage map:** 2.1 → Scene 1 · 2.2 → Scene 2 · 2.3 → Scene 3 · 2.4 → Scene 4 · 2.5 → Scene 5 · 2.6 → Scene 6 · 2.7 Mastery → Scene 7.
