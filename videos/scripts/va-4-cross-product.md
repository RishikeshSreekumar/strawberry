# The Cross Product — Explainer Script

- **Course:** Vector Algebra
- **Chapter:** Chapter 4 · The Cross Product (id: `va-4-cross-product`)
- **Scene file / class:** `videos/scenes/va-4-cross-product.py` / `VectorsCh4Video`
- **Target runtime:** about 5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm, plus animation holds)

**Learning goal.** The learner sees why a second product is needed: the spanner turns a bolt that moves along an axis perpendicular to both the spanner and the push. They see that two vectors span a parallelogram. The cross product's length is the parallelogram's area, $|\vec a||\vec b|\sin\theta$, and its direction is the parallelogram's normal, chosen by the right-hand rule. They learn the properties: anticommutativity, $\vec a\times\vec a=\vec 0$, the parallel test, the $\hat i\to\hat j\to\hat k$ cycle, and non-associativity. They learn the determinant form, including the minus sign on the middle term, and how to check a result by dotting. The video then covers areas of parallelograms and triangles (from sides, vertices and diagonals), collinearity, the two unit normals, $\sin\theta$ from the cross product, Lagrange's identity, and torque $\vec\tau=\vec r\times\vec F$.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py` (`BG #FDF8F4`, ink `INK`). Colour roles: vector $\vec a$ and position $\vec r$ = strawberry RED (`PRIMARY`); vector $\vec b$ and force $\vec F$ = BLUE (`#2B6CB0`); the cross product / normal / torque = GREEN; parallelogram area = AMBER (`ACCENT`) fill at low opacity; highlights = GOLD (`#D19A00`); warnings = RED text. 3D pictures use a fixed oblique projection of a right-handed frame drawn in 2D (x to the right, y receding up-right with `EY = (0.55, 0.38)`, z straight up). That way nothing depends on a 3D camera, and "east, north, up" map to x, y, z. Each lesson scene has a small muted header in the top-left corner (`"4.x · Title"`). Frames are cleared with `FadeOut` between scenes.

**TTS note:** Samantha reads a lone letter "a" as the article, so the narration always says "vector a" or "length a" (or uses the phrase "a cross b" only where "cross" follows at once and the sense is clear). Groupings are spoken with "the quantity". Coordinates are read with commas ("one, one, two"). Square roots are read as "root sixty one".

---

## Title card

**Narration:** Chapter four. The cross product.

**Visuals:** `title_card("Vector Algebra", "Chapter 4 · The Cross Product")`.

---

## Scene 1 — Hook: the spanner (Lesson 4.1)

**Narration:**

- **Beat a:** A spanner on a bolt. The spanner points east, and you push its free end north.
- **Beat b:** The bolt turns, and it moves. But not east, and not north. It rises straight up, along an axis perpendicular to both the spanner and your push.
- **Beat c:** The dot product cannot describe this. It turns two vectors into a number, and a number has no direction. We need a product of two vectors that gives a third direction. That is the cross product, written vector a cross vector b.

**Visuals:**

- **Beat a:** Projected dashed x, y, z axes on the left. The bolt is a squashed hexagon at the origin. The spanner is a thick grey bar along +x, labelled "spanner (east)". A BLUE push arrow grows from the spanner's tip along +y, labelled "push (north)".
- **Beat b:** An amber curved arrow circles the bolt anticlockwise in the floor plane, and the nut rotates by 60°. A GREEN arrow grows straight up the z axis ("bolt moves"), with a right-angle mark between it and the spanner.
- **Beat c:** On the right, `\vec a\cdot\vec b = \text{a number}` is written, then struck through with a red line and captioned "no direction". Below it, a large GREEN `\vec a\times\vec b` appears, captioned "a third direction".

*Direction note:* east × north = up (anticlockwise from above), so a right-handed bolt comes **up** (loosens). The video uses "rises" to match the right-hand rule in 4.1.

---

## Scene 2 — Area and a missing direction (Lesson 4.1)

**Narration:**

- **Beat a:** What should this product depend on? Two vectors from a common tail span a parallelogram. Its base is the length of vector a, and its height is the length of vector b times sine theta. So its area is length a, times length b, times sine theta.
- **Beat b:** Here is the plan. The length of the new product is that area. Its direction is the one direction the parallelogram does not contain: straight out of its face.
- **Beat c:** Now in space. Vector a lies along the x axis, vector b lies in the floor, and the cross product stands straight up out of the parallelogram.
- **Beat d:** Swing vector b around. The arrow grows as the parallelogram opens, and is longest at ninety degrees. It vanishes when b lines up with a, and flips downward once b crosses to the other side.
- **Beat e:** Which way is up? Use the right-hand rule. Fingers along vector a, curl them toward vector b through the smaller angle, and your thumb gives the direction. Seen from the tip of the arrow, the turn from a to b is anticlockwise.
- **Beat f:** And notice what the arrow never does: it never lies in the plane of a and b. Capturing the direction the inputs do not supply is the whole point.

**Visuals:**

- **Beat a:** A flat 2D picture: RED $\vec a$ along the bottom, BLUE $\vec b$ at 55°, a GOLD θ arc, an AMBER parallelogram, a dashed height labelled `|\vec b|\sin\theta`. On the right: `\text{Area} = |\vec a|\,|\vec b|\sin\theta`.
- **Beat b:** Two lines below the formula: "length = area of the parallelogram" (amber) and "direction = straight out of its face" (green).
- **Beat c:** Clear the frame and switch to the projected 3D frame: $\vec a = 3\hat i$ fixed, $\vec b = 2.2(\cos\varphi, \sin\varphi, 0)$ driven by a `ValueTracker`, an `always_redraw` parallelogram, and a GREEN normal arrow equal to $0.45(\vec a\times\vec b)$. Top-right readout: `θ = …°   |a × b| = …`.
- **Beat d:** φ sweeps 60° → 90° (longest) → 180° (the arrow shrinks to a dot) → 270° (the arrow points down) → back to 60°.
- **Beat e:** A card in the bottom-right corner: "Right-hand rule / fingers along a, curl toward b: / thumb gives a × b". A GOLD curl arrow sweeps from $\vec a$ to $\vec b$ in the floor.
- **Beat f:** Red text "It never lies in the plane of a and b." sits above the card. The normal arrow flashes (`Indicate`).

---

## Scene 3 — Definition and properties (Lesson 4.2)

**Narration:**

- **Beat a:** So here is the definition. Vector a cross vector b equals length a, times length b, times sine theta, times n hat, the unit normal chosen by the right-hand rule.
- **Beat b:** Swap the order and the curl reverses, so b cross a is negative a cross b. Order matters.
- **Beat c:** A vector crossed with itself spans no area, so it gives the zero vector. And two nonzero vectors are parallel exactly when their cross product is zero.
- **Beat d:** For the unit vectors, follow the cycle i, j, k. Going forward, i cross j is k, j cross k is i, and k cross i is j.
- **Beat e:** Going backward against the cycle gives a minus sign: j cross i is negative k.
- **Beat f:** One more trap. The cross product is not associative. i cross the quantity i cross j is i cross k, which is negative j.
- **Beat g:** But the quantity i cross i, then cross j, is zero cross j, which is zero. Brackets matter.

**Visuals:**

- **Beats a–c:** `\vec a\times\vec b = |\vec a|\,|\vec b|\sin\theta\;\hat n` large at the top, with $\hat n$ in GREEN and circumscribed. Below it, written one at a time: `\vec b\times\vec a = -\vec a\times\vec b`, `\vec a\times\vec a = \vec 0`, `\vec a\parallel\vec b \iff \vec a\times\vec b = \vec 0`.
- **Beats d–e:** On the left, three circles $\hat i, \hat j, \hat k$ form a triangle, joined by GREEN curved arrows running clockwise ($\hat i\to\hat j\to\hat k\to\hat i$). On the right, the three forward products appear, then the red `\hat j\times\hat i = -\hat k`.
- **Beats f–g:** Two computations stacked: `\hat i\times(\hat i\times\hat j) = \hat i\times\hat k = -\hat j` and `(\hat i\times\hat i)\times\hat j = \vec 0\times\hat j = \vec 0`, written in parts. Then red text: "not equal: the cross product is not associative".

---

## Scene 4 — Computing in components (Lesson 4.3)

**Narration:**

- **Beat a:** To compute in components, distribute over i, j and k, and use the cycle. The nine terms collapse into a pattern that is easiest to remember as a three by three determinant.
- **Beat b:** Expand along the top row. The i part is a two b three minus a three b two. The k part is a one b two minus a two b one. And the middle j part carries a minus sign. Forgetting it is the most common mistake.
- **Beat c:** Try vector a equals two i plus three j minus k, and vector b equals i minus j plus two k. The i part is six minus one, five. The j part is minus the quantity four plus one, so negative five. The k part is negative two minus three, negative five. So the cross product is five i minus five j minus five k.
- **Beat d:** Always check. Dot the answer with vector a: ten minus fifteen plus five is zero. Dot it with vector b: five plus five minus ten is zero. Perpendicular to both, as it must be.

**Visuals:**

- **Beats a–b:** The determinant `\begin{vmatrix}\hat i&\hat j&\hat k\\a_1&a_2&a_3\\b_1&b_2&b_3\end{vmatrix}`, then the expansion `(a_2b_3-a_3b_2)\hat i - (a_1b_3-a_3b_1)\hat j + (a_1b_2-a_2b_1)\hat k`, written i-term, k-term, then the j-term. The minus sign turns red and pulses. Caption: "the middle term has a minus sign".
- **Beat c:** The given vectors, RED and BLUE, along the top. Three step lines: `\hat i: (3)(2)-(-1)(-1)=5`, `\hat j: -[(2)(2)-(-1)(1)]=-5`, `\hat k: (2)(-1)-(3)(1)=-5`. Then a GREEN `\vec a\times\vec b = 5\hat i-5\hat j-5\hat k`.
- **Beat d:** `(5,-5,-5)\cdot\vec a = 10-15+5 = 0` and `(5,-5,-5)\cdot\vec b = 5+5-10 = 0`, with green text "perpendicular to both".

---

## Scene 5 — Areas (Lesson 4.4)

**Narration:**

- **Beat a:** The length of the cross product is an area. The parallelogram on a and b has area equal to the length of a cross b, and the triangle is half of it.
- **Beat b:** For a triangle with vertices A, B and C, take two sides from the same corner. With A at one, one, two, B at two, three, five, and C at one, five, five, A B is one, two, three, and A C is zero, four, three.
- **Beat c:** Their cross product is negative six, negative three, four. Its length is root sixty one, so the area of the triangle is root sixty one over two.
- **Beat d:** Given the diagonals of a parallelogram instead, the area is half the length of d one cross d two. Do not drop the half.
- **Beat e:** And three points are collinear exactly when the triangle they make has zero area.

**Visuals:**

- **Beat a:** A parallelogram on $\vec a, \vec b$. A dashed diagonal splits it, and the lower triangle fills darker. Right: `\text{parallelogram} = |\vec a\times\vec b|`, `\text{triangle} = \tfrac12|\vec a\times\vec b|`.
- **Beats b–c:** `A(1,1,2)  B(2,3,5)  C(1,5,5)`, then `\overrightarrow{AB}=(1,2,3),\ \overrightarrow{AC}=(0,4,3)`, `\overrightarrow{AB}\times\overrightarrow{AC}=(-6,-3,4)`, `|\cdot| = \sqrt{36+9+16}=\sqrt{61}`, and in GREEN `\text{Area}=\tfrac12\sqrt{61}`.
- **Beats d–e:** A parallelogram with both diagonals drawn as arrows $\vec d_1$ (RED) and $\vec d_2$ (BLUE). Right: `\text{Area} = \tfrac12|\vec d_1\times\vec d_2|`, red "do not drop the half", then `A,B,C \text{ collinear} \iff \overrightarrow{AB}\times\overrightarrow{AC}=\vec 0`.

---

## Scene 6 — Normals, sines and torque (Lesson 4.5)

**Narration:**

- **Beat a:** Divide the cross product by its length and you get a unit normal. But there are two of them, plus and minus. A line perpendicular to a plane points both ways.
- **Beat b:** Lengths also give angles. Sine theta is the length of the cross product, over length a times length b. Dot gives cosine, cross gives sine, and together they obey Lagrange's identity: the cross product's length squared, plus a dot b squared, equals length a squared times length b squared.
- **Beat c:** So if length a is two, length b is five, and a dot b is six, then the cross product's length squared is one hundred minus thirty six, which is sixty four. The length is eight.
- **Beat d:** Back to the spanner. Torque is r cross F. A spanner of zero point three metres along i, pushed with forty newtons along j, gives twelve k newton metres. That is a turn about the vertical axis, anticlockwise seen from above.

**Visuals:**

- **Beat a:** A shaded plane in the projected frame. A GREEN $+\hat n$ arrow grows up, then a $-\hat n$ arrow grows down. Right: `\hat n = \pm\frac{\vec a\times\vec b}{|\vec a\times\vec b|}`, with red "two answers".
- **Beat b:** `\sin\theta = \frac{|\vec a\times\vec b|}{|\vec a||\vec b|}`, then `|\vec a\times\vec b|^2+(\vec a\cdot\vec b)^2=|\vec a|^2|\vec b|^2`, labelled "Lagrange's identity".
- **Beat c:** Below: `|\vec a|=2,\ |\vec b|=5,\ \vec a\cdot\vec b=6`, then `|\vec a\times\vec b|^2 = 4\cdot25-36=64`, then GREEN `|\vec a\times\vec b| = 8`.
- **Beat d:** The Scene 1 spanner frame returns: RED `\vec r = 0.3\hat i` m, BLUE `\vec F = 40\hat j` N, GREEN $\vec\tau$ up the z axis. Right: `\vec\tau=\vec r\times\vec F = 0.3\cdot40(\hat i\times\hat j) = 12\hat k` N m.

---

## Scene 7 — Recap and next chapter (Lesson 4.6, Mastery)

**Narration:**

- **Beat a:** To recap. The cross product is a vector. Its length is the area of the parallelogram, and its direction is the normal given by the right-hand rule. Swapping the order flips the sign, and parallel vectors give zero.
- **Beat b:** Compute with the determinant, mind the minus on the j term, and check by dotting. Then try the chapter four mastery quiz. Next, chapter five combines both products into a volume.

**Visuals:** Four recap cards in a 2×2 grid (`RoundedRectangle(6.0, 2.3)`), each with a formula headline and a muted caption:
1. `|\vec a\times\vec b| = |\vec a||\vec b|\sin\theta`: "length = parallelogram area"
2. `\vec b\times\vec a = -\vec a\times\vec b`: "right-hand rule; parallel gives zero"
3. the ijk determinant: "minus on the j term; check by dotting"
4. `\vec\tau = \vec r\times\vec F`: "normals come in pairs; triangle = half"

Cards 1–2 appear in Beat a and cards 3–4 in Beat b, then the footer reads "Next: Chapter 5 · The Scalar Triple Product and Vector Geometry".

---

**Lesson coverage map:** 4.1 → Scenes 1–2 · 4.2 → Scene 3 · 4.3 → Scene 4 · 4.4 → Scene 5 · 4.5 → Scene 6 · 4.6 Mastery → Scene 7.

**Worked examples reused from the lesson content (all numbers verified):** 4.3 WE1 ($5\hat i-5\hat j-5\hat k$), 4.4 WE2 (area $\tfrac12\sqrt{61}$), 4.5 WE2 (Lagrange, 8), 4.5 WE3 (torque $12\hat k$ N m).
