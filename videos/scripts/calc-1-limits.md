# Explainer Video Script: calc-1-limits

- **Course:** Calculus
- **Chapter:** Chapter 1 · Limits: The Art of Getting Close
- **Chapter id:** calc-1-limits
- **Target runtime:** about 6 to 6.5 minutes (1033 spoken words)

**Learning goal.** Chapter 0 ended on a wall: the slope of x squared at a single point came out as zero over zero. This video shows the way past it. A limit asks what value we close in on, not what value sits at the point. By the end, the viewer should be able to:
- read a limit from a two-sided approach;
- tell a limit apart from the function's value;
- use one-sided limits;
- name the three ways a limit can fail;
- triage a limit by plugging in, and use algebra on zero over zero;
- find long-run limits at infinity;
- check continuity with the three-condition checklist, and use the Intermediate Value Theorem;
- see the epsilon-delta contract behind "closes in on";
- use a limit to get the exact slope of x squared, which is the derivative.

**Global style (all scenes).**
- Background #0F1117. Main curve color BLUE_C, highlights YELLOW, "approach" markers GREEN, "value at the point" markers RED/ORANGE.
- Open circles are `Circle(radius=0.08, stroke_width=3, fill_opacity=0)` in the curve color. Filled dots are `Dot(radius=0.08)`.
- Each scene opens with its lesson tag in the top-left corner (`Text("1.x · Title", font_size=24)`, GREY_B) and ends on a blank frame with `FadeOut(*self.mobjects)`.
- All equations are `MathTex`. Any `MathTex` that is transformed or has parts struck out is built with `substrings_to_isolate` (listed per beat). Cancelled factors are found with `get_parts_by_tex` before the strike `Line`s are drawn. `TransformMatchingShapes` is the fallback if `TransformMatchingTex` mismatches glyphs.
- Unicode Greek letters (ε, δ) go only in `Text`, never in `Tex`/`MathTex`. In LaTeX, use `$\varepsilon$` and `$\delta$`.
- Keep all objects inside x in [-7, 7], y in [-3.9, 3.9].

---

## Scene 1: The instant problem (Lesson 1.1, intro)

**Beat a**
Narration: A speed camera snaps your car. The ticket says sixty two kilometres per hour. How can a car have a speed at a single instant?

Visuals:
- A title card `Text("Limits: The Art of Getting Close", font_size=44)` fades in, moves to the top edge, then fades out.
- A simple car is built from primitives: a `RoundedRectangle(width=2, height=0.7)` body and two `Circle(radius=0.25)` wheels, placed at left on a horizontal `Line` road.
- The car slides right (`shift(RIGHT*4)`, 1.5 s).
- A white `Rectangle` "flash" briefly fills the frame (opacity 0.8 to 0), and the car freezes.
- `Text("62 km/h", color=YELLOW)` appears above the car inside a small `SurroundingRectangle`.

**Beat b**
Narration: Chapter zero hit this wall: push two points on x squared together, and the slope becomes zero over zero.

Visuals:
- Clear the car.
- Show `MathTex(r"\frac{f(2) - f(2)}{2 - 2} = \frac{0}{0}")` centered, font_size 60, then `Indicate` the `\frac{0}{0}` part in RED.
- Below it, write `Text("What value are we closing in on?", font_size=32, color=YELLOW)`.

---

## Scene 2: The idea of a limit (Lesson 1.1)

**Beat a**
Narration: f of x equals x squared minus four, over x minus two. Plugging in two gives zero over zero, so sneak up on two from both sides.

Visuals:
- `MathTex(r"f(x) = \frac{x^2 - 4}{x - 2}")` at the top.
- `Axes(x_range=[-1,5,1], y_range=[0,8,1], x_length=6, y_length=4.5)`, shifted `LEFT*2.5` and slightly down, with labels.
- Plot the line y = x + 2 on [-1, 5] (this is the graph of f) in BLUE_C.
- Put an open circle at (2, 4) for the hole, and a dashed GREY vertical line at x = 2.

**Beat b**
Narration: From the left: three point nine, three point nine nine. From the right: four point one, four point zero one. Both sides close in on four.

Visuals:
- Two GREEN `Dot`s ride the line, each driven by a `ValueTracker`. One moves from x = 1 to x = 1.8, the other from x = 3 to x = 2.2. They stop there, visibly short of the hole.
- `Arrow`s are drawn from each dot to the open circle, which pulses (`Indicate`, YELLOW).
- On the right side of the frame, two stacked table blocks fill in row by row, all `MathTex` at font_size 28. Each block has columns `x` and `f(x)`.
  - "from the left" (GREEN header): 1.9 → 3.9, 1.99 → 3.99, 1.999 → 3.999.
  - "from the right" (ORANGE header): 2.1 → 4.1, 2.01 → 4.01, 2.001 → 4.001.
- The tables carry the 1.999 and 2.001 values; the dots do not travel that far.

**Beat c**
Narration: There's a hole at two, but the limit is four: the value f of x closes in on as x approaches the point a, from both sides, without x ever equalling a.

Visuals:
- Fade the tables.
- Show the definition box at the bottom: `Tex(r"Limit (informal): the value $f(x)$ closes in on as $x \to a$, from both sides, never equal to $a$", font_size=28)` in a YELLOW `SurroundingRectangle`.
- Keep the box and `Write` `MathTex(r"\lim_{x \to 2} \frac{x^2 - 4}{x - 2} = 4")` just above it, with the `4` in YELLOW.

**Beat d**
Narration: Tables work where plugging in can't. As x approaches zero, the sine of x, divided by x, in radians, squeezes in on one.

Visuals:
- Clear the graph.
- `MathTex(r"\lim_{x \to 0} \frac{\sin x}{x} = \,?")` at the top, with a small `Text("x in radians", font_size=22)` under it.
- A table with columns `x` and `\frac{\sin x}{x}` fills row by row: -0.5 → 0.9589, -0.1 → 0.9983, -0.01 → 0.99998, 0.01 → 0.99998, 0.1 → 0.9983, 0.5 → 0.9589.
- The two middle rows glow YELLOW, and the `?` transforms to `1`.

---

## Scene 3: Limits don't care about the point (Lesson 1.2)

**Beat a**
Narration: Here's the key misconception: the limit ignores the value at the point. Give this function the value one at two.

Visuals:
- `MathTex(r"g(x) = \begin{cases} \dfrac{x^2 - 4}{x - 2} & x \ne 2 \\ 1 & x = 2 \end{cases}")` at top-left, font_size 36.
- The same axes as Scene 2 (x in [-1, 5], y in [0, 8]), with the line y = x + 2 and an open circle at (2, 4).
- A RED filled `Dot` at (2, 1) drops in with `FadeIn(shift=DOWN)`.

**Beat b**
Narration: The outputs still march to four. The limit is four; g of two is one. Move the dot anywhere; the limit stays four.

Visuals:
- Two GREEN dots slide along the line toward the open circle from each side, as in Scene 2.
- Show `MathTex(r"\lim_{x \to 2} g(x) = 4 \qquad \text{but} \qquad g(2) = 1")` at the bottom, with the `4` in GREEN and the `1` in RED.
- Animate the RED dot moving up to y = 7.9. Its label changes to `g(2)=100`, with an arrow pointing up off the scale.
- The `4` pulses and stays unchanged.

**Beat c**
Narration: Three situations: a nice point, a hole, and a relocated dot.

Visuals:
- Clear. Show three small side-by-side axes, each `Axes(x_range=[0,4], y_range=[0,6], x_length=3.5, y_length=2.6)`, captioned "Nice point", "Hole" and "Relocated dot".
- Panel 1: the curve y = x squared on [0, 2.4], with a filled dot at (2, 4).
- Panel 2: the line y = x + 2 on [0, 3.5], with an open circle at (2, 4).
- Panel 3: the same line with an open circle at (2, 4), plus a RED dot at (2, 1).
- Under each panel, a `MathTex` row: `f(a)=4,\ \lim=4`, `f(a)\ \text{undefined},\ \lim=4` and `f(a)=1,\ \lim=4`. The tables and panels carry the detail here.

---

## Scene 4: One-sided limits (Lesson 1.3)

**Beat a**
Narration: A parking garage charges fifty rupees up to an hour, then eighty. At the hour mark, direction matters.

Visuals:
- A staircase step graph on `Axes(x_range=[0,2,0.5], y_range=[0,100,20], x_length=6, y_length=3.5)`, with axis labels `Text("hours")` and `Text("price (₹)")`.
- A horizontal segment at y = 50 on [0, 1] ends in an open circle. A segment at y = 80 on [1, 2] starts with a filled dot.
- A GREEN arrow along the lower step points right, labeled `50`. An ORANGE arrow along the upper step points left, labeled `80`.

**Beat b**
Narration: A small minus means from the left; a small plus, from the right. Along x plus one, the left heads to two. Along four minus x, the right heads to three.

Visuals:
- Transition to `MathTex(r"\lim_{x \to a^-} f(x) \quad \lim_{x \to a^+} f(x)")` at the top, with the minus in GREEN and the plus in ORANGE.
- New `Axes(x_range=[-2,4,1], y_range=[-1,5,1], x_length=6.5, y_length=4)`.
- Plot y = x + 1 on [-2, 1] in GREEN, ending in an open circle at (1, 2). Plot y = 4 - x on [1, 4] in ORANGE, starting with a filled dot at (1, 3).
- Two dots slide toward x = 1 from each side.
- Then show `MathTex(r"\lim_{x \to 1^-} f(x) = 2 \qquad \lim_{x \to 1^+} f(x) = 3")`.
- Keep this graph as a mobject (`jump_graph`) so Scene 5 and Scene 10 can reuse it.

**Beat c**
Narration: Both sides must agree for the two-sided limit to exist. Two is not three, so it does not. Not the average. And f of one is three: the value exists, the limit does not.

Visuals:
- `MathTex(r"2 \ne 3")` appears, then `MathTex(r"\lim_{x \to 1} f(x)\ \text{does not exist}")` in RED.
- A `Cross` briefly overlays a ghost label "2.5 (average)".
- On "f of one is three", the filled dot at (1, 3) pulses ORANGE (`Indicate(color=ORANGE)`, scale 1.6). Next to it, show `MathTex(r"f(1) = 3 \ \checkmark", color=ORANGE)`, while the RED "does not exist" line stays on screen.

**Beat d**
Narration: But a boundary isn't automatically a jump. x squared on the left and six minus x on the right both reach four at two. The limit is four.

Visuals:
- Clear the graph.
- `MathTex(r"f(x) = \begin{cases} x^2 & x < 2 \\ 6 - x & x \ge 2 \end{cases}")` at top-left.
- `Axes(x_range=[0,4,1], y_range=[0,6,1])`. Plot x squared on [0, 2] and 6 - x on [2, 4]. They meet at (2, 4), marked with a YELLOW dot.
- Show `MathTex(r"2^2 = 4 \qquad 6 - 2 = 4")`, then `MathTex(r"\lim_{x \to 2} f(x) = 4")`.

---

## Scene 5: When limits fail (Lesson 1.4)

Build this scene as a `MovingCameraScene` (the zoom is in beat c).

**Beat a**
Narration: Limits fail in exactly three ways. First, the jump, like the parking garage: each side settles, but on different values.

Visuals:
- Three labelled cards appear as a column on the left: "1. Jump", "2. Blow-up" and "3. Oscillation" (`Text`, font_size 30).
- "1. Jump" highlights YELLOW. Next to it, show a thumbnail of the Scene 4 beat b graph (`jump_graph.copy().scale(0.45)`). Its two ends pulse: GREEN at the open circle (1, 2), ORANGE at the filled dot (1, 3).

**Beat b**
Narration: Second, the blow-up. One over x squared near zero gives one, four, a hundred, ten thousand. Equals infinity names a failure, not a number. One over x is worse: its sides run to opposite infinities.

Visuals:
- At the start of the beat, fade out the jump thumbnail and move the highlight to "2. Blow-up".
- On the right, `Axes(x_range=[-3,3,1], y_range=[0,20,5], x_length=6, y_length=4)`. Plot 1/x squared on [-3, -0.23] and [0.23, 3], with a dashed RED vertical line at x = 0.
- The numbers `1, 4, 100, 10000` pop up one by one near the top.
- Show `MathTex(r"\lim_{x \to 0} \frac{1}{x^2} = \infty")` with a small note `Text("= a way of failing", font_size=24, color=RED)` below it.
- On the last sentence, replace the axes with y_range [-7, 7] and the curve with 1/x on [-3, -0.15] and [0.15, 3]. Draw the right branch in ORANGE going up and the left branch in GREEN going down.
- Show `MathTex(r"\lim_{x \to 0^-} \frac{1}{x} = -\infty \qquad \lim_{x \to 0^+} \frac{1}{x} = +\infty")`.

**Beat c**
Narration: Third, oscillation: the sine of the quantity one over x. As x shrinks, it swings ever faster between minus one and one, never settling.

Visuals:
- "3. Oscillation" highlights, then fade out the cards and the lesson tag.
- Centered `Axes(x_range=[-1.2,1.2,0.4], y_range=[-1.5,1.5,0.5], x_length=10, y_length=5)`.
- Plot sin(1/x) on [0.02, 1.2] and [-1.2, -0.02] with `use_smoothing=False`, in BLUE_C:
  - step 0.00005 on |x| in [0.02, 0.1];
  - step 0.002 on |x| in [0.1, 1.2].
- Add two dashed horizontal lines at y = 1 and y = -1.
- Zoom: animate `self.camera.frame.animate.set(width=1.5).move_to(axes.c2p(0, 0))` over 3 s. During the zoom, a second, denser plot of sin(1/x) on [0.005, 0.2] and [-0.2, -0.005] (step 0.00002, stroke_width 1.5) fades in, so new wiggles keep appearing and no gap shows.
- `Text("still swinging from -1 to 1", font_size=24, color=YELLOW)` is placed relative to the zoomed frame (sized for a width of 1.5, which is about font_size 5 after scaling, or `.scale(0.12)`).
- Restore the camera frame (`Restore`) before the scene clears.

---

## Scene 6: The limit laws and triage (Lesson 1.5)

**Beat a**
Narration: Limits respect arithmetic: sums, differences, products, multiples and quotients pass through, as long as the bottom limit isn't zero.

Visuals:
- A left-aligned table (a `VGroup` of `MathTex` rows) appears row by row: `\lim [f+g] = L + M`, `\lim [f-g] = L - M`, `\lim [f \cdot g] = L \cdot M`, `\lim c f = cL` and `\lim \frac{f}{g} = \frac{L}{M},\ M \ne 0`.
- The `M \ne 0` part is YELLOW.

**Beat b**
Narration: Plug in first: x squared plus three x minus one, at two, is simply nine. A number is the answer. Nonzero over zero is a blow-up. Zero over zero means algebra needed.

Visuals:
- `MathTex(r"\lim_{x \to 2} (x^2 + 3x - 1) = 2^2 + 3(2) - 1 = 9")`, shown while its sentence plays.
- Clear, then draw a three-row triage chart.
  - Left column: `a number`, `\frac{\text{nonzero}}{0}` and `\frac{0}{0}`.
  - Right column: "the limit, done" (GREEN), "blow-up" (RED) and "algebra needed" (YELLOW).
  - Arrows connect each row.

**Beat c**
Narration: Try x cubed minus two x plus one, over x plus three, at two. Bottom five, safe. Top five too. The limit is one.

Visuals:
- `MathTex(r"\lim_{x \to 2} \frac{x^3 - 2x + 1}{x + 3}")`.
- Underline the denominator and show `2 + 3 = 5 \ne 0` with a GREEN check.
- Show `2^3 - 2(2) + 1 = 5` under the numerator.
- Transform the whole into `= \frac{5}{5} = 1`.

---

## Scene 7: The zero over zero puzzle (Lesson 1.6)

**Beat a**
Narration: Zero over zero is a disguise. x squared minus four factors into x minus two, times x plus two. Cancel the shared factor, and x plus two goes to four.

Visuals:
- `MathTex(r"\lim_{x \to 2} \frac{x^2 - 4}{x - 2}")`, then `TransformMatchingTex` to `\lim_{x \to 2} \frac{(x-2)(x+2)}{x - 2}`. Use `substrings_to_isolate=["(x-2)", "(x+2)", "x - 2"]`.
- Both `(x-2)` factors (via `get_parts_by_tex`) highlight RED, then each gets a strike `Line` and fades.
- Result: `= \lim_{x \to 2} (x + 2) = 4`.

**Beat b**
Narration: Cancelling is legal, because the limit never lets x equal two.

Visuals:
- Small axes with the line y = x + 2 and an open circle at (2, 4), then the same line with the circle filled in (a morph).
- A caption `Text("same everywhere except x = 2", font_size=26)`.

**Beat c**
Narration: Square roots call for the conjugate. Take the square root of the quantity x plus four, minus two, all over x, as x approaches zero. Multiply top and bottom by the square root of x plus four, plus two. The top becomes x, which cancels, leaving one over the quantity square root of x plus four, plus two. At zero, one quarter.

Visuals:
- `MathTex(r"\lim_{x \to 0} \frac{\sqrt{x+4}-2}{x}")`, then `\to \frac{0}{0}` in RED.
- `\frac{\sqrt{x+4}-2}{x} \cdot \frac{\sqrt{x+4}+2}{\sqrt{x+4}+2}`.
- Transform to `\frac{x+4-4}{x(\sqrt{x+4}+2)}` (the matching step in the content), then to `\frac{x}{x(\sqrt{x+4}+2)}`.
- Cancel the x's with a RED strike (isolate `"x}"` pieces with `substrings_to_isolate`, or index the submobjects directly).
- Then `\frac{1}{\sqrt{x+4}+2} \to \frac{1}{2+2} = \frac{1}{4}`, with `\frac{1}{4}` in YELLOW. Use `TransformMatchingShapes` for the steps.

**Beat d**
Narration: x squared plus x minus two, over x squared minus one, shares the culprit x minus one. Cancel it, and the limit at one is three halves.

Visuals:
- `MathTex(r"\lim_{x \to 1} \frac{x^2 + x - 2}{x^2 - 1}")` → `\frac{(x+2)(x-1)}{(x-1)(x+1)}`. Use `substrings_to_isolate=["(x-1)", "(x+2)", "(x+1)"]`.
- Both `(x-1)` factors turn RED and are struck out.
- → `\lim_{x \to 1} \frac{x+2}{x+1} = \frac{3}{2}`.

---

## Scene 8: Limits at infinity (Lesson 1.7)

**Beat a**
Narration: Now let x run forever. Coffee in a twenty degree room closes in on twenty but never reaches it: a horizontal asymptote.

Visuals:
- `Axes(x_range=[0,10,2], y_range=[0,90,20], x_length=7, y_length=4)`, with x label `t` and y label `T`.
- Plot 20 + 60 e^(-x) on [0, 10] with `Create` (2.5 s).
- A dashed YELLOW `DashedLine` at y = 20.
- `MathTex(r"\lim_{t \to \infty} T(t) = 20")` at top-right.

**Beat b**
Narration: Dividing by something huge gives something tiny, so only the heaviest terms matter. Three x squared plus x, over x squared plus one, goes to three.

Visuals:
- Clear the graph and show `MathTex(r"\lim_{x \to \infty} \frac{1}{x} = 0")`.
- Then build `MathTex(r"\lim_{x \to \infty} \frac{3x^2 + x}{x^2 + 1} = \lim_{x \to \infty} \frac{3 + \frac{1}{x}}{1 + \frac{1}{x^2}} = \frac{3 + 0}{1 + 0} = 3")` in stages.
- The `\frac{1}{x}` and `\frac{1}{x^2}` terms flash, then fade to `0`.

**Beat c**
Narration: Bottom heavier, the limit is zero. Equal degrees, it's the ratio of leading coefficients. Top heavier, the outputs run away.

Visuals:
- Three small axes side by side, all with `y_range=[0,6,2]`, `x_length=3.5` and `y_length=2.4`.
- Panel 1: `x_range=[0,20,5]`, plot (5x + 1)/(x^2 + 3) on [0, 20]. It peaks near 1.6 and then hugs y = 0.
- Panel 2: `x_range=[0,20,5]`, plot (3x^2 + x)/(x^2 + 1) on [0, 20], with a dashed line at y = 3.
- Panel 3: its own `x_range=[0,8,2]`, plot (x^3 + 1)/(x^2 + 1) on [0, 6.1], where it reaches about 5.97, the top of the panel. It ends with a short upward YELLOW `Arrow` at the top edge.
- Captions are `Text` at font_size 22: "bottom heavier → 0", "equal → 3 (ratio)" and "top heavier → ∞".

---

## Scene 9: Continuity (Lesson 1.8)

**Beat a**
Narration: f is continuous at a when there's no surprise: f of a exists, the limit exists, and they are equal.

Visuals:
- A checklist box with `Tex(r"1. $f(a)$ exists")`, `Tex(r"2. $\lim_{x \to a} f(x)$ exists")` and `Tex(r"3. $\lim_{x \to a} f(x) = f(a)$")`.
- Each item appears with a GREEN check mark.

**Beat b**
Narration: A hole is removable: move one dot. A jump can't be fixed that way; a blow-up has no finite limit.

Visuals:
- Three mini panels under the checklist, reusing earlier shapes:
  - "Hole (removable)": an open circle that a YELLOW dot flies into and fills.
  - "Jump": x + 3 for x < 0, ending in an open circle at (0, 3), and x squared for x ≥ 0, starting with a filled dot at (0, 0).
  - "Infinite": 1/x squared.
- Under "Jump", a dot tries both heights, 3 and 0, and gets a RED cross each time.

**Beat c**
Narration: The payoff is the Intermediate Value Theorem. If f is continuous from a to b, it hits every height between f of a and f of b. So if f of one is negative and f of two is positive, a root lies between one and two.

Visuals:
- Clear. `Axes(x_range=[0,4,1], y_range=[0,4,1], x_length=6, y_length=4)`.
- Plot f(x) = 0.8 + 2.6*s**2*(3 - 2*s), with s = (x - 0.3)/3.4, on [0.3, 3.7] with `Create`. It rises smoothly from (0.3, 0.8) to (3.7, 3.4).
- Mark `a` at x = 0.3 and `b` at x = 3.7 on the x-axis, and `f(a)` at y = 0.8 and `f(b)` at y = 3.4 on the y-axis, with short dashed GREY guide lines.
- A dashed YELLOW horizontal line at y = 2 crosses the curve at x = c ≈ 1.913 (solve numerically by bisection). A YELLOW dot marks the crossing, and a vertical dashed line drops to the x-axis, labeled `c`.
- `Text("IVT", color=YELLOW)` at top-right.
- On the root sentence: fade the curve and draw a small inset `Axes(x_range=[0,3,1], y_range=[-2,2,1], x_length=3, y_length=2.2)` with y = x squared minus 2 on [0.5, 2.5]. Mark a RED dot at (1, -1), labeled `f(1)<0`, and a GREEN dot at (2, 2), labeled `f(2)>0`. A YELLOW dot sits where the curve crosses y = 0 (x = √2 ≈ 1.414), with `MathTex(r"\text{root in } (1, 2)")`.

**Beat d**
Narration: But the jumping parking fee is never sixty five rupees. Now x squared left of one, two minus x from one on: value one, limit one. Continuous, corner and all.

Visuals:
- A small staircase inset (steps at 50 and 80) with a dashed line at 65 that crosses no point, marked with a RED cross. Clear it.
- `MathTex(r"f(x) = \begin{cases} x^2 & x < 1 \\ 2 - x & x \ge 1 \end{cases}")`.
- Axes with x in [-1, 3] and y in [-1, 2]. Plot both pieces, meeting at (1, 1), marked with a filled dot.
- The three checklist lines reappear on the right and tick GREEN one by one.

---

## Scene 10: How close is close enough? (Lesson 1.9)

**Beat a**
Narration: So far we leaned on the words, closes in on. That's a feeling, not a definition. Machinists use tolerances: eighty millimetres, give or take one tenth of a millimetre.

Visuals:
- A ring drawn as two concentric `Circle`s, labeled `Text("80 mm ± 0.1 mm")`.
- Below it, a horizontal number line segment with a YELLOW shaded band from 79.9 to 80.1.

**Beat b**
Narration: Limits work the same way. A skeptic demands outputs within epsilon of L. You answer with a delta around a, for every demand.

Visuals:
- Clear. `Axes(x_range=[-0.5,2.5,0.5], y_range=[-0.5,4,1], x_length=6, y_length=4)`. Plot x squared and mark the point (1, 1).
- A horizontal YELLOW translucent band `Rectangle` of half-height epsilon around y = 1.
- A vertical GREEN translucent band of half-width delta around x = 1. Compute delta in code as `delta = min(np.sqrt(1+eps) - 1, 1 - np.sqrt(1-eps)) if eps < 1 else np.sqrt(2) - 1`, which equals sqrt(1+eps) - 1.
- Animate epsilon shrinking through 1, 0.5, 0.25 and 0.1. Each time, the green band narrows to the exact delta: 0.414, 0.225, 0.118 and 0.0488.
- The part of the curve inside the green band is drawn thicker and visibly stays inside the yellow band.
- `Text("ε")` and `Text("δ")` labels on the bands, and a small `DecimalNumber` readout of each.

**Beat c**
Narration: Formally: for every epsilon, there is a delta. And the point itself is exempt.

Visuals:
- `MathTex(r"\forall \varepsilon > 0\ \exists \delta > 0:\ 0 < |x - a| < \delta \implies |f(x) - L| < \varepsilon")` at the bottom, font_size 34.
- The `0 <` part flashes RED, with a note `Text("the point itself is exempt", font_size=24)`.

**Beat d**
Narration: Now catch a liar. Claim: our one-sided example has limit two at the jump. Demand epsilon one half. Every window holds right-side outputs near three, outside the band. No delta works.

Visuals:
- Clear. Bring back the Scene 4 beat b graph (`jump_graph`: y = x + 1 on [-2, 1] with an open circle at (1, 2), and y = 4 - x on [1, 4] with a filled dot at (1, 3)).
- `MathTex(r"\text{Claim: } \lim_{x \to 1} f(x) = 2, \quad \varepsilon = 0.5")` at the top.
- A YELLOW translucent horizontal band from y = 1.5 to y = 2.5.
- A GREEN vertical window around x = 1 shrinks through half-widths 0.5, 0.2 and 0.05. Each time, the right-side part of the curve inside the window (outputs about 2.5 to 3) flashes RED as it sits outside the yellow band, with a small RED dot sampled at x = 1 + half-width/2.
- End with the claim struck through by a RED `Line` and `Text("no δ works", color=RED, font_size=28)`.

**Beat e**
Narration: For four x near one, a demand of point two gets delta point zero five: four x stretches distances by four.

Visuals:
- Clear. `MathTex(r"\lim_{x \to 1} 4x = 4, \quad \varepsilon = 0.2")`, then `4\delta \le 0.2`, then `\delta = 0.05` in GREEN.
- A quick graph of y = 4x on [0.8, 1.2] with the matching bands (yellow y in [3.8, 4.2], green x in [0.95, 1.05]).

---

## Scene 11: From limits to derivatives (Lesson 1.10)

**Beat a**
Narration: Now the payoff. Call the gap between two points on x squared h. The slope at two is the limit of secant slopes as h goes to zero.

Visuals:
- `Axes(x_range=[0,4,1], y_range=[0,10,2], x_length=6, y_length=4)` and plot x squared.
- A fixed point P at (2, 4), and a second point Q at (2 + h, (2 + h) squared) driven by a `ValueTracker` h starting at 1.0, so Q = (3, 9).
- The secant is an `always_redraw` of `axes.plot(lambda x: 4 + m*(x - 2), x_range=[x0, x1])`, where m = 4 + h. Clip it to the part of [0, 4] where the line stays inside y in [0, 10]: `x0 = max(0, 2 - 4/m)` and `x1 = min(4, 2 + 6/m)`.
- A `Brace` along the x-axis between 2 and 2 + h, labeled `h`.
- Animate h to 0.05. The secant tilts into the tangent, and a slope label (`DecimalNumber`, starting at 5.00) shrinks toward 4.05.
- `MathTex(r"\text{slope at } 2 = \lim_{h \to 0} \frac{f(2+h) - f(2)}{h}")` at the top.

**Beat b**
Narration: It's zero over zero, so run the playbook. Expand, factor out h, cancel, plug in. The slope is exactly four.

Visuals:
- A chain of transforms, each `MathTex` built with `substrings_to_isolate=["h", "(4 + h)"]`, falling back to `TransformMatchingShapes`:
  - `\lim_{h \to 0} \frac{(2+h)^2 - 4}{h}`
  - → `\frac{4 + 4h + h^2 - 4}{h}`
  - → `\frac{h(4 + h)}{h}`. The leading `h` in the numerator and the `h` in the denominator are found by index or `get_parts_by_tex`, turn RED and are struck.
  - → `\lim_{h \to 0} (4 + h) = 4`, with the final `4` in YELLOW.

**Beat c**
Narration: At any x, the same moves give two x. This limit is the derivative, f prime of x.

Visuals:
- `MathTex(r"\frac{(x+h)^2 - x^2}{h} = \frac{h(2x + h)}{h} = 2x + h \to 2x")`.
- Then the definition in a YELLOW box: `MathTex(r"f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}")`.

---

## Scene 12: Recap and next chapter (Lessons 1.1 to 1.10)

**Beat a**
Narration: Recap. A limit is the value approached, not the value at the point. Both sides must agree. Limits fail by jumping, blowing up, or oscillating. Plug in, then use algebra. Long run, compare degrees. Continuity means value equals limit. Epsilon and delta make it precise. And secant slopes lead to the derivative.

Visuals: A vertical list of short items (font_size 30) appears one at a time, in step with the narration. Each item is tagged with its lesson number in GREY.
- `Text("approach, not the point (1.1, 1.2)")`
- `Text("both sides must agree (1.3)")`
- `Text("jump, blow-up, oscillation (1.4)")`
- `Text("plug in, then algebra (1.5, 1.6)")`
- `Text("long run: compare degrees (1.7)")`
- `Text("continuity: value = limit (1.8)")`
- `Tex(r"$\varepsilon$--$\delta$ contract (1.9)")`
- `Text("derivative = limit of secant slopes (1.10)")`

**Beat b**
Narration: Your speedometer is a limit-computing machine. Next up, Chapter two: Derivatives.

Visuals:
- The list fades. A simple speedometer dial (an `Arc` from 180° to 0°, tick marks, and a needle `Line` that swings to about 62) appears briefly on the left.
- `MathTex(r"f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}")` returns at center screen, then shrinks upward while `Text("Next: Chapter 2 · Derivatives", font_size=40, color=YELLOW)` fades in below.
- Hold 2 s, then fade to black.

---

## Review log

**Coverage gaps**
- **Lesson 1.9, "catch a liar".** Added Scene 10 beat d. It uses the content's own example: the 1.3 function (x + 1 / 4 - x) claimed to have limit 2 at x = 1, epsilon 0.5, band (1.5, 2.5), and right-side outputs near 3 falling outside it. The narration calls it "the one-sided example from before" rather than "the parking function", because the content applies the demo to the x + 1 / 4 - x function (outputs 2 and 3), not the rupee staircase (50 and 80). The old beat d became beat e.
- **Lesson 1.3, value vs limit.** Added "And yes, f of one is three. The value exists; the limit still does not." to Scene 4 beat c, with the ORANGE pulse on (1, 3).
- **Lesson 1.4, jump description.** Scene 5 beat a now says "like the parking garage: each side settles, but on different values", with a thumbnail of the Scene 4 graph.
- **Lesson 1.8, IVT root-finding.** Added to Scene 9 beat c: "if f of one is negative and f of two is positive, a root lives between one and two", with an inset of x squared minus 2 whose root is √2.
- **Lesson 1.1, speedometer tip.** It closes the video in Scene 12 beat b ("Your speedometer is a limit-computing machine."), next to the derivative formula. This echoes the Scene 1 speed-camera hook and the content's own speedometer line in 1.10.
- **Recap missing 1.7 and 1.10.** Both are now in the Scene 12a narration, and the list gained a 1.10 item.

**Issues**
1. **Scene 11a (major), Q off the axes.** h now starts at 1.0, so Q = (3, 9), inside y_range [0, 10]. The slope label starts at 5.00. The secant is an `axes.plot` clipped to the x-interval where it stays in [0, 10]. That is stricter than the reviewer's [0, 4]: at slope 5 over [0, 4] the line would reach y = 14.
2. **Scene 7c (major), unclear conjugate narration.** Rewritten as suggested: it says "as x approaches zero", uses "the quantity" phrasing, and gives the zero over zero check. Added the intermediate `\frac{x+4-4}{x(\sqrt{x+4}+2)}` step and a `\frac{1}{2+2}` step. Checked against the content: the conjugate gives x on top and 1/(√(x+4)+2) → 1/4.
3. **Scenes 2d and 5d (major), TTS ambiguity.** 2d now says "the sine of x, divided by x, with x in radians". 5d (now Scene 5 beat c) says "Take the sine of the quantity one over x". Radians are also shown on screen.
4. **Scene 10b, rounded-up deltas.** Verified: √1.25 − 1 = 0.118 and √1.1 − 1 = 0.0488, so the old 0.12 and 0.05 fail. Delta is now computed exactly in code (0.414, 0.225, 0.118, 0.0488), and the curve is shown staying inside the band.
5. **Scene 8c, panel 3 never leaves the frame.** Verified: f(5) ≈ 4.85 and f(6.1) ≈ 5.97. Panel 3 now has its own x_range [0, 8], is plotted on [0, 6.1], and ends in an upward arrow. Captions are shortened to font_size 22.
6. **Scene 5a, jump only named.** The narration now describes the jump and a Scene 4 thumbnail is shown. The "Blow-up" highlight moved to the start of beat b.
7. **Scene 4c, value vs limit.** Added (see the coverage gaps).
8. **Scene 10, "catch a liar" missing.** Added as beat d (see the coverage gaps).
9. **Scene 2b, zero-length arrows and cramped table.** The dots stop at 1.8 and 2.2, and the arrows run from there to the hole. Axes are x_length=6, shifted LEFT*2.5. The table is two stacked blocks at font_size 28.
10. **Scene 2c, messy transform and "equalling a".** The definition box is kept and the limit is `Write`n above it; no TransformMatchingTex. The narration now says "approaches the point a ... without x ever equalling a".
11. **Scene 5d, vague zoom and jagged plot.** Now a `MovingCameraScene` camera-frame zoom to width 1.5, with a denser second plot on 0.005 ≤ |x| ≤ 0.2 (step 0.00002) that fades in. The main plot's sampling is also densified near zero (step 0.00005, about 50 samples per period at x = 0.02).
12. **Scene 6b, example never narrated.** Added "x squared plus three x minus one, at two, is simply nine." Checked: 4 + 6 − 1 = 9.
13. **Scene 9c, no curve formula or theorem statement.** Specified y = 0.8 + 2.6 s²(3 − 2s), with s = (x − 0.3)/3.4. The crossing of y = 2 is at x ≈ 1.913, found by bisection. a, b, f(a) and f(b) are marked, and the narration now states the theorem. The "never sixty five rupees" line moved to 9d to balance beat length.
14. **Scene 12, narration/list mismatch and unicode ε–δ.** The narration now covers 1.7 and 1.10. List items are `Text`, except `Tex(r"$\varepsilon$--$\delta$ contract (1.9)")`, which avoids unicode in LaTeX. The global style also bans unicode Greek letters in Tex.
15. **Scene 10a, TTS problems.** Replaced with the reviewer's wording.
16. **Scenes 11b, 7a and 7d, TransformMatchingTex fragility.** Added `substrings_to_isolate` lists per beat, `get_parts_by_tex` indexing for strikes, and a `TransformMatchingShapes` fallback, also stated in the global style.
17. **Runtime over the word ceiling.** Scene 3c is shortened to one sentence. Scene 5c is folded into 5b as one sentence. Scene 11c is cut to "At any x, the same moves give two x." Then the whole script was tightened beat by beat. The fixes added about 190 words (liar demo, value vs limit, jump description, IVT statement and root-finding, 7c rewrite, recap additions, speedometer). The net count is 1033 words. That is about 2% over the 1000 ceiling, in exchange for covering every requested item. At Samantha's default rate of about 170 to 180 wpm, it runs about 6 minutes of speech, or about 6.5 minutes with animation holds, inside the 4 to 7 minute target. The Scene 9c "exactly one metre tall" example was dropped in favour of the content's root-finding use case, which the reviewer requested.
