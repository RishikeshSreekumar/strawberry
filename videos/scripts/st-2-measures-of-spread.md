# Measures of Spread — Explainer Script

- **Course:** Statistics
- **Chapter:** Chapter 2 · Measures of Spread (id: `st-2-measures-of-spread`)
- **Scene class:** `StCh2Video` in `videos/scenes/st-2-measures-of-spread.py`
- **Target runtime:** about 5.3 minutes (roughly 900 spoken words at Samantha's default ~175 wpm). Rendered: 319.5 s.

**Learning goal.** The learner sees that two data sets can share a mean and look nothing alike, so every summary needs a second number: spread. They meet the range and see how fragile it is. They repair it with quartiles and the IQR, which ignore the extremes and do not move when the maximum explodes. They see why signed deviations fail (they always sum to zero), average absolute distances to get mean deviation, and find that it is smallest about the median. They square the deviations, see the variance as the average area of the deviation squares, take the root to get the SD back in the data's units, and check the shortcut "mean of the squares minus the square of the mean". They reject "SD is the average distance from the mean". They compute a grouped SD by step deviation and do not forget to multiply back by h squared. They see that a shift leaves spread unchanged, a scale by b multiplies the SD by |b|, and the CV compares consistency across different means.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: batsman A, the first data set and data dots = SECONDARY (teal); batsman B and warnings = PRIMARY (strawberry red); centres (mean and median lines) = deep gold `#D19A00`; spread measures and definitions = PURPLE; checks = GREEN. Data sit on `NumberLine`s with dots stacked for repeated values. Maths uses `MathTex`. Each scene has a small grey lesson header in the top left. The frame is cleared with `FadeOut` between scenes.

**TTS note:** symbols are spoken as words: "x bar", "sigma", "sigma squared", "Q one", "Q three", "I Q R", "C V", "f u squared", "the absolute value of b", "one hundred and ten", "two point zero one".

---

## Scene 0 — Title card

**Narration:** Chapter two. Measures of spread.

**Visuals:** kicker "Statistics", title "Chapter 2 · Measures of Spread".

---

## Scene 1 — Hook: two batsmen, one average

**Narration:** A selector has one batting slot and two batsmen. Both have played ten innings, and both average exactly forty runs. On paper, they are identical. But put their scores on a number line. Batsman A scores between thirty five and forty five almost every time. Batsman B is either out cheaply or scores a big hundred. Same centre, completely different story. A centre alone is not enough. Every summary needs a second number: how spread out the values are.

**Visuals:** Two number lines from 0 to 120, "Batsman A" (teal) above "Batsman B" (red), each with a dashed gold `x̄ = 40` line. A's ten dots (35, 38, 40, 42, 45, 36, 41, 39, 44, 40) pop in as a tight stack around 40; B's (0, 5, 12, 80, 95, 2, 110, 60, 8, 28) scatter across the axis. Gold card at the top: "Same centre. Completely different story."

---

## Scene 2 — The range and its fragility (Lesson 2.1)

**Narration:**

- **Beat a:** The crudest measure of spread is the range: the largest value minus the smallest. For A it is forty five minus thirty five, ten runs. For B it is one hundred and ten minus zero, one hundred and ten runs.
- **Beat b:** But the range listens to only two values. Six students have heights from one fifty to one fifty eight centimetres, a range of eight. Add one student who is one ninety tall, and the range jumps to forty, though six of the seven heights never moved. One extreme value decides it.

**Visuals:**

- **Beat a:** Both dot plots stay (labels A and B). Purple card top right `Range = x_max − x_min`. Teal brace over A from 35 to 45 with `45 − 35 = 10`; red brace over B from 0 to 110 with `110 − 0 = 110`.
- **Beat b:** Number line 145 to 195, "height (cm)". Six teal dots at 150, 152, 153, 155, 156, 158; purple brace `range = 8`. A red dot drops in at 190; a taller red brace `range = 40`. Red card: "One extreme value decides the range."

---

## Scene 3 — Quartiles and the IQR (Lesson 2.2)

**Narration:**

- **Beat a:** A simple repair: ignore the extremes. Put ten values in order and cut them into quarters. The median, Q two, is thirteen. The median of the lower half is Q one, nine. The median of the upper half is Q three, nineteen. The interquartile range, Q three minus Q one, is ten: the width of the middle half of the data.
- **Beat b:** Now change the largest value from thirty to three hundred. The range explodes from twenty six to two hundred and ninety six. The I Q R does not move. It is still ten. And note: Q one is about position in the ordered list. It is not a quarter of the maximum.

**Visuals:**

- **Beat a:** Ten tiles 4, 6, 9, 11, 12, 14, 17, 19, 22, 30 (worked example 2 of lesson 2.2). A dashed gold line between 12 and 14 labelled `Q₂ = (12 + 14)/2 = 13`. The lower half tints teal and an arrow marks 9 as `Q₁ = 9`; the upper half tints and an arrow marks 19 as `Q₃ = 19`. Purple card `IQR = Q₃ − Q₁ = 19 − 9 = 10`, subline "the width of the middle half of the data".
- **Beat b:** The 30 tile turns red and becomes 300. Red `range: 26 → 296` on the left; green `IQR: 10 → 10` on the right while the IQR card pulses. Red card "\"Q1 is a quarter of the maximum\"" is crossed out; green card "Q1 is about position, not value."

---

## Scene 4 — Mean deviation (Lesson 2.3)

**Narration:**

- **Beat a:** Better still, use every value. Measure how far each one sits from the mean, and average. But signed deviations always sum to zero: the ones above the mean cancel the ones below. So drop the signs and take absolute values. For two, three, four, six and fifteen, the mean is six, and the distances add to eighteen. The mean deviation is eighteen over five, three point six.
- **Beat b:** Measure from the median, four, instead, and the total drops to sixteen, a mean deviation of three point two. That is no accident. The sum of absolute distances is smallest about the median, not the mean.

**Visuals:**

- **Beat a:** Number line 0 to 16 with teal dots at 2, 3, 4, 6, 15 and a gold dashed `x̄ = 6`. Signed arrows from the mean at stacked heights: red −4, −3, −2 to the left, 0 at the mean, green +9 to the right. `Σ(xᵢ − x̄) = −4 − 3 − 2 + 0 + 9 = 0`, "signed deviations always cancel". The arrows turn into purple distance bars 4, 3, 2, 0, 9, then `MD(x̄) = (4+3+2+0+9)/5 = 18/5 = 3.6`.
- **Beat b:** The gold line slides to `median = 4` and the bars redraw as 2, 1, 0, 2, 11. Gold `MD(median) = (2+1+0+2+11)/5 = 16/5 = 3.2`. Green card "Sum of |x − a| is smallest at a = median."

---

## Scene 5 — Variance and standard deviation (Lesson 2.4)

**Narration:**

- **Beat a:** There is another way to kill a sign: square it. Take two, four, four, four, five, five, seven and nine. The mean is five. Draw each deviation as a square. The far values get big squares: the nine, four away, gives an area of sixteen. The areas add to thirty two. Their average, thirty two over eight, is four. That is the variance, sigma squared.
- **Beat b:** Variance is in squared units, so take the square root to get back to the data's units. The standard deviation, sigma, is two. And a shortcut, derived by expanding the square: the variance is the mean of the squares minus the square of the mean. Two hundred thirty two over eight is twenty nine. Minus twenty five, four again.
- **Beat c:** Careful: the standard deviation is not the average distance from the mean. On this data, the mean deviation is one point five, but sigma is two. Squaring gives far values extra weight, so sigma is always at least as large.

**Visuals:**

- **Beat a:** Top left: dot plot 0 to 10 of 2, 4, 4, 4, 5, 5, 7, 9 with gold `x̄ = 5`. Below it a row of purple squares with sides |x − 5| (3, 1, 1, 1, 0, 0, 2, 4) and area labels 9, 1, 1, 1, 0, 0, 4, 16, captioned "squares of the deviations". The 16-square and the 9 dot pulse red. Right column: `9+1+1+1+0+0+4+16 = 32`, purple `σ² = 32/8 = 4`, and `σ² = (1/n) Σ(xᵢ − x̄)²`.
- **Beat b:** Right column replaced by purple card `σ = √4 = 2` and "variance: units squared. SD: the data's units.", then gold `σ² = Σxᵢ²/n − x̄²` and the check `232/8 − 5² = 29 − 25 = 4`.
- **Beat c:** Red card "\"SD is the average distance from the mean\"" crossed out. Two cards: gold "mean deviation 1.5" and purple "standard deviation σ = 2". Green line "Squaring gives far values extra weight, so SD ≥ MD."

---

## Scene 6 — SD for grouped data by step deviation (Lesson 2.5)

**Narration:**

- **Beat a:** For a frequency table, each value counts f times, so every sum gets a factor of f. With class midpoints like thirty five, forty five, up to ninety five, the squares get large. So code them. Take u equal to x minus sixty five, over ten. Here the sum of f u is minus fifteen, the sum of f u squared is one hundred and five, and N is fifty. The coded variance is two point one minus zero point zero nine, which is two point zero one.
- **Beat b:** Now the step everyone forgets. That is the variance of u, not of the marks. Multiply back by h squared: one hundred times two point zero one is two hundred and one. So sigma is the square root of two hundred and one, about fourteen point two marks.

**Visuals:**

- **Beat a:** Left: the grouped table of worked example 2 in lesson 2.5 (classes 30–40 to 90–100, midpoints, f, u, fu, fu²; totals in gold: 50, −15, 105). Right: `σ² = Σfx²/N − (Σfx/N)²`, teal `u = (x − 65)/10`; the totals pulse; then `σ_u² = 105/50 − (−15/50)²` and `= 2.1 − 0.09 = 2.01`.
- **Beat b:** Red card "That is the variance of u, not of the marks!" replaces the coding line. Purple `σ_x² = h² σ_u² = 100 × 2.01 = 201`, then purple card `σ_x = √201 ≈ 14.2`.

---

## Scene 7 — Shift, scale and the CV (Lesson 2.6)

**Narration:**

- **Beat a:** What if a teacher adds five grace marks to everyone? Every value slides right by five. The mean slides with them, so every distance from the mean is unchanged. The standard deviation stays exactly the same. Now double every value instead. The mean doubles, and so does every distance. In general, for y equal to a plus b x, the mean becomes a plus b times x bar, and the standard deviation becomes the absolute value of b, times sigma.
- **Beat b:** To compare consistency across different means, divide spread by centre. The coefficient of variation is sigma over the mean, times one hundred percent. Batsman P averages forty with standard deviation five: twelve point five percent. Batsman Q averages fifty with standard deviation eight: sixteen percent. Lower C V means more consistent, so P wins, even though Q scores more.

**Visuals:**

- **Beat a:** Number line 0 to 45 with teal dots 10, 12, 15, 18, 20 (the builder data of lesson 2.6), gold `x̄ = 15` and a purple ±σ brace `σ ≈ 3.69`. Tag "original: 10, 12, 15, 18, 20". The whole picture slides +5 (`x̄ = 20`, brace width and `σ ≈ 3.69` unchanged; tag "+5 grace marks: SD unchanged"). Then it stretches to 20, 24, 30, 36, 40 in red (`x̄ = 30`, brace doubles to `σ ≈ 7.38`; tag "×2: mean doubles, SD doubles"). Purple card `y = a + bx: ȳ = a + bx̄, σ_y = |b| σ_x`.
- **Beat b:** Purple card `CV = σ/x̄ × 100%`. Teal card "Batsman P: x̄ = 40, σ = 5, CV = 12.5%"; red card "Batsman Q: x̄ = 50, σ = 8, CV = 16%". Green line "Lower CV = more consistent: P, even though Q scores more." while P pulses (worked example 4 of lesson 2.6).

---

## Scene 8 — Recap (Lesson 2.7 Mastery)

**Narration:** The whole chapter in five lines. A centre is not enough; spread is the second number. The range uses only the extremes; the I Q R ignores them. Mean deviation averages distances, and is smallest about the median. Variance averages squared distances, and the standard deviation brings back the units. Shifting changes nothing about spread; scaling by b multiplies the standard deviation by the absolute value of b, and the C V compares spread across different means. Next, we put centre and spread together to describe the shape of a distribution.

**Visuals:** Title "Chapter 2 in five lines". Five numbered, colour-coded lines fade in one by one: (1) gold, centre is not enough; (2) red, range vs IQR; (3) teal, mean deviation and the median; (4) purple, variance and SD; (5) green, shift, scale and CV. Footer "Next: Chapter 3 · Shape, Position and Comparison".

---

**Lesson coverage map:** Hook → Scene 1 · 2.1 → Scene 2 · 2.2 → Scene 3 · 2.3 → Scene 4 · 2.4 → Scene 5 · 2.5 → Scene 6 · 2.6 → Scene 7 · 2.7 Mastery → Scene 8.
