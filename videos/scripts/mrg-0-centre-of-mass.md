# Centre of Mass — Explainer Script

- **Course:** Momentum, Rotation and Gravitation (Mechanics II)
- **Chapter:** Chapter 0 · Centre of Mass (id: `mrg-0-centre-of-mass`)
- **Target runtime:** about 5 minutes (roughly 850 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mrg-0-centre-of-mass.py`, class `MrgCh0Video`

**Learning goal.** The learner sees the centre of mass first as *the one point that moves simply* on a tumbling body, then as a mass-weighted average position. Two masses on a rod give $x_{cm} = \frac{m_1x_1+m_2x_2}{m_1+m_2}$, nearer the heavier mass (Earth–Moon barycentre inside the Earth). They compute it one coordinate at a time for particle systems, turn the sum into $\frac1M\int x\,dm$ for continuous bodies (rod $L/2$, ramp rod $2L/3$, semicircular ring $2R/\pi$ vs disc $4R/3\pi$, hemisphere $3R/8$, cone $h/4$), and treat a hole as a negative mass (disc with a hole: COM shifts $R/6$ *away*). They derive $M\vec a_{cm} = \vec F_{\text{ext}}$ from Newton's third law, use it on the exploding shell (other piece lands at $1.5R$), and use $\sum m\,\Delta x = 0$ on the man-and-boat problem with ground displacements.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: first / heavier mass = PRIMARY (red), second mass = SECONDARY (teal), centre of mass = ACCENT (amber) drawn as the standard quartered-circle COM symbol, removed / negative mass = PURPLE, highlights = gold, correct = GREEN. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** symbols are spoken as words ("m one", "R over two", "lambda equals k x"). "x c m" is avoided in narration because Samantha may read "cm" as centimetres; the narration says "the centre of mass" instead.

---

## Title card

**Narration:** Chapter zero. The centre of mass.

**Visuals:** `title_card("Momentum, Rotation & Gravitation", "Chapter 0 · Centre of Mass")`.

---

## Scene 1 — Hook: the tumbling spanner (Lesson 0.1)

**Narration:**

- **Beat a:** Slide a spanner across smooth ice with a flick of the wrist. It spins and wobbles, and the two ends chase each other round and round.
- **Beat b:** Yet one point on it, between the middle and the heavy jaw, glides in a perfectly straight line at a steady speed.
- **Beat c:** Throw it through the air, and that same point traces a clean parabola, exactly like a small stone would.
- **Beat d:** That point is the centre of mass. Once you know how it moves, a tumbling body becomes one particle, plus a spin about that particle. The whole of this course rests on it.

**Visuals:**

- **Beat a:** A pale ice rectangle seen from above ("smooth ice, seen from above"). A spanner (rod, round jaw with a notch, knob at the tail) slides left to right while spinning 2.6 turns; the tail end leaves a looping muted trace.
- **Beat b:** The amber trace of the COM marker is revealed: a straight line. Caption "one point moves simply".
- **Beat c:** Ice fades; a ground line. The spanner is thrown in an arc while tumbling: messy muted trace of the tail, clean amber parabola for the COM.
- **Beat d:** "the centre of mass" (amber, bold) and "one particle + a spin about it" appear above the traces.

---

## Scene 2 — Two masses on a rod (Lesson 0.1)

**Narration:**

- **Beat a:** Start with two masses on a light rod. Where must you hold it so it balances? The turning effect of each weight about the support must cancel: m one g times its distance equals m two g times its distance.
- **Beat b:** Cancel g and solve. The balance point is a weighted average: each position, weighted by its mass. Equal masses give the midpoint.
- **Beat c:** Make one mass heavier and the balance point slides towards it. The distances are in the inverse ratio of the masses, so the centre of mass always sits nearer the heavier mass, never the lighter one.
- **Beat d:** The Earth is eighty one times as heavy as the Moon. Their centre of mass sits about four thousand seven hundred kilometres from the Earth's centre. The Earth's radius is six thousand four hundred, so the balance point is inside the Earth itself.

**Visuals:**

- **Beat a:** Light rod with red $m_1$ and teal $m_2$ balls (area ∝ mass), a pivot triangle with the COM marker at the midpoint, braces $r_1$, $r_2$ beneath. $m_1g(x_c-x_1) = m_2g(x_2-x_c)$ written at the top.
- **Beat b:** Boxed $x_{cm} = \frac{m_1x_1+m_2x_2}{m_1+m_2}$ at the bottom with the note "a weighted average of positions".
- **Beat c:** A `ValueTracker` grows $m_2$ from 1 to 3; the teal ball swells and the pivot, marker and braces slide towards it. $\frac{r_1}{r_2} = \frac{m_2}{m_1}$ and "nearer the heavier mass" appear top right.
- **Beat d:** Clear. Big teal Earth, small grey Moon, dashed link ("not to scale"). $x_{cm} = \frac{M_m d}{81M_m+M_m} = \frac{3.84\times10^5\text{ km}}{82} \approx 4700$ km at the top. The COM marker pops in 0.73 of a radius from the Earth's centre; a dashed radius labelled $R_E = 6400$ km; "inside the Earth".

---

## Scene 3 — Many particles (Lesson 0.2)

**Narration:**

- **Beat a:** Real bodies have many particles, in the plane or in space. The rule is the same weighted average, now of position vectors, and you compute it one coordinate at a time.
- **Beat b:** Masses of one, two, three and four kilograms sit on the corners of a one metre square. The x coordinate is five over ten, nought point five. The y coordinate is seven over ten, nought point seven. The heavy top edge pulls the centre of mass up.
- **Beat c:** Any group of particles can be replaced by its total mass at its own centre of mass. And because it is an average, it can land where there is no material at all: the centre of a ring, or the gap inside an L-shaped wire.

**Visuals:**

- **Beat a:** $\vec r_{cm} = \frac{\sum m_i\vec r_i}{M}$, then the $x$ and $y$ component forms.
- **Beat b:** A square with balls of 1, 2 (teal) and 3, 4 kg (red) at $(0,0),(1,0),(1,1),(0,1)$. On the right: $x_{cm} = \frac{1(0)+2(1)+3(1)+4(0)}{10} = 0.5$ m and $y_{cm} = \frac{1(0)+2(0)+3(1)+4(1)}{10} = 0.7$ m. Dashed amber guides and the COM marker at $(0.5, 0.7)$.
- **Beat c:** Clear. "Grouping: replace any part by its total mass at its own COM". A teal ring with its COM at the centre and a red L-shaped wire with its COM in the gap; caption "the COM can sit in empty space".

---

## Scene 4 — Continuous bodies (Lesson 0.3)

**Narration:**

- **Beat a:** A metre rule or a steel plate has its mass smeared out. Chop it into tiny pieces, treat each one as a particle, and the sum becomes an integral: the centre of mass is one over M, times the integral of x d m.
- **Beat b:** For a uniform rod, the answer is the middle, L over two. Let the density grow along the rod, lambda equals k x, and the centre of mass moves towards the heavy end, to two L over three.
- **Beat c:** Choose the element cleverly. Small arcs give a semicircular ring its centre of mass at two R over pi. Thin semicircular rings stacked together give a semicircular disc four R over three pi: closer in, because its mass is spread inwards. Same outline, different mass distribution.
- **Beat d:** Stacking thin discs does the rest: three R over eight above the flat face of a solid hemisphere, and h over four above the base of a solid cone.

**Visuals:**

- **Beat a:** A rod drawn as 24 strips whose red shading shows density; one strip outlined, $dm = \lambda\,dx$. Header $x_{cm} = \frac{\sum m_ix_i}{\sum m_i} \to \frac1M\int x\,dm$.
- **Beat b:** COM marker at $L/2$ with "$\lambda$ constant: $x_{cm} = L/2$". The shading ramps up to the right and the marker slides to $2L/3$; $\lambda = kx$: $\frac{\int_0^L x(kx)dx}{\int_0^L kx\,dx} = \frac{2L}{3}$.
- **Beat c:** Clear. Left: teal semicircular ring with COM at $\frac{2R}{\pi} \approx 0.64R$. Right: six nested semicircular arcs draw in, then a filled red semicircular disc with COM at $\frac{4R}{3\pi} \approx 0.42R$.
- **Beat d:** Clear. A purple hemisphere cross-section with horizontal disc slices, COM at $\frac{3R}{8}$; a teal cone with COM at "$\frac h4$ above the base" (label below the cone).

---

## Scene 5 — Holes are negative mass (Lesson 0.4)

**Narration:**

- **Beat a:** A washer is a disc with a hole. Think of the full disc as what remains, plus what was removed. Then the hole behaves like a negative mass, sitting at the centre of the missing piece.
- **Beat b:** Cut a hole of radius R over two that touches the rim. It would have held a quarter of the mass, at R over two from the centre. So the remaining centre of mass is zero, minus a quarter M times R over two, all over three quarters M. That is minus R over six.
- **Beat c:** The minus sign matters. Removing mass from one side leaves the other side heavier, so the centre of mass moves away from the hole, never towards it.

**Visuals:**

- **Beat a:** Teal disc with centre $O$ and the COM marker there. A hole of radius $R/2$ touching the rim is punched out (dashed purple outline) and labelled $-m$. $\vec r_{\text{rem}} = \frac{M\vec r_{\text{whole}} - m\vec r_{\text{hole}}}{M-m}$ on the right.
- **Beat b:** $m = \frac M4$ at $x = \frac R2$; $x_{\text{rem}} = \frac{0 - \frac M4\cdot\frac R2}{\frac34M}$; $x_{\text{rem}} = -\frac R6$ (green). The marker slides $R/6$ to the left and a small amber arrow marks the shift.
- **Beat c:** "away from the hole" (amber) above the disc; the marker pulses.

---

## Scene 6 — How the centre of mass moves (Lesson 0.5)

**Narration:**

- **Beat a:** Now the payoff. Multiply the definition by M and differentiate: M times the velocity of the centre of mass is the total momentum. Differentiate again, and M times its acceleration is the sum of all the forces on all the particles.
- **Beat b:** Internal forces come in equal and opposite pairs, by Newton's third law, so they cancel. What is left: M times the acceleration of the centre of mass equals the external force. The centre of mass moves like one particle, pushed only by external forces.
- **Beat c:** A shell is fired with range R. At the top of its flight it bursts into two equal pieces, and one of them drops straight down.
- **Beat d:** The explosion is internal, so the centre of mass carries on along the same parabola, as if nothing had happened, and lands at R.
- **Beat e:** The first piece lands at R over two. For their average to be R, the other piece must land at three R over two: one and a half times the range.

**Visuals:**

- **Beat a:** $M\vec r_{cm} = \sum m_i\vec r_i$; $M\vec v_{cm} = \sum m_i\vec v_i = \vec P$; $M\vec a_{cm} = \sum\vec F_i$.
- **Beat b:** Two dots with equal and opposite arrows (an internal pair). The line continues $= \vec F_{\text{ext}} + \underbrace{\sum\vec F_{\text{int}}}_{=\vec 0}$, then the boxed $M\vec a_{cm} = \vec F_{\text{ext}}$.
- **Beat c:** The box shrinks to the top right. Ground with ticks $0$, $\frac R2$, $R$, $\frac{3R}2$. A shell rises along its parabola and bursts (gold flash) at the top.
- **Beat d:** The red fragment falls straight down to $\frac R2$; the teal fragment flies to $\frac{3R}{2}$; the COM marker rides the dashed amber continuation of the original parabola to $R$. All three land together.
- **Beat e:** $\frac{\frac R2 + x}{2} = R \Rightarrow x = \frac{3R}{2}$; the teal fragment pulses.

---

## Scene 7 — When the centre of mass stays put (Lesson 0.6)

**Narration:**

- **Beat a:** If no external force acts along a direction, and the system starts at rest, the centre of mass cannot move along it. Then the sum of each mass times its displacement, measured from the ground, is zero.
- **Beat b:** A sixty kilogram man walks five metres along a hundred and forty kilogram boat, at rest in still water. Watch the boat.
- **Beat c:** The boat slides back a distance d, so the man moves only five minus d over the ground. Sixty times five minus d, minus one forty times d, is zero. So d is one point five metres.
- **Beat d:** Watch the trap: the five metres is measured on the boat, which is moving. Over the ground the man covers three point five metres, and the centre of mass never moves at all.

**Visuals:**

- **Beat a:** $F_{\text{ext},x} = 0$, at rest $\Rightarrow \sum m_i\,\Delta x_i = 0$ and "each displacement measured from the ground".
- **Beat b:** Water, a boat (140 kg) and a stick-figure man (60 kg) at its left end. The COM marker sits on a dashed amber vertical. The man walks 5 m along the deck while the boat slides back 1.5 m; the marker never moves.
- **Beat c:** Braces: $d$ under the boat's shift, $5-d$ over the man's ground displacement. $60(5-d) - 140d = 0 \Rightarrow d = 1.5$ m.
- **Beat d:** "man: 3.5 m, boat: 1.5 m back" in green; the COM marker pulses.

---

## Scene 8 — Recap and next (Lesson 0.7)

**Narration:**

- **Beat a:** To recap. The centre of mass is the mass weighted average position, nearer the heavier mass. For continuous bodies the sum becomes an integral, and a hole is a negative mass.
- **Beat b:** Internal forces cancel, so M times the acceleration of the centre of mass is the external force. An explosion cannot bend its path, and with no external force from rest, it stays put.
- **Beat c:** Try the mastery quiz. Then chapter one takes the total momentum seriously: recoil, impulse, rockets, and every kind of collision.

**Visuals:** Title "Chapter 0 in five lines". Five numbered rows, formula left and muted note right:

1. $\vec r_{cm} = \frac{\sum m_i\vec r_i}{M}$: weighted average, nearer the heavier mass
2. $x_{cm} = \frac1M\int x\,dm$: continuous bodies, choose the element
3. hole $= -m$: negative mass, COM moves away
4. $M\vec a_{cm} = \vec F_{\text{ext}}$: internal forces cancel in pairs
5. $\sum m_i\,\Delta x_i = 0$: no external force, from rest, it stays put

Last, "Next: Chapter 1 · Momentum, Impulse and Collisions" appears at the bottom.
