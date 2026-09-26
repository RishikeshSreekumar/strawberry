# Trig 3 · Identities: The Derivation Toolkit (video script)

- **Course:** Trigonometry
- **Chapter:** Chapter 3 · Identities: The Derivation Toolkit (id: `trig-3-identities`)
- **Target runtime:** about 6.5 minutes (about 950 spoken words plus visual holds)
- **Voice:** macOS `say`, voice Samantha

**Learning goal.** The learner sees that an identity is a statement true for every valid input, not a question to solve, and learns the rules for proving one: work one side only, start from the messier side, convert to sine and cosine, and look for a Pythagorean pattern. They then watch the whole chapter grow out of a small core set. Pythagoras divided twice gives the other two Pythagorean identities, which swap squares and kill radicals. The angle sum formulas come from a stacked-triangle construction, and the difference and tangent formulas follow from them. Double angle, the three faces of cosine of two theta, half angle, and product-to-sum formulas all follow from those. The video closes with the Derivation Game: name the path from the core set before doing any algebra, and a mastery example that does exactly that.

**Visual conventions (all scenes).** Dark background (`#1a1a2e`-ish, or Manim default black). Sine-related terms in BLUE, cosine-related terms in ORANGE (`#FF9F1C`), anything that cancels flashes RED and then fades, and results get a YELLOW `SurroundingRectangle`. RED is used only for "cancels" and for "wrong" crosses. Every equation is `MathTex` (tables included). Domain notes are small GREY `MathTex` at scale 0.5. Unless a scene says otherwise, the frame is cleared with `FadeOut(*self.mobjects)` at the end of the scene.

---

## Scene 1 · Cold open: two equations that look alike (Lesson 3.1)

**Beat a**
Narration: Two equations that look alike. Sine x equals one half. And sine squared x plus cosine squared x equals one.

Visuals: A title card reads `Identities: The Derivation Toolkit` (Text, top) and fades up, then shrinks to the top-left corner. Two `MathTex` appear side by side: left `\sin x = \tfrac{1}{2}`, right `\sin^2 x + \cos^2 x = 1`, with a vertical `Line` between them.

**Beat b**
Narration: The first is a question: which x make it true? The second is a statement, true for every x. There is nothing to solve.

Visuals: A label `Text("question")` goes under the left equation and `Text("statement")` under the right. Below the equations, draw `Axes(x_range=[-6.5,6.5,1], y_range=[-1.5,1.5,0.5], x_length=11, y_length=2.6)`. Plot `y = sin(x)` in BLUE and the dashed line `y = 0.5` in WHITE, then put a `Dot` at each intersection (x = pi/6 + 2 pi k and 5 pi/6 + 2 pi k in range). Next fade the sine curve and the dots and plot `y = sin(x)^2 + cos(x)^2` in GREEN. It lies flat on `y = 1` for the whole width, and a `Create` sweeps it left to right.

**Beat c**
Narration: An identity is true wherever both sides are defined. Tangent x equals sine x over cosine x is an identity, even though neither side exists at pi over two. Excluded points do not spoil it.

Visuals: Clear the axes. Show a definition box (`RoundedRectangle` + `Tex`) reading "Identity: true for every value where both sides are defined." `Indicate` the words "both sides are defined" as the first sentence ends. Under the box, write `\tan x = \dfrac{\sin x}{\cos x}` (appears on "Tangent x equals"). On "neither side exists at pi over two", show a small GREY note `\text{both sides undefined at } x = \tfrac{\pi}{2}` with a hollow `Dot` icon, then a GREEN check mark beside the identity on "do not spoil it".

---

## Scene 2 · The rules of the game, and a worked proof (Lesson 3.1)

**Beat a**
Narration: To prove an identity, work on one side only. Start from the messier side. When stuck, convert to sine and cosine. And look for a Pythagorean pattern.

Visuals: A numbered list (`VGroup` of `Tex`) builds line by line: "1. Work on one side only", "2. Start from the messier side", "3. Convert to sine and cosine", "4. Look for a Pythagorean pattern". Then it shrinks to the left third of the frame.

**Beat b**
Narration: Show that sine x over cosine x, plus cosine x over sine x, equals one over the product sine x cosine x. Take a common denominator.

Visuals: On the right two-thirds, `MathTex(r"\frac{\sin x}{\cos x} + \frac{\cos x}{\sin x}", "=", r"\frac{1}{\sin x\cos x}")`. Put a YELLOW box around the left side and dim the right side to 40% opacity. Then `TransformMatchingTex` the left side into `\frac{\sin^2 x + \cos^2 x}{\sin x\cos x}`.

**Beat c**
Narration: The top is sine squared plus cosine squared, which is one. Cross multiplying would assume what we are proving. And a graph is a check, never a proof.

Visuals: `Indicate` the numerator `\sin^2 x + \cos^2 x`, then transform it into `1`. The dimmed right side returns to full opacity and a GREEN check mark appears. After that, a small crossed-out sketch shows two fractions with `Arrow`s crossing the equals sign, marked with a RED `Cross`, and the caption `Text("circular")`. On the last sentence, a small caption `Text("graph = evidence, not proof", font_size=28)` fades in at the bottom of the frame.

---

## Scene 3 · The Pythagorean family (Lesson 3.2)

**Beat a**
Narration: Textbooks list three Pythagorean identities. There is really one, plus a division.

Visuals: Put three faint `MathTex` in a column, labeled "the textbook list": `\sin^2\theta+\cos^2\theta=1`, `1+\tan^2\theta=\sec^2\theta`, `1+\cot^2\theta=\csc^2\theta`. Fade the lower two to 20% and move the first to center-top at full brightness.

**Beat b**
Narration: Divide every term of Pythagoras by cosine squared, wherever cosine is not zero. You get tangent squared plus one equals secant squared.

Visuals: Below it, show `\frac{\sin^2\theta}{\cos^2\theta} + \frac{\cos^2\theta}{\cos^2\theta} = \frac{1}{\cos^2\theta}` with each denominator in ORANGE. Directly under it, a small GREY note `\cos\theta \neq 0` fades in on "wherever cosine is not zero". Transform term by term (`TransformMatchingShapes`) into `\tan^2\theta + 1 = \sec^2\theta`. The second faint textbook line brightens and slides onto it.

**Beat c**
Narration: Divide by sine squared instead, wherever sine is not zero, and you get one plus cotangent squared equals cosecant squared. The lone function on the right is the reciprocal of your divisor.

Visuals: Same pattern with BLUE denominators `\sin^2\theta` and the GREY note `\sin\theta \neq 0`, ending at `1 + \cot^2\theta = \csc^2\theta`. The third textbook line snaps in. Then draw `Arrow`s from the divisor to the right-hand result: `\div\cos^2 \to \sec^2` and `\div\sin^2 \to \csc^2`.

**Beat d**
Narration: Two uses. Swapping squares: sine squared becomes one minus cosine squared. Killing radicals: the square root of one minus sine squared is the absolute value of cosine.

Visuals: Clear the arrows and the division work, keeping the three identities in a compact column at the top-left (scale 0.6). Two labeled cards appear side by side. Card 1, title `Tex("Swapping squares")`: `\sin^2\theta \;\longleftrightarrow\; 1 - \cos^2\theta` with a double arrow that pulses. Card 2, title `Tex("Killing radicals")`: `\sqrt{1-\sin^2\theta}` → `\sqrt{\cos^2\theta}` → `|\cos\theta|`, with the root sign flashing RED and fading as it disappears; the absolute-value bars are drawn in YELLOW.

**Beat e**
Narration: Secant squared minus one, over secant squared. The top is tangent squared. Convert to sine and cosine, and sine squared theta is left.

Visuals: Clear. `MathTex` chain, revealed step by step: `\frac{\sec^2\theta - 1}{\sec^2\theta}` → `\frac{\tan^2\theta}{\sec^2\theta}` → `\frac{\sin^2\theta/\cos^2\theta}{1/\cos^2\theta}` → `\sin^2\theta`. The two `\cos^2\theta` parts flash RED and fade, and the result gets a YELLOW box.

---

## Scene 4 · Angle sum: kill the wrong answer, then build the right one (Lesson 3.3)

**Beat a**
Narration: First, kill the tempting wrong answer: sine of alpha plus beta equals sine alpha plus sine beta. Try alpha and beta both equal to pi over two. The left is sine of pi, zero. The right is two.

Visuals: `MathTex(r"\sin(\alpha+\beta) \overset{?}{=} \sin\alpha + \sin\beta")`. Show `\alpha = \beta = \tfrac{\pi}{2}` beneath, then substitute to get `\sin\pi = 0` on the left and `1 + 1 = 2` on the right. Then a RED `Cross` goes over the whole equation, and it fades.

**Beat b**
Narration: Instead, stack two right triangles. Rotate through alpha, then beta, landing on a point P at distance one. In the inner triangle, O Q is cosine beta, and Q P is sine beta.

Visuals: Diagram on the left, formulas on the right. Draw `Axes(x_range=[0,1,0.5], y_range=[0,1,0.5], x_length=6.5, y_length=6.5, tips=False)` with no tick labels (`axis_config={"include_numbers": False}`), positioned with its origin at about (-6.6, -3.4) so the diagram fills the left half. Angles match the lesson's interactive diagram: alpha = 30 degrees, beta = 25 degrees. All coordinates below are in axis units; convert with `axes.c2p`.
- O = (0, 0).
- Q = cos(beta)·(cos alpha, sin alpha) ≈ (0.785, 0.453).
- P = (cos 55°, sin 55°) ≈ (0.574, 0.819).

Draw a faint dashed ray from O through Q (extended to length 1.05), and the segments O–P (WHITE, label "1" at scale 0.55, placed at the midpoint and nudged up-left), O–Q (ORANGE, label `\cos\beta` at scale 0.55, below the segment), and Q–P (BLUE, label `\sin\beta` at scale 0.55, to its right). Show a `RightAngle` at Q between QO and QP (size 0.2), an `Angle` arc for alpha at O from the x-axis to OQ (radius 0.8, label `\alpha`), and a second arc for beta at O between OQ and OP (radius 1.2, label `\beta`). Dot and label O, Q, P at scale 0.5.

**Beat c**
Narration: Project onto the axes using angle alpha. The height of P is Q R plus P T: sine alpha cosine beta, plus cosine alpha sine beta.

Visuals: Add two helper points:
- R = (Q_x, 0) ≈ (0.785, 0), directly below Q on the x-axis.
- T = (P_x, Q_y) ≈ (0.574, 0.453), directly below P, at Q's height.

Draw triangle O–R–Q (thin GREY sides, `RightAngle` at R) and triangle Q–T–P (thin GREY sides, `RightAngle` at T). Draw the dashed horizontal from T to Q at height y = Q_y ≈ 0.453. Now in TEAL, thicken QR (vertical, from (0.785, 0) to (0.785, 0.453), length 0.453 = sin 30°·cos 25°) and PT (vertical, from (0.574, 0.453) up to P, length 0.366 = cos 30°·sin 25°). Mark the angle at P between PT (downward) and PQ with a small arc (radius 0.35) labeled `\alpha`, since PQ is perpendicular to OQ and PT is perpendicular to the x-axis. Products are labeled with a short leader line (`Line` plus `MathTex` at scale 0.55) out to the margin: `\sin\alpha\cos\beta` for QR, placed right of R; `\cos\alpha\sin\beta` for PT, placed left of PT. Then animate a copy of QR sliding left along the x-axis to sit under T at x = P_x (so it spans y from 0 to Q_y), making it visible that the height of P stacks as QR, carried over, plus PT. A `Brace` on the left of this stacked column, from y = 0 to y = P_y, reads `\sin(\alpha+\beta)`. On the right half, write `\sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta`; each label `TransformFromCopy`s into its place in the formula, then the leader-line labels fade to keep the diagram clear.

**Beat d**
Narration: The horizontal position of P is O R minus Q T: cosine alpha cosine beta, minus sine alpha sine beta. The minus is real. Q T pulls P back.

Visuals: Remove the slid copy of QR. In GOLD, thicken OR (horizontal, from (0, 0) to (0.785, 0), length 0.785 = cos 30°·cos 25°) with leader label `\cos\alpha\cos\beta` below the x-axis. In GOLD with a dashed style, thicken QT (horizontal, from T at x = 0.574 to Q at x = 0.785, length 0.211 = sin 30°·sin 25°) with leader label `\sin\alpha\sin\beta` placed above and right of Q. Draw a `Brace` under the x-axis from 0 to P_x ≈ 0.574 reading `\cos(\alpha+\beta)`. Then show QT's shadow on the x-axis (a GOLD dashed segment from 0.574 to 0.785) and animate an `Arrow` pointing left along it, so OR visibly overhangs P_x by exactly the width QT. On the right, write `\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta` with each label transforming into place, then `Circumscribe` the minus sign in YELLOW. Optional: animate a `ValueTracker` on beta from 25 to 40 degrees with the whole diagram redrawn by `always_redraw`, which shows the construction holds for other angles.

---

## Scene 5 · Sine mixes, cosine matches; differences and a payoff (Lesson 3.3)

**Beat a**
Narration: Sine mixes, cosine matches. Cosine flips the sign: a plus inside becomes a minus in the middle.

Visuals: The diagram fades. The two formulas are centered and stacked. Color-code: on the sine line, color each product pair BLUE·ORANGE with the label "mixes". On the cosine line, the pairs are ORANGE·ORANGE and BLUE·BLUE, labeled "matches". `Indicate` the minus.

**Beat b**
Narration: Differences come free. Replace beta with negative beta and use symmetry. Both middle signs flip. For tangent, divide sine by cosine, then divide top and bottom by cosine alpha cosine beta.

Visuals: Put `\beta \to -\beta` in the corner. Show the symmetry facts `\cos(-\beta)=\cos\beta`, `\sin(-\beta)=-\sin\beta`. Transform the stacked formulas into `\sin(\alpha-\beta)=\sin\alpha\cos\beta - \cos\alpha\sin\beta` and `\cos(\alpha-\beta)=\cos\alpha\cos\beta + \sin\alpha\sin\beta`. Build each formula as separate `MathTex` substrings so the middle sign is its own submobject; `ReplacementTransform` the old sign glyph into the new one (plus to minus on the sine line, minus to plus on the cosine line) with a `Flash` at each. On the tangent sentence, build below: `\tan(\alpha+\beta) = \frac{\sin\alpha\cos\beta + \cos\alpha\sin\beta}{\cos\alpha\cos\beta - \sin\alpha\sin\beta}`, then show a GREY `\div\,\cos\alpha\cos\beta` tag on top and bottom, and transform into `\tan(\alpha+\beta)=\frac{\tan\alpha+\tan\beta}{1-\tan\alpha\tan\beta}` with a YELLOW box.

**Beat c**
Narration: The payoff: exact values. Seventy five degrees is forty five plus thirty, so sine of seventy five degrees is the square root of six plus the square root of two, all over four.

Visuals: Clear. Build `\sin 75^\circ = \sin(45^\circ + 30^\circ)` → `\sin45^\circ\cos30^\circ + \cos45^\circ\sin30^\circ` → `\frac{\sqrt2}{2}\cdot\frac{\sqrt3}{2} + \frac{\sqrt2}{2}\cdot\frac12` → `\frac{\sqrt6+\sqrt2}{4}` with a YELLOW box.

---

## Scene 6 · Double angle and the three faces of cosine of two theta (Lesson 3.4)

**Beat a**
Narration: Set beta equal to alpha. Sine of two theta is sine theta cosine theta plus cosine theta sine theta: two sine theta cosine theta.

Visuals: `\sin 2\theta = \sin(\theta+\theta)` → `\sin\theta\cos\theta + \cos\theta\sin\theta` → `2\sin\theta\cos\theta`. The two identical terms slide together and merge.

**Beat b**
Narration: Cosine of two theta is cosine squared minus sine squared. Pythagoras gives two more faces: one minus two sine squared, or two cosine squared minus one.

Visuals: `\cos 2\theta = \cos^2\theta - \sin^2\theta`. Two `Arrow`s branch downward. The left one is labeled `\cos^2 = 1 - \sin^2` and leads to `1 - 2\sin^2\theta` (BLUE). The right one is labeled `\sin^2 = 1-\cos^2` and leads to `2\cos^2\theta - 1` (ORANGE).

**Beat c**
Narration: Here is cosine of two x. One minus two sine squared x lands exactly on it. So does two cosine squared x minus one. Three labels, one curve.

Visuals: Clear. `Axes(x_range=[-6.5,6.5,1], y_range=[-1.5,1.5,0.5], x_length=11, y_length=4)`. Time each `Create` (about 1.5 s) to its sentence: sentence 1, plot `cos(2x)` in WHITE with legend entry `\cos 2x`; sentence 2, plot `1 - 2*sin(x)**2` dashed BLUE on top, with legend entry `1-2\sin^2 x`; sentence 3, plot `2*cos(x)**2 - 1` dotted ORANGE, legend entry `2\cos^2 x - 1`. On "Three labels, one curve", `Indicate` the three legend entries together.

**Beat d**
Narration: For half angle, solve for sine squared theta and put theta equal to x over two. Sine of x over two is plus or minus the square root of the fraction: one minus cosine x, all over two. The whole fraction sits under the root. Cosine is the same, with a plus.

Visuals: `\cos 2\theta = 1 - 2\sin^2\theta` → `\sin^2\theta = \frac{1-\cos 2\theta}{2}` (also show `\cos^2\theta = \frac{1+\cos2\theta}{2}` beside it, in ORANGE). Then `\theta \to \tfrac{x}{2}`. Build `\sin\frac{x}{2} = \pm` first, then write the fraction `\frac{1-\cos x}{2}`, and on "the whole fraction" `Create` the radical sign drawn over the entire fraction (build as `MathTex(r"\sin\frac{x}{2} = \pm", r"\sqrt{\frac{1-\cos x}{2}}")` and animate the radical's path). On the last sentence, write `\cos\frac{x}{2} = \pm\sqrt{\frac{1+\cos x}{2}}` beneath it in ORANGE, with the `+` indicated.

**Beat e**
Narration: The plus or minus is not decoration. Only the quadrant of x over two picks the sign. As in Chapter one point four: algebra offers both, geometry picks one.

Visuals: `Circumscribe` both `\pm` signs in YELLOW. Beside them, a small unit circle (radius 1.2) shows the quadrant sign chart for sine (+ + in quadrants one and two, − − in three and four), with a radius at an example angle x/2 in quadrant two highlighted, and the matching sign lighting up. A caption `Tex("Ch.\ 1.4: algebra offers both, geometry picks one")` at scale 0.6.

**Beat f**
Narration: Doubling the angle does not double the value. If sine theta is three fifths in quadrant one, sine of two theta is two times three fifths times four fifths: twenty-four over twenty-five. Not six fifths, which is bigger than one.

Visuals: `\sin\theta = \tfrac35,\ \cos\theta = \tfrac45`, so `\sin 2\theta = 2\cdot\tfrac35\cdot\tfrac45 = \tfrac{24}{25}` with a YELLOW box. Beside it, `\tfrac65` is struck through with a RED `Cross` and the note `\tfrac65 > 1`.

---

## Scene 7 · Products and sums (Lesson 3.5)

**Beat a**
Narration: Add the two cosine formulas, and the sine terms cancel. Subtract, and the cosine terms cancel. A product becomes a sum. Adding the two sine formulas gives the mixed case: sine alpha cosine beta is one half the sum of sine of alpha plus beta and sine of alpha minus beta.

Visuals: An aligned `MathTex` pair: `\cos(\alpha-\beta) = \cos\alpha\cos\beta + \sin\alpha\sin\beta` over `\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta`. A `+` appears in the margin, the `\sin\alpha\sin\beta` terms flash RED and vanish, and the line resolves to `\cos\alpha\cos\beta = \tfrac12[\cos(\alpha-\beta)+\cos(\alpha+\beta)]`. Then a `-` appears in the margin, the `\cos\alpha\cos\beta` terms vanish, and it resolves to `\sin\alpha\sin\beta = \tfrac12[\cos(\alpha-\beta)-\cos(\alpha+\beta)]`. Both results move up to a compact column. Then write the sine pair: `\sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta` over `\sin(\alpha-\beta) = \sin\alpha\cos\beta - \cos\alpha\sin\beta`. A `+` appears, the `\cos\alpha\sin\beta` terms flash RED and vanish, and it resolves to `\sin\alpha\cos\beta = \tfrac12[\sin(\alpha+\beta)+\sin(\alpha-\beta)]`, which joins the column as the third product formula.

**Beat b**
Narration: Two tuning forks, at four hundred forty and four hundred forty-four hertz. Read backwards, their sum becomes a single tone at four hundred forty-two hertz, whose loudness swells four times a second.

Visuals: Clear. Show `\sin A + \sin B = 2\sin\!\left(\tfrac{A+B}{2}\right)\cos\!\left(\tfrac{A-B}{2}\right)` at the top. Below it, `Axes(x_range=[0,1,0.25], y_range=[-2.2,2.2,1], x_length=11, y_length=3)` with time in seconds. Because 440 Hz cannot be drawn legibly, use a scaled stand-in, `f1 = 22, f2 = 26` (same 4 Hz difference), with the caption "scaled down: same beat idea". Plot `sin(2π·22t) + sin(2π·26t)` in BLUE using `axes.plot(f, x_range=[0, 1, 0.001], use_smoothing=False)` so the 24 carrier cycles do not alias. Then overlay the envelope `±2cos(2π·2t)` in dashed YELLOW (same fine sampling). Text: `440\text{ Hz} + 444\text{ Hz} \Rightarrow 442\text{ Hz tone},\ 4 \text{ beats/s}`.

**Beat c**
Narration: Why four? The envelope cycles twice a second, but loudness peaks at both its highs and its lows. Four beats: the difference of the frequencies.

Visuals: Keep the axes. Highlight one full envelope period (t from 0 to 0.5) with a translucent YELLOW `Rectangle`, labeled `2\text{ Hz envelope}`. Then place a small `Dot` on each extreme of the envelope, at t = 0, 0.25, 0.5, 0.75 and 1: tops at 0, 0.5 and 1, bottoms at 0.25 and 0.75. Each `Flash`es as it appears, with a counter `\text{beats}: 1, 2, 3, 4` ticking over the four gaps. Finish with `444 - 440 = 4` in a YELLOW box.

**Beat d**
Narration: Do not memorize these six. Each is one line from the two sum formulas.

Visuals: Clear. Six `MathTex` at scale 0.55 in a grid of 2 columns by 3 rows, all at 50% opacity. Left column (products to sums):
- `\cos\alpha\cos\beta = \tfrac12[\cos(\alpha-\beta)+\cos(\alpha+\beta)]`
- `\sin\alpha\sin\beta = \tfrac12[\cos(\alpha-\beta)-\cos(\alpha+\beta)]`
- `\sin\alpha\cos\beta = \tfrac12[\sin(\alpha+\beta)+\sin(\alpha-\beta)]`

Right column (sums to products):
- `\sin A + \sin B = 2\sin\tfrac{A+B}{2}\cos\tfrac{A-B}{2}`
- `\sin A - \sin B = 2\cos\tfrac{A+B}{2}\sin\tfrac{A-B}{2}`
- `\cos A + \cos B = 2\cos\tfrac{A+B}{2}\cos\tfrac{A-B}{2}`

On "one line from the two sum formulas", all six shrink and move (`LaggedStart` of `Transform`s) into two glowing formulas at center, the Scene 4 results: `\sin(\alpha+\beta) = \sin\alpha\cos\beta + \cos\alpha\sin\beta` (BLUE glow) and `\cos(\alpha+\beta) = \cos\alpha\cos\beta - \sin\alpha\sin\beta` (ORANGE glow).

---

## Scene 8 · The Derivation Game (Lesson 3.6)

**Beat a**
Narration: The whole chapter grows from a small core: Pythagoras, the angle sum formulas, and circle symmetry.

Visuals: A callout box titled "The core set" lists `1.\ \sin^2\theta+\cos^2\theta=1`, `2.\ \sin(\alpha+\beta),\ \cos(\alpha+\beta)`, `3.\ \sin(-\theta)=-\sin\theta,\ \cos(-\theta)=\cos\theta,\ \cos\theta=\sin(\theta+\tfrac{\pi}{2})`, plus a small line `\tan=\tfrac{\sin}{\cos},\ \sec,\csc,\cot`. The box then collapses into a one-line banner across the top of the frame (scale 0.55): `\text{Core: }\ \sin^2\theta+\cos^2\theta=1\ \mid\ \sin(\alpha+\beta),\ \cos(\alpha+\beta)\ \mid\ \text{circle symmetry}`.

**Beat b**
Narration: Everything else is a path from the core. Name it before any algebra. Double angle: beta equals alpha. Half angle: rearrange cosine of two theta. Product to sum: add or subtract sum formulas.

Visuals: Below the banner, a two-column table (a `VGroup` of rows, every cell a `MathTex`, scale 0.55, headers `\textbf{Target}` and `\textbf{Path from the core}`), with a thin GREY rule under the header. All eight lesson rows fade in quickly on "Everything else is a path", in the lesson's order:
1. `1+\tan^2=\sec^2` | `\text{Pythagoras} \div \cos^2`
2. `1+\cot^2=\csc^2` | `\text{Pythagoras} \div \sin^2`
3. `\sin(\alpha-\beta)` | `\text{angle sum},\ \beta\to-\beta,\ \text{then symmetry}`
4. `\sin 2\theta` | `\text{angle sum},\ \beta=\alpha`
5. `\cos 2\theta\ (\text{three forms})` | `\text{angle sum},\ \beta=\alpha,\ \text{then Pythagoras twice}`
6. `\text{Half angle}` | `\text{rearrange } \cos 2\theta,\ \theta\to\tfrac{x}{2}`
7. `\text{Product to sum}` | `\text{add or subtract two angle-sum formulas}`
8. `\tan(\alpha+\beta)` | `\text{divide the sum formulas},\ \div\cos\alpha\cos\beta`

Then rows 4, 6 and 7 are `Indicate`d in YELLOW in turn, each with its spoken sentence. Row height is about 0.6 units, so the header plus eight rows fit under the banner.

**Beat c**
Narration: Prove that sine of two theta, divided by the quantity one plus cosine of two theta, equals tangent theta. The top is two sine theta cosine theta. For the bottom, pick two cosine squared theta minus one. The plus one and the minus one cancel. Cancel the common two cosine theta, top and bottom, and you have tangent theta.

Visuals: Clear. `\frac{\sin 2\theta}{1+\cos 2\theta} = \tan\theta` with a box around the left. Three candidate faces of `\cos 2\theta` hover above the denominator; `2\cos^2\theta - 1` is highlighted and drops in. The chain is `\frac{2\sin\theta\cos\theta}{1 + 2\cos^2\theta - 1}`, then `+1` and `-1` flash RED and vanish, giving `\frac{2\sin\theta\cos\theta}{2\cos^2\theta}`, then one `2\cos\theta` on top and bottom flashes RED and vanishes, giving `\frac{\sin\theta}{\cos\theta} = \tan\theta` with a YELLOW box.

**Beat d**
Narration: When stuck, ask: can I write it in sine and cosine? Is there a hidden sine squared plus cosine squared? Is a double or half angle in sight?

Visuals: Three numbered `Tex` lines appear one at a time with small icons (plain shapes, like a circle, a square and a "2x" glyph).

---

## Scene 9 · Mastery, recap and next chapter (Lesson 3.7, Chapter 3 Mastery)

**Beat a**
Narration: Mastery means choosing the path first. Cosine to the fourth minus sine to the fourth is not a quadruple angle. Factor the difference of squares: cosine squared plus sine squared, which is one, times cosine squared minus sine squared, which is cosine of two theta.

Visuals: Clear. `\cos^4\theta - \sin^4\theta` at center. A tempting `\cos 4\theta` appears to the right and gets a RED `Cross`. A small GREY path tag appears above: `\text{path: difference of squares, then Pythagoras, then double angle}`. Then the chain: `(\cos^2\theta+\sin^2\theta)(\cos^2\theta-\sin^2\theta)` → the first factor transforms to `1` (BLUE and ORANGE merge into WHITE), the second to `\cos 2\theta` → `1\cdot\cos 2\theta = \cos 2\theta` with a YELLOW box.

**Beat b**
Narration: So, three lines.

Visuals: Show "The chapter in three lines" as three `Tex` lines fading in one after another (hold about 5 seconds so they can be read): "1. An identity is true for all valid inputs; prove it by transforming one side." "2. The core set is Pythagoras, angle sum, and circle symmetry. Everything else is a derivation." "3. When stuck: convert to sine and cosine, hunt for a hidden Pythagoras, or bridge angles with the sum formula." Behind them, faintly, the core-set banner from Scene 8.

**Beat c**
Narration: Identities rewrite, they do not solve. In chapter four, we run the machinery backwards: given a value, find every angle that produces it.

Visuals: Clear. Return to the Scene 1 axes with `y = sin(x)` and the line `y = 0.5`. Intersection dots pop in across the whole window. The caption reads `Chapter 4: Solving Trigonometric Equations`. Fade to black.

---

### Lesson-to-scene map
| Lesson | Scenes |
| --- | --- |
| 3.1 What an Identity Is | 1, 2 |
| 3.2 The Pythagorean Family | 3 |
| 3.3 Angle Sum and Difference | 4, 5 |
| 3.4 Double and Half Angle | 6 |
| 3.5 Rewriting Products and Sums | 7 |
| 3.6 The Derivation Game | 8 |
| 3.7 Chapter 3 Mastery | 9 |

---

## Review log

**Coverage gaps**
- 3.2 domain caveat, swapping squares, killing radicals: fixed. Beats 3b and 3c now say "wherever cosine (sine) is not zero" and show GREY notes `\cos\theta \neq 0` and `\sin\theta \neq 0`. The new Beat 3d covers both uses, with `\sqrt{1-\sin^2\theta} \to |\cos\theta|`.
- 3.3 tangent sum path: fixed. Beat 5b now speaks the path (divide the sine formula by the cosine formula, then divide top and bottom by cosine alpha cosine beta), and the visual builds it in two steps instead of a silent footnote.
- 3.4 cosine half-angle and the Chapter 1.4 link: fixed. Beat 6d speaks and shows `\cos\frac{x}{2} = \pm\sqrt{\frac{1+\cos x}{2}}`. The new Beat 6e says "algebra offers both signs, geometry picks one" with a caption.
- 3.5 mixed case and why a 2 Hz envelope gives four beats: fixed. Beat 7a adds the two sine formulas to derive `\sin\alpha\cos\beta = \tfrac12[\sin(\alpha+\beta)+\sin(\alpha-\beta)]` (checked: the sum is 2 sine alpha cosine beta). The new Beat 7c explains that loudness peaks at both highs and lows of the 2 Hz envelope, so four per second. This is the point quiz t3-5-q2 tests.
- 3.6 table: fixed. All eight rows of the lesson's table are shown in the lesson's order. The core box collapses into a top banner so the full table fits, and the three spoken rows are highlighted in turn.
- 3.7 mastery example: fixed. The new Beat 9a works cosine to the fourth minus sine to the fourth with the path named first. It crosses out cosine of four theta, the quiz distractor, and arrives at 1 times cosine of two theta, as in quiz t3-m-q1.

**Issues**
- Critical, Scene 4 point T: fixed. T = (P_x, Q_y) ≈ (0.574, 0.453). I checked the numbers: PT is vertical with length 0.819 − 0.453 = 0.366 = cos 30°·sin 25°. QT is horizontal with length 0.785 − 0.574 = 0.211 = sin 30°·sin 25°. The right angle is at T, and the angle at P between PT and PQ is alpha, because PQ is perpendicular to OQ. Added the dashed horizontal at y = Q_y, a slide of QR under T so the height visibly stacks as QR plus PT, the cosine brace from 0 to P_x, and QT's overhang shown with a left-pointing arrow.
- Major, Scene 4 crowding and colors: fixed. The axes are now [0,1]×[0,1] at 6.5 units with no tick labels. Labels use scale 0.55 with leader lines, and the product labels transform into the right-hand formula and then fade. Recolored: vertical pieces TEAL, horizontal pieces GOLD, so no segment uses RED, GREEN or PURPLE. The cosine minus sign is circumscribed in YELLOW, not RED. I kept alpha = 30° and beta = 25°, not 35°/30°, because they match the lesson's interactive diagram and its caption. The enlarged axes make QT about 1.4 units and PT about 2.4 units, which is enough room.
- Major, Scene 6d ambiguous half-angle phrasing: fixed with the suggested wording. The radical sign is drawn over the full fraction on "the whole fraction".
- Major, Scene 8c TTS ambiguity: fixed with the suggested wording ("divided by the quantity", "The plus one and the minus one cancel", "Cancel the common two cosine theta, top and bottom").
- Major, Scene 6c sync: fixed. The narration is extended to three sentences plus the tag line, and each `Create` is timed to its sentence. The y-range is tightened to [-1.5,1.5].
- Major, Scene 7c vague six formulas: fixed, now Beat 7d. All six are listed explicitly in a 2×3 grid at scale 0.55, and they collapse into the sine and cosine angle-sum formulas from Scene 4.
- Minor, Scene 5b Rotate on signs: fixed. The signs are now `ReplacementTransform` with `Flash`, and the tangent formula is narrated.
- Minor, Scene 1c tangent unnarrated: fixed with the suggested sentences. I dropped "Same notation, opposite jobs." to save words.
- Minor, Scene 3 domain caveat: fixed (see coverage gaps).
- Minor, Scene 6e phrasing and six fifths: fixed, now Beat 6f, with the suggested wording.
- Minor, Scene 7b 442 Hz phrasing and aliasing: fixed. The wording now says "a single tone at four hundred forty-two hertz, whose loudness swells four times a second". Plots use step 0.001 with `use_smoothing=False`.
- Minor, Scene 5c phrasing: fixed ("the square root of six plus the square root of two, all over four").
- Minor, Scene 4a "both": fixed ("Try alpha and beta both equal to pi over two"), with `\alpha=\beta=\tfrac{\pi}{2}` shown on screen.
- Minor, pacing: addressed. Cut the old Scene 2 beat d (the graph check) to one sentence in 2c with a caption only. Shortened Scene 8a to one sentence. Reduced the recap narration to "So, three lines." and let the visuals carry the three lines. Dropped "Plus the definitions of tangent and the reciprocals" (it is still on screen). Every beat was also tightened, and some phrasing was compressed (for example "Done." and "The angle sum formula is worth deriving slowly." were dropped). Narration is now about 1011 words. That is at the ceiling rather than 900 to 950, because six coverage gaps were added. At about 175 words per minute it runs about 5.8 minutes of speech, and with visual holds it lands near 6.5 minutes, inside the 4 to 7 minute window.
- Minor, Scene 8b Text cells: fixed. Every table cell, header included, is `MathTex` (with `\text{}` for words), at scale 0.55. I did not follow "keep 4 or 5 rows": that conflicts with the coverage gap asking for all eight rows. I solved the fit by moving the core set into a top banner instead.
