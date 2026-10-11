# Electromagnetic Induction and AC — Explainer Script

- **Course:** Electricity and Magnetism
- **Chapter:** Chapter 5 · Electromagnetic Induction and AC (id: `em-5-induction-and-ac`)
- **Target runtime:** about 6.5 minutes (roughly 1,100 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/em-5-induction-and-ac.py`, class `EmCh5Video`

**Learning goal.** The learner explains the magnet falling slowly through a copper pipe with Faraday's law, $\mathcal E = -N\,d\Phi/dt$ with $\Phi = BA\cos\theta$ (only a *change* in flux matters; 100 turns, 0.01 m², 0.5 T to 0 in 0.1 s gives 5 V), and reads the minus sign as Lenz's law (the induced current opposes the change, or energy would come for free). They derive motional emf $Bvl$ from $q\vec v\times\vec B$, the drag $B^2l^2v/R$, the terminal speed $mgR/B^2l^2$ (10 m/s for the lesson's numbers) and the energy balance $Fv = I^2R$, and know the emf exists without a circuit. They use self-inductance ($N\Phi = LI$, $\mathcal E = -L\,dI/dt$; it opposes a *change* in current; 2 A in 1 ms through 50 mH gives 100 V; $U = \tfrac12LI^2$), LR growth with $\tau = L/R$ (the current never jumps) and LC energy swapping at $\omega = 1/\sqrt{LC}$. They picture AC as a rotating phasor, use $V_{\text{rms}} = V_0/\sqrt2$ (220 V mains peaks at 311 V; the cycle average is zero), the phase of R, L and C ($X_L = \omega L$, current lags; $X_C = 1/\omega C$, current leads), add LCR voltages as phasors ($Z$, $\tan\phi$; 100 Ω, 0.1 H, 10 μF at 50 Hz gives $Z \approx 304\ \Omega$, $\phi \approx -70.8°$), and find resonance at $\omega_0 = 1/\sqrt{LC}$ (159 Hz; sharper for smaller R). They finish with $P = V_{\text{rms}}I_{\text{rms}}\cos\phi$, the ideal transformer, high-voltage transmission (80 kW lost at 220 V vs 32 W at 11 kV) and EM waves at $c = 1/\sqrt{\mu_0\varepsilon_0}$.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: magnetic field = GREEN, currents and loops = PRIMARY (red), forces = PURPLE, electric field / capacitor energy = ACCENT (amber), inductor energy = GREEN, phasors: voltage = red, current = teal, $V_L$ = purple, $V_C$ = amber; bar magnets red N and teal S; highlights = gold, correct = GREEN, wrong = red. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** "EMF", "RMS", "AC" and "LCR" are written as spaced letters ("E M F", "r m s", "A C", "L C R") so Samantha spells them. Symbols spoken as words ("d phi by d t", "B v l", "one over root L C", "omega L").

---

## Title card

**Narration:** Chapter five. Electromagnetic induction, and alternating current.

**Visuals:** `title_card("Electricity & Magnetism", "Chapter 5 · Electromagnetic Induction and AC")`.

---

## Scene 1 — Faraday's and Lenz's laws (Lesson 5.1)

**Narration:**

- **Beat a:** Drop a strong magnet down a copper pipe. Copper is not magnetic, and the magnet touches nothing. Yet it drifts down slowly, as if through honey. Something in the copper pushes back, but only while the magnet moves.
- **Beat b:** Faraday found why. The magnetic flux through a loop is B A cos theta. When that flux changes, an E M F appears round the loop: minus N, d phi by d t. Only the change matters, not how much flux there is.
- **Beat c:** A hundred turns of area one hundredth of a square metre sit in half a tesla. If the field falls to zero in a tenth of a second, the average E M F is five volts.
- **Beat d:** The minus sign is Lenz's law. The induced current always opposes the change that caused it. Push a north pole towards a loop, and the loop makes its own north pole facing it, pushing back. If it helped the change instead, you would get energy for nothing.

**Visuals:**

- **Beat a:** Two copper pipes. In the left one a grey "steel slug" drops straight through; in the right one a small bar "magnet" drifts down slowly. Red question on the right: "Copper is not magnetic. So what pushes back?"
- **Beat b:** Clear. A red loop in perspective with four green field arrows through it; the arrows grow (the field increases). On the right: $\Phi = BA\cos\theta$; $\mathcal E = -N\frac{d\Phi}{dt}$ in red; "only the change in flux matters" in green.
- **Beat c:** $\mathcal E = N\frac{\Delta\Phi}{\Delta t} = 100\times\frac{(0.5)(0.01)}{0.1} = 5$ V in green.
- **Beat d:** Clear. A bar magnet, N pole down, moves toward a red loop. An induced-current arrow appears round the loop (anticlockwise seen from above) and a purple arrow points up from the loop ("loop's own field pushes back"). On the right: "Lenz: the induced current opposes the change" and "(otherwise: free energy)".

---

## Scene 2 — Motional EMF (Lesson 5.2)

**Narration:**

- **Beat a:** Slide a metal rod along two rails through a magnetic field. The charges in the rod move with it, so they feel q v cross B, and pile up at one end. The rod becomes a cell, with an E M F of B v l.
- **Beat b:** Current then flows, and the field pushes back on it, with a drag force of B squared l squared v over R. Stand the rails upright and let the rod fall, and the drag grows until it balances gravity. The rod reaches a terminal speed: m g R over B squared l squared.
- **Beat c:** Energy is conserved the whole way: the mechanical power put in equals the I squared R heating in the resistor. And the E M F is there even with no circuit at all. Only the current needs one.

**Visuals:**

- **Beat a:** Green crosses (B into the page). Two horizontal rails joined on the left by a resistor $R$; a brown rod across them slides right with a velocity arrow. A plus appears at the rod's top end and a minus at its bottom; length label $l$. $\mathcal E = Bvl$ in red on the right.
- **Beat b:** A red anticlockwise current arrow round the circuit and a purple drag arrow on the rod pointing left. A small inset above the rails shows upright rails with a falling rod, $mg$ down and the drag up ("upright rails"). On the right: $F = \frac{B^2l^2v}{R}$; $mg = \frac{B^2l^2v_t}{R} \Rightarrow v_t = \frac{mgR}{B^2l^2}$; in green $\frac{(0.01)(10)(1)}{(0.5)^2(0.2)^2} = 10$ m/s.
- **Beat c:** $Fv = I^2R$ in green, then "no circuit: still an EMF".

---

## Scene 3 — Self-inductance (Lesson 5.3)

**Narration:**

- **Beat a:** A coil's current makes flux through its own turns. N phi equals L I, where L is the self inductance. Change the current, and the coil fights back with an E M F of minus L, d I by d t.
- **Beat b:** So an inductor does not oppose current. It opposes a change in current. Switch off two amperes in one millisecond, through fifty millihenries, and you get a hundred volts.
- **Beat c:** Building up that current stores energy, one half L I squared, held in the magnetic field.

**Visuals:**

- **Beat a:** A red coil (side view) with a current arrow $I$ beneath and green flux arrows running through it. On the right: $N\Phi = LI$, then $\mathcal E = -L\frac{dI}{dt}$ in red.
- **Beat b:** "opposes a change in current, not current" in green; $(0.05)\frac{2}{0.001} = 100$ V.
- **Beat c:** $U = \tfrac12LI^2,\ u = \frac{B^2}{2\mu_0}$ in purple at the bottom.

---

## Scene 4 — LR circuits and LC oscillations (Lesson 5.4)

**Narration:**

- **Beat a:** Switch a battery on across an inductor and a resistor. The current cannot jump, because that would need an infinite E M F. So it climbs: E over R, times one minus e to the minus R t over L, with time constant L over R.
- **Beat b:** Now connect a charged capacitor to an inductor. The energy sloshes back and forth: all in the capacitor's electric field, then all in the inductor's magnetic field, then back again. It is the electrical spring and mass, oscillating at omega equals one over root L C.

**Visuals:**

- **Beat a:** Axes $i$ against $t$ with ticks $\tau \ldots 5\tau$ and a dashed asymptote $\frac{\mathcal E}{R}$; the red growth curve is drawn. On the right: $i = \frac{\mathcal E}{R}(1 - e^{-Rt/L})$, $\tau = \frac{L}{R}$ in red, "switch-on: open. steady state: a wire."
- **Beat b:** Clear. Two energy bars on a common base: amber $\frac{q^2}{2C}$ and green $\tfrac12Li^2$, under a dashed "total energy constant" line. A phase tracker swaps them ($\cos^2$ and $\sin^2$) through a full cycle. $\omega = \frac{1}{\sqrt{LC}}$ in red with "electrical spring and mass".

---

## Scene 5 — Alternating current and phasors (Lesson 5.5)

**Narration:**

- **Beat a:** An alternating voltage is the shadow of a turning arrow. A phasor of length V nought spins at omega, and its height traces V nought sin omega t.
- **Beat b:** Over a full cycle the average is zero. What sets the heating is the root mean square, V nought over root two. Indian mains is two hundred and twenty volts r m s, so the peak is about three hundred and eleven volts.
- **Beat c:** A resistor keeps the current in step with the voltage. In an inductor the current lags by ninety degrees, and the reactance is omega L. In a capacitor the current leads by ninety degrees, and the reactance is one over omega C.

**Visuals:**

- **Beat a:** A circle on the left with a red phasor $V_0$ rotating; a dashed line carries its height across to axes on the right, where a red sine wave is traced out over two turns. $v = V_0\sin\omega t$ above.
- **Beat b:** Clear. $\bar v_{\text{cycle}} = 0$; $V_{\text{rms}} = \frac{V_0}{\sqrt2}$ in red; $V_0 = \sqrt2\times220 \approx 311$ V in green.
- **Beat c:** Clear. Three phasor panels, each with a red $V$ and a teal $I$: "R" (parallel, "in phase", $R$); "L" ($V$ up, $I$ to the right, "I lags", $X_L = \omega L$); "C" ($V$ to the right, $I$ up, "I leads", $X_C = \frac{1}{\omega C}$).

---

## Scene 6 — Series LCR and resonance (Lesson 5.6)

**Narration:**

- **Beat a:** In a series L C R circuit, the same current flows through all three, so draw it as the reference. V R lies along the current. V L points ninety degrees ahead, and V C ninety degrees behind. They add as arrows, not as numbers.
- **Beat b:** So the impedance is the square root of R squared plus X L minus X C, squared, and tan phi is X L minus X C, over R. With a hundred ohms, a tenth of a henry and ten microfarads at fifty hertz, Z is about three hundred and four ohms, and the circuit is capacitive.
- **Beat c:** At one frequency, X L equals X C. That is resonance, at omega nought equals one over root L C. Z falls to just R, and the current peaks. Here that is about a hundred and fifty nine hertz. A smaller resistance gives a sharper peak.

**Visuals:**

- **Beat a:** Drawn to scale for the example in beat b ($R = 100\ \Omega$, $X_L = 31.4\ \Omega$, $X_C = 318.3\ \Omega$). A teal reference $I$ along the horizontal; red $V_R$ along it, a short purple $V_L$ up, a long amber $V_C$ down. A purple $V_L - V_C$ arrow drops from the tip of $V_R$, and the dark resultant $V$ closes the triangle, with a gold angle $\phi$ (−70.8°) below the axis.
- **Beat b:** On the right: $Z = \sqrt{R^2 + (X_L - X_C)^2}$ (red); $\tan\phi = \frac{X_L - X_C}{R}$; $X_L = 31.4\ \Omega,\ X_C = 318.3\ \Omega$; $Z \approx 304\ \Omega,\ \phi \approx -70.8°$ in green, "capacitive: current leads".
- **Beat c:** Clear. $\omega_0 = \frac{1}{\sqrt{LC}}$ at the top right. Axes $I$ against $f$ (50–300 Hz) for $L = 0.1$ H, $C = 10\ \mu$F, 10 V: a broad teal curve for $R = 60\ \Omega$ and a tall sharp red curve for $R = 20\ \Omega$; a gold dashed line at $f_0 \approx 159$ Hz; $Z = R$.

---

## Scene 7 — AC power, transformers and EM waves (Lesson 5.7)

**Narration:**

- **Beat a:** Power in an A C circuit is V r m s, times I r m s, times cos phi. In a pure inductor or capacitor, cos phi is zero, and the current does no work at all.
- **Beat b:** A transformer uses mutual induction. The voltages are in the ratio of the turns, and the currents in the inverse ratio, so the power stays the same. A step up transformer raises the voltage, not the power.
- **Beat c:** That is why power lines run at high voltage. Delivering forty four kilowatts through two ohms of line at two hundred and twenty volts would waste eighty kilowatts. At eleven kilovolts, the loss is just thirty two watts.
- **Beat d:** Last, a changing electric field makes a magnetic field too. Changing fields regenerate each other, and travel as a wave at one over root mu nought epsilon nought: the speed of light.

**Visuals:**

- **Beat a:** $P = V_{\text{rms}}I_{\text{rms}}\cos\phi$ in red; "pure L or C: cos φ = 0, so no power (wattless current)".
- **Beat b:** Clear. A grey square iron core with a red primary coil (fewer turns) on the left limb and a teal secondary (more turns) on the right. On the right: $\frac{V_s}{V_p} = \frac{N_s}{N_p} = \frac{I_p}{I_s}$ (red), $V_pI_p = V_sI_s$ (green), "step up: more volts, same power".
- **Beat c:** Clear. $P = 44$ kW, $R_{\text{line}} = 2\ \Omega$; in red "220 V: $I = 200$ A, $I^2R = 80$ kW"; in green "11 kV: $I = 4$ A, $I^2R = 32$ W".
- **Beat d:** Clear. A travelling-wave sketch along a horizontal axis: a red $\vec E$ sine wave in the vertical plane and a green $\vec B$ sine wave drawn obliquely (perpendicular plane), in phase. $c = \frac{1}{\sqrt{\mu_0\varepsilon_0}} \approx 3\times10^8$ m/s in red, and $E_0 = cB_0$.

---

## Scene 8 — Recap and close (Lesson 5.8)

**Narration:**

- **Beat a:** To recap. A changing flux makes an E M F, and Lenz's law sets its direction. A moving rod is a cell, with a drag that brings it to a terminal speed.
- **Beat b:** An inductor's current never jumps. Alternating voltages are turning phasors that add as arrows. And transformers let us send power at high voltage.
- **Beat c:** Try the mastery quiz. Changing fields making each other gave us the electromagnetic wave, and that wave is light. The optics course picks up the story from there.

**Visuals:** Title "Chapter 5 in five lines". Five numbered rows, each a formula on the left and a muted note on the right:

1. $\mathcal E = -N\frac{d\Phi}{dt}$: only change counts; Lenz opposes it
2. $\mathcal E = Bvl$, $F = \frac{B^2l^2v}{R}$: rods on rails; terminal speed
3. $\mathcal E = -L\frac{dI}{dt}$, $\tau = \frac{L}{R}$: inductor current never jumps
4. $V_{\text{rms}} = \frac{V_0}{\sqrt2}$, $Z = \sqrt{R^2 + (X_L - X_C)^2}$: phasors add as arrows
5. $P = V_{\text{rms}}I_{\text{rms}}\cos\phi$: transform up, transmit, transform down

Last, "Next course: Optics and Modern Physics" appears at the bottom.
