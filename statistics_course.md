# Course — Statistics: Seeing Patterns in Variation

**Slug:** `statistics` (a course alongside `calculus` and `trigonometry`; same block schema, same seed-script pattern.)

**Purpose:** Teach statistics as the study of **variation**: how to picture a pile of numbers, summarise it honestly with a centre and a spread, compare it with another pile, relate two variables, and finally reason from a sample to a population. Every formula is *derived* from a picture (the balance point, the squared deviation, the area under a curve, the least-squares line), never handed down. Coverage matches CBSE Class 11–12 statistics and the JEE statistics syllabus (grouped mean/median/mode, mean deviation, variance/SD, coefficient of variation, correlation, regression), extended to the normal distribution and the idea of estimation.

**End state:** Given any data set, raw or grouped, one variable or two, the student can reconstruct the right summary from:

```text
picture the distribution → locate a centre (balance point / middle) → measure spread (typical deviation)
→ standardise (z = distance in SDs) → relate two variables (co-deviation → r → least-squares line)
→ reason from sample to population (sampling distribution → standard error → interval)
```

They should never need a memorised formula sheet. They should be able to say *why* the median resists outliers, *why* variance squares deviations, *why* the regression line passes through (x̄, ȳ), and *what* "95% confident" does and does not mean.

**Two threads run through every chapter**
1. **Intuition + visualization.** Every new statistic appears first as something you can *move*: drag a data point and watch the mean chase it while the median stays put; drag a line through a scatter and watch the squared residuals shrink; draw samples and watch a bell curve build itself.
2. **Derivation drill.** Each chapter ends with a "reconstruct it" mastery lesson: the grouped-median formula rebuilt from an ogive, the shortcut variance formula rebuilt from the definition, the slope b = Sxy/Sxx rebuilt from "minimise the squared residuals".

**Named misconceptions this course kills** (each gets at least one `concept` quiz): "a histogram is a bar chart with the gaps removed" · "the mean is always the best average" · "the median of grouped data is the middle class's midpoint" · "SD is the average distance from the mean" · "adding a constant changes the spread" · "a long whisker means an outlier" · "r = 0 means no relationship" · "correlation implies causation" · "the regression line of x on y is just y-on-x rearranged" · "a bigger population needs a bigger sample" · "95% confidence means a 95% chance μ is in *this* interval".

---

## Chapter map

| Ch | Title | Core idea |
| -- | ----- | --------- |
| 0 | Data and Its Pictures | A data set is a distribution; the right picture makes its shape visible, and in a histogram area means frequency |
| 1 | Measures of Centre | Mean = balance point, median = middle, mode = peak; each answers a different question |
| 2 | Measures of Spread | Spread is typical distance from the centre; squaring deviations gives variance and SD |
| 3 | Shape, Position and Comparison | Five-number summary, boxplots, outliers, z-scores: where a value sits and how distributions differ |
| 4 | Two Variables: Correlation and Regression | Co-deviation measures association; minimising squared residuals gives the best line |
| 5 | The Normal Distribution and Estimation | Area under a density curve is probability; sample means vary predictably, so we can estimate μ |

---

## Chapter 0 — Data and Its Pictures

**Purpose:** establish that statistics exists because of variation; learn to organise raw data into frequency tables and draw honest pictures of it. The lasting idea is *area = frequency*.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 0.1 | Why Statistics Exists | Measurements vary; statistics describes the variation instead of hiding it | Hook: 30 students' heights, or the daily commute time of one person over a month. No two agree, yet the pile has a shape. Interactive `stats-distribution-builder` (dotplot view): add/drag points, see a shape form. Population vs sample and parameter vs statistic introduced in words. Misconception killed: "a single measurement is the truth, variation is error to ignore" |
| 0.2 | Kinds of Data | Categorical vs numerical; discrete vs continuous; the type decides the picture and the summary | Sorting activity via quizzes (pin code, shoe size, time, blood group, marks). Definition callouts. Misconception killed: "anything written with digits is numerical data" (pin codes, roll numbers) |
| 0.3 | Frequency Tables and Class Intervals | Group raw data into classes to see the shape; choose class width sensibly | Tally → ungrouped frequency table → grouped table. Inclusive (10–19) vs exclusive (10–20) classes; converting to class boundaries (9.5–19.5) and why continuous data needs it. Class mark (midpoint), class width, relative frequency. Worked example in steps from 40 raw marks. Misconception killed: "inclusive classes 10–19, 20–29 have no gap" |
| 0.4 | Histograms: Area Is Frequency | In a histogram, the *area* of a bar is the frequency; for unequal widths, height = frequency density | Interactive `stats-distribution-builder` (histogram view): bin-width slider on one data set, shape changes with bin width. Bar chart vs histogram contrast (touching bars, numeric axis). Unequal class widths: frequency density = f / width, derived from "a wide class shouldn't look more common just because it's wide". Frequency polygon from midpoints. Misconception killed: "a histogram is a bar chart with the gaps removed" / "bar height is always frequency" |
| 0.5 | Cumulative Frequency and Ogives | Running totals turn "how many below x?" into a graph you can read backwards | Less-than and more-than cumulative frequency tables; plotting at *upper* (resp. lower) class boundaries, and why. Interactive `stats-distribution-builder` (ogive view): drag a horizontal line at n/2, read the median; the two ogives cross at the median. Misconception killed: "plot cumulative frequency at the class midpoint" |
| 0.6 | Honest and Misleading Pictures | The same data can be drawn to mislead; read axes before shapes | Truncated axes, unequal-width bars without density, 3-D pies, cherry-picked intervals. Pie/bar for categorical data, stem-and-leaf for small numeric sets. Quizzes present a claim and a graph; student spots the trick |
| 0.7 | Chapter 0 Mastery | Can the student pick the right table and picture for any data set and read it both ways? | Mixed mastery quizzes: classify data, convert inclusive → boundaries, compute frequency densities for unequal classes, read an ogive both ways, spot a misleading graph |

## Chapter 1 — Measures of Centre

**Purpose:** "one number to represent the lot". Derive each average from what it *does*, compute it for raw, frequency and grouped data, and learn when each one lies.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 1.1 | The Mean as a Balance Point | The mean is the fair-share value and the point where deviations cancel: Σ(xᵢ − x̄) = 0 | Interactive `stats-distribution-builder` (dotplot with fulcrum, deviations shown): drag one point far right and the balance point follows. Derivation that deviations sum to zero. Fair-share (levelling) picture. Misconception killed: "the mean must be one of the data values" |
| 1.2 | Mean of Frequency and Grouped Data | Weight each value by its frequency; for classes, use the midpoint as a stand-in | x̄ = Σfx / Σf derived from "repeat each value f times". Grouped data: midpoint assumption and why it's an approximation. Assumed-mean method (d = x − A) and step-deviation method (u = (x − A)/h), *derived* from the balance-point shift property, not given. Worked CBSE-style table in steps. Misconception killed: "the grouped mean is exact" |
| 1.3 | Weighted and Combined Means | Combining groups: weight by size, don't average the averages | Combined mean of two sections (n₁x̄₁ + n₂x̄₂)/(n₁ + n₂). Weighted grade averages. Correcting a mean after a wrongly copied value (a JEE favourite). Effect of adding/multiplying every value on the mean. Misconception killed: "the mean of the combined class is the average of the two means" |
| 1.4 | The Median: The Middle Value | Half the data lies on each side; only order matters | Raw data: odd vs even n, (n+1)/2-th position. Discrete frequency table via cumulative frequency. Grouped data: derive Median = l + ((n/2 − cf)/f)·h as linear interpolation inside the median class, drawn on the ogive from 0.5. Interactive `stats-distribution-builder` (dotplot, mean + median markers): drag an extreme value, median does not move. Misconception killed: "the median of grouped data is the midpoint of the median class" |
| 1.5 | The Mode: The Peak | The most common value; for grouped data, estimate the peak inside the modal class | Mode for raw/discrete data; bimodal and no-mode cases. Grouped mode formula l + ((f₁ − f₀)/(2f₁ − f₀ − f₂))·h derived from the similar triangles of the histogram's crossed diagonals. Mode is the only average for categorical data. Misconception killed: "the mode is the class with the largest *class mark*" |
| 1.6 | Choosing the Right Average | Mean, median and mode answer different questions; skew and outliers pull them apart | Salary data with one CEO: mean vs median. Interactive `stats-distribution-builder`: make the data skewed and watch mean, median, mode order themselves. Empirical relation Mode ≈ 3 Median − 2 Mean for moderately skewed data (stated as empirical, not a law). Decision table: which average when. Misconception killed: "the mean is always the best average" |
| 1.7 | Chapter 1 Mastery | Any data, any average, from scratch | Mixed mastery: grouped mean by step deviation, grouped median and mode, missing-frequency problems (given median find f), corrected mean, combined mean, choosing the average |

## Chapter 2 — Measures of Spread

**Purpose:** two data sets can share a mean and look nothing alike. Build the idea of "typical distance from the centre" and derive range, mean deviation, variance and SD from it.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 2.1 | Same Centre, Different Story | A centre is not enough; spread is the second number every summary needs. Range is the crudest spread | Two batsmen with the same average, one consistent and one erratic. Interactive `stats-distribution-builder` with two data sets, same mean. Range and its fragility (one extreme value decides it). Misconception killed: "equal means imply similar data" |
| 2.2 | Quartiles, Percentiles and IQR | Cut the ordered data into quarters; the middle half's width is a robust spread | Q1, Q3 for raw data (median-of-halves convention, stated clearly) and grouped data (same interpolation formula as the median, with n/4 and 3n/4). Percentiles from the ogive. Interactive `stats-distribution-builder` (ogive view) reading Q1/Q3. IQR, semi-interquartile range. Misconception killed: "Q1 is a quarter of the maximum" |
| 2.3 | Mean Deviation | Average the distances |x − centre|; about the median it is smallest | Why raw deviations fail (they sum to 0, from 1.1) → take absolute values. MD about mean and about median for raw, discrete and grouped data (CBSE). Interactive `stats-distribution-builder` (deviations view): slide the centre point, watch Σ|x − a| bottom out at the median. Misconception killed: "mean deviation about the mean is always the smallest" |
| 2.4 | Variance and Standard Deviation | Square the deviations, average them, take the root: σ = √(Σ(x − x̄)²/n) | Why square: removes sign, punishes big deviations, and makes algebra work (preview of least squares). Interactive `stats-distribution-builder` (squared-deviation view): each deviation drawn as a square; variance = mean area. Derive the shortcut σ² = Σx²/n − x̄² step by step. Units: variance in units², SD in original units. Brief note on n vs n − 1 (sample variance) as a preview of Ch 5. Misconception killed: "SD is the average distance from the mean" (compare to MD on the same data) |
| 2.5 | SD for Frequency and Grouped Data | Weight squared deviations by frequency; step deviation carries over | σ² = Σfx²/N − (Σfx/N)², and the step-deviation form σ = h·√(Σfu²/N − (Σfu/N)²), derived. Worked grouped table in steps. Finding missing values from given mean and variance (JEE-style). Misconception killed: "in step deviation you forget to multiply back by h" (quiz with the trap option) |
| 2.6 | Shift, Scale and the Coefficient of Variation | Adding a constant moves the centre but not the spread; multiplying scales both; CV compares relative spread | Interactive `stats-distribution-builder` with shift and scale sliders applied to all points: mean moves, SD fixed under shift; both scale under ×k (SD by |k|). Mean and variance of a + bx derived. Combined variance of two groups (JEE). CV = σ/x̄ × 100 for comparing consistency across different units/means. Misconception killed: "adding a constant to every value changes the SD" |
| 2.7 | Chapter 2 Mastery | Rebuild every spread measure from "typical distance from the centre" | Mixed mastery: grouped variance by step deviation, corrected variance after a wrong entry, a + bx transforms, CV comparison, choosing IQR vs SD for skewed data |

## Chapter 3 — Shape, Position and Comparison

**Purpose:** put centre and spread together to describe shape, locate an individual value inside a distribution, flag outliers, and compare groups fairly.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 3.1 | The Shape of a Distribution | Symmetric, right-skewed, left-skewed, uniform, bimodal; the tail names the skew | Interactive `family-gallery` of density-curve shapes (symmetric bell, right-skewed, left-skewed, uniform, bimodal as expressions). Mean–median–mode ordering read from the shape (links to 1.6). Real examples: incomes, exam scores with a ceiling, reaction times. Misconception killed: "right-skewed means the peak is on the right" |
| 3.2 | Five-Number Summary and Boxplots | min, Q1, median, Q3, max drawn as a box and whiskers | Build a boxplot by hand from raw data in steps. Interactive `stats-distribution-builder` (dotplot + boxplot views linked): drag points and watch the box respond, or not. Reading skew from a boxplot. What a boxplot hides (bimodality). Misconception killed: "the longer whisker contains more data" (each whisker holds 25%) |
| 3.3 | Outliers and Robust Summaries | Fences at Q1 − 1.5·IQR and Q3 + 1.5·IQR flag unusual values | Modified boxplot with outliers plotted individually. Interactive `stats-distribution-builder` (boxplot, fences shown). Which statistics are resistant (median, IQR) and which are not (mean, SD, range): drag an outlier and watch. What to do with an outlier: investigate, don't delete by reflex. Misconception killed: "a long whisker means there is an outlier" |
| 3.4 | Relative Standing: Percentile Ranks and z-Scores | Where does one value sit? Measure its distance from the mean in SDs: z = (x − x̄)/σ | Topper in Maths vs topper in Physics: whose performance is better? Interactive `function-machine` (x → z with fixed mean and SD). z-scores of a whole data set have mean 0 and SD 1 (derived from 2.6). Percentile rank. Misconception killed: "a higher raw score is always the better relative performance" |
| 3.5 | Comparing Distributions | Compare centre, spread, shape and outliers side by side, in context | Parallel boxplots / back-to-back stem-and-leaf. Interactive `stats-distribution-builder` with two data sets overlaid. Write a four-part comparison (centre, spread, shape, unusual values). CV vs SD for groups with different means. Misconception killed: "compare two groups by their means alone" |
| 3.6 | Chapter 3 Mastery | Describe and compare any distribution completely | Mixed mastery: read a boxplot, compute fences, pick resistant summaries, z-score comparisons, identify skew from summary statistics |

## Chapter 4 — Two Variables: Correlation and Regression

**Purpose:** move from one variable to two. Measure how two quantities move together, then find the best straight line through them. Both come out of one picture: the co-deviation rectangle.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 4.1 | Scatter Plots and Association | Plot pairs; describe direction, form, strength and outliers | Interactive `stats-scatter-regression` (points only): drag points to make positive, negative, none, curved. Explanatory vs response variable. Misconception killed: "no straight-line pattern means no relationship" (a clean parabola) |
| 4.2 | Covariance: Moving Together | Put the origin at (x̄, ȳ); points in quadrants I and III add positive products (x − x̄)(y − ȳ) | Interactive `stats-scatter-regression` with the mean cross-hairs and signed co-deviation rectangles shaded. Cov(x, y) = Σ(x − x̄)(y − ȳ)/n and the shortcut Σxy/n − x̄ȳ, derived. Why covariance alone is unit-dependent (metres vs centimetres). Misconception killed: "a large covariance means a strong relationship" |
| 4.3 | Karl Pearson's Correlation Coefficient | Standardise the covariance: r = Cov(x, y)/(σₓσᵧ), always between −1 and 1 | r as the mean product of z-scores. Interactive `stats-scatter-regression` with live r readout. Properties: unit-free, unchanged by shift and positive scale, sign flips under negative scale, |r| ≤ 1 (Cauchy–Schwarz sketched). Worked table computation in steps. Misconceptions killed: "r = 0 means no relationship" (the parabola again) and "r = 0.8 means 80% of points lie on the line" |
| 4.4 | Correlation Is Not Causation | Lurking variables, reverse causation and coincidence can all produce a strong r | Ice-cream sales vs drownings, shoe size vs reading ability. Influential points: one point can make or destroy r (drag it in `stats-scatter-regression`). Restricted range lowers r. Misconception killed: "correlation implies causation" |
| 4.5 | Rank Correlation | When data are ranks (or ordinal), correlate the ranks: Spearman's ρ = 1 − 6Σd²/(n(n² − 1)) | Two judges ranking contestants. Derivation sketch: Pearson's r applied to ranks 1…n simplifies to Spearman's formula. Handling tied ranks (average rank). Monotone but curved data: ρ = 1 while r < 1. Misconception killed: "Spearman's formula is a different kind of correlation unrelated to r" |
| 4.6 | The Least-Squares Line | The best line minimises the sum of squared vertical residuals; it passes through (x̄, ȳ) with slope b = Cov(x, y)/σₓ² | Interactive `stats-scatter-regression` (drag-your-own-line mode): residual squares drawn, SSE readout, "snap to least squares" button reveals the optimum. Derivation: for fixed slope the best intercept puts the line through (x̄, ȳ) (the balance-point idea again); then minimise over slope (quadratic in b). Interpreting slope and intercept in context. Misconception killed: "the best line goes through as many points as possible" |
| 4.7 | Two Regression Lines, Prediction and Fit | y on x and x on y are different lines; they meet at (x̄, ȳ) and b_yx · b_xy = r² | Why two lines: each minimises residuals in a different direction. Interactive `stats-scatter-regression` showing both lines; as |r| → 1 they close up into one. Properties used in JEE problems: find means from the two line equations, find r from the slopes (sign agreement, |r| ≤ 1 check). Residuals, r² as the fraction of variation explained, extrapolation danger. Misconceptions killed: "x-on-y is just y-on-x rearranged" and "the model is fine for any x" |
| 4.8 | Chapter 4 Mastery | From a table or a scatter to r, the right line, and an honest prediction | Mixed mastery: compute r from sums, identify which given line is y-on-x, recover x̄, ȳ and r from two regression equations, rank correlation with ties, spot causation and extrapolation errors |

## Chapter 5 — The Normal Distribution and Estimation

**Purpose:** replace the jagged histogram with a smooth density curve, meet the normal distribution, and take the first step into inference: a sample mean is itself a random quantity with a predictable spread, so we can estimate a population mean with a margin of error.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 5.1 | From Histograms to Density Curves | Shrink the bins and grow the data: the histogram becomes a curve whose area between a and b is the proportion of data there | Interactive `stats-distribution-builder` (relative-frequency-density histogram with bin slider and curve overlay). Total area = 1. Why P(X = exact value) = 0 for continuous data. Misconception killed: "the height of a density curve is a probability" |
| 5.2 | The Normal Curve | Bell-shaped, symmetric, fixed by μ and σ; the 68–95–99.7 rule | Interactive `transform-playground`: base standard normal e^(−x²/2)/√(2π) against the curve with sliders μ and σ; μ slides it, σ widens and flattens it (area stays 1). Interactive `stats-normal-sampling-lab` (area mode): shade μ ± σ, ± 2σ, ± 3σ. Where normal data come from (sums of many small effects). Misconception killed: "all data are normally distributed" |
| 5.3 | Standardising: The Standard Normal Table | Every normal becomes N(0, 1) via z = (x − μ)/σ; one table Φ(z) answers every question | Reuse z-scores from 3.4. Reading Φ(z); symmetry Φ(−z) = 1 − Φ(z); P(a < X < b) = Φ(z_b) − Φ(z_a). Interactive `stats-normal-sampling-lab` (area mode) with shaded region and live probability. Worked examples in steps (heights, exam marks, component lifetimes), required Φ values supplied in the text. Misconception killed: "P(X < a) for a negative z-score is negative" |
| 5.4 | Working Backwards: From Proportion to Value | Given a percentile, find z from the table, then x = μ + zσ | Cut-off marks for the top 10%, finding an unknown μ or σ from two given proportions (simultaneous equations). Interactive `stats-normal-sampling-lab` (area mode) dragging the boundary to hit a target area. Misconception killed: "the top 10% cut-off is at 90% of the maximum" |
| 5.5 | Samples and Sampling Distributions | Different samples give different means; the sample mean has its own distribution with mean μ and SD σ/√n | Population vs sample, simple random sampling, stratified and systematic sampling, sources of bias (convenience, voluntary response, non-response). Interactive `stats-normal-sampling-lab` (sampling mode): draw many samples of size n from a skewed population and watch the histogram of x̄ build into a bell that narrows as n grows (central limit theorem, intuition only). Misconceptions killed: "a bigger population needs a bigger sample" and "a larger sample removes bias" |
| 5.6 | Estimation and Confidence Intervals | x̄ ± 1.96·σ/√n captures μ in about 95% of samples | Standard error as "SD of the estimate". Sample SD with n − 1 (why dividing by n underestimates, tied back to 2.4). Interactive `stats-normal-sampling-lab` (intervals mode): 100 intervals drawn, about 95 cover μ. Margin of error and how n controls it (quadruple n to halve it). Misconception killed: "95% confidence means a 95% chance that μ lies in this particular interval" |
| 5.7 | Chapter 5 Mastery | Normal calculations forwards and backwards, and honest estimation | Mixed mastery: normal probabilities with supplied Φ values, inverse problems, find μ/σ from two proportions, standard error and sample size, interpreting a confidence interval, spotting sampling bias |

---

## Engineering work this course needs

Existing interactives reused: `family-gallery` (3.1 shapes), `function-machine` (3.4 x → z), `transform-playground` (5.2 normal curve with μ, σ sliders), `graph-explorer` (optional: normal pdf / a fitted line read-off). The expression grammar in `lib/math-eval.ts` already supports `exp`, `sqrt`, `abs` and `pi`, so the normal density `exp(-(x-m)^2/(2*s^2))/(s*sqrt(2*pi))` works in those components.

Three new components (each needs a schema in `src/modules/content/schemas/blocks.ts`, a renderer file in `components/interactives/`, and a case in `index.tsx`):

| Component | Used in | What it does |
| --------- | ------- | ------------ |
| `stats-distribution-builder` | 0.1, 0.4, 0.5, 1.1, 1.4, 1.6, 2.1–2.4, 2.6, 3.2, 3.3, 3.5, 5.1 | One data set (or two) shown as a dotplot, histogram, ogive or boxplot, with draggable points. Live mean / median / mode / quartiles / SD / MD markers; optional balance fulcrum, deviation bars or squares, bin-width slider, shift/scale sliders, 1.5·IQR fences |
| `stats-scatter-regression` | 4.1–4.4, 4.6, 4.7 | Scatter plot with draggable points; mean cross-hairs and signed co-deviation rectangles; live Cov, r, SSE; a draggable user line with residual squares; a "show least-squares line" toggle; optional x-on-y line |
| `stats-normal-sampling-lab` | 5.2–5.6 | Three modes. *area*: a normal curve N(μ, σ) with draggable bounds a, b, shaded region and live probability plus z-values. *sampling*: draw samples of size n from a chosen population shape, accumulating a histogram of sample means with the σ/√n normal overlaid. *intervals*: draw many 95% intervals and count how many cover μ |

**Config sketches**

`stats-distribution-builder`
- `data: number[]`: the initial data values
- `compareData?: number[]`: optional second data set drawn in a second colour
- `labels?: { data: string, compare?: string }`: series names
- `view: "dotplot" | "histogram" | "ogive" | "boxplot"`: initial view
- `views?: ("dotplot" | "histogram" | "ogive" | "boxplot")[]`: view tabs offered (default: only `view`)
- `range: { min: number, max: number }`: horizontal axis
- `binWidth?: number`, `binStart?: number`, `binSlider?: { min: number, max: number, step: number }`: histogram binning
- `density?: boolean`: plot frequency density (or relative-frequency density) rather than frequency
- `curveExpr?: string`, `curveLatex?: string`: optional density curve overlay (e.g. a normal pdf)
- `ogiveType?: "less-than" | "more-than" | "both"`
- `stats: ("mean" | "median" | "mode" | "q1" | "q3" | "iqr" | "range" | "sd" | "variance" | "md-mean" | "md-median")[]`: which readouts and markers to show
- `showBalance?: boolean`: draw a fulcrum under the mean
- `deviations?: "none" | "bars" | "absolute" | "squares"`: deviation overlay about the mean (or about `centerSlider`)
- `centerSlider?: boolean`: user-controlled centre `a` with live Σ|x − a| and Σ(x − a)²
- `transform?: { shift: boolean, scale: boolean }`: sliders applying x → a + bx to all points
- `showFences?: boolean`: draw 1.5·IQR fences and mark outliers
- `editable?: boolean`: allow dragging, adding and removing points (default true)
- `snap?: number`: step that dragged points snap to

`stats-scatter-regression`
- `points: { x: number, y: number }[]`
- `window: { xmin, xmax, ymin, ymax }`
- `xLabel?: string`, `yLabel?: string`
- `editable?: boolean`: drag, add and remove points
- `showMeans?: boolean`: cross-hairs at (x̄, ȳ)
- `showCoDeviation?: boolean`: shade signed (x − x̄)(y − ȳ) rectangles
- `stats: ("cov" | "r" | "r2" | "sse" | "slope" | "intercept")[]`
- `userLine?: { slope: number, intercept: number }`: draggable line with residual squares and SSE
- `showLeastSquares?: "hidden" | "toggle" | "always"`
- `showXonY?: boolean`: also draw the regression line of x on y

`stats-normal-sampling-lab`
- `mode: "area" | "sampling" | "intervals"`
- `mu: number`, `sigma: number`: population parameters (area mode: the curve; other modes: population mean/SD)
- `paramSliders?: boolean`: let the learner change μ and σ
- `bounds?: { a: number | null, b: number | null }`: initial shaded interval; null means ∓∞
- `showZ?: boolean`: show z-values of the bounds and the Φ lookup
- `targetArea?: number`: a challenge in which the learner drags a bound to hit this area
- `population?: "normal" | "uniform" | "right-skewed" | "bimodal"`: sampling and intervals modes
- `sampleSize?: { min: number, max: number, initial: number }`
- `draws?: number`: samples per "draw many" click
- `confidence?: 0.9 | 0.95 | 0.99`: intervals mode

Also needed: `scripts/seed-statistics.ts` (mirrors the trigonometry seed) and a `statistics` course row.

**As built:** content files are `src/modules/content/statistics-chapter-{0..5}-content.ts` (exports `statisticsChapter{N}Lessons`), 44 lessons in total (7 + 7 + 7 + 6 + 8 + 7, matching the chapter tables above). Each chapter's first lesson opens with a narrated overview video: `public/videos/st-0-data-and-its-pictures`, `st-1-measures-of-centre`, `st-2-measures-of-spread`, `st-3-shape-position-and-comparison`, `st-4-correlation-and-regression`, `st-5-normal-distribution-and-estimation` (`.mp4` + `.jpg` poster), with scripts in `videos/scripts/st-*.md` and Manim scenes in `videos/scenes/st-*.py`.

**Conventions used across all six chapters:** variance and SD divide by $n$ in Chapters 2–4 (descriptive), $s$ with $n - 1$ appears only in 5.5–5.6 (estimation), previewed in 2.4; quartiles use the median-of-halves rule (2.2), which the interactives also use; data summaries use $\bar{x}, \sigma$ and population models use $\mu, \sigma$ with $N(\mu, \sigma^2)$ (second argument = variance); grouped-data formulas always use class boundaries, not limits; Pearson's empirical relation mode ≈ 3 median − 2 mean is introduced in 1.6 and reused (not re-derived) in 3.1.
