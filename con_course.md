# Course: Conic Sections, Parabola, Ellipse and Hyperbola

**Slug:** `conic-sections` (a course alongside `straight-lines-circles`, `complex-numbers-quadratics` and `vector-algebra`; same block schema, same seed-script pattern). Content prefix `con`: files `src/modules/content/con-chapter-N-content.ts`, exports `conChapterNLessons`, question ids `conN-M-qK`, worked examples `conN-M-weK`. Course title in the catalog: **"Conic Sections: Parabola, Ellipse and Hyperbola"**.

**Purpose:** Conic sections are a guaranteed part of JEE Main and Advanced: every paper has a parabola, ellipse or hyperbola question, usually a tangent, normal or chord question dressed up with a locus or a maximum. This course builds the three curves from one idea (a point whose distance from a focus is $e$ times its distance from a directrix), derives every standard form and property from it, and then runs the tangent–normal–chord machinery (already met for the circle in `straight-lines-circles`) on each conic until the student can reconstruct any result from $S$, $S_1$ and $T$.

**Builds on, does not repeat:** distance formula, slope, the line forms, the perpendicular distance $\frac{\lvert ax_1 + by_1 + c\rvert}{\sqrt{a^2 + b^2}}$ and the pair of straight lines from `straight-lines-circles` Ch 0–3; the circle notation $S$, $S_1$, $T$ (tangent $T = 0$, chord with midpoint $T = S_1$, chord of contact $T = 0$, pair of tangents $SS_1 = T^2$) from Ch 4–5 of that course; the quadratic discriminant from `complex-numbers-quadratics`; $\sin$, $\cos$, $\sec$, $\tan$ identities from `trigonometry`.

**End state:** Given any conic question, the student can reconstruct the answer from

```text
focus-directrix   PS = e·PM:  e = 0 circle, 0 < e < 1 ellipse, e = 1 parabola, e > 1 hyperbola
general 2nd deg   ax²+2hxy+by²+2gx+2fy+c = 0, Δ = abc+2fgh−af²−bg²−ch²
                  Δ = 0: pair of lines;  Δ ≠ 0: h² < ab ellipse (circle if a = b, h = 0), = parabola, > hyperbola
parabola  y²=4ax  S(a,0), x = −a, LR 4a, SP = a + x, P(at², 2at), focal chord t₁t₂ = −1
                  tangent y = mx + a/m, ty = x + at²; normal y = mx − 2am − am³, y + tx = 2at + at³
ellipse           x²/a²+y²/b² = 1, b² = a²(1−e²), S(±ae,0), x = ±a/e, LR 2b²/a, SP = a ∓ ex, P(a cosθ, b sinθ)
hyperbola         x²/a²−y²/b² = 1, b² = a²(e²−1), asymptotes y = ±(b/a)x, P(a secθ, b tanθ), |SP − S'P| = 2a
                  rectangular xy = c²: P(ct, c/t), e = √2
every conic       tangent at P: T = 0; chord with midpoint: T = S₁; chord of contact: T = 0; pair of tangents: SS₁ = T²
                  y = mx + c touches: c = a/m (parabola), c² = a²m² ± b² (ellipse / hyperbola)
                  director circle: x = −a (parabola), x²+y² = a² ± b²
```

**Three threads run through every chapter**
1. **Picture first:** every result is seen before it is derived: the eccentricity slider morphing a circle into an ellipse, a parabola and a hyperbola with the focus, directrix and $PS = e \cdot PM$ live (`con-conic-explorer`), and a tangent–normal lab on each conic with draggable parameter and external point (`con-tangent-lab`).
2. **One definition, one machine:** every standard form comes from $PS = e \cdot PM$ or from the two-focus definition, and every tangent, chord and pair-of-tangents equation comes from the same $S$, $S_1$, $T$ substitution rule used for the circle; formulas are never stated cold.
3. **JEE pay-off:** every lesson ends with JEE Main / Advanced style questions (single correct, multiple correct, numerical) written in our own words, and every chapter ends with a "reconstruct it" mastery lesson.

---

## Chapter map

| Ch | Slug | Title | Core idea |
| -- | ---- | ----- | --------- |
| 0 | `slicing-the-cone` | Slicing the Cone | One definition $PS = e \cdot PM$ gives all conics; the general second-degree equation is classified by $h^2 - ab$ and $\Delta$ |
| 1 | `the-parabola` | The Parabola | $e = 1$: $y^2 = 4ax$, its four orientations, focal distance $a + x$, the parameter $(at^2, 2at)$ and focal chords |
| 2 | `parabola-tangents-normals-chords` | Parabola: Tangents, Normals and Chords | $T = 0$, $y = mx + \frac am$, $y = mx - 2am - am^3$, chord of contact, midpoint chord and the classic properties |
| 3 | `the-ellipse` | The Ellipse | $SP + S'P = 2a$: $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$, $b^2 = a^2(1 - e^2)$, the auxiliary circle and the eccentric angle |
| 4 | `the-hyperbola` | The Hyperbola | $\lvert SP - S'P\rvert = 2a$: $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$, asymptotes, the conjugate and the rectangular hyperbola |
| 5 | `ellipse-hyperbola-tangents-normals` | Tangents, Normals and Chords for Ellipse and Hyperbola | $c^2 = a^2m^2 \pm b^2$; the same $T$, $S_1$ machine for every conic; one comparison table |

---

## Chapter 0: Slicing the Cone

**Purpose:** where conics come from and how to recognise one: sections of a double cone, the focus–directrix definition with eccentricity, writing a conic from a focus and a directrix, the general second-degree equation with $h^2 - ab$ and $\Delta$, and shifting a conic to standard position.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 0.1 | `sections-of-a-double-cone` | Sections of a Double Cone | The tilt of the cutting plane against the cone decides the curve | Double cone (axis, vertex, generators, semi-vertical angle $\alpha$), plane at angle $\beta$ with the axis: $\beta = 90^\circ$ circle, $\alpha < \beta < 90^\circ$ ellipse, $\beta = \alpha$ parabola, $\beta < \alpha$ hyperbola (cuts both nappes); plane through the vertex gives a point, a line or a pair of lines (degenerate conics); $e = \frac{\cos\beta}{\cos\alpha}$ as a preview. `con-conic-explorer` (mode `cone`). Misconception: "the hyperbola is two parabolas" |
| 0.2 | `focus-directrix-and-eccentricity` | Focus, Directrix and Eccentricity | A conic is the locus of $P$ with $PS = e \cdot PM$ | Definition, focus, directrix, eccentricity, axis, vertex; classification by $e$; the circle as the limit $e \to 0$; latus rectum through the focus; deriving the polar picture $r = \frac{\ell}{1 - e\cos\theta}$ only as a picture (no polar coordinates needed). `con-conic-explorer` (mode `focus-directrix`). Misconception: "$e$ measures how big the conic is" |
| 0.3 | `conic-from-focus-and-directrix` | A Conic From a Focus and a Directrix | Square $PS = e \cdot PM$ with the perpendicular distance formula | $(x - \alpha)^2 + (y - \beta)^2 = e^2\frac{(ax + by + c)^2}{a^2 + b^2}$; examples with axis-parallel and slanted directrices; the axis is the perpendicular from the focus to the directrix; vertex as the point dividing focus–foot in $1 : e$ (and $1 : -e$); reading off $e$ from a given locus. Misconception: "forgetting to divide by $a^2 + b^2$" |
| 0.4 | `general-second-degree-equation` | The General Second-Degree Equation | $\Delta$ says degenerate or not; $h^2 - ab$ says which conic | $ax^2 + 2hxy + by^2 + 2gx + 2fy + c = 0$, $\Delta = abc + 2fgh - af^2 - bg^2 - ch^2$ (the $3 \times 3$ determinant); $\Delta = 0$: pair of lines (real, coincident or imaginary), $\Delta \ne 0$: circle ($a = b$, $h = 0$), parabola ($h^2 = ab$), ellipse ($h^2 < ab$), hyperbola ($h^2 > ab$), rectangular hyperbola ($a + b = 0$); finding $\lambda$ for a pair of lines; the point-ellipse and empty cases. Misconception: "$h^2 < ab$ always gives a real ellipse" |
| 0.5 | `shifting-to-standard-position` | Shifting to Standard Position | Complete the squares: a translated conic is a standard one with a new origin | Translation of axes $X = x - h$, $Y = y - k$; completing squares for equations without $xy$; reading centre/vertex, axes, $e$ from the shifted form; the rotation that removes $xy$ ($\tan 2\theta = \frac{2h}{a - b}$) as a short preview; $\Delta$ and $h^2 - ab$ unchanged by translation. Misconception: "shifting changes the eccentricity" |
| 0.6 | `chapter-0-mastery` | Chapter 0 Mastery | Classify any conic from its definition or equation | Mixed JEE-style questions on $e$, focus–directrix loci, $\Delta$, $h^2 - ab$, standard position |

## Chapter 1: The Parabola

**Purpose:** the parabola $e = 1$ from its definition to focal chords: the standard form and its parts, the four orientations, focal distance, parametric form, focal chords, shifted parabolas and the reflective property.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 1.1 | `standard-parabola` | The Standard Parabola | $PS = PM$ with $S(a, 0)$ and $x = -a$ gives $y^2 = 4ax$ | Derivation, focus, directrix, vertex, axis, latus rectum ($4a$, ends $(a, \pm 2a)$), symmetry, the curve opening away from the directrix, tangent at the vertex, double ordinate; points inside/outside by the sign of $y_1^2 - 4ax_1$ (preview). `con-tangent-lab` (parabola, focus + directrix + latus rectum). Misconception: "the focus lies on the curve" |
| 1.2 | `four-standard-forms` | Four Standard Forms | Swap $x$ and $y$ or change a sign to turn the parabola | $y^2 = \pm 4ax$, $x^2 = \pm 4ay$: focus, directrix, axis, LR, vertex in one table; identifying the form from an equation like $3x^2 = -8y$; parabolas with given focus and vertex. Misconception: "$x^2 = 4ay$ opens sideways" |
| 1.3 | `focal-distance-and-parametric-form` | Focal Distance and Parametric Form | $SP = PM = a + x$; every point is $(at^2, 2at)$ | Focal distance $a + x_1$ (and $a + y_1$ etc. for other forms), $(at^2, 2at)$ and the slope $\frac{1}{t}$ of the tangent preview, chord joining $t_1, t_2$ with slope $\frac{2}{t_1 + t_2}$, points at given focal distance, equilateral triangle inscribed with a vertex at the vertex ($8\sqrt3 a$ side). Misconception: "$t$ is an angle" |
| 1.4 | `focal-chords` | Focal Chords | Ends $t_1$, $t_2$ of a focal chord satisfy $t_1t_2 = -1$ | Derivation from collinearity, the other end $(\frac{a}{t^2}, -\frac{2a}{t})$, length $a(t + \frac1t)^2$, the latus rectum is the shortest focal chord, $\frac{1}{SP} + \frac{1}{SQ} = \frac{1}{a}$ (semi-latus rectum is the harmonic mean), circle on a focal chord as diameter touches the directrix. Misconception: "every chord through the axis is a focal chord" |
| 1.5 | `shifted-parabolas` | Shifted Parabolas | $(y - k)^2 = 4a(x - h)$ is $y^2 = 4ax$ moved to vertex $(h, k)$ | Completing the square for $y = px^2 + qx + r$ and $x = py^2 + qy + r$, vertex, focus, directrix, LR of shifted parabolas, parabola from focus and directrix that are not axis-parallel ($PS^2 = PM^2$ via the distance formula), the slanted parabola $\sqrt{x} + \sqrt{y} = \sqrt{a}$ as a recognition exercise. Misconception: "the focus of $y = x^2$ is at $(0, 1)$" |
| 1.6 | `reflective-property` | The Reflective Property | The tangent at $P$ bisects the angle between $SP$ and the line through $P$ parallel to the axis | Statement, proof via $ST = SP$ (tangent meets the axis at $T(-at^2, 0)$), satellite dishes, headlights, solar cookers; rays parallel to the axis pass through the focus after reflection; JEE-type: a ray along $y = k$ reflects through the focus, find the reflected ray. `con-tangent-lab` (focal radius + tangent). Misconception: "every ray reflects through the focus" |
| 1.7 | `chapter-1-mastery` | Chapter 1 Mastery | Reconstruct the parabola from $PS = PM$ | Mixed JEE Main / Advanced style parabola questions |

## Chapter 2: Parabola: Tangents, Normals and Chords

**Purpose:** the full tangent–normal–chord toolkit for $y^2 = 4ax$, derived once from $T$, $S_1$ and the parameter, ending with the classic properties and JEE problem types.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 2.1 | `point-and-line-with-a-parabola` | A Point and a Line With a Parabola | Sign of $S_1 = y_1^2 - 4ax_1$; a line meets a parabola where a quadratic has roots | Position of a point (inside, on, outside), intersection of $y = mx + c$ with $y^2 = 4ax$, discriminant gives tangency $c = \frac{a}{m}$, lines parallel to the axis meet once, length of a chord cut by a line. Misconception: "a line meeting the parabola once is a tangent" |
| 2.2 | `tangents-to-a-parabola` | Tangents to a Parabola | Point form $yy_1 = 2a(x + x_1)$, parametric $ty = x + at^2$, slope $y = mx + \frac am$ | Derivation of each, the $T = 0$ substitution rule, point of contact $(\frac{a}{m^2}, \frac{2a}{m})$, intersection of tangents at $t_1, t_2$ is $(at_1t_2, a(t_1 + t_2))$, tangents from an external point ($hm^2 - km + a = 0$), common tangent of a parabola and a circle/parabola, tangents for $x^2 = 4ay$ ($y = mx - am^2$). `con-tangent-lab` (tangent, pair of tangents). Misconception: "$y = mx + \frac am$ works for every parabola" |
| 2.3 | `normals-to-a-parabola` | Normals to a Parabola | $y = mx - 2am - am^3$; the normal at $t_1$ meets again at $t_2 = -t_1 - \frac{2}{t_1}$ | Point, parametric $y + tx = 2at + at^3$ and slope forms, foot $(am^2, -2am)$, normal chord, three normals from a point ($am^3 + (2a - h)m + k = 0$): co-normal points, $m_1 + m_2 + m_3 = 0$, sum of ordinates zero, centroid on the axis, three real normals need $h > 2a$; shortest distance between a parabola and a line via a common normal. `con-tangent-lab` (normal). Misconception: "the normal slope is $-t$ for every form" |
| 2.4 | `chords-of-a-parabola` | Chord of Contact, Midpoint Chords and Pair of Tangents | $T = 0$, $T = S_1$, $SS_1 = T^2$ | Chord joining $t_1, t_2$: $2x - (t_1 + t_2)y + 2at_1t_2 = 0$, chord of contact from $(h, k)$: $ky = 2a(x + h)$, chord with midpoint $(h, k)$: $T = S_1$ with slope $\frac{2a}{k}$, locus of midpoints of focal chords / parallel chords, pair of tangents $SS_1 = T^2$, area of the triangle formed by the tangents and the chord of contact $\frac{(k^2 - 4ah)^{3/2}}{2a}$. `con-tangent-lab` (chord of contact, midpoint chord). Misconception: "chord of contact and polar are different lines" |
| 2.5 | `classic-parabola-properties` | Classic Properties | Tangents at the ends of a focal chord meet at right angles on the directrix | Perpendicular tangents meet on the directrix (director circle of a parabola is its directrix), foot of the perpendicular from the focus to any tangent lies on the tangent at the vertex, $ST = SP = SG$ (tangent and normal meet the axis), subtangent $2x_1$ and subnormal $2a$, the portion of a tangent between the point of contact and the directrix subtends a right angle at the focus, circle through the meeting point of two tangents and the focus. Misconception: "perpendicular tangents meet on the latus rectum" |
| 2.6 | `jee-parabola-problems` | JEE Parabola Problems | Parameterise, then use $t_1t_2$, $t_1 + t_2$ | Loci (midpoints, feet of perpendiculars, points of intersection of tangents), common tangents of $y^2 = 4ax$ and $x^2 = 4by$, of a parabola and a circle, minimum distance problems, triangle with vertices on a parabola (area $a^2\lvert(t_1 - t_2)(t_2 - t_3)(t_3 - t_1)\rvert$, the triangle formed by the tangents at those points has half that area), PYQ-style multi-correct. Misconception: "the locus is the curve you drew from two positions" |
| 2.7 | `chapter-2-mastery` | Chapter 2 Mastery | Reconstruct the parabola toolkit from $T$, $S_1$ and $t$ | Mixed JEE Main / Advanced style questions |

## Chapter 3: The Ellipse

**Purpose:** the ellipse from the two-pin definition to its parametric form: standard form, the relation $b^2 = a^2(1 - e^2)$, foci, directrices, latus rectum, focal distances, auxiliary circle and eccentric angle, and shifted ellipses.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 3.1 | `ellipse-as-a-locus` | The Ellipse as a Locus | $SP + S'P = 2a$: a string tied to two pins | Two-focus definition, derivation of $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ with $b^2 = a^2 - c^2$, why $2a > SS'$ (equality gives the segment), the same curve from $PS = e \cdot PM$ with $e = \frac ca$, $\lvert z - z_1\rvert + \lvert z - z_2\rvert = 2a$ link. `con-tangent-lab` (ellipse, focal radii). Misconception: "any $\frac{x^2}{p} + \frac{y^2}{q} = 1$ is an ellipse" |
| 3.2 | `standard-ellipse-and-its-parts` | The Standard Ellipse and Its Parts | $b^2 = a^2(1 - e^2)$ ties the shape to $e$ | Centre, major and minor axes, vertices, foci $(\pm ae, 0)$, directrices $x = \pm\frac ae$, latus rectum $\frac{2b^2}{a}$, $e = \sqrt{1 - \frac{b^2}{a^2}}$, the ellipse with major axis on the $y$-axis ($b > a$), finding the equation from foci/vertices/LR/$e$; $e \to 0$ circle, $e \to 1$ flat. `con-conic-explorer`. Misconception: "$a$ is always the denominator under $x^2$" |
| 3.3 | `focal-distances-of-an-ellipse` | Focal Distances | $SP = a - ex_1$, $S'P = a + ex_1$ | Derivation from the directrices, sum $2a$ checked, maximum and minimum focal distance $a(1 \pm e)$, perimeter of triangle $PSS'$ $= 2a + 2ae$, maximum area of $\triangle PSS'$ is $abe$ (at the ends of the minor axis), point where the focal radii are perpendicular ($e \ge \frac{1}{\sqrt2}$). Misconception: "$SP = a + ex$ for the focus at $(ae, 0)$" |
| 3.4 | `auxiliary-circle-and-eccentric-angle` | Auxiliary Circle and Eccentric Angle | $P = (a\cos\theta, b\sin\theta)$: squash the auxiliary circle by $\frac ba$ | Auxiliary circle $x^2 + y^2 = a^2$, eccentric angle vs polar angle ($\tan\phi = \frac ba\tan\theta$), parametric form, chord joining $\theta$ and $\phi$: $\frac xa\cos\frac{\theta + \phi}{2} + \frac yb\sin\frac{\theta + \phi}{2} = \cos\frac{\theta - \phi}{2}$, focal chord condition $\tan\frac\theta2\tan\frac\phi2 = \frac{e - 1}{e + 1}$, area $\pi ab$ and the area-ratio picture, maximum area of an inscribed rectangle $2ab$. `con-tangent-lab` (auxiliary circle). Misconception: "the eccentric angle is the angle $OP$ makes with the $x$-axis" |
| 3.5 | `shifted-ellipses` | Shifted Ellipses and the General Equation | Complete the squares to find the centre, then read off $a$, $b$, $e$ | $\frac{(x - h)^2}{a^2} + \frac{(y - k)^2}{b^2} = 1$, completing squares, foci and directrices of a shifted ellipse, ellipse from a focus and a slanted directrix (the locus equation, latus rectum $= 2ep$ and the vertex ratio only, no rotation of axes), point ellipse and empty cases, position of a point (sign of $S_1$). Misconception: "the foci of a shifted ellipse are still $(\pm ae, 0)$" |
| 3.6 | `chapter-3-mastery` | Chapter 3 Mastery | Reconstruct the ellipse from $SP + S'P = 2a$ | Mixed JEE Main / Advanced style ellipse questions |

## Chapter 4: The Hyperbola

**Purpose:** the hyperbola from $\lvert SP - S'P\rvert = 2a$: standard form, $b^2 = a^2(e^2 - 1)$, foci, directrices, latus rectum, focal distances, asymptotes, the conjugate hyperbola and the rectangular hyperbola in both forms.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 4.1 | `hyperbola-as-a-locus` | The Hyperbola as a Locus | $\lvert SP - S'P\rvert = 2a < SS'$ gives two branches | Derivation of $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$ with $b^2 = c^2 - a^2$, why two branches (sign of the difference), the case $2a = SS'$ (two rays), $\lvert z - z_1\rvert - \lvert z - z_2\rvert = k$ gives one branch only, transverse and conjugate axes. `con-tangent-lab` (hyperbola, focal radii). Misconception: "$b < a$ for a hyperbola" |
| 4.2 | `hyperbola-and-its-parts` | Parts of a Hyperbola | $b^2 = a^2(e^2 - 1)$; foci $(\pm ae, 0)$, directrices $x = \pm \frac ae$ | Vertices, foci, directrices, latus rectum $\frac{2b^2}{a}$, focal distances $SP = ex_1 - a$, $S'P = ex_1 + a$ on the right branch, parametric $(a\sec\theta, b\tan\theta)$ and $(a\cosh u, b\sinh u)$ mention, hyperbola with transverse axis on the $y$-axis, finding the equation from data. Misconception: "the directrix lies outside the curve, as for an ellipse" |
| 4.3 | `asymptotes` | Asymptotes | The hyperbola hugs $y = \pm\frac ba x$ far out | Why the gap $\frac ba(x - \sqrt{x^2 - a^2}) \to 0$, the pair of asymptotes $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 0$, angle between the asymptotes $\theta = 2\tan^{-1}\frac ba$ (the angle containing the curve) with $e = \sec\frac\theta2$, hyperbola, asymptotes and conjugate differ only in the constant, asymptotes of a general hyperbola (find $\lambda$ that makes $S + \lambda = 0$ a line pair), product of perpendiculars from a point on the hyperbola to the asymptotes $\frac{a^2b^2}{a^2 + b^2}$. `con-tangent-lab` (asymptotes). Misconception: "a curve never meets its asymptote" |
| 4.4 | `conjugate-hyperbola` | The Conjugate Hyperbola | Swap the roles of the axes: $-\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ | Conjugate hyperbola, its foci and $e'$, $\frac{1}{e^2} + \frac{1}{e'^2} = 1$, the four foci are concyclic, shifted hyperbolas by completing squares, identifying a hyperbola from a general equation (with $h^2 > ab$), position of a point. Misconception: "the conjugate hyperbola is the reflection in $y = x$" |
| 4.5 | `rectangular-hyperbola` | The Rectangular Hyperbola | $a = b$: $e = \sqrt2$, perpendicular asymptotes; rotated, it is $xy = c^2$ | $x^2 - y^2 = a^2$, rotation by $45^\circ$ to $xy = \frac{a^2}{2}$, $xy = c^2$ with parametric $(ct, \frac ct)$, vertices $(\pm c, \pm c)$, foci $(\pm\sqrt2 c, \pm\sqrt2 c)$, directrices $x + y = \pm\sqrt2 c$, LR $2\sqrt2c$, chord joining $t_1, t_2$: $x + t_1t_2y = c(t_1 + t_2)$, $\frac{1}{x}$ and Boyle's law as everyday examples, the shifted form $(x - h)(y - k) = c^2$ from $y = \frac{px + q}{rx + s}$, orthocentre of a triangle inscribed in $xy = c^2$ lies on it. `con-tangent-lab` (rectangular). Misconception: "$xy = c^2$ has $e = 2$" |
| 4.6 | `chapter-4-mastery` | Chapter 4 Mastery | Reconstruct the hyperbola from $\lvert SP - S'P\rvert = 2a$ | Mixed JEE Main / Advanced style hyperbola questions |

## Chapter 5: Tangents, Normals and Chords for Ellipse and Hyperbola

**Purpose:** carry the tangent machine to the ellipse and hyperbola: the condition of tangency, every form of tangent and normal, the director circle, chord of contact, midpoint chords and pairs of tangents, one comparison table for all conics, and the JEE mixed problems that use them.

| Lesson | Slug | Topic | Core idea | Planned content |
| ------ | ---- | ----- | --------- | --------------- |
| 5.1 | `line-meeting-ellipse-or-hyperbola` | A Line Meeting an Ellipse or Hyperbola | Substitute and use the discriminant: $c^2 = a^2m^2 \pm b^2$ | Position of a point ($S_1$), intersection of $y = mx + c$ with each curve, tangency conditions $c^2 = a^2m^2 + b^2$ and $c^2 = a^2m^2 - b^2$, slope-form tangents $y = mx \pm \sqrt{a^2m^2 \pm b^2}$ and their points of contact, no tangent to the hyperbola with $\lvert m\rvert \le \frac ba$ (asymptote directions), condition for $lx + my + n = 0$ to touch ($a^2l^2 \pm b^2m^2 = n^2$). Misconception: "a line meeting a hyperbola once is a tangent" |
| 5.2 | `tangents-to-ellipse-and-hyperbola` | Tangents in Point and Parametric Form | $T = 0$: $\frac{xx_1}{a^2} \pm \frac{yy_1}{b^2} = 1$ | Point form, parametric $\frac xa\cos\theta + \frac yb\sin\theta = 1$ and $\frac xa\sec\theta - \frac yb\tan\theta = 1$, tangent to $xy = c^2$: $x + t^2y = 2ct$, intersection of tangents at $\theta, \phi$, intercepts on the axes and the minimum intercept $a + b$, tangents from an external point (quadratic in $m$), product of perpendiculars from the foci on a tangent $= b^2$, reflective property of the ellipse and the hyperbola (tangent bisects the angle between focal radii). `con-tangent-lab` (tangent, focal radii). Misconception: "the tangent at $\theta$ makes angle $\theta$ with the axis" |
| 5.3 | `normals-to-ellipse-and-hyperbola` | Normals | $\frac{a^2x}{x_1} - \frac{b^2y}{y_1} = a^2 - b^2$ (ellipse) | Point form for ellipse and hyperbola, parametric $ax\sec\theta - by\csc\theta = a^2 - b^2$ and $ax\cos\theta + by\cot\theta = a^2 + b^2$, slope form $y = mx \mp \frac{(a^2 - b^2)m}{\sqrt{a^2 + b^2m^2}}$, normal to $xy = c^2$ ($xt^3 - yt = ct^4 - c$) and meeting again at $t' = -\frac{1}{t^3}$, four normals from a point (conormal points), normal through the end of the latus rectum passing through an end of the minor axis ($e^4 + e^2 = 1$). `con-tangent-lab` (normal). Misconception: "the normal passes through the centre" |
| 5.4 | `director-circle-and-chords` | Director Circle, Chord of Contact and Midpoint Chords | Perpendicular tangents meet on $x^2 + y^2 = a^2 \pm b^2$ | Director circle derivation from the slope-form tangents, $a < b$ hyperbola has no director circle, chord of contact $T = 0$, chord with given midpoint $T = S_1$, pair of tangents $SS_1 = T^2$, locus of midpoints of parallel chords (diameter $y = -\frac{b^2}{a^2m}x$), conjugate diameters $m_1m_2 = -\frac{b^2}{a^2}$ in brief, chord of contact subtending a right angle. `con-tangent-lab` (director circle, chord of contact, pair of tangents, midpoint chord). Misconception: "the director circle is the auxiliary circle" |
| 5.5 | `comparing-all-conics` | All Conics Side by Side and JEE Mixed Problems | One table: $S$, $S_1$, $T$, tangency condition, director circle, parametric point | Comparison table across circle, parabola, ellipse, hyperbola, rectangular hyperbola; common tangents of two conics (ellipse and circle, parabola and ellipse), loci of poles and feet of perpendiculars (foot of perpendicular from a focus on a tangent lies on the auxiliary circle), maximum area problems with the eccentric angle, confocal conics cutting at right angles, PYQ-style multi-correct. Misconception: "each conic needs its own memorised formula sheet" |
| 5.6 | `chapter-5-mastery` | Chapter 5 Mastery | Course-wide reconstruction | PYQ-style mastery across the whole course, multiple-correct and numerical type |

---

## Engineering work this course needs

Existing interactives either plot functions $y = f(x)$ (not closed curves or both branches) or draw circles only (`slc-circle-lab`), so two new components carry the course. Pure geometry lives in `components/interactives/con-geometry.ts`; the shared $xy$-plane canvas in `con-plane.tsx`.

| Component | Used in | What it does |
| --------- | ------- | ------------ |
| `con-conic-explorer` | 0.1, 0.2, 0.3, 0.5, 3.2, 4.2 | Mode `focus-directrix`: focus $S$ at the origin, directrix $x = -\frac{\ell}{e}$; an $e$ slider morphs circle → ellipse → parabola → hyperbola at fixed semi-latus rectum $\ell$; a point $P$ (polar angle $\theta$ at $S$) shows $PS$, $PM$ and $\frac{PS}{PM} = e$; optional second focus, centre, latus rectum. Mode `cone`: side view of a double cone (semi-vertical angle $\alpha$) cut by a plane at angle $\beta$ to the axis and offset from the vertex: names the section (including degenerate ones) and shows $e = \frac{\cos\beta}{\cos\alpha}$ with the resulting curve |
| `con-tangent-lab` | 1.1, 1.4, 1.6, 2.2, 2.3, 2.4, 2.5, 3.1, 3.3, 3.4, 4.1, 4.3, 4.5, 5.1, 5.2, 5.3, 5.4 | A chosen conic ($y^2 = 4ax$, ellipse, hyperbola, $xy = c^2$) with sliders for $a$, $b$ and the parameter of $P$; overlays: tangent, normal (and where it meets the curve again), focus/foci, directrix(es), latus rectum, focal chord, focal radii, auxiliary circle, director circle, asymptotes; a draggable point $Q$ for chord of contact $T = 0$, pair of tangents and the chord with midpoint $Q$ ($T = S_1$). Readouts: $P$, tangent and normal equations, $S_1$ at $Q$ and how many tangents $Q$ sends |

## Seeding

`scripts/seed-conic-sections.ts` seeds the course (title "Conic Sections: Parabola, Ellipse and Hyperbola"). Content tests: `tests/con-course-content.test.ts`.
