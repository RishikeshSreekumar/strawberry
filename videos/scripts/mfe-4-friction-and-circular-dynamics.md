# Friction and Circular Dynamics — Explainer Script

- **Course:** Mechanics I: Motion, Forces and Energy
- **Chapter:** Chapter 4 · Friction and Circular Dynamics (id: `mfe-4-friction-and-circular-dynamics`)
- **Target runtime:** about 5 minutes (roughly 850 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mfe-4-friction-and-circular-dynamics.py`, class `MfeCh4Video`

**Learning goal.** The learner treats static friction as self-adjusting: it equals the push up to $\mu_s N$, then drops to $\mu_k N$ once sliding starts, and it opposes relative sliding, not motion. On an incline they compare $mg\sin\theta$ with $\mu_s mg\cos\theta$, get the angle of repose $\tan\theta_r = \mu_s$, the holding range of a push, and different accelerations up and down. For stacked blocks they assume a common acceleration and check the needed friction against $\mu N$. For circles they write "net inward force $= mv^2/r$" (a job title, not a new force): flat curve $v_{\max} = \sqrt{\mu rg}$, conical pendulum and banking $\tan\theta = v^2/rg$, and in a vertical circle $v^2 = u^2 - 2gR(1-\cos\theta)$, $T = mv^2/R + mg\cos\theta$, $T_{\text{bottom}} - T_{\text{top}} = 6mg$, $u \ge \sqrt{5gR}$.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Each lesson scene has a small muted bold header in the top-left. Colour roles: weight = PRIMARY (red), normal force = SECONDARY (teal), applied force and components = ACCENT (amber), friction = GREEN, tension / inward force = PURPLE, third-law partner = pink. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** coefficients are spoken "mu s" and "mu k"; "almirah" in the lesson is said as "cupboard" so the voice pronounces it cleanly.

---

## Title card

**Narration:** Chapter four. Friction and circular dynamics.

**Visuals:** `title_card("Motion, Forces and Energy", "Chapter 4 · Friction and Circular Dynamics")`.

---

## Scene 1 — Static and kinetic friction (Lesson 4.1)

**Narration:**

- **Beat a:** Shove a heavy cupboard across the floor. You push, and nothing happens. Push harder, and still nothing. Then it lurches and slides, and once it is moving it is easier to keep going. Friction can take many values, it has a maximum, and it drops once sliding starts.
- **Beat b:** At rest, friction matches your push exactly. For a five kilogram block with mu s of point five, friction climbs the forty five degree line up to twenty five newtons. Then the block breaks free, and friction drops to mu k N, twenty newtons, however hard you pull.
- **Beat c:** So push with twenty newtons, and friction is twenty, not twenty five. Push with thirty, and the block slides at thirty minus twenty, over five: two metres per second squared. Friction equals mu N only when sliding, or just about to slide.
- **Beat d:** And friction opposes relative sliding, not motion. A box on an accelerating truck is dragged forward by friction. When you walk, friction pushes you forward too.

**Visuals:**

- **Beat a:** A tall box on a floor. An amber push arrow $F$ and a green friction arrow $f$ at the floor grow together (12 N, then 22 N, then 25 N) with "nothing moves: f = F"; friction then snaps down to 20 N and the box slides.
- **Beat b:** $f$ against $F$ axes (0–40 N, 0–30 N) with a dashed 45° line; "5 kg block, μs = 0.5, μk = 0.4". The push is replayed: a green traced dot climbs the 45° line to the peak $\mu_sN = 25$, drops to 20, and runs flat to 38 N as the box slides; label $\mu_kN = 20$.
- **Beat c:** Clear. $F = 20$ N $< 25$: $f = 20$ N (not 25); $F = 30$ N $> 25$: $a = \frac{30-20}{5} = 2$ m/s²; "$f = \mu N$ only when sliding or about to slide" in red.
- **Beat d:** A flatbed truck carrying a 20 kg box accelerates right ($a = 2$ m/s²); a green friction arrow on the box points forward, $f = ma = 40$ N. Header "friction opposes relative sliding, not motion"; footer about the box and walking.

---

## Scene 2 — Friction on an incline (Lesson 4.2)

**Narration:**

- **Beat a:** Tilt a book with a coin on it. The coin holds, then suddenly slides. At rest, friction must hold m g sin theta, and it can give at most mu s m g cos theta. So the steepest angle, the angle of repose, has tan theta equal to mu s, whatever the mass.
- **Beat b:** Push along the slope, and friction can flip. Ten kilograms on a thirty seven degree slope with mu s of point five: gravity pulls sixty newtons down the slope, and friction can give forty either way. Any push from twenty to a hundred newtons holds it. At sixty, friction is zero.
- **Beat c:** Once it slides, kinetic friction opposes the sliding. Going up, it adds to gravity. Coming down, it fights gravity. A block launched up a thirty seven degree slope at sixteen metres per second, with mu k a quarter, decelerates at eight and stops in two seconds. It slides back at only four, taking two root two seconds.

**Visuals:**

- **Beat a:** A wedge whose angle is driven by a tracker from 10° to 26.6°, with a block, an amber $mg\sin\theta$ arrow down the slope and a green friction arrow up it. Two live bars: "needed $mg\sin\theta$" (amber) rises while "max $\mu_s mg\cos\theta$" (green) falls; at 26.6° they meet, the block flashes and slides down. Boxed $\tan\theta_r = \mu_s$, "angle of repose: mass cancels".
- **Beat b:** "10 kg on 37°: $mg\sin\theta = 60$ N, $\mu_s mg\cos\theta = 40$ N". A number line 0–120 N (push up the slope) with a green band from 20 to 100; "friction up the slope, at its limit" at 20, "friction down the slope, at its limit" at 100, "$f = 0$" at 60. Then $mg(\sin\theta - \mu_s\cos\theta) \le F \le mg(\sin\theta + \mu_s\cos\theta)$.
- **Beat c:** A $v$-$t$ graph: an amber line from 16 m/s down to 0 at 2 s, then a teal line down to about −11.3 m/s at $2 + 2\sqrt2$ s. Right column: up $a = g(\sin\theta + \mu_k\cos\theta) = 8$; stops in 2 s after 16 m; down $a = g(\sin\theta - \mu_k\cos\theta) = 4$; $16 = \tfrac12(4)t^2 \Rightarrow t = 2\sqrt2 \approx 2.8$ s.

---

## Scene 3 — Block-on-block problems (Lesson 4.3)

**Narration:**

- **Beat a:** Pull the bottom one of two stacked blocks. The only horizontal force on the top block is friction, so its acceleration has a ceiling: mu g. Assume they move together, find the friction the top block needs, and compare it with mu N.
- **Beat b:** Two kilograms on four, with mu of point three. The top block can reach at most three metres per second squared, so the critical pull is six times three: eighteen newtons. At ten newtons they move together at five thirds. At thirty they slip: the top block at three, the bottom at six.
- **Beat c:** Notice which way friction points on the top block: forward. It is the only force that makes it move at all. Its third-law partner drags the bottom block back.

**Visuals:**

- **Beat a:** A 2 kg block on a 4 kg block on a smooth floor; amber $F$ pulls the bottom block; a green friction arrow $f$ on the top block points forward. The four-step method appears on the right.
- **Beat b:** $a_{\text{top}} \le \mu g = 3 \Rightarrow F_{\text{crit}} = 18$ N; $F = 10$: together, $a = \tfrac53$; $F = 30$: slip, $a_{\text{top}} = 3$, $a_{\text{bottom}} = \tfrac{30-6}{4} = 6$. The blocks then move with the bottom block pulling ahead (quadratic motion, bottom twice as far).
- **Beat c:** The green arrow flashes: "friction on the top block points forward: it is the only force that moves it". A pink arrow on the bottom block points backward, "third-law partner drags the bottom back".

---

## Scene 4 — Dynamics of circular motion (Lesson 4.4)

**Narration:**

- **Beat a:** Whirl a stone on a string, and let go. It flies off along the tangent, not outward. The string had one job: pulling inward, bending the path at every moment.
- **Beat b:** So centripetal force is not a new kind of force. It is a job title. Whatever real forces act, their inward sum must equal m v squared over r.
- **Beat c:** On a flat curve, only friction can point inward, so m v squared over r can be at most mu m g. The top speed is root mu r g, and the mass cancels. On an eighty metre curve with mu of point five, that is twenty metres per second.
- **Beat d:** A conical pendulum follows the same rule. The tension's vertical part holds up the weight, its horizontal part bends the path, and tan theta equals v squared over r g.

**Visuals:**

- **Beat a:** A stone circles a centre on a purple string, with a teal tangent velocity arrow and a purple inward arrow. At the leftmost point the string vanishes and the stone flies straight down the tangent; a red dashed "outward" line is crossed out.
- **Beat b:** Boxed $\sum F_{\text{inward}} = \frac{mv^2}{r}$, "centripetal force is a job title, not a new force".
- **Beat c:** Top view of a curved road with a car and a green friction arrow towards the marked centre. $\frac{mv^2}{r} \le \mu mg$, $v_{\max} = \sqrt{\mu rg}$, $\sqrt{0.5\times80\times10} = 20$ m/s, "mass cancels: truck or scooter, same limit".
- **Beat d:** A conical pendulum: pivot, string at θ, dashed elliptical orbit, purple $T$ with dashed components, red $mg$. $T\cos\theta = mg$, $T\sin\theta = \frac{mv^2}{r}$, $\tan\theta = \frac{v^2}{rg}$ in green.

---

## Scene 5 — Banking of roads (Lesson 4.5)

**Narration:**

- **Beat a:** Tilt the road towards the centre, and the normal force leans inward. With no friction, N cos theta holds up the weight, and N sin theta supplies m v squared over r. So tan theta equals v squared over r g, and the design speed is root r g tan theta.
- **Beat b:** Faster than that, the car tends to slide up and out, so friction acts down the slope. Slower, it acts up the slope. A thirty metre curve banked at fifteen degrees has a design speed of about nine metres per second. And N is more than m g cos theta, because the car is accelerating.

**Visuals:**

- **Beat a:** Cross-section of a banked road rising away from the centre ("to the centre" arrow pointing left). A car on it, red $mg$ down, teal $N$ perpendicular to the road, with dashed components $N\cos\theta$ (up) and $N\sin\theta$ (towards the centre). $N\cos\theta = mg$, $N\sin\theta = \frac{mv^2}{r}$, $\tan\theta = \frac{v^2}{rg}$, $v_{\text{opt}} = \sqrt{rg\tan\theta}$.
- **Beat b:** A green friction arrow at the tyres grows down the slope ("faster: friction down the slope"), flips up the slope ("slower"), and vanishes ("at v_opt: no friction needed"). Then $r = 30$ m, $15^\circ$: $v_{\text{opt}} \approx 9$ m/s and $N = m(g\cos\theta + \frac{v^2}{r}\sin\theta) > mg\cos\theta$.

---

## Scene 6 — Motion in a vertical circle (Lesson 4.6)

**Narration:**

- **Beat a:** In a vertical circle, gravity changes the speed as you go round. The tangential equation gives v squared equals u squared, minus two g R times one minus cos theta. That is just v squared equals u squared minus two g h.
- **Beat b:** The radial equation gives the tension: m v squared over R, plus m g cos theta. It is largest at the bottom and smallest at the top, and the difference is always six m g.
- **Beat c:** A string can only pull, so the tension at the top must stay at least zero. That needs u of at least root five g R at the bottom. Start slower, and the string goes slack before the top, and the bob leaves the circle on a parabola.

**Visuals:**

- **Beat a:** A circle with a bob on a string ($m = 1$ kg, $R = 1$ m, $u = 8$ m/s). The bob swings up to 130° with a dashed height line labelled $h = R(1-\cos\theta)$. $v^2 = u^2 - 2gR(1-\cos\theta)$ $= u^2 - 2gh$.
- **Beat b:** A purple tension arrow along the string, its length tracking $T$, with a live readout ($T$ = 74 N at the bottom, 14 N at the top). $T = \frac{mv^2}{R} + mg\cos\theta$ and $T_{\text{bottom}} - T_{\text{top}} = 6mg$ in green as the bob goes all the way round.
- **Beat c:** Boxed $T_{\text{top}} \ge 0 \Rightarrow u \ge \sqrt{5gR}$. With $u = \sqrt{3gR}$ the bob rises until the tension readout hits 0 at $\cos\theta = -\tfrac13$, the string fades, and the bob follows a red parabola inside the circle; "slower: slack before the top, then a parabola".

---

## Scene 7 — Recap and next (Lesson 4.7)

**Narration:**

- **Beat a:** To recap. Static friction supplies only what is needed, up to mu s N. On an incline, compare m g sin theta with the most friction can give. For stacked blocks, assume they move together, then check.
- **Beat b:** In circular motion, the net inward force must be m v squared over r, whoever supplies it. Banking tilts the normal force inward. And a string in a vertical circle must stay taut.
- **Beat c:** Try the mastery quiz. Then chapter five turns all that integrating of v d v into one tool, the work-energy theorem, and many of these problems collapse to a line.

**Visuals:** Title "Chapter 4 in six lines". Six numbered rows:

1. $f_s \le \mu_sN$, $f_k = \mu_kN$: friction supplies only what is needed
2. $\tan\theta_r = \mu_s$: compare $mg\sin\theta$ with $\mu_s mg\cos\theta$
3. $F_{\text{crit}} = (m_1 + m_2)\mu g$: assume together, then check $\mu N$
4. $\sum F_{\text{in}} = \frac{mv^2}{r}$: centripetal is a job title
5. $v_{\text{opt}} = \sqrt{rg\tan\theta}$: banking: N leans inward
6. $u \ge \sqrt{5gR}$: vertical circle: string must stay taut

Last, "Next: Chapter 5 · Work, Energy and Power" appears at the bottom.
