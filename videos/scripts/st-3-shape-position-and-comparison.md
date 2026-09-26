# Shape, Position and Comparison — Explainer Script

- **Course:** Statistics
- **Chapter:** Chapter 3 · Shape, Position and Comparison (id: `st-3-shape-position-and-comparison`)
- **Scene class:** `StCh3Video` in `videos/scenes/st-3-shape-position-and-comparison.py`
- **Target runtime:** about 5 to 5.5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner adds shape to centre and spread. Skew is named after the tail, not the peak, and a right tail pulls the mean past the median. A boxplot is built from the five-number summary, and each of its four pieces holds a quarter of the data whatever its length. The 1.5 IQR fences flag possible outliers; the median and IQR resist a wild value while the mean, SD and range do not. A z-score measures a value's distance from the mean in standard deviations, which makes marks from different exams comparable, and a percentile rank counts the share below. Two groups are compared under four headings (centre, spread, shape, unusual values), never by means alone, and CV compares consistency when means differ.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: data dots, bars and curves = PRIMARY (strawberry red); the mean = deep gold `#D19A00`; the median and quartile box = SECONDARY (teal); the mode = PURPLE; fences and outliers = PRIMARY with a ring; checks = GREEN; myths = PRIMARY card with a cross. Number lines are plain ink lines with MathTex numbers. Each scene has a small grey lesson header top left. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("Q one", "one point five times the I Q R", "x minus x bar, over sigma").

Data are the ones used in the chapter content (`src/modules/content/statistics-chapter-3-content.ts`): study times 12, 18, 20, 22, 25, 25, 28, 30, 32, 35, 38, 40, 45, 52, 58 (then 60 and 75 for the last two); Riya 92 in Maths (mean 70, SD 10) and Arjun 84 in Physics (mean 60, SD 8); Section A 18 … 47 and Section B 4, 7, 21 … 43 (both means 32); batters P (mean 50, SD 15) and Q (mean 30, SD 12).

---

## Scene 0 — Title card

**Narration:** Chapter three. Shape, position and comparison.

**Visuals:** kicker "Statistics", title "Chapter 3 · Shape, Position and Comparison".

---

## Scene 1 — The shape of a distribution (Lesson 3.1)

**Narration:**

- **Beat a:** A centre and a spread are two numbers, and two numbers can hide a lot. Smooth the top of a big histogram into a curve and you see what they miss: the shape. Here is a symmetric bell. The left half mirrors the right.
- **Beat b:** Now incomes, or reaction times. Most values bunch up low, and a few stretch far out to the right. This is called right skewed. Look where the peak is. It is on the left. The skew is named after the tail, not the peak.
- **Beat c:** The tail drags the averages with it. The mode sits at the peak. The median splits the area in half, a little to the right. The mean, the balance point, is pulled furthest into the tail. For a right tail: mode, then median, then mean. Flip the curve and you get a left skew, like marks on an easy exam that pile up near the top.

**Visuals:**

- **Beat a:** Header "3.1 · The Shape of a Distribution". Axes; a red histogram of narrow bars fades into a smooth symmetric bell. Label "symmetric".
- **Beat b:** The bell transforms into a right-skewed curve `x·e^(−x/1.5)`. Label "right-skewed". An arrow points to the long right tail, "tail →". Myth card "peak on the right?" crossed out.
- **Beat c:** Vertical markers: mode 1.5 (purple), median ≈ 2.5 (teal), mean 3 (gold). Card "mode < median < mean". Then a small mirrored left-skewed curve to the side labelled "left-skewed: tail ←".

---

## Scene 2 — Five-number summary and boxplots (Lesson 3.2)

**Narration:**

- **Beat a:** Fifteen students logged their daily study time in minutes. Put them in order on a number line. The eighth value, thirty, is the median. The median of the lower seven is twenty two: that is Q one. The median of the upper seven is forty: Q three. The minimum is twelve and the maximum fifty eight.
- **Beat b:** Draw a box from Q one to Q three with a line at the median, and whiskers out to the extremes. That is a boxplot. Now the trap. The right whisker is much longer than the left. Does it hold more data? No. Each whisker, and each half of the box, holds about a quarter of the data. A longer piece means that quarter is more spread out. Here the right side is stretched, so the data are skewed right.

**Visuals:**

- **Beat a:** Header "3.2 · Five-Number Summary and Boxplots". Number line 10 to 60. Fifteen red dots (stacked for the two 25s). Labels appear: "median 30", "Q₁ = 22", "Q₃ = 40", "min 12", "max 58".
- **Beat b:** Teal box from 22 to 40, median line at 30, whiskers to 12 and 58. Braces under each of the four pieces with "25%". Myth card "longer whisker = more data" crossed out. Green note "longer piece = more spread out".

---

## Scene 3 — Outliers and robust summaries (Lesson 3.3)

**Narration:**

- **Beat a:** How far is too far? Measure against the data's own spread. The two heaviest studiers now report sixty and seventy five minutes. The quartiles do not change, so the I Q R is forty minus twenty two, which is eighteen. One and a half times eighteen is twenty seven. The fences sit twenty seven below Q one and twenty seven above Q three: at minus five and sixty seven.
- **Beat b:** Seventy five is beyond the upper fence, so it is flagged as a possible outlier and drawn as its own point. The whisker stops at sixty, the largest value inside the fences. A flag is a reason to investigate, not to delete.
- **Beat c:** Now drag seventy five all the way out to one hundred and fifty. The mean jumps from about thirty three point seven to thirty eight point seven. The median stays at thirty. The I Q R stays at eighteen. The median and I Q R are resistant, because they use only positions. The mean, standard deviation and range use the sizes of the values, so one wild value can wreck them.

**Visuals:**

- **Beat a:** Header "3.3 · Outliers and Robust Summaries". Same boxplot, number line 0 to 160 compressed. Card "IQR = 40 − 22 = 18", "1.5 × 18 = 27". Dashed red fence lines at −5 and 67 with labels.
- **Beat b:** Dot at 75 gets a red ring and label "outlier". Whisker ends at 60.
- **Beat c:** The 75 dot slides to 150. A readout panel: mean 33.7 → 38.7 (gold, changes), median 30 (teal, stays, green check), IQR 18 (stays, green check).

---

## Scene 4 — Relative standing: z-scores and percentile ranks (Lesson 3.4)

**Narration:**

- **Beat a:** One prize, two toppers. Riya scored ninety two in Maths. Arjun scored eighty four in Physics. Higher mark wins? Not so fast. The Maths class averaged seventy with a standard deviation of ten. The Physics class averaged sixty with a standard deviation of eight.
- **Beat b:** Measure each mark from its own class mean, in units of its own standard deviation. That is the z score: x minus x bar, over sigma. Riya is twenty two above, over ten, so z equals two point two. Arjun is twenty four above, over eight, so z equals three. Arjun stands further out from his class. The higher raw score is not the better relative performance.
- **Beat c:** A percentile rank asks a different question: what share of the group is below you? If thirty of forty students scored below Meera, her percentile rank is seventy five.

**Visuals:**

- **Beat a:** Header "3.4 · Relative Standing". Two rows. Row 1: "Riya · Maths 92" with a number line marked in SD steps from 50 to 100 (mean 70, ticks every 10). Row 2: "Arjun · Physics 84" with a number line from 44 to 92 (mean 60, ticks every 8). Gold mean markers.
- **Beat b:** Formula `z = (x − x̄)/σ` in purple. Under each line an SD scale −2 … 3. Riya's dot at 2.2, Arjun's at 3. Cards "z = 22/10 = 2.2" and "z = 24/8 = 3" (green on Arjun). Myth card "higher raw score wins" crossed out.
- **Beat c:** Card "PR = (number below / n) × 100 = 30/40 × 100 = 75".

---

## Scene 5 — Comparing distributions (Lesson 3.5)

**Narration:**

- **Beat a:** Two sections sat the same test, and both averaged thirty two. Same class, says the teacher. Draw them side by side. Section B's median is thirty six, four marks above A's. Half of B scored thirty six or more. B's mean was dragged down by two very low marks, four and seven, and both are beyond B's lower fence.
- **Beat b:** So compare in four parts. Centre: B is typically higher. Spread: the middle halves are similar. Shape: B has a long left tail. Unusual values: two outliers in B, worth investigating. Never compare by means alone.
- **Beat c:** And when the means differ, compare consistency with the coefficient of variation: sigma over the mean. Batter P averages fifty with a standard deviation of fifteen: thirty percent. Batter Q averages thirty with twelve: forty percent. P is the more consistent.

**Visuals:**

- **Beat a:** Header "3.5 · Comparing Distributions". Shared number line 0 to 50. Parallel boxplots: A (box 27–36, median 32, whiskers 18–47), B (box 30–40, median 36, whiskers 21–43, outliers 4 and 7 ringed). Gold dashed line at mean 32 through both.
- **Beat b:** Four cards: "Centre", "Spread", "Shape", "Unusual values" with short text. Myth "compare means only" crossed.
- **Beat c:** `CV = σ / x̄ × 100%`; "P: 15/50 = 30%", "Q: 12/30 = 40%", green check by P.

---

## Scene 6 — Recap

**Narration:** Chapter three in one breath. The tail names the skew, and it drags the mean. A boxplot splits the data into four quarters, whatever their lengths. The fences, one and a half I Q Rs beyond the box, flag values to investigate. The median and I Q R resist outliers; the mean and standard deviation do not. A z score places a value inside its own group. And to compare groups, talk about centre, spread, shape and unusual values. Next, two variables at once.

**Visuals:** Six recap lines appear one by one in a column with small coloured bullets; ends with "Next: Chapter 4 · Correlation and Regression".
