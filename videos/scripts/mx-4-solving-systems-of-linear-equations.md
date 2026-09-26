# Solving Systems of Linear Equations — Explainer Script

- **Course:** Matrices
- **Chapter:** Chapter 4 · Solving Systems of Linear Equations (id: `mx-4-solving-systems-of-linear-equations`)
- **Target runtime:** about 5 to 5.5 minutes (roughly 950 spoken words at Samantha's default ~175 wpm)
- **Scene class:** `MatricesCh4Video` in `videos/scenes/mx-4-solving-systems-of-linear-equations.py`

**Learning goal.** The learner reads a linear system in two ways: rows as lines (or planes) that must meet, and columns as directions combined to reach the target B. They know a linear system has one, none or infinitely many solutions (never exactly two) and that counting equations cannot decide which. They see AX = B as "which input does A send to B?", solve it with X = A inverse B (left-multiplied, never B A inverse), and read Cramer's rule x = D_x / D as a ratio of parallelogram areas (column replaced, not row). When D = 0 they know the answer is none or infinitely many, use the (adj A)B test and its limitation (three parallel planes), and know that a homogeneous system has non-trivial solutions exactly when |A| = 0. They row-reduce [A | B] to echelon form, back-substitute, and read a zero row correctly (0 = c is a contradiction; 0 = 0 frees a variable). Finally they handle the JEE parameter question (lambda, mu) and pick the right method.

**Global style (all scenes):** light background (`BG #FDF8F4`), ink text. Colour roles: equation / column 1 = strawberry RED (`PRIMARY`), equation / column 2 = BLUE (`#2B6CB0`), target B and highlights = GOLD (`#D19A00`), area = AMBER (`ACCENT`), unique = GREEN, no solution = RED, infinitely many = PURPLE, squashed / muted = MUTED grey. Grids are `NumberPlane`s with light grid lines and MUTED axes. Each scene has a small MUTED header top-left naming its lesson ("4.1 · Two Pictures of a System"). Math uses `MathTex`; spoken formulas are spelled out in words. Clear the frame with `FadeOut` between scenes.

**TTS note:** symbols are always spoken as words: "A inverse B", "D x over D", "adj A times B", "lambda", "mu". Matrix entries are read row by row. "A" as a matrix name is spoken as "the matrix A" where it could be mistaken for the article.

---

## Scene 0 — Title card

**Narration:** Matrices, chapter four. Solving systems of linear equations.

**Visuals:** `title_card("Matrices", "Chapter 4 · Solving Systems of Linear Equations", ...)`.

---

## Scene 1 — Hook: the row picture (Lesson 4.1)

**Narration:**

- **Beat a:** Here are two equations: x plus y equals four, and x minus y equals zero. Each one is a straight line. A solution is a point on both lines at once, so solving means finding where they meet. Here, that is the point two, two.
- **Beat b:** But two lines do not have to cross. Tilt one until the slopes match, and they run parallel. They never meet: no solution. Slide it on top of the other, and every point works: infinitely many solutions.
- **Beat c:** One, none, or infinitely many. Never exactly two. And counting equations and unknowns cannot tell you which. This chapter can.

**Visuals:**

- **Beat a:** Left: `NumberPlane` x in [-1, 6], y in [-2, 5]. RED line x + y = 4, BLUE line x − y = 0 (clipped to the window). GREEN dot at (2, 2) labelled `(2,2)`. Right panel: the two equations in their colours, status badge "one solution" in GREEN.
- **Beat b:** The blue line's coefficients are driven by `ValueTracker`s from (1, −1, 0) to (1, 1, 1): it swings round to become parallel (x + y = 1); badge "parallel: no solution" in RED. Then c slides from 1 to 4: it lands on the red line; badge "same line: infinitely many" in PURPLE. The equation on the right updates.
- **Beat c:** Three small badges "1", "0", "∞" in GREEN, RED, PURPLE; a crossed-out "2".

---

## Scene 2 — The column picture (Lesson 4.1)

**Narration:**

- **Beat a:** Now read the same system by columns. x times the column one, one, plus y times the column one, negative one, has to equal four, zero.
- **Beat b:** So the question changes: how much of each column do you need to reach the target? Two of the first, then two of the second. Same answer, but a new question: which input does the matrix A send to B?
- **Beat c:** If the two columns were parallel, every combination would stay on one line through the origin. A target off that line can never be reached. A target on it is reached in infinitely many ways.

**Visuals:**

- **Beat a:** Plane x in [-1, 5], y in [-3, 4]. RED arrow (1, 1), BLUE arrow (1, −1), GOLD dot B = (4, 0). Right: `x\begin{pmatrix}1\\1\end{pmatrix} + y\begin{pmatrix}1\\-1\end{pmatrix} = \begin{pmatrix}4\\0\end{pmatrix}`.
- **Beat b:** Tip-to-tail: RED arrow 2·(1, 1) from origin to (2, 2), then BLUE arrow 2·(1, −1) from (2, 2) to (4, 0). Right: `2\begin{pmatrix}1\\1\end{pmatrix} + 2\begin{pmatrix}1\\-1\end{pmatrix} = \begin{pmatrix}4\\0\end{pmatrix}` and "Which input X does A send to B?".
- **Beat c:** New columns (1, 2) RED and (−1, −2) BLUE; dashed line y = 2x labelled "every combination". Point (3, 1) with a RED cross "unreachable", point (1.5, 3) with a GREEN tick "many ways".

---

## Scene 3 — Matrix form and the inverse method (Lesson 4.2)

**Narration:**

- **Beat a:** Solving A X equals B means running the machine backwards: given the output B, find the input X. Chapter three built the undo button: A inverse.
- **Beat b:** Multiply both sides on the left by A inverse. A inverse times A is the identity, so X equals A inverse B. Order matters. It is A inverse times B, never B times A inverse; that product is not even defined.
- **Beat c:** Try two x plus y equals three, and x plus y equals two. The determinant is one, so the inverse exists: one, negative one, negative one, two. Multiply it by three, two, and X is one, one. Check: two plus one is three, and one plus one is two.

**Visuals:**

- **Beat a:** A machine diagram: `X` → box "A" → `B`; a curved PURPLE arrow back from B to X labelled `A^{-1}`.
- **Beat b:** `A^{-1}(AX) = A^{-1}B`, `(A^{-1}A)X = A^{-1}B`, `X = A^{-1}B` framed in GREEN. `X = BA^{-1}` crossed out in RED with "(3×1)(3×3): not defined".
- **Beat c:** Example: equations, `A`, `B`, `|A| = 1`, `A^{-1}`, and the product giving `(1, 1)`.

---

## Scene 4 — Cramer's rule as a ratio of areas (Lesson 4.3)

**Narration:**

- **Beat a:** Sometimes you want just one unknown. Cramer's rule gives it as a ratio of two determinants: x equals D x over D, where D x is D with the x column replaced by the constants.
- **Beat b:** Why a column? Take the columns two, one and one, two. Their parallelogram has area D, which is three. The target B, five, four, is two of the first column plus one of the second.
- **Beat c:** Now build the parallelogram on B and the second column. Slide B back along the second column. That is a shear, so the area does not change. What is left is two copies of the original parallelogram. So D x is two times D, which is six, and x is six over three, which is two.
- **Beat d:** The same trick gives y: three over three, which is one. Replace the column, never the row. And Cramer needs D to be non-zero.

**Visuals:**

- **Beat a:** Right: `x = \dfrac{D_x}{D}`, `D = \begin{vmatrix}a_1&b_1\\a_2&b_2\end{vmatrix}`, `D_x = \begin{vmatrix}c_1&b_1\\c_2&b_2\end{vmatrix}` with the replaced column in GOLD.
- **Beat b:** Plane; RED column (2, 1), BLUE column (1, 2), AMBER parallelogram "D = 3". GOLD B = (5, 4); dashed path 2·a1 then a2.
- **Beat c:** PURPLE parallelogram on B and a2. `ValueTracker` slides B from (5, 4) to (4, 2); the parallelogram shears into two amber-sized copies (dividing line drawn). Right: `D_x = \det(B, a_2) = 6 = 2D`, `x = 6/3 = 2`.
- **Beat d:** `y = D_y/D = 3/3 = 1`; warning "replace the column, not the row"; "needs D ≠ 0".

---

## Scene 5 — When D equals zero (Lesson 4.4)

**Narration:**

- **Beat a:** Both methods divide by D. When D is zero they fall silent, because the matrix squashes the plane flat. That leaves two possibilities.
- **Beat b:** x plus two y equals three, with two x plus four y equals one: parallel lines, no solution. Change that one to a six, and the lines coincide: infinitely many. D is zero both times. So D equals zero does not mean no solution.

**Visuals:**

- **Beat a:** Plane; RED x + 2y = 3, BLUE 2x + 4y = 1. Right: `D = \begin{vmatrix}1&2\\2&4\end{vmatrix} = 0`.
- **Beat b:** Badge "no solution" (RED). The blue constant slides from 1 to 6 (line moves onto the red one); badge "infinitely many" (PURPLE). Right: "D = 0 in both cases".

---

## Scene 6 — The adjoint test and homogeneous systems (Lesson 4.4)

**Narration:**

- **Beat a:** The test: if adj A times B is not zero, there is no solution. If it is zero, you still have to check. Three parallel planes, x plus y plus z equals one, two and three, pass every determinant test, and still have no solution.
- **Beat b:** A homogeneous system, A X equals zero, always has the trivial solution, X equals zero. It has other solutions exactly when the determinant is zero, because then a whole line of inputs is squashed onto the origin.

**Visuals:**

- **Beat a:** Two lines: `(\operatorname{adj}A)B \ne O \Rightarrow` "no solution"; `(\operatorname{adj}A)B = O \Rightarrow` "check!". Warning card with `x+y+z=1,2,3`: `D = D_1 = D_2 = D_3 = 0`, yet no solution.
- **Beat b:** Left: plane with PURPLE dots along the direction (2, −1). `ApplyMatrix([[1,2],[2,4]])` collapses the plane onto the line y = 2x and every dot onto the origin. Right: `AX = O`, "X = O always works", `|A| = 0 \iff` non-trivial solutions.

---

## Scene 7 — Row reduction (Lesson 4.5)

**Narration:**

- **Beat a:** Row reduction settles every case. Write the augmented matrix: coefficients, a bar, then the constants. Three moves never change the solutions: swap two rows, scale a row, or add a multiple of one row to another.
- **Beat b:** Clear the first column below the pivot. Swap the last two rows. Then clear the second column. Now the matrix is a staircase: echelon form.
- **Beat c:** Back-substitute from the bottom: z is three, then y is two, then x is one.
- **Beat d:** Now read a zero row carefully. Zero, zero, zero, bar two, says zero equals two: no solution. Zero, zero, zero, bar zero, says zero equals zero. One equation was redundant, a variable is free, and there are infinitely many solutions.

**Visuals:**

- **Beat a:** `[A | B]` for x + y + z = 6, 2x − y + z = 3, x + 2y − z = 2 (Manim `Matrix` with a vertical bar before the last column). Right: the three moves `R_i \leftrightarrow R_j`, `R_i \to kR_i`, `R_i \to R_i + kR_j`.
- **Beat b:** Transform through `R_2 \to R_2 - 2R_1, R_3 \to R_3 - R_1`, then `R_2 \leftrightarrow R_3`, then `R_3 \to R_3 + 3R_2`, operation label shown under the matrix. Final pivots boxed in GOLD, staircase drawn.
- **Beat c:** Right: `-7z = -21 \Rightarrow z = 3`, `y - 2z = -4 \Rightarrow y = 2`, `x + y + z = 6 \Rightarrow x = 1`.
- **Beat d:** Two rows side by side: `[0\ 0\ 0 \mid 2]` → `0 = 2`, "no solution" (RED); `[0\ 0\ 0 \mid 0]` → `0 = 0`, "free variable: infinitely many" (PURPLE).

---

## Scene 8 — Parameters and choosing a method (Lesson 4.6)

**Narration:**

- **Beat a:** An exam favourite. x plus y plus z equals six, x plus two y plus three z equals ten, and x plus two y plus lambda z equals mu. First find D. It works out to lambda minus three.
- **Beat b:** If lambda is not three, D is not zero: a unique solution, whatever mu is. If lambda is three, the last two equations have the same left side. Then mu not equal to ten is a contradiction: no solution. And mu equal to ten just repeats: infinitely many.
- **Beat c:** Choosing a method: the inverse when you need every unknown and D is not zero. Cramer when you need just one. And row reduction when D is zero, or whenever you are in doubt.

**Visuals:**

- **Beat a:** The system; `D = \begin{vmatrix}1&1&1\\1&2&3\\1&2&\lambda\end{vmatrix} = \lambda - 3`.
- **Beat b:** Three case rows: `\lambda \ne 3` → unique (GREEN); `\lambda = 3,\ \mu \ne 10` → none (RED); `\lambda = 3,\ \mu = 10` → infinitely many (PURPLE).
- **Beat c:** A three-row "which method?" card: need all unknowns, D ≠ 0 → inverse; need one unknown → Cramer; D = 0 or unsure → row reduction.

---

## Scene 9 — Recap (Lesson 4.7)

**Narration:** Five lines to keep. Rows are lines or planes that must meet; columns are directions you combine to reach B. If D is not zero, the solution is unique: X equals A inverse B, or Cramer's ratio of determinants. If D is zero, there are none or infinitely many, so check. A homogeneous system has non-trivial solutions exactly when D is zero. And row reduction reads every case off the staircase. Next chapter: rank and eigenvalues, the shape of a transformation.

**Visuals:** Five numbered lines, each with a small formula: `AX = B`, `X = A^{-1}B,\ x_i = D_i/D`, `D = 0`, `AX = O`, `[0\cdots0 \mid c]`. Final line "Next: Chapter 5 · Rank and Eigenvalues".
