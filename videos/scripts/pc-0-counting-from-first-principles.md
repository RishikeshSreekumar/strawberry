# Counting from First Principles — Explainer Script

- **Course:** Permutations, Combinations & the Binomial Theorem
- **Chapter:** Chapter 0 · Counting from First Principles (id: `pc-0-counting-from-first-principles`)
- **Scene class:** `PcCh0Video` in `videos/scenes/pc-0-counting-from-first-principles.py`
- **Target runtime:** about 5 to 5.5 minutes (roughly 850 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner sees that listing works only for tiny problems, and that a counting tree has a shape that turns into a formula. They can state the product rule (AND: stages multiply, provided the *number* of choices at each stage does not depend on earlier picks) and the sum rule (OR: non-overlapping cases add), and they count "at least one" as all minus none. They know n factorial as the number of ways to line up n different things, why 0! = 1, and they fill the most restricted slot first, splitting into cases when 0 interacts with two restrictions. They avoid the chapter's named traps: "the options at step 2 must be the same set", "OR always means add", and "always fill slots from left to right".

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: stage 1 of a tree = PRIMARY (strawberry red), stage 2 = SECONDARY (teal), stage 3 = PURPLE; results and totals = deep gold `#D19A00`; warnings = PRIMARY with a cross mark; checks = GREEN. Trees are drawn left to right with `Line` branches and `Dot` nodes. Slots are rounded squares with the number of choices written inside. Maths uses `MathTex`. Each scene has a small grey lesson header top left. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("three times four", "n factorial", "ten to the power four").

---

## Scene 0 — Title card

**Narration:** Chapter zero. Counting from first principles.

**Visuals:** kicker "Permutations, Combinations & the Binomial Theorem", title "Chapter 0 · Counting from First Principles".

---

## Scene 1 — Hook: why count cleverly (Lesson 0.1)

**Narration:**

- **Beat a:** You own three shirts and four pairs of trousers. How many outfits can you make? Small enough to list: every shirt with every trouser. Twelve.
- **Beat b:** Now draw it as a tree. Three branches for the shirt. From each one, four branches for the trousers. Three groups of four leaves: three times four, twelve. Add two pairs of shoes and every leaf splits again: twenty four.
- **Beat c:** Now try a licence plate: two letters, then four digits. That is twenty six times twenty six times ten to the power four, six million seven hundred and sixty thousand plates. Nobody lists that. But the tree has a shape, and the shape has a formula.

**Visuals:**

- **Beat a:** A 3 by 4 grid: rows labelled with red shirt chips (Red, Blue, White), columns with teal trouser chips (Jeans, Chinos, Shorts, Cargo). Cells fill with small gold dots one by one. Card "12 outfits".
- **Beat b:** Grid fades. A tree grows from a root: 3 red branches, then 4 teal branches from each (12 leaves). `3 \times 4 = 12`. Then each leaf sprouts 2 purple branches; `3 \times 4 \times 2 = 24`.
- **Beat c:** Tree shrinks to the left. Six slots appear: `26, 26, 10, 10, 10, 10`. Formula `26 \times 26 \times 10^4 = 6{,}760{,}000`. Card "the tree has a shape, and the shape has a formula".

---

## Scene 2 — The product rule (Lesson 0.2)

**Narration:**

- **Beat a:** A thali: a starter AND a main AND a dessert. Two starters, three mains, two desserts. Each stage splits every branch the same number of ways, so the leaves multiply: two times three times two, twelve meals.
- **Beat b:** That is the product rule. If a task happens in stages, and whatever happened before, stage one has n one ways, stage two has n two ways, and so on, then the total is their product.
- **Beat c:** The word whatever matters. Choose a president and then a vice president from five people. Who is available for vice president depends on who became president. The set changes. But the number is always four. Five times four, twenty. Only the count must be fixed, not the set.
- **Beat d:** When even the count changes, the rule breaks. Two digit numbers whose second digit is bigger than the first: first digit one leaves eight choices, first digit eight leaves just one. So split into cases and add: thirty six.

**Visuals:**

- **Beat a:** Header "0.2 · The product rule (AND)". Stage labels Starter / Main / Dessert above a three-level tree (red 2, teal 3, purple 2; 12 leaves). `2 \times 3 \times 2 = 12`.
- **Beat b:** Definition card: "Stages in sequence. Whatever happened before, stage k has n_k ways." and `n_1 \times n_2 \times \cdots \times n_k`.
- **Beat c:** Five name chips: Asha, Ravi, Meera, Kabir, Zoya. Asha highlighted as President; the other four glow as "Vice: 4 choices". Then Ravi as President; a different four glow, still 4. `5 \times 4 = 20`. Card "the set changes; the number doesn't".
- **Beat d:** Table of first digit 1..8 with counts 8..1 as a bar staircase; `8 + 7 + \cdots + 1 = 36`. Warning card "count depends on the earlier pick → split into cases".

---

## Scene 3 — The sum rule and the complement (Lesson 0.3)

**Narration:**

- **Beat a:** Travel to the city by bus OR by train. Bus: three routes, morning or afternoon, six trips. Train: fast or slow, morning or afternoon, four trips. Two separate trees, and every trip is in exactly one of them. So add: ten.
- **Beat b:** Careful. OR does not always mean add. Numbers from one to twenty divisible by two or by three: ten plus six is not sixteen, because six, twelve and eighteen sit in both lists. Subtract the overlap once: thirteen.
- **Beat c:** For at least one, count the opposite. How many four digit lock codes have at least one repeated digit? All codes: ten to the power four. Codes with no repeat: ten times nine times eight times seven, five thousand and forty. Subtract: four thousand nine hundred and sixty.

**Visuals:**

- **Beat a:** Two small trees side by side labelled "Bus" (3 then 2: 6 leaves) and "Train" (2 then 2: 4 leaves), with a big plus between. `3 \times 2 + 2 \times 2 = 6 + 4 = 10`.
- **Beat b:** Number strip 1..20. Multiples of 2 underlined teal, multiples of 3 circled red; 6, 12, 18 highlighted gold. Crossed-out `10 + 6 = 16`; correct `10 + 6 - 3 = 13`.
- **Beat c:** `\#(\text{at least one}) = \#(\text{all}) - \#(\text{none})` in a card, then `10^4 - 10 \cdot 9 \cdot 8 \cdot 7 = 10000 - 5040 = 4960`.

---

## Scene 4 — Factorials (Lesson 0.4)

**Narration:**

- **Beat a:** Three friends stand in a line for a photo. Three choices for the first spot, then two, then one. Three times two times one: six orders. Here they all are.
- **Beat b:** In general, lining up n different things gives n times n minus one, all the way down to one. We call it n factorial. Choose who goes first, then arrange the rest: n factorial equals n times n minus one factorial.
- **Beat c:** Put n equals one in that rule: one factorial equals one times zero factorial, so zero factorial must be one. It also makes sense: there is exactly one way to arrange nothing.
- **Beat d:** And factorials grow fast. Five factorial is a hundred and twenty. Ten factorial is over three and a half million. Twenty factorial has nineteen digits.

**Visuals:**

- **Beat a:** Three slots filled with 3, 2, 1; `3 \times 2 \times 1 = 6`. Six rows of letter tiles ABC, ACB, BAC, BCA, CAB, CBA appear in two columns, grouped by first letter.
- **Beat b:** `n! = n \times (n-1) \times \cdots \times 2 \times 1` and `n! = n \times (n-1)!` in a card.
- **Beat c:** `1! = 1 \times 0!` → `0! = 1`, boxed in gold.
- **Beat d:** Growth table: `5! = 120`, `10! = 3{,}628{,}800`, `20! \approx 2.4 \times 10^{18}`.

---

## Scene 5 — Restricted slots first (Lesson 0.5)

**Narration:**

- **Beat a:** Four digit numbers with distinct digits, using nought to nine. The thousands digit cannot be zero, so fill that fussy slot first: nine choices. Then nine, eight, seven for the rest. Four thousand five hundred and thirty six.
- **Beat b:** How many of them are even? Now two slots are fussy. Fill left to right and you get stuck: the number of even digits left for the last slot depends on what you picked. So fill the units digit first, and split on whether it is zero.
- **Beat c:** Units digit zero: nine, eight, seven for the rest, five hundred and four. Units digit two, four, six or eight: the thousands slot loses both zero and that digit, leaving eight. Four times eight times eight times seven, one thousand seven hundred and ninety two. Add: two thousand two hundred and ninety six.
- **Beat d:** Check with the odd numbers: five times eight times eight times seven, two thousand two hundred and forty. Even plus odd gives four thousand five hundred and thirty six. It matches.

**Visuals:**

- **Beat a:** Four slots labelled Th, H, T, U. Th fills first with 9 (label "not 0", red outline), then 9, 8, 7. `9 \times 9 \times 8 \times 7 = 4536`.
- **Beat b:** Units slot outlined red with "even". A left-to-right attempt shows "?" in the units slot, crossed out. Arrow marks units slot as "fill first".
- **Beat c:** Two rows of slots. Case A (units = 0): `9, 8, 7, 1` → `504`. Case B (units ∈ {2,4,6,8}): `8, 8, 7, 4` → `1792`. Sum `504 + 1792 = 2296` in gold.
- **Beat d:** `5 \times 8 \times 8 \times 7 = 2240` and `2296 + 2240 = 4536` with a green check.

---

## Scene 6 — Recap (Lesson 0.6)

**Narration:** Here is the toolkit. AND: stages multiply. OR: separate cases add, as long as they do not overlap. At least one: count all, subtract none. Arranging n things: n factorial. And always fill the fussiest slot first. Next chapter, we use these to arrange things in every way imaginable.

**Visuals:** A checklist of five rows, ticks appearing one by one, each with a small formula: `\times`, `+`, `\text{all} - \text{none}`, `n!`, "fussiest slot first". Ends with the card "Next: Permutations — Arranging Things".
