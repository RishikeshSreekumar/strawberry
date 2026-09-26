# Course: Probability, from Counting Outcomes to Distributions

**Slug:** `probability` (a course alongside `calculus` and `trigonometry`, using the same block schema and seed-script pattern.)

**Purpose:** Build a feel for chance as something you can *measure*. Probability is a fraction of a sample space. Conditioning shrinks that space. A tree multiplies along its branches and adds across them. A random variable turns outcomes into numbers you can average. The student should be able to **derive** every rule (addition, complement, multiplication, total probability, Bayes, binomial) from a small core instead of memorising a formula sheet. Coverage matches CBSE Class 11–12 and JEE Main/Advanced probability, but the course is taught for understanding.

**End state:** Given any chance situation, the student can reconstruct the answer from:

```text
list / count the sample space → events are subsets → P = measure of the subset
→ condition = shrink the space → tree: multiply along, add across → reverse the tree (Bayes)
→ random variable = number attached to each outcome → expectation = balance point
```

They should be able to explain why a 99%-accurate test can still give a mostly-wrong positive, why switching wins Monty Hall 2/3 of the time, and why 23 people are enough for a shared birthday. They should also be able to pick the right model (binomial, geometric, Poisson, or plain counting) for a word problem.

**Three threads run through every chapter**
1. **Intuition + simulation:** every new idea first appears as a picture that moves (a sample-space grid lighting up, a simulator converging, a tree whose branches reweight) before it appears as a formula. Where intuition is known to fail, the student runs the experiment *first*, then derives why.
2. **Derivation drill:** every rule is derived from the previous ones (complement from the axioms, multiplication from the definition of conditional probability, Bayes from writing P(A∩B) two ways, binomial from a tree). Each chapter's mastery lesson hides the formulas.
3. **Named misconceptions:** the classic probability fallacies (gambler's fallacy, "two outcomes means 50-50", independent ≡ exclusive, P(A|B) = P(B|A), base-rate neglect, "expected = most likely") are each tackled head-on with a `concept` quiz.

---

## Chapter map

| Ch | Title | Core idea |
| -- | ----- | --------- |
| 0 | Chance, Experiments and Events | A random experiment has a sample space; events are subsets, combined with set algebra |
| 1 | Measuring Probability | Probability is a measure on the sample space: classical, frequency, axioms, addition and complement rules |
| 2 | Conditional Probability and Independence | Conditioning shrinks the sample space; the multiplication rule and independence follow |
| 3 | Total Probability and Bayes' Theorem | Split by causes, then reverse the tree; base rates and Monty Hall |
| 4 | Random Variables, Expectation and Variance | Attach numbers to outcomes; the distribution's balance point and spread |
| 5 | Bernoulli Trials and the Binomial Distribution | Repeated independent yes/no trials; binomial, geometric and a glimpse of Poisson |

---

## Chapter 0: Chance, Experiments and Events

**Purpose:** Move from "chance is vague" to a precise object: a list of outcomes (the sample space) and subsets of it (events). Build the set language every later rule is written in.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 0.1 | Uncertainty You Can Measure | Single outcomes are unpredictable, but long-run proportions are stable | Hook: flip a coin 10 times vs 10,000 times. Interactive: `prob-simulator` (coin, running relative-frequency line settling at 0.5). Misconception killed: **gambler's fallacy** ("after 5 heads, tails is due") |
| 0.2 | Experiments and Sample Spaces | List every possible outcome, at the right level of detail | Random experiment, outcome, sample space S. Listing with a tree and with a grid (two dice: 36 cells). Interactive: `prob-tree-diagram` in listing mode (two coins, then coin + die). Misconception killed: **d'Alembert's error**, "two coins have 3 outcomes: 0, 1, 2 heads" (they are not equally likely; HT ≠ TH) |
| 0.3 | Events as Subsets | An event is a set of outcomes; "it happened" means the outcome landed inside | Simple, compound, sure, impossible events. Interactive: `prob-simulator` in grid mode (two dice, highlight "sum = 7", "doubles"). Worked example: which cells make up "sum ≥ 10"? |
| 0.4 | The Algebra of Events | or = ∪, and = ∩, not = complement; exclusive and exhaustive | Union/intersection/complement/difference on the grid; De Morgan derived by shading. Mutually exclusive vs exhaustive events; a partition. Translating words: "at least one", "exactly one", "neither", "A but not B". Misconception killed: **"or" means exactly one** (in probability, A ∪ B includes both) |
| 0.5 | Counting Outcomes Without Listing | Multiplication principle, permutations and combinations size a sample space | Recap of the fundamental counting principle, ⁿPᵣ and ⁿCᵣ as tools (not re-taught in full; see PnC course). Cards, committees, arrangements of letters. Misconception killed: **ordered vs unordered mix-up** (counting the sample space ordered and the event unordered) |
| 0.6 | Chapter 0 Mastery | Can the student set up S and any event precisely? | Mixed diagnostic: list/count sample spaces, express worded events in set notation, identify exclusive/exhaustive sets, De Morgan in words |

## Chapter 1: Measuring Probability

**Purpose:** Assign numbers to events. Show that the classical, frequency and axiomatic views agree, and derive every elementary rule from three axioms.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 1.1 | Classical Probability | For equally likely outcomes, P(E) = n(E)/n(S) | Derived as "fraction of the sample space"; dice, coins, cards. The equally-likely assumption made explicit. Misconception killed: **"two possible outcomes, so 50-50"** (win the lottery or not; sum of two dice is 2 or not) |
| 1.2 | Probability as Long-Run Frequency | Relative frequency settles to the classical value (law of large numbers, informally) | Interactive: `prob-simulator` (two-dice sum; frequency bars converging to the triangular 1/36…6/36 shape). Empirical probability from data tables. Misconception killed: **small samples are reliable** (3 heads in 4 flips does not mean P = 0.75) |
| 1.3 | The Axioms of Probability | Three rules; everything else is a consequence | Axiomatic definition: P(E) ≥ 0, P(S) = 1, additivity for exclusive events. Derive P(∅) = 0, P(E′) = 1 − P(E), A ⊆ B ⇒ P(A) ≤ P(B), 0 ≤ P ≤ 1. Assigning probabilities to non-equally-likely outcomes (loaded die). Odds in favour/against converted to probability. Misconception killed: **odds are probabilities** (odds 3:2 means P = 3/5, not 3/2 or 2/3) |
| 1.4 | The Addition Rule | P(A ∪ B) = P(A) + P(B) − P(A ∩ B); the overlap is counted twice | Derived by shading the grid in `prob-simulator` grid mode. Three-event inclusion–exclusion derived by the same shading argument. Worked: divisible by 2 or 3 from 1–100. Misconception killed: **P(A or B) = P(A) + P(B) always** (answers above 1 give it away) |
| 1.5 | The Complement Trick and the Birthday Problem | "At least one" is 1 − P(none) | De Méré's problem (at least one six in 4 rolls vs a double-six in 24). Interactive: `function-machine` for 1 − (5/6)^n. Birthday problem derived as a product; `function-machine` with the approximation 1 − e^{−n(n−1)/730}, showing the 23-person crossing. Misconception killed: **"at least one six in 4 rolls = 4/6"** and **"you need 183 people for a birthday match"** |
| 1.6 | Probability by Counting | Use ⁿCᵣ for both numerator and denominator, consistently | Drawing balls from urns, card hands, committees with constraints, arrangements (letters together). Worked examples in steps, JEE-style. Misconception killed: **mixing ordered and unordered counts** in one fraction |
| 1.7 | Chapter 1 Mastery | Any elementary event, any method | Mixed mastery: classical, axiomatic deductions, addition rule with three events, complement, counting-based, odds |

## Chapter 2: Conditional Probability and Independence

**Purpose:** New information changes the sample space. From one definition, derive the multiplication rule and a precise notion of independence.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 2.1 | Shrinking the Sample Space | P(A\|B) = P(A ∩ B)/P(B): B becomes the new universe | Interactive: `prob-simulator` grid mode with a "given" event greying out the rest of the 36 cells. Two-way tables. Properties (P(S\|B) = 1, P(A′\|B) = 1 − P(A\|B)). Misconception killed: **P(A\|B) = P(B\|A)** (P(spots \| measles) vs P(measles \| spots)) |
| 2.2 | The Multiplication Rule | P(A ∩ B) = P(A)·P(B\|A): rearranged definition, read as "first A, then B given A" | Sequential draws without replacement; extension to three events. Worked: two aces in a row, defective bulbs. Misconception killed: **ignoring that the urn changed** (using 4/52 · 4/52 without replacement) |
| 2.3 | Independence | A, B independent ⇔ P(A ∩ B) = P(A)P(B) ⇔ P(A\|B) = P(A) | Check independence on the grid (first die even vs sum = 7: independent, surprisingly). Independence of complements derived. Pairwise vs mutual independence for three events (the two-coin counterexample). Misconception killed: **independent = mutually exclusive** (exclusive events with positive probability are maximally dependent) |
| 2.4 | Trees for Multi-Stage Experiments | Multiply along a branch, add across branches | Interactive: `prob-tree-diagram` (two-stage, then three-stage; edit branch probabilities, watch path products and the sum = 1 check). Worked: urn transfer problems, a best-of-three match. Misconception killed: **adding along a branch / multiplying across** |
| 2.5 | Repeated Independent Trials and Reliability | Independent components: series multiplies success, parallel multiplies failure | Systems in series/parallel; shooter hits target; "problem solved by at least one of three students". Interactive: `function-machine` for 1 − (1 − p)^n redundancy. Misconception killed: **"three 50% chances make a sure thing"** |
| 2.6 | Conditioning Traps | The precise conditioning event matters | Two-child problem ("at least one boy" vs "the elder is a boy"), Bertrand's box. Both solved on an explicit sample space and on a tree. Misconception killed: **"the other one is equally likely either way"** |
| 2.7 | Chapter 2 Mastery | Condition, multiply, test independence, on unseen problems | Mixed mastery incl. a two-way table, a without-replacement tree, an independence proof, a three-student "at least one" |

## Chapter 3: Total Probability and Bayes' Theorem

**Purpose:** Handle problems where the outcome depends on a hidden cause: split by causes (total probability), then reason backwards from effect to cause (Bayes). Build intuition that survives the base-rate trap and Monty Hall.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 3.1 | Partitions and the Law of Total Probability | P(A) = Σ P(Eᵢ)P(A\|Eᵢ): a weighted average over causes | Partition of S (from 0.4). Derived by cutting A into pieces. Interactive: `prob-tree-diagram` (three machines, defect rates; the reconverging A-leaves summed). Worked: urn chosen by a die. Misconception killed: **averaging the conditional probabilities without weights** |
| 3.2 | Reversing the Tree: Bayes' Theorem | P(Eᵢ\|A) = P(Eᵢ)P(A\|Eᵢ) / Σ P(Eⱼ)P(A\|Eⱼ) | Derived by writing P(Eᵢ ∩ A) two ways. Prior, likelihood, posterior named. Interactive: `prob-tree-diagram` with "observe A" toggle that re-draws the tree reversed. Worked in steps: which machine made the defective bolt? |
| 3.3 | The Base-Rate Trap | A rare condition plus an accurate test can still give mostly false positives | Medical test (1% prevalence, 99% sensitive, 95% specific). Natural frequencies: 10,000 people. Interactive: `graph-explorer` of posterior vs prior, 0.99x / (0.99x + 0.05(1 − x)). Misconception killed: **"a 99% accurate test means a 99% chance you're sick"** (base-rate neglect / prosecutor's fallacy) |
| 3.4 | Bayes with Many Causes | The same machinery for 3+ hypotheses, JEE-style | Truth-teller problems ("A speaks truth 3/4 of the time; he reports a six…"), bags of balls, insurance (drivers classes), exam MCQ guessing ("knows vs guesses"). Worked examples in steps with a table layout |
| 3.5 | The Monty Hall Problem | The host's choice carries information; switching wins 2/3 | Interactive: `prob-simulator` Monty Hall mode (play, then auto-run 1000 games with stick vs switch). Then the tree via Bayes; the 100-door version for intuition. Misconception killed: **"two doors left, so 50-50"** |
| 3.6 | Updating Beliefs | Today's posterior is tomorrow's prior | Second independent test after a positive; repeated evidence (a coin that might be two-headed). Interactive: `prob-tree-diagram` chained. Misconception killed: **evidence always moves you in proportion to its accuracy** (it depends on the prior) |
| 3.7 | Chapter 3 Mastery | Total probability and Bayes on unseen setups | Mixed mastery: factories, truth-tellers, medical tests, Monty-style variants, a sequential update |

## Chapter 4: Random Variables, Expectation and Variance

**Purpose:** Turn outcomes into numbers so they can be summarised: distributions, the expected value as a balance point, and variance as spread. Linearity of expectation is the course's strongest tool.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 4.1 | Numbers from Outcomes | A random variable is a *function* from S to ℝ | Examples: number of heads in 3 tosses, sum of two dice, profit in a game. Table mapping outcomes to values. Misconception killed: **"a random variable is a variable/unknown"** (it is a rule attaching a number to each outcome) |
| 4.2 | Probability Distributions | A table of values with probabilities that sum to 1 | Probability mass function; finding k so that ΣP = 1; the cumulative distribution F(x) = P(X ≤ x). Interactive: `prob-distribution-explorer` custom-pmf mode (edit bars, sum-to-1 indicator, CDF staircase). Misconception killed: **probabilities in a distribution can be negative or sum to anything** |
| 4.3 | Expectation: The Balance Point | E[X] = Σ xᵢpᵢ is the centre of mass of the bar chart | Derived as a long-run average; `prob-simulator` running mean of a die settling at 3.5; balance-point view in `prob-distribution-explorer`. Fair games and expected profit. Misconception killed: **"the expected value is the most likely value"** (E of a die is 3.5, which never appears) |
| 4.4 | Variance and Standard Deviation | Var(X) = E[(X − μ)²] = E[X²] − μ² | Shortcut formula derived; two distributions with the same mean and different spread in `prob-distribution-explorer`. Var(aX + b) = a²Var(X) derived. Misconception killed: **Var(aX + b) = aVar(X) + b** (shifting adds no spread, scaling squares) |
| 4.5 | Linearity and Indicator Variables | E[X + Y] = E[X] + E[Y] always, even when dependent | Indicator variables; expected number of heads, expected number of matched letters in envelopes (= 1 for any n), expected number of distinct birthday coincidences. Misconception killed: **linearity needs independence** (it doesn't; variance additivity does) |
| 4.6 | Chapter 4 Mastery | Build a distribution, compute mean and variance, use linearity | Mixed mastery: find k, CDF reading, expected profit of a game, Var shortcut, transformed variable, indicator trick |

## Chapter 5: Bernoulli Trials and the Binomial Distribution

**Purpose:** Model the most common random experiment: repeated independent yes/no trials. Derive the binomial distribution from a tree, read its shape, and glimpse its relatives (geometric, Poisson). Close with choosing the right model.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 5.1 | Bernoulli Trials | Fixed n, two outcomes, constant p, independence | The four conditions checked on examples and non-examples. Bernoulli variable: mean p, variance pq. Misconception killed: **drawing without replacement is a sequence of Bernoulli trials** (p changes, trials are dependent) |
| 5.2 | The Binomial Formula, Derived | P(X = k) = ⁿCₖ pᵏ qⁿ⁻ᵏ: one path's probability × number of paths | Derived on a `prob-tree-diagram` of 3–4 trials (paths with k successes all have the same product). Link to the binomial expansion (q + p)ⁿ = 1. Worked: exactly/at least/at most k. Misconception killed: **forgetting the ⁿCₖ** (only counting one arrangement) |
| 5.3 | Shape, Mean and Variance of the Binomial | E[X] = np, Var(X) = npq, via indicators | Interactive: `prob-distribution-explorer` binomial mode (n, p sliders; mean and ±σ markers; highlight P(X ≤ k)). Symmetry at p = ½; skew otherwise; the most likely value near np. Finding n and p from mean and variance (JEE staple). Misconception killed: **"the most likely number of successes is always exactly np"** |
| 5.4 | Waiting for the First Success: Geometric | P(X = k) = q^{k−1}p, E[X] = 1/p | Derived from a one-sided tree; P(X > k) = qᵏ via `function-machine`. Memorylessness derived. `prob-distribution-explorer` geometric mode. Misconception killed: **gambler's fallacy revisited** ("after 10 misses a success is due") |
| 5.5 | Rare Events: A Glimpse of Poisson | Binomial with large n, small p ≈ e^{−λ}λᵏ/k!, λ = np | Motivating data: typos per page, calls per minute. Interactive: `prob-distribution-explorer` overlay mode (binomial(n, λ/n) vs Poisson(λ) as n grows). Kept brief: mean = variance = λ. Misconception killed: **Poisson needs to be memorised separately** (it is a binomial limit) |
| 5.6 | Choosing the Right Model | Match the story to binomial, geometric, Poisson or plain counting (hypergeometric) | Decision checklist: fixed n? replacement? counting until success? rare events over a continuum? Mixed "which model and why" concept quizzes; `prob-simulator` comparing with/without replacement |
| 5.7 | Chapter 5 Mastery | Full-course diagnostic | Mixed mastery spanning the course: sample spaces, addition rule, conditional/Bayes, expectation/variance, binomial calculations incl. "at least one" and finding n |

---

## Engineering work this course needs

Existing components reused: `function-machine` (1.5, 2.5, 5.4: "at least one" and birthday curves), `graph-explorer` (3.3: posterior as a function of prior). Both use only the `math-eval` grammar (`^`, `exp`).

New components (each needs a schema in `src/modules/content/schemas/blocks.ts`, a renderer in `components/interactives/`, and a case in `index.tsx`):

| Component | Used in | What it does |
| --------- | ------- | ------------ |
| `prob-simulator` | 0.1, 0.3, 0.4, 1.2, 1.4, 2.1, 2.3, 3.5, 4.3, 5.6 | Monte Carlo simulator with a sample-space view. Modes: coin, die, two-dice (6×6 grid with highlightable events A, B, their union/intersection/complement, and a "given" event that greys out the rest), urn (with/without replacement), Monty Hall (stick vs switch). Run 1/10/100/1000 trials; running relative-frequency line against the theoretical value |
| `prob-tree-diagram` | 0.2, 2.4, 3.1, 3.2, 3.6, 5.2 | Multi-stage probability tree. Branch probabilities editable via sliders (complements update automatically). Shows path products at leaves, a leaf-sum check, and an event highlight that sums selected leaves. Bayes mode: "observe event" gives the posterior for each first-stage branch with a natural-frequency readout (out of N people) |
| `prob-distribution-explorer` | 4.2, 4.3, 4.4, 5.3, 5.4, 5.5 | PMF bar chart with CDF staircase toggle. Modes: custom (editable table), binomial(n, p), geometric(p), Poisson(λ), binomial-vs-Poisson overlay. Shows mean as a balance-point wedge, ±σ band, and a shaded P(a ≤ X ≤ b) region with live value |

Also needed: `scripts/seed-probability.ts` (mirrors the trigonometry seed script) and a `probability` course row. Also a set of chapter videos (Manim) for Chapters 0–5, following `videos/scripts/trig-*` and `videos/scenes/trig-*`.
