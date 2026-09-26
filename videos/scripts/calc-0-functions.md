# calc-0-functions — Explainer Video Script

- **Course:** Calculus
- **Chapter:** Chapter 0 · Functions: The Language of Calculus
- **Chapter id:** calc-0-functions
- **Target runtime:** about 6.5 to 7 minutes (under 1000 spoken words at Samantha's default rate, plus animation pauses)

**Learning goal.** The viewer should come away seeing a function as a machine that takes one input, applies a rule, and gives exactly one output. They should be able to evaluate function notation by substituting the whole input, parentheses included, and find a domain by checking for division by zero and even roots of negatives. They should read a graph in both directions, describe how a function changes by looking at its change column, and decode shifts, stretches and flips, including the backwards horizontal shift. They should recognize the common function families, compose functions as a pipeline from the inside out, and evaluate piecewise rules by first checking which condition holds. The video ends at the question the chapter builds toward: the secant slope gives average change, but at a single point it collapses to zero over zero, and that is why Chapter 1 is about limits.

**Global style for Manim (v0.21, 2D, 16:9):** dark background `#1e1e2e`. Primary curve color BLUE, secondary curve color ORANGE, highlight color YELLOW. RED is reserved for "wrong" and GREEN for "right"; neither is used for anything else (for example, not for increasing or decreasing). Every equation is `MathTex`, every label is `Text` (font size 28 to 36). Axes use `Axes(..., axis_config={"include_numbers": True})`.

- **Persistent header:** from Scene 1 beat a until Scene 12 beat b, a small chapter header `Text("Chapter 0 · Functions")` (scale 0.5) sits in the top-left corner. At the end of each scene, `FadeOut` everything on screen **except this header**. Keep every scene's content below y = 3.2 so it never overlaps the header.
- **Currency:** do not use the rupee glyph (font support is unreliable). Write fares as `Text("Rs 65")` and so on. The narration still says "rupees".
- **Curve clipping:** Manim does not clip plots to the Axes box. Every `axes.plot` call must pass an explicit `x_range` so that y stays inside that axes' `y_range`. The bounds are given per scene below. For curves driven by a `ValueTracker`, recompute the bounds inside `always_redraw`.
- **Addressable TeX:** whenever a beat colors, boxes or transforms a specific symbol, build the `MathTex` from separate substrings (or use `substrings_to_isolate`) so that the symbol is its own submobject. Never index glyphs of a single long string.

---

## Scene 1 — Title and the taxi (Lesson 0.1)

**Beat a**

Narration: Welcome to Chapter Zero: functions, the language of calculus.

Visuals: `Text("Chapter 0 · Functions")` large at center, with the subtitle `Text("The Language of Calculus")` below it. Write both and hold for 1.5 seconds (the narration ends here; the taxi starts in beat b). Then move the title to the top-left corner at scale 0.5 (this becomes the persistent header) and fade out the subtitle.

**Beat b**

Narration: The meter starts at fifty rupees, and every kilometre adds fifteen. One kilometre, sixty five. Two, eighty. Five, one hundred twenty five.

Visuals: `MathTex(r"\text{Fare} = 50 + 15 \cdot (\text{distance})")` near the top. Below it, a two-column `Table` with headers "Distance" and "Fare" and rows "1 km / Rs 65", "2 km / Rs 80" and "5 km / Rs 125". Reveal one row per sentence (1 km, then 2 km, then 5 km) and briefly highlight each fare in YELLOW.

**Beat c**

Narration: Distance is the input. Fare is the output. Something goes in, a rule is applied, something comes out.

Visuals: Fade out the table. Build the function machine: a `RoundedRectangle` labeled `MathTex("f")` in the center, an arrow coming in from the left labeled `MathTex("x")`, and an arrow going out to the right labeled `MathTex("f(x)")`. Animate a small dot labeled "5" moving into the box. The box pulses, then a dot labeled "125" exits on the right. Finally, show `MathTex(r"x \;\to\; f \;\to\; f(x)")` underneath.

## Scene 2 — Exactly one output (Lesson 0.1)

**Beat a**

Narration: A function assigns exactly one output to every valid input.

Visuals: A definition box (a `SurroundingRectangle` with a `Text` title "Function") containing "A function assigns exactly one output to every valid input." Build the sentence with `Text(..., t2c={"exactly one": YELLOW})` and underline "exactly one" in YELLOW.

**Beat b**

Narration: Two inputs may share an output. But one input can never have two outputs. Reversing can fail: one date, one noon temperature, but one temperature, many dates.

Visuals: Two arrow diagrams side by side. Left, titled "Function" with a GREEN check: dots 1, 2 and 3 with arrows 1 to A, 2 to B and 3 to A. Right, titled "Not a function" with a RED cross: dot 1 with arrows to both A and B; flash the two arrows leaving input 1 in RED. Then fade both diagrams and show a small pair of diagrams: "date → temperature" (three dates, arrows into two temperatures, two dates sharing "24°") with a GREEN check, and the reversed "temperature → date" (arrows from "24°" to two dates) with a RED cross.

**Beat c**

Narration: Worked example. One paired with five, two with five, three with seven, two with nine. Input two gets five and nine. Not a function. The repeated five is fine.

Visuals: Build the pairs as separate substrings so each coordinate is its own submobject: `MathTex("(", "1", ",", "5", "),\\ (", "2", ",", "5", "),\\ (", "3", ",", "7", "),\\ (", "2", ",", "9", ")")`. Step 1: color every first coordinate (submobjects 1, 5, 9, 13) BLUE. Step 2: box both "2"s (submobjects 5 and 13) with YELLOW `SurroundingRectangle`s. Step 3: draw arrows from those boxes to their outputs "5" (submobject 7) and "9" (submobject 15), and flash them RED. Show the verdict `Text("Not a function")` in RED. Then circle both "5"s (submobjects 3 and 7) in GREEN with a small label "repeated output: fine".

## Scene 3 — Function notation (Lesson 0.2)

**Beat a**

Narration: f of x isn't f times x. It names an output.

Visuals: `MathTex("f(x)")` large. Next to it, `MathTex(r"f \times x")` appears and is crossed out with a RED `Cross`. Below it, show `Text("the output of f at the input x")`.

**Beat b**

Narration: For f of x equals x squared plus one, f of three is three squared plus one, ten.

Visuals: `MathTex("f(x) = x^2 + 1", substrings_to_isolate=["x"])`, then `.set_color_by_tex("x", YELLOW)` so both x's turn YELLOW. Use `TransformMatchingTex` to morph it into `MathTex("f(3) = 3^2 + 1", substrings_to_isolate=["3"])`, with the 3s in YELLOW. Then append `MathTex("= 10")` to the right.

**Beat c**

Narration: Inputs can be expressions. f of the quantity a plus one puts a plus one in every slot. Not f of a, plus one. Later: f of the quantity x plus h.

Visuals: `MathTex("f(x) = x^2 + 2x")`. Flash `MathTex("f(a) = a^2 + 2a")` beneath it. Then show the empty-slot form `MathTex("f(", r"\square", ") = ", r"\square", "^2 + 2", r"\square")` and fill every box (there are three) with YELLOW `(a+1)` to get `MathTex("f(a+1) = (a+1)^2 + 2(a+1)")`. Beside it, show `MathTex("f(a) + 1")` in RED with the label "not this". Finally swap `a+1` for `x+h` to get `MathTex("f(x+h) = (x+h)^2 + 2(x+h)")`, with a small `Text("coming in the derivative chapter")` tag.

**Beat d**

Narration: Worked example. f of x equals x squared minus three x, at negative two. The quantity negative two, squared, is four. Minus three times negative two is six. Total, ten. Drop the parentheses and you get negative four. The classic mistake.

Visuals: `MathTex("f(x) = x^2 - 3x")`, then `MathTex("f(-2) = ", "(", "-2", ")", "^2 - 3", "(", "-2", ")")` with the parentheses in YELLOW. Then `MathTex("= 4 + 6 = 10")` in GREEN. On the side, show `MathTex(r"(-2)^2 \ne -2^2")` with `MathTex("-2^2 = -4")` below it in RED and the label `Text("dropped parentheses: wrong substitution")` in RED. Do not cross out the arithmetic; the red label marks the substitution as the error.

## Scene 4 — Domain and range (Lesson 0.3)

**Beat a**

Narration: Not every input works. One over zero has no answer, so zero is not allowed.

Visuals: Left: a table with `x` values 2, 1, 0.5 and 0 and `f(x)` values 0.5, 1, 2 and "???", with "???" in RED. Right: `Axes(x_range=[-4,4,1], y_range=[-5,5,1])`. Plot `1/x` in BLUE as two branches, with x in [-4, -0.2] and [0.2, 4] (y stays within ±5). Draw a dashed RED vertical line at x = 0. A dot tracks along the right branch from x = 2 toward x = 0.2 and stops there, then fades out with a small upward shift.

**Beat b**

Narration: The domain is the allowed inputs. The range is the outputs actually produced. x squared is never negative, so its range is zero and up.

Visuals: A definition box with "Domain: allowed inputs" and "Range: outputs actually produced". To the right, small `Axes(x_range=[-3,3,1], y_range=[-1,9,1])` with `x^2` in BLUE on x in [-3, 3]. Highlight the y-axis from 0 upward with a thick YELLOW line and label it `MathTex(r"\text{range: } y \ge 0")`. Put a dot at (0, 0) to show that 0 itself is reached.

**Beat c**

Narration: To find a domain, hunt two suspects. Division by zero, and even roots of negatives.

Visuals: A three-row table: `x^2` with all real numbers, `\frac{1}{x}` with `x \ne 0`, and `\sqrt{x}` with `x \ge 0`. Highlight the last two rows with the tags "suspect 1: division by zero" and "suspect 2: even root of a negative".

**Beat d**

Narration: Worked example. The square root of the quantity x minus one, all divided by x minus four. The root needs x at least one. The division needs x not four. So the domain: x at least one, except four.

Visuals: `MathTex(r"f(x) = \frac{\sqrt{x-1}}{x-4}")`. Circle the numerator in ORANGE and write `x \ge 1`. Circle the denominator in ORANGE and write `x \ne 4`. Below, a `NumberLine(x_range=[-1,7,1])` with a closed dot at 1, a GREEN shaded segment from 1 to the right end, and an open dot punched out at 4. Final label, revealed on the last sentence: `MathTex(r"\text{domain: } x \ge 1,\ x \ne 4")`.

## Scene 5 — Reading graphs (Lesson 0.4)

**Beat a**

Narration: Formula, table and graph are three views of one function.

Visuals: Three panels in a row: `MathTex("f(x)=x^2")`, a small table with rows (-2, 4), (0, 0) and (2, 4), and small axes `Axes(x_range=[-3,3,1], y_range=[-1,9,1])` with the parabola in BLUE on x in [-3, 3]. A `ValueTracker` x moves from -2 to 2. A dot on the graph, a highlighted row in the table and a live `DecimalNumber` in the formula panel update together.

**Beat b**

Narration: What is f of three? Go up from three to the curve. The height is nine. One input, one answer.

Visuals: Enlarged `Axes(x_range=[-4,4,1], y_range=[-1,10,1])` with `x^2` in BLUE on x in [-3.16, 3.16]. A YELLOW dot starts at (3, 0), a vertical dashed line rises to (3, 9), then a horizontal dashed line runs to the y-axis. Label it "9".

**Beat c**

Narration: Now reverse it. Where does f of x equal nine? Slide across at nine. You hit three and negative three. Reverse questions may have many answers.

Visuals: A horizontal ORANGE line y = 9 sweeps from left to right. Dots appear at (-3, 9) and (3, 9), with dashed lines dropping to the x-axis and the labels "-3" and "3". Show the caption `Text("reverse question: many answers allowed")`.

**Beat d**

Narration: f of x is zero only at zero, and above zero everywhere else.

Visuals: Remove the y = 9 line. Pulse a GREEN dot at (0, 0) with the label `MathTex("f(x)=0 \\text{ only at } x=0")`. Then shade the region between the curve and the x-axis in faint BLUE on both sides of 0, with a hollow circle at (0, 0) and the label `MathTex(r"f(x) > 0 \text{ for } x \ne 0")`.

## Scene 6 — How functions change (Lesson 0.5)

**Beat a**

Narration: Now calculus begins. x squared goes one, four, nine, sixteen. The jumps are three, five, seven. It's getting steeper.

Visuals: Left: a table with columns `x`, `f(x)` and "change". The rows are (1, 1, blank), (2, 4, +3), (3, 9, +5) and (4, 16, +7), with the change column in YELLOW. Right: `Axes(x_range=[0,4.5,1], y_range=[0,17,4])` with `x^2` on x in [0, 4.1]. Draw vertical YELLOW bars showing each jump of 3, 5 and 7 between consecutive points, so the bars visibly grow.

**Beat b**

Narration: Increasing means outputs rise. Decreasing means they fall. Constant means they don't move. A local maximum is a hilltop, a local minimum a valley floor.

Visuals: `Axes(x_range=[-3,3,1], y_range=[-1,9,1])` with `x^2` on x in [-3, 3]. Color the left half ORANGE with the label "decreasing" and the right half BLUE with the label "increasing". Briefly flash a flat grey line `y = 5` labeled "constant". Put a dot at (0, 0) labeled "local minimum". Then briefly show a small separate hill curve `-(x-1)^2+3` in ORANGE on x in [-1, 3] with a dot at its peak (1, 3) labeled "local maximum", and fade it out.

**Beat c**

Narration: Two to the x changes by two, four, eight, doubling each time. A steadily filling bathtub adds five litres every minute. Constant change means a straight line. The change column is a fingerprint. Pushed to the extreme, it becomes the derivative.

Visuals: A table for `2^x` with rows (1, 2), (2, 4, +2), (3, 8, +4) and (4, 16, +8), with curved arrows between the change entries labeled "times 2". Next to it, a compact table for `x^2` changes (+3, +5, +7) with arrows labeled "+2". Then a third compact table "bathtub: minutes → litres" with changes +5, +5, +5, and beside it small axes with a straight BLUE line `y = 5t` on t in [0, 4]. Caption: `Text("the change column is a fingerprint")`.

## Scene 7 — Transforming functions (Lesson 0.6)

**Beat a**

Narration: Transformations. Adding outside moves the graph up or down. Multiplying outside stretches it, and a negative flips it.

Visuals: `Axes(x_range=[-6,6,1], y_range=[-4,10,1])`. Show the base `x^2` as a faint grey reference on x in [-3.16, 3.16]. In the top-right, a small four-row summary table: `f(x)+k` "moves vertically", `a\,f(x)` "stretches vertically", `f(x-k)` "moves horizontally", `f(ax)` "squeezes horizontally". Highlight each row as its beat plays. Use a `ValueTracker` b to animate `x^2 + b` in BLUE from b = 0 to 3 and back to 0, plotted inside `always_redraw` on x in [-sqrt(10-b), sqrt(10-b)]. Then use a `ValueTracker` a to animate `a x^2` from a = 1 to 2, then to -1, with a live `MathTex` label. Inside `always_redraw`, plot it on x in ±sqrt(10/a) when a > 0 and ±sqrt(4/|a|) when a < 0 (skip the plot for |a| < 0.05, where it is a flat line on [-6, 6]).

**Beat b**

Narration: The backwards one. f of the quantity x minus two moves the graph right, not left. Not f of x, minus two. That moves it down. The new graph at five repeats the old one at three.

Visuals: Animate `(x - s)^2` with a `ValueTracker` s from 0 to 2, plotted on x in [s - 3.16, s + 3.16], so the vertex moves to (2, 0). Put a big `Text("minus inside → RIGHT")` in YELLOW, and flash `MathTex("f(x) - 2")` in RED with the label "down, not right". On the last sentence, mark the point (3, 9) on the grey base curve and the point (5, 9) on the shifted curve (both inside y_range [-4, 10]), then draw a horizontal YELLOW arrow from the first to the second.

**Beat c**

Narration: Multiplying inside, like f of two x, squeezes it sideways.

Visuals: Highlight the fourth table row. Animate `(kx)^2` with a `ValueTracker` k from 1 to 2, plotted on x in ±3.16/k, showing the parabola narrowing horizontally. Fade it back to the grey reference.

**Beat d**

Narration: Worked example. Negative two times the quantity x minus three, squared, plus four. Inside out: shift right three. Stretch vertically by two. Flip. Shift up four. The peak lands at the point three, four.

Visuals: `MathTex("y = ", "-", "2", "(x-3)", "^2", "+4")`, with each part highlighted in turn: `(x-3)`, then `2`, then `-`, then `+4`. On the axes, apply four successive transforms to a grey `x^2` copy, each plotted with clipped bounds: `(x-3)^2` on x in [-0.16, 6] (right end clipped to the x_range); `2(x-3)^2` on [0.76, 5.24]; `-2(x-3)^2` on [1.59, 4.41]; `-2(x-3)^2 + 4` on [1, 5]. End with a dot at (3, 4) labeled "peak (3, 4)".

## Scene 8 — Function families (Lesson 0.7)

**Beat a**

Narration: Calculus reuses eleven families. Two to the x explodes. The logarithm grows ever more slowly. One over x avoids zero. The square root starts at zero. Sine and cosine repeat forever.

Visuals: A grid of 11 small `Axes(x_range=[-5,5], y_range=[-5,6])`, in 4 columns by 3 rows, each with its curve and a `MathTex` label. Every plot uses clipped bounds: `3` on [-5, 5]; `x` on [-5, 5]; `x^2` on [-2.4, 2.4]; `\tfrac{x^3}{4}` on [-2.7, 2.7]; `|x|` on [-5, 5]; `\tfrac{1}{x}` as two branches on [-5, -0.2] and [0.2, 5]; `\sqrt{x}` on [0, 5]; `2^x` on [-5, 2.58]; `\ln x` on [0.01, 5]; `\sin x` and `\cos x` on [-5, 5]. Pop the tiles in with `LaggedStart` during the first sentence. During the personality sentences, enlarge the relevant tiles one at a time: exponential, logarithm, reciprocal, square root, then sine and cosine together.

**Beat b**

Narration: Worked example. A wave repeats forever, and its outputs stay between minus one and one. Its value at zero is one. Sine of zero is zero, cosine of zero is one. So it's cosine.

Visuals: Show sine and cosine on shared axes, `x_range=[-7,7]` and `y_range=[-1.5,1.5]`, sine in BLUE and cosine in ORANGE, both on x in [-7, 7]. On the second clause, draw dashed YELLOW horizontal lines at y = 1 and y = -1 and label the band "[-1, 1]". Mark x = 0. A dot appears at (0, 0) on sine and at (0, 1) on cosine. The cosine curve glows YELLOW and sine fades.

## Scene 9 — Combining functions (Lesson 0.8)

**Beat a**

Narration: Let g add one, and f square. Point by point, f plus g at two is four plus three, seven. Calculus cares more about feeding one into the other.

Visuals: `MathTex("g(x) = x + 1")` and `MathTex("f(x) = x^2")` at the top. Show `MathTex(r"(f+g)(x) = f(x)+g(x)")` with the other three pointwise rules stacked small beside it. Then show `MathTex("(f+g)(2) = 4 + 3 = 7")`. Fade the pointwise rules to 30 percent opacity, keeping the "= 7" line.

**Beat b**

Narration: Two goes through g to three, then f to nine. So f of g of two is nine, not seven. The other order gives five. Order matters.

Visuals: Two function-machine boxes in a row: `g: x+1` and then `f: x^2`. A dot labeled "2" enters g, leaves as "3", enters f and leaves as "9". Show `MathTex("f(g(2)) = 9")` next to the faded `(f+g)(2) = 7` for contrast. Then swap the boxes: "2" goes through f to "4", then through g to "5". Show `MathTex("g(f(2)) = 5")` and a `Text("order matters")` banner in YELLOW.

**Beat c**

Narration: Fill f's slot with all of g of x: the quantity x plus one, squared. The other order gives x squared plus one. The chain rule studies change flowing through this pipeline.

Visuals: `MathTex("f(", r"\square", ") = ", r"\square", "^2")`, then both boxes fill with YELLOW `(x+1)` to give `MathTex("f(g(x)) = (x+1)^2")`. Beside it, show `MathTex("g(f(x)) = x^2 + 1")` in ORANGE with a `MathTex(r"\ne")` between them. Then show `MathTex(r"(f\circ g)(x) = f(g(x))")`. Under it, a pipeline `x → g → f` drawn with arrows and tagged `Text("chain rule, later")`.

## Scene 10 — Piecewise functions (Lesson 0.9)

**Beat a**

Narration: Piecewise functions use different rules in different regions. Here, x plus two for negative x, and x squared from zero on. Check the condition, then use that rule.

Visuals: Build the cases block from separate pieces: `MathTex("f(x) =")`, a left `Brace`, and a `VGroup` of two row objects, `MathTex(r"x + 2 \quad x < 0")` and `MathTex(r"x^2 \quad x \ge 0")`, arranged vertically. Below it, `Axes(x_range=[-5,3,1], y_range=[-4,9,1])`. Draw `x+2` in ORANGE on x in [-5, 0) and `x^2` in BLUE on x in [0, 3]. A `ValueTracker` dot slides from x = -3 across 0 to x = 2.5. A YELLOW `SurroundingRectangle` sits on whichever row is active and jumps to the second row when the dot passes 0.

**Beat b**

Narration: At zero, x squared owns the point. A closed circle: f of zero is zero. The left piece approaches two but never claims it. An open circle. That jump returns next chapter.

Visuals: Draw a filled BLUE `Dot` at (0, 0) and a hollow ORANGE circle (`Circle(radius=0.08)`, no fill) at (0, 2). Label them "closed: included" and "open: not included". Add a YELLOW `DoubleArrow` from (0.3, 2) to (0.3, 0), offset slightly right of the y-axis, labeled "jump".

**Beat c**

Narration: Worked example. An electricity tariff. Up to one hundred units, every unit costs three. Up to two hundred, every unit costs five. Beyond that, every unit costs eight. One hundred units: three hundred, since rule one includes one hundred. One hundred fifty: five times one fifty, seven hundred fifty. Two hundred fifty: two thousand.

Visuals: Build the tariff the same way as beat a (brace plus three separate row objects): `3u \quad u \le 100`, `5u \quad 100 < u \le 200`, `8u \quad u > 200`, prefixed by `MathTex("C(u) =")`. For each input (100, 150, 250), show the value on the left, run a GREEN check or RED cross down the condition rows, put a `SurroundingRectangle` on the winning row, then show the result: `C(100)=300`, `C(150)=5 \cdot 150=750` and `C(250)=2000`. Give each input about 3 seconds so the pacing is not rushed.

## Scene 11 — From functions to calculus (Lesson 0.10)

**Beat a**

Narration: How fast is x squared changing? From one to three, the output rises eight while the input moves two. Slope four. That's the secant line: an average rate of change.

Visuals: `Axes(x_range=[0,4.5,1], y_range=[-2,18,2])` with `x^2` in BLUE on x in [0, 4.24]. Put dots at (1, 1) and (3, 9) and draw the secant y = 4x - 3 in ORANGE over x in [0.3, 4.5] (y from -1.8 to 15). Show `MathTex(r"\frac{f(3)-f(1)}{3-1} = \frac{9-1}{2} = 4")`, with a rise and run triangle drawn in YELLOW.

**Beat b**

Narration: Rates can be negative. One over x, from one to two, averages negative one half: the graph falls. A straight line gives the same slope on every interval.

Visuals: Two small insets side by side, replacing the main axes briefly. Left: `Axes(x_range=[0,3,1], y_range=[0,2,1])` with `1/x` on x in [0.5, 3], dots at (1, 1) and (2, 0.5), a falling ORANGE secant, and `MathTex(r"\frac{0.5-1}{2-1} = -0.5")`. Right: `Axes(x_range=[0,7,1], y_range=[0,20,5])` with `3x + 1` on x in [0, 6.3], two differently placed secant brackets both labeled "slope 3". Optional footnote at the bottom: `MathTex(r"x^3:\ \frac{8-1}{2-1} = 7")` in small grey text. Then return to the x squared axes.

**Beat c**

Narration: But what about exactly at two? Slide a second point toward two. The slopes go five, four and a half, four point one, closing in on four.

Visuals: Fix a dot at (2, 4). A `ValueTracker` x2 animates from 4 to 2.05. Use `always_redraw` for the secant through (2, 4) and (x2, x2 squared). Its slope is m = x2 + 2, and it is drawn from x = 1 (y = 4 - m, at least -2 since m ≤ 6) to x_right = min(4.5, 2 + 13/m) (so y ≤ 17). Show a live `DecimalNumber` slope as `Text("slope = ")` plus the number. Start at x2 = 4 (slope 6), then pause briefly at x2 = 3, 2.5 and 2.1 (slopes 5, 4.5 and 4.1) in sync with the narration.

**Beat d**

Narration: Set the points equal. f of two minus f of two, over two minus two. Zero over zero. The formula collapses exactly when we need it.

Visuals: x2 snaps to 2 and the secant vanishes. Show `MathTex(r"\frac{f(2)-f(2)}{2-2} = ", r"\frac{0}{0}")` large, with the `\frac{0}{0}` part in RED. Apply a small `Wiggle` to it.

**Beat e**

Narration: We need to get arbitrarily close without touching. That tool is the limit.

Visuals: The dot at x2 creeps back to 2.01, and a faint tangent-like line appears. Show `Text("arbitrarily close, never equal")` in YELLOW.

## Scene 12 — Recap and next chapter (Lessons 0.1 to 0.10, Mastery Check)

**Beat a**

Narration: Recap. One output per input. Substitute the whole input. Domains dodge two suspects. Change columns are fingerprints. Minus inside shifts right. Compose inside out. Secants give average change.

Visuals: A vertical checklist of seven short `Text` items, one per sentence, each with a GREEN check: "one output per input", "substitute the whole input", "domain: two suspects", "change column = fingerprint", "minus inside → right", "compose inside-out", "secant = average change".

**Beat b**

Narration: Try the Chapter Zero mastery check. Then on to Chapter One. Limits.

Visuals: Fade out the checklist and the persistent header. `Text("Chapter 0 Mastery Check")` appears small, then `Text("Next: Chapter 1 · Limits")` appears large in YELLOW. Hold for 2 seconds, then fade to black.

---

## Review log

**Coverage gaps**

1. Lesson 0.3 range example: added Scene 4 beat b, "x squared can never be negative, so its range is zero and up", with the y-axis highlighted from 0 upward and a dot at (0, 0). This follows the content's quiz feedback that 0 is included.
2. Lesson 0.6 row `f(ax)`: a four-row summary table now appears on screen in Scene 7a, and the new Scene 7 beat c narrates and animates the horizontal squeeze `(kx)^2`.
3. Lesson 0.5 constant, steepness and bathtub: Scene 6b adds "Constant means they don't move" with a flat line. Scene 6a now says "getting steeper". Scene 6c adds the bathtub (plus five litres each minute, so the change column is constant and the graph is a straight line). Scene 11b ties this back ("for a straight line, every interval gives the same slope").
4. Lesson 0.8 pointwise and other-order examples: Scene 9a now computes (f+g)(2) = 4 + 3 = 7, and 9b contrasts it with f(g(2)) = 9 ("nine, not seven"). Scene 9c adds g(f(x)) = x squared + 1 versus (x+1) squared. All values were checked against the content file.
5. Lesson 0.4 f(x) = 0 and f(x) > 0: added Scene 5 beat d. f(x) = 0 only at x = 0, and f(x) > 0 for every x not equal to 0, matching the content's quiz on "strictly above the axis".
6. Lesson 0.1 reversing a function: Scene 2b now includes the date to temperature example, with the reversed temperature to date diagram marked not a function. This matches the content's quiz.
7. Lesson 0.10 negative rate and x cubed: added Scene 11 beat b. It covers 1/x from 1 to 2 (-0.5, a falling secant) and a line having the same slope on every interval (3x + 1). The x cubed slope 7 example is an optional on-screen footnote only, to save words.
8. Lesson 0.7 clue: Scene 8b now narrates "its outputs never leave minus one to one" and shows a dashed [-1, 1] band before the tie-breaker.

**Issues**

- Critical, ambiguous "f of x minus two" (7b, 3c): now "f of the quantity x minus two", "f of the quantity a plus one" and "f of the quantity x plus h". Also added "Not f of x, minus two. That would move it down." (7b) and "Not f of a, plus one." (3c, with a RED `f(a)+1` on screen).
- Major, (3, 9) and (5, 9) off the axes: Scene 7 axes changed to y_range [-4, 10, 1]. The idea is now narrated: "The new graph at five shows what the old one did at three."
- Major, curves not clipped: added a global clipping rule and explicit x_range bounds for every plot in Scenes 4 to 8, 10 and 11, including `always_redraw` bounds for the a, b, s and k trackers. The 1/x dot now stops at x = 0.2 and fades with an upward shift.
- Major, tariff sounds marginal: reworded to "every unit costs three / five / eight" per band, and added "Five times one fifty is seven hundred fifty." The math matches the content's C(u) = 5u for 100 < u ≤ 200.
- Major, "-2^2 = -4" crossed out: that line is no longer crossed out. The screen shows `(-2)^2 ≠ -2^2`, with `-2^2 = -4` labeled "dropped parentheses: wrong substitution", and the narration names the classic mistake.
- Major, the 4c domain phrasing: the narration now says "the square root of the quantity x minus one, all divided by x minus four" and ends with "So the domain is x at least one, except x equals four." This is now beat 4d, because 4b was split for the range example.
- Minor, pairs read aloud: now "one paired with five, two with five…". The MathTex is built from split substrings, with explicit submobject indices.
- Minor, "fill both boxes": now "fill every box (there are three)", with f(a) = a squared + 2a flashed on screen first to build up (shown visually only, to save words).
- Minor, TransformMatchingTex coloring: uses `substrings_to_isolate=["x"]` and `set_color_by_tex`, and the target is isolated on "3".
- Minor, highlighting a cases row: the cases blocks in 10a and 10c are built as a Brace plus a VGroup of separate rows, each highlighted with a SurroundingRectangle. The jump arrow is offset to x = 0.3.
- Minor, "stretch by two" and "three, four": now "Stretch vertically by two, twice as steep" (the content's own wording) and "the point three, four: x of three, height four".
- Minor, 1 km row unnarrated: added "One kilometre costs sixty five." One row is revealed per sentence.
- Minor, RED for decreasing: decreasing is now ORANGE and increasing BLUE. The global style states that RED and GREEN are reserved for wrong and right.
- Minor, word count and pacing: cut the eleven-name family list (now "eleven families"), folded the pointwise sentence into the numeric example, and shortened the recap from nine items to seven. The added coverage is short. Spoken narration is now about 995 words, under the 1000 ceiling. To make room for the new coverage, most beats were also tightened (for example, 3a, 3b, 4a, 5c, 6c and 11a). Scene 10c now asks for about 3 seconds per input.
- Minor, header persistence and the rupee glyph: the header is now explicitly persistent, exempt from the per-scene FadeOut, and removed in 12b. Fares are shown as "Rs 65" and so on to avoid depending on the glyph; the narration still says rupees.
- Minor, secant below y_range: the 11a secant is drawn on x in [0.3, 4.5]. The `always_redraw` secant in 11c (formerly 11b) has endpoints computed to stay within [-2, 17].
- Disagreements: none. Every review item was accepted.
