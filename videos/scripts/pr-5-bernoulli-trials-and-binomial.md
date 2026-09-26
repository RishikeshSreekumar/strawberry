# Bernoulli Trials and the Binomial Distribution — Explainer Script

- **Course:** Probability
- **Chapter:** Chapter 5 · Bernoulli Trials and the Binomial Distribution (id: `pr-5-bernoulli-trials-and-binomial`)
- **Scene class:** `PrCh5Video` in `videos/scenes/pr-5-bernoulli-trials-and-binomial.py`
- **Target runtime:** about 6 minutes (roughly 1,000 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner recognises the Bernoulli skeleton (fixed n, two outcomes, constant p, independence) and rejects drawing without replacement from a small deck as Bernoulli. They derive the binomial formula from a tree as (number of paths) × (probability of one path), see why the terms are the expansion of (q + p)^n, and never drop the n-choose-k. They get the mean np and variance npq from indicators, read the shape of B(n, p), and separate the mean from the mode. They derive the geometric law q^(k−1)p, the tail q^k, the mean 1/p by first-step analysis, and memorylessness as the proof that "a success is due" is false. They see Poisson as the limit of B(n, λ/n), and they pick the right model from the wording of a problem.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: success = PRIMARY (strawberry red), failure = MUTED grey, parameters p/q and model names = SECONDARY (teal), results, means and highlights = deep gold `#D19A00`, general laws = PURPLE, warnings = PRIMARY with a cross, checks = GREEN. Bar charts use the Chapter 4 `chart`/`bars` helpers. Maths uses `MathTex`. Each scene has a small grey lesson header top left. Clear the frame with `FadeOut` between scenes.

**TTS note:** symbols are spoken as words: "n choose k", "p to the k", "q to the n minus k", "e to the minus lambda", "zero point six". The variance is always said as "variance", never "var".

---

## Scene 0 — Title card

**Narration:** Chapter five. Bernoulli trials and the binomial distribution.

**Visuals:** kicker "Probability", title "Chapter 5 · Bernoulli Trials and the Binomial Distribution".

---

## Scene 1 — Hook: one skeleton, many stories

**Narration:** A player takes ten free throws. A factory tests twenty bulbs. You guess eight true or false answers. A die is rolled five times, and you only care about sixes. Different stories, one skeleton. Something is repeated a fixed number of times, and each time you record only yes or no. That skeleton has its own distribution, and this chapter builds it.

**Visuals:** four story cards in a 2 × 2 grid. Then a row of ten circles fills in one by one with S (red) or F (grey), and the caption "fixed n  ·  yes or no" appears beneath.

---

## Scene 2 — Bernoulli trials (Lesson 5.1)

**Narration:**

- **Beat a:** Four conditions make Bernoulli trials. A fixed number of trials, n. Two outcomes each time, success and failure. The same success probability p on every trial, with q equal to one minus p. And independence: no trial changes another.
- **Beat b:** Here is the trap. Drawing cards without replacement feels like the same draw repeated, but it is not. The first ace has chance four over fifty two. The next is three over fifty one, or four over fifty one, depending on the first. Put the card back, and the trials are Bernoulli again.
- **Beat c:** One trial gives the Bernoulli variable: X is one on success and zero on failure. Its mean is p. Its variance is p minus p squared, which is p times q. That is largest, one quarter, when p is one half.

**Visuals:**

- **Beat a:** A numbered checklist of the four conditions, each line fading in on its clause; the p/q line is teal.
- **Beat b:** Two cards side by side. Left "Without replacement": `4/52, then 3/51 or 4/51`, tag "not Bernoulli" in red, which pulses. Right "With replacement": `4/52 every draw`, tag "Bernoulli" in green.
- **Beat c:** A two-row table `x: 0, 1 / P: q, p`, then `E[X] = 0·q + 1·p = p` and `Var(X) = p − p² = pq`, and a gold note "largest, 1/4, at p = 1/2".

---

## Scene 3 — The binomial formula, derived (Lesson 5.2)

**Narration:**

- **Beat a:** A striker scores each penalty with probability zero point six. She takes three. What is the chance of exactly two goals? Draw every way it can go: three kicks, eight paths.
- **Beat b:** Three paths have exactly two goals: S S F, S F S, and F S S. Multiply along each one. Every one gives zero point six squared, times zero point four: zero point one four four. Where the goals fall does not matter. Only how many.
- **Beat c:** How many such paths are there? Choose which two of the three kicks score. Three choose two, which is three. Add them up: three times zero point one four four, which is zero point four three two.
- **Beat d:** Nothing depended on three or two. With n trials, the chance of exactly k successes is n choose k, times p to the k, times q to the n minus k. The number of paths, times the probability of one path. These terms are exactly the expansion of q plus p, to the power n. That is why they add to one, and why the distribution is called binomial.
- **Beat e:** The classic slip. Exactly two heads in four tosses is not one sixteenth. That is one arrangement. There are six, so the answer is six sixteenths, three eighths. And for at least one success, use the complement: one minus q to the n.

**Visuals:**

- **Beat a:** A three-level S/F tree grows from a root on the left, with `0.6` and `0.4` on the first two edges and the leaves labelled SSS … FFF.
- **Beat b:** The leaves SSF, SFS and FSS get gold boxes and `0.144` beside each. On the right, `P(SSF) = (0.6)^2(0.4) = 0.144`.
- **Beat c:** `\binom{3}{2} = 3 \text{ paths}` then `P(X=2) = 3 × 0.144 = 0.432` in gold.
- **Beat d:** Tree fades. The general formula `P(X=k) = \binom{n}{k} p^k q^{n-k}` with braces "number of paths" and "one path", then `\sum_k \binom{n}{k}p^kq^{n-k} = (q+p)^n = 1` in purple.
- **Beat e:** A red card `(1/2)^4 = 1/16` crossed out beside a green card `\binom{4}{2}(1/2)^4 = 6/16 = 3/8`; below, `P(X ≥ 1) = 1 − q^n` in gold.

---

## Scene 4 — Shape, mean and variance (Lesson 5.3)

**Narration:**

- **Beat a:** A player hits thirty percent of her shots and takes ten. You would guess about three. Here is why. Write X as a sum of indicators, one per trial, each with mean p. Expectations always add, so the mean is n p. The trials are independent, so the variances add too, and the variance is n p q.
- **Beat b:** Now the shape. At p equal to one half the bars are symmetric. For small p they pile up on the left, with a tail to the right. The spread, n p q, is widest at one half.
- **Beat c:** The mean need not be a value you can get: five fair tosses have mean two point five heads. The most likely value comes from n plus one, times p. And a favourite exam trick: the variance divided by the mean is q. Mean four and variance three give q equal to three quarters, so p is one quarter, and n is sixteen.

**Visuals:**

- **Beat a:** Bar chart of B(10, 0.3) on the left, gold wedge under 3. Right: `X = I_1 + \cdots + I_n`, `E[X] = np = 3`, `Var(X) = npq = 2.1`.
- **Beat b:** The bars morph to B(10, 0.5) (label `p = 0.5`, "symmetric"), then to B(10, 0.1) (label `p = 0.1`, "skewed right"); the wedge follows the mean.
- **Beat c:** Right panel replaced by `n=5, p=1/2: np = 2.5` with "not a possible value", `mode: largest k ≤ (n+1)p`, and `Var/E = npq/np = q` with `q = 3/4 ⇒ p = 1/4, n = 16`.

---

## Scene 5 — Waiting for the first success: geometric (Lesson 5.4)

**Narration:**

- **Beat a:** Change the question. Roll until a six appears. Now the number of trials is not fixed. We count how long we wait. The tree is lopsided, because a success ends the story. Only the failure branch keeps growing.
- **Beat b:** First success on trial k means k minus one failures, then one success. That is a single path, so there is no n choose k. The probability is q to the k minus one, times p. And needing more than k trials means the first k all failed: q to the k.
- **Beat c:** The mean comes from the first step. With probability p you are done in one trial. With probability q you have used one trial and face the same problem again. Solve, and the expected wait is one over p. Six rolls, on average, to see a six.
- **Beat d:** And the process has no memory. After ten misses, success is still p, and the expected remaining wait is still one over p. A success is never due.

**Visuals:**

- **Beat a:** A staircase tree: failures run right along the top (edges labelled q), successes drop down from each node (edges labelled p) to leaves labelled `p`, `qp`, `q^2p`, ending in "…".
- **Beat b:** `P(X=k) = q^{k-1}p` then `P(X>k) = q^k` below the tree.
- **Beat c:** Tree fades. `E = p·1 + q(1 + E)` transforms to `E = 1/p`; gold note "a six: 6 rolls on average".
- **Beat d:** `P(X > m+n | X > m) = q^{m+n}/q^m = q^n = P(X > n)` in purple; a red card "after 10 misses, a success is due" crossed out.

---

## Scene 6 — Rare events: a glimpse of Poisson (Lesson 5.5)

**Narration:**

- **Beat a:** A typist makes two typos a page, on average. Every character is a tiny chance of a typo. That is a binomial with huge n and tiny p, and all we know is the average, lambda, equal to n p.
- **Beat b:** Hold lambda fixed at two and let n grow. The binomial bars settle onto one shape. The limit is e to the minus lambda, times lambda to the k, over k factorial. Its mean is lambda, and so is its variance.
- **Beat c:** Every piece has a source. Lambda to the k over k factorial comes from n choose k, times p to the k. E to the minus lambda is the limit of q to the n, the chance of no events at all. So the chance of a clean page is e to the minus two, about zero point one three five.

**Visuals:**

- **Beat a:** A "page" rectangle filled with small grey dots, two of them red. Beside it `n \text{ huge}, p \text{ tiny}, \lambda = np = 2`.
- **Beat b:** Bar chart of B(10, 0.2) with gold Poisson(2) dots; bars morph to B(100, 0.02) and the label changes `n = 10` → `n = 100`. Right: `P(X=k) = e^{-λ}λ^k/k!` and `E = Var = λ`.
- **Beat c:** Right panel: arrows `\binom{n}{k}p^k → λ^k/k!` and `q^n → e^{-λ}`, then `P(0) = e^{-2} ≈ 0.135` in gold.

---

## Scene 7 — Choosing the right model (Lesson 5.6)

**Narration:**

- **Beat a:** The first line of a problem wins or loses the marks: which model fits? Fixed n, constant p, independent trials: binomial. Trials until the first success: geometric. Rare events at an average rate: Poisson. Drawing without replacement from a small group: plain counting, the hypergeometric.
- **Beat b:** A bag has five red and three blue balls. Draw three and count reds. Without replacement, exactly two reds has probability fifteen over twenty eight, about zero point five four. With replacement, the binomial gives two hundred and twenty five over five hundred and twelve, about zero point four four. From a huge population the two agree, and the binomial is fine.
- **Beat c:** Three red flags. The word until means geometric. Dealt, selected or chosen means without replacement. On average, per hour or per page, means Poisson.

**Visuals:**

- **Beat a:** Four model cards in a 2 × 2 grid, each with a teal name and a one-line trigger.
- **Beat b:** Two computation cards: `\binom52\binom31/\binom83 = 15/28 ≈ 0.536` ("without") and `\binom32(5/8)^2(3/8) = 225/512 ≈ 0.439` ("with"); a note "huge population: they agree".
- **Beat c:** Three flag lines: "until" → geometric, "dealt / selected / chosen" → counting, "on average per …" → Poisson.

---

## Scene 8 — Recap (Lesson 5.7 Mastery)

**Narration:**

- **Beat a:** To recap. Bernoulli trials: fixed n, two outcomes, constant p, independence. The binomial: n choose k, p to the k, q to the n minus k. Paths, times one path. Mean n p, variance n p q.
- **Beat b:** The geometric waits for a first success, with mean one over p and no memory. Poisson is the binomial for rare events, with mean and variance both lambda. Choose the model first, then compute. The mastery lesson mixes all of it.

**Visuals:**

- **Beat a:** Two summary cards: "Bernoulli trials" (four conditions) and "Binomial" (`\binom{n}{k}p^kq^{n-k}`, `np`, `npq`).
- **Beat b:** Two more cards: "Geometric" (`q^{k-1}p`, `1/p`, memoryless) and "Poisson" (`e^{-λ}λ^k/k!`, `λ`, `λ`). Then "Next: 5.7 · Chapter 5 Mastery" fades in at the bottom.

---

**Lesson coverage map:** 5.1 → Scenes 1–2 · 5.2 → Scene 3 · 5.3 → Scene 4 · 5.4 → Scene 5 · 5.5 → Scene 6 · 5.6 → Scene 7 · 5.7 Mastery → Scene 8.
