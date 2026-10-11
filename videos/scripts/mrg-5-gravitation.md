# Gravitation — Explainer Script

- **Course:** Momentum, Rotation and Gravitation (Mechanics II)
- **Chapter:** Chapter 5 · Gravitation (id: `mrg-5-gravitation`)
- **Target runtime:** about 4.5 minutes (roughly 900 spoken words at Samantha's default ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/mrg-5-gravitation.py`, class `MrgCh5Video`

**Learning goal.** The learner sees the Moon as falling (60 Earth radii, $a \approx 2.72\times10^{-3}$ m/s² $= g/3600$, so the pull is inverse-square), states $F = Gm_1m_2/r^2$ with a tiny $G$ (two 50 kg students 1 m apart: about $1.7\times10^{-7}$ N), and uses the shell theorem (outside: as if at the centre; inside: zero) and $a = GM/r^2$, independent of the falling mass. They know how $g$ varies: $g_h \approx g(1-2h/R)$, $g_d = g(1-d/R)$, greatest at the surface, halved at $(\sqrt2-1)R \approx 2650$ km, $g_\lambda = g - \omega^2R\cos^2\lambda$. They read field and potential ($E = -dV/dr$, $V = -GM/r$; inside a shell $E = 0$ but $V = -GM/R$; solid sphere $V_{\text{centre}} = \frac32V_{\text{surface}}$), $U = -GMm/r$ and escape speed $\sqrt{2gR} \approx 11.2$ km/s, independent of mass and direction. They find orbits from gravity as the centripetal force ($v_o = \sqrt{GM/r}$, $\sqrt{gR} \approx 8$ km/s and 84 min near the surface, geostationary at $6.6R$ ≈ 36 000 km up, $v_e = \sqrt2v_o$, $K = -E$, $U = 2E$; weightlessness is free fall, $g$ is still 89% at 400 km) and Kepler's laws (ellipse with the Sun at a focus; equal areas from conserved $L$; comet with $r_p = 1$, $r_a = 7$ AU ⇒ $v_p:v_a = 7:1$, $a = 4$ AU ⇒ $T = 8$ years).

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: gravity and forces = PRIMARY (red), velocities and the Earth = SECONDARY (teal; the Earth is a pale blue disc), energies, swept areas and the Sun = ACCENT (amber), potentials = PURPLE, highlights = gold, correct = GREEN. Escape trajectories and Newton's-cannon paths are integrated numerically under an inverse-square pull (`orbit_path`), so their shapes are physical; Kepler's orbit uses Kepler's equation so the planet's speed along the ellipse is correct. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** symbols are spoken as words ("G m one m two over r squared", "v e is root two g R", "omega squared R cos squared lambda"). "Mechanics Two" is written out.

---

## Title card

**Narration:** Chapter five. Gravitation.

**Visuals:** `title_card("Momentum, Rotation & Gravitation", "Chapter 5 · Gravitation")`.

---

## Scene 1 — Newton's law of gravitation (Lesson 5.1)

**Narration:**

- **Beat a:** An apple falls because the Earth pulls it. Newton's leap was to say the Moon is falling too. It moves sideways so fast that, as it falls, the Earth curves away beneath it.
- **Beat b:** The Moon is sixty Earth radii away, and its acceleration is about two point seven two thousandths of a metre per second squared: g divided by three thousand six hundred. Sixty times farther, three thousand six hundred times weaker. The pull falls off as the inverse square.
- **Beat c:** So every pair of masses attracts with G m one m two over r squared. G is tiny: two fifty kilogram students a metre apart pull each other with less than a millionth of a newton.
- **Beat d:** Two more facts. A uniform shell pulls an outside mass as if all its mass were at the centre, and pulls nothing at all on a mass inside it. And since the force is proportional to m, the acceleration is not: a hammer and a feather fall together.

**Visuals:**

- **Beat a:** The Earth; a red apple drops onto it. A dashed orbit and the Moon with a teal velocity arrow (tangent) and a red gravity arrow (inwards); a dashed straight line "without gravity" shows where it would go. The Moon moves on round its orbit.
- **Beat b:** $a_{\text{Moon}} = \frac{4\pi^2r}{T^2} \approx 2.72\times10^{-3}$ m/s²; $\frac{g}{60^2} = \frac{9.8}{3600} \approx 2.72\times10^{-3}$ m/s²; "60 times farther, 3600 times weaker" (red).
- **Beat c:** Clear. Boxed $F = \frac{Gm_1m_2}{r^2}$; $G = 6.67\times10^{-11}$ N m²/kg²; "two 50 kg students, 1 m apart: $F \approx 1.7\times10^{-7}$ N" (muted).
- **Beat d:** The law shrinks to the top right. A teal shell: a mass outside with a red arrow towards the centre and a teal dot at the centre ("as if at the centre"); a mass inside with "$F = 0$". $a = \frac Fm = \frac{GM}{r^2}$, "independent of the falling mass".

---

## Scene 2 — g with height and depth (Lesson 5.2)

**Narration:**

- **Beat a:** At the surface, g is G M over R squared. Go up a height h, and g falls as R squared over R plus h, squared: about one minus two h over R, when h is small.
- **Beat b:** Go down into the Earth, and by the shell theorem the rock above you pulls nothing. Only the inner sphere counts, and g falls in a straight line, to zero at the centre. So g is greatest at the surface, not at the centre.
- **Beat c:** g halves at a height of root two minus one times R: about two thousand six hundred and fifty kilometres. And the Earth's spin takes a little more at the equator than at the poles: g minus omega squared R cos squared lambda.

**Visuals:**

- **Beat a:** Axes $g/g_s$ against $r/R$ with a dashed "surface" line at $r = R$. $g = \frac{GM}{R^2}$; $g_h = g\frac{R^2}{(R+h)^2} \approx g\left(1-\frac{2h}{R}\right)$ while the red $1/r^2$ tail draws outside the surface.
- **Beat b:** A teal straight line from the origin to the surface; $g_d = g\left(1-\frac dR\right)$ (teal). A gold dot "greatest at the surface" and "zero at the centre".
- **Beat c:** Dashed amber guides at $g = \frac12$ and $r = \sqrt2R$; $g_h = \frac g2$: $h = (\sqrt2-1)R \approx 2650$ km; $g_\lambda = g - \omega^2R\cos^2\lambda$.

---

## Scene 3 — Field and potential (Lesson 5.3)

**Narration:**

- **Beat a:** Every mass fills the space around it with a field, the force per unit mass, and a potential, the energy per unit mass. The field is minus the slope of the potential. For a point mass, V is minus G M over r.
- **Beat b:** Potentials are numbers, so they simply add. Inside a hollow shell the field is zero, but the potential is not: it stays at minus G M over R, flat all the way across. Zero field means a flat potential, not a zero one.
- **Beat c:** For a solid sphere, the potential keeps falling inside, and the centre is the bottom of the well: one and a half times the surface value.

**Visuals:**

- **Beat a:** $\vec E = \frac{\vec F}{m}$, $V = \frac Um$, $E = -\frac{dV}{dr}$. Axes $V$ (in $GM/R$) against $r/R$; the purple curve $V = -\frac{GM}{r}$.
- **Beat b:** The curve is cut at the surface and a flat teal segment at $-1$ fills the inside; "shell, inside: $E = 0$, $V = -\frac{GM}{R}$"; "flat, not zero".
- **Beat c:** A red parabola inside, $V = -\frac{GM}{2R^3}(3R^2-r^2)$, down to $-1.5$ at the centre (gold dot); "solid sphere: $V_{\text{centre}} = \frac32V_{\text{surface}}$".

---

## Scene 4 — Potential energy and escape speed (Lesson 5.4)

**Narration:**

- **Beat a:** Bring a mass in from infinity, and gravity does work on it. So with zero at infinity the potential energy is negative: minus G M m over r. Negative means bound: you must supply energy to pull the masses apart.
- **Beat b:** To escape, a body needs enough kinetic energy to reach infinity: one half m v squared, minus G M m over R, equals zero. So v e is root two g R: about eleven point two kilometres per second for the Earth.
- **Beat c:** The mass cancels, and so does the direction. Energy is a scalar. Fired up, sideways, or at any angle, a body at that speed escapes.

**Visuals:**

- **Beat a:** $U(r) = -\frac{GMm}{r}$. A purple potential well from the surface (red dot) rising towards a dashed zero line ("zero at infinity"); "bound" under the curve.
- **Beat b:** An amber arrow from the surface up to the zero line, "$\frac12mv_e^2$". $\frac12mv_e^2 - \frac{GMm}{R} = 0$; $v_e = \sqrt{\frac{2GM}{R}} = \sqrt{2gR} \approx 11.2$ km/s (green).
- **Beat c:** The graph clears and the formulas move up. The Earth with a launch point on top; three amber escape trajectories at the same speed (straight up, 45°, sideways), each curving away and leaving; "any direction, any mass".

---

## Scene 5 — Satellites and orbits (Lesson 5.5)

**Narration:**

- **Beat a:** Newton imagined a cannon on a mountain. Fire faster and faster, and the ground curves away beneath the ball as fast as it falls: it is in orbit. Gravity supplies the centripetal force, so the orbital speed is root G M over r.
- **Beat b:** Skimming the surface, that is root g R: eight kilometres per second, once round every eighty four minutes. Escape needs root two times as much. A geostationary satellite, with a period of one day, sits at six point six Earth radii: about thirty six thousand kilometres up.
- **Beat c:** The energies are locked together. Kinetic energy is G M m over two r, potential energy is minus twice that, and the total is minus the kinetic energy. And astronauts float not because gravity is gone, at four hundred kilometres it is still eighty nine percent, but because they are falling with their station.

**Visuals:**

- **Beat a:** The Earth with a mountain on top. Two slow shots curve down and hit the ground (muted); the third, at orbital speed, goes all the way round (amber). $\frac{GMm}{r^2} = \frac{mv_o^2}{r}$; $v_o = \sqrt{\frac{GM}{r}}$, $T = 2\pi\sqrt{\frac{r^3}{GM}}$ (amber).
- **Beat b:** The falling shots fade. "near the surface: $\sqrt{gR} \approx 8$ km/s, 84 min"; $v_e = \sqrt2v_o$; "geostationary: $T = 1$ day, $r \approx 6.6R$" and "(≈ 36 000 km up)".
- **Beat c:** Clear. A satellite circles the Earth with a teal velocity arrow and a red inward gravity arrow. Bars: teal $K = \frac{GMm}{2r}$ up, purple $U = -2K$ down, amber $E = -K$ down. "ISS at 400 km: $g_h \approx 0.89g$" and "weightless = falling together" (red).

---

## Scene 6 — Kepler's laws (Lesson 5.6)

**Narration:**

- **Beat a:** Kepler found three rules in the planets' motion. First: each planet moves on an ellipse, with the Sun at one focus.
- **Beat b:** Second: the line from the Sun sweeps out equal areas in equal times. Gravity points straight at the Sun, so it has no torque about it, and angular momentum is conserved. The planet moves fastest when it is closest.
- **Beat c:** A comet that comes in to one astronomical unit and goes out to seven moves seven times faster at its closest point than at its farthest.
- **Beat d:** Third: the square of the period goes as the cube of the semi major axis. That comet's semi major axis is four, so its period is four to the power three halves: eight years.

**Visuals:**

- **Beat a:** An ellipse (eccentricity 0.6) with an amber Sun at one focus and a dot at the other. A teal planet moves along it, fast near the Sun and slow far away. "1. ellipse, Sun at a focus".
- **Beat b:** "2. equal areas in equal times". Two amber sectors swept in equal times: a short fat one at perihelion and a long thin one at aphelion; "same time, same area"; $\frac{dA}{dt} = \frac{L}{2m}$.
- **Beat c:** $v_pr_p = v_ar_a$; $r_p = 1$, $r_a = 7$ AU $\Rightarrow v_p : v_a = 7:1$.
- **Beat d:** "3. $T^2 \propto a^3$" pulses; $a = \frac{1+7}{2} = 4$ AU $\Rightarrow T = 4^{3/2} = 8$ years (green).

---

## Scene 7 — Recap and course wrap-up (Lesson 5.7)

**Narration:**

- **Beat a:** To recap. One inverse square law, F equals G m one m two over r squared. With the shell theorem, it gives g at any height or depth, and the field and potential of any sphere.
- **Beat b:** Energy conservation gives escape speed, root two g R, the same in every direction. Gravity as a centripetal force gives orbits, and angular momentum conservation gives Kepler's equal areas.
- **Beat c:** Try the mastery quiz. That completes Mechanics Two: momentum, rotation and gravitation, all grown from Newton's laws.

**Visuals:** Title "Chapter 5 in six lines". Six numbered rows, formula left and muted note right:

1. $F = \frac{Gm_1m_2}{r^2}$: shell, a point outside, nothing inside
2. $g_h \approx g(1-\frac{2h}{R})$, $g_d = g(1-\frac dR)$: greatest at the surface
3. $V = -\frac{GM}{r}$, $E = -\frac{dV}{dr}$: zero field is not zero potential
4. $v_e = \sqrt{2gR} \approx 11.2$ km/s: any direction, any mass
5. $v_o = \sqrt{GM/r}$, $E = -K$: weightless means free fall
6. $v_pr_p = v_ar_a$, $T^2 \propto a^3$: central force, L conserved

Last, "End of course · Momentum, Rotation & Gravitation" appears at the bottom.
