# Units, Dimensions and Measurement — Explainer Script

- **Course:** Mechanics I: Motion, Forces and Energy
- **Chapter:** Chapter 0 · Units, Dimensions and Measurement (id: `mfe-0-units-dimensions-measurement`)
- **Target runtime:** about 6.5 minutes (roughly 1,000 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mfe-0-units-dimensions-measurement.py`, class `MfeCh0Video`

**Learning goal.** The learner treats every quantity as a number times a unit and converts by multiplying by fractions equal to one (km/h ÷ 3.6 → m/s, never ÷ 1000/60). They build dimensional formulae from defining equations instead of memorising them, and know that equal dimensions do not mean equal quantities (work vs torque) and that dimensionless does not mean unitless (the radian). They use homogeneity to check a formula and to derive the pendulum's $T = k\sqrt{l/g}$, and they know its limits: no constants, no sums, no proof of correctness. They count significant figures and apply the two arithmetic rules, propagate errors (absolute errors add in sums, relative errors add in products, weighted by powers), correct an instrument reading for zero error, and handle the three vector moves mechanics needs: add, resolve, subtract.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Each lesson scene carries a small muted bold header in the top-left ("0.1 · Physical quantities and SI units"). Colour roles: forces and the quantity in focus = PRIMARY (red), a second vector = SECONDARY (teal), components and errors = ACCENT (amber), resultants and relative vectors = PURPLE, correct = GREEN, wrong = red cross. Math uses `MathTex`; units are upright (`\text{}`). Between scenes the frame is cleared with `FadeOut`.

**TTS note:** numbers are written the way they should be read ("four point four five", "nineteen ninety nine", "seventy two kilometres per hour"). Dimensions are spoken as letters with powers ("M L T to the minus two"). Where the variable $a$ is spoken ("a t squared", "m a", "a c"), the scene spells it `[[char LTRL]]a[[char NORM]]` (via `say_fix` and the `SAY_A` phrase list) so `say` does not read it as the article.

---

## Title card

**Narration:** Chapter zero. Units, dimensions and measurement.

**Visuals:** `title_card("Motion, Forces and Energy", "Chapter 0 · Units, Dimensions and Measurement")`.

---

## Scene 1 — A number is not a quantity (Lesson 0.1)

**Narration:**

- **Beat a:** In September nineteen ninety nine, NASA's Mars Climate Orbiter flew too low into the Martian atmosphere and was destroyed. One team reported thruster impulse in pound-force seconds. The navigation team read those numbers as newton seconds.
- **Beat b:** One pound-force is about four point four five newtons, so every correction was off by that factor. A number on its own is not a physical quantity. Every quantity is a number times a unit.
- **Beat c:** SI picks seven base quantities, from mass, length and time to current and temperature. Every other unit, the newton, the joule, the watt, the pascal, is built from them.
- **Beat d:** Treat the unit as a real factor, and converting becomes multiplying by one. A thousand metres over one kilometre is one. So is one hour over three thousand six hundred seconds. Multiply, the old units cancel, and seventy two kilometres per hour becomes twenty metres per second.
- **Beat e:** Together the factors are one over three point six: to get metres per second, divide by three point six. Not by a thousand over sixty: an hour is three thousand six hundred seconds, not sixty. And for this whole course, g is ten metres per second squared, unless a question says otherwise.

**Visuals:**

- **Beat a:** Mars (a filled orange circle) with a dashed amber atmosphere ring. A green dashed "planned" pass stays high; a red "actual" path spirals into the atmosphere while a probe dot rides it and flashes. On the right: "sent: 12 lbf·s" (amber), then "read as: 12 N·s" (teal).
- **Beat b:** $1\ \text{lbf} \approx 4.45\ \text{N}$ and "every correction off by × 4.45". Everything clears and the boxed rule "quantity = number × unit" is written.
- **Beat c:** Seven unit chips (kg, m, s, A, K, mol, cd) with their quantity names, under "seven SI base units". A row of derived units: N = kg·m/s², J = N·m, W = J/s, Pa = N/m².
- **Beat d:** The conversion built from separate fraction pieces: $72\,\frac{\text{km}}{\text{h}} \times \frac{1000\text{ m}}{1\text{ km}} \times \frac{1\text{ h}}{3600\text{ s}}$, each conversion fraction tagged "= 1" in gold. Red strike lines cancel km against km and h against h, then "= 20 m/s" in green.
- **Beat e:** A boxed "km/h → m/s, ÷ 3.6". A red "÷ 1000/60" with a cross and "an hour is 3600 s, not 60". At the bottom: $g = 10\ \text{m/s}^2$ (teal) "throughout this course, unless told otherwise".

---

## Scene 2 — Dimensions (Lesson 0.2)

**Narration:**

- **Beat a:** Twenty metres per second. Seventy two kilometres per hour. About forty five miles per hour. The numbers change with the unit, but every one of them is a length divided by a time. That unit free skeleton is the dimension: L T to the minus one.
- **Beat b:** You never memorise a dimensional formula. Start from a defining equation. Velocity is L T to the minus one. Acceleration divides by time again. Force is mass times acceleration: M L T to the minus two. Work is force times distance, and power is work per second.
- **Beat c:** Newton's law of gravitation works the same way. Make G the subject: F r squared over m one m two. Collect the powers, and G is M to the minus one, L cubed, T to the minus two.
- **Beat d:** Two warnings. Work and torque share the dimensions M L squared T to the minus two, yet one is a scalar in joules and the other a vector in newton metres. And an angle is dimensionless, arc over radius, but it still has a unit: the radian.

**Visuals:**

- **Beat a:** Three speeds in a row; muted arrows converge on $\frac{[\text{length}]}{[\text{time}]} = [LT^{-1}]$ in red.
- **Beat b:** "start from a defining equation", then five stacked lines: $[v] = [LT^{-1}]$, $[a] = [LT^{-2}]$, $[F] = [MLT^{-2}]$ (red), $[W] = [ML^2T^{-2}]$, $[P] = [ML^2T^{-3}]$.
- **Beat c:** $F = \frac{Gm_1m_2}{r^2}$, `TransformFromCopy` to $G = \frac{Fr^2}{m_1m_2}$, then $[G] = \frac{[MLT^{-2}][L^2]}{[M][M]} = [M^{-1}L^3T^{-2}]$ with the result green.
- **Beat d:** Split screen: "work" $W = \vec F\cdot\vec s$, $[ML^2T^{-2}]$, scalar, joule | "torque" $\vec\tau = \vec r\times\vec F$, $[ML^2T^{-2}]$, vector, N·m. Caption "same dimensions, different quantities". Below, a sector with arc $s$ (amber) and radius $r$: $\theta = \frac{s}{r}$, $[M^0L^0T^0]$, yet unit: radian.

---

## Scene 3 — Dimensional analysis and its limits (Lesson 0.3)

**Narration:**

- **Beat a:** The principle of homogeneity: you can only add, subtract or equate terms with the same dimensions. Check s equals u t plus one half a t squared. Every term is a length, so it passes. Misremember it as u t squared plus one half a t, and the first term is L T. One line of checking kills the formula.
- **Beat b:** Dimensions can also predict. Suppose a pendulum's period depends on the bob's mass, the string's length and g. Write T equals k, times m to the a, l to the b, g to the c, and match the powers of M, L and T on both sides.
- **Beat c:** Mass appears nowhere else on the right, so a is zero: the period does not depend on the bob at all. Time gives c equals minus one half, and length gives b equals one half. So T is k times the square root of l over g.
- **Beat d:** Now notice what it cannot do. It cannot find k, which is two pi. It cannot build sums of terms, and it fails inside sines, exponentials and logs. And it can never prove a formula right: s equals u t plus a t squared is dimensionally perfect, and wrong.

**Visuals:**

- **Beat a:** Rule in red bold at the top. Left: $s = ut + \tfrac12at^2$ with $[L]$ under each term (green) and a check. Right: $s = ut^2 + \tfrac12at$ with $[L]$ and a red $[LT]$, and a cross.
- **Beat b:** A pendulum on the left swings continuously (`ValueTracker` time, `always_redraw` string and red bob), labelled $l$, $m$, $g\downarrow$. Right: $T = k\,m^a l^b g^c$, then $[T] = [M]^a[L]^b[LT^{-2}]^c$.
- **Beat c:** Three lines appear in time with the swing: $M: a = 0$ (red), $T: 1 = -2c \Rightarrow c = -\tfrac12$, $L: 0 = b + c \Rightarrow b = \tfrac12$. Boxed green $T = k\sqrt{l/g}$.
- **Beat d:** Clear. Four limits with red crosses: cannot find constants (the $2\pi$); cannot build sums; fails inside sin, exp, log; cannot tell work from torque. Then $s = ut + at^2$ with "dimensionally fine, physically wrong".

---

## Scene 4 — Significant figures (Lesson 0.4)

**Narration:**

- **Beat a:** You measure a pencil with a millimetre ruler: twelve point three centimetres. Divide by three, and the calculator says four point one zero zero zero zero zero zero. Nobody measures a pencil that finely. Those extra digits are not accuracy. They are a false claim.
- **Beat b:** Significant figures are the reliable digits, plus the first uncertain one. Leading zeros never count. So zero point zero zero seven zero three zero has four: seven, zero, three, and the trailing zero, which says you measured that finely.
- **Beat c:** Multiplying or dividing, keep the fewest significant figures: five point seven four over one point two gives four point eight, not four point seven eight three. Adding or subtracting, keep the fewest decimal places: two point five, plus zero point four one two, plus eleven point zero three, is thirteen point nine.

**Visuals:**

- **Beat a:** A ruler with millimetre ticks and a pencil laid along it, "12.3 cm". A calculator with "12.3 ÷ 3 =" types out "4.1000000"; the trailing digits flash red and "extra digits = a false claim" appears.
- **Beat b:** Large $0.00\,7030$ with the leading zeros muted and 7030 red. "leading zeros never count" above; a brace under 7030 with "4 significant figures"; "the trailing zero after the point does count" in green below.
- **Beat c:** "multiply or divide: fewest significant figures" over $\frac{5.74\text{ g}}{1.2\text{ cm}^3} = 4.78\ldots \to 4.8\text{ g/cm}^3$; "add or subtract: fewest decimal places" over $2.5 + 0.412 + 11.03 = 13.942 \to 13.9$.

---

## Scene 5 — Errors in measurement (Lesson 0.5)

**Narration:**

- **Beat a:** Time a pendulum five times and you get five different periods. The mean is two point six two seconds, and the mean absolute error, the average distance from the mean, is zero point one one. So T is two point six two, plus or minus zero point one one seconds: about four percent.
- **Beat b:** Errors spread through every calculation. In a sum or a difference, absolute errors add. Twenty plus or minus zero point five, minus ten plus or minus zero point three, is ten plus or minus zero point eight. Values subtract. Errors never cancel.
- **Beat c:** In a product or a quotient, relative errors add, and a power multiplies its relative error. For g equals four pi squared l over T squared: zero point two percent from l, plus twice zero point five percent from T, gives one point two percent. Timing is the weak spot, so time twenty swings instead of one.
- **Beat d:** Instruments add one more step. A vernier or a screw gauge reads the main scale, plus the coinciding division times the least count. If it already reads something with nothing between its jaws, that zero error, with its sign, comes off every reading.

**Visuals:**

- **Beat a:** A number line from 2.3 to 2.9 s. The readings 2.63, 2.56, 2.42, 2.71, 2.80 drop in as teal dots. A dashed red mean line $\bar T = 2.62$; amber deviation bars from each dot to the mean. $T = 2.62 \pm 0.11$ s ($\approx 4\%$).
- **Beat b:** "sum or difference: absolute errors add" over $(20.0 \pm 0.5) - (10.0 \pm 0.3) = 10.0 \pm 0.8$, "values subtract; errors never cancel".
- **Beat c:** "product, quotient, power: relative errors add, times the power". $g = \frac{4\pi^2l}{T^2}$ and $\frac{\Delta g}{g} = \frac{\Delta l}{l} + 2\frac{\Delta T}{T}$ on the left; two horizontal bars on the right, a short amber one ($l$: 0.2%) and a long red one ($T$: 2 × 0.5% = 1.0%). Total $\frac{\Delta g}{g} = 1.2\%$ in green, "so time 20 swings, not 1".
- **Beat d:** Screw-gauge example from the lesson: least count $= \frac{0.5\text{ mm}}{50} = 0.01$ mm; reading $= 2.5 + 34 \times 0.01 = 2.84$ mm; corrected $= 2.84 - (+0.04) = 2.80$ mm (green). Caption: "zero error = what it reads with nothing in it (keep its sign)".

---

## Scene 6 — Vectors for physics (Lesson 0.6)

**Narration:**

- **Beat a:** Two people pull a crate, with three newtons and four newtons. Same direction: seven. Opposite: one. At right angles: five. Direction matters, so force is a vector, and mechanics needs just three vector moves: add, resolve and subtract.
- **Beat b:** Add with a parallelogram. The resultant squared is A squared plus B squared plus two A B cos theta. At sixty degrees, three and four newtons give root thirty seven, about six point one newtons. Swing past ninety degrees, and the resultant can be shorter than either force.
- **Beat c:** Resolve by running addition backwards. A force F at angle theta has components F cos theta and F sin theta. On an incline, choose axes along and across the slope: the weight splits into m g sin theta down the slope, and m g cos theta into it.
- **Beat d:** Subtract to change your viewpoint. The position of A as seen from B is r A minus r B: the arrow from B to A. Differentiate it, and you get relative velocity, the key to chapter two.

**Visuals:**

- **Beat a:** A crate with a red 3 N arrow and a teal 4 N arrow driven by an angle tracker; a live "resultant = 7.0 N" readout. The 4 N arrow swings to 180° (1 N) and back to 90° (5 N) as "same way: 7", "opposite: 1", "right angle: 5" appear. "three moves: add, resolve, subtract".
- **Beat b:** Parallelogram from one corner: red $\vec A$, teal $\vec B$, dashed sides, purple resultant, angle arc. Right column: $R^2 = A^2 + B^2 + 2AB\cos\theta$, live $\theta$ and $R$ readouts, the worked line $\theta = 60^\circ: R = \sqrt{37} \approx 6.1$ N. $\vec B$ swings to 150° and $R$ drops to about 2 N; "past 90°, R can be smaller than either force".
- **Beat c:** Left: $F$ at $\theta$ with amber components $F\cos\theta$ and $F\sin\theta$. Right: a 30° wedge with a block; red $mg$ straight down, amber $mg\sin\theta$ down the slope, purple $mg\cos\theta$ into the slope; caption "axes along and across the slope (Chapter 3)".
- **Beat d:** Origin $O$ with red $\vec r_A$ and teal $\vec r_B$; a purple arrow from B to A labelled $\vec r_{AB}$. Right: $\vec r_{AB} = \vec r_A - \vec r_B$ ("A as seen from B"), then $\frac{d}{dt}: \vec v_{AB} = \vec v_A - \vec v_B$ ("relative velocity, Chapter 2").

---

## Scene 7 — Recap and next (Lesson 0.7)

**Narration:**

- **Beat a:** To recap. Every quantity is a number times a unit, and you convert by multiplying by one. Dimensions come from defining equations, and only like dimensions add.
- **Beat b:** Dimensional analysis checks and predicts, but never finds constants. In sums, absolute errors add. In products and powers, relative errors add, times the power. And vectors add, resolve and subtract.
- **Beat c:** Try the mastery quiz. Then chapter one puts a particle on a straight track, and asks how its position, velocity and acceleration change with time.

**Visuals:** Title "Chapter 0 in five lines". Five numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $72\ \text{km/h} \div 3.6 = 20\ \text{m/s}$: number × unit; multiply by 1
2. $[F] = [MLT^{-2}]$: dimensions from defining equations
3. $T = k\sqrt{l/g}$: checks and predicts, never finds k
4. $\frac{\Delta g}{g} = \frac{\Delta l}{l} + 2\frac{\Delta T}{T}$: errors add, times the power
5. $R^2 = A^2 + B^2 + 2AB\cos\theta$: add, resolve, subtract

Last, "Next: Chapter 1 · Motion in a Straight Line" appears at the bottom.
