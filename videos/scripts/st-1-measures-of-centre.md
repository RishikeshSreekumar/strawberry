# Measures of Centre — Explainer Script

- **Course:** Statistics
- **Chapter:** Chapter 1 · Measures of Centre (id: `st-1-measures-of-centre`)
- **Scene class:** `StCh1Video` in `videos/scenes/st-1-measures-of-centre.py`
- **Target runtime:** about 5 to 5.5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner treats each average as the answer to a question, not as a formula. The mean is the fair share and the balance point, where the signed deviations cancel, and it need not be a data value. For frequency tables the mean is the ordinary mean with repeats bundled (Σfx / Σf); for grouped data it rests on the midpoint assumption, and the step-deviation method comes from shifting and scaling the balance point. Combining groups means weighting by group size, not averaging the averages. The median uses only order: the middle of the sorted list, unmoved by an outlier, and for grouped data a straight-line interpolation on the ogive. The mode is the peak, the only average for categories, and for grouped data the crossed diagonals over the modal bar locate it. Finally, skew pulls the three apart (mode < median < mean for a right tail), and the relation Mode ≈ 3 Median − 2 Mean is empirical, not a theorem.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: data dots and bars = PRIMARY (strawberry red); the mean, fulcrum and balance point = deep gold `#D19A00`; the median = SECONDARY (teal); the mode = PURPLE; definitions and formulas = PURPLE or INK; warnings = PRIMARY with a cross mark; checks = GREEN. Number lines are plain ink lines with MathTex numbers. Each scene has a small grey lesson header top left. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("sigma f x over sigma f", "n over two", "three times the median minus two times the mean"). Money is written "Rs" on screen (the rupee glyph is not in the video font).

Data are the ones used in the chapter content (`src/modules/content/statistics-chapter-1-content.ts`): picnic money 20, 30, 50, 40, 60; balance data 4, 6, 7, 9, 14; goals table (f = 3, 5, 6, 4, 2); the 50 wages (classes 100–200, f = 12, 14, 8, 6, 10); sections A (30 at 60) and B (20 at 75); median table (f = 5, 8, 20, 12, 5); mode table (f = 6, 10, 17, 12, 5); salaries 30, 32, 35, 35, 38, 40, 42, 45, 48, 500.

---

## Scene 0 — Title card

**Narration:** Chapter one. Measures of centre.

**Visuals:** kicker "Statistics", title "Chapter 1 · Measures of Centre".

---

## Scene 1 — Hook: one number for the lot (Lesson 1.1, part a)

**Narration:** A whole distribution is a lot to carry around. Often you want one number that stands for the lot. A typical score, a typical wage. Five friends bring twenty, thirty, fifty, forty and sixty rupees to a picnic, and agree to pool the money and share it equally. The pot holds two hundred rupees, so everyone ends up with forty. That fair share is the mean. The tall bars pour into the short ones until every bar is level.

**Visuals:** Header "1.1 · The Mean as a Balance Point". Five red bars with heights 20, 30, 50, 40, 60 labelled "Rs 20" … "Rs 60" under them. Sum "20 + 30 + 50 + 40 + 60 = 200" then "200 ÷ 5 = 40" appears top right. A dashed gold line at height 40; the bars transform to height 40 (levelling).

---

## Scene 2 — The balance point (Lesson 1.1, part b)

**Narration:**

- **Beat a:** Here is the picture to keep. Put each value on a number line as a one kilogram weight. The data are four, six, seven, nine and fourteen. Their mean is forty over five, which is eight, and that is exactly where the ruler balances.
- **Beat b:** Measure each value's deviation from the mean. Minus four, minus two, minus one on the left. Plus one and plus six on the right. The left side pulls with minus seven, the right side with plus seven. They cancel. The sum of x minus x bar is always zero, because the sum of x is n times x bar.
- **Beat c:** Notice that eight is not one of the data values. The balance point does not have to sit on a weight. And the mean listens to every value. Drag the fourteen out to twenty four, ten units further, and the balance point slides ten over five, which is two units, to ten.

**Visuals:**

- **Beat a:** Number line 0 to 26. Red dots at 4, 6, 7, 9, 14. A gold triangle (fulcrum) under the line at 8, label "x̄ = 8".
- **Beat b:** Signed deviation arrows from 8 to each dot (red arrows left, green arrows right) with labels −4, −2, −1, +1, +6. Card: "Σ(xᵢ − x̄) = Σxᵢ − n x̄ = 0".
- **Beat c:** Card "8 is not a data value". Then the dot at 14 slides to 24 while the fulcrum slides from 8 to 10 (ValueTracker). Label "moves by 10/5 = 2".

---

## Scene 3 — Frequency and grouped data (Lesson 1.2)

**Narration:**

- **Beat a:** Real data come as frequency tables. A club scored zero goals in three matches, one goal in five, two in six, three in four, and four in two. Each value x appears f times, so it adds f times x to the total. The mean is sigma f x over sigma f: thirty seven over twenty, which is one point eight five goals a match.
- **Beat b:** Grouped data hide the individual values. Twelve workers earn somewhere between one hundred and one hundred and twenty rupees. So we assume each class sits at its midpoint. That is an estimate, not an exact answer.
- **Beat c:** The numbers get big, so shrink them. Subtract an assumed mean, A equals one fifty, and divide by the class width, h equals twenty. Now u runs minus two, minus one, zero, one, two. Sigma f u is minus twelve, so u bar is minus zero point two four. Undo the scale: times twenty is minus four point eight. Undo the shift: one fifty minus four point eight is one forty five point two. The same answer as the long way, because shifting and scaling the data shifts and scales the balance point.

**Visuals:**

- **Beat a:** Table x = 0…4, f = 3, 5, 6, 4, 2, fx row appears: 0, 5, 12, 12, 8. Formula "x̄ = Σfx / Σf = 37/20 = 1.85".
- **Beat b:** Wage table (class, f, x) with class marks 110, 130, 150, 170, 190. A small card "midpoint assumption: an estimate".
- **Beat c:** A u column appears (−2, −1, 0, 1, 2) and fu (−24, −14, 0, 6, 20), total −12. Right side steps: "ū = −12/50 = −0.24", "× h: −4.8", "+ A: x̄ = 150 − 4.8 = 145.2" (gold).

---

## Scene 4 — Combined means (Lesson 1.3)

**Narration:** Section A has thirty students with a mean of sixty. Section B has twenty with a mean of seventy five. Averaging the two means gives sixty seven point five, and that is wrong. Treat each section as one weight at its own mean. Thirty units at sixty, twenty units at seventy five. The balance point sits closer to the heavier weight. Back to totals: eighteen hundred plus fifteen hundred is thirty three hundred, over fifty students, which is sixty six. Weight by group size. Do not average the averages.

**Visuals:** Header "1.3 · Weighted and Combined Means". Number line 50 to 80. A big red block "30" at 60 and a smaller teal block "20" at 75. A crossed-out chip "(60 + 75)/2 = 67.5" at 67.5. Gold fulcrum slides to 66. Formula "x̄ = (n₁x̄₁ + n₂x̄₂)/(n₁ + n₂) = (1800 + 1500)/50 = 66".

---

## Scene 5 — The median (Lesson 1.4)

**Narration:**

- **Beat a:** The median asks a simpler question. Which value has half the data on each side? Only the order matters. Sort seven values and take the fourth. Now drag the largest value far to the right. The mean chases it. The median does not move, because the middle value is still the middle value.
- **Beat b:** For grouped data, use cumulative frequency. Fifty values, so we want the twenty fifth. Thirteen lie below twenty, and thirty three lie below thirty, so the twenty fifth is inside the class twenty to thirty. Assume the twenty values in that class are spread evenly. On the ogive that is a straight segment. We need twelve more values out of twenty, so twelve twentieths of the width: twenty plus six is twenty six. Not twenty five, the midpoint of the class. The formula is just this interpolation: l plus n over two minus c f, over f, times h.

**Visuals:**

- **Beat a:** Header "1.4 · The Median". Sorted dots 3, 5, 6, 7, 8, 9, 10 on a number line 0 to 46; teal median marker at 7, gold mean marker at 6.86. The dot at 10 slides to 45; gold mean slides to 11.86, teal median stays at 7.
- **Beat b:** Axes: x 0–50, y 0–50, ogive points (0,0), (10,5), (20,13), (30,33), (40,45), (50,50). Dashed horizontal line at 25 meets the segment from (20,13) to (30,33) at x = 26; drop line to x-axis labelled 26. Right: "Median = l + (n/2 − cf)/f × h = 20 + (25 − 13)/20 × 10 = 26".

---

## Scene 6 — The mode (Lesson 1.5)

**Narration:** The mode is the most common value, the peak. A shoe shop cannot stock size seven point three, it stocks the size that sells most. And for categories like blood groups, the mode is the only average there is. For grouped data, the tallest bar is the modal class, here twenty to thirty. Its neighbours tell us which way the peak leans. Draw two lines across the top of the modal bar, corner to corner. They cross above the mode. Similar triangles give l plus f one minus f zero, over two f one minus f zero minus f two, times h. Here that is twenty plus seven twelfths of ten, about twenty five point eight three. The right neighbour is taller, so the peak leans right.

**Visuals:** Header "1.5 · The Mode". Histogram with classes 0–50, f = 6, 10, 17, 12, 5, modal bar highlighted purple outline. Crossed lines from (20,17) to (30,12) and from (20,10) to (30,17), intersection dot, dashed drop line to x = 25.83. Formula at right: "Mode = l + (f₁ − f₀)/(2f₁ − f₀ − f₂) × h = 20 + 7/12 × 10 ≈ 25.83". Small card "categories: only the mode works".

---

## Scene 7 — Choosing the right average (Lesson 1.6)

**Narration:** A company advertises an average salary of eighty four thousand five hundred rupees. Nine of its ten salaries are between thirty and forty eight thousand. The tenth is the boss, at five hundred thousand. The mean is eighty four point five thousand. The median is thirty nine thousand. The mode is thirty five thousand. None is wrong. The mean answers the fair share question. The median answers what a typical employee earns. A long right tail drags the mean toward it, so mode, then median, then mean. For moderately skewed data, the mode is roughly three times the median minus two times the mean. That is an observed rule of thumb, not a theorem.

**Visuals:** Header "1.6 · Choosing the Right Average". Number line 0 to 520 (in Rs thousand) with nine clustered dots and one far dot at 500. Markers: mode (purple) at 35, median (teal) at 39, mean (gold) at 84.5. Three cards: "Mean: fair share", "Median: typical", "Mode: most common". Bottom: "mode < median < mean  (right tail)" and "Mode ≈ 3 Median − 2 Mean  (empirical)".

---

## Scene 8 — Recap

**Narration:** Chapter one in six lines. The mean is the fair share and the balance point, where deviations cancel. For tables, weight each value by its frequency, and for classes, by its midpoint. Combine groups by weighting with their sizes. The median is the middle, and only order matters. The mode is the peak, the only average for categories. And skew pulls them apart, so choose the one that answers your question.

**Visuals:** Title "Chapter 1 in six lines", six numbered rows in colour, footer "Next: 1.7 · Chapter 1 Mastery".
