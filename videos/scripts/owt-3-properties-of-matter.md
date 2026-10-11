# Properties of Matter — Explainer Script

- **Course:** Oscillations, Waves and Thermal Physics
- **Chapter:** Chapter 3 · Properties of Matter (id: `owt-3-properties-of-matter`)
- **Target runtime:** about 5.5 minutes (roughly 950 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/owt-3-properties-of-matter.py`, class `OwtCh3Video`

**Learning goal.** The learner leaves point masses behind and rebuilds the chapter from force balance plus conservation of mass and energy. Stress is force per area and strain is a fraction; within the proportional limit they are proportional (Hooke's law), and the constant is a modulus. $\Delta L = FL/AY$ makes a wire a spring with $k = AY/L$, and a more stretchable material has a *smaller* modulus. The stored energy is the triangle $\tfrac12F\Delta L$. In fluids, $p = p_0 + \rho g h$ follows from a column's equilibrium, so vessel shape does not matter; Pascal's law gives the hydraulic lift (force multiplied, work not); Archimedes comes from the pressure difference between a block's top and bottom. Moving fluids conserve mass ($Av$ = const) and energy (Bernoulli), so faster flow means lower pressure, and Torricelli gives $v = \sqrt{2gx}$. Viscosity gives Stokes's drag $6\pi\eta rv$ and a terminal speed $\propto r^2$. Surface tension is energy per area; a curved surface carries excess pressure $2T/r$ ($4T/r$ for a soap bubble), and capillary rise is $h = 2T\cos\theta/(r\rho g)$.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: forces and loads = PRIMARY (red), fluids and buoyancy = SECONDARY (teal) with a pale-water fill `#CFE6EA`, energy / cross-sections / pressure highlights = ACCENT (amber), deformation ($\Delta L$, shear, bubbles) = PURPLE, results = GREEN, wrong = red cross. Solid blocks use the warm fill `#F3D9C9`. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`. Worked numbers come from the chapter's lessons (Lessons 3.1–3.7) with $g = 10$ m/s².

**TTS note:** Symbols are spoken as words ("sigma", "rho", "eta", "delta L", "p nought", "root two g x"). Units are spelled out ("megapascals", "newtons per metre", "square millimetres"). In the terminal-velocity formula, sigma is the fluid's density, and the narration says so; elsewhere sigma is stress. "MPa" appears only on screen.

---

## Title card

**Narration:** Chapter three. Properties of matter.

**Visuals:** `title_card("Oscillations, Waves & Thermal Physics", "Chapter 3 · Properties of Matter")`.

---

## Scene 1 — Stress, strain and the life of a wire (Lesson 3.1)

**Narration:**

- **Beat a:** A steel wire two millimetres thick can hold up an adult. A rubber band as thick tears under a book. To compare them, the size of the force is the wrong thing to look at.
- **Beat b:** What the material feels is force shared over area: stress, sigma equals F over A, in pascals. Deformation is a fraction too. Strain is the change in length over the length, so it has no unit.
- **Beat c:** Hang three hundred and fourteen newtons from a steel wire of radius one millimetre. The area is three point one four square millimetres, so the stress is one hundred megapascals. Double the radius and the stress falls to a quarter.
- **Beat d:** Plot stress against strain. At first it is a straight line: Hooke's law, the same restoring force idea behind simple harmonic motion. Then the wire passes its proportional and elastic limits, yields, reaches its ultimate stress, and breaks.
- **Beat e:** Elastic means it comes back, not that it stretches a lot.

**Visuals:**

- **Beat a:** A ceiling bar. Left: a thin steel wire holding a "75 kg" block (label "steel wire, 2 mm"). Right: an amber rubber band holding a "book"; the band snaps into two stubs and the book falls and tilts. A red cross appears over the rubber band's label and a green check beside the steel load.
- **Beat b:** Clear. A grey wire (tall rectangle) with an amber cross-section ellipse $A$ on top and a red load arrow $F$ below. On the right, $\sigma = \dfrac{F}{A}$ with "stress, in pascals (N/m²)". A brace $L$ appears beside the wire, a purple $\Delta L$ piece grows from its bottom while the arrow slides down, then $\text{strain} = \dfrac{\Delta L}{L}$ with "a fraction: no unit".
- **Beat c:** Clear. An amber circle "$r = 1$ mm". On the right, written in turn: $F = mg = 31.4\times10 = 314$ N; $A = \pi r^2 = 3.14\times10^{-6}$ m²; $\sigma = F/A = 10^8$ Pa $= 100$ MPa (red, also under the circle). A second circle twice as wide, "$r = 2$ mm", then $r\times2 \Rightarrow A\times4 \Rightarrow \sigma = 25$ MPa (green).
- **Beat d:** Clear. Axes "strain" vs "stress" on the left. A green straight segment from the origin to A labelled $\sigma\propto\varepsilon$; the curve continues through B, C (yield), up to D (ultimate) and down to E (fracture), with red lettered dots. A legend on the right: A proportional limit, B elastic limit, C yield point, D ultimate stress, E fracture.
- **Beat e:** The green Hooke segment pulses; under the legend: "elastic = comes back, / not stretches a lot".

---

## Scene 2 — Young's, bulk and shear moduli (Lesson 3.2)

**Narration:**

- **Beat a:** The slope of that line is Young's modulus, Y, stress over strain. Rearranged, the extension is delta L equals F L over A Y. The wire is a spring, with k equal to A Y over L.
- **Beat b:** One hundred newtons on a steel wire two metres long, one square millimetre across, with Y of two times ten to the eleven pascals, stretches it one millimetre. Copper has half the modulus, so it stretches two.
- **Beat c:** Squeezing from all sides uses the bulk modulus B. Sliding the top face uses the shear modulus G. And rubber, which stretches easily, has a tiny Young's modulus. More stretchable means a smaller modulus.
- **Beat d:** The stored energy is the triangle under the force extension line: one half F delta L. For our steel wire, zero point zero five joules.

**Visuals:**

- **Beat a:** $Y = \dfrac{F/A}{\Delta L/L}$ with "Young's modulus" at the top. `TransformFromCopy` gives the boxed $\Delta L = \dfrac{FL}{AY}$. Below, in purple: $k = \dfrac{AY}{L}$, "the wire is a spring".
- **Beat b:** Clear. A ceiling with a steel wire and a copper wire, each holding a "100 N" block, and a dashed reference line at the blocks' tops; "(stretches exaggerated)". On the right: $\Delta L = \dfrac{100\times2}{10^{-6}\times2\times10^{11}}$, then $= 10^{-3}$ m $= 1$ mm as the steel block drops a little ("1 mm"), then $Y_{\text{Cu}} = \tfrac12 Y_{\text{steel}} \Rightarrow \Delta L = 2$ mm (amber) as the copper block drops twice as far ("2 mm").
- **Beat c:** Clear. Three panels: a block pulled from top and bottom ("stretch", $Y = \frac{F/A}{\Delta L/L}$); a square squeezed by four teal arrows ("squeeze", $B = -\frac{\Delta p}{\Delta V/V}$); a sheared parallelogram over its dashed original square with a top arrow and angle $\theta$ ("shear", $G = \frac{F/A}{\theta}$). Then $Y_{\text{rubber}}\sim10^6\text{ Pa} \ll Y_{\text{steel}} = 2\times10^{11}\text{ Pa}$ and, in red, "stretches more → smaller Y".
- **Beat d:** Clear. Axes $F$ against $\Delta L$ with a red straight line and the amber triangle under it. On the right: $U = \tfrac12F\,\Delta L$, then $= \tfrac12\times100\times10^{-3} = 0.05$ J (green).

---

## Scene 3 — Pressure, Pascal and Archimedes (Lesson 3.3)

**Narration:**

- **Beat a:** Now fluids. Take a column of fluid, depth h. The push up on its base balances the air pressure on top plus the column's weight. The area cancels: p equals p nought plus rho g h. Every ten metres of water adds an atmosphere.
- **Beat b:** So the vessel's shape does not matter. At the same depth, the pressure is the same.
- **Beat c:** Pascal's law: a pressure change in an enclosed fluid is passed on undiminished. On a piston fifty times larger, three hundred newtons lifts a fifteen hundred kilogram car. But the small piston moves fifty centimetres to lift it one, so the work is the same.
- **Beat d:** A submerged block's bottom is deeper than its top, so it is pushed up harder than down. That is the buoyant force: the weight of fluid displaced. Ice, at nine hundred kilograms per cubic metre, floats nine tenths submerged.

**Visuals:**

- **Beat a:** A tank of water on the left. A dashed red column of depth $h$ (brace) inside it. Arrows: teal $pA$ up on its base, red $p_0A$ down on its top, red $\rho Ahg$ (weight) down through its middle. On the right: $pA = p_0A + \rho Ahg$, then the boxed $p = p_0 + \rho g h$, then "every 10 m of water adds 1 atmosphere".
- **Beat b:** Clear. Three water-filled vessels with the same base and height: widening, straight, narrowing. A dashed teal level line and a double arrow $h$. Under each base, $p_0 + \rho g h$ in red. Caption: "same depth, same pressure: the shape does not matter".
- **Beat c:** Clear. A hydraulic lift: a narrow water column (piston $a$) joined by a channel to a wide one (piston "$A = 50a$") carrying a car labelled "1500 kg car: 15000 N". A red arrow $f$ pushes the small piston. On the right: $\dfrac fa = \dfrac FA$; $f = \dfrac{15000}{50} = 300$ N; $300\times0.5 = 15000\times0.01$; $= 150$ J (green); "force multiplied, work not".
- **Beat d:** Clear. A block held under water: a short red arrow $p_{\text{top}}A$ on its top, a longer teal arrow $p_{\text{bottom}}A$ on its bottom, and two grey side arrows that cancel. On the right: $F_B = \rho_{\text{fluid}}V_{\text{sub}}g$, "= weight of fluid displaced". Below, an iceberg with a tenth above the waterline ("nine tenths hidden") and $\dfrac{V_{\text{sub}}}{V} = \dfrac{\rho_{\text{ice}}}{\rho_{\text{water}}} = \dfrac{900}{1000} = 0.9$.

---

## Scene 4 — Continuity and Bernoulli (Lesson 3.4)

**Narration:**

- **Beat a:** In steady flow, mass is conserved, so area times speed stays constant. Narrow a hose from two square centimetres to half of one, and two metres per second becomes eight.
- **Beat b:** Energy is conserved too. Along a streamline, p plus one half rho v squared plus rho g h is constant. Each term is energy per unit volume.
- **Beat c:** So at the same height, faster flow means lower pressure. Where the pipe narrows, the gauge column drops. That is how wings lift, and how storms lift roofs.
- **Beat d:** Water leaving a hole at depth x has Torricelli's speed, root two g x. Five metres down, that is ten metres per second. In a tank five metres tall, the jet from half depth lands farthest, and holes at one and four metres land together.

**Visuals:**

- **Beat a:** A pipe across the lower half, wide on the left ($A_1$) and narrow on the right ($A_2$), with three grey streamlines that squeeze together. A short red arrow $v_1$ in the wide part and a long one $v_2$ in the narrow part. At the top: $A_1v_1 = A_2v_2$, then (green) $2\text{ cm}^2\times2\text{ m/s} = 0.5\text{ cm}^2\times v_2 \Rightarrow v_2 = 8$ m/s.
- **Beat b:** The continuity lines fade. Boxed $p + \tfrac12\rho v^2 + \rho g h = \text{const}$, with "pressure", "kinetic", "potential" under the three terms and "energy per unit volume" in amber.
- **Beat c:** The term labels fade. Two vertical gauge tubes rise from the pipe: over the wide part the water column stands high ("high p"), over the narrow part it is low ("low p"). "faster flow, lower pressure" appears in red and the $v_2$ arrow pulses.
- **Beat d:** Clear. A tank 5 m tall standing on the ground. The jet from the half-depth hole (2.5 m, red) is drawn first; on the right $v = \sqrt{2gx}$, then (green) $x = 5\text{ m}: v = \sqrt{2\cdot10\cdot5} = 10$ m/s, then $R = 2\sqrt{x(H-x)}$ and "farthest from half depth". Jets from the 1 m (teal) and 4 m (purple) holes follow and land at the same dashed mark: "1 m and 4 m land together".

---

## Scene 5 — Viscosity and terminal velocity (Lesson 3.5)

**Narration:**

- **Beat a:** Real fluids have friction, called viscosity. Like a deck of cards, each layer drags the next: F equals eta A d v by d y. Honey has a large eta, water a small one.
- **Beat b:** A small sphere feels Stokes's drag, six pi eta r v. As it falls the drag grows until it balances weight minus buoyancy. Then it falls at terminal velocity: two r squared, times rho minus sigma, times g, over nine eta, where sigma is the fluid's density.
- **Beat c:** A raindrop of radius zero point one millimetre settles at about one point two metres per second. Without drag, from a two kilometre cloud, it would arrive at two hundred.
- **Beat d:** Terminal speed goes as r squared. Eight droplets merge into one of twice the radius, which falls four times as fast. And an air bubble, lighter than water, rises.

**Visuals:**

- **Beat a:** A sheared deck of six cards on a floor, each shifted a little further right, with red velocity arrows growing with height ("$v = 0$" at the bottom card, a $y$ arrow at the side). On the right: $F = \eta A\,\dfrac{dv}{dy}$, "$\eta$: viscosity, in Pa·s", and "honey: large η     water: small η".
- **Beat b:** Clear. A sphere in a tall fluid column with a red weight arrow $W$, a teal buoyancy arrow $F_B$, and an amber drag arrow $6\pi\eta rv$ that grows (a `ValueTracker`) until the upward arrows balance the weight. On the right: $F_{\text{drag}} = 6\pi\eta rv$; $6\pi\eta rv_t = \tfrac43\pi r^3(\rho-\sigma)g$; the boxed $v_t = \dfrac{2r^2(\rho-\sigma)g}{9\eta}$; "$\sigma$ = density of the fluid".
- **Beat c:** Clear. Axes $v$ against $t$, a dashed amber line $v_t$, and the red curve $4(1 - e^{-t/0.4})$ rising towards it. On the right: $r = 0.1\text{ mm}: v_t\approx1.2$ m/s (green) and "no drag, from 2 km: 200 m/s" (red).
- **Beat d:** Clear. Eight small droplets ($r$) merge (`TransformFromCopy`) into one drop ($2r$). On the right: $8\times\tfrac43\pi r^3 = \tfrac43\pi R^3 \Rightarrow R = 2r$ and $v_t\propto r^2: 1.5 \to 6$ cm/s (green). Below, an air bubble in a patch of water floats upward: "air bubble: $\rho<\sigma \Rightarrow$ it rises".

---

## Scene 6 — Surface tension and capillarity (Lessons 3.6 and 3.7)

**Narration:**

- **Beat a:** A molecule inside a liquid is pulled equally every way. One at the surface is pulled inward, so new surface costs energy. Surface tension T is that energy per area, or force per length: for water, zero point zero seven two newtons per metre.
- **Beat b:** Cut a drop in half. Excess pressure times pi r squared balances surface tension around the rim, two pi r times T. So the excess pressure is two T over r, and four T over r for a soap bubble, which has two surfaces.
- **Beat c:** Smaller radius, larger pressure: a small bubble empties into a big one.
- **Beat d:** In a thin glass tube, surface tension around the rim holds up a column: h equals two T cos theta over r rho g. In a tube of radius zero point two millimetres, water rises seven point two centimetres, and a narrower tube lifts it higher. Mercury, with a contact angle near one hundred and forty degrees, is pushed down.
- **Beat e:** And a short tube never overflows. The meniscus just flattens. A capillary is not a pump.

**Visuals:**

- **Beat a:** A block of liquid. An interior molecule with six equal teal arrows ("inside: balanced"); a surface molecule with arrows only sideways and downward and a thick red net arrow pointing in ("surface: pulled inward"). On the right: $T = \dfrac FL = \dfrac{\text{energy}}{\text{area}}$, $\text{N/m} = \text{J/m}^2$, $T_{\text{water}}\approx0.072$ N/m.
- **Beat b:** Clear. A half drop (dome) of radius $r$. Amber arrows $\Delta p$ push up on the flat face; red arrows $T$ pull down at both ends of the rim. On the right: $\Delta p\cdot\pi r^2 = T\cdot2\pi r$, the boxed $\Delta p = \dfrac{2T}r$, and (purple) "soap bubble: $\Delta p = \dfrac{4T}{r}$", "two surfaces".
- **Beat c:** Clear. A small and a large purple bubble joined by a tube, "small $r$: high $\Delta p$" and "large $r$: low $\Delta p$", a red flow arrow from small to large. The small bubble shrinks while the large one grows: "the small bubble empties into the big one".
- **Beat d:** Clear. A water bath with a dashed outside level. A wide tube fills to a modest height with a concave meniscus; the boxed $h = \dfrac{2T\cos\theta}{r\rho g}$ and (green) $r = 0.2\text{ mm}: h = 7.2$ cm appear. A narrower tube rises about twice as high, with $h\propto\dfrac1r$. A mercury dish follows: its tube's column sits below the outside level with a convex meniscus, "$\theta\approx140^\circ$: $\cos\theta<0$, pushed down".
- **Beat e:** Clear. A short tube with water reaching its rim and a flatter meniscus, a dashed line above it ("would rise to 7.2 cm"), a spray of droplets with a red cross. On the right: $hR = \dfrac{2T}{\rho g}$ fixed, "the meniscus just flattens", and in bold red "a capillary is not a pump".

---

## Scene 7 — Recap and next (Lesson 3.8)

**Narration:**

- **Beat a:** To recap. Stress over strain gives a modulus. Fluids at rest obey p equals p nought plus rho g h, with Pascal and Archimedes.
- **Beat b:** Flowing fluids obey continuity and Bernoulli. Viscosity gives terminal speeds growing as r squared. And surfaces cost energy, giving excess pressure and capillary rise.
- **Beat c:** Try the mastery quiz. Then chapter four turns to heat, and to what the molecules of a gas are doing.

**Visuals:** Title "Chapter 3 in six lines". Six numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $\sigma = \frac FA$, $\Delta L = \frac{FL}{AY}$: stress, strain, moduli
2. $p = p_0 + \rho g h$, $F_B = \rho_f V_{\text{sub}} g$: Pascal and Archimedes
3. $Av = \text{const}$, $p + \tfrac12\rho v^2 + \rho g h = \text{const}$: continuity, Bernoulli
4. $v_t = \frac{2r^2(\rho-\sigma)g}{9\eta}$: terminal speed grows as r²
5. $\Delta p = \frac{2T}{r}$ ($\frac{4T}{r}$ for a soap bubble): surface tension
6. $h = \frac{2T\cos\theta}{r\rho g}$: capillary rise

Last, "Next: Chapter 4 · Heat and Kinetic Theory" appears at the bottom.
