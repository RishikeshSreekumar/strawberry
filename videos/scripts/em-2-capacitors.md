# Capacitors — Explainer Script

- **Course:** Electricity and Magnetism
- **Chapter:** Chapter 2 · Capacitors (id: `em-2-capacitors`)
- **Target runtime:** about 5.5 minutes (roughly 900 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/em-2-capacitors.py`, class `EmCh2Video`

**Learning goal.** The learner derives $C = \varepsilon_0A/d$ from the sheet fields of Chapter 1 ($E = \sigma/\varepsilon_0$ in the gap, zero outside, $V = Ed$), and knows capacitance depends only on geometry and material (and that a farad is huge). They combine capacitors from first principles (parallel: same $V$, $C$ adds; series: same $Q$, reciprocals add, $V_i \propto 1/C_i$; 2, 3, 6 μF give 1 μF and 11 μF). They explain a dielectric as bound charge that weakens the field ($E_0/K$, $C \to KC$), use the partial-slab formula, and always ask whether $V$ (battery on) or $Q$ (battery off) is fixed. They get $U = \tfrac12QV$ from the area under $V$–$q$, know that charging wastes half the battery's $QV$ as heat, and that energy lives in the field, $u = \tfrac12\varepsilon_0E^2$. They handle charge sharing (common $V$, energy lost) and RC charging ($\tau = RC$; wire at $t = 0$, break at steady state; 63% after one $\tau$; $t_{90} = \tau\ln10$).

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: positive plate and charge = PRIMARY (red), negative plate and charge = SECONDARY (teal), field arrows = ACCENT (amber), dielectric slab = PURPLE, circuit wires = INK with standard symbols (two plates for a capacitor, long/short plates for a cell, zigzag resistor), highlights = gold, correct = GREEN, warnings = red. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Symbols spoken as words ("epsilon nought A over d", "one half C V squared", "e to the minus t over R C", "tau"). Units in full ("microfarads", "millijoules", "milliseconds").

---

## Title card

**Narration:** Chapter two. Capacitors.

**Visuals:** `title_card("Electricity & Magnetism", "Chapter 2 · Capacitors")`.

---

## Scene 1 — Capacitance (Lesson 2.1)

**Narration:**

- **Beat a:** A capacitor is two conductors carrying plus Q and minus Q. Take two parallel plates. Between them, the fields of the two charged sheets add. Outside, they cancel. So there is a uniform field, sigma over epsilon nought, and all of it is in the gap.
- **Beat b:** The potential difference is that field times the gap, d. Divide the charge by it, and Q cancels. C equals Q over V, which is epsilon nought A over d. Capacitance depends only on the shape, and on what fills the gap, never on how much charge you put on.
- **Beat c:** And a farad is enormous. For one farad with a one millimetre gap, each plate would need about a hundred million square metres: a square more than ten kilometres on a side.

**Visuals:**

- **Beat a:** A red plate ($+Q$, plus signs) and a teal plate ($-Q$, minus signs). Six amber arrows fill the gap; short dashed grey lines outside each plate with "$E = 0$". On the right: $E = \frac{\sigma}{\varepsilon_0} = \frac{Q}{\varepsilon_0A}$.
- **Beat b:** A brace $d$ under the gap. $V = Ed = \frac{Qd}{\varepsilon_0A}$, then the boxed $C = \frac{Q}{V} = \frac{\varepsilon_0A}{d}$ in red, and "geometry and material only" in green.
- **Beat c:** Clear. $A = \frac{Cd}{\varepsilon_0} = \frac{(1)(10^{-3})}{8.85\times10^{-12}}$, then $\approx 1.1\times10^8$ m² in red, and a gold square "about 10.6 km on a side".

---

## Scene 2 — Series and parallel (Lesson 2.2)

**Narration:**

- **Beat a:** Connect capacitors side by side, in parallel, and every one sits across the same voltage. Their charges add, so their capacitances add.
- **Beat b:** Connect them in a chain, in series, and they all carry the same charge, while their voltages add. So the reciprocals add. The smallest capacitor takes the largest share of the voltage.
- **Beat c:** Two, three and six microfarads give one microfarad in series, less than the smallest one, and eleven microfarads in parallel.

**Visuals:**

- **Beat a:** Left: "Parallel" circuit, a cell on the left rail and three capacitors $C_1, C_2, C_3$ as vertical rungs between top and bottom rails. Below: "same V" and $C = C_1 + C_2 + C_3$.
- **Beat b:** Right: "Series" circuit, three capacitors in a row along the top wire and a cell on the bottom wire. Below: "same Q" and $\frac1C = \frac1{C_1} + \frac1{C_2} + \frac1{C_3}$; in the middle of the loop, $V_i \propto \frac{1}{C_i}$ in purple.
- **Beat c:** Clear. "series: $\frac1C = \frac12 + \frac13 + \frac16 = 1 \Rightarrow C = 1\ \mu$F" with "less than the smallest" in green, then "parallel: $C = 2 + 3 + 6 = 11\ \mu$F".

---

## Scene 3 — Dielectrics (Lesson 2.3)

**Narration:**

- **Beat a:** Slide an insulator between the plates. Its molecules polarise, and their bound charges line the faces of the slab, opposite to the plates. That weakens the field inside by a factor K, the dielectric constant. Less field means less voltage for the same charge, so the capacitance rises K times.
- **Beat b:** A slab that fills only part of the gap, with thickness t, gives C equals epsilon nought A, over d minus t plus t over K. A slab of half the gap with K equal to four raises C by a factor of one point six.
- **Beat c:** Before you calculate anything, ask what is held fixed. With the battery still connected, V stays the same, so the charge and the energy grow K times. With the battery removed first, Q stays the same, so the voltage and the energy fall K times.

**Visuals:**

- **Beat a:** Charged plates with amber field arrows. A purple slab slides down and fills the gap while the original arrows dim; teal minus signs line its left face (next to the + plate) and red plus signs its right face; short amber arrows inside the slab show the weaker field. On the right: $E = \frac{E_0}{K}$, then $C = K\frac{\varepsilon_0A}{d} = KC_0$ in red.
- **Beat b:** The slab shrinks to half the gap (bound charges follow its faces, the full-strength field shows again on either side) with a purple brace $t = \tfrac d2$. $C = \frac{\varepsilon_0A}{d - t + t/K}$, then in green $t = \tfrac d2,\ K = 4:\ C = \frac{\varepsilon_0A}{5d/8} = 1.6\,C_0$.
- **Beat c:** Clear. Header "Ask what is fixed". A table with columns "battery on" (teal) and "battery off" (purple), rows: fixed (V / Q), $C$ ($\times K$ / $\times K$), $Q$ ($\times K$ / same), $V$ (same / $\div K$), $U$ ($\times K$ / $\div K$), revealed row by row. Bottom, in red: "a dielectric does not always raise the stored energy".

---

## Scene 4 — Energy stored (Lesson 2.4)

**Narration:**

- **Beat a:** Charging a capacitor means lifting each new bit of charge up to the voltage already there. On a graph of V against q, the work is the area of a triangle: one half Q V, which is one half C V squared, or Q squared over two C.
- **Beat b:** The battery, though, delivers all of its charge at the full voltage, so it does work Q V. Half is stored. The other half becomes heat in the wires, whatever the resistance.
- **Beat c:** Where is the energy kept? In the field itself: one half epsilon nought E squared, in every cubic metre of the gap.

**Visuals:**

- **Beat a:** Axes $V$ against $q$; a red line from the origin to $(Q, V)$ with a dashed line at $V$. A thin gold strip $dq$ under the line, then $U = \int_0^Q \frac{q}{C}\,dq$; the strip is replaced by the shaded red triangle and $U = \tfrac12QV = \tfrac12CV^2 = \frac{Q^2}{2C}$.
- **Beat b:** The upper triangle of the $Q\times V$ rectangle fills teal. Labels "stored: ½QV" (red, lower triangle) and "heat: ½QV" (teal, upper). On the right: $W_{\text{battery}} = QV$, and in green "10 μF at 100 V: 0.1 J in, 0.05 J stored".
- **Beat c:** $u = \tfrac12\varepsilon_0E^2$ in purple.

---

## Scene 5 — Charge sharing (Lesson 2.5)

**Narration:**

- **Beat a:** Join a charged capacitor to an empty one. Charge is conserved, and both end at one common voltage: the total charge over the total capacitance.
- **Beat b:** Two microfarads at a hundred volts, joined to an empty two microfarads, settle at fifty volts. The energy drops from ten millijoules to five. Half of it is lost, as heat and radiation, even though no battery is involved.

**Visuals:**

- **Beat a:** Two capacitors in a loop with an open switch on the top wire. $C_1 = 2\ \mu$F at 100 V (red) on the left, $C_2 = 2\ \mu$F at 0 V on the right. The switch closes. $V = \frac{C_1V_1 + C_2V_2}{C_1 + C_2}$ below.
- **Beat b:** Both voltage labels become 50 V (green). The formula shrinks to the top left; on the right $U_{\text{before}} = \tfrac12(2\times10^{-6})(100)^2 = 10$ mJ and $U_{\text{after}} = \tfrac12(4\times10^{-6})(50)^2 = 5$ mJ. Bottom, in red: $\Delta U = \frac{C_1C_2(V_1 - V_2)^2}{2(C_1 + C_2)} = 5$ mJ lost.

---

## Scene 6 — RC circuits (Lesson 2.6)

**Narration:**

- **Beat a:** Finally, charge it through a resistor. Kirchhoff's loop rule gives E minus i R, minus q over C, equals zero. At the first instant the empty capacitor acts like a plain wire, so the current is E over R. As charge builds up, the current dies away.
- **Beat b:** The charge climbs as C E, times one minus e to the minus t over R C. The time constant, tau, is R C. After one tau the capacitor holds sixty three percent of its final charge, not all of it. After about five tau it is essentially full, and then it acts like a break in the circuit.
- **Beat c:** For a hundred ohms and ten microfarads, tau is one millisecond. Reaching ninety percent takes tau times the natural log of ten, about two point three milliseconds.

**Visuals:**

- **Beat a:** Left: a cell $\mathcal E$, a zigzag resistor $R$ on the top wire, a capacitor $C$ on the right side. On the right: $\mathcal E - iR - \frac{q}{C} = 0$, then $t = 0:\ i_0 = \frac{\mathcal E}{R}$ with "empty capacitor = a plain wire".
- **Beat b:** $q = C\mathcal E(1 - e^{-t/RC}),\ \tau = RC$ at the top. Axes with ticks $\tau \ldots 5\tau$: the red charging curve $q/Q_0$ and a dashed teal decaying current $i/i_0$. Gold dashed guides mark 63% at $\tau$; "about 5τ: full, acts as a break" near the top right.
- **Beat c:** Clear. $\tau = RC = 100\times10\times10^{-6} = 1$ ms, then in green $1 - e^{-t/\tau} = 0.9 \Rightarrow t = \tau\ln10 \approx 2.3$ ms.

---

## Scene 7 — Recap and next (Lesson 2.7)

**Narration:**

- **Beat a:** To recap. Capacitance is charge per volt, and it depends only on geometry and on what fills the gap. In parallel, capacitances add. In series, their reciprocals add.
- **Beat b:** A dielectric multiplies C by K, but first ask whether V or Q is fixed. Charging wastes half the battery's work. And through a resistor, the charge rises with time constant R C.
- **Beat c:** Try the mastery quiz. The R C circuit let charge flow for a moment. Chapter three keeps it flowing: steady currents, Ohm's law, and Kirchhoff's two laws.

**Visuals:** Title "Chapter 2 in five lines". Five numbered rows, each a formula on the left and a muted note on the right:

1. $C = \frac{Q}{V} = \frac{\varepsilon_0A}{d}$: geometry and material only
2. $C_\parallel = \sum C_i$, $\frac1{C_s} = \sum\frac1{C_i}$: same V / same Q
3. $C \to KC$: first ask: is V or Q fixed?
4. $U = \tfrac12CV^2 = \frac{Q^2}{2C}$: half the battery's work is heat
5. $q = Q_0(1 - e^{-t/RC})$: 63% after one time constant

Last, "Next: Chapter 3 · Current Electricity" appears at the bottom.
