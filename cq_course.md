# Course: Complex Numbers and Quadratic Equations, Roots, Rotations and the Plane

**Slug:** `complex-numbers-quadratics` (a course alongside `trigonometry`, `vector-algebra` and `permutations-combinations-binomial`; same block schema, same seed-script pattern). Content prefix `cq`: files `src/modules/content/cq-chapter-N-content.ts`, exports `cqChapterNLessons`, question ids `cqN-M-qK`.

**Purpose:** Take a student from "solve $x^2 - 5x + 6 = 0$" to the full JEE Main + Advanced syllabus of quadratic equations and complex numbers. The two halves are one story: the quadratic formula forces us to take square roots of negative numbers, and the numbers that result turn out to be points of a plane in which multiplication is rotation. Every chapter keeps the picture (a parabola, an arrow, a circle of roots) in front of the algebra.

**End state:** Given any quadratic or complex-number question, the student can reconstruct the answer from:

```text
parabola y = ax² + bx + c   →  D = b² − 4ac decides how it meets the axis
                                α + β = −b/a, αβ = c/a decide everything symmetric
                                f(k), −b/2a, D decide where the roots sit

z = x + iy = r e^{iθ}       →  adding = adding arrows
                                multiplying = scaling by r and rotating by θ
                                n-th roots = a regular n-gon on a circle
                                |z − a| = distance, arg((z−a)/(z−b)) = angle
```

They should never need a memorised list of location-of-roots cases or ω tricks: each is a picture of a parabola or of three points on a circle.

**Three threads run through every chapter**
1. **Picture first:** every result appears first on a graph or in the Argand plane (the `cq-quadratic-explorer`, `cq-argand-plane` and `cq-locus-explorer` interactives), then as a formula.
2. **Derivation drill:** results are derived from a small core (completing the square, Vieta, $i^2 = -1$, $z\bar z = |z|^2$, $e^{i\alpha}e^{i\beta} = e^{i(\alpha+\beta)}$), never stated cold. Each mastery lesson hides the formula sheet ("reconstruct it").
3. **JEE pay-off:** every lesson ends with JEE Main / Advanced style questions (single-correct, multiple-correct and numerical), written in our own words.

---

## Chapter map

| Ch | Title | Core idea |
| -- | ----- | --------- |
| 0 | Quadratic Equations | Completing the square gives the formula; $D$ decides the nature of roots; Vieta turns roots into coefficients |
| 1 | Quadratic Expressions, Location of Roots and Inequalities | The parabola's sign pattern answers every "for which $x$" and "where are the roots" question |
| 2 | Complex Numbers as Numbers | $i^2 = -1$ plus ordinary algebra; conjugate and modulus are the two key tools |
| 3 | The Argand Plane and Polar Form | $z$ is a point: modulus is distance, argument is direction, multiplication is scale-and-rotate |
| 4 | De Moivre's Theorem and Roots of Unity | Powers rotate repeatedly; $n$-th roots sit on a regular polygon; $\omega$ simplifies everything |
| 5 | Geometry with Complex Numbers | Distances, loci and rotations written as one-line complex equations |

## New interactives

| Component | What it shows | Used in |
| --------- | ------------- | ------- |
| `cq-quadratic-explorer` | Parabola $y = ax^2 + bx + c$ with $a, b, c$ sliders; $D$, roots (real, equal or $p \pm qi$), vertex, $\alpha+\beta$, $\alpha\beta$, factored form, range; optional sign colouring of the x-axis; optional markers $k$ or $(k_1, k_2)$ with the live location-of-roots checklist | Ch 0, Ch 1 |
| `cq-argand-plane` | Draggable complex numbers. Modes `point` (modulus, principal argument, polar/Euler form, conjugate, $-z$, $iz$, $1/z$), `sum` (parallelogram, triangle inequality, difference), `product` (scale-and-rotate, args add, quotient), `powers` ($z, z^2, \dots, z^n$), `roots` ($n$-th roots of $w$ as a regular polygon), `rotation` (triangle $z_1z_2z_3$, ratio $(z_3-z_1)/(z_2-z_1)$, equilateral test) | Ch 2, 3, 4, 5 |
| `cq-locus-explorer` | Loci with foci $a, b$: circle, bisector, ellipse, hyperbola branch, Apollonius circle, arc $\arg\frac{z-a}{z-b} = \theta$; draggable test point $P$ with the defining quantity; probe $q$ marking min/max of $\lvert z - q\rvert$ on the locus | Ch 5 |

---

## Chapter 0: Quadratic Equations

**Purpose:** solve any quadratic, explain why the formula works, read the nature of roots from $D$, and move fluently between roots and coefficients.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 0.1 | What a Quadratic Equation Is | $ax^2 + bx + c = 0$ with $a \ne 0$; roots are where the parabola meets the x-axis | Standard form, degree, roots vs zeros. Zero-product rule and factorising by splitting the middle term. `cq-quadratic-explorer` with roots readout. A quadratic has at most two roots, so one satisfied by three distinct values is an identity ($a = b = c = 0$). Misconceptions: dividing both sides by $x$ (loses $x = 0$); "$(x-2)(x-3) = 6$ means $x - 2 = 6$ or $x - 3 = 6$" |
| 0.2 | Completing the Square and the Quadratic Formula | Every quadratic is a shifted, stretched $x^2$ | Completing the square on numeric examples, then in general to derive $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$. Vertex form $a(x-h)^2 + k$. Worked examples incl. irrational roots. Misconception: forgetting to divide $b$ by $2a$ |
| 0.3 | The Discriminant and the Nature of Roots | $D = b^2 - 4ac$ decides real/equal/complex; rational iff $D$ is a perfect square (rational coefficients) | Table of cases with parabola pictures (`cq-quadratic-explorer`, slide $c$ through the tangency). Conjugate surd roots $p \pm \sqrt q$ for rational coefficients. Parameter problems: equal roots, real roots, $k$ ranges. Misconceptions: "rational roots whenever $D \ge 0$"; using the rational-roots test with irrational coefficients |
| 0.4 | Sum and Product of Roots | $\alpha + \beta = -b/a$, $\alpha\beta = c/a$ | Derivation by comparing $a(x-\alpha)(x-\beta)$ with $ax^2+bx+c$. Forming the equation $x^2 - (\text{sum})x + \text{product} = 0$. Roots in a given ratio, one root the square of the other, roots differing by a constant. Misconception: sign of the sum |
| 0.5 | Symmetric Functions of Roots | Any symmetric expression is a polynomial in $\alpha+\beta$ and $\alpha\beta$ | $\alpha^2+\beta^2$, $(\alpha-\beta)^2$, $\alpha^3+\beta^3$, $\alpha^4+\beta^4$, $\frac{1}{\alpha}+\frac1\beta$, $\frac{\alpha}{\beta}+\frac{\beta}{\alpha}$. Newton's recurrence $aS_{n} + bS_{n-1} + cS_{n-2} = 0$ (JEE favourite: $\frac{a_{10} - 2a_8}{2a_9}$). Misconception: $\lvert\alpha - \beta\rvert = \sqrt{(\alpha+\beta)^2 - 2\alpha\beta}$ |
| 0.6 | Transformation of Roots | To get an equation with roots $g(\alpha)$, substitute the inverse of $g$ | Roots $k\alpha$ (replace $x$ by $x/k$), $\alpha + k$ ($x - k$), $1/\alpha$ (reverse coefficients), $-\alpha$, $\alpha^2$ (via $\sqrt{x}$ and squaring), $\frac{\alpha}{\alpha+1}$-type Möbius substitutions. Misconception: "roots $\alpha + 2$ means replace $x$ by $x + 2$" |
| 0.7 | Equations Reducible to Quadratics | A substitution turns the equation into a quadratic; check each solution against the original | Biquadratics $x^4 - 5x^2 + 4 = 0$, $(x+a)(x+b)(x+c)(x+d)$ pairing, reciprocal equations with $t = x + \frac1x$, exponential $4^x - 3\cdot 2^{x+1} + 8 = 0$, radical equations and extraneous roots, $x^{2/3}$ substitutions. Misconception: keeping a root that fails the original equation |
| 0.8 | Chapter 0 Mastery | Reconstruct the formula, the nature-of-roots table and Vieta from scratch | Mixed JEE Main/Advanced problems: parameter ranges from $D$, symmetric functions, transformation, reducible equations, Newton sums |

## Chapter 1: Quadratic Expressions, Location of Roots and Inequalities

**Purpose:** read off everything about $f(x) = ax^2 + bx + c$ from its graph: its sign, its extreme value, where its roots sit relative to given numbers, shared roots with another quadratic; then solve quadratic, rational, modulus and logarithmic inequalities; extend Vieta to cubics and quartics.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 1.1 | The Graph of a Quadratic | Vertex $(-\frac{b}{2a}, -\frac{D}{4a})$; six shapes from the signs of $a$ and $D$ | `cq-quadratic-explorer` (vertex, axis). Table of the six pictures. Reading signs of $a$, $b$, $c$, $D$ from a graph (JEE Main favourite). Misconception: "the y-intercept is the vertex" |
| 1.2 | Sign and Extreme Values of a Quadratic | $f(x) > 0$ for all real $x$ iff $a > 0$ and $D < 0$; extreme value $-\frac{D}{4a}$ | Always-positive / always-negative conditions with parameters. Max/min on all of $\mathbb R$ and on a closed interval (vertex inside or not). Range of $\frac{x^2 + px + q}{x^2 + rx + s}$ by the "$D \ge 0$ in $x$" method. `cq-quadratic-explorer` with `showSign`. Misconception: "minimum on $[p,q]$ is always at the vertex" |
| 1.3 | Location of Roots | Conditions from $D$, the sign of $a\,f(k)$ and the position of $-\frac{b}{2a}$ | `cq-quadratic-explorer` with markers $k$ and $(k_1, k_2)$ and the live checklist. The standard cases: both roots $> k$, both $< k$, $k$ between the roots, both in $(k_1, k_2)$, exactly one in $(k_1, k_2)$, interval between roots; roots of opposite sign ($c/a < 0$). Worked parameter problems. Misconception: forgetting $D \ge 0$ or the vertex condition |
| 1.4 | Common Roots of Two Quadratics | One common root: eliminate $\alpha^2$ and $\alpha$; both roots common: coefficients proportional | Cross-multiplication condition $(c_1a_2 - c_2a_1)^2 = (a_1b_2 - a_2b_1)(b_1c_2 - b_2c_1)$; subtraction trick; proportional coefficients. Common root with a non-real-root partner (if one quadratic has non-real roots then both roots are shared). Misconception: equating the quadratics and solving the difference |
| 1.5 | Quadratic and Rational Inequalities: the Wavy-Curve Method | The sign of a product changes only at its zeros (odd multiplicity) | Solving $ax^2+bx+c > 0$ from the graph. Wavy-curve (sign-scheme) method for $\frac{(x-1)^2(x+2)}{(x-3)(x+4)^3} \ge 0$: critical points, even multiplicity, excluded points. Interval notation answers. Misconception: cross-multiplying a rational inequality by an expression of unknown sign |
| 1.6 | Modulus and Logarithmic Equations and Inequalities | Split by sign, or substitute $t = \lvert x \rvert$; for logs, domain first | $\lvert x\rvert^2 - 5\lvert x\rvert + 6 = 0$, $\lvert x^2 - 3x\rvert < 2$, $\lvert x - 1\rvert + \lvert x - 3\rvert = 4$; $\log$ equations reducing to quadratics ($\log_2 x + \log_x 2 = \frac52$, $\log_{x}(x^2-\dots)$) with domain checks; log inequalities with base $>1$ vs base in $(0,1)$. Misconception: "$\lvert x\rvert < a$ is solved by $x < a$" and flipping a log inequality for base $> 1$ |
| 1.7 | Cubic and Higher-Degree Equations: Vieta Again | $\sum\alpha = -\frac ba$, $\sum\alpha\beta = \frac ca$, $\alpha\beta\gamma = -\frac da$, and the quartic analogues | Derivation from $a(x-\alpha)(x-\beta)(x-\gamma)$. Symmetric sums ($\sum\alpha^2$, $\sum\frac1\alpha$, $\sum\alpha^2\beta$), roots in AP / GP, forming a cubic, transformation of a cubic's roots. Rational-root test, factor theorem, number of real roots of a cubic from its turning points (qualitative). Misconception: alternating signs |
| 1.8 | Chapter 1 Mastery | Reconstruct the location-of-roots conditions from a sketch | Mixed JEE problems: location with parameters, always-positive conditions, common roots, wavy curve, modulus/log equations, cubic Vieta |

## Chapter 2: Complex Numbers as Numbers

**Purpose:** introduce $i$ honestly (as the number the quadratic formula and Cardano's cubic demand), then make the algebra of $a + ib$, conjugates and moduli completely routine, ending with square roots of complex numbers and quadratics with complex roots.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 2.1 | Why We Need i | Declare a number with $i^2 = -1$ and keep all the old rules | $x^2 + 1 = 0$; Cardano's cubic $x^3 = 15x + 4$ whose real root $4$ passes through $\sqrt{-121}$. $\sqrt{-a} = i\sqrt a$ for $a > 0$. Trap: $\sqrt{-4}\sqrt{-9} \ne \sqrt{36}$. Misconception: "$\sqrt{a}\sqrt{b} = \sqrt{ab}$ always" |
| 2.2 | The Algebra of a + ib | Real part, imaginary part, equality, add, subtract, multiply | Definitions; equality of complex numbers (two real equations); solving $(x + iy)(2 - 3i) = 4 + i$ for real $x, y$. `cq-argand-plane` (mode `sum`) as a preview. No order: "$3 + i > 2 + i$" is meaningless. Misconception: "Im$(3 - 4i) = -4i$" |
| 2.3 | Division and Powers of i | Divide by multiplying by the conjugate; $i^n$ cycles with period 4 | Rationalising $\frac{3 + 2i}{1 - i}$; $i^n$ table, $i^{4k+r}$; sums like $\sum_{k=1}^{n} i^k$, $i^n + i^{n+1} + i^{n+2} + i^{n+3} = 0$; $\left(\frac{1+i}{1-i}\right)^n$. Misconception: $i^{-1} = i$ |
| 2.4 | The Conjugate | $\bar z$ mirrors $z$; it respects sums, products and quotients | Properties $\overline{z_1 \pm z_2}$, $\overline{z_1z_2}$, $\overline{z_1/z_2}$, $\bar{\bar z} = z$, $z + \bar z = 2\,\mathrm{Re}\,z$, $z - \bar z = 2i\,\mathrm{Im}\,z$; $z$ real iff $z = \bar z$, purely imaginary iff $z = -\bar z$. `cq-argand-plane` (mode `point`, conjugate). JEE: if $\frac{z - 1}{z + 1}$ is purely imaginary then $\lvert z\rvert = 1$. Misconception: $\overline{iz} = i\bar z$ |
| 2.5 | The Modulus | $\lvert z\rvert^2 = z\bar z$; modulus is multiplicative | $\lvert z_1z_2\rvert = \lvert z_1\rvert\lvert z_2\rvert$, $\lvert z_1/z_2\rvert$, $\lvert z^n\rvert$; $\lvert z_1 + z_2\rvert^2 = \lvert z_1\rvert^2 + \lvert z_2\rvert^2 + 2\,\mathrm{Re}(z_1\bar z_2)$; parallelogram law; $\lvert z_1 + z_2\rvert = \lvert z_1 - z_2\rvert \iff \frac{z_1}{z_2}$ purely imaginary. Misconception: $\lvert z_1 + z_2\rvert = \lvert z_1\rvert + \lvert z_2\rvert$ |
| 2.6 | Square Roots of a Complex Number | Solve $(x + iy)^2 = a + ib$: two real equations plus the modulus equation | Derivation of $\sqrt{a + ib} = \pm\left(\sqrt{\frac{\lvert z\rvert + a}{2}} + i\,\mathrm{sgn}(b)\sqrt{\frac{\lvert z\rvert - a}{2}}\right)$. $\sqrt{5 + 12i}$, $\sqrt{-8 - 6i}$, $\sqrt{i}$. Misconception: choosing signs independently |
| 2.7 | Quadratics with Complex Roots | Real coefficients force conjugate pairs; with complex coefficients use the formula with a complex square root | Solving $x^2 - 4x + 13 = 0$; forming a real quadratic from one complex root; $z^2 - (3 + i)z + (2 + 2i) = 0$; equations in $z$ and $\bar z$ like $z^2 + \lvert z\rvert = 0$, $\bar z = iz^2$ via $z = x + iy$. `cq-quadratic-explorer` with $D < 0$. Misconception: "complex roots always come in conjugate pairs" (only for real coefficients) |
| 2.8 | Chapter 2 Mastery | Reconstruct the conjugate and modulus rules from $z\bar z = \lvert z\rvert^2$ | Mixed JEE problems on algebra, powers of $i$, conjugate/modulus properties, square roots, equations in $z, \bar z$ |

## Chapter 3: The Argand Plane and Polar Form

**Purpose:** make $z$ a point and an arrow; read modulus and argument geometrically; convert between Cartesian, polar and Euler forms; see multiplication as scale-and-rotate; prove and use the triangle inequality.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 3.1 | Complex Numbers as Points | $x + iy \leftrightarrow (x, y)$; addition is vector addition; $\lvert z_1 - z_2\rvert$ is distance | `cq-argand-plane` (mode `sum`, with difference). Plotting, reflections ($\bar z$, $-z$, $-\bar z$). Distance and midpoint. Misconception: "$\lvert z_1 - z_2\rvert$ is the distance of $z_1 - z_2$ from... nothing" |
| 3.2 | Argument and Principal Argument | $\arg z$ is the angle from the positive real axis; principal value in $(-\pi, \pi]$ | Quadrant-by-quadrant rule from $\alpha = \tan^{-1}\lvert y/x\rvert$; axes cases; $\arg 0$ undefined; general argument $\theta + 2k\pi$. `cq-argand-plane` (mode `point`). Misconception: $\arg z = \tan^{-1}(y/x)$ in every quadrant |
| 3.3 | Polar Form | $z = r(\cos\theta + i\sin\theta)$ | Converting both ways; $\lvert z\rvert$ and $\arg z$ of $1 + i$, $-\sqrt3 + i$, $-1 - i$, $1 - \cos\alpha + i\sin\alpha$ type JEE forms (half-angle). Misconception: "$-2(\cos\theta + i\sin\theta)$ has modulus $-2$" |
| 3.4 | Euler Form | $e^{i\theta} = \cos\theta + i\sin\theta$ | Motivation: $\frac{d}{d\theta}$ of $\cos\theta + i\sin\theta$ is $i$ times itself; the series argument sketched. $e^{i\pi} + 1 = 0$. $\cos\theta = \frac{e^{i\theta} + e^{-i\theta}}{2}$, $\sin\theta = \frac{e^{i\theta} - e^{-i\theta}}{2i}$. Unit circle of $e^{i\theta}$ with `cq-argand-plane`. Misconception: $\lvert e^{i\theta}\rvert$ depends on $\theta$ |
| 3.5 | Multiplication Is Scale and Rotate | $r_1e^{i\theta_1}\cdot r_2e^{i\theta_2} = r_1r_2e^{i(\theta_1+\theta_2)}$ | `cq-argand-plane` (mode `product`, quotient). $\arg(z_1z_2) = \arg z_1 + \arg z_2$ (mod $2\pi$), $\arg(z_1/z_2)$, $\arg\bar z = -\arg z$; multiplication by $i$ is a quarter turn; rotating a point about the origin. Misconception: principal args always add exactly (counter-example with two second-quadrant numbers) |
| 3.6 | The Triangle Inequality | $\lvert z_1 + z_2\rvert \le \lvert z_1\rvert + \lvert z_2\rvert$ and $\lvert z_1 - z_2\rvert \ge \lvert\lvert z_1\rvert - \lvert z_2\rvert\rvert$ | Proof via $\mathrm{Re}(z_1\bar z_2) \le \lvert z_1\bar z_2\rvert$; equality iff same direction (args equal). `cq-argand-plane` (mode `sum`). Bounds like $\lvert z - 3 + 4i\rvert$ given $\lvert z\rvert \le 2$; $\lvert z_1 + z_2\rvert = \lvert z_1\rvert + \lvert z_2\rvert \Rightarrow \arg z_1 = \arg z_2$. Misconception: equality also when opposite |
| 3.7 | Chapter 3 Mastery | Reconstruct the polar product rule from the angle-addition formulas | Mixed JEE problems: principal args, polar/Euler conversions, products and quotients, triangle inequality bounds |

## Chapter 4: De Moivre's Theorem and Roots of Unity

**Purpose:** powers and roots of complex numbers, the cube roots of unity $\omega$ and their famous factorisations, and the $n$-th roots of unity as a regular polygon.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 4.1 | De Moivre's Theorem | $(\cos\theta + i\sin\theta)^n = \cos n\theta + i\sin n\theta$ | Proof by induction and via Euler; negative $n$. `cq-argand-plane` (mode `powers`). $(1 + i)^{10}$, $(\sqrt3 + i)^6$, $\left(\frac{1 + i\sqrt3}{1 - i\sqrt3}\right)^{n}$ real/integer conditions; multiple-angle formulas $\cos 3\theta$, $\sin 3\theta$. Misconception: De Moivre for $(\cos\theta - i\sin\theta)$ or $(\sin\theta + i\cos\theta)$ without rewriting |
| 4.2 | The n-th Roots of a Complex Number | $z^n = w$ has exactly $n$ roots $\lvert w\rvert^{1/n}e^{i(\phi + 2k\pi)/n}$ | `cq-argand-plane` (mode `roots`). Fourth roots of $-16$, cube roots of $8i$, solving $z^5 = 1 + i$. Roots lie on a circle and form a regular polygon. Misconception: "$z^3 = 8$ has only $z = 2$" |
| 4.3 | Cube Roots of Unity | $1, \omega, \omega^2$ with $\omega = \frac{-1 + i\sqrt3}{2}$, $1 + \omega + \omega^2 = 0$, $\omega^3 = 1$ | Derivation from $x^3 - 1 = (x - 1)(x^2 + x + 1)$; $\bar\omega = \omega^2$, $\omega^{3k+r}$; equilateral triangle on the unit circle. `cq-argand-plane` (mode `roots`, $n = 3$). Misconception: $1 + \omega + \omega^2 = 3$ |
| 4.4 | Factorisations and Simplifications with ω | $a^3 + b^3 + c^3 - 3abc = (a+b+c)(a+b\omega+c\omega^2)(a+b\omega^2+c\omega)$ | $x^2 + x + 1 = (x - \omega)(x - \omega^2)$, $a^3 + b^3 = (a+b)(a+b\omega)(a+b\omega^2)$, $a^2 + b^2 + c^2 - ab - bc - ca = (a + b\omega + c\omega^2)(a + b\omega^2 + c\omega)$; $(1 - \omega + \omega^2)^n$, $(1 + \omega)^n$, determinants and divisibility ($x^2 + x + 1 \mid x^{3m} + x^{3n+1} + x^{3p+2}$). Misconception: $\omega^2 = -\omega$ |
| 4.5 | The n-th Roots of Unity | $1, \alpha, \dots, \alpha^{n-1}$ with $\alpha = e^{2\pi i/n}$ | Sum $0$, product $(-1)^{n-1}$, sum of $p$-th powers ($0$ or $n$), $\prod_{k=1}^{n-1}(1 - \alpha^k) = n$, $\prod\lvert 1 - \alpha^k\rvert$ as chord lengths; regular polygon; $1 + z + \dots + z^{n-1} = 0$. `cq-argand-plane` (mode `roots`). Misconception: the product of the roots is always $1$ |
| 4.6 | Chapter 4 Mastery | Reconstruct the roots-of-unity facts from the polygon picture | Mixed JEE problems: De Moivre conditions, $n$-th roots, $\omega$ simplifications, roots-of-unity sums and products |

## Chapter 5: Geometry with Complex Numbers

**Purpose:** use $\lvert z - a\rvert$ as distance and $\arg$ as angle to describe lines, circles and conics; rotate with $e^{i\theta}$; solve JEE max/min and locus problems.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 5.1 | Distance, Section Formula and Lines | Section formula $\frac{mz_2 + nz_1}{m + n}$; collinear iff $\frac{z_3 - z_1}{z_2 - z_1}$ is real | Distance, midpoint, centroid, incentre; the line through two points (determinant form and $\bar a z + a\bar z + b = 0$); slope $-\frac{a}{\bar a}$; perpendicular and parallel lines. `cq-argand-plane` (mode `rotation`, collinearity readout). Misconception: collinearity from equal moduli |
| 5.2 | Circles and Discs | $\lvert z - a\rvert = r$; general circle $z\bar z + \bar\alpha z + \alpha\bar z + k = 0$ | Centre $-\alpha$, radius $\sqrt{\lvert\alpha\rvert^2 - k}$; regions $\lvert z - a\rvert < r$; circle on a diameter ($\frac{z - a}{z - b}$ purely imaginary). `cq-locus-explorer` (locus `circle`, shade). Misconception: reading $\lvert z + 2 - i\rvert$ as centre $2 - i$ |
| 5.3 | Loci from Distances | Bisector, ellipse, hyperbola branch, Apollonius circle | $\lvert z - a\rvert = \lvert z - b\rvert$, $\lvert z - a\rvert + \lvert z - b\rvert = k$ (and the degenerate $k = \lvert a - b\rvert$), $\lvert z - a\rvert - \lvert z - b\rvert = k$, $\lvert z - a\rvert = k\lvert z - b\rvert$. `cq-locus-explorer` (each locus). Misconception: "$\lvert z - 1\rvert + \lvert z + 1\rvert = 2$ is an ellipse" |
| 5.4 | Loci from Arguments | $\arg(z - a) = \theta$ is a ray; $\arg\frac{z - a}{z - b} = \theta$ is an arc | Rays, arcs, semicircles ($\theta = \pm\frac\pi2$), $\frac{z - a}{z - b}$ real (line minus segment) or purely imaginary (circle on diameter). `cq-locus-explorer` (locus `arc`). Misconception: forgetting the arc is only one side of the chord |
| 5.5 | The Rotation Theorem | $\frac{z_3 - z_1}{z_2 - z_1} = \frac{\lvert z_3 - z_1\rvert}{\lvert z_2 - z_1\rvert}e^{i\theta}$ | `cq-argand-plane` (mode `rotation`). Constructing squares and equilateral triangles; equilateral condition $z_1^2 + z_2^2 + z_3^2 = z_1z_2 + z_2z_3 + z_3z_1$; right angles; concyclic points; rotating a point about another point. Misconception: rotating about the origin when the centre is $z_1$ |
| 5.6 | Maximum and Minimum of the Modulus | Distance from a point to a circle; the triangle inequality as a bound | $\max/\min\lvert z\rvert$ on $\lvert z - a\rvert = r$; $\lvert z - \frac4z\rvert = 2 \Rightarrow \max\lvert z\rvert = \sqrt5 + 1$; $\lvert z_1 - z_2\rvert$ for $z_1, z_2$ on two circles; $\lvert z\rvert$ on an ellipse locus. `cq-locus-explorer` (probe). Misconception: taking the maximum where the triangle inequality is not attainable |
| 5.7 | Chapter 5 Mastery | Reconstruct any locus from "distance" and "angle" | Mixed JEE Main/Advanced problems combining loci, rotation, max/min and the whole course |
