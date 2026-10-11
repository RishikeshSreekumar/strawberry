# Semiconductor Electronics — Explainer Script

- **Course:** Optics and Modern Physics
- **Chapter:** Chapter 5 · Semiconductor Electronics (id: `omp-5-semiconductor-electronics`)
- **Target runtime:** about 6 minutes (roughly 1,000 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/omp-5-semiconductor-electronics.py`, class `OmpCh5Video`

**Learning goal.** The learner explains conduction with energy bands: metals overlap, insulators have gaps above 3 eV, semiconductors about 1 eV (Si 1.1, Ge 0.7). They see heat and light create electron–hole pairs ($n_e = n_h = n_i$, $\lambda_{\max} = 1240/E_g$ nm) and know a hole is a moving vacancy, not a positive particle. They know donors make n-type and acceptors p-type, both neutral, with $n_en_h = n_i^2$ setting the minority carriers. They picture the p-n junction's depletion region (fixed ions, no free carriers) and barrier (0.7 V Si, 0.3 V Ge), read the diode I–V curve, and solve a constant-drop circuit. They know half-wave keeps the input frequency and full-wave doubles it, that rectified output still ripples, how a Zener regulator shares current ($I_Z = I_S - I_L$), how photodiode, LED and solar cell use the junction with light, how a transistor's thin base gives $\beta = \alpha/(1-\alpha)$ and gain, and that NAND alone builds every gate.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: electrons, n-type and the valence band = SECONDARY (teal, filled dots); holes and p-type = PRIMARY (red, hollow circles); conduction band = ACCENT (amber); photons and fields = PURPLE (wavy arrows); Zener = PURPLE; highlights = gold; correct = GREEN. Every I–V curve uses one diode model, $I = I_s(e^{V/\eta V_T}-1)$, fitted to the lesson's numbers (1.6 mA at 0.6 V, 12 mA at 0.7 V). Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Samantha reads "LED" as the word "led", so the scene spells it with `[[char LTRL]]LED[[char NORM]]` (`{LED}` in the code). Subscripted symbols are spoken as letters ("n e", "n i", "E g", "I C over I E", "R C over R B"). "eV" is always "electron volts", "kΩ" is "one thousand ohm". Gate names are written lower case in the narration ("nand", "nor") so they are read as words. Peak voltage $V_m$ is spoken as "the peak".

---

## Title card

**Narration:** Chapter five. Semiconductor electronics.

**Visuals:** `title_card("Optics and Modern Physics", "Chapter 5 · Semiconductor Electronics")`.

---

## Scene 1 — Why silicon gets better when hot: energy bands (Lesson 5.1)

**Narration:**

- **Beat a:** Heat a copper wire and its resistance goes up. Heat a piece of silicon and its resistance goes down, sharply. In silicon, heat does not just shake the charge carriers. It creates them.
- **Beat b:** Here is why. One atom has sharp energy levels. Pack ten to the twenty three atoms into a crystal, and each level spreads into a band, with gaps between.
- **Beat c:** The highest filled band is the valence band. The empty one above is the conduction band. The gap between them decides everything.
- **Beat d:** In a metal the bands overlap, so it always conducts. An insulator has a gap above three electron volts. A semiconductor's gap is narrow: one point one electron volts for silicon, zero point seven for germanium.

**Visuals:**

- **Beat a:** Left: a thick copper-coloured wire, "copper wire", and $T\uparrow \Rightarrow R\uparrow$ in red. Right: a grey silicon block; $T\uparrow \Rightarrow R\downarrow$ in green while teal carrier dots pop into the block. Caption: "In silicon, heat creates the carriers".
- **Beat b:** Clear. "one atom": two sharp level lines. An arrow labelled $\times10^{23}$. Each level is copied into 14 closely packed lines ("crystal"), which become two filled rectangles: a teal valence band and a faint amber conduction band.
- **Beat c:** Labels "valence band (full)", "conduction band (empty)", then a double arrow $E_g$ across the gap with "band gap".
- **Beat d:** Clear. Three band diagrams side by side: metal (bands overlap, "bands overlap: always conducts"), insulator (wide gap marked $>3$ eV, "diamond: 5.4 eV"), semiconductor (narrow gap marked $\sim1$ eV, "Si 1.1 eV, Ge 0.7 eV").

---

## Scene 2 — Electrons, holes and light (Lesson 5.1)

**Narration:**

- **Beat a:** At room temperature a few electrons are kicked across the gap. Each leaves behind a hole, a missing electron in a bond. So in pure silicon, n e equals n h equals n i.
- **Beat b:** No positive particle moves. A neighbouring electron hops into the hole, so the vacancy moves the other way, like a plus charge.
- **Beat c:** Heat makes more pairs, so a semiconductor's resistance falls when hot. Light makes pairs too, if one photon carries at least the gap energy: the longest wavelength is twelve forty over E g nanometres.
- **Beat d:** One thousand nanometre light carries one point two four electron volts, more than silicon's one point one. So it works.

**Visuals:**

- **Beat a:** Left: a band diagram with a grid of teal electrons in the valence band. "heat" appears in the gap; three electrons jump into the conduction band and red hollow holes appear where they were. Right: $n_e = n_h = n_i$, a legend (dot = electron, ring = hole), and "Si, 300 K: $n_i \approx 1.5\times10^{16}$ m$^{-3}$".
- **Beat b:** Clear (the equation shrinks to the top right). Header "No positive particle moves". A row of bond sites with electrons and one hole: three times an electron hops right into the hole and the hole steps left. Arrows: "electrons hop right" (teal), "so the hole moves left" (red); caption "acts like a + charge".
- **Beat c:** Clear. "hotter: more pairs, so resistance falls" at the top. A small band diagram; a purple wavy photon arrow labelled $h\nu \ge E_g$ strikes a valence electron, which jumps up and leaves a hole. $\lambda_{\max} = \dfrac{1240}{E_g(\text{eV})}$ nm on the right.
- **Beat d:** $1000$ nm: $E = 1240/1000 = 1.24$ eV, then $1.24$ eV $> 1.1$ eV in green with a check.

---

## Scene 3 — Doping: n-type and p-type (Lesson 5.2)

**Narration:**

- **Beat a:** Pure silicon conducts poorly. Swap one atom in a million for arsenic, and the conductivity jumps about a million times.
- **Beat b:** Arsenic has five valence electrons. Four bond, and the fifth is almost free. Each donor gives a conduction electron and becomes a fixed positive ion. That is n type.
- **Beat c:** Boron has three. It grabs an electron from a neighbouring bond, leaving a hole, and becomes a fixed negative ion. That is p type. Both stay neutral: the letter names the majority carrier, not the charge.
- **Beat d:** Electrons and holes keep recombining, so their product is fixed: n e times n h equals n i squared. Dope silicon with four point five times ten to the twenty two arsenic atoms per cubic metre, and the holes fall to five times ten to the nine.

**Visuals:**

- **Beat a:** "1 arsenic atom per million silicon atoms", then "$\sigma$ rises about $10^6$ times" in green.
- **Beat b:** Left: a 3×3 silicon lattice ("n-type") with As at the centre. A spare teal electron appears beside As and wanders off through the gaps of the lattice; a "+" marks the fixed ion. Below: "donors P, As, Sb: 5 valence electrons", "majority carriers: electrons".
- **Beat c:** Right: the same lattice with B at the centre ("p-type"). A red hole appears on a bond next to B, a "−" marks the ion, and the hole hops to a neighbouring bond. Below: "acceptors B, Al, Ga, In: 3 valence electrons", "majority carriers: holes". Bottom caption: "Both stay neutral: the letter names the majority carrier, not the charge".
- **Beat d:** Clear. Boxed $n_en_h = n_i^2$, then $n_e \approx N_D = 4.5\times10^{22}$ m$^{-3}$, then $n_h = \dfrac{(1.5\times10^{16})^2}{4.5\times10^{22}} = 5\times10^9$ m$^{-3}$ in green, and "Doping raises one carrier and lowers the other".

---

## Scene 4 — The p-n junction diode (Lesson 5.3)

**Narration:**

- **Beat a:** Put p type and n type together in one crystal. Electrons diffuse into the p side, holes into the n side, and near the junction they cancel out.
- **Beat b:** What remains are fixed ions: negative on the p side, positive on the n side. This depletion region has no free carriers, but it is full of charge, and its field builds a barrier of about zero point seven volts in silicon.
- **Beat c:** Forward bias lowers the barrier: the current stays tiny until the knee, near zero point seven volts, then shoots up. Reverse bias raises it, and only a tiny leakage flows. That is a diode, a one way valve.
- **Beat d:** In circuits, treat a silicon diode as a switch with a zero point seven volt drop. Five volts through a one thousand ohm resistor leaves four point three volts, so four point three milliamps.

**Visuals:**

- **Beat a:** A crystal bar, p (faint red, holes) on the left and n (faint teal, electrons) on the right. The electrons nearest the junction cross into the p side and meet the holes there; both vanish.
- **Beat b:** A grey depletion strip appears with fixed "−" ions on the p side and "+" ions on the n side, labelled "depletion region" and "no free carriers, but full of fixed charge". A purple arrow "field, n to p" and "barrier ≈ 0.7 V (Si), 0.3 V (Ge)".
- **Beat c:** Clear. Diode I–V axes: the red curve hugs zero for negative $V$ and shoots up past a dashed line at 0.7 V ("forward bias", "reverse: tiny leakage"). Right column: "forward: barrier lowered" (green), "reverse: barrier raised" (red), "a one-way valve" with a diode symbol (p, n marked).
- **Beat d:** Clear. A loop circuit: 5 V cell, Si diode (0.7 V) on the top wire, 1 kΩ resistor on the right, current arrow $I$. Right: $V_R = 5 - 0.7 = 4.3$ V, then $I = \dfrac{4.3\text{ V}}{1\text{ k}\Omega} = 4.3$ mA in green.

---

## Scene 5 — Rectifiers (Lesson 5.4)

**Narration:**

- **Beat a:** Mains reverses fifty times a second, but a battery needs one way current. One diode passes only the positive halves: a half wave rectifier. Fifty hertz in, fifty hertz out.
- **Beat b:** A centre tap or a bridge of four diodes flips each negative half up. Two humps per cycle: the output ripples at one hundred hertz.
- **Beat c:** Averages are the peak over pi, and twice the peak over pi. But one way is not steady. A capacitor fills on each hump and drains slowly between them, leaving a small ripple.

**Visuals:**

- **Beat a:** Two stacked axes. Top: the input sine, "input (mains), 50 Hz". Bottom: a dashed ghost of the input, then the half-wave output (positive humps only) in red; right: "half-wave, one diode, 50 Hz out".
- **Beat b:** The bottom curve morphs into $|\sin|$ (every hump positive); the label becomes "full-wave, centre-tap or bridge, 100 Hz out".
- **Beat c:** $\bar V = \dfrac{V_m}{\pi}$ (half), $\dfrac{2V_m}{\pi}$ (full) at the top. An amber capacitor-filtered curve rides over the humps, dipping only slightly between them: "+ capacitor: small ripple".

---

## Scene 6 — Zener, LED, photodiode, solar cell (Lesson 5.5)

**Narration:**

- **Beat a:** Dope a junction heavily, and reverse breakdown comes at a precise voltage. That is a Zener diode, and breakdown is its job, not damage.
- **Beat b:** Fifteen volts feed a ten volt Zener through two hundred fifty ohms. The resistor drops five volts: twenty milliamps. A one thousand ohm load takes ten. The Zener soaks up the other ten, holding the load at ten volts.
- **Beat c:** Junctions trade energy with light at the gap. A photodiode is reverse biased, so light changes its small current a lot. An LED is forward biased, and emits photons of about the gap energy: red light at six twenty nanometres means a two electron volt gap.
- **Beat d:** A solar cell has no bias. It is the source, working in the fourth quadrant of its curve, where it delivers power.

**Visuals:**

- **Beat a:** Zener I–V axes: the purple curve has the normal forward knee, sits at zero in reverse, then plunges straight down at $-V_Z$ ($V \approx -V_Z$ whatever $I$). Right: "Zener diode, heavily doped, breakdown at a precise V", then "its job, not damage" in green.
- **Beat b:** Clear. Regulator circuit: 15 V cell, 250 Ω series resistor, Zener (cathode up, 10 V) in parallel with a 1 kΩ load. Right: $I_S = \dfrac{15-10}{250} = 20$ mA, $I_L = \dfrac{10}{1000} = 10$ mA, $I_Z = I_S - I_L = 10$ mA (purple), "load held at 10 V" (green).
- **Beat c:** Clear. Cards with a diode icon and photon arrows: "Photodiode: reverse biased, light → current"; "LED: forward biased, current → light". Below: red LED: $E_g \approx \dfrac{1240}{620} = 2.0$ eV.
- **Beat d:** Third card "Solar cell: no bias, light → power". The cards clear to solar-cell I–V axes: a dashed "dark" diode curve and the red "lit" curve shifted down by 5 mA, with $V_{oc}$ and $I_{sc}$ marked and the fourth-quadrant region shaded green. Right: "solar cell", "curve shifted down by light", $V>0,\ I<0$, "delivers power".

---

## Scene 7 — The transistor (Lesson 5.6)

**Narration:**

- **Beat a:** Sandwich three layers, n p n, and you have a transistor: a heavily doped emitter, a thin, lightly doped base, and a large collector.
- **Beat b:** Forward bias the emitter base junction, reverse bias the collector base. Electrons flood into the base. A few percent recombine and leave as base current. The rest sweep into the collector.
- **Beat c:** So I E equals I B plus I C. Alpha is I C over I E. Beta is I C over I B, and beta equals alpha over one minus alpha. Alpha of zero point nine eight gives beta of forty nine.
- **Beat d:** A small base current controls a collector current beta times bigger: an amplifier. With beta one hundred and R C over R B equal to two, the voltage gain is minus two hundred. The extra power comes from the battery.

**Visuals:**

- **Beat a:** Three blocks: "emitter (n)", a narrow "base (p)", a wide "collector (n)", with notes "heavily doped", "thinnest, lightly doped", "largest".
- **Beat b:** Header "emitter-base forward, collector-base reverse". Twelve electrons gather at the base; ten carry on into the collector, two drop out of the base (red arrow, "a few % recombine: base current"); "the rest reach the collector". Then $I_E = I_B + I_C$.
- **Beat c:** Clear. $I_E = I_B + I_C$; $\alpha = I_C/I_E$ and $\beta = I_C/I_B$; boxed $\beta = \dfrac{\alpha}{1-\alpha}$; $\alpha = 0.98 \Rightarrow \beta = 0.98/0.02 = 49$ in green.
- **Beat d:** Clear. A tiny teal input wave ("input: 10 mV"), an arrow, and a large inverted red output wave ("output: 2 V, inverted"). $A_v = -\beta\dfrac{R_C}{R_B} = -100\times2 = -200$ at the top; "The extra power comes from the battery" at the bottom.

---

## Scene 8 — Logic gates (Lesson 5.7)

**Narration:**

- **Beat a:** Used as a switch, the transistor turns a high input into a low output. That is a not gate. Switches in series make an and gate; switches in parallel make an or gate.
- **Beat b:** A bubble on the output gives nand and nor. A truth table lists every input pair, and a gate has no memory.
- **Beat c:** De Morgan's laws swap and for or by inverting everything. So nand alone builds every gate: tie its inputs for not, add a not for and, and invert both inputs for or.

**Visuals:**

- **Beat a:** Gate symbols drawn from primitives: NOT ($Y=\bar A$, "high in, low out"), AND ($Y = AB$, "switches in series"), OR ($Y = A+B$, "switches in parallel").
- **Beat b:** Clear. NAND and NOR symbols (with output bubbles) and their expressions on the left. Right: a truth table A, B, AND, OR, NAND, NOR (NAND and NOR columns in red). Caption: "No memory: the output depends only on the inputs right now".
- **Beat c:** Clear. $\overline{A+B} = \bar A\bar B$ and $\overline{AB} = \bar A + \bar B$ at the top, "NAND alone builds every gate", then three small NAND circuits: NOT (inputs tied, output $\bar A$), AND (NAND then a tied NAND, output $AB$), OR (each input inverted by a tied NAND, then a NAND, output $A+B$).

---

## Scene 9 — Recap and course wrap-up (Lesson 5.8)

**Narration:**

- **Beat a:** To recap. Band gaps decide conduction. Doping picks the majority carrier, and n e times n h stays n i squared.
- **Beat b:** A junction is a one way valve, and rectifiers, Zeners and solar cells put it to work. A transistor lets a small current control a big one, and builds the gates.
- **Beat c:** That completes the course: rays when everything is large, waves when apertures meet the wavelength, photons when light meets electrons, and bands when atoms crowd into crystals. Try the mastery quiz.

**Visuals:** Title "Chapter 5 in five lines". Five numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $\lambda_{\max} = \frac{1240}{E_g}$ nm: band gaps decide conduction
2. $n_en_h = n_i^2$: doping picks the majority carrier
3. barrier $\approx 0.7$ V (Si): a junction is a one-way valve
4. $I_Z = I_S - I_L$, $\lambda \approx \frac{1240}{E_g}$: rectifiers, Zener, LED, solar cell
5. $\beta = \frac{\alpha}{1-\alpha}$, $\overline{AB}$: switches, gain, NAND builds all

Last, "Course complete: rays · waves · photons · bands" appears at the bottom.
