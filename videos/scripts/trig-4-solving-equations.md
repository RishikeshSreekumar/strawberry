# Trigonometry · Chapter 4 · Solving Trigonometric Equations

- **Course:** Trigonometry
- **Chapter:** Chapter 4 · Solving Trigonometric Equations (id: `trig-4-solving-equations`)
- **Target runtime:** about 7 minutes (roughly 1230 spoken words, mostly short spoken math terms, paced with short waits between transforms)

**Learning goal.** This chapter runs trigonometry backwards: from an output value to every angle that produces it. By the end, the viewer should treat a calculator's single answer as one solution among infinitely many, and should use the chapter's two-step recipe: find the reference angle, place it in every quadrant the sign allows, then add whole periods (two pi for sine and cosine, pi for tangent). They should know the difference between an interval solution and a general solution, and reduce mixed equations to one trig function of one angle by factoring (never dividing) and by Pythagorean substitution, throwing out any root outside negative one to one. They should widen the interval before solving for an inner angle like 2x, and check candidates after squaring or where tangent or secant are undefined.

**Global style.** Dark background (`#1e1e2e`). Sine curve in BLUE, cosine in GREEN, horizontal "level" lines in YELLOW, solution dots in ORANGE, warnings in RED, valid checks in GREEN. MathTex for all math. Standard wave axes, reused throughout: `Axes(x_range=[-0.5, 6.8, 1], y_range=[-1.6, 1.6, 0.5], x_length=11, y_length=4.5)`, with x tick labels at 0, pi over 2, pi, 3 pi over 2, 2 pi drawn as MathTex (`0, \frac{\pi}{2}, \pi, \frac{3\pi}{2}, 2\pi`). The interval [0, 2π) is shaded as a faint band (`Rectangle` from x = 0 to x = 2π, opacity 0.08).

**Transform convention.** Every algebra chain that uses `TransformMatchingTex` builds each MathTex with `substrings_to_isolate=[r"\sin x", r"\cos x", r"\tan x", "=", "0"]` (plus `r"\sin^2 x"`, `r"\cos^2 x"` where they occur), so matching pieces glide rather than cross-fade. Pace each transform to one spoken clause, with `self.wait(1)` between transforms unless a beat says otherwise.

---

## Scene 1: Cold open, one answer is not the answer (Lesson 4.1)

**Beat a**
Narration: Solve sine of x equals one half. A calculator says pi over six. That is one solution. It is not the solution.

Visuals: Center `MathTex(r"\sin x = \frac{1}{2}")` writes in. A simple calculator-style `RoundedRectangle` slides in from the right showing `MathTex(r"\sin^{-1}(0.5) = \frac{\pi}{6}")`. Then a small `MathTex(r"\text{one solution}")` appears under it, and `MathTex(r"\neq \text{the solution}")` appears beside it in RED. Fade the calculator box out; move the equation to the top-left corner.

**Beat b**
Narration: Draw the line y equals one half across the sine wave. Every crossing is a solution, and there are infinitely many.

Visuals: For this beat only, use wide axes `Axes(x_range=[-7, 16, 1], y_range=[-1.6, 1.6, 0.5], x_length=12.5, y_length=4)`. Plot `y = sin(x)` in BLUE with `Create`. Draw a YELLOW `DashedLine` at y = 0.5 across the full width. Place ORANGE `Dot`s at x = π/6 + 2πn and 5π/6 + 2πn for n = -1, 0, 1, 2 (x ≈ -5.76, -3.67, 0.52, 2.62, 6.81, 8.90, 13.09, 15.18), keeping only those with -7 ≤ x ≤ 16 (all eight pass), via `LaggedStart(..., lag_ratio=0.15)`. Add `Tex(r"\dots")` ellipses just outside the first and last dots (left of x = -7, right of x = 16).

**Beat c**
Narration: Raise the line toward one, and each pair of crossings slides together, merging at the peak. Push past one, and they vanish.

Visuals: Transition back to the standard wave axes (0 to 2π window), sine in BLUE, the interval band shaded. Use a `ValueTracker` `level` starting at 0.5. The YELLOW line is `always_redraw` from `level`. The two ORANGE dots are `always_redraw` with `a = np.arcsin(min(level, 1.0))`, placed at a and π − a, and with `fill_opacity = 1 if level <= 1 else 0` (so no invalid arcsin is ever evaluated). A `DecimalNumber` label tracks the level at the right end of the line. Animate level to 0.9, then 1.0 (dots meet at π/2; play a separate `Flash` at the point (π/2, 1)). Then remove the dot updaters and `FadeOut` the dots before animating level to 1.2 (line now floats above the whole wave). Return level to 0.5.

---

## Scene 2: The two-step recipe, interval versus general (Lesson 4.1)

**Beat a**
Narration: The recipe. First, find the reference angle from the size of the value. Second, place it in every quadrant the sign allows, then add whole periods.

Visuals: Clear the graph. Show a titled box "The two-step recipe" with two lines: `MathTex(r"1.\ x_{\text{ref}} = \sin^{-1}|v|")` and `Tex(r"2. Place it in every quadrant the sign allows, then add whole periods")`, scaled to fit width 12. Highlight each line with a `SurroundingRectangle` as it is read.

**Beat b**
Narration: For sine x equals one half, the reference angle is pi over six. Sine is positive in quadrants one and two, so x is pi over six, or pi minus that, which is five pi over six.

Visuals: Draw a unit circle of radius 1.6 centered at (-4.5, 0), with quadrant labels I to IV. Draw a radius to angle π/6 (ORANGE) and its partner at 5π/6 (ORANGE), plus a YELLOW horizontal chord at height 0.5 × radius joining their endpoints. Shade quadrants I and II lightly GREEN (sine positive). On the right, `MathTex(r"x = \frac{\pi}{6} \quad\text{or}\quad x = \pi - \frac{\pi}{6} = \frac{5\pi}{6}").scale(0.75).next_to(circle, RIGHT, buff=0.6).shift(UP * 1)`.

**Beat c**
Narration: Sine repeats every two pi, so add two pi times n, for any whole number n, positive, negative, or zero. That is the general solution.

Visuals: Below the first line, two lines scaled 0.75 and left-aligned to it (`.align_to(first_line, LEFT)`): `MathTex(r"x = \frac{\pi}{6} + 2\pi n")` and `MathTex(r"x = \frac{5\pi}{6} + 2\pi n, \qquad n \in \mathbb{Z}")`. Animate the π/6 radius spinning one full extra turn (`Rotate` by 2π about the circle center) and landing back in place; a small `MathTex(r"+2\pi")` pops beside it.

**Beat d**
Narration: If the question gives a range, like zero to two pi, it wants a finite list: the interval solution. With no range, it wants the general solution.

Visuals: Clear the circle. Two side-by-side cards. Left card titled "Interval solution", with `MathTex(r"0 \le x < 2\pi")` and `MathTex(r"\left\{\frac{\pi}{6}, \frac{5\pi}{6}\right\}")`. Right card titled "General solution", with `MathTex(r"\frac{\pi}{6} + 2\pi n,\ \frac{5\pi}{6} + 2\pi n")`.

**Beat e**
Narration: For sine, the partner is pi minus x. For cosine, it is negative x, the same angle as two pi minus x. Take cosine x equals negative square root of two, over two. The reference angle is pi over four, and cosine is negative in quadrants two and three. So x is three pi over four, or five pi over four.

Visuals: Replace the cards with a table (`VGroup` of rows, arranged DOWN, scaled 0.8, left side of frame): row 1 `\sin x = v:\ \ \pi - x`, row 2 `\cos x = v:\ \ -x \text{ or } 2\pi - x`, row 3 `\tan x = v:\ \ x + \pi n` (row 3 dimmed to 0.3 for now). Beside rows 1 and 2, small unit circle icons (radius 0.5): sine shows two radii mirrored left-right (same height); cosine shows two radii mirrored top-bottom (same horizontal position). While the cosine example is read, highlight row 2 and write beneath it `MathTex(r"\cos x = -\tfrac{\sqrt2}{2}:\ \ x = \tfrac{3\pi}{4},\ \tfrac{5\pi}{4}")`; on the cosine icon, the two radii rotate to 3π/4 and 5π/4 (quadrants II and III shaded lightly RED, both radii ending on a vertical YELLOW line at x = −0.707 × radius).

**Beat f**
Narration: Written generally, that is plus or minus three pi over four, plus two pi n. Tangent has one solution per period, and its period is pi. So tangent x equals one gives pi over four, plus pi n.

Visuals: Under the cosine example, add `MathTex(r"\text{general: } x = \pm\tfrac{3\pi}{4} + 2\pi n")`. Undim row 3 and add its icon: two radii pointing in opposite directions (half a turn apart, at π/4 and 5π/4). Beneath row 3, write `MathTex(r"\tan x = 1:\ \ x = \tfrac{\pi}{4} + \pi n")`, with the 5π/4 radius labeled `+\pi`.

**Beat g**
Narration: Now a negative value. Two sine x plus the square root of three equals zero, so sine x is negative root three over two. The reference angle is pi over three, placed in quadrants three and four: four pi over three and five pi over three.

Visuals: Clear the table. `MathTex(r"2\sin x + \sqrt3 = 0")` → `TransformMatchingTex` → `MathTex(r"\sin x = -\frac{\sqrt3}{2}")`. Unit circle (radius 1.6, center (-4.5, 0)) with quadrants III and IV shaded lightly RED and a YELLOW chord at height −0.866 × radius. Label `x_{\text{ref}} = \frac{\pi}{3}`. Radii appear at 4π/3 (`\pi + \frac{\pi}{3}`) and 5π/3 (`2\pi - \frac{\pi}{3}`). Result on the right: `MathTex(r"x = \frac{4\pi}{3},\ \frac{5\pi}{3}")` boxed in GREEN.

---

## Scene 3: Reduce to one function (Lesson 4.2)

**Beat a**
Narration: Real equations arrive mixed. The strategy never changes. Use identities and algebra to reach one trig function, of one angle.

Visuals: Clear. Title "Reduce to one function". Three messy equations float in: `2\sin x\cos x = \sin x`, `2\cos^2 x + \cos x - 1 = 0`, `2\sin^2 x + 3\cos x = 3`. An arrow points from them to a clean `MathTex(r"\text{one function} = \text{number}")`.

**Beat b**
Narration: Pattern one. Solve two sine x cosine x equals sine x. It is tempting to divide by sine x. Don't. That throws away every solution where sine x is zero.

Visuals: Keep only `MathTex(r"2\sin x\cos x = \sin x")` at top. Animate a fraction bar "÷ sin x" sliding under both sides, then a RED `Cross` over it. A RED warning box: "Never divide by something that can be zero."

**Beat c**
Narration: Instead, move everything to one side and factor. Sine x, times the quantity two cosine x minus one, equals zero. Sine x equals zero gives zero and pi. Cosine x equals one half gives pi over three and five pi over three. Four solutions. Dividing finds only two.

Visuals: `TransformMatchingTex` (isolated substrings, see Transform convention) from `2\sin x\cos x = \sin x` to `2\sin x\cos x - \sin x = 0` to `\sin x\,(2\cos x - 1) = 0`, with the bracket `(2\cos x - 1)` briefly underlined as "the quantity" is spoken. Split into two branches with arrows: left `\sin x = 0 \Rightarrow x = 0,\ \pi`, right `\cos x = \frac{1}{2} \Rightarrow x = \frac{\pi}{3},\ \frac{5\pi}{3}`. Count "4" in GREEN; beside it a greyed "2" crossed out with label "if you divide".

**Beat d**
Narration: Pattern two, a quadratic in disguise. Two cosine squared x plus cosine x minus one equals zero. Let u equal cosine x, and factor. Cosine x is one half, or negative one. Both lie between negative one and one, so both count: pi over three, pi, and five pi over three.

Visuals: Clear. Write `2\cos^2 x + \cos x - 1 = 0`, then substitution label `u = \cos x`, then `2u^2 + u - 1 = 0`, then `(2u - 1)(u + 1) = 0`, then `\cos x = \tfrac12 \ \text{or}\ \cos x = -1`, with a GREEN check beside each and a small `MathTex(r"-1 \le \cos x \le 1")` badge. Then `x = \frac{\pi}{3},\ \pi,\ \frac{5\pi}{3}`. Scale this algebra column to 0.6 and move it to the left edge (`to_edge(LEFT, buff=0.4)`). On the right, axes `Axes(x_range=[-0.5, 6.8, 1], y_range=[-1.6, 2.4, 1], x_length=7.5, y_length=4).move_to(RIGHT * 2.8)` with curve `y = 2cos²x + cos x − 1` in GREEN and the YELLOW line y = 0. ORANGE dots appear at π/3, π, 5π/3 where the curve meets the line. The dot at π pulses (`Indicate`) to show the curve only touches the line there (a local maximum of 0), rather than crossing.

**Beat e**
Narration: A root outside that range is thrown out. Cosine squared x minus cosine x minus two factors, giving cosine x equals two, which is impossible, or negative one. So x is pi.

Visuals: Clear the graph. `MathTex(r"\cos^2 x - \cos x - 2 = 0")` → `(\cos x - 2)(\cos x + 1) = 0`. Two branches: left `\cos x = 2` with a RED cross and a number line from −2.5 to 2.5 showing the GREEN allowed band [−1, 1] and a RED dot at 2 outside it; right `\cos x = -1 \Rightarrow x = \pi` with a GREEN check.

**Beat f**
Narration: Pattern three. Two sine squared x plus three cosine x equals three. Replace sine squared with one minus cosine squared, and it becomes a quadratic in cosine. It factors: cosine x equals one half, or cosine x equals one. So x is zero, pi over three, and five pi over three. A square is a Pythagorean invitation.

Visuals: Clear. `2\sin^2 x + 3\cos x = 3`, with `\sin^2 x` highlighted in YELLOW. An arrow labeled `\sin^2 x = 1 - \cos^2 x` feeds a `TransformMatchingTex` to `2(1 - \cos^2 x) + 3\cos x = 3`, then to `2\cos^2 x - 3\cos x + 1 = 0`, then to `(2\cos x - 1)(\cos x - 1) = 0`, then to `\cos x = \tfrac12 \ \text{or}\ \cos x = 1`, then to `x = 0,\ \frac{\pi}{3},\ \frac{5\pi}{3}`. One transform per spoken clause, `self.wait(1)` between. Finish with a boxed caption `Tex("A square is a Pythagorean invitation.")`.

---

## Scene 4: Multiple and fractional angles (Lesson 4.3)

**Beat a**
Narration: Now solve sine of two x equals the square root of three, over two, for x from zero to two pi. The trap is to solve for two x, halve, and stop. That finds only two of the four solutions.

Visuals: Clear. `MathTex(r"\sin 2x = \frac{\sqrt{3}}{2},\quad 0 \le x < 2\pi")`. Below, a greyed-out "trap" path: `2x = \frac{\pi}{3}, \frac{2\pi}{3} \Rightarrow x = \frac{\pi}{6}, \frac{\pi}{3}`, then a RED label "2 of 4".

**Beat b**
Narration: The fix. Let u equal two x. As x runs from zero to two pi, u runs from zero to four pi. Twice as long, so twice as many solutions. Widen the interval before you solve.

Visuals: Two `NumberLine`s stacked. Top: x from 0 to 2π (length 5), at y = −1.5. Bottom: u = 2x from 0 to 4π (length 10), at y = 0.5, with a stretch animation (u line grows from length 5 to 10 while its end label transforms from `2\pi` to `4\pi`). Caption `MathTex(r"u = 2x,\quad u \in [0, 4\pi)")` above.

**Beat c1**
Narration: The reference angle is pi over three. Sine is positive in quadrants one and two, so u is pi over three and two pi over three. The interval covers two turns, so add two pi to each: seven pi over three and eight pi over three.

Visuals: Write `u = \frac{\pi}{3},\ \frac{2\pi}{3}` and place two ORANGE dots on the u line. Then a curved `CurvedArrow` from π/3 to 7π/3 labeled `+2\pi`, and another from 2π/3 to 8π/3; the new dots appear at their heads and the line extends to `u = \frac{\pi}{3},\ \frac{2\pi}{3},\ \frac{7\pi}{3},\ \frac{8\pi}{3}`. `self.wait(1.5)` at the end of the beat.

**Beat c2**
Narration: Only now divide by two. x equals pi over six, pi over three, seven pi over six, and four pi over three.

Visuals: A "÷ 2" label appears between the lines. Four `Arrow`s map each u dot straight down to its x position on the top-to-bottom stack (π/6, π/3, 7π/6, 4π/3 on the x line), one per value as it is spoken; ORANGE dots land on the x line. Write `x = \frac{\pi}{6},\ \frac{\pi}{3},\ \frac{7\pi}{6},\ \frac{4\pi}{3}` in GREEN.

**Beat d**
Narration: The graph agrees. Sine of two x completes two cycles, so it meets the line twice as often. In general, sine or cosine of b times x has about two b solutions. Tangent of b times x has b.

Visuals: Clear number lines. Standard wave axes with `y = sin(2x)` in BLUE, YELLOW line at y = 0.866, four ORANGE dots at π/6, π/3, 7π/6, 4π/3. Briefly overlay a faint `y = sin(x)` (opacity 0.3) with its two crossings for comparison, then fade it. Show counting rule: `MathTex(r"\sin bx,\ \cos bx:\ 2b \qquad \tan bx:\ b")`.

**Beat e**
Narration: Fractions work in reverse. Half a cycle means fewer solutions: often just one, and sometimes none.

Visuals: On the standard axes, plot `y = sin(x/2)` in BLUE (one hump from 0 to 2π, never below 0 inside the band) and `y = cos(x/2)` in GREEN (falls from 1 to −1 once). Draw a YELLOW line at y = −0.5: it meets the GREEN curve once (ORANGE dot at x = 4π/3) and misses the BLUE hump entirely (RED label "none" by the hump). Add to the counting rule, in small type, `MathTex(r"b = \tfrac12:\ \text{half a cycle, so one solution or none, typically}")`.

**Beat f**
Narration: Take cosine of x over two equals one half. Let u equal x over two. Now u only runs from zero to pi. So u is pi over three, and x is two pi over three. The usual second answer, five pi over three, is out of reach.

Visuals: Replace the graph with `\cos\frac{x}{2} = \frac{1}{2}` and caption `u = \frac{x}{2},\ u \in [0, \pi)`. A u number line compresses from [0, 2π) to [0, π) (end label becomes `\pi`); the removed part stays as a dashed GREY continuation out to 2π. ORANGE dot at π/3 on the solid part; a GREY dot at 5π/3 on the dashed continuation, then a RED `Cross` over it and label "out of range". Then `x = \frac{2\pi}{3}` in GREEN.

**Beat g**
Narration: So the order is: substitute, widen or narrow the interval, solve fully, then convert back. Halving too early loses marks, because the answer looks complete.

Visuals: A four-step flow with arrows: "Substitute" → "Widen / narrow interval" → "Solve fully" → "Convert back". Each box lights up in sequence. RED sticky note under step 4: "Halving too early looks complete."

---

## Scene 5: Inverses and lost solutions (Lesson 4.4)

**Beat a**
Narration: The calculator's inverse sine is honest but narrow. It returns one angle from a restricted range. For sine x equals zero point six, it gives zero point six four. It leaves out pi minus that, and every two pi repeat.

Visuals: Clear. `MathTable` with headers "Equation | Calculator returns | What it omits", scaled to width 12.5: row 1 `\sin x = 0.6 | 0.6435\ (\text{Q I}) | \pi - 0.6435,\ +2\pi n`; row 2 `\sin x = -0.6 | -0.6435\ (\text{Q IV}) | \pi + 0.6435`; row 3 `\cos x = -0.5 | 2.0944\ (\text{Q II}) | 2\pi - 2.0944`; row 4 `\tan x = -2 | -1.107\ (\text{Q IV}) | +\pi n`. Row 1 fades in and is highlighted while it is narrated; rows 2 to 4 then fade in with `self.wait(2)` after each. The third column is in ORANGE.

**Beat b**
Narration: Negative values are where people slip. For sine x equals negative zero point six, the calculator gives minus zero point six four. Don't just drop the minus sign, and don't keep a negative angle. Place the reference angle, zero point six four, in quadrants three and four: pi plus zero point six four, about three point seven nine, and two pi minus zero point six four, about five point six four.

Visuals: Highlight row 2 with a RED `SurroundingRectangle`. Fade the table and draw a unit circle (radius 1.6, center (-4, 0)) with quadrants III and IV shaded lightly RED. Draw two radii at angle π + 0.6435 and 2π − 0.6435, both ending on the same YELLOW horizontal chord at height −0.6 × radius. Label the reference angle arc `0.6435` in each quadrant. On the right, show the calculator output `\sin^{-1}(-0.6) \approx -0.6435`, then two RED-crossed slips: `\pi - 0.6435 \approx 2.50\ (\text{Q II, wrong sign})` and `-0.6435\ (\text{not in } [0, 2\pi))`. Then GREEN results: `\pi + 0.6435 \approx 3.79` and `2\pi - 0.6435 \approx 5.64`.

**Beat c**
Narration: Squaring goes wrong the other way. It creates extra answers. Solve sine x equals cosine x minus one by squaring both sides. Replace sine squared with one minus cosine squared, tidy up, and factor. The candidates are zero, pi over two, and three pi over two.

Visuals: Clear. `\sin x = \cos x - 1`, then "square both sides" arrow to `\sin^2 x = \cos^2 x - 2\cos x + 1`, then `1 - \cos^2 x = \cos^2 x - 2\cos x + 1`, then `2\cos^2 x - 2\cos x = 0`, then `2\cos x(\cos x - 1) = 0`, then candidates `x = 0,\ \frac{\pi}{2},\ \frac{3\pi}{2}` in a YELLOW box labeled "candidates". Each line appears about 1.2 s after the previous one (`TransformMatchingTex` per Transform convention).

**Beat d**
Narration: Now test each one in the original. At zero, both sides are zero. Valid. At pi over two, one versus negative one. Extraneous. At three pi over two, both sides are negative one. Valid.

Visuals: Table with headers `x | \sin x | \cos x - 1 | \text{Verdict}`. Rows fill in one at a time: `0 | 0 | 0 | valid` (GREEN check), `\frac{\pi}{2} | 1 | -1 | extraneous` (RED cross, row struck through), `\frac{3\pi}{2} | -1 | -1 | valid` (GREEN check).

**Beat e**
Narration: Why? Squaring erases signs. p equals q, and p equals negative q, both become p squared equals q squared. So whenever you square, checking is part of the method.

Visuals: `MathTex(r"p = q")` and `MathTex(r"p = -q")` on two lines, both with arrows merging into one `MathTex(r"p^2 = q^2")`. Caption: "Square → always check."

**Beat f**
Narration: Domain matters too. Tangent x times sine x equals tangent x factors to tangent x, times the quantity sine x minus one, equals zero. Tangent x equals zero gives zero and pi. Sine x equals one gives pi over two, but tangent does not exist there, so it goes. With tangent or secant, drop any candidate where cosine x is zero.

Visuals: `MathTex(r"\tan x \sin x = \tan x")` → `\tan x \sin x - \tan x = 0` → `\tan x\,(\sin x - 1) = 0`. Two branches: left `\tan x = 0 \Rightarrow x = 0,\ \pi` (GREEN checks); right `\sin x = 1 \Rightarrow x = \frac{\pi}{2}`, then beneath it `\cos\frac{\pi}{2} = 0 \Rightarrow \tan\frac{\pi}{2}\ \text{undefined}` in RED, and a RED strike through `\frac{\pi}{2}`. Final: `x = 0,\ \pi` boxed GREEN. Footer rule: `Tex(r"$\tan$ or $\sec$ in the equation: drop any $x$ with $\cos x = 0$")`.

---

## Scene 6: Recap and next chapter (Lesson 4.5, Chapter 4 Mastery)

**Beat a**
Narration: Here is the chapter in four lines. One. Solutions repeat: find the reference angle, use every quadrant the sign allows, then add whole periods. Two. Reduce to one function of one angle. Factor, never divide.

Visuals: Clear. Title "The chapter in four lines". Line 1 appears with a tiny sine-wave icon with multiple ORANGE crossings. Line 2 appears with `\sin x\,(2\cos x - 1) = 0` as its icon.

**Beat b**
Narration: Three. For an inner angle like b times x, widen the interval by the factor b before solving. Four. Inverses return one angle, and squaring invents extra ones. Check. Before each problem, ask: how many solutions should I expect, and over what interval?

Visuals: Line 3 appears with the stretched number line icon `[0, 2\pi) \to [0, 4\pi)`. Line 4 appears with a small GREEN check and RED cross pair. Then all four lines dim and the question "How many solutions? Over what interval?" appears centered in YELLOW.

**Beat c**
Narration: Next, in Chapter 5, we return to triangles, this time without a right angle. Then we hand the course over to calculus, with a limit that only works because you measured in radians.

Visuals: Fade out. Draw an oblique triangle with vertices (-5, -1.5), (0.5, -1.5), (-1.5, 1.8), with side labels a, b, c and angle labels A, B, C. At `RIGHT * 4`, `MathTex(r"\lim_{x \to 0} \frac{\sin x}{x} = 1").scale(0.9)` fades in. Title card at top: "Next: Chapter 5 · Any Triangle, and the Bridge to Calculus".

---

## Review log

Coverage gaps
- **Cosine recipe never worked (practice quiz, mastery q5).** Handled: new Scene 2 beat e works cos x = −√2/2 → 3π/4, 5π/4 (quadrants II and III), with the "negative x, same as two pi minus x" partner stated aloud; Scene 2 beat f gives the ± general form (± 3π/4 + 2πn), matching mastery q5's shape.
- **Tangent general solution never shown.** Handled: Scene 2 beat f works tan x = 1 → π/4 + πn (the chapter's own quiz example).
- **No negative exact-value example (mastery q1).** Handled: new Scene 2 beat g works 2 sin x + √3 = 0 → 4π/3, 5π/3, exactly mastery q1.
- **Rejecting roots outside [−1, 1] (mastery q4).** Handled: Scene 3 beat d says both roots lie in [−1, 1] so both are allowed; new Scene 3 beat e works mastery q4, cos²x − cos x − 2 = 0 → (cos x − 2)(cos x + 1) = 0, cos x = 2 thrown out, x = π.
- **Fractional-b counting statement.** Handled: new Scene 4 beat e states the callout's "half a cycle, fewer solutions, often one, sometimes none", before the cos(x/2) example (now beat f). Caveat checked: on [0, 2π), sin(x/2) = v has two solutions for 0 < v < 1 (for example, v = 1/2 gives π/3 and 5π/3), so the chapter's "most values give a single solution" holds for cos(x/2) but not for sin(x/2) with positive v. To stay accurate, the narration says "often just one, and sometimes none". The visual uses y = −0.5, where cos(x/2) has exactly one solution (4π/3) and sin(x/2) has none, and it avoids claiming that a positive sin(x/2) value has only one.

Major issues
- **Scene 5f unmotivated sec x = 2 tan x.** Agreed and verified: multiplying by cos x gives sin x = 1/2, so π/2 never arises from the algebra. Replaced with tan x sin x = tan x → tan x (sin x − 1) = 0 → 0, π valid; π/2 rejected since tan is undefined. The narration now reads the equation on screen.
- **Scene 5b "pi minus x carelessly" misleading; no final answers.** Reworded as suggested (don't drop the minus sign, don't leave a negative angle). It now states π + 0.64 ≈ 3.79 and 2π − 0.64 ≈ 5.64 aloud and on screen, with the two slips shown crossed out. Note: the chapter's own callout uses the "π − (−0.6435)" phrasing, but the reworded version keeps its message (use the reference angle, place it in III and IV).
- **Scene 1b dot overflow.** Verified: π/6 + 4π ≈ 13.09 and 5π/6 + 4π ≈ 15.18 overflow [−7, 13]. Widened to x_range [−7, 16] with x_length 12.5, and filtered to the range. All eight dots fit, and the ellipses sit outside the last dots.
- **Scene 1c arcsin(1.2) crash.** Dots now use arcsin(min(level, 1)) with opacity gated on level ≤ 1. Their updaters are removed and the dots faded out before the level goes past 1. The flash at level 1 is a separate animation.
- **Scene 2b–c overcrowding.** The circle is now radius 1.6 at (−4.5, 0). Both MathTex are scaled to 0.75, anchored with next_to(circle, RIGHT, buff=0.6), and the general solution is split over two lines.
- **Scene 2c undefined n.** The narration now says "where n is any whole number, positive, negative, or zero."

Minor issues
- **3d "crosses" at the tangency point.** Changed to "meets", and the π dot pulses. Verified that the curve's maximum is 0 at x = π. Added the sentence about the [−1, 1] roots.
- **3d graph layout.** The axes are now x_length 7.5, y_length 4, at RIGHT * 2.8, and the algebra is scaled 0.6 at the left edge.
- **3e (now 3f) missing intermediate values and pacing.** Added "cosine x equals one half, or cosine x equals one" with a matching visual line. Angles are listed in ascending order (0, π/3, 5π/3), with one transform per clause and 1 s waits.
- **3c spoken ambiguity.** Now says "times the quantity two cosine x minus one", and the bracket is underlined as it is spoken.
- **TransformMatchingTex isolation.** Added a global "Transform convention" using substrings_to_isolate, applied to all chains (3c, 3f, 5c, 5f, 2g).
- **TTS "root three over two", "b x".** 4a now says "the square root of three, over two". 4d and 6b say "b times x". 2e says "negative square root of two, over two". In 2g the second mention is kept as "negative root three over two" right after the full "square root of three" form, to keep the beat short.
- **4c too dense.** Split into c1 (u values, +2π arc arrows, 1.5 s wait) and c2 ("Only now divide by two", with arrows mapping each u dot down to the x line).
- **4e u redefinition, grey-dot position.** Now beat f: "Let u equal x over two…". A dashed grey continuation to 2π carries the 5π/3 dot before the RED cross.
- **2e cosine partner and the ± form.** Done (see the coverage gaps).
- **5a table not narrated.** Row 1 is narrated. The other rows get 2 s waits, and the table uses MathTable scaled to width 12.5.
- **5e "a equals b" TTS.** Changed to p and q in both the narration and the MathTex.
- **5c pacing and order.** Added "Replace sine squared with one minus cosine squared". Lines are paced at 1.2 s. The candidates are now ordered 0, π/2, 3π/2 to match the check table. (The chapter text lists them π/2, 3π/2, 0, but its check table uses 0, π/2, 3π/2, so the video follows the table.)
- **6c triangle crowding.** The triangle vertices are shifted left by 2 units as suggested, and the limit is at RIGHT * 4, scaled 0.9.

Runtime note: filling the five coverage gaps added four beats. To offset this, the narration everywhere else was tightened, with no core idea cut. The script is about 1230 spoken words, a little over the 1000-word guideline. Most of those words are short spoken math terms such as "pi over three", so at Samantha's pace it runs about 7 to 7.5 minutes.
