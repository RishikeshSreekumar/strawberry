# The Inverse: Undoing a Transformation — Explainer Script

- **Course:** Matrices
- **Chapter:** Chapter 3 · The Inverse: Undoing a Transformation (id: `mx-3-the-inverse-undoing-a-transformation`)
- **Target runtime:** about 5 to 5.5 minutes (roughly 870 spoken words at Samantha's default ~175 wpm, plus animation time)
- **Scene class:** `MxCh3Video` in `videos/scenes/mx-3-the-inverse-undoing-a-transformation.py`

**Learning goal.** The learner sees the inverse as the matrix that undoes a transformation: after A and then A inverse, the grid returns home. They see why a collapsing matrix has no inverse (two inputs share one output), so an inverse exists exactly when det A is not zero. They derive the 2 by 2 inverse (swap the diagonal, negate the off-diagonal, divide by ad − bc) and avoid "negate everything" and "reciprocal of each entry". They build the adjoint as the *transpose* of the cofactor matrix and see why A · adj A = |A| I (alien cofactors give a determinant with two equal rows). They use A⁻¹ = adj A / |A|, the reversal rule (AB)⁻¹ = B⁻¹A⁻¹, the other rules, and the polynomial shortcut. They invert by row-reducing [A | I] to [I | A⁻¹], know why it works (elementary matrices) and what a zero row means.

**Global style (all scenes):** light background (`BG #FDF8F4`), ink text. Colour roles: i-hat image / column 1 = strawberry RED (`PRIMARY`), j-hat image / column 2 = BLUE (`#2B6CB0`), the test shape (a letter-F polygon) = AMBER (`ACCENT`), highlights = GOLD (`#D19A00`), errors and crossed-out claims = RED, "correct" = GREEN, collapse = MUTED grey. Grids are `NumberPlane`s with GRID-coloured lines and MUTED axes, scaled so one unit is 0.8 scene units, with the origin left of centre so the right third of the frame holds white-filled cards. Each scene has a small MUTED header card in the top-left naming its lesson ("3.1 · Undoing a Transformation"). Math uses `MathTex` (and `Matrix` with round brackets where entries must move individually). Clear the frame with `FadeOut` between scenes.

**TTS note:** symbols are spoken as words: "A inverse", "a d minus b c", "det of A", "adjoint of A", "one quarter". Matrix entries are read row by row ("rows four, seven and two, six"). Points are read "the point two, zero".

---

## Scene 0 — Title card

**Narration:** Matrices, chapter three. The inverse: undoing a transformation.

**Visuals:** `title_card("Matrices", "Chapter 3 · The Inverse: Undoing a Transformation", ...)`.

---

## Scene 1 — Hook: the grid goes home (Lesson 3.1)

**Narration:**

- **Beat a:** Every matrix moves the plane. This one turns the grid a quarter turn, then shears it. The natural question is the one you ask of any action. Can it be undone?
- **Beat b:** Here is a second matrix that does exactly that. Apply it to the result, and every point slides back to where it started. That undo matrix is called A inverse.
- **Beat c:** Doing A and then A inverse changes nothing, and neither does the other order. In symbols, A times A inverse equals A inverse times A equals the identity. And when an inverse exists, there is only one.

**Visuals:**

- **Beat a:** Plane with origin at (−2.5, −0.3). RED arrow i-hat, BLUE arrow j-hat, AMBER letter-F polygon in the first quadrant, plus a dashed MUTED outline of the F that stays put ("home"). Right card: `A = [[1, −1], [1, 0]]` and the caption "rotate 90°, then shear". `ApplyMatrix(A)` on the plane and the F while the arrows transform to (1, 1) and (−1, 0). A GOLD "Can it be undone?" appears.
- **Beat b:** Second card: `A^{-1} = [[0, 1], [−1, 1]]`. `ApplyMatrix(A⁻¹)` returns grid, arrows and F exactly onto the dashed outline; the outline flashes GREEN.
- **Beat c:** Card: `A A^{-1} = A^{-1} A = I` and "an inverse is unique".

---

## Scene 2 — When undo is impossible (Lesson 3.1)

**Narration:**

- **Beat a:** Now try the matrix with rows one, two and two, four. Its columns point along the same line, so the whole plane is flattened onto that line.
- **Beat b:** Watch two different inputs. The point two, zero and the point zero, one both land on the point two, four. An undo would have to send two, four back to both at once. No function can do that.
- **Beat c:** So a matrix has an inverse exactly when nothing is squashed, that is, when its determinant is not zero. Such a matrix is called non singular. A zero determinant means singular, and no inverse.
- **Beat d:** One trap to avoid. The inverse is not the matrix of reciprocals. Multiplication mixes rows with columns, so it cannot be undone entry by entry.

**Visuals:**

- **Beat a:** Fresh plane; card `A = [[1, 2], [2, 4]]`. `ApplyMatrix` collapses the whole grid onto the line y = 2x (MUTED line highlighted).
- **Beat b:** Before the collapse is shown, two dots: RED at (2, 0), BLUE at (0, 1), labelled. After the collapse both dots move to (2, 4) and a label "(2, 4)" plus "two inputs, one output" appears. A dashed arrow back from (2, 4) with a "?" and a RED cross.
- **Beat c:** Card: `det A = 1·4 − 2·2 = 0`, then the boxed rule `A^{-1} exists ⟺ det A ≠ 0`, with the words "non-singular" and "singular".
- **Beat d:** Clear. `[[2, 1], [1, 1]]^{-1} ≠ [[1/2, 1], [1, 1]]` with a RED cross; below it, in GREEN, the true inverse `[[1, −1], [−1, 2]]`.

---

## Scene 3 — The 2 by 2 inverse, derived (Lesson 3.2)

**Narration:**

- **Beat a:** For a two by two matrix we can derive the inverse. Set A times an unknown matrix equal to the identity, and solve the four equations. The same number, a d minus b c, appears in every denominator.
- **Beat b:** Read the recipe. Swap the two diagonal entries. Negate the two off diagonal entries. Divide by a d minus b c. And now you see why a zero determinant blocks the inverse: you would be dividing by zero.
- **Beat c:** An example. For rows four, seven and two, six, the determinant is twenty four minus fourteen, which is ten. Swap and negate, then divide by ten. Multiply back to check: the product is ten times the identity, so dividing by ten gives exactly the identity.
- **Beat d:** Careful. Only the off diagonal entries change sign. The diagonal entries swap places but keep their signs.

**Visuals:**

- **Beat a:** `[[a, b], [c, d]] [[p, q], [r, s]] = I` at top; the four equations in two columns; they resolve to `p = d/(ad−bc)`, `q = −b/(ad−bc)`, `r = −c/(ad−bc)`, `s = a/(ad−bc)` with each `ad − bc` GOLD.
- **Beat b:** A `Matrix([[a, b], [c, d]])`: a and d swap along curved paths (GOLD), b and c turn RED and gain minus signs; the fraction `1/(ad − bc)` slides in front. Label "divide by 0? impossible" under the fraction.
- **Beat c:** Stacked lines: `A = [[4, 7], [2, 6]]`, `det A = 24 − 14 = 10`, `A^{-1} = (1/10)[[6, −7], [−2, 4]]`, and the check `[[4,7],[2,6]][[6,−7],[−2,4]] = [[10,0],[0,10]] = 10 I` with a GREEN tick.
- **Beat d:** `[[−6, −7], [−2, −4]]` labelled "negate everything" with a RED cross beside the correct `[[6, −7], [−2, 4]]` with a GREEN tick.

---

## Scene 4 — Cofactors and the adjoint (Lesson 3.3)

**Narration:**

- **Beat a:** For bigger matrices we want the same trick: a matrix that multiplies A to give det of A times the identity. The cofactors from chapter two do the job. Each cofactor is a minor with a checkerboard sign.
- **Beat b:** Collect the cofactors into a matrix, then transpose it: rows become columns. The result is the adjoint of A. Forgetting the transpose is the classic mistake.
- **Beat c:** Why does it work? Multiply A by its adjoint. A row times its own cofactors expands the determinant, which is four. A row times another row's cofactors is the determinant of a matrix with two equal rows, which is zero. So A times adjoint of A is det of A times the identity.

**Visuals:**

- **Beat a:** `A = [[1, 2, 1], [0, 3, 2], [1, 0, 1]]` on the left; the sign checkerboard `[[+, −, +], [−, +, −], [+, −, +]]` on the right. One example: `C_{12} = −|0 2; 1 1| = 2`.
- **Beat b:** Cofactor matrix `[[3, 2, −3], [−2, 0, 2], [1, −2, 3]]` appears; each entry (i, j) flies to (j, i) (diagonal entries GOLD, stay put) to form `adj A = [[3, −2, 1], [2, 0, −2], [−3, 2, 3]]`.
- **Beat c:** Two lines: `1·3 + 2·2 + 1·(−3) = 4 = |A|` (own cofactors, GREEN) and `1·(−2) + 2·0 + 1·2 = 0` (alien cofactors, MUTED), then `A (adj A) = [[4,0,0],[0,4,0],[0,0,4]] = |A| I`.

---

## Scene 5 — The inverse and its rules (Lesson 3.4)

**Narration:**

- **Beat a:** Divide by the determinant, and there is the inverse. A inverse equals one over det of A, times adjoint of A. For our three by three example the determinant is four, so the inverse is one quarter of the adjoint.
- **Beat b:** Inverses of products come off in reverse order. A B means do B first, then A, like socks and then shoes. To undo, take the shoes off first. So the inverse of A B is B inverse times A inverse, not A inverse times B inverse.
- **Beat c:** Two more rules follow the same way. The inverse of the transpose is the transpose of the inverse. And the determinant of A inverse is one over det of A.
- **Beat d:** Sometimes a polynomial hands you the inverse. If A squared minus four A plus the identity is zero, then A times the quantity four I minus A equals the identity. So A inverse is four I minus A, with no adjoint at all.

**Visuals:**

- **Beat a:** Boxed `A^{-1} = \frac{1}{|A|} adj A`; below, `A^{-1} = \frac14 [[3, −2, 1], [2, 0, −2], [−3, 2, 3]]`.
- **Beat b:** Two rows of chips: "put on: socks (B) → shoes (A)" and "take off: shoes (A⁻¹) → socks (B⁻¹)". Then `(AB)^{-1} = B^{-1}A^{-1}` in GREEN and `≠ A^{-1}B^{-1}` crossed in RED.
- **Beat c:** Card: `(A^T)^{-1} = (A^{-1})^T` and `|A^{-1}| = 1/|A|`.
- **Beat d:** Chain: `A^2 − 4A + I = O` → `A(4I − A) = I` → `A^{-1} = 4I − A`; example `A = [[2, 3], [1, 2]]` gives `A^{-1} = [[2, −3], [−1, 2]]`.

---

## Scene 6 — Inverse by row operations (Lesson 3.5)

**Narration:**

- **Beat a:** For large matrices, row operations win. Write A next to the identity. Use row operations to turn the left block into the identity, and the right block becomes A inverse.
- **Beat b:** Take rows two, one and five, three. Halve row one. Subtract five times row one from row two. Double row two. Subtract half of row two from row one. The right block now reads three, minus one, minus five, two.
- **Beat c:** Why does this work? Each row operation is multiplication by an elementary matrix. Their product turns A into the identity, so that product is A inverse. The right block started as the identity and has recorded exactly that product.
- **Beat d:** If a row of zeros appears on the left, the matrix is singular: stop, there is no inverse. And use row operations only. Never mix in column operations.

**Visuals:**

- **Beat a:** `[A | I] → [I | A^{-1}]` as a banner.
- **Beat b:** Augmented matrix `[2 1 | 1 0; 5 3 | 0 1]` centred; after each step the operation label (`R_1 \to \tfrac12 R_1`, `R_2 \to R_2 - 5R_1`, `R_2 \to 2R_2`, `R_1 \to R_1 - \tfrac12 R_2`) appears on the right and the matrix transforms. Final `[1 0 | 3 −1; 0 1 | −5 2]`, right block boxed GREEN and labelled `A^{-1}`.
- **Beat c:** `E_k \cdots E_2 E_1 A = I \Rightarrow E_k \cdots E_1 = A^{-1}` and `E_k \cdots E_1 I = A^{-1}`.
- **Beat d:** `[1 2 | 1 0; 2 4 | 0 1] → (R_2 → R_2 − 2R_1) → [1 2 | 1 0; 0 0 | −2 1]` with the zero row boxed RED and "singular: no inverse"; a small note "rows only, never mix with columns".

---

## Scene 7 — Recap

**Narration:**

- **Beat a:** To recap. The inverse undoes a transformation, and it exists exactly when the determinant is not zero. For two by two: swap, negate, divide.
- **Beat b:** In general, it is the adjoint over the determinant, or row reduce A beside the identity. And inverses of products come off in reverse order.
- **Beat c:** Try the mastery quiz. Then chapter four puts the inverse to work, solving systems of linear equations.

**Visuals:** Four cards in a 2 × 2 grid: `A^{-1} \iff \det A \ne 0`, the 2 × 2 formula, `A^{-1} = \frac{1}{|A|} adj A` with `[A|I] → [I|A^{-1}]`, and `(AB)^{-1} = B^{-1}A^{-1}`. Then "Next: Chapter 4 · Solving Systems of Linear Equations".
