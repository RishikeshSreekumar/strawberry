# Simple Harmonic Motion — Explainer Script

- **Course:** Oscillations, Waves and Thermal Physics
- **Chapter:** Chapter 0 · Simple Harmonic Motion (id: `owt-0-simple-harmonic-motion`)
- **Target runtime:** about 6 minutes (roughly 900 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/owt-0-simple-harmonic-motion.py`, class `OwtCh0Video`

**Learning goal.** The learner knows the one test for SHM, $a = -\omega^2 x$, and why it is everywhere: the bottom of any smooth potential-energy valley is a parabola, so every small oscillation about a stable equilibrium is SHM. They can tell SHM from a mere oscillation ($F = -4x^3$ oscillates, but its period depends on amplitude). They picture $x = A\cos(\omega t + \phi)$ as the shadow of a turning arrow, read amplitude, phase and $T = 2\pi/\omega$ from it, and use "equal angles take equal times" ($A \to A/2$ is $T/6$, $A/2 \to 0$ is $T/12$). They know $|v| = \omega\sqrt{A^2 - x^2}$, that $v$ and $a$ peak a quarter cycle apart, that KE and PE swap at $2\omega$ with $E = \tfrac12 kA^2$ fixed, and that KE = PE at $A/\sqrt2$. They find $k_{\text{eff}}$ for parallel, series and cut springs, know gravity only shifts a vertical spring's centre ($T = 2\pi\sqrt{x_0/g}$), derive $T = 2\pi\sqrt{L/g}$ with the mass cancelling and use $g_{\text{eff}}$. They add same-frequency SHMs like arrows, find hidden SHMs (U-tube, floating body, Earth tunnel) by "displace, find $-k_{\text{eff}}x$, divide by the moving mass", and read damping ($Ae^{-\gamma t}$) and resonance (matched frequency, sharper with light damping).

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: displacement $x$ = SECONDARY (teal), velocity = GREEN, acceleration and restoring force = PRIMARY (red), kinetic energy = ACCENT (amber), potential energy = PURPLE, highlights = gold, correct = GREEN check, wrong = red cross. Blocks are pale-peach rectangles; springs are zigzag polylines from a `spring(a, b)` helper; walls and ceilings carry short hatch marks. Motion is driven by a `ValueTracker` time with `always_redraw`, advanced linearly to fill each narration beat. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** "SHM" is written "S H M" in the narration so Samantha spells it; on screen it is always "SHM". Symbols are spoken as words ("omega", "phi", "x nought", "gamma", "omega nought"). The recap avoids a lone "a" for acceleration (Samantha reads it as the article) and says "acceleration" instead.

---

## Title card

**Narration:** Chapter zero. Simple harmonic motion.

**Visuals:** `title_card("Oscillations, Waves & Thermal Physics", "Chapter 0 · Simple Harmonic Motion")`.

---

## Scene 1 — What makes something oscillate (Lesson 0.1)

**Narration:**

- **Beat a:** Pull a block on a spring and let go. It rushes back, overshoots, and swings to and fro. A twanged ruler, a swing and a bobbing boat all do the same.
- **Beat b:** Two ingredients make this happen: a stable equilibrium, where a nudge brings a force pushing back, and inertia, which carries the block straight past the middle. The spring's force is minus k x.
- **Beat c:** Why minus k x? Equilibrium sits at the bottom of a potential energy valley, and the bottom of any smooth valley looks like a parabola, one half k x squared. Its slope gives a force of minus k x.
- **Beat d:** Put that into Newton's second law: acceleration equals minus omega squared x, with omega equal to root k over m. That is the one test for S H M.
- **Beat e:** Test four forces. Minus four x passes. Minus four x cubed pulls back, but its period depends on amplitude, so it is not S H M. Minus four times x minus two is S H M about x equals two. Plus four x pushes away: no oscillation.

**Visuals:**

- **Beat a:** A hatched wall, a floor, a zigzag spring and a block. A dashed vertical marks $x = 0$. The block oscillates (amplitude 1.9 units) for the rest of the beat.
- **Beat b:** A red restoring-force arrow above the block always points back to $x = 0$, longest at the ends. Two lines appear at the top: "1. a stable equilibrium: nudge it, and the force pushes back" and "2. inertia: it arrives moving, so it overshoots". Label $F = -kx$ in red on the right.
- **Beat c:** Clear. Axes for $U(x)$ with the curve $U = x^4 - 2x^2$ (the lesson's worked example), a red dot at the stable minimum $x = 1$ ("stable minimum"), and a dashed amber parabola $-1 + 4(x-1)^2$ hugging the valley floor. On the right: $U \approx U_{\min} + \tfrac12 k(x - x_0)^2$ with "every smooth valley is a parabola at the bottom", then $F = -\dfrac{dU}{dx} = -k(x - x_0)$.
- **Beat d:** The right column is replaced by $m\,\dfrac{d^2x}{dt^2} = -kx$, the large red boxed $a = -\omega^2 x$ tagged "the SHM test", and $\omega = \sqrt{k/m}$.
- **Beat e:** Clear. Header "Which forces give SHM? (m = 1 kg)". Four rows, each force with a check or cross and a note: $F=-4x$ ✓ $\omega = 2$ rad/s; $F = -4x^3$ ✗ "oscillates, but $T$ depends on $A$"; $F = -4(x-2)$ ✓ "SHM about $x = 2$"; $F = +4x$ ✗ "pushes away: no oscillation".

---

## Scene 2 — Shadow of a turning arrow (Lesson 0.2)

**Narration:**

- **Beat a:** Shine a light on a peg going round a turntable at a steady rate. Its shadow slides to and fro: slow at the ends, fast in the middle.
- **Beat b:** A block on a spring, tuned to match, moves in perfect step. The peg's acceleration, projected onto the line, is minus omega squared x: the same test.
- **Beat c:** So x equals A cos of omega t plus phi. A is the radius, the amplitude. The arrow's angle is the phase. One turn takes T equals two pi over omega.
- **Beat d:** Equal angles take equal times; equal distances do not. From the end to half way the arrow turns sixty degrees, a sixth of a period. From half way to the middle, only thirty: a twelfth.
- **Beat e:** So phase is not an angle in space. It says where in the cycle the motion is.

**Visuals:**

- **Beat a:** Upper left, a circle of radius 1.5 with a turning arm and a red peg ("light from above"). A dashed ray drops from the peg to a horizontal line below, where a teal shadow dot slides back and forth as the arm turns.
- **Beat b:** Below the shadow line, a wall, spring and block appear; the block stays directly under the shadow. $a_x = -\omega^2 A\cos\theta = -\omega^2 x$ is written top right.
- **Beat c:** Right half: $x$–$t$ axes. The cosine curve is traced live as the arm turns two full times. Label $A$ on the radius, then $x = A\cos(\omega t + \phi)$ and $T = \dfrac{2\pi}{\omega},\ f = \dfrac1T$ below the graph.
- **Beat d:** The graph, block and labels fade; the arm resets to 0. Tick labels $A$, $\tfrac A2$, $0$ on the shadow line. The arm turns to 60° drawing an amber arc while an amber segment covers $A \to A/2$; then turns to 90° with a purple 30° arc and a purple segment $A/2 \to 0$. Right column: $A \to \tfrac A2:\ 60^\circ \Rightarrow \tfrac T6$ (amber), $\tfrac A2 \to 0:\ 30^\circ \Rightarrow \tfrac T{12}$ (purple), "equal distances, unequal times".
- **Beat e:** The muted note is replaced by a gold-bordered card: "phase $= \omega t + \phi$: where in the cycle".

---

## Scene 3 — Speed, acceleration and energy (Lesson 0.3)

**Narration:**

- **Beat a:** The speed at any position is omega root A squared minus x squared: fastest in the middle, zero at the ends. The acceleration, minus omega squared x, is the opposite.
- **Beat b:** So velocity and acceleration are never largest together. Velocity leads displacement by a quarter cycle, and acceleration is displacement upside down.
- **Beat c:** Kinetic plus potential energy stays fixed at one half k A squared. Kinetic peaks at each pass through the middle, twice per cycle, so both energies oscillate at two omega.
- **Beat d:** Where is kinetic equal to potential? Not at half the amplitude: there the potential energy is only a quarter of the total. They are equal at A over root two.

**Visuals:**

- **Beat a:** Upper left, a block on a spring oscillates with a live green velocity arrow above it and a live red acceleration arrow below it. $|v| = \omega\sqrt{A^2 - x^2}$ (green) at the top, $a = -\omega^2 x$ (red) below the block.
- **Beat b:** Right half: three stacked graphs over two periods, $x$ (teal cosine), $v$ (green, $-\sin$), $a$ (red, $-\cos$), with a gold sweep line moving in time with the block. Notes: "v leads x by a quarter cycle", "a is x upside down".
- **Beat c:** Lower left: live KE (amber) and PE (purple) bars beside a fixed grey "total" bar; $\tfrac12 mv^2 + \tfrac12 kx^2 = \tfrac12 kA^2$ and "KE and PE oscillate at 2ω".
- **Beat d:** Clear. Header "Where does the energy sit?" and a table of $x$, KE, PE: $0$: $E$, $0$; $\tfrac A2$: $\tfrac34E$, $\tfrac14E$; $\tfrac{A}{\sqrt2}$: $\tfrac12E$, $\tfrac12E$; $A$: $0$, $E$. The $A/2$ row is boxed red ("not here"), the $A/\sqrt2$ row boxed green ("KE = PE").

---

## Scene 4 — Springs in every arrangement (Lesson 0.4)

**Narration:**

- **Beat a:** Every spring system has T equals two pi root m over k. The skill is finding the effective k.
- **Beat b:** Side by side, springs share the same stretch, so their stiffnesses add. End to end, they carry the same force, so the reciprocals add. And half a spring is twice as stiff.
- **Beat c:** Hang it vertically and gravity only moves the centre, where k x nought equals m g. About that centre the force is still minus k y, so the period is unchanged.
- **Beat d:** So a five centimetre static stretch means a period of about zero point four four seconds, whatever the mass.

**Visuals:**

- **Beat a:** $T = 2\pi\sqrt{m/k_{\text{eff}}}$ written large, then pulsed.
- **Beat b:** The formula shrinks to the top. Left: "parallel", a wall with a teal and a purple spring side by side into one block, "same stretch, forces add", $k_{\text{eff}} = k_1 + k_2$. Right: "series", wall, teal spring, joint, purple spring, block, "same force, stretches add", $\dfrac{1}{k_{\text{eff}}} = \dfrac{1}{k_1} + \dfrac{1}{k_2}$. Bottom: $k\ell = \text{const} \Rightarrow$ half a spring: $2k$ (teal).
- **Beat c:** Clear. A hatched ceiling with a vertical spring and block oscillating. Dashed lines mark the "relaxed end" and the "new centre" (teal), a brace between them labelled $x_0$. Right: $kx_0 = mg$, then $F = mg - k(x_0 + y) = -ky$.
- **Beat d:** $T = 2\pi\sqrt{m/k} = 2\pi\sqrt{x_0/g}$, then in green $x_0 = 5$ cm: $T = 2\pi\sqrt{0.005} \approx 0.44$ s.

---

## Scene 5 — The simple pendulum (Lesson 0.5)

**Narration:**

- **Beat a:** A pendulum has no spring. Its restoring force is gravity's pull along the arc, minus m g sine theta.
- **Beat b:** For small angles sine theta is almost theta, so this is S H M with omega squared equal to g over L. The mass cancels: T equals two pi root L over g.
- **Beat c:** In an accelerating frame, use an effective g. In a lift rising at two metres per second squared, a one metre pendulum feels twelve, and its period drops from one point nine nine seconds to one point eight one.

**Visuals:**

- **Beat a:** Left: a pivot bar, a dashed vertical, a string and bob swinging ±22°, with a live angle arc $\theta$. A weight arrow $mg$ hangs from the bob and a live amber arrow shows the component along the arc; its label $-mg\sin\theta$ rides with the arrow tip and fades out as the bob passes the bottom.
- **Beat b:** Right column: $mL\ddot\theta = -mg\sin\theta \approx -mg\,\theta$; the muted note "$10^\circ$: $\sin\theta$ vs $\theta$ differ by 0.5%"; $\omega^2 = g/L$; the boxed red $T = 2\pi\sqrt{L/g}$; "mass cancels: a heavy bob is no faster".
- **Beat c:** The box moves to the top. A lift frame with a red upward acceleration arrow $a$ holds $g_{\text{eff}} = g + a = 12\ \text{m/s}^2$ and, in green, $T: 1.99\text{ s} \to 1.81\text{ s}$. Below: lift falling, $g - a$; car accelerating, $\sqrt{g^2 + a^2}$; bob in a liquid, $g(1 - \sigma/\rho)$.

---

## Scene 6 — Adding SHMs and spotting hidden ones (Lesson 0.6)

**Narration:**

- **Beat a:** Two S H Ms of the same frequency add like their arrows. Amplitudes three and four give seven only in step, five at right angles, and one when opposed.
- **Beat b:** Many systems hide an S H M. Displace by x, find the net force, minus k effective x, and divide by the mass that moves.
- **Beat c:** In a U tube, push one side down by x and the unbalanced column is two x high. So T equals two pi root L over two g: about zero point eight nine seconds for a forty centimetre column.
- **Beat d:** A floating cylinder gives two pi root h over g, and a tunnel through the Earth, about eighty four minutes.

**Visuals:**

- **Beat a:** $A = \sqrt{A_1^2 + A_2^2 + 2A_1A_2\cos\delta}$ at the top. A teal arrow of length 3 and a purple arrow of length 4 placed tip to tail, with the red resultant from the origin. Live readouts $A =$ and $\delta =$ as $\delta$ sweeps $0^\circ \to 90^\circ \to 180^\circ$ (7.0, 5.0, 1.0).
- **Beat b:** Clear. "Finding a hidden SHM": 1. displace by a small $x$; 2. $F_{\text{net}} = -k_{\text{eff}}x$; 3. $\omega^2 = k_{\text{eff}}/\text{moving mass}$.
- **Beat c:** Clear. A U-tube drawn from lines, filled with pale-blue liquid whose two levels oscillate opposite ways about a dashed rest level; a red brace "2x" spans the level difference. Right: $\rho AL\,\ddot x = -2\rho Ag\,x$, the red $T = 2\pi\sqrt{L/2g}$, and in green $L = 40$ cm: $T \approx 0.89$ s.
- **Beat d:** Below: "floating body: $T = 2\pi\sqrt{h/g}$" and "tunnel through Earth: $2\pi\sqrt{R/g} \approx 84$ min", while the liquid keeps oscillating.

---

## Scene 7 — Damping, driving and resonance (Lesson 0.7)

**Narration:**

- **Beat a:** Real oscillators lose energy. Drag proportional to velocity shrinks the amplitude by the same factor every cycle: A e to the minus gamma t.
- **Beat b:** If it halves in ten seconds, it is one eighth after thirty. Energy, as amplitude squared, decays twice as fast.
- **Beat c:** Drive it with a periodic push, and it settles at the driver's frequency, responding most near its natural frequency, omega nought. Lighter damping gives a taller, sharper peak.
- **Beat d:** Resonance is about timing, not strength. That is why soldiers break step on bridges, and how a radio picks one station.

**Visuals:**

- **Beat a:** Left: $x$–$t$ axes; a decaying cosine is drawn, then red dashed envelopes $\pm Ae^{-\gamma t}$. Top: $x = Ae^{-\gamma t}\cos(\omega' t + \phi)$; right: $\gamma = \dfrac{b}{2m}$.
- **Beat b:** Right column: $\tfrac12$ in 10 s; $\tfrac18 = (\tfrac12)^3 \Rightarrow 30$ s (green); $E \propto A^2 \propto e^{-2\gamma t}$.
- **Beat c:** Clear. $m\ddot x = -kx - b\dot x + F_0\cos\omega t$ at the top. Axes of amplitude against driving $\omega$ with a dashed line at $\omega_0$. Three response curves $1/\sqrt{(\omega_0^2-\omega^2)^2 + (2\gamma\omega)^2}$ appear in turn: heavy damping (grey), medium (teal), light damping (red), each taller and sharper.
- **Beat d:** A red card "resonance = matched frequency, not a big force", then muted examples: "soldiers break step", "radio tuning", "shock absorbers add damping".

---

## Scene 8 — Recap and next (Lesson 0.8)

**Narration:**

- **Beat a:** To recap. The S H M test is acceleration equals minus omega squared x, and the motion is the shadow of a turning arrow.
- **Beat b:** Energy stays fixed while kinetic and potential swap. Find the effective k for springs and the effective g for pendulums. Damping shrinks the swing; resonance builds it.
- **Beat c:** Try the mastery quiz. Then chapter one hands this motion from particle to particle along a string, and the result is a wave.

**Visuals:** Title "Chapter 0 in six lines". Six numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $a = -\omega^2 x$: the SHM test; every small oscillation passes
2. $x = A\cos(\omega t + \phi)$: shadow of a turning arrow, $T = 2\pi/\omega$
3. $|v| = \omega\sqrt{A^2 - x^2}$: $E = \tfrac12 kA^2$ is fixed; KE and PE swap at $2\omega$
4. $k_1 + k_2$, $\tfrac1{k_1} + \tfrac1{k_2}$: parallel, series; gravity moves the centre
5. $T = 2\pi\sqrt{L/g_{\text{eff}}}$: pendulum, the mass cancels
6. $A \propto e^{-\gamma t}$: damping shrinks it; resonance is timing

Last, "Next: Chapter 1 · Waves on a String" appears at the bottom.
