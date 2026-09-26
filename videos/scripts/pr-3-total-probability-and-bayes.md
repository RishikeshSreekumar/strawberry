# Total Probability and Bayes' Theorem — Explainer Script

- **Course:** Probability
- **Chapter:** Chapter 3 · Total Probability and Bayes' Theorem (id: `pr-3-total-probability-and-bayes`)
- **Scene class:** `PrCh3Video` in `videos/scenes/pr-3-total-probability-and-bayes.py`
- **Target runtime:** about 5.5 to 6 minutes (roughly 1,000 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner sees a two-stage tree with a hidden cause first and learns that the probability of the effect is a *weighted* average over the causes (total probability), not a plain average. They reverse the tree by keeping only the leaves consistent with what was observed and dividing one leaf by their total (Bayes' theorem). They see why P(A | B) and P(B | A) differ. They meet base-rate neglect through natural frequencies (10,000 people), solve "many causes" exam problems with a five-column table (the truthful-liar die problem), resolve Monty Hall, and learn that today's posterior is tomorrow's prior.

**Global style (all scenes):** light strawberry background (`BG` from `videos/lib/strawberry.py`). Colour roles: hidden causes / hypotheses = teal (`SECONDARY`), observed evidence (defective, positive) = strawberry red (`PRIMARY`), totals and posteriors = gold (`#D19A00`), general laws = `PURPLE`, warnings = red with a cross-out. Each scene has a small grey header in the top-left (`3.x · Title`). Math uses `MathTex`; text uses Helvetica Neue. Frame is cleared with `FadeOut` between scenes.

**Running examples (must match the lessons):**
- Factory: M1, M2, M3 make 25%, 35%, 40% of bolts with defect rates 5%, 4%, 2%. Leaves 0.0125, 0.0140, 0.0080; P(D) = 0.0345. Posteriors 125/345 ≈ 0.36, 140/345 ≈ 0.41, 80/345 ≈ 0.23.
- Disease test: prevalence 1%, sensitivity 99%, false-positive rate 5% (specificity 95%). Out of 10,000: 99 true positives, 495 false positives, P(sick | +) = 99/594 = 1/6.
- Liar: A tells the truth 3 times out of 4; says a die shows six; posterior 3/8.
- Monty Hall: switching wins 2/3; 100-door version 99/100.
- Second positive test: 1/6 → about 0.80. Coin bag: 9 fair, 1 two-headed; P(two-headed | n heads) = 1 / (1 + 9/2^n).

**TTS note:** symbols are spoken as words ("P of A given E i", "zero point zero three four five", "one sixth"). No bare symbols such as "|" or "%" go into the narration.

---

## Scene 0 — Title card

**Narration:** Chapter three. Total probability and Bayes' theorem.

**Visuals:** `title_card` with kicker "Probability" and title "Chapter 3 · Total Probability and Bayes' Theorem".

---

## Scene 1 — Hook: the positive test

**Narration:**

- **Beat a:** A disease affects one person in a hundred. A test catches ninety nine percent of cases. You test positive. How likely is it that you are actually sick? Most people say ninety nine percent. The true answer is about one in six, and this chapter shows you why.
- **Beat b:** The problem has a hidden cause: sick or healthy, and we only see the effect. Two tools handle it. Total probability splits by the cause. Bayes' theorem runs the reasoning backwards, from effect to cause.

**Visuals:**

- **Beat a:** A card with three lines: "A disease affects 1 in 100 people.", "A test catches 99% of cases.", "You test positive." (bold, red). Below it, gold `P(\text{sick} \mid \text{positive}) = ?` is written. Muted text "Most people say 99%." fades in underneath.
- **Beat b:** The guess fades; the question slides up. Two cards appear side by side: teal "total probability / cause -> effect" and red "Bayes' theorem / effect -> cause".

---

## Scene 2 — The law of total probability (Lesson 3.1)

**Narration:**

- **Beat a:** A factory makes bolts on three machines. Machine one makes a quarter of them, machine two thirty five percent, machine three forty percent. Their defect rates are five, four and two percent. Pick a bolt. What is the chance it is defective? We are not told which machine made it, so draw a tree with the hidden cause first.
- **Beat b:** Multiply along each path to a defective leaf. Zero point two five times zero point zero five, and so on. A defective bolt came from exactly one machine, so these three pieces do not overlap, and they simply add: about three point four five percent.
- **Beat c:** Do not just average the three rates. That treats each machine as if it made a third of the bolts. Each rate must be weighted by how often its cause happens. That is the law of total probability: split by a partition of causes, then add. P of A is the sum of P of E i, times P of A given E i.

**Visuals:**

- **Beat a:** Left half: a root dot with three teal branches (labelled 0.25, 0.35, 0.40) to boxed nodes M1, M2, M3. Each machine splits into a red branch to "D" (labelled 0.05, 0.04, 0.02) and a grey branch to "OK". A two-line muted story sits top-right.
- **Beat b:** Each D leaf flashes gold and its product (0.0125, 0.0140, 0.0080) slides in beside it. On the right: `P(D)`, `= 0.0125 + 0.0140 + 0.0080`, gold `= 0.0345`.
- **Beat c:** The sum fades. A red card with `\frac{5\% + 4\% + 2\%}{3} \approx 3.67\%` and "plain average" appears and is crossed out. Below, a purple card `P(A) = \sum_i P(E_i)\,P(A \mid E_i)` with the caption "a weighted average over the causes".

---

## Scene 3 — Reversing the tree: Bayes' theorem (Lesson 3.2)

**Narration:**

- **Beat a:** Now the inspector finds a defective bolt, and asks the backward question: which machine made it? Knowing the bolt is defective rules out every OK leaf. Only the three defective leaves survive.
- **Beat b:** Each machine's share of the defective bolts is its leaf divided by the total. Machine two: zero point zero one four over zero point zero three four five, about forty one percent. Compare before and after. The careless machine one rises from twenty five to thirty six percent. The careful machine three falls from forty to twenty three.
- **Beat c:** Written as a formula, that is Bayes' theorem. The posterior, P of E i given A, equals the prior times the likelihood, divided by the total probability of A. And notice: P of D given M one is five percent, but P of M one given D is thirty six percent. Swapping the bar changes the question.

**Visuals:**

- **Beat a:** The full factory tree returns (with leaf products). A red card top-right: "The bolt is defective. Which machine?". The OK leaves and their branches dim to 15% opacity; the three gold products pulse.
- **Beat b:** Gold `P(M_2 \mid D) = \frac{0.0140}{0.0345} \approx 0.41` on the right. Beneath, a paired bar chart for M1, M2, M3: grey "before (prior)" bars 25/35/40% and gold "after (posterior)" bars 36/41/23%, with a small legend. The M1 and M3 posterior bars are indicated in turn.
- **Beat c:** Everything except the header clears. Large `P(E_i \mid A) = \frac{P(E_i)\,P(A \mid E_i)}{\sum_j P(E_j)\,P(A \mid E_j)}` with a brace "posterior" under the left side, "prior x likelihood" above the numerator and "total probability" below the denominator. A red card: `P(D \mid M_1) = 0.05` "is not" `P(M_1 \mid D) \approx 0.36`.

---

## Scene 4 — The base-rate trap (Lesson 3.3)

**Narration:**

- **Beat a:** Back to the test. Forget formulas and picture ten thousand people. One percent, that is one hundred, are sick, and the test catches ninety nine of them. Of the nine thousand nine hundred healthy people, the test wrongly flags five percent: four hundred and ninety five.
- **Beat b:** Everyone who tests positive is in these two boxes: ninety nine sick plus four hundred ninety five healthy, five hundred ninety four in all. Only ninety nine of them are sick. That is one in six. The disease is so rare that false alarms from the huge healthy group swamp the true cases. Ignoring that rarity is base rate neglect.
- **Beat c:** Now vary the prior. Plot the chance you are sick after a positive result against how common the disease is. At one percent, one in six. At ten percent, about seventy percent. At fifty percent, ninety five. The same test result means very different things for different people.

**Visuals:**

- **Beat a:** A natural-frequency tree: boxed "10,000" splits (1% / 99%) into red "100 sick" and teal "9,900 healthy"; these split into "99 +", "1 −", "495 +", "9,405 −" with branch labels 99% and 5%.
- **Beat b:** The two positive boxes pulse. On the right: `\text{positives} = 99 + 495 = 594`, then gold `P(\text{sick} \mid +) = \frac{99}{594} = \frac{1}{6}`. A red myth card ""99% accurate" means 99% sick?" appears and is crossed out.
- **Beat c:** Clear to axes: x = "prior: how common the disease is" (0 to 1), y = "P(sick | positive)". Gold curve `f(x) = 0.99x / (0.99x + 0.05(1 − x))` is drawn. Red dots appear at x = 0.01, 0.1, 0.5 with labels `0.01 \to 0.17`, `0.1 \to 0.69`, `0.5 \to 0.95` on the right, then the caption "Same test, very different meaning."

---

## Scene 5 — Bayes with many causes (Lesson 3.4)

**Narration:**

- **Beat a:** Exam problems dress Bayes up in costumes: liars, bags of balls, guessing on multiple choice. Underneath, it is always one table. A tells the truth three times out of four. A die is thrown, and A says it is a six. Is it?
- **Beat b:** Column two, the priors: one sixth and five sixths. Column three, the likelihood of what we heard. If it is a six, A says six by telling the truth, three quarters. If not, A says six by lying, one quarter. Multiply across for the joints: three over twenty four and five over twenty four. Divide each by their total, eight over twenty four. The answer is three eighths.
- **Beat c:** A is usually honest, yet the answer is below one half, because sixes are rare to begin with. Causes, priors, likelihoods, joints, divide. Five columns solve every one of these problems.

**Visuals:**

- **Beat a:** Story card at the top. A five-column table header appears: hypothesis, prior, `P(\text{says six} \mid E)`, joint, posterior; rows "six", "not six", "total".
- **Beat b:** Columns fill left to right in time with the narration: priors 1/6, 5/6, 1; likelihoods 3/4, 1/4; joints 3/24, 5/24, total 8/24; posteriors (gold) 3/8, 5/8, 1. The 3/8 cell is indicated.
- **Beat c:** Caption under the table: "A is usually honest, but sixes are rare."

---

## Scene 6 — The Monty Hall problem (Lesson 3.5)

**Narration:**

- **Beat a:** Three doors: one hides a car, two hide goats. You pick door one. Your door has a one third chance. The other two, together, have two thirds.
- **Beat b:** The host, who knows where the car is, opens door three and shows a goat. He never opens your door and never reveals the car, so his choice carries information. The whole two thirds now sits on door two. Two doors left does not mean fifty fifty. Bayes agrees: switching wins two thirds of the time.
- **Beat c:** Still not convinced? Take a hundred doors. You pick one. The host opens ninety eight goats and carefully leaves one other door shut. Would you stick with your one in a hundred guess, or switch to the door he avoided?

**Visuals:**

- **Beat a:** Three doors labelled 1, 2, 3. Door 1 gets a teal outline, "your pick" and 1/3. A gold brace under doors 2 and 3 carries 2/3.
- **Beat b:** Door 3 turns into a white "goat" panel. The brace goes; 2/3 moves under door 2 and 0 appears under door 3; door 2 is indicated. A red myth card ""Two doors left, so 50-50"" is crossed out. Bottom: `P(\text{car at }2 \mid \text{opens }3) = \frac{\frac13 \cdot 1}{\frac13 \cdot \frac12 + \frac13 \cdot 1} = \frac23`.
- **Beat c:** Clear to a 5 by 20 grid of 100 small doors. The first fills teal; the other 98 fade out; one door in the middle turns gold. Labels: "stick 1/100" (teal) and "switch 99/100" (gold).

---

## Scene 7 — Updating beliefs (Lesson 3.6)

**Narration:**

- **Beat a:** One positive test took you from one percent to one in six. So the doctor orders a second, independent test, and it is positive too. Just run Bayes again, with one sixth as the new prior. You land near eighty percent. Today's posterior is tomorrow's prior.
- **Beat b:** Notice the jumps. The first positive added sixteen points. The identical second one added more than sixty. Evidence does not move you by a fixed amount. How far it moves you depends on where you start.
- **Beat c:** Chain it further. A bag holds nine fair coins and one two headed coin. Draw one and keep tossing. Each head doubles the odds for the two headed coin. Start at one in ten, pass one half after four heads, and pass ninety nine percent by ten.

**Visuals:**

- **Beat a:** A chain `1\%` → `\approx 17\%` → `\approx 80\%` with arrows labelled "1st positive" and "2nd positive". Below: `P(\text{sick} \mid +,+) = \frac{\frac16 \cdot 0.99}{\frac16 \cdot 0.99 + \frac56 \cdot 0.05} \approx 0.80`, then the purple motto "Today's posterior is tomorrow's prior."
- **Beat b:** The equation fades. "+16 points" appears under the first arrow, then "+63 points" under the second, which is indicated in red.
- **Beat c:** Clear to axes: x = "heads in a row" (0 to 10), y = "P(two-headed coin)". A story on the right ("Bag: 9 fair coins, 1 two-headed coin. Draw one, toss it.") and gold `\frac{1}{1 + 9/2^{n}}`. Gold dots for n = 0..10 appear one by one, joined by a line (0.1, 0.18, 0.31, 0.47, 0.64, ... 0.99). Caption: "each head doubles the odds".

---

## Scene 8 — Recap

**Narration:** To recap. When a hidden cause drives the outcome, split by the causes and add: total probability. To reason backwards from what you saw to what caused it, divide one leaf by the total: Bayes' theorem. Always respect the base rate, and count with natural frequencies when in doubt. Information hides in how evidence was produced, as Monty Hall shows. And every posterior becomes the next prior. Now try it yourself in the lessons.

**Visuals:** Header "Chapter 3 · Recap". Five lines fade in one by one:
1. "Total probability" (teal) with `P(A) = \sum_i P(E_i)\,P(A \mid E_i)`
2. "Bayes" (red) with `P(E_i \mid A) = \frac{P(E_i)\,P(A \mid E_i)}{P(A)}`
3. "Base rates matter: think in natural frequencies."
4. "The host's choice is information: switch."
5. "Today's posterior is tomorrow's prior." (purple)
