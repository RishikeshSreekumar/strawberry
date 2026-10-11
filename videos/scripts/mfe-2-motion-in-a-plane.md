# Motion in a Plane — Explainer Script

- **Course:** Mechanics I: Motion, Forces and Energy
- **Chapter:** Chapter 2 · Motion in a Plane (id: `mfe-2-motion-in-a-plane`)
- **Target runtime:** about 6 minutes (roughly 900 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mfe-2-motion-in-a-plane.py`, class `MfeCh2Video`

**Learning goal.** The learner sees motion in a plane as two straight-line motions that share one clock. Position, velocity and acceleration are differentiated component by component. Velocity is tangent to the path, and acceleration points into the bend, not necessarily along the velocity. Projectiles come from $x = (u\cos\theta)t$ and $y = (u\sin\theta)t - \tfrac12gt^2$: $T$, $H$, $R$ and the parabola all follow, the speed at the top is $u\cos\theta$, and the acceleration is $\vec g$ everywhere. Complementary angles share a range, a horizontal launch falls as long as a drop, and 45° is best only on level ground. Relative velocity is a vector difference, $\vec v_{AB} = \vec v_A - \vec v_B$; two projectiles have zero relative acceleration. River, wind and rain problems use ground velocity = velocity relative to the medium + velocity of the medium. Circular motion at constant speed still has $a_c = v^2/r$ toward the centre, from the velocity triangle.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: velocity = SECONDARY (teal), acceleration and gravity = PRIMARY (red), components = ACCENT (amber), relative velocity / change in velocity / resultant = PURPLE, correct = GREEN, wrong = red cross. A muted lesson header ("2.x · …") sits in the top-left corner of each scene. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`. Every projectile uses $g = 10$ m/s² and is drawn to scale.

**TTS note:** symbols are spoken as words ("v A minus v B", "u squared sine two theta over g", "delta v"). Numbers are spelled out as they should be said. Where the variable $a$ is spoken ("a t squared", "m a", "a c"), the scene spells it `[[char LTRL]]a[[char NORM]]` (via `say_fix` and the `SAY_A` phrase list) so `say` does not read it as the article.

---

## Title card

**Narration:** Chapter two. Motion in a plane.

**Visuals:** `title_card("Motion, Forces and Energy", "Chapter 2 · Motion in a Plane")`.

---

## Scene 1 — Two motions, one clock (Lesson 2.1)

**Narration:**

- **Beat a:** Stand on a balcony. Drop one ball, and at the same instant flick another sideways off the edge. Which lands first? They land together. The sideways motion does nothing at all to the fall.
- **Beat b:** That is this whole chapter in one picture. Motion in a plane is two straight-line motions at once, linked only by the clock. Write the position as x i hat plus y j hat, and differentiate each component on its own.
- **Beat c:** Velocity always points along the tangent to the path. But acceleration need not point along the velocity. Take a thrown ball's velocity at launch, and again zero point eight seconds later. Put them tail to tail: the change, delta v, points straight down, into the bend.
- **Beat d:** Try one. The position is three t i hat, plus four t minus five t squared, j hat. Differentiate: three i hat plus four minus ten t, j hat. Again: minus ten j hat, constant and straight down. A projectile in disguise.

**Visuals:**

- **Beat a:** A ledge and wall on the left, ground below. A red ball drops straight down while a blue ball flies out on a parabola (a `ValueTracker` clock, linear in time, with the blue path traced). Ghost outlines at three equal times are joined by dashed horizontal lines: both balls are always at the same height. "They land together." appears with "the sideways motion does nothing to the fall".
- **Beat b:** Clear. "two straight-line motions, linked only by the clock" at the top, then $\vec r = x\hat i + y\hat j$, $\vec v = \frac{d\vec r}{dt} = v_x\hat i + v_y\hat j$, $\vec a = \frac{d\vec v}{dt} = a_x\hat i + a_y\hat j$, and the note "differentiate component by component".
- **Beat c:** A parabolic path for $\vec r = (5t,\ 6t - 5t^2)$. Teal $\vec v_1 = (5, 6)$ at launch and $\vec v_2 = (5, -2)$ at $t = 0.8$ s are drawn tangent to the path ("v is along the tangent"). Copies move to a common tail on the right, and a purple $\Delta\vec v = (0, -8)$ joins their tips, pointing straight down. Caption: "Δv points into the bend".
- **Beat d:** Clear. Three lines in turn: $\vec r = 3t\,\hat i + (4t - 5t^2)\hat j$, $\vec v = 3\hat i + (4 - 10t)\hat j$, $\vec a = -10\hat j$ (red). Note: "x uniform, y uniformly accelerated: a projectile in disguise".

---

## Scene 2 — Projectile motion (Lesson 2.2)

**Narration:**

- **Beat a:** Once a ball is released, the only force on it is gravity, straight down. So the horizontal motion has no acceleration, and the vertical motion is free fall. Two chapter one problems, sharing one clock.
- **Beat b:** Watch the velocity. The horizontal part never changes. The vertical part shrinks, vanishes at the top, then grows downward. The path is a parabola.
- **Beat c:** Everything else follows. Set y to zero for the time of flight: two u sine theta over g. Set v y to zero for the greatest height: u squared sine squared theta, over two g. And the range is u squared sine two theta, over g.
- **Beat d:** At twenty metres per second and forty five degrees, the ball flies forty metres, rises ten, and lands after about two point eight three seconds.
- **Beat e:** Two traps. The velocity at the top is not zero. Only its vertical part is, so the speed there is u cos theta. And the acceleration at the top is not zero either. It is g, straight down, at every point of the flight.

**Visuals:**

- **Beat a:** A ground line and a red ball at the origin (to scale, 0.25 units per metre, $u = 20$ m/s at 45°). At the top: "horizontal: $a_x = 0$, $x = (u\cos\theta)t$" in teal and "vertical: $a_y = -g$, $y = (u\sin\theta)t - \tfrac12gt^2$" in amber.
- **Beat b:** The ball flies, tracing its parabola. A teal $v_x$ arrow rides on the ball at constant length; an amber $v_y$ arrow shrinks to nothing at the top (brief pause) and grows downward on the way down. A small key labels $v_x$ and $v_y$.
- **Beat c:** The equations and arrows fade. Across the top: $T = \frac{2u\sin\theta}{g}$, $H = \frac{u^2\sin^2\theta}{2g}$ (a dashed height line $H$ drops from the vertex), $R = \frac{u^2\sin2\theta}{g}$ (a brace $R$ under the ground).
- **Beat d:** In green: $u = 20$ m/s, $\theta = 45^\circ$: $R = 40$ m, $H = 10$ m, $T = 2\sqrt2 \approx 2.83$ s.
- **Beat e:** Formulas fade. At the vertex: a teal horizontal arrow "$v_{\text{top}} = u\cos\theta \ne 0$" and a red downward arrow "$\vec a = \vec g$ at every point". Two crossed-out quotes at the top: "velocity at the top is zero", "acceleration at the top is zero".

---

## Scene 3 — Special cases (Lesson 2.3)

**Narration:**

- **Beat a:** Sine two theta is the same for theta and ninety degrees minus theta. So at twenty metres per second, thirty and sixty degrees land at the same spot, thirty four point six metres away. The steeper throw goes higher and stays up longer. At forty five degrees the pair merges, and the range is largest: u squared over g, forty metres.
- **Beat b:** Launch horizontally from a height, and the fall takes exactly as long as a simple drop. From a forty five metre cliff, three seconds, whatever the speed. At ten metres per second, the stone lands thirty metres out.
- **Beat c:** So forty five degrees is not always best. From a height, a flatter throw wins. On a slope, tilt the axes along and across it, and split gravity into g sine alpha and g cos alpha. Up an incline, the best launch is forty five degrees plus half the slope angle.

**Visuals:**

- **Beat a:** $\sin2\theta = \sin2(90^\circ - \theta)$ at the top. To-scale trajectories at 20 m/s: 30° (teal) and 60° (amber) landing at the same point, labelled "same range: $20\sqrt3 \approx 34.6$ m"; $H_{30} = 5$ m, $H_{60} = 15$ m. Then a dashed purple 45° path lands further out: "$45^\circ$: $R_{\max} = u^2/g = 40$ m".
- **Beat b:** Clear. A 45 m cliff (0.1 units per metre) over a teal sea line. Three horizontal launches at 5, 10 and 15 m/s. Dots at $t = 1, 2, 3$ s sit on shared dashed horizontal lines: every stone is at the same height at the same time. On the right: $T = \sqrt{2h/g} = \sqrt{90/10} = 3$ s, then "10 m/s: $R = 10 \times 3 = 30$ m" and "same fall time, whatever the speed".
- **Beat c:** Clear. A crossed-out quote: "45° always gives the maximum range". A 25° incline with tilted axes $x'$ (along) and $y'$ (perpendicular). A red $g$ arrow splits into amber $g\sin\alpha$ (down the slope) and $g\cos\alpha$ (into the slope). In green: "up a slope: $\theta_{\text{best}} = 45^\circ + \tfrac\alpha2$", with "from a height: flatter than 45°" beneath.

---

## Scene 4 — Relative velocity (Lesson 2.4)

**Narration:**

- **Beat a:** Motion is always measured from something. The velocity of A as seen by B is v A minus v B. Two trains, a hundred and a hundred and fifty metres long, run at twenty and thirty metres per second. Moving in opposite directions, the relative speed is fifty, so they cross in two hundred fifty over fifty: five seconds. Moving the same way, it is ten: twenty five seconds.
- **Beat b:** In two dimensions, subtract as vectors. Car A drives north at thirty, car B drives east at forty. To B, car A moves at fifty metres per second, toward the north west. Not ten. Subtract the vectors, then take the length.
- **Beat c:** Two projectiles share the same acceleration, g. So their relative acceleration is zero, and each sees the other move in a straight line. That is why a hunter who aims straight at a monkey always hits it, even when the monkey lets go at the instant of the shot.

**Visuals:**

- **Beat a:** $\vec v_{AB} = \vec v_A - \vec v_B$ in purple at the top. Two trains on parallel tracks (100 m teal, 150 m amber, to scale) slide past each other in opposite directions. Below: "opposite: $t = \frac{100+150}{20+30} = 5$ s", then "same way: $t = \frac{250}{30-20} = 25$ s".
- **Beat b:** Trains clear. From one tail: teal $\vec v_A$ (30 m/s north) and amber $\vec v_B$ (40 m/s east). A purple $\vec v_{AB}$ runs from the tip of $\vec v_B$ to the tip of $\vec v_A$. Right: $\vec v_{AB} = -40\hat i + 30\hat j$, $|\vec v_{AB}| = 50$ m/s (green), a crossed-out "$40 - 30 = 10$", and "subtract vectors, then take the length".
- **Beat c:** Clear. A hunter's gun at lower left aims along a dashed line of sight at a monkey on a branch ("monkey lets go", "hunter aims straight at it"). $\vec a_{\text{rel}} = \vec g - \vec g = \vec 0$ with "each sees the other move in a straight line". The bullet (traced parabola) and the falling monkey move under the same gravity and meet: a flash and "hit!".

---

## Scene 5 — River–boat and rain–umbrella (Lesson 2.5)

**Narration:**

- **Beat a:** Rivers, wind and rain all use one equation. Velocity over the ground equals velocity relative to the medium, plus the velocity of the medium. A river a hundred metres wide flows at three metres per second. A boat does five, relative to the water.
- **Beat b:** Head straight across for the least time: a hundred over five, twenty seconds. The current does not slow the crossing. It only carries the boat sixty metres downstream.
- **Beat c:** To land directly opposite, head upstream so the boat cancels the current. Sine alpha is three fifths, about thirty seven degrees. Now only four metres per second carries you across, so the trip takes twenty five seconds. Aiming upstream is never the fastest way across.
- **Beat d:** Rain is the same triangle. Rain falls straight down at ten metres per second, and you walk at five. Relative to you, the rain's velocity is v rain minus v man. It comes at you from the front, at about twenty seven degrees from the vertical. So tilt your umbrella forward.

**Visuals:**

- **Beat a:** $\vec v_{\text{ground}} = \vec v_{\text{rel. medium}} + \vec v_{\text{medium}}$ at the top. A river band ($d = 100$ m, to scale) with small flow arrows and "$v_w = 3$ m/s".
- **Beat b:** A red boat crosses heading straight across and drifts along a dashed diagonal, landing 60 m downstream. On the right, a velocity triangle: red 5 (heading), teal 3 (current), purple resultant. "$t = 100/5 = 20$ s, drift $= 3 \times 20 = 60$ m".
- **Beat c:** The triangle is replaced: red 5 tilted upstream, teal 3 tip to tail, green resultant 4 straight across. A green boat crosses straight to the opposite point. "$\sin\alpha = \tfrac35$ (≈37°), $t = 100/4 = 25$ s" and the note "aim upstream to land opposite, not to cross fastest".
- **Beat d:** Clear. A stick-figure walker with a teal 5 m/s arrow. A vector triangle on the right: teal $\vec v_{\text{rain}}$ (10 down), amber $-\vec v_{\text{man}}$ (5 back), purple $\vec v_{\text{rain,man}}$. Rain streaks appear slanting toward the walker from the front. "$\tan^{-1}\tfrac{5}{10} \approx 27^\circ$ from vertical", then a red umbrella tilted forward by that angle and "tilt the umbrella forward".

---

## Scene 6 — Kinematics of circular motion (Lesson 2.6)

**Narration:**

- **Beat a:** A car circles a roundabout with the speedometer steady. Is it accelerating? Yes. Velocity is a vector. Its size stays the same, but its direction turns all the time, and a turning velocity is an accelerating one.
- **Beat b:** Put two velocities tail to tail. They have the same length v, and the angle between them is the angle turned, delta theta. The third side, delta v, is nearly an arc: v delta theta. Divide by delta t, and the acceleration is v omega, which is v squared over r, pointing at the centre.
- **Beat c:** With r two metres and v four metres per second, a c is eight metres per second squared. If the speed changes too, add a tangential part, d v by d t. The two are perpendicular, so the net acceleration is the root of a c squared plus a t squared. And uniform circular motion means constant speed, never zero acceleration.

**Visuals:**

- **Beat a:** A circle with its centre. A particle runs round with a teal tangent velocity arrow of fixed length. Captions: "speed steady...", "...direction always turning", then a red inward arrow joins and "so it is accelerating".
- **Beat b:** Two positions 35° apart with radii and a $\Delta\theta$ arc, each with a tangent $\vec v$. Copies move tail to tail on the right, with the same $\Delta\theta$ between them, and a purple $\Delta\vec v$ joins the tips: "$|\Delta\vec v| \approx v\,\Delta\theta$". At the top: $a = \frac{v\Delta\theta}{\Delta t} = v\omega = \frac{v^2}{r}$, "pointing at the centre".
- **Beat c:** One point on the circle with tangent velocity and a red inward $a_c$; "$r = 2$ m, $v = 4$ m/s: $a_c = 16/2 = 8$ m/s²". The velocity is replaced by an amber tangential $a_t$, and a purple net $a$ leans forward of the centre. "$a_t = \frac{dv}{dt}$, $a = \sqrt{a_c^2 + a_t^2}$". A crossed-out quote "uniform circular motion has zero acceleration" and "uniform means constant speed".

---

## Scene 7 — Recap and next (Lesson 2.7)

**Narration:**

- **Beat a:** To recap. Split motion in a plane into two straight lines that share one clock. Projectiles follow, and complementary angles share a range.
- **Beat b:** Subtract velocities to change frame, and add the medium's velocity for rivers, wind and rain. A turning velocity means an acceleration v squared over r, toward the centre.
- **Beat c:** Try the mastery quiz. Then chapter three asks what causes all these accelerations. The answer is Newton's laws.

**Visuals:** Title "Chapter 2 in five lines". Five numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $x = (u\cos\theta)t,\ y = (u\sin\theta)t - \tfrac12gt^2$: split: two lines, one clock
2. $R = \frac{u^2\sin2\theta}{g}$: complementary angles share R
3. $\vec v_{AB} = \vec v_A - \vec v_B$: subtract to change frame
4. $\vec v_{\text{ground}} = \vec v_{\text{rel}} + \vec v_{\text{medium}}$: river, wind and rain
5. $a_c = \frac{v^2}{r}$ inward: a turning velocity accelerates

Last, "Next: Chapter 3 · Newton's Laws of Motion" appears at the bottom.
