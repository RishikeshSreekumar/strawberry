# Course: Three-Dimensional Geometry, Lines and Planes in Space

**Slug:** `three-dimensional-geometry` (a course alongside `vector-algebra` and `straight-lines-circles`; same block schema, same seed-script pattern). Content prefix `tdg`: files `src/modules/content/tdg-chapter-N-content.ts`, exports `tdgChapterNLessons`, question ids `tdgN-M-qK`.

**Purpose:** Take a student who already owns vectors (dot, cross and triple products, direction cosines from `vector-algebra`) to the full JEE Main + Advanced syllabus of three-dimensional geometry: points, lines and planes in space, and every angle and distance between them. The course is coordinate geometry of the plane (`straight-lines-circles`) lifted one dimension, with the vector products doing the heavy lifting: a line is a point plus a direction, a plane is a point plus a normal, and every question is answered by choosing the right product.

**End state:** Given any 3D geometry question, the student can reconstruct the answer from:

```text
two points            →  distance √(Δx² + Δy² + Δz²), section point (mB + nA)/(m + n), centroid = average
a direction (a, b, c) →  direction cosines (a, b, c)/√(a² + b² + c²), l² + m² + n² = 1
                          angle between lines: cos θ = |b₁·b₂| / |b₁||b₂|
a line r = a + λb     →  general point (x₁ + aλ, y₁ + bλ, z₁ + cλ): feet, images, intersections
                          distance of P: |(P − A) × b| / |b|
two lines             →  parallel (b₁ ∥ b₂), intersecting, or skew
                          shortest distance |(a₂ − a₁)·(b₁ × b₂)| / |b₁ × b₂|; zero ⇔ coplanar
a plane n·r = d       →  ax + by + cz + d = 0 with normal (a, b, c)
                          P(x₁, y₁, z₁) = ax₁ + by₁ + cz₁ + d: its sign says which side, |P|/|n| says how far
                          P₁ + λP₂ = 0: every plane through the line P₁ = P₂ = 0
line and plane        →  sin φ = |b·n| / |b||n|; meet where the general point satisfies the plane
                          foot / image: (x − x₁)/a = (y − y₁)/b = (z − z₁)/c = −P(x₁, y₁, z₁)/(a² + b² + c²) (× 2 for the image)
```

They should never need a memorised list of forms: the shortest distance is "the projection of the join on the common normal", the condition for two lines to intersect is "the box they span is flat", the image in a plane is "walk along the normal twice as far as the foot".

**Three threads run through every chapter**
1. **Picture first:** every object appears first in the rotatable `tdg-space-viewer` (points, lines, planes, normals, feet, the common perpendicular of skew lines), and every number first in the `tdg-distance-lab` calculator, before the formula is written down.
2. **Vectors do the work:** results are derived from the vector algebra the student already has (dot product for angles and projections, cross product for normals and areas, the triple product for coplanarity and shortest distance), never stated cold.
3. **JEE pay-off:** every lesson ends at JEE level, and every chapter closes with a "reconstruct it" mastery lesson that hides the formula sheet.

---

## Chapter map

| Ch | Title | Core idea |
| -- | ----- | --------- |
| 0 | Coordinates in Space | Three signed distances locate a point; distance, section and centroid are the plane formulas with a $z$ added |
| 1 | Direction of a Line | A line's direction is three numbers, fixed up to scale (ratios) or normalised (cosines); angles and projections come from the dot product |
| 2 | Equation of a Line | A point plus a direction: $\vec r = \vec a + \lambda\vec b$; the general point turns feet, images and intersections into one equation in $\lambda$ |
| 3 | Skew Lines and Shortest Distance | Two lines in space are parallel, intersecting or skew; the common normal $\vec b_1 \times \vec b_2$ measures the gap |
| 4 | Planes | A point plus a normal: every form of a plane, families through a line, angles and distances |
| 5 | Lines and Planes Together | Angle, intersection, foot and image, coplanar lines and projections: line meets plane |

## New interactives

| Component | What it shows | Used in |
| --------- | ------------- | ------- |
| `tdg-space-viewer` | Rotatable orthographic 3D scene (drag or arrow keys). Modes `points` (A, B, coordinate boxes, projections on the axes, section point in $m : n$ internal/external, centroid of triangle and tetrahedron), `line` ($\vec r = \vec a + \lambda\vec b$ with a moving general point, vector and Cartesian forms, direction cosines, foot and image of $P$), `two-lines` (parallel/intersecting/skew verdict, angle, the common perpendicular with its feet and length), `plane` (plane patch, normal, foot from the origin, intercept triangle, $P$ with foot, image, distance and side), `two-planes` (angle, line of intersection, distance when parallel), `line-plane` (angle, meeting point, projection of the line on the plane). Sliders for $P$'s coordinates and the plane constant | Ch 0 to 5 |
| `tdg-distance-lab` | Calculator-visual with editable integer inputs: the formula worked on the live numbers plus a schematic. Modes `two-points`, `direction`, `two-directions`, `point-line`, `skew-lines`, `point-plane`, `two-planes`, `line-plane` | Ch 0 to 5 |

Reused: `vec-space-3d` (mode `direction-angles` for the recap in 1.1).

---

## Chapter 0: Coordinates in Space

**Purpose:** fix three mutually perpendicular axes and locate every point by three signed distances; then lift the distance and section formulas of the plane into space.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 0.1 | Axes, Octants and Coordinates | A point's coordinates are its signed distances from the three coordinate planes | Right-handed axes, the three coordinate planes, eight octants and their sign patterns, points on axes and on coordinate planes ($x = 0$ is the yz-plane). Feet of perpendiculars from a point to the axes and planes; distance from each axis $\sqrt{y^2 + z^2}$ etc. Reflections in coordinate planes. `tdg-space-viewer` (mode `points`, `box`). Misconceptions: "the x-coordinate is the distance from the x-axis"; "$x = 0$ is the x-axis" |
| 0.2 | The Distance Formula | Pythagoras twice: floor diagonal, then up | Derivation via the box, distance from the origin, classifying triangles (right, isosceles, equilateral), collinearity by $AB + BC = AC$, locus of points equidistant from two points (a plane), locus with $PA^2 + PB^2 = k$. `tdg-distance-lab` (mode `two-points`). Misconception: "$\lvert AB\rvert = \lvert\Delta x\rvert + \lvert\Delta y\rvert + \lvert\Delta z\rvert$" |
| 0.3 | The Section Formula | The dividing point is a weighted average of the endpoints, coordinate by coordinate | Internal and external division, midpoint, ratio in which a coordinate plane divides a segment ($k : 1$ method, sign of $k$ says internal or external), collinearity of three points via a common ratio, fourth vertex of a parallelogram. `tdg-space-viewer` (mode `points`, `section`, `external`). Misconception: swapping the weights |
| 0.4 | Centroids and Centres in Space | The centroid is the average of the vertices: of three for a triangle, four for a tetrahedron | Centroid of a triangle, vertices from the midpoints of the sides, centroid of a tetrahedron (divides each vertex-to-face-centroid segment in $3 : 1$), incentre of a triangle in space as the side-weighted average, the circumcentre-type problems left to Ch 4. `tdg-space-viewer` (mode `points`, `centroid`). Misconception: "the tetrahedron centroid divides the median in $2 : 1$" |
| 0.5 | Projections of a Segment on the Axes | The projection of $AB$ on the x-axis is $x_2 - x_1$: the shadow on that axis | Projections on the axes as signed lengths, $AB^2 = $ sum of squares of the projections, projection of a segment on a coordinate plane ($\sqrt{\Delta x^2 + \Delta y^2}$ on the xy-plane), preview of direction cosines ($\Delta x = AB\cos\alpha$). `tdg-space-viewer` (mode `points`, `projections`). Misconception: "projections are always positive lengths" |
| 0.6 | Chapter 0 Mastery | Reconstruct every formula from the coordinate box | Mixed JEE problems: octants, distances, section ratios, centroids, projections, loci |

## Chapter 1: Direction of a Line

**Purpose:** pin down the direction of a line in space by three numbers. Recap direction cosines from vector algebra, then build the 3D-geometry tools on them: direction ratios from two points, the angle between two lines, parallel and perpendicular conditions, and the projection of a segment on a line.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 1.1 | Direction Cosines of a Line | A line makes angles $\alpha, \beta, \gamma$ with the axes; $l^2 + m^2 + n^2 = 1$ | Recap (vector algebra 1.5) in one screen, then what is new for a **line**: the two senses give $(l, m, n)$ and $(-l, -m, -n)$. DCs of the axes, a line equally inclined to the axes, $\sin^2\alpha + \sin^2\beta + \sin^2\gamma = 2$, $\cos 2\alpha + \cos 2\beta + \cos 2\gamma = -1$, testing whether three numbers can be DCs. `vec-space-3d` (mode `direction-angles`) and `tdg-distance-lab` (mode `direction`). Misconceptions: "$\alpha + \beta + \gamma = 180^\circ$"; "a line has one set of DCs" |
| 1.2 | Direction Ratios and Two Points | Any multiple of $(l, m, n)$; from two points, $(x_2 - x_1, y_2 - y_1, z_2 - z_1)$ | DRs to DCs (divide by the length, $\pm$), DCs of the line through two points, collinearity of three points by proportional DRs, DRs with a zero entry (line perpendicular to an axis). Misconception: "direction ratios must add to 1 / be unique" |
| 1.3 | The Angle Between Two Lines | $\cos\theta = \lvert l_1l_2 + m_1m_2 + n_1n_2\rvert$ | Derivation from the dot product; DR version; the $\sin\theta$ form $\sqrt{\sum (m_1n_2 - m_2n_1)^2}$; angle between diagonals of a cube ($\cos^{-1}\frac13$), between a body diagonal and a face diagonal or an edge; angle of a triangle in space. `tdg-distance-lab` (mode `two-directions`). Misconception: "use the obtuse angle when the dot product is negative" |
| 1.4 | Parallel and Perpendicular Lines | Parallel: proportional DRs; perpendicular: $a_1a_2 + b_1b_2 + c_1c_2 = 0$ | Solving for an unknown that makes lines parallel or perpendicular, the direction perpendicular to two given lines ($\vec b_1 \times \vec b_2$, cofactor method), lines whose DCs satisfy two given relations (JEE: solve $l + m + n = 0$ with a quadratic relation, find both lines and the angle between them). Misconception: "proportional means equal" |
| 1.5 | Projection of a Segment on a Line | The shadow of $AB$ on a line with DCs $l, m, n$ is $\lvert l\Delta x + m\Delta y + n\Delta z\rvert$ | Derivation as $\overrightarrow{AB}\cdot\hat u$, the DR version (divide by the length), recovering a segment from its projections on the axes (JEE: projections $12, 4, 3$ give length 13 and DCs), projection on the line joining two points, foot-of-perpendicular preview. Misconception: "projecting on DRs without normalising" |
| 1.6 | Chapter 1 Mastery | Reconstruct every result from the dot product | Mixed JEE problems: DCs and DRs, angles, perpendicularity, lines from two DC relations, projections |

## Chapter 2: Equation of a Line

**Purpose:** a line is a point plus a direction. Write it in vector and Cartesian form, convert between forms, and use its general point to find feet of perpendiculars, distances, images and intersections.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 2.1 | The Vector Equation of a Line | $\vec r = \vec a + \lambda\vec b$: start at $A$, walk along $\vec b$ | Derivation from collinearity of $\overrightarrow{AP}$ and $\vec b$, the parameter as a "clock", two-point form $\vec r = \vec a + \lambda(\vec c - \vec a)$, checking whether a point is on a line, the same line written many ways. `tdg-space-viewer` (mode `line`, `general-point`). Misconception: "$\vec a$ is the direction" |
| 2.2 | The Cartesian (Symmetric) Form | Eliminate $\lambda$: $\frac{x - x_1}{a} = \frac{y - y_1}{b} = \frac{z - z_1}{c}$ | Derivation, two-point form, converting vector ↔ Cartesian, non-standard forms ($\frac{2x - 1}{3} = \frac{3 - y}{2} = z$: rewrite each numerator as $x - $ something with coefficient 1), zero denominators ($\frac{x - 1}{0}$ means $x = 1$), lines parallel to axes. Misconception: "the denominators of $\frac{2x - 1}{3}$ give DRs $(3, \ldots)$" |
| 2.3 | The General Point and Points at a Distance | $(x_1 + a\lambda, y_1 + b\lambda, z_1 + c\lambda)$ is every point on the line | Where a line meets a coordinate plane, points on a line at a given distance from a point (use DCs so $\lambda$ is distance), the point on a line with a given coordinate, line through a point parallel to a given line. Misconception: "with DRs, $\lambda$ is the distance" |
| 2.4 | Foot of the Perpendicular and Distance from a Line | Set $\overrightarrow{PQ(\lambda)}\cdot\vec b = 0$, solve for $\lambda$ | General point method, distance $= PQ$, vector formula $\frac{\lvert(\vec p - \vec a) \times \vec b\rvert}{\lvert\vec b\rvert}$ and why (area over base), the equation of the perpendicular from $P$ to the line. `tdg-space-viewer` (mode `line`, `foot`), `tdg-distance-lab` (mode `point-line`). Misconception: "perpendicular to the line means $\overrightarrow{PQ}$ is perpendicular to $\vec a$" |
| 2.5 | Image of a Point in a Line | The foot is the midpoint of $P$ and its image: $P' = 2Q - P$ | Image by the foot, reflections of points and segments, equation of the line through $P$ and its image, JEE problems (image of the origin, unknowns from an image). `tdg-space-viewer` (mode `line`, `image`). Misconception: "the image is $P + Q$" |
| 2.6 | Intersecting Lines | Equate general points: three equations, two unknowns | Solve two equations for $\lambda, \mu$, check the third; point of intersection; finding $k$ so that two lines meet; a line through a point meeting a given line at right angles; lines meeting both axes. `tdg-space-viewer` (mode `two-lines`). Misconception: "two non-parallel lines in space always meet" |
| 2.7 | Chapter 2 Mastery | Reconstruct every result from the general point | Mixed JEE problems: forms, conversions, feet, distances, images, intersections |

## Chapter 3: Skew Lines and Shortest Distance

**Purpose:** in space, two lines can miss each other without being parallel. Classify pairs of lines, measure the gap between them with the common normal, and find the line of shortest distance itself.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 3.1 | Parallel, Intersecting or Skew | Coplanar lines are parallel or meet; non-coplanar lines are skew | Cube-edge examples, the classification procedure (directions proportional? then do they meet?), why the plane picture fails in space. `tdg-space-viewer` (mode `two-lines`). Misconception: "not parallel means intersecting" |
| 3.2 | Shortest Distance Between Skew Lines | Project the join $\vec a_2 - \vec a_1$ on the common normal $\vec b_1 \times \vec b_2$ | Derivation (the common perpendicular is along $\vec b_1 \times \vec b_2$; any join projects onto it with the same length), formula $\frac{\lvert(\vec a_2 - \vec a_1)\cdot(\vec b_1 \times \vec b_2)\rvert}{\lvert\vec b_1 \times \vec b_2\rvert}$, triple-product reading (volume over base area), worked examples, cube edge and diagonal. `tdg-space-viewer` (mode `two-lines`, `shortest-distance`), `tdg-distance-lab` (mode `skew-lines`). Misconception: "shortest distance is the distance between the given points $A_1$ and $A_2$" |
| 3.3 | The Cartesian Form and the Condition to Intersect | The numerator is a determinant; it vanishes exactly when the lines are coplanar | Determinant form of the SD, denominator $\sqrt{\sum(b_1c_2 - b_2c_1)^2}$, condition for two lines to intersect (determinant zero and not parallel), finding $k$ for intersection (JEE), intersection point after the test. Misconception: "determinant zero means the lines intersect" (they could be parallel) |
| 3.4 | Distance Between Parallel Lines | When $\vec b_1 \times \vec b_2 = \vec 0$, use $\frac{\lvert(\vec a_2 - \vec a_1) \times \vec b\rvert}{\lvert\vec b\rvert}$ | Why the skew formula breaks (0/0), derivation as distance of a point from a line, parallel lines given with scaled directions, distance between a line and a parallel line through a point. Misconception: "use the skew formula anyway" |
| 3.5 | The Line of Shortest Distance | Feet $P(\lambda)$, $Q(\mu)$ with $\overrightarrow{PQ}$ perpendicular to both lines | Two dot-product equations in $\lambda, \mu$, the feet, the equation of the common perpendicular, its length matches 3.2, the plane containing one line and the common perpendicular (preview of Ch 4). `tdg-space-viewer` (mode `two-lines`, `shortest-distance`). JEE Advanced problems. Misconception: "the common perpendicular passes through the given points" |
| 3.6 | Chapter 3 Mastery | Reconstruct from "project the join on the common normal" | Mixed JEE problems: classification, SD (vector and Cartesian), intersection condition, parallel lines, the line of SD |

## Chapter 4: Planes

**Purpose:** a plane is a point plus a normal. Build every form of its equation, families of planes through a line, angles between planes, distances from planes and the two sides of a plane.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 4.1 | A Plane from a Point and a Normal | $(\vec r - \vec a)\cdot\vec n = 0$, i.e. $a(x - x_1) + b(y - y_1) + c(z - z_1) = 0$ | Derivation, the general equation $ax + by + cz + d = 0$ and reading its normal, planes parallel to coordinate planes and axes (a missing variable means parallel to that axis), plane through a point parallel to a given plane, perpendicular bisector plane of a segment. `tdg-space-viewer` (mode `plane`, `normal`). Misconception: "$(a, b, c)$ lies in the plane" |
| 4.2 | The Normal Form | $\vec r\cdot\hat n = p$, $lx + my + nz = p$ with $p \ge 0$ | Derivation from the foot of the perpendicular from O, converting the general form (divide by $\pm\sqrt{a^2 + b^2 + c^2}$, sign to make $p \ge 0$), distance of a plane from the origin, foot from the origin $p\hat n$, DCs of the normal. Misconception: forgetting the sign that makes $p \ge 0$ |
| 4.3 | The Plane Through Three Points | Normal $= \overrightarrow{AB} \times \overrightarrow{AC}$, or the $3 \times 3$ determinant | Derivation (both ways), collinear points give no unique plane, four points coplanar (determinant), plane through a point and a line (preview of 5.4). Misconception: "any three points fix a plane" |
| 4.4 | The Intercept Form | $\frac xa + \frac yb + \frac zc = 1$ | Derivation, intercepts of a general plane, volume of the tetrahedron cut from the axes $\frac16\lvert abc\rvert$, centroid of the intercept triangle, JEE locus: a plane at constant distance $p$ from O meets the axes at $A, B, C$; the centroid of $ABC$ lies on $\frac{1}{x^2} + \frac{1}{y^2} + \frac{1}{z^2} = \frac{9}{p^2}$. `tdg-space-viewer` (mode `plane`, `intercepts`). Misconception: intercepts from $ax + by + cz = d$ as $a, b, c$ |
| 4.5 | Planes Through the Intersection of Two Planes | $P_1 + \lambda P_2 = 0$ is every plane through the line $P_1 = P_2 = 0$ (except $P_2$ itself) | Why (any point on both planes satisfies it), member through a point, perpendicular to a plane, parallel to an axis or a line, the direction of the line of intersection $\vec n_1 \times \vec n_2$. `tdg-space-viewer` (mode `two-planes`, `intersection`). Misconception: "$\lambda$ can be found from the normals alone" |
| 4.6 | The Angle Between Two Planes | The angle between the normals: $\cos\theta = \frac{\lvert\vec n_1\cdot\vec n_2\rvert}{\lvert\vec n_1\rvert\lvert\vec n_2\rvert}$ | Derivation (dihedral angle), parallel ($\vec n_1 \parallel \vec n_2$) and perpendicular ($\vec n_1\cdot\vec n_2 = 0$) planes, finding an unknown for perpendicularity, angle with the coordinate planes. `tdg-distance-lab` (mode `two-planes`). Misconception: "parallel planes need equal equations" |
| 4.7 | Distances and the Two Sides of a Plane | $\frac{\lvert ax_1 + by_1 + cz_1 + d\rvert}{\sqrt{a^2 + b^2 + c^2}}$; the sign of $P(x_1, y_1, z_1)$ gives the side | Derivation by projecting onto the unit normal, distance between parallel planes $\frac{\lvert d_1 - d_2\rvert}{\lvert\vec n\rvert}$ after matching normals, planes at a given distance, points on the same or opposite sides (sign test), the ratio $-P(A) : P(B)$ in which a plane divides $AB$, bisector planes of the angle between two planes (JEE Advanced). `tdg-distance-lab` (mode `point-plane`), `tdg-space-viewer` (mode `plane`). Misconception: matching constants without matching normals first |
| 4.8 | Chapter 4 Mastery | Reconstruct every form from "point plus normal" | Mixed JEE problems: forms, three-point planes, intercepts, families, angles, distances, sides |

## Chapter 5: Lines and Planes Together

**Purpose:** put a line and a plane in the same picture: the angle between them, where they meet, feet and images in a plane, coplanar lines and the plane containing them, lines given as intersections of planes, and the projection of a line on a plane. Close the course with JEE mixed problems.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 5.1 | The Angle Between a Line and a Plane | The complement of the angle with the normal: $\sin\phi = \frac{\lvert\vec b\cdot\vec n\rvert}{\lvert\vec b\rvert\lvert\vec n\rvert}$ | Derivation, line parallel to a plane ($\vec b\cdot\vec n = 0$), perpendicular to a plane ($\vec b \parallel \vec n$), lying in a plane (parallel and one point on it), unknowns from these conditions. `tdg-space-viewer` (mode `line-plane`), `tdg-distance-lab` (mode `line-plane`). Misconception: "use $\cos$, like two lines" |
| 5.2 | Where a Line Meets a Plane | Put the general point into the plane equation; solve for $\lambda$ | Point of intersection, no solution (parallel) vs every $\lambda$ (in the plane), the ratio in which a plane divides a segment, distance of a point from a plane measured parallel to a given line (JEE classic). `tdg-space-viewer` (mode `line-plane`, `intersection`). Misconception: "distance along a line equals the perpendicular distance" |
| 5.3 | Foot of the Perpendicular and Image in a Plane | Walk from $P$ along the normal: $\lambda = -\frac{P(x_1, y_1, z_1)}{a^2 + b^2 + c^2}$, twice that for the image | Derivation, the symmetric formula, image of a line in a plane (reflect one point, keep the meeting point), reflection of a ray, JEE problems. `tdg-space-viewer` (mode `plane`, `foot`, `image`), `tdg-distance-lab` (mode `point-plane`). Misconception: "image = foot + P" |
| 5.4 | Coplanar Lines and the Plane Containing Them | Coplanar iff $(\vec a_2 - \vec a_1)\cdot(\vec b_1 \times \vec b_2) = 0$; that plane has normal $\vec b_1 \times \vec b_2$ | Condition for coplanarity (Cartesian determinant), the plane containing two intersecting lines, plane containing a line and a point, plane containing a line and parallel to another line, plane containing two parallel lines. Misconception: "the normal of the plane is $\vec b_1 + \vec b_2$" |
| 5.5 | Lines as Intersections of Planes and Projections | A line is two planes at once; its projection on a plane lies in the plane through the line perpendicular to it | Unsymmetric form $P_1 = 0 = P_2$ to symmetric form (direction $\vec n_1 \times \vec n_2$, a point by setting one coordinate), projection of a line on a plane (project two points, or intersect with the perpendicular plane through the line), projection of a point set. `tdg-space-viewer` (mode `line-plane`, `projection`). Misconception: "the projection has the same direction as the line" |
| 5.6 | JEE Mixed Problems | Choose the object: point, direction, normal, then the product | Strategy table (what to compute for each question type), multi-step problems combining images, distances, families and skew lines, previous-year JEE style problems. Misconception: "one formula per question" |
| 5.7 | Chapter 5 Mastery | Full-course diagnostic | Mixed mastery across all chapters |

---

## Engineering work this course needs

- `tdg-space-viewer` and `tdg-distance-lab` components (schemas in `schemas/blocks.ts`, registered in `components/interactives/index.tsx`).
- Seed script `scripts/seed-three-dimensional-geometry.ts`.
- Test `tests/tdg-course-content.test.ts`: lesson counts, mastery lessons, KaTeX validity, plain titles, quiz correctness, question ids, render smoke test for every lesson and every interactive mode.
