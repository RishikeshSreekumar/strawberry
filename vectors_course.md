# Course: Vector Algebra, Arrows That Carry Direction

**Slug:** `vector-algebra` (a course alongside `calculus` and `trigonometry`; same block schema, same seed-script pattern.)

**Purpose:** Build the intuition that a vector is *an arrow you can slide around*, and that every vector operation is a geometric act first (placing arrows tip-to-tail, stretching, casting a shadow, sweeping out an area, filling a box) and a formula second. Then build fluency in the component algebra that CBSE Class 12 / JEE expects: position vectors, section formula, direction cosines, dot, cross and scalar triple products, and their uses in geometry and physics.

**End state:** Given any vector question, the student can reconstruct the answer from:

```text
arrow (magnitude + direction) → components (i, j, k) → three products:
   dot   = "how much of a lies along b"      (a scalar: shadow × length)
   cross = "how much a and b sweep out"      (a vector: area, normal)
   [a b c] = "how much box a, b, c fill"     (a scalar: signed volume)
```

They should never need a memorised list of "if a·b = 0 then..." facts. They should be able to say *why* the dot product is a₁b₁ + a₂b₂ + a₃b₃ (law of cosines) and *why* i × j = k while j × i = −k (right-hand orientation).

**Three threads run through every chapter**
1. **Intuition + visualization:** every new object appears first as arrows that move (drag the tip, watch the sum, the shadow, the parallelogram, the box) before it appears as a formula.
2. **Derivation drill:** results are derived from a small core (triangle law, components, law of cosines, right-hand rule), never stated cold. Each chapter's mastery lesson hides the formula sheet.
3. **Geometry pay-off:** every chapter ends by proving a classical geometry fact with vectors (diagonals bisect, medians meet at 2:1, angle in a semicircle, law of sines, coplanarity), so the algebra always earns its place.

---

## Chapter map

| Ch | Title | Core idea |
| -- | ----- | --------- |
| 0 | What a Vector Is | Some quantities need a direction; arrows that add tip-to-tail |
| 1 | Vectors in Coordinates | Position vectors and components turn arrows into number triples |
| 2 | Dividing Lines and Proving Geometry | Section formula and linear combinations turn geometry into algebra |
| 3 | The Dot Product | Shadow × length: angle, perpendicularity, projection, work |
| 4 | The Cross Product | A vector perpendicular to both, whose length is the area they sweep |
| 5 | The Scalar Triple Product and Vector Geometry | Signed volume, coplanarity, and choosing the right product |

---

## Chapter 0: What a Vector Is

**Purpose:** motivate vectors as quantities where direction matters; establish that a vector is a *free* arrow defined only by magnitude and direction; master addition and scaling geometrically before any coordinates appear.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 0.1 | Scalars and Vectors | Some quantities are fully described by a number; others also need a direction | Hook: "walk 3 km, then 4 km; how far from home?" (anywhere from 1 to 7 km). Distance vs displacement, speed vs velocity, mass vs weight. Sorting table of physical quantities. Interactive: `vec-canvas-2d` (mode `add`) with two legs of a walk, drag the second leg, watch the straight-line distance change. Misconception killed: "3 + 4 is always 7 for any quantity" |
| 0.2 | Anatomy of an Arrow | Magnitude, direction, initial and terminal point; notation $\vec{a}$, $\overrightarrow{AB}$, $\lvert\vec a\rvert$ | Definition callouts. Free vectors: sliding an arrow without rotating or stretching does not change it. Interactive: `vec-canvas-2d` (mode `free`), drag the tail around, readouts of length and angle stay fixed. Misconception killed: "a vector lives at one particular place" |
| 0.3 | Types of Vectors | Zero, unit, co-initial, collinear/parallel, equal, negative (opposite) vectors | Table of types with a picture description each. Concept quizzes: equal vs parallel vs collinear (collinear allows opposite direction and different length). Misconceptions killed: "parallel vectors must point the same way" and "equal vectors must start at the same point" |
| 0.4 | Adding Arrows: Triangle and Parallelogram Laws | Place tip to tail; the sum joins the first tail to the last tip | Interactive: `vec-canvas-2d` (mode `add`, toggle parallelogram), both laws shown to give the same diagonal. Derive commutativity from the parallelogram and associativity from a polygon of three arrows. Polygon law: a closed loop sums to $\vec 0$. Worked example: resultant of two forces. Misconception killed: "$\lvert\vec a + \vec b\rvert = \lvert\vec a\rvert + \lvert\vec b\rvert$" (only when same direction) |
| 0.5 | Subtraction and Scalar Multiples | $\vec a - \vec b = \vec a + (-\vec b)$; $k\vec a$ stretches and flips | Interactive: `vec-canvas-2d` (mode `scale`) with a $k$ slider from -3 to 3 (flip through zero), then mode `subtract` showing $\vec a - \vec b$ as the arrow from tip of $\vec b$ to tip of $\vec a$. Distributive laws shown geometrically via similar triangles. Collinearity criterion: $\vec b = \lambda\vec a$. Misconception killed: "$\vec a - \vec b$ points from $\vec a$ to $\vec b$" |
| 0.6 | Chapter 0 Mastery | Can the student reason about arrows with no coordinates at all? | Mixed mastery quizzes: types of vectors, resultant magnitude bounds $\lvert\lvert a\rvert - \lvert b\rvert\rvert \le \lvert a+b\rvert \le \lvert a\rvert + \lvert b\rvert$, polygon law in a hexagon, expressing diagonals of a parallelogram in terms of its sides |

## Chapter 1: Vectors in Coordinates

**Purpose:** pin arrows to an origin and a grid so they become numbers: position vectors, $\hat i, \hat j, \hat k$ components, magnitude, unit vectors, direction cosines and ratios.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 1.1 | Position Vectors | Fix an origin; every point becomes an arrow from O; $\overrightarrow{AB} = \vec b - \vec a$ | Derivation from the triangle law ($\vec a + \overrightarrow{AB} = \vec b$). Interactive: `vec-canvas-2d` (mode `position`), drag A and B, see $\overrightarrow{AB}$ as "tip minus tail". Misconception killed: "$\overrightarrow{AB} = \vec a - \vec b$" (order: end minus start) |
| 1.2 | Components in the Plane | Every plane vector is $x\hat i + y\hat j$, uniquely | Resolving a vector: $x = r\cos\theta$, $y = r\sin\theta$ (link to trigonometry). Interactive: `right-triangle-explorer` reused to resolve a force into horizontal/vertical parts, then `vec-canvas-2d` (mode `components`) snapping to the grid. Adding and scaling component-wise, derived from the triangle law. Misconception killed: "components are the lengths, so they can't be negative" |
| 1.3 | Into Three Dimensions | Right-handed axes, $\hat i, \hat j, \hat k$, $\lvert\vec r\rvert = \sqrt{x^2+y^2+z^2}$ | Right-handed system explained with fingers. Magnitude as Pythagoras twice (floor diagonal, then up). Interactive: `vec-space-3d` (mode `components`), rotate the view, see the box whose diagonal is $\vec r$. Distance between two points as $\lvert\vec b - \vec a\rvert$. Misconception killed: "$\lvert\vec r\rvert = x + y + z$" |
| 1.4 | Unit Vectors and Component Algebra | $\hat a = \vec a/\lvert\vec a\rvert$; equality means all components equal | Normalising, vector of given magnitude along a direction, equality of vectors to solve for unknowns, collinearity as proportional components ($a_1/b_1 = a_2/b_2 = a_3/b_3$). Interactive: `unit-circle` reused to show every 2D unit vector is $(\cos\theta, \sin\theta)$. Misconception killed: "$\hat i + \hat j$ is a unit vector" |
| 1.5 | Direction Cosines and Direction Ratios | The angles a vector makes with the axes: $l = \cos\alpha$, $m = \cos\beta$, $n = \cos\gamma$ | Derive $l = x/r$ from the right triangle formed with each axis; hence $\hat r = l\hat i + m\hat j + n\hat k$ and $l^2+m^2+n^2 = 1$. Direction ratios as any multiple of $(l, m, n)$; converting ratios to cosines. Interactive: `vec-space-3d` (mode `direction-angles`). Misconceptions killed: "$\alpha + \beta + \gamma = 180°$" and "direction ratios are unique" |
| 1.6 | Chapter 1 Mastery | Arrow ↔ components ↔ magnitude ↔ direction, in any order | Mixed mastery: $\overrightarrow{AB}$ from points, magnitude, unit vector, vector of length 7 along a direction, direction cosines, checking whether three given numbers can be direction cosines, collinearity by ratios |

## Chapter 2: Dividing Lines and Proving Geometry

**Purpose:** use position vectors to locate points (section formula, midpoint, centroid) and to prove classical geometry results, introducing linear combinations along the way.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 2.1 | The Section Formula (Internal) | P divides AB in $m:n$ → $\vec p = \dfrac{n\vec a + m\vec b}{m+n}$ | Derivation: $\overrightarrow{AP} = \frac{m}{m+n}\overrightarrow{AB}$. Interactive: `vec-canvas-2d` (mode `section`), slide P along AB, ratio and weighted-average formula update. Midpoint as the case $m = n$. Misconception killed: "the formula is $\frac{m\vec a + n\vec b}{m+n}$" (weights cross over: the nearer point gets the bigger weight) |
| 2.2 | External Division | P outside AB with $AP:PB = m:n$ → $\vec p = \dfrac{m\vec b - n\vec a}{m-n}$ | Same slider extended past B (and before A), showing the ratio going negative. Why $m = n$ has no external point (parallel lines never meet). Worked examples finding the ratio in which a point divides a segment, and whether internally or externally |
| 2.3 | Centroid and Medians | Medians meet at $\frac{\vec a + \vec b + \vec c}{3}$, 2:1 from each vertex | Derivation: section formula on one median, then symmetry. Extension: centroid of a tetrahedron. Interactive: `vec-canvas-2d` (mode `triangle`) with draggable vertices and the three medians. Misconception killed: "the centroid divides each median 1:2 from the vertex" |
| 2.4 | Linear Combinations and Collinearity | Any plane vector is $x\vec a + y\vec b$ for non-collinear $\vec a, \vec b$; three points are collinear iff one position vector is a weighted average of the other two | Interactive: `vec-canvas-2d` (mode `combination`) with $x, y$ sliders reaching every point. Test for collinearity of A, B, C: $\overrightarrow{AB} = \lambda\overrightarrow{AC}$, equivalently $\alpha\vec a + \beta\vec b + \gamma\vec c = \vec 0$ with $\alpha+\beta+\gamma = 0$. Preview of coplanarity in 3D. Misconception killed: "two vectors can always build any vector" (not if they are collinear) |
| 2.5 | Proofs with Vectors | Choose an origin, write everything as position vectors, compute | Worked proofs in steps: diagonals of a parallelogram bisect each other; midpoint theorem; line joining midpoints of diagonals of a trapezium; the point dividing medians. Strategy callout: "put the origin at a vertex to kill a variable". Concept quizzes on which step of a proof is invalid |
| 2.6 | Chapter 2 Mastery | Locate, divide and prove | Mixed mastery: internal and external section, ratio from coordinates, fourth vertex of a parallelogram, centroid, collinearity of three points, one short proof reconstructed step by step |

## Chapter 3: The Dot Product

**Purpose:** the first product. Grow it from the idea of a shadow (projection) and from work in physics, prove the component formula from the law of cosines, and use it for angles, perpendicularity and projections.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 3.1 | Shadows and Work | $\vec a \cdot \vec b = \lvert\vec a\rvert\lvert\vec b\rvert\cos\theta$: length of one times the shadow of the other | Hook: pulling a sled with a rope at an angle, only the forward part does work. Interactive: `vec-canvas-2d` (mode `dot`), drag $\vec b$ around $\vec a$, the projection shadow and signed value update; sign changes at 90°. Misconception killed: "the dot product is a vector" |
| 3.2 | The Component Formula | $\vec a\cdot\vec b = a_1b_1 + a_2b_2 + a_3b_3$, derived | Derivation from the law of cosines on the triangle with sides $\vec a$, $\vec b$, $\vec a - \vec b$. Interactive: `triangle-solver` (mode `sas`) reused to show $c^2 = a^2 + b^2 - 2ab\cos C$. Then $\hat i\cdot\hat i = 1$, $\hat i\cdot\hat j = 0$ table as a check. Misconception killed: "$\vec a\cdot\vec b = (a_1b_1, a_2b_2, a_3b_3)$" |
| 3.3 | Angles and Perpendicularity | $\cos\theta = \dfrac{\vec a\cdot\vec b}{\lvert\vec a\rvert\lvert\vec b\rvert}$; $\vec a\perp\vec b \iff \vec a\cdot\vec b = 0$ | Angle between two vectors, finding $\lambda$ that makes two vectors perpendicular, sign of dot product ↔ acute/obtuse. Angle between the diagonals of a cube. Misconceptions killed: "$\vec a\cdot\vec b = 0$ means one of them is zero" and "the angle between vectors is measured head-to-tail" (it is tail-to-tail) |
| 3.4 | Algebra of the Dot Product | Commutative, distributive, $\vec a\cdot\vec a = \lvert\vec a\rvert^2$ | Expand $\lvert\vec a\pm\vec b\rvert^2$ and $(\vec a+\vec b)\cdot(\vec a-\vec b)$; rhombus diagonals are perpendicular; parallelogram law. Cauchy–Schwarz $\lvert\vec a\cdot\vec b\rvert\le\lvert\vec a\rvert\lvert\vec b\rvert$ and the triangle inequality derived. Misconception killed: "$\vec a\cdot\vec b = \vec a\cdot\vec c \Rightarrow \vec b = \vec c$" (no cancellation) |
| 3.5 | Projections and Components Along a Direction | Scalar projection $\vec a\cdot\hat b$, vector projection $(\vec a\cdot\hat b)\hat b$ | Splitting a vector into parts parallel and perpendicular to another. Work done by a constant force along a displacement; work by several forces. Interactive: `vec-canvas-2d` (mode `dot`, showing the perpendicular part too). Geometry pay-off: angle in a semicircle is 90°, and the altitudes of a triangle are concurrent. Misconception killed: "projection of $\vec a$ on $\vec b$ equals projection of $\vec b$ on $\vec a$" |
| 3.6 | Chapter 3 Mastery | Angle, perpendicularity, projection, work, from scratch | Mixed mastery: compute dot products, find angles, solve for perpendicularity, $\lvert\vec a+\vec b\rvert$ from given magnitudes and angle, projections, work, one identity proof ($\lvert\vec a+\vec b\rvert = \lvert\vec a-\vec b\rvert \iff \vec a\perp\vec b$) |

## Chapter 4: The Cross Product

**Purpose:** the second product. A vector that is perpendicular to both inputs, oriented by the right-hand rule, whose length is the area of the parallelogram they span.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 4.1 | Turning, Area and a Missing Direction | Two vectors span a parallelogram; its area and its facing direction together form a vector | Hook: a spanner turning a bolt, the bolt moves along the axis, perpendicular to both the spanner and the force (torque). Right-hand rule. Interactive: `vec-space-3d` (mode `cross`), swing $\vec b$ around $\vec a$, the normal arrow grows as the parallelogram opens and flips when $\vec b$ crosses $\vec a$. Misconception killed: "the cross product lies in the plane of $\vec a$ and $\vec b$" |
| 4.2 | Definition and Properties | $\vec a\times\vec b = \lvert\vec a\rvert\lvert\vec b\rvert\sin\theta\,\hat n$ | Anti-commutativity from the right-hand rule, $\vec a\times\vec a = \vec 0$, parallel ⇔ cross product zero, distributivity (stated with a picture argument). The $\hat i\to\hat j\to\hat k$ cycle: $\hat i\times\hat j = \hat k$, $\hat j\times\hat i = -\hat k$. Misconceptions killed: "$\vec a\times\vec b = \vec b\times\vec a$" and "the cross product is associative" (counterexample with $\hat i\times(\hat i\times\hat j)$) |
| 4.3 | Computing in Components | Expand with the $\hat i\hat j\hat k$ table → the 3×3 determinant | Derivation by distributing over components and using the cycle. The determinant as a bookkeeping device (cofactor expansion, signs of the middle term). Worked examples; checking the result by dotting with $\vec a$ and $\vec b$ (both should give 0). Misconception killed: "the middle ($\hat j$) term has a plus sign" |
| 4.4 | Areas of Parallelograms and Triangles | Area $= \lvert\vec a\times\vec b\rvert$, triangle $= \tfrac12\lvert\vec a\times\vec b\rvert$ | Area from adjacent sides, from diagonals ($\tfrac12\lvert\vec d_1\times\vec d_2\rvert$), triangle from three vertices ($\tfrac12\lvert\overrightarrow{AB}\times\overrightarrow{AC}\rvert$). Collinearity of three points as zero area. Interactive: `vec-space-3d` (mode `cross`). Misconception killed: "area from diagonals is $\lvert\vec d_1\times\vec d_2\rvert$" (missing the half) |
| 4.5 | Normals, Sines and Torque | $\pm\dfrac{\vec a\times\vec b}{\lvert\vec a\times\vec b\rvert}$ is the unit normal; $\sin\theta = \dfrac{\lvert\vec a\times\vec b\rvert}{\lvert\vec a\rvert\lvert\vec b\rvert}$ | Unit vectors perpendicular to two given vectors (two answers), Lagrange's identity $\lvert\vec a\times\vec b\rvert^2 + (\vec a\cdot\vec b)^2 = \lvert\vec a\rvert^2\lvert\vec b\rvert^2$ tying the two products together, torque $\vec\tau = \vec r\times\vec F$. Geometry pay-off: law of sines from $\vec a\times\vec b = \vec b\times\vec c = \vec c\times\vec a$ for a closed triangle. Misconception killed: "there is only one unit vector perpendicular to both" |
| 4.6 | Chapter 4 Mastery | Direction, area, normal, from scratch | Mixed mastery: compute cross products, orientation from the cycle, areas (sides, diagonals, vertices), unit normals, $\lvert\vec a\times\vec b\rvert$ from $\lvert\vec a\rvert, \lvert\vec b\rvert, \vec a\cdot\vec b$ via Lagrange, parallel test, one torque problem |

## Chapter 5: The Scalar Triple Product and Vector Geometry

**Purpose:** combine both products into a signed volume, use it for coplanarity, and finish with a toolkit chapter: choosing the right product for any geometry or physics question.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 5.1 | Volume of a Box | $[\vec a\,\vec b\,\vec c] = \vec a\cdot(\vec b\times\vec c)$ = (base area) × (height) | Derivation: $\vec b\times\vec c$ is the base area pointing along the normal; dotting with $\vec a$ picks out the height. Interactive: `vec-space-3d` (mode `triple`), tilt $\vec a$ and watch the parallelepiped's height and volume change; volume hits 0 when $\vec a$ lies in the base plane. Tetrahedron volume $= \tfrac16\lvert[\vec a\,\vec b\,\vec c]\rvert$. Misconception killed: "$(\vec a\cdot\vec b)\times\vec c$ is a triple product" (dot of a scalar and cross is meaningless) |
| 5.2 | The Determinant Form and Its Symmetries | $[\vec a\,\vec b\,\vec c]$ is the 3×3 determinant of components | Derivation from the cross-product determinant. Cyclic shifts preserve the value, swaps flip the sign, dot and cross can be interchanged: $\vec a\cdot(\vec b\times\vec c) = (\vec a\times\vec b)\cdot\vec c$. $[\vec a\,\vec a\,\vec b] = 0$. Sign as orientation (right- vs left-handed triple). Misconception killed: "any rearrangement gives the same value" |
| 5.3 | Coplanarity | Three vectors are coplanar ⇔ $[\vec a\,\vec b\,\vec c] = 0$; four points ⇔ $[\overrightarrow{AB}\,\overrightarrow{AC}\,\overrightarrow{AD}] = 0$ | Zero volume = flat box. Finding $\lambda$ that makes vectors coplanar; four-point test. Link back to 2.4: coplanar ⇔ one vector is a linear combination of the other two. Misconception killed: "three vectors are coplanar only if they are parallel" (any two vectors are coplanar; three need not be) |
| 5.4 | Choosing the Right Product | Length → magnitude, angle/perpendicular/projection/work → dot, area/normal/parallel/torque → cross, volume/coplanar → triple | Decision table. Worked multi-step problems that chain products: area of a triangle given as vertices, then height to a side; perpendicular distance of a point from a line via $\lvert\overrightarrow{AP}\times\hat d\rvert$; shortest distance between skew lines as $\lvert[\vec b_2 - \vec b_1\,\ \vec d_1\,\ \vec d_2]\rvert / \lvert\vec d_1\times\vec d_2\rvert$ (preview of 3D geometry). Concept quizzes: "which product answers this?" |
| 5.5 | Vector Geometry Workshop | Classical results in a few lines | Worked proofs in steps: cosine rule from $\lvert\vec a - \vec b\rvert^2$, diagonals of a rhombus are perpendicular, median length (Apollonius), review of the angle in a semicircle (3.5) and the midpoint parallelogram (2.5) in board-answer form, angle bisector direction as $\hat a + \hat b$, vector triple product $\vec a\times(\vec b\times\vec c) = (\vec a\cdot\vec c)\vec b - (\vec a\cdot\vec b)\vec c$ checked on basis vectors (JEE extension, flagged as optional). Misconception killed: "$\hat a + \hat b$ bisects the angle only if $\lvert\vec a\rvert = \lvert\vec b\rvert$" (it always does, because the hats equalise lengths) |
| 5.6 | Chapter 5 Mastery | Full-course diagnostic | Mixed mastery across all chapters: types and addition, components and direction cosines, section formula, dot, cross, triple product, coplanarity, choosing the product, one multi-step geometry problem |

---

## Engineering work this course needs

Existing components reused where they genuinely fit:

| Component | Used in | Why it fits |
| --------- | ------- | ----------- |
| `right-triangle-explorer` | 1.2 | Resolving a vector of length $r$ at angle $\theta$ into $r\cos\theta$, $r\sin\theta$ |
| `unit-circle` | 1.4 | Every 2D unit vector is $(\cos\theta, \sin\theta)$; the circle is the set of all unit vectors |
| `triangle-solver` | 3.2 | Law of cosines on the triangle $\vec a, \vec b, \vec a - \vec b$, the derivation of the component dot formula |

New components (each needs a schema in `src/modules/content/schemas/blocks.ts`, a renderer in `components/interactives/`, and a registry case in `index.tsx`):

| Component | Used in | What it does |
| --------- | ------- | ------------ |
| `vec-canvas-2d` | 0.1–0.5, 1.1, 1.2, 1.4, 2.1–2.4, 3.1, 3.3–3.5, 5.4, 5.5 | Grid canvas with draggable arrow tips (and tails). Modes: `free`, `add` (triangle/parallelogram toggle), `subtract`, `scale` ($k$ slider), `position` (A, B and $\overrightarrow{AB}$), `components`, `section` (ratio slider, internal/external), `triangle` (medians and centroid), `combination` ($x\vec a + y\vec b$ sliders), `dot` (projection shadow, angle, signed dot value, optional perpendicular part). Live readouts in KaTeX |
| `vec-space-3d` | 1.3, 1.5, 4.1, 4.3, 4.4, 5.1–5.3 | Drag-to-rotate 3D axes (right-handed, SVG projection, no WebGL). Modes: `components` (box whose diagonal is $\vec r$), `direction-angles` ($\alpha, \beta, \gamma$ arcs with cosines), `cross` (parallelogram of $\vec a, \vec b$ with the normal $\vec a\times\vec b$, sliders for the angle), `triple` (parallelepiped with volume readout and a slider tilting $\vec a$ out of the base plane) |

Each chapter opens with a narrated overview video (`public/videos/va-0-what-a-vector-is.mp4` … `va-5-triple-product-and-geometry.mp4`, rendered from `videos/scenes/va-*.py`). Quiz ids follow `va{chapter}-{lesson}-q{n}`.

Also needed: `scripts/seed-vector-algebra.ts` (mirrors the trigonometry seed) and a `vector-algebra` course row.
