# Trigonometry · Chapter 1 · The Unit Circle

- **Course:** Trigonometry
- **Chapter:** Chapter 1 · The Unit Circle (id: `trig-1-unit-circle`)
- **Target runtime:** about 6.5 minutes (roughly 1,100 spoken words at Samantha's ~170 words per minute; within the 7-minute ceiling)

**Learning goal:** Chapter 0 left a ceiling: sine and cosine only worked for angles between 0° and 90°, because every angle had to fit inside a right triangle. This chapter removes it. Draw the triangle inside a circle of radius 1, and the point reached by rotating through theta is (cos θ, sin θ). That definition covers any angle: past 90°, negative, or beyond 360° (a full turn is 360°, or 2π radians). From there the learner should be able to get a sign from the quadrant and a size from the reference angle, recognise sin²θ + cos²θ = 1 as the circle's own equation (and rearrange it or use it as an error check), read tangent as a slope and say where the other four functions are undefined, and rebuild every standard value from three facts instead of a memorized chart.

**Global style (all scenes):** dark background (`#1e1e2e` or Manim default). Unit circle radius drawn at 2.5 Manim units, centred at `LEFT*2.5` (axes box 7.5 units, so x runs from −6.25 to 1.25). The right-hand strip (x from about 1.6 to 6.8) holds equations. **Right-column rule:** every `MathTex`/`Text` placed in the right column is capped with `.scale_to_fit_width(5.2)` if wider than 5.2 units, and any chain longer than two `=` signs is split over two lines (second line starts with `=`, aligned with `arrange(DOWN, aligned_edge=LEFT)`). Hold at most three stacked lines in the right column at once; FadeOut older lines before adding a fourth. Colour key used throughout: cosine / x-coordinate = BLUE, sine / y-coordinate = RED (or `#ff6b6b`), radius = WHITE, reference angle arc = PURPLE, tangent/slope = GREEN, "undefined here" warning = ORANGE. Angles are in degrees unless stated. Use a `ValueTracker` named `theta` (degrees) for every rotating point, with the point, radius, vertical drop line, and triangle rebuilt with `always_redraw`. When a beat starts from a different angle than the previous beat ended on, jump with `theta.set_value(...)` (no tween) unless stated.

---

## Scene 1 — The ceiling (Lesson 1.1, intro)

**Beat a**
Narration: Chapter zero ended with a ceiling. Every angle lived inside a right triangle, so it stayed between zero and ninety degrees.

Visuals: A right triangle with vertices (0,0), (3,0), (3,2) is drawn in the centre with `Create`. A small angle arc at the origin is labelled `MathTex(r"\theta")`. A horizontal dashed line labelled `Text("90° ceiling")` fades in above the triangle.

**Beat b**
Narration: But a Ferris wheel turns two hundred degrees, and a pendulum swings to negative fifteen. Neither fits a right triangle.

Visuals: Two small line diagrams side by side, each with a `Text` caption underneath. Left: a small circle with a spoke that sweeps anticlockwise from the positive x direction through 200°, with its arc (caption "Ferris wheel, 200°"). Right: a short horizontal reference ray and a spoke swung 15° clockwise from it, with a small clockwise arc (caption "pendulum, −15°"); both angles are measured from the positive x direction, matching the rest of the video. A red `Cross` is drawn over each caption. Then `FadeOut` everything.

## Scene 2 — Lifting the triangle onto a circle (Lesson 1.1)

**Beat a**
Narration: The fix is small. Draw the triangle inside a circle of radius one, centred at the origin: the unit circle.

Visuals: `Axes(x_range=[-1.5,1.5,0.5], y_range=[-1.5,1.5,0.5], x_length=7.5, y_length=7.5)` centred at `LEFT*2.5`. `Circle(radius=2.5)` drawn with `Create`. A label `Text("unit circle")` and `MathTex("r = 1")` beside the circle.

**Beat b**
Narration: Start at the point one, zero, and rotate anticlockwise by theta. Drop a vertical line to the x-axis. The hypotenuse is the radius, length one.

Visuals: A dot at (1,0) in axes coords. `theta` animates from 0 to 40. The radius (WHITE line from origin to the dot) rotates, and a dashed vertical line drops from the dot to the x-axis. The triangle fills lightly (`Polygon` with fill opacity 0.2). The horizontal leg is BLUE and labelled `x`, the vertical leg is RED and labelled `y`, and the hypotenuse is labelled `1`.

**Beat c**
Narration: Cosine is adjacent over hypotenuse: x over one, just x. Sine is opposite over hypotenuse: just y.

Visuals: On the right, two stacked lines, each split over two rows per the right-column rule:
`MathTex(r"\cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}}")` / `MathTex(r"= \frac{x}{1} = x")`, then
`MathTex(r"\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}}")` / `MathTex(r"= \frac{y}{1} = y")`.
Flash the BLUE leg while the cosine line is written and the RED leg while the sine line is written.

**Beat d**
Narration: Here is the definition the rest of the course runs on. The point at angle theta has coordinates cosine theta, comma, sine theta. Cosine is horizontal. Sine is vertical.

Visuals: Replace the equations with a boxed definition: `MathTex(r"P(\theta) = (\cos\theta,\ \sin\theta)")` inside a `SurroundingRectangle` (YELLOW). The dot's label changes to `MathTex(r"(\cos\theta, \sin\theta)")`, with cos in BLUE and sin in RED.

**Beat e**
Narration: Nothing was overturned. For an acute angle, dividing by a hypotenuse of one changes nothing. On a circle of radius five, through the point three, four, you would still divide: cosine is three fifths. Radius one just skips the division.

Visuals: Keep the unit circle and triangle. In the right column, draw a small separate inset: a circle of radius 1.5 (labelled `r = 5`) with a dot at the scaled point (3,4)/5 and label `MathTex("(3, 4)")`, BLUE horizontal leg labelled `3`, hypotenuse labelled `5`. Below it write `MathTex(r"\cos\theta = \frac{x}{r} = \frac35")`. Then fade the inset and write `MathTex(r"r = 1 \Rightarrow \frac{x}{1} = x")`.

**Beat f**
Narration: What changed is that the definition mentions a rotation, not a triangle. At thirty degrees, the height reads one half, exactly sine of thirty degrees.

Visuals: Fade the triangle fill to opacity 0 while the radius and dot stay. Animate `theta` from 40 to 30. A `DecimalNumber` readout next to the dot shows y = 0.50, and `MathTex(r"\sin 30^\circ = \tfrac12")` appears on the right.

**Beat g**
Narration: Two facts come free. At zero degrees the point is one, zero: cosine one, sine zero. At ninety it is zero, one: cosine zero, sine one. As triangles these were degenerate. As points they are ordinary. And on a circle of radius one, neither coordinate can exceed one.

Visuals: Clear the right column. Animate `theta` to 0 and highlight the dot at (1,0) with `MathTex(r"\cos 0^\circ = 1,\ \sin 0^\circ = 0")`. Animate to 90 and highlight (0,1) with `MathTex(r"\cos 90^\circ = 0,\ \sin 90^\circ = 1")`. While "degenerate" is spoken, briefly flash a flattened triangle (a zero-height `Polygon` drawn as a line along the x-axis) that fades. Then draw a faint square from −1 to 1 on both axes around the circle and label it `MathTex(r"-1 \le \cos\theta,\ \sin\theta \le 1")`. Clear the right-side equations.

## Scene 3 — Angles beyond the triangle (Lesson 1.2)

**Beat a**
Narration: Now rotate by one hundred fifty degrees. No right triangle contains that angle, but the point has coordinates like any other.

Visuals: `theta` animates from 90 to 150. An angle arc from the positive x-axis to the radius is labelled `MathTex(r"150^\circ")`. The dot in quadrant II is labelled `MathTex(r"(\cos 150^\circ, \sin 150^\circ)")`.

**Beat b**
Narration: That kills a misconception: that sine only works for acute angles. It was first defined that way. On the circle, every angle has a sine.

Visuals: A warning card (ORANGE `RoundedRectangle`) shows the quote `Text("\"Sine only makes sense for acute angles.\"")`, scaled to fit the right column. A red strike `Line` is drawn through it. The card then fades.

**Beat c**
Narration: Three conventions. Start at the positive x-axis. Anticlockwise is positive and clockwise is negative, so negative ninety degrees lands at the point zero, negative one, straight down. And nothing stops at three hundred sixty.

Visuals: Three bullet lines appear one at a time on the right: `Text("0° = positive x-axis")`, `Text("anticlockwise +, clockwise −")`, `Text("keep turning past 360°")`. During the second bullet, `theta` animates from 150 to −90 with a curved arrow drawn clockwise, and the dot is labelled `MathTex("(0,-1)")`. During the third, `theta` animates from −90 through to 400. A `DecimalNumber` angle readout counts up.

**Beat d**
Narration: Angles that end at the same point are coterminal. They differ by whole turns, three hundred sixty degrees, or two pi radians, and share every value. So sine of four hundred degrees equals sine of forty degrees.

Visuals: Clear the bullets. Boxed `MathTex(r"\theta + 360^\circ n,\quad n \in \mathbb{Z}")`, and beside/below it `MathTex(r"360^\circ = 2\pi")`. Show a ghost radius at 40° (low opacity) overlapping exactly with the 400° radius. Write `MathTex(r"\sin 400^\circ = \sin 40^\circ")`.

**Beat e**
Narration: To reduce a big angle, subtract full turns. Three full turns is one thousand eighty degrees. One thousand one hundred ten minus one thousand eighty leaves thirty. For negative angles, add turns instead: cosine of negative thirty equals cosine of three thirty.

Visuals: Clear the right column. Set `theta.set_value(30)` with no tween (30 is where the reduced angle lands, so the jump from 400 is off-screen in meaning; alternatively fade the dot out and in). Write on two lines: `MathTex(r"1110^\circ - 3(360^\circ)")` / `MathTex(r"= 1110^\circ - 1080^\circ = 30^\circ")`. The dot spins three full turns (`theta` from 30 to 1110, `rate_func=linear`, run_time 2) with a turn counter `Integer` showing 1, 2, 3; the angle readout then shows 1110° and swaps to 30°. Then write `MathTex(r"-30^\circ + 360^\circ = 330^\circ")` and `MathTex(r"\cos(-30^\circ) = \cos 330^\circ")`, while `theta` jumps to −30 and a ghost radius at 330° overlaps it.

**Beat f**
Narration: Negative theta mirrors the point across the x-axis: same x, opposite y. So cosine of negative theta is cosine theta, and sine of negative theta is negative sine theta.

Visuals: Clear the right column. Two dots: one at θ = 35° (solid) and one at −35° (outlined), joined by a dashed vertical line crossing the x-axis. The shared BLUE x-leg is highlighted. Write on two lines: `MathTex(r"\cos(-\theta) = \cos\theta")` / `MathTex(r"\sin(-\theta) = -\sin\theta")`. Clear all except the axes and circle.

## Scene 4 — Signs and reference angles (Lesson 1.3)

**Beat a**
Narration: Now the idea that replaces the memorized chart: every angle is a first quadrant angle plus a sign.

Visuals: A crowded "chart" of the unit circle (16 small coordinate labels around the circle) fades in, gets a red `Cross`, and fades out. Then a two-line card appears on the right: `Text("1. How far from the x-axis? → size")` and `Text("2. Which quadrant? → sign")`.

**Beat b**
Narration: The signs come from which half of the plane you are in. Right of the y-axis, cosine is positive. Above the x-axis, sine is positive. Tangent, y over x, is positive in quadrants one and three.

Visuals: Label quadrants with Roman numerals `I`, `II`, `III`, `IV`. Build by first shading the right half (x > 0) BLUE-tinted, then the top half (y > 0) RED-tinted, then fading the shading and leaving in each quadrant a sign triplet `MathTex` in the colour key, for example quadrant II: `\cos -,\ \sin +,\ \tan -`.

**Beat c**
Narration: The reference angle is the acute angle to the x-axis, never the y-axis. For one hundred twenty degrees, one eighty minus one twenty is sixty. Sixty, not thirty.

Visuals: Clear the two-question card. `theta` animates to 120. A PURPLE arc is drawn from the radius down to the negative x-axis and labelled `MathTex(r"60^\circ")`. On the right: `MathTex(r"180^\circ - 120^\circ = 60^\circ")`. A faded wrong arc to the y-axis labelled `30^\circ` appears briefly with a red `Cross`.

**Beat d**
Narration: The rule depends on the quadrant. In quadrant two, one eighty minus theta. In quadrant three, theta minus one eighty. In quadrant four, three sixty minus theta.

Visuals: Replace the right column with a four-line rules card (`VGroup` of `MathTex`, left-aligned, scaled to width 5.2): `\text{Q I: } \theta`, `\text{Q II: } 180^\circ - \theta`, `\text{Q III: } \theta - 180^\circ`, `\text{Q IV: } 360^\circ - \theta`. As each line is spoken, the matching quadrant numeral on the circle pulses (`Indicate`). Keep the card at small scale in the top-right corner for beats e and f.

**Beat e**
Narration: Worked example: cosine of two hundred ten degrees. Quadrant three, so x is negative. Write the minus sign first. Two ten minus one eighty is thirty, and cosine of thirty is the square root of three, over two. So the answer is negative root three, over two.

Visuals: `theta` animates to 210. The quadrant III label pulses and the Q III line of the rules card highlights. Below the card, build line by line (max three lines):
`MathTex(r"\text{Q III} \Rightarrow x < 0 \Rightarrow -")`,
`MathTex(r"210^\circ - 180^\circ = 30^\circ")` (PURPLE arc appears from the radius to the negative x-axis),
`MathTex(r"\cos 30^\circ = \frac{\sqrt3}{2}")`.
Then FadeOut the first two lines and box the final result: `MathTex(r"\cos 210^\circ = -\frac{\sqrt{3}}{2}")`. No triangle sketch here (Scene 7 shows the special triangles).

**Beat f**
Narration: Once more: sine of three fifteen degrees. Quadrant four, so negative. Three sixty minus three fifteen is forty five. So the answer is negative root two, over two.

Visuals: Clear the worked lines. `theta` animates to 315. The Q IV line of the rules card highlights; the PURPLE arc runs from the radius up to the positive x-axis, labelled `45^\circ`. Build: `MathTex(r"\text{Q IV} \Rightarrow y < 0 \Rightarrow -")`, `MathTex(r"360^\circ - 315^\circ = 45^\circ")`, then boxed `MathTex(r"\sin 315^\circ = -\frac{\sqrt2}{2}")`.

**Beat g**
Narration: Classic errors: measuring to the y-axis, and the right size with the wrong sign. Write the sign first.

Visuals: A two-item warning card (ORANGE border) with `Text("✗ measuring to the y-axis")` and `Text("✗ right size, wrong sign")`, and a GREEN tip `Text("Sign first, then size")`. Clear the right side and the rules card.

## Scene 5 — Pythagoras in disguise (Lesson 1.4)

**Beat a**
Narration: The most used identity in trigonometry is one you already know. The unit circle's equation is x squared plus y squared equals one. Substitute cosine and sine, and you get cosine squared theta plus sine squared theta equals one, usually written sine squared first.

Visuals: `MathTex(r"x", r"^2", r"+", r"y", r"^2", r"= 1")` is written. Transform into `MathTex(r"\cos", r"^2", r"\theta", r"+", r"\sin", r"^2", r"\theta", r"= 1")` with `TransformMatchingTex` plus an explicit `key_map={"x": r"\cos", "y": r"\sin"}` (or equivalently build both with `substrings_to_isolate=["x","y",r"\cos",r"\sin","^2"]`), colouring `\cos` BLUE and `\sin` RED. Then reorder into the boxed `MathTex(r"\sin^2\theta + \cos^2\theta = 1")`. A small note underneath: `MathTex(r"\sin^2\theta = (\sin\theta)^2")`.

**Beat b**
Narration: It is Pythagoras in disguise. Squaring erases the negative signs of the other quadrants, so it holds for every angle.

Visuals: `theta` sweeps from 0 to 360 over 4 seconds with the triangle redrawn. On the right, a live readout: `cos²θ + sin²θ =` followed by a `DecimalNumber` that stays at 1.000 the whole time, while the individual cos and sin readouts change sign.

**Beat c**
Narration: It also converts. Say sine theta is three fifths, in quadrant two. Cosine squared is one minus nine twenty fifths, or sixteen twenty fifths. So cosine is plus or minus four fifths.

Visuals: `theta` set to 180 − 36.87 ≈ 143.13 degrees, so the dot sits at (−0.8, 0.6). Write `MathTex(r"\sin\theta = \tfrac35,\ \theta \in \text{Q II}")`, then on two lines `MathTex(r"\cos^2\theta = 1 - \left(\tfrac35\right)^2")` / `MathTex(r"= 1 - \tfrac{9}{25} = \tfrac{16}{25}")`, then `MathTex(r"\cos\theta = \pm\tfrac45")` (FadeOut the first line before this one to stay at three lines).

**Beat d**
Narration: The algebra gives both signs. The geometry picks one. Quadrant two means x is negative, so cosine is negative four fifths. Skipping this is the chapter's most common error.

Visuals: The `+` in `\pm` is struck through with a red line and the answer becomes the boxed `MathTex(r"\cos\theta = -\tfrac45")`. The BLUE x-leg of the triangle, pointing left of the origin, is highlighted. Clear all equations.

**Beat e**
Narration: It rearranges freely: sine squared is one minus cosine squared, and the other way round. It also catches mistakes. Sine point six and cosine point nine? The squares add to one point one seven, so no angle has both.

Visuals: Write on the right: `MathTex(r"\sin^2\theta = 1 - \cos^2\theta")` and `MathTex(r"\cos^2\theta = 1 - \sin^2\theta")`. Fade them, then write `MathTex(r"0.6^2 + 0.9^2 = 0.36 + 0.81")` / `MathTex(r"= 1.17 \ne 1")`. Plot the point (0.9, 0.6) as an ORANGE dot visibly outside the unit circle, with a red `Cross`. Clear.

## Scene 6 — The other four (Lesson 1.5)

**Beat a**
Narration: Tangent is sine over cosine, which is y over x. Cotangent is one over tangent. Secant is one over cosine, and cosecant is one over sine. Careful: secant pairs with cosine, cosecant with sine.

Visuals: A 2x2 grid of `MathTex` in the right column (each scaled to fit a 2.5-unit cell): `\tan\theta = \frac{\sin\theta}{\cos\theta} = \frac{y}{x}`, `\cot\theta = \frac{1}{\tan\theta} = \frac{x}{y}`, `\sec\theta = \frac{1}{\cos\theta} = \frac{1}{x}`, `\csc\theta = \frac{1}{\sin\theta} = \frac{1}{y}`. Then arrows link `\sec` to `\cos` and `\csc` to `\sin`, with the third letter highlighted (se**c** → **c**os, cs**c** → **s**in).

**Beat b**
Narration: Tangent is a slope. The radius runs from the origin to the point x, y, so its rise over run is y over x. At forty five degrees, the slope is one.

Visuals: Clear the grid. `theta` to 45. The radius is extended to a full GREEN line through the origin (`Line` from −4 to 4 along the direction). A rise/run staircase with the RED rise and BLUE run labelled. `MathTex(r"\tan\theta = \frac{\text{rise}}{\text{run}} = \frac{y}{x}")`, and `MathTex(r"\tan 45^\circ = 1")`.

**Beat c**
Narration: That is why tangent repeats every one hundred eighty degrees: a line through the origin looks the same after a half turn.

Visuals: Animate `theta` from 45 to 225. The GREEN line through the origin ends up exactly on top of itself, and the dot has moved to the opposite end. Briefly flash the line.

**Beat d**
Narration: Slide toward ninety degrees. X shrinks to zero, and the slope runs away. At ninety the line is vertical, with no slope. So tangent and secant, with x underneath, break at ninety, two seventy, and every half turn after that. Cotangent and cosecant break where y is zero.

Visuals: Clear the right column. Tween `theta` from 225 back to 60 (run_time 1), then from 60 to 89.5 with `rate_func=rush_into`. A `DecimalNumber` tan readout climbs (1.73 … 10 … 100) as the GREEN line steepens. Then `theta.set_value(90)`: the GREEN line is redrawn vertical and the readout is replaced by `Text("undefined", color=ORANGE)`. Then a small table appears on the right: rows `\tan, \sec` | denominator `x` | undefined at `90^\circ, 270^\circ, \ldots`; rows `\cot, \csc` | denominator `y` | undefined at `0^\circ, 180^\circ, \ldots`. Highlight the broken points in ORANGE only: (0, ±1) labelled `Text("x = 0")`, and (±1, 0) labelled `Text("y = 0")`.

**Beat e**
Narration: Sine and cosine never break. A point always has both coordinates.

Visuals: Fade the table and ORANGE markers. `theta` sweeps a full turn with only the cos and sin readouts visible and never breaking. Clear the right side.

## Scene 7 — Rebuild the whole circle (Lesson 1.6)

**Beat a**
Narration: You do not need the chart. Three facts rebuild it: the axis points, the two special triangles, and quadrant plus reference angle.

Visuals: Three numbered cards appear on the right. Card 1: the four axis points (1,0), (0,1), (−1,0), (0,−1) pulse on the circle. Card 2: small drawings of a half-equilateral triangle (30°/60°, sides 1, √3, 2) and a half-square (45°/45°, sides 1, 1, √2), with sizes `\tfrac12,\ \tfrac{\sqrt2}{2},\ \tfrac{\sqrt3}{2}`. Card 3: `Text("quadrant → sign, reference angle → size")`.

**Beat b**
Narration: Try one hundred fifty degrees. Quadrant two: x negative, y positive. One eighty minus one fifty is thirty. So x is negative root three, over two, and y is one half.

Visuals: Clear the cards. `theta` to 150. Quadrant II sign labels `(-,+)` appear. PURPLE reference arc labelled `30^\circ`, with `MathTex(r"180^\circ - 150^\circ = 30^\circ")`. Result on two lines: `MathTex(r"(\cos 150^\circ, \sin 150^\circ)")` / `MathTex(r"= \left(-\tfrac{\sqrt3}{2},\ \tfrac12\right)")`, boxed.

**Beat c**
Narration: Twelve standard angles, only three sizes. Every other value is a first quadrant value wearing a minus sign.

Visuals: Clear the right column. Place dots at all 12 standard angles (30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330), all grey. Then one family at a time: the 30°-family (30, 150, 210, 330) turns TEAL and pulses, `Indicate` runs on the 30° dot, and its table row fades in on the right (`30^\circ` | `|\cos| = \tfrac{\sqrt3}{2}` | `|\sin| = \tfrac12`); the family then dims. Repeat for the 45°-family (45, 135, 225, 315) in GOLD with row `\tfrac{\sqrt2}{2}`, `\tfrac{\sqrt2}{2}`, and the 60°-family (60, 120, 240, 300) in PINK with row `\tfrac12`, `\tfrac{\sqrt3}{2}`. No connecting lines.

**Beat d**
Narration: A memory hook: for thirty, forty five, sixty, the sines are root one, root two, root three, each over two. Cosines run backwards. If in doubt, redraw the triangle.

Visuals: Under the table, write `MathTex(r"\sin: \tfrac{\sqrt1}{2},\ \tfrac{\sqrt2}{2},\ \tfrac{\sqrt3}{2}")` with the three radicands highlighted in turn, then `MathTex(r"\cos: \tfrac{\sqrt3}{2},\ \tfrac{\sqrt2}{2},\ \tfrac{\sqrt1}{2}")` with a leftward arrow. On "redraw the triangle", the half-equilateral triangle from 7a reappears briefly.

## Scene 8 — Recap and next chapter (Mastery, 1.7)

**Beat a**
Narration: To recap. The point at angle theta is cosine theta, comma, sine theta. Coterminal angles share every value, and negating the angle flips only the sine. Quadrant gives the sign, reference angle the size. And sine squared plus cosine squared equals one is the circle's own equation.

Visuals: Clear everything except the circle, which shrinks to the left. Recap lines are written one at a time on the right: `MathTex(r"P(\theta) = (\cos\theta, \sin\theta)")`, `MathTex(r"\sin(\theta + 360^\circ n) = \sin\theta")`, `MathTex(r"\cos(-\theta) = \cos\theta,\ \sin(-\theta) = -\sin\theta")`, `Text("quadrant → sign · reference angle → size")`, `MathTex(r"\sin^2\theta + \cos^2\theta = 1")`. Each scaled to width 5.2; use a smaller font so all five fit.

**Beat b**
Narration: Next, chapter two plots all these values against the angle. The circle unwraps into a wave.

Visuals: Fade the recap. The dot rotates on the circle while a new `Axes(x_range=[0,360,90], y_range=[-1.2,1.2,1])` on the right traces `y = sin θ` with a horizontal dashed connector from the dot to the tracing tip (`TracedPath`). Run one full cycle, then end on `Text("Next: Chapter 2 · Trig Functions as Functions")`.

---

## Review log

| # | Review item | How it was handled |
|---|---|---|
| G1 | Lesson 1.1: radius-5 case (cos = x/r), "exactly the Chapter 0 ratio", degenerate 0°/90° | Scene 2 beat e now says dividing by 1 changes nothing and shows the radius-5 inset with (3, 4) and cos = 3/5 (quiz t1-1-q2). Beat g adds "As triangles these were degenerate. As points they are ordinary." |
| G2 | Lesson 1.2: 2π, add 360° for negatives, cos(−30°) = cos 330° | Scene 3 beat d: "three hundred sixty degrees, or two pi radians" plus `360° = 2π` on screen. Beat e: "For negative angles, add turns instead: cosine of negative thirty equals cosine of three thirty." |
| G3 | Lesson 1.3: Q II / Q IV rules and the sin 315° example | New Scene 4 beat d, a four-line rules card. New beat f works sin 315° = −√2/2 through the Q IV rule. |
| G4 | Lesson 1.4: rearranged forms and the 0.6 / 0.9 error check | New Scene 5 beat e covers both rearrangements and 0.36 + 0.81 = 1.17 ≠ 1, with the point drawn outside the circle. |
| G5 | Lesson 1.5: tan = sin/cos, cot = 1/tan, and the "and so on" periodicity | Scene 6 beat a now narrates and shows the sine/cosine forms. Beat d says "every half turn after that", and the table has `\ldots`. |
| G6 | Lesson 1.6: memory hook and "redraw the triangle" | New Scene 7 beat d. |
| G7 | Mastery: negative-angle symmetry missing from the recap | Scene 8 beat a adds a narration clause and a recap line. |
| 1 | "Root three over two" is ambiguous when heard; 7b coordinates run together | Narration now says "the square root of three, over two" the first time and "root three, over two" afterwards, with a pause comma before "over". 7b says "So x is negative root three, over two, and y is one half." The Scene 2 beat d coordinate phrase adds "comma". |
| 2 | Only the Q III reference-angle rule | 4c now shows and says 180° − 120° = 60°. The rules card (4d) and the sin 315° example (4f) were added. |
| 3 | Right column overcrowded in 4d | The triangle sketch was dropped (Scene 7 shows it). There is a three-line cap, earlier lines are faded out before the box, and a global `scale_to_fit_width(5.2)` rule was added. |
| 4 | Long equations overflow (1110 chain, cos² chain) | Both are split over two lines. A global right-column rule was added: cap at 5.2 wide and split chains with more than two `=`. The 2c definitions and 7b result are split the same way. |
| 5 | θ continuity 400 → 30 in 3e; 1080 as three turns; negative angles | `theta.set_value(30)` with no tween before the spin, and a turn counter was added. Narration: "Three full turns is one thousand eighty degrees..." A negative-angle clause was added. |
| 6 | θ continuity 225 → 60 in 6d; never reaches 90 | An explicit 1 s tween from 225 to 60, then 60 to 89.5, then `set_value(90)`, where the line is redrawn vertical and ORANGE "undefined" appears. |
| 7 | BLUE/RED used for broken points | All broken points are now ORANGE (a new warning colour in the global key), labelled "x = 0" and "y = 0". |
| 8 | "Break at ninety and two seventy" | Now says "ninety, two seventy, and every half turn after that", and the table has `\ldots`. |
| 9 | 5a narration/visual order; TransformMatchingTex mapping | Narration follows the visual order ("cosine squared theta plus sine squared theta ... usually written sine squared first"). The MathTex is split into isolated parts with an explicit `key_map` / `substrings_to_isolate`. |
| 10 | Rearranged forms missing | Added in Scene 5 beat e (see G4). |
| 11 | "Nothing was overturned" lost its reason; the radius ≠ 1 caveat | Added in Scene 2 beat e (see G1). The old beat e was split so the "no longer mentions a triangle" line moved to a new beat f. |
| 12 | Coterminal definition has no radian form | Added in 3d (see G2). |
| 13 | Pendulum measured from vertical; beat 1b overpacked | The pendulum is now a spoke 15° clockwise from the positive x direction. The triangle icons were dropped and the Crosses sit over the captions. |
| 14 | Recap notation θ ~ θ + 360n; awkward phrasing; negative-angle symmetry | Replaced with `\sin(\theta+360^\circ n)=\sin\theta`. Narration: "The point at angle theta is cosine theta, comma, sine theta." The symmetry line was added. |
| 15 | "Negative ninety lands at zero, negative one" | Now: "negative ninety degrees lands at the point zero, negative one, straight down." |
| 16 | Pacing / word count | Partly accepted. 4e (now 4g) was cut to two short sentences, and 6e, 7a, 1a/1b, 2b/2c, 3a/3b/3f, 4a, 5d, 6a/6b and 7c were tightened. The header now says about 6.5 minutes. The narration still grew, from 962 to about 1,100 words, because the coverage gaps each add required content: radius 5, 2π, the Q II and Q IV rules, sin 315°, the rearrangements, the 0.6/0.9 check, the memory hook and the negative-angle recap. At Samantha's default rate of about 170 to 180 wpm this is about 6.3 to 6.5 minutes, which is inside the 4 to 7 minute window. At 145 wpm it would be about 7.6 minutes, so if the render runs long, 2g (degenerate remark) and 6c are the first optional cuts. |
| 17 | 7c converging lines clutter | Replaced with one family at a time: colour and pulse, `Indicate` on the first-quadrant member, fade in that family's row, dim. No connecting lines. |
