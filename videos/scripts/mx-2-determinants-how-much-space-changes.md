# Determinants: How Much Space Changes — Explainer Script

- **Course:** Matrices
- **Chapter:** Chapter 2 · Determinants: How Much Space Changes (id: `mx-2-determinants-how-much-space-changes`)
- **Target runtime:** about 5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner sees the determinant as a single number measuring how a transformation scales area (volume in 3D), with a sign that records a flip. They derive ad minus bc by boxing the parallelogram, recognise that a zero determinant means the plane has been squashed onto a line (and cannot be undone), expand a 3 by 3 determinant with cofactors and the checkerboard of signs, read every row-operation property off the picture (swap flips the sign, scaling a row scales the determinant, a shear changes nothing, det of kA is k to the n times det A, det of AB is the product), evaluate the classic factorised determinant by creating zeros first, and use one half the modulus of a determinant for triangle area and collinearity — remembering that the modulus gives two values of k.

**Global style (all scenes):** light background (`BG #FDF8F4`), ink text. Colour roles: column 1 / i-hat image = strawberry RED (`PRIMARY`), column 2 / j-hat image = BLUE (`#2B6CB0`), area / parallelogram fill = AMBER (`ACCENT`), flipped orientation = PURPLE, highlights = GOLD, zero / collapse = MUTED grey, "correct" = GREEN. Grids are `NumberPlane`s with GRID-coloured lines and MUTED axes. Each scene has a small MUTED header in the top-left naming its lesson ("2.1 · The Area Scale Factor"). Math uses `MathTex`; spoken formulas are spelled out in words. Clear the frame with `FadeOut` between scenes.

**TTS note:** symbols are always spoken as words: "a d minus b c", "det of A", "k to the n", "one half". Matrix entries are read row by row. A lone letter "a" is said as "the entry a" or "the letter a" where it would otherwise be read as the article.

---

## Scene 0 — Title card

**Narration:** Matrices, chapter two. Determinants: how much space changes.

**Visuals:** `title_card("Matrices", "Chapter 2 · Determinants", ...)`.

---

## Scene 1 — Hook: every square changes by the same factor (Lesson 2.1)

**Narration:**

- **Beat a:** A two by two matrix moves the whole plane. Grid lines stay straight, parallel and evenly spaced, and the origin stays put.
- **Beat b:** So every little grid square becomes the same parallelogram. Shapes change, but every area changes by one common factor.
- **Beat c:** Follow the unit square. Its sides, i hat and j hat, land on the two columns of the matrix. Its new area is the scale factor. That number is the determinant.

**Visuals:**

- **Beat a:** Left: `NumberPlane` (range ±4, unit 0.62) centred at (-3.2, -0.3) with RED i-hat and BLUE j-hat arrows and an AMBER unit square. Right: `MathTex(A = \begin{pmatrix}3&1\\1&2\end{pmatrix})`. `ApplyMatrix([[3,1],[1,2]])` about the plane origin applied to plane, square and arrows together.
- **Beat b:** Two other grid squares (at (1,1) and (-2,1) before the move) are shaded and moved along; each gets the label "area 5".
- **Beat c:** Arrow labels become the columns `(3,1)` and `(1,2)`. On the right: `\text{area scale factor} = \det A = 5`.

---

## Scene 2 — Deriving a d minus b c (Lesson 2.1)

**Narration:**

- **Beat a:** Why a d minus b c? Box the parallelogram. With columns a c and b d, the box is a plus b wide and c plus d tall.
- **Beat b:** Around the parallelogram sit two triangles making an a by c rectangle, two triangles making a b by d rectangle, and two corner rectangles of b times c.
- **Beat c:** Subtract them all, and almost everything cancels. What is left is a d minus b c. For our matrix: three times two, minus one times one, is five.

**Visuals:**

- **Beat a:** Plane of Scene 1 cleared; a clean parallelogram on a small plane with columns (3,1) RED and (1,2) BLUE, dashed bounding box 4 × 3, braces labelled `a+b` and `c+d`. Right: `\text{box} = (a+b)(c+d)`.
- **Beat b:** The four triangles flash in MUTED fills (two RED-tinted, two BLUE-tinted) and the two corner rectangles in GOLD. Equation lines: `-\,ac`, `-\,bd`, `-\,2bc`.
- **Beat c:** `ac+ad+bc+bd-ac-bd-2bc = ad-bc` with the cancelling terms crossed out; then `3\cdot2-1\cdot1=5`, and a framed `\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc`.

---

## Scene 3 — The sign records a flip (Lesson 2.1)

**Narration:**

- **Beat a:** Area is never negative, but a determinant can be. Swap the columns: the matrix zero one, one zero reflects the plane in the line y equals x.
- **Beat b:** Before, turning from i hat to j hat is anticlockwise. After, it is clockwise. The area is still one, but the orientation has flipped, so the determinant is negative one. The size is the area; the sign records the flip.

**Visuals:**

- **Beat a:** Plane with unit square, curved GOLD arrow from i-hat to j-hat (anticlockwise). `ApplyMatrix([[0,1],[1,0]])`; dashed line y = x.
- **Beat b:** Curved arrow redrawn clockwise in PURPLE, square refilled PURPLE. Right: `\det = 0\cdot0 - 1\cdot1 = -1`, `|\det| = \text{area}`, `\text{sign} = \text{orientation}`.

---

## Scene 4 — Zero determinant: squashing the plane (Lesson 2.2)

**Narration:**

- **Beat a:** Now slide the second column toward the line of the first. The parallelogram gets thinner, and the determinant falls.
- **Beat b:** When the columns are parallel, the area is zero. The whole plane is squashed onto a single line.
- **Beat c:** And a collapse cannot be undone: many points land on the same spot, so no matrix can send them back. A zero determinant does not mean the zero matrix. It means the columns are parallel.

**Visuals:**

- **Beat a:** Plane; column 1 fixed at (2,1) RED; column 2 BLUE driven by a `ValueTracker` from (−1,2) to (1,0.5). `always_redraw` parallelogram and a live `\det = ` readout (DecimalNumber).
- **Beat b:** Final state: area 0, parallelogram is a segment; a dashed line through the origin along (2,1) labelled "the whole plane lands here"; `\det\begin{pmatrix}2&1\\1&0.5\end{pmatrix}=0`.
- **Beat c:** Three dots at different points each sent by arrows to the same point on the line; a "?" arrow back crossed out. Text: "det = 0 ⇔ columns parallel", "not the zero matrix".

---

## Scene 5 — Three by three: cofactor expansion (Lesson 2.3)

**Narration:**

- **Beat a:** In three dimensions the determinant is the volume scale factor: the unit cube becomes a slanted box.
- **Beat b:** To compute it, expand along a row. Each entry multiplies its minor, the two by two determinant left after deleting its row and column, with a sign from a checkerboard: plus, minus, plus.
- **Beat c:** For this matrix, along row one: two times six, minus one times five, plus three times negative twenty. That is twelve, minus five, minus sixty: negative fifty three.
- **Beat d:** Any row or column gives the same answer, so choose the one with the most zeros. And Sarrus' diagonal trick works only for three by three.

**Visuals:**

- **Beat a:** An oblique unit cube (edges drawn in an oblique projection) morphing into a parallelepiped; label `\text{volume scale} = \det A`.
- **Beat b:** Matrix `\begin{pmatrix}2&1&3\\0&4&-1\\5&2&1\end{pmatrix}` on the left; checkerboard `\begin{pmatrix}+&-&+\\-&+&-\\+&-&+\end{pmatrix}` on the right. For entry 2: its row and column are shaded out, the remaining `\begin{vmatrix}4&-1\\2&1\end{vmatrix}=6` shown.
- **Beat c:** Expansion line: `2(6) - 1(5) + 3(-20) = 12 - 5 - 60 = -53`.
- **Beat d:** Column 1 `(2,0,5)` highlighted, the 0 circled. Note: "Sarrus: 3×3 only".

---

## Scene 6 — Properties from the picture (Lesson 2.4)

**Narration:**

- **Beat a:** The properties all come from the picture. Swap two rows: the orientation flips, so the determinant changes sign.
- **Beat b:** Multiply one row by k: one edge stretches by k, so the determinant is multiplied by k.
- **Beat c:** Add a multiple of one row to another: that is a shear. The base and the height stay the same, so the determinant does not change at all.
- **Beat d:** Two traps. Multiplying the whole n by n matrix by k scales every row, so det of k A is k to the n times det A. And det of A plus B is not det A plus det B. But products work: do B, then A, and the scale factors multiply.

**Visuals:**

- **Beat a:** Three-row table on the right builds up: "swap two rows → × (−1)".
- **Beat b:** "scale a row by k → × k".
- **Beat c:** Left: parallelogram with base on the x-axis; a `ValueTracker` shears its top edge sideways; dashed height line and constant area readout "area 6". Table row: "add a multiple of a row → unchanged".
- **Beat d:** Below the table: `\det(kA) = k^n\det A` (with a crossed-out `k\det A`), `\det(A+B) \ne \det A + \det B`, and framed `\det(AB) = \det A\cdot\det B`.

---

## Scene 7 — Evaluating smartly (Lesson 2.5)

**Narration:**

- **Beat a:** Don't expand blindly. Make zeros first. Take the determinant with rows one a a squared, one b b squared, one c c squared.
- **Beat b:** Subtract row one from rows two and three. Shears, so nothing changes, and column one becomes one, zero, zero.
- **Beat c:** Now b minus a comes out of row two, and c minus a out of row three. Taking a factor out multiplies it outside; it does not divide.
- **Beat d:** Expand down column one, and what's left is c minus b. Tidied up, the answer is a minus b, times b minus c, times c minus a.

**Visuals:**

- **Beat a:** `\begin{vmatrix}1&a&a^2\\1&b&b^2\\1&c&c^2\end{vmatrix}` centred-left.
- **Beat b:** Transform to `\begin{vmatrix}1&a&a^2\\0&b-a&b^2-a^2\\0&c-a&c^2-a^2\end{vmatrix}` with side labels `R_2\to R_2-R_1`, `R_3\to R_3-R_1`.
- **Beat c:** `=(b-a)(c-a)\begin{vmatrix}1&a&a^2\\0&1&b+a\\0&1&c+a\end{vmatrix}`.
- **Beat d:** `=(b-a)(c-a)(c-b) = (a-b)(b-c)(c-a)` boxed.

---

## Scene 8 — Triangle area and collinearity (Lesson 2.6)

**Narration:**

- **Beat a:** A triangle is half a parallelogram. Take the triangle with corners one zero, six zero and four three. Slide it so one corner sits at the origin; sliding doesn't change area.
- **Beat b:** The two edges span a parallelogram of area fifteen, so the triangle has area seven point five. In general, the area is one half the modulus of the determinant of x, y, one rows.
- **Beat c:** If that determinant is zero, the triangle has no area: the three points are collinear.
- **Beat d:** One trap. If the area is given, keep the modulus. For the triangle with corners at the origin, four zero and zero k, area six gives k equals three or negative three.

**Visuals:**

- **Beat a:** Plane with triangle P1 (1,0), P2 (6,0), P3 (4,3) in AMBER. It translates by (−1,0).
- **Beat b:** The parallelogram completing it appears dashed (area 15); triangle labelled 7.5. Right: `\text{Area} = \tfrac12\left|\begin{vmatrix}x_1&y_1&1\\x_2&y_2&1\\x_3&y_3&1\end{vmatrix}\right|`.
- **Beat c:** Third point slides onto the line through the first two; triangle flattens; `= 0 \iff \text{collinear}`.
- **Beat d:** `\tfrac12|4k| = 6 \Rightarrow k = \pm 3` with both triangles (above and below the axis) sketched.

---

## Scene 9 — Recap

**Narration:** Five lines to keep. The determinant is the signed area or volume scale factor, a d minus b c for two by two. Zero means the space is squashed, and can't be undone. Expand three by three with cofactors along the line with most zeros. Swap flips the sign, scaling a row scales it, a shear changes nothing, and determinants multiply. And a triangle's area is one half the modulus of a determinant. Next chapter: undoing a transformation, the inverse.

**Visuals:** Five numbered lines each with a small formula: `\det = ad-bc`, `\det = 0`, `C_{ij} = (-1)^{i+j}M_{ij}`, `\det(AB)=\det A\det B`, `\tfrac12|\det|`. Final line "Next: Chapter 3 · The Inverse".
