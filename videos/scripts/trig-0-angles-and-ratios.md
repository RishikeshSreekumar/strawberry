# Explainer Script: trig-0-angles-and-ratios

- **Course:** Trigonometry
- **Chapter:** Chapter 0 · Angles and Ratios: Why Trigonometry Exists
- **Target runtime:** about 6.5 minutes (about 1000 spoken words at roughly 155 words per minute, plus the explicit pauses in Scenes 5 and 6)

**Learning goal.** The viewer should leave knowing why trigonometry works at all. Fixing one acute angle of a right triangle fixes its shape, so the scale factor cancels out of any ratio of sides and each angle determines its ratios. Those ratios are named sine, cosine and tangent, with tangent equal to sine over cosine, and the SOH CAH TOA mnemonic is only a label for them. They let you solve any right triangle from two facts besides the right angle (one of them a side), with inverse functions running the machine backwards. The exact values at 30, 45 and 60 degrees come from redrawing two triangles, not from memorizing a table. Finally, the viewer should see an angle as arc length per radius, the radian, understand why that unit has no units, and be able to convert in either direction. Angle in, ratio out.

**Global style notes (for the Manim build).** Dark background (`#1e1e1e`). Palette: opposite side = YELLOW, adjacent side = BLUE, hypotenuse = GREEN, angle theta arc = ORANGE, emphasis = RED. All math uses `MathTex`; plain labels use `Text` (font size 28 to 36). The right-angle mark is a small `RightAngle` or `Square` at the corner. Frame is the default 16:9 (x from about -7.1 to 7.1, y from -4 to 4). Fade out everything at each scene boundary unless the scene says otherwise. Any equation where individual terms are later struck through must be built with `MathTex(..., substrings_to_isolate=[...])` (or as explicit tex parts) so that `get_parts_by_tex` can locate each term; strike-throughs are red `Line` objects laid across each part's bounding box.

---

## Scene 1: The Unreachable Measurement (Lesson 0.1)

Scale for the whole scene: 1 unit = 3 m. The shadow runs 4 units (12 m) at 40 degrees, so the height is 4 tan 40° ≈ 3.356 units (≈ 10.07 m).

**Beat a**

Narration: There is a tree in front of you. How tall is it? You could climb it. But you cannot climb a mountain.

Visuals: Draw a ground line `Line([-6,-2.5,0],[6,-2.5,0])`. Draw a stylized tree: a brown `Rectangle(width=0.3, height=3.36)` trunk with its base centered at (2,-2.5), so its top is at (2,0.86). Add a green `Circle(radius=0.7, fill_opacity=0.8)` foliage centered at (2,0.4), so the trunk-top point (2,0.86,0) sits inside the upper foliage and serves as the treetop apex. Write a large `Text("?")` to the right of the trunk at (3,-0.8). In the upper left, fade in `Text("mountain")`, `Text("radius of the Earth")` one after another, each struck through with a red `Cross`.

**Beat b**

Narration: From the ground, you can measure the shadow, and the angle up to the treetop. Lengths out of reach are hard. Angles are easy.

Visuals: Fade out the crossed labels and the "?". Draw the shadow as a thick gray line from (2,-2.5) to (-2,-2.5), labeled `Text("shadow")` below it. Draw a GREEN `DashedLine` sunbeam from (-2,-2.5) to the treetop (2,0.86). Add an orange `Angle` arc at (-2,-2.5) between the ground and the beam, labeled `MathTex(r"\theta")`. `Circumscribe` the shadow, then the angle. Show the caption `Text("Angles are easy. Lengths out of reach are hard.")` at the top (y=3.3).

**Beat c**

Narration: Shadow and tree form a right triangle. Keep the angle fixed and grow the picture. Both lengths change. Their ratio does not budge.

Visuals: Fade out the tree; the dashed green sunbeam becomes the solid green hypotenuse AC of a clean right triangle A=(-2,-2.5), B=(2,-2.5), C=(2,0.86). Draw AB in blue, BC in yellow, right-angle mark at B. Attach live labels using a ValueTracker k: under AB, `DecimalNumber(12*k, num_decimal_places=1)` followed by `Text("m")`; right of BC, `DecimalNumber(10.07*k, num_decimal_places=2)` followed by `Text("m")`. At the bottom (y=-3.4), a readout `MathTex(r"\frac{\text{height}}{\text{shadow}} =")` followed by a `DecimalNumber` fixed at 0.839. Animate k from 1 to 1.3, then to 0.7, then back to 1, scaling the triangle about A (at k=1.3 the apex is at y≈1.86, inside the frame). The side readouts change; the ratio readout stays frozen. Flash the ratio readout in green.

**Beat d**

Narration: A twelve meter shadow at forty degrees gives a ratio of about zero point eight three nine. So the tree is about ten point one meters tall.

Visuals: With k back at 1, the shadow readout reads "12.0 m"; replace it with `MathTex(r"12\text{ m}")` and relabel the angle `MathTex(r"40^\circ")`. Remove the height readout. Below the triangle, write `MathTex(r"\text{height} = \text{shadow} \times (\text{a number fixed by the angle})")`, then `TransformMatchingTex` into `MathTex(r"\text{height} = 12 \times 0.839 \approx 10.1\text{ m}")`. Label BC `MathTex(r"10.1\text{ m}")` in yellow.

**Beat e**

Narration: Angle in, ratio out. That trade is the whole subject.

Visuals: Clear everything except a centered `Text("Angle in, ratio out.")` in large type, with an orange underline drawn by `Create`.

---

## Scene 2: Similar Triangles, the One Fact (Lesson 0.2)

Layout: triangles live in the left half (x from -6.5 to -0.5); all equations and tables live in the right half (x from 0.5 to 6.5).

**Beat a**

Narration: Why is the ratio fixed by the angle? Triangles with matching angles are similar: the same shape at different sizes.

Visuals: Draw three nested right triangles sharing the corner (-6,-2.5), each with a 30-degree angle there and the right angle on the ground. Horizontal legs: 1.25, 2.5 and 5 units, so the right-angle corners are at (-4.75,-2.5), (-3.5,-2.5), (-1,-2.5), and the apexes are at (-4.75,-1.78), (-3.5,-1.06), (-1,0.39). Draw them in progressively lighter green outlines. Orange angle arc at (-6,-2.5) labeled `MathTex(r"\theta")`. At the top (y=3.3), show `Text("Similar: same angles, same shape, different size", font_size=30)`.

**Beat b**

Narration: In a right triangle, fix one acute angle theta. The angles add to one hundred eighty degrees, so the third angle has no choice. Only the size is free.

Visuals: In the right half, centered at (3.5,1.5), show `MathTex(r"90^\circ + \theta + (\text{third angle}) = 180^\circ", font_size=34)` (about 5.5 units wide, fits in x from 0.75 to 6.25). Color "third angle" orange, then mark the top angle of each nested triangle with a matching orange arc.

**Beat c**

Narration: Scale the triangle by k. Every side is multiplied by k, and in a ratio the k on top cancels the k on the bottom. The lengths scaled. The ratio did not.

Visuals: Below the angle-sum equation, at (3.5,-0.5), write `MathTex(r"\frac{k \cdot \text{opposite}}{k \cdot \text{hypotenuse}} = \frac{\text{opposite}}{\text{hypotenuse}}", substrings_to_isolate=["k"])`. Color both `k` parts red via `get_parts_by_tex("k")`, then `Create` a red `Line` diagonally across each k part's bounding box. `Indicate` the right-hand side.

**Beat d**

Narration: So a bigger triangle does not have a bigger ratio. Opposite over hypotenuse: three over six is one half. Six over twelve, one half. Thirty over sixty, still one half.

Visuals: First fade out the nested triangles and both equations. Then build a three-row layout: in the left half, three small 30-60-90 triangles stacked vertically at y=2, 0, -2 (hypotenuses 1, 1.5, 2 units, left corners at x=-5); in the right half, aligned rows `MathTex(r"A:\ \tfrac{3}{6} = 0.5")`, `MathTex(r"B:\ \tfrac{6}{12} = 0.5")`, `MathTex(r"C:\ \tfrac{30}{60} = 0.5")` at the same y values, each fading in with its triangle. Box the column of 0.5 values with a green `SurroundingRectangle`. Flash `Text("bigger triangle, bigger ratio", font_size=28)` at the top with a red `Cross` over it.

---

## Scene 3: Naming the Ratios (Lesson 0.3)

**Beat a**

Narration: The hypotenuse is the long side, across from the right angle. The opposite side is across from theta. The adjacent side runs from theta to the right angle.

Visuals: Draw a right triangle with A=(-5,-2) (angle theta, orange arc), B=(0,-2) (right angle) and C=(0,1). Label AC in green `Text("hypotenuse")`, BC in yellow `Text("opposite")` and AB in blue `Text("adjacent")`, appearing in that order, each with an `Indicate` on its side.

**Beat b**

Narration: Switch to the other acute angle, and the two legs swap names. Only the hypotenuse keeps its identity.

Visuals: Move the orange angle arc from A to C. Swap the yellow and blue colors and the labels "opposite" and "adjacent" between AB and BC (`Swap` on the label pair plus a color animation on the sides). The hypotenuse label stays put and pulses once.

**Beat c**

Narration: Now the names. Sine of theta is opposite over hypotenuse. Cosine is adjacent over hypotenuse. Tangent is opposite over adjacent. These are labels stuck on ratios that already existed.

Visuals: Return the arc to A and restore the original labels. On the right (x≈4), stack three lines: `MathTex(r"\sin\theta = \frac{\text{opp}}{\text{hyp}}")`, `MathTex(r"\cos\theta = \frac{\text{adj}}{\text{hyp}}")`, `MathTex(r"\tan\theta = \frac{\text{opp}}{\text{adj}}")`, with each numerator and denominator colored to match its side.

**Beat d**

Narration: You may know this as soh-cah-toa. Treat it as a label, not as the reason. The reason is the cancellation you just saw. Letters alone fail on a triangle drawn sideways.

Visuals: Beneath the three definitions, write `Text("SOH CAH TOA: a label, not the reason", font_size=26)` in gray. Then rotate the triangle ABC together with its side labels by 90 degrees about its centroid (`Rotate`, angle=PI/2) so the legs are no longer horizontal and vertical. The side colors and labels ride along unchanged; `Indicate` the green hypotenuse. Rotate back.

**Beat e**

Narration: Push the angle toward zero: sine falls, cosine climbs toward one. Near ninety degrees they trade places, and tangent runs away. Sine and cosine never exceed one, because the hypotenuse is the longest side.

Visuals: Fade out the triangle, labels and the SOH CAH TOA caption, keeping the three definitions but moving them to the top right (x≈4, y from 3.2 to 1.6, font size 30). Draw a smaller live triangle with a hypotenuse of 3.5 units anchored at A=(-5,-2.5): B=(-5+3.5cosθ, -2.5), C=(-5+3.5cosθ, -2.5+3.5sinθ), rebuilt with `always_redraw` from a ValueTracker θ. Drive θ from 30 to 5 degrees, then to 85 degrees (at 85 degrees C is at about (-4.69,0.99); at 5 degrees B is at about (-1.51,-2.5)). Stacked at x=3 on the right (y = 0.6, -0.2, -1.0): three live readouts `MathTex(r"\sin\theta =")` + `DecimalNumber`, `MathTex(r"\cos\theta =")` + `DecimalNumber`, `MathTex(r"\tan\theta =")` + `DecimalNumber`. When tangent exceeds 10 its readout turns red. At the bottom right (3,-3), add `MathTex(r"\sin\theta \le 1,\ \cos\theta \le 1")` in green.

**Beat f**

Narration: Divide sine by cosine. The hypotenuses cancel, leaving opposite over adjacent. Tangent is sine over cosine. Your first identity.

Visuals: Clear the live triangle and readouts. Centered, show `MathTex(r"\frac{\sin\theta}{\cos\theta} = \frac{\text{opp}/\text{hyp}}{\text{adj}/\text{hyp}} = \frac{\text{opp}}{\text{adj}} = \tan\theta", substrings_to_isolate=[r"\text{hyp}"])`. Strike both `\text{hyp}` parts (from `get_parts_by_tex(r"\text{hyp}")`) with red `Line`s, then box the final `= \tan\theta` result with a `SurroundingRectangle`.

---

## Scene 4: Solving Right Triangles (Lesson 0.4)

**Beat a**

Narration: You need two facts besides the right angle, one of them a side. Pick your angle, label the sides, and choose the ratio linking what you know to what you want. Then check: the other angle is ninety minus yours, and Pythagoras confirms the last side.

Visuals: Show a four-step list with `Text` at the left: "1. Draw it", "2. Pick the angle, label opp / adj / hyp", "3. Choose the ratio", "4. Solve, then check". Steps 1 to 3 fade in with the second sentence; step 4 fades in with the third sentence, followed by two small sub-lines under it: `MathTex(r"\text{other angle} = 90^\circ - \theta")` and `MathTex(r"a^2 + b^2 = c^2")`.

**Beat b**

Narration: A four meter ladder leans at sixty five degrees. How high does it reach? The ladder is the hypotenuse, the height is opposite. That means sine: four times sine of sixty five degrees, about three point six three meters.

Visuals: Clear the list. Scale 1 unit = 1 m. Draw a wall as a vertical line at x=-1 from y=-2.5 to y=2, and the ground from x=-6 to x=-1 at y=-2.5. The ladder is a green line from (-2.69,-2.5) to (-1,1.13) (length 4 at 65 degrees). Orange arc at the foot labeled `MathTex(r"65^\circ")`, the ladder labeled "4 m", and a yellow brace along the wall labeled "h". On the right (x≈3.5), write `MathTex(r"\sin 65^\circ = \frac{h}{4} \Rightarrow h = 4\sin 65^\circ \approx 3.63\text{ m}")`.

**Beat c**

Narration: Suppose you only knew the foot is one point seven meters out. How long is the ladder? Adjacent over hypotenuse, so cosine. The unknown sits underneath, so divide: about four point zero two meters, which agrees with four.

Visuals: Fade out the height brace and the sine equation. Relabel: a blue brace on the ground from (-2.69,-2.5) to (-1,-2.5) labeled "1.7 m", and the ladder labeled "L". Write `MathTex(r"\cos 65^\circ = \frac{1.7}{L} \Rightarrow L = \frac{1.7}{\cos 65^\circ} \approx 4.02\text{ m}")`. Highlight L in the denominator in red, with a small tag `Text("unknown underneath: divide", font_size=24)`. Then show a gray `MathTex(r"4.02 \approx 4 \checkmark")` beneath.

**Beat d**

Narration: A ramp rises zero point eight meters over a five meter run. Opposite over adjacent is tangent: zero point one six. Which angle gives that ratio? Inverse tangent answers: about nine point one degrees.

Visuals: Clear. Draw the ramp to true scale with 1 m = 2 units: run from (-5,-2) to (5,-2) in blue labeled "5 m", rise from (5,-2) to (5,-0.4) in yellow labeled "0.8 m", slope from (-5,-2) to (5,-0.4) in green. Orange angle arc at (-5,-2) with radius 2 (so the thin 9-degree wedge is visible), labeled θ. Above the ramp, write `MathTex(r"\tan\theta = \frac{0.8}{5} = 0.16")`, then below it `MathTex(r"\theta = \tan^{-1}(0.16) \approx 9.1^\circ")`.

**Beat e**

Narration: That minus one is not a power. Inverse tangent means ratio in, angle out. It is not one over tangent.

Visuals: `Indicate` the superscript −1 in `\tan^{-1}` in red. Beside it, show `MathTex(r"\tan^{-1}x \ne \frac{1}{\tan x}")` with the ≠ in red, and a gray caption `Text("ratio in, angle out", font_size=26)` beneath it.

**Beat f**

Narration: Elevation and depression are measured from the horizontal. The two horizontal lines are parallel, so these are alternate angles, and they are equal. Twenty degrees down from the cliff is twenty degrees up from the boat.

Visuals: Clear. Draw the cliff as a filled gray `Polygon` with vertices (-6.5,-3), (-6.5,1.8), (-5,1.8), (-4.6,-3); the observer point is the cliff top (-5,1.8). Draw a sea line at y=-2.1 from x=-4.6 to x=6.5 in dark blue. Draw the boat as a small brown `Polygon` hull with vertices (4.6,-2.1), (5.4,-2.1), (5.6,-1.84), (4.4,-1.84), with the sighting point at (5,-1.84). Horizontal run 10, drop 10 tan 20° ≈ 3.64, so the angle is exactly 20 degrees. Add dashed white horizontal lines through the cliff top (from x=-5 to x=6) and through the boat (from x=-6 to x=5), and the line of sight from (-5,1.8) to (5,-1.84). Mark an orange 20-degree `Angle` below the top horizontal at the cliff, labeled "depression", and an orange 20-degree `Angle` above the bottom horizontal at the boat, labeled "elevation". On "parallel", `Indicate` both dashed horizontals; on "alternate angles", `Indicate` both arcs together; show `MathTex(r"20^\circ = 20^\circ")` at the top.

---

## Scene 5: Special Angles, Derived (Lesson 0.5)

**Beat a**

Narration: A few values are exact. Don't memorize the table. Redraw the triangle. Take an equilateral triangle of side two, and cut it down the middle.

Visuals: Show `Text("Don't memorize the table. Redraw the triangle.")` at the top. Draw an equilateral triangle with vertices (-2,-2), (2,-2) and (0, 2*sqrt(3)-2) ≈ (0,1.46), each side labeled "2". Mark all angles 60 degrees. Draw a dashed altitude from the apex to (0,-2).

**Beat b**

Narration: The cut makes a thirty degree angle and a base of one. Pythagoras gives the height: root of two squared minus one squared, which is root three. So the sides are one, root three, and two.

Visuals: Fade out the left half. Keep the right half: vertices (0,-2), (2,-2) and the apex (0,1.46). Label the base "1", the hypotenuse "2" and the height `MathTex(r"\sqrt{3}")`. Mark 30 degrees at the apex, 60 degrees at (2,-2) and a right angle at (0,-2). Show `MathTex(r"h = \sqrt{2^2 - 1^2} = \sqrt{3}")` on the right. `self.wait(1)`.

**Beat c**

Narration: From the thirty degree corner: sine is one half, cosine is root three over two, tangent is one over root three. From the sixty degree corner the legs swap: sine is root three over two, cosine is one half, tangent is root three.

Visuals: Highlight the apex angle, color the base (opposite the apex) yellow and the height blue, and write boxed `MathTex(r"\sin 30^\circ = \tfrac12,\ \cos 30^\circ = \tfrac{\sqrt3}{2},\ \tan 30^\circ = \tfrac{1}{\sqrt3}")`; `self.wait(1)`. Then move the orange arc to the 60-degree corner, swap the yellow and blue side colors, and write boxed `MathTex(r"\sin 60^\circ = \tfrac{\sqrt3}{2},\ \cos 60^\circ = \tfrac12,\ \tan 60^\circ = \sqrt3")`; `self.wait(1)`.

**Beat d**

Narration: For forty five degrees, cut a square of side one along its diagonal. The diagonal is root two. So sine and cosine of forty five are both one over root two, and tangent is exactly one.

Visuals: Clear. Draw a square with corners (-2,-2), (1,-2), (1,1), (-2,1) (side 3 units, labeled "1"), and its diagonal from (-2,-2) to (1,1). Fade out the upper-left triangle. Label the legs "1" and "1" and the diagonal `MathTex(r"\sqrt2")`, with 45-degree arcs at (-2,-2) and (1,1). Write boxed `MathTex(r"\sin 45^\circ = \cos 45^\circ = \tfrac{1}{\sqrt2} = \tfrac{\sqrt2}{2},\quad \tan 45^\circ = 1")`; `self.wait(1)`.

**Beat e**

Narration: Sanity check: sine grows with the angle. If your sine of sixty is smaller than your sine of thirty, you swapped sine and cosine.

Visuals: Show `MathTex(r"\sin 30^\circ < \sin 45^\circ < \sin 60^\circ")` with `MathTex(r"0.5 < 0.707 < 0.866")` beneath it, each value colored green. `self.wait(1)`.

---

## Scene 6: Degrees and Radians (Lesson 0.6)

**Beat a**

Narration: Three hundred sixty degrees is a Babylonian convention. A better unit comes from the circle itself.

Visuals: Draw a `Circle(radius=2)` centered at (-3,0) with twelve tick marks around it. Show `MathTex(r"360^\circ")` at the center and `Text("a convention")` below the circle in gray.

**Beat b**

Narration: Take a circle of radius r. Lay an arc of length r along its edge. The angle it makes at the center is one radian. In general, radians are arc length over radius.

Visuals: Remove the ticks and the 360 label. Draw a red radius from the center (-3,0) to (-1,0), labeled "r". Copy the red segment and `Transform` the copy from the `Line` into an `Arc(radius=2, start_angle=0, angle=1, arc_center=[-3,0,0])` (arc length = radius). Draw the second radius to the arc's end and add an orange angle mark labeled `Text("1 radian", font_size=26)`. Write `MathTex(r"\theta = \frac{s}{r}")` on the right at (3,1).

**Beat c**

Narration: A length over a length has no units, so a radian is a pure number. A full turn has arc two pi r, so it is two pi radians. That makes one hundred eighty degrees equal to pi radians.

Visuals: On the right, show `MathTex(r"\frac{\text{length}}{\text{length}} = \text{pure number}")`. Then `MathTex(r"\theta_{\text{full turn}} = \frac{2\pi r}{r} = 2\pi")` while the circle's full circumference is traced in red with `Create`. Then the boxed `MathTex(r"180^\circ = \pi \text{ radians}")`. `self.wait(1)`.

**Beat d**

Narration: So thirty degrees is pi over six, and ninety is pi over two. Degrees to radians: multiply by pi over one hundred eighty. To go back, multiply by one hundred eighty over pi. Pick whichever factor cancels the unit you have. One radian is about fifty seven degrees.

Visuals: Clear the right side and fade the circle to 30 percent opacity. Show a two-column aligned `MathTex` table with a "degrees" column at x=1 and a "radians" column at x=5: 30°/π/6, 45°/π/4, 60°/π/3, 90°/π/2. Draw a curved arrow above the table from the degrees column to the radians column, labeled `MathTex(r"\times \frac{\pi}{180}")`. On "to go back", draw a second curved arrow below the table from the radians column back to the degrees column, labeled `MathTex(r"\times \frac{180}{\pi}")`. On "cancels", show `MathTex(r"30^\circ \times \frac{\pi}{180^\circ} = \frac{\pi}{6}", substrings_to_isolate=[r"^\circ"])` and strike the two degree symbols in red. Add boxed `MathTex(r"1 \text{ rad} \approx 57.3^\circ")` at the bottom. `self.wait(1)`.

**Beat e**

Narration: In radians, arc length is r times theta, and sector area is one half r squared theta. In degrees, a conversion factor tags along forever. That is why calculus prefers radians.

Visuals: Clear the table; restore the circle to full opacity. Show `MathTex(r"s = r\theta,\qquad A_{\text{sector}} = \tfrac12 r^2\theta")` on the right, and shade a sector of the circle (angle 1.2 radians) in translucent orange. Add a small gray caption `Text("valid only in radians", font_size=24)`, and a faded `MathTex(r"\frac{\pi}{180}")` that drifts along beside the formulas and then fades out. `self.wait(1)`.

---

## Scene 7: Recap and What's Next (Chapter 0 Mastery)

**Beat a**

Narration: One acute angle fixes the shape. Scaling cancels, so ratios depend on the angle alone. Those ratios are sine, cosine and tangent, with tangent equal to sine over cosine. And an angle is arc length per radius.

Visuals: Title `Text("The chapter in four lines")` at the top. Show a numbered list of four lines, each fading in with its sentence: `Text("1. One acute angle fixes the shape")`, `MathTex(r"2.\ \frac{k\cdot a}{k\cdot b} = \frac{a}{b}")`, `MathTex(r"3.\ \tan\theta = \frac{\sin\theta}{\cos\theta}")`, `MathTex(r"4.\ \theta = \frac{s}{r}")`.

**Beat b**

Narration: Turn the triangle any way you like. The hypotenuse is still the side across from the right angle.

Visuals: Fade out the list. Draw a right triangle with vertices (-1.5,-1), (1.5,-1), (1.5,1): legs blue and yellow, hypotenuse green, right-angle mark at (1.5,-1). `Rotate` the whole triangle by PI about its centroid so the right angle ends up at the top left and the hypotenuse runs along the bottom-right. The hypotenuse stays green; draw a red dashed arrow from the right-angle mark across to the midpoint of the hypotenuse and `Indicate` the hypotenuse.

**Beat c**

Narration: So far every angle has lived between zero and ninety degrees. In Chapter One, we lift the triangle onto a circle, and that ceiling disappears.

Visuals: Fade out the rotated triangle. Draw axes through the origin and a unit circle `Circle(radius=2.5)` centered at the origin. Using a ValueTracker φ starting at 40 degrees, draw with `always_redraw` a triangle with vertices (0,0), (2.5cosφ, 0) and (2.5cosφ, 2.5sinφ): radius green, horizontal leg blue, vertical leg yellow, plus an orange arc from the positive x-axis to the radius. Animate φ from 40 to 150 degrees; as φ passes 90 degrees the horizontal leg flips to the left of the origin. End on `Text("Next: Chapter 1 · The Unit Circle")` at the top.

---

## Review log

Coverage gaps:

1. **0.3, SOH CAH TOA as label, not reason, and the sideways failure.** Added Scene 3 beat d with narration ("soh-cah-toa", hyphenated for TTS) that names it a label, gives the cancellation as the reason, and says letters alone fail when the triangle is drawn sideways. The visual rotates the triangle 90 degrees with labels attached to show it.
2. **0.4, inverse is not a reciprocal.** Added Scene 4 beat e, narrated: "That minus one is not a power... It is not one over tangent."
3. **0.4, step 4 "Solve, then check".** Scene 4 beat a now narrates "the other angle is ninety minus yours, and Pythagoras confirms the last side", with matching sub-lines on screen.
4. **0.4, why depression equals elevation.** Scene 4 beat f now narrates parallel horizontals and alternate angles, with the horizontals and the arcs indicated in sync.
5. **0.6, reverse conversion and the "cancel your unit" heuristic.** Scene 6 beat d now narrates multiplying by 180 over pi and picking the factor that cancels your unit. Added a reverse arrow labeled 180/π and a worked cancellation of the degree symbols.
6. **0.7, orientation misconception.** Scene 7 beat b is a new narrated beat. It rotates a triangle by 180 degrees and states that the hypotenuse is still the side across from the right angle, which matches the mastery question's framing.
7. **Optional items (six ratios, co-function, small-angle).** Not added. The narration is already near the 1000-word cap once the required fixes are in, and none of these is the targeted misconception of its lesson. The co-function idea is shown visually by the leg swap in Scene 3 beat b and Scene 5 beat c.

Issues:

1. **Major, Scene 4e geometry (now 4f).** Fixed. Cliff top at (-5,1.8) and boat at (5,-1.84): run 10, drop 3.64 = 10 tan 20° (checked: 3.6397), so the angle is truly 20 degrees. The cliff is a filled Polygon, the boat is a small hull polygon, and the alternate-angles narration is added.
2. **Major, Scene 4d ramp distortion.** Fixed. True-scale ramp, run 10 units and rise 1.6 units (atan(0.16) = 9.09°, checked). The inverse-not-reciprocal line is now narrated in its own beat (4e).
3. **Major, Scene 3c SOH CAH TOA not narrated.** Fixed in new beat 3d, using the suggested wording lightly trimmed, plus the sideways point from the content.
4. **Major, Scene 3d frame overflow (now 3e).** Fixed. The live triangle has hypotenuse 3.5 anchored at (-5,-2.5), so C peaks at y≈0.99 at 85°. Readouts are stacked at x=3, the inequality is at the bottom right, and the definitions are moved to the top right. I also moved the static triangle in 3a to A=(-5,-2), C=(0,1), which leaves the right half free for the definitions.
5. **Major, Scene 2 crowding.** Fixed. The nested triangles now have legs 1.25/2.5/5 from (-6,-2.5) to (-1,-2.5), with the apex at y≈0.39. Equations sit in x 0.5 to 6.5, and beat d fades out the nested triangles before the table and its small triangles come in.
6. **Minor, Scene 2d uses "sine" before it is defined.** Fixed. The narration now says "bigger ratio" and "Opposite over hypotenuse: three over six...", and the caption reads "bigger triangle, bigger ratio".
7. **Minor, Scene 1 coordinates and sunbeam color.** Fixed. The trunk has height 3.36, so its top is exactly (2,0.86) (4 tan 40° = 3.356, checked), and the foliage is centered just below. The sunbeam is green and turns into the green hypotenuse.
8. **Minor, Scene 1c label values.** Fixed. Scale is 1 unit = 3 m, and the readouts are DecimalNumber 12k m and 10.07k m (12 tan 40° = 10.07, checked), so at k=1 they match beat d. I capped k at 1.3 instead of 1.4 to keep the apex inside the frame.
9. **Minor, Scene 4a step 4 and "besides the right angle".** Fixed as suggested.
10. **Minor, Scene 4c odd reframing.** Fixed with "Suppose you only knew the foot is one point seven meters out..." and a cross-check against 4 (1.7 / cos 65° = 4.0225, checked). I dropped the spoken formula to pay for the words; it stays on screen.
11. **Minor, Scene 6d reverse direction.** Fixed. See coverage gap 5.
12. **Minor, Scene 7b unnarrated rotation and vague circle geometry.** Fixed. The rotation is now its own narrated beat (7b), and the circle beat (7c) uses the exact geometry suggested: radius 2.5, vertices (0,0), (2.5cosφ,0), (2.5cosφ,2.5sinφ), with φ swept from 40 to 150 degrees.
13. **Minor, global pacing.** Fixed. Cut "ship on the horizon", shortened the Babylonian aside to "Three hundred sixty degrees is a Babylonian convention", and cut Scene 3's identity line to "Your first identity." I tightened Scenes 2c, 3c, 4b, 5c, 5d and 6c to make room for the additions, and added `self.wait(1)` after each boxed result in Scenes 5 and 6. The narration is 1000 words, at the cap.
14. **Minor, strike-through feasibility.** Fixed. Scene 2c uses `substrings_to_isolate=["k"]`, Scene 3f uses `substrings_to_isolate=[r"\text{hyp}"]`, and Scene 6d uses `[r"^\circ"]`, all with `get_parts_by_tex` and red `Line` strikes. A global style note records the rule.

Math verified against the content file: 12 × 0.839 ≈ 10.1 m; 4 sin 65° ≈ 3.63 m; 1.7 / cos 65° ≈ 4.02 m; tan⁻¹(0.16) ≈ 9.1°; the 30-60-90 and 45-45-90 values; 180° = π rad; 1 rad ≈ 57.3°.
