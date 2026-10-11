# Lenses, Prisms and Optical Instruments — Explainer Script

- **Course:** Optics and Modern Physics
- **Chapter:** Chapter 1 · Lenses, Prisms and Optical Instruments (id: `omp-1-lenses-prisms-and-instruments`)
- **Target runtime:** about 6 minutes (roughly 1,040 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/omp-1-lenses-prisms-and-instruments.py`, class `OmpCh1Video`

**Learning goal.** The learner sees a thin lens as two refracting surfaces and gets the lens maker's formula by applying the single-surface formula twice, with $n$ measured relative to the surroundings (so a lens in water is weaker, and an air bubble in water diverges). They use $\frac1v - \frac1u = \frac1f$ with $m = \frac vu$, find images with three principal rays, know why the lens formula has a minus where the mirror formula has a plus. They add powers in dioptres for lenses in contact (and only in contact), and treat a silvered lens as a mirror of power $2P_L + P_M$. They derive $r_1 + r_2 = A$ and $\delta = i + e - A$ for a prism, explain the minimum of deviation by reversibility, and use $n = \frac{\sin\frac{A+\delta_m}{2}}{\sin\frac A2}$. They know violet bends most, what an achromatic pair does, and why the sky is blue. Finally they read every instrument as a way to increase the *angle* an object subtends: spectacles, the magnifier ($1 + D/f$), the compound microscope ($m_oM_e$) and the telescope ($f_o/f_e$).

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: light rays = PRIMARY (red) with small arrowheads showing the direction of travel; lens glass = SECONDARY (teal) outline with a pale teal fill; foci and focal points = ACCENT (amber) dots; objects = GREEN arrows; images = PURPLE arrows (solid for real, dashed for virtual); back-extensions of rays = dashed MUTED/PURPLE; normals = dashed MUTED lines; optical axis = thin MUTED line; highlights = gold; correct = GREEN check, wrong = red cross. Math uses `MathTex`. Ray diagrams obey the laws they illustrate (thin-lens geometry, Snell's law at prism faces). Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Samantha may read a lone capital "A" (the prism's apex angle) as the article, so the scene spells it `[[char LTRL]]A[[char NORM]]` (`{LA}` in the code). Symbols are spoken as words ("one over v minus one over u equals one over f", "n minus one", "delta m", "omega", "lambda"). Subscripted focal lengths are spoken as "the objective's focal length" and "the eyepiece's focal length" rather than "f o" and "f e".

---

## Title card

**Narration:** Chapter one. Lenses, prisms and optical instruments.

**Visuals:** `title_card("Optics and Modern Physics", "Chapter 1 · Lenses, Prisms and Optical Instruments")`.

---

## Scene 1 — Two surfaces make a lens (Lesson 1.1)

**Narration:**

- **Beat a:** Hold a magnifying glass above paper in sunlight. At one height, the bright patch shrinks to a dazzling dot. That height is the focal length.
- **Beat b:** A thin lens is just two refracting surfaces. Apply the single surface formula at each face, the first image being the object for the second. Add the two equations, and that in between image cancels.
- **Beat c:** What is left is the lens maker's formula. One over f equals n minus one, times one over R one, minus one over R two. Here n is measured relative to the surroundings.
- **Beat d:** An equiconvex lens with radii of twenty centimetres and index one point five has f equal to twenty centimetres. In water, the relative index drops to nine eighths, and f grows to eighty.
- **Beat e:** If the surroundings are denser than the lens, n minus one turns negative. A lens shaped air bubble in water spreads light out. A convex lens is not always converging.

**Visuals:**

- **Beat a:** A pale teal biconvex lens on the left. Five parallel red rays arrive from the left, refract at the lens and meet at the amber focus $F$, where a gold dot flashes. A brace under the axis from lens to $F$ is labelled $f$.
- **Beat b:** The rays fade. Labels $R_1$ and $R_2$ appear by the two faces. On the right: "surface 1" over $\frac{n_2}{v_1} - \frac{n_1}{u} = \frac{n_2-n_1}{R_1}$, "surface 2" over $\frac{n_1}{v} - \frac{n_2}{v_1} = \frac{n_1-n_2}{R_2}$. Both $\frac{n_2}{v_1}$ terms are struck through in gold.
- **Beat c:** Everything clears. "Lens maker's formula" above the boxed $\frac1f = (n-1)\left(\frac1{R_1} - \frac1{R_2}\right)$, then $n = \dfrac{n_{\text{lens}}}{n_{\text{medium}}}$ in teal.
- **Beat d:** The boxed formula shrinks to the top. Left: a lens with parallel rays meeting at $F$, labelled "air". Right: $\frac1f = 0.5\left(\frac1{20}+\frac1{20}\right) \Rightarrow f = 20$ cm. A pale blue "water" rectangle fades in behind the lens, the focus slides four times farther out, and the right side adds $n = \frac{1.5}{4/3} = \frac98$, $\frac1f = \frac18\cdot\frac1{10} \Rightarrow f = 80$ cm.
- **Beat e:** Clear. The whole frame is pale water. A biconvex "air bubble" sits in it, filled with the background colour. Parallel rays leave it spreading out, and dashed back-extensions meet at a virtual focus on the incoming side. Right: $n = \frac{1}{4/3} = \frac34$, $f = -24$ cm, "diverging". A card with "a convex lens always converges" gets a red cross.

---

## Scene 2 — The thin lens formula and images (Lesson 1.2)

**Narration:**

- **Beat a:** So for any thin lens, one over v minus one over u equals one over f, and the magnification is v over u.
- **Beat b:** Three rays find any image: parallel to the axis, then through the far focus; through the centre, straight on; through the near focus, then parallel. An object thirty centimetres from a twenty centimetre lens images at plus sixty: real, inverted, twice the size.
- **Beat c:** Now bring an object inside the focus: ten centimetres from a fifteen centimetre lens. The rays leave spreading out. Traced back, they meet at minus thirty: virtual, erect, three times larger. A magnifying glass.
- **Beat d:** Why a minus sign, when mirrors have a plus? A lens lets light through, so real images form on the far side, where v is positive. The mirror form would give plus six centimetres, which is wrong.

**Visuals:**

- **Beat a:** Boxed $\frac1v - \frac1u = \frac1f$, $\quad m = \frac vu$ at the top centre.
- **Beat b:** The formula shrinks into the top-right corner. A bench: optical axis, convex lens at the centre, amber $F_1$ and $F_2$ dots, and a green object arrow at $u = -30$ cm (scale 0.075 units per cm, $f = 20$ cm). The three principal rays are drawn one after another, all meeting at the tip of a solid purple inverted image at $v = +60$ cm, twice as tall. Bottom right: $u = -30,\ f = 20 \Rightarrow v = +60,\ m = -2$.
- **Beat c:** Clear. New bench with $f = 15$ cm (0.1 units per cm). Object at $u = -10$ cm, inside $F_1$. The parallel ray refracts through $F_2$; the central ray goes straight on. Both leave diverging. Dashed purple back-extensions meet at a dashed purple erect image at $v = -30$ cm, three times taller. Top right: $\frac1v = \frac1{15} - \frac1{10} \Rightarrow v = -30$, $m = +3$, "virtual, erect".
- **Beat d:** Clear. Two columns. Left, "lens": $\frac1v - \frac1u = \frac1f \Rightarrow v = -30$ with a green check. Right, "mirror form": $\frac1v + \frac1u = \frac1f \Rightarrow v = +6$ with a red cross. Caption: "light goes through: real images on the far side, v > 0".

---

## Scene 3 — Power and combinations (Lesson 1.3)

**Narration:**

- **Beat a:** Opticians use power, one over f in metres, measured in dioptres: positive for converging lenses, negative for diverging.
- **Beat b:** In contact, the first image is the object for the second lens, so the equations add, and so do the powers. Plus five and minus two dioptres make plus three, a focal length of about thirty three centimetres.
- **Beat c:** But only in contact. With a gap, an extra term appears: two lenses of plus ten dioptres each, five centimetres apart, give fifteen dioptres, not twenty.
- **Beat d:** Silver the back of a lens, and it becomes a mirror: light crosses the lens twice, so the power is twice the lens power plus the mirror power. A plano convex lens of radius twenty, silvered flat, acts as a concave mirror of focal length twenty centimetres.

**Visuals:**

- **Beat a:** $P = \dfrac1f\ (f \text{ in m})$, unit "dioptre (D)". Two examples below: $f = +25$ cm $\Rightarrow P = +4$ D (green), $f = -40$ cm $\Rightarrow P = -2.5$ D (red).
- **Beat b:** Clear. Left: a convex lens and a concave lens drawn touching on an axis. Right: $\frac1{v_1} - \frac1u = \frac1{f_1}$, $\frac1v - \frac1{v_1} = \frac1{f_2}$, then $P = P_1 + P_2$ boxed, then $(+5) + (-2) = +3$ D $\Rightarrow F \approx 33$ cm.
- **Beat c:** The two lenses slide apart with a $d$ brace between them. The right side is replaced by $\frac1F = \frac1{f_1} + \frac1{f_2} - \frac{d}{f_1f_2}$, then $10 + 10 - 0.05\times100 = 15$ D with "not 20" in red, then "image position: two steps" in muted text.
- **Beat d:** Clear. A plano-convex lens with its flat face silvered (thick grey line with hatch marks). Two parallel red rays enter, reflect at the silvered face and come back to meet at an amber focus 20 cm in front. Right: $P_{\text{eq}} = 2P_L + P_M$, $f_L = 40$ cm, $P_M = 0$, $P_{\text{eq}} = \frac2{40} = \frac1{20} \Rightarrow F = 20$ cm.

---

## Scene 4 — Refraction through a prism (Lesson 1.4)

**Narration:**

- **Beat a:** In a prism with apex angle A, a ray bends towards the base at each face. Draw the two normals, and the geometry gives r one plus r two equals A.
- **Beat b:** The total turn is the deviation. Delta equals i plus e minus A.
- **Beat c:** Now change the angle of incidence. The deviation falls, stops, then rises. Light paths are reversible, so i and e give the same deviation. At the minimum, i equals e, and the ray inside runs parallel to the base.
- **Beat d:** At the minimum, n equals the sine of A plus delta m over two, over the sine of A over two. A sixty degree prism with a minimum deviation of thirty degrees has an index of root two. And a thin prism simply deviates by n minus one, times A.

**Visuals:**

- **Beat a:** An equilateral glass prism (pale teal, $A = 60^\circ$ marked at the apex, $n = 1.5$) on the left. A red ray enters the left face at $i = 48.6^\circ$, runs inside, and leaves the right face. Dashed normals at both faces with arcs $i$, $r_1$, $r_2$, $e$. On the right: $r_1 + r_2 = A$.
- **Beat b:** The incident ray is extended as a dashed line past the prism. An arc between it and the emergent ray is labelled $\delta$. On the right: $\delta = i + e - A$.
- **Beat c:** The right side clears. Axes of $\delta$ against $i$ (from $20^\circ$ to $90^\circ$). A `ValueTracker` sweeps $i$ from $30^\circ$ to $85^\circ$, redrawing the ray through the prism live while a dot traces the lopsided curve. It then returns to $48.6^\circ$, where a gold dot marks $\delta_m = 37.2^\circ$, and the inside ray is highlighted with the caption "inside: parallel to the base".
- **Beat d:** Clear. $n = \dfrac{\sin\frac{A+\delta_m}{2}}{\sin\frac A2}$ in a box. Below: $A = 60^\circ,\ \delta_m = 30^\circ$: $n = \frac{\sin45^\circ}{\sin30^\circ} = \sqrt2$ (green). Then "thin prism:" $\delta = (n-1)A$.

---

## Scene 5 — Dispersion and scattering (Lesson 1.5)

**Narration:**

- **Beat a:** White light is a mixture, and glass has a slightly different index for each colour. Shorter wavelength means larger n, so violet bends most and red least.
- **Beat b:** The colours fan out by n violet minus n red, times A. Dispersive power, omega, compares that spread to the mean deviation, and depends only on the glass. A flint prism turned against a crown prism cancels the colours but keeps some bending: an achromatic pair.
- **Beat c:** Tiny air molecules scatter light as one over lambda to the fourth, so four hundred nanometre light scatters about nine times more than seven hundred. Scattered blue fills the sky. At sunset, the long path through air leaves red. Big cloud droplets scatter all colours equally, so clouds are white.

**Visuals:**

- **Beat a:** A prism on the left. A white (light grey) beam enters and fans into six coloured rays from red (least deviated) to violet (most). Note "spread exaggerated". Right: $n(\lambda) \approx n_0 + \dfrac{k}{\lambda^2}$, then $n_{\text{violet}} \approx 1.526$, $n_{\text{red}} \approx 1.509$.
- **Beat b:** The right side is replaced by: $\theta = (n_v - n_r)A$ "angular dispersion", $\omega = \dfrac{n_v - n_r}{n-1}$ "dispersive power", then "achromatic pair:" $\omega\delta + \omega'\delta' = 0$, then "crown $6^\circ$ + flint $3^\circ$ (reversed)".
- **Beat c:** Clear. $I \propto \dfrac1{\lambda^4}$ at the top with $\left(\frac{700}{400}\right)^4 \approx 9.4$. Below, a sun on the left sends a beam across a band of small dots (air); short blue wavy arrows leave the dots sideways ("blue sky"), and the beam turns orange-red by the right end ("sunset: long path"). A white cloud with a grey outline on the right: "big drops: all colours".

---

## Scene 6 — The eye and the magnifier (Lesson 1.6)

**Narration:**

- **Beat a:** Your eye is a lens that changes its own focal length, focusing from the near point, twenty five centimetres, out to the far point, infinity for a normal eye.
- **Beat b:** Spectacles form a virtual image where your eye can focus. If you cannot see beyond eighty centimetres, a concave lens must image infinity at minus eighty: f is minus eighty centimetres, minus one point two five dioptres.
- **Beat c:** How big something looks depends on the angle at your eye. A magnifier does not enlarge the object; it lets you hold it closer than twenty five centimetres and still focus.
- **Beat d:** With the image at the near point, the magnification is one plus D over f. With the image at infinity, it is D over f. A five centimetre lens gives six, or five.

**Visuals:**

- **Beat a:** A schematic eye on the right: a circle, a teal lens ellipse at the front, a retina arc at the back. Parallel rays from the left focus on the retina ("far point: infinity"). Then the rays switch to come from a nearby green object and still meet on the retina while the lens fattens ("accommodation", "near point $D = 25$ cm").
- **Beat b:** Clear. "Myopia, far point 80 cm" over $u = -\infty,\ v = -80 \Rightarrow f = -80$ cm, $P = -1.25$ D, with the muted note "the lens moves the image into the range your eye can focus" below.
- **Beat c:** Clear. Two rows, each with an eye on the right. Top row: a green object at 25 cm with a gold angle $\alpha$ at the eye. Bottom row: the same object much closer, with a small convex lens just in front of the eye, and a larger gold angle $\beta$. Caption: "same object, bigger angle".
- **Beat d:** Clear. $M = 1 + \dfrac Df$ "image at near point", $M = \dfrac Df$ "image at infinity", then $f = 5$ cm: $M = 6$ or $5$.

---

## Scene 7 — Microscope and telescope (Lesson 1.7)

**Narration:**

- **Beat a:** Two lenses in a row multiply magnifications. In a compound microscope, a short focus objective makes a real, enlarged image, and the eyepiece magnifies it like a magnifying glass.
- **Beat b:** With a one centimetre objective, a five centimetre eyepiece, and the object at one point one centimetres, that is ten times six: sixty.
- **Beat c:** A telescope views things at infinity. The objective forms a small image at its focus, and the eyepiece, sharing that focus, sends the light out at a bigger angle. In normal adjustment, M is f objective over f eyepiece, and the tube is their sum.
- **Beat d:** With one hundred fifty and five centimetres, that is thirty times, in a tube one hundred fifty five centimetres long. The Moon's image is only one point four centimetres across, but it is close to your eye, so the angle is bigger.

**Visuals:**

- **Beat a:** An axis across the left two thirds. Objective (short focus) with a green object just outside $F_o$. Two rays form a solid purple real, inverted image. An eyepiece just beyond that image: two rays from the image tip leave diverging, and dashed back-extensions meet at a large dashed purple final image. Labels "objective", "eyepiece", "real image", "final virtual image".
- **Beat b:** Right column: $M = m_o M_e = \dfrac{v_o}{u_o}\left(1 + \dfrac D{f_e}\right)$, then $f_o = 1,\ f_e = 5,\ u_o = -1.1$ cm, then $m_o = -10,\ M_e = 6 \Rightarrow M = -60$ (green).
- **Beat c:** Clear. Telescope: parallel red rays from a distant star arrive at angle $\alpha$, converge at the shared focal plane (amber dot) to a small image, and leave the eyepiece parallel at the larger angle $\beta$. Arcs $\alpha$ and $\beta$, a brace "$f_o + f_e$" under the axis. Right: $M = \dfrac{\beta}{\alpha} = \dfrac{f_o}{f_e}$, $L = f_o + f_e$.
- **Beat d:** Right adds $f_o = 150,\ f_e = 5$: $M = 30,\ L = 155$ cm, then "Moon's image: $f_o\alpha \approx 1.4$ cm", then the caption "smaller than the object, but much closer".

---

## Scene 8 — Recap and next (Lesson 1.8)

**Narration:**

- **Beat a:** To recap. Two surfaces make a lens, with the index relative to the surroundings. One over v minus one over u equals one over f, with real images on the far side.
- **Beat b:** Powers add for lenses in contact. A prism's deviation has a minimum where i equals e, and violet bends most. And every instrument is about angle, not size.
- **Beat c:** Try the mastery quiz. Then chapter two drops the ray model: when slits and films shrink to a wavelength, light shows that it is a wave.

**Visuals:** Title "Chapter 1 in five lines". Five numbered rows, each a formula on the left and a muted note on the right, fading in with the narration:

1. $\frac1f = (n-1)\left(\frac1{R_1}-\frac1{R_2}\right)$: n relative to the surroundings
2. $\frac1v - \frac1u = \frac1f,\ m = \frac vu$: real images on the far side
3. $P = P_1 + P_2$: lenses in contact only
4. $n = \frac{\sin\frac{A+\delta_m}{2}}{\sin\frac A2}$: minimum at $i = e$; violet bends most
5. $M = 1 + \frac Df,\ \frac{f_o}{f_e}$: angle, not size

Last, "Next: Chapter 2 · Wave Optics" appears at the bottom.
