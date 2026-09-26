# The Dot Product — Explainer Script

- **Course:** Vector Algebra
- **Chapter:** Chapter 3 · The Dot Product (id: `va-3-dot-product`)
- **Target runtime:** about 5 minutes (roughly 820 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/va-3-dot-product.py`, class `VaCh3Video`

**Learning goal.** The learner treats the dot product as *length times signed shadow*. They see it arise from work done by a force pulled at an angle. They watch its sign follow the angle (positive, zero, negative) and they know the answer is a scalar. They derive the component formula from the law of cosines instead of memorising it. They use $\cos\theta = \frac{\vec a\cdot\vec b}{|\vec a||\vec b|}$ for angles and "zero means perpendicular" for unknowns like $\lambda$. They expand $|\vec a\pm\vec b|^2$ like brackets and never cancel a dot product. They split a vector into a projection and a perpendicular part, and they compute work as $\vec F\cdot\vec d$.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: $\vec a$ and forces = PRIMARY (red), $\vec b$ = SECONDARY (teal), shadow / projection = ACCENT (amber), perpendicular part and $\vec a-\vec b$ = PURPLE, highlights = gold, correct = GREEN, wrong = red cross. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Samantha may read a lone "a" as the article, so the scene inserts `[[char LTRL]]a[[char NORM]]` (spelled `{LA}` in the code) wherever "a dot b" starts a phrase. Elsewhere the narration says "vector a". Coordinates are read as "two, minus one, three". Symbols are always spoken as words ("dot", "cos theta", "lambda", "b hat").

---

## Title card

**Narration:** Chapter three. The dot product.

**Visuals:** `title_card("Vector Algebra", "Chapter 3 · The Dot Product")`.

---

## Scene 1 — Hook: pulling a sled (Lesson 3.1)

**Narration:**

- **Beat a:** You drag a sled across flat snow with a rope. The rope points up and forward, so your pull does two jobs at once.
- **Beat b:** Part of it drags the sled forward. Part of it tries to lift the sled, and that part is wasted, because the sled never leaves the snow.
- **Beat c:** Physics calls the useful effort work: the forward part of the force, F cos theta, times the distance moved.
- **Beat d:** Two vectors in, their lengths and the angle between them, and one number out. That pattern is the dot product. A dot b equals the length of vector a, times the length of vector b, times cos theta.

**Visuals:**

- **Beat a:** A ground line and a sled. A red force arrow $\vec F$ leaves the sled at 35°.
- **Beat b:** An amber forward component grows along the ground ("drags forward"), then a purple dashed vertical from its tip up to the tip of $\vec F$ ("lifts: wasted").
- **Beat c:** An angle arc $\theta$ appears, and $|\vec F|\cos\theta$ is shown under the amber arrow. The whole sled group slides 4.2 units right, and a displacement arrow $\vec d$ appears beneath it. $W = (|\vec F|\cos\theta)|\vec d| = |\vec F||\vec d|\cos\theta$ is written at the top.
- **Beat d:** Everything except the work formula fades, and the formula dims. "The dot product" appears, then the boxed definition $\vec a\cdot\vec b = |\vec a||\vec b|\cos\theta$ with $\vec a$ red and $\vec b$ teal.

---

## Scene 2 — The shadow picture (Lesson 3.1)

**Narration:**

- **Beat a:** Here is the picture to keep. Shine a light straight down onto the line of vector a. Vector b casts a shadow on that line.
- **Beat b:** A dot b is the length of vector a, times the signed length of that shadow. Swing b round. At ninety degrees the shadow shrinks to a point, and the product is zero.
- **Beat c:** Past ninety degrees the shadow falls behind the tail, so the product turns negative. Acute gives positive, a right angle gives zero, obtuse gives negative.
- **Beat d:** And notice what comes out: a single number with a sign, but no direction. That is why it is also called the scalar product. Putting an arrow or an i hat on the answer is always wrong.

**Visuals:**

- **Beat a:** A dashed line carries red $\vec a$, length 4. Teal $\vec b$, length 2.6, is driven by a `ValueTracker` angle that starts at 35°, and an angle arc is drawn. A dashed drop line runs from the tip of $\vec b$ to the line, and a thick amber shadow runs from the tail to the foot of the drop.
- **Beat b:** Live readouts at the top: $\theta = $ (degrees) and $\vec a\cdot\vec b = 4 \cdot 2.6\cos\theta$ with its sign, plus the note "$= |\vec a|\times$(signed shadow of $\vec b$)". The angle sweeps to 90°, the readout reaches 0, a flash marks the tail, and "shadow = a point" appears.
- **Beat c:** The angle sweeps to 150°, so the shadow flips behind the tail and the readout goes negative. A bottom row appears: "acute: positive", "right angle: zero", "obtuse: negative".
- **Beat d:** Clear. $\vec a\cdot\vec b = 6$ with a green check, and $\vec a\cdot\vec b = 6\hat i$ with a red cross. Caption: "a scalar: size and sign, no direction".

---

## Scene 3 — Deriving the component formula (Lesson 3.2)

**Narration:**

- **Beat a:** The definition needs the angle, and in three dimensions nobody hands you the angle. So let us find a formula that uses only components. We derive it from the law of cosines.
- **Beat b:** Draw vector a and vector b tail to tail. The third side, from the tip of b to the tip of a, is a minus b. The law of cosines says: the length of a minus b, squared, equals a squared plus b squared, minus two a b cos theta.
- **Beat c:** That last term is two times the dot product. Rearrange, and the angle disappears. A dot b is one half of: a squared, plus b squared, minus the length of a minus b, squared.
- **Beat d:** Now write each length squared in components. Every square cancels, and only the cross terms survive. A dot b equals a one b one, plus a two b two, plus a three b three.
- **Beat e:** For example: two, minus one, three, dotted with one, four, two. Pair them up: two, minus four, six. Then add, to get four. The answer is the number four, not the list two, minus four, six.

**Visuals:**

- **Beat a:** Header "Wanted: a formula with no angle in it". In the lower left, red $\vec a$ and teal $\vec b$ from a common tail, with an angle arc $\theta$.
- **Beat b:** A purple arrow $\vec a - \vec b$ from the tip of $\vec b$ to the tip of $\vec a$ closes the triangle. The law of cosines is written on the right.
- **Beat c:** The term $2|\vec a||\vec b|\cos\theta$ is underlined in gold. `TransformFromCopy` gives $\vec a\cdot\vec b = \tfrac12(|\vec a|^2+|\vec b|^2-|\vec a-\vec b|^2)$.
- **Beat d:** The triangle fades and the rearranged formula moves to the top. Below it: $|\vec a-\vec b|^2 = (a_1-b_1)^2+(a_2-b_2)^2+(a_3-b_3)^2$, then $= |\vec a|^2 - 2(a_1b_1+a_2b_2+a_3b_3) + |\vec b|^2$, then the boxed result $\vec a\cdot\vec b = a_1b_1+a_2b_2+a_3b_3$.
- **Beat e:** The boxed result shrinks to the top. Written in turn: $(2,-1,3)\cdot(1,4,2)$, then $=(2)(1)+(-1)(4)+(3)(2)$, then $= 2-4+6 = 4$ in green. At the bottom, a red $(2,-4,6)$ with a cross: "a list is not the answer".

---

## Scene 4 — Angles and perpendicularity (Lesson 3.3)

**Narration:**

- **Beat a:** Now we have two expressions for the same number. Set them equal, and you can recover an angle you cannot see. Cos theta equals a dot b, over the product of the lengths.
- **Beat b:** Take i plus j, and j plus k. The dot product is one. Each length is root two. So cos theta is one half, and the angle is sixty degrees.
- **Beat c:** The best special case is a right angle. For non zero vectors, perpendicular means exactly that the dot product is zero. So to make two i plus lambda j plus k perpendicular to i minus two j plus three k, set the dot product to zero: five minus two lambda equals zero, so lambda is five halves.
- **Beat d:** Two traps. A zero dot product does not mean one vector is zero. One, two, dotted with two, minus one, is two minus two, which is zero, and neither vector is zero. They are perpendicular.
- **Beat e:** And the angle is always measured tail to tail. In an equilateral triangle, A B and B C meet head to tail at sixty degrees. Slide them tail to tail and the angle is one hundred and twenty, so their dot product is negative.

**Visuals:**

- **Beat a:** $\cos\theta = \dfrac{\vec a\cdot\vec b}{|\vec a||\vec b|}$, large, at the top.
- **Beat b:** Three lines: $(1,1,0)\cdot(0,1,1) = 1$; $|\vec a| = |\vec b| = \sqrt2$; $\cos\theta = \tfrac12 \Rightarrow \theta = 60^\circ$ (green).
- **Beat c:** Clear. $\vec a\perp\vec b \iff \vec a\cdot\vec b = 0$ in red at the top, then $(2,\lambda,1)\cdot(1,-2,3) = 2-2\lambda+3$, then $5-2\lambda=0$, then $\lambda = \tfrac52$ in green.
- **Beat d:** Clear. A split screen with a faint divider. Left: $(1,2)\cdot(2,-1) = 2-2 = 0$, with both arrows drawn from one tail, a right-angle mark and "zero means perpendicular (or zero)".
- **Beat e:** Right: $\overrightarrow{AB}$ (red) and $\overrightarrow{BC}$ (teal) head to tail, with the 60° interior angle at $B$ marked in red with a cross ("head to tail"). A copy of $\overrightarrow{BC}$ slides so its tail sits at $A$, and the 120° arc at $A$ is drawn in green ("tail to tail"). Then $\overrightarrow{AB}\cdot\overrightarrow{BC} = s^2\cos120^\circ = -\tfrac{s^2}{2}$.

---

## Scene 5 — Algebra of the dot product (Lesson 3.4)

**Narration:**

- **Beat a:** The dot product is commutative, and it distributes over addition, so you can expand brackets like ordinary algebra. The key link: a dot a is the length of a, squared.
- **Beat b:** So the length of a plus b, squared, is a squared, plus two a dot b, plus b squared. With a minus sign, the same line is the law of cosines, proved in one step.
- **Beat c:** Multiply the two diagonals of a parallelogram, a plus b and a minus b. You get a squared minus b squared. In a rhombus the sides are equal, so that is zero: the diagonals of a rhombus are perpendicular.
- **Beat d:** One thing you can never do is cancel. Here b and c are different vectors, yet they cast the same shadow on vector a, so a dot b equals a dot c. The dot product only sees the shadow.

**Visuals:**

- **Beat a:** Header "Expand it like ordinary brackets", then $\vec a\cdot\vec a = |\vec a|^2$ in red.
- **Beat b:** $|\vec a+\vec b|^2 = (\vec a+\vec b)\cdot(\vec a+\vec b) = |\vec a|^2+2\vec a\cdot\vec b+|\vec b|^2$, then $|\vec a-\vec b|^2 = |\vec a|^2-2\vec a\cdot\vec b+|\vec b|^2$ with "= the law of cosines" in green.
- **Beat c:** Clear. On the left, a rhombus with side 2.6 and angle 60°: red $\vec a$ and teal $\vec b$ from one corner, the other two sides dashed. The diagonals are an amber arrow $\vec a+\vec b$ and a purple arrow $\vec a-\vec b$. On the right: $(\vec a+\vec b)\cdot(\vec a-\vec b) = |\vec a|^2-|\vec b|^2$, then "$=0$ when $|\vec a| = |\vec b|$" in green, and a right-angle mark appears where the diagonals cross.
- **Beat d:** Clear. $\vec a=(3,0)$ lies on a dashed line, with $\vec b=(1,2)$ and $\vec c=(1,-5)$ drawn from the same tail. One dashed vertical passes through both tips, and one shared amber shadow runs along $\vec a$. On the right, in turn: the components; $\vec a\cdot\vec b = 3 = \vec a\cdot\vec c$; "but $\vec b\ne\vec c$" in red; $\vec a\cdot(\vec b-\vec c) = 0$ muted.

---

## Scene 6 — Projections and work (Lesson 3.5)

**Narration:**

- **Beat a:** Now pull the shadow out on its own. Dot with the unit vector b hat, and the extra length drops out. The scalar projection of a on b is a dot b, over the length of b.
- **Beat b:** Multiply that by b hat to get the shadow as an arrow: the vector projection. What is left over, a minus its projection, is at right angles to b. Every vector splits into a part along b and a part across it.
- **Beat c:** Order matters. The projection of a on b divides by the length of b. The projection of b on a divides by the length of a. They agree only when the lengths match.
- **Beat d:** And work is a shadow too. A constant force F, moving through a displacement d, does work F dot d. Two forces act on a particle that moves from the point one, two, three to the point five, four, one.
- **Beat e:** The displacement is final minus initial: four, two, minus two. The resultant force is seven, two, minus four. Dot them: twenty eight, plus four, plus eight. The work is forty units.

**Visuals:**

- **Beat a:** Teal $\vec b$ lies horizontal and red $\vec a$ is drawn from the same tail. A thick amber projection arrow runs along $\vec b$. On the right: "scalar projection" over $\vec a\cdot\hat b = \dfrac{\vec a\cdot\vec b}{|\vec b|}$.
- **Beat b:** Label $\operatorname{proj}_{\vec b}\vec a$, plus "vector projection" over $\dfrac{\vec a\cdot\vec b}{|\vec b|^2}\vec b$. A purple arrow $\vec a_\perp$ runs from the projection tip up to the tip of $\vec a$, with a right-angle mark. Then $\vec a_\perp = \vec a - \operatorname{proj}_{\vec b}\vec a$.
- **Beat c:** Clear. Proj of $\vec a$ on $\vec b$ $=\dfrac{\vec a\cdot\vec b}{|\vec b|}$, a red $\ne$, and proj of $\vec b$ on $\vec a$ $=\dfrac{\vec a\cdot\vec b}{|\vec a|}$. Caption: "A pole's shadow on the ground is not the ground's shadow on the pole."
- **Beat d:** Clear. $W = \vec F\cdot\vec d$ in red at the top. The givens follow: $\vec F_1 = (4,1,-3)$, $\vec F_2 = (3,1,-1)$, $A(1,2,3)\to B(5,4,1)$.
- **Beat e:** Written in turn: $\vec d = B-A = (4,2,-2)$; $\vec R = (7,2,-4)$; $W = \vec R\cdot\vec d = 28+4+8 = 40$ in green.

---

## Scene 7 — Recap and next (Lesson 3.6)

**Narration:**

- **Beat a:** To recap. The dot product is length times signed shadow, and it is a scalar. The law of cosines turns it into: multiply matching components, and add.
- **Beat b:** It gives angles, and a zero dot product means perpendicular. Expand it like brackets, but never cancel. And projection and work are the shadow put to use.
- **Beat c:** Try the mastery quiz. Then chapter four builds the other product: a vector that measures how much two vectors disagree, and points straight out of their plane.

**Visuals:** Title "Chapter 3 in five lines". Five numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $\vec a\cdot\vec b = |\vec a||\vec b|\cos\theta$: length times signed shadow, a scalar
2. $a_1b_1+a_2b_2+a_3b_3$: from the law of cosines
3. $\cos\theta = \frac{\vec a\cdot\vec b}{|\vec a||\vec b|}$: zero means perpendicular
4. $\vec a\cdot\vec a = |\vec a|^2$: expand brackets, never cancel
5. $\frac{\vec a\cdot\vec b}{|\vec b|}$, $W = \vec F\cdot\vec d$: projection and work

Last, "Next: Chapter 4 · The Cross Product" appears at the bottom.
