# Momentum, Impulse and Collisions — Explainer Script

- **Course:** Momentum, Rotation and Gravitation (Mechanics II)
- **Chapter:** Chapter 1 · Momentum, Impulse and Collisions (id: `mrg-1-momentum-impulse-collisions`)
- **Target runtime:** about 5.5 minutes (roughly 1,050 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mrg-1-momentum-impulse-collisions.py`, class `MrgCh1Video`

**Learning goal.** The learner writes Newton's second law as $\vec F = d\vec p/dt$ and gets conservation of momentum from the third law (skater 50 kg / 5 kg ball at 6 m/s ⇒ 0.6 m/s; rifle 5 kg / 20 g at 500 m/s ⇒ 2 m/s, with 2500 J against 10 J). They read impulse as the area under $F$–$t$ (0.15 kg ball, 20 → 15 m/s, 5 ms ⇒ $J = 5.25$ N s, $\bar F = 1050$ N) and know soft landings keep the impulse but cut the force. They handle variable mass (conveyor 2 kg/s at 3 m/s ⇒ 6 N, 18 W, half to heat; rocket thrust $u|dm/dt|$, $v = u\ln\frac{m_0}{m} - gt$, 50 kg/s). They classify 1D collisions (relative velocity reverses if elastic; equal masses swap; only $\tfrac12\mu u_{\text{rel}}^2$ can be lost), use $e$ = separation/approach and $h_n = e^{2n}h$, resolve oblique collisions (equal-mass elastic ⇒ 90°; $e$ only along the line of impact; floor rebound at 63.4°) and split multi-stage problems (ballistic pendulum: 1 m/s, 201 m/s, not 14 m/s).

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: body 1 and its momentum = PRIMARY (red), body 2 = SECONDARY (teal), centre of mass, totals and impulse area = ACCENT (amber), relative motion and lost energy = PURPLE, highlights = gold, correct = GREEN. Carts are rounded rectangles on wheels; their motion is driven by `ValueTracker`s with piecewise-linear positions so collisions happen at the right instant. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** symbols are spoken as words ("p equals m v", "u rel", "omega R"). Decimals are read as "nought point six", "two point two five".

---

## Title card

**Narration:** Chapter one. Momentum, impulse and collisions.

**Visuals:** `title_card("Momentum, Rotation & Gravitation", "Chapter 1 · Momentum, Impulse and Collisions")`.

---

## Scene 1 — Momentum is conserved (Lesson 1.1)

**Narration:**

- **Beat a:** A skater at rest on smooth ice throws a heavy ball forwards, and slides backwards. Nothing outside pushed her. She and the ball pushed on each other.
- **Beat b:** Newton wrote his second law with momentum, p equals m v: force is the rate of change of momentum. The push on the ball and the push on the skater are equal and opposite, so their changes of momentum cancel.
- **Beat c:** So with no external force, the total momentum never changes. Fifty kilograms of skater, five kilograms of ball thrown at six metres per second: she slides back at nought point six.
- **Beat d:** A five kilogram rifle fires a twenty gram bullet at five hundred metres per second, and kicks back at two. Equal and opposite momenta. But the bullet gets two and a half thousand joules, and the rifle only ten. Momentum is conserved; kinetic energy need not be.

**Visuals:**

- **Beat a:** A strip of ice; a teal stick-figure skater ("skater 50 kg") holding a red ball ("ball 5 kg"). The ball flies right while the skater creeps left (ten times slower); equal and opposite momentum arrows appear above each.
- **Beat b:** Clear. $\vec p = m\vec v$, $\vec F = \frac{d\vec p}{dt}$; $\frac{d\vec p_1}{dt} = \vec F_{12}$, $\frac{d\vec p_2}{dt} = \vec F_{21} = -\vec F_{12}$; $\Rightarrow \frac{d}{dt}(\vec p_1+\vec p_2) = \vec 0$ in amber.
- **Beat c:** The last line moves to the top in a red box. $0 = 5(6) + 50V \Rightarrow V = -0.6$ m/s in green.
- **Beat d:** Clear. $0.02(500) + 5V = 0 \Rightarrow V = -2$ m/s. A teal rifle fires a red bullet off-screen and recoils. $K_{\text{bullet}} = 2500$ J (red), $K_{\text{rifle}} = 10$ J (teal), caption "momentum conserved, kinetic energy not".

---

## Scene 2 — Impulse (Lesson 1.2)

**Narration:**

- **Beat a:** Integrate force over time and you get the change of momentum. That integral is the impulse: the area under the force time graph.
- **Beat b:** A nought point one five kilogram ball hits a wall at twenty metres per second and rebounds at fifteen. The momentum change is two point two five, minus minus three: five point two five newton seconds. Over five milliseconds, that is an average force of one thousand and fifty newtons, seven hundred times the ball's weight.
- **Beat c:** A tall thin pulse and a low wide one can have the same area. That is what giving hands, airbags and crash mats do: the same impulse, spread over a longer time, so a smaller force.

**Visuals:**

- **Beat a:** $\vec J = \int\vec F\,dt = \Delta\vec p$ at the top. Axes $F$ (N) against $t$ (ms); a tall triangular pulse (5 ms, peak 2100 N) with amber area, "impulse = area".
- **Beat b:** Right column: $p_1 = 0.15(-20) = -3$; $p_2 = 0.15(15) = 2.25$; $J = 5.25$ N s (amber); $\bar F = \frac{5.25}{0.005} = 1050$ N (red); "≈ 700× the weight".
- **Beat c:** The pulse morphs into a low wide triangle (20 ms, peak 525 N) with the same area; the force line becomes "$\Delta t = 20$ ms: $\bar F \approx 260$ N"; "same area, same impulse" and the $J$ line pulses.

---

## Scene 3 — Variable mass: conveyor belts and rockets (Lesson 1.3)

**Narration:**

- **Beat a:** When mass flows in or out, use the momentum form. Sand falls onto a belt moving at three metres per second, two kilograms every second. Each second, two kilograms must be brought up to three metres per second, so the belt needs a force of six newtons.
- **Beat b:** The motor supplies eighteen watts, but the sand only gains nine joules of kinetic energy each second. The other half becomes heat, as the sand skids up to speed.
- **Beat c:** A rocket throws its exhaust backwards at speed u, and the exhaust pushes the rocket forwards. The thrust is u times the rate of burning fuel. It pushes on its own exhaust, not on the air, so it works best in space.
- **Beat d:** Integrate, and the speed grows as u times the log of the mass ratio. To lift a five thousand kilogram rocket at ten metres per second squared, with an exhaust speed of two kilometres per second, it must burn fifty kilograms of fuel every second.

**Visuals:**

- **Beat a:** A hopper ("$dm/dt = 2$ kg/s") drops amber sand grains onto a belt with rollers ("$v = 3$ m/s"); grains ride the belt off its end. $F = v\frac{dm}{dt} = 3\times2 = 6$ N.
- **Beat b:** $P = Fv = 18$ W; $\Delta K$ per second $= \frac12(2)(3)^2 = 9$ W (teal); "the other 9 W becomes heat" (red). Sand keeps flowing.
- **Beat c:** Clear. A rocket with a red nose and teal fins, amber exhaust particles streaming down; a red "thrust" arrow. $F_{\text{thrust}} = u\left|\frac{dm}{dt}\right|$; "not the air" in red. The rocket rises.
- **Beat d:** $v = u\ln\frac{m_0}{m} - gt$; $u|dm/dt| = m(g+a) = 5000\times20$; $|dm/dt| = \frac{10^5}{2000} = 50$ kg/s (green). The rocket keeps climbing.

---

## Scene 4 — Elastic and inelastic collisions (Lesson 1.4)

**Narration:**

- **Beat a:** In every collision the forces are internal, so momentum is conserved. If kinetic energy is conserved too, the collision is elastic, and the algebra collapses to one simple fact: the relative velocity reverses. They separate as fast as they approached.
- **Beat b:** With the target at rest, equal masses simply swap velocities, like Newton's cradle. A heavy ball hitting a light one sends it off at nearly twice its speed. A light ball hitting a heavy one bounces straight back.
- **Beat c:** If they stick, they share one velocity: the velocity of the centre of mass. Kinetic energy is lost, but not all of it. Only the energy of motion relative to the centre of mass can go: one half, times the reduced mass mu, times the relative speed squared. The centre of mass keeps its share.

**Visuals:**

- **Beat a:** Header "Momentum always. Kinetic energy only if elastic." A red 2 kg cart at 4 m/s hits a teal 1 kg cart at rest; afterwards (the carts stop on screen) $v_1 = \frac43$, $v_2 = \frac{16}{3}$. $v_2 - v_1 = u_1 - u_2$ with "the relative velocity reverses"; check $\frac{16}{3} - \frac43 = 4 = 4 - 0$ (green).
- **Beat b:** Clear. Three tracks run at once: equal masses (the first cart stops dead, the second leaves at $u$), heavy on light (the light cart leaves at about $2u$), light on heavy (the light cart bounces back). Each track is captioned.
- **Beat c:** Clear. 2 kg at 4 m/s meets 1 kg at rest and they lock together: $v = v_{cm} = \frac{2(4)}{3} = \frac83$ m/s. Bars: "before: 16 J" (red); after, an amber "COM share 10.7 J" with a purple "relative 5.3 J: lost" on top, which fades. $\Delta K = \frac12\frac{m_1m_2}{m_1+m_2}(u_1-u_2)^2$.

---

## Scene 5 — The coefficient of restitution (Lesson 1.5)

**Narration:**

- **Beat a:** Real collisions sit between the extremes. The coefficient of restitution, e, is the speed of separation over the speed of approach, along the line of impact. One means elastic; zero means they stick together.
- **Beat b:** A ball dropped on the floor rebounds at e times its impact speed, so it rises to e squared times the height. Dropped from ten metres with e equal to one half, it climbs back to two and a half metres, then sixty two and a half centimetres: each bounce a quarter of the last.
- **Beat c:** And e belongs to the pair of surfaces, not to one ball. A tennis ball has one value on concrete, and another on grass.

**Visuals:**

- **Beat a:** $e = \frac{\text{speed of separation}}{\text{speed of approach}} = \frac{v_2-v_1}{u_1-u_2}$; then "$e = 1$: elastic" (green), "$0<e<1$: inelastic", "$e = 0$: they stick" (red).
- **Beat b:** A red ball drops onto a floor and bounces along a dashed path whose peaks fall by a factor of four. Teal bars for $n = 0..3$: 10, 2.5, 0.625, 0.16 m. $h_n = e^{2n}h$.
- **Beat c:** "e belongs to the pair of surfaces" in red.

---

## Scene 6 — Oblique collisions (Lesson 1.6)

**Narration:**

- **Beat a:** In two dimensions, conserve momentum in each direction separately. For equal masses, one at rest, in an elastic collision, momentum says u equals v one plus v two, and energy says u squared equals v one squared plus v two squared. So the two balls leave at ninety degrees.
- **Beat b:** A ball at ten metres per second, deflected thirty degrees, keeps ten cos thirty, about eight point seven, and the other ball takes ten sin thirty: five metres per second.
- **Beat c:** For smooth spheres, the contact force acts only along the line of centres. So the tangential parts pass through unchanged, and e acts only along the normal. A ball hitting a smooth floor at forty five degrees, with e of one half, leaves flatter: at sixty three degrees from the vertical.

**Visuals:**

- **Beat a:** Top view of a table. A red ball glances off a teal ball (line of centres at 60° to the red ball's path); the red ball peels off at 30°, the teal one at −60°, both leaving traced paths. $\vec u = \vec v_1 + \vec v_2$, $u^2 = v_1^2 + v_2^2$, $\Rightarrow \vec v_1\cdot\vec v_2 = 0$ (green); a right-angle mark and "90°" at the point of impact.
- **Beat b:** A velocity triangle: $u = 10$ (black), $10\cos30^\circ \approx 8.66$ (red), $10\sin30^\circ = 5$ (teal), with a right angle.
- **Beat c:** Clear. Header "e acts only along the line of impact". A hatched floor, a dashed normal, a red incoming arrow at 45° and a teal rebound at 63.4°, both with angle arcs. Right column: along the floor $5\sqrt2$ (unchanged); normal $5\sqrt2 \to e\cdot5\sqrt2 = 2.5\sqrt2$; $\tan\theta' = \frac{\tan45^\circ}{e} = 2 \Rightarrow \theta' \approx 63.4^\circ$ (green).

---

## Scene 7 — The JEE toolkit: split the story (Lesson 1.7)

**Narration:**

- **Beat a:** Hard problems are often two problems glued together. The rule: momentum across the collision, energy before and after it, never energy across it.
- **Beat b:** A ten gram bullet lodges in a two kilogram block, which swings up five centimetres. The swing conserves energy, so V is root two g h: one metre per second. The collision conserves momentum, so the bullet was moving at two hundred and one metres per second.
- **Beat c:** Use energy through the whole thing and you get about fourteen metres per second, badly wrong. The impact destroyed more than ninety nine percent of the bullet's kinetic energy.

**Visuals:**

- **Beat a:** "momentum across the collision, energy before and after it" (bold red) and "never energy across it".
- **Beat b:** A ballistic pendulum: a teal block on two strings from a hatched ceiling. A red bullet flies in and lodges; the block swings up 32°. Dashed levels and a brace "$h = 5$ cm"; labels "stage 1: collision (momentum)" (red) and "stage 2: swing (energy)" (teal). Right: $V = \sqrt{2gh} = \sqrt{2(10)(0.05)} = 1$ m/s (teal); $0.01v = 2.01V \Rightarrow v = 201$ m/s (red).
- **Beat c:** $\frac12mv^2 = (m+M)gh \Rightarrow v \approx 14$ m/s with a red cross; "202 J → 1 J" in purple.

---

## Scene 8 — Recap and next (Lesson 1.8)

**Narration:**

- **Beat a:** To recap. Force is the rate of change of momentum, so with no external force the total momentum is constant. Impulse is the area under force against time, and it equals the change of momentum.
- **Beat b:** Mass flowing in or out needs the momentum form. In a collision, e sets how fast the bodies separate, and only the kinetic energy of relative motion can be lost.
- **Beat c:** And in multi stage problems: momentum across the collision, energy before and after it. Try the mastery quiz. Then chapter two lets bodies spin.

**Visuals:** Title "Chapter 1 in six lines". Six numbered rows, formula left and muted note right:

1. $\frac{d\vec P}{dt} = \vec F_{\text{ext}}$: no external force, P is conserved
2. $\vec J = \int\vec F\,dt = \Delta\vec p$: same impulse, longer time, smaller force
3. $F = u\left|\frac{dm}{dt}\right|$: rockets push on their own exhaust
4. $v_2 - v_1 = e(u_1 - u_2)$: e = 1 elastic, e = 0 they stick
5. $\Delta K = \frac12\mu(1-e^2)u_{\text{rel}}^2$: only relative KE can be lost
6. $p$ across, $E$ before/after: split multi-stage problems

Last, "Next: Chapter 2 · Rotational Kinematics and Moment of Inertia" appears at the bottom.
