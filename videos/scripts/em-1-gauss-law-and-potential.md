# Gauss's Law and Electric Potential — Explainer Script

- **Course:** Electricity and Magnetism
- **Chapter:** Chapter 1 · Gauss's Law and Electric Potential (id: `em-1-gauss-law-and-potential`)
- **Target runtime:** about 6 minutes (roughly 1,000 spoken words at Samantha's ~175 wpm, plus animation pauses)
- **Scene file:** `videos/scenes/em-1-gauss-law-and-potential.py`, class `EmCh1Video`

**Learning goal.** The learner reads flux as "how much field goes through": $\Phi = \vec E\cdot\vec A = EA\cos\theta$, zero edge-on, negative when the field enters against the normal, and zero net through a closed box in a uniform field even though the field is not zero. They derive $q/\varepsilon_0$ for a sphere, state Gauss's law for any closed surface (with $\vec E$ the *total* field), and split flux by symmetry (cube centre $q/6\varepsilon_0$ per face, corner $q/8\varepsilon_0$). They pick the surface from the symmetry: line $\lambda/2\pi\varepsilon_0 r$, sheet $\sigma/2\varepsilon_0$ (no distance), shell 0 inside, solid sphere linear inside then $1/r^2$. They treat potential as work per unit charge from infinity ($V = kq/r$, a scalar that adds), read $E = -dV/dr$ as "downhill", and know $E = 0$ and $V = 0$ are separate questions. They use equipotentials (perpendicular to field lines, uneven around a point charge, even in a uniform field), pair energies, path-independent work and $\tfrac12mv^2 = qV$, and the conductor facts ($E = 0$ inside, one potential, surface field $\sigma/\varepsilon_0$, $Q\propto R$ for joined spheres).

**Global style (all scenes):** light strawberry background from `videos/lib/strawberry.py`. Colour roles: positive charge = PRIMARY (red disc, white plus), negative charge = SECONDARY (teal disc, white minus), forces = PURPLE, electric field = ACCENT (amber), field lines = dark brown with arrowheads, Gaussian and equipotential surfaces = red (dashed for equipotentials), area vector = red, highlights = gold, correct = GREEN. Field lines are traced numerically from the real charges. Math uses `MathTex`. Between scenes the frame is cleared with `FadeOut`.

**TTS note:** Greek letters and symbols are spoken as words ("epsilon nought", "sigma", "lambda", "E dot A", "V A minus V B"). Units in full ("nanocoulomb", "volts per metre", "electron volts").

---

## Title card

**Narration:** Chapter one. Gauss's law and electric potential.

**Visuals:** `title_card("Electricity & Magnetism", "Chapter 1 · Gauss's Law and Electric Potential")`.

---

## Scene 1 — Flux (Lesson 1.1)

**Narration:**

- **Beat a:** Hold a window frame out in falling rain. Facing the sky, it catches the most rain. Tilt it, and less gets through. Turn it edge on, and none does.
- **Beat b:** Replace the rain by field lines and you have electric flux. Give the surface an area vector, normal to it. Flux is E dot A, which is E A cos theta: the part of the field that goes through, times the area.
- **Beat c:** At ninety degrees the flux is zero. Tilt further and it turns negative. For a closed surface, the normal always points outward.
- **Beat d:** Now put a closed box in a uniform field. Every line that enters one face leaves through the other, so the net flux is zero. But the field on the box is certainly not zero.

**Visuals:**

- **Beat a:** Faint amber vertical "rain" lines fill the left half. A thick dark window segment sits in them; the lines that pass through it are redrawn gold. A `ValueTracker` tilts the window to 50°, then 90° (no gold lines left), then back to flat.
- **Beat b:** A red normal arrow $\vec A$ grows from the window's centre, and $\vec E$ labels the rain. On the right: $\Phi = \vec E\cdot\vec A = EA\cos\theta$, and a live readout $\Phi/EA = \cos\theta = $ (signed). The window tilts to 40°.
- **Beat c:** The window tilts to 90° (readout 0.00), then 130°: the lines through it turn teal and the readout goes negative. Caption: "negative: the field goes in against the normal".
- **Beat d:** Clear. Horizontal amber field arrows across the frame and a square box in the middle with outward red normals on its left and right faces. $-EA$ (teal) over the left face, $+EA$ (gold) over the right. Bottom: $\Phi_{\text{net}} = 0$ but $\vec E \ne 0$.

---

## Scene 2 — Gauss's law (Lesson 1.2)

**Narration:**

- **Beat a:** Surround a point charge with a sphere. The field on it is k q over r squared, and the sphere's area is four pi r squared. Multiply, and the radius cancels. The flux is q over epsilon nought, whatever the size of the sphere.
- **Beat b:** That is Gauss's law. The flux out of any closed surface equals the charge inside, over epsilon nought. Flux counts field lines, and a line from a charge outside goes in, and comes out again.
- **Beat c:** One warning. The E in Gauss's law is the total field, from every charge, inside and out. Only the net flux ignores the charges outside.
- **Beat d:** Put a charge at the centre of a cube, and the six identical faces share the flux: q over six epsilon nought each. Put it at a corner, and eight such cubes would surround it, so this cube gets one eighth, q over eight epsilon nought.

**Visuals:**

- **Beat a:** A positive charge with twelve radial field lines and a red Gaussian circle around it. On the right, written in turn: $\Phi = E\cdot4\pi r^2$; $= \frac{kq}{r^2}\cdot4\pi r^2$; $= 4\pi kq = \frac{q}{\varepsilon_0}$ (green). The circle grows, then shrinks, while the result stays.
- **Beat b:** Clear. A wobbly closed red surface around $q_{\text{enc}}$ ($+1.5$), and a larger $+4$ charge "outside" just to its right. Traced field lines of both; the outside charge's lines that enter the surface and leave it again are drawn thicker in gold. Boxed bottom right: $\oint\vec E\cdot d\vec A = \frac{q_{\text{enc}}}{\varepsilon_0}$.
- **Beat c:** Red banner at the top: "E = the total field; only the net flux ignores outside charges".
- **Beat d:** Clear. A wireframe cube (oblique projection) with a charge at its centre and $\Phi_{\text{face}} = \frac{q}{6\varepsilon_0}$ under it. On the right, a 2×2 slice of the eight cubes around a corner charge, one square shaded gold ("slice through 4 of the 8 cubes"), and $\Phi_{\text{cube}} = \frac{q}{8\varepsilon_0}$ in green.

---

## Scene 3 — Applying Gauss's law (Lesson 1.3)

**Narration:**

- **Beat a:** Gauss's law becomes a one line shortcut when symmetry tells you the shape of the field. Around a long line of charge, choose a cylinder. Only its curved side catches flux, and the field falls as one over r.
- **Beat b:** Beside a large flat sheet, choose a pillbox. The field is sigma over two epsilon nought, and distance does not appear at all. Flat symmetry means the lines never spread out, so the field does not weaken as you move away.
- **Beat c:** A charged spherical shell has no field at all inside, and outside it acts like a point charge at its centre.
- **Beat d:** A uniformly charged solid sphere is different inside. The enclosed charge grows with r cubed, so the field grows in a straight line, peaks at the surface, then falls as one over r squared. At half the radius and at twice the radius, the fields are in the ratio two to one.

**Visuals:**

- **Beat a:** Header "Symmetry picks the surface". Left panel: a vertical red line charge inside a wireframe cylinder, amber arrows pointing radially out; $E = \frac{\lambda}{2\pi\varepsilon_0 r}$ beneath.
- **Beat b:** Middle panel: a red sheet seen in perspective, a pillbox straddling it, amber arrows straight out on both sides; $E = \frac{\sigma}{2\varepsilon_0}$ beneath.
- **Beat c:** Right panel: a red shell with "$E = 0$" inside, a dashed Gaussian sphere outside it, radial amber arrows; "$E = \frac{kQ}{r^2}$ outside" beneath.
- **Beat d:** Clear. Axes $E$ against $r$: a red straight line $\frac{kQr}{R^3}$ up to a dashed line at $R$, then the $\frac{kQ}{r^2}$ fall-off. Gold dots at $R/2$ and $2R$, and $\frac{E(R/2)}{E(2R)} = \frac{1/2}{1/4} = 2$ in green.

---

## Scene 4 — Electric potential (Lesson 1.4)

**Narration:**

- **Beat a:** Now a second way to read the field. Carry a test charge in from infinity, against the push. The work done per unit charge is the electric potential, V. For a point charge, V is k q over r. It is a number, not an arrow, so potentials simply add.
- **Beat b:** The field points downhill: E is minus the slope of V. Along the line through two equal positive charges, the potential has a flat point in the middle. The slope is zero, so E is zero there. But V is not zero.
- **Beat c:** Across a dipole it is the other way round. At the midpoint V is zero, but the slope is steep, so the field is strong. E equals zero and V equals zero are separate questions.

**Visuals:**

- **Beat a:** A positive source charge on the left; a small positive test charge slides in from the right ("from infinity") with a purple repulsion arrow that grows as it gets closer. On the right: $V = \frac{W_{\infty\to P}}{q_0}$, then $V = \frac{kq}{r}$ in red, then "a number, not an arrow: potentials add".
- **Beat b:** Clear. $E = -\frac{dV}{dr}$ at the top. Left graph: $V(x)$ along the line through two $+$ charges (marked on the axis), U-shaped between them. A flat gold tangent and dot at the midpoint; "$E = 0,\ V \ne 0$" beneath.
- **Beat c:** Right graph: $V(x)$ for $+$ and $-$ (teal curve), crossing zero at the midpoint with a steep gold tangent; "$V = 0,\ E \ne 0$" beneath.

---

## Scene 5 — Equipotential surfaces (Lesson 1.5)

**Narration:**

- **Beat a:** Join the points that share a potential and you get equipotential surfaces. Field lines cross them at right angles, so moving a charge along one takes no work at all.
- **Beat b:** Around a point charge they are not evenly spaced. For a ten nanocoulomb charge, the ninety, sixty and thirty volt surfaces sit at one, one and a half, and three metres. Equal steps in V crowd together where the field is strong.
- **Beat c:** In a uniform field they are flat, evenly spaced planes. Planes at thirty, twenty and ten volts, five centimetres apart, mean a field of two hundred volts per metre, pointing from high potential to low.

**Visuals:**

- **Beat a:** A positive charge with eight radial field lines, then three dashed red equipotential circles; a right-angle mark where a line crosses a circle. "$W = 0$ along one" in green.
- **Beat b:** Labels "90 V", "60 V", "30 V" on the circles (radii 1, 1.5, 3). On the right: $r = \frac{kq}{V} = \frac{90}{V}$ m and "90 V: 1 m, 60 V: 1.5 m, 30 V: 3 m".
- **Beat c:** The table fades. Bottom right: three evenly spaced dashed vertical planes labelled 30 V, 20 V, 10 V, amber field arrows crossing them left to right, and a "5 cm" brace. $E = \frac{10\text{ V}}{0.05\text{ m}} = 200$ V/m in green.

---

## Scene 6 — Potential energy and work (Lesson 1.6)

**Narration:**

- **Beat a:** Potential energy belongs to pairs of charges. For two charges it is k q one q two over r. To assemble a group, add that up over every pair, once each.
- **Beat b:** The work the field does moving a charge from A to B is q times V A minus V B. Only the two end points matter. A long winding path takes exactly the same work as the straight one.
- **Beat c:** Energy conservation does the rest. An electron accelerated from rest through a hundred volts gains a hundred electron volts of kinetic energy, and reaches five point nine million metres per second.

**Visuals:**

- **Beat a:** Three positive charges in a triangle, joined by three dashed pair lines. On the right: $U = \frac{kq_1q_2}{r}$, "for each pair; add over every pair".
- **Beat b:** Clear. A source charge, points $A$ and $B$, a straight purple dashed path and a winding teal path between them. $W_{A\to B} = q(V_A - V_B)$ and "same for every path" in green.
- **Beat c:** Clear. Two plates: teal "0 V" on the left, red "100 V" on the right. An electron accelerates across. On the right, in turn: $K = eV = 100$ eV $= 1.6\times10^{-17}$ J; $\tfrac12mv^2 = eV$; $v = \sqrt{2eV/m} \approx 5.9\times10^6$ m/s (green).

---

## Scene 7 — Conductors (Lesson 1.7)

**Narration:**

- **Beat a:** Finally, conductors. Free charges inside a conductor move until they feel no force. So once things settle, the field inside is zero, any extra charge sits on the surface, and the whole conductor is at one potential.
- **Beat b:** Just outside, the field is perpendicular to the surface, with strength sigma over epsilon nought. It is strongest where the surface curves most sharply.
- **Beat c:** Join a one centimetre sphere carrying eight microcoulombs to a neutral three centimetre sphere. They end at the same potential, so the charge splits in proportion to the radius: two microcoulombs and six. The small sphere has the greater surface density, which is why charge crowds at sharp points.

**Visuals:**

- **Beat a:** A teardrop-shaped conductor (round on the left, pointed on the right) with "$\vec E = 0$" inside and red plus signs along the inside of its surface, more of them near the point. "one potential throughout".
- **Beat b:** Amber arrows grow out of the surface along the normals, much longer near the point. $E_{\text{surface}} = \frac{\sigma}{\varepsilon_0}$ at the top right.
- **Beat c:** Clear. A small sphere ("1 cm", $8\ \mu$C) joined by a wire to a large one ("3 cm", 0). The labels change to $2\ \mu$C and $6\ \mu$C. On the right: $\frac{kQ_1}{R_1} = \frac{kQ_2}{R_2}$, $Q \propto R$ (green), $\sigma \propto \frac{1}{R}$ (red).

---

## Scene 8 — Recap and next (Lesson 1.8)

**Narration:**

- **Beat a:** To recap. Flux counts the field lines through a surface, and Gauss's law says the flux out of a closed surface is the enclosed charge over epsilon nought. With symmetry, that gives the field in one line.
- **Beat b:** Potential is energy per unit charge. It adds as plain numbers, and the field points down its slope. Work between two points ignores the path. And a conductor is one potential, with no field inside.
- **Beat c:** Try the mastery quiz. Then chapter two puts two conductors side by side, carrying plus and minus Q. The ratio of charge to potential difference depends only on their shape. That ratio is capacitance.

**Visuals:** Title "Chapter 1 in five lines". Five numbered rows, each a formula on the left and a muted note on the right:

1. $\oint\vec E\cdot d\vec A = \frac{q_{\text{enc}}}{\varepsilon_0}$: flux counts enclosed charge
2. $\frac{\lambda}{2\pi\varepsilon_0 r}$, $\frac{\sigma}{2\varepsilon_0}$, $\frac{kQ}{r^2}$: symmetry picks the surface
3. $V = \frac{kq}{r}$, $E = -\frac{dV}{dr}$: potentials add as numbers
4. $W = q(V_A - V_B)$: the path does not matter
5. $E_{\text{inside}} = 0$: conductors: one potential

Last, "Next: Chapter 2 · Capacitors" appears at the bottom.
