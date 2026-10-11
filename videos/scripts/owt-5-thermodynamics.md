# Thermodynamics — Explainer Script

- **Course:** Oscillations, Waves and Thermal Physics
- **Chapter:** Chapter 5 · Thermodynamics (id: `owt-5-thermodynamics`)
- **Target runtime:** about 5.5 minutes (roughly 970 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/owt-5-thermodynamics.py`, class `OwtCh5Video`

**Learning goal.** The learner treats thermodynamics as energy bookkeeping on a p–V diagram. Work done by a gas is $\int p\,dV$, the area under the path (kPa × L = J). The first law $\Delta U = Q - W$ uses $W$ done *by* the gas, and only $U$ is a state function, so two paths between the same states share $\Delta U$ but not $Q$ or $W$. With $\Delta U = nC_V\Delta T$ for any process, the isochoric, isobaric and isothermal cases become one-line calculations, and $C_p = C_V + R$ follows. Setting $Q = 0$ gives $pV^\gamma$ and $TV^{\gamma-1}$ constant, an adiabat steeper than an isotherm by $\gamma$, and the polytropic family $pV^n$ with $C = C_V + R/(1-n)$. Round a cycle $\Delta U = 0$ and the enclosed area is the net work (clockwise = engine). Engines have $\eta = W/Q_H = 1 - Q_C/Q_H$ (Otto: $1 - r^{1-\gamma}$), refrigerators $\text{COP} = Q_C/W$. The second law (Kelvin–Planck, Clausius) and the Carnot cycle cap every engine at $1 - T_C/T_H$.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: heat in, hot reservoir and the $T_H$ isotherm = PRIMARY (red); heat out, cold reservoir and the $T_C$ isotherm = SECONDARY (teal); work and shaded area under a path = ACCENT (amber); adiabats and enclosed loop area = PURPLE; highlights = gold; correct / results = GREEN; impossible = red cross. p–V diagrams are Manim `Axes` on the left half (V in L, p in kPa), with equations in a right-hand column centred at x ≈ 3.4. The gas is a cream fill with molecule dots inside a cylinder whose piston is driven by a `ValueTracker`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Symbols are spoken as words: "delta U equals Q minus W", "n C V delta T", "C P", "p V to the gamma", "eta", "Q H", "Q C", "T C over T H", "p d V". Units are spelled out ("kilopascals", "litres", "joules", "kelvin"). "COP" is never spoken as a word; the narration says "coefficient of performance". Points on diagrams (A, B, C, D) are labelled on screen but not spoken, to avoid Samantha reading a lone "A" as the article.

---

## Title card

**Narration:** Chapter five. Thermodynamics.

**Visuals:** `title_card("Oscillations, Waves & Thermal Physics", "Chapter 5 · Thermodynamics")`.

---

## Scene 1 — Heat, work and the first law (Lesson 5.1)

**Narration:**

- **Beat a:** Rub your hands together and they warm up. Hold them near a heater and they warm up too. Energy enters as work or as heat, and thermodynamics keeps the accounts.
- **Beat b:** A gas pushes on a piston. If the piston moves out a little, the gas does work: pressure times the change in volume, p d V.
- **Beat c:** On a pressure volume graph, that adds up to the area under the curve. At a steady one hundred kilopascals, from ten litres to twenty five, the work is fifteen hundred joules. Kilopascals times litres are joules.
- **Beat d:** The first law: delta U equals Q minus W. Heat supplied to the gas, minus work done by the gas.
- **Beat e:** Internal energy depends only on the state. Between the same two states, delta U is forty five hundred joules on either path, but the work is one thousand or two thousand, so the heat is fifty five hundred or sixty five hundred. Heat is energy in transit.

**Visuals:**

- **Beat a:** A cream box "gas / internal energy U". An amber arrow from the left ("work: a force through a distance") and a red arrow from above ("heat: driven by a temperature difference") grow into it.
- **Beat b:** Clear. A cylinder on the left with gas dots and a grey piston; a red force arrow $F = pA$ rides above the piston. The piston slides out and a brace marks $dx$. On the right: $dW = F\,dx = pA\,dx = p\,dV$, then $W = \int p\,dV$ in amber.
- **Beat c:** Clear. p–V axes (ticks 10, 25 L and 100 kPa). A horizontal line at 100 kPa from 10 L to 25 L, the rectangle under it shaded amber. Right: $W = p\,\Delta V = 100\times15$, $= 1500$ J (green), and muted "kPa × L = J".
- **Beat d:** Clear. Boxed $\Delta U = Q - W$, large, with "Q = heat supplied **to** the gas" (red) and "W = work done **by** the gas" (amber) beneath.
- **Beat e:** Clear. p–V axes with A (10 L, 100 kPa) and B (20 L, 200 kPa). Lower path (amber, across then up) and upper path (purple, up then across). Right: "$\Delta U = 4500$ J on both paths"; the area under the lower path shades with "$W = 1000,\ Q = 5500$ J"; it swaps for the larger area under the upper path with "$W = 2000,\ Q = 6500$ J". Caption "heat is energy in transit".

---

## Scene 2 — Isochoric, isobaric, isothermal (Lesson 5.2)

**Narration:**

- **Beat a:** Hold one variable fixed and the first law becomes a short calculation. For an ideal gas, delta U is n C V delta T, for any process.
- **Beat b:** Isochoric: fixed volume, a vertical line. No area, no work, so all the heat goes into internal energy.
- **Beat c:** Isobaric: fixed pressure, a horizontal line. The gas also expands and does work, so it needs extra heat. That is why C P equals C V plus R.
- **Beat d:** Isothermal: fixed temperature, a hyperbola. Delta U is zero, so Q equals W, n R T times the natural log of V two over V one. One mole doubling its volume at three hundred kelvin: about seventeen hundred and thirty joules.
- **Beat e:** So no temperature change does not mean no heat: here every joule of work is replaced by heat from the bath.

**Visuals:**

- **Beat a:** p–V axes on the left with faint background isotherms and a start dot. Header (red) on the right: $\Delta U = nC_V\,\Delta T$ (any process).
- **Beat b:** An amber vertical line up from the start dot. Row "Isochoric: V fixed" with $W = 0,\ Q = \Delta U = nC_V\Delta T$.
- **Beat c:** A teal horizontal line to 20 L with its area shaded. Row "Isobaric: p fixed" with $W = nR\Delta T,\ Q = nC_p\Delta T,\ C_p = C_V + R$.
- **Beat d:** A purple hyperbola to 20 L with its area shaded. Row "Isothermal: T fixed" with $\Delta U = 0,\ Q = W = nRT\ln\frac{V_2}{V_1}$, then green "1 mol, 300 K, V → 2V: W ≈ 1729 J".
- **Beat e:** The isotherm is indicated in gold; at the bottom, in red: $\Delta T = 0 \Rightarrow \Delta U = 0$, not $Q = 0$.

---

## Scene 3 — Adiabatic and polytropic processes (Lesson 5.3)

**Narration:**

- **Beat a:** Pump a bicycle tyre hard and the pump gets hot. You squeezed the air too fast for heat to escape. That is adiabatic: Q is zero, so the work done on the gas becomes internal energy.
- **Beat b:** Set Q to zero, use p V equals n R T, and out comes: p V to the gamma is constant, and so is T V to the gamma minus one.
- **Beat c:** Through the same point, the adiabat is steeper than the isotherm by exactly gamma, because the expanding gas also cools. Double the volume of a diatomic gas from one hundred kilopascals: the isotherm ends at fifty, the adiabat at about thirty eight.
- **Beat d:** Compress a monatomic gas to one eighth of its volume: the temperature rises four times, the pressure thirty two times. A diesel engine squeezes air sixteen times, to about nine hundred kelvin, enough to ignite the fuel.
- **Beat e:** All of these belong to one family, p V to the n constant: n of zero, one, gamma and infinity. Between one and gamma, the heat capacity is negative: the gas absorbs heat, yet cools.

**Visuals:**

- **Beat a:** The cylinder again; the piston slams in (`rush_into`) and the gas fill turns from cream to warm red; "hot!" appears below. Right: $Q = 0$ (red), $\Delta U = -W > 0$, muted "adiabatic: no heat exchange".
- **Beat b:** Clear. $nC_V\,dT = -p\,dV$ and $pV = nRT$ side by side; `TransformFromCopy` into $\frac{dp}{p} = -\gamma\frac{dV}{V}$; boxed $pV^\gamma = \text{const},\ TV^{\gamma-1} = \text{const}$.
- **Beat c:** Clear. p–V axes; a teal isotherm $p = 1000/V$ and a purple adiabat $p = 100(10/V)^{1.4}$ through (10 L, 100 kPa), labelled. Right: isotherm slope $-p/V$, adiabat slope $-\gamma p/V$. A dashed vertical at 20 L marks the two end points; $V\to2V$: 50 kPa vs 37.9 kPa.
- **Beat d:** Clear. Header "Squeeze fast, get hot". $V\to\tfrac18V\ (\gamma = \tfrac53)$: $T_2 = T\cdot8^{2/3} = 4T$; $p_2 = p\cdot8^{5/3} = 32p$; green "diesel: $T_2 = 300\times16^{0.4}\approx909$ K".
- **Beat e:** Clear. p–V axes with four curves through one point: $n = 0$ (teal horizontal), $n = 1$ (amber hyperbola), $n = \gamma$ (purple, steeper), $n\to\infty$ (green vertical), each with its row on the right (isobaric, isothermal, adiabatic, isochoric) under $pV^n = \text{const}$. Then $C = C_V + \frac{R}{1-n}$ and red "negative for 1 < n < γ".

---

## Scene 4 — Cycles and the enclosed area (Lesson 5.4)

**Narration:**

- **Beat a:** An engine repeats a cycle, returning the gas to where it started. So delta U is zero, and the net heat in equals the net work out.
- **Beat b:** That net work is the area enclosed by the loop: work done going out at high pressure, minus work returned coming back at low pressure. Clockwise is an engine. Anticlockwise is a refrigerator.
- **Beat c:** This rectangle encloses four thousand joules. For a monatomic gas, two legs absorb eighteen thousand joules of heat, so the efficiency is about twenty two percent.
- **Beat d:** The gas comes home, but work is not a state function. The leftover area is the engine.

**Visuals:**

- **Beat a:** p–V axes (ticks 10, 30 L; 100, 300 kPa). The rectangle cycle with arrowheads, clockwise; a red dot traces the loop once. Right: $\Delta U_{\text{cycle}} = 0$, $Q_{\text{net}} = W_{\text{net}}$.
- **Beat b:** The area under the top edge shades amber, then the area under the bottom edge shades teal; both give way to the purple enclosed area. Right: $W_{\text{net}} = $ enclosed area; green "clockwise: engine"; teal "anticlockwise: refrigerator".
- **Beat c:** Right column replaced: $W_{\text{net}} = 200\times20 = 4000$ J. Leg heats appear on the loop: +3000 and +15 000 (red), −9000 and −5000 (teal). Then $Q_{\text{in}} = 18\,000$ J with the muted note "monatomic ideal gas" under it, and green $\eta = \frac{4000}{18\,000}\approx22\%$.
- **Beat d:** The enclosed area pulses gold; red caption "Work is not a state function: / the leftover area is the engine".

---

## Scene 5 — Heat engines and refrigerators (Lesson 5.5)

**Narration:**

- **Beat a:** A power station's cooling towers throw much of its heat away. They must: no engine in a cycle turns all its heat into work. It takes Q H from a hot reservoir, does work W, and rejects Q C to a cold one.
- **Beat b:** Efficiency, eta, is W over Q H, or one minus Q C over Q H. Absorb one thousand joules, reject six hundred, and the efficiency is forty percent.
- **Beat c:** A petrol engine runs the Otto cycle: two adiabats and two constant volume steps. Its efficiency, one minus r to the power one minus gamma, depends only on the compression ratio r. For r of eight, with air, about fifty six percent.
- **Beat d:** Run it backwards and you have a refrigerator. Its coefficient of performance is Q C over W: remove three hundred joules with one hundred joules of work, and it is three.

**Visuals:**

- **Beat a:** Reservoir diagram on the left: red "Hot reservoir $T_H$" box, cream "engine" circle, teal "Cold reservoir $T_C$" box. Arrows $Q_H$ (down, red), $W$ (right, amber), $Q_C$ (down, teal). Right: $W = Q_H - Q_C$.
- **Beat b:** $\eta = \frac{W}{Q_H} = 1 - \frac{Q_C}{Q_H}$. The arrow labels transform to 1000 J, 400 J, 600 J; green $\eta = \frac{400}{1000} = 40\%$.
- **Beat c:** Clear. Schematic Otto loop on p–V axes (drawn with $r = 4$ for legibility): corners 1–4, purple adiabats, a red constant-volume leg ("spark"), a teal constant-volume leg, "power stroke" label, $r = V_1/V_2$; a dot traces the loop. Right: "Otto cycle (petrol engine)", $\eta = 1 - r^{1-\gamma}$, green $r = 8,\ \gamma = 1.4:\ \eta\approx0.56$, muted "set by the compression ratio only".
- **Beat d:** Clear. The reservoir diagram reversed: "Warm room $T_H$" above, "Cold interior $T_C$" below, a "fridge" circle; $W = 100$ J enters from the right, $Q_C = 300$ J rises from the cold box, $Q_H = 400$ J rises into the warm box. Right: $\text{COP} = \frac{Q_C}{W}$, green $= \frac{300}{100} = 3$.

---

## Scene 6 — The second law and the Carnot engine (Lesson 5.6)

**Narration:**

- **Beat a:** The first law would allow a ship to run on heat from the ocean. The second law forbids it. Kelvin and Planck: no engine turns heat entirely into work. Clausius: heat never flows from cold to hot on its own. Break one, and you break the other.
- **Beat b:** The best possible engine is reversible: Carnot's cycle, two isotherms at T H and T C, joined by two adiabats.
- **Beat c:** Its heats obey Q C over Q H equals T C over T H, whatever the gas or the volumes. So no engine can beat one minus T C over T H. Between five hundred and three hundred kelvin, that is forty percent.
- **Beat d:** Use it as a lie detector. A claimed forty five percent between four hundred and three hundred kelvin is impossible: Carnot allows twenty five. And lowering T C by fifty kelvin beats raising T H by fifty.

**Visuals:**

- **Beat a:** Header "The second law". Left: a hot box feeding an engine whose only output is $W = Q_H$, crossed out in red, captioned "Kelvin–Planck: no engine turns / heat entirely into work". Right: a teal arrow $Q$ from a cold box up to a hot box, crossed out, captioned "Clausius: heat never flows from / cold to hot on its own". Muted footer "break either one and you break the other".
- **Beat b:** Clear. A Carnot cycle on p–V axes (1 mol monatomic, $T_H = 500$ K, $T_C = 300$ K): red hot isotherm A→B, purple adiabat B→C, teal cold isotherm C→D, purple adiabat D→A, drawn leg by leg as a dot travels round; arrowheads and $T_H$, $T_C$ labels. Right: "The Carnot cycle" and one row per leg.
- **Beat c:** The rows fade. $\frac{Q_C}{Q_H} = \frac{T_C}{T_H}$; muted "any gas, any volumes"; boxed $\eta_{\max} = 1 - \frac{T_C}{T_H}$; green "500 K, 300 K: $\eta_{\max} = 40\%$".
- **Beat d:** Clear. "A lie detector": claim 1000 J in, 550 J out, 450 J of work; $\eta_{\text{claim}} = 45\%$ with a red cross and "impossible" against green $\eta_{\max} = 1 - \tfrac{300}{400} = 25\%$. Below a divider: $T_H + 50$: ≈ 33.3% versus green $T_C - 50$: 37.5% with a check.

---

## Scene 7 — Recap and the end of the course (Lesson 5.7)

**Narration:**

- **Beat a:** To recap. Work is the area under the p V path. Delta U equals Q minus W, and only U is a state function.
- **Beat b:** Fix V, p or T for the three simple processes. Adiabats obey p V to the gamma. A cycle's net work is its area, and the second law caps every engine at one minus T C over T H.
- **Beat c:** That closes the course. A restoring force made springs and pendulums swing. Passed along, it became waves and sound. Many particles gave solids and fluids, molecules in motion gave temperature, and their energy bookkeeping gives engines. Try the mastery quiz.

**Visuals:** Title "Chapter 5 in six lines". Six numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $W = \int p\,dV$: area under the p–V path
2. $\Delta U = Q - W$: U is a state function; Q and W are not
3. $W = 0,\ Q = nC_p\Delta T,\ Q = W = nRT\ln\tfrac{V_2}{V_1}$: isochoric, isobaric, isothermal
4. $pV^\gamma = \text{const}$: adiabat: Q = 0, steeper by γ
5. $W_{\text{net}} = $ enclosed area: clockwise loop = engine
6. $\eta \le 1 - \frac{T_C}{T_H}$: the Carnot ceiling

For beat c the rows fade and a chain of five cards builds left to right with arrows: "oscillations" → "waves and sound" → "solids and fluids" → "heat and molecules" → "engines". Last, "End of course · Oscillations, Waves & Thermal Physics" appears at the bottom.
