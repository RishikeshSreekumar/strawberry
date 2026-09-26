# Dividing Lines and Proving Geometry — Explainer Script

- **Course:** Vector Algebra
- **Chapter:** Chapter 2 · Dividing Lines and Proving Geometry (id: `va-2-section-formula-and-geometry`)
- **Target runtime:** about 4.7 minutes (roughly 760 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/va-2-section-formula-and-geometry.py`, class `VaCh2Video`

**Learning goal.** The learner finds any point on a segment with position vectors instead of coordinates. They derive the section formula $\vec p = \frac{n\vec a + m\vec b}{m+n}$ from $\overrightarrow{AP} = \frac{m}{m+n}\overrightarrow{AB}$ and read it as a weighted average in which the nearer point gets the bigger weight. They get external division by replacing $n$ with $-n$, and they see why $m = n$ has no external point. They derive the centroid $\frac{\vec a+\vec b+\vec c}{3}$ and place it $2:1$ from the vertex. They write vectors as linear combinations $x\vec a + y\vec b$, and they know this fails when the two vectors are parallel. They test collinearity with $\overrightarrow{AC} = \lambda\overrightarrow{AB}$, and they prove geometry theorems by translating, computing and translating back.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: A and $\vec a$ = PRIMARY (red), B and $\vec b$ = SECONDARY (teal), the new point P or G = ACCENT (amber), C and the medians = PURPLE, highlights = gold, correct = GREEN, wrong = red cross. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Samantha may read a lone "a" as the article. The narration says "vector a" where it can, and it uses `[[char LTRL]]a[[char NORM]]` (`{LA}` in the code) for a bare "a" in "p minus a" and "a plus c". Segment names are spelled out as letters ("A B", "D E"), and symbols are said as words ("m over m plus n", "minus n", "lambda").

---

## Title card

**Narration:** Chapter two. Dividing lines, and proving geometry.

**Visuals:** `title_card("Vector Algebra", "Chapter 2 · Dividing Lines and Proving Geometry")`.

---

## Scene 1: The bead on the wire (Lesson 2.1, internal section formula)

**Narration:**

- **Beat a:** A bead is threaded on a straight wire from A to B. Slide it two fifths of the way along. Where is it?
- **Beat b:** Cut the wire into five equal parts. The bead has two parts behind it and three ahead, so it divides A B in the ratio two to three. Call that m to n.
- **Beat c:** From a fixed origin O, name every point by its position vector: vector a for A, vector b for B, and the unknown vector p for the bead.
- **Beat d:** A P is the fraction m over m plus n of A B. Write each arrow as head minus tail: p minus a, and b minus a.
- **Beat e:** Solve for p. The section formula: vector p equals n times vector a, plus m times vector b, all over m plus n.
- **Beat f:** Look at the weights. The bead is nearer to A, and A gets the bigger weight, three. The nearer point gets the bigger weight, like the heavier end of a seesaw.
- **Beat g:** So never write m times vector a, plus n times vector b. Test it with m equals one, n equals zero: the bead is at B, and only the correct formula gives b. And with m equal to n, you get the midpoint, vector a plus vector b, over two.

**Visuals:**

- **Beat a:** A grey wire from A (red) to B (teal) on the left half of the frame. An amber bead P slides from A to the 2/5 mark.
- **Beat b:** Four tick marks cut AB into fifths. Braces above the wire are labelled $m = 2$ (A to P) and $n = 3$ (P to B).
- **Beat c:** Origin O at the bottom left. Arrows $\vec a$ (red) and $\vec b$ (teal) are drawn from O, then $\vec p$ (amber) to the bead.
- **Beat d:** On the right, $\overrightarrow{AP} = \frac{m}{m+n}\overrightarrow{AB}$, then $\vec p - \vec a = \frac{m}{m+n}(\vec b - \vec a)$.
- **Beat e:** The boxed result $\vec p = \frac{n\vec a + m\vec b}{m+n}$.
- **Beat f:** Below it, in amber, $\vec p = \frac{3\vec a + 2\vec b}{5}$. Dot A pulses gold.
- **Beat g:** Frame clears. $\frac{m\vec a + n\vec b}{m+n}$ with a red cross beside $\frac{n\vec a + m\vec b}{m+n}$ with a green tick, then $m = n:\ \vec p = \frac{\vec a+\vec b}{2}$.

---

## Scene 2: Outside the segment (Lesson 2.2, external division)

**Narration:**

- **Beat a:** Now let P leave the segment. P divides A B externally in the ratio two to one when it sits on the line, outside, with A P twice P B.
- **Beat b:** You don't need a new idea. Take the internal formula and replace n by minus n. Vector p equals m times vector b, minus n times vector a, all over m minus n.
- **Beat c:** Now push the ratio towards one to one. P runs further and further away, and at exactly one to one it is gone. The formula would divide by zero: no point outside the segment is equally far from A and B.
- **Beat d:** And when m is smaller than n, say one to three, the same formula puts P behind A.

**Visuals:**

- **Beat a:** Header "External division: P outside the segment". A faint full line through A and B, with the segment AB in bold. P (amber) sits beyond B at $2\vec b - \vec a$. AP is highlighted in amber and PB in gold, with $AP : PB = 2 : 1$ below.
- **Beat b:** Highlights clear. Along the top: $\frac{n\vec a + m\vec b}{m+n} \xrightarrow{n\to -n}$ boxed $\vec p = \frac{m\vec b - n\vec a}{m-n}$.
- **Beat c:** A live readout "$m : n = r : 1$" at the bottom left. $r$ runs from 2 down to 1.35 and P slides off the right of the frame. "m = n: no external point" appears in red.
- **Beat d:** The ratio jumps to $1/3$ and P lands behind A. "m < n: P lands behind A" appears.

---

## Scene 3: Where the medians meet (Lesson 2.3, centroid)

**Narration:**

- **Beat a:** A median joins a vertex to the midpoint of the opposite side. Take the median from A to D, the midpoint of B C. So d is b plus c over two.
- **Beat b:** Take the point G that splits this median two to one from A. The section formula gives one times vector a plus two times vector d, over three, which is vector a plus b plus c, over three.
- **Beat c:** That answer does not care which vertex we called A. So the two to one point of every median is the same point, and all three medians pass through it. That point is the centroid.
- **Beat d:** Drag the triangle about and the medians still meet at the average of the three vertices.
- **Beat e:** Careful with the ratio. It is two to one measured from the vertex, so the centroid sits closer to the side, not to the corner.

**Visuals:**

- **Beat a:** Triangle ABC on the left, with D the midpoint of BC and median AD in purple. On the right, $\vec d = \frac{\vec b + \vec c}{2}$.
- **Beat b:** Amber dot G on AD. $\vec g = \frac{1\cdot\vec a + 2\vec d}{3}$, then the boxed $\vec g = \frac{\vec a+\vec b+\vec c}{3}$.
- **Beat c:** The other two medians are drawn and G flashes gold.
- **Beat d:** Vertices A and B move. The medians and G are redrawn live and always stay concurrent.
- **Beat e:** Red two-line note "2 : 1 measured from the vertex: G is closer to the side", then $AG : GD = 2 : 1$ in amber.

---

## Scene 4: Building vectors, testing lines (Lesson 2.4, linear combinations and collinearity)

**Narration:**

- **Beat a:** The section formula builds a point by scaling vector a and vector b and adding. Now let the two scalars be anything. x times vector a, plus y times vector b, is a linear combination.
- **Beat b:** To reach this target, stretch along vector a twice, then along vector b once. Any point of the plane can be reached this way, in exactly one way, as long as vector a and vector b are not parallel.
- **Beat c:** If vector b is just two times vector a, every combination stays on one line. Two parallel vectors cannot build the plane.
- **Beat d:** The same idea tests whether three points lie on a line. A, B and C are collinear exactly when A B is a multiple of A C.
- **Beat e:** Take A at one, two, minus one, B at three, five, one, and C at seven, eleven, five. A B is two, three, two. A C is six, nine, six, which is exactly three times A B. So the points are collinear.
- **Beat f:** In position vectors, the test reads: some combination of vectors a, b and c is zero, with coefficients that add up to zero.

**Visuals:**

- **Beat a:** Header "Linear combinations". $\vec a = (2,1)$ in red and $\vec b = (-1,2)$ in teal from an origin at the bottom left. On the right, $\vec r = x\vec a + y\vec b$.
- **Beat b:** An amber target ring at $2\vec a + \vec b$. A red dashed leg grows along $\vec a$ to $x = 2$, then a teal dashed leg along $\vec b$ to $y = 1$, and the tip lands in the ring. "$x = 2,\ y = 1$" appears.
- **Beat c:** In red: $\vec b = 2\vec a:\ x\vec a + y\vec b = (x+2y)\vec a$.
- **Beat d:** Frame clears. "Collinearity test", then $A, B, C \text{ collinear} \iff \overrightarrow{AC} = \lambda\overrightarrow{AB}$.
- **Beat e:** $A(1,2,-1),\ B(3,5,1),\ C(7,11,5)$, then $\overrightarrow{AB} = (2,3,2)$ and $\overrightarrow{AC} = (6,9,6)$, then $\overrightarrow{AC} = 3\overrightarrow{AB}$ in green with a tick.
- **Beat f:** In amber: $\alpha\vec a + \beta\vec b + \gamma\vec c = \vec 0,\ \alpha+\beta+\gamma = 0$.

---

## Scene 5: Proofs in four lines (Lesson 2.5, proofs with vectors)

**Narration:**

- **Beat a:** Vectors turn geometry proofs into short calculations. The recipe: translate the picture into position vectors, compute, then translate back. Claim: the diagonals of a parallelogram bisect each other.
- **Beat b:** A B C D is a parallelogram, so arrow A B equals arrow D C. Head minus tail: b minus a equals c minus d. Rearrange: a plus c equals b plus d. Divide by two.
- **Beat c:** The left side is the midpoint of A C, the right side is the midpoint of B D. They are the same point. Proved in four lines.
- **Beat d:** A tip: you may put the origin anywhere, so put it at a vertex to kill a variable. For the midpoint theorem, put O at A. The midpoints of A B and A C are half b and half c.
- **Beat e:** So D E is e minus d, which is half of c minus b: half of B C. D E is parallel to B C and half as long.

**Visuals:**

- **Beat a:** Header "Proof: the diagonals of a parallelogram bisect each other". Parallelogram ABCD on the left, with diagonal AC in red and BD in teal.
- **Beat b:** Numbered steps on the right: (1) $\overrightarrow{AB} = \overrightarrow{DC} \Rightarrow \vec b - \vec a = \vec c - \vec d$; (2) $\vec a + \vec c = \vec b + \vec d$; (3) $\frac{\vec a+\vec c}{2} = \frac{\vec b+\vec d}{2}$.
- **Beat c:** An amber dot flashes where the diagonals cross. "4. Same midpoint: the diagonals bisect each other." appears in green.
- **Beat d:** Frame clears. Header "Midpoint theorem, with the origin at A". Triangle with its apex labelled "A = O", D and E the midpoints of AB and AC. On the right, $\vec a = \vec 0,\ \vec d = \tfrac12\vec b,\ \vec e = \tfrac12\vec c$.
- **Beat e:** $\overrightarrow{DE} = \vec e - \vec d = \tfrac12(\vec c - \vec b) = \tfrac12\overrightarrow{BC}$. DE is drawn in amber and BC in teal. A red warning reads "Always head minus tail: arrow PQ is q minus p."

---

## Scene 6: Recap

**Narration:**

- **Beat a:** To recap. The section formula is a weighted average, and the nearer point gets the bigger weight. External division is the same formula with n replaced by minus n.
- **Beat b:** The centroid is the average of the three vertices. Collinear means one arrow is a multiple of another. And every vector proof is translate, compute, translate back.
- **Beat c:** Try the mastery quiz. Then chapter three multiplies two vectors for the first time, with the dot product.

**Visuals:** "Chapter 2 in five lines". The numbered rows fade in one at a time, each with a note on the right: $\frac{n\vec a+m\vec b}{m+n}$ (nearer point, bigger weight); $\frac{m\vec b-n\vec a}{m-n}$ (external: n becomes minus n); $\frac{\vec a+\vec b+\vec c}{3}$ (2 : 1 from the vertex); $\overrightarrow{AC} = \lambda\overrightarrow{AB}$ (collinear points); translate → compute → translate back (vector proofs). Then "Next: Chapter 3 · The Dot Product".
