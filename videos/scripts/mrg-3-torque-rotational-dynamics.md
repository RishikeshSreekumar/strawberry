# Torque and Rotational Dynamics — Explainer Script

- **Course:** Momentum, Rotation and Gravitation (Mechanics II)
- **Chapter:** Chapter 3 · Torque and Rotational Dynamics (id: `mrg-3-torque-rotational-dynamics`)
- **Target runtime:** about 4 minutes (roughly 800 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mrg-3-torque-rotational-dynamics.py`, class `MrgCh3Video`

**Learning goal.** The learner reads torque as $\vec\tau = \vec r\times\vec F$, $\tau = rF\sin\theta = rF_\perp = r_\perp F$ (door hinge; spanner 0.25 m, 40 N ⇒ 10 N m, only 5 N m at 30°; anticlockwise positive) and knows a couple has the same torque $Fd$ about every point (10 N × 0.4 m = 4 N m). They derive $\tau_{\text{ext}} = I\alpha$ from $F_t = mr\alpha$ and use it on pulleys (2 kg block on a 4 kg disc ⇒ 5 m/s²; Atwood 3 kg / 1 kg on a 4 kg disc ⇒ $\frac{10}{3}$ m/s², tensions 20 N and 13.3 N) and a hinged rod ($\alpha = 3g/2L$, end at 1.5g). They apply both equilibrium conditions with torques about any convenient point (beam: $N_B = 175$ N, $N_A = 325$ N; ladder: $\mu \ge 0.375$), use $W = \int\tau\,d\theta$, $K = \frac12I\omega^2$, $P = \tau\omega$ (block falls 1 m ⇒ $\sqrt{10}$ m/s, half the energy in the disc; toppling rod tip $\sqrt{3gL}$), and find support forces from the motion (plank: the remaining support drops to $mg/4$; hinge force grows to $2.5mg$).

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: forces = PRIMARY (red), position vectors, normal forces and lever arms in teal (SECONDARY), axes, hinges, torque and tension = ACCENT (amber; an axis out of the screen is a circled dot), weights = PURPLE, highlights = gold, correct = GREEN. Wooden doors, rods and ladders are tan. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** symbols are spoken as words ("tau equals r cross F", "three g over two L", "root three g L"); "N B" and "N A" are read as letters.

---

## Title card

**Narration:** Chapter three. Torque and rotational dynamics.

**Visuals:** `title_card("Momentum, Rotation & Gravitation", "Chapter 3 · Torque and Rotational Dynamics")`.

---

## Scene 1 — Torque (Lesson 3.1)

**Narration:**

- **Beat a:** Push a heavy door right next to its hinges and it barely moves. Push at the handle and it swings. Push at the handle, but straight towards the hinges, and nothing happens at all.
- **Beat b:** The turning effect is torque: tau equals r cross F. Its size is r F sine theta. Read it as r times the perpendicular part of the force, or as F times the lever arm: the perpendicular distance from the axis to the force's line of action.
- **Beat c:** Pull a quarter metre spanner at right angles with forty newtons: ten newton metres. Pull at thirty degrees and you get only five. In flat problems, anticlockwise counts positive.
- **Beat d:** Two equal and opposite forces, a distance d apart, form a couple. The net force is zero, but the torque is F times d, about every point. A couple spins a body without pushing it anywhere.

**Visuals:**

- **Beat a:** "a door, seen from above": a wall, a hinge marker and a tan door. A red push near the hinge turns it 4° ("barely moves"); a push at the handle swings it 35°; a push along the door towards the hinge does nothing (red cross, "nothing").
- **Beat b:** Clear. Axis $O$, teal $\vec r$ to a point, red $\vec F$ at angle $\theta$. $\vec\tau = \vec r\times\vec F$ and $\tau = rF\sin\theta = rF_\perp = r_\perp F$. A dashed line of action and an amber perpendicular from $O$ with a right-angle mark: "$r_\perp$ lever arm".
- **Beat c:** $0.25\times40\times\sin90^\circ = 10$ N m; $0.25\times40\times\sin30^\circ = 5$ N m (red); "anticlockwise +, clockwise −".
- **Beat d:** Clear. A steering wheel with 10 N up on one side and 10 N down on the other, brace $d = 0.4$ m. $\sum\vec F = \vec 0$; $\tau = Fd = 10\times0.4 = 4$ N m (amber); "the same about every point". The wheel spins up.

---

## Scene 2 — τ = Iα (Lesson 3.2)

**Narration:**

- **Beat a:** Now the rotational second law. Each particle obeys F equals m a, with a tangential acceleration r alpha. Multiply by r, and the torque on it is m r squared alpha. Sum over the body; internal torques cancel in pairs. Torque equals I alpha.
- **Beat b:** A two kilogram block hangs from a string wound round a four kilogram disc. The disc must be spun up too, so the block falls at only five metres per second squared: half of g.
- **Beat c:** With a massive pulley, the tensions on the two sides differ: that difference is what spins the pulley. Three and one kilograms over a four kilogram disc give tensions of twenty newtons and about thirteen.
- **Beat d:** A rod hinged at one end and released from horizontal has alpha equal to three g over two L. Its free end starts falling at one and a half g: faster than a dropped stone.

**Visuals:**

- **Beat a:** $F_{t,i} = m_ia_{t,i} = m_ir_i\alpha$; $\tau_i = r_iF_{t,i} = m_ir_i^2\alpha$; boxed $\sum\tau_{\text{ext}} = \left(\sum m_ir_i^2\right)\alpha = I\alpha$ (amber).
- **Beat b:** Clear. A teal disc ("disc 4 kg") turns as a red 2 kg block unwinds the string and falls. $20 - T = 2a$, $TR = \frac12MR^2\frac aR$; $a = \frac{g}{1+M/2m} = 5$ m/s² (green).
- **Beat c:** Clear. An Atwood machine on a teal disc: red 3 kg block and teal 1 kg block, amber tension arrows $T_1 = 20$ N and $T_2 \approx 13.3$ N of different lengths. $a = \frac{(m_1-m_2)g}{m_1+m_2+I/R^2} = \frac{20}{6} = \frac{10}{3}$ m/s²; $(T_1 - T_2)R = I\alpha$.
- **Beat d:** Clear. A tan rod hinged at the left, horizontal. $\alpha = \frac{mg\frac L2}{\frac13mL^2} = \frac{3g}{2L}$. A red arrow "$\alpha L = 1.5g$" at the free end beside a purple stone with "$g$"; the rod starts to swing down and the stone falls.

---

## Scene 3 — Equilibrium of rigid bodies (Lesson 3.3)

**Narration:**

- **Beat a:** A body at rest stays at rest only if the forces balance and the torques balance. Both are needed: a couple has zero net force, yet it spins a wheel. And once the forces balance, you may take torques about any point you like.
- **Beat b:** A four metre beam weighing two hundred newtons rests on supports at its ends, with a three hundred newton load one metre from end A. Take torques about A, and the unknown force there drops out: N B is one seventy five newtons. Balancing forces then gives N A, three twenty five.
- **Beat c:** A five metre ladder weighing two hundred newtons leans on a smooth wall, its top four metres up. Torques about the foot give a wall push of seventy five newtons, so friction must supply seventy five too: the coefficient must be at least nought point three seven five.

**Visuals:**

- **Beat a:** $\sum\vec F = \vec 0$ and $\sum\vec\tau = \vec 0$ about any one point; "pick the point that unknown forces pass through".
- **Beat b:** A beam on supports $A$ and $B$, a red load box with a 300 arrow, a purple 200 arrow at the middle, teal $N_A$ and $N_B$. Support $A$ pulses. "about $A$: $N_B(4) - 200(2) - 300(1) = 0$"; $N_B = 175$ N, $N_A = 500 - 175 = 325$ N (green).
- **Beat c:** Clear. A wall, a floor and a tan ladder (4 m up, 3 m out). Forces: purple 200 N weight at the middle, teal 200 N floor push, red friction $f$, teal wall push $N_w$. The foot is highlighted. "about the foot: $N_w(4) = 200(1.5)$"; $N_w = 75$ N $= f$; $\mu \ge \frac{75}{200} = 0.375$ (green).

---

## Scene 4 — Work, energy and power in rotation (Lesson 3.4)

**Narration:**

- **Beat a:** A tangential force moving through an arc r d theta does work tau d theta. So work is the integral of torque over angle, rotational kinetic energy is one half I omega squared, and power is torque times omega.
- **Beat b:** Release the two kilogram block on the four kilogram disc and let it fall one metre. It loses twenty joules. Half goes into the block, and half into the spinning disc. So the block moves at root ten, about three point one six metres per second, not root twenty.
- **Beat c:** A rod standing on its end topples over. Its centre of mass falls L over two, and all that energy becomes rotation about the base. The top hits the ground at root three g L.

**Visuals:**

- **Beat a:** $dW = F_tr\,d\theta = \tau\,d\theta$; then $W = \int\tau\,d\theta$, $K = \frac12I\omega^2$, $P = \tau\omega$ in amber.
- **Beat b:** The amber line moves to the top. The disc and block from Scene 2: the block falls. Bars: purple "PE lost 20 J"; stacked red "block 10 J" and teal "disc 10 J". $20 = \frac12(m+\frac M2)v^2 = 2v^2$; $v = \sqrt{10} \approx 3.16$ m/s (green); "not $\sqrt{2gh} = \sqrt{20}$" (red).
- **Beat c:** Clear. A tan rod stands on a floor and topples, its tip tracing a quarter circle and a COM marker riding along. A red velocity arrow at the tip. $mg\frac L2 = \frac12\left(\frac13mL^2\right)\omega^2$; $v_{\text{tip}} = \omega L = \sqrt{3gL}$ (green).

---

## Scene 5 — Hinge forces and instantaneous analysis (Lesson 3.5)

**Narration:**

- **Beat a:** A plank rests on two bricks, each carrying half its weight. Kick one away. At that very instant, how hard does the other brick push? Not half the weight, and not all of it.
- **Beat b:** The plank starts to pivot about the remaining brick, like a hinged rod. Alpha is three g over two L, so the centre of mass accelerates down at three quarters g. Then m g minus N equals three quarters m g, and N is just a quarter of the weight.
- **Beat c:** Support forces are not fixed shares of the weight. They are whatever the motion needs. As a hinged rod swings down, the hinge force grows, to two and a half m g at the bottom.

**Visuals:**

- **Beat a:** A plank on two red bricks with teal $\frac{mg}{2}$ arrows. The right brick slides away; a gold "?" over the left support.
- **Beat b:** $\alpha = \frac{3g}{2L}$; a COM marker with a purple $\frac34g$ arrow and $a_{cm} = \alpha\frac L2 = \frac34g$; $mg - N = m\cdot\frac34g \Rightarrow N = \frac{mg}{4}$ (green). The support arrow shrinks to $\frac{mg}{4}$ and the plank begins to tip.
- **Beat c:** Clear. Graph of $F_{\text{hinge}}/mg = \sqrt{6.25\sin^2\theta + 0.0625\cos^2\theta}$ against $\theta$ below horizontal, from 0.25 (green) to 2.5 at $\frac\pi2$ (amber, flash). "support forces follow the motion".

---

## Scene 6 — Recap and next (Lesson 3.6)

**Narration:**

- **Beat a:** To recap. Torque is r cross F: force times lever arm. Summed over a rigid body, Newton's second law becomes torque equals I alpha.
- **Beat b:** Equilibrium needs both forces and torques to balance, about any point you choose. Rotation stores energy, one half I omega squared, and power is torque times omega. And support forces are whatever the motion requires.
- **Beat c:** Try the mastery quiz. Then chapter four meets the quantity that torque changes: angular momentum.

**Visuals:** Title "Chapter 3 in five lines". Five numbered rows, formula left and muted note right:

1. $\vec\tau = \vec r\times\vec F$: force times lever arm; couples
2. $\tau_{\text{ext}} = I\alpha$: massive pulleys, tensions differ
3. $\sum\vec F = 0$, $\sum\vec\tau = 0$: torques about any point
4. $W = \int\tau\,d\theta$, $P = \tau\omega$: rotation shares the energy
5. $\vec F_{\text{ext}} = M\vec a_{cm}$: support forces follow the motion

Last, "Next: Chapter 4 · Angular Momentum and Rolling" appears at the bottom.
