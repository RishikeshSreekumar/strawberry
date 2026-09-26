# Matrices: Grids That Move the Plane — Explainer Script

- **Course:** Matrices
- **Chapter:** Chapter 0 · Matrices: Grids That Move the Plane (id: `mx-0-matrices-grids-that-move-the-plane`)
- **Scene class:** `MxCh0Video` in `videos/scenes/mx-0-matrices-grids-that-move-the-plane.py`
- **Target runtime:** about 5.5 minutes (roughly 950 spoken words at Samantha's default ~175 wpm; rendered 5:38)

**Learning goal.** The learner sees a matrix first as a labelled table with the labels stripped off. They read its order as rows by columns and address an entry as a sub i j, row first. They build a whole matrix from a rule a sub i j = f(i, j), and they count the possible orders of an N-entry matrix as the divisors of N (a prime still gives two orders). They treat equality, addition and scalar multiples as entry-by-entry operations that need identical orders. Then comes the central idea: a 2 × 2 matrix moves the whole plane, and its columns are where i hat and j hat land. So Av = x·col₁ + y·col₂, which gives the row formula. Finally they meet the gallery (stretch, rotation, reflection, shear, projection), derive the rotation matrix from the unit circle, and see why a shift is not a matrix. Named traps: "a₂₃ is column 2, row 3", "a prime number of entries means no matrix", "add a 2 × 3 and a 3 × 2 by lining them up", "matrix times vector is entry by entry" and "a shift is a matrix transformation".

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colour roles: i hat and column 1 = GREEN, j hat and column 2 = PRIMARY (red), matching the lessons' `matrix-transform-grid`. Results (Av, sums) = PURPLE, the moving grid = SECONDARY (teal), the unit square = ACCENT (amber), highlights = gold `#D19A00`, warnings = PRIMARY with a cross or a red ring. Moving-plane pictures sit on the left (origin at (−3.4, −0.5), 0.6 units per step) with a faint static reference grid, and the maths sits in opaque white cards on the right. Grid motion is drawn by redrawing the lines of the image of a 4-step grid under M(t) = (1 − t)I + tA, and rotation interpolates the angle. Headers sit at the top left in MUTED ("0.4 · A matrix is a machine") on an opaque strip so grid lines never cross them. The frame is cleared with `FadeOut` between scenes. The narration is written for text-to-speech: it spells out symbols ("a sub two three", "i hat", "minus sine theta").

The numbers match the lessons: the shop sales matrix S (0.1), a sub i j = |i − j| (0.2), the equality example with a = 1, b = 2, c = 3, d = 4, and the 2 × 3 sum and 2A (0.3). Lesson 0.4 supplies A = (2 −1; 1 1) for the grid, Av = (5, −1) for A = (2 −1; 1 3) and v = (2, −1), and (1 2; 3 4)(5, 6) = (17, 39).

---

## Scene 0 — Title card

**Narration:** Chapter zero. Matrices: grids that move the plane.

**Visuals:** kicker "Matrices", title "Chapter 0 · Matrices: Grids That Move the Plane".

---

## Scene 1 — Hook: what a matrix is (Lesson 0.1)

**Narration:**

- **Beat a:** A stationery shop records its sales in a grid. One row for each item: pens, notebooks and erasers. One column for each day, Monday to Thursday.
- **Beat b:** Once everyone agrees what the rows and columns mean, the labels can go. Strip them off, put brackets around the numbers, and you have a matrix.
- **Beat c:** This one has three rows and four columns, so its order is three by four. Rows always come first.
- **Beat d:** Each entry has an address. a sub two three is the entry in row two, column three. Here that is six, the notebooks sold on Wednesday. Read it as column two, row three and you land on fourteen, the wrong number. Row first, then column, every time.

**Visuals:**

- **Beat a:** A ruled table appears with day headers (Mon to Thu) and item labels. The twelve numbers fade in one by one.
- **Beat b:** The labels and rules fade away. The numbers slide into a `Matrix` with round brackets, labelled "S =".
- **Beat c:** A left brace reads "3 rows" and a top brace reads "4 columns". A card shows "order 3 × 4, rows first, then columns".
- **Beat d:** A card shows a₂₃ and "row 2, column 3". Row 2 gets a gold box and column 3 a green box, and the 6 where they cross pulses, with "a₂₃ = 6" added to the card. A red ring circles 14 (row 3, column 2), with the caption "column 2, row 3 gives 14: wrong".

---

## Scene 2 — Building matrices from rules (Lesson 0.2)

**Narration:**

- **Beat a:** Sometimes you get a rule instead of numbers. Say a sub i j equals the absolute value of i minus j, for a three by three matrix. Every entry has an address, and the rule turns the address into a number.
- **Beat b:** Fill it one address at a time. On the main diagonal, i equals j, so every diagonal entry is zero. One step off the diagonal gives one, and the far corners give two. The matrix is a mirror image of itself across the diagonal, because i minus j and j minus i have the same size.
- **Beat c:** Now count shapes. A matrix with twelve entries could be one by twelve, two by six, three by four, four by three, six by two, or twelve by one. Six orders, one for each divisor of twelve.
- **Beat d:** And a prime number of entries, like thirteen? Still two orders: one by thirteen, a single row, or thirteen by one, a single column. Not zero.

**Visuals:**

- **Beat a:** A rule card (`a_{ij} = |i - j|`, "order 3 × 3") appears. A 3 × 3 matrix of addresses a₁₁ … a₃₃ is written.
- **Beat b:** The addresses turn into numbers in three waves: the diagonal zeros (purple), the four ones (green), the two corner twos (red). A gold dashed line runs down the diagonal, with a card reading "|i − j| = |j − i|, a mirror image across the diagonal".
- **Beat c:** Six dot grids appear in turn, bottom-aligned (1×12, 2×6, 3×4, 4×3, 6×2, 12×1), each labelled, under the question "A matrix with 12 entries: which orders?". The caption reads "6 orders = number of divisors of 12".
- **Beat d:** Two teal dot grids appear, a 1×13 row ("one row") and a 13×1 column ("one column"), under the heading "13 entries (a prime): still 2 orders, not 0".

---

## Scene 3 — Equality, addition, scalar multiples (Lesson 0.3)

**Narration:**

- **Beat a:** Two matrices are equal only when they have the same order and every matching entry is equal. So one equation between two by two matrices is really four ordinary equations at once.
- **Beat b:** Addition works the same way, position by position. Add the entry at each address in A to the entry at the same address in B, all the way across the grid.
- **Beat c:** Multiplying by a number, a scalar, scales every entry. Two A doubles all six numbers.
- **Beat d:** Which is why a two by three and a three by two cannot be added. Line them up and the first has a column three the second does not. Some entries have no partner, so the sum is simply not defined.

**Visuals:**

- **Beat a:** The equation (2a+b, a−2b; 5c−d, 4c+3d) = (4, −3; 11, 24) is written, then the four equations in a 2 × 2 layout, then "a = 1, b = 2, c = 3, d = 4" in purple.
- **Beat b:** A = (1 2 −3; 0 4 5) + B = (3 −1 2; 1 −2 0) = … The (1,3) entries of A and B are boxed in gold. Each pair of entries flows into its place in the sum (4 1 −1; 1 2 5), and the −1 pulses.
- **Beat c:** Below: 2A = (2 4 −6; 0 8 10), with the caption "a scalar multiplies every entry".
- **Beat d:** A red 2×3 dot grid and a teal 3×2 dot grid appear side by side. The teal grid slides onto the red one (top-left aligned), and the four unpaired dots get red rings. A red-bordered card reads "2×3 + 3×2, not defined, some entries have no partner".

---

## Scene 4 — A matrix is a machine (Lesson 0.4)

**Narration:**

- **Beat a:** So far a matrix has been a storage box. Here is the idea the whole course runs on. A two by two matrix is an instruction for moving the entire plane. Start with two arrows: i hat, one step right, and j hat, one step up.
- **Beat b:** Take the matrix two, minus one, one, one. Its first column is two, one. Its second column is minus one, one. Watch the plane move. i hat lands exactly on the first column, and j hat lands on the second.
- **Beat c:** Notice what stays true. The origin does not move. Grid lines stay straight, and parallel lines stay parallel and evenly spaced. Moves like this are called linear, and they are exactly the ones a matrix can describe.
- **Beat d:** Now any vector x, y is x steps of i hat plus y steps of j hat. After the move, it is x steps of the first column plus y steps of the second. Add those up and you get a x plus b y on top, and c x plus d y below.
- **Beat e:** Try it. With A equal to two, minus one, one, three, send the vector two, minus one. Two copies of column one reach four, two. Minus one copy of column two adds one, minus three. The answer is five, minus one.
- **Beat f:** So matrix times vector is not entry by entry. One two, three four, times five six, is five copies of the first column plus six copies of the second: seventeen, thirty nine. Not five, twenty four.

**Visuals:**

- **Beat a:** The reference grid is drawn. A card reads "a 2 × 2 matrix is an instruction for moving the whole plane". The teal live grid appears with a green î arrow and a red ĵ arrow, both labelled.
- **Beat b:** A card shows A = (2 −1; 1 1), with column 1 boxed green and column 2 boxed red. The grid morphs from the identity to A, the arrows ride along, and "î → (2, 1)" and "ĵ → (−1, 1)" appear.
- **Beat c:** A gold dot marks the origin. The grid morphs back to the identity and then forward to A again. A card lists "the origin stays put / grid lines stay straight / parallel, evenly spaced / = a linear transformation".
- **Beat d:** A card builds three lines: (x, y) = x î + y ĵ, then A(x, y) = x(a, c) + y(b, d), then the purple row formula (a b; c d)(x, y) = (ax + by, cx + dy).
- **Beat e:** The live grid fades, leaving the reference grid. Two green arrows go tip to tail, (0,0) → (2,1) → (4,2). A red arrow runs (4,2) → (5,−1). A purple arrow Av runs from the origin to (5,−1). The card shows the matching steps.
- **Beat f:** An opaque panel shows (1 2; 3 4)(5, 6) = 5(1, 3) + 6(2, 4) = (17, 39). Below it, (5, 24) is crossed out in red, captioned "entry by entry: wrong".

---

## Scene 5 — A gallery of transformations (Lesson 0.5)

**Narration:**

- **Beat a:** Because the columns decide everything, writing the matrix for a motion takes two questions. Where does i hat go? Where does j hat go?
- **Beat b:** Stretch sideways by two. i hat goes to two, zero, and j hat stays put. The matrix is two, zero, zero, one.
- **Beat c:** Turn a quarter turn anticlockwise. i hat goes up to zero, one, and j hat swings left to minus one, zero. Those are the columns.
- **Beat d:** Reflect in the x axis. i hat stays, and j hat flips down to zero, minus one.
- **Beat e:** A shear keeps the x axis fixed and slides higher rows further right. i hat stays, and j hat leans over to one, one.
- **Beat f:** Projection onto the x axis drops every point straight down. j hat is crushed to zero, and the whole plane collapses onto a line.
- **Beat g:** For a general rotation by theta, the unit circle does the work. i hat lands at cos theta, sin theta. j hat, starting a quarter turn ahead, lands at minus sine theta, cos theta. Put them in as columns, and the minus sign sits top right.
- **Beat h:** One motion is missing from the gallery. Sliding the plane two units right moves the origin. But every matrix sends zero to zero. So a shift is not a matrix transformation.

**Visuals:**

- **Beat a:** A live grid, an amber unit square and the î and ĵ arrows appear. A card reads "Where does î go? / Where does ĵ go? / Those are the columns."
- **Beats b–f:** For each preset a card shows its name and matrix: (2 0; 0 1), (0 −1; 1 0), (1 0; 0 −1), (1 1; 0 1), (1 0; 0 0). The grid, the square and the arrows morph from the identity to the preset, and after each beat they morph back. The rotation preset turns through the angle rather than interpolating the entries. For the projection, the grid collapses onto the x-axis and ĵ shrinks to a dot.
- **Beat g:** A unit circle of radius 2.2 appears. The î (green) and ĵ (red) arrows turn together through θ ≈ 37°, with a gold θ arc. A card builds î → (cos θ, sin θ), ĵ → (−sin θ, cos θ) and R_θ = (cos θ −sin θ; sin θ cos θ), with the note "the minus sign sits top right".
- **Beat h:** A purple copy of the grid and a gold origin dot slide 2 units right, and the dot is labelled (2, 0). A card reads "Shift right by 2 / 0 → (2, 0) / A0 = 0·col₁ + 0·col₂ = 0 / not a matrix transformation" (the last line in red).

---

## Scene 6 — Recap

**Narration:**

- Chapter zero in five lines. Order is rows by columns, and a sub i j sits in row i, column j.
- Rules build whole matrices, and a matrix with N entries has one order for each divisor of N.
- Equality, addition and subtraction work entry by entry, and need identical orders. A scalar multiple scales every entry.
- A times v is x copies of column one plus y copies of column two, because the columns are where i hat and j hat land.
- And scalings, rotations, reflections, shears and projections are all matrices, while shifts are not.
- Next, in chapter one: what happens when you make one move, and then another.

**Visuals:** The heading "Chapter 0 in five lines" in PRIMARY. Five `Tex` lines (each kept on one line with `\mbox`) fade in one per sentence. At the bottom, in teal: "Next · Chapter 1: one move, then another = matrix multiplication".
