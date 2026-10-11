# Wave Optics — Explainer Script

- **Course:** Optics and Modern Physics
- **Chapter:** Chapter 2 · Wave Optics (id: `omp-2-wave-optics`)
- **Target runtime:** about 6 minutes (roughly 1,080 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/omp-2-wave-optics.py`, class `OmpCh2Video`

**Learning goal.** The learner sees rays as normals to wavefronts and uses Huygens' wavelets to derive Snell's law, $\frac{\sin i}{\sin r} = \frac{v_1}{v_2}$, with the frequency fixed and $\lambda \to \lambda/n$ in a medium. They add waves by superposition, get $I = I_1 + I_2 + 2\sqrt{I_1I_2}\cos\phi$ with $\phi = \frac{2\pi}{\lambda}\Delta x$, and know that fringes redistribute energy and need coherent sources. They derive Young's path difference $\frac{yd}{D}$ and fringe width $\beta = \frac{\lambda D}{d}$, and predict what a slab over one slit, immersion in water and a thin film do. They find single-slit minima at $a\sin\theta = m\lambda$ by pairing the slit's halves, know the central maximum is twice as wide, and use the Rayleigh limit $\frac{1.22\lambda}{D}$. They treat polarisation as proof that light is transverse: a polaroid halves unpolarised light, Malus gives $I_0\cos^2\theta$, and Brewster gives $\tan\theta_B = n$.

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: rays and wave 1 = PRIMARY (red), wavefronts and wave 2 = SECONDARY (teal), path difference = ACCENT (amber), resultant / slab / path inside a film = PURPLE, correct and key results = GREEN, glass and water = pale teal fill, thin film = pale amber fill. Fringe strips are drawn as many thin rectangles shaded from dark brown (dark fringe) to bright red (bright fringe), so the pattern on the screen and the intensity curve above it always agree. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Samantha may read a lone "a" as the article, so the scene inserts `[[char LTRL]]a[[char NORM]]` (spelled `{LA}` in the code) wherever the slit width $a$ is spoken ("a sine theta", "a over two", "lambda D over a"). Symbols are always spoken as words ("phi", "lambda", "mu", "beta", "I nought", "theta B"). Capital $D$ and small $d$ are both read "D"; the picture labels them. "1801" is written "eighteen oh one".

---

## Title card

**Narration:** Chapter two. Wave optics.

**Visuals:** `title_card("Optics and Modern Physics", "Chapter 2 · Wave Optics")`.

---

## Scene 1 — Wavefronts and Huygens' wavelets (Lesson 2.1)

**Narration:**

- **Beat a:** In chapter zero, rays and two laws did everything. But a ray is only a shorthand: the direction at right angles to the crests of a light wave. A surface of crests is a wavefront.
- **Beat b:** A point source sends out spherical wavefronts. Far from the source, a small patch looks flat: a plane wavefront, with parallel rays.
- **Beat c:** Huygens' rule moves a wavefront forward: every point on it is a source of small wavelets, spreading at the wave's speed. After a time t, each has radius v t, and the new wavefront is the envelope touching them all.

**Visuals:**

- **Beat a:** Header "A ray is a normal to the wavefronts". On the left, a point source with four teal circular arcs ("wavefronts (crests)") and three red rays fanning out of it ("rays"). A right-angle mark where the middle ray crosses an arc.
- **Beat b:** "spherical" under the left picture. A faint divider, then on the right five parallel teal lines with three parallel red rays crossing them: "plane (far from the source)".
- **Beat c:** Clear. Header "Huygens: every point is a source of wavelets". A red vertical wavefront ("old wavefront") with seven dots. Grey half-circle wavelets grow from every dot to radius 2.2; a radius arrow is labelled $vt$. The teal tangent line through their fronts appears: "new wavefront = envelope". On the right: "each wavelet: radius vt", "new wavefront touches them all", "rays stay perpendicular to it".

---

## Scene 2 — Snell's law from wavefronts (Lesson 2.1)

**Narration:**

- **Beat a:** Now send a plane wavefront at a boundary where the wave slows down. End A touches the surface first. While end B travels the distance v one t to reach C, the wavelet from A grows only v two t into the slower medium.
- **Beat b:** The new wavefront is the tangent from C to that wavelet. The two right triangles share the hypotenuse A C. So sine i over sine r equals v one over v two. That is Snell's law, derived from waves.
- **Beat c:** No crests are created or lost at the boundary, so the frequency stays fixed. Speed and wavelength both shrink by n. Six hundred nanometre light in glass of index one point five slows to two times ten to the eight metres per second, and its wavelength becomes four hundred nanometres. Same colour, because colour follows frequency.

**Visuals:**

- **Beat a:** A horizontal boundary, the lower medium shaded pale teal ("fast: $v_1$" above, "slow: $v_2$" below). A teal wavefront AB makes angle $i$ with the surface, with two red incident rays perpendicular to it. A `ValueTracker` moves a red dot from B to C along a dashed path while a grey wavelet grows from A into the lower medium, ending at radius $v_2t = v_1t/1.5$. Labels $v_1t$ and $v_2t$.
- **Beat b:** The teal tangent CD (the refracted wavefront) with a right-angle mark at D and the angle $r$ at C. On the right, in turn: $\sin i = \frac{BC}{AC} = \frac{v_1t}{AC}$; $\sin r = \frac{AD}{AC} = \frac{v_2t}{AC}$; boxed $\frac{\sin i}{\sin r} = \frac{v_1}{v_2} = \frac{n_2}{n_1}$; $n_1\sin i = n_2\sin r$ in green with "Snell's law, from waves".
- **Beat c:** Clear. A red travelling sine wave crosses from air (left) into a pale teal glass block ($n = 1.5$, right) and its crests bunch up. Double arrows mark $\lambda = 600$ nm in air and $\lambda/n = 400$ nm in glass. Below: $\nu = 5\times10^{14}$ Hz in both; $v = \frac{c}{n} = 2\times10^8$ m/s. Caption: "same frequency, so the same colour".

---

## Scene 3 — Superposition and coherence (Lesson 2.2)

**Narration:**

- **Beat a:** When two waves overlap, their displacements add. In step, crest meets crest and the amplitude doubles. Shift one by half a wavelength, and crest meets trough. Equal waves cancel completely.
- **Beat b:** For any phase difference phi, the amplitudes add like the sides of a triangle. Square them to get intensities: I equals I one plus I two, plus two root I one I two, cos phi. And phi comes from path difference: two pi over lambda, times delta x.
- **Beat c:** With two equal sources, bright places get four I nought and dark places get zero. The average is still two I nought: energy is not destroyed at a dark fringe, only moved to the bright ones.
- **Beat d:** So why do two torches make no stripes? Their phase difference jumps about a hundred million times a second, and cos phi averages to zero. Fringes need coherent sources, so you split one source in two.

**Visuals:**

- **Beat a:** Three stacked traces: $y_1$ (red), $y_2$ (teal) and $y_1 + y_2$ (purple). A live readout $\phi = 0^\circ$; "in step: amplitude doubles". The phase of $y_2$ sweeps to $180^\circ$ while the "in step" note dims, and the purple sum flattens: "crest meets trough: equal waves cancel".
- **Beat b:** Clear. Phasor triangle: red $a_1$, teal $a_2$ at angle $\phi$ to it, purple resultant $A$. On the right: $A^2 = a_1^2 + a_2^2 + 2a_1a_2\cos\phi$, $I \propto A^2$, $I = I_1 + I_2 + 2\sqrt{I_1I_2}\cos\phi$, and boxed $\phi = \frac{2\pi}{\lambda}\Delta x$.
- **Beat c:** Clear. Header $I_1 = I_2 = I_0:\ I = 4I_0\cos^2\frac{\phi}{2}$. Axes of $I$ against $\phi$ from 0 to $4\pi$; the purple curve swings between $4I_0$ and 0. A green dashed line at $2I_0$; caption "average $2I_0$: energy is moved, not destroyed".
- **Beat d:** Header "two torches: $\phi$ jumps $\sim10^8$ times a second". The curve jitters randomly for about three seconds, then collapses to a flat line at $I_1 + I_2$. Caption: "fringes need coherent sources: split one source in two".

---

## Scene 4 — Young's double slit (Lesson 2.3)

**Narration:**

- **Beat a:** Thomas Young did exactly that. Light from one slit falls on two slits, S one and S two, a distance d apart. A screen stands a distance D away, much larger than d.
- **Beat b:** Go a height y up the screen. The path from S two is longer by about y d over D. Bright fringes sit where that is a whole number of wavelengths, dark ones at the half numbers.
- **Beat c:** So the fringes are equally spaced. The fringe width is beta equals lambda D over d, and the intensity is four I nought, cos squared of pi y over beta.
- **Beat d:** Take six hundred nanometres, slits half a millimetre apart, and a screen one metre away. Beta is one point two millimetres. Notice that d is underneath: move the slits twice as far apart, and the fringes halve.

**Visuals:**

- **Beat a:** A source slit, a double slit $S_1$ (upper), $S_2$ (lower) and a screen. Teal arcs spread from the source slit, then overlapping arcs spread from both slits. A brace marks $d$; a double arrow along the bottom marks $D$.
- **Beat b:** The arcs fade. Point P at height $y$ on the screen (brace from O). Lines $S_1P$ (red) and $S_2P$ (teal); a dashed perpendicular from $S_1$ cuts off the extra length near $S_2$, drawn thick amber and labelled $\Delta x$. On the right: $\Delta x = S_2P - S_1P \approx \frac{yd}{D}$ ($D \gg d$); bright: $\frac{yd}{D} = n\lambda$ (green); dark: $\frac{yd}{D} = (n + \frac12)\lambda$.
- **Beat c:** Clear. Axes with the curve $4\cos^2\frac{\pi y}{\beta}$ and, under it, a fringe strip of equal bright and dark bands. A brace under the strip marks $\beta$. Boxed $\beta = \frac{\lambda D}{d}$ and $I = 4I_0\cos^2\frac{\pi y}{\beta}$ at the top.
- **Beat d:** Tick labels in mm (multiples of 1.2) and "y (mm)". Written: $\lambda = 600$ nm, $d = 0.5$ mm, $D = 1$ m: $\beta = \frac{(600\times10^{-9})(1)}{0.5\times10^{-3}} = 1.2$ mm. Then in red: $d \to 2d$: $\beta \to \frac{\beta}{2} = 0.6$ mm, and the curve and strip squeeze to twice as many fringes.

---

## Scene 5 — Fringe shifts and thin films (Lesson 2.4)

**Narration:**

- **Beat a:** Anything that adds optical path moves the fringes. A thin sheet of index mu and thickness t over one slit adds mu minus one, times t, to that path. The whole pattern slides towards the covered slit, and the fringe width does not change. With six hundred nanometre light, a mica sheet of index one point six that shifts the pattern by five fringes is five micrometres thick.
- **Beat b:** Fill the whole apparatus with water instead. Every wavelength shrinks by n, so beta becomes beta over n.
- **Beat c:** A thin film interferes with itself: light reflects from its top and bottom, and the second beam travels an extra two mu t. Reflection off a denser medium adds half a wavelength. So where the film is thinnest, the two beams cancel, and a soap film turns black just before it bursts.
- **Beat d:** Always count the half wave shifts first. A coating on glass gets one at both surfaces, so they cancel. Then mu t equals a quarter wavelength kills the reflection: about one hundred nanometres of magnesium fluoride for green light.

**Visuals:**

- **Beat a:** A compact double slit with a vertical fringe strip on the screen and a green "central" marker on the central bright fringe, joined to both slits by thin lines. A purple slab ($\mu, t$) covers the upper slit; the strip and marker slide up by about one and a half fringes with unchanged spacing. On the right: extra optical path $= (\mu - 1)t$; $y_0 = \frac{(\mu - 1)tD}{d}$ "towards the covered slit"; "$\beta$ unchanged" (green); $\mu = 1.6$, 5 fringes: $t = \frac{5\lambda}{\mu - 1} = 5\ \mu$m.
- **Beat b:** The slab fades and the pattern slides back. The space between slits and screen fills with pale teal "water", and the fringes squeeze by $\frac34$: $\beta' = \frac{\beta}{n}$.
- **Beat c:** Clear. A pale amber film in air. A red ray hits the top: one reflected red ray, and a purple path down to the bottom and back up that leaves as a parallel teal ray, labelled $2\mu t$. At the top reflection: $+\frac{\lambda}{2}$ "off denser". On the right: bright: $2\mu t\cos r = (m + \frac12)\lambda$; dark: $2\mu t\cos r = m\lambda$; then $t \to 0$: dark (black), "the thinnest soap film looks black".
- **Beat d:** The conditions fade. Glass (1.5) appears under the film, which is relabelled "coat: 1.38", and a second $+\frac{\lambda}{2}$ appears at the bottom reflection. On the right: both reflections $+\frac{\lambda}{2}$ (they cancel); no reflection: $2\mu t = \frac{\lambda}{2}$; $\mu t = \frac{\lambda}{4}$ in red; $t = \frac{550}{4\times1.38} \approx 100$ nm in green.

---

## Scene 6 — Single-slit diffraction and resolving power (Lessons 2.5, 2.6)

**Narration:**

- **Beat a:** Diffraction is interference inside one opening. Split a slit of width a into halves, and pair each point with the one a over two below it. When their path difference is half a wavelength, every pair cancels. The first dark band sits at a sine theta equals lambda.
- **Beat b:** Dark bands fall at a sine theta equals m lambda. The central maximum runs from minus one to plus one, so it is twice as wide as the others: two lambda D over a. For a slit of nought point two millimetres, that is six millimetres. And a narrower slit spreads the light more, not less.
- **Beat c:** Every lens is an opening too, so a point of light becomes a small blurred disc. Two points are just resolved when the centre of one disc sits on the first dark ring of the other. The smallest angle is one point two two lambda over D, where D is now the aperture.
- **Beat d:** Closer than that, they merge, however much you magnify. Bigger apertures and shorter wavelengths see finer detail.

**Visuals:**

- **Beat a:** A slit of width $a$ (brace) in a barrier, plane wavefronts arriving from the left. Three pairs of points, each pair $a/2$ apart and colour-matched, send parallel rays at $\theta = 30^\circ$. For the top pair, a dashed perpendicular marks the extra path, thick amber, labelled $\frac{\lambda}{2}$. On the right: "pair points a/2 apart"; $\frac{a}{2}\sin\theta = \frac{\lambda}{2}$; boxed $a\sin\theta = \lambda$ "first dark band".
- **Beat b:** Clear. Header: dark: $a\sin\theta = m\lambda$, $m = \pm1, \pm2, \dots$. Axes with the $\left(\frac{\sin\beta}{\beta}\right)^2$ curve, ticks $\pm\frac{\lambda}{a}$, $\pm\frac{2\lambda}{a}$, and a fringe strip under it. Braces: $\frac{2\lambda D}{a}$ over the central peak (label to the right of the brace), $\frac{\lambda D}{a}$ over the next band. Then: $a = 0.2$ mm, $\lambda = 600$ nm, $D = 1$ m: $\frac{2\lambda D}{a} = 6$ mm. Braces and numbers fade; "narrower slit, wider pattern" while the slit width halves and the curve and strip spread out.
- **Beat c:** Clear. Two single-source peaks (red, teal) and their purple sum, separated far apart ("resolved"). The separation shrinks to Rayleigh's limit, where the sum shows a clear dip ("just resolved (Rayleigh)"). Boxed $\theta_{\min} = \frac{1.22\lambda}{D}$ ($D$: aperture), with "one source's centre on the other's first dark ring".
- **Beat d:** The separation shrinks further and the dip disappears ("merged: unresolved"). Caption: "bigger aperture or shorter wavelength: finer detail".

---

## Scene 7 — Polarisation (Lesson 2.7)

**Narration:**

- **Beat a:** Polaroid sunglasses cut the glare from a lake. That works only because light is a transverse wave. Its electric field vibrates across the direction of travel, and a polaroid passes just one direction.
- **Beat b:** Unpolarised light through one polaroid always loses half. Turn a second polaroid to angle theta, and only E nought cos theta gets through. Intensity goes as the square: I equals I nought cos squared theta, Malus law.
- **Beat c:** Two crossed polaroids pass nothing. Slip a third between them at forty five degrees, and light gets through again: one eighth of the original.
- **Beat d:** Reflection polarises light too. When the reflected and refracted rays are at right angles, the reflected light is completely polarised, and tan theta B equals n. For index root three, that is sixty degrees.

**Visuals:**

- **Beat a:** Header "Light is transverse: E vibrates across the ray". Along a dashed beam, seen face-on: a star of amber double arrows ("unpolarised"), a round polaroid with vertical pass lines ("polaroid"), and a single vertical double arrow ("polarised").
- **Beat b:** Intensities $I_0$ and $\frac{I_0}{2}$ under the first and third items. An analyser polaroid rotates (live $\theta$ readout) and the output arrow along its axis shrinks as $E_0\cos\theta$; under it $\frac{I_0}{2}\cos^2\theta$. Boxed $I = I_0\cos^2\theta$, "Malus' law". The analyser turns to $90^\circ$ and the output vanishes.
- **Beat c:** Clear. Polaroids at $0^\circ$ and $90^\circ$ on a beam: $I_0 \to \frac{I_0}{2} \to 0$. A third at $45^\circ$ drops in between: $\frac{I_0}{4}$, and the 0 becomes a green $\frac{I_0}{8}$. Below: $\frac{I_0}{2}\cdot\cos^2 45^\circ\cdot\cos^2 45^\circ = \frac{I_0}{8}$.
- **Beat d:** Clear. A glass surface ($n = \sqrt3$) with a dashed normal. Red incident ray at $\theta_B$, amber reflected ray ("completely polarised"), teal refracted ray at $r$, and a right-angle mark between the reflected and refracted rays. On the right: $\theta_B + r = 90^\circ$; $\sin\theta_B = n\sin r = n\cos\theta_B$; boxed $\tan\theta_B = n$; $n = \sqrt3 \Rightarrow \theta_B = 60^\circ$ in green.

---

## Scene 8 — Recap and next (Lesson 2.8)

**Narration:**

- **Beat a:** To recap. Huygens' wavelets give Snell's law, and in glass the frequency stays fixed while the wavelength shrinks. Coherent waves add amplitudes, not intensities, with phase set by path difference.
- **Beat b:** Young's fringes are equally spaced, with width lambda D over d, and extra optical path shifts them. Diffraction dark bands sit at a sine theta equals m lambda, which limits every lens. And polaroids prove that light is transverse.
- **Beat c:** Try the mastery quiz. Then chapter three shows light arriving as photons, and electrons travelling as waves.

**Visuals:** Title "Chapter 2 in five lines". Five numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $\frac{\sin i}{\sin r} = \frac{v_1}{v_2}$, $\lambda \to \frac{\lambda}{n}$: Huygens; frequency fixed
2. $\phi = \frac{2\pi}{\lambda}\Delta x$: coherent waves add amplitudes
3. $\beta = \frac{\lambda D}{d}$: equal fringes; extra path shifts them
4. $a\sin\theta = m\lambda$, $\frac{1.22\lambda}{D}$: diffraction limits every lens
5. $I = I_0\cos^2\theta$, $\tan\theta_B = n$: light is transverse

Last, "Next: Chapter 3 · Dual Nature of Radiation and Matter" appears at the bottom.
