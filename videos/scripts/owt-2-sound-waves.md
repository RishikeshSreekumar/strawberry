# Sound Waves — Explainer Script

- **Course:** Oscillations, Waves and Thermal Physics
- **Chapter:** Chapter 2 · Sound Waves (id: `owt-2-sound-waves`)
- **Target runtime:** about 6 minutes (roughly 990 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/owt-2-sound-waves.py`, class `OwtCh2Video`

**Learning goal.** The learner carries the string toolkit over to air. Sound is a longitudinal wave that can be described as a displacement wave or as a pressure wave, and $\Delta p = -B\,\partial s/\partial x$ puts the two a quarter cycle apart, so pressure nodes sit at displacement antinodes. They get the speed from stiffness over inertia, $v = \sqrt{B/\rho}$, and see why Laplace's adiabatic $B = \gamma p$ turns Newton's 280 m/s into 331 m/s. They know that $v = \sqrt{\gamma RT/M}$ grows as $\sqrt T$ and does not depend on pressure. They know that intensity goes as amplitude squared and falls as $1/r^2$, and that decibels are logarithmic (×10 adds 10 dB, ×2 adds 3 dB). They can read pipe harmonics from the end conditions (closed end = displacement node, open end = antinode, so a closed pipe has odd harmonics only) and use the resonance tube's $v = 2f(\ell_2 - \ell_1)$. They know that $f_{\text{beat}} = |f_1 - f_2|$ and can use wax or filing to decide which fork is higher. They can get the Doppler shift $f' = f\frac{v + v_o}{v - v_s}$ from squashed crests (source) and faster meeting (observer).

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: displacement $s$ and standing-wave envelopes = SECONDARY (teal); pressure $\Delta p$, sources and closed-end nodes = PRIMARY (red); highlights and the squashed wavelength = ACCENT (amber); the second tone and the stretched wavelength = PURPLE; open-end antinodes and correct results = GREEN; wrong = red cross. Air inside pipes is a pale blue-grey fill and water is a light blue. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Symbols are spoken as words ("delta p", "rho", "gamma", "lambda", "f prime", "v s", "v o", "I nought"). Numbers and units are spelled out ("three hundred forty metres per second", "hertz", "decibels", "kilohertz"). "dB" never appears in the narration.

---

## Title card

**Narration:** Chapter two. Sound waves.

**Visuals:** `title_card("Oscillations, Waves & Thermal Physics", "Chapter 2 · Sound Waves")`.

---

## Scene 1 — Sound is squeezed air (Lesson 2.1)

**Narration:**

- **Beat a:** Hold a candle in front of a loudspeaker playing a deep bass note, and the flame flickers in time with the music. The speaker cone pushes the air, then pulls back, and each layer of air pushes on the next.
- **Beat b:** Sound is a longitudinal wave: the layers swing back and forth along the direction of travel. Where they crowd together is a compression, with pressure above normal. Where they spread apart is a rarefaction.
- **Beat c:** Describe the wave by the displacement of each layer, s, or by the excess pressure, delta p. Air is squeezed where neighbours move differently, so delta p equals minus B times the slope of s: a quarter cycle away from the displacement wave.
- **Beat d:** So pressure nodes sit at displacement antinodes. And the numbers are tiny: a one kilohertz sound that moves the air a millionth of a metre changes the pressure by about two point six pascals.

**Visuals:**

- **Beat a:** Header "Sound is squeezed air". A loudspeaker (dark box and cone) sits on the left and a candle on the right. Between them, 26 vertical lines stand for layers of air. A `ValueTracker` time drives $s = s_0\sin(kx - \omega t)$, so the layers slide back and forth, the cone pumps and the flame sways sideways.
- **Beat b:** The header fades and the wave keeps running for two more cycles, then freezes. A red "compression" label with a down arrow points at a bunch of layers, and a teal "rarefaction" label points at a spread-out region.
- **Beat c:** Below the layers, on one baseline: the teal displacement curve $s$, then the red pressure curve $\Delta p$, which is shifted by a quarter cycle. $\Delta p = -B\,\frac{\partial s}{\partial x}$ is written between the layers and the graph. An amber dashed guide drops from the compression through the peak of $\Delta p$, where $s = 0$. The caption "pressure is a quarter cycle from displacement" sits at the bottom.
- **Beat d:** The formula and caption give way to "pressure node = displacement antinode". Then the graph clears, and in turn: the givens $f = 1$ kHz, $s_0 = 10^{-6}$ m, $B = 1.4\times10^5$ Pa; $\Delta p_0 = Bks_0 \approx 2.6$ Pa in green; "against about 100 000 Pa of atmosphere: a tiny ripple".

---

## Scene 2 — How fast sound travels (Lesson 2.2)

**Narration:**

- **Beat a:** Sound's speed depends on what it travels through: about three hundred forty metres per second in air, fifteen hundred in water, five thousand in steel.
- **Beat b:** The reason is the string's rule again: stiffness over inertia, under a square root. For sound, the stiffness is the bulk modulus B, and the inertia is the density, rho.
- **Beat c:** Newton assumed constant temperature, so B equals p, and got two hundred eighty metres per second. The measured value is three thirty one. Laplace's fix: the squeezes are too quick for heat to flow, so they are adiabatic, and B equals gamma p. Root one point four, times two eighty, is three thirty one.
- **Beat d:** For an ideal gas that becomes root gamma R T over M. Speed grows as the root of absolute temperature, so doubling it from zero Celsius needs four times the kelvin: ten ninety two kelvin, eight hundred nineteen Celsius. Raising the pressure alone changes nothing, because the density rises in step.

**Visuals:**

- **Beat a:** Header "The speed depends on the medium". Three horizontal bars grow to scale: air 340 m/s (teal), water 1500 m/s (purple), steel 5000 m/s (ink).
- **Beat b:** Clear. "string" $v = \sqrt{T/\mu}$ on the left, an arrow, then "sound" $v = \sqrt{B/\rho}$ in red on the right. Below: "B: bulk modulus, the stiffness" and "ρ: density, the inertia".
- **Beat c:** Clear. "measured in air at 0 °C: 331 m/s" at the top. A row "Newton: isothermal" with $B = p \Rightarrow v = \sqrt{p/\rho} \approx 280$ m/s and a red cross. A row "Laplace: adiabatic" with $B = \gamma p \Rightarrow v = 280\sqrt{1.4} \approx 331$ m/s in green, with a check.
- **Beat d:** Clear. The boxed $v = \sqrt{\gamma p/\rho} = \sqrt{\gamma RT/M}$, then $v \propto \sqrt T$: $2v \Rightarrow 4T = 4\times273 = 1092$ K $= 819$ °C in green, then the muted line "raise p at fixed T: ρ rises in step, so v is unchanged".

---

## Scene 3 — Intensity and decibels (Lesson 2.3)

**Narration:**

- **Beat a:** Intensity is the power a wave carries through each square metre. Each layer of air is a little SHM whose energy goes as amplitude squared, and that energy rides along at the wave speed. So intensity goes as amplitude squared, and as frequency squared.
- **Beat b:** A small source spreads its power over spheres of area four pi r squared. Double the distance, and the same power covers four times the area. The amplitude halves, and the intensity falls to a quarter.
- **Beat c:** The ear spans a factor of ten million in intensity, so loudness is measured in decibels: ten times the log of I over I nought. Multiply the intensity by ten, and you add ten decibels. Multiply by a hundred, and you add twenty.
- **Beat d:** So doubling the intensity adds only about three decibels. One machine gives seventy decibels. Two identical machines together give seventy three, not one hundred forty.

**Visuals:**

- **Beat a:** Header "Intensity: power per square metre". $I = \tfrac12\rho v\omega^2s_0^2 = \frac{\Delta p_0^2}{2\rho v}$, then $I \propto s_0^2 f^2$ in amber with the note "amplitude squared, frequency squared".
- **Beat b:** Clear. A red point source on the left and a dashed 56° cone. Arcs at $r$ and $2r$ are labelled. A short amber patch "A" on the inner arc grows to a purple patch "4A" covering twice the angle's width on the outer arc. On the right: $I = \frac{P}{4\pi r^2}$, then $r \to 2r$: $s_0 \to s_0/2$, $I \to I/4$ in red.
- **Beat c:** Clear. $\beta = 10\log_{10}\frac{I}{I_0}$ dB, with $I_0 = 10^{-12}$ W/m² (threshold of hearing) below. Ladder rows: $I\times10 \Rightarrow +10$ dB and $I\times100 \Rightarrow +20$ dB.
- **Beat d:** The amber row $I\times2 \Rightarrow +3$ dB is added. At the bottom: "70 dB & 70 dB → 73 dB" in green with a check, and "140 dB" in red with a cross.

---

## Scene 4 — Organ pipes and the resonance tube (Lesson 2.4)

**Narration:**

- **Beat a:** Trap sound in a tube, and reflections from the ends build standing waves, just as on a string. A closed end stops the air: a displacement node. An open end lets the air move freely: a displacement antinode.
- **Beat b:** A pipe closed at one end must fit a node and an antinode: a quarter wavelength, three quarters, five quarters. Only odd harmonics. A pipe open at both ends fits whole half wavelengths, and keeps them all.
- **Beat c:** An eighty five centimetre pipe, closed at one end: the fundamental is v over four L, three forty over three point four, one hundred hertz. Then three hundred and five hundred, never two hundred.
- **Beat d:** In the resonance tube, a five hundred twelve hertz fork resonates at sixteen and at fifty centimetres. Successive resonances are half a wavelength apart, so the end correction cancels: lambda is sixty eight centimetres, and v is about three hundred forty eight metres per second.

**Visuals:**

- **Beat a:** Header "Standing waves in an air column". A large pipe closed at its left end has a faint teal quarter-wave envelope, and a red displacement curve oscillates inside it. A red "N" appears under the closed end with "closed end: air cannot move / displacement node". A green "A" appears under the open end with "open end: air moves freely / displacement antinode".
- **Beat b:** Clear. Two columns, "closed at one end" (red) and "open at both ends" (green). Each has three small pipes with teal envelopes. Closed: $f_1, 3f_1, 5f_1$ (¼, ¾ and 5⁄4 wavelengths). Open: $f_1, 2f_1, 3f_1$. Under the columns: $f = \frac{(2n-1)v}{4L}$ "odd harmonics only" and $f = \frac{nv}{2L}$ "all harmonics".
- **Beat c:** Clear. "Closed pipe, L = 85 cm, v = 340 m/s"; then $f_1 = \frac{v}{4L} = \frac{340}{4\times0.85} = 100$ Hz; then $3f_1 = 300$ Hz, $5f_1 = 500$ Hz in green; then "200 Hz" in red with a cross.
- **Beat d:** Clear. "512 Hz fork". Two vertical tubes stand in water, with air columns of 16 cm and 50 cm (braced). Inside them are teal envelopes of a quarter and of three quarters of a wavelength, each with a node at the water surface. On the right, in turn: $\lambda = 2(\ell_2-\ell_1) = 68$ cm; $v = f\lambda = 512\times0.68 \approx 348$ m/s in green; $e = \frac{\ell_2 - 3\ell_1}{2} = 1$ cm, muted.

---

## Scene 5 — Beats (Lesson 2.5)

**Narration:**

- **Beat a:** Strike two tuning forks of two hundred fifty six and two hundred sixty hertz. You do not hear two notes. You hear one note whose loudness throbs: loud, soft, loud, four times a second.
- **Beat b:** Add the two tones, and the sum to product identity splits the result into a fast wave at the average frequency, times a slow envelope.
- **Beat c:** The envelope has half the difference as its frequency, but loudness peaks at both its plus one and its minus one. So the beat frequency is the full difference.
- **Beat d:** Which fork is higher? Wax lowers a fork, filing raises it. Fork A, at two fifty six, gives four beats with B. Wax B, and the beats rise to six. If B were two sixty, wax would bring it closer and the beats would fall. So B is two fifty two.

**Visuals:**

- **Beat a:** Caption "slowed down: 10 Hz and 12 Hz". Three traces over one second are drawn in turn: $f_1$ (teal), $f_2$ (purple) and their sum (ink). A dashed red envelope then wraps the sum, and it shows two loud bulges.
- **Beat b:** At the bottom: $y = \underbrace{2A\cos(\pi(f_1-f_2)t)}_{\text{slow envelope}}\,\underbrace{\sin(\pi(f_1+f_2)t)}_{\text{average pitch}}$.
- **Beat c:** Amber dots mark the two loud moments, one at the top and one at the bottom of the envelope each time. The formula is replaced by $f_{\text{beat}} = |f_1 - f_2|$ in red, with "256 & 260 Hz ⇒ 4 beats/s".
- **Beat d:** Clear. "Wax lowers a fork's frequency; filing raises it". $f_A = 256$ Hz, 4 beats $\Rightarrow f_B = 252$ or $260$ Hz. $260 \xrightarrow{\text{wax}}$ closer to 256 $\Rightarrow$ fewer beats, with a cross. $252 \xrightarrow{\text{wax}} 250 \Rightarrow 6$ beats, with a check. $f_B = 252$ Hz in green.

---

## Scene 6 — The Doppler effect (Lesson 2.6)

**Narration:**

- **Beat a:** An ambulance races past. As it approaches, the siren sounds high; the moment it passes, the pitch drops. The siren never changed. What changed is how often its crests reach your ear.
- **Beat b:** Each crest is a circle centred where the source was when it emitted it. The source chases its own crests, so ahead of it they are squashed to v minus v s, over f. Behind, they spread out.
- **Beat c:** A moving observer is different: the wavelength is unchanged, but they meet the crests faster, at v plus v o. Combine the two. F prime equals f, times v plus v o, over v minus v s, with each speed positive when it moves towards the other.
- **Beat d:** A five hundred hertz siren at twenty metres per second. Approaching: five hundred, times three forty over three twenty, about five hundred thirty one hertz. Receding: three forty over three sixty, about four hundred seventy two. A steady high note, then a sudden drop.

**Visuals:**

- **Beat a:** A red source block moves right along a faint line at half the wave speed. Every 0.5 s it emits a red circular crest, centred where it was at that moment, and the crest grows and fades. A green observer dot sits ahead and a purple one behind. Labels "ahead: higher pitch" and "behind: lower pitch" sit along the top edge.
- **Beat b:** Freeze. A thick amber segment marks the squashed spacing between two crests ahead, with $\lambda' = \frac{v - v_s}{f}$ below. A thick purple segment marks the stretched spacing behind, with $\lambda' = \frac{v + v_s}{f}$.
- **Beat c:** Clear. "moving observer: same wavelength, meets crests at $v + v_o$". The boxed $f' = f\,\frac{v + v_o}{v - v_s}$, then "speeds relative to the air; towards the other = positive" in red.
- **Beat d:** The box shrinks to the top. Then $\text{approaching: } 500\times\frac{340}{340-20} \approx 531$ Hz in green, $\text{receding: } 500\times\frac{340}{340+20} \approx 472$ Hz in purple, and "steady high, then a sudden drop as it passes".

---

## Scene 7 — Recap and next (Lesson 2.7)

**Narration:**

- **Beat a:** To recap. Sound is squeezed air, with pressure a quarter cycle from displacement. Its speed is stiffness over inertia, adiabatic in a gas, and grows as root T.
- **Beat b:** Decibels are logarithms of intensity. The ends of a pipe choose its wavelengths. Beats count the difference in frequency. And motion squashes or stretches the crests.
- **Beat c:** Try the mastery quiz. Then chapter three turns to matter in bulk: stretching solids, fluids that press and flow, and the skins on liquid surfaces.

**Visuals:** Title "Chapter 2 in six lines". Six numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $\Delta p = -B\,\frac{\partial s}{\partial x}$: pressure 90° from displacement
2. $v = \sqrt{\gamma RT/M}$: adiabatic; grows as √T, not with p
3. $\beta = 10\log_{10}(I/I_0)$: ×10 is +10 dB, ×2 is +3 dB
4. $\frac{(2n-1)v}{4L}$ vs $\frac{nv}{2L}$: closed end node, so odd harmonics only
5. $f_{\text{beat}} = |f_1 - f_2|$: wax lowers, filing raises
6. $f' = f\,\frac{v+v_o}{v-v_s}$: towards is positive, relative to air

Last, "Next: Chapter 3 · Properties of Matter" appears at the bottom.
