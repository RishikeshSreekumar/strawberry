# Measuring Probability — Explainer Script

- **Course:** Probability
- **Chapter:** Chapter 1 · Measuring Probability (id: `pr-1-measuring-probability`)
- **Scene class:** `PrCh1Video` in `videos/scenes/pr-1-measuring-probability.py`
- **Target runtime:** about 5.5 minutes (roughly 960 spoken words at Samantha's default ~175 wpm; rendered at 5 min 36 s)

**Learning goal.** The learner sees probability as the fraction of an equally likely sample space that an event occupies (sum is 7 = 6/36), knows why it is a fraction, and knows that the equally-likely assumption does all the work ("sum is 12 or not, so 50-50" is wrong: 1/36). They see relative frequency f/n settle onto the classical triangle for two dice and know that small samples mislead (3 heads in 4 flips happens 5/16 of the time with a fair coin). They know Kolmogorov's three axioms and watch the complement rule, P(∅) = 0 and 0 ≤ P ≤ 1 follow from them. They convert odds 3 : 2 into P = 3/5. They derive the addition rule by shading overlapping events on the dice grid (18 + 6 − 3 = 21) and use a sum above 1 as a double-counting alarm. They use "at least one = 1 − P(none)" on de Méré's two bets and the birthday problem (crossing at 23 people, 253 pairs). They count probabilities with a consistent ordered or unordered view (5/14 two ways; the mixed 5/28 is wrong).

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours, matching Chapter 0: event A / heads / "for" = PRIMARY (strawberry red), event B / tails / "against" = SECONDARY (teal), overlaps, totals and highlights = deep gold `#D19A00`, rules and axioms = PURPLE, warnings = PRIMARY with a cross mark, confirmations = GREEN. The two-dice grid is 6 by 6, first die along the bottom (red numbers), second die up the side (teal numbers). Maths uses `MathTex`. Each scene has a small grey lesson header top left. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("five sixths to the power four", "P of A or B", "five choose two").

---

## Scene 0 — Title card

**Narration:** Chapter one. Measuring probability.

**Visuals:** kicker "Probability", title "Chapter 1 · Measuring Probability".

---

## Scene 1 — Classical probability (Lesson 1.1)

**Narration:**

- **Beat a:** Chapter zero gave us sample spaces and events. Now we put a number on an event. Roll two fair dice: thirty six outcomes, all equally likely. The event, sum is seven, fills six of the thirty six cells. So its probability is six over thirty six, one sixth. Probability is the fraction of the sample space that the event occupies.
- **Beat b:** Why a fraction? If N outcomes share the certainty equally, each one gets one over N, and an event made of n of E outcomes collects n of E shares. But that needs every outcome to be equally likely. That assumption does all the work.
- **Beat c:** A common trap. Either the sum is twelve or it isn't, so it's fifty fifty? No. Sum twelve is one cell, double six. Not twelve is the other thirty five. Two categories are not two equally likely outcomes. The probability is one over thirty six.

**Visuals:**

- **Beat a:** The 6 by 6 dice grid on the left, `n(S) = 36` on the right. The sum-7 anti-diagonal fills red, card "A: sum is 7", `P(A) = \frac{6}{36} = \frac{1}{6}`, then a gold card with `P(E) = \frac{n(E)}{n(S)}`.
- **Beat b:** Centre: `P(E) = \underbrace{\tfrac1N + \cdots + \tfrac1N}_{n(E)\text{ shares}} = \frac{n(E)}{N}`. Red card "Only when every outcome is equally likely."
- **Beat c:** Fresh grid. Red card "\"12 or not 12, so 50-50\"". Cell (6, 6) fills gold ("sum 12: 1 cell"), the other 35 fill pale teal ("not 12: 35 cells"). The card is crossed out; `P(\text{sum} = 12) = \frac{1}{36}`.

---

## Scene 2 — Probability as long-run frequency (Lesson 1.2)

**Narration:**

- **Beat a:** Classical probability needs symmetry. When there is none, like a drawing pin landing point up, we measure instead. Repeat the experiment n times, count the f times the event happens, and use the relative frequency, f over n.
- **Beat b:** Watch it with two dice. After twenty rolls, the bars for each sum are ragged. After two hundred, a shape appears. After ten thousand, they hug the triangle that the grid predicted: one thirty sixth, rising to six thirty sixths at seven, and back down. When symmetry exists, frequency confirms it.
- **Beat c:** But small samples mislead. Four flips and three heads does not mean the chance of heads is three quarters. A perfectly fair coin does that, or better, about thirty one percent of the time. The frequency view only means something when n is large.

**Visuals:**

- **Beat a:** Three lines: "A drawing pin lands point up?", "A bulb lasts 1000 hours?", grey "No symmetry, so nothing to count." Gold card `P(E) \approx \frac{f}{n} = \frac{\text{times } E \text{ happened}}{\text{number of trials}}`.
- **Beat b:** Axes: sums 2 to 12 across, fraction of rolls 0 to 0.3 up. Teal bars from a seeded simulation (seed 1) transform from n = 20 to n = 200 to n = 10000 (label top right). A gold dashed triangle with dots at k/36 overlays the final bars, peak labelled `\tfrac{6}{36}`. Green "Frequency confirms the count."
- **Beat c:** Four coins H H T H. Red card `P(\text{H}) = \frac34\ ?` is crossed out. `P(\text{3 or more heads in 4}) = \tfrac{5}{16} \approx 31\%`, "for a perfectly fair coin". Green card "The frequency view needs a large n."

---

## Scene 3 — The axioms of probability (Lesson 1.3)

**Narration:**

- **Beat a:** Counting needs symmetry, and experiment needs repetition. In nineteen thirty three, Kolmogorov asked: whatever probability is, which rules must it obey? Three are enough. One: no probability is negative. Two: the sure event has probability one. Three: for events that cannot happen together, probabilities add.
- **Beat b:** Everything else follows. An event E and its complement, not E, cannot happen together, and together they make up S. So P of E plus P of not E equals P of S, which is one. That is the complement rule, derived. In the same way, the empty event has probability zero, and every probability sits between zero and one. Any answer outside that range means a rule was misused.
- **Beat c:** And odds are not probabilities. Odds of three to two in favour mean three shares for and two against: five shares in all. So the probability is three fifths. Not three halves, and not two thirds.

**Visuals:**

- **Beat a:** Grey line "Kolmogorov, 1933: which rules must any probability obey?". Three purple cards appear in turn: Axiom 1 `P(E) \ge 0` ("never negative"), Axiom 2 `P(S) = 1` ("something happens"), Axiom 3 `A \cap B = \varnothing \Rightarrow P(A \cup B) = P(A) + P(B)` ("exclusive events add").
- **Beat b:** Rectangle S split into a red E and a teal E'. Derivation column: `P(E) + P(E') = P(S) = 1`, gold `P(E') = 1 - P(E)`, `P(\varnothing) = 0`, `0 \le P(E) \le 1`. Red caption "An answer outside [0, 1] means a rule was misused."
- **Beat c:** "odds 3 : 2 in favour" above five squares, three red ("3 for") and two teal ("2 against"). Green `P(E) = \frac{3}{3+2} = \frac35`. Red `\frac32` and `\frac23` appear and are crossed out.

---

## Scene 4 — The addition rule (Lesson 1.4)

**Narration:**

- **Beat a:** What if events overlap? On the dice grid, let A be, first die even: eighteen cells. Let B be, sum is seven: six cells. Adding gives twenty four. But three cells, two five, four three and six one, sit in both, and were counted twice.
- **Beat b:** So subtract the overlap once. Eighteen plus six minus three is twenty one cells: twenty one over thirty six, seven twelfths. That is the addition rule. P of A or B equals P of A, plus P of B, minus P of A and B. For three events, add the singles, subtract the pairs, and add back the triple.
- **Beat c:** Forget the overlap and the numbers often warn you. With P of A equal to point seven and P of B point six, plain addition gives one point three. That is impossible, so the two events must overlap by at least point three.

**Visuals:**

- **Beat a:** Dice grid. Columns 2, 4, 6 fill pale red (A, 18 cells); the sum-7 diagonal fills teal, with the overlap cells (2,5), (4,3), (6,1) in gold. Red `18 + 6 = 24\ ?`; the gold cells pulse; `A \cap B: (2,5), (4,3), (6,1)`.
- **Beat b:** `18 + 6 - 3 = 21`, gold `P(A \cup B) = \frac{21}{36} = \frac{7}{12}`. Grid clears; purple card `P(A \cup B) = P(A) + P(B) - P(A \cap B)`; grey note on three events and `P(A \cup B \cup C) = \Sigma P(\text{one}) - \Sigma P(\text{pair}) + P(A \cap B \cap C)`.
- **Beat c:** A 0-to-1 line. A red bar from 0 to 0.7 ("P(A) = 0.7"), a teal bar from 0.4 to 1 ("P(B) = 0.6"). Red card `0.7 + 0.6 = 1.3 > 1`. A gold box marks the forced overlap, "overlap ≥ 0.3". Green "A sum above 1 means you double-counted an overlap."

---

## Scene 5 — The complement trick and the birthday problem (Lesson 1.5)

**Narration:**

- **Beat a:** In sixteen fifty four, the Chevalier de Méré bet on at least one six in four rolls of a die. At least one is messy. Its complement, no six at all, is clean: five sixths per roll, so five sixths to the power four. One minus that is about zero point five one eight: a small edge, and he won. Note it is not four sixths. That reasoning would give more than one after seven rolls.
- **Beat b:** Then he bet on at least one double six in twenty four rolls of two dice, since six times rarer, times six times more rolls, seemed the same. It is not. One minus thirty five over thirty six, to the power twenty four, is about zero point four nine one. He lost.
- **Beat c:** The same trick solves the birthday problem. The chance that n people all have different birthdays is a product: three sixty five over three sixty five, times three sixty four over three sixty five, and so on. One minus that crosses one half at just twenty three people, not one hundred and eighty three. Twenty three people make two hundred and fifty three pairs, and any pair can match.

**Visuals:**

- **Beat a:** Red card "Bet 1: at least one six in 4 rolls". Purple `P(\text{at least one}) = 1 - P(\text{none})`. Green `1 - (\tfrac56)^4 = \tfrac{671}{1296} \approx 0.518`. Red `\frac46\ ?` with "then 7 rolls would give 7/6", crossed out.
- **Beat b:** The rule and the wrong guess fade; the 0.518 line moves up under Bet 1. Teal card "Bet 2: at least one double six in 24 rolls of two dice", red `1 - (\tfrac{35}{36})^{24} \approx 0.491`, "Just under one half: he lost."
- **Beat c:** `P(\text{all different}) = \tfrac{365}{365}\cdot\tfrac{364}{365}\cdot\tfrac{363}{365}\cdots` at the top. Axes: people 0 to 60, P(some shared birthday) 0 to 1, gold dashed line at 0.5. The exact red curve draws; a gold drop line and dot at n = 23 labelled `n = 23: 0.507`. Red "not 183"; `{}^{23}C_2 = 253` "pairs, any of which can match".

---

## Scene 6 — Probability by counting (Lesson 1.6)

**Narration:**

- **Beat a:** When the sample space is too big to draw, count it. An urn holds five red and three blue balls. Draw two. Counted as unordered pairs: five choose two over eight choose two, ten over twenty eight. Counted as ordered draws: five times four over eight times seven, twenty over fifty six. Both give five fourteenths.
- **Beat b:** The classic error mixes the two: an unordered count on top, an ordered count below. Ten over fifty six is half the true answer. So before you divide, ask three questions. What is one outcome? Are the outcomes equally likely? And does the top count the same kind of thing as the bottom?

**Visuals:**

- **Beat a:** An open jar with 5 red and 3 teal balls ("5 red, 3 blue, draw 2"). `P(\text{both red})`. Row "unordered" `\frac{{}^5C_2}{{}^8C_2} = \frac{10}{28} = \frac{5}{14}`, row "ordered" `\frac{5 \times 4}{8 \times 7} = \frac{20}{56} = \frac{5}{14}`, both with green check marks.
- **Beat b:** Red row "mixed" `\frac{{}^5C_2}{8 \times 7} = \frac{10}{56} = \frac{5}{28}`, crossed out. The frame clears to a purple checklist card: "1. What is one outcome?", "2. Are the outcomes equally likely?", "3. Do top and bottom count the same kind of thing?".

---

## Scene 7 — Recap

**Narration:** Here is the chapter in six lines. With equally likely outcomes, probability is the fraction of the sample space. The long-run frequency settles near the true value. Three axioms give the complement rule, and keep every probability between zero and one. For or, add, then subtract the overlap once. For at least one, use one minus P of none. And count the top and the bottom the same way. Next, conditional probability and independence.

**Visuals:** Red heading "Chapter 1 in six lines", six numbered rows appearing in turn:

1. Equally likely outcomes: P(E) = n(E) / n(S).
2. The long-run frequency f / n settles near the true value.
3. Three axioms give the complement rule and 0 ≤ P ≤ 1.
4. Or: add, then subtract the overlap once.
5. At least one: 1 − P(none).
6. Count top and bottom the same way.

Footer: "Next: conditional probability and independence."
