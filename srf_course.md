# Course: Sets, Relations and Functions, The Grammar of Mathematics

**Slug:** `sets-relations-functions` (a course alongside `calculus`, `trigonometry`, `vector-algebra`, `permutations-combinations-binomial`; same block schema, same seed-script pattern.) Course title in the catalog: **"Sets, Relations and Functions: The Grammar of Mathematics"**.

**Purpose:** Every other JEE chapter is written in the language of sets, relations and functions: "the domain is $(-\infty, 2]$", "$f$ is one-one and onto", "the number of equivalence relations", "the principal value of $\cos^{-1}$". This course teaches that language precisely enough to answer JEE Main and Advanced questions on it directly: set algebra and inclusion–exclusion counting, the properties of relations, domains and ranges of awkward expressions, one-one/onto functions and counting them, composition and inverses, even/odd/periodic functions, graph transformations with modulus and greatest integer, and the full theory of inverse trigonometric functions.

**Builds on, does not repeat:** calculus Chapter 0 (`chapter-0-content.ts`) introduces functions informally (input → output machines, notation, natural domain, reading graphs, transformations, families, piecewise). Trigonometry lesson 2.6 introduces $\sin^{-1}$, $\cos^{-1}$, $\tan^{-1}$ with their restricted domains. Here we go back to the foundations (a function **is** a special set of ordered pairs) and push every topic to JEE depth: domain problems with nested logs and inverse trig, range by the discriminant method, counting surjections, functional equations, all six principal branches, $\tan^{-1}x + \tan^{-1}y$ with its cases, and $\sin^{-1}(\sin x)$ sawtooth graphs.

**End state:** Given any question in this unit, the student can reconstruct the answer from

```text
set      = a well-defined collection; ⊆, P(A), operations = "which Venn regions?"
relation = a subset of A × B; properties are statements about which pairs are present
function = a relation where every input has exactly one output
inverse  = swap every pair; it is a function exactly when the original is a bijection
inverse trig = invert one carefully chosen monotonic branch
```

**Three threads run through every chapter**
1. **Picture first:** Venn regions for sets, arrow diagrams and pair grids for relations and functions, graphs (with open and closed dots) for real functions, mirror images in $y = x$ for inverses.
2. **Derive, don't memorise:** $2^n$ subsets from in/out choices, $2^{mn}$ relations from pair choices, inclusion–exclusion from region counting, surjection counts from inclusion–exclusion, $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ from complementary angles, the $\tan^{-1}$ addition cases from the range of $\tan^{-1}$.
3. **JEE pay-off:** each lesson ends with JEE Main / Advanced style questions (single correct, multiple correct, integer/numerical), written in our own words, and each chapter ends with a mastery lesson that hides the formula sheet.

Question ids follow `srf{chapter}-{lesson}-q{n}` (e.g. `srf3-2-q5`); worked examples `srf{chapter}-{lesson}-we{n}`.

---

## Chapter map

| Ch | Slug | Title | Core idea |
| -- | ---- | ----- | --------- |
| 0 | `sets` | Sets and Their Language | A set is a well-defined collection; subsets, power sets, intervals |
| 1 | `set-operations-and-counting` | Set Operations and Counting | Operations are choices of Venn regions; counting by inclusion–exclusion |
| 2 | `relations` | Relations | A relation is a set of ordered pairs; reflexive, symmetric, transitive, equivalence |
| 3 | `functions` | Functions | Exactly one output per input; domain, range, one-one, onto, counting functions |
| 4 | `composition-inverse-and-special-properties` | Composition, Inverses and Special Properties | Chaining, undoing, symmetry, periodicity and graph transformations |
| 5 | `inverse-trigonometric-functions` | Inverse Trigonometric Functions | Invert one monotonic branch; identities with their exact ranges of validity |

---

## Chapter 0: Sets and Their Language

**Purpose:** fix the vocabulary precisely: membership vs inclusion, the empty set, cardinality, subsets and the power set, and intervals as the subsets of $\mathbb{R}$ every later chapter uses.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 0.1 | `what-a-set-is` | What a Set Is | A well-defined collection; $\in$ and $\notin$; roster and set-builder form | Hook: "the set of good movies" is not a set, "the set of prime numbers below 20" is. Standard sets $\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$ (and $\mathbb{Z}^+$, $\mathbb{Q}'$). Roster form (order and repetition do not matter) ↔ set-builder form, converting both ways (e.g. $\{x : x^2 - 5x + 6 = 0\}$, $\{1, \frac12, \frac13, \dots\}$). Worked examples: listing $\{x \in \mathbb{Z} : \lvert x - 1\rvert < 3\}$, describing $\{2, 5, 10, 17, 26\}$ in set-builder form. Misconception killed: "$\{1, 1, 2\}$ has three elements" |
| 0.2 | `kinds-of-sets` | Kinds of Sets | Empty, singleton, finite, infinite; cardinality; equal vs equivalent sets | $\varnothing$ vs $\{0\}$ vs $\{\varnothing\}$. $n(A)$. Deciding finite or infinite. Equal sets (same elements) vs equivalent sets (same cardinality). Worked examples: $\{x \in \mathbb{R} : x^2 + 1 = 0\} = \varnothing$, $\{x \in \mathbb{N} : 2x - 3 < 4\}$ cardinality, whether $\{x : x^2 = 4\}$ equals $\{-2, 2\}$. Misconceptions killed: "$\{\varnothing\}$ is empty", "equivalent means equal" |
| 0.3 | `subsets` | Subsets and Proper Subsets | $A \subseteq B$ means every element of $A$ is in $B$; $\varnothing \subseteq A$ and $A \subseteq A$ always | $\subseteq$ vs $\subset$ (proper); $A = B \iff A \subseteq B$ and $B \subseteq A$; $\mathbb{N} \subset \mathbb{Z} \subset \mathbb{Q} \subset \mathbb{R}$. Why $\varnothing$ is a subset of everything (vacuous truth). The $\in$ vs $\subseteq$ trap with $A = \{1, \{1\}, \{1, 2\}\}$. Counting: $2^n$ subsets, $2^n - 1$ proper subsets, by "each element in or out". Misconception killed: "$\{1\} \in \{1, 2\}$" |
| 0.4 | `the-power-set` | The Power Set | $P(A)$ is the set of all subsets; $n(P(A)) = 2^{n(A)}$ | Listing $P(\{a, b, c\})$ as a binary in/out table. $P(\varnothing) = \{\varnothing\}$, $P(P(\varnothing))$. Counting subsets with conditions: containing a given element ($2^{n-1}$), of size $k$ ($\binom{n}{k}$), containing $a$ but not $b$; $P(A) \cap P(B) = P(A \cap B)$ but $P(A) \cup P(B) \subseteq P(A \cup B)$. JEE-style: if $n(P(A)) = 64$, find $n(A)$; $n(P(P(\varnothing)))$. Misconception killed: "$P(\varnothing) = \varnothing$" |
| 0.5 | `universal-set-and-intervals` | Universal Set and Intervals | The universal set fixes the context; intervals are the subsets of $\mathbb{R}$ we use most | Universal set examples. Open, closed, half-open intervals, rays, $\mathbb{R} = (-\infty, \infty)$; interval ↔ set-builder ↔ number line; length of an interval. Intersections and unions of intervals on a number line (preview of domains). Interactive: `srf-venn-diagram` (2 sets) showing $A$ and $B$ inside $U$. Misconceptions killed: "$[2, 5)$ contains 5", "$\infty$ can be included" |
| 0.6 | `chapter-0-mastery` | Chapter 0 Mastery | Reconstruct the vocabulary | Mixed mastery: roster ↔ set-builder, $\in$ vs $\subseteq$, $\varnothing$ traps, counting subsets and proper subsets, power-set cardinalities, interval notation, JEE-style multiple-correct "which statements are true" |

## Chapter 1: Set Operations and Counting

**Purpose:** operations as choices of Venn regions, the laws of set algebra (proved by element-chasing and by regions), and counting with inclusion–exclusion up to three sets, including survey problems and max/min bounds.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 1.1 | `union-and-intersection` | Union and Intersection | "or" collects, "and" overlaps | Definitions, disjoint sets, properties (commutative, associative, idempotent, $A \cup \varnothing$, $A \cap U$), $A \subseteq B \iff A \cup B = B \iff A \cap B = A$. Interactive: `srf-venn-diagram` (2 sets) with presets. Misconception killed: "union means elements in exactly one set" |
| 1.2 | `difference-complement-symmetric-difference` | Difference, Complement and Symmetric Difference | $A - B = A \cap B'$; $A \,\Delta\, B = (A - B) \cup (B - A)$ | Complement laws, $(A')' = A$, $U' = \varnothing$; $A - B \ne B - A$; symmetric difference as "exactly one"; $A \,\Delta\, B = (A \cup B) - (A \cap B)$. Interactive: `srf-venn-diagram`. Misconception killed: "$A - B$ removes $B$'s elements, so $n(A - B) = n(A) - n(B)$" |
| 1.3 | `laws-of-set-algebra` | Laws of Set Algebra | Distributive and De Morgan's laws, proved two ways | Proof by element-chasing (double inclusion) and by Venn regions. $A - (B \cup C) = (A - B) \cap (A - C)$, simplifying expressions like $(A \cup B) \cap (A \cup B')$. Interactive: `srf-venn-diagram` (3 sets) with both sides of each law as presets. JEE-style set-identity MCQs. Misconception killed: "a Venn picture of one example proves a law" (it works only because a Venn diagram shows every region) |
| 1.4 | `counting-with-two-sets` | Counting with Two Sets | $n(A \cup B) = n(A) + n(B) - n(A \cap B)$ | Derivation by region counting; $n(A - B) = n(A) - n(A \cap B)$; $n(A \,\Delta\, B)$; neither $= n(U) - n(A \cup B)$; bounds $\max(0, n(A) + n(B) - n(U)) \le n(A \cap B) \le \min(n(A), n(B))$. Interactive: `srf-venn-diagram` with counts and `showInclusionExclusion`. Misconception killed: "add the two counts" |
| 1.5 | `three-sets-inclusion-exclusion` | Three Sets and Inclusion–Exclusion | Add singles, subtract pairs, add back the triple | Derivation by counting how often each region is counted. Exactly one / exactly two / at least two formulas. Region-filling method from the centre outwards. Divisibility counting: numbers up to 1000 divisible by 2, 3 or 5. Interactive: `srf-venn-diagram` (3 sets, counts). Misconception killed: "$n(A \cap B)$ means exactly $A$ and $B$" |
| 1.6 | `survey-problems-and-jee-set-puzzles` | Survey Problems and JEE Set Puzzles | Translate words into regions, then fill | Classic survey problems (newspapers, languages, sports), percentage problems with bounds on the overlap (e.g. 63% and 76% → overlap between 39% and 63%), counting solutions with conditions, JEE-style set-identity and cardinality questions (e.g. $n(A \times B)$ links come in Ch 2). Misconception killed: "every survey number is a region count" |
| 1.7 | `chapter-1-mastery` | Chapter 1 Mastery | Regions, laws, counts | Mixed mastery: simplify expressions, De Morgan, $n(A \cup B \cup C)$, exactly-two counts, survey problem, bounds, multiple-correct identity checks |

## Chapter 2: Relations

**Purpose:** ordered pairs and Cartesian products, relations as subsets, and the four properties with fast checks on finite sets and on JEE's favourite infinite examples, ending with equivalence relations and counting relations.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 2.1 | `ordered-pairs-and-cartesian-products` | Ordered Pairs and Cartesian Products | $(a, b) = (c, d) \iff a = c, b = d$; $n(A \times B) = n(A)\,n(B)$ | $A \times B \ne B \times A$ (unless equal or one empty), $A \times \varnothing = \varnothing$, $A \times A \times A$, lattice-point picture, $A \times (B \cap C) = (A \times B) \cap (A \times C)$, $(A \times B) \cap (B \times A) = (A \cap B) \times (A \cap B)$. Recovering $A$, $B$ from some elements of $A \times B$. Misconception killed: "$(1, 2) = (2, 1)$" |
| 2.2 | `relations-domain-and-range` | Relations, Domain and Range | A relation from $A$ to $B$ is any subset of $A \times B$ | $2^{mn}$ relations; domain, codomain, range; roster/set-builder/arrow-diagram forms; inverse relation $R^{-1}$ and its domain/range. Interactive: `srf-mapping-explorer` (relation mode) with Show $R^{-1}$. Misconception killed: "range = codomain" |
| 2.3 | `reflexive-symmetric-transitive` | Reflexive, Symmetric, Transitive | Properties are statements about which pairs must be present | Definitions with arrow-diagram meaning (loops, two-way arrows, shortcuts), checks on small sets, empty, identity and universal relations, vacuous truth (empty relation is symmetric and transitive). Interactive: `srf-mapping-explorer` relation mode. Misconception killed: "reflexive means some $(a, a)$ is present" |
| 2.4 | `antisymmetric-and-standard-relations` | Antisymmetric Relations and the Standard Examples | Antisymmetric ≠ not symmetric; testing relations on $\mathbb{Z}$, $\mathbb{R}$, lines, triangles | $\le$, divides on $\mathbb{N}$ vs on $\mathbb{Z}$, $a - b$ even, $\lvert a - b\rvert \le 1$, $ab \ge 0$, $1 + ab > 0$, $a \le b^2$, parallel lines (with "a line is parallel to itself"), perpendicular lines, similar and congruent triangles, "is brother of". Misconception killed: "a relation must be either symmetric or antisymmetric" |
| 2.5 | `equivalence-relations-and-classes` | Equivalence Relations and Classes | Reflexive + symmetric + transitive ⇔ a partition into classes | Congruence modulo $n$, classes $[a]$, classes are equal or disjoint, partitions ↔ equivalence relations, smallest equivalence relation containing given pairs. Interactive: `srf-mapping-explorer` with Equivalence closure. Misconception killed: "symmetric + transitive implies reflexive" (fails for elements with no pairs) |
| 2.6 | `counting-relations` | Counting Relations with Given Properties | Choose freely only the pairs the property leaves free | Reflexive $2^{n^2 - n}$, symmetric $2^{n(n+1)/2}$, reflexive and symmetric $2^{n(n-1)/2}$, antisymmetric $2^n 3^{n(n-1)/2}$, equivalence relations on a 3- and 4-element set (5 and 15), minimum pairs to add for a given property. Misconception killed: "there are $2^n$ relations on an $n$-element set" |
| 2.7 | `chapter-2-mastery` | Chapter 2 Mastery | Pairs, properties, classes, counts | Mixed mastery including JEE Main style "which of these relations is an equivalence relation" and counting questions |

## Chapter 3: Functions

**Purpose:** a function as a special relation, then the JEE workhorses: domains of composite expressions, ranges by algebra and graphs, the special real functions, one-one/onto tests and counting functions between finite sets.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 3.1 | `functions-as-relations` | Functions as Special Relations | Every element of the domain has exactly one image | Which relations are functions (arrow diagram, pair set, vertical-line test), domain/codomain/range, image and pre-image, equal functions (same domain and rule: $\frac{x^2}{x}$ vs $x$). Interactive: `srf-mapping-explorer` (function mode). Misconception killed: "two inputs with the same output break the definition" |
| 3.2 | `finding-domains` | Finding Domains | Collect every condition, then intersect | Even roots ($\ge 0$), denominators ($\ne 0$), logs (argument $> 0$, base $> 0$, $\ne 1$), inverse trig ($\sin^{-1}u$: $-1 \le u \le 1$), nested cases like $\sqrt{\log_{1/2}(x - 1)}$, $\frac{1}{\sqrt{[x]^2 - [x] - 6}}$, wavy-curve (sign chart) method. Misconception killed: "simplify first, then read the domain" |
| 3.3 | `finding-ranges` | Finding Ranges | Solve $y = f(x)$ for $x$ and ask which $y$ allow a real $x$ | Range from the graph, from monotonicity, from completing the square, the discriminant method for $\frac{\text{quadratic}}{\text{quadratic}}$, bounded expressions ($a\sin x + b\cos x$, $x + \frac1x$), range of a composition. Misconception killed: "the range of a rational function is all reals except where the denominator vanishes" |
| 3.4 | `gallery-of-real-functions` | A Gallery of Real Functions | Identity, constant, polynomial, rational, modulus, signum, greatest integer, fractional part, exponential, logarithm | Graph, domain and range of each. Properties of $[x]$ and $\{x\}$: $[x + n] = [x] + n$, $[x] + [-x]$, $x - 1 < [x] \le x$, $0 \le \{x\} < 1$. Interactive: `srf-graph-lab` gallery with open and closed dots. Misconception killed: "$[-2.5] = -2$" |
| 3.5 | `one-one-onto-bijective` | One-one, Onto and Bijective | Injective: no two inputs share an output. Surjective: range = codomain | Algebraic test ($f(a) = f(b) \Rightarrow a = b$), horizontal-line test, monotonic ⇒ one-one, how restricting domain or codomain changes the answer, examples on $\mathbb{N}$, $\mathbb{Z}$, $\mathbb{R}$. Interactive: `srf-mapping-explorer` (function mode). Misconception killed: "onto depends only on the formula" (it depends on the codomain) |
| 3.6 | `counting-functions` | Counting Functions | $n^m$ functions, $^nP_m$ one-one, surjections by inclusion–exclusion | Derivations, onto from 4 to 3 elements = 36, distributing distinct objects into non-empty boxes, bijections $n!$, functions with conditions ($f(1) \ne 1$, increasing functions $\binom{n}{m}$, $f(i) \ne i$ derangements small cases). Interactive: `srf-mapping-explorer` with `showCounts`. Misconception killed: "number of onto functions $= n^m - $ (number of non-onto with one missing value)" |
| 3.7 | `chapter-3-mastery` | Chapter 3 Mastery | Domain, range, type, count | Mixed mastery with JEE Main/Advanced style domain, range, injectivity and counting questions |

## Chapter 4: Composition, Inverses and Special Properties

**Purpose:** combine and undo functions, recognise symmetry (even/odd) and periodicity, transform graphs with modulus and greatest integer, and solve basic functional equations.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 4.1 | `composition-of-functions` | Composition of Functions | $(f \circ g)(x) = f(g(x))$, defined when $g(x)$ lies in the domain of $f$ | Domain of a composition, $f \circ g \ne g \circ f$, associativity, composing piecewise functions, $f \circ f$, finding $f$ from $f \circ g$. Interactive: `composition-machine` reused. Misconception killed: "the domain of $f \circ g$ is the domain of $g$" |
| 4.2 | `inverse-functions` | Inverse Functions | Invertible ⇔ bijective; the graph of $f^{-1}$ is the mirror image in $y = x$ | Finding inverses, restricting to make invertible, $(f \circ g)^{-1} = g^{-1} \circ f^{-1}$, $f(f^{-1}(x)) = x$, solutions of $f(x) = f^{-1}(x)$ for increasing $f$ lie on $y = x$. Interactive: `srf-graph-lab` (inverse). Misconception killed: "$f^{-1}(x) = \frac{1}{f(x)}$" |
| 4.3 | `even-and-odd-functions` | Even and Odd Functions | $f(-x) = f(x)$: mirror in the $y$-axis; $f(-x) = -f(x)$: half-turn about $O$ | Symmetric domain requirement, algebra of even/odd (products, sums, compositions), every function = even part + odd part, $\log(x + \sqrt{x^2+1})$ is odd, $f(0) = 0$ for odd $f$ defined at 0. Misconception killed: "every function is either even or odd" |
| 4.4 | `periodic-functions` | Periodic Functions | $f(x + T) = f(x)$; the fundamental period is the least positive $T$ | Periods of $\sin(ax + b)$, $\lvert\sin x\rvert$, $\sin^4 x + \cos^4 x$, $\{x\}$, $\tan$; LCM rule for sums and its exceptions ($\lvert\sin x\rvert + \lvert\cos x\rvert$ has period $\frac{\pi}{2}$); constant function has no fundamental period; $\sin x^2$ not periodic. Misconception killed: "the period of a sum is always the LCM" |
| 4.5 | `graph-transformations-modulus-gif` | Graph Transformations with Modulus and Greatest Integer | $\lvert f(x)\rvert$ reflects the negative part up; $f(\lvert x\rvert)$ copies the right half to the left | $y = \lvert f(x)\rvert$, $y = f(\lvert x\rvert)$, $\lvert y\rvert = f(x)$, $y = [f(x)]$, $y = \{f(x)\}$, counting solutions of equations like $\lvert x^2 - 4\rvert = k$ and $[x] = \{x\}$ graphically. Interactive: `srf-graph-lab` transforms. Misconception killed: "$\lvert f(x)\rvert$ and $f(\lvert x\rvert)$ are the same" |
| 4.6 | `functional-equations` | Functional Equations | Substitute cleverly, then solve | $f(x + y) = f(x) + f(y)$ (on rationals: $f(x) = kx$), $f(xy) = f(x) + f(y)$, $f(x) + 2f(\frac1x) = 3x$ by swapping, $f(x)f(\frac1x) = f(x) + f(\frac1x) \Rightarrow 1 \pm x^n$, sums like $\sum f(k)$ for $f(x + y) = f(x)f(y)$. Misconception killed: "one substitution determines $f$" |
| 4.7 | `chapter-4-mastery` | Chapter 4 Mastery | Compose, invert, symmetry, period, transform | Mixed mastery with JEE-style questions on composition domains, inverses, parity, periods and solution counts |

## Chapter 5: Inverse Trigonometric Functions

**Purpose:** all six principal branches with domains, ranges and graphs, the composition rules and their sawtooth graphs, the identity families with their exact ranges of validity, substitution, and inverse-trig equations at JEE Advanced depth.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 5.1 | `principal-value-branches` | Principal Value Branches | Invert one monotonic branch of each trig function | Table of all six (domain, range), why these branches, $\sec^{-1}$, $\operatorname{cosec}^{-1}$, $\cot^{-1}$ conventions; principal values like $\sin^{-1}(-\frac12)$, $\cos^{-1}(-\frac{\sqrt3}{2})$, $\cot^{-1}(-1)$. Interactive: `srf-graph-lab` (inverse of each branch). Misconception killed: "$\sin^{-1}x = \frac{1}{\sin x}$" |
| 5.2 | `compositions-and-sawtooth-graphs` | Compositions and Sawtooth Graphs | $\sin(\sin^{-1}x) = x$ always; $\sin^{-1}(\sin x) = x$ only on the principal branch | Graphs of $\sin^{-1}(\sin x)$, $\cos^{-1}(\cos x)$, $\tan^{-1}(\tan x)$; evaluating $\sin^{-1}(\sin 2)$, $\cos^{-1}(\cos 5)$, $\tan^{-1}(\tan\frac{7\pi}{6})$; $\sin(\cos^{-1}x) = \sqrt{1 - x^2}$ via triangles. Interactive: `srf-graph-lab` with `asin(sin(x))`. Misconception killed: "$\sin^{-1}(\sin x) = x$" |
| 5.3 | `negatives-and-complementary-pairs` | Negative Arguments and Complementary Pairs | Odd-type vs $\pi - $ type; $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ | $\sin^{-1}(-x) = -\sin^{-1}x$, $\cos^{-1}(-x) = \pi - \cos^{-1}x$, same for $\tan$/$\cot$; $\tan^{-1}x + \cot^{-1}x = \frac{\pi}{2}$, $\sec^{-1}x + \operatorname{cosec}^{-1}x = \frac{\pi}{2}$; reciprocal relations ($\operatorname{cosec}^{-1}x = \sin^{-1}\frac1x$, $\cot^{-1}x = \tan^{-1}\frac1x$ for $x > 0$ and $\pi + \tan^{-1}\frac1x$ for $x < 0$). Misconception killed: "$\cos^{-1}(-x) = -\cos^{-1}x$" |
| 5.4 | `sum-and-difference-formulas` | Sum and Difference Formulas | $\tan^{-1}x + \tan^{-1}y = \tan^{-1}\frac{x + y}{1 - xy}$ only when $xy < 1$ | Derivation from $\tan(A + B)$ and the cases ($xy > 1$ with $x > 0$: add $\pi$), difference formula, $\sin^{-1}x \pm \sin^{-1}y$ (with $x^2 + y^2 \le 1$), telescoping sums $\sum \tan^{-1}\frac{1}{1 + n + n^2}$, $\tan^{-1}1 + \tan^{-1}2 + \tan^{-1}3 = \pi$. Misconception killed: "the formula works for all $x, y$" |
| 5.5 | `multiple-angles-and-substitution` | Multiple Angles and Substitution | $2\tan^{-1}x$ in three forms, each with its own range of $x$ | $2\tan^{-1}x = \sin^{-1}\frac{2x}{1 + x^2}$ ($\lvert x\rvert \le 1$) $= \cos^{-1}\frac{1 - x^2}{1 + x^2}$ ($x \ge 0$) $= \tan^{-1}\frac{2x}{1 - x^2}$ ($\lvert x\rvert < 1$); $2\sin^{-1}x$, $3\sin^{-1}x$; simplifying by substitution ($x = \tan\theta$, $\cos\theta$, $\sin\theta$): $\tan^{-1}\frac{\sqrt{1 + x^2} - 1}{x}$, $\tan^{-1}\sqrt{\frac{1 - x}{1 + x}}$. Interactive: `srf-graph-lab` comparing $2\tan^{-1}x$ and $\sin^{-1}\frac{2x}{1+x^2}$. Misconception killed: "$\sin^{-1}\frac{2x}{1+x^2} = 2\tan^{-1}x$ for all $x$" |
| 5.6 | `inverse-trig-equations-and-jee-problems` | Inverse-Trig Equations and JEE Problems | Convert to one function, solve, then check against the ranges | Equations like $\tan^{-1}2x + \tan^{-1}3x = \frac{\pi}{4}$, $\sin^{-1}x + \sin^{-1}2x = \frac{\pi}{3}$, $\cos^{-1}x - \sin^{-1}x = \cos^{-1}(x\sqrt3)$; domain/range of inverse-trig expressions; extreme values of $(\sin^{-1}x)^2 + (\cos^{-1}x)^2$; $\sin^{-1}x > \cos^{-1}x$ inequalities. Misconception killed: "every algebraic root solves the original equation" |
| 5.7 | `chapter-5-mastery` | Chapter 5 Mastery | Full-chapter diagnostic | Mixed mastery: principal values, sawtooth evaluations, identities with cases, substitution, equations, multiple-correct JEE Advanced style |

---

## Engineering work this course needs

Existing components reused where they genuinely fit:

| Component | Used in | Why it fits |
| --------- | ------- | ----------- |
| `composition-machine` | 4.1 | $x \to g \to f$ pipeline for composition |

New components (schemas in `src/modules/content/schemas/blocks.ts`, renderers in `components/interactives/`, registry cases in `index.tsx`, pure helpers in `lib/srf.ts`):

| Component | Used in | What it does |
| --------- | ------- | ------------ |
| `srf-venn-diagram` | 0.5, 1.1–1.6 | Two- or three-set Venn diagram inside $U$. Click regions to shade or pick preset expressions (mini-language `A|B`, `A&B`, `A-B`, `A^B`, `A'`); shows which presets the shading equals; with region counts, totals the shaded regions and shows the inclusion–exclusion breakdown |
| `srf-mapping-explorer` | 2.2–2.6, 3.1, 3.5, 3.6 | Arrow diagram plus a pair grid. Relation mode: reflexive/symmetric/antisymmetric/transitive checks with counterexamples, equivalence classes, equivalence-closure button, $R^{-1}$. Function mode: function?/one-one/onto checks with witnesses, inverse relation, and counts of all/one-one/onto functions |
| `srf-graph-lab` | 3.4, 4.2, 4.5, 5.1, 5.2, 5.5 | Function plotter with the JEE special functions (`floor`, `frac`, `sgn`, all six inverse-trig principal branches), open/closed dots at jumps, transforms $\lvert f(x)\rvert$, $f(\lvert x\rvert)$, $[f(x)]$, $\{f(x)\}$, $-f(x)$, $f(-x)$, and the inverse as a reflection of a chosen branch in $y = x$, with an $x$ probe |

Seed script: `scripts/seed-sets-relations-functions.ts`. Test: `tests/srf-course-content.test.ts`. Chapter overview videos are deferred.
