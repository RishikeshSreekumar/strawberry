# The Scalar Triple Product and Vector Geometry — Explainer Script

- **Course:** Vector Algebra
- **Chapter:** Chapter 5 · The Scalar Triple Product and Vector Geometry (id: `va-5-triple-product-and-geometry`)
- **Target runtime:** about 5 to 5.5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm)

**Learning goal.** The learner sees the scalar triple product as a *volume*, not a formula: base area (the length of b cross c) times perpendicular height (the part of a along the normal). They get the determinant form by swapping the i, j, k row for a's components, and read every symmetry off it (cyclic shifts keep the value, a single swap flips the sign, dot and cross can trade places, a repeated vector gives zero). Zero volume means a flat box, so the triple product is the coplanarity test, and coplanar never meant parallel. Finally they learn to choose a product by what the question asks, chain products (point to line distance, skew lines), and prove classical geometry results in a few lines (cosine rule, rhombus diagonals, the angle bisector direction a hat plus b hat).

**Global style (all scenes):** light strawberry background (`BG` from `videos/lib/strawberry.py`). Colours: vector a = PRIMARY (strawberry red), vector b = SECONDARY (teal), vector c = PURPLE, normal b × c = GREEN, heights and highlights = ACCENT (amber), "keep" = GREEN, "flip" / warnings = PRIMARY. 3D boxes are drawn with a fixed oblique projection (x right, y receding up-right, z up) so the scene renders reliably without a 3D camera. The running example box has b = (4, 0, 0), c = (1, 3, 0) (base area 12) and a = 5(0, cos t, sin t), so the volume is 60 sin t, matching the Lesson 5.1 interactive. Math uses `MathTex`. The frame is cleared with `FadeOut` between scenes.

**TTS note:** Samantha reads a lone lower-case "a" as the article. In the narration strings the vector names are written as capital letters ("vector A dot, B cross C"), which she reads as letter names. Brackets are spoken as "the quantity" or with commas.

---

## Title card

**Narration:** Chapter five. The scalar triple product, and vector geometry.

**Visuals:** `title_card("Vector Algebra", "Chapter 5 · The Scalar Triple Product and Vector Geometry")`.

---

## Scene 1 — Hook: a leaning deck of cards (Lesson 5.1)

**Narration:**

- **Beat a:** Take a deck of cards and push it sideways. The stack leans, but not a single card was added or removed, so the volume has not changed. Volume is base area times perpendicular height, however much the box leans.
- **Beat b:** That leaning box is called a parallelepiped. Its three edges from one corner are three vectors, A, B and C. Can we find its volume using only the dot and cross products?

**Visuals:**

- **Beat a:** A stack of 12 thin rounded rectangles (the cards) sits upright; each card shifts right by an amount proportional to its height, so the stack shears into a parallelogram. A dashed ACCENT vertical line with label "h" and a brace along the bottom card labelled "base" appear. Caption `V = \text{base area} \times h`.
- **Beat b:** The deck fades out. The running example parallelepiped (tilt 53°) is drawn in oblique projection: six translucent faces, base tinted teal, with arrows a (red), b (teal), c (purple) from the corner and `\vec a, \vec b, \vec c` labels. The word "parallelepiped" appears above.

---

## Scene 2 — Base area times height (Lesson 5.1)

**Narration:**

- **Beat a:** Let B and C span the base. From chapter four, B cross C has length equal to the base area, and it points straight out of the base, along the normal.
- **Beat b:** Now dot vector A with that normal. A dot product picks out the part of A along the normal direction, and that is exactly the height. So A dot, the quantity B cross C, is base area times height.
- **Beat c:** Watch it change as A tilts. Standing straight up, the volume is sixty. At thirty degrees it is thirty. Lay A flat in the base, and the volume drops to zero. Tilt below the base, and it turns negative. The triple product is a signed volume.
- **Beat d:** We write it as A, B, C in square brackets, the scalar triple product. The brackets on the cross can be dropped, because A dot B, then crossed with C, means nothing: you cannot cross a number. And a tetrahedron on the same three edges is one sixth of the box.

**Visuals:**

- **Beat a:** Box on the left. The base parallelogram flashes; a GREEN arrow rises from the base centre labelled `\vec b\times\vec c`; on the right `|\vec b\times\vec c| = \text{base area} = 12`.
- **Beat b:** An ACCENT dashed segment from the tip of a straight down to the base, labelled h. On the right the formula `\vec a\cdot(\vec b\times\vec c) = \underbrace{|\vec b\times\vec c|}_{\text{base area}}\;\underbrace{|\vec a|\cos\phi}_{\text{height}}`.
- **Beat c:** A readout `\text{tilt} = ` (DecimalNumber, degrees) and `V = 60\sin(\text{tilt}) = ` (DecimalNumber). The tilt tracker runs 53° → 90° (V = 60) → 30° (V = 30) → 0° (V = 0, box flat) → −30° (V = −30), then back to 53°.
- **Beat d:** Right side replaced by a definition card `[\vec a\;\vec b\;\vec c] = \vec a\cdot(\vec b\times\vec c)`, then `(\vec a\cdot\vec b)\times\vec c` with a red cross and "a number cannot be crossed", then `V_{\text{tetra}} = \tfrac16\,|[\vec a\;\vec b\;\vec c]|`.

---

## Scene 3 — The determinant form and its symmetries (Lesson 5.2)

**Narration:**

- **Beat a:** A cross and then a dot is two steps. But the cross product is a determinant with I, J, K in the top row, and dotting with A simply swaps I, J, K for the components of A.
- **Beat b:** So the triple product is the three by three determinant with rows A, B, C, in that order. For A equals one, two, three, B equals zero, one, four, and C equals five, six, zero, it comes out to exactly one.
- **Beat c:** Every symmetry is now a determinant fact. Shift the rows round in a cycle, A B C, to B C A, to C A B, and the value stays. Swap any two, and the sign flips. The box is the same. Only its handedness changes.
- **Beat d:** That is why dot and cross can trade places: A dot B cross C equals A cross B dot C. The triple I, J, K gives plus one, a right handed triple. And a repeated vector gives zero, a flat box.

**Visuals:**

- **Beat a:** `\vec b\times\vec c = \begin{vmatrix}\hat i&\hat j&\hat k\\ b_1&b_2&b_3\\ c_1&c_2&c_3\end{vmatrix}`; its top row is boxed in ACCENT, then the whole equation transforms into `\vec a\cdot(\vec b\times\vec c) = \begin{vmatrix}a_1&a_2&a_3\\ \dots\end{vmatrix}` with the new top row boxed.
- **Beat b:** Card "rows in order: a, b, c". Below, the numeric determinant with rows (1,2,3), (0,1,4), (5,6,0), expanded `= 1(0-24) - 2(0-20) + 3(0-5)` then `= -24 + 40 - 15 = 1`.
- **Beat c:** Left: a cycle diagram, letters a, b, c on a circle with three curved arrows. Right: GREEN line `[\vec a\;\vec b\;\vec c] = [\vec b\;\vec c\;\vec a] = [\vec c\;\vec a\;\vec b]` with "cyclic: keep", then PRIMARY line `[\vec b\;\vec a\;\vec c] = [\vec a\;\vec c\;\vec b] = [\vec c\;\vec b\;\vec a] = -[\vec a\;\vec b\;\vec c]` with "swap: flip".
- **Beat d:** Three stacked results: `\vec a\cdot(\vec b\times\vec c) = (\vec a\times\vec b)\cdot\vec c`, `[\hat i\;\hat j\;\hat k] = \hat i\cdot(\hat j\times\hat k) = \hat i\cdot\hat i = 1` with "right-handed", and `[\vec a\;\vec a\;\vec b] = 0` with "flat box".

---

## Scene 4 — Coplanarity (Lesson 5.3)

**Narration:**

- **Beat a:** Tilt vector A down into the base and the box goes flat. Now turn that around. Zero volume means a flat box, and a flat box means all three vectors lie in one plane.
- **Beat b:** So three vectors are coplanar exactly when their triple product is zero. For four points A, B, C, D, test the three edges from A.
- **Beat c:** Example. Which lambda makes two, negative one, one, and one, two, negative three, and three, lambda, five, coplanar? Set the determinant to zero. It simplifies to twenty eight plus seven lambda, so lambda is negative four.
- **Beat d:** A trap. Coplanar does not mean parallel. One, two, three, and two, three, four, and three, four, five, have triple product zero, yet no two of them are parallel. The third is twice the second, minus the first.

**Visuals:**

- **Beat a:** The running box at 45° with a V readout; tilt animates to 0 and the box collapses into the base plane; `V = 0` flashes in ACCENT with "flat box".
- **Beat b:** Definition card: `\vec a, \vec b, \vec c \text{ coplanar} \iff [\vec a\;\vec b\;\vec c] = 0` and `A, B, C, D \text{ coplanar} \iff [\overrightarrow{AB}\;\overrightarrow{AC}\;\overrightarrow{AD}] = 0`.
- **Beat c:** `\begin{vmatrix}2&-1&1\\1&2&-3\\3&\lambda&5\end{vmatrix} = 0`, then `2(10+3\lambda) + 14 + (\lambda-6) = 0`, then `28 + 7\lambda = 0 \Rightarrow \lambda = -4` boxed.
- **Beat d:** Left: a tilted plane (parallelogram) with three arrows lying in it, pointing in three different directions. Right: `\begin{vmatrix}1&2&3\\2&3&4\\3&4&5\end{vmatrix} = 0`, "no two parallel", `(3,4,5) = 2(2,3,4) - (1,2,3)`.

---

## Scene 5 — Choosing the right product (Lesson 5.4)

**Narration:**

- **Beat a:** You now own four tools. Length needs the magnitude. Angles, perpendicular tests, projections and work need the dot product. Areas, normals, parallel tests and torque need the cross product. Volume and coplanarity need the triple product.
- **Beat b:** Real problems chain them. The distance from a point P to a line is the height of a parallelogram built on A P and a unit vector along the line. Its base is one, so its area is its height: the length of A P, cross D hat.
- **Beat c:** The same idea gives the shortest distance between skew lines: a triple product, which is a volume, divided by a cross product, which is an area. Volume over area is height.

**Visuals:**

- **Beat a:** A four-row decision table appears row by row: tool name in its colour on the left (Magnitude INK, Dot SECONDARY, Cross GREEN, Triple PURPLE), what it answers on the right.
- **Beat b:** 2D diagram: a line through A in direction d, a unit arrow `\hat d` from A, point P above, arrow `\overrightarrow{AP}`; the parallelogram on `\overrightarrow{AP}` and `\hat d` fills in; the ACCENT dashed perpendicular from P to the line is labelled "distance". Formula `\text{dist} = |\overrightarrow{AP}\times\hat d| = \dfrac{|\overrightarrow{AP}\times\vec d|}{|\vec d|}`.
- **Beat c:** Formula `d = \dfrac{|[\vec b_2-\vec b_1\;\;\vec d_1\;\;\vec d_2]|}{|\vec d_1\times\vec d_2|}` with labels "volume" over the numerator and "area" under the denominator, then "= height".

---

## Scene 6 — Vector geometry workshop (Lesson 5.5)

**Narration:**

- **Beat a:** Vectors turn classic proofs into a few lines. In a triangle with sides A and B from one corner, the third side is A minus B. Expand its length squared, and the middle term, minus two A dot B, becomes minus two A B cosine C. That is the cosine rule.
- **Beat b:** In a parallelogram, the diagonals are A plus B and A minus B. Their dot product is the length of A squared, minus the length of B squared. In a rhombus the sides are equal, so it is zero, and the diagonals are perpendicular.
- **Beat c:** Last, A hat plus B hat always bisects the angle between A and B, because the hats make both lengths one, so their parallelogram is a rhombus. For A equals three, four, and B equals two, zero, A hat plus B hat points along two, one, at exactly half the angle. The plain sum, A plus B, misses.

**Visuals:**

- **Beat a:** Left: triangle with C at the corner, red arrow a to A, teal arrow b to B, amber arrow a − b from B to A. Right: `|\vec a-\vec b|^2 = (\vec a-\vec b)\cdot(\vec a-\vec b)`, `= |\vec a|^2 - 2\,\vec a\cdot\vec b + |\vec b|^2`, `c^2 = a^2 + b^2 - 2ab\cos C` boxed.
- **Beat b:** Left: rhombus with sides a = (3, 4), b = (5, 0), diagonals a + b and a − b, and a right-angle mark where they cross. Right: `(\vec a+\vec b)\cdot(\vec a-\vec b) = |\vec a|^2 - |\vec b|^2` then `= 0 \text{ when } |\vec a| = |\vec b|`.
- **Beat c:** Left: faint direction rays "along a = (3, 4)" and "along b = (2, 0)" (rays, not arrows, so no length is implied), the unit vectors `\hat a`, `\hat b` drawn bold at a common enlarged scale, their rhombus, and the ACCENT sum `\hat a + \hat b` with a dashed ray along (2, 1). Angle arcs labelled 53.1° (a) and 26.6° (bisector). Then a dashed grey ray along `\vec a + \vec b = (5,4)` with a red cross beside its label. Right: `|\hat a| = |\hat b| = 1 \Rightarrow \text{rhombus}`, `\hat a + \hat b = (1.6,\,0.8) \parallel (2,1)`, `\vec a + \vec b = (5,4):\ 38.7^\circ \ne 26.6^\circ`.

---

## Scene 7 — Recap (Lesson 5.6 Mastery)

**Narration:**

- **Beat a:** To recap. The triple product is base area times height, a signed volume. As a determinant, cyclic shifts keep it and swaps flip its sign.
- **Beat b:** Zero volume means coplanar, and coplanar does not mean parallel. Choose your product by what the question asks.
- **Beat c:** Now try the chapter five mastery quiz. It mixes the whole course, from adding vectors to triple products, so it is the best check that the toolkit is yours.

**Visuals:**

- **Beats a–b:** Four recap cards in a 2×2 grid (`RoundedRectangle(width=6.3, height=2.6)`): (1) `[\vec a\;\vec b\;\vec c] = \vec a\cdot(\vec b\times\vec c)` and "base area × height"; (2) "cyclic: keep, swap: flip"; (3) `[\vec a\;\vec b\;\vec c] = 0 \iff \text{coplanar}`; (4) "length · dot · cross · triple".
- **Beat c:** Cards fade out; `Text("Next: Chapter 5 Mastery")` fades in.

---

**Lesson coverage map:** 5.1 → Scenes 1–2 · 5.2 → Scene 3 · 5.3 → Scene 4 · 5.4 → Scene 5 · 5.5 → Scene 6 · 5.6 Mastery → Scene 7.

**Math checks:** b × c = (4,0,0) × (1,3,0) = (0,0,12); a = 5(0, cos t, sin t) gives a · (b × c) = 60 sin t (60 at 90°, 30 at 30°, 0 at 0°). det[(1,2,3),(0,1,4),(5,6,0)] = −24 + 40 − 15 = 1. λ example: 2(10 + 3λ) + 14 + (λ − 6) = 28 + 7λ, so λ = −4. det[(1,2,3),(2,3,4),(3,4,5)] = −1 + 4 − 3 = 0 and 2(2,3,4) − (1,2,3) = (3,4,5). Rhombus (3,4), (5,0): (8,4) · (−2,4) = 0. Bisector: â + b̂ = (1.6, 0.8); atan(4/3) = 53.13°, atan(1/2) = 26.57°, atan(4/5) = 38.66°.

---

## Render QA log

- Round 1 (480p draft, 308.8 s): the "b × c" and c labels sat on box edges, the box was small, the normal arrow started on the tip of c, and in the bisector diagram b-hat was drawn longer than b. Fixed: box unit 0.55 → 0.68, the normal now starts at base point (3.4, 0.9, 0), and background plates go behind the edge, height and cycle labels.
- Round 2 (720p, 310.0 s): at one shared scale the bisector diagram was too small, and the a-hat + b-hat label crowded the 26.6° label. Fixed: a, b and a + b are drawn as direction rays, the unit vectors at 2.2× scale, and the labels are repositioned.
- Round 3 (720p, 310.0 s): contact sheet and spot frames are clean. The one blank sheet frame falls on a scene-to-scene fade (about 109 s).
