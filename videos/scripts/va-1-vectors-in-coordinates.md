# Vectors in Coordinates — Explainer Script

- **Course:** Vector Algebra
- **Chapter:** Chapter 1 · Vectors in Coordinates (id: `va-1-vectors-in-coordinates`)
- **Scene class:** `VaCh1Video` in `videos/scenes/va-1-vectors-in-coordinates.py`
- **Target runtime:** about 5 minutes (roughly 920 spoken words at Samantha's default ~175 wpm; rendered 4:58)

**Learning goal.** The learner pins free arrows to an origin and a grid so that they become numbers. They see a position vector as the arrow from O to a point and derive, from the triangle law, that vector AB is b minus a ("tip minus tail"). They write any plane vector as x i + y j in exactly one way, read components as signed steps (x = r cos θ, y = r sin θ), and add and scale component-wise. In space they use right-handed axes and k hat, and they find length by Pythagoras twice, giving √(x² + y² + z²). They normalise a vector to get its unit vector, build a vector of a given length along a direction, and test equality and parallelism through components. They treat direction cosines as the components of the unit vector (so l² + m² + n² = 1), and direction ratios as any multiple of those. Named traps: "AB = a − b", "components are lengths, so they can't be negative", "|r| = x + y + z", "i + j is a unit vector", "α + β + γ = 180°" and "direction ratios are unique".

**Global style (all scenes):** light background (`BG` from `videos/lib/strawberry.py`). Colour roles: position vector a = PRIMARY (red), b = SECONDARY (teal), results such as AB and r = PURPLE, i-hat and x-parts = ACCENT (amber), j-hat and y-parts = GREEN, k-hat and z-parts = SECONDARY, highlights = gold `#D19A00`, warnings = PRIMARY with a cross mark or red-bordered card. The 2D pictures are `NumberPlane`s on the left, with the maths on the right. The 3D pictures use an oblique projection (x right, y receding up and to the right, z up), which is right-handed, so nothing needs a 3D camera. Scene headers sit at the top left in MUTED ("1.1 · Position vectors"). Maths uses `MathTex`. The frame is cleared with `FadeOut` between scenes. TTS wording spells symbols out ("vector A B", "b minus a", "root thirteen", "i hat").

The worked numbers match the lessons: A(1, 2), B(4, 6), so AB = (3, 4) (lesson 1.1); r = 2i + 3j + 6k with |r| = 7 (lessons 1.3 and 1.5).

---

## Scene 0 — Title card

**Narration:** Chapter one. Vectors in coordinates.

**Visuals:** kicker "Vector Algebra", title "Chapter 1 · Vectors in Coordinates".

---

## Scene 1 — Hook and position vectors (Lesson 1.1)

**Narration:**

- **Beat a:** In chapter zero, a vector was a free arrow. Slide it anywhere and it stays the same vector. Lovely for pictures, but you cannot calculate with a picture. So fix one point, the origin O, and measure everything from there.
- **Beat b:** Now every point gets its own arrow, the one from O to that point. That arrow is the point's position vector. The position vector of A is vector a, and of B, vector b.
- **Beat c:** What about the arrow from A to B? Walk from O to A, then from A to B. By the triangle law that is the same trip as O straight to B. So a plus A B equals b, and vector A B equals b minus a. Tip minus tail.
- **Beat d:** With A at one, two and B at four, six, vector A B is three, four. End minus start. The common slip is a minus b, but that arrow runs from B back to A, exactly the wrong way.

**Visuals:**

- **Beat a:** Four identical purple free arrows float in empty space, with a card reading "Free arrows: nothing to calculate with". They fade out. A grid (x from −1 to 6, y from −1 to 7) is drawn on the left, and the origin dot O pops in.
- **Beat b:** A definition card at the top right: "position vector of P", `\vec p = \overrightarrow{OP}`. Point A(1,2) appears with a red arrow a from O. Point B(4,6) appears with a teal arrow b.
- **Beat c:** A purple arrow AB grows from A to B. The arrows a, AB and b flash in turn (the two-leg trip, then the direct trip). The equation `\vec a + \overrightarrow{AB} = \vec b` is written, and `\overrightarrow{AB} = \vec b - \vec a` transforms out of it and is boxed.
- **Beat d:** Below the box: `= (4-1,\ 6-2) = (3,\ 4)`. Lower down, `\vec a - \vec b` appears, is crossed out in red, and is labelled "points from B to A".

---

## Scene 2 — Components in the plane (Lesson 1.2)

**Narration:**

- **Beat a:** Put two unit arrows at the origin: i hat, one step along x, and j hat, one step along y.
- **Beat b:** To reach the point three, two, take three steps of i hat, then two steps of j hat. So vector r is three i plus two j. Every vector in the plane is x i plus y j, and in exactly one way. The numbers x and y are its components.
- **Beat c:** If you know the length r and the angle theta instead, drop a perpendicular. The components are r cos theta and r sin theta, straight from trigonometry.
- **Beat d:** Swing the arrow into the second quadrant and x becomes negative. That is not an error. A component is a signed step along an axis, not a length, so minus two just means two steps to the left.
- **Beat e:** And because i and j never mix, adding or scaling vectors is just adding or scaling the matching components.

**Visuals:**

- **Beat a:** A grid (x from −4 to 5, y from −1 to 5). An amber i-hat arrow and a green j-hat arrow grow from O.
- **Beat b:** Three amber unit steps are laid along x, then two green unit steps go up. The purple arrow r runs from O to (3, 2). `\vec r = 3\,\hat i + 2\,\hat j` is written. A card: `\vec r = x\,\hat i + y\,\hat j`, "every plane vector, one way only".
- **Beat c:** The step arrows clear. A live purple arrow of length 3 has a thick amber x-part along the axis and a dashed green y-part. A card reads `x = r\cos\theta,\ y = r\sin\theta`, with live readouts of x and y. The angle sweeps up.
- **Beat d:** The arrow swings into quadrant II until x = −2.00 and y = +2.24. The x readout flashes. A card: "Components are signed, not lengths: -2 is fine".
- **Beat e:** A card: "Add and scale per component", `(3\hat i + 2\hat j) + (\hat i - 5\hat j) = 4\hat i - 3\hat j`, `3(2\hat i - \hat j) = 6\hat i - 3\hat j`.

---

## Scene 3 — Into three dimensions (Lesson 1.3)

**Narration:**

- **Beat a:** Space needs a third axis. The axes are right handed: curl the fingers of your right hand from x towards y, and your thumb points along z. The third unit vector is k hat.
- **Beat b:** A point two, three, six sits at the far corner of a box two by three by six. Its position vector is two i plus three j plus six k.
- **Beat c:** How long is it? Use Pythagoras twice. Across the floor, root of two squared plus three squared, which is root thirteen. Then straight up by six. The length is root of thirteen plus thirty six, root forty nine, which is seven. In general, the length is the root of x squared plus y squared plus z squared.
- **Beat d:** Adding the components gives eleven, which is not seven. The walk along the edges is longer than the diagonal shortcut. And the distance between two points A and B is simply the length of b minus a.

**Visuals:**

- **Beat a:** Oblique axes x, y and z. A card: "Right-handed: curl fingers from x to y, thumb points along z". The unit arrows i, j and k grow from O.
- **Beat b:** A 2 × 3 × 6 box appears, with a lightly filled floor and dashed edges. A purple arrow r runs from O to P(2,3,6). `\vec r = 2\hat i + 3\hat j + 6\hat k` is shown.
- **Beat c:** The gold floor diagonal is labelled √13, with "floor: √(2² + 3²) = √13". The teal vertical edge is labelled 6. Then `|\vec r| = \sqrt{13 + 6^2} = \sqrt{49} = 7`, and the boxed general formula `|\vec r| = \sqrt{x^2 + y^2 + z^2}`.
- **Beat d:** A red warning card: `x + y + z = 11 \ne 7`, "adding components is not the length". Below it: `AB = |\vec b - \vec a|`.

---

## Scene 4 — Unit vectors and component algebra (Lesson 1.4)

**Narration:**

- **Beat a:** A unit vector has length one. It keeps a direction and throws away the size. To get one, divide a vector by its own length. Three i plus four j has length five, so its unit vector is three fifths i plus four fifths j.
- **Beat b:** A trap: i plus j is made of two unit vectors, but its length is root two, not one. And once you have a unit vector, any length is easy. A vector of length ten along a is ten times a hat, six i plus eight j.
- **Beat c:** Two vectors are equal exactly when every component matches. And two vectors are parallel when their components are in proportion. Two i minus three j plus four k, and minus four i plus six j minus eight k, give the same ratio, minus a half, so they are parallel, pointing opposite ways.

**Visuals:**

- **Beat a:** A grid with a red arrow a = 3i + 4j. A unit circle is drawn, and a purple copy shrinks onto it as â. The formula `\hat a = \frac{\vec a}{|\vec a|} = \frac{3\hat i + 4\hat j}{5} = \frac35\hat i + \frac45\hat j` is written.
- **Beat b:** A red-bordered card: `|\hat i + \hat j| = \sqrt{1^2 + 1^2} = \sqrt2 \ne 1`, "so i + j is not a unit vector". Then "length 10 along a: 10 â = 6i + 8j".
- **Beat c:** The length line clears. The equality rule `\vec a = \vec b \iff a_1 = b_1, a_2 = b_2, a_3 = b_3` appears, then the parallel test `\frac{a_1}{b_1} = \frac{a_2}{b_2} = \frac{a_3}{b_3}`, then the example `\frac{2}{-4} = \frac{-3}{6} = \frac{4}{-8} = -\tfrac12` in purple.

---

## Scene 5 — Direction cosines and direction ratios (Lesson 1.5)

**Narration:**

- **Beat a:** Direction can be measured by angles. Vector r makes angles alpha, beta and gamma with the x, y and z axes. Look at gamma. Dropping from P onto the z axis makes a right triangle, with hypotenuse seven and adjacent side six.
- **Beat b:** So cos gamma is six over seven, z over r. The same move on each axis gives the direction cosines l, m and n: two sevenths, three sevenths, six sevenths. They are just the components of the unit vector r hat, which is why their squares always add up to one.
- **Beat c:** A trap: the three angles do not add to one hundred and eighty degrees. Here they add to about one hundred and sixty nine. It is the squares of their cosines that add to one.
- **Beat d:** Any numbers proportional to l, m and n are called direction ratios. Two, three, six works, so does four, six, twelve, so does minus two, minus three, minus six. They are not unique. To get back to cosines, divide by the root of the sum of squares, with a plus or minus sign because the line has two directions.

**Visuals:**

- **Beat a:** Oblique axes with the arrow r to P(2,3,6), labelled "r = 7". The gold triangle O, (0,0,6), P is filled, with a right-angle mark at (0,0,6). γ is marked at O, and the vertical side is labelled 6.
- **Beat b:** On the right, stacked: `\cos\gamma = \frac67 = \frac zr`; `l = \frac27, m = \frac37, n = \frac67`; `\hat r = l\hat i + m\hat j + n\hat k`; and, boxed, `l^2 + m^2 + n^2 = \frac{4+9+36}{49} = 1`.
- **Beat c:** A red card: `\alpha + \beta + \gamma \approx 73.4° + 64.6° + 31.0° = 169°`, "the angles do not add to 180 degrees".
- **Beat d:** The right side clears. `2:3:6 = 4:6:12 = -2:-3:-6`, "direction ratios: any multiple, all valid"; then `l = \pm\frac{a}{\sqrt{a^2+b^2+c^2}}`; then the worked conversion `4:6:12: \sqrt{16+36+144} = 14`, `l, m, n = \pm\frac4{14}, \pm\frac6{14}, \pm\frac{12}{14} = \pm\frac27, \pm\frac37, \pm\frac67`.

---

## Scene 6 — Putting it together (Lesson 1.6 preview)

**Narration:** Put the chapter together on one problem. A is one, two, three and B is three, five, nine. Vector A B is b minus a: two i plus three j plus six k. Its length is root forty nine, seven. Its unit vector is one seventh of it. And its direction cosines are two sevenths, three sevenths and six sevenths.

**Visuals:** Left-aligned rows appear one at a time, each with a MUTED note on the right:
`A(1,2,3), B(3,5,9)` (given) → `\overrightarrow{AB} = \vec b - \vec a = 2\hat i + 3\hat j + 6\hat k` (tip minus tail) → `|\overrightarrow{AB}| = \sqrt{4+9+36} = 7` (Pythagoras twice) → `\hat u = \frac17(2\hat i + 3\hat j + 6\hat k)` (divide by the length) → `l, m, n = \frac27, \frac37, \frac67` (components of the unit vector).

---

## Scene 7 — Recap

**Narration:** That is the chapter. Fix an origin and every arrow becomes numbers. An arrow between points is tip minus tail. Its length is Pythagoras in three dimensions. And its direction lives in the unit vector, whose components are the direction cosines. Next, we use position vectors to divide lines and prove geometry.

**Visuals:** A 2 × 2 grid of cards: **Arrow** `\overrightarrow{AB} = \vec b - \vec a` (red), **Components** `x\hat i + y\hat j + z\hat k` (amber), **Length** `\sqrt{x^2+y^2+z^2}` (purple), **Direction** `\hat r, l^2+m^2+n^2 = 1` (green). A footer reads "Next: dividing lines and proving geometry".
