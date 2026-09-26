# Matrix Multiplication Is Composition — Explainer Script

- **Course:** Matrices
- **Chapter:** Chapter 1 · Matrix Multiplication Is Composition (id: `mx-1-matrix-multiplication-is-composition`)
- **Target runtime:** about 6 minutes (roughly 900 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mx-1-matrix-multiplication-is-composition.py`, class `MxCh1Video`

**Learning goal.** The learner reads $AB$ as one transformation: do $B$ first, then $A$. They find the product without a new rule by following $\hat\imath$ and $\hat\jmath$ through both machines, so column $j$ of $AB$ is $A$ times column $j$ of $B$. They read one entry at a time as row $i$ dotted with column $j$, and they check conformability with the domino picture. They see on the grid that $AB \ne BA$, that $AB = O$ can happen when neither factor is zero, and that cancelling fails. They learn which laws still hold (associativity, distributivity, powers, matrix polynomials, with $A^2 - 5A + 7I = O$ used to find $A^3$). They connect the special matrices to what each one does when applied twice, and they learn the transpose, the reversal rule $(AB)^T = B^TA^T$ and the split into symmetric plus skew-symmetric parts.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: $\hat\imath$ = PRIMARY (red), $\hat\jmath$ = SECONDARY (teal), the unit square = ACCENT (amber). The matrix that acts first ($B$, or $R$) is labelled in teal and the one that acts second ($A$, or $S$) in purple. Highlights are gold, correct answers get a green check and wrong ones a red cross. Grids come from the `Grid` helper: a faint fixed reference grid, a moving grid, the unit square and two basis arrows. `apply(M)` runs `ApplyMatrix` about the grid centre and moves the arrows to the new columns. Math uses `MathTex`, and matrices use Manim `Matrix` with round brackets. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Samantha reads "A" as the article and "AB" as a word, so capital letters that name matrices are wrapped as `[[char LTRL]]A[[char NORM]]`. In the code this is `sp("A")` or `sp("A B")`. Symbols are always spoken as words: "i hat", "A squared", "A transpose", "seven I", "minus one, zero".

---

## Title card

**Narration:** Chapter one. Matrix multiplication is composition.

**Visuals:** `title_card("Matrices", "Chapter 1 · Matrix Multiplication Is Composition")`.

---

## Scene 1 — Hook: two machines in a row (Lesson 1.1)

**Narration:**

- **Beat a:** In chapter zero, a two by two matrix became a machine that moves the whole plane. Its columns tell you where i hat and j hat land. So what happens if you run two machines, one after the other?
- **Beat b:** Take R, a quarter turn, and S, a shear. First, rotate the plane.
- **Beat c:** Then shear the result.
- **Beat d:** Grid lines are still straight, parallel and evenly spaced, and the origin has not moved. So the combined effect is itself a linear transformation, and a single matrix must do the whole job in one move.
- **Beat e:** That single matrix is the product, written S R. Watch it land the grid in exactly the same place, in one step.
- **Beat f:** In general, A B is the matrix for do B first, then A. The matrix nearest the vector acts first, just like f of g of x applies g first. Reading order is not acting order.

**Visuals:**

- **Beat a:** On the left, a 5×5 grid centred at (−3.4, −0.4) with the amber unit square, a red $\hat\imath$ and a teal $\hat\jmath$. Header "Rotate, then shear".
- **Beat b:** On the right, $R = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$ "quarter turn" (teal) and $S = \begin{pmatrix}1&1\\0&1\end{pmatrix}$ "horizontal shear" (purple). $R$ is indicated and the grid rotates.
- **Beat c:** $S$ is indicated and the rotated grid shears.
- **Beat d:** Three notes fade in: "Lines stay straight and parallel.", "The origin stays put.", then in bold red "So ONE matrix does both moves."
- **Beat e:** The grid resets. $SR = \begin{pmatrix}1&-1\\1&0\end{pmatrix}$ appears, and one `ApplyMatrix` puts the grid where the two moves put it.
- **Beat f:** Clear. A boxed $(AB)\mathbf v = A(B\mathbf v)$, then "AB means: do B first, then A" in red and "Read left to right, act right to left, like f(g(x))." in muted grey.

---

## Scene 2 — Follow the columns (Lesson 1.1)

**Narration:**

- **Beat a:** Now find that matrix, with no new rule. The columns of a matrix are where i hat and j hat land, so just follow them through both machines.
- **Beat b:** The rotation sends i hat to zero, one. The shear sends that to one, one. That is column one.
- **Beat c:** The rotation sends j hat to minus one, zero, and the shear leaves that alone. That is column two.
- **Beat d:** Stack the two columns and you have S R. The one sentence to remember: column j of A B is A times column j of B.

**Visuals:**

- **Beat a:** Header "Finding SR: follow i hat and j hat".
- **Beat b:** $\hat\imath \xrightarrow{R} \begin{pmatrix}0\\1\end{pmatrix} \xrightarrow{S} \begin{pmatrix}1\\1\end{pmatrix}$, with $\hat\imath$ in red.
- **Beat c:** $\hat\jmath \xrightarrow{R} \begin{pmatrix}-1\\0\end{pmatrix} \xrightarrow{S} \begin{pmatrix}-1\\0\end{pmatrix}$, with $\hat\jmath$ in teal.
- **Beat d:** A boxed $SR = \begin{pmatrix}1&-1\\1&0\end{pmatrix}$ on the right. The red rule "column $j$ of $AB$ = $A\times$(column $j$ of $B$)" appears at the top, and the footer reads "Every product rule in this chapter comes from this one sentence."

---

## Scene 3 — Row by column, and the dominoes (Lesson 1.2)

**Narration:**

- **Beat a:** For a single entry there is a faster way to read the same rule. Entry i j of the product is row i of the first matrix, dotted with column j of the second. Multiply matching entries, and add.
- **Beat b:** Notice it is not entry by entry. Multiplying matching entries would ignore how the machines chain together.
- **Beat c:** For that to work, a row of the first matrix must be as long as a column of the second. Think of dominoes. A two by three times a three by two works: the touching ends match, and the outer ends give the answer, two by two.
- **Beat d:** Swap the order to three by four times two by three, and the touching ends are four and two. That product does not exist. So one order being defined says nothing about the other.

**Visuals:**

- **Beat a:** $\begin{pmatrix}2&1\\1&3\end{pmatrix}\begin{pmatrix}1&-1\\2&0\end{pmatrix} = \begin{pmatrix}4&-2\\7&-1\end{pmatrix}$, with the product's entries hidden at first. A red box goes round row 1 of the first matrix and a teal box round column 1 of the second. "$2\cdot1 + 1\cdot2 = 4$" is written and the 4 appears. The boxes then step through the other three entries, and each one appears in turn.
- **Beat b:** "Not entry by entry!" in red, to the right.
- **Beat c:** Domino tiles [2|3][3|2] with the label "orders". The touching 3s fill gold, then "→ 2 × 2".
- **Beat d:** Below them, [3|4][2|3]. The touching 4 and 2 fill red, then a red cross and "not defined: 4 and 2 do not match".

---

## Scene 4 — Order matters, and zero products (Lesson 1.3)

**Narration:**

- **Beat a:** Socks then shoes is not shoes then socks. Matrix products are sequences, so order should matter. On the left, rotate then shear. On the right, shear then rotate.
- **Beat b:** Same two moves, different final squares. So S R is not R S. In general, A B is not B A. When they are equal, we say the matrices commute, and that is special, never assumed.
- **Beat c:** Order is not the only surprise. Let B squash the whole plane onto the y axis. Then let A project onto the x axis, which sends the whole y axis to the origin.
- **Beat d:** Nothing survives. A B is the zero matrix, although neither factor is zero. So you cannot cancel a matrix the way you cancel a number. And when you expand A plus B, all squared, keep A B and B A as separate terms.

**Visuals:**

- **Beat a:** Header "Order matters". Two small grids (unit 0.5) titled "rotate, then shear: SR" and "shear, then rotate: RS". The left grid gets $R$ then $S$, and the right grid gets $S$ then $R$ at the same time.
- **Beat b:** $SR = \begin{pmatrix}1&-1\\1&0\end{pmatrix} \ne RS = \begin{pmatrix}0&-1\\1&1\end{pmatrix}$ at the bottom.
- **Beat c:** Clear. Header "A zero product with no zero factor". A grid on the left. On the right, $B = \begin{pmatrix}0&0\\1&0\end{pmatrix}$ "squash onto the y-axis" and $A = \begin{pmatrix}1&0\\0&0\end{pmatrix}$ "project onto the x-axis". The grid collapses onto the y-axis, then to a single point.
- **Beat d:** $AB = \begin{pmatrix}0&0\\0&0\end{pmatrix} = O$, then "AB = AC does not give B = C" in red, then $(A+B)^2 = A^2 + AB + BA + B^2$.

---

## Scene 5 — The algebra that does work (Lesson 1.4)

**Narration:**

- **Beat a:** Only commutativity failed. Everything else still holds, and composition shows why. Both A B times C and A times B C describe the same sequence: C, then B, then A. The brackets only say which two steps you merged first.
- **Beat b:** Associativity is what makes powers meaningful. A squared means apply A twice. It is a matrix product, not the entries squared.
- **Beat c:** Because powers, sums and scalar multiples all make sense, so do polynomials in a matrix. For this A, A squared, minus five A, plus seven I, is the zero matrix. The seven must be seven I: you cannot add a number to a matrix.
- **Beat d:** Now A cubed needs no cubing. Multiply the identity by A, and replace each A squared with five A minus seven I. You get eighteen A minus thirty five I.

**Visuals:**

- **Beat a:** A pipeline $\mathbf v \to [C] \to [B] \to [A] \to A(B(C\mathbf v))$ built from coloured rounded boxes, with $(AB)C = A(BC)$ below it. A gold bracket goes round $B, A$, then moves to $C, B$.
- **Beat b:** $\begin{pmatrix}1&2\\3&4\end{pmatrix}^2 = \begin{pmatrix}7&10\\15&22\end{pmatrix}$ with a check, then $\ne \begin{pmatrix}1&4\\9&16\end{pmatrix}$ with a cross.
- **Beat c:** Clear. Header "Matrix polynomials". $A = \begin{pmatrix}3&1\\-1&2\end{pmatrix}$ and $A^2 = \begin{pmatrix}8&5\\-5&3\end{pmatrix}$, then $A^2 - 5A + 7I = O$ with the $7I$ indicated in red.
- **Beat d:** $A^3 = A\cdot A^2 = 5A^2 - 7A$, then $= 5(5A-7I) - 7A = 18A - 35I$, then $= \begin{pmatrix}19&18\\-18&1\end{pmatrix}$.

---

## Scene 6 — Special matrices are behaviours (Lesson 1.5)

**Narration:**

- **Beat a:** Some matrices have names, and the useful names describe a behaviour: what happens when you apply the matrix twice.
- **Beat b:** Apply each one once.
- **Beat c:** Now apply each one again. A projection changes nothing the second time, so P squared is P. A reflection undoes itself, so F squared is the identity. The nilpotent one flattens, then vanishes: N squared is zero. And an orthogonal matrix turns rigidly, keeping every length and angle.
- **Beat d:** Two naming traps. A diagonal matrix only needs zeros off the diagonal, so zeros on it are fine. And a scalar matrix is k times I, which is stricter than diagonal.

**Visuals:**

- **Beat a:** Four mini panels, each with the unit square and basis arrows and no moving grid lines: "idempotent / projection" $\begin{pmatrix}1&0\\0&0\end{pmatrix}$, "involutory / reflection" $\begin{pmatrix}0&1\\1&0\end{pmatrix}$, "nilpotent / flatten, then vanish" $\begin{pmatrix}0&1\\0&0\end{pmatrix}$, and "orthogonal / rotation" $\begin{pmatrix}0.6&-0.8\\0.8&0.6\end{pmatrix}$.
- **Beat b:** All four matrices are applied at once.
- **Beat c:** All four are applied again. The projection does not change, the reflection returns home, the nilpotent square shrinks to a dot, and the rotation turns further. The laws $P^2 = P$, $F^2 = I$, $N^2 = O$ and "lengths kept" are written under the panels.
- **Beat d:** A red footer: "Traps: a diagonal matrix may have zeros on its diagonal. A scalar matrix is kI, stricter than diagonal."

---

## Scene 7 — Transpose, symmetric and skew (Lesson 1.6)

**Narration:**

- **Beat a:** Store a table of marks with students as rows, or as columns. Same data, flipped layout. That flip is the transpose. Row one of A becomes column one of A transpose.
- **Beat b:** Transposing a product reverses the order. A B transpose is B transpose times A transpose. It is socks and shoes: you put socks on first, but you take shoes off first.
- **Beat c:** A square matrix equal to its own transpose is symmetric. One equal to minus its transpose is skew symmetric, and its diagonal is forced to be zero.
- **Beat d:** And every square matrix splits into one of each: half of A plus A transpose, which is symmetric, plus half of A minus A transpose, which is skew.

**Visuals:**

- **Beat a:** $A = \begin{pmatrix}1&2&3\\4&5&6\end{pmatrix}$ with row 1 in red and row 2 in teal, an arrow, then $A^T$. `TransformFromCopy` carries each row into the matching column of $\begin{pmatrix}1&4\\2&5\\3&6\end{pmatrix}$.
- **Beat b:** A boxed $(AB)^T = B^TA^T$, with "socks on, then shoes; shoes off first" below it.
- **Beat c:** Clear. $A^T = A$ "symmetric: mirror image across the diagonal", then $A^T = -A$ with "skew: $a_{ii} = -a_{ii} \Rightarrow$ zero diagonal".
- **Beat d:** $A = \tfrac12(A + A^T) + \tfrac12(A - A^T)$, then the worked split $\begin{pmatrix}3&5\\1&-1\end{pmatrix} = \begin{pmatrix}3&3\\3&-1\end{pmatrix} + \begin{pmatrix}0&2\\-2&0\end{pmatrix}$ with "symmetric" and "skew" tags under the two parts.

---

## Scene 8 — Recap and next (Lesson 1.7)

**Narration:**

- **Beat a:** To recap. A B means do B first, then A. Column j of the product is A times column j of B, and the row by column rule reads it one entry at a time.
- **Beat b:** Order matters, zero products can come from non zero factors, and you cannot cancel. Associativity and distributivity still work, so powers and polynomials make sense.
- **Beat c:** Transposing a product reverses it, and every square matrix is symmetric plus skew. Next, in chapter two: how much space a matrix stretches, the determinant.

**Visuals:** Title "Chapter 1 in five lines" in red. Five formula rows fade in with the narration:

1. $AB$ = do $B$ first, then $A$
2. column $j$ of $AB$ = $A\times$(column $j$ of $B$)
3. $AB \ne BA$, $AB = O$ with $A, B \ne O$, no cancelling
4. $(AB)C = A(BC)$, $A^2 = AA$ (not entries squared)
5. $(AB)^T = B^TA^T$, $A$ = symmetric + skew
