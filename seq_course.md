# Course: Sequences and Series, Patterns That Add Up

**Slug:** `sequences-series` (a course alongside `calculus`, `trigonometry`, `permutations-combinations-binomial`, `sets-relations-functions`; same block schema, same seed-script pattern). Course title in the catalog: **"Sequences and Series: Patterns That Add Up"**.

**Purpose:** Sequences and series is one of the most reliably examined units in JEE Main and Advanced: every paper has an AP/GP question, an AM–GM inequality or a special series, and the same ideas reappear inside binomial, calculus (limits of sums, definite integrals as limits) and probability. This course teaches the unit from scratch to JEE depth: sequences as functions on $\mathbb{N}$ and sigma notation; arithmetic, geometric and harmonic progressions with all their properties; the three means and AM ≥ GM ≥ HM as a working tool for maxima and minima; the special series ($\sum k$, $\sum k^2$, $\sum k^3$, arithmetico-geometric, telescoping, method of differences, the $V_n$ method); and mathematical induction.

**Builds on, does not repeat:** basic algebra and the quadratic formula; functions and $\mathbb{N}$ from the sets–relations–functions course; $\binom{n}{r}$ from the PnC/binomial course (used only in 5.2). Limits are used informally (an infinite sum is the number the partial sums settle on); no calculus is assumed.

**End state:** Given any question in this unit, the student can reconstruct the answer from

```text
sequence  = a function on N; series = the running total S_n of its terms; t_n = S_n - S_{n-1}
AP        = add d each time:      t_n = a + (n-1)d,  S_n = n/2 (first + last)   (Gauss pairing)
GP        = multiply by r:        t_n = a r^(n-1),   S_n = a(1 - r^n)/(1 - r),  S_inf = a/(1 - r) for |r| < 1
HP        = reciprocals form an AP (no sum formula: work with the AP)
means     = A >= G >= H for positive numbers, equality iff all equal; G^2 = AH for two numbers
special   = sum k, sum k^2, sum k^3; S - rS for AGP; split t_k = V_k - V_(k-1) and telescope
induction = true for the first case + (true for k => true for k + 1)
```

**Three threads run through every chapter**
1. **Picture first:** stems for terms and a joined dot plot for partial sums (`seq-progression-lab`), Gauss's two staircases for $S_n$, the semicircle for the three means (`seq-means-lab`), dominoes for induction.
2. **Derive, don't memorise:** every sum formula is derived (pairing, $S - rS$, telescoping $(k+1)^3 - k^3$), every property is proved from $t_n$ and $S_n$, and AM ≥ GM is proved from $(\sqrt a - \sqrt b)^2 \ge 0$.
3. **JEE pay-off:** each lesson ends with JEE Main / Advanced style questions (single correct, multiple correct, integer/numerical) in our own words, and each chapter ends with a "reconstruct it" mastery lesson.

Question ids follow `seq{chapter}-{lesson}-q{n}` (e.g. `seq3-2-q5`); worked examples `seq{chapter}-{lesson}-we{n}`.

---

## Chapter map

| Ch | Slug | Title | Core idea |
| -- | ---- | ----- | --------- |
| 0 | `sequences-and-notation` | Sequences and Notation | A sequence is a function on $\mathbb{N}$; a series is its running total, written with $\Sigma$ |
| 1 | `arithmetic-progressions` | Arithmetic Progressions | Constant difference; $S_n$ by Gauss pairing; properties from $t_n$ and $S_n$ |
| 2 | `geometric-progressions` | Geometric Progressions | Constant ratio; $S_n$ by $S - rS$; the infinite GP converges exactly when $\lvert r\rvert < 1$ |
| 3 | `harmonic-progressions-and-means` | Harmonic Progressions and Means | HP via reciprocals; AM ≥ GM ≥ HM and its use for maxima, minima and inequalities |
| 4 | `special-series` | Special Series | $\sum k$, $\sum k^2$, $\sum k^3$, AGP, telescoping, method of differences, $V_n$ method |
| 5 | `mixed-series-and-induction` | Mixed Series and Mathematical Induction | Find $t_n$, then sum; prove patterns by induction |

---

## Chapter 0: Sequences and Notation

**Purpose:** fix the language: sequences as functions on $\mathbb{N}$, general terms, recursive definitions (Fibonacci), series and sigma notation with its algebra, and the difference between finite and infinite sums.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 0.1 | `what-a-sequence-is` | What a Sequence Is | A sequence is a function $a : \mathbb{N} \to \mathbb{R}$; $a_n$ is the general term | Terms, finite vs infinite sequences, listing terms from $a_n$ (e.g. $a_n = \frac{n}{n+1}$, $(-1)^n n^2$), finding a general term from a pattern, the graph of a sequence (isolated dots), increasing/decreasing sequences. Misconception killed: "a few terms determine the sequence" ($1, 2, 4, 8, \dots$ need not continue with 16) |
| 0.2 | `recursive-definitions` | Recursive Definitions | A rule for the next term plus enough starting terms | $a_{n+1} = a_n + d$ (AP), $a_{n+1} = r a_n$ (GP), $a_{n+1} = 2a_n + 1$, Fibonacci $F_{n+2} = F_{n+1} + F_n$, Fibonacci identities ($\sum F_k = F_{n+2} - 1$), converting recursive ↔ explicit for simple cases, two-term recurrences. Misconception killed: "a recurrence needs no starting value" |
| 0.3 | `series-and-sigma-notation` | Series and Sigma Notation | A series adds the terms; $\sum_{k=1}^{n} a_k$ is shorthand | Partial sums $S_n$, expanding and compressing sigma notation, the dummy index, shifting the index, counting terms ($\sum_{k=m}^{n}$ has $n - m + 1$ terms), alternating signs with $(-1)^{k+1}$. Misconception killed: "$\sum_{k=3}^{10}$ has 7 terms" |
| 0.4 | `properties-of-sigma` | Properties of Sigma | $\Sigma$ is linear; $t_n = S_n - S_{n-1}$ | $\sum (a_k + b_k)$, $\sum c\,a_k$, $\sum_{k=1}^n c = nc$, splitting and joining ranges, $t_n = S_n - S_{n-1}$ and $t_1 = S_1$, telescoping preview $\sum (b_{k+1} - b_k) = b_{n+1} - b_1$. Misconception killed: "$\sum a_k b_k = \sum a_k \sum b_k$" and "$\sum (a_k)^2 = (\sum a_k)^2$" |
| 0.5 | `finite-and-infinite-series` | Finite and Infinite Series | An infinite series has a sum only if its partial sums settle | Finite vs infinite series, $\frac12 + \frac14 + \dots$ as a square being filled, partial sums settling vs growing ($\sum 1$, $\sum (-1)^k$, $\sum \frac{1}{k(k+1)}$), the harmonic series grows without bound (grouping argument), terms tending to 0 is necessary but not sufficient. Interactive: `seq-progression-lab` with authored series. Misconception killed: "if the terms go to 0, the sum is finite" |
| 0.6 | `chapter-0-mastery` | Chapter 0 Mastery | Reconstruct the notation | Mixed mastery: general terms, recurrences, sigma algebra, $t_n$ from $S_n$, convergence intuition, multiple-correct "which statements are true" |

## Chapter 1: Arithmetic Progressions

**Purpose:** everything about APs, derived from two facts ($t_n$ is linear in $n$, $S_n$ is quadratic in $n$ with no constant term), up to JEE-style AP problems.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 1.1 | `ap-and-its-nth-term` | An AP and Its n-th Term | Add the same $d$ each time: $t_n = a + (n-1)d$ | Testing for an AP, $t_n$ linear in $n$ (and conversely), $n$-th term from the end $l - (n-1)d$, finding $a$ and $d$ from two terms, number of terms, first negative term, common terms of two APs. Interactive: `seq-progression-lab` (AP). Misconception killed: "$t_n = a + nd$" |
| 1.2 | `sum-of-an-ap` | The Sum of an AP | Pair first with last: $S_n = \frac n2(a + l) = \frac n2[2a + (n-1)d]$ | Gauss pairing and the two-staircase picture, both forms, $S_n = An^2 + Bn$ (no constant), sum of all multiples of 7 between 100 and 300, least $n$ with $S_n > k$, maximum of $S_n$ for a decreasing AP. Interactive: `seq-progression-lab` (AP sums). Misconception killed: "every quadratic $S_n$ comes from an AP" ($S_n$ with a constant term breaks at $t_1$) |
| 1.3 | `properties-of-aps` | Properties of APs | Everything follows from $t_n$ and $S_n$ | Adding / multiplying every term by a constant, $t_n = S_n - S_{n-1}$, terms equidistant from the ends sum to $a + l$, $t_p = q$ and $t_q = p \Rightarrow t_{p+q} = 0$, $S_p = S_q \Rightarrow S_{p+q} = 0$, ratio of sums of two APs → ratio of $n$-th terms (replace $n$ by $2n - 1$), $a, b, c$ in AP $\iff 2b = a + c$. Misconception killed: "the reciprocals (or squares) of an AP form an AP" |
| 1.4 | `choosing-terms-and-arithmetic-means` | Choosing Terms and Arithmetic Means | Symmetric choices kill $d$ from the sum | $a - d, a, a + d$; $a - 3d, a - d, a + d, a + 3d$; five terms; arithmetic mean of two numbers; inserting $n$ AMs between $a$ and $b$ ($d = \frac{b - a}{n + 1}$), sum of the $n$ AMs is $n\frac{a + b}{2}$. Misconception killed: "for four terms use $a - 2d, a - d, a + d, a + 2d$" |
| 1.5 | `jee-ap-problems` | JEE-Style AP Problems | Translate to $a$ and $d$, or use a property | Roots of cubics in AP, $\frac{1}{b + c}, \frac{1}{c + a}, \frac{1}{a + b}$ in AP $\iff a^2, b^2, c^2$ in AP, AP in logs and angles, number of common terms, sums with conditions (numbers not divisible by 2 or 5), $S_{3n} = 3(S_{2n} - S_n)$. Misconception killed: "an AP condition on $a, b, c$ fixes their values" |
| 1.6 | `chapter-1-mastery` | Chapter 1 Mastery | Reconstruct the AP toolkit | Mixed mastery with JEE Main / Advanced style AP questions |

## Chapter 2: Geometric Progressions

**Purpose:** the GP toolkit and the first infinite sums: $t_n$, $S_n$ by $S - rS$, convergence for $\lvert r\rvert < 1$, recurring decimals, symmetric choices, geometric means and mixed AP–GP problems.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 2.1 | `gp-and-its-nth-term` | A GP and Its n-th Term | Multiply by the same $r$: $t_n = ar^{n-1}$ | Testing for a GP, negative and fractional ratios, $n$-th term from the end, finding $a, r$ from two terms, product of terms equidistant from the ends, $a, b, c$ in GP $\iff b^2 = ac$, logs of a GP form an AP, first term exceeding 1000. Misconception killed: "a GP can have a zero term" |
| 2.2 | `sum-of-n-terms-of-a-gp` | The Sum of n Terms of a GP | $S - rS$ cancels everything in between | Derivation, $r = 1$ case, $S_n$ with $r < 1$ written as $\frac{a(1 - r^n)}{1 - r}$, sums like $0.7 + 0.77 + 0.777 + \dots$, $n$ terms of $1 + 11 + 111 + \dots$, least $n$ for a target sum, ratio $S_{2n} / S_n = 1 + r^n$. Misconception killed: "$S_n = \frac{a(r^n - 1)}{r - 1}$ and $\frac{a(1 - r^n)}{1 - r}$ are different formulas" |
| 2.3 | `infinite-gp-and-recurring-decimals` | Infinite GPs and Recurring Decimals | $S_\infty = \frac{a}{1 - r}$ exactly when $\lvert r\rvert < 1$ | $r^n \to 0$ iff $\lvert r\rvert < 1$, the shrinking-square picture, $r = 1$, $r = -1$ and $\lvert r\rvert > 1$, recurring decimals as GPs ($0.\overline{3}$, $0.1\overline{23}$, $0.\overline{9} = 1$), bouncing ball distance, infinite GP with given sum and sum of squares. Interactive: `seq-progression-lab` (GP, $r$ slider). Misconception killed: "$1 - 1 + 1 - \dots = \frac12$" |
| 2.4 | `choosing-terms-and-geometric-means` | Choosing Terms and Geometric Means | $\frac ar, a, ar$ makes the product $a^3$ | Three, four ($\frac{a}{r^3}, \frac ar, ar, ar^3$) and five terms in GP, geometric mean of two numbers, inserting $n$ GMs ($r = (b/a)^{1/(n+1)}$), product of the $n$ GMs $= (\sqrt{ab})^n$. Misconception killed: "the GM of $-4$ and $-9$ is $6$" |
| 2.5 | `mixed-ap-gp-and-applications` | Mixed AP–GP Problems and Applications | Write each condition in its own unknowns, then link | Three numbers in GP becoming AP after a change, AP–GP with common terms, compound interest $P(1 + i)^n$, population growth and depreciation, doubling time, sum of a GP of investments, chessboard grains. Misconception killed: "simple and compound growth differ only slightly" |
| 2.6 | `chapter-2-mastery` | Chapter 2 Mastery | Reconstruct the GP toolkit | Mixed mastery with JEE Main / Advanced style GP and infinite-GP questions |

## Chapter 3: Harmonic Progressions and Means

**Purpose:** HP through reciprocals, the three means and their relations, AM ≥ GM ≥ HM with proof and equality, and the inequality as a tool for maxima, minima and JEE inequalities.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 3.1 | `harmonic-progressions` | Harmonic Progressions | Terms whose reciprocals form an AP | $n$-th term of an HP via the AP of reciprocals, $a, b, c$ in HP $\iff b = \frac{2ac}{a + c} \iff \frac{a - b}{b - c} = \frac ac$, no sum formula, inserting $n$ HMs, average speed as an HM. Interactive: `seq-progression-lab` (HP). Misconception killed: "the $n$-th term of an HP is $\frac{1}{a} + (n-1)d$" |
| 3.2 | `the-three-means` | The Three Means | $A = \frac{a+b}{2}$, $G = \sqrt{ab}$, $H = \frac{2ab}{a+b}$, and $G^2 = AH$ | Means of two and of $n$ numbers, $G^2 = AH$ (so $A, G, H$ are in GP), recovering $a, b$ from two of the means (roots of $x^2 - 2Ax + G^2 = 0$), ratio $a : b$ from $A : G$. Interactive: `seq-means-lab`. Misconception killed: "$G^2 = AH$ holds for three or more numbers" |
| 3.3 | `am-gm-hm-inequality` | The AM–GM–HM Inequality | $(\sqrt a - \sqrt b)^2 \ge 0$, with equality only when $a = b$ | Algebraic proof for two numbers, the semicircle proof, $G \ge H$ from $A \ge G$ applied to reciprocals, statement for $n$ numbers, positivity requirement (counterexample with negatives), quick consequences ($x + \frac1x \ge 2$). Interactive: `seq-means-lab`. Misconception killed: "AM ≥ GM works for any real numbers" |
| 3.4 | `am-gm-for-maxima-and-minima` | AM–GM for Maxima and Minima | Fixed sum → product largest when equal; fixed product → sum smallest when equal | $x + \frac{a}{x}$, splitting terms to make the product constant ($x^2 + \frac{2}{x} = x^2 + \frac1x + \frac1x$), maximise $ab^2c^3$ given $a + b + c$, $4^x + 4^{1-x}$, $\frac{x^2 + 3}{\sqrt{x^2 + 2}}$, checking that equality is attainable. Interactive: `seq-means-lab` (fixed sum / fixed product). Misconception killed: "the AM–GM bound is always the answer" (equality must be attainable) |
| 3.5 | `weighted-means-and-inequalities` | Weighted Means and Inequalities | Repeat a number $w$ times: weighted AM ≥ weighted GM | Weighted AM and GM, $(a + b)(b + c)(c + a) \ge 8abc$, $(a + b + c)(\frac1a + \frac1b + \frac1c) \ge 9$, $\frac{a}{b} + \frac{b}{c} + \frac{c}{a} \ge 3$, power-mean / RMS ≥ AM, $\frac{a^m + b^m}{2} \ge (\frac{a + b}{2})^m$ for $m > 1$, bounds like $n! < (\frac{n+1}{2})^n$. Misconception killed: "adding two AM–GM inequalities with different equality cases gives a sharp bound" |
| 3.6 | `chapter-3-mastery` | Chapter 3 Mastery | Reconstruct the means | Mixed mastery: HP terms, the three means, $G^2 = AH$, AM–GM optimisation, inequality multiple-correct |

## Chapter 4: Special Series

**Purpose:** the standard sums and the techniques that turn an unfamiliar series into a familiar one: power sums, sums of products, arithmetico-geometric progressions, telescoping with partial fractions, the method of differences and the $V_n$ method.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 4.1 | `sums-of-powers` | Sums of Powers of Natural Numbers | Telescope $(k+1)^3 - k^3$ to get $\sum k^2$ | $\sum k = \frac{n(n+1)}{2}$ (pairing), $\sum k^2 = \frac{n(n+1)(2n+1)}{6}$ (telescoping derivation), $\sum k^3 = \left(\frac{n(n+1)}{2}\right)^2$ (square picture), sums of odd numbers and odd squares, sums over a range. Misconception killed: "$\sum k^2 = (\sum k)^2$" |
| 4.2 | `sums-of-products-and-polynomial-terms` | Sums of Products and Polynomial Terms | Expand $t_k$ as a polynomial, then use the power sums | $\sum k(k+1)$, $\sum (2k-1)^2$, $1 \cdot 2 \cdot 3 + 2 \cdot 3 \cdot 4 + \dots$, $\sum k(n - k)$, products of consecutive integers $\sum k(k+1)(k+2) = \frac{n(n+1)(n+2)(n+3)}{4}$ as a shortcut, sum of products of pairs $\sum_{i<j} a_i a_j = \frac{(\sum a)^2 - \sum a^2}{2}$. Misconception killed: "$\sum k(k+1) = \sum k \cdot \sum (k+1)$" |
| 4.3 | `arithmetico-geometric-progressions` | Arithmetico-Geometric Progressions | Multiply by $r$, subtract, and a GP appears | AGP $t_k = [a + (k-1)d]r^{k-1}$, the $S - rS$ trick for finite sums, the infinite AGP $S_\infty = \frac{a}{1 - r} + \frac{dr}{(1 - r)^2}$ for $\lvert r\rvert < 1$, $\sum \frac{k}{2^k} = 2$, $1 + 3x + 5x^2 + \dots$. Interactive: `seq-progression-lab` (AGP). Misconception killed: "after subtracting, all terms cancel as in a GP" |
| 4.4 | `telescoping-sums` | Telescoping Sums | Write $t_k = f(k) - f(k+1)$; the middle collapses | Partial fractions $\frac{1}{k(k+1)}$, $\frac{1}{k(k+2)}$ (two terms survive at each end), $\frac{1}{(2k-1)(2k+1)}$, $\frac{1}{k(k+1)(k+2)}$, $\frac{1}{\sqrt k + \sqrt{k+1}}$, $k \cdot k! = (k+1)! - k!$, $\frac{k}{k^4 + k^2 + 1}$. Interactive: `seq-progression-lab` (authored telescoping series with limits). Misconception killed: "only the first and last terms survive" |
| 4.5 | `method-of-differences` | Method of Differences | If the differences form an AP or GP, $t_n$ is found by summing them | $3, 7, 13, 21, \dots$ (differences in AP → $t_n$ quadratic), $2, 5, 11, 23, \dots$ (differences in GP → $t_n = A r^n + B$), second differences, $S - S$ shifted-subtraction derivation, then sum $t_n$. Misconception killed: "the series is an AP because its differences are" |
| 4.6 | `the-vn-method` | The V_n Method | Find $V_k$ with $t_k = V_k - V_{k-1}$ by raising the product by one factor | $t_k = k(k+1)(k+2)$ with $V_k = \frac{k(k+1)(k+2)(k+3)}{4}$, $t_k = \frac{1}{k(k+1)(k+2)}$ with $V_k = -\frac{1}{2(k+1)(k+2)}$, general rule for $r$ consecutive factors of an AP, $\sum \frac{1}{(3k-2)(3k+1)(3k+4)}$, infinite sums. Misconception killed: "the $V_n$ method only works for consecutive integers" |
| 4.7 | `chapter-4-mastery` | Chapter 4 Mastery | Reconstruct the special-series toolkit | Mixed mastery: power sums, AGP, telescoping, differences, $V_n$, JEE Advanced style multiple-correct |

## Chapter 5: Mixed Series and Mathematical Induction

**Purpose:** the end-game: find the $n$-th term of an unfamiliar series and sum it, series with binomial and reciprocal terms, and mathematical induction for sums, divisibility and inequalities, closing with PYQ-style mixed problems.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 5.1 | `series-with-a-given-nth-term` | Series with a Given n-th Term | First find $t_k$, then $\sum t_k$ | Series like $1 + (1 + 2) + (1 + 2 + 3) + \dots$, $1^2 + (1^2 + 2^2) + \dots$, $\frac{1^3}{1} + \frac{1^3 + 2^3}{1 + 3} + \dots$, $t_n$ from $S_n$, sums of $\sum_{k} (\text{polynomial in } k)$, the $n$-th group of a bracketed sequence. Misconception killed: "the $n$-th term of $1 + (1+2) + \dots$ is $n$" |
| 5.2 | `binomial-and-reciprocal-series` | Series with Binomial and Reciprocal Terms | Rewrite each term so a known sum appears | $\sum \binom nk = 2^n$, $\sum k\binom nk = n2^{n-1}$, $\sum \frac{1}{k+1}\binom nk = \frac{2^{n+1} - 1}{n+1}$, alternating sums, $\sum \frac{1}{\sqrt k + \sqrt{k+1}}$, $\sum \frac{1}{1 + 2 + \dots + k}$, $\sum \frac{1}{k^2 + 3k + 2}$. Misconception killed: "$\sum \frac{1}{a_k} = \frac{1}{\sum a_k}$" |
| 5.3 | `principle-of-mathematical-induction` | The Principle of Mathematical Induction | Base case + inductive step, like dominoes | Statement $P(n)$, the two steps, proving $\sum k^2$ and $\sum (2k-1) = n^2$, why both steps are needed (a "proof" with no base case; a base case with a broken step), starting at $n_0$, strong induction preview. Misconception killed: "checking $n = 1, 2, 3$ proves it for all $n$" |
| 5.4 | `induction-divisibility-and-inequalities` | Induction for Divisibility and Inequalities | Rewrite the $(k+1)$ case to expose the $k$ case | $7^n - 1$ divisible by 6, $n^3 - n$ by 6, $11^{n+2} + 12^{2n+1}$ by 133, $3^{2n+2} - 8n - 9$ by 64, $2^n > n$, $n! > 2^n$ for $n \ge 4$, Bernoulli $(1 + x)^n \ge 1 + nx$, $\sum \frac{1}{k^2} \le 2 - \frac1n$. Misconception killed: "the inductive step may assume what it is proving for $k + 1$" |
| 5.5 | `jee-mixed-series-problems` | JEE Mixed Series Problems | Spot the type, then apply the matching tool | Mixed PYQ-style problems: AP/GP/HP hybrids, AGP with a twist, telescoping with inverse tangents $\sum \tan^{-1}\frac{1}{1 + k + k^2}$, $\sum \frac{k}{k^4 + k^2 + 1}$, series in binomial and AM–GM combinations, $t_n$ from $S_n$ in Advanced format. Misconception killed: "every series has a closed form" |
| 5.6 | `chapter-5-mastery` | Chapter 5 Mastery | Course-wide reconstruction | PYQ-style mastery across the whole course, multiple-correct and integer type |

---

## Engineering work this course needs

Existing components are not a good fit for discrete sequences (they plot continuous $y = f(x)$), so two new components carry the course.

New components (schemas in `src/modules/content/schemas/blocks.ts`, renderers in `components/interactives/`, registry cases in `index.tsx`, pure helpers in `lib/seq.ts`):

| Component | Used in | What it does |
| --------- | ------- | ------------ |
| `seq-progression-lab` | 0.5, 1.1, 1.2, 2.3, 3.1, 4.3, 4.4 | Pick AP / GP / HP / AGP (or an authored general term in $k$) and drag $a$, $d$, $r$, $n$: terms as stems, partial sums as joined dots, $S_\infty$ as a dashed line for a convergent GP / AGP (or an authored limit). Readouts: first terms, $t_n$, $S_n$ checked against the closed form, and why a sum to infinity does or does not exist |
| `seq-means-lab` | 3.2, 3.3, 3.4 | $a$ and $b$ end to end on the diameter of a semicircle: the radius is the AM, the half-chord at the join the GM, the cut-off piece of the radius the HM. Readouts: $A \ge G \ge H$, $G^2 = AH$. `fixed: "sum"` / `"product"` locks $a + b$ or $ab$ to show the AM–GM optimisation |

## Seeding

`scripts/seed-sequences-series.ts` seeds the course (title "Sequences and Series: Patterns That Add Up"). Content tests: `tests/seq-course-content.test.ts`.
