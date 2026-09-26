# Any Triangle, and the Bridge to Calculus

- **Course:** Trigonometry
- **Chapter:** Chapter 5 · Any Triangle, and the Bridge to Calculus (id: `trig-5-any-triangle`)
- **Target runtime:** about 6 to 7 minutes (about 969 spoken words, plus explicit holds)

**Learning goal.** This chapter moves past right triangles. The learner sees the law of sines come from one dropped altitude, and the law of cosines from coordinates plus the Pythagorean identity. They learn why SSA can give zero, one or two triangles and how the angle-sum check settles it. They get the area as one half a b sine C, with Heron's formula as a consequence. The chapter then shows that sine of theta is about theta for small angles in radians. That fact becomes the limit of sine theta over theta as theta approaches zero, which equals one. That limit gives the derivative of sine as cosine and shows why radians are the right unit. The chapter hands the course over to calculus.

**Global style (all scenes).** Dark background (`#1e1e2e`). Triangle sides in white, angles as `Angle` arcs in yellow (`#f9e2af`), altitude dashed in teal (`#94e2d5`), highlight color coral (`#f38ba8`), secondary blue (`#89b4fa`), success/check color green (`#a6e3a1`). Equations are `MathTex`, placed at the top right or bottom of the frame. Unless a beat says otherwise, the previous beat's objects stay on screen. Every scene ends with `FadeOut` of all objects. After every boxed result (law of sines, law of cosines, area, the limit, the derivative) add `self.wait(1.5)` before the next beat.

**Letter convention in narration.** On screen, sides are lowercase (`a`, `b`, `c`) and angles uppercase (`A`, `B`, `C`), as in the chapter. The TTS voice cannot voice letter case, and it reads a lone lowercase "a" as the article "uh". So the narration always writes the letter in capitals and puts the word "side" or "angle" (or "corner") in front of it, or uses a context where only one reading is possible (for example "sine A" can only be the angle). "Side A" in the narration means side `a` on screen.

---

## Scene 1 · Beyond the right angle (Lesson 5.1, opening)

**Beat a**
Narration: So far, every triangle we solved had a right angle. Most triangles do not.

Visuals: Title card `Text("Any Triangle, and the Bridge to Calculus", font_size=40)` with subtitle `Text("Chapter 5", font_size=28)` below it. Fade the title out. Draw a right triangle alone at center, vertices (-1.5, -1), (1.5, -1), (-1.5, 1.2), with a `RightAngle` marker at (-1.5, -1). Cross it out with a coral `Cross` scaled to the triangle, then fade both out. Then draw a scalene triangle `Polygon` with vertices (-3, -1.5), (3, -1.5), (0.8, 2).

**Beat b**
Narration: Label the corners A, B and C. Each side takes the letter of the corner across from it, so side A sits opposite angle A.

Visuals: On the scalene triangle, label vertices A at (-3, -1.5), B at (3, -1.5), C at (0.8, 2) with `MathTex`. Label sides: `a` at the midpoint of BC, `b` at the midpoint of AC, `c` at the midpoint of AB, each offset outward. Then flash angle A's arc and side a together in coral, then B with b, then C with c.

---

## Scene 2 · Deriving the law of sines (Lesson 5.1)

**Beat a**
Narration: Drop the altitude h from corner C. Two right triangles now share h.

Visuals: Keep the triangle. Draw a dashed teal `DashedLine` from C (0.8, 2) to its foot (0.8, -1.5), with a small right-angle marker at the foot and the label `h`. Shade the left right triangle A, foot, C in faint blue and the right one in faint coral.

**Beat b**
Narration: On the left, h equals side B times sine A. On the right, h equals side A times sine B.

Visuals: Highlight the left triangle and write `MathTex(r"h = b\sin A")`. Highlight the right triangle and write `MathTex(r"h = a\sin B")`. Stack both equations in the top right.

**Beat c**
Narration: Set them equal and divide: side A over sine A equals side B over sine B. Another altitude adds side C over sine C. That is the law of sines.

Visuals: `TransformMatchingTex` the two equations into `b\sin A = a\sin B`, then into `\frac{a}{\sin A} = \frac{b}{\sin B}`, then append `= \frac{c}{\sin C}`. Put a coral `SurroundingRectangle` around the full law with the caption `Text("Law of Sines", font_size=28)`. Hold 1.5 s.

**Beat d**
Narration: The law needs a matched pair, a side and its opposite angle. That fits two angles and a side, A A S or A S A, and the tricky S S A case.

Visuals: Fade out the altitude and shading. Pair each arc with its opposite side in the same color: A and a in blue, B and b in teal, C and c in coral. Then show a small caption list at the bottom: `Text("AAS / ASA: two angles + any side")` and `Text("SSA: two sides + non-included angle (lesson 5.2)")`, the second in coral.

---

## Scene 3 · Worked example: the rock across the river (Lesson 5.1)

**Beat a**
Narration: A surveyor sights a rock across a river: sixty three degrees from A, forty one from B, one hundred twenty meters along the bank. How far is the rock from A?

Visuals: Clear the frame. Draw the river as a translucent blue `Rectangle` (fill `#89b4fa`, opacity 0.2, no stroke) spanning the full frame width from y = -1.7 to y = 0.1, with `z_index = -1` so it sits behind everything. The near bank is the line y = -2 just below it. Place A at (-3, -2) and B at (1, -2), with the segment AB labeled `120\text{ m}` below it. The rock is a dot R at about (-1.77, 0.41), just above the band's upper edge. (R = A + 2.7 × (cos 63°, sin 63°); 81.1 m at a scale of about 1/30.) Draw AR and BR. Label the angle arcs `63^\circ` at A and `41^\circ` at B.

**Beat b**
Narration: Two angles and a side, the A S A case. The third angle is seventy six degrees, opposite the baseline. The distance d sits opposite forty one.

Visuals: Write `180^\circ - 63^\circ - 41^\circ = 76^\circ` and add an arc labeled `76^\circ` at R. Color side AB and the 76 degree arc blue as one matched pair. Color side AR, labeled `d`, and the 41 degree arc coral. Show a small tag `Text("ASA", font_size=24)` in the top left.

**Beat c**
Narration: So d over sine forty one equals one twenty over sine seventy six. d is about eighty one point one meters.

Visuals: `MathTex(r"\frac{d}{\sin 41^\circ} = \frac{120}{\sin 76^\circ}")`, then transform to `d = \frac{120\sin 41^\circ}{\sin 76^\circ} \approx 81.1\text{ m}`. Replace the `d` label on AR with `81.1\text{ m}`.

---

## Scene 4 · The ambiguous case (Lesson 5.2)

**Beat a**
Narration: Two sides and an angle not between them, S S A, do not pin down a triangle. Hinge side A at corner C, and swing it.

Visuals: Clear the frame. Draw the base ray from A at (-4, -2) running right to (5, -2). Draw side b from A at 40 degrees with length 4.8, so C is at about (-0.32, 1.09). Label it `b` and show the angle arc `A` (40°). Draw a coral segment `a` of length 4 hinged at C, starting horizontal and pointing right (to (3.68, 1.09)), and animate it with `Rotate(a_seg, angle=-PI/2, about_point=C)` so it sweeps downward. Leave it pointing straight down, then fade it out.

**Beat b**
Narration: For an acute angle A, the altitude from C is side B sine A. If side A is shorter, it never reaches the base: no triangle. Exactly equal: one right triangle.

Visuals: Draw a dashed teal altitude from C (-0.32, 1.09) straight down to (-0.32, -2), labeled `h = b\sin A \approx 3.09`. For each radius, draw only the lower half of the swing, `Arc(radius=r, start_angle=PI, angle=PI, arc_center=C)` in coral, so nothing goes above the frame. Radius 2.4: the arc bottoms out at y = -1.31, above the base, with `Text("no triangle")`. Transform to radius 3.09: the arc touches the base at one point (-0.32, -2). Add a right-angle marker and `Text("one right triangle")`.

**Beat c**
Narration: Side A between the altitude and side B: the swing crosses the base twice. Two triangles.

Visuals: Transform the arc to radius 4 (between h and b). Mark the two crossings B1 at about (-2.86, -2) and B2 at about (2.22, -2) with dots. Shade triangle A C B1 in blue and triangle A C B2 in coral (they overlap along AC). Show `Text("two triangles")`.

**Beat d**
Narration: Side A at least as long as side B: the second crossing lands behind corner A. One triangle.

Visuals: Remove the shading. Transform the arc to radius 5.5 (at least b). One crossing lands on the ray at about (4.23, -2); shade triangle A C B in blue. The other lands at about (-4.87, -2), left of A: draw it gray, then put a small coral `Cross` on it. Show `Text("one triangle")`.

**Beat e**
Narration: So for acute A, four outcomes: none, one right, two, or one.

Visuals: Clear the geometry. Title `Text("The four outcomes (acute A)", font_size=32)`. Write four `MathTex` rows, one per clause: `a < b\sin A \;\Rightarrow\; \text{none}`, `a = b\sin A \;\Rightarrow\; \text{one (right)}`, `b\sin A < a < b \;\Rightarrow\; \text{two}`, `a \ge b \;\Rightarrow\; \text{one}`. Highlight the "two" row in coral. Hold 1.5 s.

**Beat f**
Narration: Algebraically, sine B above one means no triangle. Below one, both B and one eighty minus B share that sine. The calculator shows only one.

Visuals: Clear the list. Write `\sin B = \frac{b\sin A}{a}` and branch three arrows to `>1`, `=1` and `<1`. On the `<1` branch, draw a small unit semicircle whose horizontal line at height 0.75 meets it at two points. Label them `B` and `180^\circ - B`, with `180^\circ - B` in coral.

---

## Scene 5 · Worked example and the angle-sum check (Lesson 5.2)

**Beat a**
Narration: Try angle A thirty degrees, side A eight, side B twelve. Sine B is point seven five, so B is forty eight point six, or one thirty one point four.

Visuals: Write `A = 30^\circ,\ a = 8,\ b = 12`, then `\sin B = \frac{12\sin 30^\circ}{8} = 0.75`, then `B \approx 48.6^\circ \text{ or } B' \approx 131.4^\circ`.

**Beat b**
Narration: Add angle A to each: seventy eight point six, and one sixty one point four. Both under one eighty. Two triangles.

Visuals: Two check lines, each with a green check mark: `30 + 48.6 = 78.6 < 180` and `30 + 131.4 = 161.4 < 180`. Below them, draw the two triangles overlapped on purpose, as in Scene 4, at a scale of 0.35 and centered in the lower half: A (0,0), C (2.6,1.5), B1 (1.28,0) in blue and B2 (3.92,0) in coral, sharing side AC. Label the third angles at C: `101.4^\circ` (blue triangle) and `18.6^\circ` (coral triangle), using font size 28 so they stay readable.

**Beat c**
Narration: Now make angle A seventy, with sine B point nine. B is sixty four point two, or one fifteen point eight. But seventy plus one fifteen point eight is one eighty five point eight. No room: one triangle.

Visuals: Clear the triangles. Write `A = 70^\circ,\ \sin B = 0.9 \Rightarrow B \approx 64.2^\circ \text{ or } B' \approx 115.8^\circ`. Below it, `70^\circ + 64.2^\circ = 134.2^\circ < 180^\circ` with a green check, then `70^\circ + 115.8^\circ = 185.8^\circ \ge 180^\circ` in coral. Put a coral `Cross` over `B' \approx 115.8^\circ` in the first line. Caption `Text("Always run the angle-sum check")`.

**Beat d**
Narration: And an obtuse angle A is never ambiguous.

Visuals: Show a small triangle with vertices (-1, -1), (2, -1), (-2, 0.5), with an obtuse arc at (-1, -1) labeled `A`, and `Text("obtuse A: only one triangle")`.

---

## Scene 6 · The law of cosines (Lesson 5.3)

**Beat a**
Narration: Two sides and the included angle, or three sides, give no matched pair. Enter the law of cosines.

Visuals: Clear the frame. Show two labels, `Text("SAS")` and `Text("SSS")`, each with a small triangle sketch. Put coral question marks where the matched pair would be. Then fade them out.

**Beat b**
Narration: Put corner A at the origin, side C along the x axis. Corner C sits at B cosine A, B sine A, straight from the unit circle.

Visuals: `Axes(x_range=[-1,8,1], y_range=[-1,5,1])` at a small scale. Place A at (0,0), B at (7,0) and C at (5 cos 60°, 5 sin 60°) = (2.5, 4.33). Label B as `(c, 0)` and C as `(b\cos A,\ b\sin A)`. Draw the angle arc A and label sides b and c. Side a runs from B to C in coral.

**Beat c**
Narration: Side A is the distance from B to C. Expand, and cosine squared plus sine squared becomes one. Side A squared equals B squared plus C squared, minus two B C cosine A.

Visuals: Chain of `MathTex` transforms: `a^2 = (b\cos A - c)^2 + (b\sin A)^2`, then `a^2 = b^2\cos^2 A - 2bc\cos A + c^2 + b^2\sin^2 A`, then `a^2 = b^2(\cos^2 A + \sin^2 A) + c^2 - 2bc\cos A`. Highlight the bracket in coral and replace it with `1`. Finish at `a^2 = b^2 + c^2 - 2bc\cos A` inside a `SurroundingRectangle` with the caption `Text("Law of Cosines")`. Hold 1.5 s.

---

## Scene 7 · Pythagoras plus a correction (Lesson 5.3)

**Beat a**
Narration: Set angle A to ninety. Cosine is zero, the correction vanishes, and Pythagoras returns.

Visuals: A triangle with fixed sides b = 2.5 and c = 3.5 meeting at A, where the angle is a `ValueTracker` driving the vertex C = (2.5 cos A, 2.5 sin A). Set the angle to 90 degrees and show a right-angle marker. Cross out the term `-2bc\cos A` with a coral line. The equation now reads `a^2 = b^2 + c^2`.

**Beat b**
Narration: Acute angle, cosine positive: the side is shorter than Pythagoras. Obtuse: longer.

Visuals: Draw a faint dashed reference segment of length sqrt(b squared plus c squared). Animate the angle tracker down to 50 degrees: side a (coral) becomes shorter than the reference, and the label reads `\cos A > 0`. Animate it up to 130 degrees: a becomes longer, and the label reads `\cos A < 0`.

**Beat c**
Narration: Given three sides, the sign of B squared plus C squared minus A squared says acute, right, or obtuse.

Visuals: Show `\cos A = \frac{b^2 + c^2 - a^2}{2bc}`. Put a coral box around the numerator and list three rows: `> 0 \Rightarrow` acute, `= 0 \Rightarrow` right, `< 0 \Rightarrow` obtuse.

---

## Scene 8 · Area, Heron, and choosing a tool (Lesson 5.4)

**Beat a**
Narration: Area is half base times height. With sides A and B meeting at angle C, the height is B sine C. So area is one half A B sine C.

Visuals: Clear the frame. Draw base a from (-3,-1.5) to (3,-1.5), and side b from the left end (vertex C) at angle C = 50 degrees with length 4. Draw a dashed teal height from the top vertex to the base, labeled `b\sin C`. Write `\text{Area} = \tfrac12 ab\sin C` in the top right, boxed, and shade the triangle light blue. Hold 1.5 s.

**Beat b**
Narration: Use the included angle. The area peaks at ninety degrees, where sine is one, giving back half base times height.

Visuals: Scale the whole triangle by 0.55 and move it so vertex C sits at (-4, -2): base a now runs from (-4,-2) to (-0.7,-2), side b has length 2.2. Use a `ValueTracker` on C from 20 to 160 degrees, with the triangle redrawn by `always_redraw`; the apex stays within x in [-6.1, -1.9] and y in [-2, 0.2]. On the right half, `Axes(x_range=[0,180,30], y_range=[0,13,4], x_length=5, y_length=3)` placed with its origin near (1.2, -2), x label `C` and y label `\text{Area}` (true area for a = 6, b = 4, peak 12). Plot `12*np.sin(np.radians(x))` in blue with a dot tracking the tracker. Pause at 90 degrees: mark the peak in coral, show a right-angle marker on the triangle, and write `C = 90^\circ:\ \tfrac12 ab = \tfrac12\cdot\text{base}\cdot\text{height}`.

**Beat c**
Narration: Three sides, no angle? Heron's formula, which follows from the law of cosines.

Visuals: Clear the plot. Show `\text{Area} = \sqrt{s(s-a)(s-b)(s-c)},\ \ s = \frac{a+b+c}{2}`. Draw a small arrow chain: `\text{Law of Cosines} \to \cos C \to \sin C \to \tfrac12 ab\sin C \to \text{Heron}`.

**Beat d**
Narration: So: right triangle, SOH CAH TOA and Pythagoras. Matched pair, law of sines. Included angle or three sides, law of cosines. Area, one half A B sine C, or Heron.

Visuals: Show a four-row table (`VGroup` of `Text` rows) that builds one row per clause: `Right triangle → SOH-CAH-TOA, Pythagoras`, `Matched pair → Law of Sines (check SSA)`, `SAS or SSS → Law of Cosines`, `Area → ½ab sin C, or Heron`.

**Beat e**
Narration: A ship sails forty kilometers on bearing fifty, then twenty five kilometers on bearing one forty. The bearings differ by ninety, so the turn is a right angle, and the law of cosines becomes Pythagoras: about forty seven point two kilometers.

Visuals: Clear the table. Draw a small north arrow. The port is at (-3,-2). Leg one has length 3.2 on a bearing of 50 degrees, drawn as a direction 40 degrees above the positive x axis. Leg two has length 2 on a bearing of 140 degrees, 50 degrees below the positive x axis. Label them `40\text{ km}` and `25\text{ km}`. Write `140^\circ - 50^\circ = 90^\circ` and mark a right angle at the turn. Draw a dashed coral line back to the port and write `\sqrt{40^2 + 25^2} \approx 47.2\text{ km}`.

---

## Scene 9 · The small-angle surprise (Lesson 5.5)

**Beat a**
Narration: Compare small angles in radians with their sines. The ratio is point eight four at one, point nine six at one half, point nine nine eight at one tenth, and nearly one at one thousandth.

Visuals: Clear the frame. A `MathTable` scaled to about 0.6, centered. Show the header row first: `\theta`, `\sin\theta`, `\frac{\sin\theta}{\theta}`. Then reveal one row every 1.5 to 2 seconds, in sync with the narration: `1, 0.84147, 0.84147`, `0.5, 0.47943, 0.95885`, `0.1, 0.09983, 0.99833`, `0.01, 0.0099998, 0.99998`, `0.001, 0.000999999, 0.9999998`. (The 0.01 row appears silently between "one tenth" and "one thousandth".) Color the last column coral as it approaches 1.

**Beat b**
Narration: So for small theta, sine theta is nearly theta. Theta is the arc, sine theta the height, and a tiny arc is nearly straight.

Visuals: Write `\sin\theta \approx \theta` at the top. Shrink the table away. In a `MovingCameraScene`, draw a unit circle of radius 3 centered at the origin, with axes and a radius at 0.6 rad. Draw the arc from (3,0) to the endpoint in coral, labeled `\theta`, and the height as a teal segment from (3 cos θ, 0) up to the endpoint, labeled `\sin\theta`. Animate the angle down to 0.1 rad. Then fade out the `\theta`, `\sin\theta` and `\sin\theta \approx \theta` labels, and zoom with `self.camera.frame.animate.scale(0.15).move_to(circle.point_at_angle(0.1))` (about (2.985, 0.30)). The coral arc starts at (3,0) and the teal height sits at x ≈ 2.985; at this zoom they look nearly parallel and nearly equal in length.

**Beat c**
Narration: Near zero, the graphs of sine x and x are indistinguishable.

Visuals: Restore the camera (`frame.animate.scale(1/0.15).move_to(ORIGIN)`) and clear. `Axes(x_range=[-1,1,0.5], y_range=[-1,1,0.5])`. Plot `np.sin(x)` in blue, `x` in coral, and `np.sin(x)-x` in teal. Zoom the frame onto the interval from minus 0.2 to 0.2, where the blue and coral curves coincide and the teal curve hugs zero.

**Beat d**
Narration: Radians only. In degrees, sine of one degree would be about one. It is actually zero point zero one seven five. Only radians make angle and arc length the same number.

Visuals: Restore the camera and clear. Show `\sin 1^\circ \approx 0.01745,\ \text{not } 1` with a coral `Cross` over a faint `\sin 1^\circ \approx 1`. Then redraw a radius-3 circle with a 1 rad arc and caption `\text{radians: arc length} = r\,\theta`.

**Beat e**
Narration: That lets physics swap sine theta for theta for a small pendulum swing, with an error of order theta cubed.

Visuals: Clear. Draw a small pendulum (a `Line` from a pivot with a `Dot` bob) swinging with a small amplitude, and beside it `\sin\theta \to \theta`, then `\text{error} \sim \theta^3` below it.

---

## Scene 10 · The bridge to calculus (Lesson 5.6)

**Beat a**
Narration: At zero, sine theta over theta is zero over zero. But it closes in on one: the limit as theta approaches zero is one.

Visuals: Clear the frame. `Axes(x_range=[-6.5,6.5,1], y_range=[-0.5,1.5,0.5])`. Plot `np.sin(x)/x` in blue, skipping x = 0. Draw a hollow circle (`Circle(radius=0.08)`, stroke only) at (0,1) as the hole. Two dots slide along the curve from x = -3 and x = 3 toward 0, with a `DecimalNumber` readout of their heights approaching 1. Write `\lim_{\theta \to 0} \frac{\sin\theta}{\theta} = 1`, boxed. Hold 1.5 s.

**Beat b**
Narration: That limit builds the derivative. Expand sine of x plus h with the angle sum formula, and the difference quotient splits: one piece goes to one, the other to zero. The derivative of sine x is cosine x.

Visuals: Show `\frac{\sin(x+h) - \sin x}{h}`, then transform (tag `\text{angle sum, Ch 3.3}` in small text) into `\sin x\,\frac{\cos h - 1}{h} + \cos x\,\frac{\sin h}{h}`. Under each fraction, show `\to 0` and `\to 1`. Arrow down to a boxed `\frac{d}{dx}\sin x = \cos x`. Hold 1.5 s.

**Beat c**
Narration: You saw this coming: sine is steepest where cosine peaks, and flat where cosine is zero.

Visuals: New axes, x from 0 to 2 pi. Plot sine in blue and cosine in coral (dashed). A tangent line rides along the sine curve (`always_redraw` with slope `np.cos(x)`) while a dot on the cosine curve tracks the same x. Pause at x = 0, where the slope is steepest and cosine is at 1, and at x = pi over 2, where the slope is flat and cosine is at 0.

**Beat d**
Narration: In degrees, the limit is pi over one eighty, a constant stuck to every derivative forever. Radians make it one.

Visuals: Show `\text{degrees: } \lim_{\theta\to0}\frac{\sin\theta^\circ}{\theta} = \frac{\pi}{180}` and `\frac{d}{dx}\sin x = \frac{\pi}{180}\cos x`. Put coral boxes around the pi over 180 factor and repeat it as small ghost copies trailing off to the right. Then `FadeOut` the degrees line and show `\text{radians: } \frac{d}{dx}\sin x = \cos x` in teal.

---

## Scene 11 · Recap and what comes next (Lessons 5.6 chain, 5.7 diagnostic)

**Beat a**
Narration: The course is one chain: similar triangles, the unit circle, the wave, identities, solving, and now any triangle and a limit.

Visuals: Build a horizontal chain of six short labels, one per chapter, lighting each in turn with a small icon beneath: `\text{Ch 0: ratios}` (a pair of similar triangles), `\text{Ch 1: unit circle}` (a circle with a radius), `\text{Ch 2: wave}` (a sine curve), `\text{Ch 3: identities}` (`\sin^2+\cos^2=1`), `\text{Ch 4: solving}` (dots repeating along a period), `\text{Ch 5: laws + limit}` (the hole-in-the-graph dot). Scale the chain to fit the frame width with `\to` arrows between links.

**Beat b**
Narration: This chapter derived both triangle laws and the area formula, and sine theta over theta handed trigonometry to calculus. Next, the full course diagnostic, one question per chapter. Then calculus, starting with limits.

Visuals: Fade the chain upward and list four recap lines: `\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}`, `a^2 = b^2 + c^2 - 2bc\cos A`, `\text{Area} = \tfrac12 ab\sin C`, `\lim_{\theta\to0}\frac{\sin\theta}{\theta} = 1`. End card: `Text("Next: 5.7 Full-Course Diagnostic, then Calculus, Chapter 1: Limits")`.

---

## Review log

Word count after revision: 969 narration words in 41 beats (was 1005 in 37 beats), so each beat averages about 23 words.

**Coverage gaps**
1. 5.1 AAS/ASA not named: fixed. Scene 2 beat d names "A A S or A S A" with an on-screen caption list, and Scene 3 beat b calls the river example "the A S A case", with an `ASA` tag on screen.
2. 5.2 angle-sum check never eliminates anything: fixed. New Scene 5 beat c uses the content's quiz case (A = 70, sine B = 0.9, B about 64.2 or 115.8, 70 + 115.8 = 185.8), with a coral cross over B'. Checked: arcsin 0.9 = 64.16 degrees, 180 - 64.16 = 115.84.
3. 5.2 "for acute A" missing: fixed. Scene 4 beat b opens with "For an acute angle A", and new beat e titles the list "The four outcomes (acute A)" and says "So for acute A".
4. 5.4 why the turn is 90 degrees, and the table's area row: fixed. Scene 8 beat e says "The bearings differ by ninety, so the turn is a right angle" and shows `140 - 50 = 90`. Beat d now narrates "Area, one half A B sine C, or Heron."
5. 5.4 C = 90 recovers half base times height: fixed. Scene 8 beat b narration and a MathTex line at the peak.
6. 5.5 radians reason, "not 1", theta-cubed: fixed. Scene 9 beat d gives the contrast with one and the arc-length reason. New beat e restores the theta-cubed error size (the 5.6 quiz cites it). Optics/surveyor uses are still dropped (the reviewer called this acceptable).
7. 5.6 split not tied to Ch 3.3: fixed. Scene 10 beat b narration names the angle sum formula, and the visual shows the actual split with a "angle sum, Ch 3.3" tag. The optional link to the limits chapter's (x squared - 4)/(x - 2) example was left out to stay under the word cap.
8. 5.7 six-line chain leaves out Ch 3 and Ch 4: fixed. Scene 11 beat a chain now has six links, Ch 0 to Ch 5, including identities and solving, to match "The whole course in six lines". Beat b says the diagnostic is one question per chapter.

**Issues**
1. (major) TTS case ambiguity: fixed. Added a "Letter convention in narration" note to the header. Narration always writes capital letters with "side", "angle" or "corner" in front ("side A over sine A", "side B times sine A"), or uses a context with only one reading (sine is always of an angle). A lowercase "a" was deliberately not written in narration, because Samantha reads a lone "a" as the article "uh". After a formula is introduced, bare letters in formula readouts (for example "B squared plus C squared", "two B C cosine A") are unambiguous because they only appear as squared or multiplied side lengths.
2. (major) Pacing and word count: fixed. Narration cut from 1005 to 969 words while adding the counter-case, radians reason, bearings reason, AAS/ASA and acute-A content. Old Scene 4 beat c is now split into beat c (two triangles) and beat d (one triangle, a at least b), and the four-case list has its own beat e. The Scene 8 ship example is down to 41 words, and Scene 1 beat a and Scene 3 are shortened. The global style adds `self.wait(1.5)` holds after every boxed result, and each boxed beat says "Hold 1.5 s". The crossed-out right triangle in Scene 1 is kept, because it is a quick silent visual behind the "had a right angle" line, and it is specified per the minor fix below.
3. (major) Scene 5 check never eliminates anything: fixed (see coverage gap 2).
4. (major) Scene 9 beat d non sequitur: fixed. The beat now gives the contrast with one and the arc-length reason. The pendulum moves to its own beat e with the error size.
5. (major) Scene 8 beat b overflow: fixed. The triangle is scaled by 0.55 with vertex C at (-4,-2) and b = 2.2, so the sweep from 20 to 160 degrees keeps the apex within x in [-6.1,-1.9]. Checked: -4 + 2.2 cos 160 = -6.07. The plot sits on the right half (origin near (1.2,-2), x_length 5) and plots the true area 12 sine C with y_range [0,13].
6. (minor) Scene 9 beat b zoom labels: fixed. Labels fade out before the zoom. The zoom target is `circle.point_at_angle(0.1)`, about (2.985, 0.30). The visual states where the arc and the height segment each run. Beat c and beat d restore the camera.
7. (minor) Scene 8 beat e unit and bearing reason: fixed.
8. (minor) Scene 4 acute A, hinge length, arc overflow: fixed. Acute-A wording added. The hinged segment has length 4, starts horizontal and rotates by -PI/2. Only lower-half arcs are drawn. Crossings checked for C = (-0.32, 1.09) and h = 3.09: r = 4 gives x = -2.86 and 2.22, both right of A = -4 (two triangles); r = 5.5 gives x = 4.23 and -4.87 (the second is behind A).
9. (minor) Scene 5 beat b overlap: fixed. The triangles are drawn overlapped on purpose (blue and coral, sharing AC) as in Scene 4, at scale 0.35 with larger labels.
10. (minor) Scene 8 beat d silent row and Pythagoras: fixed.
11. (minor) Scene 10 angle-sum source, the lim subscript and green: fixed. The subscript `\lim_{\theta\to0}` is added. The final radians line is teal, and the global palette defines green `#a6e3a1` for the check marks used in Scene 5.
12. (minor) Scene 9 beat a table: fixed. It is now `MathTable` at 0.6 scale, with the header first, then one row every 1.5 to 2 seconds, and the wide entry shortened to 0.000999999. The narration now covers the 0.5 row. The 0.01 row appears silently between spoken rows, which the direction notes.
13. (minor) Scene 3 beat a river band: fixed. It is a translucent Rectangle from y = -1.7 to 0.1 at z_index -1, with A and B on the bank at y = -2 and R at y = 0.41 just above it.
14. (minor) Scene 1 title and right triangle: fixed. The title card uses the full chapter title. The right triangle is shown alone at center at the given vertices, crossed out and faded before the scalene triangle is drawn.
