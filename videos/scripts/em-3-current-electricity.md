# Current Electricity — Explainer Script

- **Course:** Electricity and Magnetism
- **Chapter:** Chapter 3 · Current Electricity (id: `em-3-current-electricity`)
- **Target runtime:** about 6 minutes (roughly 1,000 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/em-3-current-electricity.py`, class `EmCh3Video`

**Learning goal.** The learner resolves the hook (electrons drift at about 0.1 mm/s, yet the bulb lights at once because the field arrives almost at light speed) with $v_d = eE\tau/m$ and $I = neAv_d$. They get Ohm's law and $R = \rho l/A$ from the drift, know that stretching a wire to $2l$ makes $4R$, and that metals follow $R = R_0(1 + \alpha\Delta T)$. They combine resistors (2, 3, 6 Ω give 11 Ω and 1 Ω) and use self-similarity on the infinite ladder (golden ratio). They read a cell as $\mathcal E$ plus $r$ ($V = \mathcal E - Ir$; maximum load power at $R = r$, 12.5 W for 10 V and 2 Ω). They state Kirchhoff's laws as conservation of charge and single-valued potential and solve the lesson's two-cell network by node potentials ($V_A = 5.6$ V; 2.2 A = 1.4 A + 0.8 A). They know the balanced bridge ($P/Q = R/S$), the meter bridge ($X = Rl/(100 - l)$), the potentiometer ($\mathcal E_1/\mathcal E_2 = l_1/l_2$, no current drawn), and $P = VI = I^2R = V^2/R$ with the series-bulb paradox.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: electrons and negative = SECONDARY (teal), field = ACCENT (amber), currents in red or teal arrows, circuit wires = INK with standard symbols (zigzag resistor, long/short cell plates, circled G for a galvanometer), highlights = gold, correct = GREEN, wrong = red. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** "EMF" is written "E M F" so Samantha spells it. Symbols spoken as words ("v d", "n e A v d", "rho l over A", "R nought", "alpha delta T").

---

## Title card

**Narration:** Chapter three. Current electricity.

**Visuals:** `title_card("Electricity & Magnetism", "Chapter 3 · Current Electricity")`.

---

## Scene 1 — Current and drift (Lesson 3.1)

**Narration:**

- **Beat a:** Flip a switch and the bulb lights at once. Yet the electrons in the wire crawl along at about a tenth of a millimetre per second. How can both be true?
- **Beat b:** Inside a metal, free electrons dash about at random, bumping into the ions. Switch on a field, and they pick up a small, steady drift against it: v d equals e E tau over m, where tau is the time between collisions.
- **Beat c:** The current is the charge passing each second: I equals n e A v d. For one point five amperes in a one square millimetre copper wire, the drift is about a tenth of a millimetre per second. The bulb lights at once because the field spreads through the wire at nearly the speed of light, and pushes every electron together.

**Visuals:**

- **Beat a:** A long wire drawn as a tube with a lattice of grey ion plus signs. Eighteen teal electrons jiggle at random (a phase `ValueTracker` drives them). Red header: "The bulb lights at once. The electrons barely move."
- **Beat b:** The jiggling continues; an amber $\vec E$ arrow appears above the wire pointing right, and the electrons acquire a slow leftward drift while still jiggling. A teal $v_d$ arrow points left under the wire; $v_d = \frac{eE\tau}{m}$ at the bottom right.
- **Beat c:** Clear. $I = neAv_d$ in red; $v_d = \frac{1.5}{(8.5\times10^{28})(1.6\times10^{-19})(10^{-6})} \approx 1.1\times10^{-4}$ m/s; then in green "drift: slow. field (the signal): nearly the speed of light."

---

## Scene 2 — Ohm's law and resistivity (Lesson 3.2)

**Narration:**

- **Beat a:** The drift is proportional to the field, so the current is proportional to the voltage. That is Ohm's law, V equals I R, with R equal to rho l over A. The resistivity, rho, depends on the material and on its temperature.
- **Beat b:** Stretch a wire to twice its length. Its volume is fixed, so its cross section halves. Twice the length, over half the area: the resistance goes up four times, not two.
- **Beat c:** Metals also resist more when hot: R equals R nought, times one plus alpha delta T.

**Visuals:**

- **Beat a:** A copper-coloured wire segment with a brace $l$ and end label $A$. On the right: $V = IR$ (red), $R = \frac{\rho l}{A}$, "ρ: material and temperature".
- **Beat b:** A copy stretches into a wire twice as long and half as thick, with brace $2l$ and end label $\frac{A}{2}$. $R' = \frac{\rho(2l)}{A/2} = 4R$ in green.
- **Beat c:** $R = R_0(1 + \alpha\Delta T)$ in teal.

---

## Scene 3 — Series, parallel and symmetry (Lesson 3.3)

**Narration:**

- **Beat a:** Resistors in series carry the same current, so their resistances add. In parallel they share the same voltage, so their reciprocals add. Two, three and six ohms give eleven ohms in series, and one ohm in parallel.
- **Beat b:** Symmetry tames harder networks. Take an infinite ladder of equal resistors. Chop off the first rung, and what remains is the same infinite ladder. So x equals R plus R x over R plus x, and x is the golden ratio times R.

**Visuals:**

- **Beat a:** Left: "Series: same current", three zigzags 2 Ω, 3 Ω, 6 Ω in a row, and $R_s = 2 + 3 + 6 = 11\ \Omega$. Right: "Parallel: same voltage", the same three as rungs, $\frac1{R_p} = \frac12 + \frac13 + \frac16 = 1$ and $R_p = 1\ \Omega$ in green.
- **Beat b:** Clear. A ladder of series and shunt zigzags trailing off in $\cdots$, input terminals labelled $x$. A dashed teal box around everything after the first rung (starting just after the first shunt resistor), labelled $x$. On the right: $x = R + \frac{Rx}{R + x}$, then $x = \frac{1+\sqrt5}{2}R \approx 1.62R$ in green.

---

## Scene 4 — Cells, EMF and internal resistance (Lesson 3.4)

**Narration:**

- **Beat a:** A real cell has an internal resistance, r. When it drives a current, part of its E M F is lost inside, so the voltage at its terminals is E minus I r. A voltmeter across a working cell reads less than its E M F.
- **Beat b:** The power delivered to the load peaks when R equals r. For a ten volt cell with two ohms inside, the load gets at most twelve point five watts, at two ohms.

**Visuals:**

- **Beat a:** A dashed box (the real cell) holding an ideal cell $\mathcal E$ and a zigzag $r$, with two terminal dots and an external load $R$. On the right: $V = \mathcal E - Ir$ (red) and "a working cell reads less than its EMF".
- **Beat b:** $P = \frac{\mathcal E^2R}{(R + r)^2}$ bottom left. Axes $P$ against $R$ with the curve $100R/(R + 2)^2$; a gold dot at the peak, "$R = r$: 12.5 W".

---

## Scene 5 — Kirchhoff's laws (Lesson 3.5)

**Narration:**

- **Beat a:** Any DC network yields to two laws. At a junction, the current in equals the current out, because charge is conserved. Round any closed loop, the changes in potential add to zero, because potential is like height. Walk round a loop and you are back where you started.
- **Beat b:** The fastest method is node potentials. Here, three branches join A to B: a ten volt cell with two ohms, a four ohm resistor, and a four volt cell with two ohms. Call the potential of B zero, and the potential of A, V. The currents leaving A must add up to zero, and that gives V equal to five point six volts.
- **Beat c:** So two point two amperes flow up through the ten volt cell, one point four down through the four ohm resistor, and point eight down through the four volt cell, charging it. Nothing is used up: two point two in equals one point four plus point eight out.

**Visuals:**

- **Beat a:** Left: a junction with 3 A in (red) and 1 A and 2 A out (teal); $\sum I_{\text{in}} = \sum I_{\text{out}}$, "charge is conserved". Right: a closed loop with a gold circulating arrow and labels $+\mathcal E$ (green), $-IR_1$, $-IR_2$ (red); $\sum\Delta V = 0$, "potential is a height: back to the start".
- **Beat b:** Clear. The lesson's network: three vertical branches between a top node $A$ and a bottom node $B$ (left: 2 Ω above a 10 V cell, + towards A; middle: 4 Ω; right: 2 Ω above a 4 V cell, + towards A). Labels "$A$: V" and "$B$: 0". On the right: $\frac{V - 10}{2} + \frac{V}{4} + \frac{V - 4}{2} = 0$, then $V = 5.6$ V in green.
- **Beat c:** Current arrows beside each branch: 2.2 A up the left (red), 1.4 A down the middle and 0.8 A down the right (teal, labels above the arrows). $2.2 = 1.4 + 0.8$ in green.

---

## Scene 6 — Bridges and the potentiometer (Lessons 3.6–3.7)

**Narration:**

- **Beat a:** A Wheatstone bridge balances when P over Q equals R over S. Then both ends of the galvanometer sit at the same potential, and no current flows through it.
- **Beat b:** The meter bridge is the same idea along a one metre wire. With the unknown in the left gap, ten ohms in the right gap, and the balance point forty centimetres from the left end, the unknown is ten times forty over sixty, about six point seven ohms.
- **Beat c:** A potentiometer measures an E M F while drawing no current at all, so the cell's internal resistance cannot spoil the reading. Two cells compare as their balance lengths: E one over E two equals l one over l two.

**Visuals:**

- **Beat a:** Left: a diamond bridge with zigzag arms $P$, $Q$ (top) and $R$, $S$ (bottom), a circled G across the middle and a cell below. On the right: $\frac PQ = \frac RS$ (red), "galvanometer reads zero".
- **Beat b:** A one metre wire under two gaps, "X" on the left and "R = 10 Ω" on the right, with a gold jockey at 40 cm ("40 cm" / "60 cm" either side) joined to the middle strip. $X = R\frac{l}{100 - l} = 10\times\frac{40}{60} \approx 6.7\ \Omega$.
- **Beat c:** $\frac{\mathcal E_1}{\mathcal E_2} = \frac{l_1}{l_2}$ in teal.

---

## Scene 7 — Electric power (Lesson 3.7)

**Narration:**

- **Beat a:** Electrical power is V I, which is I squared R, or V squared over R. Now connect a hundred watt bulb and a sixty watt bulb, both made for two hundred and twenty volts, in series across the mains. Which one glows brighter?
- **Beat b:** The sixty watt bulb. Its filament has the larger resistance, V squared over P, and in series the same current flows through both, so the bigger resistance takes more power. In parallel, it is the other way round.

**Visuals:**

- **Beat a:** $P = VI = I^2R = \frac{V^2}{R}$ in red at the top. Two bulbs, "100 W" and "60 W", in series with a 220 V AC mains source (circled sine symbol). A large red "?".
- **Beat b:** $R_{100} = \frac{220^2}{100} = 484\ \Omega$ and $R_{60} = \frac{220^2}{60} \approx 807\ \Omega$ at the bottom. The 60 W bulb fills bright gold with a large halo; the 100 W bulb glows faintly. "series: same I, bigger R glows brighter" in green.

---

## Scene 8 — Recap and next (Lesson 3.8)

**Narration:**

- **Beat a:** To recap. Current is a slow drift driven by a field that arrives almost at once. Ohm's law and resistivity follow from the drift, and stretching a wire hits it twice.
- **Beat b:** A cell loses I r inside itself. Kirchhoff's two laws solve any network. And bridges balance, while in series the bigger resistance takes more power.
- **Beat c:** Try the mastery quiz. So far, currents have changed potentials and energy. Chapter four finds that moving charges also make, and feel, a completely new field: the magnetic field.

**Visuals:** Title "Chapter 3 in five lines". Five numbered rows, each a formula on the left and a muted note on the right:

1. $I = neAv_d$: slow drift, fast signal
2. $V = IR$, $R = \frac{\rho l}{A}$: stretch to 2l: R becomes 4R
3. $V = \mathcal E - Ir$: most power to the load when R = r
4. $\sum I = 0$, $\sum\Delta V = 0$: charge conserved; V is a height
5. $\frac PQ = \frac RS$, $P = I^2R$: balance; series: bigger R, more P

Last, "Next: Chapter 4 · Magnetic Effects of Current" appears at the bottom.
