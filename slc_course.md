# Course: Straight Lines and Circles, Geometry in Coordinates

**Slug:** `straight-lines-circles` (a course alongside `vector-algebra`, `trigonometry` and `complex-numbers-quadratics`; same block schema, same seed-script pattern). Content prefix `slc`: files `src/modules/content/slc-chapter-N-content.ts`, exports `slcChapterNLessons`, question ids `slcN-M-qK`.

**Purpose:** Take a student from "plot the point $(3, -2)$" to the full JEE Main + Advanced syllabus of the coordinate plane, the straight line and the circle. Coordinate geometry is one idea used over and over: a geometric condition (equal distances, a right angle, a tangent) becomes an equation, and the equation is solved with algebra the student already owns. Every chapter keeps the picture (a draggable point, a line swinging about a pivot, a circle and its tangents) in front of the algebra.

**End state:** Given any straight-line or circle question, the student can reconstruct the answer from:

```text
two points            →  distance √(Δx² + Δy²), section point (mx₂ + nx₁)/(m + n), area ½|det|
a line ax + by + c = 0 →  slope −a/b, normal vector (a, b)
                          L(P) = ax₁ + by₁ + c: its sign says which side, |L(P)|/√(a² + b²) says how far
                          L₁ + λL₂ = 0: every line through L₁ ∩ L₂
a circle S = 0         →  centre (−g, −f), radius √(g² + f² − c)
                          S₁: sign says inside/outside, √S₁ is the tangent length
                          T = 0 tangent / chord of contact / polar, T = S₁ chord with given midpoint
                          S − S' = 0 radical axis, S + λS' = 0 every circle through S ∩ S'
```

They should never need a memorised list of forms or cases: the normal form is "the foot of the perpendicular from O", the tangency condition is "distance from centre = radius", the number of common tangents is "how $d$ compares with $r_1 + r_2$ and $\lvert r_1 - r_2\rvert$".

**Three threads run through every chapter**
1. **Picture first:** every result appears first on the coordinate plane (the `slc-line-explorer` and `slc-circle-lab` interactives, with draggable points), then as a formula.
2. **One derivation, many uses:** distance and section formula (Ch 0), slope (Ch 1), the signed quantity $L(P)$ (Ch 2), the family $L_1 + \lambda L_2$ (Ch 3) and the power of a point $S_1$ (Ch 4–5) are derived once and then reused; formulas are never stated cold.
3. **JEE pay-off:** every lesson ends at JEE level, and every chapter closes with a "reconstruct it" mastery lesson that hides the formula sheet.

---

## Chapter map

| Ch | Title | Core idea |
| -- | ----- | --------- |
| 0 | The Coordinate Plane | Points become number pairs: distance, section formula, triangle centres, area, locus |
| 1 | Slope and Equations of a Line | One number (slope) or one perpendicular (normal) fixes a direction; every form of a line is the same equation dressed differently |
| 2 | Angles and Distances | The signed value $L(P)$ measures side and distance; angle, foot, image and bisectors follow |
| 3 | Families and Concurrency | $L_1 + \lambda L_2 = 0$ is every line through a point; pairs of lines as one second-degree equation |
| 4 | Circles | Centre and radius in every form; a line meets a circle as its distance from the centre decides; tangents and normals |
| 5 | Chords and Systems of Circles | $T = 0$, $T = S_1$, $S - S' = 0$, $S + \lambda S' = 0$: chords, polars, common tangents, radical axis |

## New interactives

| Component | What it shows | Used in |
| --------- | ------------- | ------- |
| `slc-line-explorer` | Coordinate plane with draggable points. Modes `section` (internal and external division in $m : n$), `triangle` (area by determinant; centroid, incentre, circumcentre, orthocentre, excentres, Euler line, circumcircle, incircle), `line` (slope, inclination, intercepts, every standard form), `point-line` (distance, foot, image, side of the line), `two-lines` (intersection, angle, parallel/perpendicular, both bisectors with the origin-side and acute bisector named), `family` ($L_1 + \lambda L_2 = 0$ swinging about the common point), `pair` ($ax^2 + 2hxy + by^2 = 0$ with angle between the lines) | Ch 0, 1, 2, 3 |
| `slc-circle-lab` | A circle with draggable centre and radius slider. Modes `circle` (centre-radius and general equations, $S_1$ and the position of a point, parametric point, normal), `line` (distance from centre, chord length, tangency), `tangents` (tangents from $P$, tangent length $\sqrt{S_1}$, chord of contact, polar, chord with midpoint $P$, director circle), `two-circles` (relative position, number of common tangents drawn, radical axis / common chord, orthogonality), `three-circles` (radical axes and radical centre) | Ch 4, 5 |

---

## Chapter 0: The Coordinate Plane

**Purpose:** turn points into number pairs and geometric facts into arithmetic: distance, division of a segment, the centres of a triangle, area, and the idea of a locus as the equation a moving point obeys.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 0.1 | Points and the Distance Formula | Distance is Pythagoras on the coordinate differences | Quadrants and signs, distance formula derived from a right triangle, distance from the origin. Classifying triangles (right, isosceles, equilateral) and quadrilaterals (square, rhombus, rectangle, parallelogram) by distances. Point equidistant from given points; points on an axis at a given distance. `slc-line-explorer` (mode `line`) dragging two points. Misconception: "a quadrilateral with four equal sides is a square" |
| 0.2 | The Section Formula | A dividing point is a weighted average of the endpoints | Internal division derived by similar triangles, midpoint, external division as a negative ratio. Ratio in which an axis or a given point divides a segment ($k : 1$ method). Points of trisection, fourth vertex of a parallelogram (diagonals bisect). `slc-line-explorer` (mode `section`). Misconception: swapping $m$ and $n$ in $\frac{mx_2 + nx_1}{m + n}$ |
| 0.3 | Centres of a Triangle | Each centre is a weighted average or an intersection of three concurrent lines | Centroid $\left(\frac{\sum x}{3}, \frac{\sum y}{3}\right)$, incentre $\frac{ax_1 + bx_2 + cx_3}{a + b + c}$, excentres, circumcentre (equidistant), orthocentre (altitudes). Right-triangle and equilateral special cases, Euler line ($G$ divides $OH$ in $1 : 2$, $H = 3G - 2O$). `slc-line-explorer` (mode `triangle`). Misconception: "the incentre is the average of the vertices" |
| 0.4 | Area and Collinearity | Area is half the absolute value of a determinant | Shoelace / determinant formula derived from trapezia, sign = orientation. Area of a quadrilateral and polygon (vertices in order). Collinearity as zero area. Area ratios with centroid and section points; finding an unknown vertex from an area. Misconception: vertices taken out of order for a polygon |
| 0.5 | Locus and Its Equation | A locus is the set of points obeying a condition; its equation is that condition in $x$ and $y$ | Method: call the moving point $(h, k)$, write the condition, eliminate parameters, replace $(h, k)$ by $(x, y)$. Perpendicular bisector, circle, Apollonius circle, sum of squares of distances, midpoint of a sliding rod, centroid of a moving vertex. Misconception: forgetting to eliminate the parameter |
| 0.6 | Shifting the Origin | Moving the origin to $(h, k)$ replaces $x$ by $X + h$, $y$ by $Y + k$ | Translation of axes, removing first-degree terms of an equation by shifting, invariance of distance and area. Brief look at rotation of axes. Misconception: shifting by $+h$ instead of $-h$ |
| 0.7 | Chapter 0 Mastery | Reconstruct every formula from the distance formula and similar triangles | Mixed JEE Main/Advanced problems: centres, area, locus, section ratios, shifting |

## Chapter 1: Slope and Equations of a Line

**Purpose:** a line is fixed by a point and a direction. Build slope, then derive every standard form of the equation of a line and the conversions between them.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 1.1 | Slope and Inclination | Slope is rise over run, equal to $\tan\theta$ | Slope from two points, inclination in $[0, \pi)$, horizontal and vertical lines, sign of slope from the picture, collinearity by equal slopes. `slc-line-explorer` (mode `line`). Misconception: "a vertical line has slope 0" |
| 1.2 | Parallel and Perpendicular Lines | Parallel: $m_1 = m_2$; perpendicular: $m_1m_2 = -1$ | Derivation of $m_1m_2 = -1$ by rotating a run-rise triangle. Lines parallel/perpendicular to $ax + by + c = 0$: $ax + by + k = 0$, $bx - ay + k = 0$. Orthocentre and right angles via slopes. Misconception: "$m_1m_2 = -1$ works for a vertical line too" |
| 1.3 | Point-Slope, Slope-Intercept and Two-Point Forms | A point and a slope give $y - y_1 = m(x - x_1)$ | Point-slope derived from slope, slope-intercept $y = mx + c$, two-point form, determinant form, lines through a point, medians and altitudes of a triangle. Misconception: confusing the y-intercept $c$ with the x-intercept |
| 1.4 | The Intercept Form | $\frac xa + \frac yb = 1$ cuts the axes at $a$ and $b$ | Derivation, triangle cut off with the axes (area $\frac12\lvert ab\rvert$), line with intercepts in a ratio, point bisecting the intercepted segment ($\frac xa + \frac yb = 2$ for midpoint), sum of intercepts problems. Misconception: intercepts must be positive lengths |
| 1.5 | The Normal Form | $x\cos\alpha + y\sin\alpha = p$: $p$ is the perpendicular from O | Derivation from the foot of the perpendicular, converting $ax + by + c = 0$ (divide by $\pm\sqrt{a^2 + b^2}$, sign chosen to make $p \ge 0$), reading $\alpha$ and $p$. Misconception: forgetting the sign that makes $p \ge 0$ |
| 1.6 | The Parametric (Distance) Form | $(x_1 + r\cos\theta, y_1 + r\sin\theta)$ is the point at signed distance $r$ | Derivation, points at a given distance along a line, distance along a line to another line, JEE problems ($r_1 r_2$ type, length cut between two lines). `slc-line-explorer` (mode `line`, forms). Misconception: using $(\cos\theta, \sin\theta)$ from a slope without normalising |
| 1.7 | The General Form and Conversions | $ax + by + c = 0$ carries every form; $(a, b)$ is a normal | Slope $-\frac ab$, intercepts $-\frac ca$, $-\frac cb$, conversions to every form, identical lines (proportional coefficients), lines through a fixed point when coefficients satisfy a linear relation (preview of Ch 3). Misconception: slope $= \frac ab$ |
| 1.8 | Chapter 1 Mastery | Reconstruct every form from "a point and a direction" | Mixed JEE problems: forms and conversions, intercept problems, parametric form, parallel/perpendicular lines |

## Chapter 2: Angles and Distances

**Purpose:** measure the plane with lines: angle between two lines, distance of a point from a line, the foot and image of a point, which side of a line a point lies, and angle bisectors.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 2.1 | The Angle Between Two Lines | $\tan\theta = \left\lvert\frac{m_1 - m_2}{1 + m_1m_2}\right\rvert$ | Derivation from $\theta_1 - \theta_2$, acute vs obtuse angle, general-form version $\cos\theta = \frac{\lvert a_1a_2 + b_1b_2\rvert}{\sqrt{\cdot}\sqrt{\cdot}}$, vertical line case, angles of a triangle from its sides. `slc-line-explorer` (mode `two-lines`). Misconception: dropping the modulus and reporting the obtuse angle |
| 2.2 | Distance of a Point from a Line | $d = \frac{\lvert ax_1 + by_1 + c\rvert}{\sqrt{a^2 + b^2}}$ | Derivation by area or by the normal form, distance between parallel lines $\frac{\lvert c_1 - c_2\rvert}{\sqrt{a^2 + b^2}}$ (same $a, b$ first), lines at a given distance from a point, altitude lengths, area of parallelogram from four lines. `slc-line-explorer` (mode `point-line`). Misconception: not making the coefficients equal before using the parallel-line formula |
| 2.3 | Foot of the Perpendicular and Image of a Point | $\frac{x - x_1}{a} = \frac{y - y_1}{b} = -\frac{L(P)}{a^2 + b^2}$ (foot), $-\frac{2L(P)}{a^2 + b^2}$ (image) | Derivation via the parametric form along the normal, reflections in $y = x$, the axes and $y = -x$, reflection of a vertex in a bisector (JEE classic), shortest path via reflection. Misconception: halving the wrong one |
| 2.4 | Position of Points Relative to a Line | Points on the same side have $L(P)$ of the same sign | Derivation from the parametric form, same/opposite side, a segment crossing a line, ratio $-\frac{L(A)}{L(B)}$, point inside a triangle (three sign tests), origin side. `slc-line-explorer` (mode `point-line`). Misconception: "positive means above" |
| 2.5 | Angle Bisectors | Bisectors are the locus of points equidistant from two lines | $\frac{a_1x + b_1y + c_1}{\sqrt{a_1^2 + b_1^2}} = \pm\frac{a_2x + b_2y + c_2}{\sqrt{a_2^2 + b_2^2}}$, the bisector containing the origin (make $c_1, c_2 > 0$, take $+$), acute vs obtuse via the sign of $a_1a_2 + b_1b_2$, bisector containing a given point, incentre from bisectors. `slc-line-explorer` (mode `two-lines`, bisectors). Misconception: "the origin bisector is always the acute one" |
| 2.6 | Chapter 2 Mastery | Reconstruct every result from $L(P)$ and the normal vector | Mixed JEE problems: angle, distance, foot, image, sides, bisectors |

## Chapter 3: Families and Concurrency

**Purpose:** treat lines in bulk: where they meet, when three meet, every line through a point at once, lines at a given angle, reflections of lines, and pairs of lines as one second-degree equation.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 3.1 | Intersection and Concurrency | Three lines are concurrent iff their coefficient determinant vanishes (non-parallel) | Intersection by cross-multiplication, concurrency determinant derived, concurrency by $\alpha L_1 + \beta L_2 + \gamma L_3 \equiv 0$, concurrent medians/altitudes as a check, area of a triangle formed by three lines. Misconception: determinant zero with parallel lines |
| 3.2 | The Family $L_1 + \lambda L_2 = 0$ | Every line through $L_1 \cap L_2$ (except $L_2$) is $L_1 + \lambda L_2 = 0$ | Why it works, finding a member through a point / parallel / perpendicular to a line without finding the intersection, fixed point of $ax + by + c = 0$ when $a, b, c$ satisfy a linear relation, $(2k+1)x + (k-1)y = \dots$ type. `slc-line-explorer` (mode `family`). Misconception: forgetting that $L_2$ itself is not in the family |
| 3.3 | Lines at a Given Angle and Reflection of a Line | $\tan\alpha = \left\lvert\frac{m - m_0}{1 + mm_0}\right\rvert$ gives two slopes | Lines through a point at angle $\alpha$ to a line, equilateral triangle on a base, isosceles right triangle, reflection of a line in a line (image of two points, or the family through the intersection), light-ray reflection problems. Misconception: getting only one of the two lines |
| 3.4 | Pair of Straight Lines Through the Origin | $ax^2 + 2hxy + by^2 = 0$ is two lines $y = m_1x$, $y = m_2x$ | $m_1 + m_2 = -\frac{2h}{b}$, $m_1m_2 = \frac ab$, real iff $h^2 \ge ab$, angle $\tan\theta = \frac{2\sqrt{h^2 - ab}}{\lvert a + b\rvert}$, perpendicular iff $a + b = 0$, coincident iff $h^2 = ab$, bisectors $\frac{x^2 - y^2}{a - b} = \frac{xy}{h}$, forming the joint equation. `slc-line-explorer` (mode `pair`). Misconception: sign of the sum of slopes |
| 3.5 | The General Second-Degree Pair | $ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0$ is a pair iff $abc + 2fgh - af^2 - bg^2 - ch^2 = 0$ | Derivation by solving as a quadratic in $x$, point of intersection, angle (same as the homogeneous part), parallel pair and distance between them, homogenisation: lines joining the origin to the meeting points of a line and a conic, right angle at the origin. Misconception: angle depending on $g, f, c$ |
| 3.6 | Triangle Problems in Coordinates | Sides, medians, altitudes and bisectors as given lines | Vertices from sides, third side from medians or altitudes, using reflections in angle bisectors, orthocentre and circumcentre from side equations, image tricks. JEE previous-year style problems |
| 3.7 | Chapter 3 Mastery | Reconstruct concurrency and families from "a combination of equations" | Mixed JEE Main/Advanced problems |

## Chapter 4: Circles

**Purpose:** the circle as "all points at distance $r$ from a centre", in every form; the position of a point; a line against a circle; tangents and normals.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 4.1 | The Equation of a Circle | $(x - h)^2 + (y - k)^2 = r^2$, expanded: $x^2 + y^2 + 2gx + 2fy + c = 0$ | Centre-radius form from the distance formula, general form, centre $(-g, -f)$ and radius $\sqrt{g^2 + f^2 - c}$, conditions for a second-degree equation to be a circle (equal $x^2, y^2$ coefficients, no $xy$, $g^2 + f^2 - c \ge 0$; point and imaginary circles), circle through three points. `slc-circle-lab` (mode `circle`). Misconception: centre $(g, f)$ |
| 4.2 | Diameter Form, Parametric Form and Special Circles | $(x - x_1)(x - x_2) + (y - y_1)(y - y_2) = 0$ from the angle in a semicircle | Derivation, circles touching the axes ($r = \lvert g\rvert$ or $\lvert f\rvert$, $g^2 = c$), intercepts made on the axes $2\sqrt{g^2 - c}$, parametric form $(h + r\cos\theta, k + r\sin\theta)$ and its uses (max/min of $x + y$ on a circle). Misconception: intercept $= 2\sqrt{g^2 + c}$ |
| 4.3 | Position of a Point | The sign of $S_1$ says inside, on or outside | $S_1 = x_1^2 + y_1^2 + 2gx_1 + 2fy_1 + c = CP^2 - r^2$, nearest and farthest points ($\lvert CP - r\rvert$, $CP + r$), points with integer coordinates inside, a parameter that puts a point inside. Misconception: forgetting to make the $x^2$ coefficient 1 |
| 4.4 | A Line and a Circle | Distance from centre vs radius decides 0, 1 or 2 meeting points | Chord length $2\sqrt{r^2 - d^2}$, tangency condition $c^2 = a^2(1 + m^2)$ for $y = mx + c$ and $x^2 + y^2 = a^2$ (and for a general circle), line touching a circle with a parameter, chord subtending a given angle at the centre. `slc-circle-lab` (mode `line`). Misconception: substituting and checking only $D \ge 0$ without the distance picture |
| 4.5 | Tangents | Tangent at a point: $T = 0$; tangent of slope $m$: $y = mx \pm a\sqrt{1 + m^2}$ | Derivation of $T = 0$ (radius ⟂ tangent), tangents of a given slope to a general circle, tangents from an external point (slope method), length of the tangent $\sqrt{S_1}$, pair of tangents $SS_1 = T^2$, angle between the tangents. `slc-circle-lab` (mode `tangents`). Misconception: using $T = 0$ for a point not on the circle and calling it a tangent |
| 4.6 | Normals | A normal passes through the centre | Normal at a point, normals through a point, shortest distance from a point/line to a circle, JEE problems combining tangents and normals. `slc-circle-lab` (mode `circle`, normal). Misconception: normal slope $= -\frac{1}{\text{tangent slope}}$ applied to the wrong tangent |
| 4.7 | Chapter 4 Mastery | Reconstruct every circle formula from "distance = radius" | Mixed JEE problems |

## Chapter 5: Chords and Systems of Circles

**Purpose:** use $T$, $S_1$ and $S$ as building blocks: chords with a given midpoint, chord of contact, pole and polar, director circle; two circles (positions, common tangents, common chord, orthogonality); families and the radical axis.

| Lesson | Topic | Core idea | Planned content |
| ------ | ----- | --------- | --------------- |
| 5.1 | Chord With a Given Midpoint and Chord of Contact | Midpoint chord: $T = S_1$; chord of contact: $T = 0$ | Derivation of both, length of the chord of contact $\frac{2LR}{\sqrt{L^2 + R^2}}$, area of the triangle formed by tangents and chord of contact $\frac{RL^3}{R^2 + L^2}$, locus of midpoints of chords (through a point, of given length, subtending a right angle). `slc-circle-lab` (mode `tangents`). Misconception: $T = 0$ for the midpoint chord |
| 5.2 | Pole and Polar; the Director Circle | The polar of $P$ is $T = 0$ whatever the position of $P$ | Polar of a point, pole of a line, conjugate points and lines, the polar of an external point is its chord of contact, director circle $x^2 + y^2 = 2a^2$ (perpendicular tangents). Misconception: "a polar exists only for external points" |
| 5.3 | Two Circles and Their Common Tangents | Compare $d$ with $r_1 + r_2$ and $\lvert r_1 - r_2\rvert$ | Five relative positions and 4/3/2/1/0 common tangents, centres of similitude dividing $C_1C_2$ in $r_1 : r_2$, equations of direct and transverse common tangents, lengths $\sqrt{d^2 - (r_1 - r_2)^2}$ and $\sqrt{d^2 - (r_1 + r_2)^2}$. `slc-circle-lab` (mode `two-circles`). Misconception: counting 2 tangents for touching circles |
| 5.4 | Common Chord, Angle of Intersection and Orthogonal Circles | $S - S' = 0$; orthogonal iff $2g_1g_2 + 2f_1f_2 = c_1 + c_2$ | Common chord and its length, angle of intersection $\cos\theta = \frac{r_1^2 + r_2^2 - d^2}{2r_1r_2}$, orthogonality derived from $d^2 = r_1^2 + r_2^2$, circle orthogonal to two given circles. Misconception: needing $c_1 = c_2$ |
| 5.5 | Families of Circles | $S + \lambda L = 0$ and $S + \lambda S' = 0$ are every circle through the meeting points | Circle through the meeting points of a circle and a line, of two circles, circle through two points ($(x - x_1)(x - x_2) + (y - y_1)(y - y_2) + \lambda L = 0$), circles touching a line at a point ($(x - x_1)^2 + (y - y_1)^2 + \lambda L = 0$), smallest circle through two points. Misconception: $S + \lambda S' = 0$ with $\lambda = -1$ is not a circle |
| 5.6 | Radical Axis and Radical Centre | Equal powers: $S = S'$ | Power of a point, radical axis perpendicular to the line of centres, radical centre of three circles, circle orthogonal to three circles, coaxal systems in brief. `slc-circle-lab` (mode `three-circles`). Misconception: radical axis passes through the midpoint of the centres |
| 5.7 | Chapter 5 Mastery | Reconstruct chord, tangent and family results from $S$, $S_1$, $T$ | Mixed JEE Main/Advanced circle problems |
