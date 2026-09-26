# Rank and Eigenvalues: The Shape of a Transformation — Explainer Script

- **Course:** Matrices
- **Chapter:** Chapter 5 · Rank and Eigenvalues: The Shape of a Transformation (id: `mx-5-rank-and-eigenvalues`)
- **Scene class:** `MxCh5Video` in `videos/scenes/mx-5-rank-and-eigenvalues.py`
- **Target runtime:** about 5 to 6 minutes (roughly 1,000 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner sees rank as the number of dimensions that survive a transformation: rank 2 keeps the plane, rank 1 flattens it onto a line, rank 0 crushes it to a point. They know the determinant cannot tell a line from a point but rank can. They find rank by counting non-zero rows in echelon form, not in the original matrix. They read consistency from rank (Rouché–Capelli): the system is consistent exactly when rank A equals rank [A | B], it has a unique solution when that common rank equals the number of unknowns, and otherwise it has n − r free parameters. Rank settles the three-parallel-planes puzzle that left Cramer's rule silent. They see eigenvectors as the directions a matrix does not turn (Av = λv, v ≠ 0), with λ as the stretch, and they meet a shear (one line), a rotation (none) and a reflection (two lines, λ = ±1). They derive det(A − λI) = 0 from "a non-zero vector sent to zero means a squash", use λ² − (tr A)λ + det A = 0 for a 2 × 2, get eigenvectors from the parallel rows of A − λI, and avoid the diagonal-entries trap. They finish with Cayley–Hamilton, using it for the inverse and for high powers.

**Global style (all scenes):** light background (`BG #FDF8F4`), ink text. Colour roles: column 1 / i-hat image = strawberry RED (`PRIMARY`), column 2 / j-hat image = TEAL (`SECONDARY`), unit square = AMBER (`ACCENT`), probe vector v = TEAL, its image Av = RED, eigen-lines and results = GOLD `#D19A00`, λ and general laws = PURPLE, warnings = RED, "consistent" and checks = GREEN. Grids use the same `Grid` helper as the Chapter 0 and 1 videos (faint fixed reference grid plus a moving teal grid). Each lesson scene has a small MUTED header in the top-left ("5.1 · Rank: How Many Dimensions Survive"). Maths uses `MathTex`. Clear the frame with `FadeOut` between scenes.

**TTS note:** symbols are spoken as words: "A v equals lambda v", "A minus lambda I", "lambda squared minus seven lambda plus ten", "R two minus two R one", "rank of A". Lone capital letters (A, B, R, v) are wrapped in `[[char LTRL]]` so `say` spells them instead of reading "a" as an article. Matrices are read row by row: "two one, one two".

---

## Scene 0 — Title card

**Narration:** Matrices, chapter five. Rank and eigenvalues: the shape of a transformation.

**Visuals:** `title_card("Matrices", "Chapter 5 · Rank and Eigenvalues", ...)`.

---

## Scene 1 — Hook: two questions about any matrix

**Narration:**

- **Beat a:** This is the last chapter of the course, and it asks two questions about any matrix. First: when it moves the plane, how many dimensions are still standing afterwards?
- **Beat b:** This one has determinant zero, so the plane is squashed. But it is squashed onto a line, not crushed to a point. The determinant cannot tell those apart. Rank can.
- **Beat c:** Second: which directions does the matrix leave pointing the same way? Watch this one. Almost every arrow gets turned, but two lines stay exactly where they were. Those lines are the eigenvectors, and they reveal the shape of the whole transformation.

**Visuals:**

- **Beat a:** Left half: heading "How many dimensions survive?", matrix `(1 2; 2 4)`, and a small grid (unit square, i-hat, j-hat) that collapses onto the line through (1, 2).
- **Beat b:** Caption under it: "det = 0, but still a whole line".
- **Beat c:** Right half: heading "Which directions don't turn?", matrix `(2 1; 1 2)`, a grid with gold dashed lines y = x and y = −x. The grid transforms and the two gold lines pulse. They are still in place.

---

## Scene 2 — Rank (Lesson 5.1)

**Narration:**

- **Beat a:** Rank is the number of dimensions in the output. Here, the columns two one and one three point in different directions, so the plane stays a plane. Rank two.
- **Beat b:** Here, the second column, two four, is twice the first, one two. Every output lands on one line. Rank one. And the zero matrix sends everything to the origin. Rank zero.
- **Beat c:** So rank counts the independent columns. And, surprisingly, that always equals the number of independent rows. When a square matrix has full rank, its determinant is not zero, and it has an inverse.
- **Beat d:** To find the rank, row reduce. R two minus two R one wipes out row two completely. It was secretly twice row one. R three minus R one gives zero, minus two, minus two. Swap them, and count the non-zero rows.
- **Beat e:** Two. So the rank is two, even though the original matrix had three non-zero rows. Reduce first, then count.

**Visuals:**

- **Beats a–b:** Three small grids side by side with matrices `(2 1; 1 3)`, `(1 2; 2 4)` and `(0 0; 0 0)` beneath. Each transforms in turn and gets a red label: "rank 2: plane to plane", "rank 1: onto a line", "rank 0: to a point".
- **Beat c:** Grids fade. `rank A = # independent columns = # independent rows`.
- **Beat d:** The chain `(1 2 3; 2 4 6; 1 0 1) →[R₂ − 2R₁, R₃ − R₁] (1 2 3; 0 0 0; 0 −2 −2) →[R₂ ↔ R₃] (1 2 3; 0 −2 −2; 0 0 0)`.
- **Beat e:** Gold `2 non-zero rows ⇒ rank A = 2`, then a red warning: "Reduce first, then count: the original had 3 non-zero rows."

---

## Scene 3 — Rank and solutions (Lesson 5.2)

**Narration:**

- **Beat a:** Now systems. A X equals B asks one question: is B one of the outputs of A? The outputs form a space with as many dimensions as the rank. Glue B on as an extra column, making the augmented matrix.
- **Beat b:** If B already lies in the output space, it adds no new direction, the rank stays the same, and the system has a solution.
- **Beat c:** If B sticks out, the rank goes up by one, and there is no solution at all.
- **Beat d:** That is the Rouché–Capelli theorem. The system is consistent exactly when the two ranks are equal. Then, with n unknowns, a common rank of n gives a unique solution, and anything less leaves n minus r free parameters.
- **Beat e:** Remember the three parallel planes from chapter four: x plus y plus z equals one, two, and three. Every determinant was zero, and Cramer's rule was silent. Row reduce the augmented matrix. Rank of A is one, but the augmented rank is two. No solution, and no guesswork.
- **Beat f:** One trap. Equal ranks mean the system is consistent, and nothing more. A unique solution needs the rank to equal the number of unknowns.

**Visuals:**

- **Beats a–c:** Left: a teal line through the origin labelled "outputs of A", with a gold arrow B lying along it. Right: `AX = B: is B an output of A?`, then green `rank[A | B] = rank A` / "consistent". The arrow B then swings off the line, and red `rank[A | B] = rank A + 1` / "no solution" appears.
- **Beat d:** Purple-boxed theorem: "Rouché–Capelli", `consistent ⇔ rank A = rank[A | B] = r`, `r = n: unique; r < n: n − r free parameters`.
- **Beat e:** `[1 1 1 | 1; 1 1 1 | 2; 1 1 1 | 3] → [1 1 1 | 1; 0 0 0 | 1; 0 0 0 | 0]` with the verdict `rank A = 1`, `rank[A | B] = 2`, "no solution".
- **Beat f:** Red caption: "Equal ranks mean consistent, nothing more. Unique needs rank = number of unknowns."

---

## Scene 4 — Directions that don't turn (Lesson 5.3)

**Narration:**

- **Beat a:** Now the second question. Take A equals two one, one two. Draw a vector v in teal, and its image, A v, in red. Now sweep v around the circle. Almost everywhere, the image points somewhere new.
- **Beat b:** But along the line y equals x, A v lands on the same line, three times longer.
- **Beat c:** And along y equals minus x, v does not move at all.
- **Beat d:** These are eigenvectors. A v equals lambda v. The vector stays on its own line, and the eigenvalue lambda is the stretch: three and one here. The zero vector never counts, because it stays put for every matrix.
- **Beat e:** Not every matrix has them. A shear keeps only one line, the x axis. A quarter turn rotates every arrow, so it has no real eigenvectors at all. A reflection keeps two lines: one it leaves alone, with lambda one, and one it flips, with lambda minus one.

**Visuals:**

- **Beat a:** Left: faint axes, a unit circle, a teal unit arrow **v** and a red arrow **Av** (A = (2 1; 1 2)). **v** sweeps around the circle (0 → −60° → 30°) and **Av** swings around with it, at a different angle.
- **Beat b:** **v** stops at 45°. **Av** lies on the same line, three times as long. A gold dashed line y = x is drawn, and on the right `A(1,1) = (3,3) = 3(1,1)`.
- **Beat c:** **v** sweeps to 135°, where **Av** = **v** (the arrows overlap). A gold dashed line y = −x is drawn, with `A(1,−1) = (1,−1) = 1(1,−1)`.
- **Beat d:** Purple-boxed `Av = λv, v ≠ 0`.
- **Beat e:** Three cards: "Shear" `(1 1; 0 1)` with one gold line along the x axis, "one line, λ = 1". "Quarter turn" `(0 −1; 1 0)` with a red turning arc and no gold line, "no real eigenvectors". "Reflection in y = x" `(0 1; 1 0)` with gold lines y = ±x, "two lines, λ = 1 and −1".

---

## Scene 5 — Finding eigenvalues (Lesson 5.4)

**Narration:**

- **Beat a:** How do we find lambda without sweeping? Move everything to one side. A minus lambda I, times v, equals zero, with v not zero.
- **Beat b:** A matrix that sends a non-zero vector to zero must squash the plane. So its determinant is zero. That is the characteristic equation.
- **Beat c:** For a two by two, this always becomes lambda squared, minus the trace times lambda, plus the determinant, equals zero.
- **Beat d:** Take four one, two three. The trace is seven and the determinant is ten, so lambda squared minus seven lambda plus ten factors to give five and two. For lambda equals five, the rows of A minus five I are parallel, as they must be, and they give y equals x. The eigenvector is one one.
- **Beat e:** One trap. The diagonal entries are the eigenvalues only for a triangular matrix. One two, three two has diagonal one and two, but its eigenvalues are four and minus one. What always holds: the eigenvalues add up to the trace, and multiply to the determinant.

**Visuals:**

- **Beats a–b:** Left column derivation: `Av = λv` → `(A − λI)v = 0, v ≠ 0` → `A − λI squashes the plane` → purple boxed `det(A − λI) = 0`.
- **Beat c:** Right column, purple: `λ² − (tr A)λ + det A = 0`.
- **Beat d:** `A = (4 1; 2 3): tr = 7, det = 10`; `λ² − 7λ + 10 = (λ − 5)(λ − 2)`; `λ = 5: A − 5I = (−1 1; 2 −2) ⇒ v = (1, 1)`.
- **Beat e:** Bottom: `(1 2; 3 2): λ = 4, −1 (not 1, 2)` and gold `sum = tr A, product = det A`.

---

## Scene 6 — Cayley–Hamilton and powers (Lesson 5.5)

**Narration:**

- **Beat a:** Here is a surprise. Take the same characteristic equation, and replace lambda by the matrix itself, with ten becoming ten I. A squared is eighteen seven, fourteen eleven. Subtract seven A, add ten I, and everything cancels. The zero matrix.
- **Beat b:** That is the Cayley–Hamilton theorem. Every square matrix satisfies its own characteristic equation.
- **Beat c:** It is a tool. Rearranged, it hands you the inverse with no cofactors: one tenth of seven I minus A. And since A squared is seven A minus ten I, any higher power folds back down to a combination of A and I.
- **Beat d:** And it is not the cheap trick of putting lambda equals A inside the determinant. That gives a single number. The theorem is an equation between matrices, and it needed a real proof.

**Visuals:**

- **Beat a:** `λ² − 7λ + 10 = 0 ⇝ A² − 7A + 10I = ?`, then `(18 7; 14 11) − (28 7; 14 21) + (10 0; 0 10) = (0 0; 0 0)`.
- **Beat b:** Purple bold: "Every square matrix satisfies its own characteristic equation."
- **Beat c:** `A(7I − A) = 10I ⇒ A⁻¹ = (1/10)(7I − A)` and `A² = 7A − 10I ⇒ A³ = 7A² − 10A = 39A − 70I`.
- **Beat d:** Red caption: "Not a trick: det(A − AI) is a number; the theorem is a matrix equation."

---

## Scene 7 — Recap

**Narration:**

- **Beat a:** To recap. Rank counts the dimensions that survive, and you read it from echelon form. Equal ranks mean consistent, and rank equal to the number of unknowns means unique.
- **Beat b:** Eigenvectors stay on their own line, stretched by lambda. You find lambda from the determinant of A minus lambda I equals zero, and check it with the trace and the determinant.
- **Beat c:** And every matrix satisfies its own characteristic equation. From grids that move, to how they multiply, how much space they change, how to undo them, and now their shape: that is the whole course.

**Visuals:** heading "Chapter 5 in five lines"; five MathTex lines fade in one by one:

1. `rank A = dimensions that survive = non-zero rows in echelon form`
2. `consistent ⇔ rank A = rank[A | B]; unique ⇔ rank = n`
3. `Av = λv: v stays on its line, stretched by λ`
4. `det(A − λI) = 0; Σλ = tr A, Πλ = det A`
5. `A² − (tr A)A + (det A)I = O (Cayley–Hamilton)`
