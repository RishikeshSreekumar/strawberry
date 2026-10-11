# Dual Nature of Radiation and Matter — Explainer Script

- **Course:** Optics and Modern Physics
- **Chapter:** Chapter 3 · Dual Nature of Radiation and Matter (id: `omp-3-dual-nature-of-radiation-and-matter`)
- **Target runtime:** about 6 minutes (roughly 1,040 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/omp-3-dual-nature-of-radiation-and-matter.py`, class `OmpCh3Video`

**Learning goal.** The learner sees that light arrives in photons: colour fixes the energy of each one ($E = h\nu = 1240/\lambda$ eV with $\lambda$ in nm), and brightness fixes how many arrive ($N = P\lambda/hc$). Photons carry momentum $p = h/\lambda$, so light pushes with $P/c$ (absorbed) or $2P/c$ (reflected). They know the four photoelectric facts, see why a smooth wave fails each one, and rebuild them from one photon freeing one electron: $K_{\max} = h\nu - \phi = eV_0$, with threshold $\lambda_0 = 1240/\phi$. They read every photoelectric graph from one rule (intensity sets the current, frequency sets the stopping potential), including parallel $V_0$–$\nu$ lines of slope $h/e$. Finally they give matter a wavelength, $\lambda = h/p = 12.27/\sqrt V$ Å for electrons, and check it against the Davisson–Germer peak at 54 V and 50°.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: red / low-energy photons = PRIMARY (red), ultraviolet photons = PURPLE, a generic photon and $h\nu$ = ACCENT (amber), electrons and matter waves = SECONDARY (teal), work function $\phi$ = PURPLE, kinetic energy $K_{\max}$ = GREEN, highlights = gold, correct = GREEN, wrong = red cross. Photons are drawn as short Gaussian wave packets (short wavelength = high energy). Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** "eV" is always spoken as "electron volts" and "Å" as "angstroms". Symbols are spoken as words: "h nu", "phi", "lambda", "K max", "e V nought", "root V". Years and numbers are written out in words ("eighteen eighty eight", "twelve forty", "two point seven five") so `say` reads them naturally. No lone letter "a" appears in the narration.

---

## Title card

**Narration:** Chapter three. The dual nature of radiation and matter.

**Visuals:** `title_card("Optics and Modern Physics", "Chapter 3 · Dual Nature of Radiation and Matter")`.

---

## Scene 1 — Light comes in packets (Lesson 3.1)

**Narration:**

- **Beat a:** Stand under a hundred watt red lamp for an hour, and you just get warm. Stand in weak sunlight, and its ultraviolet can burn your skin, with far less power.
- **Beat b:** Light arrives in packets, called photons, and the damage is done by the energy in one packet. A red photon carries under two electron volts. An ultraviolet photon carries about five, enough to break a bond alone.
- **Beat c:** Each photon carries E equals h nu, which is h c over lambda: with lambda in nanometres, twelve forty over lambda, in electron volts. Six twenty nanometres gives two. Halve the wavelength, and the energy doubles.
- **Beat d:** So a light source has two knobs. Colour sets the energy of each photon. Brightness sets how many arrive per second. A brighter red lamp sends more red photons, never stronger ones.

**Visuals:**

- **Beat a:** A strip of skin along the bottom, split by a faint divider. Left: a red lamp ("100 W red lamp") rains nine long-wavelength red packets onto the skin, then "just warm" in amber. Right: a small sun ("weak sunlight: the UV part") drops three short-wavelength purple packets, then "sunburn" in bold red.
- **Beat b:** Header "One photon, one molecule". A two-atom molecule ("bond needs 4 eV"). A red packet flies in; $E_{\text{red}} = \tfrac{1240}{700} = 1.77$ eV $< 4$ eV appears with a red cross and the molecule only wiggles. A UV packet flies in; $E_{\text{UV}} = \tfrac{1240}{250} = 4.96$ eV $> 4$ eV appears with a green check and the bond breaks (the atoms fly apart).
- **Beat c:** $E = h\nu = \dfrac{hc}{\lambda}$, then boxed in amber $E(\text{eV}) \approx \dfrac{1240}{\lambda(\text{nm})}$. Below, a red packet labelled $620$ nm $\to 2.0$ eV and a purple packet with half the wavelength, $310$ nm $\to 4.0$ eV.
- **Beat d:** Two cards: "Colour (frequency): energy of each photon" and "Brightness (power): photons per second". Two beams stream across: "dim red" with three packets and "bright red" with ten identical packets. Caption: "brighter = more photons, each the same size".

---

## Scene 2 — Counting photons and their push (Lesson 3.1)

**Narration:**

- **Beat a:** Counting photons is division. A source of power P sends out P joules each second, and each photon carries h c over lambda. So the number per second is P lambda over h c.
- **Beat b:** A ten watt lamp at six hundred nanometres sends about three times ten to the nineteen photons every second, which is why light looks smooth.
- **Beat c:** Photons have no mass, but they do carry momentum: p equals h over lambda, which is E over c. Absorb a beam of power P and it pushes with force P over c. Reflect it, and each photon hands over two p, so the force doubles.

**Visuals:**

- **Beat a:** Header "How many photons?", then $N = \dfrac{P}{hc/\lambda} = \dfrac{P\lambda}{hc}$.
- **Beat b:** $P = 10$ W, $\lambda = 600$ nm; $E = \tfrac{1240}{600} = 2.07$ eV $= 3.3\times10^{-19}$ J; $N \approx 3\times10^{19}$ per second in green; caption "that is why ordinary light looks smooth".
- **Beat c:** $p = \dfrac{h}{\lambda} = \dfrac{E}{c}$ at the top. Split screen. Left: a black absorber swallows a packet; arrow $\Delta p = p$ and $F = \dfrac{P}{c}$. Right: a mirror; a packet flies in and back out; arrow $\Delta p = 2p$ (twice as long) and $F = \dfrac{2P}{c}$.

---

## Scene 3 — The photoelectric effect: what is observed (Lesson 3.2)

**Narration:**

- **Beat a:** Hallwachs shone ultraviolet on a negatively charged zinc plate, and it lost its charge within moments. A stronger lamp with no ultraviolet did nothing.
- **Beat b:** Lenard measured it in a vacuum tube. Light falls on the emitter, a collector at potential V gathers the electrons, and a meter reads the current. Make the collector negative, and only energetic electrons climb the hill.
- **Beat c:** Four facts came out. Below a threshold frequency, nothing comes out, however bright. Above it, emission is instant. Brighter light gives more current. But the stopping potential, which halts even the fastest electrons, ignores brightness and rises with frequency.
- **Beat d:** A smooth wave fails all four. Soaking up energy from dim light, an electron in potassium would need about four days to escape. Real ones leave within a billionth of a second.

**Visuals:**

- **Beat a:** Header "Hallwachs, 1888". Two negatively charged zinc plates. Left ("ultraviolet"): purple packets strike, teal electrons fly off, the minus signs fade, "electrons fly off" in green. Right ("strong lamp, no ultraviolet"): bigger red packets strike and nothing leaves; "nothing, however long" in red.
- **Beat b:** Lenard's phototube: an evacuated tube with an emitter and a collector plate, wired through a battery $V$ and a microammeter. Amber packets hit the emitter and electrons cross to the collector. The caption "collector negative: only fast electrons get across" appears above, and in the next volley most electrons turn back partway, while only two reach the collector.
- **Beat c:** "Four experimental facts", numbered rows: threshold; no delay; current; stopping potential (same at any brightness, rises with frequency).
- **Beat d:** Left, "wave theory, dim light on potassium": $t \approx \dfrac{3.7\times10^{-19}\text{ J}}{10^{-24}\text{ W}} \approx 4$ days with a red cross. Right, "experiment": $t < 10^{-9}$ s with a green check. Caption: "the energy arrives in one photon, not as a trickle".

---

## Scene 4 — Einstein's photoelectric equation (Lesson 3.3)

**Narration:**

- **Beat a:** Einstein explained all four in one sentence: one photon gives all its energy to one electron.
- **Beat b:** The photon brings h nu. To escape, the electron must pay at least the work function, phi, and whatever is left is kinetic energy. Surface electrons pay the least, so they are the fastest: K max equals h nu minus phi, which equals e V nought.
- **Beat c:** If h nu is less than phi, nothing comes out: that is the threshold. For sodium, phi is two point seven five electron volts, so the threshold wavelength is twelve forty over two point seven five, about four fifty nanometres.
- **Beat d:** Three hundred nanometre light on potassium: each photon brings four point one three electron volts. Subtract phi, two point three, and K max is one point eight three. So the stopping potential is one point eight three volts.
- **Beat e:** Careful: doubling the frequency does not double the stopping potential. With phi equal to two, photons of three electron volts give one volt. Photons of six give four volts. The minus phi breaks the proportion.

**Visuals:**

- **Beat a:** "Einstein, 1905" and, in bold red, "One photon gives all its energy to one electron."
- **Beat b:** Energy ladder on the left: the grey metal, the surface level with an electron on it, a dashed "free" level above. A packet arrives and an amber arrow $h\nu$ rises from the electron. A purple brace $\phi$ spans surface to free, and a green brace $K_{\max}$ spans the rest. The electron leaves above the free level. On the right, boxed: $K_{\max} = h\nu - \phi = eV_0$ (colour-coded).
- **Beat c:** A second electron gets a short red arrow that stops below the free level, with a red cross. On the right: $h\nu < \phi \Rightarrow$ no emission; $\lambda_0 = \dfrac{1240}{\phi}$; sodium: $\lambda_0 = \dfrac{1240}{2.75} \approx 451$ nm in green.
- **Beat d:** $\lambda = 300$ nm on potassium, $\phi = 2.3$ eV; $h\nu = \tfrac{1240}{300} = 4.13$ eV; $K_{\max} = 4.13 - 2.3 = 1.83$ eV; $V_0 = 1.83$ V in green.
- **Beat e:** $\phi = 2$ eV. Two stacked bars on a baseline: purple $\phi$ (2 eV) plus green $K$ on top. The first is $h\nu = 3$ eV with $V_0 = 1$ V, the second $h\nu = 6$ eV with $V_0 = 4$ V ($V_0$ written under each bar). On the right: $\nu\times2$; $V_0: 1\text{ V}\to4\text{ V}$ in red; "linear, not proportional".

---

## Scene 5 — Reading photoelectric graphs (Lesson 3.4)

**Narration:**

- **Beat a:** Every photoelectric graph follows one rule. Intensity sets how many electrons, so the current. Frequency sets how fast the fastest ones are, so the stopping potential.
- **Beat b:** Here is current against voltage for two brightnesses. The brighter curve levels off three times higher, but both reach zero at the same voltage, minus V nought.
- **Beat c:** Now hold the photon rate fixed and raise the frequency. The saturation level stays put, but the foot of the curve slides further negative. A bigger stopping potential.
- **Beat d:** Plot stopping potential against frequency, and every metal gives a straight line of slope h over e: caesium, sodium and copper are parallel, each leaving the axis at its own threshold. Extended back, they meet the vertical axis at minus phi over e.

**Visuals:**

- **Beat a:** "Intensity sets the current." (teal) and "Frequency sets the stopping potential." (red) fade in, then shrink side by side to the top of the frame, where they stay for the scene.
- **Beat b:** $I$–$V$ axes. A teal "dim" curve, then a red "3x brighter" curve that saturates three times higher. Right column: "3x the current". The shared foot at $-V_0$ is marked with a dot and a flash, and "same $V_0$".
- **Beat c:** The curves are replaced by an amber "lower frequency" curve and a purple "higher" curve with the same saturation. The foot dot slides left to the larger stopping potential. Right column: "same saturation", "larger $V_0$".
- **Beat d:** New axes, $V_0$ (V) against $\nu$ ($10^{14}$ Hz). Three parallel solid lines leave the axis at caesium (red, $\approx5.2$), sodium (teal, $\approx6.6$) and copper (purple, $\approx11.2$). Right column: "slope $= h/e$, same for every metal". Dashed extensions run back to $-2.14$, $-2.75$ and $-4.65$ V, with $-\phi/e$ marked. Then $V_0 = \frac{h}{e}\nu - \frac{\phi}{e}$.

---

## Scene 6 — Matter waves (Lesson 3.5)

**Narration:**

- **Beat a:** Then de Broglie turned it around: if a wave can act like a particle, can a particle act like a wave? A photon has p equals h over lambda, so he proposed the same for everything.
- **Beat b:** Any particle with momentum p has a wavelength, lambda equals h over p. For a charge q accelerated through a voltage V, the momentum is root two m q V. For an electron the constants combine to twelve point two seven over root V, in angstroms.
- **Beat c:** At a hundred volts, an electron's wavelength is one point two two seven angstroms, about the spacing of atoms in a crystal. A cricket ball's is around ten to the minus thirty four metres, so a ball never diffracts.
- **Beat d:** Wavelength depends on momentum, not mass alone: a slow proton and a fast electron with equal momentum have the same wavelength. And the matter wave is not electromagnetic; it is a wave of probability.

**Visuals:**

- **Beat a:** Header "de Broglie, 1923". Left: a photon packet, "light: a wave that arrives as particles". Right: a teal ball with a red "?", "matter: particles that travel as waves?". Then $p = \dfrac{h}{\lambda}$ in amber, indicated.
- **Beat b:** $\lambda = \dfrac{h}{p} = \dfrac{h}{\sqrt{2mK}} = \dfrac{h}{\sqrt{2mqV}}$ at the top. An electron dot $e^-$ trails a teal sine wave whose wavelength is drawn to scale. Live readouts show $V$ and $\lambda$ (Å). Boxed in red: $\lambda_e = \dfrac{12.27}{\sqrt V}$ Å. A `ValueTracker` sweeps $V$ from 25 V to 400 V and the wave visibly shortens.
- **Beat c:** $V$ settles at 100 V; $\tfrac{12.27}{\sqrt{100}} = 1.227$ Å in green, and a row of grey atoms spaced at the same scale appears under the wave ("atoms in a crystal"). Clear. A red cricket ball (0.15 kg, 30 m/s) and $\lambda = \dfrac{6.63\times10^{-34}}{0.15\times30} \approx 1.5\times10^{-34}$ m, "far too small to ever diffract".
- **Beat d:** Two rows with identical waves: a big purple "slow proton" with a short speed arrow and a small teal "fast electron" with a long one. $p_p = p_e \Rightarrow \lambda_p = \lambda_e$. Caption: "a probability wave, not an electromagnetic wave".

---

## Scene 7 — Davisson–Germer (Lesson 3.6)

**Narration:**

- **Beat a:** Davisson and Germer tested it. An electron gun fired a beam at a nickel crystal, and a detector swung round to count the electrons scattered at each angle.
- **Beat b:** At most voltages, the count changed smoothly with angle. At fifty four volts, a sharp peak stood out at fifty degrees: the signature of waves adding in phase, from rows of atoms.
- **Beat c:** Check it two ways. From the crystal, d sine theta gives one point six five angstroms. From de Broglie, twelve point two seven over root fifty four gives one point six seven: about one percent apart.
- **Beat d:** Yet send the electrons one at a time, and each one lands at a single point, whole. Only thousands build the pattern. Electrons travel as waves and arrive as particles, and so does light.

**Visuals:**

- **Beat a:** An "electron gun" above a lattice of grey dots ("nickel crystal"). Electrons fall onto the crystal and the teal beam is drawn. A detector on an arm, at angle $\theta$ from the dashed vertical, swings from 20° to 70° and back (driven by a `ValueTracker`).
- **Beat b:** Right: axes of count against $\theta$ (30°, 60°, 90° marked). "most voltages: smooth": as the arm sweeps, a smooth grey curve is drawn. Then "54 V: sharp peak at 50°": the arm sweeps again and a red curve with a sharp peak at 50° is drawn. The arm parks at 50°, and both the detector and the peak flash.
- **Beat c:** "Two independent routes to the wavelength": diffraction gives $\lambda = d\sin\theta = 2.15\times\sin50^\circ \approx 1.65$ Å. De Broglie gives $\lambda = \dfrac{12.27}{\sqrt{54}} \approx 1.67$ Å. Then "they agree to about 1%" in green.
- **Beat d:** A "detector screen". Five electrons land one at a time as single dots ("one electron, one point"). Then hundreds more pile up into bright and dark bands (dots sampled from a $\cos^2$ fringe pattern). Caption: "travel as waves, arrive as particles".

---

## Scene 8 — Recap and next (Lesson 3.7)

**Narration:**

- **Beat a:** To recap. Light comes in photons: colour sets the energy of each, brightness sets how many. One photon frees one electron, so K max equals h nu minus phi.
- **Beat b:** Below threshold, nothing comes out. Intensity sets the current, and frequency sets the stopping potential. And every particle has a wavelength, h over p.
- **Beat c:** Try the mastery quiz. Then chapter four wraps an electron wave around a nucleus, and whole numbers of wavelengths explain the sharp lines of the hydrogen spectrum.

**Visuals:** Title "Chapter 3 in five lines". Five numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $E = h\nu = \tfrac{1240}{\lambda}$, $p = \tfrac{h}{\lambda}$: colour sets size, brightness sets count
2. $K_{\max} = h\nu - \phi = eV_0$: one photon frees one electron
3. $\lambda_0 = \tfrac{1240}{\phi}$: below threshold, nothing, ever
4. $V_0 = \tfrac{h}{e}\nu - \tfrac{\phi}{e}$: frequency sets the stopping potential
5. $\lambda = \tfrac{h}{p} = \tfrac{12.27}{\sqrt V}$ Å: matter waves, seen by Davisson–Germer

Last, "Next: Chapter 4 · Atoms and Nuclei" appears at the bottom.
