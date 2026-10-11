# Newton's Laws of Motion — Explainer Script

- **Course:** Mechanics I: Motion, Forces and Energy
- **Chapter:** Chapter 3 · Newton's Laws of Motion (id: `mfe-3-newtons-laws-of-motion`)
- **Target runtime:** about 6 minutes (roughly 950 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mfe-3-newtons-laws-of-motion.py`, class `MfeCh3Video`

**Learning goal.** The learner sees why Aristotle was wrong (friction is the hidden force) and states the first law as "zero net force means constant velocity", which also defines an inertial frame. They read the second law as $\sum\vec F = d\vec p/dt = m\vec a$, one equation per axis, and treat impulse as the area under $F$-$t$, so a longer stop means a smaller force. They know third-law pairs act on different bodies (weight and normal force are not a pair), and follow the five-step FBD method. They close the force polygon, use Lami's theorem, solve the Atwood machine and the system method, derive a constraint from string length for a movable pulley, and handle accelerating frames with a pseudo force $-m\vec a_0$.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Each lesson scene has a small muted bold header in the top-left ("3.1 · Force, inertia and the first law"). Colour roles: weight = PRIMARY (red), normal force = SECONDARY (teal), tension = PURPLE, applied force / components = ACCENT (amber), pseudo force and third-law partners = pink, correct = GREEN. Blocks are wood-coloured rectangles with black outlines; pulleys are grey circles with a centre dot; ceilings are hatched lines. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** symbols are spoken as words ("sum of F equals m a", "minus m a nought", "two y P plus y A"); numbers are spelled as they should be read ("point one five", "five hundred and twenty five"). Where the variable $a$ is spoken ("a t squared", "m a", "a c"), the scene spells it `[[char LTRL]]a[[char NORM]]` (via `say_fix` and the `SAY_A` phrase list) so `say` does not read it as the article.

---

## Title card

**Narration:** Chapter three. Newton's laws of motion.

**Visuals:** `title_card("Motion, Forces and Energy", "Chapter 3 · Newton's Laws of Motion")`.

---

## Scene 1 — The first law (Lesson 3.1)

**Narration:**

- **Beat a:** Push a book across a table and let go. It slides, and stops. For two thousand years that looked like the law of motion: Aristotle taught that a moving thing stops unless something keeps pushing it.
- **Beat b:** Galileo rolled a ball down one ramp and up another. It climbs almost to the height it started from. Make the second ramp shallower, and it travels further to get there. Make it flat, and it never stops. The book stops because a force, friction, acts on it the whole time.
- **Beat c:** That is the first law. With zero net force, velocity stays constant, and rest is just the special case. A force is needed to change motion, not to keep it going.
- **Beat d:** So a raindrop falling at a steady eight metres per second feels zero net force: air drag exactly balances its weight, and the speed never enters. A frame where the first law holds is an inertial frame. The ground is one. A braking bus is not.

**Visuals:**

- **Beat a:** A table line; a book slides right with an ease-out and stops. "Aristotle: motion needs a cause".
- **Beat b:** Galileo's double ramp with a dashed "same height" line. A red ball rolls down and up a steep second ramp to the same height; the ramp is transformed shallower (the ball goes further); then flat (the ball rolls off the right edge). "Galileo: on a flat track it never stops" and "the book stops because friction acts all the time".
- **Beat c:** Boxed $\sum\vec F = \vec 0 \iff \vec v = \text{constant}$, "rest is just the special case v = 0". The myth "a moving body needs a force to keep it moving" is struck through; "force changes motion; it does not maintain it" in green.
- **Beat d:** The law shrinks to the top. A raindrop with teal drag $D$ up and red $mg$ down, "v = 8 m/s (steady)". $D - mg = 0$, $D = mg = 3\times10^{-4}$ N (green), "the speed never enters". Bottom: "inertial frame: one where the first law holds (the ground, not a braking bus)".

---

## Scene 2 — Second law and impulse (Lesson 3.2)

**Narration:**

- **Beat a:** The second law says the net force is the rate of change of momentum, m v. For a body of constant mass, that is m a. It is a vector equation, so it gives one equation per axis.
- **Beat b:** Multiply by d t and add up over the push. The impulse, the area under the force against time graph, equals the change in momentum. A pulse that peaks at four hundred newtons and lasts point two seconds has an area of forty newton seconds.
- **Beat c:** That is why a cricketer draws the hands back when catching. Stopping the ball needs a fixed impulse. Stretch the stopping time, and the average force falls. Same area, longer and lower. Airbags and crumple zones use the same trade.
- **Beat d:** Watch the signs. A point one five kilogram ball hits a wall at twenty metres per second and rebounds at fifteen. The change in momentum is point one five times thirty five: five point two five newton seconds. Over point zero one seconds, that is five hundred and twenty five newtons. Reversing direction adds the speeds.

**Visuals:**

- **Beat a:** $\sum\vec F = \frac{d\vec p}{dt}$, $\vec p = m\vec v$; then "constant m: $\sum\vec F = m\vec a$" in red; then $\sum F_x = ma_x$, $\sum F_y = ma_y$ with "a vector equation: one equation per axis".
- **Beat b:** $F$-$t$ axes (0–0.4 s, 0–450 N). A red triangular pulse peaking at 400 N at 0.1 s, shaded. Right: $J = \int F\,dt = \text{area}$, $= \tfrac12(0.2)(400) = 40$ N s, and $J = \Delta p$ in green.
- **Beat c:** "stiff hands" labels the tall pulse; a teal wide pulse (peak 200 N over 0.4 s) with the same area, "hands drawn back". "same area, longer and lower" and $F_{\text{avg}} = \frac{\Delta p}{\Delta t}$.
- **Beat d:** A wall; an amber ball comes in at 20 m/s (black arrow) and leaves at 15 m/s (teal arrow); "+ ←" marks the positive direction. $\Delta p = 0.15(15 - (-20)) = 5.25$ N s, $F_{\text{avg}} = 5.25/0.01 = 525$ N, "reversing direction adds the speeds".

---

## Scene 3 — Third law and free-body diagrams (Lesson 3.3)

**Narration:**

- **Beat a:** Forces come in pairs. If A pushes B, then B pushes A just as hard, the opposite way. But the two forces act on different bodies, so they never appear in the same diagram, and they never cancel.
- **Beat b:** A book on a table feels its weight and the normal force. They are equal and opposite, but they are not a pair. The weight's partner pulls on the Earth. The normal force's partner pushes on the table. N equals m g here because of the second law, not the third.
- **Beat c:** So draw a free-body diagram. Isolate one body, draw every force on it, choose axes, and write sum of F equals m a along each. On a smooth incline the normal force is m g cos theta, not m g, and the block slides down at g sin theta, whatever its mass.
- **Beat d:** Two blocks, two and three kilograms, are pushed by twenty newtons. Treat them as one system, and the acceleration is four. The contact force only has to accelerate the block ahead: three times four, twelve newtons.

**Visuals:**

- **Beat a:** Blocks A and B in contact; an amber arrow "F on B" acts on B, a pink arrow "F on A" on A. $\vec F_{AB} = -\vec F_{BA}$ and "equal, opposite, on different bodies: they never cancel".
- **Beat b:** A book on a table above an arc of the Earth. Teal $N$ up and red $mg$ down on the book. "N and mg act on the same body: not a pair", then the two real pairs (Earth on book ↔ book on Earth; table on book ↔ book on table) and "$N = mg$ here from the second law ($a = 0$)".
- **Beat c:** The five FBD steps on the left. A smooth 30° wedge with a block: $mg$ down, $N$ perpendicular to the slope, dashed amber components including $mg\sin\theta$. $N = mg\cos\theta$ (teal) and $a = g\sin\theta$ (green).
- **Beat d:** 2 kg and 3 kg blocks on a floor with $F = 20$ N; a brace under both and $a = 20/5 = 4$ m/s². The 2 kg block dims; a teal contact arrow $C$ on the 3 kg block; $C = 3\times4 = 12$ N in green, "contact force accelerates the block ahead".

---

## Scene 4 — Equilibrium of concurrent forces (Lesson 3.4)

**Narration:**

- **Beat a:** When forces meet at a point that does not move, their vector sum is zero. Drawn tip to tail, they close up into a polygon. For three forces, a triangle.
- **Beat b:** A ten kilogram lamp hangs from two strings, at thirty and sixty degrees to the ceiling. Balance the knot horizontally and vertically. The thirty degree string carries fifty newtons. The sixty degree string carries fifty root three. The steeper string carries more.
- **Beat c:** Apply the sine rule to that closed triangle, and you get Lami's theorem: for three forces in equilibrium, each force over the sine of the angle between the other two is the same. The lamp checks out.

**Visuals:**

- **Beat a:** Three forces $\vec F_1$ (red), $\vec F_2$ (teal), $\vec F_3$ (purple) from one point, with $\sum\vec F = \vec 0$. Copies slide tip to tail into a closed triangle; "tip to tail: a closed triangle".
- **Beat b:** A hatched ceiling, two strings at 30° and 60° meeting at a knot, an amber lamp below. Purple tension arrows $T_1$, $T_2$ (lengths in ratio 1 : √3) and a red 100 N weight. $T_1\cos30^\circ = T_2\cos60^\circ$, $T_1\sin30^\circ + T_2\sin60^\circ = 100$, then $T_1 = 50$ N, $T_2 = 50\sqrt3 \approx 86.6$ N in green, "the steeper string carries more".
- **Beat c:** Boxed $\frac{F_1}{\sin\alpha} = \frac{F_2}{\sin\beta} = \frac{F_3}{\sin\gamma}$ with "each force over the sine of the angle between the other two", then $\frac{50}{\sin150^\circ} = \frac{50\sqrt3}{\sin120^\circ} = \frac{100}{\sin90^\circ} = 100$ with a check.

---

## Scene 5 — Connected bodies and pulleys (Lesson 3.5)

**Narration:**

- **Beat a:** Hang three and five kilograms over a pulley. An ideal string has the same tension all along it, and the blocks share one size of acceleration, one up and one down. Write each block's equation along its own direction of motion.
- **Beat b:** Add them, and T cancels. The acceleration is two times ten, over eight: two point five metres per second squared. The tension is thirty seven point five newtons, between the two weights. It is not the hanging weight.
- **Beat c:** Or treat connected blocks as one system: driving force over total mass. Three blocks pulled by thirty newtons across a smooth floor accelerate at five. Each string's tension is just what the blocks behind it need: five newtons, then fifteen.

**Visuals:**

- **Beat a:** Atwood machine: a pulley hung from the ceiling, 3 kg and 5 kg blocks on vertical strings. Purple $T$ arrows up on each block, red 30 N and 50 N down. $T - m_1g = m_1a$, $m_2g - T = m_2a$, "same string: same T, same size of a".
- **Beat b:** The force arrows fade; the blocks move (3 kg up, 5 kg down) while $a = \frac{(m_2 - m_1)g}{m_1 + m_2} = \frac{2\times10}{8} = 2.5$ m/s² is written in green. $T = 3(10 + 2.5) = 37.5$ N, "between 30 N and 50 N: not the hanging weight".
- **Beat c:** Clear. Blocks 1, 2, 3 kg in a line on a floor joined by purple strings, 30 N pulling block 3. $a = \frac{30}{1+2+3} = 5$ m/s². Block 1 flashes with $T_{AB} = 1\times5 = 5$ N; blocks 1 and 2 flash with $T_{BC} = (1+2)\times5 = 15$ N. "system for a, then isolate the blocks behind each string".

---

## Scene 6 — Constraint relations (Lesson 3.6)

**Narration:**

- **Beat a:** If a pulley can move, the accelerations are no longer equal. Write the string's length in terms of positions, and differentiate twice. Two strands hold the movable pulley, so two y P plus y A is constant: A moves twice as fast as the pulley, the other way.
- **Beat b:** The forces do the opposite. Two strands pull the pulley up with two T. Put one kilogram on the free end and two kilograms on the pulley, and nothing moves: the pulley doubles the light block's pull. Twice the distance, half the force.

**Visuals:**

- **Beat a:** A string from a ceiling anchor down under a movable pulley P (block B hanging from it), up over a fixed pulley, down to block A (all redrawn live from one tracker). $2y_P + y_A = \text{const}$; the pulley rises by one unit while A drops by two; $\Rightarrow a_A = -2a_P$ in red, "A moves twice as fast as the pulley, the other way".
- **Beat b:** A purple arrow labelled $T$ on each strand at the pulley, with "$2T$ on $P$" beside it; one $T$ on A. The "P" label sits above the pulley, clear of the arrows. $m_A = 1$ kg, $m_B = 2$ kg; $T = 10$ N: $2T = 20$ N $= m_Bg$ in green; "balanced: twice the distance, half the force".

---

## Scene 7 — Pseudo forces (Lesson 3.7)

**Narration:**

- **Beat a:** Stand on a scale in a lift accelerating upward. From the ground, N minus m g equals m a, so N is m times g plus a. From inside the lift you are at rest, so add a pseudo force, m a, opposite to the lift's acceleration. Same answer.
- **Beat b:** A sixty kilogram student reads seven hundred and twenty newtons while the lift speeds up at two, six hundred at steady speed, four hundred and eighty while slowing on the way up, and zero in free fall. Weightless does not mean gravity is off. It means nothing is holding you up.
- **Beat c:** In a car accelerating at a, a hanging bob tilts back until tan theta equals a over g. It hangs along the effective gravity. But a pseudo force has no third-law partner: use it only inside the accelerating frame, never on top of m a.

**Visuals:**

- **Beat a:** A lift on a cable with a person on a scale; amber $a$ arrow beside the lift; teal $N$ up and red $mg$ down on the person. "ground frame" $N - mg = ma$; then a pink pseudo arrow $ma$ down and "lift frame" $N - mg - ma = 0$. $N = m(g + a)$ in green and $\vec F_{\text{pseudo}} = -m\vec a_0$ in pink.
- **Beat b:** "scale reading for a 60 kg student": four bars, 720 N (speeding up, 2 m/s² up), 600 N (steady speed), 480 N (slowing on the way up), 0 N (free fall, red sliver). "weightless: nothing holds you up; gravity is still on".
- **Beat c:** A car on a road with amber $a$ forward; a bob hangs from the roof tilted back from a dashed vertical, with a pink pseudo arrow $ma$ backward. $\tan\theta = \frac ag$, $g_{\text{eff}} = \sqrt{g^2 + a^2}$, "a pseudo force has no third-law partner / use it only inside the accelerating frame".

---

## Scene 8 — Recap and next (Lesson 3.8)

**Narration:**

- **Beat a:** To recap. No net force means constant velocity. Net force is the rate of change of momentum, and impulse is the area under force against time.
- **Beat b:** Third-law pairs act on different bodies, so a free-body diagram shows only forces on one body. In equilibrium the force polygon closes. Strings fix the tension and the constraints. And in an accelerating frame, add minus m a nought to every body.
- **Beat c:** Try the mastery quiz. Then chapter four adds friction, a force that adjusts itself up to a ceiling, and sends bodies round circles.

**Visuals:** Title "Chapter 3 in six lines". Six numbered rows, a formula on the left and a muted note on the right:

1. $\sum\vec F = \vec 0 \iff \vec v$ const: no net force, no change in motion
2. $\sum\vec F = \frac{d\vec p}{dt}$, $J = \Delta p$: impulse = area under F-t
3. $\vec F_{AB} = -\vec F_{BA}$: pairs act on different bodies
4. $\frac{F_1}{\sin\alpha} = \frac{F_2}{\sin\beta} = \frac{F_3}{\sin\gamma}$: closed polygon; Lami
5. $a_A = -2a_P$: constraints from string length
6. $\vec F_{\text{pseudo}} = -m\vec a_0$: only in accelerating frames

Last, "Next: Chapter 4 · Friction and Circular Dynamics" appears at the bottom.
