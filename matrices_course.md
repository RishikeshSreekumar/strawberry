# Course — Matrices: Grids That Move Space

**Slug:** `matrices` (a course alongside `calculus` and `trigonometry`; same block schema, same seed-script pattern.)

**Purpose:** Teach matrices as two things at once: a **grid of numbers** you can add, multiply and invert by rule, and a **transformation of the plane** (and of space) that stretches, turns, shears and squashes. Every rule in the CBSE Class 12 / JEE syllabus — the row-by-column product, $AB \ne BA$, the determinant, the adjoint, Cramer's rule, consistency, rank — should come out of the picture, not be memorized as a list.

**End state:** Given any square matrix, the student can read off what it does to the plane and reconstruct every rule from one chain:

```text
columns = where the basis vectors land → matrix × vector = combination of columns
→ product = composition → determinant = area scale factor → inverse = undo
→ Ax = b = "which input lands on b?" → rank / eigenvalues = the shape of the transformation
```

They should be able to say *why* $AB \ne BA$, *why* $\det(AB) = \det A \det B$, *why* $\det A = 0$ means no inverse, and *why* a system with $D = 0$ can have zero or infinitely many solutions — and still compute all of it fluently under exam time.

**Two threads run through every chapter**
1. **Intuition + visualization** — every new object first appears as a moving grid: drag the columns of a matrix, watch the unit square become a parallelogram, compose two transformations, collapse the plane onto a line. Only then the formula.
2. **Computation drill** — each chapter also trains the exam-speed mechanics (products, cofactor expansion, adjoint, row reduction, parameter questions) with worked examples in steps and mixed practice, so understanding and fluency arrive together.

---

## Chapter map

| Ch | Title | Core idea |
| -- | ----- | --------- |
| 0 | Matrices: Grids That Move the Plane | A matrix is a table of numbers — and its columns tell you where the axes go |
| 1 | Matrix Multiplication Is Composition | The product means "do B, then A"; every algebra rule (and non-rule) follows |
| 2 | Determinants: How Much Space Changes | det = signed area (volume) scale factor; every property is a geometric fact |
| 3 | The Inverse: Undoing a Transformation | Undo exists iff nothing was squashed; adjoint and row reduction build it |
| 4 | Solving Systems of Linear Equations | $AX = B$ asks "which input lands on $B$?" — unique, none, or infinitely many |
| 5 | Rank and Eigenvalues: The Shape of a Transformation | How many dimensions survive, and which directions don't turn |

---

## Chapter 0 — Matrices: Grids That Move the Plane

**Purpose:** establish the vocabulary (order, entries, types, equality, addition, scalar multiples) and — from lesson 0.4 — the single idea the whole course runs on: *the columns of a matrix are where the basis vectors land.*

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 0.1 | What a Matrix Is | A rectangular array with an order $m \times n$ (rows × columns) and entries $a_{ij}$ | Hook: a shop's sales table across days and items becomes a matrix. Order, $a_{ij}$ indexing (row first), row/column/square/zero/rectangular. Table blocks. Misconception killed (concept quiz): "order is columns × rows" / "$a_{23}$ is column 2, row 3" |
| 0.2 | Building Matrices from Rules | $a_{ij} = f(i, j)$ generates a whole matrix; orders of a given size are factor pairs | CBSE staples: construct $2\times3$ with $a_{ij} = \frac{(i+2j)^2}{2}$; $a_{ij} = \lvert i - j\rvert$; count possible orders of a matrix with 12 or 13 entries; count $2\times2$ matrices with entries in $\{0,1\}$ ($2^4$). Misconception killed: "a prime number of entries means no matrix exists" (it's $1\times p$ or $p\times1$) |
| 0.3 | Equality, Addition and Scalar Multiples | Entry-by-entry operations; only same-order matrices can be equal or added | Equality as simultaneous equations (solve for $x, y, z$ from matrix equality). $A + B$, $kA$, $A - B$, zero matrix and additive inverse, commutative/associative laws inherited from numbers. Solve $2X + Y = \ldots$, $X - Y = \ldots$. Misconception killed: "you can add a $2\times3$ and a $3\times2$ by lining them up" |
| 0.4 | A Matrix Is a Machine | $A\mathbf{v}$ = combination of the columns of $A$ weighted by $\mathbf{v}$'s entries | New interactive `matrix-transform-grid` (identity → A morph slider): drag column tips, watch the grid follow. Derive $\begin{pmatrix}a&b\\c&d\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix} = x\begin{pmatrix}a\\c\end{pmatrix} + y\begin{pmatrix}b\\d\end{pmatrix}$ from linearity. Misconception killed: "matrix times vector multiplies entry by entry" |
| 0.5 | A Gallery of Transformations | Scaling, rotation, reflection, shear and projection are each one $2\times2$ matrix | `matrix-transform-grid` presets for each; derive the rotation matrix from where $\hat{\imath}, \hat{\jmath}$ land (ties to trig unit circle). "Write the matrix from the picture" and "describe the picture from the matrix" drills. Misconception killed: "translation (shift by 2) is a matrix transformation" — the origin must stay put, grid lines stay parallel and evenly spaced |
| 0.6 | Chapter 0 Mastery | Can the student move between table, rule, and picture? | Mixed mastery quizzes: orders, $a_{ij}$ from a rule, equality-solve, addition legality, columns-to-picture, identify transformation from matrix |

## Chapter 1 — Matrix Multiplication Is Composition

**Purpose:** derive the row-by-column rule from "apply B, then A", and let every algebraic surprise ($AB \ne BA$, $AB = O$ without $A$ or $B$ zero, no cancellation) come out of the picture. Close with the special-matrix zoo and transpose.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 1.1 | One Transformation After Another | $AB$ is the single matrix that does $B$ first, then $A$ | `matrix-transform-grid` compose mode (B, then A, then the product in one move). Compute the product column by column: column $j$ of $AB$ is $A$ times column $j$ of $B$. Misconception killed: "$AB$ means do A first" (reading order vs application order) |
| 1.2 | The Row-by-Column Rule | $(AB)_{ij}$ = row $i$ of $A$ · column $j$ of $B$; defined only when inner orders match | Derive the entry formula from 1.1. Conformability $m\times n \cdot n\times p \to m\times p$ as "the dominoes must match". Worked $2\times3 \cdot 3\times2$, $3\times3$ products in steps; a cost × quantity business example. Misconception killed: "multiply matrices entry by entry" and "$AB$ defined ⇒ $BA$ defined" |
| 1.3 | Order Matters | $AB \ne BA$ in general; $AB = O$ can happen with $A, B \ne O$; cancellation fails | Grid: rotate-then-shear vs shear-then-rotate end in different places. Build a zero product from a projection pair. Consequences: $(A+B)^2 = A^2 + AB + BA + B^2$, $(A+B)(A-B) \ne A^2 - B^2$. Misconception killed: "$AB = AC \Rightarrow B = C$" and "$(A+B)^2 = A^2 + 2AB + B^2$" |
| 1.4 | The Algebra That Does Work | Associativity (composition), distributivity, identity $I$, powers $A^n$, matrix polynomials | Why $(AB)C = A(BC)$ is obvious as composition. $A^n$ by pattern (rotation powers; $\begin{pmatrix}1&1\\0&1\end{pmatrix}^n$) and induction. CBSE staple: show $A^2 - 5A + 7I = O$, then use it to find $A^3$. Misconception killed: "$A^2$ squares each entry" |
| 1.5 | Special Square Matrices | Diagonal, scalar, identity, triangular; idempotent, nilpotent, involutory, orthogonal — each is a geometric behaviour | Table of types with the transformation each represents (diagonal = axis stretch, involutory = reflection, idempotent = projection, nilpotent = shear-to-zero, orthogonal = rotation/reflection). Grid presets. Misconception killed: "a diagonal matrix must have non-zero diagonal" / "scalar matrix = any diagonal matrix" |
| 1.6 | Transpose, Symmetric and Skew-Symmetric | Transpose swaps rows and columns; $(AB)^T = B^T A^T$; every square matrix = symmetric + skew | Derive $(AB)^T = B^T A^T$ from the entry formula (socks-and-shoes). Symmetric $A^T = A$, skew $A^T = -A$ ⇒ zero diagonal. Decompose $A = \frac{1}{2}(A + A^T) + \frac{1}{2}(A - A^T)$ with a worked $3\times3$. Misconception killed: "$(AB)^T = A^T B^T$" |
| 1.7 | Chapter 1 Mastery | Product fluency plus "why the rules are what they are" | Mixed mastery: conformability, entry of a product, non-commutativity, polynomial identities, special types, transpose rules, sym + skew decomposition |

## Chapter 2 — Determinants: How Much Space Changes

**Purpose:** define the determinant as the signed factor by which a transformation scales area (volume in 3D), derive $ad - bc$ from the parallelogram, then derive every property — and the expansion rules — from that meaning.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 2.1 | The Area Scale Factor | The unit square becomes a parallelogram of area $\lvert ad - bc\rvert$; the sign records a flip | `matrix-transform-grid` with the area readout. Derive $ad - bc$ by boxing the parallelogram and subtracting triangles/rectangles. Negative det = orientation reversed (reflection). Misconception killed: "a determinant is a matrix" / "det is always positive because area is positive" |
| 2.2 | Zero Determinant: Squashing the Plane | $\det A = 0$ ⇔ columns are parallel ⇔ the plane collapses onto a line (or point) | Grid: drag one column onto the other's line, watch area → 0. Link to later: nothing can undo a collapse. Misconception killed: "$\det A = 0$ means $A$ is the zero matrix" |
| 2.3 | 3×3 Determinants: Minors, Cofactors, Expansion | Volume of the parallelepiped; computed by expanding along any row or column | Minors $M_{ij}$, cofactors $C_{ij} = (-1)^{i+j}M_{ij}$, checkerboard of signs, expansion along row 1 then along the row/column with most zeros. Worked examples in steps; Sarrus as a 3×3-only check. Misconception killed: "cofactor = minor" (forgetting the sign) and "Sarrus works for 4×4" |
| 2.4 | Properties from the Picture | Row/column operations change det in predictable ways; $\det(AB) = \det A \cdot \det B$ | Swap two rows → sign flips; scale a row by $k$ → det × $k$; add a multiple of one row to another → unchanged (a shear doesn't change area); equal/proportional rows → 0; $\det A^T = \det A$. $\det(AB)$ = composition of scale factors. `matrix-row-reducer` tracks det through each operation. Misconception killed: "$\det(kA) = k\det A$" (it is $k^n \det A$) and "$\det(A+B) = \det A + \det B$" |
| 2.5 | Evaluating Determinants Smartly | Use properties to create zeros and factor before expanding | JEE/CBSE patterns: $\begin{vmatrix}1&a&a^2\\1&b&b^2\\1&c&c^2\end{vmatrix} = (a-b)(b-c)(c-a)$ via row subtraction and factoring; symmetric sums $a+b+c$ pulled out; proving an identity without full expansion; solving $\det = 0$ for $x$. Misconception killed: "you must always expand fully" / "factoring out $k$ from a row divides the det by $k$" |
| 2.6 | Area of a Triangle and Collinearity | Triangle area = $\frac{1}{2}\lvert\det\rvert$ of the coordinate matrix; zero area ⇔ collinear | Derive from 2.1 (triangle = half a parallelogram, translated). Collinearity test; equation of a line through two points as a determinant; find $k$ given the area (both signs!). Misconception killed: "area = $\frac{1}{2}\det$ gives one value of $k$" (the modulus gives two) |
| 2.7 | Chapter 2 Mastery | Compute, simplify, interpret | Mixed mastery: $2\times2$ / $3\times3$ evaluation, effect of operations, $\det(kA)$, $\det(AB)$, factorized determinants, area/collinearity, geometric meaning of sign and zero |

## Chapter 3 — The Inverse: Undoing a Transformation

**Purpose:** the inverse as "undo". It exists exactly when nothing was squashed ($\det \ne 0$). Build it for $2\times2$ by hand, for $3\times3$ with the adjoint, and by row reduction.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 3.1 | Undoing a Transformation | $A^{-1}$ is the matrix with $AA^{-1} = A^{-1}A = I$; it exists iff $\det A \ne 0$ | Grid: apply a rotation-then-shear, then its inverse, and the grid returns home; try with a collapsing matrix — impossible (many inputs share one output). Uniqueness of the inverse; singular vs non-singular. Misconception killed: "$A^{-1}$ = reciprocal of each entry" |
| 3.2 | The 2×2 Inverse, Derived | $\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1} = \frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$ | Derive by solving $AX = I$ entry-wise; see why $ad - bc$ appears in the denominator. Check by multiplying. Inverse of rotation = rotation by $-\theta$; inverse of reflection = itself. Misconception killed: "swap the diagonal and negate everything" (swap the main diagonal, negate the off-diagonal) |
| 3.3 | Cofactors and the Adjoint | $\operatorname{adj}A$ = transpose of the cofactor matrix, and $A\,(\operatorname{adj}A) = (\det A)\,I$ | Why off-diagonal entries vanish: expansion with "alien" cofactors = det of a matrix with two equal rows = 0. Worked $3\times3$ adjoint in steps. Properties: $\lvert\operatorname{adj}A\rvert = \lvert A\rvert^{n-1}$, $\operatorname{adj}(AB) = \operatorname{adj}B\,\operatorname{adj}A$. Misconception killed: "adjoint = cofactor matrix" (forgetting the transpose) |
| 3.4 | Inverse via the Adjoint, and Its Rules | $A^{-1} = \frac{1}{\lvert A\rvert}\operatorname{adj}A$; $(AB)^{-1} = B^{-1}A^{-1}$, $(A^T)^{-1} = (A^{-1})^T$, $\lvert A^{-1}\rvert = 1/\lvert A\rvert$ | Full $3\times3$ inverse with verification. Socks-and-shoes again from composition. Using a matrix polynomial ($A^2 - 4A + I = O$) to get $A^{-1}$ without the adjoint. Misconception killed: "$(AB)^{-1} = A^{-1}B^{-1}$" |
| 3.5 | Inverse by Row Operations | Row-reduce $[A \mid I]$ to $[I \mid A^{-1}]$ — each row operation is itself a matrix | `matrix-row-reducer` in augmented mode. Elementary matrices; why the same operations applied to $I$ record $A^{-1}$. What happens when a zero row appears (singular). Misconception killed: "you may mix row and column operations in one Gauss–Jordan inversion" |
| 3.6 | Chapter 3 Mastery | When does it exist, how do you build it, how do the rules combine? | Mixed mastery: invertibility from det, 2×2 inverse, adjoint entries, $\lvert\operatorname{adj}A\rvert$, inverse of a product, polynomial method, row-reduction steps |

## Chapter 4 — Solving Systems of Linear Equations

**Purpose:** read $AX = B$ as "which input does $A$ send to $B$?" and classify the answer (one, none, infinitely many) by geometry, by determinants, and by row reduction. Cover the full CBSE toolkit and JEE parameter questions.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 4.1 | Two Pictures of a System | Row picture: lines (planes) meeting. Column picture: combine the columns to reach $B$ | New interactive `linear-system-lines`: coefficient sliders for two lines, intersection marked, status badge (unique / none / infinite). Column picture on `matrix-transform-grid`. Misconception killed: "every system of two equations in two unknowns has exactly one solution" |
| 4.2 | Matrix Form and the Inverse Method | Write the system as $AX = B$; if $\lvert A\rvert \ne 0$, $X = A^{-1}B$ | Setting up $A$, $X$, $B$ from equations (watch missing terms = 0 coefficient). Worked $3\times3$ CBSE problem in steps; word problem (prices of three items, award money). Misconception killed: "$X = BA^{-1}$" (order matters) |
| 4.3 | Cramer's Rule | $x_i = D_i / D$ where $D_i$ replaces column $i$ with $B$ | Derive for $2\times2$ from elimination and read it geometrically (area ratio: the parallelogram of $B$ and one column vs the original). $3\times3$ worked example. When it is the right tool (small systems, one unknown needed). Misconception killed: "$D_i$ replaces row $i$" |
| 4.4 | Consistency: When D = 0 | $D \ne 0$ ⇒ unique. $D = 0$: if $(\operatorname{adj}A)B \ne O$ ⇒ none; if $= O$ ⇒ infinitely many or none — check | `linear-system-lines` with parallel and coincident presets. Homogeneous systems $AX = O$: always consistent; non-trivial solutions iff $\lvert A\rvert = 0$. Misconception killed: "$D = 0$ means no solution" and "$D = D_1 = D_2 = D_3 = 0$ guarantees infinitely many solutions" (counterexample with three parallel planes) |
| 4.5 | Row Reduction: Gaussian Elimination | Reduce $[A \mid B]$ to echelon form, then back-substitute; free variables become parameters | `matrix-row-reducer` augmented mode. Reading a row $[0\;0\;0 \mid 5]$ (inconsistent) vs $[0\;0\;0 \mid 0]$ (free variable). Writing infinitely many solutions in parametric form. Misconception killed: "a zero row means no solution" |
| 4.6 | Parameters and Applications | Choose $k$ so the system has a unique / no / infinitely many solutions | JEE-style: find $\lambda, \mu$ for each case; mixture, investment and network word problems set up and solved by the best method. Decision flowchart as a table: inverse vs Cramer vs row reduction |
| 4.7 | Chapter 4 Mastery | Classify and solve any linear system | Mixed mastery: set-up from words, inverse method, Cramer value, consistency with $D = 0$, homogeneous non-trivial condition, echelon reading, parameter cases |

## Chapter 5 — Rank and Eigenvalues: The Shape of a Transformation

**Purpose:** the finale. Rank measures how many dimensions survive a transformation and unifies Chapter 4's consistency tests; eigenvectors are the directions a transformation doesn't turn, and eigenvalues are how much it stretches them. Ends with Cayley–Hamilton and a full-course diagnostic.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 5.1 | Rank: How Many Dimensions Survive | Rank = number of independent rows (= columns) = non-zero rows in echelon form = dimension of the output | Grid: rank 2 (plane to plane), rank 1 (collapse onto a line), rank 0. Rank via echelon form with `matrix-row-reducer`; via largest non-zero minor. Misconception killed: "rank = number of non-zero rows of the original matrix" / "row rank and column rank can differ" |
| 5.2 | Rank and Solutions | Consistent iff $\operatorname{rank}A = \operatorname{rank}[A \mid B]$; free parameters $= n - \operatorname{rank}A$ | Rouché–Capelli as the clean version of 4.4's case analysis; revisit the three-parallel-planes counterexample and see rank settle it. Table: rank pattern → solution type. Misconception killed: "equal ranks ⇒ unique solution" |
| 5.3 | Directions That Don't Turn | An eigenvector $\mathbf{v}$ satisfies $A\mathbf{v} = \lambda\mathbf{v}$: it stays on its own line, scaled by $\lambda$ | `matrix-transform-grid` with a probe vector and eigen-line overlay: sweep the probe until input and output line up. Shear has one eigen-direction, rotation (not by 0/π) has none (real), reflection has two with $\lambda = \pm1$. Misconception killed: "the zero vector is an eigenvector" / "every matrix has real eigenvectors" |
| 5.4 | Finding Eigenvalues | $A\mathbf{v} = \lambda\mathbf{v}$ with $\mathbf{v} \ne 0$ ⇔ $A - \lambda I$ squashes ⇔ $\det(A - \lambda I) = 0$ | Derived straight from 2.2 + 4.4 (homogeneous non-trivial). Characteristic polynomial plotted with `graph-explorer` / roots marked with `equation-solution-viewer` at level 0. Eigenvectors from the null space. Trace = sum, det = product of eigenvalues; triangular matrices read off the diagonal. Misconception killed: "eigenvalues are the diagonal entries of any matrix" |
| 5.5 | Cayley–Hamilton and Powers | Every square matrix satisfies its own characteristic equation | Verify on a $2\times2$ ($A^2 - (\operatorname{tr}A)A + (\det A)I = O$), then use it to compute $A^{-1}$ and $A^n$ (reduce high powers). Diagonal matrices: powers are trivial along eigen-directions — preview of diagonalization. Misconception killed: "substitute $\lambda = A$ into $\det(A - \lambda I)$ gives $\det(O) = 0$, so the theorem is trivial" |
| 5.6 | Chapter 5 Mastery | Full-course diagnostic | Mixed mastery across all chapters, weighted to rank, consistency via rank, eigenvalues/eigenvectors, trace/det checks, Cayley–Hamilton applications, and one "read the matrix from the picture" item |

---

## Engineering work this course needs

Existing interactives are calculus/trig-specific; `graph-explorer` and `equation-solution-viewer` are reused in 5.4 to plot the characteristic polynomial and mark its roots, and the Vector Algebra course's `vec-space-3d` (triple-product mode) is reused in 2.3 to show the $3\times3$ determinant as the volume of the image of the unit cube. Three new components (each needs a schema in `src/modules/content/schemas/blocks.ts`, a registry case in `components/interactives/index.tsx`, and a renderer):

| Component | Used in | What it does |
| --------- | ------- | ------------ |
| `matrix-transform-grid` | 0.4, 0.5, 1.1, 1.3–1.7, 2.1, 2.2, 2.4, 2.6, 3.1, 3.2, 3.4, 4.1–4.3, 5.1, 5.3, 5.5, 5.6 | 2D plane with a grid, basis vectors $\hat{\imath}, \hat{\jmath}$, unit square and optional probe vector; a $2\times2$ matrix (editable entries or draggable column tips) morphs the grid from identity with a $t$ slider. Readouts: matrix, det (signed area), image of the probe. Modes: single, compose ($B$ then $A$), inverse (apply then undo). Optional eigen-line overlay and presets |
| `matrix-row-reducer` | 2.4, 2.5, 3.5, 4.5, 4.6, 5.1, 5.2 | A small matrix (optionally augmented) on which the learner applies elementary row operations (swap, scale, add multiple) from buttons; shows the operation in notation ($R_2 \to R_2 - 3R_1$), a running determinant factor, history/undo, and detects echelon / reduced form, rank and consistency |
| `linear-system-lines` | 4.1, 4.3, 4.4 | Two lines $a_1x + b_1y = c_1$, $a_2x + b_2y = c_2$ with coefficient sliders; plots both, marks the intersection, shows $D, D_x, D_y$ live and a status badge (unique / no solution / infinitely many) |

Also needed: `scripts/seed-matrices.ts` (mirrors the trigonometry seed script), a `matrices` course row, and `matrices-chapter-N-content.ts` files (mastery slugs `matrices-chapter-N-mastery`).

**Chapter overview videos** (first block of each chapter's first lesson): `public/videos/mx-N-<slug>.mp4` with a `.jpg` poster, rendered from `videos/scenes/mx-N-*.py` (narration in `videos/scripts/mx-N-*.md`), N = 0–5.
