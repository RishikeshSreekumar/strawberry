# Course: Calculus, From Limits to Curve Sketching

**Slug:** `calculus` (the original course; Chapters 0–1 are seeded by `scripts/seed-chapter-0.ts` and `scripts/seed-chapter-1.ts`, Chapters 2–5 by `scripts/seed-calculus.ts`. Same block schema, same seed-script pattern as the other courses.)

**Purpose:** Teach the whole of JEE Main + Advanced *differential* calculus as one story: a limit is the value a function is heading for; the derivative is a limit of secant slopes; differentiation rules are that limit computed once and reused; and every application (rates, tangents, monotonicity, mean value theorems, approximations, extrema, curve sketching, inequalities) is the derivative read as a slope or as a rate.

**End state:** Given any differential-calculus question, the student can reconstruct the answer from:

```text
limit (where is f heading?) → derivative = lim (f(x+h) − f(x))/h
   → rules (sum, product, quotient, chain) → techniques (implicit, log, parametric, nth)
   → read f′ as:  slope  (tangents, normals, angles between curves)
                  rate   (related rates, approximations, errors)
                  sign   (increasing/decreasing, extrema, inequalities)
   → read f″ as:  bending (concavity, inflection, second-derivative test)
```

They should never need a memorised list of answers. They should be able to say *why* $\frac{\sin x}{x} \to 1$ (area squeeze), *why* $(1 + x)^{1/x} \to e$ (the $1^\infty$ form is $e^{\lim g(f-1)}$), *why* the product rule has two terms (area of a growing rectangle), and *why* a smooth function on $[a, b]$ has a tangent parallel to its chord (Rolle on the tilted picture).

**Three threads run through every chapter**
1. **Intuition + visualization:** slopes before formulas. Every new idea first appears as a tangent line that moves (`calc-tangent-explorer`) or a sign chart that lights up (`calc-sign-chart`).
2. **Derivation drill:** every standard result is derived from a small core (the definition of the derivative, the squeeze theorem, the limit $(1 + x)^{1/x} \to e$, the chain rule), never stated cold. Mastery lessons hide the formula sheet.
3. **JEE depth:** every lesson ends with previous-year-style problems written in our own words: single-correct, one-or-more-correct, and numerical-answer, with a hint on every question.

---

## Chapter map

| Ch | Title | Core idea | Status |
| -- | ----- | --------- | ------ |
| 0 | Functions: The Language of Calculus | Formula ↔ table ↔ graph ↔ behaviour; calculus studies how outputs change | Existing (`chapter-0-content.ts`, outline in `chatper_0.md`) |
| 1 | Limits: The Art of Getting Close | The limit is the value approached, not the value at the point | Existing (`chapter-1-content.ts`) |
| 2 | Standard Limits and the Derivative | The JEE standard limits; the derivative as a limit; differentiability | New (`calc-chapter-2-content.ts`) |
| 3 | Differentiation Techniques | Rules and techniques that compute every derivative JEE asks for | New (`calc-chapter-3-content.ts`) |
| 4 | Applications of Derivatives | Rates, tangents and normals, monotonicity, mean value theorems, approximations | New (`calc-chapter-4-content.ts`) |
| 5 | Maxima, Minima and Curve Sketching | Critical points, both derivative tests, optimisation, concavity, sketching, inequalities | New (`calc-chapter-5-content.ts`) |

---

## Chapter 0: Functions: The Language of Calculus (existing)

Lessons 0.1–0.10 plus mastery: what a function is, notation, domain and range, reading graphs, how functions change, transformations, function families, combining functions, piecewise functions, and "from functions to calculus" (average rate of change and the secant whose slope at a single point demands $\frac{0}{0}$). Full plan in `chatper_0.md`.

## Chapter 1: Limits: The Art of Getting Close (existing)

Lessons 1.1–1.10 plus mastery: the idea of a limit (tables, `limit-explorer`), limits ignore the point, one-sided limits, when limits fail (jump, blow-up, oscillation), limit laws, the $\frac{0}{0}$ puzzle (factor, rationalise), limits at infinity, continuity and the IVT, the ε–δ definition, and the first derivative computed from the limit of a difference quotient ($\frac{d}{dx}x^2 = 2x$). Chapter 1 only *estimates* $\frac{\sin x}{x} \to 1$ from a table; the standard limits are proved in Chapter 2.

---

## Chapter 2: Standard Limits and the Derivative

**Slug:** `standard-limits-and-the-derivative`

**Purpose:** prove and drill the JEE standard limits (trig, exponential, logarithmic, power, $1^\infty$), give the series intuition that makes them obvious, then define the derivative properly, separate differentiability from continuity, and derive the derivatives of the basic functions from first principles.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 2.1 | `squeeze-and-trig-limits` | The Squeeze Theorem and Trig Limits | Trap a function between two that agree; $\frac{\sin x}{x} \to 1$ by an area squeeze | Squeeze theorem with $x^2\sin\frac1x$; the sector-area sandwich $\cos x < \frac{\sin x}{x} < 1$; $\frac{\tan x}{x}$, $\frac{1 - \cos x}{x^2} \to \frac12$, $\frac{\sin ax}{bx}$, $\frac{\sin^{-1}x}{x}$, $\frac{\tan^{-1}x}{x}$. Interactive: `limit-explorer` on $\frac{\sin x}{x}$. Misconceptions killed: "degrees work too" ($\frac{\sin x°}{x} \to \frac{\pi}{180}$) and "$\frac{\sin x}{x} \to 1$ as $x \to \infty$" (it goes to 0) |
| 2.2 | `exponential-and-log-limits` | Exponential, Logarithmic and Power Limits | $e$ is the base for which $\frac{e^x - 1}{x} \to 1$ | $e = \lim (1 + \frac1n)^n$ (compound interest table); $\frac{e^x - 1}{x} \to 1$, $\frac{\ln(1 + x)}{x} \to 1$, $\frac{a^x - 1}{x} \to \ln a$, $\frac{x^n - a^n}{x - a} \to na^{n-1}$ (factorisation and its use for rational $n$). Substitution to reduce to a standard form. Misconception killed: "$\frac{a^x - 1}{x} \to a$" |
| 2.3 | `one-to-the-infinity-and-series` | The One-to-the-Infinity Form and Series Intuition | $\lim f^g = e^{\lim g(f - 1)}$ when $f \to 1$, $g \to \infty$ | Why $1^\infty$ is indeterminate; $(1 + x)^{1/x} \to e$; the $e^{\lim g(f-1)}$ shortcut derived from $\frac{\ln(1+t)}{t} \to 1$. Series intuition: $\sin x \approx x - \frac{x^3}{6}$, $\cos x \approx 1 - \frac{x^2}{2}$, $e^x \approx 1 + x + \frac{x^2}{2}$, $\ln(1 + x) \approx x - \frac{x^2}{2}$, $\tan x \approx x + \frac{x^3}{3}$; using them for $\frac{x - \sin x}{x^3}$, finding constants $a, b$ so a limit is finite. Interactive: `transform-playground` comparing $\sin x$ with its polynomial approximations. Misconception killed: "$1^\infty = 1$" |
| 2.4 | `the-derivative` | The Derivative: Slope, Rate, First Principles | $f'(a) = \lim_{h \to 0}\frac{f(a + h) - f(a)}{h}$, the slope of the tangent and the instantaneous rate | Both forms of the definition; notation $f'$, $\frac{dy}{dx}$, $\dot x$; first principles for $x^2$, $\frac1x$, $\sqrt x$, $x^3$; reading $f'(a)$ as tangent slope and as speed. Interactive: `calc-tangent-explorer` with the secant slider and the $f'$ panel. Limits that are derivatives in disguise ($\lim \frac{f(a + 2h) - f(a - h)}{h} = 3f'(a)$). Misconception killed: "the tangent touches the curve at only one point" |
| 2.5 | `differentiability-and-continuity` | Differentiability and Continuity | Differentiable ⇒ continuous, not conversely | LHD and RHD; proof that differentiability implies continuity; corners ($\lvert x \rvert$), cusps ($\lvert x\rvert^{2/3}$), vertical tangents ($x^{1/3}$), $x\sin\frac1x$ vs $x^2\sin\frac1x$; piecewise functions: find $a, b$ so $f$ is differentiable. Interactive: `calc-tangent-explorer` on $\lvert x \rvert$ and on a cusp. Misconception killed: "continuous means differentiable" |
| 2.6 | `derivatives-of-basic-functions` | Derivatives of the Basic Functions | Every entry of the table comes from one limit computed once | Power rule from the binomial expansion (and from $\frac{x^n - a^n}{x - a}$); linearity (sum and constant multiple); $\sin$, $\cos$ from the trig limits; $e^x$, $a^x$; $\ln x$, $\log_a x$; tangent-line uses. Interactive: `calc-tangent-explorer` on $\sin x$ with $f'$ panel showing $\cos x$. Misconception killed: "$\frac{d}{dx}e^x = xe^{x-1}$" |
| 2.7 | `chapter-2-mastery` | Chapter 2 Mastery | Limits and derivatives from scratch | Mixed mastery: every standard limit, a $1^\infty$ problem, constants from a series condition, first principles, LHD/RHD of a piecewise function, counting non-differentiable points, JEE-style numerical answers |

## Chapter 3: Differentiation Techniques

**Slug:** `differentiation-techniques`

**Purpose:** the toolbox. Combine the basic derivatives with the product, quotient and chain rules; then the special techniques JEE tests: inverse trig with substitutions, implicit, logarithmic and parametric differentiation, derivative of one function with respect to another, higher derivatives, differentiability of special and composite functions, and L'Hôpital's rule.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 3.1 | `product-and-quotient-rules` | Product and Quotient Rules | $(uv)' = u'v + uv'$: a growing rectangle gains two strips | Area-of-a-rectangle picture; proof from first principles; quotient rule from the product rule; derivatives of $\tan$, $\sec$, $\csc$, $\cot$; products of three functions. Misconception killed: "$(uv)' = u'v'$" |
| 3.2 | `the-chain-rule` | The Chain Rule | Rates multiply through a composition: $\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$ | Gears picture; Leibniz form; nested functions (outside-in); $\frac{d}{dx}f(ax + b)$; with powers, trig, exp, log; $\frac{d}{dx}\lvert x\rvert = \frac{x}{\lvert x\rvert}$; functional equations ($f(g(x))$ given). Interactive: `composition-machine` reused. Misconception killed: "$\frac{d}{dx}\sin(x^2) = \cos(2x)$" |
| 3.3 | `implicit-and-inverse-trig` | Implicit Differentiation and Inverse Trig Functions | Differentiate both sides, treating $y$ as $y(x)$ | Circle and $x^3 + y^3 = 3axy$; derivatives of $\sin^{-1}$, $\cos^{-1}$, $\tan^{-1}$, $\cot^{-1}$, $\sec^{-1}$, $\csc^{-1}$ derived implicitly; substitution simplifications ($\sin^{-1}\frac{2x}{1 + x^2}$, $\tan^{-1}\frac{\sqrt{1 + x^2} - 1}{x}$) with branch care. Misconception killed: "$\frac{d}{dx}\sin^{-1}x = \frac{1}{\sin x}$" (and "$\cos x$") |
| 3.4 | `logarithmic-and-parametric` | Logarithmic and Parametric Differentiation | Take logs to turn powers and products into sums; parameters to split a curve into two rates | $x^x$, $(\sin x)^{\cos x}$, $x^{\sin x} + (\sin x)^x$, long products and quotients; $x^y = e^{x - y}$; parametric $\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$ (circle, cycloid, ellipse); derivative of one function with respect to another. Misconception killed: "$\frac{d}{dx}x^x = x\cdot x^{x-1}$" |
| 3.5 | `higher-order-derivatives` | Higher-Order Derivatives | $f''$ is the rate of change of the slope; patterns give the $n$th derivative | Second derivative as acceleration and as bending; $n$th derivatives of $e^{ax}$, $\sin(ax + b)$, $\frac{1}{ax + b}$, $\ln x$, $x^n$; partial fractions for $\frac{1}{x^2 - 1}$; Leibniz rule (brief); differential equations satisfied by a given $y$ (e.g. $(1 - x^2)y'' - xy' = m^2y$); parametric second derivative. Interactive: `calc-tangent-explorer` with the $f'$ panel. Misconception killed: "$\frac{d^2y}{dx^2} = \frac{d^2y/dt^2}{d^2x/dt^2}$" |
| 3.6 | `differentiability-of-special-functions` | Differentiability of Special and Composite Functions | Check LHD = RHD at every suspicious point | $\lvert f(x)\rvert$ (sharp zeros), $[x]$ and $\{x\}$, $\max/\min$ of two functions, piecewise and composite functions; $x\lvert x\rvert$ is differentiable; product of a differentiable function with $\lvert x - a\rvert$; counting non-differentiable points (JEE classic). Interactive: `calc-tangent-explorer` on $\lvert x^2 - 1\rvert$. Misconception killed: "every zero of $f$ is a corner of $\lvert f\rvert$" |
| 3.7 | `lhopital-rule` | L'Hôpital's Rule | For $\frac00$ or $\frac{\infty}{\infty}$, compare the rates: $\lim\frac fg = \lim\frac{f'}{g'}$ | Why it works (both start at 0; compare speeds); conditions; repeated use; converting $0\cdot\infty$, $\infty - \infty$, $1^\infty$, $0^0$, $\infty^0$ via logs; when to prefer series; when it fails ($\frac{x + \sin x}{x}$ at infinity). Misconception killed: "differentiate the quotient with the quotient rule" |
| 3.8 | `chapter-3-mastery` | Chapter 3 Mastery | Choose the right technique | Mixed mastery: product/chain combos, inverse trig substitution, implicit, $x^x$-type, parametric second derivative, $n$th derivative, counting non-differentiable points, L'Hôpital, numerical answers |

## Chapter 4: Applications of Derivatives

**Slug:** `applications-of-derivatives`

**Purpose:** read $f'$ as a rate and as a slope: related rates, tangents and normals (with subtangent, subnormal and the angle between curves), monotonicity, the mean value theorems, and linear approximation with errors.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 4.1 | `rates-of-change` | Rates of Change and Related Rates | Differentiate the relationship with respect to time | Rate of change of area, volume, surface; the related-rates recipe (draw, name, relate, differentiate, substitute last); ladder, conical tank, shadow, balloon, two cars. Misconception killed: "substitute the instantaneous values before differentiating" |
| 4.2 | `tangents-and-normals` | Tangents and Normals | Tangent: slope $f'(x_0)$; normal: slope $-\frac{1}{f'(x_0)}$ | Equations of tangent and normal (explicit, implicit, parametric); horizontal and vertical tangents; tangent parallel/perpendicular to a line; tangents from an external point; intercepts. Interactive: `calc-tangent-explorer`. Misconception killed: "the normal's slope is $-f'(x_0)$" |
| 4.3 | `subtangent-subnormal-and-angles` | Subtangent, Subnormal and Angles Between Curves | Lengths cut on the $x$-axis; the angle between curves is the angle between their tangents | Lengths of tangent, normal, subtangent $\lvert y/y'\rvert$, subnormal $\lvert yy'\rvert$; constant subnormal of a parabola; angle between curves $\tan\theta = \left\lvert\frac{m_1 - m_2}{1 + m_1m_2}\right\rvert$; orthogonal curves (condition for $ax^2 + by^2 = 1$, $a'x^2 + b'y^2 = 1$). Misconception killed: "curves meet at an angle equal to the difference of their slopes" |
| 4.4 | `increasing-and-decreasing-functions` | Increasing and Decreasing Functions | The sign of $f'$ decides the direction | Definitions (strict and non-strict); $f' > 0$ ⇒ increasing (via MVT later); intervals of monotonicity from a sign chart; parameters for which $f$ is monotonic on $\mathbb{R}$ (discriminant of $f'$); monotonicity of composites; isolated zeros of $f'$ allowed ($x^3$). Interactive: `calc-sign-chart`. Misconception killed: "increasing means $f' > 0$ everywhere" |
| 4.5 | `rolle-and-mean-value-theorems` | Rolle's Theorem and the Mean Value Theorem | A smooth trip with equal endpoints has a flat moment; tilt it and the chord slope is hit | Rolle: conditions (continuous on $[a,b]$, differentiable on $(a,b)$, $f(a) = f(b)$) and failures ($\lvert x\rvert$, jumps); LMVT as tilted Rolle; finding $c$; consequences ($f' = 0$ ⇒ constant, $f' > 0$ ⇒ increasing, roots between roots, bounding $f(b) - f(a)$). Interactive: `calc-tangent-explorer` in chord mode. Misconception killed: "Rolle's theorem gives exactly one $c$" |
| 4.6 | `approximations-and-errors` | Approximations, Differentials and Errors | Near a point, a smooth curve is its tangent line | $\Delta y \approx f'(x)\Delta x$, $dy = f'(x)dx$; approximating $\sqrt{25.2}$, $(1.98)^5$, $\sin 31°$; absolute, relative and percentage error; error propagation in $V = \frac43\pi r^3$ etc. Interactive: `calc-tangent-explorer` zoomed in. Misconception killed: "percentage error in $r^3$ equals percentage error in $r$" |
| 4.7 | `chapter-4-mastery` | Chapter 4 Mastery | Slope and rate, from scratch | Mixed mastery: related rates, tangent/normal equations, subnormal, angle between curves, monotonic intervals with a parameter, Rolle/LMVT conditions and $c$, approximations and percentage errors |

## Chapter 5: Maxima, Minima and Curve Sketching

**Slug:** `maxima-minima-and-curve-sketching`

**Purpose:** use $f'$ and $f''$ to find and classify extrema, solve optimisation problems, describe concavity and inflection, sketch curves, count roots, and prove inequalities.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 5.1 | `critical-points-first-derivative-test` | Critical Points and the First-Derivative Test | Extrema hide where $f' = 0$ or $f'$ fails to exist; the sign change of $f'$ decides | Local vs global extrema; Fermat's theorem; critical points including corners; first-derivative test with sign charts; stationary points that are not extrema ($x^3$); extrema of $\lvert f\rvert$ and piecewise functions. Interactive: `calc-sign-chart`. Misconception killed: "$f'(c) = 0$ means $c$ is a max or min" |
| 5.2 | `second-derivative-test` | The Second-Derivative Test | At a flat point, concave up is a min, concave down a max | Test statement and proof idea; when it is inconclusive ($f'' = 0$: $x^4$, $x^3$); higher-order (nth derivative) test; cubic and quartic examples; parameter conditions (e.g. local max at a given point). Misconception killed: "$f''(c) = 0$ means inflection" |
| 5.3 | `absolute-extrema-closed-intervals` | Absolute Extrema on Closed Intervals | Check endpoints and critical points, pick the biggest and smallest | Extreme value theorem; closed-interval method; range of a function via extrema; open intervals and unbounded domains (no guarantee); greatest/least values of trig expressions. Interactive: `calc-sign-chart` with `interval`. Misconception killed: "the absolute max is the largest local max" |
| 5.4 | `concavity-and-inflection` | Concavity and Points of Inflection | $f'' > 0$ bends up, $f'' < 0$ bends down; inflection is where the bending flips | Concavity via slopes increasing; tangent below/above the curve; inflection points (sign change of $f''$, $f$ continuous); inflection with vertical tangent ($x^{1/3}$); parameter problems. Interactive: `calc-sign-chart` with both rows. Misconception killed: "$f''(c) = 0$ guarantees inflection" ($x^4$) |
| 5.5 | `optimisation-in-geometry` | Optimisation: Shapes and Solids | Write the quantity in one variable, then differentiate | Recipe; open box from a sheet; fencing against a wall; window problems; cylinder of max volume in a sphere; cone of max volume in a sphere ($h = \frac{4R}{3}$); cylinder in a cone; least surface for given volume. Interactive: `graph-explorer` on the volume function. Misconception killed: "a critical point of the objective is automatically the answer" (check endpoints / domain) |
| 5.6 | `optimisation-distances` | Optimisation: Distances and Constraints | The shortest segment from a point to a curve is along the normal | Distance from a point to a curve (minimise the squared distance); shortest distance between a curve and a line (tangent parallel to the line); between two curves (common normal); AM–GM cross-check; product/sum constraints; economics-style profit. Misconception killed: "minimise the distance, not the square" (they share minimisers; the square is easier) |
| 5.7 | `curve-sketching-and-inequalities` | Curve Sketching and Inequalities | Domain, intercepts, symmetry, asymptotes, $f'$ chart, $f''$ chart → the whole graph; monotonicity proves inequalities | Sketching checklist with $\frac{x}{1 + x^2}$, $xe^{-x}$, $x + \frac1x$, $\frac{\ln x}{x}$; counting real roots of $f(x) = k$; comparing $e^\pi$ vs $\pi^e$; proving $e^x \ge 1 + x$, $\sin x < x < \tan x$, $\frac{x}{1 + x} < \ln(1 + x) < x$ by monotonicity. Interactive: `calc-sign-chart`. Misconception killed: "plot points and join them" |
| 5.8 | `chapter-5-mastery` | Chapter 5 Mastery | Find, classify, optimise, sketch, prove | Mixed mastery: classification by both tests, closed-interval extrema, inflection with parameters, a box/cone optimisation, distance from a curve, number of roots, one inequality reconstructed |

---

## Engineering work this extension needs

- **New interactives** (`src/modules/content/components/interactives/`, schemas under `// ---------- Calculus (calc) interactives ----------` in `schemas/blocks.ts`):
  - `calc-tangent-explorer`: drag $x_0$ along $f$; tangent line, LHD/RHD readouts (numerical), corner/cusp detection (two half-tangents or a vertical line), optional secant slider $h$, optional $f'$ panel (`derivExpr`), optional MVT chord mode (`chord: {a, b}`) marking every $c$ with $f'(c)$ equal to the chord slope.
  - `calc-sign-chart`: $f$ with critical points and inflection points found numerically, sign charts of $f'$ and $f''$, a scanning $x$ slider, and an optional closed-interval mode (`interval: {a, b}`) that tabulates candidates and highlights the absolute max and min.
  - Shared numerics in `calc-shared.ts` (safe evaluation, one-sided quotients, sign-change root finding).
- **Reused:** `limit-explorer`, `secant-explorer`, `transform-playground`, `graph-explorer`, `composition-machine`.
- **Seed:** `scripts/seed-calculus.ts` seeds Chapters 2–5 into the existing `calculus` course (looked up by slug) and refreshes the course description.
- **Test:** `tests/calc-course-content.test.ts` (lesson counts, mastery lessons, KaTeX validity, plain titles, quiz correctness, `calc<chapter>-<lesson>-q<k>` ids, render smoke test, interactive smoke tests).
- **Deferred:** chapter overview videos for Chapters 2–5.
