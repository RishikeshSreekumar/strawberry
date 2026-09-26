# Correlation and Regression — Explainer Script

- **Course:** Statistics
- **Chapter:** Chapter 4 · Two Variables: Correlation and Regression (id: `st-4-correlation-and-regression`)
- **Scene class:** `StCh4Video` in `videos/scenes/st-4-correlation-and-regression.py`
- **Target runtime:** about 5 to 5.5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner moves from one variable to two. A scatter plot is described by direction, form, strength and outliers. Moving the origin to the point of means turns every point into a signed co-deviation rectangle; their mean is the covariance, which has the right sign but unit-dependent size. Dividing by both standard deviations gives Pearson's r, the mean product of z-scores, trapped between minus one and one and blind to curved relationships. A strong r is not a cause: lurking variables and single influential points can manufacture one. With only ranks, Spearman's rho is Pearson's r applied to ranks. The least-squares line minimises the total area of residual squares, passes through the point of means and has slope Cov over sigma x squared. The x-on-y line is a different line; the two slopes multiply to r squared, r squared is the fraction of variation explained, and extrapolation is not supported by the data.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: data dots = SECONDARY (teal); the point of means and mean cross-hairs = gold `#D19A00`; positive co-deviation rectangles = GREEN, negative = amber ACCENT; the y-on-x line = PRIMARY (strawberry red), the x-on-y line = PURPLE; definitions and formulas = PURPLE or INK; warnings = PRIMARY with a cross mark. Each scene has a small grey lesson header top left. Axes on the left half, formulas on the right. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("x bar", "sigma x squared", "b y x times b x y").

Data are the ones used in the chapter content (`src/modules/content/statistics-chapter-4-content.ts`): study hours vs marks (10 students); the running five points (1, 2), (2, 4), (3, 3), (4, 6), (5, 5) with x bar = 3, y bar = 4, Cov = 1.6, sigma squared = 2 for both, r = 0.8, y hat = 1.6 + 0.8x, x hat = 0.8y − 0.2; the parabola y = x² on −3…3; the judges' ranks (1..6 vs 2,1,4,3,6,5); y = x³ on 1..5 (rho = 1, r ≈ 0.94); the child-height line 80 + 6t.

---

## Scene 0 — Title card

**Narration:** Chapter four. Two variables: correlation and regression.

**Visuals:** kicker "Statistics", title "Chapter 4 · Correlation and Regression".

---

## Scene 1 — Hook: pairs and the scatter plot (Lesson 4.1)

**Narration:**

- **Beat a:** So far every data set was a list of single numbers. But the interesting questions involve two. Do students who study longer score higher? Keep both numbers for each student together, as a pair, and plot one dot per student. That is a scatter plot. Hours studied goes across, as the explanatory variable. Marks go up, as the response.
- **Beat b:** Describe any scatter plot with four words. Direction: does the cloud rise or fall? Form: a line, or a curve? Strength: how tightly the points hug that form. And outliers. This cloud rises, it is roughly straight, and it is strong.
- **Beat c:** Clouds come in every shape. Rising, falling, no pattern at all, and curved. Careful with the last one. It has no straight-line trend, but it is a perfect relationship. No line does not mean no relationship.

**Visuals:**

- **Beat a:** Header "4.1 · Scatter plots and association". Axes x 0–10, y 20–100, labels "Hours studied", "Marks". The ten study dots pop in one by one.
- **Beat b:** Right-side stack of four cards: Direction / Form / Strength / Outliers, each with a short answer ("rising", "roughly linear", "strong", "none").
- **Beat c:** Frame clears to four small panels in a row: positive, negative, none, curved (parabola). The curved panel gets a caption card "no line ≠ no relationship".

---

## Scene 2 — Covariance: moving together (Lesson 4.2)

**Narration:**

- **Beat a:** We want one number that is positive when the cloud rises and negative when it falls. The trick: move the origin to the point of means. Five points, with x bar three and y bar four. The mean lines cut the plane into four quadrants.
- **Beat b:** Join each point to the point of means with a rectangle. Its area is x minus x bar, times y minus y bar. Top right and bottom left, both deviations share a sign, so the area counts as positive. The other two quadrants count as negative. Here the areas are four, zero, zero, two and two. Their average, eight over five, is the covariance: one point six.
- **Beat c:** Drag the top point down to five comma one. Its rectangle flips into a negative quadrant, minus six, and the covariance falls to zero. Covariance has the right sign. But its size depends on units. Measure y in centimetres instead of metres and the covariance grows a hundred times, though the cloud is the same.

**Visuals:**

- **Beat a:** Header "4.2 · Covariance". Equal-scale axes x 0–6, y 0–8 on the left, five teal dots. Gold dashed cross-hairs at x = 3 and y = 4, gold dot at their crossing labelled "(x̄, ȳ) = (3, 4)". Quadrant labels "+" "−" "+" "−" fade in faintly.
- **Beat b:** Filled rectangles from each point to (3, 4): green for (1,2), (4,6), (5,5); the two on-the-line points get a small grey dash. Right side: `Cov(x, y) = (1/n) Σ (x − x̄)(y − ȳ)` then `= (4 + 0 + 0 + 2 + 2)/5 = 1.6`.
- **Beat c:** The (5,5) dot slides to (5,1); its rectangle transforms into an amber one labelled "−6". Right side: `= (4 + 0 + 0 + 2 − 6)/5 = 0`. Then a warning card "metres → centimetres: Cov × 100".

---

## Scene 3 — Pearson's r (Lesson 4.3)

**Narration:**

- **Beat a:** To remove the units, measure each deviation in standard deviations. That is, use z scores. The correlation coefficient r is the mean product of z scores, which is the covariance divided by sigma x times sigma y. For the five points, one point six over root two times root two is zero point eight.
- **Beat b:** r is unit free, and always between minus one and one. At plus or minus one, every point is exactly on a line. Near zero, there is no straight-line trend.
- **Beat c:** Two warnings. The parabola is a perfect relationship, yet its r is exactly zero: r only measures straight-line association. And r equal to zero point eight does not mean eighty percent of the points lie on a line.

**Visuals:**

- **Beat a:** Header "4.3 · Karl Pearson's r". Centre formulas: `r = (1/n) Σ z_x z_y`, then `r = Cov(x, y) / (σ_x σ_y)`, then `= 1.6 / (√2 · √2) = 0.8`.
- **Beat b:** A number line from −1 to 1 with a pointer on 0.8. Above −1, 0 and 1: three small scatter panels (perfect falling, blob, perfect rising).
- **Beat c:** Parabola panel with "r = 0" and a red card "r measures only linear association". Myth card "r = 0.8 means 80% of points on the line" with a cross.

---

## Scene 4 — Correlation is not causation (Lesson 4.4)

**Narration:**

- **Beat a:** Across the months of a year, ice cream sales and drownings are strongly correlated. Should the city ban ice cream? Of course not. Hot weather drives both. A lurking variable can manufacture a strong r with no cause between the two.
- **Beat b:** One point can also make or break r. This round cloud has r close to zero. Add a single far-off point, and r jumps to about zero point eight eight. Always look at the picture before trusting the number.

**Visuals:**

- **Beat a:** Header "4.4 · Correlation is not causation". Three cards: "Hot weather" on top, "Ice-cream sales" bottom left, "Drownings" bottom right. Green arrows from the top card to each; a red dashed double arrow between the bottom two labelled "strong r, no cause" with a cross over a "causes" label.
- **Beat b:** Axes 0–10 both ways, nine teal dots in a blob, readout "r ≈ 0.05". A red dot fades in at (9, 9), readout changes to "r ≈ 0.88". Card "one influential point".

---

## Scene 5 — Rank correlation (Lesson 4.5)

**Narration:**

- **Beat a:** Two judges rank six singers. There are no scores, only positions. Spearman's idea: correlate the ranks themselves. The judges swap neighbours three times, so each difference d is plus or minus one, and the sum of d squared is six.
- **Beat b:** Spearman's rho is one minus six times the sum of d squared, over n times n squared minus one. That is one minus thirty six over two hundred and ten, about zero point eight three. Strong agreement. This formula is just Pearson's r applied to the ranks. And because ranks only care about order, points on y equals x cubed give a rho of exactly one, while r is only about zero point nine four.

**Visuals:**

- **Beat a:** Header "4.5 · Rank correlation". Table with rows Judge 1 (1–6), Judge 2 (2, 1, 4, 3, 6, 5), d, d²; total Σd² = 6.
- **Beat b:** Formula card `ρ = 1 − 6Σd² / (n(n² − 1))`, then `= 1 − 36/210 ≈ 0.83`. Small note "= Pearson's r on the ranks". Then a small card `y = x³: ρ = 1, r ≈ 0.94`.

---

## Scene 6 — The least-squares line (Lesson 4.6)

**Narration:**

- **Beat a:** Now the best straight line through the cloud. For each point, the miss, or residual, is the vertical gap to the line. Square each miss, and add the areas. Start with a flat line through the point of means. The squares add to ten.
- **Beat b:** Tilt the line about the point of means. The total area falls, then rises again if we tilt too far. The smallest total, three point six, comes at a slope of zero point eight. That is the least squares line.
- **Beat c:** The formula: the slope b y x is the covariance over sigma x squared, one point six over two. And the line always passes through the point of means, so the intercept is y bar minus b times x bar, which is one point six. So y hat equals one point six plus zero point eight x. The best line does not go through as many points as possible. In fact it misses all five.

**Visuals:**

- **Beat a:** Header "4.6 · The least-squares line". Same equal-scale axes and five dots, gold point of means. A red line through (3, 4) with slope tracker b = 0; residual squares (translucent purple) drawn from each point to the line. Right: readouts "slope b = 0.00" and "SSE = 10.00".
- **Beat b:** b animates 0 → 1.4 → 0.8, squares and SSE (10 − 16b + 10b²) update live. Final "SSE = 3.60" highlighted green.
- **Beat c:** Right side formulas: `b_yx = Cov/σ_x² = 1.6/2 = 0.8`, `a = ȳ − b x̄ = 4 − 2.4 = 1.6`, card `ŷ = 1.6 + 0.8x`. Myth card "best line goes through the most points" crossed out.

---

## Scene 7 — Two regression lines, prediction and fit (Lesson 4.7)

**Narration:**

- **Beat a:** To predict x from y, minimise the horizontal misses instead. That gives a different line: x hat equals zero point eight y minus zero point two. Both lines cross at the point of means. They coincide only when r is plus or minus one.
- **Beat b:** Multiply the two slopes, b y x times b x y. Zero point eight times zero point eight is zero point six four, which is r squared. And r squared has a meaning of its own: the line explains sixty four percent of the variation in y.
- **Beat c:** Finally, stay inside your data. A height line fitted to children aged three to ten predicts three hundred and twenty centimetres at age forty. The line describes the data you have, not the world beyond it.

**Visuals:**

- **Beat a:** Header "4.7 · Two regression lines". Axes and dots again; the red y-on-x line with label "y on x", then a purple x-on-y line (y = 1.25x + 0.25) with label "x on y". Gold point of means flashes.
- **Beat b:** Right: `b_yx · b_xy = r²`, `0.8 × 0.8 = 0.64`, card "r² = 0.64: 64% of the variation in y explained".
- **Beat c:** Clear right side; card `ĥ = 80 + 6t` (ages 3–10), then `t = 40 → 320 cm` in red with a cross; caption "extrapolation".

---

## Scene 8 — Recap

**Narration:** Let's recap. Plot pairs, and describe direction, form, strength and outliers. Covariance is the mean co-deviation rectangle. Divide by both standard deviations to get r, between minus one and one, measuring only straight-line association. Correlation is not causation. Spearman's rho is r on ranks. The least squares line goes through the point of means with slope covariance over sigma x squared. And the two regression lines multiply to r squared. Now try the lessons.

**Visuals:** Header "Recap". Seven short lines appear one by one in a column, each with a small coloured bullet.
