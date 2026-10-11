# Waves on a String — Explainer Script

- **Course:** Oscillations, Waves and Thermal Physics
- **Chapter:** Chapter 1 · Waves on a String (id: `owt-1-waves-on-a-string`)
- **Target runtime:** about 5.5 minutes (roughly 865 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/owt-1-waves-on-a-string.py`, class `OwtCh1Video`

**Learning goal.** The learner sees a wave as Chapter 0's SHM handed from particle to particle: a shape and its energy travel, the string stays put, and any $f(x - vt)$ moves right. They read $y = A\sin(kx - \omega t)$ with $k = 2\pi/\lambda$, $\omega = 2\pi f$, $v = f\lambda = \omega/k$, tell direction from the signs, and get particle velocity from the slope ($v_p = -v\,\partial y/\partial x$), never confusing $A\omega$ with $v$. They derive $v = \sqrt{T/\mu}$ from the centripetal force on a small arc and know the speed does not depend on frequency. They add waves point by point, add same-frequency waves like arrows ($A^2 = A_1^2 + A_2^2 + 2A_1A_2\cos\delta$), convert path difference to phase, and use $I \propto A^2$. They know a fixed end inverts a reflection and a free end does not, that at a junction frequency is fixed while speed and wavelength change, and they build standing waves $2A\sin kx\cos\omega t$ whose boundaries pick the harmonics $f_n = nv/2L$ (odd only with one free end).

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: the string / resultant = INK (thick), wave 1 / incident / tension = PRIMARY (red), wave 2 / reflected = SECONDARY (teal), probe particle and highlights = ACCENT (amber), transmitted wave and nodes = PURPLE, correct = GREEN. Strings are polylines through $y(x)$ redrawn from `ValueTracker`s (`always_redraw`). Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Symbols are spoken as words ("k x minus omega t", "lambda", "mu", "delta theta", "f n"). "SHM" is written "S H M" so Samantha spells it. "√(T/μ)" is read "root T over mu". Numbers are read naturally ("two forty", "four hundred and twenty hertz").

---

## Title card

**Narration:** Chapter one. Waves on a string.

**Visuals:** `title_card("Oscillations, Waves & Thermal Physics", "Chapter 1 · Waves on a String")`.

---

## Scene 1 — What a wave carries (Lesson 1.1)

**Narration:**

- **Beat a:** At a cricket stadium the crowd starts a Mexican wave. A bulge of standing people races round the ground, yet nobody leaves their seat.
- **Beat b:** What travels is not people. It is a pattern of motion, and with it, energy: a disturbance that travels while each part of the medium only oscillates in place. On a rope, each bit pulls its neighbour through the tension, and inertia makes each bit lag a little.
- **Beat c:** A pulse of shape f of x, moving right at speed v, has slid by v t at time t. So y equals f of x minus v t. Any function of x plus v t moves left instead.
- **Beat d:** Watch one point, P. It rises and falls, but never drifts sideways. Only the shape and its energy travel.

**Visuals:**

- **Beat a:** Header "A Mexican wave". A row of 25 spectators (a line body and a dot head on a small seat). A Gaussian bulge sweeps left to right; each head rises and falls as it passes. One spectator is amber, with the label "one spectator: only up and down" and an arrow.
- **Beat b:** Caption "what travels: a pattern of motion, and energy". The bulge sweeps across again.
- **Beat c:** Clear. A dashed muted ghost of a pulse at $t = 0$ and the live pulse (INK) sliding right. A red arrow $vt$ between the two peaks. $y = f(x - vt)$ written at the top left, and a muted "$f(x + vt)$ moves left" at the top right.
- **Beat d:** The pulse restarts. An amber probe dot $P$ rides a dashed vertical track; it rises and falls as the pulse passes through. Caption "the shape moves; the string stays".

---

## Scene 2 — The sinusoidal travelling wave (Lesson 1.2)

**Narration:**

- **Beat a:** Now shake the end of a string in S H M. Every point repeats that motion a little later, and the result is y equals A sine of k x minus omega t.
- **Beat b:** Freeze time, and the shape repeats every wavelength, so k is two pi over lambda. Freeze a point, and it does S H M, so omega is two pi f. In one period the wave moves one wavelength: v equals f lambda, or omega over k.
- **Beat c:** Opposite signs in k x minus omega t mean the wave moves towards plus x. Matching signs mean minus x. And a particle's velocity is minus v times the slope: where the string slopes up, it moves down.
- **Beat d:** For y equals zero point zero two sine of thirty x minus two forty t, the wave speed is two forty over thirty, eight metres per second. The fastest particle moves at A omega, only four point eight.

**Visuals:**

- **Beat a:** A dashed axis along the bottom. A red dot at the left end moves in SHM ("end driven in SHM") and a sine wave grows out of it across the screen, the front advancing at $v$. $y = A\sin(kx - \omega t)$ is written at the top.
- **Beat b:** A teal brace $\lambda$ between two crests, then $k = \frac{2\pi}{\lambda}$. An amber probe dot at a fixed $x$ rides through one full period while the wave moves on one wavelength. Then $\omega = 2\pi f$ (amber) and $v = f\lambda = \frac{\omega}{k}$ (red) complete the row.
- **Beat c:** The row fades. Top right: "$kx - \omega t$: moves $+x$ →" and muted "$kx + \omega t$: moves $-x$ ←". Top left: $v_p = -v\,\frac{\partial y}{\partial x}$ in red. Red arrows on the frozen wave: down at a rising zero crossing, up at the falling one.
- **Beat d:** Clear. $y = 0.02\sin(30x - 240t)$, then $v = \frac{\omega}{k} = \frac{240}{30} = 8$ m/s, then $v_{p,\max} = A\omega = 0.02\times240 = 4.8$ m/s. Caption "particle speed is not wave speed" in red.

---

## Scene 3 — Why $v = \sqrt{T/\mu}$ (Lesson 1.3)

**Narration:**

- **Beat a:** What sets the speed? Ride along with a pulse, so the bump is frozen and the string streams through it. A tiny arc at the top feels the tension pulling at both ends.
- **Beat b:** The horizontal pulls cancel. The vertical parts add to two T delta theta, pointing inward. That supplies the centripetal force on the arc's mass, mu times two R delta theta, times v squared over R. Everything cancels to T equals mu v squared.
- **Beat c:** So v is root T over mu: stiffness over inertia. Doubling the speed takes four times the tension. A two metre wire of mass twenty grams, at fifty newtons, has v of about seventy one metres per second.
- **Beat d:** Every frequency travels at this speed. Shake faster and the waves crowd closer; they do not move faster. That is why a whole chord reaches your ear together. The power carried is one half mu omega squared A squared v.

**Visuals:**

- **Beat a:** Header "Ride along with the pulse". A frozen bump on the left half; a teal arrow under it pointing left, "string streams through at v". A thick amber arc at the top of the bump, dashed radii to its centre of curvature, then two red tension arrows $T$ along the string at the arc's ends.
- **Beat b:** A red inward arrow from the top of the arc. On the right: "inward pull = mass × v²/R" over $2T\,\delta\theta = \mu(2R\,\delta\theta)\frac{v^2}{R}$, then $T = \mu v^2$.
- **Beat c:** Boxed $v = \sqrt{T/\mu}$ in red; everything else fades and the box moves to the top. Below: muted $T\times4 \Rightarrow v\times2$, then $\mu = \frac{0.020\text{ kg}}{2\text{ m}} = 0.01$ kg/m and $v = \sqrt{50/0.01} \approx 70.7$ m/s in green.
- **Beat d:** Clear. Two waves on the same string: a long teal one ("low f, long λ") and a short red one ("high f, short λ"), each with an equal arrow $v$. At the bottom, $P = \tfrac12\mu\omega^2A^2v$.

---

## Scene 4 — Superposition and interference (Lesson 1.4)

**Narration:**

- **Beat a:** When two pulses meet, they do not collide. Their displacements add, point by point. For an instant the bump is twice as tall, and then each pulse carries on unchanged.
- **Beat b:** An upward pulse and a downward one cancel for an instant, and the rope is flat. But it is still moving, and the pulses come out again. Interference moves energy around; it never destroys it.
- **Beat c:** Same frequency waves with a phase difference delta add like arrows, as in chapter zero. Three and four millimetres in phase make seven; out of phase, one; at ninety degrees, five.
- **Beat d:** A path difference delta x gives a phase difference of two pi over lambda, times delta x. Intensity goes as amplitude squared, so intensities of nine to one mean amplitudes of three to one, and I max over I min is four.

**Visuals:**

- **Beat a:** $y = y_1 + y_2$ at the top. Two upward pulses (thin red and teal) approach from either end; the thick INK sum doubles where they overlap, then they separate unchanged.
- **Beat b:** The right pulse is now inverted. At the overlap the INK string is flat; amber caption "flat, but still moving". The pulses re-emerge.
- **Beat c:** Clear. $A^2 = A_1^2 + A_2^2 + 2A_1A_2\cos\delta$ at the top. Phasors at the lower left: red $A_1 = 3$, teal $A_2 = 4$ from its tip at angle $\delta$, INK resultant. Live readouts $\delta = $ (degrees) and $A = $ (mm). $\delta$ sweeps 0° → 180° (7 → 1) → 90° (5), and a right-angle mark appears.
- **Beat d:** Phasors fade, the formula stays. $\delta = \frac{2\pi}{\lambda}\Delta x$; $I \propto A^2$: $9:1 \Rightarrow A_1:A_2 = 3:1$; $\frac{I_{\max}}{I_{\min}} = \left(\frac{3+1}{3-1}\right)^2 = 4$ in green.

---

## Scene 5 — Reflection at boundaries (Lesson 1.5)

**Narration:**

- **Beat a:** A pulse sent to a rope tied to a wall comes back upside down. The end cannot move, so picture an inverted image pulse arriving from behind the wall. Up plus down is zero there, every instant.
- **Beat b:** On a ring that slides on a smooth pole, the end stays flat instead. The image is upright, and so is the reflection: no phase change.
- **Beat c:** At a junction, part reflects and part goes on. Going from mu into four mu, the speed halves. The reflection is one third as tall and inverted; the transmitted pulse is two thirds as tall, with half the wavelength.
- **Beat d:** But the frequency never changes. The junction is one point, and it shakes the new string as often as the old one shakes it. Speed and wavelength change. Frequency does not.

**Visuals:**

- **Beat a:** Header "Fixed end". A hatched wall at $x = 2.4$. The rope (INK) left of the wall shows incident + image; a dashed muted continuation beyond the wall shows the inverted image pulse ("image pulse (imagined)"). The pulse hits the wall and returns inverted. Captions "up + down = 0 at the wall, every instant" and "phase change π" in red.
- **Beat b:** The wall becomes a pole with an amber ring; header becomes "Free end" (green). The image is upright; the ring flicks to twice the height and the reflection returns upright. "no phase change" in green.
- **Beat c:** Clear. A thin string $\mu$ joined at a knot to a thick purple string $4\mu$. A pulse runs in; an INK reflection one third as tall and inverted returns left, and a purple transmitted pulse two thirds as tall and half as wide moves on. Below: $A_r = \frac{v_2 - v_1}{v_1 + v_2}A_i = -\frac{A_i}{3}$ and $A_t = \frac{2v_2}{v_1 + v_2}A_i = \frac{2A_i}{3}$.
- **Beat d:** Clear. "frequency never changes at a boundary" in bold red, then "$v$ and $\lambda$ change: $\frac{\lambda_2}{\lambda_1} = \frac{v_2}{v_1}$".

---

## Scene 6 — Standing waves and harmonics (Lesson 1.6)

**Narration:**

- **Beat a:** Pluck a guitar string and it shimmers in a fixed blur: two equal waves running opposite ways. Their sum is two A sine k x, times cos omega t. Nothing travels.
- **Beat b:** Where sine k x is zero, the string never moves: nodes, half a wavelength apart. Antinodes sit halfway between. Every point in a loop moves together; crossing a node flips the direction.
- **Beat c:** Fixed ends must be nodes, so only whole loops fit: L equals n lambda over two, and f n equals n v over two L, whole number multiples of the fundamental. With one end fixed and one free, the free end must be an antinode, which allows only the odd harmonics.
- **Beat d:** Resonances at four hundred and twenty and four hundred and ninety hertz, with none between, differ by the fundamental: seventy hertz. And the second overtone is the third harmonic.

**Visuals:**

- **Beat a:** A string pinned at both ends. Thin red (rightward) and teal (leftward) travelling waves slide through each other; the thick INK sum (three loops) appears and only grows and shrinks in place. $y = A\sin(kx - \omega t) + A\sin(kx + \omega t) = 2A\sin kx\cos\omega t$ at the top.
- **Beat b:** The components fade. Dashed envelope $\pm 2A\sin kx$, purple node dots labelled N, amber antinode labels AN (not A, which means amplitude), a purple brace "$\lambda/2$" between adjacent nodes. The standing wave keeps oscillating.
- **Beat c:** Clear. Three strings fixed at both ends, $n = 1, 2, 3$, each oscillating in its mode. Right column: $L = n\frac{\lambda}{2}$, then $f_n = \frac{nv}{2L}$ (red). A fourth purple string fixed at the left and free at a pole on the right oscillates as a quarter wave ("one end fixed, one free"); $f = \frac{(2n-1)v}{4L}$ and "odd harmonics only" are written in about 1.5 s while the strings keep moving.
- **Beat d:** Clear. "420 Hz, 490 Hz, nothing between"; $f_1 = 490 - 420 = 70$ Hz (green); $420 = 6\times70$, $490 = 7\times70$; "2nd overtone = 3rd harmonic" in red.

---

## Scene 7 — Recap and next (Lesson 1.7)

**Narration:**

- **Beat a:** To recap. A wave moves a shape and energy, not matter. The sine wave has v equals f lambda, and on a string, v is root T over mu.
- **Beat b:** Waves add point by point, like arrows at one frequency. A fixed end inverts the reflection, frequency never changes, and boundaries pick the standing wave harmonics.
- **Beat c:** Try the mastery quiz. Then chapter two swaps the string for air: sound, organ pipes, beats, and the Doppler effect.

**Visuals:** Title "Chapter 1 in six lines". Six numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $y = f(x \mp vt)$: a shape and energy move; matter stays
2. $y = A\sin(kx-\omega t)$, $v = \frac{\omega}{k} = f\lambda$: opposite signs: moves to $+x$
3. $v = \sqrt{T/\mu}$: stiffness over inertia
4. $A^2 = A_1^2 + A_2^2 + 2A_1A_2\cos\delta$: superposition; $I \propto A^2$
5. fixed end: phase $\pi$: frequency never changes
6. $2A\sin kx\cos\omega t$, $f_n = \frac{nv}{2L}$: boundaries pick the harmonics

Last, "Next: Chapter 2 · Sound Waves" appears at the bottom.
