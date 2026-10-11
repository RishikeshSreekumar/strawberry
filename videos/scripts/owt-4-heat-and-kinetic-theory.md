# Heat and Kinetic Theory — Explainer Script

- **Course:** Oscillations, Waves and Thermal Physics
- **Chapter:** Chapter 4 · Heat and Kinetic Theory (id: `owt-4-heat-and-kinetic-theory`)
- **Target runtime:** about 6 minutes (roughly 965 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/owt-4-heat-and-kinetic-theory.py`, class `OwtCh4Video`

**Learning goal.** The learner knows that the zeroth law makes temperature measurable and builds any linear scale from two fixed points ($t = 100\frac{X - X_0}{X_{100} - X_0}$, F = 9/5 C + 32, agreement at −40). They see expansion come from a lopsided interatomic well, use $\Delta L = L\alpha\Delta T$ with $\beta = 2\alpha$, $\gamma = 3\alpha$, and know a hole grows with its plate. They read a heating curve (plateaus are $Q = mL$) and solve mixing problems by first checking whether all the ice melts (100 g ice at −10 °C + 200 g water at 50 °C → 5 °C). They treat conduction as Ohm's law ($H = \Delta T/R$, $R = L/kA$, the two-slab wall with a 66.7 °C interface), radiation as $P = e\sigma AT^4$ with Wien's $\lambda_mT = b$, and small-excess cooling as exponential (Newton). Finally they derive $p = \frac13\rho v_{\text{rms}}^2$ from wall collisions, read temperature as $\frac32k_BT$ of kinetic energy per molecule, get $v_{\text{rms}} = \sqrt{3RT/M}$ (484 m/s for O₂ at 300 K; double speed needs 4× temperature), and use equipartition: $U = \frac f2 nRT$, $C_p - C_V = R$, $\gamma = 1 + 2/f$, adding heat capacities (not γ) for mixtures.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: hot / high temperature / mercury = PRIMARY (red), cold / ice / low temperature = SECONDARY (teal), heat flow, latent heat and plateaus = ACCENT (amber), second quantity (Fahrenheit, diatomic molecule, slab B) = PURPLE, highlights = gold, results = GREEN, wrong = red cross. Math uses `MathTex`; physical objects (benches, thermometers, rods, plates, slabs, molecules) are Manim primitives. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Symbols are spoken as words: "delta L", "alpha", "beta", "gamma", "sigma", "lambda max", "rho", "v r m s", "k T" (for $k_BT$), "C V" and "C p". Units are spoken in full ("kelvin", "kilojoules", "metres per second"). Temperatures are read as "minus twenty degrees" rather than with a symbol.

---

## Title card

**Narration:** Chapter four. Heat and kinetic theory.

**Visuals:** `title_card("Oscillations, Waves & Thermal Physics", "Chapter 4 · Heat and Kinetic Theory")`.

---

## Scene 1 — Temperature and thermometers (Lesson 4.1)

**Narration:**

- **Beat a:** A metal bench on a winter morning feels colder than a wooden one, yet a thermometer reads the same on both. Your hand senses how fast heat leaves your skin, not temperature.
- **Beat b:** A thermometer works because of the zeroth law. If A and B are each in thermal equilibrium with C, they are in equilibrium with each other. The thermometer is body C.
- **Beat c:** To build a scale, take any property that changes steadily, like a mercury column. Mark it at melting ice and boiling water. Temperature is the fraction of the way between them, times one hundred.
- **Beat d:** Fahrenheit puts ice at thirty two and steam at two hundred and twelve, so F equals nine fifths C plus thirty two. The scales agree at minus forty.

**Visuals:**

- **Beat a:** Header "What a thermometer measures". A grey metal bench (left) and a brown wooden bench (right), labelled. "feels colder" (teal) and "feels warmer" (red) appear, then a thermometer on each bench fills to the same level and both read $5^\circ\mathrm{C}$.
- **Beat b:** Three circles A (red), B (teal), C (amber). Green lines A–C and B–C labelled "equilibrium", then a dashed green A–B line with a check. "thermometer" appears beside C.
- **Beat c:** A tall thermometer on the left. The mercury rises to a teal tick $X_0$ ("melting ice"), then to a red tick $X_{100}$ ("boiling water"), then settles at a mark $X$ in between. On the right, the boxed formula $t = 100\times\frac{X - X_0}{X_{100} - X_0}$.
- **Beat d:** Two parallel vertical scales, Celsius (teal) and Fahrenheit (purple), with dashed rungs joining 100↔212, 37↔98.6, 0↔32. $F = \tfrac95 C + 32$ is written on the right. Then the rung −40↔−40 appears, boxed in green, with $-40^\circ\mathrm{C} = -40^\circ\mathrm{F}$.

---

## Scene 2 — Thermal expansion (Lesson 4.2)

**Narration:**

- **Beat a:** Heat almost anything and it grows. Atoms sit in a lopsided energy well. Shake them harder and their average spacing creeps outward.
- **Beat b:** So every length grows by the same fraction: delta L equals L alpha delta T. A one metre steel rod heated by one hundred degrees grows by just over a millimetre, which is why rails need gaps.
- **Beat c:** A hole's diameter is a length too, so heating a plate makes its hole bigger. Area grows with beta equal to two alpha, and volume with gamma equal to three alpha.

**Visuals:**

- **Beat a:** Header "Thermal expansion". Axes "energy" against "atom spacing" with a lopsided (Morse-shaped) well, labelled "steep: repulsion" and "gentle: attraction". A low teal energy level ("cool") with its midpoint dot, then a higher red level ("hot") whose midpoint sits further right. A gold arrow between the two midpoints: "average spacing moves out".
- **Beat b:** A grey rod stretches to the right (dashed outline of the original left behind) and turns red; a brace marks $\Delta L$, with "(exaggerated)". Then $\Delta L = L\,\alpha\,\Delta T$ and, in green, $1\ \mathrm{m}\times1.2\times10^{-5}\,\mathrm{K^{-1}}\times100\ \mathrm{K} = 1.2\ \mathrm{mm}$, and "so rails need gaps".
- **Beat c:** A square plate with a circular hole scales up by 1.25 and turns red, leaving dashed outlines of the old plate and hole: "the hole grows too". On the right, three rows: $\Delta L = L\alpha\Delta T$; $\Delta A = A\beta\Delta T,\ \beta = 2\alpha$; $\Delta V = V\gamma\Delta T,\ \gamma = 3\alpha$.

---

## Scene 3 — Calorimetry and change of state (Lesson 4.3)

**Narration:**

- **Beat a:** Pour heat steadily into a kilogram of ice at minus twenty degrees. The temperature climbs, then stalls at zero while the ice melts, climbs again, then stalls for a long time at one hundred while the water boils.
- **Beat b:** On a plateau, heat breaks bonds instead of speeding molecules up, so Q equals m L. Boiling takes two thousand two hundred and sixty kilojoules, almost three times everything before it.
- **Beat c:** In mixing problems, heat lost equals heat gained, but first check whether all the ice melts. A hundred grams of ice at minus ten goes into two hundred grams of water at fifty. The water can give forty two thousand joules; the ice needs thirty five thousand seven hundred.
- **Beat d:** That is enough, so all the ice melts, and the balance gives five degrees. With too little heat, the mixture would sit at zero with ice left over.

**Visuals:**

- **Beat a:** Header "Heating curve of 1 kg of ice". Axes $T$ (°C) against "heat added (kJ)", ticks −20, 0, 100. The heating curve is drawn segment by segment using the lesson's table: teal rise to 42 kJ, amber plateau at 0 °C to 378 kJ ("melting"), red rise to 100 °C at 798 kJ ("water warms"), long amber plateau to 3058 kJ ("boiling").
- **Beat b:** $Q = mc\,\Delta T$ (red) beside the rising section and $Q = mL$ (amber) above the boiling plateau. Braces under the axis: 798 kJ for everything up to boiling, 2260 kJ for boiling.
- **Beat c:** Clear. Header "First: does all the ice melt?" and the givens. A red bar "water can give $0.2(4200)(50)$" = 42 000 J; below it a stacked bar "ice needs $2100 + 33\,600$": a small teal piece "warm to 0" and an amber piece "melt", totalling 35 700 J.
- **Beat d:** $42\,000 > 35\,700$ in green with a check; the balance $42\,000 - 840\theta = 35\,700 + 420\theta$, then $\theta = 5^\circ\mathrm{C}$ in green. Muted note: "not enough heat? final state 0 °C, some ice left".

---

## Scene 4 — Conduction (Lesson 4.4)

**Narration:**

- **Beat a:** In conduction, faster jiggling atoms nudge their neighbours. In the steady state, the heat current through a slab is k A delta T over L. Copper's k is about four hundred, wood's about point one.
- **Beat b:** Call L over k A the thermal resistance. Then H equals delta T over R, which is Ohm's law, and resistances in series simply add.
- **Beat c:** Take ten centimetres of A, with k of point eight, and five centimetres of B, with k of point two, with one hundred degrees on one face and zero on the other. The resistances are point one two five and point two five kelvin per watt, so about two hundred and sixty seven watts flow per square metre.
- **Beat d:** The temperature drops split one to two, so the interface sits near sixty seven degrees. The poor conductor takes most of the drop: that is insulation.

**Visuals:**

- **Beat a:** Header "Conduction". A slab with a red hot face $T_1$ and a teal cold face $T_2$, thickness brace $L$, "area $A$". An amber arrow $H$ crosses it. On the right, $H = \frac{kA\,\Delta T}{L}$, then $k_{\text{copper}}\approx400$, $k_{\text{wood}}\approx0.1$ W m⁻¹K⁻¹.
- **Beat b:** The formula shrinks to the top right. Below: $R = \frac{L}{kA}$; $H = \frac{\Delta T}{R}$ (amber) $\leftrightarrow$ $I = \frac VR$ (muted); $R_{\text{series}} = R_1 + R_2$.
- **Beat c:** Clear. Two slabs side by side at the bottom left: A (10 cm, $k = 0.8$) twice as wide as B (5 cm, $k = 0.2$). Faint profile axes appear above them with the face temperatures 100° (hot side) and 0° (cold side) before any numbers are worked. On the right: $R_A = 0.1/0.8 = 0.125$ K/W, $R_B = 0.05/0.2 = 0.25$ K/W, $H = 100/0.375 \approx 267$ W (amber).
- **Beat d:** Above the slabs, the temperature profile is drawn: a red polyline from 100° at the hot face to a gold dot at 66.7° over the interface, then down to 0° at the cold face (shallow across A, steep across B). On the right: "drops 33.3° : 66.7° = 1 : 2" and, in green, "the poor conductor takes most of the drop".

---

## Scene 5 — Convection, radiation and cooling (Lesson 4.5)

**Narration:**

- **Beat a:** In convection, warm fluid rises and carries heat with it, as in a sea breeze. Radiation needs no medium: every body above absolute zero radiates.
- **Beat b:** Radiated power is e sigma A T to the fourth, with T in kelvin. Double the absolute temperature and the power rises sixteen times. And a good absorber is a good emitter.
- **Beat c:** Hotter bodies peak at shorter wavelengths: lambda max times T is constant. The Sun peaks near five hundred nanometres, so its surface is about five thousand eight hundred kelvin.
- **Beat d:** For a small excess over the surroundings, the loss is proportional to the excess: Newton's law of cooling. Tea at eighty degrees in a twenty degree room loses half its excess about every seven minutes.

**Visuals:**

- **Beat a:** Header "Convection and radiation". Warm land (left) and cool sea (right) strips. A convection loop of arrows: red up over the land ("warm air rises"), across aloft, teal down over the sea, and teal back along the surface ("sea breeze"). A sun in the top right with a wavy ray: "radiation: no medium needed".
- **Beat b:** Boxed $P = e\,\sigma A\,T^4$. A faint sphere $T$ with short amber arrows (none pointing down, so the labels stay clear) $\Rightarrow$ a bright sphere $2T$ with long arrows; $P\times2^4 = 16P$ in green. Caption "good absorber = good emitter".
- **Beat c:** Clear, header "Wien's law". Axes against wavelength $\lambda$ with two black-body curves: 4500 K (red, lower, peak further right) and 5800 K (teal, higher, peak at 500 nm), dashed lines at the peaks. Right: $\lambda_mT = b = 2.9\times10^{-3}$ m K, then "the Sun": $T = \frac{2.9\times10^{-3}}{5\times10^{-7}} = 5800$ K in green.
- **Beat d:** Clear, header "Newton's law of cooling". Axes temperature (20, 50, 80) against "time (min)", dashed teal "room 20 °C" line. $\frac{dT}{dt} = -K(T - T_0)$ is written, then the red curve $20 + 60e^{-0.1t}$ is drawn. Gold dots at 6.9 min (50 °C) and 13.9 min (35 °C). Right: "excess: 60 → 30 → 15" and, in green, "halves every $\ln2/K \approx 6.9$ min".

---

## Scene 6 — Kinetic theory of gases (Lesson 4.6)

**Narration:**

- **Beat a:** Kinetic theory builds a gas from Newton's laws: tiny molecules in random motion, colliding elastically. When one hits the right wall, its x velocity reverses, giving the wall momentum two m v x.
- **Beat b:** It returns after a round trip of two L, so its average force is m v x squared over L. Add every molecule, share the motion among three directions, and divide by the area: the pressure is one third rho v r m s squared.
- **Beat c:** Compare with p V equals N k T. Each molecule's average kinetic energy is three halves k T. Temperature measures random kinetic energy, the same for every gas.
- **Beat d:** So v r m s is root three R T over M: about four hundred and eighty four metres per second for oxygen at three hundred kelvin. Doubling the speed takes four times the temperature.

**Visuals:**

- **Beat a:** Header "Kinetic theory of gases". A square box of side $L$ on the left with 26 teal molecules bouncing elastically off the walls (seeded random start, updater-driven). A red tracked molecule moves only along $x$, bouncing between the side walls. The right wall lights up gold with $\Delta p = 2mv_x$.
- **Beat b:** Right column, in turn: $F_1 = \frac{2mv_x}{2L/v_x} = \frac{mv_x^2}{L}$; $\overline{v_x^2} = \tfrac13\overline{v^2}$ (muted); boxed $p = \tfrac13\rho v_{\text{rms}}^2$.
- **Beat c:** The boxed result shrinks to the top. Then $pV = Nk_BT$, and the red boxed $\tfrac12m\overline{v^2} = \tfrac32k_BT$ with "temperature = average random KE".
- **Beat d:** $v_{\text{rms}} = \sqrt{3RT/M}$, then "O₂, 300 K: ≈ 484 m/s" in green. Above the box, $T\times4 \Rightarrow v_{\text{rms}}\times2$ appears as all the molecules turn red and their speed doubles.

---

## Scene 7 — Degrees of freedom and equipartition (Lesson 4.7)

**Narration:**

- **Beat a:** Heating a mole of nitrogen by one kelvin takes about two thirds more heat than helium. The dumbbell shaped nitrogen molecule can also spin.
- **Beat b:** Count degrees of freedom, f: three for a single atom, five for a rigid diatomic, which adds two rotations. Equipartition gives each one half k T on average.
- **Beat c:** So U is f over two n R T, C V is f over two R, C p is C V plus R, and gamma is one plus two over f: five thirds for helium, seven fifths for nitrogen.
- **Beat d:** For a mixture, add heat capacities, never gammas. A mole each of helium and oxygen gives C V of two R, C p of three R, and gamma of one point five.

**Visuals:**

- **Beat a:** Header "Degrees of freedom and equipartition". A single teal helium atom (left) and a purple nitrogen dumbbell (right), labelled. $Q_{\mathrm{N_2}} \approx 1.67\,Q_{\mathrm{He}}$ in red at the bottom, then an amber rotation arc over the dumbbell: "can also spin".
- **Beat b:** Three teal translation arrows ($x$, $y$, $z$) grow from the helium atom, and $f = 3$ appears under it. Three translation arrows and a dashed amber ellipse (the second rotation) are added to the dumbbell, with $f = 3 + 2 = 5$. At the bottom: $\tfrac12 k_BT$ per degree of freedom (red).
- **Beat c:** Clear. Left column: $U = \frac f2 nRT$, $C_V = \frac f2 R$, $C_p = C_V + R$, $\gamma = \frac{C_p}{C_V} = 1 + \frac2f$. Right: He: $f = 3,\ \gamma = \tfrac53$ (teal); N₂: $f = 5,\ \gamma = \tfrac75$ (purple).
- **Beat d:** Clear. $C_V = \frac{1\cdot\frac32R + 1\cdot\frac52R}{2} = 2R$, $C_p = 2R + R = 3R$, $\gamma = \frac{3R}{2R} = 1.5$ (green). At the bottom, the wrong shortcut $\tfrac12(\tfrac53 + \tfrac75) \approx 1.53$ in red with a cross.

---

## Scene 8 — Recap and next (Lesson 4.8)

**Narration:**

- **Beat a:** To recap. The zeroth law makes temperature measurable, and every length grows by alpha delta T, holes included.
- **Beat b:** Heat lost equals heat gained, after checking the ice. Conduction follows Ohm's law, radiation goes as T to the fourth, and small differences cool exponentially.
- **Beat c:** And temperature is molecular kinetic energy: one half k T for every degree of freedom.
- **Beat d:** Try the mastery quiz. Then chapter five does the energy book keeping: heat, work and the first law, as areas on a pressure volume diagram.

**Visuals:** Title "Chapter 4 in six lines" (condensed from the mastery lesson's "Chapter 4 in 8 lines"). Six numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $t = 100\,\frac{X - X_0}{X_{100} - X_0}$: zeroth law, two fixed points
2. $\Delta L = L\alpha\Delta T$, $\beta = 2\alpha$, $\gamma = 3\alpha$: holes expand too
3. $Q = mc\,\Delta T$ or $mL$: check the ice first
4. $H = \frac{\Delta T}{R}$, $R = \frac{L}{kA}$: resistances add in series
5. $P = e\sigma AT^4$, $\lambda_mT = b$: small excess cools exponentially
6. $\tfrac12m\overline{v^2} = \tfrac32k_BT$, $U = \tfrac f2 nRT$: half kT per degree of freedom

Last, "Next: Chapter 5 · Thermodynamics" appears at the bottom.
