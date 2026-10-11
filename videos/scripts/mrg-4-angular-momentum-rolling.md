# Angular Momentum and Rolling — Explainer Script

- **Course:** Momentum, Rotation and Gravitation (Mechanics II)
- **Chapter:** Chapter 4 · Angular Momentum and Rolling (id: `mrg-4-angular-momentum-rolling`)
- **Target runtime:** about 4.5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mrg-4-angular-momentum-rolling.py`, class `MrgCh4Video`

**Learning goal.** The learner defines $\vec L = \vec r\times\vec p$, $L = mvr_\perp$ (2 kg at 3 m/s on a line 4 m from $O$ ⇒ 24 kg m²/s at every instant, 0 about a point on the line), derives $\vec\tau = d\vec L/dt$ and $L = I\omega$, and uses conservation when external torque vanishes (skater $I$: 4 → 1.6 kg m², ω: 3 → 7.5 rad/s, $K$: 18 → 45 J; clay on a hinged rod conserves $L$ about the hinge, not $\vec p$). They treat rolling as translation plus spin locked by $v_{cm} = \omega R$ (contact point at rest, top $2v$, front $\sqrt2v$, cycloid, $K = \frac12Mv^2(1+k^2/R^2)$), predict incline races from $a = \frac{g\sin\theta}{1+k^2/R^2}$ (solid sphere, disc, hollow sphere, ring; 30°, 7 m ⇒ $\sqrt{50} \approx 7.07$ m/s; static friction does no work), solve slip-to-roll ($v = 7 - 2t$, $\omega R = 5t$, $t = 1$ s, $v_f = \frac57v_0$, or $L$ about the contact point; a spinning ring set down reaches $\frac12\omega_0R$) and blows on rigid bodies ($v_{cm} = J/M$, $\omega = 6J/ML$; rod 2 kg, 1.2 m, 3 N s ⇒ 1.5 m/s, 7.5 rad/s, struck end 6 m/s, rest point $2L/3$ from the struck end; sweet spot $2L/3$ from a hinge).

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: bodies and momentum = PRIMARY (red), velocities and position vectors = SECONDARY (teal), angular momentum, lever arms and axes = ACCENT (amber), friction and spin velocity = PURPLE, highlights = gold, correct = GREEN. Wheels are drawn with three spokes so their spin is visible; the solid sphere is filled, the disc half filled, the hollow sphere has an equator ellipse and the ring is an outline. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** symbols are spoken as words ("L equals r cross p", "omega R", "k squared over R squared", "five sevenths v nought").

---

## Title card

**Narration:** Chapter four. Angular momentum and rolling.

**Visuals:** `title_card("Momentum, Rotation & Gravitation", "Chapter 4 · Angular Momentum and Rolling")`.

---

## Scene 1 — Angular momentum (Lesson 4.1)

**Narration:**

- **Beat a:** Force changes momentum, and torque changes spin. The quantity torque changes is angular momentum: L equals r cross p. Its size is m v times the lever arm, the perpendicular distance from the point to the line of motion.
- **Beat b:** A two kilogram particle moves at three metres per second along a straight line four metres from O. Its angular momentum is six times four: twenty four, and it stays twenty four as the particle moves. About a point on its line, L is zero.
- **Beat c:** Differentiate r cross p. The first term, v cross m v, vanishes, leaving r cross F: torque is the rate of change of angular momentum. For a rigid body about a fixed axis, L is I omega.

**Visuals:**

- **Beat a:** A point $O$ and a dashed horizontal line 4 m above it. A red particle with a red momentum arrow moves along the line; a teal $\vec r$ from $O$ follows it. $\vec L = \vec r\times\vec p$; $L = mv\,r_\perp$ (amber); an amber perpendicular "$r_\perp = 4$ m" with a right-angle mark.
- **Beat b:** $L = (2)(3)(4) = 24$ kg m²/s and "the same at every instant" while the particle keeps moving and $\vec r$ swings round. A point on the line is marked "$L = 0$" in red.
- **Beat c:** Clear. Boxed $\frac{d\vec L}{dt} = \underbrace{\vec v\times m\vec v}_{=\vec 0} + \vec r\times\vec F = \vec\tau$; "rigid body: $L = I\omega$" (amber).

---

## Scene 2 — Conservation of angular momentum (Lesson 4.2)

**Narration:**

- **Beat a:** With no external torque, angular momentum is constant. A skater spins at three radians per second with her arms out, I equal to four. She pulls them in to one point six, and spins at seven point five.
- **Beat b:** Her kinetic energy jumps from eighteen joules to forty five. Angular momentum is conserved, but kinetic energy is not: her muscles did work pulling her arms in.
- **Beat c:** And when a lump of clay hits a hinged rod, the hinge can give a sudden push, so linear momentum is not conserved. Angular momentum about the hinge is, because the hinge force has no torque there.

**Visuals:**

- **Beat a:** "a skater, seen from above": body, head and outstretched red arms with hands, spinning. $\tau_{\text{ext}} = 0 \Rightarrow L = I\omega =$ constant. The arms pull in and the spin rate rises in proportion ($\omega \propto 1/I$); $4\times3 = 1.6\,\omega_2 \Rightarrow \omega_2 = 7.5$ rad/s.
- **Beat b:** $K_1 = \frac12(4)(3^2) = 18$ J; $K_2 = \frac12(1.6)(7.5^2) = 45$ J (red); "work done by her muscles".
- **Beat c:** Clear. A tan rod hangs from a hinge; a red clay ball flies in, sticks to the bottom and the rod swings up 50°. A purple "hinge impulse" arrow at the hinge. "$\vec p$ conserved?" with a red cross; "$L$ about the hinge" with a green check.

---

## Scene 3 — Rolling without slipping (Lesson 4.3)

**Narration:**

- **Beat a:** A rolling wheel does two things at once. Its centre moves forward at v, and it spins about the centre. Add the two velocities at every point.
- **Beat b:** At the bottom, translation carries the point forward at v and spin carries it back at omega R. Rolling without slipping means these cancel: v equals omega R, and the contact point is momentarily at rest. The top moves at two v, and the front at root two v.
- **Beat c:** So at each instant the wheel is pivoting about its contact point. A point on the rim traces a cycloid, stopping for an instant each time it touches the ground.
- **Beat d:** The kinetic energy is translation plus spin: one half M v squared, times one plus k squared over R squared.

**Visuals:**

- **Beat a:** A wheel rolls along the ground and stops. At the top, bottom and front: a teal translation arrow and a purple spin arrow each (legend "translation", "spin"); $\vec v_P = \vec v_{cm} + \vec\omega\times\vec r$.
- **Beat b:** The bottom pair pulses; $v_{cm} = \omega R$ (amber). The pairs are replaced by red resultants: $2v$ at the top, a dot "0" at the bottom, $\sqrt2v$ at the front.
- **Beat c:** An "instantaneous axis" marker at the contact point with dashed amber lines to rim points. Then the wheel rolls on while a red rim point traces a cycloid with a cusp at the ground.
- **Beat d:** $K = \frac12Mv^2 + \frac12Mk^2\frac{v^2}{R^2} = \frac12Mv^2\left(1+\frac{k^2}{R^2}\right)$ on a background panel.

---

## Scene 4 — Rolling down an incline (Lesson 4.4)

**Narration:**

- **Beat a:** Line up a ring, a disc, a hollow ball and a solid ball on a slope, and let them go together. Gravity pulls each one down the slope. Static friction, pointing up the slope, supplies the torque that spins it.
- **Beat b:** Forces and torques together give the acceleration: g sine theta, over one plus k squared over R squared. Mass and radius cancel. Only the shape number decides the race: the solid sphere wins, then the disc, then the hollow sphere, and the ring comes last.
- **Beat c:** Friction acts at a point that is momentarily at rest, so it does no work, and energy is conserved. A solid sphere rolling seven metres down a thirty degree slope reaches root fifty: about seven point zero seven metres per second.

**Visuals:**

- **Beat a:** Four parallel ramps labelled solid sphere, disc, hollow sphere, ring, each with its body at the top. On the top body: a purple $Mg\sin\theta$ arrow down the slope and an amber friction $f$ up the slope at the contact point.
- **Beat b:** $a = \frac{g\sin\theta}{1+k^2/R^2}$ (red). The race runs: each body accelerates as $1/(1+k^2/R^2)$, rolling (spokes turn). Finishing labels "1. $k^2/R^2 = \frac25$" (green) through "4. $k^2/R^2 = 1$".
- **Beat c:** "static friction does no work" (amber). $a = \frac{10\times\frac12}{7/5} = \frac{25}{7}$ m/s²; $v^2 = 2as = 2\cdot\frac{25}{7}\cdot7 = 50$; $v = \sqrt{50} \approx 7.07$ m/s (green).

---

## Scene 5 — From slipping to rolling (Lesson 4.5)

**Narration:**

- **Beat a:** A bowling ball leaves the hand sliding, with no spin. Kinetic friction acts backwards at the contact point: it slows the centre down and spins the ball up, until v equals omega R, and it rolls.
- **Beat b:** Launched at seven metres per second, with mu equal to nought point two, its speed falls as seven minus two t, while omega R rises as five t. They meet after one second, at five metres per second: five sevenths of the launch speed.
- **Beat c:** There is a slicker route. Friction acts at the contact line, so angular momentum about any point on the floor is conserved. That gives five sevenths v nought in one line, without mu or time. And friction does not always slow a ball: a ring set down spinning is pulled forwards, to half of omega nought R.

**Visuals:**

- **Beat a:** A red ball slides along a floor ("skids") with a purple $\mu Mg$ friction arrow backwards at the contact point; its spin builds up until it rolls ("rolls", green) and the friction arrow disappears.
- **Beat b:** Graph against $t$ (s): teal $v = 7 - 2t$ falling, purple $\omega R = 5t$ rising, meeting (gold dot) at $(1, 5)$ and running together after. $7 - 2t = 5t \Rightarrow t = 1$ s; $v_f = 5$ m/s $= \frac57v_0$ (green).
- **Beat c:** $Mv_0R = Mv_fR + \frac25MR^2\frac{v_f}{R}$ with "L about the contact point is conserved" (amber); then "ring set down spinning: $v_f = \frac12\omega_0R$" (purple).

---

## Scene 6 — Blows on rigid bodies (Lesson 4.6)

**Narration:**

- **Beat a:** A sudden blow gives both linear and angular impulse. Strike a rod lying on a smooth table at one end. Its centre moves at J over M, exactly as if it were struck in the middle, and on top of that it spins, at six J over M L.
- **Beat b:** A two kilogram rod, one point two metres long, struck at one end with three newton seconds: the centre moves at one point five metres per second, and the rod spins at seven point five radians per second. The struck end moves at six. One point, two thirds of the way from the struck end, starts at rest.
- **Beat c:** Hinge the rod at its far end instead, and strike it at the matching point, two thirds of the way from the hinge: the hinge feels no jolt at all. That is the sweet spot of a cricket bat.

**Visuals:**

- **Beat a:** "a rod on a smooth table, seen from above": a tan rod with a COM marker, struck at its right end by a red impulse arrow $J$. $M\Delta v_{cm} = J$, $I_{cm}\Delta\omega = Jd$; $v_{cm} = \frac JM$, $\omega = \frac{6J}{ML}$ (red).
- **Beat b:** $v_{cm} = \frac32 = 1.5$ m/s; $\omega = \frac{3\times0.6}{0.24} = 7.5$ rad/s; teal velocity arrows along the rod grow linearly from −3 m/s at the far end to 6 m/s at the struck end, with a green dot "starts at rest"; $v_{\text{end}} = 1.5 + 7.5(0.6) = 6$ m/s; a brace "$\frac{2L}{3}$" from the struck end to the rest point.
- **Beat c:** Clear. A cricket bat hanging from a hinge, brace "$\frac{2L}{3}$" from the hinge. A red ball hits that point (gold flash) and bounces away; "sweet spot: no impulse at the hinge" (green).

---

## Scene 7 — Recap and next (Lesson 4.7)

**Narration:**

- **Beat a:** To recap. Angular momentum is r cross p, or I omega for a rigid body, and torque is its rate of change. With no external torque about a point, it is conserved, though kinetic energy may not be.
- **Beat b:** Rolling is translation plus rotation, locked by v equals omega R. Down a slope, the shape number decides the race. A skidding ball rolls once friction has done its work, and a blow gives both speed and spin.
- **Beat c:** Try the mastery quiz. Then chapter five turns to a force that acts across empty space: gravitation.

**Visuals:** Title "Chapter 4 in six lines". Six numbered rows, formula left and muted note right:

1. $\vec L = \vec r\times\vec p$, $L = I\omega$: mv times the lever arm
2. $\vec\tau_{\text{ext}} = \frac{d\vec L}{dt}$: no torque, L conserved, K need not be
3. $v_{cm} = \omega R$: contact point at rest, top at 2v
4. $a = \frac{g\sin\theta}{1+k^2/R^2}$: the shape number decides the race
5. $v_f = \frac57v_0$: L about the contact point conserved
6. $\Delta v = \frac JM$, $\Delta\omega = \frac{Jd}{I_{cm}}$: a blow gives speed and spin

Last, "Next: Chapter 5 · Gravitation" appears at the bottom.
