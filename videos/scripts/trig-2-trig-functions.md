# Trig Functions as Functions — Explainer Script

- **Course:** Trigonometry
- **Chapter:** Chapter 2 · Trig Functions as Functions (id: `trig-2-trig-functions`)
- **Target runtime:** about 6.5 to 7 minutes (roughly 1,150 spoken words; about 6.5 min at Samantha's default ~175 wpm, about 7.4 min at 155 wpm)

**Learning goal.** The learner stops treating sine as an angle lookup and treats it as a function of a real variable, the form calculus uses. They see that unrolling the circle gives the sine and cosine waves, and that each property of those waves (domain, range, period 2 pi, zeros, even and odd symmetry, cosine as shifted sine) comes from the circle. They learn that in a sin(b(x − c)) + d each parameter has one job, and they avoid the two traps: the period is 2π/b, and you factor before reading the shift. They learn why tangent has asymptotes where cos x = 0, range all reals and period π. They can turn a situation such as the Ferris wheel into a formula, and they know why inverse trig functions need restricted domains, including the arcsin(sin x) trap.

**Global style (all scenes):** dark background (`#1e1e2e`-ish). Colours: sine = BLUE, cosine = GREEN, tangent = ORANGE, highlights = YELLOW, targets/warnings = RED/PURPLE. A segment that represents a sine value is always BLUE and one that represents a cosine value is always GREEN. The standard wave axes are `Axes(x_range=[-6.5, 6.5, PI/2], y_range=[-3.5, 3.5, 1], x_length=12, y_length=5.5)` with x ticks labelled in multiples of π/2 (MathTex), unless a scene says otherwise. Math uses `MathTex`. Clear the frame with `FadeOut` between scenes unless a scene says to keep something.

**Circle-to-graph scale rule (Scenes 2, 3, 8b, 9):** whenever a circle and a graph are joined by a horizontal connector, the graph's scene units per y-unit must equal the circle's radius per unit of value, and the axes must be shifted so that `axes.c2p(0, 0)[1] == circle.get_center()[1]` (for Scene 9, so that the axes' h = 0 line is the wheel's ground line). Only then is the connector truly horizontal and equal heights look equal.

**TTS note:** a lone letter "a" is read by Samantha as the article, so the narration says "the letter a" (or names the quantity, "the amplitude") wherever the parameter stands alone. Groupings are spoken with "the quantity" and commas so the argument of each function is unambiguous.

---

## Scene 1 — Hook: sine is a function (Lesson 2.1)

**Narration:**

- **Beat a:** So far, sine has been a lookup. Angle in, number out. That is exactly what a function is. So let's plot it.

**Visuals:**

- **Beat a:** Title card `Text("Chapter 2 · Trig Functions as Functions")` fades in, then shrinks to the top-left corner. In the centre, `MathTex(r"\theta \;\longmapsto\; \sin\theta")` appears. It transforms (`TransformMatchingTex`) into `MathTex(r"x \;\longmapsto\; \sin x")`, and the `x` flashes YELLOW (`Indicate`).

---

## Scene 2 — Unwrapping the circle (Lesson 2.1)

**Narration:**

- **Beat a:** Picture a point walking anticlockwise round the unit circle, its height recorded on a strip of paper pulled steadily right.
- **Beat b:** The motion unrolls into y equals sine of x. It rises to one at pi over two, returns to zero at pi, falls to negative one at three pi over two, and is back at zero at two pi. Then it repeats.
- **Beat c:** Two habits change. Radians are the default, so pi is just a spot on the axis. And the variable is x: sine is now a function to graph, transform, and later differentiate.

**Visuals:**

- **Beat a:** Left side: a unit `Circle(radius=1.3)` centred at (-4.5, 0) with small axes through its centre. A `Dot` on the circle is driven by a `ValueTracker` theta, and a BLUE vertical segment runs from the circle's horizontal axis to the dot (the height, a sine value). Right side: `Axes(x_range=[0, 2*PI+0.2, PI/2], y_range=[-1.5, 1.5, 1], x_length=7, y_length=3.9)`, so that 1 y-unit = 1.3 scene units = the circle's radius. Shift the axes vertically so `axes.c2p(0,0)[1] == circle.get_center()[1]` (both at y = 0). X ticks are labelled `0, \frac{\pi}{2}, \pi, \frac{3\pi}{2}, 2\pi`.
- **Beat b:** Animate theta from 0 to 2π over about 8 seconds. An `always_redraw` dashed horizontal line connects the dot to the current graph point `axes.c2p(theta, sin(theta))`; because the scales match, it stays exactly horizontal. An `always_redraw` BLUE curve traces `sin(x)` from 0 up to theta. Pause at π/2, π, 3π/2 and 2π, putting a YELLOW `Dot` and a value label (1, 0, −1, 0) at each. At the end, show `MathTex(r"y = \sin x")` in BLUE above the graph. Then extend the traced curve a little past 2π in a lighter shade to hint that it repeats.
- **Beat c:** Fade the circle. Two text cards appear on the right one after the other: "1. Radians are the default: π is just a number on the axis", then "2. The variable is x". Briefly show a ghost axis labelled 0 … 360° cross-fading into the radian axis.

---

## Scene 3 — Cosine and periodicity (Lesson 2.1)

**Narration:**

- **Beat a:** Now record the horizontal coordinate, standing it upright on the graph. That is cosine. Same shape, but at angle zero the point is at coordinates one and zero, so cosine starts at one.
- **Beat b:** It repeats every two pi because the circle closes: x and x plus two pi are coterminal. Periodicity is coterminal angles, drawn.

**Visuals:**

- **Beat a:** Rebuild the Scene 2 layout with the same scale rule (circle radius 1.3, axes `y_length=3.9`, origins level). The tracked segment is now GREEN and horizontal: it runs from the circle's centre to the point (cos θ, 0) on the circle's horizontal axis. No dashed connector in this beat. First, three snapshots at θ = 0, π/2 and π: in each, `TransformFromCopy` the GREEN horizontal segment into a GREEN vertical segment standing at x = θ on the graph, from `axes.c2p(θ, 0)` to `axes.c2p(θ, cos θ)` (the copy rotates 90° as it moves; at π/2 it has zero length and shows as a dot; at π it points down). At θ = 0 specifically: label the circle point `\text{angle } 0:\ (1,0)` first, then a curved `Arrow` runs from the end of the GREEN horizontal segment to the top of the upright segment on the graph, and only then does the label `\cos 0 = 1` appear next to a YELLOW dot at graph point (0, 1). Then run θ continuously from 0 to 2π: an `always_redraw` GREEN upright segment at x = θ plus a GREEN trace of `cos(x)` from 0 to θ. Finish with `MathTex(r"y=\cos x")` in GREEN.
- **Beat b:** Switch to the wide standard axes and draw `sin(x)` over [−6.5, 6.5] in BLUE. Place a dot at x = 1 and a matching dot at x = 1 + 2π, joined by a YELLOW `DoubleArrow` labelled `2\pi` along the axis. Show `MathTex(r"\sin(x + 2\pi) = \sin x")`. Beside it, a small circle shows one dot for both angles (rotate by a full turn and land on the same spot).

---

## Scene 4 — Reading the wave (Lesson 2.2)

**Narration:**

- **Beat a:** Every property comes from the circle. Domain: all real numbers, since you can rotate any amount. Range: negative one to one, since circle coordinates never leave it.
- **Beat b:** Sine is zero at multiples of pi. Cosine is zero at pi over two plus multiples of pi.
- **Beat c:** The midline is the line the wave oscillates about. The amplitude is midline to peak, never negative. The period is the length of one cycle.

**Visuals:**

- **Beat a:** Standard axes with BLUE `sin(x)`. A `Rectangle` band between y = −1 and y = 1 spanning the width fades in lightly with the label `\text{Range } [-1,1]`, and a double arrow along the x-axis reads `\text{Domain: all reals}`.
- **Beat b:** YELLOW dots at x = −2π, −π, 0, π, 2π on the sine curve with `MathTex(r"\sin x = 0 \text{ at } x = n\pi")`. Then add GREEN `cos(x)` and put RED dots at ±π/2 and ±3π/2 with `MathTex(r"\cos x = 0 \text{ at } x = \tfrac{\pi}{2} + n\pi")`. Fade cosine out afterwards.
- **Beat c:** On the sine curve, draw a dashed midline y = 0 labelled "midline". Add a vertical `Brace` from the midline to the peak at π/2 labelled "amplitude = 1", and a horizontal `Brace` from 0 to 2π labelled "period = 2π".

---

## Scene 5 — Symmetry and cosine as shifted sine (Lesson 2.2)

**Narration:**

- **Beat a:** Negating an angle mirrors the point across the x axis. So cosine is even: cosine of negative x is cosine of x. Sine is odd: sine of negative x is negative sine of x.
- **Beat b:** Cosine folds onto itself across the y axis. Sine has half turn symmetry about the origin.
- **Beat c:** Slide sine left by pi over two, and it lands exactly on cosine, because a quarter turn swaps the two coordinates.
- **Beat d:** The wave is steepest at its zeros, and flat at its peaks. Calculus will say: the derivative of sine is cosine.

**Visuals:**

- **Beat a:** A small unit circle on the left shows a point at angle 0.9 and its mirror at −0.9 (a dashed reflection line along the x-axis), each with its coordinates. On the right, `MathTex(r"\cos(-x) = \cos x \quad(\text{even})")` in GREEN and `MathTex(r"\sin(-x) = -\sin x \quad(\text{odd})")` in BLUE are written one after the other.
- **Beat b:** Standard axes with GREEN `cos(x)`. Take a copy of the left half (`axes.plot(np.cos, x_range=[-6.5, 0])`) and reflect it across the y-axis with `copy.animate.flip(UP, about_point=axes.c2p(0, 0))` (equivalently `ApplyMatrix([[-1, 0], [0, 1]], copy, about_point=axes.c2p(0, 0))`); it lands on the right half. Replace it with BLUE `sin(x)` and rotate a copy by 180° about the origin (`Rotate(copy, PI, about_point=axes.c2p(0,0))`) so it lands on itself.
- **Beat c:** BLUE `sin(x)` and a dashed GREEN `cos(x)`. Animate the sine curve shifting left by π/2 (a `ValueTracker` shift s from 0 to π/2, graph `sin(x+s)`) until it overlaps cosine. Show `MathTex(r"\cos x = \sin\!\left(x + \frac{\pi}{2}\right)")`.
- **Beat d:** On `sin(x)`, draw short `TangentLine` segments: flat (YELLOW) at π/2, steepest (RED) at 0 and π. Label them "flat at the peak" and "steepest at the zeros".

---

## Scene 6 — Transforming sinusoids (Lesson 2.3)

**Narration:**

- **Beat a:** A tide swings two metres about a mean depth of five, every twelve hours: a sine wave, stretched, lifted, and shifted. y equals the letter a, times the sine of, b times the quantity x minus c. Then plus d.
- **Beat b:** Each letter has one job. The size of the letter a is the amplitude. Make it bigger, and the wave grows. Make it negative, and it flips.
- **Beat c:** Make b greater than one, and the wave squeezes horizontally.
- **Beat d:** Increase c, and the wave slides right by c. A negative c slides it left.
- **Beat e:** Increase d, and the whole wave lifts. These are the same four moves as in calculus, on a new base curve.
- **Beat f:** Trap one: b is not the period. More b means more cycles, so the period is two pi over b. With b equal to two, one cycle takes pi.
- **Beat g:** Trap two: factor first. In sine of the quantity two x minus pi, factor out the two. The shift is pi over two, not pi.

**Visuals:**

- **Beat a:** `MathTex(r"y = a\,\sin\bigl(b(x - c)\bigr) + d")` centred and large, with a, b, c, d coloured RED, YELLOW, PURPLE and TEAL via `substrings_to_isolate` / `set_color_by_tex`. Each letter pulses briefly as it is spoken.
- **Beats b–e (one continuous build):** Move the formula to the top. Standard axes, with a dashed grey reference `sin(x)`. Four `ValueTracker`s drive an `always_redraw` BLUE curve `a*sin(b*(x-c))+d`. Each parameter moves once, in sync with its own narration beat, and stays put (no return-to-default animations), so the curve accumulates the changes:
  - **Beat b:** a goes 1 → 2 (run_time ≈ 1.5 s, on "the wave grows"), then 2 → −2 (run_time ≈ 1.5 s, on "flips"). The a in the formula pulses; caption "|a| = amplitude". A small `Brace` from the midline to the peak shows 2.
  - **Beat c:** b goes 1 → 2 (run_time ≈ 2 s). The b pulses; caption "frequency".
  - **Beat d:** c goes 0 → 1 (run_time ≈ 2 s), with a short YELLOW arrow along the x-axis of length 1. The c pulses; caption "phase shift".
  - **Beat e:** d goes 0 → 1.5 (run_time ≈ 2 s) with a dashed midline at y = d following it. The d pulses; caption "vertical shift". During the second sentence, a small caption "same four moves, new base curve" fades in beneath the formula. Then fade the curve and captions.
- **Beat f:** Fresh curve `sin(2x)`. Put a horizontal `Brace` over one cycle [0, π] labelled `\text{period} = \frac{2\pi}{b} = \pi`. `MathTex(r"\text{period} = \frac{2\pi}{b}")` goes in a YELLOW box.
- **Beat g:** Show `MathTex(r"\sin(2x - \pi)")` with a RED cross next to "shift = π". It transforms into `MathTex(r"\sin\!\bigl(2(x - \tfrac{\pi}{2})\bigr)")` with a GREEN tick next to "shift = π/2". Graph `sin(2x - π)` and draw an arrow from x = 0 to x = π/2 showing where the cycle now starts.

---

## Scene 7 — Reading a graph backwards (Lesson 2.3)

**Narration:**

- **Beat a:** Exams test the reverse. The midline gives d, here negative one. Half the peak to trough distance gives the amplitude, here two.
- **Beat b:** One cycle is pi, so b is two. And where the wave crosses its midline heading upward gives c, here one half.
- **Beat c:** Put it together: y equals two times the sine of, two times the quantity x minus one half. Then minus one.

**Visuals:**

- **Beat a:** Standard axes with a PURPLE target curve `2*sin(2*(x-0.5)) - 1`. Draw a dashed midline at y = −1 labelled `d=-1`. Then a vertical brace from the trough (−3) to the peak (1), which splits into two equal halves, labelled `a = \frac{1-(-3)}{2} = 2`.
- **Beat b:** A horizontal brace over one cycle from 0.5 to 0.5 + π labelled `\text{period} = \pi \Rightarrow b = \frac{2\pi}{\pi} = 2`. A YELLOW dot at (0.5, −1), where the curve crosses the midline going up, with an arrow from x = 0 to x = 0.5 labelled `c = 0.5`.
- **Beat c:** Write `MathTex(r"y = 2\sin\bigl(2(x-0.5)\bigr) - 1")`, each number coloured to match its parameter; overlay the rebuilt curve in BLUE on the PURPLE target so they coincide.

---

## Scene 8 — Tangent and the asymptotes (Lesson 2.4)

**Narration:**

- **Beat a:** Sine and cosine are tame: bounded, smooth, repeating every two pi. Tangent is none of those. It all follows from its definition: sine of x over cosine of x.
- **Beat b:** Where cosine is zero, at pi over two plus multiples of pi, the bottom shrinks to nothing and the ratio runs off to infinity: a vertical asymptote.
- **Beat c:** It is zero where sine is zero. Divide by a cosine near zero, and you can get anything, so its range is every real number. Geometrically, tangent is the slope of the terminal side.
- **Beat d:** Its period is pi, not two pi, because that line is unchanged by a half turn. Transformed, the period is pi over b.

**Visuals:**

- **Beat a:** Small BLUE `sin(x)` and GREEN `cos(x)` side by side, each with a light band at ±1 and the caption "bounded, smooth, period 2π". They fade as `MathTex(r"\tan x = \frac{\sin x}{\cos x}")` appears with the numerator BLUE and the denominator GREEN.
- **Beat b:** Left: unit circle (radius 1.3) with the dot at angle θ (a `ValueTracker` going from 0.8 to 1.52). Show the height (BLUE) and the horizontal coordinate (GREEN). No circle-to-graph connector is used in this beat, so the scales need not match. As θ approaches π/2 the GREEN segment shrinks to almost nothing, and a live `DecimalNumber` for tan θ grows from about 1.03 (at θ = 0.8) to about 19.7 (at θ = 1.52). Right: `Axes(x_range=[-5, 5, PI/2], y_range=[-6, 6, 2], x_length=7.5, y_length=6)` with RED `DashedLine` asymptotes at x = ±π/2 and ±3π/2 (±3π/2 ≈ ±4.71 now sit inside the axis range). Draw ORANGE `tan(x)` as separate branches (plot each interval with `discontinuities` or clip the y values to ±6) so no line crosses an asymptote.
- **Beat c:** YELLOW dots at the zeros x = −π, 0, π. A small fraction `\frac{\sin x}{\text{tiny}}` flashes near an asymptote, then a vertical arrow along the y-axis labelled `\text{range: all reals}`. On the circle, draw the full line through the origin along the terminal side at angle 0.8 in ORANGE, labelled `\text{slope} = \tan\theta`.
- **Beat d:** On the circle, rotate the angle by π and show that ORANGE line coinciding with itself (the same slope). On the graph, brace one branch from −π/2 to π/2 labelled `\text{period} = \pi`. Show `MathTex(r"\text{period of } \tan(bx) = \frac{\pi}{b}")`.

---

## Scene 9 — Modelling with waves: the Ferris wheel (Lesson 2.5)

**Narration:**

- **Beat a:** To model anything that cycles, ask four questions. What are the extremes? How long is a cycle? Where does it start? Midline going up means sine. A maximum means cosine. A minimum means negative cosine. And does a known value check out?
- **Beat b:** A Ferris wheel: radius twenty metres, centre twenty five metres up, one turn every four minutes. You board at the bottom at time zero.
- **Beat c:** Extremes of five and forty five give d equals twenty five, and amplitude twenty. b is two pi over four, or pi over two. Starting at the minimum means negative cosine. h of t equals negative twenty times the cosine of, pi over two, times t. Then plus twenty five.
- **Beat d:** Watch the rider go round. The height traces exactly this curve.
- **Beat e:** Check: at t equals zero, h is five, the platform. At t equals two, h is forty five, the top. A sine shifted by one minute works too. Both are correct; only c differs.
- **Beat f:** Daylight works the same way: midline twelve hours, amplitude three, b equal to two pi over three hundred sixty five, c at the spring equinox. Tides: a period of about twelve point four hours.
- **Beat g:** Units live inside b. Here b is per minute. Measure t in hours, and b must change. Write the period with its unit before you divide.

**Visuals:**

- **Beat a:** A numbered list (`VGroup` of `Tex`) builds line by line: "1. Extremes → d, a", "2. Cycle length → b = 2π / period", "3. Start: midline up → sin; maximum → cos; minimum → −cos; else → shift c", "4. Sanity-check one value". The item-3 sub-rules appear one at a time as spoken, and "minimum → −cos" is highlighted YELLOW.
- **Beat b:** Layout for the whole scene (scale rule applies, 0.1 scene unit per metre): `axes = Axes(x_range=[0, 4.5, 1], y_range=[0, 50, 10], x_length=6, y_length=5)` on the right, labelled t (min) and h (m), placed so its h = 0 line is at scene y = −2.5. On the left, a ground line at scene y = −2.5 (the same line as the axes' h = 0) and a `Circle(radius=2)` wheel centred at (−4.5, `axes.c2p(0, 25)[1]`), i.e. scene y = 0. Mark the centre "25 m" and the radius "20 m". A RED rider `Dot` starts at the bottom of the wheel (scene y = −2, i.e. h = 5, just above the ground). Small labels read "4 min per turn" and "t = 0". Dashed horizontal guide lines at h = 5, 25 and 45 span both the wheel and the axes.
- **Beat c:** In a text column above the axes (or in the upper-right corner), step through `MathTex` lines, each on its phrase: `d = \frac{45+5}{2} = 25`, `a = \frac{45-5}{2} = 20`, `b = \frac{2\pi}{4} = \frac{\pi}{2}`, and then the boxed `h(t) = -20\cos\!\left(\frac{\pi}{2}t\right) + 25`. Shrink the derivation lines, keep the boxed formula.
- **Beat d:** Animate one revolution only: a `ValueTracker` t from 0 to 4 (run_time ≈ 4 s, linear). The rider sits at angle −π/2 + (π/2)t on the wheel; an `always_redraw` RED trace of h(t) runs from t = 0 to t on the axes; an `always_redraw` dashed horizontal connector joins the rider to `axes.c2p(t, h(t))` and stays exactly horizontal because of the shared scale.
- **Beat e:** YELLOW dots at (0, 5) and (2, 45) with the substitutions `-20(1)+25 = 5` and `-20(-1)+25 = 45`, and a GREEN check mark. Then, under the boxed formula, write `= 20\sin\!\left(\tfrac{\pi}{2}(t-1)\right) + 25` in BLUE with the `(t-1)` highlighted and a caption "same curve, c = 1"; overlay the BLUE graph of that sine form on the RED trace so they coincide.
- **Beat f:** Clear the wheel. Two small cards side by side. Card 1 ("Daylight"): a mini axes over one year with a wave between 9 h and 15 h, dashed midline at 12, and `d = 12,\ a = 3,\ b = \frac{2\pi}{365}`, a dot at the midline going up labelled "spring equinox → c". Card 2 ("Tides"): a mini wave with a brace over one cycle labelled `\text{period} \approx 12.4\text{ h}`.
- **Beat g:** A warning box titled "Units live inside b". Left: `b = \frac{2\pi}{4\text{ min}} = \frac{\pi}{2}\ \text{per minute}` with a GREEN tick. Right: `t \text{ in hours: period} = \tfrac{1}{15}\text{ h},\ b = 30\pi`, and beneath it a RED crossed-out `b = \frac{\pi}{2} \text{ with } t \text{ in hours}`.

---

## Scene 10 — Inverse trig functions (Lesson 2.6)

**Narration:**

- **Beat a:** In chapter zero, inverse sine meant ratio in, angle out. But y equals one half meets the sine curve infinitely often, and a function returns only one answer.
- **Beat b:** So restrict the domain. Keep negative pi over two to pi over two, the right half of the circle, where sine rises once, and invert that piece. That is arc sine. Its inputs run from negative one to one: no angle has a sine of two.
- **Beat c:** Arc cosine uses zero to pi, the top half, where cosine takes each value once. Each is the shortest interval next to zero that works. Arc tangent accepts every real number and flattens toward plus or minus pi over two, mirroring tangent's asymptotes.
- **Beat d:** Now the trap. Sine of arc sine of x gives back x, for x between negative one and one. But arc sine of sine of x gives back x only when x is between negative pi over two and pi over two. So arc sine of sine of three pi over four is pi over four.
- **Beat e:** A calculator hands you one angle. The equation has many. Chapter four starts there.

**Visuals:**

- **Beat a:** Standard axes with BLUE `sin(x)`, and a YELLOW horizontal line y = 0.5 drawn across the full width with arrow tips at both ends (`DoubleArrow` or `Line` with `add_tip` at both ends) to suggest it continues. Place RED dots at the four intersections inside the window: −11π/6 (≈ −5.76), −7π/6 (≈ −3.67), π/6 and 5π/6. Label: `\sin x = \tfrac{1}{2}`: "infinitely many x".
- **Beat b:** First, dim the sine curve except for the piece on [−π/2, π/2], which turns bright BLUE, with vertical dashed boundary lines; a small inset unit circle highlights its right half. Then cross-fade to equal-scale axes `Axes(x_range=[-2, 2, 1], y_range=[-2, 2, 1], x_length=6, y_length=6)` carrying the bright piece `axes.plot(np.sin, x_range=[-PI/2, PI/2])`. Draw the diagonal `axes.plot(lambda x: x)` dashed (at 45° because the scales are equal). Animate `Transform(sine_piece_copy, axes.plot(np.arcsin, x_range=[-1, 1]))` in PURPLE so the endpoints land exactly at (±1, ±π/2). Label the range `\left[-\frac{\pi}{2}, \frac{\pi}{2}\right]`. Then YELLOW dashed vertical lines at x = ±1 with the label `\text{domain } [-1,1]`, and a RED `\arcsin 2` crossed out.
- **Beat c:** Clear, then new `Axes(x_range=[-4, 4, 1], y_range=[-3, 3.4, 1], x_length=7, y_length=5)` placed in the left two-thirds of the frame. Plot `arcsin` (PURPLE, x in [−1, 1]), then `arccos` (GREEN, x in [−1, 1], range [0, π]) with a small inset circle highlighting the top half, then `arctan` (ORANGE, x in [−4, 4]) with dashed horizontal asymptotes at y = ±π/2. Then fade the curves to 30% opacity and show a compact table in the right third (aligned `MathTex`, scaled to fit width ≈ 4.5): `\arcsin: [-1,1] \to [-\frac{\pi}{2},\frac{\pi}{2}]` "right half", `\arccos: [-1,1] \to [0,\pi]` "top half", `\arctan: \mathbb{R} \to (-\frac{\pi}{2},\frac{\pi}{2})` "right half, ends excluded".
- **Beat d:** Two lines: `\sin(\arcsin x) = x,\ x \in [-1,1]` with a GREEN tick, and `\arcsin(\sin x) = x \text{ only if } x \in [-\frac{\pi}{2},\frac{\pi}{2}]` in a RED box. Worked example on a unit circle: a dot at 3π/4 and a dot at π/4 at the same height, joined by a dashed horizontal line. `MathTex(r"\arcsin\!\left(\sin\frac{3\pi}{4}\right) = \frac{\pi}{4}")`, with the π/4 dot highlighted in the right half of the circle.
- **Beat e:** Back to a sine curve with the line y = 0.5 and its RED dots; a calculator icon (a `RoundedRectangle` with the text `\sin^{-1}(0.5) = \frac{\pi}{6}`) points to just one dot, which turns YELLOW, while the others pulse. Caption "Chapter 4: recover the rest".

---

## Scene 11 — Recap and next chapter (Lesson 2.7, Mastery)

**Narration:**

- **Beat a:** To recap. The circle unwraps into a wave of period two pi, with properties read off the circle.
- **Beat b:** The period is two pi over b, and you factor before reading c. Tangent's period is pi. Inverses need restricted domains.
- **Beat c:** Try the mastery quiz, moving between graph, formula, and situation. Then Chapter three derives the identities linking these functions, so you never need an identity sheet.

**Visuals:**

- **Beat a:** Four recap cards in a 2×2 grid: each a `RoundedRectangle(width=5.5, height=2.8, corner_radius=0.2)`, arranged with `arrange_in_grid(2, 2, buff=0.3)`, each with one `MathTex` headline at the top and a small drawing below. Card 1 (headline `\sin(x+2\pi)=\sin x`): a mini circle (radius 0.6) beside a one-period mini BLUE sine wave. Card 2 (headline `\text{range } [-1,1],\ \text{amplitude} \ge 0`): a mini BLUE sine wave with a dashed midline and an amplitude brace. Cards 1 and 2 appear during Beat a.
- **Beat b:** Card 3 (headline `\text{period}=\frac{2\pi}{b}`): below it `a\sin(b(x-c))+d` and the words "factor first". Card 4 (headline `\tan:\ \text{period } \pi`): a mini ORANGE tangent branch between two RED dashed asymptotes beside a mini PURPLE arcsin curve.
- **Beat c:** `FadeOut` all four cards. A triangle diagram of three nodes, "Graph", "Formula" and "Situation", joined by double arrows, fades in. Then `Text("Next: Chapter 3 · Identities: The Derivation Toolkit")` fades in at the bottom, and everything fades out.

---

**Lesson coverage map:** 2.1 → Scenes 1–3 · 2.2 → Scenes 4–5 · 2.3 → Scenes 6–7 · 2.4 → Scene 8 · 2.5 → Scene 9 · 2.6 → Scene 10 · 2.7 Mastery → Scene 11.

---

## Review log

**Coverage gaps**

1. *2.5 daylight and tides missing.* Added: new Scene 9 Beat f (d = 12, amplitude 3, b = 2π/365, c at the spring equinox; tide period about 12.4 h), with two mini cards. It comes after the check and the sine-or-cosine sentence, not straight after the check, so the two ideas about the Ferris wheel formula stay together.
2. *2.5 sine and cosine models both correct (quiz t2-5-q3).* Added: in Scene 9 Beat e, "A sine shifted by one minute works too. Both are correct; only c differs." I checked that −20cos((π/2)t) + 25 = 20sin((π/2)(t − 1)) + 25: it holds at t = 0, 1, 2 and 3.3, and the identity follows from sin(θ − π/2) = −cos θ. The visual overlays the sine form on the trace.
3. *2.5 checklist omits "minimum means negative cosine".* Added: Scene 9 Beat a narration and list item 3 now include "at a minimum, use negative cosine", highlighted.
4. *2.6 arcsin/arccos domain and "no angle whose sine is two".* Added: in Scene 10 Beat b narration, plus x = ±1 domain lines and a crossed-out arcsin 2.
5. *2.6 why arccos uses [0, π], shortest interval, circle pieces.* Added: in Scene 10 Beats b and c ("right half of the circle", "top half ... because cosine takes each value exactly once there", "shortest interval next to zero"), with inset circles and a "which piece" column in the table.
6. *2.6 forward link to Chapter 4 (optional).* Added: new Scene 10 Beat e with a calculator visual.
7. *2.4 "tame" contrast and why the range is all reals.* Added: Scene 8 Beat a states the tame contrast (the chapter says "continuous"; I say "smooth" because it is easier to hear and still true). Beat c gives the tiny-denominator argument.
8. *2.3 link to the calculus transformations lesson.* Added: one sentence at the end of Scene 6 Beat e, plus a caption.

**Issues**

1. *(major) Scene 2 circle/graph scale mismatch.* Fixed: the axes now use `y_length=3.9` with radius 1.3 (1.3 units per y-unit), and the origins are explicitly aligned. A global "circle-to-graph scale rule" covers Scenes 2, 3, 8b and 9. Scene 8b has no connector, which is now stated.
2. *(major) Scene 3 cosine transfer undefined.* Fixed: the GREEN horizontal segment is copied, rotated 90° and stood upright at x = θ (`TransformFromCopy`). There are snapshots at 0, π/2 and π, then a continuous trace, and no dashed connector.
3. *(major) TTS grouping and the lone "a".* Fixed: Scene 6 Beat a now says "y equals the letter a, times the sine of, b times the quantity x minus c. Then plus d". Beat g says "sine of the quantity two x minus pi". Scene 9 Beat c says "negative twenty times the cosine of, pi over two, times t. Then plus twenty five". I replaced the standalone "a" with "the letter a" or "the amplitude" everywhere (Scenes 6, 7 and 9), and a global TTS note records the rule.
4. *(major) Scene 6 Beat b timing.* Fixed: the old Beat b is split into Beats b–e, one per parameter, each with its own narration clause synced to a single move and no return-to-default. The traps become Beats f and g.
5. *(major) Scene 9 Beat c overload and scale.* Fixed: the derivation (Beat c) and the animation (Beat d, "Watch the rider go round...") are now separate. The trace covers one revolution, t from 0 to 4. The axes are `y_range=[0,50,10], y_length=5` (0.1 unit per metre, matching the radius-2 wheel for 20 m), the ground line is the axes' h = 0 line, and the wheel centre is at `axes.c2p(0,25)[1]`. I reduced `x_range` to [0, 4.5] because only one revolution is traced.
6. *(major) Scene 10 Beat d missing qualifier.* Fixed: the narration now says "for x between negative one and one" and "only when x is between negative pi over two and pi over two" rather than "restricted range". The MathTex adds `x \in [-1,1]`.
7. *(minor) Scene 10 Beat a intersections.* Fixed: the dots are now at −11π/6, −7π/6, π/6 and 5π/6 (all inside ±6.5, checked numerically), and the line has arrow tips at both ends.
8. *(minor) Scene 10 Beat b reflection on unequal axes.* Fixed: the beat uses equal-scale axes (−2 to 2 on both, 6 × 6), y = x via `axes.plot`, and a `Transform` into `axes.plot(np.arcsin)`.
9. *(minor) Scene 8 asymptote range and tan values.* Fixed: `x_range=[-5, 5, PI/2]`, so ±3π/2 ≈ ±4.71 is inside. The DecimalNumber note now reads about 1.03 to about 19.7 as θ goes from 0.8 to 1.52 (checked: tan 0.8 ≈ 1.030, tan 1.52 ≈ 19.67). I kept x_length at 7.5, not 12, because the circle shares the frame; 12 would not fit next to it.
10. *(minor) Scene 8 Beat c slope before introduction.* Fixed: the range sentence now uses the denominator argument first, then introduces "tangent is the slope of the terminal side", with the ORANGE line drawn in Beat c. Beat d refers to "that line".
11. *(minor) Scene 8 Beat a "not tame" with no referent.* Fixed (see coverage gap 7).
12. *(minor) Scene 2 GREEN height segment.* Fixed: the segment is now BLUE. A global rule says sine segments are BLUE and cosine segments GREEN.
13. *(minor) Scene 3 conflicting coordinate labels.* Fixed: the circle label is `angle 0: (1,0)`, followed by an arrow, then the graph label `cos 0 = 1`, shown in sequence.
14. *(minor) "one comma zero".* Fixed: it now says "at coordinates one and zero, so cosine starts at one."
15. *(minor) Scene 5 flip about the wrong point.* Fixed: `flip(UP, about_point=axes.c2p(0,0))`, or the equivalent `ApplyMatrix`.
16. *(minor) Scene 6 missing qualifiers.* Fixed: "The size of the letter a is the amplitude", "Make b greater than one ... squeezes", "slides right by c. A negative c slides it left."
17. *(minor) Scene 7 vague c and short narration.* Fixed: the narration is split into three beats. c is defined as where the wave crosses its midline heading upward (x = 0.5), and a spoken final formula is timed to the MathTex. I verified 2sin(2(x − 0.5)) − 1: peak 1, trough −3, period π, upward midline crossing at 0.5.
18. *(minor) Scene 9 units too cryptic.* Fixed: the narration is a shorter version of the suggested wording ("Here b is per minute. Measure t in hours, and b must change. Write the period with its unit before you divide."). The visual shows b = π/2 per minute (ticked) against the hours version (period 1/15 h, b = 30π; checked 2π ÷ (1/15) = 30π) and a crossed-out π/2-with-hours.
19. *(minor) Scene 10 Beat c: why arccos differs, and table crowding.* Fixed: a narration clause was added (see coverage gap 5). The axes shrink to x_length 7 in the left two-thirds, the curves dim, and the table sits in the right third.
20. *(minor) Scene 11 cards loosely specified and busy.* Fixed: the cards are fixed 5.5 × 2.8 `RoundedRectangle`s in a 2×2 grid with buff 0.3, each with one MathTex headline. They `FadeOut` before the triangle appears instead of shrinking.

**Runtime note:** after adding all the coverage, I tightened narration in every scene (without dropping any reviewed content) to about 1,150 words: about 6.5 minutes at Samantha's default rate and about 7.4 at 155 wpm, so slightly over the 1,000-word guide. If you need to trim further, the first cuts are Scene 10 Beat e (optional per the review) and the calculus sentence in Scene 6 Beat e.
