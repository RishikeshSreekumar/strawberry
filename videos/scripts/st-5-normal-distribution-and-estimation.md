# The Normal Distribution and Estimation — Explainer Script

- **Course:** Statistics
- **Chapter:** Chapter 5 · The Normal Distribution and Estimation (id: `st-5-normal-distribution-and-estimation`)
- **Scene class:** `StCh5Video` in `videos/scenes/st-5-normal-distribution-and-estimation.py`
- **Target runtime:** about 5.5 to 6 minutes (roughly 1,000 spoken words at Samantha's default ~175 wpm). Rendered: 5 min 50 s.

**Learning goal.** The learner sees a histogram of relative-frequency density settle into a smooth density curve, where area (never height) is proportion and the total area is 1. They meet the normal curve as a bell fixed by μ (centre) and σ (spread) and use the 68–95–99.7 rule. They standardise with z = (x − μ)/σ so that one table Φ(z) answers every question, and a negative z gives a small area, not a negative one. They run the table backwards to find a cut-off (top 10% is about area, not "90 marks"). They watch sample means pile up into a bell of spread σ/√n even from a skewed population, and they learn that a bigger sample fixes precision but not bias. Finally they build x̄ ± 1.96·σ/√n and read "95% confident" as a statement about the method.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: histogram bars and data = SECONDARY (teal); density curves = PRIMARY (strawberry red); the mean, cut-offs and estimates = deep gold `#D19A00`; shaded probabilities and definitions = PURPLE; warnings = PRIMARY; checks and covering intervals = GREEN. Axes are plain ink with MathTex numbers under the ticks. Each scene has a small grey lesson header top left. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("mu", "sigma", "x bar", "phi of z", "sigma over root n", "one point nine six").

Data are the ones used in the chapter content (`src/modules/content/statistics-chapter-5-content.ts`): heights N(160, 8²); the bus wait uniform on [0, 20]; marks N(62, 10²) with Φ(1.2) = 0.8849 and the top-10% cut-off 62 + 1.282 × 10 ≈ 75; screen time with mean 180 and SD 60 (right-skewed); bulbs n = 64, x̄ = 1180 h, σ = 120 h.

---

## Scene 0 — Title card

**Narration:** Chapter five. The normal distribution, and estimation.

**Visuals:** kicker "Statistics", title "Chapter 5 · The Normal Distribution and Estimation".

---

## Scene 1 — Hook: the staircase becomes a curve (Lesson 5.1, part a)

**Narration:** Measure the heights of a hundred and twenty students and draw a histogram. You get a jagged staircase of bars. Now imagine measuring thousands of students, then tens of thousands, and making the bins narrower each time. The staircase gets finer and finer, until it settles into a smooth curve. This chapter is about that curve, and about what it lets us say from a single sample.

**Visuals:** Axes 130–190 cm, "height (cm)". A teal density histogram of 120 simulated heights (bins of 5) grows up; caption "120 students, bins of 5 cm". It transforms to 3,000 students with 2.5 cm bins, then 60,000 students with 1 cm bins (captions change). The red curve N(160, 8²) is drawn over the bars.

---

## Scene 2 — Density curves (Lesson 5.1)

**Narration (a):** First, one adjustment. We rescale each bar so that its area, not its height, is the fraction of the data in that class. That is relative frequency divided by class width. Now all the areas add up to one, whatever the sample size and whatever the bin width. The smooth limit is a density curve. The proportion of the data between a and b is the area under the curve between a and b.

**Visuals (a):** Header "5.1 · From histograms to density curves". Card: bar height = relative frequency / class width. Card "total area = 1". The curve fades in over the bars, and the area between 150 and 165 is shaded purple with "proportion between a and b = area between a and b".

**Narration (b):** A bus comes every twenty minutes, and you arrive at random. Your wait is spread evenly from zero to twenty minutes, so the density is a flat line at height one twentieth. The chance of waiting between five and twelve minutes is a rectangle: width seven, times height zero point zero five, which is zero point three five. And the chance of waiting exactly five minutes? The area over a single point is zero. The height of a density curve is not a probability. Only areas are.

**Visuals (b):** Axes 0–20 "waiting time (min)"; flat red line labelled "height = 1/20 = 0.05". Purple rectangle over [5, 12], "P(5 < X < 12) = 7 × 0.05 = 0.35". The rectangle fades; a red segment at x = 5 with "P(X = 5) = 0"; red card "Height is not probability. Only area is."

---

## Scene 3 — The normal curve (Lesson 5.2)

**Narration (a):** The most important density curve is the normal curve: bell shaped, symmetric, and fixed by two numbers. The mean, mu, sets the centre. Slide mu, and the whole bell slides. The standard deviation, sigma, sets the spread. Make sigma bigger, and the bell gets wider and lower, because the total area must stay one.

**Visuals (a):** Header "5.2 · The normal curve". "X ~ N(μ, σ²)" and live readouts μ, σ. A red bell with a gold dashed mean line; μ slides 160 → 175 → 150 → 160; then σ goes 8 → 14 (wide, low) → 5 (tall, narrow) → 8.

**Narration (b):** Take heights that are normal, with mean one sixty centimetres and standard deviation eight. About sixty eight percent lie within one sigma of the mean, from one fifty two to one sixty eight. About ninety five percent lie within two sigma, and ninety nine point seven percent within three. But be careful. Not all data are normal. Incomes, for example, have a long right tail.

**Visuals (b):** Axes 128–192 in steps of 8, "Heights ~ N(160, 8²)". Purple shading for μ ± σ, then μ ± 2σ, then μ ± 3σ (lighter each time), with the legend "μ ± σ: 68%, μ ± 2σ: 95%, μ ± 3σ: 99.7%". Red card: "Not all data are normal: incomes have a long right tail."

---

## Scene 4 — Standardising (Lesson 5.3)

**Narration (a):** Every normal curve is the same bell, just shifted and stretched. So we can turn any value into a z score: x minus mu, over sigma, the number of standard deviations from the mean. That turns every normal into the standard normal, with mean zero and standard deviation one. And one table, capital phi of z, gives the area to the left of z.

**Visuals (a):** Header "5.3 · Standardising: the standard normal table". Gold card z = (x − μ)/σ, subtitle "how many standard deviations from the mean". An x number line 136…184 above a z number line −3…3, joined by dashed links.

**Narration (b):** How many students are shorter than one seventy centimetres? z is one seventy minus one sixty, over eight, which is one point two five. The table gives phi of one point two five equals zero point eight nine four four. About eighty nine percent.

**Visuals (b):** Standard normal axes; "Φ(z) = area left of z". Steps: P(X < 170), X ~ N(160, 8²); z = (170 − 160)/8 = 1.25; area left of 1.25 shaded; Φ(1.25) = 0.8944 ≈ 89%.

**Narration (c):** Now exam marks, with mean sixty two and standard deviation ten. What fraction score below fifty? z is minus one point two. A negative z does not give a negative probability. It just means below the mean. By symmetry, phi of minus one point two is one minus phi of one point two: one minus zero point eight eight four nine, which is zero point one one five one. About eleven and a half percent.

**Visuals (c):** Steps: Marks ~ N(62, 10²): P(X < 50); z = (50 − 62)/10 = −1.2; red card "negative z ≠ negative probability"; red shading left of −1.2; Φ(−1.2) = 1 − Φ(1.2) = 1 − 0.8849 = 0.1151.

---

## Scene 5 — Working backwards (Lesson 5.4)

**Narration:** Now run it backwards. The top ten percent on that exam get an A grade. Where is the cut off? A tempting answer is ninety marks. But top ten percent is about people, which means area, not marks. Ten percent above means ninety percent below, so phi of z equals zero point nine. Reading the table backwards gives z equals one point two eight two. Then un-standardise: x equals mu plus z sigma. Sixty two, plus one point two eight two times ten, is about seventy five marks. Nowhere near ninety.

**Visuals:** Header "5.4 · Working backwards: from proportion to value". Axes 22–102, curve N(62, 10²). A red "90?" appears near x = 90 and is struck through; the gold upper tail beyond 74.82 is shaded with a "10%" arrow. Steps: 10% above ⇒ Φ(z) = 0.90; table backwards: z = 1.282; x = μ + zσ = 62 + 1.282 × 10 ≈ 75, with a gold dashed cut-off line.

---

## Scene 6 — Samples and sampling distributions (Lesson 5.5)

**Narration (a):** Real questions are about whole populations, but we can only afford a sample. And different samples give different means. So the sample mean, x bar, is itself a random quantity. Here is a skewed population: teenagers' daily screen time, with mean one eighty minutes and standard deviation sixty. Draw a sample of four and average it. Do that hundreds of times, and stack up the means.

**Visuals (a):** Header "5.5 · Samples and sampling distributions". Small teal right-skewed population curve (gamma, mean 180, SD 60), "μ = 180, σ = 60". Four red sample dots drop onto its axis and a gold x̄ marker appears. Below, axes 80–280 "sample means"; a gold histogram of 600 means with n = 4 grows.

**Narration (b):** The means pile up in a bell, centred on the true mean. Take samples of twenty five instead, and the bell gets much narrower. The standard deviation of x bar is sigma over root n. To halve it, you need four times the sample. And this bell appears even though the population is skewed. That is the central limit theorem.

**Visuals (b):** Red normal overlay N(180, 30²); the histogram and overlay transform to n = 25 (overlay N(180, 12²)). Card SD(x̄) = σ/√n. The skewed population curve is indicated.

**Narration (c):** Two warnings. Precision depends on the sample size, not on how big the population is. And a bigger sample does not remove bias. Fifty thousand votes in an online poll are still only the people who chose to vote.

**Visuals (c):** Purple card "Precision depends on the sample size n, not on the size of the population." Red card "A bigger sample does not remove bias. 50,000 online votes are still only the people who chose to vote."

---

## Scene 7 — Confidence intervals (Lesson 5.6)

**Narration (a):** Now we can estimate. Sixty four bulbs have a mean life of eleven eighty hours, and sigma is known to be one hundred and twenty. The standard error, the standard deviation of the estimate, is one twenty over root sixty four, which is fifteen. Ninety five percent of sample means lie within one point nine six standard errors of mu. So the margin of error is one point nine six times fifteen, twenty nine point four, and the interval runs from eleven fifty point six to twelve oh nine point four hours.

**Visuals (a):** Header "5.6 · Estimation and confidence intervals". "n = 64, x̄ = 1180 h, σ = 120 h". Steps: SE = σ/√n = 120/8 = 15; gold card x̄ ± 1.96·σ/√n; margin = 1.96 × 15 = 29.4; 1180 ± 29.4 = (1150.6, 1209.4), drawn as a gold bracket on a number line 1140–1220.

**Narration (b):** What does ninety five percent confident mean? Imagine repeating the whole study twenty times. Each sample gives its own interval. Most of them catch the true mean. About one in twenty misses. The ninety five percent describes the method, not this one interval. The true mean is fixed. It is the interval that moves.

**Visuals (b):** A gold dashed vertical line μ. Twenty horizontal intervals (same width) appear one by one; nineteen green ones cross μ, one red one misses (seed chosen so exactly one misses). Green card "19 of 20 catch μ". Note: "95% describes the method, not this one interval. μ is fixed; the interval moves."

---

## Scene 8 — Recap

**Narration:** So here is the chapter in five lines. Areas under a density curve are proportions, and the total area is one. The normal curve is fixed by mu and sigma, with the sixty eight, ninety five, ninety nine point seven rule. Standardise with z, and one table answers every question. Run it backwards to find a cut off: x equals mu plus z sigma. And the sample mean has its own bell, with spread sigma over root n, which gives an estimate with an honest margin of error: x bar, plus or minus one point nine six sigma over root n.

**Visuals:** Title "Chapter 5 in five lines" and five numbered rows:
1. Areas under a density curve are proportions; total area is 1.
2. The normal curve is fixed by μ (centre) and σ (spread): 68–95–99.7.
3. Standardise with z = (x − μ)/σ; one table Φ(z) answers everything.
4. Backwards: find z from the area, then x = μ + zσ.
5. x̄ has SD σ/√n, so x̄ ± 1.96 σ/√n is a 95% interval for μ.

Footer "Next: Chapter 5 Mastery".
