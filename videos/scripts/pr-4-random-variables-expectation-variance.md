# Random Variables, Expectation and Variance — Explainer Script

- **Course:** Probability
- **Chapter:** Chapter 4 · Random Variables, Expectation and Variance (id: `pr-4-random-variables-expectation-variance`)
- **Scene class:** `PrCh4Video` in `videos/scenes/pr-4-random-variables-expectation-variance.py`
- **Target runtime:** about 5 minutes (roughly 870 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner stops treating a random variable as an unknown. It is a fixed rule that attaches a number to each outcome, a function from S to the real numbers, and the randomness is in which outcome occurs. They group outcomes by value to get a probability mass function. They know its two rules: every probability is at least zero, and they sum to exactly one. They use these rules to find an unknown k and reject the root that would make a probability negative. They read the CDF F(x) = P(X ≤ x) as a staircase whose jumps are the bars. They derive E[X] = Σ xᵢpᵢ as a long-run average, see it as the balance point of the bar chart, and reject "expected = most likely" (a die never shows 3.5). They compute the expected profit of a game and its fair price. They see variance as the average squared distance from the mean, derive the shortcut Var = E[X²] − μ², and derive Var(aX + b) = a²Var(X) by watching the bars slide and stretch. Finally they use linearity of expectation with indicator variables (expected envelope matches = 1 for any n), and they know that linearity needs nothing while adding variances needs independence.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: values of the random variable and PMF bars = PRIMARY (strawberry red); outcomes and a second variable = SECONDARY (teal); means, totals, balance points and the CDF staircase = deep gold `#D19A00`; definitions and rules = PURPLE; warnings = PRIMARY with a red cross; checks = GREEN. Bar charts have no ticks, with value labels under the axis. Maths uses `MathTex`. Each scene has a small grey lesson header in the top left. The frame is cleared with `FadeOut` between scenes.

**TTS note:** symbols are spoken as words: "E of X", "the variance of a X plus b", "a squared", "twenty one over six", "three point five", "sigma", "I k". Rupees are written "Rs" on screen and spoken as "rupees".

---

## Scene 0 — Title card

**Narration:** Chapter four. Random variables, expectation and variance.

**Visuals:** kicker "Probability", title "Chapter 4 · Random Variables, Expectation and Variance".

---

## Scene 1 — Hook: the die stall

**Narration:** A stall at a fair charges ten rupees a game. Roll one die. Roll a six and you win thirty rupees. Anything else, you get nothing. Should you play? One game is pure luck. But over six hundred games, your wallet follows a very predictable path. This chapter turns outcomes into numbers, so we can ask what happens on average, and how far from average we usually land.

**Visuals:** Gold card at top: "Pay Rs 10. Roll one die." / "Roll a 6 and win Rs 30." Six die faces pop in; the 6 fills light red. "Should you play?" is written below, then the grey subline "One game: pure luck. Six hundred games: very predictable."

---

## Scene 2 — Numbers from outcomes (Lesson 4.1)

**Narration:**

- **Beat a:** Toss a coin three times. There are eight outcomes. Often you do not care which one happened, only how many heads came up. H H T, H T H and T H H are different outcomes, but they all give two. That rule, outcome in, number out, is a random variable. Formally, it is a function from the sample space to the real numbers.
- **Beat b:** A random variable is not an unknown waiting to be solved for, and its rule is not random. The rule is fixed. The randomness lives in which outcome occurs. Values can be negative, too. At the stall, your profit is twenty rupees if you roll a six, and minus ten rupees otherwise. Six outcomes, two values.

**Visuals:**

- **Beat a:** Left: column of the eight outcomes in teal under `S`. Middle: circles 3, 2, 1, 0 in red under `ℝ`. Arrows grow from each outcome to its head count; HHT, HTH, THH and the circle 2 pulse gold. Right: purple definition card "Random variable", `X : S → ℝ`, "one number per outcome".
- **Beat b:** Mapping fades. Red card "X is an unknown to solve for" is crossed out; green card "The rule is fixed. / The outcome is random." Six die faces with the label "profit at the stall (Rs)". Five arrows run to `X = −10` (teal), one arrow from the 6 to `X = +20` (red).

---

## Scene 3 — Probability distributions (Lesson 4.2)

**Narration:**

- **Beat a:** Now group the outcomes by value. Zero heads: one outcome. One head: three. Two heads: three. Three heads: one. Divide by eight and you have the distribution, the probability mass function: every value with its probability. Drawn as bars, the heights add up to one.
- **Beat b:** So a distribution is not just any list of numbers. Every probability is at least zero, and together they sum to exactly one. If a table contains an unknown k, those two rules find it. Here the sum gives a quadratic, with roots one tenth and minus one. Minus one is thrown out, because it would make a probability negative.
- **Beat c:** Many questions say, at most. The cumulative distribution function, F of x, is the probability that X is at most x. It is a running total of the bars, so it climbs as a staircase from zero to one, jumping at each value by exactly that bar's height. Take differences of the staircase and you get the bars back.

**Visuals:**

- **Beat a:** Bar chart for X = number of heads (values 0 to 3). Bars grow one at a time with labels 1/8, 3/8, 3/8, 1/8. On the right, the list `P(X = 0) = 1/8` … `P(X = 3) = 1/8`, then gold `total = 8/8 = 1`.
- **Beat b:** Two purple rule cards `pᵢ ≥ 0` and `Σ pᵢ = 1`. Below: `10k² + 9k − 1 = 0`, then `(10k − 1)(k + 1) = 0`. Green `k = 1/10` and red `k = −1`; the red one is crossed out with the note "would make a probability negative". (This is worked example 1 of lesson 4.2.)
- **Beat c:** Axes from −1 to 4.5 with y gridlines at 1/2 and 1. A gold staircase builds step by step: 0, then jumps (dashed red) at 0, 1, 2, 3 to 1/8, 4/8, 7/8, 1. Card `F(x) = P(X ≤ x)`. Then "jumps give the bars back:" with `P(X = xᵢ) = F(xᵢ) − F(xᵢ₋₁)`, while the jumps pulse.

---

## Scene 4 — Expectation: the balance point (Lesson 4.3)

**Narration:**

- **Beat a:** What is X worth on average? Roll a die many times and average the scores. Each face turns up about a sixth of the time, so the long run average is one times a sixth, plus two times a sixth, and so on up to six. That is twenty one over six, three point five. In general the expectation, E of X, is the sum of each value times its probability.
- **Beat b:** Picture the bars as weights on a see saw. The expectation is where it balances: the centre of mass. And notice, a die never shows three point five. The expected value is not the most likely value. It need not even be a possible value.
- **Beat c:** Back to the stall. Profit is twenty rupees with probability one sixth, and minus ten with probability five sixths. The expectation is twenty minus fifty, over six: minus five. You lose about five rupees a game, three thousand over six hundred games. A fair game has expected profit zero. Here the fair fee would be five rupees.

**Visuals:**

- **Beat a:** Six equal bars (values 1 to 6), "each 1/6". Below: `E[X] = (1+2+3+4+5+6)/6 = 21/6 = 3.5`. Gold card `E[X] = Σ xᵢ pᵢ`.
- **Beat b:** The axis becomes a beam on a gold fulcrum at 3.5, with a dashed gold line labelled 3.5. The beam and bars wobble slightly. Red card "expected = most likely" is crossed out; green card "A die never shows 3.5. / E[X] need not be possible."
- **Beat c:** Rows `X = +20 with p = 1/6` (red) and `X = −10 with p = 5/6` (teal). Then `E[X] = 20·1/6 + (−10)·5/6 = (20 − 50)/6 = −5`. Red line "About Rs 5 lost per game: Rs 3000 over 600 games." Green card "Fair game: expected profit = 0 / Fair fee here: Rs 5". (This is worked example 3 of lesson 4.3.)

---

## Scene 5 — Variance and standard deviation (Lesson 4.4)

**Narration:**

- **Beat a:** Two distributions can share a mean and still be very different. Both of these balance at three. One hugs the centre, the other throws its weight to the ends. To measure spread, take each value's distance from the mean, square it, and average. That is the variance. Its square root, the standard deviation sigma, is back in the original units.
- **Beat b:** Expanding the square gives a shortcut: the mean of X squared, minus the mean squared. For a die, the mean of X squared is ninety one over six, and the mean squared is forty nine over four. So the variance is thirty five over twelve, about two point nine two, and the standard deviation is about one point seven.
- **Beat c:** What does a change of units do to spread? Adding b slides every bar sideways, so no distance changes. Multiplying by a stretches every distance by a, so the variance grows by a squared. The variance of a X plus b is a squared times the variance of X. Not a times the variance plus b. So Celsius to Fahrenheit turns a standard deviation of five degrees into nine.

**Visuals:**

- **Beat a:** Two small charts side by side. Left (teal): values 2, 3, 4 with probabilities 0.25, 0.5, 0.25, labelled `Var = 0.5`. Right (red): values 1, 3, 5 with probabilities 0.45, 0.1, 0.45, labelled `Var = 3.6`. A dashed gold `μ = 3` line on each. Bottom card: `Var(X) = E[(X − μ)²]`, `σ = √Var(X)`.
- **Beat b:** Derivation stack: `E[(X−μ)²] = E[X²] − 2μE[X] + μ²`, then gold `Var(X) = E[X²] − μ²`, then `die: E[X²] = 91/6, μ² = 49/4`, then red `Var(X) = 91/6 − 49/4 = 35/12 ≈ 2.92, σ ≈ 1.71`.
- **Beat c:** Long axis from 0 to 9 with the heads distribution (red). Caption "X: heads in 3 tosses". The bars slide 5 units right and turn teal: "X + 5: slides over, same spread". Then they become purple bars at 0, 2, 4, 6: "2X: every distance doubles, variance times 4". Green card `Var(aX + b) = a² Var(X)`; red `a Var(X) + b` is crossed out. Footer: "Celsius to Fahrenheit, F = 1.8C + 32: SD 5 becomes 9."

---

## Scene 6 — Linearity and indicator variables (Lesson 4.5)

**Narration:**

- **Beat a:** Now the strongest tool in the chapter. The expectation of a sum is the sum of the expectations. Always, even when the variables depend on each other. Pair it with indicator variables, which are one if something happens and zero if not. An indicator's expectation is just the probability of its event.
- **Beat b:** n letters go into n envelopes at random. How many land in their own envelope, on average? Let I k be one if letter k lands in envelope k. Each has probability one over n. Add n of them, and the expected number of matches is exactly one, for any n. The indicators depend on each other, and linearity does not care.
- **Beat c:** Variance is different. Variances add only when the variables are independent. Heads and tails in three tosses each have variance zero point seven five. But heads plus tails is always three, with variance zero, not one point five. Linearity of expectation needs nothing. Adding variances needs independence.

**Visuals:**

- **Beat a:** Large `E[X + Y] = E[X] + E[Y]`; green card "Always. Even when X and Y are dependent." Below: the indicator definition `I_A = 1 if A happens, 0 if not` and red `E[I_A] = 1·P(A) + 0 = P(A)`.
- **Beat b:** Four envelopes (env 1 to env 4). Letters 3, 2, 4, 1 drop in; only letter 2 is in its own envelope (green, pulses), the rest are teal. Then `X = I₁ + I₂ + ⋯ + Iₙ` and gold `E[X] = 1/n + 1/n + ⋯ + 1/n (n terms) = 1`. Green card "Dependent indicators. Still exactly 1, for any n."
- **Beat c:** `Var(X + Y) = Var(X) + Var(Y)` with the gold note "only when X and Y are independent". Then `X = heads, Y = tails in 3 tosses: Var(X) = Var(Y) = 0.75` and red `X + Y = 3 always ⇒ Var(X + Y) = 0 ≠ 1.5`. Two summary cards: green "Linearity of E: needs nothing" and gold "Adding variances: needs independence".

---

## Scene 7 — Recap (Lesson 4.6 Mastery)

**Narration:** Chapter four in five lines. A random variable is a fixed rule that turns outcomes into numbers. Its distribution lists probabilities that are never negative and add to one, and the CDF is their running total. Expectation is the balance point, not the most likely value. Variance is the mean of the squares minus the square of the mean. Shifting leaves it alone, and scaling squares the factor. And expectation is linear, always, which with indicators makes hard counts easy. Now test yourself in the mastery lesson.

**Visuals:** Title "Chapter 4 in five lines". Five numbered lines fade in one by one, colour-coded: (1) red, random variable as a rule; (2) teal, distribution rules and F as running total; (3) gold, E[X] as balance point; (4) purple, Var = E[X²] − μ² with shift and scale; (5) green, linearity and indicators. Footer "Next: 4.6 · Chapter 4 Mastery".

---

**Lesson coverage map:** Hook → Scene 1 · 4.1 → Scene 2 · 4.2 → Scene 3 · 4.3 → Scene 4 · 4.4 → Scene 5 · 4.5 → Scene 6 · 4.6 Mastery → Scene 7.
