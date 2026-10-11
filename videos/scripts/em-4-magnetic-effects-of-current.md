# Magnetic Effects of Current — Explainer Script

- **Course:** Electricity and Magnetism
- **Chapter:** Chapter 4 · Magnetic Effects of Current (id: `em-4-magnetic-effects-of-current`)
- **Target runtime:** about 6 minutes (roughly 1,000 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/em-4-magnetic-effects-of-current.py`, class `EmCh4Video`

**Learning goal.** The learner uses $\vec F = q\vec v\times\vec B$ (perpendicular to both, $qvB\sin\theta$, sign flips with the charge) and knows it does no work, so it bends paths but never changes speed. They derive $r = mv/qB$ and the speed-independent period $T = 2\pi m/qB$ (the cyclotron trick), picture the helix (pitch $v\cos\theta\cdot T$) and the velocity selector $v = E/B$. They build fields from currents with Biot–Savart (long wire $\mu_0I/2\pi d$, circling the wire by the right-hand grip rule; loop centre $\mu_0I/2R$) and with Ampère's law for symmetric cases (wire in one line; solenoid $\mu_0nI$, uniform inside, about zero outside). They use $\vec F = I\vec l\times\vec B$, know parallel currents attract ($F/l = \mu_0I_1I_2/2\pi d$, 2 mN/m for 10 A at 1 cm), treat a loop as a dipole ($\vec m = NI\vec A$, $\vec\tau = \vec m\times\vec B$, $U = -\vec m\cdot\vec B$), convert a galvanometer (small shunt for an ammeter, large series resistance for a voltmeter), and know that $\vec B$ lines close (no monopoles) and how dia-, para- and ferromagnets respond.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: magnetic field = GREEN (crosses for "into the page", dotted circles for "out of the page", green arrows in the plane), current and wires = PRIMARY (red; a circled cross is a current into the page, a circled dot out of it), velocity = INK, forces = PURPLE, magnetic moment = red arrow, highlights and Amperian loops = gold dashed, correct = GREEN. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Symbols spoken as words ("q v cross B", "mu nought I over two pi d", "m cross B", "minus m dot B"). "Ampère" is written with its accent; Samantha reads it as "ampere".

---

## Title card

**Narration:** Chapter four. Magnetic effects of current.

**Visuals:** `title_card("Electricity & Magnetism", "Chapter 4 · Magnetic Effects of Current")`.

---

## Scene 1 — The magnetic force on a charge (Lesson 4.1)

**Narration:**

- **Beat a:** A charge moving through a magnetic field feels a force: q v cross B. It is perpendicular to both the velocity and the field, and its size is q v B sin theta.
- **Beat b:** Because the force is always sideways to the motion, it does no work. A magnetic field can bend a charge's path, but it can never change its speed.
- **Beat c:** Flip the sign of the charge and the force flips too. A proton at two million metres per second, at thirty degrees to a half tesla field, feels eight times ten to the minus fourteen newtons.

**Visuals:**

- **Beat a:** A field of green crosses on the left ("$\vec B$ into the page"). A positive charge with a velocity arrow to the right and a purple force arrow straight up. On the right: $\vec F = q\vec v\times\vec B$ (red), $F = qvB\sin\theta$.
- **Beat b:** The charge now runs round a dashed circle, its velocity arrow always tangent and its force arrow always pointing to the centre. "no work: the speed never changes" in green.
- **Beat c:** $F = (1.6\times10^{-19})(2\times10^6)(0.5)\sin30^\circ$, then $= 8\times10^{-14}$ N in green.

---

## Scene 2 — Circles, helices and crossed fields (Lesson 4.2)

**Narration:**

- **Beat a:** Moving straight across a uniform field, a charge goes round in a circle. The magnetic force supplies the centripetal force: q v B equals m v squared over r. So r equals m v over q B.
- **Beat b:** The period, two pi m over q B, does not depend on the speed. A particle twice as fast runs a circle twice as big, in exactly the same time. That is the trick behind the cyclotron.
- **Beat c:** Enter at an angle, and the motion along the field carries on unchanged, so the circle stretches into a helix. And crossed electric and magnetic fields let through only the particles with speed E over B.

**Visuals:**

- **Beat a:** Green crosses on the left. A teal particle runs once round a dashed circle. On the right: $qvB = \frac{mv^2}{r}$, then $r = \frac{mv}{qB}$ in red.
- **Beat b:** A red particle labelled $2v$ on a circle twice the size, starting at the same point as the teal one ($v$). Both go round twice and arrive back together. $T = \frac{2\pi m}{qB}$ with "same period at any speed" in green.
- **Beat c:** Clear. Green field arrows to the right; a red helix (side view) drawn along them, with a "pitch" brace. On the right: pitch $= v\cos\theta\cdot T$; $qE = qvB \Rightarrow v = \frac{E}{B}$ in red, "velocity selector".

---

## Scene 3 — The Biot–Savart law (Lesson 4.3)

**Narration:**

- **Beat a:** Moving charges also make magnetic fields. Each small piece of current, I d l, adds a bit of field: mu nought over four pi, times I d l cross r hat, over r squared.
- **Beat b:** Add up a long straight wire, and the field circles round it, with strength mu nought I over two pi d. Grip the wire with your right hand, thumb along the current, and your fingers curl the way the field goes.
- **Beat c:** At the centre of a circular loop, every piece pushes the field the same way, and B equals mu nought I over two R.

**Visuals:**

- **Beat a:** A red current element $I\,d\vec l$ pointing right, a dashed $\vec r$ up to a point $P$, and at $P$ a green dotted circle $d\vec B$ (out of the page). $d\vec B = \frac{\mu_0}{4\pi}\frac{I\,d\vec l\times\hat r}{r^2}$ on the right.
- **Beat b:** The element fades. A wire seen end-on with current out of the page ("current out of the page"); three green circles with anticlockwise arrowheads appear around it. $B = \frac{\mu_0I}{2\pi d}$ in red and "10 A at 5 cm: $B = 4\times10^{-5}$ T" in green.
- **Beat c:** The wire fades. A red circular loop with anticlockwise current arrows, a green out-of-page symbol at its centre, radius $R$. $B_{\text{centre}} = \frac{\mu_0I}{2R}$.

---

## Scene 4 — Ampère's circuital law (Lesson 4.4)

**Narration:**

- **Beat a:** For symmetric currents there is a shortcut, just like Gauss's law. Ampère's law: the line integral of B round any closed loop equals mu nought times the current enclosed. Round a long wire, that gives mu nought I over two pi r, in one line.
- **Beat b:** Inside a long solenoid, the field is uniform and runs along the axis. Outside, it is almost zero. A rectangular loop then gives B equals mu nought n I. A thousand turns per metre carrying two amperes makes about two and a half millitesla.

**Visuals:**

- **Beat a:** A wire end-on (current out of the page), a gold dashed Amperian circle of radius $r$ with green anticlockwise arrows. On the right: $\oint\vec B\cdot d\vec l = \mu_0I_{\text{enc}}$ (red), then $B(2\pi r) = \mu_0I \Rightarrow B = \frac{\mu_0I}{2\pi r}$.
- **Beat b:** Clear. A solenoid in cross-section: a top row of out-of-page wires and a bottom row of into-page wires. Three green arrows run left to right inside; "B ≈ 0 outside" above. A gold dashed rectangle straddles the top row. On the right: $B = \mu_0nI$ (red) and $(4\pi\times10^{-7})(1000)(2) \approx 2.5\times10^{-3}$ T (green).

---

## Scene 5 — Forces on conductors (Lesson 4.5)

**Narration:**

- **Beat a:** A current is a stream of moving charges, so a wire carrying current through a field feels a force: F equals I l cross B.
- **Beat b:** Two parallel wires feel each other's fields. Currents in the same direction attract, the opposite of like charges, with a force per metre of mu nought I one I two over two pi d. Ten amperes in each, one centimetre apart, gives two millinewtons per metre.

**Visuals:**

- **Beat a:** Green crosses; a red horizontal wire with current $I$ to the right and a purple force arrow straight up. $\vec F = I\vec l\times\vec B$ in red on the right.
- **Beat b:** Clear. Two vertical red wires, both with current upward ($I_1$, $I_2$). Green crosses beside wire 2 ("field of wire 1"). Purple arrows pull the wires toward each other. On the right: "same direction: attract" (green), $\frac{F}{l} = \frac{\mu_0I_1I_2}{2\pi d}$, then $\frac{(2\times10^{-7})(10)(10)}{0.01} = 2\times10^{-3}$ N/m.

---

## Scene 6 — Loops, torque and meters (Lesson 4.6)

**Narration:**

- **Beat a:** A current loop in a field behaves like a dipole. Its magnetic moment is N I A, pointing along the loop's normal. The forces on opposite sides form a couple, so the torque is m cross B, and the energy is minus m dot B: the same algebra as the electric dipole.
- **Beat b:** A moving coil galvanometer turns that torque into a reading. To make an ammeter, put a tiny shunt in parallel, so most of the current bypasses the coil. To make a voltmeter, put a large resistance in series. An ammeter needs a small resistance, a voltmeter a large one.

**Visuals:**

- **Beat a:** Green field arrows to the right. A loop seen edge-on (a red segment with an out-of-page wire at one end and an into-page wire at the other), its red moment arrow $\vec m$ along the normal at 70°. Purple forces: up on one end, down on the other. On the right: $\vec m = NI\vec A$, $\vec\tau = \vec m\times\vec B$ (red). The loop rotates until $\vec m$ lies along $\vec B$. Then $U = -\vec m\cdot\vec B$, "same algebra as the electric dipole".
- **Beat b:** Clear. Top: "Ammeter", a galvanometer G with a zigzag shunt $S$ in parallel; $S = \frac{I_gG}{I - I_g}$ and "0–5 A: $S \approx 0.01\ \Omega$" (green). Bottom: "Voltmeter", G in series with a large $R$; $R = \frac{V}{I_g} - G$.

---

## Scene 7 — Magnetism and matter (Lesson 4.7)

**Narration:**

- **Beat a:** A bar magnet is a magnetic dipole. Outside, its field lines have exactly the shape of an electric dipole's. But they do not stop at the poles. They run on through the magnet and close on themselves. There are no magnetic monopoles, so the magnetic flux out of any closed surface is zero.
- **Beat b:** Materials respond in three ways. Diamagnets are weakly pushed out of a field. Paramagnets are weakly pulled in, less so when hot. Ferromagnets are pulled in strongly, and keep their magnetism, tracing a hysteresis loop.

**Visuals:**

- **Beat a:** A bar magnet (red N half, teal S half). Field lines traced from N round to S outside, with arrowheads. White arrows inside the magnet run from S to N, closing every loop. On the right: $\oint\vec B\cdot d\vec A = 0$ (red), "no monopoles: lines close".
- **Beat b:** Clear. Three rows: "diamagnetic" $\chi < 0$ "weakly pushed out"; "paramagnetic" $\chi = \frac{C}{T}$ "weakly pulled in"; "ferromagnetic" $\chi \gg 1$ "strongly pulled in, keeps it". Bottom right: small $B$–$H$ axes with a red hysteresis loop ("hysteresis").

---

## Scene 8 — Recap and next (Lesson 4.8)

**Narration:**

- **Beat a:** To recap. A magnetic field pushes moving charges sideways, so it bends their paths but never speeds them up. They circle with a period that ignores their speed.
- **Beat b:** Currents make fields that circle them. Ampère's law handles wires and solenoids in one line. And currents feel forces too: parallel currents attract, and loops turn like dipoles.
- **Beat c:** Try the mastery quiz. Steady currents make steady magnetic fields. Chapter five asks the reverse: can a magnetic field make a current? Only if it changes.

**Visuals:** Title "Chapter 4 in five lines". Five numbered rows, each a formula on the left and a muted note on the right:

1. $\vec F = q\vec v\times\vec B$: sideways: bends, never speeds up
2. $r = \frac{mv}{qB}$, $T = \frac{2\pi m}{qB}$: the period ignores the speed
3. $B = \frac{\mu_0I}{2\pi d}$, $\frac{\mu_0I}{2R}$: fields circle their currents
4. $\oint\vec B\cdot d\vec l = \mu_0I_{\text{enc}}$: solenoid: B = μ₀nI
5. $\vec F = I\vec l\times\vec B$, $\vec\tau = \vec m\times\vec B$: parallel currents attract

Last, "Next: Chapter 5 · Electromagnetic Induction and AC" appears at the bottom.
