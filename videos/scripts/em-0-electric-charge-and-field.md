# Electric Charge and Field — Explainer Script

- **Course:** Electricity and Magnetism
- **Chapter:** Chapter 0 · Electric Charge and Field (id: `em-0-electric-charge-and-field`)
- **Target runtime:** about 5 minutes (roughly 800 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/em-0-electric-charge-and-field.py`, class `EmCh0Video`

**Learning goal.** The learner sees charge as something that is moved, never made: quantised in whole multiples of $e$, conserved, and additive with its sign. They can explain why a charged balloon sticks to a neutral wall (polarisation: the near side is pulled harder than the far side is pushed). They use Coulomb's law $F = k|q_1q_2|/r^2$ as a vector law (equal and opposite, along the line, $1/r^2$, divided by $K$ in a medium), and add forces as vectors. They treat the field $\vec E = \vec F/q_0$ as a property of the space around the sources, read it through field lines, and find a neutral point. They know a dipole ($\vec p = q(2a)$, from minus to plus) has a $1/r^3$ field and only turns in a uniform field ($\vec\tau = \vec p\times\vec E$, $U = -\vec p\cdot\vec E$), and that symmetry kills the sideways parts of a ring's field, which is zero at the centre and peaks at $x = R/\sqrt2$.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: positive charge = PRIMARY (red disc with a white plus), negative charge = SECONDARY (teal disc with a white minus), forces = PURPLE, electric field arrows = ACCENT (amber), field lines = dark brown with arrowheads, highlights = gold, correct = GREEN, wrong = red cross. Field lines are traced numerically from the actual charges (RK2 steps along $\hat E$), with the number of lines proportional to $|q|$. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Symbols are always spoken as words ("k q over r squared", "q nought", "p cross E", "minus p dot E"). Units are spoken in full ("microcoulombs", "ten to the minus nineteen coulombs").

---

## Title card

**Narration:** Chapter zero. Electric charge and field.

**Visuals:** `title_card("Electricity & Magnetism", "Chapter 0 · Electric Charge and Field")`.

---

## Scene 1 — What charge is, and the balloon on the wall (Lesson 0.1)

**Narration:**

- **Beat a:** Rub a balloon on your hair and press it against a wall. It stays there. The balloon is charged, but nobody rubbed the wall. So why does a charged object stick to a neutral one?
- **Beat b:** Rubbing does not create charge. It moves a few electrons from one surface to the other. The balloon gains electrons and turns negative. Your hair is left positive, by exactly the same amount.
- **Beat c:** Every charge is a whole number of electron charges, e, which is one point six times ten to the minus nineteen coulombs. Charge is quantised, conserved, and it adds with its sign. So a charge of two point four times ten to the minus nineteen coulombs is impossible. That would be one and a half electrons.
- **Beat d:** Back to the wall. A neutral wall is not empty of charge. It holds equal amounts of both kinds. The balloon pulls the positive side of each molecule a little nearer, and pushes the negative side a little farther away.
- **Beat e:** The near side is attracted more strongly than the far side is repelled, because electric forces weaken with distance. So the net force is an attraction. That is polarisation, and it is why a charged body attracts any neutral one.

**Visuals:**

- **Beat a:** A tall neutral wall on the right ("neutral wall"). A pink balloon with teal minus signs floats in from the left and settles against the wall. The question "Why does a charged balloon stick to a neutral wall?" appears at the top in red.
- **Beat b:** Clear. A "hair" block on the left and a "balloon" on the right. Five teal electron dots slide from the hair to the balloon. Labels $+5e$ (red) over the hair and $-5e$ (teal) over the balloon, then "total: $(+5e) + (-5e) = 0$".
- **Beat c:** Clear. $e = 1.6\times10^{-19}$ C at the top. Three cards fade in: "Quantised" $q = ne$, "Conserved" $\sum q = $ const, "Additive" $+3 + (-5) = -2$. Then $\dfrac{2.4\times10^{-19}}{1.6\times10^{-19}} = 1.5$ with a red cross and "not a whole number".
- **Beat d:** Clear. The balloon sits left of a wall drawn as a 4×4 grid of molecules (ellipses, each holding a red plus and a teal minus at its centre). The plus in every molecule slides toward the balloon and the minus slides away.
- **Beat e:** One molecule is boxed in gold and the rest dim. A long purple arrow "pull: strong" points from its plus toward the balloon, and a short purple arrow "push: weaker" points from its minus away. Header: "net force: attraction (polarisation)".

---

## Scene 2 — Coulomb's law (Lesson 0.2)

**Narration:**

- **Beat a:** Now measure the push. Two point charges act on each other along the line joining them. The size of the force is k, times the product of the charges, over r squared. And k is nine times ten to the nine.
- **Beat b:** Distance matters most. Pull them twice as far apart and the force drops to a quarter. Halve the distance, and it grows four times.
- **Beat c:** Flip one sign and the push becomes a pull. And whatever the charges, the two forces are equal and opposite. A big charge does not push harder on a small one.
- **Beat d:** Put the pair in a medium, such as water, and the force is divided by its dielectric constant, K.

**Visuals:**

- **Beat a:** Two positive charges on a horizontal line with purple repulsion arrows pointing outward, and a double arrow $r$ beneath them. $F = \dfrac{k|q_1q_2|}{r^2}$ at the top left, $k = \dfrac{1}{4\pi\varepsilon_0} = 9\times10^9$ N m² C⁻² (muted) at the top right.
- **Beat b:** A `ValueTracker` separation drives the charges; arrow lengths scale as $1/r^2$. A live readout $F/F_0$ goes from 1.00 to 0.25 as $r$ doubles, then to 4.00 as $r$ halves.
- **Beat c:** The right charge turns teal (negative) and both arrows flip inward. Labels $+2\ \mu$C and $-8\ \mu$C; the two arrows stay equal in length. "equal and opposite" in green.
- **Beat d:** $F_{\text{medium}} = \dfrac{F}{K}$ in teal on the right.

---

## Scene 3 — Superposition (Lesson 0.3)

**Narration:**

- **Beat a:** With three or more charges, each pair acts as if the others were not there. The net force on a charge is the vector sum of the separate forces, not the sum of their sizes.
- **Beat b:** Where can a third charge rest, between plus four q and plus q, three metres apart? Its two pushes must balance. Since force falls as one over r squared, it must sit twice as far from the charge that is four times bigger: two metres from plus four q, and one metre from plus q.

**Visuals:**

- **Beat a:** The lesson's three-charge layout: $+1$ at the corner, $+2$ three units to the right, $-2$ three units up. Dashed purple $\vec F_B$ (pushed left, away from $+2$) and $\vec F_C$ (pulled up, toward $-2$), equal in size; a dashed parallelogram, then the red resultant $\vec F_{\text{net}}$ along the diagonal. On the right: $\vec F_{\text{net}} = \vec F_B + \vec F_C$; $|\vec F_{\text{net}}| = \sqrt2\,F$ (green); "not $F + F = 2F$" (red).
- **Beat b:** Clear. $+4q$ (large) and $+q$ (small) on a line, a "3 m" brace. At the top: $\dfrac{k(4q)q_3}{(3-x)^2} = \dfrac{kqq_3}{x^2} \Rightarrow 3 - x = 2x$. A gold $q_3$ appears with two balanced purple arrows; braces "2 m" and "1 m"; $x = 1$ m from $+q$ in green.

---

## Scene 4 — The electric field and field lines (Lessons 0.4–0.5)

**Narration:**

- **Beat a:** Now remove the second charge, but keep the question: what force would a charge feel at each point? Force per unit charge is the electric field. E equals F over q nought. For a point charge it is k q over r squared, pointing away from a positive charge.
- **Beat b:** The field belongs to the source, not to the test charge. Place any charge q at that point, and the force on it is q E. A negative charge feels a force against the field.
- **Beat c:** Field lines draw the same picture. They start on positive charges and end on negative ones. The field points along them, they crowd together where it is strong, and they never cross, because the field has only one direction at each point.
- **Beat d:** With two like charges, the lines swerve apart and leave a point between them where the field is zero. For four microcoulombs and one microcoulomb, three metres apart, that neutral point is two metres from the bigger charge, nearer the smaller one.

**Visuals:**

- **Beat a:** One positive charge on the left; a grid of amber arrows grows outward, shorter and fainter with distance. On the right: $\vec E = \dfrac{\vec F}{q_0}$, then $E = \dfrac{kq}{r^2}$ with "away from +, towards −".
- **Beat b:** The arrow grid dims. A small positive test charge appears up and to the right with a purple force arrow along the field; $\vec F = q\vec E$ in purple. The test charge morphs into a negative one and its force arrow flips to point back toward the source.
- **Beat c:** Clear. Traced field lines of $+2$ and $-2$ (five lines per unit charge, arrowheads on each), bulging from plus to minus. A bottom strip: "start on +, end on −", "crowded = strong", "never cross".
- **Beat d:** Clear. Field lines of $+4\ \mu$C (16 lines) and $+1\ \mu$C (4 lines), 3 m apart, swerving away from each other. A gold dot labelled $E = 0$ marks the neutral point 2 m from the larger charge. Bottom: $\dfrac{k(4)}{x^2} = \dfrac{k(1)}{(3-x)^2} \Rightarrow x = 2$ m.

---

## Scene 5 — The electric dipole (Lesson 0.6)

**Narration:**

- **Beat a:** Equal and opposite charges, a short distance apart, form a dipole. Its moment, p, is the charge times the separation, and it points from minus to plus.
- **Beat b:** Far away, its field falls as one over r cubed. On the axis it is two k p over r cubed. On the equator it is half that, and it points opposite to p.
- **Beat c:** In a uniform field, the two forces on a dipole are equal and opposite, so it does not accelerate. But they form a couple. The torque is p cross E, and it turns the dipole to line up with the field.
- **Beat d:** Its energy is minus p dot E, lowest when the dipole lines up with the field. A dipole in a uniform field only turns. It never runs off.

**Visuals:**

- **Beat a:** A teal $-q$ and a red $+q$ close together; a dark arrow $\vec p$ beneath them from minus to plus. $\vec p = q(2a)$ with "from − to +" at the top left.
- **Beat b:** Faint traced dipole field lines (closed loops from plus round to minus; the lines that run off-screen from the plus side are mirrored so matching lines arrive at the minus side, keeping the picture symmetric). On the axis, an amber arrow pointing along $\vec p$ with $E_{\text{axis}} = \dfrac{2kp}{r^3}$; on the equator, a shorter amber arrow pointing opposite to $\vec p$ with $E_{\text{eq}} = \dfrac{kp}{r^3}$.
- **Beat c:** Clear. Five amber horizontal arrows for a uniform $\vec E$. A dipole rod at 60° with purple forces $q\vec E$ (right, on the plus end) and $-q\vec E$ (left, on the minus end). On the right: $\vec F_{\text{net}} = 0$, then $\vec\tau = \vec p\times\vec E$ in red. The dipole rotates smoothly to 0°, aligned with the field.
- **Beat d:** $U = -\vec p\cdot\vec E$ appears, then "turns, never accelerates" in green.

---

## Scene 6 — Continuous charge: the ring (Lesson 0.7)

**Narration:**

- **Beat a:** For charge spread over a shape, chop it into tiny pieces, d q, add up their fields, and let symmetry cancel what it can. Take a ring of charge, and a point on its axis.
- **Beat b:** Each piece has an opposite partner. Their sideways parts cancel, and only the parts along the axis survive. E equals k Q x, over R squared plus x squared, to the three halves.
- **Beat c:** Check the centre. There every piece is cancelled by its opposite, so the field is zero, not greatest. It climbs to a peak at x equals R over root two, then falls away like the field of a point charge.

**Visuals:**

- **Beat a:** A red ring drawn in perspective on the left, its dashed axis running right, radius label $R$, point $P$ on the axis and a brace $x$ below. Two gold pieces $dq$ at the top and bottom of the ring, dashed lines to $P$, and their amber field arrows at $P$ (one tilted up, one tilted down).
- **Beat b:** Purple dashed sideways components appear ("sideways parts cancel"); the two arrows are replaced by one red axial arrow of twice the axial part. $E = \dfrac{kQx}{(R^2+x^2)^{3/2}}$ at the top right.
- **Beat c:** The ring fades; the formula moves to the top left. Axes $E$ against $x$; a gold dot at the origin ("zero at the centre"); the curve $x/(1+x^2)^{3/2}$ is drawn; a gold dashed line marks the peak at $x = R/\sqrt2$; the tail is labelled $\to kQ/x^2$.

---

## Scene 7 — Recap and next (Lesson 0.8)

**Narration:**

- **Beat a:** To recap. Charge comes in whole electrons, it is conserved, and it adds with its sign. Coulomb's law gives equal and opposite forces, falling as one over r squared.
- **Beat b:** Forces and fields add as vectors. The field is force per unit charge, drawn as lines from plus to minus. And a dipole in a uniform field only turns.
- **Beat c:** Try the mastery quiz. Adding field arrows piece by piece is honest but slow, so chapter one brings two shortcuts: Gauss's law, and the electric potential.

**Visuals:** Title "Chapter 0 in five lines". Five numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $q = ne$: quantised, conserved, additive
2. $F = \frac{k|q_1q_2|}{r^2}$: equal and opposite, along the line
3. $\vec F_{\text{net}} = \sum\vec F_i$: add as vectors, not sizes
4. $\vec E = \frac{\vec F}{q_0}$, $E = \frac{kq}{r^2}$: lines run from + to −, never cross
5. $\vec\tau = \vec p\times\vec E$: dipoles turn; symmetry cancels

Last, "Next: Chapter 1 · Gauss's Law and Electric Potential" appears at the bottom.
