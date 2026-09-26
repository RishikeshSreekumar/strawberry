# Data and Its Pictures — Explainer Script

- **Course:** Statistics
- **Chapter:** Chapter 0 · Data and Its Pictures (id: `st-0-data-and-its-pictures`)
- **Scene class:** `StCh0Video` in `videos/scenes/st-0-data-and-its-pictures.py`
- **Target runtime:** about 5 minutes (roughly 880 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner sees that statistics exists because measurements vary: individual values are unpredictable, but the pattern of many values is stable. They can tell a population from a sample and a parameter from a statistic. They sort data into categorical and numerical (discrete or continuous) and reject "anything written in digits is numerical". They group raw data into a frequency table, turn inclusive classes (20–29) into class boundaries (19.5–29.5), and find the class width and class mark. They know that in a histogram the *area* of a bar is the frequency, so unequal widths need height = frequency density = f / w. They build a less-than cumulative frequency, plot it at *upper* boundaries (not class marks), and read the median off the ogive at n/2, where the less-than and more-than ogives cross. They read the axes before the shape: a truncated axis and a badly chosen class width can both mislead with correct numbers.

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colours: data dots and bars = PRIMARY (strawberry red), categorical / second series = SECONDARY (teal), totals, medians and highlights = deep gold `#D19A00`, definitions and formulas = PURPLE, warnings = PRIMARY with a cross mark, checks = GREEN. All numeric axes are plain black lines with MathTex tick numbers. Each scene has a small grey lesson header top left. Clear the frame with `FadeOut` between scenes. TTS wording spells symbols out ("twenty nine point five", "frequency divided by width", "n over two").

Data sets are the ones used in the chapter content (`src/modules/content/statistics-chapter-0-content.ts`): `HEIGHTS` (30 students), `MARKS` (40 test marks), the clinic ages table (60 patients), `WEIGHTS` (50 students, f = 4, 9, 15, 12, 7, 3) and `WAITS` (33 clinic waiting times).

---

## Scene 0 — Title card

**Narration:** Chapter zero. Data and its pictures.

**Visuals:** kicker "Statistics", title "Chapter 0 · Data and Its Pictures".

---

## Scene 1 — Why statistics exists (Lesson 0.1)

**Narration:**

- **Beat a:** Measure the height of every student in a class. Thirty students, thirty numbers, and hardly any of them agree. Time the same bus ride to school every day for a month, and the clock still reads twenty six minutes one day, thirty one the next, and forty seven on the day it rained.
- **Beat b:** Drop each height onto a number line as a dot. No single dot could be predicted. But together they make a shape: a crowded middle, thinning out at both ends. Add more students and the shape barely changes. Statistics exists because things vary. Its job is to describe that variation honestly, not to throw it away as error.
- **Beat c:** Two pairs of words for the whole course. The population is everyone you care about. The sample is the part you actually measure. A number that describes the population, like the mean height of every student in India, is a parameter. The same kind of number worked out from your sample is a statistic, and it is our best estimate of the parameter.

**Visuals:**

- **Beat a:** Header "0.1 · Why Statistics Exists". A number line 145 to 185 cm. Three commute readings appear as chips top right: 26 min, 31 min, 47 min (the last one red).
- **Beat b:** The 30 heights drop in as red dots, stacking where values repeat. A gold brace over 150–175 labelled "most students". A red card "Variation is error" is crossed out; green card "The pattern of many values is stable."
- **Beat c:** Left: a large rounded box labelled "Population" filled with 60 small grey dots; 12 of them turn red and a red outline marks "Sample". Right: two purple rows, "population → parameter (μ)", "sample → statistic (x̄)".

---

## Scene 2 — Kinds of data (Lesson 0.2)

**Narration:**

- **Beat a:** Before drawing anything, ask what kind of data you have. Categorical data puts each item in a group: blood group, favourite sport. Numerical data is an amount. Numerical data splits again. Discrete data is counted and jumps between values, like the number of siblings. Continuous data is measured, and can be any value in a range, like height or time.
- **Beat b:** Careful. A pin code, five six zero zero zero one, is written in digits, but it is a label. The average of two pin codes means nothing. Digits do not make data numerical. The test is whether arithmetic makes sense. And the type decides the picture: pie or bar charts for categories, histograms for measurements.

**Visuals:**

- **Beat a:** A tree: "Data" at top, branches to "Categorical" (teal) and "Numerical" (red); "Numerical" branches to "Discrete" and "Continuous". Example text appears under each leaf: "blood group, sport", "siblings: 0, 1, 2, 3", "height, time".
- **Beat b:** A chip "PIN 560001" appears, a red card "digits, so numerical" is crossed out, and the chip slides under Categorical. A gold question "Does an average make sense?". Bottom row: small icons, a pie next to Categorical and a histogram next to Continuous.

---

## Scene 3 — Frequency tables and class intervals (Lesson 0.3)

**Narration:**

- **Beat a:** Here are forty test marks. As a raw list they show nothing. Group them into classes ten marks wide, and count. Five in the tens, nine in the twenties, fourteen in the thirties, eight in the forties, four in the fifties. Check: five plus nine plus fourteen plus eight plus four is forty. Now the shape is visible.
- **Beat b:** But look at the classes ten to nineteen and twenty to twenty nine. They do not touch. There is a gap between nineteen and twenty. For a continuous picture, move each limit half a unit outward. The class twenty to twenty nine really runs from nineteen point five to twenty nine point five. Those are its class boundaries. The class width is ten, and the class mark, the midpoint, is twenty four point five.

**Visuals:**

- **Beat a:** Header "0.3 · Frequency Tables". The 40 marks as an 8 by 5 grid of numbers (grey). It shrinks left; a table appears right: Class | f with rows 10–19 / 5, 20–29 / 9, 30–39 / 14, 40–49 / 8, 50–59 / 4, then gold "Total 40" and the green sum check.
- **Beat b:** A number line 9 to 41. Teal brackets for 10–19, 20–29, 30–39 with visible gaps and a red "gap" marker between 19 and 20. The brackets stretch out to red boundary brackets 9.5–19.5, 19.5–29.5, 29.5–39.5 that touch. Purple card: boundaries 19.5 and 29.5, width 29.5 − 19.5 = 10, class mark (20 + 29)/2 = 24.5.

---

## Scene 4 — Histograms: area is frequency (Lesson 0.4)

**Narration:**

- **Beat a:** A histogram stands a bar over each class on a real number line, with no gaps, because the classes touch. When every class is equally wide, the height can simply be the frequency.
- **Beat b:** Now unequal widths. A clinic groups sixty patients by age: zero to ten, ten to twenty, twenty to forty, forty to seventy, and seventy to eighty. The forty to seventy class has eighteen patients, the most of any class. Draw height as frequency, and that bar towers over the rest, just because it is thirty years wide.
- **Beat c:** Your eye judges area, so make area the frequency. Set the height to frequency density: frequency divided by class width. Then height times width gives back the frequency. Now the forty to seventy bar is one of the lowest, at point six patients per year, and the children, at one point two per year, are the most crowded group. In a histogram, area is frequency.

**Visuals:**

- **Beat a:** Header "0.4 · Histograms: Area Is Frequency". Axes marks 10–60, frequency 0–15; five touching red bars 5, 9, 14, 8, 4 with frequency labels.
- **Beat b:** New axes, age 0 to 80 years. Bars with height = frequency: 12, 8, 16, 18, 6. The 40–70 bar flashes; red caption "tall only because it is wide".
- **Beat c:** Purple formula `\text{density} = \frac{f}{w}` and `\text{area} = \frac{f}{w} \times w = f`. The bars transform to heights 1.2, 0.8, 0.8, 0.6, 0.6 (axis relabelled "patients per year"); the frequencies 12, 8, 16, 18, 6 sit inside the bars as areas. The 0–10 bar highlights gold.

---

## Scene 5 — Cumulative frequency and ogives (Lesson 0.5)

**Narration:**

- **Beat a:** Often the question is, how many are below a value? Keep a running total. Fifty students' weights: four weigh less than forty five kilograms, thirteen less than fifty, twenty eight less than fifty five, then forty, forty seven, and all fifty below seventy.
- **Beat b:** Plot each total at the upper boundary of its class. Thirteen below fifty is a fact about fifty, not about the class mark forty seven point five, because the class is only fully counted at its end. Join the points and you have the less than ogive.
- **Beat c:** Now read it backwards. Go across from half of fifty, which is twenty five, to the curve, then down: the median weight is about fifty four kilograms. The more than ogive falls from fifty to zero, and the two curves cross exactly at the median.

**Visuals:**

- **Beat a:** Header "0.5 · Cumulative Frequency and Ogives". A two-row table: "less than" 40, 45, 50, 55, 60, 65, 70; "cf" 0, 4, 13, 28, 40, 47, 50.
- **Beat b:** Axes weight 40–70, cf 0–50. Gold points at (40, 0), (45, 4), (50, 13), (55, 28), (60, 40), (65, 47), (70, 50) appear and a red polyline joins them. A red card "plot at the class mark 47.5" crossed out.
- **Beat c:** Gold dashed line from (40, 25) across to (54, 25) and down to (54, 0); label "median ≈ 54 kg". A teal more-than ogive through (40, 50), (45, 46), (50, 37), (55, 22), (60, 10), (65, 3), (70, 0); the crossing point pulses.

---

## Scene 6 — Honest and misleading pictures (Lesson 0.6)

**Narration:**

- **Beat a:** Most misleading graphs are made of correct numbers. Two bars, one hundred and two, and one hundred and eight. Start the axis at one hundred, and one bar looks four times the other. Start it at zero, and the truth appears: a difference of about six percent. Read the axes before you read the shape.
- **Beat b:** Class width can mislead too. Thirty three clinic waiting times, in classes twenty minutes wide, make a single lump. Narrow the classes to five minutes, and two peaks appear: patients of a quick doctor wait about twenty minutes, patients of a slow one about forty.

**Visuals:**

- **Beat a:** Header "0.6 · Honest and Misleading Pictures". Left panel "axis starts at 100": bars 2 and 8 units tall (red caption "looks 4×"). Right panel "axis starts at 0": nearly equal bars (green caption "108 / 102 ≈ 1.06").
- **Beat b:** Axes waiting time 0–60 min, frequency density 0–2. Three wide bars (0.35, 0.85, 0.45) transform into eight narrow bars (0.2, 1.2, 1.8, 0.2, 0.2, 1.2, 1.6, 0.2) over 10–50; gold labels "quick doctor" and "slow doctor" over the two peaks.

---

## Scene 7 — Recap

**Narration:** Chapter zero in six lines. Statistics exists because things vary, and the pattern of many values is stable. Decide the type of data first, and remember that digits do not make data numerical. Group raw data into classes, and turn inclusive classes into boundaries. In a histogram, area is frequency, so unequal widths need frequency density. Plot running totals at upper boundaries, and read the median at n over two. And always read the axes before the shape. Now test yourself in the mastery lesson.

**Visuals:** Title "Chapter 0 in six lines" and six numbered rows appearing one at a time; footer "Next: 0.7 · Chapter 0 Mastery".
