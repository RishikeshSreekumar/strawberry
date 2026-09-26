# Chance, Experiments and Events — Explainer Script

- **Course:** Probability
- **Chapter:** Chapter 0 · Chance, Experiments and Events (id: `pr-0-chance-experiments-and-events`)
- **Scene class:** `PrCh0Video` in `videos/scenes/pr-0-chance-experiments-and-events.py`
- **Target runtime:** about 4.5 minutes (roughly 760 spoken words at Samantha's default ~175 wpm; rendered at 4 min 19 s)

**Learning goal.** The learner sees that one coin flip is unpredictable but the long-run fraction of heads is stable, and that this stable number is what probability measures. They reject the gambler's fallacy. They can name a random experiment, an outcome and the sample space S, list S with a tree (two coins) or a grid (two dice), and avoid d'Alembert's error (HT and TH are different outcomes). They treat an event as a subset of S that "happens" when the outcome lands inside it, including the sure and the impossible event. They translate or / and / not into union / intersection / complement, know that "or" includes both, see De Morgan's law by shading, and can tell mutually exclusive, exhaustive and partition apart. They size sample spaces by counting and never mix an ordered count with an unordered one.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: heads and event A = PRIMARY (strawberry red), tails and event B = SECONDARY (teal), totals and shaded results = deep gold `#D19A00`, laws = PURPLE, warnings = PRIMARY with a cross mark, checks = GREEN. Coins are filled circles with a white H or T. The two-dice grid is 6 by 6 with the first die along the bottom (red numbers) and the second die up the side (teal numbers). Venn diagrams are a rectangle S with circle A (red) and circle B (teal); shaded regions use Manim's `Union` / `Intersection` / `Difference`. Maths uses `MathTex`. Each scene has a small grey lesson header top left. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("two to the power four", "fifty two choose two", "not A").

---

## Scene 0 — Title card

**Narration:** Chapter zero. Chance, experiments and events.

**Visuals:** kicker "Probability", title "Chapter 0 · Chance, Experiments and Events".

---

## Scene 1 — Uncertainty you can measure (Lesson 0.1)

**Narration:**

- **Beat a:** Flip a coin. Will it land heads? Nobody can say. Flip it ten times and you might get seven heads. Flip ten more and you might get three. A handful of flips is pure chance.
- **Beat b:** But keep flipping, and after every flip plot the fraction of heads so far. Early on it swings wildly. By a thousand flips it hugs one half. A single outcome is unpredictable, but the long-run proportion is stable. That stable number is what probability measures.
- **Beat c:** Now five heads in a row. Surely tails is due? No. The coin has no memory. The next flip is still one half heads. That belief is the gambler's fallacy. The long run settles not by correcting streaks, but by drowning them in thousands of new flips.

**Visuals:**

- **Beat a:** Two rows of ten coins pop in one at a time: the first row has 7 heads (`\tfrac{7}{10} = 0.7`, red), the second 3 heads (`\tfrac{3}{10} = 0.3`, teal). Caption "Ten flips: anything can happen."
- **Beat b:** Axes: number of flips 0 to 1000, fraction of heads 0 to 1, gold dashed line at 0.5. A red running-fraction curve (seeded simulation, starting with the same 7-of-10 flips) draws left to right, jagged at first, then flat near 0.5; end label 0.503. Formula `f_n(\text{H}) = \frac{\text{heads}}{n} \longrightarrow \tfrac12`.
- **Beat c:** Five red H coins and a grey "?" coin. Red card "Tails is due!" is crossed out. `P(\text{next flip is H}) = \tfrac12`. Green card "The coin has no memory."

---

## Scene 2 — Experiments and sample spaces (Lesson 0.2)

**Narration:**

- **Beat a:** A random experiment is an action whose result we cannot predict, but whose possible results we can list. Each result is an outcome, and the list of all outcomes is the sample space, S. Toss two coins. A tree lists them: H H, H T, T H, T T. Four outcomes.
- **Beat b:** The great mathematician d'Alembert once argued that two coins give just three results: zero, one or two heads, one third each. But one head can happen two ways, H T and T H. Sort the four outcomes: one head gets two of them. Toss two coins a thousand times and one head turns up about half the time, not a third.
- **Beat c:** Two dice? A tree would need thirty six leaves, so use a grid. First die along the bottom, second die up the side. Every cell is an ordered pair: six times six, thirty six outcomes. And three then four is a different cell from four then three.

**Visuals:**

- **Beat a:** Three grey definition lines (experiment, outcome, sample space). A two-level tree grows left to right (red branch = H, teal branch = T), leaves HH, HT, TH, TT. `S = \{\text{HH}, \text{HT}, \text{TH}, \text{TT}\}` and gold `n(S) = 4`.
- **Beat b:** Card "d'Alembert: 0, 1 or 2 heads, so one third each?". Three bins (0 heads, 1 head, 2 heads); copies of the leaves fly into the bins, HT and TH stacking in the middle and flashing gold. Fractions `\tfrac14`, `\tfrac24 = \tfrac12`, `\tfrac14`. The d'Alembert card is crossed out.
- **Beat c:** The 6 by 6 dice grid. `n(S) = 6 \times 6 = 36`. Cell (3, 4) fills red and (4, 3) teal; card "(3, 4) is not (4, 3)". Caption "Every cell is an ordered pair."

---

## Scene 3 — Events as subsets (Lesson 0.3)

**Narration:**

- **Beat a:** An event is a set of outcomes: a subset of the sample space. The sum is seven is these six cells on the diagonal. Doubles is six cells on the other diagonal.
- **Beat b:** Now roll. The outcome is three then four. It landed inside the sum is seven, so we say that event happened. It landed outside doubles, so doubles did not happen.
- **Beat c:** A single outcome, like double six, is a simple event. The whole of S is the sure event. And the sum is thirteen? No cells at all: the empty set, the impossible event. It is still an event. Every subset counts, so two coins, with four outcomes, have two to the power four, sixteen events.

**Visuals:**

- **Beat a:** Grid. Bold line "An event is a subset of S." The sum-7 anti-diagonal fills red (card "A: sum is 7", `n(A) = 6`); the doubles diagonal fills teal (card "D: doubles", `n(D) = 6`).
- **Beat b:** A gold star lands on cell (3, 4); "rolled (3, 4)". A green check appears next to A, a red x next to D.
- **Beat c:** Colours clear. Cell (6, 6) fills gold: "simple event {(6, 6)}". Every cell outline flashes gold: "sure event S". "impossible event: sum = 13: ∅". Gold card "4 outcomes give `2^4 = 16` events".

---

## Scene 4 — The algebra of events (Lesson 0.4)

**Narration:**

- **Beat a:** Words become set operations. A or B is the union: every outcome in at least one of them. A and B is the intersection: the overlap. Not A is the complement: everything in S outside A.
- **Beat b:** Careful with or. Roll one die. A is even, B is at least four. A or B is two, four, five and six. Four and six are in both, and they stay in. In probability, or never means exactly one.
- **Beat c:** Neither A nor B means outside both. Shade not A. Shade not B. Keep only what is shaded twice, and you get exactly the outside of the union. Not, A or B, equals not A and not B. That is De Morgan's law, and its twin swaps or with and.
- **Beat d:** Events that share no outcome are mutually exclusive. Events that together cover S are exhaustive. When both are true, the events form a partition: S sliced into pieces, like one, two, then three, four, then five, six.

**Visuals:**

- **Beat a:** Three small Venn diagrams side by side, shaded gold in turn: union (`A \cup B`, "A or B"), intersection (`A \cap B`, "A and B"), complement (`A'`, "not A").
- **Beat b:** One large Venn diagram with die faces placed: 2 in A only, 4 and 6 in the overlap, 5 in B only, 1 and 3 outside. Right: `A = \{2, 4, 6\}` (even), `B = \{4, 5, 6\}` (at least 4). Union shades gold; `A \cup B = \{2, 4, 5, 6\}`; 4 and 6 flash. Red card "exactly one {2, 5}" is crossed out.
- **Beat c:** Three Venns: `A'` shaded red, `\cap`, `B'` shaded teal, `=`, `A' \cap B'` shaded gold (outside both circles). Purple card with `(A \cup B)' = A' \cap B'` and `(A \cap B)' = A' \cup B'`, labelled "De Morgan".
- **Beat d:** Rectangle S; bullet lines "mutually exclusive: no two overlap", "exhaustive: together they cover S". The rectangle is cut into three coloured pieces `E_1 = \{1, 2\}`, `E_2 = \{3, 4\}`, `E_3 = \{5, 6\}`; purple bullet "both at once: a partition of S".

---

## Scene 5 — Counting outcomes without listing (Lesson 0.5)

**Narration:**

- **Beat a:** Sample spaces grow fast, so we count instead of listing. Draw two cards from a pack of fifty two. If order matters, that is fifty two times fifty one: two thousand six hundred and fifty two. If the cards are drawn together, every pair was counted twice, so divide by two: fifty two choose two, one thousand three hundred and twenty six.
- **Beat b:** The trap is mixing the two views. Two cards drawn together: what is the chance both are aces? Six pairs of aces, unordered, over two thousand six hundred and fifty two, ordered, is off by a factor of two. Count both unordered: six over one thousand three hundred and twenty six. Pick one view and use it for the top and the bottom.

**Visuals:**

- **Beat a:** Two slots "52" (1st card, red) × "51" (2nd card, teal). `{}^{52}P_2 = 52 \times 51 = 2652`, "ordered: (A, K) and (K, A) are different". Then gold `\binom{52}{2} = \frac{2652}{2!} = 1326`, "drawn together: each pair counted once".
- **Beat b:** Question "Two cards drawn together. P(both aces)?". Left: `\frac{\binom{4}{2}}{{}^{52}P_2} = \frac{6}{2652}` "unordered over ordered", crossed out. Right, green: `\frac{\binom{4}{2}}{\binom{52}{2}} = \frac{6}{1326}` "unordered over unordered". Purple card "Pick one view, ordered or unordered, and use it top and bottom."

---

## Scene 6 — Recap (Lesson 0.6)

**Narration:** Here is the chapter in five lines. One flip is unpredictable, but the long-run fraction is stable. The outcomes of an experiment form the sample space. An event is a subset of it, and it happens when the outcome lands inside. Or is union and includes both, and is intersection, not is complement. And count, don't list, keeping order consistent. Next, we put numbers on events.

**Visuals:** Title "Chapter 0 in five lines" in red. Five numbered rows appear one per sentence:

1. One flip is unpredictable; the long-run fraction is stable.
2. An experiment's outcomes form the sample space S.
3. An event is a subset of S. It happens if the outcome lands inside.
4. or = union (includes both), and = intersection, not = complement.
5. Count, don't list, and keep order consistent top and bottom.

Footer "Next: putting numbers on events."
